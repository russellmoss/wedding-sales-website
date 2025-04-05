import React, { createContext, useContext, useState, useEffect } from 'react';

const EmotionContext = createContext();

export function useEmotion() {
  return useContext(EmotionContext);
}

export function EmotionProvider({ children }) {
  const [emotionalState, setEmotionalState] = useState({
    currentEmotion: 'neutral',
    intensity: 0.5,
    history: [],
    negativeSpikes: []
  });

  // Initialize emotion tracking for a new scenario
  const initializeEmotionTracking = (scenario) => {
    if (!scenario) return;
    
    // Set initial emotion based on scenario
    let initialEmotion = 'neutral';
    let initialIntensity = 0.5;
    
    // Adjust based on scenario type
    if (scenario.id === 'initial-inquiry') {
      initialEmotion = 'curious';
      initialIntensity = 0.6;
    } else if (scenario.id === 'qualification-call') {
      initialEmotion = 'interested';
      initialIntensity = 0.7;
    } else if (scenario.id === 'venue-tour') {
      initialEmotion = 'excited';
      initialIntensity = 0.8;
    } else if (scenario.id === 'proposal-presentation') {
      initialEmotion = 'hopeful';
      initialIntensity = 0.75;
    }
    
    setEmotionalState({
      currentEmotion: initialEmotion,
      intensity: initialIntensity,
      history: [{
        emotion: initialEmotion,
        intensity: initialIntensity,
        timestamp: new Date().toISOString(),
        trigger: 'Scenario initialization'
      }],
      negativeSpikes: []
    });
    
    console.log(`EmotionContext: Initialized emotion tracking for ${scenario.id} with ${initialEmotion} (${initialIntensity})`);
  };

  // Update emotion based on user message
  const updateEmotion = (message, scenario) => {
    if (!message || !scenario) return;
    
    // Handle both string and object inputs for message
    const messageContent = typeof message === 'string' ? message : message.content;
    
    // Analyze message for emotional triggers
    const { newEmotion, newIntensity, isNegativeSpike } = analyzeMessageForEmotion(
      messageContent, 
      emotionalState.currentEmotion,
      emotionalState.intensity,
      scenario
    );
    
    // Analyze message sequence for frustration patterns
    const { frustrationScore, frustrationPattern, recommendedAction } = analyzeMessageSequence(
      [...emotionalState.history.map(record => record.trigger), messageContent],
      scenario
    );
    
    // Adjust emotion and intensity based on frustration analysis if needed
    let adjustedEmotion = newEmotion;
    let adjustedIntensity = newIntensity;
    
    if (frustrationScore > 0.6 && !isNegativeSpike) {
      // If high frustration detected but not already marked as a spike,
      // adjust the emotion to reflect this
      adjustedEmotion = 'frustrated';
      adjustedIntensity = Math.max(newIntensity, 0.7);
      
      // Log the frustration pattern detection
      console.warn(`EmotionContext: 🚨 FRUSTRATION PATTERN DETECTED - ${frustrationPattern} - Recommended: ${recommendedAction}`);
    }
    
    // Determine if this is a significant emotional change
    const emotionChanged = adjustedEmotion !== emotionalState.currentEmotion;
    const intensityChanged = Math.abs(adjustedIntensity - emotionalState.intensity) > 0.15;
    const isSignificantChange = emotionChanged || intensityChanged;
    
    // Create emotion record
    const emotionRecord = {
      emotion: adjustedEmotion,
      intensity: adjustedIntensity,
      timestamp: new Date().toISOString(),
      trigger: messageContent.substring(0, 50) + (messageContent.length > 50 ? '...' : ''),
      significantChange: isSignificantChange,
      frustrationPattern: frustrationPattern,
      recommendedAction: recommendedAction
    };
    
    // Update emotional state
    setEmotionalState(prevState => {
      const updatedHistory = [...prevState.history, emotionRecord];
      
      // Track negative spikes - include if it's a new negative emotion or
      // if it's a significant intensity increase for an already negative emotion
      const isNegativeEmotion = ['frustrated', 'angry', 'disappointed', 'worried', 
                                'concerned', 'confused', 'doubtful', 'annoyed',
                                'very_negative', 'negative'].includes(adjustedEmotion);
      
      const isIntensityIncrease = adjustedIntensity > prevState.intensity;
      
      const shouldTrackAsSpike = isNegativeSpike || 
                                (isNegativeEmotion && isIntensityIncrease && intensityChanged) ||
                                (frustrationScore > 0.7); // Also track high frustration scores as spikes
      
      const updatedNegativeSpikes = shouldTrackAsSpike
        ? [...prevState.negativeSpikes, emotionRecord] 
        : prevState.negativeSpikes;
      
      return {
        currentEmotion: adjustedEmotion,
        intensity: adjustedIntensity,
        history: updatedHistory,
        negativeSpikes: updatedNegativeSpikes
      };
    });
    
    // Log more detailed information about emotion changes
    console.log(`EmotionContext: Updated emotion from ${emotionalState.currentEmotion} (${emotionalState.intensity}) to ${adjustedEmotion} (${adjustedIntensity}) based on message`);
    
    // If this is a negative spike, log it with more prominence
    if (isNegativeSpike || frustrationScore > 0.7) {
      console.warn(`EmotionContext: ⚠️ NEGATIVE SPIKE DETECTED - ${adjustedEmotion} (${adjustedIntensity}) - Trigger: "${messageContent.substring(0, 100)}..."`);
      if (frustrationPattern) {
        console.warn(`EmotionContext: 🚨 FRUSTRATION PATTERN: ${frustrationPattern} - Recommended Action: ${recommendedAction}`);
      }
    }
  };

   // Analyze message for emotional content
   const analyzeMessageForEmotion = (message, currentEmotion, currentIntensity, scenario) => {
    const messageLower = message.toLowerCase();
    let newEmotion = currentEmotion;
    let newIntensity = currentIntensity;
    let isNegativeSpike = false;
    
    // Check for emotional keywords
    const positiveKeywords = [
      'thank', 'appreciate', 'excited', 'happy', 'love', 'great', 'perfect', 
      'beautiful', 'amazing', 'wonderful', 'fantastic', 'excellent', 'pleased',
      'interested', 'looking forward', 'eager', 'delighted', 'glad', 'thrilled'
    ];
    
    const negativeKeywords = [
      'expensive', 'cost', 'price', 'budget', 'concern', 'worried', 'anxious',
      'disappointed', 'unhappy', 'unclear', 'confused', 'frustrated', 'annoyed',
      'surprised', 'difficult', 'pass', 'other venues', 'elsewhere', 'reconsider',
      'too much', 'high', 'can\'t afford', 'problem', 'issue', 'unfortunately',
      'not sure', 'hesitant', 'doubt', 'skeptical', 'not what we expected'
    ];
    
    const neutralKeywords = [
      'think', 'consider', 'maybe', 'possibly', 'perhaps', 'might', 'could',
      'would', 'should', 'need', 'want', 'looking', 'searching', 'finding'
    ];
    
    // Check for negative phrases that indicate frustration
    const negativePatterns = [
      'i\'m surprised', 'i am surprised', 
      'i\'m frustrated', 'i am frustrated',
      'we\'ll need to', 'we will need to',
      'focus on other', 'look elsewhere',
      'out of our budget', 'beyond our budget',
      'too expensive', 'can\'t work with',
      'can not work with', 'difficult to work with',
      'not what we\'re looking for', 'not what we are looking for',
      'disappointed', 'not impressed',
      'wasting', 'waste of', 'time',
      'moving on', 'thank you for your time'
    ];
    
    // Count keyword matches with weighted significance
    let positiveCount = positiveKeywords.filter(word => messageLower.includes(word)).length;
    let negativeCount = negativeKeywords.filter(word => messageLower.includes(word)).length;
    const neutralCount = neutralKeywords.filter(word => messageLower.includes(word)).length;
    
    // Check for negative patterns (these are stronger signals of frustration)
    const negativePatternCount = negativePatterns.filter(pattern => messageLower.includes(pattern)).length;
    negativeCount += negativePatternCount * 2; // Weigh patterns more heavily
    
    // Check for question marks (can indicate confusion or concern)
    const questionCount = (messageLower.match(/\?/g) || []).length;
    if (questionCount > 1) {
      negativeCount += 1; // Multiple questions might indicate confusion or concern
    }
    
    // Check for exclamation marks (can indicate strong emotion)
    const exclamationCount = (messageLower.match(/!/g) || []).length;
    if (exclamationCount > 0) {
      // Could be positive or negative - check context
      if (negativeCount > positiveCount) {
        negativeCount += exclamationCount; // Amplify negative emotion
      } else if (positiveCount > negativeCount) {
        positiveCount += exclamationCount; // Amplify positive emotion
      }
    }
    
    // Determine emotion change
    if (positiveCount > negativeCount && positiveCount > neutralCount) {
      // Positive emotion - categorize more specifically
      if (positiveCount > 3) {
        newEmotion = 'excited';
        newIntensity = Math.min(currentIntensity + 0.2, 1.0);
      } else if (messageLower.includes('interest') || messageLower.includes('curious')) {
        newEmotion = 'interested';
        newIntensity = Math.min(currentIntensity + 0.1, 0.8);
      } else {
        newEmotion = 'pleased';
        newIntensity = Math.min(currentIntensity + 0.1, 0.9);
      }
    } else if (negativeCount > 0 && negativePatternCount > 0) {
      // Strong negative signals detected (pattern match + keywords)
      newEmotion = 'frustrated';
      newIntensity = Math.min(0.7 + (negativePatternCount * 0.1), 1.0);
      isNegativeSpike = true;
    } else if (negativeCount > positiveCount && negativeCount > neutralCount) {
      // Negative emotion - categorize more specifically
      if (negativeCount > 3) {
        if (messageLower.includes('pass') || messageLower.includes('other venue') || 
            messageLower.includes('elsewhere') || messageLower.includes('too expensive')) {
          newEmotion = 'disappointed';
          newIntensity = 0.8;
        } else {
          newEmotion = 'frustrated';
          newIntensity = 0.7;
        }
        isNegativeSpike = true;
      } else if (messageLower.includes('worried') || messageLower.includes('concern')) {
        newEmotion = 'worried';
        newIntensity = 0.6;
      } else if (messageLower.includes('confus') || messageLower.includes('unclear')) {
        newEmotion = 'confused';
        newIntensity = 0.5;
      } else {
        newEmotion = 'concerned';
        newIntensity = 0.5;
      }
    } else {
      // Neutral or mixed emotion
      newEmotion = 'neutral';
      newIntensity = 0.5;
    }
    
    // Adjust based on scenario-specific triggers
    if (scenario.id === 'initial-inquiry') {
      // For initial inquiry, check for personalization
      if (messageLower.includes(scenario.clientPersonality?.name?.toLowerCase()?.split(' ')[0])) {
        newEmotion = 'pleased';
        newIntensity = Math.min(currentIntensity + 0.15, 0.9);
      }
      
      // Check for budget concerns early in the process
      if (messageLower.includes('budget') || messageLower.includes('cost') || messageLower.includes('price')) {
        if (newEmotion !== 'frustrated' && newEmotion !== 'disappointed') {
          newEmotion = 'concerned';
          newIntensity = Math.max(currentIntensity - 0.1, 0.4);
        }
      }
    } else if (scenario.id === 'qualification-call') {
      // For qualification call, check for budget discussion
      if (messageLower.includes('budget') || messageLower.includes('cost') || messageLower.includes('price')) {
        if (messageLower.includes('high') || messageLower.includes('expensive') || messageLower.includes('afford')) {
          newEmotion = 'worried';
          newIntensity = 0.7;
          isNegativeSpike = true;
        } else {
          newEmotion = 'concerned';
          newIntensity = Math.max(currentIntensity - 0.1, 0.3);
        }
      }
    } else if (scenario.id === 'venue-tour') {
      // For venue tour, check for specific feature mentions
      if (messageLower.includes('outdoor') || messageLower.includes('ceremony') || messageLower.includes('rustic')) {
        if (negativeCount === 0) {
          newEmotion = 'excited';
          newIntensity = Math.min(currentIntensity + 0.15, 0.9);
        }
      }
      
      // Check for disappointment during venue tour
      if (messageLower.includes('expected') || messageLower.includes('thought it would') || 
          messageLower.includes('pictures') || messageLower.includes('photos')) {
        if (negativeCount > 0) {
          newEmotion = 'disappointed';
          newIntensity = 0.7;
          isNegativeSpike = true;
        }
      }
    } else if (scenario.id === 'proposal-presentation') {
      // For proposal presentation, check for value discussion
      if (messageLower.includes('value') || messageLower.includes('worth') || messageLower.includes('package')) {
        if (negativeCount > 0) {
          newEmotion = 'doubtful';
          newIntensity = 0.6;
        } else {
          newEmotion = 'interested';
          newIntensity = Math.min(currentIntensity + 0.1, 0.8);
        }
      }
      
      // Check for closing signals
      if (messageLower.includes('sign') || messageLower.includes('book') || 
          messageLower.includes('deposit') || messageLower.includes('contract')) {
        if (negativeCount === 0) {
          newEmotion = 'excited';
          newIntensity = 0.9;
        }
      }
    }
    
    // Log the emotion analysis
    console.log(`Emotion Analysis:`, {
      message: messageLower.substring(0, 50) + (messageLower.length > 50 ? '...' : ''),
      positiveCount,
      negativeCount,
      negativePatternCount,
      currentEmotion,
      newEmotion,
      newIntensity,
      isNegativeSpike
    });
    
    return { newEmotion, newIntensity, isNegativeSpike };
    
    // Count keyword matches
    const keywordPositiveCount = positiveKeywords.filter(word => messageLower.includes(word)).length;
    const keywordNegativeCount = negativeKeywords.filter(word => messageLower.includes(word)).length;
    const keywordNeutralCount = neutralKeywords.filter(word => messageLower.includes(word)).length;
    
    // Determine emotion change
    if (keywordPositiveCount > keywordNegativeCount && keywordPositiveCount > keywordNeutralCount) {
      // Positive emotion
      if (keywordPositiveCount > 3) {
        newEmotion = 'very_positive';
        newIntensity = Math.min(currentIntensity + 0.2, 1.0);
      } else {
        newEmotion = 'positive';
        newIntensity = Math.min(currentIntensity + 0.1, 0.9);
      }
    } else if (keywordNegativeCount > keywordPositiveCount && keywordNegativeCount > keywordNeutralCount) {
      // Negative emotion
      if (keywordNegativeCount > 3) {
        newEmotion = 'very_negative';
        newIntensity = Math.max(currentIntensity - 0.3, 0.1);
        isNegativeSpike = true;
      } else {
        newEmotion = 'negative';
        newIntensity = Math.max(currentIntensity - 0.2, 0.2);
      }
    } else {
      // Neutral or mixed emotion
      newEmotion = 'neutral';
      newIntensity = 0.5;
    }
    
    // Adjust based on scenario-specific triggers
    if (scenario.id === 'initial-inquiry') {
      // For initial inquiry, check for personalization
      if (messageLower.includes(scenario.clientPersonality.name.toLowerCase().split(' ')[0])) {
        newEmotion = 'positive';
        newIntensity = Math.min(currentIntensity + 0.15, 0.9);
      }
    } else if (scenario.id === 'qualification-call') {
      // For qualification call, check for budget discussion
      if (messageLower.includes('budget') || messageLower.includes('cost') || messageLower.includes('price')) {
        newEmotion = 'concerned';
        newIntensity = Math.max(currentIntensity - 0.1, 0.3);
      }
    } else if (scenario.id === 'venue-tour') {
      // For venue tour, check for specific feature mentions
      if (messageLower.includes('outdoor') || messageLower.includes('ceremony') || messageLower.includes('rustic')) {
        newEmotion = 'excited';
        newIntensity = Math.min(currentIntensity + 0.15, 0.9);
      }
    } else if (scenario.id === 'proposal-presentation') {
      // For proposal presentation, check for value discussion
      if (messageLower.includes('value') || messageLower.includes('worth') || messageLower.includes('package')) {
        newEmotion = 'interested';
        newIntensity = Math.min(currentIntensity + 0.1, 0.8);
      }
    }
    
    return { newEmotion, newIntensity, isNegativeSpike };
  };

  // Analyze a sequence of messages to detect patterns of frustration
  const analyzeMessageSequence = (messages, scenario) => {
    if (!messages || messages.length === 0) {
      return { 
        frustrationScore: 0, 
        frustrationPattern: null, 
        recommendedAction: null 
      };
    }
    
    // Only analyze the last 5 messages to focus on recent patterns
    const recentMessages = messages.slice(-5);
    const messageContents = recentMessages.map(msg => 
      typeof msg === 'string' ? msg : msg.content
    );
    
    // Initialize frustration tracking
    let frustrationScore = 0;
    let frustrationPattern = null;
    let recommendedAction = null;
    
    // Check for escalating frustration patterns
    const frustrationKeywords = [
      'frustrated', 'annoyed', 'disappointed', 'worried', 'concerned',
      'confused', 'doubtful', 'skeptical', 'expensive', 'cost', 'price',
      'budget', 'too much', 'high', 'can\'t afford', 'problem', 'issue',
      'unfortunately', 'not sure', 'hesitant', 'not what we expected'
    ];
    
    // Check for frustration escalation patterns
    const escalationPatterns = [
      // Pattern 1: Increasing use of negative words
      {
        name: 'increasing negativity',
        check: (msgs) => {
          const negativeCounts = msgs.map(msg => 
            frustrationKeywords.filter(word => msg.toLowerCase().includes(word)).length
          );
          return negativeCounts.every((count, i, arr) => 
            i === 0 || count >= arr[i-1]
          ) && negativeCounts[negativeCounts.length - 1] > 0;
        },
        action: 'Acknowledge their growing concerns and address each point specifically'
      },
      // Pattern 2: Repeated questions about the same topic
      {
        name: 'repeated questions',
        check: (msgs) => {
          const questionTopics = {};
          msgs.forEach(msg => {
            const questions = msg.match(/\?/g) || [];
            if (questions.length > 0) {
              // Extract topic from question (simplified)
              const topic = msg.toLowerCase().match(/(what|how|why|when|where|who|which|can|could|would|should|do|does|is|are|was|were)\s+([^?]+)\?/);
              if (topic && topic[2]) {
                const topicKey = topic[2].trim();
                questionTopics[topicKey] = (questionTopics[topicKey] || 0) + 1;
              }
            }
          });
          return Object.values(questionTopics).some(count => count >= 2);
        },
        action: 'Provide more detailed information on the topic they keep asking about'
      },
      // Pattern 3: Mentioning alternatives or competitors
      {
        name: 'considering alternatives',
        check: (msgs) => {
          const alternativeMentions = msgs.filter(msg => 
            msg.toLowerCase().includes('other venue') || 
            msg.toLowerCase().includes('elsewhere') || 
            msg.toLowerCase().includes('competitor') ||
            msg.toLowerCase().includes('alternative')
          ).length;
          return alternativeMentions >= 2;
        },
        action: 'Highlight your unique value proposition and address their specific concerns'
      },
      // Pattern 4: Expressing time pressure
      {
        name: 'time pressure',
        check: (msgs) => {
          const timePressureMentions = msgs.filter(msg => 
            msg.toLowerCase().includes('time') && 
            (msg.toLowerCase().includes('waste') || 
             msg.toLowerCase().includes('running out') || 
             msg.toLowerCase().includes('need to decide') ||
             msg.toLowerCase().includes('soon'))
          ).length;
          return timePressureMentions >= 2;
        },
        action: 'Acknowledge their time constraints and offer to expedite the process'
      },
      // Pattern 5: Budget concerns escalation
      {
        name: 'budget concerns escalation',
        check: (msgs) => {
          const budgetMentions = msgs.filter(msg => 
            msg.toLowerCase().includes('budget') || 
            msg.toLowerCase().includes('cost') || 
            msg.toLowerCase().includes('price') ||
            msg.toLowerCase().includes('expensive') ||
            msg.toLowerCase().includes('afford')
          ).length;
          return budgetMentions >= 3;
        },
        action: 'Discuss flexible payment options or highlight the long-term value of your offering'
      }
    ];
    
    // Check for each pattern
    for (const pattern of escalationPatterns) {
      if (pattern.check(messageContents)) {
        frustrationPattern = pattern.name;
        recommendedAction = pattern.action;
        frustrationScore = 0.7; // High frustration score for detected patterns
        break;
      }
    }
    
    // If no specific pattern detected, calculate a general frustration score
    if (!frustrationPattern) {
      // Count frustration keywords across all messages
      const totalFrustrationKeywords = messageContents.reduce((count, msg) => {
        return count + frustrationKeywords.filter(word => msg.toLowerCase().includes(word)).length;
      }, 0);
      
      // Calculate frustration score based on keyword density
      frustrationScore = Math.min(totalFrustrationKeywords * 0.15, 0.9);
      
      // Set default recommendations based on frustration score
      if (frustrationScore > 0.6) {
        recommendedAction = 'Acknowledge their concerns and offer specific solutions';
      } else if (frustrationScore > 0.3) {
        recommendedAction = 'Show empathy and address their specific points';
      } else {
        recommendedAction = 'Continue with positive engagement';
      }
    }
    
    // Log the sequence analysis
    console.log(`Message Sequence Analysis:`, {
      messageCount: messageContents.length,
      frustrationScore,
      frustrationPattern,
      recommendedAction
    });
    
    return { 
      frustrationScore, 
      frustrationPattern, 
      recommendedAction 
    };
  };

  // Get emotional journey summary
  const getEmotionalJourney = () => {
    // Extract frustration patterns from history
    const frustrationPatterns = emotionalState.history
      .filter(record => record.frustrationPattern)
      .map(record => ({
        pattern: record.frustrationPattern,
        recommendedAction: record.recommendedAction,
        timestamp: record.timestamp,
        trigger: record.trigger
      }));
    
    // Get unique frustration patterns
    const uniquePatterns = [...new Set(frustrationPatterns.map(p => p.pattern))];
    
    return {
      ...emotionalState,
      averageIntensity: emotionalState.history.reduce((sum, record) => sum + record.intensity, 0) / 
                        (emotionalState.history.length || 1),
      negativeSpikeCount: emotionalState.negativeSpikes.length,
      emotionChanges: emotionalState.history.length - 1,
      frustrationPatterns: uniquePatterns,
      frustrationDetails: frustrationPatterns
    };
  };

  // Reset emotion tracking
  const resetEmotionTracking = () => {
    setEmotionalState({
      currentEmotion: 'neutral',
      intensity: 0.5,
      history: [],
      negativeSpikes: []
    });
  };

  const value = {
    emotionalState,
    currentEmotion: emotionalState.currentEmotion,
    emotionIntensity: emotionalState.intensity,
    initializeEmotionTracking,
    updateEmotion,
    getEmotionalJourney,
    resetEmotionTracking
  };

  return (
    <EmotionContext.Provider value={value}>
      {children}
    </EmotionContext.Provider>
  );
} 