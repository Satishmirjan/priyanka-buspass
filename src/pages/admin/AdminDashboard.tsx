import React from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { Users, Bus, CreditCard, TrendingUp, Plus, Edit, Eye, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Passes',
      value: '856',
      change: '+8%',
      icon: CreditCard,
      color: 'bg-green-500'
    },
    {
      title: 'Total Buses',
      value: '45',
      change: '+2%',
      icon: Bus,
      color: 'bg-purple-500'
    },
    {
      title: 'Revenue',
      value: '₹2.4L',
      change: '+15%',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Bus',
      description: 'Register a new bus route',
      icon: Plus,
      link: '/admin/add-bus',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Create User',
      description: 'Add a new user to the system',
      icon: Users,
      link: '/admin/create-user',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'View All Users',
      description: 'Manage existing users',
      icon: Eye,
      link: '/admin/view-users',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Create Pass',
      description: 'Issue a new bus pass',
      icon: CreditCard,
      link: '/admin/create-pass',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  // Mock recent activities
  const recentActivities = [
    { action: 'New user registered', user: 'John Doe', time: '2 minutes ago', type: 'user' },
    { action: 'Pass renewed', user: 'Jane Smith', time: '5 minutes ago', type: 'pass' },
    { action: 'Bus route updated', user: 'Admin', time: '10 minutes ago', type: 'bus' },
    { action: 'New pass created', user: 'Mike Johnson', time: '15 minutes ago', type: 'pass' },
    { action: 'User profile updated', user: 'Sarah Wilson', time: '20 minutes ago', type: 'user' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return Users;
      case 'pass': return CreditCard;
      case 'bus': return Bus;
      default: return Users;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user': return 'bg-blue-100 text-blue-600';
      case 'pass': return 'bg-green-100 text-green-600';
      case 'bus': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Layout userType="admin">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white p-6">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-indigo-100">Manage your bus pass system from the admin dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activities and System Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Routes</span>
                <span className="font-semibold text-gray-900">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Applications</span>
                <span className="font-semibold text-orange-600">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Expired Passes</span>
                <span className="font-semibold text-red-600">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">System Uptime</span>
                <span className="font-semibold text-green-600">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Database Size</span>
                <span className="font-semibold text-gray-900">2.4 GB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Management Links */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Management Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/edit-bus"
              className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Edit className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Edit Bus Routes</span>
            </Link>
            <Link
              to="/admin/renew-pass"
              className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <RefreshCw className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Renew Passes</span>
            </Link>
            <Link
              to="/admin/view-users"
              className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Users className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">User Management</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;