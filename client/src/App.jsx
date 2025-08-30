import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Auth Components
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CustomerSignup from "./components/auth/CustomerSignup";
import InspectorSignup from "./components/auth/InspectorSignup";
import CompanySignup from "./components/auth/CompanySignup";

// Dashboard Components
import CustomerDashboard from "./components/dashboard/CustomerDashboard/CustomerDashboard";
import InspectorDashboard from "./components/dashboard/InspectorDashboard/InspectorDashboard";
import CompanyDashboard from "./components/dashboard/CompanyDashboard/CompanyDashboard";

// Landing Page Components
import LandingPage from "./components/LandingPage";

// Common Components
import Unauthorized from "./components/common/Unauthorized";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/customer" element={<CustomerSignup />} />
          <Route path="/signup/inspector" element={<InspectorSignup />} />
          <Route path="/signup/company" element={<CompanySignup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard/customer"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/inspector"
            element={
              <ProtectedRoute allowedRoles={["inspector"]}>
                <InspectorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/company"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch all route - redirect to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
