import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { 
  SparklesIcon, 
  GlobeAltIcon, 
  PaintBrushIcon, 
  DocumentTextIcon,
  PhotoIcon,
  RocketLaunchIcon,
  CheckIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const AIToolsPage = () => {
  const { user } = useAuth();
  const { } = useCurrency();
  const [activeTab, setActiveTab] = useState('website');
  const [websitePrompt, setWebsitePrompt] = useState('');
  const [brandPrompt, setBrandPrompt] = useState('');
  const [contentPrompt, setContentPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const tabs = [
    { id: 'website', name: 'Website Builder', icon: GlobeAltIcon },
    { id: 'branding', name: 'Brand Identity', icon: PaintBrushIcon },
    { id: 'content', name: 'Content Generator', icon: DocumentTextIcon },
    { id: 'graphics', name: 'Graphics Creator', icon: PhotoIcon }
  ];

  const aiTools = [
    {
      id: 'website',
      name: 'AI Website Builder',
      description: 'Create stunning, responsive websites in minutes with our AI-powered builder.',
      icon: GlobeAltIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      features: [
        'AI-generated layouts and designs',
        'Responsive mobile-first approach',
        'SEO-optimized structure',
        'Custom domain integration',
        'E-commerce ready templates',
        'Analytics integration'
      ],
      usageLimit: user?.subscription === 'enterprise' ? 'Unlimited' : user?.subscription === 'professional' ? '50/month' : user?.subscription === 'starter' ? '5/month' : '2/month',
      premium: user?.subscription === 'free'
    },
    {
      id: 'branding',
      name: 'Brand Identity Kit',
      description: 'Generate professional logos, color palettes, and complete brand guidelines.',
      icon: PaintBrushIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      features: [
        'AI logo generation',
        'Color palette creation',
        'Typography recommendations',
        'Brand guideline documents',
        'Social media templates',
        'Business card designs'
      ],
      usageLimit: user?.subscription === 'enterprise' ? 'Unlimited' : user?.subscription === 'professional' ? '100/month' : user?.subscription === 'starter' ? '20/month' : '3/month',
      premium: user?.subscription === 'free'
    },
    {
      id: 'content',
      name: 'Content Generator',
      description: 'Create compelling copy, blog posts, and marketing content with AI assistance.',
      icon: DocumentTextIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      features: [
        'Blog post generation',
        'Social media captions',
        'Email marketing copy',
        'Product descriptions',
        'SEO-optimized content',
        'Multiple tone options'
      ],
      usageLimit: user?.subscription === 'enterprise' ? 'Unlimited' : user?.subscription === 'professional' ? '500/month' : user?.subscription === 'starter' ? '100/month' : '20/month',
      premium: false
    },
    {
      id: 'graphics',
      name: 'Graphics Creator',
      description: 'Design stunning graphics, icons, and visual elements for your brand.',
      icon: PhotoIcon,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      features: [
        'Custom icon generation',
        'Social media graphics',
        'Presentation templates',
        'Infographic creation',
        'Banner designs',
        'Print-ready formats'
      ],
      usageLimit: user?.subscription === 'enterprise' ? 'Unlimited' : user?.subscription === 'professional' ? '200/month' : user?.subscription === 'starter' ? '50/month' : '10/month',
      premium: user?.subscription === 'free'
    }
  ];

  const handleGenerate = async (_toolType) => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      // Show success message or redirect to results
    }, 3000);
  };

  const renderToolContent = (tool) => {
    switch (tool.id) {
      case 'website':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Describe your website
              </label>
              <textarea
                value={websitePrompt}
                onChange={(e) => setWebsitePrompt(e.target.value)}
                placeholder="e.g., A modern portfolio website for a freelance graphic designer with a dark theme and minimalist design..."
                className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Business Website</option>
                  <option>Portfolio</option>
                  <option>E-commerce Store</option>
                  <option>Blog</option>
                  <option>Landing Page</option>
                  <option>Personal Website</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Industry
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Technology</option>
                  <option>Creative/Design</option>
                  <option>Consulting</option>
                  <option>E-commerce</option>
                  <option>Health & Wellness</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => handleGenerate('website')}
              disabled={!websitePrompt.trim() || isGenerating}
              className="w-full btn btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Website...
                </>
              ) : (
                <>
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  Generate Website
                </>
              )}
            </button>
          </div>
        );

      case 'branding':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Describe your brand
              </label>
              <textarea
                value={brandPrompt}
                onChange={(e) => setBrandPrompt(e.target.value)}
                placeholder="e.g., A tech startup focused on sustainable energy solutions, modern and professional feel, targeting eco-conscious consumers..."
                className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Brand Personality
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Professional</option>
                  <option>Creative</option>
                  <option>Playful</option>
                  <option>Elegant</option>
                  <option>Bold</option>
                  <option>Minimalist</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color Preference
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>No preference</option>
                  <option>Blue tones</option>
                  <option>Green tones</option>
                  <option>Warm colors</option>
                  <option>Cool colors</option>
                  <option>Monochromatic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Logo Style
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Modern</option>
                  <option>Classic</option>
                  <option>Minimalist</option>
                  <option>Geometric</option>
                  <option>Organic</option>
                  <option>Typography-based</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => handleGenerate('branding')}
              disabled={!brandPrompt.trim() || isGenerating}
              className="w-full btn btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Brand Kit...
                </>
              ) : (
                <>
                  <PaintBrushIcon className="h-5 w-5 mr-2" />
                  Generate Brand Kit
                </>
              )}
            </button>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What content do you need?
              </label>
              <textarea
                value={contentPrompt}
                onChange={(e) => setContentPrompt(e.target.value)}
                placeholder="e.g., Write a blog post about the benefits of remote work for small businesses, professional tone, 800 words..."
                className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Blog Post</option>
                  <option>Social Media Post</option>
                  <option>Email Newsletter</option>
                  <option>Product Description</option>
                  <option>Ad Copy</option>
                  <option>Press Release</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tone
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Friendly</option>
                  <option>Authoritative</option>
                  <option>Playful</option>
                  <option>Inspirational</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Length
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Short (100-300 words)</option>
                  <option>Medium (300-800 words)</option>
                  <option>Long (800+ words)</option>
                  <option>Social Media (50-100 words)</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => handleGenerate('content')}
              disabled={!contentPrompt.trim() || isGenerating}
              className="w-full btn btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Content...
                </>
              ) : (
                <>
                  <DocumentTextIcon className="h-5 w-5 mr-2" />
                  Generate Content
                </>
              )}
            </button>
          </div>
        );

      case 'graphics':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Graphics Creator
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Advanced graphics creation tools coming soon! Design custom icons, social media graphics, and more.
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <RocketLaunchIcon className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  Available in Professional & Enterprise plans
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentTool = aiTools.find(tool => tool.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Creative Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transform your ideas into reality with our suite of AI tools. Create websites, 
            design brands, and generate content that tells your story.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {aiTools.map((tool) => (
            <div key={tool.id} className="card p-6 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 ${tool.bgColor} rounded-xl mb-4`}>
                <tool.icon className={`h-6 w-6 ${tool.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {tool.usageLimit}
              </p>
              {tool.premium && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                  Premium
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tool Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tool Interface */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 ${currentTool.bgColor} rounded-xl`}>
                    <currentTool.icon className={`h-6 w-6 ${currentTool.color}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentTool.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {currentTool.description}
                    </p>
                  </div>
                </div>
                
                {currentTool.premium && (
                  <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 mb-2">
                      Premium Feature
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Usage: {currentTool.usageLimit}
                    </p>
                  </div>
                )}
              </div>

              {currentTool.premium && user?.subscription === 'free' && (
                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        This is a premium feature. Upgrade your plan to access unlimited usage.
                      </p>
                      <button className="mt-2 text-sm font-medium text-yellow-600 dark:text-yellow-400 hover:text-yellow-500">
                        View Pricing Plans →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {renderToolContent(currentTool)}
            </div>
          </div>

          {/* Features Sidebar */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Features Included
              </h3>
              <ul className="space-y-3">
                {currentTool.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Usage Statistics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">This Month</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {currentTool.id === 'website' ? '2/5' : 
                       currentTool.id === 'branding' ? '5/20' :
                       currentTool.id === 'content' ? '15/100' : '0/10'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ 
                        width: currentTool.id === 'website' ? '40%' : 
                               currentTool.id === 'branding' ? '25%' :
                               currentTool.id === 'content' ? '15%' : '0%'
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Plan: <span className="font-medium text-gray-900 dark:text-white capitalize">
                      {user?.subscription?.plan || 'Free'}
                    </span>
                  </p>
                  <button className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                    Upgrade Plan →
                  </button>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Creations
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Portfolio Website
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      2 hours ago
                    </p>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Brand Guidelines
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      1 day ago
                    </p>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                </div>
                
                <button className="w-full text-center py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                  View All →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsPage;
