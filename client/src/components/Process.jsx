
import React from 'react';
import { Search, FileText, Settings, Rocket, CheckCircle } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Discovery & Analysis",
      description: "We begin by thoroughly understanding your agricultural challenges, current practices, and specific goals through detailed consultation and site analysis.",
      details: ["Site assessment", "Needs analysis", "Goal setting", "Resource evaluation"]
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Strategy & Planning",
      description: "Our experts develop a comprehensive strategy tailored to your specific needs, incorporating the latest agricultural technologies and best practices.",
      details: ["Custom strategy", "Technology selection", "Timeline planning", "Budget optimization"]
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Implementation",
      description: "We execute the planned solutions with precision, ensuring minimal disruption to your operations while maximizing the effectiveness of new systems.",
      details: ["System installation", "Team training", "Process integration", "Quality assurance"]
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Launch & Optimization",
      description: "After successful implementation, we monitor performance, provide ongoing support, and continuously optimize systems for maximum efficiency.",
      details: ["Performance monitoring", "Continuous optimization", "Ongoing support", "Results tracking"]
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gray-800 rounded-full px-4 py-2 mb-6 border border-gray-700">
            <span className="text-yellow-400 text-sm font-medium">Our Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How We Transform
            <span className="text-yellow-400"> Your Agriculture</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our proven 4-step process ensures successful implementation of agricultural solutions 
            that deliver measurable results and long-term value.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-700 via-yellow-400 to-yellow-400 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 lg:relative lg:top-0 lg:left-0 lg:transform-none lg:mb-6">
                  <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-lg shadow-lg lg:mx-auto">
                    {index + 1}
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-all duration-300 mt-8 lg:mt-0 border border-gray-700">
                  <div className="text-yellow-400 mb-6 flex justify-center lg:justify-start">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-4 text-center lg:text-left">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed text-center lg:text-left">
                    {step.description}
                  </p>
                  
                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your agricultural challenges and explore how our proven process 
              can transform your farming operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
                Start Your Project
              </button>
              <button className="border-2 border-gray-300 text-gray-300 px-8 py-4 rounded-full font-semibold hover:bg-gray-300 hover:text-black transition-colors">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;