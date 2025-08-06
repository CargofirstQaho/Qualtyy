

// import React, { useState, useEffect } from 'react';
// import { 
//   CheckCircle, 
//   X, 
//   Award, 
//   MapPin, 
//   DollarSign, 
//   User, 
//   Clock,
//   ArrowRight,
//   Building,
//   Star,
//   Timer
// } from 'lucide-react';
// import { useQuery } from '../../../../../context/QueryContext';

// const NotificationPopup = ({ onNavigateToInspectionRoom }) => {
//   const { notifications, markNotificationRead, getCurrentInspectorId } = useQuery();
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentNotification, setCurrentNotification] = useState(null);

//   // Listen for bid confirmation events
//   useEffect(() => {
//     const handleBidConfirmed = (event) => {
//       const bidData = event.detail;
//       console.log('🔔 Bid confirmed event received:', bidData);
      
//       // Check if this notification is for the current inspector
//       const currentInspectorId = getCurrentInspectorId();
//       if (bidData.inspectorId === currentInspectorId) {
//         console.log('✅ Showing notification for current inspector');
//         setCurrentNotification(bidData);
//         setShowPopup(true);
//       }
//     };

//     // Listen for the custom bid confirmed event
//     window.addEventListener('bidConfirmed', handleBidConfirmed);
    
//     return () => {
//       window.removeEventListener('bidConfirmed', handleBidConfirmed);
//     };
//   }, [getCurrentInspectorId]);

//   // Also check for existing notifications (from storage)
//   // useEffect(() => {
//   //   const currentInspectorId = getCurrentInspectorId();
    
//   //   const unreadNotifications = notifications.filter(n => {
//   //     const isUnread = !n.read;
//   //     const isCorrectType = n.type === 'inspection_confirmed' || n.type === 'bid_confirmed';
//   //     const isForCurrentInspector = n.inspectorId === currentInspectorId;
      
//   //     return isUnread && isCorrectType && isForCurrentInspector;
//   //   });
    
//   //   if (unreadNotifications.length > 0 && !showPopup) {
//   //     const latestNotification = unreadNotifications[0];
//   //     console.log('📢 Showing stored notification:', latestNotification);
//   //     setCurrentNotification(latestNotification);
//   //     setShowPopup(true);
//   //   }
//   // }, [notifications, getCurrentInspectorId, showPopup]);

//   // Also check for existing notifications (from storage)
// useEffect(() => {
//   console.log('🔍 NotificationPopup: All notifications:', notifications);
//   console.log('🔍 NotificationPopup: Current inspector ID:', getCurrentInspectorId());
  
//   const currentInspectorId = getCurrentInspectorId();
  
//   const unreadNotifications = notifications.filter(n => {
//     console.log('🔍 Checking notification:', {
//       id: n.id,
//       type: n.type,
//       inspectorId: n.inspectorId,
//       currentInspectorId: currentInspectorId,
//       read: n.read
//     });
    
//     const isUnread = true;
//     const isCorrectType = n.type === 'inspection_confirmed' || n.type === 'bid_confirmed';
//     const isForCurrentInspector = n.inspectorId === currentInspectorId;


//      console.log('🔍 Filter results:', { isUnread, isCorrectType, isForCurrentInspector, finalResult: isUnread && isCorrectType && isForCurrentInspector });
    
//     return isUnread && isCorrectType && isForCurrentInspector;
//   });
  
//   console.log('🔍 Filtered notifications:', unreadNotifications);
  
//   if (unreadNotifications.length > 0 && !showPopup) {
//     const latestNotification = unreadNotifications[0];
//     console.log('📢 Showing stored notification:', latestNotification);
//     setCurrentNotification(latestNotification);
//     setShowPopup(true);
//   }
// }, [notifications, getCurrentInspectorId, showPopup]);

//   const handleStartInspection = async () => {
//     console.log('🚀 Starting inspection with notification:', currentNotification);
    
//     if (currentNotification) {
//       // Mark notification as read if it has an ID (from storage)
//       if (currentNotification.id) {
//         await markNotificationRead(currentNotification.id);
//       }
      
//       setShowPopup(false);
      
//       // Navigate to inspection room with the notification data
//       if (onNavigateToInspectionRoom) {
//         onNavigateToInspectionRoom(currentNotification);
//       }
      
//       setCurrentNotification(null);
//     }
//   };

//   const handleDismiss = async () => {
//     console.log('❌ Dismissing notification');
    
//     if (currentNotification && currentNotification.id) {
//       await markNotificationRead(currentNotification.id);
//     }
    
//     setShowPopup(false);
//     setCurrentNotification(null);
//   };

//   // Don't render if no notification to show
//   if (!showPopup || !currentNotification) {
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-md w-full shadow-2xl animate-pulse">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-xl">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
//                 <Award className="h-6 w-6" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold">🎉 Congratulations!</h2>
//                 <p className="text-green-100">Your bid has been selected!</p>
//               </div>
//             </div>
//             <button
//               onClick={handleDismiss}
//               className="text-white hover:text-gray-200 p-2 rounded-full hover:bg-white/20"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* Success Message */}
//           <div className="text-center">
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <CheckCircle className="h-8 w-8 text-green-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">
//               Selected for {currentNotification.queryTitle}
//             </h3>
//             <p className="text-gray-600">
//               You've been chosen to perform this inspection!
//             </p>
//           </div>

