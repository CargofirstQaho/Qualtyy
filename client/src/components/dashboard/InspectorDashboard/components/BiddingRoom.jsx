import React, { useState, useEffect } from "react";

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
  Star,
} from "lucide-react";
const calculateTimeLeft = (deadline) => {
  if (!deadline) return "Expired"; // ✅ changed from "No deadline"

  const now = new Date();
  const end = new Date(deadline);
  const diff = end - now;

  if (diff <= 0) {
    return "Expired";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
};
// Data Transformation Function
const transformBiddingData = (apiData) => {
  if (!apiData || apiData.length === 0) return [];
  return apiData.map((item) => ({
    id: item.id,
    inspectionType: `${item.commodityCategory} Inspection`,
    commodity: item.commodityCategory,
    subCommodity: item.subCommodity || null,
    quote: parseFloat(item.expectedBudgetUSD?.replace("$", "")) || 0,
    lowestBid: 0,
    location: item.inspectionLocation,
    clientName: item.customer?.full_name || "N/A",
    deadlineStatus: item.deadlineStatus,
    description: item.specialRequirements,
    requirements: item.certificates || [],
    status: item.deadlineStatus?.toLowerCase() || "active",
    timeLeft: calculateTimeLeft(item.deadline),
    contactNumber: item.customer?.mobile_number || "N/A",
    email: item.customer?.email_address || "N/A",

    propertyType: item.commodityCategory,
    yearBuilt: null,
    squareFootage:
      item.volume != null && item.siUnits
        ? `${item.volume} ${item.siUnits}`
        : "N/A",
    estimatedDuration: "N/A",
    priority: item.urgencyLevel,
    detailedDescription: item.specialRequirements,
    additionalNotes: item.specialRequirements,
    emergencyContact: "N/A",
    originalQuery: item,
    hasMyBid: false,
    myBidAmount: null,

    // ✅ ADD THESE MISSING FIELDS that handleMakeBid needs:
    customer: item.customer, // Preserve the entire customer object
    customerId: item.customer?.customer_id || item.customer?.id, // Extract customer ID
    commodityCategory: item.commodityCategory, // Preserve commodity category
    inspectionLocation: item.inspectionLocation, // Preserve location
    certificates: item.certificates,
    volume: item.volume,
    specialRequirements: item.specialRequirements,
  }));
};

const BiddingRoom = ({
  opportunities = [],
  confirmedBids = [],
  loading = false,
  error = null,
  onBidSubmitted,
  onNavigateToInspectionRoom,
  onRefresh,
  onPlaceBid,
  onMarkNotificationRead,
  currentInspectorId = "inspector-123",
}) => {
  const [biddingOpportunities, setBiddingOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [bidAmounts, setBidAmounts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("deadline");
  const [submittedBids, setSubmittedBids] = useState(new Set());
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  useEffect(() => {
    fetchBiddingData();
  }, []);

  // Function to fetch data from the API
  const fetchBiddingData = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(
        "http://localhost:3214/v1/api/raiseenquiry/with-customers"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Debug: Log the raw data structure
      console.log("Raw API data:", data.data);

      const transformedData = transformBiddingData(data.data);

      // Debug: Log transformed data
      console.log("Transformed data:", transformedData);

      setBiddingOpportunities(transformedData);
    } catch (err) {
      console.error("Failed to fetch bidding opportunities:", err);
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to call the API when the component mounts

  const handleMakeBid = async (opportunityId) => {
    const bidAmount = parseFloat(bidAmounts[opportunityId]);
    if (!bidAmount || bidAmount <= 0) {
      alert("Please enter a valid bid amount");
      return;
    }

    const opportunity = biddingOpportunities.find(
      (opp) => opp.id === opportunityId
    );

    if (!opportunity) {
      alert("Opportunity not found.");
      return;
    }

    const inspectorId = localStorage.getItem("inspectorId");
    const customerId =
      opportunity.customer?.customer_id || opportunity.customerId;

    // Determine budget
    let budgetValue = 0;
    if (opportunity.quote !== undefined && opportunity.quote !== null) {
      budgetValue = opportunity.quote;
    } else if (opportunity.originalQuery?.expectedBudgetUSD) {
      budgetValue = Number(
        opportunity.originalQuery.expectedBudgetUSD.replace(/[^0-9.-]+/g, "")
      );
    } else if (opportunity.expectedBudgetUSD) {
      budgetValue = Number(
        opportunity.expectedBudgetUSD.replace(/[^0-9.-]+/g, "")
      );
    }

    // Determine urgencyLevel: from opportunity or default to "Medium"
    const urgencyLevel = opportunity.urgencyLevel || "Medium";

    const payload = {
      inspectorId,
      opportunityId,
      customerId,
      bidAmount,
      category: opportunity.commodityCategory || "other",
      status: "active",
      location: opportunity.inspectionLocation || "Unknown",
      client_name: opportunity.customer?.full_name || "Unknown",
      volume: opportunity.volume || null,
      budget_usd: budgetValue,
      lowest_bid_usd: 0,
      certificate: Array.isArray(opportunity.certificates)
        ? opportunity.certificates.join(", ")
        : opportunity.certificates || null,
      inspectiontype: opportunity.inspectionType || null,
      special_description: opportunity.specialRequirements || null,
      siUnits: opportunity.siUnits || null,
      urgencyLevel, // Always sending a value
    };

    console.log("Payload being sent to server:", payload);

    try {
      const res = await fetch("http://localhost:3214/v1/api/Bidding/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Bid submitted successfully!");
        setBidAmounts({ ...bidAmounts, [opportunityId]: "" });
      } else {
        alert(data.message || "Failed to submit the bid.");
      }
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("An error occurred while submitting your bid.");
    }
  };

  const handleBidChange = (opportunityId, value) => {
    setBidAmounts((prev) => ({ ...prev, [opportunityId]: value }));
  };

  const handleViewDetails = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowDetailsModal(true);
  };

  const handleStartInspection = (bid) => {
    console.log("Starting inspection for bid:", bid);

    if (onMarkNotificationRead) {
      onMarkNotificationRead(bid.id);
    }

    const inspectionData = {
      id: bid.queryId || `inspection-${Date.now()}`,
      inspectionId: bid.queryId,
      queryId: bid.queryId,
      bidId: bid.bidId,
      customerId: bid.customerId || "customer-001",
      customerName: bid.customerName,
      inspectorId: currentInspectorId,
      inspectorName: "John Inspector",
      queryTitle: bid.queryTitle,
      title: bid.queryTitle,
      location: bid.location,
      amount: bid.amount,
      price: bid.amount,
      customer: bid.customerName,
      bidDetails: bid.bidDetails || {},
      startedAt: new Date().toISOString(),
      createdAt: bid.createdAt || new Date().toISOString(),
      status: "active",
      commodity: bid.queryTitle?.split(" ")[0] || "Commodity",
      volume: bid.volume || "N/A",
      urgency: bid.urgency || "Medium",
      deadline: bid.deadline || new Date().toISOString(),
    };

    if (onNavigateToInspectionRoom) {
      onNavigateToInspectionRoom(inspectionData);
    } else {
      console.warn("onNavigateToInspectionRoom function not provided");
      alert(
        "Navigation function not available. Please check the component setup."
      );
    }
  };

  const filteredOpportunities = biddingOpportunities
    .filter((opp) => {
      const matchesSearch =
        opp.inspectionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.clientName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterType === "all" ||
        (filterType === "urgent" && opp.status === "urgent") ||
        (filterType === "food" &&
          opp.commodity?.toLowerCase().includes("food")) ||
        (filterType === "textile" &&
          opp.commodity?.toLowerCase().includes("textile")) ||
        (filterType === "electronics" &&
          opp.commodity?.toLowerCase().includes("electronics")) ||
        (filterType === "rice" &&
          opp.commodity?.toLowerCase().includes("rice")) ||
        (filterType === "wheat" &&
          opp.commodity?.toLowerCase().includes("wheat"));

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "quote-high":
          return b.quote - a.quote;
        case "quote-low":
          return a.quote - b.quote;
        case "bids":
          return a.bidsCount - b.bidsCount;
        case "deadline":
        default:
          return new Date(a.deadline) - new Date(b.deadline);
      }
    });

  const getStatusDisplay = (status) => {
    switch (status) {
      case "urgent":
        return {
          color: "bg-red-900/30 text-red-300 border-red-800",
          icon: AlertCircle,
          text: "Urgent",
        };
      case "active":
      default:
        return {
          color: "bg-green-900/30 text-green-300 border-green-800",
          icon: CheckCircle,
          text: "Active",
        };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return "bg-red-900/30 text-red-300 border-red-800";
      case "urgent":
      case "high":
        return "bg-orange-900/30 text-orange-300 border-orange-800";
      case "medium":
        return "bg-blue-900/30 text-blue-300 border-blue-800";
      case "low":
        return "bg-green-900/30 text-green-300 border-green-800";
      default:
        return "bg-gray-700/30 text-gray-300 border-gray-600";
    }
  };

  const stats = {
    total: biddingOpportunities.length,
    active: biddingOpportunities.filter((opp) => opp.status === "active")
      .length,
    urgent: biddingOpportunities.filter((opp) => opp.status === "urgent")
      .length,
    totalValue: biddingOpportunities.reduce(
      (sum, opp) => sum + (opp.quote || 0),
      0
    ),
    confirmed: confirmedBids.length,
    myBids: biddingOpportunities.filter((opp) => opp.hasMyBid).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-xl border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Bidding Room
              </h1>
              <p className="text-gray-300 text-sm md:text-base">
                {isLoading
                  ? "Loading opportunities..."
                  : `${biddingOpportunities.length} inspection opportunities available`}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={fetchBiddingData}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <RefreshCw
                  size={18}
                  className={isLoading ? "animate-spin" : ""}
                />
                <span className="hidden sm:inline">
                  {isLoading ? "Refreshing..." : "Refresh"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Display */}
        {fetchError && (
          <div className="mb-6 bg-red-900/20 border border-red-800 rounded-xl p-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <span className="text-red-300 font-medium text-sm">
                Error: {fetchError}
              </span>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 lg:p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Total Opportunities
                </p>
                <h3 className="text-xl lg:text-2xl font-bold text-white mt-1">
                  {stats.total}
                </h3>
              </div>
              <div className="w-10 h-10 bg-blue-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                <Gavel size={20} className="text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 lg:p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Active
                </p>
                <h3 className="text-xl lg:text-2xl font-bold text-white mt-1">
                  {stats.active}
                </h3>
              </div>
              <div className="w-10 h-10 bg-green-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 lg:p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Urgent
                </p>
                <h3 className="text-xl lg:text-2xl font-bold text-white mt-1">
                  {stats.urgent}
                </h3>
              </div>
              <div className="w-10 h-10 bg-red-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} className="text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 lg:p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Total Value
                </p>
                <h3 className="text-xl lg:text-2xl font-bold text-white mt-1">
                  ${stats.totalValue.toLocaleString()}
                </h3>
              </div>
              <div className="w-10 h-10 bg-purple-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign size={20} className="text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 lg:p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  My Bids
                </p>
                <h3 className="text-xl lg:text-2xl font-bold text-white mt-1">
                  {stats.myBids}
                </h3>
              </div>
              <div className="w-10 h-10 bg-yellow-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 lg:p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Confirmed
                </p>
                <h3 className="text-xl lg:text-2xl font-bold text-white mt-1">
                  {stats.confirmed}
                </h3>
              </div>
              <div className="w-10 h-10 bg-emerald-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Confirmed Bids Section */}
        {confirmedBids.length > 0 && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl border border-green-800 shadow-lg p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-900/40 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Confirmed Bids
                    </h2>
                    <p className="text-green-300 text-sm">
                      Your winning bids - ready to start inspections!
                    </p>
                  </div>
                </div>
                <span className="bg-green-900/40 text-green-300 border border-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                  {confirmedBids.length} Won
                </span>
              </div>

              <div className="space-y-4">
                {confirmedBids.map((bid, index) => {
                  const uniqueKey =
                    bid.id || `${bid.queryId}-${bid.bidId}-${index}`;

                  return (
                    <div
                      key={uniqueKey}
                      className="bg-gray-800 rounded-xl p-4 border border-green-800/50 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                            <h3 className="text-lg font-semibold text-white truncate">
                              {bid.queryTitle || "Inspection Job"}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="bg-green-900/40 text-green-300 border border-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                SELECTED
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 text-sm">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-300 truncate">
                                {bid.location}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-300 truncate">
                                {bid.customerName}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              <span className="text-green-400 font-semibold">
                                ${bid.amount}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-300">
                                {bid.createdAt
                                  ? new Date(bid.createdAt).toLocaleDateString()
                                  : "Just now"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => handleStartInspection(bid)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
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

        {/* Search and Filter */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg mb-8">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by inspection type, location, or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:bg-gray-600 transition-colors placeholder-gray-400"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <div className="relative">
                  <Filter
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:bg-gray-600 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="all">All Types</option>
                    <option value="urgent">Urgent Only</option>
                    <option value="food">Food & Beverages</option>
                    <option value="textile">Textiles</option>
                    <option value="electronics">Electronics</option>
                    <option value="rice">Rice</option>
                    <option value="wheat">Wheat</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:bg-gray-600 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="deadline">Sort by Deadline</option>
                    <option value="quote-high">Budget: High to Low</option>
                    <option value="quote-low">Budget: Low to High</option>
                    <option value="bids">Least Competitive</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 shadow-lg text-center">
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-300">Loading bidding opportunities...</p>
          </div>
        )}

        {/* No Data State */}
        {!isLoading && filteredOpportunities.length === 0 && (
          <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 shadow-lg text-center">
            <Gavel size={48} className="mx-auto text-gray-500 mb-4" />
            <div className="text-gray-300 text-lg font-medium">
              No bidding opportunities found
            </div>
            <p className="text-gray-500 mt-2">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search criteria or filters"
                : "Check back later for new opportunities or ask customers to submit inspection requests"}
            </p>
          </div>
        )}

        {/* Bidding Opportunities */}
        {!isLoading && filteredOpportunities.length > 0 && (
          <div className="space-y-6">
            {filteredOpportunities.map((opportunity) => {
              const statusDisplay = getStatusDisplay(opportunity.status);
              const StatusIcon = statusDisplay.icon;
              const hasBidSubmitted =
                opportunity.hasMyBid || submittedBids.has(opportunity.id);

              return (
                <div
                  key={opportunity.id}
                  className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">
                            {opportunity.inspectionType}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center space-x-1 ${statusDisplay.color}`}
                            >
                              <StatusIcon size={14} />
                              <span>{statusDisplay.text}</span>
                            </span>
                            {hasBidSubmitted && (
                              <span className="px-3 py-1 bg-green-900/30 text-green-300 border border-green-800 text-xs rounded-full font-medium">
                                My Bid: ${opportunity.myBidAmount}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {opportunity.description}
                        </p>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center space-x-3 text-gray-400">
                        <MapPin
                          size={18}
                          className="text-gray-500 flex-shrink-0"
                        />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">
                            Location
                          </p>
                          <p className="text-sm font-medium text-white truncate">
                            {opportunity.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-400">
                        <User
                          size={18}
                          className="text-gray-500 flex-shrink-0"
                        />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">
                            Client
                          </p>
                          <p className="text-sm font-medium text-white truncate">
                            {opportunity.clientName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-400">
                        <Clock
                          size={18}
                          className="text-gray-500 flex-shrink-0"
                        />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">
                            Deadline
                          </p>
                          <p className="text-sm font-medium text-white">
                            {opportunity.timeLeft}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-400">
                        <Building
                          size={18}
                          className="text-gray-500 flex-shrink-0"
                        />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">
                            Volume
                          </p>
                          <p className="text-sm font-medium text-white truncate">
                            {opportunity.squareFootage}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3 text-sm">
                        Requirements:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.requirements?.map((req, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-900/30 text-blue-300 border border-blue-800 text-xs rounded-full"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bid Action & Details */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      {/* Budget and Bid */}
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                          <p className="text-xs text-gray-500 uppercase tracking-wider">
                            Customer Budget
                          </p>
                          <span className="text-xl font-bold text-green-400">
                            ${opportunity.quote}
                          </span>
                        </div>
                        {!hasBidSubmitted && (
                          <div className="flex flex-col">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                              My Bid
                            </p>
                            <div className="flex items-center">
                              <span className="text-lg font-bold text-yellow-400 mr-1">
                                $
                              </span>
                              <input
                                type="number"
                                placeholder="0.00"
                                value={bidAmounts[opportunity.id] || ""}
                                onChange={(e) =>
                                  handleBidChange(
                                    opportunity.id,
                                    e.target.value
                                  )
                                }
                                className="w-24 bg-gray-700 text-white rounded-lg px-2 py-1 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleViewDetails(opportunity)}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 text-sm"
                        >
                          <Eye size={16} />
                          <span>View Details</span>
                        </button>
                        {!hasBidSubmitted && (
                          <button
                            onClick={() => handleMakeBid(opportunity.id)}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm"
                          >
                            <Gavel size={16} />
                            <span>Place Bid</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-100 opacity-100 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-700 mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Opportunity Details
                </h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-6">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs">
                      Inspection Type
                    </p>
                    <p className="text-white font-medium">
                      {selectedOpportunity.inspectionType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs">
                      Property Type
                    </p>
                    <p className="text-white font-medium">
                      {selectedOpportunity.propertyType || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs">
                      Location
                    </p>
                    <p className="text-white font-medium">
                      {selectedOpportunity.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs">
                      Client
                    </p>
                    <p className="text-white font-medium">
                      {selectedOpportunity.clientName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs">
                      Customer Budget
                    </p>
                    <p className="text-white font-medium">
                      ${selectedOpportunity.quote}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs">
                      Estimated Duration
                    </p>
                    <p className="text-white font-medium">
                      {selectedOpportunity.estimatedDuration || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingDown className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-gray-500 uppercase tracking-wider text-xs">
                      Priority
                    </p>
                    <p
                      className={`font-medium ${getPriorityColor(
                        selectedOpportunity.priority
                      )} rounded-full px-3 py-1 text-xs inline-block`}
                    >
                      {selectedOpportunity.priority || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">
                    Detailed Description
                  </h4>
                  <p className="text-gray-300 leading-relaxed bg-gray-700/50 p-4 rounded-lg">
                    {selectedOpportunity.detailedDescription}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">
                    Requirements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedOpportunity.requirements?.length > 0 ? (
                      selectedOpportunity.requirements.map((req, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-900/30 text-blue-300 border border-blue-800 text-xs rounded-full"
                        >
                          {req}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">
                        No specific requirements mentioned.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-white mb-2 text-sm">
                  Client Contact Information
                </h4>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>{selectedOpportunity.contactNumber}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span>{selectedOpportunity.email}</span>
                </div>
              </div>

              <div className="text-right mt-6 pt-4 border-t border-gray-700">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200"
                >
                  Close
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
