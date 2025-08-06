

// import React, { useState } from 'react';
// import { Upload, Building2, Mail, Phone, Globe, FileText, Award, MapPin, CreditCard, Plus, X, User, Users } from 'lucide-react';

// const InspectionCompanySignup = ({ onSuccess, onBack }) => {
//   const [formData, setFormData] = useState({
//     companyType: '',
//     companyName: '',
//     registeredAddress: '',
//     officeNumber: '',
//     tradeLicense: null,
//     importExportCertificate: null,
//     gstPanIec: null,
//     accountNumber: '',
//     ifscCode: '',
//     swiftCode: '',
//     bankName: '',
//     // Authorized Representative
//     repName: '',
//     repContact: '',
//     repEmail: '',
//     repGovernmentId: null,
//     // Team Members
//     teamMembers: [{ name: '', contact: '', email: '', designation: '' }],
//     addTeamMembers: false
//   });

//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleFileUpload = (e, fieldName) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         [fieldName]: file
//       }));
      
//       // Clear error when file is uploaded
//       if (errors[fieldName]) {
//         setErrors(prev => ({ ...prev, [fieldName]: '' }));
//       }
//     }
//   };

//   const handleTeamMemberChange = (index, field, value) => {
//     const newTeamMembers = [...formData.teamMembers];
//     newTeamMembers[index][field] = value;
//     setFormData(prev => ({
//       ...prev,
//       teamMembers: newTeamMembers
//     }));

//     // Clear team member errors
//     if (errors[`team_${index}_${field}`]) {
//       setErrors(prev => ({ ...prev, [`team_${index}_${field}`]: '' }));
//     }
//   };

//   const addTeamMember = () => {
//     setFormData(prev => ({
//       ...prev,
//       teamMembers: [...prev.teamMembers, { name: '', contact: '', email: '', designation: '' }]
//     }));
//   };

//   const removeTeamMember = (index) => {
//     if (formData.teamMembers.length > 1) {
//       const newTeamMembers = formData.teamMembers.filter((_, i) => i !== index);
//       setFormData(prev => ({
//         ...prev,
//         teamMembers: newTeamMembers
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Basic validation
//     if (!formData.companyType) newErrors.companyType = 'Company type is required';
//     if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
//     if (!formData.registeredAddress.trim()) newErrors.registeredAddress = 'Registered address is required';
//     if (!formData.officeNumber.trim()) newErrors.officeNumber = 'Office number is required';

//     // Document validation based on company type
//     if (formData.companyType === 'international') {
//       if (!formData.tradeLicense) newErrors.tradeLicense = 'Trade License/Legal document is required';
//       if (!formData.importExportCertificate) newErrors.importExportCertificate = 'Import/Export certificate is required';
//     } else if (formData.companyType === 'indian') {
//       if (!formData.gstPanIec) newErrors.gstPanIec = 'GST/PAN/IEC document is required';
//     }

//     // Billing details validation
//     if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
//     if (!formData.ifscCode.trim()) newErrors.ifscCode = 'IFSC code is required';
//     if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
//     if (formData.companyType === 'international' && !formData.swiftCode.trim()) {
//       newErrors.swiftCode = 'SWIFT code is required for international companies';
//     }

//     // Authorized Representative validation
//     if (!formData.repName.trim()) newErrors.repName = 'Representative name is required';
//     if (!formData.repContact.trim()) {
//       newErrors.repContact = 'Representative contact is required';
//     } else if (!/^\d{7,15}$/.test(formData.repContact)) {
//       newErrors.repContact = 'Please enter a valid contact number';
//     }
//     if (!formData.repEmail.trim()) {
//       newErrors.repEmail = 'Representative email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.repEmail)) {
//       newErrors.repEmail = 'Please enter a valid email address';
//     }
//     if (!formData.repGovernmentId) {
//       newErrors.repGovernmentId = 'Representative government ID is required';
//     }

//     // Team members validation (if they chose to add team members)
//     if (formData.addTeamMembers) {
//       formData.teamMembers.forEach((member, index) => {
//         if (!member.name.trim()) {
//           newErrors[`team_${index}_name`] = 'Team member name is required';
//         }
//         if (!member.contact.trim()) {
//           newErrors[`team_${index}_contact`] = 'Team member contact is required';
//         } else if (!/^\d{7,15}$/.test(member.contact)) {
//           newErrors[`team_${index}_contact`] = 'Please enter a valid contact number';
//         }
//         if (!member.email.trim()) {
//           newErrors[`team_${index}_email`] = 'Team member email is required';
//         } else if (!/\S+@\S+\.\S+/.test(member.email)) {
//           newErrors[`team_${index}_email`] = 'Please enter a valid email address';
//         }
//         if (!member.designation.trim()) {
//           newErrors[`team_${index}_designation`] = 'Team member designation is required';
//         }
//       });
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       const userData = {
//         ...formData,
//         role: 'inspection_company',
//         id: Date.now()
//       };
      
//       console.log('Inspection Company signup submitted:', userData);
      
//       if (onSuccess) {
//         onSuccess(userData);
//       } else {
//         alert('Inspection Company signup successful!');
//       }
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="text-center mb-8">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
//           <Building2 className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-3xl font-bold text-gray-900 mb-2">Inspection Company Signup</h2>
//         <p className="text-gray-600">Register your inspection company to manage contracts and inspectors</p>
//       </div>

//       <div className="space-y-6">
//         {/* Company Type Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-3">Company Type</label>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <button
//               type="button"
//               onClick={() => setFormData(prev => ({ ...prev, companyType: 'international' }))}
//               className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
//                 formData.companyType === 'international'
//                   ? 'border-gray-700 bg-gray-100 text-gray-900'
//                   : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
//               }`}
//             >
//               <div className="flex items-center space-x-3">
//                 <Globe className="h-6 w-6" />
//                 <div>
//                   <div className="font-semibold">International Company</div>
//                   <div className="text-sm opacity-75">For global inspection services</div>
//                 </div>
//               </div>
//             </button>
            
//             <button
//               type="button"
//               onClick={() => setFormData(prev => ({ ...prev, companyType: 'indian' }))}
//               className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
//                 formData.companyType === 'indian'
//                   ? 'border-gray-700 bg-gray-100 text-gray-900'
//                   : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
//               }`}
//             >
//               <div className="flex items-center space-x-3">
//                 <span className="text-2xl">🇮🇳</span>
//                 <div>
//                   <div className="font-semibold">Indian Company</div>
//                   <div className="text-sm opacity-75">For domestic inspection services</div>
//                 </div>
//               </div>
//             </button>
//           </div>
//           {errors.companyType && (
//             <p className="mt-1 text-sm text-red-600">{errors.companyType}</p>
//           )}
//         </div>

//         {formData.companyType && (
//           <>
//             {/* Company Information */}
//             <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Company Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <Building2 className="inline w-4 h-4 mr-2" />
//                     Company Name
//                   </label>
//                   <input
//                     type="text"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleInputChange}
//                     placeholder="Enter company name"
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                       errors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.companyName && (
//                     <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
//                   )}
//                 </div>

//                 {/* Office Number */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <Phone className="inline w-4 h-4 mr-2" />
//                     Office Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="officeNumber"
//                     value={formData.officeNumber}
//                     onChange={handleInputChange}
//                     placeholder="Enter office number"
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                       errors.officeNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.officeNumber && (
//                     <p className="mt-1 text-sm text-red-600">{errors.officeNumber}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Registered Address */}
//               <div className="mt-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <MapPin className="inline w-4 h-4 mr-2" />
//                   Registered Address
//                 </label>
//                 <textarea
//                   name="registeredAddress"
//                   value={formData.registeredAddress}
//                   onChange={handleInputChange}
//                   placeholder="Enter complete registered address"
//                   rows={3}
//                   className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                     errors.registeredAddress ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.registeredAddress && (
//                   <p className="mt-1 text-sm text-red-600">{errors.registeredAddress}</p>
//                 )}
//               </div>
//             </div>

//             {/* Documents Section */}
//             <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
              
//               {formData.companyType === 'international' ? (
//                 <div className="space-y-6">
//                   {/* Trade License */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <FileText className="inline w-4 h-4 mr-2" />
//                       Trade License / Legal Document
//                     </label>
//                     <label className="flex-1 cursor-pointer">
//                       <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-white ${
//                         errors.tradeLicense ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//                       }`}>
//                         <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
//                         <p className="text-sm text-gray-600">
//                           {formData.tradeLicense ? formData.tradeLicense.name : 'Click to upload trade license'}
//                         </p>
//                         <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
//                       </div>
//                       <input
//                         type="file"
//                         accept=".pdf,.jpg,.jpeg,.png"
//                         onChange={(e) => handleFileUpload(e, 'tradeLicense')}
//                         className="hidden"
//                       />
//                     </label>
//                     {errors.tradeLicense && (
//                       <p className="mt-1 text-sm text-red-600">{errors.tradeLicense}</p>
//                     )}
//                   </div>

//                   {/* Import/Export Certificate */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <Award className="inline w-4 h-4 mr-2" />
//                       Import/Export Certificate
//                     </label>
//                     <label className="flex-1 cursor-pointer">
//                       <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-white ${
//                         errors.importExportCertificate ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//                       }`}>
//                         <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
//                         <p className="text-sm text-gray-600">
//                           {formData.importExportCertificate ? formData.importExportCertificate.name : 'Click to upload certificate'}
//                         </p>
//                         <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
//                       </div>
//                       <input
//                         type="file"
//                         accept=".pdf,.jpg,.jpeg,.png"
//                         onChange={(e) => handleFileUpload(e, 'importExportCertificate')}
//                         className="hidden"
//                       />
//                     </label>
//                     {errors.importExportCertificate && (
//                       <p className="mt-1 text-sm text-red-600">{errors.importExportCertificate}</p>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 /* Indian Company Documents */
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <FileText className="inline w-4 h-4 mr-2" />
//                     GST / PAN / IEC Document
//                   </label>
//                   <label className="flex-1 cursor-pointer">
//                     <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-white ${
//                       errors.gstPanIec ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//                     }`}>
//                       <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
//                       <p className="text-sm text-gray-600">
//                         {formData.gstPanIec ? formData.gstPanIec.name : 'Click to upload GST/PAN/IEC document'}
//                       </p>
//                       <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
//                     </div>
//                     <input
//                       type="file"
//                       accept=".pdf,.jpg,.jpeg,.png"
//                       onChange={(e) => handleFileUpload(e, 'gstPanIec')}
//                       className="hidden"
//                     />
//                   </label>
//                   {errors.gstPanIec && (
//                     <p className="mt-1 text-sm text-red-600">{errors.gstPanIec}</p>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Billing Details */}
//             <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 <CreditCard className="inline w-5 h-5 mr-2" />
//                 Billing Details
//               </h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Bank Account Number
//                   </label>
//                   <input
//                     type="text"
//                     name="accountNumber"
//                     value={formData.accountNumber}
//                     onChange={handleInputChange}
//                     placeholder="Enter account number"
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                       errors.accountNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.accountNumber && (
//                     <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Bank Name
//                   </label>
//                   <input
//                     type="text"
//                     name="bankName"
//                     value={formData.bankName}
//                     onChange={handleInputChange}
//                     placeholder="Enter bank name"
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                       errors.bankName ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.bankName && (
//                     <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     IFSC Code
//                   </label>
//                   <input
//                     type="text"
//                     name="ifscCode"
//                     value={formData.ifscCode}
//                     onChange={handleInputChange}
//                     placeholder="Enter IFSC code"
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                       errors.ifscCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.ifscCode && (
//                     <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>
//                   )}
//                 </div>

//                 {formData.companyType === 'international' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       SWIFT Code
//                     </label>
//                     <input
//                       type="text"
//                       name="swiftCode"
//                       value={formData.swiftCode}
//                       onChange={handleInputChange}
//                       placeholder="Enter SWIFT code"
//                       className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                         errors.swiftCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                     />
//                     {errors.swiftCode && (
//                       <p className="mt-1 text-sm text-red-600">{errors.swiftCode}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Authorized Representative */}
//             <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 <User className="inline w-5 h-5 mr-2" />
//                 Authorized Representative (Preferably Director)
//               </h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Representative Name
//                   </label>
//                   <input
//                     type="text"
//                     name="repName"
//                     value={formData.repName}
//                     onChange={handleInputChange}
//                     placeholder="Enter representative name"
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                       errors.repName ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.repName && (
//                     <p className="mt-1 text-sm text-red-600">{errors.repName}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Contact Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="repContact"
//                     value={formData.repContact}
//                     onChange={handleInputChange}
//                     placeholder="Enter contact number"
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                       errors.repContact ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.repContact && (
//                     <p className="mt-1 text-sm text-red-600">{errors.repContact}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="repEmail"
//                     value={formData.repEmail}
//                     onChange={handleInputChange}
//                     placeholder="Enter email address"
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                       errors.repEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.repEmail && (
//                     <p className="mt-1 text-sm text-red-600">{errors.repEmail}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     {formData.companyType === 'indian' 
//                       ? 'Government ID / Aadhaar / PAN / Passport' 
//                       : 'Government ID / Passport'
//                     }
//                   </label>
//                   <label className="cursor-pointer">
//                     <div className={`border-2 border-dashed rounded-lg p-3 text-center transition-colors bg-white ${
//                       errors.repGovernmentId ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//                     }`}>
//                       <Upload className="w-6 h-6 mx-auto text-gray-400 mb-1" />
//                       <p className="text-xs text-gray-600">
//                         {formData.repGovernmentId ? formData.repGovernmentId.name : 'Click to upload ID'}
//                       </p>
//                     </div>
//                     <input
//                       type="file"
//                       accept=".pdf,.jpg,.jpeg,.png"
//                       onChange={(e) => handleFileUpload(e, 'repGovernmentId')}
//                       className="hidden"
//                     />
//                   </label>
//                   {errors.repGovernmentId && (
//                     <p className="mt-1 text-sm text-red-600">{errors.repGovernmentId}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Team Members Section */}
//             <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
//               <div className="flex items-start space-x-3 mb-4">
//                 <input
//                   type="checkbox"
//                   name="addTeamMembers"
//                   checked={formData.addTeamMembers}
//                   onChange={handleInputChange}
//                   className="mt-1 w-5 h-5 text-gray-700 border-2 border-gray-400 rounded focus:ring-gray-500"
//                 />
//                 <div className="flex-1">
//                   <label className="text-sm font-medium text-gray-800 cursor-pointer">
//                     <Users className="inline w-4 h-4 mr-2" />
//                     Add Team Members (Optional)
//                   </label>
//                   <p className="text-xs text-gray-600 mt-1">
//                     Add team members who will be part of your inspection company
//                   </p>
//                 </div>
//               </div>

//               {formData.addTeamMembers && (
//                 <div className="mt-4">
//                   <div className="flex items-center justify-between mb-4">
//                     <h4 className="font-semibold text-gray-900">Team Members</h4>
//                     <button
//                       type="button"
//                       onClick={addTeamMember}
//                       className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors"
//                     >
//                       <Plus className="w-4 h-4" />
//                       <span>Add Member</span>
//                     </button>
//                   </div>

//                   {formData.teamMembers.map((member, index) => (
//                     <div key={index} className="bg-white p-4 rounded-lg mb-4 border-2 border-gray-300">
//                       <div className="flex items-center justify-between mb-3">
//                         <h5 className="font-medium text-gray-900">Team Member {index + 1}</h5>
//                         {formData.teamMembers.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeTeamMember(index)}
//                             className="text-red-600 hover:text-red-800"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         )}
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Name
//                           </label>
//                           <input
//                             type="text"
//                             value={member.name}
//                             onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
//                             placeholder="Enter name"
//                             className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                               errors[`team_${index}_name`] ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                             }`}
//                           />
//                           {errors[`team_${index}_name`] && (
//                             <p className="mt-1 text-xs text-red-600">{errors[`team_${index}_name`]}</p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Contact
//                           </label>
//                           <input
//                             type="tel"
//                             value={member.contact}
//                             onChange={(e) => handleTeamMemberChange(index, 'contact', e.target.value)}
//                             placeholder="Enter contact"
//                             className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                               errors[`team_${index}_contact`] ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                             }`}
//                           />
//                           {errors[`team_${index}_contact`] && (
//                             <p className="mt-1 text-xs text-red-600">{errors[`team_${index}_contact`]}</p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Email
//                           </label>
//                           <input
//                             type="email"
//                             value={member.email}
//                             onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
//                             placeholder="Enter email"
//                             className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                               errors[`team_${index}_email`] ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                             }`}
//                           />
//                           {errors[`team_${index}_email`] && (
//                             <p className="mt-1 text-xs text-red-600">{errors[`team_${index}_email`]}</p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Designation
//                           </label>
//                           <input
//                             type="text"
//                             value={member.designation}
//                             onChange={(e) => handleTeamMemberChange(index, 'designation', e.target.value)}
//                             placeholder="Enter designation"
//                             className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                               errors[`team_${index}_designation`] ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                             }`}
//                           />
//                           {errors[`team_${index}_designation`] && (
//                             <p className="mt-1 text-xs text-red-600">{errors[`team_${index}_designation`]}</p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="pt-6">
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:ring-4 focus:ring-gray-300 focus:outline-none transform hover:scale-105"
//               >
//                 Create Inspection Company Account
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InspectionCompanySignup;



import React, { useState } from 'react';
import { Upload, Building2, Mail, Phone, Globe, FileText, Award, MapPin, CreditCard, Plus, X, User, Users, Lock, Eye, EyeOff } from 'lucide-react';

const InspectionCompanySignup = ({ onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    companyType: '',
    companyName: '',
    registeredAddress: '',
    officeNumber: '',
    tradeLicense: null,
    importExportCertificate: null,
    gstPanIec: null,
    accountNumber: '',
    ifscCode: '',
    swiftCode: '',
    bankName: '',
    // Authorized Representative
    repName: '',
    repContact: '',
    repEmail: '',
    repPassword: '',
    repGovernmentId: null,
    // Team Members
    teamMembers: [{ name: '', contact: '', email: '', designation: '' }],
    addTeamMembers: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));
      
      // Clear error when file is uploaded
      if (errors[fieldName]) {
        setErrors(prev => ({ ...prev, [fieldName]: '' }));
      }
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newTeamMembers = [...formData.teamMembers];
    newTeamMembers[index][field] = value;
    setFormData(prev => ({
      ...prev,
      teamMembers: newTeamMembers
    }));

    // Clear team member errors
    if (errors[`team_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`team_${index}_${field}`]: '' }));
    }
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', contact: '', email: '', designation: '' }]
    }));
  };

  const removeTeamMember = (index) => {
    if (formData.teamMembers.length > 1) {
      const newTeamMembers = formData.teamMembers.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        teamMembers: newTeamMembers
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.companyType) newErrors.companyType = 'Company type is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.registeredAddress.trim()) newErrors.registeredAddress = 'Registered address is required';
    if (!formData.officeNumber.trim()) newErrors.officeNumber = 'Office number is required';

    // Document validation based on company type
    if (formData.companyType === 'international') {
      if (!formData.tradeLicense) newErrors.tradeLicense = 'Trade License/Legal document is required';
      if (!formData.importExportCertificate) newErrors.importExportCertificate = 'Import/Export certificate is required';
    } else if (formData.companyType === 'indian') {
      if (!formData.gstPanIec) newErrors.gstPanIec = 'GST/PAN/IEC document is required';
    }

    // Billing details validation
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
    if (!formData.ifscCode.trim()) newErrors.ifscCode = 'IFSC code is required';
    if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
    if (formData.companyType === 'international' && !formData.swiftCode.trim()) {
      newErrors.swiftCode = 'SWIFT code is required for international companies';
    }

    // Authorized Representative validation
    if (!formData.repName.trim()) newErrors.repName = 'Representative name is required';
    if (!formData.repContact.trim()) {
      newErrors.repContact = 'Representative contact is required';
    } else if (!/^\d{7,15}$/.test(formData.repContact)) {
      newErrors.repContact = 'Please enter a valid contact number';
    }
    if (!formData.repEmail.trim()) {
      newErrors.repEmail = 'Representative email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.repEmail)) {
      newErrors.repEmail = 'Please enter a valid email address';
    }
    if (!formData.repPassword.trim()) {
      newErrors.repPassword = 'Representative password is required';
    } else {
      const passwordErrors = [];
      if (formData.repPassword.length < 8) {
        passwordErrors.push('at least 8 characters');
      }
      if (!/(?=.*[a-z])/.test(formData.repPassword)) {
        passwordErrors.push('one lowercase letter');
      }
      if (!/(?=.*[A-Z])/.test(formData.repPassword)) {
        passwordErrors.push('one uppercase letter');
      }
      if (!/(?=.*\d)/.test(formData.repPassword)) {
        passwordErrors.push('one number');
      }
      if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.repPassword)) {
        passwordErrors.push('one special character');
      }
      
      if (passwordErrors.length > 0) {
        newErrors.repPassword = `Password must contain ${passwordErrors.join(', ')}`;
      }
    }
    if (!formData.repGovernmentId) {
      newErrors.repGovernmentId = 'Representative government ID is required';
    }

    // Team members validation (if they chose to add team members)
    if (formData.addTeamMembers) {
      formData.teamMembers.forEach((member, index) => {
        if (!member.name.trim()) {
          newErrors[`team_${index}_name`] = 'Team member name is required';
        }
        if (!member.contact.trim()) {
          newErrors[`team_${index}_contact`] = 'Team member contact is required';
        } else if (!/^\d{7,15}$/.test(member.contact)) {
          newErrors[`team_${index}_contact`] = 'Please enter a valid contact number';
        }
        if (!member.email.trim()) {
          newErrors[`team_${index}_email`] = 'Team member email is required';
        } else if (!/\S+@\S+\.\S+/.test(member.email)) {
          newErrors[`team_${index}_email`] = 'Please enter a valid email address';
        }
        if (!member.designation.trim()) {
          newErrors[`team_${index}_designation`] = 'Team member designation is required';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const userData = {
        ...formData,
        role: 'inspection_company',
        id: Date.now()
      };
      
      console.log('Inspection Company signup submitted:', userData);
      
      if (onSuccess) {
        onSuccess(userData);
      } else {
        alert('Inspection Company signup successful!');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Inspection Company Signup</h2>
        <p className="text-gray-600">Register your inspection company to manage contracts and inspectors</p>
      </div>

      <div className="space-y-6">
        {/* Company Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Company Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, companyType: 'international' }))}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                formData.companyType === 'international'
                  ? 'border-gray-700 bg-gray-100 text-gray-900'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Globe className="h-6 w-6" />
                <div>
                  <div className="font-semibold">International Company</div>
                  <div className="text-sm opacity-75">For global inspection services</div>
                </div>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, companyType: 'indian' }))}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                formData.companyType === 'indian'
                  ? 'border-gray-700 bg-gray-100 text-gray-900'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🇮🇳</span>
                <div>
                  <div className="font-semibold">Indian Company</div>
                  <div className="text-sm opacity-75">For domestic inspection services</div>
                </div>
              </div>
            </button>
          </div>
          {errors.companyType && (
            <p className="mt-1 text-sm text-red-600">{errors.companyType}</p>
          )}
        </div>

        {formData.companyType && (
          <>
            {/* Company Information */}
            <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building2 className="inline w-4 h-4 mr-2" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                      errors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                  )}
                </div>

                {/* Office Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />
                    Office Number
                  </label>
                  <input
                    type="tel"
                    name="officeNumber"
                    value={formData.officeNumber}
                    onChange={handleInputChange}
                    placeholder="Enter office number"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                      errors.officeNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.officeNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.officeNumber}</p>
                  )}
                </div>
              </div>

              {/* Registered Address */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Registered Address
                </label>
                <textarea
                  name="registeredAddress"
                  value={formData.registeredAddress}
                  onChange={handleInputChange}
                  placeholder="Enter complete registered address"
                  rows={3}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                    errors.registeredAddress ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.registeredAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.registeredAddress}</p>
                )}
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
              
              {formData.companyType === 'international' ? (
                <div className="space-y-6">
                  {/* Trade License */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText className="inline w-4 h-4 mr-2" />
                      Trade License / Legal Document
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-white ${
                        errors.tradeLicense ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          {formData.tradeLicense ? formData.tradeLicense.name : 'Click to upload trade license'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e, 'tradeLicense')}
                        className="hidden"
                      />
                    </label>
                    {errors.tradeLicense && (
                      <p className="mt-1 text-sm text-red-600">{errors.tradeLicense}</p>
                    )}
                  </div>

                  {/* Import/Export Certificate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Award className="inline w-4 h-4 mr-2" />
                      Import/Export Certificate
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-white ${
                        errors.importExportCertificate ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          {formData.importExportCertificate ? formData.importExportCertificate.name : 'Click to upload certificate'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e, 'importExportCertificate')}
                        className="hidden"
                      />
                    </label>
                    {errors.importExportCertificate && (
                      <p className="mt-1 text-sm text-red-600">{errors.importExportCertificate}</p>
                    )}
                  </div>
                </div>
              ) : (
                /* Indian Company Documents */
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="inline w-4 h-4 mr-2" />
                    GST / PAN / IEC Document
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-white ${
                      errors.gstPanIec ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {formData.gstPanIec ? formData.gstPanIec.name : 'Click to upload GST/PAN/IEC document'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, 'gstPanIec')}
                      className="hidden"
                    />
                  </label>
                  {errors.gstPanIec && (
                    <p className="mt-1 text-sm text-red-600">{errors.gstPanIec}</p>
                  )}
                </div>
              )}
            </div>

            {/* Billing Details */}
            <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <CreditCard className="inline w-5 h-5 mr-2" />
                Billing Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    placeholder="Enter account number"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                      errors.accountNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.accountNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    placeholder="Enter bank name"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                      errors.bankName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.bankName && (
                    <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    placeholder="Enter IFSC code"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                      errors.ifscCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.ifscCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>
                  )}
                </div>

                {formData.companyType === 'international' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SWIFT Code
                    </label>
                    <input
                      type="text"
                      name="swiftCode"
                      value={formData.swiftCode}
                      onChange={handleInputChange}
                      placeholder="Enter SWIFT code"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                        errors.swiftCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.swiftCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.swiftCode}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Authorized Representative */}
            <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <User className="inline w-5 h-5 mr-2" />
                Authorized Representative (Preferably Director)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Representative Name
                  </label>
                  <input
                    type="text"
                    name="repName"
                    value={formData.repName}
                    onChange={handleInputChange}
                    placeholder="Enter representative name"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                      errors.repName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.repName && (
                    <p className="mt-1 text-sm text-red-600">{errors.repName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="repContact"
                    value={formData.repContact}
                    onChange={handleInputChange}
                    placeholder="Enter contact number"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                      errors.repContact ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.repContact && (
                    <p className="mt-1 text-sm text-red-600">{errors.repContact}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="repEmail"
                    value={formData.repEmail}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                      errors.repEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.repEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.repEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="inline w-4 h-4 mr-2" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="repPassword"
                      value={formData.repPassword}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                        errors.repPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.repPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.repPassword}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.companyType === 'indian' 
                    ? 'Government ID / Aadhaar / PAN / Passport' 
                    : 'Government ID / Passport'
                  }
                </label>
                <label className="cursor-pointer">
                  <div className={`border-2 border-dashed rounded-lg p-3 text-center transition-colors bg-white ${
                    errors.repGovernmentId ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <Upload className="w-6 h-6 mx-auto text-gray-400 mb-1" />
                    <p className="text-xs text-gray-600">
                      {formData.repGovernmentId ? formData.repGovernmentId.name : 'Click to upload ID'}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'repGovernmentId')}
                    className="hidden"
                  />
                </label>
                {errors.repGovernmentId && (
                  <p className="mt-1 text-sm text-red-600">{errors.repGovernmentId}</p>
                )}
              </div>
            </div>

            {/* Team Members Section */}
            <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
              <div className="flex items-start space-x-3 mb-4">
                <input
                  type="checkbox"
                  name="addTeamMembers"
                  checked={formData.addTeamMembers}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 text-gray-700 border-2 border-gray-400 rounded focus:ring-gray-500"
                />
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-800 cursor-pointer">
                    <Users className="inline w-4 h-4 mr-2" />
                    Add Team Members (Optional)
                  </label>
                  <p className="text-xs text-gray-600 mt-1">
                    Add team members who will be part of your inspection company
                  </p>
                </div>
              </div>

              {formData.addTeamMembers && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Team Members</h4>
                    <button
                      type="button"
                      onClick={addTeamMember}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Member</span>
                    </button>
                  </div>

                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg mb-4 border-2 border-gray-300">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-gray-900">Team Member {index + 1}</h5>
                        {formData.teamMembers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTeamMember(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                            placeholder="Enter name"
                            className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                              errors[`team_${index}_name`] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                          />
                          {errors[`team_${index}_name`] && (
                            <p className="mt-1 text-xs text-red-600">{errors[`team_${index}_name`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact
                          </label>
                          <input
                            type="tel"
                            value={member.contact}
                            onChange={(e) => handleTeamMemberChange(index, 'contact', e.target.value)}
                            placeholder="Enter contact"
                            className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                              errors[`team_${index}_contact`] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                          />
                          {errors[`team_${index}_contact`] && (
                            <p className="mt-1 text-xs text-red-600">{errors[`team_${index}_contact`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={member.email}
                            onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                            placeholder="Enter email"
                            className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                              errors[`team_${index}_email`] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                          />
                          {errors[`team_${index}_email`] && (
                            <p className="mt-1 text-xs text-red-600">{errors[`team_${index}_email`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Designation
                          </label>
                          <input
                            type="text"
                            value={member.designation}
                            onChange={(e) => handleTeamMemberChange(index, 'designation', e.target.value)}
                            placeholder="Enter designation"
                            className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                              errors[`team_${index}_designation`] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                          />
                          {errors[`team_${index}_designation`] && (
                            <p className="mt-1 text-xs text-red-600">{errors[`team_${index}_designation`]}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:ring-4 focus:ring-gray-300 focus:outline-none transform hover:scale-105"
              >
                Create Inspection Company Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InspectionCompanySignup;