//           {/* Bid Details */}
//           <div className="bg-gray-50 rounded-lg p-4 space-y-3">
//             <h4 className="font-semibold text-gray-900">Inspection Details</h4>
            
//             <div className="grid grid-cols-2 gap-3 text-sm">
//               <div className="flex items-center space-x-2">
//                 <MapPin className="h-4 w-4 text-gray-500" />
//                 <div>
//                   <p className="text-gray-500">Location</p>
//                   <p className="font-medium text-gray-900">{currentNotification.location}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <DollarSign className="h-4 w-4 text-gray-500" />
//                 <div>
//                   <p className="text-gray-500">Your Bid</p>
//                   <p className="font-bold text-green-600">${currentNotification.amount}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <User className="h-4 w-4 text-gray-500" />
//                 <div>
//                   <p className="text-gray-500">Customer</p>
//                   <p className="font-medium text-gray-900">{currentNotification.customerName}</p>
//                 </div>
//               </div>
              
//               {currentNotification.bidDetails?.proposedTimeline && (
//                 <div className="flex items-center space-x-2">
//                   <Timer className="h-4 w-4 text-gray-500" />
//                   <div>
//                     <p className="text-gray-500">Timeline</p>
//                     <p className="font-medium text-gray-900">{currentNotification.bidDetails.proposedTimeline}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Your Bid Summary */}
//           {currentNotification.bidDetails && (
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//               <h4 className="font-semibold text-blue-900 mb-2">Your Winning Bid</h4>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-blue-600">Company:</span>
//                   <span className="font-medium text-blue-900">{currentNotification.bidDetails.company}</span>
//                 </div>
//                 {currentNotification.bidDetails.rating && (
//                   <div className="flex justify-between">
//                     <span className="text-blue-600">Rating:</span>
//                     <div className="flex items-center space-x-1">
//                       <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                       <span className="font-medium text-blue-900">{currentNotification.bidDetails.rating}</span>
//                     </div>
//                   </div>
//                 )}
//                 {currentNotification.bidDetails.experience && (
//                   <div className="flex justify-between">
//                     <span className="text-blue-600">Experience:</span>
//                     <span className="font-medium text-blue-900">{currentNotification.bidDetails.experience}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Next Steps */}
//           <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//             <h4 className="font-semibold text-green-900 mb-2">🚀 Ready to Start?</h4>
//             <p className="text-green-800 text-sm">
//               Click "Start Inspection" to begin your work and communicate with the customer through our chat system.
//             </p>
//           </div>

//           {/* Timestamp */}
//           <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
//             <Clock className="h-4 w-4" />
//             <span>
//               {currentNotification.createdAt 
//                 ? new Date(currentNotification.createdAt).toLocaleString()
//                 : 'Just now'
//               }
//             </span>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="px-6 pb-6 flex space-x-3">
//           <button
//             onClick={handleStartInspection}
//             className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
//           >
//             <span>Start Inspection</span>
//             <ArrowRight className="h-4 w-4" />
//           </button>
//           <button
//             onClick={handleDismiss}
//             className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors"
//           >
//             Later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationPopup;



// import React, { useState, useEffect } from 'react';
// import { 
//   CheckCircle, 
//   X, 
//   Award, 
//   MapPin, 
//   DollarSign, 
//   User, 
//   Clock,
//   ArrowRight,
//   Building,
//   Star,
//   Timer
// } from 'lucide-react';
// import { useQuery } from '../../../../../context/QueryContext';

// const NotificationPopup = ({ onNavigateToInspectionRoom }) => {
//   const { notifications, markNotificationRead, getCurrentInspectorId } = useQuery();
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentNotification, setCurrentNotification] = useState(null);

//   // Listen for bid confirmation events
//   useEffect(() => {
//     const handleBidConfirmed = (event) => {
//       const bidData = event.detail;
//       console.log('🔔 Bid confirmed event received:', bidData);
      
//       // Check if this notification is for the current inspector
//       const currentInspectorId = getCurrentInspectorId();
//       if (bidData.inspectorId === currentInspectorId) {
//         console.log('✅ Showing notification for current inspector');
//         setCurrentNotification(bidData);
//         setShowPopup(true);
//       }
//     };

//     // Listen for the custom bid confirmed event
//     window.addEventListener('bidConfirmed', handleBidConfirmed);
    
//     return () => {
//       window.removeEventListener('bidConfirmed', handleBidConfirmed);
//     };
//   }, [getCurrentInspectorId]);

//   // Also check for existing notifications (from storage)
//   useEffect(() => {
//     console.log('🔍 NotificationPopup: All notifications:', notifications);
//     console.log('🔍 NotificationPopup: Current inspector ID:', getCurrentInspectorId());
    
//     const currentInspectorId = getCurrentInspectorId();
    
