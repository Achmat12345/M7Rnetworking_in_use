import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SparklesIcon,
  RocketLaunchIcon,
  HeartIcon,
  LightBulbIcon,
  GlobeAltIcon,
  TrophyIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const AboutPage = () => {
  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      bio: 'Serial entrepreneur with 10+ years in AI and creative technology. Previously founded two successful startups.',
      image: '/api/placeholder/200/200',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Product',
      bio: 'Former design director at major tech companies. Passionate about democratizing creativity through AI.',
      image: '/api/placeholder/200/200',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      bio: 'AI researcher and engineer with expertise in machine learning and scalable systems architecture.',
      image: '/api/placeholder/200/200',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Jennifer Davis',
      role: 'Head of Community',
      bio: 'Community builder and educator helping creators succeed in the digital economy for over 8 years.',
      image: '/api/placeholder/200/200',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  const values = [
    {
      icon: SparklesIcon,
      title: 'Innovation',
      description: 'We push the boundaries of what\'s possible with AI to empower human creativity.'
    },
    {
      icon: HeartIcon,
      title: 'Community',
      description: 'We believe in the power of creators supporting creators in a thriving ecosystem.'
    },
    {
      icon: LightBulbIcon,
      title: 'Accessibility',
      description: 'Professional-grade tools should be accessible to everyone, regardless of budget or skill level.'
    },
    {
      icon: TrophyIcon,
      title: 'Excellence',
      description: 'We\'re committed to delivering the highest quality tools and support to our users.'
    }
  ];

  const stats = [
    { label: 'Active Creators', value: '25K+', icon: UsersIcon },
    { label: 'Websites Built', value: '100K+', icon: GlobeAltIcon },
    { label: 'Brands Created', value: '50K+', icon: SparklesIcon },
    { label: 'Success Stories', value: '2K+', icon: TrophyIcon }
  ];

  const milestones = [
    {
      year: '2022',
      title: 'The Beginning',
      description: 'M7RNetworking was founded with a vision to democratize professional branding and web design.'
    },
    {
      year: '2023',
      title: 'AI-Powered Launch',
      description: 'Released our first AI website builder, making professional web design accessible to everyone.'
    },
    {
      year: '2024',
      title: 'Marketplace Opens',
      description: 'Launched the digital marketplace, creating new income opportunities for creators worldwide.'
    },
    {
      year: '2025',
      title: 'Global Expansion',
      description: 'Expanded to support multiple currencies and languages, serving creators across 50+ countries.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Building the Future of{' '}
            <span className="text-gradient">Creative Independence</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            M7RNetworking empowers creators, entrepreneurs, and dreamers worldwide to build their 
            brands, tell their stories, and create true independence through AI-powered tools 
            and a thriving creator economy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn btn-primary">
              <RocketLaunchIcon className="h-5 w-5 mr-2" />
              Join Our Community
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get in Touch
            </Link>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="mb-20">
          <div className="card p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              To democratize professional branding and web design by providing AI-powered tools 
              that enable anyone to create stunning brands, websites, and content. We believe 
              every creator deserves access to professional-grade tools without the traditional 
              barriers of cost, complexity, or technical expertise.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl mb-4">
                  <stat.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300">
                <p>
                  M7RNetworking was born from a simple observation: while technology has 
                  advanced dramatically, creating professional brands and websites remained 
                  expensive, time-consuming, and technically challenging for most people.
                </p>
                <p>
                  Our founder, Alex Johnson, experienced this firsthand while helping friends 
                  launch their businesses. Despite having great ideas and passion, many struggled 
                  with the technical and design aspects of building their online presence.
                </p>
                <p>
                  We set out to change that by combining cutting-edge AI technology with 
                  intuitive design, making professional branding and web design accessible 
                  to everyone. Today, we're proud to serve thousands of creators worldwide.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/api/placeholder/600/400"
                alt="Our story"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-lg"></div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Key milestones in our mission to empower creators worldwide
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-full max-w-md ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="card p-6">
                      <div className="flex items-center mb-4">
                        <span className="bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white dark:border-gray-900"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-lg transition-shadow duration-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl mb-6">
                  <value.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The passionate people behind M7RNetworking
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-lg transition-shadow duration-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.linkedin}
                    className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section className="mb-20">
          <div className="card p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Powered by Innovation
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our platform leverages cutting-edge AI and machine learning technologies 
                to deliver professional results in seconds, not hours.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-xl mb-4">
                  <SparklesIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Advanced AI Models
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  State-of-the-art language and vision models trained specifically for creative tasks.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-xl mb-4">
                  <ChartBarIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Smart Analytics
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time insights and performance metrics to help you optimize your creations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-xl mb-4">
                  <GlobeAltIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Global Infrastructure
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Fast, reliable service powered by edge computing and global CDN networks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Join Our Mission?
            </h2>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Whether you're a creator, entrepreneur, or just someone with a big dream, 
              we're here to help you build your brand and tell your story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn bg-white text-indigo-600 hover:bg-gray-100">
                <RocketLaunchIcon className="h-5 w-5 mr-2" />
                Start Building Today
              </Link>
              <Link to="/learning" className="btn border-white text-white hover:bg-white hover:text-indigo-600">
                Explore Learning Academy
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
