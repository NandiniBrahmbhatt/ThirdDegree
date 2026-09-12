import { Link } from "react-router-dom";
import { ArrowUpRight, Leaf, Sun, Wind } from "lucide-react";

function Dashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAFBF7]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/solar-farm.jpg"
          alt="Renewable energy farm"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#001e61]/90 via-[#001e61]/55 to-[#001e61]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001e61]/70 via-transparent to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative flex min-h-screen flex-col justify-between px-8 pb-10 pt-28 xl:px-12">
        <div className="max-w-3xl pt-10 xl:pt-16">
          <div className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            <span className="flex items-center gap-2">
              <Sun size={14} strokeWidth={1.8} />
              Solar
            </span>

            <span className="text-white/40">•</span>

            <span className="flex items-center gap-2">
              <Wind size={14} strokeWidth={1.8} />
              Wind
            </span>

            <span className="text-white/40">•</span>

            <span className="flex items-center gap-2">
              <Leaf size={14} strokeWidth={1.8} />
              Sustainable
            </span>
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl xl:text-7xl">
            Smarter maintenance
            <br />
            for cleaner energy.
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/75">
            RenewAI helps renewable energy teams understand asset behaviour,
            identify potential issues early, and make better maintenance
            decisions with AI-assisted insights.
          </p>

          <Link
            to="/farms"
            className="group mt-9 inline-flex h-12 items-center gap-3 rounded-full bg-white px-6 text-[13px] font-semibold text-[#001e61] shadow-[0_14px_35px_rgba(0,0,0,0.15)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#F0F3F9]"
          >
            Create your first farm

            <ArrowUpRight
              size={17}
              strokeWidth={1.9}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Bottom information */}
        <div className="flex flex-col gap-6 border-t border-white/20 pt-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
              AI-assisted renewable intelligence
            </p>

            <p className="mt-2 text-xs leading-5 text-white/65">
              From detecting abnormal behaviour to understanding maintenance
              priorities, RenewAI turns asset data into actionable insight.
            </p>
          </div>

          <div className="flex items-center gap-8 text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
            <span>Solar assets</span>
            <span>Wind assets</span>
            <span>Predictive maintenance</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;