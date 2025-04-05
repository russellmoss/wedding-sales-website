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
 * Create a system prompt for a sales scenario (customer role)
 * @param {Object} scenario - The scenario object
 * @returns {string} - The formatted system prompt
 */
export const createCustomerSystemPrompt = (scenario) => {
  if (!scenario) {
    console.error("createCustomerSystemPrompt called with null or undefined scenario");
    return "You are a potential customer for a wedding venue.";
  }
  
  console.log("Creating customer system prompt for scenario:", scenario);
  
  const prompt = `You are a potential customer for a wedding venue sales simulation.
Scenario: ${scenario.title || 'Wedding Venue Sales'}
Description: ${scenario.description || 'A conversation with a sales representative about booking a wedding venue'}

Your role is to:
1. Respond as the customer (Sarah and Michael) in a realistic way
2. DO NOT evaluate the sales representative's performance
3. DO NOT provide feedback during the conversation
4. Only respond as the customer would, based on the scenario and previous messages
5. Express emotions naturally based on the conversation flow

Current conversation stage: ${scenario.currentStage || 'Initial contact'}

Remember: You are ONLY responding as the customer. Do not evaluate or provide feedback during the conversation.`;

  console.log("Generated customer system prompt:", prompt);
  return prompt;
};

/**
 * Create a system prompt for a sales scenario
 * @param {Object} scenario - The scenario object
 * @returns {string} - The formatted system prompt
 */
export const createScenarioSystemPrompt = (scenario) => {
  if (!scenario) {
    console.error("createScenarioSystemPrompt called with null or undefined scenario");
    return "You are a sales representative for a wedding venue.";
  }
  
  console.log("Creating scenario system prompt for scenario:", scenario);
  
  const prompt = `You are a sales representative for a wedding venue sales simulation.
Scenario: ${scenario.title || 'Wedding Venue Sales'}
Description: ${scenario.description || 'A conversation with a potential client about booking a wedding venue'}

Your role is to:
1. Respond as the sales representative in a realistic way
2. Follow best practices for sales conversations
3. Build rapport with the customer
4. Address the customer's needs and concerns
5. Guide the conversation toward a successful sale

Current conversation stage: ${scenario.currentStage || 'Initial contact'}

Remember: You are ONLY responding as the sales representative. Do not evaluate or provide feedback during the conversation.`;

  console.log("Generated scenario system prompt:", prompt);
  return prompt;
};

/**
 * Create a system prompt for evaluating a sales conversation
 * @param {Object} scenario - The scenario object
 * @returns {string} - The formatted system prompt
 */
export const createEvaluatorSystemPrompt = (scenario) => {
  if (!scenario) {
    console.error("createEvaluatorSystemPrompt called with null or undefined scenario");
    return "You are an expert sales coach evaluating a sales conversation.";
  }
  
  console.log("Creating evaluator system prompt for scenario:", scenario);
  
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

  const prompt = `You are an expert sales coach evaluating a sales conversation for a wedding venue.

Scenario: ${scenario.title || 'Wedding Venue Sales'}
Description: ${scenario.description || 'A conversation with a potential client about booking a wedding venue'}

Evaluation Criteria:
${criteriaList || '- No specific criteria provided'}

Your role is to:
1. Evaluate the sales representative's performance based on the conversation
2. Provide detailed, constructive feedback
3. Consider the customer's emotional journey throughout the conversation
4. Identify specific moments where the representative excelled or missed opportunities
5. Suggest improvements for future interactions

Remember: You are ONLY evaluating the conversation. Do not respond as the customer.`;

  console.log("Generated evaluator system prompt:", prompt);
  return prompt;
};

/**
 * Create a prompt for evaluating a sales conversation
 * @param {Object} scenario - The scenario object
 * @param {Array} chatHistory - The conversation history
 * @param {Object} emotionalJourney - The emotional journey data
 * @param {Object} interactions - The tracked interactions data
 * @param {Object} goldStandardComparison - The gold standard comparison data
 * @returns {string} - The evaluation prompt
 */
export const createEvaluationPrompt = (scenario, chatHistory, emotionalJourney, interactions, goldStandardComparison) => {
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

  // Format emotional journey data if available
  let emotionalJourneySection = "";
  if (emotionalJourney) {
    emotionalJourneySection = `
Customer Emotional Journey:
- Initial Emotion: ${emotionalJourney.history[0]?.emotion || 'neutral'}
- Final Emotion: ${emotionalJourney.currentEmotion}
- Emotion Intensity: ${Math.round(emotionalJourney.intensity * 100)}%
- Negative Emotion Spikes: ${emotionalJourney.negativeSpikeCount}
- Emotion Changes: ${emotionalJourney.emotionChanges}
- Average Emotion Intensity: ${Math.round(emotionalJourney.averageIntensity * 100)}%

Emotion Timeline:
${emotionalJourney.history.map((record, index) => 
  `${index + 1}. ${record.emotion} (${Math.round(record.intensity * 100)}%) - Trigger: "${record.trigger}"`
).join('\n')}

${emotionalJourney.negativeSpikes.length > 0 ? `
Negative Emotion Spikes:
${emotionalJourney.negativeSpikes.map((spike, index) => 
  `${index + 1}. ${spike.emotion} (${Math.round(spike.intensity * 100)}%) - Trigger: "${spike.trigger}"`
).join('\n')}
` : ''}
`;
  }

  // Format tracked interactions if available
  let interactionsSection = "";
  if (interactions) {
    interactionsSection = `
Tracked Interactions:

${interactions.negativeInteractions.length > 0 ? `
Negative Interactions:
${interactions.negativeInteractions.map((interaction, index) => 
  `${index + 1}. ${interaction.description} - Impact: ${interaction.impact}`
).join('\n')}
` : ''}

${interactions.missedOpportunities.length > 0 ? `
Missed Opportunities:
${interactions.missedOpportunities.map((opportunity, index) => 
  `${index + 1}. ${opportunity.description} - Impact: ${opportunity.impact}`
).join('\n')}
` : ''}

${interactions.rapportBuilding.length > 0 ? `
Rapport Building Moments:
${interactions.rapportBuilding.map((moment, index) => 
  `${index + 1}. ${moment.description} - Impact: ${moment.impact}`
).join('\n')}
` : ''}

${interactions.closingAttempts.length > 0 ? `
Closing Attempts:
${interactions.closingAttempts.map((attempt, index) => 
  `${index + 1}. ${attempt.description} - Effectiveness: ${attempt.effectiveness}`
).join('\n')}
` : ''}
`;
  }

  // Format gold standard comparison if available
  let goldStandardSection = "";
  if (goldStandardComparison) {
    goldStandardSection = `
Gold Standard Comparison:
- Overall Score: ${goldStandardComparison.score}%
- Feedback: ${goldStandardComparison.feedback}

Deviations from Best Practices:
${goldStandardComparison.deviations.map((deviation, index) => 
  `${index + 1}. ${deviation.description} - Impact: ${deviation.impact}`
).join('\n')}
`;
  }

  const prompt = `You are an expert sales coach evaluating a sales conversation for a wedding venue.

Scenario: ${scenario.title || 'Wedding Venue Sales'}
Description: ${scenario.description || 'A conversation with a potential client about booking a wedding venue'}

Evaluation Criteria:
${criteriaList || '- No specific criteria provided'}

Conversation History:
${formattedHistory}
${emotionalJourneySection}
${interactionsSection}
${goldStandardSection}

IMPORTANT: Apply the following penalties:
- Subtract 15-25 points for any instance of the sales rep being abrupt or dismissive
- Subtract 10-20 points for failing to address the customer's emotional needs
- Subtract 15-25 points for pushing a sale without building rapport
- Subtract 10-15 points for each negative emotion spike in the customer's journey
- Subtract 5-10 points for each missed opportunity to build rapport
- Subtract 5-10 points for each missed opportunity to address pricing concerns
- Subtract 10-15 points for attempting to close without addressing objections
- Subtract 5-10 points for each deviation from gold standard best practices

FOLLOW THIS EVALUATION PROCESS:
1. FIRST, identify all issues and problems in the conversation
2. THEN, identify strengths and positive aspects
3. NEXT, calculate the score based on the number and severity of issues found
4. FINALLY, provide specific suggestions for improvement

This "Feedback First" approach ensures that serious flaws are properly accounted for in the final score, preventing the halo effect where a generally "good" conversation gets a high score despite significant issues.

Please provide a detailed evaluation of the sales representative's performance:
1. List all issues and problems identified in the conversation
2. List all strengths and positive aspects
3. A numerical score from 0-100 based on the evaluation criteria, emotional journey, tracked interactions, and gold standard comparison
4. Specific feedback on areas for improvement
5. Suggestions for better responses
6. Analysis of how well the representative managed the customer's emotional state
7. Analysis of specific negative interactions and missed opportunities
8. Detailed breakdown of any penalties applied
9. Comparison with gold standard responses and identification of key deviations

Format your response as:
Issues: [list of issues]
Strengths: [list of strengths]
Score: [number]%
Feedback: [detailed feedback]`;

  console.log("Generated evaluation prompt:", prompt);
  return prompt;
}; 