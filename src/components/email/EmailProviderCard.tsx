'use client';

import React from 'react';

interface EmailProviderCardProps {
  label: string;
  emoji: string;
  color: string;
  onClick: () => void;
}

export default function EmailProviderCard({
  label,
  emoji,
  color,
  onClick,
}: EmailProviderCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-full text-white font-semibold py-3 px-5 shadow-md hover:scale-105 transition-transform duration-200 ${color}`}
    >
      <span className="text-lg">{emoji}</span>
      {label}
    </button>
  );
}
