import { implementAccurateScoring } from './accurateScoring';

/**
 * Generates specific, actionable feedback and improvement suggestions
 * @param {Object} scoringResults - Results from the scoring system
 * @param {Array} messages - The conversation transcript
 * @param {Object} emotionalData - Emotional journey data
 * @returns {Object} - Detailed feedback with specific examples and action items
 */
export function generateActionableFeedback(scoringResults, messages, emotionalData) {
  const feedback = {
    summary: '',
    specificExamples: [],
    actionItems: [],
    conversationHighlights: []
  };
  
  // Helper function to extract customer and sales rep messages
  const customerMessages = messages.filter(msg => msg.type === 'assistant');
  const salesMessages = messages.filter(msg => msg.type === 'user');
  
  // Generate feedback summary based on overall score
  const overallScore = scoringResults.overallScore;
  
  if (overallScore >= 80) {
    feedback.summary = "Excellent performance overall. The conversation demonstrated strong sales techniques while maintaining a warm, professional approach. There are a few opportunities for further refinement.";
  } else if (overallScore >= 60) {
    feedback.summary = "Good performance with several strengths and some clear areas for improvement. Building on existing skills while addressing key gaps will lead to significantly better outcomes.";
  } else {
    feedback.summary = "This conversation revealed important areas that need attention. While there were some positive moments, several fundamental sales techniques were missing or could be significantly improved.";
  }
  
  // Generate specific examples with improvement suggestions
  const lowScoringCriteria = Object.entries(scoringResults.scores)
    .filter(([_, score]) => score < 70)
    .sort((a, b) => a[1] - b[1]);
  
  lowScoringCriteria.forEach(([criterion, score]) => {
    const criterionFeedback = scoringResults.feedback[criterion];
    
    criterionFeedback.areasForImprovement.forEach(improvement => {
      let example = {
        criterion,
        issue: improvement,
        example: '',
        improvement: '',
        impact: ''
      };
      
      switch(criterion) {
        case 'preparation':
          example.example = "The conversation opened with generic questions rather than referencing their inquiry details.";
          example.improvement = "\"Hi Sarah and Michael! I was looking at your inquiry about a June wedding for 120-130 guests. Congratulations on your engagement! I'd love to hear more about your vision.\"";
          example.impact = "Shows you've done your homework and makes clients feel valued from the first interaction.";
          break;
          
        case 'rapport':
          // Find missed opportunities for personal connection
          const personalConnectionMissed = findMissedPersonalConnections(customerMessages, salesMessages);
          
          if (personalConnectionMissed) {
            example.example = `Client shared personal information: "${personalConnectionMissed.clientMessage}"\nSales response: "${personalConnectionMissed.salesResponse}"`;
            example.improvement = `"That's wonderful that you've been together for 5 years! How did you meet? I love hearing couples' stories - it helps me understand what makes your relationship special."`;
            example.impact = "Building personal connections creates trust and makes clients more comfortable sharing their vision and concerns.";
          } else {
            example.example = "The conversation remained transactional without establishing personal rapport.";
            example.improvement = "Ask about their engagement story, how they met, or what inspired their wedding vision.";
            example.impact = "Personal connections make clients feel valued and increase the likelihood of booking.";
          }
          break;
          
        case 'budgetDiscussion':
          // Find when client mentioned budget
          const budgetMessage = customerMessages.find(msg => 
            /budget|cost|price|expensive/i.test(msg.content)
          );
          
          if (budgetMessage) {
            const budgetMsgIndex = customerMessages.indexOf(budgetMessage);
            const salesResponse = salesMessages[budgetMsgIndex] || { content: "No direct response to budget concern" };
            
            example.example = `Client: "${budgetMessage.content.substring(0, 100)}..." \nSales response: "${salesResponse.content.substring(0, 100)}..."`;
            example.improvement = "\"I understand your budget concerns. Many couples feel that way initially. What's most important is that we focus on the elements that matter most to you. We have several approaches that can help balance your dream wedding with your budget - I'd be happy to walk through some options.\"";
            example.impact = "Acknowledges concerns without dismissing them and offers paths forward, building trust and keeping the conversation moving positively.";
          } else {
            example.example = "Budget wasn't discussed despite being a critical factor in wedding planning.";
            example.improvement = "Proactively ask about their budget range and discuss how your packages align with different budget levels.";
            example.impact = "Addressing budget early prevents surprises later and helps set appropriate expectations.";
          }
          break;
          
        case 'objectionHandling':
          // Find objections that weren't properly handled
          const objectionMissed = findMissedObjections(customerMessages, salesMessages);
          
          if (objectionMissed) {
            example.example = `Client objection: "${objectionMissed.clientMessage}"\nSales response: "${objectionMissed.salesResponse}"`;
            example.improvement = `"I understand your concern about [specific objection]. Many couples have felt the same way. Let me address that directly - [specific response that acknowledges and resolves the concern]."`;
            example.impact = "Properly handling objections builds trust and removes barriers to booking.";
          } else {
            example.example = "Objections were either avoided or not fully addressed.";
            example.improvement = "When clients express concerns, acknowledge them directly, validate their feelings, and provide specific information to address the concern.";
            example.impact = "Effective objection handling is crucial for converting interested clients into bookings.";
          }
          break;
          
        case 'closing':
          // Check for missed closing opportunities
          const closingMissed = findMissedClosingOpportunities(customerMessages, salesMessages);
          
          if (closingMissed) {
            example.example = `Client showed interest: "${closingMissed.clientMessage}"\nSales response: "${closingMissed.salesResponse}"`;
            example.improvement = `"Based on what you've shared, I think our [specific package] would be perfect for your vision. Would you like to schedule a tour to see the venue in person? I have availability next Tuesday at 2pm or Thursday at 4pm."`;
            example.impact = "Clear next steps with specific options make it easier for clients to move forward.";
          } else {
            example.example = "No clear closing attempt or next steps were established.";
            example.improvement = "End conversations with a clear next step, such as scheduling a tour, sending a proposal, or setting a follow-up call.";
            example.impact = "Without clear next steps, momentum is lost and clients may not take action.";
          }
          break;
      }
      
      feedback.specificExamples.push(example);
    });
  });
  
  // Generate action items
  const actionItems = [
    {
      title: "Review inquiry details before calls",
      description: "Create a simple pre-call checklist to review all inquiry details and note key points to reference in the conversation.",
      priority: lowScoringCriteria.some(([key, _]) => key === 'preparation') ? "High" : "Medium"
    },
    {
      title: "Create budget discussion framework",
      description: "Develop 3-5 standard responses to budget concerns that acknowledge the concern, offer flexibility, and refocus on value.",
      priority: lowScoringCriteria.some(([key, _]) => key === 'budgetDiscussion') ? "High" : "Medium"
    },
    {
      title: "Practice active listening techniques",
      description: "When clients share information, explicitly acknowledge it before moving on. Try repeating key details to confirm understanding.",
      priority: lowScoringCriteria.some(([key, _]) => key === 'rapport') ? "High" : "Medium"
    },
    {
      title: "Develop rapport-building questions",
      description: "Create a list of 5-7 open-ended, emotionally engaging questions that help couples share their vision and excitement.",
      priority: lowScoringCriteria.some(([key, _]) => key === 'rapport') ? "High" : "Medium"
    },
    {
      title: "Create objection handling templates",
      description: "Prepare responses for common objections like budget concerns, date availability, and venue size limitations.",
      priority: lowScoringCriteria.some(([key, _]) => key === 'objectionHandling') ? "High" : "Medium"
    },
    {
      title: "Develop closing techniques",
      description: "Practice different closing approaches and create templates for setting clear next steps with specific options.",
      priority: lowScoringCriteria.some(([key, _]) => key === 'closing') ? "High" : "Medium"
    }
  ];
  
  // Sort action items by priority
  feedback.actionItems = actionItems
    .sort((a, b) => a.priority === "High" ? -1 : 1);
  
  // Identify conversation highlights (positive and negative moments)
  const emotionalHighlights = [];
  
  // Add positive highlights
  if (emotionalData.emotionalJourney && emotionalData.emotionalJourney.length > 0) {
    const positiveEmotions = emotionalData.emotionalJourney.filter(record => 
      record.emotion === 'excited' || record.emotion === 'interested'
    );
    
    if (positiveEmotions.length > 0) {
      // Find the most positive moment
      const bestPositive = positiveEmotions.reduce((best, current) => 
        current.intensity > best.intensity ? current : best
      );
      
      const messageIndex = emotionalData.emotionalJourney.findIndex(record => 
        record.timestamp === bestPositive.timestamp
      );
      
      if (messageIndex > 0 && messageIndex < salesMessages.length) {
        emotionalHighlights.push({
          type: "positive",
          title: "Effective Engagement",
          clientMessage: customerMessages[messageIndex - 1]?.content.substring(0, 100) + "...",
          salesResponse: salesMessages[messageIndex]?.content.substring(0, 100) + "...",
          impact: "This response successfully increased client excitement and interest."
        });
      }
    }
  }
  
  // Add negative highlights
  if (emotionalData.frustrationAnalysis && emotionalData.frustrationAnalysis.patterns) {
    const frustrationPatterns = emotionalData.frustrationAnalysis.patterns;
    
    if (frustrationPatterns.length > 0) {
      // Find the most significant frustration pattern
      const worstPattern = frustrationPatterns[0]; // Assuming patterns are ordered by severity
      
      // Find the message that triggered this pattern
      const frustrationMessage = findFrustrationTrigger(customerMessages, salesMessages, worstPattern);
      
      if (frustrationMessage) {
        emotionalHighlights.push({
          type: "negative",
          title: "Missed Opportunity",
          clientMessage: frustrationMessage.clientMessage.substring(0, 100) + "...",
          salesResponse: frustrationMessage.salesResponse.substring(0, 100) + "...",
          impact: "This response led to increased client concern or frustration."
        });
      }
    }
  }
  
  feedback.conversationHighlights = emotionalHighlights;
  
  return feedback;
}

/**
 * Find missed opportunities for personal connection
 * @param {Array} customerMessages - Array of customer messages
 * @param {Array} salesMessages - Array of sales rep messages
 * @returns {Object|null} - Missed personal connection details or null
 */
function findMissedPersonalConnections(customerMessages, salesMessages) {
  for (let i = 0; i < customerMessages.length - 1; i++) {
    const clientMsg = customerMessages[i];
    const salesMsg = salesMessages[i + 1] || { content: "" };
    
    // Check for personal information in client message
    const personalInfoPatterns = [
      /together for (\d+) years/i,
      /engaged for (\d+) months/i,
      /met at (.*?)(\.|,|\?|$)/i,
      /first date was (.*?)(\.|,|\?|$)/i,
      /proposed (.*?)(\.|,|\?|$)/i
    ];
    
    for (const pattern of personalInfoPatterns) {
      if (pattern.test(clientMsg.content) && !pattern.test(salesMsg.content)) {
        return {
          clientMessage: clientMsg.content,
          salesResponse: salesMsg.content
        };
      }
    }
  }
  
  return null;
}

/**
 * Find objections that weren't properly handled
 * @param {Array} customerMessages - Array of customer messages
 * @param {Array} salesMessages - Array of sales rep messages
 * @returns {Object|null} - Missed objection details or null
 */
function findMissedObjections(customerMessages, salesMessages) {
  const objectionPatterns = [
    /too expensive/i,
    /out of our budget/i,
    /don't think it's right for us/i,
    /not sure if/i,
    /concerned about/i,
    /worried that/i,
    /don't like/i,
    /prefer/i
  ];
  
  for (let i = 0; i < customerMessages.length - 1; i++) {
    const clientMsg = customerMessages[i];
    const salesMsg = salesMessages[i + 1] || { content: "" };
    
    for (const pattern of objectionPatterns) {
      if (pattern.test(clientMsg.content)) {
        // Check if the sales response acknowledges the objection
        const acknowledgmentPatterns = [
          /understand/i,
          /appreciate/i,
          /hear you/i,
          /concern/i,
          /budget/i,
          /price/i,
          /cost/i
        ];
        
        const hasAcknowledgment = acknowledgmentPatterns.some(p => p.test(salesMsg.content));
        
        if (!hasAcknowledgment) {
          return {
            clientMessage: clientMsg.content,
            salesResponse: salesMsg.content
          };
        }
      }
    }
  }
  
  return null;
}

/**
 * Find missed closing opportunities
 * @param {Array} customerMessages - Array of customer messages
 * @param {Array} salesMessages - Array of sales rep messages
 * @returns {Object|null} - Missed closing opportunity details or null
 */
function findMissedClosingOpportunities(customerMessages, salesMessages) {
  const interestPatterns = [
    /love it/i,
    /sounds perfect/i,
    /really like/i,
    /interested in/i,
    /would like to/i,
    /want to/i,
    /how do we/i,
    /what's next/i,
    /how would we/i
  ];
  
  for (let i = 0; i < customerMessages.length - 1; i++) {
    const clientMsg = customerMessages[i];
    const salesMsg = salesMessages[i + 1] || { content: "" };
    
    for (const pattern of interestPatterns) {
      if (pattern.test(clientMsg.content)) {
        // Check if the sales response includes a clear next step
        const nextStepPatterns = [
          /schedule/i,
          /book/i,
          /tour/i,
          /visit/i,
          /proposal/i,
          /follow up/i,
          /call you/i,
          /email you/i,
          /send you/i,
          /next step/i
        ];
        
        const hasNextStep = nextStepPatterns.some(p => p.test(salesMsg.content));
        
        if (!hasNextStep) {
          return {
            clientMessage: clientMsg.content,
            salesResponse: salesMsg.content
          };
        }
      }
    }
  }
  
  return null;
}

/**
 * Find the message that triggered a frustration pattern
 * @param {Array} customerMessages - Array of customer messages
 * @param {Array} salesMessages - Array of sales rep messages
 * @param {string} pattern - The frustration pattern to look for
 * @returns {Object|null} - Frustration trigger details or null
 */
function findFrustrationTrigger(customerMessages, salesMessages, pattern) {
  // Map patterns to specific triggers
  const patternTriggers = {
    'budget-concerns': /budget|cost|price|expensive/i,
    'repeated-questions': /asked.*before|already.*asked|repeat/i,
    'emotional-disengagement': /not sure|don't know|maybe|perhaps/i,
    'increasing-negativity': /frustrated|annoyed|disappointed|unhappy/i
  };
  
  const trigger = patternTriggers[pattern] || /frustrated|concerned|worried/i;
  
  for (let i = 0; i < customerMessages.length - 1; i++) {
    const clientMsg = customerMessages[i];
    const salesMsg = salesMessages[i + 1] || { content: "" };
    
    if (trigger.test(clientMsg.content)) {
      return {
        clientMessage: clientMsg.content,
        salesResponse: salesMsg.content
      };
    }
  }
  
  return null;
}

/**
 * Analyzes a conversation and generates actionable feedback
 * @param {Array} messages - Array of conversation messages
 * @param {Object} criteria - Evaluation criteria with weights
 * @param {Object} emotionTracker - Emotion tracking instance
 * @returns {Object} - Actionable feedback
 */
export function analyzeConversationForFeedback(messages, criteria, emotionTracker) {
  // Get scoring results
  const scoringResults = implementAccurateScoring(messages, criteria, emotionTracker);
  
  // Get emotional data
  const emotionalData = scoringResults.emotionAnalysis;
  
  // Generate actionable feedback
  return generateActionableFeedback(scoringResults, messages, emotionalData);
} 