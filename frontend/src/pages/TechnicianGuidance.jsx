import {
  Sun,
  Wind,
  Gauge,
  Zap,
  Activity,
  Thermometer,
  RotateCw,
  Eye,
} from "lucide-react";

function TechnicianGuidance() {
  const solarPoints = [
    {
      icon: Sun,
      title: "Panel condition",
      text: "Check for visible dirt, shading, cracks or other conditions that may affect generation.",
    },
    {
      icon: Zap,
      title: "Electrical system",
      text: "Inspect accessible cables, connectors and equipment according to the approved maintenance procedure.",
    },
    {
      icon: Gauge,
      title: "Inverter readings",
      text: "Review inverter status, warnings and operating values and compare them with expected conditions.",
    },
    {
      icon: Activity,
      title: "Energy output",
      text: "Track generation trends and investigate unexpected drops in output.",
    },
  ];

  const windPoints = [
    {
      icon: Wind,
      title: "Turbine condition",
      text: "Look for visible damage or unusual conditions around accessible turbine components.",
    },
    {
      icon: RotateCw,
      title: "Rotation and vibration",
      text: "Pay attention to unusual vibration, noise or changes in normal operating behaviour.",
    },
    {
      icon: Thermometer,
      title: "Temperature",
      text: "Monitor temperature readings and investigate abnormal changes according to site procedures.",
    },
    {
      icon: Gauge,
      title: "Performance",
      text: "Compare current turbine performance with expected operating behaviour and historical trends.",
    },
  ];

  const renderCards = (items) =>
    items.map((item) => {
      const Icon = item.icon;

      return (
        <article
          key={item.title}
          className="rounded-3xl border border-[#E4E9E1] bg-white p-6"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8EDF7] text-[#001e61]">
            <Icon size={20} strokeWidth={1.8} />
          </div>

          <h3 className="mt-5 text-base font-semibold">
            {item.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#738078]">
            {item.text}
          </p>
        </article>
      );
    });

  return (
    <div className="min-h-screen bg-[#FAFBF7] px-8 pb-12 pt-28 text-[#202722] xl:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
          Technician Knowledge
        </p>

        <h1 className="text-4xl font-semibold tracking-[-0.04em] xl:text-5xl">
          Understand the systems you maintain.
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#738078]">
          Quick reference guidance for common solar and wind renewable energy
          systems.
        </p>
      </section>

      {/* Solar */}
      <section>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8EDF7] text-[#001e61]">
            <Sun size={21} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#89968E]">
              Solar
            </p>

            <h2 className="text-xl font-semibold">
              Solar PV basics
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {renderCards(solarPoints)}
        </div>
      </section>

      {/* Wind */}
      <section className="mt-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8EDF7] text-[#001e61]">
            <Wind size={21} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#89968E]">
              Wind
            </p>

            <h2 className="text-xl font-semibold">
              Wind energy basics
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {renderCards(windPoints)}
        </div>
      </section>

      {/* Quick principle */}
      <section className="mt-10 rounded-3xl bg-[#001e61] p-7 text-white">
        <div className="flex items-start gap-4">
          <Eye size={22} strokeWidth={1.8} className="mt-0.5 shrink-0" />

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
              Technician mindset
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Observe → Compare → Investigate → Act
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
              Use equipment readings, visible conditions and historical
              behaviour together instead of relying on a single measurement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TechnicianGuidance;