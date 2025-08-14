

// import React from 'react';
// import { Award, Users, Target, TrendingUp, ArrowRight } from 'lucide-react';
// const About = () => {
//   const achievements = [
//     {
//       icon: <Award className="h-10 w-10" />,
//       number: "1000+",
//       label: "Global Inspectors"
//     },
//     {
//       icon: <Users className="h-10 w-10" />,
//       number: "50+",
//       label: "Countries Covered"
//     },
//     {
//       icon: <Target className="h-10 w-10" />,
//       number: "98%",
//       label: "Transparency Rate"
//     },
//     {
//       icon: <TrendingUp className="h-10 w-10" />,
//       number: "24/7",
//       label: "Platform Support"
//     }
//   ];

//   const values = [
//     {
//       title: "Raise Inspection Query",
//       description: "Create your inspection requirements with budget and timeline specifications on our platform."
//     },
//     {
//       title: "Choose the Best Quote",
//       description: "Compare multiple quotes from verified global inspectors and select the best fit for your needs."
//     },
//     {
//       title: "Better Transparency",
//       description: "Track inspection progress with live updates and comprehensive reporting for complete visibility."
//     },
//     {
//       title: "Global Inspector Network",
//       description: "Access our vast network of certified inspectors across 50+ countries for worldwide coverage."
//     }
//   ];

//   return (
//     <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-indigo-900/20"></div>
//       </div>
      
//       <div className="w-full px-6 lg:px-12 xl:px-16 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
//           <div>
//             <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-yellow-400/30">
//               <span className="text-yellow-400 text-sm font-semibold">About Quality.AI</span>
//             </div>
//             <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
//               Revolutionizing Global
//               <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">Quality Inspections</span>
//             </h2>
//             <p className="text-lg text-gray-300 mb-6 leading-relaxed font-medium">
//               Quality.AI is a revolutionary B2B marketplace connecting global traders with certified inspection firms. 
//               We eliminate the hassle of traditional communication methods by providing a centralized platform where 
//               you can create inspection demands and receive multiple competitive quotes.
//             </p>
//             <p className="text-lg text-gray-300 mb-8 leading-relaxed font-medium">
//               Our platform maps the entire inspection process, providing status updates and live tracking for complete 
//               transparency. Add stakeholders to make quality decisions with instant updates and comprehensive reporting. 
//               Quality Inspections simplified.
//             </p>
//             <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 font-semibold flex items-center group shadow-xl hover:shadow-2xl transform hover:scale-105">
//               Learn Our Story
//               <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
//             </button>
//           </div>
          
//           <div className="relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-3xl blur-3xl"></div>
//             <div className="relative grid grid-cols-2 gap-4">
//               <img 
//                 src="https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
//                 alt="Quality inspection technology"
//                 className="rounded-2xl shadow-2xl w-full h-48 object-cover border border-gray-600"
//               />
//               <img 
//                 src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
//                 alt="Global trade network"
//                 className="rounded-2xl shadow-2xl w-full h-48 object-cover mt-8 border border-gray-600"
//               />
//               <img 
//                 src="https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
//                 alt="Digital platform"
//                 className="rounded-2xl shadow-2xl w-full h-48 object-cover -mt-8 border border-gray-600"
//               />
//               <img 
//                 src="https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
//                 alt="Quality control process"
//                 className="rounded-2xl shadow-2xl w-full h-48 object-cover border border-gray-600"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
//           {achievements.map((achievement, index) => (
//             <div key={index} className="text-center group">
//               <div className="text-yellow-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
//                 {achievement.icon}
//               </div>
//               <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">{achievement.number}</div>
//               <div className="text-gray-300 font-medium">{achievement.label}</div>
//             </div>
//           ))}
//         </div>

//         <div>
//           <div className="text-center mb-12">
//             <h3 className="text-4xl font-bold text-white mb-6">What You Get With Quality.AI</h3>
//             <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium">
//               Our platform provides comprehensive solutions for all your quality inspection needs with AI-based insights 
//               and market analytics for better trade decisions.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((value, index) => (
//               <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/50 hover:border-yellow-400/50 group shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
//                 <h4 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">{value.title}</h4>
//                 <p className="text-gray-300 leading-relaxed font-medium">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default About;



// import React from 'react';
// import { Award, Users, Target, TrendingUp, ArrowRight } from 'lucide-react';
// import Services1 from '../assets/services1.png';
// import Services2 from '../assets/services2.png';

// const About = () => {
//   const achievements = [
//     {
//       icon: <Award size={40} />,
//       number: "250+",
//       label: "Global Inspectors"
//     },
//     {
//       icon: <Users size={40} />,
//       number: "30+",
//       label: "Countries Covered"
//     },
//     {
//       icon: <Target size={40} />,
//       number: "+69%",
//       label: "Productivity & Cost Saving"
//     },
//     {
//       icon: <TrendingUp size={40} />,
//       number: "24/7",
//       label: "Platform Support"
//     }
//   ];

//   const values = [
//     {
//       title: "Raise Inspection Query",
//       description: "Create your inspection requirements with budget and timeline specifications on our platform."
//     },
//     {
//       title: "Choose the Best Quote",
//       description: "Compare multiple quotes from verified global inspectors and select the best fit for your needs."
//     },
//     {
//       title: "Better Transparency",
//       description: "Track inspection progress with live updates and comprehensive reporting for complete visibility."
//     },
//     {
//       title: "Global Inspector Network",
//       description: "Access our vast network of certified inspectors across 50+ countries for worldwide coverage."
//     }
//   ];

//   const aboutStyles = {
//     about: {
//       padding: '6rem 2rem',
//       background: '#1A1A1A',
//       position: 'relative',
//       overflow: 'hidden'
//     },
//     backgroundEffect: {
//       position: 'absolute',
//       top: '20%',
//       right: '-20%',
//       width: '40%',
//       height: '60%',
//       background: 'radial-gradient(circle, rgba(162, 155, 254, 0.1) 0%, transparent 70%)',
//       animation: 'pulse 15s ease-in-out infinite'
//     },
//     container: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '4rem',
//       alignItems: 'center',
//       position: 'relative',
//       zIndex: 10
//     },
//     aboutText: {
//       color: '#FFFFFF'
//     },
//     badge: {
//       display: 'inline-flex',
//       alignItems: 'center',
//       background: 'rgba(255, 107, 53, 0.1)',
//       color: '#FF6B35',
//       padding: '0.75rem 1.5rem',
//       borderRadius: '25px',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       marginBottom: '2rem',
//       border: '1px solid rgba(255, 107, 53, 0.2)',
//       backdropFilter: 'blur(10px)'
//     },
//     title: {
//       fontSize: '4rem',
//       fontWeight: '900',
//       lineHeight: '1.2',
//       marginBottom: '2rem',
//       color: '#FFFFFF'
//     },
//     highlight: {
//       background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text'
//     },
//     description: {
//       color: 'rgba(255, 255, 255, 0.8)',
//       marginBottom: '1.5rem',
//       fontSize: '1.1rem',
//       lineHeight: '1.6'
//     },
//     achievementsGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(2, 1fr)',
//       gap: '2rem',
//       margin: '3rem 0'
//     },
//     achievement: {
//       textAlign: 'center',
//       padding: '1.5rem',
//       background: 'rgba(255, 255, 255, 0.05)',
//       borderRadius: '15px',
//       backdropFilter: 'blur(10px)',
//       border: '1px solid rgba(255, 255, 255, 0.1)',
//       transition: 'all 0.3s ease'
//     },
//     achievementIcon: {
//       color: '#FF6B35',
//       marginBottom: '1rem',
//       display: 'flex',
//       justifyContent: 'center'
//     },
//     achievementNumber: {
//       fontSize: '2.5rem',
//       fontWeight: '900',
//       background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text',
//       marginBottom: '0.5rem'
//     },
//     achievementLabel: {
//       color: 'rgba(255, 255, 255, 0.7)',
//       fontWeight: '500'
//     },
//     ctaButton: {
//       background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
//       color: 'white',
//       padding: '1rem 2rem',
//       borderRadius: '30px',
//       textDecoration: 'none',
//       fontWeight: '600',
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       transition: 'all 0.3s ease',
//       border: 'none',
//       cursor: 'pointer',
//       fontSize: '1rem'
//     },
//     aboutVisual: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(2, 1fr)',
//       gap: '1rem',
//       position: 'relative'
//     },
//     visualGlow: {
//       position: 'absolute',
//       inset: 0,
//       background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.3), rgba(255, 107, 53, 0.3))',
//       borderRadius: '25px',
//       filter: 'blur(40px)',
//       zIndex: -1
//     },
//     aboutImage: {
//       width: '100%',
//       height: '200px',
//       objectFit: 'cover',
//       borderRadius: '15px',
//       transition: 'all 0.3s ease',
//       border: '1px solid rgba(255, 255, 255, 0.1)'
//     },
//     valuesSection: {
//       marginTop: '4rem',
//       gridColumn: '1 / -1'
//     },
//     valuesHeader: {
//       textAlign: 'center',
//       marginBottom: '3rem'
//     },
//     valuesTitle: {
//       fontSize: '2.5rem',
//       fontWeight: '700',
//       color: '#FFFFFF',
//       marginBottom: '1.5rem'
//     },
//     valuesDescription: {
//       fontSize: '1.2rem',
//       color: 'rgba(255, 255, 255, 0.8)',
//       maxWidth: '600px',
//       margin: '0 auto',
//       lineHeight: '1.6'
//     },
//     valuesGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//       gap: '2rem'
//     },
//     valueCard: {
//       background: 'rgba(255, 255, 255, 0.05)',
//       backdropFilter: 'blur(10px)',
//       padding: '2rem',
//       borderRadius: '20px',
//       border: '1px solid rgba(255, 255, 255, 0.1)',
//       transition: 'all 0.3s ease',
//       cursor: 'pointer'
//     },
//     valueTitle: {
//       fontSize: '1.25rem',
//       fontWeight: '700',
//       color: '#FFFFFF',
//       marginBottom: '1rem'
//     },
//     valueDescription: {
//       color: 'rgba(255, 255, 255, 0.7)',
//       lineHeight: '1.6'
//     }
//   };

//   // Add keyframes for animations
//   React.useEffect(() => {
//     if (!document.querySelector('#about-animations')) {
//       const keyframes = `
//         @keyframes pulse {
//           0%, 100% { transform: scale(1) rotate(0deg); }
//           50% { transform: scale(1.1) rotate(180deg); }
//         }
//       `;
//       const style = document.createElement('style');
//       style.id = 'about-animations';
//       style.textContent = keyframes;
//       document.head.appendChild(style);
//     }
//   }, []);

//   return (
//     <section style={aboutStyles.about} id="about">
//       <div style={aboutStyles.backgroundEffect}></div>
      
//       <div style={aboutStyles.container}>
//         <div style={aboutStyles.aboutText}>
//           <div style={aboutStyles.badge}>
//             About Qualty.AI
//           </div>
//           <h2 style={aboutStyles.title}>
//             Revolutionizing Global
//             <span style={aboutStyles.highlight}> Quality Inspections</span>
//           </h2>
//           <p style={aboutStyles.description}>
//             Quality.AI is a revolutionary B2B marketplace connecting global traders with certified inspection firms. 
//             We eliminate the hassle of traditional communication methods by providing a centralized platform where 
//             you can create inspection demands and receive multiple competitive quotes.
//           </p>
//           <p style={aboutStyles.description}>
//             Our platform maps the entire inspection process, providing status updates and live tracking for complete 
//             transparency. Add stakeholders to make quality decisions with instant updates and comprehensive reporting. 
//             Quality Inspections simplified.
//           </p>
//           <button 
//             style={aboutStyles.ctaButton}
//             onMouseOver={(e) => {
//               e.target.style.transform = 'translateY(-3px)';
//               e.target.style.boxShadow = '0 15px 35px rgba(255, 107, 53, 0.4)';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = 'none';
//             }}
//           >
//             Learn Our Story
//             <ArrowRight size={20} />
//           </button>
//         </div>
        
//         <div style={aboutStyles.aboutVisual}>
//           <div style={aboutStyles.visualGlow}></div>
//           <img 
//             src={Services1} 
//             alt="Quality inspection technology"
//             style={{...aboutStyles.aboutImage, transform: 'translateY(-20px)'}}
//             onMouseOver={(e) => e.target.style.transform = 'translateY(-20px) scale(1.05)'}
//             onMouseOut={(e) => e.target.style.transform = 'translateY(-20px) scale(1)'}
//           />
//           <img 
//             src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
//             alt="Global trade network"
//             style={{...aboutStyles.aboutImage, transform: 'translateY(20px)'}}
//             onMouseOver={(e) => e.target.style.transform = 'translateY(20px) scale(1.05)'}
//             onMouseOut={(e) => e.target.style.transform = 'translateY(20px) scale(1)'}
//           />
//           <img 
//             src="https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
//             alt="Digital platform"
//             style={{...aboutStyles.aboutImage, transform: 'translateY(-20px)'}}
//             onMouseOver={(e) => e.target.style.transform = 'translateY(-20px) scale(1.05)'}
//             onMouseOut={(e) => e.target.style.transform = 'translateY(-20px) scale(1)'}
//           />
//           <img 
//             src={Services2}
//             alt="Quality control process"
//             style={{...aboutStyles.aboutImage, transform: 'translateY(20px)'}}
//             onMouseOver={(e) => e.target.style.transform = 'translateY(20px) scale(1.05)'}
//             onMouseOut={(e) => e.target.style.transform = 'translateY(20px) scale(1)'}
//           />
//         </div>

//         <div style={aboutStyles.valuesSection}>
//           <div style={aboutStyles.valuesHeader}>
//             <h3 style={aboutStyles.valuesTitle}>What You Get With Qualty.AI</h3>
//             <p style={aboutStyles.valuesDescription}>
//               Our platform provides comprehensive solutions for all your quality inspection needs with AI-based insights 
//               and market analytics for better trade decisions.
//             </p>
//           </div>
          
//           <div style={aboutStyles.valuesGrid}>
//             {values.map((value, index) => (
//               <div 
//                 key={index} 
//                 style={aboutStyles.valueCard}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
//                   e.currentTarget.style.border = '1px solid rgba(255, 107, 53, 0.3)';
//                   e.currentTarget.style.transform = 'translateY(-5px)';
//                   const title = e.currentTarget.querySelector('.value-title');
//                   if (title) title.style.color = '#FF6B35';
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
//                   e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   const title = e.currentTarget.querySelector('.value-title');
//                   if (title) title.style.color = '#FFFFFF';
//                 }}
//               >
//                 <h4 className="value-title" style={aboutStyles.valueTitle}>{value.title}</h4>
//                 <p style={aboutStyles.valueDescription}>{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div style={{gridColumn: '1 / -1', textAlign: 'center', marginTop: '4rem'}}>
//           <div style={aboutStyles.achievementsGrid}>
//             {achievements.map((achievement, index) => (
//               <div 
//                 key={index} 
//                 style={aboutStyles.achievement}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
//                   e.currentTarget.style.transform = 'translateY(-5px)';
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
//                   e.currentTarget.style.transform = 'translateY(0)';
//                 }}
//               >
//                 <div style={aboutStyles.achievementIcon}>
//                   {achievement.icon}
//                 </div>
//                 <div style={aboutStyles.achievementNumber}>{achievement.number}</div>
//                 <div style={aboutStyles.achievementLabel}>{achievement.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;import React,{useState, useEffect} from 'react';
import React, { useState, useEffect } from 'react';
import { Award, Users, Target, TrendingUp, ArrowRight } from 'lucide-react';

import Scene1 from '../assets/Scene1.mp4';
import Scene2 from '../assets/Scene2.mp4';

const About = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const achievements = [
    {
      icon: <Award size={40} />,
      number: "250+",
      label: "Global Inspectors"
    },
    {
      icon: <Users size={40} />,
      number: "30+",
      label: "Countries Covered"
    },
    {
      icon: <Target size={40} />,
      number: "+69%",
      label: "Productivity & Cost Saving"
    },
    {
      icon: <TrendingUp size={40} />,
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

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const aboutStyles = {
    about: {
      padding: isMobile ? '4rem 1rem' : '6rem 2rem',
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
      display: isMobile ? 'flex' : 'grid',
      flexDirection: isMobile ? 'column' : 'unset',
      gridTemplateColumns: isMobile ? 'unset' : '1fr 1fr',
      gap: isMobile ? '2rem' : '4rem',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    },
    aboutText: {
      color: '#FFFFFF',
      textAlign: isMobile ? 'center' : 'left',
      order: isMobile ? 1 : 'unset'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      background: 'gray',
      color: 'white',
      padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
      borderRadius: '25px',
      fontWeight: '700',
      fontSize: isMobile ? '1rem' : '1.2rem',
      marginBottom: '2rem',
      backdropFilter: 'blur(10px)',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    title: {
      fontSize: isMobile ? '2.5rem' : '5rem',
      fontWeight: '900',
      lineHeight: '1.1',
      marginBottom: '2rem',
      color: '#FFFFFF',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
      letterSpacing: '-0.03em'
    },
    highlight: {
      background: 'gray',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    description: {
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '1.5rem',
      fontSize: isMobile ? '1rem' : '1.4rem',
      lineHeight: '1.6',
      fontWeight: '500',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    // Mobile Scene2 video after title
    mobileScene2Video: {
      width: 'calc(100% - 2rem)',
      height: '250px',
      borderRadius: '15px',
      overflow: 'hidden',
      margin: '2rem 1rem',
      order: 2,
      display: isMobile ? 'block' : 'none'
    },
    mobileScene2VideoElement: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '15px'
    },
    achievementsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
      gap: isMobile ? '1rem' : '2rem',
      margin: '3rem 0',
      order: isMobile ? 3 : 'unset'
    },
    achievement: {
      textAlign: 'center',
      padding: isMobile ? '1rem' : '1.5rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '15px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease'
    },
    achievementIcon: {
      color: 'white',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'center'
    },
    achievementIconElement: {
      width: isMobile ? '30px' : '40px',
      height: isMobile ? '30px' : '40px'
    },
    achievementNumber: {
      fontSize: isMobile ? '2rem' : '3rem',
      fontWeight: '900',
      background: 'white',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '0.5rem',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif'
    },
    achievementLabel: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontWeight: '600',
      fontSize: isMobile ? '0.9rem' : '1.1rem',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    ctaButton: {
      background: 'gray',
      color: 'white',
      padding: isMobile ? '1rem 2rem' : '1.3rem 2.8rem',
      borderRadius: '30px',
      textDecoration: 'none',
      fontWeight: '700',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      fontSize: isMobile ? '1rem' : '1.2rem',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      marginBottom: '2rem',
      order: isMobile ? 4 : 'unset'
    },
    aboutVisual: {
      position: 'relative',
      borderRadius: '25px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      display: isMobile ? 'none' : 'block',
      order: isMobile ? 'unset' : 'unset'
    },
    visualGlow: {
      position: 'absolute',
      inset: 0,
      borderRadius: '25px',
      filter: 'blur(40px)',
      zIndex: -1
    },
    aboutVideo: {
      width: '100%',
      height: '500px',
      objectFit: 'cover',
      borderRadius: '25px',
      transition: 'transform 0.3s ease',
      willChange: 'transform',
      backfaceVisibility: 'hidden',
      transform: 'translateZ(0)'
    },
    // Video Modal Styles
    videoModal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    },
    videoContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '1000px',
      background: '#000',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
    },
    video: {
      width: '100%',
      height: 'auto',
      display: 'block'
    },
    closeButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      color: 'white',
      padding: '12px',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    // Video Section - Full Width Inline
    videoSection: {
      marginTop: '4rem',
      gridColumn: isMobile ? 'unset' : '1 / -1',
      width: isMobile ? 'calc(100% - 2rem)' : '100%',
      height: isMobile ? '300px' : '100vh',
      borderRadius: isMobile ? '15px' : '25px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      margin: isMobile ? '2rem 1rem' : '4rem 0 0 0',
      order: isMobile ? 5 : 'unset'
    },
    inlineVideo: {
      width: '100%',
      height: isMobile ? '300px' : '100vh',
      objectFit: 'cover',
      display: 'block',
      borderRadius: isMobile ? '15px' : '25px'
    },
    valuesSection: {
      marginTop: '4rem',
      gridColumn: isMobile ? 'unset' : '1 / -1',
      order: isMobile ? 6 : 'unset',
      padding: isMobile ? '0 1rem' : '0'
    },
    valuesHeader: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    valuesTitle: {
      fontSize: isMobile ? '2rem' : '3rem',
      fontWeight: '800',
      color: '#FFFFFF',
      marginBottom: '1.5rem',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
      letterSpacing: '-0.02em'
    },
    valuesDescription: {
      fontSize: isMobile ? '1rem' : '1.3rem',
      color: 'rgba(255, 255, 255, 0.8)',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6',
      fontWeight: '500',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: isMobile ? '1rem' : '2rem',
      maxWidth: isMobile ? '350px' : 'none',
      margin: isMobile ? '0 auto' : '0'
    },
    valueCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: isMobile ? '1.5rem' : '2rem',
      borderRadius: isMobile ? '15px' : '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      maxWidth: isMobile ? '320px' : 'none',
      margin: isMobile ? '0 auto' : '0'
    },
    valueTitle: {
      fontSize: isMobile ? '1.2rem' : '1.5rem',
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: '1rem',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif'
    },
    valueDescription: {
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: '1.6',
      fontSize: isMobile ? '0.9rem' : '1.1rem',
      fontWeight: '500',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    achievementsContainer: {
      gridColumn: isMobile ? 'unset' : '1 / -1',
      textAlign: 'center',
      marginTop: '4rem',
      order: isMobile ? 7 : 'unset',
      padding: isMobile ? '0 1rem' : '0'
    }
  };

  // Add keyframes for animations
  React.useEffect(() => {
    if (!document.querySelector('#about-animations')) {
      const keyframes = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes pulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }
      `;
      const style = document.createElement('style');
      style.id = 'about-animations';
      style.textContent = keyframes;
      document.head.appendChild(style);
    }
  }, []);

  const handleVideoClick = () => {
    // Video now plays inline, no modal needed
  };

  return (
    <section style={aboutStyles.about} id="about">
      <div style={aboutStyles.backgroundEffect}></div>
      
      <div style={aboutStyles.container}>
        <div style={aboutStyles.aboutText}>
          <div style={aboutStyles.badge}>
            About Qualty.AI
          </div>
          <h2 style={aboutStyles.title}>
            Revolutionizing Global
            <span> Quality Inspections</span>
          </h2>
          
          {/* Scene2 Video for Mobile - appears after title */}
          {isMobile && (
            <div style={aboutStyles.mobileScene2Video}>
              <video
                style={aboutStyles.mobileScene2VideoElement}
                autoPlay
                loop
                muted
                playsInline
                src={Scene2}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          
          <p style={aboutStyles.description}>
            Qualty.AI is a revolutionary B2B marketplace connecting global traders with certified inspection firms and freelancers. 
            We eliminate the hassle of traditional communication methods by providing a centralized platform where 
            you can create inspection demands and receive multiple competitive quotes.
          </p>
          <p style={aboutStyles.description}>
            Our platform maps the entire inspection process, providing status updates and live tracking for complete 
            transparency. Add stakeholders to make quality decisions with instant updates and comprehensive reporting. 
            Quality Inspections simplified.
          </p>
          
          {/* Achievements Grid for Mobile */}
          <div style={{
            ...aboutStyles.achievementsGrid,
            display: isMobile ? 'grid' : 'none',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            margin: '2rem 0',
            width: '100%',
            maxWidth: '350px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                style={{
                  ...aboutStyles.achievement,
                  textAlign: 'center',
                  padding: '1rem 0.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div style={{
                  color: 'white',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {React.cloneElement(achievement.icon, { 
                    size: 28
                  })}
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  background: 'white',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '0.3rem',
                  fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif'
                }}>
                  {achievement.number}
                </div>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  textAlign: 'center',
                  lineHeight: '1.2'
                }}>
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            style={aboutStyles.ctaButton}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = 'none';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Learn Our Story
            <ArrowRight size={isMobile ? 16 : 20} />
          </button>
        </div>
        
        {/* Desktop Scene2 Video */}
        <div style={aboutStyles.aboutVisual}>
          <div style={aboutStyles.visualGlow}></div>
          <video
            style={aboutStyles.aboutVideo}
            autoPlay
            loop
            muted
            playsInline
            src={Scene2}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Full Width Video Section - Scene1 */}
        <div style={aboutStyles.videoSection}>
          <video
            style={aboutStyles.inlineVideo}
            autoPlay
            loop
            muted
            playsInline
            src={Scene1}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Values Section */}
        <div style={aboutStyles.valuesSection}>
          <div style={aboutStyles.valuesHeader}>
            <h3 style={aboutStyles.valuesTitle}>What You Get With Qualty.AI</h3>
            <p style={aboutStyles.valuesDescription}>
              Our platform provides comprehensive solutions for all your quality inspection needs with AI-based insights 
              and market analytics for better trade decisions.
            </p>
          </div>
          
          <div style={aboutStyles.valuesGrid}>
            {values.map((value, index) => (
              <div 
                key={index} 
                style={aboutStyles.valueCard}
                onMouseOver={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    const title = e.currentTarget.querySelector('.value-title');
                    if (title) title.style.color = 'gray';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    const title = e.currentTarget.querySelector('.value-title');
                    if (title) title.style.color = '#FFFFFF';
                  }
                }}
              >
                <h4 className="value-title" style={aboutStyles.valueTitle}>{value.title}</h4>
                <p style={aboutStyles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Achievements */}
        {!isMobile && (
          <div style={aboutStyles.achievementsContainer}>
            <div style={aboutStyles.achievementsGrid}>
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  style={aboutStyles.achievement}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={aboutStyles.achievementIcon}>
                    {achievement.icon}
                  </div>
                  <div style={aboutStyles.achievementNumber}>{achievement.number}</div>
                  <div style={aboutStyles.achievementLabel}>{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Modal - Removed as video now plays inline */}
    </section>
  );
};

export default About;