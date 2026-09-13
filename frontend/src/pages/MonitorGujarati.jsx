import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BatteryCharging,
  ChevronDown,
  CircleCheck,
  Clock3,
  Gauge,
  Loader2,
  Radio,
  Thermometer,
  TrendingUp,
  Wind,
  Zap,
} from "lucide-react";

import { apiRequest } from "../services/api";

function formatTime(value) {
  if (!value) {
    return "ઉપલબ્ધ નથી";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatNumber(value, decimals = 2) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return number.toFixed(decimals);
}

function MetricCard({
  icon,
  label,
  value,
  unit,
  detail,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className={`rounded-xl p-3 ${iconClass}`}>
          {icon}
        </div>

        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </span>

        {unit && (
          <span className="text-sm font-medium text-slate-400">
            {unit}
          </span>
        )}
      </div>

      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function LineChart({
  data,
  dataKey,
  label,
  unit,
  description,
}) {
  if (!data || data.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
          Sensor Trend
        </p>

        <h3 className="mt-1 text-lg font-bold text-slate-900">
          {label}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>

        <div className="mt-8 flex h-48 items-center justify-center rounded-xl bg-slate-50">
          <p className="text-sm text-slate-400">
            Waiting for sensor data...
          </p>
        </div>
      </section>
    );
  }

  const values = data
    .map((item) => Number(item[dataKey]))
    .filter(Number.isFinite);

  if (values.length === 0) {
    return null;
  }

  const max = Math.max(...values);
  const min = Math.min(...values);

  const width = 900;
  const height = 280;
  const paddingX = 42;
  const paddingY = 28;
  const range = max - min || 1;

  const points = data
    .map((item, index) => {
      const value = Number(item[dataKey]);

      if (!Number.isFinite(value)) {
        return null;
      }

      const denominator = Math.max(data.length - 1, 1);

      const x =
        paddingX +
        (index / denominator) *
          (width - paddingX * 2);

      const y =
        height -
        paddingY -
        ((value - min) / range) *
          (height - paddingY * 2);

      return {
        x,
        y,
        value,
        time: item.time,
      };
    })
    .filter(Boolean);

  if (points.length === 0) {
    return null;
  }

  const pointString = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  const areaPoints = [
    `${points[0].x},${height - paddingY}`,
    ...points.map((point) => `${point.x},${point.y}`),
    `${points[points.length - 1].x},${height - paddingY}`,
  ].join(" ");

  const latest = points[points.length - 1];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            Sensor Trend
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-900">
            {label}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900">
            {formatNumber(latest.value)}
            <span className="ml-1 text-sm font-medium text-slate-400">
              {unit}
            </span>
          </p>

          <p className="text-[10px] text-slate-400">
            Latest reading
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[260px] min-w-[700px] w-full"
          preserveAspectRatio="none"
        >
          {[0, 1, 2, 3].map((row) => {
            const y =
              paddingY +
              (row / 3) *
                (height - paddingY * 2);

            return (
              <line
                key={row}
                x1={paddingX}
                x2={width - paddingX}
                y1={y}
                y2={y}
                stroke="#E8EDE8"
                strokeWidth="1"
                strokeDasharray="4 5"
              />
            );
          })}

          <polygon
            points={areaPoints}
            fill="rgba(16, 185, 129, 0.08)"
          />

          <polyline
            points={pointString}
            fill="none"
            stroke="#059669"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point, index) => (
            <circle
              key={`${point.time}-${dataKey}-${index}`}
              cx={point.x}
              cy={point.y}
              r="5"
              fill="white"
              stroke="#059669"
              strokeWidth="3"
            />
          ))}

          {points.map((point, index) => {
            if (
              index !== 0 &&
              index !== points.length - 1 &&
              index % 2 !== 0
            ) {
              return null;
            }

            return (
              <text
                key={`${point.time}-label-${dataKey}-${index}`}
                x={point.x}
                y={height - 5}
                textAnchor="middle"
                fontSize="11"
                fill="#94A3B8"
              >
                {point.time}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-[11px] text-slate-400">
          Min: {formatNumber(min)} {unit}
        </span>

        <span className="text-[11px] text-slate-400">
          Max: {formatNumber(max)} {unit}
        </span>
      </div>
    </section>
  );
}

function getTimeLabel(timestamp) {
  if (!timestamp) {
    return "—";
  }

  return formatTime(timestamp);
}

export default function Monitor() {
  const [assets, setAssets] = useState([]);
  const [farms, setFarms] = useState([]);

  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [readings, setReadings] = useState([]);

  const [loadingAssets, setLoadingAssets] = useState(true);
  const [loadingReadings, setLoadingReadings] = useState(false);

  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadAssets() {
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
        }
      } catch (err) {
        console.error(
          "મોનિટર એસેટ્સ લોડ કરવામાં નિષ્ફળ:",
          err
        );

        if (mounted) {
          setError(
            "તમારી એસેટ્સ લોડ થઈ શકી નથી. કૃપા કરીને રિફ્રેશ કરીને ફરી પ્રયાસ કરો."
          );
        }
      } finally {
        if (mounted) {
          setLoadingAssets(false);
        }
      }
    }

    loadAssets();

    return () => {
      mounted = false;
    };
  }, []);

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

  const isSolar =
    selectedAsset?.asset_type?.toLowerCase() === "solar";

  async function loadReadings(assetId, showLoader = false) {
    if (!assetId) {
      return;
    }

    if (showLoader) {
      setLoadingReadings(true);
    }

    try {
      const data = await apiRequest(
        `/sensors/asset/${assetId}/latest?limit=50`
      );

      const loadedReadings = Array.isArray(data)
        ? data
        : [];

      // Backend returns newest first.
      // Charts look better oldest → newest.
      const chronological = [...loadedReadings].reverse();

      setReadings(chronological);

      if (chronological.length > 0) {
        setLastUpdated(
          chronological[chronological.length - 1].timestamp
        );
      }
    } catch (err) {
      console.error(
        "સેન્સર રીડિંગ્સ લોડ કરવામાં નિષ્ફળ:",
        err
      );

      setError(
        "આ એસેટ માટે સેન્સર રીડિંગ્સ લોડ થઈ શક્યા નથી."
      );
    } finally {
      if (showLoader) {
        setLoadingReadings(false);
      }
    }
  }

  useEffect(() => {
    if (!selectedAssetId) {
      return;
    }

    setReadings([]);
    setLastUpdated(null);
    setError("");

    loadReadings(selectedAssetId, true);

    const timer = setInterval(() => {
      loadReadings(selectedAssetId, false);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [selectedAssetId]);

  const chartData = useMemo(() => {
    return readings.map((reading) => ({
      time: getTimeLabel(reading.timestamp),
      power: reading.power_output,
      temperature: reading.temperature,
      vibration: reading.vibration,
    }));
  }, [readings]);

  const latest = readings[readings.length - 1];

  const hasReadings = Boolean(latest);

  return (
    <div className="min-h-full bg-[#FAFBF7] px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-[#001e61] p-6 text-white shadow-xl sm:p-8">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-emerald-300">
                <Activity size={18} />

                <span className="text-xs font-bold uppercase tracking-[0.15em]">
                  લાઈવ એસેટ મોનિટરિંગ
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                મોનિટર
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                તમારી નવીનીકરણીય ઉર્જા સંપત્તિઓમાં લાઈવ સેન્સર રીડિંગ્સ અને પ્રદર્શન વલણોને ટ્રૅક કરો.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400/10">
                <Radio
                  size={21}
                  className="text-emerald-300"
                />
              </div>

              <div>
                <p className="text-sm font-bold">
                  {hasReadings
                    ? "સિસ્ટમ ઑનલાઇન"
                    : "ડેટાની રાહ જોઈ રહ્યા છીએ"}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  {hasReadings
                    ? "સેન્સર ડેટા પ્રાપ્ત થઈ રહ્યો છે"
                    : "સિમ્યુલેટરની રાહ જોઈ રહ્યા છીએ"}
                </p>
              </div>

              <span
                className={`ml-2 h-2.5 w-2.5 rounded-full ${
                  hasReadings
                    ? "bg-emerald-400 shadow-lg shadow-emerald-400/40"
                    : "bg-amber-400"
                }`}
              />
            </div>
          </div>
        </section>

        {/* Asset Selector */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Gauge
                  size={17}
                  className="text-[#001e61]"
                />

                <label
                  htmlFor="monitor-asset"
                  className="text-sm font-bold text-slate-800"
                >
                  સંપત્તિનું નિરીક્ષણ
                </label>
              </div>

              {loadingAssets ? (
  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-400">
    <Loader2
      size={16}
      className="animate-spin"
    />
    એસેટ લોડ થઈ રહ્યા છે...
  </div>
) : assets.length === 0 ? (
  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3.5 text-sm text-slate-400">
    કોઈ એસેટ મળ્યા નથી.
  </div>
) : (
  <div className="relative">
    <select
      id="monitor-asset"
      value={selectedAssetId}
      onChange={(event) => {
        setSelectedAssetId(
          event.target.value
        );
      }}
      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-11 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
    >
      {assets.map((asset) => (
        <option
          key={asset.asset_id}
          value={asset.asset_id}
        >
          {asset.asset_label} —{" "}
          {asset.asset_type === "wind"
            ? "વિન્ડ ટર્બાઇન"
            : "સોલાર એસેટ"}
        </option>
      ))}
    </select>

    <ChevronDown
      size={18}
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
    />
  </div>
)}

<p className="mt-2 text-xs text-slate-400">
  {selectedFarm?.farm_name ||
    selectedAsset?.location ||
    "મોનિટર કરવા માટે એસેટ પસંદ કરો"}
</p>
</div>

<div className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3">
  <CircleCheck
    size={19}
    className="text-emerald-600"
  />

  <div>
    <p className="text-xs font-bold text-emerald-800">
      {hasReadings
        ? "એસેટ ઑનલાઇન છે"
        : "રીડિંગ્સની રાહ જોઈ રહ્યા છીએ"}
    </p>

    <p className="mt-0.5 text-[10px] text-emerald-600">
      દર 5 સેકન્ડે આપમેળે રિફ્રેશ થાય છે
    </p>
  </div>
</div>
</div>
</section>

{/* Error */}
{error && (
  <section className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
    {error}
  </section>
)}

{/* No readings */}
{!loadingAssets &&
  selectedAsset &&
  loadingReadings &&
  readings.length === 0 && (
    <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <Loader2
        size={28}
        className="mx-auto animate-spin text-[#001e61]"
      />

      <p className="mt-4 text-sm font-bold text-slate-800">
        સેન્સર ડેટા લોડ થઈ રહ્યો છે...
      </p>

      <p className="mt-2 text-xs text-slate-400">
        ખાતરી કરો કે સેન્સર સિમ્યુલેટર ચાલુ છે.
      </p>
    </section>
  )}

{!loadingAssets &&
  selectedAsset &&
  !loadingReadings &&
  readings.length === 0 && (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
      <Activity
        size={30}
        className="mx-auto text-slate-400"
      />

      <p className="mt-4 text-sm font-bold text-slate-800">
        હજી સુધી કોઈ સેન્સર રીડિંગ્સ નથી
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        RenewAI સેન્સર સિમ્યુલેટર શરૂ કરો અને રીડિંગ આવવાની રાહ જુઓ.
      </p>
    </section>
  )}

{hasReadings && (
  <>
    {/* Current Status */}
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            વર્તમાન રીડિંગ્સ
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {selectedAsset?.asset_label} લાઇવ સ્થિતિ
          </h2>
        </div>

        <div className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex">
          <Clock3 size={13} />

          અપડેટ થયું{" "}
          {formatTime(lastUpdated)}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {isSolar ? (
          <>
            <MetricCard
              icon={<TrendingUp size={21} />}
              iconClass="bg-amber-50 text-amber-600"
              label="સોલાર ઇરેડિયન્સ"
              value={formatNumber(
                latest.solar_irradiance
              )}
              unit="W/m²"
              detail="ઉપલબ્ધ સૂર્યપ્રકાશ"
            />

            <MetricCard
              icon={<Thermometer size={21} />}
              iconClass="bg-orange-50 text-orange-600"
              label="તાપમાન"
              value={formatNumber(
                latest.temperature
              )}
              unit="°C"
              detail="પેનલનું કાર્યકારી તાપમાન"
            />

            <MetricCard
              icon={<Zap size={21} />}
              iconClass="bg-blue-50 text-blue-600"
              label="વોલ્ટેજ"
              value={formatNumber(latest.voltage)}
              unit="V"
              detail="વર્તમાન સિસ્ટમ વોલ્ટેજ"
            />

            <MetricCard
              icon={<Activity size={21} />}
              iconClass="bg-violet-50 text-violet-600"
              label="કરંટ"
              value={formatNumber(latest.current)}
              unit="A"
              detail="વિદ્યુત કરંટ"
            />

            <MetricCard
              icon={<BatteryCharging size={21} />}
              iconClass="bg-emerald-50 text-emerald-600"
              label="પાવર આઉટપુટ"
              value={formatNumber(
                latest.power_output,
                0
              )}
              unit="W"
              detail="વર્તમાન ઉત્પન્ન પાવર"
            />

            <MetricCard
              icon={<Activity size={21} />}
              iconClass="bg-slate-100 text-slate-600"
              label="સોઇલિંગ સ્તર"
              value={formatNumber(
                Number(latest.soiling_level) * 100,
                1
              )}
              unit="%"
              detail="સપાટીની સ્વચ્છતાનું સૂચક"
            />
          </>
        ) : (
          <>
            <MetricCard
              icon={<Wind size={21} />}
              iconClass="bg-cyan-50 text-cyan-600"
              label="પવનની ઝડપ"
              value={formatNumber(
                latest.wind_speed
              )}
              unit="m/s"
              detail="વર્તમાન પવનની સ્થિતિ"
            />

            <MetricCard
              icon={<Gauge size={21} />}
              iconClass="bg-blue-50 text-blue-600"
              label="રોટર ઝડપ"
              value={formatNumber(
                latest.rotor_speed
              )}
              unit="RPM"
              detail="ટર્બાઇન રોટર ઝડપ"
            />

            <MetricCard
              icon={<Activity size={21} />}
              iconClass="bg-violet-50 text-violet-600"
              label="કંપન"
              value={formatNumber(
                latest.vibration
              )}
              unit="mm/s"
              detail="યાંત્રિક કંપનનું સ્તર"
            />

            <MetricCard
              icon={<Thermometer size={21} />}
              iconClass="bg-orange-50 text-orange-600"
              label="તાપમાન"
              value={formatNumber(
                latest.temperature
              )}
              unit="°C"
              detail="કાર્યકારી તાપમાન"
            />

            <MetricCard
              icon={<Zap size={21} />}
              iconClass="bg-amber-50 text-amber-600"
              label="કરંટ"
              value={formatNumber(
                latest.current
              )}
              unit="A"
              detail="જનરેટર કરંટ"
            />

            <MetricCard
              icon={<BatteryCharging size={21} />}
              iconClass="bg-emerald-50 text-emerald-600"
              label="પાવર આઉટપુટ"
              value={formatNumber(
                latest.power_output,
                0
              )}
              unit="W"
              detail="વર્તમાન ઉત્પન્ન પાવર"
            />
          </>
        )}
      </div>
    </section>

    {/* Charts */}
    <section>
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
          કામગીરીના ટ્રેન્ડ્સ
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-900">
          સેન્સર ઇતિહાસ
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          સિમ્યુલેટરમાંથી પ્રાપ્ત થયેલા તાજેતરના રીડિંગ્સ બતાવવામાં આવી રહ્યા છે.
        </p>
      </div>

      <div className="space-y-5">
        <LineChart
          data={chartData}
          dataKey="power"
          label="પાવર આઉટપુટ"
          unit="W"
          description="તાજેતરના મોનિટરિંગ સમયગાળામાં ઉત્પન્ન થયેલી પાવર."
        />

        <LineChart
          data={chartData}
          dataKey="temperature"
          label="તાપમાન"
          unit="°C"
          description="કાર્યકારી તાપમાનનો ટ્રેન્ડ."
        />

        <LineChart
          data={chartData}
          dataKey="vibration"
          label="કંપન"
          unit="mm/s"
          description="વહેલી અસામાન્યતા શોધવા માટે વપરાતો યાંત્રિક કંપનનો ટ્રેન્ડ."
        />
      </div>
    </section>

    {/* Footer status */}
    <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
          <Activity size={20} />
        </div>

        <div>
          <p className="text-sm font-bold text-slate-800">
            લાઇવ મોનિટરિંગ સક્રિય છે
          </p>

          <p className="mt-1 text-xs text-slate-500">
            સેન્સર ડેટા દર 5 સેકન્ડે આપમેળે રિફ્રેશ થાય છે.
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        છેલ્લું સેન્સર રીડિંગ:{" "}
        {formatTime(lastUpdated)}
      </p>
    </section>
  </>
)}
</div>
</div>
  );
}