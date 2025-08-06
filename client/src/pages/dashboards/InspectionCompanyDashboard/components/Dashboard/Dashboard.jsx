import React, { useState } from 'react';
import { 
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  DollarSign,
  BarChart3,
  FileText,
  Video,
  ArrowRight,
  ClipboardCheck
} from 'lucide-react';

const Dashboard = ({ onNavigateToBidRoom, onNavigateToInspectionRoom, onNavigateToAnalytics, onNavigateToPayments, onNavigateToBidHistory }) => {
  const [bidAmounts, setBidAmounts] = useState({});
  
  const handleMakeBid = (bidId) => {
    const amount = bidAmounts[bidId];
    if (amount) {
      alert(`Bid of $${amount} placed for inspection ID: ${bidId}`);
      setBidAmounts(prev => ({ ...prev, [bidId]: '' }));
    } else {
      alert('Please enter a bid amount');
    }
  };

  const handleBidChange = (bidId, value) => {
    setBidAmounts(prev => ({ ...prev, [bidId]: value }));
  };

  // Sample data for recent bids
  const recentBids = [
    { id: 1, type: 'Residential Property', status: 'Won', amount: '$420', date: '2 hours ago' },
    { id: 2, type: 'Commercial Building', status: 'Active', amount: '$780', date: '1 day ago' },
    { id: 3, type: 'Electrical System', status: 'Lost', amount: '$300', date: '3 days ago' },
  ];

  // Sample live bids data
  const liveBids = [
    {
      id: 1,
      inspectionType: 'Residential Property Inspection',
      quote: '$450',
      currentBid: '$420',
      status: 'Active'
    },
    {
      id: 2,
      inspectionType: 'Commercial Building Safety',
      quote: '$850',
      currentBid: '$780',
      status: 'Active'
    },
    {
      id: 3,
      inspectionType: 'Electrical System Check',
      quote: '$320',
      currentBid: '$300',
      status: 'Active'
    },
    {
      id: 4,
      inspectionType: 'Plumbing Inspection',
      quote: '$280',
      currentBid: '$260',
      status: 'Active'
    }
  ];

  // Sample active inspections data
  const activeInspections = [
    {
      id: 1,
      inspectionType: 'Residential Property Inspection',
      quote: '$450',
      myBid: '$420',
      status: 'In Progress'
    },
    {
      id: 2,
      inspectionType: 'Commercial Building Safety',
      quote: '$850',
      myBid: '$780',
      status: 'Scheduled'
    },
    {
      id: 3,
      inspectionType: 'Electrical System Check',
      quote: '$320',
      myBid: '$300',
      status: 'Completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, John Inspector! Here's your inspection overview.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">System Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Main Content (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Bids Section */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 shadow-sm">
              <div className="p-3 border-b border-blue-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Live Bids</h2>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {liveBids.length} Active Bids
                  </span>
                </div>
              </div>
              <div className="p-3">
                {/* Cards instead of table */}
                <div className="space-y-2">
                  {liveBids.map((bid) => (
                    <div key={bid.id} className="bg-white/80 rounded-lg p-2.5 border border-blue-200 hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1.5">
                            <div>
                              <h3 className="font-medium text-gray-900 text-sm">{bid.inspectionType}</h3>
                              <p className="text-xs text-gray-500">ID: {bid.id}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div>
                              <p className="text-xs text-gray-500">Quote</p>
                              <span className="text-sm font-semibold text-green-600">{bid.quote}</span>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Current Bid</p>
                              <span className="text-sm font-semibold text-blue-600">{bid.currentBid}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-3">
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                            <input
                              type="number"
                              placeholder="Enter bid"
                              value={bidAmounts[bid.id] || ''}
                              onChange={(e) => handleBidChange(bid.id, e.target.value)}
                              className="pl-6 pr-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-20 bg-white text-sm"
                            />
                          </div>
                          <button
                            onClick={() => handleMakeBid(bid.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md transition-colors font-medium text-xs"
                          >
                            Bid
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {liveBids.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-500 text-lg">No live bids available at the moment</div>
                    <p className="text-gray-400 mt-2">Check back later for new inspection opportunities</p>
                  </div>
                )}
              </div>
              
              {/* View Details Button */}
              <div className="p-3 border-t border-blue-200">
                <div className="flex justify-center">
                  <button 
                    onClick={onNavigateToBidRoom}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg font-medium transition-colors flex items-center space-x-2 text-xs"
                  >
                    <span>View Details</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* My Active Inspections Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 shadow-sm">
              <div className="p-3 border-b border-purple-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">My Active Inspections</h2>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {activeInspections.length} Active
                  </span>
                </div>
              </div>
              <div className="p-3">
                {/* Cards instead of table */}
                <div className="space-y-2">
                  {activeInspections.map((inspection) => (
                    <div 
                      key={inspection.id} 
                      className="bg-white/80 rounded-lg p-2.5 border border-purple-200 hover:shadow-sm transition-shadow cursor-pointer"
                      onClick={onNavigateToInspectionRoom}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1.5">
                            <div>
                              <h3 className="font-medium text-gray-900 text-sm">{inspection.inspectionType}</h3>
                              <p className="text-xs text-gray-500">ID: {inspection.id}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              inspection.status === 'In Progress' ? 'bg-orange-100 text-orange-800' :
                              inspection.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                              inspection.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {inspection.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div>
                              <p className="text-xs text-gray-500">Quote</p>
                              <span className="text-sm font-semibold text-green-600">{inspection.quote}</span>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">My Bid</p>
                              <span className="text-sm font-semibold text-blue-600">{inspection.myBid}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {activeInspections.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-500 text-lg">No active inspections at the moment</div>
                    <p className="text-gray-400 mt-2">Your won bids will appear here once they become active</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Stats Boxes (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
              
              {/* Total Inspections */}
              <div 
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={onNavigateToAnalytics}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">Total Inspections</p>
                    <h3 className="text-2xl font-bold text-gray-900">42</h3>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 size={20} className="text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp size={16} className="mr-1" />
                  <span>+12% from last month</span>
                </div>
              </div>

              {/* My Revenue */}
              <div 
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={onNavigateToPayments}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">My Revenue</p>
                    <h3 className="text-2xl font-bold text-gray-900">$18,500</h3>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign size={20} className="text-green-600" />
                  </div>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <DollarSign size={16} className="mr-1" />
                  <span>+8% revenue growth</span>
                </div>
              </div>

              {/* Total Bids Quoted */}
              <div 
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={onNavigateToBidHistory}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">Total Bids Quoted</p>
                    <h3 className="text-2xl font-bold text-gray-900">156</h3>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText size={20} className="text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center text-purple-600 text-sm">
                  <CheckCircle size={16} className="mr-1" />
                  <span>85% success rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;