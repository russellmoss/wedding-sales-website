import { analyzeConversationEmotions } from './emotionIntegration';
import { analyzeConversationForCriteria } from './evaluationUtils';

/**
 * Implements accurate scoring system for sales conversation evaluation
 * @param {Array} messages - Array of conversation messages
 * @param {Object} criteria - Evaluation criteria with weights
 * @param {Object} emotionTracker - Emotion tracking instance
 * @returns {Object} Detailed scoring and feedback
 */
export function implementAccurateScoring(messages, criteria, emotionTracker) {
  // Analyze conversation for emotional content
  const emotionAnalysis = analyzeConversationEmotions(messages, {
    scenario: criteria.scenario,
    type: criteria.type
  });

  // Analyze conversation for criteria evidence
  const criteriaAnalysis = analyzeConversationForCriteria(messages, criteria);

  // Calculate scores for each criterion
  const scores = calculateCriterionScores(criteriaAnalysis, emotionAnalysis, criteria);

  // Generate detailed feedback
  const feedback = generateDetailedFeedback(scores, criteriaAnalysis, emotionAnalysis);

  // Calculate overall score
  const overallScore = calculateOverallScore(scores, criteria.weights);

  return {
    scores,
    feedback,
    overallScore,
    emotionAnalysis,
    criteriaAnalysis
  };
}

/**
 * Calculate scores for each evaluation criterion
 * @param {Object} criteriaAnalysis - Analysis of criteria evidence
 * @param {Object} emotionAnalysis - Analysis of emotional content
 * @param {Object} criteria - Evaluation criteria with weights
 * @returns {Object} Scores for each criterion
 */
function calculateCriterionScores(criteriaAnalysis, emotionAnalysis, criteria) {
  const scores = {};

  // Calculate preparation score
  scores.preparation = calculatePreparationScore(criteriaAnalysis, criteria);

  // Calculate rapport score
  scores.rapport = calculateRapportScore(criteriaAnalysis, emotionAnalysis, criteria);

  // Calculate budget discussion score
  scores.budgetDiscussion = calculateBudgetScore(criteriaAnalysis, criteria);

  // Calculate objection handling score
  scores.objectionHandling = calculateObjectionScore(criteriaAnalysis, criteria);

  // Calculate closing score
  scores.closing = calculateClosingScore(criteriaAnalysis, criteria);

  return scores;
}

/**
 * Calculate preparation score
 * @param {Object} criteriaAnalysis - Analysis of criteria evidence
 * @param {Object} criteria - Evaluation criteria with weights
 * @returns {number} Preparation score
 */
function calculatePreparationScore(criteriaAnalysis, criteria) {
  const { preparation } = criteriaAnalysis;
  const weight = criteria.weights.preparation || 1;

  let score = 0;
  let totalWeight = 0;

  // Research and planning
  if (preparation.research) {
    score += 0.3 * weight;
    totalWeight += 0.3;
  }
  if (preparation.planning) {
    score += 0.3 * weight;
    totalWeight += 0.3;
  }

  // Materials and tools
  if (preparation.materials) {
    score += 0.2 * weight;
    totalWeight += 0.2;
  }
  if (preparation.tools) {
    score += 0.2 * weight;
    totalWeight += 0.2;
  }

  return totalWeight > 0 ? (score / totalWeight) * 100 : 0;
}

/**
 * Calculate rapport score
 * @param {Object} criteriaAnalysis - Analysis of criteria evidence
 * @param {Object} emotionAnalysis - Analysis of emotional content
 * @param {Object} criteria - Evaluation criteria with weights
 * @returns {number} Rapport score
 */
function calculateRapportScore(criteriaAnalysis, emotionAnalysis, criteria) {
  const { rapport } = criteriaAnalysis;
  const weight = criteria.weights.rapport || 1;

  let score = 0;
  let totalWeight = 0;

  // Active listening
  if (rapport.activeListening) {
    score += 0.3 * weight;
    totalWeight += 0.3;
  }

  // Personal connection
  if (rapport.personalConnection) {
    score += 0.3 * weight;
    totalWeight += 0.3;
  }

  // Emotional intelligence
  if (rapport.emotionalIntelligence) {
    score += 0.4 * weight;
    totalWeight += 0.4;
  }

  // Adjust score based on emotional journey
  if (emotionAnalysis.emotionalJourney) {
    const emotionalScore = calculateEmotionalScore(emotionAnalysis);
    score = (score + emotionalScore) / 2;
  }

  return totalWeight > 0 ? (score / totalWeight) * 100 : 0;
}

/**
 * Calculate budget discussion score
 * @param {Object} criteriaAnalysis - Analysis of criteria evidence
 * @param {Object} criteria - Evaluation criteria with weights
 * @returns {number} Budget discussion score
 */
function calculateBudgetScore(criteriaAnalysis, criteria) {
  const { budgetDiscussion } = criteriaAnalysis;
  const weight = criteria.weights.budgetDiscussion || 1;

  let score = 0;
  let totalWeight = 0;

  // Budget exploration
  if (budgetDiscussion.exploration) {
    score += 0.4 * weight;
    totalWeight += 0.4;
  }

  // Value proposition
  if (budgetDiscussion.valueProposition) {
    score += 0.3 * weight;
    totalWeight += 0.3;
  }

  // Budget alignment
  if (budgetDiscussion.alignment) {
    score += 0.3 * weight;
    totalWeight += 0.3;
  }

  return totalWeight > 0 ? (score / totalWeight) * 100 : 0;
}

/**
 * Calculate objection handling score
 * @param {Object} criteriaAnalysis - Analysis of criteria evidence
 * @param {Object} criteria - Evaluation criteria with weights
 * @returns {number} Objection handling score
 */
function calculateObjectionScore(criteriaAnalysis, criteria) {
  const { objectionHandling } = criteriaAnalysis;
  const weight = criteria.weights.objectionHandling || 1;

  let score = 0;
  let totalWeight = 0;

  // Acknowledgment
  if (objectionHandling.acknowledgment) {
    score += 0.3 * weight;
    totalWeight += 0.3;
  }

  // Response quality
  if (objectionHandling.responseQuality) {
    score += 0.4 * weight;
    totalWeight += 0.4;
  }

  // Resolution
  if (objectionHandling.resolution) {
    score += 0.3 * weight;
    totalWeight += 0.3;
  }

  return totalWeight > 0 ? (score / totalWeight) * 100 : 0;
}

/**
 * Calculate closing score
 * @param {Object} criteriaAnalysis - Analysis of criteria evidence
 * @param {Object} criteria - Evaluation criteria with weights
 * @returns {number} Closing score
 */
function calculateClosingScore(criteriaAnalysis, criteria) {
  const { closing } = criteriaAnalysis;
  const weight = criteria.weights.closing || 1;

  let score = 0;
  let totalWeight = 0;

  // Closing attempt
  if (closing.attempt) {
    score += 0.4 * weight;
    totalWeight += 0.4;
  }

  // Next steps
  if (closing.nextSteps) {
    score += 0.3 * weight;
    totalWeight += 0.3;
  }

  // Follow-up
  if (closing.followUp) {
    score += 0.3 * weight;
    totalWeight += 0.3;
  }

  return totalWeight > 0 ? (score / totalWeight) * 100 : 0;
}

/**
 * Calculate emotional score based on emotional journey
 * @param {Object} emotionAnalysis - Analysis of emotional content
 * @returns {number} Emotional score
 */
function calculateEmotionalScore(emotionAnalysis) {
  const { emotionalJourney, emotionStats } = emotionAnalysis;
  
  if (!emotionalJourney || !emotionStats) return 0;

  let score = 0;
  let totalWeight = 0;

  // Positive emotion ratio
  const positiveRatio = emotionStats.positiveCount / 
    (emotionStats.positiveCount + emotionStats.negativeCount + emotionStats.neutralCount);
  score += positiveRatio * 0.4;
  totalWeight += 0.4;

  // Average intensity
  score += (emotionStats.averageIntensity || 0) * 0.3;
  totalWeight += 0.3;

  // Emotional progression
  const progressionScore = calculateEmotionalProgression(emotionalJourney);
  score += progressionScore * 0.3;
  totalWeight += 0.3;

  return totalWeight > 0 ? (score / totalWeight) * 100 : 0;
}

