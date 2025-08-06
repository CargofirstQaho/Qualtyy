// ========================================
// components/MyHistory/MyHistory.jsx
// ========================================

import React, { useState, useEffect } from 'react';
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
  Award
} from 'lucide-react';

const MyHistory = ({ selectedCommodityFilter = null }) => {
  // State management
  const [inspections, setInspections] = useState([]);
  const [filteredInspections, setFilteredInspections] = useState([]);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    dateFrom: '',
    dateTo: '',
    commodity: selectedCommodityFilter || '',
    status: '',
    location: '',
    minAmount: '',
    maxAmount: '',
    inspector: ''
  });

  // Sorting state
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for inspection history
  const mockInspections = [
    {
      id: 'INS-2024-001',
      type: 'Basmati Rice Quality Assessment',
      commodity: 'Rice',
      subCommodity: 'Basmati Rice',
      location: 'Punjab, India',
      coordinates: { lat: 30.7333, lng: 76.7794 },
      date: '2024-06-25',
      requestedDate: '2024-06-20',
      completedDate: '2024-06-25',
      quote: 1500,
      bidClosed: 1350,
      savings: 150,
      status: 'Completed',
      inspector: {
        name: 'John Smith',
        email: 'john@inspector.com',
        phone: '+91-9876543210',
        rating: 4.8,
        company: 'Elite Inspections'
      },
      description: 'Comprehensive quality assessment of Basmati rice for export certification',
      parameters: ['Physical Inspection', 'Moisture Content', 'Grain Length', 'Purity Analysis'],
      documents: ['Quality Report.pdf', 'Certificate.pdf', 'Photos.zip'],
      certificates: ['NABL', 'GAFTA', 'ISO'], // Added certificates
      timeline: [
        { status: 'Requested', date: '2024-06-20', time: '10:30 AM' },
        { status: 'Inspector Assigned', date: '2024-06-21', time: '02:15 PM' },
        { status: 'Inspection Started', date: '2024-06-25', time: '09:00 AM' },
        { status: 'Completed', date: '2024-06-25', time: '04:30 PM' }
      ],
      urgency: 'Medium',
      volume: '50 Tons'
    },
    {
      id: 'INS-2024-002',
      type: 'Organic Cotton Certification',
      commodity: 'Cotton',
      subCommodity: 'Organic Cotton',
      location: 'Gujarat, India',
      coordinates: { lat: 22.2587, lng: 71.1924 },
      date: '2024-06-22',
      requestedDate: '2024-06-18',
      completedDate: null,
      quote: 2200,
      bidClosed: 2000,
      savings: 200,
      status: 'In Progress',
      inspector: {
        name: 'Sarah Wilson',
        email: 'sarah@inspector.com',
        phone: '+91-9876543211',
        rating: 4.9,
        company: 'Green Cert Inspections'
      },
      description: 'Organic certification inspection for cotton export',
      parameters: ['Chemical Testing', 'Organic Compliance', 'Soil Analysis'],
      documents: ['Initial Report.pdf'],
      certificates: ['NABCB', 'COC'], // Added certificates
      timeline: [
        { status: 'Requested', date: '2024-06-18', time: '11:00 AM' },
        { status: 'Inspector Assigned', date: '2024-06-19', time: '03:30 PM' },
        { status: 'Inspection Started', date: '2024-06-22', time: '08:00 AM' }
      ],
      urgency: 'High',
      volume: '25 Tons'
    },
    {
      id: 'INS-2024-003',
      type: 'Wheat Quality Check',
      commodity: 'Wheat',
      subCommodity: 'Durum Wheat',
      location: 'Haryana, India',
      coordinates: { lat: 29.0588, lng: 76.0856 },
      date: '2024-06-20',
      requestedDate: '2024-06-15',
      completedDate: '2024-06-20',
      quote: 1300,
      bidClosed: 1200,
      savings: 100,
      status: 'Completed',
      inspector: {
        name: 'Mike Johnson',
        email: 'mike@inspector.com',
        phone: '+91-9876543212',
        rating: 4.7,
        company: 'Agri Quality Labs'
      },
      description: 'Pre-shipment quality inspection for durum wheat',
      parameters: ['Physical Inspection', 'Protein Content', 'Moisture Analysis'],
      documents: ['Quality Report.pdf', 'Test Results.pdf'],
      certificates: ['FOSFE', 'ISO'], // Added certificates
      timeline: [
        { status: 'Requested', date: '2024-06-15', time: '02:00 PM' },
        { status: 'Inspector Assigned', date: '2024-06-16', time: '10:00 AM' },
        { status: 'Inspection Started', date: '2024-06-20', time: '09:30 AM' },
        { status: 'Completed', date: '2024-06-20', time: '03:00 PM' }
      ],
      urgency: 'Low',
      volume: '100 Tons'
    },
    {
      id: 'INS-2024-004',
      type: 'Pulse Quality Assessment',
      commodity: 'Pulses',
      subCommodity: 'Chickpeas',
      location: 'Rajasthan, India',
      coordinates: { lat: 27.0238, lng: 74.2179 },
      date: '2024-06-18',
      requestedDate: '2024-06-14',
      completedDate: '2024-06-18',
      quote: 900,
      bidClosed: 850,
      savings: 50,
      status: 'Completed',
      inspector: {
        name: 'Emma Davis',
        email: 'emma@inspector.com',
        phone: '+91-9876543213',
        rating: 4.6,
        company: 'Quality First Inspections'
      },
      description: 'Quality check for chickpea export consignment',
      parameters: ['Physical Inspection', 'Size Grading', 'Impurity Check'],
      documents: ['Inspection Report.pdf', 'Photos.zip'],
      certificates: ['NABL', 'GAFTA'], // Added certificates
      timeline: [
        { status: 'Requested', date: '2024-06-14', time: '09:00 AM' },
        { status: 'Inspector Assigned', date: '2024-06-15', time: '11:30 AM' },
        { status: 'Inspection Started', date: '2024-06-18', time: '10:00 AM' },
        { status: 'Completed', date: '2024-06-18', time: '02:30 PM' }
      ],
      urgency: 'Medium',
      volume: '30 Tons'
    },
    {
      id: 'INS-2024-005',
      type: 'Spice Quality Verification',
      commodity: 'Spices',
      subCommodity: 'Turmeric',
      location: 'Tamil Nadu, India',
      coordinates: { lat: 11.1271, lng: 78.6569 },
      date: '2024-06-16',
      requestedDate: '2024-06-12',
      completedDate: null,
      quote: 1100,
      bidClosed: 1000,
      savings: 100,
      status: 'Cancelled',
      inspector: {
        name: 'David Brown',
        email: 'david@inspector.com',
        phone: '+91-9876543214',
        rating: 4.5,
        company: 'Spice Guard Inspections'
      },
      description: 'Quality verification for turmeric powder export',
      parameters: ['Chemical Testing', 'Purity Analysis', 'Color Assessment'],
      documents: [],
      certificates: ['NABCB'], // Added certificates
      timeline: [
        { status: 'Requested', date: '2024-06-12', time: '01:00 PM' },
        { status: 'Inspector Assigned', date: '2024-06-13', time: '04:00 PM' },
        { status: 'Cancelled', date: '2024-06-16', time: '10:00 AM' }
      ],
      urgency: 'Low',
      volume: '15 Tons'
    }
  ];

  // Certificate descriptions mapping
  const certificateDescriptions = {
    'NABL': 'National Accreditation Board for Testing and Calibration Laboratories',
    'NABCB': 'National Accreditation Board for Certification Bodies',
    'COC': 'Certificate of Conformity',
    'FOSFE': 'Federation of Seed & Farm Equipment',
    'GAFTA': 'Grain and Feed Trade Association',
    'ISO': 'International Organization for Standardization'
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
      filtered = filtered.filter(inspection => 
        inspection.type.toLowerCase().includes(filters.search.toLowerCase()) ||
        inspection.commodity.toLowerCase().includes(filters.search.toLowerCase()) ||
        inspection.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        inspection.inspector.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        inspection.id.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.commodity) {
      filtered = filtered.filter(inspection => inspection.commodity === filters.commodity);
    }

    if (filters.status) {
      filtered = filtered.filter(inspection => inspection.status === filters.status);
    }

    if (filters.location) {
      filtered = filtered.filter(inspection => 
        inspection.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.inspector) {
      filtered = filtered.filter(inspection => 
        inspection.inspector.name.toLowerCase().includes(filters.inspector.toLowerCase())
      );
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(inspection => new Date(inspection.date) >= new Date(filters.dateFrom));
    }

    if (filters.dateTo) {
      filtered = filtered.filter(inspection => new Date(inspection.date) <= new Date(filters.dateTo));
    }

    if (filters.minAmount) {
      filtered = filtered.filter(inspection => inspection.bidClosed >= parseInt(filters.minAmount));
    }

    if (filters.maxAmount) {
      filtered = filtered.filter(inspection => inspection.bidClosed <= parseInt(filters.maxAmount));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'amount':
          aValue = a.bidClosed;
          bValue = b.bidClosed;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'commodity':
          aValue = a.commodity;
          bValue = b.commodity;
          break;
        case 'location':
          aValue = a.location;
          bValue = b.location;
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }

      if (sortOrder === 'asc') {
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
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: '',
      dateFrom: '',
      dateTo: '',
      commodity: '',
      status: '',
      location: '',
      minAmount: '',
      maxAmount: '',
      inspector: ''
    });
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Get urgency color
  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredInspections.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInspections = filteredInspections.slice(startIndex, endIndex);

  // Export functionality
  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Type,Commodity,Location,Date,Quote,Bid Closed,Savings,Status,Inspector\n"
      + filteredInspections.map(inspection => 
          `${inspection.id},${inspection.type},${inspection.commodity},${inspection.location},${inspection.date},$${inspection.quote},$${inspection.bidClosed},$${inspection.savings},${inspection.status},${inspection.inspector.name}`
        ).join("\n");
    
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
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{inspection.type}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(inspection.urgency)}`}>
              {inspection.urgency}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-3">{inspection.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Package className="h-4 w-4" />
              <span>{inspection.commodity}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{inspection.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{inspection.date}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-lg text-sm font-semibold border ${getStatusColor(inspection.status)}`}>
          {inspection.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Quote</div>
          <div className="text-lg font-semibold text-gray-900">${inspection.quote}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Bid Closed</div>
          <div className="text-lg font-semibold text-green-600">${inspection.bidClosed}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Savings</div>
          <div className="text-lg font-semibold text-blue-600">${inspection.savings}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{inspection.inspector.name}</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-600">{inspection.inspector.company}</span>
        </div>
        <button
          onClick={() => {
            setSelectedInspection(inspection);
            setShowDetailModal(true);
          }}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors text-sm font-medium flex items-center space-x-2"
        >
          <Eye className="h-4 w-4" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );

  // Table view component
  const InspectionTable = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('id')}>
                <div className="flex items-center space-x-1">
                  <span>ID</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('commodity')}>
                <div className="flex items-center space-x-1">
                  <span>Commodity</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('location')}>
                <div className="flex items-center space-x-1">
                  <span>Location</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('date')}>
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('amount')}>
                <div className="flex items-center space-x-1">
                  <span>Amount</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('status')}>
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentInspections.map((inspection) => (
              <tr key={inspection.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {inspection.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{inspection.commodity}</div>
                    <div className="text-sm text-gray-500">{inspection.subCommodity}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {inspection.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {inspection.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-gray-900">${inspection.bidClosed}</div>
                    <div className="text-sm text-gray-500">Quote: ${inspection.quote}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold border ${getStatusColor(inspection.status)}`}>
                    {inspection.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedInspection(inspection);
                      setShowDetailModal(true);
                    }}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{selectedInspection.type}</h3>
              <p className="text-gray-600 mt-1">ID: {selectedInspection.id}</p>
            </div>
            <button 
              onClick={() => setShowDetailModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Inspection Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Commodity:</span>
                      <span className="font-medium">{selectedInspection.commodity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sub-Commodity:</span>
                      <span className="font-medium">{selectedInspection.subCommodity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{selectedInspection.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Volume:</span>
                      <span className="font-medium">{selectedInspection.volume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Urgency:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(selectedInspection.urgency)}`}>
                        {selectedInspection.urgency}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Financial Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quote Amount:</span>
                      <span className="font-medium">${selectedInspection.quote}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bid Closed:</span>
                      <span className="font-medium text-green-600">${selectedInspection.bidClosed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Savings:</span>
                      <span className="font-medium text-blue-600">${selectedInspection.savings}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Certificates Section - Replacing Inspector Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Required Certificates
                  </h4>
                  {selectedInspection.certificates && selectedInspection.certificates.length > 0 ? (
                    <div className="space-y-2">
                      {selectedInspection.certificates.map((cert, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                              <Award className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{cert}</div>
                              <div className="text-sm text-gray-600">{certificateDescriptions[cert]}</div>
                            </div>
                          </div>
                          <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Required
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 text-sm">No specific certificates required</p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Status</h4>
                  <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(selectedInspection.status)}`}>
                    {selectedInspection.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedInspection.description}</p>
            </div>

            {/* Parameters */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Inspection Parameters</h4>
              <div className="flex flex-wrap gap-2">
                {selectedInspection.parameters.map((param, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {param}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Timeline</h4>
              <div className="space-y-3">
                {selectedInspection.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{event.status}</span>
                        <span className="text-sm text-gray-500">{event.date} at {event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            {selectedInspection.documents.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Documents</h4>
                <div className="space-y-2">
                  {selectedInspection.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-600" />
                        <span className="font-medium text-gray-900">{doc}</span>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
            <button 
              onClick={() => setShowDetailModal(false)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Close
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Download Report
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <History className="h-8 w-8 mr-3" />
            My History
          </h1>
          <p className="text-gray-600 mt-2">
            Complete record of all your inspection activities
            {selectedCommodityFilter && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Filtered by: {selectedCommodityFilter}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2 ${
              showFilters ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'card' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={exportData}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors font-medium flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <button
              onClick={clearFilters}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search inspections..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Commodity</label>
              <select
                value={filters.commodity}
                onChange={(e) => handleFilterChange('commodity', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              >
                <option value="">All Status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Amount</label>
              <input
                type="number"
                placeholder="Min amount..."
                value={filters.minAmount}
                onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Amount</label>
              <input
                type="number"
                placeholder="Max amount..."
                value={filters.maxAmount}
                onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <History className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{filteredInspections.length}</p>
              <p className="text-gray-600 text-sm">Total Inspections</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {filteredInspections.filter(i => i.status === 'Completed').length}
              </p>
              <p className="text-gray-600 text-sm">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {filteredInspections.filter(i => i.status === 'In Progress').length}
              </p>
              <p className="text-gray-600 text-sm">In Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-xl">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ${filteredInspections.reduce((sum, i) => sum + i.savings, 0)}
              </p>
              <p className="text-gray-600 text-sm">Total Savings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading inspection history...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Content */}
          {filteredInspections.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-gray-200 shadow-sm text-center">
              <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Inspections Found</h3>
              <p className="text-gray-600 mb-6">
                {Object.values(filters).some(f => f) 
                  ? "No inspections match your current filters. Try adjusting your search criteria."
                  : "You haven't requested any inspections yet. Start by raising an enquiry!"
                }
              </p>
              {Object.values(filters).some(f => f) && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Results header */}
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredInspections.length)} of {filteredInspections.length} inspections
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-');
                      setSortBy(field);
                      setSortOrder(order);
                    }}
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gray-500"
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
              {viewMode === 'card' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {currentInspections.map((inspection) => (
                    <InspectionCard key={inspection.id} inspection={inspection} />
                  ))}
                </div>
              ) : (
                <InspectionTable />
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => 
                          page === 1 || 
                          page === totalPages || 
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        )
                        .map((page, index, array) => (
                          <React.Fragment key={page}>
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span className="px-2 py-1 text-gray-500">...</span>
                            )}
                            <button
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-1 rounded-lg transition-colors ${
                                currentPage === page
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        ))
                      }
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600">
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
  );
};

export default MyHistory;