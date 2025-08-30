import React, { createContext, useState, useEffect } from "react";
import { apiService } from "../services/apiService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const userData = await apiService.getUserProfile(token);
          setUser(userData.user || userData);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem("authToken");
          console.error("Token validation failed:", error);
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.login(credentials);

      const token =
        response.token ||
        response.accessToken ||
        (response.data && response.data.token);
      const userData =
        response.user || (response.data && response.data.user) || response;

      if (token) {
        localStorage.setItem("authToken", token);
      }

      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, data: response };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData, role) => {
    try {
      setLoading(true);
      setError(null);

      let response;

      if (role === "customer") {
        response = await apiService.customerSignup(userData);
      } else if (role === "inspector") {
        response = await apiService.inspectorSignup(userData);
      } else if (role === "company") {
        response = await apiService.companySignup(userData);
      } else {
        throw new Error("Invalid role specified");
      }

      const token =
        response.token ||
        response.accessToken ||
        (response.data && response.data.token);
      const userInfo = response.user ||
        (response.data && response.data.user) || { ...userData, role };

      if (token) {
        localStorage.setItem("authToken", token);
        setUser(userInfo);
        setIsAuthenticated(true);
      }

      return { success: true, data: response };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
