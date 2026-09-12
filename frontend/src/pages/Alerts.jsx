import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react";

const mockAlerts = [
  {
    id: 1,
    asset: "WT-001",
    assetType: "Wind Turbine",
    title: "Possible bearing degradation",
    description:
      "High vibration and elevated temperature detected in recent sensor readings.",
    severity: "critical",
    risk: 82,
    time: "12 minutes ago",
    recommendation: "Schedule bearing inspection at the earliest opportunity.",
    status: "Active",
  },
  {
    id: 2,
    asset: "SP-002",
    assetType: "Solar Panel",
    title: "Possible excessive soiling",
    description:
      "Power output is lower than expected relative to the current solar irradiance.",
    severity: "warning",
    risk: 61,
    time: "34 minutes ago",
    recommendation: "Inspect the panels and consider cleaning them.",
    status: "Active",
  },
  {
    id: 3,
    asset: "WT-003",
    assetType: "Wind Turbine",
    title: "Temperature variation detected",
    description:
      "Operating temperature has moved outside the preferred range.",
    severity: "warning",
    risk: 47,
    time: "1 hour ago",
    recommendation: "Continue monitoring temperature and vibration trends.",
    status: "Active",
  },
  {
    id: 4,
    asset: "SP-001",
    assetType: "Solar Panel",
    title: "Anomaly cleared",
    description:
      "Sensor readings have returned to the expected operating range.",
    severity: "resolved",
    risk: 12,
    time: "2 hours ago",
    recommendation: "Continue routine monitoring.",
    status: "Resolved",
  },
];

function getSeverityStyles(severity) {
  if (severity === "critical") {
    return {
      wrapper: "border-red-200 bg-red-50/40",
      icon: "bg-red-100 text-red-600",
      badge: "bg-red-100 text-red-700",
      label: "Critical",
      progress: "bg-red-500",
    };
  }

  if (severity === "warning") {
    return {
      wrapper: "border-amber-200 bg-amber-50/30",
      icon: "bg-amber-100 text-amber-600",
      badge: "bg-amber-100 text-amber-700",
      label: "Warning",
      progress: "bg-amber-500",
    };
  }

  return {
    wrapper: "border-emerald-200 bg-emerald-50/30",
    icon: "bg-emerald-100 text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    label: "Resolved",
    progress: "bg-emerald-500",
  };
}

function SummaryCard({ icon, label, value, description, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className={`rounded-xl p-3 ${iconClass}`}>{icon}</div>

        <span className="text-2xl font-bold text-slate-900">{value}</span>
      </div>

      <p className="mt-4 text-sm font-bold text-slate-800">{label}</p>

      <p className="mt-1 text-xs text-slate-500">{description}</p>
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
            <div className={`shrink-0 rounded-xl p-3 ${styles.icon}`}>
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
                <span>•</span>
                <span>{alert.assetType}</span>
                <span>•</span>
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
              <TrendingUp size={16} className="text-slate-500" />
              <span className="text-xs font-semibold text-slate-600">
                Risk Score
              </span>
            </div>

            <span className="text-sm font-bold text-slate-900">
              {alert.risk}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${styles.progress}`}
              style={{ width: `${alert.risk}%` }}
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
              Recommended Action
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
  const activeAlerts = mockAlerts.filter(
    (alert) => alert.status === "Active"
  );

  const criticalAlerts = mockAlerts.filter(
    (alert) => alert.severity === "critical"
  );

  const warningAlerts = mockAlerts.filter(
    (alert) => alert.severity === "warning"
  );

  const resolvedAlerts = mockAlerts.filter(
    (alert) => alert.status === "Resolved"
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
                  Asset Intelligence
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Alerts
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                Stay informed about potential issues detected across your
                renewable energy assets.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:block">
              <Bell size={38} className="text-amber-300" />

              <p className="mt-3 text-sm font-semibold">
                {activeAlerts.length} active
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Require your attention
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={<Bell size={21} />}
            iconClass="bg-blue-50 text-blue-600"
            label="Total Alerts"
            value={mockAlerts.length}
            description="Detected across your assets"
          />

          <SummaryCard
            icon={<ShieldAlert size={21} />}
            iconClass="bg-red-50 text-red-600"
            label="Critical"
            value={criticalAlerts.length}
            description="Require immediate attention"
          />

          <SummaryCard
            icon={<AlertTriangle size={21} />}
            iconClass="bg-amber-50 text-amber-600"
            label="Warnings"
            value={warningAlerts.length}
            description="Keep these assets under watch"
          />

          <SummaryCard
            icon={<CheckCircle2 size={21} />}
            iconClass="bg-emerald-50 text-emerald-600"
            label="Resolved"
            value={resolvedAlerts.length}
            description="Issues that have cleared"
          />
        </section>

        {/* Active Alerts */}
        <section>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                Attention Required
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Active Alerts
              </h2>
            </div>

            <p className="text-xs text-slate-500">
              {activeAlerts.length} active alert
              {activeAlerts.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </section>

        {/* Resolved */}
        <section>
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              Alert History
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Recently Resolved
            </h2>
          </div>

          <div className="space-y-4">
            {resolvedAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </section>

        {/* Footer hint */}
        <div className="flex items-center justify-center gap-2 py-3 text-xs text-slate-400">
          <XCircle size={14} />
          <span>
            Alerts will be automatically generated from AI asset analysis.
          </span>
          <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
}