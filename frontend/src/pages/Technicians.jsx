import { useState } from "react";
import {
  Users,
  Search,
  SlidersHorizontal,
  MapPin,
  Wrench,
  BriefcaseBusiness,
  IndianRupee,
  X,
  ArrowRight,
} from "lucide-react";

const specializationOptions = [
  "Solar",
  "Wind",
  "Electrical",
  "Mechanical",
  "Inverter",
];

function Technicians() {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    city: "",
    specialization: "",
    maxCharges: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      city: "",
      specialization: "",
      maxCharges: "",
    });
  };

  return (
    <div className="min-h-screen px-8 pb-12 pt-28 xl:px-12">

      {/* Header */}
      <section className="border-b border-[#E4E9E1] pb-9">

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
              Technician Network
            </p>

            <h1 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#202722] sm:text-5xl">
              The right person
              <br />
              <span className="text-[#001e61]">
                for the right repair.
              </span>
            </h1>

            <p className="mt-5 max-w-120 text-sm leading-6 text-[#738078]">
              Find maintenance professionals based on location,
              specialization, experience, and charges.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 self-start lg:self-auto">

            <button
              onClick={() => setShowFilters(true)}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#E4E9E1] bg-white px-4 py-3 text-[12px] font-semibold text-[#202722] transition hover:border-[#001e61] hover:text-[#001e61]"
            >
              <SlidersHorizontal
                size={16}
                strokeWidth={1.8}
              />
              Filters
            </button>

          </div>

        </div>

      </section>

      {/* Search */}
      <section className="py-7">

        <div className="flex w-full items-center gap-3 rounded-2xl border border-[#E4E9E1] bg-white px-4 py-3.5 transition focus-within:border-[#001e61] focus-within:ring-2 focus-within:ring-[#E6ECF7]">

          <Search
            size={18}
            strokeWidth={1.8}
            className="shrink-0 text-[#738078]"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, city, or specialization..."
            className="w-full bg-transparent text-sm text-[#202722] outline-none placeholder:text-[#89968E]"
          />

        </div>

      </section>

      {/* Empty directory */}
      <section className="relative overflow-hidden rounded-[32px] border border-[#E4E9E1] bg-[#F0F3F9]">

        <div className="pointer-events-none absolute -right-24 -top-24 h-[330px] w-[330px] rounded-full border-[55px] border-[#E6ECF7]" />

        <div className="pointer-events-none absolute -bottom-40 -left-24 h-[360px] w-[360px] rounded-full border-[60px] border-[#E6ECF7]" />

        <div className="relative z-10 flex min-h-[410px] items-center justify-center px-6 py-16 text-center">

          <div className="max-w-120">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E6ECF7] text-[#001e61]">
              <Users
                size={27}
                strokeWidth={1.6}
              />
            </div>

            <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
              Technician directory
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#202722] sm:text-4xl">
              No technicians connected yet.
            </h2>

            <p className="mx-auto mt-4 max-w-120 text-sm leading-6 text-[#738078]">
              Technician profiles will appear here once the technician
              network is connected to the backend.
            </p>

          </div>
        </div>
      </section>

      {/* Matching factors */}
      <section className="grid gap-6 py-10 md:grid-cols-3">

        <div className="border-t border-[#E4E9E1] pt-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6ECF7] text-[#001e61]">
            <MapPin
              size={18}
              strokeWidth={1.7}
            />
          </div>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#001e61]">
            01
          </p>

          <h3 className="mt-2 text-lg font-semibold text-[#202722]">
            Location
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#738078]">
            Find technicians who can conveniently reach the farm or
            asset requiring attention.
          </p>
        </div>

        <div className="border-t border-[#E4E9E1] pt-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3F1F6] text-[#2387AE]">
            <Wrench
              size={18}
              strokeWidth={1.7}
            />
          </div>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#001e61]">
            02
          </p>

          <h3 className="mt-2 text-lg font-semibold text-[#202722]">
            Specialization
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#738078]">
            Match the maintenance requirement with the technician's
            relevant technical expertise.
          </p>
        </div>

        <div className="border-t border-[#E4E9E1] pt-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5B83D]/15 text-[#D68B23]">
            <BriefcaseBusiness
              size={18}
              strokeWidth={1.7}
            />
          </div>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#001e61]">
            03
          </p>

          <h3 className="mt-2 text-lg font-semibold text-[#202722]">
            Experience & charges
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#738078]">
            Compare technician experience and expected charges when
            selecting the right person for the job.
          </p>
        </div>

      </section>

      {/* Filters modal */}
      {showFilters && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#202722]/30 px-5 py-8 backdrop-blur-sm">

          <div className="w-full max-w-150 rounded-[30px] bg-[#FAFBF7] p-6 shadow-2xl sm:p-8">

            {/* Modal header */}
            <div className="flex items-start justify-between gap-6">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
                  Directory filters
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#202722]">
                  Find the right match
                </h2>

                <p className="mt-3 max-w-120 text-sm leading-6 text-[#738078]">
                  Narrow the technician directory using the information
                  available in technician profiles.
                </p>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0F3F9] text-[#738078] transition hover:bg-[#E6ECF7] hover:text-[#001e61]"
                aria-label="Close"
              >
                <X
                  size={17}
                  strokeWidth={1.8}
                />
              </button>

            </div>

            {/* Fields */}
            <div className="mt-8 space-y-6">

              {/* City */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#202722]">
                  City
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    strokeWidth={1.8}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#738078]"
                  />

                  <input
                    type="text"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    placeholder="Example: Ahmedabad"
                    className="h-12 w-full rounded-xl border border-[#E4E9E1] bg-white pl-11 pr-4 text-sm text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                  />
                </div>
              </div>

              {/* Specialization */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#202722]">
                  Specialization
                </label>

                <select
                  name="specialization"
                  value={filters.specialization}
                  onChange={handleFilterChange}
                  className="h-12 w-full rounded-xl border border-[#E4E9E1] bg-white px-4 text-sm text-[#202722] outline-none transition focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                >
                  <option value="">
                    Any specialization
                  </option>

                  {specializationOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Charges */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#202722]">
                  Maximum Charges
                </label>

                <div className="relative">
                  <IndianRupee
                    size={16}
                    strokeWidth={1.8}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#738078]"
                  />

                  <input
                    type="number"
                    name="maxCharges"
                    value={filters.maxCharges}
                    onChange={handleFilterChange}
                    min="0"
                    placeholder="Enter maximum charges"
                    className="h-12 w-full rounded-xl border border-[#E4E9E1] bg-white pl-10 pr-4 text-sm text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                  />
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#E4E9E1] pt-6">

              <button
                onClick={clearFilters}
                className="rounded-full px-5 py-3 text-[13px] font-semibold text-[#738078] transition hover:bg-[#F0F3F9]"
              >
                Clear filters
              </button>

              <button
                onClick={() => setShowFilters(false)}
                className="group inline-flex items-center gap-3 rounded-full bg-[#001e61] px-5 py-3 text-[13px] font-semibold text-white transition hover:bg-[#001e61]/90"
              >
                Apply filters

                <ArrowRight
                  size={15}
                  strokeWidth={1.8}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Technicians;