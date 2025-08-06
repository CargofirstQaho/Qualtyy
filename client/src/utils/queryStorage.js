

// // Storage keys
// const STORAGE_KEY = 'inspection_queries';
// const NOTIFICATIONS_KEY = 'inspector_notifications';
// const CHAT_MESSAGES_KEY = 'inspection_chat_messages';
// const INSPECTION_STATUS_KEY = 'inspection_status';
// const INSPECTION_PHOTOS_KEY = 'inspection_photos';
// const INSPECTION_COMPLETION_KEY = 'inspection_completion';
// const REPORTS_KEY = 'inspection_reports';

// // Storage type detection
// let storageType = 'memory';
// let queriesStorage = [];
// let notificationsStorage = [];
// let chatMessagesStorage = {};
// let inspectionStatusStorage = {};
// let inspectionPhotosStorage = {};
// let inspectionCompletionsStorage = {};
// let reportsStorage = {};

// try {
//   const testKey = '__storage_test__';
//   localStorage.setItem(testKey, 'test');
//   localStorage.removeItem(testKey);
//   storageType = 'localStorage';
// } catch (e) {
//   try {
//     const testKey = '__storage_test__';
//     sessionStorage.setItem(testKey, 'test');
//     sessionStorage.removeItem(testKey);
//     storageType = 'sessionStorage';
//   } catch (e) {
//     storageType = 'memory';
//   }
// }

// console.log('QueryStorage: Using storage type:', storageType);

// // Storage interface
// const storage = {
//   getItem: (key) => {
//     if (storageType === 'localStorage') {
//       return localStorage.getItem(key);
//     } else if (storageType === 'sessionStorage') {
//       return sessionStorage.getItem(key);
//     } else {
//       // Memory storage fallback
//       switch (key) {
//         case STORAGE_KEY:
//           return queriesStorage.length > 0 ? JSON.stringify(queriesStorage) : null;
//         case NOTIFICATIONS_KEY:
//           return notificationsStorage.length > 0 ? JSON.stringify(notificationsStorage) : null;
//         case CHAT_MESSAGES_KEY:
//           return Object.keys(chatMessagesStorage).length > 0 ? JSON.stringify(chatMessagesStorage) : null;
//         case INSPECTION_STATUS_KEY:
//           return Object.keys(inspectionStatusStorage).length > 0 ? JSON.stringify(inspectionStatusStorage) : null;
//         case INSPECTION_PHOTOS_KEY:
//           return Object.keys(inspectionPhotosStorage).length > 0 ? JSON.stringify(inspectionPhotosStorage) : null;
//         case INSPECTION_COMPLETION_KEY:
//           return Object.keys(inspectionCompletionsStorage).length > 0 ? JSON.stringify(inspectionCompletionsStorage) : null;
//         case REPORTS_KEY:
//           return Object.keys(reportsStorage).length > 0 ? JSON.stringify(reportsStorage) : null;
//         default:
//           return null;
//       }
//     }
//   },
//   setItem: (key, value) => {
//     if (storageType === 'localStorage') {
//       localStorage.setItem(key, value);
//       window.dispatchEvent(new CustomEvent('localStorageChange', {
//         detail: { key, value }
//       }));
//     } else if (storageType === 'sessionStorage') {
//       sessionStorage.setItem(key, value);
//     } else {
//       // Memory storage fallback
//       try {
//         switch (key) {
//           case STORAGE_KEY:
//             queriesStorage = JSON.parse(value);
//             break;
//           case NOTIFICATIONS_KEY:
//             notificationsStorage = JSON.parse(value);
//             break;
//           case CHAT_MESSAGES_KEY:
//             chatMessagesStorage = JSON.parse(value);
//             break;
//           case INSPECTION_STATUS_KEY:
//             inspectionStatusStorage = JSON.parse(value);
//             break;
//           case INSPECTION_PHOTOS_KEY:
//             inspectionPhotosStorage = JSON.parse(value);
//             break;
//           case INSPECTION_COMPLETION_KEY:
//             inspectionCompletionsStorage = JSON.parse(value);
//             break;
//           case REPORTS_KEY:
//             reportsStorage = JSON.parse(value);
//             break;
//         }
//       } catch (e) {
//         console.error('QueryStorage: Error parsing data for in-memory storage:', e);
//       }
//     }
//   }
// };

// // ID generators
// const generateQueryId = () => {
//   return `INQ-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
// };

// const generateNotificationId = () => {
//   return `NOT-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
// };

// const generateBidId = () => {
//   return `BID-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
// };

// const generateMessageId = () => {
//   return `MSG-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
// };

// const generateReportId = () => {
//   return `RPT-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
// };

// // Load/Save functions
// const loadQueries = () => {
//   try {
//     const stored = storage.getItem(STORAGE_KEY);
//     const queries = stored ? JSON.parse(stored) : [];
//     console.log('QueryStorage: Loaded', queries.length, 'queries from storage');
//     return queries;
//   } catch (e) {
//     console.error('QueryStorage: Error loading queries from storage:', e);
//     return [];
//   }
// };

// const saveQueries = (queries) => {
//   try {
//     storage.setItem(STORAGE_KEY, JSON.stringify(queries));
//     console.log('QueryStorage: Saved', queries.length, 'queries to storage');
//   } catch (e) {
//     console.error('QueryStorage: Error saving queries to storage:', e);
//   }
// };

// const loadNotifications = () => {
//   try {
//     const stored = storage.getItem(NOTIFICATIONS_KEY);
//     const notifications = stored ? JSON.parse(stored) : [];
//     console.log('QueryStorage: Loaded', notifications.length, 'notifications from storage');
//     return notifications;
//   } catch (e) {
//     console.error('QueryStorage: Error loading notifications from storage:', e);
//     return [];
//   }
// };

// const saveNotifications = (notifications) => {
//   try {
//     storage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
//     console.log('QueryStorage: Saved', notifications.length, 'notifications to storage');
//   } catch (e) {
//     console.error('QueryStorage: Error saving notifications to storage:', e);
//   }
// };

// const loadChatMessages = () => {
//   try {
//     const stored = storage.getItem(CHAT_MESSAGES_KEY);
//     return stored ? JSON.parse(stored) : {};
//   } catch (e) {
//     console.error('QueryStorage: Error loading chat messages:', e);
//     return {};
//   }
// };

// const saveChatMessages = (chatData) => {
//   try {
//     storage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(chatData));
//     console.log('QueryStorage: Chat messages saved');
//   } catch (e) {
//     console.error('QueryStorage: Error saving chat messages:', e);
//   }
// };

// const loadInspectionStatuses = () => {
//   try {
//     const stored = storage.getItem(INSPECTION_STATUS_KEY);
//     return stored ? JSON.parse(stored) : {};
//   } catch (e) {
//     console.error('QueryStorage: Error loading inspection statuses:', e);
//     return {};
//   }
// };

// const saveInspectionStatuses = (statuses) => {
//   try {
//     storage.setItem(INSPECTION_STATUS_KEY, JSON.stringify(statuses));
//     console.log('QueryStorage: Saved inspection statuses');
//   } catch (e) {
//     console.error('QueryStorage: Error saving inspection statuses:', e);
//   }
// };

// const loadInspectionPhotos = () => {
//   try {
//     const stored = storage.getItem(INSPECTION_PHOTOS_KEY);
//     return stored ? JSON.parse(stored) : {};
//   } catch (e) {
//     console.error('QueryStorage: Error loading photos:', e);
//     return {};
//   }
// };

// const saveInspectionPhotos = (photosData) => {
//   try {
//     storage.setItem(INSPECTION_PHOTOS_KEY, JSON.stringify(photosData));
//     console.log('QueryStorage: Saved inspection photos');
//   } catch (e) {
//     console.error('QueryStorage: Error saving photos:', e);
//   }
// };

// const loadInspectionCompletions = () => {
//   try {
//     const stored = storage.getItem(INSPECTION_COMPLETION_KEY);
//     return stored ? JSON.parse(stored) : {};
//   } catch (e) {
//     console.error('QueryStorage: Error loading completions:', e);
//     return {};
//   }
// };

// const saveInspectionCompletions = (completionsData) => {
//   try {
//     storage.setItem(INSPECTION_COMPLETION_KEY, JSON.stringify(completionsData));
//     console.log('QueryStorage: Saved inspection completions');
//   } catch (e) {
//     console.error('QueryStorage: Error saving completions:', e);
//   }
// };

// const loadReports = () => {
//   try {
//     const stored = storage.getItem(REPORTS_KEY);
//     return stored ? JSON.parse(stored) : {};
//   } catch (e) {
//     console.error('QueryStorage: Error loading reports:', e);
//     return {};
//   }
// };

// const saveReports = (reportsData) => {
//   try {
//     storage.setItem(REPORTS_KEY, JSON.stringify(reportsData));
//     console.log('QueryStorage: Saved reports');
//   } catch (e) {
//     console.error('QueryStorage: Error saving reports:', e);
//   }
// };

// // =====================
// // QUERY FUNCTIONS
// // =====================

// export const saveQuery = (queryData) => {
//   const currentQueries = loadQueries();
  
//   const newQuery = {
//     id: generateQueryId(),
//     ...queryData,
//     submittedAt: new Date().toISOString(),
//     status: 'Active',
//     bidCount: 0,
//     bids: [],
//     confirmedInspectorId: null,
//     confirmedBidId: null
//   };
  
//   currentQueries.push(newQuery);
//   saveQueries(currentQueries);
  
//   window.dispatchEvent(new CustomEvent('queriesUpdated', {
//     detail: { type: 'new_query', query: newQuery }
//   }));
  
//   console.log('QueryStorage: Created new query:', newQuery.id);
//   return newQuery;
// };

// export const getAllQueries = () => {
//   return loadQueries();
// };

// export const getQueriesByStatus = (status) => {
//   const allQueries = loadQueries();
//   return allQueries.filter(query => query.status === status);
// };

// export const getActiveQueries = () => {
//   const allQueries = loadQueries();
//   return allQueries.filter(query => query.status === 'Active');
// };

// export const updateQueryStatus = (queryId, newStatus) => {
//   const allQueries = loadQueries();
//   const queryIndex = allQueries.findIndex(query => query.id === queryId);
  
//   if (queryIndex !== -1) {
//     allQueries[queryIndex].status = newStatus;
//     allQueries[queryIndex].updatedAt = new Date().toISOString();
//     saveQueries(allQueries);
    
//     window.dispatchEvent(new CustomEvent('queriesUpdated', {
//       detail: { type: 'status_update', queryId, newStatus }
//     }));
    
//     console.log('QueryStorage: Updated query status:', queryId, 'to', newStatus);
//     return allQueries[queryIndex];
//   }
//   console.warn('QueryStorage: Query not found for status update:', queryId);
//   return null;
// };

// export const addBidToQuery = (queryId, bidData) => {
//   const allQueries = loadQueries();
//   const queryIndex = allQueries.findIndex(query => query.id === queryId);
  
//   if (queryIndex !== -1) {
//     const bid = {
//       id: generateBidId(),
//       ...bidData,
//       submittedAt: new Date().toISOString(),
//       status: 'pending'
//     };
    
//     allQueries[queryIndex].bids.push(bid);
//     allQueries[queryIndex].bidCount = allQueries[queryIndex].bids.length;
//     allQueries[queryIndex].updatedAt = new Date().toISOString();
    
//     saveQueries(allQueries);
    
//     window.dispatchEvent(new CustomEvent('queriesUpdated', {
//       detail: { type: 'new_bid', queryId, bid }
//     }));
    
//     console.log('QueryStorage: Added bid to query:', queryId, 'bid:', bid.id);
//     return allQueries[queryIndex];
//   }
//   console.warn('QueryStorage: Query not found for bid addition:', queryId);
//   return null;
// };

// export const confirmInspectorForQuery = (queryId, bidId, inspectorId) => {
//   try {
//     console.log('🔄 Storage: Confirming inspector for query:', { queryId, bidId, inspectorId });
    
//     const queries = getAllQueries();
//     const queryIndex = queries.findIndex(q => q.id === queryId);
    
//     if (queryIndex === -1) {
//       console.error('❌ Storage: Query not found:', queryId);
//       return null;
//     }
    
//     const query = queries[queryIndex];
//     const bid = query.bids?.find(b => b.id === bidId && b.inspectorId === inspectorId);
    
//     if (!bid) {
//       console.error('❌ Storage: Bid not found:', { bidId, inspectorId });
//       return null;
//     }
    
//     const updatedQuery = {
//       ...query,
//       confirmedInspectorId: inspectorId,
//       confirmedBidId: bidId,
//       confirmedAt: new Date().toISOString(),
//       status: 'In Progress',
//       updatedAt: new Date().toISOString()
//     };
    
//     const updatedBids = query.bids.map(b => ({
//       ...b,
//       status: b.id === bidId ? 'confirmed' : 'rejected'
//     }));
    
//     updatedQuery.bids = updatedBids;
    
//     queries[queryIndex] = updatedQuery;
//     saveQueries(queries);
    
//     console.log('✅ Storage: Inspector confirmed successfully');
    
//     window.dispatchEvent(new CustomEvent('queriesUpdated', {
//       detail: { type: 'inspector_confirmed', queryId, inspectorId, bidId }
//     }));
    
//     window.dispatchEvent(new CustomEvent('bidConfirmed', {
//       detail: { 
//         queryId, 
//         inspectorId, 
//         bidId, 
//         query: updatedQuery 
//       }
//     }));
    
//     return updatedQuery;
//   } catch (error) {
//     console.error('❌ Storage: Error confirming inspector:', error);
//     return null;
//   }
// };

// export const getInspectorActiveInspections = (inspectorId) => {
//   const allQueries = loadQueries();
//   return allQueries.filter(query => 
//     query.confirmedInspectorId === inspectorId && 
//     (query.status === 'In Progress' || query.status === 'Scheduled')
//   );
// };

// export const getQueryById = (queryId) => {
//   const allQueries = loadQueries();
//   return allQueries.find(query => query.id === queryId);
// };

// export const deleteQuery = (queryId) => {
//   const allQueries = loadQueries();
//   const queryIndex = allQueries.findIndex(query => query.id === queryId);
  
//   if (queryIndex !== -1) {
//     const deletedQuery = allQueries.splice(queryIndex, 1)[0];
//     saveQueries(allQueries);
    
//     window.dispatchEvent(new CustomEvent('queriesUpdated', {
//       detail: { type: 'query_deleted', queryId }
//     }));
    
//     console.log('QueryStorage: Deleted query:', queryId);
//     return deletedQuery;
//   }
//   console.warn('QueryStorage: Query not found for deletion:', queryId);
//   return null;
// };

// export const clearAllQueries = () => {
//   saveQueries([]);
//   window.dispatchEvent(new CustomEvent('queriesUpdated', {
//     detail: { type: 'queries_cleared' }
//   }));
//   console.log('QueryStorage: Cleared all queries');
// };

// export const clearAllNotifications = () => {
//   saveNotifications([]);
//   console.log('QueryStorage: Cleared all notifications');
// };

// export const clearAllData = () => {
//   saveQueries([]);
//   saveNotifications([]);
//   saveChatMessages({});
//   saveInspectionStatuses({});
//   saveInspectionPhotos({});
//   saveInspectionCompletions({});
//   saveReports({});
  
//   window.dispatchEvent(new CustomEvent('allDataCleared'));
//   console.log('QueryStorage: Cleared all data');
// };

// // =====================
// // NOTIFICATION FUNCTIONS
// // =====================

// export const createInspectorNotification = (inspectorId, notificationData) => {
//   try {
//     const currentNotifications = loadNotifications();
    
//     const newNotification = {
//       id: generateNotificationId(),
//       inspectorId: inspectorId,
//       ...notificationData,
//       createdAt: new Date().toISOString(),
//       read: false
//     };
    
//     currentNotifications.push(newNotification);
//     saveNotifications(currentNotifications);
    
//     window.dispatchEvent(new CustomEvent('newNotification', {
//       detail: { notification: newNotification }
//     }));
    
//     console.log('QueryStorage: Created notification:', newNotification.id, 'for inspector:', inspectorId);
//     return newNotification;
//   } catch (error) {
//     console.error('QueryStorage: Error creating notification:', error);
//     throw error;
//   }
// };

// export const getInspectorNotifications = (inspectorId) => {
//   const allNotifications = loadNotifications();
//   return allNotifications
//     .filter(notification => notification.inspectorId === inspectorId)
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
// };

// export const markNotificationAsRead = (notificationId) => {
//   const allNotifications = loadNotifications();
//   const notificationIndex = allNotifications.findIndex(n => n.id === notificationId);
  
//   if (notificationIndex !== -1) {
//     allNotifications[notificationIndex].read = true;
//     allNotifications[notificationIndex].readAt = new Date().toISOString();
//     saveNotifications(allNotifications);
    
//     window.dispatchEvent(new CustomEvent('notificationRead', {
//       detail: { notificationId }
//     }));
    
//     console.log('QueryStorage: Marked notification as read:', notificationId);
//     return allNotifications[notificationIndex];
//   }
//   console.warn('QueryStorage: Notification not found for read status update:', notificationId);
//   return null;
// };

// export const deleteNotification = (notificationId) => {
//   const allNotifications = loadNotifications();
//   const notificationIndex = allNotifications.findIndex(n => n.id === notificationId);
  
//   if (notificationIndex !== -1) {
//     const deletedNotification = allNotifications.splice(notificationIndex, 1)[0];
//     saveNotifications(allNotifications);
    
//     window.dispatchEvent(new CustomEvent('notificationDeleted', {
//       detail: { notificationId }
//     }));
    
//     console.log('QueryStorage: Deleted notification:', notificationId);
//     return deletedNotification;
//   }
//   console.warn('QueryStorage: Notification not found for deletion:', notificationId);
//   return null;
// };

// export const getUnreadNotificationCount = (inspectorId) => {
//   const notifications = getInspectorNotifications(inspectorId);
//   return notifications.filter(n => !n.read).length;
// };

// // =====================
// // CHAT FUNCTIONS
// // =====================

// export const getChatMessages = (inspectionId) => {
//   const allChats = loadChatMessages();
//   return allChats[inspectionId] || [];
// };

// export const sendChatMessage = (inspectionId, messageData) => {
//   try {
//     const allChats = loadChatMessages();
    
//     const newMessage = {
//       id: generateMessageId(),
//       ...messageData,
//       timestamp: new Date().toISOString(),
//       read: false
//     };
    
//     if (!allChats[inspectionId]) {
//       allChats[inspectionId] = [];
//     }
    
//     allChats[inspectionId].push(newMessage);
//     saveChatMessages(allChats);
    
//     const eventDetail = { inspectionId, message: newMessage };
    
//     window.dispatchEvent(new CustomEvent('newChatMessage', { detail: eventDetail }));
//     window.dispatchEvent(new CustomEvent('chatUpdated', { detail: eventDetail }));
    
//     if (typeof BroadcastChannel !== 'undefined') {
//       const channel = new BroadcastChannel('inspection-chat');
//       channel.postMessage({
//         type: 'NEW_MESSAGE',
//         data: eventDetail
//       });
//     }
    
//     console.log('✅ QueryStorage: Message sent with real-time events:', newMessage.id);
//     return newMessage;
    
//   } catch (error) {
//     console.error('❌ QueryStorage: Error sending message:', error);
//     throw error;
//   }
// };

// export const markMessagesAsRead = (inspectionId, userId) => {
//   try {
//     const allChats = loadChatMessages();
    
//     if (allChats[inspectionId]) {
//       allChats[inspectionId] = allChats[inspectionId].map(message => {
//         if (message.senderId !== userId) {
//           return { ...message, read: true, readAt: new Date().toISOString() };
//         }
//         return message;
//       });
      
//       saveChatMessages(allChats);
      
//       window.dispatchEvent(new CustomEvent('messagesRead', {
//         detail: { inspectionId, userId }
//       }));
//     }
    
//   } catch (error) {
//     console.error('QueryStorage: Error marking messages as read:', error);
//   }
// };

// export const getUnreadMessageCount = (inspectionId, userId) => {
//   try {
//     const messages = getChatMessages(inspectionId);
//     return messages.filter(msg => msg.senderId !== userId && !msg.read).length;
//   } catch (error) {
//     console.error('QueryStorage: Error getting unread count:', error);
//     return 0;
//   }
// };

// export const initializeInspectionChat = (inspectionId, inspectorData, customerData) => {
//   try {
//     const existingMessages = getChatMessages(inspectionId);
    
//     if (existingMessages.length === 0) {
//       const systemMessage = {
//         senderId: 'system',
//         senderName: 'System',
//         senderType: 'system',
//         message: `🎉 Inspection chat started! Inspector ${inspectorData} is now working with ${customerData}. Feel free to communicate throughout the inspection process.`,
//         type: 'system'
//       };

//       return sendChatMessage(inspectionId, systemMessage);
//     }
    
//   } catch (error) {
//     console.error('QueryStorage: Error initializing chat:', error);
//     throw error;
//   }
// };

// export const deleteChatMessage = (inspectionId, messageId) => {
//   try {
//     const allChats = loadChatMessages();
    
//     if (allChats[inspectionId]) {
//       const messageIndex = allChats[inspectionId].findIndex(msg => msg.id === messageId);
      
//       if (messageIndex !== -1) {
//         const deletedMessage = allChats[inspectionId].splice(messageIndex, 1)[0];
//         saveChatMessages(allChats);
        
//         window.dispatchEvent(new CustomEvent('chatMessageDeleted', {
//           detail: { inspectionId, messageId }
//         }));
        
//         console.log('QueryStorage: Deleted chat message:', messageId);
//         return deletedMessage;
//       }
//     }
    
//     console.warn('QueryStorage: Message not found for deletion:', messageId);
//     return null;
//   } catch (error) {
//     console.error('QueryStorage: Error deleting message:', error);
//     throw error;
//   }
// };

// export const clearChatHistory = (inspectionId) => {
//   try {
//     const allChats = loadChatMessages();
    
//     if (allChats[inspectionId]) {
//       delete allChats[inspectionId];
//       saveChatMessages(allChats);
      
//       window.dispatchEvent(new CustomEvent('chatHistoryCleared', {
//         detail: { inspectionId }
//       }));
      
//       console.log('QueryStorage: Cleared chat history for:', inspectionId);
//     }
//   } catch (error) {
//     console.error('QueryStorage: Error clearing chat history:', error);
//     throw error;
//   }
// };

// // =====================
// // STATUS MANAGEMENT
// // =====================

// export const updateInspectionStatus = (inspectionId, newStatus) => {
//   try {
//     const statuses = loadInspectionStatuses();
    
//     const statusUpdate = {
//       status: newStatus,
//       updatedAt: new Date().toISOString(),
//       statusHistory: [
//         ...(statuses[inspectionId]?.statusHistory || []),
//         {
//           status: newStatus,
//           timestamp: new Date().toISOString()
//         }
//       ]
//     };
    
//     statuses[inspectionId] = statusUpdate;
//     saveInspectionStatuses(statuses);
    
//     window.dispatchEvent(new CustomEvent('inspectionStatusUpdated', {
//       detail: { inspectionId, newStatus, statusUpdate }
//     }));
    
//     console.log('QueryStorage: Updated inspection status:', inspectionId, 'to', newStatus);
//     return statusUpdate;
//   } catch (error) {
//     console.error('QueryStorage: Error updating inspection status:', error);
//     throw error;
//   }
// };

// export const getInspectionStatus = (inspectionId) => {
//   try {
//     const statuses = loadInspectionStatuses();
//     return statuses[inspectionId] || { status: 0, statusHistory: [] };
//   } catch (error) {
//     console.error('QueryStorage: Error getting inspection status:', error);
//     return { status: 0, statusHistory: [] };
//   }
// };

// export const getAllInspectionStatuses = () => {
//   try {
//     return loadInspectionStatuses();
//   } catch (error) {
//     console.error('QueryStorage: Error getting all inspection statuses:', error);
//     return {};
//   }
// };

// export const sendChatMessageWithStatus = (inspectionId, messageData) => {
//   try {
//     const allChats = loadChatMessages();
    
//     const newMessage = {
//       id: generateMessageId(),
//       ...messageData,
//       timestamp: new Date().toISOString(),
//       read: false
//     };
    
//     if (!allChats[inspectionId]) {
//       allChats[inspectionId] = [];
//     }
    
//     allChats[inspectionId].push(newMessage);
    
//     if (messageData.type === 'status-update' && messageData.statusId !== undefined) {
//       updateInspectionStatus(inspectionId, messageData.statusId);
//     }
    
//     saveChatMessages(allChats);
    
//     const eventDetail = { inspectionId, message: newMessage };
    
//     window.dispatchEvent(new CustomEvent('newChatMessage', { detail: eventDetail }));
//     window.dispatchEvent(new CustomEvent('chatUpdated', { detail: eventDetail }));
    
//     if (typeof BroadcastChannel !== 'undefined') {
//       const channel = new BroadcastChannel('inspection-chat');
//       channel.postMessage({
//         type: 'NEW_MESSAGE',
//         data: eventDetail
//       });
//     }
    
//     console.log('✅ QueryStorage: Message sent with status handling:', newMessage.id);
//     return newMessage;
    
//   } catch (error) {
//     console.error('❌ QueryStorage: Error sending message with status:', error);
//     throw error;
//   }
// };

// export const clearInspectionStatus = (inspectionId) => {
//   try {
//     const statuses = loadInspectionStatuses();
//     delete statuses[inspectionId];
//     saveInspectionStatuses(statuses);
    
//     window.dispatchEvent(new CustomEvent('inspectionStatusUpdated', {
//       detail: { inspectionId, newStatus: 0, cleared: true }
//     }));
    
//     console.log('QueryStorage: Cleared inspection status for:', inspectionId);
//   } catch (error) {
//     console.error('QueryStorage: Error clearing inspection status:', error);
//   }
// };

// // =====================
// // PHOTO MANAGEMENT
// // =====================

// export const addPhotoToInspection = (inspectionId, photoData) => {
//   try {
//     const allPhotos = loadInspectionPhotos();
    
//     if (!allPhotos[inspectionId]) {
//       allPhotos[inspectionId] = [];
//     }
    
//     const newPhoto = {
//       id: Date.now() + Math.random().toString(36).substr(2, 5),
//       ...photoData,
//       uploadedAt: new Date().toISOString()
//     };
    
//     allPhotos[inspectionId].push(newPhoto);
//     saveInspectionPhotos(allPhotos);
    
//     window.dispatchEvent(new CustomEvent('photoUploaded', {
//       detail: { inspectionId, photo: newPhoto }
//     }));
    
//     console.log('✅ Photo added to inspection:', inspectionId);
//     return newPhoto;
//   } catch (error) {
//     console.error('❌ Error adding photo:', error);
//     throw error;
//   }
// };

// export const getInspectionPhotos = (inspectionId) => {
//   try {
//     const allPhotos = loadInspectionPhotos();
//     return allPhotos[inspectionId] || [];
//   } catch (error) {
//     console.error('❌ Error getting photos:', error);
//     return [];
//   }
// };

// export const removePhotoFromInspection = (inspectionId, photoId) => {
//   try {
//     const allPhotos = loadInspectionPhotos();
    
//     if (allPhotos[inspectionId]) {
//       allPhotos[inspectionId] = allPhotos[inspectionId].filter(photo => photo.id !== photoId);
//       saveInspectionPhotos(allPhotos);
      
//       window.dispatchEvent(new CustomEvent('photoRemoved', {
//         detail: { inspectionId, photoId }
//       }));
      
//       console.log('✅ Photo removed from inspection:', inspectionId);
//     }
//   } catch (error) {
//     console.error('❌ Error removing photo:', error);
//     throw error;
//   }
// };

// export const updatePhotoDetails = (inspectionId, photoId, updateData) => {
//   try {
//     const allPhotos = loadInspectionPhotos();
    
//     if (allPhotos[inspectionId]) {
//       const photoIndex = allPhotos[inspectionId].findIndex(photo => photo.id === photoId);
      
//       if (photoIndex !== -1) {
//         allPhotos[inspectionId][photoIndex] = {
//           ...allPhotos[inspectionId][photoIndex],
//           ...updateData,
//           updatedAt: new Date().toISOString()
//         };
        
//         saveInspectionPhotos(allPhotos);
        
//         window.dispatchEvent(new CustomEvent('photoUpdated', {
//           detail: { inspectionId, photoId, updateData }
//         }));
        
//         console.log('✅ Photo updated:', photoId);
//         return allPhotos[inspectionId][photoIndex];
//       }
//     }
    
//     console.warn('❌ Photo not found for update:', photoId);
//     return null;
//   } catch (error) {
//     console.error('❌ Error updating photo:', error);
//     throw error;
//   }
// };

// export const getPhotoById = (inspectionId, photoId) => {
//   try {
//     const photos = getInspectionPhotos(inspectionId);
//     return photos.find(photo => photo.id === photoId) || null;
//   } catch (error) {
//     console.error('❌ Error getting photo by ID:', error);
//     return null;
//   }
// };

// export const getPhotosByCategory = (inspectionId, category) => {
//   try {
//     const photos = getInspectionPhotos(inspectionId);
//     return photos.filter(photo => photo.category === category);
//   } catch (error) {
//     console.error('❌ Error getting photos by category:', error);
//     return [];
//   }
// };

// // =====================
// // COMPLETION MANAGEMENT
// // =====================

// export const completeInspection = (inspectionId, completionData) => {
//   try {
//     const completions = loadInspectionCompletions();
    
//     const completion = {
//       id: inspectionId,
//       completedAt: new Date().toISOString(),
//       ...completionData
//     };
    
//     completions[inspectionId] = completion;
//     saveInspectionCompletions(completions);
    
//     updateInspectionStatus(inspectionId, 3);
//     updateQueryStatus(inspectionId, 'Completed');
    
//     const completionMessage = {
//       senderId: 'system',
//       senderName: 'System',
//       senderType: 'system',
//       message: '🎉 Inspection has been completed successfully! Final report is ready for download.',
//       type: 'completion',
//       completionData: completion
//     };
    
//     sendChatMessage(inspectionId, completionMessage);
    
//     window.dispatchEvent(new CustomEvent('inspectionCompleted', {
//       detail: { 
//         inspectionId, 
//         completion,
//         showToCustomer: true,
//         showToInspector: true 
//       }
//     }));
    
//     console.log('✅ Inspection completed:', inspectionId);
//     return completion;
//   } catch (error) {
//     console.error('❌ Error completing inspection:', error);
//     throw error;
//   }
// };

// export const getInspectionCompletion = (inspectionId) => {
//   try {
//     const completions = loadInspectionCompletions();
//     return completions[inspectionId] || null;
//   } catch (error) {
//     console.error('❌ Error getting completion data:', error);
//     return null;
//   }
// };

// export const isInspectionCompleted = (inspectionId) => {
//   try {
//     const completion = getInspectionCompletion(inspectionId);
//     return !!completion;
//   } catch (error) {
//     console.error('❌ Error checking completion status:', error);
//     return false;
//   }
// };

// export const updateCompletionData = (inspectionId, updateData) => {
//   try {
//     const completions = loadInspectionCompletions();
    
//     if (completions[inspectionId]) {
//       completions[inspectionId] = {
//         ...completions[inspectionId],
//         ...updateData,
//         updatedAt: new Date().toISOString()
//       };
      
//       saveInspectionCompletions(completions);
      
//       window.dispatchEvent(new CustomEvent('completionUpdated', {
//         detail: { inspectionId, updateData }
//       }));
      
//       console.log('✅ Completion data updated:', inspectionId);
//       return completions[inspectionId];
//     }
    
//     console.warn('❌ Completion not found for update:', inspectionId);
//     return null;
//   } catch (error) {
//     console.error('❌ Error updating completion:', error);
//     throw error;
//   }
// };

// export const sendChatMessageWithExtras = (inspectionId, messageData) => {
//   try {
//     const allChats = loadChatMessages();
    
//     const newMessage = {
//       id: generateMessageId(),
//       ...messageData,
//       timestamp: new Date().toISOString(),
//       read: false
//     };
    
//     if (!allChats[inspectionId]) {
//       allChats[inspectionId] = [];
//     }
    
//     allChats[inspectionId].push(newMessage);
    
//     if (messageData.type === 'status-update' && messageData.statusId !== undefined) {
//       updateInspectionStatus(inspectionId, messageData.statusId);
//     }
    
//     if (messageData.type === 'completion') {
//       const completionData = messageData.completionData || {};
//       completeInspection(inspectionId, completionData);
//     }
    
//     saveChatMessages(allChats);
    
//     const eventDetail = { inspectionId, message: newMessage };
    
//     window.dispatchEvent(new CustomEvent('newChatMessage', { detail: eventDetail }));
//     window.dispatchEvent(new CustomEvent('chatUpdated', { detail: eventDetail }));
    
//     if (typeof BroadcastChannel !== 'undefined') {
//       const channel = new BroadcastChannel('inspection-chat');
//       channel.postMessage({
//         type: 'NEW_MESSAGE',
//         data: eventDetail
//       });
//     }
    
//     console.log('✅ Message sent with extras:', newMessage.id);
//     return newMessage;
    
//   } catch (error) {
//     console.error('❌ Error sending message with extras:', error);
//     throw error;
//   }
// };

// // =====================
// // REPORT MANAGEMENT
// // =====================

// export const generateInspectionReport = (inspectionId, reportData) => {
//   try {
//     const inspection = getQueryById(inspectionId);
//     const photos = getInspectionPhotos(inspectionId);
//     const status = getInspectionStatus(inspectionId);
//     const completion = getInspectionCompletion(inspectionId);
//     const chatMessages = getChatMessages(inspectionId);
    
//     if (!inspection) {
//       throw new Error(`Inspection not found: ${inspectionId}`);
//     }
    
//     const report = {
//       id: generateReportId(),
//       inspectionId: inspectionId,
//       generatedAt: new Date().toISOString(),
//       status: completion ? 'Final' : 'Draft',
//       version: '1.0',
//       ...reportData,
      
//       // Core inspection data
//       inspectionData: inspection,
      
//       // Photos and media
//       photosAttached: photos.length,
//       photos: photos.map(photo => ({
//         ...photo,
//         // Remove large data from report summary
//         data: photo.data ? '[Photo Data]' : null
//       })),
      
//       // Status information
//       currentStatus: status.status || 0,
//       statusHistory: status.statusHistory || [],
      
//       // Completion information
//       completionData: completion,
//       isCompleted: !!completion,
      
//       // Communication summary
//       messageCount: chatMessages.length,
//       lastCommunication: chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].timestamp : null,
      
//       // Summary statistics
//       summary: {
//         totalPhotos: photos.length,
//         inspectionDuration: completion && inspection.submittedAt ? 
//           new Date(completion.completedAt) - new Date(inspection.submittedAt) : null,
//         statusChanges: status.statusHistory ? status.statusHistory.length : 0,
//         inspector: inspection.confirmedInspectorId,
//         customer: inspection.customerName || 'N/A'
//       }
//     };
    
//     const reports = loadReports();
//     reports[report.id] = report;
//     saveReports(reports);
    
//     window.dispatchEvent(new CustomEvent('reportGenerated', {
//       detail: { inspectionId, report }
//     }));
    
//     console.log('✅ Report generated:', report.id, 'for inspection:', inspectionId);
//     return report;
    
//   } catch (error) {
//     console.error('❌ Error generating report:', error);
//     throw error;
//   }
// };

// export const getInspectionReports = (inspectionId) => {
//   try {
//     const allReports = loadReports();
//     return Object.values(allReports)
//       .filter(report => report.inspectionId === inspectionId)
//       .sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt));
//   } catch (error) {
//     console.error('❌ Error getting inspection reports:', error);
//     return [];
//   }
// };

// export const getReportById = (reportId) => {
//   try {
//     const reports = loadReports();
//     return reports[reportId] || null;
//   } catch (error) {
//     console.error('❌ Error getting report by ID:', error);
//     return null;
//   }
// };

// export const getAllReports = () => {
//   try {
//     const reports = loadReports();
//     return Object.values(reports)
//       .sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt));
//   } catch (error) {
//     console.error('❌ Error getting all reports:', error);
//     return [];
//   }
// };

// export const updateReport = (reportId, updateData) => {
//   try {
//     const reports = loadReports();
    
//     if (reports[reportId]) {
//       reports[reportId] = {
//         ...reports[reportId],
//         ...updateData,
//         updatedAt: new Date().toISOString(),
//         version: updateData.version || reports[reportId].version
//       };
      
//       saveReports(reports);
      
//       window.dispatchEvent(new CustomEvent('reportUpdated', {
//         detail: { reportId, updateData }
//       }));
      
//       console.log('✅ Report updated:', reportId);
//       return reports[reportId];
//     }
    
//     console.warn('❌ Report not found for update:', reportId);
//     return null;
//   } catch (error) {
//     console.error('❌ Error updating report:', error);
//     throw error;
//   }
// };

// export const deleteReport = (reportId) => {
//   try {
//     const reports = loadReports();
    
//     if (reports[reportId]) {
//       const deletedReport = reports[reportId];
//       delete reports[reportId];
//       saveReports(reports);
      
//       window.dispatchEvent(new CustomEvent('reportDeleted', {
//         detail: { reportId }
//       }));
      
//       console.log('✅ Report deleted:', reportId);
//       return deletedReport;
//     }
    
//     console.warn('❌ Report not found for deletion:', reportId);
//     return null;
//   } catch (error) {
//     console.error('❌ Error deleting report:', error);
//     throw error;
//   }
// };

// export const exportReport = (reportId, format = 'json') => {
//   try {
//     const report = getReportById(reportId);
    
//     if (!report) {
//       throw new Error(`Report not found: ${reportId}`);
//     }
    
//     const exportData = {
//       report,
//       exportedAt: new Date().toISOString(),
//       format,
//       exportedBy: 'QueryStorage System'
//     };
    
//     let exportContent;
//     let mimeType;
//     let filename;
    
//     switch (format.toLowerCase()) {
//       case 'json':
//         exportContent = JSON.stringify(exportData, null, 2);
//         mimeType = 'application/json';
//         filename = `inspection-report-${report.inspectionId}-${Date.now()}.json`;
//         break;
        
//       case 'csv':
//         // Basic CSV export for inspection summary
//         const csvHeaders = ['Field', 'Value'];
//         const csvRows = [
//           ['Report ID', report.id],
//           ['Inspection ID', report.inspectionId],
//           ['Generated At', report.generatedAt],
//           ['Status', report.status],
//           ['Inspector', report.summary.inspector || 'N/A'],
//           ['Customer', report.summary.customer],
//           ['Total Photos', report.summary.totalPhotos],
//           ['Status Changes', report.summary.statusChanges],
//           ['Completed', report.isCompleted ? 'Yes' : 'No']
//         ];
        
//         exportContent = [csvHeaders, ...csvRows]
//           .map(row => row.map(field => `"${field}"`).join(','))
//           .join('\n');
//         mimeType = 'text/csv';
//         filename = `inspection-report-${report.inspectionId}-${Date.now()}.csv`;
//         break;
        
//       default:
//         throw new Error(`Unsupported export format: ${format}`);
//     }
    
//     // Create download blob
//     const blob = new Blob([exportContent], { type: mimeType });
//     const url = URL.createObjectURL(blob);
    
//     // Trigger download
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = filename;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
    
//     console.log('✅ Report exported:', reportId, 'as', format);
//     return { success: true, filename };
    
//   } catch (error) {
//     console.error('❌ Error exporting report:', error);
//     throw error;
//   }
// };

// // =====================
// // ANALYTICS & INSIGHTS
// // =====================

// export const getInspectionAnalytics = () => {
//   try {
//     const queries = getAllQueries();
//     const statuses = getAllInspectionStatuses();
//     const reports = getAllReports();
    
//     const analytics = {
//       totalInspections: queries.length,
//       completedInspections: queries.filter(q => q.status === 'Completed').length,
//       activeInspections: queries.filter(q => q.status === 'In Progress').length,
//       pendingInspections: queries.filter(q => q.status === 'Active').length,
      
//       averageCompletionTime: calculateAverageCompletionTime(queries),
      
//       statusDistribution: queries.reduce((acc, query) => {
//         acc[query.status] = (acc[query.status] || 0) + 1;
//         return acc;
//       }, {}),
      
//       inspectorWorkload: queries.reduce((acc, query) => {
//         if (query.confirmedInspectorId) {
//           acc[query.confirmedInspectorId] = (acc[query.confirmedInspectorId] || 0) + 1;
//         }
//         return acc;
//       }, {}),
      
//       totalReports: reports.length,
//       recentActivity: getRecentActivity(),
      
//       generatedAt: new Date().toISOString()
//     };
    
//     return analytics;
//   } catch (error) {
//     console.error('❌ Error generating analytics:', error);
//     return null;
//   }
// };

// const calculateAverageCompletionTime = (queries) => {
//   try {
//     const completedQueries = queries.filter(q => 
//       q.status === 'Completed' && q.submittedAt && q.updatedAt
//     );
    
//     if (completedQueries.length === 0) return null;
    
//     const totalTime = completedQueries.reduce((sum, query) => {
//       const start = new Date(query.submittedAt);
//       const end = new Date(query.updatedAt);
//       return sum + (end - start);
//     }, 0);
    
//     return Math.round(totalTime / completedQueries.length / (1000 * 60 * 60)); // Hours
//   } catch (error) {
//     console.error('❌ Error calculating average completion time:', error);
//     return null;
//   }
// };

// const getRecentActivity = () => {
//   try {
//     const queries = getAllQueries();
//     const notifications = loadNotifications();
    
//     const activities = [
//       ...queries.map(q => ({
//         type: 'query',
//         id: q.id,
//         timestamp: q.updatedAt || q.submittedAt,
//         description: `Query ${q.status.toLowerCase()}: ${q.id}`
//       })),
//       ...notifications.slice(0, 10).map(n => ({
//         type: 'notification',
//         id: n.id,
//         timestamp: n.createdAt,
//         description: `Notification: ${n.title || 'New notification'}`
//       }))
//     ];
    
//     return activities
//       .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
//       .slice(0, 20);
//   } catch (error) {
//     console.error('❌ Error getting recent activity:', error);
//     return [];
//   }
// };

// // =====================
// // UTILITY FUNCTIONS
// // =====================

// export const getSystemStats = () => {
//   try {
//     return {
//       storageType,
//       totalQueries: loadQueries().length,
//       totalNotifications: loadNotifications().length,
//       totalChatSessions: Object.keys(loadChatMessages()).length,
//       totalPhotos: Object.values(loadInspectionPhotos()).reduce((sum, photos) => sum + photos.length, 0),
//       totalReports: Object.keys(loadReports()).length,
//       lastActivity: new Date().toISOString()
//     };
//   } catch (error) {
//     console.error('❌ Error getting system stats:', error);
//     return null;
//   }
// };

// export const validateDataIntegrity = () => {
//   try {
//     const issues = [];
//     const queries = getAllQueries();
//     const statuses = getAllInspectionStatuses();
//     const photos = loadInspectionPhotos();
//     const completions = loadInspectionCompletions();
    
//     // Check for orphaned data
//     Object.keys(statuses).forEach(inspectionId => {
//       if (!queries.find(q => q.id === inspectionId)) {
//         issues.push(`Orphaned status data for inspection: ${inspectionId}`);
//       }
//     });
    
//     Object.keys(photos).forEach(inspectionId => {
//       if (!queries.find(q => q.id === inspectionId)) {
//         issues.push(`Orphaned photo data for inspection: ${inspectionId}`);
//       }
//     });
    
//     Object.keys(completions).forEach(inspectionId => {
//       if (!queries.find(q => q.id === inspectionId)) {
//         issues.push(`Orphaned completion data for inspection: ${inspectionId}`);
//       }
//     });
    
//     return {
//       isValid: issues.length === 0,
//       issues,
//       checkedAt: new Date().toISOString()
//     };
//   } catch (error) {
//     console.error('❌ Error validating data integrity:', error);
//     return {
//       isValid: false,
//       issues: ['Error during validation'],
//       checkedAt: new Date().toISOString()
//     };
//   }
// };

// export const cleanupOrphanedData = () => {
//   try {
//     const queries = getAllQueries();
//     const queryIds = new Set(queries.map(q => q.id));
    
//     // Clean up statuses
//     const statuses = loadInspectionStatuses();
//     Object.keys(statuses).forEach(inspectionId => {
//       if (!queryIds.has(inspectionId)) {
//         delete statuses[inspectionId];
//       }
//     });
//     saveInspectionStatuses(statuses);
    
//     // Clean up photos
//     const photos = loadInspectionPhotos();
//     Object.keys(photos).forEach(inspectionId => {
//       if (!queryIds.has(inspectionId)) {
//         delete photos[inspectionId];
//       }
//     });
//     saveInspectionPhotos(photos);
    
//     // Clean up completions
//     const completions = loadInspectionCompletions();
//     Object.keys(completions).forEach(inspectionId => {
//       if (!queryIds.has(inspectionId)) {
//         delete completions[inspectionId];
//       }
//     });
//     saveInspectionCompletions(completions);
    
//     // Clean up chat messages
//     const chatMessages = loadChatMessages();
//     Object.keys(chatMessages).forEach(inspectionId => {
//       if (!queryIds.has(inspectionId)) {
//         delete chatMessages[inspectionId];
//       }
//     });
//     saveChatMessages(chatMessages);
    
//     console.log('✅ Cleanup completed');
    
//     window.dispatchEvent(new CustomEvent('dataCleanupCompleted'));
    
//     return { success: true, cleanedAt: new Date().toISOString() };
//   } catch (error) {
//     console.error('❌ Error during cleanup:', error);
//     throw error;
//   }
// };

// // =====================
// // EVENT LISTENERS & LIFECYCLE
// // =====================

// // Listen for storage changes (for localStorage sync across tabs)
// if (typeof window !== 'undefined' && storageType === 'localStorage') {
//   window.addEventListener('localStorageChange', (event) => {
//     const { key } = event.detail;
    
//     // Emit specific events based on what changed
//     switch (key) {
//       case STORAGE_KEY:
//         window.dispatchEvent(new CustomEvent('queriesUpdated', {
//           detail: { type: 'external_update' }
//         }));
//         break;
//       case NOTIFICATIONS_KEY:
//         window.dispatchEvent(new CustomEvent('notificationsUpdated', {
//           detail: { type: 'external_update' }
//         }));
//         break;
//       case CHAT_MESSAGES_KEY:
//         window.dispatchEvent(new CustomEvent('chatUpdated', {
//           detail: { type: 'external_update' }
//         }));
//         break;
//     }
//   });
// }

// // Export storage interface for advanced usage
// export const storageInterface = {
//   storage,
//   storageType,
//   generateQueryId,
//   generateNotificationId,
//   generateBidId,
//   generateMessageId,
//   generateReportId
// };

// // Export all storage functions for bulk operations
// export const bulkOperations = {
//   clearAllData,
//   cleanupOrphanedData,
//   validateDataIntegrity,
//   getSystemStats,
//   getInspectionAnalytics
// };

// console.log('✅ QueryStorage module fully loaded with', Object.keys(window).filter(k => k.startsWith('export')).length, 'exports');

// // Default export for convenience
// export default {
//   // Query operations
//   saveQuery,
//   getAllQueries,
//   getQueryById,
//   updateQueryStatus,
//   addBidToQuery,
//   confirmInspectorForQuery,
//   deleteQuery,
  
//   // Notification operations
//   createInspectorNotification,
//   getInspectorNotifications,
//   markNotificationAsRead,
//   deleteNotification,
  
//   // Chat operations
//   getChatMessages,
//   sendChatMessage,
//   markMessagesAsRead,
//   initializeInspectionChat,
  
//   // Status operations
//   updateInspectionStatus,
//   getInspectionStatus,
  
//   // Photo operations
//   addPhotoToInspection,
//   getInspectionPhotos,
//   removePhotoFromInspection,
  
//   // Completion operations
//   completeInspection,
//   getInspectionCompletion,
//   isInspectionCompleted,
  
//   // Report operations
//   generateInspectionReport,
//   getInspectionReports,
//   getReportById,
//   exportReport,
  
//   // Analytics
//   getInspectionAnalytics,
  
//   // Utilities
//   clearAllData,
//   validateDataIntegrity,
//   getSystemStats
// };

// =====================
// COMPLETE ENHANCED QUERY STORAGE
// =====================

// Storage keys
const STORAGE_KEY = 'inspection_queries';
const NOTIFICATIONS_KEY = 'inspector_notifications';
const CHAT_MESSAGES_KEY = 'inspection_chat_messages';
const INSPECTION_STATUS_KEY = 'inspection_status';
const INSPECTION_PHOTOS_KEY = 'inspection_photos';
const INSPECTION_COMPLETION_KEY = 'inspection_completion';
const REPORTS_KEY = 'inspection_reports';

// Storage type detection
let storageType = 'memory';
let queriesStorage = [];
let notificationsStorage = [];
let chatMessagesStorage = {};
let inspectionStatusStorage = {};
let inspectionPhotosStorage = {};
let inspectionCompletionsStorage = {};
let reportsStorage = {};

try {
  const testKey = '__storage_test__';
  localStorage.setItem(testKey, 'test');
  localStorage.removeItem(testKey);
  storageType = 'localStorage';
} catch (e) {
  try {
    const testKey = '__storage_test__';
    sessionStorage.setItem(testKey, 'test');
    sessionStorage.removeItem(testKey);
    storageType = 'sessionStorage';
  } catch (e) {
    storageType = 'memory';
  }
}

console.log('QueryStorage: Using storage type:', storageType);

