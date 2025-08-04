import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { 
  AcademicCapIcon,
  BookOpenIcon,
  PlayIcon,
  ClockIcon,
  StarIcon,
  UserGroupIcon,
  CheckIcon,
  TrophyIcon,
  FireIcon,
  ChartBarIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  PaintBrushIcon,
  MegaphoneIcon,
  ComputerDesktopIcon,
  CameraIcon,
  MusicalNoteIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { PlayIcon as PlaySolidIcon } from '@heroicons/react/24/solid';

const LearningPage = () => {
  const { user } = useAuth();
  const { symbol } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [enrolledCourses, setEnrolledCourses] = useState(new Set([1, 3])); // Demo enrolled courses

  const categories = [
    { id: 'all', name: 'All Courses', icon: BookOpenIcon },
    { id: 'branding', name: 'Branding & Identity', icon: PaintBrushIcon },
    { id: 'marketing', name: 'Digital Marketing', icon: MegaphoneIcon },
    { id: 'business', name: 'Business & Entrepreneurship', icon: CurrencyDollarIcon },
    { id: 'design', name: 'Design & Creative', icon: ComputerDesktopIcon },
    { id: 'photography', name: 'Photography', icon: CameraIcon },
    { id: 'writing', name: 'Content & Writing', icon: DocumentTextIcon },
    { id: 'development', name: 'Web Development', icon: GlobeAltIcon }
  ];

  const learningPaths = [
    {
      id: 1,
      title: 'Complete Brand Builder',
      description: 'Master the art of building powerful brands from concept to execution',
      courses: 8,
      duration: '12 weeks',
      level: 'Beginner to Advanced',
      students: 2340,
      rating: 4.9,
      image: '/api/placeholder/400/250',
      color: 'indigo',
      price: 299,
      originalPrice: 599
    },
    {
      id: 2,
      title: 'Digital Marketing Mastery',
      description: 'Learn proven strategies to grow your business online and increase sales',
      courses: 12,
      duration: '16 weeks',
      level: 'Intermediate',
      students: 3120,
      rating: 4.8,
      image: '/api/placeholder/400/250',
      color: 'green',
      price: 399,
      originalPrice: 799
    },
    {
      id: 3,
      title: 'Creative Entrepreneur',
      description: 'Turn your creative passion into a profitable business',
      courses: 6,
      duration: '8 weeks',
      level: 'Beginner',
      students: 1890,
      rating: 4.7,
      image: '/api/placeholder/400/250',
      color: 'purple',
      price: 199,
      originalPrice: 399
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'Logo Design Fundamentals',
      instructor: 'Sarah Johnson',
      instructorAvatar: '/api/placeholder/40/40',
      category: 'branding',
      level: 'Beginner',
      duration: '4 hours',
      lessons: 24,
      students: 1250,
      rating: 4.8,
      reviews: 324,
      price: 89,
      originalPrice: 149,
      image: '/api/placeholder/300/200',
      description: 'Learn to create professional logos that capture brand essence and stand the test of time.',
      featured: true,
      bestseller: true,
      progress: 65 // For enrolled courses
    },
    {
      id: 2,
      title: 'Social Media Strategy Bootcamp',
      instructor: 'Marcus Chen',
      instructorAvatar: '/api/placeholder/40/40',
      category: 'marketing',
      level: 'Intermediate',
      duration: '6 hours',
      lessons: 32,
      students: 2100,
      rating: 4.9,
      reviews: 567,
      price: 129,
      image: '/api/placeholder/300/200',
      description: 'Master social media marketing with proven strategies that drive engagement and sales.',
      featured: false,
      bestseller: true
    },
    {
      id: 3,
      title: 'Business Plan Development',
      instructor: 'Jennifer Davis',
      instructorAvatar: '/api/placeholder/40/40',
      category: 'business',
      level: 'Beginner',
      duration: '5 hours',
      lessons: 28,
      students: 890,
      rating: 4.7,
      reviews: 234,
      price: 79,
      originalPrice: 119,
      image: '/api/placeholder/300/200',
      description: 'Create a comprehensive business plan that attracts investors and guides your growth.',
      featured: true,
      bestseller: false,
      progress: 30 // For enrolled courses
    },
    {
      id: 4,
      title: 'Advanced Photoshop Techniques',
      instructor: 'Creative Studio',
      instructorAvatar: '/api/placeholder/40/40',
      category: 'design',
      level: 'Advanced',
      duration: '8 hours',
      lessons: 45,
      students: 1560,
      rating: 4.6,
      reviews: 445,
      price: 199,
      image: '/api/placeholder/300/200',
      description: 'Master advanced Photoshop techniques for professional design and photo manipulation.',
      featured: false,
      bestseller: false
    },
    {
      id: 5,
      title: 'Content Writing Mastery',
      instructor: 'Writing Pro',
      instructorAvatar: '/api/placeholder/40/40',
      category: 'writing',
      level: 'Intermediate',
      duration: '7 hours',
      lessons: 35,
      students: 980,
      rating: 4.8,
      reviews: 178,
      price: 99,
      originalPrice: 149,
      image: '/api/placeholder/300/200',
      description: 'Write compelling content that converts readers into customers and builds brand authority.',
      featured: false,
      bestseller: true
    },
    {
      id: 6,
      title: 'Photography Business Basics',
      instructor: 'Photo Expert',
      instructorAvatar: '/api/placeholder/40/40',
      category: 'photography',
      level: 'Beginner',
      duration: '3 hours',
      lessons: 18,
      students: 567,
      rating: 4.5,
      reviews: 89,
      price: 59,
      image: '/api/placeholder/300/200',
      description: 'Start your photography business with essential skills and business knowledge.',
      featured: false,
      bestseller: false
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  const stats = [
    { label: 'Active Students', value: '25K+', icon: UserGroupIcon },
    { label: 'Expert Instructors', value: '150+', icon: AcademicCapIcon },
    { label: 'Course Hours', value: '500+', icon: ClockIcon },
    { label: 'Completion Rate', value: '94%', icon: TrophyIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Academy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Master branding, marketing, and entrepreneurship with AI-powered courses 
            designed for independent creators and business builders.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl mb-3">
                  <stat.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Paths */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Learning Paths
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Structured learning journeys designed to take you from beginner to expert
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {learningPaths.map((path) => (
              <div key={path.id} className="card overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={path.image}
                    alt={path.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span className={`bg-${path.color}-500 text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      Learning Path
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      50% OFF
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {path.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {path.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{path.courses} courses</span>
                    <span>{path.duration}</span>
                    <span>{path.level}</span>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">
                          {path.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {path.students.toLocaleString()} students
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {symbol}{path.price}
                      </span>
                      <span className="text-lg text-gray-500 line-through ml-2">
                        {symbol}{path.originalPrice}
                      </span>
                    </div>
                    <button className="btn btn-primary">
                      Start Learning
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* My Learning Section (for logged in users) */}
        {user && enrolledCourses.size > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Continue Learning
              </h2>
              <Link to="/dashboard" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter(course => enrolledCourses.has(course.id))
                .map((course) => (
                  <div key={course.id} className="card p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          by {course.instructor}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <button className="w-full btn btn-primary">
                      <PlaySolidIcon className="h-4 w-4 mr-2" />
                      Continue Learning
                    </button>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
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
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
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

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card overflow-hidden group hover:shadow-lg transition-shadow duration-200">
              {/* Course Image */}
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex space-x-2">
                  {course.featured && (
                    <span className="bg-indigo-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                  {course.bestseller && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <FireIcon className="h-3 w-3 mr-1" />
                      Bestseller
                    </span>
                  )}
                  {course.originalPrice && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Sale
                    </span>
                  )}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="bg-white rounded-full p-3 shadow-lg">
                    <PlaySolidIcon className="h-6 w-6 text-indigo-600" />
                  </button>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 capitalize">
                    {course.level}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Instructor */}
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {course.instructor}
                  </span>
                </div>

                {/* Course Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpenIcon className="h-4 w-4 mr-1" />
                      {course.lessons} lessons
                    </span>
                  </div>
                </div>

                {/* Rating and Students */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">
                        {course.rating}
                      </span>
                      <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                        ({course.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {course.students.toLocaleString()} students
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {symbol}{course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {symbol}{course.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <button className="btn btn-primary btn-sm">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn btn-secondary">
            Load More Courses
          </button>
        </div>

        {/* Instructor CTA */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Share Your Expertise
          </h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join our community of expert instructors and help others master 
            branding, marketing, and entrepreneurship while earning passive income.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-white text-indigo-600 hover:bg-gray-100">
              <AcademicCapIcon className="h-5 w-5 mr-2" />
              Become an Instructor
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

export default LearningPage;
