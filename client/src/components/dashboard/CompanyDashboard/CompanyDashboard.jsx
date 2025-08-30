import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const CompanyDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-orange-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Company Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, {user?.name || user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-orange-700 px-3 py-1 rounded hover:bg-orange-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="p-6">
        <div className="mb-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Contact Person</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Company Name</p>
              <p className="font-medium">
                {user?.companyName || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Business License</p>
              <p className="font-medium">
                {user?.businessLicense || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Manage Inspectors</h3>
            <p className="text-gray-600">Add and manage your inspectors</p>
            <button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
              Manage Team
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Company Reports</h3>
            <p className="text-gray-600">View company performance</p>
            <button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
              View Reports
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Inspection Queue</h3>
            <p className="text-gray-600">Manage inspection assignments</p>
            <button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
              View Queue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
