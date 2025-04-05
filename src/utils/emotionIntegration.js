import EmotionTracker from './EmotionTracker';
import { sentimentModel } from '../contexts/emotion/sentimentModel';

/**
 * Integrates the EmotionTracker with the existing EmotionContext
 * @param {Array} messages - The conversation transcript
 * @param {Object} scenario - The current scenario
 * @returns {Object} - Combined emotion analysis results
 */
export function analyzeConversationEmotions(messages, scenario) {
  // Create a new EmotionTracker instance
  const emotionTracker = new EmotionTracker();
  
  // Process each message
  messages.forEach(message => {
    const sender = message.type === 'user' ? 'sales' : 'client';
    const content = typeof message === 'string' ? message : message.content;
    
    // Analyze message with EmotionTracker
    emotionTracker.analyzeMessage(content, sender);
  });
  
  // Get emotional journey from EmotionTracker
  const emotionalJourney = emotionTracker.getEmotionalJourney();
  
  // Get detailed emotion analysis for each message
  const detailedAnalysis = messages.map(message => {
    const content = typeof message === 'string' ? message : message.content;
    const sender = message.type === 'user' ? 'sales' : 'client';
    
    if (sender === 'client') {
      return {
        message: content,
        analysis: sentimentModel.analyzeEmotions(content),
        emotionTracker: emotionTracker.analyzeMessage(content, sender)
      };
    }
    
    return {
      message: content,
      sender
    };
  });
  
  // Analyze frustration patterns
  const clientMessages = messages
    .filter(message => message.type !== 'user')
    .map(message => typeof message === 'string' ? message : message.content);
  
  const frustrationAnalysis = analyzeFrustrationPatterns(clientMessages);
  
  // Generate comprehensive feedback
  const feedback = generateComprehensiveFeedback(
    emotionalJourney,
    detailedAnalysis,
    frustrationAnalysis,
    scenario
  );
  
  return {
    emotionalJourney,
    detailedAnalysis,
    frustrationAnalysis,
    feedback,
    emotionStats: emotionalJourney.stats
  };
}

/**
 * Analyzes frustration patterns in client messages
 * @param {Array} messages - Client messages
 * @returns {Object} - Frustration analysis
 */
function analyzeFrustrationPatterns(messages) {
  if (!messages || messages.length === 0) {
    return {
      frustrationScore: 0,
      patterns: [],
      recommendations: []
    };
  }
  
  // Only analyze the last 5 messages
  const recentMessages = messages.slice(-5);
  
  const patterns = [];
  const recommendations = [];
  let frustrationScore = 0;
  
  // Check for budget concerns escalation
  const budgetMentions = recentMessages.filter(msg => 
    msg.toLowerCase().includes('budget') || 
    msg.toLowerCase().includes('cost') || 
    msg.toLowerCase().includes('price')
  ).length;
  
  if (budgetMentions >= 3) {
    patterns.push('Budget concerns escalation');
    recommendations.push('Discuss flexible payment options or highlight the long-term value');
    frustrationScore += 0.3;
  }
  
  // Check for repeated questions
  const questionPatterns = recentMessages
    .filter(msg => msg.includes('?'))
    .map(msg => msg.toLowerCase().replace(/\s+/g, ' ').trim());
  
  const questionCounts = {};
  questionPatterns.forEach(q => {
    questionCounts[q] = (questionCounts[q] || 0) + 1;
  });
  
  if (Object.values(questionCounts).some(count => count > 1)) {
    patterns.push('Repeated questions');
    recommendations.push('Provide a comprehensive answer addressing all aspects of their repeated question');
    frustrationScore += 0.2;
  }
  
  // Check for emotional disengagement
  const messageLengths = recentMessages.map(msg => msg.length);
  const emotionalScores = recentMessages.map(msg => 
    sentimentModel.analyzeEmotions(msg).intensity
  );
  
  const isLengthDecreasing = messageLengths.every((len, i, arr) => 
    i === 0 || len <= arr[i-1]
  );
  
  const isEmotionDecreasing = emotionalScores.every((score, i, arr) => 
    i === 0 || score <= arr[i-1]
  );
  
  if (isLengthDecreasing && isEmotionDecreasing && 
      emotionalScores[emotionalScores.length - 1] < 0.4) {
    patterns.push('Emotional disengagement');
    recommendations.push('Re-engage by asking an open-ended question about their preferences or concerns');
    frustrationScore += 0.3;
  }
  
  // Check for increasing negativity
  const negativeCounts = recentMessages.map(msg => 
    sentimentModel.analyzeEmotions(msg).sentimentScores.negative
  );
  
  if (negativeCounts.every((count, i, arr) => 
    i === 0 || count >= arr[i-1]
  ) && negativeCounts[negativeCounts.length - 1] > 0.6) {
    patterns.push('Increasing negativity');
    recommendations.push('Acknowledge their growing concerns and address each point specifically');
    frustrationScore += 0.4;
  }
  
  return {
    frustrationScore: Math.min(frustrationScore, 1),
    patterns,
    recommendations
  };
}

