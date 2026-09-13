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

function SettingsGujarati() {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(true);
  const [sensorAlerts, setSensorAlerts] = useState(true);
  const [showPasswordMessage, setShowPasswordMessage] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState(false);

  const roleLabel = "ફાર્મ માલિક";
  const databaseRole = "farm_owner";

  const handleLogout = () => {
    localStorage.removeItem("renewai_user");
    localStorage.removeItem("renewai_token");
    navigate("/gu/login");
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
                પસંદગીઓ
              </p>

              <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-[#202722] sm:text-4xl">
                સેટિંગ્સ
              </h1>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-[#738078]">
            તમારી RenewAI પસંદગીઓ, નોટિફિકેશન્સ, ભાષા અને એકાઉન્ટ સેટિંગ્સ
            મેનેજ કરો.
          </p>
        </section>

        <section className="grid gap-6 py-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Preferences */}
          <div className="rounded-[28px] border border-[#E4E9E1] bg-white p-6 sm:p-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
                એપ્લિકેશન
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#202722]">
                વર્કસ્પેસ પસંદગીઓ
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#738078]">
                RenewAI તમારા સુધી મહત્વપૂર્ણ માહિતી કેવી રીતે પહોંચાડે તે
                કસ્ટમાઇઝ કરો.
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
                      ભાષા
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#89968E]">
                      અંગ્રેજી અને ગુજરાતી વચ્ચે બદલો.
                    </p>
                  </div>
                </div>
              </div>

              {/* Email notifications */}
              <div className="flex items-center justify-between gap-6 border-b border-[#E4E9E1] pb-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0F3F9] text-[#001e61]">
                    <Bell size={17} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#202722]">
                      ઈમેલ નોટિફિકેશન્સ
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#89968E]">
                      મહત્વપૂર્ણ પ્લેટફોર્મ અપડેટ્સ ઈમેલ દ્વારા મેળવો.
                    </p>
                  </div>
                </div>

                <Toggle
                  enabled={emailNotifications}
                  onClick={() =>
                    setEmailNotifications((current) => !current)
                  }
                  label="ઈમેલ નોટિફિકેશન્સ બદલો"
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
                      AI જોખમ એલર્ટ્સ
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#89968E]">
                      AI એસેટમાં વધેલું જોખમ શોધે ત્યારે એલર્ટ મેળવો.
                    </p>
                  </div>
                </div>

                <Toggle
                  enabled={riskAlerts}
                  onClick={() => setRiskAlerts((current) => !current)}
                  label="AI જોખમ એલર્ટ્સ બદલો"
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
                      સેન્સર અસામાન્યતા એલર્ટ્સ
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#89968E]">
                      અસામાન્ય સેન્સર પેટર્ન જોવા મળે ત્યારે સૂચના મેળવો.
                    </p>
                  </div>
                </div>

                <Toggle
                  enabled={sensorAlerts}
                  onClick={() => setSensorAlerts((current) => !current)}
                  label="સેન્સર અસામાન્યતા એલર્ટ્સ બદલો"
                />
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-[#F0F3F9] p-4">
              <p className="text-xs leading-5 text-[#738078]">
                નોટિફિકેશન પસંદગીઓ હાલમાં ફ્રન્ટએન્ડમાં સ્ટોર થાય છે. તમારા
                એકાઉન્ટ સેટિંગ્સ સાથે તેનું કનેક્શન પછીથી કરવામાં આવશે.
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
                એકાઉન્ટ પ્રકાર
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#202722]">
                {roleLabel}
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#738078]">
                તમારું ફાર્મ માલિક એકાઉન્ટ તમને ફાર્મ મેનેજમેન્ટ, એસેટ
                મોનિટરિંગ, AI વિશ્લેષણ, એલર્ટ્સ અને ટેકનિશિયન શોધની સુવિધા
                આપે છે.
              </p>

              <div className="mt-6 rounded-2xl border border-[#E4E9E1] bg-white p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
                  એકાઉન્ટ ભૂમિકા
                </p>

                <p className="mt-2 text-sm font-semibold text-[#001e61]">
                  {databaseRole}
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-[#E4E9E1] bg-white p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
                  એકાઉન્ટ સ્થિતિ
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  <p className="text-sm font-semibold text-emerald-700">
                    સક્રિય
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
                    સુરક્ષા
                  </p>

                  <p className="mt-1 text-xs text-[#89968E]">
                    તમારી એકાઉન્ટ સુરક્ષા મેનેજ કરો
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleChangePassword}
                className="mt-6 w-full rounded-xl border border-[#E4E9E1] px-4 py-3 text-left text-xs font-semibold text-[#202722] transition hover:border-[#001e61] hover:text-[#001e61]"
              >
                પાસવર્ડ બદલો
              </button>

              {showPasswordMessage && (
                <div className="mt-3 rounded-xl bg-[#F0F3F9] px-4 py-3 text-xs text-[#738078]">
                  ઓથેન્ટિકેશન સેટિંગ્સ એકીકૃત કરવામાં આવશે ત્યારે પાસવર્ડ
                  મેનેજમેન્ટ કનેક્ટ કરવામાં આવશે.
                </div>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FBE9E7] px-4 py-3 text-xs font-semibold text-[#C94B3F] transition hover:bg-[#F7DDDA]"
              >
                <LogOut size={15} strokeWidth={1.8} />
                લોગ આઉટ
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
                  જોખમી વિસ્તાર
                </p>

                <p className="mt-1 max-w-xl text-xs leading-5 text-red-700/70">
                  તમારું એકાઉન્ટ ડિલીટ કરવાથી તમારું RenewAI એકાઉન્ટ અને
                  સંબંધિત ડેટા કાયમી રીતે દૂર થઈ જશે.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowDeleteConfirmation(true)}
              className="shrink-0 rounded-xl border border-red-200 bg-white px-5 py-3 text-xs font-bold text-red-600 transition hover:bg-red-50"
            >
              એકાઉન્ટ ડિલીટ કરો
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
              તમારું એકાઉન્ટ ડિલીટ કરવું છે?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              આ ક્રિયા વર્તમાન ફ્રન્ટએન્ડ-ઓન્લી સેટિંગ્સમાંથી પૂર્ણ કરી શકાતી
              નથી. એકાઉન્ટ ડિલીશન પછીથી બેકએન્ડ સાથે કનેક્ટ કરવામાં આવશે.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteConfirmation(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                રદ કરો
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteConfirmation(false)}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                બંધ કરો
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

export default SettingsGujarati;
