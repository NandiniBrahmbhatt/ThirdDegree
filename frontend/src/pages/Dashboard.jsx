import {
  ArrowRight,
  Plus,
  Sun,
  Wind,
  Leaf,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAFBF7]">

      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================= */}

      <div className="pointer-events-none absolute -right-30 -top-35 h-107.5 w-107.5 rounded-full border-70 border-[#E3F1E6]/70" />

      <div className="pointer-events-none absolute -bottom-55 left-47.5 h-120 w-120 rounded-full border-70 border-[#E3F1E6]/70" />

      <div className="pointer-events-none absolute -right-5 top-25 h-65 w-65 rounded-full bg-[#E3F1E6]/25 blur-3xl" />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative min-h-screen">

        {/* Image */}
        <div className="absolute inset-0">

          <img
            src="/images/solar-farm.jpg"
            alt="Solar panels and wind turbines"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Main fade */}
          <div className="absolute inset-0 bg-linear-to-r from-[#FAFBF7] via-[#FAFBF7]/90 via-42% to-[#FAFBF7]/5" />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-[35%] bg-linear-to-t from-[#FAFBF7] to-transparent" />

          {/* Soft overall wash */}
          <div className="absolute inset-0 bg-[#E3F1F6]/10" />
        </div>

        {/* =====================================================
            HERO CONTENT
        ===================================================== */}

        <div className="relative z-10 flex min-h-screen items-center">

          <div className="w-full px-8 pb-20 pt-32 sm:px-12 lg:px-21 xl:px-21">

            <div className="max-w-142.5">

              {/* Eyebrow */}
              <div className="mb-6 flex items-center gap-2">

                <span className="h-px w-8 bg-[#001e61]" />

                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
                  Clean Energy. Smarter Tomorrow.
                </p>

              </div>

              {/* Heading */}
              <h1 className="text-[58px] font-semibold leading-[0.98] tracking-[-0.055em] text-[#202722] sm:text-[66px] xl:text-[72px]">
                Welcome to
                <br />
                <span className="text-[#001e61]">
                  RenewAI
                </span>
              </h1>

              {/* Description */}
              <p className="mt-7 max-w-120 text-[15px] leading-7 text-[#5F7169]">
                Your renewable energy operations platform. Monitor your
                farms, manage assets, and keep everything running with
                the power of AI.
              </p>

              {/* CTA */}
              <button
                onClick={() => navigate("/farms")}
                className="group mt-8 inline-flex items-center gap-4 rounded-full bg-[#001e61] px-5 py-3.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_rgba(35,133,66,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[ #001e61]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  <Plus
                    size={15}
                    strokeWidth={2}
                  />
                </span>

                Create Farm

                <ArrowRight
                  size={17}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              {/* Feature tags */}
              <div className="mt-24 flex items-center gap-5">

                {/* Solar */}
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5B83D]/15">
                    <Sun
                      size={17}
                      strokeWidth={1.7}
                      className="text-[#D68B23]"
                    />
                  </div>

                  <span className="text-[12px] font-medium text-[#40544C]">
                    Solar
                  </span>
                </div>

                <div className="h-5 w-px bg-[#738078]/25" />

                {/* Wind */}
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E3F1F6]">
                    <Wind
                      size={17}
                      strokeWidth={1.7}
                      className="text-[#2387AE]"
                    />
                  </div>

                  <span className="text-[12px] font-medium text-[#40544C]">
                    Wind
                  </span>
                </div>

                <div className="h-5 w-px bg-[#738078]/25" />

                {/* Sustainable */}
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8EDF7]">
                    <Leaf
                      size={17}
                      strokeWidth={1.7}
                      className="text-[#001e61]"
                    />
                  </div>

                  <span className="text-[12px] font-medium text-[#40544C]">
                    Sustainable
                  </span>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* =====================================================
            SMALL AI BADGE
        ===================================================== */}

        <div className="absolute bottom-10 right-8 z-20 hidden rounded-full border border-white/50 bg-white/50 px-4 py-2.5 backdrop-blur-xl md:flex md:items-center md:gap-2.5">

          <Sparkles
            size={15}
            className="text-[#001e61]"
          />

          <span className="text-[11px] font-medium text-[#40544C]">
            AI-assisted renewable intelligence
          </span>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;