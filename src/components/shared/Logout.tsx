'use client';

import React, { useState } from 'react';

export default function SimulatedAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex items-center gap-4 m-4">
      {isLoggedIn ? (
        <>
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=JaneDoe"
            alt="avatar"
            className="w-10 h-10 rounded-full border"
          />
          <span className="text-sm font-medium">Jane Doe</span>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="bg-cyan-100 dark:bg-plum-800 px-3 py-1 rounded-full font-semibold text-sm"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsLoggedIn(true)}
          className="bg-cyan-500 text-white px-4 py-2 rounded-full font-semibold"
        >
          Login
        </button>
      )}
    </div>
  );
}
