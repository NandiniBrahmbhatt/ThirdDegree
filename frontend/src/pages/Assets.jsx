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

function Assets() {
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
      console.error("Unable to load farms/assets:", err);
      setError("Unable to load your farms and assets.");
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
      setError("Please select a farm.");
      return;
    }

    if (!form.assetLabel.trim()) {
      setError("Please enter an asset label.");
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
      console.error("Unable to create asset:", err);
      setError("Unable to create the asset. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function getFarmName(farmId) {
    const farm = farms.find(
      (item) => Number(item.farm_id) === Number(farmId)
    );

    return farm?.farm_name || "Unknown farm";
  }

  function formatDate(date) {
    if (!date) return "Not specified";

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
            Renewable Assets
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-[#202722]">
            Assets
          </h1>

          <p className="mt-3 max-w-2xl text-base text-[#728078]">
            Manage your solar and wind assets and keep track of their
            operational details.
          </p>
        </div>

        <button
          onClick={openModal}
          disabled={farms.length === 0}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#062b78] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#08245f] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={18} />
          Add Asset
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
            Create a farm first
          </h2>

          <p className="mt-2 text-[#728078]">
            You need at least one farm before adding an asset.
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

      {/* Assets */}
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
                    <span>{asset.location || "Location not specified"}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#68736c]">
                    <CalendarDays size={17} />
                    <span>
                      Installed: {formatDate(asset.installation_date)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-[#7a857e]">
                      Capacity
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
            No assets yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-[#728078]">
            Add your first solar panel or wind turbine to start monitoring
            its health.
          </p>

          <button
            onClick={openModal}
            className="mt-6 rounded-full bg-[#062b78] px-6 py-3 text-sm font-semibold text-white"
          >
            Add Your First Asset
          </button>
        </div>
      )}

      {/* Add Asset Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 px-4 backdrop-blur-sm">
          <div className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-8 shadow-2xl md:p-10">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b2d73]">
                  New Asset
                </p>

                <h2 className="text-3xl font-semibold text-[#202722]">
                  Add Asset
                </h2>

                <p className="mt-2 text-sm text-[#728078]">
                  Add the basic details of a renewable energy asset.
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
              {/* Farm */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#303832]">
                  Farm
                </label>

                <select
                  name="farmId"
                  value={form.farmId}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#dce3dc] bg-[#fbfcfa] px-4 py-4 text-base text-[#303832] outline-none transition focus:border-[#0b2d73] focus:ring-2 focus:ring-[#0b2d73]/10"
                  required
                >
                  <option value="">Select a farm</option>

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

              {/* Asset label */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#303832]">
                  Asset label
                </label>

                <input
                  type="text"
                  name="assetLabel"
                  value={form.assetLabel}
                  onChange={handleChange}
                  placeholder="e.g. Inverter A-01"
                  className="w-full rounded-2xl border border-[#dce3dc] bg-[#fbfcfa] px-4 py-4 text-base text-[#303832] outline-none transition placeholder:text-[#a0a8a2] focus:border-[#0b2d73] focus:ring-2 focus:ring-[#0b2d73]/10"
                  required
                />
              </div>

              {/* Type + capacity */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#303832]">
                    Asset type
                  </label>

                  <select
                    name="assetType"
                    value={form.assetType}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#dce3dc] bg-[#fbfcfa] px-4 py-4 text-base capitalize text-[#303832] outline-none transition focus:border-[#0b2d73] focus:ring-2 focus:ring-[#0b2d73]/10"
                  >
                    <option value="solar">Solar</option>
                    <option value="wind">Wind</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#303832]">
                    Capacity
                  </label>

                  <input
                    type="number"
                    name="capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    placeholder="Capacity in MW"
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
                    Installation date
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
                    placeholder="Asset location"
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
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#062b78] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#08245f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Adding..." : "Add Asset"}
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