import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter,
  PieChart,
  LineChart,
  Target,
  DollarSign,
  Clock,
  Award,
  Users,
  ChevronDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const DetailAnalysis = ({ onNavigateToBidHistory, onNavigateToPayments, onNavigateToInspectionRoom, onNavigateToBidRoom }) => {
  const [timeFilter, setTimeFilter] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Sample analytics data
  const performanceMetrics = {
    totalBids: 156,
    bidsGrowth: 15.2,
    revenueEarned: 18500,
    revenueGrowth: 8.5,
    activeBids: 8,
    activeGrowth: 12,
    liveBids: 4,
    liveGrowth: -5.1,
    avgBidAmount: 450,
    bidGrowth: -2.1
  };

  // Regional analysis data
  const regionalData = [
    { region: 'New York', bids: 45, revenue: 6200, avgBid: 420, color: '#3B82F6' },
    { region: 'California', bids: 38, revenue: 5800, avgBid: 465, color: '#8B5CF6' },
    { region: 'Texas', bids: 32, revenue: 4100, avgBid: 385, color: '#10B981' },
    { region: 'Florida', bids: 25, revenue: 2800, avgBid: 350, color: '#F59E0B' },
    { region: 'Illinois', bids: 16, revenue: 1600, avgBid: 400, color: '#EF4444' }
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 2800, inspections: 8, bids: 12, successRate: 67 },
    { month: 'Feb', revenue: 3200, inspections: 9, bids: 14, successRate: 71 },
    { month: 'Mar', revenue: 2900, inspections: 7, bids: 11, successRate: 82 },
    { month: 'Apr', revenue: 3800, inspections: 10, bids: 13, successRate: 77 },
    { month: 'May', revenue: 4200, inspections: 12, bids: 16, successRate: 88 },
    { month: 'Jun', revenue: 1600, inspections: 4, bids: 8, successRate: 75 }
  ];

  const inspectionTypes = [
    { type: 'Residential Property', count: 18, percentage: 42.9, revenue: 7500 },
    { type: 'Commercial Building', count: 12, percentage: 28.6, revenue: 6200 },
    { type: 'Electrical System', count: 8, percentage: 19.0, revenue: 3100 },
    { type: 'Plumbing', count: 4, percentage: 9.5, revenue: 1700 }
  ];

//   const competitorComparison = [
//     { metric: 'Average Bid Amount', myValue: 450, industry: 425, performance: 'above' },
//     { metric: 'Success Rate', myValue: 85, industry: 78, performance: 'above' },
//     { metric: 'Response Time', myValue: 2.3, industry: 3.1, performance: 'above' },
//     { metric: 'Customer Rating', myValue: 4.8, industry: 4.5, performance: 'above' }
//   ];

//   const recentTrends = [
//     { trend: 'Residential inspections up 23%', type: 'positive', period: 'Last 30 days' },
//     { trend: 'Average bid amount decreased 5%', type: 'negative', period: 'Last 7 days' },
//     { trend: 'Response time improved by 15%', type: 'positive', period: 'Last 14 days' },
//     { trend: 'Success rate increased 8%', type: 'positive', period: 'Last 30 days' }
//   ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Detail Analysis</h1>
            <p className="text-gray-600 mt-1">Comprehensive insights into your inspection performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="weekly">Last 7 Days</option>
              <option value="monthly">Last 30 Days</option>
              <option value="quarterly">Last 3 Months</option>
              <option value="yearly">Last Year</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Download size={16} />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Key Performance Metrics - MANDATORY REQUIREMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Total Bids - Navigate to Bid History */}
          <div 
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
            onClick={onNavigateToBidHistory}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm">Total Bids</p>
                <h3 className="text-2xl font-bold text-gray-900">{performanceMetrics.totalBids}</h3>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 size={20} className="text-blue-600" />
              </div>
            </div>
            <div className={`flex items-center text-sm ${performanceMetrics.bidsGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {performanceMetrics.bidsGrowth > 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
              <span>{Math.abs(performanceMetrics.bidsGrowth)}% from last period</span>
            </div>
          </div>

          {/* Revenue Earned - Navigate to Payments */}
          <div 
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
            onClick={onNavigateToPayments}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm">Revenue Earned</p>
                <h3 className="text-2xl font-bold text-gray-900">${performanceMetrics.revenueEarned.toLocaleString()}</h3>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign size={20} className="text-green-600" />
              </div>
            </div>
            <div className={`flex items-center text-sm ${performanceMetrics.revenueGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {performanceMetrics.revenueGrowth > 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
              <span>{Math.abs(performanceMetrics.revenueGrowth)}% from last period</span>
            </div>
          </div>

          {/* Active Bids - Navigate to Inspection Room */}
          <div 
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
            onClick={onNavigateToInspectionRoom}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm">Active Bids</p>
                <h3 className="text-2xl font-bold text-gray-900">{performanceMetrics.activeBids}</h3>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-orange-600" />
              </div>
            </div>
            <div className={`flex items-center text-sm ${performanceMetrics.activeGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {performanceMetrics.activeGrowth > 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
              <span>{Math.abs(performanceMetrics.activeGrowth)}% from last period</span>
            </div>
          </div>

          {/* Live Bids - Navigate to Bid Room */}
          <div 
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
            onClick={onNavigateToBidRoom}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm">Live Bids</p>
                <h3 className="text-2xl font-bold text-gray-900">{performanceMetrics.liveBids}</h3>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target size={20} className="text-purple-600" />
              </div>
            </div>
            <div className={`flex items-center text-sm ${performanceMetrics.liveGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {performanceMetrics.liveGrowth > 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
              <span>{Math.abs(performanceMetrics.liveGrowth)}% from last period</span>
            </div>
          </div>

          {/* Success Rate - Additional Relevant Metric */}
          {/* <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm">Success Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">{performanceMetrics.successRate}%</h3>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award size={20} className="text-yellow-600" />
              </div>
            </div>
            <div className={`flex items-center text-sm ${performanceMetrics.successGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {performanceMetrics.successGrowth > 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
              <span>{Math.abs(performanceMetrics.successGrowth)}% from last period</span>
            </div>
          </div> */}
        </div>

        {/* Regional Analysis Chart - MANDATORY REQUIREMENT */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 shadow-sm">
            <div className="p-6 border-b border-indigo-200 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Regional Analysis</h3>
                <div className="flex items-center space-x-2">
                  <PieChart size={20} className="text-indigo-600" />
                  <span className="text-sm text-gray-500">Performance by Location</span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Bids by Region</h4>
                  <div className="h-64 flex items-end space-x-3">
                    {regionalData.map((region, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="rounded-t w-full transition-all duration-300 hover:opacity-80"
                          style={{ 
                            height: `${(region.bids / 50) * 200}px`,
                            backgroundColor: region.color
                          }}
                        ></div>
                        <span className="text-xs text-gray-600 mt-2 text-center">{region.region}</span>
                        <span className="text-xs font-semibold text-gray-800">{region.bids} bids</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regional Details */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Regional Performance</h4>
                  <div className="space-y-4">
                    {regionalData.map((region, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: region.color }}
                          ></div>
                          <div>
                            <div className="font-medium text-gray-900">{region.region}</div>
                            <div className="text-sm text-gray-500">{region.bids} bids submitted</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">${region.revenue.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">Avg: ${region.avgBid}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend Chart */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
            <div className="p-6 border-b border-blue-200 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                <LineChart size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm">
              <div className="h-64 flex items-end space-x-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
                      style={{ height: `${(data.revenue / 4500) * 200}px` }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                    <span className="text-xs font-semibold text-gray-800">${data.revenue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inspection Types Distribution */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 shadow-sm">
            <div className="p-6 border-b border-purple-200 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Inspection Types</h3>
                <PieChart size={20} className="text-purple-600" />
              </div>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm">
              <div className="space-y-4">
                {inspectionTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'][index] }}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">{type.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">{type.count}</div>
                      <div className="text-xs text-gray-500">{type.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Comparison & Trends */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm">
            <div className="p-6 border-b border-green-200 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Industry Comparison</h3>
                <Users size={20} className="text-green-600" />
              </div>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm">
              <div className="space-y-4">
                {competitorComparison.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{item.metric}</div>
                      <div className="text-sm text-gray-500">vs Industry Average</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {item.metric.includes('Time') ? `${item.myValue}h` : 
                         item.metric.includes('Rate') || item.metric.includes('Rating') ? `${item.myValue}${item.metric.includes('Rate') ? '%' : '★'}` : 
                         `$${item.myValue}`}
                      </div>
                      <div className={`text-xs flex items-center ${item.performance === 'above' ? 'text-green-600' : 'text-red-600'}`}>
                        {item.performance === 'above' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                        <span className="ml-1">
                          {item.metric.includes('Time') ? `${item.industry}h avg` : 
                           item.metric.includes('Rate') || item.metric.includes('Rating') ? `${item.industry}${item.metric.includes('Rate') ? '%' : '★'} avg` : 
                           `$${item.industry} avg`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 shadow-sm">
            <div className="p-6 border-b border-yellow-200 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Trends</h3>
                <TrendingUp size={20} className="text-yellow-600" />
              </div>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm">
              <div className="space-y-4">
                {recentTrends.map((trend, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                    <div className={`p-1 rounded-full ${trend.type === 'positive' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {trend.type === 'positive' ? 
                        <ArrowUp size={12} className="text-green-600" /> : 
                        <ArrowDown size={12} className="text-red-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{trend.trend}</div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Clock size={12} className="mr-1" />
                        {trend.period}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}

        {/* Detailed Insights */}
        {/* <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 bg-white/70 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h3>
          </div>
          <div className="p-6 bg-white/50 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/70 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">🎯 Optimization Opportunity</h4>
                <p className="text-gray-600 text-sm">Your residential property inspection bids have a 95% success rate. Consider increasing your bid amounts by 8-12% to maximize revenue while maintaining competitiveness.</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">📈 Growth Trend</h4>
                <p className="text-gray-600 text-sm">Commercial building inspections show 34% month-over-month growth. This segment represents a significant expansion opportunity for your business.</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-gray-900 mb-2">⚡ Performance Boost</h4>
                <p className="text-gray-600 text-sm">Your response time of 2.3 hours is 26% faster than industry average. Leverage this competitive advantage in your bidding strategy.</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">🔄 Market Shift</h4>
                <p className="text-gray-600 text-sm">Electrical system inspections are trending upward in your area. Consider developing specialized expertise to capture this growing market.</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DetailAnalysis;