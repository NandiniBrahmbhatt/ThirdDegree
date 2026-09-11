import { NavLink } from "react-router-dom";
import {
  Factory,
  Cpu,
  Wrench,
  Users,
  Leaf,
  Home,
  Settings,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../services/translationService";

const navigation = [
  {
    name: "dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    name: "farms",
    path: "/farms",
    icon: Factory,
  },
  {
    name: "assets",
    path: "/assets",
    icon: Cpu,
  },
  {
    name: "maintenance",
    path: "/maintenance",
    icon: Wrench,
  },
  {
    name: "technicians",
    path: "/technicians",
    icon: Users,
  },
];

function Sidebar() {
  const { language } = useLanguage();

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-57 border-r border-[#E4E9E1] bg-[#FAFBF7] lg:block">

      {/* Brand */}
      <div className="px-7 pt-6">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[ #001e61] text-white">
            <Leaf
              size={21}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h1 className="text-[20px] font-bold leading-none tracking-[-0.04em] text-[#176232]">
              RenewAI
            </h1>

            <p className="mt-1 text-[9px] font-medium text-[#89968E]">
              Renewable Intelligence
            </p>
          </div>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="mt-9 px-5">
        <div className="space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex h-10.75 items-center gap-4 rounded-[11px] px-3 text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#E3F1E6] text-[#176232]"
                      : "text-[#202722] hover:bg-[#F0F3F9] hover:text-[#176232]"
                  }`
                }
              >
                <Icon
                  size={19}
                  strokeWidth={1.8}
                />

                <span>
                  {getTranslation(language, item.name)}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="absolute bottom-6 left-0 w-full px-7">

        <div className="mb-5 h-px bg-[#E4E9E1]" />

        <button
          className="flex w-full items-center gap-3 text-left"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E3F1F6] text-[11px] font-bold text-[#176232]">
            OP
          </div>

          <div>
            <p className="text-[12px] font-semibold text-[#202722]">
              Operator
            </p>

            <p className="text-[10px] text-[#89968E]">
              Farm Owner
            </p>
          </div>

          <Settings
            size={15}
            strokeWidth={1.7}
            className="ml-auto text-[#89968E]"
          />
        </button>

      </div>
    </aside>
  );
}

export default Sidebar;