//     const unreadNotifications = notifications.filter(n => {
//       console.log('🔍 Checking notification:', {
//         id: n.id,
//         type: n.type,
//         inspectorId: n.inspectorId,
//         currentInspectorId: currentInspectorId,
//         read: n.read
//       });
      
//       const isUnread = true; // Changed back to proper logic
//       const isCorrectType = n.type === 'inspection_confirmed' || n.type === 'bid_confirmed';
//       const isForCurrentInspector = n.inspectorId === currentInspectorId;

//       console.log('🔍 Filter results:', { isUnread, isCorrectType, isForCurrentInspector, finalResult: isUnread && isCorrectType && isForCurrentInspector });
      
//       return isUnread && isCorrectType && isForCurrentInspector;
//     });
    
//     console.log('🔍 Filtered notifications:', unreadNotifications);
    
//     if (unreadNotifications.length > 0 && !showPopup) {
//       const latestNotification = unreadNotifications[0];
//       console.log('📢 Showing stored notification:', latestNotification);
//       setCurrentNotification(latestNotification);
//       setShowPopup(true);
//     }
//   }, [notifications, getCurrentInspectorId, showPopup]);

//   const handleStartInspection = async () => {
//     console.log('🚀 Starting inspection with notification:', currentNotification);
    
//     if (currentNotification) {
//       // Mark notification as read if it has an ID (from storage)
//       if (currentNotification.id) {
//         await markNotificationRead(currentNotification.id);
//       }
      
//       // Close popup immediately
//       setShowPopup(false);
//       setCurrentNotification(null);
      
//       // Navigate to inspection room with the notification data
//       if (onNavigateToInspectionRoom) {
//         onNavigateToInspectionRoom(currentNotification);
//       }
//     }
//   };

//   const handleDismiss = async () => {
//     console.log('❌ Dismissing notification');
    
//     if (currentNotification && currentNotification.id) {
//       await markNotificationRead(currentNotification.id);
//     }
    
//     setShowPopup(false);
//     setCurrentNotification(null);
//   };

//   // Don't render if no notification to show
//   if (!showPopup || !currentNotification) {
//     return null;
//   }

//   // Get current date and time
//   const getCurrentDateTime = () => {
//     const now = new Date();
//     return now.toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-sm w-full shadow-xl">
//         {/* Compact Header */}
//         <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-t-lg">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
//                 <Award className="h-4 w-4" />
//               </div>
//               <div>
//                 <h2 className="text-sm font-bold">🎉 Bid Selected!</h2>
//                 <p className="text-green-100 text-xs">You got the job!</p>
//               </div>
//             </div>
//             <button
//               onClick={handleDismiss}
//               className="text-white hover:text-gray-200 p-1"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         {/* Compact Content */}
//         <div className="p-4 space-y-3">
//           {/* Main Message */}
//           <div className="text-center">
//             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
//               <CheckCircle className="h-5 w-5 text-green-600" />
//             </div>
//             <h3 className="text-sm font-semibold text-gray-900 mb-1">
//               Selected for {currentNotification.queryTitle}
//             </h3>
//           </div>

//           {/* Compact Details */}
//           <div className="bg-gray-50 rounded-lg p-3 space-y-2">
//             <div className="flex items-center justify-between text-xs">
//               <span className="flex items-center text-gray-600">
//                 <MapPin className="h-3 w-3 mr-1" />
//                 Location:
//               </span>
//               <span className="text-gray-800 font-medium">{currentNotification.location}</span>
//             </div>
            
//             <div className="flex items-center justify-between text-xs">
//               <span className="flex items-center text-gray-600">
//                 <DollarSign className="h-3 w-3 mr-1" />
//                 Amount:
//               </span>
//               <span className="text-green-600 font-bold">${currentNotification.amount}</span>
//             </div>
            
//             <div className="flex items-center justify-between text-xs">
//               <span className="flex items-center text-gray-600">
//                 <User className="h-3 w-3 mr-1" />
//                 Customer:
//               </span>
//               <span className="text-gray-800 font-medium">{currentNotification.customerName}</span>
//             </div>
//           </div>

//           {/* Compact Next Steps */}
//           <div className="bg-green-50 border border-green-200 rounded-lg p-2">
//             <p className="text-green-800 font-medium text-xs mb-1">Ready to start?</p>
//             <p className="text-green-700 text-xs">
//               Click "Start Inspection" to begin and chat with your customer!
//             </p>
//           </div>

//           {/* Real Current Timestamp */}
//           <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
//             <Clock className="h-3 w-3" />
//             <span>{getCurrentDateTime()}</span>
//           </div>
//         </div>

//         {/* Compact Actions */}
//         <div className="px-4 pb-4 flex space-x-2">
//           <button
//             onClick={handleStartInspection}
//             className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-xs font-medium flex items-center justify-center space-x-1"
//           >
//             <span>Start Inspection</span>
//             <ArrowRight className="h-3 w-3" />
//           </button>
//           <button
//             onClick={handleDismiss}
//             className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-xs font-medium"
//           >
//             Later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationPopup;

// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   CheckCircle, 
//   X, 
//   Award, 
//   MapPin, 
//   DollarSign, 
//   User, 
//   Clock,
//   ArrowRight,
//   Building,
//   Star,
//   Timer
// } from 'lucide-react';
// import { useQuery } from '../../../../../context/QueryContext';

// const NotificationPopup = ({ onNavigateToInspectionRoom }) => {
//   const { notifications, markNotificationRead, getCurrentInspectorId } = useQuery();
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentNotification, setCurrentNotification] = useState(null);
//   const [dismissedNotifications, setDismissedNotifications] = useState(new Set());
//   const hasShownInitialNotification = useRef(false);

//   // Listen for bid confirmation events
//   useEffect(() => {
//     const handleBidConfirmed = (event) => {
//       const bidData = event.detail;
//       console.log('🔔 Bid confirmed event received:', bidData);
      
//       // Check if this notification is for the current inspector
//       const currentInspectorId = getCurrentInspectorId();
//       if (bidData.inspectorId === currentInspectorId) {
//         console.log('✅ Showing notification for current inspector');
//         setCurrentNotification(bidData);
//         setShowPopup(true);
//       }
//     };

//     // Listen for the custom bid confirmed event
//     window.addEventListener('bidConfirmed', handleBidConfirmed);
    
//     return () => {
//       window.removeEventListener('bidConfirmed', handleBidConfirmed);
//     };
//   }, [getCurrentInspectorId]);

//   // Check for existing notifications (from storage) - only once
//   useEffect(() => {
//     if (hasShownInitialNotification.current) return;
    
//     console.log('🔍 NotificationPopup: All notifications:', notifications);
//     console.log('🔍 NotificationPopup: Current inspector ID:', getCurrentInspectorId());
    
//     const currentInspectorId = getCurrentInspectorId();
    
//     const unreadNotifications = notifications.filter(n => {
//       console.log('🔍 Checking notification:', {
//         id: n.id,
//         type: n.type,
//         inspectorId: n.inspectorId,
//         currentInspectorId: currentInspectorId,
//         read: n.read
//       });
      
//       const isUnread = !n.read; // Fixed: proper unread logic
//       const isCorrectType = n.type === 'inspection_confirmed' || n.type === 'bid_confirmed';
//       const isForCurrentInspector = n.inspectorId === currentInspectorId;
//       const notDismissed = !dismissedNotifications.has(n.id);

//       console.log('🔍 Filter results:', { isUnread, isCorrectType, isForCurrentInspector, notDismissed });
      
//       return isUnread && isCorrectType && isForCurrentInspector && notDismissed;
//     });
    
//     console.log('🔍 Filtered notifications:', unreadNotifications);
    
//     if (unreadNotifications.length > 0 && !showPopup) {
//       const latestNotification = unreadNotifications[0];
//       console.log('📢 Showing stored notification:', latestNotification);
//       setCurrentNotification(latestNotification);
//       setShowPopup(true);
//       hasShownInitialNotification.current = true;
//     }
//   }, [notifications, getCurrentInspectorId]); // Removed showPopup from dependencies

//   const handleStartInspection = async () => {
//     console.log('🚀 Starting inspection with notification:', currentNotification);
    
//     if (currentNotification) {
//       // Mark notification as read if it has an ID (from storage)
//       if (currentNotification.id) {
//         await markNotificationRead(currentNotification.id);
//         setDismissedNotifications(prev => new Set([...prev, currentNotification.id]));
//       }
      
//       // Close popup immediately
//       setShowPopup(false);
//       setCurrentNotification(null);
      
//       // Navigate to inspection room with the notification data
//       if (onNavigateToInspectionRoom) {
//         onNavigateToInspectionRoom(currentNotification);
//       }
//     }
//   };

//   const handleDismiss = async () => {
//     console.log('❌ Dismissing notification');
    
//     if (currentNotification) {
//       // Mark as read if it has an ID
//       if (currentNotification.id) {
//         await markNotificationRead(currentNotification.id);
//         setDismissedNotifications(prev => new Set([...prev, currentNotification.id]));
//       }
      
//       // For event-based notifications (no ID), just track them locally
//       if (!currentNotification.id) {
//         // You might want to create a unique identifier for event-based notifications
//         const eventId = `event_${Date.now()}_${currentNotification.inspectorId}`;
//         setDismissedNotifications(prev => new Set([...prev, eventId]));
//       }
//     }
    
//     setShowPopup(false);
//     setCurrentNotification(null);
//   };

//   // Don't render if no notification to show
//   if (!showPopup || !currentNotification) {
//     return null;
//   }

//   // Get current date and time
//   const getCurrentDateTime = () => {
//     const now = new Date();
//     return now.toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-sm w-full shadow-xl">
//         {/* Compact Header */}
//         <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-t-lg">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
//                 <Award className="h-4 w-4" />
//               </div>
//               <div>
//                 <h2 className="text-sm font-bold">🎉 Bid Selected!</h2>
//                 <p className="text-green-100 text-xs">You got the job!</p>
//               </div>
//             </div>
//             <button
//               onClick={handleDismiss}
//               className="text-white hover:text-gray-200 p-1"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         {/* Compact Content */}
//         <div className="p-4 space-y-3">
//           {/* Main Message */}
//           <div className="text-center">
//             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
//               <CheckCircle className="h-5 w-5 text-green-600" />
//             </div>
//             <h3 className="text-sm font-semibold text-gray-900 mb-1">
//               Selected for {currentNotification.queryTitle}
//             </h3>
//           </div>

//           {/* Compact Details */}
//           <div className="bg-gray-50 rounded-lg p-3 space-y-2">
//             <div className="flex items-center justify-between text-xs">
//               <span className="flex items-center text-gray-600">
//                 <MapPin className="h-3 w-3 mr-1" />
//                 Location:
//               </span>
//               <span className="text-gray-800 font-medium">{currentNotification.location}</span>
//             </div>
            
//             <div className="flex items-center justify-between text-xs">
//               <span className="flex items-center text-gray-600">
//                 <DollarSign className="h-3 w-3 mr-1" />
//                 Amount:
//               </span>
//               <span className="text-green-600 font-bold">${currentNotification.amount}</span>
//             </div>
            
//             <div className="flex items-center justify-between text-xs">
//               <span className="flex items-center text-gray-600">
//                 <User className="h-3 w-3 mr-1" />
//                 Customer:
//               </span>
//               <span className="text-gray-800 font-medium">{currentNotification.customerName}</span>
//             </div>
//           </div>

//           {/* Compact Next Steps */}
//           <div className="bg-green-50 border border-green-200 rounded-lg p-2">
//             <p className="text-green-800 font-medium text-xs mb-1">Ready to start?</p>
//             <p className="text-green-700 text-xs">
//               Click "Start Inspection" to begin and chat with your customer!
//             </p>
//           </div>

//           {/* Real Current Timestamp */}
//           <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
//             <Clock className="h-3 w-3" />
//             <span>{getCurrentDateTime()}</span>
//           </div>
//         </div>

//         {/* Compact Actions */}
//         <div className="px-4 pb-4 flex space-x-2">
//           <button
//             onClick={handleStartInspection}
//             className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-xs font-medium flex items-center justify-center space-x-1"
//           >
//             <span>Start Inspection</span>
//             <ArrowRight className="h-3 w-3" />
//           </button>
//           <button
//             onClick={handleDismiss}
//             className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-xs font-medium"
//           >
//             Later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationPopup;




// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   CheckCircle, 
//   X, 
//   Award, 
//   MapPin, 
//   DollarSign, 
//   User, 
//   Clock,
//   ArrowRight,
//   Building,
//   Star,
//   Timer
// } from 'lucide-react';
// import { useQuery } from '../../../../../context/QueryContext';

// const NotificationPopup = ({ onNavigateToInspectionRoom }) => {
//   const { notifications, markNotificationRead, getCurrentInspectorId } = useQuery();
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentNotification, setCurrentNotification] = useState(null);
//   const [dismissedNotifications, setDismissedNotifications] = useState(new Set());
//   const hasShownInitialNotification = useRef(false);

//   // 🔍 DEBUG: Add this to see what's happening
//   useEffect(() => {
//     console.log('🔍 NOTIFICATION DEBUG:');
//     console.log('- notifications:', notifications);
//     console.log('- getCurrentInspectorId result:', getCurrentInspectorId());
//     console.log('- showPopup:', showPopup);
//     console.log('- currentNotification:', currentNotification);
//     console.log('- hasShownInitialNotification:', hasShownInitialNotification.current);
//   }, [notifications, showPopup, currentNotification]);

//   // Listen for bid confirmation events
//   useEffect(() => {
//     const handleBidConfirmed = (event) => {
//       const bidData = event.detail;
//       console.log('🔔 Bid confirmed event received:', bidData);
      
//       // Check if this notification is for the current inspector
//       const currentInspectorId = getCurrentInspectorId();
//       console.log('🔍 Current inspector ID:', currentInspectorId);
      
//       if (bidData.inspectorId === currentInspectorId) {
//         console.log('✅ Showing notification for current inspector');
//         setCurrentNotification(bidData);
//         setShowPopup(true);
//       } else {
//         console.log('❌ Notification not for current inspector');
//       }
//     };

//     // Listen for the custom bid confirmed event
//     window.addEventListener('bidConfirmed', handleBidConfirmed);
    
//     return () => {
//       window.removeEventListener('bidConfirmed', handleBidConfirmed);
//     };
//   }, [getCurrentInspectorId]);

//   // Check for existing notifications (from storage) - only once
//   useEffect(() => {
//     console.log('🔍 Checking for existing notifications...');
//     console.log('hasShownInitialNotification.current:', hasShownInitialNotification.current);
    
//     if (hasShownInitialNotification.current) {
//       console.log('⏭️ Already shown initial notification, skipping');
//       return;
//     }
    
//     console.log('🔍 NotificationPopup: All notifications:', notifications);
//     console.log('🔍 NotificationPopup: Current inspector ID:', getCurrentInspectorId());
    
