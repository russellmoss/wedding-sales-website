import React, { createContext, useState, useContext, useEffect } from 'react';
import { INITIAL_EMOTIONAL_STATE } from './emotion/emotionTypes';
import { sentimentModel } from './emotion/sentimentModel';
import { analyzeConversationEmotions } from '../utils/emotionIntegration';

const EmotionContext = createContext();

export function EmotionProvider({ children }) {
  const [emotionalState, setEmotionalState] = useState(INITIAL_EMOTIONAL_STATE);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(null);
  const [conversationAnalysis, setConversationAnalysis] = useState(null);
  const [currentScenario, setCurrentScenario] = useState(null);

  // Load the machine learning model on component mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Simulate model loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsModelLoaded(true);
        console.log('Emotion analysis model loaded successfully');
      } catch (error) {
        console.error('Error loading emotion analysis model:', error);
        setModelError(error.message);
      }
    };

    loadModel();
  }, []);

  // Initialize emotion tracking based on scenario
  const initializeEmotionTracking = (scenario) => {
    setCurrentScenario(scenario);
    
    let initialEmotion = 'neutral';
    let initialIntensity = 0.5;
    
    if (scenario) {
      if (scenario.id === 'initial-inquiry') {
        initialEmotion = 'interested';
        initialIntensity = 0.6;
      } else if (scenario.id === 'qualification-call') {
        initialEmotion = 'attentive';
        initialIntensity = 0.7;
      } else if (scenario.id === 'venue-tour') {
        initialEmotion = 'excited';
        initialIntensity = 0.8;
      } else if (scenario.id === 'proposal-presentation') {
        initialEmotion = 'interested';
        initialIntensity = 0.75;
      }
    }
    
    setEmotionalState({
      ...INITIAL_EMOTIONAL_STATE,
      currentEmotion: initialEmotion,
      intensity: initialIntensity
    });
  };

  // Update emotion based on user message
  const updateEmotion = (message) => {
    if (!isModelLoaded) {
      console.warn('Emotion analysis model not loaded yet');
      return;
    }
    
    const content = typeof message === 'string' ? message : message.content;
    const sender = message.type === 'user' ? 'sales' : 'client';
    
    // Analyze message with sentiment model
    const emotionAnalysis = sentimentModel.analyzeEmotions(content);
    
    // Create emotion record
    const emotionRecord = {
      emotion: emotionAnalysis.primaryEmotion,
      intensity: emotionAnalysis.intensity,
      timestamp: new Date().toISOString(),
      message: content,
      sentimentScores: emotionAnalysis.sentimentScores
    };
    
    // Update emotional state
    setEmotionalState(prevState => {
      const newHistory = [...prevState.history, emotionRecord];
      const newNegativeSpikes = [...prevState.negativeSpikes];
      
      // Check for negative spikes
      if (emotionAnalysis.sentimentScores.negative > 0.7) {
        newNegativeSpikes.push({
          timestamp: emotionRecord.timestamp,
          score: emotionAnalysis.sentimentScores.negative,
          message: content
        });
      }
      
      return {
        ...prevState,
        currentEmotion: emotionAnalysis.primaryEmotion,
        intensity: emotionAnalysis.intensity,
        history: newHistory,
        negativeSpikes: newNegativeSpikes
      };
    });
    
    // Log emotion analysis
    console.log('Emotion Analysis:', {
      message: content,
      sentimentScores: emotionAnalysis.sentimentScores,
      primaryEmotion: emotionAnalysis.primaryEmotion,
      intensity: emotionAnalysis.intensity,
      scenario: currentScenario?.id
    });
  };

  // Analyze entire conversation
  const analyzeConversation = (messages) => {
    if (!isModelLoaded) {
      console.warn('Emotion analysis model not loaded yet');
      return null;
    }
    
    const analysis = analyzeConversationEmotions(messages, currentScenario);
    setConversationAnalysis(analysis);
    return analysis;
  };

  // Manual override for emotion
  const setEmotion = (emotion, intensity) => {
    if (!emotion || typeof intensity !== 'number' || intensity < 0 || intensity > 1) {
      console.error('Invalid emotion or intensity');
      return;
    }
    
    const emotionRecord = {
      emotion,
      intensity,
      timestamp: new Date().toISOString(),
      message: 'Manual override',
      isManualOverride: true
    };
    
    setEmotionalState(prevState => ({
      ...prevState,
      currentEmotion: emotion,
      intensity,
      history: [...prevState.history, emotionRecord]
    }));
  };

  // Reset emotion tracking
  const resetEmotionTracking = () => {
    setEmotionalState(INITIAL_EMOTIONAL_STATE);
    setConversationAnalysis(null);
  };

  // Get the emotional journey history
  const getEmotionalJourney = () => {
    return emotionalState;
  };

  return (
    <EmotionContext.Provider
      value={{
        emotionalState,
        isModelLoaded,
        modelError,
        conversationAnalysis,
        currentScenario,
        initializeEmotionTracking,
        updateEmotion,
        analyzeConversation,
        setEmotion,
        resetEmotionTracking,
        getEmotionalJourney
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
}

export function useEmotion() {
  const context = useContext(EmotionContext);
  if (!context) {
    throw new Error('useEmotion must be used within an EmotionProvider');
  }
  return context;
} 