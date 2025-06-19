const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
  passId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  busNo: {
    type: String,
    required: [true, 'Please provide bus number']
  },
  startStop: {
    type: String,
    required: [true, 'Please provide start stop']
  },
  endStop: {
    type: String,
    required: [true, 'Please provide end stop']
  },
  passType: {
    type: String,
    enum: ['Student', 'Senior Citizen', 'Employee', 'General'],
    required: [true, 'Please select a pass type']
  },
  amount: {
    type: Number,
    required: [true, 'Please provide amount']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'expired'],
    default: 'pending'
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date,
    required: [true, 'Please provide validity end date']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pass', passSchema); 