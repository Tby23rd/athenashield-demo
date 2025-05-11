'use client';

import { useState,  useMemo, useEffect } from 'react';

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

interface FilterCriteria {
  priority: string;
  category: string;
  readStatus: string;
}

interface EmailFilterProps {
  emails: Email[];
  onFilterChange: (filtered: Email[]) => void;
}

export default function EmailFilter({ emails, onFilterChange }: EmailFilterProps) {
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    priority: 'all',
    category: 'all',
    readStatus: 'all',
  });

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(emails.map(email => email.category)))],
    [emails]
  );

  const filteredEmails = useMemo(() => {
    return emails.filter(email => {
      const priorityMatch = filterCriteria.priority === 'all' || email.priority === filterCriteria.priority;
      const categoryMatch = filterCriteria.category === 'all' || email.category === filterCriteria.category;
      const readStatusMatch = filterCriteria.readStatus === 'all' || 
        (filterCriteria.readStatus === 'read' && email.read) ||
        (filterCriteria.readStatus === 'unread' && !email.read);
      
      return priorityMatch && categoryMatch && readStatusMatch;
    });
  }, [emails, filterCriteria]);

  useEffect(() => {
    onFilterChange(filteredEmails);
  }, [filteredEmails, onFilterChange]);

  const handleFilterChange = (type: keyof FilterCriteria, value: string) => {
    setFilterCriteria(prev => ({ ...prev, [type]: value }));
  };

  const renderSelect = (
    label: string,
    type: keyof FilterCriteria,
    options: string[]
  ) => (
    <select
      value={filterCriteria[type]}
      onChange={(e) => handleFilterChange(type, e.target.value)}
      className="rounded-md border border-gray-300 p-2"
    >
      {options.map(opt => (
        <option key={opt} value={opt}>
          {opt === 'all' ? `All ${label}` : opt.charAt(0).toUpperCase() + opt.slice(1)}
        </option>
      ))}
    </select>
  );

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {renderSelect('Priorities', 'priority', ['all', 'high', 'medium', 'low'])}
      {renderSelect('Categories', 'category', categories)}
      {renderSelect('Emails', 'readStatus', ['all', 'read', 'unread'])}
    </div>
  );
}
