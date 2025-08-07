
import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    phone: '', 
    company: '', 
    service: '', 
    message: ''
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
      icon: <Phone className="h-6 w-6" />, 
      title: "Phone",
      details: ["+91 807 360 2055"],
      description: "Call us for immediate assistance"
    },
    {
      icon: <Mail className="h-6 w-6" />, 
      title: "Email",
      details: ["support@quality.ai"],
      description: "Send us your questions anytime"
    },
    {
      icon: <MapPin className="h-6 w-6" />, 
      title: "Office",
      details: ["WeWork-Vaishnavi Signatures", "Bellandur, Bangalore, 560103"],
      description: "Visit our main office"
    },
    {
      icon: <Clock className="h-6 w-6" />, 
      title: "Hours",
      details: ["Mon - Sat: 10:00 AM - 6:30 PM"],
      description: "We're here to help"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="w-full px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6 border border-gray-200">
            <span className="text-gray-700 text-sm font-medium">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Start Your <span className="relative">
              <span className="text-gray-900">Quality Inspection</span>
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-200 -z-10 transform rotate-1"></div>
            </span> Journey?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Contact our experts today to discuss your quality inspection needs and discover how Quality.AI 
            can connect you with the best global inspectors for your cargo.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="text-gray-600 mt-1 group-hover:text-gray-900 transition-colors duration-200">{info.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                      <p className="text-gray-400 text-xs mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    rows={6}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none text-gray-900 placeholder-gray-400 transition-all duration-200"
                    placeholder="Tell us about your quality inspection needs and requirements..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitted}
                  className="w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 transform hover:scale-105"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="h-5 w-5" /> 
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" /> 
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;