// Storage interface
const storage = {
  getItem: (key) => {
    if (storageType === 'localStorage') {
      return localStorage.getItem(key);
    } else if (storageType === 'sessionStorage') {
      return sessionStorage.getItem(key);
    } else {
      // Memory storage fallback
      switch (key) {
        case STORAGE_KEY:
          return queriesStorage.length > 0 ? JSON.stringify(queriesStorage) : null;
        case NOTIFICATIONS_KEY:
          return notificationsStorage.length > 0 ? JSON.stringify(notificationsStorage) : null;
        case CHAT_MESSAGES_KEY:
          return Object.keys(chatMessagesStorage).length > 0 ? JSON.stringify(chatMessagesStorage) : null;
        case INSPECTION_STATUS_KEY:
          return Object.keys(inspectionStatusStorage).length > 0 ? JSON.stringify(inspectionStatusStorage) : null;
        case INSPECTION_PHOTOS_KEY:
          return Object.keys(inspectionPhotosStorage).length > 0 ? JSON.stringify(inspectionPhotosStorage) : null;
        case INSPECTION_COMPLETION_KEY:
          return Object.keys(inspectionCompletionsStorage).length > 0 ? JSON.stringify(inspectionCompletionsStorage) : null;
        case REPORTS_KEY:
          return Object.keys(reportsStorage).length > 0 ? JSON.stringify(reportsStorage) : null;
        default:
          return null;
      }
    }
  },
  setItem: (key, value) => {
    if (storageType === 'localStorage') {
      localStorage.setItem(key, value);
      window.dispatchEvent(new CustomEvent('localStorageChange', {
        detail: { key, value }
      }));
    } else if (storageType === 'sessionStorage') {
      sessionStorage.setItem(key, value);
    } else {
      // Memory storage fallback
      try {
        switch (key) {
          case STORAGE_KEY:
            queriesStorage = JSON.parse(value);
            break;
          case NOTIFICATIONS_KEY:
            notificationsStorage = JSON.parse(value);
            break;
          case CHAT_MESSAGES_KEY:
            chatMessagesStorage = JSON.parse(value);
            break;
          case INSPECTION_STATUS_KEY:
            inspectionStatusStorage = JSON.parse(value);
            break;
          case INSPECTION_PHOTOS_KEY:
            inspectionPhotosStorage = JSON.parse(value);
            break;
          case INSPECTION_COMPLETION_KEY:
            inspectionCompletionsStorage = JSON.parse(value);
            break;
          case REPORTS_KEY:
            reportsStorage = JSON.parse(value);
            break;
        }
      } catch (e) {
        console.error('QueryStorage: Error parsing data for in-memory storage:', e);
      }
    }
  }
};

// ID generators
const generateQueryId = () => {
  return `INQ-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
};

const generateNotificationId = () => {
  return `NOT-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
};

const generateBidId = () => {
  return `BID-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
};

const generateMessageId = () => {
  return `MSG-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
};

