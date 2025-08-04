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

// Admin middleware
const adminAuth = async (req, res, next) => {
  try {
    // First run regular auth
    await auth(req, res, () => {});
    
    // Check if user is admin
    if (req.userDoc.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(403).json({ error: 'Admin access denied' });
  }
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

module.exports = { auth, adminAuth, optionalAuth };
