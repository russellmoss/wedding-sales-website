import React, { createContext, useContext, useState, useEffect } from 'react';
import { goldStandardResponses } from '../data/goldStandardResponses';

const GoldStandardContext = createContext();

export const useGoldStandard = () => {
  const context = useContext(GoldStandardContext);
  if (!context) {
    throw new Error('useGoldStandard must be used within a GoldStandardProvider');
  }
  return context;
};

export const GoldStandardProvider = ({ children }) => {
  const [goldStandards, setGoldStandards] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real application, this would fetch from an API
    // For now, we'll use the imported data
    try {
      setGoldStandards(goldStandardResponses);
      setLoading(false);
    } catch (err) {
      setError('Failed to load gold standard responses');
      setLoading(false);
      console.error('Error loading gold standards:', err);
    }
  }, []);

  // Get gold standard responses for a specific scenario
  const getGoldStandardForScenario = (scenarioId) => {
    return goldStandards[scenarioId] || null;
  };

  // Compare a user response with the gold standard
  const compareResponse = (scenarioId, userResponse, context) => {
    const goldStandard = getGoldStandardForScenario(scenarioId);
    if (!goldStandard) {
      return {
        score: 0,
        feedback: 'No gold standard available for this scenario',
        deviations: []
      };
    }

    // Find the most relevant gold standard response based on context
    const relevantStandard = findRelevantStandard(goldStandard, context);
    
    // Calculate deviation score and identify specific issues
    const { score, deviations } = calculateDeviation(userResponse, relevantStandard);
    
    return {
      score,
      feedback: generateFeedback(score, deviations),
      deviations
    };
  };

  // Find the most relevant gold standard response based on context
  const findRelevantStandard = (goldStandard, context) => {
    // In a real implementation, this would use more sophisticated matching
    // For now, we'll use a simple approach based on conversation stage
    const stage = context?.stage || 'initial';
    
    // Find the standard that matches the current stage
    const stageStandards = goldStandard.stages?.[stage] || [];
    
    // If we have multiple standards for this stage, find the one that best matches the context
    if (stageStandards.length > 0) {
      // For now, just return the first one
      // In a real implementation, this would use semantic similarity
      return stageStandards[0];
    }
    
    // Fallback to the general standard
    return goldStandard.general;
  };

  // Calculate deviation score and identify specific issues
  const calculateDeviation = (userResponse, goldStandard) => {
    if (!goldStandard) {
      return { score: 0, deviations: [] };
    }

    const deviations = [];
    let totalScore = 100;
    
    // Check for missing key elements
    goldStandard.keyElements.forEach(element => {
      if (!userResponse.toLowerCase().includes(element.toLowerCase())) {
        deviations.push({
          type: 'missing_element',
          element,
          impact: 'medium',
          description: `Missing key element: "${element}"`
        });
        totalScore -= 10;
      }
    });
    
    // Check for problematic phrases
    goldStandard.problematicPhrases.forEach(phrase => {
      if (userResponse.toLowerCase().includes(phrase.toLowerCase())) {
        deviations.push({
          type: 'problematic_phrase',
          phrase,
          impact: 'high',
          description: `Used problematic phrase: "${phrase}"`
        });
        totalScore -= 15;
      }
    });
    
    // Check for tone issues
    if (goldStandard.tone && !checkTone(userResponse, goldStandard.tone)) {
      deviations.push({
        type: 'tone_issue',
        expected: goldStandard.tone,
        impact: 'medium',
        description: `Tone does not match expected ${goldStandard.tone} tone`
      });
      totalScore -= 10;
    }
    
    // Ensure score doesn't go below 0
    totalScore = Math.max(0, totalScore);
    
    return {
      score: totalScore,
      deviations
    };
  };

  // Check if the response tone matches the expected tone
  const checkTone = (response, expectedTone) => {
    // This is a simplified implementation
    // In a real application, this would use sentiment analysis or more sophisticated NLP
    
    const toneKeywords = {
      empathetic: ['understand', 'feel', 'emotion', 'concern', 'worried', 'anxious'],
      professional: ['professional', 'expertise', 'experience', 'quality', 'standard'],
      confident: ['confident', 'certain', 'guarantee', 'assure', 'promise'],
      friendly: ['friendly', 'welcome', 'pleasure', 'happy', 'glad'],
      respectful: ['respect', 'appreciate', 'value', 'honor', 'thank']
    };
    
    const keywords = toneKeywords[expectedTone] || [];
    if (keywords.length === 0) return true;
    
    // Check if any of the keywords are in the response
    return keywords.some(keyword => 
      response.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // Generate feedback based on score and deviations
  const generateFeedback = (score, deviations) => {
    if (deviations.length === 0) {
      return 'Excellent response that closely matches best practices.';
    }
    
    const feedback = [];
    
    if (score < 50) {
      feedback.push('The response has significant deviations from best practices.');
    } else if (score < 70) {
      feedback.push('The response has several areas for improvement.');
    } else if (score < 90) {
      feedback.push('The response is good but could be improved in a few areas.');
    } else {
      feedback.push('The response is very good with only minor improvements needed.');
    }
    
    // Group deviations by type
    const groupedDeviations = deviations.reduce((acc, dev) => {
      if (!acc[dev.type]) {
        acc[dev.type] = [];
      }
      acc[dev.type].push(dev);
      return acc;
    }, {});
    
    // Add specific feedback for each type of deviation
    Object.entries(groupedDeviations).forEach(([type, devs]) => {
      if (type === 'missing_element') {
        feedback.push(`Missing key elements: ${devs.map(d => `"${d.element}"`).join(', ')}`);
      } else if (type === 'problematic_phrase') {
        feedback.push(`Avoid using problematic phrases: ${devs.map(d => `"${d.phrase}"`).join(', ')}`);
      } else if (type === 'tone_issue') {
        feedback.push(`Improve tone to be more ${devs[0].expected}`);
      }
    });
    
    return feedback.join(' ');
  };

  const value = {
    goldStandards,
    loading,
    error,
    getGoldStandardForScenario,
    compareResponse
  };

  return (
    <GoldStandardContext.Provider value={value}>
      {children}
    </GoldStandardContext.Provider>
  );
}; 