const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchingSchema = new Schema({
  requestId: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  lostItemId: { 
    type: String, 
    required: false, 
    index: true, 
    default: null 
  },
  foundItemId: { 
    type: String, 
    required: true, 
    index: true 
  },
  studentId: { 
    type: String, 
    required: true, 
    index: true 
  },
  staffId: { 
    type: String, 
    required: true, 
    index: true 
  },
  matchReason: String,
  notes: String,
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'rejected', 'resolved'], 
    default: 'pending', 
    index: true 
  },
  studentResponse: String,
  studentResponseNote: String,
  confirmedAt: Date,
  resolvedAt: Date,
  createdAt: { 
    type: Date, 
    default: Date.now, 
    index: true 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('MatchingRequest', matchingSchema);

