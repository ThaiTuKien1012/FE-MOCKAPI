const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foundItemSchema = new Schema({
  foundId: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  securityOfficerId: { 
    type: String, 
    required: true 
  },
  itemName: { 
    type: String, 
    required: true, 
    maxlength: 100 
  },
  description: { 
    type: String, 
    required: true, 
    maxlength: 1000 
  },
  category: { 
    type: String, 
    enum: ['PHONE', 'WALLET', 'BAG', 'LAPTOP', 'WATCH', 'BOOK', 'KEYS', 'OTHER'], 
    required: true,
    index: true
  },
  color: { 
    type: String, 
    required: true, 
    maxlength: 50 
  },
  campus: { 
    type: String, 
    enum: ['NVH', 'SHTP'], 
    required: true, 
    index: true 
  },
  images: [String],
  status: { 
    type: String, 
    enum: ['unclaimed', 'matched', 'returned', 'disposed'], 
    default: 'unclaimed', 
    index: true 
  },
  condition: { 
    type: String, 
    enum: ['excellent', 'good', 'slightly_damaged', 'damaged'], 
    required: true 
  },
  dateFound: { 
    type: Date, 
    required: true, 
    index: true 
  },
  locationFound: { 
    type: String, 
    required: true, 
    maxlength: 200 
  },
  warehouseLocation: { 
    type: String, 
    maxlength: 200 
  },
  notes: String,
  returnedToStudent: {
    studentId: String,
    returnedDate: Date,
    returnedBy: String
  },
  matchedWithLostId: String,
  matchedAt: Date,
  searchTags: [String],
  viewCount: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    index: true 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  expiresAt: { 
    type: Date, 
    default: () => new Date(+new Date() + 30*24*60*60*1000) 
  }
}, { timestamps: true });

// Text index for search
foundItemSchema.index({ itemName: 'text', description: 'text', searchTags: 'text' });

module.exports = mongoose.model('FoundItem', foundItemSchema);

