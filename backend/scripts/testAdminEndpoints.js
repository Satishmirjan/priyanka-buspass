const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_URL = 'http://localhost:5000/api';
let adminToken;

const testAdminEndpoints = async () => {
  try {
    // 1. Login as super admin
    console.log('\n1. Testing admin login...');
    const loginResponse = await axios.post(`${API_URL}/admin-auth/login`, {
      email: 'admin@buspass.com',
      password: 'admin123'
    });
    adminToken = loginResponse.data.token;
    console.log('Login successful!');

    // 2. Get admin profile
    console.log('\n2. Testing get admin profile...');
    const profileResponse = await axios.get(`${API_URL}/admin/profile`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('Profile retrieved:', profileResponse.data);

    // 3. Update admin profile
    console.log('\n3. Testing update admin profile...');
    const updateProfileResponse = await axios.put(
      `${API_URL}/admin/profile`,
      {
        name: 'Updated Admin Name',
        email: 'admin@buspass.com'
      },
      {
        headers: { Authorization: `Bearer ${adminToken}` }
      }
    );
    console.log('Profile updated:', updateProfileResponse.data);

    // 4. Change admin password
    console.log('\n4. Testing change admin password...');
    const changePasswordResponse = await axios.put(
      `${API_URL}/admin/change-password`,
      {
        currentPassword: 'admin123',
        newPassword: 'newadmin123'
      },
      {
        headers: { Authorization: `Bearer ${adminToken}` }
      }
    );
    console.log('Password changed:', changePasswordResponse.data);

    // 5. Get all users
    console.log('\n5. Testing get all users...');
    const usersResponse = await axios.get(`${API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('Users retrieved:', usersResponse.data);

    // 6. Get user details with passes
    if (usersResponse.data.data.length > 0) {
      const userId = usersResponse.data.data[0]._id;
      console.log('\n6. Testing get user details...');
      const userDetailsResponse = await axios.get(`${API_URL}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      console.log('User details retrieved:', userDetailsResponse.data);

      // 7. Update user status
      console.log('\n7. Testing update user status...');
      const updateStatusResponse = await axios.patch(
        `${API_URL}/admin/users/${userId}/status`,
        {
          status: 'active'
        },
        {
          headers: { Authorization: `Bearer ${adminToken}` }
        }
      );
      console.log('User status updated:', updateStatusResponse.data);
    }

    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.response?.data || error.message);
  }
};

testAdminEndpoints(); 