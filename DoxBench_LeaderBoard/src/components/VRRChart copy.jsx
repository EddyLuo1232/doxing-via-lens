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

  // Function to get the appropriate logo for a model
  const getModelLogo = (modelName) => {
    const cleanModelName = modelName.toLowerCase();
    
    // OpenAI models
    if (cleanModelName.includes('o3') || cleanModelName.includes('o4') || 
        cleanModelName.includes('gpt-4o') || cleanModelName.includes('gpt-4.1')) {
      return backgroundImages['OpenAI o3†'] || backgroundImages['GPT-4o']; // Use any OpenAI logo as fallback
    }
    
    // Anthropic models
    if (cleanModelName.includes('sonnet') || cleanModelName.includes('opus') || 
        cleanModelName.includes('claude')) {
      return backgroundImages['Claude Sonnet4'] || backgroundImages['Claude Opus4']; // Use any Anthropic logo as fallback
    }
    
    // Google models
    if (cleanModelName.includes('gemini')) {
      return backgroundImages['Gemini 2.5 Pro'];
    }
    
    // Qwen models
    if (cleanModelName.includes('qvq')) {
      return backgroundImages['QvQ'];
    }
    
    // Meta models
    if (cleanModelName.includes('llama')) {
      return backgroundImages['Llama 4 Scout'] || backgroundImages['Llama 4 Maverick']; // Use any Meta logo as fallback
    }
    
    // Try exact match as fallback
    return backgroundImages[modelName];
  };

  useEffect(() => {
    const loadImages = async () => {
      const imageMap = {};
      // Map models to their corresponding company logo SVGs
      const modelToLogoMapping = {
        // OpenAI models use openai.svg
        'OpenAI o3†': '/logos/openai.svg',
        'OpenAI o4-mini†': '/logos/openai.svg',
        'GPT-4o': '/logos/openai.svg',
        'GPT-4.1': '/logos/openai.svg',
        // Anthropic models use anthropic.svg
        'Claude Sonnet4': '/logos/anthropic.svg',
        'Claude Opus4': '/logos/anthropic.svg',
        // Google models use gemini.svg
        'Gemini 2.5 Pro': '/logos/gemini.svg',
        // Qwen models use qwen.svg
        'QvQ': '/logos/qwen.svg',
        // Meta models use meta.svg
        'Llama 4 Scout': '/logos/meta.svg',
        'Llama 4 Maverick': '/logos/meta.svg'
      };

      for (const [model, logoPath] of Object.entries(modelToLogoMapping)) {
        try {
          const img = new Image();
          img.src = logoPath;
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = (err) => {
              console.warn(`Failed to load logo ${logoPath} for model ${model}:`, err);
              reject(new Error(`Failed to load ${logoPath}`));
            };
          });
          imageMap[model] = img;
          console.log(`Successfully loaded logo for ${model}`);
        } catch (error) {
          console.warn(`Could not load logo for ${model}:`, error);
        }
      }
      setBackgroundImages(imageMap);
      console.log('Loaded model logos:', Object.keys(imageMap));
    };

    loadImages();
  }, []);

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

  // Plugin to draw logos on top of bars (not inside)
  const logoPlugin = {
    id: 'logoOnTop',
    afterDatasetsDraw: (chart) => {
      const { ctx, data } = chart;
      const processedData = data._processedData;
      const meta = chart.getDatasetMeta(0); // Get metadata for the first dataset

      if (!processedData || !Object.keys(backgroundImages).length) return;

      ctx.save();

      processedData.forEach((item, index) => {
        // Get the appropriate logo for this model using the new function
        const modelLogo = getModelLogo(item.Model);
        if (!modelLogo) {
          console.log(`No logo found for model: "${item.Model}". Available logos:`, Object.keys(backgroundImages));
          return; // Skip if no logo is available for this model
        }

        const bar = meta.data[index];
        if (!bar) return;

        // Get bar geometry
        const barX = bar.x;
        const barY = bar.y;
        const barWidth = bar.width;

        // Position logo on top of the bar
        const logoSize = Math.min(barWidth * 0.6, 24); // Logo size based on bar width, max 24px
        const logoX = barX - logoSize / 2;
        const logoY = barY - logoSize - 8; // 8px gap above the bar

        // Only draw if logo would be visible (not cut off by chart area)
        if (logoY >= chart.chartArea.top) {
          ctx.drawImage(
            modelLogo,
            logoX, logoY, logoSize, logoSize
          );
        }
      });

      ctx.restore();
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 40, // Add padding at top to accommodate logos
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
            const unit = selectedMetric === 'VRR' ? '%' : ' bits';
            return `${selectedMetric === 'VRR' ? 'VRR' : 'GLARE'}: ${context.parsed.y.toFixed(2)}${unit}`;
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
        max: selectedMetric === 'VRR' ? 100 : undefined,
        ticks: {
          callback: function(value) {
            const unit = selectedMetric === 'VRR' ? '%' : ' bits';
            return value + unit;
          },
          color: '#6b7280',
        },
        grid: { color: '#e5e7eb' },
        title: {
          display: true,
          text: selectedMetric === 'VRR' ? 'VRR (%)' : 'GLARE (bits)',
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
      
      <div className="w-full" style={{ height: '400px' }}>
        {/* Use the logo plugin instead of background image plugin */}
        <Bar ref={chartRef} data={chartData} options={options} plugins={[logoPlugin]} />
      </div>
    </div>
  );
};

export default VRRChart;
