import React, { useState, useMemo } from 'react';

/**
 * DataTable component that displays model performance data in a sortable table
 * @param {Object} props - Component props
 * @param {Array} props.data - Data array containing model performance data
 * @returns {JSX.Element} The data table component
 */
const DataTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'VRR', direction: 'desc' });

  /**
   * Get logo filename based on model name
   * @param {string} modelName - The model name
   * @returns {string} Logo filename
   */
  const getModelLogo = (modelName) => {
    const name = modelName.toLowerCase();
    
    if (name.includes('o3') || name.includes('o4') || name.includes('gpt')) {
      return 'openai.svg';
    }
    if (name.includes('claude')) {
      return 'anthropic.svg';
    }
    if (name.includes('gemini')) {
      return 'gemini.svg';
    }
    if (name.includes('qvq')) {
      return 'qwen.svg';
    }
    if (name.includes('llama')) {
      return 'meta.svg';
    }
    
    // Default fallback
    return 'openai.svg';
  };

  /**
   * Handle column sorting
   * @param {string} key - Column key to sort by
   */
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  /**
   * Sort data based on current sort configuration
   */
  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const sortableData = [...data];
    sortableData.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle percentage values
      if (typeof aValue === 'string' && aValue.includes('%')) {
        aValue = parseFloat(aValue.replace('%', ''));
        bValue = parseFloat(bValue.replace('%', ''));
      }
      
      // Handle numeric values
      if (!isNaN(aValue) && !isNaN(bValue)) {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortableData;
  }, [data, sortConfig]);

  /**
   * Render sort icon based on current sort state
   * @param {string} columnKey - Column key
   * @returns {JSX.Element} Sort icon
   */
  const renderSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <span className="text-secondary-400">↕️</span>;
    }
    return sortConfig.direction === 'asc' ? 
      <span className="text-primary-600">↑</span> : 
      <span className="text-primary-600">↓</span>;
  };

  /**
   * Format cell value for display
   * @param {string} key - Column key
   * @param {any} value - Cell value
   * @param {Object} row - Full row data (for Model column with logo)
   * @returns {string|JSX.Element} Formatted value
   */
  const formatCellValue = (key, value, row) => {
    if (value === null || value === undefined || value === '') {
      return 'N/A';
    }
    
    // Special handling for Model column with logo
    if (key === 'Model') {
      const logoSrc = `/logos/${getModelLogo(value)}`;
      return (
        <div className="flex items-center space-x-3">
          <img 
            src={logoSrc} 
            alt={`${value} logo`}
            className="w-6 h-6 flex-shrink-0"
            onError={(e) => {
              e.target.src = '/logos/openai.svg'; // Fallback logo
            }}
          />
          <span className="font-medium">{value}</span>
        </div>
      );
    }
    
    // Format numeric values with appropriate precision
    if (key === 'AED_km' || key === 'MED_km') {
      const numValue = parseFloat(value);
      return isNaN(numValue) ? value : numValue.toFixed(2);
    }
    
    if (key === 'GLARE_bits') {
      const numValue = parseFloat(value);
      return isNaN(numValue) ? value : numValue.toFixed(2);
    }
    
    return value;
  };

  /**
   * Get cell styling based on column and value
   * @param {string} key - Column key
   * @param {any} value - Cell value
   * @returns {string} CSS classes
   */
  const getCellStyling = (key, value) => {
    let baseClasses = 'table-cell';
    
    if (key === 'VRR') {
      const numValue = parseFloat(value?.replace('%', '') || '0');
      if (numValue >= 90) baseClasses += ' text-green-700 font-semibold';
      else if (numValue >= 70) baseClasses += ' text-blue-700 font-medium';
      else if (numValue >= 50) baseClasses += ' text-yellow-700';
      else baseClasses += ' text-red-700';
    }
    
    if (key === 'State_Acc_pct' || key === 'Metro_Acc_pct') {
      const numValue = parseFloat(value?.replace('%', '') || '0');
      if (numValue === 100) baseClasses += ' text-green-700 font-semibold';
      else if (numValue >= 95) baseClasses += ' text-blue-700';
    }
    
    return baseClasses;
  };

  const columns = [
    { key: 'Model', label: 'Model', sortable: true },
    { key: 'Method', label: 'Method', sortable: true },
    { key: 'VRR', label: 'VRR', sortable: true },
    { key: 'AED_km', label: 'AED (km)', sortable: true },
    { key: 'MED_km', label: 'MED (km)', sortable: true },
    { key: 'State_Acc_pct', label: 'State Acc', sortable: true },
    { key: 'Metro_Acc_pct', label: 'Metro Acc', sortable: true },
    { key: 'GLARE_bits', label: 'GLARE (bits)', sortable: true },
  ];

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-secondary-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-secondary-200">
        <thead className="table-header">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-secondary-100 transition-colors duration-200' : ''
                }`}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {column.sortable && renderSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-secondary-200">
          {sortedData.map((row, index) => (
            <tr 
              key={`${row.Model}-${row.Method}-${index}`}
              className="hover:bg-secondary-50 transition-colors duration-200"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={getCellStyling(column.key, row[column.key])}
                >
                  {formatCellValue(column.key, row[column.key], row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable; 