/**
 * Generates comprehensive feedback based on emotion analysis
 * @param {Object} emotionalJourney - The emotional journey data
 * @param {Array} detailedAnalysis - Detailed analysis of each message
 * @param {Object} frustrationAnalysis - Frustration analysis
 * @param {Object} scenario - The current scenario
 * @returns {Object} - Comprehensive feedback
 */
function generateComprehensiveFeedback(
  emotionalJourney,
  detailedAnalysis,
  frustrationAnalysis,
  scenario
) {
  const feedback = {
    strengths: [...emotionalJourney.feedback.strengths],
    areasForImprovement: [...emotionalJourney.feedback.areasForImprovement],
    recommendations: [...emotionalJourney.feedback.recommendations],
    rapportAssessment: '',
    emotionManagement: '',
    specificImprovements: []
  };
  
  // Add frustration-related feedback
  if (frustrationAnalysis.frustrationScore > 0.5) {
    feedback.areasForImprovement.push(`Client showed signs of frustration (score: ${Math.round(frustrationAnalysis.frustrationScore * 100)}%)`);
    
    frustrationAnalysis.recommendations.forEach(rec => {
      if (!feedback.recommendations.includes(rec)) {
        feedback.recommendations.push(rec);
      }
    });
  }
  
  // Assess rapport building
  const positiveEmotions = detailedAnalysis.filter(analysis => 
    analysis.emotionTracker && 
    ['excited', 'interested'].includes(analysis.emotionTracker.emotion)
  ).length;
  
  const totalClientMessages = detailedAnalysis.filter(analysis => 
    analysis.emotionTracker
  ).length;
  
  const positiveEmotionRatio = totalClientMessages > 0 ? 
    positiveEmotions / totalClientMessages : 0;
  
  if (positiveEmotionRatio > 0.7) {
    feedback.rapportAssessment = 'Excellent rapport building. Client showed predominantly positive emotions throughout the conversation.';
    feedback.strengths.push('Strong rapport building skills');
  } else if (positiveEmotionRatio > 0.5) {
    feedback.rapportAssessment = 'Good rapport building. Client showed a mix of positive and neutral emotions.';
  } else {
    feedback.rapportAssessment = 'Rapport building needs improvement. Client showed limited positive emotions.';
    feedback.areasForImprovement.push('Improve rapport building techniques');
    feedback.recommendations.push('Focus on connecting with the client on a personal level and showing genuine interest in their needs');
  }
  
  // Assess emotion management
  const negativeSpikes = emotionalJourney.negativeSpikes.length;
  
  if (negativeSpikes === 0) {
    feedback.emotionManagement = 'Excellent emotion management. No significant negative emotion spikes detected.';
    feedback.strengths.push('Strong emotion management skills');
  } else if (negativeSpikes <= 2) {
    feedback.emotionManagement = 'Good emotion management. Limited negative emotion spikes were detected and addressed.';
  } else {
    feedback.emotionManagement = 'Emotion management needs improvement. Multiple negative emotion spikes were detected.';
    feedback.areasForImprovement.push('Improve emotion management techniques');
    feedback.recommendations.push('Develop better strategies for addressing client concerns before they escalate into negative emotions');
  }
  
  // Generate scenario-specific improvements
  if (scenario) {
    if (scenario.id === 'initial-inquiry') {
      feedback.specificImprovements.push('Focus on building initial rapport by acknowledging their inquiry details');
    } else if (scenario.id === 'qualification-call') {
      feedback.specificImprovements.push('Address budget concerns proactively and provide clear value propositions');
    } else if (scenario.id === 'venue-tour') {
      feedback.specificImprovements.push('Highlight venue features that match their preferences and build excitement');
    } else if (scenario.id === 'proposal-presentation') {
      feedback.specificImprovements.push('Ensure the proposal aligns with their budget expectations and addresses all concerns');
    }
  }
  
  return feedback;
} 