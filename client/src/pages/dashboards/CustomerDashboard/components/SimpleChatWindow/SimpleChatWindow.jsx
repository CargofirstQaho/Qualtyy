// src/components/SimpleChatWindow/SimpleChatWindow.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2,
  User,
  Clock,
  Phone,
  Video
} from 'lucide-react';
import { useQuery } from '../../../../../context/QueryContext';

const SimpleChatWindow = ({ 
  inspection, 
  userType, // 'customer' or 'inspector'
  onClose 
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const { 
    sendMessage, 
    getChatForInspection, 
    loadChatMessages, 
    getCurrentCustomerId,
    getCurrentInspectorId,
    onChatChange,
    initializeInspectionChat
  } = useQuery();

  // Get current user info based on type
  const getCurrentUser = () => {
    if (userType === 'customer') {
      return {
        id: getCurrentCustomerId(),
        name: 'Customer',
        type: 'customer'
      };
    } else {
      return {
        id: getCurrentInspectorId(),
        name: 'Inspector',
        type: 'inspector'
      };
    }
  };

  const currentUser = getCurrentUser();
  const otherUser = userType === 'customer' 
    ? { name: inspection?.inspectorName || 'Inspector', type: 'inspector' }
    : { name: inspection?.customerName || 'Customer', type: 'customer' };

  const getInspectionId = () => {
    return inspection?.inspectionId || inspection?.queryId || inspection?.id;
  };

  // Load chat messages when component mounts
  useEffect(() => {
    const inspectionId = getInspectionId();
    
    if (inspectionId && inspection) {
      console.log('💬 Loading chat for inspection:', inspectionId);
      
      try {
        loadChatMessages(inspectionId);
        const chatMessages = getChatForInspection(inspectionId);
        setMessages(chatMessages || []);

        // Initialize chat if empty and user is inspector
        if ((!chatMessages || chatMessages.length === 0) && userType === 'inspector') {
          initializeInspectionChat(
            inspectionId, 
            'Inspector', 
            'Customer'
          );
        }
      } catch (error) {
        console.error('❌ Error loading chat:', error);
      }
    }
  }, [inspection, userType]);

  // Listen for real-time chat updates
  useEffect(() => {
    const inspectionId = getInspectionId();
    if (!inspectionId) return;

    const unsubscribe = onChatChange((eventData) => {
      if (eventData.inspectionId === inspectionId) {
        console.log('💬 Chat updated:', eventData);
        const updatedMessages = getChatForInspection(inspectionId);
        setMessages(updatedMessages || []);
      }
    });

    return unsubscribe;
  }, [inspection]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (!isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMinimized]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const inspectionId = getInspectionId();
    if (!inspectionId) {
      alert('No inspection ID available. Please try again.');
      return;
    }

    setIsLoading(true);
    try {
      const messageData = {
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderType: currentUser.type,
        message: newMessage.trim(),
        type: 'text'
      };

      await sendMessage(inspectionId, messageData);
      setNewMessage('');
      
    } catch (error) {
      console.error('❌ Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!inspection) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-14' : 'w-96 h-96'
      }`}>
        {/* Header */}
        <div className="bg-green-600 text-white p-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium text-sm">
                Chat with {otherUser.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-green-100 hover:text-white"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
              <button
                onClick={onClose}
                className="text-green-100 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <div className="mt-2 text-xs text-green-100">
              {inspection.queryTitle || 'Inspection Chat'}
            </div>
          )}
        </div>

        {/* Chat Content - Only show when not minimized */}
        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div className="h-64 overflow-y-auto p-3 bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Start your conversation!</p>
                </div>
              ) : (
                messages.map((message, index) => {
                  const isOwnMessage = message.senderId === currentUser.id;
                  const isSystemMessage = message.senderType === 'system';
                  
                  return (
                    <div
                      key={message.id || index}
                      className={`mb-3 ${
                        isSystemMessage ? 'text-center' : isOwnMessage ? 'text-right' : 'text-left'
                      }`}
                    >
                      {isSystemMessage ? (
                        <div className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full inline-block">
                          {message.message}
                        </div>
                      ) : (
                        <div className={`max-w-xs inline-block p-2 rounded-lg text-sm ${
                          isOwnMessage 
                            ? 'bg-green-600 text-white' 
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}>
                          <p>{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            isOwnMessage ? 'text-green-100' : 'text-gray-500'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message ${otherUser.name}...`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isLoading}
                  className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center space-x-3 mt-2">
                <button className="text-gray-500 hover:text-gray-700 text-xs flex items-center space-x-1">
                  <Phone className="h-3 w-3" />
                  <span>Call</span>
                </button>
                <button className="text-gray-500 hover:text-gray-700 text-xs flex items-center space-x-1">
                  <Video className="h-3 w-3" />
                  <span>Video</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SimpleChatWindow;