'use client';

interface Email {
  id: string;
  subject: string;
  sender: string;
  preview: string;
  timestamp: string;
  read: boolean;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

interface EmailListProps {
  emails: Email[];
  loading: boolean;
  onEmailClick?: (email: Email) => void;
}

export default function EmailList({ emails, loading, onEmailClick }: EmailListProps) {
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        No emails found matching your criteria.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {emails.map((email) => (
          <li 
            key={email.id} 
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => onEmailClick && onEmailClick(email)}
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${email.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                <span className="font-semibold">{email.sender}</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(email.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="mt-1">
              <h3 className="font-medium">{email.subject}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{email.preview}</p>
            </div>
            <div className="mt-2 flex gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityStyle(email.priority)}`}>
                {email.priority}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                {email.category}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}