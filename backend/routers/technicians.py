"""
routers/technicians.py

Technician profile endpoints.

Technicians can view and update their own professional details.
The logged-in technician is identified from the JWT token, so the
frontend never needs to send a user_id.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import User, TechnicianProfile
from backend import schemas
from backend.auth import require_role

router = APIRouter(
    prefix="/technicians",
    tags=["technicians"],
)


@router.get(
    "/profile",
    response_model=schemas.TechnicianProfileOut,
)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("technician")),
):
    profile = (
        db.query(TechnicianProfile)
        .filter(TechnicianProfile.user_id == current_user.user_id)
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Technician profile not found",
        )

    return profile


@router.put(
    "/profile",
    response_model=schemas.TechnicianProfileOut,
)
def update_my_profile(
    profile_in: schemas.TechnicianProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("technician")),
):
    profile = (
        db.query(TechnicianProfile)
        .filter(TechnicianProfile.user_id == current_user.user_id)
        .first()
    )

    if not profile:
        profile = TechnicianProfile(
            user_id=current_user.user_id
        )
        db.add(profile)

    profile.city = profile_in.city
    profile.address = profile_in.address
    profile.experience = profile_in.experience
    profile.specialization = profile_in.specialization
    profile.charges = profile_in.charges

    db.commit()
    db.refresh(profile)

    return profile