// import React from 'react';
// import { Leaf, Heart, Shield, Star } from 'lucide-react';

// const HealthyLifeSection = () => {
//   const benefits = [
//     {
//       icon: <Leaf className="h-8 w-8" />,
//       title: "Natural Growth",
//       description: "No synthetic chemicals or pesticides used in cultivation"
//     },
//     {
//       icon: <Heart className="h-8 w-8" />,
//       title: "Heart Healthy",
//       description: "Rich in nutrients that support cardiovascular health"
//     },
//     {
//       icon: <Shield className="h-8 w-8" />,
//       title: "Immunity Boost",
//       description: "Packed with vitamins and antioxidants for strong immunity"
//     },
//     {
//       icon: <Star className="h-8 w-8" />,
//       title: "Premium Quality",
//       description: "Hand-selected produce meeting highest quality standards"
//     }
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-br from-green-900 to-green-700 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">
//             Healthy Life With
//             <span className="text-yellow-400"> Fresh Product</span>
//           </h2>
//           <p className="text-xl text-green-100 max-w-3xl mx-auto">
//             Experience the difference that truly fresh, organic produce makes in your daily life. 
//             Our commitment to quality ensures you get the best nutrition nature has to offer.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {benefits.map((benefit, index) => (
//             <div key={index} className="text-center group">
//               <div className="bg-green-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-green-800/70 transition-all duration-300">
//                 <div className="text-yellow-400 mb-6 flex justify-center">
//                   {benefit.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
//                 <p className="text-green-100 leading-relaxed">{benefit.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-16 text-center">
//           <button className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
//             Shop Fresh Products
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HealthyLifeSection;


import React from 'react';
import { Leaf, Heart, Shield, Star } from 'lucide-react';

const HealthyLifeSection = () => {
  const benefits = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Natural Growth",
      description: "No synthetic chemicals or pesticides used in cultivation"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Heart Healthy",
      description: "Rich in nutrients that support cardiovascular health"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Immunity Boost",
      description: "Packed with vitamins and antioxidants for strong immunity"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Premium Quality",
      description: "Hand-selected produce meeting highest quality standards"
    }
  ];

  return (
    <section className="py-20 bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Healthy Life With
            <span className="text-yellow-400"> Fresh Products</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience the difference that truly fresh, organic produce makes in your daily life. 
            Our commitment to quality ensures you get the best nutrition nature has to offer.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 hover:bg-gray-800 transition-all duration-300">
                <div className="text-yellow-400 mb-6 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            Shop Fresh Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default HealthyLifeSection;
