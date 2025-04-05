import { EMOTION_TYPES } from './emotionTypes';

// Get emotional journey summary
export const getEmotionalJourney = (emotionalState) => {
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

// Validate emotion override
export const validateEmotionOverride = (emotion, intensity = 0.7) => {
  // Validate emotion is in our allowed list
  const validEmotions = [
    ...EMOTION_TYPES.POSITIVE,
    ...EMOTION_TYPES.NEGATIVE,
    ...EMOTION_TYPES.NEUTRAL
  ];

  if (!validEmotions.includes(emotion)) {
    console.error(`Invalid emotion "${emotion}" for override`);
    return false;
  }

  // Clamp intensity between 0.1 and 1.0
  const clampedIntensity = Math.max(0.1, Math.min(1.0, intensity));

  return {
    isValid: true,
    emotion,
    intensity: clampedIntensity
  };
};

// Create emotion record
export const createEmotionRecord = (emotion, intensity, message, sentimentScores, trigger = 'Message analysis') => {
  return {
    emotion,
    intensity,
    timestamp: new Date().toISOString(),
    message,
    sentimentScores,
    trigger
  };
};

// Check if emotion change is significant
export const isSignificantEmotionChange = (currentEmotion, newEmotion, currentIntensity, newIntensity) => {
  const emotionChangeThreshold = 0.15;
  const intensityChangeThreshold = 0.2;

  const isEmotionChange = currentEmotion !== newEmotion;
  const isIntensityChange = Math.abs(currentIntensity - newIntensity) > intensityChangeThreshold;

  return isEmotionChange || isIntensityChange;
}; 