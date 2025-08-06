// import React, { useState } from 'react';
// import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

// const Testimonials = () => {
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);

//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "Farm Owner",
//       company: "Green Valley Farms",
//       location: "Rangpur, Bangladesh",
//       image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//       quote: "AgriExcellence transformed our farming operations completely. Their smart monitoring system helped us increase our rice yield by 35% while reducing water consumption by 50%. The ROI was incredible!",
//       rating: 5,
//       results: ["35% yield increase", "50% water savings", "ROI in 6 months"]
//     },
//     {
//       name: "Mohammad Rahman",
//       role: "Agricultural Manager",
//       company: "Organic Harvest Co.",
//       location: "Sylhet, Bangladesh",
//       image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//       quote: "The soil analysis program provided by AgriExcellence was game-changing. We achieved organic certification and improved our crop quality significantly. Their expertise is unmatched in the industry.",
//       rating: 5,
//       results: ["Organic certification", "40% quality improvement", "Cost reduction"]
//     },
//     {
//       name: "Fatima Ahmed",
//       role: "Greenhouse Manager",
//       company: "GreenHouse Innovations",
//       location: "Dhaka, Bangladesh",
//       image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//       quote: "The automated climate control system has revolutionized our greenhouse operations. We now have year-round production with optimal growing conditions. The team's support has been exceptional.",
//       rating: 5,
//       results: ["Year-round production", "30% energy savings", "Automated operations"]
//     },
//     {
//       name: "Ahmed Hassan",
//       role: "Farm Director",
//       company: "Sustainable Farms Ltd.",
//       location: "Chittagong, Bangladesh",
//       image: "https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//       quote: "Their pest detection system helped us reduce pesticide use by 80% while maintaining crop health. The early warning system is incredibly accurate and has saved us thousands in potential losses.",
//       rating: 5,
//       results: ["80% pesticide reduction", "Early pest detection", "Cost savings"]
//     }
//   ];

//   const nextTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   const current = testimonials[currentTestimonial];

//   return (
//     <section className="py-20 bg-green-600">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
//             <span className="text-green-100 text-sm font-medium">Client Testimonials</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             What Our Clients Say
//             <span className="text-yellow-400"> About Us</span>
//           </h2>
//           <p className="text-xl text-green-100 max-w-3xl mx-auto">
//             Don't just take our word for it. Here's what our clients have to say about 
//             their experience working with AgriExcellence.
//           </p>
//         </div>

//         <div className="max-w-5xl mx-auto">
//           <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
//             <Quote className="h-16 w-16 text-green-600 mb-8 mx-auto opacity-20" />
            
//             <div className="grid md:grid-cols-3 gap-8 items-center">
//               <div className="md:col-span-1 text-center">
//                 <img 
//                   src={current.image} 
//                   alt={current.name}
//                   className="w-32 h-32 rounded-full object-cover shadow-lg mx-auto mb-6"
//                 />
//                 <h4 className="text-xl font-semibold text-gray-900 mb-1">{current.name}</h4>
//                 <p className="text-gray-600 mb-1">{current.role}</p>
//                 <p className="text-green-600 font-medium mb-1">{current.company}</p>
//                 <p className="text-gray-500 text-sm mb-4">{current.location}</p>
                
//                 <div className="flex justify-center mb-4">
//                   {[...Array(current.rating)].map((_, i) => (
//                     <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//               </div>
              
//               <div className="md:col-span-2">
//                 <p className="text-xl text-gray-700 mb-8 leading-relaxed italic">
//                   "{current.quote}"
//                 </p>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                   {current.results.map((result, index) => (
//                     <div key={index} className="bg-green-50 rounded-lg p-4 text-center">
//                       <div className="text-green-600 font-semibold text-sm">{result}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Navigation */}
//             <div className="flex justify-between items-center mt-8">
//               <button
//                 onClick={prevTestimonial}
//                 className="p-3 rounded-full bg-gray-100 hover:bg-green-100 transition-colors"
//               >
//                 <ChevronLeft className="h-6 w-6 text-gray-600" />
//               </button>
              
