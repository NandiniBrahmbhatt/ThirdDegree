import {
  Wrench,
  Sun,
  Wind,
  BatteryCharging,
  Gauge,
  Thermometer,
  Zap,
  CalendarCheck,
} from "lucide-react";

function TechnicianMaintenance() {
  const maintenanceTips = [
    {
      icon: Sun,
      title: "Keep solar panels clean",
      text: "Inspect panels regularly and remove dust, leaves and other surface dirt that may reduce energy generation.",
    },
    {
      icon: Gauge,
      title: "Check inverter performance",
      text: "Monitor inverter indicators, error codes and operating values. Investigate unusual readings before they become larger issues.",
    },
    {
      icon: Wind,
      title: "Inspect wind turbine components",
      text: "Regularly check visible turbine components for unusual vibration, noise, wear or other abnormal behaviour.",
    },
    {
      icon: Zap,
      title: "Inspect electrical connections",
      text: "Check accessible electrical connections for looseness, overheating signs or visible damage during scheduled maintenance.",
    },
    {
      icon: Thermometer,
      title: "Watch temperature trends",
      text: "Unusual temperature increases can indicate equipment stress. Compare readings with normal operating conditions.",
    },
    {
      icon: BatteryCharging,
      title: "Monitor system output",
      text: "Compare actual generation with expected performance to identify possible degradation or equipment problems.",
    },
  ];

  const checklist = [
    "Inspect equipment condition",
    "Check unusual sounds or vibration",
    "Review inverter or controller readings",
    "Check accessible cables and connections",
    "Compare current output with normal output",
    "Record abnormal observations",
  ];

  return (
    <div className="min-h-screen bg-[#FAFBF7] px-8 pb-12 pt-28 text-[#202722] xl:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
          Technician Knowledge
        </p>

        <h1 className="text-4xl font-semibold tracking-[-0.04em] xl:text-5xl">
          Maintenance tips that keep systems running.
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#738078]">
          Practical reminders for routine inspection and maintenance of
          renewable energy equipment.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {maintenanceTips.map((tip) => {
          const Icon = tip.icon;

          return (
            <article
              key={tip.title}
              className="rounded-3xl border border-[#E4E9E1] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(32,39,34,0.06)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8EDF7] text-[#001e61]">
                <Icon size={20} strokeWidth={1.8} />
              </div>

              <h2 className="mt-5 text-base font-semibold">
                {tip.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#738078]">
                {tip.text}
              </p>
            </article>
          );
        })}
      </section>

      <section className="mt-7 rounded-3xl border border-[#E4E9E1] bg-white p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F3F9] text-[#001e61]">
            <CalendarCheck size={20} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#89968E]">
              Routine checklist
            </p>

            <h2 className="mt-1 text-lg font-semibold">
              Before closing a maintenance visit
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {checklist.map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-[#F7F5F0] px-4 py-3 text-sm text-[#738078]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TechnicianMaintenance;