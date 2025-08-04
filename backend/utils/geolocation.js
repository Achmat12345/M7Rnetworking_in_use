const axios = require('axios');

class GeolocationService {
  static async getCountryFromIP(ip) {
    try {
      // Remove IPv6 prefix if present
      const cleanIP = ip.replace(/^::ffff:/, '');
      
      // Skip localhost/private IPs
      if (cleanIP === '127.0.0.1' || cleanIP === '::1' || cleanIP.startsWith('192.168.') || cleanIP.startsWith('10.')) {
        return 'ZA'; // Default to South Africa for local development
      }

      // Use ipapi.co for IP geolocation (free tier available)
      const response = await axios.get(`https://ipapi.co/${cleanIP}/country/`, {
        timeout: 5000,
        headers: {
          'User-Agent': 'M7RNetworking/1.0'
        }
      });
      
      return response.data || 'ZA';
    } catch (error) {
      console.error('Geolocation service error:', error.message);
      return 'ZA'; // Default to South Africa
    }
  }

  static async getLocationDetails(ip) {
    try {
      const cleanIP = ip.replace(/^::ffff:/, '');
      
      if (cleanIP === '127.0.0.1' || cleanIP === '::1' || cleanIP.startsWith('192.168.') || cleanIP.startsWith('10.')) {
        return {
          country: 'ZA',
          country_name: 'South Africa',
          city: 'Cape Town',
          timezone: 'Africa/Johannesburg',
          currency: 'ZAR'
        };
      }

      const response = await axios.get(`https://ipapi.co/${cleanIP}/json/`, {
        timeout: 5000,
        headers: {
          'User-Agent': 'M7RNetworking/1.0'
        }
      });
      
      return {
        country: response.data.country_code || 'ZA',
        country_name: response.data.country_name || 'South Africa',
        city: response.data.city || 'Unknown',
        timezone: response.data.timezone || 'Africa/Johannesburg',
        currency: response.data.currency || 'ZAR'
      };
    } catch (error) {
      console.error('Location details service error:', error.message);
      return {
        country: 'ZA',
        country_name: 'South Africa',
        city: 'Cape Town',
        timezone: 'Africa/Johannesburg',
        currency: 'ZAR'
      };
    }
  }
}

module.exports = GeolocationService;
