import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Cpu,
  Gauge,
  Leaf,
  Loader2,
  Zap,
} from "lucide-react";

import { apiRequest } from "../services/api";


function normalizeScore(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  // Backend normally returns 0-100.
  // This also safely handles older 0-1 responses.
  if (number >= 0 && number <= 1) {
    return Math.round(number * 100);
  }

  return Math.round(number);
}


function getStatusLabel(status) {
  switch (status) {
    case "at_risk":
      return "At Risk";

    case "watch":
      return "Watch";

    case "healthy":
      return "Healthy";

    default:
      return "Analyzed";
  }
}


function getStatusClasses(status) {
  switch (status) {
    case "at_risk":
      return {
        badge: "bg-[#FBE9E7] text-[#C94B3F]",
        icon: "text-[#C94B3F]",
      };

    case "watch":
      return {
        badge: "bg-[#FFF4D6] text-[#9A6B00]",
        icon: "text-[#9A6B00]",
      };

    case "healthy":
    default:
      return {
        badge: "bg-[#E7F6EF] text-[#14845A]",
        icon: "text-[#14845A]",
      };
  }
}


function formatDateTime(value) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}


function formatCurrency(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "₹0";
  }

  return `₹${number.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}


function AIAnalyzer() {
  const [assets, setAssets] = useState([]);
  const [farms, setFarms] = useState([]);

  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const [loadingAssets, setLoadingAssets] = useState(true);
  const [loadingLatestAnalysis, setLoadingLatestAnalysis] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const [error, setError] = useState("");


  // ---------------------------------------------------------
  // Load farms and assets belonging to the logged-in user.
  // ---------------------------------------------------------
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoadingAssets(true);
      setError("");

      try {
        const [farmsData, assetsData] = await Promise.all([
          apiRequest("/farms/"),
          apiRequest("/assets"),
        ]);

        if (!mounted) {
          return;
        }

        const loadedFarms = Array.isArray(farmsData)
          ? farmsData
          : [];

        const loadedAssets = Array.isArray(assetsData)
          ? assetsData
          : [];

        setFarms(loadedFarms);
        setAssets(loadedAssets);

        if (loadedAssets.length > 0) {
          setSelectedAssetId(
            String(loadedAssets[0].asset_id)
          );
        } else {
          setSelectedAssetId("");
          setAnalysis(null);
        }
      } catch (err) {
        console.error(
          "Unable to load AI Analyzer data:",
          err
        );

        if (mounted) {
          setError(
            "Unable to load your assets. Please refresh and try again."
          );
        }
      } finally {
        if (mounted) {
          setLoadingAssets(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);


  // ---------------------------------------------------------
  // Find selected asset and its farm.
  // ---------------------------------------------------------
  const selectedAsset = useMemo(() => {
    return assets.find(
      (asset) =>
        String(asset.asset_id) ===
        String(selectedAssetId)
    );
  }, [assets, selectedAssetId]);


  const selectedFarm = useMemo(() => {
    if (!selectedAsset) {
      return null;
    }

    return farms.find(
      (farm) =>
        Number(farm.farm_id) ===
        Number(selectedAsset.farm_id)
    );
  }, [farms, selectedAsset]);


  // ---------------------------------------------------------
  // IMPORTANT:
  // Whenever the selected asset changes, fetch the latest
  // persisted AI analysis from the backend.
  //
  // This keeps AI Analyzer synchronized with Alerts.
  // ---------------------------------------------------------
  useEffect(() => {
    if (!selectedAssetId) {
      setAnalysis(null);
      return;
    }

    let cancelled = false;

    async function loadLatestAnalysis() {
      setLoadingLatestAnalysis(true);

      try {
        const result = await apiRequest(
          `/analyses/asset/${selectedAssetId}/latest`
        );

        if (!cancelled) {
          setAnalysis(result || null);
        }
      } catch (err) {
        console.error(
          "Unable to load latest AI analysis:",
          err
        );

        if (!cancelled) {
          setAnalysis(null);
        }
      } finally {
        if (!cancelled) {
          setLoadingLatestAnalysis(false);
        }
      }
    }

    loadLatestAnalysis();

    return () => {
      cancelled = true;
    };
  }, [selectedAssetId]);


  // ---------------------------------------------------------
  // Run a fresh AI analysis.
  // ---------------------------------------------------------
  async function handleAnalyze() {
    if (!selectedAsset) {
      setError("Please select an asset first.");
      return;
    }

    setAnalyzing(true);
    setError("");

    try {
      const result = await apiRequest(
        `/analyses/run/${selectedAsset.asset_id}`,
        {
          method: "POST",
        }
      );

      // Immediately display the freshly generated result.
      setAnalysis(result);
    } catch (err) {
      console.error("AI analysis failed:", err);

      setError(
        "AI analysis could not be completed. Make sure the sensor simulator is running and this asset has sensor readings."
      );
    } finally {
      setAnalyzing(false);
    }
  }


  const healthScore = normalizeScore(
    analysis?.health_score
  );

  const riskScore = normalizeScore(
    analysis?.risk_score
  );

  const statusClasses = getStatusClasses(
    analysis?.status
  );


  return (
    <div className="min-h-screen px-8 pb-12 pt-28 xl:px-12">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#07142E] via-[#0B2740] to-[#004C43] px-8 py-10 text-white shadow-[0_20px_60px_rgba(0,30,97,0.14)] sm:px-10 lg:px-12">

        <div className="relative z-10 max-w-3xl">

          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#65F0BF]">
            <BrainCircuit
              size={17}
              strokeWidth={1.8}
            />

            Predictive Intelligence
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            AI Analyzer
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">
            Analyze your renewable energy assets and identify potential
            maintenance risks before they become costly failures.
          </p>

        </div>


        <div className="absolute right-8 top-8 hidden rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:block">

          <BrainCircuit
            size={42}
            strokeWidth={1.4}
            className="text-[#65F0BF]"
          />

          <p className="mt-5 text-sm font-semibold">
            AI-powered
          </p>

          <p className="mt-1 text-xs text-white/55">
            Predictive maintenance
          </p>

        </div>


        <div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-[#00A878]/15 blur-3xl" />

      </section>


      {/* =====================================================
          ASSET SELECTION
      ===================================================== */}
      <section className="mt-8 rounded-[28px] border border-[#E4E9E1] bg-white p-7 shadow-[0_12px_40px_rgba(32,39,34,0.04)] sm:p-9">

        <div className="flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E7F6EF] text-[#00A878]">
            <Activity
              size={23}
              strokeWidth={1.8}
            />
          </div>

          <div>

            <h2 className="text-xl font-semibold tracking-[-0.025em] text-[#202722]">
              Select an Asset
            </h2>

            <p className="mt-1 text-sm leading-6 text-[#89968E]">
              Choose the asset you want RenewAI to analyze.
            </p>

          </div>

        </div>


        {loadingAssets ? (

          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-[#F7F9F6] p-5 text-sm text-[#738078]">

            <Loader2
              size={18}
              className="animate-spin text-[#001e61]"
            />

            Loading your assets...

          </div>

        ) : assets.length === 0 ? (

          <div className="mt-8 rounded-2xl border border-dashed border-[#D9DFD8] bg-[#FAFBF9] p-8 text-center">

            <Cpu
              size={28}
              className="mx-auto text-[#89968E]"
              strokeWidth={1.5}
            />

            <p className="mt-4 text-sm font-semibold text-[#202722]">
              No assets available
            </p>

            <p className="mt-2 text-xs leading-5 text-[#89968E]">
              Create a farm and add a solar or wind asset before running an
              AI analysis.
            </p>

          </div>

        ) : (

          <>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">

              <div>

                <label
                  htmlFor="asset-select"
                  className="text-xs font-semibold text-[#40544C]"
                >
                  Asset
                </label>

                <select
                  id="asset-select"
                  value={selectedAssetId}
                  onChange={(event) => {
                    setSelectedAssetId(
                      event.target.value
                    );

                    setError("");
                  }}
                  className="mt-2 w-full appearance-none rounded-2xl border border-[#E0E6DE] bg-[#F8FAF7] px-5 py-4 text-sm font-medium text-[#202722] outline-none transition focus:border-[#001e61] focus:ring-4 focus:ring-[#001e61]/5"
                >

                  {assets.map((asset) => (

                    <option
                      key={asset.asset_id}
                      value={asset.asset_id}
                    >
                      {asset.asset_label} —{" "}
                      {asset.asset_type === "wind"
                        ? "Wind Turbine"
                        : "Solar Asset"}
                    </option>

                  ))}

                </select>

                <p className="mt-3 text-xs text-[#89968E]">

                  {selectedFarm?.farm_name ||
                    "Renewable Energy Farm"}

                  {selectedFarm?.location
                    ? ` — ${selectedFarm.location}`
                    : selectedAsset?.location
                      ? ` — ${selectedAsset.location}`
                      : ""}

                </p>

              </div>


              <button
                type="button"
                onClick={handleAnalyze}
                disabled={
                  analyzing ||
                  !selectedAsset
                }
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-[#00A878] px-7 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,168,120,0.2)] transition hover:bg-[#00956A] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {analyzing ? (

                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Analyzing...
                  </>

                ) : (

                  <>
                    <BrainCircuit
                      size={18}
                      strokeWidth={1.8}
                    />

                    Analyze with AI
                  </>

                )}

              </button>

            </div>


            {error && (

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#F4C7C2] bg-[#FEF6F5] p-4 text-sm text-[#C94B3F]">

                <AlertTriangle
                  size={18}
                  className="mt-0.5 shrink-0"
                  strokeWidth={1.8}
                />

                <p>{error}</p>

              </div>

            )}

            {loadingLatestAnalysis && (

              <div className="mt-5 flex items-center gap-2 text-xs text-[#89968E]">

                <Loader2
                  size={15}
                  className="animate-spin"
                />

                Loading latest saved analysis...

              </div>

            )}

          </>

        )}

      </section>


      {/* =====================================================
          ANALYSIS RESULT
      ===================================================== */}
      {analysis && (

        <section className="mt-8 space-y-6">

          {/* =================================================
              RESULT HEADER
          ================================================= */}
          <div className="rounded-[28px] border border-[#E4E9E1] bg-white p-7 shadow-[0_12px_40px_rgba(32,39,34,0.04)] sm:p-9">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">

                  <BrainCircuit size={15} />

                  Latest AI Analysis

                </div>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#202722]">

                  {selectedAsset?.asset_label ||
                    `Asset ${analysis.asset_id}`}

                </h2>

                <p className="mt-2 text-xs text-[#89968E]">
                  Analysis generated from the latest available sensor
                  reading.
                </p>

              </div>


              <div
                className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${statusClasses.badge}`}
              >

                {analysis.status === "healthy" ? (

                  <CheckCircle2 size={15} />

                ) : (

                  <AlertTriangle size={15} />

                )}

                {getStatusLabel(
                  analysis.status
                )}

              </div>

            </div>

          </div>


          {/* =================================================
              SCORES
          ================================================= */}
          <div className="grid gap-5 md:grid-cols-2">

            {/* Health */}
            <div className="rounded-[28px] border border-[#E4E9E1] bg-white p-7 shadow-[0_12px_40px_rgba(32,39,34,0.04)]">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F6EF] text-[#14845A]">

                    <Gauge
                      size={19}
                      strokeWidth={1.8}
                    />

                  </div>

                  <div>

                    <p className="text-sm font-semibold text-[#202722]">
                      Health Score
                    </p>

                    <p className="text-xs text-[#89968E]">
                      Overall asset condition
                    </p>

                  </div>

                </div>


                <span className="text-3xl font-semibold tracking-[-0.04em] text-[#14845A]">
                  {healthScore}
                </span>

              </div>


              <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#E8EEE8]">

                <div
                  className="h-full rounded-full bg-[#00A878] transition-all duration-700"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        healthScore
                      )
                    )}%`,
                  }}
                />

              </div>


              <p className="mt-3 text-right text-[11px] text-[#89968E]">
                out of 100
              </p>

            </div>


            {/* Risk */}
            <div className="rounded-[28px] border border-[#E4E9E1] bg-white p-7 shadow-[0_12px_40px_rgba(32,39,34,0.04)]">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBE9E7] text-[#C94B3F]">

                    <AlertTriangle
                      size={19}
                      strokeWidth={1.8}
                    />

                  </div>

                  <div>

                    <p className="text-sm font-semibold text-[#202722]">
                      Risk Score
                    </p>

                    <p className="text-xs text-[#89968E]">
                      Predictive maintenance risk
                    </p>

                  </div>

                </div>


                <span className="text-3xl font-semibold tracking-[-0.04em] text-[#C94B3F]">
                  {riskScore}
                </span>

              </div>


              <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#E8EEE8]">

                <div
                  className="h-full rounded-full bg-[#C94B3F] transition-all duration-700"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        riskScore
                      )
                    )}%`,
                  }}
                />

              </div>


              <p className="mt-3 text-right text-[11px] text-[#89968E]">
                out of 100
              </p>

            </div>

          </div>


          {/* =================================================
              DIAGNOSIS + RECOMMENDATION
          ================================================= */}
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">

            {/* Diagnosis */}
            <div className="rounded-[28px] border border-[#E4E9E1] bg-white p-7 shadow-[0_12px_40px_rgba(32,39,34,0.04)] sm:p-8">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4D6] text-[#9A6B00]">

                  <AlertTriangle
                    size={18}
                    strokeWidth={1.8}
                  />

                </div>

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9A6B00]">
                    Diagnosis
                  </p>

                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.025em] text-[#202722]">
                    Probable Issue
                  </h3>

                </div>

              </div>


              <div className="mt-7 rounded-2xl bg-[#FFF9EA] p-5">

                <p className="text-sm font-semibold text-[#202722]">

                  {analysis.probable_issue ||
                    "No specific issue detected"}

                </p>


                {analysis.anomaly_detected && (

                  <p className="mt-2 text-xs leading-5 text-[#9A6B00]">
                    The ML model detected an anomalous sensor pattern.
                  </p>

                )}

              </div>


              <div className="mt-6">

                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#89968E]">
                  Contributing Factors
                </p>


                <div className="mt-3 space-y-2">

                  {analysis.contributing_factors ? (

                    String(
                      analysis.contributing_factors
                    )
                      .split(";")
                      .map(
                        (
                          factor,
                          index
                        ) => (

                          <div
                            key={`${factor}-${index}`}
                            className="flex items-start gap-3 rounded-xl bg-[#F7F9F6] px-4 py-3"
                          >

                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00A878]" />

                            <p className="text-xs leading-5 text-[#40544C]">
                              {factor.trim()}
                            </p>

                          </div>

                        )
                      )

                  ) : (

                    <p className="text-xs text-[#89968E]">
                      No contributing factors were recorded.
                    </p>

                  )}

                </div>

              </div>

            </div>


            {/* Recommendation */}
            <div className="rounded-[28px] border border-[#E4E9E1] bg-[#F0F3F9] p-7 sm:p-8">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#001e61]">

                  <Zap
                    size={18}
                    strokeWidth={1.8}
                  />

                </div>

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#001e61]">
                    Recommended Action
                  </p>

                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.025em] text-[#202722]">
                    What to do next
                  </h3>

                </div>

              </div>


              <div className="mt-7 rounded-2xl bg-white p-5">

                <p className="text-sm leading-6 text-[#40544C]">

                  {analysis.recommended_action ||
                    "Continue monitoring the asset."}

                </p>

              </div>


              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                <div className="rounded-2xl border border-[#E0E6DE] bg-white p-4">

                  <Clock3
                    size={17}
                    className="text-[#001e61]"
                    strokeWidth={1.8}
                  />

                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
                    Analysis Time
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#202722]">
                    {formatDateTime(
                      analysis.timestamp
                    )}
                  </p>

                </div>


                <div className="rounded-2xl border border-[#E0E6DE] bg-white p-4">

                  {analysis.anomaly_detected ? (

                    <AlertTriangle
                      size={17}
                      className="text-[#C94B3F]"
                      strokeWidth={1.8}
                    />

                  ) : (

                    <CheckCircle2
                      size={17}
                      className="text-[#14845A]"
                      strokeWidth={1.8}
                    />

                  )}

                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
                    Model Finding
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#202722]">

                    {analysis.anomaly_detected
                      ? "Anomaly detected"
                      : "No anomaly detected"}

                  </p>

                </div>

              </div>

            </div>

          </div>



          {/* =================================================
              ENERGY + REVENUE IMPACT
          ================================================= */}
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            {/* Energy Impact */}
            <div className="rounded-[28px] border border-[#E4E9E1] bg-white p-7 shadow-[0_12px_40px_rgba(32,39,34,0.04)] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F6EF] text-[#00A878]">
                  <Zap size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#14845A]">
                    Energy Impact
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.025em] text-[#202722]">
                    Estimated Energy Loss
                  </h3>
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-[#F7F9F6] p-5">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-[#14845A]">
                  {Number.isFinite(Number(analysis.energy_loss_estimate))
                    ? Number(analysis.energy_loss_estimate).toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })
                    : "0"}{" "}
                  <span className="text-base font-medium text-[#738078]">
                    kWh/day
                  </span>
                </p>

                <p className="mt-2 text-xs leading-5 text-[#89968E]">
                  Estimated generation lost under the current operating conditions.
                </p>
              </div>
            </div>

            {/* Revenue Impact */}
            <div className="rounded-[28px] border border-[#E4E9E1] bg-white p-7 shadow-[0_12px_40px_rgba(32,39,34,0.04)] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4D6] text-[#9A6B00]">
                  <Activity size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9A6B00]">
                    Revenue Impact
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.025em] text-[#202722]">
                    Estimated Revenue Loss
                  </h3>
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-[#FFF9EA] p-5">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-[#9A6B00]">
                  {formatCurrency(analysis.revenue_loss_estimate)}
                  <span className="ml-1 text-base font-medium text-[#738078]">
                    /day
                  </span>
                </p>

                <p className="mt-2 text-xs leading-5 text-[#89968E]">
                  Estimated revenue at risk if the current performance gap continues.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              COST OF WAITING
          ================================================= */}
          <div className="rounded-[28px] border border-[#E4E9E1] bg-white p-7 shadow-[0_12px_40px_rgba(32,39,34,0.04)] sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F3F9] text-[#001e61]">
                  <Clock3 size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#001e61]">
                    Cost of Waiting
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.025em] text-[#202722]">
                    Revenue at Risk if Maintenance Is Delayed
                  </h3>
                </div>
              </div>

              <p className="max-w-md text-xs leading-5 text-[#89968E] sm:text-right">
                Based on the estimated daily revenue impact of the current performance gap.
              </p>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {[1, 3, 7].map((days) => {
                const dailyRevenueLoss = Number(analysis.revenue_loss_estimate);
                const revenueAtRisk = Number.isFinite(dailyRevenueLoss)
                  ? dailyRevenueLoss * days
                  : 0;

                return (
                  <div
                    key={days}
                    className="rounded-2xl border border-[#E0E6DE] bg-[#F7F9F6] p-5"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
                      After {days} {days === 1 ? "Day" : "Days"}
                    </p>

                    <p className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-[#C94B3F]">
                      {formatCurrency(revenueAtRisk)}
                    </p>

                    <p className="mt-1 text-xs text-[#89968E]">
                      estimated revenue at risk
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =================================================
              ASSET CONTEXT
          ================================================= */}
          <div className="rounded-[28px] border border-[#E4E9E1] bg-white p-7 shadow-[0_12px_40px_rgba(32,39,34,0.04)] sm:p-8">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F3F9] text-[#001e61]">

                {selectedAsset?.asset_type ===
                "solar" ? (

                  <Leaf
                    size={19}
                    strokeWidth={1.8}
                  />

                ) : (

                  <Activity
                    size={19}
                    strokeWidth={1.8}
                  />

                )}

              </div>


              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#001e61]">
                  Asset Context
                </p>

                <h3 className="mt-1 text-lg font-semibold text-[#202722]">
                  {selectedAsset?.asset_label ||
                    "Selected Asset"}
                </h3>

              </div>

            </div>


            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl bg-[#F7F9F6] p-4">

                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#89968E]">
                  Type
                </p>

                <p className="mt-2 text-sm font-semibold capitalize text-[#202722]">
                  {selectedAsset?.asset_type || "—"}
                </p>

              </div>


              <div className="rounded-2xl bg-[#F7F9F6] p-4">

                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#89968E]">
                  Capacity
                </p>

                <p className="mt-2 text-sm font-semibold text-[#202722]">
                  {selectedAsset?.capacity ?? "—"}
                </p>

              </div>


              <div className="rounded-2xl bg-[#F7F9F6] p-4">

                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#89968E]">
                  Farm
                </p>

                <p className="mt-2 text-sm font-semibold text-[#202722]">
                  {selectedFarm?.farm_name || "—"}
                </p>

              </div>


              <div className="rounded-2xl bg-[#F7F9F6] p-4">

                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#89968E]">
                  Location
                </p>

                <p className="mt-2 text-sm font-semibold text-[#202722]">
                  {selectedAsset?.location ||
                    selectedFarm?.location ||
                    "—"}
                </p>

              </div>

            </div>

          </div>

        </section>

      )}

    </div>
  );
}


export default AIAnalyzer;