import { useState } from "react";
import { apiRequest } from "../services/api";
import { Eye, EyeOff, Leaf, UserRound, Wrench } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
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
    setError("Please complete all fields and select a role.");
    return;
  }

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (form.password.length < 6) {
    setError("Password must contain at least 6 characters.");
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

    navigate("/");
  } catch (error) {
    console.error(error);
    setError("Unable to create account. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-[#FAFBF7] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      {/* Visual Side */}
      <section className="relative hidden overflow-hidden lg:block">
        <img
          src="/images/solar-farm.jpg"
          alt="Renewable energy farm"
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
                Renewable Intelligence
              </p>
            </div>
          </div>

          <div className="max-w-[520px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
              Renewable intelligence
            </p>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.05em] xl:text-6xl">
              Build a healthier
              <br />
              energy future.
            </h1>

            <p className="mt-6 max-w-[430px] text-sm leading-6 text-white/70">
              Monitor renewable assets, understand emerging risks, and turn
              maintenance decisions into smarter action.
            </p>
          </div>

          <p className="text-[10px] font-medium text-white/50">
            AI-assisted renewable asset intelligence
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
                  Renewable Intelligence
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#001e61]">
              Get started
            </p>

            <h2 className="mt-2 text-4xl font-semibold tracking-[-0.045em] text-[#202722]">
              Create your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#738078]">
              Choose your role to set up the right RenewAI workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-[11px] font-semibold text-[#202722]"
              >
                Full name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
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
                  Email
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
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-white px-4 text-sm text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-[11px] font-semibold text-[#202722]">
                Choose your role
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
                    Farm Owner
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#89968E]">
                    Manage farms, assets and maintenance.
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
                    Technician
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#89968E]">
                    Receive and manage maintenance work.
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
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="h-11 w-full rounded-xl border border-[#E4E9E1] bg-white px-4 pr-11 text-sm text-[#202722] outline-none transition placeholder:text-[#89968E] focus:border-[#001e61] focus:ring-2 focus:ring-[#E6ECF7]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89968E] transition hover:text-[#001e61]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
                Confirm password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
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
                      ? "Hide confirm password"
                      : "Show confirm password"
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
              Create Account
            </button>
          </form>

          <p className="mt-7 text-center text-xs text-[#738078]">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-semibold text-[#001e61] hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-5 text-center text-[10px] leading-5 text-[#89968E]">
            Registration is currently running in prototype mode. Account
            creation will be connected to the backend authentication API.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;