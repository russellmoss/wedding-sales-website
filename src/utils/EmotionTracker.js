/**
 * Creates an enhanced emotion tracking system for sales conversations
 * @param {Array} messages - The conversation transcript
 * @returns {Object} - Emotional journey data for feedback
 */
class EmotionTracker {
  constructor() {
    this.emotionKeywords = {
      excited: ['excited', 'can\'t wait', 'thrilled', 'looking forward', 'perfect', 'dream', 'amazing', 'love', 'beautiful', 'wonderful', 'fantastic', 'excellent', 'impressed', 'delighted', 'glad'],
      interested: ['interested', 'tell me more', 'curious', 'sounds good', 'like to know', 'explain', 'describe', 'how', 'what', 'when', 'where', 'why', 'who', 'which'],
      concerned: ['worried', 'concerned', 'not sure', 'hesitant', 'budget', 'expensive', 'cost', 'afford', 'anxious', 'disappointed', 'unhappy', 'unclear', 'confused', 'skeptical', 'overwhelmed'],
      frustrated: ['frustrated', 'disappointed', 'too much', 'problem', 'issue', 'difficult', 'complicated', 'overwhelming', 'not what', 'don\'t like', 'prefer', 'better', 'cheaper', 'spend', 'investment']
    };
    
    this.emotionIntensifiers = [
      '!', '!!', '!!!', 'very', 'really', 'extremely', 'absolutely', 'definitely', 
      'completely', 'totally', 'so', 'such', 'incredibly', 'amazingly', 'unbelievably'
    ];
    
    this.emotionJourney = [];
  }
  
  /**
   * Analyzes a message for emotional content
   * @param {string} message - The message to analyze
   * @param {string} sender - The sender of the message ('client' or 'sales')
   * @returns {Object|null} - Emotion analysis results or null if not a client message
   */
  analyzeMessage(message, sender) {
    if (sender !== 'client') return null;
    
    const text = message.toLowerCase();
    const emotions = {};
    
    // Calculate base emotion scores
    Object.entries(this.emotionKeywords).forEach(([emotion, keywords]) => {
      emotions[emotion] = 0;
      
      keywords.forEach(keyword => {
        if (text.includes(keyword)) {
          emotions[emotion] += 1;
          
          // Check for intensifiers near the keyword
          this.emotionIntensifiers.forEach(intensifier => {
            const pattern = new RegExp(`${intensifier}\\s+\\w{0,10}\\s*${keyword}|${keyword}\\s+\\w{0,10}\\s*${intensifier}`, 'i');
            if (pattern.test(text)) {
              emotions[emotion] += 0.5;
            }
          });
        }
      });
    });
    
    // Check for contextual patterns
    this.checkContextualPatterns(text, emotions);
    
    // Check for explicit emotion statements
    this.checkExplicitEmotionStatements(text, emotions);
    
    // Normalize scores
    const totalScore = Object.values(emotions).reduce((sum, score) => sum + score, 0);
    if (totalScore > 0) {
      Object.keys(emotions).forEach(emotion => {
        emotions[emotion] = emotions[emotion] / totalScore;
      });
    }
    
    // Determine primary emotion
    let primaryEmotion = 'neutral';
    let highestScore = 0;
    
    Object.entries(emotions).forEach(([emotion, score]) => {
      if (score > highestScore && score > 0.3) { // Threshold for detecting emotion
        primaryEmotion = emotion;
        highestScore = score;
      }
    });
    
    // Record emotion in journey
    this.emotionJourney.push({
      text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      emotion: primaryEmotion,
      intensity: highestScore,
      emotions: emotions,
      timestamp: new Date().toISOString()
    });
    
    return {
      emotion: primaryEmotion,
      intensity: highestScore,
      emotions: emotions
    };
  }
  
