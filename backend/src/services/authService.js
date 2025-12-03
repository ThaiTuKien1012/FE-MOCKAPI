const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthService {
  // Generate JWT tokens
  generateTokens(userId) {
    const accessToken = jwt.sign(
      { sub: userId, type: 'access' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    const refreshToken = jwt.sign(
      { sub: userId, type: 'refresh' },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    );

    return { accessToken, refreshToken };
  }

  // Register new user
  async register(userData) {
    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { userId: userData.userId }]
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const user = new User(userData);
    await user.save();

    // Generate tokens
    const tokens = this.generateTokens(user._id.toString());

    return {
      user: user.toJSON(),
      tokens
    };
  }

  // Login user
  async login(email, password) {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !await user.comparePassword(password)) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('User account is inactive');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const tokens = this.generateTokens(user._id.toString());

    return {
      user: user.toJSON(),
      tokens
    };
  }

  // Refresh access token
  async refreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      const user = await User.findById(decoded.sub);

      if (!user) {
        throw new Error('User not found');
      }

      const tokens = this.generateTokens(user._id.toString());

      return tokens;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  // Verify token
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}

module.exports = new AuthService();

