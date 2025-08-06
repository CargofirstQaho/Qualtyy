import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  Send,
  User,
  Bot,
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  MapPin,
  Play,
  Beaker,
  FileText,
  PartyPopper,
  Camera,
  Video,
  Download,
  Eye,
  File,
  Calendar,
  Building,
  Package,
  Truck,
  Container,
  Shield,
  X
} from 'lucide-react';

// Customer Chat Message Component
const CustomerChatMessage = ({ message, currentUserId }) => {
  const isOwnMessage = message.senderId === currentUserId;
  const isSystemMessage = message.senderType === 'system';
  const isStatusUpdate = message.type === 'status-update';
  const isPhotoMessage = message.type === 'photo' || message.type === 'media' || message.type === 'sample_collection';
  const isDocumentMessage = message.type === 'document' || message.type === 'psi' || message.type === 'loading_track' || message.type === 'stuffing_container' || message.type === 'inspection_start';
  const isCompletionMessage = message.type === 'completion';

  const getMessageStyle = () => {
    if (isSystemMessage || isStatusUpdate) {
      return 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-800 mx-auto max-w-3xl text-center shadow-sm';
    }
    if (isCompletionMessage) {
      return 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800 mx-auto max-w-3xl text-center shadow-sm';
    }
    if (isPhotoMessage || isDocumentMessage) {
      return 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 text-purple-800 mx-auto max-w-5xl shadow-lg';
    }
    if (isOwnMessage) {
      return 'bg-gradient-to-r from-blue-600 to-blue-700 text-white ml-auto max-w-lg shadow-lg';
    }
    return 'bg-gradient-to-r from-green-50 to-green-100 text-green-900 mr-auto max-w-lg border border-green-200 shadow-sm';
  };

  const getMessageAlignment = () => {
    if (isSystemMessage || isStatusUpdate || isPhotoMessage || isDocumentMessage || isCompletionMessage) return 'justify-center';
    return isOwnMessage ? 'justify-end' : 'justify-start';
  };

  const getSenderInfo = () => {
    if (isSystemMessage || isStatusUpdate) return { name: 'System', icon: Bot, color: 'text-blue-600' };
    if (isCompletionMessage) return { name: 'System', icon: PartyPopper, color: 'text-green-600' };
    if (isPhotoMessage) return { name: 'Inspector', icon: Camera, color: 'text-purple-600' };
    if (isDocumentMessage) return { name: 'Inspector', icon: FileText, color: 'text-purple-600' };
    
    if (isOwnMessage) {
      return { name: 'You', icon: User, color: 'text-blue-100' };
    }
    
    return { name: message.senderName || 'Inspector', icon: Shield, color: 'text-green-600' };
  };

  const senderInfo = getSenderInfo();
  const IconComponent = senderInfo.icon;

  // Render Inspector Documentation
  const renderInspectorDocumentation = () => {
    return (
      <div className="mt-3 space-y-4">
        {/* Inspector Selfie and Facility Images */}
        {message.inspectionStartData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {message.inspectionStartData.inspectorSelfie && (
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium text-sm mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Inspector Verification
                </h4>
                <div className="relative">
                  <img
                    src={message.inspectionStartData.inspectorSelfie.url}
                    alt="Inspector Selfie"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {new Date(message.inspectionStartData.inspectorSelfie.timestamp).toLocaleString()}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">Inspector: {message.inspectionStartData.inspectorName}</p>
              </div>
            )}

            {message.inspectionStartData.facilityImages && message.inspectionStartData.facilityImages.length > 0 && (
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium text-sm mb-2 flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Facility Images
                </h4>
                <div className="space-y-2">
                  {message.inspectionStartData.facilityImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.url}
                        alt={`Facility ${index + 1}`}
                        className="w-full h-32 object-cover rounded border"
                      />
                      {image.caption && (
                        <p className="text-xs text-gray-600 mt-1">{image.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sample Collection Media */}
        {message.sampleCollectionData && (
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-sm mb-3 flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Commodity Documentation
            </h4>
            
            {message.sampleCollectionData.photos && message.sampleCollectionData.photos.length > 0 && (
              <div className="mb-4">
                <h5 className="font-medium text-sm mb-2">Commodity Photos:</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {message.sampleCollectionData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo.url}
                        alt={`Commodity Photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded border"
                      />
                      {photo.caption && (
                        <p className="text-xs text-gray-600 mt-1">{photo.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {message.sampleCollectionData.videos && message.sampleCollectionData.videos.length > 0 && (
              <div>
                <h5 className="font-medium text-sm mb-2">Commodity Videos:</h5>
                <div className="space-y-3">
                  {message.sampleCollectionData.videos.map((video, index) => (
                    <div key={index}>
                      <video
                        src={video.url}
                        controls
                        className="w-full max-h-48 rounded border"
                      />
                      {video.caption && (
                        <p className="text-xs text-gray-600 mt-1">{video.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PSI Document */}
        {message.psiData && (
          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-lg">PSI Certificate Document</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 bg-blue-50 rounded-lg">
              <div><span className="font-medium">Date:</span> {message.psiData.date}</div>
              <div><span className="font-medium">Mill Name:</span> {message.psiData.millName}</div>
              <div><span className="font-medium">Inspector:</span> {message.psiData.inspectorName}</div>
              <div><span className="font-medium">Shipper:</span> {message.psiData.shipper}</div>
              <div><span className="font-medium">Commodity:</span> {message.psiData.commodity}</div>
              <div><span className="font-medium">Quality Grade:</span> {message.psiData.quality}</div>
            </div>

            {message.psiData.analysis && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-semibold mb-3 text-center">QUALITY ANALYSIS REPORT</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 text-left">Parameter</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Result</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Standard</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Moisture Content</td>
                        <td className="border border-gray-300 px-4 py-2">{message.psiData.analysis.moisture}%</td>
                        <td className="border border-gray-300 px-4 py-2">Max 14%</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-medium">Broken Rice</td>
                        <td className="border border-gray-300 px-4 py-2">{message.psiData.analysis.broken}%</td>
                        <td className="border border-gray-300 px-4 py-2">Max 5%</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Damaged & Discolored (DD)</td>
                        <td className="border border-gray-300 px-4 py-2">{message.psiData.analysis.dd}%</td>
                        <td className="border border-gray-300 px-4 py-2">Max 3%</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-medium">Chalky Rice</td>
                        <td className="border border-gray-300 px-4 py-2">{message.psiData.analysis.chalky}%</td>
                        <td className="border border-gray-300 px-4 py-2">Max 6%</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Additional Mixture</td>
                        <td className="border border-gray-300 px-4 py-2">{message.psiData.analysis.addMixture}%</td>
                        <td className="border border-gray-300 px-4 py-2">Max 1%</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-medium">Foreign Rice Kernels (FRK)</td>
                        <td className="border border-gray-300 px-4 py-2">{message.psiData.analysis.frk}%</td>
                        <td className="border border-gray-300 px-4 py-2">Max 7%</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Polish Status</td>
                        <td className="border border-gray-300 px-4 py-2">{message.psiData.analysis.polish}</td>
                        <td className="border border-gray-300 px-4 py-2">As Required</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 p-3 bg-blue-100 rounded border-l-4 border-blue-500">
                  <p className="text-sm font-medium">
                    ✓ This commodity has been inspected and meets the quality standards as per the analysis above.
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Certified by: {message.psiData.inspectorName} | Date: {message.psiData.date}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading Track Documentation */}
        {message.loadingTrackData && (
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-4">
              <Truck className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-lg">Loading Track Documentation</h4>
            </div>

            {message.loadingTrackData.bagDetails && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <h5 className="font-semibold mb-3">Bag Details & Specifications</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-3 rounded border">
                    <span className="font-medium text-sm">Bag Weight:</span>
                    <p className="text-lg font-bold text-green-600">{message.loadingTrackData.bagDetails.weight}</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <span className="font-medium text-sm">Bag Quality:</span>
                    <p className="text-lg font-bold text-green-600">{message.loadingTrackData.bagDetails.quality}</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <span className="font-medium text-sm">Number of Bags:</span>
                    <p className="text-lg font-bold text-green-600">{message.loadingTrackData.bagDetails.count}</p>
                  </div>
                </div>
                
                {message.loadingTrackData.bagDetails.photos && (
                  <div>
                    <h6 className="font-medium mb-2">Bag Documentation Photos:</h6>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {message.loadingTrackData.bagDetails.photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={photo.url} 
                            alt={`Bag Photo ${index + 1}`} 
                            className="w-full h-24 object-cover rounded border" 
                          />
                          {photo.caption && (
                            <p className="text-xs text-center mt-1">{photo.caption}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {message.loadingTrackData.dispatchDetails && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-semibold mb-3">Dispatch Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-sm">Driver Contact:</span>
                    <p className="text-lg">{message.loadingTrackData.dispatchDetails.driverContact}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Truck Number:</span>
                    <p className="text-lg font-mono">{message.loadingTrackData.dispatchDetails.truckNumber}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Total Bags:</span>
                    <p className="text-lg font-bold text-blue-600">{message.loadingTrackData.dispatchDetails.totalBags}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Total Weight:</span>
                    <p className="text-lg font-bold text-blue-600">{message.loadingTrackData.dispatchDetails.totalTons}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Container Stuffing Documentation */}
        {message.stuffingContainerData && (
          <div className="p-4 bg-white rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2 mb-4">
              <Container className="h-5 w-5 text-orange-600" />
              <h4 className="font-semibold text-lg">Container Stuffing Documentation</h4>
            </div>

            {message.stuffingContainerData.images && (
              <div className="mb-6">
                <h5 className="font-semibold mb-3">Container Preparation Images</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {message.stuffingContainerData.images.emptyContainer && (
                    <div className="bg-orange-50 p-3 rounded border">
                      <h6 className="font-medium mb-2">Empty Container Inspection</h6>
                      <img 
                        src={message.stuffingContainerData.images.emptyContainer} 
                        alt="Empty Container" 
                        className="w-full h-32 object-cover rounded border" 
                      />
                    </div>
                  )}
                  {message.stuffingContainerData.images.craftPaper && (
                    <div className="bg-orange-50 p-3 rounded border">
                      <h6 className="font-medium mb-2">Craft Paper Lining</h6>
                      <img 
                        src={message.stuffingContainerData.images.craftPaper} 
                        alt="Craft Paper" 
                        className="w-full h-32 object-cover rounded border" 
                      />
                    </div>
                  )}
                  {message.stuffingContainerData.images.fumigation && (
                    <div className="bg-orange-50 p-3 rounded border">
                      <h6 className="font-medium mb-2">Fumigation Process</h6>
                      <img 
                        src={message.stuffingContainerData.images.fumigation} 
                        alt="Fumigation" 
                        className="w-full h-32 object-cover rounded border" 
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {message.stuffingContainerData.sealing && (
              <div className="p-4 bg-red-50 rounded-lg">
                <h5 className="font-semibold mb-3">Container Sealing Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <div className="mb-2">
                      <span className="font-medium text-sm">Container Number:</span>
                      <p className="text-lg font-mono">{message.stuffingContainerData.sealing.containerNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-sm">Seal Number:</span>
                      <p className="text-lg font-mono text-red-600">{message.stuffingContainerData.sealing.sealNumber}</p>
                    </div>
                  </div>
                  <div>
                    {message.stuffingContainerData.sealing.image && (
                      <div>
                        <h6 className="font-medium mb-2">Container Seal Verification:</h6>
                        <img 
                          src={message.stuffingContainerData.sealing.image} 
                          alt="Container Seal" 
                          className="w-full h-32 object-cover rounded border" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`flex ${getMessageAlignment()} mb-6`}>
      <div className={`rounded-lg p-4 ${getMessageStyle()}`}>
        {!isSystemMessage && !isStatusUpdate && !isCompletionMessage && (
          <div className={`flex items-center space-x-2 mb-2 ${senderInfo.color}`}>
            <IconComponent className="h-4 w-4" />
            <span className="text-sm font-medium">{senderInfo.name}</span>
          </div>
        )}
        
        {(isStatusUpdate || isCompletionMessage) && (
          <div className={`flex items-center justify-center space-x-2 mb-2 ${senderInfo.color}`}>
            <IconComponent className="h-5 w-5" />
            <span className="text-base font-medium">
              {isStatusUpdate ? 'Status Update' : 'Inspection Complete'}
            </span>
          </div>
        )}
        
        <div className="text-sm mb-2">{message.message}</div>
        
        {(isPhotoMessage || isDocumentMessage) && renderInspectorDocumentation()}
        
        <div className={`text-xs mt-2 ${
          isOwnMessage ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};

// Customer Status Bar Component
const CustomerStatusBar = ({ currentStatus, inspectionData, selectedServices = [] }) => {
  const inspectionPhases = [
    {
      id: 0,
      name: 'Inspection Started',
      icon: <Play className="w-4 h-4" />,
      color: 'bg-blue-500',
      description: 'Inspector has begun the inspection process'
    },
    {
      id: 1,
      name: 'Sample Collected',
      icon: <Beaker className="w-4 h-4" />,
      color: 'bg-yellow-500',
      description: 'Samples have been collected for analysis'
    },
    {
      id: 2,
      name: 'Analysis',
      icon: <FileText className="w-4 h-4" />,
      color: 'bg-orange-500',
      description: 'Laboratory analysis is in progress'
    },
    {
      id: 3,
      name: 'Report Approved',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'bg-green-500',
      description: 'Final report has been approved'
    },
    {
      id: 4,
      name: 'Completed',
      icon: <PartyPopper className="w-4 h-4" />,
      color: 'bg-purple-500',
      description: 'Inspection has been successfully completed'
    }
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Inspection Progress</h3>
        <p className="text-sm text-gray-600">Real-time updates from your inspector</p>
      </div>

      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-2">Inspection Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <User className="h-3 w-3 text-gray-400" />
            <span className="text-gray-600">Inspector:</span>
            <span className="font-medium">{inspectionData?.inspectorName || 'Inspector'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-3 w-3 text-gray-400" />
            <span className="text-gray-600">Location:</span>
            <span className="font-medium">{inspectionData?.location || 'Location'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-3 w-3 text-gray-400" />
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium text-green-600">${inspectionData?.amount || 'N/A'}</span>
          </div>
        </div>
      </div>

      {selectedServices && selectedServices.length > 0 && (
        <div className="p-4 border-b border-gray-200 bg-blue-50">
          <h4 className="font-medium text-gray-900 mb-2">Selected Services</h4>
          <div className="space-y-1">
            {selectedServices.map((service, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                {service === 'psi' && <Shield className="h-3 w-3 text-blue-600" />}
                {service === 'loading_track' && <Truck className="h-3 w-3 text-green-600" />}
                {service === 'stuffing_container' && <Container className="h-3 w-3 text-orange-600" />}
                <span className="text-gray-700 capitalize">{service.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-3">
          {inspectionPhases.map((phase) => {
            const isActive = currentStatus === phase.id;
            const isCompleted = currentStatus > phase.id;

            return (
              <div
                key={phase.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isActive
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : isCompleted
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive ? phase.color : isCompleted ? 'bg-green-500' : 'bg-gray-400'
                  } text-white`}>
                    {isCompleted ? <CheckCircle className="w-4 h-4" /> : phase.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{phase.name}</h4>
                      {isActive && (
                        <span className="text-xs font-medium">Current</span>
                      )}
                      {isCompleted && (
                        <span className="text-xs font-medium text-green-600">✓ Completed</span>
                      )}
                    </div>
                    <p className="text-xs mt-1 opacity-75">{phase.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-green-50">
        <h4 className="font-medium text-green-900 mb-2 text-sm">What to Expect?</h4>
        <div className="text-xs text-green-800 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
            <span>You'll receive photos, videos, and documents at each phase</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
            <span>All documentation will appear in the chat automatically</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
            <span>You can ask questions anytime via chat messages</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Customer Chat Input Component
const CustomerChatInput = ({ inputMessage, setInputMessage, onSendMessage, isLoading }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const customerQuickResponses = [
    'Thank you for the update!',
    'Please keep me posted on the progress.',
    'When do you expect to complete the inspection?',
    'Are there any issues I should be aware of?',
    'Can you provide more details about the findings?',
    'Thank you for your thorough work!',
    'Looking forward to the final report.',
    'Please let me know if you need any additional information.'
  ];

  return (
    <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="flex flex-col space-y-3">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message to inspector..."
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <MessageCircle className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <button
            onClick={onSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Send className="h-4 w-4" />
            <span className="font-medium">{isLoading ? 'Sending...' : 'Send'}</span>
          </button>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-600 mb-2">💬 Quick responses:</p>
          <div className="flex flex-wrap gap-2">
            {customerQuickResponses.map((response, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(response)}
                className="text-xs bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full hover:bg-blue-200 transition-colors border border-blue-300 font-medium"
              >
                {response}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Eye className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-800">
              <p className="font-medium mb-1">Customer View - Read Only Documentation</p>
              <p>You can send text messages and view all photos, videos, and documents shared by your inspector. All documentation will appear automatically as the inspection progresses.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Customer Chat Room Component
const CustomerChatRoom = ({ 
  inspectionData = {
    inspectorName: 'John Inspector',
    customerName: 'ABC Trading Company',
    location: 'Mumbai, India',
    amount: '2,500',
    queryTitle: 'Basmati Rice Quality Assessment'
  },
  selectedServices = ['psi', 'loading_track'],
  onBackClick = null
}) => {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [messages, setMessages] = useState([
    {
      id: '1',
      senderId: 'system',
      senderType: 'system',
      message: '🎉 Inspection chat started! Your inspector will share real-time updates and documentation at each phase.',
      timestamp: new Date().toISOString(),
      type: 'system'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Demo function to simulate receiving inspector updates
  const simulateInspectorUpdate = (type) => {
    const demoUpdates = {
      start: {
        id: Date.now().toString(),
        senderId: 'inspector-001',
        senderName: 'John Inspector',
        senderType: 'inspector',
        message: '📸 Inspection started! Here is my verification selfie and facility images.',
        timestamp: new Date().toISOString(),
        type: 'inspection_start',
        inspectionStartData: {
          inspectorName: 'John Inspector',
          inspectorSelfie: {
            url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
            timestamp: new Date().toISOString()
          },
          facilityImages: [
            {
              url: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=300&fit=crop',
              caption: 'Main facility entrance'
            },
            {
              url: 'https://images.unsplash.com/photo-1581093458791-9d42c2c7f70d?w=400&h=300&fit=crop',
              caption: 'Storage warehouse'
            }
          ]
        }
      },
      sample: {
        id: Date.now().toString(),
        senderId: 'inspector-001',
        senderName: 'John Inspector',
        senderType: 'inspector',
        message: '📦 Sample collection completed. Here are the commodity photos and videos.',
        timestamp: new Date().toISOString(),
        type: 'sample_collection',
        sampleCollectionData: {
          photos: [
            {
              url: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop',
              caption: 'Rice sample - bag 1'
            },
            {
              url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
              caption: 'Rice sample - bag 2'
            }
          ],
          videos: []
        }
      },
      analysis: {
        id: Date.now().toString(),
        senderId: 'inspector-001',
        senderName: 'John Inspector',
        senderType: 'inspector',
        message: '📋 Analysis phase completed. Here is the detailed PSI certificate with quality analysis.',
        timestamp: new Date().toISOString(),
        type: 'psi',
        psiData: {
          date: new Date().toLocaleDateString(),
          millName: 'Golden Rice Mills Pvt Ltd',
          inspectorName: 'John Inspector',
          shipper: 'ABC Trading Company',
          commodity: 'Basmati Rice',
          quality: 'Premium Grade A',
          analysis: {
            moisture: '12.5',
            broken: '2.1',
            dd: '1.8',
            chalky: '3.2',
            addMixture: '0.5',
            frk: '4.1',
            polish: 'Polished'
          }
        }
      },
      loading: {
        id: Date.now().toString(),
        senderId: 'inspector-001',
        senderName: 'John Inspector',
        senderType: 'inspector',
        message: '🚛 Loading track documentation completed as per your requirements.',
        timestamp: new Date().toISOString(),
        type: 'loading_track',
        loadingTrackData: {
          bagDetails: {
            weight: '50 kg per bag',
            quality: 'Premium Quality Jute Bags',
            count: '2000',
            photos: [
              {
                url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
                caption: 'Bag quality verification'
              }
            ]
          },
          dispatchDetails: {
            driverContact: '+91 98765 43210',
            truckNumber: 'MH 12 AB 1234',
            totalBags: '2000',
            totalTons: '100 tons'
          }
        }
      }
    };

    setMessages(prev => [...prev, demoUpdates[type]]);
    if (type === 'start') setCurrentStatus(0);
    if (type === 'sample') setCurrentStatus(1);
    if (type === 'analysis') setCurrentStatus(2);
    if (type === 'loading') setCurrentStatus(3);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const messageData = {
        id: Date.now().toString(),
        senderId: 'customer-001',
        senderName: 'Customer',
        senderType: 'customer',
        message: newMessage.trim(),
        type: 'text',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, messageData]);
      setNewMessage('');

      // Simulate inspector response after customer message
      setTimeout(() => {
        const inspectorResponse = {
          id: (Date.now() + 1).toString(),
          senderId: 'inspector-001',
          senderName: 'John Inspector',
          senderType: 'inspector',
          message: getInspectorResponse(newMessage.trim()),
          type: 'text',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, inspectorResponse]);
      }, 1500);

    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInspectorResponse = (customerMessage) => {
    const responses = {
      'thank you': 'You\'re welcome! I\'m here to provide the best service possible.',
      'progress': 'I\'ll keep you updated at every step. Currently working on the sample analysis.',
      'complete': 'Based on current progress, I expect to complete the inspection within 2-3 days.',
      'issues': 'So far everything looks good. I\'ll immediately notify you if any issues arise.',
      'details': 'I\'ll provide detailed findings in the next update. Stay tuned!',
      'work': 'Thank you for your kind words. Quality inspection is my priority.',
      'report': 'The final report will be comprehensive with all documentation and photos.',
      'information': 'I have all the information needed. Will reach out if anything additional is required.'
    };

    const lowerMessage = customerMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return 'Thank you for your message. I\'m working diligently on your inspection and will keep you updated with regular progress reports.';
  };

  const serviceNames = selectedServices.map(service => {
    if (service === 'psi') return 'PSI Certificate';
    if (service === 'loading_track') return 'Loading Track Documentation';
    if (service === 'stuffing_container') return 'Container Stuffing Documentation';
    return service;
  }).join(', ');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onBackClick && (
              <button
                onClick={onBackClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customer Chat Room</h1>
              <p className="text-gray-600">Real-time communication with your inspector</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Inspector: {inspectionData.inspectorName}
          </div>
        </div>
      </div>

      {/* Service Info Bar */}
      <div className="bg-blue-50 px-6 py-3 border-b border-blue-200">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-800">Inspection Services</h3>
            <p className="text-sm text-blue-700 mt-1">
              This inspection includes: <span className="font-medium">{serviceNames}</span>
            </p>
            <p className="text-xs text-blue-600 mt-1">
              You will receive all documentation automatically as the inspector progresses through each phase.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto px-4 pt-4 pb-20">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Loading your inspection chat...</p>
                  <p className="text-xs text-gray-400 mt-2">Messages and documentation will appear here</p>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <CustomerChatMessage 
                      key={message.id || index} 
                      message={message} 
                      currentUserId="customer-001"
                    />
                  ))}
                  {isLoading && (
                    <div className="flex justify-end mb-4">
                      <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                          <span className="text-xs">Sending...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input */}
          <div className="flex-shrink-0">
            <CustomerChatInput 
              inputMessage={newMessage} 
              setInputMessage={setNewMessage} 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Status Bar */}
        <CustomerStatusBar
          currentStatus={currentStatus}
          inspectionData={inspectionData}
          selectedServices={selectedServices}
        />
      </div>

      {/* Demo Controls */}
      <div className="fixed bottom-4 left-4 z-10">
        <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-200">
          <p className="text-xs font-medium text-gray-700 mb-2">Demo Controls:</p>
          <div className="flex space-x-2">
            <button
              onClick={() => simulateInspectorUpdate('start')}
              className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
            >
              Start
            </button>
            <button
              onClick={() => simulateInspectorUpdate('sample')}
              className="px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
            >
              Sample
            </button>
            <button
              onClick={() => simulateInspectorUpdate('analysis')}
              className="px-2 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600"
            >
              Analysis
            </button>
            <button
              onClick={() => simulateInspectorUpdate('loading')}
              className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
            >
              Loading
            </button>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      <div className="fixed bottom-4 right-4 z-10">
        <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-200">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600">Connected to inspector</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerChatRoom;