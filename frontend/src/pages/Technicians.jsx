import { useMemo, useState } from "react";
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronDown,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Wrench,
  X,
} from "lucide-react";

const technicians = [
  {
    id: 1,
    name: "Rahul Patel",
    location: "Surat, Gujarat",
    experience: "5+ years",
    rating: "4.9",
    reviews: 42,
    specializations: ["Solar", "Wind", "Electrical"],
    availability: "Available",
    bio: "Experienced renewable energy technician specializing in preventive maintenance and electrical diagnostics.",
    phone: "+91 98765 43210",
    initials: "RP",
  },
  {
    id: 2,
    name: "Aarav Shah",
    location: "Ahmedabad, Gujarat",
    experience: "7+ years",
    rating: "4.8",
    reviews: 58,
    specializations: ["Solar", "Electrical"],
    availability: "Available",
    bio: "Solar maintenance specialist with experience in inverter diagnostics, panel inspection, and electrical systems.",
    phone: "+91 98250 12345",
    initials: "AS",
  },
  {
    id: 3,
    name: "Vikram Desai",
    location: "Vadodara, Gujarat",
    experience: "8+ years",
    rating: "4.9",
    reviews: 67,
    specializations: ["Wind", "Mechanical"],
    availability: "Busy",
    bio: "Wind turbine maintenance professional focused on mechanical systems, vibration analysis, and preventive servicing.",
    phone: "+91 98980 56789",
    initials: "VD",
  },
  {
    id: 4,
    name: "Meera Joshi",
    location: "Rajkot, Gujarat",
    experience: "4+ years",
    rating: "4.7",
    reviews: 31,
    specializations: ["Solar", "Electrical"],
    availability: "Available",
    bio: "Renewable energy technician specializing in solar systems, electrical troubleshooting, and routine inspections.",
    phone: "+91 97654 32109",
    initials: "MJ",
  },
];

const specializationOptions = [
  "All Specializations",
  "Solar",
  "Wind",
  "Electrical",
  "Mechanical",
];

