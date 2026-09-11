import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  Search,
  Globe2,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

function DashboardLayout() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FAFBF7] text-[#202722]">

      <Sidebar />

      {/* Main area */}
      <main className="min-h-screen lg:ml-57">

        {/* Top bar */}
        <header className="absolute left-57 right-0 top-0 z-40 px-5 pt-5 sm:px-7 xl:px-10">
          <div className="flex items-center justify-between">

            {/* Search */}
            <div className="flex h-10 w-full max-w-132.5 items-center gap-3 rounded-full border border-[#E4E9E1] bg-[#F0F3F9]/80 px-4 backdrop-blur-md">
              <Search
                size={17}
                strokeWidth={1.8}
                className="text-[ #001e61]"
              />

              <input
                type="text"
                placeholder="Search farms, assets, or anything..."
                className="w-full bg-transparent text-[12px] text-[#202722] outline-none placeholder:text-[#89968E]"
              />
            </div>

            {/* Right controls */}
            <div className="ml-4 flex items-center gap-3">

              <button
                onClick={toggleLanguage}
                className="flex h-10 items-center gap-3 rounded-full border border-[#E4E9E1] bg-[#FAFBF7]/80 px-4 text-[12px] font-medium text-[#202722] backdrop-blur-md transition hover:bg-white"
              >
                <Globe2
                  size={16}
                  strokeWidth={1.8}
                  className="text-[#176232]"
                />

                <span>
                  {language === "en" ? "English" : "ગુજરાતી"}
                </span>

                <ChevronDown
                  size={14}
                  strokeWidth={1.8}
                  className="text-[#738078]"
                />
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5BA9D0] text-[12px] font-medium text-white">
                OP
              </div>

            </div>
          </div>
        </header>

        {/* Page */}
        <div className="min-h-screen">
          <Outlet />
        </div>

      </main>
    </div>
  );
}

export default DashboardLayout;