import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import { Bus, ArrowLeft, Plus } from 'lucide-react';

const AddBus: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    busId: 'BUS' + Date.now().toString().slice(-4),
    route: '',
    startStop: '',
    endStop: '',
    capacity: '',
    driverName: '',
    driverLicense: '',
    operatingHours: '',
    fare: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const routeOptions = [
    { value: 'Route 25A', label: 'Route 25A' },
    { value: 'Route 42B', label: 'Route 42B' },
    { value: 'Route 18C', label: 'Route 18C' },
    { value: 'Route 33D', label: 'Route 33D' },
    { value: 'Route 56E', label: 'Route 56E' }
  ];

  const stopOptions = [
    { value: 'Central Station', label: 'Central Station' },
    { value: 'University Campus', label: 'University Campus' },
    { value: 'City Mall', label: 'City Mall' },
    { value: 'Airport Terminal', label: 'Airport Terminal' },
    { value: 'General Hospital', label: 'General Hospital' },
    { value: 'Downtown Plaza', label: 'Downtown Plaza' },
    { value: 'Suburban Center', label: 'Suburban Center' },
    { value: 'Tech Park', label: 'Tech Park' },
    { value: 'Sports Complex', label: 'Sports Complex' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.route) newErrors.route = 'Route is required';
    if (!formData.startStop) newErrors.startStop = 'Start stop is required';
    if (!formData.endStop) newErrors.endStop = 'End stop is required';
    if (formData.startStop === formData.endStop) newErrors.endStop = 'Start and end stops must be different';
    if (!formData.capacity || parseInt(formData.capacity) < 1) newErrors.capacity = 'Valid capacity is required';
    if (!formData.driverName.trim()) newErrors.driverName = 'Driver name is required';
    if (!formData.driverLicense.trim()) newErrors.driverLicense = 'Driver license is required';
    if (!formData.operatingHours.trim()) newErrors.operatingHours = 'Operating hours are required';
    if (!formData.fare || parseFloat(formData.fare) < 0) newErrors.fare = 'Valid fare is required';
    
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
      
      alert('Bus added successfully! The new bus route is now available in the system.');
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Failed to add bus. Please try again.');
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
          <h1 className="text-3xl font-bold text-gray-900">Add New Bus</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Bus className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Bus Registration Form</h2>
            </div>
            <p className="text-gray-600">Enter the details for the new bus route.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Bus ID"
                value={formData.busId}
                onChange={handleChange('busId')}
                placeholder="Auto-generated"
                disabled
              />

              <FormSelect
                label="Route"
                value={formData.route}
                onChange={handleChange('route')}
                options={routeOptions}
                required
                error={errors.route}
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

              <FormInput
                label="Capacity (Passengers)"
                type="number"
                value={formData.capacity}
                onChange={handleChange('capacity')}
                placeholder="e.g., 50"
                required
                error={errors.capacity}
              />

              <FormInput
                label="Base Fare (₹)"
                type="number"
                step="0.01"
                value={formData.fare}
                onChange={handleChange('fare')}
                placeholder="e.g., 25.00"
                required
                error={errors.fare}
              />
            </div>

            {/* Driver Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Driver Name"
                  value={formData.driverName}
                  onChange={handleChange('driverName')}
                  placeholder="Enter driver's full name"
                  required
                  error={errors.driverName}
                />

                <FormInput
                  label="Driver License Number"
                  value={formData.driverLicense}
                  onChange={handleChange('driverLicense')}
                  placeholder="Enter license number"
                  required
                  error={errors.driverLicense}
                />
              </div>
            </div>

            {/* Operating Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Operating Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Operating Hours"
                  value={formData.operatingHours}
                  onChange={handleChange('operatingHours')}
                  placeholder="e.g., 6:00 AM - 10:00 PM"
                  required
                  error={errors.operatingHours}
                />
              </div>
            </div>

            {/* Route Preview */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Route Preview</h3>
              <div className="text-sm text-blue-800">
                <p><strong>Route:</strong> {formData.route || 'Not selected'}</p>
                <p><strong>Path:</strong> {formData.startStop || 'Start'} → {formData.endStop || 'End'}</p>
                <p><strong>Capacity:</strong> {formData.capacity || '0'} passengers</p>
                <p><strong>Fare:</strong> ₹{formData.fare || '0'}</p>
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
                {loading ? 'Adding Bus...' : 'Add Bus'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddBus;