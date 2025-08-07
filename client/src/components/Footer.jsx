


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


import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Services",
      links: [
        "Pre-Production Inspection",
        "During Production Inspection", 
        "Pre-Shipment Inspection",
        "Container Loading Inspection"
      ]
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Our Team",
        "Careers",
        "Contact"
      ]
    },
    {
      title: "Resources",
      links: [
        "Documentation",
        "Help Center",
        "Privacy Policy",
        "Terms of Service"
      ]
    }
  ];

  const footerStyles = {
    footer: {
      background: '#1A1A1A',
      color: '#FFFFFF',
      padding: '4rem 2rem 2rem'
    },
    footerContent: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: '3rem',
      marginBottom: '3rem'
    },
    footerBrand: {
      maxWidth: '400px'
    },
    brandLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '2rem'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: 'bold'
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    brandDescription: {
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: '2rem',
      lineHeight: '1.6',
      fontSize: '1rem'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1rem',
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease'
    },
    contactIcon: {
      color: '#FF6B35',
      flexShrink: 0
    },
    footerSection: {
      
    },
    sectionTitle: {
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: '#FFFFFF',
      fontSize: '1.1rem'
    },
    sectionList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    sectionListItem: {
      marginBottom: '0.75rem'
    },
    sectionLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      fontSize: '0.95rem',
      position: 'relative'
    },
    footerBottom: {
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    copyright: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '0.9rem'
    },
    footerLinks: {
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap'
    },
    footerLink: {
      color: 'rgba(255, 255, 255, 0.5)',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      fontSize: '0.9rem'
    },
    // Responsive styles
    '@media (max-width: 768px)': {
      footerGrid: {
        gridTemplateColumns: '1fr',
        gap: '2rem'
      },
      footerBottom: {
        flexDirection: 'column',
        textAlign: 'center',
        gap: '1rem'
      },
      footerLinks: {
        justifyContent: 'center'
      }
    }
  };

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.footerContent}>
        <div style={footerStyles.footerGrid}>
          <div style={footerStyles.footerBrand}>
            <div style={footerStyles.brandLogo}>
              <div style={footerStyles.logoIcon}>Q</div>
              <span style={footerStyles.logoText}>Quality.AI</span>
            </div>
            <p style={footerStyles.brandDescription}>
              The leading global marketplace for quality inspections, connecting traders with certified inspection professionals worldwide.
            </p>
            
            <div>
              <div 
                style={footerStyles.contactItem}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#FF6B35';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <Phone size={16} style={footerStyles.contactIcon} />
                <span>+91 903 546 2042</span>
              </div>
              <div 
                style={footerStyles.contactItem}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#FF6B35';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <Mail size={16} style={footerStyles.contactIcon} />
                <span>support@quality.ai</span>
              </div>
              <div 
                style={footerStyles.contactItem}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#FF6B35';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <MapPin size={16} style={footerStyles.contactIcon} />
                <span>
                  WeWork-Vaishnavi Signatures<br />
                  Bellandur, Bangalore, 560103
                </span>
              </div>
            </div>
          </div>

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
                        e.target.style.color = '#FF6B35';
                        e.target.style.transform = 'translateX(5px)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                        e.target.style.transform = 'translateX(0)';
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
          <p style={footerStyles.copyright}>
            © 2024 Quality.AI. All rights reserved.
          </p>
          <div style={footerStyles.footerLinks}>
            <a 
              href="#" 
              style={footerStyles.footerLink}
              onMouseOver={(e) => e.target.style.color = '#FF6B35'}
              onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              style={footerStyles.footerLink}
              onMouseOver={(e) => e.target.style.color = '#FF6B35'}
              onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              style={footerStyles.footerLink}
              onMouseOver={(e) => e.target.style.color = '#FF6B35'}
              onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;