import Sidebar from './components/CompanySidebar/CompanySidebar';
import Dashboard from './components/Dashboard/Dashboard';
import BidHistory from './components/BidHistory/BidHistory';
import DetailAnalysis from './components/Analytics/Analytics';
import BiddingRoom from './components/BidRoom/BidRoom';
import Payments from './components/Payments/Payments';
import InspectionRoom from './components/InspectionRoom/InspectionRoom';
import MyAccount from './components/MyAccount/MyAccount';
import { useState } from 'react';

// Placeholder components for other sections
const ChatWithUs = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Chat with Us</h1>
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <p className="text-gray-600">Chat feature will be implemented here.</p>
    </div>
  </div>
);

const CompanyDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [submittedBids, setSubmittedBids] = useState([]); // Shared state for bids
  const [cancellationMessages, setCancellationMessages] = useState([]); // Shared state for cancellations

  // Navigation functions for dashboard
  const handleNavigateToBidRoom = () => {
    setActiveSection('bidroom');
  };

  const handleNavigateToInspectionRoom = () => {
    setActiveSection('inspectionroom');
  };

  const handleNavigateToAnalytics = () => {
    setActiveSection('analytics');
  };

  const handleNavigateToPayments = () => {
    setActiveSection('payments');
  };

  const handleNavigateToBidHistory = () => {
    setActiveSection('bidhistory');
  };

  // Handle new bid submission from BiddingRoom
  const handleBidSubmitted = (newBid) => {
    setSubmittedBids(prev => [newBid, ...prev]);
    console.log('New bid submitted:', newBid); // For debugging
  };

  // Handle inspection cancellation from BidHistory
  const handleInspectionCancelled = (cancellationMessage) => {
    setCancellationMessages(prev => [...prev, cancellationMessage]);
    console.log('Inspection cancelled:', cancellationMessage); // For debugging
  };

  // Function to render the active component
  const renderActiveComponent = () => {
    switch (activeSection) {
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
      case 'myaccount':
        return <MyAccount />;
      case 'bidroom':
        return <BiddingRoom onBidSubmitted={handleBidSubmitted} />;
      case 'analytics':
        return (
          <DetailAnalysis 
            onNavigateToBidHistory={handleNavigateToBidHistory}
            onNavigateToPayments={handleNavigateToPayments}
            onNavigateToInspectionRoom={handleNavigateToInspectionRoom}
            onNavigateToBidRoom={handleNavigateToBidRoom}
          />
        );
      case 'bidhistory':
        return <BidHistory newBids={submittedBids} onInspectionCancelled={handleInspectionCancelled} />;
      case 'payments':
        return <Payments />;
      case 'chatwithus':
        return <ChatWithUs />;
      case 'inspectionroom':
        return <InspectionRoom cancellationMessages={cancellationMessages} />;
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
      />
      
      {/* Main Content Area */}
      <div className="flex-1">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default CompanyDashboard;