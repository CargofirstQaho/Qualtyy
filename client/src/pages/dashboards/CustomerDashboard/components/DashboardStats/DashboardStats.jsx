import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle, 
  DollarSign,
  Clock,
  Plus,
  FileText,
  Eye,
  Video,
  ArrowRight,
  Activity,
  Calendar,
  MapPin,
  Users
} from 'lucide-react';

const DashboardStats = ({ 
  user, 
  onNavigateToDetailAnalysis,
  onNavigateToLiveInspection,
  onNavigateToMyHistory,
  onNavigateToPayments,
  onNavigateToRaiseEnquiry
}) => {
  // Mock data for dashboard
  const stats = {
    totalInspections: 128,
    activeOrders: 15,
    completed: 113,
    totalValue: 245000
  };

  const recentInspections = [
    {
      id: 1,
      type: 'Rice Quality Check',
      location: 'Punjab, India',
      date: '2024-06-20',
      status: 'Completed',
      value: '$1,500'
    },
    {
      id: 2,
      type: 'Cotton Inspection',
      location: 'Gujarat, India',
      date: '2024-06-19',
      status: 'In Progress',
      value: '$2,200'
    },
    {
      id: 3,
      type: 'Wheat Assessment',
      location: 'Haryana, India',
      date: '2024-06-18',
      status: 'Completed',
      value: '$1,300'
    }
  ];

  const quickActions = [
    {
      title: 'New Inspection Request',
      description: 'Submit a new commodity inspection request',
      icon: Plus,
      color: 'bg-blue-500',
      onClick: onNavigateToRaiseEnquiry
    },
    {
      title: 'View All Reports',
      description: 'Access detailed analytics and reports',
      icon: FileText,
      color: 'bg-green-500',
      onClick: () => onNavigateToDetailAnalysis()
    },
    {
      title: 'Live Inspection',
      description: 'Monitor ongoing inspections in real-time',
      icon: Video,
      color: 'bg-purple-500',
      onClick: onNavigateToLiveInspection
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.name || 'John'}! Here's your inspection overview.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
            <Activity className="h-4 w-4 text-green-600" />
            <span className="text-green-700 font-medium">System Online</span>
          </div>
          <button 
            onClick={onNavigateToRaiseEnquiry}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Request</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Inspections */}
        <div 
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
          onClick={() => onNavigateToDetailAnalysis()}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Inspections</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalInspections}</p>
              <p className="text-green-600 text-sm mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% from last month
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-blue-600 text-sm font-medium flex items-center">
              View Analysis <ArrowRight className="h-3 w-3 ml-1" />
            </span>
          </div>
        </div>

        {/* Active Orders */}
        <div 
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
          onClick={onNavigateToLiveInspection}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeOrders}</p>
              <p className="text-blue-600 text-sm mt-2 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                3 urgent requests
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg group-hover:bg-yellow-100 transition-colors">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-yellow-600 text-sm font-medium flex items-center">
              Monitor Live <ArrowRight className="h-3 w-3 ml-1" />
            </span>
          </div>
        </div>

        {/* Completed */}
        <div 
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
          onClick={onNavigateToMyHistory}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completed}</p>
              <p className="text-green-600 text-sm mt-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                98.5% success rate
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg group-hover:bg-green-100 transition-colors">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-green-600 text-sm font-medium flex items-center">
              View History <ArrowRight className="h-3 w-3 ml-1" />
            </span>
          </div>
        </div>

        {/* Total Value */}
        <div 
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
          onClick={onNavigateToPayments}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${stats.totalValue.toLocaleString()}
              </p>
              <p className="text-purple-600 text-sm mt-2 flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                +8% revenue growth
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg group-hover:bg-purple-100 transition-colors">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-purple-600 text-sm font-medium flex items-center">
              View Payments <ArrowRight className="h-3 w-3 ml-1" />
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <Users className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-left group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Inspections */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Inspections</h2>
          <button
            onClick={() => onNavigateToDetailAnalysis('recent-inspections')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        
        <div className="space-y-4">
          {recentInspections.map((inspection) => (
            <div key={inspection.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{inspection.type}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{inspection.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{inspection.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-medium text-gray-900">{inspection.value}</div>
                  <div className={`text-sm px-2 py-1 rounded-full font-medium ${
                    inspection.status === 'Completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {inspection.status}
                  </div>
                </div>
                <button 
                  onClick={() => onNavigateToDetailAnalysis()}
                  className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Eye className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center">
          <button
            onClick={() => onNavigateToDetailAnalysis()}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>View Detailed Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;