import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import { User, ArrowLeft, Plus } from 'lucide-react';

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userId: 'USR' + Date.now().toString().slice(-6),
    name: '',
    age: '',
    address: '',
    email: '',
    mobile: '',
    passType: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const passTypeOptions = [
    { value: 'Student', label: 'Student' },
    { value: 'Senior Citizen', label: 'Senior Citizen' },
    { value: 'Employee', label: 'Employee' },
    { value: 'General', label: 'General' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.age || parseInt(formData.age) < 1) newErrors.age = 'Valid age is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.passType) newErrors.passType = 'Pass type is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Mobile validation
    const mobileRegex = /^[0-9]{10}$/;
    if (formData.mobile && !mobileRegex.test(formData.mobile.replace(/[^0-9]/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('User created successfully! Login credentials have been sent to the user\'s email.');
      navigate('/admin/view-users');
    } catch (err) {
      alert('Failed to create user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password }));
  };

  return (
    <Layout userType="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New User</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">User Registration Form</h2>
            </div>
            <p className="text-gray-600">Create a new user account in the bus pass management system.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="User ID"
                value={formData.userId}
                onChange={handleChange('userId')}
                placeholder="Auto-generated"
                disabled
              />

              <FormInput
                label="Full Name"
                value={formData.name}
                onChange={handleChange('name')}
                placeholder="Enter full name"
                required
                error={errors.name}
              />

              <FormInput
                label="Age"
                type="number"
                value={formData.age}
                onChange={handleChange('age')}
                placeholder="Enter age"
                required
                error={errors.age}
              />

              <FormInput
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                placeholder="Enter email address"
                required
                error={errors.email}
              />

              <FormInput
                label="Mobile Number"
                type="tel"
                value={formData.mobile}
                onChange={handleChange('mobile')}
                placeholder="Enter 10-digit mobile number"
                required
                error={errors.mobile}
              />

              <FormSelect
                label="Pass Type"
                value={formData.passType}
                onChange={handleChange('passType')}
                options={passTypeOptions}
                required
                error={errors.passType}
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.address}
                onChange={handleChange('address')}
                required
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter complete address"
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>

            {/* Password Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.password}
                      onChange={handleChange('password')}
                      required
                      className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      Generate
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>
              </div>
            </div>

            {/* User Preview */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">User Preview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <p><strong>User ID:</strong> {formData.userId}</p>
                  <p><strong>Name:</strong> {formData.name || 'Not entered'}</p>
                  <p><strong>Email:</strong> {formData.email || 'Not entered'}</p>
                </div>
                <div>
                  <p><strong>Age:</strong> {formData.age || 'Not entered'}</p>
                  <p><strong>Mobile:</strong> {formData.mobile || 'Not entered'}</p>
                  <p><strong>Pass Type:</strong> {formData.passType || 'Not selected'}</p>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="adminTerms"
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="adminTerms" className="text-sm text-gray-700">
                  I confirm that I have the authority to create this user account and that all 
                  information provided is accurate. The user will receive login credentials via email.
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                {loading ? 'Creating User...' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateUser;