import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Clock, 
  User, 
  MapPin, 
  DollarSign,
  Calendar,
  Eye,
  Phone,
  FileText,
  CheckCircle,
  AlertCircle,
  Star,
  RefreshCw,
  Play,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useQuery } from '../../../../../context/QueryContext';

const CustomerActiveInspections = ({ onOpenChat }) => {
  const { 
    getCustomerActiveInspections,
    refreshQueries,
    loading,
    queries,
    initializeInspectionChat,
    sendMessage,
    getCurrentCustomerId
  } = useQuery();
  
  const [activeInspections, setActiveInspections] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  // Load active inspections with real-time updates
  useEffect(() => {
    const loadInspections = () => {
      console.log('🔄 Loading customer active inspections...');
      const inspections = getCustomerActiveInspections();
      console.log('📋 Found active inspections:', inspections);
      setActiveInspections(inspections);
    };

    loadInspections();
  }, [getCustomerActiveInspections, queries]);

  // Add this inside your existing useEffect in CustomerActiveInspections.jsx
useEffect(() => {
  // Your existing code...
  
  // Add this new event listener for completion popup
  const handleCustomerCompletionPopup = (event) => {
    const { inspectionId, title, message } = event.detail;
    
    // Show a browser alert for now (you can replace with a proper modal later)
    alert(`🎉 ${title}\n\n${message}\n\nInspection ID: ${inspectionId}`);
    
    // Refresh the inspections list
    handleRefresh();
  };
  
  window.addEventListener('showCustomerCompletionPopup', handleCustomerCompletionPopup);
  
  return () => {
    // Your existing cleanup...
    window.removeEventListener('showCustomerCompletionPopup', handleCustomerCompletionPopup);
  };
}, []);

  // Listen for bid confirmations
  useEffect(() => {
    const handleBidConfirmed = (event) => {
      console.log('🎉 Bid confirmed event received:', event.detail);
      
      setTimeout(() => {
        const inspections = getCustomerActiveInspections();
        setActiveInspections(inspections);
      }, 1000);
    };

    window.addEventListener('bidConfirmed', handleBidConfirmed);
    
    return () => {
      window.removeEventListener('bidConfirmed', handleBidConfirmed);
    };
  }, [getCustomerActiveInspections]);

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const inspections = getCustomerActiveInspections();
      setActiveInspections(inspections);
    }, 10000);

    return () => clearInterval(interval);
  }, [getCustomerActiveInspections]);

  // Manual refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshQueries();
      const inspections = getCustomerActiveInspections();
      setActiveInspections(inspections);
      console.log('✅ Manual refresh completed');
    } catch (error) {
      console.error('❌ Error refreshing:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Start chat for confirmed inspection
  const handleStartChat = async (inspection) => {
    try {
      const inspectionId = inspection.inspectionId || inspection.id;
      console.log('🗨️ Starting chat for inspection:', inspectionId);

      await initializeInspectionChat(
        inspectionId,
        inspection.inspectorName,
        inspection.customerName
      );

      onOpenChat(inspection);
      
    } catch (error) {
      console.error('❌ Error starting chat:', error);
      alert('Failed to start chat. Please try again.');
    }
  };

  // Clear all data function
  const handleClearAllData = async () => {
    if (window.confirm('Are you sure you want to clear all existing data? This will remove all queries, bids, and chat messages.')) {
      try {
        if (window.queryContext?.debugStorage) {
          window.queryContext.debugStorage.clearAll();
        } else {
          localStorage.removeItem('inspection_queries');
          localStorage.removeItem('inspector_notifications');
          localStorage.removeItem('inspection_chat_messages');
        }
        
        await handleRefresh();
        alert('All data cleared successfully! Only new inspections will appear.');
      } catch (error) {
        console.error('Error clearing data:', error);
        alert('Failed to clear data. Please try again.');
      }
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTimeElapsed = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diffHours = Math.floor((now - start) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Started recently';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const toggleCardExpansion = (inspectionId) => {
    setExpandedCard(expandedCard === inspectionId ? null : inspectionId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg lg:rounded-xl p-6 lg:p-8 border border-gray-200 text-center">
          <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading your active inspections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6">
        {/* Responsive Header */}
        <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Active Inspections</h2>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                Monitor and chat with your inspectors in real-time
                <span className="hidden sm:inline"> ({activeInspections.length} active)</span>
              </p>
              <div className="sm:hidden mt-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {activeInspections.length} Active
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-3">
              {/* Clear Data Button */}
              <button 
                onClick={handleClearAllData}
                className="w-full sm:w-auto bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sm:hidden">Clear Data</span>
                <span className="hidden sm:inline">Clear All Data</span>
              </button>
              
              {/* Refresh Button */}
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className="w-full sm:w-auto bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* No Active Inspections State */}
        {activeInspections.length === 0 ? (
          <div className="bg-white rounded-lg lg:rounded-xl p-6 lg:p-8 border border-gray-200 text-center">
            <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Active Inspections</h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base max-w-md mx-auto">
              Once you confirm a bid, your active inspections will appear here for real-time chat.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span>Submit inspection requests in "Raise Enquiry"</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span>Review and confirm bids in "Bidding Room"</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <span>Chat with inspectors here once confirmed</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleRefresh}
              className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto text-sm sm:text-base"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Check for Updates</span>
            </button>
          </div>
        ) : (
          // Active Inspections Grid
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {activeInspections.map((inspection) => {
              const isExpanded = expandedCard === inspection.id;
              
              return (
                <div key={inspection.id} className="bg-white rounded-lg lg:rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                  {/* Card Header */}
                  <div className="p-4 lg:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                            {inspection.queryTitle}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center whitespace-nowrap">
                              <Play className="h-3 w-3 mr-1" />
                              In Progress
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getUrgencyColor(inspection.urgency)}`}>
                              {inspection.urgency}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm">ID: {inspection.id}</p>
                      </div>
                      
                      {/* Mobile Expand Button */}
                      <button
                        onClick={() => toggleCardExpansion(inspection.id)}
                        className="lg:hidden ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </button>
                    </div>

                    {/* Inspector Info - Always Visible */}
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                            {inspection.inspectorName}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">
                            {inspection.inspectorCompany}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                          <span className="text-xs sm:text-sm font-medium text-gray-900">
                            {inspection.inspectorRating}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                        <div>
                          <span className="text-gray-600">Started:</span>
                          <p className="font-medium text-gray-900">{getTimeElapsed(inspection.startedAt)}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Est. Completion:</span>
                          <p className="font-medium text-gray-900 truncate">{inspection.estimatedCompletion}</p>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Content on Mobile, Always Visible on Desktop */}
                    <div className={`${isExpanded ? 'block' : 'hidden'} lg:block space-y-4`}>
                      {/* Inspection Details */}
                      <div className="grid grid-cols-1 gap-2 sm:gap-3 text-xs sm:text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="truncate">{inspection.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="font-medium text-green-600">${inspection.amount}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FileText className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="truncate">{inspection.volume}</span>
                        </div>
                      </div>

                      {/* Chat Info */}
                      {inspection.lastMessage && (
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                              <span className="text-xs sm:text-sm font-medium text-blue-800">Latest Message</span>
                            </div>
                            {inspection.unreadMessages > 0 && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {inspection.unreadMessages}
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-blue-700 line-clamp-2">
                            {inspection.lastMessage.message}
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            {new Date(inspection.lastMessage.timestamp).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className={`${isExpanded ? 'block' : 'hidden'} lg:block mt-4`}>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => handleStartChat(inspection)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="sm:hidden">Chat</span>
                          <span className="hidden sm:inline">Chat with Inspector</span>
                          {inspection.unreadMessages > 0 && (
                            <span className="bg-green-800 text-white text-xs px-2 py-1 rounded-full">
                              {inspection.unreadMessages}
                            </span>
                          )}
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base">
                          <Phone className="h-4 w-4" />
                          <span>Call</span>
                        </button>
                      </div>
                    </div>

                    {/* Mobile Quick Actions - Always Visible */}
                    <div className={`${isExpanded ? 'hidden' : 'block'} lg:hidden mt-4`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3" />
                            <span className="font-medium text-green-600">${inspection.amount}</span>
                          </div>
                          {inspection.unreadMessages > 0 && (
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-3 w-3 text-blue-600" />
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {inspection.unreadMessages}
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleStartChat(inspection)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                        >
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerActiveInspections;