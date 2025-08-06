import React, { useState } from 'react';
import { 
  MapPin, 
  Package, 
  Calendar, 
  FileText,
  Plus,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Clock,
  Building,
  User,
  Phone,
  Mail,
  Award,
  X,
  Truck,
  Container,
  Shield,
  Settings
} from 'lucide-react';
import ParametersModal from '../ParametersModal/ParametersModal';
import { useQuery } from '../../../../../context/QueryContext';

const RaiseEnquiry = () => {
  // Get submitQuery from context
  const { submitQuery, loading: queryLoading, error: queryError } = useQuery();

  // Form state
  const [formData, setFormData] = useState({
    location: '',
    country: '',
    commodity: '',
    subCommodity: '',
    riceType: '',
    volume: '',
    unit: 'Kg',
    inspectionDateType: 'single',
    inspectionDate: '',
    inspectionDateFrom: '',
    inspectionDateTo: '',
    description: '',
    urgency: 'Medium',
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    expectedBudget: '',
    selectedCertifications: []
  });

  // Modal and inspection type state
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedSubCommodity, setSelectedSubCommodity] = useState('');
  const [selectedRiceType, setSelectedRiceType] = useState('');
  const [showParametersModal, setShowParametersModal] = useState(false);
  const [currentInspectionType, setCurrentInspectionType] = useState(null); // New state to track which inspection type modal to show
  const [inspectionTypes, setInspectionTypes] = useState([]);
  const [additionalServices, setAdditionalServices] = useState([]);
  const [otherCommodity, setOtherCommodity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedQueryId, setSubmittedQueryId] = useState(null);
  const [showCertificationDropdown, setShowCertificationDropdown] = useState(false);

  // Commodity data
  const commodityData = {
    "Food & Beverages": {
      "Rice": [
        "Basmati Rice", "Jasmine Rice", "Brown Rice", "White Rice", "Wild Rice",
        "Arborio Rice", "Black Rice", "Red Rice", "Sticky Rice", "Parboiled Rice",
        "Long Grain Rice", "Medium Grain Rice", "Short Grain Rice", "Organic Rice",
        "Non-GMO Rice", "Broken Rice", "Rice Bran", "Rice Flour"
      ],
      "Wheat": ["Wheat Flour", "Whole Wheat", "Durum Wheat"],
      "Pulses": ["Lentils", "Chickpeas", "Black Beans"],
      "Spices": ["Black Pepper", "Turmeric", "Cardamom"],
      "Tea & Coffee": ["Green Tea", "Black Tea", "Coffee Beans"],
      "Oil & Seeds": ["Sunflower Oil", "Coconut Oil", "Sesame Seeds"]
    },
    "Textiles & Garments": {
      "Cotton": ["Organic Cotton", "Conventional Cotton", "Pima Cotton"],
      "Silk": ["Mulberry Silk", "Tussar Silk", "Eri Silk"],
      "Wool": ["Merino Wool", "Cashmere", "Angora"],
      "Synthetic": ["Polyester", "Nylon", "Acrylic"]
    },
    "Electronics & Electrical": {
      "Components": ["Semiconductors", "Resistors", "Capacitors", "Circuit Boards"],
      "Devices": ["Smartphones", "Laptops", "Tablets", "Smart Watches"],
      "Home Appliances": ["Refrigerators", "Washing Machines", "Air Conditioners"]
    },
    "Pharmaceuticals": {
      "APIs": ["Active Pharmaceutical Ingredients"],
      "Finished Products": ["Tablets", "Capsules", "Syrups", "Injections"],
      "Medical Devices": ["Surgical Instruments", "Diagnostic Equipment"]
    },
    "Chemicals": {
      "Industrial": ["Sulfuric Acid", "Sodium Hydroxide", "Ammonia"],
      "Organic": ["Benzene", "Toluene", "Acetone"],
      "Specialty": ["Catalysts", "Polymers", "Adhesives"]
    },
    "Automotive": {
      "Parts": ["Engine Components", "Brake Systems", "Electrical Parts"],
      "Accessories": ["Tires", "Batteries", "Lighting"]
    },
    "Other": {}
  };

  const units = ['Kg', 'Tons', 'Pieces', 'Cartons', 'Pallets', 'Containers', 'Liters', 'Cubic Meters'];
  const urgencyLevels = [
    { value: 'Low', color: 'bg-green-100 text-green-700', description: 'Standard timeline' },
    { value: 'Medium', color: 'bg-yellow-100 text-yellow-700', description: 'Moderate priority' },
    { value: 'High', color: 'bg-red-100 text-red-700', description: 'Urgent requirement' }
  ];

  // Inspection types for multiple selection
  const inspectionTypeOptions = [
    { id: 'physical', label: 'Physical Inspection', description: 'Visual and physical examination' },
    { id: 'chemical', label: 'Chemical Testing', description: 'Laboratory analysis and testing' }
  ];

  // Additional services that appear after selecting inspection types
  const additionalServiceOptions = [
    { 
      id: 'psi', 
      label: 'PSI', 
      description: 'Pre-Shipment Inspection',
      icon: Shield
    },
    { 
      id: 'loading_track', 
      label: 'Loading Track', 
      description: 'Loading supervision and tracking',
      icon: Truck
    },
    { 
      id: 'stuffing_container', 
      label: 'Stuffing Container', 
      description: 'Container stuffing supervision',
      icon: Container
    }
  ];

  // Certification options for multi-select
  const certificationOptions = [
    { value: 'NABL', label: 'NABL', description: 'National Accreditation Board for Testing and Calibration Laboratories' },
    { value: 'NABCB', label: 'NABCB', description: 'National Accreditation Board for Certification Bodies' },
    { value: 'COC', label: 'COC', description: 'Certificate of Conformity' },
    { value: 'FOSFE', label: 'FOSFE', description: 'Federation of Seed & Farm Equipment' },
    { value: 'GAFTA', label: 'GAFTA', description: 'Grain and Feed Trade Association' },
    { value: 'ISO', label: 'ISO', description: 'International Organization for Standardization' }
  ];

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle certification selection/deselection
  const handleCertificationToggle = (certificationValue) => {
    const updatedCertifications = formData.selectedCertifications.includes(certificationValue)
      ? formData.selectedCertifications.filter(cert => cert !== certificationValue)
      : [...formData.selectedCertifications, certificationValue];
    
    handleInputChange('selectedCertifications', updatedCertifications);
  };

  // Remove certification
  const removeCertification = (certificationValue) => {
    const updatedCertifications = formData.selectedCertifications.filter(cert => cert !== certificationValue);
    handleInputChange('selectedCertifications', updatedCertifications);
  };

  // Handle commodity selection
  const handleCommodityChange = (commodity) => {
    setSelectedCommodity(commodity);
    setSelectedSubCommodity('');
    setSelectedRiceType('');
    handleInputChange('commodity', commodity);
    handleInputChange('subCommodity', '');
    handleInputChange('riceType', '');
  };

  const handleSubCommodityChange = (subCommodity) => {
    setSelectedSubCommodity(subCommodity);
    setSelectedRiceType('');
    handleInputChange('subCommodity', subCommodity);
    handleInputChange('riceType', '');
  };

  const handleRiceTypeChange = (riceType) => {
    setSelectedRiceType(riceType);
    handleInputChange('riceType', riceType);
  };

  // Modified function to handle inspection type selection
  const handleInspectionTypeChange = (typeId) => {
    const isCurrentlySelected = inspectionTypes.includes(typeId);
    
    if (isCurrentlySelected) {
      // If deselecting, remove from array and reset additional services
      const updatedTypes = inspectionTypes.filter(id => id !== typeId);
      setInspectionTypes(updatedTypes);
      if (updatedTypes.length === 0) {
        setAdditionalServices([]);
      }
    } else {
      // If selecting, add to array and open modal for this specific type
      const updatedTypes = [...inspectionTypes, typeId];
      setInspectionTypes(updatedTypes);
      
      // Check if commodity is selected and modal should be shown
      if (shouldShowParametersModal()) {
        setCurrentInspectionType(typeId); // Set the specific inspection type
        setShowParametersModal(true);
      }
    }
  };

  // Handle additional services selection
  const handleAdditionalServiceChange = (serviceId) => {
    const updatedServices = additionalServices.includes(serviceId)
      ? additionalServices.filter(id => id !== serviceId)
      : [...additionalServices, serviceId];
    
    setAdditionalServices(updatedServices);
  };

  const shouldShowParametersModal = () => {
    return (selectedCommodity === "Food & Beverages" && selectedSubCommodity === "Rice" && selectedRiceType) ||
           (selectedCommodity && selectedCommodity !== "Food & Beverages") ||
           (selectedCommodity === "Other");
  };

  // Function to open parameter modal for specific inspection type
  const openParametersModal = (inspectionType) => {
    setCurrentInspectionType(inspectionType);
    setShowParametersModal(true);
  };

  // Form validation
  const isFormValid = () => {
    const dateValid = formData.inspectionDateType === 'single' 
      ? formData.inspectionDate
      : formData.inspectionDateFrom && formData.inspectionDateTo;
      
    return formData.location && 
           formData.country && 
           selectedCommodity && 
           formData.volume && 
           dateValid &&
           inspectionTypes.length > 0 &&
           formData.contactPerson &&
           formData.email;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submissionData = {
        ...formData,
        commodity: selectedCommodity,
        subCommodity: selectedSubCommodity,
        riceType: selectedRiceType,
        inspectionTypes: inspectionTypes,
        additionalServices: additionalServices
      };

      console.log('Submitting query:', submissionData);
      const newQuery = await submitQuery(submissionData);
      console.log('Query submitted successfully:', newQuery);
      
      setIsSubmitted(true);
      setSubmittedQueryId(newQuery.id);
      alert(`Query submitted successfully! ID: ${newQuery.id}`);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmittedQueryId(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting query:', error);
      alert('Failed to submit query. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    alert('Draft saved successfully!');
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your inspection request has been submitted. You will receive a confirmation email shortly 
            and inspectors will start bidding on your project.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              <strong>Reference ID:</strong> {submittedQueryId || `INQ-${Date.now().toString().slice(-6)}`}
            </p>
          </div>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors duration-200 font-medium"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Raise New Inspection Enquiry</h2>
          <p className="text-gray-600">
            Fill out the form below to request an inspection. Our network of certified inspectors 
            will review your request and provide competitive quotes.
          </p>
        </div>

        {/* Display any submission errors */}
        {queryError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800 font-medium">Error: {queryError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Location & Basic Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inspection Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter inspection location"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="Enter country"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => handleInputChange('urgency', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                >
                  {urgencyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.value} - {level.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Commodity Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Commodity Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commodity Category *
                </label>
                <select 
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  value={selectedCommodity}
                  onChange={(e) => handleCommodityChange(e.target.value)}
                  required
                >
                  <option value="">Select Commodity Category</option>
                  {Object.keys(commodityData).map((commodity) => (
                    <option key={commodity} value={commodity}>{commodity}</option>
                  ))}
                </select>
              </div>

              {selectedCommodity && selectedCommodity !== "Other" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sub-Commodity *
                  </label>
                  <select 
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                    value={selectedSubCommodity}
                    onChange={(e) => handleSubCommodityChange(e.target.value)}
                    required
                  >
                    <option value="">Select Sub-Commodity</option>
                    {Object.keys(commodityData[selectedCommodity]).map((subCommodity) => (
                      <option key={subCommodity} value={subCommodity}>{subCommodity}</option>
                    ))}
                  </select>
                </div>
              )}

              {selectedCommodity === "Other" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specify Commodity *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter commodity name"
                    value={otherCommodity}
                    onChange={(e) => setOtherCommodity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                    required
                  />
                </div>
              )}

              {selectedCommodity === "Food & Beverages" && selectedSubCommodity === "Rice" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rice Type *
                  </label>
                  <select 
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                    value={selectedRiceType}
                    onChange={(e) => handleRiceTypeChange(e.target.value)}
                    required
                  >
                    <option value="">Select Rice Type</option>
                    {commodityData["Food & Beverages"]["Rice"].map((riceType) => (
                      <option key={riceType} value={riceType}>{riceType}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Volume *</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={formData.volume}
                    onChange={(e) => handleInputChange('volume', e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                    required
                  />
                  <select 
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Budget (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., $1,000 - $2,000"
                  value={formData.expectedBudget}
                  onChange={(e) => handleInputChange('expectedBudget', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Inspection Date */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Inspection Date *
            </h3>
            
            <div className="mb-6">
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="single"
                    checked={formData.inspectionDateType === 'single'}
                    onChange={(e) => handleInputChange('inspectionDateType', e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Single Day Inspection</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="range"
                    checked={formData.inspectionDateType === 'range'}
                    onChange={(e) => handleInputChange('inspectionDateType', e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Multi-Day Inspection</span>
                </label>
              </div>
            </div>
            
            {formData.inspectionDateType === 'single' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inspection Date
                </label>
                <input
                  type="date"
                  value={formData.inspectionDate}
                  onChange={(e) => handleInputChange('inspectionDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full md:w-auto px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  required
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.inspectionDateFrom}
                    onChange={(e) => handleInputChange('inspectionDateFrom', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.inspectionDateTo}
                    onChange={(e) => handleInputChange('inspectionDateTo', e.target.value)}
                    min={formData.inspectionDateFrom || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Inspection Type - Multiple Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Type of Inspection * (Select one or both)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {inspectionTypeOptions.map(type => (
                <div 
                  key={type.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    inspectionTypes.includes(type.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleInspectionTypeChange(type.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                      inspectionTypes.includes(type.id)
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {inspectionTypes.includes(type.id) && (
                        <CheckCircle className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{type.label}</h3>
                      <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      
                      {/* Configure Parameters Button - Show only if selected and parameters can be configured */}
                      {inspectionTypes.includes(type.id) && shouldShowParametersModal() && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the parent div's onClick
                            openParametersModal(type.id);
                          }}
                          className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium flex items-center space-x-1"
                        >
                          <Settings className="h-3 w-3" />
                          <span>Configure Parameters</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {inspectionTypes.length > 0 && (
              <div className="p-3 bg-blue-50 rounded-lg mb-4">
                <p className="text-sm text-blue-700">
                  Selected: {inspectionTypes.map(id => 
                    inspectionTypeOptions.find(type => type.id === id)?.label
                  ).join(', ')}
                </p>
              </div>
            )}

            {/* Additional Services */}
            {inspectionTypes.length > 0 && (
              <div className="mt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Additional Services (Optional)</h4>
                <p className="text-sm text-gray-600 mb-4">Select additional services you may need:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {additionalServiceOptions.map(service => {
                    const IconComponent = service.icon;
                    return (
                      <div 
                        key={service.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          additionalServices.includes(service.id)
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => handleAdditionalServiceChange(service.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                            additionalServices.includes(service.id)
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-300'
                          }`}>
                            {additionalServices.includes(service.id) && (
                              <CheckCircle className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <IconComponent className="h-4 w-4 text-gray-600" />
                              <h4 className="font-medium text-gray-900">{service.label}</h4>
                            </div>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {additionalServices.length > 0 && (
                  <div className="p-3 bg-green-50 rounded-lg mt-4">
                    <p className="text-sm text-green-700">
                      Additional Services Selected: {additionalServices.map(id => 
                        additionalServiceOptions.find(service => service.id === id)?.label
                      ).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Certifications Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Certifications
            </h3>
            
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">Select certifications required for this inspection (you can select multiple):</p>
              
              {formData.selectedCertifications.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Selected Certifications:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedCertifications.map((cert) => (
                      <div
                        key={cert}
                        className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{cert}</span>
                        <button
                          type="button"
                          onClick={() => removeCertification(cert)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Certifications
                </label>
                <button
                  type="button"
                  onClick={() => setShowCertificationDropdown(!showCertificationDropdown)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors text-left flex justify-between items-center"
                >
                  <span className="text-gray-500">
                    {formData.selectedCertifications.length > 0 
                      ? `${formData.selectedCertifications.length} certification(s) selected`
                      : 'Select certifications'
                    }
                  </span>
                  <div className={`transition-transform duration-200 ${showCertificationDropdown ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {showCertificationDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {certificationOptions.map((certification) => (
                      <div
                        key={certification.value}
                        className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                          formData.selectedCertifications.includes(certification.value) 
                            ? 'bg-blue-50' 
                            : ''
                        }`}
                        onClick={() => handleCertificationToggle(certification.value)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                            formData.selectedCertifications.includes(certification.value)
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {formData.selectedCertifications.includes(certification.value) && (
                              <CheckCircle className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{certification.label}</div>
                            <div className="text-sm text-gray-600">{certification.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {showCertificationDropdown && (
                  <div 
                    className="fixed inset-0 z-5" 
                    onClick={() => setShowCertificationDropdown(false)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter company name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder="Enter contact person name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Additional Details
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requirements / Description
              </label>
              <textarea
                rows={5}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe any special requirements, access instructions, or additional details about the inspection..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Selected Values Display */}
          {(selectedCommodity || selectedSubCommodity || selectedRiceType || inspectionTypes.length > 0 || additionalServices.length > 0) && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Selection Summary:</h4>
              
              {(selectedCommodity || selectedSubCommodity || selectedRiceType) && (
                <div className="mb-3">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Commodity:</span>
                  <div className="flex items-center space-x-2 text-sm mt-1">
                    <span className="px-3 py-1 bg-white rounded-full border border-gray-300">
                      {selectedCommodity}
                    </span>
                    {selectedSubCommodity && (
                      <>
                        <span className="text-gray-400">→</span>
                        <span className="px-3 py-1 bg-white rounded-full border border-gray-300">
                          {selectedSubCommodity}
                        </span>
                      </>
                    )}
                    {selectedRiceType && (
                      <>
                        <span className="text-gray-400">→</span>
                        <span className="px-3 py-1 bg-white rounded-full border border-gray-300">
                          {selectedRiceType}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              {inspectionTypes.length > 0 && (
                <div className="mb-3">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Inspection Types:</span>
                  <div className="flex items-center space-x-2 text-sm mt-1">
                    {inspectionTypes.map(typeId => (
                      <span key={typeId} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full border border-blue-300">
                        {inspectionTypeOptions.find(type => type.id === typeId)?.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {additionalServices.length > 0 && (
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Additional Services:</span>
                  <div className="flex items-center space-x-2 text-sm mt-1">
                    {additionalServices.map(serviceId => (
                      <span key={serviceId} className="px-3 py-1 bg-green-100 text-green-800 rounded-full border border-green-300">
                        {additionalServiceOptions.find(service => service.id === serviceId)?.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button 
              type="submit"
              disabled={!isFormValid() || isSubmitting || queryLoading}
              className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors duration-200 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || queryLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Submit Enquiry</span>
                </>
              )}
            </button>
            <button 
              type="button"
              onClick={handleSaveDraft}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Save as Draft</span>
            </button>
            <div className="text-sm text-gray-500 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>Fields marked with * are required</span>
            </div>
          </div>
        </form>

        {/* Parameters Modal */}
        <ParametersModal 
          isOpen={showParametersModal}
          onClose={() => setShowParametersModal(false)}
          selectedCommodity={selectedCommodity}
          selectedSubCommodity={selectedSubCommodity}
          selectedRiceType={selectedRiceType}
          inspectionTypes={[currentInspectionType]} // Pass only the current inspection type
          additionalServices={additionalServices}
          otherCommodity={otherCommodity}
        />
      </div>
    </div>
  );
};

export default RaiseEnquiry;