
// import React, { useState } from 'react';
// import { 
//   Leaf, 
//   Menu, 
//   X, 
//   LogOut, 
//   ArrowRight, 
//   Play, 
//   CheckCircle, 
//   BarChart3, 
//   Shield, 
//   Zap, 
//   Search, 
//   FileText, 
//   Settings, 
//   Rocket,
//   Star,
//   Quote,
//   ChevronLeft,
//   ChevronRight,
//   Mail,
//   Phone,
//   MapPin,
//   Clock,
//   Send,
//   User,
//   Award,
//   Eye,
//   EyeOff,
//   Calendar,
//   MessageCircle,
//   CreditCard,
//   Users,
//   Target,
//   TrendingUp
// } from 'lucide-react';

// // Mock Users Data
// const mockUsers = [
//   { id: 1, email: 'customer@test.com', password: 'password', role: 'customer', name: 'John Doe' },
//   { id: 2, email: 'inspector@test.com', password: 'password', role: 'inspector', name: 'Jane Smith' }
// ];

// // Header Component with Enhanced Design
// const Header = ({ user, onLogout, onAuthClick }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-100">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
//               <Leaf className="h-6 w-6 text-white" />
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
//               Qualty.AI
//             </span>
//           </div>

//           <nav className="hidden lg:flex items-center space-x-8">
//             <a href="#home" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
//               Home
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
//             </a>
//             <a href="#services" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
//               Services
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
//             </a>
//             {/* <a href="#about" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
//               About
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
//             </a> */}
//             <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
//               Contact
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
//             </a>

//             {user ? (
//               <div className="flex items-center space-x-4">
//                 <span className="text-gray-600 font-medium">Welcome, {user.name}</span>
//                 <button
//                   onClick={onLogout}
//                   className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={onAuthClick}
//                 className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
//               >
//                 Login/SignUp
//               </button>
//             )}
//           </nav>

//           <button
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? (
//               <X className="h-6 w-6 text-gray-700" />
//             ) : (
//               <Menu className="h-6 w-6 text-gray-700" />
//             )}
//           </button>
//         </div>

//         {isMenuOpen && (
//           <div className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-blue-100 rounded-b-xl shadow-lg">
//             <div className="px-4 py-4 space-y-2">
//               <a href="#home" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">Home</a>
//               <a href="#services" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">Services</a>
//               <a href="#about" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">About</a>
//               <a href="#contact" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">Contact</a>
//               {user ? (
//                 <button
//                   onClick={onLogout}
//                   className="w-full text-left px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 font-medium transition-all duration-300 shadow-lg"
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <button
//                   onClick={onAuthClick}
//                   className="w-full text-left px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-medium transition-all duration-300 shadow-lg"
//                 >
//                   Login/SignUp
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };
// export default Header;import React, { useState } from 'react';

import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import QualtyLogo from '../assets/QualtyLogo.png';

