import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import { RefreshCw, ArrowLeft, Search, Calendar } from 'lucide-react';

const AdminRenewPass: React.FC = () => {
  const navigate = useNavigate();
  
  const [searchPassId, setSearchPassId] = useState('');
  const [passFound, setPassFound] = useState(false);
  const [passData, setPassData] = useState({
    passId: '',
    userId: '',
    userName: '',
    busNo: '',
    startStop: '',
    endStop: '',
    currentExpiry: '',
    passType: ''
  });
  
  const [formData, setFormData] = useState({
    validityDate: '',
    validityMonths: '1',
    amount: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock pass data
  const mockPasses = {
    'BP001': {
      passId: 'BP001',
      userId: 'USR001',
      userName: 'John Doe',
      busNo: '25A',
      startStop: 'Central Station',
      endStop: 'University Campus',
      currentExpiry: '2024-12-31',
      passType: 'Student'
    },
    'BP002': {
      passId: 'BP002',
      userId: 'USR002',
      userName: 'Jane Smith',
      busNo: '42B',
      startStop: 'City Mall',
      endStop: 'Airport Terminal',
      currentExpiry: '2024-11-30',
      passType: 'Senior Citizen'
    }
  };

  const stopOptions = [
    { value: 'Central Station', label: 'Central Station' },
    { value: 'University Campus', label: 'University Campus' },
    { value: 'City Mall', label: 'City Mall' },
    { value: 'Airport Terminal', label: 'Airport Terminal' },
    { value: 'General Hospital', label: 'General Hospital' },
    { value: 'Downtown Plaza', label: 'Downtown Plaza' },
    { value: 'Suburban Center', label: 'Suburban Center' }
  ];

  const validityOptions = [
    { value: '1', label: '1 Month' },
    { value: '3', label: '3 Months' },
    { value: '6', label: '6 Months' },
    { value: '12', label: '12 Months' }
  ];

  const calculateAmount = (passType: string, months: string) => {
    const amounts = {
      'Student': 150,
      'Senior Citizen': 75,
      'Employee': 200,
      'General': 250
    };
    const baseAmount = amounts[passType as keyof typeof amounts] || 0;
    return baseAmount * parseInt(months);
  };

  const handleSearchPass = () => {
    const pass = mockPasses[searchPassId as keyof typeof mockPasses];
    if (pass) {
      setPassData(pass);
      setFormData(prev => ({
        ...prev,
        amount: calculateAmount(pass.passType, prev.validityMonths).toString()
      }));
      setPassFound(true);
      setErrors({});
    } else {
      alert('Pass not found. Try BP001 or BP002 for demo.');
      setPassFound(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!passFound) newErrors.passId = 'Please search and select a valid pass';
    if (!formData.validityDate) newErrors.validityDate = 'New validity date is required';
    
    const selectedDate = new Date(formData.validityDate);
    const currentExpiry = new Date(passData.currentExpiry);
    if (selectedDate <= currentExpiry) {
      newErrors.validityDate = 'New validity date must be after current expiry date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  React.useEffect(() => {
    if (passData.passType && formData.validityMonths) {
      setFormData(prev => ({ 
        ...prev, 
        amount: calculateAmount(passData.passType, prev.validityMonths).toString() 
      }));
    }
  }, [passData.passType, formData.validityMonths]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Pass ${passData.passId} renewed successfully for ${passData.userName}! New expiry: ${formData.validityDate}`);
      navigate('/admin/dashboard');
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

  // Calculate new expiry date based on current expiry and months
  const calculateNewExpiry = () => {
    if (passData.currentExpiry && formData.validityMonths) {
      const currentExpiry = new Date(passData.currentExpiry);
      const newExpiry = new Date(currentExpiry);
      newExpiry.setMonth(newExpiry.getMonth() + parseInt(formData.validityMonths));
      return newExpiry.toISOString().split('T')[0];
    }
    return '';
  };

  React.useEffect(() => {
    if (passData.currentExpiry && formData.validityMonths) {
      setFormData(prev => ({ ...prev, validityDate: calculateNewExpiry() }));
    }
  }, [passData.currentExpiry, formData.validityMonths]);

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
          <h1 className="text-3xl font-bold text-gray-900">Renew Pass (Admin)</h1>
        </div>

        {/* Pass Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Find Pass to Renew</h2>
            </div>
            <p className="text-gray-600">Search for the pass that needs renewal.</p>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <FormInput
                label="Pass ID"
                value={searchPassId}
                onChange={(e) => setSearchPassId(e.target.value)}
                placeholder="Enter Pass ID (e.g., BP001)"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearchPass}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
            <p className="font-medium">Demo Pass IDs:</p>
            <p>BP001 - John Doe (Student, expires 2024-12-31)</p>
            <p>BP002 - Jane Smith (Senior Citizen, expires 2024-11-30)</p>
          </div>

          {/* Pass Info Display */}
          {passFound && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Pass Found</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
                <div>
                  <p><strong>Pass ID:</strong> {passData.passId}</p>
                  <p><strong>User:</strong> {passData.userName} ({passData.userId})</p>
                  <p><strong>Pass Type:</strong> {passData.passType}</p>
                </div>
                <div>
                  <p><strong>Route:</strong> {passData.startStop} → {passData.endStop}</p>
                  <p><strong>Bus:</strong> {passData.busNo}</p>
                  <p><strong>Current Expiry:</strong> {passData.currentExpiry}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Renewal Form */}
        {passFound && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <RefreshCw className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Renew Pass for {passData.userName}</h2>
              </div>
              <p className="text-gray-600">Set the new validity period for this pass.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Pass Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Current Pass Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Pass ID:</p>
                    <p className="font-medium">{passData.passId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Current Expiry:</p>
                    <p className="font-medium">{passData.currentExpiry}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pass Type:</p>
                    <p className="font-medium">{passData.passType}</p>
                  </div>
                </div>
              </div>

              {/* Renewal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelect
                  label="Extension Period"
                  value={formData.validityMonths}
                  onChange={handleChange('validityMonths')}
                  options={validityOptions}
                  required
                />

                <FormInput
                  label="New Expiry Date"
                  type="date"
                  value={formData.validityDate}
                  onChange={handleChange('validityDate')}
                  required
                  error={errors.validityDate}
                />
              </div>

              {/* Route Update (Optional) */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Information (Optional Update)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSelect
                    label="Start Stop"
                    value={passData.startStop}
                    onChange={(e) => setPassData(prev => ({ ...prev, startStop: e.target.value }))}
                    options={stopOptions}
                  />

                  <FormSelect
                    label="End Stop"
                    value={passData.endStop}
                    onChange={(e) => setPassData(prev => ({ ...prev, endStop: e.target.value }))}
                    options={stopOptions}
                  />
                </div>
              </div>

              {/* Amount Display */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-green-900 font-medium">Renewal Amount:</span>
                    <p className="text-sm text-green-700">
                      {formData.validityMonths} month(s) extension
                    </p>
                  </div>
                  <span className="text-3xl font-bold text-green-900">₹{formData.amount || '0'}</span>
                </div>
              </div>

              {/* Admin Confirmation */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="renewalConfirm"
                    required
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="renewalConfirm" className="text-sm text-gray-700">
                    I confirm that I have verified the renewal request and the payment has been processed. 
                    The pass will be extended immediately upon confirmation.
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
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {loading ? 'Processing...' : 'Renew Pass'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminRenewPass;