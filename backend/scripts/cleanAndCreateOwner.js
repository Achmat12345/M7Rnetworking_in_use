const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function cleanAndCreateOwner() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all users with owner role or the emails we're using
    const existingUsers = await User.find({
      $or: [
        { role: 'owner' },
        { email: 'mark7raw@gmail.com' },
        { email: 'achmat@m7rnetworking.com' }
      ]
    });

    console.log('Found existing users:', existingUsers.length);
    for (const user of existingUsers) {
      console.log(`- ${user.email} (Role: ${user.role})`);
    }

    // Delete all existing owner accounts to start fresh
    await User.deleteMany({
      $or: [
        { role: 'owner' },
        { email: 'mark7raw@gmail.com' },
        { email: 'achmat@m7rnetworking.com' }
      ]
    });

    console.log('✅ Cleaned up existing owner accounts');

    // Create fresh owner account with your credentials
    const ownerUser = new User({
      email: 'mark7raw@gmail.com',
      password: 'Tasqeen.54321',
      firstName: 'Mark',
      lastName: 'M7R',
      username: 'mark7raw',
      role: 'owner',
      bio: 'Founder & Owner of M7RNetworking - Build Identity. Tell Your Story. Create Independence.',
      
      // Full permissions
      permissions: [
        'platform_admin',
        'user_management', 
        'content_moderation',
        'analytics_access',
        'billing_management',
        'system_settings',
        'full_access'
      ],
      
      // Enterprise subscription
      subscription: {
        plan: 'enterprise',
        status: 'active'
      },
      
      // Unlimited AI usage
      aiUsage: {
        websitesGenerated: 0,
        contentGenerated: 0,
        logosGenerated: 0,
        monthlyLimit: -1, // Unlimited
        lastReset: new Date()
      },
      
      // Account status
      isActive: true,
      isEmailVerified: true,
      
      // Preferences
      preferences: {
        notifications: {
          email: true,
          push: true,
          marketing: false
        },
        theme: 'dark',
        language: 'en'
      }
    });

    await ownerUser.save();
    
    console.log('🎉 Fresh owner account created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👑 YOUR PLATFORM OWNER CREDENTIALS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email: mark7raw@gmail.com');
    console.log('Password: Tasqeen.54321');
    console.log('Role: owner');
    console.log('Permissions: Full Access');
    console.log('Subscription: Enterprise (Unlimited)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ You now have complete control over your platform!');
    
  } catch (error) {
    console.error('Error creating owner account:', error);
  } finally {
    mongoose.connection.close();
  }
}

cleanAndCreateOwner();
