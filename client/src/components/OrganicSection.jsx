import React from 'react';
import { Leaf, Award, Shield, Heart } from 'lucide-react';

const OrganicSection = () => {
  const features = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "100% Organic",
      description: "Certified organic produce grown without harmful chemicals"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Premium Quality",
      description: "Hand-picked products meeting the highest quality standards"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Farm Fresh",
      description: "Direct from farm to table within 24 hours of harvest"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Healthy Living",
      description: "Nutritious produce for a healthier lifestyle"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Organic
              <span className="text-green-600"> Product Farm</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We are committed to providing the finest organic produce, cultivated with care 
              and dedication to sustainable farming practices. Our products are grown without 
              synthetic pesticides, herbicides, or fertilizers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-green-600 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-3xl opacity-20"></div>
            <img 
              src="https://images.pexels.com/photos/4750279/pexels-photo-4750279.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
              alt="Organic farming"
              className="relative z-10 rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganicSection;