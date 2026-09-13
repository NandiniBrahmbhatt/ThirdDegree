import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Search, Globe2, ChevronDown } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

function DashboardLayout() {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const isGujarati = location.pathname.startsWith("/gu/");

  const getGujaratiPath = (path) => {
    if (path === "/dashboard") return "/gu/dashboard";
    if (path === "/farms") return "/gu/farms";
    if (path === "/assets") return "/gu/assets";
    if (path === "/ai-analyzer") return "/gu/ai-analyzer";
    if (path === "/alerts") return "/gu/alerts";
    if (path === "/monitor") return "/gu/monitor";
    if (path === "/technicians") return "/gu/technicians";
    if (path === "/profile") return "/gu/profile";
    if (path === "/settings") return "/gu/settings";

    if (path.startsWith("/assets/")) {
      return `/gu${path}`;
    }

    return `/gu${path}`;
  };

  const getEnglishPath = (path) => {
    if (path === "/gu/dashboard") return "/dashboard";
    if (path === "/gu/farms") return "/farms";
    if (path === "/gu/assets") return "/assets";
    if (path === "/gu/ai-analyzer") return "/ai-analyzer";
    if (path === "/gu/alerts") return "/alerts";
    if (path === "/gu/monitor") return "/monitor";
    if (path === "/gu/technicians") return "/technicians";
    if (path === "/gu/profile") return "/profile";
    if (path === "/gu/settings") return "/settings";

    if (path.startsWith("/gu/assets/")) {
      return path.replace("/gu", "");
    }

    return path.replace(/^\/gu/, "") || "/dashboard";
  };

  const handleLanguageChange = () => {
    const currentPath = location.pathname;

    if (isGujarati) {
      setLanguage("en");
      navigate(getEnglishPath(currentPath));
    } else {
      setLanguage("gu");
      navigate(getGujaratiPath(currentPath));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBF7] text-[#202722]">
      <Sidebar />

      <main className="min-h-screen lg:ml-57">
        <header className="absolute left-57 right-0 top-0 z-40 px-8 pt-5 xl:px-12">
          <div className="flex items-center justify-between gap-6">
            <div className="flex h-10.5 w-full max-w-[530px] items-center gap-3 rounded-full border border-[#E4E9E1] bg-[#F0F3F9]/80 px-4 backdrop-blur-md">
              <Search
                size={17}
                strokeWidth={1.8}
                className="text-[#001e61]"
              />

              <input
                type="text"
                placeholder={
                  isGujarati
                    ? "ફાર્મ, એસેટ અથવા કંઈપણ શોધો..."
                    : "Search farms, assets, or anything..."
                }
                className="w-full bg-transparent text-[12px] text-[#202722] outline-none placeholder:text-[#89968E]"
              />
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button
                onClick={handleLanguageChange}
                className="flex h-10.5 items-center gap-3 rounded-full border border-[#E4E9E1] bg-[#FAFBF7]/90 px-4 text-[12px] font-medium text-[#202722] backdrop-blur-md transition hover:bg-white"
              >
                <Globe2
                  size={16}
                  strokeWidth={1.8}
                  className="text-[#001e61]"
                />

                <span>
                  {isGujarati ? "English" : "ગુજરાતી"}
                </span>

                <ChevronDown
                  size={14}
                  strokeWidth={1.8}
                  className="text-[#738078]"
                />
              </button>
            </div>
          </div>
        </header>

        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;