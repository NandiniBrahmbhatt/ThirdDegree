"""
routers/technicians.py

Technician profile endpoints.

Technicians can view and update their own professional details.
Farm owners can search the technician directory using name, city,
or specialization.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_
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
        profile = TechnicianProfile(user_id=current_user.user_id)
        db.add(profile)

    profile.city = profile_in.city
    profile.address = profile_in.address
    profile.experience = profile_in.experience
    profile.specialization = profile_in.specialization
    profile.charges = profile_in.charges

    db.commit()
    db.refresh(profile)

    return profile


@router.get("/directory")
def get_technician_directory(
    search: str = Query(default=""),
    city: str = Query(default=""),
    specialization: str = Query(default=""),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("farm_owner")),
):
    query = (
        db.query(TechnicianProfile, User)
        .join(User, TechnicianProfile.user_id == User.user_id)
        .filter(User.role == "technician")
    )

    search = search.strip()
    city = city.strip()
    specialization = specialization.strip()

    if search:
        search_pattern = f"%{search}%"

        query = query.filter(
            or_(
                User.full_name.ilike(search_pattern),
                TechnicianProfile.specialization.ilike(search_pattern),
                TechnicianProfile.experience.ilike(search_pattern),
                TechnicianProfile.city.ilike(search_pattern),
            )
        )

    if city:
        query = query.filter(
            TechnicianProfile.city.ilike(f"%{city}%")
        )

    if specialization and specialization.lower() != "all specializations":
        query = query.filter(
            TechnicianProfile.specialization.ilike(
                f"%{specialization}%"
            )
        )

    results = query.order_by(User.full_name.asc()).all()

    technicians = []

    for profile, user in results:
        specializations = []

        if profile.specialization:
            specializations = [
                item.strip()
                for item in profile.specialization.replace("&", ",").split(",")
                if item.strip()
            ]

        technicians.append(
            {
                "technician_id": profile.technician_id,
                "user_id": user.user_id,
                "name": user.full_name,
                "phone": user.phone,
                "city": profile.city,
                "address": profile.address,
                "experience": profile.experience,
                "specialization": profile.specialization,
                "specializations": specializations,
                "charges": (
                    float(profile.charges)
                    if profile.charges is not None
                    else None
                ),
            }
        )

    return technicians