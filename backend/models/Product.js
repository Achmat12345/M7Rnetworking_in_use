const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: String,
  
  // Vendor Information
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vendorName: String,
  
  // Product Details
  category: {
    type: String,
    required: true,
    enum: [
      'digital-products',
      'courses',
      'templates',
      'ebooks',
      'software',
      'consulting',
      'design-services',
      'marketing-services',
      'physical-products',
      'other'
    ]
  },
  subcategory: String,
  tags: [String],
  
  // Pricing
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  salePrice: Number,
  isOnSale: {
    type: Boolean,
    default: false
  },
  saleStartDate: Date,
  saleEndDate: Date,
  
  // Digital Product Details
  type: {
    type: String,
    enum: ['digital', 'physical', 'service'],
    required: true
  },
  digitalFiles: [{
    name: String,
    url: String,
    size: Number,
    downloadCount: { type: Number, default: 0 }
  }],
  
  // Media
  images: [String],
  thumbnail: String,
  video: String,
  
  // Status
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive', 'suspended'],
    default: 'draft'
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  
  // Analytics
  views: { type: Number, default: 0 },
  purchases: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  
  // Reviews
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  
  // SEO
  slug: {
    type: String,
    unique: true
  },
  metaTitle: String,
  metaDescription: String,
  
  // Inventory (for physical products)
  inventory: {
    stock: { type: Number, default: 0 },
    trackInventory: { type: Boolean, default: false },
    allowBackorders: { type: Boolean, default: false }
  },
  
  // Shipping (for physical products)
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    shippingRequired: { type: Boolean, default: false }
  },
  
  // License (for digital products)
  license: {
    type: String,
    enum: ['personal', 'commercial', 'extended'],
    default: 'personal'
  },
  
  // Platform fees
  platformFee: {
    type: Number,
    default: 0.1 // 10%
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate slug from title
productSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Calculate current price
productSchema.virtual('currentPrice').get(function() {
  if (this.isOnSale && this.salePrice && 
      this.saleStartDate <= new Date() && 
      this.saleEndDate >= new Date()) {
    return this.salePrice;
  }
  return this.price;
});

// Calculate discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.isOnSale && this.salePrice) {
    return Math.round(((this.price - this.salePrice) / this.price) * 100);
  }
  return 0;
});

module.exports = mongoose.model('Product', productSchema);
