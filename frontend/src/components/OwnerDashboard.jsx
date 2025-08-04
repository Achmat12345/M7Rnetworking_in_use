import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const OwnerDashboard = () => {
  const { user, ownerStatus, isOwner } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOwner) {
      fetchDashboardStats();
    }
  }, [isOwner]);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('/admin/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (!isOwner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have owner privileges to access this dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  👑 Platform Owner Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Welcome back, {user?.firstName}! You have full control over M7RNetworking.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  Owner
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  Enterprise Plan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Status Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Platform Ownership Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Role & Permissions</h3>
              <p className="text-sm opacity-90">Role: {ownerStatus?.role}</p>
              <p className="text-sm opacity-90">Permissions: Full Access</p>
              <p className="text-sm opacity-90">Status: Platform Owner</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Platform Control</h3>
              <p className="text-sm opacity-90">✅ User Management</p>
              <p className="text-sm opacity-90">✅ Admin Controls</p>
              <p className="text-sm opacity-90">✅ System Settings</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Unlimited Access</h3>
              <p className="text-sm opacity-90">🚀 AI Generation: Unlimited</p>
              <p className="text-sm opacity-90">💎 All Features Unlocked</p>
              <p className="text-sm opacity-90">📊 Full Analytics Access</p>
            </div>
          </div>
        </div>

        {/* Platform Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">👥</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✅</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Active Users</h3>
                  <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">💎</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Premium Users</h3>
                  <p className="text-2xl font-bold text-purple-600">{stats.premiumUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">⭐</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">New Today</h3>
                  <p className="text-2xl font-bold text-yellow-600">{stats.newUsersToday}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Platform Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl mr-3">👥</span>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Manage Users</h3>
                <p className="text-sm text-gray-500">View and manage all platform users</p>
              </div>
            </button>

            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl mr-3">⚙️</span>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Platform Settings</h3>
                <p className="text-sm text-gray-500">Configure system-wide settings</p>
              </div>
            </button>

            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl mr-3">📊</span>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-500">View detailed platform analytics</p>
              </div>
            </button>

            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl mr-3">💰</span>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Revenue</h3>
                <p className="text-sm text-gray-500">Monitor platform revenue</p>
              </div>
            </button>

            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl mr-3">🛡️</span>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Security</h3>
                <p className="text-sm text-gray-500">Security settings and logs</p>
              </div>
            </button>

            <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl mr-3">🚀</span>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Features</h3>
                <p className="text-sm text-gray-500">Enable/disable platform features</p>
              </div>
            </button>
          </div>
        </div>

        {/* Platform Info */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Platform Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">M7RNetworking</h3>
              <p className="text-sm text-gray-600 mb-4">"Build Identity. Tell Your Story. Create Independence."</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ User Registration & Authentication</li>
                <li>✅ AI-Powered Content Generation</li>
                <li>✅ Professional Networking</li>
                <li>✅ Marketplace Integration</li>
                <li>✅ Learning Platform</li>
                <li>✅ South African Rand (ZAR) Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Your Owner Account</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> {user?.email}</p>
                <p><span className="font-medium">Name:</span> {user?.firstName} {user?.lastName}</p>
                <p><span className="font-medium">Role:</span> Platform Owner</p>
                <p><span className="font-medium">Plan:</span> Enterprise (Unlimited)</p>
                <p><span className="font-medium">Status:</span> <span className="text-green-600">Active</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
