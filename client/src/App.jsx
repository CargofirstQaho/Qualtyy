

// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { ErrorBoundary } from 'react-error-boundary';
// import { QueryProvider } from './context/QueryContext';

// import Header from './components/Header';
// import Hero from './components/Hero';
// import Services from './components/Services';
// import Contact from './components/Contact';
// import Footer from './components/Footer';
// import AuthModal from './auth/AuthModal/AuthModal';
// import CustomerDashboard from './pages/dashboards/CustomerDashboard/CustomerDashboard';
// import InspectorDashboard from './pages/dashboards/InspectorDashboard/InspectorDashboard';
// import InspectionCompanyDashboard from './pages/dashboards/InspectionCompanyDashboard/InspectionCompanyDashboard';

// // Error Fallback Component
// function ErrorFallback({ error, resetErrorBoundary }) {
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div role="alert" className="max-w-md w-full p-6 bg-red-50 border border-red-200 rounded-lg shadow-lg">
//         <div className="flex items-center mb-4">
//           <div className="flex-shrink-0">
//             <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//           </div>
//           <div className="ml-3">
//             <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
//           </div>
//         </div>
        
//         <div className="mb-4">
//           <p className="text-red-700 text-sm mb-2">
//             An error occurred while loading the application. Please try refreshing the page.
//           </p>
//           <details className="mt-2">
//             <summary className="text-red-600 text-sm cursor-pointer hover:text-red-800">
//               View error details
//             </summary>
//             <pre className="text-red-600 text-xs mt-2 p-2 bg-red-100 rounded border max-h-32 overflow-y-auto">
//               {error.message}
//             </pre>
//           </details>
//         </div>
        
//         <div className="flex space-x-3">
//           <button 
//             onClick={resetErrorBoundary}
//             className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
//           >
//             Try Again
//           </button>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
//           >
//             Reload Page
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [currentView, setCurrentView] = useState('landing');

//   const { t, i18n } = useTranslation();

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   const handleLogin = (userData) => {
//     setUser(userData);
//     setCurrentView('dashboard');
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setCurrentView('landing');
//   };

//   // ✅ Language selector should always be visible
//   const LanguageSelector = () => (
//     <div className="flex justify-end px-4 py-3 bg-white shadow-md z-50">
//       <select
//         value={i18n.language}
//         onChange={(e) => changeLanguage(e.target.value)}
//         className="border border-gray-300 rounded px-3 py-2 text-sm text-black"
//         style={{ backgroundColor: 'white' }}
//       >
//         <optgroup label="🇮🇳 Indian Languages">
//           <option value="en">English</option>
//           <option value="hi">हिन्दी (Hindi)</option>
//           <option value="bn">বাংলা (Bengali)</option>
//           <option value="gu">ગુજરાતી (Gujarati)</option>
//         </optgroup>
//         <optgroup label="🌍 Foreign Languages">
//           <option value="fr">Français (French)</option>
//           <option value="es">Español (Spanish)</option>
//           <option value="vi">Tiếng Việt (Vietnamese)</option>
//         </optgroup>
//       </select>
//     </div>
//   );

//   // Dashboard component with QueryProvider wrapper
//   const DashboardWithProvider = () => (
//     <ErrorBoundary FallbackComponent={ErrorFallback}>
//       <QueryProvider>
//         {user.role === 'customer' ? (
//           <CustomerDashboard user={user} onLogout={handleLogout} />
//         ) : user.role === 'inspector' ? (
//           <InspectorDashboard user={user} onLogout={handleLogout} />
//         ) : user.role === 'inspection_company' ? (
//           <InspectionCompanyDashboard user={user} onLogout={handleLogout} />
//         ) : (
//           <CustomerDashboard user={user} onLogout={handleLogout} />
//         )}
//       </QueryProvider>
//     </ErrorBoundary>
//   );

//   // Landing page components with ErrorBoundary
//   const LandingPageWithProvider = () => (
//     <ErrorBoundary FallbackComponent={ErrorFallback}>
//       <Header
//         user={user}
//         onLogout={handleLogout}
//         onAuthClick={() => setShowAuthModal(true)}
//       />
//       <Hero />
//       <Services />
//       <Contact />
//       <Footer />
//       <AuthModal
//         isOpen={showAuthModal}
//         onClose={() => setShowAuthModal(false)}
//         onLogin={handleLogin}
//       />
//     </ErrorBoundary>
//   );

//   return (
//     <div className="min-h-screen">
//       {/* ✅ Always show language dropdown */}
//       <LanguageSelector />

//       {/* 🔁 Conditional Rendering with Error Boundaries */}
//       {currentView === 'dashboard' && user ? (
//         <DashboardWithProvider />
//       ) : (
//         <LandingPageWithProvider />
//       )}
//     </div>
//   );
// };

// export default App;

 import React, { useState } from "react";
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';


const App = () => {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        user={user} 
        onLogout={handleLogout} 
        onAuthClick={() => setShowAuth(true)} 
      />
      <Hero />
      <Services />
      {/* <About /> */}
      <Contact />
    </div>
  );
};

export default App;