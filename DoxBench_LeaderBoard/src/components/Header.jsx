import React from 'react';

/**
 * Header component for the leaderboard application
 * @returns {JSX.Element} The header component
 */
const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b border-secondary-200">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary-900 mb-2">
            🏆 AI Model Leaderboard
          </h1>
          <p className="text-secondary-600 text-lg">
            Performance comparison of leading AI models across different metrics
          </p>
          <div className="mt-4 flex justify-center space-x-4 text-sm text-secondary-500">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-primary-500 rounded-full mr-2"></span>
              VRR: Validation Rate Ratio
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              AED: Average Error Distance (km)
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              MED: Median Error Distance (km)
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 