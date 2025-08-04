import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [pricing, setPricing] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLocalizedPricing = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/localization/pricing');
      
      if (response.data.success) {
        const { pricing, currency, symbol, countryCode, detectedLocation } = response.data.data;
        setPricing(pricing);
        setCurrency(currency);
        setSymbol(symbol);
        setLocation({ ...detectedLocation, countryCode });
      }
    } catch (error) {
      console.error('Failed to fetch localized pricing:', error);
      // Fallback to USD pricing
      setCurrency('USD');
      setSymbol('$');
      setPricing({
        starter: {
          monthly: { amount: 29, formatted: '$29' },
          yearly: { amount: 290, formatted: '$290' },
          features: ['5 AI Website Generations', 'Basic Branding Tools', 'Community Access', 'Email Support'],
          savings: 17
        },
        professional: {
          monthly: { amount: 79, formatted: '$79' },
          yearly: { amount: 790, formatted: '$790' },
          features: ['Unlimited AI Generations', 'Advanced Branding Suite', 'Marketplace Access', 'Priority Support', 'Custom Domains', 'Analytics Dashboard'],
          savings: 17
        },
        enterprise: {
          monthly: { amount: 199, formatted: '$199' },
          yearly: { amount: 1990, formatted: '$1990' },
          features: ['Everything in Professional', 'White-label Solutions', 'API Access', 'Dedicated Support', 'Custom Integrations', 'Advanced Analytics'],
          savings: 17
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const convertPrice = async (amount, fromCurrency, toCurrency) => {
    try {
      const response = await axios.post('/api/localization/convert', {
        amount,
        fromCurrency,
        toCurrency
      });
      return response.data.data;
    } catch (error) {
      console.error('Failed to convert currency:', error);
      return null;
    }
  };

  const formatPrice = (amount, currencyCode = currency) => {
    const symbols = {
      USD: '$',
      ZAR: 'R',
      EUR: '€',
      GBP: '£',
      AUD: 'A$',
      CAD: 'C$'
    };
    
    const currencySymbol = symbols[currencyCode] || '$';
    const formattedAmount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
    
    return `${currencySymbol}${formattedAmount}`;
  };

  useEffect(() => {
    fetchLocalizedPricing();
  }, []);

  const value = {
    currency,
    symbol,
    pricing,
    location,
    loading,
    convertPrice,
    formatPrice,
    refreshPricing: fetchLocalizedPricing
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
