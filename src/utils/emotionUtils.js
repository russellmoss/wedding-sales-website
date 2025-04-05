/**
 * Returns a color code based on the emotion type
 * @param {string} emotion - The emotion to get the color for
 * @returns {string} - The color code in hex format
 */
export const getEmotionColor = (emotion) => {
  // Return a default color if emotion is undefined or null
  if (!emotion) {
    return '#9E9E9E'; // Default grey color
  }
  
  switch (emotion.toLowerCase()) {
    // Positive emotions
    case 'happy':
    case 'excited':
    case 'enthusiastic':
    case 'delighted':
    case 'pleased':
    case 'very_positive':
      return '#4CAF50'; // Green
    case 'hopeful':
    case 'optimistic':
    case 'confident':
      return '#FF9800'; // Orange
    case 'curious':
    case 'interested':
    case 'engaged':
    case 'positive':
      return '#9C27B0'; // Purple
    case 'grateful':
    case 'appreciative':
    case 'satisfied':
      return '#00BCD4'; // Cyan
    case 'thrilled':
    case 'eager':
    case 'ecstatic':
      return '#8BC34A'; // Light Green
      
    // Neutral emotions
    case 'neutral':
    case 'calm':
    case 'composed':
    case 'attentive':
      return '#9E9E9E'; // Grey
      
    // Negative emotions
    case 'concerned':
    case 'worried':
    case 'anxious':
    case 'hesitant':
      return '#FFC107'; // Yellow
    case 'frustrated':
    case 'angry':
    case 'irritated':
    case 'annoyed':
    case 'very_negative':
      return '#F44336'; // Red
    case 'sad':
    case 'disappointed':
    case 'unhappy':
    case 'negative':
      return '#2196F3'; // Blue
    case 'confused':
    case 'uncertain':
    case 'doubtful':
    case 'skeptical':
      return '#795548'; // Brown
    case 'impatient':
    case 'rushed':
    case 'pressured':
      return '#E91E63'; // Pink
    case 'surprised':
    case 'shocked':
    case 'taken_aback':
      return '#673AB7'; // Deep Purple
    default:
      return '#9E9E9E'; // Default grey color
  }
};

/**
 * Returns a background color based on the emotion type
 * @param {string} emotion - The emotion to get the background color for
 * @returns {string} - The background color code in hex format
 */
export const getEmotionBackgroundColor = (emotion) => {
  const emotionBgColors = {
    happy: '#E8F5E9', // Light Green
    sad: '#E3F2FD',   // Light Blue
    angry: '#FFEBEE', // Light Red
    neutral: '#F5F5F5', // Light Grey
    excited: '#FFF3E0', // Light Orange
    confused: '#F3E5F5', // Light Purple
    worried: '#FFF8E1', // Light Amber
    satisfied: '#F1F8E9', // Light Light Green
    disappointed: '#ECEFF1', // Light Blue Grey
    frustrated: '#FCE4EC', // Light Pink
    hopeful: '#E0F7FA', // Light Cyan
    annoyed: '#FBE9E7', // Light Deep Orange
    default: '#F5F5F5'  // Default Light Grey
  };

  return emotionBgColors[emotion?.toLowerCase()] || emotionBgColors.default;
};

/**
 * Returns an emoji based on the emotion type
 * @param {string} emotion - The emotion to get the emoji for
 * @returns {string} - The emoji representing the emotion
 */
export const getEmotionEmoji = (emotion) => {
  if (!emotion) return '😐'; // Return default emoji if emotion is undefined
  
  const emotionEmojis = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    neutral: '😐',
    excited: '🤩',
    confused: '😕',
    worried: '😟',
    satisfied: '😌',
    disappointed: '😞',
    frustrated: '😤',
    hopeful: '🤗',
    annoyed: '😒',
    default: '😐'
  };

  return emotionEmojis[emotion.toLowerCase()] || emotionEmojis.default;
}; 