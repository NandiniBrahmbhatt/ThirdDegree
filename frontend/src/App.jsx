import { Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

// Authentication
import Login from "./pages/Login";
import LoginGujarati from "./pages/LoginGujarati";
import Register from "./pages/Register";
import RegisterGujarati from "./pages/RegisterGujarati";

// Technician - English
import TechnicianDashboard from "./pages/TechnicianDashboard";
import TechnicianMaintenance from "./pages/TechnicianMaintenance";
import TechnicianSafety from "./pages/TechnicianSafety";
import TechnicianGuidance from "./pages/TechnicianGuidance";

// Technician - Gujarati
import TechnicianDashboardGujarati from "./pages/TechnicianDashboardGujarati";
import TechnicianMaintenanceGujarati from "./pages/TechnicianMaintenanceGujarati";
import TechnicianSafetyGujarati from "./pages/TechnicianSafetyGujarati";
import TechnicianGuidanceGujarati from "./pages/TechnicianGuidanceGujarati";

// Farmer - English
import Dashboard from "./pages/Dashboard";
import Farms from "./pages/Farms";
import Assets from "./pages/Assets";
import AssetDetails from "./pages/AssetDetails";
import AIAnalyzer from "./pages/AIAnalyzer";
import Alerts from "./pages/Alerts";
import Monitor from "./pages/Monitor";
import Technicians from "./pages/Technicians";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Farmer - Gujarati
import DashboardGujarati from "./pages/DashboardGujarati";
import FarmsGujarati from "./pages/FarmsGujarati";
import AssetsGujarati from "./pages/AssetsGujarati";
import AssetDetailsGujarati from "./pages/AssetDetailsGujarati";
import AIAnalyzerGujarati from "./pages/AIAnalyzerGujarati";
import AlertsGujarati from "./pages/AlertsGujarati";
import MonitorGujarati from "./pages/MonitorGujarati";
import TechniciansGujarati from "./pages/TechniciansGujarati";
import ProfileGujarati from "./pages/ProfileGujarati";
import SettingsGujarati from "./pages/SettingsGujarati";


function getCurrentUser() {
  const savedUser = localStorage.getItem("renewai_user");

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch {
    return null;
  }
}


// Any logged-in user can access protected pages.
function ProtectedRoute({ children }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}


// ONLY technicians can access /technician/*
function TechnicianRoute({ children }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "technician") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


// ONLY farm owners can access farmer pages.
function FarmerRoute({ children }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "farm_owner") {
    return <Navigate to="/technician" replace />;
  }

  return children;
}


// Logged-in users should not see login/register again.
function AccountRoute({ children }) {
  const user = getCurrentUser();

  if (user) {
    if (user.role === "technician") {
      return <Navigate to="/technician" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


function App() {
  return (
    <Routes>

      {/* =====================================================
          AUTHENTICATION
      ====================================================== */}

      <Route
        path="/"
        element={
          <AccountRoute>
            <Login />
          </AccountRoute>
        }
      />

      <Route
        path="/gu/login"
        element={
          <AccountRoute>
            <LoginGujarati />
          </AccountRoute>
        }
      />

      <Route
        path="/register"
        element={
          <AccountRoute>
            <Register />
          </AccountRoute>
        }
      />

      <Route
        path="/gu/register"
        element={
          <AccountRoute>
            <RegisterGujarati />
          </AccountRoute>
        }
      />


      {/* =====================================================
          TECHNICIAN WORKSPACE - ENGLISH

          /technician
          /technician/maintenance
          /technician/safety
          /technician/guidance
      ====================================================== */}

      <Route
        path="/technician"
        element={
          <TechnicianRoute>
            <DashboardLayout />
          </TechnicianRoute>
        }
      >
        {/* Technician main dashboard */}
        <Route index element={<TechnicianDashboard />} />

        {/* Static technician information */}
        <Route
          path="maintenance"
          element={<TechnicianMaintenance />}
        />

        <Route
          path="safety"
          element={<TechnicianSafety />}
        />

        <Route
          path="guidance"
          element={<TechnicianGuidance />}
        />
      </Route>


      {/* =====================================================
          TECHNICIAN WORKSPACE - GUJARATI

          /gu/technician
          /gu/technician/maintenance
          /gu/technician/safety
          /gu/technician/guidance
      ====================================================== */}

      <Route
        path="/gu/technician"
        element={
          <TechnicianRoute>
            <DashboardLayout />
          </TechnicianRoute>
        }
      >
        {/* Gujarati technician main dashboard */}
        <Route
          index
          element={<TechnicianDashboardGujarati />}
        />

        {/* Gujarati static technician information */}
        <Route
          path="maintenance"
          element={<TechnicianMaintenanceGujarati />}
        />

        <Route
          path="safety"
          element={<TechnicianSafetyGujarati />}
        />

        <Route
          path="guidance"
          element={<TechnicianGuidanceGujarati />}
        />
      </Route>


      {/* =====================================================
          SETTINGS

          Available to BOTH technicians and farm owners.

          /settings
          /gu/settings
      ====================================================== */}

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Settings />} />
      </Route>

      <Route
        path="/gu/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SettingsGujarati />} />
      </Route>


      {/* =====================================================
          FARMER WORKSPACE
      ====================================================== */}

      <Route
        element={
          <FarmerRoute>
            <DashboardLayout />
          </FarmerRoute>
        }
      >

        {/* -------------------------
            ENGLISH
        -------------------------- */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/farms"
          element={<Farms />}
        />

        <Route
          path="/assets"
          element={<Assets />}
        />

        <Route
          path="/assets/:id"
          element={<AssetDetails />}
        />

        <Route
          path="/ai-analyzer"
          element={<AIAnalyzer />}
        />

        <Route
          path="/alerts"
          element={<Alerts />}
        />

        <Route
          path="/monitor"
          element={<Monitor />}
        />

        <Route
          path="/technicians"
          element={<Technicians />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* -------------------------
            GUJARATI
        -------------------------- */}

        <Route
          path="/gu/dashboard"
          element={<DashboardGujarati />}
        />

        <Route
          path="/gu/farms"
          element={<FarmsGujarati />}
        />

        <Route
          path="/gu/assets"
          element={<AssetsGujarati />}
        />

        <Route
          path="/gu/assets/:id"
          element={<AssetDetailsGujarati />}
        />

        <Route
          path="/gu/ai-analyzer"
          element={<AIAnalyzerGujarati />}
        />

        <Route
          path="/gu/alerts"
          element={<AlertsGujarati />}
        />

        <Route
          path="/gu/monitor"
          element={<MonitorGujarati />}
        />

        <Route
          path="/gu/technicians"
          element={<TechniciansGujarati />}
        />

        <Route
          path="/gu/profile"
          element={<ProfileGujarati />}
        />

      </Route>


      {/* =====================================================
          FALLBACK
      ====================================================== */}

      <Route
        path="*"
        element={
          getCurrentUser()?.role === "technician" ? (
            <Navigate to="/technician" replace />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />

    </Routes>
  );
}

export default App;