import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import BiddingRoom from "./components/BiddingRoom";
import BidHistory from "./components/BidHistory";
import ChatWithUs from "./components/ChatWithUs";
import Dashboard from "./components/Dashboard";
import DetailAnalysis from "./components/DetailAnalysis";
import InspectionRoom from "./components/InspectionRoom";
import MyAccount from "./components/MyAccount";
import Payments from "./components/Payments";

// Additional components that were missing imports

// Updated Sidebar icons with modern designs
const DashboardIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

const BiddingIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
    />
  </svg>
);

const ChatIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
    />
  </svg>
);

const ProfileIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

const AnalysisIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const LiveChatIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z"
    />
  </svg>
);

const AccountIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const HistoryIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PaymentIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const EnquiryIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Updated Menu icons with modern hamburger and close designs
const MenuIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 8h16M4 16h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const InspectorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      sessionStorage.clear();

      if (logout) {
        logout();
      }

      navigate("/login");
    }
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: DashboardIcon,
      route: "/inspector/dashboard",
    },
    {
      id: "bidding",
      label: "Bidding Room",
      icon: BiddingIcon,
      route: "/inspector/bidding",
    },
    {
      id: "inspection",
      label: "Inspection Room",
      icon: AnalysisIcon,
      route: "/inspector/inspection",
    },
    {
      id: "chat",
      label: "Chat with Us",
      icon: ChatIcon,
      route: "/inspector/chat",
    },
    {
      id: "analysis",
      label: "Detail Analysis",
      icon: AnalysisIcon,
      route: "/inspector/analysis",
    },
    {
      id: "account",
      label: "My Account",
      icon: AccountIcon,
      route: "/inspector/account",
    },
    {
      id: "history",
      label: "Bid History",
      icon: HistoryIcon,
      route: "/inspector/history",
    },
    {
      id: "payments",
      label: "Payments",
      icon: PaymentIcon,
      route: "/inspector/payments",
    },
  ];

  const handleMenuClick = (item) => {
    setActiveTab(item.id);
    setSidebarOpen(false);
    // Navigate to the route if needed
    // navigate(item.route);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "bidding":
        return <BiddingRoom />;
      case "inspection":
        return <InspectionRoom />;
      case "chat":
        return <ChatWithUs />;

      case "analysis":
        return <DetailAnalysis />;

      case "account":
        return <MyAccount />;
      case "history":
        return <BidHistory />;
      case "payments":
        return <Payments />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar - DARK THEME */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 shadow-xl transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                {user?.fullname || user?.email}
              </p>
              <p className="text-gray-300 text-xs">Inspector</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation Menu - DARK THEME */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <IconComponent />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 text-gray-300 hover:bg-red-600 hover:text-white group"
          >
            <svg
              className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Navigation - DARK THEME */}
        <nav className="bg-gray-800 border-b border-gray-700 text-white p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 text-gray-300 hover:text-white transition-colors"
              >
                <MenuIcon />
              </button>
              <h1 className="text-xl font-semibold text-white">
                {menuItems.find((item) => item.id === activeTab)?.label ||
                  "Inspector Dashboard"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300">
                Welcome, {user?.fullname || user?.email}
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content - DARK THEME */}
        <div className="p-6 bg-gray-900 min-h-screen">{renderContent()}</div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default InspectorDashboard;
