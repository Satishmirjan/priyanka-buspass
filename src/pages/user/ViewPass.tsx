import React from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, MapPin, Calendar, Clock, Bus, Download, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const ViewPass: React.FC = () => {
  const { user } = useAuth();

  // Mock pass data
  const passData = {
    passId: 'BP001',
    userId: user?.id,
    busNo: '25A',
    startStop: 'Central Station',
    endStop: 'University Campus',
    passType: user?.passType,
    amount: 150,
    cardNo: '**** **** **** 1234',
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    status: 'Active',
    issueDate: '2024-01-01',
    remainingDays: 45
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout userType="user">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Pass Details</h1>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Download Pass
            </button>
            <Link
              to="/user/renew-pass"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Renew Pass
            </Link>
          </div>
        </div>

        {/* Pass Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white p-8 shadow-xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Digital Bus Pass</h2>
              <p className="text-blue-100">City Transport Authority</p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Pass ID</p>
              <p className="text-xl font-bold">{passData.passId}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-blue-100 text-sm">Passenger Name</p>
              <p className="text-lg font-semibold">{user?.name}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Pass Type</p>
              <p className="text-lg font-semibold capitalize">{passData.passType}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Route</p>
              <p className="text-lg font-semibold">{passData.startStop} ↔ {passData.endStop}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Bus Number</p>
              <p className="text-lg font-semibold">{passData.busNo}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100 text-sm">Valid Until</p>
              <p className="text-lg font-semibold">{passData.validUntil}</p>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(passData.status)}`}>
                {passData.status}
              </span>
            </div>
          </div>
        </div>

        {/* Pass Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pass Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pass ID</p>
                  <p className="text-gray-900">{passData.passId}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Bus className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Bus Number</p>
                  <p className="text-gray-900">{passData.busNo}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Route</p>
                  <p className="text-gray-900">{passData.startStop} to {passData.endStop}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pass Type</p>
                  <p className="text-gray-900 capitalize">{passData.passType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Validity Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Validity Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Issue Date</p>
                  <p className="text-gray-900">{passData.issueDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Valid From</p>
                  <p className="text-gray-900">{passData.validFrom}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Valid Until</p>
                  <p className="text-gray-900">{passData.validUntil}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Days Remaining</p>
                  <p className="text-gray-900 font-semibold">{passData.remainingDays} days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Amount Paid</p>
              <p className="text-2xl font-bold text-gray-900">₹{passData.amount}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Payment Method</p>
              <p className="text-gray-900">Credit Card ({passData.cardNo})</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Transaction Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Paid
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/user/renew-pass"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Renew Pass
            </Link>
            <button className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
            <Link
              to="/user/create-pass"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Create New Pass
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewPass;