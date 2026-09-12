import { useState } from "react";
import {
  Bell,
  Globe2,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  UserRound,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

function Settings() {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(true);
  const [sensorAlerts, setSensorAlerts] = useState(true);
  const [showPasswordMessage, setShowPasswordMessage] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState(false);

  const roleLabel = "Farm Owner";
  const databaseRole = "farm_owner";

  const handleLogout = () => {
    localStorage.removeItem("renewai_user");
    localStorage.removeItem("renewai_token");
    navigate("/");
  };

  const handleChangePassword = () => {
    setShowPasswordMessage(true);

    setTimeout(() => {
      setShowPasswordMessage(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAFBF7] px-8 pb-12 pt-28 xl:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="border-b border-[#E4E9E1] pb-9">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6ECF7] text-[#001e61]">
              <ShieldCheck size={25} strokeWidth={1.7} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
                Preferences
              </p>

              <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-[#202722] sm:text-4xl">
                Settings
              </h1>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-[#738078]">
            Manage your RenewAI preferences, notifications, language, and
            account settings.
          </p>
        </section>

        <section className="grid gap-6 py-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Preferences */}
          <div className="rounded-[28px] border border-[#E4E9E1] bg-white p-6 sm:p-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
                Application
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#202722]">
                Workspace preferences
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#738078]">
                Customize how RenewAI communicates important information to
                you.
              </p>
            </div>

            <div className="mt-8 space-y-5">
              {/* Language */}
              <div className="flex items-center justify-between gap-6 border-b border-[#E4E9E1] pb-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0F3F9] text-[#001e61]">
                    <Globe2 size={17} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#202722]">
                      Language
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#89968E]">
                      Switch between English and Gujarati.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="shrink-0 rounded-full border border-[#E4E9E1] bg-[#F0F3F9] px-4 py-2 text-[11px] font-semibold text-[#001e61] transition hover:bg-[#E6ECF7]"
                >
                  {language === "en" ? "English" : "ગુજરાતી"}
                </button>
              </div>

              {/* Email notifications */}
              <div className="flex items-center justify-between gap-6 border-b border-[#E4E9E1] pb-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0F3F9] text-[#001e61]">
                    <Bell size={17} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#202722]">
                      Email notifications
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#89968E]">
                      Receive important platform updates by email.
                    </p>
                  </div>
                </div>

                <Toggle
                  enabled={emailNotifications}
                  onClick={() =>
                    setEmailNotifications((current) => !current)
                  }
                  label="Toggle email notifications"
                />
              </div>

              {/* AI risk alerts */}
              <div className="flex items-center justify-between gap-6 border-b border-[#E4E9E1] pb-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0F3F9] text-[#001e61]">
                    <ShieldCheck size={17} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#202722]">
                      AI risk alerts
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#89968E]">
                      Receive alerts when AI detects elevated asset risk.
                    </p>
                  </div>
                </div>

                <Toggle
                  enabled={riskAlerts}
                  onClick={() => setRiskAlerts((current) => !current)}
                  label="Toggle AI risk alerts"
                />
              </div>

              {/* Sensor alerts */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0F3F9] text-[#001e61]">
                    <Bell size={17} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#202722]">
                      Sensor anomaly alerts
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#89968E]">
                      Get notified when unusual sensor patterns are detected.
                    </p>
                  </div>
                </div>

                <Toggle
                  enabled={sensorAlerts}
                  onClick={() => setSensorAlerts((current) => !current)}
                  label="Toggle sensor anomaly alerts"
                />
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-[#F0F3F9] p-4">
              <p className="text-xs leading-5 text-[#738078]">
                Notification preferences are currently stored in the frontend.
                They will be connected to your account settings later.
              </p>
            </div>
          </div>

          {/* Account */}
          <div className="space-y-6">
            {/* Role */}
            <div className="rounded-[28px] border border-[#E4E9E1] bg-[#F0F3F9] p-6 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E6ECF7] text-[#001e61]">
                <UserRound size={20} strokeWidth={1.7} />
              </div>

              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
                Account type
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#202722]">
                {roleLabel}
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#738078]">
                Your Farm Owner account gives you access to farm management,
                asset monitoring, AI analysis, alerts, and technician
                discovery.
              </p>

              <div className="mt-6 rounded-2xl border border-[#E4E9E1] bg-white p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
                  Account role
                </p>

                <p className="mt-2 text-sm font-semibold text-[#001e61]">
                  {databaseRole}
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-[#E4E9E1] bg-white p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
                  Account status
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  <p className="text-sm font-semibold text-emerald-700">
                    Active
                  </p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="rounded-[28px] border border-[#E4E9E1] bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F3F9] text-[#001e61]">
                  <LockKeyhole size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#202722]">
                    Security
                  </p>

                  <p className="mt-1 text-xs text-[#89968E]">
                    Manage your account security
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleChangePassword}
                className="mt-6 w-full rounded-xl border border-[#E4E9E1] px-4 py-3 text-left text-xs font-semibold text-[#202722] transition hover:border-[#001e61] hover:text-[#001e61]"
              >
                Change password
              </button>

              {showPasswordMessage && (
                <div className="mt-3 rounded-xl bg-[#F0F3F9] px-4 py-3 text-xs text-[#738078]">
                  Password management will be connected when authentication
                  settings are integrated.
                </div>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FBE9E7] px-4 py-3 text-xs font-semibold text-[#C94B3F] transition hover:bg-[#F7DDDA]"
              >
                <LogOut size={15} strokeWidth={1.8} />
                Log out
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="rounded-[28px] border border-red-200 bg-red-50/40 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle size={20} />
              </div>

              <div>
                <p className="text-sm font-bold text-red-800">
                  Danger Zone
                </p>

                <p className="mt-1 max-w-xl text-xs leading-5 text-red-700/70">
                  Deleting your account permanently removes your RenewAI
                  account and associated data.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowDeleteConfirmation(true)}
              className="shrink-0 rounded-xl border border-red-200 bg-white px-5 py-3 text-xs font-bold text-red-600 transition hover:bg-red-50"
            >
              Delete Account
            </button>
          </div>
        </section>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle size={22} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Delete your account?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This action cannot be completed from the current frontend-only
              settings. Account deletion will be connected to the backend
              later.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteConfirmation(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteConfirmation(false)}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Toggle({ enabled, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={enabled}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled ? "bg-[#001e61]" : "bg-[#D8DDD8]"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

export default Settings;