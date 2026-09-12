import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Cpu,
  Wrench,
  Users,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  const navigationLinks = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Farms",
      path: "/farms",
      icon: Building2,
    },
    {
      label: "Assets",
      path: "/assets",
      icon: Cpu,
    },
    {
      label: "Maintenance",
      path: "/maintenance",
      icon: Wrench,
    },
    {
      label: "Technicians",
      path: "/technicians",
      icon: Users,
    },
  ];

  const accountLinks = [
    {
      label: "Profile",
      path: "/profile",
      icon: UserRound,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium transition ${
      isActive
        ? "bg-[#E8EDF7] text-[#001e61]"
        : "text-[#738078] hover:bg-[#F0F3F9] hover:text-[#001e61]"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("renewai_user");
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-57 border-r border-[#E4E9E1] bg-[#FAFBF7] lg:flex lg:flex-col">
      {/* Logo */}
      <div className="px-6 pb-8 pt-7">
        <button
          onClick={() => navigate("/dashboard")}
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

      {/* Main navigation */}
      <nav className="flex-1 px-4">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#89968E]">
          Workspace
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

        <div className="my-7 h-px bg-[#E4E9E1]" />

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#89968E]">
          Account
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
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;