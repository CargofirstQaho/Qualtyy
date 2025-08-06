import React from 'react';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "Sustainable Rice Farming Initiative",
      location: "Rangpur, Bangladesh",
      date: "2024",
      description: "Implementing eco-friendly rice cultivation techniques that increase yield while reducing environmental impact.",
      image: "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Organic Vegetable Cultivation",
      location: "Sylhet, Bangladesh",
      date: "2024",
      description: "Developing organic vegetable farming systems that provide healthy produce to local communities.",
      image: "https://images.pexels.com/photos/4750279/pexels-photo-4750279.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Smart Irrigation Systems",
      location: "Chittagong, Bangladesh",
      date: "2023",
      description: "Advanced water management solutions for efficient irrigation in drought-prone areas.",
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore Our
            <span className="text-green-600"> Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our innovative agricultural projects that are transforming 
            farming practices across Bangladesh and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center text-white text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{project.location}</span>
                    <Calendar className="h-4 w-4 ml-4 mr-1" />
                    <span>{project.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                <button className="flex items-center text-green-600 hover:text-green-700 font-semibold group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;