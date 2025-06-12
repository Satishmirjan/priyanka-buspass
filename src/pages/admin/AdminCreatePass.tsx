import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import { CreditCard, ArrowLeft, Plus, Search } from 'lucide-react';

const AdminCreatePass: React.FC = () => {
  const navigate = useNavigate();
  
  const [searchUserId, setSearchUserId] = useState('');
  const [userFound, setUserFound] = useState(false);
  const [userData, setUserData] = useState({
    userId: '',
    name: '',
    email: '',
    passType: ''
  });
  
  const [formData, setFormData] = useState({
    passId: 'BP' + Date.now().toString().slice(-6),
    userId: '',
    busNo: '',
    startStop: '',
    endStop: '',
    passType: '',
    amount: '',
    validityMonths: '1'
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock user data
  const mockUsers = {
    'USR001': {
      userId: 'USR001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      passType: 'Student'
    },
    'USR002': {
      userId: 'USR002',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      passType: 'Senior Citizen'
    }
  };

  const passTypeOptions = [
    { value: 'Student', label: 'Student - ₹150/month' },
    { value: 'Senior Citizen', label: 'Senior Citizen - ₹75/month' },
    { value: 'Employee', label: 'Employee - ₹200/month' },
    { value: 'General', label: 'General - ₹250/month' }
  ];

  const busOptions = [
    { value: '25A', label: 'Bus 25A - Central to University' },
    { value: '42B', label: 'Bus 42B - Mall to Airport' },
    { value: '18C', label: 'Bus 18C - Station to Hospital' },
    { value: '33D', label: 'Bus 33D - Downtown to Suburb' }
  ];

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

  const handleSearchUser = () => {
    const user = mockUsers[searchUserId as keyof typeof mockUsers];
    if (user) {
      setUserData(user);
      setFormData(prev => ({
        ...prev,
        userId: user.userId,
        passType: user.passType,
        amount: calculateAmount(user.passType, prev.validityMonths).toString()
      }));
      setUserFound(true);
      setErrors({});
    } else {
      alert('User not found. Try USR001 or USR002 for demo.');
      setUserFound(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!userFound) newErrors.userId = 'Please search and select a valid user';
    if (!formData.busNo) newErrors.busNo = 'Bus number is required';
    if (!formData.startStop) newErrors.startStop = 'Start stop is required';
    if (!formData.endStop) newErrors.endStop = 'End stop is required';
    if (formData.startStop === formData.endStop) newErrors.endStop = 'Start and end stops must be different';
    if (!formData.passType) newErrors.passType = 'Pass type is required';
    if (!formData.validityMonths) newErrors.validityMonths = 'Validity period is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  React.useEffect(() => {
    if (formData.passType && formData.validityMonths) {
      setFormData(prev => ({ 
        ...prev, 
        amount: calculateAmount(prev.passType, prev.validityMonths).toString() 
      }));
    }
  }, [formData.passType, formData.validityMonths]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Bus pass created successfully for ${userData.name}! Pass ID: ${formData.passId}`);
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Failed to create pass. Please try again.');
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
          <h1 className="text-3xl font-bold text-gray-900">Create Pass (Admin)</h1>
        </div>

        {/* User Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Find User</h2>
            </div>
            <p className="text-gray-600">Search for the user to create a pass for.</p>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <FormInput
                label="User ID"
                value={searchUserId}
                onChange={(e) => setSearchUserId(e.target.value)}
                placeholder="Enter User ID (e.g., USR001)"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearchUser}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
            <p className="font-medium">Demo User IDs:</p>
            <p>USR001 - John Doe (Student)</p>
            <p>USR002 - Jane Smith (Senior Citizen)</p>
          </div>

          {/* User Info Display */}
          {userFound && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">User Found</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
                <div>
                  <p><strong>User ID:</strong> {userData.userId}</p>
                  <p><strong>Name:</strong> {userData.name}</p>
                </div>
                <div>
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Pass Type:</strong> {userData.passType}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pass Creation Form */}
        {userFound && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Create Pass for {userData.name}</h2>
              </div>
              <p className="text-gray-600">Fill in the pass details below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Pass Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Pass ID"
                  value={formData.passId}
                  onChange={handleChange('passId')}
                  disabled
                />

                <FormInput
                  label="User ID"
                  value={formData.userId}
                  onChange={handleChange('userId')}
                  disabled
                />

                <FormSelect
                  label="Bus Number"
                  value={formData.busNo}
                  onChange={handleChange('busNo')}
                  options={busOptions}
                  required
                  error={errors.busNo}
                />

                <FormSelect
                  label="Pass Type"
                  value={formData.passType}
                  onChange={handleChange('passType')}
                  options={passTypeOptions}
                  required
                  error={errors.passType}
                />

                <FormSelect
                  label="Start Stop"
                  value={formData.startStop}
                  onChange={handleChange('startStop')}
                  options={stopOptions}
                  required
                  error={errors.startStop}
                />

                <FormSelect
                  label="End Stop"
                  value={formData.endStop}
                  onChange={handleChange('endStop')}
                  options={stopOptions}
                  required
                  error={errors.endStop}
                />

                <FormSelect
                  label="Validity Period"
                  value={formData.validityMonths}
                  onChange={handleChange('validityMonths')}
                  options={validityOptions}
                  required
                  error={errors.validityMonths}
                />
              </div>

              {/* Amount Display */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-green-900 font-medium">Total Amount:</span>
                    <p className="text-sm text-green-700">
                      {formData.validityMonths} month(s) × ₹{formData.passType ? calculateAmount(formData.passType, '1') : 0}/month
                    </p>
                  </div>
                  <span className="text-3xl font-bold text-green-900">₹{formData.amount || '0'}</span>
                </div>
              </div>

              {/* Admin Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="adminConfirm"
                    required
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="adminConfirm" className="text-sm text-gray-700">
                    I confirm that I have verified the user's identity and eligibility for this pass type. 
                    The pass will be activated immediately upon creation.
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
                  <Plus className="h-4 w-4 mr-2" />
                  {loading ? 'Creating Pass...' : 'Create Pass'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminCreatePass;