const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busId: {
    type: String,
    required: true,
    unique: true
  },
  route: {
    type: String,
    required: [true, 'Please provide route number']
  },
  startStop: {
    type: String,
    required: [true, 'Please provide start stop']
  },
  endStop: {
    type: String,
    required: [true, 'Please provide end stop']
  },
  capacity: {
    type: Number,
    required: [true, 'Please provide bus capacity']
  },
  driverName: {
    type: String,
    required: [true, 'Please provide driver name']
  },
  driverLicense: {
    type: String,
    required: [true, 'Please provide driver license']
  },
  operatingHours: {
    type: String,
    required: [true, 'Please provide operating hours']
  },
  fare: {
    type: Number,
    required: [true, 'Please provide base fare']
  },
  status: {
    type: String,
    enum: ['active', 'maintenance', 'inactive'],
    default: 'active'
  },
  currentLocation: {
    type: String,
    default: ''
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bus', busSchema); 