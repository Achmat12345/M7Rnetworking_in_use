const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function createMarkUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if mark user already exists
    const existingUser = await User.findOne({ email: 'mark7raw@gmail.com' });
    if (existingUser) {
      console.log('Mark user already exists!');
      console.log('Email: mark7raw@gmail.com');
      console.log('You can login with your existing password.');
      process.exit(0);
    }

    // Create mark user
    const markUser = new User({
      email: 'mark7raw@gmail.com',
      password: 'Tasqeen.54321', // Using the password from your MongoDB connection
      firstName: 'Mark',
      lastName: 'Achmat',
      username: 'mark7raw',
      role: 'admin', // Making this an admin account
      subscription: {
        plan: 'premium',
        status: 'active'
      }
    });

    await markUser.save();
    console.log('✅ Mark user created successfully!');
    console.log('Email: mark7raw@gmail.com');
    console.log('Password: Tasqeen.54321');
    console.log('Role: admin');
    console.log('You can now login with these credentials.');

  } catch (error) {
    console.error('Error creating mark user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createMarkUser();
