// import React from 'react';
// import { 
//   User, 
//   BarChart3, 
//   Plus, 
//   TrendingUp, 
//   Edit, 
//   CreditCard, 
//   DollarSign, 
//   History, 
//   Video, 
//   MessageCircle,
//   Settings,
//   LogOut
// } from 'lucide-react';

// const Sidebar = ({ user, activeSection, setActiveSection, onLogout }) => {
//   const sidebarItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
//     { id: 'myaccount', label: 'My Account', icon: Settings }, // Add My Account
//     { id: 'raise-enquiry', label: 'Raise Enquiry', icon: Plus },
//     { id: 'detail-analysis', label: 'Detail Analysis', icon: TrendingUp },
//     { id: 'bidding-room', label: 'Bidding Room', icon: Edit },
//     { id: 'credit-profile', label: 'Credit Profile', icon: CreditCard },
//     { id: 'payments', label: 'Payments', icon: DollarSign },
//     { id: 'my-history', label: 'My History', icon: History },
//     { id: 'live-inspection', label: 'Live Inspection', icon: Video },
//     { id: 'chat', label: 'Chat with Us', icon: MessageCircle }
//   ];

//   const handleLogout = () => {
//     // Show confirmation dialog
//     const confirmLogout = window.confirm('Are you sure you want to logout?');
    
//     if (confirmLogout) {
//       // Clear any stored user data (localStorage, sessionStorage, etc.)
//       localStorage.removeItem('userToken');
//       localStorage.removeItem('userData');
//       sessionStorage.clear();
      
//       // Call the onLogout function passed from parent
//       if (onLogout) {
//         onLogout();
//       }
      
//       // Navigate to home page
//       // If using React Router, you would use navigate('/') or history.push('/')
//       // For now, using window.location for simple navigation
//       window.location.href = '/';
      
//       // Alternative: If you're using React Router, uncomment below and comment above
//       // navigate('/');
//     }
//   };

//   return (
//     <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
//       {/* User Profile Section */}
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center space-x-3">
//           <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
//             <User className="h-6 w-6 text-gray-600" />
//           </div>
//           <div>
//             <p className="text-gray-900 font-semibold">{user?.name || 'John Customer'}</p>
//             <p className="text-gray-500 text-sm">Customer</p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="p-6">
//         <div className="space-y-2">
//           {sidebarItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveSection(item.id)}
//                 className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
//                   activeSection === item.id
//                     ? 'bg-gray-100 text-gray-900 shadow-sm'
//                     : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//                 }`}
//               >
//                 <Icon className="h-5 w-5" />
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </nav>

//       {/* Logout Section */}
//       <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200 bg-white">
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 text-red-600 hover:bg-red-50 hover:text-red-700 group"
//         >
//           <LogOut className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
//           <span className="font-medium">Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// Replace your Sidebar component with this debug version temporarily


// Clean version of your Sidebar (remove all debug elements)
// Sidebar with reduced gaps - all items visible without scrolling

// import React from 'react';
// import { 
//   User, 
//   BarChart3, 
//   Plus, 
//   TrendingUp, 
//   Edit, 
//   CreditCard, 
//   DollarSign, 
//   History, 
//   Video, 
//   MessageCircle,
//   Settings,
//   LogOut
// } from 'lucide-react';

// const Sidebar = ({ user, activeSection, setActiveSection, onLogout }) => {
//   const sidebarItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
//     { id: 'myaccount', label: 'My Account', icon: Settings },
//     { id: 'raise-enquiry', label: 'Raise Enquiry', icon: Plus },
//     { id: 'detail-analysis', label: 'Detail Analysis', icon: TrendingUp },
//     { id: 'bidding-room', label: 'Bidding Room', icon: Edit },
//     { id: 'credit-profile', label: 'Credit Profile', icon: CreditCard },
//     { id: 'payments', label: 'Payments', icon: DollarSign },
//     { id: 'my-history', label: 'My History', icon: History },
//     { id: 'live-inspection', label: 'Live Inspection', icon: Video },
//     { id: 'chat', label: 'Chat with Us', icon: MessageCircle }
//   ];