function TechnicianCard({ technician, onViewProfile }) {
  const isAvailable = technician.availability === "Available";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#001e61] text-sm font-bold text-white shadow-sm">
            {technician.initials}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-bold text-slate-900">
                {technician.name}
              </h3>

              <BadgeCheck
                size={17}
                className="shrink-0 text-emerald-500"
              />
            </div>

            <p className="mt-1 text-xs font-medium text-slate-500">
              Renewable Energy Technician
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
            isAvailable
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {technician.availability}
        </span>
      </div>

      {/* Details */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2.5 text-sm text-slate-600">
          <MapPin size={16} className="shrink-0 text-slate-400" />
          <span>{technician.location}</span>
        </div>

        <div className="flex items-center gap-2.5 text-sm text-slate-600">
          <BriefcaseBusiness
            size={16}
            className="shrink-0 text-slate-400"
          />
          <span>{technician.experience} experience</span>
        </div>

        <div className="flex items-center gap-2.5 text-sm text-slate-600">
          <Star
            size={16}
            className="shrink-0 fill-amber-400 text-amber-400"
          />
          <span>
            <strong className="text-slate-800">
              {technician.rating}
            </strong>{" "}
            ({technician.reviews} reviews)
          </span>
        </div>
      </div>

      {/* Specializations */}
      <div className="mt-5 flex flex-wrap gap-2">
        {technician.specializations.map((specialization) => (
          <span
            key={specialization}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-semibold text-slate-600"
          >
            {specialization}
          </span>
        ))}
      </div>

      {/* Action */}
      <button
        type="button"
        onClick={() => onViewProfile(technician)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#001e61] transition hover:border-[#001e61] hover:bg-slate-50"
      >
        View Profile
      </button>
    </article>
  );
}

function TechnicianProfile({ technician, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Profile Header */}
        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-[#001e61] p-6 text-white sm:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close profile"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-lg font-bold text-[#001e61] shadow-lg">
              {technician.initials}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold">
                  {technician.name}
                </h2>

                <BadgeCheck
                  size={20}
                  className="text-emerald-300"
                />
              </div>

              <p className="mt-1 text-sm text-slate-300">
                Verified Renewable Energy Technician
              </p>

              <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} />
                  {technician.location}
                </span>

                <span className="flex items-center gap-1.5">
                  <Star
                    size={13}
                    className="fill-amber-400 text-amber-400"
                  />
                  {technician.rating}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Body */}
        <div className="space-y-6 p-6 sm:p-8">
          {/* About */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-600" />
              <h3 className="font-bold text-slate-900">
                About
              </h3>
            </div>

            <p className="text-sm leading-6 text-slate-600">
              {technician.bio}
            </p>
          </section>

          {/* Experience */}
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <BriefcaseBusiness size={17} />
                <span className="text-xs font-semibold">
                  Experience
                </span>
              </div>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {technician.experience}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Award size={17} />
                <span className="text-xs font-semibold">
                  Rating
                </span>
              </div>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {technician.rating}
                <span className="ml-1 text-xs font-medium text-slate-400">
                  / 5
                </span>
              </p>
            </div>
          </section>

          {/* Specializations */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Wrench size={18} className="text-emerald-600" />
              <h3 className="font-bold text-slate-900">
                Specializations
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {technician.specializations.map((specialization) => (
                <span
                  key={specialization}
                  className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700"
                >
                  {specialization}
                </span>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
              Contact Technician
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Contact this technician directly for maintenance
              assistance.
            </p>

            <a
              href={`tel:${technician.phone}`}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 sm:w-auto"
            >
              <Phone size={17} />
              Contact Technician
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function Technicians() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [specialization, setSpecialization] = useState(
    "All Specializations"
  );
  const [selectedTechnician, setSelectedTechnician] = useState(null);

  const filteredTechnicians = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();
    const location = locationQuery.trim().toLowerCase();

    return technicians.filter((technician) => {
      const matchesSearch =
        !search ||
        technician.name.toLowerCase().includes(search) ||
        technician.specializations.some((item) =>
          item.toLowerCase().includes(search)
        );

      const matchesLocation =
        !location ||
        technician.location.toLowerCase().includes(location);

      const matchesSpecialization =
        specialization === "All Specializations" ||
        technician.specializations.includes(specialization);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSpecialization
      );
    });
  }, [searchQuery, locationQuery, specialization]);

  return (
    <div className="min-h-full bg-[#FAFBF7] px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-[#001e61] p-6 text-white shadow-xl sm:p-8">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-emerald-300">
              <Wrench size={18} />
              <span className="text-xs font-bold uppercase tracking-[0.15em]">
                Maintenance Network
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Find a Technician
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              Connect with qualified technicians who can help
              maintain your renewable energy assets.
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
            {/* Search */}
            <div>
              <label
                htmlFor="technician-search"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400"
              >
                Search
              </label>

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="technician-search"
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search by name or skill..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="technician-location"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400"
              >
                Location
              </label>

              <div className="relative">
                <MapPin
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="technician-location"
                  type="text"
                  value={locationQuery}
                  onChange={(event) =>
                    setLocationQuery(event.target.value)
                  }
                  placeholder="Search city..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            {/* Specialization */}
            <div>
              <label
                htmlFor="specialization"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400"
              >
                Specialization
              </label>

              <div className="relative">
                <select
                  id="specialization"
                  value={specialization}
                  onChange={(event) =>
                    setSpecialization(event.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-11 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                >
                  {specializationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results heading */}
        <section>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                Technician Directory
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Available Professionals
              </h2>
            </div>

            <p className="text-xs text-slate-500">
              {filteredTechnicians.length} technician
              {filteredTechnicians.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {filteredTechnicians.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredTechnicians.map((technician) => (
                <TechnicianCard
                  key={technician.id}
                  technician={technician}
                  onViewProfile={setSelectedTechnician}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Search size={24} className="text-slate-400" />
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                No technicians found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try a different name, city, or specialization.
              </p>
            </div>
          )}
        </section>

        {/* Trust section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck size={23} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Connect with trusted professionals
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Technician profiles help you find the right
                expertise for solar, wind, electrical, and
                mechanical maintenance.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Profile Modal */}
      {selectedTechnician && (
        <TechnicianProfile
          technician={selectedTechnician}
          onClose={() => setSelectedTechnician(null)}
        />
      )}
    </div>
  );
}