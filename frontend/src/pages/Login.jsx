import { useState } from "react";
import { apiRequest } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

function Login() {
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
    setError("Please enter your email and password.");
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
      response.role === "technician" ? "/technician" : "/dashboard"
    );
  } catch (error) {
    console.error(error);
    setError("Invalid email or password.");
  }
};

  return (
    <div className="min-h-screen bg-[#FAFBF7] text-[#202722]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left side */}
        <section className="relative hidden overflow-hidden bg-[#001e61] lg:flex lg:flex-col lg:justify-between p-10 xl:p-14">
          <div>
            <Link
              to="/"
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
              Renewable Energy Intelligence
            </p>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-white xl:text-6xl">
              Smarter maintenance.
              <br />
              Better generation.
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/70">
              Detect abnormal asset behaviour early, understand the risk,
              and make better maintenance decisions.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium text-white/50">
            <span>Solar</span>
            <span>•</span>
            <span>Wind</span>
            <span>•</span>
            <span>AI-assisted</span>
          </div>
        </section>

        {/* Right side */}
        <section className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-[440px]">
            {/* Mobile logo */}
            <Link
              to="/"
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
                Welcome back
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#202722]">
                Sign in to RenewAI
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#738078]">
                Access your renewable energy workspace and monitor your
                assets with AI-assisted insights.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[11px] font-semibold text-[#202722]"
                >
                  Email address
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
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-[11px] font-medium text-[#001e61] transition hover:opacity-70"
                  >
                    Forgot password?
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
                    placeholder="Enter your password"
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
                        ? "Hide password"
                        : "Show password"
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
                Sign in

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
                New to RenewAI?
              </span>
              <div className="h-px flex-1 bg-[#E4E9E1]" />
            </div>

            <Link
              to="/register"
              className="mt-5 flex h-12 w-full items-center justify-center rounded-full border border-[#001e61] text-sm font-semibold text-[#001e61] transition hover:bg-[#E6ECF7]"
            >
              Create an account
            </Link>

            <p className="mt-8 text-center text-[10px] leading-5 text-[#89968E]">
              By continuing, you agree to use RenewAI responsibly for
              renewable asset monitoring and maintenance support.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;