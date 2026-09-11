"""
routers/sensors.py
Ingest sensor readings (from simulate.py) and fetch recent readings for
display on the dashboard / trend charts.
"""

from typing import List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import SensorReading
from backend import schemas

router = APIRouter(prefix="/sensors", tags=["sensors"])


@router.post("", response_model=schemas.SensorReadingOut)
def ingest_reading(reading_in: schemas.SensorReadingCreate, db: Session = Depends(get_db)):
    """Called by simulate.py (or real hardware later) to store one new reading."""
    new_reading = SensorReading(**reading_in.dict())
    db.add(new_reading)
    db.commit()
    db.refresh(new_reading)
    return new_reading


@router.get("/asset/{asset_id}/latest", response_model=List[schemas.SensorReadingOut])
def get_latest_readings(
    asset_id: int,
    limit: int = Query(default=50, le=500),
    db: Session = Depends(get_db),
):
    """Most recent N readings for one asset, newest first - used for trend charts."""
    return (
        db.query(SensorReading)
        .filter(SensorReading.asset_id == asset_id)
        .order_by(SensorReading.timestamp.desc())
        .limit(limit)
        .all()
    )