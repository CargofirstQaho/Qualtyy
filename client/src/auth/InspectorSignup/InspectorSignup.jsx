
// import React, { useState } from 'react';
// import { Upload, User, Mail, Phone, Globe, FileText, Award, MapPin, Briefcase, CreditCard, Plus, X } from 'lucide-react';

// const InspectorSignup = ({ onSuccess, onBack }) => {
//   const [formData, setFormData] = useState({
//     inspectorType: '',
//     countryCode: '',
//     name: '',
//     email: '',
//     mobile: '',
//     address: '',
//     commodities: [{ name: '', experience: '' }],
//     createAccount: false,
//     governmentId: null,
//     accountNumber: '',
//     bankName: '',
//     ifscCode: ''
//   });

//   const [errors, setErrors] = useState({});

//   const countryCodes = [
//     { code: '+1', country: 'United States', flag: '🇺🇸' },
//     { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
//     { code: '+91', country: 'India', flag: '🇮🇳' },
//     { code: '+86', country: 'China', flag: '🇨🇳' },
//     { code: '+49', country: 'Germany', flag: '🇩🇪' },
//     { code: '+33', country: 'France', flag: '🇫🇷' },
//     { code: '+81', country: 'Japan', flag: '🇯🇵' },
//     { code: '+971', country: 'UAE', flag: '🇦🇪' },
//     { code: '+65', country: 'Singapore', flag: '🇸🇬' },
//     { code: '+61', country: 'Australia', flag: '🇦🇺' }
//   ];

//   const commodityOptions = [
//     'Textiles & Garments',
//     'Electronics & Electrical',
//     'Automotive Parts',
//     'Food & Beverages',
//     'Pharmaceuticals',
//     'Chemicals',
//     'Machinery & Equipment',
//     'Furniture & Wood Products',
//     'Metals & Alloys',
//     'Plastics & Rubber',
//     'Agricultural Products',
//     'Jewelry & Accessories',
//     'Toys & Games',
//     'Cosmetics & Personal Care',
//     'Sports Equipment',
//     'Other'
//   ];

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

//   const handleCommodityChange = (index, field, value) => {
//     const newCommodities = [...formData.commodities];
//     newCommodities[index][field] = value;
//     setFormData(prev => ({
//       ...prev,
//       commodities: newCommodities
//     }));

//     // Clear commodity errors
//     if (errors[`commodity_${index}_${field}`]) {
//       setErrors(prev => ({ ...prev, [`commodity_${index}_${field}`]: '' }));
//     }
//   };

//   const addCommodity = () => {
//     setFormData(prev => ({
//       ...prev,
//       commodities: [...prev.commodities, { name: '', experience: '' }]
//     }));
//   };

//   const removeCommodity = (index) => {
//     if (formData.commodities.length > 1) {
//       const newCommodities = formData.commodities.filter((_, i) => i !== index);
//       setFormData(prev => ({
//         ...prev,
//         commodities: newCommodities
//       }));
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

//   const validateForm = () => {
//     const newErrors = {};

//     // Basic validation
//     if (!formData.inspectorType) newErrors.inspectorType = 'Inspector type is required';
//     if (!formData.countryCode) newErrors.countryCode = 'Country code is required';
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
//     if (!formData.mobile.trim()) {
//       newErrors.mobile = 'Mobile number is required';
//     } else if (!/^\d{7,15}$/.test(formData.mobile)) {
//       newErrors.mobile = 'Please enter a valid mobile number';
//     }
//     if (!formData.address.trim()) newErrors.address = 'Address is required';

//     // Commodity validation
//     formData.commodities.forEach((commodity, index) => {
//       if (!commodity.name.trim()) {
//         newErrors[`commodity_${index}_name`] = 'Commodity name is required';
//       }
//       if (!commodity.experience.trim()) {
//         newErrors[`commodity_${index}_experience`] = 'Experience is required';
//       } else if (isNaN(commodity.experience) || commodity.experience < 0) {
//         newErrors[`commodity_${index}_experience`] = 'Please enter valid years of experience';
//       }
//     });

//     // Additional information validation (if user wants to create account)
//     if (formData.createAccount) {
//       if (!formData.governmentId) {
//         newErrors.governmentId = formData.inspectorType === 'indian' 
//           ? 'Aadhaar card is required to create account'
//           : 'Government ID/Passport is required to create account';
//       }
//       if (!formData.accountNumber.trim()) {
//         newErrors.accountNumber = 'Account number is required to create account';
//       }
//       if (!formData.bankName.trim()) {
//         newErrors.bankName = 'Bank name is required to create account';
//       }
//       if (formData.inspectorType === 'indian' && !formData.ifscCode.trim()) {
//         newErrors.ifscCode = 'IFSC code is required for Indian inspectors';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       const userData = {
//         ...formData,
//         role: 'inspector',
//         id: Date.now()
//       };
      
//       console.log('Inspector signup submitted:', userData);
      
//       if (onSuccess) {
//         onSuccess(userData);
//       } else {
//         alert('Inspector signup successful!');
//       }
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <div className="text-center mb-8">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
//           <Award className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-3xl font-bold text-gray-900 mb-2">Inspector Signup</h2>
//         <p className="text-gray-600">Join our platform as a professional inspector</p>
//       </div>

//       <div className="space-y-6">
//         {/* Inspector Type Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-3">Inspector Type</label>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <button
//               type="button"
//               onClick={() => setFormData(prev => ({ ...prev, inspectorType: 'international' }))}
//               className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
//                 formData.inspectorType === 'international'
//                   ? 'border-gray-700 bg-gray-100 text-gray-900'
//                   : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
//               }`}
//             >
//               <div className="flex items-center space-x-3">
//                 <Globe className="h-6 w-6" />
//                 <div>
//                   <div className="font-semibold">International Inspector</div>
//                   <div className="text-sm opacity-75">For global inspection services</div>
//                 </div>
//               </div>
//             </button>
            
//             <button
//               type="button"
//               onClick={() => setFormData(prev => ({ ...prev, inspectorType: 'indian' }))}
//               className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
//                 formData.inspectorType === 'indian'
//                   ? 'border-gray-700 bg-gray-100 text-gray-900'
//                   : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
//               }`}
//             >
//               <div className="flex items-center space-x-3">
//                 <span className="text-2xl">🇮🇳</span>
//                 <div>
//                   <div className="font-semibold">Indian Inspector</div>
//                   <div className="text-sm opacity-75">For domestic inspection services</div>
//                 </div>
//               </div>
//             </button>
//           </div>
//           {errors.inspectorType && (
//             <p className="mt-1 text-sm text-red-600">{errors.inspectorType}</p>
//           )}
//         </div>

//         {formData.inspectorType && (
//           <>
//             {/* Basic Information */}
//             <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Country Code */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <Globe className="inline w-4 h-4 mr-2" />
//                     Country Code
//                   </label>
//                   <select
//                     name="countryCode"
//                     value={formData.countryCode}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                       errors.countryCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                     }`}
//                   >
//                     <option value="">Select Country Code</option>
//                     {countryCodes.map((country) => (
//                       <option key={country.code} value={country.code}>
//                         {country.flag} {country.code} - {country.country}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.countryCode && (
//                     <p className="mt-1 text-sm text-red-600">{errors.countryCode}</p>
//                   )}
//                 </div>

//                 {/* Full Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <User className="inline w-4 h-4 mr-2" />
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter your full name"
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                       errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.name && (
//                     <p className="mt-1 text-sm text-red-600">{errors.name}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <Mail className="inline w-4 h-4 mr-2" />
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Enter your email address"
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                       errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                     }`}
//                   />
//                   {errors.email && (
//                     <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//                   )}
//                 </div>

//                 {/* Mobile Number */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <Phone className="inline w-4 h-4 mr-2" />
//                     Mobile Number
//                   </label>
//                   <div className="flex">
//                     <div className="flex items-center px-3 py-3 bg-gray-200 border-2 border-r-0 border-gray-300 rounded-l-lg">
//                       <span className="text-gray-700 font-medium">
//                         {formData.countryCode || '+__'}
//                       </span>
//                     </div>
//                     <input
//                       type="tel"
//                       name="mobile"
//                       value={formData.mobile}
//                       onChange={handleInputChange}
//                       placeholder="Enter mobile number"
//                       className={`flex-1 px-4 py-3 border-2 rounded-r-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                         errors.mobile ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                     />
//                   </div>
//                   {errors.mobile && (
//                     <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
//                   )}
//                 </div>
//               </div>

              

//               {/* Address */}
//               <div className="mt-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <MapPin className="inline w-4 h-4 mr-2" />
//                   Address
//                 </label>
//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   placeholder="Enter your complete address"
//                   rows={3}
//                   className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                     errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                   }`}
//                 />
//                 {errors.address && (
//                   <p className="mt-1 text-sm text-red-600">{errors.address}</p>
//                 )}
//               </div>
//             </div>

//             {/* Commodities Section */}
//             <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   <Briefcase className="inline w-5 h-5 mr-2" />
//                   Commodities & Experience
//                 </h3>
//                 <button
//                   type="button"
//                   onClick={addCommodity}
//                   className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors"
//                 >
//                   <Plus className="w-4 h-4" />
//                   <span>Add Commodity</span>
//                 </button>
//               </div>

//               {formData.commodities.map((commodity, index) => (
//                 <div key={index} className="bg-white p-4 rounded-lg mb-4 border-2 border-gray-300">
//                   <div className="flex items-center justify-between mb-3">
//                     <h4 className="font-medium text-gray-900">Commodity {index + 1}</h4>
//                     {formData.commodities.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeCommodity(index)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Commodity Name
//                       </label>
//                       <select
//                         value={commodity.name}
//                         onChange={(e) => handleCommodityChange(index, 'name', e.target.value)}
//                         className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                           errors[`commodity_${index}_name`] ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                         }`}
//                       >
//                         <option value="">Select Commodity</option>
//                         {commodityOptions.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                       {errors[`commodity_${index}_name`] && (
//                         <p className="mt-1 text-sm text-red-600">{errors[`commodity_${index}_name`]}</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Experience (Years)
//                       </label>
//                       <input
//                         type="number"
//                         value={commodity.experience}
//                         onChange={(e) => handleCommodityChange(index, 'experience', e.target.value)}
//                         placeholder="Years of experience"
//                         min="0"
//                         max="50"
//                         className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                           errors[`commodity_${index}_experience`] ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                         }`}
//                       />
//                       {errors[`commodity_${index}_experience`] && (
//                         <p className="mt-1 text-sm text-red-600">{errors[`commodity_${index}_experience`]}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Create Account Option */}
//             <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
//               <div className="flex items-start space-x-3">
//                 <input
//                   type="checkbox"
//                   name="createAccount"
//                   checked={formData.createAccount}
//                   onChange={handleInputChange}
//                   className="mt-1 w-5 h-5 text-gray-700 border-2 border-gray-400 rounded focus:ring-gray-500"
//                 />
//                 <div className="flex-1">
//                   <label className="text-sm font-medium text-gray-800 cursor-pointer">
//                     I want to create an account and start accepting inspection requests
//                   </label>
//                   <p className="text-xs text-gray-600 mt-1">
//                     Check this option to provide additional information and activate your inspector account
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Additional Information (shown only if create account is checked) */}
//             {formData.createAccount && (
//               <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Additional Information Required
//                 </h3>
//                 <p className="text-sm text-gray-700 mb-4">
//                   To create an account and start accepting requests, please provide the following:
//                 </p>

