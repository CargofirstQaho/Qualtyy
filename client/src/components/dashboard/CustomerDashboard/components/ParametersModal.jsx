import React, { useState } from "react";
import { X, Plus, Minus, Save, FileText } from "lucide-react";

const ParametersModal = ({
  isOpen,
  onClose,
  selectedCommodity,
  selectedSubCommodity,
  selectedRiceType,
  inspectionTypes,
  additionalServices,
  otherCommodity,
}) => {
  // State for original rice parameters (form fields)
  const [riceParameters, setRiceParameters] = useState({
    broken: "5%",
    purity: "98%",
    yellowKernel: "2%",
    damageKernel: "1%",
    redKernel: "0.5%",
    paddyKernel: "0.2%",
    chalkyRice: "3%",
    liveInsects: "Nil",
    millingDegree: "Well Milled",
    averageGrainLength: "6.2mm",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  // New state to hold messages about existing parameters
  const [duplicateMessages, setDuplicateMessages] = useState([]);

  // State for bullet points (chemical and general physical)
  const [physicalParameters, setPhysicalParameters] = useState([
    "Visual inspection for color and appearance",
    "Check for foreign materials and contaminants",
    "Measure moisture content",
    "Assess packaging integrity",
  ]);

  const [chemicalParameters, setChemicalParameters] = useState([
    "Pesticide residue analysis",
    "Heavy metals testing",
    "Nutritional content analysis",
    "Microbiological testing",
  ]);

  // State for text areas (non-rice physical and chemical requirements)
  const [physicalRequirements, setPhysicalRequirements] = useState("");

  // State for new parameter input
  const [newChemicalParam, setNewChemicalParam] = useState("");
  const [newPhysicalParam, setNewPhysicalParam] = useState("");

  if (!isOpen) return null;

  // Get the current inspection type being configured
  const currentInspectionType =
    inspectionTypes && inspectionTypes.length > 0 ? inspectionTypes[0] : null;

  // Check if specific inspection types are selected
  const hasPhysicalInspection = currentInspectionType === "physical";
  const hasChemicalInspection = currentInspectionType === "chemical";

  // Handle rice parameter changes
  const handleParameterChange = (param, value) => {
    setRiceParameters((prev) => ({ ...prev, [param]: value }));
  };

  // Add new parameter
  const addParameter = (type) => {
    if (type === "chemical" && newChemicalParam.trim()) {
      setChemicalParameters([...chemicalParameters, newChemicalParam.trim()]);
      setNewChemicalParam("");
    } else if (type === "physical" && newPhysicalParam.trim()) {
      setPhysicalParameters([...physicalParameters, newPhysicalParam.trim()]);
      setNewPhysicalParam("");
    }
  };

  // Remove parameter
  const removeParameter = (type, index) => {
    if (type === "chemical") {
      setChemicalParameters(chemicalParameters.filter((_, i) => i !== index));
    } else if (type === "physical") {
      setPhysicalParameters(physicalParameters.filter((_, i) => i !== index));
    }
  };

  // Edit parameter
  const editParameter = (type, index, newValue) => {
    if (type === "chemical") {
      const updated = [...chemicalParameters];
      updated[index] = newValue;
      setChemicalParameters(updated);
    } else if (type === "physical") {
      const updated = [...physicalParameters];
      updated[index] = newValue;
      setPhysicalParameters(updated);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setDuplicateMessages([]); // Reset duplicate messages on new save attempt

    let allApiCallsSuccessful = true;
    let anyDuplicatesFound = false;

    // --- Save Physical Inspection Parameters if selected ---
    if (hasPhysicalInspection) {
      try {
        let dataToSave;
        let apiEndpoint;

        if (
          selectedCommodity === "Food & Beverages" &&
          selectedSubCommodity === "Rice"
        ) {
          apiEndpoint = "http://localhost:3214/v1/api/Phyinspectionparam/save";
          dataToSave = {
            commodity: selectedCommodity,
            subCommodity: selectedSubCommodity,
            riceType: selectedRiceType,
            // Convert percentage strings to numbers for rice parameters
            broken: parseFloat(riceParameters.broken.replace("%", "")),
            purity: parseFloat(riceParameters.purity.replace("%", "")),
            yellowKernel: parseFloat(
              riceParameters.yellowKernel.replace("%", "")
            ),
            damageKernel: parseFloat(
              riceParameters.damageKernel.replace("%", "")
            ),
            redKernel: parseFloat(riceParameters.redKernel.replace("%", "")),
            paddyKernel: parseFloat(
              riceParameters.paddyKernel.replace("%", "")
            ),
            chalkyRice: parseFloat(riceParameters.chalkyRice.replace("%", "")),
            liveInsects:
              riceParameters.liveInsects === "Nil"
                ? 0
                : parseInt(riceParameters.liveInsects, 10),
            millingDegree: riceParameters.millingDegree,
            averageGrainLength: parseFloat(
              riceParameters.averageGrainLength.replace("mm", "")
            ),
            generalPhysicalParameters: physicalParameters,
          };
        } else {
          // New API endpoint for non-rice commodities
          apiEndpoint =
            "http://localhost:3214/v1/api/GeneralPhyinspectionparam/save";
          dataToSave = {
            commodity: selectedCommodity,
            otherCommodity: otherCommodity,
            physicalRequirements: physicalRequirements,
            generalPhysicalParameters: physicalParameters,
          };
        }

        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSave),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Physical API Error: ${response.status} - ${errorText}`
          );
        }

        console.log("Physical inspection parameters saved successfully!");
        const result = await response.json();
        console.log("Response from physical API:", result);
      } catch (err) {
        console.error("Error saving physical inspection parameters:", err);
        setError(`Failed to save physical parameters: ${err.message}`);
        allApiCallsSuccessful = false;
      }
    }

    // --- Save Chemical Inspection Parameters if selected ---
    if (hasChemicalInspection && allApiCallsSuccessful) {
      try {
        const apiEndpoint = "http://localhost:3214/v1/api/Cheminspparam/save";

        const formattedChemicalParameters = chemicalParameters.map(
          (paramName) => ({
            parameter_name: paramName,
          })
        );

        const dataToSave = {
          commodity: selectedCommodity,
          subCommodity: selectedSubCommodity,
          riceType: selectedRiceType,
          otherCommodity: otherCommodity,
          chemicalParameters: formattedChemicalParameters,
        };

        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSave),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Chemical API Error: ${response.status} - ${errorText}`
          );
        }

        console.log("Chemical inspection parameters saved successfully!");
        const result = await response.json();
        console.log("Response from chemical API:", result);

        // --- Handle existing parameters ---
        if (result.existing && result.existing.length > 0) {
          const messages = result.existing.map((p) => ({
            name: p.parameter_name,
            message: p.message,
          }));
          setDuplicateMessages(messages);
          anyDuplicatesFound = true;
        }
      } catch (err) {
        console.error("Error saving chemical inspection parameters:", err);
        setError(`Failed to save chemical parameters: ${err.message}`);
        allApiCallsSuccessful = false;
      }
    }

    // --- Final feedback and modal close ---
    if (
      allApiCallsSuccessful &&
      (hasPhysicalInspection || hasChemicalInspection) &&
      !anyDuplicatesFound // Only show success if no duplicates were found
    ) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } else if (!allApiCallsSuccessful) {
      // Error message is already set.
    } else if (anyDuplicatesFound) {
      // Don't close the modal or show a success message, just show the warning
      console.log("Duplicates found, showing warning message.");
    } else {
      onClose();
    }
    setLoading(false);
  };

  const getModalTitle = () => {
    let title = "";

    if (selectedCommodity === "Other") {
      title = `${otherCommodity || "Other Commodity"}`;
    } else if (
      selectedCommodity === "Food & Beverages" &&
      selectedSubCommodity === "Rice" &&
      selectedRiceType
    ) {
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
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl transition-all duration-300 transform animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white transition-colors duration-300 hover:text-gray-100">
              {getModalTitle()}
            </h3>
            <p className="text-gray-400 mt-1 transition-colors duration-300 hover:text-gray-300">
              {hasPhysicalInspection &&
                "Define specific physical inspection parameters and requirements"}
              {hasChemicalInspection &&
                "Define specific chemical testing parameters and requirements"}
              {!hasPhysicalInspection &&
                !hasChemicalInspection &&
                "Define specific inspection parameters and requirements"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-all duration-300 transform hover:scale-105 group"
          >
            <X className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
          {/* Rice Physical Parameters (Original Form Fields) - Only for Physical Inspection */}
          {hasPhysicalInspection &&
            selectedCommodity === "Food & Beverages" &&
            selectedSubCommodity === "Rice" && (
              <div className="animate-fade-in-up">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center transition-colors duration-300 hover:text-gray-100">
                  <FileText className="h-5 w-5 mr-2 text-blue-400 transition-transform duration-300 hover:scale-110" />
                  Physical Inspection Parameters
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(riceParameters).map(([key, value]) => (
                    <div
                      key={key}
                      className="transition-all duration-300 hover:transform hover:scale-[1.02]"
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300 hover:text-gray-200">
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, " $1")}
                      </label>
                      {key === "millingDegree" ? (
                        <select
                          value={value}
                          onChange={(e) =>
                            handleParameterChange(key, e.target.value)
                          }
                          className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white hover:border-gray-600"
                        >
                          <option className="bg-gray-800 text-white">
                            Well Milled
                          </option>
                          <option className="bg-gray-800 text-white">
                            Reasonably Well Milled
                          </option>
                          <option className="bg-gray-800 text-white">
                            Lightly Milled
                          </option>
                          <option className="bg-gray-800 text-white">
                            Under Milled
                          </option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleParameterChange(key, e.target.value)
                          }
                          className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Physical Requirements for Other Commodities (Text Area) - Keep original behavior */}
          {hasPhysicalInspection &&
            (selectedCommodity !== "Food & Beverages" ||
              selectedSubCommodity !== "Rice") && (
              <div className="animate-fade-in-up">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center transition-colors duration-300 hover:text-gray-100">
                  <FileText className="h-5 w-5 mr-2 text-blue-400 transition-transform duration-300 hover:scale-110" />
                  Physical Inspection Requirements
                </h4>
                <textarea
                  rows={6}
                  value={physicalRequirements}
                  onChange={(e) => setPhysicalRequirements(e.target.value)}
                  placeholder="Specify physical inspection requirements..."
                  className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none text-white placeholder-gray-400 hover:border-gray-600"
                />
              </div>
            )}

          {/* Chemical Parameters (Bullet Points) - Only for Chemical Inspection */}
          {hasChemicalInspection && (
            <div className="animate-fade-in-up">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center transition-colors duration-300 hover:text-gray-100">
                <FileText className="h-5 w-5 mr-2 text-orange-400 transition-transform duration-300 hover:scale-110" />
                Chemical Testing Parameters
              </h4>

              <div className="space-y-3 mb-4">
                {chemicalParameters.map((param, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 group transition-all duration-300 hover:transform hover:scale-[1.01]"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <input
                      type="text"
                      value={param}
                      onChange={(e) =>
                        editParameter("chemical", index, e.target.value)
                      }
                      className="flex-1 px-3 py-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                    />
                    <button
                      onClick={() => removeParameter("chemical", index)}
                      className="p-1 text-red-400 hover:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
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
                  className="flex-1 px-3 py-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                  onKeyPress={(e) =>
                    e.key === "Enter" && addParameter("chemical")
                  }
                />
                <button
                  onClick={() => addParameter("chemical")}
                  className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Instructions for Chemical */}
              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 mt-4 transition-all duration-300 hover:bg-purple-500/30">
                <h5 className="font-medium text-purple-300 mb-2">
                  Instructions:
                </h5>
                <ul className="text-sm text-purple-200 space-y-1">
                  <li>• Click on any parameter to edit it directly</li>
                  <li>• Use the + button to add new parameters</li>
                  <li>• Use the - button to remove unwanted parameters</li>
                  <li>
                    • Press Enter in the input field to quickly add a parameter
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Additional Services Information */}
          {additionalServices && additionalServices.length > 0 && (
            <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-4 transition-all duration-300 hover:bg-emerald-500/30 animate-fade-in-up">
              <h4 className="text-md font-semibold text-emerald-300 mb-2">
                Selected Additional Services:
              </h4>
              <div className="flex flex-wrap gap-2">
                {additionalServices.map((serviceId) => (
                  <span
                    key={serviceId}
                    className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 text-sm transition-all duration-300 hover:bg-emerald-500/30 hover:scale-105"
                  >
                    {serviceId.toUpperCase()}
                  </span>
                ))}
              </div>
              <p className="text-sm text-emerald-200 mt-2">
                These services will be included with your{" "}
                {hasPhysicalInspection ? "physical" : "chemical"} inspection.
              </p>
            </div>
          )}

          {/* No Inspection Type Selected */}
          {!hasPhysicalInspection && !hasChemicalInspection && (
            <div className="text-center py-8 animate-fade-in-up">
              <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:bg-gray-700">
                <FileText className="h-8 w-8 text-gray-400 transition-transform duration-300 hover:scale-110" />
              </div>
              <h4 className="text-lg font-medium text-white mb-2 transition-colors duration-300 hover:text-gray-100">
                No Inspection Type Selected
              </h4>
              <p className="text-gray-400 transition-colors duration-300 hover:text-gray-300">
                Please select an inspection type first to configure parameters.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 hover:border-gray-600 hover:text-white transition-all duration-300 transform hover:scale-105 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave} // ← triggers the function above
            disabled={!hasPhysicalInspection && !hasChemicalInspection}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            <Save className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
            <span>Save Parameters</span>
          </button>
        </div>
      </div>

      <style jsx>{`
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

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-track-gray-800::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }

        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }

        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default ParametersModal;
