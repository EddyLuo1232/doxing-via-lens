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
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Custom Sliding Toggle Component
const SlidingToggle = ({ options, value, onChange, label }) => {
  const selectedIndex = options.findIndex(option => option.value === value);
  const buttonWidth = `${100 / options.length}%`;
  
  return (
    <div className="flex flex-col space-y-2">
      <label className="block text-sm font-medium text-secondary-700">
        {label}
      </label>
      <div className="relative inline-flex bg-secondary-100 rounded-lg p-1">
        {/* Background slider */}
        <div 
          className="absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-all duration-300 ease-in-out"
          style={{
            left: `calc(${selectedIndex * (100 / options.length)}% + 4px)`,
            width: `calc(${buttonWidth} - 8px)`,
          }}
        />
        {/* Options */}
        {options.map((option, index) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300 min-w-[80px] ${
              value === option.value
                ? 'text-secondary-900'
                : 'text-secondary-600 hover:text-secondary-900'
            }`}
            style={{ width: buttonWidth }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const VRRChart = ({ data, sectionId }) => {
  const [selectedMetric, setSelectedMetric] = useState('GLARE_bits');
  const [methodFilter, setMethodFilter] = useState('Vanilla');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [logoImages, setLogoImages] = useState({});
  const chartRef = useRef(null);

  // Scroll animation for the entire chart component
  const chartAnimation = useScrollAnimation({ threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

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

  const getModelColor = (modelName) => {
    const cleanModelName = modelName.toLowerCase()
      .replace(/[†\s\-\.]/g, '')
      .replace(/openai/g, '')
      .replace(/anthropic/g, '')
      .replace(/google/g, '')
      .replace(/meta/g, '');
    
    if (cleanModelName.includes('gemini')) return modelColors.gemini;
    if (cleanModelName.includes('llama')) return modelColors.llama;
    if (cleanModelName.includes('o3')) return modelColors.o3;
    if (cleanModelName.includes('o4mini')) return modelColors.o4mini;
    if (cleanModelName.includes('gpt4o')) return modelColors.GPT4o;
    if (cleanModelName.includes('gpt41')) return modelColors['GPT4.1'];
    if (cleanModelName.includes('sonnet4')) return modelColors.Sonnet4;
    if (cleanModelName.includes('opus4')) return modelColors.Opus4;
    if (cleanModelName.includes('qvq')) return modelColors.QvQ;
    
    return '#6b7280';
  };

  const getModelLogo = (modelName) => {
    const name = modelName.toLowerCase();
    
    if (name.includes('o3') || name.includes('o4') || name.includes('gpt4o') || name.includes('gpt4.1')) {
      return 'openai.svg';
    }
    if (name.includes('claude') || name.includes('sonnet4') || name.includes('opus4')) {
      return 'anthropic.svg';
    }
    if (name.includes('gemini')) {
      return 'gemini.svg';
    }
    if (name.includes('qvq')) {
      return 'qwen.svg';
    }
    if (name.includes('llama') || name.includes('scout') || name.includes('maverick')) {
      return 'meta.svg';
    }
    
    return 'openai.svg';
  };

  // Auto-progression on first load but only when chart is visible: Vanilla -> CoT -> All
  useEffect(() => {
    if (isFirstLoad && data && data.length > 0 && chartAnimation.isVisible) {
      const timer1 = setTimeout(() => {
        setMethodFilter('CoT');
      }, 1200); // Faster: Switch to CoT after 1.2 seconds

      const timer2 = setTimeout(() => {
        setMethodFilter('All');
        setIsFirstLoad(false);
      }, 2400); // Faster: Switch to All after 2.4 seconds

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isFirstLoad, data, chartAnimation.isVisible]);

  const filteredData = useMemo(() => {
    if (methodFilter === 'All') {
      return data;
    } else if (methodFilter === 'Vanilla') {
      return data.filter(item => item.Method === 'vanilla');
    } else if (methodFilter === 'CoT') {
      return data.filter(item => item.Method === '+CoT');
    }
    return data;
  }, [data, methodFilter]);

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
    const backgroundColors = processedData.map(item => getModelColor(item.Model));
    
    const borderColors = processedData.map(item => {
      if (item.Method === '+CoT') {
        return '#000000';
      }
      return getModelColor(item.Model);
    });

    const borderWidths = processedData.map(item => item.Method === '+CoT' ? 2 : 1);

    return {
      labels,
      datasets: [
        {
          label: selectedMetric === 'VRR' ? 'VRR (%)' : 'GLARE (bits)',
          data: values,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: borderWidths,
          borderRadius: 4,
          borderSkipped: false,
        },
      ],
    };
  }, [filteredData, selectedMetric, logoImages]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePaths = ['openai.svg', 'anthropic.svg', 'gemini.svg', 'qwen.svg', 'meta.svg'];
      const imagePromises = imagePaths.map(path => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve({ path, img });
          img.onerror = reject;
          img.src = `/logos/${path}`;
        });
      });
      
      try {
        const results = await Promise.all(imagePromises);
        const imageMap = {};
        results.forEach(({ path, img }) => {
          imageMap[path] = img;
        });
        setLogoImages(imageMap);
      } catch (error) {
        console.warn('Failed to preload some logo images:', error);
      }
    };
    
    preloadImages();
  }, []);

  // Chart.js plugin to draw logos on top of bars
  const logoPlugin = {
    id: 'logoPlugin',
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      
      chart.getDatasetMeta(0).data.forEach((bar, index) => {
        if (bar.active !== false) {
          const modelName = filteredData[index]?.Model;
          if (!modelName) return;
          
          const logoFileName = getModelLogo(modelName);
          const logoImage = logoImages[logoFileName];
          
          if (logoImage) {
            const x = bar.x;
            const y = bar.y - 25; // Position logo 25px above bar
            const logoSize = 20;
            
            ctx.save();
            ctx.drawImage(logoImage, x - logoSize/2, y - logoSize/2, logoSize, logoSize);
            ctx.restore();
          }
        }
      });
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      logoPlugin: true,
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${selectedMetric === 'VRR' ? 'Validation Rate Ratio (VRR)' : 'GLARE Privacy Risk Score'} by Model`,
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#374151',
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            return context[0].label;
          },
          label: (context) => {
            const value = context.parsed.y;
            return selectedMetric === 'VRR' 
              ? `VRR: ${value.toFixed(2)}%`
              : `GLARE: ${value.toFixed(2)} bits`;
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: maxValue,
        title: {
          display: true,
          text: selectedMetric === 'VRR' ? 'VRR (%)' : 'GLARE (bits)',
          font: {
            size: 12,
          },
          color: '#6b7280',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
          // Hide the maximum tick value for GLARE metric only
          callback: function(value, index, ticks) {
            if (selectedMetric === 'GLARE_bits' && index === ticks.length - 1) {
              return '';
            }
            return value;
          }
        },
      },
      x: {
        title: {
          display: true,
          text: 'Models',
          font: {
            size: 12,
          },
          color: '#6b7280',
        },
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 10,
          },
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-secondary-500">No data available for chart</p>
      </div>
    );
  }

  return (
    <div 
      ref={chartAnimation.ref}
      className={`space-y-6 transition-all duration-600 ${
        chartAnimation.isVisible 
          ? 'opacity-1 animate-[fadeInUp_600ms_ease-out_forwards]' 
          : 'opacity-0'
      }`}
    >
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-6">
          <SlidingToggle
            options={[
              { value: 'GLARE_bits', label: 'GLARE' },
              { value: 'VRR', label: 'VRR' },
            ]}
            value={selectedMetric}
            onChange={(value) => setSelectedMetric(value)}
            label="Metric"
          />
          
          <SlidingToggle
            options={[
              { value: 'Vanilla', label: 'Vanilla' },
              { value: 'CoT', label: 'CoT' },
              { value: 'All', label: 'All' },
            ]}
            value={methodFilter}
            onChange={(value) => setMethodFilter(value)}
            label="Method"
          />
        </div>

        <div className="text-sm text-secondary-600">
          Showing {filteredData.length} results
        </div>
      </div>

      {/* Chart */}
      <div className="h-96 w-full">
        <Bar ref={chartRef} data={chartData} options={options} plugins={[logoPlugin]} />
      </div>

      {/* Legend */}
      <div className="text-xs text-secondary-600 space-y-1">
        <p>• Models with black borders indicate Chain-of-Thought (CoT) prompting</p>
        <p>• Models marked with † are proprietary/enhanced versions</p>
        <p>• Charts are sorted by performance (highest to lowest)</p>
      </div>
    </div>
  );
};

export default VRRChart; 