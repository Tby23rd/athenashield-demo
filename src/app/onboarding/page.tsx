'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import EmailProviderCard from '@/components/email/EmailProviderCard';

type Provider=
  |'gmail'
  |'outlook'
  |'yahoo'
  |'zoho'
  |'icloud'
  |'protonmail';

const providerStyles: Record<Provider,{label: string; color: string; emoji: string}>={
  gmail: {label: 'Gmail',color: 'bg-[#D93025]',emoji: '📧'},
  outlook: {label: 'Outlook',color: 'bg-[#0078D4]',emoji: '📬'},
  yahoo: {label: 'Yahoo Mail',color: 'bg-[#6001D2]',emoji: '💌'},
  zoho: {label: 'Zoho Mail',color: 'bg-[#C8202F]',emoji: '📮'},
  icloud: {label: 'iCloud Mail',color: 'bg-[#1791F0]',emoji: '☁️'},
  protonmail: {label: 'ProtonMail',color: 'bg-[#6D4AFF]',emoji: '🔐'},
};

export default function Onboarding() {
  const [step,setStep]=useState(1);
  const [provider,setProvider]=useState<Provider|null>(null);
  const [,setIsLoading]=useState(false);
  const router=useRouter();

  const handleProviderSelect=(selected: Provider) => {
    setProvider(selected);
    setStep(2);
  };

  const simulateOAuth = async () => {
    setIsLoading(true);
    setStep(3); // Simulating redirect
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStep(4); // Simulating inbox connection
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStep(5); // Final provider card / animation step
    await new Promise((resolve) => setTimeout(resolve, 2500));
    router.push('/dashboard');
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-sky-100 to-violet-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white">
            🛡️ AthenaShield
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
            Your AI-powered email security assistant
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-10 max-w-2xl mx-auto space-y-8">
          {step===1&&(
            <>
              <p className="text-center text-md font-medium text-gray-700 dark:text-gray-200">
                Select your email provider to begin:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {(Object.keys(providerStyles) as Provider[]).map((prov) => (
                  <EmailProviderCard
                    key={prov}
                    label={providerStyles[prov].label}
                    emoji={providerStyles[prov].emoji}
                    color={providerStyles[prov].color}
                    onClick={() => handleProviderSelect(prov)}
                  />
                ))}
              </div>
            </>
          )}

          {step===2&&provider&&(
            <>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-2xl space-y-3">
                <h3 className="font-semibold text-blue-800 dark:text-blue-100">
                  What we’ll ask permission for
                </h3>
                <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>Read your email messages</li>
                  <li>Scan for spam, scams, and threats</li>
                  <li>Give you personalized security advice</li>
                </ul>
                {(provider==='icloud'||provider==='protonmail')&&(
                  <p className="text-xs text-yellow-800 dark:text-yellow-400 mt-2">
                    ⚠️ {providerStyles[provider].label} may require extra setup or offers limited access.
                  </p>
                )}
              </div>
              <button
                onClick={simulateOAuth}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-6 rounded-full font-semibold transition-colors mt-4"
              >
                Authorize {providerStyles[provider].label}
              </button>
            </>
          )}

          {step===3&&provider&&(
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Redirecting to {providerStyles[provider].label}...
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Simulating secure login & permissions
              </p>
            </div>
          )}

          {step===4&&provider&&(
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Connecting your {providerStyles[provider].label} inbox...
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Simulating access and AI security scan
              </p>
            </div>
          )}

          {step===5&&provider&&(
            <div className="space-y-6 text-center">
              <div className={`inline-flex items-center justify-center gap-2 text-white py-3 px-6 rounded-full font-bold ${providerStyles[provider].color}`}>
                <span className="text-xl">{providerStyles[provider].emoji}</span>
                {providerStyles[provider].label}
              </div>
              <div className="text-lg font-medium text-gray-800 dark:text-white">
                Running final checks...
              </div>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>✅ Email access granted</li>
                <li>🔎 Scanning inbox for threats</li>
                <li>⚙️ Generating security summary</li>
                <li>📊 Preparing your dashboard</li>
              </ul>
              <div className="animate-pulse text-sm text-cyan-600 dark:text-cyan-300 mt-4">
                Hang tight — launching AthenaShield...
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
