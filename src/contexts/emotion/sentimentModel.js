import { EMOTION_KEYWORDS, CONTEXTUAL_PATTERNS, INTENSITY_MARKERS, EMOTION_EMBEDDINGS } from './emotionTypes';

// Pre-trained weights for different emotional dimensions
const weights = {
  positive: {
    joy: 0.8,
    gratitude: 0.7,
    excitement: 0.75,
    hope: 0.65,
    confidence: 0.6,
    satisfaction: 0.7,
    trust: 0.65,
    relief: 0.6
  },
  negative: {
    anger: 0.8,
    fear: 0.75,
    sadness: 0.7,
    disgust: 0.85,
    anxiety: 0.7,
    skepticism: 0.65,
    hesitation: 0.6,
    overwhelm: 0.75
  },
  neutral: {
    neutral: 0.5,
    curiosity: 0.6,
    interest: 0.55,
    contemplation: 0.5,
    focus: 0.55
  }
};

// Feature extraction patterns
const features = {
  wordEmbeddings: EMOTION_KEYWORDS,
  contextualPatterns: CONTEXTUAL_PATTERNS,
  intensityMarkers: INTENSITY_MARKERS,
  emotionEmbeddings: EMOTION_EMBEDDINGS
};

// Extract features from text
const extractFeatures = (text) => {
  return {
    wordEmbeddings: extractWordEmbeddings(text),
    contextualPatterns: extractContextualPatterns(text),
    intensityMarkers: extractIntensityMarkers(text),
    emotionEmbeddings: extractEmotionEmbeddings(text)
  };
};

// Extract word embeddings
const extractWordEmbeddings = (text) => {
  const embeddings = {
    positive: 0,
    negative: 0,
    neutral: 0
  };

  for (const [category, words] of Object.entries(features.wordEmbeddings)) {
    embeddings[category] = words.reduce((count, word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      return count + (text.match(regex) || []).length;
    }, 0);
  }

  return embeddings;
};

// Extract contextual patterns
const extractContextualPatterns = (text) => {
  const patterns = {
    positive: 0,
    negative: 0
  };

  for (const pattern of features.contextualPatterns) {
    if (text.toLowerCase().includes(pattern.pattern)) {
      if (pattern.emotion in weights.positive) {
        patterns.positive += pattern.weight;
      } else {
        patterns.negative += pattern.weight;
      }
    }
  }

  return patterns;
};

// Extract intensity markers
const extractIntensityMarkers = (text) => {
  const intensity = {
    high: 0,
    low: 0
  };

  for (const [level, markers] of Object.entries(features.intensityMarkers)) {
    intensity[level] = markers.reduce((count, marker) => {
      const regex = new RegExp(`\\b${marker}\\b`, 'i');
      return count + (text.match(regex) || []).length;
    }, 0);
  }

  return intensity;
};

// Extract emotion embeddings
const extractEmotionEmbeddings = (text) => {
  const embeddings = {};
  
  // Initialize embeddings for each emotion
  Object.keys(features.emotionEmbeddings).forEach(emotion => {
    embeddings[emotion] = 0;
  });
  
  // Check for emotion keywords in text
  const textLower = text.toLowerCase();
  
  // Check for excited emotion
  if (textLower.includes('excited') || textLower.includes('thrilled') || 
      textLower.includes('can\'t wait') || textLower.includes('looking forward')) {
    embeddings.excited = 0.8;
  }
  
  // Check for interested emotion
  if (textLower.includes('interested') || textLower.includes('tell me more') || 
      textLower.includes('curious') || textLower.includes('sounds good')) {
    embeddings.interested = 0.7;
  }
  
  // Check for concerned emotion
  if (textLower.includes('concerned') || textLower.includes('worried') || 
      textLower.includes('not sure') || textLower.includes('hesitant')) {
    embeddings.concerned = 0.7;
  }
  
  // Check for frustrated emotion
  if (textLower.includes('frustrated') || textLower.includes('disappointed') || 
      textLower.includes('too much') || textLower.includes('problem') || 
      textLower.includes('issue') || textLower.includes('difficult')) {
    embeddings.frustrated = 0.8;
  }
  
  // If no specific emotion detected, set neutral
  const hasEmotion = Object.values(embeddings).some(value => value > 0);
  if (!hasEmotion) {
    embeddings.neutral = 0.5;
  }
  
  return embeddings;
};

// Calculate sentiment scores
const calculateSentimentScores = (features) => {
  const scores = {
    positive: 0,
    negative: 0,
    neutral: 0
  };

  // Calculate positive score
  scores.positive = (
    features.wordEmbeddings.positive * 0.3 +
    features.contextualPatterns.positive * 0.3 +
    features.intensityMarkers.high * 0.2 +
    (features.emotionEmbeddings.excited || 0) * 0.2
  );

  // Calculate negative score
  scores.negative = (
    features.wordEmbeddings.negative * 0.3 +
    features.contextualPatterns.negative * 0.3 +
    features.intensityMarkers.low * 0.1 +
    (features.emotionEmbeddings.frustrated || 0) * 0.3
  );

  // Calculate neutral score
  scores.neutral = (
    features.wordEmbeddings.neutral * 0.4 +
    (features.emotionEmbeddings.neutral || 0) * 0.6
  );

  return scores;
};

// Normalize scores
const normalizeScores = (scores) => {
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  if (total === 0) return { positive: 0, negative: 0, neutral: 1 };

  return {
    positive: scores.positive / total,
    negative: scores.negative / total,
    neutral: scores.neutral / total
  };
};

// Predict sentiment using the model
const predict = (text) => {
  const extractedFeatures = extractFeatures(text);
  const sentimentScores = calculateSentimentScores(extractedFeatures);
  return normalizeScores(sentimentScores);
};

// Get detailed emotion analysis
const analyzeEmotions = (text) => {
  const extractedFeatures = extractFeatures(text);
  const sentimentScores = calculateSentimentScores(extractedFeatures);
  const normalizedScores = normalizeScores(sentimentScores);
  
  // Determine primary emotion
  let primaryEmotion = 'neutral';
  let highestScore = 0;
  
  // Check emotion embeddings first
  Object.entries(extractedFeatures.emotionEmbeddings).forEach(([emotion, score]) => {
    if (score > highestScore) {
      primaryEmotion = emotion;
      highestScore = score;
    }
  });
  
  // If no strong emotion in embeddings, use sentiment scores
  if (highestScore < 0.5) {
    if (normalizedScores.positive > 0.6) {
      primaryEmotion = 'excited';
      highestScore = normalizedScores.positive;
    } else if (normalizedScores.negative > 0.6) {
      primaryEmotion = 'concerned';
      highestScore = normalizedScores.negative;
    }
  }
  
  return {
    sentimentScores: normalizedScores,
    primaryEmotion,
    intensity: highestScore,
    features: extractedFeatures
  };
};

export const sentimentModel = {
  predict,
  analyzeEmotions,
  extractFeatures,
  calculateSentimentScores,
  normalizeScores
}; 