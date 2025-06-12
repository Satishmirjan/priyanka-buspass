import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  CreditCard, 
  Settings, 
  Bus, 
  Users, 
  Plus,
  Edit3,
  Eye,
  RefreshCw,
  Lock,
  Menu,
  X
} from 'lucide-react';

interface Props {
  userType: 'user' | 'admin';
}

const Sidebar: React.FC<Props> = ({ userType }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const userMenuItems = [
    { path: '/user/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/user/profile', icon: User, label: 'My Details' },
    { path: '/user/view-pass', icon: Eye, label: 'View Pass' },
    { path: '/user/create-pass', icon: Plus, label: 'Create Pass' },
    { path: '/user/renew-pass', icon: RefreshCw, label: 'Renew Pass' },
    { path: '/user/change-password', icon: Lock, label: 'Change Password' },
  ];

  const adminMenuItems = [
    { path: '/admin/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/admin/add-bus', icon: Plus, label: 'Add Bus' },
    { path: '/admin/edit-bus', icon: Edit3, label: 'Edit Bus' },
    { path: '/admin/create-user', icon: User, label: 'Create User' },
    { path: '/admin/view-users', icon: Users, label: 'View Users' },
    { path: '/admin/create-pass', icon: CreditCard, label: 'Create Pass' },
    { path: '/admin/renew-pass', icon: RefreshCw, label: 'Renew Pass' },
  ];

  const menuItems = userType === 'user' ? userMenuItems : adminMenuItems;

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed lg:relative lg:translate-x-0 z-40 w-64 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h2 className="text-xl font-bold text-white">
              {userType === 'user' ? 'User Panel' : 'Admin Panel'}
            </h2>
          </div>
          
          <nav className="flex-1 py-4">
            <ul className="space-y-2 px-4">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon size={20} className="mr-3" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;