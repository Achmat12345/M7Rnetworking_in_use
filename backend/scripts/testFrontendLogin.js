const mongoose = require('mongoose');
const axios = require('axios');

async function testFrontendLogin() {
  try {
    console.log('Testing frontend login...');
    
    // Test direct API call
    const response = await axios.post('http://localhost:5002/api/auth/login', {
      email: 'mark7raw@gmail.com',
      password: 'Tasqeen.54321'
    });
    
    console.log('✅ Login successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    // Test owner status endpoint with the token
    const token = response.data.token;
    try {
      const ownerResponse = await axios.get('http://localhost:5002/api/admin/owner-status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('✅ Owner status check successful!');
      console.log('Owner Status:', JSON.stringify(ownerResponse.data, null, 2));
    } catch (ownerError) {
      console.log('❌ Owner status check failed:', ownerError.response?.data || ownerError.message);
    }
    
  } catch (error) {
    console.log('❌ Login failed:', error.response?.data || error.message);
  }
}

testFrontendLogin();
