

import React from 'react';
import { Award, Users, Target, TrendingUp, ArrowRight } from 'lucide-react';
const About = () => {
  const achievements = [
    {
      icon: <Award className="h-10 w-10" />,
      number: "1000+",
      label: "Global Inspectors"
    },
    {
      icon: <Users className="h-10 w-10" />,
      number: "50+",
      label: "Countries Covered"
    },
    {
      icon: <Target className="h-10 w-10" />,
      number: "98%",
      label: "Transparency Rate"
    },
    {
      icon: <TrendingUp className="h-10 w-10" />,
      number: "24/7",
      label: "Platform Support"
    }
  ];

  const values = [
    {
      title: "Raise Inspection Query",
      description: "Create your inspection requirements with budget and timeline specifications on our platform."
    },
    {
      title: "Choose the Best Quote",
      description: "Compare multiple quotes from verified global inspectors and select the best fit for your needs."
    },
    {
      title: "Better Transparency",
      description: "Track inspection progress with live updates and comprehensive reporting for complete visibility."
    },
    {
      title: "Global Inspector Network",
      description: "Access our vast network of certified inspectors across 50+ countries for worldwide coverage."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-indigo-900/20"></div>
      </div>
      
      <div className="w-full px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-yellow-400/30">
              <span className="text-yellow-400 text-sm font-semibold">About Quality.AI</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Revolutionizing Global
              <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">Quality Inspections</span>
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed font-medium">
              Quality.AI is a revolutionary B2B marketplace connecting global traders with certified inspection firms. 
              We eliminate the hassle of traditional communication methods by providing a centralized platform where 
              you can create inspection demands and receive multiple competitive quotes.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed font-medium">
              Our platform maps the entire inspection process, providing status updates and live tracking for complete 
              transparency. Add stakeholders to make quality decisions with instant updates and comprehensive reporting. 
              Quality Inspections simplified.
            </p>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 font-semibold flex items-center group shadow-xl hover:shadow-2xl transform hover:scale-105">
              Learn Our Story
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-3xl blur-3xl"></div>
            <div className="relative grid grid-cols-2 gap-4">
              <img 
                src="https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                alt="Quality inspection technology"
                className="rounded-2xl shadow-2xl w-full h-48 object-cover border border-gray-600"
              />
              <img 
                src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                alt="Global trade network"
                className="rounded-2xl shadow-2xl w-full h-48 object-cover mt-8 border border-gray-600"
              />
              <img 
                src="https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                alt="Digital platform"
                className="rounded-2xl shadow-2xl w-full h-48 object-cover -mt-8 border border-gray-600"
              />
              <img 
                src="https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                alt="Quality control process"
                className="rounded-2xl shadow-2xl w-full h-48 object-cover border border-gray-600"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center group">
              <div className="text-yellow-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {achievement.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">{achievement.number}</div>
              <div className="text-gray-300 font-medium">{achievement.label}</div>
            </div>
          ))}
        </div>

        <div>
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-6">What You Get With Quality.AI</h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
              Our platform provides comprehensive solutions for all your quality inspection needs with AI-based insights 
              and market analytics for better trade decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/50 hover:border-yellow-400/50 group shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">{value.title}</h4>
                <p className="text-gray-300 leading-relaxed font-medium">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;