import numpy as np
import pandas as pd


class RenewableSensorSimulator:
    """
    Controlled sensor simulator for solar and wind assets.

    The simulator generates realistic relationships between sensor
    parameters and supports deterministic fault scenarios.
    """

    WIND_SCENARIOS = {
        "healthy",
        "bearing_degradation",
        "gearbox_abnormality",
        "generator_electrical_abnormality",
    }

    SOLAR_SCENARIOS = {
        "healthy",
        "excessive_soiling",
        "inverter_overheating",
        "electrical_performance_degradation",
    }

    def __init__(self, seed=42):
        self.rng = np.random.default_rng(seed)

    def simulate_wind(
        self,
        asset_id="WT-007",
        scenario="healthy",
        n_samples=100,
        start_timestamp="2026-01-01 00:00:00",
    ):
        """Generate simulated wind turbine sensor readings."""

        if scenario not in self.WIND_SCENARIOS:
            raise ValueError(
                f"Unknown wind scenario: {scenario}"
            )

        timestamps = pd.date_range(
            start=start_timestamp,
            periods=n_samples,
            freq="10min",
        )

        # Gradual wind-speed variation
        progression = np.linspace(0, 1, n_samples)

        wind_speed = np.linspace(6, 14, n_samples)
        wind_speed += self.rng.normal(0, 0.25, n_samples)
        wind_speed = np.maximum(wind_speed, 0)

        # Rotor speed follows wind speed
        rotor_speed = 1.35 * wind_speed
        rotor_speed += self.rng.normal(0, 0.35, n_samples)
        rotor_speed = np.maximum(rotor_speed, 0)

        # Healthy vibration
        vibration = 2.0 + 0.08 * rotor_speed
        vibration += self.rng.normal(0, 0.12, n_samples)

        # Healthy temperature
        temperature = 40 + 0.8 * rotor_speed
        temperature += self.rng.normal(0, 0.8, n_samples)

        # Current related to operating conditions
        current = 10 + 2.2 * wind_speed
        current += self.rng.normal(0, 0.5, n_samples)

        # Power relationship with wind speed
        power_output = 50 * (wind_speed ** 2)
        power_output = np.minimum(power_output, 12000)
        power_output += self.rng.normal(0, 100, n_samples)

        # ---------------------------------------------------------
        # Fault progression
        # ---------------------------------------------------------

        if scenario == "bearing_degradation":

            # Gradual mechanical degradation
            vibration += 4.0 * progression
            temperature += 10.0 * progression

            # Progressive performance loss
            power_output *= 1 - 0.20 * progression

            current *= 1 - 0.05 * progression

        elif scenario == "gearbox_abnormality":

            rotor_speed *= 1 + 0.08 * progression

            vibration += 3.0 * progression
            temperature += 8.0 * progression

            power_output *= 1 - 0.15 * progression

        elif scenario == "generator_electrical_abnormality":

            current *= 1 + 0.15 * progression
            temperature += 5.0 * progression

            power_output *= 1 - 0.25 * progression

        # ---------------------------------------------------------
        # Clean impossible values
        # ---------------------------------------------------------

        vibration = np.maximum(vibration, 0)
        temperature = np.maximum(temperature, 0)
        current = np.maximum(current, 0)
        power_output = np.maximum(power_output, 0)

        return pd.DataFrame(
            {
                "asset_id": asset_id,
                "asset_type": "wind",
                "timestamp": timestamps,
                "wind_speed": wind_speed,
                "rotor_speed": rotor_speed,
                "vibration": vibration,
                "temperature": temperature,
                "current": current,
                "power_output": power_output,
                "solar_irradiance": np.nan,
                "voltage": np.nan,
                "soiling_level": np.nan,
                "scenario": scenario,
            }
        )

    def simulate_solar(
        self,
        asset_id="INV-003",
        scenario="healthy",
        n_samples=100,
        start_timestamp="2026-01-01 00:00:00",
    ):
        """Generate simulated solar asset sensor readings."""

        if scenario not in self.SOLAR_SCENARIOS:
            raise ValueError(
                f"Unknown solar scenario: {scenario}"
            )

        timestamps = pd.date_range(
            start=start_timestamp,
            periods=n_samples,
            freq="10min",
        )

        progression = np.linspace(0, 1, n_samples)

        # Irradiance
        solar_irradiance = np.linspace(
            300,
            1000,
            n_samples,
        )

        solar_irradiance += self.rng.normal(
            0,
            20,
            n_samples,
        )

        solar_irradiance = np.maximum(
            solar_irradiance,
            0,
        )

        # Temperature follows irradiance
        temperature = (
            25
            + 0.035 * solar_irradiance
        )

        temperature += self.rng.normal(
            0,
            1.0,
            n_samples,
        )

        # Voltage
        voltage = (
            400
            + self.rng.normal(0, 3, n_samples)
        )

        # Current follows irradiance
        current = (
            5
            + 0.04 * solar_irradiance
        )

        current += self.rng.normal(
            0,
            1.0,
            n_samples,
        )

        current = np.maximum(current, 0)

        # Power relationship
        power_output = (
            solar_irradiance
            * current
            * 0.35
        )

        power_output += self.rng.normal(
            0,
            50,
            n_samples,
        )

        power_output = np.maximum(
            power_output,
            0,
        )

        # Healthy soiling
        soiling_level = np.full(
            n_samples,
            0.10,
        )

        # ---------------------------------------------------------
        # Fault progression
        # ---------------------------------------------------------

        if scenario == "excessive_soiling":

            soiling_level = (
                0.10
                + 0.75 * progression
            )

            power_output *= (
                1 - 0.45 * progression
            )

        elif scenario == "inverter_overheating":

            temperature += (
                25 * progression
            )

            power_output *= (
                1 - 0.25 * progression
            )

            current *= (
                1 - 0.08 * progression
            )

        elif scenario == "electrical_performance_degradation":

            voltage *= (
                1 - 0.10 * progression
            )

            current *= (
                1 - 0.15 * progression
            )

            power_output *= (
                1 - 0.30 * progression
            )

        # ---------------------------------------------------------
        # Clean impossible values
        # ---------------------------------------------------------

        temperature = np.maximum(temperature, 0)
        voltage = np.maximum(voltage, 0)
        current = np.maximum(current, 0)
        power_output = np.maximum(power_output, 0)

        return pd.DataFrame(
            {
                "asset_id": asset_id,
                "asset_type": "solar",
                "timestamp": timestamps,
                "wind_speed": np.nan,
                "rotor_speed": np.nan,
                "vibration": np.nan,
                "temperature": temperature,
                "current": current,
                "power_output": power_output,
                "solar_irradiance": solar_irradiance,
                "voltage": voltage,
                "soiling_level": soiling_level,
                "scenario": scenario,
            }
        )


if __name__ == "__main__":

    simulator = RenewableSensorSimulator(seed=42)

    wind_data = simulator.simulate_wind(
        asset_id="WT-007",
        scenario="bearing_degradation",
        n_samples=20,
    )

    solar_data = simulator.simulate_solar(
        asset_id="INV-003",
        scenario="excessive_soiling",
        n_samples=20,
    )

    print("\n--- WIND SIMULATION ---")
    print(wind_data.head())

    print("\n--- SOLAR SIMULATION ---")
    print(solar_data.head())