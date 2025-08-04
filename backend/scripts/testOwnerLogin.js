const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function testOwnerLogin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find the owner user
    const user = await User.findOne({ email: 'mark7raw@gmail.com' });
    
    if (!user) {
      console.log('❌ Owner user not found!');
      return;
    }

    console.log('✅ Owner user found:');
    console.log('- Email:', user.email);
    console.log('- Role:', user.role);
    console.log('- Permissions:', user.permissions);
    console.log('- Subscription:', user.subscription.plan);
    console.log('- Is Active:', user.isActive);

    // Test password
    const isValidPassword = await bcrypt.compare('Tasqeen.54321', user.password);
    console.log('- Password Valid:', isValidPassword ? '✅' : '❌');

    if (isValidPassword) {
      console.log('\n🎉 Owner login credentials are working correctly!');
      console.log('You can now log in with:');
      console.log('Email: mark7raw@gmail.com');
      console.log('Password: Tasqeen.54321');
    } else {
      console.log('\n❌ Password is not working. Resetting...');
      user.password = 'Tasqeen.54321';
      await user.save();
      console.log('✅ Password reset complete!');
    }

  } catch (error) {
    console.error('Error testing owner login:', error);
  } finally {
    mongoose.connection.close();
  }
}

testOwnerLogin();
