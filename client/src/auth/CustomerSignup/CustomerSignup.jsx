

// import React, { useState } from 'react';
// import { Upload, User, Mail, Phone, Globe, FileText, Award } from 'lucide-react';

// const CustomerSignup = ({ onSuccess, onBack }) => {
//   const [formData, setFormData] = useState({
//     countryCode: '',
//     name: '',
//     email: '',
//     mobile: '',
//     publishRequirements: false,
//     tradeLicense: null,
//     importExportCertificate: null
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

//   const validateForm = () => {
//     const newErrors = {};

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

//     // If user wants to publish requirements, validate additional fields
//     if (formData.publishRequirements) {
//       if (!formData.tradeLicense) {
//         newErrors.tradeLicense = 'Trade license/legal document is required to publish requirements';
//       }
//       if (!formData.importExportCertificate) {
//         newErrors.importExportCertificate = 'Import/Export certificate is required to publish requirements';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     if (validateForm()) {
//       const userData = {
//         ...formData,
//         role: 'customer',
//         id: Date.now()
//       };
      
//       console.log('Customer signup submitted:', userData);
      
//       // Call the success callback with user data
//       if (onSuccess) {
//         onSuccess(userData);
//       } else {
//         alert('Customer signup successful!');
//       }
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="text-center mb-8">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
//           <User className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-3xl font-bold text-gray-900 mb-2">Customer Signup</h2>
//         <p className="text-gray-600">Join our platform to connect with inspection services</p>
//       </div>

//       <div className="space-y-6">
//         {/* Country Code Dropdown */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             <Globe className="inline w-4 h-4 mr-2" />
//             Country Code
//           </label>
//           <select
//             name="countryCode"
//             value={formData.countryCode}
//             onChange={handleInputChange}
//             className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white ${
//               errors.countryCode ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//             }`}
//           >
//             <option value="">Select Country Code</option>
//             {countryCodes.map((country) => (
//               <option key={country.code} value={country.code}>
//                 {country.flag} {country.code} - {country.country}
//               </option>
//             ))}
//           </select>
//           {errors.countryCode && (
//             <p className="mt-1 text-sm text-red-600">{errors.countryCode}</p>
//           )}
//         </div>

//         {/* Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             <User className="inline w-4 h-4 mr-2" />
//             Full Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             placeholder="Enter your full name"
//             className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//               errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           {errors.name && (
//             <p className="mt-1 text-sm text-red-600">{errors.name}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             <Mail className="inline w-4 h-4 mr-2" />
//             Email Address
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder="Enter your email address"
//             className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//               errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           {errors.email && (
//             <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//           )}
//         </div>

//         {/* Mobile Number */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             <Phone className="inline w-4 h-4 mr-2" />
//             Mobile Number
//           </label>
//           <div className="flex">
//             <div className="flex items-center px-3 py-3 bg-gray-100 border-2 border-r-0 border-gray-300 rounded-l-lg">
//               <span className="text-gray-700 font-medium">
//                 {formData.countryCode || '+__'}
//               </span>
//             </div>
//             <input
//               type="tel"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleInputChange}
//               placeholder="Enter mobile number"
//               className={`flex-1 px-4 py-3 border-2 rounded-r-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white hover:border-gray-400 ${
//                 errors.mobile ? 'border-red-300 bg-red-50' : 'border-gray-300'
//               }`}
//             />
//           </div>
//           {errors.mobile && (
//             <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
//           )}
//         </div>

//         {/* Publish Requirements Option */}
//         <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               name="publishRequirements"
//               checked={formData.publishRequirements}
//               onChange={handleInputChange}
//               className="mt-1 w-5 h-5 text-gray-700 border-2 border-gray-400 rounded focus:ring-gray-500"
//             />
//             <div className="flex-1">
//               <label className="text-sm font-medium text-gray-800 cursor-pointer">
//                 I want to publish requirements on the platform
//               </label>
//               <p className="text-xs text-gray-600 mt-1">
//                 Check this option if you want to post inspection requirements and connect with inspection companies
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Additional Requirements (shown only if publish requirements is checked) */}
//         {formData.publishRequirements && (
//           <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Additional Documents Required
//             </h3>
//             <p className="text-sm text-gray-700 mb-4">
//               To publish requirements, please provide the following documents:
//             </p>

//             {/* Trade License */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <FileText className="inline w-4 h-4 mr-2" />
//                 Trade License / Legal Document
//               </label>
//               <div className="flex items-center space-x-4">
//                 <label className="flex-1 cursor-pointer">
//                   <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-white ${
//                     errors.tradeLicense ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//                   }`}>
//                     <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
//                     <p className="text-sm text-gray-600">
//                       {formData.tradeLicense ? formData.tradeLicense.name : 'Click to upload trade license'}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
//                   </div>
//                   <input
//                     type="file"
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     onChange={(e) => handleFileUpload(e, 'tradeLicense')}
//                     className="hidden"
//                   />
//                 </label>
//               </div>
//               {errors.tradeLicense && (
//                 <p className="mt-1 text-sm text-red-600">{errors.tradeLicense}</p>
//               )}
//             </div>

//             {/* Import/Export Certificate */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Award className="inline w-4 h-4 mr-2" />
//                 Import/Export Certificate
//               </label>
//               <div className="flex items-center space-x-4">
//                 <label className="flex-1 cursor-pointer">
//                   <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-white ${
//                     errors.importExportCertificate ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//                   }`}>
//                     <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
//                     <p className="text-sm text-gray-600">
//                       {formData.importExportCertificate ? formData.importExportCertificate.name : 'Click to upload certificate'}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
//                   </div>
//                   <input
//                     type="file"
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     onChange={(e) => handleFileUpload(e, 'importExportCertificate')}
//                     className="hidden"
//                   />
//                 </label>
//               </div>
//               {errors.importExportCertificate && (
//                 <p className="mt-1 text-sm text-red-600">{errors.importExportCertificate}</p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Submit Button */}
//         <div className="pt-6">
//           <button
//             type="button"
//             onClick={handleSubmit}
//             className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:ring-4 focus:ring-gray-300 focus:outline-none transform hover:scale-105"
//           >
//             Create Customer Account
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerSignup;





import React, { useState } from 'react';
import { Upload, User, Mail, Phone, Globe, FileText, Award, Lock, Eye, EyeOff } from 'lucide-react';

const CustomerSignup = ({ onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    countryCode: '',
    name: '',
    email: '',
    password: '',
    mobile: '',
    publishRequirements: false,
    tradeLicense: null,
    importExportCertificate: null
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

  const validateForm = () => {
    const newErrors = {};

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

    // If user wants to publish requirements, validate additional fields
    if (formData.publishRequirements) {
      if (!formData.tradeLicense) {
        newErrors.tradeLicense = 'Trade license/legal document is required to publish requirements';
      }
      if (!formData.importExportCertificate) {
        newErrors.importExportCertificate = 'Import/Export certificate is required to publish requirements';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (validateForm()) {
      const userData = {
        ...formData,
        role: 'customer',
        id: Date.now()
      };
      
      console.log('Customer signup submitted:', userData);
      
      // Call the success callback with user data
      if (onSuccess) {
        onSuccess(userData);
      } else {
        alert('Customer signup successful!');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Customer Signup</h2>
        <p className="text-gray-600">Join our platform to connect with inspection services</p>
      </div>

      <div className="space-y-6">
        {/* Country Code Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Globe className="inline w-4 h-4 mr-2" />
            Country Code
          </label>
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors bg-white ${
              errors.countryCode ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
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

        {/* Name */}
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

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="inline w-4 h-4 mr-2" />
            Mobile Number
          </label>
          <div className="flex">
            <div className="flex items-center px-3 py-3 bg-gray-100 border-2 border-r-0 border-gray-300 rounded-l-lg">
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

        {/* Publish Requirements Option */}
        <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="publishRequirements"
              checked={formData.publishRequirements}
              onChange={handleInputChange}
              className="mt-1 w-5 h-5 text-gray-700 border-2 border-gray-400 rounded focus:ring-gray-500"
            />
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-800 cursor-pointer">
                I want to publish requirements on the platform
              </label>
              <p className="text-xs text-gray-600 mt-1">
                Check this option if you want to post inspection requirements and connect with inspection companies
              </p>
            </div>
          </div>
        </div>

        {/* Additional Requirements (shown only if publish requirements is checked) */}
        {formData.publishRequirements && (
          <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Documents Required
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              To publish requirements, please provide the following documents:
            </p>

            {/* Trade License */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline w-4 h-4 mr-2" />
                Trade License / Legal Document
              </label>
              <div className="flex items-center space-x-4">
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
              </div>
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
              <div className="flex items-center space-x-4">
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
              </div>
              {errors.importExportCertificate && (
                <p className="mt-1 text-sm text-red-600">{errors.importExportCertificate}</p>
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
            Create Customer Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignup;