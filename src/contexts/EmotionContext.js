import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EMOTIONAL_STATE } from './emotion/emotionTypes';
import { analyzeMessageForEmotion, analyzeMessageSequence } from './emotion/emotionAnalyzer';
import { getEmotionalJourney, validateEmotionOverride, createEmotionRecord } from './emotion/emotionUtils';
import { sentimentModel } from './emotion/sentimentModel';

const EmotionContext = createContext();

export function useEmotion() {
  return useContext(EmotionContext);
}

export function EmotionProvider({ children }) {
  const [emotionalState, setEmotionalState] = useState(INITIAL_EMOTIONAL_STATE);

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
    
    // Get ML-based sentiment analysis
    const sentimentScores = sentimentModel.predict(messageContent);
    
    // Analyze message for emotional content
    const { newEmotion, newIntensity, isNegativeSpike } = analyzeMessageForEmotion(
      messageContent,
      emotionalState.currentEmotion,
      emotionalState.intensity,
      scenario
    );

    // Create emotion record
    const emotionRecord = createEmotionRecord(
      newEmotion,
      newIntensity,
      messageContent,
      sentimentScores
    );

    // Update emotional state
    setEmotionalState(prevState => {
      const newHistory = [...prevState.history, emotionRecord];
      const newNegativeSpikes = [...prevState.negativeSpikes];

      // Track negative spikes
      if (isNegativeSpike) {
        newNegativeSpikes.push({
          timestamp: new Date().toISOString(),
          intensity: newIntensity,
          message: messageContent
        });
      }

      return {
        currentEmotion: newEmotion,
        intensity: newIntensity,
        history: newHistory,
        negativeSpikes: newNegativeSpikes
      };
    });
  };

  // Add a manual override function
  const overrideEmotion = (emotion, intensity = 0.7, reason = 'Manual override') => {
    const validation = validateEmotionOverride(emotion, intensity);
    if (!validation.isValid) return;

    const emotionRecord = createEmotionRecord(
      validation.emotion,
      validation.intensity,
      null,
      null,
      reason
    );

    setEmotionalState(prevState => {
      const updatedHistory = [...prevState.history, emotionRecord];
      
      // Track as negative spike if it's a negative emotion
      const isNegativeEmotion = ['frustrated', 'angry', 'disappointed', 'worried', 
                                'concerned', 'confused', 'doubtful', 'annoyed'].includes(validation.emotion);
      
      const updatedNegativeSpikes = isNegativeEmotion
        ? [...prevState.negativeSpikes, emotionRecord] 
        : prevState.negativeSpikes;
      
      return {
        currentEmotion: validation.emotion,
        intensity: validation.intensity,
        history: updatedHistory,
        negativeSpikes: updatedNegativeSpikes
      };
    });
    
    console.log(`EmotionContext: Manual override applied - ${validation.emotion} (${validation.intensity}) - Reason: "${reason}"`);
  };

  // Reset emotion tracking
  const resetEmotionTracking = () => {
    setEmotionalState(INITIAL_EMOTIONAL_STATE);
  };

  const value = {
    emotionalState,
    currentEmotion: emotionalState.currentEmotion,
    emotionIntensity: emotionalState.intensity,
    initializeEmotionTracking,
    updateEmotion,
    getEmotionalJourney: () => getEmotionalJourney(emotionalState),
    resetEmotionTracking,
    overrideEmotion
  };

  return (
    <EmotionContext.Provider value={value}>
      {children}
    </EmotionContext.Provider>
  );
} 