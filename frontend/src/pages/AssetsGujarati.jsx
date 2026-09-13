import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Plus,
  Sun,
  Wind,
  X,
} from "lucide-react";
import { apiRequest } from "../services/api";

function AssetsGujarati() {
  const [farms, setFarms] = useState([]);
  const [assets, setAssets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    farmId: "",
    assetLabel: "",
    assetType: "solar",
    capacity: "",
    installationDate: "",
    location: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [farmsResponse, assetsResponse] = await Promise.all([
        apiRequest("/farms/"),
        apiRequest("/assets/"),
      ]);

      const farmList = Array.isArray(farmsResponse)
        ? farmsResponse
        : farmsResponse?.items || [];

      const assetList = Array.isArray(assetsResponse)
        ? assetsResponse
        : assetsResponse?.items || [];

      setFarms(farmList);
      setAssets(assetList);

      if (farmList.length > 0) {
        setForm((previous) => ({
          ...previous,
          farmId: previous.farmId || String(farmList[0].farm_id),
        }));
      }
    } catch (err) {
      console.error("ફાર્મ/એસેટ્સ લોડ કરી શક્યા નથી:", err);
      setError("તમારા ફાર્મ અને એસેટ્સ લોડ કરી શક્યા નથી.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function openModal() {
    setError("");

    setForm((previous) => ({
      ...previous,
      farmId: previous.farmId || (farms[0] ? String(farms[0].farm_id) : ""),
    }));

    setIsModalOpen(true);
  }

  function closeModal() {
    if (!saving) {
      setIsModalOpen(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

     if (!form.farmId) {
      setError("કૃપા કરીને ફાર્મ પસંદ કરો.");
      return;
    }

    if (!form.assetLabel.trim()) {
      setError("કૃપા કરીને એસેટનું નામ દાખલ કરો.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const newAsset = await apiRequest("/assets/", {
        method: "POST",
        body: JSON.stringify({
          farm_id: Number(form.farmId),
          asset_label: form.assetLabel.trim(),
          asset_type: form.assetType,
          installation_date: form.installationDate || null,
          capacity: form.capacity ? Number(form.capacity) : null,
          location: form.location.trim() || null,
        }),
      });

      setAssets((previous) => [newAsset, ...previous]);

      setForm({
        farmId: form.farmId,
        assetLabel: "",
        assetType: "solar",
        capacity: "",
        installationDate: "",
        location: "",
      });

      setIsModalOpen(false);
    } catch (err) {
      console.error("એસેટ બનાવવામાં નિષ્ફળતા:", err);
      setError("એસેટ બનાવી શક્યા નથી. કૃપા કરીને ફરી પ્રયાસ કરો.");
    } finally {
      setSaving(false);
    }
  }

  function getFarmName(farmId) {
    const farm = farms.find(
      (item) => Number(item.farm_id) === Number(farmId)
    );

    return farm?.farm_name || "અજાણ્યું ફાર્મ";
  }

  function formatDate(date) {
    if (!date) return "ઉલ્લેખિત નથી";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="min-h-screen px-8 pb-12 pt-28 xl:px-12">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b2d73]">
            નવીનીકરણીય એસેટ્સ
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-[#202722]">
            એસેટ્સ
          </h1>

          <p className="mt-3 max-w-2xl text-base text-[#728078]">
            તમારા સોલાર અને વિન્ડ એસેટ્સ મેનેજ કરો અને તેમની કામગીરીની વિગતો પર નજર રાખો.
          </p>
        </div>

        <button
          onClick={openModal}
          disabled={farms.length === 0}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#062b78] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#08245f] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={18} />
          એસેટ ઉમેરો
        </button>
      </div>

      {/* Error */}
      {error && !isModalOpen && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* No farms */}
      {!loading && farms.length === 0 && (
        <div className="rounded-3xl border border-[#e0e6df] bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-[#202722]">
            પહેલા ફાર્મ બનાવો
          </h2>

          <p className="mt-2 text-[#728078]">
            એસેટ ઉમેરતા પહેલાં ઓછામાં ઓછું એક ફાર્મ જરૂરી છે.
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-64 animate-pulse rounded-3xl bg-white shadow-sm"
            />
          ))}
        </div>
      )}

      {/* એસેટ્સ */}
      {!loading && assets.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {assets.map((asset) => {
            const isSolar =
              String(asset.asset_type).toLowerCase() === "solar";

            return (
              <div
                key={asset.asset_id}
                className="rounded-3xl border border-[#e0e6df] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      isSolar ? "bg-amber-50" : "bg-blue-50"
                    }`}
                  >
                    {isSolar ? (
                      <Sun
                        size={25}
                        className="text-amber-500"
                      />
                    ) : (
                      <Wind
                        size={25}
                        className="text-blue-600"
                      />
                    )}
                  </div>

                  <span className="rounded-full bg-[#f1f5ef] px-3 py-1.5 text-xs font-semibold capitalize text-[#536158]">
                    {asset.asset_type}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-[#202722]">
                  {asset.asset_label}
                </h2>

                <p className="mt-1 text-sm text-[#7a857e]">
                  {getFarmName(asset.farm_id)}
                </p>

                <div className="mt-6 space-y-3 border-t border-[#edf0ec] pt-5">
                  <div className="flex items-center gap-3 text-sm text-[#68736c]">
                    <MapPin size={17} />
                    <span>{asset.location || "સ્થાન ઉલ્લેખિત નથી"}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#68736c]">
                    <CalendarDays size={17} />
                    <span>
                      ઇન્સ્ટોલેશન: {formatDate(asset.installation_date)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-[#7a857e]">
                      ક્ષમતા
                    </span>

                    <span className="font-semibold text-[#202722]">
                      {asset.capacity ?? "—"} MW
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty assets */}
      {!loading && farms.length > 0 && assets.length === 0 && (
        <div className="rounded-3xl border border-dashed border-[#ccd5cc] bg-white p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f1f5ef]">
            <Wind size={28} className="text-[#0b2d73]" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-[#202722]">
            હજુ સુધી કોઈ એસેટ નથી
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-[#728078]">
            તેની હેલ્થ મોનિટર કરવાનું શરૂ કરવા તમારું પહેલું સોલાર પેનલ અથવા વિન્ડ ટર્બાઇન ઉમેરો.
          </p>

          <button
            onClick={openModal}
            className="mt-6 rounded-full bg-[#062b78] px-6 py-3 text-sm font-semibold text-white"
          >
            તમારું પહેલું એસેટ ઉમેરો
          </button>
        </div>
      )}

      {/* એસેટ ઉમેરો Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 px-4 backdrop-blur-sm">
          <div className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-8 shadow-2xl md:p-10">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b2d73]">
                  નવું એસેટ
                </p>

                <h2 className="text-3xl font-semibold text-[#202722]">
                  એસેટ ઉમેરો
                </h2>

                <p className="mt-2 text-sm text-[#728078]">
                  નવીનીકરણીય ઊર્જા એસેટની મૂળભૂત વિગતો ઉમેરો.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-full p-2 text-[#718078] transition hover:bg-[#f1f4f0] hover:text-[#202722]"
              >
                <X size={24} />
              </button>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ફાર્મ */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#303832]">
                  ફાર્મ
                </label>

                <select
                  name="farmId"
                  value={form.farmId}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#dce3dc] bg-[#fbfcfa] px-4 py-4 text-base text-[#303832] outline-none transition focus:border-[#0b2d73] focus:ring-2 focus:ring-[#0b2d73]/10"
                  required
                >
                  <option value="">ફાર્મ પસંદ કરો</option>

                  {farms.map((farm) => (
                    <option
                      key={farm.farm_id}
                      value={farm.farm_id}
                    >
                      {farm.farm_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* એસેટનું નામ */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#303832]">
                  એસેટનું નામ
                </label>

                <input
                  type="text"
                  name="assetLabel"
                  value={form.assetLabel}
                  onChange={handleChange}
                  placeholder="દા.ત. ઇન્વર્ટર A-01"
                  className="w-full rounded-2xl border border-[#dce3dc] bg-[#fbfcfa] px-4 py-4 text-base text-[#303832] outline-none transition placeholder:text-[#a0a8a2] focus:border-[#0b2d73] focus:ring-2 focus:ring-[#0b2d73]/10"
                  required
                />
              </div>

              {/* Type + capacity */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#303832]">
                    એસેટનો પ્રકાર
                  </label>

                  <select
                    name="assetType"
                    value={form.assetType}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#dce3dc] bg-[#fbfcfa] px-4 py-4 text-base capitalize text-[#303832] outline-none transition focus:border-[#0b2d73] focus:ring-2 focus:ring-[#0b2d73]/10"
                  >
                    <option value="solar">સોલાર</option>
                    <option value="wind">વિન્ડ</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#303832]">
                    ક્ષમતા
                  </label>

                  <input
                    type="number"
                    name="capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    placeholder="ક્ષમતા in MW"
                    min="0"
                    step="0.01"
                    className="w-full rounded-2xl border border-[#dce3dc] bg-[#fbfcfa] px-4 py-4 text-base text-[#303832] outline-none transition placeholder:text-[#a0a8a2] focus:border-[#0b2d73] focus:ring-2 focus:ring-[#0b2d73]/10"
                  />
                </div>
              </div>

              {/* Date + location */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#303832]">
                    ઇન્સ્ટોલેશન તારીખ
                  </label>

                  <input
                    type="date"
                    name="installationDate"
                    value={form.installationDate}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#dce3dc] bg-[#fbfcfa] px-4 py-4 text-base text-[#303832] outline-none transition focus:border-[#0b2d73] focus:ring-2 focus:ring-[#0b2d73]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#303832]">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="એસેટનું સ્થાન"
                    className="w-full rounded-2xl border border-[#dce3dc] bg-[#fbfcfa] px-4 py-4 text-base text-[#303832] outline-none transition placeholder:text-[#a0a8a2] focus:border-[#0b2d73] focus:ring-2 focus:ring-[#0b2d73]/10"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-full border border-[#dce3dc] px-7 py-3.5 text-sm font-semibold text-[#68736c] transition hover:bg-[#f5f7f4] disabled:opacity-50"
                >
                  રદ કરો
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#062b78] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#08245f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "ઉમેરી રહ્યા છીએ..." : "એસેટ ઉમેરો"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssetsGujarati;