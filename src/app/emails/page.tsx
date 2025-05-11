/**
 * Email Analysis Dashboard
 * 
 * This component serves as the main dashboard for email security analysis.
 * It displays a list of emails with their security analysis results including
 * phishing detection, spam probability, and AI-generated insights.
 * 
 * Features:
 * - Email listing with filtering capabilities
 * - Security analysis visualization
 * - Detailed view of selected emails
 * - AI-powered email content analysis
 * 
 * @component Dashboard
 */

'use client';

import { useState, useEffect } from 'react';
import EmailFilter from '../../components/EmailFilter';
import EmailList from '../../components/EmailList';
import SecurityInsights from '@/components/SecurityInsights';
import { mockEmails } from '@/data/mockEmails';
import {Email} from '@/models/type';

export default function Dashboard() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  // Mock function to fetch emails - will be replaced with actual API call
  const fetchEmails = async () => {
    try {
      setLoading(true);
      setError(null);
      // This would be replaced with an actual API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEmails(mockEmails);
      setFilteredEmails(mockEmails);
    } catch (err) {
      setError('Failed to fetch emails. Please try again.');
      console.error('Error fetching emails:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch emails on component mount
  useEffect(() => {
    fetchEmails();
  }, []);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    const updatedEmails = emails.map(e => 
      e.id === email.id ? { ...e, read: true } : e
    );
    setEmails(updatedEmails);
    setFilteredEmails(prev => 
      prev.map(e => e.id === email.id ? { ...e, read: true } : e)
    );
  };

  const handleFilterChange = (filtered: Email[]) => {
    setFilteredEmails(filtered);
  };

  return (
   
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <header className="bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white"> Email Security</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Protecting your inbox with AI-powered analysis</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Active Protection
                </span>
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Email Analysis</h2>
                    <button
                      onClick={fetchEmails}
                      disabled={loading}
                      className="px-4 py-2 text-sm font-medium text-white bg-cyan-400 rounded-md hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              </div>

              <div className="lg:col-span-1 space-y-6">
                <SecurityInsights emails={selectedEmail ? [selectedEmail] : filteredEmails} />
                
                {selectedEmail && selectedEmail.aiAnalysis && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Email Details</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Subject</h3>
                        <p>{selectedEmail.subject}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">From</h3>
                        <p>{selectedEmail.sender}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Security Analysis</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between">
                            <span>Phishing Risk:</span>
                            <span className={`font-medium ${
                              selectedEmail.aiAnalysis.phishingProbability > 0.5 
                                ? 'text-red-600' 
                                : 'text-green-600'
                            }`}>
                              {(selectedEmail.aiAnalysis.phishingProbability * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Spam Probability:</span>
                            <span className={`font-medium ${
                              selectedEmail.aiAnalysis.spamProbability > 0.5 
                                ? 'text-red-600' 
                                : 'text-green-600'
                            }`}>
                              {(selectedEmail.aiAnalysis.spamProbability * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">AI Summary</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {selectedEmail.aiAnalysis.summary}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedEmail.aiAnalysis.keywords.map((keyword, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      )}