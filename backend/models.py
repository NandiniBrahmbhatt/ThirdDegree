"""
models.py
SQLAlchemy ORM models - one class per table, matching the schema:
users, farms, assets, sensor_readings, ai_analyses, technician_profile.

NOTE: maintenance_jobs is added here too - it links a flagged ai_analysis
to a technician, since the original schema had no way to represent
"who is assigned to fix what." Remove it if you don't need job assignment.
"""

from sqlalchemy import (
    Column, Integer, BigInteger, String, Text, Float, Numeric,
    Boolean, Date, TIMESTAMP, ForeignKey, CheckConstraint, UniqueConstraint
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username_email = Column(String, nullable=False, unique=True, index=True)
    password_hash = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    role = Column(String, nullable=False)  # 'farm_owner' or 'technician'
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    __table_args__ = (
        CheckConstraint("role IN ('farm_owner', 'technician')", name="chk_role"),
    )

    farms = relationship("Farm", back_populates="owner", cascade="all, delete-orphan")
    technician_profile = relationship(
        "TechnicianProfile", back_populates="user", uselist=False, cascade="all, delete-orphan"
    )
    jobs = relationship(
        "MaintenanceJob",
        foreign_keys="MaintenanceJob.technician_id",
        back_populates="technician",
    )


class Farm(Base):
    __tablename__ = "farms"

    farm_id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    farm_name = Column(String, nullable=False)
    location = Column(String, nullable=True)
    capacity = Column(Float, nullable=True)
    energy_type = Column(String, nullable=True)  # 'solar' / 'wind' / 'mixed'
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    __table_args__ = (
        CheckConstraint("energy_type IN ('solar', 'wind', 'mixed')", name="chk_energy_type"),
    )

    owner = relationship("User", back_populates="farms")
    assets = relationship("Asset", back_populates="farm", cascade="all, delete-orphan")


class Asset(Base):
    __tablename__ = "assets"

    asset_id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.farm_id", ondelete="CASCADE"), nullable=False)
    asset_label = Column(String, nullable=False)  # user-facing e.g. "WT-007"
    asset_type = Column(String, nullable=False)   # 'solar' / 'wind'
    installation_date = Column(Date, nullable=True)
    capacity = Column(Float, nullable=True)
    location = Column(String, nullable=True)

    __table_args__ = (
        CheckConstraint("asset_type IN ('solar', 'wind')", name="chk_asset_type"),
    )

    farm = relationship("Farm", back_populates="assets")
    readings = relationship("SensorReading", back_populates="asset", cascade="all, delete-orphan")
    analyses = relationship("AIAnalysis", back_populates="asset", cascade="all, delete-orphan")


class SensorReading(Base):
    __tablename__ = "sensor_readings"

    reading_id = Column(BigInteger, primary_key=True, index=True)
    asset_id = Column(Integer, ForeignKey("assets.asset_id", ondelete="CASCADE"), nullable=False)
    timestamp = Column(TIMESTAMP(timezone=True), server_default=func.now(), index=True)

    wind_speed = Column(Float, nullable=True)
    rotor_speed = Column(Float, nullable=True)
    vibration = Column(Float, nullable=True)
    temperature = Column(Float, nullable=True)
    current = Column(Float, nullable=True)
    power_output = Column(Float, nullable=True)
    solar_irradiance = Column(Float, nullable=True)
    voltage = Column(Float, nullable=True)
    soiling_level = Column(Float, nullable=True)

    asset = relationship("Asset", back_populates="readings")


class AIAnalysis(Base):
    __tablename__ = "ai_analyses"

    analysis_id = Column(Integer, primary_key=True, index=True)
    asset_id = Column(Integer, ForeignKey("assets.asset_id", ondelete="CASCADE"), nullable=False)
    timestamp = Column(TIMESTAMP(timezone=True), server_default=func.now(), index=True)

    anomaly_detected = Column(Boolean, nullable=False, default=False)
    health_score = Column(Float, nullable=True)
    risk_score = Column(Float, nullable=True)
    status = Column(String, nullable=True)  # 'healthy' / 'watch' / 'at_risk'
    probable_issue = Column(Text, nullable=True)
    contributing_factors = Column(Text, nullable=True)
    recommended_action = Column(Text, nullable=True)

    __table_args__ = (
        CheckConstraint("status IN ('healthy', 'watch', 'at_risk')", name="chk_status"),
    )

    asset = relationship("Asset", back_populates="analyses")
    jobs = relationship("MaintenanceJob", back_populates="analysis", cascade="all, delete-orphan")


class TechnicianProfile(Base):
    __tablename__ = "technician_profile"

    technician_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    city = Column(String, nullable=True)
    address = Column(String, nullable=True)
    experience = Column(String, nullable=True)
    specialization = Column(String, nullable=True)
    charges = Column(Numeric(10, 2), nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint("user_id", name="uq_technician_user"),
    )

    user = relationship("User", back_populates="technician_profile")


class MaintenanceJob(Base):
    """Links a flagged ai_analysis to a technician for follow-up."""
    __tablename__ = "maintenance_jobs"

    job_id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("ai_analyses.analysis_id", ondelete="CASCADE"), nullable=False)
    technician_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    assigned_by = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    status = Column(String, nullable=False, default="assigned")  # assigned / in_progress / completed
    notes = Column(Text, nullable=True)
    assigned_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    completed_at = Column(TIMESTAMP(timezone=True), nullable=True)

    __table_args__ = (
        CheckConstraint("status IN ('assigned', 'in_progress', 'completed')", name="chk_job_status"),
    )

    analysis = relationship("AIAnalysis", back_populates="jobs")
    technician = relationship("User", foreign_keys=[technician_id], back_populates="jobs")