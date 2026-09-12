import { useState } from "react";
import {
  MapPin,
  Wrench,
  IndianRupee,
  Save,
  ArrowRight,
} from "lucide-react";

function TechnicianDetails() {
  const [details, setDetails] = useState({
    city: "",
    address: "",
    specialization: "",
    charges: "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend API integration will be connected here later.
    console.log("Technician details:", details);

    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFBF7] px-8 pb-12 pt-28 xl:px-12">
      {/* Header */}
      <section className="mb-10">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
          My Details
        </p>

        <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[#202722] xl:text-5xl">
          Your professional details.
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#738078]">
          Add your location, expertise and service charges so renewable energy
          owners can understand your professional profile.
        </p>
      </section>

      {/* Form */}
      <section className="max-w-4xl rounded-[28px] border border-[#E4E9E1] bg-white p-6 shadow-[0_12px_40px_rgba(32,39,34,0.04)] xl:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#202722]">
            Professional information
          </h2>

          <p className="mt-1 text-sm text-[#738078]">
            Enter the details you want to provide to potential clients.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* City + Specialization */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* City */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-[#202722]">
                City
              </label>

              <div className="relative">
                <MapPin
                  size={17}
                  strokeWidth={1.8}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#001e61]"
                />

                <input
                  type="text"
                  name="city"
                  value={details.city}
                  onChange={handleChange}
                  placeholder="e.g. Ahmedabad"
                  required
                  className="h-12 w-full rounded-2xl border border-[#E4E9E1] bg-[#F7F5F0] pl-11 pr-4 text-sm text-[#202722] outline-none transition focus:border-[#001e61]"
                />
              </div>
            </div>

            {/* Specialization */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-[#202722]">
                Specialization
              </label>

              <div className="relative">
                <Wrench
                  size={17}
                  strokeWidth={1.8}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#001e61]"
                />

                <input
                  type="text"
                  name="specialization"
                  value={details.specialization}
                  onChange={handleChange}
                  placeholder="e.g. Solar Inverter Maintenance"
                  required
                  className="h-12 w-full rounded-2xl border border-[#E4E9E1] bg-[#F7F5F0] pl-11 pr-4 text-sm text-[#202722] outline-none transition focus:border-[#001e61]"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-[#202722]">
              Address
            </label>

            <textarea
              name="address"
              value={details.address}
              onChange={handleChange}
              placeholder="Enter your service or working address"
              required
              rows={4}
              className="w-full resize-none rounded-2xl border border-[#E4E9E1] bg-[#F7F5F0] px-4 py-3 text-sm leading-6 text-[#202722] outline-none transition focus:border-[#001e61]"
            />
          </div>

          {/* Charges */}
          <div className="max-w-md">
            <label className="mb-2 block text-xs font-semibold text-[#202722]">
              Charges
            </label>

            <div className="relative">
              <IndianRupee
                size={16}
                strokeWidth={1.8}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#001e61]"
              />

              <input
                type="number"
                name="charges"
                value={details.charges}
                onChange={handleChange}
                placeholder="Enter your service charges"
                min="0"
                required
                className="h-12 w-full rounded-2xl border border-[#E4E9E1] bg-[#F7F5F0] pl-11 pr-4 text-sm text-[#202722] outline-none transition focus:border-[#001e61]"
              />
            </div>
          </div>

          {/* Save */}
          <div className="flex flex-col gap-4 border-t border-[#E4E9E1] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {saved ? (
                <p className="text-xs font-medium text-[#001e61]">
                  Details saved for backend integration.
                </p>
              ) : (
                <p className="text-xs text-[#89968E]">
                  You can update these details later.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#001e61] px-6 text-xs font-semibold text-white transition hover:bg-[#001650]"
            >
              <Save size={15} strokeWidth={2} />
              Save Details
              <ArrowRight size={15} strokeWidth={2} />
            </button>
          </div>
        </form>
      </section>

      {/* API placeholder */}
      <p className="mt-5 max-w-4xl text-[11px] leading-5 text-[#89968E]">
        Backend integration placeholder: these details will later be submitted
        to the technician_profile API.
      </p>
    </div>
  );
}

export default TechnicianDetails;