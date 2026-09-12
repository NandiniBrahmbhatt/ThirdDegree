import { useState } from "react";
import {
  Wrench,
  ArrowRight,
  ShieldAlert,
  Zap,
  Clock3,
  X,
  CircleCheck,
} from "lucide-react";

const filters = ["All", "Critical", "High", "Medium"];

function Maintenance() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen px-8 pb-12 pt-28 xl:px-12">

      {/* Header */}
      <section className="flex flex-col justify-between gap-6 border-b border-[#E4E9E1] pb-8 lg:flex-row lg:items-end">

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
            Maintenance Intelligence
          </p>

          <h1 className="mt-3 max-w-120 text-4xl font-semibold leading-tight tracking-[-0.045em] text-[#202722] sm:text-5xl">
            Fix what matters.
            <br />
            <span className="text-[#001e61]">
              Before it matters more.
            </span>
          </h1>

          <p className="mt-5 max-w-120 text-sm leading-6 text-[#738078]">
            RenewAI prioritizes maintenance using asset risk, energy
            impact, and urgency so your team knows what needs attention first.
          </p>
        </div>

        <button
          onClick={() => setShowInfo(true)}
          className="group flex shrink-0 items-center gap-3 self-start rounded-full border border-[#001e61] bg-white px-5 py-3 text-[13px] font-semibold text-[#001e61] transition hover:bg-[#001e61] hover:text-white lg:self-auto"
        >
          <span>How prioritization works</span>

          <ArrowRight
            size={16}
            strokeWidth={1.8}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>

      </section>

      {/* Filters */}
      <section className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-xs font-semibold text-[#202722]">
            Maintenance queue
          </p>

          <p className="mt-1 text-xs text-[#89968E]">
            Prioritized work will appear here after AI analysis.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const selected = activeFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-[11px] font-semibold transition ${
                  selected
                    ? "bg-[#001e61] text-white"
                    : "border border-[#E4E9E1] bg-white text-[#738078] hover:border-[#001e61] hover:text-[#001e61]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

      </section>

      {/* Empty queue */}
      <section className="relative overflow-hidden rounded-[28px] border border-[#E4E9E1] bg-[#F0F3F9]">

        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border-[50px] border-[#E6ECF7]" />

        <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full border-[50px] border-[#E6ECF7]" />

        <div className="relative flex min-h-[360px] items-center justify-center px-6 py-16 text-center">

          <div className="max-w-120">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E6ECF7] text-[#001e61]">
              <Wrench
                size={27}
                strokeWidth={1.6}
              />
            </div>

            <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
              Nothing to prioritize yet
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#202722]">
              Your maintenance queue is clear.
            </h2>

            <p className="mx-auto mt-4 max-w-120 text-sm leading-6 text-[#738078]">
              Once connected sensor data is analyzed, RenewAI will
              identify assets that need attention and rank them by
              operational importance.
            </p>

          </div>
        </div>
      </section>

      {/* Priority factors */}
      <section className="grid gap-6 py-10 md:grid-cols-3">

        <div className="border-t border-[#E4E9E1] pt-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6ECF7] text-[#001e61]">
            <ShieldAlert size={18} strokeWidth={1.7} />
          </div>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#001e61]">
            01
          </p>

          <h3 className="mt-2 text-lg font-semibold text-[#202722]">
            Risk
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#738078]">
            How strongly the asset's behavior indicates a potential
            operational problem.
          </p>
        </div>

        <div className="border-t border-[#E4E9E1] pt-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5B83D]/15 text-[#D68B23]">
            <Zap size={18} strokeWidth={1.7} />
          </div>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#001e61]">
            02
          </p>

          <h3 className="mt-2 text-lg font-semibold text-[#202722]">
            Energy impact
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#738078]">
            The potential generation and revenue impact if an issue
            remains unresolved.
          </p>
        </div>

        <div className="border-t border-[#E4E9E1] pt-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3F1F6] text-[#2387AE]">
            <Clock3 size={18} strokeWidth={1.7} />
          </div>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#001e61]">
            03
          </p>

          <h3 className="mt-2 text-lg font-semibold text-[#202722]">
            Urgency
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#738078]">
            How quickly the recommended inspection or repair should
            be considered.
          </p>
        </div>

      </section>

      {/* Info modal */}
      {showInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#202722]/30 px-5 py-8 backdrop-blur-sm">

          <div className="w-full max-w-150 rounded-[30px] bg-[#FAFBF7] p-6 shadow-2xl sm:p-8">

            <div className="flex items-start justify-between gap-6">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
                  RenewAI Logic
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#202722]">
                  How prioritization works
                </h2>

                <p className="mt-3 max-w-120 text-sm leading-6 text-[#738078]">
                  Maintenance priority is designed to help operators
                  decide what deserves attention first.
                </p>
              </div>

              <button
                onClick={() => setShowInfo(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0F3F9] text-[#738078] transition hover:bg-[#E6ECF7] hover:text-[#001e61]"
                aria-label="Close"
              >
                <X size={17} />
              </button>

            </div>

            <div className="mt-8 space-y-5">

              <div className="flex gap-4 border-t border-[#E4E9E1] pt-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6ECF7] text-xs font-bold text-[#001e61]">
                  01
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#202722]">
                    Detect
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#738078]">
                    Sensor and operational data is analyzed for
                    unusual behavior.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border-t border-[#E4E9E1] pt-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6ECF7] text-xs font-bold text-[#001e61]">
                  02
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#202722]">
                    Understand
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#738078]">
                    RenewAI identifies contributing factors and
                    estimates the asset's condition.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border-t border-[#E4E9E1] pt-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6ECF7] text-xs font-bold text-[#001e61]">
                  03
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#202722]">
                    Prioritize
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#738078]">
                    Risk, energy impact, and urgency are combined to
                    determine maintenance priority.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border-t border-[#E4E9E1] pt-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6ECF7] text-xs font-bold text-[#001e61]">
                  04
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#202722]">
                    Act
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#738078]">
                    The operator can then inspect the asset or assign
                    the work to a suitable technician.
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-[#E6ECF7] p-4">
              <CircleCheck
                size={19}
                className="shrink-0 text-[#001e61]"
              />

              <p className="text-xs leading-5 text-[#40544C]">
                The goal is not to predict an exact failure time. It is
                to help the maintenance team make better decisions
                earlier.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Maintenance;