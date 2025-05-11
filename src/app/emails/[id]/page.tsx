'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { mockEmails } from '@/data/mockEmails';
import SecurityInsights from '@/components/SecurityInsights';
import {ArrowLeftIcon} from '@heroicons/react/24/outline';

export default function EmailDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const email = mockEmails.find(e => e.id === id);

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">Email not found</p>
        <button onClick={() => router.back()} className="mt-4 px-4 py-2 bg-cyan-400 text-white rounded">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        
      <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-cyan-400 dark:hover:text-blue-400 transition-colors mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Topics
          </button>
          <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Email Details</h2>
          <p><strong>Subject:</strong> {email.subject}</p>
          <p><strong>Sender:</strong> {email.sender}</p>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            {email.aiAnalysis?.summary}
          </p>
        </div>
        <SecurityInsights emails={[email]} />

        
      </div>
    </div>
  );
}
