// routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import AdminSignup from "../components/auth/AdminSignup";
// ... other imports

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/admin" element={<AdminSignup />} />
        <Route path="/signup/customer" element={<CustomerSignup />} />
        <Route path="/signup/inspector" element={<InspectorSignup />} />
        <Route path="/signup/company" element={<CompanySignup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
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

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
};
