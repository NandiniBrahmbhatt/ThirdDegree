import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ChevronDown,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Wrench,
  X,
} from "lucide-react";
import { apiRequest } from "../services/api";

const specializationOptions = [
  "તમામ વિશેષતાઓ",
  "સોલાર",
  "વિન્ડ",
  "ઇલેક્ટ્રિકલ",
  "મિકેનિકલ",
];

function TechnicianCard({ technician, onViewProfile }) {
    return ( 
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6"> 
        <div className="flex items-start gap-4"> 
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#001e61] text-sm font-bold text-white shadow-sm"> 
            {technician.initials} 
        </div> 
    
        <div className="min-w-0"> 
            <div className="flex items-center gap-2"> 
            <h3 className="truncate text-base font-bold text-slate-900"> 
                {technician.name} 
            </h3> 
    
            <ShieldCheck 
                size={17} 
                className="shrink-0 text-emerald-500" 
            /> 
            </div> 
    
            <p className="mt-1 text-xs font-medium text-slate-500"> 
            નવીનીકરણીય ઊર્જા ટેકનિશિયન 
            </p> 
        </div> 
        </div> 
    
        <div className="mt-5 space-y-3"> 
        <div className="flex items-center gap-2.5 text-sm text-slate-600"> 
            <MapPin size={16} className="shrink-0 text-slate-400" /> 
            <span>{technician.city || "સ્થાન દર્શાવેલ નથી"}</span> 
        </div> 
    
        <div className="flex items-center gap-2.5 text-sm text-slate-600"> 
            <BriefcaseBusiness 
            size={16} 
            className="shrink-0 text-slate-400" 
            /> 
            <span> 
            {technician.experience || "અનુભવ દર્શાવેલ નથી"} 
            </span> 
        </div> 
        </div> 
    
        {technician.specializations.length > 0 && ( 
        <div className="mt-5 flex flex-wrap gap-2"> 
            {technician.specializations.map((item) => ( 
            <span 
                key={item} 
                className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-semibold text-slate-600" 
            > 
                {item} 
            </span> 
            ))} 
        </div> 
        )} 
    
        {technician.charges !== null && ( 
        <p className="mt-4 text-sm font-semibold text-slate-700"> 
            ₹{technician.charges} સેવા શુલ્ક 
        </p> 
        )} 
    
        <button 
        type="button" 
        onClick={() => onViewProfile(technician)} 
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#001e61] transition hover:border-[#001e61] hover:bg-slate-50" 
        > 
        પ્રોફાઇલ જુઓ 
        </button> 
    </article> 
    );
}

function TechnicianProfile({ technician, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-[#001e61] p-6 text-white sm:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="પ્રોફાઇલ બંધ કરો"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-lg font-bold text-[#001e61] shadow-lg">
              {technician.initials}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {technician.name}
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                Renewable Energy Technician
              </p>

              {technician.city && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-300">
                  <MapPin size={13} />
                  {technician.city}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <section>
            <div className="mb-3 flex items-center gap-2">
              <BriefcaseBusiness
                size={18}
                className="text-emerald-600"
              />

              <h3 className="font-bold text-slate-900">
                Experience
              </h3>
            </div>

            <p className="text-sm leading-6 text-slate-600">
              {technician.experience ||
                "અનુભરની વિગતો આપવામાં આવી નથી."}
            </p>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <Wrench
                size={18}
                className="text-emerald-600"
              />

              <h3 className="font-bold text-slate-900">
                Specialization
              </h3>
            </div>

            {technician.specializations.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {technician.specializations.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No specialization provided.
              </p>
            )}
          </section>

          {technician.address && (
            <section>
              <div className="mb-3 flex items-center gap-2">
                <MapPin
                  size={18}
                  className="text-emerald-600"
                />

                <h3 className="font-bold text-slate-900">
                  Service Address
                </h3>
              </div>

              <p className="text-sm leading-6 text-slate-600">
                {technician.address}
              </p>
            </section>
          )}

          {technician.charges !== null && (
            <section>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Service Charges
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                ₹{technician.charges}
              </p>
            </section>
          )}

          <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
              Contact Technician
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Contact this technician directly for maintenance
              assistance.
            </p>

            {technician.phone ? (
              <a
                href={`tel:${technician.phone}`}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 sm:w-auto"
              >
                <Phone size={17} />
                {technician.phone}
              </a>
            ) : (
              <p className="mt-4 text-sm font-semibold text-slate-500">
                Phone number not provided.
              </p>
            )}
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
    "તમામ વિશેષતાઓ"
  );

  const [technicians, setTechnicians] = useState([]);
  const [selectedTechnician, setSelectedTechnician] =
    useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTechnicians = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();

        if (searchQuery.trim()) {
          params.set("search", searchQuery.trim());
        }

        if (locationQuery.trim()) {
          params.set("city", locationQuery.trim());
        }

        if (specialization !== "તમામ વિશેષતાઓ") {
          params.set("specialization", specialization);
        }

        const queryString = params.toString();

        const endpoint = queryString
          ? `/technicians/directory?${queryString}`
          : "/technicians/directory";

        const data = await apiRequest(endpoint, {
          cache: "no-store",
        });

        const formatted = data.map((technician) => ({
          ...technician,
          specializations:
            technician.specializations || [],
          initials: technician.name
            ? technician.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
            : "T",
        }));

        setTechnicians(formatted);
      } catch (err) {
        console.error(
          "ટેક્નિશિયન્સ લોડ કરવામાં નિષ્ફળ:",
          err
        );

        setTechnicians([]);
        setError(
          "ટેક્નિશિયન્સ લોડ થઈ શક્યા નથી. કૃપા કરીને ફરી પ્રયાસ કરો."
        );
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(loadTechnicians, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery, locationQuery, specialization]);

  const filteredTechnicians = useMemo(() => {
    return technicians;
  }, [technicians]);

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
              Search for technicians by name, city, skill, or
              specialization.
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
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
                  placeholder="નામ અથવા કુશળતા દ્વારા શોધો..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>

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
                  placeholder="શહેર શોધો..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>

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

        {/* Results */}
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

            {!loading && !error && (
              <p className="text-xs text-slate-500">
                {filteredTechnicians.length} technician
                {filteredTechnicians.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>
            )}
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center">
              <p className="text-sm text-slate-500">
                Searching technicians...
              </p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
              <h3 className="font-bold text-red-700">
                Unable to load technicians
              </h3>

              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>
            </div>
          ) : filteredTechnicians.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredTechnicians.map((technician) => (
                <TechnicianCard
                  key={technician.technician_id}
                  technician={technician}
                  onViewProfile={setSelectedTechnician}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Search
                  size={24}
                  className="text-slate-400"
                />
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                No technicians found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try a different name, city, skill, or
                specialization.
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
                Search the technician directory to find
                professionals with the expertise you need.
              </p>
            </div>
          </div>
        </section>
      </div>

      {selectedTechnician && (
        <TechnicianProfile
          technician={selectedTechnician}
          onClose={() => setSelectedTechnician(null)}
        />
      )}
    </div>
  );
}