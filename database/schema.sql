-- USERS
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username_email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL CHECK (role IN ('farm_owner', 'technician')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- FARMS
CREATE TABLE farms (
    farm_id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    farm_name TEXT NOT NULL,
    location TEXT,
    capacity REAL,
    energy_type TEXT CHECK (energy_type IN ('solar', 'wind', 'mixed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ASSETS
CREATE TABLE assets (
    asset_id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms(farm_id) ON DELETE CASCADE,
    asset_label TEXT NOT NULL,
    asset_type TEXT NOT NULL CHECK (asset_type IN ('solar', 'wind')),
    installation_date DATE,
    capacity REAL,
    location TEXT
);

-- SENSOR READINGS
CREATE TABLE sensor_readings (
    reading_id BIGSERIAL PRIMARY KEY,
    asset_id INTEGER NOT NULL REFERENCES assets(asset_id) ON DELETE CASCADE,
    "timestamp" TIMESTAMPTZ NOT NULL DEFAULT now(),
    wind_speed REAL,
    rotor_speed REAL,
    vibration REAL,
    temperature REAL,
    current REAL,
    power_output REAL,
    solar_irradiance REAL,
    voltage REAL,
    soiling_level REAL
);

-- AI ANALYSES
CREATE TABLE ai_analyses (
    analysis_id SERIAL PRIMARY KEY,
    asset_id INTEGER NOT NULL REFERENCES assets(asset_id) ON DELETE CASCADE,
    "timestamp" TIMESTAMPTZ NOT NULL DEFAULT now(),
    anomaly_detected BOOLEAN NOT NULL DEFAULT false,
    health_score REAL,
    risk_score REAL,
    status TEXT CHECK (status IN ('healthy', 'watch', 'at_risk')),
    probable_issue TEXT,
    contributing_factors TEXT,
    recommended_action TEXT
);

-- TECHNICIAN PROFILE
CREATE TABLE technician_profile (
    technician_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    city TEXT,
    address TEXT,
    experience TEXT,
    specialization TEXT,
    charges NUMERIC(10, 2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_readings_asset_time
    ON sensor_readings(asset_id, "timestamp" DESC);

CREATE INDEX idx_analyses_asset_time
    ON ai_analyses(asset_id, "timestamp" DESC);

CREATE INDEX idx_farms_owner
    ON farms(owner_id);

CREATE INDEX idx_assets_farm
    ON assets(farm_id);
