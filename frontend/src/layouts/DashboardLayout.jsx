import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#FAFBF7] text-[#202722]">
      <Navbar />

      <main className="mx-auto max-w-375 px-6 pb-10 pt-28">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;