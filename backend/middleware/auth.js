const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header or cookie
    let token = req.header('Authorization');
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7);
    } else {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user still exists
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ error: 'Account deactivated' });
    }

    req.user = decoded;
    req.userDoc = user;
    next();

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// Admin middleware - includes admin, moderator, and owner
const adminAuth = async (req, res, next) => {
  try {
    // First run regular auth
    await auth(req, res, () => {});
    
    // Check if user has admin privileges (admin, moderator, or owner)
    const allowedRoles = ['admin', 'moderator', 'owner'];
    if (!allowedRoles.includes(req.userDoc.role)) {
      return res.status(403).json({ 
        error: 'Admin access required',
        userRole: req.userDoc.role 
      });
    }

    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(403).json({ error: 'Admin access denied' });
  }
};

// Owner middleware - only for platform owner
const ownerAuth = async (req, res, next) => {
  try {
    // First run regular auth
    await auth(req, res, () => {});
    
    // Check if user is owner
    if (req.userDoc.role !== 'owner') {
      return res.status(403).json({ 
        error: 'Owner access required',
        userRole: req.userDoc.role 
      });
    }

    next();
  } catch (error) {
    console.error('Owner auth error:', error);
    res.status(403).json({ error: 'Owner access denied' });
  }
};

// Permission-based middleware
const requirePermission = (permission) => {
  return async (req, res, next) => {
    try {
      // First run regular auth
      await auth(req, res, () => {});
      
      // Owner has all permissions
      if (req.userDoc.role === 'owner') {
        return next();
      }

      // Check if user has specific permission
      if (!req.userDoc.permissions || !req.userDoc.permissions.includes(permission)) {
        return res.status(403).json({ 
          error: `Permission '${permission}' required`,
          userRole: req.userDoc.role,
          userPermissions: req.userDoc.permissions 
        });
      }

      next();
    } catch (error) {
      console.error('Permission auth error:', error);
      res.status(403).json({ error: 'Permission check failed' });
    }
  };
};

// Optional auth (for public routes that can benefit from user data)
const optionalAuth = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7);
    } else {
      token = req.cookies.token;
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (user && user.isActive) {
        req.user = decoded;
        req.userDoc = user;
      }
    }

    next();
  } catch (error) {
    // Ignore errors for optional auth
    next();
  }
};

module.exports = { auth, adminAuth, ownerAuth, requirePermission, optionalAuth };
