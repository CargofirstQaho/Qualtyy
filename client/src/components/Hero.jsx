
// import React, { useState, useEffect } from 'react';
// import { CheckCircle, ArrowRight, Play } from 'lucide-react';
// import HeroPage1 from '../assets/HeroPage1.png';
// import HeroPage2 from '../assets/HeroPage2.png';
// import HeroPage3 from '../assets/HeroPage3.png';
// import HeroPage4 from '../assets/HeroPage4.png';
// import HeroPage5 from '../assets/HeroPage5.png';
// import Globe1 from '../assets/Globe1.png';

// const Hero = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
//   // Array of your hero images
//   const heroImages = [HeroPage1, HeroPage2, HeroPage3, HeroPage4, HeroPage5];

//   // Auto-advance images every 4 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => 
//         prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [heroImages.length]);

//   const stats = [
//     { number: '1000+', label: 'Global Inspectors' },
//     { number: '98%', label: 'Client Satisfaction' },
//     { number: '50+', label: 'Countries Covered' },
//     { number: '24/7', label: 'Platform Support' }
//   ];

//   const features = [
//     "Raise Inspection query",
//     "Choose the best quote", 
//     "Better transparency and reporting of cargo",
//     "Reach out to global inspectors",
//     "AI based suggestions for quality of cargo",
//     "Market analytics tool with AI based insights for your trade decisions"
//   ];

