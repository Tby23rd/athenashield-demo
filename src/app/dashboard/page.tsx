'use client';

import {useState,useEffect,useMemo} from 'react';
import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import {AIAnalysis} from '@/models/type';

// Define resolution types separately for better type safety
type ResolutionType='quarantined'|'blocked'|'false_positive'|'manual_review';
type ImpactLevel='low'|'medium'|'high';
type ResolutionCategory='security'|'spam'|'phishing'|'malware'|'other';

interface EmailThreat {
  id: string;
  emailId: string;
  type: 'phishing'|'spam'|'malware'|'suspicious';
  severity: 'low'|'medium'|'high';
  description: string;
  timestamp: string;
  status: 'active'|'investigating'|'resolved'|'false_positive';
  resolution?: {
    timestamp: string;
    resolvedBy: string;
    resolutionType: ResolutionType;
    notes: string;
    followUpActions?: string[];
    impact: ImpactLevel;
    category: ResolutionCategory;
    priority: ImpactLevel;
    assignees: string[];
    status: 'resolved'|'false_positive';
  };
  source: string;
  affectedSystem: string;
  aiAnalysis: AIAnalysis;
  attachments?: {
    name: string;
    type: string;
    size: number;
    scanResult: 'clean'|'infected'|'suspicious';
  }[];
  headers?: {
    from: string;
    to: string[];
    subject: string;
    date: string;
    replyTo?: string;
    returnPath?: string;
  };
  actions: {
    quarantined: boolean;
    blocked: boolean;
    reported: boolean;
    notified: boolean;
  };
}

interface SecurityRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'low'|'medium'|'high';
  category: 'authentication'|'network'|'system'|'data'|'email'|'compliance';
  status: 'pending'|'ongoing'|'completed'|'failed';
  dueDate?: string;
  relatedEmails?: string[];
  assignedTo?: string[];
  impact: 'low'|'medium'|'high';
  effort: 'low'|'medium'|'high';
  risk: 'low'|'medium'|'high';
  steps: {
    id: string;
    description: string;
    completed: boolean;
    dueDate?: string;
  }[];
  notes?: string;
  lastUpdated: string;
  createdBy: string;
  tags: string[];
}

interface SecurityActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user?: string;
  action?: string;
  status: 'success'|'warning'|'error';
  emailId?: string;
}

interface ResolutionValidation {
  isValid: boolean;
  errors: {
    notes?: string;
    followUpActions?: string;
  };
}

export default function Dashboard() {
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);
  const [emailThreats,setEmailThreats]=useState<EmailThreat[]>([]);
  const [recommendations,setRecommendations]=useState<SecurityRecommendation[]>([]);
  const [selectedThreat,setSelectedThreat]=useState<EmailThreat|null>(null);
  const [filter,]=useState('all');
  const [sort,]=useState('newest');
  const [recommendationFilter,setRecommendationFilter]=useState<'all'|'pending'|'ongoing'|'completed'>('all');
  const [recommendationPriority,setRecommendationPriority]=useState<'all'|'high'|'medium'|'low'>('all');
  const [resolutionType,setResolutionType]=useState<ResolutionType>('quarantined');
  const [resolutionNotes,setResolutionNotes]=useState('');
  const [followUpActions,setFollowUpActions]=useState<string[]>([]);
  const [selectedImpact,setSelectedImpact]=useState<ImpactLevel>('medium');
  const [selectedCategory,setSelectedCategory]=useState<ResolutionCategory>('security');
  const [selectedPriority,setSelectedPriority]=useState<ImpactLevel>('medium');
  const [selectedAssignees,setSelectedAssignees]=useState<string[]>([]);
  const [,setShowThreatDetails]=useState(false);
  const [searchQuery,setSearchQuery]=useState('');
  const [,setActivity]=useState<SecurityActivity[]>([]);
  const [systemHealth]=useState({
    status: 'healthy',
    lastChecked: new Date().toISOString(),
    components: {
      emailService: 'operational',
      spamFilter: 'operational',
      phishingDetection: 'operational',
      malwareScanner: 'operational'
    }
  });
  const [threatStats,setThreatStats]=useState({
    total: 0,
    active: 0,
    resolved: 0,
    byType: {
      phishing: 0,
      spam: 0,
      malware: 0,
      suspicious: 0
    }
  });
  const [showResolutionModal,setShowResolutionModal]=useState(false);
  const [resolutionValidation,setResolutionValidation]=useState<ResolutionValidation>({
    isValid: true,
    errors: {}
  });
  const [isSubmitting,setIsSubmitting]=useState(false);

  const fetchDashboardData=async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve,1000));

      // Simulated data - replace with actual API calls
      setEmailThreats([
        {
          id: '1',
          emailId: 'email-1',
          type: 'phishing',
          severity: 'high',
          description: 'Suspicious phishing attempt detected in email',
          timestamp: new Date(Date.now()-1000*60*60*2).toISOString(),
          status: 'investigating',
          source: 'external@malicious.com',
          affectedSystem: 'Email Service',
          aiAnalysis: {
            sentiment: 'negative',
            spamProbability: 0.9,
            phishingProbability: 0.95,
            urgency: 'high',
            summary: 'High probability phishing attempt',
            suggestedCategory: 'threat',
            suggestedPriority: 'high',
            keywords: ['urgent','verify','account','suspicious']
          },
          attachments: [
            {
              name: 'attachment1.doc',
              type: 'Microsoft Word Document',
              size: 12345,
              scanResult: 'clean'
            },
            {
              name: 'attachment2.pdf',
              type: 'PDF Document',
              size: 12345,
              scanResult: 'clean'
            }
          ],
          headers: {
            from: 'external@malicious.com',
            to: ['recipient1@example.com','recipient2@example.com'],
            subject: 'Urgent: Account Verification',
            date: new Date(Date.now()-1000*60*60).toISOString(),
            replyTo: 'reply@malicious.com',
            returnPath: 'return@malicious.com'
          },
          actions: {
            quarantined: false,
            blocked: false,
            reported: false,
            notified: false
          }
        },
        {
          id: '2',
          emailId: 'email-2',
          type: 'spam',
          severity: 'medium',
          description: 'High spam probability email detected',
          timestamp: new Date(Date.now()-1000*60*60*5).toISOString(),
          status: 'active',
          source: 'spam@example.com',
          affectedSystem: 'Spam Filter',
          aiAnalysis: {
            sentiment: 'neutral',
            spamProbability: 0.85,
            phishingProbability: 0.1,
            urgency: 'low',
            summary: 'Commercial spam email',
            suggestedCategory: 'spam',
            suggestedPriority: 'medium',
            keywords: ['offer','discount','limited time']
          },
          attachments: [
            {
              name: 'attachment3.doc',
              type: 'Microsoft Word Document',
              size: 12345,
              scanResult: 'clean'
            },
            {
              name: 'attachment4.pdf',
              type: 'PDF Document',
              size: 12345,
              scanResult: 'clean'
            }
          ],
          headers: {
            from: 'spam@example.com',
            to: ['recipient3@example.com','recipient4@example.com'],
            subject: 'Limited Time Offer',
            date: new Date(Date.now()-1000*60*60*5).toISOString(),
            replyTo: 'reply@spam.com',
            returnPath: 'return@spam.com'
          },
          actions: {
            quarantined: false,
            blocked: false,
            reported: false,
            notified: false
          }
        }
      ]);
      setRecommendations([
        {
          id: '1',
          title: 'Update Email Security Policies',
          description: 'Review and update email security policies based on recent threats',
          priority: 'high',
          category: 'system',
          status: 'pending',
          dueDate: new Date(Date.now()+1000*60*60*24*7).toISOString(),
          relatedEmails: ['email-1','email-2'],
          assignedTo: ['Security Team'],
          impact: 'high',
          effort: 'medium',
          risk: 'high',
          steps: [
            {
              id: 's1',
              description: 'Review current email security policies',
              completed: true
            },
            {
              id: 's2',
              description: 'Identify areas for improvement',
              completed: true
            },
            {
              id: 's3',
              description: 'Update policies based on identified areas',
              completed: true
            }
          ],
          notes: 'Updated policies to include new threats',
          lastUpdated: new Date().toISOString(),
          createdBy: 'Security Team',
          tags: ['security','policy']
        },
        {
          id: '2',
          title: 'Enhance Phishing Detection',
          description: 'Implement additional phishing detection measures',
          priority: 'high',
          category: 'system',
          status: 'ongoing',
          assignedTo: ['IT Support'],
          impact: 'high',
          effort: 'high',
          risk: 'high',
          steps: [
            {
              id: 's4',
              description: 'Research phishing detection techniques',
              completed: true
            },
            {
              id: 's5',
              description: 'Implement new detection methods',
              completed: false
            },
            {
              id: 's6',
              description: 'Test and validate new methods',
              completed: false
            }
          ],
          notes: 'Started implementing new phishing detection methods',
          lastUpdated: new Date().toISOString(),
          createdBy: 'IT Support',
          tags: ['security','detection']
        }
      ]);
      setActivity([
        {
          id: 'a1',
          type: 'Threat Detected',
          description: 'Phishing attempt detected in email from external@malicious.com',
          timestamp: new Date(Date.now()-1000*60*60).toISOString(),
          status: 'warning',
          emailId: 'email-1'
        },
        {
          id: 'a2',
          type: 'Security Update',
          description: 'Email security policies updated',
          timestamp: new Date(Date.now()-1000*60*30).toISOString(),
          status: 'success'
        }
      ]);
    } catch(err) {
      setError('Failed to fetch dashboard data. Please try again.');
      console.error('Error fetching dashboard data:',err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  },[]);

  const displayedThreats=useMemo(() => {
    let filtered=emailThreats;
    if(filter!=='all') filtered=filtered.filter(t => t.severity===filter);
    filtered=[...filtered].sort((a,b) =>
      sort==='newest'? b.timestamp.localeCompare(a.timestamp):a.timestamp.localeCompare(b.timestamp)
    );
    return filtered;
  },[emailThreats,filter,sort]);

  const handleResolveThreat=(threatId: string) => {
    const threat=emailThreats.find(t => t.id===threatId);
    if(threat) {
      setSelectedThreat(threat);
      setShowResolutionModal(true);
      // Pre-fill resolution details based on threat
      setSelectedImpact(threat.severity);
      setSelectedCategory(threat.type==='phishing'? 'phishing':
        threat.type==='spam'? 'spam':
          threat.type==='malware'? 'malware':'security');
      setSelectedPriority(threat.severity);
    }
  };

  const validateResolution=(): boolean => {
    const errors: ResolutionValidation['errors']={};

    if(!resolutionNotes.trim()) {
      errors.notes='Resolution notes are required';
    }

    if(followUpActions.some(action => !action.trim())) {
      errors.followUpActions='All follow-up actions must be filled';
    }

    const isValid=Object.keys(errors).length===0;
    setResolutionValidation({isValid,errors});
    return isValid;
  };

  const handleResolutionSubmit=async () => {
    if(!selectedThreat||!validateResolution()) return;

    setIsSubmitting(true);
    try {
      const resolutionStatus=resolutionType==='false_positive'? 'false_positive':'resolved';
      const resolution: EmailThreat['resolution']={
        timestamp: new Date().toISOString(),
        resolvedBy: 'Current User', // Replace with actual user info
        resolutionType: resolutionType,
        notes: resolutionNotes,
        followUpActions: followUpActions,
        impact: selectedImpact,
        category: selectedCategory,
        priority: selectedPriority,
        assignees: selectedAssignees,
        status: resolutionStatus
      };

      setEmailThreats(threats => threats.map(t => {
        if(t.id===selectedThreat.id) {
          return {
            ...t,
            status: resolutionStatus,
            resolution
          } as EmailThreat;
        }
        return t;
      }));

      // Reset form
      setResolutionNotes('');
      setResolutionType('quarantined');
      setFollowUpActions([]);
      setSelectedImpact('medium');
      setSelectedCategory('security');
      setSelectedPriority('medium');
      setSelectedAssignees([]);
      setShowResolutionModal(false);
      setSelectedThreat(null);
    } catch(error) {
      console.error('Error resolving threat:',error);
      setError('Failed to resolve threat. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecommendationAction=(recommendationId: string) => {
    setRecommendations(recommendations => recommendations.map(rec => {
      if(rec.id===recommendationId) {
        // Update status based on current status
        let newStatus: SecurityRecommendation['status'];
        switch(rec.status) {
        case 'pending':
          newStatus='ongoing';
          break;
        case 'ongoing':
          newStatus='completed';
          break;
        case 'completed':
          newStatus='pending';
          break;
        default:
          newStatus='pending';
        }

        // Update lastUpdated timestamp
        return {
          ...rec,
          status: newStatus,
          lastUpdated: new Date().toISOString()
        };
      }
      return rec;
    }));
  };

  const handleThreatAction=(threatId: string,action: 'quarantined'|'blocked'|'reported'|'notified') => {
    setEmailThreats(threats => threats.map(t => {
      if(t.id===threatId) {
        return {
          ...t,
          actions: {
            ...t.actions,
            [action]: !t.actions[action]
          }
        };
      }
      return t;
    }));

    setActivity((currentActivity: SecurityActivity[]) => [{
      id: `act-${Date.now()}`,
      type: 'Threat Action',
      description: `Email threat ${threatId} ${action.replace('ed','')}ed`,
      timestamp: new Date().toISOString(),
      action,
      status: 'success',
      emailId: emailThreats.find((t: EmailThreat) => t.id===threatId)?.emailId
    },...currentActivity]);
  };

  const handleThreatClick=(threat: EmailThreat) => {
    setSelectedThreat(threat);
    setShowThreatDetails(true);
  };

  // Update threat stats whenever threats change
  useEffect(() => {
    const stats={
      total: emailThreats.length,
      active: emailThreats.filter(t => t.status==='active').length,
      resolved: emailThreats.filter(t => t.status==='resolved').length,
      byType: {
        phishing: emailThreats.filter(t => t.type==='phishing').length,
        spam: emailThreats.filter(t => t.type==='spam').length,
        malware: emailThreats.filter(t => t.type==='malware').length,
        suspicious: emailThreats.filter(t => t.type==='suspicious').length
      }
    };
    setThreatStats(stats);
  },[emailThreats]);

  // Filter threats based on search query
  const filteredThreats=useMemo(() => {
    let filtered=displayedThreats;
    if(searchQuery) {
      const query=searchQuery.toLowerCase();
      filtered=filtered.filter(t =>
        t.description.toLowerCase().includes(query)||
        t.source.toLowerCase().includes(query)||
        t.type.toLowerCase().includes(query)||
        t.affectedSystem.toLowerCase().includes(query)
      );
    }
    return filtered;
  },[displayedThreats,searchQuery]);

  const handleStepCompletion=(recommendationId: string,stepId: string) => {
    setRecommendations(recommendations => recommendations.map(rec => {
      if(rec.id===recommendationId) {
        const updatedSteps=rec.steps.map(step => {
          if(step.id===stepId) {
            return {...step,completed: !step.completed};
          }
          return step;
        });

        // Check if all steps are completed to update overall status
        const allStepsCompleted=updatedSteps.every(step => step.completed);
        const newStatus=allStepsCompleted? 'completed':'ongoing';

        return {
          ...rec,
          steps: updatedSteps,
          status: newStatus,
          lastUpdated: new Date().toISOString()
        };
      }
      return rec;
    }));
  };

  if(loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row  sm:justify-between sm:items-center gap-4">
            {/* Title & Subtitle */}
              <p className="text-2xl font-bold text-center text-gray-900  dark:text-white">Threat management</p>

            {/* System Status */}
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">System Active</span>
            </div>
          </div>
        </div>

      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {error&&(
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* System Health */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Email Security Status</h2>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              Last checked: {new Date(systemHealth.lastChecked).toLocaleString()}
            </span>

            <div className="flex justify-start sm:justify-end">
              <button
                onClick={fetchDashboardData}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-400 rounded-md hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {loading? 'Refreshing...':'Refresh Data'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(systemHealth.components).map(([component,status]) => (
              <div key={component} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${status==='operational'? 'bg-green-500':'bg-red-500'
                      }`}
                  ></span>
                  <span className="font-medium capitalize text-gray-800 dark:text-white">
                    {component.replace(/([a-z])([A-Z])/g,'$1 $2')}
                  </span>

                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 capitalize mt-1">{status}</p>
              </div>
            ))}
          </div>
        </div>




        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Threats Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              {/* Heading */}
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5 text-cyan-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Email Threats</h2>
              </div>
             

              {/* Search & Refresh */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search threats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-sm"
                  />
                  <ShieldExclamationIcon className="h-4 w-4 absolute left-2 top-2.5 text-gray-400" />
                </div>

              </div>
            </div>


            {/* Threat Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Total Threats</div>
                <div className="text-2xl font-semibold">{threatStats.total}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Active</div>
                <div className="text-2xl font-semibold text-yellow-600">{threatStats.active}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Resolved</div>
                <div className="text-2xl font-semibold text-green-600">{threatStats.resolved}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500">High Risk</div>
                <div className="text-2xl font-semibold text-red-600">
                  {emailThreats.filter(t => t.severity==='high').length}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredThreats.map((threat) => (
                <div
                  key={threat.id}
                  className={`p-4 rounded-lg border ${threat.severity==='high'
                    ? 'bg-red-50 border-red-500 dark:bg-red-900/30'
                    :'bg-gray-50 border-gray-500 dark:bg-gray-700'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleThreatClick(threat)}>
                      <ShieldExclamationIcon className="h-4 w-4" />
                      <h3 className="font-medium">{threat.type}</h3>
                      {threat.status==='resolved'&&(
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Resolved
                        </span>
                      )}
                      {threat.status==='false_positive'&&(
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          False Positive
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      {threat.status!=='resolved'&&threat.status!=='false_positive'&&(
                        <>
                          {/* First line: Resolve button */}
                          <div className="flex items-center">
                            <button
                              className="text-xs text-green-600 hover:underline"
                              onClick={() => handleResolveThreat(threat.id)}
                            >
                              Resolve
                            </button>
                          </div>

                          {/* Second line (always wraps on small screens): Quarantine + Block */}
                          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                            <button
                              className={`text-xs px-2 py-1 rounded ${threat.actions.quarantined
                                ? 'bg-green-100 text-green-800'
                                :'bg-gray-100 text-gray-800'
                                }`}
                              onClick={() => handleThreatAction(threat.id,'quarantined')}
                            >
                              {threat.actions.quarantined? 'Quarantined':'Quarantine'}
                            </button>

                            <button
                              className={`text-xs px-2 py-1 rounded ${threat.actions.blocked
                                ? 'bg-red-100 text-red-800'
                                :'bg-gray-100 text-gray-800'
                                }`}
                              onClick={() => handleThreatAction(threat.id,'blocked')}
                            >
                              {threat.actions.blocked? 'Blocked':'Block'}
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                  </div>
                  <p className="text-sm mt-1">{threat.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                    <span>Source: {threat.source}</span>
                    <span>•</span>
                    <span>System: {threat.affectedSystem}</span>
                    <span>•</span>
                    <span>Status: {threat.status}</span>
                    <span>•</span>
                    <span>{new Date(threat.timestamp).toLocaleString()}</span>
                  </div>
                  {threat.aiAnalysis&&(
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-600 rounded">
                      <div className="flex justify-between text-xs">
                        <span>Phishing Risk: {(threat.aiAnalysis.phishingProbability*100).toFixed(1)}%</span>
                        <span>Spam Risk: {(threat.aiAnalysis.spamProbability*100).toFixed(1)}%</span>
                      </div>
                      <div className="mt-1 text-xs">
                        <span className="font-medium">Keywords: </span>
                        {threat.aiAnalysis.keywords.join(', ')}
                      </div>
                    </div>
                  )}
                  {threat.attachments&&threat.attachments.length>0&&(
                    <div className="mt-2">
                      <div className="text-xs font-medium mb-1">Attachments:</div>
                      <div className="space-y-1">
                        {threat.attachments.map((attachment,index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            <span className={`h-2 w-2 rounded-full ${attachment.scanResult==='clean'? 'bg-green-500':
                              attachment.scanResult==='infected'? 'bg-red-500':
                                'bg-yellow-500'
                              }`}></span>
                            <span>{attachment.name}</span>
                            <span className="text-gray-500">({attachment.size} bytes)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {threat.resolution&&(
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <div className="text-xs">
                        <div className="font-medium">Resolution Details:</div>
                        <div className="mt-1">
                          <span className="text-gray-500">Resolved by: </span>
                          {threat.resolution.resolvedBy}
                        </div>
                        <div>
                          <span className="text-gray-500">Type: </span>
                          {threat.resolution.resolutionType.replace('_',' ')}
                        </div>
                        <div>
                          <span className="text-gray-500">Notes: </span>
                          {threat.resolution.notes}
                        </div>
                        {threat.resolution.followUpActions&&threat.resolution.followUpActions.length>0&&(
                          <div className="mt-1">
                            <span className="text-gray-500">Follow-up Actions: </span>
                            <ul className="list-disc list-inside">
                              {threat.resolution.followUpActions.map((action,index) => (
                                <li key={index}>{action}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {filteredThreats.length===0&&(
                <div className="text-sm text-gray-500 text-center py-4">
                  {searchQuery? 'No threats match your search.':'No threats found.'}
                </div>
              )}
            </div>
          </div>

          {/* Security Recommendations Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              {/* Heading */}
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-cyan-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security Recommendations</h2>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <select
                  value={recommendationFilter}
                  onChange={(e) =>
                    setRecommendationFilter(
                      e.target.value as 'all'|'pending'|'ongoing'|'completed'
                    )
                  }
                  className="w-full sm:w-auto border rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  value={recommendationPriority}
                  onChange={(e) =>
                    setRecommendationPriority(
                      e.target.value as 'all'|'high'|'medium'|'low'
                    )
                  }
                  className="w-full sm:w-auto border rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>


            <div className="space-y-4">
              {recommendations
                .filter(rec => {
                  // Filter by status
                  if (recommendationFilter !== 'all' && rec.status !== recommendationFilter) {
                    return false;
                  }
                  // Filter by priority
                  if (recommendationPriority !== 'all' && rec.priority !== recommendationPriority) {
                    return false;
                  }
                  return true;
                })
                .map((rec) => (
                <div
                  key={rec.id}
                  className={`p-4 rounded-lg border ${rec.priority==='high'
                    ? 'bg-red-50 border-red-500 dark:bg-red-900/30'
                    :rec.priority==='medium'
                      ? 'bg-yellow-50 border-yellow-500 dark:bg-yellow-900/30'
                      :'bg-gray-50 border-gray-500 dark:bg-gray-700'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{rec.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${rec.status==='completed'? 'bg-green-100 text-green-800':
                        rec.status==='ongoing'? 'bg-blue-100 text-blue-800':
                          'bg-gray-100 text-gray-800'
                        }`}>
                        {rec.status.replace('_',' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {rec.status!=='completed'&&(
                        <button
                          className="text-xs p-4 text-cyan-400 hover:underline"
                          onClick={() => handleRecommendationAction(rec.id)}
                        >
                          Update
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-sm mt-1">{rec.description}</p>

                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-xs text-gray-500">Priority</span>
                      <div className="flex items-center gap-1">
                        <span className={`h-2 w-2 rounded-full ${rec.priority==='high'? 'bg-red-500':
                          rec.priority==='medium'? 'bg-yellow-500':
                            'bg-green-500'
                          }`}></span>
                        <span className="text-sm capitalize">{rec.priority}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Impact</span>
                      <div className="flex items-center gap-1">
                        <span className={`h-2 w-2 rounded-full ${rec.impact==='high'? 'bg-red-500':
                          rec.impact==='medium'? 'bg-yellow-500':
                            'bg-green-500'
                          }`}></span>
                        <span className="text-sm capitalize">{rec.impact}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Effort</span>
                      <div className="flex items-center gap-1">
                        <span className={`h-2 w-2 rounded-full ${rec.effort==='high'? 'bg-red-500':
                          rec.effort==='medium'? 'bg-yellow-500':
                            'bg-green-500'
                          }`}></span>
                        <span className="text-sm capitalize">{rec.effort}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Risk</span>
                      <div className="flex items-center gap-1">
                        <span className={`h-2 w-2 rounded-full ${rec.risk==='high'? 'bg-red-500':
                          rec.risk==='medium'? 'bg-yellow-500':
                            'bg-green-500'
                          }`}></span>
                        <span className="text-sm capitalize">{rec.risk}</span>
                      </div>
                    </div>
                  </div>

                  {rec.steps&&rec.steps.length>0&&(
                    <div className="mt-3">
                      <div className="text-xs font-medium mb-2">Implementation Steps</div>
                      <div className="space-y-2">
                        {rec.steps.map((step) => (
                          <div key={step.id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={step.completed}
                              onChange={() => handleStepCompletion(rec.id,step.id)}
                              className="rounded border-gray-300"
                            />
                            <span className={`text-sm ${step.completed? 'line-through text-gray-500':''}`}>
                              {step.description}
                            </span>
                            {step.dueDate&&(
                              <span className="text-xs text-gray-500">
                                Due: {new Date(step.dueDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {rec.tags.map((tag,index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                    <span>Category: {rec.category}</span>
                    {rec.dueDate&&(
                      <>
                        <span>•</span>
                        <span>Due: {new Date(rec.dueDate).toLocaleDateString()}</span>
                      </>
                    )}
                    <span>•</span>
                    <span>Last Updated: {new Date(rec.lastUpdated).toLocaleString()}</span>
                  </div>

                  {rec.assignedTo&&rec.assignedTo.length>0&&(
                    <div className="mt-2">
                      <div className="text-xs text-gray-500">Assigned To:</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {rec.assignedTo.map((assignee,index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700"
                          >
                            {assignee}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {recommendations.length===0&&(
                <div className="text-sm text-gray-500 text-center py-4">
                  No recommendations found.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Resolution Modal */}
      {showResolutionModal&&selectedThreat&&(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Resolve Threat</h3>
              <button
                onClick={() => setShowResolutionModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Resolution Type</label>
                <select
                  value={resolutionType}
                  onChange={(e) => setResolutionType(e.target.value as ResolutionType)}
                  className="w-full p-2 border rounded"
                >
                  <option value="quarantined">Quarantine</option>
                  <option value="blocked">Block</option>
                  <option value="false_positive">Mark as False Positive</option>
                  <option value="manual_review">Manual Review</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Impact Level</label>
                <select
                  value={selectedImpact}
                  onChange={(e) => setSelectedImpact(e.target.value as ImpactLevel)}
                  className="w-full p-2 border rounded"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ResolutionCategory)}
                  className="w-full p-2 border rounded"
                >
                  <option value="security">Security</option>
                  <option value="spam">Spam</option>
                  <option value="phishing">Phishing</option>
                  <option value="malware">Malware</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value as ImpactLevel)}
                  className="w-full p-2 border rounded"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Resolution Notes</label>
                <textarea
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={4}
                  placeholder="Enter resolution details..."
                />
                {resolutionValidation.errors.notes&&(
                  <p className="text-red-500 text-sm mt-1">{resolutionValidation.errors.notes}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Follow-up Actions</label>
                {followUpActions.map((action,index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={action}
                      onChange={(e) => {
                        const newActions=[...followUpActions];
                        newActions[index]=e.target.value;
                        setFollowUpActions(newActions);
                      }}
                      className="flex-1 p-2 border rounded"
                      placeholder="Enter follow-up action..."
                    />
                    <button
                      onClick={() => setFollowUpActions(actions => actions.filter((_,i) => i!==index))}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setFollowUpActions([...followUpActions,''])}
                  className="mt-2 px-4 py-2 text-cyan-400 hover:bg-blue-50 rounded"
                >
                  Add Follow-up Action
                </button>
                {resolutionValidation.errors.followUpActions&&(
                  <p className="text-red-500 text-sm mt-1">{resolutionValidation.errors.followUpActions}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowResolutionModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleResolutionSubmit}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-cyan-400 text-white rounded hover:bg-cyan-500 disabled:opacity-50"
                >
                  {isSubmitting? 'Submitting...':'Submit Resolution'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
} 