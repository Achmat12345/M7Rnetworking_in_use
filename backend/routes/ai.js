const express = require('express');
const OpenAI = require('openai');
const { auth } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Initialize OpenAI conditionally
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
} else {
  console.warn('⚠️ OPENAI_API_KEY not found. AI features will be disabled.');
}

// Generate website content
router.post('/generate-website', auth, async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({ 
        error: 'AI services are currently unavailable',
        message: 'OpenAI API key is not configured'
      });
    }

    const { businessType, businessName, description, industry, targetAudience, style, pages } = req.body;
    
    // Check if user can use AI
    const user = await User.findById(req.user.userId);
    if (!user.canUseAI('website')) {
      return res.status(403).json({ 
        error: 'AI usage limit exceeded',
        upgradeMessage: 'Upgrade your plan to generate more websites'
      });
    }

    const prompt = `
    Create a professional website content for a ${businessType} business called "${businessName}".
    
    Business Description: ${description}
    Industry: ${industry}
    Target Audience: ${targetAudience}
    Design Style: ${style}
    Pages Needed: ${pages.join(', ')}
    
    Generate complete content including:
    1. Homepage hero section with compelling headline and call-to-action
    2. About page content
    3. Services/Products descriptions
    4. Contact information template
    5. SEO-optimized meta descriptions
    6. Color scheme suggestions
    7. Font recommendations
    
    Format the response as JSON with sections for each page and design recommendations.
    Make it professional, engaging, and tailored to the target audience.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional web designer and copywriter. Create compelling, SEO-optimized website content."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    const generatedContent = completion.choices[0].message.content;

    // Update user's AI usage
    user.aiUsage.websitesGenerated += 1;
    await user.save();

    res.json({
      success: true,
      content: generatedContent,
      usage: {
        websitesGenerated: user.aiUsage.websitesGenerated,
        remainingWebsites: user.canUseAI('website') ? 'unlimited' : 'limit reached'
      }
    });

  } catch (error) {
    console.error('Website generation error:', error);
    res.status(500).json({ error: 'Failed to generate website content' });
  }
});

// Generate brand kit
router.post('/generate-brand', auth, async (req, res) => {
  try {
    const { businessName, industry, targetAudience, brandPersonality, values } = req.body;
    
    const user = await User.findById(req.user.userId);
    if (!user.canUseAI('logo')) {
      return res.status(403).json({ 
        error: 'AI usage limit exceeded',
        upgradeMessage: 'Upgrade your plan to generate more branding assets'
      });
    }

    const prompt = `
    Create a comprehensive brand identity kit for "${businessName}" in the ${industry} industry.
    
    Target Audience: ${targetAudience}
    Brand Personality: ${brandPersonality}
    Core Values: ${values}
    
    Generate:
    1. Brand positioning statement
    2. Color palette (primary, secondary, accent colors with hex codes)
    3. Typography recommendations (font families for headers and body text)
    4. Brand voice and tone guidelines
    5. Logo concept descriptions (3 different concepts)
    6. Brand guidelines summary
    7. Social media bio suggestions
    
    Format as JSON with clear sections for each element.
    Make it professional and cohesive.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional brand strategist and designer. Create cohesive, market-appropriate brand identities."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7
    });

    const brandKit = completion.choices[0].message.content;

    // Update user's AI usage and save brand kit
    user.aiUsage.logosGenerated += 1;
    user.brandKit = {
      ...user.brandKit,
      brandGuidelines: brandKit,
      lastUpdated: new Date()
    };
    await user.save();

    res.json({
      success: true,
      brandKit: brandKit,
      usage: {
        logosGenerated: user.aiUsage.logosGenerated,
        remainingLogos: user.canUseAI('logo') ? 'unlimited' : 'limit reached'
      }
    });

  } catch (error) {
    console.error('Brand generation error:', error);
    res.status(500).json({ error: 'Failed to generate brand kit' });
  }
});

// Generate content (blog posts, social media, etc.)
router.post('/generate-content', auth, async (req, res) => {
  try {
    const { contentType, topic, tone, length, targetAudience, keywords } = req.body;
    
    const user = await User.findById(req.user.userId);
    if (!user.canUseAI('content')) {
      return res.status(403).json({ 
        error: 'AI usage limit exceeded',
        upgradeMessage: 'Upgrade your plan to generate more content'
      });
    }

    let prompt = '';
    
    switch (contentType) {
      case 'blog-post':
        prompt = `Write a ${length} blog post about "${topic}" for ${targetAudience}. 
                 Tone: ${tone}. Include these keywords naturally: ${keywords}.
                 Include a compelling title, introduction, main sections with headers, and conclusion.
                 Make it SEO-optimized and engaging.`;
        break;
        
      case 'social-media':
        prompt = `Create ${length} social media posts about "${topic}" for ${targetAudience}.
                 Tone: ${tone}. Include relevant hashtags and calls-to-action.
                 Make them engaging and shareable.`;
        break;
        
      case 'product-description':
        prompt = `Write a compelling product description for "${topic}".
                 Target audience: ${targetAudience}. Tone: ${tone}.
                 Include key features, benefits, and a strong call-to-action.
                 Length: ${length}`;
        break;
        
      case 'email-campaign':
        prompt = `Create an email campaign about "${topic}" for ${targetAudience}.
                 Tone: ${tone}. Include subject line, preheader, body content, and CTA.
                 Make it conversion-focused and engaging.`;
        break;
        
      default:
        prompt = `Create ${contentType} content about "${topic}" for ${targetAudience}.
                 Tone: ${tone}. Length: ${length}. Make it professional and engaging.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional content writer and marketer. Create high-quality, engaging content that drives results."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: contentType === 'blog-post' ? 1500 : 800,
      temperature: 0.7
    });

    const generatedContent = completion.choices[0].message.content;

    // Update user's AI usage
    user.aiUsage.contentGenerated += 1;
    await user.save();

    res.json({
      success: true,
      content: generatedContent,
      contentType,
      usage: {
        contentGenerated: user.aiUsage.contentGenerated,
        remainingContent: user.canUseAI('content') ? 'unlimited' : 'limit reached'
      }
    });

  } catch (error) {
    console.error('Content generation error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

// AI Chat Assistant
router.post('/chat', auth, async (req, res) => {
  try {
    const { message, context } = req.body;
    const user = await User.findById(req.user.userId);

    const systemPrompt = `You are M7R Assistant, an AI helper for the M7RNetworking platform. 
    You help users with branding, content creation, website building, marketing, and growing their business.
    
    User Info:
    - Name: ${user.fullName}
    - Subscription: ${user.subscription.plan}
    - Industry: ${user.industry || 'Not specified'}
    - AI Usage: ${user.aiUsage.websitesGenerated} websites, ${user.aiUsage.contentGenerated} content pieces generated this month
    
    Be helpful, encouraging, and provide actionable advice. If they need premium features, gently suggest upgrading.
    Keep responses concise but informative.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        ...(context || []),
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.8
    });

    const response = completion.choices[0].message.content;

    res.json({
      success: true,
      response: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Get AI usage stats
router.get('/usage', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.resetAIUsageIfNeeded();
    
    const limits = {
      free: { websites: 2, content: 20, logos: 3 },
      pro: { websites: 10, content: 100, logos: 15 },
      enterprise: { websites: -1, content: -1, logos: -1 }
    };
    
    const userLimits = limits[user.subscription.plan];
    
    res.json({
      currentUsage: user.aiUsage,
      limits: userLimits,
      subscription: user.subscription.plan,
      canUse: {
        website: user.canUseAI('website'),
        content: user.canUseAI('content'),
        logo: user.canUseAI('logo')
      }
    });

  } catch (error) {
    console.error('Usage stats error:', error);
    res.status(500).json({ error: 'Failed to get usage stats' });
  }
});

module.exports = router;
