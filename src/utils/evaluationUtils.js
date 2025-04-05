/**
 * Maps evaluation feedback to specific criteria and calculates a weighted score
 * @param {Object} feedback - The raw feedback data
 * @param {Object} criteria - The evaluation criteria with weights
 * @returns {Object} - Aligned feedback and accurate score
 */
export function alignFeedbackToCriteria(feedback, criteria) {
  console.log('\n=== Starting Feedback Alignment ===');
  console.log('Input Feedback:', JSON.stringify(feedback, null, 2));
  console.log('Criteria:', JSON.stringify(criteria, null, 2));

  const alignedFeedback = {
    score: 0,
    criteriaResults: {},
    strengths: [],
    areasForImprovement: []
  };
  
  // Define mapping between feedback points and criteria
  const feedbackMapping = {
    "Failed to review inquiry details before the call": "preparation",
    "Did not address budget concerns when initially brought up": "budgetDiscussion",
    "Missed opportunity to build rapport by acknowledging their vision": "rapport",
    "Did not confirm a specific date for the tour and tasting": "activeListening",
    "Attempted to close without fully addressing budget concerns": "budgetDiscussion",
    "Maintained a professional and warm tone throughout": "tone",
    "Asked open-ended questions to gather information": "questionQuality",
    "Demonstrated active listening by paraphrasing responses": "activeListening",
    "Provided detailed information about venue spaces": "valueProposition",
    "Highlighted venue features that matched preferences": "valueProposition"
  };
  
  // Process strengths and areas for improvement
  [...feedback.strengths, ...feedback.areasForImprovement].forEach(point => {
    const criteriaKey = feedbackMapping[point] || null;
    if (criteriaKey && criteria[criteriaKey]) {
      console.log(`\nProcessing feedback point: "${point}"`);
      console.log(`Mapped to criteria: ${criteriaKey}`);
      
      if (!alignedFeedback.criteriaResults[criteriaKey]) {
        alignedFeedback.criteriaResults[criteriaKey] = {
          description: criteria[criteriaKey].description,
          weight: criteria[criteriaKey].weight,
          score: 0,
          feedback: []
        };
      }
      
      // Determine if this is a strength or area for improvement
      const isStrength = feedback.strengths.includes(point);
      const impactValue = isStrength ? 1 : -1;
      
      console.log(`Type: ${isStrength ? 'Strength' : 'Area for Improvement'}`);
      console.log(`Impact Value: ${impactValue}`);
      
      // Add the feedback point
      alignedFeedback.criteriaResults[criteriaKey].feedback.push({
        point,
        isStrength,
        impact: isStrength ? "positive" : "negative"
      });
      
      // Update the score for this criteria
      const maxScore = criteria[criteriaKey].weight;
      const currentScore = alignedFeedback.criteriaResults[criteriaKey].score;
      const adjustment = isStrength ? 
        (maxScore - currentScore) * 0.5 : // Add half of remaining points for strengths
        -maxScore * 0.5; // Subtract half of max points for areas of improvement
      
      console.log(`Score Calculation for ${criteriaKey}:`);
      console.log(`- Max Score: ${maxScore}`);
      console.log(`- Current Score: ${currentScore}`);
      console.log(`- Adjustment: ${adjustment}`);
      
      alignedFeedback.criteriaResults[criteriaKey].score = 
        Math.min(maxScore, Math.max(0, currentScore + adjustment));
      
      console.log(`- New Score: ${alignedFeedback.criteriaResults[criteriaKey].score}`);
    }
  });
  
  // Calculate total score
  let totalWeight = 0;
  let weightedScore = 0;
  
  console.log('\n=== Calculating Overall Score ===');
  Object.entries(alignedFeedback.criteriaResults).forEach(([key, result]) => {
    console.log(`\nCriteria: ${key}`);
    console.log(`- Weight: ${result.weight}`);
    console.log(`- Score: ${result.score}`);
    console.log(`- Weighted Contribution: ${result.score}`);
    
    totalWeight += result.weight;
    weightedScore += result.score;
  });
  
  console.log(`\nFinal Calculations:`);
  console.log(`- Total Weight: ${totalWeight}`);
  console.log(`- Total Weighted Score: ${weightedScore}`);
  
  alignedFeedback.score = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 0;
  console.log(`- Final Overall Score: ${alignedFeedback.score}%`);
  
  return alignedFeedback;
}

/**
 * Validates that all criteria have been addressed in the feedback
 * @param {Object} alignedFeedback - The aligned feedback object
 * @param {Object} criteria - The evaluation criteria
 * @returns {Object} - Validation results with any missing criteria
 */
export function validateFeedbackCoverage(alignedFeedback, criteria) {
  const missingCriteria = [];
  
  Object.entries(criteria).forEach(([key, criterion]) => {
    if (!alignedFeedback.criteriaResults[key] || 
        alignedFeedback.criteriaResults[key].feedback.length === 0) {
      missingCriteria.push({
        key,
        description: criterion.description,
        weight: criterion.weight
      });
    }
  });
  
  return {
    isComplete: missingCriteria.length === 0,
    missingCriteria,
    coverage: Math.round(
      ((Object.keys(criteria).length - missingCriteria.length) / 
       Object.keys(criteria).length) * 100
    )
  };
}

/**
 * Generates a detailed report of the evaluation results
 * @param {Object} alignedFeedback - The aligned feedback object
 * @returns {Object} - Detailed evaluation report
 */
export function generateEvaluationReport(alignedFeedback) {
  const report = {
    overallScore: alignedFeedback.score,
    criteriaBreakdown: {},
    topStrengths: [],
    keyImprovements: [],
    recommendations: []
  };
  
  // Process criteria breakdown
  Object.entries(alignedFeedback.criteriaResults).forEach(([key, result]) => {
    report.criteriaBreakdown[key] = {
      score: result.score,
      weight: result.weight,
      weightedScore: (result.score / result.weight) * 100,
      feedback: result.feedback
    };
  });
  
  // Identify top strengths and areas for improvement
  const allFeedback = Object.values(alignedFeedback.criteriaResults)
    .flatMap(result => result.feedback);
  
  report.topStrengths = allFeedback
    .filter(f => f.isStrength)
    .sort((a, b) => b.impact === "positive" ? 1 : -1)
    .slice(0, 3)
    .map(f => f.point);
  
  report.keyImprovements = allFeedback
    .filter(f => !f.isStrength)
    .sort((a, b) => b.impact === "negative" ? 1 : -1)
    .slice(0, 3)
    .map(f => f.point);
  
  // Generate recommendations based on lowest scoring criteria
  const lowestScoringCriteria = Object.entries(report.criteriaBreakdown)
    .sort(([, a], [, b]) => a.weightedScore - b.weightedScore)
    .slice(0, 2);
  
  report.recommendations = lowestScoringCriteria.map(([key, data]) => ({
    criteria: key,
    currentScore: data.weightedScore,
    actionItems: generateActionItems(key, data.feedback)
  }));
  
  return report;
}

/**
 * Analyzes conversation transcript to extract evidence for each evaluation criterion
 * @param {Array} messages - The conversation transcript
 * @param {Object} criteria - The evaluation criteria
 * @returns {Object} - Evidence for each criterion
 */
