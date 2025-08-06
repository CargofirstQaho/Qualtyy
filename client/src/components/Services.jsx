

import React from 'react';        
import { Leaf, BarChart3, Shield, Zap, CheckCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Leaf className="h-10 w-10" />,
      title: "Pre-Production Inspection (PPI)",
      description: "Quality checks before production begins to ensure compliance with specifications and regulatory standards.",
      features: ["Material verification", "Specification review", "Production planning", "Quality standards setup"],
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: "During Production Inspection (DUPRO)",
      description: "In-process quality monitoring to catch issues early and maintain consistent quality throughout production.",
      features: ["Real-time monitoring", "Process verification", "Quality control checks", "Progress reporting"],
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Pre-Shipment Inspection (PSI)",
      description: "Final quality verification before goods are shipped to ensure they meet all requirements and standards.",
      features: ["Final quality checks", "Packaging inspection", "Quantity verification", "Compliance certification"],
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Container Loading Inspection (CLI)",
      description: "Supervision of container loading process to prevent damage and ensure proper handling of goods.",
      features: ["Loading supervision", "Container condition check", "Proper stowage verification", "Damage prevention"],
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-3 mb-6 border border-blue-200 shadow-sm">
            <span className="text-blue-700 text-sm font-semibold">Our Services</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Comprehensive Quality
            <span className="relative ml-3">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Inspection Services</span>
              <div className="absolute -bottom-3 left-0 w-full h-4 bg-gradient-to-r from-green-300 to-emerald-300 -z-10 transform -rotate-1 rounded-full"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium">
            We offer a complete suite of quality inspection services designed to ensure your cargo meets the highest standards 
            and regulatory requirements across global markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-3 flex flex-col h-full border border-gray-100 shadow-lg"
            >
              <div className={`text-white mb-6 group-hover:scale-110 transition-transform duration-300 w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed flex-grow font-medium">{service.description}</p>
              
              <div className="space-y-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto font-medium">
              Raise your inspection query with a budget and get multiple quotes from verified global inspectors. 
              Choose the best for your cargo inspection needs.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              Request Inspection Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;