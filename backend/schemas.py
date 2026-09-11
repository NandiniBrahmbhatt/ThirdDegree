from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel


class UserCreate(BaseModel):
    username_email: str
    password: str
    full_name: str
    phone: Optional[str] = None
    role: str


class UserLogin(BaseModel):
    username_email: str
    password: str


class UserOut(BaseModel):
    user_id: int
    username_email: str
    full_name: str
    phone: Optional[str]
    role: str
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str


class FarmCreate(BaseModel):
    farm_name: str
    location: Optional[str] = None
    capacity: Optional[float] = None
    energy_type: Optional[str] = None


class FarmOut(BaseModel):
    farm_id: int
    owner_id: int
    farm_name: str
    location: Optional[str]
    capacity: Optional[float]
    energy_type: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class AssetCreate(BaseModel):
    farm_id: int
    asset_label: str
    asset_type: str
    installation_date: Optional[date] = None
    capacity: Optional[float] = None
    location: Optional[str] = None


class AssetOut(BaseModel):
    asset_id: int
    farm_id: int
    asset_label: str
    asset_type: str
    installation_date: Optional[date]
    capacity: Optional[float]
    location: Optional[str]

    class Config:
        from_attributes = True


class SensorReadingCreate(BaseModel):
    asset_id: int
    wind_speed: Optional[float] = None
    rotor_speed: Optional[float] = None
    vibration: Optional[float] = None
    temperature: Optional[float] = None
    current: Optional[float] = None
    power_output: Optional[float] = None
    solar_irradiance: Optional[float] = None
    voltage: Optional[float] = None
    soiling_level: Optional[float] = None


class SensorReadingOut(SensorReadingCreate):
    reading_id: int
    timestamp: datetime

    class Config:
        from_attributes = True


class AIAnalysisOut(BaseModel):
    analysis_id: int
    asset_id: int
    timestamp: datetime
    anomaly_detected: bool
    health_score: Optional[float]
    risk_score: Optional[float]
    status: Optional[str]
    probable_issue: Optional[str]
    contributing_factors: Optional[str]
    recommended_action: Optional[str]

    class Config:
        from_attributes = True


class TechnicianProfileCreate(BaseModel):
    city: Optional[str] = None
    address: Optional[str] = None
    experience: Optional[str] = None
    specialization: Optional[str] = None
    charges: Optional[float] = None


class TechnicianProfileOut(TechnicianProfileCreate):
    technician_id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class JobCreate(BaseModel):
    analysis_id: int
    technician_id: int


class JobUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None


class JobOut(BaseModel):
    job_id: int
    analysis_id: int
    technician_id: int
    assigned_by: int
    status: str
    notes: Optional[str]
    assigned_at: datetime
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True
