import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Users, GraduationCap, Briefcase } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bus className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">BusPass</h1>
            </div>
            <nav className="flex space-x-4">
              <Link to="/user/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                User Login
              </Link>
              <Link to="/admin/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                Admin Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
            Digital Bus Pass
            <span className="text-blue-600"> Management</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Streamline your bus pass management with our modern, efficient digital platform. 
            Create, renew, and manage bus passes seamlessly.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/user/login"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Login as User
            </Link>
            <Link
              to="/admin/login"
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Login as Admin
            </Link>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Who Can Use Our System?</h3>
          <p className="text-lg text-gray-600">We serve different types of users with tailored solutions</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Students */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <GraduationCap className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Students</h4>
              <p className="text-gray-600 mb-6">
                Special discounted passes for students with flexible validity options. 
                Perfect for daily commutes to school or college.
              </p>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Up to 50% discount</li>
                <li>• Monthly and yearly options</li>
                <li>• Easy renewal process</li>
                <li>• Student ID verification</li>
              </ul>
            </div>
          </div>

          {/* Senior Citizens */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Senior Citizens</h4>
              <p className="text-gray-600 mb-6">
                Subsidized travel passes for senior citizens with additional benefits 
                and priority services.
              </p>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Government subsidized rates</li>
                <li>• Priority seating</li>
                <li>• Medical emergency support</li>
                <li>• Age verification required</li>
              </ul>
            </div>
          </div>

          {/* Employees */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Employees</h4>
              <p className="text-gray-600 mb-6">
                Corporate and individual employee passes with flexible routes 
                and corporate billing options.
              </p>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Corporate tie-ups</li>
                <li>• Multiple route options</li>
                <li>• Bulk booking discounts</li>
                <li>• Employee ID integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h3>
            <p className="text-lg text-gray-600">Modern features for seamless bus pass management</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Bus className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Digital Passes</h4>
              <p className="text-gray-600">No more physical cards to lose</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Easy Renewal</h4>
              <p className="text-gray-600">Renew passes with just a few clicks</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">User Friendly</h4>
              <p className="text-gray-600">Intuitive interface for all ages</p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Briefcase className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">24/7 Access</h4>
              <p className="text-gray-600">Manage passes anytime, anywhere</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bus className="h-6 w-6" />
                <h4 className="text-lg font-semibold">BusPass</h4>
              </div>
              <p className="text-gray-400">
                Modern bus pass management system for efficient public transportation.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/user/login" className="hover:text-white transition-colors">User Login</Link></li>
                <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>
                <li><Link to="/user/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="text-gray-400 space-y-2">
                <p>Email: support@buspass.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BusPass Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;