const generateReportId = () => {
  return `RPT-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
};

// Load/Save functions
const loadQueries = () => {
  try {
    const stored = storage.getItem(STORAGE_KEY);
    const queries = stored ? JSON.parse(stored) : [];
    console.log('QueryStorage: Loaded', queries.length, 'queries from storage');
    return queries;
  } catch (e) {
    console.error('QueryStorage: Error loading queries from storage:', e);
    return [];
  }
};

const saveQueries = (queries) => {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(queries));
    console.log('QueryStorage: Saved', queries.length, 'queries to storage');
  } catch (e) {
    console.error('QueryStorage: Error saving queries to storage:', e);
  }
};

const loadNotifications = () => {
  try {
    const stored = storage.getItem(NOTIFICATIONS_KEY);
    const notifications = stored ? JSON.parse(stored) : [];
    console.log('QueryStorage: Loaded', notifications.length, 'notifications from storage');
    return notifications;
  } catch (e) {
    console.error('QueryStorage: Error loading notifications from storage:', e);
    return [];
  }
};

const saveNotifications = (notifications) => {
  try {
    storage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
    console.log('QueryStorage: Saved', notifications.length, 'notifications to storage');
  } catch (e) {
    console.error('QueryStorage: Error saving notifications to storage:', e);
  }
};

const loadChatMessages = () => {
  try {
    const stored = storage.getItem(CHAT_MESSAGES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error('QueryStorage: Error loading chat messages:', e);
    return {};
  }
};

const saveChatMessages = (chatData) => {
  try {
    storage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(chatData));
    console.log('QueryStorage: Chat messages saved');
  } catch (e) {
    console.error('QueryStorage: Error saving chat messages:', e);
  }
};

const loadInspectionStatuses = () => {
  try {
    const stored = storage.getItem(INSPECTION_STATUS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error('QueryStorage: Error loading inspection statuses:', e);
    return {};
  }
};

const saveInspectionStatuses = (statuses) => {
  try {
    storage.setItem(INSPECTION_STATUS_KEY, JSON.stringify(statuses));
    console.log('QueryStorage: Saved inspection statuses');
  } catch (e) {
    console.error('QueryStorage: Error saving inspection statuses:', e);
  }
};

const loadInspectionPhotos = () => {
  try {
    const stored = storage.getItem(INSPECTION_PHOTOS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error('QueryStorage: Error loading photos:', e);
    return {};
  }
};

const saveInspectionPhotos = (photosData) => {
  try {
    storage.setItem(INSPECTION_PHOTOS_KEY, JSON.stringify(photosData));
    console.log('QueryStorage: Saved inspection photos');
  } catch (e) {
    console.error('QueryStorage: Error saving photos:', e);
  }
};

const loadInspectionCompletions = () => {
  try {
    const stored = storage.getItem(INSPECTION_COMPLETION_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error('QueryStorage: Error loading completions:', e);
    return {};
  }
};

const saveInspectionCompletions = (completionsData) => {
  try {
    storage.setItem(INSPECTION_COMPLETION_KEY, JSON.stringify(completionsData));
    console.log('QueryStorage: Saved inspection completions');
  } catch (e) {
    console.error('QueryStorage: Error saving completions:', e);
  }
};

const loadReports = () => {
  try {
    const stored = storage.getItem(REPORTS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error('QueryStorage: Error loading reports:', e);
    return {};
  }
};

const saveReports = (reportsData) => {
  try {
    storage.setItem(REPORTS_KEY, JSON.stringify(reportsData));
    console.log('QueryStorage: Saved reports');
  } catch (e) {
    console.error('QueryStorage: Error saving reports:', e);
  }
};

// =====================
// QUERY FUNCTIONS
// =====================

export const saveQuery = (queryData) => {
  const currentQueries = loadQueries();
  
  const newQuery = {
    id: generateQueryId(),
    ...queryData,
    submittedAt: new Date().toISOString(),
    status: 'Active',
    bidCount: 0,
    bids: [],
    confirmedInspectorId: null,
    confirmedBidId: null
  };
  
  currentQueries.push(newQuery);
  saveQueries(currentQueries);
  
  window.dispatchEvent(new CustomEvent('queriesUpdated', {
    detail: { type: 'new_query', query: newQuery }
  }));
  
  console.log('QueryStorage: Created new query:', newQuery.id);
  return newQuery;
};

export const getAllQueries = () => {
  return loadQueries();
};

export const getQueriesByStatus = (status) => {
  const allQueries = loadQueries();
  return allQueries.filter(query => query.status === status);
};

export const getActiveQueries = () => {
  const allQueries = loadQueries();
  return allQueries.filter(query => query.status === 'Active');
};

export const updateQueryStatus = (queryId, newStatus) => {
  const allQueries = loadQueries();
  const queryIndex = allQueries.findIndex(query => query.id === queryId);
  
  if (queryIndex !== -1) {
    allQueries[queryIndex].status = newStatus;
    allQueries[queryIndex].updatedAt = new Date().toISOString();
    saveQueries(allQueries);
    
    window.dispatchEvent(new CustomEvent('queriesUpdated', {
      detail: { type: 'status_update', queryId, newStatus }
    }));
    
    console.log('QueryStorage: Updated query status:', queryId, 'to', newStatus);
    return allQueries[queryIndex];
  }
  console.warn('QueryStorage: Query not found for status update:', queryId);
  return null;
};

export const addBidToQuery = (queryId, bidData) => {
  const allQueries = loadQueries();
  const queryIndex = allQueries.findIndex(query => query.id === queryId);
  
  if (queryIndex !== -1) {
    const bid = {
      id: generateBidId(),
      ...bidData,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    allQueries[queryIndex].bids.push(bid);
    allQueries[queryIndex].bidCount = allQueries[queryIndex].bids.length;
    allQueries[queryIndex].updatedAt = new Date().toISOString();
    
    saveQueries(allQueries);
    
    window.dispatchEvent(new CustomEvent('queriesUpdated', {
      detail: { type: 'new_bid', queryId, bid }
    }));
    
    console.log('QueryStorage: Added bid to query:', queryId, 'bid:', bid.id);
    return allQueries[queryIndex];
  }
  console.warn('QueryStorage: Query not found for bid addition:', queryId);
  return null;
};

export const confirmInspectorForQuery = (queryId, bidId, inspectorId) => {
  try {
    console.log('🔄 Storage: Confirming inspector for query:', { queryId, bidId, inspectorId });
    
    const queries = getAllQueries();
    const queryIndex = queries.findIndex(q => q.id === queryId);
    
    if (queryIndex === -1) {
      console.error('❌ Storage: Query not found:', queryId);
      return null;
    }
    
    const query = queries[queryIndex];
    const bid = query.bids?.find(b => b.id === bidId && b.inspectorId === inspectorId);
    
    if (!bid) {
      console.error('❌ Storage: Bid not found:', { bidId, inspectorId });
      return null;
    }
    
    const updatedQuery = {
      ...query,
      confirmedInspectorId: inspectorId,
      confirmedBidId: bidId,
      confirmedAt: new Date().toISOString(),
      status: 'In Progress',
      updatedAt: new Date().toISOString()
    };
    
    const updatedBids = query.bids.map(b => ({
      ...b,
      status: b.id === bidId ? 'confirmed' : 'rejected'
    }));
    
    updatedQuery.bids = updatedBids;
    
    queries[queryIndex] = updatedQuery;
    saveQueries(queries);
    
    console.log('✅ Storage: Inspector confirmed successfully');
    
    window.dispatchEvent(new CustomEvent('queriesUpdated', {
      detail: { type: 'inspector_confirmed', queryId, inspectorId, bidId }
    }));
    
    window.dispatchEvent(new CustomEvent('bidConfirmed', {
      detail: { 
        queryId, 
        inspectorId, 
        bidId, 
        query: updatedQuery 
      }
    }));
    
    return updatedQuery;
  } catch (error) {
    console.error('❌ Storage: Error confirming inspector:', error);
    return null;
  }
};

export const getInspectorActiveInspections = (inspectorId) => {
  const allQueries = loadQueries();
  return allQueries.filter(query => 
    query.confirmedInspectorId === inspectorId && 
    (query.status === 'In Progress' || query.status === 'Scheduled')
  );
};

export const getQueryById = (queryId) => {
  const allQueries = loadQueries();
  return allQueries.find(query => query.id === queryId);
};

export const deleteQuery = (queryId) => {
  const allQueries = loadQueries();
  const queryIndex = allQueries.findIndex(query => query.id === queryId);
  
  if (queryIndex !== -1) {
    const deletedQuery = allQueries.splice(queryIndex, 1)[0];
    saveQueries(allQueries);
    
    window.dispatchEvent(new CustomEvent('queriesUpdated', {
      detail: { type: 'query_deleted', queryId }
    }));
    
    console.log('QueryStorage: Deleted query:', queryId);
    return deletedQuery;
  }
  console.warn('QueryStorage: Query not found for deletion:', queryId);
  return null;
};

export const clearAllQueries = () => {
  saveQueries([]);
  window.dispatchEvent(new CustomEvent('queriesUpdated', {
    detail: { type: 'queries_cleared' }
  }));
  console.log('QueryStorage: Cleared all queries');
};

export const clearAllNotifications = () => {
  saveNotifications([]);
  console.log('QueryStorage: Cleared all notifications');
};

export const clearAllData = () => {
  saveQueries([]);
  saveNotifications([]);
  saveChatMessages({});
  saveInspectionStatuses({});
  saveInspectionPhotos({});
  saveInspectionCompletions({});
  saveReports({});
  
  window.dispatchEvent(new CustomEvent('allDataCleared'));
  console.log('QueryStorage: Cleared all data');
};

// =====================
// NOTIFICATION FUNCTIONS
// =====================

export const createInspectorNotification = (inspectorId, notificationData) => {
  try {
    const currentNotifications = loadNotifications();
    
    const newNotification = {
      id: generateNotificationId(),
      inspectorId: inspectorId,
      ...notificationData,
      createdAt: new Date().toISOString(),
      read: false
    };
    
    currentNotifications.push(newNotification);
    saveNotifications(currentNotifications);
    
    window.dispatchEvent(new CustomEvent('newNotification', {
      detail: { notification: newNotification }
    }));
    
    console.log('QueryStorage: Created notification:', newNotification.id, 'for inspector:', inspectorId);
    return newNotification;
  } catch (error) {
    console.error('QueryStorage: Error creating notification:', error);
    throw error;
  }
};

export const getInspectorNotifications = (inspectorId) => {
  const allNotifications = loadNotifications();
  return allNotifications
    .filter(notification => notification.inspectorId === inspectorId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const markNotificationAsRead = (notificationId) => {
  const allNotifications = loadNotifications();
  const notificationIndex = allNotifications.findIndex(n => n.id === notificationId);
  
  if (notificationIndex !== -1) {
    allNotifications[notificationIndex].read = true;
    allNotifications[notificationIndex].readAt = new Date().toISOString();
    saveNotifications(allNotifications);
    
    window.dispatchEvent(new CustomEvent('notificationRead', {
      detail: { notificationId }
    }));
    
    console.log('QueryStorage: Marked notification as read:', notificationId);
    return allNotifications[notificationIndex];
  }
  console.warn('QueryStorage: Notification not found for read status update:', notificationId);
  return null;
};

export const deleteNotification = (notificationId) => {
  const allNotifications = loadNotifications();
  const notificationIndex = allNotifications.findIndex(n => n.id === notificationId);
  
  if (notificationIndex !== -1) {
    const deletedNotification = allNotifications.splice(notificationIndex, 1)[0];
    saveNotifications(allNotifications);
    
    window.dispatchEvent(new CustomEvent('notificationDeleted', {
      detail: { notificationId }
    }));
    
    console.log('QueryStorage: Deleted notification:', notificationId);
    return deletedNotification;
  }
  console.warn('QueryStorage: Notification not found for deletion:', notificationId);
  return null;
};

export const getUnreadNotificationCount = (inspectorId) => {
  const notifications = getInspectorNotifications(inspectorId);
  return notifications.filter(n => !n.read).length;
};

// =====================
// CHAT FUNCTIONS
// =====================

export const getChatMessages = (inspectionId) => {
  const allChats = loadChatMessages();
  return allChats[inspectionId] || [];
};

export const sendChatMessage = (inspectionId, messageData) => {
  try {
    const allChats = loadChatMessages();
    
    const newMessage = {
      id: generateMessageId(),
      ...messageData,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    if (!allChats[inspectionId]) {
      allChats[inspectionId] = [];
    }
    
    allChats[inspectionId].push(newMessage);
    saveChatMessages(allChats);
    
    const eventDetail = { inspectionId, message: newMessage };
    
    window.dispatchEvent(new CustomEvent('newChatMessage', { detail: eventDetail }));
    window.dispatchEvent(new CustomEvent('chatUpdated', { detail: eventDetail }));
    
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('inspection-chat');
      channel.postMessage({
        type: 'NEW_MESSAGE',
        data: eventDetail
      });
    }
    
    console.log('✅ QueryStorage: Message sent with real-time events:', newMessage.id);
    return newMessage;
    
  } catch (error) {
    console.error('❌ QueryStorage: Error sending message:', error);
    throw error;
  }
};

export const markMessagesAsRead = (inspectionId, userId) => {
  try {
    const allChats = loadChatMessages();
    
    if (allChats[inspectionId]) {
      allChats[inspectionId] = allChats[inspectionId].map(message => {
        if (message.senderId !== userId) {
          return { ...message, read: true, readAt: new Date().toISOString() };
        }
        return message;
      });
      
      saveChatMessages(allChats);
      
      window.dispatchEvent(new CustomEvent('messagesRead', {
        detail: { inspectionId, userId }
      }));
    }
    
  } catch (error) {
    console.error('QueryStorage: Error marking messages as read:', error);
  }
};

export const getUnreadMessageCount = (inspectionId, userId) => {
  try {
    const messages = getChatMessages(inspectionId);
    return messages.filter(msg => msg.senderId !== userId && !msg.read).length;
  } catch (error) {
    console.error('QueryStorage: Error getting unread count:', error);
    return 0;
  }
};

export const initializeInspectionChat = (inspectionId, inspectorData, customerData) => {
  try {
    const existingMessages = getChatMessages(inspectionId);
    
    if (existingMessages.length === 0) {
      const systemMessage = {
        senderId: 'system',
        senderName: 'System',
        senderType: 'system',
        message: `🎉 Inspection chat started! Inspector ${inspectorData} is now working with ${customerData}. Feel free to communicate throughout the inspection process.`,
        type: 'system'
      };

      return sendChatMessage(inspectionId, systemMessage);
    }
    
  } catch (error) {
    console.error('QueryStorage: Error initializing chat:', error);
    throw error;
  }
};

export const deleteChatMessage = (inspectionId, messageId) => {
  try {
    const allChats = loadChatMessages();
    
    if (allChats[inspectionId]) {
      const messageIndex = allChats[inspectionId].findIndex(msg => msg.id === messageId);
      
      if (messageIndex !== -1) {
        const deletedMessage = allChats[inspectionId].splice(messageIndex, 1)[0];
        saveChatMessages(allChats);
        
        window.dispatchEvent(new CustomEvent('chatMessageDeleted', {
          detail: { inspectionId, messageId }
        }));
        
        console.log('QueryStorage: Deleted chat message:', messageId);
        return deletedMessage;
      }
    }
    
    console.warn('QueryStorage: Message not found for deletion:', messageId);
    return null;
  } catch (error) {
    console.error('QueryStorage: Error deleting message:', error);
    throw error;
  }
};

export const clearChatHistory = (inspectionId) => {
  try {
    const allChats = loadChatMessages();
    
    if (allChats[inspectionId]) {
      delete allChats[inspectionId];
      saveChatMessages(allChats);
      
      window.dispatchEvent(new CustomEvent('chatHistoryCleared', {
        detail: { inspectionId }
      }));
      
      console.log('QueryStorage: Cleared chat history for:', inspectionId);
    }
  } catch (error) {
    console.error('QueryStorage: Error clearing chat history:', error);
    throw error;
  }
};

// =====================
// STATUS MANAGEMENT
// =====================

export const updateInspectionStatus = (inspectionId, newStatus) => {
  try {
    const statuses = loadInspectionStatuses();
    
    const statusUpdate = {
      status: newStatus,
      updatedAt: new Date().toISOString(),
      statusHistory: [
        ...(statuses[inspectionId]?.statusHistory || []),
        {
          status: newStatus,
          timestamp: new Date().toISOString()
        }
      ]
    };
    
    statuses[inspectionId] = statusUpdate;
    saveInspectionStatuses(statuses);
    
    window.dispatchEvent(new CustomEvent('inspectionStatusUpdated', {
      detail: { inspectionId, newStatus, statusUpdate }
    }));
    
    console.log('QueryStorage: Updated inspection status:', inspectionId, 'to', newStatus);
    return statusUpdate;
  } catch (error) {
    console.error('QueryStorage: Error updating inspection status:', error);
    throw error;
  }
};

export const getInspectionStatus = (inspectionId) => {
  try {
    const statuses = loadInspectionStatuses();
    return statuses[inspectionId] || { status: 0, statusHistory: [] };
  } catch (error) {
    console.error('QueryStorage: Error getting inspection status:', error);
    return { status: 0, statusHistory: [] };
  }
};

export const getAllInspectionStatuses = () => {
  try {
    return loadInspectionStatuses();
  } catch (error) {
    console.error('QueryStorage: Error getting all inspection statuses:', error);
    return {};
  }
};

export const sendChatMessageWithStatus = (inspectionId, messageData) => {
  try {
    const allChats = loadChatMessages();
    
    const newMessage = {
      id: generateMessageId(),
      ...messageData,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    if (!allChats[inspectionId]) {
      allChats[inspectionId] = [];
    }
    
    allChats[inspectionId].push(newMessage);
    
    if (messageData.type === 'status-update' && messageData.statusId !== undefined) {
      updateInspectionStatus(inspectionId, messageData.statusId);
    }
    
    saveChatMessages(allChats);
    
    const eventDetail = { inspectionId, message: newMessage };
    
    window.dispatchEvent(new CustomEvent('newChatMessage', { detail: eventDetail }));
    window.dispatchEvent(new CustomEvent('chatUpdated', { detail: eventDetail }));
    
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('inspection-chat');
      channel.postMessage({
        type: 'NEW_MESSAGE',
        data: eventDetail
      });
    }
    
    console.log('✅ QueryStorage: Message sent with status handling:', newMessage.id);
    return newMessage;
    
  } catch (error) {
    console.error('❌ QueryStorage: Error sending message with status:', error);
    throw error;
  }
};

export const clearInspectionStatus = (inspectionId) => {
  try {
    const statuses = loadInspectionStatuses();
    delete statuses[inspectionId];
    saveInspectionStatuses(statuses);
    
    window.dispatchEvent(new CustomEvent('inspectionStatusUpdated', {
      detail: { inspectionId, newStatus: 0, cleared: true }
    }));
    
    console.log('QueryStorage: Cleared inspection status for:', inspectionId);
  } catch (error) {
    console.error('QueryStorage: Error clearing inspection status:', error);
  }
};

// =====================
// PHOTO MANAGEMENT
// =====================

export const addPhotoToInspection = (inspectionId, photoData) => {
  try {
    const allPhotos = loadInspectionPhotos();
    
    if (!allPhotos[inspectionId]) {
      allPhotos[inspectionId] = [];
    }
    
    const newPhoto = {
      id: Date.now() + Math.random().toString(36).substr(2, 5),
      ...photoData,
      uploadedAt: new Date().toISOString()
    };
    
    allPhotos[inspectionId].push(newPhoto);
    saveInspectionPhotos(allPhotos);
    
    window.dispatchEvent(new CustomEvent('photoUploaded', {
      detail: { inspectionId, photo: newPhoto }
    }));
    
    console.log('✅ Photo added to inspection:', inspectionId);
    return newPhoto;
  } catch (error) {
    console.error('❌ Error adding photo:', error);
    throw error;
  }
};

export const getInspectionPhotos = (inspectionId) => {
  try {
    const allPhotos = loadInspectionPhotos();
    return allPhotos[inspectionId] || [];
  } catch (error) {
    console.error('❌ Error getting photos:', error);
    return [];
  }
};

export const removePhotoFromInspection = (inspectionId, photoId) => {
  try {
    const allPhotos = loadInspectionPhotos();
    
    if (allPhotos[inspectionId]) {
      allPhotos[inspectionId] = allPhotos[inspectionId].filter(photo => photo.id !== photoId);
      saveInspectionPhotos(allPhotos);
      
      window.dispatchEvent(new CustomEvent('photoRemoved', {
        detail: { inspectionId, photoId }
      }));
      
      console.log('✅ Photo removed from inspection:', inspectionId);
    }
  } catch (error) {
    console.error('❌ Error removing photo:', error);
    throw error;
  }
};

export const updatePhotoDetails = (inspectionId, photoId, updateData) => {
  try {
    const allPhotos = loadInspectionPhotos();
    
    if (allPhotos[inspectionId]) {
      const photoIndex = allPhotos[inspectionId].findIndex(photo => photo.id === photoId);
      
      if (photoIndex !== -1) {
        allPhotos[inspectionId][photoIndex] = {
          ...allPhotos[inspectionId][photoIndex],
          ...updateData,
          updatedAt: new Date().toISOString()
        };
        
        saveInspectionPhotos(allPhotos);
        
        window.dispatchEvent(new CustomEvent('photoUpdated', {
          detail: { inspectionId, photoId, updateData }
        }));
        
        console.log('✅ Photo updated:', photoId);
        return allPhotos[inspectionId][photoIndex];
      }
    }
    
    console.warn('❌ Photo not found for update:', photoId);
    return null;
  } catch (error) {
    console.error('❌ Error updating photo:', error);
    throw error;
  }
};

export const getPhotoById = (inspectionId, photoId) => {
  try {
    const photos = getInspectionPhotos(inspectionId);
    return photos.find(photo => photo.id === photoId) || null;
  } catch (error) {
    console.error('❌ Error getting photo by ID:', error);
    return null;
  }
};

export const getPhotosByCategory = (inspectionId, category) => {
  try {
    const photos = getInspectionPhotos(inspectionId);
    return photos.filter(photo => photo.category === category);
  } catch (error) {
    console.error('❌ Error getting photos by category:', error);
    return [];
  }
};

// =====================
// INSPECTION COMPLETION WITH POPUP HANDLING
// =====================

export const markInspectionComplete = (inspectionId, completionData = {}) => {
  try {
    console.log('🔄 Marking inspection as complete:', inspectionId);
    
    // Get current inspection data
    const inspection = getQueryById(inspectionId);
    if (!inspection) {
      throw new Error(`Inspection not found: ${inspectionId}`);
    }
    
    // Complete the inspection with enhanced data
    const completion = completeInspection(inspectionId, {
      ...completionData,
      finalStatus: 'Completed',
      completedBy: completionData.completedBy || 'inspector',
      reportGenerated: true
    });
    
    // Generate final report automatically
    const report = generateInspectionReport(inspectionId, {
      title: `Final Inspection Report - ${inspection.id}`,
      type: 'Final Report',
      generatedBy: 'system',
      includeSummary: true
    });
    
    // Send status update message to chat
    const statusUpdateMessage = {
      senderId: 'system',
      senderName: 'System', 
      senderType: 'system',
      message: '✅ Status updated: Inspection marked as COMPLETED',
      type: 'status-update',
      statusId: 4,
      statusName: 'Completed',
      showBadge: true
    };
    
    sendChatMessage(inspectionId, statusUpdateMessage);
    
    // Dispatch comprehensive completion events
    const eventData = {
      inspectionId,
      completion,
      report,
      inspection,
      statusChange: {
        from: 3, // Report Approved  
        to: 4    // Completed
      },
      timestamp: new Date().toISOString()
    };
    
    // Main completion event
    window.dispatchEvent(new CustomEvent('inspectionCompleted', {
      detail: {
        ...eventData,
        showToCustomer: true,
        showToInspector: true
      }
    }));
    
    // Status card update event
    window.dispatchEvent(new CustomEvent('updateInspectionCard', {
      detail: {
        inspectionId,
        newStatus: 4,
        statusText: 'Completed',
        completed: true,
        showCompletedBadge: true
      }
    }));
    
    // Customer popup event
    window.dispatchEvent(new CustomEvent('showCustomerCompletionPopup', {
      detail: {
        inspectionId,
        title: 'Inspection Completed! 🎉',
        message: 'Your inspection has been successfully completed. The final report is now available for download.',
        reportId: report.id,
        showDownloadButton: true,
        autoClose: false
      }
    }));
    
    // Inspector confirmation event  
    window.dispatchEvent(new CustomEvent('showInspectorCompletionConfirm', {
      detail: {
        inspectionId,
        title: 'Inspection Completed Successfully! ✅',
        message: 'The inspection has been marked as completed. The customer will be notified and can now access the final report.',
        reportGenerated: true,
        autoClose: true,
        duration: 3000
      }
    }));
    
    // Real-time sync across tabs/components
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('inspection-updates');
      channel.postMessage({
        type: 'INSPECTION_COMPLETED',
        data: eventData
      });
    }
    
    console.log('✅ Inspection completion process finished:', inspectionId);
    return {
      success: true,
      completion,
      report,
      events: ['inspectionCompleted', 'updateInspectionCard', 'showCustomerCompletionPopup', 'showInspectorCompletionConfirm']
    };
    
  } catch (error) {
    console.error('❌ Error marking inspection complete:', error);
    
    // Dispatch error event
    window.dispatchEvent(new CustomEvent('inspectionCompletionError', {
      detail: {
        inspectionId,
        error: error.message,
        timestamp: new Date().toISOString()
      }
    }));
    
    throw error;
  }
};

export const handleReportApprovalComplete = (inspectionId, approvalData = {}) => {
  try {
    console.log('🔄 Handling report approval completion:', inspectionId);
    
    // This is called when inspector clicks "Complete Inspection" after report approval
    return markInspectionComplete(inspectionId, {
      ...approvalData,
      completionTrigger: 'report_approval',
      approvedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error handling report approval completion:', error);
    throw error;
  }
};

export const completeInspection = (inspectionId, completionData) => {
  try {
    const completions = loadInspectionCompletions();
    
    const completion = {
      id: inspectionId,
      completedAt: new Date().toISOString(),
      ...completionData
    };
    
    completions[inspectionId] = completion;
    saveInspectionCompletions(completions);
    
    // Update status to completed (status 4 = completed)
    updateInspectionStatus(inspectionId, 4);
    updateQueryStatus(inspectionId, 'Completed');
    
    const completionMessage = {
      senderId: 'system',
      senderName: 'System',
      senderType: 'system',
      message: '🎉 Inspection has been completed successfully! Final report is ready for download.',
      type: 'completion',
      completionData: completion
    };
    
    sendChatMessage(inspectionId, completionMessage);
    
    // Dispatch events for both inspector and customer interfaces
    window.dispatchEvent(new CustomEvent('inspectionCompleted', {
      detail: { 
        inspectionId, 
        completion,
        showToCustomer: true,
        showToInspector: true,
        statusChange: {
          from: 3, // Report Approved
          to: 4    // Completed
        }
      }
    }));
    
    // Specific event for status card updates
    window.dispatchEvent(new CustomEvent('inspectionStatusChanged', {
      detail: {
        inspectionId,
        newStatus: 4,
        statusName: 'Completed',
        completedAt: completion.completedAt,
        showCompletionPopup: true
      }
    }));
    
    // Event for customer notification popup
    window.dispatchEvent(new CustomEvent('showCustomerCompletionPopup', {
      detail: {
        inspectionId,
        completion,
        message: 'Your inspection has been completed! You can now download the final report.'
      }
    }));
    
    // Event for inspector confirmation popup
    window.dispatchEvent(new CustomEvent('showInspectorCompletionConfirm', {
      detail: {
        inspectionId,
        completion,
        message: 'Inspection marked as completed successfully!'
      }
    }));
    
    console.log('✅ Inspection completed with status change and popup events:', inspectionId);
    return completion;
  } catch (error) {
    console.error('❌ Error completing inspection:', error);
    throw error;
  }
};

export const getInspectionCompletion = (inspectionId) => {
  try {
    const completions = loadInspectionCompletions();
    return completions[inspectionId] || null;
  } catch (error) {
    console.error('❌ Error getting completion data:', error);
    return null;
  }
};

export const isInspectionCompleted = (inspectionId) => {
  try {
    const completion = getInspectionCompletion(inspectionId);
    return !!completion;
  } catch (error) {
    console.error('❌ Error checking completion status:', error);
    return false;
  }
};

export const updateCompletionData = (inspectionId, updateData) => {
  try {
    const completions = loadInspectionCompletions();
    
    if (completions[inspectionId]) {
      completions[inspectionId] = {
        ...completions[inspectionId],
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      
      saveInspectionCompletions(completions);
      
      window.dispatchEvent(new CustomEvent('completionUpdated', {
        detail: { inspectionId, updateData }
      }));
      
      console.log('✅ Completion data updated:', inspectionId);
      return completions[inspectionId];
    }
    
    console.warn('❌ Completion not found for update:', inspectionId);
    return null;
  } catch (error) {
    console.error('❌ Error updating completion:', error);
    throw error;
  }
};

export const sendChatMessageWithExtras = (inspectionId, messageData) => {
  try {
    const allChats = loadChatMessages();
    
    const newMessage = {
      id: generateMessageId(),
      ...messageData,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    if (!allChats[inspectionId]) {
      allChats[inspectionId] = [];
    }
    
    allChats[inspectionId].push(newMessage);
    
    if (messageData.type === 'status-update' && messageData.statusId !== undefined) {
      updateInspectionStatus(inspectionId, messageData.statusId);
    }
    
    if (messageData.type === 'completion') {
      const completionData = messageData.completionData || {};
      completeInspection(inspectionId, completionData);
    }
    
    saveChatMessages(allChats);
    
    const eventDetail = { inspectionId, message: newMessage };
    
    window.dispatchEvent(new CustomEvent('newChatMessage', { detail: eventDetail }));
    window.dispatchEvent(new CustomEvent('chatUpdated', { detail: eventDetail }));
    
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('inspection-chat');
      channel.postMessage({
        type: 'NEW_MESSAGE',
        data: eventDetail
      });
    }
    
    console.log('✅ Message sent with extras:', newMessage.id);
    return newMessage;
    
  } catch (error) {
    console.error('❌ Error sending message with extras:', error);
    throw error;
  }
};

// =====================
// REPORT MANAGEMENT
// =====================

export const generateInspectionReport = (inspectionId, reportData) => {
  try {
    const inspection = getQueryById(inspectionId);
    const photos = getInspectionPhotos(inspectionId);
    const status = getInspectionStatus(inspectionId);
    const completion = getInspectionCompletion(inspectionId);
    const chatMessages = getChatMessages(inspectionId);
    
    if (!inspection) {
      throw new Error(`Inspection not found: ${inspectionId}`);
    }
    
    const report = {
      id: generateReportId(),
      inspectionId: inspectionId,
      generatedAt: new Date().toISOString(),
      status: completion ? 'Final' : 'Draft',
      version: '1.0',
      ...reportData,
      
      // Core inspection data
      inspectionData: inspection,
      
      // Photos and media
      photosAttached: photos.length,
      photos: photos.map(photo => ({
        ...photo,
        // Remove large data from report summary
        data: photo.data ? '[Photo Data]' : null
      })),
      
      // Status information
      currentStatus: status.status || 0,
      statusHistory: status.statusHistory || [],
      
      // Completion information
      completionData: completion,
      isCompleted: !!completion,
      
      // Communication summary
      messageCount: chatMessages.length,
      lastCommunication: chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].timestamp : null,
      
      // Summary statistics
      summary: {
        totalPhotos: photos.length,
        inspectionDuration: completion && inspection.submittedAt ? 
          new Date(completion.completedAt) - new Date(inspection.submittedAt) : null,
        statusChanges: status.statusHistory ? status.statusHistory.length : 0,
        inspector: inspection.confirmedInspectorId,
        customer: inspection.customerName || 'N/A'
      }
    };
    
    const reports = loadReports();
    reports[report.id] = report;
    saveReports(reports);
    
    window.dispatchEvent(new CustomEvent('reportGenerated', {
      detail: { inspectionId, report }
    }));
    
    console.log('✅ Report generated:', report.id, 'for inspection:', inspectionId);
    return report;
    
  } catch (error) {
    console.error('❌ Error generating report:', error);
    throw error;
  }
};

export const getInspectionReports = (inspectionId) => {
  try {
    const allReports = loadReports();
    return Object.values(allReports)
      .filter(report => report.inspectionId === inspectionId)
      .sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt));
  } catch (error) {
    console.error('❌ Error getting inspection reports:', error);
    return [];
  }
};

export const getReportById = (reportId) => {
  try {
    const reports = loadReports();
    return reports[reportId] || null;
  } catch (error) {
    console.error('❌ Error getting report by ID:', error);
    return null;
  }
};

export const getAllReports = () => {
  try {
    const reports = loadReports();
    return Object.values(reports)
      .sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt));
  } catch (error) {
    console.error('❌ Error getting all reports:', error);
    return [];
  }
};

export const updateReport = (reportId, updateData) => {
  try {
    const reports = loadReports();
    
    if (reports[reportId]) {
      reports[reportId] = {
        ...reports[reportId],
        ...updateData,
        updatedAt: new Date().toISOString(),
        version: updateData.version || reports[reportId].version
      };
      
      saveReports(reports);
      
      window.dispatchEvent(new CustomEvent('reportUpdated', {
        detail: { reportId, updateData }
      }));
      
      console.log('✅ Report updated:', reportId);
      return reports[reportId];
    }
    
    console.warn('❌ Report not found for update:', reportId);
    return null;
  } catch (error) {
    console.error('❌ Error updating report:', error);
    throw error;
  }
};

export const deleteReport = (reportId) => {
  try {
    const reports = loadReports();
    
    if (reports[reportId]) {
      const deletedReport = reports[reportId];
      delete reports[reportId];
      saveReports(reports);
      
      window.dispatchEvent(new CustomEvent('reportDeleted', {
        detail: { reportId }
      }));
      
      console.log('✅ Report deleted:', reportId);
      return deletedReport;
    }
    
    console.warn('❌ Report not found for deletion:', reportId);
    return null;
  } catch (error) {
    console.error('❌ Error deleting report:', error);
    throw error;
  }
};

export const exportReport = (reportId, format = 'json') => {
  try {
    const report = getReportById(reportId);
    
    if (!report) {
      throw new Error(`Report not found: ${reportId}`);
    }
    
    const exportData = {
      report,
      exportedAt: new Date().toISOString(),
      format,
      exportedBy: 'QueryStorage System'
    };
    
    let exportContent;
    let mimeType;
    let filename;
    
    switch (format.toLowerCase()) {
      case 'json':
        exportContent = JSON.stringify(exportData, null, 2);
        mimeType = 'application/json';
        filename = `inspection-report-${report.inspectionId}-${Date.now()}.json`;
        break;
        
      case 'csv':
        // Basic CSV export for inspection summary
        const csvHeaders = ['Field', 'Value'];
        const csvRows = [
          ['Report ID', report.id],
          ['Inspection ID', report.inspectionId],
          ['Generated At', report.generatedAt],
          ['Status', report.status],
          ['Inspector', report.summary.inspector || 'N/A'],
          ['Customer', report.summary.customer],
          ['Total Photos', report.summary.totalPhotos],
          ['Status Changes', report.summary.statusChanges],
          ['Completed', report.isCompleted ? 'Yes' : 'No']
        ];
        
        exportContent = [csvHeaders, ...csvRows]
          .map(row => row.map(field => `"${field}"`).join(','))
          .join('\n');
        mimeType = 'text/csv';
        filename = `inspection-report-${report.inspectionId}-${Date.now()}.csv`;
        break;
        
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
    
    // Create download blob
    const blob = new Blob([exportContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    // Trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('✅ Report exported:', reportId, 'as', format);
    return { success: true, filename };
    
  } catch (error) {
    console.error('❌ Error exporting report:', error);
    throw error;
  }
};

// =====================
// ANALYTICS & INSIGHTS
// =====================

export const getInspectionAnalytics = () => {
  try {
    const queries = getAllQueries();
    const statuses = getAllInspectionStatuses();
    const reports = getAllReports();
    
    const analytics = {
      totalInspections: queries.length,
      completedInspections: queries.filter(q => q.status === 'Completed').length,
      activeInspections: queries.filter(q => q.status === 'In Progress').length,
      pendingInspections: queries.filter(q => q.status === 'Active').length,
      
      averageCompletionTime: calculateAverageCompletionTime(queries),
      
      statusDistribution: queries.reduce((acc, query) => {
        acc[query.status] = (acc[query.status] || 0) + 1;
        return acc;
      }, {}),
      
      inspectorWorkload: queries.reduce((acc, query) => {
        if (query.confirmedInspectorId) {
          acc[query.confirmedInspectorId] = (acc[query.confirmedInspectorId] || 0) + 1;
        }
        return acc;
      }, {}),
      
      totalReports: reports.length,
      recentActivity: getRecentActivity(),
      
      generatedAt: new Date().toISOString()
    };
    
    return analytics;
  } catch (error) {
    console.error('❌ Error generating analytics:', error);
    return null;
  }
};

const calculateAverageCompletionTime = (queries) => {
  try {
    const completedQueries = queries.filter(q => 
      q.status === 'Completed' && q.submittedAt && q.updatedAt
    );
    
    if (completedQueries.length === 0) return null;
    
    const totalTime = completedQueries.reduce((sum, query) => {
      const start = new Date(query.submittedAt);
      const end = new Date(query.updatedAt);
      return sum + (end - start);
    }, 0);
    
    return Math.round(totalTime / completedQueries.length / (1000 * 60 * 60)); // Hours
  } catch (error) {
    console.error('❌ Error calculating average completion time:', error);
    return null;
  }
};

const getRecentActivity = () => {
  try {
    const queries = getAllQueries();
    const notifications = loadNotifications();
    
    const activities = [
      ...queries.map(q => ({
        type: 'query',
        id: q.id,
        timestamp: q.updatedAt || q.submittedAt,
        description: `Query ${q.status.toLowerCase()}: ${q.id}`
      })),
      ...notifications.slice(0, 10).map(n => ({
        type: 'notification',
        id: n.id,
        timestamp: n.createdAt,
        description: `Notification: ${n.title || 'New notification'}`
      }))
    ];
    
    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 20);
  } catch (error) {
    console.error('❌ Error getting recent activity:', error);
    return [];
  }
};

// =====================
// UTILITY FUNCTIONS
// =====================

export const getSystemStats = () => {
  try {
    return {
      storageType,
      totalQueries: loadQueries().length,
      totalNotifications: loadNotifications().length,
      totalChatSessions: Object.keys(loadChatMessages()).length,
      totalPhotos: Object.values(loadInspectionPhotos()).reduce((sum, photos) => sum + photos.length, 0),
      totalReports: Object.keys(loadReports()).length,
      lastActivity: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error getting system stats:', error);
    return null;
  }
};

export const validateDataIntegrity = () => {
  try {
    const issues = [];
    const queries = getAllQueries();
    const statuses = getAllInspectionStatuses();
    const photos = loadInspectionPhotos();
    const completions = loadInspectionCompletions();
    
    // Check for orphaned data
    Object.keys(statuses).forEach(inspectionId => {
      if (!queries.find(q => q.id === inspectionId)) {
        issues.push(`Orphaned status data for inspection: ${inspectionId}`);
      }
    });
    
    Object.keys(photos).forEach(inspectionId => {
      if (!queries.find(q => q.id === inspectionId)) {
        issues.push(`Orphaned photo data for inspection: ${inspectionId}`);
      }
    });
    
    Object.keys(completions).forEach(inspectionId => {
      if (!queries.find(q => q.id === inspectionId)) {
        issues.push(`Orphaned completion data for inspection: ${inspectionId}`);
      }
    });
    
    return {
      isValid: issues.length === 0,
      issues,
      checkedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Error validating data integrity:', error);
    return {
      isValid: false,
      issues: ['Error during validation'],
      checkedAt: new Date().toISOString()
    };
  }
};

export const cleanupOrphanedData = () => {
  try {
    const queries = getAllQueries();
    const queryIds = new Set(queries.map(q => q.id));
    
    // Clean up statuses
    const statuses = loadInspectionStatuses();
    Object.keys(statuses).forEach(inspectionId => {
      if (!queryIds.has(inspectionId)) {
        delete statuses[inspectionId];
      }
    });
    saveInspectionStatuses(statuses);
    
    // Clean up photos
    const photos = loadInspectionPhotos();
    Object.keys(photos).forEach(inspectionId => {
      if (!queryIds.has(inspectionId)) {
        delete photos[inspectionId];
      }
    });
    saveInspectionPhotos(photos);
    
    // Clean up completions
    const completions = loadInspectionCompletions();
    Object.keys(completions).forEach(inspectionId => {
      if (!queryIds.has(inspectionId)) {
        delete completions[inspectionId];
      }
    });
    saveInspectionCompletions(completions);
    
    // Clean up chat messages
    const chatMessages = loadChatMessages();
    Object.keys(chatMessages).forEach(inspectionId => {
      if (!queryIds.has(inspectionId)) {
        delete chatMessages[inspectionId];
      }
    });
    saveChatMessages(chatMessages);
    
    console.log('✅ Cleanup completed');
    
    window.dispatchEvent(new CustomEvent('dataCleanupCompleted'));
    
    return { success: true, cleanedAt: new Date().toISOString() };
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  }
};

// =====================
// EVENT LISTENERS & LIFECYCLE
// =====================

// Listen for storage changes (for localStorage sync across tabs)
if (typeof window !== 'undefined' && storageType === 'localStorage') {
  window.addEventListener('localStorageChange', (event) => {
    const { key } = event.detail;
    
    // Emit specific events based on what changed
    switch (key) {
      case STORAGE_KEY:
        window.dispatchEvent(new CustomEvent('queriesUpdated', {
          detail: { type: 'external_update' }
        }));
        break;
      case NOTIFICATIONS_KEY:
        window.dispatchEvent(new CustomEvent('notificationsUpdated', {
          detail: { type: 'external_update' }
        }));
        break;
      case CHAT_MESSAGES_KEY:
        window.dispatchEvent(new CustomEvent('chatUpdated', {
          detail: { type: 'external_update' }
        }));
        break;
    }
  });
}

// Export storage interface for advanced usage
export const storageInterface = {
  storage,
  storageType,
  generateQueryId,
  generateNotificationId,
  generateBidId,
  generateMessageId,
  generateReportId
};

// =====================
// COMPLETION EVENT HANDLERS
// =====================

export const handleInspectionCompletionFromUI = (inspectionId, completionTrigger = 'manual') => {
  try {
    console.log('🎯 Handling completion from UI:', { inspectionId, completionTrigger });
    
    // Use the enhanced completion function
    const result = markInspectionComplete(inspectionId, {
      completionTrigger,
      completedVia: 'status_update',
      uiTriggered: true
    });
    
    console.log('✅ Completion handled successfully from UI');
    return result;
  } catch (error) {
    console.error('❌ Error handling completion from UI:', error);
    throw error;
  }
};

export const triggerCustomerCompletionPopup = (inspectionId, completionData) => {
  try {
    // Dispatch event specifically for customer popup
    window.dispatchEvent(new CustomEvent('showCustomerCompletionPopup', {
      detail: {
        inspectionId,
        title: 'Inspection Completed! 🎉',
        message: 'Your inspection has been successfully completed. The final report is now available for download.',
        ...completionData,
        showDownloadButton: true,
        autoClose: false,
        priority: 'high'
      }
    }));
    
    console.log('✅ Customer completion popup triggered');
  } catch (error) {
    console.error('❌ Error triggering customer popup:', error);
  }
};

export const triggerInspectorCompletionConfirm = (inspectionId, completionData) => {
  try {
    // Dispatch event specifically for inspector confirmation
    window.dispatchEvent(new CustomEvent('showInspectorCompletionConfirm', {
      detail: {
        inspectionId,
        title: 'Inspection Completed Successfully! ✅',
        message: 'The inspection has been marked as completed. The customer will be notified and can now access the final report.',
        ...completionData,
        autoClose: true,
        duration: 3000,
        priority: 'high'
      }
    }));
    
    console.log('✅ Inspector completion confirmation triggered');
  } catch (error) {
    console.error('❌ Error triggering inspector confirmation:', error);
  }
};

// Enhanced completion with better event handling
export const completeInspectionWithEvents = (inspectionId, completionData = {}) => {
  try {
    console.log('🔄 Starting enhanced completion process:', inspectionId);
    
    // Complete the inspection
    const completion = completeInspection(inspectionId, {
      ...completionData,
      enhancedCompletion: true,
      eventsTriggered: true
    });
    
    // Update status to completed (status 4)
    updateInspectionStatus(inspectionId, 4);
    updateQueryStatus(inspectionId, 'Completed');
    
    // Generate final report
    const report = generateInspectionReport(inspectionId, {
      title: `Final Inspection Report - ${inspectionId}`,
      type: 'Final Report',
      status: 'Completed',
      generatedBy: 'system',
      includeSummary: true
    });
    
    // Prepare event data
    const eventData = {
      inspectionId,
      completion,
      report,
      completedAt: completion.completedAt,
      statusChange: {
        from: 3, // Report Approved
        to: 4    // Completed
      }
    };
    
    // Trigger customer popup
    triggerCustomerCompletionPopup(inspectionId, {
      ...eventData,
      reportId: report.id
    });
    
    // Trigger inspector confirmation
    triggerInspectorCompletionConfirm(inspectionId, {
      ...eventData,
      reportGenerated: true
    });
    
    // Send completion message to chat
    const completionMessage = {
      senderId: 'system',
      senderName: 'System',
      senderType: 'system',
      message: '🎉 Inspection completed successfully! Final report is ready for download.',
      type: 'completion',
      statusId: 4,
      completionData: eventData
    };
    
    sendChatMessage(inspectionId, completionMessage);
    
    // Update inspection card status
    window.dispatchEvent(new CustomEvent('updateInspectionCard', {
      detail: {
        inspectionId,
        newStatus: 4,
        statusText: 'Completed',
        completed: true,
        showCompletedBadge: true,
        reportReady: true
      }
    }));
    
    // Broadcast completion across tabs
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('inspection-updates');
      channel.postMessage({
        type: 'INSPECTION_COMPLETED',
        data: eventData
      });
    }
    
    console.log('✅ Enhanced completion process finished successfully');
    return {
      success: true,
      completion,
      report,
      eventData
    };
    
  } catch (error) {
    console.error('❌ Error in enhanced completion process:', error);
    
    // Dispatch error event
    window.dispatchEvent(new CustomEvent('inspectionCompletionError', {
      detail: {
        inspectionId,
        error: error.message,
        timestamp: new Date().toISOString()
      }
    }));
    
    throw error;
  }
};

// Export all storage functions for bulk operations
export const bulkOperations = {
  clearAllData,
  cleanupOrphanedData,
  validateDataIntegrity,
  getSystemStats,
  getInspectionAnalytics
};

console.log('✅ QueryStorage module fully loaded with', Object.keys(window).filter(k => k.startsWith('export')).length, 'exports');

// Default export for convenience
export default {
  // Query operations
  saveQuery,
  getAllQueries,
  getQueryById,
  updateQueryStatus,
  addBidToQuery,
  confirmInspectorForQuery,
  deleteQuery,
  
  // Notification operations
  createInspectorNotification,
  getInspectorNotifications,
  markNotificationAsRead,
  deleteNotification,
  
  // Chat operations
  getChatMessages,
  sendChatMessage,
  markMessagesAsRead,
  initializeInspectionChat,
  
  // Status operations
  updateInspectionStatus,
  getInspectionStatus,
  
  // Photo operations
  addPhotoToInspection,
  getInspectionPhotos,
  removePhotoFromInspection,
  
  // Completion operations
  completeInspection,
  markInspectionComplete,
  handleReportApprovalComplete,
  handleInspectionCompletionFromUI,
  completeInspectionWithEvents,
  triggerCustomerCompletionPopup,
  triggerInspectorCompletionConfirm,
  getInspectionCompletion,
  isInspectionCompleted,
  
  // Report operations
  generateInspectionReport,
  getInspectionReports,
  getReportById,
  exportReport,
  
  // Analytics
  getInspectionAnalytics,
  
  // Utilities
  clearAllData,
  validateDataIntegrity,
  getSystemStats
};