/**
 * Service for handling Claude API interactions
 * Provides methods for sending messages to Claude and handling responses
 */

import { logApiRequest, logApiResponse, logApiError } from '../utils/claudeApiLogger';
import { makeRateLimitedRequest, formatClaudeError, trackTokenUsage } from '../utils/claudeApiUtils';

// Update the API_BASE_URL to point to your proxy server
const API_BASE_URL = 'http://localhost:3001/api/claude';

// Default model and token settings
const MODEL = process.env.REACT_APP_CLAUDE_MODEL || 'claude-3-opus-20240229';
const MAX_TOKENS = parseInt(process.env.REACT_APP_CLAUDE_MAX_TOKENS || '1000', 10);

/**
 * Send a message to Claude API through our proxy server
 * @param {string} systemPrompt - The system prompt to set context
 * @param {Array} messages - Array of message objects with role and content
 * @param {Object} options - Additional options for the API call
 * @returns {Promise<Object>} - The API response
 */
export const sendMessageToClaude = async (systemPrompt, messages, options = {}) => {
  try {
    // Construct the request body
    const requestBody = {
      model: options.model || MODEL,
      system: systemPrompt,
      messages: messages,
      max_tokens: options.max_tokens || MAX_TOKENS,
      temperature: options.temperature || 0.7,
    };
    
    // Log the request
    logApiRequest(options.requestType || 'conversation', requestBody);
    
    // Use the rate-limited request function
    const data = await makeRateLimitedRequest(async () => {
      // Make the API request to our proxy server
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // No need to include the API key as it's handled by the proxy server
        },
        body: JSON.stringify(requestBody)
      });
      
      // Handle API errors
      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(`Claude API error: ${errorData.error?.message || response.statusText}`);
        error.response = { status: response.status, data: errorData };
        throw error;
      }
      
      // Parse and return the response
      return await response.json();
    });
    
    // Track token usage for monitoring
    trackTokenUsage(data);
    
    // Log the successful response
    logApiResponse(options.requestType || 'conversation', data);
    
    // Ensure the response has the expected structure
    if (!data || (!data.content && !data.message && !data.choices)) {
      console.error("Unexpected Claude API response structure:", data);
      // Create a fallback response structure
      return {
        content: [
          {
            type: 'text',
            text: "I'm having trouble understanding. Could you please rephrase that?"
          }
        ]
      };
    }
    
    return data;
  } catch (error) {
    // Format the error message
    const formattedError = formatClaudeError(error);
    
    // Log the error
    logApiError(options.requestType || 'conversation', error);
    
    console.error('Error calling Claude API:', formattedError);
    throw error;
  }
};

/**
 * Create a system prompt for a sales scenario
 * @param {Object} scenario - The scenario object
 * @returns {string} - The formatted system prompt
 */
export const createScenarioSystemPrompt = (scenario) => {
  if (!scenario) {
    console.error("createScenarioSystemPrompt called with null or undefined scenario");
    return "You are an AI sales trainer evaluating a sales conversation for a wedding venue.";
  }
  
  console.log("Creating system prompt for scenario:", scenario);
  
  // Format evaluation criteria from object to string
  let criteriaList = "";
  
  if (scenario.evaluationCriteria) {
    if (Array.isArray(scenario.evaluationCriteria)) {
      // Handle array format
      criteriaList = scenario.evaluationCriteria
        .map(criteria => `- ${criteria.description} (${criteria.weight} points)`)
        .join('\n');
    } else if (typeof scenario.evaluationCriteria === 'object') {
      // Handle object format
      criteriaList = Object.entries(scenario.evaluationCriteria)
        .map(([key, criteria]) => `- ${criteria.description} (${criteria.weight} points)`)
        .join('\n');
    }
  }

  const prompt = `You are an AI sales trainer for a wedding venue sales simulation.
Scenario: ${scenario.title || 'Wedding Venue Sales'}
Description: ${scenario.description || 'A conversation with a potential client about booking a wedding venue'}

Your role is to:
1. Respond as the customer (Sarah and Michael) in a realistic way
2. DO NOT evaluate the sales representative's performance during the conversation
3. DO NOT provide feedback during the conversation
4. Only respond as the customer would, based on the scenario and previous messages

Evaluation Criteria (for later use, not during conversation):
${criteriaList || '- No specific criteria provided'}

Current conversation stage: ${scenario.currentStage || 'Initial contact'}

Remember: You are ONLY responding as the customer. Do not evaluate or provide feedback during the conversation.`;

  console.log("Generated system prompt:", prompt);
  return prompt;
};

/**
 * Create a prompt for evaluating a sales conversation
 * @param {Object} scenario - The scenario object
 * @param {Array} chatHistory - The conversation history
 * @returns {string} - The evaluation prompt
 */
export const createEvaluationPrompt = (scenario, chatHistory) => {
  if (!scenario) {
    console.error("createEvaluationPrompt called with null or undefined scenario");
    return "Please evaluate this sales conversation for a wedding venue.";
  }
  
  console.log("Creating evaluation prompt for scenario:", scenario);
  
  // Format evaluation criteria from object to string
  let criteriaList = "";
  
  if (scenario.evaluationCriteria) {
    if (Array.isArray(scenario.evaluationCriteria)) {
      // Handle array format
      criteriaList = scenario.evaluationCriteria
        .map(criteria => `- ${criteria.description} (${criteria.weight} points)`)
        .join('\n');
    } else if (typeof scenario.evaluationCriteria === 'object') {
      // Handle object format
      criteriaList = Object.entries(scenario.evaluationCriteria)
        .map(([key, criteria]) => `- ${criteria.description} (${criteria.weight} points)`)
        .join('\n');
    }
  }

  // Format the chat history properly
  const formattedHistory = chatHistory.map((msg, index) => {
    const role = msg.type === 'user' ? 'Sales Representative' : 'Customer (Sarah & Michael)';
    return `${role}: ${msg.content}`;
  }).join('\n\n');

  const prompt = `You are an expert sales coach evaluating a sales conversation for a wedding venue.

Scenario: ${scenario.title || 'Wedding Venue Sales'}
Description: ${scenario.description || 'A conversation with a potential client about booking a wedding venue'}

Evaluation Criteria:
${criteriaList || '- No specific criteria provided'}

Conversation History:
${formattedHistory}

Please provide a detailed evaluation of the sales representative's performance:
1. A numerical score from 0-100 based on the evaluation criteria
2. Specific feedback on strengths and areas for improvement
3. Suggestions for better responses

Format your response as:
Score: [number]%
Feedback: [detailed feedback]`;

  console.log("Generated evaluation prompt:", prompt);
  return prompt;
}; 