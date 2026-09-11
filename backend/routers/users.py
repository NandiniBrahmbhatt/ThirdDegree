"""
routers/users.py
Signup and login for both farm owners and technicians.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import User, TechnicianProfile
from backend import schemas
from backend.auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/signup", response_model=schemas.UserOut)
def signup(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    if user_in.role not in ("farm_owner", "technician"):
        raise HTTPException(status_code=400, detail="role must be 'farm_owner' or 'technician'")

    existing = db.query(User).filter(User.username_email == user_in.username_email).first()
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists")

    new_user = User(
        username_email=user_in.username_email,
        password_hash=hash_password(user_in.password),
        full_name=user_in.full_name,
        phone=user_in.phone,
        role=user_in.role,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Auto-create an empty technician profile so it exists to fill in later
    if new_user.role == "technician":
        profile = TechnicianProfile(user_id=new_user.user_id)
        db.add(profile)
        db.commit()

    return new_user


@router.post("/login", response_model=schemas.Token)
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username_email == credentials.username_email).first()
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    token = create_access_token(data={"sub": str(user.user_id), "role": user.role})
    return schemas.Token(access_token=token, role=user.role)


@router.get("/me", response_model=schemas.UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user