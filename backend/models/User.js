const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password required if not Google OAuth
    }
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  
  // Profile Information
  bio: String,
  profilePicture: String,
  coverImage: String,
  phone: String,
  location: {
    city: String,
    country: String
  },
  
  // Professional Information
  industry: String,
  skills: [String],
  experience: String,
  website: String,
  socialLinks: {
    linkedin: String,
    twitter: String,
    instagram: String,
    facebook: String,
    youtube: String
  },
  
  // Platform Features
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'pro', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active'
    },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    currentPeriodEnd: Date
  },
  
  // AI Usage Tracking
  aiUsage: {
    websitesGenerated: { type: Number, default: 0 },
    contentGenerated: { type: Number, default: 0 },
    logosGenerated: { type: Number, default: 0 },
    monthlyLimit: { type: Number, default: 10 },
    lastReset: { type: Date, default: Date.now }
  },
  
  // Generated Assets
  generatedWebsites: [{
    id: String,
    name: String,
    domain: String,
    template: String,
    isPublished: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  
  brandKit: {
    logo: String,
    colors: [String],
    fonts: [String],
    brandGuidelines: String
  },
  
  // Marketplace
  marketplace: {
    isVendor: { type: Boolean, default: false },
    storeName: String,
    storeDescription: String,
    totalSales: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 }
  },
  
  // Learning Progress
  learningProgress: [{
    courseId: String,
    courseName: String,
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    completedAt: Date,
    certificates: [String]
  }],
  
  // OAuth
  googleId: String,
  
  // Admin & Permissions
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator', 'owner'],
    default: 'user'
  },
  permissions: [String],
  
  // Account Status
  isActive: { type: Boolean, default: true },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // Analytics
  lastLogin: Date,
  loginCount: { type: Number, default: 0 },
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      marketing: { type: Boolean, default: false }
    },
    theme: { type: String, default: 'light' },
    language: { type: String, default: 'en' }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate username from email if not provided
userSchema.pre('save', function(next) {
  if (!this.username && this.email) {
    this.username = this.email.split('@')[0].toLowerCase();
  }
  next();
});

// Reset AI usage monthly
userSchema.methods.resetAIUsageIfNeeded = function() {
  const now = new Date();
  const lastReset = this.aiUsage.lastReset;
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  
  if (lastReset < oneMonthAgo) {
    this.aiUsage.websitesGenerated = 0;
    this.aiUsage.contentGenerated = 0;
    this.aiUsage.logosGenerated = 0;
    this.aiUsage.lastReset = now;
  }
};

// Check if user can use AI features
userSchema.methods.canUseAI = function(feature) {
  this.resetAIUsageIfNeeded();
  
  const limits = {
    free: { websites: 2, content: 20, logos: 3 },
    pro: { websites: 10, content: 100, logos: 15 },
    enterprise: { websites: -1, content: -1, logos: -1 } // unlimited
  };
  
  const userLimits = limits[this.subscription.plan];
  
  switch(feature) {
    case 'website':
      return userLimits.websites === -1 || this.aiUsage.websitesGenerated < userLimits.websites;
    case 'content':
      return userLimits.content === -1 || this.aiUsage.contentGenerated < userLimits.content;
    case 'logo':
      return userLimits.logos === -1 || this.aiUsage.logosGenerated < userLimits.logos;
    default:
      return false;
  }
};

module.exports = mongoose.model('User', userSchema);