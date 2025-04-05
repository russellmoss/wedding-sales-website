/**
 * Creates improved prompts for Claude to analyze sales call responses
 * @param {Array} messages - The conversation transcript
 * @param {Object} criteria - The evaluation criteria
 * @param {Object} scenario - The sales scenario (e.g., 'qualification-call', 'venue-tour')
 * @returns {string} - The enhanced analysis prompt
 */
export function generateEnhancedAnalysisPrompt(messages, criteria, scenario = 'qualification-call') {
  // First, extract the conversation in an easy-to-analyze format
  const conversationTranscript = messages.map((msg, index) => {
    const role = msg.type === 'user' ? 'Sales Representative' : 'Client';
    return `[${index + 1}] ${role}: ${msg.content}`;
  }).join('\n\n');
  
  // Create a detailed prompt with specific instructions for each criterion
  const prompt = `
# ${formatScenarioTitle(scenario)} Analysis

## Conversation Transcript
${conversationTranscript}

## Evaluation Criteria
${Object.entries(criteria).map(([key, data]) => 
  `### ${data.description} (${data.weight} points)
- Look for: ${getCriterionLookFor(key)}
- Example of excellence: ${getCriterionExcellenceExample(key)}
- Red flags: ${getCriterionRedFlags(key)}`
).join('\n\n')}

## Analysis Instructions

Please analyze this ${formatScenarioTitle(scenario).toLowerCase()} based on the specific criteria above. For each criterion:

1. Quote specific parts of the conversation that demonstrate the criterion
2. Assign a percentage score (0-100%) based on performance
3. Provide specific, constructive feedback
4. Suggest an alternative response where improvement is needed

The analysis should focus on these aspects:

${generateCriterionInstructions(criteria)}

## Scoring Guidelines
- 90-100%: Exceptional performance with little to no improvement needed
- 75-89%: Strong performance with minor room for improvement
- 60-74%: Satisfactory performance with clear areas for growth
- Below 60%: Significant improvement needed

Provide an overall score as the weighted average of all criteria scores.

## Output Format
Please provide your analysis in this structured format:
1. Overall Assessment (brief summary)
2. Overall Score (weighted percentage)
3. Criteria Analysis (detailed breakdown of each criterion)
4. Top 3 Strengths (with examples)
5. Top 3 Areas for Improvement (with examples and alternative responses)
6. Emotional Journey Analysis (how client emotions evolved during the conversation)
7. Specific Action Items (concrete steps the sales rep can take to improve)
`;

  return prompt;
}

/**
 * Formats the scenario title for display
 * @param {string} scenario - The scenario identifier
 * @returns {string} - Formatted title
 */
function formatScenarioTitle(scenario) {
  const titles = {
    'initial-inquiry': 'Initial Inquiry',
    'qualification-call': 'Qualification Call',
    'venue-tour': 'Venue Tour',
    'proposal-presentation': 'Proposal Presentation',
    'follow-up': 'Follow-up Call'
  };
  
  return titles[scenario] || 'Sales Conversation';
}

/**
 * Gets what to look for in a specific criterion
 * @param {string} criterion - The criterion key
 * @returns {string} - What to look for
 */
function getCriterionLookFor(criterion) {
  const lookFor = {
    'preparation': 'Sales rep behavior that demonstrates thorough preparation and knowledge of client details',
    'rapport': 'Sales rep behavior that builds personal connection and trust',
    'tone': 'Communication style that balances professionalism with warmth',
    'questionQuality': 'Questions that are open-ended, insightful, and prompt detailed responses',
    'budgetDiscussion': 'How budget concerns are addressed and value is communicated',
    'activeListening': 'Acknowledgment of client statements and referencing previous comments',
    'objectionHandling': 'How objections are acknowledged, validated, and addressed',
    'closing': 'Clear next steps and specific options for moving forward',
    'valueProposition': 'Highlighting venue features that specifically match client needs',
    'qualification': 'Gathering key information about client needs, preferences, and timeline'
  };
  
  return lookFor[criterion] || 'Sales rep behavior that demonstrates this skill';
}

/**
 * Gets an example of excellence for a specific criterion
 * @param {string} criterion - The criterion key
 * @returns {string} - Example of excellence
 */
function getCriterionExcellenceExample(criterion) {
  const examples = {
    'preparation': 'Sales rep references specific details from the inquiry: "I saw you mentioned wanting an outdoor ceremony for your June wedding with 120-130 guests."',
    'rapport': 'Sales rep acknowledges personal information and builds on it: "That\'s wonderful that you\'ve been together for 5 years! How did you meet?"',
    'tone': 'Sales rep maintains a warm, professional tone throughout: "I\'m excited to help you find the perfect venue for your special day."',
    'questionQuality': 'Sales rep asks open-ended questions that prompt detailed responses: "What aspects of our venue stood out to you when you were researching?"',
    'budgetDiscussion': 'Sales rep acknowledges budget concerns and offers options: "I understand your budget concerns. Many couples feel that way initially. We have several approaches that can help balance your dream wedding with your budget."',
    'activeListening': 'Sales rep paraphrases and references previous comments: "So you\'re looking for a venue that can accommodate both your ceremony and reception, with a focus on outdoor spaces for the ceremony."',
    'objectionHandling': 'Sales rep acknowledges, validates, and addresses objections: "I understand your concern about the distance. Many couples have felt the same way. Let me address that directly - we offer shuttle services for guests."',
    'closing': 'Sales rep provides clear next steps with specific options: "Based on what you\'ve shared, I think our Premium package would be perfect. Would you like to schedule a tour? I have availability next Tuesday at 2pm or Thursday at 4pm."',
    'valueProposition': 'Sales rep highlights specific features that match client needs: "Our garden would be perfect for your outdoor ceremony, and the flexibility of our spaces would allow you to create the intimate atmosphere you\'re looking for."',
    'qualification': 'Sales rep systematically gathers key information: "What\'s your ideal guest count? Do you have a specific date in mind? What aspects of a venue are most important to you?"'
  };
  
  return examples[criterion] || 'Specific example of what this looks like';
}

/**
 * Gets red flags for a specific criterion
 * @param {string} criterion - The criterion key
 * @returns {string} - Red flags
 */
function getCriterionRedFlags(criterion) {
  const redFlags = {
    'preparation': 'Generic questions that could apply to any client, no reference to inquiry details',
    'rapport': 'Strictly transactional conversation without personal connection',
    'tone': 'Inconsistent tone, too formal or too casual, lack of warmth',
    'questionQuality': 'Closed-ended questions that don\'t prompt detailed responses',
    'budgetDiscussion': 'Avoiding budget concerns, dismissing them, or not offering options',
    'activeListening': 'Not acknowledging client statements, interrupting, or changing topics abruptly',
    'objectionHandling': 'Ignoring objections, becoming defensive, or not providing specific solutions',
    'closing': 'No clear next steps, vague suggestions, or lack of specific options',
    'valueProposition': 'Generic descriptions of venue features without connecting to client needs',
    'qualification': 'Not gathering essential information about client needs, preferences, or timeline'
  };
  
  return redFlags[criterion] || 'Behaviors that indicate problems with this skill';
}

/**
 * Generates detailed instructions for each criterion
 * @param {Object} criteria - The evaluation criteria
 * @returns {string} - Detailed instructions
 */
function generateCriterionInstructions(criteria) {
  const instructions = {
    'preparation': `### Preparation (${criteria.preparation?.weight || 10} points)
Does the sales rep demonstrate knowledge of client's inquiry? Look for references to information previously provided.`,
    
    'rapport': `### Rapport Building (${criteria.rapport?.weight || 20} points)
Does the sales rep build personal connection? Look for acknowledgment of emotions, excitement, personalization.`,
    
    'tone': `### Professional Tone (${criteria.tone?.weight || 15} points)
Is communication consistently warm yet professional? Look for balanced formality and friendliness.`,
    
    'questionQuality': `### Question Quality (${criteria.questionQuality?.weight || 20} points)
Are questions open-ended and insightful? Look for questions that prompt detailed responses.`,
    
    'activeListening': `### Active Listening (${criteria.activeListening?.weight || 15} points)
Does the sales rep acknowledge client's statements? Look for paraphrasing and referencing previous comments.`,
    
    'budgetDiscussion': `### Budget Discussion (${criteria.budgetDiscussion?.weight || 20} points)
How effectively are budget concerns addressed? Look for acknowledgment, offering options, focusing on value.`,
    
    'objectionHandling': `### Objection Handling (${criteria.objectionHandling?.weight || 15} points)
How well does the sales rep handle client concerns? Look for acknowledgment, validation, and specific solutions.`,
    
    'closing': `### Closing (${criteria.closing?.weight || 15} points)
Does the sales rep establish clear next steps? Look for specific options and a sense of forward momentum.`,
    
    'valueProposition': `### Value Proposition (${criteria.valueProposition?.weight || 10} points)
Does the sales rep highlight venue features that match client needs? Look for specificity and relevance.`,
    
    'qualification': `### Qualification (${criteria.qualification?.weight || 20} points)
Does the sales rep gather essential information about client needs, preferences, and timeline? Look for systematic questioning.`
  };
  
  // Generate instructions for each criterion in the criteria object
  return Object.keys(criteria)
    .map(key => instructions[key] || `### ${key} (${criteria[key]?.weight || 10} points)
Look for sales rep behavior that demonstrates this skill.`)
    .join('\n\n');
}

/**
 * Creates a prompt for analyzing emotional patterns in a conversation
 * @param {Array} messages - The conversation transcript
 * @returns {string} - The emotional analysis prompt
 */
export function generateEmotionalAnalysisPrompt(messages) {
  // Extract the conversation in an easy-to-analyze format
  const conversationTranscript = messages.map((msg, index) => {
    const role = msg.type === 'user' ? 'Sales Representative' : 'Client';
    return `[${index + 1}] ${role}: ${msg.content}`;
  }).join('\n\n');
  
  return `
# Emotional Journey Analysis

## Conversation Transcript
${conversationTranscript}

## Analysis Instructions

Please analyze the emotional journey of the client throughout this conversation. Focus on:

1. Initial emotional state of the client
2. Key emotional shifts (positive and negative)
3. Triggers for emotional changes
4. How the sales rep responded to emotional cues
5. Overall emotional progression

## Emotional Categories to Consider
- Excited/Enthusiastic
- Interested/Engaged
- Concerned/Worried
- Frustrated/Annoyed
- Neutral/Reserved
- Satisfied/Pleased
- Disappointed/Unhappy

## Output Format
Please provide your analysis in this structured format:
1. Initial Emotional State (with evidence)
2. Emotional Journey (chronological progression with specific examples)
3. Key Emotional Shifts (what triggered them and how the sales rep responded)
4. Emotional Management Assessment (how well the sales rep managed client emotions)
5. Recommendations for Emotional Management (specific suggestions for improvement)
`;
}

/**
 * Creates a prompt for generating specific improvement suggestions
 * @param {Array} messages - The conversation transcript
 * @param {Object} analysisResults - Results from the initial analysis
 * @returns {string} - The improvement suggestions prompt
 */
export function generateImprovementSuggestionsPrompt(messages, analysisResults) {
  // Extract the conversation in an easy-to-analyze format
  const conversationTranscript = messages.map((msg, index) => {
    const role = msg.type === 'user' ? 'Sales Representative' : 'Client';
    return `[${index + 1}] ${role}: ${msg.content}`;
  }).join('\n\n');
  
  // Extract areas for improvement from analysis results
  const areasForImprovement = analysisResults.areasForImprovement || [];
  
  return `
# Improvement Suggestions

## Conversation Transcript
${conversationTranscript}

## Areas for Improvement
${areasForImprovement.map(area => `- ${area}`).join('\n')}

## Analysis Instructions

Please provide specific, actionable improvement suggestions for each area identified. For each area:

1. Identify the specific moment in the conversation where improvement is needed
2. Explain why the current approach was ineffective
3. Provide an alternative response with exact wording
4. Explain the expected impact of the improved approach

## Output Format
Please provide your suggestions in this structured format:
1. Area for Improvement: [Name]
   - Conversation Moment: [Quote the relevant part]
   - Issue: [Explain why it was ineffective]
   - Alternative Response: [Provide exact wording]
   - Expected Impact: [Explain the benefit]

2. [Repeat for each area]

## Additional Considerations
- Focus on specific, actionable improvements
- Provide exact wording for alternative responses
- Explain the reasoning behind each suggestion
- Consider the emotional impact of each improvement
`;
}

/**
 * Creates a comprehensive analysis prompt that combines all aspects
 * @param {Array} messages - The conversation transcript
 * @param {Object} criteria - The evaluation criteria
 * @param {Object} scenario - The sales scenario
 * @returns {Object} - Object containing multiple prompts
 */
export function generateComprehensiveAnalysisPrompts(messages, criteria, scenario = 'qualification-call') {
  return {
    mainAnalysis: generateEnhancedAnalysisPrompt(messages, criteria, scenario),
    emotionalAnalysis: generateEmotionalAnalysisPrompt(messages),
    // We'll generate the improvement suggestions after we have the analysis results
    // This would be called after the initial analysis is complete
    // improvementSuggestions: generateImprovementSuggestionsPrompt(messages, analysisResults)
  };
} 