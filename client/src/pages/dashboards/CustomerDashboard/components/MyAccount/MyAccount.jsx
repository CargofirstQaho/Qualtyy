import React, { useState } from 'react';
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
  Settings
} from 'lucide-react';

const MyAccount = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingBilling, setIsEditingBilling] = useState(false); // Moved to top level
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Customer',
    email: 'john.inspector@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    company: 'Professional Inspections Inc.',
    license: 'INS-2024-001',
    experience: '5 years',
    dateJoined: '2020-01-15',
    specializations: ['Residential', 'Commercial', 'Electrical'],
    bio: 'Experienced inspector with expertise in residential and commercial property inspections.',
    certifications: [
      { name: 'Certified Professional Inspector', issuer: 'ASHI', date: '2020-03-15', expires: '2025-03-15' },
      { name: 'Electrical Systems Certification', issuer: 'NECA', date: '2021-06-10', expires: '2026-06-10' },
      { name: 'Commercial Building Inspector', issuer: 'ICC', date: '2019-11-20', expires: '2024-11-20' }
    ]
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true
  });

  // Moved billing data to top level
  const [billingData, setBillingData] = useState({
    billingName: 'Cargofirst QAHO Corporation Private Limited',
    billingAddress: '1st floor, Vajram Esteva New Survey No. 57/4, Old Survey No. 57/2 Marathahalli-Sarjapur Outer Ring Road, ORR, Devarabisanahalli, Varthur, Bengaluru.',
    billingCountry: 'India',
    billingState: 'State of Karnataka',
    billingCity: 'Bengaluru',
    billingPostalCode: '560103'
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBillingInputChange = (field, value) => {
    setBillingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveBilling = () => {
    // Implement save logic here
    console.log('Saving billing data:', billingData);
    setIsEditingBilling(false);
    alert('Billing information updated successfully!');
  };

  const handleCancelBilling = () => {
    setIsEditingBilling(false);
    // Reset any unsaved changes if needed
  };

  const handleSave = () => {
    // Implement save logic here
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any unsaved changes if needed
  };

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard }
  ];

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Photo Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Photo</h3>
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center relative group">
            <User className="w-12 h-12 text-gray-400" />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">{profileData.firstName} {profileData.lastName}</h4>
            <p className="text-sm text-gray-600 mb-4">JPG, PNG or GIF. Max size 5MB</p>
            <div className="flex space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Upload New
              </button>
              <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span className="text-sm font-medium">Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{profileData.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{profileData.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{profileData.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{profileData.phone}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            {isEditing ? (
              <textarea
                value={profileData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{profileData.address}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      {/* Professional Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Professional Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <p className="text-gray-900 py-2">{profileData.company}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
            <p className="text-gray-900 py-2">{profileData.license}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <p className="text-gray-900 py-2">{profileData.experience}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Joined</label>
            <p className="text-gray-900 py-2">{new Date(profileData.dateJoined).toLocaleDateString()}</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <p className="text-gray-900 py-2">{profileData.bio}</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">Specializations</label>
            <div className="flex flex-wrap gap-2">
              {profileData.specializations.map((spec, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Certifications</h3>
        
        <div className="space-y-4">
          {profileData.certifications.map((cert, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-yellow-600" />
                <div>
                  <h4 className="font-medium text-gray-900">{cert.name}</h4>
                  <p className="text-sm text-gray-600">Issued by {cert.issuer} • {new Date(cert.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Expires: {new Date(cert.expires).toLocaleDateString()}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  new Date(cert.expires) > new Date() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {new Date(cert.expires) > new Date() ? 'Valid' : 'Expired'}
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
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Password & Security</h3>
        
        <div className="space-y-4">
          <div>
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2">
              <Key className="w-4 h-4" />
              <span>Change Password</span>
            </button>
            <p className="text-sm text-gray-600 mt-2">Last changed 30 days ago</p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Add extra security to your account</p>
              </div>
              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                securitySettings.twoFactorEnabled 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}>
                {securitySettings.twoFactorEnabled ? 'Enabled' : 'Enable'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Login Activity</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Current Session</p>
              <p className="text-sm text-gray-600">New York, NY • Chrome on Windows</p>
            </div>
            <span className="text-sm text-green-600 font-medium">Active now</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Previous Session</p>
              <p className="text-sm text-gray-600">New York, NY • Mobile Safari on iPhone</p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Email Notifications</h4>
            <p className="text-sm text-gray-600">Receive inspection updates via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={securitySettings.emailNotifications} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">SMS Notifications</h4>
            <p className="text-sm text-gray-600">Receive urgent updates via SMS</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={securitySettings.smsNotifications} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Marketing Emails</h4>
            <p className="text-sm text-gray-600">Receive product updates and offers</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={securitySettings.marketingEmails} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Billing</h3>
        <button
          onClick={() => setIsEditingBilling(!isEditingBilling)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          <span className="text-sm font-medium">Edit</span>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Billing name</label>
          {isEditingBilling ? (
            <input
              type="text"
              value={billingData.billingName}
              onChange={(e) => handleBillingInputChange('billingName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900 py-2">{billingData.billingName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Billing address</label>
          {isEditingBilling ? (
            <textarea
              value={billingData.billingAddress}
              onChange={(e) => handleBillingInputChange('billingAddress', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900 py-2">{billingData.billingAddress}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Billing country</label>
            {isEditingBilling ? (
              <input
                type="text"
                value={billingData.billingCountry}
                onChange={(e) => handleBillingInputChange('billingCountry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{billingData.billingCountry}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Billing state</label>
            {isEditingBilling ? (
              <input
                type="text"
                value={billingData.billingState}
                onChange={(e) => handleBillingInputChange('billingState', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{billingData.billingState}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Billing city</label>
            {isEditingBilling ? (
              <input
                type="text"
                value={billingData.billingCity}
                onChange={(e) => handleBillingInputChange('billingCity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{billingData.billingCity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Billing postal / ZIP code</label>
            {isEditingBilling ? (
              <input
                type="text"
                value={billingData.billingPostalCode}
                onChange={(e) => handleBillingInputChange('billingPostalCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{billingData.billingPostalCode}</p>
            )}
          </div>
        </div>

        {isEditingBilling && (
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              onClick={handleCancelBilling}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveBilling}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-600 mt-1">Manage your profile and account settings</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'security' && renderSecurityTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'billing' && renderBillingTab()}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;