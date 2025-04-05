import React, { useState, useEffect } from 'react';
import { getLogEntries, clearLogEntries, setLogLevel, LOG_LEVELS } from '../../utils/claudeApiLogger';
import { getTokenUsage } from '../../utils/claudeApiUtils';

const ApiDebugPanel = () => {
  const [logs, setLogs] = useState([]);
  const [tokenUsage, setTokenUsage] = useState({ input: 0, output: 0 });
  const [logLevel, setLogLevelState] = useState('INFO');
  const [filterType, setFilterType] = useState('all');
  const [expandedLogId, setExpandedLogId] = useState(null);
  
  // Fetch logs and token usage on component mount
  useEffect(() => {
    const fetchData = () => {
      setLogs(getLogEntries());
      setTokenUsage(getTokenUsage());
    };
    
    fetchData();
    
    // Refresh data every 5 seconds
    const interval = setInterval(fetchData, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle clearing logs
  const handleClearLogs = () => {
    clearLogEntries();
    setLogs([]);
  };
  
  // Handle changing log level
  const handleLogLevelChange = (level) => {
    setLogLevel(level);
    setLogLevelState(level);
  };
  
  // Filter logs by type
  const filteredLogs = logs.filter(log => {
    if (filterType === 'all') return true;
    return log.type === filterType;
  });
  
  // Format timestamp
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };
  
  // Toggle expanded log
  const toggleExpandLog = (id) => {
    if (expandedLogId === id) {
      setExpandedLogId(null);
    } else {
      setExpandedLogId(id);
    }
  };
  
  // Calculate estimated cost (very rough estimate)
  const estimatedCost = () => {
    // Based on Claude API pricing (simplified, approximation only)
    const inputCost = tokenUsage.input * 0.000003; // $3 per million tokens for input
    const outputCost = tokenUsage.output * 0.000015; // $15 per million tokens for output
    return (inputCost + outputCost).toFixed(2);
  };
  
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Claude API Debug Panel</h2>
        
        {/* Token Usage Stats */}
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Token Usage</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Input Tokens</div>
              <div className="text-2xl font-bold text-blue-600">{tokenUsage.input.toLocaleString()}</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Output Tokens</div>
              <div className="text-2xl font-bold text-green-600">{tokenUsage.output.toLocaleString()}</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">Estimated Cost ($)</div>
              <div className="text-2xl font-bold text-purple-600">${estimatedCost()}</div>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Log Level</label>
            <select
              value={logLevel}
              onChange={(e) => handleLogLevelChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.keys(LOG_LEVELS).map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="request">Requests</option>
              <option value="response">Responses</option>
              <option value="error">Errors</option>
            </select>
          </div>
          <div className="flex-1 flex items-end">
            <button
              onClick={handleClearLogs}
              className="w-full p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Clear Logs
            </button>
          </div>
        </div>
        
        {/* Log Entries */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Log Entries ({filteredLogs.length})</h3>
          
          {filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No logs found</div>
          ) : (
            <div className="space-y-2">
              {filteredLogs.map((log, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    log.type === 'error' ? 'bg-red-100' : 
                    log.type === 'request' ? 'bg-blue-100' : 
                    'bg-green-100'
                  }`}
                  onClick={() => toggleExpandLog(index)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-gray-800">
                        {log.type.toUpperCase()} {log.subtype ? `(${log.subtype})` : ''}
                      </span>
                      <span className="text-sm text-gray-600 ml-2">
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>
                    <span>
                      {expandedLogId === index ? '▼' : '►'}
                    </span>
                  </div>
                  
                  {expandedLogId === index && (
                    <div className="mt-2 bg-white p-3 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                        {JSON.stringify(log, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiDebugPanel; 