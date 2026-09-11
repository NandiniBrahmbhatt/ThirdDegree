import random
import time

from backend.database import SessionLocal
from backend.models import Asset, SensorReading


def generate_reading(asset: Asset) -> SensorReading:
    return SensorReading(
        asset_id=asset.asset_id,
        wind_speed=round(random.uniform(3, 14), 2) if asset.asset_type == "wind" else None,
        rotor_speed=round(random.uniform(5, 25), 2) if asset.asset_type == "wind" else None,
        vibration=round(random.uniform(0.05, 1.5), 3),
        temperature=round(random.uniform(20, 80), 2),
        current=round(random.uniform(1, 20), 2),
        power_output=round(random.uniform(10, 500), 2),
        solar_irradiance=round(random.uniform(200, 1000), 2)
        if asset.asset_type == "solar"
        else None,
        voltage=round(random.uniform(200, 480), 2),
        soiling_level=round(random.uniform(0, 0.4), 3)
        if asset.asset_type == "solar"
        else None,
    )


def run(interval_seconds: int = 5) -> None:
    while True:
        with SessionLocal() as db:
            for asset in db.query(Asset).all():
                db.add(generate_reading(asset))
            db.commit()
        time.sleep(interval_seconds)


if __name__ == "__main__":
    run()