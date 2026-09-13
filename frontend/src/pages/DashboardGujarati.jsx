import { Link } from "react-router-dom";
import { ArrowUpRight, Leaf, Sun, Wind } from "lucide-react";

function DashboardGujarati() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAFBF7]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/solar-farm.png"
          alt="નવીનીકરણીય ઊર્જા ફાર્મ"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#001e61]/90 via-[#001e61]/55 to-[#001e61]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001e61]/70 via-transparent to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative flex min-h-screen flex-col justify-between px-8 pb-10 pt-28 xl:px-12">
        <div className="max-w-3xl pt-10 xl:pt-16">
          <div className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            <span className="flex items-center gap-2">
              <Sun size={14} strokeWidth={1.8} />
              સોલાર
            </span>

            <span className="text-white/40">•</span>

            <span className="flex items-center gap-2">
              <Wind size={14} strokeWidth={1.8} />
              વિન્ડ
            </span>

            <span className="text-white/40">•</span>

            <span className="flex items-center gap-2">
              <Leaf size={14} strokeWidth={1.8} />
              ટકાઉ
            </span>
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl xl:text-7xl">
            સ્વચ્છ ઊર્જા માટે
            <br />
            વધુ સ્માર્ટ જાળવણી.
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/75">
            RenewAI નવીનીકરણીય ઊર્જાની ટીમોને એસેટનું વર્તન સમજવામાં,
            સંભવિત સમસ્યાઓને વહેલી તકે ઓળખવામાં અને AI આધારિત
            માહિતી દ્વારા વધુ સારા જાળવણીના નિર્ણયો લેવામાં મદદ કરે છે.
          </p>

          <Link
            to="/gu/farms"
            className="group mt-9 inline-flex h-12 items-center gap-3 rounded-full bg-white px-6 text-[13px] font-semibold text-[#001e61] shadow-[0_14px_35px_rgba(0,0,0,0.15)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#F0F3F9]"
          >
            તમારું પહેલું ફાર્મ બનાવો

            <ArrowUpRight
              size={17}
              strokeWidth={1.9}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Bottom information */}
        <div className="flex flex-col gap-6 border-t border-white/20 pt-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
              AI આધારિત નવીનીકરણીય ઊર્જા ઇન્ટેલિજન્સ
            </p>

            <p className="mt-2 text-xs leading-5 text-white/65">
              અસામાન્ય વર્તન શોધવાથી લઈને જાળવણીની પ્રાથમિકતાઓ સમજવા સુધી,
              RenewAI એસેટના ડેટાને ઉપયોગી માહિતીમાં પરિવર્તિત કરે છે.
            </p>
          </div>

          <div className="flex items-center gap-8 text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
            <span>સોલાર એસેટ્સ</span>
            <span>વિન્ડ એસેટ્સ</span>
            <span>પ્રેડિક્ટિવ મેઇન્ટેનન્સ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardGujarati;