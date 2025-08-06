import React, { useState, useEffect } from 'react';
import { 
  Wallet,
  DollarSign,
  TrendingDown,
  Plus,
  CreditCard,
  Building,
  CheckCircle,
  Download,
  Calendar,
  MapPin,
  FileText,
  AlertCircle,
  ArrowLeft,
  Eye,
  X
} from 'lucide-react';

const Payments = ({ selectedInspector, inspectionDetails, onBack }) => {
  const [walletBalance, setWalletBalance] = useState(1500); // Mock wallet balance
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showBankDetails, setShowBankDetails] = useState(false);

  // Mock data - in real app, this would come from props
  const mockInspectionData = {
    quoteAmount: selectedInspector?.biddingAmount || 1200,
    totalBids: 8,
    originalBudget: 2000,
    inspectionType: 'Basmati Rice Quality Assessment',
    location: 'Punjab, India',
    inspectorName: selectedInspector?.inspectorName || 'John Smith',
    company: selectedInspector?.company || 'Elite Inspections Pvt Ltd'
  };

  const amountSaved = mockInspectionData.originalBudget - mockInspectionData.quoteAmount;
  const isWalletSufficient = walletBalance >= mockInspectionData.quoteAmount;

  const handleAddMoney = () => {
    if (!addAmount || addAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setWalletBalance(prev => prev + parseInt(addAmount));
      setAddAmount('');
      setShowAddMoney(false);
      setShowBankDetails(false);
      setIsProcessing(false);
      alert('Money added successfully!');
    }, 2000);
  };

  const handleBookInspector = () => {
    if (!isWalletSufficient) {
      setShowAddMoney(true);
      return;
    }

    setIsProcessing(true);
    // Simulate booking process
    setTimeout(() => {
      setWalletBalance(prev => prev - mockInspectionData.quoteAmount);
      setBookingConfirmed(true);
      
      // Generate order details
      const newOrder = {
        orderNumber: `ORD-${Date.now()}`,
        inspectionType: mockInspectionData.inspectionType,
        location: mockInspectionData.location,
        date: new Date().toLocaleDateString(),
        paymentAmount: mockInspectionData.quoteAmount,
        orderStatus: 'Confirmed',
        inspector: mockInspectionData.inspectorName,
        company: mockInspectionData.company,
        invoiceId: `INV-${Date.now()}`
      };
      
      setOrderDetails(newOrder);
      setIsProcessing(false);
    }, 2000);
  };

  const downloadInvoice = () => {
    // Simulate invoice download
    const invoiceData = `
Order Invoice
=============
Order Number: ${orderDetails.orderNumber}
Inspector: ${orderDetails.inspector}
Company: ${orderDetails.company}
Inspection Type: ${orderDetails.inspectionType}
Location: ${orderDetails.location}
Date: ${orderDetails.date}
Amount Paid: $${orderDetails.paymentAmount}
Status: ${orderDetails.orderStatus}
Invoice ID: ${orderDetails.invoiceId}
    `;
    
    const blob = new Blob([invoiceData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice-${orderDetails.orderNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Wallet className="h-8 w-8 mr-3" />
            Payment Center
          </h1>
          <p className="text-gray-600 mt-2">
            Complete your inspection booking payment
          </p>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Bidding</span>
          </button>
        )}
      </div>

      {!bookingConfirmed ? (
        <>
      {/* Payment Overview - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-600">My Wallet</h3>
            <Wallet className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-900">${walletBalance}</div>
          <p className="text-xs text-blue-700 mt-1">
            {bookingConfirmed ? 'Current Balance' : 'Available Balance'}
          </p>
        </div>

        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-red-600">Quote Amount</h3>
            <DollarSign className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-900">${mockInspectionData.quoteAmount}</div>
          <p className="text-xs text-red-700 mt-1">
            {bookingConfirmed ? 'Amount Paid' : 'Inspector Bid'}
          </p>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-purple-600">Total Bids</h3>
            <Eye className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-900">{mockInspectionData.totalBids}</div>
          <p className="text-xs text-purple-700 mt-1">Received</p>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-green-600">Amount Saved</h3>
            <TrendingDown className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-900">${amountSaved}</div>
          <p className="text-xs text-green-700 mt-1">vs Original Budget</p>
        </div>
      </div>

          {/* Inspector Details */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Inspector</h3>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <Eye className="h-8 w-8 text-gray-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900">{mockInspectionData.inspectorName}</h4>
                <p className="text-gray-600">{mockInspectionData.company}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{mockInspectionData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileText className="h-3 w-3" />
                    <span>{mockInspectionData.inspectionType}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">${mockInspectionData.quoteAmount}</div>
                <p className="text-sm text-gray-500">Final Quote</p>
              </div>
            </div>
          </div>

          {/* Wallet Balance Check */}
          {!isWalletSufficient && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="text-yellow-800 font-medium">Insufficient Wallet Balance</h4>
                  <p className="text-yellow-700 text-sm mt-1">
                    You need ${mockInspectionData.quoteAmount - walletBalance} more to complete this booking.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {!isWalletSufficient ? (
              <button
                onClick={() => setShowAddMoney(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Money to Wallet</span>
              </button>
            ) : (
              <button
                onClick={handleBookInspector}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>{isProcessing ? 'Processing...' : 'Book Inspector'}</span>
              </button>
            )}
            
            <button
              onClick={() => setShowAddMoney(true)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Wallet className="h-5 w-5" />
              <span>Add Money</span>
            </button>
          </div>
        </>
      ) : (
        /* Booking Confirmed - Order Details */
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="text-xl font-bold text-green-900">Booking Confirmed!</h3>
                <p className="text-green-700">Your inspection has been successfully booked.</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Order Details</h3>
              <button
                onClick={downloadInvoice}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Invoice</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Order Number</label>
                  <p className="text-lg font-semibold text-gray-900">{orderDetails?.orderNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Inspection Type</label>
                  <p className="text-lg font-semibold text-gray-900">{orderDetails?.inspectionType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-lg font-semibold text-gray-900">{orderDetails?.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date</label>
                  <p className="text-lg font-semibold text-gray-900">{orderDetails?.date}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Amount</label>
                  <p className="text-lg font-semibold text-gray-900">${orderDetails?.paymentAmount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Order Status</label>
                  <span className="inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {orderDetails?.orderStatus}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Inspector</label>
                  <p className="text-lg font-semibold text-gray-900">{orderDetails?.inspector}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Company</label>
                  <p className="text-lg font-semibold text-gray-900">{orderDetails?.company}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Invoice ID: {orderDetails?.invoiceId}</p>
                  <p className="text-sm text-gray-500">Generated on {orderDetails?.date}</p>
                </div>
                <button
                  onClick={downloadInvoice}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Money to Wallet</h3>
              <button
                onClick={() => setShowAddMoney(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Add
                </label>
                <input
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {!isWalletSufficient && (
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum required: ${mockInspectionData.quoteAmount - walletBalance}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowBankDetails(true)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Proceed to Payment
                </button>
                <button
                  onClick={() => setShowAddMoney(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Bank Details</h3>
              <button
                onClick={() => setShowBankDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Building className="h-4 w-4 mr-2" />
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
                    <span className="font-medium text-blue-900">AgriInspect Wallet</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Transfer Amount: ${addAmount}</p>
                    <p>Please mention your user ID in the transfer description for quick processing.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddMoney}
                  disabled={isProcessing}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {isProcessing ? 'Processing...' : 'Confirm Transfer'}
                </button>
                <button
                  onClick={() => setShowBankDetails(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
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

export default Payments;