import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Activity,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Cpu,
  Gauge,
  Wrench,
} from "lucide-react";

function AssetDetailsGujarati() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#FAFBF7] px-8 pb-12 pt-28 text-[#202722] xl:px-12">
      <Link
        to="/assets"
        className="inline-flex items-center gap-2 text-[12px] font-medium text-[#738078] transition hover:text-[#001e61]"
      >
        <ArrowLeft size={16} strokeWidth={1.8} />
        એસેટ્સ પર પાછા જાઓ
      </Link>

      <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
            એસેટની વિગતો
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em]">
            એસેટ #{id}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#738078]">
            એસેટની માહિતી, મોનિટરિંગ સ્થિતિ અને AI આધારિત જાળવણીની માહિતી જુઓ.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#E4E9E1] bg-white px-4 py-2 text-[11px] font-semibold text-[#738078]">
          <Cpu size={15} strokeWidth={1.8} />
          નવીનીકરણીય એસેટ
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-3xl border border-[#E4E9E1] bg-white p-7">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8EDF7] text-[#001e61]">
              <Cpu size={22} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#89968E]">
                એસેટ
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                એસેટનો ડેટા જોડાયેલ નથી
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#F7F5F0] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#89968E]">
                એસેટ type
              </p>

              <p className="mt-2 text-sm font-medium text-[#738078]">
                બેકએન્ડ ડેટાની રાહ જોઈ રહ્યા છીએ
              </p>
            </div>

            <div className="rounded-2xl bg-[#F7F5F0] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#89968E]">
                ઇન્સ્ટોલેશન
              </p>

              <p className="mt-2 text-sm font-medium text-[#738078]">
                બેકએન્ડ ડેટાની રાહ જોઈ રહ્યા છીએ
              </p>
            </div>

            <div className="rounded-2xl bg-[#F7F5F0] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#89968E]">
                ક્ષમતા
              </p>

              <p className="mt-2 text-sm font-medium text-[#738078]">
                બેકએન્ડ ડેટાની રાહ જોઈ રહ્યા છીએ
              </p>
            </div>

            <div className="rounded-2xl bg-[#F7F5F0] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#89968E]">
                સ્થાન
              </p>

              <p className="mt-2 text-sm font-medium text-[#738078]">
                બેકએન્ડ ડેટાની રાહ જોઈ રહ્યા છીએ
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#E4E9E1] bg-white p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8EDF7] text-[#001e61]">
              <Gauge size={20} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#89968E]">
                AI વિશ્લેષણ
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                હેલ્થ સ્થિતિ
              </h2>
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-dashed border-[#E4E9E1] px-5 py-7 text-center">
            <Activity
              size={23}
              strokeWidth={1.7}
              className="mx-auto text-[#89968E]"
            />

            <p className="mt-4 text-sm font-medium">
              કોઈ વિશ્લેષણ ઉપલબ્ધ નથી
            </p>

            <p className="mt-2 text-xs leading-5 text-[#738078]">
              AI વિશ્લેષણ will appear here once sensor data is connected.
            </p>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-3xl border border-[#E4E9E1] bg-white p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F3F9] text-[#001e61]">
            <Wrench size={20} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#89968E]">
              જાળવણી
            </p>

            <h2 className="mt-1 text-lg font-semibold">
              જાળવણી insights
            </h2>
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#E4E9E1] p-5">
            <CheckCircle2
              size={19}
              strokeWidth={1.8}
              className="text-[#001e61]"
            />

            <p className="mt-4 text-sm font-semibold">
              વર્તમાન સ્થિતિ
            </p>

            <p className="mt-2 text-xs leading-5 text-[#738078]">
              જોડાયેલા એસેટ ડેટાની રાહ જોઈ રહ્યા છીએ.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E4E9E1] p-5">
            <AlertTriangle
              size={19}
              strokeWidth={1.8}
              className="text-[#D68B23]"
            />

            <p className="mt-4 text-sm font-semibold">
              જોખમ મૂલ્યાંકન
            </p>

            <p className="mt-2 text-xs leading-5 text-[#738078]">
              Risk scoring will be provided by the AI વિશ્લેષણ service.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E4E9E1] p-5">
            <CalendarDays
              size={19}
              strokeWidth={1.8}
              className="text-[#2387AE]"
            />

            <p className="mt-4 text-sm font-semibold">
              જાળવણી schedule
            </p>

            <p className="mt-2 text-xs leading-5 text-[#738078]">
              જાળવણી recommendations will appear when analysis is
              available.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AssetDetailsGujarati;
