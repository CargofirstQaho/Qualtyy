import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Award,
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Bell,
  Key,
  CreditCard,
  FileText,
  Settings,
} from "lucide-react";

const MyAccount = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Customer",
    email: "john.inspector@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    company: "Professional Inspections Inc.",
    license: "INS-2024-001",
    experience: "5 years",
    dateJoined: "2020-01-15",
    specializations: ["Residential", "Commercial", "Electrical"],
    bio: "Experienced inspector with expertise in residential and commercial property inspections.",
    certifications: [
      {
        name: "Certified Professional Inspector",
        issuer: "ASHI",
        date: "2020-03-15",
        expires: "2025-03-15",
      },
      {
        name: "Electrical Systems Certification",
        issuer: "NECA",
        date: "2021-06-10",
        expires: "2026-06-10",
      },
      {
        name: "Commercial Building Inspector",
        issuer: "ICC",
        date: "2019-11-20",
        expires: "2024-11-20",
      },
    ],
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
  });

  const [billingData, setBillingData] = useState({
    billingName: "Cargofirst QAHO Corporation Private Limited",
    billingAddress:
      "1st floor, Vajram Esteva New Survey No. 57/4, Old Survey No. 57/2 Marathahalli-Sarjapur Outer Ring Road, ORR, Devarabisanahalli, Varthur, Bengaluru.",
    billingCountry: "India",
    billingState: "State of Karnataka",
    billingCity: "Bengaluru",
    billingPostalCode: "560103",
  });

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBillingInputChange = (field, value) => {
    setBillingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveBilling = () => {
    console.log("Saving billing data:", billingData);
    setIsEditingBilling(false);
    alert("Billing information updated successfully!");
  };

  const handleCancelBilling = () => {
    setIsEditingBilling(false);
  };

  const handleSave = () => {
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const tabs = [
    { id: "profile", label: "Profile Information", icon: User },
    { id: "security", label: "Security & Privacy", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing & Payments", icon: CreditCard },
  ];

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Photo Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up">
        <h3 className="text-lg font-semibold text-white mb-6 transition-colors duration-300 hover:text-gray-100">
          Profile Photo
        </h3>
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center relative group transition-all duration-300 hover:scale-110 hover:rotate-3">
            <User className="w-12 h-12 text-white transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
              <Camera className="w-6 h-6 text-white transition-transform duration-300 hover:scale-110" />
            </div>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2 transition-colors duration-300 hover:text-gray-100">
              {profileData.firstName} {profileData.lastName}
            </h4>
            <p className="text-sm text-gray-400 mb-4 transition-colors duration-300 hover:text-gray-300">
              JPG, PNG or GIF. Max size 5MB
            </p>
            <div className="flex space-x-3">
              <button className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95">
                Upload New
              </button>
              <button className="border border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div
        className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white transition-colors duration-300 hover:text-gray-100">
            Basic Information
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-105 group"
          >
            <Edit3 className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm font-medium">Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
              First Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
              />
            ) : (
              <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
                {profileData.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
              Last Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
              />
            ) : (
              <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
                {profileData.lastName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
              />
            ) : (
              <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
                {profileData.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
              />
            ) : (
              <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
                {profileData.phone}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
              Address
            </label>
            {isEditing ? (
              <textarea
                value={profileData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
              />
            ) : (
              <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
                {profileData.address}
              </p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-700">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              <Save className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      {/* Professional Information */}
      <div
        className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <h3 className="text-lg font-semibold text-white mb-6 transition-colors duration-300 hover:text-gray-100">
          Professional Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="transition-all duration-300 hover:bg-gray-800/50 p-3 rounded-lg">
            <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
              Company
            </label>
            <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
              {profileData.company}
            </p>
          </div>

          <div className="transition-all duration-300 hover:bg-gray-800/50 p-3 rounded-lg">
            <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
              License Number
            </label>
            <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
              {profileData.license}
            </p>
          </div>

          <div className="transition-all duration-300 hover:bg-gray-800/50 p-3 rounded-lg">
            <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
              Experience
            </label>
            <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
              {profileData.experience}
            </p>
          </div>

          <div className="transition-all duration-300 hover:bg-gray-800/50 p-3 rounded-lg">
            <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
              Date Joined
            </label>
            <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
              {new Date(profileData.dateJoined).toLocaleDateString()}
            </p>
          </div>

          <div className="md:col-span-2 transition-all duration-300 hover:bg-gray-800/50 p-3 rounded-lg">
            <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
              Bio
            </label>
            <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
              {profileData.bio}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-3 transition-colors duration-300">
              Specializations
            </label>
            <div className="flex flex-wrap gap-2">
              {profileData.specializations.map((spec, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30 text-purple-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:from-purple-500/30 hover:to-violet-500/30"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div
        className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        <h3 className="text-lg font-semibold text-white mb-6 transition-colors duration-300 hover:text-gray-100">
          Certifications
        </h3>

        <div className="space-y-4">
          {profileData.certifications.map((cert, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:border-gray-600 hover:scale-[1.02] animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <Award className="w-5 h-5 text-white transition-transform duration-300 hover:scale-110" />
                </div>
                <div>
                  <h4 className="font-medium text-white transition-colors duration-300 hover:text-gray-100">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300">
                    Issued by {cert.issuer} •{" "}
                    {new Date(cert.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white transition-colors duration-300 hover:text-gray-100">
                  Expires: {new Date(cert.expires).toLocaleDateString()}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full border transition-all duration-300 hover:scale-105 ${
                    new Date(cert.expires) > new Date()
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                  }`}
                >
                  {new Date(cert.expires) > new Date() ? "Valid" : "Expired"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      {/* Password Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up">
        <h3 className="text-lg font-semibold text-white mb-6 transition-colors duration-300 hover:text-gray-100">
          Password & Security
        </h3>

        <div className="space-y-4">
          <div>
            <button className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95">
              <Key className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
              <span>Change Password</span>
            </button>
            <p className="text-sm text-gray-400 mt-2 transition-colors duration-300 hover:text-gray-300">
              Last changed 30 days ago
            </p>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white transition-colors duration-300 hover:text-gray-100">
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300">
                  Add extra security to your account
                </p>
              </div>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${
                  securitySettings.twoFactorEnabled
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30 shadow-lg shadow-emerald-500/25"
                    : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-500"
                }`}
              >
                {securitySettings.twoFactorEnabled ? "Enabled" : "Enable"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Activity */}
      <div
        className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <h3 className="text-lg font-semibold text-white mb-6 transition-colors duration-300 hover:text-gray-100">
          Recent Login Activity
        </h3>

        <div className="space-y-3">
          <div
            className="flex items-center justify-between p-3 bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:border-gray-600 hover:scale-[1.02] animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div>
              <p className="font-medium text-white transition-colors duration-300 hover:text-gray-100">
                Current Session
              </p>
              <p className="text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300">
                New York, NY • Chrome on Windows
              </p>
            </div>
            <span className="text-sm text-emerald-400 font-medium transition-colors duration-300">
              Active now
            </span>
          </div>

          <div
            className="flex items-center justify-between p-3 bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-700 hover:border-gray-600 hover:scale-[1.02] animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div>
              <p className="font-medium text-white transition-colors duration-300 hover:text-gray-100">
                Previous Session
              </p>
              <p className="text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300">
                New York, NY • Mobile Safari on iPhone
              </p>
            </div>
            <span className="text-sm text-gray-500 transition-colors duration-300">
              2 hours ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up">
      <h3 className="text-lg font-semibold text-white mb-6 transition-colors duration-300 hover:text-gray-100">
        Notification Preferences
      </h3>

      <div className="space-y-6">
        <div
          className="flex items-center justify-between transition-all duration-300 hover:bg-gray-800/50 p-3 rounded-lg animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div>
            <h4 className="font-medium text-white transition-colors duration-300 hover:text-gray-100">
              Email Notifications
            </h4>
            <p className="text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300">
              Receive inspection updates via email
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={securitySettings.emailNotifications}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 transition-all duration-300 hover:scale-105"></div>
          </label>
        </div>

        <div
          className="flex items-center justify-between transition-all duration-300 hover:bg-gray-800/50 p-3 rounded-lg animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div>
            <h4 className="font-medium text-white transition-colors duration-300 hover:text-gray-100">
              SMS Notifications
            </h4>
            <p className="text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300">
              Receive urgent updates via SMS
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={securitySettings.smsNotifications}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 transition-all duration-300 hover:scale-105"></div>
          </label>
        </div>

        <div
          className="flex items-center justify-between transition-all duration-300 hover:bg-gray-800/50 p-3 rounded-lg animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div>
            <h4 className="font-medium text-white transition-colors duration-300 hover:text-gray-100">
              Marketing Emails
            </h4>
            <p className="text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300">
              Receive product updates and offers
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={securitySettings.marketingEmails}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 transition-all duration-300 hover:scale-105"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white transition-colors duration-300 hover:text-gray-100">
          Billing
        </h3>
        <button
          onClick={() => setIsEditingBilling(!isEditingBilling)}
          className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-105 group"
        >
          <Edit3 className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          <span className="text-sm font-medium">Edit</span>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
            Billing name
          </label>
          {isEditingBilling ? (
            <input
              type="text"
              value={billingData.billingName}
              onChange={(e) =>
                handleBillingInputChange("billingName", e.target.value)
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
            />
          ) : (
            <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
              {billingData.billingName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
            Billing address
          </label>
          {isEditingBilling ? (
            <textarea
              value={billingData.billingAddress}
              onChange={(e) =>
                handleBillingInputChange("billingAddress", e.target.value)
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
            />
          ) : (
            <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
              {billingData.billingAddress}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
              Billing country
            </label>
            {isEditingBilling ? (
              <input
                type="text"
                value={billingData.billingCountry}
                onChange={(e) =>
                  handleBillingInputChange("billingCountry", e.target.value)
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
              />
            ) : (
              <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
                {billingData.billingCountry}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
              Billing state
            </label>
            {isEditingBilling ? (
              <input
                type="text"
                value={billingData.billingState}
                onChange={(e) =>
                  handleBillingInputChange("billingState", e.target.value)
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
              />
            ) : (
              <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
                {billingData.billingState}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
              Billing city
            </label>
            {isEditingBilling ? (
              <input
                type="text"
                value={billingData.billingCity}
                onChange={(e) =>
                  handleBillingInputChange("billingCity", e.target.value)
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
              />
            ) : (
              <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
                {billingData.billingCity}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 transition-colors duration-300">
              Billing postal / ZIP code
            </label>
            {isEditingBilling ? (
              <input
                type="text"
                value={billingData.billingPostalCode}
                onChange={(e) =>
                  handleBillingInputChange("billingPostalCode", e.target.value)
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
              />
            ) : (
              <p className="text-white py-2 transition-colors duration-300 hover:text-gray-100">
                {billingData.billingPostalCode}
              </p>
            )}
          </div>
        </div>

        {isEditingBilling && (
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
            <button
              onClick={handleCancelBilling}
              className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveBilling}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              <Save className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white transition-all duration-300">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-8 py-6 transition-all duration-300 hover:bg-gray-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-center w-full animate-fade-in">
            <h1 className="text-3xl font-bold text-white transition-colors duration-300 hover:text-gray-100">
              My Account
            </h1>
            <p className="text-gray-400 mt-1 transition-colors duration-300 hover:text-gray-300">
              Manage your profile and account settings
            </p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div
          className="mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8 justify-center">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 animate-fade-in-up ${
                      activeTab === tab.id
                        ? "border-purple-500 text-purple-400 shadow-lg shadow-purple-500/25"
                        : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                    }`}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <Icon className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "profile" && renderProfileTab()}
          {activeTab === "security" && renderSecurityTab()}
          {activeTab === "notifications" && renderNotificationsTab()}
          {activeTab === "billing" && renderBillingTab()}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
            opacity: 0;
          }
        `,
        }}
      />
    </div>
  );
};

export default MyAccount;
