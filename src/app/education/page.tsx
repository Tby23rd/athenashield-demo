'use client';

import { useState } from 'react';
import { 
  BookOpenIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  SparklesIcon,
  TrophyIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import PersonalizedEducation from '@/components/PersonalizedEducation';
import {educationTopics} from '@/models/type';



export default function EducationPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [progress] = useState(0);
  const [achievements] = useState<string[]>([]);

  const handleTopicClick = (topicId: string) => {
    router.push(`/education/topic/${topicId}`);
  };

  const filteredTopics = educationTopics.filter(topic => {
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || topic.level === selectedLevel;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl -z-10" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <AcademicCapIcon className="h-10 w-10 text-cyan-400 dark:text-blue-400" />
              Email Security Education Center
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Master email security through interactive learning modules, real-world case studies, and hands-on exercises
            </p>
            
            {/* Learning Path Visualization */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Learning Path</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrophyIcon className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {achievements.length} Achievements Unlocked
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <PersonalizedEducation/>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="threats">Threats</option>
              <option value="best-practices">Best Practices</option>
              <option value="dashboard">Dashboard Usage</option>
              <option value="compliance">Compliance</option>
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <BookOpenIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {topic.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    topic.level === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    topic.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {topic.level}
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {topic.category}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {topic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleTopicClick(topic.id)}
                  className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-cyan-400 text-white rounded-lg hover:bg-cyan-500 transition-colors"
                >
                  Learn More
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <QuestionMarkCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No topics found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 