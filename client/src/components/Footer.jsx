


// import React from 'react';
// import { Mail, Phone, MapPin } from 'lucide-react';

// const Footer = () => {
//   const footerSections = [
//     {
//       title: "Services",
//       links: [
//         "Pre-Production Inspection",
//         "During Production Inspection", 
//         "Pre-Shipment Inspection",
//         "Container Loading Inspection"
//       ]
//     },
//     {
//       title: "Company",
//       links: [
//         "About Us",
//         "Our Team",
//         "Careers",
//         "Contact"
//       ]
//     },
//     {
//       title: "Resources",
//       links: [
//         "Documentation",
//         "Help Center",
//         "Privacy Policy",
//         "Terms of Service"
//       ]
//     }
//   ];

//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="w-full px-6 lg:px-12 xl:px-16 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
//           <div className="lg:col-span-2">
//             <div className="flex items-center space-x-2 mb-6">
//               <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
//                 <span className="text-gray-900 text-sm font-bold">Q</span>
//               </div>
//               <span className="text-xl font-semibold tracking-tight">Quality.AI</span>
//             </div>
//             <p className="text-gray-400 mb-6 font-light leading-relaxed max-w-md">
//               The leading global marketplace for quality inspections, connecting traders with certified inspection professionals worldwide.
//             </p>
//             <div className="space-y-3">
//               <div className="flex items-center space-x-3">
//                 <Phone className="h-4 w-4 text-gray-400" />
//                 <span className="text-gray-400 text-sm font-light">+91 807 360 2055</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Mail className="h-4 w-4 text-gray-400" />
//                 <span className="text-gray-400 text-sm font-light">support@quality.ai</span>
//               </div>
//               <div className="flex items-start space-x-3">
//                 <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
//                 <span className="text-gray-400 text-sm font-light">
//                   WeWork-Vaishnavi Signatures<br />
//                   Bellandur, Bangalore, 560103
//                 </span>
//               </div>
//             </div>
//           </div>

//           {footerSections.map((section, index) => (
//             <div key={index}>
//               <h3 className="font-medium text-white mb-4 text-sm tracking-wide">{section.title}</h3>
//               <ul className="space-y-3">
//                 {section.links.map((link, linkIndex) => (
//                   <li key={linkIndex}>
//                     <a 
//                       href="#" 
//                       className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light"
//                     >
//                       {link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         <div className="border-t border-gray-800 mt-12 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 text-sm font-light">
//               © 2024 Quality.AI. All rights reserved.
//             </p>
//             <div className="flex space-x-8 mt-4 md:mt-0">
//               <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light">
//                 Privacy Policy
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light">
//                 Terms of Service
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-light">
//                 Cookie Policy
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// import React from 'react';
// import { Mail, Phone, MapPin } from 'lucide-react';

// const Footer = () => {
//   const footerSections = [
//     {
//       title: "Services",
//       links: [
//         "Pre-Production Inspection",
//         "During Production Inspection", 
//         "Pre-Shipment Inspection",
//         "Container Loading Inspection"
//       ]
//     },
//     {
//       title: "Company",
//       links: [
//         "About Us",
//         "Our Team",
//         "Careers",
//         "Contact"
//       ]
//     },
//     {
//       title: "Resources",
//       links: [
//         "Documentation",
//         "Help Center",
//         "Privacy Policy",
//         "Terms of Service"
//       ]
//     }
//   ];

//   const footerStyles = {
//     footer: {
//       background: '#1A1A1A',
//       color: '#FFFFFF',
//       padding: '4rem 2rem 2rem'
//     },
//     footerContent: {
//       maxWidth: '1400px',
//       margin: '0 auto'
//     },
//     footerGrid: {
//       display: 'grid',
//       gridTemplateColumns: '2fr 1fr 1fr 1fr',
//       gap: '3rem',
//       marginBottom: '3rem'
//     },
//     footerBrand: {
//       maxWidth: '400px'
//     },
//     brandLogo: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem',
//       marginBottom: '2rem'
//     },
//     logoIcon: {
//       width: '40px',
//       height: '40px',
//       background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
//       borderRadius: '10px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       color: 'white',
//       fontSize: '1.2rem',
//       fontWeight: 'bold'
//     },
//     logoText: {
//       fontSize: '1.5rem',
//       fontWeight: '700',
//       background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text'
//     },
//     brandDescription: {
//       color: 'rgba(255, 255, 255, 0.7)',
//       marginBottom: '2rem',
//       lineHeight: '1.6',
//       fontSize: '1rem'
//     },
//     contactItem: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem',
//       marginBottom: '1rem',
//       color: 'rgba(255, 255, 255, 0.7)',
//       fontSize: '0.95rem',
//       transition: 'all 0.3s ease'
//     },
//     contactIcon: {
//       color: '#FF6B35',
//       flexShrink: 0
//     },
//     footerSection: {
      
//     },
//     sectionTitle: {
//       fontWeight: '600',
//       marginBottom: '1.5rem',
//       color: '#FFFFFF',
//       fontSize: '1.1rem'
//     },
//     sectionList: {
//       listStyle: 'none',
//       padding: 0,
//       margin: 0
//     },
//     sectionListItem: {
//       marginBottom: '0.75rem'
//     },
//     sectionLink: {
//       color: 'rgba(255, 255, 255, 0.7)',
//       textDecoration: 'none',
//       transition: 'all 0.3s ease',
//       fontSize: '0.95rem',
//       position: 'relative'
//     },
//     footerBottom: {
//       borderTop: '1px solid rgba(255, 255, 255, 0.1)',
//       paddingTop: '2rem',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       flexWrap: 'wrap',
//       gap: '1rem'
//     },
//     copyright: {
//       color: 'rgba(255, 255, 255, 0.5)',
//       fontSize: '0.9rem'
//     },
//     footerLinks: {
//       display: 'flex',
//       gap: '2rem',
//       flexWrap: 'wrap'
//     },
//     footerLink: {
//       color: 'rgba(255, 255, 255, 0.5)',
//       textDecoration: 'none',
//       transition: 'color 0.3s ease',
//       fontSize: '0.9rem'
//     },
//     // Responsive styles
//     '@media (max-width: 768px)': {
//       footerGrid: {
//         gridTemplateColumns: '1fr',
//         gap: '2rem'
//       },
//       footerBottom: {
//         flexDirection: 'column',
//         textAlign: 'center',
//         gap: '1rem'
//       },
//       footerLinks: {
//         justifyContent: 'center'
//       }
//     }
//   };

//   return (
//     <footer style={footerStyles.footer}>
//       <div style={footerStyles.footerContent}>
//         <div style={footerStyles.footerGrid}>
//           <div style={footerStyles.footerBrand}>
//             <div style={footerStyles.brandLogo}>
//               <div style={footerStyles.logoIcon}>Q</div>
//               <span style={footerStyles.logoText}>Quality.AI</span>
//             </div>
//             <p style={footerStyles.brandDescription}>
//               The leading global marketplace for quality inspections, connecting traders with certified inspection professionals worldwide.
//             </p>
            
//             <div>
//               <div 
//                 style={footerStyles.contactItem}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.color = '#FF6B35';
//                   e.currentTarget.style.transform = 'translateX(5px)';
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
//                   e.currentTarget.style.transform = 'translateX(0)';
//                 }}
//               >
//                 <Phone size={16} style={footerStyles.contactIcon} />
//                 <span>+91 903 546 2042</span>
//               </div>
//               <div 
//                 style={footerStyles.contactItem}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.color = '#FF6B35';
//                   e.currentTarget.style.transform = 'translateX(5px)';
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
//                   e.currentTarget.style.transform = 'translateX(0)';
//                 }}
//               >
//                 <Mail size={16} style={footerStyles.contactIcon} />
//                 <span>support@quality.ai</span>
//               </div>
//               <div 
//                 style={footerStyles.contactItem}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.color = '#FF6B35';
//                   e.currentTarget.style.transform = 'translateX(5px)';
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
//                   e.currentTarget.style.transform = 'translateX(0)';
//                 }}
//               >
//                 <MapPin size={16} style={footerStyles.contactIcon} />
//                 <span>
//                   WeWork-Vaishnavi Signatures<br />
//                   Bellandur, Bangalore, 560103
//                 </span>
//               </div>
//             </div>
//           </div>

