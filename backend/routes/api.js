const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const userRoutes = require('./users');
const aiRoutes = require('./ai');
const marketplaceRoutes = require('./marketplace');
const adminRoutes = require('./admin');

// Use route modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/ai', aiRoutes);
router.use('/marketplace', marketplaceRoutes);
router.use('/admin', adminRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'M7RNetworking API',
    version: '1.0.0',
    tagline: 'Build Identity. Tell Your Story. Create Independence.',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      ai: '/api/ai',
      marketplace: '/api/marketplace',
      admin: '/api/admin'
    },
    documentation: 'https://docs.m7rnetworking.com',
    status: 'active'
  });
});

module.exports = router;