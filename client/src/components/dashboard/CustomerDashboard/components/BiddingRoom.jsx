import React, { useState, useEffect } from "react";
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
  Search,
} from "lucide-react";

const BiddingRoom = ({ onNavigateToActiveInspections }) => {
  // State management
  const [customerQueries, setCustomerQueries] = useState([]);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [inspectorBids, setInspectorBids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [sortBy, setSortBy] = useState("amount");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [walletBalance, setWalletBalance] = useState(1500);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedBid, setExpandedBid] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [confirmedInspector, setConfirmedInspector] = useState(null);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

  // API endpoint

  // Fetch data from API
  // Fetch data from API
  const fetchBiddingData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3214/v1/api/Bidding/with-inspector"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const biddingData = result.data || [];

      const mappedData = biddingData.map((item) => {
        const commodities = item.inspector?.commodities || [];

        return {
          id: item.id,
          commodity: item.category,
          commodityDisplay: item.inspectiontype,
          expectedBudget: item.budget_usd,
          lowestBid: item.lowest_bid_usd,
          submittedAt: item.createdAt,
          urgency: item.urgencyLevel,
          volume: item.volume,
          siUnit: item.siUnit, // volume at the main object level
          location: item.inspectionLocation, // add location here if API provides it
          bids: [
            {
              id: item.id,
              biddingAmount: parseFloat(item.your_bid_usd),
              inspectorId: item.inspector_id,
              inspectorName: item.inspector?.name,
              // Combine name and experience
              company: commodities
                .map((c) => `${c.name} (${c.experience} yrs)`)
                .join(", "),
              proposedTimeline: "3-5 days",
              completedInspections: 10,
              volume: item.volume, // include volume in bid too
              location: item.inspectionLocation, // include location in bid
              isLowestBid: item.lowest_bid_usd === item.your_bid_usd,
            },
          ],
        };
      });

      setCustomerQueries(mappedData);

      if (mappedData.length > 0) {
        setSelectedInspection(mappedData[0]);
        setInspectorBids(mappedData[0].bids || []);
      }
    } catch (error) {
      console.error("Failed to fetch bidding data:", error);
      alert("Failed to fetch data. Please check the API server.");
      setCustomerQueries([]);
      setSelectedInspection(null);
      setInspectorBids([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchBiddingData();

    // Auto-refresh every 30 seconds if enabled
    let intervalId;
    if (autoRefresh) {
      intervalId = setInterval(() => {
        fetchBiddingData();
      }, 30000); // 30 seconds
    }

    // Cleanup interval on component unmount or when autoRefresh changes
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefresh]); // re-run effect if autoRefresh changes
  // Handle a new inspection selection
  useEffect(() => {
    if (selectedInspection) {
      setInspectorBids(selectedInspection.bids || []);
    }
  }, [selectedInspection]);

  // Helper functions
  const extractBudgetNumber = (budgetString) => {
    if (!budgetString) return 1000;
    const match = budgetString.match(/\$?(\d+)/);
    return match ? parseInt(match[1]) : 1000;
  };

  const calculateTimeRemaining = (dateString) => {
    if (!dateString) return "7 days";
    const deadline = new Date(dateString);
    const now = new Date();
    const diffMs = deadline - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day";
    return `${diffDays} days`;
  };

  const getLowestBidAmount = (bids) => {
    if (!bids || bids.length === 0) return 0;
    return Math.min(...bids.map((bid) => bid.amount || 0));
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
      case "amount":
        aValue = a.biddingAmount;
        bValue = b.biddingAmount;
        break;
      case "rating":
        aValue = a.rating;
        bValue = b.rating;
        break;
      case "experience":
        aValue = parseInt(a.experience);
        bValue = parseInt(b.experience);
        break;
      case "timeline":
        aValue = parseInt(a.proposedTimeline);
        bValue = parseInt(b.proposedTimeline);
        break;
      case "inspections":
        aValue = a.completedInspections;
        bValue = b.completedInspections;
        break;
      default:
        aValue = a.biddingAmount;
        bValue = b.biddingAmount;
    }

    if (sortOrder === "asc") {
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

  const handleConfirmInspector = async (bid) => {
    try {
      setIsProcessing(true);

      // Simulate API call
      setTimeout(() => {
        setConfirmedInspector(bid);
        setShowConfirmationMessage(true);
        setIsProcessing(false);

        // Hide confirmation message after 3 seconds
        setTimeout(() => {
          setShowConfirmationMessage(false);
        }, 3000);
      }, 1000);
    } catch (error) {
      console.error("Error confirming inspector:", error);
      alert(`Failed to confirm inspector: ${error.message}`);
      setIsProcessing(false);
    }
  };

  const handleAddMoney = () => {
    if (!addAmount || addAmount < selectedBid.biddingAmount - walletBalance) {
      alert("Please enter a valid amount");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setWalletBalance((prev) => prev + parseFloat(addAmount));
      setAddAmount("");
      setShowAddMoney(false);
      setShowBankDetails(false);
      setIsProcessing(false);

      setTimeout(() => {
        handleConfirmInspector();
      }, 1000);
    }, 2000);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTimelineColor = (timeline) => {
    const days = parseInt(timeline);
    if (days <= 1) return "text-emerald-400";
    if (days <= 3) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
              <Gavel className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 flex-shrink-0 text-purple-400" />
              <span className="truncate">Bidding Room</span>
            </h1>
            <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
              Live bidding for your inspection requests - choose the best
              inspector for your needs
            </p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center justify-center space-x-2 text-sm sm:text-base ${
                autoRefresh
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                  : "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <RefreshCw
                className={`h-4 w-4 ${autoRefresh ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">
                {autoRefresh ? "Auto Refresh" : "Manual Refresh"}
              </span>
              <span className="sm:hidden">
                {autoRefresh ? "Auto" : "Refresh"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Message */}
      {showConfirmationMessage && confirmedInspector && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white p-4 rounded-lg shadow-lg border border-emerald-400 animate-pulse">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">
              Inspector {confirmedInspector.inspectorName} has been confirmed!
            </span>
          </div>
        </div>
      )}

      <div className="px-4 sm:px-6 lg:px-8 py-4 lg:py-6 space-y-4 lg:space-y-6 max-w-7xl mx-auto">
        {/* Active Inspections List */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg lg:rounded-xl p-4 lg:p-6 transition-colors duration-300">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Your Active Inspection Requests
          </h3>

          {isLoading ? (
            <div className="text-center py-8 lg:py-12">
              <div className="w-12 h-12 border-4 border-gray-600 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-400 mt-4">
                Loading inspection requests...
              </p>
            </div>
          ) : customerQueries.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {customerQueries.map((inspection) => (
                <div
                  key={inspection.id}
                  onClick={() => setSelectedInspection(inspection)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                    selectedInspection?.id === inspection.id
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white text-sm sm:text-base truncate">
                        {inspection.commodityDisplay || inspection.commodity}{" "}
                        Quality Assessment
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400 truncate">
                        {inspection.inspectionLocation}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ml-2 transition-colors duration-300 ${getUrgencyColor(
                        inspection.urgency
                      )}`}
                    >
                      {inspection.urgency}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Budget:</span>
                      <span className="font-medium text-white">
                        ${inspection.expectedBudget || "0"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bids:</span>
                      <span className="font-medium text-purple-400">
                        {inspection.bids?.length || 0}
                      </span>
                    </div>
                    {getLowestBidAmount(inspection.bids) > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lowest Bid:</span>
                        <span className="font-medium text-emerald-400">
                          ${getLowestBidAmount(inspection.bids)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Volume:</span>
                      <span className="font-medium text-white">
                        {inspection.volume} {inspection.unit || "units"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 lg:py-12">
              <Gavel className="h-12 w-12 sm:h-16 sm:w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                No Inspection Requests
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                You haven't submitted any inspection requests yet. Create one to
                start receiving bids!
              </p>
            </div>
          )}
        </div>

        {/* Selected Inspection Details */}
        {selectedInspection && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg lg:rounded-xl p-4 lg:p-6 transition-colors duration-300">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 lg:mb-6 gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white truncate">
                  {selectedInspection.commodityDisplay ||
                    selectedInspection.commodity}{" "}
                  Quality Assessment
                </h3>
                <p className="text-gray-400 mt-1 text-sm sm:text-base">
                  ID: {selectedInspection.id}
                </p>
              </div>
              <div className="text-left lg:text-right w-full lg:w-auto">
                <div className="flex items-center space-x-2 mb-2">
                  <Timer className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <span className="text-red-400 font-medium text-sm sm:text-base">
                    {calculateTimeRemaining(selectedInspection.inspectionDate)}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400">
                  Deadline:{" "}
                  {new Date(
                    selectedInspection.inspectionDate ||
                      Date.now() + 7 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
              {/* Inspection Summary */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">
                    Summary of Inspection
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                    {selectedInspection.description ||
                      `Quality inspection required for ${
                        selectedInspection.commodityDisplay ||
                        selectedInspection.commodity
                      }. The inspection should cover all relevant parameters to ensure compliance with international standards.`}
                  </p>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-3">
                    Inspection Parameters
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedInspection.selectedCertifications || []).map(
                      (param, index) => (
                        <span
                          key={index}
                          className="px-2 sm:px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300"
                        >
                          {param}
                        </span>
                      )
                    )}
                    {(selectedInspection.inspectionTypes || []).map(
                      (type, index) => (
                        <span
                          key={index}
                          className="px-2 sm:px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300"
                        >
                          {type === "physical"
                            ? "Physical Inspection"
                            : "Chemical Testing"}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Key Details */}
              <div className="space-y-4">
                <div className="bg-black border border-gray-800 rounded-lg p-4 transition-colors duration-300">
                  <h4 className="font-semibold text-white mb-3 text-sm sm:text-base">
                    Key Details
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Commodity:</span>
                      <span className="font-medium text-white truncate ml-2">
                        {selectedInspection.commodity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Volume:</span>
                      <span className="font-medium text-white truncate ml-2">
                        {selectedInspection.volume} {selectedInspection.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="font-medium text-white truncate ml-2">
                        {selectedInspection.inspectionLocation}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Requested:</span>
                      <span className="font-medium text-white">
                        {new Date(
                          selectedInspection.submittedAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedInspection.expectedBudget && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 transition-colors duration-300">
                    <h4 className="font-semibold text-emerald-300 mb-2 flex items-center text-sm sm:text-base">
                      <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
                      Your Budget
                    </h4>
                    <div className="text-xl sm:text-2xl font-bold text-emerald-400">
                      ${selectedInspection.expectedBudget}
                    </div>
                  </div>
                )}

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 transition-colors duration-300">
                  <h4 className="font-semibold text-purple-300 mb-2 flex items-center text-sm sm:text-base">
                    <Users className="h-4 w-4 mr-1 flex-shrink-0" />
                    Bidding Status
                  </h4>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Bids:</span>
                      <span className="font-bold text-purple-400">
                        {selectedInspection.bids?.length || 0}
                      </span>
                    </div>
                    {getLowestBidAmount(selectedInspection.bids) > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lowest Bid:</span>
                        <span className="font-bold text-emerald-400">
                          ${getLowestBidAmount(selectedInspection.bids)}
                        </span>
                      </div>
                    )}
                    {getAverageBidAmount(selectedInspection.bids) > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Average Bid:</span>
                        <span className="font-bold text-white">
                          ${getAverageBidAmount(selectedInspection.bids)}
                        </span>
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
          <div className="bg-gray-900 border border-gray-800 rounded-lg lg:rounded-xl transition-colors duration-300">
            <div className="p-4 lg:p-6 border-b border-gray-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Inspector Bids ({inspectorBids.length})
                </h3>
              </div>
            </div>

            {isLoading ? (
              <div className="p-8 lg:p-12 text-center">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-2 border-gray-600 border-t-purple-500 rounded-full animate-spin"></div>
                  <span className="text-gray-400 text-sm sm:text-base">
                    Loading bids...
                  </span>
                </div>
              </div>
            ) : inspectorBids.length === 0 ? (
              <div className="p-8 lg:p-12 text-center">
                <Gavel className="h-12 w-12 sm:h-16 sm:w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  No Bids Yet
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Inspectors haven't started bidding on this request yet. Check
                  back soon!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {sortedBids.map((bid) => (
                  <div
                    key={bid.id}
                    className="p-4 transition-colors duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="text-sm font-medium text-white truncate">
                              {bid.inspectorName}
                            </div>
                            {bid.isLowestBid && (
                              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-medium flex-shrink-0 transition-colors duration-300">
                                Lowest
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-400 truncate">
                            {bid.company}
                          </div>
                          <div className="flex items-center space-x-3 mt-1 text-xs text-gray-400">
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3 text-gray-500 flex-shrink-0" />
                              <span>
                                {bid.location ||
                                  selectedInspection.inspectionLocation}
                              </span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <span>Volume:</span>
                              <span className="font-medium">
                                {bid.volume || selectedInspection.volume}{" "}
                                {selectedInspection.unit || "units"}
                              </span>
                            </span>
                          </div>
                          {bid.completedInspections !== undefined && (
                            <div className="flex items-center space-x-3 mt-1 text-xs text-gray-400">
                              Completed Jobs: {bid.completedInspections}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
                        <div className="text-lg font-bold text-white">
                          ${bid.biddingAmount}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium text-white">
                            {bid.rating || "-"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                      <div>
                        <span className="text-gray-400">Timeline:</span>
                        <div
                          className={`font-medium ${getTimelineColor(
                            bid.proposedTimeline
                          )}`}
                        >
                          {bid.proposedTimeline || "-"}
                        </div>
                      </div>
                    </div>

                    {/* Confirm Button */}
                    <div className="mt-4">
                      <button
                        onClick={() => handleConfirmInspector(bid)}
                        disabled={
                          isProcessing || confirmedInspector?.id === bid.id
                        }
                        className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                          confirmedInspector?.id === bid.id
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed"
                            : isProcessing
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white"
                        }`}
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Confirming...</span>
                          </>
                        ) : confirmedInspector?.id === bid.id ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            <span>Confirmed</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            <span>Confirm Inspector</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default BiddingRoom;
