import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import BiddingRoom from "./components/BiddingRoom";
import ChatWithUs from "./components/ChatWithUs";
import CreditProfile from "./components/CreditProfile";
import Dashboard from "./components/Dashboard";
import DetailAnalysis from "./components/DetailAnalysis";
import LiveChat from "./components/LiveChat";
import MyAccount from "./components/MyAccount";
import MyHistory from "./components/MyHistory";
import ParameterModal from "./components/ParametersModal";
import Payments from "./components/Payments";
import RaiseEnquiry from "./components/RaiseEnquiry";
// Sidebar icons
const DashboardIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
    />
  </svg>
);

const BiddingIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    />
  </svg>
);

const ChatIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const ProfileIcon = () => (
  <svg
    className="w-4 h-4"
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
);

const AnalysisIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const LiveChatIcon = () => (
  <svg
    className="w-4 h-4"
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

const AccountIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const HistoryIcon = () => (
  <svg
    className="w-4 h-4"
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
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
);

const EnquiryIcon = () => (
  <svg
    className="w-4 h-4"
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

const ParameterIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
    />
  </svg>
);

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
      d="M4 6h16M4 12h16M4 18h16"
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

const CustomerDashboard = () => {
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
    },
    {
      id: "bidding",
      label: "Bidding Room",
      icon: BiddingIcon,
    },
    {
      id: "chat",
      label: "Chat with Us",
      icon: ChatIcon,
    },
    {
      id: "profile",
      label: "Credit Profile",
      icon: ProfileIcon,
    },
    {
      id: "analysis",
      label: "Detail Analysis",
      icon: AnalysisIcon,
    },
    {
      id: "livechat",
      label: "Live Chat",
      icon: LiveChatIcon,
    },
    {
      id: "account",
      label: "My Account",
      icon: AccountIcon,
    },
    {
      id: "history",
      label: "My History",
      icon: HistoryIcon,
    },
    {
      id: "payments",
      label: "Payments",
      icon: PaymentIcon,
    },
    {
      id: "enquiry",
      label: "Raise Enquiry",
      icon: EnquiryIcon,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "bidding":
        return <BiddingRoom />;
      case "chat":
        return <ChatWithUs />;
      case "profile":
        return <CreditProfile />;
      case "analysis":
        return <DetailAnalysis />;
      case "livechat":
        return <LiveChat />;
      case "account":
        return <MyAccount />;
      case "history":
        return <MyHistory />;
      case "payments":
        return <Payments />;
      case "enquiry":
        return <RaiseEnquiry />;

      // default:
      //   return (
      //     <div>
      //       <div className="mb-6 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      //         <h2 className="text-xl font-semibold mb-4 text-gray-50">
      //           Profile Information
      //         </h2>
      //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      //           <div>
      //             <p className="text-sm text-gray-400">Name</p>
      //             <p className="font-semibold text-gray-50">{user?.fullname}</p>
      //           </div>
      //           <div>
      //             <p className="text-sm text-gray-400">Email</p>
      //             <p className="font-semibold text-gray-50">{user?.email}</p>
      //           </div>
      //           <div>
      //             <p className="text-sm text-gray-400">Phone</p>
      //             <p className="font-semibold text-gray-50">
      //               {user?.phone || "Not provided"}
      //             </p>
      //           </div>
      //           <div>
      //             <p className="text-sm text-gray-400">Property Type</p>
      //             <p className="font-semibold text-gray-50">
      //               {user?.propertyType || "Not specified"}
      //             </p>
      //           </div>
      //         </div>
      //       </div>

      //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      //         <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      //           <h3 className="text-lg font-semibold mb-2 text-gray-50">
      //             Request Inspection
      //           </h3>
      //           <p className="text-gray-400">Book a new inspection service</p>
      //           <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-200 font-semibold">
      //             Request Now
      //           </button>
      //         </div>

      //         <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      //           <h3 className="text-lg font-semibold mb-2 text-gray-50">
      //             My Inspections
      //           </h3>
      //           <p className="text-gray-400">View your inspection history</p>
      //           <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-200 font-semibold">
      //             View History
      //           </button>
      //         </div>
      //       </div>
      //     </div>
      //   );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar - DARK THEME */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-200 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <svg
                className="h-5 w-5 text-gray-600"
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
              <p className="text-gray-50 font-semibold text-sm">
                {user?.fullname || user?.email}
              </p>
              <p className="text-gray-50 text-xs">Customer</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation Menu - DARK THEME */}
        <nav className="p-4">
          <div className="space-y-3">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-gray-200 text-gray-800 shadow-sm"
                      : "text-gray-50 hover:bg-gray-200 hover:text-gray-800"
                  }`}
                >
                  <IconComponent />
                  <span className="font-semibold text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout Section */}
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 text-black hover:bg-red-50 hover:text-red-600 group"
          >
            <svg
              className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
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
            <span className="font-semibold text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Navigation - DARK THEME */}
        <nav className="bg-gray-900 border-b border-gray-200 text-white p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 text-gray-300 hover:text-white"
              >
                <MenuIcon />
              </button>
              <h1 className="text-xl font-semibold text-gray-50">
                {menuItems.find((item) => item.id === activeTab)?.label ||
                  "Customer Dashboard"}
              </h1>
            </div>
          </div>
        </nav>

        {/* Page Content - DARK THEME */}
        <div className="p-6 bg-gray-900 min-h-screen">{renderContent()}</div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default CustomerDashboard;
