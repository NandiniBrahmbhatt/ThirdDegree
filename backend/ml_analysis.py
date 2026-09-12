from backend.ml_model import predict_anomaly
from backend.diagnosis import diagnose


MIN_ANOMALY_SCORE = -0.12
MAX_ANOMALY_SCORE = 0.13

# If the diagnostic rules identify a specific fault pattern,
# the asset should not be presented as healthy even if the
# statistical anomaly model is less confident.
RULE_BASED_MIN_RISK = 75.0


def calculate_risk_health(anomaly_score: float):
    normalized_risk = (
        MAX_ANOMALY_SCORE - anomaly_score
    ) / (
        MAX_ANOMALY_SCORE - MIN_ANOMALY_SCORE
    )

    normalized_risk = max(
        0.0,
        min(1.0, normalized_risk),
    )

    risk_score = round(
        normalized_risk * 100,
        2,
    )

    health_score = round(
        100 - risk_score,
        2,
    )

    return risk_score, health_score


def calculate_status(risk_score: float) -> str:
    if risk_score < 25:
        return "healthy"

    if risk_score < 75:
        return "watch"

    return "at_risk"


def analyze_asset(
    sensor_data: dict,
    asset_type: str,
) -> dict:
    # ---------------------------------------------------------
    # 1. Statistical anomaly detection
    # ---------------------------------------------------------
    ml_result = predict_anomaly(
        sensor_data=sensor_data,
        asset_type=asset_type,
    )

    anomaly_score = ml_result["anomaly_score"]

    risk_score, health_score = calculate_risk_health(
        anomaly_score
    )

    # ---------------------------------------------------------
    # 2. Engineering/rule-based diagnosis
    # ---------------------------------------------------------
    diagnosis = diagnose(
        sensor_data=sensor_data,
        asset_type=asset_type,
    )

    issue_code = diagnosis["issue_code"]

    # ---------------------------------------------------------
    # 3. Combine ML + engineering diagnosis
    # ---------------------------------------------------------
    #
    # The Isolation Forest identifies unusual patterns.
    # The diagnosis rules identify known fault signatures.
    #
    # If either system identifies a meaningful problem,
    # the asset should not be reported as completely healthy.
    #
    has_specific_issue = (
        issue_code
        and not issue_code.endswith("_GENERAL")
    )

    anomaly_detected = ml_result["anomaly_detected"]

    if has_specific_issue:
        anomaly_detected = True

        # A specific engineering fault pattern is significant
        # enough to put the asset into the at-risk category,
        # even if the statistical model is less confident.
        risk_score = max(
            risk_score,
            RULE_BASED_MIN_RISK,
        )

        health_score = round(
            100 - risk_score,
            2,
        )

    status = calculate_status(risk_score)

    # ---------------------------------------------------------
    # 4. Final combined analysis
    # ---------------------------------------------------------
    return {
        "anomaly_detected": anomaly_detected,
        "anomaly_score": anomaly_score,
        "risk_score": risk_score,
        "health_score": health_score,
        "status": status,
        "issue_code": issue_code,
        "probable_issue": diagnosis["probable_issue"],
        "contributing_factors": diagnosis[
            "contributing_factors"
        ],
        "recommended_action": diagnosis[
            "recommendation"
        ],
    }