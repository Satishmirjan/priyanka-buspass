import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import { CreditCard, ArrowLeft } from 'lucide-react';

const CreatePass: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    passId: 'BP' + Date.now().toString().slice(-6),
    userId: user?.id || '',
    busNo: '',
    startStop: '',
    endStop: '',
    passType: user?.passType || '',
    amount: '',
    cardNo: '',
    cvv: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const calculateAmount = (passType: string) => {
    const amounts = {
      'Student': 150,
      'Senior Citizen': 75,
      'Employee': 200,
      'General': 250
    };
    return amounts[passType as keyof typeof amounts] || 0;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.busNo) newErrors.busNo = 'Bus number is required';
    if (!formData.startStop) newErrors.startStop = 'Start stop is required';
    if (!formData.endStop) newErrors.endStop = 'End stop is required';
    if (formData.startStop === formData.endStop) newErrors.endStop = 'Start and end stops must be different';
    if (!formData.passType) newErrors.passType = 'Pass type is required';
    if (!formData.cardNo) newErrors.cardNo = 'Card number is required';
    if (formData.cardNo.length !== 16) newErrors.cardNo = 'Card number must be 16 digits';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    if (formData.cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  React.useEffect(() => {
    if (formData.passType) {
      setFormData(prev => ({ ...prev, amount: calculateAmount(prev.passType).toString() }));
    }
  }, [formData.passType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Bus pass created successfully! Your pass will be activated within 24 hours.');
      navigate('/user/view-pass');
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
          <h1 className="text-3xl font-bold text-gray-900">Create New Pass</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Pass Application Form</h2>
            </div>
            <p className="text-gray-600">Fill in the details below to create your new bus pass.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pass Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Pass ID"
                value={formData.passId}
                onChange={handleChange('passId')}
                placeholder="Auto-generated"
                disabled
              />

              <FormInput
                label="User ID"
                value={formData.userId}
                onChange={handleChange('userId')}
                placeholder="Your user ID"
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
            </div>

            {/* Amount Display */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-900 font-medium">Monthly Pass Amount:</span>
                <span className="text-2xl font-bold text-blue-900">₹{formData.amount || '0'}</span>
              </div>
            </div>

            {/* Payment Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Card Number"
                  value={formData.cardNo}
                  onChange={handleChange('cardNo')}
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                  required
                  error={errors.cardNo}
                />

                <FormInput
                  label="CVV"
                  value={formData.cvv}
                  onChange={handleChange('cvv')}
                  placeholder="123"
                  maxLength={3}
                  required
                  error={errors.cvv}
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the <span className="text-blue-600 hover:underline cursor-pointer">terms and conditions</span> and 
                  confirm that the information provided is accurate. I understand that the pass will be activated within 24 hours 
                  of successful payment verification.
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/user/dashboard')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {loading ? 'Processing...' : 'Create Pass & Pay'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePass;