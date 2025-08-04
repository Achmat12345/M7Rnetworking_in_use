import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  ShoppingBagIcon, 
  AcademicCapIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setDashboardData({
        stats: {
          websitesGenerated: 3,
          contentGenerated: 15,
          logosGenerated: 2,
          coursesCompleted: 1,
          totalSales: 0
        },
        recentActivity: {
          websites: [
            { id: '1', name: 'Personal Portfolio', createdAt: '2024-08-01' },
            { id: '2', name: 'Business Website', createdAt: '2024-07-28' }
          ],
          courses: [
            { courseId: '1', courseName: 'Brand Building 101', progress: 75 }
          ]
        }
      });
      setLoading(false);
    }, 1000);
  }, []);

  const quickActions = [
    {
      title: 'Generate Website',
      description: 'Create a professional website with AI',
      icon: SparklesIcon,
      href: '/ai-tools?tool=website',
      color: 'bg-indigo-500',
      available: true
    },
    {
      title: 'Create Content',
      description: 'Generate blog posts, social media content',
      icon: DocumentTextIcon,
      href: '/ai-tools?tool=content',
      color: 'bg-purple-500',
      available: true
    },
    {
      title: 'Build Brand Kit',
      description: 'Create logos, colors, and brand guidelines',
      icon: ChartBarIcon,
      href: '/ai-tools?tool=brand',
      color: 'bg-pink-500',
      available: true
    },
    {
      title: 'Browse Marketplace',
      description: 'Discover and sell digital products',
      icon: ShoppingBagIcon,
      href: '/marketplace',
      color: 'bg-green-500',
      available: true
    },
    {
      title: 'Take Courses',
      description: 'Learn new skills with AI-powered courses',
      icon: AcademicCapIcon,
      href: '/learning',
      color: 'bg-yellow-500',
      available: true
    },
    {
      title: 'View Analytics',
      description: 'Track your progress and performance',
      icon: ArrowTrendingUpIcon,
      href: '/analytics',
      color: 'bg-blue-500',
      available: false
    }
  ];

  const statCards = [
    {
      name: 'Websites Generated',
      value: dashboardData?.stats.websitesGenerated || 0,
      icon: SparklesIcon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20'
    },
    {
      name: 'Content Pieces',
      value: dashboardData?.stats.contentGenerated || 0,
      icon: DocumentTextIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      name: 'Brand Kits',
      value: dashboardData?.stats.logosGenerated || 0,
      icon: ChartBarIcon,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100 dark:bg-pink-900/20'
    },
    {
      name: 'Courses Completed',
      value: dashboardData?.stats.coursesCompleted || 0,
      icon: AcademicCapIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    }
  ];

  if (loading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Here's what's happening with your creative journey today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => (
            <div key={stat.name} className="card p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className={`card p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 ${
                  !action.available ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className={`p-3 rounded-lg ${action.color} text-white`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {action.description}
                    </p>
                    {!action.available && (
                      <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                        Coming soon
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Websites */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Websites
              </h3>
              <Link
                to="/ai-tools?tool=website"
                className="btn btn-ghost text-sm"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Create New
              </Link>
            </div>
            
            {dashboardData?.recentActivity.websites.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recentActivity.websites.map((website) => (
                  <div key={website.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {website.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Created on {new Date(website.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button className="btn btn-ghost text-sm">
                      View
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No websites created yet
                </p>
                <Link
                  to="/ai-tools?tool=website"
                  className="btn btn-primary"
                >
                  Create Your First Website
                </Link>
              </div>
            )}
          </div>

          {/* Learning Progress */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Learning Progress
              </h3>
              <Link
                to="/learning"
                className="btn btn-ghost text-sm"
              >
                Browse Courses
              </Link>
            </div>
            
            {dashboardData?.recentActivity.courses.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recentActivity.courses.map((course) => (
                  <div key={course.courseId} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {course.courseName}
                      </h4>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-200"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AcademicCapIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No courses started yet
                </p>
                <Link
                  to="/learning"
                  className="btn btn-primary"
                >
                  Start Learning
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Subscription Status */}
        <div className="mt-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Current Plan: {user?.subscription.plan.charAt(0).toUpperCase() + user?.subscription.plan.slice(1)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {user?.subscription.plan === 'free' 
                    ? 'Upgrade to unlock unlimited AI generations and premium features'
                    : 'Thank you for being a premium member!'
                  }
                </p>
              </div>
              {user?.subscription.plan === 'free' && (
                <Link
                  to="/pricing"
                  className="btn btn-primary"
                >
                  Upgrade Plan
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