//   const heroStyles = {
//     hero: {
//       background: '#1A1A1A',
//       minHeight: '100vh',
//       display: 'flex',
//       alignItems: 'center',
//       position: 'relative',
//       overflow: 'hidden',
//       paddingTop: '80px'
//     },
//     globeBackground: {
//       position: 'absolute',
//       top: '0',
//       left: '0',
//       width: '100%',
//       height: '100%',
//       backgroundImage: `url(${Globe1})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//       opacity: '0.1',
//       zIndex: 1
//     },
//     heroBackground: {
//       position: 'absolute',
//       top: '-50%',
//       right: '-50%',
//       width: '100%',
//       height: '200%',
//       background: 'radial-gradient(circle, rgba(108, 92, 231, 0.15) 0%, transparent 70%)',
//       animation: 'float 20s ease-in-out infinite',
//       zIndex: 2
//     },
//     heroBackgroundSecondary: {
//       position: 'absolute',
//       bottom: '-50%',
//       left: '-50%',
//       width: '100%',
//       height: '200%',
//       background: 'radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%)',
//       animation: 'float 25s ease-in-out infinite reverse',
//       zIndex: 2
//     },
//     container: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       padding: '2rem',
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '4rem',
//       alignItems: 'center',
//       position: 'relative',
//       zIndex: 15
//     },
//     heroText: {
//       color: '#FFFFFF'
//     },
//     badge: {
//       display: 'inline-flex',
//       alignItems: 'center',
//       background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.2), rgba(255, 107, 53, 0.2))',
//       backdropFilter: 'blur(10px)',
//       borderRadius: '25px',
//       padding: '0.75rem 1.5rem',
//       marginBottom: '2rem',
//       border: '1px solid rgba(255, 107, 53, 0.3)',
//       fontSize: '0.9rem',
//       fontWeight: '600',
//       color: '#FF6B35'
//     },
//     title: {
//       fontSize: '4rem',
//       fontWeight: '900',
//       lineHeight: '1.1',
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
//       fontSize: '1.25rem',
//       color: 'rgba(255, 255, 255, 0.8)',
//       marginBottom: '2rem',
//       fontWeight: '400',
//       lineHeight: '1.6'
//     },
//     featureList: {
//       listStyle: 'none',
//       marginBottom: '3rem',
//       padding: 0
//     },
//     featureItem: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '1rem',
//       marginBottom: '1rem',
//       color: '#FFFFFF',
//       fontWeight: '500'
//     },
//     featureIcon: {
//       width: '28px',
//       height: '28px',
//       background: 'linear-gradient(135deg, #FF6B35, #FD79A8)',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       flexShrink: 0,
//       color: 'white',
//       fontSize: '0.8rem'
//     },
//     buttonContainer: {
//       display: 'flex',
//       gap: '1rem',
//       flexWrap: 'wrap'
//     },
//     primaryButton: {
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
//     secondaryButton: {
//       background: 'rgba(255, 255, 255, 0.1)',
//       color: 'white',
//       padding: '1rem 2rem',
//       borderRadius: '30px',
//       textDecoration: 'none',
//       fontWeight: '600',
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       border: '2px solid rgba(255, 255, 255, 0.2)',
//       transition: 'all 0.3s ease',
//       backdropFilter: 'blur(10px)',
//       fontSize: '1rem'
//     },
//     visualContainer: {
//       position: 'relative'
//     },
//     carouselContainer: {
//       position: 'relative',
//       width: '100%',
//       height: '500px',
//       borderRadius: '25px',
//       overflow: 'hidden',
//       boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
//     },
//     heroImage: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//       transition: 'opacity 1s ease-in-out',
//       opacity: 0
//     },
//     heroImageActive: {
//       opacity: 1
//     },
//     carouselIndicators: {
//       position: 'absolute',
//       bottom: '20px',
//       left: '50%',
//       transform: 'translateX(-50%)',
//       display: 'flex',
//       gap: '10px',
//       zIndex: 10
//     },
//     indicator: {
//       width: '12px',
//       height: '12px',
//       borderRadius: '50%',
//       background: 'rgba(255, 255, 255, 0.4)',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease'
//     },
//     indicatorActive: {
//       background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
//       transform: 'scale(1.2)'
//     },
//     statsContainer: {
//       position: 'absolute',
//       bottom: '-30px',
//       left: '-30px',
//       background: 'rgba(26, 26, 26, 0.9)',
//       backdropFilter: 'blur(20px)',
//       padding: '2rem',
//       borderRadius: '20px',
//       border: '1px solid rgba(255, 107, 53, 0.2)'
//     },
//     statsGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(2, 1fr)',
//       gap: '1.5rem',
//       textAlign: 'center'
//     },
//     statNumber: {
//       fontSize: '2rem',
//       fontWeight: '900',
//       background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text'
//     },
//     statLabel: {
//       color: 'rgba(255, 255, 255, 0.7)',
//       fontSize: '0.9rem',
//       fontWeight: '500'
//     },
//     // Responsive styles
//     '@media (max-width: 768px)': {
//       container: {
//         gridTemplateColumns: '1fr',
//         gap: '3rem',
//         textAlign: 'center',
//         padding: '1rem'
//       },
//       title: {
//         fontSize: '2.5rem'
//       },
//       statsContainer: {
//         position: 'static',
//         marginTop: '2rem'
//       }
//     }
//   };

//   // Add keyframes for animations
//   const styleSheet = document.styleSheets[0];
//   if (styleSheet && !document.querySelector('#hero-animations')) {
//     const keyframes = `
//       @keyframes float {
//         0%, 100% { transform: translate(0, 0) rotate(0deg); }
//         33% { transform: translate(-30px, -30px) rotate(120deg); }
//         66% { transform: translate(30px, -20px) rotate(240deg); }
//       }
//     `;
//     const style = document.createElement('style');
//     style.id = 'hero-animations';
//     style.textContent = keyframes;
//     document.head.appendChild(style);
//   }

//   const handleIndicatorClick = (index) => {
//     setCurrentImageIndex(index);
//   };

//   return (
//     <section style={heroStyles.hero} id="home">
//       <div style={heroStyles.globeBackground}></div>
//       <div style={heroStyles.heroBackground}></div>
//       <div style={heroStyles.heroBackgroundSecondary}></div>
      
//       <div style={heroStyles.container}>
//         <div style={heroStyles.heroText}>
//           <div style={heroStyles.badge}>
//             🌍 Global Quality Inspections Marketplace
//           </div>

