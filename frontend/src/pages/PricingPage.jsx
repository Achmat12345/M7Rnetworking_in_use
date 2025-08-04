import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../contexts/CurrencyContext';
import { 
  CheckIcon,
  XMarkIcon,
  StarIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  RocketLaunchIcon,
  TrophyIcon,
  GiftIcon
} from '@heroicons/react/24/outline';

const PricingPage = () => {
  const { pricing, currency, symbol, location, loading: currencyLoading } = useCurrency();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showComparison, setShowComparison] = useState(false);

  // Get localized pricing plans
  const getPricingPlans = () => {
    if (currencyLoading || !pricing) {
      return [
        {
          id: 'free',
          name: 'Free',
          price: billingCycle === 'monthly' ? 0 : 0,
          originalPrice: null,
          description: 'Perfect for getting started',
          icon: SparklesIcon,
          color: 'gray',
          popular: false,
          features: [
            '2 AI websites per month',
            '20 AI content generations',
            '3 brand kits',
            'Basic marketplace access',
            'Community support',
            'Mobile responsive designs'
          ],
          limits: [
            'Watermarked downloads',
            'Limited templates',
            'Basic support only'
          ],
          cta: 'Get Started Free',
          ctaLink: '/register'
        },
        {
          id: 'starter',
          name: 'Starter',
          price: billingCycle === 'monthly' ? 29 : 290,
          originalPrice: billingCycle === 'monthly' ? null : 348,
          description: 'For serious creators and entrepreneurs',
          icon: RocketLaunchIcon,
          color: 'indigo',
          popular: true,
          savings: billingCycle === 'yearly' ? 17 : null,
          features: [
            '15 AI websites per month',
            '200 AI content generations',
            '50 brand kits',
            'Full marketplace access',
            'Priority support',
            'Custom domains',
            'Advanced templates',
            'HD downloads',
            'Basic analytics'
          ],
          limits: [],
          cta: 'Start Free Trial',
          ctaLink: '/register'
        },
        {
          id: 'professional',
          name: 'Professional',
          price: billingCycle === 'monthly' ? 79 : 790,
          originalPrice: billingCycle === 'monthly' ? null : 948,
          description: 'For growing businesses and teams',
          icon: TrophyIcon,
          color: 'purple',
          popular: false,
          savings: billingCycle === 'yearly' ? 17 : null,
          features: [
            '100 AI websites per month',
            '1,000 AI content generations',
            '200 brand kits',
            'Marketplace seller access',
            'Premium support',
            'Team collaboration (5 users)',
            'White-label options',
            'Advanced analytics',
            'API access',
            'Priority processing'
          ],
          limits: [],
          cta: 'Start Free Trial',
          ctaLink: '/register'
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: billingCycle === 'monthly' ? 199 : 1990,
          originalPrice: billingCycle === 'monthly' ? null : 2388,
          description: 'For large teams and agencies',
          icon: GiftIcon,
          color: 'yellow',
          popular: false,
          savings: billingCycle === 'yearly' ? 17 : null,
          features: [
            'Unlimited AI generations',
            'Unlimited brand kits',
            'Advanced marketplace tools',
            'Dedicated account manager',
            'Custom integrations',
            'Unlimited team members',
            'Advanced security',
            'Custom training',
            'SLA guarantee',
            '24/7 phone support'
          ],
          limits: [],
          cta: 'Contact Sales',
          ctaLink: '/contact'
        }
      ];
    }

    const plans = [];
    
    // Free plan
    plans.push({
      id: 'free',
      name: 'Free',
      price: 0,
      originalPrice: null,
      description: 'Perfect for getting started',
      icon: SparklesIcon,
      color: 'gray',
      popular: false,
      features: pricing.free?.features || [
        '2 AI websites per month',
        '20 AI content generations',
        '3 brand kits',
        'Basic marketplace access',
        'Community support'
      ],
      limits: [
        'Watermarked downloads',
        'Limited templates',
        'Basic support only'
      ],
      cta: 'Get Started Free',
      ctaLink: '/register'
    });

    // Starter plan
    if (pricing.starter) {
      plans.push({
        id: 'starter',
        name: 'Starter',
        price: billingCycle === 'monthly' ? pricing.starter.monthly.amount : pricing.starter.yearly.amount,
        originalPrice: billingCycle === 'monthly' ? null : pricing.starter.monthly.amount * 12,
        description: 'For serious creators and entrepreneurs',
        icon: RocketLaunchIcon,
        color: 'indigo',
        popular: true,
        savings: billingCycle === 'yearly' ? pricing.starter.savings : null,
        features: pricing.starter.features,
        limits: [],
        cta: 'Start Free Trial',
        ctaLink: '/register'
      });
    }

    // Professional plan
    if (pricing.professional) {
      plans.push({
        id: 'professional',
        name: 'Professional',
        price: billingCycle === 'monthly' ? pricing.professional.monthly.amount : pricing.professional.yearly.amount,
        originalPrice: billingCycle === 'monthly' ? null : pricing.professional.monthly.amount * 12,
        description: 'For growing businesses and teams',
        icon: TrophyIcon,
        color: 'purple',
        popular: false,
        savings: billingCycle === 'yearly' ? pricing.professional.savings : null,
        features: pricing.professional.features,
        limits: [],
        cta: 'Start Free Trial',
        ctaLink: '/register'
      });
    }

    // Enterprise plan
    if (pricing.enterprise) {
      plans.push({
        id: 'enterprise',
        name: 'Enterprise',
        price: billingCycle === 'monthly' ? pricing.enterprise.monthly.amount : pricing.enterprise.yearly.amount,
        originalPrice: billingCycle === 'monthly' ? null : pricing.enterprise.monthly.amount * 12,
        description: 'For large teams and agencies',
        icon: GiftIcon,
        color: 'yellow',
        popular: false,
        savings: billingCycle === 'yearly' ? pricing.enterprise.savings : null,
        features: pricing.enterprise.features,
        limits: [],
        cta: 'Contact Sales',
        ctaLink: '/contact'
      });
    }

    return plans;
  };

  const plans = getPricingPlans();

  const faqItems = [
    {
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise plans.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start.'
    },
    {
      question: 'What happens if I exceed my limits?',
      answer: 'You can purchase additional credits or upgrade to a higher plan. We\'ll notify you before you reach your limits.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans. Contact support for refund requests.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription at any time from your account settings. Your plan will remain active until the end of your billing period.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Freelance Designer',
      content: 'The Professional plan has everything I need to serve my clients. The AI tools save me hours every week.',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      plan: 'Professional'
    },
    {
      name: 'Marcus Chen',
      role: 'Marketing Agency Owner',
      content: 'Enterprise plan is perfect for our team. The collaboration features and unlimited usage are game-changers.',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      plan: 'Enterprise'
    },
    {
      name: 'Jennifer Davis',
      role: 'E-commerce Entrepreneur',
      content: 'Started with the free plan and upgraded to Starter. Great value and the support team is amazing.',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      plan: 'Starter'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. All plans include our core AI tools, 
            marketplace access, and community support.
          </p>
          
          {location && (
            <div className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Pricing shown in {currency} for {location.country_name}
            </div>
          )}

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Yearly
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan) => (
            <div key={plan.id} className={`card p-8 relative ${plan.popular ? 'ring-2 ring-indigo-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${plan.color}-100 dark:bg-${plan.color}-900/20 rounded-xl mb-4`}>
                  <plan.icon className={`h-8 w-8 text-${plan.color}-600 dark:text-${plan.color}-400`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {symbol}{plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /{billingCycle === 'yearly' ? 'year' : 'month'}
                  </span>
                  {plan.originalPrice && plan.savings && billingCycle === 'yearly' && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        {symbol}{plan.originalPrice}/year
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Save {plan.savings}% annually
                      </p>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {plan.description}
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
                {plan.limits.map((limit, index) => (
                  <li key={index} className="flex items-start">
                    <XMarkIcon className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {limit}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Link
                to={plan.ctaLink}
                className={`btn w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Feature Comparison Toggle */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="btn btn-secondary"
          >
            {showComparison ? 'Hide' : 'Show'} Detailed Comparison
          </button>
        </div>

        {/* Detailed Comparison Table */}
        {showComparison && (
          <div className="mb-16 overflow-x-auto">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Feature Comparison
              </h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 font-medium text-gray-900 dark:text-white">Features</th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="text-center py-4 font-medium text-gray-900 dark:text-white">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-4 text-gray-600 dark:text-gray-400">AI Website Generations</td>
                    <td className="text-center py-4">2/month</td>
                    <td className="text-center py-4">15/month</td>
                    <td className="text-center py-4">100/month</td>
                    <td className="text-center py-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-4 text-gray-600 dark:text-gray-400">AI Content Generations</td>
                    <td className="text-center py-4">20/month</td>
                    <td className="text-center py-4">200/month</td>
                    <td className="text-center py-4">1,000/month</td>
                    <td className="text-center py-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-4 text-gray-600 dark:text-gray-400">Brand Kits</td>
                    <td className="text-center py-4">3/month</td>
                    <td className="text-center py-4">50/month</td>
                    <td className="text-center py-4">200/month</td>
                    <td className="text-center py-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-4 text-gray-600 dark:text-gray-400">Team Members</td>
                    <td className="text-center py-4">1</td>
                    <td className="text-center py-4">1</td>
                    <td className="text-center py-4">5</td>
                    <td className="text-center py-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-4 text-gray-600 dark:text-gray-400">Priority Support</td>
                    <td className="text-center py-4"><XMarkIcon className="h-5 w-5 text-red-400 mx-auto" /></td>
                    <td className="text-center py-4"><CheckIcon className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4"><CheckIcon className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4"><CheckIcon className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Testimonials */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Real feedback from creators and businesses using M7RNetworking
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400">
                  {testimonial.plan} Plan
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need to know about our pricing and plans
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqItems.map((item, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-start space-x-3">
                  <QuestionMarkCircleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {item.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join thousands of creators and businesses already building their brands 
            with M7RNetworking. Start free, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn bg-white text-indigo-600 hover:bg-gray-100">
              <RocketLaunchIcon className="h-5 w-5 mr-2" />
              Start Free Trial
            </Link>
            <Link to="/contact" className="btn border-white text-white hover:bg-white hover:text-indigo-600">
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
