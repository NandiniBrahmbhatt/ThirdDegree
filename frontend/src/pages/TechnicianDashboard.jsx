import { useEffect, useState } from "react";
import {
  MapPin,
  Wrench,
  IndianRupee,
  ArrowRight,
  Save,
} from "lucide-react";
import { apiRequest } from "../services/api";

function TechnicianDashboard() {
  const [formData, setFormData] = useState({
    city: "",
    address: "",
    specialization: "",
    charges: "",
    experience: "",
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await apiRequest("/technicians/profile", {
          cache: "no-store",
        });

        setFormData({
          city: profile.city || "",
          address: profile.address || "",
          specialization: profile.specialization || "",
          charges:
            profile.charges !== null && profile.charges !== undefined
              ? String(profile.charges)
              : "",
          experience: profile.experience || "",
        });
      } catch (err) {
        console.error("Failed to load technician profile:", err);
        setError("Unable to load your saved profile details.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setSaved(false);
    setError("");

    try {
      await apiRequest("/technicians/profile", {
        method: "PUT",
        body: JSON.stringify({
          city: formData.city,
          address: formData.address,
          specialization: formData.specialization,
          charges:
            formData.charges === "" ? null : Number(formData.charges),
          experience: formData.experience,
        }),
      });

      setSaved(true);
    } catch (err) {
      console.error("Failed to save technician profile:", err);
      setError("Unable to save your profile details. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBF7] px-8 pb-12 pt-28 xl:px-12">
      <section className="mb-10">
        <div className="max-w-3xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
            Technician Profile
          </p>

          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[#202722] xl:text-5xl">
            Tell us about your expertise.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#738078]">
            Complete your technician profile so renewable energy owners can
            understand your experience and technical expertise.
          </p>
        </div>
      </section>

      <section className="max-w-4xl rounded-[28px] border border-[#E4E9E1] bg-white p-6 shadow-[0_12px_40px_rgba(32,39,34,0.04)] xl:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#202722]">
            Professional details
          </h2>

          <p className="mt-1 text-sm text-[#738078]">
            Add the information that will be used to match you with suitable
            maintenance requirements.
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-[#738078]">
            Loading your saved profile...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid gap-6 md:grid-cols-2">
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
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Ahmedabad"
                    required
                    className="h-12 w-full rounded-2xl border border-[#E4E9E1] bg-[#F7F5F0] pl-11 pr-4 text-sm text-[#202722] outline-none transition focus:border-[#001e61]"
                  />
                </div>
              </div>

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
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="e.g. Solar Inverter Maintenance"
                    required
                    className="h-12 w-full rounded-2xl border border-[#E4E9E1] bg-[#F7F5F0] pl-11 pr-4 text-sm text-[#202722] outline-none transition focus:border-[#001e61]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-[#202722]">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your working or service address"
                required
                rows={3}
                className="w-full resize-none rounded-2xl border border-[#E4E9E1] bg-[#F7F5F0] px-4 py-3 text-sm leading-6 text-[#202722] outline-none transition focus:border-[#001e61]"
              />
            </div>

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
                  value={formData.charges}
                  onChange={handleChange}
                  placeholder="Enter your service charges"
                  min="0"
                  required
                  className="h-12 w-full rounded-2xl border border-[#E4E9E1] bg-[#F7F5F0] pl-11 pr-4 text-sm text-[#202722] outline-none transition focus:border-[#001e61]"
                />
              </div>
            </div>

            <div className="border-t border-[#E4E9E1] pt-7">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#202722]">
                  Your experience
                </h3>

                <p className="mt-1 text-sm text-[#738078]">
                  Describe your practical experience, previous work, and areas
                  you are comfortable handling.
                </p>
              </div>

              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Example: I have 3 years of experience working with solar PV systems, inverter inspection, electrical troubleshooting and routine maintenance."
                required
                rows={7}
                className="w-full resize-none rounded-2xl border border-[#E4E9E1] bg-[#F7F5F0] px-4 py-4 text-sm leading-6 text-[#202722] outline-none transition focus:border-[#001e61]"
              />
            </div>

            <div className="flex flex-col gap-4 border-t border-[#E4E9E1] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {saved ? (
                  <p className="text-xs font-medium text-[#001e61]">
                    Data Saved!
                  </p>
                ) : error ? (
                  <p className="text-xs font-medium text-red-600">
                    {error}
                  </p>
                ) : (
                  <p className="text-xs text-[#89968E]">
                    You can update your details anytime from this page.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={saving}
                className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#001e61] px-6 text-xs font-semibold text-white transition hover:bg-[#001650] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={15} strokeWidth={2} />
                {saving ? "Saving..." : "Save Profile"}
                <ArrowRight size={15} strokeWidth={2} />
              </button>
            </div>
          </form>
        )}
      </section>

      <p className="mt-5 max-w-4xl text-[11px] leading-5 text-[#89968E]">
        You can update your professional details anytime from this page.
      </p>
    </div>
  );
}

export default TechnicianDashboard;