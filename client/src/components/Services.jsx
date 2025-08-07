

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

// export default Services;


import React, { useEffect, useRef, useState } from 'react';
import { Leaf, BarChart3, Shield, Zap } from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const services = [
    
    {
      icon: <Leaf size={40} />,
      title: "Pre-Production Inspection (PPI)",
      description: "Quality checks before production begins to ensure compliance with specifications and regulatory standards.",
      features: ["Material verification", "Specification review", "Production planning", "Quality standards setup"],
    },
    {
      icon: <BarChart3 size={40} />,
      title: "During Production Inspection (DUPRO)",
      description: "In-process quality monitoring to catch issues early and maintain consistent quality throughout production.",
      features: ["Real-time monitoring", "Process verification", "Quality control checks", "Progress reporting"],
    },
    {
      icon: <Shield size={40} />,
      title: "Pre-Shipment Inspection (PSI)",
      description: "Final quality verification before goods are shipped to ensure they meet all requirements and standards.",
      features: ["Final quality checks", "Packaging inspection", "Quantity verification", "Compliance certification"],
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
      icon: "🛃",
      title: "Customs Inspection",
      description: "Government-mandated checks for compliance with legal and safety regulations at ports of export or import.",
      features: ["Legal compliance verification", "Safety regulation checks", "Prohibited substance detection", "Duty & tax assessment"],
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

  const servicesStyles = {
    services: {
      padding: '6rem 2rem',
      background: '#F8F9FA',
      position: 'relative'
    },
    topBorder: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    badge: {
      display: 'inline-block',
      background: 'rgba(108, 92, 231, 0.1)',
      color: '#6C5CE7',
      padding: '0.5rem 1.5rem',
      borderRadius: '25px',
      fontWeight: '600',
      fontSize: '0.9rem',
      marginBottom: '2rem',
      border: '1px solid rgba(108, 92, 231, 0.2)'
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: '900',
      lineHeight: '1.2',
      marginBottom: '2rem',
      color: '#2D3436'
    },
    highlight: {
      background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    description: {
      fontSize: '1.2rem',
      color: 'rgba(45, 52, 54, 0.7)',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6'
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '4rem'
    },
    serviceCard: {
      background: 'white',
      padding: '2rem 1.5rem',
      borderRadius: '20px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxWidth: '320px',
      margin: '0 auto'
    },
    cardTopBorder: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)'
    },
    serviceIcon: {
      width: '55px',
      height: '55px',
      background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.5rem',
      color: 'white',
      transition: 'transform 0.3s ease'
    },
    serviceTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      marginBottom: '0.75rem',
      color: '#2D3436',
      lineHeight: '1.3'
    },
    serviceDescription: {
      color: 'rgba(45, 52, 54, 0.7)',
      marginBottom: '1.5rem',
      lineHeight: '1.5',
      flex: '1',
      fontSize: '0.95rem'
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      marginBottom: '0.6rem',
      color: 'rgba(45, 52, 54, 0.8)',
      fontWeight: '500',
      fontSize: '0.9rem'
    },
    featureIcon: {
      width: '18px',
      height: '18px',
      background: 'linear-gradient(135deg, #FF6B35, #FD79A8)',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      flexShrink: 0
    },
    ctaSection: {
      textAlign: 'center',
      marginTop: '4rem'
    },
    ctaCard: {
      background: 'white',
      padding: '3rem',
      borderRadius: '25px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(108, 92, 231, 0.1)'
    },
    ctaTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '1rem',
      color: '#2D3436'
    },
    ctaDescription: {
      fontSize: '1.2rem',
      color: 'rgba(45, 52, 54, 0.7)',
      marginBottom: '2rem',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
      color: 'white',
      padding: '1.2rem 3rem',
      border: 'none',
      borderRadius: '30px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  };

  // Add animations when component mounts and scroll detection
  useEffect(() => {
    // Add CSS animations
    if (!document.querySelector('#service-animations')) {
      const style = document.createElement('style');
      style.id = 'service-animations';
      style.textContent = `
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
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} style={servicesStyles.services} id="services">
      <div style={servicesStyles.topBorder}></div>
      
      <div style={servicesStyles.container}>
        <div style={servicesStyles.sectionHeader}>
          <span style={servicesStyles.badge}>Our Services</span>
          <h2 style={servicesStyles.title}>
            Comprehensive Quality
            <span style={servicesStyles.highlight}> Inspection Services</span>
          </h2>
          <p style={servicesStyles.description}>
            We offer a complete suite of quality inspection services designed to ensure your cargo meets the highest standards 
            and regulatory requirements across global markets.
          </p>
        </div>

        <div style={servicesStyles.servicesGrid}>
          {services.map((service, index) => {
            // Determine animation direction based on position
            const isUpperRow = index < 4;
            const animationDelay = (index % 4) * 0.15; // Stagger animation within each row
            
            return (
              <div 
                key={index} 
                className={`service-card service-card-${index}`}
                style={{
                  ...servicesStyles.serviceCard,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible 
                    ? 'translateX(0)' 
                    : isUpperRow 
                      ? 'translateX(-60px)' 
                      : 'translateX(60px)',
                  transition: `all 0.8s ease-out ${animationDelay}s`
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = `${isVisible ? 'translateX(0) ' : ''}translateY(-8px)`;
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
                  const icon = e.currentTarget.querySelector('.service-icon');
                  if (icon) icon.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = isVisible ? 'translateX(0) translateY(0)' : 'translateX(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                  const icon = e.currentTarget.querySelector('.service-icon');
                  if (icon) icon.style.transform = 'scale(1)';
                }}
              >
                <div style={servicesStyles.cardTopBorder}></div>
                
                <div className="service-icon" style={servicesStyles.serviceIcon}>
                  {typeof service.icon === 'string' ? (
                    <span style={{ fontSize: '1.5rem' }}>{service.icon}</span>
                  ) : (
                    React.cloneElement(service.icon, { size: 28 })
                  )}
                </div>
                
                <h3 style={servicesStyles.serviceTitle}>{service.title}</h3>
                <p style={servicesStyles.serviceDescription}>{service.description}</p>
                
                <ul style={servicesStyles.featureList}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} style={servicesStyles.featureItem}>
                      <div style={servicesStyles.featureIcon}>✓</div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div style={servicesStyles.ctaSection}>
          <div style={servicesStyles.ctaCard}>
            <h3 style={servicesStyles.ctaTitle}>Ready to Get Started?</h3>
            <p style={servicesStyles.ctaDescription}>
              Raise your inspection query with a budget and get multiple quotes from verified global inspectors. 
              Choose the best for your cargo inspection needs.
            </p>
            <button 
              style={servicesStyles.ctaButton}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px rgba(108, 92, 231, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
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