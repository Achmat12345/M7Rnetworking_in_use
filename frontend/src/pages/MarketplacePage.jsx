import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  EyeIcon,
  TagIcon,
  UserIcon,
  CheckBadgeIcon,
  PlayIcon,
  DocumentIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  CameraIcon,
  MusicalNoteIcon,
  BookOpenIcon,
  RocketLaunchIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const MarketplacePage = () => {
  const { user } = useAuth();
  const { symbol } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [favorites, setFavorites] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Categories', icon: TagIcon },
    { id: 'templates', name: 'Website Templates', icon: CodeBracketIcon },
    { id: 'graphics', name: 'Graphics & Design', icon: PaintBrushIcon },
    { id: 'courses', name: 'Online Courses', icon: BookOpenIcon },
    { id: 'photography', name: 'Photography', icon: CameraIcon },
    { id: 'music', name: 'Music & Audio', icon: MusicalNoteIcon },
    { id: 'ebooks', name: 'E-books & Guides', icon: DocumentIcon },
    { id: 'tools', name: 'Business Tools', icon: RocketLaunchIcon }
  ];

  const products = [
    {
      id: 1,
      title: 'Modern Portfolio Website Template',
      description: 'Clean, responsive portfolio template perfect for creative professionals',
      price: 49,
      originalPrice: 79,
      category: 'templates',
      seller: {
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/32/32',
        verified: true,
        rating: 4.9,
        sales: 1250
      },
      image: '/api/placeholder/300/200',
      rating: 4.8,
      reviews: 324,
      sales: 2100,
      tags: ['Portfolio', 'Responsive', 'Modern'],
      featured: true,
      discount: 38
    },
    {
      id: 2,
      title: 'Complete Brand Identity Course',
      description: 'Learn to create professional brand identities from scratch in 8 weeks',
      price: 199,
      category: 'courses',
      seller: {
        name: 'Marcus Chen',
        avatar: '/api/placeholder/32/32',
        verified: true,
        rating: 4.7,
        sales: 890
      },
      image: '/api/placeholder/300/200',
      rating: 4.9,
      reviews: 456,
      sales: 1800,
      tags: ['Branding', 'Design', 'Business'],
      featured: false
    },
    {
      id: 3,
      title: 'Logo Design Pack - 50 Templates',
      description: 'Professional logo templates for various industries, fully customizable',
      price: 29,
      category: 'graphics',
      seller: {
        name: 'Creative Studio',
        avatar: '/api/placeholder/32/32',
        verified: true,
        rating: 4.6,
        sales: 2340
      },
      image: '/api/placeholder/300/200',
      rating: 4.7,
      reviews: 189,
      sales: 3200,
      tags: ['Logo', 'Vector', 'Business'],
      featured: true
    },
    {
      id: 4,
      title: 'E-commerce Website Builder',
      description: 'Complete e-commerce solution with payment integration and admin panel',
      price: 149,
      category: 'templates',
      seller: {
        name: 'TechSolutions',
        avatar: '/api/placeholder/32/32',
        verified: true,
        rating: 4.8,
        sales: 567
      },
      image: '/api/placeholder/300/200',
      rating: 4.8,
      reviews: 278,
      sales: 890,
      tags: ['E-commerce', 'Full-stack', 'Payment'],
      featured: false
    },
    {
      id: 5,
      title: 'Social Media Marketing Masterclass',
      description: 'Grow your business with proven social media strategies and tactics',
      price: 89,
      originalPrice: 149,
      category: 'courses',
      seller: {
        name: 'Marketing Pro',
        avatar: '/api/placeholder/32/32',
        verified: true,
        rating: 4.9,
        sales: 1890
      },
      image: '/api/placeholder/300/200',
      rating: 4.9,
      reviews: 567,
      sales: 2400,
      tags: ['Marketing', 'Social Media', 'Strategy'],
      featured: true,
      discount: 40
    },
    {
      id: 6,
      title: 'Stock Photo Bundle - Nature',
      description: 'High-quality nature photography pack with 100+ images',
      price: 19,
      category: 'photography',
      seller: {
        name: 'Nature Shots',
        avatar: '/api/placeholder/32/32',
        verified: false,
        rating: 4.5,
        sales: 234
      },
      image: '/api/placeholder/300/200',
      rating: 4.6,
      reviews: 89,
      sales: 567,
      tags: ['Nature', 'Stock Photos', 'High-res'],
      featured: false
    }
  ];

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === 'free' && product.price === 0) ||
                        (priceRange === 'under50' && product.price < 50) ||
                        (priceRange === 'under100' && product.price < 100) ||
                        (priceRange === 'over100' && product.price >= 100);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      case 'popular':
      default:
        return b.sales - a.sales;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Digital Marketplace
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover and sell digital products, courses, templates, and services. 
            Join our thriving creator economy.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">15K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">8K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Creators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">450K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4.8★</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, courses, templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="under50">Under {symbol}50</option>
              <option value="under100">Under {symbol}100</option>
              <option value="over100">{symbol}100+</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {user ? (
            <button className="btn btn-primary">
              <RocketLaunchIcon className="h-5 w-5 mr-2" />
              Start Selling
            </button>
          ) : (
            <Link to="/register" className="btn btn-primary">
              <UserIcon className="h-5 w-5 mr-2" />
              Join Marketplace
            </Link>
          )}
          <button className="btn btn-secondary">
            <TrophyIcon className="h-5 w-5 mr-2" />
            Top Sellers
          </button>
        </div>

        {/* Category Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex space-x-8 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <div key={product.id} className="card overflow-hidden group hover:shadow-lg transition-shadow duration-200">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex space-x-2">
                  {product.featured && (
                    <span className="bg-indigo-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {favorites.has(product.id) ? (
                    <HeartSolidIcon className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-3">
                    <button className="btn btn-secondary text-white border-white hover:bg-white hover:text-gray-900">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      Preview
                    </button>
                    <button className="btn btn-primary">
                      <ShoppingCartIcon className="h-4 w-4 mr-2" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {product.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Rating and Sales */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">
                        {product.rating}
                      </span>
                      <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {product.sales.toLocaleString()} sales
                  </div>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={product.seller.avatar}
                      alt={product.seller.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.seller.name}
                    </span>
                    {product.seller.verified && (
                      <CheckBadgeIcon className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {symbol}{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {symbol}{product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <button className="btn btn-primary btn-sm">
                    <ShoppingCartIcon className="h-4 w-4 mr-1" />
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn btn-secondary">
            Load More Products
          </button>
        </div>

        {/* Seller CTA */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join thousands of creators earning money by selling their digital products, 
            courses, and services on our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-white text-indigo-600 hover:bg-gray-100">
              <RocketLaunchIcon className="h-5 w-5 mr-2" />
              Become a Seller
            </button>
            <button className="btn border-white text-white hover:bg-white hover:text-indigo-600">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
