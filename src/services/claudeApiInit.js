import { setLogLevel, LOG_LEVELS } from '../utils/claudeApiLogger';

/**
 * Initialize the Claude API service
 * This should be called once during application startup
 */
export const initClaudeApi = () => {
  // Check for required environment variables
  const requiredEnvVars = [
    'REACT_APP_CLAUDE_API_KEY',
    'REACT_APP_CLAUDE_API_URL'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn(`Claude API initialization warning: Missing environment variables: ${missingVars.join(', ')}`);
  }
  
  // Set log level from environment variable
  const configuredLogLevel = process.env.REACT_APP_CLAUDE_LOG_LEVEL || 'INFO';
  if (LOG_LEVELS[configuredLogLevel] !== undefined) {
    setLogLevel(configuredLogLevel);
  } else {
    console.warn(`Claude API initialization warning: Invalid log level: ${configuredLogLevel}, defaulting to INFO`);
    setLogLevel('INFO');
  }
  
  // Log initialization
  console.log('Claude API service initialized with:');
  console.log(`- API URL: ${process.env.REACT_APP_CLAUDE_API_URL || 'https://api.anthropic.com/v1'}`);
  console.log(`- Model: ${process.env.REACT_APP_CLAUDE_MODEL || 'claude-3-opus-20240229'}`);
  console.log(`- Max Tokens: ${process.env.REACT_APP_CLAUDE_MAX_TOKENS || '1000'}`);
  console.log(`- Log Level: ${configuredLogLevel}`);
  
  // Additional initialization tasks could be added here
  
  return {
    isInitialized: true,
    hasApiKey: !!process.env.REACT_APP_CLAUDE_API_KEY,
    model: process.env.REACT_APP_CLAUDE_MODEL || 'claude-3-opus-20240229',
    apiUrl: process.env.REACT_APP_CLAUDE_API_URL || 'https://api.anthropic.com/v1',
    logLevel: configuredLogLevel
  };
};

export default initClaudeApi; 