//     const currentInspectorId = getCurrentInspectorId();
    
//     if (!currentInspectorId) {
//       console.log('❌ No current inspector ID, cannot show notifications');
//       return;
//     }
    
//     if (!notifications || notifications.length === 0) {
//       console.log('❌ No notifications available');
//       return;
//     }
    
//     const unreadNotifications = notifications.filter(n => {
//       console.log('🔍 Checking notification:', {
//         id: n.id,
//         type: n.type,
//         inspectorId: n.inspectorId,
//         currentInspectorId: currentInspectorId,
//         read: n.read
//       });
      
//       const isUnread = !n.read;
//       const isCorrectType = n.type === 'inspection_confirmed' || n.type === 'bid_confirmed';
//       const isForCurrentInspector = n.inspectorId === currentInspectorId;
//       const notDismissed = !dismissedNotifications.has(n.id);

//       console.log('🔍 Filter results:', { isUnread, isCorrectType, isForCurrentInspector, notDismissed });
      
//       return isUnread && isCorrectType && isForCurrentInspector && notDismissed;
//     });
    
//     console.log('🔍 Filtered notifications:', unreadNotifications);
    
//     if (unreadNotifications.length > 0 && !showPopup) {
//       const latestNotification = unreadNotifications[0];
//       console.log('📢 Showing stored notification:', latestNotification);
//       setCurrentNotification(latestNotification);
//       setShowPopup(true);
//       hasShownInitialNotification.current = true;
//     } else if (unreadNotifications.length === 0) {
//       console.log('❌ No unread notifications for current inspector');
//     } else if (showPopup) {
//       console.log('⏭️ Popup already showing, skipping');
//     }
//   }, [notifications, getCurrentInspectorId]);

//   const handleStartInspection = async () => {
//     console.log('🚀 Starting inspection with notification:', currentNotification);
    
//     if (currentNotification) {
//       // Mark notification as read if it has an ID (from storage)
//       if (currentNotification.id) {
//         await markNotificationRead(currentNotification.id);
//         setDismissedNotifications(prev => new Set([...prev, currentNotification.id]));
//       }
      
//       // Close popup immediately
//       setShowPopup(false);
//       setCurrentNotification(null);
      
//       // Navigate to inspection room with the notification data
//       if (onNavigateToInspectionRoom) {
//         onNavigateToInspectionRoom(currentNotification);
//       }
//     }
//   };

//   const handleDismiss = async () => {
//     console.log('❌ Dismissing notification');
    
//     if (currentNotification) {
//       // Mark as read if it has an ID
//       if (currentNotification.id) {
//         await markNotificationRead(currentNotification.id);
//         setDismissedNotifications(prev => new Set([...prev, currentNotification.id]));
//       }
      
//       // For event-based notifications (no ID), just track them locally
//       if (!currentNotification.id) {
//         // You might want to create a unique identifier for event-based notifications
//         const eventId = `event_${Date.now()}_${currentNotification.inspectorId}`;
//         setDismissedNotifications(prev => new Set([...prev, eventId]));
//       }
//     }
    
//     setShowPopup(false);
//     setCurrentNotification(null);
//   };

//   // 🔍 DEBUG: Always show a test popup for debugging
//   // Remove this after debugging
//   const showDebugPopup = () => {
//     console.log('🧪 DEBUG: Force showing popup');
//     setCurrentNotification({
//       id: 'debug-123',
//       queryTitle: 'Test Inspection',
//       location: 'Test Location',
//       amount: '150',
//       customerName: 'Test Customer',
//       inspectorId: 'test-inspector',
//       type: 'bid_confirmed'
//     });
//     setShowPopup(true);
//   };

//   // 🔍 DEBUG: Add a button to test the popup
//   useEffect(() => {
//     // Add a global function to test popup from console
//     window.testNotificationPopup = showDebugPopup;
    
//     return () => {
//       delete window.testNotificationPopup;
//     };
//   }, []);

//   // Don't render if no notification to show
//   if (!showPopup || !currentNotification) {
//     console.log('🔍 Not rendering popup:', { showPopup, currentNotification });
//     return null;
//   }

//   console.log('✅ Rendering notification popup');

//   // Get current date and time
//   const getCurrentDateTime = () => {
//     const now = new Date();
//     return now.toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-sm w-full shadow-xl">
//         {/* Compact Header */}
//         <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-t-lg">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
//                 <Award className="h-4 w-4" />
//               </div>
//               <div>
//                 <h2 className="text-sm font-bold">🎉 Bid Selected!</h2>
//                 <p className="text-green-100 text-xs">You got the job!</p>
//               </div>
//             </div>
//             <button
//               onClick={handleDismiss}
//               className="text-white hover:text-gray-200 p-1"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         {/* Compact Content */}
//         <div className="p-4 space-y-3">
//           {/* Main Message */}
//           <div className="text-center">
//             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
//               <CheckCircle className="h-5 w-5 text-green-600" />
//             </div>
//             <h3 className="text-sm font-semibold text-gray-900 mb-1">
//               Selected for {currentNotification.queryTitle}
//             </h3>
//           </div>

