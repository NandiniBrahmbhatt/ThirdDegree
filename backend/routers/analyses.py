"""
routers/analyses.py
Simple threshold-based anomaly detection (no ML training needed).
For each asset, compares its recent readings against its own rolling
baseline and produces a health score, risk score, and explainable reason.
"""

from typing import List, Optional
from statistics import mean, pstdev

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import SensorReading, AIAnalysis, Asset
from backend import schemas

router = APIRouter(prefix="/analyses", tags=["analyses"])

# Sensor fields we check for anomalies, and roughly how much each
# contributes to overall risk if it's abnormal.
MONITORED_FIELDS = ["vibration", "temperature", "current", "wind_speed", "soiling_level"]

# Assumed energy value per unit of "risk-day" - used for the cost-of-inaction
# number shown on the dashboard. Adjust to whatever your team wants to justify.
ASSUMED_ENERGY_VALUE_PER_RISK_DAY = 4000  # currency units per full day of unaddressed risk


def _baseline_stats(readings: List[SensorReading], field: str):
    values = [getattr(r, field) for r in readings if getattr(r, field) is not None]
    if len(values) < 5:
        return None, None  # not enough history to judge normal vs abnormal
    return mean(values), pstdev(values) or 1e-6  # avoid divide-by-zero


@router.post("/run/{asset_id}", response_model=schemas.AIAnalysisOut)
def run_analysis(asset_id: int, db: Session = Depends(get_db)):
    """
    Pulls the last ~50 readings for an asset, builds a baseline from the
    older readings, and checks the most recent reading against it.
    """
    asset = db.query(Asset).filter(Asset.asset_id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")

    readings = (
        db.query(SensorReading)
        .filter(SensorReading.asset_id == asset_id)
        .order_by(SensorReading.timestamp.desc())
        .limit(50)
        .all()
    )
    if not readings:
        raise HTTPException(status_code=400, detail="No sensor readings yet for this asset")

    latest = readings[0]
    history = readings[1:]  # everything except the newest reading forms the baseline

    triggered_factors = []
    deviation_scores = []

    for field in MONITORED_FIELDS:
        latest_value = getattr(latest, field)
        if latest_value is None:
            continue
        baseline_mean, baseline_std = _baseline_stats(history, field)
        if baseline_mean is None:
            continue

        z_score = abs(latest_value - baseline_mean) / baseline_std
        if z_score >= 2:  # more than 2 std devs away from that asset's own normal
            direction = "above" if latest_value > baseline_mean else "below"
            pct = abs((latest_value - baseline_mean) / baseline_mean) * 100 if baseline_mean else 0
            triggered_factors.append(
                f"{field.replace('_', ' ').title()} is {pct:.0f}% {direction} baseline "
                f"({latest_value:.2f} vs normal ~{baseline_mean:.2f})"
            )
            deviation_scores.append(z_score)

    anomaly_detected = len(triggered_factors) > 0
    risk_score = round(min(sum(deviation_scores) / 3, 1.0), 2) if deviation_scores else 0.0
    health_score = round(1.0 - risk_score, 2)

    if risk_score >= 0.66:
        status = "at_risk"
    elif risk_score >= 0.33:
        status = "watch"
    else:
        status = "healthy"

    probable_issue = None
    recommended_action = None
    if status != "healthy":
        # Very simple rule-based mapping - expand this table as needed
        if any("Vibration" in f for f in triggered_factors):
            probable_issue = "Possible bearing wear or mechanical imbalance"
            recommended_action = "Schedule a physical vibration inspection within 3-5 days"
        elif any("Temperature" in f for f in triggered_factors):
            probable_issue = "Possible overheating / cooling system issue"
            recommended_action = "Check cooling system and load levels"
        elif any("Soiling" in f for f in triggered_factors):
            probable_issue = "Panel soiling reducing output"
            recommended_action = "Schedule a cleaning visit"
        else:
            probable_issue = "Unusual sensor pattern detected"
            recommended_action = "Manual inspection recommended"

    analysis = AIAnalysis(
        asset_id=asset_id,
        anomaly_detected=anomaly_detected,
        health_score=health_score,
        risk_score=risk_score,
        status=status,
        probable_issue=probable_issue,
        contributing_factors="; ".join(triggered_factors) if triggered_factors else None,
        recommended_action=recommended_action,
    )
    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    return analysis


@router.get("/asset/{asset_id}/latest", response_model=Optional[schemas.AIAnalysisOut])
def get_latest_analysis(asset_id: int, db: Session = Depends(get_db)):
    return (
        db.query(AIAnalysis)
        .filter(AIAnalysis.asset_id == asset_id)
        .order_by(AIAnalysis.timestamp.desc())
        .first()
    )


@router.get("/dashboard", response_model=List[schemas.AIAnalysisOut])
def get_risk_ranked_dashboard(db: Session = Depends(get_db)):
    """
    Returns the latest analysis per asset, sorted by risk score descending -
    this is exactly what the risk-ranked dashboard should render.
    """
    # Simple approach for hackathon scale: pull all, keep the newest per asset in Python.
    all_analyses = db.query(AIAnalysis).order_by(AIAnalysis.timestamp.desc()).all()
    latest_by_asset = {}
    for a in all_analyses:
        if a.asset_id not in latest_by_asset:
            latest_by_asset[a.asset_id] = a
    return sorted(latest_by_asset.values(), key=lambda a: a.risk_score or 0, reverse=True)


def cost_of_inaction(risk_score: float, days_unaddressed: int = 1) -> float:
    """Simple cost-of-inaction number: risk_score x assumed value x days left unaddressed."""
    return round(risk_score * ASSUMED_ENERGY_VALUE_PER_RISK_DAY * days_unaddressed, 2)