import {
  ShieldCheck,
  TriangleAlert,
  Zap,
  Sun,
  Wind,
  HardHat,
  ClipboardCheck,
} from "lucide-react";

function TechnicianSafetyGujarati() {
  const safetyRules = [
    {
      icon: Zap,
      title: "ઇલેક્ટ્રિકલ સાધનોને આઇસોલેટ કરો",
      text: "ઇલેક્ટ્રિકલ સાધનો પર કામ કરતા પહેલાં યોગ્ય આઇસોલેશન અને લોકઆઉટ પ્રક્રિયાનું પાલન કરો.",
    },
    {
      icon: HardHat,
      title: "યોગ્ય PPE નો ઉપયોગ કરો",
      text: "ચોક્કસ કાર્ય અને કામના વાતાવરણ માટે જરૂરી સુરક્ષા સાધનો પહેરો.",
    },
    {
      icon: Sun,
      title: "સોલાર સિસ્ટમને ચાલુ માનો",
      text: "સૂર્યપ્રકાશમાં રહેવાથી સોલાર સાધનોમાં વીજ પ્રવાહ ચાલુ રહી શકે છે. સાઇટની ઇલેક્ટ્રિકલ સુરક્ષા પ્રક્રિયાનું પાલન કરો.",
    },
    {
      icon: Wind,
      title: "ટર્બાઇનના જોખમોથી સાવચેત રહો",
      text: "ફરતા સાધનો, ઊંચાઈવાળા વિસ્તારો અને અન્ય ટર્બાઇન જોખમો માટે સાઇટ-વિશિષ્ટ પ્રક્રિયાનું પાલન કરો.",
    },
    {
      icon: TriangleAlert,
      title: "ચેતવણીના સંકેતોને અવગણશો નહીં",
      text: "અસામાન્ય ગરમી, ગંધ, અવાજ, કંપન અથવા સાધનને દેખીતું નુકસાન જણાય તો કામ રોકો અને પરિસ્થિતિનું મૂલ્યાંકન કરો.",
    },
    {
      icon: ClipboardCheck,
      title: "સાઇટની પ્રક્રિયાનું પાલન કરો",
      text: "સાધન ઉત્પાદકની સૂચનાઓ તથા સાઇટની મંજૂર મેન્ટેનન્સ અને સુરક્ષા પ્રક્રિયાઓનો ઉપયોગ કરો.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFBF7] px-8 pb-12 pt-28 text-[#202722] xl:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
          ટેકનિશિયન જ્ઞાન
        </p>

        <h1 className="text-4xl font-semibold tracking-[-0.04em] xl:text-5xl">
          મેન્ટેનન્સ પહેલાં સુરક્ષા.
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#738078]">
          સોલાર, વિન્ડ અને ઇલેક્ટ્રિકલ સાધનોની આસપાસ કામ કરતા ટેકનિશિયનો
          માટે જરૂરી સુરક્ષા સૂચનો.
        </p>
      </section>

      <section className="mb-7 rounded-3xl border border-[#E4E9E1] bg-white p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF3E0] text-[#A96816]">
            <ShieldCheck size={23} strokeWidth={1.8} />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              કંઈક યોગ્ય ન લાગે તો કામ રોકો.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#738078]">
              મેન્ટેનન્સનું કામ ક્યારેય ઉતાવળમાં ન કરો. જો સાધનની સ્થિતિ,
              કામનું વાતાવરણ અથવા જરૂરી પ્રક્રિયા સ્પષ્ટ ન હોય, તો આગળ
              વધતા પહેલાં યોગ્ય સુરક્ષા પ્રક્રિયાનું પાલન કરો.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {safetyRules.map((rule) => {
          const Icon = rule.icon;

          return (
            <article
              key={rule.title}
              className="rounded-3xl border border-[#E4E9E1] bg-white p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8EDF7] text-[#001e61]">
                <Icon size={20} strokeWidth={1.8} />
              </div>

              <h2 className="mt-5 text-base font-semibold">
                {rule.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#738078]">
                {rule.text}
              </p>
            </article>
          );
        })}
      </section>

      <div className="mt-7 flex items-start gap-4 rounded-3xl border border-[#E4E9E1] bg-white p-6">
        <TriangleAlert
          size={20}
          strokeWidth={1.8}
          className="mt-0.5 shrink-0 text-[#A96816]"
        />

        <p className="text-xs leading-6 text-[#738078]">
          આ સામાન્ય સૂચનો છે અને ઔપચારિક સુરક્ષા તાલીમ, સાઇટની પ્રક્રિયાઓ,
          ઇલેક્ટ્રિકલ નિયમો અથવા ઉત્પાદકની સૂચનાઓનો વિકલ્પ નથી.
        </p>
      </div>
    </div>
  );
}

export default TechnicianSafetyGujarati;