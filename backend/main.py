"""
main.py
FastAPI app entrypoint. Creates tables, registers all routers, and
exposes a WebSocket endpoint that pushes the risk-ranked dashboard
data every couple of seconds for the "live" demo feel.

Run with:
    uvicorn main:app --reload
"""

import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from backend.database import Base, engine, SessionLocal
from backend.routers import users, farms, assets, sensors, analyses, jobs, technicians
from backend.routes.translation import router as translation_router

# Creates all tables if they don't exist yet - safe to run every startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="RenewAI API",
    description="Backend API for renewable asset intelligence",
    version="1.0.0",
)

# Allow the frontend (running on a different port) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten this before any real deployment
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(farms.router)
app.include_router(assets.router)
app.include_router(sensors.router)
app.include_router(analyses.router)
app.include_router(jobs.router)
app.include_router(technicians.router)
app.include_router(translation_router, prefix="/api")


@app.get("/")
def root():
    return {"message": "RenewAI API is running", "status": "ok"}


@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "renewai-backend"}


@app.websocket("/ws/live")
async def live_dashboard(websocket: WebSocket):
    """
    Frontend connects once and receives the risk-ranked dashboard
    (latest analysis per asset) pushed every 2 seconds.
    """
    await websocket.accept()
    try:
        while True:
            db = SessionLocal()
            try:
                dashboard_data = analyses.get_risk_ranked_dashboard(db=db)
                payload = [
                    {
                        "asset_id": a.asset_id,
                        "status": a.status,
                        "risk_score": a.risk_score,
                        "health_score": a.health_score,
                        "probable_issue": a.probable_issue,
                        "contributing_factors": a.contributing_factors,
                        "recommended_action": a.recommended_action,
                        "timestamp": a.timestamp.isoformat() if a.timestamp else None,
                    }
                    for a in dashboard_data
                ]
                await websocket.send_json(payload)
            finally:
                db.close()
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        pass