/**
 * Calculate emotional progression score
 * @param {Array} emotionalJourney - Array of emotional states
 * @returns {number} Progression score
 */
function calculateEmotionalProgression(emotionalJourney) {
  if (!emotionalJourney || emotionalJourney.length < 2) return 0;

  let progressionScore = 0;
  let comparisons = 0;

  // Compare consecutive emotional states
  for (let i = 1; i < emotionalJourney.length; i++) {
    const prev = emotionalJourney[i - 1];
    const curr = emotionalJourney[i];

    // Check for positive progression
    if (curr.intensity > prev.intensity && 
        (curr.emotion === 'excited' || curr.emotion === 'interested')) {
      progressionScore += 1;
    }
    // Check for maintained positive state
    else if (curr.intensity >= prev.intensity && 
             (curr.emotion === 'excited' || curr.emotion === 'interested')) {
      progressionScore += 0.5;
    }
    // Check for recovery from negative
    else if (prev.emotion === 'frustrated' && 
             (curr.emotion === 'interested' || curr.emotion === 'neutral')) {
      progressionScore += 0.75;
    }

    comparisons++;
  }

  return comparisons > 0 ? progressionScore / comparisons : 0;
}

/**
 * Calculate overall score
 * @param {Object} scores - Individual criterion scores
 * @param {Object} weights - Criterion weights
 * @returns {number} Overall score
 */
