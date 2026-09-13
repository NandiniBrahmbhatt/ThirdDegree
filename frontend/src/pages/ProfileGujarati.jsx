import {
  ArrowLeft,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

function ProfileGujarati() {
  const savedUser = localStorage.getItem("renewai_user");

  let user = null;

  try {
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Unable to read saved user:", error);
  }

  const email = user?.username_email || "કનેક્ટેડ નથી";
  const databaseRole = user?.role || "unknown";

  const roleLabel =
    databaseRole === "farm_owner"
      ? "ફાર્મ માલિક"
      : databaseRole === "technician"
        ? "ટેકનિશિયન"
        : databaseRole;

  const displayName =
    user?.full_name ||
    (databaseRole === "farm_owner" ? "ફાર્મ માલિક" : "વપરાશકર્તા");

  const phone = user?.phone || "કનેક્ટેડ નથી";

  const backPath =
    databaseRole === "technician" ? "/gu/technician" : "/gu/dashboard";

  const backLabel =
    databaseRole === "technician"
      ? "ટેકનિશિયન ડેશબોર્ડ પર પાછા જાઓ"
      : "ડેશબોર્ડ પર પાછા જાઓ";

  return (
    <div className="min-h-screen px-8 pb-12 pt-28 xl:px-12">
      {/* Header */}
      <section className="border-b border-[#E4E9E1] pb-9">
        <Link
          to={backPath}
          className="group inline-flex items-center gap-2 text-[12px] font-semibold text-[#738078] transition hover:text-[#001e61]"
        >
          <ArrowLeft
            size={16}
            strokeWidth={1.8}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          {backLabel}
        </Link>

        <div className="mt-7 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6ECF7] text-[#001e61]">
            <UserRound size={25} strokeWidth={1.7} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
              એકાઉન્ટ
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-[#202722] sm:text-4xl">
              તમારી પ્રોફાઇલ
            </h1>
          </div>
        </div>

        <p className="mt-5 max-w-120 text-sm leading-6 text-[#738078]">
          RenewAI પ્લેટફોર્મ પર તમારી એકાઉન્ટ માહિતી અને ભૂમિકા જુઓ.
        </p>
      </section>

      <section className="grid gap-6 py-8 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Personal Information */}
        <div className="rounded-[28px] border border-[#E4E9E1] bg-white p-6 sm:p-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
              વ્યક્તિગત માહિતી
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#202722]">
              એકાઉન્ટ વિગતો
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
                  પૂરું નામ
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
                  ઈમેલ
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
                  ફોન
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
                  એકાઉન્ટ સ્થિતિ
                </p>

                <p className="mt-1 text-sm font-medium text-[#202722]">
                  પ્રમાણિત
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
            વપરાશકર્તાની ભૂમિકા
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#202722]">
            {roleLabel}
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#738078]">
            તમારી ભૂમિકા નક્કી કરે છે કે તમારા માટે કયું વર્કસ્પેસ અને કઈ
            સુવિધાઓ ઉપલબ્ધ છે.
          </p>

          <div className="mt-7 rounded-2xl border border-[#E4E9E1] bg-white p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
              ડેટાબેઝ ભૂમિકા
            </p>

            <p className="mt-2 text-sm font-semibold text-[#001e61]">
              {databaseRole}
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-[#E6ECF7] p-4">
            <p className="text-xs leading-5 text-[#40544C]">
              {databaseRole === "farm_owner"
                ? "ફાર્મ માલિક એકાઉન્ટથી તમે ફાર્મ બનાવી શકો છો, રિન્યુએબલ એસેટ મેનેજ કરી શકો છો અને AI આધારિત મોનિટરિંગનો ઉપયોગ કરી શકો છો."
                : databaseRole === "technician"
                  ? "ટેકનિશિયન એકાઉન્ટથી તમે તમારી ટેકનિશિયન પ્રોફાઇલ મેનેજ કરી શકો છો અને મેન્ટેનન્સ પ્રવૃત્તિઓમાં સહાય કરી શકો છો."
                  : "તમારી એકાઉન્ટ ભૂમિકા નક્કી કરે છે કે તમારા માટે કયું વર્કસ્પેસ અને કઈ સુવિધાઓ ઉપલબ્ધ છે."}
            </p>
          </div>
        </div>
      </section>

      {/* Backend Connection */}
      <section className="rounded-[24px] border border-[#E4E9E1] bg-white p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#001e61]">
          બેકએન્ડ કનેક્શન
        </p>

        <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-[#202722]">
          એકાઉન્ટ ઓથેન્ટિકેશન કનેક્ટેડ છે.
        </h2>

        <p className="mt-3 max-w-150 text-sm leading-6 text-[#738078]">
          તમારી પ્રમાણિત એકાઉન્ટ માહિતી વર્તમાન RenewAI લોગિન સેશનમાંથી
          વાંચવામાં આવી રહી છે.
        </p>
      </section>
    </div>
  );
}

export default ProfileGujarati;