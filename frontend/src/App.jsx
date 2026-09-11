import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Farms from "./pages/Farms";
import Assets from "./pages/Assets";
import AssetDetails from "./pages/AssetDetails";
import Maintenance from "./pages/Maintenance";
import Technicians from "./pages/Technicians";
import TechnicianDashboard from "./pages/TechnicianDashboard";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/farms" element={<Farms />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/assets/:id" element={<AssetDetails />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/technicians" element={<Technicians />} />
        </Route>

        <Route path="/technician" element={<TechnicianDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;