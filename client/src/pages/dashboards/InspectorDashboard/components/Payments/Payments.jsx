import React, { useState } from 'react';
import { 
  Download, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  FileText, 
  Calendar, 
  MapPin, 
  Eye,
  User,
  Package,
  Phone,
  Mail,
  Building,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  Hash
} from 'lucide-react';

const Payments = () => {
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Sample data - replace with your actual data
  const paymentSummary = {
    totalReceived: 45750.00,
    ongoingPayments: 8300.00,
    earnings: 12450.00
  };

  const inspectionDetails = [
    {
      id: 'INV-2024-001',
      clientName: 'ABC Trading Ltd',
      inspectionDate: '2024-06-15',
      location: 'Mumbai Port',
      commodityType: 'Electronics',
      quantity: '500 units',
      amount: 2500.00,
      status: 'Completed',
      invoiceNumber: 'INV-001-2024',
      // Enhanced details for modal
      contactPerson: 'Rajesh Kumar',
      contactNumber: '+91 98765 43210',
      email: 'rajesh@abctrading.com',
      companyAddress: '123 Business District, Mumbai, Maharashtra 400001',
      inspectionDuration: '6 hours',
      inspectorName: 'John Inspector',
      paymentMethod: 'Bank Transfer',
      paymentDate: '2024-06-20',
      detailedDescription: 'Comprehensive quality inspection of electronic components including smartphones, tablets, and accessories. All items were checked for functionality, physical condition, and compliance with international standards.',
      findings: ['All items meet quality standards', 'No defective units found', 'Packaging in excellent condition', 'Documentation complete'],
      nextPaymentDate: null,
      totalPaidAmount: 2500.00,
      remainingAmount: 0.00,
      priority: 'Medium'
    },
    {
      id: 'INV-2024-002',
      clientName: 'XYZ Exports',
      inspectionDate: '2024-06-18',
      location: 'Delhi Warehouse',
      commodityType: 'Textiles',
      quantity: '200 kg',
      amount: 1800.00,
      status: 'Pending Payment',
      invoiceNumber: 'INV-002-2024',
      // Enhanced details for modal
      contactPerson: 'Priya Sharma',
      contactNumber: '+91 98765 54321',
      email: 'priya@xyzexports.com',
      companyAddress: '456 Export Hub, New Delhi, Delhi 110001',
      inspectionDuration: '4 hours',
      inspectorName: 'John Inspector',
      paymentMethod: 'Pending',
      paymentDate: null,
      detailedDescription: 'Quality inspection of textile products including cotton fabrics, silk materials, and finished garments for export compliance and quality assurance.',
      findings: ['Quality meets export standards', 'Minor packaging issues noted', 'Documentation needs update', 'Overall acceptable condition'],
      nextPaymentDate: '2024-07-15',
      totalPaidAmount: 0.00,
      remainingAmount: 1800.00,
      priority: 'High'
    },
    {
      id: 'INV-2024-003',
      clientName: 'Global Imports',
      inspectionDate: '2024-06-20',
      location: 'Chennai Port',
      commodityType: 'Machinery',
      quantity: '10 units',
      amount: 4000.00,
      status: 'Completed',
      invoiceNumber: 'INV-003-2024',
      // Enhanced details for modal
      contactPerson: 'Michael Johnson',
      contactNumber: '+91 98765 65432',
      email: 'michael@globalimports.com',
      companyAddress: '789 Port Area, Chennai, Tamil Nadu 600001',
      inspectionDuration: '8 hours',
      inspectorName: 'John Inspector',
      paymentMethod: 'Credit Card',
      paymentDate: '2024-06-22',
      detailedDescription: 'Detailed inspection of industrial machinery including motors, pumps, and control systems. All units were tested for functionality, safety compliance, and operational efficiency.',
      findings: ['All machinery in excellent condition', 'Safety standards met', 'Performance tests passed', 'Installation ready'],
      nextPaymentDate: null,
      totalPaidAmount: 4000.00,
      remainingAmount: 0.00,
      priority: 'Critical'
    }
  ];

  const handleDownloadInvoice = (invoiceNumber, clientName) => {
    // Implement invoice download logic here
    console.log(`Downloading invoice ${invoiceNumber} for ${clientName}`);
    // You can implement actual PDF generation or API call here
  };

  const handleViewDetails = (inspection) => {
    setSelectedInspection(inspection);
    setShowDetailsModal(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending Payment':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments Overview</h1>
          <p className="text-gray-600">Track your earnings and manage payment details</p>
        </div>

        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Payments Received */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Payments Received</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(paymentSummary.totalReceived)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Ongoing Payments */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Ongoing Payments</p>
                <p className="text-2xl font-bold text-yellow-600">{formatCurrency(paymentSummary.ongoingPayments)}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* My Earnings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">My Earnings</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(paymentSummary.earnings)}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Inspection Details with Invoice Download */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-gray-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Inspection Details & Invoices</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inspection Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commodity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inspectionDetails.map((inspection) => (
                  <tr key={inspection.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{inspection.clientName}</div>
                        <div className="text-sm text-gray-500">ID: {inspection.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 mb-1">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {inspection.inspectionDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {inspection.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{inspection.commodityType}</div>
                      <div className="text-sm text-gray-500">{inspection.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(inspection.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inspection.status)}`}>
                        {inspection.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDownloadInvoice(inspection.invoiceNumber, inspection.clientName)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewDetails(inspection)}
                        className="inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Enhanced Details Modal */}
      {showDetailsModal && selectedInspection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Inspection Payment Details</h2>
                  <p className="text-gray-600">Invoice: {selectedInspection.invoiceNumber}</p>
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
                  {/* Client Information */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      Client Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Company Name:</span>
                        <p className="text-gray-900">{selectedInspection.clientName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Contact Person:</span>
                        <p className="text-gray-900">{selectedInspection.contactPerson}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          Phone:
                        </span>
                        <p className="text-gray-900">{selectedInspection.contactNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          Email:
                        </span>
                        <p className="text-gray-900">{selectedInspection.email}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          Address:
                        </span>
                        <p className="text-gray-900">{selectedInspection.companyAddress}</p>
                      </div>
                    </div>
                  </div>

                  {/* Inspection Details */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-green-600" />
                      Inspection Details
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Hash className="w-4 h-4 mr-1" />
                          Inspection ID:
                        </span>
                        <p className="text-gray-900">{selectedInspection.id}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Date:
                        </span>
                        <p className="text-gray-900">{selectedInspection.inspectionDate}</p>
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
                          <Package className="w-4 h-4 mr-1" />
                          Commodity:
                        </span>
                        <p className="text-gray-900">{selectedInspection.commodityType}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Quantity:</span>
                        <p className="text-gray-900">{selectedInspection.quantity}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Duration:
                        </span>
                        <p className="text-gray-900">{selectedInspection.inspectionDuration}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Inspector:</span>
                        <p className="text-gray-900">{selectedInspection.inspectorName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Priority:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedInspection.priority)}`}>
                          {selectedInspection.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Payment Information */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                      Payment Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Total Amount:</span>
                        <p className="text-2xl font-bold text-purple-600">{formatCurrency(selectedInspection.amount)}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Amount Paid:</span>
                        <p className="text-lg font-semibold text-green-600">{formatCurrency(selectedInspection.totalPaidAmount)}</p>
                      </div>
                      {selectedInspection.remainingAmount > 0 && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Remaining Amount:</span>
                          <p className="text-lg font-semibold text-red-600">{formatCurrency(selectedInspection.remainingAmount)}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-medium text-gray-600">Payment Method:</span>
                        <p className="text-gray-900">{selectedInspection.paymentMethod}</p>
                      </div>
                      {selectedInspection.paymentDate && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Payment Date:</span>
                          <p className="text-gray-900">{selectedInspection.paymentDate}</p>
                        </div>
                      )}
                      {selectedInspection.nextPaymentDate && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Next Payment Due:</span>
                          <p className="text-red-600 font-medium">{selectedInspection.nextPaymentDate}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-medium text-gray-600">Status:</span>
                        <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedInspection.status)}`}>
                          {selectedInspection.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Inspection Findings */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-yellow-600" />
                      Inspection Findings
                    </h3>
                    <div className="space-y-2">
                      {selectedInspection.findings.map((finding, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span className="text-sm text-gray-900">{finding}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Alert */}
                  {selectedInspection.status === 'Pending Payment' && (
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border border-red-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 text-red-800 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Payment Pending
                      </h3>
                      <p className="text-red-700 text-sm mb-3">
                        This inspection has pending payment. Please follow up with the client for payment processing.
                      </p>
                      {selectedInspection.nextPaymentDate && (
                        <p className="text-red-800 text-sm font-medium">
                          Next Payment Due: {selectedInspection.nextPaymentDate}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed Description Section (Full Width) */}
              <div className="mt-6 bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Detailed Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedInspection.detailedDescription}</p>
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
                  <button
                    onClick={() => handleDownloadInvoice(selectedInspection.invoiceNumber, selectedInspection.clientName)}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Invoice</span>
                  </button>
                  
                  {selectedInspection.status === 'Pending Payment' && (
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Send Payment Reminder
                    </button>
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

export default Payments;