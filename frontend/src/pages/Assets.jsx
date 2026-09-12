import { useState } from "react";
import { Cpu, Plus, X } from "lucide-react";

function Assets() {
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    assetLabel: "",
    assetType: "solar",
    installationDate: "",
    capacity: "",
    location: "",
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
            Renewable infrastructure
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em]">
            Assets
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#738078]">
            Add and manage the solar and wind assets connected to your farms.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#001e61] px-5 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#00184f]"
        >
          <Plus size={17} strokeWidth={1.9} />
          Add Asset
        </button>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#E4E9E1] bg-white p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8EDF7] text-[#001e61]">
              <Cpu size={20} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#89968E]">
                Solar
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Solar Assets
              </h2>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-[#E4E9E1] px-5 py-8 text-center">
            <p className="text-sm font-medium text-[#202722]">
              No solar assets
            </p>

            <p className="mt-2 text-xs leading-5 text-[#738078]">
              Add an asset to prepare it for monitoring and AI-assisted
              analysis.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-[#E4E9E1] bg-white p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E3F1F6] text-[#2387AE]">
              <Cpu size={20} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#89968E]">
                Wind
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Wind Assets
              </h2>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-[#E4E9E1] px-5 py-8 text-center">
            <p className="text-sm font-medium text-[#202722]">
              No wind assets
            </p>

            <p className="mt-2 text-xs leading-5 text-[#738078]">
              Add an asset to prepare it for monitoring and AI-assisted
              analysis.
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#001e61]/20 px-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-[#E4E9E1] bg-white p-7 shadow-[0_24px_70px_rgba(0,30,97,0.16)]">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
                  New asset
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                  Add Asset
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#738078]">
                  Add the basic details of a renewable energy asset.
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
                  htmlFor="assetLabel"
                  className="mb-2 block text-[11px] font-semibold"
                >
                  Asset label
                </label>

                <input
                  id="assetLabel"
                  name="assetLabel"
                  value={form.assetLabel}
                  onChange={handleChange}
                  placeholder="e.g. Inverter A-01"
                  className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-[#FAFBF7] px-4 text-sm outline-none transition focus:border-[#001e61]"
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="assetType"
                    className="mb-2 block text-[11px] font-semibold"
                  >
                    Asset type
                  </label>

                  <select
                    id="assetType"
                    name="assetType"
                    value={form.assetType}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-[#FAFBF7] px-4 text-sm outline-none transition focus:border-[#001e61]"
                  >
                    <option value="solar">Solar</option>
                    <option value="wind">Wind</option>
                  </select>
                </div>

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
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="installationDate"
                    className="mb-2 block text-[11px] font-semibold"
                  >
                    Installation date
                  </label>

                  <input
                    id="installationDate"
                    name="installationDate"
                    type="date"
                    value={form.installationDate}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-[#FAFBF7] px-4 text-sm outline-none transition focus:border-[#001e61]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="mb-2 block text-[11px] font-semibold"
                  >
                    Location
                  </label>

                  <input
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Asset location"
                    className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-[#FAFBF7] px-4 text-sm outline-none transition focus:border-[#001e61]"
                  />
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
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assets;