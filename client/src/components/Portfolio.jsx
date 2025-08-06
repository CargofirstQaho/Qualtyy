// // import React, { useState } from 'react';
// // import { ArrowRight, MapPin, Calendar, ExternalLink } from 'lucide-react';

// // const Portfolio = () => {
// //   const [activeFilter, setActiveFilter] = useState('all');

// //   const filters = [
// //     { id: 'all', label: 'All Projects' },
// //     { id: 'monitoring', label: 'Crop Monitoring' },
// //     { id: 'analysis', label: 'Soil Analysis' },
// //     { id: 'optimization', label: 'Yield Optimization' },
// //     { id: 'automation', label: 'Farm Automation' }
// //   ];

// //   const projects = [
// //     {
// //       id: 1,
// //       title: "Smart Rice Farm Monitoring System",
// //       category: "monitoring",
// //       location: "Rangpur, Bangladesh",
// //       date: "2024",
// //       description: "Implemented IoT-based monitoring system that increased rice yield by 35% through real-time crop health tracking.",
// //       image: "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
// //       results: ["35% yield increase", "50% water savings", "Real-time monitoring"],
// //       client: "Green Valley Farms"
// //     },
// //     {
// //       id: 2,
// //       title: "Precision Soil Analysis Program",
// //       category: "analysis",
// //       location: "Sylhet, Bangladesh",
// //       date: "2024",
// //       description: "Comprehensive soil analysis and nutrient management program for organic vegetable cultivation.",
// //       image: "https://images.pexels.com/photos/4750279/pexels-photo-4750279.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
// //       results: ["40% nutrient efficiency", "Organic certification", "Cost reduction"],
// //       client: "Organic Harvest Co."
// //     },
// //     {
// //       id: 3,
// //       title: "Automated Irrigation System",
// //       category: "automation",
// //       location: "Chittagong, Bangladesh",
// //       date: "2023",
// //       description: "Smart irrigation system with weather integration and soil moisture sensors for optimal water management.",
// //       image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
// //       results: ["60% water savings", "Automated scheduling", "Remote monitoring"],
// //       client: "AquaFarm Solutions"
// //     },
// //     {
// //       id: 4,
// //       title: "Crop Yield Optimization",
// //       category: "optimization",
// //       location: "Dhaka, Bangladesh",
// //       date: "2023",
// //       description: "Data-driven approach to maximize crop yields through optimized planting schedules and resource allocation.",
// //       image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
// //       results: ["45% yield improvement", "Data-driven insights", "Resource optimization"],
// //       client: "Metro Agriculture"
// //     },
// //     {
// //       id: 5,
// //       title: "Greenhouse Climate Control",
// //       category: "automation",
// //       location: "Barisal, Bangladesh",
// //       date: "2023",
// //       description: "Advanced climate control system for greenhouse operations with automated temperature and humidity management.",
// //       image: "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
// //       results: ["Year-round production", "Climate optimization", "Energy efficiency"],
// //       client: "GreenHouse Innovations"
// //     },
// //     {
// //       id: 6,
// //       title: "Pest Detection & Management",
// //       category: "monitoring",
// //       location: "Rajshahi, Bangladesh",
// //       date: "2022",
// //       description: "AI-powered pest detection system with early warning alerts and targeted treatment recommendations.",
// //       image: "https://images.pexels.com/photos/4750279/pexels-photo-4750279.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
// //       results: ["80% pest reduction", "Early detection", "Reduced pesticide use"],
// //       client: "Sustainable Farms Ltd."
// //     }
// //   ];

// //   const filteredProjects = activeFilter === 'all' 
// //     ? projects 
// //     : projects.filter(project => project.category === activeFilter);

// //   return (
// //     <section id="portfolio" className="py-20 bg-gray-50">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="text-center mb-16">
// //           <div className="inline-flex items-center bg-green-100 rounded-full px-4 py-2 mb-6">
// //             <span className="text-green-600 text-sm font-medium">Our Portfolio</span>
// //           </div>
// //           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
// //             Successful Projects &
// //             <span className="text-green-600"> Case Studies</span>
// //           </h2>
// //           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
// //             Explore our portfolio of successful agricultural projects that have transformed 
// //             farming operations and delivered measurable results for our clients.
// //           </p>
// //         </div>

