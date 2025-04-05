/**
 * Service for handling Claude API interactions
 * Provides methods for sending messages to Claude and handling responses
 */

import { makeRateLimitedRequest, formatClaudeError, trackTokenUsage } from '../utils/claudeApiUtils';
import { logApiRequest, logApiResponse, logApiError, LOG_LEVELS, setLogLevel } from '../utils/claudeApiLogger';

// Configuration constants
const API_BASE_URL = process.env.REACT_APP_CLAUDE_API_URL || 'https://api.anthropic.com/v1';
const MODEL = process.env.REACT_APP_CLAUDE_MODEL || 'claude-3-opus-20240229';
const MAX_TOKENS = parseInt(process.env.REACT_APP_CLAUDE_MAX_TOKENS || '1000');

// Set initial log level based on environment
setLogLevel(process.env.NODE_ENV === 'development' ? 'DEBUG' : 'INFO');

/**
 * Sends a message to Claude API and returns the response
 * 
 * @param {string} systemPrompt - Instructions for Claude on how to behave
 * @param {Array} messages - Array of message objects with role and content
 * @param {Object} options - Additional options like temperature
 * @returns {Promise<Object>} - Claude's response
 */
export const sendMessageToClaude = async (systemPrompt, messages, options = {}) => {
  const requestType = options.type || 'conversation';
  const startTime = Date.now();
  
  try {
    const apiKey = process.env.REACT_APP_CLAUDE_API_KEY;
    
    if (!apiKey) {
      const error = new Error('Claude API key is not configured');
      logApiError(requestType, error);
      throw error;
    }
    
    // Construct the request body
    const requestBody = {
      model: options.model || MODEL,
      system: systemPrompt,
      messages: messages,
      max_tokens: options.max_tokens || MAX_TOKENS,
      temperature: options.temperature || 0.7,
    };
    
    // Log the request with metadata
    logApiRequest(requestType, {
      url: `${API_BASE_URL}/messages`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '[REDACTED]',
        'anthropic-version': '2023-06-01'
      },
      body: requestBody,
      metadata: {
        messageCount: messages.length,
        systemPromptLength: systemPrompt.length,
        options: {
          ...options,
          model: options.model || MODEL,
          max_tokens: options.max_tokens || MAX_TOKENS,
          temperature: options.temperature || 0.7
        }
      }
    });
    
    // Use the rate-limited request function
    const data = await makeRateLimitedRequest(async () => {
      // Make the API request
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
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
    
    // Calculate request duration
    const duration = Date.now() - startTime;
    
    // Log the response with metadata
    logApiResponse(requestType, {
      ...data,
      metadata: {
        duration,
        tokenUsage: data.usage,
        model: data.model
      }
    });
    
    // Track token usage for monitoring
    trackTokenUsage(data);
    
    return data;
  } catch (error) {
    // Calculate request duration even for errors
    const duration = Date.now() - startTime;
    
    // Log the error with additional context
    logApiError(requestType, {
      ...error,
      metadata: {
        duration,
        requestType,
        systemPromptLength: systemPrompt.length,
        messageCount: messages.length
      }
    });
    
    console.error('Error calling Claude API:', formatClaudeError(error));
    throw error;
  }
};

/**
 * Creates a system prompt for a sales simulator scenario
 * 
 * @param {Object} scenario - The scenario object with context and client information
 * @returns {string} - Formatted system prompt for Claude
 */
export const createScenarioSystemPrompt = (scenario) => {
  // Log the scenario being used
  logApiRequest('scenario', {
    type: 'scenario_prompt',
    scenario: {
      title: scenario.title,
      clientName: scenario.clientPersonality.name,
      traitCount: scenario.clientPersonality.traits.length,
      concernCount: scenario.clientPersonality.concerns.length
    }
  });
  
  return `
You are role-playing as a potential wedding client named ${scenario.clientPersonality.name} who is considering Milea Estate Vineyard as a wedding venue.

# Client Personality
- Name: ${scenario.clientPersonality.name}
- Traits: ${scenario.clientPersonality.traits.join(', ')}
- Concerns: ${scenario.clientPersonality.concerns.join(', ')}

# Scenario Context
${scenario.context}

# Your Role
You should respond as this client would, expressing the personality traits and concerns listed above. Be realistic in your responses - don't be deliberately difficult, but raise appropriate concerns and questions that this type of client would have.

The sales person (user) is practicing their sales techniques. Your job is to provide a realistic client experience so they can practice addressing concerns, answering questions, and guiding the conversation toward a successful outcome.

# Guidelines
1. Stay in character at all times
2. Express your concerns naturally throughout the conversation
3. Respond positively to good sales techniques
4. Don't make things too easy - the salesperson should have to work to address your concerns
5. Keep responses concise (1-3 paragraphs maximum)
6. Don't refer to yourself as an AI or mention that this is a simulation
  `;
};

/**
 * Creates a prompt for evaluating a completed sales conversation
 * 
 * @param {Object} scenario - The scenario object with evaluation criteria
 * @param {Array} chatHistory - The complete conversation history
 * @returns {string} - Evaluation prompt for Claude
 */
export const createEvaluationPrompt = (scenario, chatHistory) => {
  // Log the evaluation request
  logApiRequest('evaluation', {
    type: 'evaluation_prompt',
    scenario: {
      title: scenario.title,
      criteriaCount: Object.keys(scenario.evaluationCriteria).length
    },
    chatHistory: {
      messageCount: chatHistory.length,
      userMessages: chatHistory.filter(msg => msg.type === 'user').length,
      aiMessages: chatHistory.filter(msg => msg.type === 'ai').length
    }
  });
  
  // Format chat history for the prompt
  const formattedChatHistory = chatHistory.map(msg => {
    const role = msg.type === 'user' ? 'Salesperson' : 'Client';
    return `${role}: ${msg.content}`;
  }).join('\n\n');
  
  // List all evaluation criteria
  const criteriaList = Object.entries(scenario.evaluationCriteria)
    .map(([key, criteria]) => `- ${criteria.description} (${criteria.weight} points)`)
    .join('\n');
  
  return `
# Sales Conversation Evaluation

## Scenario: ${scenario.title}
${scenario.description}

## Evaluation Criteria:
${criteriaList}

## Conversation to Evaluate:
${formattedChatHistory}

## Evaluation Instructions
1. Analyze the salesperson's performance based on the criteria above
2. For each criterion, provide:
   - A score out of the available points
   - Specific examples from the conversation that justify the score
   - Constructive feedback for improvement
3. Calculate a total score (percentage)
4. Provide 2-3 specific strengths demonstrated in the conversation
5. Provide 2-3 specific areas for improvement
6. End with a brief summary paragraph of overall performance

Format your response with clear headers and bullet points.
  `;
}; 