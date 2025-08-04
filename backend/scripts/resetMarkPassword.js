const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function resetMarkPassword() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find and update mark user
    const user = await User.findOne({ email: 'mark7raw@gmail.com' });
    if (!user) {
      console.log('Mark user not found!');
      process.exit(1);
    }

    // Reset password
    user.password = 'Tasqeen.54321';
    await user.save();

    console.log('✅ Password reset successfully!');
    console.log('Email: mark7raw@gmail.com');
    console.log('New Password: Tasqeen.54321');
    console.log('You can now login with these credentials.');

  } catch (error) {
    console.error('Error resetting password:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

resetMarkPassword();
