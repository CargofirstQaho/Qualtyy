import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Linkedin } from "lucide-react";
import QualtyAILogo from "../assets/QualtyAILogo.png"; // Assuming you have a logo image

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  const footerSections = [
    {
      title: "For customers",
      links: [
        "Pre-Shipment Inspection (PSI)",
        "During Production Inspection (DUPRO)",
        "Container Loading Inspection (CLI)",
        "On-Site Laboratory Testing / Sampling",
        "Post-Shipment Inspection",
        "Third-Party Inspection",
      ],
    },
    {
      title: "Support",
      links: ["Contact us", "Help Center", "Request Quote"],
    },
    {
      title: "For professionals",
      links: [
        "Register as a Customer",
        "Register as a Inspector",
        "Register as a InspectionCompany",
      ],
    },
    {
      title: "Social links",
      links: ["Twitter", "Facebook", "Instagram", "LinkedIn"],
    },
  ];

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const footerStyles = {
    footer: {
      background: "#000000",
      borderTop: "1px solid rgba(40, 40, 40, 0.3)",
      color: "#FFFFFF",
      padding: isMobile ? "25px 0 20px 0" : "80px 0 60px 0",
      fontFamily:
        '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    footerContent: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: isMobile ? "0 1rem" : "0 2rem",
    },
    brandSection: {
      marginBottom: isMobile ? "20px" : "60px",
      textAlign: isMobile ? "center" : "left",
    },
    brandLogo: {
      display: "inline-flex",
      alignItems: "center",
      gap: isMobile ? "6px" : "12px",
      marginBottom: "0",
    },
    logoIcon: {
      width: isMobile ? "45px" : "80px",
      height: isMobile ? "45px" : "80px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      overflow: "hidden",
      transform: "translateY(-4px)",
    },
    logoImage: {
      width: "100%",
      height: "100%",
      borderRadius: "8px",
      objectFit: "cover",
      display: "block",
    },
    logoText: {
      fontSize: isMobile ? "1rem" : "1.5rem",
      fontWeight: "800",
      background: "linear-gradient(135deg, #FFFFFF, #CCCCCC)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
      letterSpacing: "-0.02em",
      lineHeight: "1.2",
      margin: "0",
      padding: "0",
    },
    footerGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: isMobile ? "20px 15px" : "80px",
      marginBottom: isMobile ? "25px" : "80px",
    },
    footerSection: {},
    sectionTitle: {
      fontWeight: "700",
      marginBottom: isMobile ? "10px" : "32px",
      color: "#FFFFFF",
      fontSize: isMobile ? "0.9rem" : "1.3rem",
      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
    },
    sectionList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    sectionListItem: {
      marginBottom: isMobile ? "5px" : "16px",
    },
    sectionLink: {
      color: "rgba(255, 255, 255, 0.7)",
      textDecoration: "none",
      transition: "all 0.3s ease",
      fontSize: isMobile ? "0.75rem" : "1.1rem",
      position: "relative",
      fontWeight: "500",
      fontFamily:
        '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      lineHeight: isMobile ? "1.2" : "1.5",
    },
    footerBottom: {
      borderTop: "1px solid rgba(40, 40, 40, 0.3)",
      paddingTop: isMobile ? "15px" : "40px",
      textAlign: isMobile ? "center" : "left",
    },
    footerBottomText: {
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: isMobile ? "0.65rem" : "0.9rem",
      fontWeight: "400",
      fontFamily:
        '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      lineHeight: "1.6",
      marginBottom: isMobile ? "5px" : "8px",
    },
    copyright: {
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: isMobile ? "0.65rem" : "0.9rem",
      fontWeight: "400",
      fontFamily:
        '"Gilroy", "Poppins", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      lineHeight: "1.6",
    },
  };

  // Add Google Fonts import
  React.useEffect(() => {
    if (!document.querySelector("#footer-styles")) {
      const style = document.createElement("style");
      style.id = "footer-styles";
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
                          e.target.style.color = "#CCCCCC";
                          e.target.style.transform = "translateX(5px)";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isMobile) {
                          e.target.style.color = "rgba(255, 255, 255, 0.7)";
                          e.target.style.transform = "translateX(0)";
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
          <p style={footerStyles.copyright}>
            © Copyright 2025 Quality.AI (in association with CargoFirst QAHO
            Corporation Pvt. Ltd.) All rights reserved. | CIN:
            U51909KA2022PTC161277
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
