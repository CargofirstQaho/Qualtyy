import React, { useState } from 'react';
import { 
  Gavel, 
  DollarSign, 
  Clock, 
  MapPin, 
  User, 
  Calendar,
  AlertCircle,
  TrendingDown,
  Eye,
  Filter,
  Search,
  RefreshCw,
  CheckCircle,
  ArrowRight,
  FileText,
  Phone,
  Mail,
  AlertTriangle,
  Home,
  Building
} from 'lucide-react';

const BiddingRoom = ({ onBidSubmitted }) => {
  const [bidAmounts, setBidAmounts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');
  const [submittedBids, setSubmittedBids] = useState(new Set());
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Sample bidding opportunities with enhanced details
  const [biddingOpportunities, setBiddingOpportunities] = useState([
    {
      id: 1,
      inspectionType: 'Residential Property Inspection',
      quote: 450,
      lowestBid: 420,
      location: 'New York, NY',
      clientName: 'John Smith',
      deadline: '2024-01-18 15:00',
      description: 'Complete inspection of 3-bedroom house including electrical, plumbing, and structural assessment.',
      requirements: ['Certified inspector', 'Available within 48 hours', 'Detailed report required'],
      status: 'active',
      bidsCount: 8,
      timeLeft: '2 days',
      // Enhanced details
      contactNumber: '+1 (555) 123-4567',
      email: 'john.smith@email.com',
      propertyType: 'Single Family Home',
      yearBuilt: '1995',
      squareFootage: '2,400 sq ft',
      estimatedDuration: '4-6 hours',
      priority: 'High',
      detailedDescription: 'This is a comprehensive inspection for a 3-bedroom, 2-bathroom single-family home built in 1995. The inspection should cover all major systems including electrical, plumbing, HVAC, structural integrity, and roof condition. The client is purchasing this home and needs a thorough assessment before closing. Special attention should be paid to the age of the electrical system and any potential plumbing issues.',
      additionalNotes: 'The property has a finished basement that also needs to be inspected. Access will be provided via lockbox, and the client prefers morning appointments.',
      emergencyContact: 'Jane Smith (wife) - +1 (555) 123-4568'
    },
    {
      id: 2,
      inspectionType: 'Commercial Building Safety',
      quote: 850,
      lowestBid: 780,
      location: 'Los Angeles, CA',
      clientName: 'ABC Corporation',
      deadline: '2024-01-20 12:00',
      description: 'Safety inspection of 5-story office building including fire safety systems and emergency exits.',
      requirements: ['Commercial certification', 'Insurance required', '24-hour turnaround'],
      status: 'active',
      bidsCount: 12,
      timeLeft: '4 days',
      // Enhanced details
      contactNumber: '+1 (555) 987-6543',
      email: 'safety@abccorp.com',
      propertyType: '5-Story Office Building',
      yearBuilt: '2010',
      squareFootage: '45,000 sq ft',
      estimatedDuration: '2-3 days',
      priority: 'Critical',
      detailedDescription: 'This is a critical safety inspection for a modern 5-story office building. The inspection must cover fire safety systems, emergency exits, structural integrity, elevator safety, and HVAC systems. This is required for insurance renewal and must meet current commercial building codes.',
      additionalNotes: 'The building is occupied during business hours (9 AM - 6 PM). Some inspections may need to be conducted after hours or on weekends.',
      emergencyContact: 'Building Manager - +1 (555) 987-6544'
    },
    {
      id: 3,
      inspectionType: 'Electrical System Check',
      quote: 320,
      lowestBid: 300,
      location: 'Chicago, IL',
      clientName: 'Mike Johnson',
      deadline: '2024-01-17 18:00',
      description: 'Electrical system inspection for older home renovation project.',
      requirements: ['Electrical certification', 'Same day service', 'Photo documentation'],
      status: 'urgent',
      bidsCount: 15,
      timeLeft: '18 hours',
      // Enhanced details
      contactNumber: '+1 (555) 456-7890',
      email: 'mike.johnson@email.com',
      propertyType: 'Historic Home',
      yearBuilt: '1925',
      squareFootage: '2,800 sq ft',
      estimatedDuration: '3-4 hours',
      priority: 'Urgent',
      detailedDescription: 'This is an electrical inspection for a 1925 historic home undergoing renovation. The electrical system has been partially updated, but we need a comprehensive assessment of the current state and recommendations for bringing it up to current code.',
      additionalNotes: 'This is an active construction site. Inspector must coordinate with the general contractor and follow safety protocols.',
      emergencyContact: 'General Contractor - +1 (555) 456-7891'
    },
    {
      id: 4,
      inspectionType: 'Plumbing Inspection',
      quote: 280,
      lowestBid: 260,
      location: 'Houston, TX',
      clientName: 'Sarah Wilson',
      deadline: '2024-01-19 10:00',
      description: 'Comprehensive plumbing inspection for new home purchase.',
      requirements: ['Licensed plumber', 'Weekend availability', 'Written report'],
      status: 'active',
      bidsCount: 6,
      timeLeft: '3 days',
      // Enhanced details
      contactNumber: '+1 (555) 321-0987',
      email: 'sarah.wilson@email.com',
      propertyType: 'Condominium',
      yearBuilt: '2005',
      squareFootage: '1,800 sq ft',
      estimatedDuration: '2-3 hours',
      priority: 'Medium',
      detailedDescription: 'Plumbing inspection for a 2-bedroom, 2-bathroom condominium built in 2005. Focus on water pressure, pipe condition, fixture functionality, and potential leak detection.',
      additionalNotes: 'The unit is currently vacant. Building management will provide access. Parking is available in the visitor lot.',
      emergencyContact: 'Real Estate Agent - +1 (555) 321-0988'
    },
    {
      id: 5,
      inspectionType: 'HVAC System Inspection',
      quote: 650,
      lowestBid: 600,
      location: 'Phoenix, AZ',
      clientName: 'Tech Solutions Inc',
      deadline: '2024-01-21 14:00',
      description: 'HVAC system inspection for large office complex with multiple units.',
      requirements: ['HVAC certification', 'Commercial experience', 'Detailed analysis'],
      status: 'active',
      bidsCount: 9,
      timeLeft: '5 days',
      // Enhanced details
      contactNumber: '+1 (555) 555-1234',
      email: 'facilities@techsolutions.com',
      propertyType: 'Corporate Office Complex',
      yearBuilt: '2018',
      squareFootage: '12,000 sq ft',
      estimatedDuration: '5-7 hours',
      priority: 'High',
      detailedDescription: 'HVAC inspection for a modern office complex with multiple zones and advanced climate control systems. Assessment should include energy efficiency analysis and recommendations for optimization.',
      additionalNotes: 'The facility operates 24/7 with multiple server rooms that require constant climate control. Inspection must not disrupt operations.',
      emergencyContact: 'Facilities Manager - +1 (555) 555-1235'
    }
  ]);

  // Handle bid submission
  const handleMakeBid = (opportunityId) => {
    const bidAmount = bidAmounts[opportunityId];
    if (!bidAmount || bidAmount <= 0) {
      alert('Please enter a valid bid amount');
      return;
    }

    const opportunity = biddingOpportunities.find(opp => opp.id === opportunityId);
    if (!opportunity) return;

    // Check if bid is reasonable (not too high above quote or too low below lowest bid)
    if (bidAmount > opportunity.quote * 1.2) {
      if (!window.confirm(`Your bid is ${Math.round(((bidAmount - opportunity.quote) / opportunity.quote) * 100)}% higher than the quoted amount. Continue?`)) {
        return;
      }
    }

    // Create new bid entry for bid history with complete details
    const newBid = {
      id: Date.now(), // Simple ID generation
      inspectionType: opportunity.inspectionType,
      quote: `$${opportunity.quote}`,
      myBid: `$${bidAmount}`,
      status: 'active',
      bidDate: new Date().toISOString().split('T')[0],
      location: opportunity.location,
      clientName: opportunity.clientName,
      // Additional details for bid history
      description: opportunity.description,
      requirements: opportunity.requirements,
      deadline: opportunity.deadline,
      originalOpportunityId: opportunityId,
      submittedAt: new Date().toISOString(),
      // Enhanced details
      contactNumber: opportunity.contactNumber,
      email: opportunity.email,
      propertyType: opportunity.propertyType,
      yearBuilt: opportunity.yearBuilt,
      squareFootage: opportunity.squareFootage,
      estimatedDuration: opportunity.estimatedDuration,
      priority: opportunity.priority
    };

    // Call the callback to update bid history in parent component
    if (onBidSubmitted) {
      onBidSubmitted(newBid);
    }

    // Add to submitted bids set
    setSubmittedBids(prev => new Set([...prev, opportunityId]));

    // Show success message
    alert(`Bid of $${bidAmount} placed successfully for ${opportunity.inspectionType}!\nThis bid has been added to your bid history.`);

    // Update lowest bid if our bid is lower
    const updatedOpportunities = biddingOpportunities.map(opp => {
      if (opp.id === opportunityId && bidAmount < opp.lowestBid) {
        return { ...opp, lowestBid: bidAmount, bidsCount: opp.bidsCount + 1 };
      } else if (opp.id === opportunityId) {
        return { ...opp, bidsCount: opp.bidsCount + 1 };
      }
      return opp;
    });

    setBiddingOpportunities(updatedOpportunities);
    setBidAmounts(prev => ({ ...prev, [opportunityId]: '' }));
  };

  const handleBidChange = (opportunityId, value) => {
    setBidAmounts(prev => ({ ...prev, [opportunityId]: value }));
  };

  // Handle view details
  const handleViewDetails = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowDetailsModal(true);
  };

  // Filter and sort opportunities
  const filteredOpportunities = biddingOpportunities
    .filter(opp => {
      const matchesSearch = opp.inspectionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           opp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           opp.clientName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || 
                           (filterType === 'urgent' && opp.status === 'urgent') ||
                           (filterType === 'residential' && opp.inspectionType.toLowerCase().includes('residential')) ||
                           (filterType === 'commercial' && opp.inspectionType.toLowerCase().includes('commercial'));
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'quote-high':
          return b.quote - a.quote;
        case 'quote-low':
          return a.quote - b.quote;
        case 'bids':
          return a.bidsCount - b.bidsCount;
        case 'deadline':
        default:
          return new Date(a.deadline) - new Date(b.deadline);
      }
    });

  // Get status color and icon
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'urgent':
        return { color: 'bg-red-100 text-red-800', icon: AlertCircle, text: 'Urgent' };
      case 'active':
      default:
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Active' };
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'urgent':
        return 'bg-orange-100 text-orange-800';
      case 'high':
        return 'bg-yellow-100 text-yellow-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: biddingOpportunities.length,
    active: biddingOpportunities.filter(opp => opp.status === 'active').length,
    urgent: biddingOpportunities.filter(opp => opp.status === 'urgent').length,
    totalValue: biddingOpportunities.reduce((sum, opp) => sum + opp.quote, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bidding Room</h1>
            <p className="text-gray-600 mt-1">Explore and bid on available inspection opportunities</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Opportunities</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Gavel size={20} className="text-blue-600" />
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
                <CheckCircle size={20} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Urgent</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.urgent}</h3>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle size={20} className="text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Value</p>
                <h3 className="text-2xl font-bold text-gray-900">${stats.totalValue.toLocaleString()}</h3>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign size={20} className="text-purple-600" />
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
                placeholder="Search by inspection type, location, or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="urgent">Urgent Only</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="deadline">Sort by Deadline</option>
                <option value="quote-high">Quote: High to Low</option>
                <option value="quote-low">Quote: Low to High</option>
                <option value="bids">Least Competitive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bidding Opportunities */}
        <div className="space-y-6">
          {filteredOpportunities.map((opportunity) => {
            const statusDisplay = getStatusDisplay(opportunity.status);
            const StatusIcon = statusDisplay.icon;
            const hasBidSubmitted = submittedBids.has(opportunity.id);
            
            return (
              <div key={opportunity.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{opportunity.inspectionType}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${statusDisplay.color}`}>
                          <StatusIcon size={14} />
                          <span>{statusDisplay.text}</span>
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{opportunity.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin size={16} />
                          <span className="text-sm">{opportunity.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <User size={16} />
                          <span className="text-sm">{opportunity.clientName}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock size={16} />
                          <span className="text-sm">Deadline: {opportunity.timeLeft}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.requirements.map((req, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* Quote */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign size={16} className="text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Quote</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">${opportunity.quote}</div>
                    </div>

                    {/* Lowest Bid */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingDown size={16} className="text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Lowest Bid</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">${opportunity.lowestBid}</div>
                      <div className="text-xs text-gray-500 mt-1">{opportunity.bidsCount} bids submitted</div>
                    </div>

                    {/* Make a Bid */}
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Gavel size={16} className="text-purple-600" />
                        <span className="text-sm font-medium text-gray-700">Your Bid</span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          placeholder="Enter amount"
                          value={bidAmounts[opportunity.id] || ''}
                          onChange={(e) => handleBidChange(opportunity.id, e.target.value)}
                          disabled={hasBidSubmitted}
                          className={`w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${hasBidSubmitted ? 'bg-gray-100 text-gray-500' : ''}`}
                        />
                      </div>
                    </div>

                    {/* Submit Bid or Status */}
                    <div className="flex items-end">
                      {!hasBidSubmitted ? (
                        <button
                          onClick={() => handleMakeBid(opportunity.id)}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105"
                        >
                          <Gavel size={16} />
                          <span>Submit Bid</span>
                        </button>
                      ) : (
                        <div className="w-full">
                          <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium text-center mb-2">
                            ✓ Bid Submitted
                          </div>
                        </div>
                      )}
                    </div>

                    {/* View Details Button */}
                    <div className="flex items-end">
                      <button
                        onClick={() => handleViewDetails(opportunity)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <Eye size={16} />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <Gavel size={48} className="mx-auto text-gray-400 mb-4" />
            <div className="text-gray-500 text-lg">No bidding opportunities found</div>
            <p className="text-gray-400 mt-2">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search criteria or filters' 
                : 'Check back later for new opportunities'}
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Details Modal */}
      {showDetailsModal && selectedOpportunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Opportunity Details</h2>
                  <p className="text-gray-600">ID: #{selectedOpportunity.id}</p>
                </div>
                <button 
                  onClick={() => setShowDetailsModal(false)}
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
                        <p className="text-gray-900">{selectedOpportunity.inspectionType}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          Client Name:
                        </span>
                        <p className="text-gray-900">{selectedOpportunity.clientName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          Location:
                        </span>
                        <p className="text-gray-900">{selectedOpportunity.location}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Deadline:
                        </span>
                        <p className="text-gray-900">{selectedOpportunity.timeLeft}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Priority:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedOpportunity.priority)}`}>
                          {selectedOpportunity.priority}
                        </span>
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
                        <span className="text-sm font-medium text-gray-600">Quote Amount:</span>
                        <p className="text-2xl font-bold text-green-600">${selectedOpportunity.quote}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Lowest Bid:</span>
                        <p className="text-2xl font-bold text-blue-600">${selectedOpportunity.lowestBid}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-sm font-medium text-gray-600">Total Bids:</span>
                      <p className="text-gray-900">{selectedOpportunity.bidsCount} bids submitted</p>
                    </div>
                  </div>

                  {/* Property Information */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      {selectedOpportunity.propertyType?.includes('Commercial') || selectedOpportunity.propertyType?.includes('Office') ? (
                        <Building className="w-5 h-5 mr-2 text-purple-600" />
                      ) : (
                        <Home className="w-5 h-5 mr-2 text-purple-600" />
                      )}
                      Property Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Property Type:</span>
                        <p className="text-gray-900">{selectedOpportunity.propertyType}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Year Built:</span>
                        <p className="text-gray-900">{selectedOpportunity.yearBuilt}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Square Footage:</span>
                        <p className="text-gray-900">{selectedOpportunity.squareFootage}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Estimated Duration:</span>
                        <p className="text-gray-900">{selectedOpportunity.estimatedDuration}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-yellow-600" />
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          Phone:
                        </span>
                        <p className="text-gray-900">{selectedOpportunity.contactNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          Email:
                        </span>
                        <p className="text-gray-900">{selectedOpportunity.email}</p>
                      </div>
                      {selectedOpportunity.emergencyContact && (
                        <div>
                          <span className="text-sm font-medium text-gray-600 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Emergency Contact:
                          </span>
                          <p className="text-gray-900">{selectedOpportunity.emergencyContact}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-indigo-600" />
                      Requirements
                    </h3>
                    <div className="space-y-2">
                      {selectedOpportunity.requirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-900">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bidding Status */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Gavel className="w-5 h-5 mr-2 text-cyan-600" />
                      Bidding Status
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Status:</span>
                        <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusDisplay(selectedOpportunity.status).color}`}>
                          {getStatusDisplay(selectedOpportunity.status).text}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Time Remaining:</span>
                        <p className="text-gray-900">{selectedOpportunity.timeLeft}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Competition Level:</span>
                        <p className="text-gray-900">
                          {selectedOpportunity.bidsCount < 5 ? 'Low' : 
                           selectedOpportunity.bidsCount < 10 ? 'Medium' : 'High'} 
                          ({selectedOpportunity.bidsCount} bidders)
                        </p>
                      </div>
                      {submittedBids.has(selectedOpportunity.id) && (
                        <div className="bg-green-100 p-3 rounded-lg">
                          <p className="text-green-800 text-sm font-medium">
                            ✓ You have successfully submitted a bid for this opportunity
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Description Section (Full Width) */}
              <div className="mt-6 bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Detailed Description</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{selectedOpportunity.detailedDescription}</p>
                
                {selectedOpportunity.additionalNotes && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Additional Notes:</h4>
                    <p className="text-blue-800 text-sm">{selectedOpportunity.additionalNotes}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                
                <div className="flex space-x-3">
                  {!submittedBids.has(selectedOpportunity.id) && (
                    <>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Your Bid: $</span>
                        <input
                          type="number"
                          placeholder="Amount"
                          value={bidAmounts[selectedOpportunity.id] || ''}
                          onChange={(e) => handleBidChange(selectedOpportunity.id, e.target.value)}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        onClick={() => {
                          handleMakeBid(selectedOpportunity.id);
                          setShowDetailsModal(false);
                        }}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-colors"
                      >
                        Submit Bid
                      </button>
                    </>
                  )}
                  
                  {submittedBids.has(selectedOpportunity.id) && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
                      ✓ Bid Already Submitted
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiddingRoom;