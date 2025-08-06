
// // import { createContext, useContext, useState, useEffect } from 'react';
// // import {
// //   saveQuery,
// //   getAllQueries,
// //   getActiveQueries,
// //   updateQueryStatus,
// //   addBidToQuery,
// //   getQueryById,
// //   formatQueryForDisplay,
// //   onQueriesChange,
// //   confirmInspectorForQuery,
// //   getInspectorActiveInspections,
// //   getInspectorNotifications,
// //   markNotificationAsRead,
// //   getChatMessages,
// //   sendChatMessage,
// //   markMessagesAsRead,
// //   onChatChange,
// //   createInspectorNotification // ✅ ADDED THIS IMPORT
// // } from '../utils/queryStorage';

// // // Create the context
// // const QueryContext = createContext();

// // // Custom hook
// // export const useQuery = () => {
// //   const context = useContext(QueryContext);
// //   if (!context) {
// //     throw new Error('useQuery must be used within a QueryProvider');
// //   }
// //   return context;
// // };

// // // Provider
// // export const QueryProvider = ({ children }) => {
// //   const [queries, setQueries] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [notifications, setNotifications] = useState([]);
// //   const [chatMessages, setChatMessages] = useState({});

// //   useEffect(() => {
// //     loadQueries();
// //     loadNotifications();

// //     // Listen for queries changes
// //     const unsubscribeQueries = onQueriesChange((changeEvent) => {
// //       console.log('QueryContext: Queries changed:', changeEvent);
// //       loadQueries();
// //       loadNotifications();
// //     });

// //     // Listen for chat changes
// //     const unsubscribeChat = onChatChange((eventData) => {
// //       console.log('QueryContext: Chat changed:', eventData);
// //       if (eventData.inspectionId) {
// //         // Update chat messages for the specific inspection
// //         const updatedMessages = getChatMessages(eventData.inspectionId);
// //         setChatMessages(prev => ({
// //           ...prev,
// //           [eventData.inspectionId]: updatedMessages
// //         }));
// //       }
// //     });

// //     // ✅ ADDED: Listen for bid confirmed events
// //     const handleBidConfirmed = (event) => {
// //       console.log('🔔 QueryContext: Bid confirmed event received:', event.detail);
// //       try {
// //         const bidData = event.detail;
        
// //         // Create notification in storage
// //         const notificationData = {
// //           type: 'bid_confirmed',
// //           queryId: bidData.queryId,
// //           bidId: bidData.bidId,
// //           queryTitle: bidData.queryTitle,
// //           location: bidData.location,
// //           amount: bidData.amount,
// //           customerName: bidData.customerName,
// //           bidDetails: bidData.bidDetails
// //         };
        
// //         // Create notification for the inspector
// //         createInspectorNotification(bidData.inspectorId, notificationData);
        
// //         // Refresh notifications
// //         loadNotifications();
        
// //         console.log('✅ QueryContext: Notification created successfully');
// //       } catch (error) {
// //         console.error('❌ QueryContext: Error creating notification:', error);
// //       }
// //     };

// //     window.addEventListener('bidConfirmed', handleBidConfirmed);

// //     // Periodic refresh for real-time updates
// //     const interval = setInterval(() => {
// //       loadQueries();
// //       loadNotifications();
// //     }, 10000);

// //     return () => {
// //       clearInterval(interval);
// //       if (unsubscribeQueries) unsubscribeQueries();
// //       if (unsubscribeChat) unsubscribeChat();
// //       window.removeEventListener('bidConfirmed', handleBidConfirmed); // ✅ ADDED THIS
// //     };
// //   }, []);

// //   const loadQueries = () => {
// //     try {
// //       setLoading(true);
// //       const allQueries = getAllQueries();
// //       setQueries(allQueries);
// //       setError(null);
// //       console.log('QueryContext: Loaded queries:', allQueries.length);
// //     } catch (err) {
// //       setError('Failed to load queries');
// //       console.error('QueryContext: Error loading queries:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const loadNotifications = () => {
// //     try {
// //       const currentInspectorId = getCurrentInspectorId();
// //       const inspectorNotifications = getInspectorNotifications(currentInspectorId);
// //       setNotifications(inspectorNotifications);
// //       console.log('QueryContext: Loaded notifications:', inspectorNotifications.length);
// //     } catch (err) {
// //       console.error('QueryContext: Error loading notifications:', err);
// //     }
// //   };

// //   const getCurrentInspectorId = () => {
// //     // In a real app, this would come from auth context
// //     return 'inspector-001';
// //   };

// //   const getCurrentCustomerId = () => {
// //     // In a real app, this would come from auth context
// //     return 'customer-001';
// //   };

// //   const submitQuery = async (queryData) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const transformedData = {
// //         location: queryData.location,
// //         country: queryData.country,
// //         commodity: queryData.commodity,
// //         subCommodity: queryData.subCommodity,
// //         riceType: queryData.riceType,
// //         volume: queryData.volume,
// //         unit: queryData.unit,
// //         urgency: queryData.urgency,
// //         inspectionDateType: queryData.inspectionDateType,
// //         inspectionDate: queryData.inspectionDate,
// //         inspectionDateFrom: queryData.inspectionDateFrom,
// //         inspectionDateTo: queryData.inspectionDateTo,
// //         description: queryData.description,
// //         companyName: queryData.companyName,
// //         contactPerson: queryData.contactPerson,
// //         email: queryData.email,
// //         phone: queryData.phone,
// //         expectedBudget: queryData.expectedBudget,
// //         selectedCertifications: queryData.selectedCertifications || [],
// //         inspectionTypes: queryData.inspectionTypes || []
// //       };

// //       console.log('QueryContext: Submitting query:', transformedData);
// //       const newQuery = saveQuery(transformedData);
// //       loadQueries();
// //       return newQuery;
// //     } catch (err) {
// //       setError('Failed to submit query');
// //       console.error('QueryContext: Error submitting query:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getActiveQueriesForInspector = () => {
// //     try {
// //       const activeQueries = getActiveQueries();
// //       return activeQueries.map(query => formatQueryForDisplay(query));
// //     } catch (err) {
// //       console.error('QueryContext: Error getting active queries:', err);
// //       return [];
// //     }
// //   };

// //   const getCustomerQueries = (customerEmail) => {
// //     try {
// //       const customerQueries = queries.filter(q => q.email === customerEmail);
// //       return customerQueries.map(query => formatQueryForDisplay(query));
// //     } catch (err) {
// //       console.error('QueryContext: Error getting customer queries:', err);
// //       return [];
// //     }
// //   };

// //   const placeBid = async (queryId, bidData) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       // ✅ Enhanced bid data with inspector ID
// //       const enhancedBidData = {
// //         ...bidData,
// //         inspectorId: bidData.inspectorId || getCurrentInspectorId(), // Ensure inspector ID is included
// //         submittedAt: new Date().toISOString(),
// //         status: 'pending'
// //       };
      
// //       console.log('QueryContext: Placing bid with data:', enhancedBidData);
      
// //       const updatedQuery = addBidToQuery(queryId, enhancedBidData);
// //       if (updatedQuery) {
// //         loadQueries();
// //         return updatedQuery;
// //       } else {
// //         throw new Error('Query not found');
// //       }
// //     } catch (err) {
// //       setError('Failed to place bid');
// //       console.error('QueryContext: Error placing bid:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const confirmInspector = async (queryId, bidId, inspectorId) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
      
// //       if (!queryId || !bidId || !inspectorId) {
// //         throw new Error('Missing required parameters');
// //       }
      
// //       const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
// //       if (!updatedQuery) {
// //         throw new Error('Query or bid not found');
// //       }
      
// //       console.log('✅ QueryContext: Inspector confirmed successfully');
      
// //       // Refresh data
// //       loadQueries();
// //       loadNotifications();
      
// //       return updatedQuery;
// //     } catch (err) {
// //       setError(`Failed to confirm inspector: ${err.message}`);
// //       console.error('❌ QueryContext: Error confirming inspector:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getActiveInspectionsForInspector = () => {
// //     try {
// //       const currentInspectorId = getCurrentInspectorId();
// //       const activeInspections = getInspectorActiveInspections(currentInspectorId);
// //       return activeInspections.map(q => formatQueryForDisplay(q));
// //     } catch (err) {
// //       console.error('QueryContext: Error getting active inspections:', err);
// //       return [];
// //     }
// //   };

// //   const markNotificationRead = async (notificationId) => {
// //     try {
// //       console.log('📖 QueryContext: Marking notification as read:', notificationId);
// //       markNotificationAsRead(notificationId);
// //       loadNotifications();
// //     } catch (err) {
// //       console.error('QueryContext: Error marking notification as read:', err);
// //     }
// //   };

// //   const updateStatus = async (queryId, newStatus) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const updatedQuery = updateQueryStatus(queryId, newStatus);
// //       if (updatedQuery) {
// //         loadQueries();
// //         return updatedQuery;
// //       } else {
// //         throw new Error('Query not found');
// //       }
// //     } catch (err) {
// //       setError('Failed to update status');
// //       console.error('QueryContext: Error updating status:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getQuery = (queryId) => {
// //     try {
// //       const query = getQueryById(queryId);
// //       return query ? formatQueryForDisplay(query) : null;
// //     } catch (err) {
// //       console.error('QueryContext: Error getting query:', err);
// //       return null;
// //     }
// //   };

// //   const getQueryStats = () => {
// //     try {
// //       const totalQueries = queries.length;
// //       const active = queries.filter(q => q.status === 'Active').length;
// //       const completed = queries.filter(q => q.status === 'Completed').length;
// //       const inProgress = queries.filter(q => q.status === 'In Progress').length;
// //       return { total: totalQueries, active, completed, inProgress };
// //     } catch (err) {
// //       console.error('QueryContext: Error getting stats:', err);
// //       return { total: 0, active: 0, completed: 0, inProgress: 0 };
// //     }
// //   };

// //   const refreshQueries = () => {
// //     console.log('QueryContext: Manual refresh triggered');
// //     loadQueries();
// //     loadNotifications();
// //   };

// //   // ✅ NEW: Create notification function
// //   const createNotification = async (inspectorId, notificationData) => {
// //     try {
// //       console.log('🔔 QueryContext: Creating notification for inspector:', inspectorId);
// //       console.log('📋 Notification data:', notificationData);
      
// //       const notification = createInspectorNotification(inspectorId, notificationData);
      
// //       // Refresh notifications
// //       loadNotifications();
      
// //       console.log('✅ QueryContext: Notification created successfully:', notification.id);
// //       return notification;
// //     } catch (error) {
// //       console.error('❌ QueryContext: Error creating notification:', error);
// //       throw error;
// //     }
// //   };

// //   // ✅ NEW: Get unread notification count
// //   const getUnreadNotificationCount = () => {
// //     try {
// //       const currentInspectorId = getCurrentInspectorId();
// //       const unreadCount = notifications.filter(n => 
// //         n.inspectorId === currentInspectorId && !n.read
// //       ).length;
// //       return unreadCount;
// //     } catch (error) {
// //       console.error('QueryContext: Error getting unread notification count:', error);
// //       return 0;
// //     }
// //   };

// //   // =====================
// //   // CHAT FUNCTIONALITY
// //   // =====================

// //   const sendMessage = async (inspectionId, messageData) => {
// //     try {
// //       console.log('QueryContext: Sending message:', { inspectionId, messageData });
      
// //       const newMessage = await sendChatMessage(inspectionId, messageData);
      
// //       // Update local state immediately for better UX
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: [...(prev[inspectionId] || []), newMessage]
// //       }));

// //       // Dispatch custom event for real-time updates across components
// //       window.dispatchEvent(new CustomEvent('chatUpdated', {
// //         detail: { inspectionId, message: newMessage }
// //       }));

// //       console.log('QueryContext: Message sent successfully:', newMessage.id);
// //       return newMessage;
// //     } catch (err) {
// //       console.error('QueryContext: Error sending message:', err);
// //       throw err;
// //     }
// //   };

// //   const loadChatMessages = (inspectionId) => {
// //     try {
// //       console.log('QueryContext: Loading chat messages for inspection:', inspectionId);
// //       const messages = getChatMessages(inspectionId);
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: messages
// //       }));
// //       console.log('QueryContext: Loaded', messages.length, 'messages for inspection:', inspectionId);
// //       return messages;
// //     } catch (err) {
// //       console.error('QueryContext: Error loading chat messages:', err);
// //       return [];
// //     }
// //   };

// //   const getChatForInspection = (inspectionId) => {
// //     try {
// //       // First try to get from local state
// //       if (chatMessages[inspectionId]) {
// //         return chatMessages[inspectionId];
// //       }
      
// //       // If not in state, load from storage
// //       const messages = getChatMessages(inspectionId);
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: messages
// //       }));
      
// //       return messages;
// //     } catch (err) {
// //       console.error('QueryContext: Error getting chat for inspection:', err);
// //       return [];
// //     }
// //   };

// //   const markChatMessagesRead = async (inspectionId, userId) => {
// //     try {
// //       await markMessagesAsRead(inspectionId, userId);
// //       const updatedMessages = getChatMessages(inspectionId);
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: updatedMessages
// //       }));
// //       console.log('QueryContext: Messages marked as read for inspection:', inspectionId);
// //     } catch (err) {
// //       console.error('QueryContext: Error marking messages read:', err);
// //     }
// //   };

// //   // Enhanced chat change listener that handles all chat events
// //   const handleChatChange = (callback) => {
// //     const eventHandler = (event) => {
// //       console.log('QueryContext: Chat change event received:', event.detail);
// //       callback(event.detail);
// //     };

// //     // Listen for multiple types of chat events
// //     window.addEventListener('newChatMessage', eventHandler);
// //     window.addEventListener('chatUpdated', eventHandler);
// //     window.addEventListener('messagesRead', eventHandler);

// //     // Return cleanup function
// //     return () => {
// //       window.removeEventListener('newChatMessage', eventHandler);
// //       window.removeEventListener('chatUpdated', eventHandler);
// //       window.removeEventListener('messagesRead', eventHandler);
// //     };
// //   };

// //   // Initialize chat for inspection
// //   const initializeInspectionChat = async (inspectionId, inspectorName, customerName) => {
// //     try {
// //       const existingMessages = getChatMessages(inspectionId);
      
// //       // Only initialize if no messages exist
// //       if (existingMessages.length === 0) {
// //         const systemMessage = {
// //           senderId: 'system',
// //           senderName: 'System',
// //           senderType: 'system',
// //           message: `Inspection chat started! Inspector ${inspectorName} is now working with ${customerName}.`,
// //           type: 'system'
// //         };

// //         await sendMessage(inspectionId, systemMessage);
// //         console.log('QueryContext: Chat initialized for inspection:', inspectionId);
// //       }
// //     } catch (err) {
// //       console.error('QueryContext: Error initializing chat:', err);
// //     }
// //   };

// //   // Helper function to get chat statistics
// //   const getChatStats = (inspectionId, userId) => {
// //     try {
// //       const messages = getChatForInspection(inspectionId);
// //       const unreadCount = messages.filter(msg => 
// //         msg.senderId !== userId && !msg.read
// //       ).length;
      
// //       return {
// //         totalMessages: messages.length,
// //         unreadCount,
// //         lastMessage: messages.length > 0 ? messages[messages.length - 1] : null
// //       };
// //     } catch (err) {
// //       console.error('QueryContext: Error getting chat stats:', err);
// //       return { totalMessages: 0, unreadCount: 0, lastMessage: null };
// //     }
// //   };

// //   // ✅ NEW: Debug functions for testing
// //   const debugFunctions = {
// //     // Force create a test notification
// //     createTestNotification: () => {
// //       const testData = {
// //         type: 'bid_confirmed',
// //         queryId: 'TEST-QUERY-123',
// //         bidId: 'TEST-BID-456',
// //         queryTitle: 'Test Rice Inspection',
// //         location: 'Test Location, India',
// //         amount: 750,
// //         customerName: 'Test Customer',
// //         bidDetails: {
// //           inspectorName: 'Test Inspector',
// //           company: 'Test Company',
// //           proposedTimeline: '2 days',
// //           rating: 4.8,
// //           experience: '5 years'
// //         }
// //       };
      
// //       return createNotification(getCurrentInspectorId(), testData);
// //     },
    
// //     // Test event dispatch
// //     testEventDispatch: () => {
// //       const testData = {
// //         type: 'bid_confirmed',
// //         inspectorId: getCurrentInspectorId(),
// //         queryId: 'TEST-QUERY-123',
// //         bidId: 'TEST-BID-456',
// //         queryTitle: 'Test Rice Inspection',
// //         location: 'Test Location, India',
// //         amount: 750,
// //         customerName: 'Test Customer',
// //         bidDetails: {
// //           inspectorName: 'Test Inspector',
// //           company: 'Test Company',
// //           proposedTimeline: '2 days',
// //           rating: 4.8,
// //           experience: '5 years'
// //         }
// //       };
      
// //       window.dispatchEvent(new CustomEvent('bidConfirmed', {
// //         detail: testData
// //       }));
      
// //       console.log('🧪 Test event dispatched:', testData);
// //     },
    
// //     // Get current inspector ID
// //     getCurrentInspectorId,
    
// //     // Get all notifications
// //     getAllNotifications: () => notifications,
    
// //     // Force refresh
// //     forceRefresh: () => {
// //       loadQueries();
// //       loadNotifications();
// //     }
// //   };

// //   // Context value with all functions and state
// //   const value = {
// //     // State
// //     queries,
// //     loading,
// //     error,
// //     notifications,
// //     chatMessages,

// //     // Query functions
// //     submitQuery,
// //     placeBid,
// //     confirmInspector,
// //     updateStatus,
// //     loadQueries,
// //     refreshQueries,
// //     getActiveQueriesForInspector,
// //     getActiveInspectionsForInspector,
// //     getCustomerQueries,
// //     getQuery,
// //     getQueryStats,

// //     // Notification functions
// //     markNotificationRead,
// //     createNotification, // ✅ NEW
// //     getUnreadNotificationCount, // ✅ NEW

// //     // Utility functions
// //     getCurrentInspectorId,
// //     getCurrentCustomerId,
// //     clearError: () => setError(null),

// //     // =====================
// //     // CHAT FUNCTIONS
// //     // =====================
    
// //     // Core chat functions
// //     sendMessage,
// //     loadChatMessages,
// //     getChatForInspection,
// //     markChatMessagesRead,
// //     onChatChange: handleChatChange,
    
// //     // Additional chat functions
// //     initializeInspectionChat,
// //     getChatStats,
    
// //     // ✅ Debug functions (remove in production)
// //     debug: debugFunctions
// //   };

// //   useEffect(() => {
// //   window.queryContext = value;
// //   return () => {
// //     delete window.queryContext;
// //   };
// // }, [value]);

// //   return (
// //     <QueryContext.Provider value={value}>
// //       {children}
// //     </QueryContext.Provider>
// //   );
// // };

// // export default QueryContext;



// // import { createContext, useContext, useState, useEffect } from 'react';
// // import {
// //   saveQuery,
// //   getAllQueries,
// //   getActiveQueries,
// //   updateQueryStatus,
// //   addBidToQuery,
// //   getQueryById,
// //   formatQueryForDisplay,
// //   onQueriesChange,
// //   confirmInspectorForQuery,
// //   getInspectorActiveInspections,
// //   getInspectorNotifications,
// //   markNotificationAsRead,
// //   getChatMessages,
// //   sendChatMessage,
// //   markMessagesAsRead,
// //   onChatChange,
// //   createInspectorNotification
// // } from '../utils/queryStorage';

// // // Create the context
// // const QueryContext = createContext();

// // // Custom hook
// // export const useQuery = () => {
// //   const context = useContext(QueryContext);
// //   if (!context) {
// //     throw new Error('useQuery must be used within a QueryProvider');
// //   }
// //   return context;
// // };

// // // Provider
// // export const QueryProvider = ({ children }) => {
// //   const [queries, setQueries] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [notifications, setNotifications] = useState([]);
// //   const [chatMessages, setChatMessages] = useState({});

// //   useEffect(() => {
// //     loadQueries();
// //     loadNotifications();

// //     // Listen for queries changes
// //     const unsubscribeQueries = onQueriesChange((changeEvent) => {
// //       console.log('QueryContext: Queries changed:', changeEvent);
// //       loadQueries();
// //       loadNotifications();
// //     });

// //     // Listen for chat changes
// //     const unsubscribeChat = onChatChange((eventData) => {
// //       console.log('QueryContext: Chat changed:', eventData);
// //       if (eventData.inspectionId) {
// //         // Update chat messages for the specific inspection
// //         const updatedMessages = getChatMessages(eventData.inspectionId);
// //         setChatMessages(prev => ({
// //           ...prev,
// //           [eventData.inspectionId]: updatedMessages
// //         }));
// //       }
// //     });

// //     // ❌ REMOVED: Duplicate bid confirmed event listener
// //     // The inspector bidding room will handle the event directly
// //     // The customer component will call confirmInspector directly

// //     // Periodic refresh for real-time updates
// //     const interval = setInterval(() => {
// //       loadQueries();
// //       loadNotifications();
// //     }, 10000);

// //     return () => {
// //       clearInterval(interval);
// //       if (unsubscribeQueries) unsubscribeQueries();
// //       if (unsubscribeChat) unsubscribeChat();
// //       // ❌ REMOVED: window.removeEventListener('bidConfirmed', handleBidConfirmed);
// //     };
// //   }, []);

// //   const loadQueries = () => {
// //     try {
// //       setLoading(true);
// //       const allQueries = getAllQueries();
// //       setQueries(allQueries);
// //       setError(null);
// //       console.log('QueryContext: Loaded queries:', allQueries.length);
// //     } catch (err) {
// //       setError('Failed to load queries');
// //       console.error('QueryContext: Error loading queries:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const loadNotifications = () => {
// //     try {
// //       const currentInspectorId = getCurrentInspectorId();
// //       const inspectorNotifications = getInspectorNotifications(currentInspectorId);
// //       setNotifications(inspectorNotifications);
// //       console.log('QueryContext: Loaded notifications:', inspectorNotifications.length);
// //     } catch (err) {
// //       console.error('QueryContext: Error loading notifications:', err);
// //     }
// //   };

// //   const getCurrentInspectorId = () => {
// //     // In a real app, this would come from auth context
// //     return 'inspector-001';
// //   };

// //   const getCurrentCustomerId = () => {
// //     // In a real app, this would come from auth context
// //     return 'customer-001';
// //   };

// //   const submitQuery = async (queryData) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const transformedData = {
// //         location: queryData.location,
// //         country: queryData.country,
// //         commodity: queryData.commodity,
// //         subCommodity: queryData.subCommodity,
// //         riceType: queryData.riceType,
// //         volume: queryData.volume,
// //         unit: queryData.unit,
// //         urgency: queryData.urgency,
// //         inspectionDateType: queryData.inspectionDateType,
// //         inspectionDate: queryData.inspectionDate,
// //         inspectionDateFrom: queryData.inspectionDateFrom,
// //         inspectionDateTo: queryData.inspectionDateTo,
// //         description: queryData.description,
// //         companyName: queryData.companyName,
// //         contactPerson: queryData.contactPerson,
// //         email: queryData.email,
// //         phone: queryData.phone,
// //         expectedBudget: queryData.expectedBudget,
// //         selectedCertifications: queryData.selectedCertifications || [],
// //         inspectionTypes: queryData.inspectionTypes || []
// //       };

// //       console.log('QueryContext: Submitting query:', transformedData);
// //       const newQuery = saveQuery(transformedData);
// //       loadQueries();
// //       return newQuery;
// //     } catch (err) {
// //       setError('Failed to submit query');
// //       console.error('QueryContext: Error submitting query:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getActiveQueriesForInspector = () => {
// //     try {
// //       const activeQueries = getActiveQueries();
// //       return activeQueries.map(query => formatQueryForDisplay(query));
// //     } catch (err) {
// //       console.error('QueryContext: Error getting active queries:', err);
// //       return [];
// //     }
// //   };

// //   const getCustomerQueries = (customerEmail) => {
// //     try {
// //       const customerQueries = queries.filter(q => q.email === customerEmail);
// //       return customerQueries.map(query => formatQueryForDisplay(query));
// //     } catch (err) {
// //       console.error('QueryContext: Error getting customer queries:', err);
// //       return [];
// //     }
// //   };

// //   const placeBid = async (queryId, bidData) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       // ✅ Enhanced bid data with inspector ID
// //       const enhancedBidData = {
// //         ...bidData,
// //         inspectorId: bidData.inspectorId || getCurrentInspectorId(), // Ensure inspector ID is included
// //         submittedAt: new Date().toISOString(),
// //         status: 'pending'
// //       };
      
// //       console.log('QueryContext: Placing bid with data:', enhancedBidData);
      
// //       const updatedQuery = addBidToQuery(queryId, enhancedBidData);
// //       if (updatedQuery) {
// //         loadQueries();
// //         return updatedQuery;
// //       } else {
// //         throw new Error('Query not found');
// //       }
// //     } catch (err) {
// //       setError('Failed to place bid');
// //       console.error('QueryContext: Error placing bid:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ UPDATED: This function now handles BOTH the confirmation AND the notification
// //   const confirmInspector = async (queryId, bidId, inspectorId) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
      
// //       if (!queryId || !bidId || !inspectorId) {
// //         throw new Error('Missing required parameters');
// //       }
      
// //       // ✅ This function in queryStorage.js already creates the notification
// //       // No need for separate event dispatching
// //       const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
// //       if (!updatedQuery) {
// //         throw new Error('Query or bid not found');
// //       }
      
// //       console.log('✅ QueryContext: Inspector confirmed successfully');
      
// //       // Refresh data
// //       loadQueries();
// //       loadNotifications(); // This will load the newly created notification
      
// //       return updatedQuery;
// //     } catch (err) {
// //       setError(`Failed to confirm inspector: ${err.message}`);
// //       console.error('❌ QueryContext: Error confirming inspector:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getActiveInspectionsForInspector = () => {
// //     try {
// //       const currentInspectorId = getCurrentInspectorId();
// //       const activeInspections = getInspectorActiveInspections(currentInspectorId);
// //       return activeInspections.map(q => formatQueryForDisplay(q));
// //     } catch (err) {
// //       console.error('QueryContext: Error getting active inspections:', err);
// //       return [];
// //     }
// //   };

// //   const markNotificationRead = async (notificationId) => {
// //     try {
// //       console.log('📖 QueryContext: Marking notification as read:', notificationId);
// //       markNotificationAsRead(notificationId);
// //       loadNotifications();
// //     } catch (err) {
// //       console.error('QueryContext: Error marking notification as read:', err);
// //     }
// //   };

// //   const updateStatus = async (queryId, newStatus) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const updatedQuery = updateQueryStatus(queryId, newStatus);
// //       if (updatedQuery) {
// //         loadQueries();
// //         return updatedQuery;
// //       } else {
// //         throw new Error('Query not found');
// //       }
// //     } catch (err) {
// //       setError('Failed to update status');
// //       console.error('QueryContext: Error updating status:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getQuery = (queryId) => {
// //     try {
// //       const query = getQueryById(queryId);
// //       return query ? formatQueryForDisplay(query) : null;
// //     } catch (err) {
// //       console.error('QueryContext: Error getting query:', err);
// //       return null;
// //     }
// //   };

// //   const getQueryStats = () => {
// //     try {
// //       const totalQueries = queries.length;
// //       const active = queries.filter(q => q.status === 'Active').length;
// //       const completed = queries.filter(q => q.status === 'Completed').length;
// //       const inProgress = queries.filter(q => q.status === 'In Progress').length;
// //       return { total: totalQueries, active, completed, inProgress };
// //     } catch (err) {
// //       console.error('QueryContext: Error getting stats:', err);
// //       return { total: 0, active: 0, completed: 0, inProgress: 0 };
// //     }
// //   };

// //   const refreshQueries = () => {
// //     console.log('QueryContext: Manual refresh triggered');
// //     loadQueries();
// //     loadNotifications();
// //   };

// //   // ✅ NEW: Create notification function
// //   const createNotification = async (inspectorId, notificationData) => {
// //     try {
// //       console.log('🔔 QueryContext: Creating notification for inspector:', inspectorId);
// //       console.log('📋 Notification data:', notificationData);
      
// //       const notification = createInspectorNotification(inspectorId, notificationData);
      
// //       // Refresh notifications
// //       loadNotifications();
      
// //       console.log('✅ QueryContext: Notification created successfully:', notification.id);
// //       return notification;
// //     } catch (error) {
// //       console.error('❌ QueryContext: Error creating notification:', error);
// //       throw error;
// //     }
// //   };

// //   // ✅ NEW: Get unread notification count
// //   const getUnreadNotificationCount = () => {
// //     try {
// //       const currentInspectorId = getCurrentInspectorId();
// //       const unreadCount = notifications.filter(n => 
// //         n.inspectorId === currentInspectorId && !n.read
// //       ).length;
// //       return unreadCount;
// //     } catch (error) {
// //       console.error('QueryContext: Error getting unread notification count:', error);
// //       return 0;
// //     }
// //   };

// //   // =====================
// //   // CHAT FUNCTIONALITY
// //   // =====================

// //   const sendMessage = async (inspectionId, messageData) => {
// //     try {
// //       console.log('QueryContext: Sending message:', { inspectionId, messageData });
      
// //       const newMessage = await sendChatMessage(inspectionId, messageData);
      
// //       // Update local state immediately for better UX
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: [...(prev[inspectionId] || []), newMessage]
// //       }));

// //       // Dispatch custom event for real-time updates across components
// //       window.dispatchEvent(new CustomEvent('chatUpdated', {
// //         detail: { inspectionId, message: newMessage }
// //       }));

// //       console.log('QueryContext: Message sent successfully:', newMessage.id);
// //       return newMessage;
// //     } catch (err) {
// //       console.error('QueryContext: Error sending message:', err);
// //       throw err;
// //     }
// //   };

// //   const loadChatMessages = (inspectionId) => {
// //     try {
// //       console.log('QueryContext: Loading chat messages for inspection:', inspectionId);
// //       const messages = getChatMessages(inspectionId);
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: messages
// //       }));
// //       console.log('QueryContext: Loaded', messages.length, 'messages for inspection:', inspectionId);
// //       return messages;
// //     } catch (err) {
// //       console.error('QueryContext: Error loading chat messages:', err);
// //       return [];
// //     }
// //   };

// //   const getChatForInspection = (inspectionId) => {
// //     try {
// //       // First try to get from local state
// //       if (chatMessages[inspectionId]) {
// //         return chatMessages[inspectionId];
// //       }
      
// //       // If not in state, load from storage
// //       const messages = getChatMessages(inspectionId);
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: messages
// //       }));
      
// //       return messages;
// //     } catch (err) {
// //       console.error('QueryContext: Error getting chat for inspection:', err);
// //       return [];
// //     }
// //   };

// //   const markChatMessagesRead = async (inspectionId, userId) => {
// //     try {
// //       await markMessagesAsRead(inspectionId, userId);
// //       const updatedMessages = getChatMessages(inspectionId);
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: updatedMessages
// //       }));
// //       console.log('QueryContext: Messages marked as read for inspection:', inspectionId);
// //     } catch (err) {
// //       console.error('QueryContext: Error marking messages read:', err);
// //     }
// //   };

// //   // Enhanced chat change listener that handles all chat events
// //   const handleChatChange = (callback) => {
// //     const eventHandler = (event) => {
// //       console.log('QueryContext: Chat change event received:', event.detail);
// //       callback(event.detail);
// //     };

// //     // Listen for multiple types of chat events
// //     window.addEventListener('newChatMessage', eventHandler);
// //     window.addEventListener('chatUpdated', eventHandler);
// //     window.addEventListener('messagesRead', eventHandler);

// //     // Return cleanup function
// //     return () => {
// //       window.removeEventListener('newChatMessage', eventHandler);
// //       window.removeEventListener('chatUpdated', eventHandler);
// //       window.removeEventListener('messagesRead', eventHandler);
// //     };
// //   };

// //   // Initialize chat for inspection
// //   const initializeInspectionChat = async (inspectionId, inspectorName, customerName) => {
// //     try {
// //       const existingMessages = getChatMessages(inspectionId);
      
// //       // Only initialize if no messages exist
// //       if (existingMessages.length === 0) {
// //         const systemMessage = {
// //           senderId: 'system',
// //           senderName: 'System',
// //           senderType: 'system',
// //           message: `Inspection chat started! Inspector ${inspectorName} is now working with ${customerName}.`,
// //           type: 'system'
// //         };

// //         await sendMessage(inspectionId, systemMessage);
// //         console.log('QueryContext: Chat initialized for inspection:', inspectionId);
// //       }
// //     } catch (err) {
// //       console.error('QueryContext: Error initializing chat:', err);
// //     }
// //   };

// //   // Helper function to get chat statistics
// //   const getChatStats = (inspectionId, userId) => {
// //     try {
// //       const messages = getChatForInspection(inspectionId);
// //       const unreadCount = messages.filter(msg => 
// //         msg.senderId !== userId && !msg.read
// //       ).length;
      
// //       return {
// //         totalMessages: messages.length,
// //         unreadCount,
// //         lastMessage: messages.length > 0 ? messages[messages.length - 1] : null
// //       };
// //     } catch (err) {
// //       console.error('QueryContext: Error getting chat stats:', err);
// //       return { totalMessages: 0, unreadCount: 0, lastMessage: null };
// //     }
// //   };

