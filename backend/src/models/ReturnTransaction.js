const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const returnSchema = new Schema({
  transactionId: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  lostItemId: String,
  foundItemId: String,
  matchingRequestId: String,
  studentId: String,
  securityOfficerId: String,
  campus: String,
  returnedDate: Date,
  verificationMethod: { 
    type: String, 
    enum: ['signature', 'id_check', 'otp'] 
  },
  verificationCode: String,
  items: [{
    foundItemId: String,
    condition: String,
    notes: String
  }],
  returnCertificate: String,
  photo: String,
  status: { 
    type: String, 
    enum: ['completed', 'pending', 'failed'], 
    default: 'pending' 
  },
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

module.exports = mongoose.model('ReturnTransaction', returnSchema);

