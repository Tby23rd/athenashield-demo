export interface EducationTopic {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'threats'|'best-practices'|'dashboard'|'compliance';
  level: 'beginner'|'intermediate'|'advanced';
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
  priority: 'high'|'medium'|'low';
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
  sentiment: 'positive'|'neutral'|'negative';
  spamProbability: number;
  phishingProbability: number;
  urgency: 'high'|'medium'|'low';
  summary: string;
  suggestedCategory: string;
  suggestedPriority: 'high'|'medium'|'low';
  keywords: string[];
}


export const educationTopics: EducationTopic[]=[
  {
    id: 'phishing-basics',
    title: 'Understanding Phishing Attacks',
    description: 'Learn about different types of phishing attacks and how to identify them',
    content: `🎯 What is Phishing?

•Phishing attacks are one of the most common and dangerous email security threats.

•They aim to trick users into revealing sensitive information or taking harmful actions, like clicking malicious links or transferring money.

---

🔍 Types of Phishing Attacks

• Spear Phishing — Targeted attacks on specific individuals or teams  
• Whaling — Focused on executives or high-level personnel  
• Clone Phishing — Copies a real email but with fake/malicious content  
• BEC (Business Email Compromise) — Pretends to be a company leader to trigger urgent actions

---

🚨 How to Spot Phishing Emails

• Urgent or threatening language  
• Unusual requests for personal info  
• Slightly misspelled or odd email addresses  
• Grammar mistakes and awkward formatting  
• Unexpected attachments or shady links

---

✅ How to Protect Yourself

• Double-check email addresses before replying  
• Avoid clicking suspicious links — hover to preview  
• Use multi-factor authentication everywhere  
• Report anything strange to your IT/security team  
• Do regular cybersecurity training — even the basics help!`,

    category: 'threats',
    level: 'beginner',
    tags: ['phishing','social-engineering','security-awareness'],
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
        explanation:
          "Phishing attacks aim to deceive users into revealing sensitive information or performing actions that compromise security."
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
        explanation:
          "Professional email signatures are typically legitimate, while poor grammar, urgent language, and suspicious addresses are common phishing indicators."
      }
    ],
    caseStudy: {
      scenario:
        "A company executive receives an urgent email from the CEO requesting an immediate wire transfer for a confidential business deal.",
      analysis:
        "This is a classic example of a whaling attack, targeting high-profile executives with urgent financial requests.",
      solution:
        "The executive should verify the request through a separate communication channel and follow established financial procedures.",
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
    content: `🔐 Why Email Security Matters

    • Your inbox is a gateway to sensitive company and personal information.
    
    • A few smart habits can go a long way in keeping your email safe.
    
    ---
    
    🔑 1. Password Security
    
    • Always use strong, unique passwords  
    • Turn on multi-factor authentication (MFA)  
    • Update passwords regularly  
    • Use a password manager — don’t reuse credentials!
    
    ---
    
    📧 2. Email Handling Tips
    
    • Verify who really sent that message  
    • Don’t open attachments from unknown sources  
    • Avoid sharing sensitive info over email  
    • Use encryption if you must send private data
    
    ---
    
    🛠️ 3. Technical Protection
    
    • Keep software and browsers updated  
    • Enable spam filters and antivirus tools  
    • Set up SPF, DKIM, and DMARC for email authentication  
    • Do regular security audits to catch gaps
    
    ---
    
    🚨 4. What To Do If Something Feels Off
    
    • Report suspicious emails — don't just delete them  
    • Document what happened for future learning  
    • Follow your company’s incident response checklist  
    • Keep learning! Security is everyone’s job`
,    
    category: 'best-practices',
    level: 'intermediate',
    tags: ['security','best-practices','compliance'],
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
        explanation:
          "Multi-factor authentication adds an extra layer of security by requiring additional verification beyond just a password."
      }
    ]
  },
  {
    id: 'dashboard-usage',
    title: 'Using the Security Dashboard',
    description: 'Learn how to effectively use the AthenaShield dashboard',
    content: `📊 Welcome to AthenaShield

• The dashboard helps you manage email security with smart tools and actionable insights.

---

👁️ 1. Threat Monitoring

• Real-time threat detection  
• See severity levels at a glance  
• Auto-analyze threats so you act faster  
• Review past incidents to spot trends

---

🛡️ 2. Security Recommendations

• Get actionable improvement tips  
• Sort by priority to know what matters now  
• Track your implementation status  
• See your progress over time

---

📝 3. Incident Management

• Follow resolution workflows  
• Assign and track actions  
• Document resolutions clearly  
• Manage follow-ups to close the loop

---

📈 4. Reporting Tools

• Visualize your security metrics  
• Dive into threat stats and trends  
• Generate compliance reports easily  
• Understand how secure your org really is

---

✅ Pro Tips

• Check the dashboard weekly  
• Respond to threats ASAP  
• Keep records updated  
• Review recommendations regularly for peace of mind`,

    category: 'dashboard',
    level: 'beginner',
    tags: ['dashboard','monitoring','management'],
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
        explanation:
          "High-priority threats require immediate attention and proper documentation to ensure effective resolution."
      }
    ]
  }
];
