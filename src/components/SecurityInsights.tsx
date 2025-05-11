'use client';

import {Email} from '@/models/type';
import { useMemo } from 'react';

interface SecurityInsightsProps {
  emails: Email[];
}

export default function SecurityInsights({ emails }: SecurityInsightsProps) {
  const insights = useMemo(() => {
    const totalEmails = emails.length;
    if (totalEmails === 0) return null;

    let highRiskEmails = 0;
    let spamEmails = 0;
    let securityEmails = 0;
    let unreadEmails = 0;
    let urgentEmails = 0;
    let positive = 0, negative = 0, neutral = 0;
    let phishingSum = 0;
    let spamSum = 0;
    let suspiciousLinks = 0;
    let suspiciousAttachments = 0;
    const categoryDistribution: Record<string, number> = {};
    const priorityDistribution: Record<string, number> = {};

    emails.forEach(email => {
      if (!email) return;
      if (!email.read) unreadEmails++;
      
      // Category distribution
      categoryDistribution[email.category] = (categoryDistribution[email.category] || 0) + 1;
      priorityDistribution[email.priority] = (priorityDistribution[email.priority] || 0) + 1;
      
      if (email.category === 'security') securityEmails++;
      
      if (email.aiAnalysis) {
        phishingSum += email.aiAnalysis.phishingProbability || 0;
        spamSum += email.aiAnalysis.spamProbability || 0;
        
        if (email.aiAnalysis.phishingProbability > 0.5) highRiskEmails++;
        if (email.aiAnalysis.spamProbability > 0.5) spamEmails++;
        if (email.aiAnalysis.urgency === 'high') urgentEmails++;
        if (email.aiAnalysis.sentiment === 'positive') positive++;
        if (email.aiAnalysis.sentiment === 'negative') negative++;
        if (email.aiAnalysis.sentiment === 'neutral') neutral++;
        
        // Check for suspicious content
        if (email.content?.includes('http://') || email.content?.includes('https://')) {
          suspiciousLinks++;
        }
        if (email.attachments?.length) {
          suspiciousAttachments++;
        }
      }
    });

    const averagePhishingRisk = totalEmails ? phishingSum / totalEmails : 0;
    const averageSpamRisk = totalEmails ? spamSum / totalEmails : 0;

    return {
      totalEmails,
      highRiskEmails,
      spamEmails,
      securityEmails,
      unreadEmails,
      urgentEmails,
      positive,
      negative,
      neutral,
      averagePhishingRisk,
      averageSpamRisk,
      suspiciousLinks,
      suspiciousAttachments,
      categoryDistribution,
      priorityDistribution
    };
  }, [emails]);

  if (!insights) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Security Insights</h2>
        <p className="text-gray-600 dark:text-gray-300">No emails to analyze.</p>
      </div>
    );
  }

  const getRiskLevelColor = (value: number) => {
    if (value > 0.7) return 'text-red-600';
    if (value > 0.4) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Security Insights</h2>
      <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Analysis of {emails.length} email{emails.length > 1 ? 's' : ''}
        {emails.length === 1 && ' (selected)'}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Risk Assessment</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Phishing Risk:</span>
              <span className={getRiskLevelColor(insights.averagePhishingRisk)}>
                {(insights.averagePhishingRisk * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Spam Risk:</span>
              <span className={getRiskLevelColor(insights.averageSpamRisk)}>
                {(insights.averageSpamRisk * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Email Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Unread:</span>
              <span>{insights.unreadEmails} / {insights.totalEmails}</span>
            </div>
            <div className="flex justify-between">
              <span>Urgent:</span>
              <span>{insights.urgentEmails}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Threat Indicators</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
            <div className="text-red-600 dark:text-red-400 font-medium">
              {insights.highRiskEmails}
            </div>
            <div className="text-sm text-red-600 dark:text-red-400">High Risk Emails</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg">
            <div className="text-yellow-600 dark:text-yellow-400 font-medium">
              {insights.spamEmails}
            </div>
            <div className="text-sm text-yellow-600 dark:text-yellow-400">Spam Emails</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg">
            <div className="text-orange-600 dark:text-orange-400 font-medium">
              {insights.suspiciousLinks}
            </div>
            <div className="text-sm text-orange-600 dark:text-orange-400">Suspicious Links</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg">
            <div className="text-orange-600 dark:text-orange-400 font-medium">
              {insights.suspiciousAttachments}
            </div>
            <div className="text-sm text-orange-600 dark:text-orange-400">Suspicious Attachments</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Category Distribution</h3>
        <div className="space-y-2">
          {Object.entries(insights.categoryDistribution).map(([category, count]) => (
            <div key={category} className="flex justify-between items-center">
              <span className="capitalize">{category}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-cyan-400 h-2 rounded-full"
                    style={{ width: `${(count / insights.totalEmails) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Sentiment Analysis</h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-green-600">+{insights.positive}</span>
            <span className="text-gray-600">{insights.neutral}</span>
            <span className="text-red-600">-{insights.negative}</span>
          </div>
          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 via-gray-500 to-red-500 h-2 rounded-full"
              style={{
                width: '100%',
                backgroundSize: `${insights.totalEmails * 100}% 100%`,
                backgroundPosition: `${(insights.positive / insights.totalEmails) * 100}% 0`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}