/**
 * Returns a color code based on the emotion type
 * @param {string} emotion - The emotion to get the color for
 * @returns {string} - The color code in hex format
 */
export const getEmotionColor = (emotion) => {
  const emotionColors = {
    happy: '#4CAF50', // Green
    sad: '#2196F3',   // Blue
    angry: '#F44336', // Red
    neutral: '#9E9E9E', // Grey
    excited: '#FF9800', // Orange
    confused: '#9C27B0', // Purple
    worried: '#FFC107', // Amber
    satisfied: '#8BC34A', // Light Green
    disappointed: '#607D8B', // Blue Grey
    frustrated: '#E91E63', // Pink
    hopeful: '#00BCD4', // Cyan
    annoyed: '#FF5722', // Deep Orange
    default: '#9E9E9E'  // Default grey
  };

  return emotionColors[emotion?.toLowerCase()] || emotionColors.default;
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

  return emotionEmojis[emotion?.toLowerCase()] || emotionEmojis.default;
}; 