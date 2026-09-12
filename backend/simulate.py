"""
simulate.py

Realistic sensor simulator for RenewAI.

Generates healthy and abnormal sensor readings for all assets
stored in the database and sends them to the FastAPI sensor API.

Usage:
    python simulate.py

The simulator generates:
    - Wind turbine sensor data
    - Solar asset sensor data
    - Mostly healthy readings
    - Occasional abnormal readings for AI/anomaly demonstration
"""

import random
import time
from datetime import datetime, timezone

import requests

from backend.database import SessionLocal
from backend.models import Asset


API_URL = "http://localhost:8000/sensors"

# Time between simulation cycles.
INTERVAL_SECONDS = 5

# Probability that an asset produces an abnormal reading.
ANOMALY_PROBABILITY = 0.15


def generate_wind_reading(asset_id: int, abnormal: bool) -> dict:
    """
    Generate one realistic wind-turbine sensor reading.
    """

    wind_speed = random.uniform(6, 14)

    if abnormal:
        fault_type = random.choice(
            [
                "bearing",
                "gearbox",
                "generator",
            ]
        )

        if fault_type == "bearing":
            vibration = random.uniform(1.6, 2.4)
            temperature = random.uniform(66, 85)
            rotor_speed = random.uniform(12, 20)
            current = random.uniform(35, 70)

            # Reduced output because of degraded operation.
            power_output = random.uniform(3500, 6000)

        elif fault_type == "gearbox":
            vibration = random.uniform(1.8, 2.6)
            temperature = random.uniform(55, 75)
            rotor_speed = random.uniform(20, 27)
            current = random.uniform(35, 70)
            power_output = random.uniform(3500, 6500)

        else:
            vibration = random.uniform(0.5, 1.5)
            temperature = random.uniform(45, 70)
            rotor_speed = random.uniform(10, 22)
            current = random.uniform(82, 105)
            power_output = random.uniform(2500, 5000)

    else:
        vibration = random.uniform(0.05, 1.2)
        temperature = random.uniform(25, 60)
        rotor_speed = random.uniform(8, 20)
        current = random.uniform(30, 75)

        # Power roughly follows available wind energy.
        power_output = (
            wind_speed / 14
        ) * random.uniform(6500, 9500)

    return {
        "asset_id": asset_id,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "wind_speed": round(wind_speed, 2),
        "rotor_speed": round(rotor_speed, 2),
        "vibration": round(vibration, 3),
        "temperature": round(temperature, 2),
        "current": round(current, 2),
        "power_output": round(power_output, 2),
        "solar_irradiance": None,
        "voltage": round(random.uniform(380, 450), 2),
        "soiling_level": None,
    }


def generate_solar_reading(asset_id: int, abnormal: bool) -> dict:
    """
    Generate one realistic solar sensor reading.
    """

    irradiance = random.uniform(500, 1000)

    if abnormal:
        fault_type = random.choice(
            [
                "soiling",
                "overheating",
                "electrical",
            ]
        )

        if fault_type == "soiling":
            soiling_level = random.uniform(0.55, 0.9)
            temperature = random.uniform(30, 60)
            voltage = random.uniform(390, 450)
            current = random.uniform(8, 18)

            # Heavy soiling reduces useful output.
            power_output = random.uniform(3500, 6500)

        elif fault_type == "overheating":
            soiling_level = random.uniform(0.05, 0.3)
            temperature = random.uniform(76, 95)
            voltage = random.uniform(370, 440)
            current = random.uniform(8, 18)
            power_output = random.uniform(4500, 7500)

        else:
            soiling_level = random.uniform(0.05, 0.3)
            temperature = random.uniform(30, 65)
            voltage = random.uniform(300, 365)
            current = random.uniform(5, 15)
            power_output = random.uniform(3500, 6500)

    else:
        soiling_level = random.uniform(0.0, 0.3)
        temperature = random.uniform(25, 60)
        voltage = random.uniform(390, 460)
        current = random.uniform(10, 25)

        # Healthy solar output follows irradiance.
        power_output = (
            irradiance / 1000
        ) * random.uniform(7000, 10000)

    return {
        "asset_id": asset_id,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "wind_speed": None,
        "rotor_speed": None,
        "vibration": round(random.uniform(0.02, 0.4), 3),
        "temperature": round(temperature, 2),
        "current": round(current, 2),
        "power_output": round(power_output, 2),
        "solar_irradiance": round(irradiance, 2),
        "voltage": round(voltage, 2),
        "soiling_level": round(soiling_level, 3),
    }


def generate_reading(asset: Asset) -> dict:
    """
    Generate a sensor reading based on the asset type.
    """

    abnormal = random.random() < ANOMALY_PROBABILITY

    if asset.asset_type.lower() == "wind":
        reading = generate_wind_reading(
            asset_id=asset.asset_id,
            abnormal=abnormal,
        )
    elif asset.asset_type.lower() == "solar":
        reading = generate_solar_reading(
            asset_id=asset.asset_id,
            abnormal=abnormal,
        )
    else:
        raise ValueError(
            f"Unsupported asset type: {asset.asset_type}"
        )

    reading["_abnormal_simulation"] = abnormal

    return reading


def send_reading(reading: dict) -> bool:
    """
    Send one sensor reading to the FastAPI backend.
    """

    abnormal = reading.pop("_abnormal_simulation", False)

    try:
        response = requests.post(
            API_URL,
            json=reading,
            timeout=5,
        )

        response.raise_for_status()

        print(
            f"[{'ANOMALY' if abnormal else 'HEALTHY':7}] "
            f"Asset {reading['asset_id']} | "
            f"Power={reading['power_output']:.0f} | "
            f"Temp={reading['temperature']:.1f} | "
            f"Vibration={reading['vibration']:.2f}"
        )

        return True

    except requests.RequestException as error:
        print(
            f"[ERROR] Could not send reading for "
            f"asset {reading['asset_id']}: {error}"
        )
        return False


def get_assets():
    """
    Load all assets currently stored in PostgreSQL.
    """

    with SessionLocal() as db:
        return db.query(Asset).all()


def run(interval_seconds: int = INTERVAL_SECONDS):
    """
    Continuously generate and send readings.
    """

    print("=" * 60)
    print("RenewAI Sensor Simulator")
    print("=" * 60)
    print(f"API: {API_URL}")
    print(f"Interval: {interval_seconds} seconds")
    print(
        f"Anomaly probability: "
        f"{ANOMALY_PROBABILITY * 100:.0f}%"
    )
    print("=" * 60)

    while True:
        assets = get_assets()

        if not assets:
            print(
                "[INFO] No assets found. "
                "Create an asset from the frontend first."
            )
        else:
            for asset in assets:
                reading = generate_reading(asset)
                send_reading(reading)

        time.sleep(interval_seconds)


if __name__ == "__main__":
    try:
        run()
    except KeyboardInterrupt:
        print("\nSensor simulator stopped.")