// ========================================
// components/DetailAnalysis/DetailAnalysis.jsx
// ========================================

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Map, 
  TrendingUp, 
  FileText,
  Eye,
  RefreshCw,
  Calendar,
  DollarSign,
  Package,
  MapPin,
  Filter,
  Download,
  ArrowRight
} from 'lucide-react';

const DetailAnalysis = ({ onNavigateToHistory }) => {
  // State management
  const [selectedCommodity, setSelectedCommodity] = useState(null);
  const [profitabilityAmount, setProfitabilityAmount] = useState('');
  const [dateRange, setDateRange] = useState('last30days');
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState('prompt');
  const [showLiveTracking, setShowLiveTracking] = useState(false);
  const [liveInspectors, setLiveInspectors] = useState([]);

  // Mock data for live inspectors (real-time tracking)
  const mockLiveInspectors = [
    { 
      id: 'live1', 
      name: 'Inspector John', 
      lat: 28.6139, 
      lng: 77.2090, 
      status: 'en-route', 
      commodity: 'Rice',
      eta: '15 mins',
      lastUpdate: '2 mins ago'
    },
    { 
      id: 'live2', 
      name: 'Inspector Sarah', 
      lat: 19.0760, 
      lng: 72.8777, 
      status: 'inspecting', 
      commodity: 'Cotton',
      eta: 'On site',
      lastUpdate: '1 min ago'
    },
    { 
      id: 'live3', 
      name: 'Inspector Mike', 
      lat: 26.9124, 
      lng: 75.7873, 
      status: 'completed', 
      commodity: 'Wheat',
      eta: 'Finished',
      lastUpdate: '5 mins ago'
    }
  ];

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        setLocationPermission('granted');
        setIsLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationPermission('denied');
        setIsLoading(false);
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert('Location access denied by user.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            alert('Location request timed out.');
            break;
          default:
            alert('An unknown error occurred.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  // Toggle live tracking
  const toggleLiveTracking = () => {
    if (!showLiveTracking) {
      // Simulate real-time updates
      setLiveInspectors(mockLiveInspectors);
      setShowLiveTracking(true);
      
      // Simulate live updates every 30 seconds
      const interval = setInterval(() => {
        setLiveInspectors(prev => prev.map(inspector => ({
          ...inspector,
          lat: inspector.lat + (Math.random() - 0.5) * 0.001, // Small random movement
          lng: inspector.lng + (Math.random() - 0.5) * 0.001,
          lastUpdate: 'Just now'
        })));
      }, 30000);
      
      return () => clearInterval(interval);
    } else {
      setShowLiveTracking(false);
      setLiveInspectors([]);
    }
  };
  const allCommodityData = [
    { name: 'Rice', value: 35, count: 45, color: '#3B82F6' },
    { name: 'Pulses', value: 25, count: 32, color: '#10B981' },
    { name: 'Wheat', value: 20, count: 26, color: '#F59E0B' },
    { name: 'Cotton', value: 12, count: 15, color: '#8B5CF6' },
    { name: 'Others', value: 8, count: 10, color: '#6B7280' }
  ];

  // Mock data for map pinpoints
  const allMapData = {
    'Rice': [
      { id: 1, location: 'Punjab, India', lat: 30.7333, lng: 76.7794, inspections: 15, status: 'active' },
      { id: 2, location: 'West Bengal, India', lat: 22.9868, lng: 87.8550, inspections: 12, status: 'active' },
      { id: 3, location: 'Bihar, India', lat: 25.0961, lng: 85.3131, inspections: 18, status: 'completed' }
    ],
    'Pulses': [
      { id: 4, location: 'Rajasthan, India', lat: 27.0238, lng: 74.2179, inspections: 10, status: 'active' },
      { id: 5, location: 'Maharashtra, India', lat: 19.7515, lng: 75.7139, inspections: 8, status: 'active' },
      { id: 6, location: 'Karnataka, India', lat: 15.3173, lng: 75.7139, inspections: 14, status: 'completed' }
    ],
    'Wheat': [
      { id: 7, location: 'Uttar Pradesh, India', lat: 26.8467, lng: 80.9462, inspections: 20, status: 'active' },
      { id: 8, location: 'Haryana, India', lat: 29.0588, lng: 76.0856, inspections: 6, status: 'completed' }
    ],
    'Cotton': [
      { id: 9, location: 'Gujarat, India', lat: 22.2587, lng: 71.1924, inspections: 9, status: 'active' },
      { id: 10, location: 'Andhra Pradesh, India', lat: 15.9129, lng: 79.7400, inspections: 6, status: 'active' }
    ],
    'Others': [
      { id: 11, location: 'Tamil Nadu, India', lat: 11.1271, lng: 78.6569, inspections: 5, status: 'active' },
      { id: 12, location: 'Kerala, India', lat: 10.8505, lng: 76.2711, inspections: 5, status: 'completed' }
    ]
  };

  // Mock profitability data
  const allProfitabilityData = {
    'Rice': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      quoteData: [1500, 1600, 1400, 1700, 1550, 1650],
      bidClosedData: [1350, 1450, 1200, 1500, 1400, 1500]
    },
    'Pulses': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      quoteData: [800, 900, 750, 950, 850, 900],
      bidClosedData: [720, 800, 650, 850, 750, 800]
    },
    'Wheat': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      quoteData: [1200, 1300, 1100, 1400, 1250, 1350],
      bidClosedData: [1100, 1200, 1000, 1300, 1150, 1250]
    },
    'Cotton': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      quoteData: [2000, 2200, 1900, 2300, 2100, 2250],
      bidClosedData: [1800, 2000, 1700, 2100, 1900, 2050]
    },
    'Others': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      quoteData: [1000, 1100, 950, 1200, 1050, 1150],
      bidClosedData: [900, 1000, 850, 1100, 950, 1050]
    }
  };

  // Mock recent inspections data
  const allInspectionsData = {
    'Rice': [
      { id: 1, type: 'Basmati Rice Quality Check', location: 'Punjab, India', date: '2024-06-20', quote: '$1,500', bidClosed: '$1,350', status: 'Completed' },
      { id: 2, type: 'Jasmine Rice Inspection', location: 'West Bengal, India', date: '2024-06-18', quote: '$1,200', bidClosed: '$1,100', status: 'In Progress' }
    ],
    'Pulses': [
      { id: 3, type: 'Lentil Quality Assessment', location: 'Rajasthan, India', date: '2024-06-19', quote: '$800', bidClosed: '$720', status: 'Completed' },
      { id: 4, type: 'Chickpea Inspection', location: 'Maharashtra, India', date: '2024-06-17', quote: '$900', bidClosed: '$850', status: 'Completed' }
    ],
    'Wheat': [
      { id: 5, type: 'Durum Wheat Check', location: 'Uttar Pradesh, India', date: '2024-06-21', quote: '$1,300', bidClosed: '$1,200', status: 'In Progress' },
      { id: 6, type: 'Whole Wheat Inspection', location: 'Haryana, India', date: '2024-06-16', quote: '$1,100', bidClosed: '$1,000', status: 'Completed' }
    ],
    'Cotton': [
      { id: 7, type: 'Organic Cotton Check', location: 'Gujarat, India', date: '2024-06-22', quote: '$2,200', bidClosed: '$2,000', status: 'In Progress' },
      { id: 8, type: 'Cotton Fiber Quality', location: 'Andhra Pradesh, India', date: '2024-06-15', quote: '$1,900', bidClosed: '$1,700', status: 'Completed' }
    ],
    'Others': [
      { id: 9, type: 'Spice Quality Check', location: 'Tamil Nadu, India', date: '2024-06-20', quote: '$1,000', bidClosed: '$900', status: 'Completed' },
      { id: 10, type: 'Tea Leaf Inspection', location: 'Kerala, India', date: '2024-06-18', quote: '$1,200', bidClosed: '$1,100', status: 'In Progress' }
    ]
  };

  // Get filtered data based on selected commodity
  const getFilteredData = () => {
    if (!selectedCommodity) {
      return {
        commodityData: allCommodityData,
        mapData: Object.values(allMapData).flat(),
        profitabilityData: allProfitabilityData['Rice'], // Default to Rice
        inspectionsData: Object.values(allInspectionsData).flat().slice(0, 4)
      };
    }

    return {
      commodityData: allCommodityData.map(item => ({
        ...item,
        isSelected: item.name === selectedCommodity
      })),
      mapData: allMapData[selectedCommodity] || [],
      profitabilityData: allProfitabilityData[selectedCommodity] || allProfitabilityData['Rice'],
      inspectionsData: allInspectionsData[selectedCommodity] || []
    };
  };

  const { commodityData, mapData, profitabilityData, inspectionsData } = getFilteredData();

  // Handle pie chart click
  const handleCommodityClick = (commodity) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCommodity(selectedCommodity === commodity.name ? null : commodity.name);
      setIsLoading(false);
    }, 500);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCommodity(null);
    setProfitabilityAmount('');
  };

  // Pie chart component
  const PieChart = ({ data, onSliceClick }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    return (
      <div className="relative w-64 h-64 mx-auto">
        <svg width="256" height="256" className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const x1 = 128 + 100 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 128 + 100 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 128 + 100 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 128 + 100 * Math.sin((endAngle * Math.PI) / 180);
            
            const largeArc = angle > 180 ? 1 : 0;
            const pathData = `M 128 128 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`;
            
            currentAngle += angle;

            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                stroke="#fff"
                strokeWidth="2"
                className={`cursor-pointer transition-all duration-300 hover:opacity-80 ${
                  item.isSelected ? 'opacity-100 filter brightness-110' : ''
                }`}
                onClick={() => onSliceClick(item)}
              />
            );
          })}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>
      </div>
    );
  };

  // Line chart component for profitability
  const LineChart = ({ data, amount }) => {
    const maxValue = Math.max(
      ...data.quoteData,
      ...data.bidClosedData,
      amount ? parseInt(amount) : 0
    );
    const chartHeight = 200;
    const chartWidth = 400;

    const getYPosition = (value) => {
      return chartHeight - (value / maxValue) * chartHeight;
    };

    const getXPosition = (index) => {
      return (index / (data.labels.length - 1)) * chartWidth;
    };

    return (
      <div className="w-full overflow-x-auto">
        <svg width={chartWidth + 80} height={chartHeight + 60} className="mx-auto">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <line
              key={index}
              x1={40}
              y1={chartHeight * ratio + 20}
              x2={chartWidth + 40}
              y2={chartHeight * ratio + 20}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* X-axis labels */}
          {data.labels.map((label, index) => (
            <text
              key={index}
              x={getXPosition(index) + 40}
              y={chartHeight + 40}
              textAnchor="middle"
              className="text-sm fill-gray-600"
            >
              {label}
            </text>
          ))}

          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <text
              key={index}
              x={30}
              y={chartHeight * (1 - ratio) + 25}
              textAnchor="end"
              className="text-sm fill-gray-600"
            >
              ${Math.round(maxValue * ratio)}
            </text>
          ))}

          {/* Quote line */}
          <polyline
            points={data.quoteData.map((value, index) => 
              `${getXPosition(index) + 40},${getYPosition(value) + 20}`
            ).join(' ')}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Bid Closed line */}
          <polyline
            points={data.bidClosedData.map((value, index) => 
              `${getXPosition(index) + 40},${getYPosition(value) + 20}`
            ).join(' ')}
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Amount line (if specified) */}
          {amount && (
            <line
              x1={40}
              y1={getYPosition(parseInt(amount)) + 20}
              x2={chartWidth + 40}
              y2={getYPosition(parseInt(amount)) + 20}
              stroke="#F59E0B"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )}

          {/* Data points for Quote */}
          {data.quoteData.map((value, index) => (
            <circle
              key={`quote-${index}`}
              cx={getXPosition(index) + 40}
              cy={getYPosition(value) + 20}
              r="4"
              fill="#3B82F6"
              className="hover:r-6 transition-all duration-200"
            />
          ))}

          {/* Data points for Bid Closed */}
          {data.bidClosedData.map((value, index) => (
            <circle
              key={`bid-${index}`}
              cx={getXPosition(index) + 40}
              cy={getYPosition(value) + 20}
              r="4"
              fill="#10B981"
              className="hover:r-6 transition-all duration-200"
            />
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Detail Analysis</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive analytics dashboard for inspection data
            {selectedCommodity && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Filtered by: {selectedCommodity}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
            <option value="lastyear">Last Year</option>
          </select>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset</span>
          </button>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-700">Updating analysis...</span>
          </div>
        </div>
      )}

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Commodity Pie Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Commodity Inspection Distribution
          </h3>
          
          <PieChart data={commodityData} onSliceClick={handleCommodityClick} />
          
          <div className="mt-6 space-y-2">
            {commodityData.map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  item.isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleCommodityClick(item)}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="font-medium text-gray-900">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{item.value}%</div>
                  <div className="text-xs text-gray-600">{item.count} inspections</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Map Pinpoints with Live Tracking */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Map className="h-5 w-5 mr-2" />
              Inspection Locations
              {selectedCommodity && (
                <span className="ml-2 text-sm text-blue-600">({selectedCommodity} only)</span>
              )}
              {showLiveTracking && (
                <span className="ml-2 flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                  <span className="text-sm text-red-600">Live</span>
                </span>
              )}
            </h3>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={getCurrentLocation}
                disabled={isLoading}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-1 disabled:opacity-50"
              >
                <MapPin className="h-4 w-4" />
                <span>{userLocation ? 'Update' : 'My Location'}</span>
              </button>
              
              <button
                onClick={toggleLiveTracking}
                className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium flex items-center space-x-1 ${
                  showLiveTracking 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${showLiveTracking ? 'bg-white animate-pulse' : 'bg-white'}`}></div>
                <span>{showLiveTracking ? 'Stop Live' : 'Live Track'}</span>
              </button>
            </div>
          </div>
          
          {/* Enhanced map visualization */}
          <div className="relative bg-gray-100 rounded-lg h-64 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"></div>
            
            {/* User's current location */}
            {userLocation && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
                style={{
                  left: `${((userLocation.lng + 80) / 20) * 100}%`,
                  top: `${((90 - userLocation.lat) / 30) * 100}%`
                }}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-blue-600 rounded-full animate-ping opacity-30"></div>
                </div>
                
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <div className="font-medium">Your Location</div>
                  <div>Accuracy: ±{Math.round(userLocation.accuracy)}m</div>
                </div>
              </div>
            )}
            
            {/* Static inspection locations */}
            {mapData.map((location) => (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                style={{
                  left: `${((location.lng + 80) / 20) * 100}%`,
                  top: `${((90 - location.lat) / 30) * 100}%`
                }}
              >
                <div className={`w-3 h-3 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-125 ${
                  location.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                }`}></div>
                
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <div className="font-medium">{location.location}</div>
                  <div>{location.inspections} inspections</div>
                  <div className="capitalize">{location.status}</div>
                </div>
              </div>
            ))}
            
            {/* Live inspectors */}
            {showLiveTracking && liveInspectors
              .filter(inspector => !selectedCommodity || inspector.commodity === selectedCommodity)
              .map((inspector) => (
              <div
                key={inspector.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-30"
                style={{
                  left: `${((inspector.lng + 80) / 20) * 100}%`,
                  top: `${((90 - inspector.lat) / 30) * 100}%`
                }}
              >
                <div className="relative">
                  <div className={`w-5 h-5 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-125 ${
                    inspector.status === 'en-route' ? 'bg-yellow-500 animate-pulse' :
                    inspector.status === 'inspecting' ? 'bg-red-500 animate-bounce' :
                    'bg-green-500'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Movement trail effect */}
                  {inspector.status === 'en-route' && (
                    <div className="absolute inset-0 w-5 h-5 bg-yellow-500 rounded-full animate-ping opacity-30"></div>
                  )}
                </div>
                
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <div className="font-medium">{inspector.name}</div>
                  <div>Status: {inspector.status}</div>
                  <div>Commodity: {inspector.commodity}</div>
                  <div>ETA: {inspector.eta}</div>
                  <div className="text-gray-300">{inspector.lastUpdate}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced Legend */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Active Sites</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
              {userLocation && (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Your Location</span>
                </div>
              )}
            </div>
            
            {showLiveTracking && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">En Route</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                  <span className="text-sm text-gray-600">Inspecting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Inspector Done</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Live tracking info panel */}
          {showLiveTracking && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                Live Inspector Tracking
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {liveInspectors
                  .filter(inspector => !selectedCommodity || inspector.commodity === selectedCommodity)
                  .map((inspector) => (
                  <div key={inspector.id} className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 text-sm">{inspector.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        inspector.status === 'en-route' ? 'bg-yellow-100 text-yellow-700' :
                        inspector.status === 'inspecting' ? 'bg-red-100 text-red-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {inspector.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Commodity: {inspector.commodity}</div>
                      <div>ETA: {inspector.eta}</div>
                      <div className="text-gray-400">Updated: {inspector.lastUpdate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Location permission prompt */}
          {locationPermission === 'prompt' && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Enable Location Access</span>
              </div>
              <p className="text-blue-700 text-sm mb-3">
                Allow location access to see your position relative to inspection sites and get better insights.
              </p>
              <button
                onClick={getCurrentLocation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Enable Location
              </button>
            </div>
          )}
        </div>

        {/* 3. Profitability Graph */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Profitability Analysis
            {selectedCommodity && (
              <span className="ml-2 text-sm text-blue-600">({selectedCommodity})</span>
            )}
          </h3>
          
          {/* Amount input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Set Reference Amount
            </label>
            <input
              type="number"
              value={profitabilityAmount}
              onChange={(e) => setProfitabilityAmount(e.target.value)}
              placeholder="Enter amount (e.g., 1500)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
            />
          </div>
          
          <LineChart data={profitabilityData} amount={profitabilityAmount} />
          
          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-1 bg-blue-500"></div>
              <span className="text-sm text-gray-600">Quote Amount</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-1 bg-green-500"></div>
              <span className="text-sm text-gray-600">Bid Closed</span>
            </div>
            {profitabilityAmount && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-yellow-500 border-dashed border-t-2"></div>
                <span className="text-sm text-gray-600">Reference</span>
              </div>
            )}
          </div>
        </div>

        {/* 4. Detail Report */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Recent Inspections
              {selectedCommodity && (
                <span className="ml-2 text-sm text-blue-600">({selectedCommodity})</span>
              )}
            </h3>
            <button 
              onClick={() => onNavigateToHistory && onNavigateToHistory()}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors text-sm font-medium flex items-center space-x-2"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {inspectionsData.slice(0, 4).map((inspection) => (
              <div key={inspection.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{inspection.type}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{inspection.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{inspection.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">Quote: <span className="font-medium text-gray-900">{inspection.quote}</span></span>
                      <span className="text-gray-600">Closed: <span className="font-medium text-green-600">{inspection.bidClosed}</span></span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        inspection.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {inspection.status}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors ml-4">
                    <Eye className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {inspectionsData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No inspections found for the selected criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailAnalysis;