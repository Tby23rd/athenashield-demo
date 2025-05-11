import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-cyan-100 via-white to-cyan-100 dark:from-cyan-900 dark:via-gray-800 dark:to-cyan-900">
      <div className="relative flex flex-col items-center justify-center space-y-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-cyan-400 dark:border-cyan-100 border-t-transparent rounded-full animate-spin" aria-label="Loading" />

        {/* Dot animation */}
        <div className="w-2 h-2 bg-cyan-400 dark:bg-cyan-100 rounded-full animate-bounce" />

        {/* Loading Text */}
        <p className="text-base font-medium text-cyan-400 dark:text-cyan-100 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
