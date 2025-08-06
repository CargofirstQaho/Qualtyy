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
  Upload,
  File,
  Calendar,
  Building,
  Package,
  Truck,
  Container,
  Shield,
  X,
  Plus,
  Paperclip
} from 'lucide-react';

// Inspector Chat Message Component
const InspectorChatMessage = ({ message, currentUserId }) => {
  const isOwnMessage = message.senderId === currentUserId;
  const isSystemMessage = message.senderType === 'system';
  const isStatusUpdate = message.type === 'status-update';
  const isPhotoMessage = message.type === 'photo' || message.type === 'media';
  const isDocumentMessage = message.type === 'document' || message.type === 'psi';
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
      return 'bg-gradient-to-r from-green-600 to-green-700 text-white ml-auto max-w-lg shadow-lg';
    }
    return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 mr-auto max-w-lg border border-blue-200 shadow-sm';
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
      return { name: 'You (Inspector)', icon: Shield, color: 'text-green-100' };
    }
    
    return { name: message.senderName || 'Customer', icon: User, color: 'text-blue-600' };
  };

  const senderInfo = getSenderInfo();
  const IconComponent = senderInfo.icon;

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
        
        <div className={`text-xs mt-2 ${
          isOwnMessage ? 'text-green-100' : 'text-gray-500'
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

// Inspector Upload Modal Component
const InspectorUploadModal = ({ 
  isOpen, 
  onClose, 
  phase, 
  onUpload, 
  selectedServices = [] 
}) => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({});
  const fileInputRef = useRef(null);

  if (!isOpen || !phase) return null;

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleFormDataChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpload = () => {
    if (files.length === 0) return;

    const processedFiles = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
      caption: formData[`caption_${file.name}`] || ''
    }));

    let uploadData = {};

    switch (phase.id) {
      case 0: // Inspection Started
        uploadData = {
          type: 'inspection_start',
          inspectionStartData: {
            inspectorName: formData.inspectorName || 'John Inspector',
            inspectorSelfie: {
              url: processedFiles.find(f => f.type.startsWith('image'))?.url,
              timestamp: new Date().toISOString()
            },
            facilityImages: processedFiles.filter(f => f.type.startsWith('image')).slice(1).map(f => ({
              url: f.url,
              caption: f.caption || 'Facility Image'
            }))
          }
        };
        break;

      case 1: // Sample Collected
        uploadData = {
          type: 'sample_collection',
          sampleCollectionData: {
            photos: processedFiles.filter(f => f.type.startsWith('image')).map(f => ({
              url: f.url,
              caption: f.caption || 'Commodity Photo'
            })),
            videos: processedFiles.filter(f => f.type.startsWith('video')).map(f => ({
              url: f.url,
              caption: f.caption || 'Commodity Video'
            }))
          }
        };
        break;

      case 2: // Analysis - PSI Document
        uploadData = {
          type: 'psi',
          psiData: {
            date: formData.date || new Date().toLocaleDateString(),
            millName: formData.millName || 'Golden Rice Mills Pvt Ltd',
            inspectorName: formData.inspectorName || 'John Inspector',
            shipper: formData.shipper || 'ABC Trading Company',
            commodity: formData.commodity || 'Basmati Rice',
            quality: formData.quality || 'Premium Grade A',
            analysis: {
              moisture: formData.moisture || '12.5',
              broken: formData.broken || '2.1',
              dd: formData.dd || '1.8',
              chalky: formData.chalky || '3.2',
              addMixture: formData.addMixture || '0.5',
              frk: formData.frk || '4.1',
              polish: formData.polish || 'Polished'
            }
          }
        };
        break;

      case 3: // Report Approved - Service-specific documentation
        if (selectedServices.includes('loading_track')) {
          uploadData = {
            type: 'loading_track',
            loadingTrackData: {
              bagDetails: {
                weight: formData.bagWeight || '50 kg per bag',
                quality: formData.bagQuality || 'Premium Quality Jute Bags',
                count: formData.bagCount || '2000',
                photos: processedFiles.filter(f => f.type.startsWith('image')).map(f => ({
                  url: f.url,
                  caption: f.caption || 'Bag Photo'
                }))
              },
              dispatchDetails: {
                driverContact: formData.driverContact || '+91 98765 43210',
                truckNumber: formData.truckNumber || 'MH 12 AB 1234',
                totalBags: formData.totalBags || '2000',
                totalTons: formData.totalTons || '100 tons'
              }
            }
          };
        } else if (selectedServices.includes('stuffing_container')) {
          uploadData = {
            type: 'stuffing_container',
            stuffingContainerData: {
              images: {
                emptyContainer: processedFiles[0]?.url,
                craftPaper: processedFiles[1]?.url,
                fumigation: processedFiles[2]?.url
              },
              bagCount: {
                rows: [
                  { count: formData.row1Count || '250' },
                  { count: formData.row2Count || '250' },
                  { count: formData.row3Count || '250' },
                  { count: formData.row4Count || '250' }
                ],
                total: formData.totalBags || '1000',
                image: processedFiles.find(f => f.name.includes('count'))?.url
              },
              sealing: {
                containerNumber: formData.containerNumber || 'TCLU1234567',
                sealNumber: formData.sealNumber || 'SEAL123456',
                image: processedFiles.find(f => f.name.includes('seal'))?.url
              }
            }
          };
        }
        break;
    }

    onUpload({
      ...uploadData,
      files: processedFiles,
      timestamp: new Date().toISOString()
    });

    setFiles([]);
    setFormData({});
    onClose();
  };

  const renderPhaseSpecificForm = () => {
    switch (phase.id) {
      case 0: // Inspection Started
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Inspector Name</label>
              <input
                type="text"
                value={formData.inspectorName || ''}
                onChange={(e) => handleFormDataChange('inspectorName', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="Enter inspector name"
              />
            </div>
            <p className="text-xs text-gray-600">
              Please upload: Inspector selfie with timestamp + Facility images
            </p>
          </div>
        );

      case 1: // Sample Collection
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Upload commodity photos and videos showing the samples collected.
            </p>
            {files.map((file, index) => (
              <div key={index}>
                <label className="block text-sm font-medium mb-1">Caption for {file.name}</label>
                <input
                  type="text"
                  value={formData[`caption_${file.name}`] || ''}
                  onChange={(e) => handleFormDataChange(`caption_${file.name}`, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Enter photo/video caption"
                />
              </div>
            ))}
          </div>
        );

      case 2: // Analysis - PSI Document
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date || new Date().toISOString().split('T')[0]}
                  onChange={(e) => handleFormDataChange('date', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mill Name</label>
                <input
                  type="text"
                  value={formData.millName || ''}
                  onChange={(e) => handleFormDataChange('millName', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Mill name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Shipper</label>
                <input
                  type="text"
                  value={formData.shipper || ''}
                  onChange={(e) => handleFormDataChange('shipper', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Shipper name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Commodity</label>
                <input
                  type="text"
                  value={formData.commodity || ''}
                  onChange={(e) => handleFormDataChange('commodity', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Commodity type"
                />
              </div>
            </div>
            
            <h4 className="font-medium text-sm mt-4 mb-2">Quality Analysis Parameters:</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Moisture %</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.moisture || ''}
                  onChange={(e) => handleFormDataChange('moisture', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="12.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Broken %</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.broken || ''}
                  onChange={(e) => handleFormDataChange('broken', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="2.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">DD %</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.dd || ''}
                  onChange={(e) => handleFormDataChange('dd', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="1.8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Chalky %</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.chalky || ''}
                  onChange={(e) => handleFormDataChange('chalky', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="3.2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Add Mixture %</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.addMixture || ''}
                  onChange={(e) => handleFormDataChange('addMixture', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="0.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">FRK %</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.frk || ''}
                  onChange={(e) => handleFormDataChange('frk', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="4.1"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Polish Status</label>
              <select
                value={formData.polish || 'Polished'}
                onChange={(e) => handleFormDataChange('polish', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                <option value="Polished">Polished</option>
                <option value="Unpolished">Unpolished</option>
              </select>
            </div>
          </div>
        );

      case 3: // Service-specific documentation
        if (selectedServices.includes('loading_track')) {
          return (
            <div className="space-y-3">
              <h4 className="font-medium">Loading Track Documentation</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Bag Weight</label>
                  <input
                    type="text"
                    value={formData.bagWeight || ''}
                    onChange={(e) => handleFormDataChange('bagWeight', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="50 kg per bag"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bag Quality</label>
                  <input
                    type="text"
                    value={formData.bagQuality || ''}
                    onChange={(e) => handleFormDataChange('bagQuality', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="Premium Quality"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Number of Bags</label>
                  <input
                    type="number"
                    value={formData.bagCount || ''}
                    onChange={(e) => handleFormDataChange('bagCount', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="2000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Driver Contact</label>
                  <input
                    type="text"
                    value={formData.driverContact || ''}
                    onChange={(e) => handleFormDataChange('driverContact', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Truck Number</label>
                  <input
                    type="text"
                    value={formData.truckNumber || ''}
                    onChange={(e) => handleFormDataChange('truckNumber', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="MH 12 AB 1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Total Weight</label>
                  <input
                    type="text"
                    value={formData.totalTons || ''}
                    onChange={(e) => handleFormDataChange('totalTons', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="100 tons"
                  />
                </div>
              </div>
            </div>
          );
        } else if (selectedServices.includes('stuffing_container')) {
          return (
            <div className="space-y-3">
              <h4 className="font-medium">Container Stuffing Documentation</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Container Number</label>
                  <input
                    type="text"
                    value={formData.containerNumber || ''}
                    onChange={(e) => handleFormDataChange('containerNumber', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="TCLU1234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Seal Number</label>
                  <input
                    type="text"
                    value={formData.sealNumber || ''}
                    onChange={(e) => handleFormDataChange('sealNumber', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="SEAL123456"
                  />
                </div>
              </div>
              <h5 className="font-medium text-sm">Row-wise Bag Count:</h5>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map(row => (
                  <div key={row}>
                    <label className="block text-xs font-medium mb-1">Row {row}</label>
                    <input
                      type="number"
                      value={formData[`row${row}Count`] || ''}
                      onChange={(e) => handleFormDataChange(`row${row}Count`, e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="250"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600">
                Upload images for: Empty container, Craft paper, Fumigation, Row count, Container seal
              </p>
            </div>
          );
        }
        return null;

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Upload Documentation - {phase?.name}</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
            >
              Select Files
            </button>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Selected Files:</h4>
              <div className="max-h-32 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm p-2 bg-gray-50 rounded">
                    <File className="h-4 w-4" />
                    <span className="flex-1">{file.name}</span>
                    <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {renderPhaseSpecificForm()}

          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={files.length === 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-50 hover:bg-blue-700"
            >
              Upload & Send to Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inspector Status Bar with Upload Capabilities
const InspectorStatusBar = ({ 
  currentStatus, 
  onStatusChange, 
  inspectionData, 
  selectedServices = [],
  onDocumentUpload
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState({});

  const inspectionPhases = [
    {
      id: 0,
      name: 'Inspection Started',
      icon: <Play className="w-4 h-4" />,
      color: 'bg-blue-500',
      requirements: ['Inspector Selfie with Timestamp', 'Facility Images']
    },
    {
      id: 1,
      name: 'Sample Collected',
      icon: <Beaker className="w-4 h-4" />,
      color: 'bg-yellow-500',
      requirements: ['Commodity Photos', 'Commodity Videos']
    },
    {
      id: 2,
      name: 'Analysis',
      icon: <FileText className="w-4 h-4" />,
      color: 'bg-orange-500',
      requirements: ['PSI Document with Quality Analysis']
    },
    {
      id: 3,
      name: 'Report Approved',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'bg-green-500',
      requirements: selectedServices.includes('loading_track') 
        ? ['Loading Track Documentation', 'Dispatch Details']
        : selectedServices.includes('stuffing_container')
        ? ['Container Images', 'Bag Count', 'Sealing Details']
        : ['Service-specific Documentation']
    },
    {
      id: 4,
      name: 'Completed',
      icon: <PartyPopper className="w-4 h-4" />,
      color: 'bg-purple-500',
      requirements: []
    }
  ];

  const handleUpload = (phaseId) => {
    setSelectedPhase(inspectionPhases.find(p => p.id === phaseId));
    setShowUploadModal(true);
  };

  const handleDocumentUpload = (uploadData) => {
    const uploadKey = `phase-${uploadData.type}`;
    setUploadedDocs(prev => ({
      ...prev,
      [uploadKey]: {
        files: uploadData.files,
        timestamp: uploadData.timestamp
      }
    }));

    if (onDocumentUpload) {
      onDocumentUpload(uploadData);
    }

    setShowUploadModal(false);
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Inspector Control Panel</h3>
        <p className="text-sm text-gray-600">Upload documentation and update status</p>
      </div>

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

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-3">
          {inspectionPhases.map((phase, index) => {
            const isActive = currentStatus === phase.id;
            const isCompleted = currentStatus > phase.id;
            const hasUploads = uploadedDocs[`phase-${phase.id}`] || uploadedDocs[`phase-inspection_start`] || uploadedDocs[`phase-sample_collection`] || uploadedDocs[`phase-psi`] || uploadedDocs[`phase-loading_track`] || uploadedDocs[`phase-stuffing_container`];

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
                    <h4 className="font-medium text-sm">{phase.name}</h4>
                    
                    {phase.requirements.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium mb-1">Requirements:</p>
                        <ul className="text-xs space-y-1">
                          {phase.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-center space-x-1">
                              <div className="w-1 h-1 bg-current rounded-full"></div>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {isActive && phase.requirements.length > 0 && (
                      <button
                        onClick={() => handleUpload(phase.id)}
                        className="w-full mt-2 px-3 py-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 flex items-center justify-center space-x-1"
                      >
                        <Upload className="h-3 w-3" />
                        <span>Upload Documents</span>
                      </button>
                    )}

                    {hasUploads && (
                      <div className="mt-2 text-xs text-green-600 flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>Documents uploaded</span>
                      </div>
                    )}
                    
                    {isActive && phase.id < 4 && (
                      <button
                        onClick={() => onStatusChange(phase.id + 1)}
                        className="w-full mt-2 p-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 flex items-center justify-center space-x-1"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Complete Phase</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <InspectorUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        phase={selectedPhase}
        onUpload={handleDocumentUpload}
        selectedServices={selectedServices}
      />
    </div>
  );
};

// Inspector Chat Input Component
const InspectorChatInput = ({ inputMessage, setInputMessage, onSendMessage, isLoading, onPhotoUpload, onVideoUpload }) => {
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const inspectorQuickResponses = [
    'I have started the inspection and will keep you updated.',
    'Sample collection is now in progress.',
    'Analysis phase has begun. Will share results soon.',
    'Everything looks good so far. Continuing with the assessment.',
    'Found some quality issues. Will provide detailed analysis.',
    'Uploading photos and documentation now.',
    'Inspection completed. Preparing final report.',
    'Please review the uploaded documentation.'
  ];

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0 && onPhotoUpload) {
      onPhotoUpload(files);
    }
    setShowMediaOptions(false);
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0 && onVideoUpload) {
      onVideoUpload(files);
    }
    setShowMediaOptions(false);
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-green-50 to-orange-50">
      <div className="flex flex-col space-y-3">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message to customer..."
              className="w-full px-4 py-3 pr-12 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm"
              disabled={isLoading}
            />
            <button
              onClick={() => setShowMediaOptions(!showMediaOptions)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
            >
              <Paperclip className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={onSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Send className="h-4 w-4" />
            <span className="font-medium">{isLoading ? 'Sending...' : 'Send'}</span>
          </button>
        </div>

        {showMediaOptions && (
          <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
            <p className="text-xs font-medium text-gray-600 mb-2">📎 Upload Media:</p>
            <div className="flex space-x-2">
              <button
                onClick={() => photoInputRef.current?.click()}
                className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                <Camera className="h-4 w-4" />
                <span>Photos</span>
              </button>
              <button
                onClick={() => videoInputRef.current?.click()}
                className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-3 py-2 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
              >
                <Video className="h-4 w-4" />
                <span>Videos</span>
              </button>
              <button
                onClick={() => setShowMediaOptions(false)}
                className="flex items-center space-x-2 bg-gray-100 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <input
              ref={photoInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <input
              ref={videoInputRef}
              type="file"
              multiple
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
          </div>
        )}

        <div>
          <p className="text-xs font-medium text-gray-600 mb-2">⚡ Quick responses:</p>
          <div className="flex flex-wrap gap-2">
            {inspectorQuickResponses.map((response, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(response)}
                className="text-xs bg-green-100 text-green-800 px-3 py-1.5 rounded-full hover:bg-green-200 transition-colors border border-green-300 font-medium"
              >
                {response}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-green-100 border border-green-300 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Upload className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-green-800">
              <p className="font-medium mb-1">Inspector Controls - Full Upload Access</p>
              <p>You can send text messages, upload photos/videos directly in chat, and use the status panel to upload phase-specific documentation with detailed forms.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Inspector Chat Room Component
const InspectorChatRoom = ({ 
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
      message: '🎉 Inspection chat started! You can now communicate with the customer and upload documentation at each phase.',
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

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const messageData = {
        id: Date.now().toString(),
        senderId: 'inspector-001',
        senderName: 'John Inspector',
        senderType: 'inspector',
        message: newMessage.trim(),
        type: 'text',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, messageData]);
      setNewMessage('');

      // Simulate customer response after inspector message
      setTimeout(() => {
        const customerResponse = {
          id: (Date.now() + 1).toString(),
          senderId: 'customer-001',
          senderName: 'Customer',
          senderType: 'customer',
          message: getCustomerResponse(newMessage.trim()),
          type: 'text',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, customerResponse]);
      }, 1500);

    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCustomerResponse = (inspectorMessage) => {
    const responses = {
      'started': 'Thank you for the update! Please keep me posted on the progress.',
      'progress': 'Great to hear! I appreciate your thorough approach.',
      'results': 'Looking forward to seeing the detailed results.',
      'good': 'Excellent! Thank you for the professional service.',
      'issues': 'Please provide details about any issues you find.',
      'photos': 'Thank you for the documentation. Very helpful!',
      'completed': 'Wonderful! When can I expect the final report?',
      'review': 'I will review everything carefully. Thank you!'
    };

    const lowerMessage = inspectorMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return 'Thank you for the update! I appreciate your professional communication and attention to detail.';
  };

  const handleQuickPhotoUpload = (files) => {
    const photoMessage = {
      id: Date.now().toString(),
      senderId: 'inspector-001',
      senderName: 'John Inspector',
      senderType: 'inspector',
      message: `📸 Uploaded ${files.length} photo(s) during inspection.`,
      timestamp: new Date().toISOString(),
      type: 'sample_collection',
      sampleCollectionData: {
        photos: files.map((file, index) => ({
          url: URL.createObjectURL(file),
          caption: `Quick upload - ${file.name}`
        }))
      }
    };
    
    setMessages(prev => [...prev, photoMessage]);
  };

  const handleQuickVideoUpload = (files) => {
    const videoMessage = {
      id: Date.now().toString(),
      senderId: 'inspector-001',
      senderName: 'John Inspector',
      senderType: 'inspector',
      message: `🎥 Uploaded ${files.length} video(s) during inspection.`,
      timestamp: new Date().toISOString(),
      type: 'sample_collection',
      sampleCollectionData: {
        videos: files.map((file, index) => ({
          url: URL.createObjectURL(file),
          caption: `Quick upload - ${file.name}`
        }))
      }
    };
    
    setMessages(prev => [...prev, videoMessage]);
  };

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    
    const statusNames = [
      'Inspection Started',
      'Sample Collected', 
      'Analysis',
      'Report Approved',
      'Completed'
    ];
    
    const statusMessage = {
      id: Date.now().toString(),
      senderId: 'system',
      senderType: 'system',
      message: `✅ Status updated to: ${statusNames[newStatus]}`,
      timestamp: new Date().toISOString(),
      type: 'status-update'
    };
    
    setMessages(prev => [...prev, statusMessage]);

    // Simulate completion popup when status reaches completed
    if (newStatus === 4) {
      setTimeout(() => {
        const completionMessage = {
          id: (Date.now() + 1).toString(),
          senderId: 'system',
          senderType: 'system',
          message: '🎉 Inspection has been completed successfully! Final report is ready for download.',
          timestamp: new Date().toISOString(),
          type: 'completion'
        };
        setMessages(prev => [...prev, completionMessage]);
      }, 1000);
    }
  };

  const handleDocumentUpload = (uploadData) => {
    const messageData = {
      id: Date.now().toString(),
      senderId: 'inspector-001',
      senderName: 'John Inspector',
      senderType: 'inspector',
      message: getUploadMessage(uploadData.type),
      timestamp: new Date().toISOString(),
      type: uploadData.type,
      ...uploadData
    };
    
    setMessages(prev => [...prev, messageData]);
  };

  const getUploadMessage = (type) => {
    switch (type) {
      case 'inspection_start':
        return '📸 Inspection started! Here is my verification selfie and facility images.';
      case 'sample_collection':
        return '📦 Sample collection completed. Here are the commodity photos and videos.';
      case 'psi':
        return '📋 Analysis phase completed. Here is the detailed PSI certificate with quality analysis.';
      case 'loading_track':
        return '🚛 Loading track documentation completed as per your requirements.';
      case 'stuffing_container':
        return '📦 Container stuffing documentation completed with all required images and details.';
      default:
        return '📎 Documentation uploaded successfully.';
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Inspector Chat Room</h1>
              <p className="text-gray-600">Upload documentation and communicate with customer</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Customer: {inspectionData.customerName}
          </div>
        </div>
      </div>

      {/* Service Info Bar */}
      <div className="bg-green-50 px-6 py-3 border-b border-green-200">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-green-800">Inspection Services</h3>
            <p className="text-sm text-green-700 mt-1">
              This inspection includes: <span className="font-medium">{serviceNames}</span>
            </p>
            <p className="text-xs text-green-600 mt-1">
              Upload the required documentation for each phase and update the status to proceed.
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
                  <p className="text-gray-500">Starting inspection chat...</p>
                  <p className="text-xs text-gray-400 mt-2">Upload documentation and communicate with customer</p>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <InspectorChatMessage 
                      key={message.id || index} 
                      message={message} 
                      currentUserId="inspector-001"
                    />
                  ))}
                  {isLoading && (
                    <div className="flex justify-end mb-4">
                      <div className="bg-green-600 text-white rounded-lg p-3 max-w-xs">
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
            <InspectorChatInput 
              inputMessage={newMessage} 
              setInputMessage={setNewMessage} 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading}
              onPhotoUpload={handleQuickPhotoUpload}
              onVideoUpload={handleQuickVideoUpload}
            />
          </div>
        </div>

        {/* Status Bar */}
        <InspectorStatusBar
          currentStatus={currentStatus}
          onStatusChange={handleStatusChange}
          inspectionData={inspectionData}
          selectedServices={selectedServices}
          onDocumentUpload={handleDocumentUpload}
        />
      </div>

      {/* Inspector Tools Panel */}
      <div className="fixed bottom-4 left-4 z-10">
        <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-200">
          <p className="text-xs font-medium text-gray-700 mb-2">Inspector Tools:</p>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                const msg = {
                  id: Date.now().toString(),
                  senderId: 'inspector-001',
                  senderName: 'John Inspector',
                  senderType: 'inspector',
                  message: '📸 Uploading inspection photos...',
                  timestamp: new Date().toISOString(),
                  type: 'text'
                };
                setMessages(prev => [...prev, msg]);
              }}
              className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 flex items-center space-x-1"
            >
              <Camera className="h-3 w-3" />
              <span>Photo</span>
            </button>
            <button
              onClick={() => {
                const msg = {
                  id: Date.now().toString(),
                  senderId: 'inspector-001',
                  senderName: 'John Inspector',
                  senderType: 'inspector',
                  message: '📋 Uploading analysis report...',
                  timestamp: new Date().toISOString(),
                  type: 'text'
                };
                setMessages(prev => [...prev, msg]);
              }}
              className="px-2 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600 flex items-center space-x-1"
            >
              <FileText className="h-3 w-3" />
              <span>Report</span>
            </button>
            <button
              onClick={() => {
                if (currentStatus < 4) {
                  handleStatusChange(currentStatus + 1);
                }
              }}
              className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 flex items-center space-x-1"
            >
              <CheckCircle className="h-3 w-3" />
              <span>Next</span>
            </button>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      <div className="fixed bottom-4 right-4 z-10">
        <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-200">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600">Connected to customer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectorChatRoom;