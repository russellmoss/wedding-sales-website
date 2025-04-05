import { sentimentModel } from './sentimentModel';
import { EMOTION_TYPES } from './emotionTypes';

// Analyze message for emotional content
export const analyzeMessageForEmotion = (message, currentEmotion, currentIntensity, scenario) => {
  if (!message) return { newEmotion: currentEmotion, newIntensity: currentIntensity };

  const messageLower = message.toLowerCase();
  
  // Get detailed emotion analysis using the enhanced model
  const emotionAnalysis = sentimentModel.analyzeEmotions(messageLower);
  
  let newEmotion = emotionAnalysis.primaryEmotion;
  let newIntensity = emotionAnalysis.intensity;
  let isNegativeSpike = false;

  // Check for negative spikes
  if (emotionAnalysis.sentimentScores.negative > 0.7) {
    isNegativeSpike = true;
  }

  // Adjust based on scenario-specific triggers
  if (scenario?.id === 'initial-inquiry') {
    if (messageLower.includes(scenario.clientPersonality?.name?.toLowerCase()?.split(' ')[0])) {
      newEmotion = 'pleased';
      newIntensity = Math.min(currentIntensity + 0.15, 0.9);
    }
  } else if (scenario?.id === 'qualification-call') {
    if (messageLower.includes('budget') || messageLower.includes('cost') || messageLower.includes('price')) {
      if (messageLower.includes('high') || messageLower.includes('expensive') || messageLower.includes('afford')) {
        newEmotion = 'worried';
        newIntensity = 0.7;
        isNegativeSpike = true;
      }
    }
  } else if (scenario?.id === 'venue-tour') {
    if (messageLower.includes('beautiful') || messageLower.includes('amazing') || messageLower.includes('perfect')) {
      newEmotion = 'excited';
      newIntensity = Math.min(currentIntensity + 0.2, 0.95);
    }
  } else if (scenario?.id === 'proposal-presentation') {
    if (messageLower.includes('love') || messageLower.includes('exactly what') || messageLower.includes('perfect')) {
      newEmotion = 'thrilled';
      newIntensity = 0.9;
    } else if (messageLower.includes('expensive') || messageLower.includes('too much') || messageLower.includes('budget')) {
      newEmotion = 'concerned';
      newIntensity = 0.75;
      isNegativeSpike = true;
    }
  }

  // Log emotion analysis
  console.log('Emotion Analysis:', {
    message: messageLower.substring(0, 50) + (messageLower.length > 50 ? '...' : ''),
    sentimentScores: emotionAnalysis.sentimentScores,
    primaryEmotion: emotionAnalysis.primaryEmotion,
    intensity: emotionAnalysis.intensity,
    newEmotion,
    newIntensity,
    scenario: scenario?.id
  });

  return { newEmotion, newIntensity, isNegativeSpike };
};

// Analyze a sequence of messages to detect patterns of frustration
export const analyzeMessageSequence = (messages, scenario) => {
  if (!messages || messages.length === 0) {
    return { 
      frustrationScore: 0, 
      frustrationPattern: null, 
      recommendedAction: null 
    };
  }

  // Only analyze the last 5 messages
  const recentMessages = messages.slice(-5);
  const messageContents = recentMessages.map(msg => 
    typeof msg === 'string' ? msg : msg.content
  );

  let frustrationScore = 0;
  let frustrationPattern = null;
  let recommendedAction = null;

  // Check for frustration escalation patterns
  const escalationPatterns = [
    {
      name: 'increasing negativity',
      check: (msgs) => {
        const negativeCounts = msgs.map(msg => 
          sentimentModel.analyzeEmotions(msg).sentimentScores.negative
        );
        return negativeCounts.every((count, i, arr) => 
          i === 0 || count >= arr[i-1]
        ) && negativeCounts[negativeCounts.length - 1] > 0.6;
      },
      action: 'Acknowledge their growing concerns and address each point specifically'
    },
    {
      name: 'budget concerns escalation',
      check: (msgs) => {
        const budgetMentions = msgs.filter(msg => 
          msg.toLowerCase().includes('budget') || 
          msg.toLowerCase().includes('cost') || 
          msg.toLowerCase().includes('price')
        ).length;
        return budgetMentions >= 3;
      },
      action: 'Discuss flexible payment options or highlight the long-term value'
    },
    {
      name: 'repeated questions',
      check: (msgs) => {
        // Check if the same question is being asked multiple times
        const questionPatterns = msgs
          .filter(msg => msg.includes('?'))
          .map(msg => msg.toLowerCase().replace(/\s+/g, ' ').trim());
        
        // Count occurrences of each question
        const questionCounts = {};
        questionPatterns.forEach(q => {
          questionCounts[q] = (questionCounts[q] || 0) + 1;
        });
        
        // Check if any question appears more than once
        return Object.values(questionCounts).some(count => count > 1);
      },
      action: 'Provide a comprehensive answer addressing all aspects of their repeated question'
    },
    {
      name: 'emotional disengagement',
      check: (msgs) => {
        // Check for decreasing message length and emotional content
        const messageLengths = msgs.map(msg => msg.length);
        const emotionalScores = msgs.map(msg => 
          sentimentModel.analyzeEmotions(msg).intensity
        );
        
        // Check if message length and emotional content are decreasing
        const isLengthDecreasing = messageLengths.every((len, i, arr) => 
          i === 0 || len <= arr[i-1]
        );
        
        const isEmotionDecreasing = emotionalScores.every((score, i, arr) => 
          i === 0 || score <= arr[i-1]
        );
        
        return isLengthDecreasing && isEmotionDecreasing && 
               emotionalScores[emotionalScores.length - 1] < 0.4;
      },
      action: 'Re-engage by asking an open-ended question about their preferences or concerns'
    }
  ];

  // Check for each pattern
  for (const pattern of escalationPatterns) {
    if (pattern.check(messageContents)) {
      frustrationPattern = pattern.name;
      recommendedAction = pattern.action;
      frustrationScore = 0.7;
      break;
    }
  }

  // If no specific pattern detected, calculate a general frustration score
  if (!frustrationPattern) {
    const totalFrustrationScore = messageContents.reduce((score, msg) => 
      score + sentimentModel.analyzeEmotions(msg).sentimentScores.negative, 0
    );
    frustrationScore = Math.min(totalFrustrationScore / messageContents.length, 0.9);
  }

  return { 
    frustrationScore, 
    frustrationPattern, 
    recommendedAction 
  };
}; 