//           {/* Compact Details */}
//           <div className="bg-gray-50 rounded-lg p-3 space-y-2">
//             <div className="flex items-center justify-between text-xs">
//               <span className="flex items-center text-gray-600">
//                 <MapPin className="h-3 w-3 mr-1" />
//                 Location:
//               </span>
//               <span className="text-gray-800 font-medium">{currentNotification.location}</span>
//             </div>
            
//             <div className="flex items-center justify-between text-xs">
//               <span className="flex items-center text-gray-600">
//                 <DollarSign className="h-3 w-3 mr-1" />
//                 Amount:
//               </span>
//               <span className="text-green-600 font-bold">${currentNotification.amount}</span>
//             </div>
            
//             <div className="flex items-center justify-between text-xs">
//               <span className="flex items-center text-gray-600">
//                 <User className="h-3 w-3 mr-1" />
//                 Customer:
//               </span>
//               <span className="text-gray-800 font-medium">{currentNotification.customerName}</span>
//             </div>
//           </div>

//           {/* Compact Next Steps */}
//           <div className="bg-green-50 border border-green-200 rounded-lg p-2">
//             <p className="text-green-800 font-medium text-xs mb-1">Ready to start?</p>
//             <p className="text-green-700 text-xs">
//               Click "Start Inspection" to begin and chat with your customer!
//             </p>
//           </div>

//           {/* Real Current Timestamp */}
//           <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
//             <Clock className="h-3 w-3" />
//             <span>{getCurrentDateTime()}</span>
//           </div>
//         </div>

//         {/* Compact Actions */}
//         <div className="px-4 pb-4 flex space-x-2">
//           <button
//             onClick={handleStartInspection}
//             className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-xs font-medium flex items-center justify-center space-x-1"
//           >
//             <span>Start Inspection</span>
//             <ArrowRight className="h-3 w-3" />
//           </button>
//           <button
//             onClick={handleDismiss}
//             className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-xs font-medium"
//           >
//             Later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationPopup;


import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  X, 
  Award, 
  MapPin, 
  DollarSign, 
  User, 
  Clock,
  ArrowRight,
  Building,
  Star,
  Timer
} from 'lucide-react';
import { useQuery } from '../../../../../context/QueryContext';

