import React, { useState } from 'react';
import { 
  History, 
  Filter, 
  Search, 
  Calendar,
  ArrowUpDown,
  Eye,
  Edit3,
  MapPin,
  User,
  DollarSign,
  Clock,
  FileText,
  AlertTriangle
} from 'lucide-react';

const BidHistory = ({ newBids = [], onInspectionCancelled }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [bidStatuses, setBidStatuses] = useState({});
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [showInspectionDetails, setShowInspectionDetails] = useState(false);

  // Sample bid history data + new bids from bidding room
  const initialBidHistory = [
    {
      id: 1,
      inspectionType: 'Residential Property Inspection',
      quote: '$450',
      myBid: '$420',
      status: 'active',
      bidDate: '2024-01-15',
      location: 'New York, NY',
      clientName: 'John Smith',
      description: 'Complete residential property inspection including structural analysis, electrical systems, plumbing, and HVAC evaluation.',
      requirements: ['Certified Inspector', 'Insurance Required', '24hr Notice'],
      estimatedDuration: '4-6 hours',
      priority: 'High',
      contactNumber: '+1 (555) 123-4567',
      email: 'john.smith@email.com',
      propertyType: 'Single Family Home',
      yearBuilt: '1995',
      squareFootage: '2,400 sq ft'
    },
    {
      id: 2,
      inspectionType: 'Commercial Building Safety',
      quote: '$850',
      myBid: '$780',
      status: 'live',
      bidDate: '2024-01-14',
      location: 'Los Angeles, CA',
      clientName: 'ABC Corp',
      description: 'Comprehensive safety inspection for a 5-story commercial building including fire safety systems, emergency exits, and structural integrity.',
      requirements: ['Commercial License', 'Safety Certification', 'Team of 2+ Inspectors'],
      estimatedDuration: '2-3 days',
      priority: 'Critical',
      contactNumber: '+1 (555) 987-6543',
      email: 'safety@abccorp.com',
      propertyType: '5-Story Office Building',
      yearBuilt: '2010',
      squareFootage: '45,000 sq ft'
    },
    {
      id: 3,
      inspectionType: 'Electrical System Check',
      quote: '$320',
      myBid: '$300',
      status: 'completed',
      bidDate: '2024-01-13',
      location: 'Chicago, IL',
      clientName: 'Mike Johnson',
      description: 'Detailed electrical system inspection including panel box, wiring, outlets, and compliance with current electrical codes.',
      requirements: ['Electrical License', 'Code Knowledge'],
      estimatedDuration: '2-3 hours',
      priority: 'Medium',
      contactNumber: '+1 (555) 456-7890',
      email: 'mike.johnson@email.com',
      propertyType: 'Apartment Complex',
      yearBuilt: '1988',
      squareFootage: '8,500 sq ft'
    },
    {
      id: 4,
      inspectionType: 'Plumbing Inspection',
      quote: '$280',
      myBid: '$260',
      status: 'inactive',
      bidDate: '2024-01-12',
      location: 'Houston, TX',
      clientName: 'Sarah Wilson',
      description: 'Full plumbing system inspection including pipes, fixtures, water pressure, and potential leak detection.',
      requirements: ['Plumbing Certification', 'Leak Detection Equipment'],
      estimatedDuration: '3-4 hours',
      priority: 'Low',
      contactNumber: '+1 (555) 321-0987',
      email: 'sarah.wilson@email.com',
      propertyType: 'Condominium',
      yearBuilt: '2005',
      squareFootage: '1,800 sq ft'
    },
    {
      id: 5,
      inspectionType: 'HVAC System Inspection',
      quote: '$650',
      myBid: '$600',
      status: 'active',
      bidDate: '2024-01-11',
      location: 'Phoenix, AZ',
      clientName: 'Tech Solutions Inc',
      description: 'Comprehensive HVAC system evaluation including air conditioning, heating, ventilation, and energy efficiency assessment.',
      requirements: ['HVAC Certification', 'Energy Audit License'],
      estimatedDuration: '5-7 hours',
      priority: 'High',
      contactNumber: '+1 (555) 555-1234',
      email: 'facilities@techsolutions.com',
      propertyType: 'Corporate Office',
      yearBuilt: '2018',
      squareFootage: '12,000 sq ft'
    },
    {
      id: 6,
      inspectionType: 'Foundation Inspection',
      quote: '$520',
      myBid: '$480',
      status: 'completed',
      bidDate: '2024-01-10',
      location: 'Philadelphia, PA',
      clientName: 'David Brown',
      description: 'Thorough foundation and structural inspection including foundation walls, basement, crawl spaces, and structural integrity assessment.',
      requirements: ['Structural Engineering Knowledge', 'Foundation Specialist'],
      estimatedDuration: '4-5 hours',
      priority: 'Critical',
      contactNumber: '+1 (555) 111-2222',
      email: 'david.brown@email.com',
      propertyType: 'Historic Home',
      yearBuilt: '1925',
      squareFootage: '3,200 sq ft'
    }
  ];

  // Combine initial bids with new bids from bidding room
  const bidHistory = [...newBids, ...initialBidHistory].sort((a, b) => 
    new Date(b.bidDate || b.submittedAt) - new Date(a.bidDate || a.submittedAt)
  );

  // Handle view details
  const handleViewDetails = (bid) => {
    setSelectedInspection(bid);
    setShowInspectionDetails(true);
  };

  // Handle status change
  const handleStatusChange = (bidId, newStatus) => {
    setBidStatuses(prev => ({
      ...prev,
      [bidId]: newStatus
    }));

    // If status changed to "live", show inspection details
    if (newStatus === 'live') {
      const inspection = bidHistory.find(bid => bid.id === bidId);
      if (inspection) {
        setSelectedInspection(inspection);
        setShowInspectionDetails(true);
      }
    }
  };

  // Handle inspection cancellation
  const handleCancelInspection = () => {
    if (!selectedInspection) return;

    const cancellationMessage = {
      id: Date.now(),
      type: 'cancellation',
      inspectionId: selectedInspection.id,
      inspectionType: selectedInspection.inspectionType,
      clientName: selectedInspection.clientName,
      location: selectedInspection.location,
      message: `Inspection cancellation request for ${selectedInspection.inspectionType} (Client: ${selectedInspection.clientName}, Location: ${selectedInspection.location}). Please process the cancellation and notify all parties involved.`,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Send cancellation message to inspection room
    if (onInspectionCancelled) {
      onInspectionCancelled(cancellationMessage);
    }

    // Update the bid status to cancelled
    setBidStatuses(prev => ({
      ...prev,
      [selectedInspection.id]: 'cancelled'
    }));

    // Close the details modal
    setShowInspectionDetails(false);
    setSelectedInspection(null);

    alert('Cancellation request has been sent to the Inspection Room. You will receive a confirmation shortly.');
  };

  // Get current status (either from state or original data)
  const getCurrentStatus = (bid) => {
    return bidStatuses[bid.id] || bid.status;
  };

  // Filter bids based on search and status
  const filteredBids = bidHistory.filter(bid => {
    const matchesSearch = bid.inspectionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || getCurrentStatus(bid) === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get stats
  const stats = {
    total: bidHistory.length,
    active: bidHistory.filter(bid => getCurrentStatus(bid) === 'active').length,
    live: bidHistory.filter(bid => getCurrentStatus(bid) === 'live').length,
    completed: bidHistory.filter(bid => getCurrentStatus(bid) === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bid History</h1>
            <p className="text-gray-600 mt-1">Track and manage all your submitted bids</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-blue-600">
              <History size={20} className="mr-2" />
              <span className="text-sm font-medium">{stats.total} Total Bids</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Bids</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <History size={20} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Bids</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.active}</h3>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye size={20} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Live Bids</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.live}</h3>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ArrowUpDown size={20} className="text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.completed}</h3>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Edit3 size={20} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by inspection type, client name, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="live">Live</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bid History Table */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 bg-white/70 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Bid History</h2>
              <span className="text-sm text-gray-500">
                Showing {filteredBids.length} of {bidHistory.length} bids
              </span>
            </div>
          </div>
          
          <div className="p-6 bg-white/50 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Inspection Details
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Quote
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      My Bid
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBids.map((bid) => (
                    <tr key={bid.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="border border-gray-200 px-4 py-4">
                        <div className="font-medium text-gray-900">{bid.inspectionType}</div>
                        <div className="text-sm text-gray-500">Client: {bid.clientName}</div>
                        <div className="text-sm text-gray-500">Location: {bid.location}</div>
                      </td>
                      <td className="border border-gray-200 px-4 py-4">
                        <span className="text-lg font-semibold text-green-600">{bid.quote}</span>
                      </td>
                      <td className="border border-gray-200 px-4 py-4">
                        <span className="text-lg font-semibold text-blue-600">{bid.myBid}</span>
                      </td>
                      <td className="border border-gray-200 px-4 py-4">
                        <select
                          value={getCurrentStatus(bid)}
                          onChange={(e) => handleStatusChange(bid.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-medium border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(getCurrentStatus(bid))}`}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="live">Live</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="border border-gray-200 px-4 py-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar size={16} className="mr-2" />
                          <span className="text-sm">{bid.bidDate}</span>
                        </div>
                      </td>
                      <td className="border border-gray-200 px-4 py-4">
                        <button
                          onClick={() => handleViewDetails(bid)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                        >
                          <Eye size={14} />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredBids.length === 0 && (
              <div className="text-center py-12">
                <History size={48} className="mx-auto text-gray-400 mb-4" />
                <div className="text-gray-500 text-lg">No bids found</div>
                <p className="text-gray-400 mt-2">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search criteria or filters' 
                    : 'Start bidding on inspections to see your history here'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Inspection Details Modal */}
      {showInspectionDetails && selectedInspection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Inspection Details</h2>
                  <p className="text-gray-600">ID: #{selectedInspection.id}</p>
                </div>
                <button 
                  onClick={() => setShowInspectionDetails(false)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-600" />
                      Basic Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Inspection Type:</span>
                        <p className="text-gray-900">{selectedInspection.inspectionType}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          Client Name:
                        </span>
                        <p className="text-gray-900">{selectedInspection.clientName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          Location:
                        </span>
                        <p className="text-gray-900">{selectedInspection.location}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Bid Date:
                        </span>
                        <p className="text-gray-900">{selectedInspection.bidDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Financial Details */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                      Financial Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Original Quote:</span>
                        <p className="text-2xl font-bold text-green-600">{selectedInspection.quote}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Your Bid:</span>
                        <p className="text-2xl font-bold text-blue-600">{selectedInspection.myBid}</p>
                      </div>
                    </div>
                  </div>

                  {/* Property Information */}
                  {selectedInspection.propertyType && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Property Type:</span>
                          <p className="text-gray-900">{selectedInspection.propertyType}</p>
                        </div>
                        {selectedInspection.yearBuilt && (
                          <div>
                            <span className="text-sm font-medium text-gray-600">Year Built:</span>
                            <p className="text-gray-900">{selectedInspection.yearBuilt}</p>
                          </div>
                        )}
                        {selectedInspection.squareFootage && (
                          <div>
                            <span className="text-sm font-medium text-gray-600">Square Footage:</span>
                            <p className="text-gray-900">{selectedInspection.squareFootage}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      {selectedInspection.contactNumber && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Phone:</span>
                          <p className="text-gray-900">{selectedInspection.contactNumber}</p>
                        </div>
                      )}
                      {selectedInspection.email && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Email:</span>
                          <p className="text-gray-900">{selectedInspection.email}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Inspection Details */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-cyan-600" />
                      Inspection Details
                    </h3>
                    <div className="space-y-3">
                      {selectedInspection.estimatedDuration && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Estimated Duration:</span>
                          <p className="text-gray-900">{selectedInspection.estimatedDuration}</p>
                        </div>
                      )}
                      {selectedInspection.priority && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Priority:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedInspection.priority)}`}>
                            {selectedInspection.priority}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Requirements */}
                  {selectedInspection.requirements && (
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedInspection.requirements.map((req, index) => (
                          <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status Information */}
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className={`px-4 py-2 rounded-full font-medium ${getStatusColor(getCurrentStatus(selectedInspection))}`}>
                          {getCurrentStatus(selectedInspection).charAt(0).toUpperCase() + getCurrentStatus(selectedInspection).slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {getCurrentStatus(selectedInspection) === 'live' ? 'This inspection is currently live and active.' : 
                         getCurrentStatus(selectedInspection) === 'active' ? 'Waiting for client response.' :
                         getCurrentStatus(selectedInspection) === 'completed' ? 'Inspection has been completed successfully.' :
                         getCurrentStatus(selectedInspection) === 'cancelled' ? 'This inspection has been cancelled.' :
                         'Inspection is currently inactive.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section (Full Width) */}
              {selectedInspection.description && (
                <div className="mt-6 bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedInspection.description}</p>
                </div>
              )}

              {/* Cancellation Section */}
              {getCurrentStatus(selectedInspection) === 'live' && (
                <div className="mt-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border border-red-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 text-red-800 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Cancellation
                  </h3>
                  <p className="text-gray-700 mb-4">
                    If you need to cancel this live inspection, please click the button below. A cancellation request will be sent to the Inspection Room for processing.
                  </p>
                  <div className="bg-red-100 p-3 rounded-lg mb-4">
                    <p className="text-red-800 text-sm font-medium">
                      ⚠️ Warning: Cancelling a live inspection may result in penalties or affect your success rate. Please ensure you have a valid reason for cancellation.
                    </p>
                  </div>
                  <button
                    onClick={handleCancelInspection}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Cancel Inspection</span>
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowInspectionDetails(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {getCurrentStatus(selectedInspection) === 'active' && (
                  <button
                    onClick={() => handleStatusChange(selectedInspection.id, 'live')}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Mark as Live
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidHistory;