import {
  ShieldCheck,
  TriangleAlert,
  Zap,
  Sun,
  Wind,
  HardHat,
  ClipboardCheck,
} from "lucide-react";

function TechnicianSafety() {
  const safetyRules = [
    {
      icon: Zap,
      title: "Isolate electrical equipment",
      text: "Follow the appropriate isolation and lockout procedures before working on electrical equipment.",
    },
    {
      icon: HardHat,
      title: "Use suitable PPE",
      text: "Wear the protective equipment required for the specific task and working environment.",
    },
    {
      icon: Sun,
      title: "Treat solar systems as live",
      text: "Solar equipment can remain electrically active when exposed to sunlight. Follow the site's electrical safety procedures.",
    },
    {
      icon: Wind,
      title: "Respect turbine hazards",
      text: "Follow site-specific procedures around rotating equipment, elevated areas and other turbine hazards.",
    },
    {
      icon: TriangleAlert,
      title: "Do not ignore warning signs",
      text: "Stop and assess the situation when you notice unusual heat, smell, noise, vibration or visible equipment damage.",
    },
    {
      icon: ClipboardCheck,
      title: "Follow site procedures",
      text: "Use the equipment manufacturer's instructions and the site's approved maintenance and safety procedures.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFBF7] px-8 pb-12 pt-28 text-[#202722] xl:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
          Technician Knowledge
        </p>

        <h1 className="text-4xl font-semibold tracking-[-0.04em] xl:text-5xl">
          Safety comes before maintenance.
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#738078]">
          Essential safety reminders for technicians working around solar,
          wind and electrical equipment.
        </p>
      </section>

      <section className="mb-7 rounded-3xl border border-[#E4E9E1] bg-white p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF3E0] text-[#A96816]">
            <ShieldCheck size={23} strokeWidth={1.8} />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Stop if something does not look right.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#738078]">
              Never rush a maintenance task. If equipment condition, the
              working environment or the required procedure is unclear,
              follow the appropriate safety process before continuing.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {safetyRules.map((rule) => {
          const Icon = rule.icon;

          return (
            <article
              key={rule.title}
              className="rounded-3xl border border-[#E4E9E1] bg-white p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8EDF7] text-[#001e61]">
                <Icon size={20} strokeWidth={1.8} />
              </div>

              <h2 className="mt-5 text-base font-semibold">
                {rule.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#738078]">
                {rule.text}
              </p>
            </article>
          );
        })}
      </section>

      <div className="mt-7 flex items-start gap-4 rounded-3xl border border-[#E4E9E1] bg-white p-6">
        <TriangleAlert
          size={20}
          strokeWidth={1.8}
          className="mt-0.5 shrink-0 text-[#A96816]"
        />

        <p className="text-xs leading-6 text-[#738078]">
          These are general reminders, not a replacement for formal safety
          training, site procedures, electrical regulations or manufacturer
          instructions.
        </p>
      </div>
    </div>
  );
}

export default TechnicianSafety;