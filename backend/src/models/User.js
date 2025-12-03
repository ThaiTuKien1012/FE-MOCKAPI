const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true,
    maxlength: 50
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /.+\@.+\..+/,
    index: true
  },
  phone: {
    type: String,
    required: true,
    match: /^0\d{9}$/,
    maxlength: 20
  },
  role: {
    type: String,
    enum: ['student', 'staff', 'security', 'admin'],
    default: 'student',
    index: true
  },
  campus: {
    type: String,
    enum: ['NVH', 'SHTP'],
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  profileImage: String,
  lastLogin: Date,
  passwordChangedAt: Date,
  passwordHistory: [String],
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: Date
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordChangedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get user data without sensitive info
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.passwordHistory;
  return obj;
};

module.exports = mongoose.model('User', userSchema);

