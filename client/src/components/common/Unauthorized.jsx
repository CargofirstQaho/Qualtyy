import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          403 - Unauthorized
        </h1>
        <p className="text-gray-600 mb-4">
          You don't have permission to access this page.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