  /**
   * Checks for contextual patterns in the text
   * @param {string} text - The text to analyze
   * @param {Object} emotions - The emotions object to update
   */
  checkContextualPatterns(text, emotions) {
    // Check for budget concerns
    if (text.includes('budget') || text.includes('cost') || text.includes('price')) {
      if (text.includes('high') || text.includes('expensive') || text.includes('afford')) {
        emotions.concerned += 1.5;
      }
    }
    
    // Check for venue appreciation
    if (text.includes('beautiful') || text.includes('amazing') || text.includes('perfect')) {
      if (text.includes('venue') || text.includes('place') || text.includes('space')) {
        emotions.excited += 1.5;
      }
    }
    
    // Check for uncertainty
    if (text.includes('not sure') || text.includes('maybe') || text.includes('possibly')) {
      emotions.concerned += 1;
    }
    
    // Check for enthusiasm
    if (text.includes('love') || text.includes('exactly what') || text.includes('perfect for')) {
      emotions.excited += 1.5;
    }
    
    // Check for frustration
    if (text.includes('too much') || text.includes('problem') || text.includes('issue')) {
      emotions.frustrated += 1.5;
    }
  }
  
  /**
   * Checks for explicit emotion statements in the text
   * @param {string} text - The text to analyze
   * @param {Object} emotions - The emotions object to update
   */
  checkExplicitEmotionStatements(text, emotions) {
    // Check for explicit emotion statements
    if (text.includes('i am excited') || text.includes('i\'m excited')) {
      emotions.excited += 2;
    }
    
    if (text.includes('i am interested') || text.includes('i\'m interested')) {
      emotions.interested += 2;
    }
    
    if (text.includes('i am concerned') || text.includes('i\'m concerned')) {
      emotions.concerned += 2;
    }
    
    if (text.includes('i am frustrated') || text.includes('i\'m frustrated')) {
      emotions.frustrated += 2;
    }
    
    // Check for emotion questions
    if (text.includes('are you excited') || text.includes('are you interested')) {
      emotions.interested += 0.5;
    }
  }
  
  /**
   * Gets the emotional journey data
   * @returns {Object} - Emotional journey data
   */
  getEmotionalJourney() {
    // Analyze the emotional journey
    const emotionalShifts = [];
    let previousEmotion = null;
    
    this.emotionJourney.forEach((record, index) => {
      if (index > 0 && record.emotion !== previousEmotion) {
        emotionalShifts.push({
          from: previousEmotion,
          to: record.emotion,
          text: record.text,
          timestamp: record.timestamp
        });
      }
      previousEmotion = record.emotion;
    });
    
    // Find negative emotion spikes
    const negativeEmotions = ['concerned', 'frustrated'];
    const negativeSpikes = this.emotionJourney.filter(record => 
      negativeEmotions.includes(record.emotion) && record.intensity > 0.5
    );
    
    // Calculate emotion statistics
    const emotionStats = this.calculateEmotionStats();
    
    // Generate feedback based on emotional journey
    const feedback = this.generateFeedback(emotionalShifts, negativeSpikes, emotionStats);
    
    return {
      journey: this.emotionJourney,
      shifts: emotionalShifts,
      negativeSpikes: negativeSpikes,
      finalEmotion: this.emotionJourney.length > 0 ? 
        this.emotionJourney[this.emotionJourney.length - 1].emotion : 'neutral',
      stats: emotionStats,
      feedback: feedback
    };
  }
  
