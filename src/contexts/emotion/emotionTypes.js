// Emotion types and patterns
export const EMOTION_TYPES = {
  POSITIVE: ['happy', 'excited', 'pleased', 'interested', 'hopeful', 'grateful', 'enthusiastic', 'optimistic', 'confident', 'satisfied', 'thrilled', 'delighted', 'impressed', 'relieved', 'trusting'],
  NEGATIVE: ['frustrated', 'angry', 'disappointed', 'worried', 'concerned', 'confused', 'doubtful', 'annoyed', 'skeptical', 'hesitant', 'anxious', 'overwhelmed', 'indifferent', 'bored', 'impatient'],
  NEUTRAL: ['neutral', 'curious', 'thinking', 'contemplative', 'reserved', 'attentive', 'focused', 'calm', 'balanced']
};

// Emotion keywords for detection
export const EMOTION_KEYWORDS = {
  positive: [
    'thank', 'appreciate', 'excited', 'happy', 'love', 'great', 'perfect', 
    'beautiful', 'amazing', 'wonderful', 'fantastic', 'excellent', 'pleased',
    'interested', 'looking forward', 'eager', 'delighted', 'glad', 'thrilled',
    'impressed', 'love it', 'can\'t wait', 'dream', 'ideal', 'perfect for',
    'exactly what', 'sounds perfect', 'love the', 'really like', 'definitely',
    'absolutely', 'sure', 'certainly', 'promise', 'guarantee', 'trust'
  ],
  negative: [
    'expensive', 'cost', 'price', 'budget', 'concern', 'worried', 'anxious',
    'disappointed', 'unhappy', 'unclear', 'confused', 'frustrated', 'annoyed',
    'surprised', 'difficult', 'pass', 'other venues', 'elsewhere', 'reconsider',
    'not sure', 'hesitant', 'too much', 'problem', 'issue', 'difficult',
    'complicated', 'overwhelming', 'not what', 'don\'t like', 'prefer',
    'better', 'cheaper', 'afford', 'spend', 'investment', 'value'
  ],
  neutral: [
    'think', 'consider', 'maybe', 'possibly', 'perhaps', 'might', 'could',
    'would', 'should', 'need', 'want', 'looking', 'searching', 'finding',
    'tell me more', 'explain', 'describe', 'how', 'what', 'when', 'where',
    'why', 'who', 'which', 'how much', 'how many', 'how long', 'how often',
    'how far', 'how close', 'how big', 'how small', 'how many people'
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
  { 
    pattern: 'love it', 
    context: 'enthusiasm', 
    emotion: 'excited', 
    intensity: 0.8,
    weight: 3.5
  },
  { 
    pattern: 'perfect for', 
    context: 'satisfaction', 
    emotion: 'satisfied', 
    intensity: 0.75,
    weight: 3.2
  },
  { 
    pattern: 'can\'t wait', 
    context: 'anticipation', 
    emotion: 'excited', 
    intensity: 0.85,
    weight: 3.7
  },
  { 
    pattern: 'dream', 
    context: 'aspiration', 
    emotion: 'hopeful', 
    intensity: 0.7,
    weight: 3.0
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
  },
  { 
    pattern: 'don\'t like', 
    context: 'disapproval', 
    emotion: 'disappointed', 
    intensity: 0.75,
    weight: 3.2
  },
  { 
    pattern: 'too much', 
    context: 'overwhelm', 
    emotion: 'overwhelmed', 
    intensity: 0.7,
    weight: 3.0
  },
  { 
    pattern: 'problem', 
    context: 'obstacle', 
    emotion: 'frustrated', 
    intensity: 0.8,
    weight: 3.5
  },
  { 
    pattern: 'other venues', 
    context: 'comparison', 
    emotion: 'skeptical', 
    intensity: 0.65,
    weight: 2.8
  }
];

// Intensity markers
export const INTENSITY_MARKERS = {
  high: ['!', '!!', '!!!', 'really', 'very', 'extremely', 'absolutely', 'definitely', 'completely', 'totally', 'so', 'such', 'incredibly', 'amazingly', 'unbelievably'],
  low: ['kind of', 'sort of', 'maybe', 'perhaps', 'a little', 'somewhat', 'slightly', 'barely', 'hardly', 'not really', 'not very', 'not too']
};

// Emotion embeddings for ML-based analysis
export const EMOTION_EMBEDDINGS = {
  excited: [0.8, 0.7, 0.6, 0.2, 0.1, 0.1],
  interested: [0.6, 0.5, 0.4, 0.3, 0.2, 0.1],
  concerned: [0.1, 0.2, 0.3, 0.7, 0.6, 0.5],
  frustrated: [0.1, 0.1, 0.2, 0.8, 0.7, 0.6],
  neutral: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3]
};

// Initial emotional state
export const INITIAL_EMOTIONAL_STATE = {
  currentEmotion: 'neutral',
  intensity: 0.5,
  history: [],
  negativeSpikes: []
}; 