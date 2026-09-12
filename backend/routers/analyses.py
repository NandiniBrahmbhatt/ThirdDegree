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


# Demo tariff used to convert estimated energy loss into revenue impact.
# This is intentionally simple and deterministic for the hackathon demo.
ENERGY_VALUE_PER_KWH = 8.0


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


def estimate_expected_power(
    sensor_data: dict,
    asset_type: str,
) -> float:
    """
    Estimate expected power output under the current operating
    conditions using the same relationships used by the simulator.

    Returns power in kW.
    """

    actual_power = float(
        sensor_data.get("power_output") or 0
    )

    if asset_type.lower() == "wind":
        wind_speed = float(
            sensor_data.get("wind_speed") or 0
        )

        if wind_speed <= 0:
            return actual_power

        # Mirrors the simulator's healthy wind relationship.
        # At 14 m/s the expected output is approximately 8.0 kW.
        expected_power = (
            wind_speed / 14.0
        ) * 8000.0 / 1000.0

        return round(expected_power, 2)

    if asset_type.lower() == "solar":
        irradiance = float(
            sensor_data.get("solar_irradiance") or 0
        )

        if irradiance <= 0:
            return actual_power

        # Mirrors the simulator's healthy solar relationship.
        # At 1000 W/m² the expected output is approximately 8.5 kW.
        expected_power = (
            irradiance / 1000.0
        ) * 8500.0 / 1000.0

        return round(expected_power, 2)

    return actual_power


def calculate_financial_impact(
    sensor_data: dict,
    asset_type: str,
) -> tuple[float, float]:
    """
    Estimate daily energy and revenue loss.

    Expected power - observed power = performance gap.

    The performance gap is converted from kW to estimated
    daily energy loss in kWh using 24 operating hours.

    Revenue impact is then estimated using the configured
    energy value per kWh.
    """

    actual_power = float(
        sensor_data.get("power_output") or 0
    )

    expected_power = estimate_expected_power(
        sensor_data=sensor_data,
        asset_type=asset_type,
    )

    power_gap = max(
        0.0,
        expected_power - (actual_power / 1000.0),
    )

    energy_loss = power_gap * 24.0

    revenue_loss = (
        energy_loss
        * ENERGY_VALUE_PER_KWH
    )

    return (
        round(energy_loss, 2),
        round(revenue_loss, 2),
    )


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

    energy_loss_estimate, revenue_loss_estimate = (
        calculate_financial_impact(
            sensor_data=sensor_data,
            asset_type=asset.asset_type,
        )
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
        energy_loss_estimate=energy_loss_estimate,
        revenue_loss_estimate=revenue_loss_estimate,
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