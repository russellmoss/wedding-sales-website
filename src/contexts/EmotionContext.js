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
      
      // Return the updated state with the new emotion values
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
    
    // Check for emotional keywords with word boundary matching
    const positiveKeywords = [
      // General positive expressions
      'thank', 'appreciate', 'excited', 'happy', 'love', 'great', 'perfect', 
      'beautiful', 'amazing', 'wonderful', 'fantastic', 'excellent', 'pleased',
      'interested', 'looking forward', 'eager', 'delighted', 'glad', 'thrilled',
      // Additional positive expressions
      'impressed', 'satisfied', 'pleased', 'grateful', 'blessed', 'lucky',
      'fortunate', 'inspired', 'motivated', 'enthusiastic', 'optimistic',
      'confident', 'assured', 'comfortable', 'relaxed', 'at ease', 'peaceful',
      'joyful', 'cheerful', 'upbeat', 'positive', 'encouraged', 'supported',
      'valued', 'respected', 'understood', 'heard', 'listened to', 'cared for',
      'special', 'unique', 'one of a kind', 'perfect for us', 'exactly what we want',
      'dream', 'ideal', 'preferred', 'favorite', 'top choice', 'first choice',
      'recommend', 'refer', 'share', 'tell others', 'spread the word'
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
    
    // Check for negative phrases that indicate frustration with context
    const negativePatterns = [
      { pattern: 'i\'m surprised', context: 'response_time' },
      { pattern: 'i am surprised', context: 'response_time' },
      { pattern: 'i\'m frustrated', context: 'general' },
      { pattern: 'i am frustrated', context: 'general' },
      { pattern: 'we\'ll need to', context: 'budget' },
      { pattern: 'we will need to', context: 'budget' },
      { pattern: 'focus on other', context: 'competition' },
      { pattern: 'look elsewhere', context: 'competition' },
      { pattern: 'out of our budget', context: 'budget' },
      { pattern: 'beyond our budget', context: 'budget' },
      { pattern: 'too expensive', context: 'budget' },
      { pattern: 'can\'t work with', context: 'service' },
      { pattern: 'can not work with', context: 'service' },
      { pattern: 'difficult to work with', context: 'service' },
      { pattern: 'not what we\'re looking for', context: 'expectations' },
      { pattern: 'not what we are looking for', context: 'expectations' },
      { pattern: 'disappointed', context: 'general' },
      { pattern: 'not impressed', context: 'general' },
      { pattern: 'wasting', context: 'time' },
      { pattern: 'waste of', context: 'time' },
      { pattern: 'moving on', context: 'general' },
      { pattern: 'thank you for your time', context: 'closing' }
    ];
    
    // Count keyword matches with word boundary checking
    const countKeywordMatches = (text, keywords) => {
      return keywords.reduce((count, keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return count + (text.match(regex) || []).length;
      }, 0);
    };
    
    // Calculate content-based emotion scores with higher weights
    let positiveCount = countKeywordMatches(messageLower, positiveKeywords) * 2.5; // Increased weight for content
    let negativeCount = countKeywordMatches(messageLower, negativeKeywords) * 2.5; // Increased weight for content
    const neutralCount = countKeywordMatches(messageLower, neutralKeywords) * 1.5; // Increased weight for content
    
    // Check for negative patterns with context - reduced weight
    const matchedPatterns = negativePatterns
      .filter(({ pattern }) => messageLower.includes(pattern))
      .map(({ pattern, context }) => ({ pattern, context }));
    
    // Weight patterns based on context and scenario - reduced impact
    const patternWeights = {
      response_time: scenario?.id === 'initial-inquiry' ? 1.5 : 0.8,
      budget: scenario?.id === 'proposal-presentation' ? 1.5 : 0.8,
      competition: scenario?.id === 'venue-tour' ? 1.5 : 0.8,
      service: 1.2,
      expectations: 1.2,
      time: 1.0,
      general: 0.8,
      closing: 1.5
    };
    
    // Add pattern matches with reduced weight
    negativeCount += matchedPatterns.reduce((count, { context }) => 
      count + (patternWeights[context] || 0.8) * 0.7, 0); // Reduced multiplier for patterns
    
    // Check for explicit emotion statements - these should have high weight
    const explicitEmotionStatements = [
      { emotion: 'happy', patterns: ['i am happy', 'i\'m happy', 'feeling happy', 'very happy'] },
      { emotion: 'excited', patterns: ['i am excited', 'i\'m excited', 'feeling excited', 'very excited'] },
      { emotion: 'pleased', patterns: ['i am pleased', 'i\'m pleased', 'feeling pleased', 'very pleased'] },
      { emotion: 'interested', patterns: ['i am interested', 'i\'m interested', 'feeling interested', 'very interested'] },
      { emotion: 'hopeful', patterns: ['i am hopeful', 'i\'m hopeful', 'feeling hopeful', 'very hopeful'] },
      { emotion: 'grateful', patterns: ['i am grateful', 'i\'m grateful', 'feeling grateful', 'very grateful', 'thank you so much'] },
      { emotion: 'enthusiastic', patterns: ['i am enthusiastic', 'i\'m enthusiastic', 'feeling enthusiastic', 'very enthusiastic'] },
      { emotion: 'optimistic', patterns: ['i am optimistic', 'i\'m optimistic', 'feeling optimistic', 'very optimistic'] },
      { emotion: 'confident', patterns: ['i am confident', 'i\'m confident', 'feeling confident', 'very confident'] },
      { emotion: 'satisfied', patterns: ['i am satisfied', 'i\'m satisfied', 'feeling satisfied', 'very satisfied'] },
      { emotion: 'frustrated', patterns: ['i am frustrated', 'i\'m frustrated', 'feeling frustrated', 'very frustrated'] },
      { emotion: 'angry', patterns: ['i am angry', 'i\'m angry', 'feeling angry', 'very angry'] },
      { emotion: 'disappointed', patterns: ['i am disappointed', 'i\'m disappointed', 'feeling disappointed', 'very disappointed'] },
      { emotion: 'worried', patterns: ['i am worried', 'i\'m worried', 'feeling worried', 'very worried'] },
      { emotion: 'concerned', patterns: ['i am concerned', 'i\'m concerned', 'feeling concerned', 'very concerned'] },
      { emotion: 'confused', patterns: ['i am confused', 'i\'m confused', 'feeling confused', 'very confused'] }
    ];
    
    // Check for explicit emotion statements and give them high weight
    let explicitEmotionDetected = false;
    let explicitEmotionType = null;
    
    for (const { emotion, patterns } of explicitEmotionStatements) {
      if (patterns.some(pattern => messageLower.includes(pattern))) {
        explicitEmotionDetected = true;
        explicitEmotionType = emotion;
        
        // Boost the corresponding emotion score significantly
        if (['happy', 'excited', 'pleased', 'interested', 'hopeful', 
             'grateful', 'enthusiastic', 'optimistic', 'confident', 'satisfied'].includes(emotion)) {
          positiveCount += 5.0; // High boost for explicit positive emotions
        } else {
          negativeCount += 5.0; // High boost for explicit negative emotions
        }
        
        break;
      }
    }
    
    // Check for question marks (can indicate confusion or concern) - reduced weight
    const questionCount = (messageLower.match(/\?/g) || []).length;
    if (questionCount > 1) {
      negativeCount += Math.min(questionCount * 0.3, 1.0); // Reduced impact
    }
    
    // Check for exclamation marks with context - reduced weight
    const exclamationCount = (messageLower.match(/!/g) || []).length;
    if (exclamationCount > 0) {
      // Check surrounding context for emotion
      const exclamationContext = messageLower.split('!').map(part => part.trim());
      const isNegativeContext = exclamationContext.some(part => 
        negativeKeywords.some(word => part.includes(word))
      );
      
      if (isNegativeContext) {
        negativeCount += Math.min(exclamationCount * 0.4, 1.0); // Reduced impact
      } else if (positiveCount > negativeCount) {
        positiveCount += Math.min(exclamationCount * 0.4, 1.0); // Reduced impact
      }
    }
    
    // Check for emotional intensity modifiers - these should have medium weight
    const intensityModifiers = {
      positive: ['very', 'really', 'so', 'extremely', 'absolutely', 'completely', 'totally'],
      negative: ['not', 'never', 'hardly', 'barely', 'scarcely', 'rarely']
    };
    
    // Count intensity modifiers
    const positiveModifiers = intensityModifiers.positive.filter(modifier => 
      messageLower.includes(modifier)
    ).length;
    
    const negativeModifiers = intensityModifiers.negative.filter(modifier => 
      messageLower.includes(modifier)
    ).length;
    
    // Apply intensity modifiers with medium weight
    positiveCount += positiveModifiers * 1.5;
    negativeCount += negativeModifiers * 1.5;
    
    // Normalize counts to prevent extreme values
    const totalCount = positiveCount + negativeCount + neutralCount;
    if (totalCount > 0) {
      positiveCount = positiveCount / totalCount;
      negativeCount = negativeCount / totalCount;
    }
    
    // Determine emotion change with hysteresis
    const emotionChangeThreshold = 0.15; // Reduced threshold to make content changes more impactful
    const currentEmotionIsPositive = ['happy', 'excited', 'pleased', 'interested', 'hopeful', 
                                     'grateful', 'enthusiastic', 'optimistic', 'confident', 'satisfied'].includes(currentEmotion);
    const currentEmotionIsNegative = ['frustrated', 'angry', 'disappointed', 'worried', 'concerned'].includes(currentEmotion);
    
    // If explicit emotion was detected, prioritize it
    if (explicitEmotionDetected) {
      newEmotion = explicitEmotionType;
      newIntensity = 0.8; // High intensity for explicit emotions
      
      // Log the explicit emotion detection
      console.log(`EmotionContext: Explicit emotion detected: "${explicitEmotionType}"`);
    } else if (positiveCount > negativeCount + emotionChangeThreshold) {
      // Positive emotion - categorize more specifically
      if (positiveCount > 0.7) {
        // High positive intensity emotions
        if (messageLower.includes('love') || messageLower.includes('perfect') || 
            messageLower.includes('exactly what') || messageLower.includes('dream')) {
          newEmotion = 'enthusiastic';
          newIntensity = Math.min(currentIntensity + 0.2, 1.0);
        } else if (messageLower.includes('thank') || messageLower.includes('appreciate') || 
                  messageLower.includes('grateful')) {
          newEmotion = 'grateful';
          newIntensity = Math.min(currentIntensity + 0.15, 0.9);
        } else {
          newEmotion = 'excited';
          newIntensity = Math.min(currentIntensity + 0.15, 1.0);
        }
      } else if (positiveCount > 0.5) {
        // Medium positive intensity emotions
        if (messageLower.includes('interest') || messageLower.includes('curious') || 
            messageLower.includes('tell me more') || messageLower.includes('learn more')) {
          newEmotion = 'interested';
          newIntensity = Math.min(currentIntensity + 0.1, 0.8);
        } else if (messageLower.includes('hope') || messageLower.includes('looking forward') || 
                  messageLower.includes('future') || messageLower.includes('plan')) {
          newEmotion = 'hopeful';
          newIntensity = Math.min(currentIntensity + 0.1, 0.8);
        } else if (messageLower.includes('good') || messageLower.includes('nice') || 
                  messageLower.includes('pleasant') || messageLower.includes('enjoy')) {
          newEmotion = 'pleased';
          newIntensity = Math.min(currentIntensity + 0.1, 0.9);
        } else {
          newEmotion = 'satisfied';
          newIntensity = Math.min(currentIntensity + 0.1, 0.8);
        }
      } else {
        // Lower positive intensity emotions
        if (messageLower.includes('think') || messageLower.includes('consider') || 
            messageLower.includes('maybe') || messageLower.includes('possibly')) {
          newEmotion = 'curious';
          newIntensity = Math.min(currentIntensity + 0.05, 0.7);
        } else if (messageLower.includes('confident') || messageLower.includes('assured') || 
                  messageLower.includes('comfortable') || messageLower.includes('at ease')) {
          newEmotion = 'confident';
          newIntensity = Math.min(currentIntensity + 0.05, 0.7);
        } else {
          newEmotion = 'optimistic';
          newIntensity = Math.min(currentIntensity + 0.05, 0.7);
        }
      }
    } else if (negativeCount > positiveCount + emotionChangeThreshold) {
      // Negative emotion - categorize more specifically
      if (matchedPatterns.length > 0) {
        newEmotion = 'frustrated';
        newIntensity = Math.min(0.7 + (matchedPatterns.length * 0.05), 1.0); // Reduced impact
        isNegativeSpike = true;
      } else if (negativeCount > 0.6) {
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
      // Maintain current emotion if change is not significant
      newEmotion = currentEmotion;
      newIntensity = currentIntensity;
    }
    
    // Adjust based on scenario-specific triggers
    if (scenario?.id === 'initial-inquiry') {
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
    } else if (scenario?.id === 'qualification-call') {
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
    } else if (scenario?.id === 'venue-tour') {
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
    } else if (scenario?.id === 'proposal-presentation') {
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
    
    // Apply emotion change cooldown
    const lastEmotionChange = emotionalState.history[emotionalState.history.length - 1];
    if (lastEmotionChange && 
        Date.now() - new Date(lastEmotionChange.timestamp).getTime() < 5000) { // 5 second cooldown
      // If emotion changed recently, require stronger signals for another change
      if (Math.abs(negativeCount - positiveCount) < 0.3) {
        newEmotion = lastEmotionChange.emotion;
        newIntensity = lastEmotionChange.intensity;
      }
    }
    
    // VALIDATION CHECKS: Compare detected emotion against actual content
    const validateEmotionAgainstContent = () => {
      // If we already detected an explicit emotion, prioritize it
      if (explicitEmotionDetected) {
        return { emotion: explicitEmotionType, intensity: 0.8, isExplicit: true };
      }
      
      // Check for explicit emotion statements that should override our detection
      const explicitEmotions = [
        { emotion: 'happy', patterns: ['i am happy', 'i\'m happy', 'feeling happy', 'very happy'] },
        { emotion: 'excited', patterns: ['i am excited', 'i\'m excited', 'feeling excited', 'very excited'] },
        { emotion: 'pleased', patterns: ['i am pleased', 'i\'m pleased', 'feeling pleased', 'very pleased'] },
        { emotion: 'interested', patterns: ['i am interested', 'i\'m interested', 'feeling interested', 'very interested'] },
        { emotion: 'hopeful', patterns: ['i am hopeful', 'i\'m hopeful', 'feeling hopeful', 'very hopeful'] },
        { emotion: 'grateful', patterns: ['i am grateful', 'i\'m grateful', 'feeling grateful', 'very grateful', 'thank you so much'] },
        { emotion: 'enthusiastic', patterns: ['i am enthusiastic', 'i\'m enthusiastic', 'feeling enthusiastic', 'very enthusiastic'] },
        { emotion: 'optimistic', patterns: ['i am optimistic', 'i\'m optimistic', 'feeling optimistic', 'very optimistic'] },
        { emotion: 'confident', patterns: ['i am confident', 'i\'m confident', 'feeling confident', 'very confident'] },
        { emotion: 'satisfied', patterns: ['i am satisfied', 'i\'m satisfied', 'feeling satisfied', 'very satisfied'] },
        { emotion: 'frustrated', patterns: ['i am frustrated', 'i\'m frustrated', 'feeling frustrated', 'very frustrated'] },
        { emotion: 'angry', patterns: ['i am angry', 'i\'m angry', 'feeling angry', 'very angry'] },
        { emotion: 'disappointed', patterns: ['i am disappointed', 'i\'m disappointed', 'feeling disappointed', 'very disappointed'] },
        { emotion: 'worried', patterns: ['i am worried', 'i\'m worried', 'feeling worried', 'very worried'] },
        { emotion: 'concerned', patterns: ['i am concerned', 'i\'m concerned', 'feeling concerned', 'very concerned'] },
        { emotion: 'confused', patterns: ['i am confused', 'i\'m confused', 'feeling confused', 'very confused'] }
      ];
      
      // Check for explicit emotion statements
      for (const { emotion, patterns } of explicitEmotions) {
        if (patterns.some(pattern => messageLower.includes(pattern))) {
          console.log(`EmotionContext: Explicit emotion statement detected: "${emotion}"`);
          return { emotion, intensity: 0.8, isExplicit: true };
        }
      }
      
      // Check for emotion contradictions
      const emotionContradictions = {
        'happy': ['unhappy', 'sad', 'disappointed', 'frustrated'],
        'excited': ['not excited', 'disappointed', 'frustrated'],
        'pleased': ['not pleased', 'disappointed', 'frustrated'],
        'interested': ['not interested', 'disappointed', 'frustrated'],
        'hopeful': ['not hopeful', 'doubtful', 'skeptical'],
        'grateful': ['not grateful', 'ungrateful', 'disappointed'],
        'enthusiastic': ['not enthusiastic', 'unenthusiastic', 'disappointed'],
        'optimistic': ['not optimistic', 'pessimistic', 'doubtful'],
        'confident': ['not confident', 'uncertain', 'doubtful'],
        'satisfied': ['not satisfied', 'dissatisfied', 'disappointed'],
        'frustrated': ['not frustrated', 'happy', 'pleased'],
        'angry': ['not angry', 'happy', 'pleased'],
        'disappointed': ['not disappointed', 'happy', 'pleased'],
        'worried': ['not worried', 'confident', 'assured'],
        'concerned': ['not concerned', 'confident', 'assured'],
        'confused': ['not confused', 'clear', 'understood']
      };
      
      // If we detected a specific emotion, check if there are contradictions
      if (emotionContradictions[newEmotion]) {
        const hasContradiction = emotionContradictions[newEmotion].some(word => 
          messageLower.includes(word)
        );
        
        if (hasContradiction) {
          console.log(`EmotionContext: Contradiction detected for emotion "${newEmotion}"`);
          // Revert to a more neutral emotion
          return { emotion: 'neutral', intensity: 0.5, isContradiction: true };
        }
      }
      
      // Check for sarcasm indicators
      const sarcasmIndicators = [
        'yeah right', 'sure', 'whatever', 'great', 'perfect', 'wonderful',
        'oh please', 'come on', 'give me a break', 'as if', 'whatever'
      ];
      
      const hasSarcasm = sarcasmIndicators.some(indicator => messageLower.includes(indicator));
      if (hasSarcasm && newEmotion === 'excited' || newEmotion === 'pleased' || newEmotion === 'happy') {
        console.log(`EmotionContext: Sarcasm detected, adjusting positive emotion "${newEmotion}"`);
        return { emotion: 'annoyed', intensity: 0.7, isSarcasm: true };
      }
      
      // Check for emotional intensity mismatch - adjusted to prioritize content
      const highIntensityEmotions = ['excited', 'enthusiastic', 'frustrated', 'angry', 'disappointed'];
      const lowIntensityEmotions = ['pleased', 'interested', 'hopeful', 'grateful', 'optimistic', 'concerned', 'worried'];
      
      if (highIntensityEmotions.includes(newEmotion) && newIntensity < 0.6) {
        // If we detected a high-intensity emotion but the intensity is low, check if it's justified
        const hasHighIntensityIndicators = messageLower.includes('!') || 
                                          messageLower.includes('very') || 
                                          messageLower.includes('really') ||
                                          messageLower.includes('so') ||
                                          messageLower.includes('extremely');
        
        // Check for content-based intensity indicators
        const hasContentBasedIntensity = positiveCount > 0.7 || negativeCount > 0.7;
        
        if (!hasHighIntensityIndicators && !hasContentBasedIntensity) {
          console.log(`EmotionContext: Intensity mismatch for "${newEmotion}", adjusting to lower intensity emotion`);
          // Map to a lower intensity emotion
          const lowIntensityMap = {
            'excited': 'interested',
            'frustrated': 'concerned',
            'angry': 'annoyed',
            'disappointed': 'concerned'
          };
          return { emotion: lowIntensityMap[newEmotion], intensity: 0.5, isIntensityMismatch: true };
        }
      }
      
      // If we detected a low-intensity emotion but the message has strong indicators
      if (lowIntensityEmotions.includes(newEmotion) && 
          (messageLower.includes('!') || messageLower.includes('very') || messageLower.includes('really') ||
           positiveCount > 0.7 || negativeCount > 0.7)) {
        console.log(`EmotionContext: Intensity mismatch for "${newEmotion}", adjusting to higher intensity`);
        // Increase intensity
        return { emotion: newEmotion, intensity: Math.min(newIntensity + 0.2, 0.9), isIntensityBoost: true };
      }
      
      // No validation issues found
      return { emotion: newEmotion, intensity: newIntensity, isValid: true };
    };
    
    // Apply validation checks
    const validationResult = validateEmotionAgainstContent();
    if (!validationResult.isValid) {
      newEmotion = validationResult.emotion;
      newIntensity = validationResult.intensity;
      
      // Log validation adjustments
      if (validationResult.isExplicit) {
        console.log(`EmotionContext: Using explicit emotion statement: "${newEmotion}"`);
      } else if (validationResult.isContradiction) {
        console.log(`EmotionContext: Resolved emotion contradiction, using "${newEmotion}"`);
      } else if (validationResult.isSarcasm) {
        console.log(`EmotionContext: Detected sarcasm, adjusted to "${newEmotion}"`);
      } else if (validationResult.isIntensityMismatch) {
        console.log(`EmotionContext: Fixed intensity mismatch, using "${newEmotion}" with intensity ${newIntensity}`);
      } else if (validationResult.isIntensityBoost) {
        console.log(`EmotionContext: Boosted intensity for "${newEmotion}" to ${newIntensity}`);
      }
    }
    
    // Log the emotion analysis with content vs. structural weighting information
    console.log(`Emotion Analysis:`, {
      message: messageLower.substring(0, 50) + (messageLower.length > 50 ? '...' : ''),
      contentBasedScores: {
        positive: positiveCount,
        negative: negativeCount,
        neutral: neutralCount
      },
      structuralFeatures: {
        questionMarks: questionCount,
        exclamationMarks: exclamationCount,
        matchedPatterns: matchedPatterns.length
      },
      currentEmotion,
      newEmotion,
      newIntensity,
      isNegativeSpike,
      explicitEmotionDetected,
      validationApplied: !validationResult.isValid
    });
    
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

  // Add a manual override function to allow correcting emotion detection
  const overrideEmotion = (emotion, intensity = 0.7, reason = 'Manual override') => {
    if (!emotion) return;
    
    // Validate emotion is in our allowed list
    const validEmotions = [
      'happy', 'excited', 'pleased', 'interested', 'hopeful',
      'grateful', 'enthusiastic', 'optimistic', 'confident', 'satisfied',
      'frustrated', 'angry', 'disappointed', 'worried', 'concerned',
      'confused', 'doubtful', 'annoyed', 'neutral'
    ];
    
    if (!validEmotions.includes(emotion)) {
      console.error(`EmotionContext: Invalid emotion "${emotion}" for override`);
      return;
    }
    
    // Clamp intensity between 0.1 and 1.0
    const clampedIntensity = Math.max(0.1, Math.min(1.0, intensity));
    
    // Create emotion record for the override
    const emotionRecord = {
      emotion: emotion,
      intensity: clampedIntensity,
      timestamp: new Date().toISOString(),
      trigger: reason,
      significantChange: true,
      isManualOverride: true
    };
    
    // Update emotional state
    setEmotionalState(prevState => {
      const updatedHistory = [...prevState.history, emotionRecord];
      
      // Track as negative spike if it's a negative emotion
      const isNegativeEmotion = ['frustrated', 'angry', 'disappointed', 'worried', 
                                'concerned', 'confused', 'doubtful', 'annoyed'].includes(emotion);
      
      const updatedNegativeSpikes = isNegativeEmotion
        ? [...prevState.negativeSpikes, emotionRecord] 
        : prevState.negativeSpikes;
      
      return {
        currentEmotion: emotion,
        intensity: clampedIntensity,
        history: updatedHistory,
        negativeSpikes: updatedNegativeSpikes
      };
    });
    
    console.log(`EmotionContext: Manual override applied - ${emotion} (${clampedIntensity}) - Reason: "${reason}"`);
  };

  const value = {
    emotionalState,
    currentEmotion: emotionalState.currentEmotion,
    emotionIntensity: emotionalState.intensity,
    initializeEmotionTracking,
    updateEmotion,
    getEmotionalJourney,
    resetEmotionTracking,
    overrideEmotion
  };

  return (
    <EmotionContext.Provider value={value}>
      {children}
    </EmotionContext.Provider>
  );
} 