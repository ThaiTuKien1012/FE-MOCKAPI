const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auditSchema = new Schema({
  userId: { 
    type: String, 
    index: true 
  },
  userName: String,
  userRole: String,
  action: String,
  actionType: { 
    type: String, 
    enum: ['CREATE', 'READ', 'UPDATE', 'DELETE'], 
    index: true 
  },
  entityType: String,
  entityId: { 
    type: String, 
    index: true 
  },
  description: String,
  changes: {
    before: Schema.Types.Mixed,
    after: Schema.Types.Mixed
  },
  ipAddress: String,
  userAgent: String,
  status: { 
    type: String, 
    enum: ['success', 'failure'], 
    default: 'success' 
  },
  errorMessage: String,
  timestamp: { 
    type: Date, 
    default: Date.now, 
    index: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditSchema);

