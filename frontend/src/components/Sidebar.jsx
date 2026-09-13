import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Cpu,
  BrainCircuit,
  Bell,
  Activity,
  Users,
  UserRound,
  Settings,
  LogOut,
  Wrench,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const savedUser = localStorage.getItem("renewai_user");

  let user = null;

  try {
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch {
    user = null;
  }

  const isTechnician = user?.role === "technician";
  const isGujarati = location.pathname.startsWith("/gu/");

  // Farmer navigation
  const farmerNavigationLinks = [
    {
      label: isGujarati ? "ડેશબોર્ડ" : "Dashboard",
      path: isGujarati ? "/gu/dashboard" : "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: isGujarati ? "ફાર્મ્સ" : "Farms",
      path: isGujarati ? "/gu/farms" : "/farms",
      icon: Building2,
    },
    {
      label: isGujarati ? "એસેટ્સ" : "Assets",
      path: isGujarati ? "/gu/assets" : "/assets",
      icon: Cpu,
    },
    {
      label: isGujarati ? "AI વિશ્લેષક" : "AI Analyzer",
      path: isGujarati ? "/gu/ai-analyzer" : "/ai-analyzer",
      icon: BrainCircuit,
    },
    {
      label: isGujarati ? "ચેતવણીઓ" : "Alerts",
      path: isGujarati ? "/gu/alerts" : "/alerts",
      icon: Bell,
    },
    {
      label: isGujarati ? "મોનિટર" : "Monitor",
      path: isGujarati ? "/gu/monitor" : "/monitor",
      icon: Activity,
    },
    {
      label: isGujarati ? "ટેકનિશિયન્સ" : "Technicians",
      path: isGujarati ? "/gu/technicians" : "/technicians",
      icon: Users,
    },
  ];

  // Technician navigation
  const technicianNavigationLinks = [
    {
      label: isGujarati ? "ડેશબોર્ડ" : "Dashboard",
      path: isGujarati ? "/gu/technician" : "/technician",
      icon: LayoutDashboard,
    },
    {
      label: isGujarati ? "મેન્ટેનન્સ ટિપ્સ" : "Maintenance Tips",
      path: isGujarati
        ? "/gu/technician/maintenance"
        : "/technician/maintenance",
      icon: Wrench,
    },
    {
      label: isGujarati ? "સલામતી સાવચેતીઓ" : "Safety Precautions",
      path: isGujarati
        ? "/gu/technician/safety"
        : "/technician/safety",
      icon: ShieldCheck,
    },
    {
      label: isGujarati
        ? "સોલાર અને વિન્ડ માર્ગદર્શન"
        : "Solar & Wind Guidance",
      path: isGujarati
        ? "/gu/technician/guidance"
        : "/technician/guidance",
      icon: BookOpen,
    },
  ];

  const navigationLinks = isTechnician
    ? technicianNavigationLinks
    : farmerNavigationLinks;

  // Account links
  const accountLinks = [
    {
      label: isGujarati ? "પ્રોફાઇલ" : "Profile",
      path: isGujarati ? "/gu/profile" : "/profile",
      icon: UserRound,
    },
    {
      label: isGujarati ? "સેટિંગ્સ" : "Settings",
      path: isGujarati ? "/gu/settings" : "/settings",
      icon: Settings,
    },
  ];

  // Navigation link styling
  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium transition ${
      isActive
        ? "bg-[#E8EDF7] text-[#001e61]"
        : "text-[#738078] hover:bg-[#F0F3F9] hover:text-[#001e61]"
    }`;

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("renewai_user");
    localStorage.removeItem("renewai_token");
    navigate("/");
  };

  // Logo navigation
  const handleLogoClick = () => {
    navigate(
      isTechnician
        ? isGujarati
          ? "/gu/technician"
          : "/technician"
        : isGujarati
          ? "/gu/dashboard"
          : "/dashboard"
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-57 border-r border-[#E4E9E1] bg-[#FAFBF7] lg:flex lg:flex-col">
      {/* Logo */}
      <div className="px-6 pb-8 pt-7">
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001e61] text-[12px] font-bold text-white">
            R
          </div>

          <span className="text-[18px] font-semibold tracking-[-0.03em] text-[#202722]">
            RenewAI
          </span>
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-4">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#89968E]">
          {isGujarati ? "કાર્યસ્થળ" : "Workspace"}
        </p>

        <div className="space-y-1">
          {navigationLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClass}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-7 h-px bg-[#E4E9E1]" />

        {/* Account */}
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#89968E]">
          {isGujarati ? "એકાઉન્ટ" : "Account"}
        </p>

        <div className="space-y-1">
          {accountLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClass}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-[#E4E9E1] p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium text-[#738078] transition hover:bg-[#F0F3F9] hover:text-[#001e61]"
        >
          <LogOut size={17} strokeWidth={1.8} />
          <span>{isGujarati ? "લૉગઆઉટ" : "Logout"}</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;