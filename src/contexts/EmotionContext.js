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
    
    // Determine if this is a significant emotional change
    const emotionChanged = newEmotion !== emotionalState.currentEmotion;
    const intensityChanged = Math.abs(newIntensity - emotionalState.intensity) > 0.15;
    const isSignificantChange = emotionChanged || intensityChanged;
    
    // Create emotion record
    const emotionRecord = {
      emotion: newEmotion,
      intensity: newIntensity,
      timestamp: new Date().toISOString(),
      trigger: messageContent.substring(0, 50) + (messageContent.length > 50 ? '...' : ''),
      significantChange: isSignificantChange
    };
    
    // Update emotional state
    setEmotionalState(prevState => {
      const updatedHistory = [...prevState.history, emotionRecord];
      
      // Track negative spikes - include if it's a new negative emotion or
      // if it's a significant intensity increase for an already negative emotion
      const isNegativeEmotion = ['frustrated', 'angry', 'disappointed', 'worried', 
                                'concerned', 'confused', 'doubtful', 'annoyed',
                                'very_negative', 'negative'].includes(newEmotion);
      
      const isIntensityIncrease = newIntensity > prevState.intensity;
      
      const shouldTrackAsSpike = isNegativeSpike || 
                                (isNegativeEmotion && isIntensityIncrease && intensityChanged);
      
      const updatedNegativeSpikes = shouldTrackAsSpike
        ? [...prevState.negativeSpikes, emotionRecord] 
        : prevState.negativeSpikes;
      
      return {
        currentEmotion: newEmotion,
        intensity: newIntensity,
        history: updatedHistory,
        negativeSpikes: updatedNegativeSpikes
      };
    });
    
    // Log more detailed information about emotion changes
    console.log(`EmotionContext: Updated emotion from ${emotionalState.currentEmotion} (${emotionalState.intensity}) to ${newEmotion} (${newIntensity}) based on message`);
    
    // If this is a negative spike, log it with more prominence
    if (isNegativeSpike) {
      console.warn(`EmotionContext: ⚠️ NEGATIVE SPIKE DETECTED - ${newEmotion} (${newIntensity}) - Trigger: "${messageContent.substring(0, 100)}..."`);
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

  // Get emotional journey summary
  const getEmotionalJourney = () => {
    return {
      ...emotionalState,
      averageIntensity: emotionalState.history.reduce((sum, record) => sum + record.intensity, 0) / 
                        (emotionalState.history.length || 1),
      negativeSpikeCount: emotionalState.negativeSpikes.length,
      emotionChanges: emotionalState.history.length - 1
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