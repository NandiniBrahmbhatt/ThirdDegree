import {
  ArrowLeft,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

function Profile() {
  const savedUser = localStorage.getItem("renewai_user");

  let user = null;

  try {
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Unable to read saved user:", error);
  }

  const email = user?.username_email || "Not connected";
  const databaseRole = user?.role || "unknown";

  const roleLabel =
    databaseRole === "farm_owner"
      ? "Farm Owner"
      : databaseRole === "technician"
        ? "Technician"
        : databaseRole;

  const displayName =
    user?.full_name ||
    (databaseRole === "farm_owner" ? "Farm Owner" : "User");

  const phone = user?.phone || "Not connected";

  return (
    <div className="min-h-screen px-8 pb-12 pt-28 xl:px-12">
      {/* Header */}
      <section className="border-b border-[#E4E9E1] pb-9">
        <Link
          to="/dashboard"
          className="group inline-flex items-center gap-2 text-[12px] font-semibold text-[#738078] transition hover:text-[#001e61]"
        >
          <ArrowLeft
            size={16}
            strokeWidth={1.8}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          Back to Dashboard
        </Link>

        <div className="mt-7 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6ECF7] text-[#001e61]">
            <UserRound size={25} strokeWidth={1.7} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
              Account
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-[#202722] sm:text-4xl">
              Your Profile
            </h1>
          </div>
        </div>

        <p className="mt-5 max-w-120 text-sm leading-6 text-[#738078]">
          View your account information and role within the RenewAI platform.
        </p>
      </section>

      <section className="grid gap-6 py-8 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Personal Information */}
        <div className="rounded-[28px] border border-[#E4E9E1] bg-white p-6 sm:p-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
              Personal information
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#202722]">
              Account details
            </h2>
          </div>

          <div className="mt-8 space-y-5">
            {/* Name */}
            <div className="flex items-start gap-4 border-b border-[#E4E9E1] pb-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0F3F9] text-[#738078]">
                <UserRound size={16} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
                  Full name
                </p>

                <p className="mt-1 text-sm font-medium text-[#202722]">
                  {displayName}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 border-b border-[#E4E9E1] pb-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0F3F9] text-[#738078]">
                <Mail size={16} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
                  Email
                </p>

                <p className="mt-1 text-sm font-medium text-[#202722]">
                  {email}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 border-b border-[#E4E9E1] pb-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0F3F9] text-[#738078]">
                <Phone size={16} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
                  Phone
                </p>

                <p className="mt-1 text-sm font-medium text-[#202722]">
                  {phone}
                </p>
              </div>
            </div>

            {/* Account Status */}
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0F3F9] text-[#738078]">
                <ShieldCheck size={16} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
                  Account status
                </p>

                <p className="mt-1 text-sm font-medium text-[#202722]">
                  Authenticated
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Role */}
        <div className="rounded-[28px] border border-[#E4E9E1] bg-[#F0F3F9] p-6 sm:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E6ECF7] text-[#001e61]">
            <ShieldCheck size={20} strokeWidth={1.7} />
          </div>

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
            User role
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#202722]">
            {roleLabel}
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#738078]">
            Your role determines which workspace and features are available
            to you.
          </p>

          <div className="mt-7 rounded-2xl border border-[#E4E9E1] bg-white p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
              Database role
            </p>

            <p className="mt-2 text-sm font-semibold text-[#001e61]">
              {databaseRole}
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-[#E6ECF7] p-4">
            <p className="text-xs leading-5 text-[#40544C]">
              {databaseRole === "farm_owner"
                ? "Farm Owner accounts can create farms, manage renewable assets, and use AI-assisted monitoring."
                : databaseRole === "technician"
                  ? "Technician accounts can manage their technician profile and support maintenance activities."
                  : "Your account role determines which workspace and features are available to you."}
            </p>
          </div>
        </div>
      </section>

      {/* Backend Connection */}
      <section className="rounded-[24px] border border-[#E4E9E1] bg-white p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
          Backend connection
        </p>

        <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-[#202722]">
          Account authentication is connected.
        </h2>

        <p className="mt-3 max-w-150 text-sm leading-6 text-[#738078]">
          Your authenticated account information is being read from the
          current RenewAI login session.
        </p>
      </section>
    </div>
  );
}

export default Profile;