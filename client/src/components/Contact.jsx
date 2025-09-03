

import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { ref, push, serverTimestamp } from 'firebase/database';
import { database } from '../firebase';
import emailjs from '@emailjs/browser';

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
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_pmnphec'; // Replace with your Service ID
  const EMAILJS_TEMPLATE_ID = 'template_mqg34mf'; // Replace with your Template ID  
  const EMAILJS_PUBLIC_KEY = 'jfKxPTHc-oDZPweGA'; // Replace with your Public Key

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitError) setSubmitError('');
  };

  const sendEmailNotification = async (submissionData) => {
    try {
      const emailParams = {
        from_name: submissionData.name,
        from_email: submissionData.email,
        phone: submissionData.phone,
        company: submissionData.company,
        company_name: submissionData.company, // For email subject
        location: submissionData.location,
        user_type: submissionData.userType,
        message: submissionData.message,
        additional_details: submissionData.additionalDetails || 'None provided',
        submitted_date: new Date().toLocaleString(),
        to_email: 'support@qualty.ai' // This should match your template
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailParams
      );

      console.log('Email sent successfully:', result.text);
      return { success: true };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error: error.text };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError('');

    try {
      // 1. Save to Firebase Realtime Database
      const contactRef = ref(database, 'contact_submissions');
      const firebaseResult = await push(contactRef, {
        ...formData,
        submittedAt: serverTimestamp(),
        status: 'new',
        emailSent: false // We'll update this after email is sent
      });

      console.log('Data saved to Firebase:', firebaseResult.key);

      // 2. Send email notification
      const emailResult = await sendEmailNotification(formData);
      
      if (emailResult.success) {
        // Update Firebase record to mark email as sent
        await push(ref(database, `contact_submissions/${firebaseResult.key}/emailSent`), true);
        console.log('Email notification sent successfully');
      } else {
        console.warn('Email notification failed, but form was saved');
        // Don't fail the entire process if email fails
      }

      // 3. Reset form and show success
      setFormData({
        name: '', 
        email: '', 
        phone: '', 
        company: '', 
        location: '',
        userType: '',
        message: '',
        additionalDetails: ''
      });

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const contactInfo = [
    {
      icon: <Phone size={isMobile ? 20 : 24} />, 
      title: "Phone",
      details: ["+91 903 546 2042"],
      description: "Call us for immediate assistance"
    },
    {
      icon: <Mail size={isMobile ? 20 : 24} />, 
      title: "Email",
      details: ["support@qualty.ai"],
      description: "Send us your questions anytime"
    },
    {
      icon: <MapPin size={isMobile ? 20 : 24} />, 
      title: "Office",
      details: ["WeWork-Vaishnavi Signature", "Bellandur, Bangalore, 560103"],
      description: "Visit our main office"
    },
    {
      icon: <Clock size={isMobile ? 20 : 24} />, 
      title: "Hours",
      details: ["24/7 Support"],
      description: "We're here to help"
    }
  ];

  const contactStyles = {
    contact: {
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
      position: 'relative',
      zIndex: 10
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: isMobile ? '3rem' : '4rem'
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
      marginBottom: '2rem',
      color: '#FFFFFF',
      lineHeight: '1.1',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
      letterSpacing: '-0.03em'
    },
    description: {
      fontSize: isMobile ? '1rem' : '1.4rem',
      color: 'rgba(255, 255, 255, 0.8)',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6',
      fontWeight: '500',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    contactGrid: {
      display: isMobile ? 'flex' : 'grid',
      flexDirection: isMobile ? 'column' : 'unset',
      gridTemplateColumns: isMobile ? 'unset' : '1fr 2fr',
      gap: isMobile ? '2rem' : '3rem',
      marginTop: '4rem',
      alignItems: 'stretch'
    },
    contactInfo: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: isMobile ? '2rem 1.5rem' : '3rem',
      borderRadius: isMobile ? '20px' : '25px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    infoTitle: {
      fontSize: isMobile ? '1.8rem' : '2.5rem',
      fontWeight: '800',
      marginBottom: isMobile ? '1.5rem' : '2.5rem',
      color: '#FFFFFF',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
      letterSpacing: '-0.02em'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: isMobile ? '1rem' : '1.5rem',
      marginBottom: isMobile ? '1.5rem' : '2.5rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    contactIcon: {
      width: isMobile ? '45px' : '60px',
      height: isMobile ? '45px' : '60px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: isMobile ? '12px' : '15px',
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
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif'
    },
    contactText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: isMobile ? '0.9rem' : '1.1rem',
      lineHeight: '1.4',
      marginBottom: '0.5rem',
      fontWeight: '500',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    contactDescription: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: isMobile ? '0.8rem' : '1rem',
      fontWeight: '500',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    contactForm: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: isMobile ? '2rem 1.5rem' : '3rem',
      borderRadius: isMobile ? '20px' : '25px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      flexDirection: 'column'
    },
    formTitle: {
      fontSize: isMobile ? '1.8rem' : '2.5rem',
      fontWeight: '800',
      marginBottom: isMobile ? '1.5rem' : '2.5rem',
      color: '#FFFFFF',
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
      letterSpacing: '-0.02em'
    },
    formGroup: {
      marginBottom: isMobile ? '1.2rem' : '1.5rem'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr',
      gap: isMobile ? '0.8rem' : '1.5rem'
    },
    label: {
      display: 'block',
      fontWeight: '700',
      marginBottom: isMobile ? '0.5rem' : '0.75rem',
      color: '#FFFFFF',
      fontSize: isMobile ? '0.8rem' : '1.1rem',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    input: {
      width: '100%',
      padding: isMobile ? '0.5rem 0.8rem' : '0.75rem 1.25rem',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: isMobile ? '8px' : '12px',
      fontSize: isMobile ? '0.8rem' : '1.1rem',
      transition: 'all 0.3s ease',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#FFFFFF',
      height: isMobile ? '40px' : '52px',
      boxSizing: 'border-box',
      fontWeight: '500'
    },
    select: {
      width: '100%',
      padding: isMobile ? '0.5rem 0.8rem' : '0.75rem 1.25rem',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: isMobile ? '8px' : '12px',
      fontSize: isMobile ? '0.8rem' : '1.1rem',
      transition: 'all 0.3s ease',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#FFFFFF',
      height: isMobile ? '40px' : '52px',
      boxSizing: 'border-box',
      cursor: 'pointer',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
      backgroundPosition: 'right 1rem center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '1rem',
      paddingRight: isMobile ? '2.5rem' : '3rem',
      fontWeight: '500'
    },
    textarea: {
      width: '100%',
      padding: isMobile ? '0.8rem 1rem' : '1rem 1.25rem',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: isMobile ? '10px' : '12px',
      fontSize: isMobile ? '0.9rem' : '1.1rem',
      transition: 'all 0.3s ease',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      resize: 'vertical',
      minHeight: isMobile ? '100px' : '120px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#FFFFFF',
      boxSizing: 'border-box',
      fontWeight: '500'
    },
    submitBtn: {
      background: isLoading ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)',
      color: '#FFFFFF',
      padding: isMobile ? '1rem 2rem' : '1.3rem 3rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: isMobile ? '25px' : '30px',
      fontSize: isMobile ? '1rem' : '1.2rem',
      fontWeight: '700',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      backdropFilter: 'blur(10px)',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      opacity: isLoading ? 0.7 : 1
    },
    errorMessage: {
      color: '#ff6b6b',
      fontSize: isMobile ? '0.8rem' : '1rem',
      marginBottom: '1rem',
      padding: '0.75rem 1rem',
      background: 'rgba(255, 107, 107, 0.1)',
      border: '1px solid rgba(255, 107, 107, 0.3)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontFamily: '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    },
    successMessage: {
      color: '#51cf66',
      fontSize: isMobile ? '0.8rem' : '1rem',
      marginBottom: '1rem',
      padding: '0.75rem 1rem',
      background: 'rgba(81, 207, 102, 0.1)',
      border: '1px solid rgba(81, 207, 102, 0.3)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
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
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
            Ready to Start Your Quality Inspection Journey?
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
                      if (!isMobile) {
                        const icon = e.currentTarget.querySelector('.contact-icon');
                        if (icon) {
                          icon.style.transform = 'scale(1.1)';
                          icon.style.background = 'rgba(255, 255, 255, 0.15)';
                          icon.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                        }
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isMobile) {
                        const icon = e.currentTarget.querySelector('.contact-icon');
                        if (icon) {
                          icon.style.transform = 'scale(1)';
                          icon.style.background = 'rgba(255, 255, 255, 0.1)';
                          icon.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                        }
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
            
            {isSubmitted && (
              <div style={contactStyles.successMessage}>
                <CheckCircle size={18} />
                <span>Thank you! Your message has been submitted and our team has been notified.</span>
              </div>
            )}

            {submitError && (
              <div style={contactStyles.errorMessage}>
                <AlertCircle size={18} />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={contactStyles.formRow}>
                <div style={contactStyles.formGroup}>
                  <label htmlFor="name" style={contactStyles.label}>Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                    disabled={isLoading}
                    style={{
                      ...contactStyles.input,
                      opacity: isLoading ? 0.7 : 1,
                      cursor: isLoading ? 'not-allowed' : 'text'
                    }}
                    placeholder="Your full name"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div style={contactStyles.formGroup}>
                  <label htmlFor="email" style={contactStyles.label}>Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                    disabled={isLoading}
                    style={{
                      ...contactStyles.input,
                      opacity: isLoading ? 0.7 : 1,
                      cursor: isLoading ? 'not-allowed' : 'text'
                    }}
                    placeholder="your@email.com"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div style={contactStyles.formRow}>
                <div style={contactStyles.formGroup}>
                  <label htmlFor="phone" style={contactStyles.label}>Contact Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required
                    disabled={isLoading}
                    style={{
                      ...contactStyles.input,
                      opacity: isLoading ? 0.7 : 1,
                      cursor: isLoading ? 'not-allowed' : 'text'
                    }}
                    placeholder="+91 XXXXX XXXXX"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div style={contactStyles.formGroup}>
                  <label htmlFor="company" style={contactStyles.label}>Company Name *</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    required
                    disabled={isLoading}
                    style={{
                      ...contactStyles.input,
                      opacity: isLoading ? 0.7 : 1,
                      cursor: isLoading ? 'not-allowed' : 'text'
                    }}
                    placeholder="Your company name"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div style={contactStyles.formRow}>
                <div style={contactStyles.formGroup}>
                  <label htmlFor="location" style={contactStyles.label}>Location of Inspection *</label>
                  <input 
                    type="text" 
                    id="location" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    required
                    disabled={isLoading}
                    style={{
                      ...contactStyles.input,
                      opacity: isLoading ? 0.7 : 1,
                      cursor: isLoading ? 'not-allowed' : 'text'
                    }}
                    placeholder="City, Country"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div style={contactStyles.formGroup}>
                  <label htmlFor="userType" style={contactStyles.label}>Are you an Importer or Exporter? *</label>
                  <select 
                    id="userType" 
                    name="userType" 
                    value={formData.userType} 
                    onChange={handleChange} 
                    required
                    disabled={isLoading}
                    style={{
                      ...contactStyles.select,
                      color: formData.userType ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                      opacity: isLoading ? 0.7 : 1,
                      cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <option value="" style={{ color: 'rgba(255, 255, 255, 0.6)', backgroundColor: '#2D3436' }}>Select your role</option>
                    <option value="importer" style={{ color: '#FFFFFF', backgroundColor: '#2D3436' }}>Importer</option>
                    <option value="exporter" style={{ color: '#FFFFFF', backgroundColor: '#2D3436' }}>Exporter</option>
                    <option value="both" style={{ color: '#FFFFFF', backgroundColor: '#2D3436' }}>Both</option>
                    <option value="other" style={{ color: '#FFFFFF', backgroundColor: '#2D3436' }}>Other</option>
                  </select>
                </div>
              </div>

              <div style={contactStyles.formGroup}>
                <label htmlFor="message" style={contactStyles.label}>Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required
                  disabled={isLoading}
                  style={{
                    ...contactStyles.textarea,
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? 'not-allowed' : 'text'
                  }}
                  placeholder="Tell us about your quality inspection needs and requirements..."
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div style={contactStyles.formGroup}>
                <label htmlFor="additionalDetails" style={contactStyles.label}>Additional Details</label>
                <textarea 
                  id="additionalDetails" 
                  name="additionalDetails" 
                  value={formData.additionalDetails} 
                  onChange={handleChange} 
                  disabled={isLoading}
                  style={{
                    ...contactStyles.textarea,
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? 'not-allowed' : 'text'
                  }}
                  placeholder="Any additional information about your cargo, specific requirements, timeline, or other details..."
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading || isSubmitted}
                style={contactStyles.submitBtn}
              >
                {isLoading ? (
                  <>
                    <div style={{
                      width: isMobile ? '16px' : '20px',
                      height: isMobile ? '16px' : '20px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '2px solid #FFFFFF',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    <span>Sending...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={isMobile ? 18 : 20} /> 
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={isMobile ? 18 : 20} /> 
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;