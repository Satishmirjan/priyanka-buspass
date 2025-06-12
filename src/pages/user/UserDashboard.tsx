import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, User, Eye, Plus, RefreshCw, Clock, MapPin } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'View Pass Details',
      description: 'Check your current pass information',
      icon: Eye,
      link: '/user/view-pass',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Create New Pass',
      description: 'Apply for a new bus pass',
      icon: Plus,
      link: '/user/create-pass',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Renew Pass',
      description: 'Renew your existing pass',
      icon: RefreshCw,
      link: '/user/renew-pass',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Edit Profile',
      description: 'Update your personal information',
      icon: User,
      link: '/user/edit-profile',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  // Mock pass data
  const currentPass = {
    id: 'BP001',
    route: 'Route 25A',
    startStop: 'Central Station',
    endStop: 'University Campus',
    validity: '2024-12-31',
    status: 'Active'
  };

  return (
    <Layout userType="user">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white p-6">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-blue-100">Manage your bus passes and profile from your dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Passes</p>
                <p className="text-2xl font-semibold text-gray-900">1</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Days Left</p>
                <p className="text-2xl font-semibold text-gray-900">45</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Routes Used</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Profile</p>
                <p className="text-2xl font-semibold text-gray-900 capitalize">{user?.passType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Pass Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Pass Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Pass ID</p>
              <p className="text-lg font-semibold text-gray-900">{currentPass.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Route</p>
              <p className="text-lg font-semibold text-gray-900">{currentPass.route}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {currentPass.status}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">From</p>
              <p className="text-lg font-semibold text-gray-900">{currentPass.startStop}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">To</p>
              <p className="text-lg font-semibold text-gray-900">{currentPass.endStop}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Valid Until</p>
              <p className="text-lg font-semibold text-gray-900">{currentPass.validity}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="group bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 rounded-lg text-white mb-4 ${action.color} transition-colors`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <CreditCard className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Pass BP001 activated</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Profile updated</p>
                <p className="text-xs text-gray-500">1 week ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <RefreshCw className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Pass renewed successfully</p>
                <p className="text-xs text-gray-500">2 weeks ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;