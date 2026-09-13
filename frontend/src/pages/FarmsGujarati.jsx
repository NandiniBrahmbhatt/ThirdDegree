import { useEffect, useState } from "react";
import { Building2, MapPin, Plus, X } from "lucide-react";
import { apiRequest } from "../services/api";

function FarmsGujarati() {
  const [showModal, setShowModal] = useState(false);
  const [farms, setFarms] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const [form, setForm] = useState({
    farmName: "",
    location: "",
    capacity: "",
    energyType: "solar",
  });

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await apiRequest("/farms/");

      setFarms(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("ફાર્મ્સ લોડ કરવામાં અસમર્થ:", error);
      setError("તમારા ફાર્મ્સ લોડ કરી શકાયા નથી. કૃપા કરીને રિફ્રેશ કરીને ફરી પ્રયાસ કરો.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.farmName || !form.location || !form.capacity) {
      setError("કૃપા કરીને તમામ જરૂરી વિગતો પૂર્ણ કરો.");
      return;
    }

    setIsCreating(true);
    setError("");

    try {
      const response = await apiRequest("/farms/", {
        method: "POST",
        body: JSON.stringify({
          farm_name: form.farmName,
          location: form.location,
          capacity: Number(form.capacity),
          energy_type: form.energyType,
        }),
      });

      setFarms((current) => [response, ...current]);

      setForm({
        farmName: "",
        location: "",
        capacity: "",
        energyType: "solar",
      });

      setShowModal(false);
    } catch (error) {
      console.error("ફાર્મ બનાવવામાં નિષ્ફળતા:", error);
      setError("ફાર્મ બનાવી શકાયું નથી. કૃપા કરીને ફરી પ્રયાસ કરો.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBF7] px-8 pb-12 pt-28 text-[#202722] xl:px-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
            નવીનીકરણીય કાર્યસ્થળ
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em]">
            ફાર્મ્સ
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#738078]">
            તમારા કાર્યસ્થળ સાથે જોડાયેલા નવીનીકરણીય ઊર્જા ફાર્મ્સ બનાવો અને સંચાલિત કરો.
          </p>
        </div>

        <button
          onClick={() => {
            setError("");
            setShowModal(true);
          }}
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#001e61] px-5 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#00184f]"
        >
          <Plus size={17} strokeWidth={1.9} />
          ફાર્મ બનાવો
        </button>
      </div>

      {error && !showModal && (
        <div className="mt-6 rounded-xl border border-[#C94B3F]/20 bg-[#C94B3F]/5 px-4 py-3">
          <p className="text-xs font-medium text-[#C94B3F]">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="mt-10 flex min-h-[430px] items-center justify-center rounded-3xl border border-[#E4E9E1] bg-white">
          <p className="text-sm text-[#738078]">તમારા ફાર્મ્સ લોડ થઈ રહ્યા છે...</p>
        </div>
      ) : farms.length === 0 ? (
        <div className="mt-10 flex min-h-[430px] items-center justify-center rounded-3xl border border-[#E4E9E1] bg-white px-6">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8EDF7] text-[#001e61]">
              <Building2 size={25} strokeWidth={1.7} />
            </div>

            <h2 className="mt-5 text-xl font-semibold tracking-[-0.025em]">
              હજુ સુધી કોઈ ફાર્મ નથી
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#738078]">
              નવીનીકરણીય એસેટ્સનું આયોજન શરૂ કરવા અને તેમને AI-સહાયિત મોનિટરિંગ માટે તૈયાર કરવા તમારું પ્રથમ ફાર્મ બનાવો.
            </p>

            <button
              onClick={() => {
                setError("");
                setShowModal(true);
              }}
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-full border border-[#001e61] px-5 text-[12px] font-semibold text-[#001e61] transition hover:bg-[#E8EDF7]"
            >
              <Plus size={15} strokeWidth={1.9} />
              ફાર્મ ઉમેરો
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-10 space-y-5">
          {farms.map((farm) => (
            <div
              key={farm.farm_id}
              className="rounded-3xl border border-[#E4E9E1] bg-white p-7 shadow-[0_12px_35px_rgba(0,30,97,0.04)]"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E8EDF7] text-[#001e61]">
                    <Building2 size={25} strokeWidth={1.7} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
                      ફાર્મ
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                      {farm.farm_name}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#738078]">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} strokeWidth={1.7} />
                        {farm.location}
                      </span>

                      <span>ક્ષમતા: {farm.capacity}</span>

                      <span className="capitalize">
                        પ્રકાર: {farm.energy_type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-full bg-[#E8EDF7] px-4 py-2 text-[11px] font-semibold text-[#001e61]">
                  બેકએન્ડ સાથે જોડાયેલ
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#001e61]/20 px-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-[#E4E9E1] bg-white p-7 shadow-[0_24px_70px_rgba(0,30,97,0.16)]">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
                  નવું ફાર્મ
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                  ફાર્મ બનાવો
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#738078]">
                  તમારા નવીનીકરણીય ઊર્જા ફાર્મની મૂળભૂત વિગતો ઉમેરો.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setError("");
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#738078] transition hover:bg-[#F0F3F9] hover:text-[#001e61]"
                aria-label="બંધ કરો"
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
                  ફાર્મ name
                </label>

                <input
                  id="farmName"
                  name="farmName"
                  value={form.farmName}
                  onChange={handleChange}
                  placeholder="e.g. Sunrise Energy ફાર્મ"
                  className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-[#FAFBF7] px-4 text-sm outline-none transition focus:border-[#001e61]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-[11px] font-semibold"
                >
                  સ્થાન
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
                    placeholder="શહેર અથવા સાઇટનું સ્થાન"
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
                    ક્ષમતા
                  </label>

                  <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="0"
                    value={form.capacity}
                    onChange={handleChange}
                    placeholder="ક્ષમતા in MW"
                    className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-[#FAFBF7] px-4 text-sm outline-none transition focus:border-[#001e61]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="energyType"
                    className="mb-2 block text-[11px] font-semibold"
                  >
                    ઊર્જાનો પ્રકાર
                  </label>

                  <select
                    id="energyType"
                    name="energyType"
                    value={form.energyType}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-[#FAFBF7] px-4 text-sm outline-none transition focus:border-[#001e61]"
                  >
                    <option value="solar">સોલાર</option>
                    <option value="wind">વિન્ડ</option>
                    <option value="mixed">મિશ્ર</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-[#C94B3F]/20 bg-[#C94B3F]/5 px-4 py-3">
                  <p className="text-xs font-medium text-[#C94B3F]">
                    {error}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setError("");
                  }}
                  className="h-11 rounded-full border border-[#E4E9E1] px-5 text-[12px] font-semibold text-[#738078] transition hover:bg-[#F0F3F9]"
                >
                  રદ કરો
                </button>

                <button
                  type="submit"
                  disabled={isCreating}
                  className="h-11 rounded-full bg-[#001e61] px-6 text-[12px] font-semibold text-white transition hover:bg-[#00184f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCreating ? "બનાવવામાં આવી રહ્યું છે..." : "ફાર્મ બનાવો"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


export default FarmsGujarati;