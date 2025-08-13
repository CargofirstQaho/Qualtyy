

// import React from 'react';        
// import { Leaf, BarChart3, Shield, Zap, CheckCircle } from 'lucide-react';

// const Services = () => {
//   const services = [
//     {
//       icon: <Leaf className="h-10 w-10" />,
//       title: "Pre-Production Inspection (PPI)",
//       description: "Quality checks before production begins to ensure compliance with specifications and regulatory standards.",
//       features: ["Material verification", "Specification review", "Production planning", "Quality standards setup"],
//       color: "from-green-500 to-emerald-600"
//     },
//     {
//       icon: <BarChart3 className="h-10 w-10" />,
//       title: "During Production Inspection (DUPRO)",
//       description: "In-process quality monitoring to catch issues early and maintain consistent quality throughout production.",
//       features: ["Real-time monitoring", "Process verification", "Quality control checks", "Progress reporting"],
//       color: "from-blue-500 to-cyan-600"
//     },
//     {
//       icon: <Shield className="h-10 w-10" />,
//       title: "Pre-Shipment Inspection (PSI)",
//       description: "Final quality verification before goods are shipped to ensure they meet all requirements and standards.",
//       features: ["Final quality checks", "Packaging inspection", "Quantity verification", "Compliance certification"],
//       color: "from-purple-500 to-indigo-600"
//     },
//     {
//       icon: <Zap className="h-10 w-10" />,
//       title: "Container Loading Inspection (CLI)",
//       description: "Supervision of container loading process to prevent damage and ensure proper handling of goods.",
//       features: ["Loading supervision", "Container condition check", "Proper stowage verification", "Damage prevention"],
//       color: "from-orange-500 to-red-600"
//     }
//   ];

//   return (
//     <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
//       <div className="w-full px-6 lg:px-12 xl:px-16">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-3 mb-6 border border-blue-200 shadow-sm">
//             <span className="text-blue-700 text-sm font-semibold">Our Services</span>
//           </div>
//           <h2 className="text-5xl md:text-6xl font-bold mb-6">
//             Comprehensive Quality
//             <span className="relative ml-3">
//               <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Inspection Services</span>
//               <div className="absolute -bottom-3 left-0 w-full h-4 bg-gradient-to-r from-green-300 to-emerald-300 -z-10 transform -rotate-1 rounded-full"></div>
//             </span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium">
//             We offer a complete suite of quality inspection services designed to ensure your cargo meets the highest standards 
//             and regulatory requirements across global markets.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {services.map((service, index) => (
//             <div 
//               key={index} 
//               className="bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-3 flex flex-col h-full border border-gray-100 shadow-lg"
//             >
//               <div className={`text-white mb-6 group-hover:scale-110 transition-transform duration-300 w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center shadow-lg`}>
//                 {service.icon}
//               </div>
              
//               <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
//               <p className="text-gray-600 mb-6 leading-relaxed flex-grow font-medium">{service.description}</p>
              
//               <div className="space-y-3">
//                 {service.features.map((feature, idx) => (
//                   <div key={idx} className="flex items-center space-x-3">
//                     <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
//                       <div className="w-2 h-2 bg-white rounded-full"></div>
//                     </div>
//                     <span className="text-sm text-gray-600 font-medium">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-20 text-center">
//           <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
//             <h3 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
//             <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto font-medium">
//               Raise your inspection query with a budget and get multiple quotes from verified global inspectors. 
//               Choose the best for your cargo inspection needs.
//             </p>
//             <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
//               Request Inspection Quote
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // export default Services;

// import React, { useEffect, useRef, useState } from 'react';
// import { Leaf, BarChart3, Shield, Zap, Package, MapPin } from 'lucide-react';

// const Services = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);
//   const featuredServices = [
//     {
//       icon: <Package size={40} />,
//       title: "Sourcing Inspection",
//       description: "Get your cargo inspected at time of loading or production with comprehensive quality checks and documentation.",
//       features: [
//         "Commodity quality inspection", 
//         "Loading/stuffing inspections", 
//         "Packaging, fumigation & more", 
//         "Physical & chemical testing"
//       ],
//       whyFeatures: [
//         "Maintaining quality at time of production",
//         "Ensuring proper packaging and documentation", 
//         "Better control of your cargo from production stage",
//         "Ensure transparency & traceability for your cargo",
//         "Competitive pricing"
//       ]
//     },
//     {
//       icon: <MapPin size={40} />,
//       title: "Destination Inspection", 
//       description: "Your cargo & commodity quality details at destination locations with comprehensive quality validation.",
//       features: [
//         "Unloading inspections",
//         "Physical & chemical testing", 
//         "Quality validation at destination",
//         "Documentation & reporting"
//       ],
//       whyFeatures: [
//         "Ensure commodity quality after reaching destinations",
//         "A validation & proof of your cargo quality before any clause or discounts",
//         "Better transparency and visibility", 
//         "Add value to your cargo with quality proofs",
//         "Ensure quality for better negotiations",
//         "Competitive pricing"
//       ]
//     }
//   ];

//   const services = [
//     {
//       icon: <Leaf size={40} />,
//       title: "Pre-Production Inspection (PPI)",
//       description: "Quality checks before production begins to ensure compliance with specifications and regulatory standards.",
//       features: ["Material verification", "Specification review", "Production planning", "Quality standards setup"],
//     },
//     {
//       icon: <BarChart3 size={40} />,
//       title: "During Production Inspection (DUPRO)",
//       description: "In-process quality monitoring to catch issues early and maintain consistent quality throughout production.",
//       features: ["Real-time monitoring", "Process verification", "Quality control checks", "Progress reporting"],
//     },
//     {
//       icon: <Shield size={40} />,
//       title: "Pre-Shipment Inspection (PSI)",
//       description: "Final quality verification before goods are shipped to ensure they meet all requirements and standards.",
//       features: ["Final quality checks", "Packaging inspection", "Quantity verification", "Compliance certification"],
//     },
//     {
//       icon: <Zap size={40} />,
//       title: "Container Loading Inspection (CLI)",
//       description: "Supervision of container loading process to prevent damage and ensure proper handling of goods.",
//       features: ["Loading supervision", "Container condition check", "Proper stowage verification", "Damage prevention"],
//     },
//     {
//       icon: "🧪",
//       title: "On-Site Laboratory Testing / Sampling",
//       description: "Collects and tests samples to verify specifications, especially for agri-commodities, food, chemicals, and pharmaceuticals.",
//       features: ["Moisture content analysis", "Purity verification", "Pesticide residue testing", "Technical parameter checks"],
//     },
//     {
//       icon: "🛃",
//       title: "Customs Inspection",
//       description: "Government-mandated checks for compliance with legal and safety regulations at ports of export or import.",
//       features: ["Legal compliance verification", "Safety regulation checks", "Prohibited substance detection", "Duty & tax assessment"],
//     },
//     {
//       icon: "📦",
//       title: "Post-Shipment Inspection",
//       description: "Confirms that products match shipping documents and assess condition after arrival at destination.",
//       features: ["Document verification", "Damage assessment", "Supplier performance evaluation", "Claims documentation"],
//     },
//     {
//       icon: "✅",
//       title: "Third-Party Inspection",
//       description: "Independent inspection agencies provide objective evaluation of product quality, compliance, and documentation.",
//       features: ["Neutral evaluation", "International buyer requirements", "Government compliance", "Objective quality assessment"],
//     }
//   ];

//   const servicesStyles = {
//     services: {
//       padding: '6rem 2rem',
//       background: '#F8F9FA',
//       position: 'relative'
//     },
//     topBorder: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       height: '1px',
//       background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)'
//     },
//     container: {
//       maxWidth: '1400px',
//       margin: '0 auto'
//     },
//     sectionHeader: {
//       textAlign: 'center',
//       marginBottom: '4rem'
//     },
//     badge: {
//       display: 'inline-block',
//       background: 'rgba(108, 92, 231, 0.1)',
//       color: '#6C5CE7',
//       padding: '0.5rem 1.5rem',
//       borderRadius: '25px',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       marginBottom: '2rem',
//       border: '1px solid rgba(108, 92, 231, 0.2)'
//     },
//     title: {
//       fontSize: '3.5rem',
//       fontWeight: '900',
//       lineHeight: '1.2',
//       marginBottom: '2rem',
//       color: '#2D3436'
//     },
//     highlight: {
//       background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text'
//     },
//     description: {
//       fontSize: '1.2rem',
//       color: 'rgba(45, 52, 54, 0.7)',
//       maxWidth: '800px',
//       margin: '0 auto',
//       lineHeight: '1.6'
//     },
//     featuredGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
//       gap: '2rem',
//       marginBottom: '5rem',
//       maxWidth: '900px',
//       margin: '0 auto 5rem auto'
//     },
//     servicesGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//       gap: '2rem',
//       marginTop: '4rem'
//     },
//     serviceCard: {
//       background: 'white',
//       padding: '2rem 1.5rem',
//       borderRadius: '20px',
//       boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
//       transition: 'all 0.3s ease',
//       position: 'relative',
//       overflow: 'hidden',
//       cursor: 'pointer',
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100%',
//       maxWidth: '320px',
//       margin: '0 auto'
//     },
//     cardTopBorder: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       height: '4px',
//       background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)'
//     },
//     serviceIcon: {
//       width: '55px',
//       height: '55px',
//       background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
//       borderRadius: '15px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginBottom: '1.5rem',
//       color: 'white',
//       transition: 'transform 0.3s ease'
//     },
//     serviceTitle: {
//       fontSize: '1.25rem',
//       fontWeight: '700',
//       marginBottom: '0.75rem',
//       color: '#2D3436',
//       lineHeight: '1.3'
//     },
//     serviceDescription: {
//       color: 'rgba(45, 52, 54, 0.7)',
//       marginBottom: '1.5rem',
//       lineHeight: '1.5',
//       flex: '1',
//       fontSize: '0.95rem'
//     },
//     featureList: {
//       listStyle: 'none',
//       padding: 0,
//       margin: 0,
//       minHeight: '120px',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'flex-start'
//     },
//     featureItem: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.6rem',
//       marginBottom: '0.6rem',
//       color: 'rgba(45, 52, 54, 0.8)',
//       fontWeight: '500',
//       fontSize: '0.9rem'
//     },
//     featureIcon: {
//       width: '18px',
//       height: '18px',
//       background: 'linear-gradient(135deg, #FF6B35, #FD79A8)',
//       color: 'white',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '0.7rem',
//       fontWeight: 'bold',
//       flexShrink: 0
//     },
//     whySection: {
//       marginTop: '1rem',
//       paddingTop: '1rem',
//       borderTop: '1px solid rgba(108, 92, 231, 0.1)'
//     },
//     whyTitle: {
//       fontSize: '1rem',
//       fontWeight: '600',
//       color: '#6C5CE7',
//       marginBottom: '0.75rem'
//     },
//     whyList: {
//       listStyle: 'none',
//       padding: 0,
//       margin: 0
//     },
//     whyItem: {
//       display: 'flex',
//       alignItems: 'flex-start',
//       gap: '0.5rem',
//       marginBottom: '0.5rem',
//       color: 'rgba(45, 52, 54, 0.7)',
//       fontWeight: '400',
//       fontSize: '0.85rem',
//       lineHeight: '1.4'
//     },
//     whyIcon: {
//       width: '16px',
//       height: '16px',
//       background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
//       color: 'white',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '0.6rem',
//       fontWeight: 'bold',
//       flexShrink: 0,
//       marginTop: '0.1rem'
//     },
//     ctaSection: {
//       textAlign: 'center',
//       marginTop: '4rem'
//     },
//     ctaCard: {
//       background: 'white',
//       padding: '3rem',
//       borderRadius: '25px',
//       boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
//       border: '1px solid rgba(108, 92, 231, 0.1)'
//     },
//     ctaTitle: {
//       fontSize: '2.5rem',
//       fontWeight: '700',
//       marginBottom: '1rem',
//       color: '#2D3436'
//     },
//     ctaDescription: {
//       fontSize: '1.2rem',
//       color: 'rgba(45, 52, 54, 0.7)',
//       marginBottom: '2rem',
//       maxWidth: '600px',
//       marginLeft: 'auto',
//       marginRight: 'auto'
//     },
//     ctaButton: {
//       background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
//       color: 'white',
//       padding: '1.2rem 3rem',
//       border: 'none',
//       borderRadius: '30px',
//       fontSize: '1.1rem',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease'
//     }
//   };

//   // Add animations when component mounts and scroll detection
//   useEffect(() => {
//     // Add CSS animations
//     if (!document.querySelector('#service-animations')) {
//       const style = document.createElement('style');
//       style.id = 'service-animations';
//       style.textContent = `
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-60px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(60px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//       `;
//       document.head.appendChild(style);
//     }

//     // Intersection Observer for scroll detection
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       {
//         threshold: 0.2, // Trigger when 20% of the section is visible
//         rootMargin: '-50px 0px -50px 0px'
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   return (
//     <section ref={sectionRef} style={servicesStyles.services} id="services">
//       <div style={servicesStyles.topBorder}></div>
      
//       <div style={servicesStyles.container}>
//         <div style={servicesStyles.sectionHeader}>
//           <span style={servicesStyles.badge}>Our Services</span>
//           <h2 style={servicesStyles.title}>
//             Comprehensive Quality
//             <span style={servicesStyles.highlight}> Inspection Services</span>
//           </h2>
         
//         </div>

//         {/* Featured Services Section - Sourcing and Destination Inspection */}
//         <div style={servicesStyles.featuredGrid}>
//           {featuredServices.map((service, index) => (
//             <div 
//               key={`featured-${index}`} 
//               className={`service-card featured-service-card-${index}`}
//               style={{
//                 ...servicesStyles.serviceCard,
//                 opacity: isVisible ? 1 : 0,
//                 transform: isVisible 
//                   ? 'translateX(0)' 
//                   : index === 0 
//                     ? 'translateX(-60px)' 
//                     : 'translateX(60px)',
//                 transition: `all 0.8s ease-out ${index * 0.2}s`
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = `${isVisible ? 'translateX(0) ' : ''}translateY(-8px)`;
//                 e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
//                 const icon = e.currentTarget.querySelector('.service-icon');
//                 if (icon) icon.style.transform = 'scale(1.1)';
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = isVisible ? 'translateX(0) translateY(0)' : 'translateX(0)';
//                 e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
//                 const icon = e.currentTarget.querySelector('.service-icon');
//                 if (icon) icon.style.transform = 'scale(1)';
//               }}
//             >
//               <div style={servicesStyles.cardTopBorder}></div>
              
//               <div className="service-icon" style={servicesStyles.serviceIcon}>
//                 {React.cloneElement(service.icon, { size: 28 })}
//               </div>
              
//               <h3 style={servicesStyles.serviceTitle}>{service.title}</h3>
//               <p style={servicesStyles.serviceDescription}>{service.description}</p>
              
//               <ul style={servicesStyles.featureList}>
//                 {service.features.map((feature, idx) => (
//                   <li key={idx} style={servicesStyles.featureItem}>
//                     <div style={servicesStyles.featureIcon}>✓</div>
//                     <span>{feature}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div style={servicesStyles.whySection}>
//                 <h4 style={servicesStyles.whyTitle}>Why Choose This Service?</h4>
//                 <ul style={servicesStyles.whyList}>
//                   {service.whyFeatures.map((whyFeature, idx) => (
//                     <li key={idx} style={servicesStyles.whyItem}>
//                       <div style={servicesStyles.whyIcon}>!</div>
//                       <span>{whyFeature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>


//            <p style={servicesStyles.description}>
//             We offer a complete suite of quality inspection services designed to ensure your cargo meets the highest standards 
//             and regulatory requirements across global markets.
//           </p>
          
//         <div style={servicesStyles.servicesGrid}>
//           {services.map((service, index) => {
//             // Determine animation direction based on position
//             const isUpperRow = index < 4;
//             const animationDelay = (index % 4) * 0.15; // Stagger animation within each row
            
//             return (
//               <div 
//                 key={index} 
//                 className={`service-card service-card-${index}`}
//                 style={{
//                   ...servicesStyles.serviceCard,
//                   opacity: isVisible ? 1 : 0,
//                   transform: isVisible 
//                     ? 'translateX(0)' 
//                     : isUpperRow 
//                       ? 'translateX(-60px)' 
//                       : 'translateX(60px)',
//                   transition: `all 0.8s ease-out ${animationDelay}s`
//                 }}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.transform = `${isVisible ? 'translateX(0) ' : ''}translateY(-8px)`;
//                   e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
//                   const icon = e.currentTarget.querySelector('.service-icon');
//                   if (icon) icon.style.transform = 'scale(1.1)';
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.transform = isVisible ? 'translateX(0) translateY(0)' : 'translateX(0)';
//                   e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
//                   const icon = e.currentTarget.querySelector('.service-icon');
//                   if (icon) icon.style.transform = 'scale(1)';
//                 }}
//               >
//                 <div style={servicesStyles.cardTopBorder}></div>
                
//                 <div className="service-icon" style={servicesStyles.serviceIcon}>
//                   {typeof service.icon === 'string' ? (
//                     <span style={{ fontSize: '1.5rem' }}>{service.icon}</span>
//                   ) : (
//                     React.cloneElement(service.icon, { size: 28 })
//                   )}
//                 </div>
                
//                 <h3 style={servicesStyles.serviceTitle}>{service.title}</h3>
//                 <p style={servicesStyles.serviceDescription}>{service.description}</p>
                
//                 <ul style={servicesStyles.featureList}>
//                   {service.features.map((feature, idx) => (
//                     <li key={idx} style={servicesStyles.featureItem}>
//                       <div style={servicesStyles.featureIcon}>✓</div>
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 {/* Add "Why" section for the first two services */}
//                 {service.whyFeatures && (
//                   <div style={servicesStyles.whySection}>
//                     <h4 style={servicesStyles.whyTitle}>Why Choose This Service?</h4>
//                     <ul style={servicesStyles.whyList}>
//                       {service.whyFeatures.map((whyFeature, idx) => (
//                         <li key={idx} style={servicesStyles.whyItem}>
//                           <div style={servicesStyles.whyIcon}>!</div>
//                           <span>{whyFeature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         <div style={servicesStyles.ctaSection}>
//           <div style={servicesStyles.ctaCard}>
//             <h3 style={servicesStyles.ctaTitle}>Ready to Get Started?</h3>
//             <p style={servicesStyles.ctaDescription}>
//               Raise your inspection query with a budget and get multiple quotes from verified global inspectors. 
//               Choose the best for your cargo inspection needs.
//             </p>
//             <button 
//               style={servicesStyles.ctaButton}
//               onMouseOver={(e) => {
//                 e.target.style.transform = 'translateY(-2px)';
//                 e.target.style.boxShadow = '0 10px 25px rgba(108, 92, 231, 0.3)';
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.transform = 'translateY(0)';
//                 e.target.style.boxShadow = 'none';
//               }}
//             >
//               Request Inspection Quote
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;


// import React, { useEffect, useRef, useState } from 'react';
// import { Leaf, BarChart3, Shield, Zap, Package, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

// const Services = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [showAllServices, setShowAllServices] = useState(false);
//   const sectionRef = useRef(null);
  
//   const featuredServices = [
//     {
//       icon: <Package size={40} />,
//       title: "Sourcing Inspection",
//       description: "Get your cargo inspected at time of loading or production with comprehensive quality checks and documentation.",
//       features: [
//         "Commodity quality inspection", 
//         "Loading/stuffing inspections", 
//         "Packaging, fumigation & more", 
//         "Physical & chemical testing"
//       ],
//       whyFeatures: [
//         "Maintaining quality at time of production",
//         "Ensuring proper packaging and documentation", 
//         "Better control of your cargo from production stage",
//         "Ensure transparency & traceability for your cargo",
//         "Competitive pricing"
//       ]
//     },
//     {
//       icon: <MapPin size={40} />,
//       title: "Destination Inspection", 
//       description: "Your cargo & commodity quality details at destination locations with comprehensive quality validation.",
//       features: [
//         "Unloading inspections",
//         "Physical & chemical testing", 
//         "Quality validation at destination",
//         "Documentation & reporting"
//       ],
//       whyFeatures: [
//         "Ensure commodity quality after reaching destinations",
//         "A validation & proof of your cargo quality before any clause or discounts",
//         "Better transparency and visibility", 
//         "Add value to your cargo with quality proofs",
//         "Ensure quality for better negotiations",
//         "Competitive pricing"
//       ]
//     }
//   ];

//   const services = [
//     {
//       icon: <Leaf size={40} />,
//       title: "Pre-Production Inspection (PPI)",
//       description: "Quality checks before production begins to ensure compliance with specifications and regulatory standards.",
//       features: ["Material verification", "Specification review", "Production planning", "Quality standards setup"],
//     },
//     {
//       icon: <BarChart3 size={40} />,
//       title: "During Production Inspection (DUPRO)",
//       description: "In-process quality monitoring to catch issues early and maintain consistent quality throughout production.",
//       features: ["Real-time monitoring", "Process verification", "Quality control checks", "Progress reporting"],
//     },
//     {
//       icon: <Shield size={40} />,
//       title: "Pre-Shipment Inspection (PSI)",
//       description: "Final quality verification before goods are shipped to ensure they meet all requirements and standards.",
//       features: ["Final quality checks", "Packaging inspection", "Quantity verification", "Compliance certification"],
//     },
//     {
//       icon: <Zap size={40} />,
//       title: "Container Loading Inspection (CLI)",
//       description: "Supervision of container loading process to prevent damage and ensure proper handling of goods.",
//       features: ["Loading supervision", "Container condition check", "Proper stowage verification", "Damage prevention"],
//     },
//     {
//       icon: "🧪",
//       title: "On-Site Laboratory Testing / Sampling",
//       description: "Collects and tests samples to verify specifications, especially for agri-commodities, food, chemicals, and pharmaceuticals.",
//       features: ["Moisture content analysis", "Purity verification", "Pesticide residue testing", "Technical parameter checks"],
//     },
//     {
//       icon: "🛃",
//       title: "Customs Inspection",
//       description: "Government-mandated checks for compliance with legal and safety regulations at ports of export or import.",
//       features: ["Legal compliance verification", "Safety regulation checks", "Prohibited substance detection", "Duty & tax assessment"],
//     },
//     {
//       icon: "📦",
//       title: "Post-Shipment Inspection",
//       description: "Confirms that products match shipping documents and assess condition after arrival at destination.",
//       features: ["Document verification", "Damage assessment", "Supplier performance evaluation", "Claims documentation"],
//     },
//     {
//       icon: "✅",
//       title: "Third-Party Inspection",
//       description: "Independent inspection agencies provide objective evaluation of product quality, compliance, and documentation.",
//       features: ["Neutral evaluation", "International buyer requirements", "Government compliance", "Objective quality assessment"],
//     }
//   ];

//   // Split services into initial and additional
//   const initialServices = services.slice(0, 4);
//   const additionalServices = services.slice(4);

//   const servicesStyles = {
//     services: {
//       padding: '6rem 2rem',
//       background: 'black',
//       position: 'relative'
//     },
//     topBorder: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       height: '1px',
//       // background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)'
//     },
//     container: {
//       maxWidth: '1400px',
//       margin: '0 auto'
//     },
//     sectionHeader: {
//       textAlign: 'center',
//       marginBottom: '4rem'
//     },
//     badge: {
//       display: 'inline-block',
//       background: 'white',
//       color: 'black',
//       padding: '0.5rem 1.5rem',
//       borderRadius: '25px',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       marginBottom: '2rem',
//       border: '1px solid rgba(108, 92, 231, 0.2)'
//     },
//     title: {
//       fontSize: '3.5rem',
//       fontWeight: '900',
//       lineHeight: '1.2',
//       marginBottom: '2rem',
//       color: 'white'
//     },
//     highlight: {
//       background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text'
//     },
//     description: {
//       fontSize: '1.2rem',
//       color: 'white',
//       maxWidth: '800px',
//       margin: '0 auto',
//       lineHeight: '1.6'
//     },
//     featuredGrid: {
//       display: 'grid',
//       gridTemplateColumns: '1fr',
//       gap: '2rem',
//       marginBottom: '5rem',
//       maxWidth: '1200px',
//       margin: '0 auto 5rem auto'
//     },
//     servicesGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//       gap: '2rem',
//       marginTop: '4rem'
//     },
//     additionalServicesGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//       gap: '2rem',
//       marginTop: '2rem',
//       opacity: showAllServices ? 1 : 0,
//       maxHeight: showAllServices ? '2000px' : '0',
//       overflow: 'hidden',
//       transition: 'all 0.6s ease-in-out'
//     },
//     viewAllButton: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '0.5rem',
//       background: 'black',
//       color: 'white',
//       padding: '1rem 2.5rem',
//       border: 'none',
//       borderRadius: '25px',
//       fontSize: '1rem',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       margin: '3rem auto',
//       boxShadow: '0 8px 25px rgba(108, 92, 231, 0.25)',
//       minWidth: '180px'
//     },
//     serviceCard: {
//       background: 'white',
//       padding: '2rem 1.5rem',
//       borderRadius: '20px',
//       boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
//       transition: 'all 0.3s ease',
//       position: 'relative',
//       overflow: 'hidden',
//       cursor: 'pointer',
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100%',
//       maxWidth: '320px',
//       margin: '0 auto'
//     },
//     featuredServiceCard: {
//       background: 'linear-gradient(135deg, #2D3436, #636E72)',
//       color: 'white',
//       padding: '2rem',
//       borderRadius: '25px',
//       boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
//       transition: 'all 0.3s ease',
//       position: 'relative',
//       overflow: 'hidden',
//       cursor: 'pointer',
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '3rem',
//       alignItems: 'center',
//       minHeight: '280px',
//       maxWidth: '100%',
//       margin: '0 auto 1.5rem auto'
//     },
//     cardTopBorder: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       height: '4px',
//       background: 'gray'
//     },
//     featuredCardTopBorder: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       height: '4px',
//       background: 'black'
//     },
//     serviceIcon: {
//       width: '55px',
//       height: '55px',
//       background: 'black',
//       borderRadius: '15px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginBottom: '1.5rem',
//       color: 'white',
//       transition: 'transform 0.3s ease'
//     },
//     featuredServiceIcon: {
//       width: '65px',
//       height: '65px',
//       background: 'black',
//       borderRadius: '20px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginBottom: '1.5rem',
//       color: 'white',
//       transition: 'transform 0.3s ease',
//       // boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)'
//     },
//     serviceTitle: {
//       fontSize: '1.25rem',
//       fontWeight: '700',
//       marginBottom: '0.75rem',
//       color: 'white',
//       lineHeight: '1.3'
//     },
//     featuredServiceTitle: {
//       fontSize: '1.5rem',
//       fontWeight: '700',
//       marginBottom: '1rem',
//       color: 'white',
//       lineHeight: '1.3'
//     },
//     serviceDescription: {
//       color: 'rgba(45, 52, 54, 0.7)',
//       marginBottom: '1.5rem',
//       lineHeight: '1.5',
//       flex: '1',
//       fontSize: '0.95rem'
//     },
//     featuredServiceDescription: {
//       color: 'rgba(255, 255, 255, 0.8)',
//       marginBottom: '1.5rem',
//       lineHeight: '1.6',
//       fontSize: '1rem'
//     },
//     featureList: {
//       listStyle: 'none',
//       padding: 0,
//       margin: 0,
//       minHeight: '120px',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'flex-start'
//     },
//     featuredFeatureList: {
//       listStyle: 'none',
//       padding: 0,
//       margin: 0,
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'flex-start'
//     },
//     featureItem: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.6rem',
//       marginBottom: '0.6rem',
//       color: 'rgba(45, 52, 54, 0.8)',
//       fontWeight: '500',
//       fontSize: '0.9rem'
//     },
//     featuredFeatureItem: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.6rem',
//       marginBottom: '0.7rem',
//       color: 'rgba(255, 255, 255, 0.9)',
//       fontWeight: '500',
//       fontSize: '0.9rem'
//     },
//     featureIcon: {
//       width: '18px',
//       height: '18px',
//       background: 'black',
//       color: 'white',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '0.7rem',
//       fontWeight: 'bold',
//       flexShrink: 0
//     },
//     featuredFeatureIcon: {
//       width: '20px',
//       height: '20px',
//       background: 'black',
//       color: 'white',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '0.7rem',
//       fontWeight: 'bold',
//       flexShrink: 0
//     },
//     whySection: {
//       marginTop: '1rem',
//       paddingTop: '1rem',
//       borderTop: '1px solid rgba(108, 92, 231, 0.1)'
//     },
//     featuredWhySection: {
//       marginTop: '1rem',
//       paddingTop: '1rem',
//       borderTop: '1px solid rgba(255, 255, 255, 0.2)'
//     },
//     whyTitle: {
//       fontSize: '1rem',
//       fontWeight: '600',
//       color: '#6C5CE7',
//       marginBottom: '0.75rem'
//     },
//     featuredWhyTitle: {
//       fontSize: '1.1rem',
//       fontWeight: '600',
//       color: 'black',
//       marginBottom: '0.75rem'
//     },
//     whyList: {
//       listStyle: 'none',
//       padding: 0,
//       margin: 0
//     },
//     whyItem: {
//       display: 'flex',
//       alignItems: 'flex-start',
//       gap: '0.5rem',
//       marginBottom: '0.5rem',
//       color: 'rgba(45, 52, 54, 0.7)',
//       fontWeight: '400',
//       fontSize: '0.85rem',
//       lineHeight: '1.4'
//     },
//     featuredWhyItem: {
//       display: 'flex',
//       alignItems: 'flex-start',
//       gap: '0.5rem',
//       marginBottom: '0.6rem',
//       color: 'rgba(255, 255, 255, 0.8)',
//       fontWeight: '400',
//       fontSize: '0.85rem',
//       lineHeight: '1.4'
//     },
//     whyIcon: {
//       width: '16px',
//       height: '16px',
//       background: 'black',
//       color: 'white',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '0.6rem',
//       fontWeight: 'bold',
//       flexShrink: 0,
//       marginTop: '0.1rem'
//     },
//     featuredWhyIcon: {
//       width: '16px',
//       height: '16px',
//       background: 'black',
//       color: 'white',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '0.6rem',
//       fontWeight: 'bold',
//       flexShrink: 0,
//       marginTop: '0.1rem'
//     },
//     featuredLeftColumn: {
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     featuredRightColumn: {
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     ctaSection: {
//       textAlign: 'center',
//       marginTop: '4rem'
//     },
//     ctaCard: {
//       background: 'white',
//       padding: '3rem',
//       borderRadius: '25px',
//       boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
//       border: '1px solid rgba(108, 92, 231, 0.1)'
//     },
//     ctaTitle: {
//       fontSize: '2.5rem',
//       fontWeight: '700',
//       marginBottom: '1rem',
//       color: '#2D3436'
//     },
//     ctaDescription: {
//       fontSize: '1.2rem',
//       color: 'rgba(45, 52, 54, 0.7)',
//       marginBottom: '2rem',
//       maxWidth: '600px',
//       marginLeft: 'auto',
//       marginRight: 'auto'
//     },
//     ctaButton: {
//       background: 'black',
//       color: 'white',
//       padding: '1.2rem 3rem',
//       border: 'none',
//       borderRadius: '30px',
//       fontSize: '1.1rem',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease'
//     }
//   };

//   // Add animations when component mounts and scroll detection
//   useEffect(() => {
//     // Add CSS animations
//     if (!document.querySelector('#service-animations')) {
//       const style = document.createElement('style');
//       style.id = 'service-animations';
//       style.textContent = `
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-60px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(60px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @media (max-width: 768px) {
//           .featured-service-card {
//             grid-template-columns: 1fr !important;
//             gap: 1.5rem !important;
//             min-height: auto !important;
//           }
//         }
//       `;
//       document.head.appendChild(style);
//     }

//     // Intersection Observer for scroll detection
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       {
//         threshold: 0.2, // Trigger when 20% of the section is visible
//         rootMargin: '-50px 0px -50px 0px'
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   const renderServiceCard = (service, index, isAdditional = false) => {
//     const animationDelay = isAdditional ? (index * 0.15) : ((index % 4) * 0.15);
    
//     return (
//       <div 
//         key={isAdditional ? `additional-${index}` : index} 
//         className={`service-card service-card-${index}`}
//         style={{
//           ...servicesStyles.serviceCard,
//           opacity: (isAdditional && showAllServices) || (!isAdditional && isVisible) ? 1 : 0,
//           transform: (isAdditional && showAllServices) || (!isAdditional && isVisible)
//             ? 'translateX(0)' 
//             : 'translateX(-60px)',
//           transition: `all 0.8s ease-out ${animationDelay}s`
//         }}
//         onMouseOver={(e) => {
//           e.currentTarget.style.transform = `translateX(0) translateY(-8px)`;
//           e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
//           const icon = e.currentTarget.querySelector('.service-icon');
//           if (icon) icon.style.transform = 'scale(1.1)';
//         }}
//         onMouseOut={(e) => {
//           e.currentTarget.style.transform = 'translateX(0) translateY(0)';
//           e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
//           const icon = e.currentTarget.querySelector('.service-icon');
//           if (icon) icon.style.transform = 'scale(1)';
//         }}
//       >
//         <div style={servicesStyles.cardTopBorder}></div>
        
//         <div className="service-icon" style={servicesStyles.serviceIcon}>
//           {typeof service.icon === 'string' ? (
//             <span style={{ fontSize: '1.5rem' }}>{service.icon}</span>
//           ) : (
//             React.cloneElement(service.icon, { size: 28 })
//           )}
//         </div>
        
//         <h3 style={servicesStyles.serviceTitle}>{service.title}</h3>
//         <p style={servicesStyles.serviceDescription}>{service.description}</p>
        
//         <ul style={servicesStyles.featureList}>
//           {service.features.map((feature, idx) => (
//             <li key={idx} style={servicesStyles.featureItem}>
//               <div style={servicesStyles.featureIcon}>✓</div>
//               <span>{feature}</span>
//             </li>
//           ))}
//         </ul>

//         {service.whyFeatures && (
//           <div style={servicesStyles.whySection}>
//             <h4 style={servicesStyles.whyTitle}>Why Choose This Service?</h4>
//             <ul style={servicesStyles.whyList}>
//               {service.whyFeatures.map((whyFeature, idx) => (
//                 <li key={idx} style={servicesStyles.whyItem}>
//                   <div style={servicesStyles.whyIcon}>!</div>
//                   <span>{whyFeature}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <section ref={sectionRef} style={servicesStyles.services} id="services">
//       <div style={servicesStyles.topBorder}></div>
      
//       <div style={servicesStyles.container}>
//         <div style={servicesStyles.sectionHeader}>
//           <span style={servicesStyles.badge}>Our Services</span>
//           <h2 style={servicesStyles.title}>
//             Comprehensive Quality
//             <span> Inspection Services</span>
//           </h2>
         
//         </div>

//         {/* Featured Services Section - Sourcing and Destination Inspection */}
//         <div style={servicesStyles.featuredGrid}>
//           {featuredServices.map((service, index) => (
//             <div 
//               key={`featured-${index}`} 
//               className={`service-card featured-service-card featured-service-card-${index}`}
//               style={{
//                 ...servicesStyles.featuredServiceCard,
//                 opacity: isVisible ? 1 : 0,
//                 transform: isVisible 
//                   ? 'translateX(0)' 
//                   : index === 0 
//                     ? 'translateX(-60px)' 
//                     : 'translateX(60px)',
//                 transition: `all 0.8s ease-out ${index * 0.2}s`
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = `${isVisible ? 'translateX(0) ' : ''}translateY(-8px)`;
//                 e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
//                 const icon = e.currentTarget.querySelector('.service-icon');
//                 if (icon) icon.style.transform = 'scale(1.1)';
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = isVisible ? 'translateX(0) translateY(0)' : 'translateX(0)';
//                 e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
//                 const icon = e.currentTarget.querySelector('.service-icon');
//                 if (icon) icon.style.transform = 'scale(1)';
//               }}
//             >
//               <div style={servicesStyles.featuredCardTopBorder}></div>
              
//               <div style={servicesStyles.featuredLeftColumn}>
//                 <div className="service-icon" style={servicesStyles.featuredServiceIcon}>
//                   {React.cloneElement(service.icon, { size: 32 })}
//                 </div>
                
//                 <h3 style={servicesStyles.featuredServiceTitle}>{service.title}</h3>
//                 <p style={servicesStyles.featuredServiceDescription}>{service.description}</p>
                
//                 <ul style={servicesStyles.featuredFeatureList}>
//                   {service.features.map((feature, idx) => (
//                     <li key={idx} style={servicesStyles.featuredFeatureItem}>
//                       <div style={servicesStyles.featuredFeatureIcon}>✓</div>
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div style={servicesStyles.featuredRightColumn}>
//                 <div style={servicesStyles.featuredWhySection}>
//                   <h4 style={servicesStyles.featuredWhyTitle}>Why Choose This Service?</h4>
//                   <ul style={servicesStyles.whyList}>
//                     {service.whyFeatures.map((whyFeature, idx) => (
//                       <li key={idx} style={servicesStyles.featuredWhyItem}>
//                         <div style={servicesStyles.featuredWhyIcon}>!</div>
//                         <span>{whyFeature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <p style={servicesStyles.description}>
//           We offer a complete suite of quality inspection services designed to ensure your cargo meets the highest standards 
//           and regulatory requirements across global markets.
//         </p>
          
//         {/* Initial 4 Services Grid */}
//         <div style={servicesStyles.servicesGrid}>
//           {initialServices.map((service, index) => renderServiceCard(service, index, false))}
//         </div>

//         {/* View All Button - Only show when services are hidden */}
//         {!showAllServices && (
//           <button
//             style={{
//               ...servicesStyles.viewAllButton,
//               transform: 'translateY(0)',
//               boxShadow: '0 8px 25px rgba(108, 92, 231, 0.25)'
//             }}
//             onClick={() => setShowAllServices(true)}
//             onMouseOver={(e) => {
//               e.target.style.transform = 'translateY(-2px)';
//               e.target.style.boxShadow = '0 12px 30px rgba(108, 92, 231, 0.35)';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = '0 8px 25px rgba(108, 92, 231, 0.25)';
//             }}
//           >
//             <span>View All Services</span>
//             <ChevronDown size={20} />
//           </button>
//         )}

//         {/* Additional Services Grid - Initially Hidden */}
//         <div style={servicesStyles.additionalServicesGrid}>
//           {additionalServices.map((service, index) => renderServiceCard(service, index, true))}
//         </div>

//         {/* Show Less Button - Only show when additional services are visible */}
//         {showAllServices && (
//           <button
//             style={{
//               ...servicesStyles.viewAllButton,
//               transform: 'translateY(-2px)',
//               boxShadow: '0 12px 30px rgba(108, 92, 231, 0.35)',
//               marginTop: '3rem'
//             }}
//             onClick={() => setShowAllServices(false)}
//             onMouseOver={(e) => {
//               e.target.style.transform = 'translateY(-2px)';
//               e.target.style.boxShadow = '0 12px 30px rgba(108, 92, 231, 0.35)';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.transform = 'translateY(-2px)';
//               e.target.style.boxShadow = '0 12px 30px rgba(108, 92, 231, 0.35)';
//             }}
//           >
//             <span>Show Less</span>
//             <ChevronUp size={20} />
//           </button>
//         )}

//         <div style={servicesStyles.ctaSection}>
//           <div style={servicesStyles.ctaCard}>
//             <h3 style={servicesStyles.ctaTitle}>Ready to Get Started?</h3>
//             <p style={servicesStyles.ctaDescription}>
//               Raise your inspection query with a budget and get multiple quotes from verified global inspectors. 
//               Choose the best for your cargo inspection needs.
//             </p>
//             <button 
//               style={servicesStyles.ctaButton}
//               onMouseOver={(e) => {
//                 e.target.style.transform = 'translateY(-2px)';
//                 e.target.style.boxShadow = '0 10px 25px rgba(108, 92, 231, 0.3)';
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.transform = 'translateY(0)';
//                 e.target.style.boxShadow = 'none';
//               }}
//             >
//               Request Inspection Quote
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;


import React, { useEffect, useRef, useState } from 'react';
import { Leaf, BarChart3, Shield, Zap, Package, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  
  const featuredServices = [
    {
      icon: <Package size={40} />,
      title: "Sourcing Inspection",
      description: "Get your cargo inspected at time of loading or production with comprehensive quality checks and documentation.",
      features: [
        "Commodity quality inspection", 
        "Loading/stuffing inspections", 
        "Packaging, fumigation & more", 
        "Physical & chemical testing"
      ],
      whyFeatures: [
        "Maintaining quality at time of production",
        "Ensuring proper packaging and documentation", 
        "Better control of your cargo from production stage",
        "Ensure transparency & traceability for your cargo",
        "Competitive pricing"
      ]
    },
    {
      icon: <MapPin size={40} />,
      title: "Destination Inspection", 
      description: "Your cargo & commodity quality details at destination locations with comprehensive quality validation.",
      features: [
        "Unloading inspections",
        "Physical & chemical testing", 
        "Quality validation at destination",
        "Documentation & reporting"
      ],
      whyFeatures: [
        "Ensure commodity quality after reaching destinations",
        "A validation & proof of your cargo quality before any clause or discounts",
        "Better transparency and visibility", 
        "Add value to your cargo with quality proofs",
        "Ensure quality for better negotiations",
        "Competitive pricing"
      ]
    }
  ];

  const services = [
    {
      icon: <Shield size={40} />,
      title: "Pre-Shipment Inspection (PSI)",
      description: "Final quality verification before goods are shipped to ensure they meet all requirements and standards.",
      features: ["Final quality checks", "Packaging inspection", "Quantity verification", "Compliance certification"],
    },
    {
      icon: <BarChart3 size={40} />,
      title: "During Production Inspection (DUPRO)",
      description: "In-process quality monitoring to catch issues early and maintain consistent quality throughout production.",
      features: ["Real-time monitoring", "Process verification", "Quality control checks", "Progress reporting"],
    },
    {
      icon: <Zap size={40} />,
      title: "Container Loading Inspection (CLI)",
      description: "Supervision of container loading process to prevent damage and ensure proper handling of goods.",
      features: ["Loading supervision", "Container condition check", "Proper stowage verification", "Damage prevention"],
    },
    {
      icon: "🧪",
      title: "On-Site Laboratory Testing / Sampling",
      description: "Collects and tests samples to verify specifications, especially for agri-commodities, food, chemicals, and pharmaceuticals.",
      features: ["Moisture content analysis", "Purity verification", "Pesticide residue testing", "Technical parameter checks"],
    },
    {
      icon: "📦",
      title: "Post-Shipment Inspection",
      description: "Confirms that products match shipping documents and assess condition after arrival at destination.",
      features: ["Document verification", "Damage assessment", "Supplier performance evaluation", "Claims documentation"],
    },
    {
      icon: "✅",
      title: "Third-Party Inspection",
      description: "Independent inspection agencies provide objective evaluation of product quality, compliance, and documentation.",
      features: ["Neutral evaluation", "International buyer requirements", "Government compliance", "Objective quality assessment"],
    }
  ];

  // Split services: show 3 initially (1 row × 3 boxes), then show all 6 (2 rows × 3 boxes each)
  const initialServices = services.slice(0, 3);
  const additionalServices = services.slice(3);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const servicesStyles = {
    services: {
      padding: '6rem 2rem',
      background: '#000000',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    backgroundEffect: {
      position: 'absolute',
      top: '20%',
      right: '-20%',
      width: '40%',
      height: '60%',
      background: 'radial-gradient(circle, rgba(162, 155, 254, 0.1) 0%, transparent 70%)',
      animation: 'pulse 15s ease-in-out infinite'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10,
      padding: isMobile ? '0 1rem' : '0'
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#FFFFFF',
      padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
      borderRadius: '25px',
      fontWeight: '700',
      fontSize: isMobile ? '1rem' : '1.2rem',
      marginBottom: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    title: {
      fontSize: isMobile ? '2.2rem' : '5rem',
      fontWeight: '900',
      lineHeight: '1.1',
      marginBottom: '2rem',
      color: '#FFFFFF',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
      letterSpacing: '-0.03em',
      textAlign: isMobile ? 'center' : 'center'
    },
    highlight: {
      background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    description: {
      fontSize: isMobile ? '1.1rem' : '1.4rem',
      color: 'rgba(255, 255, 255, 0.8)',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6',
      fontWeight: '500',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    featuredGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: isMobile ? '1.5rem' : '2rem',
      marginBottom: '5rem',
      maxWidth: isMobile ? '350px' : '1200px',
      margin: isMobile ? '0 auto 3rem auto' : '0 auto 5rem auto'
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1rem' : '2rem',
      marginTop: '4rem',
      maxWidth: isMobile ? '350px' : 'none',
      margin: isMobile ? '4rem auto 0 auto' : '4rem 0 0 0'
    },
    additionalServicesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1rem' : '2rem',
      marginTop: '2rem',
      opacity: showAllServices ? 1 : 0,
      maxHeight: showAllServices ? '2000px' : '0',
      overflow: 'hidden',
      transition: 'all 0.6s ease-in-out',
      maxWidth: isMobile ? '350px' : 'none',
      margin: isMobile 
        ? showAllServices 
          ? '2rem auto 0 auto' 
          : '2rem auto 0 auto'
        : '2rem 0 0 0'
    },
    viewAllButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#FFFFFF',
      padding: '1.3rem 2.8rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '25px',
      fontSize: '1.2rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      margin: '3rem auto',
      backdropFilter: 'blur(10px)',
      minWidth: '180px',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      outline: 'none'
    },
    serviceCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: isMobile ? '1.2rem 1rem' : '2rem 1.5rem',
      borderRadius: isMobile ? '15px' : '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      height: isMobile ? 'auto' : '100%',
      maxWidth: isMobile ? '320px' : '100%',
      margin: isMobile ? '0 auto' : '0 auto',
      minHeight: isMobile ? 'auto' : 'auto'
    },
    featuredServiceCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      color: '#FFFFFF',
      padding: isMobile ? '1.2rem' : '2rem',
      borderRadius: isMobile ? '15px' : '25px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '1rem' : '3rem',
      alignItems: 'center',
      minHeight: isMobile ? 'auto' : '280px',
      maxWidth: isMobile ? '320px' : '100%',
      margin: isMobile ? '0 auto 1rem auto' : '0 auto 1.5rem auto'
    },
    serviceIcon: {
      width: isMobile ? '45px' : '55px',
      height: isMobile ? '45px' : '55px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: isMobile ? '12px' : '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      color: '#FFFFFF',
      transition: 'transform 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    featuredServiceIcon: {
      width: isMobile ? '50px' : '65px',
      height: isMobile ? '50px' : '65px',
      background: 'rgba(255, 255, 255, 0.15)',
      borderRadius: isMobile ? '15px' : '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      color: '#FFFFFF',
      transition: 'transform 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    serviceTitle: {
      fontSize: isMobile ? '1.1rem' : '1.5rem',
      fontWeight: '700',
      marginBottom: isMobile ? '0.5rem' : '0.75rem',
      color: '#FFFFFF',
      lineHeight: '1.3',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif'
    },
    featuredServiceTitle: {
      fontSize: isMobile ? '1.3rem' : '1.8rem',
      fontWeight: '800',
      marginBottom: isMobile ? '0.8rem' : '1rem',
      color: '#FFFFFF',
      lineHeight: '1.3',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif'
    },
    serviceDescription: {
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      lineHeight: '1.5',
      flex: '1',
      fontSize: isMobile ? '0.9rem' : '1.1rem',
      fontWeight: '500',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    featuredServiceDescription: {
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      lineHeight: '1.6',
      fontSize: isMobile ? '0.9rem' : '1.2rem',
      fontWeight: '500',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      minHeight: isMobile ? 'auto' : '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    featuredFeatureList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      marginBottom: isMobile ? '0.4rem' : '0.6rem',
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: '600',
      fontSize: isMobile ? '0.8rem' : '1rem',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    featuredFeatureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      marginBottom: isMobile ? '0.5rem' : '0.7rem',
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '600',
      fontSize: isMobile ? '0.8rem' : '1.1rem',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    featureIcon: {
      width: isMobile ? '16px' : '18px',
      height: isMobile ? '16px' : '18px',
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#FFFFFF',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      flexShrink: 0
    },
    featuredFeatureIcon: {
      width: isMobile ? '16px' : '20px',
      height: isMobile ? '16px' : '20px',
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#FFFFFF',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      flexShrink: 0
    },
    whySection: {
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    },
    featuredWhySection: {
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)'
    },
    whyTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: '0.75rem',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif'
    },
    featuredWhyTitle: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: '0.75rem',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif'
    },
    whyList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    whyItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.5rem',
      marginBottom: '0.5rem',
      color: 'rgba(255, 255, 255, 0.7)',
      fontWeight: '500',
      fontSize: '1rem',
      lineHeight: '1.4',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    featuredWhyItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.5rem',
      marginBottom: isMobile ? '0.4rem' : '0.6rem',
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: '500',
      fontSize: isMobile ? '0.8rem' : '1rem',
      lineHeight: '1.4',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    whyIcon: {
      width: '16px',
      height: '16px',
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#FFFFFF',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.6rem',
      fontWeight: 'bold',
      flexShrink: 0,
      marginTop: '0.1rem'
    },
    featuredWhyIcon: {
      width: '16px',
      height: '16px',
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#FFFFFF',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.6rem',
      fontWeight: 'bold',
      flexShrink: 0,
      marginTop: '0.1rem'
    },
    featuredLeftColumn: {
      display: 'flex',
      flexDirection: 'column'
    },
    featuredRightColumn: {
      display: 'flex',
      flexDirection: 'column'
    },
    ctaSection: {
      textAlign: 'center',
      marginTop: '4rem'
    },
    ctaCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: '3rem',
      borderRadius: '25px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    ctaTitle: {
      fontSize: isMobile ? '2rem' : '3rem',
      fontWeight: '800',
      marginBottom: '1rem',
      color: '#FFFFFF',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
      letterSpacing: '-0.02em'
    },
    ctaDescription: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: '2rem',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontWeight: '500',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    ctaButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#FFFFFF',
      padding: '1.3rem 3rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '30px',
      fontSize: '1.2rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    }
  };

  // Add animations when component mounts and scroll detection
  useEffect(() => {
    // Add CSS animations
    if (!document.querySelector('#service-animations')) {
      const style = document.createElement('style');
      style.id = 'service-animations';
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes pulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Intersection Observer for scroll detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-20px 0px -20px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // For mobile, set visible immediately to avoid animation issues
    if (isMobile) {
      setIsVisible(true);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isMobile]);

  // Fixed hover handlers for buttons
  const handleButtonHover = (e) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
    e.target.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.1)';
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
    e.target.style.boxShadow = 'none';
  };

  const renderServiceCard = (service, index, isAdditional = false) => {
    const animationDelay = isAdditional ? (index * 0.15) : ((index % 4) * 0.15);
    
    // For mobile, always show cards without complex animations
    const shouldShowCard = isMobile ? true : (isAdditional && showAllServices) || (!isAdditional && isVisible);
    
    return (
      <div 
        key={isAdditional ? `additional-${index}` : index} 
        className={`service-card service-card-${index}`}
        style={{
          ...servicesStyles.serviceCard,
          opacity: shouldShowCard ? 1 : 0,
          transform: shouldShowCard 
            ? 'translateX(0)' 
            : isMobile ? 'translateX(0)' : 'translateX(-60px)',
          transition: isMobile ? 'all 0.3s ease' : `all 0.8s ease-out ${animationDelay}s`
        }}
        onMouseOver={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = `translateX(0) translateY(-8px)`;
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)';
            const icon = e.currentTarget.querySelector('.service-icon');
            if (icon) icon.style.transform = 'scale(1.1)';
          }
        }}
        onMouseOut={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = 'translateX(0) translateY(0)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            const icon = e.currentTarget.querySelector('.service-icon');
            if (icon) icon.style.transform = 'scale(1)';
          }
        }}
      >
        <div className="service-icon" style={servicesStyles.serviceIcon}>
          {typeof service.icon === 'string' ? (
            <span style={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}>{service.icon}</span>
          ) : (
            React.cloneElement(service.icon, { size: isMobile ? 24 : 28 })
          )}
        </div>
        
        <h3 className="service-title" style={servicesStyles.serviceTitle}>{service.title}</h3>
        <p className="service-description" style={servicesStyles.serviceDescription}>{service.description}</p>
        
        <ul style={servicesStyles.featureList}>
          {service.features.map((feature, idx) => (
            <li key={idx} className="feature-item" style={servicesStyles.featureItem}>
              <div style={servicesStyles.featureIcon}>✓</div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {service.whyFeatures && (
          <div style={servicesStyles.whySection}>
            <h4 style={servicesStyles.whyTitle}>Why Choose This Service?</h4>
            <ul style={servicesStyles.whyList}>
              {service.whyFeatures.map((whyFeature, idx) => (
                <li key={idx} style={servicesStyles.whyItem}>
                  <div style={servicesStyles.whyIcon}>!</div>
                  <span>{whyFeature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <section ref={sectionRef} style={servicesStyles.services} id="services">
      <div style={servicesStyles.backgroundEffect}></div>
      
      <div style={servicesStyles.container}>
        <div style={servicesStyles.sectionHeader}>
          <span className="badge" style={servicesStyles.badge}>Our Services</span>
          <h2 className="section-title" style={servicesStyles.title}>
            Comprehensive Quality
            <span> Inspection Services</span>
          </h2>
         
        </div>

        {/* Featured Services Section - Sourcing and Destination Inspection */}
        <div style={servicesStyles.featuredGrid}>
          {featuredServices.map((service, index) => (
            <div 
              key={`featured-${index}`} 
              className={`service-card featured-service-card featured-service-card-${index}`}
              style={{
                ...servicesStyles.featuredServiceCard,
                opacity: isVisible ? 1 : 0,
                transform: isVisible 
                  ? 'translateX(0)' 
                  : index === 0 
                    ? 'translateX(-60px)' 
                    : 'translateX(60px)',
                transition: `all 0.8s ease-out ${index * 0.2}s`
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = `${isVisible ? 'translateX(0) ' : ''}translateY(-8px)`;
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                const icon = e.currentTarget.querySelector('.service-icon');
                if (icon) icon.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = isVisible ? 'translateX(0) translateY(0)' : 'translateX(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                const icon = e.currentTarget.querySelector('.service-icon');
                if (icon) icon.style.transform = 'scale(1)';
              }}
            >
              <div style={servicesStyles.featuredLeftColumn}>
                <div className="service-icon" style={servicesStyles.featuredServiceIcon}>
                  {React.cloneElement(service.icon, { size: 32 })}
                </div>
                
                <h3 style={servicesStyles.featuredServiceTitle}>{service.title}</h3>
                <p style={servicesStyles.featuredServiceDescription}>{service.description}</p>
                
                <ul style={servicesStyles.featuredFeatureList}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} style={servicesStyles.featuredFeatureItem}>
                      <div style={servicesStyles.featuredFeatureIcon}>✓</div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={servicesStyles.featuredRightColumn}>
                <div style={servicesStyles.featuredWhySection}>
                  <h4 style={servicesStyles.featuredWhyTitle}>Why Choose This Service?</h4>
                  <ul style={servicesStyles.whyList}>
                    {service.whyFeatures.map((whyFeature, idx) => (
                      <li key={idx} style={servicesStyles.featuredWhyItem}>
                        <div style={servicesStyles.featuredWhyIcon}>!</div>
                        <span>{whyFeature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p style={servicesStyles.description}>
          We offer a complete suite of quality inspection services designed to ensure your cargo meets the highest standards 
          and regulatory requirements across global markets.
        </p>
          
        {/* Initial Services Grid */}
        <div className="services-grid" style={servicesStyles.servicesGrid}>
          {initialServices.map((service, index) => renderServiceCard(service, index, false))}
        </div>

        {/* View All Button - Only show when services are hidden */}
        {!showAllServices && (
          <button
            style={servicesStyles.viewAllButton}
            onClick={() => setShowAllServices(true)}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            <span>View All Services</span>
            <ChevronDown size={20} />
          </button>
        )}

        {/* Additional Services Grid - Initially Hidden */}
        <div className="additional-services-grid" style={servicesStyles.additionalServicesGrid}>
          {additionalServices.map((service, index) => renderServiceCard(service, index, true))}
        </div>

        {/* Show Less Button - Only show when additional services are visible */}
        {showAllServices && (
          <button
            style={{
              ...servicesStyles.viewAllButton,
              marginTop: '3rem'
            }}
            onClick={() => setShowAllServices(false)}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            <span>Show Less</span>
            <ChevronUp size={20} />
          </button>
        )}

        <div style={servicesStyles.ctaSection}>
          <div style={servicesStyles.ctaCard}>
            <h3 className="cta-title" style={servicesStyles.ctaTitle}>Ready to Get Started?</h3>
            <p className="cta-description" style={servicesStyles.ctaDescription}>
              Raise your inspection query with a budget and get multiple quotes from verified global inspectors. 
              Choose the best for your cargo inspection needs.
            </p>
            <button 
              style={servicesStyles.ctaButton}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              Request Inspection Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;