"""
routers/assets.py

Add and list assets (solar panels / turbines) belonging to a farm.
"""

from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import Asset, Farm, User
from backend import schemas
from backend.auth import require_role, get_current_user

router = APIRouter(prefix="/assets", tags=["assets"])


def _check_owns_farm(db: Session, farm_id: int, user: User):
    farm = db.query(Farm).filter(Farm.farm_id == farm_id).first()

    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")

    if farm.owner_id != user.user_id:
        raise HTTPException(
            status_code=403,
            detail="You do not own this farm",
        )

    return farm


@router.post("", response_model=schemas.AssetOut)
def create_asset(
    asset_in: schemas.AssetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("farm_owner")),
):
    _check_owns_farm(db, asset_in.farm_id, current_user)

    new_asset = Asset(**asset_in.dict())

    db.add(new_asset)
    db.commit()
    db.refresh(new_asset)

    return new_asset


@router.get("", response_model=List[schemas.AssetOut])
def list_my_assets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Return all assets belonging to farms owned by the current user.
    """

    return (
        db.query(Asset)
        .join(Farm, Asset.farm_id == Farm.farm_id)
        .filter(Farm.owner_id == current_user.user_id)
        .order_by(Asset.asset_id.desc())
        .all()
    )


@router.get("/farm/{farm_id}", response_model=List[schemas.AssetOut])
def list_assets_for_farm(
    farm_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    _check_owns_farm(db, farm_id, current_user)

    return (
        db.query(Asset)
        .filter(Asset.farm_id == farm_id)
        .order_by(Asset.asset_id.desc())
        .all()
    )


@router.get("/{asset_id}", response_model=schemas.AssetOut)
def get_asset(
    asset_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    asset = db.query(Asset).filter(Asset.asset_id == asset_id).first()

    if not asset:
        raise HTTPException(
            status_code=404,
            detail="Asset not found",
        )

    _check_owns_farm(db, asset.farm_id, current_user)

    return asset