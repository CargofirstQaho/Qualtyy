import React from 'react';
import { 
  Home, 
  Gavel, 
  BarChart3, 
  History, 
  CreditCard, 
  MessageCircle,   
  ClipboardCheck,
  User,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'myaccount', label: 'My Account', icon: Settings },
    { id: 'bidroom', label: 'Bidding Room', icon: Gavel },
    { id: 'analytics', label: 'Detail Analysis', icon: BarChart3 },
    { id: 'bidhistory', label: 'Bid History', icon: History },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'inspectionroom', label: 'Inspection Room', icon: ClipboardCheck },
    { id: 'chatwithus', label: 'Chat with Us', icon: MessageCircle },
  ];

  const handleLogout = () => {
    // Show confirmation dialog
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    
    if (confirmLogout) {
      // Clear any stored user data (localStorage, sessionStorage, etc.)
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      sessionStorage.clear();
      
      // Navigate to home page
      // If using React Router, you would use navigate('/') or history.push('/')
      // For now, using window.location for simple navigation
      window.location.href = '/';
      
      // Alternative: If you're using React Router, uncomment below and comment above
      // navigate('/');
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">John Inspector</h2>
            <p className="text-sm text-gray-500">Inspector</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gray-100 text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout Section */}
      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200 bg-white">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 text-red-600 hover:bg-red-50 hover:text-red-700 group"
        >
          <LogOut className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;