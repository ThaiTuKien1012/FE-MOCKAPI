const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryCode: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  categoryName: { 
    type: String, 
    required: true 
  },
  description: String,
  icon: String,
  priority: Number,
  commonColors: [String],
  commonFeatures: [String],
  isActive: { 
    type: Boolean, 
    default: true 
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

module.exports = mongoose.model('ItemCategory', categorySchema);

