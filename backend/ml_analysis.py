from backend.ml_model import predict_anomaly, build_features, WIND_FEATURES, SOLAR_FEATURES
from backend.diagnosis import diagnose


# -------------------------------------------------------------------
# Risk-score conversion
# -------------------------------------------------------------------

MIN_ANOMALY_SCORE = -0.12
MAX_ANOMALY_SCORE = 0.13


def calculate_risk_health(anomaly_score: float):
    """
    Convert the Isolation Forest anomaly score into the same
    0-100 risk/health scale used by the ML pipeline.

    Higher anomaly = higher risk.
    """

    normalized_risk = (
        MAX_ANOMALY_SCORE - anomaly_score
    ) / (
        MAX_ANOMALY_SCORE - MIN_ANOMALY_SCORE
    )

    normalized_risk = max(
        0.0,
        min(1.0, normalized_risk)
    )

    risk_score = round(normalized_risk * 100, 2)
    health_score = round(100 - risk_score, 2)

    return risk_score, health_score


# -------------------------------------------------------------------
# Status conversion
# -------------------------------------------------------------------

def calculate_status(risk_score: float) -> str:

    if risk_score < 25:
        return "healthy"

    if risk_score < 75:
        return "watch"

    return "at_risk"


# -------------------------------------------------------------------
# Complete asset analysis
# -------------------------------------------------------------------

def analyze_asset(sensor_data: dict, asset_type: str) -> dict:
    """
    Complete ML + diagnosis pipeline.

    Input:
        Raw sensor values + asset type

    Output:
        anomaly
        anomaly score
        risk
        health
        status
        probable issue
        contributing factors
        recommendation
    """

    ml_result = predict_anomaly(
        sensor_data=sensor_data,
        asset_type=asset_type,
    )

    anomaly_score = ml_result["anomaly_score"]

    risk_score, health_score = calculate_risk_health(
        anomaly_score
    )

    status = calculate_status(
        risk_score
    )

    diagnosis = diagnose(
        sensor_data=sensor_data,
        asset_type=asset_type,
    )

    return {
        "anomaly_detected": ml_result["anomaly_detected"],
        "anomaly_score": anomaly_score,
        "risk_score": risk_score,
        "health_score": health_score,
        "status": status,
        "issue_code": diagnosis["issue_code"],
        "probable_issue": diagnosis["probable_issue"],
        "contributing_factors": diagnosis["contributing_factors"],
        "recommended_action": diagnosis["recommendation"],
    }