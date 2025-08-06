


import { useState } from "react";
import { X, Leaf, User, Award, Eye, EyeOff, Building2 } from 'lucide-react';
import CustomerSignup from '../CustomerSignup/CustomerSignup';
import InspectorSignup from '../InspectorSignup/InspectorSignup';
import InspectionCompanySignup from '../InspectionCompanySignup/InspectionCompanySignup';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [showDetailedSignup, setShowDetailedSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  // Mock users for login (you can remove this later when you have real authentication)
  const mockUsers = [
    { id: 1, email: 'customer@test.com', password: 'password', role: 'customer', name: 'John Customer' },
    { id: 2, email: 'inspector@test.com', password: 'password', role: 'inspector', name: 'Jane Inspector' },
    { id: 3, email: 'company@test.com', password: 'password', role: 'inspection_company', name: 'ABC Inspection Co.' }
  ];

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const user = mockUsers.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        onLogin(user);
        onClose();
      } else {
        alert('Invalid credentials. Try: customer@test.com / password');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      const newUser = {
        id: Date.now(),
        email: formData.email,
        password: formData.password,
        role: selectedRole,
        name: formData.name
      };
      onLogin(newUser);
      onClose();
    }
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setShowDetailedSignup(true);
  };

  const handleBackToRoleSelection = () => {
    setShowDetailedSignup(false);
  };

  const handleSignupSuccess = (userData) => {
    // Handle successful signup
    console.log('Signup successful:', userData);
    onLogin(userData);
    onClose();
    // Reset states
    setShowDetailedSignup(false);
    setIsLogin(true);
  };

  // If user selected detailed signup, show the appropriate form
  if (!isLogin && showDetailedSignup) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 transform transition-all duration-300">
            
            {/* Header with back button */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <button
                onClick={handleBackToRoleSelection}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                ← Back to Role Selection
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Render appropriate signup form based on selected role */}
            <div className="p-6">
              {selectedRole === 'customer' && (
                <CustomerSignup onSuccess={handleSignupSuccess} onBack={handleBackToRoleSelection} />
              )}
              {selectedRole === 'inspector' && (
                <InspectorSignup onSuccess={handleSignupSuccess} onBack={handleBackToRoleSelection} />
              )}
              {selectedRole === 'inspection_company' && (
                <InspectionCompanySignup onSuccess={handleSignupSuccess} onBack={handleBackToRoleSelection} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 border border-gray-200 transform transition-all duration-300">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back' : 'Join QualityAI'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>

          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => {
                setIsLogin(true);
                setShowDetailedSignup(false);
              }}
              className={`flex-1 py-3 px-4 text-center rounded-lg transition-all duration-200 font-medium ${
                isLogin ? 'bg-white text-gray-900 shadow-sm transform scale-105' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setShowDetailedSignup(false);
              }}
              className={`flex-1 py-3 px-4 text-center rounded-lg transition-all duration-200 font-medium ${
                !isLogin ? 'bg-white text-gray-900 shadow-sm transform scale-105' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? (
            // Login Form
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-900 placeholder-gray-400 pr-12 transition-all duration-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold transform hover:scale-105"
              >
                Sign In
              </button>
            </div>
          ) : (
            // Role Selection for Signup
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Choose Your Account Type</label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoleSelection('customer')}
                    className="p-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:border-gray-400 transition-all duration-200 text-left transform hover:scale-105 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-3">
                      <User className="h-6 w-6 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">Customer</div>
                        <div className="text-sm text-gray-500">Request inspections and publish requirements</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleRoleSelection('inspector')}
                    className="p-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:border-gray-400 transition-all duration-200 text-left transform hover:scale-105 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-3">
                      <Award className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900">Inspector</div>
                        <div className="text-sm text-gray-500">Perform inspections and submit reports</div>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelection('inspection_company')}
                    className="p-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:border-gray-400 transition-all duration-200 text-left transform hover:scale-105 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-6 w-6 text-purple-600" />
                      <div>
                        <div className="font-medium text-gray-900">Inspection Company</div>
                        <div className="text-sm text-gray-500">Manage inspectors and handle contracts</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {isLogin && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-gray-900 hover:text-gray-700 font-medium transition-colors duration-200"
                >
                  Sign up
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;