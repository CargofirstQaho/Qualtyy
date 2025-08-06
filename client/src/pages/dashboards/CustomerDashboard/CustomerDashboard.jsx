// import React, { useState } from 'react';
// import Sidebar from './components/Sidebar/Sidebar';
// import DashboardStats from './components/DashboardStats/DashboardStats';
// import RaiseEnquiry from './components/RaiseEnquiry/RaiseEnquiry';
// import DetailAnalysis from './components/DetailAnalysis/DetailAnalysis';
// import CreditProfile from './components/CreditProfile/CreditProfile';
// import Payments from './components/Payments/Payments';
// import MyHistory from './components/MyHistory/MyHistory';
// import LiveInspection from './components/LiveInspection/LiveInspection';
// import BiddingRoom from './components/BiddingRoom/BiddingRoom';
// import MyAccount from './components/MyAccount/MyAccount'; // Add this import

// const CustomerDashboard = ({ user, onLogout }) => {
//     const [activeSection, setActiveSection] = useState('dashboard');
//     const [selectedInspectorData, setSelectedInspectorData] = useState(null);
//     const [selectedInspectionData, setSelectedInspectionData] = useState(null);
//     const [detailAnalysisTarget, setDetailAnalysisTarget] = useState(null);

//     // Navigation functions for dashboard
//     const handleNavigateToDetailAnalysis = (target = null) => {
//         setDetailAnalysisTarget(target);
//         setActiveSection('detail-analysis');
//     };

//     const handleNavigateToLiveInspection = () => {
//         setActiveSection('live-inspection');
//     };

//     const handleNavigateToMyHistory = () => {
//         setActiveSection('my-history');
//     };

//     const handleNavigateToPayments = () => {
//         setActiveSection('payments');
//     };

//     const handleNavigateToRaiseEnquiry = () => {
//         setActiveSection('raise-enquiry');
//     };

//     const renderContent = () => {
//         switch (activeSection) {
//             case 'dashboard':
//                 return (
//                     <DashboardStats 
//                         user={user}
//                         onNavigateToDetailAnalysis={handleNavigateToDetailAnalysis}
//                         onNavigateToLiveInspection={handleNavigateToLiveInspection}
//                         onNavigateToMyHistory={handleNavigateToMyHistory}
//                         onNavigateToPayments={handleNavigateToPayments}
//                         onNavigateToRaiseEnquiry={handleNavigateToRaiseEnquiry}
//                     />
//                 );
//             case 'myaccount': // Add this case
//                 return <MyAccount />;
//             case 'raise-enquiry':
//                 return <RaiseEnquiry />;
//             case 'detail-analysis':
//                 return (
//                     <DetailAnalysis 
//                         onNavigateToHistory={() => setActiveSection('my-history')}
//                         scrollToTarget={detailAnalysisTarget}
//                         onTargetReached={() => setDetailAnalysisTarget(null)}
//                     />
//                 );
//             case 'credit-profile':
//                 return <CreditProfile />;
//             case 'payments':
//                 return (
//                     <Payments 
//                         selectedInspector={selectedInspectorData}
//                         inspectionDetails={selectedInspectionData}
//                         onBack={() => setActiveSection('bidding-room')}
//                     />
//                 );
//             case 'my-history':
//                 return <MyHistory />;
//             case 'live-inspection':
//                 return <LiveInspection />;
//             case 'bidding-room':
//                 return (
//                     <BiddingRoom 
//                         onNavigateToPayments={(inspector, inspection) => {
//                             setSelectedInspectorData(inspector);
//                             setSelectedInspectionData(inspection);
//                             setActiveSection('payments');
//                         }} 
//                     />
//                 ); 
//             default:
//                 return <DashboardStats user={user} />;
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 flex">
//             <Sidebar
//                 user={user}
//                 activeSection={activeSection}
//                 setActiveSection={setActiveSection}
//                 onLogout={onLogout}
//             />
//             <div className="flex-1 p-6">
//                 {renderContent()}
//             </div>
//         </div>
//     );
// };

// export default CustomerDashboard;




// // src/pages/dashboards/CustomerDashboard/CustomerDashboard.jsx
// import React, { useState } from 'react';
// import { QueryProvider } from '../../../context/QueryContext';

// // Import all your existing customer dashboard components
// import Sidebar from './components/Sidebar/Sidebar';
// import DashboardStats from './components/DashboardStats/DashboardStats';
// import RaiseEnquiry from './components/RaiseEnquiry/RaiseEnquiry';
// import BiddingRoom from './components/BiddingRoom/BiddingRoom';
// import LiveInspection from './components/LiveInspection/LiveInspection';
// import DetailAnalysis from './components/DetailAnalysis/DetailAnalysis';
// import CreditProfile from './components/CreditProfile/CreditProfile';
// import MyAccount from './components/MyAccount/MyAccount';
// import Payments from './components/Payments/Payments';
// import ChatWithUs from './components/ChatWithUs/ChatWithUs';
// import MyHistory from './components/MyHistory/MyHistory';
// import ParametersModal from './components/ParametersModal/ParametersModal';

// const CustomerDashboard = () => {
//   const [activeSection, setActiveSection] = useState('dashboard');

//   const renderComponent = () => {
//     switch (activeSection) {
//       case 'dashboard':
//         return <DashboardStats onNavigate={setActiveSection} />;
//       case 'myaccount':
//         return <MyAccount />;
//       case 'raise-enquiry':
//         return <RaiseEnquiry />;
//       case 'detail-analysis':
//         return <DetailAnalysis />;
//       case 'bidding-room':
//         return <BiddingRoom />;
//       case 'credit-profile':
//         return <CreditProfile />;
//       case 'payments':
//         return <Payments />;
//       case 'my-history':
//         return <MyHistory />;
//       case 'live-inspection':
//         return <LiveInspection />;
//       case 'chat':
//         return <ChatWithUs />;
//       default:
//         return <DashboardStats onNavigate={setActiveSection} />;
//     }
//   };

//   const handleLogout = () => {
//     // Add your logout logic here
//     console.log('Logging out...');
//   };

//   return (
//     <QueryProvider>
//       <div className="flex h-screen bg-gray-50">
//         {/* Sidebar */}
//         <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
//           <Sidebar 
//             activeSection={activeSection} 
//             setActiveSection={setActiveSection}
//             onLogout={handleLogout}
//           />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 overflow-hidden">
//           <div className="h-full overflow-y-auto">
//             {renderComponent()}
//           </div>
//         </div>
//       </div>
//     </QueryProvider>
//   );
// };

// export default CustomerDashboard;


// // src/pages/dashboards/CustomerDashboard/CustomerDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { QueryProvider } from '../../../context/QueryContext';
// import { useQuery } from '../../../context/QueryContext';

// // Import all your existing customer dashboard components
// import Sidebar from './components/Sidebar/Sidebar';
// import DashboardStats from './components/DashboardStats/DashboardStats';
// import RaiseEnquiry from './components/RaiseEnquiry/RaiseEnquiry';
// import BiddingRoom from './components/BiddingRoom/BiddingRoom';
// import LiveInspection from './components/LiveInspection/LiveInspection';
// import DetailAnalysis from './components/DetailAnalysis/DetailAnalysis';
// import CreditProfile from './components/CreditProfile/CreditProfile';
// import MyAccount from './components/MyAccount/MyAccount';
// import Payments from './components/Payments/Payments';
// import ChatWithUs from './components/ChatWithUs/ChatWithUs';
// import MyHistory from './components/MyHistory/MyHistory';
// import ParametersModal from './components/ParametersModal/ParametersModal';

// // New chat components
// import CustomerActiveInspections from './components/CustomerActiveInspections/CustomerActiveInspections.jsx';
// import CustomerInspectionChat from './components/CustomerInspectionChat/CustomerInspectionChat.jsx';

// const CustomerDashboardContent = () => {
//   const [activeSection, setActiveSection] = useState('dashboard');
//   const [selectedInspection, setSelectedInspection] = useState(null);
//   const [unreadCount, setUnreadCount] = useState(0);

//   const {
//     getChatStats,
//     getActiveChats,
//     getCurrentCustomerId,
//     startMessageListener,
//     getCustomerActiveInspections
//   } = useQuery();

//   // Listen for new messages and update unread count
//   useEffect(() => {
//     const userId = getCurrentCustomerId();

//     // Initial unread count calculation
//     const updateUnreadCount = () => {
//       const activeInspections = getCustomerActiveInspections();
//       const totalUnread = activeInspections.reduce((sum, inspection) => sum + (inspection.unreadMessages || 0), 0);
//       setUnreadCount(totalUnread);
//     };

//     updateUnreadCount();

//     // Listen for new messages
//     const cleanup = startMessageListener(userId, 'customer', (messageData) => {
//       console.log('🔔 New message notification:', messageData);
//       updateUnreadCount();

//       // Show toast notification if not in chat view
//       if (activeSection !== 'chat' && messageData.message.senderType === 'inspector') {
//         console.log(`New message from ${messageData.message.senderName}: ${messageData.message.message}`);
//         // You could add a toast notification here
//       }
//     });

//     return cleanup;
//   }, [getChatStats, getActiveChats, getCurrentCustomerId, startMessageListener, activeSection, getCustomerActiveInspections]);

//   // Navigation handlers
//   const handleOpenChat = (inspection) => {
//     console.log('🗨️ Opening chat for inspection:', inspection);
//     setSelectedInspection(inspection);
//     setActiveSection('chat');
//   };

//   const handleBackFromChat = () => {
//     setSelectedInspection(null);
//     setActiveSection('dashboard');
//   };

//   // Enhanced navigation function for DashboardStats
//   const handleNavigate = (section, data = null) => {
//     if (section === 'live-inspection' || section === 'active-inspections') {
//       setActiveSection('active-inspections');
//     } else {
//       setActiveSection(section);
//     }
//   };

//   const renderComponent = () => {
//     switch (activeSection) {
//       case 'dashboard':
//         return (
//           <DashboardStats
//             onNavigateToDetailAnalysis={() => setActiveSection('detail-analysis')}
//             onNavigateToLiveInspection={() => setActiveSection('active-inspections')}
//             onNavigateToMyHistory={() => setActiveSection('my-history')}
//             onNavigateToPayments={() => setActiveSection('payments')}
//             onNavigateToRaiseEnquiry={() => setActiveSection('raise-enquiry')}
//           />
//         );
//       case 'myaccount':
//         return <MyAccount />;
//       case 'raise-enquiry':
//         return <RaiseEnquiry />;
//       case 'detail-analysis':
//         return <DetailAnalysis />;
//       case 'bidding-room':
//         // return <BiddingRoom />;
//         return (
//           <BiddingRoom
//             onNavigateToActiveInspections={() => setActiveSection('active-inspections')}
//           />
//         );
//       case 'credit-profile':
//         return <CreditProfile />;
//       case 'payments':
//         return <Payments />;
//       case 'my-history':
//         return <MyHistory />;
//       case 'live-inspection':
//       case 'active-inspections':
//         return (
//           <CustomerActiveInspections
//             onOpenChat={handleOpenChat}
//           />
//         );
//       case 'chat':
//         return (
//           <CustomerInspectionChat
//             inspection={selectedInspection}
//             onBack={handleBackFromChat}
//           />
//         );
//       case 'chat-with-us':
//         return <ChatWithUs />;
//       default:
//         return (
//           <DashboardStats
//             onNavigateToDetailAnalysis={() => setActiveSection('detail-analysis')}
//             onNavigateToLiveInspection={() => setActiveSection('active-inspections')}
//             onNavigateToMyHistory={() => setActiveSection('my-history')}
//             onNavigateToPayments={() => setActiveSection('payments')}
//             onNavigateToRaiseEnquiry={() => setActiveSection('raise-enquiry')}
//           />
//         );
//     }
//   };

//   const handleLogout = () => {
//     // Add your logout logic here
//     console.log('Logging out...');
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Enhanced Sidebar with chat indicator */}
//       <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
//         <Sidebar
//           activeSection={activeSection}
//           setActiveSection={setActiveSection}
//           onLogout={handleLogout}
//           unreadChatCount={unreadCount} // Pass unread count to sidebar
//         />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-hidden">
//         <div className="h-full overflow-y-auto">
//           {renderComponent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// const CustomerDashboard = () => {
//   return (
//     <QueryProvider>
//       <CustomerDashboardContent />
//     </QueryProvider>
//   );
// };

// export default CustomerDashboard;

// src/pages/dashboards/CustomerDashboard/CustomerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { QueryProvider } from '../../../context/QueryContext';
import { useQuery } from '../../../context/QueryContext';

// Import all your existing customer dashboard components
import Sidebar from './components/Sidebar/Sidebar';
import DashboardStats from './components/DashboardStats/DashboardStats';
import RaiseEnquiry from './components/RaiseEnquiry/RaiseEnquiry';
import BiddingRoom from './components/BiddingRoom/BiddingRoom';
import LiveInspection from './components/LiveInspection/LiveInspection';
import DetailAnalysis from './components/DetailAnalysis/DetailAnalysis';
import CreditProfile from './components/CreditProfile/CreditProfile';
import MyAccount from './components/MyAccount/MyAccount';
import Payments from './components/Payments/Payments';
import ChatWithUs from './components/ChatWithUs/ChatWithUs';
import MyHistory from './components/MyHistory/MyHistory';
import ParametersModal from './components/ParametersModal/ParametersModal';

// Enhanced chat components
import CustomerActiveInspections from './components/CustomerActiveInspections/CustomerActiveInspections.jsx';
import CustomerInspectionChat from './components/CustomerInspectionChat/CustomerInspectionChat.jsx';

const CustomerDashboardContent = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const {
    getChatStats,
    getActiveChats,
    getCurrentCustomerId,
    startMessageListener,
    getCustomerActiveInspections
  } = useQuery();

  // ✅ ENHANCED: Listen for new messages and update unread count
  useEffect(() => {
    const userId = getCurrentCustomerId();

    // Initial unread count calculation
    const updateUnreadCount = () => {
      const activeInspections = getCustomerActiveInspections();
      const totalUnread = activeInspections.reduce((sum, inspection) => sum + (inspection.unreadMessages || 0), 0);
      setUnreadCount(totalUnread);
    };

    updateUnreadCount();

    // Listen for new messages
    const cleanup = startMessageListener(userId, 'customer', (messageData) => {
      console.log('🔔 New message notification:', messageData);
      updateUnreadCount();

      // Show toast notification if not in chat view
      if (activeSection !== 'chat' && messageData.message.senderType === 'inspector') {
        console.log(`New message from ${messageData.message.senderName}: ${messageData.message.message}`);
        // You could add a toast notification here
      }
    });

    // ✅ NEW: Listen for bid confirmations to update unread count
    const handleBidConfirmed = (event) => {
      console.log('🎉 Bid confirmed, updating unread count:', event.detail);
      setTimeout(() => {
        updateUnreadCount();
      }, 1000);
    };

    window.addEventListener('bidConfirmed', handleBidConfirmed);

    return () => {
      if (cleanup) cleanup();
      window.removeEventListener('bidConfirmed', handleBidConfirmed);
    };
  }, [getChatStats, getActiveChats, getCurrentCustomerId, startMessageListener, activeSection, getCustomerActiveInspections]);

  // ✅ ENHANCED: Navigation handlers
  const handleOpenChat = (inspection) => {
    console.log('🗨️ Opening chat for inspection:', inspection);
    setSelectedInspection(inspection);
    setActiveSection('chat');
  };

  const handleBackFromChat = () => {
    setSelectedInspection(null);
    setActiveSection('active-inspections'); // ✅ Go back to active inspections
  };

  // ✅ ENHANCED: Navigation for BiddingRoom
  const handleNavigateToActiveInspections = () => {
    console.log('📍 Navigating to active inspections');
    setActiveSection('active-inspections');
  };

  // ✅ ENHANCED: Navigation function for DashboardStats
  const handleNavigate = (section, data = null) => {
    console.log('📍 Navigating to:', section, data);
    
    if (section === 'live-inspection' || section === 'active-inspections') {
      setActiveSection('active-inspections');
    } else {
      setActiveSection(section);
    }
  };

  const renderComponent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <DashboardStats
            onNavigateToDetailAnalysis={() => setActiveSection('detail-analysis')}
            onNavigateToLiveInspection={() => setActiveSection('active-inspections')}
            onNavigateToMyHistory={() => setActiveSection('my-history')}
            onNavigateToPayments={() => setActiveSection('payments')}
            onNavigateToRaiseEnquiry={() => setActiveSection('raise-enquiry')}
          />
        );
      case 'myaccount':
        return <MyAccount />;
      case 'raise-enquiry':
        return <RaiseEnquiry />;
      case 'detail-analysis':
        return <DetailAnalysis />;
      case 'bidding-room':
        return (
          <BiddingRoom
            onNavigateToActiveInspections={handleNavigateToActiveInspections} // ✅ Pass navigation
          />
        );
      case 'credit-profile':
        return <CreditProfile />;
      case 'payments':
        return <Payments />;
      case 'my-history':
        return <MyHistory />;
      case 'live-inspection':
      case 'active-inspections':
        return (
          <CustomerActiveInspections
            onOpenChat={handleOpenChat}
          />
        );
      case 'chat':
        return (
          <CustomerInspectionChat
            inspection={selectedInspection}
            onBack={handleBackFromChat}
          />
        );
      case 'chat-with-us':
        return <ChatWithUs />;
      default:
        return (
          <DashboardStats
            onNavigateToDetailAnalysis={() => setActiveSection('detail-analysis')}
            onNavigateToLiveInspection={() => setActiveSection('active-inspections')}
            onNavigateToMyHistory={() => setActiveSection('my-history')}
            onNavigateToPayments={() => setActiveSection('payments')}
            onNavigateToRaiseEnquiry={() => setActiveSection('raise-enquiry')}
          />
        );
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ✅ ENHANCED: Sidebar with chat indicator */}
      <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onLogout={handleLogout}
          unreadChatCount={unreadCount} // ✅ Pass unread count to sidebar
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

const CustomerDashboard = () => {
  return (
    <QueryProvider>
      <CustomerDashboardContent />
    </QueryProvider>
  );
};

export default CustomerDashboard;