// //   // ✅ NEW: Debug functions for testing
// //   const debugFunctions = {
// //     // Force create a test notification
// //     createTestNotification: () => {
// //       const testData = {
// //         type: 'bid_confirmed',
// //         queryId: 'TEST-QUERY-123',
// //         bidId: 'TEST-BID-456',
// //         queryTitle: 'Test Rice Inspection',
// //         location: 'Test Location, India',
// //         amount: 750,
// //         customerName: 'Test Customer',
// //         bidDetails: {
// //           inspectorName: 'Test Inspector',
// //           company: 'Test Company',
// //           proposedTimeline: '2 days',
// //           rating: 4.8,
// //           experience: '5 years'
// //         }
// //       };
      
// //       return createNotification(getCurrentInspectorId(), testData);
// //     },
    
// //     // Test event dispatch
// //     testEventDispatch: () => {
// //       const testData = {
// //         type: 'bid_confirmed',
// //         inspectorId: getCurrentInspectorId(),
// //         queryId: 'TEST-QUERY-123',
// //         bidId: 'TEST-BID-456',
// //         queryTitle: 'Test Rice Inspection',
// //         location: 'Test Location, India',
// //         amount: 750,
// //         customerName: 'Test Customer',
// //         bidDetails: {
// //           inspectorName: 'Test Inspector',
// //           company: 'Test Company',
// //           proposedTimeline: '2 days',
// //           rating: 4.8,
// //           experience: '5 years'
// //         }
// //       };
      
// //       window.dispatchEvent(new CustomEvent('bidConfirmed', {
// //         detail: testData
// //       }));
      
// //       console.log('🧪 Test event dispatched:', testData);
// //     },
    
// //     // Get current inspector ID
// //     getCurrentInspectorId,
    
// //     // Get all notifications
// //     getAllNotifications: () => notifications,
    
// //     // Force refresh
// //     forceRefresh: () => {
// //       loadQueries();
// //       loadNotifications();
// //     }
// //   };

// //   // Context value with all functions and state
// //   const value = {
// //     // State
// //     queries,
// //     loading,
// //     error,
// //     notifications,
// //     chatMessages,

// //     // Query functions
// //     submitQuery,
// //     placeBid,
// //     confirmInspector,
// //     updateStatus,
// //     loadQueries,
// //     refreshQueries,
// //     getActiveQueriesForInspector,
// //     getActiveInspectionsForInspector,
// //     getCustomerQueries,
// //     getQuery,
// //     getQueryStats,

// //     // Notification functions
// //     markNotificationRead,
// //     createNotification, // ✅ NEW
// //     getUnreadNotificationCount, // ✅ NEW

// //     // Utility functions
// //     getCurrentInspectorId,
// //     getCurrentCustomerId,
// //     clearError: () => setError(null),

// //     // =====================
// //     // CHAT FUNCTIONS
// //     // =====================
    
// //     // Core chat functions
// //     sendMessage,
// //     loadChatMessages,
// //     getChatForInspection,
// //     markChatMessagesRead,
// //     onChatChange: handleChatChange,
    
// //     // Additional chat functions
// //     initializeInspectionChat,
// //     getChatStats,
    
// //     // ✅ Debug functions (remove in production)
// //     debug: debugFunctions
// //   };

// //   useEffect(() => {
// //   window.queryContext = value;
// //   return () => {
// //     delete window.queryContext;
// //   };
// // }, [value]);

// //   return (
// //     <QueryContext.Provider value={value}>
// //       {children}
// //     </QueryContext.Provider>
// //   );
// // };

// // export default QueryContext;



// // import { createContext, useContext, useState, useEffect } from 'react';
// // import {
// //   saveQuery,
// //   getAllQueries,
// //   getActiveQueries,
// //   updateQueryStatus,
// //   addBidToQuery,
// //   getQueryById,
// //   formatQueryForDisplay,
// //   onQueriesChange,
// //   confirmInspectorForQuery,
// //   getInspectorActiveInspections,
// //   getInspectorNotifications,
// //   markNotificationAsRead,
// //   getChatMessages,
// //   sendChatMessage,
// //   markMessagesAsRead,
// //   onChatChange,
// //   createInspectorNotification
// // } from '../utils/queryStorage';

// // // Create the context
// // const QueryContext = createContext();

// // // Custom hook
// // export const useQuery = () => {
// //   const context = useContext(QueryContext);
// //   if (!context) {
// //     throw new Error('useQuery must be used within a QueryProvider');
// //   }
// //   return context;
// // };

// // // Provider
// // export const QueryProvider = ({ children }) => {
// //   const [queries, setQueries] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [notifications, setNotifications] = useState([]);
// //   const [chatMessages, setChatMessages] = useState({});

// //   useEffect(() => {
// //     loadQueries();
// //     loadNotifications();

// //     // Listen for queries changes
// //     const unsubscribeQueries = onQueriesChange((changeEvent) => {
// //       console.log('QueryContext: Queries changed:', changeEvent);
// //       loadQueries();
// //       loadNotifications();
// //     });

// //     // Listen for chat changes
// //     const unsubscribeChat = onChatChange((eventData) => {
// //       console.log('QueryContext: Chat changed:', eventData);
// //       if (eventData.inspectionId) {
// //         // Update chat messages for the specific inspection
// //         const updatedMessages = getChatMessages(eventData.inspectionId);
// //         setChatMessages(prev => ({
// //           ...prev,
// //           [eventData.inspectionId]: updatedMessages
// //         }));
// //       }
// //     });

// //     // ❌ REMOVED: Duplicate bid confirmed event listener
// //     // The inspector bidding room will handle the event directly
// //     // The customer component will call confirmInspector directly

// //     // Periodic refresh for real-time updates
// //     const interval = setInterval(() => {
// //       loadQueries();
// //       loadNotifications();
// //     }, 10000);

// //     return () => {
// //       clearInterval(interval);
// //       if (unsubscribeQueries) unsubscribeQueries();
// //       if (unsubscribeChat) unsubscribeChat();
// //     };
// //   }, []);

// //   const loadQueries = () => {
// //     try {
// //       setLoading(true);
// //       const allQueries = getAllQueries();
// //       setQueries(allQueries);
// //       setError(null);
// //       console.log('QueryContext: Loaded queries:', allQueries.length);
// //     } catch (err) {
// //       setError('Failed to load queries');
// //       console.error('QueryContext: Error loading queries:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const loadNotifications = () => {
// //     try {
// //       const currentInspectorId = getCurrentInspectorId();
// //       const inspectorNotifications = getInspectorNotifications(currentInspectorId);
// //       setNotifications(inspectorNotifications);
// //       console.log('QueryContext: Loaded notifications:', inspectorNotifications.length);
// //     } catch (err) {
// //       console.error('QueryContext: Error loading notifications:', err);
// //     }
// //   };

// //   const getCurrentInspectorId = () => {
// //     // In a real app, this would come from auth context
// //     return 'inspector-001';
// //   };

// //   const getCurrentCustomerId = () => {
// //     // In a real app, this would come from auth context
// //     return 'customer-001';
// //   };

// //   const submitQuery = async (queryData) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const transformedData = {
// //         location: queryData.location,
// //         country: queryData.country,
// //         commodity: queryData.commodity,
// //         subCommodity: queryData.subCommodity,
// //         riceType: queryData.riceType,
// //         volume: queryData.volume,
// //         unit: queryData.unit,
// //         urgency: queryData.urgency,
// //         inspectionDateType: queryData.inspectionDateType,
// //         inspectionDate: queryData.inspectionDate,
// //         inspectionDateFrom: queryData.inspectionDateFrom,
// //         inspectionDateTo: queryData.inspectionDateTo,
// //         description: queryData.description,
// //         companyName: queryData.companyName,
// //         contactPerson: queryData.contactPerson,
// //         email: queryData.email,
// //         phone: queryData.phone,
// //         expectedBudget: queryData.expectedBudget,
// //         selectedCertifications: queryData.selectedCertifications || [],
// //         inspectionTypes: queryData.inspectionTypes || []
// //       };

// //       console.log('QueryContext: Submitting query:', transformedData);
// //       const newQuery = saveQuery(transformedData);
// //       loadQueries();
// //       return newQuery;
// //     } catch (err) {
// //       setError('Failed to submit query');
// //       console.error('QueryContext: Error submitting query:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getActiveQueriesForInspector = () => {
// //     try {
// //       const activeQueries = getActiveQueries();
// //       return activeQueries.map(query => formatQueryForDisplay(query));
// //     } catch (err) {
// //       console.error('QueryContext: Error getting active queries:', err);
// //       return [];
// //     }
// //   };

// //   const getCustomerQueries = (customerEmail) => {
// //     try {
// //       const customerQueries = queries.filter(q => q.email === customerEmail);
// //       return customerQueries.map(query => formatQueryForDisplay(query));
// //     } catch (err) {
// //       console.error('QueryContext: Error getting customer queries:', err);
// //       return [];
// //     }
// //   };

// //   const placeBid = async (queryId, bidData) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       // ✅ Enhanced bid data with inspector ID
// //       const enhancedBidData = {
// //         ...bidData,
// //         inspectorId: bidData.inspectorId || getCurrentInspectorId(),
// //         submittedAt: new Date().toISOString(),
// //         status: 'pending'
// //       };
      
// //       console.log('QueryContext: Placing bid with data:', enhancedBidData);
      
// //       const updatedQuery = addBidToQuery(queryId, enhancedBidData);
// //       if (updatedQuery) {
// //         loadQueries();
// //         return updatedQuery;
// //       } else {
// //         throw new Error('Query not found');
// //       }
// //     } catch (err) {
// //       setError('Failed to place bid');
// //       console.error('QueryContext: Error placing bid:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ UPDATED: This function now handles BOTH the confirmation AND the notification
// //   const confirmInspector = async (queryId, bidId, inspectorId) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
      
// //       if (!queryId || !bidId || !inspectorId) {
// //         throw new Error('Missing required parameters');
// //       }
      
// //       // ✅ This function in queryStorage.js already creates the notification
// //       // No need for separate event dispatching
// //       const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
// //       if (!updatedQuery) {
// //         throw new Error('Query or bid not found');
// //       }
      
// //       console.log('✅ QueryContext: Inspector confirmed successfully');
      
// //       // Refresh data
// //       loadQueries();
// //       loadNotifications(); // This will load the newly created notification
      
// //       return updatedQuery;
// //     } catch (err) {
// //       setError(`Failed to confirm inspector: ${err.message}`);
// //       console.error('❌ QueryContext: Error confirming inspector:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getActiveInspectionsForInspector = () => {
// //     try {
// //       const currentInspectorId = getCurrentInspectorId();
// //       const activeInspections = getInspectorActiveInspections(currentInspectorId);
// //       return activeInspections.map(q => formatQueryForDisplay(q));
// //     } catch (err) {
// //       console.error('QueryContext: Error getting active inspections:', err);
// //       return [];
// //     }
// //   };

// //   const markNotificationRead = async (notificationId) => {
// //     try {
// //       console.log('📖 QueryContext: Marking notification as read:', notificationId);
// //       markNotificationAsRead(notificationId);
// //       loadNotifications();
// //     } catch (err) {
// //       console.error('QueryContext: Error marking notification as read:', err);
// //     }
// //   };

// //   const updateStatus = async (queryId, newStatus) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const updatedQuery = updateQueryStatus(queryId, newStatus);
// //       if (updatedQuery) {
// //         loadQueries();
// //         return updatedQuery;
// //       } else {
// //         throw new Error('Query not found');
// //       }
// //     } catch (err) {
// //       setError('Failed to update status');
// //       console.error('QueryContext: Error updating status:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getQuery = (queryId) => {
// //     try {
// //       const query = getQueryById(queryId);
// //       return query ? formatQueryForDisplay(query) : null;
// //     } catch (err) {
// //       console.error('QueryContext: Error getting query:', err);
// //       return null;
// //     }
// //   };

// //   const getQueryStats = () => {
// //     try {
// //       const totalQueries = queries.length;
// //       const active = queries.filter(q => q.status === 'Active').length;
// //       const completed = queries.filter(q => q.status === 'Completed').length;
// //       const inProgress = queries.filter(q => q.status === 'In Progress').length;
// //       return { total: totalQueries, active, completed, inProgress };
// //     } catch (err) {
// //       console.error('QueryContext: Error getting stats:', err);
// //       return { total: 0, active: 0, completed: 0, inProgress: 0 };
// //     }
// //   };

// //   const refreshQueries = () => {
// //     console.log('QueryContext: Manual refresh triggered');
// //     loadQueries();
// //     loadNotifications();
// //   };

// //   // ✅ NEW: Create notification function
// //   const createNotification = async (inspectorId, notificationData) => {
// //     try {
// //       console.log('🔔 QueryContext: Creating notification for inspector:', inspectorId);
// //       console.log('📋 Notification data:', notificationData);
      
// //       const notification = createInspectorNotification(inspectorId, notificationData);
      
// //       // Refresh notifications
// //       loadNotifications();
      
// //       console.log('✅ QueryContext: Notification created successfully:', notification.id);
// //       return notification;
// //     } catch (error) {
// //       console.error('❌ QueryContext: Error creating notification:', error);
// //       throw error;
// //     }
// //   };

// //   // ✅ NEW: Get unread notification count
// //   const getUnreadNotificationCount = () => {
// //     try {
// //       const currentInspectorId = getCurrentInspectorId();
// //       const unreadCount = notifications.filter(n => 
// //         n.inspectorId === currentInspectorId && !n.read
// //       ).length;
// //       return unreadCount;
// //     } catch (error) {
// //       console.error('QueryContext: Error getting unread notification count:', error);
// //       return 0;
// //     }
// //   };

// //   // =====================
// //   // CHAT FUNCTIONALITY
// //   // =====================

// //   const sendMessage = async (inspectionId, messageData) => {
// //     try {
// //       console.log('📤 QueryContext: Sending message:', { inspectionId, messageData });
      
// //       const newMessage = await sendChatMessage(inspectionId, messageData);
      
// //       // Update local state immediately for better UX
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: [...(prev[inspectionId] || []), newMessage]
// //       }));

// //       // Dispatch multiple events for real-time updates
// //       window.dispatchEvent(new CustomEvent('chatUpdated', {
// //         detail: { inspectionId, message: newMessage }
// //       }));

// //       // Specific event for new messages
// //       window.dispatchEvent(new CustomEvent('newChatMessage', {
// //         detail: { 
// //           inspectionId, 
// //           message: newMessage,
// //           senderId: messageData.senderId,
// //           senderType: messageData.senderType
// //         }
// //       }));

// //       console.log('✅ QueryContext: Message sent successfully:', newMessage.id);
// //       return newMessage;
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error sending message:', err);
// //       throw err;
// //     }
// //   };

// //   const loadChatMessages = (inspectionId) => {
// //     try {
// //       console.log('🔄 QueryContext: Loading chat messages for inspection:', inspectionId);
// //       const messages = getChatMessages(inspectionId);
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: messages
// //       }));
// //       console.log('📋 QueryContext: Loaded', messages.length, 'messages for inspection:', inspectionId);
// //       return messages;
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error loading chat messages:', err);
// //       return [];
// //     }
// //   };

// //   const getChatForInspection = (inspectionId) => {
// //     try {
// //       // First try to get from local state
// //       if (chatMessages[inspectionId]) {
// //         return chatMessages[inspectionId];
// //       }
      
// //       // If not in state, load from storage
// //       const messages = getChatMessages(inspectionId);
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: messages
// //       }));
      
// //       return messages;
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error getting chat for inspection:', err);
// //       return [];
// //     }
// //   };

// //   const markChatMessagesRead = async (inspectionId, userId) => {
// //     try {
// //       await markMessagesAsRead(inspectionId, userId);
// //       const updatedMessages = getChatMessages(inspectionId);
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: updatedMessages
// //       }));
      
// //       // Dispatch event for real-time updates
// //       window.dispatchEvent(new CustomEvent('messagesRead', {
// //         detail: { inspectionId, userId }
// //       }));
      
// //       console.log('📖 QueryContext: Messages marked as read for inspection:', inspectionId);
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error marking messages read:', err);
// //     }
// //   };

// //   // Enhanced chat change listener that handles all chat events
// //   const handleChatChange = (callback) => {
// //     const eventHandler = (event) => {
// //       console.log('🔔 QueryContext: Chat change event received:', event.detail);
// //       callback(event.detail);
// //     };

// //     // Listen for multiple types of chat events
// //     window.addEventListener('newChatMessage', eventHandler);
// //     window.addEventListener('chatUpdated', eventHandler);
// //     window.addEventListener('messagesRead', eventHandler);

// //     // Return cleanup function
// //     return () => {
// //       window.removeEventListener('newChatMessage', eventHandler);
// //       window.removeEventListener('chatUpdated', eventHandler);
// //       window.removeEventListener('messagesRead', eventHandler);
// //     };
// //   };

// //   // Initialize chat for inspection
// //   const initializeInspectionChat = async (inspectionId, inspectorName, customerName) => {
// //     try {
// //       const existingMessages = getChatMessages(inspectionId);
      
// //       // Only initialize if no messages exist
// //       if (existingMessages.length === 0) {
// //         const systemMessage = {
// //           senderId: 'system',
// //           senderName: 'System',
// //           senderType: 'system',
// //           message: `🎉 Inspection chat started! Inspector ${inspectorName} is now working with ${customerName}. Feel free to communicate throughout the inspection process.`,
// //           type: 'system'
// //         };

// //         await sendMessage(inspectionId, systemMessage);
// //         console.log('🆕 QueryContext: Chat initialized for inspection:', inspectionId);
// //       }
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error initializing chat:', err);
// //     }
// //   };

// //   // Helper function to get chat statistics
// //   const getChatStats = (inspectionId, userId) => {
// //     try {
// //       const messages = getChatForInspection(inspectionId);
// //       const unreadCount = messages.filter(msg => 
// //         msg.senderId !== userId && !msg.read
// //       ).length;
      
// //       return {
// //         totalMessages: messages.length,
// //         unreadCount,
// //         lastMessage: messages.length > 0 ? messages[messages.length - 1] : null,
// //         hasUnread: unreadCount > 0
// //       };
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error getting chat stats:', err);
// //       return { totalMessages: 0, unreadCount: 0, lastMessage: null, hasUnread: false };
// //     }
// //   };

// //   // ✅ NEW: Get all active chats for a user (customer or inspector)
// //   const getActiveChats = (userId, userType) => {
// //     try {
// //       const activeInspections = userType === 'customer' 
// //         ? queries.filter(q => q.status === 'In Progress' && q.confirmedInspectorId)
// //         : getInspectorActiveInspections(userId);
      
// //       return activeInspections.map(inspection => {
// //         const inspectionId = inspection.id;
// //         const chatStats = getChatStats(inspectionId, userId);
        
// //         return {
// //           inspectionId,
// //           inspection,
// //           chatStats,
// //           lastActivity: chatStats.lastMessage?.timestamp || inspection.updatedAt
// //         };
// //       }).sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error getting active chats:', err);
// //       return [];
// //     }
// //   };

// //   // ✅ NEW: Real-time message listener for notifications
// //   const startMessageListener = (userId, userType, onNewMessage) => {
// //     const handleNewMessage = (event) => {
// //       const { message, inspectionId } = event.detail;
      
// //       // Only notify if message is not from current user
// //       if (message.senderId !== userId) {
// //         console.log('🔔 New message received for user:', userId, message);
        
// //         if (onNewMessage) {
// //           onNewMessage({
// //             inspectionId,
// //             message,
// //             unreadCount: getChatStats(inspectionId, userId).unreadCount
// //           });
// //         }
        
// //         // Show browser notification if supported
// //         if ('Notification' in window && Notification.permission === 'granted') {
// //           new Notification(`New message from ${message.senderName}`, {
// //             body: message.message,
// //             icon: '/favicon.ico'
// //           });
// //         }
// //       }
// //     };

// //     window.addEventListener('newChatMessage', handleNewMessage);
    
// //     return () => {
// //       window.removeEventListener('newChatMessage', handleNewMessage);
// //     };
// //   };

// //   // ✅ NEW: Get customer's active inspections with chat capability
// //   const getCustomerActiveInspections = () => {
// //     try {
// //       const currentCustomerId = getCurrentCustomerId();
      
// //       // Filter queries that are "In Progress" (have confirmed inspector)
// //       const inspections = queries.filter(query => 
// //         query.status === 'In Progress' && 
// //         query.confirmedInspectorId &&
// //         (query.email === 'current-customer@example.com' || query.status === 'In Progress') // Demo filter
// //       );

// //       // Transform to inspection format with chat info
// //       return inspections.map(query => {
// //         const confirmedBid = query.bids?.find(bid => bid.id === query.confirmedBidId);
// //         const chatStats = getChatStats(query.id, currentCustomerId);
        
// //         return {
// //           id: query.id,
// //           inspectionId: query.id,
// //           queryId: query.id,
// //           queryTitle: `${query.commodityDisplay || query.commodity} Quality Assessment`,
// //           commodity: query.commodity,
// //           location: query.locationDisplay || `${query.location}, ${query.country}`,
// //           amount: confirmedBid?.amount || 0,
// //           price: confirmedBid?.amount || 0,
// //           inspectorId: query.confirmedInspectorId,
// //           inspectorName: confirmedBid?.inspectorName || 'Inspector',
// //           inspectorCompany: confirmedBid?.company || 'Inspection Company',
// //           inspectorRating: confirmedBid?.rating || 4.5,
// //           startedAt: query.confirmedAt || query.updatedAt,
// //           estimatedCompletion: confirmedBid?.proposedTimeline || '2-3 days',
// //           status: 'In Progress',
// //           volume: query.volumeDisplay || `${query.volume} ${query.unit}`,
// //           urgency: query.urgency,
// //           customerName: query.contactPerson || 'Customer',
// //           // Chat info
// //           unreadMessages: chatStats.unreadCount,
// //           lastMessage: chatStats.lastMessage,
// //           hasUnread: chatStats.unreadCount > 0
// //         };
// //       });
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error getting customer active inspections:', err);
// //       return [];
// //     }
// //   };

// //   // ✅ NEW: Auto-refresh chat messages periodically
// //   const startChatAutoRefresh = (inspectionId, intervalMs = 10000) => {
// //     const interval = setInterval(() => {
// //       const updatedMessages = getChatMessages(inspectionId);
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: updatedMessages
// //       }));
// //     }, intervalMs);

// //     return () => clearInterval(interval);
// //   };

// //   // ✅ NEW: Send typing indicator
// //   const sendTypingIndicator = (inspectionId, userId, isTyping) => {
// //     window.dispatchEvent(new CustomEvent('userTyping', {
// //       detail: { inspectionId, userId, isTyping }
// //     }));
// //   };

// //   // ✅ NEW: Listen for typing indicators
// //   const onUserTyping = (callback) => {
// //     const handler = (event) => callback(event.detail);
// //     window.addEventListener('userTyping', handler);
// //     return () => window.removeEventListener('userTyping', handler);
// //   };

// //   // ✅ NEW: Bulk mark all messages as read for user
// //   const markAllMessagesRead = async (userId) => {
// //     try {
// //       const activeChats = getActiveChats(userId, 'customer'); // or 'inspector'
      
// //       for (const chat of activeChats) {
// //         if (chat.chatStats.unreadCount > 0) {
// //           await markChatMessagesRead(chat.inspectionId, userId);
// //         }
// //       }
      
// //       console.log('📖 All messages marked as read for user:', userId);
// //     } catch (err) {
// //       console.error('❌ Error marking all messages as read:', err);
// //     }
// //   };

// //   // ✅ NEW: Debug functions for testing
// //   const debugFunctions = {
// //     // Force create a test notification
// //     createTestNotification: () => {
// //       const testData = {
// //         type: 'bid_confirmed',
// //         queryId: 'TEST-QUERY-123',
// //         bidId: 'TEST-BID-456',
// //         queryTitle: 'Test Rice Inspection',
// //         location: 'Test Location, India',
// //         amount: 750,
// //         customerName: 'Test Customer',
// //         bidDetails: {
// //           inspectorName: 'Test Inspector',
// //           company: 'Test Company',
// //           proposedTimeline: '2 days',
// //           rating: 4.8,
// //           experience: '5 years'
// //         }
// //       };
      
// //       return createNotification(getCurrentInspectorId(), testData);
// //     },
    
// //     // Test event dispatch
// //     testEventDispatch: () => {
// //       const testData = {
// //         type: 'bid_confirmed',
// //         inspectorId: getCurrentInspectorId(),
// //         queryId: 'TEST-QUERY-123',
// //         bidId: 'TEST-BID-456',
// //         queryTitle: 'Test Rice Inspection',
// //         location: 'Test Location, India',
// //         amount: 750,
// //         customerName: 'Test Customer',
// //         bidDetails: {
// //           inspectorName: 'Test Inspector',
// //           company: 'Test Company',
// //           proposedTimeline: '2 days',
// //           rating: 4.8,
// //           experience: '5 years'
// //         }
// //       };
      
// //       window.dispatchEvent(new CustomEvent('bidConfirmed', {
// //         detail: testData
// //       }));
      
// //       console.log('🧪 Test event dispatched:', testData);
// //     },
    
// //     // Get current inspector ID
// //     getCurrentInspectorId,
    
// //     // Get all notifications
// //     getAllNotifications: () => notifications,
    
// //     // Force refresh
// //     forceRefresh: () => {
// //       loadQueries();
// //       loadNotifications();
// //     }
// //   };

// //   // Context value with all functions and state
// //   const value = {
// //     // State
// //     queries,
// //     loading,
// //     error,
// //     notifications,
// //     chatMessages,

// //     // Query functions
// //     submitQuery,
// //     placeBid,
// //     confirmInspector,
// //     updateStatus,
// //     loadQueries,
// //     refreshQueries,
// //     getActiveQueriesForInspector,
// //     getActiveInspectionsForInspector,
// //     getCustomerQueries,
// //     getQuery,
// //     getQueryStats,

// //     // Notification functions
// //     markNotificationRead,
// //     createNotification,
// //     getUnreadNotificationCount,

// //     // Utility functions
// //     getCurrentInspectorId,
// //     getCurrentCustomerId,
// //     clearError: () => setError(null),

// //     // =====================
// //     // CHAT FUNCTIONS
// //     // =====================
    
// //     // Core chat functions
// //     sendMessage,
// //     loadChatMessages,
// //     getChatForInspection,
// //     markChatMessagesRead,
// //     onChatChange: handleChatChange,
    
// //     // Additional chat functions
// //     initializeInspectionChat,
// //     getChatStats,
// //     getActiveChats,
// //     startMessageListener,
// //     getCustomerActiveInspections,
// //     startChatAutoRefresh,
// //     sendTypingIndicator,
// //     onUserTyping,
// //     markAllMessagesRead,
    
// //     // ✅ Debug functions (remove in production)
// //     debug: debugFunctions
// //   };

// //   useEffect(() => {
// //     window.queryContext = value;
// //     return () => {
// //       delete window.queryContext;
// //     };
// //   }, [value]);

// //   return (
// //     <QueryContext.Provider value={value}>
// //       {children}
// //     </QueryContext.Provider>
// //   );
// // };

// // export default QueryContext;


// // import { createContext, useContext, useState, useEffect } from 'react';
// // import {
// //   saveQuery,
// //   getAllQueries,
// //   getActiveQueries,
// //   updateQueryStatus,
// //   addBidToQuery,
// //   getQueryById,
// //   formatQueryForDisplay,
// //   onQueriesChange,
// //   confirmInspectorForQuery,
// //   getInspectorActiveInspections,
// //   getInspectorNotifications,
// //   markNotificationAsRead,
// //   getChatMessages,
// //   sendChatMessage,
// //   markMessagesAsRead,
// //   onChatChange,
// //   createInspectorNotification
// // } from '../utils/queryStorage';

// // // Create the context
// // const QueryContext = createContext();

// // // Custom hook
// // export const useQuery = () => {
// //   const context = useContext(QueryContext);
// //   if (!context) {
// //     throw new Error('useQuery must be used within a QueryProvider');
// //   }
// //   return context;
// // };

// // // Provider
// // export const QueryProvider = ({ children }) => {
// //   const [queries, setQueries] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [notifications, setNotifications] = useState([]);
// //   const [chatMessages, setChatMessages] = useState({});

// //   useEffect(() => {
// //     loadQueries();
// //     loadNotifications();

// //     // Listen for queries changes
// //     const unsubscribeQueries = onQueriesChange((changeEvent) => {
// //       console.log('QueryContext: Queries changed:', changeEvent);
// //       loadQueries();
// //       loadNotifications();
// //     });

// //     // Listen for chat changes
// //     const unsubscribeChat = onChatChange((eventData) => {
// //       console.log('QueryContext: Chat changed:', eventData);
// //       if (eventData.inspectionId) {
// //         // Update chat messages for the specific inspection
// //         const updatedMessages = getChatMessages(eventData.inspectionId);
// //         setChatMessages(prev => ({
// //           ...prev,
// //           [eventData.inspectionId]: updatedMessages
// //         }));
// //       }
// //     });

// //     // ❌ REMOVED: Duplicate bid confirmed event listener
// //     // The inspector bidding room will handle the event directly
// //     // The customer component will call confirmInspector directly

// //     // Periodic refresh for real-time updates
// //     const interval = setInterval(() => {
// //       loadQueries();
// //       loadNotifications();
// //     }, 10000);

// //     return () => {
// //       clearInterval(interval);
// //       if (unsubscribeQueries) unsubscribeQueries();
// //       if (unsubscribeChat) unsubscribeChat();
// //     };
// //   }, []);

// //   const loadQueries = () => {
// //     try {
// //       setLoading(true);
// //       const allQueries = getAllQueries();
// //       setQueries(allQueries);
// //       setError(null);
// //       console.log('QueryContext: Loaded queries:', allQueries.length);
// //     } catch (err) {
// //       setError('Failed to load queries');
// //       console.error('QueryContext: Error loading queries:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const loadNotifications = () => {
// //     try {
// //       const currentInspectorId = getCurrentInspectorId();
// //       const inspectorNotifications = getInspectorNotifications(currentInspectorId);
// //       setNotifications(inspectorNotifications);
// //       console.log('QueryContext: Loaded notifications:', inspectorNotifications.length);
// //     } catch (err) {
// //       console.error('QueryContext: Error loading notifications:', err);
// //     }
// //   };

// //   const getCurrentInspectorId = () => {
// //     // In a real app, this would come from auth context
// //     return 'inspector-001';
// //   };

// //   const getCurrentCustomerId = () => {
// //     // In a real app, this would come from auth context
// //     return 'customer-001';
// //   };

// //   const submitQuery = async (queryData) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const transformedData = {
// //         location: queryData.location,
// //         country: queryData.country,
// //         commodity: queryData.commodity,
// //         subCommodity: queryData.subCommodity,
// //         riceType: queryData.riceType,
// //         volume: queryData.volume,
// //         unit: queryData.unit,
// //         urgency: queryData.urgency,
// //         inspectionDateType: queryData.inspectionDateType,
// //         inspectionDate: queryData.inspectionDate,
// //         inspectionDateFrom: queryData.inspectionDateFrom,
// //         inspectionDateTo: queryData.inspectionDateTo,
// //         description: queryData.description,
// //         companyName: queryData.companyName,
// //         contactPerson: queryData.contactPerson,
// //         email: queryData.email,
// //         phone: queryData.phone,
// //         expectedBudget: queryData.expectedBudget,
// //         selectedCertifications: queryData.selectedCertifications || [],
// //         inspectionTypes: queryData.inspectionTypes || []
// //       };

// //       console.log('QueryContext: Submitting query:', transformedData);
// //       const newQuery = saveQuery(transformedData);
// //       loadQueries();
// //       return newQuery;
// //     } catch (err) {
// //       setError('Failed to submit query');
// //       console.error('QueryContext: Error submitting query:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getActiveQueriesForInspector = () => {
// //     try {
// //       const activeQueries = getActiveQueries();
// //       return activeQueries.map(query => formatQueryForDisplay(query));
// //     } catch (err) {
// //       console.error('QueryContext: Error getting active queries:', err);
// //       return [];
// //     }
// //   };

// //   const getCustomerQueries = (customerEmail) => {
// //     try {
// //       const customerQueries = queries.filter(q => q.email === customerEmail);
// //       return customerQueries.map(query => formatQueryForDisplay(query));
// //     } catch (err) {
// //       console.error('QueryContext: Error getting customer queries:', err);
// //       return [];
// //     }
// //   };

// //   const placeBid = async (queryId, bidData) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       // ✅ Enhanced bid data with inspector ID
// //       const enhancedBidData = {
// //         ...bidData,
// //         inspectorId: bidData.inspectorId || getCurrentInspectorId(),
// //         submittedAt: new Date().toISOString(),
// //         status: 'pending'
// //       };
      
// //       console.log('QueryContext: Placing bid with data:', enhancedBidData);
      
