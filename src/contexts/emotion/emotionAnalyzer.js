import { sentimentModel } from './sentimentModel';
import { EMOTION_TYPES } from './emotionTypes';

// Analyze message for emotional content
export const analyzeMessageForEmotion = (message, currentEmotion, currentIntensity, scenario) => {
  if (!message) return { newEmotion: currentEmotion, newIntensity: currentIntensity };

  const messageLower = message.toLowerCase();
  let newEmotion = currentEmotion;
  let newIntensity = currentIntensity;
  let isNegativeSpike = false;

  // Get ML-based sentiment analysis
  const sentimentScores = sentimentModel.predict(messageLower);

  // Determine emotion based on sentiment scores
  if (sentimentScores.positive > 0.6) {
    newEmotion = 'excited';
    newIntensity = Math.min(1, sentimentScores.positive);
  } else if (sentimentScores.negative > 0.6) {
    newEmotion = 'concerned';
    newIntensity = Math.min(1, sentimentScores.negative);
    isNegativeSpike = true;
  } else if (sentimentScores.neutral > 0.7) {
    newEmotion = 'neutral';
    newIntensity = 0.5;
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
  }

  // Log emotion analysis
  console.log('Emotion Analysis:', {
    message: messageLower.substring(0, 50) + (messageLower.length > 50 ? '...' : ''),
    sentimentScores,
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
          sentimentModel.predict(msg).negative
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
      score + sentimentModel.predict(msg).negative, 0
    );
    frustrationScore = Math.min(totalFrustrationScore / messageContents.length, 0.9);
  }

  return { 
    frustrationScore, 
    frustrationPattern, 
    recommendedAction 
  };
}; 