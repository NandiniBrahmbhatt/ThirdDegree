import {
  Sun,
  Wind,
  Gauge,
  Zap,
  Activity,
  Thermometer,
  RotateCw,
  Eye,
} from "lucide-react";

function TechnicianGuidanceGujarati() {
  const solarPoints = [
    {
      icon: Sun,
      title: "પેનલની સ્થિતિ",
      text: "દેખાતી ધૂળ, છાંયો, તિરાડો અથવા ઉત્પાદનને અસર કરી શકે તેવી અન્ય સ્થિતિઓ તપાસો.",
    },
    {
      icon: Zap,
      title: "ઇલેક્ટ્રિકલ સિસ્ટમ",
      text: "મંજૂર મેન્ટેનન્સ પ્રક્રિયા અનુસાર ઉપલબ્ધ કેબલ, કનેક્ટર અને સાધનોનું નિરીક્ષણ કરો.",
    },
    {
      icon: Gauge,
      title: "ઇન્વર્ટર રીડિંગ્સ",
      text: "ઇન્વર્ટરની સ્થિતિ, ચેતવણીઓ અને ઓપરેટિંગ મૂલ્યોની સમીક્ષા કરો અને અપેક્ષિત સ્થિતિ સાથે સરખામણી કરો.",
    },
    {
      icon: Activity,
      title: "ઊર્જા ઉત્પાદન",
      text: "ઉત્પાદનના ટ્રેન્ડ પર નજર રાખો અને આઉટપુટમાં અણધાર્યા ઘટાડાની તપાસ કરો.",
    },
  ];

  const windPoints = [
    {
      icon: Wind,
      title: "ટર્બાઇનની સ્થિતિ",
      text: "ટર્બાઇનના ઉપલબ્ધ ઘટકોની આસપાસ દેખીતું નુકસાન અથવા અસામાન્ય સ્થિતિ તપાસો.",
    },
    {
      icon: RotateCw,
      title: "પરિભ્રમણ અને કંપન",
      text: "અસામાન્ય કંપન, અવાજ અથવા સામાન્ય કામગીરીના વર્તનમાં ફેરફાર પર ધ્યાન આપો.",
    },
    {
      icon: Thermometer,
      title: "તાપમાન",
      text: "તાપમાનના રીડિંગ્સ પર નજર રાખો અને સાઇટની પ્રક્રિયા અનુસાર અસામાન્ય ફેરફારોની તપાસ કરો.",
    },
    {
      icon: Gauge,
      title: "કામગીરી",
      text: "વર્તમાન ટર્બાઇન કામગીરીની અપેક્ષિત કામગીરી અને ઐતિહાસિક ટ્રેન્ડ સાથે સરખામણી કરો.",
    },
  ];

  const renderCards = (items) =>
    items.map((item) => {
      const Icon = item.icon;

      return (
        <article
          key={item.title}
          className="rounded-3xl border border-[#E4E9E1] bg-white p-6"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8EDF7] text-[#001e61]">
            <Icon size={20} strokeWidth={1.8} />
          </div>

          <h3 className="mt-5 text-base font-semibold">
            {item.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#738078]">
            {item.text}
          </p>
        </article>
      );
    });

  return (
    <div className="min-h-screen bg-[#FAFBF7] px-8 pb-12 pt-28 text-[#202722] xl:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
          ટેકનિશિયન જ્ઞાન
        </p>

        <h1 className="text-4xl font-semibold tracking-[-0.04em] xl:text-5xl">
          તમે જે સિસ્ટમનું મેન્ટેનન્સ કરો છો તેને સમજો.
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#738078]">
          સામાન્ય સોલાર અને વિન્ડ રિન્યુએબલ એનર્જી સિસ્ટમ્સ માટે ઝડપી
          સંદર્ભ માર્ગદર્શન.
        </p>
      </section>

      {/* Solar */}
      <section>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8EDF7] text-[#001e61]">
            <Sun size={21} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#89968E]">
              સોલાર
            </p>

            <h2 className="text-xl font-semibold">
              સોલાર PV ની મૂળભૂત માહિતી
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {renderCards(solarPoints)}
        </div>
      </section>

      {/* Wind */}
      <section className="mt-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8EDF7] text-[#001e61]">
            <Wind size={21} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#89968E]">
              વિન્ડ
            </p>

            <h2 className="text-xl font-semibold">
              વિન્ડ એનર્જીની મૂળભૂત માહિતી
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {renderCards(windPoints)}
        </div>
      </section>

      {/* Quick principle */}
      <section className="mt-10 rounded-3xl bg-[#001e61] p-7 text-white">
        <div className="flex items-start gap-4">
          <Eye size={22} strokeWidth={1.8} className="mt-0.5 shrink-0" />

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
              ટેકનિશિયનની વિચારસરણી
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              અવલોકન કરો → સરખામણી કરો → તપાસો → પગલું લો
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
              માત્ર એક માપ પર આધાર રાખવાને બદલે સાધનોના રીડિંગ્સ, દેખાતી
              સ્થિતિ અને ઐતિહાસિક વર્તનને સાથે ધ્યાનમાં લો.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TechnicianGuidanceGujarati;