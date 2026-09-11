"""
routers/farms.py
Farm owners register and view their farms.
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import Farm, User
from backend import schemas
from backend.auth import get_current_user, require_role

router = APIRouter(prefix="/farms", tags=["farms"])


@router.post("", response_model=schemas.FarmOut)
def create_farm(
    farm_in: schemas.FarmCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("farm_owner")),
):
    new_farm = Farm(owner_id=current_user.user_id, **farm_in.dict())
    db.add(new_farm)
    db.commit()
    db.refresh(new_farm)
    return new_farm


@router.get("", response_model=List[schemas.FarmOut])
def list_my_farms(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("farm_owner")),
):
    return db.query(Farm).filter(Farm.owner_id == current_user.user_id).all()


@router.get("/{farm_id}", response_model=schemas.FarmOut)
def get_farm(
    farm_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    farm = db.query(Farm).filter(Farm.farm_id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
    if farm.owner_id != current_user.user_id and current_user.role != "technician":
        raise HTTPException(status_code=403, detail="Not authorized to view this farm")
    return farm