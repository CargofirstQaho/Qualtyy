
import React, { useState } from 'react';
import { 
  Leaf, 
  Menu, 
  X, 
  LogOut, 
  ArrowRight, 
  Play, 
  CheckCircle, 
  BarChart3, 
  Shield, 
  Zap, 
  Search, 
  FileText, 
  Settings, 
  Rocket,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  Award,
  Eye,
  EyeOff,
  Calendar,
  MessageCircle,
  CreditCard,
  Users,
  Target,
  TrendingUp
} from 'lucide-react';

// Mock Users Data
const mockUsers = [
  { id: 1, email: 'customer@test.com', password: 'password', role: 'customer', name: 'John Doe' },
  { id: 2, email: 'inspector@test.com', password: 'password', role: 'inspector', name: 'Jane Smith' }
];

// Header Component with Enhanced Design
const Header = ({ user, onLogout, onAuthClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-100">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Quality.AI
            </span>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            {/* <a href="#about" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a> */}
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium">Welcome, {user.name}</span>
                <button
                  onClick={onLogout}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
              >
                Login/SignUp
              </button>
            )}
          </nav>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-blue-100 rounded-b-xl shadow-lg">
            <div className="px-4 py-4 space-y-2">
              <a href="#home" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">Home</a>
              <a href="#services" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">Services</a>
              <a href="#about" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">About</a>
              <a href="#contact" className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium">Contact</a>
              {user ? (
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 font-medium transition-all duration-300 shadow-lg"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="w-full text-left px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-medium transition-all duration-300 shadow-lg"
                >
                  Login/SignUp
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};


export default Header;