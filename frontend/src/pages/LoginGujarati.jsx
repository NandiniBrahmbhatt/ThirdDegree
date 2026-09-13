import { useState } from "react";
import { apiRequest } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Globe2,
} from "lucide-react";

function LoginGujarati() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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

    if (!form.email || !form.password) {
      setError("કૃપા કરીને તમારું ઇમેઇલ અને પાસવર્ડ દાખલ કરો.");
      return;
    }

    try {
      const response = await apiRequest("/users/login", {
        method: "POST",
        body: JSON.stringify({
          username_email: form.email,
          password: form.password,
        }),
      });

      localStorage.setItem("renewai_token", response.access_token);

      const user = {
        username_email: form.email,
        role: response.role,
      };

      localStorage.setItem("renewai_user", JSON.stringify(user));

      navigate(
        response.role === "technician" ? "/technician" : "/gu/dashboard"
      );
    } catch (error) {
      console.error(error);
      setError("ઇમેઇલ અથવા પાસવર્ડ ખોટો છે.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBF7] text-[#202722]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">

        {/* Left side */}
        <section className="relative hidden overflow-hidden bg-[#001e61] lg:flex lg:flex-col lg:justify-between p-10 xl:p-14">
          <div>
            <Link
              to="/gu/login"
              className="inline-flex items-center gap-2 text-white"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <span className="text-sm font-bold">R</span>
              </div>

              <span className="text-xl font-semibold tracking-[-0.04em]">
                RenewAI
              </span>
            </Link>
          </div>

          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E3F1F6]">
              નવીનીકરણીય ઊર્જા ઇન્ટેલિજન્સ
            </p>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-white xl:text-6xl">
              વધુ સ્માર્ટ મેન્ટેનન્સ.
              <br />
              વધુ સારું ઉત્પાદન.
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/70">
              એસેટની અસામાન્ય કામગીરીને વહેલી તકે શોધો, જોખમ સમજો અને વધુ સારા મેન્ટેનન્સ નિર્ણયો લો.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium text-white/50">
            <span>સોલાર</span>
            <span>•</span>
            <span>વિન્ડ</span>
            <span>•</span>
            <span>AI આધારિત</span>
          </div>
        </section>

        {/* Right side */}
        <section className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-[440px]">

            {/* Language switch */}
            <div className="mb-8 flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center gap-2 rounded-xl border border-[#E4E9E1] bg-white px-3 py-2 text-[11px] font-bold text-[#001e61] transition hover:bg-[#F0F3F9]"
              >
                <Globe2 size={15} strokeWidth={1.8} />
                English
              </button>
            </div>

            {/* Mobile logo */}
            <Link
              to="/gu/login"
              className="mb-12 flex items-center gap-2 lg:hidden"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001e61] text-white">
                <span className="text-xs font-bold">R</span>
              </div>

              <span className="text-lg font-semibold tracking-[-0.04em] text-[#202722]">
                RenewAI
              </span>
            </Link>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#001e61]">
                ફરી સ્વાગત છે
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#202722]">
                RenewAI માં સાઇન ઇન કરો
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#738078]">
                તમારા નવીનીકરણીય ઊર્જા વર્કસ્પેસમાં પ્રવેશ કરો અને
                AI આધારિત ઇનસાઇટ્સ સાથે તમારા એસેટ્સનું મોનિટરિંગ કરો.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[11px] font-semibold text-[#202722]"
                >
                  ઇમેઇલ સરનામું
                </label>

                <div className="flex h-12 items-center gap-3 rounded-xl border border-[#E4E9E1] bg-white px-4 transition focus-within:border-[#001e61]">
                  <Mail
                    size={17}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#738078]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-sm text-[#202722] outline-none placeholder:text-[#89968E]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-[11px] font-semibold text-[#202722]"
                  >
                    પાસવર્ડ
                  </label>

                  <button
                    type="button"
                    className="text-[11px] font-medium text-[#001e61] transition hover:opacity-70"
                  >
                    પાસવર્ડ ભૂલી ગયા?
                  </button>
                </div>

                <div className="flex h-12 items-center gap-3 rounded-xl border border-[#E4E9E1] bg-white px-4 transition focus-within:border-[#001e61]">
                  <LockKeyhole
                    size={17}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#738078]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="તમારો પાસવર્ડ દાખલ કરો"
                    className="w-full bg-transparent text-sm text-[#202722] outline-none placeholder:text-[#89968E]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="shrink-0 text-[#738078] transition hover:text-[#001e61]"
                    aria-label={
                      showPassword
                        ? "પાસવર્ડ છુપાવો"
                        : "પાસવર્ડ બતાવો"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} strokeWidth={1.8} />
                    ) : (
                      <Eye size={17} strokeWidth={1.8} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-[#C94B3F]/20 bg-[#C94B3F]/5 px-4 py-3">
                  <p className="text-xs font-medium text-[#C94B3F]">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-full bg-[#001e61] text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,30,97,0.14)] transition hover:-translate-y-0.5 hover:bg-[#00184f]"
              >
                સાઇન ઇન કરો

                <ArrowRight
                  size={17}
                  strokeWidth={1.8}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
            </form>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#E4E9E1]" />

              <span className="text-[10px] text-[#89968E]">
                RenewAI પર નવા છો?
              </span>

              <div className="h-px flex-1 bg-[#E4E9E1]" />
            </div>

            <Link
              to="/gu/register"
              className="mt-5 flex h-12 w-full items-center justify-center rounded-full border border-[#001e61] text-sm font-semibold text-[#001e61] transition hover:bg-[#E6ECF7]"
            >
              એકાઉન્ટ બનાવો
            </Link>

            <p className="mt-8 text-center text-[10px] leading-5 text-[#89968E]">
              ચાલુ રાખીને, તમે નવીનીકરણીય એસેટ મોનિટરિંગ અને મેન્ટેનન્સ સપોર્ટ માટે RenewAI નો જવાબદારીપૂર્વક ઉપયોગ કરવા સંમત થાઓ છો.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginGujarati;