import React, { useState } from "react";
import {
  Upload,
  User,
  Mail,
  Phone,
  Globe,
  FileText,
  Award,
  MapPin,
  Briefcase,
  CreditCard,
  Plus,
  X,
  Lock,
  Eye,
  EyeOff,
  Loader,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Define API endpoints for Indian and International inspectors
const API_ENDPOINTS = {
  Inspector: "/v1/api/inspector", // ← Must include /register
};

const InspectorSignup = ({ onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    inspectorType: "",
    countryCode: "",
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    commodities: [{ name: "", experience: "" }],
    createAccount: false,
    governmentId: null,
    accountNumber: "",
    bankName: "",
    ifscCode: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const [message, setMessage] = useState({ type: "", text: "" }); // New message state

  const countryCodes = [
    { code: "+1", country: "United States", flag: "🇺🇸" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
    { code: "+91", country: "India", flag: " 🇳" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
  ];

  const navigate = useNavigate();

  const commodityOptions = [
    "Textiles & Garments",
    "Electronics & Electrical",
    "Automotive Parts",
    "Food & Beverages",
    "Pharmaceuticals",
    "Chemicals",
    "Machinery & Equipment",
    "Furniture & Wood Products",
    "Metals & Alloys",
    "Plastics & Rubber",
    "Agricultural Products",
    "Jewelry & Accessories",
    "Toys & Games",
    "Cosmetics & Personal Care",
    "Sports Equipment",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // Clear message when user starts typing
    setMessage({ type: "", text: "" });
  };

  const handleCommodityChange = (index, field, value) => {
    const newCommodities = [...formData.commodities];
    newCommodities[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      commodities: newCommodities,
    }));

    // Clear commodity errors
    if (errors[`commodity_${index}_${field}`]) {
      setErrors((prev) => ({ ...prev, [`commodity_${index}_${field}`]: "" }));
    }
    setMessage({ type: "", text: "" });
  };

  const addCommodity = () => {
    setFormData((prev) => ({
      ...prev,
      commodities: [...prev.commodities, { name: "", experience: "" }],
    }));
  };

  const removeCommodity = (index) => {
    if (formData.commodities.length > 1) {
      const newCommodities = formData.commodities.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        commodities: newCommodities,
      }));
    }
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));

      // Clear error when file is uploaded
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    }
    setMessage({ type: "", text: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.inspectorType)
      newErrors.inspectorType = "Inspector type is required";
    if (!formData.countryCode)
      newErrors.countryCode = "Country code is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else {
      const passwordErrors = [];
      if (formData.password.length < 8) {
        passwordErrors.push("at least 8 characters");
      }
      if (!/(?=.*[a-z])/.test(formData.password)) {
        passwordErrors.push("one lowercase letter");
      }
      if (!/(?=.*[A-Z])/.test(formData.password)) {
        passwordErrors.push("one uppercase letter");
      }
      if (!/(?=.*\d)/.test(formData.password)) {
        passwordErrors.push("one number");
      }
      if (
        !/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.password)
      ) {
        passwordErrors.push("one special character");
      }

      if (passwordErrors.length > 0) {
        newErrors.password = `Password must contain: ${passwordErrors.join(
          ", "
        )}.`;
      }
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{7,15}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number (7-15 digits)";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";

    // Commodity validation
    formData.commodities.forEach((commodity, index) => {
      if (!commodity.name.trim()) {
        newErrors[`commodity_${index}_name`] = "Commodity name is required";
      }
      if (!commodity.experience.trim()) {
        newErrors[`commodity_${index}_experience`] = "Experience is required";
      } else if (isNaN(commodity.experience) || commodity.experience < 0) {
        newErrors[`commodity_${index}_experience`] =
          "Please enter valid years of experience";
      }
    });

    // Additional information validation (if user wants to create account)
    if (formData.createAccount) {
      if (!formData.governmentId) {
        newErrors.governmentId =
          formData.inspectorType === "indian"
            ? "Aadhaar card is required to create account"
            : "Government ID/Passport is required to create account";
      }
      if (!formData.accountNumber.trim()) {
        newErrors.accountNumber =
          "Account number is required to create account";
      }
      if (!formData.bankName.trim()) {
        newErrors.bankName = "Bank name is required to create account";
      }
      if (formData.inspectorType === "indian" && !formData.ifscCode.trim()) {
        newErrors.ifscCode = "IFSC code is required for Indian inspectors";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setMessage({ type: "", text: "" }); // Clear previous messages

    if (!validateForm()) {
      setMessage({
        type: "error",
        text: "Please correct the errors in the form.",
      });
      return;
    }

    setLoading(true);
    const payload = new FormData(); // Use FormData for file uploads
    for (const key in formData) {
      if (key === "commodities") {
        payload.append(key, JSON.stringify(formData[key])); // Stringify array of objects
      } else if (formData[key] instanceof File) {
        payload.append(key, formData[key]);
      } else if (formData[key] !== null) {
        payload.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(
        "http://localhost:3214/v1/api/inspector/register",
        {
          method: "POST",
          body: payload,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setMessage({
          type: "success",
          text: result.message || "Inspector signup successful!",
        });

        // Reset form
        setFormData({
          inspectorType: "",
          countryCode: "",
          name: "",
          email: "",
          password: "",
          mobile: "",
          address: "",
          commodities: [{ name: "", experience: "" }],
          createAccount: false,
          governmentId: null,
          accountNumber: "",
          bankName: "",
          ifscCode: "",
        });
        setErrors({});

        // Navigate to login after 1.5s
        setTimeout(() => {
          navigate("/login"); // <--- always navigate
        }, 0);

        // Call onSuccess if it exists
        if (onSuccess) onSuccess(result);
      } else {
        const errorData = await response.json();
        setMessage({
          type: "error",
          text:
            errorData.message ||
            "Failed to sign up inspector. Please try again.",
        });
        console.error("Backend error:", errorData);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Network error or server is unreachable. Please try again later.",
      });
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add after successful signup:

  return (
    <div className="max-w-3xl mx-auto font-sans p-4 sm:p-6 lg:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background-color: #111827;
        }
      `}</style>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Inspector Signup</h2>
        <p className="text-gray-400">
          Join our platform as a professional inspector
        </p>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-lg mb-6 text-center ${
            message.type === "success"
              ? "bg-green-900 text-green-100 border border-green-700"
              : "bg-red-900 text-red-100 border border-red-700"
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Inspector Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Inspector Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  inspectorType: "international",
                }))
              }
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left shadow-sm ${
                formData.inspectorType === "international"
                  ? "border-blue-500 bg-blue-900 text-blue-100 ring-2 ring-blue-400"
                  : "border-gray-600 bg-gray-800 text-gray-300 hover:border-blue-400 hover:bg-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
              disabled={loading}
            >
              <div className="flex items-center space-x-3">
                <Globe className="h-6 w-6 text-blue-400" />
                <div>
                  <div className="font-semibold">International Inspector</div>
                  <div className="text-sm opacity-75">
                    For global inspection services
                  </div>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, inspectorType: "indian" }))
              }
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left shadow-sm ${
                formData.inspectorType === "indian"
                  ? "border-blue-500 bg-blue-900 text-blue-100 ring-2 ring-blue-400"
                  : "border-gray-600 bg-gray-800 text-gray-300 hover:border-blue-400 hover:bg-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
              disabled={loading}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🇮🇳</span>
                <div>
                  <div className="font-semibold">Indian Inspector</div>
                  <div className="text-sm opacity-75">
                    For domestic inspection services
                  </div>
                </div>
              </div>
            </button>
          </div>
          {errors.inspectorType && (
            <p className="mt-1 text-sm text-red-400">{errors.inspectorType}</p>
          )}
        </div>

        {formData.inspectorType && (
          <>
            {/* Basic Information */}
            <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700 shadow-md">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Country Code */}
                <div>
                  <label
                    htmlFor="countryCode"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    <Globe className="inline w-4 h-4 mr-2" />
                    Country Code
                  </label>
                  <select
                    id="countryCode"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-700 text-white hover:border-blue-400 ${
                      errors.countryCode
                        ? "border-red-400 bg-red-900"
                        : "border-gray-600"
                    }`}
                    disabled={loading}
                  >
                    <option value="">Select Country Code</option>
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code} - {country.country}
                      </option>
                    ))}
                  </select>
                  {errors.countryCode && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.countryCode}
                    </p>
                  )}
                </div>

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    <User className="inline w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-700 text-white placeholder-gray-400 hover:border-blue-400 ${
                      errors.name
                        ? "border-red-400 bg-red-900"
                        : "border-gray-600"
                    }`}
                    disabled={loading}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-700 text-white placeholder-gray-400 hover:border-blue-400 ${
                      errors.email
                        ? "border-red-400 bg-red-900"
                        : "border-gray-600"
                    }`}
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    <Lock className="inline w-4 h-4 mr-2" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-700 text-white placeholder-gray-400 hover:border-blue-400 ${
                        errors.password
                          ? "border-red-400 bg-red-900"
                          : "border-gray-600"
                      }`}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none"
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Mobile Number */}
                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    <Phone className="inline w-4 h-4 mr-2" />
                    Mobile Number
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-3 py-3 bg-gray-600 border-2 border-r-0 border-gray-600 rounded-l-lg">
                      <span className="text-gray-300 font-medium">
                        {formData.countryCode || "+__"}
                      </span>
                    </div>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Enter mobile number"
                      className={`flex-1 px-4 py-3 border-2 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-700 text-white placeholder-gray-400 hover:border-blue-400 ${
                        errors.mobile
                          ? "border-red-400 bg-red-900"
                          : "border-gray-600"
                      }`}
                      disabled={loading}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="mt-1 text-sm text-red-400">{errors.mobile}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="mt-6">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete address"
                  rows={3}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-700 text-white placeholder-gray-400 hover:border-blue-400 ${
                    errors.address
                      ? "border-red-400 bg-red-900"
                      : "border-gray-600"
                  }`}
                  disabled={loading}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-400">{errors.address}</p>
                )}
              </div>
            </div>

            {/* Commodities Section */}
            <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-300">
                  <Briefcase className="inline w-5 h-5 mr-2" />
                  Commodities & Experience
                </h3>
                <button
                  type="button"
                  onClick={addCommodity}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  disabled={loading}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Commodity</span>
                </button>
              </div>

              {formData.commodities.map((commodity, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg mb-4 border-2 border-gray-600 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-blue-300">
                      Commodity {index + 1}
                    </h4>
                    {formData.commodities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCommodity(index)}
                        className="text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-700 rounded-full p-1"
                        disabled={loading}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`commodity-${index}-name`}
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Commodity Name
                      </label>
                      <select
                        id={`commodity-${index}-name`}
                        value={commodity.name}
                        onChange={(e) =>
                          handleCommodityChange(index, "name", e.target.value)
                        }
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-600 text-white hover:border-blue-400 ${
                          errors[`commodity_${index}_name`]
                            ? "border-red-400 bg-red-900"
                            : "border-gray-500"
                        }`}
                        disabled={loading}
                      >
                        <option value="">Select Commodity</option>
                        {commodityOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors[`commodity_${index}_name`] && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors[`commodity_${index}_name`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={`commodity-${index}-experience`}
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Experience (Years)
                      </label>
                      <input
                        type="number"
                        id={`commodity-${index}-experience`}
                        value={commodity.experience}
                        onChange={(e) =>
                          handleCommodityChange(
                            index,
                            "experience",
                            e.target.value
                          )
                        }
                        placeholder="Years of experience"
                        min="0"
                        max="50"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-600 text-white placeholder-gray-400 hover:border-blue-400 ${
                          errors[`commodity_${index}_experience`]
                            ? "border-red-400 bg-red-900"
                            : "border-gray-500"
                        }`}
                        disabled={loading}
                      />
                      {errors[`commodity_${index}_experience`] && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors[`commodity_${index}_experience`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Create Account Option */}
            <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700 shadow-md">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="createAccount"
                  name="createAccount"
                  checked={formData.createAccount}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 text-blue-600 bg-gray-700 border-2 border-gray-500 rounded focus:ring-blue-500 accent-blue-600"
                  disabled={loading}
                />
                <div className="flex-1">
                  <label
                    htmlFor="createAccount"
                    className="text-sm font-medium text-blue-300 cursor-pointer"
                  >
                    I want to create an account and start accepting inspection
                    requests
                  </label>
                  <p className="text-xs text-blue-400 mt-1">
                    Check this option to provide additional information and
                    activate your inspector account
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information (shown only if create account is checked) */}
            {formData.createAccount && (
              <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700 shadow-md">
                <h3 className="text-lg font-semibold text-blue-300 mb-4">
                  Additional Information Required
                </h3>
                <p className="text-sm text-blue-400 mb-4">
                  To create an account and start accepting requests, please
                  provide the following:
                </p>

                {/* Government ID */}
                <div className="mb-6">
                  <label
                    htmlFor="governmentId"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    <FileText className="inline w-4 h-4 mr-2" />
                    {formData.inspectorType === "indian"
                      ? "Aadhaar Card"
                      : "Government ID / Passport"}
                  </label>
                  <div className="flex items-center space-x-4">
                    <label
                      htmlFor="governmentId"
                      className="flex-1 cursor-pointer"
                    >
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-gray-700 ${
                          errors.governmentId
                            ? "border-red-400 bg-red-900"
                            : "border-blue-400 hover:border-blue-300"
                        }`}
                      >
                        <Upload className="w-8 h-8 mx-auto text-blue-400 mb-2" />
                        <p className="text-sm text-gray-300">
                          {formData.governmentId
                            ? formData.governmentId.name
                            : `Click to upload ${
                                formData.inspectorType === "indian"
                                  ? "Aadhaar card"
                                  : "Government ID/Passport"
                              }`}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, JPG, PNG (Max 5MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        id="governmentId"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e, "governmentId")}
                        className="hidden"
                        disabled={loading}
                      />
                    </label>
                  </div>
                  {errors.governmentId && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.governmentId}
                    </p>
                  )}
                </div>

                {/* Billing Details */}
                <div className="bg-gray-700 p-4 rounded-lg border-2 border-gray-600 shadow-sm">
                  <h4 className="font-semibold text-blue-300 mb-4">
                    <CreditCard className="inline w-4 h-4 mr-2" />
                    Billing Details
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="accountNumber"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        placeholder="Enter account number"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-600 text-white placeholder-gray-400 hover:border-blue-400 ${
                          errors.accountNumber
                            ? "border-red-400 bg-red-900"
                            : "border-gray-500"
                        }`}
                        disabled={loading}
                      />
                      {errors.accountNumber && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.accountNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="bankName"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Bank Name
                      </label>
                      <input
                        type="text"
                        id="bankName"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        placeholder="Enter bank name"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-600 text-white placeholder-gray-400 hover:border-blue-400 ${
                          errors.bankName
                            ? "border-red-400 bg-red-900"
                            : "border-gray-500"
                        }`}
                        disabled={loading}
                      />
                      {errors.bankName && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.bankName}
                        </p>
                      )}
                    </div>
                  </div>

                  {formData.inspectorType === "indian" && (
                    <div className="mt-4">
                      <label
                        htmlFor="ifscCode"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        id="ifscCode"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleInputChange}
                        placeholder="Enter IFSC code"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-600 text-white placeholder-gray-400 hover:border-blue-400 ${
                          errors.ifscCode
                            ? "border-red-400 bg-red-900"
                            : "border-gray-500"
                        }`}
                        disabled={loading}
                      />
                      {errors.ifscCode && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.ifscCode}
                        </p>
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:ring-4 focus:ring-blue-300 focus:outline-none transform hover:scale-105 flex items-center justify-center space-x-2"
                disabled={loading}
              >
                {loading && <Loader className="animate-spin h-5 w-5 mr-2" />}
                <span>
                  {loading ? "Submitting..." : "Create Inspector Account"}
                </span>
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-sm text-gray-400 hover:text-gray-300 disabled:opacity-50"
                disabled={loading}
              >
                ← Back to role selection
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InspectorSignup;
