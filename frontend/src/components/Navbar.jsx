import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Factory,
  Cpu,
  Wrench,
  Users,
  Leaf,
} from "lucide-react";
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

  return (
    <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-32px)] max-w-350 -translate-x-1/2">
      <div className="flex h-16 items-center justify-between rounded-2xl border border-[#E4E9E1] bg-white/95 px-5 shadow-[0_8px_30px_rgba(32,39,34,0.08)] backdrop-blur-md">
        
        <NavLink to="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#285B3B] text-white">
            <Leaf size={19} />
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight text-[#202722]">
              RenewAI
            </p>
            <p className="text-[10px] font-medium text-[#738078]">
              Renewable Intelligence
            </p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#238542] text-white shadow-sm"
                      : "text-[#738078] hover:bg-[#F1F4ED] hover:text-[#202722]"
                  }`
                }
              >
                <Icon size={16} />
                {getTranslation(language, item.name)}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="rounded-xl border border-[#E4E9E1] bg-[#F7F5F0] px-3 py-2 text-xs font-semibold text-[#285B3B] transition hover:bg-[#F1F4ED]"
          >
            {language === "en" ? "ગુજરાતી" : "EN"}
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E3F1F6] text-xs font-bold text-[#176232]">
            OP
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;