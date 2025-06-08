import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import LeaderboardSection from './components/LeaderboardSection';
import Header from './components/Header';

/**
 * Main App component that loads CSV data and renders leaderboard sections
 * @returns {JSX.Element} The main application component
 */
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load and parse CSV data from the data folder
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/doxbench_leaderboard.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              console.error('CSV parsing errors:', results.errors);
            }
            setData(results.data);
            setLoading(false);
          },
          error: (error) => {
            console.error('CSV parsing error:', error);
            setError('Failed to parse CSV data');
            setLoading(false);
          }
        });
      } catch (err) {
        console.error('Error loading CSV:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /**
   * Filter data by section (Top 1 or Top 3)
   * @param {string} section - The section to filter by
   * @returns {Array} Filtered data array
   */
  const getDataBySection = (section) => {
    return data.filter(row => row.Section === section);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600 text-lg">Loading leaderboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">Error Loading Data</h2>
          <p className="text-secondary-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Top 1 Section */}
        <LeaderboardSection 
          title="Top 1 Performance"
          data={getDataBySection('Top 1')}
          sectionId="top1"
        />
        
        {/* Top 3 Section */}
        <LeaderboardSection 
          title="Top 3 Performance" 
          data={getDataBySection('Top 3')}
          sectionId="top3"
        />
      </main>
      
      <footer className="bg-white border-t border-secondary-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-secondary-600">
          <p>&copy; 2025 AI Model Leaderboard. Built with React, Tailwind CSS, and Chart.js</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 