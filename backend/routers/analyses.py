from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import SensorReading, AIAnalysis, Asset, Farm, User
from backend import schemas
from backend.ml_analysis import analyze_asset
from backend.auth import get_current_user


router = APIRouter(
    prefix="/analyses",
    tags=["analyses"],
)


ASSUMED_ENERGY_VALUE_PER_RISK_DAY = 4000


def _check_owns_asset(
    db: Session,
    asset_id: int,
    user: User,
):
    """
    Make sure the asset belongs to a farm owned by
    the currently logged-in user.
    """

    asset = (
        db.query(Asset)
        .join(
            Farm,
            Asset.farm_id == Farm.farm_id,
        )
        .filter(
            Asset.asset_id == asset_id,
            Farm.owner_id == user.user_id,
        )
        .first()
    )

    if not asset:
        raise HTTPException(
            status_code=404,
            detail="Asset not found",
        )

    return asset


@router.post(
    "/run/{asset_id}",
    response_model=schemas.AIAnalysisOut,
)
def run_analysis(
    asset_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Run AI analysis using the latest sensor reading
    for an asset owned by the current user.
    """

    asset = _check_owns_asset(
        db=db,
        asset_id=asset_id,
        user=current_user,
    )

    latest = (
        db.query(SensorReading)
        .filter(
            SensorReading.asset_id == asset_id
        )
        .order_by(
            SensorReading.timestamp.desc(),
            SensorReading.reading_id.desc(),
        )
        .first()
    )

    if not latest:
        raise HTTPException(
            status_code=400,
            detail="No sensor readings yet for this asset",
        )

    sensor_data = {
        "wind_speed": latest.wind_speed,
        "rotor_speed": latest.rotor_speed,
        "vibration": latest.vibration,
        "temperature": latest.temperature,
        "current": latest.current,
        "power_output": latest.power_output,
        "solar_irradiance": latest.solar_irradiance,
        "voltage": latest.voltage,
        "soiling_level": latest.soiling_level,
    }

    result = analyze_asset(
        sensor_data=sensor_data,
        asset_type=asset.asset_type,
    )

    contributing_factors = result.get(
        "contributing_factors",
        [],
    )

    if isinstance(contributing_factors, list):
        contributing_factors_text = "; ".join(
            str(factor)
            for factor in contributing_factors
        )
    else:
        contributing_factors_text = (
            str(contributing_factors)
            if contributing_factors
            else None
        )

    analysis = AIAnalysis(
        asset_id=asset_id,
        timestamp=latest.timestamp,
        anomaly_detected=result["anomaly_detected"],
        health_score=result["health_score"],
        risk_score=result["risk_score"],
        status=result["status"],
        probable_issue=result["probable_issue"],
        contributing_factors=contributing_factors_text,
        recommended_action=result[
            "recommended_action"
        ],
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return analysis


@router.get(
    "/asset/{asset_id}/latest",
    response_model=Optional[schemas.AIAnalysisOut],
)
def get_latest_analysis(
    asset_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Return the newest saved AI analysis for an asset.

    analysis_id is used as a tie-breaker when multiple analyses
    were generated from the same sensor reading.
    """

    _check_owns_asset(
        db=db,
        asset_id=asset_id,
        user=current_user,
    )

    return (
        db.query(AIAnalysis)
        .filter(
            AIAnalysis.asset_id == asset_id
        )
        .order_by(
            AIAnalysis.timestamp.desc(),
            AIAnalysis.analysis_id.desc(),
        )
        .first()
    )


@router.get(
    "/dashboard",
    response_model=List[schemas.AIAnalysisOut],
)
def get_risk_ranked_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Return the newest AI analysis for every asset belonging
    to the currently logged-in user.

    Results are ranked by risk score, highest first.
    """

    all_analyses = (
        db.query(AIAnalysis)
        .join(
            Asset,
            AIAnalysis.asset_id == Asset.asset_id,
        )
        .join(
            Farm,
            Asset.farm_id == Farm.farm_id,
        )
        .filter(
            Farm.owner_id == current_user.user_id
        )
        .order_by(
            AIAnalysis.timestamp.desc(),
            AIAnalysis.analysis_id.desc(),
        )
        .all()
    )

    latest_by_asset = {}

    for analysis in all_analyses:
        if analysis.asset_id not in latest_by_asset:
            latest_by_asset[
                analysis.asset_id
            ] = analysis

    return sorted(
        latest_by_asset.values(),
        key=lambda analysis: (
            analysis.risk_score or 0
        ),
        reverse=True,
    )


def cost_of_inaction(
    risk_score: float,
    days_unaddressed: int = 1,
) -> float:
    return round(
        risk_score
        * ASSUMED_ENERGY_VALUE_PER_RISK_DAY
        * days_unaddressed,
        2,
    )