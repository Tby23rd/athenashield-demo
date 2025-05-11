'use client';

import { useMemo } from 'react';
import {
  SparklesIcon,

  ShieldExclamationIcon
} from '@heroicons/react/24/outline';

export default function PersonalizedEducation() {
  const insights = useMemo(() => {
    return [
      {
        topicId: 'phishing-basics',
        message: 'Phishing continues to be a top threat — learn to spot and stop common tactics.'
      },
      {
        topicId: 'email-security-best-practices',
        message: 'You may be missing key technical and behavioral protections. Review best practices.'
      },
      {
        topicId: 'dashboard-usage',
        message: 'Revisit how to use your dashboard effectively for threat detection and response.'
      }
    ];
  }, []);

  return (
    <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <SparklesIcon className="h-5 w-5 text-purple-500" />
        Personalized Learning Suggestions
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Based on common threat patterns and learning gaps, here are your next best modules:
      </p>

      <ul className="list-none space-y-4">
        {insights.map((rec, index) => (
          <li
            key={index}
            className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
          >
            <ShieldExclamationIcon className="h-5 w-5 text-yellow-500 mt-1" />
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{rec.message}</p>
              <a
                href={`/education/topic/${rec.topicId}`}
                className="inline-block text-cyan-400 dark:text-blue-400 text-sm mt-1 hover:underline"
              >
                Go to Module →
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        Explore more to unlock achievements and deepen your expertise.
      </div>
    </div>
  );
}