//   const handleLogout = () => {
//     const confirmLogout = window.confirm('Are you sure you want to logout?');
    
//     if (confirmLogout) {
//       localStorage.removeItem('userToken');
//       localStorage.removeItem('userData');
//       sessionStorage.clear();
      
//       if (onLogout) {
//         onLogout();
//       }
      
//       window.location.href = '/';
//     }
//   };

//   return (
//     <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
//       {/* User Profile Section - Reduced padding */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
//             <User className="h-5 w-5 text-gray-600" />
//           </div>
//           <div>
//             <p className="text-gray-900 font-semibold text-sm">{user?.name || 'John Customer'}</p>
//             <p className="text-gray-500 text-xs">Customer</p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Menu - Reduced spacing */}
//       <nav className="p-4">
//         <div className="space-y-3"> {/* Reduced from space-y-2 to space-y-1 */}
//           {sidebarItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveSection(item.id)}
//                 className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
//                   activeSection === item.id
//                     ? 'bg-gray-100 text-gray-900 shadow-sm'
//                     : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 <span className="font-medium text-sm">{item.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </nav>

//       {/* Logout Section - Reduced padding */}
//       <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-white">
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 text-red-600 hover:bg-red-50 hover:text-red-700 group"
//         >
//           <LogOut className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
//           <span className="font-medium text-sm">Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React from 'react';
import { 
  User, 
  BarChart3, 
  Plus, 
  TrendingUp, 
  Edit, 
  CreditCard, 
  DollarSign, 
  History, 
  Video, 
  MessageCircle,
  Settings,
  LogOut,
  Eye // Added for Active Inspections
} from 'lucide-react';

const Sidebar = ({ user, activeSection, setActiveSection, onLogout, unreadChatCount = 0 }) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'myaccount', label: 'My Account', icon: Settings },
    { id: 'raise-enquiry', label: 'Raise Enquiry', icon: Plus },
    { id: 'detail-analysis', label: 'Detail Analysis', icon: TrendingUp },
    { id: 'bidding-room', label: 'Bidding Room', icon: Edit },
    { 
      id: 'active-inspections', 
      label: 'Active Inspections', 
      icon: Eye, 
      badge: unreadChatCount > 0 ? unreadChatCount : null // ✅ NEW: Chat badge
    },
    { id: 'credit-profile', label: 'Credit Profile', icon: CreditCard },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'my-history', label: 'My History', icon: History },
    { id: 'live-inspection', label: 'Live Inspection', icon: Video },
    { id: 'chat-with-us', label: 'Chat with Us', icon: MessageCircle } // ✅ UPDATED: Changed ID to avoid conflict
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    
    if (confirmLogout) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      sessionStorage.clear();
      
      if (onLogout) {
        onLogout();
      }
      
      window.location.href = '/';
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      {/* User Profile Section - Reduced padding */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-sm">{user?.name || 'John Customer'}</p>
            <p className="text-gray-500 text-xs">Customer</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Enhanced with badges */}
      <nav className="p-4">
        <div className="space-y-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gray-100 text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {/* ✅ UPDATED: Left side with icon and label */}
                <div className="flex items-center space-x-3">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                
                {/* ✅ NEW: Right side with badge if present */}
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ✅ NEW: Chat Status Indicator */}
      {unreadChatCount > 0 && (
        <div className="px-4 mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4 text-blue-600" />
              <span className="text-blue-800 text-sm font-medium">
                {unreadChatCount} new message{unreadChatCount > 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-blue-600 text-xs mt-1">
              Click "Active Inspections" to view chats
            </p>
          </div>
        </div>
      )}

      {/* Logout Section - Reduced padding */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-white">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 text-red-600 hover:bg-red-50 hover:text-red-700 group"
        >
          <LogOut className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;