//           <h1 style={heroStyles.title}>
//             Global <span style={heroStyles.highlight}>Quality Inspections</span> For Global Trade
//           </h1>

//           <p style={heroStyles.description}>
//             Global Quality Inspections solved at one platform. Quality.AI is a marketplace for global quality inspections bringing together global traders and inspectors worldwide.
//           </p>

//           <ul style={heroStyles.featureList}>
//             {features.map((feature, index) => (
//               <li key={index} style={heroStyles.featureItem}>
//                 <div style={heroStyles.featureIcon}>
//                   <CheckCircle size={16} />
//                 </div>
//                 <span>{feature}</span>
//               </li>
//             ))}
//           </ul>

//           <div style={heroStyles.buttonContainer}>
//             <button 
//               style={heroStyles.primaryButton}
//               onMouseOver={(e) => {
//                 e.target.style.transform = 'translateY(-3px)';
//                 e.target.style.boxShadow = '0 15px 35px rgba(255, 107, 53, 0.4)';
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.transform = 'translateY(0)';
//                 e.target.style.boxShadow = 'none';
//               }}
//             >
//               Get Started Today
//               <ArrowRight size={20} />
//             </button>
//             <button 
//               style={heroStyles.secondaryButton}
//               onMouseOver={(e) => {
//                 e.target.style.background = 'rgba(255, 255, 255, 0.2)';
//                 e.target.style.borderColor = '#FF6B35';
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.background = 'rgba(255, 255, 255, 0.1)';
//                 e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
//               }}
//             >
//               <Play size={20} />
//               Watch Demo
//             </button>
//           </div>
//         </div>

//         <div style={heroStyles.visualContainer}>
//           <div style={heroStyles.carouselContainer}>
//             {heroImages.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Quality Inspection ${index + 1}`}
//                 style={{
//                   ...heroStyles.heroImage,
//                   ...(index === currentImageIndex ? heroStyles.heroImageActive : {})
//                 }}
//               />
//             ))}
            
//             {/* Carousel Indicators */}
//             <div style={heroStyles.carouselIndicators}>
//               {heroImages.map((_, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     ...heroStyles.indicator,
//                     ...(index === currentImageIndex ? heroStyles.indicatorActive : {})
//                   }}
//                   onClick={() => handleIndicatorClick(index)}
//                 />
//               ))}
//             </div>
//           </div>
          
