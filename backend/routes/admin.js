const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Pass = require('../models/Pass');
const Admin = require('../models/Admin');
const { protect, authorize } = require('../middleware/auth');

// Get all users with pagination and search
router.get('/users', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    };

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      count: users.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get user by ID with their passes
router.get('/users/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const passes = await Pass.find({ user: req.params.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        user,
        passes
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Update user status
router.patch('/users/:id/status', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    user.status = req.body.status;
    await user.save();

    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get admin profile
router.get('/profile', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    if (!admin) {
      return res.status(404).json({
        success: false,
        error: 'Admin not found'
      });
    }
    res.json({
      success: true,
      data: admin
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Update admin profile
router.put('/profile', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { name, email } = req.body;
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: 'Admin not found'
      });
    }

    // Check if email is already taken by another admin
    if (email && email !== admin.email) {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          error: 'Email already in use'
        });
      }
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;
    await admin.save();

    res.json({
      success: true,
      data: admin
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Change admin password
router.put('/change-password', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.user.id).select('+password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: 'Admin not found'
      });
    }

    // Check current password
    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get pending passes with pagination
router.get('/pending-passes', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const passes = await Pass.find({ status: 'pending' })
      .populate('user', 'name email')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort('-createdAt');

    const total = await Pass.countDocuments({ status: 'pending' });

    res.json({
      success: true,
      count: passes.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: passes
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get pass statistics with date range
router.get('/statistics', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const totalPasses = await Pass.countDocuments(query);
    const pendingPasses = await Pass.countDocuments({ ...query, status: 'pending' });
    const approvedPasses = await Pass.countDocuments({ ...query, status: 'approved' });
    const rejectedPasses = await Pass.countDocuments({ ...query, status: 'rejected' });
    const expiredPasses = await Pass.countDocuments({ ...query, status: 'expired' });

    const passTypeStats = await Pass.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$passType',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalPasses,
        pendingPasses,
        approvedPasses,
        rejectedPasses,
        expiredPasses,
        passTypeStats
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get admin activity log
router.get('/activity-log', protect, authorize('super_admin'), async (req, res) => {
  try {
    const admins = await Admin.find()
      .select('name email role lastLogin createdAt')
      .sort('-lastLogin');

    res.json({
      success: true,
      count: admins.length,
      data: admins
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get system overview
router.get('/overview', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPasses = await Pass.countDocuments();
    const totalRevenue = await Pass.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const recentPasses = await Pass.find()
      .populate('userId', 'name email')
      .sort('-createdAt')
      .limit(5);

    const recentUsers = await User.find()
      .select('name email createdAt')
      .sort('-createdAt')
      .limit(5);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalPasses,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentPasses,
        recentUsers
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 