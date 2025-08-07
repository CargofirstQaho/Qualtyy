// import React from 'react';
// import { CheckCircle, ArrowRight, Play } from 'lucide-react';
// import { Leaf } from 'lucide-react';


// const Hero = () => {
//   const stats = [
//     { number: '1000+', label: 'Global Inspectors' },
//     { number: '98%', label: 'Client Satisfaction' },
//     { number: '50+', label: 'Countries Covered' },
//     { number: '24/7', label: 'Platform Support' }
//   ];

//   const features = [
//     "-Raise Inspection query ",
//     "-Choose the best quote ", 
//     "-Better transperancy and reporting of cargo ",
//     "-Reachout to global inspectors ",
//     "-Ai based suggestions for quality of cargo ",
//     "-Market analytics tool with Ai based insights for your trade decisions"
//   ];

//   return (
//     <section id="home" className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16 min-h-screen flex items-center relative overflow-hidden">
//       <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full blur-3xl"></div>
      
//       <div className="w-full px-6 lg:px-12 xl:px-16 py-20 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           <div className="space-y-8">
//             <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-3 border border-blue-200 shadow-sm">
//               <span className="text-blue-700 text-sm font-semibold">🌍 Global Quality Inspections Marketplace</span>
//             </div>

//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
//               Find the <span className="relative">
//                 <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">best surveyors</span>
//                 {/* <div className="absolute -bottom-3 left-0 w-full h-4 bg-gradient-to-r from-yellow-300 to-orange-300 -z-10 transform rotate-1 rounded-full"></div> */}
//               </span> for quality inspections and all global commodity trade needs
//             </h1>

//             <p className="text-xl text-gray-600 max-w-xl leading-relaxed font-medium">
//               Global Quality Inspections solved at one platform. Quality.AI is a marketplace for global quality inspections bringing together global traders and inspectors worldwide.
//             </p>

//             <div className="space-y-4">
//               {features.map((feature, index) => (
//                 <div key={index} className="flex items-center space-x-4 group">
//                   <div className="w-7 h-7 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
//                     <CheckCircle className="h-4 w-4 text-white" />
//                   </div>
//                   <span className="text-gray-700 font-medium">{feature}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center group shadow-xl hover:shadow-2xl transform hover:scale-105">
//                 Get Started Today
//                 <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
//               </button>
//               <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl">
//                 <Play className="mr-2 h-5 w-5 group-hover:text-blue-600" />
//                 Watch Demo
//               </button>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
//               {stats.map((stat, index) => (
//                 <div key={index} className="text-center group">
//                   <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
//                   <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="relative">
//             <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200 shadow-2xl transform hover:scale-105 transition-transform duration-500">
//               <img
//                 src="https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
//                 alt="Quality Inspection"
//                 className="rounded-2xl w-full h-[400px] object-cover shadow-lg"
//               />
//               <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 rounded-2xl shadow-2xl">
//                 <div className="text-2xl font-bold">Global</div>
//                 <div className="text-sm text-blue-100">Inspections</div>
//               </div>
//             </div>
//             <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-60 blur-2xl"></div>
//             <div className="absolute -bottom-8 right-8 w-40 h-40 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full opacity-40 blur-3xl"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


// export default Hero;



import React from 'react';
import { CheckCircle, ArrowRight, Play } from 'lucide-react';

const Hero = () => {
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
    heroBackground: {
      position: 'absolute',
      top: '-50%',
      right: '-50%',
      width: '100%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(108, 92, 231, 0.1) 0%, transparent 70%)',
      animation: 'float 20s ease-in-out infinite'
    },
    heroBackgroundSecondary: {
      position: 'absolute',
      bottom: '-50%',
      left: '-50%',
      width: '100%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)',
      animation: 'float 25s ease-in-out infinite reverse'
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
      zIndex: 10
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
    heroImage: {
      width: '100%',
      height: '500px',
      objectFit: 'cover',
      borderRadius: '25px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
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
    },
    // Responsive styles
    '@media (max-width: 768px)': {
      container: {
        gridTemplateColumns: '1fr',
        gap: '3rem',
        textAlign: 'center',
        padding: '1rem'
      },
      title: {
        fontSize: '2.5rem'
      },
      statsContainer: {
        position: 'static',
        marginTop: '2rem'
      }
    }
  };

  // Add keyframes for animations
  const styleSheet = document.styleSheets[0];
  if (styleSheet && !document.querySelector('#hero-animations')) {
    const keyframes = `
      @keyframes float {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        33% { transform: translate(-30px, -30px) rotate(120deg); }
        66% { transform: translate(30px, -20px) rotate(240deg); }
      }
    `;
    const style = document.createElement('style');
    style.id = 'hero-animations';
    style.textContent = keyframes;
    document.head.appendChild(style);
  }

  return (
    <section style={heroStyles.hero} id="home">
      <div style={heroStyles.heroBackground}></div>
      <div style={heroStyles.heroBackgroundSecondary}></div>
      
      <div style={heroStyles.container}>
        <div style={heroStyles.heroText}>
          <div style={heroStyles.badge}>
            🌍 Global Quality Inspections Marketplace
          </div>

          <h1 style={heroStyles.title}>
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
          </div>
        </div>

        <div style={heroStyles.visualContainer}>
          <img
            src="https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
            alt="Quality Inspection"
            style={heroStyles.heroImage}
          />
          
          {/* <div style={heroStyles.statsContainer}>
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