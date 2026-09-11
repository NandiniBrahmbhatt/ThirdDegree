import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Factory,
  Cpu,
  Wrench,
  Users,
  Leaf,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../services/translationService";

const navigation = [
  { name: "dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "farms", path: "/farms", icon: Factory },
  { name: "assets", path: "/assets", icon: Cpu },
  { name: "maintenance", path: "/maintenance", icon: Wrench },
  { name: "technicians", path: "/technicians", icon: Users },
];

function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-24px)] max-w-360 -translate-x-1/2">
      <div className="rounded-[22px] border border-white/60 bg-[#FAFBF7]/95 shadow-[0_10px_40px_rgba(32,39,34,0.08)] backdrop-blur-xl">

        <div className="flex h-17 items-center justify-between px-4 sm:px-6">

          {/* Brand */}
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[ #001e61] text-white">
              <Leaf size={19} strokeWidth={2} />
            </div>

            <div className="hidden sm:block">
              <p className="text-[15px] font-bold tracking-[-0.02em] text-[#202722]">
                RenewAI
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#89968E]">
                Renewable Intelligence
              </p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold transition-all ${
                      isActive
                        ? "bg-[ #001e61] text-white shadow-sm"
                        : "text-[#738078] hover:bg-[#F0F3F9] hover:text-[#202722]"
                    }`
                  }
                >
                  <Icon size={15} strokeWidth={2} />
                  {getTranslation(language, item.name)}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">

            <button
              onClick={toggleLanguage}
              className="hidden rounded-xl border border-[#E4E9E1] bg-white px-3 py-2 text-[11px] font-bold tracking-wide text-[ #001e61] transition hover:bg-[#F0F3F9] sm:block"
            >
              {language === "en" ? "ગુજરાતી" : "EN"}
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3F1F6] text-xs font-bold text-[#176232]">
              OP
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen((current) => !current)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E4E9E1] bg-white text-[ #001e61] lg:hidden"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-[#E4E9E1] px-4 pb-4 pt-3 lg:hidden">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
                        isActive
                          ? "bg-[ #001e61] text-white"
                          : "text-[#738078] hover:bg-[#F0F3F9] hover:text-[#202722]"
                      }`
                    }
                  >
                    <Icon size={17} />
                    {getTranslation(language, item.name)}
                  </NavLink>
                );
              })}
            </nav>

            <button
              onClick={toggleLanguage}
              className="mt-3 w-full rounded-xl border border-[#E4E9E1] bg-[#F7F5F0] px-4 py-3 text-xs font-bold text-[ #001e61]"
            >
              {language === "en" ? "ગુજરાતી" : "English"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;