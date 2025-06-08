import React from 'react';
import VRRChart from './VRRChart';
import DataTable from './DataTable';

const LeaderboardSection = ({ title, description, data, sectionId }) => {
  if (!data || data.length === 0) {
    return (
      <div className="mb-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-secondary-900 mb-2">{title}</h3>
          {description && (
            <p className="text-secondary-600">{description}</p>
          )}
        </div>
        <div className="card text-center py-12">
          <p className="text-secondary-500 text-lg">No data available for this section</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-secondary-900 mb-2">{title}</h3>
        {description && (
          <p className="text-secondary-600 max-w-2xl mx-auto">{description}</p>
        )}
      </div>
      
      {/* Performance Chart */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-semibold text-secondary-800 flex items-center">
            📊 Performance Metrics Comparison
          </h4>
        </div>
        <VRRChart data={data} sectionId={sectionId} />
      </div>
      
      {/* Data Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-semibold text-secondary-800 flex items-center">
            📋 Detailed Performance Metrics
          </h4>
          <div className="text-sm text-secondary-600">
            {data.length} models evaluated
          </div>
        </div>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default LeaderboardSection; 