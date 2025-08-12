
// import React, { useState } from "react";
// import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '', 
//     email: '', 
//     phone: '', 
//     company: '', 
//     service: '', 
//     message: ''
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitted(true);
//     setTimeout(() => setIsSubmitted(false), 3000);
//   };

//   const contactInfo = [
//     {
//       icon: <Phone className="h-6 w-6" />, 
//       title: "Phone",
//       details: ["+91 807 360 2055"],
//       description: "Call us for immediate assistance"
//     },
//     {
//       icon: <Mail className="h-6 w-6" />, 
//       title: "Email",
//       details: ["support@quality.ai"],
//       description: "Send us your questions anytime"
//     },
//     {
//       icon: <MapPin className="h-6 w-6" />, 
//       title: "Office",
//       details: ["WeWork-Vaishnavi Signatures", "Bellandur, Bangalore, 560103"],
//       description: "Visit our main office"
//     },
//     {
//       icon: <Clock className="h-6 w-6" />, 
//       title: "Hours",
//       details: ["Mon - Sat: 10:00 AM - 6:30 PM"],
//       description: "We're here to help"
//     }
//   ];

//   return (
//     <section id="contact" className="py-20 bg-white">
//       <div className="w-full px-6 lg:px-12 xl:px-16">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6 border border-gray-200">
//             <span className="text-gray-700 text-sm font-medium">Get In Touch</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             Ready to Start Your <span className="relative">
//               <span className="text-gray-900">Quality Inspection</span>
//               <div className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-200 -z-10 transform rotate-1"></div>
//             </span> Journey?
//           </h2>
//           <p className="text-xl text-gray-600 max-w-4xl mx-auto">
//             Contact our experts today to discuss your quality inspection needs and discover how Quality.AI 
//             can connect you with the best global inspectors for your cargo.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-12">
//           <div className="lg:col-span-1">
//             <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
//               <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
//               <div className="space-y-6">
//                 {contactInfo.map((info, index) => (
//                   <div key={index} className="flex items-start space-x-4 group">
//                     <div className="text-gray-600 mt-1 group-hover:text-gray-900 transition-colors duration-200">{info.icon}</div>
//                     <div>
//                       <h4 className="font-semibold text-gray-800 mb-1">{info.title}</h4>
//                       {info.details.map((detail, idx) => (
//                         <p key={idx} className="text-gray-600 text-sm">{detail}</p>
//                       ))}
//                       <p className="text-gray-400 text-xs mt-1">{info.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
//               <h3 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h3>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input 
//                       type="text" 
//                       id="name" 
//                       name="name" 
//                       value={formData.name} 
//                       onChange={handleChange} 
//                       required
//                       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
//                       placeholder="Your full name"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input 
//                       type="email" 
//                       id="email" 
//                       name="email" 
//                       value={formData.email} 
//                       onChange={handleChange} 
//                       required
//                       className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
//                       placeholder="your@email.com"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
//                   <textarea 
//                     id="message" 
//                     name="message" 
//                     value={formData.message} 
//                     onChange={handleChange} 
//                     required 
//                     rows={6}
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none text-gray-900 placeholder-gray-400 transition-all duration-200"
//                     placeholder="Tell us about your quality inspection needs and requirements..."
//                   />
//                 </div>

//                 <button 
//                   type="submit" 
//                   disabled={isSubmitted}
//                   className="w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 transform hover:scale-105"
//                 >
//                   {isSubmitted ? (
//                     <>
//                       <CheckCircle className="h-5 w-5" /> 
//                       <span>Message Sent!</span>
//                     </>
//                   ) : (
//                     <>
//                       <Send className="h-5 w-5" /> 
//                       <span>Send Message</span>
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default Contact;import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    phone: '', 
    company: '', 
    location: '',
    userType: '',
    message: '',
    additionalDetails: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />, 
      title: "Phone",
      details: ["+91 903 546 2042"],
      description: "Call us for immediate assistance"
    },
    {
      icon: <Mail size={24} />, 
      title: "Email",
      details: ["support@quality.ai"],
      description: "Send us your questions anytime"
    },
    {
      icon: <MapPin size={24} />, 
      title: "Office",
      details: ["WeWork-Vaishnavi Signature", "Bellandur, Bangalore, 560103"],
      description: "Visit our main office"
    },
    {
      icon: <Clock size={24} />, 
      title: "Hours",
      details: ["24/7 Support"],
      description: "We're here to help"
    }
  ];

  const contactStyles = {
    contact: {
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
      zIndex: 10
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
      padding: '1rem 2rem',
      borderRadius: '25px',
      fontWeight: '700',
      fontSize: '1.2rem',
      marginBottom: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    title: {
      fontSize: '5rem',
      fontWeight: '900',
      marginBottom: '2rem',
      color: '#FFFFFF',
      lineHeight: '1.1',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
      letterSpacing: '-0.03em'
    },
    highlight: {
      background: 'linear-gradient(135deg, #6C5CE7, #FF6B35)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    description: {
      fontSize: '1.4rem',
      color: 'rgba(255, 255, 255, 0.8)',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6',
      fontWeight: '500',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '3rem',
      marginTop: '4rem',
      alignItems: 'stretch'
    },
    contactInfo: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: '3rem',
      borderRadius: '25px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    infoTitle: {
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '2.5rem',
      color: '#FFFFFF',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
      letterSpacing: '-0.02em'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1.5rem',
      marginBottom: '2.5rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    contactIcon: {
      width: '60px',
      height: '60px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      flexShrink: 0,
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    contactDetails: {
      flex: 1
    },
    contactTitle: {
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: '#FFFFFF',
      fontSize: '1.3rem',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif'
    },
    contactText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1.1rem',
      lineHeight: '1.4',
      marginBottom: '0.5rem',
      fontWeight: '500',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    contactDescription: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '1rem',
      fontWeight: '500',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    contactForm: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: '3rem',
      borderRadius: '25px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      flexDirection: 'column'
    },
    formTitle: {
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '2.5rem',
      color: '#FFFFFF',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
      letterSpacing: '-0.02em'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.5rem'
    },
    label: {
      display: 'block',
      fontWeight: '700',
      marginBottom: '0.75rem',
      color: '#FFFFFF',
      fontSize: '1.1rem',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1.25rem',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#FFFFFF',
      height: '52px',
      boxSizing: 'border-box',
      fontWeight: '500'
    },
    select: {
      width: '100%',
      padding: '0.75rem 1.25rem',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#FFFFFF',
      height: '52px',
      boxSizing: 'border-box',
      cursor: 'pointer',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
      backgroundPosition: 'right 1rem center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '1rem',
      paddingRight: '3rem',
      fontWeight: '500'
    },
    textarea: {
      width: '100%',
      padding: '1rem 1.25rem',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      resize: 'vertical',
      minHeight: '120px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#FFFFFF',
      boxSizing: 'border-box',
      fontWeight: '500'
    },
    submitBtn: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#FFFFFF',
      padding: '1.3rem 3rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '30px',
      fontSize: '1.2rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      backdropFilter: 'blur(10px)',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    }
  };

  // Add keyframes for animations
  useEffect(() => {
    if (!document.querySelector('#contact-animations')) {
      const keyframes = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes pulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }
      `;
      const style = document.createElement('style');
      style.id = 'contact-animations';
      style.textContent = keyframes;
      document.head.appendChild(style);
    }
  }, []);

  const handleFocus = (e) => {
    e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
    e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <section style={contactStyles.contact} id="contact">
      <div style={contactStyles.backgroundEffect}></div>
      
      <div style={contactStyles.container}>
        <div style={contactStyles.sectionHeader}>
          <div style={contactStyles.badge}>Get In Touch</div>
          <h2 style={contactStyles.title}>
            Ready to Start Your{' '}
            <span >
              Quality Inspection
            </span>{' '}
            Journey?
          </h2>
          <p style={contactStyles.description}>
            Contact our experts today to discuss your quality inspection needs and discover how Quality.AI 
            can connect you with the best global inspectors for your cargo.
          </p>
        </div>

        <div style={contactStyles.contactGrid}>
          <div style={contactStyles.contactInfo}>
            <div>
              <h3 style={contactStyles.infoTitle}>Contact Information</h3>
              <div>
                {contactInfo.map((info, index) => (
                  <div 
                    key={index} 
                    style={contactStyles.contactItem}
                    onMouseOver={(e) => {
                      const icon = e.currentTarget.querySelector('.contact-icon');
                      if (icon) {
                        icon.style.transform = 'scale(1.1)';
                        icon.style.background = 'rgba(255, 255, 255, 0.15)';
                        icon.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                      }
                    }}
                    onMouseOut={(e) => {
                      const icon = e.currentTarget.querySelector('.contact-icon');
                      if (icon) {
                        icon.style.transform = 'scale(1)';
                        icon.style.background = 'rgba(255, 255, 255, 0.1)';
                        icon.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                      }
                    }}
                  >
                    <div className="contact-icon" style={contactStyles.contactIcon}>
                      {info.icon}
                    </div>
                    <div style={contactStyles.contactDetails}>
                      <h4 style={contactStyles.contactTitle}>{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} style={contactStyles.contactText}>{detail}</p>
                      ))}
                      <p style={contactStyles.contactDescription}>{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={contactStyles.contactForm}>
            <h3 style={contactStyles.formTitle}>Send Us a Message</h3>
            <div>
              <div style={contactStyles.formRow}>
                <div style={contactStyles.formGroup}>
                  <label htmlFor="name" style={contactStyles.label}>
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                    style={contactStyles.input}
                    placeholder="Your full name"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div style={contactStyles.formGroup}>
                  <label htmlFor="email" style={contactStyles.label}>
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                    style={contactStyles.input}
                    placeholder="your@email.com"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div style={contactStyles.formRow}>
                <div style={contactStyles.formGroup}>
                  <label htmlFor="phone" style={contactStyles.label}>
                    Contact Number *
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required
                    style={contactStyles.input}
                    placeholder="+91 XXXXX XXXXX"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div style={contactStyles.formGroup}>
                  <label htmlFor="company" style={contactStyles.label}>
                    Company Name *
                  </label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    required
                    style={contactStyles.input}
                    placeholder="Your company name"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div style={contactStyles.formRow}>
                <div style={contactStyles.formGroup}>
                  <label htmlFor="location" style={contactStyles.label}>
                    Location of Inspection *
                  </label>
                  <input 
                    type="text" 
                    id="location" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    required
                    style={contactStyles.input}
                    placeholder="City, Country"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div style={contactStyles.formGroup}>
                  <label htmlFor="userType" style={contactStyles.label}>
                    Are you an Importer or Exporter? *
                  </label>
                  <select 
                    id="userType" 
                    name="userType" 
                    value={formData.userType} 
                    onChange={handleChange} 
                    required
                    style={{
                      ...contactStyles.select,
                      color: formData.userType ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)'
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <option value="" style={{ color: 'rgba(255, 255, 255, 0.6)', backgroundColor: '#2D3436' }}>Select your role</option>
                    <option value="importer" style={{ color: '#FFFFFF', backgroundColor: '#2D3436', padding: '0.5rem' }}>Importer</option>
                    <option value="exporter" style={{ color: '#FFFFFF', backgroundColor: '#2D3436', padding: '0.5rem' }}>Exporter</option>
                    <option value="both" style={{ color: '#FFFFFF', backgroundColor: '#2D3436', padding: '0.5rem' }}>Both</option>
                    <option value="other" style={{ color: '#FFFFFF', backgroundColor: '#2D3436', padding: '0.5rem' }}>Other</option>
                  </select>
                </div>
              </div>

              <div style={contactStyles.formGroup}>
                <label htmlFor="additionalDetails" style={contactStyles.label}>
                  Additional Details
                </label>
                <textarea 
                  id="additionalDetails" 
                  name="additionalDetails" 
                  value={formData.additionalDetails} 
                  onChange={handleChange} 
                  style={contactStyles.textarea}
                  placeholder="Any additional information about your cargo, specific requirements, timeline, or other details..."
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitted}
                onClick={handleSubmit}
                style={{
                  ...contactStyles.submitBtn,
                  opacity: isSubmitted ? 0.8 : 1,
                  background: isSubmitted ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)'
                }}
                onMouseOver={(e) => {
                  if (!isSubmitted) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSubmitted) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                  }
                }}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={20} /> 
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={20} /> 
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;