'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // In a real app, this would handle OAuth or email verification
    // For demo, we'll just simulate success
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStep(2);
    setIsLoading(false);
  };

  const handleConnect = async () => {
    setIsLoading(true);
    setStep(3);
    // Simulate connecting to email service
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
         
          <h1 className="text-4xl font-bold mb-4">Welcome to AthenaShield</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your AI-powered email security assistant
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Connect your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-400 text-white py-2 px-4 rounded-lg hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Continue'}
              </button>
            </form>
          ) : step === 2 ? (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Required Permissions
                </h3>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <li>• Read email messages and content</li>
                  <li>• Analyze email security and content</li>
                  <li>• Provide security recommendations</li>
                </ul>
              </div>
              <button
                onClick={handleConnect}
                className="w-full bg-cyan-400 text-white py-2 px-4 rounded-lg hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Connecting...' : 'Connect Email Account'}
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
              <h3 className="text-lg font-medium">Connecting your email account...</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please wait while we set up your email security analysis
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 