export function analyzeConversationForCriteria(messages, criteria) {
  const evidence = {};
  
  // Initialize evidence object for each criterion
  Object.keys(criteria).forEach(key => {
    evidence[key] = {
      matches: [],
      score: 0,
      maxScore: criteria[key].weight
    };
  });
  
  // Check for evidence of preparation
  if (criteria.preparation) {
    const firstSalesMessage = messages.find(msg => msg.type === 'user');
    if (firstSalesMessage) {
      // Look for evidence of preparation in first message
      const preparationPatterns = [
        /based on your inquiry/i,
        /you mentioned in your email/i,
        /as you noted earlier/i,
        /as we discussed previously/i,
        /from what you shared/i,
        /I see you're interested in/i,
        /I noticed from your inquiry/i,
        /according to your information/i
      ];
      
      preparationPatterns.forEach(pattern => {
        if (pattern.test(firstSalesMessage.content)) {
          evidence.preparation.matches.push({
            text: firstSalesMessage.content.match(pattern)[0],
            context: "First message showed preparation by referencing previous communication"
          });
        }
      });
      
      // Score based on matches
      evidence.preparation.score = evidence.preparation.matches.length > 0 ? 
        criteria.preparation.weight : 0;
    }
  }
  
  // Check for rapport building
  if (criteria.rapport) {
    const rapportPatterns = [
      /congratulations/i,
      /that sounds wonderful/i,
      /I understand/i,
      /I appreciate/i,
      /that's exciting/i,
      /perfect for you/i,
      /I'm happy to hear/i,
      /that's great news/i,
      /I'm glad/i,
      /I can see why/i
    ];
    
    messages.filter(msg => msg.type === 'user').forEach(msg => {
      rapportPatterns.forEach(pattern => {
        if (pattern.test(msg.content)) {
          evidence.rapport.matches.push({
            text: msg.content.match(pattern)[0],
            context: "Built rapport by connecting with client emotions and acknowledging their excitement"
          });
        }
      });
    });
    
    // Score based on number of rapport building instances
    const rapportScore = Math.min(evidence.rapport.matches.length * 5, criteria.rapport.weight);
    evidence.rapport.score = rapportScore;
  }
  
  // Check for budget discussion
  if (criteria.budgetDiscussion) {
    const budgetMessages = messages.filter(msg => 
      msg.type === 'user' && /budget|cost|price|afford|expensive|spend|investment|value/i.test(msg.content)
    );
    
    const clientBudgetMention = messages.find(msg => 
      msg.type === 'assistant' && /budget|cost|price|afford|expensive|spend|investment|value/i.test(msg.content)
    );
    
    if (clientBudgetMention) {
      // Check if sales rep addressed budget concerns after client mentioned it
      const addressedBudget = budgetMessages.some(msg => {
        const msgIndex = messages.indexOf(msg);
        const clientMentionIndex = messages.indexOf(clientBudgetMention);
        
        return msgIndex > clientMentionIndex && 
          /understanding|flexible|options|work with you|prioritize|different price points|payment plans|value proposition/i.test(msg.content);
      });
      
      if (addressedBudget) {
        evidence.budgetDiscussion.matches.push({
          text: "Addressed budget concerns after client mentioned it",
          context: "Responded to budget concerns professionally and offered solutions"
        });
        evidence.budgetDiscussion.score = criteria.budgetDiscussion.weight;
      } else {
        evidence.budgetDiscussion.score = 0;
      }
    }
  }
  
  // Check for active listening
  if (criteria.activeListening) {
    const activeListeningPatterns = [
      /as you mentioned/i,
      /you said/i,
      /you're looking for/i,
      /you want/i,
      /you need/i,
      /you're interested in/i,
      /you're planning/i,
      /you're considering/i,
      /you're thinking/i,
      /you're hoping/i
    ];
    
    messages.filter(msg => msg.type === 'user').forEach(msg => {
      activeListeningPatterns.forEach(pattern => {
        if (pattern.test(msg.content)) {
          evidence.activeListening.matches.push({
            text: msg.content.match(pattern)[0],
            context: "Demonstrated active listening by referencing client's previous statements"
          });
        }
      });
    });
    
    // Check for follow-up questions that reference previous client statements
    const followUpQuestions = messages.filter(msg => 
      msg.type === 'user' && 
      /\?/g.test(msg.content) && 
      activeListeningPatterns.some(pattern => pattern.test(msg.content))
    );
    
    followUpQuestions.forEach(msg => {
      evidence.activeListening.matches.push({
        text: msg.content,
        context: "Asked follow-up questions based on client's previous statements"
      });
    });
    
    // Score based on number of active listening instances
    const activeListeningScore = Math.min(evidence.activeListening.matches.length * 5, criteria.activeListening.weight);
    evidence.activeListening.score = activeListeningScore;
  }
  
  // Check for tone
  if (criteria.tone) {
    const positiveTonePatterns = [
      /thank you/i,
      /appreciate/i,
      /pleasure/i,
      /happy to/i,
      /glad to/i,
      /excited to/i,
      /looking forward to/i,
      /wonderful/i,
      /great/i,
      /perfect/i
    ];
    
    const negativeTonePatterns = [
      /unfortunately/i,
      /sorry/i,
      /can't/i,
      /cannot/i,
      /won't/i,
      /will not/i,
      /don't/i,
      /do not/i,
      /shouldn't/i,
      /should not/i
    ];
    
    let positiveToneCount = 0;
    let negativeToneCount = 0;
    
    messages.filter(msg => msg.type === 'user').forEach(msg => {
      positiveTonePatterns.forEach(pattern => {
        if (pattern.test(msg.content)) {
          positiveToneCount++;
          evidence.tone.matches.push({
            text: msg.content.match(pattern)[0],
            context: "Used positive language to maintain a professional and warm tone"
          });
        }
      });
      
      negativeTonePatterns.forEach(pattern => {
        if (pattern.test(msg.content)) {
          negativeToneCount++;
        }
      });
    });
    
    // Score based on positive vs negative tone ratio
    const toneRatio = positiveToneCount / (positiveToneCount + negativeToneCount + 1);
    evidence.tone.score = Math.round(toneRatio * criteria.tone.weight);
  }
  
  // Check for question quality
  if (criteria.questionQuality) {
    const openEndedQuestionPatterns = [
      /what/i,
      /how/i,
      /why/i,
      /tell me about/i,
      /describe/i,
      /explain/i,
      /share/i,
      /thoughts on/i,
      /opinion on/i,
      /feelings about/i
    ];
    
    const closedQuestionPatterns = [
      /do you/i,
      /would you/i,
      /will you/i,
      /can you/i,
      /have you/i,
      /is there/i,
      /are there/i,
      /is it/i,
      /are you/i,
      /do they/i
    ];
    
    let openEndedCount = 0;
    let closedCount = 0;
    
    messages.filter(msg => msg.type === 'user').forEach(msg => {
      if (/\?/g.test(msg.content)) {
        const isOpenEnded = openEndedQuestionPatterns.some(pattern => pattern.test(msg.content));
        const isClosed = closedQuestionPatterns.some(pattern => pattern.test(msg.content));
        
        if (isOpenEnded) {
          openEndedCount++;
          evidence.questionQuality.matches.push({
            text: msg.content,
            context: "Asked an open-ended question to gather more information"
          });
        } else if (isClosed) {
          closedCount++;
        }
      }
    });
    
    // Score based on ratio of open-ended to closed questions
    const questionRatio = openEndedCount / (openEndedCount + closedCount + 1);
    evidence.questionQuality.score = Math.round(questionRatio * criteria.questionQuality.weight);
  }
  
  // Check for value proposition
  if (criteria.valueProposition) {
    const valuePropositionPatterns = [
      /unique/i,
      /exclusive/i,
      /special/i,
      /perfect for/i,
      /ideal for/i,
      /designed for/i,
      /customized/i,
      /personalized/i,
      /tailored/i,
      /specifically/i
    ];
    
    const featurePatterns = [
      /feature/i,
      /amenity/i,
      /service/i,
      /option/i,
      /package/i,
      /included/i,
      /offer/i,
      /provide/i,
      /available/i,
      /access to/i
    ];
    
    messages.filter(msg => msg.type === 'user').forEach(msg => {
      // Check for value proposition language
      valuePropositionPatterns.forEach(pattern => {
        if (pattern.test(msg.content)) {
          evidence.valueProposition.matches.push({
            text: msg.content.match(pattern)[0],
            context: "Used value proposition language to highlight unique benefits"
          });
        }
      });
      
      // Check for feature descriptions
      featurePatterns.forEach(pattern => {
        if (pattern.test(msg.content)) {
          evidence.valueProposition.matches.push({
            text: msg.content.match(pattern)[0],
            context: "Described venue features and amenities"
          });
        }
      });
    });
    
    // Score based on number of value proposition instances
    const valuePropositionScore = Math.min(evidence.valueProposition.matches.length * 5, criteria.valueProposition.weight);
    evidence.valueProposition.score = valuePropositionScore;
  }
  
  return evidence;
}

/**
 * Combines conversation analysis with feedback alignment for more accurate evaluation
 * @param {Array} messages - The conversation transcript
 * @param {Object} feedback - The raw feedback data
 * @param {Object} criteria - The evaluation criteria with weights
 * @returns {Object} - Combined evaluation results
 */
export function evaluateWithEvidence(messages, feedback, criteria) {
  console.log('\n=== Starting Evidence-Based Evaluation ===');
  console.log('Messages:', JSON.stringify(messages, null, 2));
  console.log('Feedback:', JSON.stringify(feedback, null, 2));
  console.log('Criteria:', JSON.stringify(criteria, null, 2));
  
  // Get evidence from conversation analysis
  const evidence = analyzeConversationForCriteria(messages, criteria);
  console.log('\n=== Conversation Evidence ===');
  console.log(JSON.stringify(evidence, null, 2));
  
  // Get aligned feedback
  const alignedFeedback = alignFeedbackToCriteria(feedback, criteria);
  console.log('\n=== Aligned Feedback ===');
  console.log(JSON.stringify(alignedFeedback, null, 2));
  
  // Combine evidence with feedback
  const combinedEvaluation = {
    score: 0,
    criteriaResults: {},
    strengths: [],
    areasForImprovement: [],
    evidence: {}
  };
  
  console.log('\n=== Combining Evidence and Feedback ===');
  // Process each criterion
  Object.keys(criteria).forEach(key => {
    const evidenceScore = evidence[key]?.score || 0;
    const feedbackScore = alignedFeedback.criteriaResults[key]?.score || 0;
    
    console.log(`\nProcessing Criterion: ${key}`);
    console.log(`- Evidence Score: ${evidenceScore}`);
    console.log(`- Feedback Score: ${feedbackScore}`);
    
    // Calculate combined score (70% evidence, 30% feedback)
    const combinedScore = Math.round((evidenceScore * 0.7) + (feedbackScore * 0.3));
    console.log(`- Combined Score (70% evidence, 30% feedback): ${combinedScore}`);
    
    combinedEvaluation.criteriaResults[key] = {
      description: criteria[key].description,
      weight: criteria[key].weight,
      score: combinedScore,
      evidenceScore,
      feedbackScore,
      evidence: evidence[key]?.matches || [],
      feedback: alignedFeedback.criteriaResults[key]?.feedback || []
    };
    
    // Add to strengths or areas for improvement
    if (combinedScore >= criteria[key].weight * 0.7) {
      console.log(`- Added to Strengths (score >= ${criteria[key].weight * 0.7})`);
      combinedEvaluation.strengths.push({
        criteria: key,
        score: combinedScore,
        evidence: evidence[key]?.matches || []
      });
    } else if (combinedScore <= criteria[key].weight * 0.4) {
      console.log(`- Added to Areas for Improvement (score <= ${criteria[key].weight * 0.4})`);
      combinedEvaluation.areasForImprovement.push({
        criteria: key,
        score: combinedScore,
        evidence: evidence[key]?.matches || []
      });
    }
  });
  
  // Calculate total score
  let totalWeight = 0;
  let weightedScore = 0;
  
  console.log('\n=== Calculating Final Score ===');
  Object.entries(combinedEvaluation.criteriaResults).forEach(([key, result]) => {
    console.log(`\nCriteria: ${key}`);
    console.log(`- Weight: ${result.weight}`);
    console.log(`- Score: ${result.score}`);
    console.log(`- Weighted Contribution: ${result.score}`);
    
    totalWeight += criteria[key].weight;
    weightedScore += result.score;
  });
  
  console.log(`\nFinal Calculations:`);
  console.log(`- Total Weight: ${totalWeight}`);
  console.log(`- Total Weighted Score: ${weightedScore}`);
  
  combinedEvaluation.score = Math.round((weightedScore / totalWeight) * 100);
  console.log(`- Final Overall Score: ${combinedEvaluation.score}%`);
  
  return combinedEvaluation;
}

/**
 * Generates a detailed evaluation report with evidence from the conversation
 * @param {Object} evaluation - The evaluation results from evaluateWithEvidence
 * @param {Object} criteria - The evaluation criteria
 * @returns {Object} - Detailed evaluation report with evidence
 */
export function generateDetailedEvaluationReport(evaluation, criteria) {
  const report = {
    overallScore: evaluation.score,
    criteriaBreakdown: {},
    topStrengths: [],
    keyImprovements: [],
    recommendations: [],
    evidenceSummary: {}
  };
  
  // Process criteria breakdown with evidence
  Object.entries(evaluation.criteriaResults).forEach(([key, result]) => {
    report.criteriaBreakdown[key] = {
      description: criteria[key].description,
      score: result.score,
      weight: result.weight,
      weightedScore: (result.score / result.weight) * 100,
      evidenceScore: result.evidenceScore,
      feedbackScore: result.feedbackScore,
      evidence: result.evidence,
      feedback: result.feedback
    };
    
    // Add evidence summary
    report.evidenceSummary[key] = {
      count: result.evidence.length,
      examples: result.evidence.slice(0, 3).map(e => ({
        text: e.text,
        context: e.context
      }))
    };
  });
  
  // Identify top strengths with evidence
  const strengthsWithEvidence = evaluation.strengths
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  
  report.topStrengths = strengthsWithEvidence.map(strength => ({
    criteria: strength.criteria,
    description: criteria[strength.criteria].description,
    score: strength.score,
    evidence: strength.evidence.slice(0, 2).map(e => ({
      text: e.text,
      context: e.context
    }))
  }));
  
  // Identify key improvements with evidence
  const improvementsWithEvidence = evaluation.areasForImprovement
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
  
  report.keyImprovements = improvementsWithEvidence.map(improvement => ({
    criteria: improvement.criteria,
    description: criteria[improvement.criteria].description,
    score: improvement.score,
    evidence: improvement.evidence.slice(0, 2).map(e => ({
      text: e.text,
      context: e.context
    }))
  }));
  
  // Generate recommendations based on lowest scoring criteria
  const lowestScoringCriteria = Object.entries(report.criteriaBreakdown)
    .sort(([, a], [, b]) => a.weightedScore - b.weightedScore)
    .slice(0, 2);
  
  report.recommendations = lowestScoringCriteria.map(([key, data]) => ({
    criteria: key,
    description: criteria[key].description,
    currentScore: data.weightedScore,
    evidence: data.evidence.slice(0, 2).map(e => ({
      text: e.text,
      context: e.context
    })),
    actionItems: generateActionItems(key, data.feedback)
  }));
  
  // Add overall evidence summary
  report.evidenceSummary = {
    totalEvidence: Object.values(evaluation.evidence).flat().length,
    evidenceByCriteria: Object.entries(evaluation.evidence).reduce((acc, [key, matches]) => {
      acc[key] = matches.length;
      return acc;
    }, {}),
    topEvidenceTypes: Object.entries(evaluation.evidence)
      .sort(([, a], [, b]) => b.length - a.length)
      .slice(0, 3)
      .map(([key, matches]) => ({
        criteria: key,
        count: matches.length
      }))
  };
  
  return report;
}

/**
 * Generates specific action items for improvement
 * @param {string} criteriaKey - The criteria key
 * @param {Array} feedback - The feedback for this criteria
 * @returns {Array} - List of action items
 */
function generateActionItems(criteriaKey, feedback) {
  const actionItems = {
    preparation: [
      "Review inquiry details thoroughly before the call",
      "Prepare specific questions based on inquiry information",
      "Research client's industry and potential needs"
    ],
    budgetDiscussion: [
      "Address budget concerns proactively",
      "Prepare value propositions for different price points",
      "Have flexible payment options ready to discuss"
    ],
    rapport: [
      "Acknowledge and validate client's vision",
      "Share relevant venue stories and experiences",
      "Find common ground through personal connection"
    ],
    activeListening: [
      "Practice paraphrasing key points",
      "Take notes during the conversation",
      "Follow up on important details mentioned"
    ],
    tone: [
      "Maintain consistent professional warmth",
      "Use positive language throughout",
      "Match client's communication style"
    ],
    questionQuality: [
      "Prepare open-ended questions in advance",
      "Follow up on initial responses",
      "Use questions to uncover deeper needs"
    ],
    valueProposition: [
      "Tailor venue features to client preferences",
      "Connect features to client's specific needs",
      "Highlight unique selling points"
    ]
  };
  
  return actionItems[criteriaKey] || [];
} 