// //       const updatedQuery = addBidToQuery(queryId, enhancedBidData);
// //       if (updatedQuery) {
// //         loadQueries();
// //         return updatedQuery;
// //       } else {
// //         throw new Error('Query not found');
// //       }
// //     } catch (err) {
// //       setError('Failed to place bid');
// //       console.error('QueryContext: Error placing bid:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ UPDATED: This function now handles BOTH the confirmation AND the notification
// //   // const confirmInspector = async (queryId, bidId, inspectorId) => {
// //   //   try {
// //   //     setLoading(true);
// //   //     setError(null);
      
// //   //     console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
      
// //   //     if (!queryId || !bidId || !inspectorId) {
// //   //       throw new Error('Missing required parameters');
// //   //     }
      
// //   //     // ✅ This function in queryStorage.js already creates the notification
// //   //     // No need for separate event dispatching
// //   //     const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
// //   //     if (!updatedQuery) {
// //   //       throw new Error('Query or bid not found');
// //   //     }
      
// //   //     console.log('✅ QueryContext: Inspector confirmed successfully');
      
// //   //     // Refresh data
// //   //     loadQueries();
// //   //     loadNotifications(); // This will load the newly created notification
      
// //   //     return updatedQuery;
// //   //   } catch (err) {
// //   //     setError(`Failed to confirm inspector: ${err.message}`);
// //   //     console.error('❌ QueryContext: Error confirming inspector:', err);
// //   //     throw err;
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };


// //   // Fixed confirmInspector function in QueryContext

// // // const confirmInspector = async (queryId, bidId, inspectorId) => {
// // //   try {
// // //     setLoading(true);
// // //     setError(null);
    
// // //     console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
    
// // //     if (!queryId || !bidId || !inspectorId) {
// // //       throw new Error('Missing required parameters');
// // //     }
    
// // //     // ✅ CRITICAL FIX: Properly update query status and confirmed fields
// // //     const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
// // //     if (!updatedQuery) {
// // //       throw new Error('Query or bid not found');
// // //     }

// // //     // 🔥 KEY FIX: Ensure the query status is updated to "In Progress"
// // //     const finalQuery = updateQueryStatus(queryId, 'In Progress');
    
// // //     console.log('✅ QueryContext: Inspector confirmed successfully. Final query:', finalQuery);
    
// // //     // Refresh data
// // //     loadQueries();
// // //     loadNotifications();
    
// // //     return finalQuery;
// // //   } catch (err) {
// // //     setError(`Failed to confirm inspector: ${err.message}`);
// // //     console.error('❌ QueryContext: Error confirming inspector:', err);
// // //     throw err;
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };



// // const confirmInspector = async (queryId, bidId, inspectorId) => {
// //   try {
// //     setLoading(true);
// //     setError(null);
    
// //     console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
    
// //     if (!queryId || !bidId || !inspectorId) {
// //       throw new Error('Missing required parameters');
// //     }
    
// //     // ✅ STEP 1: Update query status to "In Progress" and set confirmed fields
// //     const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
// //     if (!updatedQuery) {
// //       throw new Error('Query or bid not found');
// //     }

// //     // ✅ STEP 2: Ensure status is "In Progress" 
// //     const finalQuery = updateQueryStatus(queryId, 'In Progress');
    
// //     // ✅ STEP 3: Create notification for inspector
// //     const bid = updatedQuery.bids?.find(b => b.id === bidId);
// //     if (bid) {
// //       const notificationData = {
// //         type: 'bid_confirmed',
// //         queryId: queryId,
// //         bidId: bidId,
// //         queryTitle: updatedQuery.commodityDisplay || updatedQuery.commodity || 'Inspection Request',
// //         location: updatedQuery.locationDisplay || `${updatedQuery.location}, ${updatedQuery.country}`,
// //         amount: bid.amount,
// //         customerName: updatedQuery.contactPerson || 'Customer',
// //         bidDetails: {
// //           inspectorName: bid.inspectorName,
// //           company: bid.company,
// //           proposedTimeline: bid.proposedTimeline || bid.estimatedDuration,
// //           rating: bid.rating,
// //           experience: bid.experience
// //         }
// //       };
      
// //       await createNotification(inspectorId, notificationData);
// //       console.log('✅ Notification created for inspector:', inspectorId);
// //     }
    
// //     // ✅ STEP 4: Dispatch event for real-time updates
// //     window.dispatchEvent(new CustomEvent('bidConfirmed', {
// //       detail: {
// //         queryId,
// //         bidId,
// //         inspectorId,
// //         queryTitle: updatedQuery.commodityDisplay || updatedQuery.commodity,
// //         location: updatedQuery.locationDisplay || `${updatedQuery.location}, ${updatedQuery.country}`,
// //         amount: bid?.amount,
// //         customerName: updatedQuery.contactPerson || 'Customer'
// //       }
// //     }));
    
// //     console.log('✅ QueryContext: Inspector confirmed successfully');
    
// //     // Refresh data
// //     loadQueries();
// //     loadNotifications();
    
// //     return finalQuery;
// //   } catch (err) {
// //     setError(`Failed to confirm inspector: ${err.message}`);
// //     console.error('❌ QueryContext: Error confirming inspector:', err);
// //     throw err;
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// //   const getActiveInspectionsForInspector = () => {
// //     try {
// //       const currentInspectorId = getCurrentInspectorId();
// //       const activeInspections = getInspectorActiveInspections(currentInspectorId);
// //       return activeInspections.map(q => formatQueryForDisplay(q));
// //     } catch (err) {
// //       console.error('QueryContext: Error getting active inspections:', err);
// //       return [];
// //     }
// //   };

// //   const markNotificationRead = async (notificationId) => {
// //     try {
// //       console.log('📖 QueryContext: Marking notification as read:', notificationId);
// //       markNotificationAsRead(notificationId);
// //       loadNotifications();
// //     } catch (err) {
// //       console.error('QueryContext: Error marking notification as read:', err);
// //     }
// //   };

// //   const updateStatus = async (queryId, newStatus) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const updatedQuery = updateQueryStatus(queryId, newStatus);
// //       if (updatedQuery) {
// //         loadQueries();
// //         return updatedQuery;
// //       } else {
// //         throw new Error('Query not found');
// //       }
// //     } catch (err) {
// //       setError('Failed to update status');
// //       console.error('QueryContext: Error updating status:', err);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getQuery = (queryId) => {
// //     try {
// //       const query = getQueryById(queryId);
// //       return query ? formatQueryForDisplay(query) : null;
// //     } catch (err) {
// //       console.error('QueryContext: Error getting query:', err);
// //       return null;
// //     }
// //   };

// //   const getQueryStats = () => {
// //     try {
// //       const totalQueries = queries.length;
// //       const active = queries.filter(q => q.status === 'Active').length;
// //       const completed = queries.filter(q => q.status === 'Completed').length;
// //       const inProgress = queries.filter(q => q.status === 'In Progress').length;
// //       return { total: totalQueries, active, completed, inProgress };
// //     } catch (err) {
// //       console.error('QueryContext: Error getting stats:', err);
// //       return { total: 0, active: 0, completed: 0, inProgress: 0 };
// //     }
// //   };

// //   const refreshQueries = () => {
// //     console.log('QueryContext: Manual refresh triggered');
// //     loadQueries();
// //     loadNotifications();
// //   };

// //   // ✅ NEW: Create notification function
// //   const createNotification = async (inspectorId, notificationData) => {
// //     try {
// //       console.log('🔔 QueryContext: Creating notification for inspector:', inspectorId);
// //       console.log('📋 Notification data:', notificationData);
      
// //       const notification = createInspectorNotification(inspectorId, notificationData);
      
// //       // Refresh notifications
// //       loadNotifications();
      
// //       console.log('✅ QueryContext: Notification created successfully:', notification.id);
// //       return notification;
// //     } catch (error) {
// //       console.error('❌ QueryContext: Error creating notification:', error);
// //       throw error;
// //     }
// //   };

// //   // ✅ NEW: Get unread notification count
// //   const getUnreadNotificationCount = () => {
// //     try {
// //       const currentInspectorId = getCurrentInspectorId();
// //       const unreadCount = notifications.filter(n => 
// //         n.inspectorId === currentInspectorId && !n.read
// //       ).length;
// //       return unreadCount;
// //     } catch (error) {
// //       console.error('QueryContext: Error getting unread notification count:', error);
// //       return 0;
// //     }
// //   };

// //   // =====================
// //   // CHAT FUNCTIONALITY
// //   // =====================

// //   const sendMessage = async (inspectionId, messageData) => {
// //     try {
// //       console.log('📤 QueryContext: Sending message:', { inspectionId, messageData });
      
// //       const newMessage = await sendChatMessage(inspectionId, messageData);
      
// //       // Update local state immediately for better UX
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: [...(prev[inspectionId] || []), newMessage]
// //       }));

// //       // Dispatch multiple events for real-time updates
// //     //   window.dispatchEvent(new CustomEvent('chatUpdated', {
// //     //   detail: { 
// //     //     inspectionId, 
// //     //     message: newMessage,
// //     //     type: 'new_message'
// //     //   }
// //     // }));


// //     const eventDetail = { 
// //       inspectionId, 
// //       message: newMessage,
// //       senderId: messageData.senderId,
// //       senderType: messageData.senderType,
// //       timestamp: new Date().toISOString()
// //     };


// //       // Specific event for new messages
// //     //   window.dispatchEvent(new CustomEvent('newChatMessage', {
// //     //   detail: { 
// //     //     inspectionId, 
// //     //     message: newMessage,
// //     //     senderId: messageData.senderId,
// //     //     senderType: messageData.senderType,
// //     //     timestamp: new Date().toISOString()
// //     //   }
// //     // }));

// //     window.dispatchEvent(new CustomEvent('chatUpdated', { detail: eventDetail }));
// //     window.dispatchEvent(new CustomEvent('newChatMessage', { detail: eventDetail }));


// //      if (typeof BroadcastChannel !== 'undefined') {
// //       const channel = new BroadcastChannel('inspection-chat');
// //       channel.postMessage({
// //         type: 'NEW_MESSAGE',
// //         data: eventDetail
// //       });
// //     }

// //       console.log('✅ QueryContext: Message sent successfully:', newMessage.id);
// //       return newMessage;
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error sending message:', err);
// //       throw err;
// //     }
// //   };

// //   const loadChatMessages = (inspectionId) => {
// //     try {
// //       console.log('🔄 QueryContext: Loading chat messages for inspection:', inspectionId);
// //       const messages = getChatMessages(inspectionId);
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: messages
// //       }));
// //       console.log('📋 QueryContext: Loaded', messages.length, 'messages for inspection:', inspectionId);
// //       return messages;
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error loading chat messages:', err);
// //       return [];
// //     }
// //   };

// //   const getChatForInspection = (inspectionId) => {
// //     try {
// //       // First try to get from local state
// //       if (chatMessages[inspectionId]) {
// //         return chatMessages[inspectionId];
// //       }
      
// //       // If not in state, load from storage
// //       const messages = getChatMessages(inspectionId);
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: messages
// //       }));
      
// //       return messages;
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error getting chat for inspection:', err);
// //       return [];
// //     }
// //   };

// //   const markChatMessagesRead = async (inspectionId, userId) => {
// //     try {
// //       await markMessagesAsRead(inspectionId, userId);
// //       const updatedMessages = getChatMessages(inspectionId);
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: updatedMessages
// //       }));
      
// //       // Dispatch event for real-time updates
// //       window.dispatchEvent(new CustomEvent('messagesRead', {
// //         detail: { inspectionId, userId }
// //       }));
      
// //       console.log('📖 QueryContext: Messages marked as read for inspection:', inspectionId);
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error marking messages read:', err);
// //     }
// //   };


// //   const setupCrossTabCommunication = () => {
// //   if (typeof BroadcastChannel !== 'undefined') {
// //     const channel = new BroadcastChannel('inspection-chat');
    
// //     channel.onmessage = (event) => {
// //       const { type, data } = event.data;
      
// //       if (type === 'NEW_MESSAGE') {
// //         console.log('🔄 Cross-tab message received:', data);
        
// //         // Update local state
// //         setChatMessages(prev => {
// //           const existing = prev[data.inspectionId] || [];
// //           const messageExists = existing.some(msg => msg.id === data.message.id);
          
// //           if (!messageExists) {
// //             return {
// //               ...prev,
// //               [data.inspectionId]: [...existing, data.message]
// //             };
// //           }
// //           return prev;
// //         });
        
// //         // Dispatch local event
// //         window.dispatchEvent(new CustomEvent('newChatMessage', { detail: data }));
// //       }
// //     };
// //     return()=>channel.close()
// //   }
// //   return ()=>{}
// // }

// //   // Enhanced chat change listener that handles all chat events
// //   const handleChatChange = (callback) => {
// //     const eventHandler = (event) => {
// //       console.log('🔔 QueryContext: Chat change event received:', event.detail);
// //       callback(event.detail);
// //     };

// //     // Listen for multiple types of chat events
// //     window.addEventListener('newChatMessage', eventHandler);
// //     window.addEventListener('chatUpdated', eventHandler);
// //     window.addEventListener('messagesRead', eventHandler);

// //     // Return cleanup function
// //     return () => {
// //       window.removeEventListener('newChatMessage', eventHandler);
// //       window.removeEventListener('chatUpdated', eventHandler);
// //       window.removeEventListener('messagesRead', eventHandler);
// //     };
// //   };

// //   // Initialize chat for inspection
// //   const initializeInspectionChat = async (inspectionId, inspectorName, customerName) => {
// //     try {
// //       const existingMessages = getChatMessages(inspectionId);
      
// //       // Only initialize if no messages exist
// //       if (existingMessages.length === 0) {
// //         const systemMessage = {
// //           senderId: 'system',
// //           senderName: 'System',
// //           senderType: 'system',
// //           message: `🎉 Inspection chat started! Inspector ${inspectorName} is now working with ${customerName}. Feel free to communicate throughout the inspection process.`,
// //           type: 'system'
// //         };

// //         await sendMessage(inspectionId, systemMessage);
// //         console.log('🆕 QueryContext: Chat initialized for inspection:', inspectionId);
// //       }
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error initializing chat:', err);
// //     }
// //   };

// //   // Helper function to get chat statistics
// //   const getChatStats = (inspectionId, userId) => {
// //     try {
// //       const messages = getChatForInspection(inspectionId);
// //       const unreadCount = messages.filter(msg => 
// //         msg.senderId !== userId && !msg.read
// //       ).length;
      
// //       return {
// //         totalMessages: messages.length,
// //         unreadCount,
// //         lastMessage: messages.length > 0 ? messages[messages.length - 1] : null,
// //         hasUnread: unreadCount > 0
// //       };
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error getting chat stats:', err);
// //       return { totalMessages: 0, unreadCount: 0, lastMessage: null, hasUnread: false };
// //     }
// //   };

// //   // ✅ NEW: Get all active chats for a user (customer or inspector)
// //   const getActiveChats = (userId, userType) => {
// //     try {
// //       const activeInspections = userType === 'customer' 
// //         ? queries.filter(q => q.status === 'In Progress' && q.confirmedInspectorId)
// //         : getInspectorActiveInspections(userId);
      
// //       return activeInspections.map(inspection => {
// //         const inspectionId = inspection.id;
// //         const chatStats = getChatStats(inspectionId, userId);
        
// //         return {
// //           inspectionId,
// //           inspection,
// //           chatStats,
// //           lastActivity: chatStats.lastMessage?.timestamp || inspection.updatedAt
// //         };
// //       }).sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
// //     } catch (err) {
// //       console.error('❌ QueryContext: Error getting active chats:', err);
// //       return [];
// //     }
// //   };

// //   // ✅ NEW: Real-time message listener for notifications
// //   const startMessageListener = (userId, userType, onNewMessage) => {
// //     const handleNewMessage = (event) => {
// //       const { message, inspectionId } = event.detail;
      
// //       // Only notify if message is not from current user
// //       if (message.senderId !== userId) {
// //         console.log('🔔 New message received for user:', userId, message);
        
// //         if (onNewMessage) {
// //           onNewMessage({
// //             inspectionId,
// //             message,
// //             unreadCount: getChatStats(inspectionId, userId).unreadCount
// //           });
// //         }
        
// //         // Show browser notification if supported
// //         if ('Notification' in window && Notification.permission === 'granted') {
// //           new Notification(`New message from ${message.senderName}`, {
// //             body: message.message,
// //             icon: '/favicon.ico'
// //           });
// //         }
// //       }
// //     };

// //     window.addEventListener('newChatMessage', handleNewMessage);
    
// //     return () => {
// //       window.removeEventListener('newChatMessage', handleNewMessage);
// //     };
// //   };

// //   // ✅ NEW: Get customer's active inspections with chat capability
// //   // const getCustomerActiveInspections = () => {
// //   //   try {
// //   //     const currentCustomerId = getCurrentCustomerId();
      
// //   //     // Filter queries that are "In Progress" (have confirmed inspector)
// //   //     const inspections = queries.filter(query => 
// //   //       query.status === 'In Progress' && 
// //   //       query.confirmedInspectorId &&
// //   //       (query.email === 'current-customer@example.com' || query.status === 'In Progress') // Demo filter
// //   //     );

// //   //     // Transform to inspection format with chat info
// //   //     return inspections.map(query => {
// //   //       const confirmedBid = query.bids?.find(bid => bid.id === query.confirmedBidId);
// //   //       const chatStats = getChatStats(query.id, currentCustomerId);
        
// //   //       return {
// //   //         id: query.id,
// //   //         inspectionId: query.id,
// //   //         queryId: query.id,
// //   //         queryTitle: `${query.commodityDisplay || query.commodity} Quality Assessment`,
// //   //         commodity: query.commodity,
// //   //         location: query.locationDisplay || `${query.location}, ${query.country}`,
// //   //         amount: confirmedBid?.amount || 0,
// //   //         price: confirmedBid?.amount || 0,
// //   //         inspectorId: query.confirmedInspectorId,
// //   //         inspectorName: confirmedBid?.inspectorName || 'Inspector',
// //   //         inspectorCompany: confirmedBid?.company || 'Inspection Company',
// //   //         inspectorRating: confirmedBid?.rating || 4.5,
// //   //         startedAt: query.confirmedAt || query.updatedAt,
// //   //         estimatedCompletion: confirmedBid?.proposedTimeline || '2-3 days',
// //   //         status: 'In Progress',
// //   //         volume: query.volumeDisplay || `${query.volume} ${query.unit}`,
// //   //         urgency: query.urgency,
// //   //         customerName: query.contactPerson || 'Customer',
// //   //         // Chat info
// //   //         unreadMessages: chatStats.unreadCount,
// //   //         lastMessage: chatStats.lastMessage,
// //   //         hasUnread: chatStats.unreadCount > 0
// //   //       };
// //   //     });
// //   //   } catch (err) {
// //   //     console.error('❌ QueryContext: Error getting customer active inspections:', err);
// //   //     return [];
// //   //   }
// //   // };



// //   // Fixed QueryContext.js - Add this method to properly filter active inspections

// // // ✅ FIXED: getCustomerActiveInspections - Only show CONFIRMED inspections
// // // const getCustomerActiveInspections = () => {
// // //   try {
// // //     const currentCustomerId = getCurrentCustomerId();
    
// // //     // 🔥 KEY FIX: Only return queries that have BOTH confirmed inspector AND are In Progress
// // //     const inspections = queries.filter(query => {
// // //       // Must have confirmed inspector ID (bid was accepted)
// // //       const hasConfirmedInspector = query.confirmedInspectorId && query.confirmedBidId;
      
// // //       // Must be in "In Progress" status (not just "Active")
// // //       const isInProgress = query.status === 'In Progress';
      
// // //       // Must belong to current customer (in real app, use proper customer ID)
// // //       const belongsToCustomer = query.email === 'current-customer@example.com' || query.status === 'In Progress';
      
// // //       console.log(`🔍 Query ${query.id} check:`, {
// // //         hasConfirmedInspector,
// // //         isInProgress,
// // //         belongsToCustomer,
// // //         confirmedInspectorId: query.confirmedInspectorId,
// // //         status: query.status
// // //       });
      
// // //       return hasConfirmedInspector && isInProgress && belongsToCustomer;
// // //     });

// // //     // Transform to inspection format with chat info
// // //     return inspections.map(query => {
// // //       const confirmedBid = query.bids?.find(bid => bid.id === query.confirmedBidId);
// // //       const chatStats = getChatStats(query.id, currentCustomerId);
      
// // //       return {
// // //         id: query.id,
// // //         inspectionId: query.id,
// // //         queryId: query.id,
// // //         queryTitle: `${query.commodityDisplay || query.commodity} Quality Assessment`,
// // //         commodity: query.commodity,
// // //         location: query.locationDisplay || `${query.location}, ${query.country}`,
// // //         amount: confirmedBid?.amount || 0,
// // //         price: confirmedBid?.amount || 0,
// // //         inspectorId: query.confirmedInspectorId,
// // //         inspectorName: confirmedBid?.inspectorName || 'Inspector',
// // //         inspectorCompany: confirmedBid?.company || 'Inspection Company',
// // //         inspectorRating: confirmedBid?.rating || 4.5,
// // //         startedAt: query.confirmedAt || query.updatedAt,
// // //         estimatedCompletion: confirmedBid?.proposedTimeline || '2-3 days',
// // //         status: 'In Progress',
// // //         volume: query.volumeDisplay || `${query.volume} ${query.unit}`,
// // //         urgency: query.urgency,
// // //         customerName: query.contactPerson || 'Customer',
// // //         // Chat info
// // //         unreadMessages: chatStats.unreadCount,
// // //         lastMessage: chatStats.lastMessage,
// // //         hasUnread: chatStats.unreadCount > 0
// // //       };
// // //     });
// // //   } catch (err) {
// // //     console.error('❌ QueryContext: Error getting customer active inspections:', err);
// // //     return [];
// // //   }
// // // };


// // // const getCustomerActiveInspections = () => {
// // //   const confirmedInspections = queries.filter(query => {
// // //     return query.confirmedInspectorId && 
// // //            query.confirmedBidId && 
// // //            query.status === 'In Progress';
// // //   });
  
// // //   return confirmedInspections.map(query => {
// // //     const confirmedBid = query.bids?.find(bid => bid.id === query.confirmedBidId);
// // //     return {
// // //       id: query.id,
// // //       inspectionId: query.id,
// // //       queryTitle: `${query.commodity} Quality Assessment`,
// // //       customerName: query.contactPerson,
// // //       inspectorName: confirmedBid?.inspectorName,
// // //       amount: confirmedBid?.amount,
// // //       location: query.location,
// // //       // ... other fields you need
// // //     };
// // //   });
// // // };


// // // ✅ REPLACE this function in QueryContext.js
// // const getCustomerActiveInspections = () => {
// //   try {
// //     const currentCustomerId = getCurrentCustomerId();
    
// //     // ✅ Filter for customer's confirmed inspections
// //     const confirmedInspections = queries.filter(query => {
// //       const isConfirmed = query.confirmedInspectorId && query.confirmedBidId;
// //       const isInProgress = query.status === 'In Progress';
      
// //       // ✅ ADD: Filter by current customer 
// //       const belongsToCustomer = query.email === 'current-customer@example.com' || 
// //                                query.customerId === currentCustomerId ||
// //                                isInProgress; // For demo, show all In Progress
      
// //       return isConfirmed && isInProgress && belongsToCustomer;
// //     });

// //     return confirmedInspections.map(query => {
// //       const confirmedBid = query.bids?.find(bid => bid.id === query.confirmedBidId);
// //       const chatStats = getChatStats(query.id, currentCustomerId);
      
// //       return {
// //         id: query.id,
// //         inspectionId: query.id,
// //         queryId: query.id,
// //         queryTitle: `${query.commodityDisplay || query.commodity} Quality Assessment`,
// //         commodity: query.commodity,
// //         location: query.locationDisplay || `${query.location}, ${query.country}`,
// //         amount: confirmedBid?.amount || 0,
// //         inspectorId: query.confirmedInspectorId,
// //         inspectorName: confirmedBid?.inspectorName || 'Inspector',
// //         inspectorCompany: confirmedBid?.company || 'Inspection Company',
// //         inspectorRating: confirmedBid?.rating || 4.5,
// //         startedAt: query.confirmedAt || query.updatedAt,
// //         estimatedCompletion: confirmedBid?.proposedTimeline || '2-3 days',
// //         status: 'In Progress',
// //         volume: query.volumeDisplay || `${query.volume} ${query.unit}`,
// //         urgency: query.urgency,
// //         customerName: query.contactPerson || 'Customer',
// //         // ✅ CHAT INFO
// //         unreadMessages: chatStats.unreadCount || 0,
// //         lastMessage: chatStats.lastMessage,
// //         hasUnread: (chatStats.unreadCount || 0) > 0
// //       };
// //     });
// //   } catch (err) {
// //     console.error('❌ Error getting customer active inspections:', err);
// //     return [];
// //   }
// // };


// //   // ✅ NEW: Auto-refresh chat messages periodically
// //   const startChatAutoRefresh = (inspectionId, intervalMs = 10000) => {
// //     const interval = setInterval(() => {
// //       const updatedMessages = getChatMessages(inspectionId);
// //       setChatMessages(prev => ({
// //         ...prev,
// //         [inspectionId]: updatedMessages
// //       }));
// //     }, intervalMs);

// //     return () => clearInterval(interval);
// //   };

// //   // ✅ NEW: Send typing indicator
// //   const sendTypingIndicator = (inspectionId, userId, isTyping) => {
// //     window.dispatchEvent(new CustomEvent('userTyping', {
// //       detail: { inspectionId, userId, isTyping }
// //     }));
// //   };

// //   // ✅ NEW: Listen for typing indicators
// //   const onUserTyping = (callback) => {
// //     const handler = (event) => callback(event.detail);
// //     window.addEventListener('userTyping', handler);
// //     return () => window.removeEventListener('userTyping', handler);
// //   };

// //   // ✅ NEW: Bulk mark all messages as read for user
// //   const markAllMessagesRead = async (userId) => {
// //     try {
// //       const activeChats = getActiveChats(userId, 'customer'); // or 'inspector'
      
// //       for (const chat of activeChats) {
// //         if (chat.chatStats.unreadCount > 0) {
// //           await markChatMessagesRead(chat.inspectionId, userId);
// //         }
// //       }
      
// //       console.log('📖 All messages marked as read for user:', userId);
// //     } catch (err) {
// //       console.error('❌ Error marking all messages as read:', err);
// //     }
// //   };

// //   // ✅ NEW: Debug functions for testing
// //   const debugFunctions = {
// //     // Force create a test notification
// //     createTestNotification: () => {
// //       const testData = {
// //         type: 'bid_confirmed',
// //         queryId: 'TEST-QUERY-123',
// //         bidId: 'TEST-BID-456',
// //         queryTitle: 'Test Rice Inspection',
// //         location: 'Test Location, India',
// //         amount: 750,
// //         customerName: 'Test Customer',
// //         bidDetails: {
// //           inspectorName: 'Test Inspector',
// //           company: 'Test Company',
// //           proposedTimeline: '2 days',
// //           rating: 4.8,
// //           experience: '5 years'
// //         }
// //       };
      
// //       return createNotification(getCurrentInspectorId(), testData);
// //     },
    
// //     // Test event dispatch
// //     testEventDispatch: () => {
// //       const testData = {
// //         type: 'bid_confirmed',
// //         inspectorId: getCurrentInspectorId(),
// //         queryId: 'TEST-QUERY-123',
// //         bidId: 'TEST-BID-456',
// //         queryTitle: 'Test Rice Inspection',
// //         location: 'Test Location, India',
// //         amount: 750,
// //         customerName: 'Test Customer',
// //         bidDetails: {
// //           inspectorName: 'Test Inspector',
// //           company: 'Test Company',
// //           proposedTimeline: '2 days',
// //           rating: 4.8,
// //           experience: '5 years'
// //         }
// //       };
      
// //       window.dispatchEvent(new CustomEvent('bidConfirmed', {
// //         detail: testData
// //       }));
      
// //       console.log('🧪 Test event dispatched:', testData);
// //     },
    
// //     // Get current inspector ID
// //     getCurrentInspectorId,
    
// //     // Get all notifications
// //     getAllNotifications: () => notifications,
    
// //     // Force refresh
// //     forceRefresh: () => {
// //       loadQueries();
// //       loadNotifications();
// //     }
// //   };

// //   // Context value with all functions and state
// //   const value = {
// //     // State
// //     queries,
// //     loading,
// //     error,
// //     notifications,
// //     chatMessages,

// //     // Query functions
// //     submitQuery,
// //     placeBid,
// //     confirmInspector,
// //     updateStatus,
// //     loadQueries,
// //     refreshQueries,
// //     getActiveQueriesForInspector,
// //     getActiveInspectionsForInspector,
// //     getCustomerQueries,
// //     getQuery,
// //     getQueryStats,

// //     // Notification functions
// //     markNotificationRead,
// //     createNotification,
// //     getUnreadNotificationCount,

// //     // Utility functions
// //     getCurrentInspectorId,
// //     getCurrentCustomerId,
// //     clearError: () => setError(null),

// //     // =====================
// //     // CHAT FUNCTIONS
// //     // =====================
    
// //     // Core chat functions
// //     sendMessage,
// //     loadChatMessages,
// //     getChatForInspection,
// //     markChatMessagesRead,
// //     onChatChange: handleChatChange,
    
// //     // Additional chat functions
// //     initializeInspectionChat,
// //     getChatStats,
// //     getActiveChats,
// //     startMessageListener,
// //     getCustomerActiveInspections,
// //     startChatAutoRefresh,
// //     sendTypingIndicator,
// //     onUserTyping,
// //     markAllMessagesRead,
    
// //     // ✅ Debug functions (remove in production)
// //     debug: debugFunctions
// //   };

// //   useEffect(() => {
// //     window.queryContext = value;
// //     return () => {
// //       delete window.queryContext;
// //     };
// //   }, [value]);

// //   return (
// //     <QueryContext.Provider value={value}>
// //       {children}
// //     </QueryContext.Provider>
// //   );
// // };

// // export default QueryContext;


// // Enhanced QueryContext.js with real-time chat improvements

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import {
//   getAllQueries,
//   saveQuery,
//   addBidToQuery,
//   confirmInspectorForQuery,
//   updateQueryStatus,
//   getInspectorActiveInspections,
//   getQueryById,
//   getInspectorNotifications,
//   markNotificationAsRead,
//   createInspectorNotification,
//   sendChatMessage,
//   getChatMessages,
//   markMessagesAsRead,
//   initializeInspectionChat,
//   onQueriesChange
// } from '../utils/queryStorage';

// const QueryContext = createContext();

// export const useQuery = () => {
//   const context = useContext(QueryContext);
//   if (!context) {
//     throw new Error('useQuery must be used within a QueryProvider');
//   }
//   return context;
// };

// export const QueryProvider = ({ children }) => {
//   const [queries, setQueries] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [chatMessages, setChatMessages] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Load initial data
//   useEffect(() => {
//     loadQueries();
//     loadNotifications();
//     setupCrossTabCommunication();
//   }, []);

//   // Listen for storage changes
//   useEffect(() => {
//     const unsubscribe = onQueriesChange((eventData) => {
//       console.log('📡 QueryContext: Storage change detected:', eventData);
//       if (eventData.type === 'external_update') {
//         loadQueries();
//         loadNotifications();
//       }
//     });

//     return unsubscribe;
//   }, []);

//   // ✅ NEW: Cross-tab communication setup
//   const setupCrossTabCommunication = () => {
//     if (typeof BroadcastChannel !== 'undefined') {
//       const channel = new BroadcastChannel('inspection-chat');
      
//       channel.onmessage = (event) => {
//         const { type, data } = event.data;
        
//         if (type === 'NEW_MESSAGE') {
//           console.log('🔄 Cross-tab message received:', data);
          
//           // Update local state
//           setChatMessages(prev => {
//             const existing = prev[data.inspectionId] || [];
//             const messageExists = existing.some(msg => msg.id === data.message.id);
            
//             if (!messageExists) {
//               return {
//                 ...prev,
//                 [data.inspectionId]: [...existing, data.message]
//               };
//             }
//             return prev;
//           });
          
//           // Dispatch local event
//           window.dispatchEvent(new CustomEvent('newChatMessage', { detail: data }));
//         }
//       };
      
//       return () => channel.close();
//     }
//     return () => {};
//   };

//   const loadQueries = () => {
//     try {
//       const allQueries = getAllQueries();
//       setQueries(allQueries);
//       console.log('QueryContext: Loaded queries:', allQueries.length);
//     } catch (err) {
//       console.error('QueryContext: Error loading queries:', err);
//       setError('Failed to load queries');
//     }
//   };

//   const loadNotifications = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const inspectorNotifications = getInspectorNotifications(currentInspectorId);
//       setNotifications(inspectorNotifications);
//       console.log('QueryContext: Loaded notifications:', inspectorNotifications.length);
//     } catch (err) {
//       console.error('QueryContext: Error loading notifications:', err);
//     }
//   };

//   const getCurrentInspectorId = () => {
//     return 'inspector-001'; // Replace with actual auth
//   };

//   const getCurrentCustomerId = () => {
//     return 'customer-001'; // Replace with actual auth
//   };

//   const submitQuery = async (queryData) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const newQuery = saveQuery(queryData);
//       loadQueries();
//       return newQuery;
//     } catch (err) {
//       setError('Failed to submit query');
//       console.error('QueryContext: Error submitting query:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const placeBid = async (queryId, bidData) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedQuery = addBidToQuery(queryId, bidData);
//       if (updatedQuery) {
//         loadQueries();
//         return updatedQuery;
//       } else {
//         throw new Error('Query not found');
//       }
//     } catch (err) {
//       setError('Failed to place bid');
//       console.error('QueryContext: Error placing bid:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmInspector = async (queryId, bidId, inspectorId) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
      
//       if (!queryId || !bidId || !inspectorId) {
//         throw new Error('Missing required parameters');
//       }
      
//       // ✅ STEP 1: Update query status to "In Progress" and set confirmed fields
//       const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
//       if (!updatedQuery) {
//         throw new Error('Query or bid not found');
//       }

//       // ✅ STEP 2: Ensure status is "In Progress" 
//       const finalQuery = updateQueryStatus(queryId, 'In Progress');
      
//       // ✅ STEP 3: Create notification for inspector
//       const bid = updatedQuery.bids?.find(b => b.id === bidId);
//       if (bid) {
//         const notificationData = {
//           type: 'bid_confirmed',
//           queryId: queryId,
//           bidId: bidId,
//           queryTitle: updatedQuery.commodityDisplay || updatedQuery.commodity || 'Inspection Request',
//           location: updatedQuery.locationDisplay || `${updatedQuery.location}, ${updatedQuery.country}`,
//           amount: bid.amount,
//           customerName: updatedQuery.contactPerson || 'Customer',
//           bidDetails: {
//             inspectorName: bid.inspectorName,
//             company: bid.company,
//             proposedTimeline: bid.proposedTimeline || bid.estimatedDuration,
//             rating: bid.rating,
//             experience: bid.experience
//           }
//         };
        
//         await createNotification(inspectorId, notificationData);
//         console.log('✅ Notification created for inspector:', inspectorId);
//       }
      
//       // ✅ STEP 4: Initialize chat for the inspection
//       await initializeInspectionChat(
//         queryId,
//         bid?.inspectorName || 'Inspector',
//         updatedQuery.contactPerson || 'Customer'
//       );
      
//       // ✅ STEP 5: Dispatch event for real-time updates
//       window.dispatchEvent(new CustomEvent('bidConfirmed', {
//         detail: {
//           queryId,
//           bidId,
//           inspectorId,
//           queryTitle: updatedQuery.commodityDisplay || updatedQuery.commodity,
//           location: updatedQuery.locationDisplay || `${updatedQuery.location}, ${updatedQuery.country}`,
//           amount: bid?.amount,
//           customerName: updatedQuery.contactPerson || 'Customer',
//           query: updatedQuery
//         }
//       }));
      
//       console.log('✅ QueryContext: Inspector confirmed successfully');
      
//       // Refresh data
//       loadQueries();
//       loadNotifications();
      
//       return finalQuery;
//     } catch (err) {
//       setError(`Failed to confirm inspector: ${err.message}`);
//       console.error('❌ QueryContext: Error confirming inspector:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getActiveQueriesForInspector = () => {
//     try {
//       return queries.filter(query => query.status === 'Active');
//     } catch (err) {
//       console.error('QueryContext: Error getting active queries:', err);
//       return [];
//     }
//   };

//   const getActiveInspectionsForInspector = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const activeInspections = getInspectorActiveInspections(currentInspectorId);
//       return activeInspections.map(q => formatQueryForDisplay(q));
//     } catch (err) {
//       console.error('QueryContext: Error getting active inspections:', err);
//       return [];
//     }
//   };

//   const getCustomerQueries = () => {
//     try {
//       // In real app, filter by customer email/ID
//       return queries.filter(query => 
//         query.email === 'current-customer@example.com' || query.status === 'Active'
//       );
//     } catch (err) {
//       console.error('QueryContext: Error getting customer queries:', err);
//       return [];
//     }
//   };

//   // ✅ ENHANCED: Get customer active inspections
//   const getCustomerActiveInspections = () => {
//     try {
//       const currentCustomerId = getCurrentCustomerId();
      
//       // ✅ Filter for customer's confirmed inspections
//       const confirmedInspections = queries.filter(query => {
//         const isConfirmed = query.confirmedInspectorId && query.confirmedBidId;
//         const isInProgress = query.status === 'In Progress';
        
//         // ✅ ADD: Filter by current customer 
//         const belongsToCustomer = query.email === 'current-customer@example.com' || 
//                                  query.customerId === currentCustomerId ||
//                                  isInProgress; // For demo, show all In Progress
        
//         return isConfirmed && isInProgress && belongsToCustomer;
//       });

//       return confirmedInspections.map(query => {
//         const confirmedBid = query.bids?.find(bid => bid.id === query.confirmedBidId);
//         const chatStats = getChatStats(query.id, currentCustomerId);
        
//         return {
//           id: query.id,
//           inspectionId: query.id,
//           queryId: query.id,
//           queryTitle: `${query.commodityDisplay || query.commodity} Quality Assessment`,
//           commodity: query.commodity,
//           location: query.locationDisplay || `${query.location}, ${query.country}`,
//           amount: confirmedBid?.amount || 0,
//           inspectorId: query.confirmedInspectorId,
//           inspectorName: confirmedBid?.inspectorName || 'Inspector',
//           inspectorCompany: confirmedBid?.company || 'Inspection Company',
//           inspectorRating: confirmedBid?.rating || 4.5,
//           startedAt: query.confirmedAt || query.updatedAt,
//           estimatedCompletion: confirmedBid?.proposedTimeline || '2-3 days',
//           status: 'In Progress',
//           volume: query.volumeDisplay || `${query.volume} ${query.unit}`,
//           urgency: query.urgency,
//           customerName: query.contactPerson || 'Customer',
//           // ✅ CHAT INFO
//           unreadMessages: chatStats.unreadCount || 0,
//           lastMessage: chatStats.lastMessage,
//           hasUnread: (chatStats.unreadCount || 0) > 0
//         };
//       });
//     } catch (err) {
//       console.error('❌ Error getting customer active inspections:', err);
//       return [];
//     }
//   };

//   const markNotificationRead = async (notificationId) => {
//     try {
//       console.log('📖 QueryContext: Marking notification as read:', notificationId);
//       markNotificationAsRead(notificationId);
//       loadNotifications();
//     } catch (err) {
//       console.error('QueryContext: Error marking notification as read:', err);
//     }
//   };

//   const updateStatus = async (queryId, newStatus) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedQuery = updateQueryStatus(queryId, newStatus);
//       if (updatedQuery) {
//         loadQueries();
//         return updatedQuery;
//       } else {
//         throw new Error('Query not found');
//       }
//     } catch (err) {
//       setError('Failed to update status');
//       console.error('QueryContext: Error updating status:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getQuery = (queryId) => {
//     try {
//       const query = getQueryById(queryId);
//       return query ? formatQueryForDisplay(query) : null;
//     } catch (err) {
//       console.error('QueryContext: Error getting query:', err);
//       return null;
//     }
//   };

//   const getQueryStats = () => {
//     try {
//       const totalQueries = queries.length;
//       const active = queries.filter(q => q.status === 'Active').length;
//       const completed = queries.filter(q => q.status === 'Completed').length;
//       const inProgress = queries.filter(q => q.status === 'In Progress').length;
//       return { total: totalQueries, active, completed, inProgress };
//     } catch (err) {
//       console.error('QueryContext: Error getting stats:', err);
//       return { total: 0, active: 0, completed: 0, inProgress: 0 };
//     }
//   };

//   const refreshQueries = () => {
//     console.log('QueryContext: Manual refresh triggered');
//     loadQueries();
//     loadNotifications();
//   };

//   const createNotification = async (inspectorId, notificationData) => {
//     try {
//       console.log('🔔 QueryContext: Creating notification for inspector:', inspectorId);
//       console.log('📋 Notification data:', notificationData);
      
//       const notification = createInspectorNotification(inspectorId, notificationData);
      
//       // Refresh notifications
//       loadNotifications();
      
//       console.log('✅ QueryContext: Notification created successfully:', notification.id);
//       return notification;
//     } catch (error) {
//       console.error('❌ QueryContext: Error creating notification:', error);
//       throw error;
//     }
//   };

//   const getUnreadNotificationCount = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const unreadCount = notifications.filter(n => 
//         n.inspectorId === currentInspectorId && !n.read
//       ).length;
//       return unreadCount;
//     } catch (error) {
//       console.error('QueryContext: Error getting unread notification count:', error);
//       return 0;
//     }
//   };

//   // =====================
//   // ENHANCED CHAT FUNCTIONALITY
//   // =====================

//   const sendMessage = async (inspectionId, messageData) => {
//     try {
//       console.log('📤 QueryContext: Sending message:', { inspectionId, messageData });
      
//       const newMessage = await sendChatMessage(inspectionId, messageData);
      
//       // Update local state immediately for better UX
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: [...(prev[inspectionId] || []), newMessage]
//       }));

//       // ✅ ENHANCED: Dispatch multiple events for comprehensive real-time updates
//       const eventDetail = { 
//         inspectionId, 
//         message: newMessage,
//         senderId: messageData.senderId,
//         senderType: messageData.senderType,
//         timestamp: new Date().toISOString()
//       };

//       // Dispatch to all listeners
//       window.dispatchEvent(new CustomEvent('chatUpdated', { detail: eventDetail }));
//       window.dispatchEvent(new CustomEvent('newChatMessage', { detail: eventDetail }));
      
//       // ✅ NEW: Broadcast to all tabs/windows for cross-tab communication
//       if (typeof BroadcastChannel !== 'undefined') {
//         const channel = new BroadcastChannel('inspection-chat');
//         channel.postMessage({
//           type: 'NEW_MESSAGE',
//           data: eventDetail
//         });
//       }

//       console.log('✅ QueryContext: Message sent successfully:', newMessage.id);
//       return newMessage;
//     } catch (err) {
//       console.error('❌ QueryContext: Error sending message:', err);
//       throw err;
//     }
//   };

//   const loadChatMessages = (inspectionId) => {
//     try {
//       console.log('🔄 QueryContext: Loading chat messages for inspection:', inspectionId);
//       const messages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: messages
//       }));
//       console.log('📋 QueryContext: Loaded', messages.length, 'messages for inspection:', inspectionId);
//       return messages;
//     } catch (err) {
//       console.error('❌ QueryContext: Error loading chat messages:', err);
//       return [];
//     }
//   };

//   const getChatForInspection = (inspectionId) => {
//     try {
//       // First try to get from local state
//       if (chatMessages[inspectionId]) {
//         return chatMessages[inspectionId];
//       }
      
//       // If not in state, load from storage
//       const messages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: messages
//       }));
      
//       return messages;
//     } catch (err) {
//       console.error('❌ QueryContext: Error getting chat for inspection:', err);
//       return [];
//     }
//   };

//   const markChatMessagesRead = async (inspectionId, userId) => {
//     try {
//       await markMessagesAsRead(inspectionId, userId);
//       const updatedMessages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: updatedMessages
//       }));
      
//       // Dispatch event for real-time updates
//       window.dispatchEvent(new CustomEvent('messagesRead', {
//         detail: { inspectionId, userId }
//       }));
      
//       console.log('📖 QueryContext: Messages marked as read for inspection:', inspectionId);
//     } catch (err) {
//       console.error('❌ QueryContext: Error marking messages read:', err);
//     }
//   };

//   // Enhanced chat change listener that handles all chat events
//   const handleChatChange = (callback) => {
//     const eventHandler = (event) => {
//       console.log('🔔 QueryContext: Chat change event received:', event.detail);
//       callback(event.detail);
//     };

//     // Listen for multiple types of chat events
//     window.addEventListener('newChatMessage', eventHandler);
//     window.addEventListener('chatUpdated', eventHandler);
//     window.addEventListener('messagesRead', eventHandler);

//     // Return cleanup function
//     return () => {
//       window.removeEventListener('newChatMessage', eventHandler);
//       window.removeEventListener('chatUpdated', eventHandler);
//       window.removeEventListener('messagesRead', eventHandler);
//     };
//   };

//   // Initialize chat when inspection starts
//   const initializeInspectionChatHandler = async (inspectionId, inspectorName, customerName) => {
//     try {
//       const existingMessages = getChatMessages(inspectionId);
      
//       // Only initialize if no messages exist
//       if (existingMessages.length === 0) {
//         const systemMessage = {
//           senderId: 'system',
//           senderName: 'System',
//           senderType: 'system',
//           message: `🎉 Inspection chat started! Inspector ${inspectorName} is now working with ${customerName}. Feel free to communicate throughout the inspection process.`,
//           type: 'system'
//         };

//         await sendMessage(inspectionId, systemMessage);
//         console.log('🆕 QueryContext: Chat initialized for inspection:', inspectionId);
//       }
//     } catch (err) {
//       console.error('❌ QueryContext: Error initializing chat:', err);
//     }
//   };

//   // Helper function to get chat statistics
//   const getChatStats = (inspectionId, userId) => {
//     try {
//       const messages = getChatForInspection(inspectionId);
//       const unreadCount = messages.filter(msg => 
//         msg.senderId !== userId && !msg.read
//       ).length;
      
//       return {
//         totalMessages: messages.length,
//         unreadCount,
//         lastMessage: messages.length > 0 ? messages[messages.length - 1] : null,
//         hasUnread: unreadCount > 0
//       };
//     } catch (err) {
//       console.error('❌ QueryContext: Error getting chat stats:', err);
//       return { totalMessages: 0, unreadCount: 0, lastMessage: null, hasUnread: false };
//     }
//   };

//   // Real-time message listener for notifications
//   const startMessageListener = (userId, userType, onNewMessage) => {
//     const handleNewMessage = (event) => {
//       const { message, inspectionId } = event.detail;
      
//       // Only notify if message is not from current user
//       if (message.senderId !== userId) {
//         console.log('🔔 New message received for user:', userId, message);
        
//         if (onNewMessage) {
//           onNewMessage({
//             inspectionId,
//             message,
//             unreadCount: getChatStats(inspectionId, userId).unreadCount
//           });
//         }
        
//         // Show browser notification if supported
//         if ('Notification' in window && Notification.permission === 'granted') {
//           new Notification(`New message from ${message.senderName}`, {
//             body: message.message,
//             icon: '/favicon.ico'
//           });
//         }
//       }
//     };

//     window.addEventListener('newChatMessage', handleNewMessage);
    
//     return () => {
//       window.removeEventListener('newChatMessage', handleNewMessage);
//     };
//   };

//   // Format query data for display
//   const formatQueryForDisplay = (query) => {
//     const getUrgencyColor = (urgency) => {
//       switch (urgency?.toLowerCase()) {
//         case 'high': return 'bg-red-100 text-red-700';
//         case 'medium': return 'bg-yellow-100 text-yellow-700';
//         case 'low': return 'bg-green-100 text-green-700';
//         default: return 'bg-gray-100 text-gray-700';
//       }
//     };

//     const getStatusColor = (status) => {
//       switch (status?.toLowerCase()) {
//         case 'active': return 'bg-blue-100 text-blue-700';
//         case 'in progress': return 'bg-orange-100 text-orange-700';
//         case 'completed': return 'bg-green-100 text-green-700';
//         case 'cancelled': return 'bg-gray-100 text-gray-700';
//         default: return 'bg-gray-100 text-gray-700';
//       }
//     };

//     return {
//       ...query,
//       urgencyColor: getUrgencyColor(query.urgency),
//       statusColor: getStatusColor(query.status),
//       formattedDate: new Date(query.submittedAt).toLocaleDateString(),
//       formattedTime: new Date(query.submittedAt).toLocaleTimeString(),
//       commodityDisplay: query.riceType || query.subCommodity || query.commodity || 'Not specified',
//       volumeDisplay: `${query.volume || 0} ${query.unit || 'units'}`,
//       locationDisplay: `${query.location || ''}, ${query.country || ''}`.replace(/^, |, $/, ''),
//       inspectionTypeDisplay: query.inspectionTypes?.map(type => 
//         type === 'physical' ? 'Physical Inspection' : 'Chemical Testing'
//       ).join(', ') || 'Not specified'
//     };
//   };

//   // Context value with all functions and state
//   const value = {
//     // State
//     queries,
//     loading,
//     error,
//     notifications,
//     chatMessages,

//     // Query functions
//     submitQuery,
//     placeBid,
//     confirmInspector,
//     updateStatus,
//     loadQueries,
//     refreshQueries,
//     getActiveQueriesForInspector,
//     getActiveInspectionsForInspector,
//     getCustomerQueries,
//     getCustomerActiveInspections,
//     getQuery,
//     getQueryStats,

//     // Notification functions
//     markNotificationRead,
//     createNotification,
//     getUnreadNotificationCount,

//     // Chat functions
//     sendMessage,
//     loadChatMessages,
//     getChatForInspection,
//     markChatMessagesRead,
//     onChatChange: handleChatChange,
//     initializeInspectionChat: initializeInspectionChatHandler,
//     getChatStats,
//     startMessageListener,

//     // Utility functions
//     getCurrentInspectorId,
//     getCurrentCustomerId,
//     clearError: () => setError(null),
//     formatQueryForDisplay
//   };

//   useEffect(() => {
//     window.queryContext = value;
//     return () => {
//       delete window.queryContext;
//     };
//   }, [value]);

//   return (
//     <QueryContext.Provider value={value}>
//       {children}
//     </QueryContext.Provider>
//   );
// };

// export default QueryContext;


// import { createContext, useContext, useState, useEffect } from 'react';
// import {
//   saveQuery,
//   getAllQueries,
//   getActiveQueries,
//   updateQueryStatus,
//   addBidToQuery,
//   getQueryById,
//   formatQueryForDisplay,
//   onQueriesChange,
//   confirmInspectorForQuery,
//   getInspectorActiveInspections,
//   getInspectorNotifications,
//   markNotificationAsRead,
//   getChatMessages,
//   sendChatMessage,
//   markMessagesAsRead,
//   onChatChange,
//   createInspectorNotification // ✅ ADDED THIS IMPORT
// } from '../utils/queryStorage';

// // Create the context
// const QueryContext = createContext();

// // Custom hook
// export const useQuery = () => {
//   const context = useContext(QueryContext);
//   if (!context) {
//     throw new Error('useQuery must be used within a QueryProvider');
//   }
//   return context;
// };

// // Provider
// export const QueryProvider = ({ children }) => {
//   const [queries, setQueries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [chatMessages, setChatMessages] = useState({});

//   useEffect(() => {
//     loadQueries();
//     loadNotifications();

//     // Listen for queries changes
//     const unsubscribeQueries = onQueriesChange((changeEvent) => {
//       console.log('QueryContext: Queries changed:', changeEvent);
//       loadQueries();
//       loadNotifications();
//     });

//     // Listen for chat changes
//     const unsubscribeChat = onChatChange((eventData) => {
//       console.log('QueryContext: Chat changed:', eventData);
//       if (eventData.inspectionId) {
//         // Update chat messages for the specific inspection
//         const updatedMessages = getChatMessages(eventData.inspectionId);
//         setChatMessages(prev => ({
//           ...prev,
//           [eventData.inspectionId]: updatedMessages
//         }));
//       }
//     });

//     // ✅ ADDED: Listen for bid confirmed events
//     const handleBidConfirmed = (event) => {
//       console.log('🔔 QueryContext: Bid confirmed event received:', event.detail);
//       try {
//         const bidData = event.detail;
        
//         // Create notification in storage
//         const notificationData = {
//           type: 'bid_confirmed',
//           queryId: bidData.queryId,
//           bidId: bidData.bidId,
//           queryTitle: bidData.queryTitle,
//           location: bidData.location,
//           amount: bidData.amount,
//           customerName: bidData.customerName,
//           bidDetails: bidData.bidDetails
//         };
        
//         // Create notification for the inspector
//         createInspectorNotification(bidData.inspectorId, notificationData);
        
//         // Refresh notifications
//         loadNotifications();
        
//         console.log('✅ QueryContext: Notification created successfully');
//       } catch (error) {
//         console.error('❌ QueryContext: Error creating notification:', error);
//       }
//     };

//     window.addEventListener('bidConfirmed', handleBidConfirmed);

//     // Periodic refresh for real-time updates
//     const interval = setInterval(() => {
//       loadQueries();
//       loadNotifications();
//     }, 10000);

//     return () => {
//       clearInterval(interval);
//       if (unsubscribeQueries) unsubscribeQueries();
//       if (unsubscribeChat) unsubscribeChat();
//       window.removeEventListener('bidConfirmed', handleBidConfirmed); // ✅ ADDED THIS
//     };
//   }, []);

//   const loadQueries = () => {
//     try {
//       setLoading(true);
//       const allQueries = getAllQueries();
//       setQueries(allQueries);
//       setError(null);
//       console.log('QueryContext: Loaded queries:', allQueries.length);
//     } catch (err) {
//       setError('Failed to load queries');
//       console.error('QueryContext: Error loading queries:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadNotifications = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const inspectorNotifications = getInspectorNotifications(currentInspectorId);
//       setNotifications(inspectorNotifications);
//       console.log('QueryContext: Loaded notifications:', inspectorNotifications.length);
//     } catch (err) {
//       console.error('QueryContext: Error loading notifications:', err);
//     }
//   };

//   const getCurrentInspectorId = () => {
//     // In a real app, this would come from auth context
//     return 'inspector-001';
//   };

//   const getCurrentCustomerId = () => {
//     // In a real app, this would come from auth context
//     return 'customer-001';
//   };

//   const submitQuery = async (queryData) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const transformedData = {
//         location: queryData.location,
//         country: queryData.country,
//         commodity: queryData.commodity,
//         subCommodity: queryData.subCommodity,
//         riceType: queryData.riceType,
//         volume: queryData.volume,
//         unit: queryData.unit,
//         urgency: queryData.urgency,
//         inspectionDateType: queryData.inspectionDateType,
//         inspectionDate: queryData.inspectionDate,
//         inspectionDateFrom: queryData.inspectionDateFrom,
//         inspectionDateTo: queryData.inspectionDateTo,
//         description: queryData.description,
//         companyName: queryData.companyName,
//         contactPerson: queryData.contactPerson,
//         email: queryData.email,
//         phone: queryData.phone,
//         expectedBudget: queryData.expectedBudget,
//         selectedCertifications: queryData.selectedCertifications || [],
//         inspectionTypes: queryData.inspectionTypes || []
//       };

//       console.log('QueryContext: Submitting query:', transformedData);
//       const newQuery = saveQuery(transformedData);
//       loadQueries();
//       return newQuery;
//     } catch (err) {
//       setError('Failed to submit query');
//       console.error('QueryContext: Error submitting query:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getActiveQueriesForInspector = () => {
//     try {
//       const activeQueries = getActiveQueries();
//       return activeQueries.map(query => formatQueryForDisplay(query));
//     } catch (err) {
//       console.error('QueryContext: Error getting active queries:', err);
//       return [];
//     }
//   };

//   const getCustomerQueries = (customerEmail) => {
//     try {
//       const customerQueries = queries.filter(q => q.email === customerEmail);
//       return customerQueries.map(query => formatQueryForDisplay(query));
//     } catch (err) {
//       console.error('QueryContext: Error getting customer queries:', err);
//       return [];
//     }
//   };

//   const placeBid = async (queryId, bidData) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // ✅ Enhanced bid data with inspector ID
//       const enhancedBidData = {
//         ...bidData,
//         inspectorId: bidData.inspectorId || getCurrentInspectorId(), // Ensure inspector ID is included
//         submittedAt: new Date().toISOString(),
//         status: 'pending'
//       };
      
//       console.log('QueryContext: Placing bid with data:', enhancedBidData);
      
//       const updatedQuery = addBidToQuery(queryId, enhancedBidData);
//       if (updatedQuery) {
//         loadQueries();
//         return updatedQuery;
//       } else {
//         throw new Error('Query not found');
//       }
//     } catch (err) {
//       setError('Failed to place bid');
//       console.error('QueryContext: Error placing bid:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmInspector = async (queryId, bidId, inspectorId) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
      
//       if (!queryId || !bidId || !inspectorId) {
//         throw new Error('Missing required parameters');
//       }
      
//       const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
//       if (!updatedQuery) {
//         throw new Error('Query or bid not found');
//       }
      
//       console.log('✅ QueryContext: Inspector confirmed successfully');
      
//       // Refresh data
//       loadQueries();
//       loadNotifications();
      
//       return updatedQuery;
//     } catch (err) {
//       setError(`Failed to confirm inspector: ${err.message}`);
//       console.error('❌ QueryContext: Error confirming inspector:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getActiveInspectionsForInspector = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const activeInspections = getInspectorActiveInspections(currentInspectorId);
//       return activeInspections.map(q => formatQueryForDisplay(q));
//     } catch (err) {
//       console.error('QueryContext: Error getting active inspections:', err);
//       return [];
//     }
//   };

//   const markNotificationRead = async (notificationId) => {
//     try {
//       console.log('📖 QueryContext: Marking notification as read:', notificationId);
//       markNotificationAsRead(notificationId);
//       loadNotifications();
//     } catch (err) {
//       console.error('QueryContext: Error marking notification as read:', err);
//     }
//   };

//   const updateStatus = async (queryId, newStatus) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedQuery = updateQueryStatus(queryId, newStatus);
//       if (updatedQuery) {
//         loadQueries();
//         return updatedQuery;
//       } else {
//         throw new Error('Query not found');
//       }
//     } catch (err) {
//       setError('Failed to update status');
//       console.error('QueryContext: Error updating status:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getQuery = (queryId) => {
//     try {
//       const query = getQueryById(queryId);
//       return query ? formatQueryForDisplay(query) : null;
//     } catch (err) {
//       console.error('QueryContext: Error getting query:', err);
//       return null;
//     }
//   };

//   const getQueryStats = () => {
//     try {
//       const totalQueries = queries.length;
//       const active = queries.filter(q => q.status === 'Active').length;
//       const completed = queries.filter(q => q.status === 'Completed').length;
//       const inProgress = queries.filter(q => q.status === 'In Progress').length;
//       return { total: totalQueries, active, completed, inProgress };
//     } catch (err) {
//       console.error('QueryContext: Error getting stats:', err);
//       return { total: 0, active: 0, completed: 0, inProgress: 0 };
//     }
//   };

//   const refreshQueries = () => {
//     console.log('QueryContext: Manual refresh triggered');
//     loadQueries();
//     loadNotifications();
//   };

//   // ✅ NEW: Create notification function
//   const createNotification = async (inspectorId, notificationData) => {
//     try {
//       console.log('🔔 QueryContext: Creating notification for inspector:', inspectorId);
//       console.log('📋 Notification data:', notificationData);
      
//       const notification = createInspectorNotification(inspectorId, notificationData);
      
//       // Refresh notifications
//       loadNotifications();
      
//       console.log('✅ QueryContext: Notification created successfully:', notification.id);
//       return notification;
//     } catch (error) {
//       console.error('❌ QueryContext: Error creating notification:', error);
//       throw error;
//     }
//   };

//   // ✅ NEW: Get unread notification count
//   const getUnreadNotificationCount = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const unreadCount = notifications.filter(n => 
//         n.inspectorId === currentInspectorId && !n.read
//       ).length;
//       return unreadCount;
//     } catch (error) {
//       console.error('QueryContext: Error getting unread notification count:', error);
//       return 0;
//     }
//   };

//   // =====================
//   // CHAT FUNCTIONALITY
//   // =====================

//   const sendMessage = async (inspectionId, messageData) => {
//     try {
//       console.log('QueryContext: Sending message:', { inspectionId, messageData });
      
//       const newMessage = await sendChatMessage(inspectionId, messageData);
      
//       // Update local state immediately for better UX
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: [...(prev[inspectionId] || []), newMessage]
//       }));

//       // Dispatch custom event for real-time updates across components
//       window.dispatchEvent(new CustomEvent('chatUpdated', {
//         detail: { inspectionId, message: newMessage }
//       }));

//       console.log('QueryContext: Message sent successfully:', newMessage.id);
//       return newMessage;
//     } catch (err) {
//       console.error('QueryContext: Error sending message:', err);
//       throw err;
//     }
//   };

//   const loadChatMessages = (inspectionId) => {
//     try {
//       console.log('QueryContext: Loading chat messages for inspection:', inspectionId);
//       const messages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: messages
//       }));
//       console.log('QueryContext: Loaded', messages.length, 'messages for inspection:', inspectionId);
//       return messages;
//     } catch (err) {
//       console.error('QueryContext: Error loading chat messages:', err);
//       return [];
//     }
//   };

//   const getChatForInspection = (inspectionId) => {
//     try {
//       // First try to get from local state
//       if (chatMessages[inspectionId]) {
//         return chatMessages[inspectionId];
//       }
      
//       // If not in state, load from storage
//       const messages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: messages
//       }));
      
//       return messages;
//     } catch (err) {
//       console.error('QueryContext: Error getting chat for inspection:', err);
//       return [];
//     }
//   };

//   const markChatMessagesRead = async (inspectionId, userId) => {
//     try {
//       await markMessagesAsRead(inspectionId, userId);
//       const updatedMessages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: updatedMessages
//       }));
//       console.log('QueryContext: Messages marked as read for inspection:', inspectionId);
//     } catch (err) {
//       console.error('QueryContext: Error marking messages read:', err);
//     }
//   };

//   // Enhanced chat change listener that handles all chat events
//   const handleChatChange = (callback) => {
//     const eventHandler = (event) => {
//       console.log('QueryContext: Chat change event received:', event.detail);
//       callback(event.detail);
//     };

//     // Listen for multiple types of chat events
//     window.addEventListener('newChatMessage', eventHandler);
//     window.addEventListener('chatUpdated', eventHandler);
//     window.addEventListener('messagesRead', eventHandler);

//     // Return cleanup function
//     return () => {
//       window.removeEventListener('newChatMessage', eventHandler);
//       window.removeEventListener('chatUpdated', eventHandler);
//       window.removeEventListener('messagesRead', eventHandler);
//     };
//   };

//   // Initialize chat for inspection
//   const initializeInspectionChat = async (inspectionId, inspectorName, customerName) => {
//     try {
//       const existingMessages = getChatMessages(inspectionId);
      
//       // Only initialize if no messages exist
//       if (existingMessages.length === 0) {
//         const systemMessage = {
//           senderId: 'system',
//           senderName: 'System',
//           senderType: 'system',
//           message: `Inspection chat started! Inspector ${inspectorName} is now working with ${customerName}.`,
//           type: 'system'
//         };

//         await sendMessage(inspectionId, systemMessage);
//         console.log('QueryContext: Chat initialized for inspection:', inspectionId);
//       }
//     } catch (err) {
//       console.error('QueryContext: Error initializing chat:', err);
//     }
//   };

//   // Helper function to get chat statistics
//   const getChatStats = (inspectionId, userId) => {
//     try {
//       const messages = getChatForInspection(inspectionId);
//       const unreadCount = messages.filter(msg => 
//         msg.senderId !== userId && !msg.read
//       ).length;
      
//       return {
//         totalMessages: messages.length,
//         unreadCount,
//         lastMessage: messages.length > 0 ? messages[messages.length - 1] : null
//       };
//     } catch (err) {
//       console.error('QueryContext: Error getting chat stats:', err);
//       return { totalMessages: 0, unreadCount: 0, lastMessage: null };
//     }
//   };

//   // ✅ NEW: Debug functions for testing
//   const debugFunctions = {
//     // Force create a test notification
//     createTestNotification: () => {
//       const testData = {
//         type: 'bid_confirmed',
//         queryId: 'TEST-QUERY-123',
//         bidId: 'TEST-BID-456',
//         queryTitle: 'Test Rice Inspection',
//         location: 'Test Location, India',
//         amount: 750,
//         customerName: 'Test Customer',
//         bidDetails: {
//           inspectorName: 'Test Inspector',
//           company: 'Test Company',
//           proposedTimeline: '2 days',
//           rating: 4.8,
//           experience: '5 years'
//         }
//       };
      
//       return createNotification(getCurrentInspectorId(), testData);
//     },
    
//     // Test event dispatch
//     testEventDispatch: () => {
//       const testData = {
//         type: 'bid_confirmed',
//         inspectorId: getCurrentInspectorId(),
//         queryId: 'TEST-QUERY-123',
//         bidId: 'TEST-BID-456',
//         queryTitle: 'Test Rice Inspection',
//         location: 'Test Location, India',
//         amount: 750,
//         customerName: 'Test Customer',
//         bidDetails: {
//           inspectorName: 'Test Inspector',
//           company: 'Test Company',
//           proposedTimeline: '2 days',
//           rating: 4.8,
//           experience: '5 years'
//         }
//       };
      
//       window.dispatchEvent(new CustomEvent('bidConfirmed', {
//         detail: testData
//       }));
      
//       console.log('🧪 Test event dispatched:', testData);
//     },
    
//     // Get current inspector ID
//     getCurrentInspectorId,
    
//     // Get all notifications
//     getAllNotifications: () => notifications,
    
//     // Force refresh
//     forceRefresh: () => {
//       loadQueries();
//       loadNotifications();
//     }
//   };

//   // Context value with all functions and state
//   const value = {
//     // State
//     queries,
//     loading,
//     error,
//     notifications,
//     chatMessages,

//     // Query functions
//     submitQuery,
//     placeBid,
//     confirmInspector,
//     updateStatus,
//     loadQueries,
//     refreshQueries,
//     getActiveQueriesForInspector,
//     getActiveInspectionsForInspector,
//     getCustomerQueries,
//     getQuery,
//     getQueryStats,

//     // Notification functions
//     markNotificationRead,
//     createNotification, // ✅ NEW
//     getUnreadNotificationCount, // ✅ NEW

//     // Utility functions
//     getCurrentInspectorId,
//     getCurrentCustomerId,
//     clearError: () => setError(null),

//     // =====================
//     // CHAT FUNCTIONS
//     // =====================
    
//     // Core chat functions
//     sendMessage,
//     loadChatMessages,
//     getChatForInspection,
//     markChatMessagesRead,
//     onChatChange: handleChatChange,
    
//     // Additional chat functions
//     initializeInspectionChat,
//     getChatStats,
    
//     // ✅ Debug functions (remove in production)
//     debug: debugFunctions
//   };

//   useEffect(() => {
//   window.queryContext = value;
//   return () => {
//     delete window.queryContext;
//   };
// }, [value]);

//   return (
//     <QueryContext.Provider value={value}>
//       {children}
//     </QueryContext.Provider>
//   );
// };

// export default QueryContext;



// import { createContext, useContext, useState, useEffect } from 'react';
// import {
//   saveQuery,
//   getAllQueries,
//   getActiveQueries,
//   updateQueryStatus,
//   addBidToQuery,
//   getQueryById,
//   formatQueryForDisplay,
//   onQueriesChange,
//   confirmInspectorForQuery,
//   getInspectorActiveInspections,
//   getInspectorNotifications,
//   markNotificationAsRead,
//   getChatMessages,
//   sendChatMessage,
//   markMessagesAsRead,
//   onChatChange,
//   createInspectorNotification
// } from '../utils/queryStorage';

// // Create the context
// const QueryContext = createContext();

// // Custom hook
// export const useQuery = () => {
//   const context = useContext(QueryContext);
//   if (!context) {
//     throw new Error('useQuery must be used within a QueryProvider');
//   }
//   return context;
// };

// // Provider
// export const QueryProvider = ({ children }) => {
//   const [queries, setQueries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [chatMessages, setChatMessages] = useState({});

//   useEffect(() => {
//     loadQueries();
//     loadNotifications();

//     // Listen for queries changes
//     const unsubscribeQueries = onQueriesChange((changeEvent) => {
//       console.log('QueryContext: Queries changed:', changeEvent);
//       loadQueries();
//       loadNotifications();
//     });

//     // Listen for chat changes
//     const unsubscribeChat = onChatChange((eventData) => {
//       console.log('QueryContext: Chat changed:', eventData);
//       if (eventData.inspectionId) {
//         // Update chat messages for the specific inspection
//         const updatedMessages = getChatMessages(eventData.inspectionId);
//         setChatMessages(prev => ({
//           ...prev,
//           [eventData.inspectionId]: updatedMessages
//         }));
//       }
//     });

//     // ❌ REMOVED: Duplicate bid confirmed event listener
//     // The inspector bidding room will handle the event directly
//     // The customer component will call confirmInspector directly

//     // Periodic refresh for real-time updates
//     const interval = setInterval(() => {
//       loadQueries();
//       loadNotifications();
//     }, 10000);

//     return () => {
//       clearInterval(interval);
//       if (unsubscribeQueries) unsubscribeQueries();
//       if (unsubscribeChat) unsubscribeChat();
//       // ❌ REMOVED: window.removeEventListener('bidConfirmed', handleBidConfirmed);
//     };
//   }, []);

//   const loadQueries = () => {
//     try {
//       setLoading(true);
//       const allQueries = getAllQueries();
//       setQueries(allQueries);
//       setError(null);
//       console.log('QueryContext: Loaded queries:', allQueries.length);
//     } catch (err) {
//       setError('Failed to load queries');
//       console.error('QueryContext: Error loading queries:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadNotifications = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const inspectorNotifications = getInspectorNotifications(currentInspectorId);
//       setNotifications(inspectorNotifications);
//       console.log('QueryContext: Loaded notifications:', inspectorNotifications.length);
//     } catch (err) {
//       console.error('QueryContext: Error loading notifications:', err);
//     }
//   };

//   const getCurrentInspectorId = () => {
//     // In a real app, this would come from auth context
//     return 'inspector-001';
//   };

//   const getCurrentCustomerId = () => {
//     // In a real app, this would come from auth context
//     return 'customer-001';
//   };

//   const submitQuery = async (queryData) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const transformedData = {
//         location: queryData.location,
//         country: queryData.country,
//         commodity: queryData.commodity,
//         subCommodity: queryData.subCommodity,
//         riceType: queryData.riceType,
//         volume: queryData.volume,
//         unit: queryData.unit,
//         urgency: queryData.urgency,
//         inspectionDateType: queryData.inspectionDateType,
//         inspectionDate: queryData.inspectionDate,
//         inspectionDateFrom: queryData.inspectionDateFrom,
//         inspectionDateTo: queryData.inspectionDateTo,
//         description: queryData.description,
//         companyName: queryData.companyName,
//         contactPerson: queryData.contactPerson,
//         email: queryData.email,
//         phone: queryData.phone,
//         expectedBudget: queryData.expectedBudget,
//         selectedCertifications: queryData.selectedCertifications || [],
//         inspectionTypes: queryData.inspectionTypes || []
//       };

//       console.log('QueryContext: Submitting query:', transformedData);
//       const newQuery = saveQuery(transformedData);
//       loadQueries();
//       return newQuery;
//     } catch (err) {
//       setError('Failed to submit query');
//       console.error('QueryContext: Error submitting query:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getActiveQueriesForInspector = () => {
//     try {
//       const activeQueries = getActiveQueries();
//       return activeQueries.map(query => formatQueryForDisplay(query));
//     } catch (err) {
//       console.error('QueryContext: Error getting active queries:', err);
//       return [];
//     }
//   };

//   const getCustomerQueries = (customerEmail) => {
//     try {
//       const customerQueries = queries.filter(q => q.email === customerEmail);
//       return customerQueries.map(query => formatQueryForDisplay(query));
//     } catch (err) {
//       console.error('QueryContext: Error getting customer queries:', err);
//       return [];
//     }
//   };

//   const placeBid = async (queryId, bidData) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // ✅ Enhanced bid data with inspector ID
//       const enhancedBidData = {
//         ...bidData,
//         inspectorId: bidData.inspectorId || getCurrentInspectorId(), // Ensure inspector ID is included
//         submittedAt: new Date().toISOString(),
//         status: 'pending'
//       };
      
//       console.log('QueryContext: Placing bid with data:', enhancedBidData);
      
//       const updatedQuery = addBidToQuery(queryId, enhancedBidData);
//       if (updatedQuery) {
//         loadQueries();
//         return updatedQuery;
//       } else {
//         throw new Error('Query not found');
//       }
//     } catch (err) {
//       setError('Failed to place bid');
//       console.error('QueryContext: Error placing bid:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ UPDATED: This function now handles BOTH the confirmation AND the notification
//   const confirmInspector = async (queryId, bidId, inspectorId) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
      
//       if (!queryId || !bidId || !inspectorId) {
//         throw new Error('Missing required parameters');
//       }
      
//       // ✅ This function in queryStorage.js already creates the notification
//       // No need for separate event dispatching
//       const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
//       if (!updatedQuery) {
//         throw new Error('Query or bid not found');
//       }
      
//       console.log('✅ QueryContext: Inspector confirmed successfully');
      
//       // Refresh data
//       loadQueries();
//       loadNotifications(); // This will load the newly created notification
      
//       return updatedQuery;
//     } catch (err) {
//       setError(`Failed to confirm inspector: ${err.message}`);
//       console.error('❌ QueryContext: Error confirming inspector:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getActiveInspectionsForInspector = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const activeInspections = getInspectorActiveInspections(currentInspectorId);
//       return activeInspections.map(q => formatQueryForDisplay(q));
//     } catch (err) {
//       console.error('QueryContext: Error getting active inspections:', err);
//       return [];
//     }
//   };

//   const markNotificationRead = async (notificationId) => {
//     try {
//       console.log('📖 QueryContext: Marking notification as read:', notificationId);
//       markNotificationAsRead(notificationId);
//       loadNotifications();
//     } catch (err) {
//       console.error('QueryContext: Error marking notification as read:', err);
//     }
//   };

//   const updateStatus = async (queryId, newStatus) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedQuery = updateQueryStatus(queryId, newStatus);
//       if (updatedQuery) {
//         loadQueries();
//         return updatedQuery;
//       } else {
//         throw new Error('Query not found');
//       }
//     } catch (err) {
//       setError('Failed to update status');
//       console.error('QueryContext: Error updating status:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getQuery = (queryId) => {
//     try {
//       const query = getQueryById(queryId);
//       return query ? formatQueryForDisplay(query) : null;
//     } catch (err) {
//       console.error('QueryContext: Error getting query:', err);
//       return null;
//     }
//   };

//   const getQueryStats = () => {
//     try {
//       const totalQueries = queries.length;
//       const active = queries.filter(q => q.status === 'Active').length;
//       const completed = queries.filter(q => q.status === 'Completed').length;
//       const inProgress = queries.filter(q => q.status === 'In Progress').length;
//       return { total: totalQueries, active, completed, inProgress };
//     } catch (err) {
//       console.error('QueryContext: Error getting stats:', err);
//       return { total: 0, active: 0, completed: 0, inProgress: 0 };
//     }
//   };

//   const refreshQueries = () => {
//     console.log('QueryContext: Manual refresh triggered');
//     loadQueries();
//     loadNotifications();
//   };

//   // ✅ NEW: Create notification function
//   const createNotification = async (inspectorId, notificationData) => {
//     try {
//       console.log('🔔 QueryContext: Creating notification for inspector:', inspectorId);
//       console.log('📋 Notification data:', notificationData);
      
//       const notification = createInspectorNotification(inspectorId, notificationData);
      
//       // Refresh notifications
//       loadNotifications();
      
//       console.log('✅ QueryContext: Notification created successfully:', notification.id);
//       return notification;
//     } catch (error) {
//       console.error('❌ QueryContext: Error creating notification:', error);
//       throw error;
//     }
//   };

//   // ✅ NEW: Get unread notification count
//   const getUnreadNotificationCount = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const unreadCount = notifications.filter(n => 
//         n.inspectorId === currentInspectorId && !n.read
//       ).length;
//       return unreadCount;
//     } catch (error) {
//       console.error('QueryContext: Error getting unread notification count:', error);
//       return 0;
//     }
//   };

//   // =====================
//   // CHAT FUNCTIONALITY
//   // =====================

//   const sendMessage = async (inspectionId, messageData) => {
//     try {
//       console.log('QueryContext: Sending message:', { inspectionId, messageData });
      
//       const newMessage = await sendChatMessage(inspectionId, messageData);
      
//       // Update local state immediately for better UX
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: [...(prev[inspectionId] || []), newMessage]
//       }));

//       // Dispatch custom event for real-time updates across components
//       window.dispatchEvent(new CustomEvent('chatUpdated', {
//         detail: { inspectionId, message: newMessage }
//       }));

//       console.log('QueryContext: Message sent successfully:', newMessage.id);
//       return newMessage;
//     } catch (err) {
//       console.error('QueryContext: Error sending message:', err);
//       throw err;
//     }
//   };

//   const loadChatMessages = (inspectionId) => {
//     try {
//       console.log('QueryContext: Loading chat messages for inspection:', inspectionId);
//       const messages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: messages
//       }));
//       console.log('QueryContext: Loaded', messages.length, 'messages for inspection:', inspectionId);
//       return messages;
//     } catch (err) {
//       console.error('QueryContext: Error loading chat messages:', err);
//       return [];
//     }
//   };

//   const getChatForInspection = (inspectionId) => {
//     try {
//       // First try to get from local state
//       if (chatMessages[inspectionId]) {
//         return chatMessages[inspectionId];
//       }
      
//       // If not in state, load from storage
//       const messages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: messages
//       }));
      
//       return messages;
//     } catch (err) {
//       console.error('QueryContext: Error getting chat for inspection:', err);
//       return [];
//     }
//   };

//   const markChatMessagesRead = async (inspectionId, userId) => {
//     try {
//       await markMessagesAsRead(inspectionId, userId);
//       const updatedMessages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: updatedMessages
//       }));
//       console.log('QueryContext: Messages marked as read for inspection:', inspectionId);
//     } catch (err) {
//       console.error('QueryContext: Error marking messages read:', err);
//     }
//   };

//   // Enhanced chat change listener that handles all chat events
//   const handleChatChange = (callback) => {
//     const eventHandler = (event) => {
//       console.log('QueryContext: Chat change event received:', event.detail);
//       callback(event.detail);
//     };

//     // Listen for multiple types of chat events
//     window.addEventListener('newChatMessage', eventHandler);
//     window.addEventListener('chatUpdated', eventHandler);
//     window.addEventListener('messagesRead', eventHandler);

//     // Return cleanup function
//     return () => {
//       window.removeEventListener('newChatMessage', eventHandler);
//       window.removeEventListener('chatUpdated', eventHandler);
//       window.removeEventListener('messagesRead', eventHandler);
//     };
//   };

//   // Initialize chat for inspection
//   const initializeInspectionChat = async (inspectionId, inspectorName, customerName) => {
//     try {
//       const existingMessages = getChatMessages(inspectionId);
      
//       // Only initialize if no messages exist
//       if (existingMessages.length === 0) {
//         const systemMessage = {
//           senderId: 'system',
//           senderName: 'System',
//           senderType: 'system',
//           message: `Inspection chat started! Inspector ${inspectorName} is now working with ${customerName}.`,
//           type: 'system'
//         };

//         await sendMessage(inspectionId, systemMessage);
//         console.log('QueryContext: Chat initialized for inspection:', inspectionId);
//       }
//     } catch (err) {
//       console.error('QueryContext: Error initializing chat:', err);
//     }
//   };

//   // Helper function to get chat statistics
//   const getChatStats = (inspectionId, userId) => {
//     try {
//       const messages = getChatForInspection(inspectionId);
//       const unreadCount = messages.filter(msg => 
//         msg.senderId !== userId && !msg.read
//       ).length;
      
//       return {
//         totalMessages: messages.length,
//         unreadCount,
//         lastMessage: messages.length > 0 ? messages[messages.length - 1] : null
//       };
//     } catch (err) {
//       console.error('QueryContext: Error getting chat stats:', err);
//       return { totalMessages: 0, unreadCount: 0, lastMessage: null };
//     }
//   };

//   // ✅ NEW: Debug functions for testing
//   const debugFunctions = {
//     // Force create a test notification
//     createTestNotification: () => {
//       const testData = {
//         type: 'bid_confirmed',
//         queryId: 'TEST-QUERY-123',
//         bidId: 'TEST-BID-456',
//         queryTitle: 'Test Rice Inspection',
//         location: 'Test Location, India',
//         amount: 750,
//         customerName: 'Test Customer',
//         bidDetails: {
//           inspectorName: 'Test Inspector',
//           company: 'Test Company',
//           proposedTimeline: '2 days',
//           rating: 4.8,
//           experience: '5 years'
//         }
//       };
      
//       return createNotification(getCurrentInspectorId(), testData);
//     },
    
//     // Test event dispatch
//     testEventDispatch: () => {
//       const testData = {
//         type: 'bid_confirmed',
//         inspectorId: getCurrentInspectorId(),
//         queryId: 'TEST-QUERY-123',
//         bidId: 'TEST-BID-456',
//         queryTitle: 'Test Rice Inspection',
//         location: 'Test Location, India',
//         amount: 750,
//         customerName: 'Test Customer',
//         bidDetails: {
//           inspectorName: 'Test Inspector',
//           company: 'Test Company',
//           proposedTimeline: '2 days',
//           rating: 4.8,
//           experience: '5 years'
//         }
//       };
      
//       window.dispatchEvent(new CustomEvent('bidConfirmed', {
//         detail: testData
//       }));
      
//       console.log('🧪 Test event dispatched:', testData);
//     },
    
//     // Get current inspector ID
//     getCurrentInspectorId,
    
//     // Get all notifications
//     getAllNotifications: () => notifications,
    
//     // Force refresh
//     forceRefresh: () => {
//       loadQueries();
//       loadNotifications();
//     }
//   };

//   // Context value with all functions and state
//   const value = {
//     // State
//     queries,
//     loading,
//     error,
//     notifications,
//     chatMessages,

//     // Query functions
//     submitQuery,
//     placeBid,
//     confirmInspector,
//     updateStatus,
//     loadQueries,
//     refreshQueries,
//     getActiveQueriesForInspector,
//     getActiveInspectionsForInspector,
//     getCustomerQueries,
//     getQuery,
//     getQueryStats,

//     // Notification functions
//     markNotificationRead,
//     createNotification, // ✅ NEW
//     getUnreadNotificationCount, // ✅ NEW

//     // Utility functions
//     getCurrentInspectorId,
//     getCurrentCustomerId,
//     clearError: () => setError(null),

//     // =====================
//     // CHAT FUNCTIONS
//     // =====================
    
//     // Core chat functions
//     sendMessage,
//     loadChatMessages,
//     getChatForInspection,
//     markChatMessagesRead,
//     onChatChange: handleChatChange,
    
//     // Additional chat functions
//     initializeInspectionChat,
//     getChatStats,
    
//     // ✅ Debug functions (remove in production)
//     debug: debugFunctions
//   };

//   useEffect(() => {
//   window.queryContext = value;
//   return () => {
//     delete window.queryContext;
//   };
// }, [value]);

//   return (
//     <QueryContext.Provider value={value}>
//       {children}
//     </QueryContext.Provider>
//   );
// };

// export default QueryContext;



// import { createContext, useContext, useState, useEffect } from 'react';
// import {
//   saveQuery,
//   getAllQueries,
//   getActiveQueries,
//   updateQueryStatus,
//   addBidToQuery,
//   getQueryById,
//   formatQueryForDisplay,
//   onQueriesChange,
//   confirmInspectorForQuery,
//   getInspectorActiveInspections,
//   getInspectorNotifications,
//   markNotificationAsRead,
//   getChatMessages,
//   sendChatMessage,
//   markMessagesAsRead,
//   onChatChange,
//   createInspectorNotification
// } from '../utils/queryStorage';

// // Create the context
// const QueryContext = createContext();

// // Custom hook
// export const useQuery = () => {
//   const context = useContext(QueryContext);
//   if (!context) {
//     throw new Error('useQuery must be used within a QueryProvider');
//   }
//   return context;
// };

// // Provider
// export const QueryProvider = ({ children }) => {
//   const [queries, setQueries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [chatMessages, setChatMessages] = useState({});

//   useEffect(() => {
//     loadQueries();
//     loadNotifications();

//     // Listen for queries changes
//     const unsubscribeQueries = onQueriesChange((changeEvent) => {
//       console.log('QueryContext: Queries changed:', changeEvent);
//       loadQueries();
//       loadNotifications();
//     });

//     // Listen for chat changes
//     const unsubscribeChat = onChatChange((eventData) => {
//       console.log('QueryContext: Chat changed:', eventData);
//       if (eventData.inspectionId) {
//         // Update chat messages for the specific inspection
//         const updatedMessages = getChatMessages(eventData.inspectionId);
//         setChatMessages(prev => ({
//           ...prev,
//           [eventData.inspectionId]: updatedMessages
//         }));
//       }
//     });

//     // ❌ REMOVED: Duplicate bid confirmed event listener
//     // The inspector bidding room will handle the event directly
//     // The customer component will call confirmInspector directly

//     // Periodic refresh for real-time updates
//     const interval = setInterval(() => {
//       loadQueries();
//       loadNotifications();
//     }, 10000);

//     return () => {
//       clearInterval(interval);
//       if (unsubscribeQueries) unsubscribeQueries();
//       if (unsubscribeChat) unsubscribeChat();
//     };
//   }, []);

//   const loadQueries = () => {
//     try {
//       setLoading(true);
//       const allQueries = getAllQueries();
//       setQueries(allQueries);
//       setError(null);
//       console.log('QueryContext: Loaded queries:', allQueries.length);
//     } catch (err) {
//       setError('Failed to load queries');
//       console.error('QueryContext: Error loading queries:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadNotifications = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const inspectorNotifications = getInspectorNotifications(currentInspectorId);
//       setNotifications(inspectorNotifications);
//       console.log('QueryContext: Loaded notifications:', inspectorNotifications.length);
//     } catch (err) {
//       console.error('QueryContext: Error loading notifications:', err);
//     }
//   };

//   const getCurrentInspectorId = () => {
//     // In a real app, this would come from auth context
//     return 'inspector-001';
//   };

//   const getCurrentCustomerId = () => {
//     // In a real app, this would come from auth context
//     return 'customer-001';
//   };

//   const submitQuery = async (queryData) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const transformedData = {
//         location: queryData.location,
//         country: queryData.country,
//         commodity: queryData.commodity,
//         subCommodity: queryData.subCommodity,
//         riceType: queryData.riceType,
//         volume: queryData.volume,
//         unit: queryData.unit,
//         urgency: queryData.urgency,
//         inspectionDateType: queryData.inspectionDateType,
//         inspectionDate: queryData.inspectionDate,
//         inspectionDateFrom: queryData.inspectionDateFrom,
//         inspectionDateTo: queryData.inspectionDateTo,
//         description: queryData.description,
//         companyName: queryData.companyName,
//         contactPerson: queryData.contactPerson,
//         email: queryData.email,
//         phone: queryData.phone,
//         expectedBudget: queryData.expectedBudget,
//         selectedCertifications: queryData.selectedCertifications || [],
//         inspectionTypes: queryData.inspectionTypes || []
//       };

//       console.log('QueryContext: Submitting query:', transformedData);
//       const newQuery = saveQuery(transformedData);
//       loadQueries();
//       return newQuery;
//     } catch (err) {
//       setError('Failed to submit query');
//       console.error('QueryContext: Error submitting query:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getActiveQueriesForInspector = () => {
//     try {
//       const activeQueries = getActiveQueries();
//       return activeQueries.map(query => formatQueryForDisplay(query));
//     } catch (err) {
//       console.error('QueryContext: Error getting active queries:', err);
//       return [];
//     }
//   };

//   const getCustomerQueries = (customerEmail) => {
//     try {
//       const customerQueries = queries.filter(q => q.email === customerEmail);
//       return customerQueries.map(query => formatQueryForDisplay(query));
//     } catch (err) {
//       console.error('QueryContext: Error getting customer queries:', err);
//       return [];
//     }
//   };

//   const placeBid = async (queryId, bidData) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // ✅ Enhanced bid data with inspector ID
//       const enhancedBidData = {
//         ...bidData,
//         inspectorId: bidData.inspectorId || getCurrentInspectorId(),
//         submittedAt: new Date().toISOString(),
//         status: 'pending'
//       };
      
//       console.log('QueryContext: Placing bid with data:', enhancedBidData);
      
//       const updatedQuery = addBidToQuery(queryId, enhancedBidData);
//       if (updatedQuery) {
//         loadQueries();
//         return updatedQuery;
//       } else {
//         throw new Error('Query not found');
//       }
//     } catch (err) {
//       setError('Failed to place bid');
//       console.error('QueryContext: Error placing bid:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ UPDATED: This function now handles BOTH the confirmation AND the notification
//   const confirmInspector = async (queryId, bidId, inspectorId) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
      
//       if (!queryId || !bidId || !inspectorId) {
//         throw new Error('Missing required parameters');
//       }
      
//       // ✅ This function in queryStorage.js already creates the notification
//       // No need for separate event dispatching
//       const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
//       if (!updatedQuery) {
//         throw new Error('Query or bid not found');
//       }
      
//       console.log('✅ QueryContext: Inspector confirmed successfully');
      
//       // Refresh data
//       loadQueries();
//       loadNotifications(); // This will load the newly created notification
      
//       return updatedQuery;
//     } catch (err) {
//       setError(`Failed to confirm inspector: ${err.message}`);
//       console.error('❌ QueryContext: Error confirming inspector:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getActiveInspectionsForInspector = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const activeInspections = getInspectorActiveInspections(currentInspectorId);
//       return activeInspections.map(q => formatQueryForDisplay(q));
//     } catch (err) {
//       console.error('QueryContext: Error getting active inspections:', err);
//       return [];
//     }
//   };

//   const markNotificationRead = async (notificationId) => {
//     try {
//       console.log('📖 QueryContext: Marking notification as read:', notificationId);
//       markNotificationAsRead(notificationId);
//       loadNotifications();
//     } catch (err) {
//       console.error('QueryContext: Error marking notification as read:', err);
//     }
//   };

//   const updateStatus = async (queryId, newStatus) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedQuery = updateQueryStatus(queryId, newStatus);
//       if (updatedQuery) {
//         loadQueries();
//         return updatedQuery;
//       } else {
//         throw new Error('Query not found');
//       }
//     } catch (err) {
//       setError('Failed to update status');
//       console.error('QueryContext: Error updating status:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getQuery = (queryId) => {
//     try {
//       const query = getQueryById(queryId);
//       return query ? formatQueryForDisplay(query) : null;
//     } catch (err) {
//       console.error('QueryContext: Error getting query:', err);
//       return null;
//     }
//   };

//   const getQueryStats = () => {
//     try {
//       const totalQueries = queries.length;
//       const active = queries.filter(q => q.status === 'Active').length;
//       const completed = queries.filter(q => q.status === 'Completed').length;
//       const inProgress = queries.filter(q => q.status === 'In Progress').length;
//       return { total: totalQueries, active, completed, inProgress };
//     } catch (err) {
//       console.error('QueryContext: Error getting stats:', err);
//       return { total: 0, active: 0, completed: 0, inProgress: 0 };
//     }
//   };

//   const refreshQueries = () => {
//     console.log('QueryContext: Manual refresh triggered');
//     loadQueries();
//     loadNotifications();
//   };

//   // ✅ NEW: Create notification function
//   const createNotification = async (inspectorId, notificationData) => {
//     try {
//       console.log('🔔 QueryContext: Creating notification for inspector:', inspectorId);
//       console.log('📋 Notification data:', notificationData);
      
//       const notification = createInspectorNotification(inspectorId, notificationData);
      
//       // Refresh notifications
//       loadNotifications();
      
//       console.log('✅ QueryContext: Notification created successfully:', notification.id);
//       return notification;
//     } catch (error) {
//       console.error('❌ QueryContext: Error creating notification:', error);
//       throw error;
//     }
//   };

//   // ✅ NEW: Get unread notification count
//   const getUnreadNotificationCount = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const unreadCount = notifications.filter(n => 
//         n.inspectorId === currentInspectorId && !n.read
//       ).length;
//       return unreadCount;
//     } catch (error) {
//       console.error('QueryContext: Error getting unread notification count:', error);
//       return 0;
//     }
//   };

//   // =====================
//   // CHAT FUNCTIONALITY
//   // =====================

//   const sendMessage = async (inspectionId, messageData) => {
//     try {
//       console.log('📤 QueryContext: Sending message:', { inspectionId, messageData });
      
//       const newMessage = await sendChatMessage(inspectionId, messageData);
      
//       // Update local state immediately for better UX
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: [...(prev[inspectionId] || []), newMessage]
//       }));

//       // Dispatch multiple events for real-time updates
//       window.dispatchEvent(new CustomEvent('chatUpdated', {
//         detail: { inspectionId, message: newMessage }
//       }));

//       // Specific event for new messages
//       window.dispatchEvent(new CustomEvent('newChatMessage', {
//         detail: { 
//           inspectionId, 
//           message: newMessage,
//           senderId: messageData.senderId,
//           senderType: messageData.senderType
//         }
//       }));

//       console.log('✅ QueryContext: Message sent successfully:', newMessage.id);
//       return newMessage;
//     } catch (err) {
//       console.error('❌ QueryContext: Error sending message:', err);
//       throw err;
//     }
//   };

//   const loadChatMessages = (inspectionId) => {
//     try {
//       console.log('🔄 QueryContext: Loading chat messages for inspection:', inspectionId);
//       const messages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: messages
//       }));
//       console.log('📋 QueryContext: Loaded', messages.length, 'messages for inspection:', inspectionId);
//       return messages;
//     } catch (err) {
//       console.error('❌ QueryContext: Error loading chat messages:', err);
//       return [];
//     }
//   };

//   const getChatForInspection = (inspectionId) => {
//     try {
//       // First try to get from local state
//       if (chatMessages[inspectionId]) {
//         return chatMessages[inspectionId];
//       }
      
//       // If not in state, load from storage
//       const messages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: messages
//       }));
      
//       return messages;
//     } catch (err) {
//       console.error('❌ QueryContext: Error getting chat for inspection:', err);
//       return [];
//     }
//   };

//   const markChatMessagesRead = async (inspectionId, userId) => {
//     try {
//       await markMessagesAsRead(inspectionId, userId);
//       const updatedMessages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: updatedMessages
//       }));
      
//       // Dispatch event for real-time updates
//       window.dispatchEvent(new CustomEvent('messagesRead', {
//         detail: { inspectionId, userId }
//       }));
      
//       console.log('📖 QueryContext: Messages marked as read for inspection:', inspectionId);
//     } catch (err) {
//       console.error('❌ QueryContext: Error marking messages read:', err);
//     }
//   };

//   // Enhanced chat change listener that handles all chat events
//   const handleChatChange = (callback) => {
//     const eventHandler = (event) => {
//       console.log('🔔 QueryContext: Chat change event received:', event.detail);
//       callback(event.detail);
//     };

//     // Listen for multiple types of chat events
//     window.addEventListener('newChatMessage', eventHandler);
//     window.addEventListener('chatUpdated', eventHandler);
//     window.addEventListener('messagesRead', eventHandler);

//     // Return cleanup function
//     return () => {
//       window.removeEventListener('newChatMessage', eventHandler);
//       window.removeEventListener('chatUpdated', eventHandler);
//       window.removeEventListener('messagesRead', eventHandler);
//     };
//   };

//   // Initialize chat for inspection
//   const initializeInspectionChat = async (inspectionId, inspectorName, customerName) => {
//     try {
//       const existingMessages = getChatMessages(inspectionId);
      
//       // Only initialize if no messages exist
//       if (existingMessages.length === 0) {
//         const systemMessage = {
//           senderId: 'system',
//           senderName: 'System',
//           senderType: 'system',
//           message: `🎉 Inspection chat started! Inspector ${inspectorName} is now working with ${customerName}. Feel free to communicate throughout the inspection process.`,
//           type: 'system'
//         };

//         await sendMessage(inspectionId, systemMessage);
//         console.log('🆕 QueryContext: Chat initialized for inspection:', inspectionId);
//       }
//     } catch (err) {
//       console.error('❌ QueryContext: Error initializing chat:', err);
//     }
//   };

//   // Helper function to get chat statistics
//   const getChatStats = (inspectionId, userId) => {
//     try {
//       const messages = getChatForInspection(inspectionId);
//       const unreadCount = messages.filter(msg => 
//         msg.senderId !== userId && !msg.read
//       ).length;
      
//       return {
//         totalMessages: messages.length,
//         unreadCount,
//         lastMessage: messages.length > 0 ? messages[messages.length - 1] : null,
//         hasUnread: unreadCount > 0
//       };
//     } catch (err) {
//       console.error('❌ QueryContext: Error getting chat stats:', err);
//       return { totalMessages: 0, unreadCount: 0, lastMessage: null, hasUnread: false };
//     }
//   };

//   // ✅ NEW: Get all active chats for a user (customer or inspector)
//   const getActiveChats = (userId, userType) => {
//     try {
//       const activeInspections = userType === 'customer' 
//         ? queries.filter(q => q.status === 'In Progress' && q.confirmedInspectorId)
//         : getInspectorActiveInspections(userId);
      
//       return activeInspections.map(inspection => {
//         const inspectionId = inspection.id;
//         const chatStats = getChatStats(inspectionId, userId);
        
//         return {
//           inspectionId,
//           inspection,
//           chatStats,
//           lastActivity: chatStats.lastMessage?.timestamp || inspection.updatedAt
//         };
//       }).sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
//     } catch (err) {
//       console.error('❌ QueryContext: Error getting active chats:', err);
//       return [];
//     }
//   };

//   // ✅ NEW: Real-time message listener for notifications
//   const startMessageListener = (userId, userType, onNewMessage) => {
//     const handleNewMessage = (event) => {
//       const { message, inspectionId } = event.detail;
      
//       // Only notify if message is not from current user
//       if (message.senderId !== userId) {
//         console.log('🔔 New message received for user:', userId, message);
        
//         if (onNewMessage) {
//           onNewMessage({
//             inspectionId,
//             message,
//             unreadCount: getChatStats(inspectionId, userId).unreadCount
//           });
//         }
        
//         // Show browser notification if supported
//         if ('Notification' in window && Notification.permission === 'granted') {
//           new Notification(`New message from ${message.senderName}`, {
//             body: message.message,
//             icon: '/favicon.ico'
//           });
//         }
//       }
//     };

//     window.addEventListener('newChatMessage', handleNewMessage);
    
//     return () => {
//       window.removeEventListener('newChatMessage', handleNewMessage);
//     };
//   };

//   // ✅ NEW: Get customer's active inspections with chat capability
//   const getCustomerActiveInspections = () => {
//     try {
//       const currentCustomerId = getCurrentCustomerId();
      
//       // Filter queries that are "In Progress" (have confirmed inspector)
//       const inspections = queries.filter(query => 
//         query.status === 'In Progress' && 
//         query.confirmedInspectorId &&
//         (query.email === 'current-customer@example.com' || query.status === 'In Progress') // Demo filter
//       );

//       // Transform to inspection format with chat info
//       return inspections.map(query => {
//         const confirmedBid = query.bids?.find(bid => bid.id === query.confirmedBidId);
//         const chatStats = getChatStats(query.id, currentCustomerId);
        
//         return {
//           id: query.id,
//           inspectionId: query.id,
//           queryId: query.id,
//           queryTitle: `${query.commodityDisplay || query.commodity} Quality Assessment`,
//           commodity: query.commodity,
//           location: query.locationDisplay || `${query.location}, ${query.country}`,
//           amount: confirmedBid?.amount || 0,
//           price: confirmedBid?.amount || 0,
//           inspectorId: query.confirmedInspectorId,
//           inspectorName: confirmedBid?.inspectorName || 'Inspector',
//           inspectorCompany: confirmedBid?.company || 'Inspection Company',
//           inspectorRating: confirmedBid?.rating || 4.5,
//           startedAt: query.confirmedAt || query.updatedAt,
//           estimatedCompletion: confirmedBid?.proposedTimeline || '2-3 days',
//           status: 'In Progress',
//           volume: query.volumeDisplay || `${query.volume} ${query.unit}`,
//           urgency: query.urgency,
//           customerName: query.contactPerson || 'Customer',
//           // Chat info
//           unreadMessages: chatStats.unreadCount,
//           lastMessage: chatStats.lastMessage,
//           hasUnread: chatStats.unreadCount > 0
//         };
//       });
//     } catch (err) {
//       console.error('❌ QueryContext: Error getting customer active inspections:', err);
//       return [];
//     }
//   };

//   // ✅ NEW: Auto-refresh chat messages periodically
//   const startChatAutoRefresh = (inspectionId, intervalMs = 10000) => {
//     const interval = setInterval(() => {
//       const updatedMessages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: updatedMessages
//       }));
//     }, intervalMs);

//     return () => clearInterval(interval);
//   };

//   // ✅ NEW: Send typing indicator
//   const sendTypingIndicator = (inspectionId, userId, isTyping) => {
//     window.dispatchEvent(new CustomEvent('userTyping', {
//       detail: { inspectionId, userId, isTyping }
//     }));
//   };

//   // ✅ NEW: Listen for typing indicators
//   const onUserTyping = (callback) => {
//     const handler = (event) => callback(event.detail);
//     window.addEventListener('userTyping', handler);
//     return () => window.removeEventListener('userTyping', handler);
//   };

//   // ✅ NEW: Bulk mark all messages as read for user
//   const markAllMessagesRead = async (userId) => {
//     try {
//       const activeChats = getActiveChats(userId, 'customer'); // or 'inspector'
      
//       for (const chat of activeChats) {
//         if (chat.chatStats.unreadCount > 0) {
//           await markChatMessagesRead(chat.inspectionId, userId);
//         }
//       }
      
//       console.log('📖 All messages marked as read for user:', userId);
//     } catch (err) {
//       console.error('❌ Error marking all messages as read:', err);
//     }
//   };

//   // ✅ NEW: Debug functions for testing
//   const debugFunctions = {
//     // Force create a test notification
//     createTestNotification: () => {
//       const testData = {
//         type: 'bid_confirmed',
//         queryId: 'TEST-QUERY-123',
//         bidId: 'TEST-BID-456',
//         queryTitle: 'Test Rice Inspection',
//         location: 'Test Location, India',
//         amount: 750,
//         customerName: 'Test Customer',
//         bidDetails: {
//           inspectorName: 'Test Inspector',
//           company: 'Test Company',
//           proposedTimeline: '2 days',
//           rating: 4.8,
//           experience: '5 years'
//         }
//       };
      
//       return createNotification(getCurrentInspectorId(), testData);
//     },
    
//     // Test event dispatch
//     testEventDispatch: () => {
//       const testData = {
//         type: 'bid_confirmed',
//         inspectorId: getCurrentInspectorId(),
//         queryId: 'TEST-QUERY-123',
//         bidId: 'TEST-BID-456',
//         queryTitle: 'Test Rice Inspection',
//         location: 'Test Location, India',
//         amount: 750,
//         customerName: 'Test Customer',
//         bidDetails: {
//           inspectorName: 'Test Inspector',
//           company: 'Test Company',
//           proposedTimeline: '2 days',
//           rating: 4.8,
//           experience: '5 years'
//         }
//       };
      
//       window.dispatchEvent(new CustomEvent('bidConfirmed', {
//         detail: testData
//       }));
      
//       console.log('🧪 Test event dispatched:', testData);
//     },
    
//     // Get current inspector ID
//     getCurrentInspectorId,
    
//     // Get all notifications
//     getAllNotifications: () => notifications,
    
//     // Force refresh
//     forceRefresh: () => {
//       loadQueries();
//       loadNotifications();
//     }
//   };

//   // Context value with all functions and state
//   const value = {
//     // State
//     queries,
//     loading,
//     error,
//     notifications,
//     chatMessages,

//     // Query functions
//     submitQuery,
//     placeBid,
//     confirmInspector,
//     updateStatus,
//     loadQueries,
//     refreshQueries,
//     getActiveQueriesForInspector,
//     getActiveInspectionsForInspector,
//     getCustomerQueries,
//     getQuery,
//     getQueryStats,

//     // Notification functions
//     markNotificationRead,
//     createNotification,
//     getUnreadNotificationCount,

//     // Utility functions
//     getCurrentInspectorId,
//     getCurrentCustomerId,
//     clearError: () => setError(null),

//     // =====================
//     // CHAT FUNCTIONS
//     // =====================
    
//     // Core chat functions
//     sendMessage,
//     loadChatMessages,
//     getChatForInspection,
//     markChatMessagesRead,
//     onChatChange: handleChatChange,
    
//     // Additional chat functions
//     initializeInspectionChat,
//     getChatStats,
//     getActiveChats,
//     startMessageListener,
//     getCustomerActiveInspections,
//     startChatAutoRefresh,
//     sendTypingIndicator,
//     onUserTyping,
//     markAllMessagesRead,
    
//     // ✅ Debug functions (remove in production)
//     debug: debugFunctions
//   };

//   useEffect(() => {
//     window.queryContext = value;
//     return () => {
//       delete window.queryContext;
//     };
//   }, [value]);

//   return (
//     <QueryContext.Provider value={value}>
//       {children}
//     </QueryContext.Provider>
//   );
// };

// export default QueryContext;


// import { createContext, useContext, useState, useEffect } from 'react';
// import {
//   saveQuery,
//   getAllQueries,
//   getActiveQueries,
//   updateQueryStatus,
//   addBidToQuery,
//   getQueryById,
//   formatQueryForDisplay,
//   onQueriesChange,
//   confirmInspectorForQuery,
//   getInspectorActiveInspections,
//   getInspectorNotifications,
//   markNotificationAsRead,
//   getChatMessages,
//   sendChatMessage,
//   markMessagesAsRead,
//   onChatChange,
//   createInspectorNotification
// } from '../utils/queryStorage';

// // Create the context
// const QueryContext = createContext();

// // Custom hook
// export const useQuery = () => {
//   const context = useContext(QueryContext);
//   if (!context) {
//     throw new Error('useQuery must be used within a QueryProvider');
//   }
//   return context;
// };

// // Provider
// export const QueryProvider = ({ children }) => {
//   const [queries, setQueries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [chatMessages, setChatMessages] = useState({});

//   useEffect(() => {
//     loadQueries();
//     loadNotifications();

//     // Listen for queries changes
//     const unsubscribeQueries = onQueriesChange((changeEvent) => {
//       console.log('QueryContext: Queries changed:', changeEvent);
//       loadQueries();
//       loadNotifications();
//     });

//     // Listen for chat changes
//     const unsubscribeChat = onChatChange((eventData) => {
//       console.log('QueryContext: Chat changed:', eventData);
//       if (eventData.inspectionId) {
//         // Update chat messages for the specific inspection
//         const updatedMessages = getChatMessages(eventData.inspectionId);
//         setChatMessages(prev => ({
//           ...prev,
//           [eventData.inspectionId]: updatedMessages
//         }));
//       }
//     });

//     // ❌ REMOVED: Duplicate bid confirmed event listener
//     // The inspector bidding room will handle the event directly
//     // The customer component will call confirmInspector directly

//     // Periodic refresh for real-time updates
//     const interval = setInterval(() => {
//       loadQueries();
//       loadNotifications();
//     }, 10000);

//     return () => {
//       clearInterval(interval);
//       if (unsubscribeQueries) unsubscribeQueries();
//       if (unsubscribeChat) unsubscribeChat();
//     };
//   }, []);

//   const loadQueries = () => {
//     try {
//       setLoading(true);
//       const allQueries = getAllQueries();
//       setQueries(allQueries);
//       setError(null);
//       console.log('QueryContext: Loaded queries:', allQueries.length);
//     } catch (err) {
//       setError('Failed to load queries');
//       console.error('QueryContext: Error loading queries:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadNotifications = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const inspectorNotifications = getInspectorNotifications(currentInspectorId);
//       setNotifications(inspectorNotifications);
//       console.log('QueryContext: Loaded notifications:', inspectorNotifications.length);
//     } catch (err) {
//       console.error('QueryContext: Error loading notifications:', err);
//     }
//   };

//   const getCurrentInspectorId = () => {
//     // In a real app, this would come from auth context
//     return 'inspector-001';
//   };

//   const getCurrentCustomerId = () => {
//     // In a real app, this would come from auth context
//     return 'customer-001';
//   };

//   const submitQuery = async (queryData) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const transformedData = {
//         location: queryData.location,
//         country: queryData.country,
//         commodity: queryData.commodity,
//         subCommodity: queryData.subCommodity,
//         riceType: queryData.riceType,
//         volume: queryData.volume,
//         unit: queryData.unit,
//         urgency: queryData.urgency,
//         inspectionDateType: queryData.inspectionDateType,
//         inspectionDate: queryData.inspectionDate,
//         inspectionDateFrom: queryData.inspectionDateFrom,
//         inspectionDateTo: queryData.inspectionDateTo,
//         description: queryData.description,
//         companyName: queryData.companyName,
//         contactPerson: queryData.contactPerson,
//         email: queryData.email,
//         phone: queryData.phone,
//         expectedBudget: queryData.expectedBudget,
//         selectedCertifications: queryData.selectedCertifications || [],
//         inspectionTypes: queryData.inspectionTypes || []
//       };

//       console.log('QueryContext: Submitting query:', transformedData);
//       const newQuery = saveQuery(transformedData);
//       loadQueries();
//       return newQuery;
//     } catch (err) {
//       setError('Failed to submit query');
//       console.error('QueryContext: Error submitting query:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getActiveQueriesForInspector = () => {
//     try {
//       const activeQueries = getActiveQueries();
//       return activeQueries.map(query => formatQueryForDisplay(query));
//     } catch (err) {
//       console.error('QueryContext: Error getting active queries:', err);
//       return [];
//     }
//   };

//   const getCustomerQueries = (customerEmail) => {
//     try {
//       const customerQueries = queries.filter(q => q.email === customerEmail);
//       return customerQueries.map(query => formatQueryForDisplay(query));
//     } catch (err) {
//       console.error('QueryContext: Error getting customer queries:', err);
//       return [];
//     }
//   };

//   const placeBid = async (queryId, bidData) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // ✅ Enhanced bid data with inspector ID
//       const enhancedBidData = {
//         ...bidData,
//         inspectorId: bidData.inspectorId || getCurrentInspectorId(),
//         submittedAt: new Date().toISOString(),
//         status: 'pending'
//       };
      
//       console.log('QueryContext: Placing bid with data:', enhancedBidData);
      
//       const updatedQuery = addBidToQuery(queryId, enhancedBidData);
//       if (updatedQuery) {
//         loadQueries();
//         return updatedQuery;
//       } else {
//         throw new Error('Query not found');
//       }
//     } catch (err) {
//       setError('Failed to place bid');
//       console.error('QueryContext: Error placing bid:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ UPDATED: This function now handles BOTH the confirmation AND the notification
//   // const confirmInspector = async (queryId, bidId, inspectorId) => {
//   //   try {
//   //     setLoading(true);
//   //     setError(null);
      
//   //     console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
      
//   //     if (!queryId || !bidId || !inspectorId) {
//   //       throw new Error('Missing required parameters');
//   //     }
      
//   //     // ✅ This function in queryStorage.js already creates the notification
//   //     // No need for separate event dispatching
//   //     const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
//   //     if (!updatedQuery) {
//   //       throw new Error('Query or bid not found');
//   //     }
      
//   //     console.log('✅ QueryContext: Inspector confirmed successfully');
      
//   //     // Refresh data
//   //     loadQueries();
//   //     loadNotifications(); // This will load the newly created notification
      
//   //     return updatedQuery;
//   //   } catch (err) {
//   //     setError(`Failed to confirm inspector: ${err.message}`);
//   //     console.error('❌ QueryContext: Error confirming inspector:', err);
//   //     throw err;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   // Fixed confirmInspector function in QueryContext

// // const confirmInspector = async (queryId, bidId, inspectorId) => {
// //   try {
// //     setLoading(true);
// //     setError(null);
    
// //     console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
    
// //     if (!queryId || !bidId || !inspectorId) {
// //       throw new Error('Missing required parameters');
// //     }
    
// //     // ✅ CRITICAL FIX: Properly update query status and confirmed fields
// //     const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
// //     if (!updatedQuery) {
// //       throw new Error('Query or bid not found');
// //     }

// //     // 🔥 KEY FIX: Ensure the query status is updated to "In Progress"
// //     const finalQuery = updateQueryStatus(queryId, 'In Progress');
    
// //     console.log('✅ QueryContext: Inspector confirmed successfully. Final query:', finalQuery);
    
// //     // Refresh data
// //     loadQueries();
// //     loadNotifications();
    
// //     return finalQuery;
// //   } catch (err) {
// //     setError(`Failed to confirm inspector: ${err.message}`);
// //     console.error('❌ QueryContext: Error confirming inspector:', err);
// //     throw err;
// //   } finally {
// //     setLoading(false);
// //   }
// // };



// const confirmInspector = async (queryId, bidId, inspectorId) => {
//   try {
//     setLoading(true);
//     setError(null);
    
//     console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
    
//     if (!queryId || !bidId || !inspectorId) {
//       throw new Error('Missing required parameters');
//     }
    
//     // ✅ STEP 1: Update query status to "In Progress" and set confirmed fields
//     const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
//     if (!updatedQuery) {
//       throw new Error('Query or bid not found');
//     }

//     // ✅ STEP 2: Ensure status is "In Progress" 
//     const finalQuery = updateQueryStatus(queryId, 'In Progress');
    
//     // ✅ STEP 3: Create notification for inspector
//     const bid = updatedQuery.bids?.find(b => b.id === bidId);
//     if (bid) {
//       const notificationData = {
//         type: 'bid_confirmed',
//         queryId: queryId,
//         bidId: bidId,
//         queryTitle: updatedQuery.commodityDisplay || updatedQuery.commodity || 'Inspection Request',
//         location: updatedQuery.locationDisplay || `${updatedQuery.location}, ${updatedQuery.country}`,
//         amount: bid.amount,
//         customerName: updatedQuery.contactPerson || 'Customer',
//         bidDetails: {
//           inspectorName: bid.inspectorName,
//           company: bid.company,
//           proposedTimeline: bid.proposedTimeline || bid.estimatedDuration,
//           rating: bid.rating,
//           experience: bid.experience
//         }
//       };
      
//       await createNotification(inspectorId, notificationData);
//       console.log('✅ Notification created for inspector:', inspectorId);
//     }
    
//     // ✅ STEP 4: Dispatch event for real-time updates
//     window.dispatchEvent(new CustomEvent('bidConfirmed', {
//       detail: {
//         queryId,
//         bidId,
//         inspectorId,
//         queryTitle: updatedQuery.commodityDisplay || updatedQuery.commodity,
//         location: updatedQuery.locationDisplay || `${updatedQuery.location}, ${updatedQuery.country}`,
//         amount: bid?.amount,
//         customerName: updatedQuery.contactPerson || 'Customer'
//       }
//     }));
    
//     console.log('✅ QueryContext: Inspector confirmed successfully');
    
//     // Refresh data
//     loadQueries();
//     loadNotifications();
    
//     return finalQuery;
//   } catch (err) {
//     setError(`Failed to confirm inspector: ${err.message}`);
//     console.error('❌ QueryContext: Error confirming inspector:', err);
//     throw err;
//   } finally {
//     setLoading(false);
//   }
// };


//   const getActiveInspectionsForInspector = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const activeInspections = getInspectorActiveInspections(currentInspectorId);
//       return activeInspections.map(q => formatQueryForDisplay(q));
//     } catch (err) {
//       console.error('QueryContext: Error getting active inspections:', err);
//       return [];
//     }
//   };

//   const markNotificationRead = async (notificationId) => {
//     try {
//       console.log('📖 QueryContext: Marking notification as read:', notificationId);
//       markNotificationAsRead(notificationId);
//       loadNotifications();
//     } catch (err) {
//       console.error('QueryContext: Error marking notification as read:', err);
//     }
//   };

//   const updateStatus = async (queryId, newStatus) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedQuery = updateQueryStatus(queryId, newStatus);
//       if (updatedQuery) {
//         loadQueries();
//         return updatedQuery;
//       } else {
//         throw new Error('Query not found');
//       }
//     } catch (err) {
//       setError('Failed to update status');
//       console.error('QueryContext: Error updating status:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getQuery = (queryId) => {
//     try {
//       const query = getQueryById(queryId);
//       return query ? formatQueryForDisplay(query) : null;
//     } catch (err) {
//       console.error('QueryContext: Error getting query:', err);
//       return null;
//     }
//   };

//   const getQueryStats = () => {
//     try {
//       const totalQueries = queries.length;
//       const active = queries.filter(q => q.status === 'Active').length;
//       const completed = queries.filter(q => q.status === 'Completed').length;
//       const inProgress = queries.filter(q => q.status === 'In Progress').length;
//       return { total: totalQueries, active, completed, inProgress };
//     } catch (err) {
//       console.error('QueryContext: Error getting stats:', err);
//       return { total: 0, active: 0, completed: 0, inProgress: 0 };
//     }
//   };

//   const refreshQueries = () => {
//     console.log('QueryContext: Manual refresh triggered');
//     loadQueries();
//     loadNotifications();
//   };

//   // ✅ NEW: Create notification function
//   const createNotification = async (inspectorId, notificationData) => {
//     try {
//       console.log('🔔 QueryContext: Creating notification for inspector:', inspectorId);
//       console.log('📋 Notification data:', notificationData);
      
//       const notification = createInspectorNotification(inspectorId, notificationData);
      
//       // Refresh notifications
//       loadNotifications();
      
//       console.log('✅ QueryContext: Notification created successfully:', notification.id);
//       return notification;
//     } catch (error) {
//       console.error('❌ QueryContext: Error creating notification:', error);
//       throw error;
//     }
//   };

//   // ✅ NEW: Get unread notification count
//   const getUnreadNotificationCount = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const unreadCount = notifications.filter(n => 
//         n.inspectorId === currentInspectorId && !n.read
//       ).length;
//       return unreadCount;
//     } catch (error) {
//       console.error('QueryContext: Error getting unread notification count:', error);
//       return 0;
//     }
//   };

//   // =====================
//   // CHAT FUNCTIONALITY
//   // =====================

//   const sendMessage = async (inspectionId, messageData) => {
//     try {
//       console.log('📤 QueryContext: Sending message:', { inspectionId, messageData });
      
//       const newMessage = await sendChatMessage(inspectionId, messageData);
      
//       // Update local state immediately for better UX
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: [...(prev[inspectionId] || []), newMessage]
//       }));

//       // Dispatch multiple events for real-time updates
//     //   window.dispatchEvent(new CustomEvent('chatUpdated', {
//     //   detail: { 
//     //     inspectionId, 
//     //     message: newMessage,
//     //     type: 'new_message'
//     //   }
//     // }));


//     const eventDetail = { 
//       inspectionId, 
//       message: newMessage,
//       senderId: messageData.senderId,
//       senderType: messageData.senderType,
//       timestamp: new Date().toISOString()
//     };


//       // Specific event for new messages
//     //   window.dispatchEvent(new CustomEvent('newChatMessage', {
//     //   detail: { 
//     //     inspectionId, 
//     //     message: newMessage,
//     //     senderId: messageData.senderId,
//     //     senderType: messageData.senderType,
//     //     timestamp: new Date().toISOString()
//     //   }
//     // }));

//     window.dispatchEvent(new CustomEvent('chatUpdated', { detail: eventDetail }));
//     window.dispatchEvent(new CustomEvent('newChatMessage', { detail: eventDetail }));


//      if (typeof BroadcastChannel !== 'undefined') {
//       const channel = new BroadcastChannel('inspection-chat');
//       channel.postMessage({
//         type: 'NEW_MESSAGE',
//         data: eventDetail
//       });
//     }

//       console.log('✅ QueryContext: Message sent successfully:', newMessage.id);
//       return newMessage;
//     } catch (err) {
//       console.error('❌ QueryContext: Error sending message:', err);
//       throw err;
//     }
//   };

//   const loadChatMessages = (inspectionId) => {
//     try {
//       console.log('🔄 QueryContext: Loading chat messages for inspection:', inspectionId);
//       const messages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: messages
//       }));
//       console.log('📋 QueryContext: Loaded', messages.length, 'messages for inspection:', inspectionId);
//       return messages;
//     } catch (err) {
//       console.error('❌ QueryContext: Error loading chat messages:', err);
//       return [];
//     }
//   };

//   const getChatForInspection = (inspectionId) => {
//     try {
//       // First try to get from local state
//       if (chatMessages[inspectionId]) {
//         return chatMessages[inspectionId];
//       }
      
//       // If not in state, load from storage
//       const messages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: messages
//       }));
      
//       return messages;
//     } catch (err) {
//       console.error('❌ QueryContext: Error getting chat for inspection:', err);
//       return [];
//     }
//   };

//   const markChatMessagesRead = async (inspectionId, userId) => {
//     try {
//       await markMessagesAsRead(inspectionId, userId);
//       const updatedMessages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: updatedMessages
//       }));
      
//       // Dispatch event for real-time updates
//       window.dispatchEvent(new CustomEvent('messagesRead', {
//         detail: { inspectionId, userId }
//       }));
      
//       console.log('📖 QueryContext: Messages marked as read for inspection:', inspectionId);
//     } catch (err) {
//       console.error('❌ QueryContext: Error marking messages read:', err);
//     }
//   };


//   const setupCrossTabCommunication = () => {
//   if (typeof BroadcastChannel !== 'undefined') {
//     const channel = new BroadcastChannel('inspection-chat');
    
//     channel.onmessage = (event) => {
//       const { type, data } = event.data;
      
//       if (type === 'NEW_MESSAGE') {
//         console.log('🔄 Cross-tab message received:', data);
        
//         // Update local state
//         setChatMessages(prev => {
//           const existing = prev[data.inspectionId] || [];
//           const messageExists = existing.some(msg => msg.id === data.message.id);
          
//           if (!messageExists) {
//             return {
//               ...prev,
//               [data.inspectionId]: [...existing, data.message]
//             };
//           }
//           return prev;
//         });
        
//         // Dispatch local event
//         window.dispatchEvent(new CustomEvent('newChatMessage', { detail: data }));
//       }
//     };
//     return()=>channel.close()
//   }
//   return ()=>{}
// }

//   // Enhanced chat change listener that handles all chat events
//   const handleChatChange = (callback) => {
//     const eventHandler = (event) => {
//       console.log('🔔 QueryContext: Chat change event received:', event.detail);
//       callback(event.detail);
//     };

//     // Listen for multiple types of chat events
//     window.addEventListener('newChatMessage', eventHandler);
//     window.addEventListener('chatUpdated', eventHandler);
//     window.addEventListener('messagesRead', eventHandler);

//     // Return cleanup function
//     return () => {
//       window.removeEventListener('newChatMessage', eventHandler);
//       window.removeEventListener('chatUpdated', eventHandler);
//       window.removeEventListener('messagesRead', eventHandler);
//     };
//   };

//   // Initialize chat for inspection
//   const initializeInspectionChat = async (inspectionId, inspectorName, customerName) => {
//     try {
//       const existingMessages = getChatMessages(inspectionId);
      
//       // Only initialize if no messages exist
//       if (existingMessages.length === 0) {
//         const systemMessage = {
//           senderId: 'system',
//           senderName: 'System',
//           senderType: 'system',
//           message: `🎉 Inspection chat started! Inspector ${inspectorName} is now working with ${customerName}. Feel free to communicate throughout the inspection process.`,
//           type: 'system'
//         };

//         await sendMessage(inspectionId, systemMessage);
//         console.log('🆕 QueryContext: Chat initialized for inspection:', inspectionId);
//       }
//     } catch (err) {
//       console.error('❌ QueryContext: Error initializing chat:', err);
//     }
//   };

//   // Helper function to get chat statistics
//   const getChatStats = (inspectionId, userId) => {
//     try {
//       const messages = getChatForInspection(inspectionId);
//       const unreadCount = messages.filter(msg => 
//         msg.senderId !== userId && !msg.read
//       ).length;
      
//       return {
//         totalMessages: messages.length,
//         unreadCount,
//         lastMessage: messages.length > 0 ? messages[messages.length - 1] : null,
//         hasUnread: unreadCount > 0
//       };
//     } catch (err) {
//       console.error('❌ QueryContext: Error getting chat stats:', err);
//       return { totalMessages: 0, unreadCount: 0, lastMessage: null, hasUnread: false };
//     }
//   };

//   // ✅ NEW: Get all active chats for a user (customer or inspector)
//   const getActiveChats = (userId, userType) => {
//     try {
//       const activeInspections = userType === 'customer' 
//         ? queries.filter(q => q.status === 'In Progress' && q.confirmedInspectorId)
//         : getInspectorActiveInspections(userId);
      
//       return activeInspections.map(inspection => {
//         const inspectionId = inspection.id;
//         const chatStats = getChatStats(inspectionId, userId);
        
//         return {
//           inspectionId,
//           inspection,
//           chatStats,
//           lastActivity: chatStats.lastMessage?.timestamp || inspection.updatedAt
//         };
//       }).sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
//     } catch (err) {
//       console.error('❌ QueryContext: Error getting active chats:', err);
//       return [];
//     }
//   };

//   // ✅ NEW: Real-time message listener for notifications
//   const startMessageListener = (userId, userType, onNewMessage) => {
//     const handleNewMessage = (event) => {
//       const { message, inspectionId } = event.detail;
      
//       // Only notify if message is not from current user
//       if (message.senderId !== userId) {
//         console.log('🔔 New message received for user:', userId, message);
        
//         if (onNewMessage) {
//           onNewMessage({
//             inspectionId,
//             message,
//             unreadCount: getChatStats(inspectionId, userId).unreadCount
//           });
//         }
        
//         // Show browser notification if supported
//         if ('Notification' in window && Notification.permission === 'granted') {
//           new Notification(`New message from ${message.senderName}`, {
//             body: message.message,
//             icon: '/favicon.ico'
//           });
//         }
//       }
//     };

//     window.addEventListener('newChatMessage', handleNewMessage);
    
//     return () => {
//       window.removeEventListener('newChatMessage', handleNewMessage);
//     };
//   };

//   // ✅ NEW: Get customer's active inspections with chat capability
//   // const getCustomerActiveInspections = () => {
//   //   try {
//   //     const currentCustomerId = getCurrentCustomerId();
      
//   //     // Filter queries that are "In Progress" (have confirmed inspector)
//   //     const inspections = queries.filter(query => 
//   //       query.status === 'In Progress' && 
//   //       query.confirmedInspectorId &&
//   //       (query.email === 'current-customer@example.com' || query.status === 'In Progress') // Demo filter
//   //     );

//   //     // Transform to inspection format with chat info
//   //     return inspections.map(query => {
//   //       const confirmedBid = query.bids?.find(bid => bid.id === query.confirmedBidId);
//   //       const chatStats = getChatStats(query.id, currentCustomerId);
        
//   //       return {
//   //         id: query.id,
//   //         inspectionId: query.id,
//   //         queryId: query.id,
//   //         queryTitle: `${query.commodityDisplay || query.commodity} Quality Assessment`,
//   //         commodity: query.commodity,
//   //         location: query.locationDisplay || `${query.location}, ${query.country}`,
//   //         amount: confirmedBid?.amount || 0,
//   //         price: confirmedBid?.amount || 0,
//   //         inspectorId: query.confirmedInspectorId,
//   //         inspectorName: confirmedBid?.inspectorName || 'Inspector',
//   //         inspectorCompany: confirmedBid?.company || 'Inspection Company',
//   //         inspectorRating: confirmedBid?.rating || 4.5,
//   //         startedAt: query.confirmedAt || query.updatedAt,
//   //         estimatedCompletion: confirmedBid?.proposedTimeline || '2-3 days',
//   //         status: 'In Progress',
//   //         volume: query.volumeDisplay || `${query.volume} ${query.unit}`,
//   //         urgency: query.urgency,
//   //         customerName: query.contactPerson || 'Customer',
//   //         // Chat info
//   //         unreadMessages: chatStats.unreadCount,
//   //         lastMessage: chatStats.lastMessage,
//   //         hasUnread: chatStats.unreadCount > 0
//   //       };
//   //     });
//   //   } catch (err) {
//   //     console.error('❌ QueryContext: Error getting customer active inspections:', err);
//   //     return [];
//   //   }
//   // };



//   // Fixed QueryContext.js - Add this method to properly filter active inspections

// // ✅ FIXED: getCustomerActiveInspections - Only show CONFIRMED inspections
// // const getCustomerActiveInspections = () => {
// //   try {
// //     const currentCustomerId = getCurrentCustomerId();
    
// //     // 🔥 KEY FIX: Only return queries that have BOTH confirmed inspector AND are In Progress
// //     const inspections = queries.filter(query => {
// //       // Must have confirmed inspector ID (bid was accepted)
// //       const hasConfirmedInspector = query.confirmedInspectorId && query.confirmedBidId;
      
// //       // Must be in "In Progress" status (not just "Active")
// //       const isInProgress = query.status === 'In Progress';
      
// //       // Must belong to current customer (in real app, use proper customer ID)
// //       const belongsToCustomer = query.email === 'current-customer@example.com' || query.status === 'In Progress';
      
// //       console.log(`🔍 Query ${query.id} check:`, {
// //         hasConfirmedInspector,
// //         isInProgress,
// //         belongsToCustomer,
// //         confirmedInspectorId: query.confirmedInspectorId,
// //         status: query.status
// //       });
      
// //       return hasConfirmedInspector && isInProgress && belongsToCustomer;
// //     });

// //     // Transform to inspection format with chat info
// //     return inspections.map(query => {
// //       const confirmedBid = query.bids?.find(bid => bid.id === query.confirmedBidId);
// //       const chatStats = getChatStats(query.id, currentCustomerId);
      
// //       return {
// //         id: query.id,
// //         inspectionId: query.id,
// //         queryId: query.id,
// //         queryTitle: `${query.commodityDisplay || query.commodity} Quality Assessment`,
// //         commodity: query.commodity,
// //         location: query.locationDisplay || `${query.location}, ${query.country}`,
// //         amount: confirmedBid?.amount || 0,
// //         price: confirmedBid?.amount || 0,
// //         inspectorId: query.confirmedInspectorId,
// //         inspectorName: confirmedBid?.inspectorName || 'Inspector',
// //         inspectorCompany: confirmedBid?.company || 'Inspection Company',
// //         inspectorRating: confirmedBid?.rating || 4.5,
// //         startedAt: query.confirmedAt || query.updatedAt,
// //         estimatedCompletion: confirmedBid?.proposedTimeline || '2-3 days',
// //         status: 'In Progress',
// //         volume: query.volumeDisplay || `${query.volume} ${query.unit}`,
// //         urgency: query.urgency,
// //         customerName: query.contactPerson || 'Customer',
// //         // Chat info
// //         unreadMessages: chatStats.unreadCount,
// //         lastMessage: chatStats.lastMessage,
// //         hasUnread: chatStats.unreadCount > 0
// //       };
// //     });
// //   } catch (err) {
// //     console.error('❌ QueryContext: Error getting customer active inspections:', err);
// //     return [];
// //   }
// // };


// // const getCustomerActiveInspections = () => {
// //   const confirmedInspections = queries.filter(query => {
// //     return query.confirmedInspectorId && 
// //            query.confirmedBidId && 
// //            query.status === 'In Progress';
// //   });
  
// //   return confirmedInspections.map(query => {
// //     const confirmedBid = query.bids?.find(bid => bid.id === query.confirmedBidId);
// //     return {
// //       id: query.id,
// //       inspectionId: query.id,
// //       queryTitle: `${query.commodity} Quality Assessment`,
// //       customerName: query.contactPerson,
// //       inspectorName: confirmedBid?.inspectorName,
// //       amount: confirmedBid?.amount,
// //       location: query.location,
// //       // ... other fields you need
// //     };
// //   });
// // };


// // ✅ REPLACE this function in QueryContext.js
// const getCustomerActiveInspections = () => {
//   try {
//     const currentCustomerId = getCurrentCustomerId();
    
//     // ✅ Filter for customer's confirmed inspections
//     const confirmedInspections = queries.filter(query => {
//       const isConfirmed = query.confirmedInspectorId && query.confirmedBidId;
//       const isInProgress = query.status === 'In Progress';
      
//       // ✅ ADD: Filter by current customer 
//       const belongsToCustomer = query.email === 'current-customer@example.com' || 
//                                query.customerId === currentCustomerId ||
//                                isInProgress; // For demo, show all In Progress
      
//       return isConfirmed && isInProgress && belongsToCustomer;
//     });

//     return confirmedInspections.map(query => {
//       const confirmedBid = query.bids?.find(bid => bid.id === query.confirmedBidId);
//       const chatStats = getChatStats(query.id, currentCustomerId);
      
//       return {
//         id: query.id,
//         inspectionId: query.id,
//         queryId: query.id,
//         queryTitle: `${query.commodityDisplay || query.commodity} Quality Assessment`,
//         commodity: query.commodity,
//         location: query.locationDisplay || `${query.location}, ${query.country}`,
//         amount: confirmedBid?.amount || 0,
//         inspectorId: query.confirmedInspectorId,
//         inspectorName: confirmedBid?.inspectorName || 'Inspector',
//         inspectorCompany: confirmedBid?.company || 'Inspection Company',
//         inspectorRating: confirmedBid?.rating || 4.5,
//         startedAt: query.confirmedAt || query.updatedAt,
//         estimatedCompletion: confirmedBid?.proposedTimeline || '2-3 days',
//         status: 'In Progress',
//         volume: query.volumeDisplay || `${query.volume} ${query.unit}`,
//         urgency: query.urgency,
//         customerName: query.contactPerson || 'Customer',
//         // ✅ CHAT INFO
//         unreadMessages: chatStats.unreadCount || 0,
//         lastMessage: chatStats.lastMessage,
//         hasUnread: (chatStats.unreadCount || 0) > 0
//       };
//     });
//   } catch (err) {
//     console.error('❌ Error getting customer active inspections:', err);
//     return [];
//   }
// };


//   // ✅ NEW: Auto-refresh chat messages periodically
//   const startChatAutoRefresh = (inspectionId, intervalMs = 10000) => {
//     const interval = setInterval(() => {
//       const updatedMessages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: updatedMessages
//       }));
//     }, intervalMs);

//     return () => clearInterval(interval);
//   };

//   // ✅ NEW: Send typing indicator
//   const sendTypingIndicator = (inspectionId, userId, isTyping) => {
//     window.dispatchEvent(new CustomEvent('userTyping', {
//       detail: { inspectionId, userId, isTyping }
//     }));
//   };

//   // ✅ NEW: Listen for typing indicators
//   const onUserTyping = (callback) => {
//     const handler = (event) => callback(event.detail);
//     window.addEventListener('userTyping', handler);
//     return () => window.removeEventListener('userTyping', handler);
//   };

//   // ✅ NEW: Bulk mark all messages as read for user
//   const markAllMessagesRead = async (userId) => {
//     try {
//       const activeChats = getActiveChats(userId, 'customer'); // or 'inspector'
      
//       for (const chat of activeChats) {
//         if (chat.chatStats.unreadCount > 0) {
//           await markChatMessagesRead(chat.inspectionId, userId);
//         }
//       }
      
//       console.log('📖 All messages marked as read for user:', userId);
//     } catch (err) {
//       console.error('❌ Error marking all messages as read:', err);
//     }
//   };

//   // ✅ NEW: Debug functions for testing
//   const debugFunctions = {
//     // Force create a test notification
//     createTestNotification: () => {
//       const testData = {
//         type: 'bid_confirmed',
//         queryId: 'TEST-QUERY-123',
//         bidId: 'TEST-BID-456',
//         queryTitle: 'Test Rice Inspection',
//         location: 'Test Location, India',
//         amount: 750,
//         customerName: 'Test Customer',
//         bidDetails: {
//           inspectorName: 'Test Inspector',
//           company: 'Test Company',
//           proposedTimeline: '2 days',
//           rating: 4.8,
//           experience: '5 years'
//         }
//       };
      
//       return createNotification(getCurrentInspectorId(), testData);
//     },
    
//     // Test event dispatch
//     testEventDispatch: () => {
//       const testData = {
//         type: 'bid_confirmed',
//         inspectorId: getCurrentInspectorId(),
//         queryId: 'TEST-QUERY-123',
//         bidId: 'TEST-BID-456',
//         queryTitle: 'Test Rice Inspection',
//         location: 'Test Location, India',
//         amount: 750,
//         customerName: 'Test Customer',
//         bidDetails: {
//           inspectorName: 'Test Inspector',
//           company: 'Test Company',
//           proposedTimeline: '2 days',
//           rating: 4.8,
//           experience: '5 years'
//         }
//       };
      
//       window.dispatchEvent(new CustomEvent('bidConfirmed', {
//         detail: testData
//       }));
      
//       console.log('🧪 Test event dispatched:', testData);
//     },
    
//     // Get current inspector ID
//     getCurrentInspectorId,
    
//     // Get all notifications
//     getAllNotifications: () => notifications,
    
//     // Force refresh
//     forceRefresh: () => {
//       loadQueries();
//       loadNotifications();
//     }
//   };

//   // Context value with all functions and state
//   const value = {
//     // State
//     queries,
//     loading,
//     error,
//     notifications,
//     chatMessages,

//     // Query functions
//     submitQuery,
//     placeBid,
//     confirmInspector,
//     updateStatus,
//     loadQueries,
//     refreshQueries,
//     getActiveQueriesForInspector,
//     getActiveInspectionsForInspector,
//     getCustomerQueries,
//     getQuery,
//     getQueryStats,

//     // Notification functions
//     markNotificationRead,
//     createNotification,
//     getUnreadNotificationCount,

//     // Utility functions
//     getCurrentInspectorId,
//     getCurrentCustomerId,
//     clearError: () => setError(null),

//     // =====================
//     // CHAT FUNCTIONS
//     // =====================
    
//     // Core chat functions
//     sendMessage,
//     loadChatMessages,
//     getChatForInspection,
//     markChatMessagesRead,
//     onChatChange: handleChatChange,
    
//     // Additional chat functions
//     initializeInspectionChat,
//     getChatStats,
//     getActiveChats,
//     startMessageListener,
//     getCustomerActiveInspections,
//     startChatAutoRefresh,
//     sendTypingIndicator,
//     onUserTyping,
//     markAllMessagesRead,
    
//     // ✅ Debug functions (remove in production)
//     debug: debugFunctions
//   };

//   useEffect(() => {
//     window.queryContext = value;
//     return () => {
//       delete window.queryContext;
//     };
//   }, [value]);

//   return (
//     <QueryContext.Provider value={value}>
//       {children}
//     </QueryContext.Provider>
//   );
// };

// export default QueryContext;




// import React, { createContext, useContext, useState, useEffect } from 'react';
// import {
//   getAllQueries,
//   saveQuery,
//   addBidToQuery,
//   confirmInspectorForQuery,
//   updateQueryStatus,
//   getInspectorActiveInspections,
//   getQueryById,
//   getInspectorNotifications,
//   markNotificationAsRead,
//   createInspectorNotification,
//   sendChatMessage,
//   getChatMessages,
//   markMessagesAsRead,
//   initializeInspectionChat,
//   onQueriesChange,
//   // ✅ NEW: Status management imports
//   updateInspectionStatus,
//   getInspectionStatus,
//   getAllInspectionStatuses,
//   sendChatMessageWithStatus,
//   onInspectionStatusChange
// } from '../utils/queryStorage';

// const QueryContext = createContext();

// export const useQuery = () => {
//   const context = useContext(QueryContext);
//   if (!context) {
//     throw new Error('useQuery must be used within a QueryProvider');
//   }
//   return context;
// };

// export const QueryProvider = ({ children }) => {
//   const [queries, setQueries] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [chatMessages, setChatMessages] = useState({});
//   const [inspectionStatuses, setInspectionStatuses] = useState({}); // ✅ NEW: Status state
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Load initial data
//   useEffect(() => {
//     loadQueries();
//     loadNotifications();
//     loadInspectionStatuses(); // ✅ NEW: Load statuses
//     setupCrossTabCommunication();
//   }, []);

//   // Listen for storage changes
//   useEffect(() => {
//     const unsubscribe = onQueriesChange((eventData) => {
//       console.log('📡 QueryContext: Storage change detected:', eventData);
//       if (eventData.type === 'external_update') {
//         loadQueries();
//         loadNotifications();
//         loadInspectionStatuses(); // ✅ NEW: Reload statuses
//       }
//     });

//     return unsubscribe;
//   }, []);

//   // ✅ NEW: Listen for status changes
//   useEffect(() => {
//     const unsubscribeStatus = onInspectionStatusChange((statusData) => {
//       console.log('📊 QueryContext: Status change detected:', statusData);
//       setInspectionStatuses(prev => ({
//         ...prev,
//         [statusData.inspectionId]: statusData.statusUpdate
//       }));
//     });

//     return unsubscribeStatus;
//   }, []);

//   // ✅ NEW: Cross-tab communication setup
//   const setupCrossTabCommunication = () => {
//     if (typeof BroadcastChannel !== 'undefined') {
//       const channel = new BroadcastChannel('inspection-chat');
      
//       channel.onmessage = (event) => {
//         const { type, data } = event.data;
        
//         if (type === 'NEW_MESSAGE') {
//           console.log('🔄 Cross-tab message received:', data);
          
//           // Update local state
//           setChatMessages(prev => {
//             const existing = prev[data.inspectionId] || [];
//             const messageExists = existing.some(msg => msg.id === data.message.id);
            
//             if (!messageExists) {
//               return {
//                 ...prev,
//                 [data.inspectionId]: [...existing, data.message]
//               };
//             }
//             return prev;
//           });
          
//           // Dispatch local event
//           window.dispatchEvent(new CustomEvent('newChatMessage', { detail: data }));
//         }
//       };
      
//       return () => channel.close();
//     }
//     return () => {};
//   };

//   const loadQueries = () => {
//     try {
//       const allQueries = getAllQueries();
//       setQueries(allQueries);
//       console.log('QueryContext: Loaded queries:', allQueries.length);
//     } catch (err) {
//       console.error('QueryContext: Error loading queries:', err);
//       setError('Failed to load queries');
//     }
//   };

//   const loadNotifications = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const inspectorNotifications = getInspectorNotifications(currentInspectorId);
//       setNotifications(inspectorNotifications);
//       console.log('QueryContext: Loaded notifications:', inspectorNotifications.length);
//     } catch (err) {
//       console.error('QueryContext: Error loading notifications:', err);
//     }
//   };

//   // ✅ NEW: Load inspection statuses
//   const loadInspectionStatuses = () => {
//     try {
//       const statuses = getAllInspectionStatuses();
//       setInspectionStatuses(statuses);
//       console.log('QueryContext: Loaded inspection statuses:', Object.keys(statuses).length);
//     } catch (err) {
//       console.error('QueryContext: Error loading inspection statuses:', err);
//     }
//   };

//   const getCurrentInspectorId = () => {
//     return 'inspector-001'; // Replace with actual auth
//   };

//   const getCurrentCustomerId = () => {
//     return 'customer-001'; // Replace with actual auth
//   };

//   const submitQuery = async (queryData) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const newQuery = saveQuery(queryData);
//       loadQueries();
//       return newQuery;
//     } catch (err) {
//       setError('Failed to submit query');
//       console.error('QueryContext: Error submitting query:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const placeBid = async (queryId, bidData) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedQuery = addBidToQuery(queryId, bidData);
//       if (updatedQuery) {
//         loadQueries();
//         return updatedQuery;
//       } else {
//         throw new Error('Query not found');
//       }
//     } catch (err) {
//       setError('Failed to place bid');
//       console.error('QueryContext: Error placing bid:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmInspector = async (queryId, bidId, inspectorId) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
      
//       if (!queryId || !bidId || !inspectorId) {
//         throw new Error('Missing required parameters');
//       }
      
//       // ✅ STEP 1: Update query status to "In Progress" and set confirmed fields
//       const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
//       if (!updatedQuery) {
//         throw new Error('Query or bid not found');
//       }

//       // ✅ STEP 2: Ensure status is "In Progress" 
//       const finalQuery = updateQueryStatus(queryId, 'In Progress');
      
//       // ✅ STEP 3: Create notification for inspector
//       const bid = updatedQuery.bids?.find(b => b.id === bidId);
//       if (bid) {
//         const notificationData = {
//           type: 'bid_confirmed',
//           queryId: queryId,
//           bidId: bidId,
//           queryTitle: updatedQuery.commodityDisplay || updatedQuery.commodity || 'Inspection Request',
//           location: updatedQuery.locationDisplay || `${updatedQuery.location}, ${updatedQuery.country}`,
//           amount: bid.amount,
//           customerName: updatedQuery.contactPerson || 'Customer',
//           bidDetails: {
//             inspectorName: bid.inspectorName,
//             company: bid.company,
//             proposedTimeline: bid.proposedTimeline || bid.estimatedDuration,
//             rating: bid.rating,
//             experience: bid.experience
//           }
//         };
        
//         await createNotification(inspectorId, notificationData);
//         console.log('✅ Notification created for inspector:', inspectorId);
//       }
      
//       // ✅ STEP 4: Initialize chat for the inspection
//       await initializeInspectionChat(
//         queryId,
//         bid?.inspectorName || 'Inspector',
//         updatedQuery.contactPerson || 'Customer'
//       );
      
//       // ✅ NEW: Initialize inspection status
//       await updateInspectionStatus(queryId, 0); // Start with "Inspection Started"
      
//       // ✅ STEP 5: Dispatch event for real-time updates
//       window.dispatchEvent(new CustomEvent('bidConfirmed', {
//         detail: {
//           queryId,
//           bidId,
//           inspectorId,
//           queryTitle: updatedQuery.commodityDisplay || updatedQuery.commodity,
//           location: updatedQuery.locationDisplay || `${updatedQuery.location}, ${updatedQuery.country}`,
//           amount: bid?.amount,
//           customerName: updatedQuery.contactPerson || 'Customer',
//           query: updatedQuery
//         }
//       }));
      
//       console.log('✅ QueryContext: Inspector confirmed successfully');
      
//       // Refresh data
//       loadQueries();
//       loadNotifications();
//       loadInspectionStatuses(); // ✅ NEW: Reload statuses
      
//       return finalQuery;
//     } catch (err) {
//       setError(`Failed to confirm inspector: ${err.message}`);
//       console.error('❌ QueryContext: Error confirming inspector:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getActiveQueriesForInspector = () => {
//     try {
//       return queries.filter(query => query.status === 'Active');
//     } catch (err) {
//       console.error('QueryContext: Error getting active queries:', err);
//       return [];
//     }
//   };

//   // ✅ ENHANCED: Get active inspections for inspector with status info
//   const getActiveInspectionsForInspector = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const activeInspections = getInspectorActiveInspections(currentInspectorId);
      
//       return activeInspections.map(q => {
//         const statusInfo = getStatus(q.id);
//         const formattedQuery = formatQueryForDisplay(q);
        
//         return {
//           ...formattedQuery,
//           currentStatus: statusInfo.status || 0,
//           statusHistory: statusInfo.statusHistory || []
//         };
//       });
//     } catch (err) {
//       console.error('QueryContext: Error getting active inspections:', err);
//       return [];
//     }
//   };

//   const getCustomerQueries = () => {
//     try {
//       // In real app, filter by customer email/ID
//       return queries.filter(query => 
//         query.email === 'current-customer@example.com' || query.status === 'Active'
//       );
//     } catch (err) {
//       console.error('QueryContext: Error getting customer queries:', err);
//       return [];
//     }
//   };

//   // ✅ ENHANCED: Get customer active inspections with status info
//   const getCustomerActiveInspections = () => {
//     try {
//       const currentCustomerId = getCurrentCustomerId();
      
//       // ✅ Filter for customer's confirmed inspections
//       const confirmedInspections = queries.filter(query => {
//         const isConfirmed = query.confirmedInspectorId && query.confirmedBidId;
//         const isInProgress = query.status === 'In Progress';
        
//         // ✅ ADD: Filter by current customer 
//         const belongsToCustomer = query.email === 'current-customer@example.com' || 
//                                  query.customerId === currentCustomerId ||
//                                  isInProgress; // For demo, show all In Progress
        
//         return isConfirmed && isInProgress && belongsToCustomer;
//       });

//       return confirmedInspections.map(query => {
//         const confirmedBid = query.bids?.find(bid => bid.id === query.confirmedBidId);
//         const chatStats = getChatStats(query.id, currentCustomerId);
//         const statusInfo = getStatus(query.id); // ✅ NEW: Get status information
        
//         return {
//           id: query.id,
//           inspectionId: query.id,
//           queryId: query.id,
//           queryTitle: `${query.commodityDisplay || query.commodity} Quality Assessment`,
//           commodity: query.commodity,
//           location: query.locationDisplay || `${query.location}, ${query.country}`,
//           amount: confirmedBid?.amount || 0,
//           inspectorId: query.confirmedInspectorId,
//           inspectorName: confirmedBid?.inspectorName || 'Inspector',
//           inspectorCompany: confirmedBid?.company || 'Inspection Company',
//           inspectorRating: confirmedBid?.rating || 4.5,
//           startedAt: query.confirmedAt || query.updatedAt,
//           estimatedCompletion: confirmedBid?.proposedTimeline || '2-3 days',
//           status: 'In Progress',
//           volume: query.volumeDisplay || `${query.volume} ${query.unit}`,
//           urgency: query.urgency,
//           customerName: query.contactPerson || 'Customer',
//           // ✅ CHAT INFO
//           unreadMessages: chatStats.unreadCount || 0,
//           lastMessage: chatStats.lastMessage,
//           hasUnread: (chatStats.unreadCount || 0) > 0,
//           // ✅ NEW: Status info
//           currentStatus: statusInfo.status || 0,
//           statusHistory: statusInfo.statusHistory || []
//         };
//       });
//     } catch (err) {
//       console.error('❌ Error getting customer active inspections:', err);
//       return [];
//     }
//   };

//   const markNotificationRead = async (notificationId) => {
//     try {
//       console.log('📖 QueryContext: Marking notification as read:', notificationId);
//       markNotificationAsRead(notificationId);
//       loadNotifications();
//     } catch (err) {
//       console.error('QueryContext: Error marking notification as read:', err);
//     }
//   };

//   const updateStatus = async (queryId, newStatus) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const updatedQuery = updateQueryStatus(queryId, newStatus);
//       if (updatedQuery) {
//         loadQueries();
//         return updatedQuery;
//       } else {
//         throw new Error('Query not found');
//       }
//     } catch (err) {
//       setError('Failed to update status');
//       console.error('QueryContext: Error updating status:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getQuery = (queryId) => {
//     try {
//       const query = getQueryById(queryId);
//       return query ? formatQueryForDisplay(query) : null;
//     } catch (err) {
//       console.error('QueryContext: Error getting query:', err);
//       return null;
//     }
//   };

//   const getQueryStats = () => {
//     try {
//       const totalQueries = queries.length;
//       const active = queries.filter(q => q.status === 'Active').length;
//       const completed = queries.filter(q => q.status === 'Completed').length;
//       const inProgress = queries.filter(q => q.status === 'In Progress').length;
//       return { total: totalQueries, active, completed, inProgress };
//     } catch (err) {
//       console.error('QueryContext: Error getting stats:', err);
//       return { total: 0, active: 0, completed: 0, inProgress: 0 };
//     }
//   };

//   const refreshQueries = () => {
//     console.log('QueryContext: Manual refresh triggered');
//     loadQueries();
//     loadNotifications();
//     loadInspectionStatuses(); // ✅ NEW: Reload statuses
//   };

//   const createNotification = async (inspectorId, notificationData) => {
//     try {
//       console.log('🔔 QueryContext: Creating notification for inspector:', inspectorId);
//       console.log('📋 Notification data:', notificationData);
      
//       const notification = createInspectorNotification(inspectorId, notificationData);
      
//       // Refresh notifications
//       loadNotifications();
      
//       console.log('✅ QueryContext: Notification created successfully:', notification.id);
//       return notification;
//     } catch (error) {
//       console.error('❌ QueryContext: Error creating notification:', error);
//       throw error;
//     }
//   };

//   const getUnreadNotificationCount = () => {
//     try {
//       const currentInspectorId = getCurrentInspectorId();
//       const unreadCount = notifications.filter(n => 
//         n.inspectorId === currentInspectorId && !n.read
//       ).length;
//       return unreadCount;
//     } catch (error) {
//       console.error('QueryContext: Error getting unread notification count:', error);
//       return 0;
//     }
//   };

//   // =====================
//   // ENHANCED CHAT FUNCTIONALITY
//   // =====================

//   // ✅ ENHANCED: Send message with status handling
//   const sendMessage = async (inspectionId, messageData) => {
//     try {
//       console.log('📤 QueryContext: Sending message:', { inspectionId, messageData });
      
//       const newMessage = await sendChatMessage(inspectionId, messageData);
      
//       // Update local state immediately for better UX
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: [...(prev[inspectionId] || []), newMessage]
//       }));

//       // ✅ ENHANCED: Dispatch multiple events for comprehensive real-time updates
//       const eventDetail = { 
//         inspectionId, 
//         message: newMessage,
//         senderId: messageData.senderId,
//         senderType: messageData.senderType,
//         timestamp: new Date().toISOString()
//       };

//       // Dispatch to all listeners
//       window.dispatchEvent(new CustomEvent('chatUpdated', { detail: eventDetail }));
//       window.dispatchEvent(new CustomEvent('newChatMessage', { detail: eventDetail }));
      
//       // ✅ NEW: Broadcast to all tabs/windows for cross-tab communication
//       if (typeof BroadcastChannel !== 'undefined') {
//         const channel = new BroadcastChannel('inspection-chat');
//         channel.postMessage({
//           type: 'NEW_MESSAGE',
//           data: eventDetail
//         });
//       }

//       console.log('✅ QueryContext: Message sent successfully:', newMessage.id);
//       return newMessage;
//     } catch (err) {
//       console.error('❌ QueryContext: Error sending message:', err);
//       throw err;
//     }
//   };

//   // ✅ NEW: Send message with status handling
//   const sendMessageWithStatus = async (inspectionId, messageData) => {
//     try {
//       console.log('📤 QueryContext: Sending message with status handling:', { inspectionId, messageData });
      
//       const newMessage = await sendChatMessageWithStatus(inspectionId, messageData);
      
//       // Update local state immediately for better UX
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: [...(prev[inspectionId] || []), newMessage]
//       }));

//       // Dispatch multiple events for comprehensive real-time updates
//       const eventDetail = { 
//         inspectionId, 
//         message: newMessage,
//         senderId: messageData.senderId,
//         senderType: messageData.senderType,
//         timestamp: new Date().toISOString()
//       };

//       // Dispatch to all listeners
//       window.dispatchEvent(new CustomEvent('chatUpdated', { detail: eventDetail }));
//       window.dispatchEvent(new CustomEvent('newChatMessage', { detail: eventDetail }));
      
//       // Broadcast to all tabs/windows for cross-tab communication
//       if (typeof BroadcastChannel !== 'undefined') {
//         const channel = new BroadcastChannel('inspection-chat');
//         channel.postMessage({
//           type: 'NEW_MESSAGE',
//           data: eventDetail
//         });
//       }

//       console.log('✅ QueryContext: Message sent with status handling:', newMessage.id);
//       return newMessage;
//     } catch (err) {
//       console.error('❌ QueryContext: Error sending message with status:', err);
//       throw err;
//     }
//   };

//   const loadChatMessages = (inspectionId) => {
//     try {
//       console.log('🔄 QueryContext: Loading chat messages for inspection:', inspectionId);
//       const messages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: messages
//       }));
//       console.log('📋 QueryContext: Loaded', messages.length, 'messages for inspection:', inspectionId);
//       return messages;
//     } catch (err) {
//       console.error('❌ QueryContext: Error loading chat messages:', err);
//       return [];
//     }
//   };

//   const getChatForInspection = (inspectionId) => {
//     try {
//       // First try to get from local state
//       if (chatMessages[inspectionId]) {
//         return chatMessages[inspectionId];
//       }
      
//       // If not in state, load from storage
//       const messages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: messages
//       }));
      
//       return messages;
//     } catch (err) {
//       console.error('❌ QueryContext: Error getting chat for inspection:', err);
//       return [];
//     }
//   };

//   const markChatMessagesRead = async (inspectionId, userId) => {
//     try {
//       await markMessagesAsRead(inspectionId, userId);
//       const updatedMessages = getChatMessages(inspectionId);
//       setChatMessages(prev => ({
//         ...prev,
//         [inspectionId]: updatedMessages
//       }));
      
//       // Dispatch event for real-time updates
//       window.dispatchEvent(new CustomEvent('messagesRead', {
//         detail: { inspectionId, userId }
//       }));
      
//       console.log('📖 QueryContext: Messages marked as read for inspection:', inspectionId);
//     } catch (err) {
//       console.error('❌ QueryContext: Error marking messages read:', err);
//     }
//   };

//   // Enhanced chat change listener that handles all chat events
//   const handleChatChange = (callback) => {
//     const eventHandler = (event) => {
//       console.log('🔔 QueryContext: Chat change event received:', event.detail);
//       callback(event.detail);
//     };

//     // Listen for multiple types of chat events
//     window.addEventListener('newChatMessage', eventHandler);
//     window.addEventListener('chatUpdated', eventHandler);
//     window.addEventListener('messagesRead', eventHandler);

//     // Return cleanup function
//     return () => {
//       window.removeEventListener('newChatMessage', eventHandler);
//       window.removeEventListener('chatUpdated', eventHandler);
//       window.removeEventListener('messagesRead', eventHandler);
//     };
//   };

//   // Initialize chat when inspection starts
//   const initializeInspectionChatHandler = async (inspectionId, inspectorName, customerName) => {
//     try {
//       const existingMessages = getChatMessages(inspectionId);
      
//       // Only initialize if no messages exist
//       if (existingMessages.length === 0) {
//         const systemMessage = {
//           senderId: 'system',
//           senderName: 'System',
//           senderType: 'system',
//           message: `🎉 Inspection chat started! Inspector ${inspectorName} is now working with ${customerName}. Feel free to communicate throughout the inspection process.`,
//           type: 'system'
//         };

//         await sendMessage(inspectionId, systemMessage);
//         console.log('🆕 QueryContext: Chat initialized for inspection:', inspectionId);
//       }
//     } catch (err) {
//       console.error('❌ QueryContext: Error initializing chat:', err);
//     }
//   };

//   // Helper function to get chat statistics
//   const getChatStats = (inspectionId, userId) => {
//     try {
//       const messages = getChatForInspection(inspectionId);
//       const unreadCount = messages.filter(msg => 
//         msg.senderId !== userId && !msg.read
//       ).length;
      
//       return {
//         totalMessages: messages.length,
//         unreadCount,
//         lastMessage: messages.length > 0 ? messages[messages.length - 1] : null,
//         hasUnread: unreadCount > 0
//       };
//     } catch (err) {
//       console.error('❌ QueryContext: Error getting chat stats:', err);
//       return { totalMessages: 0, unreadCount: 0, lastMessage: null, hasUnread: false };
//     }
//   };

//   // Real-time message listener for notifications
//   const startMessageListener = (userId, userType, onNewMessage) => {
//     const handleNewMessage = (event) => {
//       const { message, inspectionId } = event.detail;
      
//       // Only notify if message is not from current user
//       if (message.senderId !== userId) {
//         console.log('🔔 New message received for user:', userId, message);
        
//         if (onNewMessage) {
//           onNewMessage({
//             inspectionId,
//             message,
//             unreadCount: getChatStats(inspectionId, userId).unreadCount
//           });
//         }
        
//         // Show browser notification if supported
//         if ('Notification' in window && Notification.permission === 'granted') {
//           new Notification(`New message from ${message.senderName}`, {
//             body: message.message,
//             icon: '/favicon.ico'
//           });
//         }
//       }
//     };

//     window.addEventListener('newChatMessage', handleNewMessage);
    
//     return () => {
//       window.removeEventListener('newChatMessage', handleNewMessage);
//     };
//   };

//   // =====================
//   // ✅ NEW: STATUS MANAGEMENT FUNCTIONS
//   // =====================

//   // Update inspection status
//   const updateInspectionStatusHandler = async (inspectionId, newStatus) => {
//     try {
//       console.log('📊 QueryContext: Updating inspection status:', { inspectionId, newStatus });
      
//       const statusUpdate = updateInspectionStatus(inspectionId, newStatus);
      
//       // Update local state
//       setInspectionStatuses(prev => ({
//         ...prev,
//         [inspectionId]: statusUpdate
//       }));
      
//       // Send status update message to chat
//       const inspectionPhases = [
//         'Inspection Started',
//         'Sample Collected', 
//         'Analysis',
//         'Report Approved'
//       ];
      
//       const statusMessage = {
//         senderId: 'system',
//         senderName: 'System',
//         senderType: 'system',
//         message: `Status updated to: ${inspectionPhases[newStatus]}`,
//         type: 'status-update',
//         statusId: newStatus
//       };
      
//       await sendMessageWithStatus(inspectionId, statusMessage);
      
//       console.log('✅ QueryContext: Status updated successfully');
//       return statusUpdate;
//     } catch (error) {
//       console.error('❌ QueryContext: Error updating status:', error);
//       throw error;
//     }
//   };

//   // Get inspection status
//   const getStatus = (inspectionId) => {
//     try {
//       // First check local state
//       if (inspectionStatuses[inspectionId]) {
//         return inspectionStatuses[inspectionId];
//       }
      
//       // Then check storage
//       const statusData = getInspectionStatus(inspectionId);
      
//       // Update local state
//       setInspectionStatuses(prev => ({
//         ...prev,
//         [inspectionId]: statusData
//       }));
      
//       return statusData;
//     } catch (error) {
//       console.error('❌ QueryContext: Error getting status:', error);
//       return { status: 0, statusHistory: [] };
//     }
//   };

//   // Get all inspection statuses
//   const getAllStatuses = () => {
//     try {
//       return getAllInspectionStatuses();
//     } catch (error) {
//       console.error('❌ QueryContext: Error getting all statuses:', error);
//       return {};
//     }
//   };

//   // Format query data for display
//   const formatQueryForDisplay = (query) => {
//     const getUrgencyColor = (urgency) => {
//       switch (urgency?.toLowerCase()) {
//         case 'high': return 'bg-red-100 text-red-700';
//         case 'medium': return 'bg-yellow-100 text-yellow-700';
//         case 'low': return 'bg-green-100 text-green-700';
//         default: return 'bg-gray-100 text-gray-700';
//       }
//     };

//     const getStatusColor = (status) => {
//       switch (status?.toLowerCase()) {
//         case 'active': return 'bg-blue-100 text-blue-700';
//         case 'in progress': return 'bg-orange-100 text-orange-700';
//         case 'completed': return 'bg-green-100 text-green-700';
//         case 'cancelled': return 'bg-gray-100 text-gray-700';
//         default: return 'bg-gray-100 text-gray-700';
//       }
//     };

//     return {
//       ...query,
//       urgencyColor: getUrgencyColor(query.urgency),
//       statusColor: getStatusColor(query.status),
//       formattedDate: new Date(query.submittedAt).toLocaleDateString(),
//       formattedTime: new Date(query.submittedAt).toLocaleTimeString(),
//       commodityDisplay: query.riceType || query.subCommodity || query.commodity || 'Not specified',
//       volumeDisplay: `${query.volume || 0} ${query.unit || 'units'}`,
//       locationDisplay: `${query.location || ''}, ${query.country || ''}`.replace(/^, |, $/, ''),
//       inspectionTypeDisplay: query.inspectionTypes?.map(type => 
//         type === 'physical' ? 'Physical Inspection' : 'Chemical Testing'
//       ).join(', ') || 'Not specified'
//     };
//   };

//   // Context value with all functions and state
//   const value = {
//     // State
//     queries,
//     loading,
//     error,
//     notifications,
//     chatMessages,
//     inspectionStatuses, // ✅ NEW: Status state

//     // Query functions
//     submitQuery,
//     placeBid,
//     confirmInspector,
//     updateStatus,
//     loadQueries,
//     refreshQueries,
//     getActiveQueriesForInspector,
//     getActiveInspectionsForInspector,
//     getCustomerQueries,
//     getCustomerActiveInspections,
//     getQuery,
//     getQueryStats,

//     // Notification functions
//     markNotificationRead,
//     createNotification,
//     getUnreadNotificationCount,

//     // Chat functions
//     sendMessage,
//     sendMessageWithStatus, // ✅ NEW: Status-aware message sending
//     loadChatMessages,
//     getChatForInspection,
//     markChatMessagesRead,
//     onChatChange: handleChatChange,
//     initializeInspectionChat: initializeInspectionChatHandler,
//     getChatStats,
//     startMessageListener,

//     // ✅ NEW: Status functions
//     updateInspectionStatus: updateInspectionStatusHandler,
//     getStatus,
//     getAllStatuses,

//     // Utility functions
//     getCurrentInspectorId,
//     getCurrentCustomerId,
//     clearError: () => setError(null),
//     formatQueryForDisplay
//   };

//   useEffect(() => {
//     window.queryContext = value;
//     return () => {
//       delete window.queryContext;
//     };
//   }, [value]);

//   return (
//     <QueryContext.Provider value={value}>
//       {children}
//     </QueryContext.Provider>
//   );
// };

// export default QueryContext;
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAllQueries,
  saveQuery,
  addBidToQuery,
  confirmInspectorForQuery,
  updateQueryStatus,
  getInspectorActiveInspections,
  getQueryById,
  getInspectorNotifications,
  markNotificationAsRead,
  createInspectorNotification,
  sendChatMessage,
  getChatMessages,
  markMessagesAsRead,
  initializeInspectionChat,
  // Status management imports
  updateInspectionStatus,
  getInspectionStatus,
  getAllInspectionStatuses,
  sendChatMessageWithStatus,
  // Photo and completion imports
  addPhotoToInspection,
  getInspectionPhotos,
  removePhotoFromInspection,
  completeInspection,
  getInspectionCompletion,
  isInspectionCompleted,
  sendChatMessageWithExtras,
  generateInspectionReport,
  getInspectionReports,
  getReportById,
  // Enhanced completion functions
  completeInspectionWithEvents,
  handleInspectionCompletionFromUI,
  triggerCustomerCompletionPopup,
  triggerInspectorCompletionConfirm
} from '../utils/queryStorage';

