const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function createTestUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@test.com' });
    if (existingUser) {
      console.log('Test user already exists!');
      console.log('Email: test@test.com');
      console.log('Password: test123');
      process.exit(0);
    }

    // Create test user
    const testUser = new User({
      email: 'test@test.com',
      password: 'test123',
      firstName: 'Test',
      lastName: 'User',
      username: 'testuser123',
      role: 'user',
      subscription: {
        plan: 'free',
        status: 'active'
      }
    });

    await testUser.save();
    console.log('✅ Test user created successfully!');
    console.log('Email: test@test.com');
    console.log('Password: test123');
    console.log('You can now login with these credentials.');

  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createTestUser();