//           {/* <div style={heroStyles.statsContainer}>
//             <div style={heroStyles.statsGrid}>
//               {stats.map((stat, index) => (
//                 <div key={index}>
//                   <div style={heroStyles.statNumber}>{stat.number}</div>
//                   <div style={heroStyles.statLabel}>{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Play } from 'lucide-react';
import HeroPage1 from '../assets/HeroPage1.png';
import HeroPage2 from '../assets/HeroPage2.png';
import HeroPage3 from '../assets/HeroPage3.png';
import HeroPage4 from '../assets/HeroPage4.png';
import HeroPage5 from '../assets/HeroPage5.png';
import Globe1 from '../assets/Globe1.png';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of your hero images
  const heroImages = [HeroPage1, HeroPage2, HeroPage3, HeroPage4, HeroPage5];

  // Auto-advance images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const stats = [
    { number: '1000+', label: 'Global Inspectors' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '50+', label: 'Countries Covered' },
    { number: '24/7', label: 'Platform Support' }
  ];

  const features = [
    "Raise Inspection query",
    "Choose the best quote", 
    "Better transparency and reporting of cargo",
    "Reach out to global inspectors",
    "AI based suggestions for quality of cargo",
    "Market analytics tool with AI based insights for your trade decisions"
  ];

  const heroStyles = {
    hero: {
      background: '#1A1A1A',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px'
    },
    globeBackground: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${Globe1})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: '0.2',
      zIndex: 1,
      transition: 'opacity 2s ease-in-out, transform 3s ease-in-out'
    },
    heroBackground: {
      position: 'absolute',
      top: '-20%',
      right: '-20%',
      width: '120%',
      height: '140%',
      background: 'radial-gradient(circle at center, rgba(108, 92, 231, 0.3) 0%, rgba(108, 92, 231, 0.15) 40%, transparent 70%)',
      animation: 'float 20s ease-in-out infinite',
      zIndex: 2,
      transition: 'all 3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    heroBackgroundSecondary: {
      position: 'absolute',
      bottom: '-20%',
      left: '-20%',
      width: '120%',
      height: '140%',
      background: 'radial-gradient(circle at center, rgba(255, 107, 53, 0.3) 0%, rgba(255, 107, 53, 0.15) 40%, transparent 70%)',
      animation: 'float 25s ease-in-out infinite reverse',
      zIndex: 2,
      transition: 'all 3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'center',
      position: 'relative',
      zIndex: 15
    },
    heroText: {
      color: '#FFFFFF'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.2), rgba(255, 107, 53, 0.2))',
      backdropFilter: 'blur(10px)',
      borderRadius: '25px',
      padding: '0.75rem 1.5rem',
      marginBottom: '2rem',
      border: '1px solid rgba(255, 107, 53, 0.3)',
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#FF6B35'
    },
    title: {
      fontSize: '4rem',
      fontWeight: '900',
      lineHeight: '1.1',
      marginBottom: '2rem',
      color: '#FFFFFF'
    },
    highlight: {
      background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    description: {
      fontSize: '1.25rem',
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '2rem',
      fontWeight: '400',
      lineHeight: '1.6'
    },
    featureList: {
      listStyle: 'none',
      marginBottom: '3rem',
      padding: 0
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
      color: '#FFFFFF',
      fontWeight: '500'
    },
    featureIcon: {
      width: '28px',
      height: '28px',
      background: 'linear-gradient(135deg, #FF6B35, #FD79A8)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      color: 'white',
      fontSize: '0.8rem'
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '30px',
      textDecoration: 'none',
      fontWeight: '600',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem'
    },
    secondaryButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '30px',
      textDecoration: 'none',
      fontWeight: '600',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      fontSize: '1rem'
    },
    visualContainer: {
      position: 'relative'
    },
    carouselContainer: {
      position: 'relative',
      width: '100%',
      height: '500px',
      borderRadius: '25px',
      overflow: 'hidden',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
    },
    heroImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'opacity 1s ease-in-out',
      opacity: 0
    },
    heroImageActive: {
      opacity: 1
    },
    carouselIndicators: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '10px',
      zIndex: 10
    },
    indicator: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.4)',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    indicatorActive: {
      background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
      transform: 'scale(1.2)'
    },
    statsContainer: {
      position: 'absolute',
      bottom: '-30px',
      left: '-30px',
      background: 'rgba(26, 26, 26, 0.9)',
      backdropFilter: 'blur(20px)',
      padding: '2rem',
      borderRadius: '20px',
      border: '1px solid rgba(255, 107, 53, 0.2)'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1.5rem',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    statLabel: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.9rem',
      fontWeight: '500'
    }
  };

  // Add keyframes and responsive styles with enhanced background transitions
  useEffect(() => {
    if (!document.querySelector('#hero-styles')) {
      const styles = `
        @keyframes float {
          0% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.3;
          }
          25% { 
            transform: translate(-30px, -20px) rotate(90deg);
            opacity: 0.5;
          }
          50% { 
            transform: translate(-50px, -40px) rotate(180deg);
            opacity: 0.3;
          }
          75% { 
            transform: translate(30px, -20px) rotate(270deg);
            opacity: 0.5;
          }
          100% { 
            transform: translate(0, 0) rotate(360deg);
            opacity: 0.3;
          }
        }
        
        @keyframes floatReverse {
          0% { 
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          25% { 
            transform: translate(25px, 30px) rotate(-90deg) scale(1.1);
            opacity: 0.5;
          }
          50% { 
            transform: translate(50px, 30px) rotate(-180deg) scale(1);
            opacity: 0.3;
          }
          75% { 
            transform: translate(-25px, 30px) rotate(-270deg) scale(0.9);
            opacity: 0.5;
          }
          100% { 
            transform: translate(0, 0) rotate(-360deg) scale(1);
            opacity: 0.3;
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            filter: blur(0px) brightness(1);
          }
          50% {
            filter: blur(2px) brightness(1.2);
          }
        }

        @keyframes subtleShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 15;
          transition: all 0.3s ease;
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 2rem;
          color: #FFFFFF;
          transition: all 0.3s ease;
        }

        .hero-background-enhanced {
          animation: float 20s ease-in-out infinite, pulseGlow 8s ease-in-out infinite;
        }

        .hero-background-secondary-enhanced {
          animation: floatReverse 25s ease-in-out infinite, pulseGlow 12s ease-in-out infinite;
        }

        .globe-background-enhanced {
          animation: subtleShift 30s ease-in-out infinite;
          transition: opacity 2s ease-in-out, transform 3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (max-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
            padding: 1rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .stats-container {
            position: static !important;
            margin-top: 2rem;
          }
        }
      `;
      const style = document.createElement('style');
      style.id = 'hero-styles';
      style.textContent = styles;
      document.head.appendChild(style);
    }
  }, []);

  const handleIndicatorClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section style={heroStyles.hero} id="home">
      <div 
        style={heroStyles.globeBackground}
        className="globe-background-enhanced"
      ></div>
      <div 
        style={heroStyles.heroBackground}
        className="hero-background-enhanced"
      ></div>
      <div 
        style={heroStyles.heroBackgroundSecondary}
        className="hero-background-secondary-enhanced"
      ></div>
      
      <div className="hero-container">
        <div style={heroStyles.heroText}>
          
          <h1 className="hero-title">
            Global <span style={heroStyles.highlight}>Quality Inspections</span> For Global Trade
          </h1>

          <p style={heroStyles.description}>
            Global Quality Inspections solved at one platform. Quality.AI is a marketplace for global quality inspections bringing together global traders and inspectors worldwide.
          </p>

          <ul style={heroStyles.featureList}>
            {features.map((feature, index) => (
              <li key={index} style={heroStyles.featureItem}>
                <div style={heroStyles.featureIcon}>
                  <CheckCircle size={16} />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div style={heroStyles.buttonContainer}>
            <button 
              style={heroStyles.primaryButton}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 15px 35px rgba(255, 107, 53, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Get Started Today
              <ArrowRight size={20} />
            </button>
            <button 
              style={heroStyles.secondaryButton}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.borderColor = '#FF6B35';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <Play size={20} />
              Watch Demo
            </button>
            <div style={heroStyles.badge}>
            🌍 Global Quality Inspections Marketplace
          </div>

          </div>
        </div>

        <div style={heroStyles.visualContainer}>
          <div style={heroStyles.carouselContainer}>
            {heroImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Quality Inspection ${index + 1}`}
                style={{
                  ...heroStyles.heroImage,
                  ...(index === currentImageIndex ? heroStyles.heroImageActive : {})
                }}
              />
            ))}
            
            {/* Carousel Indicators */}
            <div style={heroStyles.carouselIndicators}>
              {heroImages.map((_, index) => (
                <div
                  key={index}
                  style={{
                    ...heroStyles.indicator,
                    ...(index === currentImageIndex ? heroStyles.indicatorActive : {})
                  }}
                  onClick={() => handleIndicatorClick(index)}
                />
              ))}
            </div>
          </div>
          
          {/* <div className="stats-container" style={heroStyles.statsContainer}>
            <div style={heroStyles.statsGrid}>
              {stats.map((stat, index) => (
                <div key={index}>
                  <div style={heroStyles.statNumber}>{stat.number}</div>
                  <div style={heroStyles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;