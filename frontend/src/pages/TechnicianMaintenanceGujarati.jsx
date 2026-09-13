import {
  Wrench,
  Sun,
  Wind,
  BatteryCharging,
  Gauge,
  Thermometer,
  Zap,
  CalendarCheck,
} from "lucide-react";

function TechnicianMaintenanceGujarati() {
  const maintenanceTips = [
    {
      icon: Sun,
      title: "સોલાર પેનલ સ્વચ્છ રાખો",
      text: "પેનલનું નિયમિત નિરીક્ષણ કરો અને ધૂળ, પાંદડાં તથા અન્ય સપાટી પરની ગંદકી દૂર કરો, જે ઊર્જા ઉત્પાદન ઘટાડી શકે છે.",
    },
    {
      icon: Gauge,
      title: "ઇન્વર્ટરની કામગીરી તપાસો",
      text: "ઇન્વર્ટરના સૂચકો, એરર કોડ અને ઓપરેટિંગ મૂલ્યો પર નજર રાખો. અસામાન્ય રીડિંગ મોટી સમસ્યા બને તે પહેલાં તેની તપાસ કરો.",
    },
    {
      icon: Wind,
      title: "વિન્ડ ટર્બાઇનના ઘટકોનું નિરીક્ષણ કરો",
      text: "અસામાન્ય કંપન, અવાજ, ઘસારો અથવા અન્ય અસામાન્ય વર્તન માટે ટર્બાઇનના દેખાતા ઘટકોની નિયમિત તપાસ કરો.",
    },
    {
      icon: Zap,
      title: "ઇલેક્ટ્રિકલ કનેક્શન તપાસો",
      text: "નિયત મેન્ટેનન્સ દરમિયાન ઉપલબ્ધ ઇલેક્ટ્રિકલ કનેક્શન ઢીલાં છે કે નહીં, ઓવરહિટીંગના સંકેતો અથવા દેખીતું નુકસાન છે કે નહીં તે તપાસો.",
    },
    {
      icon: Thermometer,
      title: "તાપમાનના ટ્રેન્ડ પર નજર રાખો",
      text: "તાપમાનમાં અસામાન્ય વધારો સાધન પર વધારાનો ભાર દર્શાવી શકે છે. રીડિંગની સામાન્ય ઓપરેટિંગ સ્થિતિ સાથે સરખામણી કરો.",
    },
    {
      icon: BatteryCharging,
      title: "સિસ્ટમ આઉટપુટ મોનિટર કરો",
      text: "સંભવિત ડિગ્રેડેશન અથવા સાધનની સમસ્યાઓ ઓળખવા માટે વાસ્તવિક ઉત્પાદનની અપેક્ષિત કામગીરી સાથે સરખામણી કરો.",
    },
  ];

  const checklist = [
    "સાધનોની સ્થિતિનું નિરીક્ષણ કરો",
    "અસામાન્ય અવાજ અથવા કંપન તપાસો",
    "ઇન્વર્ટર અથવા કંટ્રોલરના રીડિંગની સમીક્ષા કરો",
    "ઉપલબ્ધ કેબલ અને કનેક્શન તપાસો",
    "વર્તમાન આઉટપુટની સામાન્ય આઉટપુટ સાથે સરખામણી કરો",
    "અસામાન્ય અવલોકનો નોંધો",
  ];

  return (
    <div className="min-h-screen bg-[#FAFBF7] px-8 pb-12 pt-28 text-[#202722] xl:px-12">
      <section className="mb-10 max-w-3xl">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
          ટેકનિશિયન જ્ઞાન
        </p>

        <h1 className="text-4xl font-semibold tracking-[-0.04em] xl:text-5xl">
          સિસ્ટમને કાર્યરત રાખવા માટેના મેન્ટેનન્સ સૂચનો.
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#738078]">
          રિન્યુએબલ એનર્જી સાધનોના નિયમિત નિરીક્ષણ અને મેન્ટેનન્સ માટે
          ઉપયોગી વ્યવહારુ સૂચનો.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {maintenanceTips.map((tip) => {
          const Icon = tip.icon;

          return (
            <article
              key={tip.title}
              className="rounded-3xl border border-[#E4E9E1] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(32,39,34,0.06)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8EDF7] text-[#001e61]">
                <Icon size={20} strokeWidth={1.8} />
              </div>

              <h2 className="mt-5 text-base font-semibold">
                {tip.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#738078]">
                {tip.text}
              </p>
            </article>
          );
        })}
      </section>

      <section className="mt-7 rounded-3xl border border-[#E4E9E1] bg-white p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F3F9] text-[#001e61]">
            <CalendarCheck size={20} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#89968E]">
              નિયમિત ચેકલિસ્ટ
            </p>

            <h2 className="mt-1 text-lg font-semibold">
              મેન્ટેનન્સ મુલાકાત પૂર્ણ કરતા પહેલાં
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {checklist.map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-[#F7F5F0] px-4 py-3 text-sm text-[#738078]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TechnicianMaintenanceGujarati;