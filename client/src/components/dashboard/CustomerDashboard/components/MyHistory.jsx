import React, { useState, useEffect } from "react";
import {
  History,
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  Package,
  DollarSign,
  User,
  FileText,
  Eye,
  ChevronDown,
  ChevronUp,
  Grid,
  List,
  RefreshCw,
  ArrowUpDown,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";

const MyHistory = ({ selectedCommodityFilter = null }) => {
  // State management
  const [inspections, setInspections] = useState([]);
  const [filteredInspections, setFilteredInspections] = useState([]);
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    commodity: selectedCommodityFilter || "",
    status: "",
    location: "",
    minAmount: "",
    maxAmount: "",
    inspector: "",
  });

  // Sorting state
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for inspection history
  const mockInspections = [
    {
      id: "INS-2024-001",
      type: "Basmati Rice Quality Assessment",
      commodity: "Rice",
      subCommodity: "Basmati Rice",
      location: "Punjab, India",
      coordinates: { lat: 30.7333, lng: 76.7794 },
      date: "2024-06-25",
      requestedDate: "2024-06-20",
      completedDate: "2024-06-25",
      quote: 1500,
      bidClosed: 1350,
      savings: 150,
      status: "Completed",
      inspector: {
        name: "John Smith",
        email: "john@inspector.com",
        phone: "+91-9876543210",
        rating: 4.8,
        company: "Elite Inspections",
      },
      description:
        "Comprehensive quality assessment of Basmati rice for export certification",
      parameters: [
        "Physical Inspection",
        "Moisture Content",
        "Grain Length",
        "Purity Analysis",
      ],
      documents: ["Quality Report.pdf", "Certificate.pdf", "Photos.zip"],
      certificates: ["NABL", "GAFTA", "ISO"], // Added certificates
      timeline: [
        { status: "Requested", date: "2024-06-20", time: "10:30 AM" },
        { status: "Inspector Assigned", date: "2024-06-21", time: "02:15 PM" },
        { status: "Inspection Started", date: "2024-06-25", time: "09:00 AM" },
        { status: "Completed", date: "2024-06-25", time: "04:30 PM" },
      ],
      urgency: "Medium",
      volume: "50 Tons",
    },
    {
      id: "INS-2024-002",
      type: "Organic Cotton Certification",
      commodity: "Cotton",
      subCommodity: "Organic Cotton",
      location: "Gujarat, India",
      coordinates: { lat: 22.2587, lng: 71.1924 },
      date: "2024-06-22",
      requestedDate: "2024-06-18",
      completedDate: null,
      quote: 2200,
      bidClosed: 2000,
      savings: 200,
      status: "In Progress",
      inspector: {
        name: "Sarah Wilson",
        email: "sarah@inspector.com",
        phone: "+91-9876543211",
        rating: 4.9,
        company: "Green Cert Inspections",
      },
      description: "Organic certification inspection for cotton export",
      parameters: ["Chemical Testing", "Organic Compliance", "Soil Analysis"],
      documents: ["Initial Report.pdf"],
      certificates: ["NABCB", "COC"], // Added certificates
      timeline: [
        { status: "Requested", date: "2024-06-18", time: "11:00 AM" },
        { status: "Inspector Assigned", date: "2024-06-19", time: "03:30 PM" },
        { status: "Inspection Started", date: "2024-06-22", time: "08:00 AM" },
      ],
      urgency: "High",
      volume: "25 Tons",
    },
    {
      id: "INS-2024-003",
      type: "Wheat Quality Check",
      commodity: "Wheat",
      subCommodity: "Durum Wheat",
      location: "Haryana, India",
      coordinates: { lat: 29.0588, lng: 76.0856 },
      date: "2024-06-20",
      requestedDate: "2024-06-15",
      completedDate: "2024-06-20",
      quote: 1300,
      bidClosed: 1200,
      savings: 100,
      status: "Completed",
      inspector: {
        name: "Mike Johnson",
        email: "mike@inspector.com",
        phone: "+91-9876543212",
        rating: 4.7,
        company: "Agri Quality Labs",
      },
      description: "Pre-shipment quality inspection for durum wheat",
      parameters: [
        "Physical Inspection",
        "Protein Content",
        "Moisture Analysis",
      ],
      documents: ["Quality Report.pdf", "Test Results.pdf"],
      certificates: ["FOSFE", "ISO"], // Added certificates
      timeline: [
        { status: "Requested", date: "2024-06-15", time: "02:00 PM" },
        { status: "Inspector Assigned", date: "2024-06-16", time: "10:00 AM" },
        { status: "Inspection Started", date: "2024-06-20", time: "09:30 AM" },
        { status: "Completed", date: "2024-06-20", time: "03:00 PM" },
      ],
      urgency: "Low",
      volume: "100 Tons",
    },
    {
      id: "INS-2024-004",
      type: "Pulse Quality Assessment",
      commodity: "Pulses",
      subCommodity: "Chickpeas",
      location: "Rajasthan, India",
      coordinates: { lat: 27.0238, lng: 74.2179 },
      date: "2024-06-18",
      requestedDate: "2024-06-14",
      completedDate: "2024-06-18",
      quote: 900,
      bidClosed: 850,
      savings: 50,
      status: "Completed",
      inspector: {
        name: "Emma Davis",
        email: "emma@inspector.com",
        phone: "+91-9876543213",
        rating: 4.6,
        company: "Quality First Inspections",
      },
      description: "Quality check for chickpea export consignment",
      parameters: ["Physical Inspection", "Size Grading", "Impurity Check"],
      documents: ["Inspection Report.pdf", "Photos.zip"],
      certificates: ["NABL", "GAFTA"], // Added certificates
      timeline: [
        { status: "Requested", date: "2024-06-14", time: "09:00 AM" },
        { status: "Inspector Assigned", date: "2024-06-15", time: "11:30 AM" },
        { status: "Inspection Started", date: "2024-06-18", time: "10:00 AM" },
        { status: "Completed", date: "2024-06-18", time: "02:30 PM" },
      ],
      urgency: "Medium",
      volume: "30 Tons",
    },
    {
      id: "INS-2024-005",
      type: "Spice Quality Verification",
      commodity: "Spices",
      subCommodity: "Turmeric",
      location: "Tamil Nadu, India",
      coordinates: { lat: 11.1271, lng: 78.6569 },
      date: "2024-06-16",
      requestedDate: "2024-06-12",
      completedDate: null,
      quote: 1100,
      bidClosed: 1000,
      savings: 100,
      status: "Cancelled",
      inspector: {
        name: "David Brown",
        email: "david@inspector.com",
        phone: "+91-9876543214",
        rating: 4.5,
        company: "Spice Guard Inspections",
      },
      description: "Quality verification for turmeric powder export",
      parameters: ["Chemical Testing", "Purity Analysis", "Color Assessment"],
      documents: [],
      certificates: ["NABCB"], // Added certificates
      timeline: [
        { status: "Requested", date: "2024-06-12", time: "01:00 PM" },
        { status: "Inspector Assigned", date: "2024-06-13", time: "04:00 PM" },
        { status: "Cancelled", date: "2024-06-16", time: "10:00 AM" },
      ],
      urgency: "Low",
      volume: "15 Tons",
    },
  ];

  // Certificate descriptions mapping
  const certificateDescriptions = {
    NABL: "National Accreditation Board for Testing and Calibration Laboratories",
    NABCB: "National Accreditation Board for Certification Bodies",
    COC: "Certificate of Conformity",
    FOSFE: "Federation of Seed & Farm Equipment",
    GAFTA: "Grain and Feed Trade Association",
    ISO: "International Organization for Standardization",
  };

  // Initialize data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setInspections(mockInspections);
      setFilteredInspections(mockInspections);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...inspections];

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(
        (inspection) =>
          inspection.type
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          inspection.commodity
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          inspection.location
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          inspection.inspector.name
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          inspection.id.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.commodity) {
      filtered = filtered.filter(
        (inspection) => inspection.commodity === filters.commodity
      );
    }

    if (filters.status) {
      filtered = filtered.filter(
        (inspection) => inspection.status === filters.status
      );
    }

    if (filters.location) {
      filtered = filtered.filter((inspection) =>
        inspection.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      );
    }

    if (filters.inspector) {
      filtered = filtered.filter((inspection) =>
        inspection.inspector.name
          .toLowerCase()
          .includes(filters.inspector.toLowerCase())
      );
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(
        (inspection) => new Date(inspection.date) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(
        (inspection) => new Date(inspection.date) <= new Date(filters.dateTo)
      );
    }

    if (filters.minAmount) {
      filtered = filtered.filter(
        (inspection) => inspection.bidClosed >= parseInt(filters.minAmount)
      );
    }

    if (filters.maxAmount) {
      filtered = filtered.filter(
        (inspection) => inspection.bidClosed <= parseInt(filters.maxAmount)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "date":
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case "amount":
          aValue = a.bidClosed;
          bValue = b.bidClosed;
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        case "commodity":
          aValue = a.commodity;
          bValue = b.commodity;
          break;
        case "location":
          aValue = a.location;
          bValue = b.location;
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredInspections(filtered);
    setCurrentPage(1);
  }, [inspections, filters, sortBy, sortOrder]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: "",
      dateFrom: "",
      dateTo: "",
      commodity: "",
      status: "",
      location: "",
      minAmount: "",
      maxAmount: "",
      inspector: "",
    });
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-900/20 text-green-400 border-green-500/30";
      case "in progress":
        return "bg-blue-900/20 text-blue-400 border-blue-500/30";
      case "cancelled":
        return "bg-red-900/20 text-red-400 border-red-500/30";
      case "pending":
        return "bg-yellow-900/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-800/20 text-gray-300 border-gray-500/30";
    }
  };

  // Get urgency color
  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case "high":
        return "bg-red-900/20 text-red-400";
      case "medium":
        return "bg-yellow-900/20 text-yellow-400";
      case "low":
        return "bg-green-900/20 text-green-400";
      default:
        return "bg-gray-800/20 text-gray-300";
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredInspections.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInspections = filteredInspections.slice(startIndex, endIndex);

  // Export functionality
  const exportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Type,Commodity,Location,Date,Quote,Bid Closed,Savings,Status,Inspector\n" +
      filteredInspections
        .map(
          (inspection) =>
            `${inspection.id},${inspection.type},${inspection.commodity},${inspection.location},${inspection.date},$${inspection.quote},$${inspection.bidClosed},$${inspection.savings},${inspection.status},${inspection.inspector.name}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inspection_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Card view component
  const InspectionCard = ({ inspection }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 group animate-fade-in-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-gray-100">
              {inspection.type}
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${getUrgencyColor(
                inspection.urgency
              )}`}
            >
              {inspection.urgency}
            </span>
          </div>
          <p className="text-gray-300 text-sm mb-3 transition-colors duration-300 group-hover:text-gray-200">
            {inspection.description}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1 transition-colors duration-300 hover:text-gray-300">
              <Package className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
              <span>{inspection.commodity}</span>
            </div>
            <div className="flex items-center space-x-1 transition-colors duration-300 hover:text-gray-300">
              <MapPin className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
              <span>{inspection.location}</span>
            </div>
            <div className="flex items-center space-x-1 transition-colors duration-300 hover:text-gray-300">
              <Calendar className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
              <span>{inspection.date}</span>
            </div>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-lg text-sm font-semibold border transition-all duration-300 hover:scale-105 ${getStatusColor(
            inspection.status
          )}`}
        >
          {inspection.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-800 rounded-lg p-3 transition-all duration-300 hover:bg-gray-700">
          <div className="text-xs text-gray-400 mb-1 transition-colors duration-300">
            Quote
          </div>
          <div className="text-lg font-semibold text-white transition-colors duration-300">
            ${inspection.quote}
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 transition-all duration-300 hover:bg-gray-700">
          <div className="text-xs text-gray-400 mb-1 transition-colors duration-300">
            Bid Closed
          </div>
          <div className="text-lg font-semibold text-green-400 transition-colors duration-300">
            ${inspection.bidClosed}
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 transition-all duration-300 hover:bg-gray-700">
          <div className="text-xs text-gray-400 mb-1 transition-colors duration-300">
            Savings
          </div>
          <div className="text-lg font-semibold text-blue-400 transition-colors duration-300">
            ${inspection.savings}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-400 transition-transform duration-300 hover:scale-110" />
          <span className="text-sm text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
            {inspection.inspector.name}
          </span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
            {inspection.inspector.company}
          </span>
        </div>
        <button
          onClick={() => {
            setSelectedInspection(inspection);
            setShowDetailModal(true);
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-all duration-300 text-sm font-medium flex items-center space-x-2 shadow-lg shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-0.5 group active:scale-95"
        >
          <Eye className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );

  // Table view component
  const InspectionTable = () => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:border-gray-50 hover:shadow-xl animate-fade-in-up">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center space-x-1">
                  <span>ID</span>
                  <ArrowUpDown className="h-3 w-3 transition-transform duration-300 hover:scale-110" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                onClick={() => handleSort("commodity")}
              >
                <div className="flex items-center space-x-1">
                  <span>Commodity</span>
                  <ArrowUpDown className="h-3 w-3 transition-transform duration-300 hover:scale-110" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                onClick={() => handleSort("location")}
              >
                <div className="flex items-center space-x-1">
                  <span>Location</span>
                  <ArrowUpDown className="h-3 w-3 transition-transform duration-300 hover:scale-110" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  <ArrowUpDown className="h-3 w-3 transition-transform duration-300 hover:scale-110" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center space-x-1">
                  <span>Amount</span>
                  <ArrowUpDown className="h-3 w-3 transition-transform duration-300 hover:scale-110" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <ArrowUpDown className="h-3 w-3 transition-transform duration-300 hover:scale-110" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {currentInspections.map((inspection, index) => (
              <tr
                key={inspection.id}
                className="hover:bg-gray-800 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white transition-colors duration-300">
                  {inspection.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-white transition-colors duration-300">
                      {inspection.commodity}
                    </div>
                    <div className="text-sm text-gray-400 transition-colors duration-300">
                      {inspection.subCommodity}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white transition-colors duration-300">
                  {inspection.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white transition-colors duration-300">
                  {inspection.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-white transition-colors duration-300">
                      ${inspection.bidClosed}
                    </div>
                    <div className="text-sm text-gray-400 transition-colors duration-300">
                      Quote: ${inspection.quote}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-semibold border transition-all duration-300 hover:scale-105 ${getStatusColor(
                      inspection.status
                    )}`}
                  >
                    {inspection.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedInspection(inspection);
                      setShowDetailModal(true);
                    }}
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 group"
                  >
                    <Eye className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Detail modal component
  const DetailModal = () => {
    if (!selectedInspection) return null;

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
        <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 transform scale-100 hover:scale-[1.01]">
          {/* Header */}
          <div className="p-6 border-b border-gray-700 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white transition-colors duration-300 hover:text-gray-100">
                {selectedInspection.type}
              </h3>
              <p className="text-gray-400 mt-1 transition-colors duration-300 hover:text-gray-300">
                ID: {selectedInspection.id}
              </p>
            </div>
            <button
              onClick={() => setShowDetailModal(false)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-110 group"
            >
              <X className="h-6 w-6 text-gray-400 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4 transition-all duration-300 hover:bg-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-3 transition-colors duration-300">
                    Inspection Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between transition-all duration-300 hover:bg-gray-700/50 p-2 rounded">
                      <span className="text-gray-400 transition-colors duration-300">
                        Commodity:
                      </span>
                      <span className="font-medium text-white transition-colors duration-300">
                        {selectedInspection.commodity}
                      </span>
                    </div>
                    <div className="flex justify-between transition-all duration-300 hover:bg-gray-700/50 p-2 rounded">
                      <span className="text-gray-400 transition-colors duration-300">
                        Sub-Commodity:
                      </span>
                      <span className="font-medium text-white transition-colors duration-300">
                        {selectedInspection.subCommodity}
                      </span>
                    </div>
                    <div className="flex justify-between transition-all duration-300 hover:bg-gray-700/50 p-2 rounded">
                      <span className="text-gray-400 transition-colors duration-300">
                        Location:
                      </span>
                      <span className="font-medium text-white transition-colors duration-300">
                        {selectedInspection.location}
                      </span>
                    </div>
                    <div className="flex justify-between transition-all duration-300 hover:bg-gray-700/50 p-2 rounded">
                      <span className="text-gray-400 transition-colors duration-300">
                        Volume:
                      </span>
                      <span className="font-medium text-white transition-colors duration-300">
                        {selectedInspection.volume}
                      </span>
                    </div>
                    <div className="flex justify-between transition-all duration-300 hover:bg-gray-700/50 p-2 rounded">
                      <span className="text-gray-400 transition-colors duration-300">
                        Urgency:
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${getUrgencyColor(
                          selectedInspection.urgency
                        )}`}
                      >
                        {selectedInspection.urgency}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 transition-all duration-300 hover:bg-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-3 transition-colors duration-300">
                    Financial Summary
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between transition-all duration-300 hover:bg-gray-700/50 p-2 rounded">
                      <span className="text-gray-400 transition-colors duration-300">
                        Quote Amount:
                      </span>
                      <span className="font-medium text-white transition-colors duration-300">
                        ${selectedInspection.quote}
                      </span>
                    </div>
                    <div className="flex justify-between transition-all duration-300 hover:bg-gray-700/50 p-2 rounded">
                      <span className="text-gray-400 transition-colors duration-300">
                        Bid Closed:
                      </span>
                      <span className="font-medium text-green-400 transition-colors duration-300">
                        ${selectedInspection.bidClosed}
                      </span>
                    </div>
                    <div className="flex justify-between transition-all duration-300 hover:bg-gray-700/50 p-2 rounded">
                      <span className="text-gray-400 transition-colors duration-300">
                        Savings:
                      </span>
                      <span className="font-medium text-blue-400 transition-colors duration-300">
                        ${selectedInspection.savings}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Certificates Section - Replacing Inspector Information */}
                <div className="bg-gray-800 rounded-lg p-4 transition-all duration-300 hover:bg-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center transition-colors duration-300">
                    <Award className="h-5 w-5 mr-2 transition-transform duration-300 hover:scale-110" />
                    Required Certificates
                  </h4>
                  {selectedInspection.certificates &&
                  selectedInspection.certificates.length > 0 ? (
                    <div className="space-y-2">
                      {selectedInspection.certificates.map((cert, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg border border-blue-500/30 transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-900/30"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                              <Award className="h-4 w-4 text-white transition-transform duration-300 hover:scale-110" />
                            </div>
                            <div>
                              <div className="font-medium text-white transition-colors duration-300">
                                {cert}
                              </div>
                              <div className="text-sm text-gray-400 transition-colors duration-300">
                                {certificateDescriptions[cert]}
                              </div>
                            </div>
                          </div>
                          <div className="px-3 py-1 bg-green-900/20 text-green-400 rounded-full text-xs font-medium border border-green-500/30 transition-all duration-300 hover:scale-105">
                            Required
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-700 rounded-lg text-center transition-all duration-300 hover:bg-gray-600">
                      <Award className="h-8 w-8 text-gray-500 mx-auto mb-2 transition-transform duration-300 hover:scale-110" />
                      <p className="text-gray-400 text-sm transition-colors duration-300">
                        No specific certificates required
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-800 rounded-lg p-4 transition-all duration-300 hover:bg-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-3 transition-colors duration-300">
                    Status
                  </h4>
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-300 hover:scale-105 ${getStatusColor(
                      selectedInspection.status
                    )}`}
                  >
                    {selectedInspection.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-800 rounded-lg p-4 transition-all duration-300 hover:bg-gray-700">
              <h4 className="text-lg font-semibold text-white mb-3 transition-colors duration-300">
                Description
              </h4>
              <p className="text-gray-300 bg-gray-700 p-4 rounded-lg transition-all duration-300 hover:bg-gray-600">
                {selectedInspection.description}
              </p>
            </div>

            {/* Parameters */}
            <div className="bg-gray-800 rounded-lg p-4 transition-all duration-300 hover:bg-gray-700">
              <h4 className="text-lg font-semibold text-white mb-3 transition-colors duration-300">
                Inspection Parameters
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedInspection.parameters.map((param, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-900/20 text-blue-400 rounded-full text-sm border border-blue-500/30 transition-all duration-300 hover:scale-105 hover:bg-blue-900/30"
                  >
                    {param}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-800 rounded-lg p-4 transition-all duration-300 hover:bg-gray-700">
              <h4 className="text-lg font-semibold text-white mb-3 transition-colors duration-300">
                Timeline
              </h4>
              <div className="space-y-3">
                {selectedInspection.timeline.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 transition-all duration-300 hover:bg-gray-700/50 p-2 rounded"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 transition-all duration-300 hover:scale-125"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white transition-colors duration-300">
                          {event.status}
                        </span>
                        <span className="text-sm text-gray-400 transition-colors duration-300">
                          {event.date} at {event.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            {selectedInspection.documents.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-4 transition-all duration-300 hover:bg-gray-700">
                <h4 className="text-lg font-semibold text-white mb-3 transition-colors duration-300">
                  Documents
                </h4>
                <div className="space-y-2">
                  {selectedInspection.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-600"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400 transition-transform duration-300 hover:scale-110" />
                        <span className="font-medium text-white transition-colors duration-300">
                          {doc}
                        </span>
                      </div>
                      <button className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded text-sm transition-all duration-300 shadow-lg shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700 flex justify-end space-x-4">
            <button
              onClick={() => setShowDetailModal(false)}
              className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              Close
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-all duration-300 font-medium shadow-lg shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95">
              Download Report
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="transform transition-all duration-500 hover:scale-[1.02]">
            <h1 className="text-3xl font-bold text-white flex items-center transition-colors duration-300">
              <History className="h-8 w-8 mr-3 text-purple-400 transition-transform duration-300 hover:scale-110" />
              My History
            </h1>
            <p className="text-gray-400 mt-2 transition-colors duration-300 hover:text-gray-300">
              Complete record of all your inspection activities
              {selectedCommodityFilter && (
                <span className="ml-2 px-2 py-1 bg-blue-900/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30 transition-all duration-300 hover:scale-105">
                  Filtered by: {selectedCommodityFilter}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center space-x-2 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${
                showFilters
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
              }`}
            >
              <Filter className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
              <span>Filters</span>
              {showFilters ? (
                <ChevronUp className="h-4 w-4 transition-transform duration-300" />
              ) : (
                <ChevronDown className="h-4 w-4 transition-transform duration-300" />
              )}
            </button>
            <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg p-1 transition-all duration-300 hover:border-gray-500">
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                  viewMode === "card"
                    ? "bg-gray-700 shadow-sm"
                    : "hover:bg-gray-700"
                }`}
              >
                <Grid className="h-4 w-4 text-gray-300 transition-colors duration-300" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                  viewMode === "table"
                    ? "bg-gray-700 shadow-sm"
                    : "hover:bg-gray-700"
                }`}
              >
                <List className="h-4 w-4 text-gray-300 transition-colors duration-300" />
              </button>
            </div>
            <button
              onClick={exportData}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              <Download className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-sm transition-all duration-300 hover:border-gray-50 hover:shadow-xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white transition-colors duration-300 hover:text-gray-100">
                Filters
              </h3>
              <button
                onClick={clearFilters}
                className="px-3 py-1 text-sm text-gray-400 hover:text-white transition-all duration-300 flex items-center space-x-1 hover:scale-105"
              >
                <RefreshCw className="h-4 w-4 transition-transform duration-300 hover:rotate-180" />
                <span>Clear All</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 transition-transform duration-300 hover:scale-110" />
                  <input
                    type="text"
                    placeholder="Search inspections..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400 transition-all duration-300 hover:border-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300">
                  Commodity
                </label>
                <select
                  value={filters.commodity}
                  onChange={(e) =>
                    handleFilterChange("commodity", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white transition-all duration-300 hover:border-gray-500"
                >
                  <option value="">All Commodities</option>
                  <option value="Rice">Rice</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Pulses">Pulses</option>
                  <option value="Spices">Spices</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white transition-all duration-300 hover:border-gray-500"
                >
                  <option value="">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter location..."
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400 transition-all duration-300 hover:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300">
                  Date From
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    handleFilterChange("dateFrom", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white transition-all duration-300 hover:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300">
                  Date To
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white transition-all duration-300 hover:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300">
                  Min Amount
                </label>
                <input
                  type="number"
                  placeholder="Min amount..."
                  value={filters.minAmount}
                  onChange={(e) =>
                    handleFilterChange("minAmount", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400 transition-all duration-300 hover:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-300">
                  Max Amount
                </label>
                <input
                  type="number"
                  placeholder="Max amount..."
                  value={filters.maxAmount}
                  onChange={(e) =>
                    handleFilterChange("maxAmount", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400 transition-all duration-300 hover:border-gray-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl transition-transform duration-300 hover:scale-110 hover:rotate-3">
                <History className="h-6 w-6 text-white transition-transform duration-300 hover:scale-110" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white transition-all duration-500 hover:text-blue-400">
                  {filteredInspections.length}
                </p>
                <p className="text-gray-400 text-sm transition-colors duration-300 hover:text-gray-300">
                  Total Inspections
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl transition-transform duration-300 hover:scale-110 hover:rotate-3">
                <CheckCircle className="h-6 w-6 text-white transition-transform duration-300 hover:scale-110" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white transition-all duration-500 hover:text-green-400">
                  {
                    filteredInspections.filter((i) => i.status === "Completed")
                      .length
                  }
                </p>
                <p className="text-gray-400 text-sm transition-colors duration-300 hover:text-gray-300">
                  Completed
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-yellow-500/50 hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl transition-transform duration-300 hover:scale-110 hover:rotate-3">
                <Clock className="h-6 w-6 text-white transition-transform duration-300 hover:scale-110" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white transition-all duration-500 hover:text-yellow-400">
                  {
                    filteredInspections.filter(
                      (i) => i.status === "In Progress"
                    ).length
                  }
                </p>
                <p className="text-gray-400 text-sm transition-colors duration-300 hover:text-gray-300">
                  In Progress
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl transition-transform duration-300 hover:scale-110 hover:rotate-3">
                <DollarSign className="h-6 w-6 text-white transition-transform duration-300 hover:scale-110" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white transition-all duration-500 hover:text-purple-400">
                  ${filteredInspections.reduce((sum, i) => sum + i.savings, 0)}
                </p>
                <p className="text-gray-400 text-sm transition-colors duration-300 hover:text-gray-300">
                  Total Savings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12 animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-gray-600 border-t-blue-400 rounded-full animate-spin"></div>
              <span className="text-gray-400 transition-colors duration-300">
                Loading inspection history...
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Content */}
            {filteredInspections.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 shadow-sm text-center transition-all duration-300 hover:border-gray-50 hover:shadow-xl animate-fade-in-up">
                <History className="h-16 w-16 text-gray-500 mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
                <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300">
                  No Inspections Found
                </h3>
                <p className="text-gray-400 mb-6 transition-colors duration-300">
                  {Object.values(filters).some((f) => f)
                    ? "No inspections match your current filters. Try adjusting your search criteria."
                    : "You haven't requested any inspections yet. Start by raising an enquiry!"}
                </p>
                {Object.values(filters).some((f) => f) && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-all duration-300 font-medium shadow-lg shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Results header */}
                <div
                  className="flex items-center justify-between animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <p className="text-gray-400 transition-colors duration-300 hover:text-gray-300">
                    Showing {startIndex + 1}-
                    {Math.min(endIndex, filteredInspections.length)} of{" "}
                    {filteredInspections.length} inspections
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400 transition-colors duration-300">
                      Sort by:
                    </span>
                    <select
                      value={`${sortBy}-${sortOrder}`}
                      onChange={(e) => {
                        const [field, order] = e.target.value.split("-");
                        setSortBy(field);
                        setSortOrder(order);
                      }}
                      className="px-3 py-1 border border-gray-600 rounded text-sm focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white transition-all duration-300 hover:border-gray-500"
                    >
                      <option value="date-desc">Date (Newest)</option>
                      <option value="date-asc">Date (Oldest)</option>
                      <option value="amount-desc">Amount (High to Low)</option>
                      <option value="amount-asc">Amount (Low to High)</option>
                      <option value="status-asc">Status (A-Z)</option>
                      <option value="commodity-asc">Commodity (A-Z)</option>
                    </select>
                  </div>
                </div>

                {/* Inspection List */}
                {viewMode === "card" ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {currentInspections.map((inspection, index) => (
                      <div
                        key={inspection.id}
                        style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                      >
                        <InspectionCard inspection={inspection} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <InspectionTable />
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div
                    className="flex items-center justify-between animate-fade-in-up"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 border border-gray-600 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-gray-300 transform hover:scale-110 hover:-translate-y-0.5 active:scale-95"
                      >
                        <ChevronLeft className="h-4 w-4 transition-transform duration-300" />
                      </button>

                      <div className="flex items-center space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(
                            (page) =>
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 &&
                                page <= currentPage + 1)
                          )
                          .map((page, index, array) => (
                            <React.Fragment key={page}>
                              {index > 0 && array[index - 1] !== page - 1 && (
                                <span className="px-2 py-1 text-gray-500">
                                  ...
                                </span>
                              )}
                              <button
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                                  currentPage === page
                                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`}
                              >
                                {page}
                              </button>
                            </React.Fragment>
                          ))}
                      </div>

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="p-2 border border-gray-600 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-gray-300 transform hover:scale-110 hover:-translate-y-0.5 active:scale-95"
                      >
                        <ChevronRight className="h-4 w-4 transition-transform duration-300" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-400 transition-colors duration-300">
                      Page {currentPage} of {totalPages}
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Detail Modal */}
        {showDetailModal && <DetailModal />}
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
      `}</style>
    </div>
  );
};

export default MyHistory;
