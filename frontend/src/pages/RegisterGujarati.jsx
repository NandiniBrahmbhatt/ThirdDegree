import { useState } from "react";
import { apiRequest } from "../services/api";
import { Eye, EyeOff, Leaf, UserRound, Wrench } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function RegisterGujarati() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  if (
    !form.fullName ||
    !form.email ||
    !form.phone ||
    !form.password ||
    !form.confirmPassword ||
    !form.role
  ) {
    setError("કૃપા કરીને બધી વિગતો ભરો અને એક ભૂમિકા પસંદ કરો.");
    return;
  }

  if (form.password !== form.confirmPassword) {
    setError("પાસવર્ડ એકસરખા નથી.");
    return;
  }

  if (form.password.length < 6) {
    setError("પાસવર્ડમાં ઓછામાં ઓછા 6 અક્ષરો હોવા જોઈએ.");
    return;
  }

  try {
    await apiRequest("/users/signup", {
      method: "POST",
      body: JSON.stringify({
        username_email: form.email,
        password: form.password,
        full_name: form.fullName,
        phone: form.phone,
        role: form.role,
      }),
    });

    navigate("/gu/login");
  } catch (error) {
    console.error(error);
    setError("એકાઉન્ટ બનાવી શકાયું નથી. કૃપા કરીને ફરી પ્રયાસ કરો.");
  }
};

  return (
    <div className="min-h-screen bg-[#FAFBF7] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      {/* Visual Side */}
      <section className="relative hidden overflow-hidden lg:block">
        <img
          src="/images/solar-farm.png"
          alt="નવીનીકરણીય ઊર્જાનું ફાર્મ"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#001e61]/65" />

        <div className="relative flex h-full flex-col justify-between p-12 text-white xl:p-16">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#001e61]">
              <Leaf size={21} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-[20px] font-bold tracking-[-0.04em]">
                RenewAI
              </p>
              <p className="mt-0.5 text-[9px] font-medium text-white/65">
                નવીનીકરણીય ઇન્ટેલિજન્સ
              </p>
            </div>
          </div>

          <div className="max-w-[520px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
              નવીનીકરણીય ઇન્ટેલિજન્સ
            </p>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.05em] xl:text-6xl">
              વધુ સ્વસ્થ
              <br />
              ઊર્જા ભવિષ્ય બનાવો.
            </h1>

            <p className="mt-6 max-w-[430px] text-sm leading-6 text-white/70">
              નવીનીકરણીય એસેટ્સનું મોનીટરિંગ કરો, ઉભરતા જોખમોને સમજો અને
              મેન્ટેનન્સના નિર્ણયોને વધુ સ્માર્ટ કામગીરીમાં ફેરવો.
            </p>
          </div>

          <p className="text-[10px] font-medium text-white/50">
            AI આધારિત નવીનીકરણીય એસેટ ઇન્ટેલિજન્સ
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-[470px]">
          <div className="mb-9 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#001e61] text-white">
                <Leaf size={21} strokeWidth={1.8} />
              </div>

              <div>
                <h1 className="text-[20px] font-bold tracking-[-0.04em] text-[#001e61]">
                  RenewAI
                </h1>
                <p className="mt-0.5 text-[9px] font-medium text-[#89968E]">
                  નવીનીકરણીય ઇન્ટેલિજન્સ
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
              શરૂઆત કરો
            </p>

            <h2 className="mt-2 text-4xl font-semibold tracking-[-0.045em] text-[#202722]">
              તમારું એકાઉન્ટ બનાવો
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#738078]">
              યોગ્ય RenewAI વર્કસ્પેસ સેટ કરવા માટે તમારી ભૂમિકા પસંદ કરો.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-[11px] font-semibold text-[#202722]"
              >
                પૂરું નામ
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                placeholder="તમારું પૂરું નામ દાખલ કરો"
                className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-white px-4 text-sm text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
              />
            </div>

            {/* Email + Phone */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[11px] font-semibold text-[#202722]"
                >
                  ઇમેઇલ
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-white px-4 text-sm text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-[11px] font-semibold text-[#202722]"
                >
                  ફોન
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="ફોન નંબર"
                  className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-white px-4 text-sm text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-[11px] font-semibold text-[#202722]">
                તમારી ભૂમિકા પસંદ કરો
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      role: "farm_owner",
                    }))
                  }
                  className={`rounded-2xl border p-4 text-left transition ${
                    form.role === "farm_owner"
                      ? "border-[#001e61] bg-[#E6ECF7]"
                      : "border-[#E4E9E1] bg-white hover:border-[#BFC9D9]"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      form.role === "farm_owner"
                        ? "bg-[#001e61] text-white"
                        : "bg-[#F0F3F9] text-[#001e61]"
                    }`}
                  >
                    <Leaf size={17} strokeWidth={1.8} />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-[#202722]">
                    ફાર્મ માલિક
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#89968E]">
                    ફાર્મ્સ, એસેટ્સ અને મેન્ટેનન્સ મેનેજ કરો.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      role: "technician",
                    }))
                  }
                  className={`rounded-2xl border p-4 text-left transition ${
                    form.role === "technician"
                      ? "border-[#001e61] bg-[#E6ECF7]"
                      : "border-[#E4E9E1] bg-white hover:border-[#BFC9D9]"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      form.role === "technician"
                        ? "bg-[#001e61] text-white"
                        : "bg-[#F0F3F9] text-[#001e61]"
                    }`}
                  >
                    <Wrench size={17} strokeWidth={1.8} />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-[#202722]">
                    ટેકનિશિયન
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#89968E]">
                    મેન્ટેનન્સનું કામ મેળવો અને મેનેજ કરો.
                  </p>
                </button>
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[11px] font-semibold text-[#202722]"
              >
                પાસવર્ડ
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="પાસવર્ડ બનાવો"
                  className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-white px-4 pr-11 text-sm text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89968E] transition hover:text-[#001e61]"
                  aria-label={showPassword ? "પાસવર્ડ છુપાવો" : "પાસવર્ડ બતાવો"}
                >
                  {showPassword ? (
                    <EyeOff size={17} strokeWidth={1.8} />
                  ) : (
                    <Eye size={17} strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-[11px] font-semibold text-[#202722]"
              >
                પાસવર્ડની પુષ્ટિ કરો
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="તમારો પાસવર્ડ ફરીથી દાખલ કરો"
                  className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-white px-4 pr-11 text-sm text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89968E] transition hover:text-[#001e61]"
                  aria-label={
                    showConfirmPassword
                      ? "પાસવર્ડની પુષ્ટિ છુપાવો"
                      : "પાસવર્ડની પુષ્ટિ બતાવો"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} strokeWidth={1.8} />
                  ) : (
                    <Eye size={17} strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-[#F0C8C3] bg-[#FBE9E7] px-4 py-3 text-xs font-medium text-[#C94B3F]">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#001e61] text-sm font-semibold text-white transition hover:bg-[#00164A]"
            >
              <UserRound size={16} strokeWidth={1.8} />
              એકાઉન્ટ બનાવો
            </button>
          </form>

          <p className="mt-7 text-center text-xs text-[#738078]">
            પહેલેથી એકાઉન્ટ છે?{" "}
            <Link
              to="/gu/login"
              className="font-semibold text-[#001e61] hover:underline"
            >
              સાઇન ઇન કરો
            </Link>
          </p>

          <p className="mt-5 text-center text-[10px] leading-5 text-[#89968E]">
            રજિસ્ટ્રેશન હાલમાં પ્રોટોટાઇપ મોડમાં ચાલી રહ્યું છે. એકાઉન્ટ
            બનાવવાની પ્રક્રિયા બેકએન્ડ ઓથેન્ટિકેશન API સાથે જોડવામાં આવશે.
          </p>
        </div>
      </section>
    </div>
  );
}

export default RegisterGujarati;
