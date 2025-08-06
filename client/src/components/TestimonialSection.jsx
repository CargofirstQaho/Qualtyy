import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialSection = () => {
  const testimonial = {
    name: "Sarah Johnson",
    role: "Local Farmer",
    location: "Dhaka, Bangladesh",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    quote: "Working with AgriExcellence has completely transformed my farming practices. Their organic methods have not only improved my crop yields but also helped me create a sustainable business that supports my family and community.",
    rating: 5
  };

  return (
    <section className="py-20 bg-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What People Say
            <span className="text-yellow-400"> About Agrice</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-32 h-32 rounded-full object-cover shadow-lg"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <Quote className="h-12 w-12 text-green-600 mb-4 mx-auto md:mx-0" />
                <p className="text-xl text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center justify-center md:justify-start mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                  <p className="text-green-600 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;