const Header = ({ user, onLogout, onAuthClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerStyles = {
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'transparent',
      backdropFilter: 'blur(10px)',
      padding: '1rem 0',
      transition: 'all 0.3s ease',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: '70px',
      position: 'relative'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      height: '70px',
      flexShrink: 0,
      zIndex: 10
    },
    logoIcon: {
      width: '60px',
      height: '60px',
      background: 'none',
      backgroundColor: 'transparent',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '900',
      color: 'white',
      fontSize: '1.2rem',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
      overflow: 'hidden',
      flexShrink: 0,
      border: 'none',
      boxShadow: 'none'
    },
    logoImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      display: 'block',
      backgroundColor: 'transparent'
    },
    logoText: {
      fontSize: '1.8rem',
      fontWeight: '800',
      background: 'white',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
      letterSpacing: '-0.02em',
      lineHeight: '1',
      display: 'flex',
      alignItems: 'center',
      margin: '0',
      whiteSpace: 'nowrap',
      flexShrink: 0
    },
    nav: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
      flexShrink: 0
    },
    navLink: {
      color: '#FFFFFF',
      textDecoration: 'none',
      fontWeight: '600',
      position: 'relative',
      transition: 'all 0.3s ease',
      padding: '1rem 0.75rem',
      fontSize: '1.1rem',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      whiteSpace: 'nowrap'
    },
    ctaButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      padding: '0.8rem 1.6rem',
      borderRadius: '20px',
      textDecoration: 'none',
      fontWeight: '700',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      cursor: 'pointer',
      backdropFilter: 'blur(10px)',
      fontSize: '1rem',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      marginLeft: '1rem',
      whiteSpace: 'nowrap',
      flexShrink: 0
    },
    logoutButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      padding: '0.8rem 1.4rem',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      fontWeight: '700',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      fontSize: '1rem',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      whiteSpace: 'nowrap',
      flexShrink: 0
    },
    userWelcome: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontWeight: '600',
      marginRight: '1rem',
      fontSize: '1rem',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      maxWidth: '150px',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    userContainer: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '1rem',
      flexShrink: 0
    },
    mobileMenuButton: {
      display: 'none',
      padding: '0.75rem',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#FFFFFF',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      flexShrink: 0
    },
    mobileMenu: {
      display: 'none',
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '0 0 20px 20px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      zIndex: 999
    },
    mobileMenuContent: {
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    mobileNavLink: {
      color: '#FFFFFF',
      textDecoration: 'none',
      padding: '1rem 1.25rem',
      borderRadius: '12px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      fontSize: '1.1rem',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    mobileCTAButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      fontSize: '1.1rem',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      marginTop: '0.5rem'
    }
  };

  const NavLink = ({ href, children, onClick }) => (
    <a
      href={href}
      onClick={onClick}
      style={headerStyles.navLink}
      onMouseOver={(e) => {
        e.target.style.color = '#CCCCCC';
        e.target.style.transform = 'translateY(-1px)';
      }}
      onMouseOut={(e) => {
        e.target.style.color = '#FFFFFF';
        e.target.style.transform = 'translateY(0)';
      }}
    >
      {children}
      <span
        style={{
          position: 'absolute',
          bottom: '-5px',
          left: '0.75rem',
          right: '0.75rem',
          height: '2px',
          background: 'linear-gradient(135deg, #FFFFFF, #CCCCCC)',
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.3s ease'
        }}
      />
    </a>
  );

  // Add responsive styles
  React.useEffect(() => {
    if (!document.querySelector('#header-responsive-styles')) {
      const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap');
        
        @media (max-width: 1200px) {
          .header-nav {
            gap: 1rem !important;
          }
          .header-nav a {
            font-size: 0.9rem !important;
            padding: 0.75rem 0.25rem !important;
          }
        }
        
        @media (max-width: 1024px) {
          .header-nav {
            display: none !important;
          }
          .mobile-menu-button {
            display: block !important;
          }
        }
        
        @media (max-width: 768px) {
          .header-content {
            padding: 0 1rem !important;
          }
          .user-welcome {
            display: none !important;
          }
          .logo-text {
            font-size: 1.2rem !important;
          }
          .logo-icon {
            width: 45px !important;
            height: 45px !important;
          }
        }
        
        @media (max-width: 480px) {
          .header-content {
            padding: 0 0.75rem !important;
          }
          .logo-text {
            display: none !important;
          }
        }
        
        .mobile-menu.open {
          display: block !important;
        }
        
        .nav-link:hover span {
          transform: scaleX(1) !important;
        }
      `;
      const style = document.createElement('style');
      style.id = 'header-responsive-styles';
      style.textContent = styles;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <header style={headerStyles.header}>
      <div style={headerStyles.headerContent} className="header-content">
        <div style={headerStyles.logo} className="header-logo">
          <div style={headerStyles.logoIcon} className="logo-icon">
            <img src={QualtyLogo} alt="Qualty.AI Logo" style={headerStyles.logoImage} />
          </div>
          <span style={headerStyles.logoText} className="logo-text">Qualty.AI</span>
        </div>

        <nav style={headerStyles.nav} className="header-nav">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>

          {user ? (
            <div style={headerStyles.userContainer}>
              <span style={headerStyles.userWelcome} className="user-welcome">
                Welcome, {user.name}
              </span>
              <button
                onClick={onLogout}
                style={headerStyles.logoutButton}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              style={headerStyles.ctaButton}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Login/SignUp
            </button>
          )}
        </nav>

        <button
          style={headerStyles.mobileMenuButton}
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div 
        style={{
          ...headerStyles.mobileMenu,
          display: isMenuOpen ? 'block' : 'none'
        }}
        className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
      >
        <div style={headerStyles.mobileMenuContent}>
          <a
            href="#home"
            style={headerStyles.mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.color = '#CCCCCC';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.target.style.color = '#FFFFFF';
            }}
          >
            Home
          </a>
          <a
            href="#services"
            style={headerStyles.mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.color = '#CCCCCC';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.target.style.color = '#FFFFFF';
            }}
          >
            Services
          </a>
          <a
            href="#about"
            style={headerStyles.mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.color = '#CCCCCC';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.target.style.color = '#FFFFFF';
            }}
          >
            About
          </a>
          <a
            href="#contact"
            style={headerStyles.mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.color = '#CCCCCC';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.target.style.color = '#FFFFFF';
            }}
          >
            Contact
          </a>
          
          {user ? (
            <button
              onClick={() => {
                onLogout();
                setIsMenuOpen(false);
              }}
              style={{
                ...headerStyles.logoutButton,
                width: '100%',
                justifyContent: 'center'
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                onAuthClick();
                setIsMenuOpen(false);
              }}
              style={headerStyles.mobileCTAButton}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Login/SignUp
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;