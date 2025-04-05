/**
 * Logger utility for Claude API calls
 * Provides functions for logging requests, responses, and errors
 */

// Configure log levels
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

// Current log level (can be changed at runtime)
let currentLogLevel = LOG_LEVELS.INFO;

// Maximum log entries to keep in local storage
const MAX_LOG_ENTRIES = 100;

/**
 * Set the current log level
 * @param {string} level - The log level to set ('DEBUG', 'INFO', 'WARN', 'ERROR')
 */
export const setLogLevel = (level) => {
  if (LOG_LEVELS[level] !== undefined) {
    currentLogLevel = LOG_LEVELS[level];
    console.log(`Claude API Logger: Log level set to ${level}`);
  } else {
    console.error(`Claude API Logger: Invalid log level: ${level}`);
  }
};

/**
 * Log an API request
 * @param {string} type - The type of request (e.g., 'conversation', 'evaluation')
 * @param {Object} payload - The request payload
 */
export const logApiRequest = (type, payload) => {
  if (currentLogLevel <= LOG_LEVELS.DEBUG) {
    console.debug(`Claude API Request (${type}):`, payload);
  }
  
  // Store in local storage for debugging
  storeLogEntry({
    type: 'request',
    subtype: type,
    timestamp: new Date().toISOString(),
    payload: sanitizePayload(payload)
  });
};

/**
 * Log an API response
 * @param {string} type - The type of response
 * @param {Object} response - The API response
 */
export const logApiResponse = (type, response) => {
  if (currentLogLevel <= LOG_LEVELS.DEBUG) {
    console.debug(`Claude API Response (${type}):`, response);
  }
  
  // Store in local storage for debugging
  storeLogEntry({
    type: 'response',
    subtype: type,
    timestamp: new Date().toISOString(),
    payload: sanitizePayload(response)
  });
};

/**
 * Log an API error
 * @param {string} type - The type of request that caused the error
 * @param {Error} error - The error object
 */
export const logApiError = (type, error) => {
  if (currentLogLevel <= LOG_LEVELS.ERROR) {
    console.error(`Claude API Error (${type}):`, error);
  }
  
  // Store in local storage for debugging
  storeLogEntry({
    type: 'error',
    subtype: type,
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack
  });
};

/**
 * Remove sensitive information from payloads before storing
 * @param {Object} payload - The payload to sanitize
 * @returns {Object} - The sanitized payload
 */
const sanitizePayload = (payload) => {
  // Create a deep copy
  const sanitized = JSON.parse(JSON.stringify(payload));
  
  // Remove API keys and other sensitive information
  if (sanitized.headers) {
    if (sanitized.headers['x-api-key']) {
      sanitized.headers['x-api-key'] = '[REDACTED]';
    }
    if (sanitized.headers['authorization']) {
      sanitized.headers['authorization'] = '[REDACTED]';
    }
  }
  
  return sanitized;
};

/**
 * Store a log entry in local storage
 * @param {Object} entry - The log entry to store
 */
const storeLogEntry = (entry) => {
  try {
    // Get existing logs
    const logs = JSON.parse(localStorage.getItem('claudeApiLogs') || '[]');
    
    // Add new entry
    logs.push(entry);
    
    // Trim to max length
    while (logs.length > MAX_LOG_ENTRIES) {
      logs.shift();
    }
    
    // Save back to local storage
    localStorage.setItem('claudeApiLogs', JSON.stringify(logs));
  } catch (error) {
    console.error('Error storing API log entry:', error);
  }
};

/**
 * Get all stored log entries
 * @returns {Array} - Array of log entries
 */
export const getLogEntries = () => {
  try {
    return JSON.parse(localStorage.getItem('claudeApiLogs') || '[]');
  } catch (error) {
    console.error('Error retrieving API log entries:', error);
    return [];
  }
};

/**
 * Clear all stored log entries
 */
export const clearLogEntries = () => {
  localStorage.removeItem('claudeApiLogs');
  console.log('Claude API Logger: Log entries cleared');
};

// Export log levels for external use
export { LOG_LEVELS }; 