import { Activity, AlertTriangle, BatteryCharging, IndianRupee } from "lucide-react";
import StatCard from "../components/StatCard";
import RiskBadge from "../components/RiskBadge";
import { dashboardStats, assets, alerts, farm } from "../data/mockData";

function Dashboard() {
  const criticalAsset = assets.find((asset) => asset.status === "Critical");

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-3xl bg-[#285B3B] p-7 text-white md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-white/70">
            Renewable Intelligence
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {farm.name}
          </h1>

          <p className="mt-2 text-sm text-white/70">
            {farm.location} · {farm.type} · {farm.capacity}
          </p>
        </div>

        <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#285B3B] shadow-sm transition hover:bg-[#F7F5F0]">
          Analyze Farm with AI
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Assets"
          value={dashboardStats.totalAssets}
          description="Across the farm"
          icon={<Activity size={19} className="text-[#238542]" />}
          accent="#E8F5EC"
        />

        <StatCard
          title="Healthy Assets"
          value={dashboardStats.healthyAssets}
          description="Operating normally"
          icon={<BatteryCharging size={19} className="text-[#238542]" />}
          accent="#E8F5EC"
        />

        <StatCard
          title="Assets to Monitor"
          value={dashboardStats.monitorAssets}
          description="Need attention"
          icon={<AlertTriangle size={19} className="text-[#D68B23]" />}
          accent="#FFF4DF"
        />

        <StatCard
          title="Critical Assets"
          value={dashboardStats.criticalAssets}
          description="Immediate attention"
          icon={<AlertTriangle size={19} className="text-[#C94B3F]" />}
          accent="#FBE9E7"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="overflow-hidden rounded-3xl border border-[#E4E9E1] bg-white shadow-[0_4px_20px_rgba(32,39,34,0.04)]">
          <div className="h-56 bg-[#F1F4ED]">
            <img
              src="/images/solar-farm.jpg"
              alt="Solar farm"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#738078]">
                  Farm Overview
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#202722]">
                  {farm.name}
                </h2>
              </div>

              <span className="rounded-full bg-[#E8F5EC] px-3 py-1 text-xs font-semibold text-[#238542]">
                Operational
              </span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-[#89968E]">Capacity</p>
                <p className="mt-1 font-semibold text-[#202722]">
                  {farm.capacity}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#89968E]">Asset Count</p>
                <p className="mt-1 font-semibold text-[#202722]">
                  {dashboardStats.totalAssets}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#89968E]">Farm Type</p>
                <p className="mt-1 font-semibold text-[#202722]">
                  {farm.type}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#E4E9E1] bg-white p-6 shadow-[0_4px_20px_rgba(32,39,34,0.04)]">
          <p className="text-sm font-medium text-[#738078]">Farm Health</p>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-5xl font-bold tracking-tight text-[#238542]">
              82
            </span>

            <span className="mb-1 text-sm text-[#738078]">
              / 100
            </span>
          </div>

          <p className="mt-2 text-sm font-medium text-[#176232]">
            Overall health is good
          </p>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#F1F4ED]">
            <div
              className="h-full rounded-full bg-[#238542]"
              style={{ width: "82%" }}
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#F7F5F0] p-4">
              <p className="text-xs text-[#738078]">Energy at Risk</p>
              <p className="mt-1 text-lg font-bold text-[#202722]">
                {dashboardStats.energyAtRisk}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F7F5F0] p-4">
              <p className="text-xs text-[#738078]">Revenue at Risk</p>
              <p className="mt-1 flex items-center text-lg font-bold text-[#202722]">
                <IndianRupee size={17} />
                {dashboardStats.revenueAtRisk.replace("₹", "")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#E4E9E1] bg-white p-6 shadow-[0_4px_20px_rgba(32,39,34,0.04)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#738078]">
                Maintenance Priority
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#202722]">
                Assets needing attention
              </h2>
            </div>

            <RiskBadge status={criticalAsset.status} />
          </div>

          <div className="mt-5 rounded-2xl border border-[#FBE9E7] bg-[#FFF9F8] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#C94B3F]">
                  Priority #1
                </p>

                <h3 className="mt-1 text-lg font-bold text-[#202722]">
                  {criticalAsset.name}
                </h3>

                <p className="mt-1 text-sm text-[#738078]">
                  {criticalAsset.type} · {criticalAsset.location}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-[#738078]">Risk</p>
                <p className="text-2xl font-bold text-[#C94B3F]">
                  {criticalAsset.riskScore}%
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#202722]">
              Temperature is rising while power output is declining.
            </p>

            <button className="mt-4 text-sm font-semibold text-[#238542] hover:underline">
              View asset details →
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-[#E4E9E1] bg-white p-6 shadow-[0_4px_20px_rgba(32,39,34,0.04)]">
          <p className="text-sm font-medium text-[#738078]">
            Recent Alerts
          </p>

          <h2 className="mt-1 text-xl font-bold text-[#202722]">
            Latest asset signals
          </h2>

          <div className="mt-5 space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.asset}
                className="flex items-start justify-between gap-4 rounded-2xl bg-[#F7F5F0] p-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#202722]">
                      {alert.asset}
                    </p>

                    <RiskBadge status={alert.status} />
                  </div>

                  <p className="mt-1 text-xs leading-5 text-[#738078]">
                    {alert.message}
                  </p>
                </div>

                <span className="whitespace-nowrap text-[11px] text-[#89968E]">
                  {alert.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;