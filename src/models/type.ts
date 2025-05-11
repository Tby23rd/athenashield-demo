export interface EducationTopic {
    id: string;
    title: string;
    description: string;
    content: string;
    category: 'threats' | 'best-practices' | 'dashboard' | 'compliance';
    level: 'beginner' | 'intermediate' | 'advanced';
    tags: string[];
    quiz?: {
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }[];
    caseStudy?: {
      scenario: string;
      analysis: string;
      solution: string;
      keyLearnings: string[];
    };
  }
  export interface Email {
    id: string;
    subject: string;
    sender: string;
    preview: string;
    timestamp: string;
    read: boolean;
    category: string;
    priority: 'high' | 'medium' | 'low';
    content?: string;
    attachments?: Attachment[];
    aiAnalysis?: AIAnalysis;
  }
  
  export interface Attachment {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }
  
  export interface AIAnalysis {
    sentiment: 'positive' | 'neutral' | 'negative';
    spamProbability: number;
    phishingProbability: number;
    urgency: 'high' | 'medium' | 'low';
    summary: string;
    suggestedCategory: string;
    suggestedPriority: 'high' | 'medium' | 'low';
    keywords: string[];
  }
  
  
  export const educationTopics: EducationTopic[] = [
    {
      id: 'phishing-basics',
      title: 'Understanding Phishing Attacks',
      description: 'Learn about different types of phishing attacks and how to identify them',
      content: `Phishing attacks are one of the most common and dangerous email security threats. They attempt to trick users into revealing sensitive information or performing actions that compromise security.
  
  Types of Phishing Attacks:
  1. Spear Phishing: Targeted attacks on specific individuals or organizations
  2. Whaling: Attacks targeting high-profile executives
  3. Clone Phishing: Legitimate emails that have been cloned and modified
  4. Business Email Compromise (BEC): Attacks impersonating business executives
  
  Common Indicators:
  - Urgent or threatening language
  - Requests for sensitive information
  - Suspicious email addresses or domains
  - Poor grammar or spelling
  - Unexpected attachments or links
  
  Best Practices:
  - Verify sender email addresses
  - Don't click on suspicious links
  - Use multi-factor authentication
  - Report suspicious emails
  - Regular security awareness training`,
      category: 'threats',
      level: 'beginner',
      tags: ['phishing', 'social-engineering', 'security-awareness'],
      quiz: [
        {
          question: "What is the main goal of a phishing attack?",
          options: [
            "To improve email security",
            "To trick users into revealing sensitive information",
            "To speed up email delivery",
            "To organize email folders"
          ],
          correctAnswer: 1,
          explanation: "Phishing attacks aim to deceive users into revealing sensitive information or performing actions that compromise security."
        },
        {
          question: "Which of these is NOT a common indicator of a phishing email?",
          options: [
            "Poor grammar and spelling",
            "Urgent or threatening language",
            "Professional email signature",
            "Suspicious email address"
          ],
          correctAnswer: 2,
          explanation: "Professional email signatures are typically legitimate, while poor grammar, urgent language, and suspicious addresses are common phishing indicators."
        }
      ],
      caseStudy: {
        scenario: "A company executive receives an urgent email from the CEO requesting an immediate wire transfer for a confidential business deal.",
        analysis: "This is a classic example of a whaling attack, targeting high-profile executives with urgent financial requests.",
        solution: "The executive should verify the request through a separate communication channel and follow established financial procedures.",
        keyLearnings: [
          "Always verify urgent financial requests",
          "Use multiple communication channels for verification",
          "Follow established procedures regardless of urgency",
          "Train executives to recognize whaling attacks"
        ]
      }
    },
    {
      id: 'email-security-best-practices',
      title: 'Email Security Best Practices',
      description: 'Essential practices to maintain email security',
      content: `Maintaining strong email security requires a combination of technical measures and user awareness.
  
  Key Best Practices:
  
  1. Password Security:
  - Use strong, unique passwords
  - Enable multi-factor authentication
  - Regularly update passwords
  - Use a password manager
  
  2. Email Handling:
  - Verify sender authenticity
  - Be cautious with attachments
  - Don't share sensitive information via email
  - Use encryption for sensitive data
  
  3. Technical Measures:
  - Keep software updated
  - Use spam filters
  - Implement email authentication (SPF, DKIM, DMARC)
  - Regular security audits
  
  4. Incident Response:
  - Report suspicious emails
  - Document security incidents
  - Follow incident response procedures
  - Regular security training`,
      category: 'best-practices',
      level: 'intermediate',
      tags: ['security', 'best-practices', 'compliance'],
      quiz: [
        {
          question: "Which of these is the most effective way to protect email accounts?",
          options: [
            "Using the same password for all accounts",
            "Enabling multi-factor authentication",
            "Sharing passwords with trusted colleagues",
            "Writing passwords down in a secure location"
          ],
          correctAnswer: 1,
          explanation: "Multi-factor authentication adds an extra layer of security by requiring additional verification beyond just a password."
        }
      ]
    },
    {
      id: 'dashboard-usage',
      title: 'Using the Security Dashboard',
      description: 'Learn how to effectively use the AthenaShield dashboard',
      content: `The AthenaShield dashboard provides comprehensive tools for managing email security.
  
  Key Features:
  
  1. Threat Monitoring:
  - Real-time threat detection
  - Threat severity assessment
  - Automated threat analysis
  - Historical threat data
  
  2. Security Recommendations:
  - Actionable security improvements
  - Priority-based recommendations
  - Implementation tracking
  - Progress monitoring
  
  3. Incident Management:
  - Threat resolution workflow
  - Action tracking
  - Resolution documentation
  - Follow-up management
  
  4. Reporting:
  - Security metrics
  - Threat statistics
  - Compliance reporting
  - Trend analysis
  
  Best Practices:
  - Regular dashboard monitoring
  - Prompt threat response
  - Documentation of actions
  - Regular review of recommendations`,
      category: 'dashboard',
      level: 'beginner',
      tags: ['dashboard', 'monitoring', 'management'],
      quiz: [
        {
          question: "What should you do when a high-priority threat is detected?",
          options: [
            "Ignore it and wait for it to resolve itself",
            "Document it and respond immediately",
            "Forward it to another department",
            "Delete the alert"
          ],
          correctAnswer: 1,
          explanation: "High-priority threats require immediate attention and proper documentation to ensure effective resolution."
        }
      ]
    }
  ];