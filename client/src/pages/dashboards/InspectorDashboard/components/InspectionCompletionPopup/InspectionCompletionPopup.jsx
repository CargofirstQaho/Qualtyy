import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Download, 
  Eye, 
  X, 
  PartyPopper, 
  FileText,
  Clock,
  DollarSign,
  User,
  MapPin,
  Camera,
  Star
} from 'lucide-react';

const InspectionCompletionPopup = ({ 
  isVisible, 
  onClose, 
  inspectionData, 
  onDownloadReport, 
  onViewReport 
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      // Auto-hide confetti after 3 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const defaultInspectionData = {
    inspectionId: 'INS-001',
    inspectorName: 'Inspector',
    customerName: 'Customer',
    location: 'Location',
    amount: 'N/A',
    completedAt: new Date().toISOString(),
    photosCount: 0,
    duration: 'N/A',
    queryTitle: 'Inspection Completed'
  };

  const data = { ...defaultInspectionData, ...inspectionData };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                {['🎉', '🎊', '⭐', '✨', '🏆'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-white bg-opacity-20 rounded-full p-3">
                    <PartyPopper className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">🎉 Inspection Completed!</h2>
                    <p className="text-green-100 text-sm">Congratulations on successful completion</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-2 transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-2">{data.queryTitle}</h3>
                <p className="text-green-100 text-sm">
                  The inspection has been successfully completed and the final report is ready for download.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Inspection Summary */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                Inspection Summary
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Inspector</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{data.inspectorName}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Location</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{data.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Amount</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">${data.amount}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Completed</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(data.completedAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Camera className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Photos</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{data.photosCount} photos</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Duration</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{data.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                  <Star className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h5 className="font-semibold text-green-900 mb-1">Inspection Successfully Completed!</h5>
                  <p className="text-green-800 text-sm mb-2">
                    All inspection phases have been completed successfully. The final report has been generated and is ready for download.
                  </p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Inspection started and samples collected</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Analysis completed successfully</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Final report approved and generated</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onViewReport}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="h-5 w-5" />
                <span>View Report</span>
              </button>
              
              <button
                onClick={onDownloadReport}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </button>
              
              <button
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Inspection ID: {data.inspectionId}</span>
              <span>Report generated on {new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Hook to manage completion popup
export const useCompletionPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [inspectionData, setInspectionData] = useState(null);

  useEffect(() => {
    const handleCompletionPopup = (event) => {
      const data = event.detail;
      setInspectionData(data);
      setIsVisible(true);
    };

    window.addEventListener('showCompletionPopup', handleCompletionPopup);
    
    return () => {
      window.removeEventListener('showCompletionPopup', handleCompletionPopup);
    };
  }, []);

  const hidePopup = () => {
    setIsVisible(false);
    setInspectionData(null);
  };

  return {
    isVisible,
    inspectionData,
    hidePopup,
    showPopup: (data) => {
      setInspectionData(data);
      setIsVisible(true);
    }
  };
};

export default InspectionCompletionPopup;