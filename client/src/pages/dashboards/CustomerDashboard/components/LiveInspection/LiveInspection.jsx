// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Video,
//   Play,
//   Clock,
//   CheckCircle,
//   FileText,
//   Image,
//   Download,
//   MessageCircle,
//   Send,
//   User,
//   Calendar,
//   MapPin,
//   Eye,
//   Camera,
//   FlaskConical,
//   ClipboardCheck,
//   ArrowLeft,
//   Upload,
//   X,
//   Phone,
//   Mail
// } from 'lucide-react';

// const LiveInspection = () => {
//   const [activeInspections, setActiveInspections] = useState([]);
//   const [selectedInspection, setSelectedInspection] = useState(null);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const chatEndRef = useRef(null);

//   // Mock data for active inspections
//   const mockInspections = [
//     {
//       id: 'ORD-1720123456',
//       orderNumber: 'ORD-1720123456',
//       inspectionType: 'Basmati Rice Quality Assessment',
//       location: 'Punjab, India',
//       inspector: 'John Smith',
//       company: 'Elite Inspections Pvt Ltd',
//       startDate: '2024-07-01',
//       currentPhase: 2,
//       status: 'In Progress',
//       commodity: 'Basmati Rice',
//       volume: '50 Tons',
//       urgency: 'High'
//     },
//     {
//       id: 'ORD-1720123457',
//       orderNumber: 'ORD-1720123457',
//       inspectionType: 'Organic Cotton Certification',
//       location: 'Gujarat, India',
//       inspector: 'Rajesh Kumar',
//       company: 'Organic Cert India',
//       startDate: '2024-06-30',
//       currentPhase: 3,
//       status: 'In Progress',
//       commodity: 'Organic Cotton',
//       volume: '25 Tons',
//       urgency: 'Medium'
//     },
//     {
//       id: 'ORD-1720123458',
//       orderNumber: 'ORD-1720123458',
//       inspectionType: 'Wheat Quality Check',
//       location: 'Haryana, India',
//       inspector: 'Priya Sharma',
//       company: 'Grain Quality Labs',
//       startDate: '2024-07-02',
//       currentPhase: 1,
//       status: 'Just Started',
//       commodity: 'Durum Wheat',
//       volume: '100 Tons',
//       urgency: 'Low'
//     }
//   ];

//   // Mock inspection phases data
//   const mockPhaseData = {
//     'ORD-1720123456': {
//       phases: [
//         {
//           id: 1,
//           name: 'Inspection Start',
//           status: 'completed',
//           timestamp: '2024-07-01 09:00 AM',
//           documents: [
//             { id: 1, name: 'Site_Photos.jpg', type: 'image', url: '/api/placeholder/300/200' },
//             { id: 2, name: 'Initial_Report.pdf', type: 'document', url: '#' }
//           ],
//           notes: 'Inspection started at the facility. Initial documentation and site photos captured.'
//         },
//         {
//           id: 2,
//           name: 'Sample Collected',
//           status: 'active',
//           timestamp: '2024-07-01 11:30 AM',
//           documents: [
//             { id: 3, name: 'Sample_Photos.jpg', type: 'image', url: '/api/placeholder/300/200' },
//             { id: 4, name: 'Collection_Log.pdf', type: 'document', url: '#' }
//           ],
//           notes: 'Samples collected from multiple batches. Currently documenting sample collection process.'
//         },
//         {
//           id: 3,
//           name: 'Analysis',
//           status: 'pending',
//           timestamp: '',
//           documents: [],
//           notes: 'Laboratory analysis pending'
//         },
//         {
//           id: 4,
//           name: 'Report Approved/Rejected',
//           status: 'pending',
//           timestamp: '',
//           documents: [],
//           notes: 'Final report pending'
//         }
//       ]
//     },
//     'ORD-1720123457': {
//       phases: [
//         {
//           id: 1,
//           name: 'Inspection Start',
//           status: 'completed',
//           timestamp: '2024-06-30 08:00 AM',
//           documents: [
//             { id: 5, name: 'Cotton_Field_Photos.jpg', type: 'image', url: '/api/placeholder/300/200' }
//           ],
//           notes: 'Organic cotton field inspection initiated.'
//         },
//         {
//           id: 2,
//           name: 'Sample Collected',
//           status: 'completed',
//           timestamp: '2024-06-30 02:00 PM',
//           documents: [
//             { id: 6, name: 'Cotton_Samples.jpg', type: 'image', url: '/api/placeholder/300/200' },
//             { id: 7, name: 'Soil_Samples.jpg', type: 'image', url: '/api/placeholder/300/200' }
//           ],
//           notes: 'Cotton and soil samples collected for organic certification testing.'
//         },
//         {
//           id: 3,
//           name: 'Analysis',
//           status: 'active',
//           timestamp: '2024-07-01 10:00 AM',
//           documents: [
//             { id: 8, name: 'Lab_Analysis_Preliminary.pdf', type: 'document', url: '#' }
//           ],
//           notes: 'Chemical analysis in progress. Preliminary results available.'
//         },
//         {
//           id: 4,
//           name: 'Report Approved/Rejected',
//           status: 'pending',
//           timestamp: '',
//           documents: [],
//           notes: 'Final certification pending lab results'
//         }
//       ]
//     },
//     'ORD-1720123458': {
//       phases: [
//         {
//           id: 1,
//           name: 'Inspection Start',
//           status: 'active',
//           timestamp: '2024-07-02 10:00 AM',
//           documents: [
//             { id: 9, name: 'Warehouse_Entry.jpg', type: 'image', url: '/api/placeholder/300/200' }
//           ],
//           notes: 'Just arrived at the wheat storage facility. Beginning initial inspection.'
//         },
//         {
//           id: 2,
//           name: 'Sample Collected',
//           status: 'pending',
//           timestamp: '',
//           documents: [],
//           notes: 'Sample collection scheduled'
//         },
//         {
//           id: 3,
//           name: 'Analysis',
//           status: 'pending',
//           timestamp: '',
//           documents: [],
//           notes: 'Analysis pending'
//         },
//         {
//           id: 4,
//           name: 'Report Approved/Rejected',
//           status: 'pending',
//           timestamp: '',
//           documents: [],
//           notes: 'Report pending'
//         }
//       ]
//     }
//   };

//   // Mock chat messages
//   const mockChatMessages = {
//     'ORD-1720123456': [
//       { id: 1, sender: 'inspector', name: 'John Smith', message: 'Good morning! I have arrived at the facility and starting the inspection process.', timestamp: '09:00 AM', avatar: null },
//       { id: 2, sender: 'customer', name: 'You', message: 'Great! Please keep me updated on the progress.', timestamp: '09:05 AM', avatar: null },
//       { id: 3, sender: 'inspector', name: 'John Smith', message: 'Site photos uploaded. Moving to sample collection phase now.', timestamp: '11:30 AM', avatar: null },
//       { id: 4, sender: 'customer', name: 'You', message: 'Perfect! How long will the sample collection take?', timestamp: '11:35 AM', avatar: null },
//       { id: 5, sender: 'inspector', name: 'John Smith', message: 'Should take about 2 hours to collect samples from all batches. Will update with photos shortly.', timestamp: '11:40 AM', avatar: null }
//     ],
//     'ORD-1720123457': [
//       { id: 1, sender: 'inspector', name: 'Rajesh Kumar', message: 'Organic cotton inspection in progress. Lab analysis is showing promising results for organic certification.', timestamp: '10:00 AM', avatar: null },
//       { id: 2, sender: 'customer', name: 'You', message: 'Excellent! When can we expect the final report?', timestamp: '10:15 AM', avatar: null }
//     ],
//     'ORD-1720123458': [
//       { id: 1, sender: 'inspector', name: 'Priya Sharma', message: 'Hello! Just arrived at the wheat storage facility. Starting the inspection now.', timestamp: '10:00 AM', avatar: null }
//     ]
//   };

//   useEffect(() => {
//     setActiveInspections(mockInspections);
//   }, []);

//   useEffect(() => {
//     if (selectedInspection) {
//       setChatMessages(mockChatMessages[selectedInspection.id] || []);
//     }
//   }, [selectedInspection]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [chatMessages]);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const message = {
//         id: Date.now(),
//         sender: 'customer',
//         name: 'You',
//         message: newMessage,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         avatar: null
//       };
//       setChatMessages(prev => [...prev, message]);
//       setNewMessage('');
//     }
//   };

//   const getPhaseIcon = (phaseId, status) => {
//     const iconClass = `h-5 w-5 ${
//       status === 'completed' ? 'text-green-600' :
//       status === 'active' ? 'text-blue-600' :
//       'text-gray-400'
//     }`;

//     switch (phaseId) {
//       case 1: return <Play className={iconClass} />;
//       case 2: return <Camera className={iconClass} />;
//       case 3: return <FlaskConical className={iconClass} />;
//       case 4: return <ClipboardCheck className={iconClass} />;
//       default: return <Clock className={iconClass} />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'completed': return 'bg-green-100 text-green-700 border-green-200';
//       case 'active': return 'bg-blue-100 text-blue-700 border-blue-200';
//       case 'pending': return 'bg-gray-100 text-gray-500 border-gray-200';
//       default: return 'bg-gray-100 text-gray-500 border-gray-200';
//     }
//   };

//   const getUrgencyColor = (urgency) => {
//     switch (urgency.toLowerCase()) {
//       case 'high': return 'bg-red-100 text-red-700 border-red-200';
//       case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
//       case 'low': return 'bg-green-100 text-green-700 border-green-200';
//       default: return 'bg-gray-100 text-gray-700 border-gray-200';
//     }
//   };

//   const downloadDocument = (doc) => {
//     // Simulate document download
//     alert(`Downloading ${doc.name}...`);
//   };

//   const viewImage = (doc) => {
//     setSelectedImage(doc);
//     setShowImageModal(true);
//   };

//   if (selectedInspection) {
//     const phaseData = mockPhaseData[selectedInspection.id];
    
//     return (
//       <div className="space-y-6 p-4">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setSelectedInspection(null)}
//               className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               <span>Back to Inspections</span>
//             </button>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Live Inspection</h1>
//               <p className="text-gray-600">{selectedInspection.orderNumber}</p>
//             </div>
//           </div>
//           <div className="text-right">
//             <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(selectedInspection.urgency)}`}>
//               {selectedInspection.urgency} Priority
//             </span>
//           </div>
//         </div>

//         {/* Inspection Details */}
//         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspection Details</h3>
//               <div className="space-y-3 text-sm">
//                 <div>
//                   <span className="text-gray-600">Type:</span>
//                   <p className="font-medium text-gray-900">{selectedInspection.inspectionType}</p>
//                 </div>
//                 <div>
//                   <span className="text-gray-600">Commodity:</span>
//                   <p className="font-medium text-gray-900">{selectedInspection.commodity}</p>
//                 </div>
//                 <div>
//                   <span className="text-gray-600">Volume:</span>
//                   <p className="font-medium text-gray-900">{selectedInspection.volume}</p>
//                 </div>
//                 <div>
//                   <span className="text-gray-600">Location:</span>
//                   <p className="font-medium text-gray-900 flex items-center">
//                     <MapPin className="h-3 w-3 mr-1" />
//                     {selectedInspection.location}
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspector Details</h3>
//               <div className="space-y-3 text-sm">
//                 <div>
//                   <span className="text-gray-600">Inspector:</span>
//                   <p className="font-medium text-gray-900">{selectedInspection.inspector}</p>
//                 </div>
//                 <div>
//                   <span className="text-gray-600">Company:</span>
//                   <p className="font-medium text-gray-900">{selectedInspection.company}</p>
//                 </div>
//                 <div>
//                   <span className="text-gray-600">Start Date:</span>
//                   <p className="font-medium text-gray-900 flex items-center">
//                     <Calendar className="h-3 w-3 mr-1" />
//                     {selectedInspection.startDate}
//                   </p>
//                 </div>
//                 <div>
//                   <span className="text-gray-600">Status:</span>
//                   <p className="font-medium text-green-600">{selectedInspection.status}</p>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Inspector</h3>
//               <div className="space-y-3">
//                 <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
//                   <Phone className="h-4 w-4" />
//                   <span>Call Inspector</span>
//                 </button>
//                 <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
//                   <Mail className="h-4 w-4" />
//                   <span>Send Email</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content - Phases and Chat Side by Side */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Inspection Phases - Left Side */}
//           <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
//             <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
//               <ClipboardCheck className="h-5 w-5 mr-2" />
//               Inspection Status
//             </h3>
            
//             <div className="space-y-6">
//               {phaseData.phases.map((phase, index) => (
//                 <div key={phase.id} className="relative">
//                   {/* Connector Line */}
//                   {index < phaseData.phases.length - 1 && (
//                     <div className="absolute left-6 top-12 w-0.5 h-20 bg-gray-200"></div>
//                   )}
                  
//                   <div className="flex items-start space-x-4">
//                     {/* Phase Icon */}
//                     <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
//                       phase.status === 'completed' ? 'bg-green-100 border-green-300' :
//                       phase.status === 'active' ? 'bg-blue-100 border-blue-300' :
//                       'bg-gray-100 border-gray-300'
//                     }`}>
//                       {getPhaseIcon(phase.id, phase.status)}
//                     </div>
                    
//                     {/* Phase Content */}
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between mb-2">
//                         <h4 className="text-lg font-semibold text-gray-900">{phase.name}</h4>
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(phase.status)}`}>
//                           {phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
//                         </span>
//                       </div>
                      
//                       {phase.timestamp && (
//                         <p className="text-sm text-gray-500 mb-2 flex items-center">
//                           <Clock className="h-3 w-3 mr-1" />
//                           {phase.timestamp}
//                         </p>
//                       )}
                      
//                       <p className="text-gray-600 text-sm mb-4">{phase.notes}</p>
                      
//                       {/* Documents and Images */}
//                       {phase.documents.length > 0 && (
//                         <div className="space-y-3">
//                           <h5 className="font-medium text-gray-900 text-sm">Documents & Images</h5>
//                           <div className="grid grid-cols-2 gap-2">
//                             {phase.documents.map((doc) => (
//                               <div key={doc.id} className="border border-gray-200 rounded-lg p-2">
//                                 {doc.type === 'image' ? (
//                                   <div 
//                                     className="cursor-pointer"
//                                     onClick={() => viewImage(doc)}
//                                   >
//                                     <img 
//                                       src={doc.url} 
//                                       alt={doc.name}
//                                       className="w-full h-16 object-cover rounded mb-1"
//                                     />
//                                     <div className="flex items-center space-x-1">
//                                       <Image className="h-3 w-3 text-gray-500" />
//                                       <span className="text-xs text-gray-600 truncate">{doc.name}</span>
//                                     </div>
//                                   </div>
//                                 ) : (
//                                   <div 
//                                     className="cursor-pointer flex flex-col items-center justify-center h-16 bg-gray-50 rounded"
//                                     onClick={() => downloadDocument(doc)}
//                                   >
//                                     <FileText className="h-4 w-4 text-gray-500 mb-1" />
//                                     <span className="text-xs text-gray-600 text-center">{doc.name}</span>
//                                   </div>
//                                 )}
                                
//                                 <button
//                                   onClick={() => doc.type === 'image' ? viewImage(doc) : downloadDocument(doc)}
//                                   className="w-full mt-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs transition-colors flex items-center justify-center space-x-1"
//                                 >
//                                   {doc.type === 'image' ? (
//                                     <>
//                                       <Eye className="h-2 w-2" />
//                                       <span>View</span>
//                                     </>
//                                   ) : (
//                                     <>
//                                       <Download className="h-2 w-2" />
//                                       <span>Download</span>
//                                     </>
//                                   )}
//                                 </button>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Chat Room - Right Side */}
//           <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
//             <div className="p-4 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                 <MessageCircle className="h-5 w-5 mr-2" />
//                 Chat with Inspector
//               </h3>
//               <p className="text-sm text-gray-600">{selectedInspection.inspector}</p>
//             </div>
            
//             {/* Chat Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
//               {chatMessages.map((message) => (
//                 <div key={message.id} className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
//                   <div className={`max-w-xs px-3 py-2 rounded-lg ${
//                     message.sender === 'customer' 
//                       ? 'bg-blue-600 text-white' 
//                       : 'bg-gray-100 text-gray-900'
//                   }`}>
//                     <div className="flex items-center space-x-2 mb-1">
//                       <User className="h-3 w-3" />
//                       <span className="text-xs font-medium">{message.name}</span>
//                       <span className="text-xs opacity-75">{message.timestamp}</span>
//                     </div>
//                     <p className="text-sm">{message.message}</p>
//                   </div>
//                 </div>
//               ))}
//               <div ref={chatEndRef} />
//             </div>
            
//             {/* Chat Input */}
//             <div className="p-4 border-t border-gray-200">
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                   placeholder="Type your message..."
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
//                 >
//                   <Send className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Image Modal */}
//         {showImageModal && selectedImage && (
//           <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-4 max-w-4xl max-h-[90vh] overflow-auto">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">{selectedImage.name}</h3>
//                 <button
//                   onClick={() => setShowImageModal(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>
//               <img 
//                 src={selectedImage.url} 
//                 alt={selectedImage.name}
//                 className="w-full h-auto rounded-lg"
//               />
//               <div className="mt-4 flex items-center space-x-3">
//                 <button
//                   onClick={() => downloadDocument(selectedImage)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
//                 >
//                   <Download className="h-4 w-4" />
//                   <span>Download</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-4">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center">
//             <Video className="h-8 w-8 mr-3" />
//             Live Inspections
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Track your ongoing inspections in real-time
//           </p>
//         </div>
//       </div>

//       {/* Active Inspections Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {activeInspections.map((inspection) => (
//           <div 
//             key={inspection.id} 
//             onClick={() => setSelectedInspection(inspection)}
//             className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">{inspection.inspectionType}</h3>
//                 <p className="text-sm text-gray-500">Order: {inspection.orderNumber}</p>
//               </div>
//               <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(inspection.urgency)}`}>
//                 {inspection.urgency}
//               </span>
//             </div>
            
//             <div className="space-y-3 mb-4">
//               <div className="flex items-center space-x-2 text-sm text-gray-600">
//                 <MapPin className="h-4 w-4" />
//                 <span>{inspection.location}</span>
//               </div>
//               <div className="flex items-center space-x-2 text-sm text-gray-600">
//                 <User className="h-4 w-4" />
//                 <span>{inspection.inspector}</span>
//               </div>
//               <div className="flex items-center space-x-2 text-sm text-gray-600">
//                 <Calendar className="h-4 w-4" />
//                 <span>Started: {inspection.startDate}</span>
//               </div>
//             </div>
            
//             {/* Progress Indicator */}
//             <div className="mb-4">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-medium text-gray-700">Progress</span>
//                 <span className="text-sm text-gray-500">Phase {inspection.currentPhase}/4</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div 
//                   className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                   style={{ width: `${(inspection.currentPhase / 4) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
            
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium text-green-600">{inspection.status}</span>
//               <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
//                 <Eye className="h-4 w-4" />
//                 <span>View Details</span>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {activeInspections.length === 0 && (
//         <div className="text-center py-12">
//           <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Inspections</h3>
//           <p className="text-gray-600">
//             You don't have any ongoing inspections at the moment.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LiveInspection;



// // Updated Customer LiveInspection component with real chat integration
// // Update the chat section in your customer's LiveInspection component:
// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Video, 
//   MessageCircle, 
//   User, 
//   Send, 
//   Bot, 
//   Clock, 
//   ArrowRight,
//   Phone,
//   Mail,
//   FileText
// } from 'lucide-react';
// import { useQuery } from '../../../../../context/QueryContext';

// // =====================
// // ENHANCED CHAT COMPONENTS
// // =====================

// const ChatMessage = ({ message, currentUserId, currentUserType }) => {
//   const isOwnMessage = message.senderId === currentUserId;
//   const isSystemMessage = message.senderType === 'system';
  
//   const getMessageStyle = () => {
//     if (isSystemMessage) {
//       return 'bg-blue-50 border border-blue-200 text-blue-800 mx-auto max-w-md text-center';
//     }
//     if (isOwnMessage) {
//       return 'bg-blue-600 text-white ml-auto';
//     }
//     return 'bg-gray-100 text-gray-900 mr-auto';
//   };

//   const getMessageAlignment = () => {
//     if (isSystemMessage) return 'justify-center';
//     return isOwnMessage ? 'justify-end' : 'justify-start';
//   };

//   const getSenderInfo = () => {
//     if (isSystemMessage) return { name: 'System', icon: Bot, color: 'text-blue-600' };
//     if (isOwnMessage) return { name: 'You', icon: User, color: 'text-blue-100' };
//     return { name: 'Inspector', icon: User, color: 'text-gray-600' };
//   };

//   const senderInfo = getSenderInfo();
//   const IconComponent = senderInfo.icon;

//   return (
//     <div className={`flex ${getMessageAlignment()} mb-4`}>
//       <div className={`rounded-lg p-3 max-w-xs lg:max-w-md ${getMessageStyle()}`}>
//         {!isSystemMessage && (
//           <div className={`flex items-center space-x-2 mb-1 ${senderInfo.color}`}>
//             <IconComponent className="h-3 w-3" />
//             <span className="text-xs font-medium">{senderInfo.name}</span>
//           </div>
//         )}
//         <p className="text-sm">{message.message}</p>
//         <p className={`text-xs mt-1 ${
//           isOwnMessage ? 'text-blue-100' : 'text-gray-500'
//         }`}>
//           {new Date(message.timestamp).toLocaleTimeString([], { 
//             hour: '2-digit', 
//             minute: '2-digit' 
//           })}
//         </p>
//       </div>
//     </div>
//   );
// };

// const ChatInput = ({ inputMessage, setInputMessage, onSendMessage, isLoading }) => {
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       onSendMessage();
//     }
//   };

//   const quickActions = [
//     'What\'s the current status?',
//     'When will you be done?',
//     'Any issues found?',
//     'Send photos please'
//   ];

//   return (
//     <div className="p-4 border-t border-gray-200">
//       <div className="flex space-x-3">
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Type your message to inspector..."
//           className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           disabled={isLoading}
//         />
//         <button
//           onClick={onSendMessage}
//           disabled={!inputMessage.trim() || isLoading}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           {isLoading ? 'Sending...' : 'Send'}
//         </button>
//       </div>
      
//       {/* Quick Actions */}
//       <div className="mt-3 flex flex-wrap gap-2">
//         {quickActions.map((action) => (
//           <button
//             key={action}
//             onClick={() => setInputMessage(action)}
//             className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
//           >
//             {action}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// // =====================
// // MAIN LIVE INSPECTION COMPONENT
// // =====================

// const LiveInspection = () => {
//   const { 
//     sendMessage, 
//     getChatForInspection, 
//     loadChatMessages, 
//     getActiveInspectionsForInspector,
//     onChatChange,
//     getCurrentCustomerId
//   } = useQuery();

//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedInspection, setSelectedInspection] = useState(null);
//   const [activeInspections, setActiveInspections] = useState([]);
//   const messagesEndRef = useRef(null);

//   // Customer info
//   const currentCustomerId = getCurrentCustomerId();
//   const customerInfo = {
//     id: currentCustomerId,
//     name: 'You', // Current customer
//     type: 'customer'
//   };

//   // Load active inspections on mount
//   useEffect(() => {
//     // For demo, using mock data - replace with actual customer inspections
//     const mockInspections = [
//       {
//         id: 'INQ-2025-001',
//         queryTitle: 'Basmati Rice Quality Assessment',
//         location: 'Mumbai, Maharashtra',
//         amount: 600,
//         customerName: 'You',
//         inspectorName: 'John Inspector',
//         status: 'In Progress',
//         startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
//       }
//     ];
    
//     setActiveInspections(mockInspections);
//     if (mockInspections.length > 0) {
//       setSelectedInspection(mockInspections[0]);
//     }
//   }, []);

//   // Load chat messages when inspection is selected
//   useEffect(() => {
//     if (selectedInspection?.id) {
//       console.log('Loading chat for inspection:', selectedInspection.id);
//       loadChatMessages(selectedInspection.id);
//       const chatMessages = getChatForInspection(selectedInspection.id);
//       setMessages(chatMessages);
//     }
//   }, [selectedInspection?.id]);

//   // Listen for real-time chat updates
//   useEffect(() => {
//     if (!selectedInspection?.id) return;

//     const unsubscribe = onChatChange((eventData) => {
//       if (eventData.inspectionId === selectedInspection.id) {
//         console.log('Chat updated for customer:', eventData);
//         const updatedMessages = getChatForInspection(selectedInspection.id);
//         setMessages(updatedMessages);
//       }
//     });

//     return unsubscribe;
//   }, [selectedInspection?.id]);

//   // Auto scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim() || !selectedInspection?.id) return;

//     setIsLoading(true);
//     try {
//       const messageData = {
//         senderId: customerInfo.id,
//         senderName: customerInfo.name,
//         senderType: customerInfo.type,
//         message: inputMessage.trim(),
//         type: 'text'
//       };

//       await sendMessage(selectedInspection.id, messageData);
//       setInputMessage('');
      
//     } catch (error) {
//       console.error('Error sending message:', error);
//       alert('Failed to send message. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!selectedInspection) {
//     return (
//       <div className="p-6 max-w-7xl mx-auto">
//         <div className="text-center py-12">
//           <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">No Active Inspections</h2>
//           <p className="text-gray-600">
//             You don't have any ongoing inspections at the moment.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900 flex items-center">
//           <Video className="h-8 w-8 mr-3 text-blue-600" />
//           Live Inspection
//         </h1>
//         <p className="text-gray-600 mt-2">
//           Real-time inspection monitoring and communication with your inspector
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Inspection Status Panel */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <FileText className="h-5 w-5 mr-2 text-green-600" />
//               Current Inspection
//             </h3>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm text-gray-600">Inspection ID</label>
//                 <p className="font-medium text-gray-900">{selectedInspection.id}</p>
//               </div>
              
//               <div>
//                 <label className="text-sm text-gray-600">Type</label>
//                 <p className="font-medium text-gray-900">{selectedInspection.queryTitle}</p>
//               </div>
              
//               <div>
//                 <label className="text-sm text-gray-600">Inspector</label>
//                 <p className="font-medium text-gray-900">{selectedInspection.inspectorName}</p>
//               </div>
              
//               <div>
//                 <label className="text-sm text-gray-600">Location</label>
//                 <p className="font-medium text-gray-900">{selectedInspection.location}</p>
//               </div>
              
//               <div>
//                 <label className="text-sm text-gray-600">Status</label>
//                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
//                   {selectedInspection.status}
//                 </span>
//               </div>
              
//               <div>
//                 <label className="text-sm text-gray-600">Amount</label>
//                 <p className="font-medium text-green-600">${selectedInspection.amount}</p>
//               </div>
              
//               <div>
//                 <label className="text-sm text-gray-600">Started</label>
//                 <p className="font-medium text-gray-900">
//                   {new Date(selectedInspection.startedAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//             <div className="space-y-3">
//               <button className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
//                 <Phone className="h-4 w-4" />
//                 <span>Call Inspector</span>
//               </button>
//               <button className="w-full flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
//                 <FileText className="h-4 w-4" />
//                 <span>View Reports</span>
//               </button>
//               <button className="w-full flex items-center space-x-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
//                 <Mail className="h-4 w-4" />
//                 <span>Send Email</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Chat Panel */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-[600px] flex flex-col">
//             {/* Chat Header */}
//             <div className="flex items-center justify-between p-4 border-b border-gray-200">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                   <User className="h-5 w-5 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900">Chat with {selectedInspection.inspectorName}</h3>
//                   <p className="text-sm text-gray-600">Inspector is online</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-sm text-green-600 font-medium">Active</span>
//               </div>
//             </div>

//             {/* Messages Area */}
//             <div className="flex-1 overflow-y-auto p-4">
//               {messages.length === 0 ? (
//                 <div className="text-center py-8">
//                   <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
//                   <p className="text-gray-500">No messages yet. Start the conversation!</p>
//                 </div>
//               ) : (
//                 messages.map((message) => (
//                   <ChatMessage
//                     key={message.id}
//                     message={message}
//                     currentUserId={customerInfo.id}
//                     currentUserType="customer"
//                   />
//                 ))
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Enhanced Input Area */}
//             <ChatInput
//               inputMessage={inputMessage}
//               setInputMessage={setInputMessage}
//               onSendMessage={handleSendMessage}
//               isLoading={isLoading}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveInspection;


import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Send, 
  User, 
  Bot,
  Phone,
  Video,
  Paperclip,
  Camera,
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useQuery } from '../../../../../context/QueryContext';

// =====================
// CHAT MESSAGE COMPONENT
// =====================
const ChatMessage = ({ message, currentUserId, currentUserType }) => {
  const isOwnMessage = message.senderId === currentUserId;
  const isSystemMessage = message.senderType === 'system';
  
  const getMessageStyle = () => {
    if (isSystemMessage) {
      return 'bg-blue-50 border border-blue-200 text-blue-800 mx-auto max-w-md text-center';
    }
    if (isOwnMessage) {
      return 'bg-green-600 text-white ml-auto';
    }
    return 'bg-gray-100 text-gray-900 mr-auto';
  };

  const getMessageAlignment = () => {
    if (isSystemMessage) return 'justify-center';
    return isOwnMessage ? 'justify-end' : 'justify-start';
  };

  const getSenderInfo = () => {
    if (isSystemMessage) return { name: 'System', icon: Bot, color: 'text-blue-600' };
    if (isOwnMessage) return { name: 'You', icon: User, color: 'text-green-100' };
    return { name: message.senderName || 'Inspector', icon: User, color: 'text-gray-600' };
  };

  const senderInfo = getSenderInfo();
  const IconComponent = senderInfo.icon;

  return (
    <div className={`flex ${getMessageAlignment()} mb-4`}>
      <div className={`rounded-lg p-3 max-w-xs lg:max-w-md ${getMessageStyle()}`}>
        {!isSystemMessage && (
          <div className={`flex items-center space-x-2 mb-1 ${senderInfo.color}`}>
            <IconComponent className="h-3 w-3" />
            <span className="text-xs font-medium">{senderInfo.name}</span>
          </div>
        )}
        <p className="text-sm">{message.message}</p>
        <p className={`text-xs mt-1 ${
          isOwnMessage ? 'text-green-100' : 'text-gray-500'
        }`}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
};

// =====================
// CUSTOMER CHAT INPUT
// =====================
const CustomerChatInput = ({ inputMessage, setInputMessage, onSendMessage, isLoading }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const quickResponses = [
    'Thank you for the update!',
    'Please keep me posted on the progress.',
    'When do you expect to complete the inspection?',
    'Are there any issues I should be aware of?',
    'Can you send me some photos of the inspection?',
    'Thank you for your thorough work!'
  ];

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      {/* Message Input */}
      <div className="flex space-x-3 mb-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message to inspector..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          disabled={isLoading}
        />
        <button
          onClick={onSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          <Send className="h-4 w-4" />
          <span>{isLoading ? 'Sending...' : 'Send'}</span>
        </button>
      </div>

      {/* Quick Responses */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Quick responses:</p>
        <div className="flex flex-wrap gap-2">
          {quickResponses.map((response, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(response)}
              className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full hover:bg-green-100 transition-colors border border-green-200"
            >
              {response}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 mt-3 pt-3 border-t border-gray-100">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
          <Paperclip className="h-4 w-4" />
          <span className="text-sm">Attach File</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
          <Camera className="h-4 w-4" />
          <span className="text-sm">Photo</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
          <Phone className="h-4 w-4" />
          <span className="text-sm">Call</span>
        </button>
      </div>
    </div>
  );
};

// =====================
// MAIN CUSTOMER INSPECTION CHAT
// =====================
const CustomerInspectionChat = ({ inspection, onBack }) => {
  const { 
    sendMessage, 
    getChatForInspection, 
    loadChatMessages, 
    getCurrentCustomerId,
    onChatChange
  } = useQuery();
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inspectorOnline, setInspectorOnline] = useState(true); // Mock online status
  const messagesEndRef = useRef(null);

  // Current customer info
  const currentCustomerId = getCurrentCustomerId();
  const customerInfo = {
    id: currentCustomerId,
    name: 'Customer', // Get from auth context
    type: 'customer'
  };

  // Inspector info from inspection
  const inspectorInfo = {
    id: inspection?.inspectorId || 'inspector-001',
    name: inspection?.inspectorName || 'Inspector',
    type: 'inspector'
  };

  // Get inspection ID
  const getInspectionId = () => {
    return inspection?.inspectionId || 
           inspection?.queryId || 
           inspection?.id || 
           `inspection-${currentCustomerId}-${Date.now()}`;
  };

  // Load chat messages when component mounts
  useEffect(() => {
    const inspectionId = getInspectionId();
    
    if (inspectionId && inspection) {
      console.log('🔄 Customer loading chat for inspection:', inspectionId);
      
      try {
        loadChatMessages(inspectionId);
        const chatMessages = getChatForInspection(inspectionId);
        setMessages(chatMessages || []);
      } catch (error) {
        console.error('❌ Error loading chat:', error);
      }
    }
  }, [inspection]);

  // Listen for real-time chat updates
  useEffect(() => {
    const inspectionId = getInspectionId();
    if (!inspectionId) return;

    const unsubscribe = onChatChange((eventData) => {
      if (eventData.inspectionId === inspectionId) {
        console.log('💬 Customer chat updated:', eventData);
        const updatedMessages = getChatForInspection(inspectionId);
        setMessages(updatedMessages || []);
      }
    });

    return unsubscribe;
  }, [inspection]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        senderId: customerInfo.id,
        senderName: customerInfo.name,
        senderType: customerInfo.type,
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

  if (!inspection) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Active Inspection</h2>
          <p className="text-gray-600 mb-4">
            You don't have any active inspections to chat about.
          </p>
          <button
            onClick={onBack}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Chat with {inspectorInfo.name}</h1>
              <p className="text-sm text-gray-600">{inspection.queryTitle || 'Inspection in Progress'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${inspectorOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600">
                {inspectorOnline ? 'Inspector Online' : 'Inspector Offline'}
              </span>
            </div>
            <div className="text-right text-xs text-gray-500">
              <div>ID: {getInspectionId()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Inspection Summary */}
      <div className="bg-blue-50 px-6 py-3 border-b border-blue-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span className="text-blue-800">Inspection: {inspection.queryTitle}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-blue-800">Started: {new Date(inspection.startedAt || Date.now()).toLocaleString()}</span>
            </div>
          </div>
          <div className="text-sm text-blue-800 font-medium">
            Amount: ${inspection.amount || inspection.price}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-4" style={{ paddingBottom: '20px' }}>
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No messages yet. Start the conversation with your inspector!</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage
                key={message.id || index}
                message={message}
                currentUserId={customerInfo.id}
                currentUserType="customer"
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input - Fixed at bottom */}
      <div className="flex-shrink-0">
        <CustomerChatInput
          inputMessage={newMessage}
          setInputMessage={setNewMessage}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CustomerInspectionChat;