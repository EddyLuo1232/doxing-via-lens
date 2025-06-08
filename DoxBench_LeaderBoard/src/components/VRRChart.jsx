import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * VRRChart component that displays a bar chart of performance metrics (VRR or GLARE)
 * @param {Object} props - Component props
 * @param {Array} props.data - Data array containing model performance data
 * @param {string} props.sectionId - Unique identifier for the section
 * @returns {JSX.Element} The performance chart component
 */
const VRRChart = ({ data, sectionId }) => {
  const [selectedMetric, setSelectedMetric] = useState('GLARE_bits');
  const [methodFilter, setMethodFilter] = useState('Combined'); // 'Vanilla only', 'CoT only', 'Combined'
  const [showValueLabels, setShowValueLabels] = useState(false); // New state for value labels
  const chartRef = useRef(null);
  const [backgroundImages, setBackgroundImages] = useState({});

  // Define specific colors for each model
  const modelColors = {
    'gemini': '#32A7F5',
    'llama': '#A1C3ED', 
    'o3': '#7ABF91',
    'o4mini': '#AFCF9E',
    'GPT4o': '#CAEBE2',
    'GPT4.1': '#94D4BC',
    'Sonnet4': '#EEBFAA',
    'Opus4': '#D97757',
    'QvQ': '#615CED'
  };

  // Function to get model color based on model name
  const getModelColor = (modelName) => {
    // Extract base model name by removing special characters and common suffixes
    const cleanModelName = modelName.toLowerCase()
      .replace(/[†\s\-\.]/g, '')
      .replace(/openai/g, '')
      .replace(/anthropic/g, '')
      .replace(/google/g, '')
      .replace(/meta/g, '');
    
    // Check for specific model patterns
    if (cleanModelName.includes('gemini')) return modelColors.gemini;
    if (cleanModelName.includes('llama')) return modelColors.llama;
    if (cleanModelName.includes('o3')) return modelColors.o3;
    if (cleanModelName.includes('o4mini')) return modelColors.o4mini;
    if (cleanModelName.includes('gpt4o')) return modelColors.GPT4o;
    if (cleanModelName.includes('gpt41')) return modelColors['GPT4.1'];
    if (cleanModelName.includes('sonnet4')) return modelColors.Sonnet4;
    if (cleanModelName.includes('opus4')) return modelColors.Opus4;
    if (cleanModelName.includes('qvq')) return modelColors.QvQ;
    
    // Default fallback color
    return '#6b7280';
  };

  // Function to get the appropriate logo path for a model
  const getModelLogoPath = (modelName) => {
    const cleanModelName = modelName.toLowerCase()
      .replace(/[†\s\-\.]/g, '')
      .replace(/openai/g, '')
      .replace(/anthropic/g, '')
      .replace(/google/g, '')
      .replace(/meta/g, '');
    
    // OpenAI models (o3, o4, GPT4o, GPT4.1)
    if (cleanModelName.includes('o3') || cleanModelName.includes('o4') || 
        cleanModelName.includes('gpt4o') || cleanModelName.includes('gpt41')) {
      return '/logos/openai.svg';
    }
    
    // Anthropic models (claude sonnet4 & claude opus4)
    if (cleanModelName.includes('claude') || cleanModelName.includes('sonnet') || 
        cleanModelName.includes('opus')) {
      return '/logos/anthropic.svg';
    }
    
    // Google models (gemini2.5pro)
    if (cleanModelName.includes('gemini')) {
      return '/logos/gemini.svg';
    }
    
    // Qwen models (QvQ)
    if (cleanModelName.includes('qvq')) {
      return '/logos/qwen.svg';
    }
    
    // Meta models (llama 4 Scout & Maverick)
    if (cleanModelName.includes('llama')) {
      return '/logos/meta.svg';
    }
    
    return null;
  };

  useEffect(() => {
    const loadImages = async () => {
      const imageMap = {};
      // Get unique logo paths from all data
      const logoPaths = [...new Set(data.map(item => getModelLogoPath(item.Model)).filter(Boolean))];

      for (const logoPath of logoPaths) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous'; // Handle CORS if needed
          img.src = logoPath;
          await new Promise((resolve, reject) => {
            img.onload = () => {
              console.log(`Successfully loaded logo: ${logoPath}`);
              resolve();
            };
            img.onerror = (err) => {
              console.warn(`Failed to load logo ${logoPath}:`, err);
              reject(new Error(`Failed to load ${logoPath}`));
            };
          });
          imageMap[logoPath] = img;
        } catch (error) {
          console.warn(`Could not load logo ${logoPath}:`, error);
        }
      }
      setBackgroundImages(imageMap);
      console.log('Loaded logos:', Object.keys(imageMap));
    };

    if (data && data.length > 0) {
      loadImages();
    }
  }, [data]);

  const filteredData = useMemo(() => {
    if (methodFilter === 'Combined') {
      return data;
    } else if (methodFilter === 'Vanilla only') {
      return data.filter(item => item.Method === 'vanilla');
    } else if (methodFilter === 'CoT only') {
      return data.filter(item => item.Method === '+CoT');
    }
    return data;
  }, [data, methodFilter]);

  // Calculate maximum value across all data for consistent y-axis scaling
  const maxValue = useMemo(() => {
    if (!data || data.length === 0) return undefined;
    
    const allValues = data.map(item => {
      if (selectedMetric === 'VRR') {
        return parseFloat(item.VRR?.replace('%', '') || '0');
      } else if (selectedMetric === 'GLARE_bits') {
        return parseFloat(item.GLARE_bits || '0');
      }
      return 0;
    });
    
    const max = Math.max(...allValues);
    // Add some padding to the max value (10% more)
    return selectedMetric === 'VRR' ? Math.min(100, max * 1.1) : max * 1.1;
  }, [data, selectedMetric]);

  const chartData = useMemo(() => {
    const processedData = filteredData
      .map(item => {
        let metricValue;
        if (selectedMetric === 'VRR') {
          metricValue = parseFloat(item.VRR?.replace('%', '') || '0');
        } else if (selectedMetric === 'GLARE_bits') {
          metricValue = parseFloat(item.GLARE_bits || '0');
        }
        return { ...item, metricValue };
      })
      .sort((a, b) => b.metricValue - a.metricValue);

    const labels = processedData.map(item => `${item.Model} (${item.Method})`);
    const values = processedData.map(item => item.metricValue);

    // Use model-specific colors
    const backgroundColors = processedData.map(item => getModelColor(item.Model));
    
    // Set border colors and widths based on method
    const borderColors = processedData.map(item => {
      if (item.Method === '+CoT') {
        return '#000000'; // Black border for CoT versions
      }
      return getModelColor(item.Model); // Same as background for vanilla
    });
    
    const borderWidths = processedData.map(item => {
      if (item.Method === '+CoT') {
        return 3; // 1pt thicker border for CoT (3px instead of 2px)
      }
      return 2; // Standard border width for vanilla
    });

    const metricLabel = selectedMetric === 'VRR' ? 'VRR (%)' : 'GLARE (bits)';

    return {
      labels,
      datasets: [
        {
          label: metricLabel,
          data: values,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: borderWidths,
          borderRadius: 4,
          borderSkipped: false,
        },
      ],
      // Attach sorted data to be accessible by the plugin
      _processedData: processedData,
    };
  }, [filteredData, selectedMetric]);

  // Plugin to draw logos on top of bars - using useMemo for stable reference
  const logoPlugin = useMemo(() => ({
    id: 'logoOnTop',
    afterDatasetsDraw: (chart) => {
      const { ctx, data } = chart;
      const processedData = data._processedData;
      const meta = chart.getDatasetMeta(0);

      if (!processedData || Object.keys(backgroundImages).length === 0) {
        console.log('No processed data or background images available');
        return;
      }

      ctx.save();

      processedData.forEach((item, index) => {
        const logoPath = getModelLogoPath(item.Model);
        const modelLogo = logoPath ? backgroundImages[logoPath] : null;
        
        if (!modelLogo) {
          console.log(`No logo found for model: "${item.Model}". Logo path: ${logoPath}. Available logos:`, Object.keys(backgroundImages));
          return;
        }

        const bar = meta.data[index];
        if (!bar) {
          console.log(`No bar data for index ${index}`);
          return;
        }

        // Get bar geometry
        const barX = bar.x;
        const barY = bar.y;
        const barWidth = bar.width;

        // Position logo on top of the bar (not inside)
        const logoSize = Math.min(barWidth * 0.7, 24); // Slightly larger logo size, max 24px
        const logoX = barX - logoSize / 2;
        const logoY = barY - logoSize - 8; // 8px gap above the bar

        // Only draw if logo would be visible (not cut off by chart area)
        if (logoY >= chart.chartArea.top - logoSize) {
          try {
            ctx.drawImage(
              modelLogo,
              logoX, logoY, logoSize, logoSize
            );
          } catch (error) {
            console.warn(`Error drawing logo for ${item.Model}:`, error);
          }
        }
      });

      ctx.restore();
    }
  }), [backgroundImages]); // Add backgroundImages as dependency

  // Plugin to draw value labels on top of bars - using useMemo for stable reference
  const valueLabelPlugin = useMemo(() => ({
    id: 'valueLabels',
    afterDatasetsDraw: (chart) => {
      console.log('Value label plugin called, showValueLabels:', showValueLabels);
      if (!showValueLabels) return;

      const { ctx, data } = chart;
      const processedData = data._processedData;
      const meta = chart.getDatasetMeta(0);

      if (!processedData) {
        console.log('No processed data available for value labels');
        return;
      }

      ctx.save();
      ctx.font = 'bold 12px Arial';
      ctx.fillStyle = '#374151';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';

      console.log('Drawing value labels for', processedData.length, 'items, showValueLabels:', showValueLabels);

      processedData.forEach((item, index) => {
        const bar = meta.data[index];
        if (!bar) {
          console.log(`No bar data for index ${index}`);
          return;
        }

        const value = Math.round(item.metricValue); // Round to integer as requested
        const displayValue = selectedMetric === 'VRR' ? `${value}%` : `${value}`; // Add % only for VRR
        const barX = bar.x;
        const barY = bar.y;

        // Position text above the bar (accounting for logo space)
        const textY = barY - 35; // Increased from 30px to 35px for better visibility

        // Only draw if text would be visible
        if (textY >= chart.chartArea.top) {
          ctx.fillText(displayValue, barX, textY);
          console.log(`Drew value ${displayValue} at position (${barX}, ${textY})`);
        } else {
          console.log(`Value ${displayValue} would be outside chart area`);
        }
      });

      ctx.restore();
    }
  }), [showValueLabels, selectedMetric]); // Add selectedMetric as dependency

  // Force chart update when showValueLabels changes
  useEffect(() => {
    if (chartRef.current) {
      console.log('Forcing chart update due to showValueLabels change:', showValueLabels);
      chartRef.current.update();
    }
  }, [showValueLabels]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 60, // Increased padding to accommodate logos and value labels
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${selectedMetric === 'VRR' ? 'VRR' : 'GLARE'} Performance by Model and Method`,
        font: { size: 16, weight: 'bold' },
        color: '#1e293b',
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            const dataIndex = context[0].dataIndex;
            const item = chartData._processedData[dataIndex];
            return `${item?.Model} (${item?.Method})`;
          },
          label: (context) => {
            if (selectedMetric === 'VRR') {
              return `VRR: ${context.parsed.y.toFixed(2)}%`;
            } else {
              return `GLARE: ${context.parsed.y.toFixed(2)}`; // Remove 'bits' suffix
            }
          },
          afterLabel: (context) => {
            const dataIndex = context.dataIndex;
            const item = chartData._processedData[dataIndex];
            return [
              `AED: ${item?.AED_km} km`,
              `MED: ${item?.MED_km} km`,
              `State Acc: ${item?.State_Acc_pct}`,
              `Metro Acc: ${item?.Metro_Acc_pct}`
            ];
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { maxRotation: 45, minRotation: 45, font: { size: 10 }, color: '#6b7280' },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        max: selectedMetric === 'VRR' ? 100 : 2000, // Set max to 2000 for GLARE
        ticks: {
          callback: function(value) {
            // For GLARE, only show specific values: 500, 1000, 1500, 2000 without the 'bits' suffix
            if (selectedMetric === 'GLARE_bits') {
              // Only show these specific values on the y-axis
              if (![0, 500, 1000, 1500, 2000].includes(value)) {
                return ''; // Hide other values
              }
              return value.toString(); // Show value without 'bits' suffix
            } else {
              // For VRR, keep the percentage symbol
              return value + '%';
            }
          },
          color: '#6b7280',
          // Ensure we get the specific tick values we want for GLARE
          stepSize: selectedMetric === 'GLARE_bits' ? 500 : undefined,
        },
        grid: { color: '#e5e7eb' },
        title: {
          display: true,
          text: selectedMetric === 'VRR' ? 'VRR (%)' : 'GLARE', // Remove '(bits)' from the title
          color: '#374151',
          font: { size: 12, weight: 'bold' },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-3">Filter:</span>
          <div className="relative inline-flex bg-gray-200 rounded-full p-1 shadow-inner">
            <div 
              className="absolute top-1 bottom-1 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out"
              style={{
                width: '33.333%',
                left: methodFilter === 'Vanilla only' ? '0%' : 
                      methodFilter === 'CoT only' ? '33.333%' : '66.666%'
              }}
            />
            <button
              onClick={() => setMethodFilter('Vanilla only')}
              className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                methodFilter === 'Vanilla only'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Vanilla only
            </button>
            <button
              onClick={() => setMethodFilter('CoT only')}
              className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                methodFilter === 'CoT only'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              CoT only
            </button>
            <button
              onClick={() => setMethodFilter('Combined')}
              className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                methodFilter === 'Combined'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Combined
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Value Labels Toggle Button */}
          <button
            onClick={() => {
              console.log('Button clicked, current showValueLabels:', showValueLabels);
              setShowValueLabels(!showValueLabels);
              console.log('Setting showValueLabels to:', !showValueLabels);
            }}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 border ${
              showValueLabels
                ? 'bg-green-600 text-white border-green-600 hover:bg-green-700'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:text-gray-800'
            }`}
          >
            {showValueLabels ? 'Hide Values' : 'Show Values'} ({showValueLabels ? 'ON' : 'OFF'})
          </button>

          {/* Metric Toggle Buttons */}
          <div className="flex bg-secondary-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedMetric('GLARE_bits')}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                selectedMetric === 'GLARE_bits'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-200'
              }`}
            >
              GLARE
            </button>
            <button
              onClick={() => setSelectedMetric('VRR')}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                selectedMetric === 'VRR'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-200'
              }`}
            >
              VRR
            </button>
          </div>
        </div>
      </div>
      
      <div className="w-full" style={{ height: '400px' }}>
        <Bar 
          ref={chartRef} 
          data={chartData} 
          options={options} 
          plugins={[logoPlugin, valueLabelPlugin]}
          key={`chart-${showValueLabels}`} // Force re-render when showValueLabels changes
        />
      </div>
    </div>
  );
};

export default VRRChart;