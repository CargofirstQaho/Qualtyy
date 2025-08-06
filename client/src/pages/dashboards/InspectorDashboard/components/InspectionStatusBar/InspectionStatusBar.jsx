


// import React, { useState, useRef } from 'react';
// import {
//   Play,
//   Beaker,
//   FileText,
//   CheckCircle,
//   User,
//   MapPin,
//   DollarSign,
//   Clock,
//   Award,
//   Camera,
//   Upload,
//   X,
//   Download,
//   Eye,
//   MessageCircle
// } from 'lucide-react';

// const InspectionStatusBar = ({ currentStatus, onStatusChange, userType, inspectionData, onReportGenerated }) => {
//   const [uploadedPhotos, setUploadedPhotos] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [generatedReport, setGeneratedReport] = useState(null);
//   const [showPhotoModal, setShowPhotoModal] = useState(false);
//   const [selectedPhoto, setSelectedPhoto] = useState(null);
//   const fileInputRef = useRef(null);

//   const inspectionPhases = [
//     {
//       id: 0,
//       name: 'Inspection Started',
//       icon: <Play className="w-4 h-4" />,
//       color: 'bg-blue-500',
//       bgColor: 'bg-blue-50',
//       textColor: 'text-blue-700',
//       borderColor: 'border-blue-200',
//       description: 'Inspector has begun the inspection process'
//     },
//     {
//       id: 1,
//       name: 'Sample Collected',
//       icon: <Beaker className="w-4 h-4" />,
//       color: 'bg-yellow-500',
//       bgColor: 'bg-yellow-50',
//       textColor: 'text-yellow-700',
//       borderColor: 'border-yellow-200',
//       description: 'Samples have been collected for analysis'
//     },
//     {
//       id: 2,
//       name: 'Analysis',
//       icon: <FileText className="w-4 h-4" />,
//       color: 'bg-orange-500',
//       bgColor: 'bg-orange-50',
//       textColor: 'text-orange-700',
//       borderColor: 'border-orange-200',
//       description: 'Laboratory analysis is in progress'
//     },
//     {
//       id: 3,
//       name: 'Report Approved',
//       icon: <CheckCircle className="w-4 h-4" />,
//       color: 'bg-green-500',
//       bgColor: 'bg-green-50',
//       textColor: 'text-green-700',
//       borderColor: 'border-green-200',
//       description: 'Final report has been approved and completed'
//     }
//   ];

//   const handlePhaseClick = (phaseId) => {
//     if (userType === 'inspector') {
//       onStatusChange(phaseId);
      
//       // If moving to "Report Approved" status, generate and display report
//       if (phaseId === 3) {
//         generateFinalReport();
//       }
//     }
//   };

//   const handlePhotoUpload = (event) => {
//     const files = Array.from(event.target.files);
//     if (files.length === 0) return;

//     setIsUploading(true);
    
//     // Simulate upload process
//     setTimeout(() => {
//       const newPhotos = files.map((file, index) => ({
//         id: Date.now() + index,
//         name: file.name,
//         size: file.size,
//         url: URL.createObjectURL(file),
//         uploadedAt: new Date().toISOString()
//       }));
      
//       setUploadedPhotos(prev => [...prev, ...newPhotos]);
//       setIsUploading(false);
      
//       // Reset file input
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }, 1500);
//   };

//   const removePhoto = (photoId) => {
//     setUploadedPhotos(prev => prev.filter(photo => photo.id !== photoId));
//   };

//   const generateReport = () => {
//     setIsGeneratingReport(true);
    
//     // Simulate report generation
//     setTimeout(() => {
//       const report = {
//         id: Date.now(),
//         inspectionId: inspectionData?.id || 'INS-001',
//         inspectorName: inspectionData?.inspectorName || 'Inspector',
//         location: inspectionData?.location || 'Location',
//         amount: inspectionData?.amount || 'N/A',
//         startedAt: inspectionData?.startedAt || new Date().toISOString(),
//         completedAt: new Date().toISOString(),
//         photos: uploadedPhotos.length,
//         status: 'Draft',
//         findings: 'Inspection completed successfully. All samples collected and analyzed.',
//         recommendations: 'No immediate actions required. Continue regular monitoring.'
//       };
      
//       setGeneratedReport(report);
//       setIsGeneratingReport(false);
//     }, 2000);
//   };

//   const generateFinalReport = () => {
//     const finalReport = {
//       id: Date.now(),
//       inspectionId: inspectionData?.id || 'INS-001',
//       inspectorName: inspectionData?.inspectorName || 'Inspector',
//       location: inspectionData?.location || 'Location',
//       amount: inspectionData?.amount || 'N/A',
//       startedAt: inspectionData?.startedAt || new Date().toISOString(),
//       completedAt: new Date().toISOString(),
//       photos: uploadedPhotos.length,
//       status: 'Approved',
//       findings: 'Inspection completed successfully. All samples collected and analyzed according to standards.',
//       recommendations: 'All parameters within acceptable limits. Continue regular monitoring schedule.'
//     };
    
//     // Send completion message to chat
//     if (onReportGenerated) {
//       onReportGenerated({
//         type: 'inspection_completed',
//         message: '🎉 Inspection Completed Successfully!',
//         report: finalReport,
//         timestamp: new Date().toISOString()
//       });
//     }
//   };

//   const viewPhoto = (photo) => {
//     setSelectedPhoto(photo);
//     setShowPhotoModal(true);
//   };

//   return (
//     <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
//       {/* Status Bar Header */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center space-x-2 mb-2">
//           <Award className="h-5 w-5 text-blue-600" />
//           <h3 className="text-lg font-semibold text-gray-900">Inspection Status</h3>
//         </div>
//         <p className="text-sm text-gray-600">
//           {userType === 'inspector' ? 'Click to update status' : 'Real-time status updates'}
//         </p>
//       </div>

//       {/* Inspection Details */}
//       <div className="p-4 border-b border-gray-200 bg-gray-50">
//         <h4 className="font-medium text-gray-900 mb-2">Inspection Details</h4>
//         <div className="space-y-2 text-sm">
//           <div className="flex items-center space-x-2">
//             <User className="h-3 w-3 text-gray-400" />
//             <span className="text-gray-600">Inspector:</span>
//             <span className="font-medium">{inspectionData?.inspectorName || 'Inspector'}</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <MapPin className="h-3 w-3 text-gray-400" />
//             <span className="text-gray-600">Location:</span>
//             <span className="font-medium">{inspectionData?.location || 'Location'}</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <DollarSign className="h-3 w-3 text-gray-400" />
//             <span className="text-gray-600">Amount:</span>
//             <span className="font-medium text-green-600">${inspectionData?.amount || 'N/A'}</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Clock className="h-3 w-3 text-gray-400" />
//             <span className="text-gray-600">Started:</span>
//             <span className="font-medium">
//               {inspectionData?.startedAt 
//                 ? new Date(inspectionData.startedAt).toLocaleString()
//                 : 'Just now'
//               }
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Status Phases */}
//       <div className="flex-1 p-4">
//         <div className="space-y-3">
//           {inspectionPhases.map((phase, index) => {
//             const isActive = currentStatus === phase.id;
//             const isCompleted = currentStatus > phase.id;
//             const isClickable = userType === 'inspector';

//             return (
//               <div
//                 key={phase.id}
//                 onClick={() => handlePhaseClick(phase.id)}
//                 className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
//                   isActive
//                     ? `${phase.bgColor} ${phase.borderColor} ${phase.textColor}`
//                     : isCompleted
//                     ? 'bg-green-50 border-green-200 text-green-700'
//                     : 'bg-gray-50 border-gray-200 text-gray-600'
//                 } ${
//                   isClickable
//                     ? 'cursor-pointer hover:shadow-md'
//                     : 'cursor-default'
//                 }`}
//               >
//                 {/* Progress Line */}
//                 {index < inspectionPhases.length - 1 && (
//                   <div 
//                     className={`absolute left-6 top-12 w-0.5 h-6 ${
//                       isCompleted ? 'bg-green-400' : 'bg-gray-300'
//                     }`}
//                   />
//                 )}

//                 <div className="flex items-start space-x-3">
//                   {/* Status Icon */}
//                   <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
//                     isActive
//                       ? phase.color
//                       : isCompleted
//                       ? 'bg-green-500'
//                       : 'bg-gray-400'
//                   } text-white`}>
//                     {isCompleted ? (
//                       <CheckCircle className="w-4 h-4" />
//                     ) : (
//                       phase.icon
//                     )}
//                   </div>

//                   {/* Status Content */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between">
//                       <h4 className="font-medium text-sm">{phase.name}</h4>
//                       {isActive && (
//                         <div className="flex items-center space-x-1">
//                           <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
//                           <span className="text-xs font-medium">Active</span>
//                         </div>
//                       )}
//                       {isCompleted && (
//                         <span className="text-xs font-medium text-green-600">Completed</span>
//                       )}
//                     </div>
//                     <p className="text-xs mt-1 opacity-75">{phase.description}</p>
                    
//                     {/* Timestamp for completed phases */}
//                     {(isActive || isCompleted) && (
//                       <div className="mt-2 text-xs opacity-60">
//                         {isCompleted ? 'Completed' : 'Started'}: {new Date().toLocaleTimeString()}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Inspector Controls */}
//                 {isClickable && isActive && (
//                   <div className="mt-3 pt-2 border-t border-current border-opacity-20">
//                     <div className="flex items-center space-x-2">
//                       <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
//                       <span className="text-xs font-medium">
//                         Click to mark as complete
//                       </span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Uploaded Photos Section */}
//       {uploadedPhotos.length > 0 && (
//         <div className="p-4 border-t border-gray-200">
//           <div className="flex items-center justify-between mb-2">
//             <h4 className="font-medium text-gray-900">Photos ({uploadedPhotos.length})</h4>
//             <Camera className="h-4 w-4 text-gray-400" />
//           </div>
//           <div className="grid grid-cols-3 gap-2">
//             {uploadedPhotos.slice(0, 6).map((photo) => (
//               <div key={photo.id} className="relative group">
//                 <img
//                   src={photo.url}
//                   alt={photo.name}
//                   className="w-full h-16 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
//                   onClick={() => viewPhoto(photo)}
//                 />
//                 <button
//                   onClick={() => removePhoto(photo.id)}
//                   className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <X className="h-2 w-2" />
//                 </button>
//               </div>
//             ))}
//           </div>
//           {uploadedPhotos.length > 6 && (
//             <p className="text-xs text-gray-500 mt-2">+{uploadedPhotos.length - 6} more photos</p>
//           )}
//         </div>
//       )}

//       {/* Generated Report Section */}
//       {generatedReport && (
//         <div className="p-4 border-t border-gray-200 bg-blue-50">
//           <div className="flex items-center justify-between mb-2">
//             <h4 className="font-medium text-blue-900">Report Generated</h4>
//             <FileText className="h-4 w-4 text-blue-600" />
//           </div>
//           <div className="space-y-1 text-sm text-blue-800">
//             <p>Status: <span className="font-medium">{generatedReport.status}</span></p>
//             <p>Photos: <span className="font-medium">{generatedReport.photos}</span></p>
//             <p>Generated: <span className="font-medium">{new Date(generatedReport.completedAt).toLocaleString()}</span></p>
//           </div>
//           <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-2">
//             <Download className="h-3 w-3" />
//             <span>Download Report</span>
//           </button>
//         </div>
//       )}

//       {/* Action Buttons for Inspector */}
//       {userType === 'inspector' && (
//         <div className="p-4 border-t border-gray-200 space-y-2">
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handlePhotoUpload}
//             accept="image/*"
//             multiple
//             className="hidden"
//           />
//           <button 
//             onClick={() => fileInputRef.current?.click()}
//             disabled={isUploading}
//             className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
//           >
//             {isUploading ? (
//               <>
//                 <Upload className="h-4 w-4 animate-spin" />
//                 <span>Uploading...</span>
//               </>
//             ) : (
//               <>
//                 <Camera className="h-4 w-4" />
//                 <span>Upload Photos</span>
//               </>
//             )}
//           </button>
//           <button 
//             onClick={generateReport}
//             disabled={isGeneratingReport || uploadedPhotos.length === 0}
//             className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
//           >
//             {isGeneratingReport ? (
//               <>
//                 <FileText className="h-4 w-4 animate-spin" />
//                 <span>Generating...</span>
//               </>
//             ) : (
//               <>
//                 <FileText className="h-4 w-4" />
//                 <span>Generate Report</span>
//               </>
//             )}
//           </button>
//         </div>
//       )}

//       {/* Photo Modal */}
//       {showPhotoModal && selectedPhoto && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-hidden">
//             <div className="flex items-center justify-between p-4 border-b">
//               <h3 className="font-medium text-gray-900">{selectedPhoto.name}</h3>
//               <button
//                 onClick={() => setShowPhotoModal(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//             <div className="p-4">
//               <img
//                 src={selectedPhoto.url}
//                 alt={selectedPhoto.name}
//                 className="w-full h-auto max-h-96 object-contain"
//               />
//               <div className="mt-4 text-sm text-gray-600">
//                 <p>Size: {Math.round(selectedPhoto.size / 1024)} KB</p>
//                 <p>Uploaded: {new Date(selectedPhoto.uploadedAt).toLocaleString()}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InspectionStatusBar;

// import React, { useState, useRef } from 'react';
// import {
//   Play,
//   Beaker,
//   FileText,
//   CheckCircle,
//   User,
//   MapPin,
//   DollarSign,
//   Clock,
//   Award,
//   Camera,
//   Upload,
//   X,
//   Download,
//   Eye,
//   MessageCircle,
//   Settings,
//   FileImage,
//   FileDown,
//   ChevronDown,
//   Edit3,
//   Save,
//   Printer,
//   Mail,
//   Copy,
//   CheckSquare,
//   AlertTriangle,
//   Info,
//   Star
// } from 'lucide-react';

// const InspectionStatusBar = ({ currentStatus, onStatusChange, userType, inspectionData, onReportGenerated }) => {
//   const [uploadedPhotos, setUploadedPhotos] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isGeneratingReport, setIsGeneratingReport] = useState(false);
//   const [generatedReport, setGeneratedReport] = useState(null);
//   const [showPhotoModal, setShowPhotoModal] = useState(false);
//   const [selectedPhoto, setSelectedPhoto] = useState(null);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const [showTemplateSelector, setShowTemplateSelector] = useState(false);
//   const [selectedTemplate, setSelectedTemplate] = useState('standard');
//   const [selectedReportType, setSelectedReportType] = useState('inspection');
//   const [customFields, setCustomFields] = useState({});
//   const [reportNotes, setReportNotes] = useState('');
//   const fileInputRef = useRef(null);

//   // Report Templates
//   const reportTemplates = {
//     standard: {
//       name: 'Standard Inspection Report',
//       description: 'Basic inspection report with essential details',
//       fields: ['inspector', 'location', 'date', 'findings', 'recommendations'],
//       color: 'blue'
//     },
//     detailed: {
//       name: 'Detailed Technical Report',
//       description: 'Comprehensive report with technical specifications',
//       fields: ['inspector', 'location', 'date', 'equipment', 'measurements', 'findings', 'recommendations', 'compliance'],
//       color: 'purple'
//     },
//     compliance: {
//       name: 'Compliance Audit Report',
//       description: 'Regulatory compliance focused report',
//       fields: ['inspector', 'location', 'date', 'regulations', 'compliance_status', 'violations', 'corrective_actions'],
//       color: 'green'
//     },
//     maintenance: {
//       name: 'Maintenance Inspection Report',
//       description: 'Equipment maintenance and condition report',
//       fields: ['inspector', 'location', 'date', 'equipment_condition', 'maintenance_needed', 'priority', 'cost_estimate'],
//       color: 'orange'
//     },
//     safety: {
//       name: 'Safety Inspection Report',
//       description: 'Safety hazard identification and assessment',
//       fields: ['inspector', 'location', 'date', 'hazards', 'risk_level', 'safety_measures', 'recommendations'],
//       color: 'red'
//     }
//   };

//   // Report Types
//   const reportTypes = {
//     inspection: { name: 'Inspection Report', icon: <Eye className="h-4 w-4" /> },
//     audit: { name: 'Audit Report', icon: <CheckSquare className="h-4 w-4" /> },
//     maintenance: { name: 'Maintenance Report', icon: <Settings className="h-4 w-4" /> },
//     incident: { name: 'Incident Report', icon: <AlertTriangle className="h-4 w-4" /> },
//     quality: { name: 'Quality Assessment', icon: <Star className="h-4 w-4" /> }
//   };

//   const inspectionPhases = [
//     {
//       id: 0,
//       name: 'Inspection Started',
//       icon: <Play className="w-4 h-4" />,
//       color: 'bg-blue-500',
//       bgColor: 'bg-blue-50',
//       textColor: 'text-blue-700',
//       borderColor: 'border-blue-200',
//       description: 'Inspector has begun the inspection process'
//     },
//     {
//       id: 1,
//       name: 'Sample Collected',
//       icon: <Beaker className="w-4 h-4" />,
//       color: 'bg-yellow-500',
//       bgColor: 'bg-yellow-50',
//       textColor: 'text-yellow-700',
//       borderColor: 'border-yellow-200',
//       description: 'Samples have been collected for analysis'
//     },
//     {
//       id: 2,
//       name: 'Analysis',
//       icon: <FileText className="w-4 h-4" />,
//       color: 'bg-orange-500',
//       bgColor: 'bg-orange-50',
//       textColor: 'text-orange-700',
//       borderColor: 'border-orange-200',
//       description: 'Laboratory analysis is in progress'
//     },
//     {
//       id: 3,
//       name: 'Report Approved',
//       icon: <CheckCircle className="w-4 h-4" />,
//       color: 'bg-green-500',
//       bgColor: 'bg-green-50',
//       textColor: 'text-green-700',
//       borderColor: 'border-green-200',
//       description: 'Final report has been approved and completed'
//     }
//   ];

//   const handlePhaseClick = (phaseId) => {
//     if (userType === 'inspector') {
//       onStatusChange(phaseId);
      
//       if (phaseId === 3) {
//         generateFinalReport();
//       }
//     }
//   };

//   const handlePhotoUpload = (event) => {
//     const files = Array.from(event.target.files);
//     if (files.length === 0) return;

//     setIsUploading(true);
    
//     setTimeout(() => {
//       const newPhotos = files.map((file, index) => ({
//         id: Date.now() + index,
//         name: file.name,
//         size: file.size,
//         url: URL.createObjectURL(file),
//         uploadedAt: new Date().toISOString(),
//         category: 'general'
//       }));
      
//       setUploadedPhotos(prev => [...prev, ...newPhotos]);
//       setIsUploading(false);
      
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }, 1500);
//   };

//   const removePhoto = (photoId) => {
//     setUploadedPhotos(prev => prev.filter(photo => photo.id !== photoId));
//   };

//   const generateReport = () => {
//     setIsGeneratingReport(true);
    
//     // Show report generation modal first
//     setShowReportModal(true);
    
//     setTimeout(() => {
//       const template = reportTemplates[selectedTemplate];
//       const report = {
//         id: Date.now(),
//         inspectionId: inspectionData?.id || 'INS-001',
//         template: selectedTemplate,
//         type: selectedReportType,
//         templateName: template.name,
//         typeName: reportTypes[selectedReportType].name,
//         inspectorName: inspectionData?.inspectorName || 'Inspector',
//         location: inspectionData?.location || 'Location',
//         amount: inspectionData?.amount || 'N/A',
//         startedAt: inspectionData?.startedAt || new Date().toISOString(),
//         completedAt: new Date().toISOString(),
//         photos: uploadedPhotos.length,
//         status: 'Draft',
//         findings: customFields.findings || 'Inspection completed successfully. All samples collected and analyzed.',
//         recommendations: customFields.recommendations || 'No immediate actions required. Continue regular monitoring.',
//         notes: reportNotes,
//         customFields: customFields
//       };
      
//       setGeneratedReport(report);
//       setIsGeneratingReport(false);
      
//       // Automatically generate and show the PDF
//       setTimeout(() => {
//         downloadPDF();
//       }, 500);
//     }, 2000);
//   };

//   const generateFinalReport = () => {
//     const template = reportTemplates[selectedTemplate];
//     const finalReport = {
//       id: Date.now(),
//       inspectionId: inspectionData?.id || 'INS-001',
//       template: selectedTemplate,
//       type: selectedReportType,
//       templateName: template.name,
//       typeName: reportTypes[selectedReportType].name,
//       inspectorName: inspectionData?.inspectorName || 'Inspector',
//       location: inspectionData?.location || 'Location',
//       amount: inspectionData?.amount || 'N/A',
//       startedAt: inspectionData?.startedAt || new Date().toISOString(),
//       completedAt: new Date().toISOString(),
//       photos: uploadedPhotos.length,
//       status: 'Approved',
//       findings: customFields.findings || 'Inspection completed successfully. All samples collected and analyzed according to standards.',
//       recommendations: customFields.recommendations || 'All parameters within acceptable limits. Continue regular monitoring schedule.',
//       notes: reportNotes,
//       customFields: customFields
//     };
    
//     if (onReportGenerated) {
//       onReportGenerated({
//         type: 'inspection_completed',
//         message: '🎉 Inspection Completed Successfully!',
//         report: finalReport,
//         timestamp: new Date().toISOString()
//       });
//     }
//   };

//   const downloadPDF = async () => {
//     if (!generatedReport) return;
    
//     try {
//       // Create PDF content using HTML and CSS
//       const pdfContent = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="utf-8">
//           <title>Inspection Report - ${generatedReport.inspectionId}</title>
//           <style>
//             body { 
//               font-family: Arial, sans-serif; 
//               margin: 0; 
//               padding: 20px; 
//               line-height: 1.6; 
//               color: #333;
//             }
//             .header { 
//               text-align: center; 
//               border-bottom: 2px solid #4F46E5; 
//               padding-bottom: 20px; 
//               margin-bottom: 30px; 
//             }
//             .header h1 { 
//               color: #4F46E5; 
//               margin: 0; 
//               font-size: 28px; 
//             }
//             .header p { 
//               margin: 5px 0; 
//               color: #666; 
//             }
//             .section { 
//               margin-bottom: 25px; 
//               page-break-inside: avoid; 
//             }
//             .section h2 { 
//               background: #F3F4F6; 
//               padding: 10px; 
//               margin: 0 0 15px 0; 
//               border-left: 4px solid #4F46E5; 
//               font-size: 18px; 
//             }
//             .details-grid { 
//               display: grid; 
//               grid-template-columns: 1fr 1fr; 
//               gap: 20px; 
//               margin-bottom: 20px; 
//             }
//             .detail-item { 
//               padding: 10px; 
//               background: #F9FAFB; 
//               border-radius: 5px; 
//             }
//             .detail-label { 
//               font-weight: bold; 
//               color: #374151; 
//             }
//             .detail-value { 
//               margin-top: 5px; 
//             }
//             .findings, .recommendations, .notes { 
//               background: #F9FAFB; 
//               padding: 15px; 
//               border-radius: 5px; 
//               border-left: 4px solid #10B981; 
//             }
//             .status { 
//               display: inline-block; 
//               padding: 4px 12px; 
//               border-radius: 20px; 
//               font-weight: bold; 
//               font-size: 12px; 
//             }
//             .status-approved { 
//               background: #D1FAE5; 
//               color: #065F46; 
//             }
//             .status-draft { 
//               background: #FEF3C7; 
//               color: #92400E; 
//             }
//             .footer { 
//               margin-top: 40px; 
//               padding-top: 20px; 
//               border-top: 1px solid #E5E7EB; 
//               text-align: center; 
//               color: #6B7280; 
//               font-size: 12px; 
//             }
//             .phase-timeline { 
//               display: flex; 
//               justify-content: space-between; 
//               margin: 20px 0; 
//               padding: 15px; 
//               background: #F3F4F6; 
//               border-radius: 5px; 
//             }
//             .phase-item { 
//               text-align: center; 
//               flex: 1; 
//             }
//             .phase-icon { 
//               width: 30px; 
//               height: 30px; 
//               border-radius: 50%; 
//               background: #10B981; 
//               color: white; 
//               display: flex; 
//               align-items: center; 
//               justify-content: center; 
//               margin: 0 auto 5px; 
//               font-weight: bold; 
//             }
//             .phase-name { 
//               font-size: 12px; 
//               font-weight: bold; 
//             }
//             @media print {
//               body { margin: 0; }
//               .header { page-break-after: avoid; }
//               .section { page-break-inside: avoid; }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>${generatedReport.templateName}</h1>
//             <p><strong>Report ID:</strong> ${generatedReport.inspectionId}</p>
//             <p><strong>Type:</strong> ${generatedReport.typeName}</p>
//             <p class="status ${generatedReport.status === 'Approved' ? 'status-approved' : 'status-draft'}">${generatedReport.status}</p>
//           </div>

//           <div class="section">
//             <h2>Inspection Details</h2>
//             <div class="details-grid">
//               <div class="detail-item">
//                 <div class="detail-label">Inspector</div>
//                 <div class="detail-value">${generatedReport.inspectorName}</div>
//               </div>
//               <div class="detail-item">
//                 <div class="detail-label">Location</div>
//                 <div class="detail-value">${generatedReport.location}</div>
//               </div>
//               <div class="detail-item">
//                 <div class="detail-label">Amount</div>
//                 <div class="detail-value">${generatedReport.amount}</div>
//               </div>
//               <div class="detail-item">
//                 <div class="detail-label">Date Completed</div>
//                 <div class="detail-value">${new Date(generatedReport.completedAt).toLocaleDateString()}</div>
//               </div>
//               <div class="detail-item">
//                 <div class="detail-label">Photos Attached</div>
//                 <div class="detail-value">${generatedReport.photos} photos</div>
//               </div>
//               <div class="detail-item">
//                 <div class="detail-label">Duration</div>
//                 <div class="detail-value">${Math.round((new Date(generatedReport.completedAt) - new Date(generatedReport.startedAt)) / (1000 * 60))} minutes</div>
//               </div>
//             </div>
//           </div>

//           <div class="section">
//             <h2>Inspection Timeline</h2>
//             <div class="phase-timeline">
//               <div class="phase-item">
//                 <div class="phase-icon">✓</div>
//                 <div class="phase-name">Started</div>
//               </div>
//               <div class="phase-item">
//                 <div class="phase-icon">✓</div>
//                 <div class="phase-name">Sample Collected</div>
//               </div>
//               <div class="phase-item">
//                 <div class="phase-icon">✓</div>
//                 <div class="phase-name">Analysis</div>
//               </div>
//               <div class="phase-item">
//                 <div class="phase-icon">✓</div>
//                 <div class="phase-name">Report Approved</div>
//               </div>
//             </div>
//           </div>

//           <div class="section">
//             <h2>Findings</h2>
//             <div class="findings">
//               ${generatedReport.findings}
//             </div>
//           </div>

//           <div class="section">
//             <h2>Recommendations</h2>
//             <div class="recommendations">
//               ${generatedReport.recommendations}
//             </div>
//           </div>

//           ${generatedReport.notes ? `
//           <div class="section">
//             <h2>Additional Notes</h2>
//             <div class="notes">
//               ${generatedReport.notes}
//             </div>
//           </div>
//           ` : ''}

//           ${Object.keys(generatedReport.customFields || {}).length > 0 ? `
//           <div class="section">
//             <h2>Additional Information</h2>
//             <div class="details-grid">
//               ${Object.entries(generatedReport.customFields).map(([key, value]) => `
//                 <div class="detail-item">
//                   <div class="detail-label">${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</div>
//                   <div class="detail-value">${value}</div>
//                 </div>
//               `).join('')}
//             </div>
//           </div>
//           ` : ''}

//           <div class="footer">
//             <p>This report was generated on ${new Date().toLocaleString()}</p>
//             <p>Inspection Management System - Professional Report</p>
//           </div>
//         </body>
//         </html>
//       `;

//       // Create a new window for PDF generation
//       const printWindow = window.open('', '_blank');
//       printWindow.document.write(pdfContent);
//       printWindow.document.close();
      
//       // Wait for content to load, then trigger print
//       setTimeout(() => {
//         printWindow.focus();
//         printWindow.print();
        
//         // Optional: Close the window after printing
//         setTimeout(() => {
//           printWindow.close();
//         }, 1000);
//       }, 500);

//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       alert('Error generating PDF. Please try again.');
//     }
//   };

//   const printReport = () => {
//     window.print();
//   };

//   const emailReport = () => {
//     const subject = `Inspection Report - ${generatedReport.inspectionId}`;
//     const body = `Please find the inspection report attached.\n\nInspection ID: ${generatedReport.inspectionId}\nLocation: ${generatedReport.location}\nInspector: ${generatedReport.inspectorName}\nCompleted: ${new Date(generatedReport.completedAt).toLocaleString()}`;
    
//     window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
//   };

//   const copyReportLink = () => {
//     navigator.clipboard.writeText(`https://inspections.app/report/${generatedReport.id}`);
//     alert('Report link copied to clipboard!');
//   };

//   const viewPhoto = (photo) => {
//     setSelectedPhoto(photo);
//     setShowPhotoModal(true);
//   };

//   const updateCustomField = (fieldName, value) => {
//     setCustomFields(prev => ({
//       ...prev,
//       [fieldName]: value
//     }));
//   };

//   const getTemplateColor = (templateKey) => {
//     const colors = {
//       blue: 'bg-blue-500',
//       purple: 'bg-purple-500',
//       green: 'bg-green-500',
//       orange: 'bg-orange-500',
//       red: 'bg-red-500'
//     };
//     return colors[reportTemplates[templateKey].color] || 'bg-blue-500';
//   };

//   return (
//     <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
//       {/* Status Bar Header */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center space-x-2 mb-2">
//           <Award className="h-5 w-5 text-blue-600" />
//           <h3 className="text-lg font-semibold text-gray-900">Inspection Status</h3>
//         </div>
//         <p className="text-sm text-gray-600">
//           {userType === 'inspector' ? 'Click to update status' : 'Real-time status updates'}
//         </p>
//       </div>

//       {/* Inspection Details */}
//       <div className="p-4 border-b border-gray-200 bg-gray-50">
//         <h4 className="font-medium text-gray-900 mb-2">Inspection Details</h4>
//         <div className="space-y-2 text-sm">
//           <div className="flex items-center space-x-2">
//             <User className="h-3 w-3 text-gray-400" />
//             <span className="text-gray-600">Inspector:</span>
//             <span className="font-medium">{inspectionData?.inspectorName || 'Inspector'}</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <MapPin className="h-3 w-3 text-gray-400" />
//             <span className="text-gray-600">Location:</span>
//             <span className="font-medium">{inspectionData?.location || 'Location'}</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <DollarSign className="h-3 w-3 text-gray-400" />
//             <span className="text-gray-600">Amount:</span>
//             <span className="font-medium text-green-600">${inspectionData?.amount || 'N/A'}</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Clock className="h-3 w-3 text-gray-400" />
//             <span className="text-gray-600">Started:</span>
//             <span className="font-medium">
//               {inspectionData?.startedAt 
//                 ? new Date(inspectionData.startedAt).toLocaleString()
//                 : 'Just now'
//               }
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Status Phases */}
//       <div className="flex-1 p-4">
//         <div className="space-y-3">
//           {inspectionPhases.map((phase, index) => {
//             const isActive = currentStatus === phase.id;
//             const isCompleted = currentStatus > phase.id;
//             const isClickable = userType === 'inspector';

//             return (
//               <div
//                 key={phase.id}
//                 onClick={() => handlePhaseClick(phase.id)}
//                 className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
//                   isActive
//                     ? `${phase.bgColor} ${phase.borderColor} ${phase.textColor}`
//                     : isCompleted
//                     ? 'bg-green-50 border-green-200 text-green-700'
//                     : 'bg-gray-50 border-gray-200 text-gray-600'
//                 } ${
//                   isClickable
//                     ? 'cursor-pointer hover:shadow-md'
//                     : 'cursor-default'
//                 }`}
//               >
//                 {index < inspectionPhases.length - 1 && (
//                   <div 
//                     className={`absolute left-6 top-12 w-0.5 h-6 ${
//                       isCompleted ? 'bg-green-400' : 'bg-gray-300'
//                     }`}
//                   />
//                 )}

//                 <div className="flex items-start space-x-3">
//                   <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
//                     isActive
//                       ? phase.color
//                       : isCompleted
//                       ? 'bg-green-500'
//                       : 'bg-gray-400'
//                   } text-white`}>
//                     {isCompleted ? (
//                       <CheckCircle className="w-4 h-4" />
//                     ) : (
//                       phase.icon
//                     )}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between">
//                       <h4 className="font-medium text-sm">{phase.name}</h4>
//                       {isActive && (
//                         <div className="flex items-center space-x-1">
//                           <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
//                           <span className="text-xs font-medium">Active</span>
//                         </div>
//                       )}
//                       {isCompleted && (
//                         <span className="text-xs font-medium text-green-600">Completed</span>
//                       )}
//                     </div>
//                     <p className="text-xs mt-1 opacity-75">{phase.description}</p>
                    
//                     {(isActive || isCompleted) && (
//                       <div className="mt-2 text-xs opacity-60">
//                         {isCompleted ? 'Completed' : 'Started'}: {new Date().toLocaleTimeString()}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {isClickable && isActive && (
//                   <div className="mt-3 pt-2 border-t border-current border-opacity-20">
//                     <div className="flex items-center space-x-2">
//                       <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
//                       <span className="text-xs font-medium">
//                         Click to mark as complete
//                       </span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Uploaded Photos Section */}
//       {uploadedPhotos.length > 0 && (
//         <div className="p-4 border-t border-gray-200">
//           <div className="flex items-center justify-between mb-2">
//             <h4 className="font-medium text-gray-900">Photos ({uploadedPhotos.length})</h4>
//             <Camera className="h-4 w-4 text-gray-400" />
//           </div>
//           <div className="grid grid-cols-3 gap-2">
//             {uploadedPhotos.slice(0, 6).map((photo) => (
//               <div key={photo.id} className="relative group">
//                 <img
//                   src={photo.url}
//                   alt={photo.name}
//                   className="w-full h-16 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
//                   onClick={() => viewPhoto(photo)}
//                 />
//                 <button
//                   onClick={() => removePhoto(photo.id)}
//                   className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <X className="h-2 w-2" />
//                 </button>
//               </div>
//             ))}
//           </div>
//           {uploadedPhotos.length > 6 && (
//             <p className="text-xs text-gray-500 mt-2">+{uploadedPhotos.length - 6} more photos</p>
//           )}
//         </div>
//       )}

//       {/* Generated Report Section */}
//       {generatedReport && (
//         <div className="p-4 border-t border-gray-200 bg-blue-50">
//           <div className="flex items-center justify-between mb-2">
//             <h4 className="font-medium text-blue-900">Report Generated</h4>
//             <div className="flex items-center space-x-1">
//               <div className={`w-2 h-2 rounded-full ${getTemplateColor(generatedReport.template)}`}></div>
//               <span className="text-xs text-blue-700">{generatedReport.templateName}</span>
//             </div>
//           </div>
//           <div className="space-y-1 text-sm text-blue-800">
//             <p>Type: <span className="font-medium">{generatedReport.typeName}</span></p>
//             <p>Status: <span className="font-medium">{generatedReport.status}</span></p>
//             <p>Photos: <span className="font-medium">{generatedReport.photos}</span></p>
//             <p>Generated: <span className="font-medium">{new Date(generatedReport.completedAt).toLocaleString()}</span></p>
//           </div>
          
//           <div className="mt-3 grid grid-cols-2 gap-2">
//             <button 
//               onClick={() => setShowReportModal(true)}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-1"
//             >
//               <Eye className="h-3 w-3" />
//               <span>View</span>
//             </button>
//             <button 
//               onClick={downloadPDF}
//               className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-1"
//             >
//               <Download className="h-3 w-3" />
//               <span>PDF</span>
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Action Buttons for Inspector */}
//       {userType === 'inspector' && (
//         <div className="p-4 border-t border-gray-200 space-y-2">
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handlePhotoUpload}
//             accept="image/*"
//             multiple
//             className="hidden"
//           />
//           <button 
//             onClick={() => fileInputRef.current?.click()}
//             disabled={isUploading}
//             className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
//           >
//             {isUploading ? (
//               <>
//                 <Upload className="h-4 w-4 animate-spin" />
//                 <span>Uploading...</span>
//               </>
//             ) : (
//               <>
//                 <Camera className="h-4 w-4" />
//                 <span>Upload Photos</span>
//               </>
//             )}
//           </button>
          
//           <div className="relative">
//             <button 
//               onClick={() => setShowTemplateSelector(!showTemplateSelector)}
//               className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
//             >
//               <Settings className="h-4 w-4" />
//               <span>Configure Report</span>
//               <ChevronDown className="h-4 w-4" />
//             </button>
            
//             {showTemplateSelector && (
//               <div className="absolute bottom-full mb-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
//                 <div className="p-3 border-b border-gray-200">
//                   <h4 className="font-medium text-gray-900 mb-2">Report Template</h4>
//                   <div className="space-y-2">
//                     {Object.entries(reportTemplates).map(([key, template]) => (
//                       <label key={key} className="flex items-start space-x-2 cursor-pointer p-2 rounded hover:bg-gray-50">
//                         <input
//                           type="radio"
//                           name="template"
//                           value={key}
//                           checked={selectedTemplate === key}
//                           onChange={(e) => setSelectedTemplate(e.target.value)}
//                           className="text-blue-600 mt-1"
//                         />
//                         <div className="flex-1">
//                           <div className="flex items-center space-x-2">
//                             <div className={`w-2 h-2 rounded-full ${getTemplateColor(key)}`}></div>
//                             <span className="text-sm font-medium">{template.name}</span>
//                           </div>
//                           <p className="text-xs text-gray-500 mt-1">{template.description}</p>
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div className="p-3 border-b border-gray-200">
//                   <h4 className="font-medium text-gray-900 mb-2">Report Type</h4>
//                   <div className="space-y-2">
//                     {Object.entries(reportTypes).map(([key, type]) => (
//                       <label key={key} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-50">
//                         <input
//                           type="radio"
//                           name="reportType"
//                           value={key}
//                           checked={selectedReportType === key}
//                           onChange={(e) => setSelectedReportType(e.target.value)}
//                           className="text-blue-600"
//                         />
//                         <div className="flex items-center space-x-2">
//                           {type.icon}
//                           <span className="text-sm">{type.name}</span>
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div className="p-3 border-b border-gray-200">
//                   <h4 className="font-medium text-gray-900 mb-2">Custom Fields</h4>
//                   <div className="space-y-3">
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">Findings</label>
//                       <textarea
//                         value={customFields.findings || ''}
//                         onChange={(e) => updateCustomField('findings', e.target.value)}
//                         placeholder="Enter your inspection findings..."
//                         className="w-full px-2 py-1 text-xs border border-gray-300 rounded resize-none"
//                         rows="2"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">Recommendations</label>
//                       <textarea
//                         value={customFields.recommendations || ''}
//                         onChange={(e) => updateCustomField('recommendations', e.target.value)}
//                         placeholder="Enter your recommendations..."
//                         className="w-full px-2 py-1 text-xs border border-gray-300 rounded resize-none"
//                         rows="2"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">Additional Notes</label>
//                       <textarea
//                         value={reportNotes}
//                         onChange={(e) => setReportNotes(e.target.value)}
//                         placeholder="Any additional notes or observations..."
//                         className="w-full px-2 py-1 text-xs border border-gray-300 rounded resize-none"
//                         rows="2"
//                       />
//                     </div>
                    
//                     {/* Template-specific fields */}
//                     {selectedTemplate === 'compliance' && (
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">Compliance Status</label>
//                         <select
//                           value={customFields.compliance_status || ''}
//                           onChange={(e) => updateCustomField('compliance_status', e.target.value)}
//                           className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
//                         >
//                           <option value="">Select status...</option>
//                           <option value="compliant">Fully Compliant</option>
//                           <option value="minor_issues">Minor Issues</option>
//                           <option value="major_issues">Major Issues</option>
//                           <option value="non_compliant">Non-Compliant</option>
//                         </select>
//                       </div>
//                     )}
                    
//                     {selectedTemplate === 'safety' && (
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">Risk Level</label>
//                         <select
//                           value={customFields.risk_level || ''}
//                           onChange={(e) => updateCustomField('risk_level', e.target.value)}
//                           className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
//                         >
//                           <option value="">Select risk level...</option>
//                           <option value="low">Low Risk</option>
//                           <option value="medium">Medium Risk</option>
//                           <option value="high">High Risk</option>
//                           <option value="critical">Critical Risk</option>
//                         </select>
//                       </div>
//                     )}
                    
//                     {selectedTemplate === 'maintenance' && (
//                       <>
//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">Equipment Condition</label>
//                           <select
//                             value={customFields.equipment_condition || ''}
//                             onChange={(e) => updateCustomField('equipment_condition', e.target.value)}
//                             className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
//                           >
//                             <option value="">Select condition...</option>
//                             <option value="excellent">Excellent</option>
//                             <option value="good">Good</option>
//                             <option value="fair">Fair</option>
//                             <option value="poor">Poor</option>
//                             <option value="critical">Critical</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">Priority Level</label>
//                           <select
//                             value={customFields.priority || ''}
//                             onChange={(e) => updateCustomField('priority', e.target.value)}
//                             className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
//                           >
//                             <option value="">Select priority...</option>
//                             <option value="low">Low Priority</option>
//                             <option value="medium">Medium Priority</option>
//                             <option value="high">High Priority</option>
//                             <option value="urgent">Urgent</option>
//                           </select>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="p-3">
//                   <button
//                     onClick={() => setShowTemplateSelector(false)}
//                     className="w-full bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
//                   >
//                     Save Configuration
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
          
//           <button 
//             onClick={generateReport}
//             disabled={isGeneratingReport || uploadedPhotos.length === 0}
//             className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
//           >
//             {isGeneratingReport ? (
//               <>
//                 <FileText className="h-4 w-4 animate-spin" />
//                 <span>Generating...</span>
//               </>
//             ) : (
//               <>
//                 <FileText className="h-4 w-4" />
//                 <span>Generate Report</span>
//               </>
//             )}
//           </button>
//         </div>
//       )}

//       {/* Report Modal */}
//       {showReportModal && generatedReport && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
//             <div className="flex items-center justify-between p-6 border-b">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">{generatedReport.templateName}</h3>
//                 <p className="text-sm text-gray-600">{generatedReport.typeName} - {generatedReport.inspectionId}</p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={printReport}
//                   className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
//                 >
//                   <Printer className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={emailReport}
//                   className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
//                 >
//                   <Mail className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={copyReportLink}
//                   className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
//                 >
//                   <Copy className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={() => setShowReportModal(false)}
//                   className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
            
//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
//               <div className="space-y-6">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <h4 className="font-medium text-gray-900 mb-2">Inspection Details</h4>
//                     <div className="space-y-1 text-sm text-gray-600">
//                       <p><span className="font-medium">ID:</span> {generatedReport.inspectionId}</p>
//                       <p><span className="font-medium">Inspector:</span> {generatedReport.inspectorName}</p>
//                       <p><span className="font-medium">Location:</span> {generatedReport.location}</p>
//                       <p><span className="font-medium">Date:</span> {new Date(generatedReport.completedAt).toLocaleDateString()}</p>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <h4 className="font-medium text-gray-900 mb-2">Report Information</h4>
//                     <div className="space-y-1 text-sm text-gray-600">
//                       <p><span className="font-medium">Type:</span> {generatedReport.typeName}</p>
//                       <p><span className="font-medium">Template:</span> {generatedReport.templateName}</p>
//                       <p><span className="font-medium">Status:</span> <span className={`font-medium ${generatedReport.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'}`}>{generatedReport.status}</span></p>
//                       <p><span className="font-medium">Photos:</span> {generatedReport.photos}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2">Findings</h4>
//                   <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{generatedReport.findings}</p>
//                 </div>
                
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
//                   <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{generatedReport.recommendations}</p>
//                 </div>
                
//                 {generatedReport.notes && (
//                   <div>
//                     <h4 className="font-medium text-gray-900 mb-2">Additional Notes</h4>
//                     <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{generatedReport.notes}</p>
//                   </div>
//                 )}
                
//                 {uploadedPhotos.length > 0 && (
//                   <div>
//                     <h4 className="font-medium text-gray-900 mb-2">Attached Photos</h4>
//                     <div className="grid grid-cols-4 gap-2">
//                       {uploadedPhotos.map((photo) => (
//                         <img
//                           key={photo.id}
//                           src={photo.url}
//                           alt={photo.name}
//                           className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
//                           onClick={() => viewPhoto(photo)}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             <div className="flex items-center justify-between p-6 border-t bg-gray-50">
//               <div className="text-sm text-gray-500">
//                 Generated on {new Date(generatedReport.completedAt).toLocaleString()}
//               </div>
//               <button
//                 onClick={downloadPDF}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
//               >
//                 <Download className="h-4 w-4" />
//                 <span>Download PDF</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Photo Modal */}
//       {showPhotoModal && selectedPhoto && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-hidden">
//             <div className="flex items-center justify-between p-4 border-b">
//               <h3 className="font-medium text-gray-900">{selectedPhoto.name}</h3>
//               <button
//                 onClick={() => setShowPhotoModal(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//             <div className="p-4">
//               <img
//                 src={selectedPhoto.url}
//                 alt={selectedPhoto.name}
//                 className="w-full h-auto max-h-96 object-contain"
//               />
//               <div className="mt-4 text-sm text-gray-600">
//                 <p>Size: {Math.round(selectedPhoto.size / 1024)} KB</p>
//                 <p>Uploaded: {new Date(selectedPhoto.uploadedAt).toLocaleString()}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InspectionStatusBar;


import React, { useState, useRef ,useEffect} from 'react';
import { completeInspectionWithEvents } from '../../../../../utils/queryStorage';
import {
  Play,
  Beaker,
  FileText,
  CheckCircle,
  User,
  MapPin,
  DollarSign,
  Clock,
  Award,
  Camera,
  Upload,
  X,
  Download,
  Eye,
  MessageCircle,
  Settings,
  FileImage,
  FileDown,
  ChevronDown,
  Edit3,
  Save,
  Printer,
  Mail,
  Copy,
  CheckSquare,
  AlertTriangle,
  Info,
  Star,
  PartyPopper
} from 'lucide-react';

const InspectionStatusBar = ({ 
  currentStatus, 
  onStatusChange, 
  userType, 
  inspectionData, 
  onReportGenerated,
  onPhotoUploaded,
  sharedPhotos = []
}) => {
  const [uploadedPhotos, setUploadedPhotos] = useState(sharedPhotos);
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('standard');
  const [selectedReportType, setSelectedReportType] = useState('inspection');
  const [customFields, setCustomFields] = useState({});
  const [localCurrentStatus, setLocalCurrentStatus] = useState(currentStatus || 0);
  const [reportNotes, setReportNotes] = useState('');
  const fileInputRef = useRef(null);

  // Report Templates
  const reportTemplates = {
    standard: {
      name: 'Standard Inspection Report',
      description: 'Basic inspection report with essential details',
      fields: ['inspector', 'location', 'date', 'findings', 'recommendations'],
      color: 'blue'
    },
    detailed: {
      name: 'Detailed Technical Report',
      description: 'Comprehensive report with technical specifications',
      fields: ['inspector', 'location', 'date', 'equipment', 'measurements', 'findings', 'recommendations', 'compliance'],
      color: 'purple'
    },
    compliance: {
      name: 'Compliance Audit Report',
      description: 'Regulatory compliance focused report',
      fields: ['inspector', 'location', 'date', 'regulations', 'compliance_status', 'violations', 'corrective_actions'],
      color: 'green'
    },
    maintenance: {
      name: 'Maintenance Inspection Report',
      description: 'Equipment maintenance and condition report',
      fields: ['inspector', 'location', 'date', 'equipment_condition', 'maintenance_needed', 'priority', 'cost_estimate'],
      color: 'orange'
    },
    safety: {
      name: 'Safety Inspection Report',
      description: 'Safety hazard identification and assessment',
      fields: ['inspector', 'location', 'date', 'hazards', 'risk_level', 'safety_measures', 'recommendations'],
      color: 'red'
    }
  };

  // Report Types
  const reportTypes = {
    inspection: { name: 'Inspection Report', icon: <Eye className="h-4 w-4" /> },
    audit: { name: 'Audit Report', icon: <CheckSquare className="h-4 w-4" /> },
    maintenance: { name: 'Maintenance Report', icon: <Settings className="h-4 w-4" /> },
    incident: { name: 'Incident Report', icon: <AlertTriangle className="h-4 w-4" /> },
    quality: { name: 'Quality Assessment', icon: <Star className="h-4 w-4" /> }
  };

  const inspectionPhases = [
  {
    id: 0,
    name: 'Inspection Started',
    icon: <Play className="w-4 h-4" />,
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    description: 'Inspector has begun the inspection process'
  },
  {
    id: 1,
    name: 'Sample Collected',
    icon: <Beaker className="w-4 h-4" />,
    color: 'bg-yellow-500',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
    description: 'Samples have been collected for analysis'
  },
  {
    id: 2,
    name: 'Analysis',
    icon: <FileText className="w-4 h-4" />,
    color: 'bg-orange-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
    description: 'Laboratory analysis is in progress'
  },
  {
    id: 3,
    name: 'Report Approved',
    icon: <CheckCircle className="w-4 h-4" />,
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    description: 'Final report has been approved and completed'
  },
  {
    id: 4,
    name: 'Completed',
    icon: <PartyPopper className="w-4 h-4" />,
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    description: 'Inspection has been successfully completed'
  }
];

// Add this useEffect after your useState declarations
useEffect(() => {
  setLocalCurrentStatus(currentStatus || 0);
}, [currentStatus]);

  // Enhanced phase click handler
//   const handlePhaseClick = (phaseId) => {
//     if (userType === 'inspector') {
//       if (phaseId === 3) {
//         // Show completion confirmation for final phase
//         setShowCompletionModal(true);
//       } else {
//         onStatusChange(phaseId);
//       }
//     }
//   };

const handlePhaseClick = (phaseId) => {
  if (userType === 'inspector') {
    if (phaseId === 3) {
      // Show completion confirmation for "Report Approved" phase
      setShowCompletionModal(true);
    } else if (phaseId === 4) {
      // Already completed, do nothing
      console.log('Inspection already completed');
    } else {
      // Regular status change for other phases
      onStatusChange(phaseId);
    }
  }
};

  // Handle inspection completion
//   const handleCompleteInspection = () => {
//     onStatusChange(3);
//     setShowCompletionModal(false);
    
//     // Generate final report automatically
//     generateFinalReport();
    
//     // Show completion notification to both inspector and customer
//     if (onReportGenerated) {
//       onReportGenerated({
//         type: 'inspection_completed',
//         message: '🎉 Inspection Completed Successfully!',
//         details: 'The inspection has been completed and the final report is ready.',
//         showToCustomer: true,
//         showToInspector: true,
//         timestamp: new Date().toISOString(),
//         inspectionData: inspectionData
//       });
//     }
//   };

// Replace your existing handleCompleteInspection function with this:
// const handleCompleteInspection = async () => {
//   try {
//     const inspectionId = inspectionData?.id || 'inspection-001';
    
//     // Call the enhanced completion function
//     await completeInspectionWithEvents(inspectionId, {
//       inspectorName: inspectionData?.inspectorName || 'Inspector',
//       customerName: inspectionData?.customerName || 'Customer', 
//       location: inspectionData?.location || 'Location',
//       amount: inspectionData?.amount || 'N/A',
//       photosCount: uploadedPhotos.length
//     });
    
//     // Close the completion modal
//     setShowCompletionModal(false);
    
//     console.log('✅ Inspection completed successfully');
    
//   } catch (error) {
//     console.error('❌ Error completing inspection:', error);
//     alert('Failed to complete inspection. Please try again.');
//   }
// };

const handleCompleteInspection = async () => {
  try {
    // Update local status to 4 (Completed)
    setLocalCurrentStatus(4);
    
    const inspectionId = inspectionData?.id || 'inspection-001';
    
    // Call the enhanced completion function
    await completeInspectionWithEvents(inspectionId, {
      inspectorName: inspectionData?.inspectorName || 'Inspector',
      customerName: inspectionData?.customerName || 'Customer', 
      location: inspectionData?.location || 'Location',
      amount: inspectionData?.amount || 'N/A',
      photosCount: uploadedPhotos.length
    });
    
    // Close the completion modal
    setShowCompletionModal(false);
    
    // Trigger parent component status change
    if (onStatusChange) {
      onStatusChange(4);
    }
    
    console.log('✅ Inspection completed successfully');
    
  } catch (error) {
    console.error('❌ Error completing inspection:', error);
    alert('Failed to complete inspection. Please try again.');
  }
};
  // Enhanced photo upload with sharing
  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    
    setTimeout(() => {
      const newPhotos = files.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
        uploadedBy: userType,
        category: 'inspection'
      }));
      
      const updatedPhotos = [...uploadedPhotos, ...newPhotos];
      setUploadedPhotos(updatedPhotos);
      setIsUploading(false);
      
      // Notify parent component about photo upload for sharing
      if (onPhotoUploaded) {
        onPhotoUploaded(newPhotos);
      }
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1500);
  };

  const removePhoto = (photoId) => {
    setUploadedPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const generateReport = () => {
    setIsGeneratingReport(true);
    setShowReportModal(true);
    
    setTimeout(() => {
      const template = reportTemplates[selectedTemplate];
      const report = {
        id: Date.now(),
        inspectionId: inspectionData?.id || 'INS-001',
        template: selectedTemplate,
        type: selectedReportType,
        templateName: template.name,
        typeName: reportTypes[selectedReportType].name,
        inspectorName: inspectionData?.inspectorName || 'Inspector',
        location: inspectionData?.location || 'Location',
        amount: inspectionData?.amount || 'N/A',
        startedAt: inspectionData?.startedAt || new Date().toISOString(),
        completedAt: new Date().toISOString(),
        photos: uploadedPhotos.length,
        status: 'Draft',
        findings: customFields.findings || 'Inspection completed successfully. All samples collected and analyzed.',
        recommendations: customFields.recommendations || 'No immediate actions required. Continue regular monitoring.',
        notes: reportNotes,
        customFields: customFields
      };
      
      setGeneratedReport(report);
      setIsGeneratingReport(false);
      
      setTimeout(() => {
        downloadPDF();
      }, 500);
    }, 2000);
  };

  const generateFinalReport = () => {
    const template = reportTemplates[selectedTemplate];
    const finalReport = {
      id: Date.now(),
      inspectionId: inspectionData?.id || 'INS-001',
      template: selectedTemplate,
      type: selectedReportType,
      templateName: template.name,
      typeName: reportTypes[selectedReportType].name,
      inspectorName: inspectionData?.inspectorName || 'Inspector',
      location: inspectionData?.location || 'Location',
      amount: inspectionData?.amount || 'N/A',
      startedAt: inspectionData?.startedAt || new Date().toISOString(),
      completedAt: new Date().toISOString(),
      photos: uploadedPhotos.length,
      status: 'Approved',
      findings: customFields.findings || 'Inspection completed successfully. All samples collected and analyzed according to standards.',
      recommendations: customFields.recommendations || 'All parameters within acceptable limits. Continue regular monitoring schedule.',
      notes: reportNotes,
      customFields: customFields
    };
    
    setGeneratedReport(finalReport);
  };

  const downloadPDF = async () => {
    if (!generatedReport) return;
    
    try {
      const pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Inspection Report - ${generatedReport.inspectionId}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0; 
              padding: 20px; 
              line-height: 1.6; 
              color: #333;
            }
            .header { 
              text-align: center; 
              border-bottom: 2px solid #4F46E5; 
              padding-bottom: 20px; 
              margin-bottom: 30px; 
            }
            .header h1 { 
              color: #4F46E5; 
              margin: 0; 
              font-size: 28px; 
            }
            .completion-banner {
              background: linear-gradient(135deg, #10B981, #059669);
              color: white;
              padding: 15px;
              border-radius: 10px;
              margin-bottom: 20px;
              text-align: center;
              font-weight: bold;
            }
            .section { 
              margin-bottom: 25px; 
              page-break-inside: avoid; 
            }
            .section h2 { 
              background: #F3F4F6; 
              padding: 10px; 
              margin: 0 0 15px 0; 
              border-left: 4px solid #4F46E5; 
              font-size: 18px; 
            }
          </style>
        </head>
        <body>
          ${generatedReport.status === 'Approved' ? `
          <div class="completion-banner">
            🎉 INSPECTION COMPLETED SUCCESSFULLY 🎉
            <br>
            <small>Final Report Generated on ${new Date().toLocaleString()}</small>
          </div>
          ` : ''}
          
          <div class="header">
            <h1>${generatedReport.templateName}</h1>
            <p><strong>Report ID:</strong> ${generatedReport.inspectionId}</p>
            <p><strong>Status:</strong> ${generatedReport.status}</p>
          </div>

          <div class="section">
            <h2>Inspection Details</h2>
            <p><strong>Inspector:</strong> ${generatedReport.inspectorName}</p>
            <p><strong>Location:</strong> ${generatedReport.location}</p>
            <p><strong>Amount:</strong> ${generatedReport.amount}</p>
            <p><strong>Completed:</strong> ${new Date(generatedReport.completedAt).toLocaleString()}</p>
            <p><strong>Photos:</strong> ${generatedReport.photos} photos</p>
          </div>

          <div class="section">
            <h2>Findings</h2>
            <p>${generatedReport.findings}</p>
          </div>

          <div class="section">
            <h2>Recommendations</h2>
            <p>${generatedReport.recommendations}</p>
          </div>

          ${generatedReport.notes ? `
          <div class="section">
            <h2>Additional Notes</h2>
            <p>${generatedReport.notes}</p>
          </div>
          ` : ''}
        </body>
        </html>
      `;

      const printWindow = window.open('', '_blank');
      printWindow.document.write(pdfContent);
      printWindow.document.close();
      
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        setTimeout(() => {
          printWindow.close();
        }, 1000);
      }, 500);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const viewPhoto = (photo) => {
    setSelectedPhoto(photo);
    setShowPhotoModal(true);
  };

  const updateCustomField = (fieldName, value) => {
    setCustomFields(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const getTemplateColor = (templateKey) => {
    const colors = {
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500'
    };
    return colors[reportTemplates[templateKey].color] || 'bg-blue-500';
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Status Bar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <Award className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Inspection Status</h3>
        </div>
        <p className="text-sm text-gray-600">
          {userType === 'inspector' ? 'Click to update status' : 'Real-time status updates'}
        </p>
      </div>

      {/* Inspection Details */}
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
          <div className="flex items-center space-x-2">
            <Clock className="h-3 w-3 text-gray-400" />
            <span className="text-gray-600">Started:</span>
            <span className="font-medium">
              {inspectionData?.startedAt 
                ? new Date(inspectionData.startedAt).toLocaleString()
                : 'Just now'
              }
            </span>
          </div>
        </div>
      </div>

      {/* Status Phases */}
      <div className="flex-1 p-4">
        <div className="space-y-3">
          {inspectionPhases.map((phase, index) => {
            const isActive = localCurrentStatus  === phase.id;
            const isCompleted = localCurrentStatus  > phase.id;
            const isClickable = userType === 'inspector';

            return (
              <div
                key={phase.id}
                onClick={() => handlePhaseClick(phase.id)}
                className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
                  isActive
                    ? `${phase.bgColor} ${phase.borderColor} ${phase.textColor}`
                    : isCompleted
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                } ${
                  isClickable
                    ? 'cursor-pointer hover:shadow-md'
                    : 'cursor-default'
                }`}
              >
                {index < inspectionPhases.length - 1 && (
                  <div 
                    className={`absolute left-6 top-12 w-0.5 h-6 ${
                      isCompleted ? 'bg-green-400' : 'bg-gray-300'
                    }`}
                  />
                )}

                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive
                      ? phase.color
                      : isCompleted
                      ? 'bg-green-500'
                      : 'bg-gray-400'
                  } text-white`}>
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      phase.icon
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{phase.name}</h4>
                      {isActive && (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium">Active</span>
                        </div>
                      )}
                      {isCompleted && (
                        <span className="text-xs font-medium text-green-600">Completed</span>
                      )}
                    </div>
                    <p className="text-xs mt-1 opacity-75">{phase.description}</p>
                    
                    {(isActive || isCompleted) && (
                      <div className="mt-2 text-xs opacity-60">
                        {isCompleted ? 'Completed' : 'Started'}: {new Date().toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>

                {isClickable && isActive && phase.id === 3 && (
                  <div className="mt-3 pt-2 border-t border-current border-opacity-20">
                    <div className="flex items-center space-x-2">
                      <PartyPopper className="w-4 h-4 animate-bounce" />
                      <span className="text-xs font-medium text-green-700">
                        Click to complete inspection!
                      </span>
                    </div>
                  </div>
                )}

                {isClickable && isActive && phase.id !== 3 && (
                  <div className="mt-3 pt-2 border-t border-current border-opacity-20">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium">
                        Click to mark as complete
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Shared Photos Section */}
      {uploadedPhotos.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">
              {userType === 'inspector' ? 'Uploaded Photos' : 'Inspector Photos'} ({uploadedPhotos.length})
            </h4>
            <Camera className="h-4 w-4 text-gray-400" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {uploadedPhotos.slice(0, 6).map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-16 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                  onClick={() => viewPhoto(photo)}
                />
                {userType === 'inspector' && (
                  <button
                    onClick={() => removePhoto(photo.id)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-2 w-2" />
                  </button>
                )}
                {photo.uploadedBy && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b">
                    {photo.uploadedBy}
                  </div>
                )}
              </div>
            ))}
          </div>
          {uploadedPhotos.length > 6 && (
            <p className="text-xs text-gray-500 mt-2">+{uploadedPhotos.length - 6} more photos</p>
          )}
        </div>
      )}

      {/* Generated Report Section */}
      {generatedReport && (
        <div className={`p-4 border-t border-gray-200 ${generatedReport.status === 'Approved' ? 'bg-green-50' : 'bg-blue-50'}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className={`font-medium ${generatedReport.status === 'Approved' ? 'text-green-900' : 'text-blue-900'}`}>
              {generatedReport.status === 'Approved' ? '✅ Final Report' : 'Report Generated'}
            </h4>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${getTemplateColor(generatedReport.template)}`}></div>
              <span className={`text-xs ${generatedReport.status === 'Approved' ? 'text-green-700' : 'text-blue-700'}`}>
                {generatedReport.templateName}
              </span>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button 
              onClick={() => setShowReportModal(true)}
              className={`${generatedReport.status === 'Approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-1`}
            >
              <Eye className="h-3 w-3" />
              <span>View</span>
            </button>
            <button 
              onClick={downloadPDF}
              className={`${generatedReport.status === 'Approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-1`}
            >
              <Download className="h-3 w-3" />
              <span>PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons for Inspector */}
      {userType === 'inspector' && (
        <div className="p-4 border-t border-gray-200 space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
          >
            {isUploading ? (
              <>
                <Upload className="h-4 w-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Camera className="h-4 w-4" />
                <span>Upload Photos</span>
              </>
            )}
          </button>
          
          <button 
            onClick={generateReport}
            disabled={isGeneratingReport || uploadedPhotos.length === 0}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
          >
            {isGeneratingReport ? (
              <>
                <FileText className="h-4 w-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                <span>Generate Report</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Inspection Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md mx-4 overflow-hidden shadow-xl">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white text-center">
              <PartyPopper className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Complete Inspection?</h2>
              <p className="text-green-100">
                This will mark the inspection as completed and generate the final report
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Inspection Summary:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Inspector:</span>
                    <span className="font-medium">{inspectionData?.inspectorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{inspectionData?.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Photos Taken:</span>
                    <span className="font-medium">{uploadedPhotos.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Once completed, this action cannot be undone
                    </p>
                    <p className="text-xs text-yellow-600 mt-1">
                      The customer will be notified and the final report will be generated
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCompletionModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCompleteInspection}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Complete Inspection</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {showPhotoModal && selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium text-gray-900">{selectedPhoto.name}</h3>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.name}
                className="w-full h-auto max-h-96 object-contain"
              />
              <div className="mt-4 text-sm text-gray-600">
                <p>Size: {Math.round(selectedPhoto.size / 1024)} KB</p>
                <p>Uploaded: {new Date(selectedPhoto.uploadedAt).toLocaleString()}</p>
                {selectedPhoto.uploadedBy && (
                  <p>Uploaded by: {selectedPhoto.uploadedBy}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && generatedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{generatedReport.templateName}</h3>
                <p className="text-sm text-gray-600">{generatedReport.typeName} - {generatedReport.inspectionId}</p>
                {generatedReport.status === 'Approved' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Inspection Completed
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {generatedReport.status === 'Approved' && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 text-green-800">
                    <PartyPopper className="h-5 w-5" />
                    <span className="font-semibold">Inspection Successfully Completed!</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    Final report has been approved and is ready for download
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Inspection Details</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">ID:</span> {generatedReport.inspectionId}</p>
                      <p><span className="font-medium">Inspector:</span> {generatedReport.inspectorName}</p>
                      <p><span className="font-medium">Location:</span> {generatedReport.location}</p>
                      <p><span className="font-medium">Date:</span> {new Date(generatedReport.completedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Report Information</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Type:</span> {generatedReport.typeName}</p>
                      <p><span className="font-medium">Template:</span> {generatedReport.templateName}</p>
                      <p><span className="font-medium">Status:</span> 
                        <span className={`font-medium ml-1 ${generatedReport.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {generatedReport.status}
                        </span>
                      </p>
                      <p><span className="font-medium">Photos:</span> {generatedReport.photos}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Findings</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{generatedReport.findings}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{generatedReport.recommendations}</p>
                </div>
                
                {generatedReport.notes && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Additional Notes</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{generatedReport.notes}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-6 border-t bg-gray-50">
              <div className="text-sm text-gray-500">
                Generated on {new Date(generatedReport.completedAt).toLocaleString()}
              </div>
              <button
                onClick={downloadPDF}
                className={`${
                  generatedReport.status === 'Approved' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2`}
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionStatusBar;