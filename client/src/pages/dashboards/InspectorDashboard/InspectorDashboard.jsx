// // import Sidebar from './components/InspectorSidebar/InspectorSidebar';
// // import Dashboard from './components/Dashboard/Dashboard';
// // import BidHistory from './components/BidHistory/BidHistory';
// // import DetailAnalysis from './components/Analytics/Analytics';
// // import BiddingRoom from './components/BidRoom/BidRoom';
// // import Payments from './components/Payments/Payments';
// // import InspectionRoom from './components/InspectionRoom/InspectionRoom';
// // import MyAccount from './components/MyAccount/MyAccount';
// // import { useState } from 'react';

// // // Placeholder components for other sections
// // const ChatWithUs = () => (
// //   <div className="p-6">
// //     <h1 className="text-2xl font-bold text-gray-900 mb-4">Chat with Us</h1>
// //     <div className="bg-white rounded-xl p-6 border border-gray-200">
// //       <p className="text-gray-600">Chat feature will be implemented here.</p>
// //     </div>
// //   </div>
// // );

// // const InspectorDashboard = () => {
// //   const [activeSection, setActiveSection] = useState('dashboard');
// //   const [submittedBids, setSubmittedBids] = useState([]); // Shared state for bids
// //   const [cancellationMessages, setCancellationMessages] = useState([]); // Shared state for cancellations

// //   // Navigation functions for dashboard
// //   const handleNavigateToBidRoom = () => {
// //     setActiveSection('bidroom');
// //   };

// //   const handleNavigateToInspectionRoom = () => {
// //     setActiveSection('inspectionroom');
// //   };

// //   const handleNavigateToAnalytics = () => {
// //     setActiveSection('analytics');
// //   };

// //   const handleNavigateToPayments = () => {
// //     setActiveSection('payments');
// //   };

// //   const handleNavigateToBidHistory = () => {
// //     setActiveSection('bidhistory');
// //   };

// //   // Handle new bid submission from BiddingRoom
// //   const handleBidSubmitted = (newBid) => {
// //     setSubmittedBids(prev => [newBid, ...prev]);
// //     console.log('New bid submitted:', newBid); // For debugging
// //   };

// //   // Handle inspection cancellation from BidHistory
// //   const handleInspectionCancelled = (cancellationMessage) => {
// //     setCancellationMessages(prev => [...prev, cancellationMessage]);
// //     console.log('Inspection cancelled:', cancellationMessage); // For debugging
// //   };

// //   // Function to render the active component
// //   const renderActiveComponent = () => {
// //     switch (activeSection) {
// //       case 'dashboard':
// //         return (
// //           <Dashboard 
// //             onNavigateToBidRoom={handleNavigateToBidRoom}
// //             onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
// //             onNavigateToAnalytics={handleNavigateToAnalytics}
// //             onNavigateToPayments={handleNavigateToPayments}
// //             onNavigateToBidHistory={handleNavigateToBidHistory}
// //           />
// //         );
// //       case 'myaccount':
// //         return <MyAccount />;
// //       case 'bidroom':
// //         return <BiddingRoom onBidSubmitted={handleBidSubmitted} />;
// //       case 'analytics':
// //         return (
// //           <DetailAnalysis 
// //             onNavigateToBidHistory={handleNavigateToBidHistory}
// //             onNavigateToPayments={handleNavigateToPayments}
// //             onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
// //             onNavigateToBidRoom={handleNavigateToBidRoom}
// //           />
// //         );
// //       case 'bidhistory':
// //         return <BidHistory newBids={submittedBids} onInspectionCancelled={handleInspectionCancelled} />;
// //       case 'payments':
// //         return <Payments />;
// //       case 'chatwithus':
// //         return <ChatWithUs />;
// //       case 'inspectionroom':
// //         return <InspectionRoom cancellationMessages={cancellationMessages} />;
// //       default:
// //         return (
// //           <Dashboard 
// //             onNavigateToBidRoom={handleNavigateToBidRoom}
// //             onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
// //             onNavigateToAnalytics={handleNavigateToAnalytics}
// //             onNavigateToPayments={handleNavigateToPayments}
// //             onNavigateToBidHistory={handleNavigateToBidHistory}
// //           />
// //         );
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex">
// //       {/* Sidebar */}
// //       <Sidebar 
// //         activeSection={activeSection} 
// //         setActiveSection={setActiveSection}
// //       />
      
// //       {/* Main Content Area */}
// //       <div className="flex-1">
// //         {renderActiveComponent()}
// //       </div>
// //     </div>
// //   );
// // };

// // export default InspectorDashboard;

// src/pages/dashboards/InspectorDashboard/InspectorDashboard.jsx
// import React, { useState } from 'react';
// import { QueryProvider } from '../../../context/QueryContext';

// // Import all your existing inspector dashboard components
// import InspectorSidebar from './components/InspectorSidebar/InspectorSidebar';
// import Dashboard from './components/Dashboard/Dashboard';
// import BidRoom from './components/BidRoom/BidRoom';
// import InspectionRoom from './components/InspectionRoom/InspectionRoom';
// import Analytics from './components/Analytics/Analytics';
// import BidHistory from './components/BidHistory/BidHistory';
// import MyAccount from './components/MyAccount/MyAccount';
// import Payments from './components/Payments/Payments';
// import ChatWithUs from './components/ChatWithUs/ChatWithUs';

// const InspectorDashboard = () => {
//   const [activeComponent, setActiveComponent] = useState('dashboard');
//   const [selectedInspection, setSelectedInspection] = useState(null);

//   // Navigation handlers with inspection data
//   const handleNavigateToBidRoom = () => setActiveComponent('bid-room');
  
//   const handleNavigateToInspectionRoom = (inspectionData = null) => {
//     console.log('📍 Navigating to inspection room with data:', inspectionData);
    
//     // Set the inspection data if provided
//     if (inspectionData) {
//       setSelectedInspection(inspectionData);
//       console.log('✅ Selected inspection set:', inspectionData);
//     }
    
//     setActiveComponent('inspection-room');
//   };
  
//   const handleNavigateToAnalytics = () => setActiveComponent('analytics');
//   const handleNavigateToPayments = () => setActiveComponent('payments');
//   const handleNavigateToBidHistory = () => setActiveComponent('bid-history');

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'dashboard':
//         return (
//           <Dashboard 
//             onNavigateToBidRoom={handleNavigateToBidRoom}
//             onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
//             onNavigateToAnalytics={handleNavigateToAnalytics}
//             onNavigateToPayments={handleNavigateToPayments}
//             onNavigateToBidHistory={handleNavigateToBidHistory}
//           />
//         );
//       case 'bid-room':
//         return <BidRoom />;
//       case 'inspection-room':
//         return (
//           <InspectionRoom 
//             selectedInspection={selectedInspection} // ✅ Fixed: Changed from 'inspectionData'
//             onBack={() => setActiveComponent('dashboard')}
//           />
//         );
//       case 'analytics':
//         return <Analytics />;
//       case 'bid-history':
//         return <BidHistory />;
//       case 'my-account':
//         return <MyAccount />;
//       case 'payments':
//         return <Payments />;
//       case 'chat':
//         return <ChatWithUs />;
//       default:
//         return (
//           <Dashboard 
//             onNavigateToBidRoom={handleNavigateToBidRoom}
//             onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
//             onNavigateToAnalytics={handleNavigateToAnalytics}
//             onNavigateToPayments={handleNavigateToPayments}
//             onNavigateToBidHistory={handleNavigateToBidHistory}
//           />
//         );
//     }
//   };

//   return (
//     <QueryProvider>
//       <div className="flex h-screen bg-gray-50">
//         {/* Sidebar */}
//         <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
//           <InspectorSidebar 
//             activeSection={activeComponent} 
//             setActiveSection={setActiveComponent} 
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

// export default InspectorDashboard;






// // src/pages/dashboards/InspectorDashboard/InspectorDashboard.jsx
// import React, { useState } from 'react';
// import { QueryProvider } from '../../../context/QueryContext';

// // Import all your existing inspector dashboard components
// import InspectorSidebar from './components/InspectorSidebar/InspectorSidebar';
// import Dashboard from './components/Dashboard/Dashboard';
// import BidRoom from './components/BidRoom/BidRoom';
// import InspectionRoom from './components/InspectionRoom/InspectionRoom';
// import Analytics from './components/Analytics/Analytics';
// import BidHistory from './components/BidHistory/BidHistory';
// import MyAccount from './components/MyAccount/MyAccount';
// import Payments from './components/Payments/Payments';
// import ChatWithUs from './components/ChatWithUs/ChatWithUs';
// import NotificationPopup from './components/NotificationPopup/NotificationPopup'; // ✅ Added this import
// import DebugNotifications from './components/DebugNotifications/DebugNotifications';

// const InspectorDashboard = () => {
//   const [activeComponent, setActiveComponent] = useState('dashboard');
//   const [selectedInspection, setSelectedInspection] = useState(null);

//   // Navigation handlers with inspection data
//   const handleNavigateToBidRoom = () => setActiveComponent('bid-room');
  
//   const handleNavigateToInspectionRoom = (inspectionData = null) => {
//     console.log('📍 Navigating to inspection room with data:', inspectionData);
    
//     // Set the inspection data if provided
//     if (inspectionData) {
//       setSelectedInspection(inspectionData);
//       console.log('✅ Selected inspection set:', inspectionData);
//     }
    
//     setActiveComponent('inspection-room');
//   };
  
//   const handleNavigateToAnalytics = () => setActiveComponent('analytics');
//   const handleNavigateToPayments = () => setActiveComponent('payments');
//   const handleNavigateToBidHistory = () => setActiveComponent('bid-history');

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'dashboard':
//         return (
//           <Dashboard 
//             onNavigateToBidRoom={handleNavigateToBidRoom}
//             onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
//             onNavigateToAnalytics={handleNavigateToAnalytics}
//             onNavigateToPayments={handleNavigateToPayments}
//             onNavigateToBidHistory={handleNavigateToBidHistory}
//           />
//         );
//       case 'bid-room':
//         return <BidRoom />;
//       case 'inspection-room':
//         return (
//           <InspectionRoom 
//             selectedInspection={selectedInspection}
//             onBack={() => setActiveComponent('dashboard')}
//           />
//         );
//       case 'analytics':
//         return <Analytics />;
//       case 'bid-history':
//         return <BidHistory />;
//       case 'my-account':
//         return <MyAccount />;
//       case 'payments':
//         return <Payments />;
//       case 'chat':
//         return <ChatWithUs />;
//       default:
//         return (
//           <Dashboard 
//             onNavigateToBidRoom={handleNavigateToBidRoom}
//             onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
//             onNavigateToAnalytics={handleNavigateToAnalytics}
//             onNavigateToPayments={handleNavigateToPayments}
//             onNavigateToBidHistory={handleNavigateToBidHistory}
//           />
//         );
//     }
//   };

//   return (
//     <QueryProvider>
//       <div className="flex h-screen bg-gray-50">
//         {/* Sidebar */}
//         <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
//           <InspectorSidebar 
//             activeSection={activeComponent} 
//             setActiveSection={setActiveComponent} 
//           />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 overflow-hidden">
//           <div className="h-full overflow-y-auto">
//             {renderComponent()}
//           </div>
//         </div>

//         {/* ✅ Notification Popup - renders on top of everything */}
//         <NotificationPopup 
//           onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
//         />

//         {/* ✅ Debug Component - TEMPORARILY add this for testing */}
//         {/* <DebugNotifications /> */}
//       </div>
//     </QueryProvider>
//   );
// };

// export default InspectorDashboard;







// // src/pages/dashboards/InspectorDashboard/InspectorDashboard.jsx
// import React, { useState } from 'react';
// import { useQuery } from '../../../context/QueryContext';
// import { QueryProvider } from '../../../context/QueryContext';

// // Import all your existing inspector dashboard components
// import InspectorSidebar from './components/InspectorSidebar/InspectorSidebar';
// import Dashboard from './components/Dashboard/Dashboard';
// import BidRoom from './components/BidRoom/BidRoom';
// import InspectionRoom from './components/InspectionRoom/InspectionRoom';
// import Analytics from './components/Analytics/Analytics';
// import BidHistory from './components/BidHistory/BidHistory';
// import MyAccount from './components/MyAccount/MyAccount';
// import Payments from './components/Payments/Payments';
// import ChatWithUs from './components/ChatWithUs/ChatWithUs';
// import NotificationPopup from './components/NotificationPopup/NotificationPopup'; // ✅ Added this import
// import DebugNotifications from './components/DebugNotifications/DebugNotifications';

// const InspectorDashboard = () => {
//   const [activeComponent, setActiveComponent] = useState('dashboard');
//   const [selectedInspection, setSelectedInspection] = useState(null);


//   const { debug } = useQuery();

//   // Navigation handlers with inspection data
//   const handleNavigateToBidRoom = () => setActiveComponent('bid-room');
  
//   const handleNavigateToInspectionRoom = (inspectionData = null) => {
//     console.log('📍 Navigating to inspection room with data:', inspectionData);
    
//     // Set the inspection data if provided
//     if (inspectionData) {
//       setSelectedInspection(inspectionData);
//       console.log('✅ Selected inspection set:', inspectionData);
//     }
    
//     setActiveComponent('inspection-room');
//   };
  
//   const handleNavigateToAnalytics = () => setActiveComponent('analytics');
//   const handleNavigateToPayments = () => setActiveComponent('payments');
//   const handleNavigateToBidHistory = () => setActiveComponent('bid-history');

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'dashboard':
//         return (
//           <Dashboard 
//             onNavigateToBidRoom={handleNavigateToBidRoom}
//             onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
//             onNavigateToAnalytics={handleNavigateToAnalytics}
//             onNavigateToPayments={handleNavigateToPayments}
//             onNavigateToBidHistory={handleNavigateToBidHistory}
//           />
//         );
//       case 'bid-room':
//         return <BidRoom />;
//       case 'inspection-room':
//         return (
//           <InspectionRoom 
//             selectedInspection={selectedInspection}
//             onBack={() => setActiveComponent('dashboard')}
//           />
//         );
//       case 'analytics':
//         return <Analytics />;
//       case 'bid-history':
//         return <BidHistory />;
//       case 'my-account':
//         return <MyAccount />;
//       case 'payments':
//         return <Payments />;
//       case 'chat':
//         return <ChatWithUs />;
//       default:
//         return (
//           <Dashboard 
//             onNavigateToBidRoom={handleNavigateToBidRoom}
//             onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
//             onNavigateToAnalytics={handleNavigateToAnalytics}
//             onNavigateToPayments={handleNavigateToPayments}
//             onNavigateToBidHistory={handleNavigateToBidHistory}
//           />
//         );
//     }
//   };

//   return (
//     <QueryProvider>
//       <div className="flex h-screen bg-gray-50">
//         <div className="fixed top-4 right-4 z-50 space-x-2">
  
// </div>
//         {/* Sidebar */}
//         <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
//           <InspectorSidebar 
//             activeSection={activeComponent} 
//             setActiveSection={setActiveComponent} 
//           />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 overflow-hidden">
//           <div className="h-full overflow-y-auto">
//             {renderComponent()}
//           </div>
//         </div>

//         {/* ✅ Notification Popup - renders on top of everything */}
//         <NotificationPopup 
//           onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
//         />

//         {/* ✅ Debug Component - TEMPORARILY add this for testing */}
//         {/* <DebugNotifications /> */}
//       </div>
//     </QueryProvider>
//   );
// };

// export default InspectorDashboard;



// // src/pages/dashboards/InspectorDashboard/InspectorDashboard.jsx
// import React, { useState } from 'react';
// import { useQuery } from '../../../context/QueryContext';
// import { QueryProvider } from '../../../context/QueryContext';

// // Import all your existing inspector dashboard components
// import InspectorSidebar from './components/InspectorSidebar/InspectorSidebar';
// import Dashboard from './components/Dashboard/Dashboard';
// import BidRoom from './components/BidRoom/BidRoom';
// import InspectionRoom from './components/InspectionRoom/InspectionRoom';
// import Analytics from './components/Analytics/Analytics';
// import BidHistory from './components/BidHistory/BidHistory';
// import MyAccount from './components/MyAccount/MyAccount';
// import Payments from './components/Payments/Payments';
// import ChatWithUs from './components/ChatWithUs/ChatWithUs';
// import NotificationPopup from './components/NotificationPopup/NotificationPopup';
// import DebugNotifications from './components/DebugNotifications/DebugNotifications';

// const InspectorDashboard = () => {
//   const [activeComponent, setActiveComponent] = useState('dashboard');
//   const [selectedInspection, setSelectedInspection] = useState(null);

