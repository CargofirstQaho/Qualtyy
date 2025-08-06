import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Clock, 
  User, 
  AlertTriangle,
  CheckCircle,
  Send,
  Bot,
  Calendar,
  MapPin,
  FileText,
  Upload,
  Camera,
  Play,
  Pause,
  Eye,
  Download,
  X,
  Package,
  ClipboardList,
  Microscope,
  FileCheck,
  XCircle
} from 'lucide-react';

const InspectionRoom = ({ cancellationMessages = [] }) => {
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({});
  const messagesEndRef = useRef(null);

  // Sample inspection data
  const inspectionDetails = [
    {
      id: 'INS-2024-001',
      type: 'Residential Property Inspection',
      client: 'John Smith',
      location: 'New York, NY',
      date: '2024-07-05',
      time: '10:00 AM',
      status: 'In Progress',
      estimatedDuration: '4 hours',
      priority: 'High',
      description: 'Complete residential property inspection including electrical, plumbing, and structural assessment.',
      clientContact: '+1 (555) 123-4567',
      clientEmail: 'john.smith@email.com',
      propertyAddress: '123 Main Street, New York, NY 10001',
      propertyType: 'Single Family Home',
      currentStage: 2
    },
    {
      id: 'INS-2024-002',
      type: 'Commercial Building Safety',
      client: 'ABC Corporation',
      location: 'Los Angeles, CA',
      date: '2024-07-05',
      time: '2:00 PM',
      status: 'Scheduled',
      estimatedDuration: '6 hours',
      priority: 'Critical',
      description: 'Safety inspection of 5-story office building including fire safety systems and emergency exits.',
      clientContact: '+1 (555) 987-6543',
      clientEmail: 'safety@abccorp.com',
      propertyAddress: '456 Business Ave, Los Angeles, CA 90001',
      propertyType: '5-Story Office Building',
      currentStage: 0
    },
    {
      id: 'INS-2024-003',
      type: 'Electrical System Check',
      client: 'Mike Johnson',
      location: 'Chicago, IL',
      date: '2024-07-04',
      time: '9:00 AM',
      status: 'Completed',
      estimatedDuration: '3 hours',
      priority: 'Medium',
      description: 'Electrical system inspection for older home renovation project.',
      clientContact: '+1 (555) 456-7890',
      clientEmail: 'mike.johnson@email.com',
      propertyAddress: '789 Electric St, Chicago, IL 60601',
      propertyType: 'Historic Home',
      currentStage: 4
    }
  ];

  // Inspection stages
  const inspectionStages = [
    {
      id: 0,
      name: 'Inspection Started',
      icon: Play,
      description: 'Initial inspection setup and documentation',
      color: 'blue'
    },
    {
      id: 1,
      name: 'Samples Collected',
      icon: Package,
      description: 'Sample collection and cataloging',
      color: 'yellow'
    },
    {
      id: 2,
      name: 'Analysis',
      icon: Microscope,
      description: 'Laboratory analysis and testing',
      color: 'purple'
    },
    {
      id: 3,
      name: 'Report Preparation',
      icon: FileText,
      description: 'Compilation of findings and report generation',
      color: 'indigo'
    },
    {
      id: 4,
      name: 'Report Approved',
      icon: CheckCircle,
      description: 'Final report approved and completed',
      color: 'green'
    },
    {
      id: 5,
      name: 'Report Rejected',
      icon: XCircle,
      description: 'Report requires revision',
      color: 'red'
    }
  ];

  const initializeChat = (inspection) => {
    setMessages([
      {
        id: 1,
        type: 'system',
        message: `Chat initiated for ${inspection.type} (ID: ${inspection.id})`,
        timestamp: new Date().toISOString(),
        sender: 'System'
      },
      {
        id: 2,
        type: 'info',
        message: `Hello! I'm here to assist with your inspection. Current status: ${inspection.status}`,
        timestamp: new Date().toISOString(),
        sender: 'Customer Support'
      }
    ]);
  };

  const handleChatWithCustomer = (inspection) => {
    setSelectedInspection(inspection);
    initializeChat(inspection);
    setShowChatModal(true);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      type: 'inspector',
      message: newMessage,
      timestamp: new Date().toISOString(),
      sender: 'You'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate customer/system response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'customer',
        message: 'Thank you for the update. Please keep me informed of any developments.',
        timestamp: new Date().toISOString(),
        sender: selectedInspection?.client || 'Customer'
      }]);
    }, 1500);
  };

  const handleFileUpload = (stageId, event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prev => ({
      ...prev,
      [stageId]: [...(prev[stageId] || []), ...files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        uploadTime: new Date().toISOString()
      }))]
    }));
  };

  const getStageColor = (stage, currentStage) => {
    if (stage.id < currentStage) return 'bg-green-100 text-green-800 border-green-200';
    if (stage.id === currentStage) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMessageStyle = (type) => {
    switch (type) {
      case 'system':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'info':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'inspector':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'customer':
        return 'bg-gray-50 border-gray-200 text-gray-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'system':
        return <Bot size={16} className="text-blue-600" />;
      case 'info':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'inspector':
        return <User size={16} className="text-purple-600" />;
      case 'customer':
        return <MessageCircle size={16} className="text-gray-600" />;
      default:
        return <MessageCircle size={16} className="text-gray-600" />;
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inspection Room</h1>
            <p className="text-gray-600 mt-1">Manage inspection workflows and communicate with clients</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">System Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Inspection Details Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Inspection Details</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {inspectionDetails.map((inspection) => (
              <div key={inspection.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{inspection.type}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <User size={14} />
                          <span>{inspection.client}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} />
                          <span>{inspection.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} />
                          <span>{inspection.date} at {inspection.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock size={14} />
                          <span>{inspection.estimatedDuration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(inspection.status)}`}>
                      {inspection.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(inspection.priority)}`}>
                      {inspection.priority}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{inspection.description}</p>

                  <button
                    onClick={() => handleChatWithCustomer(inspection)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                  >
                    <MessageCircle size={16} />
                    <span>Chat with Customer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && selectedInspection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-7xl w-full h-[85vh] flex overflow-hidden">
            {/* Left Side - Inspection Workflow */}
            <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Inspection Workflow</h3>
                <span className="text-sm text-gray-500">ID: {selectedInspection.id}</span>
              </div>

              {/* Inspection Info */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-3">{selectedInspection.type}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Client:</span>
                    <p className="text-gray-900">{selectedInspection.client}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Location:</span>
                    <p className="text-gray-900">{selectedInspection.location}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Date & Time:</span>
                    <p className="text-gray-900">{selectedInspection.date} at {selectedInspection.time}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Duration:</span>
                    <p className="text-gray-900">{selectedInspection.estimatedDuration}</p>
                  </div>
                </div>
              </div>

              {/* Workflow Stages */}
              <div className="space-y-4">
                {inspectionStages.map((stage) => {
                  const StageIcon = stage.icon;
                  const isCompleted = stage.id < selectedInspection.currentStage;
                  const isCurrent = stage.id === selectedInspection.currentStage;
                  const isRejected = stage.id === 5 && selectedInspection.currentStage === 5;
                  
                  return (
                    <div key={stage.id} className={`p-4 rounded-lg border-2 transition-all ${getStageColor(stage, selectedInspection.currentStage)}`}>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-full ${
                          isCompleted ? 'bg-green-500' : 
                          isCurrent ? 'bg-blue-500' : 
                          isRejected ? 'bg-red-500' : 'bg-gray-300'
                        }`}>
                          <StageIcon size={16} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold">{stage.name}</h5>
                          <p className="text-sm opacity-75">{stage.description}</p>
                        </div>
                        {isCompleted && (
                          <CheckCircle size={20} className="text-green-600" />
                        )}
                        {isCurrent && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        )}
                      </div>

                      {/* File Upload Section */}
                      {(isCurrent || isCompleted) && (
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="file"
                              multiple
                              accept="image/*,.pdf,.doc,.docx"
                              onChange={(e) => handleFileUpload(stage.id, e)}
                              className="hidden"
                              id={`upload-${stage.id}`}
                            />
                            <label
                              htmlFor={`upload-${stage.id}`}
                              className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer text-sm"
                            >
                              <Upload size={14} />
                              <span>Upload Files</span>
                            </label>
                            <button className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                              <Camera size={14} />
                              <span>Take Photo</span>
                            </button>
                          </div>

                          {/* Uploaded Files */}
                          {uploadedFiles[stage.id] && uploadedFiles[stage.id].length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-gray-600">Uploaded Files:</p>
                              {uploadedFiles[stage.id].map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-white rounded border text-sm">
                                  <span className="truncate">{file.name}</span>
                                  <div className="flex items-center space-x-2">
                                    <button className="text-blue-600 hover:text-blue-800">
                                      <Eye size={14} />
                                    </button>
                                    <button className="text-green-600 hover:text-green-800">
                                      <Download size={14} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Chat */}
            <div className="w-1/2 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MessageCircle size={20} className="text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Chat with {selectedInspection.client}</h3>
                      <p className="text-sm text-gray-600">{selectedInspection.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChatModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`p-3 rounded-lg border ${getMessageStyle(message.type)}`}>
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 mt-1">
                        {getMessageIcon(message.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{message.sender}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Send size={16} />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionRoom;