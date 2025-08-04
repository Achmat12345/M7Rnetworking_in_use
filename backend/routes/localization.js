const express = require('express');
const CurrencyService = require('../utils/currency');
const GeolocationService = require('../utils/geolocation');

const router = express.Router();

// Base pricing in USD
const basePricing = {
  starter: {
    monthly: 29,
    yearly: 290,
    features: ['5 AI Website Generations', 'Basic Branding Tools', 'Community Access', 'Email Support']
  },
  professional: {
    monthly: 79,
    yearly: 790,
    features: ['Unlimited AI Generations', 'Advanced Branding Suite', 'Marketplace Access', 'Priority Support', 'Custom Domains', 'Analytics Dashboard']
  },
  enterprise: {
    monthly: 199,
    yearly: 1990,
    features: ['Everything in Professional', 'White-label Solutions', 'API Access', 'Dedicated Support', 'Custom Integrations', 'Advanced Analytics']
  }
};

// Get localized pricing based on user's location
router.get('/pricing', async (req, res) => {
  try {
    const userIP = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress ||
                   (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
                   '127.0.0.1';

    const countryCode = await GeolocationService.getCountryFromIP(userIP);
    const currency = CurrencyService.detectCurrencyFromCountry(countryCode);
    
    const localizedPricing = {};
    Object.keys(basePricing).forEach(plan => {
      localizedPricing[plan] = {
        monthly: {
          amount: CurrencyService.convertPrice(basePricing[plan].monthly, 'USD', currency),
          formatted: CurrencyService.formatPrice(
            CurrencyService.convertPrice(basePricing[plan].monthly, 'USD', currency),
            currency
          )
        },
        yearly: {
          amount: CurrencyService.convertPrice(basePricing[plan].yearly, 'USD', currency),
          formatted: CurrencyService.formatPrice(
            CurrencyService.convertPrice(basePricing[plan].yearly, 'USD', currency),
            currency
          )
        },
        features: basePricing[plan].features,
        savings: Math.round(((basePricing[plan].monthly * 12 - basePricing[plan].yearly) / (basePricing[plan].monthly * 12)) * 100)
      };
    });

    res.json({
      success: true,
      data: {
        pricing: localizedPricing,
        currency,
        symbol: CurrencyService.formatPrice(0, currency).charAt(0),
        countryCode,
        detectedLocation: await GeolocationService.getLocationDetails(userIP)
      }
    });
  } catch (error) {
    console.error('Pricing localization error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get localized pricing',
      message: error.message
    });
  }
});

// Get currency conversion for specific amount
router.post('/convert', async (req, res) => {
  try {
    const { amount, fromCurrency, toCurrency } = req.body;
    
    if (!amount || !fromCurrency || !toCurrency) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: amount, fromCurrency, toCurrency'
      });
    }

    const convertedAmount = CurrencyService.convertPrice(amount, fromCurrency, toCurrency);
    const formattedAmount = CurrencyService.formatPrice(convertedAmount, toCurrency);

    res.json({
      success: true,
      data: {
        originalAmount: amount,
        fromCurrency,
        toCurrency,
        convertedAmount,
        formattedAmount
      }
    });
  } catch (error) {
    console.error('Currency conversion error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to convert currency',
      message: error.message
    });
  }
});

// Get user's location details
router.get('/location', async (req, res) => {
  try {
    const userIP = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress ||
                   (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
                   '127.0.0.1';

    const locationDetails = await GeolocationService.getLocationDetails(userIP);
    
    res.json({
      success: true,
      data: locationDetails
    });
  } catch (error) {
    console.error('Location detection error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to detect location',
      message: error.message
    });
  }
});

module.exports = router;