//           {footerSections.map((section, index) => (
//             <div key={index} style={footerStyles.footerSection}>
//               <h4 style={footerStyles.sectionTitle}>{section.title}</h4>
//               <ul style={footerStyles.sectionList}>
//                 {section.links.map((link, linkIndex) => (
//                   <li key={linkIndex} style={footerStyles.sectionListItem}>
//                     <a 
//                       href="#" 
//                       style={footerStyles.sectionLink}
//                       onMouseOver={(e) => {
//                         e.target.style.color = '#FF6B35';
//                         e.target.style.transform = 'translateX(5px)';
//                       }}
//                       onMouseOut={(e) => {
//                         e.target.style.color = 'rgba(255, 255, 255, 0.7)';
//                         e.target.style.transform = 'translateX(0)';
//                       }}
//                     >
//                       {link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         <div style={footerStyles.footerBottom}>
//           <p style={footerStyles.copyright}>
//             © 2024 Quality.AI. All rights reserved.
//           </p>
//           <div style={footerStyles.footerLinks}>
//             <a 
//               href="#" 
//               style={footerStyles.footerLink}
//               onMouseOver={(e) => e.target.style.color = '#FF6B35'}
//               onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}
//             >
//               Privacy Policy
//             </a>
//             <a 
//               href="#" 
//               style={footerStyles.footerLink}
//               onMouseOver={(e) => e.target.style.color = '#FF6B35'}
//               onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}
//             >
//               Terms of Service
//             </a>
//             <a 
//               href="#" 
//               style={footerStyles.footerLink}
//               onMouseOver={(e) => e.target.style.color = '#FF6B35'}
//               onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}
//             >
//               Cookie Policy
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import React from 'react';
import { useState, useEffect } from 'react';
import { Linkedin } from 'lucide-react';
import QualtyAILogo from '../assets/QualtyAILogo.png'; // Assuming you have a logo image

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  const footerSections = [
    {
      title: "Company",
      links: [
        "Pre-Production Inspection",
        "During Production Inspection", 
        "Pre-Shipment Inspection",
        "Container Loading Inspection",
        "Factory Audit",
        "Supplier Verification"
      ]
    },
    {
      title: "For customers",
      links: [
        "Quality Reviews",
        "Inspectors near you",
        "Contact us",
        "Help Center",
        "Request Quote"
      ]
    },
    {
      title: "For professionals",
      links: [
        "Register as a professional",
        "Inspector Portal",
        "Certification Program",
        "Training Resources"
      ]
    },
    {
      title: "Social links",
      links: [
        "Twitter",
        "Facebook", 
        "Instagram",
        "LinkedIn"
      ]
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

  const footerStyles = {
    footer: {
      background: '#000000',
      borderTop: '1px solid rgba(40, 40, 40, 0.3)',
      color: '#FFFFFF',
      padding: isMobile ? '40px 0 30px 0' : '80px 0 60px 0',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    footerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: isMobile ? '0 1rem' : '0 2rem'
    },
    brandSection: {
      marginBottom: isMobile ? '30px' : '60px',
      textAlign: isMobile ? 'center' : 'left'
    },
    brandLogo: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: isMobile ? '8px' : '12px',
      marginBottom: '0'
    },
    logoIcon: {
      width: isMobile ? '60px' : '80px',
      height: isMobile ? '60px' : '80px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      overflow: 'hidden',
      transform: 'translateY(-4px)'
    },
    logoImage: {
      width: '100%',
      height: '100%',
      borderRadius: '8px',
      objectFit: 'cover',
      display: 'block'
    },
    logoText: {
      fontSize: isMobile ? '1.2rem' : '1.5rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #FFFFFF, #CCCCCC)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
      letterSpacing: '-0.02em',
      lineHeight: '1.2',
      margin: '0',
      padding: '0'
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '30px 20px' : '80px',
      marginBottom: isMobile ? '40px' : '80px'
    },
    footerSection: {
      
    },
    sectionTitle: {
      fontWeight: '700',
      marginBottom: isMobile ? '16px' : '32px',
      color: '#FFFFFF',
      fontSize: isMobile ? '1rem' : '1.3rem',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif'
    },
    sectionList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    sectionListItem: {
      marginBottom: isMobile ? '8px' : '16px'
    },
    sectionLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      fontSize: isMobile ? '0.85rem' : '1.1rem',
      position: 'relative',
      fontWeight: '500',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      lineHeight: isMobile ? '1.3' : '1.5'
    },
    footerBottom: {
      borderTop: '1px solid rgba(40, 40, 40, 0.3)',
      paddingTop: isMobile ? '20px' : '40px',
      textAlign: isMobile ? 'center' : 'left'
    },
    footerBottomText: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: isMobile ? '0.75rem' : '0.9rem',
      fontWeight: '400',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      lineHeight: '1.6',
      marginBottom: '8px'
    },
    copyright: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: isMobile ? '0.75rem' : '0.9rem',
      fontWeight: '400',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      lineHeight: '1.6'
    }
  };

  // Add Google Fonts import
  React.useEffect(() => {
    if (!document.querySelector('#footer-styles')) {
      const style = document.createElement('style');
      style.id = 'footer-styles';
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap');
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.footerContent}>
        <div style={footerStyles.brandSection}>
          <div style={footerStyles.brandLogo}>
            <div style={footerStyles.logoIcon}>
              <img 
                src={QualtyAILogo} 
                alt="Qualty.AI Logo" 
                style={footerStyles.logoImage}
              />
            </div>
            <span style={footerStyles.logoText}>Qualty.AI</span>
          </div>
        </div>

        <div style={footerStyles.footerGrid}>
          {footerSections.map((section, index) => (
            <div key={index} style={footerStyles.footerSection}>
              <h4 style={footerStyles.sectionTitle}>{section.title}</h4>
              <ul style={footerStyles.sectionList}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} style={footerStyles.sectionListItem}>
                    <a 
                      href="#" 
                      style={footerStyles.sectionLink}
                      onMouseOver={(e) => {
                        if (!isMobile) {
                          e.target.style.color = '#CCCCCC';
                          e.target.style.transform = 'translateX(5px)';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isMobile) {
                          e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                          e.target.style.transform = 'translateX(0)';
                        }
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={footerStyles.footerBottom}>
          <p style={footerStyles.footerBottomText}>
            * As on December 31, 2024
          </p>
          <p style={footerStyles.copyright}>
            © Copyright 2025 Quality.AI Ltd. (formerly known as QualityClap Technologies India Limited and QualityClap Technologies India India Limited) All rights reserved. | CIN: U74140DL2014PTC274413
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;