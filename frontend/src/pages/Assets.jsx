import { useState } from "react";
import {
  Plus,
  ArrowRight,
  Cpu,
  Sun,
  Wind,
  X,
} from "lucide-react";

const assetTypes = [
  {
    value: "solar",
    label: "Solar",
    icon: Sun,
    description: "Solar panel or inverter",
  },
  {
    value: "wind",
    label: "Wind",
    icon: Wind,
    description: "Wind turbine or related asset",
  },
];

function Assets() {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    assetLabel: "",
    assetType: "",
    installationDate: "",
    capacity: "",
    location: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Backend integration will be added later.
    console.log("Asset form ready for API integration:", formData);
  };

  return (
    <div className="min-h-screen">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="flex items-start justify-between gap-6 px-1 pb-10 pt-24">

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
            Asset Management
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#202722] sm:text-5xl">
            Know every
            <br />
            <span className="text-[#001e61]">
              asset you operate.
            </span>
          </h1>

          <p className="mt-5 max-w-[520px] text-sm leading-6 text-[#738078]">
            Organize the equipment behind your renewable energy
            operations and prepare each asset for intelligent monitoring.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="group mt-1 flex shrink-0 items-center gap-3 rounded-full bg-[#001e61] px-5 py-3.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_rgba(0,30,97,0.16)] transition hover:-translate-y-0.5"
        >
          <Plus size={16} />

          Add Asset

          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>

      </section>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      <section className="relative min-h-[450px] overflow-hidden rounded-[32px] border border-[#E4E9E1] bg-white">

        <div className="absolute right-[-80px] top-[-100px] h-[300px] w-[300px] rounded-full border-[50px] border-[#E6ECF7]" />

        <div className="absolute bottom-[-150px] left-[-100px] h-[330px] w-[330px] rounded-full border-[55px] border-[#E6ECF7]" />

        <div className="relative z-10 flex min-h-[450px] items-center justify-center px-6 py-16 text-center">

          <div className="max-w-[500px]">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E6ECF7] text-[#001e61]">
              <Cpu
                size={27}
                strokeWidth={1.7}
              />
            </div>

            <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
              Asset workspace
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#202722] sm:text-4xl">
              Your assets will live here.
            </h2>

            <p className="mx-auto mt-4 max-w-[430px] text-sm leading-6 text-[#738078]">
              Add equipment from your farms to build a complete
              operational view of your renewable energy infrastructure.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-7 inline-flex items-center gap-3 rounded-full border border-[#001e61] bg-[#FAFBF7] px-5 py-3 text-[13px] font-semibold text-[#001e61] transition hover:bg-[#001e61] hover:text-white"
            >
              <Plus size={16} />
              Add your first asset
            </button>

          </div>

        </div>
      </section>

      {/* =====================================================
          ASSET TYPES
      ===================================================== */}

      <section className="grid gap-5 py-8 md:grid-cols-2">

        <div className="rounded-[24px] bg-[#F5B83D]/10 p-6">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5B83D]/20">
            <Sun
              size={20}
              className="text-[#D68B23]"
              strokeWidth={1.8}
            />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-[#202722]">
            Solar assets
          </h3>

          <p className="mt-2 max-w-[400px] text-sm leading-6 text-[#738078]">
            Track solar equipment such as panels and inverters,
            with sensor data prepared for future AI analysis.
          </p>

        </div>

        <div className="rounded-[24px] bg-[#E3F1F6] p-6">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70">
            <Wind
              size={20}
              className="text-[#2387AE]"
              strokeWidth={1.8}
            />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-[#202722]">
            Wind assets
          </h3>

          <p className="mt-2 max-w-[400px] text-sm leading-6 text-[#738078]">
            Organize turbines and related equipment for
            condition monitoring and maintenance workflows.
          </p>

        </div>

      </section>

      {/* =====================================================
          ADD ASSET MODAL
      ===================================================== */}

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#202722]/30 px-5 py-8 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-[600px] overflow-y-auto rounded-[30px] bg-[#FAFBF7] p-6 shadow-2xl sm:p-8">

            {/* Modal heading */}

            <div className="flex items-start justify-between">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
                  New Asset
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#202722]">
                  Add an asset
                </h2>

                <p className="mt-2 text-sm text-[#738078]">
                  Add the basic information about your renewable asset.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F3F9] text-[#738078] transition hover:bg-[#E6ECF7] hover:text-[#001e61]"
                aria-label="Close"
              >
                <X size={17} />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >

              {/* Asset label */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#202722]">
                  Asset Label
                </label>

                <input
                  type="text"
                  name="assetLabel"
                  value={formData.assetLabel}
                  onChange={handleChange}
                  placeholder="e.g. Inverter A-01"
                  required
                  className="h-12 w-full rounded-xl border border-[#E4E9E1] bg-white px-4 text-sm text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                />
              </div>

              {/* Asset type */}

              <div>
                <label className="mb-3 block text-xs font-semibold text-[#202722]">
                  Asset Type
                </label>

                <div className="grid gap-3 sm:grid-cols-2">

                  {assetTypes.map((type) => {
                    const Icon = type.icon;
                    const selected =
                      formData.assetType === type.value;

                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() =>
                          setFormData((current) => ({
                            ...current,
                            assetType: type.value,
                          }))
                        }
                        className={`rounded-2xl border p-4 text-left transition ${
                          selected
                            ? "border-[#001e61] bg-[#E6ECF7]"
                            : "border-[#E4E9E1] bg-white hover:border-[#BFCBDD]"
                        }`}
                      >
                        <Icon
                          size={20}
                          strokeWidth={1.8}
                          className={
                            selected
                              ? "text-[#001e61]"
                              : "text-[#738078]"
                          }
                        />

                        <p className="mt-3 text-sm font-semibold text-[#202722]">
                          {type.label}
                        </p>

                        <p className="mt-1 text-[10px] leading-4 text-[#89968E]">
                          {type.description}
                        </p>
                      </button>
                    );
                  })}

                </div>
              </div>

              {/* Installation date */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#202722]">
                  Installation Date
                </label>

                <input
                  type="date"
                  name="installationDate"
                  value={formData.installationDate}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-[#E4E9E1] bg-white px-4 text-sm text-[#202722] outline-none transition focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                />
              </div>

              {/* Capacity */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#202722]">
                  Capacity
                </label>

                <div className="flex">
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Enter capacity"
                    min="0"
                    step="0.01"
                    className="h-12 w-full rounded-l-xl border border-[#E4E9E1] bg-white px-4 text-sm text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                  />

                  <div className="flex h-12 items-center rounded-r-xl border border-l-0 border-[#E4E9E1] bg-[#F0F3F9] px-4 text-xs font-semibold text-[#738078]">
                    MW
                  </div>
                </div>
              </div>

              {/* Location */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#202722]">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter asset location"
                  className="h-12 w-full rounded-xl border border-[#E4E9E1] bg-white px-4 text-sm text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                />
              </div>

              {/* Actions */}

              <div className="flex justify-end gap-3 border-t border-[#E4E9E1] pt-6">

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-full px-5 py-3 text-[13px] font-semibold text-[#738078] transition hover:bg-[#F0F3F9]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-full bg-[#001e61] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[#001e61]/90"
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