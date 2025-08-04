const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Order Information
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  
  // Customer Information
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerEmail: String,
  
  // Order Items
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productTitle: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  
  // Pricing
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    default: 0
  },
  shipping: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  
  // Platform fees
  platformFee: {
    type: Number,
    required: true
  },
  vendorEarnings: {
    type: Number,
    required: true
  },
  
  // Payment Information
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: String,
  paymentIntentId: String, // Stripe payment intent ID
  
  // Order Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  
  // Fulfillment
  isDigital: {
    type: Boolean,
    default: true
  },
  digitalFiles: [{
    productId: mongoose.Schema.Types.ObjectId,
    files: [{
      name: String,
      url: String,
      downloadToken: String,
      downloadCount: { type: Number, default: 0 },
      downloadLimit: { type: Number, default: 5 }
    }]
  }],
  
  // Shipping (for physical products)
  shippingAddress: {
    firstName: String,
    lastName: String,
    company: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    phone: String
  },
  trackingNumber: String,
  shippingCarrier: String,
  
  // Notes
  customerNotes: String,
  adminNotes: String,
  
  // Timestamps
  confirmedAt: Date,
  shippedAt: Date,
  deliveredAt: Date,
  cancelledAt: Date,
  refundedAt: Date
}, {
  timestamps: true
});

// Generate order number
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    this.orderNumber = `M7R-${timestamp}-${random}`.toUpperCase();
  }
  next();
});

// Calculate totals
orderSchema.pre('save', function(next) {
  this.subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  this.total = this.subtotal + this.tax + this.shipping;
  this.platformFee = this.subtotal * 0.1; // 10% platform fee
  this.vendorEarnings = this.subtotal - this.platformFee;
  next();
});

module.exports = mongoose.model('Order', orderSchema);
