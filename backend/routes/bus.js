const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');
const { protect, authorize } = require('../middleware/auth');

// Create new bus
router.post('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const {
      route,
      startStop,
      endStop,
      capacity,
      driverName,
      driverLicense,
      operatingHours,
      fare
    } = req.body;

    const bus = await Bus.create({
      busId: 'BUS' + Date.now().toString().slice(-4),
      route,
      startStop,
      endStop,
      capacity,
      driverName,
      driverLicense,
      operatingHours,
      fare,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: bus
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all buses with pagination and search
router.get('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const status = req.query.status || '';

    const query = {};
    if (search) {
      query.$or = [
        { route: { $regex: search, $options: 'i' } },
        { driverName: { $regex: search, $options: 'i' } },
        { busId: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) {
      query.status = status;
    }

    const buses = await Bus.find(query)
      .populate('createdBy', 'name email')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort('-createdAt');

    const total = await Bus.countDocuments(query);

    res.json({
      success: true,
      count: buses.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: buses
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get single bus
router.get('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    res.json({
      success: true,
      data: bus
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update bus
router.put('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const {
      route,
      startStop,
      endStop,
      capacity,
      driverName,
      driverLicense,
      operatingHours,
      fare,
      status,
      currentLocation
    } = req.body;

    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    // Update fields
    if (route) bus.route = route;
    if (startStop) bus.startStop = startStop;
    if (endStop) bus.endStop = endStop;
    if (capacity) bus.capacity = capacity;
    if (driverName) bus.driverName = driverName;
    if (driverLicense) bus.driverLicense = driverLicense;
    if (operatingHours) bus.operatingHours = operatingHours;
    if (fare) bus.fare = fare;
    if (status) bus.status = status;
    if (currentLocation) bus.currentLocation = currentLocation;

    bus.lastUpdated = Date.now();
    await bus.save();

    res.json({
      success: true,
      data: bus
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete bus
router.delete('/:id', protect, authorize('super_admin'), async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    await bus.remove();

    res.json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get bus statistics
router.get('/statistics/overview', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const totalBuses = await Bus.countDocuments();
    const activeBuses = await Bus.countDocuments({ status: 'active' });
    const maintenanceBuses = await Bus.countDocuments({ status: 'maintenance' });
    const inactiveBuses = await Bus.countDocuments({ status: 'inactive' });

    const routeStats = await Bus.aggregate([
      {
        $group: {
          _id: '$route',
          count: { $sum: 1 },
          totalCapacity: { $sum: '$capacity' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalBuses,
        activeBuses,
        maintenanceBuses,
        inactiveBuses,
        routeStats
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 