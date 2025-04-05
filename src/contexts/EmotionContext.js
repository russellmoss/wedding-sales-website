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
    
    // Create emotion record
    const emotionRecord = {
      emotion: newEmotion,
      intensity: newIntensity,
      timestamp: new Date().toISOString(),
      trigger: messageContent.substring(0, 50) + (messageContent.length > 50 ? '...' : '')
    };
    
    // Update emotional state
    setEmotionalState(prevState => {
      const updatedHistory = [...prevState.history, emotionRecord];
      const updatedNegativeSpikes = isNegativeSpike 
        ? [...prevState.negativeSpikes, emotionRecord] 
        : prevState.negativeSpikes;
      
      return {
        currentEmotion: newEmotion,
        intensity: newIntensity,
        history: updatedHistory,
        negativeSpikes: updatedNegativeSpikes
      };
    });
    
    console.log(`EmotionContext: Updated emotion to ${newEmotion} (${newIntensity}) based on message`);
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
      'beautiful', 'amazing', 'wonderful', 'fantastic', 'excellent', 'pleased'
    ];
    
    const negativeKeywords = [
      'expensive', 'cost', 'price', 'budget', 'concern', 'worried', 'anxious',
      'disappointed', 'unhappy', 'unclear', 'confused', 'frustrated', 'annoyed'
    ];
    
    const neutralKeywords = [
      'think', 'consider', 'maybe', 'possibly', 'perhaps', 'might', 'could',
      'would', 'should', 'need', 'want', 'looking', 'searching', 'finding'
    ];
    
    // Count keyword matches
    const positiveCount = positiveKeywords.filter(word => messageLower.includes(word)).length;
    const negativeCount = negativeKeywords.filter(word => messageLower.includes(word)).length;
    const neutralCount = neutralKeywords.filter(word => messageLower.includes(word)).length;
    
    // Determine emotion change
    if (positiveCount > negativeCount && positiveCount > neutralCount) {
      // Positive emotion
      if (positiveCount > 3) {
        newEmotion = 'very_positive';
        newIntensity = Math.min(currentIntensity + 0.2, 1.0);
      } else {
        newEmotion = 'positive';
        newIntensity = Math.min(currentIntensity + 0.1, 0.9);
      }
    } else if (negativeCount > positiveCount && negativeCount > neutralCount) {
      // Negative emotion
      if (negativeCount > 3) {
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