const QueryContext = createContext();

export const useQuery = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error('useQuery must be used within a QueryProvider');
  }
  return context;
};

export const QueryProvider = ({ children }) => {
  const [queries, setQueries] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [chatMessages, setChatMessages] = useState({});
  const [inspectionStatuses, setInspectionStatuses] = useState({});
  const [inspectionPhotos, setInspectionPhotos] = useState({});
  const [inspectionCompletions, setInspectionCompletions] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    loadQueries();
    loadNotifications();
    loadInspectionStatuses();
    loadInspectionPhotos();
    loadInspectionCompletions();
    setupCrossTabCommunication();
  }, []);

  // Listen for storage changes with manual event listeners
  useEffect(() => {
    const handleStorageChange = (event) => {
      console.log('📡 QueryContext: Storage change detected:', event.detail);
      if (event.detail.type === 'external_update') {
        loadQueries();
        loadNotifications();
        loadInspectionStatuses();
        loadInspectionPhotos();
        loadInspectionCompletions();
      }
    };

    const handleStatusChange = (event) => {
      console.log('📊 QueryContext: Status change detected:', event.detail);
      const { inspectionId, newStatus, statusUpdate } = event.detail;
      setInspectionStatuses(prev => ({
        ...prev,
        [inspectionId]: statusUpdate
      }));
    };

    const handlePhotoChange = (event) => {
      console.log('📸 QueryContext: Photo change detected:', event.detail);
      const { inspectionId } = event.detail;
      setInspectionPhotos(prev => ({
        ...prev,
        [inspectionId]: getInspectionPhotos(inspectionId)
      }));
    };

    const handleCompletion = (event) => {
      console.log('🎉 QueryContext: Inspection completion detected:', event.detail);
      const { inspectionId, completion } = event.detail;
      
      setInspectionCompletions(prev => ({
        ...prev,
        [inspectionId]: completion
      }));

      // Show completion notification to both parties
      if (event.detail.showToCustomer || event.detail.showToInspector) {
        showCompletionNotification(event.detail);
      }
    };

    // Add event listeners
    window.addEventListener('queriesUpdated', handleStorageChange);
    window.addEventListener('inspectionStatusUpdated', handleStatusChange);
    window.addEventListener('photoUploaded', handlePhotoChange);
    window.addEventListener('inspectionCompleted', handleCompletion);

    return () => {
      // Cleanup event listeners
      window.removeEventListener('queriesUpdated', handleStorageChange);
      window.removeEventListener('inspectionStatusUpdated', handleStatusChange);
      window.removeEventListener('photoUploaded', handlePhotoChange);
      window.removeEventListener('inspectionCompleted', handleCompletion);
    };
  }, []);

  // Show completion notification
  const showCompletionNotification = (completionData) => {
    const { inspectionId, completion } = completionData;
    
    // Create browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🎉 Inspection Completed!', {
        body: `Inspection ${inspectionId} has been completed successfully. Final report is ready.`,
        icon: '/favicon.ico'
      });
    }

    // Dispatch custom completion event for UI components
    window.dispatchEvent(new CustomEvent('showCompletionPopup', {
      detail: {
        title: '🎉 Inspection Completed Successfully!',
        message: 'The inspection has been completed and the final report is ready for download.',
        inspectionId: inspectionId,
        completion: completion,
        timestamp: new Date().toISOString()
      }
    }));
  };

  // Cross-tab communication setup
  const setupCrossTabCommunication = () => {
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('inspection-chat');
      
      channel.onmessage = (event) => {
        const { type, data } = event.data;
        
        if (type === 'NEW_MESSAGE') {
          console.log('🔄 Cross-tab message received:', data);
          
          setChatMessages(prev => {
            const existing = prev[data.inspectionId] || [];
            const messageExists = existing.some(msg => msg.id === data.message.id);
            
            if (!messageExists) {
              return {
                ...prev,
                [data.inspectionId]: [...existing, data.message]
              };
            }
            return prev;
          });
          
          window.dispatchEvent(new CustomEvent('newChatMessage', { detail: data }));
        }
      };
      
      return () => channel.close();
    }
    return () => {};
  };

  const loadQueries = () => {
    try {
      const allQueries = getAllQueries();
      setQueries(allQueries);
      console.log('QueryContext: Loaded queries:', allQueries.length);
    } catch (err) {
      console.error('QueryContext: Error loading queries:', err);
      setError('Failed to load queries');
    }
  };

  const loadNotifications = () => {
    try {
      const currentInspectorId = getCurrentInspectorId();
      const inspectorNotifications = getInspectorNotifications(currentInspectorId);
      setNotifications(inspectorNotifications);
      console.log('QueryContext: Loaded notifications:', inspectorNotifications.length);
    } catch (err) {
      console.error('QueryContext: Error loading notifications:', err);
    }
  };

  const loadInspectionStatuses = () => {
    try {
      const statuses = getAllInspectionStatuses();
      setInspectionStatuses(statuses);
      console.log('QueryContext: Loaded inspection statuses:', Object.keys(statuses).length);
    } catch (err) {
      console.error('QueryContext: Error loading inspection statuses:', err);
    }
  };

  const loadInspectionPhotos = () => {
    try {
      const activeInspections = getInspectorActiveInspections(getCurrentInspectorId());
      const photosData = {};
      
      activeInspections.forEach(inspection => {
        const photos = getInspectionPhotos(inspection.id);
        if (photos.length > 0) {
          photosData[inspection.id] = photos;
        }
      });
      
      setInspectionPhotos(photosData);
      console.log('QueryContext: Loaded inspection photos for', Object.keys(photosData).length, 'inspections');
    } catch (err) {
      console.error('QueryContext: Error loading inspection photos:', err);
    }
  };

  const loadInspectionCompletions = () => {
    try {
      const activeInspections = getInspectorActiveInspections(getCurrentInspectorId());
      const completionsData = {};
      
      activeInspections.forEach(inspection => {
        const completion = getInspectionCompletion(inspection.id);
        if (completion) {
          completionsData[inspection.id] = completion;
        }
      });
      
      setInspectionCompletions(completionsData);
      console.log('QueryContext: Loaded completion data for', Object.keys(completionsData).length, 'inspections');
    } catch (err) {
      console.error('QueryContext: Error loading inspection completions:', err);
    }
  };

  const getCurrentInspectorId = () => {
    return 'inspector-001'; // Replace with actual auth
  };

  const getCurrentCustomerId = () => {
    return 'customer-001'; // Replace with actual auth
  };

  const submitQuery = async (queryData) => {
    try {
      setLoading(true);
      setError(null);
      const newQuery = saveQuery(queryData);
      loadQueries();
      return newQuery;
    } catch (err) {
      setError('Failed to submit query');
      console.error('QueryContext: Error submitting query:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const placeBid = async (queryId, bidData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedQuery = addBidToQuery(queryId, bidData);
      if (updatedQuery) {
        loadQueries();
        return updatedQuery;
      } else {
        throw new Error('Query not found');
      }
    } catch (err) {
      setError('Failed to place bid');
      console.error('QueryContext: Error placing bid:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const confirmInspector = async (queryId, bidId, inspectorId) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 QueryContext: Confirming inspector:', { queryId, bidId, inspectorId });
      
      if (!queryId || !bidId || !inspectorId) {
        throw new Error('Missing required parameters');
      }
      
      const updatedQuery = confirmInspectorForQuery(queryId, bidId, inspectorId);
      if (!updatedQuery) {
        throw new Error('Query or bid not found');
      }

      const finalQuery = updateQueryStatus(queryId, 'In Progress');
      
      const bid = updatedQuery.bids?.find(b => b.id === bidId);
      if (bid) {
        const notificationData = {
          type: 'bid_confirmed',
          queryId: queryId,
          bidId: bidId,
          queryTitle: updatedQuery.commodityDisplay || updatedQuery.commodity || 'Inspection Request',
          location: updatedQuery.locationDisplay || `${updatedQuery.location}, ${updatedQuery.country}`,
          amount: bid.amount,
          customerName: updatedQuery.contactPerson || 'Customer',
          bidDetails: {
            inspectorName: bid.inspectorName,
            company: bid.company,
            proposedTimeline: bid.proposedTimeline || bid.estimatedDuration,
            rating: bid.rating,
            experience: bid.experience
          }
        };
        
        await createNotification(inspectorId, notificationData);
        console.log('✅ Notification created for inspector:', inspectorId);
      }
      
      await initializeInspectionChat(
        queryId,
        bid?.inspectorName || 'Inspector',
        updatedQuery.contactPerson || 'Customer'
      );
      
      await updateInspectionStatus(queryId, 0);
      
      window.dispatchEvent(new CustomEvent('bidConfirmed', {
        detail: {
          queryId,
          bidId,
          inspectorId,
          queryTitle: updatedQuery.commodityDisplay || updatedQuery.commodity,
          location: updatedQuery.locationDisplay || `${updatedQuery.location}, ${updatedQuery.country}`,
          amount: bid?.amount,
          customerName: updatedQuery.contactPerson || 'Customer',
          query: updatedQuery
        }
      }));
      
      console.log('✅ QueryContext: Inspector confirmed successfully');
      
      loadQueries();
      loadNotifications();
      loadInspectionStatuses();
      
      return finalQuery;
    } catch (err) {
      setError(`Failed to confirm inspector: ${err.message}`);
      console.error('❌ QueryContext: Error confirming inspector:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getActiveQueriesForInspector = () => {
    try {
      return queries.filter(query => query.status === 'Active');
    } catch (err) {
      console.error('QueryContext: Error getting active queries:', err);
      return [];
    }
  };

  const getActiveInspectionsForInspector = () => {
    try {
      const currentInspectorId = getCurrentInspectorId();
      const activeInspections = getInspectorActiveInspections(currentInspectorId);
      
      return activeInspections.map(q => {
        const statusInfo = getStatus(q.id);
        const photosInfo = inspectionPhotos[q.id] || [];
        const completionInfo = inspectionCompletions[q.id] || null;
        const formattedQuery = formatQueryForDisplay(q);
        
        return {
          ...formattedQuery,
          currentStatus: statusInfo.status || 0,
          statusHistory: statusInfo.statusHistory || [],
          photos: photosInfo,
          photosCount: photosInfo.length,
          isCompleted: !!completionInfo,
          completionData: completionInfo
        };
      });
    } catch (err) {
      console.error('QueryContext: Error getting active inspections:', err);
      return [];
    }
  };

  const getCustomerQueries = () => {
    try {
      return queries.filter(query => 
        query.email === 'current-customer@example.com' || query.status === 'Active'
      );
    } catch (err) {
      console.error('QueryContext: Error getting customer queries:', err);
      return [];
    }
  };

  const getCustomerActiveInspections = () => {
    try {
      const currentCustomerId = getCurrentCustomerId();
      
      const confirmedInspections = queries.filter(query => {
        const isConfirmed = query.confirmedInspectorId && query.confirmedBidId;
        const isInProgress = query.status === 'In Progress' || query.status === 'Completed';
        const belongsToCustomer = query.email === 'current-customer@example.com' || 
                                 query.customerId === currentCustomerId ||
                                 isInProgress;
        
        return isConfirmed && isInProgress && belongsToCustomer;
      });

      return confirmedInspections.map(query => {
        const confirmedBid = query.bids?.find(bid => bid.id === query.confirmedBidId);
        const chatStats = getChatStats(query.id, currentCustomerId);
        const statusInfo = getStatus(query.id);
        const photosInfo = inspectionPhotos[query.id] || [];
        const completionInfo = inspectionCompletions[query.id] || null;
        
        return {
          id: query.id,
          inspectionId: query.id,
          queryId: query.id,
          queryTitle: `${query.commodityDisplay || query.commodity} Quality Assessment`,
          commodity: query.commodity,
          location: query.locationDisplay || `${query.location}, ${query.country}`,
          amount: confirmedBid?.amount || 0,
          inspectorId: query.confirmedInspectorId,
          inspectorName: confirmedBid?.inspectorName || 'Inspector',
          inspectorCompany: confirmedBid?.company || 'Inspection Company',
          inspectorRating: confirmedBid?.rating || 4.5,
          startedAt: query.confirmedAt || query.updatedAt,
          estimatedCompletion: confirmedBid?.proposedTimeline || '2-3 days',
          status: completionInfo ? 'Completed' : 'In Progress',
          volume: query.volumeDisplay || `${query.volume} ${query.unit}`,
          urgency: query.urgency,
          customerName: query.contactPerson || 'Customer',
          unreadMessages: chatStats.unreadCount || 0,
          lastMessage: chatStats.lastMessage,
          hasUnread: (chatStats.unreadCount || 0) > 0,
          currentStatus: statusInfo.status || 0,
          statusHistory: statusInfo.statusHistory || [],
          photos: photosInfo,
          photosCount: photosInfo.length,
          isCompleted: !!completionInfo,
          completionData: completionInfo
        };
      });
    } catch (err) {
      console.error('❌ Error getting customer active inspections:', err);
      return [];
    }
  };

  // Photo management functions
  const uploadPhotoToInspection = async (inspectionId, photoFile, uploadedBy = 'inspector') => {
    try {
      const photoData = {
        name: photoFile.name,
        size: photoFile.size,
        url: URL.createObjectURL(photoFile),
        uploadedBy: uploadedBy,
        category: 'inspection'
      };
      
      const newPhoto = await addPhotoToInspection(inspectionId, photoData);
      
      setInspectionPhotos(prev => ({
        ...prev,
        [inspectionId]: getInspectionPhotos(inspectionId)
      }));
      
      const photoMessage = {
        senderId: uploadedBy === 'inspector' ? getCurrentInspectorId() : getCurrentCustomerId(),
        senderName: uploadedBy === 'inspector' ? 'Inspector' : 'Customer',
        senderType: uploadedBy,
        message: `📸 Photo uploaded: ${photoFile.name}`,
        type: 'photo',
        photoData: newPhoto
      };
      
      await sendMessage(inspectionId, photoMessage);
      
      console.log('✅ Photo uploaded to inspection:', inspectionId);
      return newPhoto;
    } catch (error) {
      console.error('❌ Error uploading photo:', error);
      throw error;
    }
  };

  const removePhotoFromInspectionHandler = async (inspectionId, photoId) => {
    try {
      await removePhotoFromInspection(inspectionId, photoId);
      
      setInspectionPhotos(prev => ({
        ...prev,
        [inspectionId]: getInspectionPhotos(inspectionId)
      }));
      
      console.log('✅ Photo removed from inspection:', inspectionId);
    } catch (error) {
      console.error('❌ Error removing photo:', error);
      throw error;
    }
  };

  const getInspectionPhotosHandler = (inspectionId) => {
    return inspectionPhotos[inspectionId] || [];
  };

  // Completion management functions
  const completeInspectionHandler = async (inspectionId, completionData = {}) => {
    try {
      const completion = await completeInspection(inspectionId, {
        completedBy: getCurrentInspectorId(),
        ...completionData
      });
      
      setInspectionCompletions(prev => ({
        ...prev,
        [inspectionId]: completion
      }));
      
      loadQueries();
      loadInspectionStatuses();
      
      console.log('✅ Inspection completed:', inspectionId);
      return completion;
    } catch (error) {
      console.error('❌ Error completing inspection:', error);
      throw error;
    }
  };

  const getInspectionCompletionHandler = (inspectionId) => {
    return inspectionCompletions[inspectionId] || getInspectionCompletion(inspectionId);
  };

  const isInspectionCompletedHandler = (inspectionId) => {
    return !!inspectionCompletions[inspectionId] || isInspectionCompleted(inspectionId);
  };

  // Report generation
  const generateReportHandler = async (inspectionId, reportData) => {
    try {
      const report = await generateInspectionReport(inspectionId, reportData);
      console.log('✅ Report generated:', report.id);
      return report;
    } catch (error) {
      console.error('❌ Error generating report:', error);
      throw error;
    }
  };

  const getInspectionReportsHandler = (inspectionId) => {
    return getInspectionReports(inspectionId);
  };

  const markNotificationRead = async (notificationId) => {
    try {
      console.log('📖 QueryContext: Marking notification as read:', notificationId);
      markNotificationAsRead(notificationId);
      loadNotifications();
    } catch (err) {
      console.error('QueryContext: Error marking notification as read:', err);
    }
  };

  const updateStatus = async (queryId, newStatus) => {
    try {
      setLoading(true);
      setError(null);
      const updatedQuery = updateQueryStatus(queryId, newStatus);
      if (updatedQuery) {
        loadQueries();
        return updatedQuery;
      } else {
        throw new Error('Query not found');
      }
    } catch (err) {
      setError('Failed to update status');
      console.error('QueryContext: Error updating status:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getQuery = (queryId) => {
    try {
      const query = getQueryById(queryId);
      return query ? formatQueryForDisplay(query) : null;
    } catch (err) {
      console.error('QueryContext: Error getting query:', err);
      return null;
    }
  };

  const getQueryStats = () => {
    try {
      const totalQueries = queries.length;
      const active = queries.filter(q => q.status === 'Active').length;
      const completed = queries.filter(q => q.status === 'Completed').length;
      const inProgress = queries.filter(q => q.status === 'In Progress').length;
      return {
        total: totalQueries, 
        active, 
        completed, 
        inProgress,
        totalPhotos: Object.values(inspectionPhotos).reduce((sum, photos) => sum + photos.length, 0),
        completedInspections: Object.keys(inspectionCompletions).length
      };
    } catch (err) {
      console.error('QueryContext: Error getting stats:', err);
      return { total: 0, active: 0, completed: 0, inProgress: 0, totalPhotos: 0, completedInspections: 0 };
    }
  };

  const refreshQueries = () => {
    console.log('QueryContext: Manual refresh triggered');
    loadQueries();
    loadNotifications();
    loadInspectionStatuses();
    loadInspectionPhotos();
    loadInspectionCompletions();
  };

  const createNotification = async (inspectorId, notificationData) => {
    try {
      console.log('🔔 QueryContext: Creating notification for inspector:', inspectorId);
      console.log('📋 Notification data:', notificationData);
      
      const notification = createInspectorNotification(inspectorId, notificationData);
      loadNotifications();
      
      console.log('✅ QueryContext: Notification created successfully:', notification.id);
      return notification;
    } catch (error) {
      console.error('❌ QueryContext: Error creating notification:', error);
      throw error;
    }
  };

  const getUnreadNotificationCount = () => {
    try {
      const currentInspectorId = getCurrentInspectorId();
      const unreadCount = notifications.filter(n => 
        n.inspectorId === currentInspectorId && !n.read
      ).length;
      return unreadCount;
    } catch (error) {
      console.error('QueryContext: Error getting unread notification count:', error);
      return 0;
    }
  };

  // Enhanced message sending
  const sendMessage = async (inspectionId, messageData) => {
    try {
      console.log('📤 QueryContext: Sending message:', { inspectionId, messageData });
      
      const newMessage = await sendChatMessage(inspectionId, messageData);
      
      setChatMessages(prev => ({
        ...prev,
        [inspectionId]: [...(prev[inspectionId] || []), newMessage]
      }));

      const eventDetail = { 
        inspectionId, 
        message: newMessage,
        senderId: messageData.senderId,
        senderType: messageData.senderType,
        timestamp: new Date().toISOString()
      };

      window.dispatchEvent(new CustomEvent('chatUpdated', { detail: eventDetail }));
      window.dispatchEvent(new CustomEvent('newChatMessage', { detail: eventDetail }));
      
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('inspection-chat');
        channel.postMessage({
          type: 'NEW_MESSAGE',
          data: eventDetail
        });
      }

      console.log('✅ QueryContext: Message sent successfully:', newMessage.id);
      return newMessage;
    } catch (err) {
      console.error('❌ QueryContext: Error sending message:', err);
      throw err;
    }
  };

  const sendMessageWithStatus = async (inspectionId, messageData) => {
    try {
      console.log('📤 QueryContext: Sending message with status handling:', { inspectionId, messageData });
      
      const newMessage = await sendChatMessageWithStatus(inspectionId, messageData);
      
      setChatMessages(prev => ({
        ...prev,
        [inspectionId]: [...(prev[inspectionId] || []), newMessage]
      }));

      const eventDetail = { 
        inspectionId, 
        message: newMessage,
        senderId: messageData.senderId,
        senderType: messageData.senderType,
        timestamp: new Date().toISOString()
      };

      window.dispatchEvent(new CustomEvent('chatUpdated', { detail: eventDetail }));
      window.dispatchEvent(new CustomEvent('newChatMessage', { detail: eventDetail }));
      
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('inspection-chat');
        channel.postMessage({
          type: 'NEW_MESSAGE',
          data: eventDetail
        });
      }

      console.log('✅ QueryContext: Message sent with status handling:', newMessage.id);
      return newMessage;
    } catch (err) {
      console.error('❌ QueryContext: Error sending message with status:', err);
      throw err;
    }
  };

  const sendMessageWithExtras = async (inspectionId, messageData) => {
    try {
      console.log('📤 QueryContext: Sending message with extras:', { inspectionId, messageData });
      
      const newMessage = await sendChatMessageWithExtras(inspectionId, messageData);
      
      setChatMessages(prev => ({
        ...prev,
        [inspectionId]: [...(prev[inspectionId] || []), newMessage]
      }));

      const eventDetail = { 
        inspectionId, 
        message: newMessage,
        senderId: messageData.senderId,
        senderType: messageData.senderType,
        timestamp: new Date().toISOString()
      };

      window.dispatchEvent(new CustomEvent('chatUpdated', { detail: eventDetail }));
      window.dispatchEvent(new CustomEvent('newChatMessage', { detail: eventDetail }));
      
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('inspection-chat');
        channel.postMessage({
          type: 'NEW_MESSAGE',
          data: eventDetail
        });
      }

      console.log('✅ QueryContext: Message sent with extras:', newMessage.id);
      return newMessage;
    } catch (err) {
      console.error('❌ QueryContext: Error sending message with extras:', err);
      throw err;
    }
  };

  const loadChatMessages = (inspectionId) => {
    try {
      console.log('🔄 QueryContext: Loading chat messages for inspection:', inspectionId);
      const messages = getChatMessages(inspectionId);
      setChatMessages(prev => ({
        ...prev,
        [inspectionId]: messages
      }));
      console.log('📋 QueryContext: Loaded', messages.length, 'messages for inspection:', inspectionId);
      return messages;
    } catch (err) {
      console.error('❌ QueryContext: Error loading chat messages:', err);
      return [];
    }
  };

  const getChatForInspection = (inspectionId) => {
    try {
      if (chatMessages[inspectionId]) {
        return chatMessages[inspectionId];
      }
      
      const messages = getChatMessages(inspectionId);
      setChatMessages(prev => ({
        ...prev,
        [inspectionId]: messages
      }));
      
      return messages;
    } catch (err) {
      console.error('❌ QueryContext: Error getting chat for inspection:', err);
      return [];
    }
  };

  const markChatMessagesRead = async (inspectionId, userId) => {
    try {
      await markMessagesAsRead(inspectionId, userId);
      const updatedMessages = getChatMessages(inspectionId);
      setChatMessages(prev => ({
        ...prev,
        [inspectionId]: updatedMessages
      }));
      
      window.dispatchEvent(new CustomEvent('messagesRead', {
        detail: { inspectionId, userId }
      }));
      
      console.log('📖 QueryContext: Messages marked as read for inspection:', inspectionId);
    } catch (err) {
      console.error('❌ QueryContext: Error marking messages read:', err);
    }
  };

  const handleChatChange = (callback) => {
    const eventHandler = (event) => {
      console.log('🔔 QueryContext: Chat change event received:', event.detail);
      callback(event.detail);
    };

    window.addEventListener('newChatMessage', eventHandler);
    window.addEventListener('chatUpdated', eventHandler);
    window.addEventListener('messagesRead', eventHandler);

    return () => {
      window.removeEventListener('newChatMessage', eventHandler);
      window.removeEventListener('chatUpdated', eventHandler);
      window.removeEventListener('messagesRead', eventHandler);
    };
  };

  const initializeInspectionChatHandler = async (inspectionId, inspectorName, customerName) => {
    try {
      const existingMessages = getChatMessages(inspectionId);
      
      if (existingMessages.length === 0) {
        const systemMessage = {
          senderId: 'system',
          senderName: 'System',
          senderType: 'system',
          message: `🎉 Inspection chat started! Inspector ${inspectorName} is now working with ${customerName}. Feel free to communicate throughout the inspection process.`,
          type: 'system'
        };

        await sendMessage(inspectionId, systemMessage);
        console.log('🆕 QueryContext: Chat initialized for inspection:', inspectionId);
      }
    } catch (err) {
      console.error('❌ QueryContext: Error initializing chat:', err);
    }
  };

  const getChatStats = (inspectionId, userId) => {
    try {
      const messages = getChatForInspection(inspectionId);
      const unreadCount = messages.filter(msg => 
        msg.senderId !== userId && !msg.read
      ).length;
      
      return {
        totalMessages: messages.length,
        unreadCount,
        lastMessage: messages.length > 0 ? messages[messages.length - 1] : null,
        hasUnread: unreadCount > 0
      };
    } catch (err) {
      console.error('❌ QueryContext: Error getting chat stats:', err);
      return { totalMessages: 0, unreadCount: 0, lastMessage: null, hasUnread: false };
    }
  };

  const startMessageListener = (userId, userType, onNewMessage) => {
    const handleNewMessage = (event) => {
      const { message, inspectionId } = event.detail;
      
      if (message.senderId !== userId) {
        console.log('🔔 New message received for user:', userId, message);
        
        if (onNewMessage) {
          onNewMessage({
            inspectionId,
            message,
            unreadCount: getChatStats(inspectionId, userId).unreadCount
          });
        }
        
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`New message from ${message.senderName}`, {
            body: message.message,
            icon: '/favicon.ico'
          });
        }
      }
    };

    window.addEventListener('newChatMessage', handleNewMessage);
    
    return () => {
      window.removeEventListener('newChatMessage', handleNewMessage);
    };
  };

  // Status management functions
  const updateInspectionStatusHandler = async (inspectionId, newStatus) => {
    try {
      console.log('📊 QueryContext: Updating inspection status:', { inspectionId, newStatus });
      
      const statusUpdate = updateInspectionStatus(inspectionId, newStatus);
      
      setInspectionStatuses(prev => ({
        ...prev,
        [inspectionId]: statusUpdate
      }));
      
      const inspectionPhases = [
        'Inspection Started',
        'Sample Collected', 
        'Analysis',
        'Report Approved',
        'Completed'
      ];
      
      const statusMessage = {
        senderId: 'system',
        senderName: 'System',
        senderType: 'system',
        message: `Status updated to: ${inspectionPhases[newStatus]}`,
        type: 'status-update',
        statusId: newStatus
      };
      
      await sendMessageWithStatus(inspectionId, statusMessage);
      
      // Handle completion when status reaches "Report Approved" or "Completed"
      if (newStatus === 3) {
        await completeInspectionHandler(inspectionId, {
          finalStatus: 'Report Approved',
          completedViaStatusUpdate: true
        });
      } else if (newStatus === 4) {
        await completeInspectionHandler(inspectionId, {
          finalStatus: 'Completed',
          completedViaStatusUpdate: true
        });
      }
      
      console.log('✅ QueryContext: Status updated successfully');
      return statusUpdate;
    } catch (error) {
      console.error('❌ QueryContext: Error updating status:', error);
      throw error;
    }
  };

  const getStatus = (inspectionId) => {
    try {
      if (inspectionStatuses[inspectionId]) {
        return inspectionStatuses[inspectionId];
      }
      
      const statusData = getInspectionStatus(inspectionId);
      
      setInspectionStatuses(prev => ({
        ...prev,
        [inspectionId]: statusData
      }));
      
      return statusData;
    } catch (error) {
      console.error('❌ QueryContext: Error getting status:', error);
      return { status: 0, statusHistory: [] };
    }
  };

  const getAllStatuses = () => {
    try {
      return getAllInspectionStatuses();
    } catch (error) {
      console.error('❌ QueryContext: Error getting all statuses:', error);
      return {};
    }
  };

  const formatQueryForDisplay = (query) => {
    const getUrgencyColor = (urgency) => {
      switch (urgency?.toLowerCase()) {
        case 'high': return 'bg-red-100 text-red-700';
        case 'medium': return 'bg-yellow-100 text-yellow-700';
        case 'low': return 'bg-green-100 text-green-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    };

    const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case 'active': return 'bg-blue-100 text-blue-700';
        case 'in progress': return 'bg-orange-100 text-orange-700';
        case 'completed': return 'bg-green-100 text-green-700';
        case 'cancelled': return 'bg-gray-100 text-gray-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    };

    return {
      ...query,
      urgencyColor: getUrgencyColor(query.urgency),
      statusColor: getStatusColor(query.status),
      formattedDate: new Date(query.submittedAt).toLocaleDateString(),
      formattedTime: new Date(query.submittedAt).toLocaleTimeString(),
      commodityDisplay: query.riceType || query.subCommodity || query.commodity || 'Not specified',
      volumeDisplay: `${query.volume || 0} ${query.unit || 'units'}`,
      locationDisplay: `${query.location || ''}, ${query.country || ''}`.replace(/^, |, $/, ''),
      inspectionTypeDisplay: query.inspectionTypes?.map(type => 
        type === 'physical' ? 'Physical Inspection' : 'Chemical Testing'
      ).join(', ') || 'Not specified'
    };
  };

  // Context value with all functions and state
  const value = {
    // State
    queries,
    loading,
    error,
    notifications,
    chatMessages,
    inspectionStatuses,
    inspectionPhotos,
    inspectionCompletions,

    // Query functions
    submitQuery,
    placeBid,
    confirmInspector,
    updateStatus,
    loadQueries,
    refreshQueries,
    getActiveQueriesForInspector,
    getActiveInspectionsForInspector,
    getCustomerQueries,
    getCustomerActiveInspections,
    getQuery,
    getQueryStats,

    // Notification functions
    markNotificationRead,
    createNotification,
    getUnreadNotificationCount,

    // Chat functions
    sendMessage,
    sendMessageWithStatus,
    sendMessageWithExtras,
    loadChatMessages,
    getChatForInspection,
    markChatMessagesRead,
    onChatChange: handleChatChange,
    initializeInspectionChat: initializeInspectionChatHandler,
    getChatStats,
    startMessageListener,

    // Status functions
    updateInspectionStatus: updateInspectionStatusHandler,
    getStatus,
    getAllStatuses,

    // Photo management functions
    uploadPhotoToInspection,
    removePhotoFromInspection: removePhotoFromInspectionHandler,
    getInspectionPhotos: getInspectionPhotosHandler,

    // Completion management functions
    completeInspection: completeInspectionHandler,
    getInspectionCompletion: getInspectionCompletionHandler,
    isInspectionCompleted: isInspectionCompletedHandler,

    // Report generation functions
    generateReport: generateReportHandler,
    getInspectionReports: getInspectionReportsHandler,
    getReportById: getReportById,

    // Enhanced completion functions
    completeInspectionWithEvents,
    handleInspectionCompletionFromUI,
    triggerCustomerCompletionPopup,
    triggerInspectorCompletionConfirm,

    // Utility functions
    getCurrentInspectorId,
    getCurrentCustomerId,
    clearError: () => setError(null),
    formatQueryForDisplay
  };

  useEffect(() => {
    window.queryContext = value;
    return () => {
      delete window.queryContext;
    };
  }, [value]);

  return (
    <QueryContext.Provider value={value}>
      {children}
    </QueryContext.Provider>
  );
};

export default QueryContext;