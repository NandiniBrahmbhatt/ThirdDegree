"""
routers/jobs.py
Farm owner assigns a technician to a flagged AI analysis.
Technician views their assigned jobs and records the outcome.
"""

from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import MaintenanceJob, AIAnalysis, User
from backend import schemas
from backend.auth import require_role, get_current_user

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.post("", response_model=schemas.JobOut)
def assign_job(
    job_in: schemas.JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("farm_owner")),
):
    analysis = db.query(AIAnalysis).filter(AIAnalysis.analysis_id == job_in.analysis_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    technician = db.query(User).filter(
        User.user_id == job_in.technician_id, User.role == "technician"
    ).first()
    if not technician:
        raise HTTPException(status_code=404, detail="Technician not found")

    new_job = MaintenanceJob(
        analysis_id=job_in.analysis_id,
        technician_id=job_in.technician_id,
        assigned_by=current_user.user_id,
        status="assigned",
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job


@router.get("/my-jobs", response_model=List[schemas.JobOut])
def get_my_jobs(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("technician")),
):
    return (
        db.query(MaintenanceJob)
        .filter(MaintenanceJob.technician_id == current_user.user_id)
        .order_by(MaintenanceJob.assigned_at.desc())
        .all()
    )


@router.patch("/{job_id}", response_model=schemas.JobOut)
def update_job(
    job_id: int,
    job_update: schemas.JobUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role("technician")),
):
    job = db.query(MaintenanceJob).filter(MaintenanceJob.job_id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.technician_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not your job")

    if job_update.status:
        job.status = job_update.status
        if job_update.status == "completed":
            job.completed_at = datetime.utcnow()
    if job_update.notes is not None:
        job.notes = job_update.notes

    db.commit()
    db.refresh(job)
    return job