


import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Services",
      links: [
        "Pre-Production Inspection",
        "During Production Inspection", 
        "Pre-Shipment Inspection",
        "Container Loading Inspection"
      ]
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Our Team",
        "Careers",
        "Contact"
      ]
    },
    {
      title: "Resources",
      links: [
        "Documentation",
        "Help Center",
        "Privacy Policy",
        "Terms of Service"
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="w-full px-6 lg:px-12 xl:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-900 text-sm font-bold">Q</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">Quality.AI</span>
            </div>
            <p className="text-gray-400 mb-6 font-light leading-relaxed max-w-md">
              The leading global marketplace for quality inspections, connecting traders with certified inspection professionals worldwide.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm font-light">+91 807 360 2055</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm font-light">support@quality.ai</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm font-light">
                  WeWork-Vaishnavi Signatures<br />
                  Bellandur, Bangalore, 560103
                </span>
              </div>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-medium text-white mb-4 text-sm tracking-wide">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-light">
              © 2024 Quality.AI. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;