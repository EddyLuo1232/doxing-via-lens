import React from 'react';
import VRRChart from './VRRChart';
import DataTable from './DataTable';

/**
 * LeaderboardSection component that displays a chart and table for a specific section
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {Array} props.data - Data array for this section
 * @param {string} props.sectionId - Unique identifier for the section
 * @returns {JSX.Element} The leaderboard section component
 */
const LeaderboardSection = ({ title, data, sectionId }) => {
  if (!data || data.length === 0) {
    return (
      <section className="mb-16">
        <h2 className="section-title">{title}</h2>
        <div className="text-center py-12">
          <p className="text-secondary-500 text-lg">No data available for this section</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <h2 className="section-title">{title}</h2>
      
      {/* Performance Chart */}
      <div className="chart-container">
        <h3 className="text-xl font-semibold text-secondary-800 mb-4">
          📊 Performance Metrics Comparison
        </h3>
        <VRRChart data={data} sectionId={sectionId} />
      </div>
      
      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-secondary-200">
          <h3 className="text-xl font-semibold text-secondary-800">
            📋 Detailed Performance Metrics
          </h3>
        </div>
        <DataTable data={data} />
      </div>
    </section>
  );
};

export default LeaderboardSection; 