/**
 * Utilities for handling Claude API request management,
 * including rate limiting, error tracking, and retry logic
 */

// Track API request timestamps to enforce rate limits
const apiRequestLog = [];

// Configuration
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 20; // Maximum requests per minute
const RETRY_DELAY_MS = 1000; // Initial delay for retries
const MAX_RETRIES = 3; // Maximum number of retry attempts

/**
 * Check if we're exceeding the rate limit
 * @returns {boolean} - True if we're over the rate limit
 */
export const isRateLimited = () => {
  // Remove requests older than the rate limit window
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  
  // Clean up old requests
  while (apiRequestLog.length > 0 && apiRequestLog[0] < windowStart) {
    apiRequestLog.shift();
  }
  
  // Check if we're over the limit
  return apiRequestLog.length >= MAX_REQUESTS_PER_WINDOW;
};

/**
 * Log a new API request
 */
export const logApiRequest = () => {
  apiRequestLog.push(Date.now());
};

/**
 * Make an API request with rate limiting and retry logic
 * @param {Function} requestFn - Async function that makes the actual request
 * @param {number} retryCount - Current retry attempt (internal use)
 * @returns {Promise<any>} - API response
 */
export const makeRateLimitedRequest = async (requestFn, retryCount = 0) => {
  try {
    // Check if we're rate limited
    if (isRateLimited()) {
      const waitTime = RATE_LIMIT_WINDOW_MS - (Date.now() - apiRequestLog[0]);
      console.warn(`Rate limit exceeded. Waiting ${Math.ceil(waitTime / 1000)} seconds before retrying.`);
      throw new Error(`Rate limit exceeded. Try again in ${Math.ceil(waitTime / 1000)} seconds.`);
    }
    
    // Log this request
    logApiRequest();
    
    // Make the request
    return await requestFn();
  } catch (error) {
    // Log the error details
    console.error('API request error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      retryCount
    });
    
    // Handle rate limit errors with exponential backoff
    if (
      (error.message.includes('rate limit') || error.message.includes('429')) &&
      retryCount < MAX_RETRIES
    ) {
      const delay = RETRY_DELAY_MS * Math.pow(2, retryCount);
      console.log(`Rate limit hit, retrying in ${delay}ms...`);
      
      // Wait and then retry
      await new Promise(resolve => setTimeout(resolve, delay));
      return makeRateLimitedRequest(requestFn, retryCount + 1);
    }
    
    // Handle network errors with retries
    if (
      (error.message.includes('Failed to fetch') || error.message.includes('Network')) &&
      retryCount < MAX_RETRIES
    ) {
      const delay = RETRY_DELAY_MS * Math.pow(2, retryCount);
      console.log(`Network error, retrying in ${delay}ms...`);
      
      // Wait and then retry
      await new Promise(resolve => setTimeout(resolve, delay));
      return makeRateLimitedRequest(requestFn, retryCount + 1);
    }
    
    // Re-throw other errors
    throw error;
  }
};

/**
 * Format error messages from Claude API responses
 * @param {Error} error - The error object
 * @returns {string} - Formatted error message
 */
export const formatClaudeError = (error) => {
  if (!error) return 'Unknown error occurred';
  
  // Handle specific Claude API error types
  if (error.response) {
    try {
      // Parse the error response
      const errorData = error.response.data || {};
      const errorType = errorData.error?.type || '';
      const errorMessage = errorData.error?.message || '';
      
      // Format based on error type
      switch (errorType) {
        case 'authentication_error':
          return 'Authentication failed. Please check your API key.';
        case 'permission_error':
          return 'Permission denied. Your account may not have access to this model.';
        case 'rate_limit_error':
          return 'Rate limit exceeded. Please try again later.';
        case 'server_error':
          return 'Claude server error. Please try again later.';
        case 'invalid_request_error':
          return `Invalid request: ${errorMessage}`;
        default:
          return errorMessage || `API error (${error.response.status})`;
      }
    } catch (parseError) {
      return `API error (${error.response.status})`;
    }
  }
  
  // Network or other errors
  if (error.message.includes('Failed to fetch') || error.message.includes('Network')) {
    return 'Network error. Please check your internet connection.';
  }
  
  return error.message || 'Unknown error occurred';
};

/**
 * Track token usage for cost monitoring
 * @param {Object} apiResponse - Response from Claude API
 */
export const trackTokenUsage = (apiResponse) => {
  try {
    const usage = apiResponse.usage || {};
    const inputTokens = usage.input_tokens || 0;
    const outputTokens = usage.output_tokens || 0;
    
    // Store in localStorage for basic monitoring
    const storedUsage = JSON.parse(localStorage.getItem('claudeTokenUsage') || '{"input": 0, "output": 0}');
    
    const newUsage = {
      input: storedUsage.input + inputTokens,
      output: storedUsage.output + outputTokens
    };
    
    localStorage.setItem('claudeTokenUsage', JSON.stringify(newUsage));
    
    // Log to console for debugging
    console.log(`Claude API usage - Input: ${inputTokens}, Output: ${outputTokens}, Total: ${inputTokens + outputTokens}`);
  } catch (error) {
    console.error('Error tracking token usage:', error);
  }
};

/**
 * Get token usage statistics
 * @returns {Object} - Token usage data
 */
export const getTokenUsage = () => {
  try {
    return JSON.parse(localStorage.getItem('claudeTokenUsage') || '{"input": 0, "output": 0}');
  } catch (error) {
    console.error('Error getting token usage:', error);
    return { input: 0, output: 0 };
  }
}; 