import { Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Farms from "./pages/Farms";
import Assets from "./pages/Assets";
import AssetDetails from "./pages/AssetDetails";
import Maintenance from "./pages/Maintenance";
import Technicians from "./pages/Technicians";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

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

function ProtectedRoute({ children }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AccountRoute({ children }) {
  const user = getCurrentUser();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <AccountRoute>
            <Login />
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

      {/* Protected application */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/assets/:id" element={<AssetDetails />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/technicians" element={<Technicians />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;