// src/components/CustomerInspectionNotification/CustomerInspectionNotification.jsx
import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  User, 
  MapPin, 
  DollarSign,
  Clock,
  Bell,
  CheckCircle
} from 'lucide-react';
import { useQuery } from '../../../../../context/QueryContext';

const CustomerInspectionNotification = ({ onOpenChat }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  
  const { 
    queries, 
    getCurrentCustomerId
  } = useQuery();

  // Check for active inspections and create notifications
  useEffect(() => {
    const checkForActiveInspections = () => {
      const currentCustomerId = getCurrentCustomerId();
      
      // Find inspections that are "In Progress" for this customer
      const activeInspections = queries.filter(query => 
        query.status === 'In Progress' && 
        query.confirmedInspectorId &&
        (query.email === 'current-customer@example.com' || query.status === 'In Progress') // Demo filter
      );

      if (activeInspections.length > 0) {
        const inspectionNotifications = activeInspections.map(query => {
          const confirmedBid = query.bids?.find(bid => bid.id === query.confirmedBidId);
          
          return {
            id: query.id,
            inspectionId: query.id,
            queryTitle: `${query.commodityDisplay || query.commodity} Quality Assessment`,
            inspectorName: confirmedBid?.inspectorName || 'Inspector',
            inspectorCompany: confirmedBid?.company || 'Inspection Company',
            location: query.locationDisplay || `${query.location}, ${query.country}`,
            amount: confirmedBid?.amount || 0,
            startedAt: query.confirmedAt || query.updatedAt,
            status: 'active'
          };
        });

        setNotifications(inspectionNotifications);
        
        // Show notification if there are active inspections
        if (inspectionNotifications.length > 0) {
          setShowNotification(true);
        }
      } else {
        setNotifications([]);
        setShowNotification(false);
      }
    };

    checkForActiveInspections();
    
    // Check every 30 seconds for new active inspections
    const interval = setInterval(checkForActiveInspections, 30000);
    return () => clearInterval(interval);
  }, [queries, getCurrentCustomerId]);

  const handleOpenChat = (inspection) => {
    setShowNotification(false);
    if (onOpenChat) {
      onOpenChat(inspection);
    }
  };

  const handleDismiss = () => {
    setShowNotification(false);
  };

  if (!showNotification || notifications.length === 0) {
    return null;
  }

  return (
    <>
      {/* Notification Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span className="font-semibold">Inspection Started!</span>
              </div>
              <button
                onClick={handleDismiss}
                className="text-green-100 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {notifications.map((inspection) => (
              <div key={inspection.id} className="mb-4 last:mb-0">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-gray-900">
                    Your inspector has started working!
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {inspection.queryTitle}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Inspector: {inspection.inspectorName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{inspection.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Amount: ${inspection.amount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Started: {new Date(inspection.startedAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-4">
                    You can now communicate with your inspector in real-time during the inspection process.
                  </p>
                  
                  <button
                    onClick={() => handleOpenChat(inspection)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Open Chat with Inspector</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 rounded-b-xl">
            <button
              onClick={handleDismiss}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              I'll chat later
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerInspectionNotification;