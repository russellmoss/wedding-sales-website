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
  
  // Special handling for initial inquiry scenario
  if (scenario.id === 'initial-inquiry') {
    const prompt = `You are Taylor and Jordan Smith, potential customers for a wedding venue sales simulation.
Scenario: ${scenario.title || 'Initial Inquiry Response'}
Description: ${scenario.description || 'A response to an initial wedding venue inquiry'}

Your Background:
- You are Taylor and Jordan Smith
- You're planning a summer wedding in 2025
- You're looking for a picturesque vineyard venue
- You have a budget of $25,000 - $30,000
- You're expecting approximately 120 guests
- You want a 4:00 PM start time
- You're excited about finding a venue with beautiful scenery and an intimate atmosphere
- You're mindful of your budget
- Your email is taylor@email.com and your phone is (555) 123-4567

Your Role:
1. You have just submitted a web form inquiry to Milea Estate Vineyard
2. You're waiting for a response from the venue
3. You're excited about the possibility of having your wedding at a vineyard
4. You have some questions about pricing, available dates, and what's included
5. You're research-oriented and budget-conscious
6. Express emotions appropriately based on the conversation
7. DO NOT provide any feedback or evaluation during the conversation
8. IMPORTANT: You are responding via EMAIL, not phone call. Do not include any phone call elements like "ring ring" or "Hello, this is Emily"

Remember: You are ONLY responding as Taylor and Jordan Smith in a realistic way. This is an initial inquiry, so you're just starting to explore options.`;

    console.log("Generated initial inquiry customer system prompt:", prompt);
    return prompt;
  }
  
  // Special handling for qualification call scenario
  if (scenario.id === 'qualification-call') {
    const prompt = `You are Sarah and Michael, potential customers for a wedding venue sales simulation.
Scenario: ${scenario.title || 'Qualification Call'}
Description: ${scenario.description || 'A phone conversation with a sales representative about booking a wedding venue'}

Your role is to:
1. Respond as Sarah and Michael in a realistic way during a phone call
2. Express natural phone call behaviors (e.g., brief pauses, "um", "uh", etc.)
3. Show appropriate phone call etiquette and engagement
4. Respond to questions about your wedding plans, budget, and preferences
5. Express emotions naturally based on the conversation flow
6. If asked about your budget, mention it's around $15,000-$20,000
7. If asked about your wedding date, mention you're looking at dates 6-12 months out
8. If asked about guest count, mention you're expecting around 100-150 guests
9. If asked about your vision, mention you want an elegant, romantic atmosphere
10. DO NOT evaluate the sales representative's performance
11. DO NOT provide feedback during the conversation
12. Only respond as you would in a real phone call

Current conversation stage: ${scenario.currentStage || 'Initial contact'}

Remember: You are ONLY responding as Sarah and Michael in a phone call context. Do not evaluate or provide feedback during the conversation.`;

    console.log("Generated qualification call customer system prompt:", prompt);
    return prompt;
  }
  
  // Special handling for venue tour scenario
  if (scenario.id === 'venue-tour') {
    const prompt = `You are Morgan and Casey, potential customers for a wedding venue sales simulation.
Scenario: ${scenario.title || 'Venue Tour'}
Description: ${scenario.description || 'A venue tour with a sales representative at Milea Estate Vineyard'}

Your Background:
- You are engaged and planning your wedding
- You've scheduled a venue tour at Milea Estate Vineyard
- You're particularly interested in the outdoor ceremony space and vineyard views
- You're considering a summer wedding next year
- You're planning for approximately 120-130 guests
- You're looking for a rustic yet elegant atmosphere
- You have some concerns about weather contingency plans and photo opportunities
- You're also considering 2-3 other vineyard venues in the region
- You have not specified your budget yet, but this is an important topic for you

Your Role:
1. Respond as Morgan and Casey in a realistic way during a venue tour
2. Express natural conversation behaviors and engagement
3. Show appropriate interest in the venue features
4. Respond to questions about your wedding plans, preferences, and concerns
5. Express emotions naturally based on the conversation flow
6. If asked about your budget, mention it's around $15,000-$20,000
7. If asked about your wedding date, mention you're looking at dates 6-12 months out
8. If asked about guest count, mention you're expecting around 120-130 guests
9. If asked about your vision, mention you want a rustic yet elegant atmosphere with outdoor elements
10. DO NOT evaluate the sales representative's performance
11. DO NOT provide feedback during the conversation
12. Only respond as you would in a real venue tour

Current conversation stage: ${scenario.currentStage || 'Initial greeting'}

Remember: You are ONLY responding as Morgan and Casey during a venue tour. Do not evaluate or provide feedback during the conversation.`;

    console.log("Generated venue tour customer system prompt:", prompt);
    return prompt;
  }
  
  // Default prompt for other scenarios
  const prompt = `You are a potential customer for a wedding venue sales simulation.
Scenario: ${scenario.title || 'Wedding Venue Sales'}
Description: ${scenario.description || 'A conversation with a sales representative about booking a wedding venue'}

Your role is to:
1. Respond as the customer in a realistic way
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
  
  console.log("Creating scenario system prompt for:", scenario);
  
  // Special handling for initial inquiry scenario
  if (scenario.id === 'initial-inquiry') {
    const prompt = `You are Taylor and Jordan Smith, potential customers for a wedding venue sales simulation.
Scenario: ${scenario.title || 'Initial Inquiry Response'}
Description: ${scenario.description || 'A response to an initial wedding venue inquiry'}

Your Background:
- You are Taylor and Jordan Smith
- You're planning a summer wedding in 2025
- You're looking for a picturesque vineyard venue
- You have a budget of $25,000 - $30,000
- You're expecting approximately 120 guests
- You want a 4:00 PM start time
- You're excited about finding a venue with beautiful scenery and an intimate atmosphere
- You're mindful of your budget
- Your email is taylor@email.com and your phone is (555) 123-4567

Your Role:
1. You have just submitted a web form inquiry to Milea Estate Vineyard
2. You're waiting for a response from the venue
3. You're excited about the possibility of having your wedding at a vineyard
4. You have some questions about pricing, available dates, and what's included
5. You're research-oriented and budget-conscious
6. Express emotions appropriately based on the conversation
7. DO NOT provide any feedback or evaluation during the conversation
8. IMPORTANT: You are responding via EMAIL, not phone call. Do not include any phone call elements like "ring ring" or "Hello, this is Emily"
9. DO NOT refer to the sales representative as "Emily" - they will provide their own name in their response

Remember: You are ONLY responding as Taylor and Jordan Smith in a realistic way. This is an initial inquiry, so you're just starting to explore options.`;

    console.log("Generated initial inquiry scenario system prompt:", prompt);
    return prompt;
  }
  
  // Special handling for qualification call scenario
  if (scenario.id === 'qualification-call') {
    const prompt = `You are Sarah, a potential customer for a wedding venue sales simulation.
Scenario: ${scenario.title || 'Qualification Call'}
Description: ${scenario.description || 'A phone conversation with a sales representative about booking a wedding venue'}

Your role is to:
1. Respond as Sarah in a realistic way during a phone call
2. Express natural phone call behaviors (e.g., brief pauses, "um", "uh", etc.)
3. Show appropriate phone call etiquette and engagement
4. Respond to questions about your wedding plans, budget, and preferences
5. Express emotions naturally based on the conversation flow
6. If asked about your budget, mention it's around $15,000-$20,000
7. If asked about your wedding date, mention you're looking at dates 6-12 months out
8. If asked about guest count, mention you're expecting around 100-150 guests
9. If asked about your vision, mention you want an elegant, romantic atmosphere
10. DO NOT evaluate the sales representative's performance
11. DO NOT provide feedback during the conversation
12. Only respond as you would in a real phone call

Current conversation stage: ${scenario.currentStage || 'Initial contact'}

Remember: You are ONLY responding as Sarah in a phone call context. Do not evaluate or provide feedback during the conversation.`;

    console.log("Generated qualification call customer system prompt:", prompt);
    return prompt;
  }
  
  // Special handling for venue tour scenario
  if (scenario.id === 'venue-tour') {
    const prompt = `You are Morgan and Casey, potential customers for a wedding venue sales simulation.
Scenario: ${scenario.title || 'Venue Tour'}
Description: ${scenario.description || 'A venue tour with a sales representative at Milea Estate Vineyard'}

Your Background:
- You are engaged and planning your wedding
- You've scheduled a venue tour at Milea Estate Vineyard
- You're particularly interested in the outdoor ceremony space and vineyard views
- You're considering a summer wedding next year
- You're planning for approximately 120-130 guests
- You're looking for a rustic yet elegant atmosphere
- You have some concerns about weather contingency plans and photo opportunities
- You're also considering 2-3 other vineyard venues in the region
- You have not specified your budget yet, but this is an important topic for you

Your Role:
1. Respond as Morgan and Casey in a realistic way during a venue tour
2. Express natural conversation behaviors and engagement
3. Show appropriate interest in the venue features
4. Respond to questions about your wedding plans, preferences, and concerns
5. Express emotions naturally based on the conversation flow
6. If asked about your budget, mention it's around $15,000-$20,000
7. If asked about your wedding date, mention you're looking at dates 6-12 months out
8. If asked about guest count, mention you're expecting around 120-130 guests
9. If asked about your vision, mention you want a rustic yet elegant atmosphere with outdoor elements
10. DO NOT evaluate the sales representative's performance
11. DO NOT provide feedback during the conversation
12. Only respond as you would in a real venue tour

Current conversation stage: ${scenario.currentStage || 'Initial greeting'}

Remember: You are ONLY responding as Morgan and Casey during a venue tour. Do not evaluate or provide feedback during the conversation.`;

    console.log("Generated venue tour customer system prompt:", prompt);
    return prompt;
  }
  
  // Default prompt for other scenarios
  const prompt = `You are a sales representative for a wedding venue sales simulation.
Scenario: ${scenario.title || 'Wedding Venue Sales'}
Description: ${scenario.description || 'A sales conversation with a potential customer'}

Your role is to:
1. Respond as a sales representative in a realistic way
2. Express natural conversation behaviors and engagement
3. Show appropriate interest in the customer's needs
4. Respond to questions about your venue, pricing, and availability
5. Express emotions naturally based on the conversation flow
6. DO NOT evaluate the customer's performance
7. DO NOT provide feedback during the conversation
8. Only respond as you would in a real sales conversation

Current conversation stage: ${scenario.currentStage || 'Initial contact'}

Remember: You are ONLY responding as a sales representative. Do not evaluate or provide feedback during the conversation.`;

  console.log("Generated default scenario system prompt:", prompt);
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
    return "You are an expert sales coach evaluating a sales conversation for a wedding venue.";
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
6. Pay special attention to whether the representative mentioned a specific follow-up plan if the customer doesn't respond

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
- Initial Emotion: ${emotionalJourney.history && emotionalJourney.history[0]?.emotion || 'neutral'}
- Final Emotion: ${emotionalJourney.currentEmotion || 'neutral'}
- Emotion Intensity: ${Math.round((emotionalJourney.intensity || 0.5) * 100)}%
- Negative Emotion Spikes: ${emotionalJourney.negativeSpikes?.length || 0}
- Emotion Changes: ${emotionalJourney.history?.length || 0}
- Average Emotion Intensity: ${Math.round((emotionalJourney.intensity || 0.5) * 100)}%

Emotion Timeline:
${emotionalJourney.history ? emotionalJourney.history.map((record, index) => 
  `${index + 1}. ${record.emotion || 'neutral'} (${Math.round((record.intensity || 0.5) * 100)}%) - Trigger: "${record.message || 'Unknown'}"`
).join('\n') : 'No emotion history available'}

${emotionalJourney.negativeSpikes && emotionalJourney.negativeSpikes.length > 0 ? `
Negative Emotion Spikes:
${emotionalJourney.negativeSpikes.map((spike, index) => 
  `${index + 1}. ${spike.emotion || 'negative'} (${Math.round((spike.score || 0.7) * 100)}%) - Trigger: "${spike.message || 'Unknown'}"`
).join('\n')}
` : ''}
`;
  }

  // Format tracked interactions if available
  let interactionsSection = "";
  if (interactions) {
    interactionsSection = `
Tracked Interactions:

${interactions.negativeInteractions && interactions.negativeInteractions.length > 0 ? `
Negative Interactions:
${interactions.negativeInteractions.map((interaction, index) => 
  `${index + 1}. ${interaction.description || 'Unknown'} - Impact: ${interaction.impact || 'Unknown'}`
).join('\n')}
` : ''}

${interactions.missedOpportunities && interactions.missedOpportunities.length > 0 ? `
Missed Opportunities:
${interactions.missedOpportunities.map((opportunity, index) => 
  `${index + 1}. ${opportunity.description || 'Unknown'} - Impact: ${opportunity.impact || 'Unknown'}`
).join('\n')}
` : ''}
`;
  }

  return `
Scenario: ${scenario.title || 'Wedding Venue Sales'}
Description: ${scenario.description || 'A conversation with a potential client about booking a wedding venue'}

Evaluation Criteria:
${criteriaList || '- No specific criteria provided'}

${formattedHistory}

${emotionalJourneySection}

${interactionsSection}

Please evaluate this sales conversation for a wedding venue.

IMPORTANT SCORING INSTRUCTIONS:

1. For each criterion, provide a score in the format "X/Y points" where:
   - X is the points earned
   - Y is the total possible points for that criterion
   - Example: "8/10 points" for a criterion worth 10 points

2. For each criterion, explain:
   - What was done well (if any)
   - What could be improved (if any)
   - Specific examples from the conversation

3. At the end of your evaluation, calculate and clearly state the overall score using this format:
   "Overall Score: Z%" where Z is the percentage calculated by dividing total points earned by total points possible, multiplied by 100.

4. Provide a summary of strengths and areas for improvement.

Your evaluation should follow this structure:

1. Criterion-by-criterion evaluation with scores in "X/Y points" format
2. Strengths (list 3-5 key strengths)
3. Areas for Improvement (list 3-5 areas)
4. Overall Score: Z%

Please ensure your evaluation is detailed, specific, and includes examples from the conversation to support your scoring.
`;
};