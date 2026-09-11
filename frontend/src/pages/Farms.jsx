import { useState } from "react";
import {
  Plus,
  ArrowRight,
  MapPin,
  Sun,
  Wind,
  Layers3,
  X,
} from "lucide-react";

const energyTypes = [
  {
    value: "solar",
    label: "Solar",
    icon: Sun,
    description: "Solar energy farm",
  },
  {
    value: "wind",
    label: "Wind",
    icon: Wind,
    description: "Wind energy farm",
  },
  {
    value: "mixed",
    label: "Mixed",
    icon: Layers3,
    description: "Solar + wind farm",
  },
];

function Farms() {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    farmName: "",
    location: "",
    capacity: "",
    energyType: "",
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
    console.log("Farm form ready for API integration:", formData);
  };

  return (
    <div className="min-h-screen">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <section className="flex items-start justify-between gap-6 px-1 pb-10 pt-24">

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
            Renewable Operations
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#202722] sm:text-5xl">
            Your farms.
            <br />
            <span className="text-[#001e61]">
              One place.
            </span>
          </h1>

          <p className="mt-5 max-w-130 text-sm leading-6 text-[#738078]">
            Create and manage your renewable energy farms from one
            simple workspace.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="group mt-1 flex shrink-0 items-center gap-3 rounded-full bg-[#001e61] px-5 py-3.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_rgba(0,30,97,0.16)] transition hover:-translate-y-0.5"
        >
          <Plus size={16} />
          Create Farm

          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>

      </section>

      {/* =====================================================
          EMPTY FARM STATE
      ===================================================== */}

      <section className="relative min-h-117.5 overflow-hidden rounded-4xl bg-[#F0F3F9]">

        {/* Decorative circles */}
        <div className="absolute -right-24 -top-24 h-82.5 w-82.5 rounded-full border-55 border-[#E6ECF7]" />

        <div className="absolute -bottom-40 -left-25 h-90 w-90 rounded-full border-60 border-[#E6ECF7]" />

        <div className="relative z-10 flex min-h-117.5 items-center justify-center px-6 py-16 text-center">

          <div className="max-w-135">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E6ECF7] text-[#001e61]">
              <Plus
                size={27}
                strokeWidth={1.7}
              />
            </div>

            <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
              Start your workspace
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#202722] sm:text-4xl">
              Create your first farm.
            </h2>

            <p className="mx-auto mt-4 max-w-107.5 text-sm leading-6 text-[#738078]">
              Add your renewable energy farm to begin organizing
              its assets and preparing it for intelligent monitoring.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-7 inline-flex items-center gap-3 rounded-full border border-[#001e61] bg-white px-5 py-3 text-[13px] font-semibold text-[#001e61] transition hover:bg-[#001e61] hover:text-white"
            >
              <Plus size={16} />
              Add a Farm
            </button>

          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT STARTS
      ===================================================== */}

      <section className="grid gap-5 py-8 md:grid-cols-3">

        <div className="border-t border-[#E4E9E1] pt-5">
          <span className="text-[11px] font-bold text-[#001e61]">
            01
          </span>

          <h3 className="mt-3 text-lg font-semibold text-[#202722]">
            Create your farm
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#738078]">
            Add basic information about your renewable energy
            operation.
          </p>
        </div>

        <div className="border-t border-[#E4E9E1] pt-5">
          <span className="text-[11px] font-bold text-[#001e61]">
            02
          </span>

          <h3 className="mt-3 text-lg font-semibold text-[#202722]">
            Add your assets
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#738078]">
            Organize solar panels, inverters, turbines and other
            renewable assets.
          </p>
        </div>

        <div className="border-t border-[#E4E9E1] pt-5">
          <span className="text-[11px] font-bold text-[#001e61]">
            03
          </span>

          <h3 className="mt-3 text-lg font-semibold text-[#202722]">
            Start monitoring
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#738078]">
            Prepare your farm for sensor data and AI-assisted
            maintenance intelligence.
          </p>
        </div>

      </section>

      {/* =====================================================
          CREATE FARM MODAL
      ===================================================== */}

      {showForm && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#202722]/30 px-5 py-8 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-[150 overflow-y-auto rounded-[30px] bg-[#FAFBF7] p-6 shadow-2xl sm:p-8">

            {/* Modal header */}
            <div className="flex items-start justify-between">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
                  New Farm
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#202722]">
                  Create your farm
                </h2>

                <p className="mt-2 text-sm text-[#738078]">
                  Add the basic details of your renewable energy farm.
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

              {/* Farm name */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#202722]">
                  Farm Name
                </label>

                <input
                  type="text"
                  name="farmName"
                  value={formData.farmName}
                  onChange={handleChange}
                  placeholder="Enter farm name"
                  required
                  className="h-12 w-full rounded-xl border border-[#E4E9E1] bg-white px-4 text-sm text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#202722]">
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#738078]"
                  />

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter farm location"
                    className="h-12 w-full rounded-xl border border-[#E4E9E1] bg-white pl-11 pr-4 text-sm text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                  />
                </div>
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

              {/* Energy type */}
              <div>
                <label className="mb-3 block text-xs font-semibold text-[#202722]">
                  Energy Type
                </label>

                <div className="grid gap-3 sm:grid-cols-3">

                  {energyTypes.map((type) => {
                    const Icon = type.icon;
                    const selected =
                      formData.energyType === type.value;

                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() =>
                          setFormData((current) => ({
                            ...current,
                            energyType: type.value,
                          }))
                        }
                        className={`rounded-2xl border p-4 text-left transition ${
                          selected
                            ? "border-[#001e61] bg-[#E6ECF7]"
                            : "border-[#E4E9E1] bg-white hover:border-[#BFCBDD]"
                        }`}
                      >
                        <Icon
                          size={19}
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