function calculateOverallScore(scores, weights) {
  let totalScore = 0;
  let totalWeight = 0;

  for (const [criterion, score] of Object.entries(scores)) {
    const weight = weights[criterion] || 1;
    totalScore += score * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? totalScore / totalWeight : 0;
}

/**
 * Generate detailed feedback
 * @param {Object} scores - Individual criterion scores
 * @param {Object} criteriaAnalysis - Analysis of criteria evidence
 * @param {Object} emotionAnalysis - Analysis of emotional content
 * @returns {Object} Detailed feedback
 */
function generateDetailedFeedback(scores, criteriaAnalysis, emotionAnalysis) {
  return {
    preparation: generateCriterionFeedback('preparation', scores.preparation, criteriaAnalysis.preparation),
    rapport: generateCriterionFeedback('rapport', scores.rapport, criteriaAnalysis.rapport, emotionAnalysis),
    budgetDiscussion: generateCriterionFeedback('budgetDiscussion', scores.budgetDiscussion, criteriaAnalysis.budgetDiscussion),
    objectionHandling: generateCriterionFeedback('objectionHandling', scores.objectionHandling, criteriaAnalysis.objectionHandling),
    closing: generateCriterionFeedback('closing', scores.closing, criteriaAnalysis.closing),
    emotional: generateEmotionalFeedback(emotionAnalysis)
  };
}

/**
 * Generate feedback for a specific criterion
 * @param {string} criterion - Criterion name
 * @param {number} score - Criterion score
 * @param {Object} analysis - Criterion analysis
 * @param {Object} emotionAnalysis - Emotional analysis (optional)
 * @returns {Object} Criterion feedback
 */
function generateCriterionFeedback(criterion, score, analysis, emotionAnalysis = null) {
  const feedback = {
    score,
    strengths: [],
    areasForImprovement: [],
    recommendations: []
  };

  // Add criterion-specific feedback
  switch (criterion) {
    case 'preparation':
      if (analysis.research) feedback.strengths.push('Thorough research demonstrated');
      if (analysis.planning) feedback.strengths.push('Well-planned approach');
      if (!analysis.materials) feedback.areasForImprovement.push('Prepare relevant materials');
      if (!analysis.tools) feedback.areasForImprovement.push('Utilize available tools effectively');
      break;

    case 'rapport':
      if (analysis.activeListening) feedback.strengths.push('Strong active listening skills');
      if (analysis.personalConnection) feedback.strengths.push('Effective personal connection');
      if (analysis.emotionalIntelligence) feedback.strengths.push('Good emotional intelligence');
      if (emotionAnalysis) {
        const emotionalFeedback = generateEmotionalFeedback(emotionAnalysis);
        feedback.strengths.push(...emotionalFeedback.strengths);
        feedback.areasForImprovement.push(...emotionalFeedback.areasForImprovement);
      }
      break;

    case 'budgetDiscussion':
      if (analysis.exploration) feedback.strengths.push('Thorough budget exploration');
      if (analysis.valueProposition) feedback.strengths.push('Strong value proposition');
      if (analysis.alignment) feedback.strengths.push('Effective budget alignment');
      if (!analysis.exploration) feedback.areasForImprovement.push('Explore budget more thoroughly');
      if (!analysis.valueProposition) feedback.areasForImprovement.push('Strengthen value proposition');
      break;

    case 'objectionHandling':
      if (analysis.acknowledgment) feedback.strengths.push('Good objection acknowledgment');
      if (analysis.responseQuality) feedback.strengths.push('Quality responses to objections');
      if (analysis.resolution) feedback.strengths.push('Effective objection resolution');
      if (!analysis.acknowledgment) feedback.areasForImprovement.push('Acknowledge objections more effectively');
      if (!analysis.resolution) feedback.areasForImprovement.push('Focus on objection resolution');
      break;

    case 'closing':
      if (analysis.attempt) feedback.strengths.push('Clear closing attempt');
      if (analysis.nextSteps) feedback.strengths.push('Well-defined next steps');
      if (analysis.followUp) feedback.strengths.push('Good follow-up plan');
      if (!analysis.attempt) feedback.areasForImprovement.push('Make closing attempts more explicit');
      if (!analysis.nextSteps) feedback.areasForImprovement.push('Define clear next steps');
      break;
  }

  // Add general recommendations based on score
  if (score < 70) {
    feedback.recommendations.push(`Focus on improving ${criterion} through targeted practice`);
  } else if (score < 90) {
    feedback.recommendations.push(`Maintain and refine ${criterion} skills`);
  } else {
    feedback.recommendations.push(`Continue excelling in ${criterion}`);
  }

  return feedback;
}

/**
 * Generate emotional feedback
 * @param {Object} emotionAnalysis - Analysis of emotional content
 * @returns {Object} Emotional feedback
 */
function generateEmotionalFeedback(emotionAnalysis) {
  const feedback = {
    strengths: [],
    areasForImprovement: [],
    recommendations: []
  };

  if (!emotionAnalysis) return feedback;

  const { emotionalJourney, emotionStats, frustrationAnalysis } = emotionAnalysis;

  // Analyze emotional journey
  if (emotionalJourney && emotionalJourney.length > 0) {
    const positiveEmotions = emotionalJourney.filter(e => 
      e.emotion === 'excited' || e.emotion === 'interested'
    ).length;
    const positiveRatio = positiveEmotions / emotionalJourney.length;

    if (positiveRatio > 0.7) {
      feedback.strengths.push('Strong positive emotional engagement');
    } else if (positiveRatio < 0.3) {
      feedback.areasForImprovement.push('Need to improve positive emotional engagement');
    }
  }

  // Analyze emotion stats
  if (emotionStats) {
    if (emotionStats.positiveCount > emotionStats.negativeCount) {
      feedback.strengths.push('Maintained predominantly positive emotions');
    }
    if (emotionStats.negativeCount > emotionStats.positiveCount) {
      feedback.areasForImprovement.push('High proportion of negative emotions');
    }
  }

  // Analyze frustration patterns
  if (frustrationAnalysis) {
    if (frustrationAnalysis.score > 0.7) {
      feedback.areasForImprovement.push('Significant frustration detected');
      if (frustrationAnalysis.patterns) {
        feedback.recommendations.push(
          `Address patterns: ${frustrationAnalysis.patterns.join(', ')}`
        );
      }
    }
  }

  return feedback;
} 