//   const { debug } = useQuery();

//   // ✅ ENHANCED NAVIGATION HANDLERS
//   const handleNavigateToBidRoom = () => {
//     console.log('📍 Navigating to bid room');
//     setActiveComponent('bid-room');
//   };
  
//   const handleNavigateToInspectionRoom = (inspectionData = null) => {
//     console.log('📍 Navigating to inspection room with data:', inspectionData);
    
//     // Set the inspection data if provided
//     if (inspectionData) {
//       setSelectedInspection(inspectionData);
//       console.log('✅ Selected inspection set:', inspectionData);
//     }
    
//     setActiveComponent('inspection-room');
//   };
  
//   const handleNavigateToAnalytics = () => setActiveComponent('analytics');
//   const handleNavigateToPayments = () => setActiveComponent('payments');
//   const handleNavigateToBidHistory = () => setActiveComponent('bid-history');

//   // ✅ ENHANCED BID SUBMITTED HANDLER
//   const handleBidSubmitted = (bidData) => {
//     console.log('📋 Bid submitted:', bidData);
//     // You can add any additional logic here if needed
//   };

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'dashboard':
//         return (
//           <Dashboard 
//             onNavigateToBidRoom={handleNavigateToBidRoom}
//             onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
//             onNavigateToAnalytics={handleNavigateToAnalytics}
//             onNavigateToPayments={handleNavigateToPayments}
//             onNavigateToBidHistory={handleNavigateToBidHistory}
//           />
//         );
//       case 'bid-room':
//         return (
//           <BidRoom 
//             onBidSubmitted={handleBidSubmitted}
//             onNavigateToInspectionRoom={handleNavigateToInspectionRoom} // ✅ PASS NAVIGATION FUNCTION
//           />
//         );
//       case 'inspection-room':
//         return (
//           <InspectionRoom 
//             selectedInspection={selectedInspection}
//             onBack={() => {
//               console.log('🔙 Returning from inspection room');
//               setSelectedInspection(null); // Clear selected inspection
//               setActiveComponent('dashboard');
//             }}
//           />
//         );
//       case 'analytics':
//         return <Analytics />;
//       case 'bid-history':
//         return <BidHistory />;
//       case 'my-account':
//         return <MyAccount />;
//       case 'payments':
//         return <Payments />;
//       case 'chat':
//         return <ChatWithUs />;
//       default:
//         return (
//           <Dashboard 
//             onNavigateToBidRoom={handleNavigateToBidRoom}
//             onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
//             onNavigateToAnalytics={handleNavigateToAnalytics}
//             onNavigateToPayments={handleNavigateToPayments}
//             onNavigateToBidHistory={handleNavigateToBidHistory}
//           />
//         );
//     }
//   };

  
// const TestRealTimeChat = () => {
//   const { sendMessage, getCurrentInspectorId } = useQuery();
  
//   const testMessage = () => {
//     const inspectionId = 'test-inspection-id';
//     const messageData = {
//       senderId: getCurrentInspectorId(),
//       senderName: 'Test Inspector',
//       senderType: 'inspector',
//       message: `Test message at ${new Date().toLocaleTimeString()}`,
//       type: 'text'
//     };
    
//     sendMessage(inspectionId, messageData);
//   };
  
//   return (
//     <button onClick={testMessage} className="bg-red-500 text-white px-4 py-2 rounded">
//       Test Real-time Chat
//     </button>
//   );
// };
//   return (
//     <QueryProvider>
//       <div className="flex h-screen bg-gray-50">
//         <div className="fixed top-4 right-4 z-50 space-x-2">
//           {/* Debug buttons can go here if needed */}
//         </div>
        
//         {/* Sidebar */}
//         <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
//           <InspectorSidebar 
//             activeSection={activeComponent} 
//             setActiveSection={setActiveComponent} 
//           />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 overflow-hidden">
//           <div className="h-full overflow-y-auto">
//             {renderComponent()}
//           </div>
//         </div>

//         {/* ✅ Notification Popup - renders on top of everything */}
//         <NotificationPopup 
//           onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
//         />

//         {/* ✅ Debug Component - TEMPORARILY add this for testing */}
//         {/* <DebugNotifications /> */}
//       </div>
//     </QueryProvider>
//   );
// };

// export default InspectorDashboard;

// src/pages/dashboards/InspectorDashboard/InspectorDashboard.jsx
import React, { useState } from 'react';
import { useQuery } from '../../../context/QueryContext';
import { QueryProvider } from '../../../context/QueryContext';

// Import all your existing inspector dashboard components
import InspectorSidebar from './components/InspectorSidebar/InspectorSidebar';
import Dashboard from './components/Dashboard/Dashboard';
import BidRoom from './components/BidRoom/BidRoom';
import InspectionRoom from './components/InspectionRoom/InspectionRoom';
import Analytics from './components/Analytics/Analytics';
import BidHistory from './components/BidHistory/BidHistory';
import MyAccount from './components/MyAccount/MyAccount';
import Payments from './components/Payments/Payments';
import ChatWithUs from './components/ChatWithUs/ChatWithUs';
import NotificationPopup from './components/NotificationPopup/NotificationPopup';
import DebugNotifications from './components/DebugNotifications/DebugNotifications';

const InspectorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [selectedInspection, setSelectedInspection] = useState(null);

  const { debug } = useQuery();

  // ✅ ENHANCED NAVIGATION HANDLERS
  const handleNavigateToBidRoom = () => {
    console.log('📍 Navigating to bid room');
    setActiveComponent('bid-room');
  };
  
  const handleNavigateToInspectionRoom = (inspectionData = null) => {
    console.log('📍 Navigating to inspection room with data:', inspectionData);
    
    // Set the inspection data if provided
    if (inspectionData) {
      setSelectedInspection(inspectionData);
      console.log('✅ Selected inspection set:', inspectionData);
    }
    
    setActiveComponent('inspection-room');
  };
  
  const handleNavigateToAnalytics = () => setActiveComponent('analytics');
  const handleNavigateToPayments = () => setActiveComponent('payments');
  const handleNavigateToBidHistory = () => setActiveComponent('bid-history');

  // ✅ ENHANCED BID SUBMITTED HANDLER
  const handleBidSubmitted = (bidData) => {
    console.log('📋 Bid submitted:', bidData);
    // You can add any additional logic here if needed
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return (
          <Dashboard 
            onNavigateToBidRoom={handleNavigateToBidRoom}
            onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
            onNavigateToAnalytics={handleNavigateToAnalytics}
            onNavigateToPayments={handleNavigateToPayments}
            onNavigateToBidHistory={handleNavigateToBidHistory}
          />
        );
      case 'bid-room':
        return (
          <BidRoom 
            onBidSubmitted={handleBidSubmitted}
            onNavigateToInspectionRoom={handleNavigateToInspectionRoom} // ✅ PASS NAVIGATION FUNCTION
          />
        );
      case 'inspection-room':
        return (
          <InspectionRoom 
            selectedInspection={selectedInspection}
            onBack={() => {
              console.log('🔙 Returning from inspection room');
              setSelectedInspection(null); // Clear selected inspection
              setActiveComponent('dashboard');
            }}
          />
        );
      case 'analytics':
        return <Analytics />;
      case 'bid-history':
        return <BidHistory />;
      case 'my-account':
        return <MyAccount />;
      case 'payments':
        return <Payments />;
      case 'chat':
        return <ChatWithUs />;
      default:
        return (
          <Dashboard 
            onNavigateToBidRoom={handleNavigateToBidRoom}
            onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
            onNavigateToAnalytics={handleNavigateToAnalytics}
            onNavigateToPayments={handleNavigateToPayments}
            onNavigateToBidHistory={handleNavigateToBidHistory}
          />
        );
    }
  };

  return (
    <QueryProvider>
      <div className="flex h-screen bg-gray-50">
        <div className="fixed top-4 right-4 z-50 space-x-2">
          {/* Debug buttons can go here if needed */}
        </div>
        
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <InspectorSidebar 
            activeSection={activeComponent} 
            setActiveSection={setActiveComponent} 
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            {renderComponent()}
          </div>
        </div>

        {/* ✅ Notification Popup - renders on top of everything */}
        <NotificationPopup 
          onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
        />

        {/* ✅ Debug Component - TEMPORARILY add this for testing */}
        {/* <DebugNotifications /> */}
      </div>
    </QueryProvider>
  );
};

export default InspectorDashboard;