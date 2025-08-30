import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Upload,
  User,
  Mail,
  Phone,
  Globe,
  FileText,
  Award,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    countryCode: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    publishRequirements: false,
    tradeLicense: null,
    importExportCertificate: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const countryCodes = [
    { code: "+1", country: "United States", flag: "🇺🇸" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
    clearError();
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          [fieldName]: "File size must be less than 5MB",
        }));
        return;
      }

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!allowedTypes.includes(file.type)) {
        setFormErrors((prev) => ({
          ...prev,
          [fieldName]: "Only PDF, JPG, and PNG files are allowed",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));

      // Clear error when file is uploaded
      if (formErrors[fieldName]) {
        setFormErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    console.log("Validating form data:", formData);

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
        newErrors.password = `Password must contain ${passwordErrors.join(
          ", "
        )}`;
      }
    }

    // Confirm password validation with debug logs
    console.log("Confirm password value:", `'${formData.confirmPassword}'`);
    console.log(
      "Confirm password trimmed:",
      `'${formData.confirmPassword.trim()}'`
    );
    console.log("Is confirm password empty?", !formData.confirmPassword.trim());

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
      console.log(
        "Setting confirmPassword error: Please confirm your password"
      );
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      console.log("Setting confirmPassword error: Passwords do not match");
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{7,15}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";

    // If user wants to publish requirements, validate additional fields
    if (formData.publishRequirements) {
      if (!formData.tradeLicense) {
        newErrors.tradeLicense =
          "Trade license/legal document is required to publish requirements";
      }
      if (!formData.importExportCertificate) {
        newErrors.importExportCertificate =
          "Import/Export certificate is required to publish requirements";
      }
    }

    console.log("All validation errors:", newErrors);
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    console.log("Form submission started");
    console.log("Form data:", formData);

    if (!validateForm()) {
      console.log("Form validation failed", formErrors);
      return;
    }

    try {
      let submitData;

      // If files are uploaded, use FormData, otherwise use JSON
      if (
        formData.publishRequirements &&
        (formData.tradeLicense || formData.importExportCertificate)
      ) {
        // Use FormData for file uploads
        submitData = new FormData();

        // Add basic fields - using same field names as working code
        submitData.append("country_code", formData.countryCode);
        submitData.append("full_name", formData.name);
        submitData.append("email_address", formData.email);
        submitData.append("password", formData.password);
        submitData.append("confirmPassword", formData.confirmPassword);
        submitData.append("mobile_number", formData.mobile);
        submitData.append("address", formData.address);
        submitData.append(
          "publishRequirements",
          formData.publishRequirements.toString()
        );

        // Add files if they exist
        if (formData.tradeLicense) {
          submitData.append("tradeLicense", formData.tradeLicense);
        }
        if (formData.importExportCertificate) {
          submitData.append(
            "importExportCertificate",
            formData.importExportCertificate
          );
        }

        console.log("Using FormData for submission with files");
      } else {
        // Use JSON for simple data - using same field names as working code
        submitData = {
          country_code: formData.countryCode,
          full_name: formData.name,
          email_address: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          mobile_number: formData.mobile,
          address: formData.address,
          publishRequirements: formData.publishRequirements,
        };

        console.log("Using JSON for submission:", submitData);
      }

      console.log("Submitting data to signup function");

      const result = await signup(submitData, "customer");

      console.log("Signup result:", result);

      if (result && result.success) {
        console.log("Signup successful, navigating to dashboard");
        navigate("/dashboard/customer");
      } else {
        console.log(
          "Signup failed:",
          result?.error || result?.message || "Unknown error"
        );
        // If there's a specific error message from the server, it might be in result.error
        if (result?.error) {
          console.error("Server error:", result.error);
        }
      }
    } catch (err) {
      console.error("Error during signup:", err);
      // Log more details about the error
      if (err.response) {
        console.error("Error response:", err.response.data);
        console.error("Error status:", err.response.status);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full mb-4">
            <User className="w-8 h-8 text-gray-200" />
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-2">
            Customer Registration
          </h2>
          <p className="text-gray-400">
            Register to request inspection services and connect with providers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Country Code Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Globe className="inline w-4 h-4 mr-2" />
              Country Code
            </label>
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              disabled={loading}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors bg-gray-800 text-gray-100 disabled:opacity-50 ${
                formErrors.countryCode
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            >
              <option value="">Select Country Code</option>
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code} - {country.country}
                </option>
              ))}
            </select>
            {formErrors.countryCode && (
              <p className="mt-1 text-sm text-red-400">
                {formErrors.countryCode}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User className="inline w-4 h-4 mr-2" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
                formErrors.name
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="inline w-4 h-4 mr-2" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter your email address"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
                formErrors.email
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Lock className="inline w-4 h-4 mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
                  formErrors.password
                    ? "border-red-500 bg-red-900/20"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {formErrors.password && (
              <p className="mt-1 text-sm text-red-400">{formErrors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Lock className="inline w-4 h-4 mr-2" />
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Confirm your password"
                className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
                  formErrors.confirmPassword
                    ? "border-red-500 bg-red-900/20"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {formErrors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">
                {formErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Phone className="inline w-4 h-4 mr-2" />
              Mobile Number
            </label>
            <div className="flex">
              <div className="flex items-center px-3 py-3 bg-gray-700 border-2 border-r-0 border-gray-600 rounded-l-lg">
                <span className="text-gray-300 font-medium">
                  {formData.countryCode || "+__"}
                </span>
              </div>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Enter mobile number"
                className={`flex-1 px-4 py-3 border-2 rounded-r-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
                  formErrors.mobile
                    ? "border-red-500 bg-red-900/20"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              />
            </div>
            {formErrors.mobile && (
              <p className="mt-1 text-sm text-red-400">{formErrors.mobile}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter your address"
              rows="3"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 resize-none ${
                formErrors.address
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            />
            {formErrors.address && (
              <p className="mt-1 text-sm text-red-400">{formErrors.address}</p>
            )}
          </div>

          {/* Publish Requirements Option */}
          <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-600">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="publishRequirements"
                checked={formData.publishRequirements}
                onChange={handleInputChange}
                disabled={loading}
                className="mt-1 w-5 h-5 text-gray-400 bg-gray-700 border-2 border-gray-500 rounded focus:ring-gray-400 focus:ring-2 disabled:opacity-50"
              />
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-200 cursor-pointer">
                  I want to publish requirements on the platform
                </label>
                <p className="text-xs text-gray-400 mt-1">
                  Check this option if you want to post inspection requirements
                  and connect with inspection companies
                </p>
              </div>
            </div>
          </div>

          {/* Additional Requirements (shown only if publish requirements is checked) */}
          {formData.publishRequirements && (
            <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-600">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">
                Additional Documents Required
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                To publish requirements, please provide the following documents:
              </p>

              {/* Trade License */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FileText className="inline w-4 h-4 mr-2" />
                  Trade License / Legal Document / GST Certificate
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex-1 cursor-pointer">
                    <div
                      className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-gray-700 ${
                        formErrors.tradeLicense
                          ? "border-red-500 bg-red-900/20"
                          : "border-gray-500 hover:border-gray-400"
                      }`}
                    >
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-300">
                        {formData.tradeLicense
                          ? formData.tradeLicense.name
                          : "Click to upload trade license"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, JPG, PNG (Max 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, "tradeLicense")}
                      disabled={loading}
                      className="hidden"
                    />
                  </label>
                </div>
                {formErrors.tradeLicense && (
                  <p className="mt-1 text-sm text-red-400">
                    {formErrors.tradeLicense}
                  </p>
                )}
              </div>

              {/* Import/Export Certificate */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Award className="inline w-4 h-4 mr-2" />
                  Import/Export Certificate
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex-1 cursor-pointer">
                    <div
                      className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-gray-700 ${
                        formErrors.importExportCertificate
                          ? "border-red-500 bg-red-900/20"
                          : "border-gray-500 hover:border-gray-400"
                      }`}
                    >
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-300">
                        {formData.importExportCertificate
                          ? formData.importExportCertificate.name
                          : "Click to upload certificate"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, JPG, PNG (Max 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) =>
                        handleFileUpload(e, "importExportCertificate")
                      }
                      disabled={loading}
                      className="hidden"
                    />
                  </label>
                </div>
                {formErrors.importExportCertificate && (
                  <p className="mt-1 text-sm text-red-400">
                    {formErrors.importExportCertificate}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:ring-4 focus:ring-gray-500 focus:outline-none transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "Creating Account..." : "Create Customer Account"}
            </button>
          </div>

          {/* Back Button */}
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
        </form>
      </div>
    </div>
  );
};

export default CustomerSignup;
