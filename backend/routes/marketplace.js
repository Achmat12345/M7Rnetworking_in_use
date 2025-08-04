const express = require('express');
const { auth, optionalAuth } = require('../middleware/auth');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

const router = express.Router();

// Get all products (public)
router.get('/products', optionalAuth, async (req, res) => {
  try {
    const { 
      category, 
      search, 
      minPrice, 
      maxPrice, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      page = 1, 
      limit = 20 
    } = req.query;

    const query = { status: 'active', isApproved: true };
    
    // Apply filters
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const products = await Product.find(query)
      .populate('vendor', 'firstName lastName username profilePicture marketplace.rating')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProducts: total,
        hasNext: skip + products.length < total,
        hasPrev: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single product
router.get('/products/:id', optionalAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('vendor', 'firstName lastName username profilePicture marketplace bio socialLinks');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Increment view count
    product.views += 1;
    await product.save();

    res.json({ product });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create product (vendors only)
router.post('/products', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    // Enable vendor status if not already
    if (!user.marketplace.isVendor) {
      user.marketplace.isVendor = true;
      await user.save();
    }

    const productData = {
      ...req.body,
      vendor: req.user.userId,
      vendorName: user.fullName
    };

    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update product
router.put('/products/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      vendor: req.user.userId
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json({
      message: 'Product updated successfully',
      product
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete product
router.delete('/products/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      vendor: req.user.userId
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get vendor's products
router.get('/vendor/products', auth, async (req, res) => {
  try {
    const { status = 'all', page = 1, limit = 10 } = req.query;
    
    const query = { vendor: req.user.userId };
    if (status !== 'all') {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProducts: total
      }
    });

  } catch (error) {
    console.error('Get vendor products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create order
router.post('/orders', auth, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    
    // Validate and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ error: `Product ${item.productId} not found` });
      }

      const itemTotal = product.currentPrice * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        productTitle: product.title,
        quantity: item.quantity,
        price: product.currentPrice,
        vendor: product.vendor
      });
    }

    const order = new Order({
      customer: req.user.userId,
      customerEmail: req.userDoc.email,
      items: orderItems,
      subtotal,
      shippingAddress,
      isDigital: orderItems.every(item => item.type === 'digital')
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order,
      paymentRequired: true
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's orders
router.get('/orders', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = { customer: req.user.userId };
    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const orders = await Order.find(query)
      .populate('items.product', 'title thumbnail type')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalOrders: total
      }
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get vendor's sales
router.get('/vendor/sales', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = { 'items.vendor': req.user.userId };
    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const orders = await Order.find(query)
      .populate('customer', 'firstName lastName email')
      .populate('items.product', 'title thumbnail')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Filter items to only show vendor's products
    const salesData = orders.map(order => ({
      ...order.toObject(),
      items: order.items.filter(item => item.vendor.toString() === req.user.userId)
    }));

    res.json({
      sales: salesData,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(orders.length / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get vendor sales error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get marketplace categories
router.get('/categories', (req, res) => {
  const categories = [
    { id: 'digital-products', name: 'Digital Products', description: 'Downloadable digital goods' },
    { id: 'courses', name: 'Online Courses', description: 'Educational content and training' },
    { id: 'templates', name: 'Templates', description: 'Website, design, and document templates' },
    { id: 'ebooks', name: 'E-books', description: 'Digital books and guides' },
    { id: 'software', name: 'Software', description: 'Applications and tools' },
    { id: 'consulting', name: 'Consulting', description: 'Professional services and advice' },
    { id: 'design-services', name: 'Design Services', description: 'Graphic design and creative services' },
    { id: 'marketing-services', name: 'Marketing Services', description: 'Marketing and promotion services' },
    { id: 'physical-products', name: 'Physical Products', description: 'Tangible goods' },
    { id: 'other', name: 'Other', description: 'Miscellaneous products and services' }
  ];

  res.json({ categories });
});

// Get vendor dashboard stats
router.get('/vendor/dashboard', auth, async (req, res) => {
  try {
    const vendorId = req.user.userId;
    
    // Get product stats
    const totalProducts = await Product.countDocuments({ vendor: vendorId });
    const activeProducts = await Product.countDocuments({ vendor: vendorId, status: 'active' });
    
    // Get sales stats
    const salesAggregation = await Order.aggregate([
      { $unwind: '$items' },
      { $match: { 'items.vendor': vendorId, status: 'completed' } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$items.price' },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    const salesStats = salesAggregation[0] || { totalSales: 0, totalOrders: 0 };

    // Get recent orders
    const recentOrders = await Order.find({ 'items.vendor': vendorId })
      .populate('customer', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalProducts,
        activeProducts,
        totalSales: salesStats.totalSales,
        totalOrders: salesStats.totalOrders
      },
      recentOrders: recentOrders.map(order => ({
        id: order._id,
        orderNumber: order.orderNumber,
        customer: order.customer,
        total: order.items
          .filter(item => item.vendor.toString() === vendorId)
          .reduce((sum, item) => sum + item.price, 0),
        status: order.status,
        createdAt: order.createdAt
      }))
    });

  } catch (error) {
    console.error('Vendor dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
