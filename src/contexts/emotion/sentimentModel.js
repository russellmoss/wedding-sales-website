import { EMOTION_KEYWORDS, CONTEXTUAL_PATTERNS, INTENSITY_MARKERS } from './emotionTypes';

// Pre-trained weights for different emotional dimensions
const weights = {
  positive: {
    joy: 0.8,
    gratitude: 0.7,
    excitement: 0.75,
    hope: 0.65,
    confidence: 0.6
  },
  negative: {
    anger: 0.8,
    fear: 0.75,
    sadness: 0.7,
    disgust: 0.85,
    anxiety: 0.7
  },
  neutral: {
    neutral: 0.5,
    curiosity: 0.6,
    interest: 0.55
  }
};

// Feature extraction patterns
const features = {
  wordEmbeddings: EMOTION_KEYWORDS,
  contextualPatterns: CONTEXTUAL_PATTERNS,
  intensityMarkers: INTENSITY_MARKERS
};

// Extract features from text
const extractFeatures = (text) => {
  return {
    wordEmbeddings: extractWordEmbeddings(text),
    contextualPatterns: extractContextualPatterns(text),
    intensityMarkers: extractIntensityMarkers(text)
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

// Calculate sentiment scores
const calculateSentimentScores = (features) => {
  const scores = {
    positive: 0,
    negative: 0,
    neutral: 0
  };

  // Calculate positive score
  scores.positive = (
    features.wordEmbeddings.positive * 0.4 +
    features.contextualPatterns.positive * 0.4 +
    features.intensityMarkers.high * 0.2
  );

  // Calculate negative score
  scores.negative = (
    features.wordEmbeddings.negative * 0.4 +
    features.contextualPatterns.negative * 0.4 +
    features.intensityMarkers.low * 0.2
  );

  // Calculate neutral score
  scores.neutral = features.wordEmbeddings.neutral * 0.6;

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

export const sentimentModel = {
  predict,
  extractFeatures,
  calculateSentimentScores,
  normalizeScores
}; 