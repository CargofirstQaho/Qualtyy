import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  X, 
  Award, 
  MapPin, 
  DollarSign, 
  User,
  ArrowRight
} from 'lucide-react';
import { useQuery } from '../../../../../context/QueryContext';

const ToastNotification = ({ onNavigateToInspectionRoom }) => {
  const { notifications, markNotificationRead, getCurrentInspectorId } = useQuery();
  const [activeToasts, setActiveToasts] = useState([]);
  const [dismissedNotifications, setDismissedNotifications] = useState(new Set());
  const processedNotifications = useRef(new Set());

  // 🔍 DEBUG: Log everything
  useEffect(() => {
    console.log('🔍 TOAST DEBUG:');
    console.log('- notifications:', notifications);
    console.log('- activeToasts:', activeToasts);
    console.log('- dismissedNotifications:', Array.from(dismissedNotifications));
    console.log('- processedNotifications:', Array.from(processedNotifications.current));
    console.log('- getCurrentInspectorId:', getCurrentInspectorId());
  }, [notifications, activeToasts, dismissedNotifications]);

  // ✅ Add a debug function to manually test
  useEffect(() => {
    // Add global function to test toast
    window.testToast = () => {
      console.log('🧪 Manual toast test triggered');
      const testData = {
        id: 'test-123',
        queryTitle: 'Test Rice Inspection',
        location: 'Test Location',
        amount: '500',
        customerName: 'Test Customer',
        type: 'bid_confirmed',
        inspectorId: getCurrentInspectorId()
      };
      showToast(testData, 'manual-test');
    };
    
    return () => {
      delete window.testToast;
    };
  }, []);
  useEffect(() => {
    const handleBidConfirmed = (event) => {
      const bidData = event.detail;
      console.log('🔔 Toast: Bid confirmed by customer:', bidData);
      
      const currentInspectorId = getCurrentInspectorId();
      if (bidData.inspectorId === currentInspectorId) {
        console.log('✅ Toast: Showing notification for current inspector');
        
        // Create unique identifier for this event
        const eventId = `${bidData.queryId}_${bidData.bidId}_${bidData.inspectorId}`;
        
        // Only show if not already processed and not dismissed
        if (!processedNotifications.current.has(eventId) && !dismissedNotifications.has(eventId)) {
          showToast(bidData, eventId);
          processedNotifications.current.add(eventId);
        } else {
          console.log('⏭️ Toast: Notification already processed or dismissed');
        }
      }
    };

    window.addEventListener('bidConfirmed', handleBidConfirmed);
    
    return () => {
      window.removeEventListener('bidConfirmed', handleBidConfirmed);
    };
  }, [getCurrentInspectorId, dismissedNotifications]);

  // ✅ SIMPLIFIED: Show toast for any bid_confirmed notification
  useEffect(() => {
    console.log('🔍 Toast: Checking for bid confirmations...', notifications.length);
    
    const currentInspectorId = getCurrentInspectorId();
    if (!currentInspectorId) {
      console.log('❌ No inspector ID');
      return;
    }
    
    if (!notifications.length) {
      console.log('❌ No notifications');
      return;
    }
    
    // Find bid confirmations for current inspector
    notifications.forEach(n => {
      console.log('🔍 Checking notification:', {
        id: n.id,
        type: n.type,
        inspectorId: n.inspectorId,
        currentInspectorId,
        read: n.read,
        processed: processedNotifications.current.has(n.id),
        dismissed: dismissedNotifications.has(n.id)
      });
      
      if (n.type === 'bid_confirmed' && 
          n.inspectorId === currentInspectorId && 
          !n.read && 
          !processedNotifications.current.has(n.id) && 
          !dismissedNotifications.has(n.id)) {
        
        console.log('📢 SHOWING TOAST for:', n);
        showToast(n, n.id);
        processedNotifications.current.add(n.id);
      }
    });
  }, [notifications, getCurrentInspectorId, dismissedNotifications]);

  const showToast = (notificationData, uniqueId) => {
    const toastId = `toast-${uniqueId}-${Date.now()}`;
    
    const newToast = {
      id: toastId,
      data: notificationData,
      uniqueId: uniqueId, // Store the unique ID for tracking
      timestamp: Date.now()
    };
    
    setActiveToasts(prev => [...prev, newToast]);
    
    // Auto-remove toast after 10 seconds (a bit longer for user to see)
    setTimeout(() => {
      removeToast(toastId, false); // false = don't mark as dismissed, just auto-hide
    }, 10000);
  };

  const removeToast = (toastId, markAsDismissed = true) => {
    const toast = activeToasts.find(t => t.id === toastId);
    
    if (markAsDismissed && toast) {
      // ✅ Mark as dismissed so it won't show again
      setDismissedNotifications(prev => new Set([...prev, toast.uniqueId]));
      console.log('❌ Toast: Marked as dismissed:', toast.uniqueId);
    }
    
    setActiveToasts(prev => prev.filter(toast => toast.id !== toastId));
  };

  const handleStartInspection = async (toast) => {
    console.log('🚀 Toast: Starting inspection:', toast.data);
    
    // Mark notification as read in storage if it has an ID
    if (toast.data.id) {
      await markNotificationRead(toast.data.id);
    }
    
    // Remove toast (don't mark as dismissed since user took action)
    removeToast(toast.id, false);
    
    // Navigate to inspection room
    if (onNavigateToInspectionRoom) {
      onNavigateToInspectionRoom(toast.data);
    }
  };

  const handleDismissToast = async (toast) => {
    console.log('❌ Toast: User dismissed notification:', toast.data);
    
    // Mark notification as read in storage if it has an ID
    if (toast.data.id) {
      await markNotificationRead(toast.data.id);
    }
    
    // Remove toast and mark as dismissed (won't show again)
    removeToast(toast.id, true);
  };

  const handleLaterAction = async (toast) => {
    console.log('⏰ Toast: User clicked Later:', toast.data);
    
    // Mark notification as read in storage if it has an ID
    if (toast.data.id) {
      await markNotificationRead(toast.data.id);
    }
    
    // Remove toast and mark as dismissed (won't show again)
    removeToast(toast.id, true);
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {activeToasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm w-80 transform transition-all duration-300 ease-in-out animate-slide-in"
          style={{
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">🎉 Bid Selected!</h3>
                <p className="text-xs text-green-600">Customer confirmed your bid!</p>
              </div>
            </div>
            <button
              onClick={() => handleDismissToast(toast)}
              className="text-gray-400 hover:text-gray-600 p-1"
              title="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-2 mb-3">
            <p className="text-sm font-medium text-gray-900">
              {toast.data.queryTitle}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {toast.data.location}
              </span>
              <span className="flex items-center font-medium text-green-600">
                <DollarSign className="h-3 w-3 mr-1" />
                ${toast.data.amount}
              </span>
            </div>
            
            <div className="flex items-center text-xs text-gray-600">
              <User className="h-3 w-3 mr-1" />
              Customer: {toast.data.customerName}
            </div>
            
            {/* ✅ Added urgency indicator */}
            <div className="bg-green-50 border border-green-200 rounded p-2">
              <p className="text-xs text-green-800 font-medium">
                🚀 Ready to start inspection?
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              onClick={() => handleStartInspection(toast)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs font-medium flex items-center justify-center space-x-1 transition-colors"
            >
              <span>Start Now</span>
              <ArrowRight className="h-3 w-3" />
            </button>
            <button
              onClick={() => handleLaterAction(toast)}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium transition-colors"
              title="I'll start later"
            >
              Later
            </button>
          </div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ToastNotification;