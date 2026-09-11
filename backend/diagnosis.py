# -------------------------------------------------------------------
# Wind issue codes
# -------------------------------------------------------------------

WIND_BEARING = {
    "issue_code": "WIND_BEARING",
    "probable_issue": "Possible bearing degradation",
    "recommendation": (
        "Inspect bearing vibration and temperature trends "
        "and schedule bearing maintenance."
    ),
}

WIND_GEARBOX = {
    "issue_code": "WIND_GEARBOX",
    "probable_issue": "Possible gearbox abnormality",
    "recommendation": (
        "Inspect gearbox vibration and rotor-speed behaviour "
        "and schedule further diagnostics."
    ),
}

WIND_GENERATOR = {
    "issue_code": "WIND_GENERATOR",
    "probable_issue": "Possible generator/electrical abnormality",
    "recommendation": (
        "Inspect generator current and power-output behaviour "
        "and perform electrical diagnostics."
    ),
}

WIND_GENERAL = {
    "issue_code": "WIND_GENERAL",
    "probable_issue": "Possible abnormal operating condition",
    "recommendation": (
        "Inspect recent sensor trends and schedule further diagnostics."
    ),
}


# -------------------------------------------------------------------
# Solar issue codes
# -------------------------------------------------------------------

SOLAR_SOILING = {
    "issue_code": "SOLAR_SOILING",
    "probable_issue": "Possible excessive soiling",
    "recommendation": (
        "Inspect the panel surface and consider cleaning the solar asset."
    ),
}

SOLAR_OVERHEATING = {
    "issue_code": "SOLAR_OVERHEATING",
    "probable_issue": "Possible inverter overheating",
    "recommendation": (
        "Inspect inverter temperature, cooling and ventilation."
    ),
}

SOLAR_ELECTRICAL = {
    "issue_code": "SOLAR_ELECTRICAL",
    "probable_issue": "Possible electrical performance degradation",
    "recommendation": (
        "Inspect voltage, current and power-output behaviour "
        "for electrical performance issues."
    ),
}

SOLAR_GENERAL = {
    "issue_code": "SOLAR_GENERAL",
    "probable_issue": "Possible abnormal operating condition",
    "recommendation": (
        "Inspect recent sensor trends and schedule further diagnostics."
    ),
}


# -------------------------------------------------------------------
# Wind diagnosis
# -------------------------------------------------------------------

def diagnose_wind(row: dict) -> dict:
    factors = []

    vibration = row.get("vibration")
    temperature = row.get("temperature")
    rotor_speed = row.get("rotor_speed")
    current = row.get("current")
    power_output = row.get("power_output")

    if vibration is not None and temperature is not None:
        if vibration > 1.5 and temperature > 65:
            factors.extend([
                "Elevated vibration",
                "Increased temperature",
            ])

            return {
                **WIND_BEARING,
                "contributing_factors": factors,
            }

    if vibration is not None and rotor_speed is not None:
        if vibration > 1.8 and rotor_speed > 20:
            factors.extend([
                "High vibration",
                "Elevated rotor speed",
            ])

            return {
                **WIND_GEARBOX,
                "contributing_factors": factors,
            }

    if current is not None and power_output is not None:
        if current > 80 and power_output < 5000:
            factors.extend([
                "High current",
                "Low power output",
            ])

            return {
                **WIND_GENERATOR,
                "contributing_factors": factors,
            }

    return {
        **WIND_GENERAL,
        "contributing_factors": [
            "Sensor behaviour differs from learned healthy patterns"
        ],
    }


# -------------------------------------------------------------------
# Solar diagnosis
# -------------------------------------------------------------------

def diagnose_solar(row: dict) -> dict:
    soiling_level = row.get("soiling_level")
    power_per_irradiance = row.get("power_per_irradiance")
    temperature = row.get("temperature")
    voltage = row.get("voltage")

    if (
        soiling_level is not None
        and power_per_irradiance is not None
        and soiling_level > 0.5
        and power_per_irradiance < 10
    ):
        return {
            **SOLAR_SOILING,
            "contributing_factors": [
                "High soiling level",
                "Reduced power relative to irradiance",
            ],
        }

    if temperature is not None and temperature > 75:
        return {
            **SOLAR_OVERHEATING,
            "contributing_factors": [
                "High temperature",
            ],
        }

    if (
        voltage is not None
        and power_per_irradiance is not None
        and voltage < 370
        and power_per_irradiance < 12
    ):
        return {
            **SOLAR_ELECTRICAL,
            "contributing_factors": [
                "Low voltage",
                "Reduced power relative to irradiance",
            ],
        }

    return {
        **SOLAR_GENERAL,
        "contributing_factors": [
            "Sensor behaviour differs from learned healthy patterns"
        ],
    }


# -------------------------------------------------------------------
# Unified diagnosis function
# -------------------------------------------------------------------

def diagnose(sensor_data: dict, asset_type: str) -> dict:
    asset_type = asset_type.lower()

    if asset_type == "wind":
        return diagnose_wind(sensor_data)

    if asset_type == "solar":
        return diagnose_solar(sensor_data)

    raise ValueError(
        f"Unsupported asset type: {asset_type}"
    )