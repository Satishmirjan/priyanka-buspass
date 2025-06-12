import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import { RefreshCw, ArrowLeft, Calendar } from 'lucide-react';

const RenewPass: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userId: user?.id || '',
    name: user?.name || '',
    passId: 'BP001',
    startStop: 'Central Station',
    endStop: 'University Campus',
    validityDate: '',
    amount: '150'
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const stopOptions = [
    { value: 'Central Station', label: 'Central Station' },
    { value: 'University Campus', label: 'University Campus' },
    { value: 'City Mall', label: 'City Mall' },
    { value: 'Airport Terminal', label: 'Airport Terminal' },
    { value: 'General Hospital', label: 'General Hospital' },
    { value: 'Downtown Plaza', label: 'Downtown Plaza' },
    { value: 'Suburban Center', label: 'Suburban Center' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.validityDate) newErrors.validityDate = 'Validity date is required';
    
    const selectedDate = new Date(formData.validityDate);
    const today = new Date();
    if (selectedDate <= today) {
      newErrors.validityDate = 'Validity date must be in the future';
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
      
      alert('Pass renewed successfully! Your renewed pass is now active.');
      navigate('/user/view-pass');
    } catch (err) {
      alert('Failed to renew pass. Please try again.');
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

  // Set minimum date to tomorrow
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <Layout userType="user">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/user/dashboard')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Renew Pass</h1>
        </div>

        {/* Current Pass Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <RefreshCw className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-blue-900">Current Pass Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-blue-700 font-medium">Pass ID:</p>
              <p className="text-blue-900">{formData.passId}</p>
            </div>
            <div>
              <p className="text-blue-700 font-medium">Route:</p>
              <p className="text-blue-900">{formData.startStop} → {formData.endStop}</p>
            </div>
            <div>
              <p className="text-blue-700 font-medium">Current Expiry:</p>
              <p className="text-blue-900">2024-12-31</p>
            </div>
          </div>
        </div>

        {/* Renewal Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Renewal Details</h2>
            </div>
            <p className="text-gray-600">Update your pass renewal information below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="User ID"
                value={formData.userId}
                onChange={handleChange('userId')}
                disabled
              />

              <FormInput
                label="Full Name"
                value={formData.name}
                onChange={handleChange('name')}
                disabled
              />

              <FormInput
                label="Pass ID"
                value={formData.passId}
                onChange={handleChange('passId')}
                disabled
              />

              <FormInput
                label="New Validity Date"
                type="date"
                value={formData.validityDate}
                onChange={handleChange('validityDate')}
                min={getMinDate()}
                required
                error={errors.validityDate}
              />
            </div>

            {/* Route Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                label="Start Stop"
                value={formData.startStop}
                onChange={handleChange('startStop')}
                options={stopOptions}
                required
              />

              <FormSelect
                label="End Stop"
                value={formData.endStop}
                onChange={handleChange('endStop')}
                options={stopOptions}
                required
              />
            </div>

            {/* Amount */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-green-900 font-medium">Renewal Amount:</span>
                  <p className="text-sm text-green-700">Monthly pass renewal fee</p>
                </div>
                <span className="text-3xl font-bold text-green-900">₹{formData.amount}</span>
              </div>
            </div>

            {/* Renewal Benefits */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Renewal Benefits</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Seamless continuation of service</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>No application processing time</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Instant activation upon payment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Same pass ID maintained</span>
                </li>
              </ul>
            </div>

            {/* Terms */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="renewalTerms"
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="renewalTerms" className="text-sm text-gray-700">
                  I confirm that I want to renew my bus pass with the above details. I understand that 
                  the renewal will extend my pass validity and the payment will be processed immediately.
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/user/view-pass')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {loading ? 'Processing...' : 'Renew Pass'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RenewPass;