import { useState } from "react";
import { Building2, MapPin, Plus, X } from "lucide-react";

function Farms() {
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    farmName: "",
    location: "",
    capacity: "",
    energyType: "solar",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Backend integration will be added later.
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFBF7] px-8 pb-12 pt-28 text-[#202722] xl:px-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
            Renewable workspace
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em]">
            Farms
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#738078]">
            Create and manage renewable energy farms connected to your
            workspace.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#001e61] px-5 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#00184f]"
        >
          <Plus size={17} strokeWidth={1.9} />
          Create Farm
        </button>
      </div>

      <div className="mt-10 flex min-h-[430px] items-center justify-center rounded-3xl border border-[#E4E9E1] bg-white px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8EDF7] text-[#001e61]">
            <Building2 size={25} strokeWidth={1.7} />
          </div>

          <h2 className="mt-5 text-xl font-semibold tracking-[-0.025em]">
            No farms yet
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#738078]">
            Create your first farm to start organising renewable assets and
            preparing them for AI-assisted monitoring.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-full border border-[#001e61] px-5 text-[12px] font-semibold text-[#001e61] transition hover:bg-[#E8EDF7]"
          >
            <Plus size={15} strokeWidth={1.9} />
            Add a farm
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#001e61]/20 px-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-[#E4E9E1] bg-white p-7 shadow-[0_24px_70px_rgba(0,30,97,0.16)]">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
                  New farm
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                  Create Farm
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#738078]">
                  Add the basic details of your renewable energy farm.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#738078] transition hover:bg-[#F0F3F9] hover:text-[#001e61]"
                aria-label="Close"
              >
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="farmName"
                  className="mb-2 block text-[11px] font-semibold"
                >
                  Farm name
                </label>

                <input
                  id="farmName"
                  name="farmName"
                  value={form.farmName}
                  onChange={handleChange}
                  placeholder="e.g. Sunrise Energy Farm"
                  className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-[#FAFBF7] px-4 text-sm outline-none transition focus:border-[#001e61]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-[11px] font-semibold"
                >
                  Location
                </label>

                <div className="flex h-11 items-center gap-3 rounded-xl border border-[#E4E9E1] bg-[#FAFBF7] px-4 focus-within:border-[#001e61]">
                  <MapPin
                    size={16}
                    strokeWidth={1.8}
                    className="text-[#738078]"
                  />

                  <input
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City or site location"
                    className="w-full bg-transparent text-sm outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="capacity"
                    className="mb-2 block text-[11px] font-semibold"
                  >
                    Capacity
                  </label>

                  <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="0"
                    value={form.capacity}
                    onChange={handleChange}
                    placeholder="Capacity in MW"
                    className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-[#FAFBF7] px-4 text-sm outline-none transition focus:border-[#001e61]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="energyType"
                    className="mb-2 block text-[11px] font-semibold"
                  >
                    Energy type
                  </label>

                  <select
                    id="energyType"
                    name="energyType"
                    value={form.energyType}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-[#FAFBF7] px-4 text-sm outline-none transition focus:border-[#001e61]"
                  >
                    <option value="solar">Solar</option>
                    <option value="wind">Wind</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="h-11 rounded-full border border-[#E4E9E1] px-5 text-[12px] font-semibold text-[#738078] transition hover:bg-[#F0F3F9]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-11 rounded-full bg-[#001e61] px-6 text-[12px] font-semibold text-white transition hover:bg-[#00184f]"
                >
                  Create Farm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Farms;