// Currency and localization utilities
const currencyRates = {
  USD: 1,
  ZAR: 18.50, // Approximate USD to ZAR rate
  EUR: 0.85,
  GBP: 0.73,
  AUD: 1.35,
  CAD: 1.25
};

const currencySymbols = {
  USD: '$',
  ZAR: 'R',
  EUR: '€',
  GBP: '£',
  AUD: 'A$',
  CAD: 'C$'
};

const countryToCurrency = {
  'ZA': 'ZAR', // South Africa
  'US': 'USD', // United States
  'GB': 'GBP', // United Kingdom
  'AU': 'AUD', // Australia
  'CA': 'CAD', // Canada
  'DE': 'EUR', // Germany
  'FR': 'EUR', // France
  'NL': 'EUR', // Netherlands
  'IT': 'EUR', // Italy
  'ES': 'EUR', // Spain
};

class CurrencyService {
  static detectCurrencyFromCountry(countryCode) {
    return countryToCurrency[countryCode] || 'USD';
  }

  static convertPrice(amount, fromCurrency = 'USD', toCurrency = 'USD') {
    if (fromCurrency === toCurrency) return amount;
    
    const usdAmount = amount / currencyRates[fromCurrency];
    return Math.round(usdAmount * currencyRates[toCurrency] * 100) / 100;
  }

  static formatPrice(amount, currency = 'USD') {
    const symbol = currencySymbols[currency] || '$';
    const formattedAmount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
    
    return `${symbol}${formattedAmount}`;
  }

  static getPricingForCountry(basePricing, countryCode) {
    const currency = this.detectCurrencyFromCountry(countryCode);
    const convertedPricing = {};
    
    Object.keys(basePricing).forEach(key => {
      if (typeof basePricing[key] === 'number') {
        convertedPricing[key] = this.convertPrice(basePricing[key], 'USD', currency);
      } else if (typeof basePricing[key] === 'object' && basePricing[key].price) {
        convertedPricing[key] = {
          ...basePricing[key],
          price: this.convertPrice(basePricing[key].price, 'USD', currency),
          currency: currency,
          symbol: currencySymbols[currency]
        };
      }
    });
    
    return {
      ...convertedPricing,
      currency,
      symbol: currencySymbols[currency]
    };
  }

  static async getCurrentRates() {
    // In production, you would fetch from a real API like fixer.io or exchangerate-api.com
    try {
      // For now, return static rates. In production, uncomment below:
      // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
      // const data = await response.json();
      // return data.rates;
      return currencyRates;
    } catch (error) {
      console.error('Failed to fetch currency rates:', error);
      return currencyRates;
    }
  }
}

module.exports = CurrencyService;
