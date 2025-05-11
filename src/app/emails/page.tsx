'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EmailFilter from '@/components/EmailFilter';
import EmailList from '@/components/EmailList';
import { mockEmails } from '@/data/mockEmails';
import { Email } from '@/models/type';

export default function EmailPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchEmails = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
  
      // Simulated network delay
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  
      setEmails(mockEmails);
      setFilteredEmails(mockEmails);
    } catch (err: unknown) {
      setError('Failed to fetch emails. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleEmailClick = (email: Email) => {
    // Mark as read locally
    const updatedEmails = emails.map(e =>
      e.id === email.id ? { ...e, read: true } : e
    );
    setEmails(updatedEmails);
    setFilteredEmails(prev =>
      prev.map(e => e.id === email.id ? { ...e, read: true } : e)
    );

    // Navigate to details page
    router.push(`/emails/${email.id}`);
  };

  const handleFilterChange = (filtered: Email[]) => {
    setFilteredEmails(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Security</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Protecting your inbox with AI-powered analysis
            </p>
          </div>
          <div>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Active Protection
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Inbox</h2>
            <button
              onClick={fetchEmails}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-cyan-400 rounded-md hover:bg-cyan-500 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh Emails'}
            </button>
          </div>

          {emails.length > 0 && (
            <EmailFilter emails={emails} onFilterChange={handleFilterChange} />
          )}

          <EmailList
            emails={filteredEmails}
            loading={loading}
            onEmailClick={handleEmailClick}
          />
        </div>
      </main>
    </div>
  );
}