// //         <div className="flex flex-wrap justify-center gap-4 mb-12">
// //           {filters.map((filter) => (
// //             <button
// //               key={filter.id}
// //               onClick={() => setActiveFilter(filter.id)}
// //               className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
// //                 activeFilter === filter.id
// //                   ? 'bg-green-600 text-white shadow-lg'
// //                   : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-600'
// //               }`}
// //             >
// //               {filter.label}
// //             </button>
// //           ))}
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {filteredProjects.map((project) => (
// //             <div key={project.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
// //               <div className="relative overflow-hidden">
// //                 <img 
// //                   src={project.image} 
// //                   alt={project.title}
// //                   className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
// //                 <div className="absolute bottom-4 left-4 right-4">
// //                   <div className="flex items-center text-white text-sm mb-2">
// //                     <MapPin className="h-4 w-4 mr-1" />
// //                     <span>{project.location}</span>
// //                     <Calendar className="h-4 w-4 ml-4 mr-1" />
// //                     <span>{project.date}</span>
// //                   </div>
// //                 </div>
// //                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
// //                   <ExternalLink className="h-5 w-5 text-gray-700" />
// //                 </div>
// //               </div>
              
// //               <div className="p-6">
// //                 <div className="text-sm text-green-600 font-medium mb-2">{project.client}</div>
// //                 <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
// //                 <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                
// //                 <div className="space-y-2 mb-6">
// //                   {project.results.map((result, index) => (
// //                     <div key={index} className="flex items-center space-x-2">
// //                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
// //                       <span className="text-sm text-gray-600">{result}</span>
// //                     </div>
// //                   ))}
// //                 </div>
                
// //                 <button className="flex items-center text-green-600 hover:text-green-700 font-semibold group">
// //                   View Case Study
// //                   <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="mt-16 text-center">
// //           <button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold">
// //             View All Projects
// //           </button>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Portfolio;



import React, { useState } from 'react';
import { ArrowRight, MapPin, Calendar, ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'monitoring', label: 'Crop Monitoring' },
    { id: 'analysis', label: 'Soil Analysis' },
    { id: 'optimization', label: 'Yield Optimization' },
    { id: 'automation', label: 'Farm Automation' }
  ];

  const projects = [
    {
      id: 1,
      title: "Smart Rice Farm Monitoring System",
      category: "monitoring",
      location: "Rangpur, Bangladesh",
      date: "2024",
      description: "Implemented IoT-based monitoring system that increased rice yield by 35% through real-time crop health tracking.",
      image: "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      results: ["35% yield increase", "50% water savings", "Real-time monitoring"],
      client: "Green Valley Farms"
    },
    {
      id: 2,
      title: "Precision Soil Analysis Program",
      category: "analysis",
      location: "Sylhet, Bangladesh",
      date: "2024",
      description: "Comprehensive soil analysis and nutrient management program for organic vegetable cultivation.",
      image: "https://images.pexels.com/photos/4750279/pexels-photo-4750279.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      results: ["40% nutrient efficiency", "Organic certification", "Cost reduction"],
      client: "Organic Harvest Co."
    },
    {
      id: 3,
      title: "Automated Irrigation System",
      category: "automation",
      location: "Chittagong, Bangladesh",
      date: "2023",
      description: "Smart irrigation system with weather integration and soil moisture sensors for optimal water management.",
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      results: ["60% water savings", "Automated scheduling", "Remote monitoring"],
      client: "AquaFarm Solutions"
    },
    {
      id: 4,
      title: "Crop Yield Optimization",
      category: "optimization",
      location: "Dhaka, Bangladesh",
      date: "2023",
      description: "Data-driven approach to maximize crop yields through optimized planting schedules and resource allocation.",
      image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      results: ["45% yield improvement", "Data-driven insights", "Resource optimization"],
      client: "Metro Agriculture"
    },
    {
      id: 5,
      title: "Greenhouse Climate Control",
      category: "automation",
      location: "Barisal, Bangladesh",
      date: "2023",
      description: "Advanced climate control system for greenhouse operations with automated temperature and humidity management.",
      image: "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      results: ["Year-round production", "Climate optimization", "Energy efficiency"],
      client: "GreenHouse Innovations"
    },
    {
      id: 6,
      title: "Pest Detection & Management",
      category: "monitoring",
      location: "Rajshahi, Bangladesh",
      date: "2022",
      description: "AI-powered pest detection system with early warning alerts and targeted treatment recommendations.",
      image: "https://images.pexels.com/photos/4750279/pexels-photo-4750279.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      results: ["80% pest reduction", "Early detection", "Reduced pesticide use"],
      client: "Sustainable Farms Ltd."
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gray-800 rounded-full px-4 py-2 mb-6 border border-gray-700">
            <span className="text-yellow-400 text-sm font-medium">Our Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Successful Projects &
            <span className="text-yellow-400"> Case Studies</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our portfolio of successful agricultural projects that have transformed 
            farming operations and delivered measurable results for our clients.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-yellow-400 text-black shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-yellow-400 border border-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-700">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center text-gray-200 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{project.location}</span>
                    <Calendar className="h-4 w-4 ml-4 mr-1" />
                    <span>{project.date}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="h-5 w-5 text-gray-200" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-sm text-yellow-400 font-medium mb-2">{project.client}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="space-y-2 mb-6">
                  {project.results.map((result, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">{result}</span>
                    </div>
                  ))}
                </div>
                
                <button className="flex items-center text-yellow-400 hover:text-yellow-300 font-semibold group">
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-yellow-400 text-black px-8 py-4 rounded-lg hover:bg-yellow-300 transition-colors font-semibold">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;