const NotificationPopup = ({ onNavigateToInspectionRoom }) => {
  const { notifications, markNotificationRead, getCurrentInspectorId } = useQuery();
  const [showPopup, setShowPopup] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [dismissedNotifications, setDismissedNotifications] = useState(new Set());
  const hasShownInitialNotification = useRef(false);

  // 🔍 DEBUG: Add this to see what's happening
  useEffect(() => {
    console.log('🔍 NOTIFICATION DEBUG:');
    console.log('- notifications:', notifications);
    console.log('- getCurrentInspectorId result:', getCurrentInspectorId());
    console.log('- showPopup:', showPopup);
    console.log('- currentNotification:', currentNotification);
    console.log('- hasShownInitialNotification:', hasShownInitialNotification.current);
  }, [notifications, showPopup, currentNotification]);

  // Listen for bid confirmation events
  useEffect(() => {
    const handleBidConfirmed = (event) => {
      const bidData = event.detail;
      console.log('🔔 Bid confirmed event received:', bidData);
      
      // Check if this notification is for the current inspector
      const currentInspectorId = getCurrentInspectorId();
      console.log('🔍 Current inspector ID:', currentInspectorId);
      
      if (bidData.inspectorId === currentInspectorId) {
        console.log('✅ Showing notification for current inspector');
        setCurrentNotification(bidData);
        setShowPopup(true);
      } else {
        console.log('❌ Notification not for current inspector');
      }
    };

    // Listen for the custom bid confirmed event
    window.addEventListener('bidConfirmed', handleBidConfirmed);
    
    return () => {
      window.removeEventListener('bidConfirmed', handleBidConfirmed);
    };
  }, [getCurrentInspectorId]);

  // Check for existing notifications (from storage) - only once
  useEffect(() => {
    console.log('🔍 Checking for existing notifications...');
    console.log('hasShownInitialNotification.current:', hasShownInitialNotification.current);
    
    if (hasShownInitialNotification.current) {
      console.log('⏭️ Already shown initial notification, skipping');
      return;
    }
    
    console.log('🔍 NotificationPopup: All notifications:', notifications);
    console.log('🔍 NotificationPopup: Current inspector ID:', getCurrentInspectorId());
    
    const currentInspectorId = getCurrentInspectorId();
    
    if (!currentInspectorId) {
      console.log('❌ No current inspector ID, cannot show notifications');
      return;
    }
    
    if (!notifications || notifications.length === 0) {
      console.log('❌ No notifications available');
      return;
    }
    
    const unreadNotifications = notifications.filter(n => {
      console.log('🔍 Checking notification:', {
        id: n.id,
        type: n.type,
        inspectorId: n.inspectorId,
        currentInspectorId: currentInspectorId,
        read: n.read
      });
      
      const isUnread = !n.read;
      const isCorrectType = n.type === 'inspection_confirmed' || n.type === 'bid_confirmed';
      const isForCurrentInspector = n.inspectorId === currentInspectorId;
      const notDismissed = !dismissedNotifications.has(n.id);

      console.log('🔍 Filter results:', { isUnread, isCorrectType, isForCurrentInspector, notDismissed });
      
      return isUnread && isCorrectType && isForCurrentInspector && notDismissed;
    });
    
    console.log('🔍 Filtered notifications:', unreadNotifications);
    
    if (unreadNotifications.length > 0 && !showPopup) {
      const latestNotification = unreadNotifications[0];
      console.log('📢 Showing stored notification:', latestNotification);
      setCurrentNotification(latestNotification);
      setShowPopup(true);
      hasShownInitialNotification.current = true;
    } else if (unreadNotifications.length === 0) {
      console.log('❌ No unread notifications for current inspector');
    } else if (showPopup) {
      console.log('⏭️ Popup already showing, skipping');
    }
  }, [notifications, getCurrentInspectorId]);

  const handleStartInspection = async () => {
    console.log('🚀 Starting inspection with notification:', currentNotification);
    
    if (currentNotification) {
      // Mark notification as read if it has an ID (from storage)
      if (currentNotification.id) {
        await markNotificationRead(currentNotification.id);
        setDismissedNotifications(prev => new Set([...prev, currentNotification.id]));
      }
      
      // Close popup immediately
      setShowPopup(false);
      setCurrentNotification(null);
      
      // Navigate to inspection room with the notification data
      if (onNavigateToInspectionRoom) {
        onNavigateToInspectionRoom(currentNotification);
      }
    }
  };

  const handleDismiss = async () => {
    console.log('❌ Dismissing notification');
    
    if (currentNotification) {
      // Mark as read if it has an ID
      if (currentNotification.id) {
        await markNotificationRead(currentNotification.id);
        setDismissedNotifications(prev => new Set([...prev, currentNotification.id]));
      }
      
      // For event-based notifications (no ID), just track them locally
      if (!currentNotification.id) {
        // You might want to create a unique identifier for event-based notifications
        const eventId = `event_${Date.now()}_${currentNotification.inspectorId}`;
        setDismissedNotifications(prev => new Set([...prev, eventId]));
      }
    }
    
    setShowPopup(false);
    setCurrentNotification(null);
  };

  // 🔍 DEBUG: Always show a test popup for debugging
  // Remove this after debugging
  const showDebugPopup = () => {
    console.log('🧪 DEBUG: Force showing popup');
    setCurrentNotification({
      id: 'debug-123',
      queryTitle: 'Test Inspection',
      location: 'Test Location',
      amount: '150',
      customerName: 'Test Customer',
      inspectorId: 'test-inspector',
      type: 'bid_confirmed'
    });
    setShowPopup(true);
  };

  // 🔍 DEBUG: Add a button to test the popup
  useEffect(() => {
    // Add a global function to test popup from console
    window.testNotificationPopup = showDebugPopup;
    
    return () => {
      delete window.testNotificationPopup;
    };
  }, []);

  // Don't render if no notification to show
  if (!showPopup || !currentNotification) {
    console.log('🔍 Not rendering popup:', { showPopup, currentNotification });
    return null;
  }

  console.log('✅ Rendering notification popup');

  // Get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ 
        zIndex: 99999, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <div 
        className="bg-white rounded-lg max-w-sm w-full shadow-xl"
        style={{ zIndex: 100000 }}
      >
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold">🎉 Bid Selected!</h2>
                <p className="text-green-100 text-xs">You got the job!</p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-white hover:text-gray-200 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Compact Content */}
        <div className="p-4 space-y-3">
          {/* Main Message */}
          <div className="text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Selected for {currentNotification.queryTitle}
            </h3>
          </div>

          {/* Compact Details */}
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center text-gray-600">
                <MapPin className="h-3 w-3 mr-1" />
                Location:
              </span>
              <span className="text-gray-800 font-medium">{currentNotification.location}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center text-gray-600">
                <DollarSign className="h-3 w-3 mr-1" />
                Amount:
              </span>
              <span className="text-green-600 font-bold">${currentNotification.amount}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center text-gray-600">
                <User className="h-3 w-3 mr-1" />
                Customer:
              </span>
              <span className="text-gray-800 font-medium">{currentNotification.customerName}</span>
            </div>
          </div>

          {/* Compact Next Steps */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-2">
            <p className="text-green-800 font-medium text-xs mb-1">Ready to start?</p>
            <p className="text-green-700 text-xs">
              Click "Start Inspection" to begin and chat with your customer!
            </p>
          </div>

          {/* Real Current Timestamp */}
          <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{getCurrentDateTime()}</span>
          </div>
        </div>

        {/* Compact Actions */}
        <div className="px-4 pb-4 flex space-x-2">
          <button
            onClick={handleStartInspection}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-xs font-medium flex items-center justify-center space-x-1"
          >
            <span>Start Inspection</span>
            <ArrowRight className="h-3 w-3" />
          </button>
          <button
            onClick={handleDismiss}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-xs font-medium"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;