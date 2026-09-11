from pathlib import Path

import joblib
import numpy as np
import pandas as pd


# -------------------------------------------------------------------
# Model paths
# -------------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "ml_models"

WIND_MODEL_PATH = MODEL_DIR / "wind_isolation_forest.joblib"
SOLAR_MODEL_PATH = MODEL_DIR / "solar_isolation_forest.joblib"


# -------------------------------------------------------------------
# Load trained models once when the backend starts
# -------------------------------------------------------------------

if not WIND_MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Wind model not found at: {WIND_MODEL_PATH}"
    )

if not SOLAR_MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Solar model not found at: {SOLAR_MODEL_PATH}"
    )


wind_model = joblib.load(WIND_MODEL_PATH)
solar_model = joblib.load(SOLAR_MODEL_PATH)


# -------------------------------------------------------------------
# Feature definitions
# These MUST match the features used during Colab training.
# -------------------------------------------------------------------

WIND_FEATURES = [
    "wind_speed",
    "rotor_speed",
    "vibration",
    "temperature",
    "current",
    "power_output",
    "power_per_wind_speed",
    "power_per_rotor_speed",
]

SOLAR_FEATURES = [
    "solar_irradiance",
    "temperature",
    "voltage",
    "current",
    "power_output",
    "soiling_level",
    "power_per_irradiance",
    "current_per_irradiance",
]


# -------------------------------------------------------------------
# Safe division
# -------------------------------------------------------------------

def safe_divide(numerator, denominator):
    """
    Divide safely and prevent inf/NaN values caused by zero
    or missing sensor values.
    """
    if denominator is None or pd.isna(denominator) or denominator == 0:
        return 0.0

    if numerator is None or pd.isna(numerator):
        return 0.0

    return float(numerator) / float(denominator)


# -------------------------------------------------------------------
# Build engineered features
# -------------------------------------------------------------------

def build_features(sensor_data: dict, asset_type: str) -> pd.DataFrame:
    """
    Convert raw sensor readings into the exact engineered feature
    format expected by the trained Isolation Forest model.
    """

    asset_type = asset_type.lower()

    row = dict(sensor_data)

    if asset_type == "wind":

        row["power_per_wind_speed"] = safe_divide(
            row.get("power_output"),
            row.get("wind_speed"),
        )

        row["power_per_rotor_speed"] = safe_divide(
            row.get("power_output"),
            row.get("rotor_speed"),
        )

        # Ensure every required feature exists.
        for feature in WIND_FEATURES:
            if feature not in row or row[feature] is None:
                row[feature] = 0.0

        df = pd.DataFrame(
            [[row[feature] for feature in WIND_FEATURES]],
            columns=WIND_FEATURES,
        )

    elif asset_type == "solar":

        row["power_per_irradiance"] = safe_divide(
            row.get("power_output"),
            row.get("solar_irradiance"),
        )

        row["current_per_irradiance"] = safe_divide(
            row.get("current"),
            row.get("solar_irradiance"),
        )

        # Ensure every required feature exists.
        for feature in SOLAR_FEATURES:
            if feature not in row or row[feature] is None:
                row[feature] = 0.0

        df = pd.DataFrame(
            [[row[feature] for feature in SOLAR_FEATURES]],
            columns=SOLAR_FEATURES,
        )

    else:
        raise ValueError(
            f"Unsupported asset type: {asset_type}. "
            "Expected 'wind' or 'solar'."
        )

    # Replace invalid values.
    df = df.replace([np.inf, -np.inf], 0.0)
    df = df.fillna(0.0)

    return df


# -------------------------------------------------------------------
# Prediction
# -------------------------------------------------------------------

def predict_anomaly(sensor_data: dict, asset_type: str) -> dict:
    """
    Run the appropriate Isolation Forest model.

    Returns:
        anomaly_detected: bool
        anomaly_score: float
    """

    asset_type = asset_type.lower()

    features = build_features(sensor_data, asset_type)

    if asset_type == "wind":
        model = wind_model
    else:
        model = solar_model

    prediction = model.predict(features)[0]
    score = model.decision_function(features)[0]

    return {
        "anomaly_detected": bool(prediction == -1),
        "anomaly_score": float(score),
    }