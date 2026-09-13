import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react";

import { apiRequest } from "../services/api";

function getSeverityStyles(severity) {
  if (severity === "critical") {
    return {
      wrapper: "border-red-200 bg-red-50/40",
      icon: "bg-red-100 text-red-600",
      badge: "bg-red-100 text-red-700",
      label: "ગંભીર",
      progress: "bg-red-500",
    };
  }

  if (severity === "warning") {
    return {
      wrapper: "border-amber-200 bg-amber-50/30",
      icon: "bg-amber-100 text-amber-600",
      badge: "bg-amber-100 text-amber-700",
      label: "ચેતવણી",
      progress: "bg-amber-500",
    };
  }

  return {
    wrapper: "border-emerald-200 bg-emerald-50/30",
    icon: "bg-emerald-100 text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    label: "ઉકેલાયેલ",
    progress: "bg-emerald-500",
  };
}

function getSeverityFromAnalysis(analysis) {
  const risk = Number(analysis.risk_score || 0);

  if (analysis.status === "at_risk" || risk >= 75) {
    return "critical";
  }

  if (analysis.status === "watch" || risk >= 25) {
    return "warning";
  }

  return "resolved";
}

function getStatusFromSeverity(severity) {
  return severity === "resolved" ? "ઉકેલાયેલ" : "સક્રિય";
}

