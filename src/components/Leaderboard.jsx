import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import LeaderboardSection from './leaderboard/LeaderboardSection';
import { TrendingUp, Trophy, Award, Target } from 'lucide-react';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('./data/doxbench_leaderboard.csv');
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

  const getDataBySection = (section) => {
    return data.filter(row => row.Section === section);
  };

  if (loading) {
    return (
      <section id="leaderboard" className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-secondary-600 text-lg">Loading leaderboard data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="leaderboard" className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">Error Loading Data</h2>
            <p className="text-secondary-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="leaderboard" className="py-20 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary-900 mb-6">
            DoxBench Leaderboard
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8">
            Comprehensive evaluation results of AI models across privacy-invasive tasks. 
            Performance is measured across multiple metrics including validation rate ratio (VRR), 
            error distances, and geographical accuracy.
          </p>

          {/* Metrics Legend */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span className="text-secondary-700">VRR: Validation Rate Ratio</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-secondary-700">AED: Avg Error Distance (km)</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-secondary-700">MED: Median Error Distance (km)</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-secondary-700">State Acc: State Accuracy</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-secondary-700">Metro Acc: Metro Accuracy</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-secondary-700">GLARE: Privacy Risk Score</span>
            </div>
          </div>
        </div>

        {/* Performance Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="card text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <Trophy className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-700 mb-1">100%</div>
            <div className="text-green-800 font-medium">Best VRR</div>
            <div className="text-sm text-green-600">GPT-4.1 (+CoT, Top 3)</div>
          </div>
          
          <div className="card text-center bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-blue-700 mb-1">0.27km</div>
            <div className="text-blue-800 font-medium">Best MED</div>
            <div className="text-sm text-blue-600">GPT-4o (Vanilla, Top 3)</div>
          </div>

          <div className="card text-center bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-purple-700 mb-1">100%</div>
            <div className="text-purple-800 font-medium">Perfect State Acc</div>
            <div className="text-sm text-purple-600">Multiple models achieve this</div>
          </div>

          <div className="card text-center bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-orange-700 mb-1">2002</div>
            <div className="text-orange-800 font-medium">Max GLARE</div>
            <div className="text-sm text-orange-600">Gemini 2.5 Pro† (+CoT, Top 3)</div>
          </div>
        </div>

        {/* Top 1 Section */}
        <div className="mb-20">
          <LeaderboardSection 
            title="Top 1 Performance"
            description="Single-attempt performance across all evaluated models"
            data={getDataBySection('Top 1')}
            sectionId="top1"
          />
        </div>
        
        {/* Top 3 Section */}
        <div className="mb-20">
          <LeaderboardSection 
            title="Top 3 Performance" 
            description="Best-of-three performance demonstrating maximum model capabilities"
            data={getDataBySection('Top 3')}
            sectionId="top3"
          />
        </div>

        {/* Additional Information */}
        <div className="card bg-gradient-to-r from-secondary-50 to-primary-50 border-0 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-secondary-900 mb-4">Understanding the Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-secondary-700">
            <div>
              <h4 className="font-semibold mb-2">Methodology Notes:</h4>
              <ul className="space-y-1">
                <li>• Models marked with † indicate proprietary/enhanced versions</li>
                <li>• +CoT indicates Chain-of-Thought prompting</li>
                <li>• Higher VRR and GLARE scores indicate greater privacy risks</li>
                <li>• Lower error distances (AED/MED) indicate better geolocation accuracy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Privacy Implications:</h4>
              <ul className="space-y-1">
                <li>• Top-performing models show concerning privacy vulnerabilities</li>
                <li>• Chain-of-Thought prompting generally increases risks</li>
                <li>• Larger models tend to perform better on privacy-invasive tasks</li>
                <li>• Results highlight need for privacy-preserving AI development</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard; 