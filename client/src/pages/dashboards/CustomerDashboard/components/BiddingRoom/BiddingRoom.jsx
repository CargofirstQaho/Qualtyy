import React, { useState, useEffect } from 'react';
import {
  Gavel,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  Star,
  Award,
  MapPin,
  Phone,
  Mail,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  AlertCircle,
  Eye,
  Timer,
  User,
  ArrowUpDown,
  X,
  Wallet,
  Building,
  ChevronDown,
  ChevronUp,
  Filter,
  Search
} from 'lucide-react';
import { useQuery } from '../../../../../context/QueryContext';

const BiddingRoom = ({ onNavigateToActiveInspections }) => {
  // Get queries and related functions from context
  const {
    queries,
    getCustomerQueries,
    updateStatus,
    refreshQueries,
    loading: queryLoading,
    error: queryError,
    confirmInspector: confirmInspectorFromContext,
    getCurrentCustomerId,
    sendMessage,
    initializeInspectionChat
  } = useQuery();

  // State management
  const [customerQueries, setCustomerQueries] = useState([]);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [inspectorBids, setInspectorBids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [sortBy, setSortBy] = useState('amount');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [walletBalance, setWalletBalance] = useState(1500);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedBid, setExpandedBid] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Load customer queries on component mount
  useEffect(() => {
    loadCustomerQueries();
  }, [queries]);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        refreshQueries();
        loadCustomerQueries();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshQueries]);

  // Load customer's queries
  const loadCustomerQueries = () => {
    try {
      const customerEmail = 'current-customer@example.com';
      const userQueries = queries.filter(query =>
        query.email === customerEmail || query.status === 'Active'
      );

      setCustomerQueries(userQueries);
      if (userQueries.length > 0 && !selectedInspection) {
        setSelectedInspection(userQueries[0]);
      }
      console.log('Loaded customer queries:', userQueries.length);
    } catch (error) {
      console.error('Error loading customer queries:', error);
    }
  };

  // Load bids when inspection is selected
  useEffect(() => {
    if (selectedInspection) {
      setIsLoading(true);
      setTimeout(() => {
        const bids = selectedInspection.bids || [];
        const transformedBids = bids.map((bid, index) => ({
          id: bid.id || index,
          inspectorId: bid.inspectorId || 'inspector-001',
          inspectorName: bid.inspectorName || 'Inspector Name',
          company: bid.company || 'Inspection Company',
          rating: bid.rating || 4.5,
          experience: bid.experience || '5 years',
          location: bid.location || selectedInspection.locationDisplay || 'Location',
          specialization: bid.specialization || getSpecializationFromCommodity(selectedInspection.commodity),
          biddingAmount: bid.amount || 0,
          proposedTimeline: bid.estimatedDuration || '2-3 days',
          completedInspections: bid.completedInspections || Math.floor(Math.random() * 200) + 50,
          email: bid.email || `${bid.inspectorName?.toLowerCase().replace(' ', '.')}@inspection.com`,
          phone: bid.phone || '+91-98765-43210',
          certifications: bid.certifications || ['ISO 9001', 'NABL'],
          bidTime: new Date(bid.submittedAt).toLocaleString() || new Date().toLocaleString(),
          notes: bid.message || 'Professional inspection services with detailed reporting.',
          isLowestBid: false
        }));

        // Mark the lowest bid
        if (transformedBids.length > 0) {
          const lowestAmount = Math.min(...transformedBids.map(bid => bid.biddingAmount));
          transformedBids.forEach(bid => {
            bid.isLowestBid = bid.biddingAmount === lowestAmount;
          });
        }

        setInspectorBids(transformedBids);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedInspection]);

  // Helper function to get specialization based on commodity
  const getSpecializationFromCommodity = (commodity) => {
    const specializations = {
      'Food & Beverages': 'Food Quality',
      'Textiles & Garments': 'Textile Quality',
      'Electronics & Electrical': 'Electronics Testing',
      'Pharmaceuticals': 'Pharmaceutical Quality',
      'Chemicals': 'Chemical Analysis',
      'Automotive': 'Automotive Parts'
    };
    return specializations[commodity] || 'General Inspection';
  };

  // Transform customer queries to display format
  const transformQueryForDisplay = (query) => {
    return {
      id: query.id,
      inspectionType: `${query.commodityDisplay || query.commodity} Quality Assessment`,
      commodity: query.commodity,
      subCommodity: query.subCommodity,
      location: query.locationDisplay || `${query.location}, ${query.country}`,
      requestedDate: new Date(query.submittedAt).toLocaleDateString(),
      urgency: query.urgency,
      summary: query.description || `Quality inspection for ${query.commodityDisplay || query.commodity}`,
      customerBudget: extractBudgetNumber(query.expectedBudget),
      volume: query.volumeDisplay || `${query.volume} ${query.unit}`,
      deadline: getDeadlineFromDate(query.inspectionDate || query.inspectionDateTo),
      parameters: query.selectedCertifications || [],
      status: 'Active',
      timeRemaining: calculateTimeRemaining(query.inspectionDate || query.inspectionDateTo),
      numberOfBids: query.bidCount || 0,
      lowestBid: getLowestBidAmount(query.bids),
      averageBid: getAverageBidAmount(query.bids),
      bids: query.bids || []
    };
  };

  // Helper functions
  const extractBudgetNumber = (budgetString) => {
    if (!budgetString) return 1000;
    const match = budgetString.match(/\$?(\d+)/);
    return match ? parseInt(match[1]) : 1000;
  };

  const getDeadlineFromDate = (dateString) => {
    if (!dateString) return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    return new Date(dateString).toISOString();
  };

  const calculateTimeRemaining = (dateString) => {
    if (!dateString) return '7 days';
    const deadline = new Date(dateString);
    const now = new Date();
    const diffMs = deadline - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day';
    return `${diffDays} days`;
  };

  const getLowestBidAmount = (bids) => {
    if (!bids || bids.length === 0) return 0;
    return Math.min(...bids.map(bid => bid.amount || 0));
  };

  const getAverageBidAmount = (bids) => {
    if (!bids || bids.length === 0) return 0;
    const total = bids.reduce((sum, bid) => sum + (bid.amount || 0), 0);
    return Math.round(total / bids.length);
  };

  // Sort bids
  const sortedBids = [...inspectorBids].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'amount':
        aValue = a.biddingAmount;
        bValue = b.biddingAmount;
        break;
      case 'rating':
        aValue = a.rating;
        bValue = b.rating;
        break;
      case 'experience':
        aValue = parseInt(a.experience);
        bValue = parseInt(b.experience);
        break;
      case 'timeline':
        aValue = parseInt(a.proposedTimeline);
        bValue = parseInt(b.proposedTimeline);
        break;
      case 'inspections':
        aValue = a.completedInspections;
        bValue = b.completedInspections;
        break;
      default:
        aValue = a.biddingAmount;
        bValue = b.biddingAmount;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Handle bid confirmation
  const handleConfirmBid = (bid) => {
    setSelectedBid(bid);
    setShowConfirmModal(true);
  };

  // ✅ ENHANCED: Confirm inspector with immediate chat initialization
  const handleConfirmInspector = async () => {
    try {
      setIsProcessing(true);

      if (!selectedInspection || !selectedBid) {
        throw new Error('Missing inspection or bid data');
      }

      console.log('🔄 Customer confirming inspector:', {
        queryId: selectedInspection.id,
        bidId: selectedBid.id,
        inspectorId: selectedBid.inspectorId,
        inspectorName: selectedBid.inspectorName,
        amount: selectedBid.biddingAmount
      });

      // ✅ STEP 1: Confirm inspector using context function
      await confirmInspectorFromContext(
        selectedInspection.id,
        selectedBid.id,
        selectedBid.inspectorId
      );

      // ✅ STEP 2: Initialize chat immediately after confirmation
      const inspectionId = selectedInspection.id;
      
      await initializeInspectionChat(
        inspectionId,
        selectedBid.inspectorName,
        selectedInspection.contactPerson || 'Customer'
      );

      // ✅ STEP 3: Send initial welcome message from customer
      const welcomeMessage = {
        senderId: getCurrentCustomerId(),
        senderName: selectedInspection.contactPerson || 'Customer',
        senderType: 'customer',
        message: `Hello ${selectedBid.inspectorName}! I have confirmed your bid for ${selectedInspection.commodityDisplay || selectedInspection.commodity} inspection. Looking forward to working with you! The inspection amount is ${selectedBid.biddingAmount}.`,
        type: 'text'
      };

      await sendMessage(inspectionId, welcomeMessage);

      console.log('✅ Inspector confirmed and chat initialized');

      // ✅ STEP 4: Close modal and refresh
      setShowConfirmModal(false);
      setSelectedBid(null);
      
      // Refresh queries to update the status
      await refreshQueries();
      loadCustomerQueries();

      // ✅ STEP 5: Success message and navigation
      alert(`✅ Successfully hired ${selectedBid.inspectorName}! Redirecting to Active Inspections where you can chat.`);

      // ✅ STEP 6: Navigate to active inspections immediately
      setTimeout(() => {
        if (onNavigateToActiveInspections) {
          onNavigateToActiveInspections();
        }
      }, 1500);
    
    } catch (error) {
      console.error('❌ Error confirming inspector:', error);
      alert(`Failed to confirm inspector: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle add money functionality
  const handleAddMoney = () => {
    if (!addAmount || addAmount < (selectedBid.biddingAmount - walletBalance)) {
      alert('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setWalletBalance(prev => prev + parseFloat(addAmount));
      setAddAmount('');
      setShowAddMoney(false);
      setShowBankDetails(false);
      setIsProcessing(false);

      // Auto-confirm the inspector after adding money
      setTimeout(() => {
        handleConfirmInspector();
      }, 1000);
    }, 2000);
  };

  // Get urgency color
  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Get timeline color
  const getTimelineColor = (timeline) => {
    const days = parseInt(timeline);
    if (days <= 1) return 'text-green-600';
    if (days <= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Transform queries for display
  const displayQueries = customerQueries.map(query => transformQueryForDisplay(query));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-4 lg:py-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
              <Gavel className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="truncate">Bidding Room</span>
            </h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              Live bidding for your inspection requests - choose the best inspector for your needs
            </p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setAutoRefresh(!autoRefresh);
                if (!autoRefresh) {
                  refreshQueries();
                  loadCustomerQueries();
                }
              }}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2 text-sm sm:text-base ${
                autoRefresh 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{autoRefresh ? 'Auto Refresh' : 'Manual Refresh'}</span>
              <span className="sm:hidden">{autoRefresh ? 'Auto' : 'Refresh'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-4 lg:py-6 space-y-4 lg:space-y-6">
        {/* Display any errors */}
        {queryError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <span className="text-red-800 font-medium text-sm sm:text-base">Error: {queryError}</span>
            </div>
          </div>
        )}

        {/* Active Inspections List */}
        <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Your Active Inspection Requests</h3>

          {queryLoading ? (
            <div className="text-center py-8 lg:py-12">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 text-sm sm:text-base">Loading your inspection requests...</p>
            </div>
          ) : displayQueries.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {displayQueries.map((inspection) => (
                <div
                  key={inspection.id}
                  onClick={() => setSelectedInspection(customerQueries.find(q => q.id === inspection.id))}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedInspection?.id === inspection.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{inspection.inspectionType}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{inspection.location}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ml-2 ${getUrgencyColor(inspection.urgency)}`}>
                      {inspection.urgency}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget:</span>
                      <span className="font-medium">${inspection.customerBudget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bids:</span>
                      <span className="font-medium text-blue-600">{inspection.numberOfBids}</span>
                    </div>
                    {inspection.lowestBid > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lowest Bid:</span>
                        <span className="font-medium text-green-600">${inspection.lowestBid}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Left:</span>
                      <span className="font-medium text-red-600">{inspection.timeRemaining}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 lg:py-12">
              <Gavel className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Inspection Requests</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                You haven't submitted any inspection requests yet. Create one to start receiving bids!
              </p>
            </div>
          )}
        </div>

        {/* Selected Inspection Details */}
        {selectedInspection && (
          <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 lg:mb-6 gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                  {selectedInspection.commodityDisplay || selectedInspection.commodity} Quality Assessment
                </h3>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">ID: {selectedInspection.id}</p>
              </div>
              <div className="text-left lg:text-right w-full lg:w-auto">
                <div className="flex items-center space-x-2 mb-2">
                  <Timer className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <span className="text-red-600 font-medium text-sm sm:text-base">
                    {calculateTimeRemaining(selectedInspection.inspectionDate || selectedInspection.inspectionDateTo)}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Deadline: {new Date(selectedInspection.inspectionDate || selectedInspection.inspectionDateTo || Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
              {/* Inspection Summary */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Summary of Inspection</h4>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {selectedInspection.description || `Quality inspection required for ${selectedInspection.commodityDisplay || selectedInspection.commodity}. The inspection should cover all relevant parameters to ensure compliance with international standards.`}
                  </p>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Inspection Parameters</h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedInspection.selectedCertifications || []).map((param, index) => (
                      <span key={index} className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                        {param}
                      </span>
                    ))}
                    {(selectedInspection.inspectionTypes || []).map((type, index) => (
                      <span key={index} className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                        {type === 'physical' ? 'Physical Inspection' : 'Chemical Testing'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Details */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Key Details</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Commodity:</span>
                      <span className="font-medium truncate ml-2">{selectedInspection.commodity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Volume:</span>
                      <span className="font-medium truncate ml-2">{selectedInspection.volumeDisplay || `${selectedInspection.volume} ${selectedInspection.unit}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium truncate ml-2">{selectedInspection.locationDisplay || `${selectedInspection.location}, ${selectedInspection.country}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Requested:</span>
                      <span className="font-medium">{new Date(selectedInspection.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {selectedInspection.expectedBudget && (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center text-sm sm:text-base">
                      <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
                      Your Budget
                    </h4>
                    <div className="text-xl sm:text-2xl font-bold text-green-700">{selectedInspection.expectedBudget}</div>
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center text-sm sm:text-base">
                    <Users className="h-4 w-4 mr-1 flex-shrink-0" />
                    Bidding Status
                  </h4>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span>Total Bids:</span>
                      <span className="font-bold text-blue-700">{selectedInspection.bidCount || 0}</span>
                    </div>
                    {getLowestBidAmount(selectedInspection.bids) > 0 && (
                      <div className="flex justify-between">
                        <span>Lowest Bid:</span>
                        <span className="font-bold text-green-600">${getLowestBidAmount(selectedInspection.bids)}</span>
                      </div>
                    )}
                    {getAverageBidAmount(selectedInspection.bids) > 0 && (
                      <div className="flex justify-between">
                        <span>Average Bid:</span>
                        <span className="font-bold text-gray-700">${getAverageBidAmount(selectedInspection.bids)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inspector Bids Section */}
        {selectedInspection && (
          <div className="bg-white rounded-lg lg:rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 lg:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Inspector Bids ({inspectorBids.length})
                </h3>
                
                {/* Mobile Filter Toggle */}
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="sm:hidden flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Sort & Filter</span>
                    {showMobileFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  
                  {/* Desktop Sort */}
                  <div className="hidden sm:flex items-center space-x-2">
                    <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
                    <select
                      value={`${sortBy}-${sortOrder}`}
                      onChange={(e) => {
                        const [field, order] = e.target.value.split('-');
                        setSortBy(field);
                        setSortOrder(order);
                      }}
                      className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="amount-asc">Amount (Low to High)</option>
                      <option value="amount-desc">Amount (High to Low)</option>
                      <option value="rating-desc">Rating (High to Low)</option>
                      <option value="experience-desc">Experience (High to Low)</option>
                      <option value="timeline-asc">Timeline (Fast to Slow)</option>
                      <option value="inspections-desc">Completed Jobs (High to Low)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mobile Filters */}
              {showMobileFilters && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg sm:hidden">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
                      <select
                        value={`${sortBy}-${sortOrder}`}
                        onChange={(e) => {
                          const [field, order] = e.target.value.split('-');
                          setSortBy(field);
                          setSortOrder(order);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="amount-asc">Amount (Low to High)</option>
                        <option value="amount-desc">Amount (High to Low)</option>
                        <option value="rating-desc">Rating (High to Low)</option>
                        <option value="experience-desc">Experience (High to Low)</option>
                        <option value="timeline-asc">Timeline (Fast to Slow)</option>
                        <option value="inspections-desc">Completed Jobs (High to Low)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="p-8 lg:p-12 text-center">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  <span className="text-gray-600 text-sm sm:text-base">Loading bids...</span>
                </div>
              </div>
            ) : inspectorBids.length === 0 ? (
              <div className="p-8 lg:p-12 text-center">
                <Gavel className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Bids Yet</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Inspectors haven't started bidding on this request yet. Check back soon!
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Inspector
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center space-x-1">
                            <span>Bid Amount</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timeline
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Experience
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedBids.map((bid) => (
                        <tr key={bid.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-gray-600" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <div className="text-sm font-medium text-gray-900">{bid.inspectorName}</div>
                                  {bid.isLowestBid && (
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                      Lowest Bid
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">{bid.company}</div>
                                <div className="flex items-center space-x-2 mt-1">
                                  <MapPin className="h-3 w-3 text-gray-400" />
                                  <span className="text-xs text-gray-500">{bid.location}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-lg font-bold text-gray-900">${bid.biddingAmount}</div>
                            {selectedInspection.expectedBudget && (
                              <div className="text-sm text-gray-500">
                                {bid.biddingAmount < extractBudgetNumber(selectedInspection.expectedBudget) ? (
                                  <span className="flex items-center text-green-600">
                                    <TrendingDown className="h-3 w-3 mr-1" />
                                    Under budget
                                  </span>
                                ) : bid.biddingAmount > extractBudgetNumber(selectedInspection.expectedBudget) ? (
                                  <span className="flex items-center text-red-600">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Over budget
                                  </span>
                                ) : (
                                  <span className="text-green-600">Within budget</span>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${getTimelineColor(bid.proposedTimeline)}`}>
                              {bid.proposedTimeline}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{bid.experience}</div>
                            <div className="text-xs text-gray-500">{bid.completedInspections} jobs completed</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium text-gray-900">{bid.rating}</span>
                            </div>
                            <div className="text-xs text-gray-500">{bid.specialization}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleConfirmBid(bid)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Confirm</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden divide-y divide-gray-200">
                  {sortedBids.map((bid) => (
                    <div key={bid.id} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className="text-sm font-medium text-gray-900 truncate">{bid.inspectorName}</div>
                              {bid.isLowestBid && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex-shrink-0">
                                  Lowest
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 truncate">{bid.company}</div>
                            <div className="flex items-center space-x-1 mt-1">
                              <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                              <span className="text-xs text-gray-500 truncate">{bid.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3">
                          <div className="text-lg font-bold text-gray-900">${bid.biddingAmount}</div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs font-medium text-gray-900">{bid.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                        <div>
                          <span className="text-gray-600">Timeline:</span>
                          <div className={`font-medium ${getTimelineColor(bid.proposedTimeline)}`}>
                            {bid.proposedTimeline}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Experience:</span>
                          <div className="font-medium text-gray-900">{bid.experience}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Completed:</span>
                          <div className="font-medium text-gray-900">{bid.completedInspections} jobs</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Specialization:</span>
                          <div className="font-medium text-gray-900 truncate">{bid.specialization}</div>
                        </div>
                      </div>

                      {selectedInspection.expectedBudget && (
                        <div className="mb-3">
                          {bid.biddingAmount < extractBudgetNumber(selectedInspection.expectedBudget) ? (
                            <span className="flex items-center text-green-600 text-xs">
                              <TrendingDown className="h-3 w-3 mr-1" />
                              Under budget
                            </span>
                          ) : bid.biddingAmount > extractBudgetNumber(selectedInspection.expectedBudget) ? (
                            <span className="flex items-center text-red-600 text-xs">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Over budget
                            </span>
                          ) : (
                            <span className="text-green-600 text-xs">Within budget</span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setExpandedBid(expandedBid === bid.id ? null : bid.id)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Details</span>
                          {expandedBid === bid.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleConfirmBid(bid)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Confirm</span>
                        </button>
                      </div>

                      {/* Expanded Details */}
                      {expandedBid === bid.id && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="text-gray-600">Email:</span>
                              <div className="font-medium text-gray-900 break-all">{bid.email}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Phone:</span>
                              <div className="font-medium text-gray-900">{bid.phone}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Certifications:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {bid.certifications.map((cert, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                    {cert}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600">Notes:</span>
                              <div className="font-medium text-gray-900 mt-1">{bid.notes}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedBid && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Inspector Selection</h3>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Wallet Balance Check */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-900 flex items-center text-sm sm:text-base">
                    <Wallet className="h-4 w-4 mr-2 flex-shrink-0" />
                    Wallet Balance
                  </h4>
                  <span className="text-lg font-bold text-blue-900">${walletBalance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 text-sm">Required Amount:</span>
                  <span className="font-bold text-blue-900">${selectedBid.biddingAmount}</span>
                </div>
                {walletBalance < selectedBid.biddingAmount && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                    <p className="text-red-700 text-sm font-medium">
                      Insufficient balance! Need ${selectedBid.biddingAmount - walletBalance} more.
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base sm:text-lg font-medium text-gray-900 truncate">{selectedBid.inspectorName}</div>
                    <div className="text-sm text-gray-500 truncate">{selectedBid.company}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Bid Amount:</span>
                    <div className="font-bold text-gray-900">${selectedBid.biddingAmount}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Timeline:</span>
                    <div className="font-medium text-gray-900">{selectedBid.proposedTimeline}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="font-medium text-gray-900">{selectedBid.rating}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Experience:</span>
                    <div className="font-medium text-gray-900">{selectedBid.experience}</div>
                  </div>
                </div>
              </div>

              {walletBalance < selectedBid.biddingAmount && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">Add Money Required</p>
                      <p>You need to add money to your wallet before confirming this inspector.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
              {walletBalance >= selectedBid.biddingAmount ? (
                <button
                  onClick={handleConfirmInspector}
                  disabled={isProcessing}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  {isProcessing ? 'Processing...' : 'Confirm Booking'}
                </button>
              ) : (
                <button
                  onClick={() => setShowAddMoney(true)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Add Money to Wallet
                </button>
              )}
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Money to Wallet</h3>
              <button
                onClick={() => setShowAddMoney(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-red-600">Current Balance:</span>
                    <span className="font-bold text-red-900">${walletBalance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600">Required Amount:</span>
                    <span className="font-bold text-red-900">${selectedBid.biddingAmount}</span>
                  </div>
                  <div className="flex justify-between border-t border-red-200 pt-1">
                    <span className="text-red-600 font-medium">Minimum to Add:</span>
                    <span className="font-bold text-red-900">${selectedBid.biddingAmount - walletBalance}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Add
                </label>
                <input
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  placeholder={`Minimum: ${selectedBid.biddingAmount - walletBalance}`}
                  min={selectedBid.biddingAmount - walletBalance}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => setShowBankDetails(true)}
                  disabled={!addAmount || addAmount < (selectedBid.biddingAmount - walletBalance)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Proceed to Payment
                </button>
                <button
                  onClick={() => setShowAddMoney(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bank Details Modal */}
      {showBankDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Bank Transfer Details</h3>
              <button
                onClick={() => setShowBankDetails(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center text-sm sm:text-base">
                  <Building className="h-4 w-4 mr-2 flex-shrink-0" />
                  Bank Transfer Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-600">Bank Name:</span>
                    <span className="font-medium text-blue-900">AgriInspect Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">Account Number:</span>
                    <span className="font-medium text-blue-900">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">IFSC Code:</span>
                    <span className="font-medium text-blue-900">AGRI0001234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">Account Name:</span>
                    <span className="font-medium text-blue-900 break-all">AgriInspect Wallet</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Transfer Amount: ${addAmount}</p>
                    <p>Please mention your user ID in the transfer description for quick processing.</p>
                    <p className="mt-1 font-medium">After transfer, your booking will be automatically confirmed!</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={handleAddMoney}
                  disabled={isProcessing}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  {isProcessing ? 'Processing...' : 'Confirm Transfer & Book'}
                </button>
                <button
                  onClick={() => setShowBankDetails(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiddingRoom;