import React, { useState, useEffect } from 'react';
import { useQuery } from '../../../../../context/QueryContext';

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
  Building,
  X,
  ChevronDown,
  Star
} from 'lucide-react';

const BiddingRoom = ({ onBidSubmitted, onNavigateToInspectionRoom }) => {
  const [bidAmounts, setBidAmounts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');
  const [submittedBids, setSubmittedBids] = useState(new Set());
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [confirmedBids, setConfirmedBids] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // ✅ USE REAL DATA FROM YOUR CONTEXT
  const { 
    queries, 
    notifications, 
    getCurrentInspectorId, 
    markNotificationRead,
    refreshQueries,
    placeBid,
    loading,
    error,
    getActiveQueriesForInspector
  } = useQuery();

  // ✅ ADD STATE TO TRACK PROCESSED EVENTS
  const [processedEvents, setProcessedEvents] = useState(new Set());

  // ✅ HANDLE CONFIRMED BIDS FROM YOUR NOTIFICATION SYSTEM
  useEffect(() => {
    const handleBidConfirmed = (event) => {
      const bidData = event.detail;
      const currentInspectorId = getCurrentInspectorId();
      
      console.log('🔔 Received bid confirmed event:', bidData);
      console.log('🔍 Current inspector ID:', currentInspectorId);
      
      // ✅ CREATE UNIQUE EVENT ID TO PREVENT PROCESSING SAME EVENT MULTIPLE TIMES
      const eventId = `${bidData.queryId}-${bidData.bidId}-${bidData.inspectorId}-${bidData.amount}`;
      
      // ✅ CHECK IF WE'VE ALREADY PROCESSED THIS EVENT
      if (processedEvents.has(eventId)) {
        console.log('🚫 Event already processed, skipping:', eventId);
        return;
      }
      
      if (bidData.inspectorId === currentInspectorId) {
        console.log('✅ Bid confirmed for current inspector:', bidData);
        
        // ✅ MARK EVENT AS PROCESSED
        setProcessedEvents(prev => new Set([...prev, eventId]));
        
        // Add to confirmed bids list with better duplicate prevention
        setConfirmedBids(prev => {
          // Check for duplicates using multiple criteria
          const isDuplicate = prev.some(existing => 
            existing.id === bidData.id || 
            (existing.queryId === bidData.queryId && existing.bidId === bidData.bidId) ||
            (existing.queryTitle === bidData.queryTitle && existing.amount === bidData.amount && existing.customerName === bidData.customerName)
          );
          
          if (isDuplicate) {
            console.log('🚫 Duplicate bid detected, not adding:', bidData.id || eventId);
            return prev;
          }
          
          console.log('➕ Adding new confirmed bid:', bidData.id || eventId);
          return [bidData, ...prev];
        });
      } else {
        console.log('❌ Bid not for current inspector:', bidData.inspectorId, 'vs', currentInspectorId);
      }
    };

    // ✅ THROTTLED EVENT LISTENER TO PREVENT RAPID FIRING
    let eventTimeout;
    const throttledHandler = (event) => {
      if (eventTimeout) {
        clearTimeout(eventTimeout);
      }
      eventTimeout = setTimeout(() => {
        handleBidConfirmed(event);
      }, 100); // 100ms debounce
    };

    // Listen for bid confirmed events with throttling
    window.addEventListener('bidConfirmed', throttledHandler);

    return () => {
      window.removeEventListener('bidConfirmed', throttledHandler);
      if (eventTimeout) {
        clearTimeout(eventTimeout);
      }
    };
  }, [getCurrentInspectorId, processedEvents]);

  // ✅ SEPARATE EFFECT FOR LOADING NOTIFICATIONS (runs only when notifications change)
  useEffect(() => {
    const loadConfirmedBids = () => {
      const currentInspectorId = getCurrentInspectorId();
      if (notifications && notifications.length > 0) {
        const confirmedNotifications = notifications.filter(n =>
          n.type === 'bid_confirmed' &&
          n.inspectorId === currentInspectorId &&
          !n.read
        );

        if (confirmedNotifications.length > 0) {
          console.log('📋 Loading confirmed notifications from context:', confirmedNotifications.length);
          
          setConfirmedBids(prev => {
            const hasNewNotifications = confirmedNotifications.some(notification => 
              !prev.some(existing => 
                existing.id === notification.id ||
                (existing.queryId === notification.queryId && existing.bidId === notification.bidId)
              )
            );
            
            if (!hasNewNotifications && prev.length > 0) {
              console.log('📝 No new notifications, keeping current state');
              return prev;
            }
            
            console.log('🔄 Updating confirmed bids from notifications');
            return confirmedNotifications;
          });
        } else {
          setConfirmedBids(prev => {
            if (prev.length > 0) {
              console.log('🧹 Clearing confirmed bids - no notifications');
              return [];
            }
            return prev;
          });
        }
      }
    };

    const debounceTimeout = setTimeout(() => {
      loadConfirmedBids();
    }, 200);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [notifications, getCurrentInspectorId]);

  // ✅ TRANSFORM YOUR REAL QUERIES TO BIDDING OPPORTUNITIES
  const transformQueriesToOpportunities = (queries) => {
    if (!queries || queries.length === 0) return [];
    
    return queries
      .filter(query => query.status === 'Active')
      .map(query => {
        const currentInspectorId = getCurrentInspectorId();
        const hasMyBid = query.bids?.some(bid => bid.inspectorId === currentInspectorId);
        
        return {
          id: query.id,
          inspectionType: `${query.commodityDisplay || query.commodity} Quality Assessment`,
          commodity: query.commodity,
          subCommodity: query.subCommodity,
          quote: extractBudgetNumber(query.expectedBudget),
          lowestBid: getLowestBidAmount(query.bids),
          location: query.locationDisplay || `${query.location}, ${query.country}`,
          clientName: query.contactPerson || query.email?.split('@')[0] || 'Customer',
          deadline: query.inspectionDate || query.inspectionDateTo,
          description: query.description || `Quality inspection required for ${query.commodityDisplay || query.commodity}. The inspection should cover all relevant parameters to ensure compliance with international standards.`,
          requirements: getRequirementsFromQuery(query),
          status: getUrgencyStatus(query.urgency),
          bidsCount: query.bids?.length || 0,
          timeLeft: calculateTimeRemaining(query.inspectionDate || query.inspectionDateTo),
          contactNumber: query.phone || '+91-98765-43210',
          email: query.email,
          propertyType: query.commodityDisplay || query.commodity,
          yearBuilt: new Date().getFullYear(),
          squareFootage: query.volumeDisplay || `${query.volume} ${query.unit}`,
          estimatedDuration: getEstimatedDuration(query.inspectionTypes),
          priority: query.urgency || 'Medium',
          detailedDescription: query.description || `Quality inspection required for ${query.commodityDisplay || query.commodity}. The inspection should cover all relevant parameters to ensure compliance with international standards.`,
          additionalNotes: query.additionalRequirements || 'Please ensure all safety protocols are followed during inspection.',
          emergencyContact: query.emergencyContact || `${query.contactPerson} - ${query.phone}`,
          originalQuery: query,
          hasMyBid: hasMyBid,
          myBidAmount: hasMyBid ? query.bids.find(bid => bid.inspectorId === currentInspectorId)?.amount : null
        };
      });
  };

  // ✅ HELPER FUNCTIONS FOR YOUR REAL DATA
  const extractBudgetNumber = (budgetString) => {
    if (!budgetString) return 500;
    const match = budgetString.match(/\$?(\d+(?:,\d{3})*)/);
    return match ? parseInt(match[1].replace(/,/g, '')) : 500;
  };

  const getLowestBidAmount = (bids) => {
    if (!bids || bids.length === 0) return 0;
    return Math.min(...bids.map(bid => bid.amount || 0));
  };

  const getRequirementsFromQuery = (query) => {
    const requirements = [];
    
    if (query.selectedCertifications && query.selectedCertifications.length > 0) {
      requirements.push(...query.selectedCertifications);
    }
    
    if (query.inspectionTypes && query.inspectionTypes.length > 0) {
      query.inspectionTypes.forEach(type => {
        if (type === 'physical') requirements.push('Physical Inspection Required');
        if (type === 'chemical') requirements.push('Chemical Testing Required');
      });
    }
    
    if (query.urgency === 'High') {
      requirements.push('Urgent Timeline');
    }
    
    if (requirements.length === 0) {
      requirements.push('Certified inspector', 'Detailed report required');
    }
    
    return requirements;
  };

  const getUrgencyStatus = (urgency) => {
    return urgency === 'High' ? 'urgent' : 'active';
  };

  const getEstimatedDuration = (inspectionTypes) => {
    if (!inspectionTypes || inspectionTypes.length === 0) return '2-3 days';
    
    const hasPhysical = inspectionTypes.includes('physical');
    const hasChemical = inspectionTypes.includes('chemical');
    
    if (hasPhysical && hasChemical) return '3-5 days';
    if (hasChemical) return '2-4 days';
    return '1-2 days';
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
    if (diffDays <= 7) return `${diffDays} days`;
    return `${Math.ceil(diffDays / 7)} weeks`;
  };

  // ✅ GET REAL BIDDING OPPORTUNITIES FROM YOUR CONTEXT
  const biddingOpportunities = transformQueriesToOpportunities(queries);

  // ✅ HANDLE BID SUBMISSION USING YOUR CONTEXT
  const handleMakeBid = async (opportunityId) => {
    const bidAmount = parseFloat(bidAmounts[opportunityId]);
    if (!bidAmount || bidAmount <= 0) {
      alert('Please enter a valid bid amount');
      return;
    }

    const opportunity = biddingOpportunities.find(opp => opp.id === opportunityId);
    if (!opportunity) return;

    if (bidAmount > opportunity.quote * 1.2) {
      if (!window.confirm(`Your bid is ${Math.round(((bidAmount - opportunity.quote) / opportunity.quote) * 100)}% higher than the customer's budget. Continue?`)) {
        return;
      }
    }

    try {
      const bidData = {
        inspectorId: getCurrentInspectorId(),
        inspectorName: 'Inspector Name',
        company: 'Inspection Company',
        amount: bidAmount,
        message: `I can perform the ${opportunity.inspectionType} for $${bidAmount}.`,
        proposedTimeline: opportunity.estimatedDuration,
        rating: 4.8,
        experience: '5 years',
        completedInspections: 150,
        certifications: ['ISO 9001', 'NABL'],
        email: 'inspector@example.com',
        phone: '+91-98765-43210'
      };

      await placeBid(opportunityId, bidData);

      const newBid = {
        id: Date.now(),
        inspectionType: opportunity.inspectionType,
        quote: `$${opportunity.quote}`,
        myBid: `$${bidAmount}`,
        status: 'active',
        bidDate: new Date().toISOString().split('T')[0],
        location: opportunity.location,
        clientName: opportunity.clientName,
        description: opportunity.description,
        requirements: opportunity.requirements,
        deadline: opportunity.deadline,
        originalOpportunityId: opportunityId,
        submittedAt: new Date().toISOString(),
        contactNumber: opportunity.contactNumber,
        email: opportunity.email,
        propertyType: opportunity.propertyType,
        yearBuilt: opportunity.yearBuilt,
        squareFootage: opportunity.squareFootage,
        estimatedDuration: opportunity.estimatedDuration,
        priority: opportunity.priority,
        originalQuery: opportunity.originalQuery
      };

      if (onBidSubmitted) {
        onBidSubmitted(newBid);
      }

      setSubmittedBids(prev => new Set([...prev, opportunityId]));
      alert(`✅ Bid of $${bidAmount} placed successfully for ${opportunity.inspectionType}!`);
      setBidAmounts(prev => ({ ...prev, [opportunityId]: '' }));

    } catch (error) {
      console.error('❌ Error placing bid:', error);
      alert(`Failed to place bid: ${error.message}`);
    }
  };

  const handleBidChange = (opportunityId, value) => {
    setBidAmounts(prev => ({ ...prev, [opportunityId]: value }));
  };

  const handleViewDetails = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowDetailsModal(true);
  };

  const handleStartInspection = (bid) => {
    console.log('🚀 Starting inspection for bid:', bid);
    
    if (markNotificationRead) {
      markNotificationRead(bid.id);
    }
    
    const eventId = `${bid.queryId}-${bid.bidId}-${bid.inspectorId || getCurrentInspectorId()}-${bid.amount}`;
    setProcessedEvents(prev => new Set([...prev, eventId]));
    
    setConfirmedBids(prev => {
      const filtered = prev.filter(b => 
        b.id !== bid.id && 
        !(b.queryId === bid.queryId && b.bidId === bid.bidId) &&
        !(b.queryTitle === bid.queryTitle && b.amount === bid.amount && b.customerName === bid.customerName)
      );
      return filtered;
    });

    const inspectionData = {
      id: bid.queryId || `inspection-${Date.now()}`,
      inspectionId: bid.queryId,
      queryId: bid.queryId,
      bidId: bid.bidId,
      customerId: bid.customerId || 'customer-001',
      customerName: bid.customerName,
      inspectorId: getCurrentInspectorId(),
      inspectorName: 'John Inspector',
      queryTitle: bid.queryTitle,
      title: bid.queryTitle,
      location: bid.location,
      amount: bid.amount,
      price: bid.amount,
      customer: bid.customerName,
      bidDetails: bid.bidDetails || {},
      startedAt: new Date().toISOString(),
      createdAt: bid.createdAt || new Date().toISOString(),
      status: 'active',
      commodity: bid.queryTitle?.split(' ')[0] || 'Commodity',
      volume: bid.volume || 'N/A',
      urgency: bid.urgency || 'Medium',
      deadline: bid.deadline || new Date().toISOString()
    };

    if (onNavigateToInspectionRoom) {
      onNavigateToInspectionRoom(inspectionData);
    } else {
      console.warn('❌ onNavigateToInspectionRoom function not provided');
      alert('Navigation function not available. Please check the component setup.');
    }
  };

  // ✅ FILTER AND SORT OPPORTUNITIES
  const filteredOpportunities = biddingOpportunities
    .filter(opp => {
      const matchesSearch = opp.inspectionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.clientName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = filterType === 'all' ||
        (filterType === 'urgent' && opp.status === 'urgent') ||
        (filterType === 'food' && opp.commodity?.toLowerCase().includes('food')) ||
        (filterType === 'textile' && opp.commodity?.toLowerCase().includes('textile')) ||
        (filterType === 'electronics' && opp.commodity?.toLowerCase().includes('electronics')) ||
        (filterType === 'rice' && opp.commodity?.toLowerCase().includes('rice')) ||
        (filterType === 'wheat' && opp.commodity?.toLowerCase().includes('wheat'));

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
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // ✅ REAL STATS FROM YOUR DATA
  const stats = {
    total: biddingOpportunities.length,
    active: biddingOpportunities.filter(opp => opp.status === 'active').length,
    urgent: biddingOpportunities.filter(opp => opp.status === 'urgent').length,
    totalValue: biddingOpportunities.reduce((sum, opp) => sum + opp.quote, 0),
    confirmed: confirmedBids.length,
    myBids: biddingOpportunities.filter(opp => opp.hasMyBid).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                🏺 Bidding Room
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                {loading ? 'Loading opportunities...' : `${biddingOpportunities.length} inspection opportunities available`}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => refreshQueries()}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
              >
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">{loading ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <span className="text-red-800 font-medium text-sm">Error: {error}</span>
            </div>
          </div>
        )}

        {/* Stats Grid - Fully Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 lg:p-6 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wider">Total Opportunities</p>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{stats.total}</h3>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Gavel size={20} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 lg:p-6 border border-green-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wider">Active</p>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{stats.active}</h3>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 lg:p-6 border border-red-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wider">Urgent</p>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{stats.urgent}</h3>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} className="text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 lg:p-6 border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wider">Total Value</p>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">${stats.totalValue.toLocaleString()}</h3>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign size={20} className="text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 lg:p-6 border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wider">My Bids</p>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{stats.myBids}</h3>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 lg:p-6 border border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wider">Confirmed</p>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{stats.confirmed}</h3>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Confirmed Bids Section - Enhanced Mobile Layout */}
        {confirmedBids.length > 0 && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">🎉 Confirmed Bids</h2>
                    <p className="text-green-700 text-sm">Your winning bids - ready to start inspections!</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                  {confirmedBids.length} Won
                </span>
              </div>

              <div className="space-y-4">
                {confirmedBids.map((bid, index) => {
                  const uniqueKey = bid.id || `${bid.queryId}-${bid.bidId}-${index}`;
                  
                  return (
                    <div key={uniqueKey} className="bg-white rounded-xl p-4 border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {bid.queryTitle || 'Inspection Job'}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                SELECTED
                              </span>
                              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                                ID: {bid.id || 'No ID'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 text-sm">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              <span className="text-gray-700 truncate">{bid.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              <span className="text-gray-700 truncate">{bid.customerName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              <span className="text-green-600 font-semibold">${bid.amount}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              <span className="text-gray-700">
                                {bid.createdAt ? new Date(bid.createdAt).toLocaleDateString() : 'Just now'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => handleStartInspection(bid)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
                          >
                            <ArrowRight className="h-5 w-5" />
                            <span>Start Inspection</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter - Enhanced Mobile UI */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by inspection type, location, or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <div className="relative">
                  <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors appearance-none cursor-pointer"
                  >
                    <option value="all">All Types</option>
                    <option value="urgent">Urgent Only</option>
                    <option value="food">Food & Beverages</option>
                    <option value="textile">Textiles</option>
                    <option value="electronics">Electronics</option>
                    <option value="rice">Rice</option>
                    <option value="wheat">Wheat</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors appearance-none cursor-pointer"
                  >
                    <option value="deadline">Sort by Deadline</option>
                    <option value="quote-high">Budget: High to Low</option>
                    <option value="quote-low">Budget: Low to High</option>
                    <option value="bids">Least Competitive</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl p-12 border border-gray-200 shadow-sm text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bidding opportunities...</p>
          </div>
        )}

        {/* No Data State */}
        {!loading && filteredOpportunities.length === 0 && (
          <div className="bg-white rounded-xl p-12 border border-gray-200 shadow-sm text-center">
            <Gavel size={48} className="mx-auto text-gray-400 mb-4" />
            <div className="text-gray-500 text-lg font-medium">No bidding opportunities found</div>
            <p className="text-gray-400 mt-2">
              {searchTerm || filterType !== 'all'
                ? 'Try adjusting your search criteria or filters'
                : 'Check back later for new opportunities or ask customers to submit inspection requests'}
            </p>
          </div>
        )}

        {/* Bidding Opportunities - Enhanced Mobile-First Design */}
        {!loading && filteredOpportunities.length > 0 && (
          <div className="space-y-6">
            {filteredOpportunities.map((opportunity) => {
              const statusDisplay = getStatusDisplay(opportunity.status);
              const StatusIcon = statusDisplay.icon;
              const hasBidSubmitted = opportunity.hasMyBid || submittedBids.has(opportunity.id);

              return (
                <div key={opportunity.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{opportunity.inspectionType}</h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${statusDisplay.color}`}>
                              <StatusIcon size={14} />
                              <span>{statusDisplay.text}</span>
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              ID: {opportunity.id}
                            </span>
                            {hasBidSubmitted && (
                              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                My Bid: ${opportunity.myBidAmount}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{opportunity.description}</p>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <MapPin size={18} className="text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                          <p className="text-sm font-medium text-gray-900 truncate">{opportunity.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <User size={18} className="text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Client</p>
                          <p className="text-sm font-medium text-gray-900 truncate">{opportunity.clientName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Clock size={18} className="text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Deadline</p>
                          <p className="text-sm font-medium text-gray-900">{opportunity.timeLeft}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Building size={18} className="text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Volume</p>
                          <p className="text-sm font-medium text-gray-900 truncate">{opportunity.squareFootage}</p>
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.requirements.map((req, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bidding Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
                      {/* Budget */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <DollarSign size={18} className="text-green-600" />
                          <span className="text-sm font-semibold text-gray-700">Budget</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">${opportunity.quote}</div>
                      </div>

                      {/* Lowest Bid */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingDown size={18} className="text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">Lowest Bid</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          ${opportunity.lowestBid > 0 ? opportunity.lowestBid : 'No bids'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{opportunity.bidsCount} bids</div>
                      </div>

                      {/* Bid Input */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Gavel size={18} className="text-purple-600" />
                          <span className="text-sm font-semibold text-gray-700">
                            {hasBidSubmitted ? 'Your Bid' : 'Enter Bid'}
                          </span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                          <input
                            type="number"
                            placeholder="Enter amount"
                            value={hasBidSubmitted ? opportunity.myBidAmount : (bidAmounts[opportunity.id] || '')}
                            onChange={(e) => handleBidChange(opportunity.id, e.target.value)}
                            disabled={hasBidSubmitted}
                            className={`w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm ${hasBidSubmitted ? 'bg-gray-100 text-gray-500' : 'bg-white'}`}
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex items-end xl:col-span-1">
                        {!hasBidSubmitted ? (
                          <button
                            onClick={() => handleMakeBid(opportunity.id)}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
                          >
                            <Gavel size={18} />
                            <span>Submit Bid</span>
                          </button>
                        ) : (
                          <div className="w-full">
                            <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg text-sm font-semibold text-center mb-2">
                              ✓ Bid Submitted
                            </div>
                            <div className="text-xs text-gray-500 text-center">
                              ${opportunity.myBidAmount}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* View Details */}
                      <div className="flex items-end xl:col-span-1">
                        <button
                          onClick={() => handleViewDetails(opportunity)}
                          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                        >
                          <Eye size={18} />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Enhanced Mobile-First Modal */}
      {showDetailsModal && selectedOpportunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold text-gray-900">Opportunity Details</h2>
                  <p className="text-gray-600 text-sm">Query ID: {selectedOpportunity.id}</p>
                  <p className="text-blue-600 text-sm font-medium">
                    {selectedOpportunity.commodity} • {selectedOpportunity.subCommodity}
                  </p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-600" />
                      Basic Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Inspection Type:</span>
                        <p className="text-gray-900 font-medium">{selectedOpportunity.inspectionType}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Commodity:</span>
                        <p className="text-gray-900 font-medium">{selectedOpportunity.commodity}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Sub-Commodity:</span>
                        <p className="text-gray-900 font-medium">{selectedOpportunity.subCommodity || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          Client Name:
                        </span>
                        <p className="text-gray-900 font-medium">{selectedOpportunity.clientName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          Location:
                        </span>
                        <p className="text-gray-900 font-medium">{selectedOpportunity.location}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Deadline:
                        </span>
                        <p className="text-gray-900 font-medium">{selectedOpportunity.timeLeft}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Priority:</span>
                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(selectedOpportunity.priority)}`}>
                          {selectedOpportunity.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Details */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                      Financial Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Customer Budget:</span>
                        <p className="text-2xl font-bold text-green-600">${selectedOpportunity.quote}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Lowest Bid:</span>
                        <p className="text-2xl font-bold text-blue-600">
                          ${selectedOpportunity.lowestBid > 0 ? selectedOpportunity.lowestBid : 'No bids'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Total Bids:</span>
                      <p className="text-gray-900 font-medium">{selectedOpportunity.bidsCount} bids submitted</p>
                    </div>
                    {selectedOpportunity.hasMyBid && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <span className="text-sm font-medium text-yellow-800">Your Bid:</span>
                        <p className="text-xl font-bold text-yellow-900">${selectedOpportunity.myBidAmount}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-yellow-600" />
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          Email:
                        </span>
                        <p className="text-gray-900 font-medium break-all">{selectedOpportunity.email}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          Phone:
                        </span>
                        <p className="text-gray-900 font-medium">{selectedOpportunity.contactNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Emergency Contact:
                        </span>
                        <p className="text-gray-900 font-medium">{selectedOpportunity.emergencyContact}</p>
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-indigo-600" />
                      Requirements
                    </h3>
                    <div className="space-y-2">
                      {selectedOpportunity.requirements.map((req, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-900">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bidding Status */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Gavel className="w-5 h-5 mr-2 text-cyan-600" />
                      Bidding Status
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Status:</span>
                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusDisplay(selectedOpportunity.status).color}`}>
                          {getStatusDisplay(selectedOpportunity.status).text}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Time Remaining:</span>
                        <p className="text-gray-900 font-medium">{selectedOpportunity.timeLeft}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Competition Level:</span>
                        <p className="text-gray-900 font-medium">
                          {selectedOpportunity.bidsCount < 3 ? 'Low' :
                            selectedOpportunity.bidsCount < 8 ? 'Medium' : 'High'}
                          ({selectedOpportunity.bidsCount} bidders)
                        </p>
                      </div>
                      {selectedOpportunity.hasMyBid && (
                        <div className="bg-green-100 p-3 rounded-lg">
                          <p className="text-green-800 text-sm font-medium">
                            ✓ You have submitted a bid of ${selectedOpportunity.myBidAmount}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="mt-6 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Detailed Description</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{selectedOpportunity.detailedDescription}</p>

                {selectedOpportunity.additionalNotes && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Additional Notes:</h4>
                    <p className="text-blue-800 text-sm">{selectedOpportunity.additionalNotes}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Close
                </button>

                <div className="flex flex-col sm:flex-row gap-3">
                  {!selectedOpportunity.hasMyBid && (
                    <>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 whitespace-nowrap">Your Bid: $</span>
                        <input
                          type="number"
                          placeholder="Amount"
                          value={bidAmounts[selectedOpportunity.id] || ''}
                          onChange={(e) => handleBidChange(selectedOpportunity.id, e.target.value)}
                          className="flex-1 sm:w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <button
                        onClick={() => {
                          handleMakeBid(selectedOpportunity.id);
                          setShowDetailsModal(false);
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-colors font-semibold"
                      >
                        Submit Bid
                      </button>
                    </>
                  )}

                  {selectedOpportunity.hasMyBid && (
                    <div className="bg-green-100 text-green-800 px-6 py-3 rounded-lg font-semibold text-center">
                      ✓ Your Bid: ${selectedOpportunity.myBidAmount}
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