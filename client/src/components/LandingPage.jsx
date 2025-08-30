import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import Services from "./Services";
import Contact from "./Contact";
import Footer from "./Footer";
import About from "./About";
import LearnOurStory from "./LearnOurStory";

const LandingPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  const handleLogin = (userData) => {
    setShowAuth(false);
    // Redirect based on user role
    if (userData?.role) {
      navigate(`/dashboard/${userData.role}`);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleAuthClick = () => {
    if (user) {
      // If user is logged in, redirect to their dashboard
      navigate(`/dashboard/${user.role}`);
    } else {
      // If not logged in, go to login page
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        user={user}
        onLogout={handleLogout}
        onAuthClick={handleAuthClick}
      />
      <Hero />
      <Services />
      <About />
      <LearnOurStory />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
