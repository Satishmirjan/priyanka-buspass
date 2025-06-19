const express = require('express');
const router = express.Router();
const Pass = require('../models/Pass');
const { protect, authorize } = require('../middleware/auth');

// Create new pass
router.post('/', protect, async (req, res) => {
  try {
    const { busNo, startStop, endStop, passType, amount, validUntil } = req.body;

    const pass = await Pass.create({
      passId: 'BP' + Date.now().toString().slice(-6),
      userId: req.user.id,
      busNo,
      startStop,
      endStop,
      passType,
      amount,
      validUntil
    });

    res.status(201).json({
      success: true,
      data: pass
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get user's passes
router.get('/my-passes', protect, async (req, res) => {
  try {
    const passes = await Pass.find({ userId: req.user.id })
      .sort('-createdAt');

    res.json({
      success: true,
      count: passes.length,
      data: passes
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get single pass
router.get('/:id', protect, async (req, res) => {
  try {
    const pass = await Pass.findById(req.params.id);

    if (!pass) {
      return res.status(404).json({ message: 'Pass not found' });
    }

    // Check if user owns the pass or is an admin
    if (pass.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to access this pass' });
    }

    res.json({
      success: true,
      data: pass
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update pass status (admin only)
router.patch('/:id/status', protect, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.body;

    const pass = await Pass.findById(req.params.id);

    if (!pass) {
      return res.status(404).json({ message: 'Pass not found' });
    }

    pass.status = status;
    await pass.save();

    res.json({
      success: true,
      data: pass
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all passes (admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const passes = await Pass.find()
      .populate('userId', 'name email')
      .sort('-createdAt');

    res.json({
      success: true,
      count: passes.length,
      data: passes
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 