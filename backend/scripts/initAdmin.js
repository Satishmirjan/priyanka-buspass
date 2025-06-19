const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const dotenv = require('dotenv');

dotenv.config();

const createSuperAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if super admin exists
    const superAdmin = await Admin.findOne({ role: 'super_admin' });
    
    if (superAdmin) {
      console.log('Super admin already exists');
      process.exit(0);
    }

    // Create super admin
    const admin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@buspass.com',
      password: 'admin123', // Change this in production
      role: 'super_admin',
      permissions: [
        'manage_users',
        'manage_passes',
        'manage_buses',
        'view_statistics',
        'manage_admins'
      ]
    });

    console.log('Super admin created successfully:', admin.email);
    process.exit(0);
  } catch (err) {
    console.error('Error creating super admin:', err);
    process.exit(1);
  }
};

createSuperAdmin(); 