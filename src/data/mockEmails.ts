import {Email} from "@/models/type";

export const mockEmails: Email[] = [
  {
    id: '1',
    subject: 'Suspicious Login Attempt',
    sender: 'security@company.com',
    preview: 'We detected a login attempt from an unknown device...',
    timestamp: new Date().toISOString(),
    read: false,
    category: 'security',
    priority: 'high',
    aiAnalysis: {
      sentiment: 'negative',
      spamProbability: 0.02,
      phishingProbability: 0.85,
      urgency: 'high',
      summary: 'Potential security breach attempt detected',
      suggestedCategory: 'security',
      suggestedPriority: 'high',
      keywords: ['login', 'security', 'breach', 'suspicious']
    }
  },
  {
    id: '2',
    subject: 'Invoice Payment Required',
    sender: 'billing@supplier.com',
    preview: 'Your invoice #INV-2024-001 is due...',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: true,
    category: 'finance',
    priority: 'medium',
    aiAnalysis: {
      sentiment: 'neutral',
      spamProbability: 0.15,
      phishingProbability: 0.45,
      urgency: 'medium',
      summary: 'Suspicious invoice payment request',
      suggestedCategory: 'finance',
      suggestedPriority: 'medium',
      keywords: ['invoice', 'payment', 'due', 'billing']
    }
  },
  {
    id: '3',
    subject: 'Password Reset Request',
    sender: 'noreply@service.com',
    preview: 'We received a request to reset your password...',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    read: false,
    category: 'security',
    priority: 'high',
    aiAnalysis: {
      sentiment: 'negative',
      spamProbability: 0.05,
      phishingProbability: 0.75,
      urgency: 'high',
      summary: 'Potential phishing attempt for password reset',
      suggestedCategory: 'security',
      suggestedPriority: 'high',
      keywords: ['password', 'reset', 'security', 'account']
    }
  },
    {
      id: '4',
      subject: 'Unusual Spending Activity',
      sender: 'alerts@bank.com',
      preview: 'We noticed a charge outside your usual activity...',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      category: 'finance',
      priority: 'high',
      aiAnalysis: {
        sentiment: 'negative',
        spamProbability: 0.03,
        phishingProbability: 0.6,
        urgency: 'high',
        summary: 'Fraud alert about unusual credit card activity',
        suggestedCategory: 'finance',
        suggestedPriority: 'high',
        keywords: ['fraud', 'bank', 'charge', 'alert']
      }
    },
    {
      id: '5',
      subject: 'Subscription Confirmation',
      sender: 'noreply@streaming.com',
      preview: 'Thank you for subscribing to our premium plan...',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      read: true,
      category: 'entertainment',
      priority: 'low',
      aiAnalysis: {
        sentiment: 'positive',
        spamProbability: 0.01,
        phishingProbability: 0,
        urgency: 'low',
        summary: 'Subscription confirmation for entertainment service',
        suggestedCategory: 'entertainment',
        suggestedPriority: 'low',
        keywords: ['subscription', 'streaming', 'confirmation']
      }
    },
    {
      id: '6',
      subject: 'Reset Your Security Questions',
      sender: 'support@insurance.com',
      preview: 'As part of our security update, please reset your questions...',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: false,
      category: 'security',
      priority: 'medium',
      aiAnalysis: {
        sentiment: 'neutral',
        spamProbability: 0.04,
        phishingProbability: 0.3,
        urgency: 'medium',
        summary: 'Prompt to update security credentials',
        suggestedCategory: 'security',
        suggestedPriority: 'medium',
        keywords: ['security', 'reset', 'account', 'insurance']
      }
    },
    {
      id: '7',
      subject: 'Update Your Contact Info',
      sender: 'admin@university.edu',
      preview: 'It’s time to update your student records...',
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      read: true,
      category: 'education',
      priority: 'medium',
      aiAnalysis: {
        sentiment: 'neutral',
        spamProbability: 0.01,
        phishingProbability: 0,
        urgency: 'medium',
        summary: 'Reminder to update university contact information',
        suggestedCategory: 'education',
        suggestedPriority: 'medium',
        keywords: ['university', 'update', 'records', 'contact']
      }
    },
    {
      id: '8',
      subject: 'Event Registration: Health Summit 2024',
      sender: 'events@healthconf.com',
      preview: 'Register now for early bird access...',
      timestamp: new Date(Date.now() - 604800000).toISOString(),
      read: false,
      category: 'events',
      priority: 'low',
      aiAnalysis: {
        sentiment: 'positive',
        spamProbability: 0.05,
        phishingProbability: 0.02,
        urgency: 'low',
        summary: 'Promotion for upcoming health event',
        suggestedCategory: 'events',
        suggestedPriority: 'low',
        keywords: ['event', 'registration', 'health', 'summit']
      }
    },
    {
      id: '9',
      subject: 'Upcoming Maintenance Downtime',
      sender: 'it@company.com',
      preview: 'Scheduled system downtime this weekend...',
      timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
      read: true,
      category: 'work',
      priority: 'medium',
      aiAnalysis: {
        sentiment: 'neutral',
        spamProbability: 0.01,
        phishingProbability: 0.01,
        urgency: 'medium',
        summary: 'Notice of scheduled maintenance for internal systems',
        suggestedCategory: 'work',
        suggestedPriority: 'medium',
        keywords: ['maintenance', 'downtime', 'IT', 'schedule']
      }
    },
    {
      id: '10',
      subject: 'Claim Your Loyalty Reward',
      sender: 'rewards@retailbrand.com',
      preview: 'You’ve earned points this month...',
      timestamp: new Date(Date.now() - 432000000).toISOString(),
      read: false,
      category: 'shopping',
      priority: 'low',
      aiAnalysis: {
        sentiment: 'positive',
        spamProbability: 0.08,
        phishingProbability: 0.15,
        urgency: 'low',
        summary: 'Loyalty program reward notification',
        suggestedCategory: 'shopping',
        suggestedPriority: 'low',
        keywords: ['reward', 'loyalty', 'points', 'shopping']
      }
    },
    {
      id: '11',
      subject: 'New Sign-In from Unknown Location',
      sender: 'noreply@socialnetwork.com',
      preview: 'We noticed a sign-in attempt from an unrecognized device...',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      read: false,
      category: 'security',
      priority: 'high',
      aiAnalysis: {
        sentiment: 'negative',
        spamProbability: 0.02,
        phishingProbability: 0.6,
        urgency: 'high',
        summary: 'Security alert for suspicious login',
        suggestedCategory: 'security',
        suggestedPriority: 'high',
        keywords: ['sign-in', 'device', 'unknown', 'alert']
      }
    },
    {
      id: '12',
      subject: 'Tax Return Accepted',
      sender: 'noreply@revenue.gov',
      preview: 'Your return has been received and accepted...',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      read: true,
      category: 'finance',
      priority: 'medium',
      aiAnalysis: {
        sentiment: 'positive',
        spamProbability: 0,
        phishingProbability: 0,
        urgency: 'medium',
        summary: 'Confirmation that tax filing was accepted',
        suggestedCategory: 'finance',
        suggestedPriority: 'medium',
        keywords: ['tax', 'return', 'accepted', 'government']
      }
    },
    {
      id: '13',
      subject: 'Community Guidelines Update',
      sender: 'legal@platform.com',
      preview: 'We’ve updated our terms and policies...',
      timestamp: new Date(Date.now() - 720000000).toISOString(),
      read: true,
      category: 'legal',
      priority: 'low',
      aiAnalysis: {
        sentiment: 'neutral',
        spamProbability: 0,
        phishingProbability: 0,
        urgency: 'low',
        summary: 'Notification about policy update',
        suggestedCategory: 'legal',
        suggestedPriority: 'low',
        keywords: ['policy', 'update', 'terms', 'legal']
      }
    }
  ];
  
