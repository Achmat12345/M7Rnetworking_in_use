const express = require('express');
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      profile: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        username: user.username,
        bio: user.bio,
        profilePicture: user.profilePicture,
        coverImage: user.coverImage,
        phone: user.phone,
        location: user.location,
        industry: user.industry,
        skills: user.skills,
        experience: user.experience,
        website: user.website,
        socialLinks: user.socialLinks,
        subscription: user.subscription,
        marketplace: user.marketplace,
        brandKit: user.brandKit,
        generatedWebsites: user.generatedWebsites,
        learningProgress: user.learningProgress,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, [
  body('firstName').optional().trim().isLength({ min: 1 }),
  body('lastName').optional().trim().isLength({ min: 1 }),
  body('bio').optional().isLength({ max: 500 }),
  body('phone').optional().isMobilePhone(),
  body('website').optional().isURL(),
  body('industry').optional().isIn([
    'Technology', 'Marketing', 'Design', 'Education', 'Healthcare',
    'Finance', 'Real Estate', 'E-commerce', 'Consulting', 'Other'
  ])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updateData = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      profile: user
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update preferences
router.put('/preferences', auth, async (req, res) => {
  try {
    const { notifications, theme, language } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        $set: {
          'preferences.notifications': notifications,
          'preferences.theme': theme,
          'preferences.language': language
        }
      },
      { new: true }
    ).select('preferences');

    res.json({
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });

  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    // Reset AI usage if needed
    user.resetAIUsageIfNeeded();
    await user.save();

    const dashboardData = {
      user: {
        name: user.fullName,
        profilePicture: user.profilePicture,
        subscription: user.subscription
      },
      stats: {
        websitesGenerated: user.aiUsage.websitesGenerated,
        contentGenerated: user.aiUsage.contentGenerated,
        logosGenerated: user.aiUsage.logosGenerated,
        coursesCompleted: user.learningProgress.filter(c => c.completed).length,
        totalSales: user.marketplace.totalSales || 0
      },
      recentActivity: {
        websites: user.generatedWebsites.slice(-3),
        courses: user.learningProgress.slice(-3)
      },
      quickActions: [
        {
          title: 'Generate Website',
          description: 'Create a professional website with AI',
          action: 'generate-website',
          available: user.canUseAI('website')
        },
        {
          title: 'Create Content',
          description: 'Generate blog posts, social media content',
          action: 'generate-content',
          available: user.canUseAI('content')
        },
        {
          title: 'Build Brand Kit',
          description: 'Create logos, colors, and brand guidelines',
          action: 'generate-brand',
          available: user.canUseAI('logo')
        },
        {
          title: 'Learn & Grow',
          description: 'Take courses to improve your skills',
          action: 'browse-courses',
          available: true
        }
      ]
    };

    res.json(dashboardData);

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Save generated website
router.post('/websites', auth, async (req, res) => {
  try {
    const { name, domain, template, content, isPublished } = req.body;
    
    const website = {
      id: new Date().getTime().toString(),
      name,
      domain,
      template,
      content,
      isPublished: isPublished || false,
      createdAt: new Date()
    };

    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { generatedWebsites: website } }
    );

    res.json({
      message: 'Website saved successfully',
      website
    });

  } catch (error) {
    console.error('Save website error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's websites
router.get('/websites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('generatedWebsites');
    
    res.json({
      websites: user.generatedWebsites || []
    });

  } catch (error) {
    console.error('Get websites error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update learning progress
router.post('/learning/progress', auth, async (req, res) => {
  try {
    const { courseId, courseName, progress, completed } = req.body;
    
    const user = await User.findById(req.user.userId);
    
    // Find existing progress or create new
    const existingIndex = user.learningProgress.findIndex(p => p.courseId === courseId);
    
    if (existingIndex >= 0) {
      user.learningProgress[existingIndex].progress = progress;
      user.learningProgress[existingIndex].completed = completed;
      if (completed) {
        user.learningProgress[existingIndex].completedAt = new Date();
      }
    } else {
      user.learningProgress.push({
        courseId,
        courseName,
        progress,
        completed,
        completedAt: completed ? new Date() : undefined
      });
    }

    await user.save();

    res.json({
      message: 'Learning progress updated',
      progress: user.learningProgress
    });

  } catch (error) {
    console.error('Learning progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete account
router.delete('/account', auth, async (req, res) => {
  try {
    const { password } = req.body;
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify password for security
    if (user.password) {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid password' });
      }
    }

    // Soft delete - mark as inactive
    user.isActive = false;
    user.email = `deleted_${Date.now()}_${user.email}`;
    await user.save();

    res.json({ message: 'Account deleted successfully' });

  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
