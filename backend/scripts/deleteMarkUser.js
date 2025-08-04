const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function deleteMarkUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete mark user
    const result = await User.deleteOne({ email: 'mark7raw@gmail.com' });
    
    if (result.deletedCount > 0) {
      console.log('✅ Mark user deleted successfully!');
      console.log('You can now register with mark7raw@gmail.com again.');
    } else {
      console.log('❌ Mark user not found or already deleted.');
    }

  } catch (error) {
    console.error('Error deleting mark user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

deleteMarkUser();
