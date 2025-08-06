import React, { useState } from 'react';
import { X, Plus, Minus, Save, FileText } from 'lucide-react';

const ParametersModal = ({ 
  isOpen, 
  onClose, 
  selectedCommodity, 
  selectedSubCommodity, 
  selectedRiceType, 
  inspectionTypes,
  additionalServices,
  otherCommodity 
}) => {
  // State for original rice parameters (form fields)
  const [riceParameters, setRiceParameters] = useState({
    broken: '5%',
    purity: '98%',
    yellowKernel: '2%',
    damageKernel: '1%',
    redKernel: '0.5%',
    paddyKernel: '0.2%',
    chalkyRice: '3%',
    liveInsects: 'Nil',
    millingDegree: 'Well Milled',
    averageGrainLength: '6.2mm'
  });

  // State for bullet points (chemical and general physical)
  const [physicalParameters, setPhysicalParameters] = useState([
    'Visual inspection for color and appearance',
    'Check for foreign materials and contaminants',
    'Measure moisture content',
    'Assess packaging integrity'
  ]);
  
  const [chemicalParameters, setChemicalParameters] = useState([
    'Pesticide residue analysis',
    'Heavy metals testing',
    'Nutritional content analysis',
    'Microbiological testing'
  ]);

  // State for text areas (non-rice physical and chemical requirements)
  const [physicalRequirements, setPhysicalRequirements] = useState('');

  // State for new parameter input
  const [newChemicalParam, setNewChemicalParam] = useState('');
  const [newPhysicalParam, setNewPhysicalParam] = useState('');

  if (!isOpen) return null;

  // Get the current inspection type being configured
  const currentInspectionType = inspectionTypes && inspectionTypes.length > 0 ? inspectionTypes[0] : null;
  
  // Check if specific inspection types are selected
  const hasPhysicalInspection = currentInspectionType === 'physical';
  const hasChemicalInspection = currentInspectionType === 'chemical';

  // Handle rice parameter changes
  const handleParameterChange = (param, value) => {
    setRiceParameters(prev => ({ ...prev, [param]: value }));
  };

  // Add new parameter
  const addParameter = (type) => {
    if (type === 'chemical' && newChemicalParam.trim()) {
      setChemicalParameters([...chemicalParameters, newChemicalParam.trim()]);
      setNewChemicalParam('');
    } else if (type === 'physical' && newPhysicalParam.trim()) {
      setPhysicalParameters([...physicalParameters, newPhysicalParam.trim()]);
      setNewPhysicalParam('');
    }
  };

  // Remove parameter
  const removeParameter = (type, index) => {
    if (type === 'chemical') {
      setChemicalParameters(chemicalParameters.filter((_, i) => i !== index));
    } else if (type === 'physical') {
      setPhysicalParameters(physicalParameters.filter((_, i) => i !== index));
    }
  };

  // Edit parameter
  const editParameter = (type, index, newValue) => {
    if (type === 'chemical') {
      const updated = [...chemicalParameters];
      updated[index] = newValue;
      setChemicalParameters(updated);
    } else if (type === 'physical') {
      const updated = [...physicalParameters];
      updated[index] = newValue;
      setPhysicalParameters(updated);
    }
  };

  const handleSave = () => {
    // Save logic here
    console.log('Rice Parameters:', riceParameters);
    console.log('Physical Requirements:', physicalRequirements);
    console.log('Physical Parameters:', physicalParameters);
    console.log('Chemical Parameters:', chemicalParameters);
    console.log('Current Inspection Type:', currentInspectionType);
    onClose();
  };

  const getModalTitle = () => {
    let title = '';
    
    if (selectedCommodity === "Other") {
      title = `${otherCommodity || "Other Commodity"}`;
    } else if (selectedCommodity === "Food & Beverages" && selectedSubCommodity === "Rice" && selectedRiceType) {
      title = selectedRiceType;
    } else {
      title = selectedCommodity;
    }
    
    // Add inspection type to title
    if (hasPhysicalInspection) {
      title += " - Physical Inspection Parameters";
    } else if (hasChemicalInspection) {
      title += " - Chemical Testing Parameters";
    } else {
      title += " - Inspection Parameters";
    }
    
    return title;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{getModalTitle()}</h3>
            <p className="text-gray-600 mt-1">
              {hasPhysicalInspection && "Define specific physical inspection parameters and requirements"}
              {hasChemicalInspection && "Define specific chemical testing parameters and requirements"}
              {!hasPhysicalInspection && !hasChemicalInspection && "Define specific inspection parameters and requirements"}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Rice Physical Parameters (Original Form Fields) - Only for Physical Inspection */}
          {hasPhysicalInspection && selectedCommodity === "Food & Beverages" && selectedSubCommodity === "Rice" && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Physical Inspection Parameters</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(riceParameters).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </label>
                    {key === 'millingDegree' ? (
                      <select
                        value={value}
                        onChange={(e) => handleParameterChange(key, e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                      >
                        <option>Well Milled</option>
                        <option>Reasonably Well Milled</option>
                        <option>Lightly Milled</option>
                        <option>Under Milled</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleParameterChange(key, e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Physical Requirements for Other Commodities (Text Area) - Keep original behavior */}
          {hasPhysicalInspection && (selectedCommodity !== "Food & Beverages" || selectedSubCommodity !== "Rice") && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Physical Inspection Requirements</h4>
              <textarea
                rows={6}
                value={physicalRequirements}
                onChange={(e) => setPhysicalRequirements(e.target.value)}
                placeholder="Specify physical inspection requirements..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          )}

          {/* Chemical Parameters (Bullet Points) - Only for Chemical Inspection */}
          {hasChemicalInspection && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Chemical Testing Parameters
              </h4>
              
              <div className="space-y-3 mb-4">
                {chemicalParameters.map((param, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <input
                      type="text"
                      value={param}
                      onChange={(e) => editParameter('chemical', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => removeParameter('chemical', index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                <input
                  type="text"
                  value={newChemicalParam}
                  onChange={(e) => setNewChemicalParam(e.target.value)}
                  placeholder="Add new chemical testing parameter..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && addParameter('chemical')}
                />
                <button
                  onClick={() => addParameter('chemical')}
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Instructions for Chemical */}
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 mt-4">
                <h5 className="font-medium text-purple-900 mb-2">Instructions:</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Click on any parameter to edit it directly</li>
                  <li>• Use the + button to add new parameters</li>
                  <li>• Use the - button to remove unwanted parameters</li>
                  <li>• Press Enter in the input field to quickly add a parameter</li>
                </ul>
              </div>
            </div>
          )}

          {/* Additional Services Information */}
          {additionalServices && additionalServices.length > 0 && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="text-md font-semibold text-green-900 mb-2">Selected Additional Services:</h4>
              <div className="flex flex-wrap gap-2">
                {additionalServices.map(serviceId => (
                  <span key={serviceId} className="px-3 py-1 bg-green-100 text-green-800 rounded-full border border-green-300 text-sm">
                    {serviceId.toUpperCase()}
                  </span>
                ))}
              </div>
              <p className="text-sm text-green-700 mt-2">
                These services will be included with your {hasPhysicalInspection ? 'physical' : 'chemical'} inspection.
              </p>
            </div>
          )}

          {/* No Inspection Type Selected */}
          {!hasPhysicalInspection && !hasChemicalInspection && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No Inspection Type Selected</h4>
              <p className="text-gray-600">
                Please select an inspection type first to configure parameters.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={!hasPhysicalInspection && !hasChemicalInspection}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors duration-200 font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            <span>Save Parameters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParametersModal;