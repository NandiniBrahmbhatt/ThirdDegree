import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  Factory,
  Leaf,
  Zap,
} from "lucide-react";

function Dashboard() {
  const stats = [
    {
      label: "Total Assets",
      value: "0",
      description: "No assets connected yet",
      icon: Activity,
      iconBg: "bg-[#E8F5EC]",
      iconColor: "text-[#238542]",
    },
    {
      label: "Healthy Assets",
      value: "0",
      description: "Waiting for sensor data",
      icon: Leaf,
      iconBg: "bg-[#E8F5EC]",
      iconColor: "text-[#238542]",
    },
    {
      label: "Needs Attention",
      value: "0",
      description: "No issues detected",
      icon: AlertTriangle,
      iconBg: "bg-[#FFF4DF]",
      iconColor: "text-[#D68B23]",
    },
    {
      label: "Critical Assets",
      value: "0",
      description: "No critical assets",
      icon: Zap,
      iconBg: "bg-[#FBE9E7]",
      iconColor: "text-[#C94B3F]",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Farm Header */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#285B3B]">
        <img
          src="/images/solar-farm.jpg"
          alt="Solar and wind renewable energy farm"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#285B3B] via-[#285B3B]/85 to-transparent" />

        <div className="relative z-10 flex min-h-[280px] flex-col justify-between gap-8 p-7 md:p-9">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
              <Factory size={19} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/60">
                Farm Overview
              </p>
              <p className="mt-0.5 text-sm font-medium text-white">
                Renewable Energy Operations
              </p>
            </div>
          </div>

          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Your renewable assets,
              <br />
              monitored intelligently.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 md:text-base">
              Connect your farm data to detect abnormal behaviour, understand
              asset health and prioritize maintenance before problems grow.
            </p>

            <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#285B3B] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F7F5F0]">
              <BrainCircuit size={17} />
              Analyze Farm with AI
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#E4E9E1] bg-white p-5 shadow-[0_4px_20px_rgba(32,39,34,0.035)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(32,39,34,0.07)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#738078]">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-[#202722]">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-[#89968E]">
                    {stat.description}
                  </p>
                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon size={18} className={stat.iconColor} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Farm Health + AI Analysis */}
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">

        {/* Farm Health */}
        <div className="rounded-3xl border border-[#E4E9E1] bg-white p-6 shadow-[0_4px_20px_rgba(32,39,34,0.035)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#738078]">
                Farm Health
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#202722]">
                Waiting for farm data
              </h2>
            </div>

            <div className="rounded-full bg-[#F1F4ED] px-3 py-1.5 text-xs font-semibold text-[#738078]">
              Not analyzed
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[10px] border-[#F1F4ED]">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#202722]">—</p>
                <p className="text-[10px] text-[#89968E]">/ 100</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#202722]">
                No health score yet
              </p>

              <p className="mt-2 text-sm leading-6 text-[#738078]">
                Connect asset or sensor data to generate an AI-powered farm
                health assessment.
              </p>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="rounded-3xl border border-[#E4E9E1] bg-[#F7F5F0] p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#285B3B] shadow-sm">
            <BrainCircuit size={20} />
          </div>

          <p className="mt-5 text-sm font-medium text-[#738078]">
            AI Analysis
          </p>

          <h2 className="mt-1 text-xl font-bold text-[#202722]">
            Ready when your data is.
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#738078]">
            Once sensor data is available, AI analysis can identify unusual
            patterns and highlight assets that may need attention.
          </p>

          <button
            disabled
            className="mt-5 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#E4E9E1] px-4 py-3 text-sm font-semibold text-[#89968E]"
          >
            <BrainCircuit size={16} />
            Analysis unavailable
          </button>
        </div>
      </section>

      {/* Maintenance + Activity */}
      <section className="grid gap-6 lg:grid-cols-2">

        {/* Maintenance */}
        <div className="rounded-3xl border border-[#E4E9E1] bg-white p-6 shadow-[0_4px_20px_rgba(32,39,34,0.035)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#738078]">
                Maintenance Priority
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#202722]">
                Nothing requires attention
              </h2>
            </div>

            <div className="rounded-xl bg-[#E8F5EC] p-2.5 text-[#238542]">
              <Activity size={18} />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-[#D9E0D8] bg-[#FAFBF7] p-6 text-center">
            <p className="text-sm font-semibold text-[#202722]">
              No maintenance priorities yet
            </p>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#89968E]">
              Maintenance priorities will appear here after assets are
              connected and analyzed.
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-3xl border border-[#E4E9E1] bg-white p-6 shadow-[0_4px_20px_rgba(32,39,34,0.035)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#738078]">
                Recent Activity
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#202722]">
                Farm activity
              </h2>
            </div>

            <div className="rounded-xl bg-[#E3F1F6] p-2.5 text-[#2387AE]">
              <Activity size={18} />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-[#D9E0D8] bg-[#FAFBF7] p-6 text-center">
            <p className="text-sm font-semibold text-[#202722]">
              No activity yet
            </p>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#89968E]">
              Asset alerts, analyses and maintenance updates will appear here
              once your farm is connected.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
}

export default Dashboard;