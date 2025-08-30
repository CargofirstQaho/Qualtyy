import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  FileText,
  Award,
  Lock,
  Eye,
  EyeOff,
  Upload,
  MapPin,
  Briefcase,
} from "lucide-react";

const CompanySignup = () => {
  const [formData, setFormData] = useState({
    companyType: "",
    countryCode: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    businessLicense: "",
    address: "",
    phone: "",
    mobile: "",
    website: "",
    servicesOffered: "",
    establishedYear: "",
    employeeCount: "",

    // Indian Company specific fields
    gstNumber: "",
    panNumber: "",
    cinNumber: "",
    msmeRegistration: "",

    // International Company specific fields
    taxIdentificationNumber: "",
    registrationCountry: "",
    internationalCertification: null,
    complianceCertificate: null,

    // Document uploads
    businessLicenseDocument: null,
    incorporationCertificate: null,
    taxCertificate: null,
    insuranceDocument: null,
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

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Germany",
    "France",
    "Australia",
    "Singapore",
    "UAE",
    "Japan",
    "South Korea",
    "Netherlands",
    "Sweden",
    "Switzerland",
    "Other",
  ];

  const employeeCountRanges = [
    "1-10",
    "11-50",
    "51-100",
    "101-500",
    "501-1000",
    "1000+",
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

  useEffect(() => {
    if (formData.companyType === "indian") {
      setFormData((prev) => ({
        ...prev,
        countryCode: "+91",
      }));
    }
  }, [formData.companyType]);

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
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
    const errors = {};

    // Common validations
    if (!formData.companyType) errors.companyType = "Company type is required";

    // Only validate country code for international companies
    if (formData.companyType === "international" && !formData.countryCode) {
      errors.countryCode = "Country code is required";
    }

    // Common validations
    if (!formData.companyType) errors.companyType = "Company type is required";
    if (!formData.countryCode) errors.countryCode = "Country code is required";
    if (!formData.name.trim()) errors.name = "Contact person name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
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
        errors.password = `Password must contain ${passwordErrors.join(", ")}`;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.companyName.trim())
      errors.companyName = "Company name is required";
    if (!formData.businessLicense.trim())
      errors.businessLicense = "Business license number is required";
    if (!formData.phone.trim()) errors.phone = "Company phone is required";
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{7,15}$/.test(formData.mobile)) {
      errors.mobile = "Please enter a valid mobile number";
    }
    if (!formData.address.trim())
      errors.address = "Company address is required";
    if (!formData.establishedYear) {
      errors.establishedYear = "Established year is required";
    } else {
      const currentYear = new Date().getFullYear();
      const year = parseInt(formData.establishedYear);
      if (year < 1800 || year > currentYear) {
        errors.establishedYear = `Please enter a valid year between 1800 and ${currentYear}`;
      }
    }
    if (!formData.employeeCount)
      errors.employeeCount = "Employee count is required";

    // Document validations
    if (!formData.businessLicenseDocument)
      errors.businessLicenseDocument = "Business license document is required";
    if (!formData.incorporationCertificate)
      errors.incorporationCertificate = "Incorporation certificate is required";

    // Indian Company specific validations
    if (formData.companyType === "indian") {
      if (!formData.gstNumber.trim()) {
        errors.gstNumber = "GST number is required";
      } else if (
        !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(
          formData.gstNumber
        )
      ) {
        errors.gstNumber = "Please enter a valid GST number";
      }
      if (!formData.panNumber.trim()) {
        errors.panNumber = "PAN number is required";
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
        errors.panNumber = "Please enter a valid PAN number";
      }
      if (!formData.cinNumber.trim())
        errors.cinNumber = "CIN number is required";
    }

    // International Company specific validations
    if (formData.companyType === "international") {
      if (!formData.taxIdentificationNumber.trim())
        errors.taxIdentificationNumber =
          "Tax identification number is required";
      if (!formData.registrationCountry)
        errors.registrationCountry = "Registration country is required";
      if (!formData.complianceCertificate)
        errors.complianceCertificate = "Compliance certificate is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) return;

    const submitData = {
      ...formData,
      role: "company",
    };

    const result = await signup(submitData, "company");

    if (result.success) {
      navigate("/dashboard/company");
    }
  };

  const renderCompanyTypeFields = () => {
    if (formData.companyType === "indian") {
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-100 border-b border-gray-600 pb-2">
            Indian Company Details
          </h3>

          {/* GST Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FileText className="inline w-4 h-4 mr-2" />
              GST Number *
            </label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="22AAAAA0000A1Z5"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
                formErrors.gstNumber
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            />
            {formErrors.gstNumber && (
              <p className="mt-1 text-sm text-red-400">
                {formErrors.gstNumber}
              </p>
            )}
          </div>

          {/* PAN Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Award className="inline w-4 h-4 mr-2" />
              Company PAN Number *
            </label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="ABCDE1234F"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
                formErrors.panNumber
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            />
            {formErrors.panNumber && (
              <p className="mt-1 text-sm text-red-400">
                {formErrors.panNumber}
              </p>
            )}
          </div>

          {/* CIN Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Building2 className="inline w-4 h-4 mr-2" />
              CIN Number *
            </label>
            <input
              type="text"
              name="cinNumber"
              value={formData.cinNumber}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="U12345AB1234PTC123456"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
                formErrors.cinNumber
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            />
            {formErrors.cinNumber && (
              <p className="mt-1 text-sm text-red-400">
                {formErrors.cinNumber}
              </p>
            )}
          </div>

          {/* MSME Registration */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Award className="inline w-4 h-4 mr-2" />
              MSME Registration Number (Optional)
            </label>
            <input
              type="text"
              name="msmeRegistration"
              value={formData.msmeRegistration}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter MSME registration number"
              className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 border-gray-600 hover:border-gray-500"
            />
          </div>
        </div>
      );
    } else if (formData.companyType === "international") {
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-100 border-b border-gray-600 pb-2">
            International Company Details
          </h3>

          {/* Tax Identification Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FileText className="inline w-4 h-4 mr-2" />
              Tax Identification Number *
            </label>
            <input
              type="text"
              name="taxIdentificationNumber"
              value={formData.taxIdentificationNumber}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter tax identification number"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
                formErrors.taxIdentificationNumber
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            />
            {formErrors.taxIdentificationNumber && (
              <p className="mt-1 text-sm text-red-400">
                {formErrors.taxIdentificationNumber}
              </p>
            )}
          </div>

          {/* Registration Country */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Globe className="inline w-4 h-4 mr-2" />
              Country of Registration *
            </label>
            <select
              name="registrationCountry"
              value={formData.registrationCountry}
              onChange={handleInputChange}
              disabled={loading}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 disabled:opacity-50 ${
                formErrors.registrationCountry
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            >
              <option value="">Select registration country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {formErrors.registrationCountry && (
              <p className="mt-1 text-sm text-red-400">
                {formErrors.registrationCountry}
              </p>
            )}
          </div>

          {/* International Certification */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Award className="inline w-4 h-4 mr-2" />
              International Certification (Optional)
            </label>
            <label className="cursor-pointer">
              <div className="border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-gray-700 border-gray-500 hover:border-gray-400">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-300">
                  {formData.internationalCertification
                    ? formData.internationalCertification.name
                    : "Click to upload international certification"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, JPG, PNG (Max 5MB)
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleFileUpload(e, "internationalCertification")
                }
                disabled={loading}
                className="hidden"
              />
            </label>
          </div>

          {/* Compliance Certificate */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FileText className="inline w-4 h-4 mr-2" />
              Compliance Certificate *
            </label>
            <label className="cursor-pointer">
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-gray-700 ${
                  formErrors.complianceCertificate
                    ? "border-red-500 bg-red-900/20"
                    : "border-gray-500 hover:border-gray-400"
                }`}
              >
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-300">
                  {formData.complianceCertificate
                    ? formData.complianceCertificate.name
                    : "Click to upload compliance certificate"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, JPG, PNG (Max 5MB)
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e, "complianceCertificate")}
                disabled={loading}
                className="hidden"
              />
            </label>
            {formErrors.complianceCertificate && (
              <p className="mt-1 text-sm text-red-400">
                {formErrors.complianceCertificate}
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-700 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-orange-200" />
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-2">
            Company Registration
          </h2>
          <p className="text-gray-400">
            Register your inspection company and start offering services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Building2 className="inline w-4 h-4 mr-2" />
              Company Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="companyType"
                  value="indian"
                  checked={formData.companyType === "indian"}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="sr-only"
                />
                <div
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    formData.companyType === "indian"
                      ? "border-orange-500 bg-orange-900/20"
                      : "border-gray-600 hover:border-gray-500"
                  } bg-gray-800`}
                >
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">🇮🇳</span>
                    <span className="text-gray-200 font-medium">
                      Indian Company
                    </span>
                  </div>
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="companyType"
                  value="international"
                  checked={formData.companyType === "international"}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="sr-only"
                />
                <div
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    formData.companyType === "international"
                      ? "border-orange-500 bg-orange-900/20"
                      : "border-gray-600 hover:border-gray-500"
                  } bg-gray-800`}
                >
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">🌍</span>
                    <span className="text-gray-200 font-medium">
                      International Company
                    </span>
                  </div>
                </div>
              </label>
            </div>
            {formErrors.companyType && (
              <p className="mt-1 text-sm text-red-400">
                {formErrors.companyType}
              </p>
            )}
          </div>

          {/* Country Code */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Globe className="inline w-4 h-4 mr-2" />
              Country Code
            </label>
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              disabled={loading}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 disabled:opacity-50 ${
                formErrors.countryCode ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
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
              <p className="mt-1 text-sm text-red-400">{formErrors.countryCode}</p>
            )}
          </div> */}
          {/* Country Code - Only show for International Companies */}
          {formData.companyType === "international" && (
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
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 disabled:opacity-50 ${
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
          )}

          {/* For Indian Companies, show the country code as read-only info */}
          {formData.companyType === "indian" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Globe className="inline w-4 h-4 mr-2" />
                Country
              </label>
              <div className="w-full px-4 py-3 border-2 rounded-lg bg-gray-700 border-gray-600 text-gray-100">
                🇮🇳 +91 - India
              </div>
            </div>
          )}

          {/* Contact Person Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User className="inline w-4 h-4 mr-2" />
              Contact Person Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter contact person's full name"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
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
              Company Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter company email address"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
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
                className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
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
                className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
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

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Building2 className="inline w-4 h-4 mr-2" />
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter company name"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
                formErrors.companyName
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            />
            {formErrors.companyName && (
              <p className="mt-1 text-sm text-red-400">
                {formErrors.companyName}
              </p>
            )}
          </div>

          {/* Business License Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FileText className="inline w-4 h-4 mr-2" />
              Business License Number
            </label>
            <input
              type="text"
              name="businessLicense"
              value={formData.businessLicense}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter business license number"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
                formErrors.businessLicense
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            />
            {formErrors.businessLicense && (
              <p className="mt-1 text-sm text-red-400">
                {formErrors.businessLicense}
              </p>
            )}
          </div>

          {/* Company Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Phone className="inline w-4 h-4 mr-2" />
              Company Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter company phone number"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
                formErrors.phone
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-400">{formErrors.phone}</p>
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
                className={`flex-1 px-4 py-3 border-2 rounded-r-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
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

          {/* Company Address */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <MapPin className="inline w-4 h-4 mr-2" />
              Company Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter complete company address"
              rows="3"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 resize-none ${
                formErrors.address
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            />
            {formErrors.address && (
              <p className="mt-1 text-sm text-red-400">{formErrors.address}</p>
            )}
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Globe className="inline w-4 h-4 mr-2" />
              Company Website (Optional)
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="https://www.yourcompany.com"
              className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 border-gray-600 hover:border-gray-500"
            />
          </div>

          {/* Established Year */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Building2 className="inline w-4 h-4 mr-2" />
              Year Established
            </label>
            <input
              type="number"
              name="establishedYear"
              value={formData.establishedYear}
              onChange={handleInputChange}
              disabled={loading}
              min="1800"
              max={new Date().getFullYear()}
              placeholder="YYYY"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 ${
                formErrors.establishedYear
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            />
            {formErrors.establishedYear && (
              <p className="mt-1 text-sm text-red-400">
                {formErrors.establishedYear}
              </p>
            )}
          </div>

          {/* Employee Count */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User className="inline w-4 h-4 mr-2" />
              Number of Employees
            </label>
            <select
              name="employeeCount"
              value={formData.employeeCount}
              onChange={handleInputChange}
              disabled={loading}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 disabled:opacity-50 ${
                formErrors.employeeCount
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            >
              <option value="">Select employee count</option>
              {employeeCountRanges.map((range) => (
                <option key={range} value={range}>
                  {range} employees
                </option>
              ))}
            </select>
            {formErrors.employeeCount && (
              <p className="mt-1 text-sm text-red-400">
                {formErrors.employeeCount}
              </p>
            )}
          </div>

          {/* Services Offered */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Briefcase className="inline w-4 h-4 mr-2" />
              Services Offered (Optional)
            </label>
            <textarea
              name="servicesOffered"
              value={formData.servicesOffered}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Describe the inspection services your company offers"
              rows="3"
              className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors bg-gray-800 text-gray-100 placeholder-gray-500 disabled:opacity-50 resize-none border-gray-600 hover:border-gray-500"
            />
          </div>

          {/* Company Type Specific Fields */}
          {renderCompanyTypeFields()}

          {/* Required Documents Section */}
          <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-600">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">
              Required Documents
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Please upload the following documents to complete your company
              registration:
            </p>

            {/* Business License Document */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <FileText className="inline w-4 h-4 mr-2" />
                Business License Document *
              </label>
              <label className="cursor-pointer">
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-gray-700 ${
                    formErrors.businessLicenseDocument
                      ? "border-red-500 bg-red-900/20"
                      : "border-gray-500 hover:border-gray-400"
                  }`}
                >
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-300">
                    {formData.businessLicenseDocument
                      ? formData.businessLicenseDocument.name
                      : "Click to upload business license"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, JPG, PNG (Max 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    handleFileUpload(e, "businessLicenseDocument")
                  }
                  disabled={loading}
                  className="hidden"
                />
              </label>
              {formErrors.businessLicenseDocument && (
                <p className="mt-1 text-sm text-red-400">
                  {formErrors.businessLicenseDocument}
                </p>
              )}
            </div>

            {/* Incorporation Certificate */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Award className="inline w-4 h-4 mr-2" />
                Incorporation Certificate *
              </label>
              <label className="cursor-pointer">
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-gray-700 ${
                    formErrors.incorporationCertificate
                      ? "border-red-500 bg-red-900/20"
                      : "border-gray-500 hover:border-gray-400"
                  }`}
                >
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-300">
                    {formData.incorporationCertificate
                      ? formData.incorporationCertificate.name
                      : "Click to upload incorporation certificate"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, JPG, PNG (Max 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    handleFileUpload(e, "incorporationCertificate")
                  }
                  disabled={loading}
                  className="hidden"
                />
              </label>
              {formErrors.incorporationCertificate && (
                <p className="mt-1 text-sm text-red-400">
                  {formErrors.incorporationCertificate}
                </p>
              )}
            </div>

            {/* Tax Certificate */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <FileText className="inline w-4 h-4 mr-2" />
                Tax Certificate (Optional)
              </label>
              <label className="cursor-pointer">
                <div className="border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-gray-700 border-gray-500 hover:border-gray-400">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-300">
                    {formData.taxCertificate
                      ? formData.taxCertificate.name
                      : "Click to upload tax certificate"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, JPG, PNG (Max 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, "taxCertificate")}
                  disabled={loading}
                  className="hidden"
                />
              </label>
            </div>

            {/* Insurance Document */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Award className="inline w-4 h-4 mr-2" />
                Professional Liability Insurance (Optional)
              </label>
              <label className="cursor-pointer">
                <div className="border-2 border-dashed rounded-lg p-4 text-center transition-colors bg-gray-700 border-gray-500 hover:border-gray-400">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-300">
                    {formData.insuranceDocument
                      ? formData.insuranceDocument.name
                      : "Click to upload insurance document"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, JPG, PNG (Max 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, "insuranceDocument")}
                  disabled={loading}
                  className="hidden"
                />
              </label>
            </div>
          </div>

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
              className="w-full bg-orange-700 hover:bg-orange-600 disabled:bg-orange-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:ring-4 focus:ring-orange-500 focus:outline-none transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "Creating Account..." : "Register Company"}
            </button>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-sm text-orange-400 hover:text-orange-300 disabled:opacity-50"
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

export default CompanySignup;
