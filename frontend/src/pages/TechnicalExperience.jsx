import { useState } from "react";
import {
  BriefcaseBusiness,
  Save,
  ArrowRight,
  Sparkles,
} from "lucide-react";

function TechnicianExperience() {
  const [experience, setExperience] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend API integration will be connected here later.
    console.log("Technician experience:", experience);

    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFBF7] px-8 pb-12 pt-28 xl:px-12">
      {/* Header */}
      <section className="mb-10">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
          My Experience
        </p>

        <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[#202722] xl:text-5xl">
          Your experience, in your words.
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#738078]">
          Tell renewable energy owners about your practical experience,
          previous work and the kind of maintenance you are comfortable
          handling.
        </p>
      </section>

      {/* Experience Card */}
      <section className="max-w-4xl rounded-[28px] border border-[#E4E9E1] bg-white p-6 shadow-[0_12px_40px_rgba(32,39,34,0.04)] xl:p-8">
        {/* Intro */}
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8EDF7]">
            <BriefcaseBusiness
              size={20}
              strokeWidth={1.8}
              className="text-[#001e61]"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#202722]">
              Professional experience
            </h2>

            <p className="mt-1 text-sm leading-6 text-[#738078]">
              Write about your experience naturally. There is no fixed format
              or predefined experience level.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-xs font-semibold text-[#202722]">
            Tell us about your experience
          </label>

          <textarea
            value={experience}
            onChange={(e) => {
              setExperience(e.target.value);
              setSaved(false);
            }}
            placeholder="Example: I have 3 years of experience working with solar PV systems, inverter inspection, electrical troubleshooting and routine maintenance."
            required
            rows={12}
            className="w-full resize-none rounded-2xl border border-[#E4E9E1] bg-[#F7F5F0] px-5 py-4 text-sm leading-7 text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61]"
          />

          {/* Helpful hint */}
          <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#F0F3F9] px-4 py-3">
            <Sparkles
              size={16}
              strokeWidth={1.8}
              className="mt-0.5 shrink-0 text-[#001e61]"
            />

            <p className="text-xs leading-5 text-[#738078]">
              You can mention years of experience, renewable energy systems
              you have worked on, maintenance tasks, troubleshooting skills or
              previous projects.
            </p>
          </div>

          {/* Save */}
          <div className="mt-7 flex flex-col gap-4 border-t border-[#E4E9E1] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {saved ? (
                <p className="text-xs font-medium text-[#001e61]">
                  Experience saved for backend integration.
                </p>
              ) : (
                <p className="text-xs text-[#89968E]">
                  You can edit your experience whenever you need.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#001e61] px-6 text-xs font-semibold text-white transition hover:bg-[#001650]"
            >
              <Save size={15} strokeWidth={2} />
              Save Experience
              <ArrowRight size={15} strokeWidth={2} />
            </button>
          </div>
        </form>
      </section>

      {/* API placeholder */}
      <p className="mt-5 max-w-4xl text-[11px] leading-5 text-[#89968E]">
        Backend integration placeholder: this experience will later be
        submitted to the technician_profile API and stored in the experience
        field.
      </p>
    </div>
  );
}

export default TechnicianExperience;