function formatTime(value) {
  if (!value) {
    return "ઉપલબ્ધ નથી";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const now = new Date();
  const differenceMs = now.getTime() - date.getTime();
  const differenceMinutes = Math.floor(
    differenceMs / (1000 * 60)
  );

  if (differenceMinutes < 1) {
    return "હમણાં જ";
  }

  if (differenceMinutes < 60) {
    return `${differenceMinutes} ${differenceMinutes !== 1 ? "મિનિટ" : "મિનિટ"} પહેલાં`;
  }

  const differenceHours = Math.floor(
    differenceMinutes / 60
  );

  if (differenceHours < 24) {
    return `${differenceHours} ${differenceHours !== 1 ? "કલાક" : "કલાક"} પહેલાં`;
  }

  const differenceDays = Math.floor(
    differenceHours / 24
  );

  return `${differenceDays} ${differenceDays !== 1 ? "દિવસ" : "દિવસ"} પહેલાં`;
}

function formatScore(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  if (number >= 0 && number <= 1) {
    return Math.round(number * 100);
  }

  return Math.round(number);
}

function SummaryCard({
  icon,
  label,
  value,
  description,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className={`rounded-xl p-3 ${iconClass}`}>
          {icon}
        </div>

        <span className="text-2xl font-bold text-slate-900">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-bold text-slate-800">
        {label}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}

function AlertCard({ alert }) {
  const styles = getSeverityStyles(alert.severity);

  return (
    <article
      className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6 ${styles.wrapper}`}
    >
      <div className="flex flex-col gap-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <div
              className={`shrink-0 rounded-xl p-3 ${styles.icon}`}
            >
              {alert.severity === "critical" ? (
                <ShieldAlert size={21} />
              ) : alert.severity === "warning" ? (
                <AlertTriangle size={21} />
              ) : (
                <ShieldCheck size={21} />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {alert.title}
                </h3>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${styles.badge}`}
                >
                  {styles.label}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">
                  {alert.asset}
                </span>

                <span>{alert.assetType}</span>

                <span className="inline-flex items-center gap-1">
                  <Clock3 size={12} />
                  {alert.time}
                </span>
              </div>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
              alert.status === "Resolved"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-white/80 text-slate-600"
            }`}
          >
            {alert.status}
          </span>
        </div>

        {/* Description */}
        <p className="max-w-3xl text-sm leading-6 text-slate-600">
          {alert.description}
        </p>

        {/* Risk */}
        <div className="rounded-xl border border-white/80 bg-white/70 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp
                size={16}
                className="text-slate-500"
              />

              <span className="text-xs font-semibold text-slate-600">
                જોખમ સ્કોર
              </span>
            </div>

            <span className="text-sm font-bold text-slate-900">
              {alert.risk}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${styles.progress}`}
              style={{
                width: `${Math.min(
                  100,
                  Math.max(0, alert.risk)
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Recommendation */}
        <div className="flex items-start gap-3 border-t border-white/80 pt-4">
          <div className="mt-0.5 shrink-0 text-slate-500">
            <Zap size={17} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              ભલામણ કરેલ કાર્યવાહી
            </p>

            <p className="mt-1 text-sm leading-5 text-slate-700">
              {alert.recommendation}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Alerts() {
  const [analyses, setAnalyses] = useState([]);
  const [assets, setAssets] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAlerts() {
    try {
      setError("");

      const [analysisData, assetData] = await Promise.all([
        apiRequest("/analyses/dashboard"),
        apiRequest("/assets"),
      ]);

      setAnalyses(
        Array.isArray(analysisData) ? analysisData : []
      );

      setAssets(
        Array.isArray(assetData) ? assetData : []
      );
    } catch (err) {
      console.error("Unable to load alerts:", err);

      setError(
        "Unable to load your alerts. Please refresh and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAlerts();

    // Refresh alerts periodically so newly generated
    // analyses appear without manually refreshing the page.
    const timer = setInterval(() => {
      loadAlerts();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const alerts = useMemo(() => {
    return analyses.map((analysis) => {
      const asset = assets.find(
        (item) =>
          Number(item.asset_id) ===
          Number(analysis.asset_id)
      );

      const severity = getSeverityFromAnalysis(analysis);

      const risk = formatScore(analysis.risk_score);

      const title =
        analysis.probable_issue ||
        (analysis.anomaly_detected
          ? "અસામાન્યતા મળી"
          : "એસેટ સામાન્ય રીતે કાર્યરત છે");

      const description =
        analysis.contributing_factors ||
        (analysis.anomaly_detected
          ? "AI મોડેલે નવીનતમ એસેટ રીડિંગમાં અસામાન્ય સેન્સર પેટર્ન શોધી કાઢ્યું."
          : "નવીનતમ સેન્સર રીડિંગ અપેક્ષિત કાર્યકારી શ્રેણીમાં છે.");

      return {
        id: analysis.analysis_id,
        asset: asset?.asset_label || `Asset ${analysis.asset_id}`,
        assetType:
          asset?.asset_type === "solar"
            ? "સોલાર એસેટ"
            : asset?.asset_type === "wind"
              ? "વિન્ડ ટર્બાઇન"
              : "નવીનીકરણીય એસેટ",
        title,
        description,
        severity,
        risk,
        time: formatTime(analysis.timestamp),
        recommendation:
          analysis.recommended_action ||
          "એસેટનું મોનિટરિંગ ચાલુ રાખો.",
        status: getStatusFromSeverity(severity),
      };
    });
  }, [analyses, assets]);

  const activeAlerts = alerts.filter(
    (alert) => alert.status === "સક્રિય"
  );

  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === "critical"
  );

  const warningAlerts = alerts.filter(
    (alert) => alert.severity === "warning"
  );

  const resolvedAlerts = alerts.filter(
    (alert) => alert.status === "ઉકેલાયેલ"
  );

  return (
    <div className="min-h-full bg-[#FAFBF7] px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-[#001e61] p-6 text-white shadow-xl sm:p-8">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-red-400/10 blur-3xl" />

          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-amber-300">
                <Bell size={18} />

                <span className="text-xs font-bold uppercase tracking-[0.15em]">
                  એસેટ ઇન્ટેલિજન્સ
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                ચેતવણીઓ
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                તમારા નવીનીકરણીય ઊર્જા એસેટ્સમાં શોધાયેલી સંભવિત સમસ્યાઓ વિશે માહિતગાર રહો.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:block">
              <Bell
                size={38}
                className="text-amber-300"
              />

              <p className="mt-3 text-sm font-semibold">
                {activeAlerts.length} સક્રિય
              </p>

              <p className="mt-1 text-xs text-slate-400">
                તમારા ધ્યાનની જરૂર છે
              </p>
            </div>
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <section className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <Loader2
                size={19}
                className="animate-spin text-[#001e61]"
              />

              AI ચેતવણીઓ લોડ થઈ રહી છે...
            </div>
          </section>
        )}

        {/* Error */}
        {!loading && error && (
          <section className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </section>
        )}

        {!loading && !error && (
          <>
            {/* Summary */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                icon={<Bell size={21} />}
                iconClass="bg-blue-50 text-blue-600"
                label="કુલ વિશ્લેષણો"
                value={alerts.length}
                description="દરેક એસેટ માટેનું નવીનતમ AI વિશ્લેષણ"
              />

              <SummaryCard
                icon={<ShieldAlert size={21} />}
                iconClass="bg-red-50 text-red-600"
                label="Critical"
                value={criticalAlerts.length}
                description="તાત્કાલિક ધ્યાનની જરૂર છે"
              />

              <SummaryCard
                icon={<AlertTriangle size={21} />}
                iconClass="bg-amber-50 text-amber-600"
                label="ચેતવણીઓ"
                value={warningAlerts.length}
                description="આ એસેટ્સ પર નજર રાખો"
              />

              <SummaryCard
                icon={<CheckCircle2 size={21} />}
                iconClass="bg-emerald-50 text-emerald-600"
                label="સ્વસ્થ"
                value={resolvedAlerts.length}
                description="સક્રિય જોખમ વિના નવીનતમ વિશ્લેષણો"
              />
            </section>

            {/* સક્રિય ચેતવણીઓ */}
            <section>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                    ધ્યાન જરૂરી છે
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    સક્રિય ચેતવણીઓ
                  </h2>
                </div>

                <p className="text-xs text-slate-500">
                  {activeAlerts.length} સક્રિય alert
                  {activeAlerts.length !== 1 ? "s" : ""}
                </p>
              </div>

              {activeAlerts.length === 0 ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8 text-center">
                  <CheckCircle2
                    size={30}
                    className="mx-auto text-emerald-600"
                  />

                  <p className="mt-4 text-sm font-bold text-slate-800">
                    કોઈ સક્રિય ચેતવણીઓ નથી
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    તમારા નવીનતમ AI વિશ્લેષણો સૂચવતા નથી કે કોઈ એસેટને તાત્કાલિક ધ્યાનની જરૂર છે.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeAlerts.map((alert) => (
                    <AlertCard
                      key={alert.id}
                      alert={alert}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* સ્વસ્થ / resolved */}
            <section>
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                  Latest Status
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  સ્વસ્થ એસેટ્સ
                </h2>
              </div>

              {resolvedAlerts.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                  <ShieldCheck
                    size={28}
                    className="mx-auto text-slate-400"
                  />

                  <p className="mt-4 text-sm font-bold text-slate-800">
                    હજુ સુધી કોઈ સ્વસ્થ વિશ્લેષણ પરિણામો નથી
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    નવીનતમ એસેટ સ્થિતિ જોવા માટે AI વિશ્લેષણ ચલાવો.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {resolvedAlerts.map((alert) => (
                    <AlertCard
                      key={alert.id}
                      alert={alert}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 py-3 text-xs text-slate-400">
              <XCircle size={14} />

              <span>
                ચેતવણીઓ વાસ્તવિક AI એસેટ વિશ્લેષણમાંથી જનરેટ થાય છે.
              </span>

              <ChevronRight size={14} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}