  /**
   * Calculates statistics about the emotional journey
   * @returns {Object} - Emotion statistics
   */
  calculateEmotionStats() {
    const stats = {
      emotionCounts: {},
      averageIntensity: 0,
      emotionChanges: 0,
      negativeEmotionPercentage: 0,
      positiveEmotionPercentage: 0,
      neutralEmotionPercentage: 0
    };
    
    // Count occurrences of each emotion
    this.emotionJourney.forEach(record => {
      stats.emotionCounts[record.emotion] = (stats.emotionCounts[record.emotion] || 0) + 1;
    });
    
    // Calculate average intensity
    const totalIntensity = this.emotionJourney.reduce((sum, record) => sum + record.intensity, 0);
    stats.averageIntensity = this.emotionJourney.length > 0 ? totalIntensity / this.emotionJourney.length : 0;
    
    // Count emotion changes
    let previousEmotion = null;
    this.emotionJourney.forEach(record => {
      if (record.emotion !== previousEmotion) {
        stats.emotionChanges++;
      }
      previousEmotion = record.emotion;
    });
    
    // Calculate emotion percentages
    const totalEmotions = this.emotionJourney.length;
    if (totalEmotions > 0) {
      const negativeCount = this.emotionJourney.filter(record => 
        ['concerned', 'frustrated'].includes(record.emotion)
      ).length;
      
      const positiveCount = this.emotionJourney.filter(record => 
        ['excited', 'interested'].includes(record.emotion)
      ).length;
      
      const neutralCount = totalEmotions - negativeCount - positiveCount;
      
      stats.negativeEmotionPercentage = (negativeCount / totalEmotions) * 100;
      stats.positiveEmotionPercentage = (positiveCount / totalEmotions) * 100;
      stats.neutralEmotionPercentage = (neutralCount / totalEmotions) * 100;
    }
    
    return stats;
  }
  
  /**
   * Generates feedback based on the emotional journey
   * @param {Array} emotionalShifts - The emotional shifts in the journey
   * @param {Array} negativeSpikes - The negative emotion spikes
   * @param {Object} emotionStats - The emotion statistics
   * @returns {Object} - Feedback on the emotional journey
   */
  generateFeedback(emotionalShifts, negativeSpikes, emotionStats) {
    const feedback = {
      strengths: [],
      areasForImprovement: [],
      recommendations: []
    };
    
    // Analyze emotional stability
    if (emotionalShifts.length <= 2) {
      feedback.strengths.push('Maintained emotional stability throughout the conversation');
    } else if (emotionalShifts.length >= 5) {
      feedback.areasForImprovement.push('Client showed significant emotional volatility');
      feedback.recommendations.push('Work on providing more consistent information and addressing concerns promptly');
    }
    
    // Analyze negative spikes
    if (negativeSpikes.length === 0) {
      feedback.strengths.push('Successfully managed client emotions with no significant negative spikes');
    } else {
      feedback.areasForImprovement.push(`Client experienced ${negativeSpikes.length} significant negative emotion spikes`);
      
      // Analyze the causes of negative spikes
      const budgetRelatedSpikes = negativeSpikes.filter(spike => 
        spike.text.includes('budget') || spike.text.includes('cost') || spike.text.includes('price')
      );
      
      if (budgetRelatedSpikes.length > 0) {
        feedback.recommendations.push('Address budget concerns more proactively and provide clear value propositions');
      }
      
      const frustrationSpikes = negativeSpikes.filter(spike => 
        spike.text.includes('frustrated') || spike.text.includes('disappointed') || spike.text.includes('problem')
      );
      
      if (frustrationSpikes.length > 0) {
        feedback.recommendations.push('Improve clarity in explanations and address client concerns more directly');
      }
    }
    
    // Analyze final emotion
    const finalEmotion = this.emotionJourney.length > 0 ? 
      this.emotionJourney[this.emotionJourney.length - 1].emotion : 'neutral';
    
    if (['excited', 'interested'].includes(finalEmotion)) {
      feedback.strengths.push('Ended the conversation on a positive note');
    } else if (['concerned', 'frustrated'].includes(finalEmotion)) {
      feedback.areasForImprovement.push('Ended the conversation with client still showing negative emotions');
      feedback.recommendations.push('Develop better closing techniques to ensure client leaves with positive emotions');
    }
    
    // Analyze emotion percentages
    if (emotionStats.positiveEmotionPercentage > 60) {
      feedback.strengths.push('Maintained predominantly positive emotions throughout the conversation');
    } else if (emotionStats.negativeEmotionPercentage > 40) {
      feedback.areasForImprovement.push('Client showed significant negative emotions during the conversation');
      feedback.recommendations.push('Focus on building rapport and addressing concerns more effectively');
    }
    
    return feedback;
  }
}

export default EmotionTracker; 