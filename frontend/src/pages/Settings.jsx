import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Globe2,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

function Settings() {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(true);

  // Temporary frontend values.
  // These will come from the backend after authentication is connected.
  const roleLabel = "Technician";
  const databaseRole = "technician";

  const handleLogout = () => {
    // Real authentication/session cleanup will be connected later.
    navigate("/");
  };

  return (
    <div className="min-h-screen px-8 pb-12 pt-28 xl:px-12">
      {/* Header */}
      <section className="border-b border-[#E4E9E1] pb-9">
        <Link
          to="/dashboard"
          className="group inline-flex items-center gap-2 text-[12px] font-semibold text-[#738078] transition hover:text-[#001e61]"
        >
          <ArrowLeft
            size={16}
            strokeWidth={1.8}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          Back to Dashboard
        </Link>

        <div className="mt-7 flex items-center gap-4">
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

        <p className="mt-5 max-w-120 text-sm leading-6 text-[#738078]">
          Control your RenewAI workspace, notifications, language, and account
          preferences.
        </p>
      </section>

      <section className="grid gap-6 py-8 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Application settings */}
        <div className="rounded-[28px] border border-[#E4E9E1] bg-white p-6 sm:p-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
              Application
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#202722]">
              Workspace preferences
            </h2>
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

              <button
                type="button"
                onClick={() =>
                  setEmailNotifications((current) => !current)
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  emailNotifications ? "bg-[#001e61]" : "bg-[#D8DDD8]"
                }`}
                aria-label="Toggle email notifications"
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    emailNotifications ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Maintenance alerts */}
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0F3F9] text-[#001e61]">
                  <ShieldCheck size={17} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#202722]">
                    Maintenance alerts
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#89968E]">
                    Get notified when assets require attention.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMaintenanceAlerts((current) => !current)
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  maintenanceAlerts ? "bg-[#001e61]" : "bg-[#D8DDD8]"
                }`}
                aria-label="Toggle maintenance alerts"
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    maintenanceAlerts ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="mt-7 rounded-2xl bg-[#F0F3F9] p-4">
            <p className="text-xs leading-5 text-[#738078]">
              These preferences are currently handled in the frontend. They
              will be connected to the backend when user settings APIs are
              implemented.
            </p>
          </div>
        </div>

        {/* Role & Security */}
        <div className="space-y-6">
          {/* Role */}
          <div className="rounded-[28px] border border-[#E4E9E1] bg-[#F0F3F9] p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E6ECF7] text-[#001e61]">
              <UserRound size={20} strokeWidth={1.7} />
            </div>

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
              Current role
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#202722]">
              {roleLabel}
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#738078]">
              Your role determines which workspace and features are available
              to you.
            </p>

            <div className="mt-6 rounded-2xl border border-[#E4E9E1] bg-white p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
                Database role
              </p>

              <p className="mt-2 text-sm font-semibold text-[#001e61]">
                {databaseRole}
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-[#E4E9E1] bg-white p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
                Other supported role
              </p>

              <p className="mt-2 text-sm font-semibold text-[#202722]">
                farm_owner
              </p>
            </div>

            <div className="mt-4 rounded-2xl bg-[#E6ECF7] p-4">
              <p className="text-xs leading-5 text-[#40544C]">
                Technician accounts receive the dedicated maintenance
                workspace for inspection and job management.
              </p>
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
                  Account security controls
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                console.log("Change password will be connected later.")
              }
              className="mt-6 w-full rounded-xl border border-[#E4E9E1] px-4 py-3 text-left text-xs font-semibold text-[#202722] transition hover:border-[#001e61] hover:text-[#001e61]"
            >
              Change password
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FBE9E7] px-4 py-3 text-xs font-semibold text-[#C94B3F] transition hover:bg-[#F7DDDA]"
            >
              <LogOut size={15} strokeWidth={1.8} />
              Log out
            </button>

            <p className="mt-4 text-[10px] leading-5 text-[#89968E]">
              Authentication and session management will be connected to the
              backend later.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;