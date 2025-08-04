const express = require('express');
const { adminAuth, auth, ownerAuth } = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const router = express.Router();

// Dashboard stats endpoint for frontend
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments(),
      activeUsers: await User.countDocuments({ isActive: true }),
      premiumUsers: await User.countDocuments({ 'subscription.plan': { $ne: 'free' } }),
      adminUsers: await User.countDocuments({ role: { $in: ['admin', 'moderator', 'owner'] } }),
      newUsersToday: await User.countDocuments({ 
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
      })
    };

    res.json({
      message: 'Dashboard stats retrieved',
      stats,
      userRole: req.userDoc.role,
      permissions: req.userDoc.permissions
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to retrieve dashboard stats' });
  }
});

// Admin dashboard stats
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    // User stats
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });

    // Subscription stats
    const subscriptionStats = await User.aggregate([
      { $group: { _id: '$subscription.plan', count: { $sum: 1 } } }
    ]);

    // Product stats
    const totalProducts = await Product.countDocuments();
    const pendingProducts = await Product.countDocuments({ isApproved: false });

    // Order stats
    const orderStats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          platformRevenue: { $sum: '$platformFee' }
        }
      }
    ]);

    const stats = orderStats[0] || { totalOrders: 0, totalRevenue: 0, platformRevenue: 0 };

    // AI usage stats
    const aiStats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalWebsites: { $sum: '$aiUsage.websitesGenerated' },
          totalContent: { $sum: '$aiUsage.contentGenerated' },
          totalLogos: { $sum: '$aiUsage.logosGenerated' }
        }
      }
    ]);

    const aiUsage = aiStats[0] || { totalWebsites: 0, totalContent: 0, totalLogos: 0 };

    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        newThisMonth: newUsersThisMonth,
        subscriptions: subscriptionStats
      },
      products: {
        total: totalProducts,
        pending: pendingProducts
      },
      revenue: {
        totalOrders: stats.totalOrders,
        totalRevenue: stats.totalRevenue,
        platformRevenue: stats.platformRevenue
      },
      aiUsage
    });

  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search, 
      status, 
      subscription 
    } = req.query;

    const query = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) {
      query.isActive = status === 'active';
    }

    if (subscription) {
      query['subscription.plan'] = subscription;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalUsers: total
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single user details
router.get('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get user's products
    const products = await Product.find({ vendor: user._id }).limit(10);
    
    // Get user's orders
    const orders = await Order.find({ customer: user._id }).limit(10);

    res.json({
      user,
      products,
      orders
    });

  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user status
router.put('/users/:id/status', adminAuth, async (req, res) => {
  try {
    const { isActive } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user
    });

  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get pending products for approval
router.get('/products/pending', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find({ isApproved: false })
      .populate('vendor', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments({ isApproved: false });

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProducts: total
      }
    });

  } catch (error) {
    console.error('Get pending products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Approve/reject product
router.put('/products/:id/approval', adminAuth, async (req, res) => {
  try {
    const { isApproved, rejectionReason } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { 
        isApproved,
        status: isApproved ? 'active' : 'inactive',
        rejectionReason: isApproved ? undefined : rejectionReason
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      message: `Product ${isApproved ? 'approved' : 'rejected'} successfully`,
      product
    });

  } catch (error) {
    console.error('Product approval error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get platform analytics
router.get('/analytics', adminAuth, async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    let dateFilter;
    switch (period) {
      case '7d':
        dateFilter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        dateFilter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        dateFilter = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        dateFilter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    // User registrations over time
    const userRegistrations = await User.aggregate([
      { $match: { createdAt: { $gte: dateFilter } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Revenue over time
    const revenueData = await Order.aggregate([
      { $match: { createdAt: { $gte: dateFilter }, status: 'completed' } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$total" },
          platformFee: { $sum: "$platformFee" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // AI usage over time
    const aiUsageData = await User.aggregate([
      {
        $group: {
          _id: null,
          totalWebsites: { $sum: "$aiUsage.websitesGenerated" },
          totalContent: { $sum: "$aiUsage.contentGenerated" },
          totalLogos: { $sum: "$aiUsage.logosGenerated" }
        }
      }
    ]);

    // Top products
    const topProducts = await Product.aggregate([
      { $match: { status: 'active' } },
      { $sort: { purchases: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users',
          localField: 'vendor',
          foreignField: '_id',
          as: 'vendor'
        }
      },
      { $unwind: '$vendor' },
      {
        $project: {
          title: 1,
          purchases: 1,
          revenue: 1,
          'vendor.firstName': 1,
          'vendor.lastName': 1
        }
      }
    ]);

    res.json({
      userRegistrations,
      revenueData,
      aiUsage: aiUsageData[0] || { totalWebsites: 0, totalContent: 0, totalLogos: 0 },
      topProducts
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Send platform announcement
router.post('/announcements', adminAuth, async (req, res) => {
  try {
    const { title, message, targetAudience = 'all' } = req.body;
    
    let userQuery = { isActive: true };
    
    if (targetAudience !== 'all') {
      userQuery['subscription.plan'] = targetAudience;
    }

    const users = await User.find(userQuery).select('email firstName');
    
    // TODO: Implement email sending logic
    console.log(`Sending announcement "${title}" to ${users.length} users`);

    res.json({
      message: 'Announcement sent successfully',
      recipientCount: users.length
    });

  } catch (error) {
    console.error('Send announcement error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Owner/Admin status check
router.get('/owner-status', auth, async (req, res) => {
  try {
    const isOwner = req.userDoc.role === 'owner';
    const isAdmin = ['admin', 'moderator', 'owner'].includes(req.userDoc.role);

    res.json({
      isOwner,
      isAdmin,
      role: req.userDoc.role,
      permissions: req.userDoc.permissions || [],
      user: {
        email: req.userDoc.email,
        name: `${req.userDoc.firstName} ${req.userDoc.lastName}`,
        subscription: req.userDoc.subscription
      },
      platform: {
        name: 'M7RNetworking',
        tagline: 'Build Identity. Tell Your Story. Create Independence.'
      }
    });

  } catch (error) {
    console.error('Owner status error:', error);
    res.status(500).json({ error: 'Failed to check owner status' });
  }
});

// Update platform settings
router.put('/settings', adminAuth, async (req, res) => {
  try {
    const { platformFee, aiLimits, maintenanceMode } = req.body;
    
    // TODO: Implement platform settings storage
    // For now, just acknowledge the request
    
    res.json({
      message: 'Platform settings updated successfully',
      settings: {
        platformFee,
        aiLimits,
        maintenanceMode
      }
    });

  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