//               <div className="flex space-x-2">
//                 {testimonials.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentTestimonial(index)}
//                     className={`w-3 h-3 rounded-full transition-colors ${
//                       index === currentTestimonial ? 'bg-green-600' : 'bg-gray-300'
//                     }`}
//                   />
//                 ))}
//               </div>
              
//               <button
//                 onClick={nextTestimonial}
//                 className="p-3 rounded-full bg-gray-100 hover:bg-green-100 transition-colors"
//               >
//                 <ChevronRight className="h-6 w-6 text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="mt-16 text-center">
//           <h3 className="text-2xl font-bold text-white mb-4">Join Our Success Stories</h3>
//           <p className="text-green-100 mb-8 max-w-2xl mx-auto">
//             Ready to transform your agricultural operations? Let's discuss how we can help you achieve similar results.
//           </p>
//           <button className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition-colors">
//             Start Your Success Story
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;

import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Farm Owner",
      company: "Green Valley Farms",
      location: "Rangpur, Bangladesh",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      quote: "AgriExcellence transformed our farming operations completely. Their smart monitoring system helped us increase our rice yield by 35% while reducing water consumption by 50%. The ROI was incredible!",
      rating: 5,
      results: ["35% yield increase", "50% water savings", "ROI in 6 months"]
    },
    {
      name: "Mohammad Rahman",
      role: "Agricultural Manager",
      company: "Organic Harvest Co.",
      location: "Sylhet, Bangladesh",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      quote: "The soil analysis program provided by AgriExcellence was game-changing. We achieved organic certification and improved our crop quality significantly. Their expertise is unmatched in the industry.",
      rating: 5,
      results: ["Organic certification", "40% quality improvement", "Cost reduction"]
    },
    {
      name: "Fatima Ahmed",
      role: "Greenhouse Manager",
      company: "GreenHouse Innovations",
      location: "Dhaka, Bangladesh",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      quote: "The automated climate control system has revolutionized our greenhouse operations. We now have year-round production with optimal growing conditions. The team's support has been exceptional.",
      rating: 5,
      results: ["Year-round production", "30% energy savings", "Automated operations"]
    },
    {
      name: "Ahmed Hassan",
      role: "Farm Director",
      company: "Sustainable Farms Ltd.",
      location: "Chittagong, Bangladesh",
      image: "https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      quote: "Their pest detection system helped us reduce pesticide use by 80% while maintaining crop health. The early warning system is incredibly accurate and has saved us thousands in potential losses.",
      rating: 5,
      results: ["80% pesticide reduction", "Early pest detection", "Cost savings"]
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gray-800 rounded-full px-4 py-2 mb-6 border border-gray-700">
            <span className="text-yellow-400 text-sm font-medium">Client Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Clients Say
            <span className="text-yellow-400"> About Us</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about 
            their experience working with AgriExcellence.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 relative border border-gray-700">
            <Quote className="h-16 w-16 text-yellow-400 mb-8 mx-auto opacity-40" />
            
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 text-center">
                <img 
                  src={current.image} 
                  alt={current.name}
                  className="w-32 h-32 rounded-full object-cover shadow-lg mx-auto mb-6 border-2 border-yellow-400"
                />
                <h4 className="text-xl font-semibold text-white mb-1">{current.name}</h4>
                <p className="text-gray-300 mb-1">{current.role}</p>
                <p className="text-yellow-400 font-medium mb-1">{current.company}</p>
                <p className="text-gray-400 text-sm mb-4">{current.location}</p>
                
                <div className="flex justify-center mb-4">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-xl text-gray-200 mb-8 leading-relaxed italic">
                  "{current.quote}"
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {current.results.map((result, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4 text-center border border-gray-600">
                      <div className="text-yellow-400 font-semibold text-sm">{result}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors border border-gray-600"
              >
                <ChevronLeft className="h-6 w-6 text-gray-300" />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-yellow-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors border border-gray-600"
              >
                <ChevronRight className="h-6 w-6 text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Join Our Success Stories</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to transform your agricultural operations? Let's discuss how we can help you achieve similar results.
          </p>
          <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
            Start Your Success Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;