import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bus } from 'lucide-react';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';

const UserSignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    address: '',
    mobile: '',
    passType: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { signup } = useAuth();
  const navigate = useNavigate();

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
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.age || parseInt(formData.age) < 1) newErrors.age = 'Valid age is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.passType) newErrors.passType = 'Pass type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const success = await signup({
        ...formData,
        age: parseInt(formData.age)
      });
      
      if (success) {
        alert('Account created successfully!');
        navigate('/user/dashboard');
      }
    } catch (err) {
      alert('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
            <Bus className="h-8 w-8" />
            <span className="text-2xl font-bold">BusPass</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us to manage your bus passes
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Full Name"
              value={formData.name}
              onChange={handleChange('name')}
              required
              error={errors.name}
              placeholder="Enter your full name"
            />

            <FormInput
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              required
              error={errors.email}
              placeholder="Enter your email"
            />

            <FormInput
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange('password')}
              required
              error={errors.password}
              placeholder="Create a password"
            />

            <FormInput
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              required
              error={errors.confirmPassword}
              placeholder="Confirm your password"
            />

            <FormInput
              label="Age"
              type="number"
              value={formData.age}
              onChange={handleChange('age')}
              required
              error={errors.age}
              placeholder="Enter your age"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleChange('address')(e as any)}
                required
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full address"
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>

            <FormInput
              label="Mobile Number"
              type="tel"
              value={formData.mobile}
              onChange={handleChange('mobile')}
              required
              error={errors.mobile}
              placeholder="Enter your mobile number"
            />

            <FormSelect
              label="Pass Type"
              value={formData.passType}
              onChange={handleChange('passType')}
              options={passTypeOptions}
              required
              error={errors.passType}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/user/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;