//                 {/* Government ID */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <FileText className="inline w-4 h-4 mr-2" />
//                     {formData.inspectorType === 'indian' ? 'Aadhaar Card' : 'Government ID / Passport'}
//                   </label>
//                   <div className="flex items-center space-x-4">
//                     <label className="flex-1 cursor-pointer">
//                       <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-white ${
//                         errors.governmentId ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//                       }`}>
//                         <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
//                         <p className="text-sm text-gray-600">
//                           {formData.governmentId 
//                             ? formData.governmentId.name 
//                             : `Click to upload ${formData.inspectorType === 'indian' ? 'Aadhaar card' : 'Government ID/Passport'}`
//                           }
//                         </p>
//                         <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
//                       </div>
//                       <input
//                         type="file"
//                         accept=".pdf,.jpg,.jpeg,.png"
//                         onChange={(e) => handleFileUpload(e, 'governmentId')}
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   {errors.governmentId && (
//                     <p className="mt-1 text-sm text-red-600">{errors.governmentId}</p>
//                   )}
//                 </div>

//                 {/* Billing Details */}
//                 <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
//                   <h4 className="font-semibold text-gray-900 mb-4">
//                     <CreditCard className="inline w-4 h-4 mr-2" />
//                     Billing Details
//                   </h4>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Bank Account Number
//                       </label>
//                       <input
//                         type="text"
//                         name="accountNumber"
//                         value={formData.accountNumber}
//                         onChange={handleInputChange}
//                         placeholder="Enter account number"
//                         className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                           errors.accountNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                         }`}
//                       />
//                       {errors.accountNumber && (
//                         <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Bank Name
//                       </label>
//                       <input
//                         type="text"
//                         name="bankName"
//                         value={formData.bankName}
//                         onChange={handleInputChange}
//                         placeholder="Enter bank name"
//                         className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                           errors.bankName ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                         }`}
//                       />
//                       {errors.bankName && (
//                         <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
//                       )}
//                     </div>
//                   </div>

//                   {formData.inspectorType === 'indian' && (
//                     <div className="mt-4">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         IFSC Code
//                       </label>
//                       <input
//                         type="text"
//                         name="ifscCode"
//                         value={formData.ifscCode}
//                         onChange={handleInputChange}
//                         placeholder="Enter IFSC code"
//                         className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                           errors.ifscCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                         }`}
//                       />
//                       {errors.ifscCode && (
//                         <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="pt-6">
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:ring-4 focus:ring-gray-300 focus:outline-none transform hover:scale-105"
//               >
//                 Create Inspector Account
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InspectorSignup;


import React, { useState } from 'react';
import { Upload, User, Mail, Phone, Globe, FileText, Award, MapPin, Briefcase, CreditCard, Plus, X, Lock, Eye, EyeOff } from 'lucide-react';

const InspectorSignup = ({ onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    inspectorType: '',
    countryCode: '',
    name: '',
    email: '',
    password: '',
    mobile: '',
    address: '',
    commodities: [{ name: '', experience: '' }],
    createAccount: false,
    governmentId: null,
    accountNumber: '',
    bankName: '',
    ifscCode: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const countryCodes = [
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' }
  ];

  const commodityOptions = [
    'Textiles & Garments',
    'Electronics & Electrical',
    'Automotive Parts',
    'Food & Beverages',
    'Pharmaceuticals',
    'Chemicals',
    'Machinery & Equipment',
    'Furniture & Wood Products',
    'Metals & Alloys',
    'Plastics & Rubber',
    'Agricultural Products',
    'Jewelry & Accessories',
    'Toys & Games',
    'Cosmetics & Personal Care',
    'Sports Equipment',
    'Other'
  ];

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

  const handleCommodityChange = (index, field, value) => {
    const newCommodities = [...formData.commodities];
    newCommodities[index][field] = value;
    setFormData(prev => ({
      ...prev,
      commodities: newCommodities
    }));

    // Clear commodity errors
    if (errors[`commodity_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`commodity_${index}_${field}`]: '' }));
    }
  };

  const addCommodity = () => {
    setFormData(prev => ({
      ...prev,
      commodities: [...prev.commodities, { name: '', experience: '' }]
    }));
  };

  const removeCommodity = (index) => {
    if (formData.commodities.length > 1) {
      const newCommodities = formData.commodities.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        commodities: newCommodities
      }));
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

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.inspectorType) newErrors.inspectorType = 'Inspector type is required';
    if (!formData.countryCode) newErrors.countryCode = 'Country code is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else {
      const passwordErrors = [];
      if (formData.password.length < 8) {
        passwordErrors.push('at least 8 characters');
      }
      if (!/(?=.*[a-z])/.test(formData.password)) {
        passwordErrors.push('one lowercase letter');
      }
      if (!/(?=.*[A-Z])/.test(formData.password)) {
        passwordErrors.push('one uppercase letter');
      }
      if (!/(?=.*\d)/.test(formData.password)) {
        passwordErrors.push('one number');
      }
      if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.password)) {
        passwordErrors.push('one special character');
      }
      
      if (passwordErrors.length > 0) {
        newErrors.password = `Password must contain ${passwordErrors.join(', ')}`;
      }
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{7,15}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    // Commodity validation
    formData.commodities.forEach((commodity, index) => {
      if (!commodity.name.trim()) {
        newErrors[`commodity_${index}_name`] = 'Commodity name is required';
      }
      if (!commodity.experience.trim()) {
        newErrors[`commodity_${index}_experience`] = 'Experience is required';
      } else if (isNaN(commodity.experience) || commodity.experience < 0) {
        newErrors[`commodity_${index}_experience`] = 'Please enter valid years of experience';
      }
    });

    // Additional information validation (if user wants to create account)
    if (formData.createAccount) {
      if (!formData.governmentId) {
        newErrors.governmentId = formData.inspectorType === 'indian' 
          ? 'Aadhaar card is required to create account'
          : 'Government ID/Passport is required to create account';
      }
      if (!formData.accountNumber.trim()) {
        newErrors.accountNumber = 'Account number is required to create account';
      }
      if (!formData.bankName.trim()) {
        newErrors.bankName = 'Bank name is required to create account';
      }
      if (formData.inspectorType === 'indian' && !formData.ifscCode.trim()) {
        newErrors.ifscCode = 'IFSC code is required for Indian inspectors';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const userData = {
        ...formData,
        role: 'inspector',
        id: Date.now()
      };
      
      console.log('Inspector signup submitted:', userData);
      
      if (onSuccess) {
        onSuccess(userData);
      } else {
        alert('Inspector signup successful!');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Inspector Signup</h2>
        <p className="text-gray-600">Join our platform as a professional inspector</p>
      </div>

      <div className="space-y-6">
        {/* Inspector Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Inspector Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, inspectorType: 'international' }))}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                formData.inspectorType === 'international'
                  ? 'border-gray-700 bg-gray-100 text-gray-900'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Globe className="h-6 w-6" />
                <div>
                  <div className="font-semibold">International Inspector</div>
                  <div className="text-sm opacity-75">For global inspection services</div>
                </div>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, inspectorType: 'indian' }))}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                formData.inspectorType === 'indian'
                  ? 'border-gray-700 bg-gray-100 text-gray-900'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🇮🇳</span>
                <div>
                  <div className="font-semibold">Indian Inspector</div>
                  <div className="text-sm opacity-75">For domestic inspection services</div>
                </div>
              </div>
            </button>
          </div>
          {errors.inspectorType && (
            <p className="mt-1 text-sm text-red-600">{errors.inspectorType}</p>
          )}
        </div>

        {formData.inspectorType && (
          <>
            {/* Basic Information */}
            <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Country Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="inline w-4 h-4 mr-2" />
                    Country Code
                  </label>
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                      errors.countryCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Country Code</option>
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code} - {country.country}
                      </option>
                    ))}
                  </select>
                  {errors.countryCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.countryCode}</p>
                  )}
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="inline w-4 h-4 mr-2" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                        errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
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
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />
                    Mobile Number
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-3 py-3 bg-gray-200 border-2 border-r-0 border-gray-300 rounded-l-lg">
                      <span className="text-gray-700 font-medium">
                        {formData.countryCode || '+__'}
                      </span>
                    </div>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Enter mobile number"
                      className={`flex-1 px-4 py-3 border-2 rounded-r-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                        errors.mobile ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete address"
                  rows={3}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                    errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
            </div>

            {/* Commodities Section */}
            <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  <Briefcase className="inline w-5 h-5 mr-2" />
                  Commodities & Experience
                </h3>
                <button
                  type="button"
                  onClick={addCommodity}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Commodity</span>
                </button>
              </div>

              {formData.commodities.map((commodity, index) => (
                <div key={index} className="bg-white p-4 rounded-lg mb-4 border-2 border-gray-300">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Commodity {index + 1}</h4>
                    {formData.commodities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCommodity(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Commodity Name
                      </label>
                      <select
                        value={commodity.name}
                        onChange={(e) => handleCommodityChange(index, 'name', e.target.value)}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                          errors[`commodity_${index}_name`] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Commodity</option>
                        {commodityOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors[`commodity_${index}_name`] && (
                        <p className="mt-1 text-sm text-red-600">{errors[`commodity_${index}_name`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience (Years)
                      </label>
                      <input
                        type="number"
                        value={commodity.experience}
                        onChange={(e) => handleCommodityChange(index, 'experience', e.target.value)}
                        placeholder="Years of experience"
                        min="0"
                        max="50"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
                          errors[`commodity_${index}_experience`] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                      />
                      {errors[`commodity_${index}_experience`] && (
                        <p className="mt-1 text-sm text-red-600">{errors[`commodity_${index}_experience`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Create Account Option */}
            <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="createAccount"
                  checked={formData.createAccount}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 text-gray-700 border-2 border-gray-400 rounded focus:ring-gray-500"
                />
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-800 cursor-pointer">
                    I want to create an account and start accepting inspection requests
                  </label>
                  <p className="text-xs text-gray-600 mt-1">
                    Check this option to provide additional information and activate your inspector account
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information (shown only if create account is checked) */}
            {formData.createAccount && (
              <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Additional Information Required
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  To create an account and start accepting requests, please provide the following:
                </p>

                {/* Government ID */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="inline w-4 h-4 mr-2" />
                    {formData.inspectorType === 'indian' ? 'Aadhaar Card' : 'Government ID / Passport'}
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex-1 cursor-pointer">
                      <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-white ${
                        errors.governmentId ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          {formData.governmentId 
                            ? formData.governmentId.name 
                            : `Click to upload ${formData.inspectorType === 'indian' ? 'Aadhaar card' : 'Government ID/Passport'}`
                          }
                        </p>
                        <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e, 'governmentId')}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {errors.governmentId && (
                    <p className="mt-1 text-sm text-red-600">{errors.governmentId}</p>
                  )}
                </div>

                {/* Billing Details */}
                <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    <CreditCard className="inline w-4 h-4 mr-2" />
                    Billing Details
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  {formData.inspectorType === 'indian' && (
                    <div className="mt-4">
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
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:ring-4 focus:ring-gray-300 focus:outline-none transform hover:scale-105"
              >
                Create Inspector Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InspectorSignup;