const authService = require('../services/authService');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'No token provided'
      }
    });
  }

  const decoded = authService.verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Invalid token'
      }
    });
  }

  req.userId = decoded.sub;
  next();
};

const roleCheck = (...roles) => {
  return async (req, res, next) => {
    try {
      const User = require('../models/User');
      const user = await User.findById(req.userId);

      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'Access denied',
            requiredRole: roles.join(', ')
          }
        });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
};

module.exports = { authenticateToken, roleCheck };

