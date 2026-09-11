import os
import pandas as pd

from simulator import RenewableSensorSimulator


# ---------------------------------------------------------
# OUTPUT PATH
# ---------------------------------------------------------

OUTPUT_DIR = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "data"
)

OUTPUT_FILE = os.path.join(
    OUTPUT_DIR,
    "renewable_sensor_dataset.csv"
)


# ---------------------------------------------------------
# DATASET GENERATION
# ---------------------------------------------------------

def generate_dataset():

    simulator = RenewableSensorSimulator(seed=42)

    datasets = []

    # =====================================================
    # WIND ASSETS
    # =====================================================

    wind_assets = [
        ("WT-001", "healthy"),
        ("WT-002", "healthy"),
        ("WT-003", "healthy"),
        ("WT-004", "healthy"),
        ("WT-005", "bearing_degradation"),
        ("WT-006", "gearbox_abnormality"),
        ("WT-007", "generator_electrical_abnormality"),
    ]

    for asset_id, scenario in wind_assets:

        data = simulator.simulate_wind(
            asset_id=asset_id,
            scenario=scenario,
            n_samples=4320,
            start_timestamp="2026-01-01 00:00:00",
        )

        datasets.append(data)

    # =====================================================
    # SOLAR ASSETS
    # =====================================================

    solar_assets = [
        ("INV-001", "healthy"),
        ("INV-002", "healthy"),
        ("INV-003", "healthy"),
        ("INV-004", "healthy"),
        ("INV-005", "excessive_soiling"),
        ("INV-006", "inverter_overheating"),
        ("INV-007", "electrical_performance_degradation"),
    ]

    for asset_id, scenario in solar_assets:

        data = simulator.simulate_solar(
            asset_id=asset_id,
            scenario=scenario,
            n_samples=4320,
            start_timestamp="2026-01-01 00:00:00",
        )

        datasets.append(data)

    # =====================================================
    # COMBINE DATA
    # =====================================================

    dataset = pd.concat(
        datasets,
        ignore_index=True
    )

    dataset = dataset.sort_values(
        ["asset_id", "timestamp"]
    ).reset_index(drop=True)

    # =====================================================
    # SAVE DATASET
    # =====================================================

    os.makedirs(
        OUTPUT_DIR,
        exist_ok=True
    )

    dataset.to_csv(
        OUTPUT_FILE,
        index=False
    )

    # =====================================================
    # SUMMARY
    # =====================================================

    print("\n========================================")
    print("DATASET GENERATED SUCCESSFULLY")
    print("========================================")

    print(f"\nOutput file:")
    print(OUTPUT_FILE)

    print(f"\nDataset shape:")
    print(dataset.shape)

    print("\nSamples per scenario:")
    print(dataset["scenario"].value_counts())

    print("\nSamples per asset type:")
    print(dataset["asset_type"].value_counts())

    print("\nAssets:")
    print(dataset["asset_id"].unique())

    print("\nColumns:")
    print(list(dataset.columns))

    print("\nMissing values:")
    print(dataset.isna().sum())

    print("\nFirst 5 rows:")
    print(dataset.head())


# ---------------------------------------------------------
# RUN
# ---------------------------------------------------------

if __name__ == "__main__":
    generate_dataset()