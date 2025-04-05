// Emotion types and patterns
export const EMOTION_TYPES = {
  POSITIVE: ['happy', 'excited', 'pleased', 'interested', 'hopeful', 'grateful', 'enthusiastic', 'optimistic', 'confident', 'satisfied'],
  NEGATIVE: ['frustrated', 'angry', 'disappointed', 'worried', 'concerned', 'confused', 'doubtful', 'annoyed'],
  NEUTRAL: ['neutral', 'curious', 'thinking']
};

// Emotion keywords for detection
export const EMOTION_KEYWORDS = {
  positive: [
    'thank', 'appreciate', 'excited', 'happy', 'love', 'great', 'perfect', 
    'beautiful', 'amazing', 'wonderful', 'fantastic', 'excellent', 'pleased',
    'interested', 'looking forward', 'eager', 'delighted', 'glad', 'thrilled'
  ],
  negative: [
    'expensive', 'cost', 'price', 'budget', 'concern', 'worried', 'anxious',
    'disappointed', 'unhappy', 'unclear', 'confused', 'frustrated', 'annoyed',
    'surprised', 'difficult', 'pass', 'other venues', 'elsewhere', 'reconsider'
  ],
  neutral: [
    'think', 'consider', 'maybe', 'possibly', 'perhaps', 'might', 'could',
    'would', 'should', 'need', 'want', 'looking', 'searching', 'finding'
  ]
};

// Contextual patterns for emotion detection
export const CONTEXTUAL_PATTERNS = [
  // Positive patterns
  { 
    pattern: 'thanks', 
    context: 'gratitude', 
    emotion: 'grateful', 
    intensity: 0.7,
    weight: 3.0
  },
  { 
    pattern: 'sounds good', 
    context: 'agreement', 
    emotion: 'pleased', 
    intensity: 0.6,
    weight: 2.5
  },
  // Negative patterns
  { 
    pattern: 'too expensive', 
    context: 'budget', 
    emotion: 'concerned', 
    intensity: 0.7,
    weight: 3.0
  },
  { 
    pattern: 'not sure', 
    context: 'uncertainty', 
    emotion: 'confused', 
    intensity: 0.6,
    weight: 2.5
  }
];

// Intensity markers
export const INTENSITY_MARKERS = {
  high: ['!', '!!', '!!!', 'really', 'very', 'extremely'],
  low: ['kind of', 'sort of', 'maybe', 'perhaps']
};

// Initial emotional state
export const INITIAL_EMOTIONAL_STATE = {
  currentEmotion: 'neutral',
  intensity: 0.5,
  history: [],
  negativeSpikes: []
}; 