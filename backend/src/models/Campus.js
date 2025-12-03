const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campusSchema = new Schema({
  campusCode: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  campusName: { 
    type: String, 
    required: true 
  },
  address: String,
  phone: String,
  email: String,
  manager: { 
    userId: String, 
    name: String 
  },
  securityOfficers: [{ 
    userId: String, 
    name: String 
  }],
  warehouseLocation: String,
  warehouseCapacity: Number,
  currentItems: { 
    type: Number, 
    default: 0 
  },
  coordinates: { 
    lat: Number, 
    lng: Number 
  },
  isActive: { 
    type: Boolean, 
    default: true, 
    index: true 
  },
  workingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('Campus', campusSchema);

