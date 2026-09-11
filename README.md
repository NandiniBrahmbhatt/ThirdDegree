# Predictive Maintenance Backend

## Setup

```bash
pip install -r requirements.txt
cp .env.example .env   # then edit .env with your real PostgreSQL connection string
```

Make sure PostgreSQL is running and the database in your `DATABASE_URL` exists, e.g.:
```bash
createdb predictive_maintenance
```

## Run the API

```bash
uvicorn main:app --reload
```
Visit http://localhost:8000/docs for interactive Swagger UI - use this to test
every endpoint (signup, login, create farm/asset, run analysis, etc.) without
needing the frontend yet.

## Typical flow to test end-to-end

1. `POST /users/signup` - create a farm_owner account
2. `POST /users/login` - get a JWT token, use it as Bearer auth for the rest
3. `POST /farms` - create a farm
4. `POST /assets` - add an asset, note its `asset_id`
5. Edit `simulate.py`'s `ASSET_IDS` dict to match real asset_ids, then run:
   ```bash
   python simulate.py
   ```
6. `POST /analyses/run/{asset_id}` - run anomaly detection once enough readings exist (~10+)
7. `GET /analyses/dashboard` - see the risk-ranked list
8. Connect a WebSocket client to `ws://localhost:8000/ws/live` for the live feed

## Technician flow

1. Sign up a second account with `role: "technician"`
2. Farm owner calls `POST /jobs` with `analysis_id` + `technician_id` to assign work
3. Technician calls `GET /jobs/my-jobs` to see assigned work
4. Technician calls `PATCH /jobs/{job_id}` to update status/notes as they progress

## Notes

- `maintenance_jobs` table was added beyond the original schema to link a
  flagged `ai_analysis` to a technician - without it there's no way to
  represent "who is fixing what."
- Anomaly detection in `routers/analyses.py` is plain statistics (z-scores
  against each asset's own rolling baseline) - no ML training required,
  which keeps this fast to build and easy to explain to judges.