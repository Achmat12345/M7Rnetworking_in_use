import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { 
  SparklesIcon, 
  RocketLaunchIcon, 
  ShoppingBagIcon, 
  AcademicCapIcon,
  CheckIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const { user } = useAuth();
  const { pricing, currency, symbol, location, loading: currencyLoading } = useCurrency();

  const features = [
    {
      name: 'AI Website Builder',
      description: 'Create stunning websites in minutes with our AI-powered builder. Just describe your vision and watch it come to life.',
      icon: SparklesIcon,
      color: 'text-indigo-600'
    },
    {
      name: 'Brand Identity Kit',
      description: 'Generate professional logos, color palettes, and complete brand guidelines tailored to your business.',
      icon: RocketLaunchIcon,
      color: 'text-purple-600'
    },
    {
      name: 'Digital Marketplace',
      description: 'Buy and sell digital products, courses, templates, and services in our thriving creator economy.',
      icon: ShoppingBagIcon,
      color: 'text-green-600'
    },
    {
      name: 'Learning Academy',
      description: 'Master branding, marketing, and entrepreneurship with AI-powered courses and personalized learning paths.',
      icon: AcademicCapIcon,
      color: 'text-yellow-600'
    }
  ];

  // Get localized pricing plans
  const getPricingPlans = () => {
    if (currencyLoading || !pricing) {
      return [
        {
          name: 'Free',
          price: `${symbol}0`,
          period: 'forever',
          description: 'Perfect for getting started',
          features: [
            '2 AI websites per month',
            '20 AI content generations',
            '3 brand kits',
            'Basic marketplace access',
            'Community support'
          ],
          cta: 'Get Started Free',
          popular: false
        },
        {
          name: 'Starter',
          price: `${symbol}29`,
          period: 'month',
          description: 'For serious creators and entrepreneurs',
          features: [
            '5 AI Website Generations',
            'Basic Branding Tools',
            'Community Access',
            'Email Support'
          ],
          cta: 'Start Free Trial',
          popular: true
        },
        {
          name: 'Professional',
          price: `${symbol}79`,
          period: 'month',
          description: 'For teams and agencies',
          features: [
            'Unlimited AI Generations',
            'Advanced Branding Suite',
            'Marketplace Access',
            'Priority Support',
            'Custom Domains',
            'Analytics Dashboard'
          ],
          cta: 'Contact Sales',
          popular: false
        }
      ];
    }

    return [
      {
        name: 'Free',
        price: `${symbol}0`,
        period: 'forever',
        description: 'Perfect for getting started',
        features: [
          '2 AI websites per month',
          '20 AI content generations',
          '3 brand kits',
          'Basic marketplace access',
          'Community support'
        ],
        cta: 'Get Started Free',
        popular: false
      },
      {
        name: 'Starter',
        price: pricing.starter.monthly.formatted,
        period: 'month',
        yearlyPrice: pricing.starter.yearly.formatted,
        savings: pricing.starter.savings,
        description: 'For serious creators and entrepreneurs',
        features: pricing.starter.features,
        cta: 'Start Free Trial',
        popular: true
      },
      {
        name: 'Professional',
        price: pricing.professional.monthly.formatted,
        period: 'month',
        yearlyPrice: pricing.professional.yearly.formatted,
        savings: pricing.professional.savings,
        description: 'For growing businesses',
        features: pricing.professional.features,
        cta: 'Start Free Trial',
        popular: false
      },
      {
        name: 'Enterprise',
        price: pricing.enterprise.monthly.formatted,
        period: 'month',
        yearlyPrice: pricing.enterprise.yearly.formatted,
        savings: pricing.enterprise.savings,
        description: 'For teams and agencies',
        features: pricing.enterprise.features,
        cta: 'Contact Sales',
        popular: false
      }
    ];
  };

  const pricingPlans = getPricingPlans();

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Freelance Designer',
      content: 'M7RNetworking helped me create my entire brand identity and launch my freelance business in just one week. The AI tools are incredible!',
      avatar: '/api/placeholder/40/40',
      rating: 5
    },
    {
      name: 'Marcus Chen',
      role: 'E-commerce Entrepreneur',
      content: 'The marketplace feature is a game-changer. I\'ve already made $2,000 selling my digital templates in the first month.',
      avatar: '/api/placeholder/40/40',
      rating: 5
    },
    {
      name: 'Jennifer Davis',
      role: 'Content Creator',
      content: 'The AI content generator saves me hours every week. My social media engagement has increased by 150% since using M7RNetworking.',
      avatar: '/api/placeholder/40/40',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="hero-title text-gray-900 dark:text-white mb-6">
              Build Identity. Tell Your Story.{' '}
              <span className="text-gradient">Create Independence.</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              Empower your creative journey with AI-powered tools, a thriving marketplace, 
              and learning resources designed for independent creators, entrepreneurs, and dreamers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              {user ? (
                <Link
                  to="/dashboard"
                  className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Go to Dashboard
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                  >
                    Start Building Free
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/marketplace"
                    className="btn btn-ghost text-lg px-8 py-4 border border-gray-300 dark:border-gray-600"
                  >
                    Explore Marketplace
                  </Link>
                </>
              )}
            </div>
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-500 mr-1" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-500 mr-1" />
                Free forever plan
              </div>
              <div className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-500 mr-1" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-gray-900 dark:text-white mb-4">
              Everything you need to succeed
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Our comprehensive platform gives you all the tools, resources, and community 
              support to build your brand and grow your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="text-center group">
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-gray-900 dark:text-white mb-4">
              Loved by creators worldwide
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Join thousands of creators who are building their brands and businesses with M7RNetworking.
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
                <div className="flex items-center justify-center">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-gray-900 dark:text-white mb-4">
              Choose your plan
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Start free and upgrade as you grow. All plans include our core features and community support.
            </p>
            {location && (
              <div className="mt-4 inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Pricing shown in {currency} for {location.country_name}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={`card p-8 relative ${plan.popular ? 'ring-2 ring-indigo-500 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      /{plan.period}
                    </span>
                    {plan.yearlyPrice && plan.savings && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Or {plan.yearlyPrice}/year
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
                      <span className="text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={plan.name === 'Enterprise' ? '/contact' : '/register'}
                  className={`btn w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to build your empire?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already building their brands, 
            telling their stories, and creating independence with M7RNetworking.
          </p>
          {user ? (
            <Link
              to="/dashboard"
              className="btn bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg"
            >
              Continue Building
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          ) : (
            <Link
              to="/register"
              className="btn bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg"
            >
              Start Your Journey Free
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
