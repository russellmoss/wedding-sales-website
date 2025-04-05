import React, { useState, useEffect } from 'react';
import { useSimulator } from '../../contexts/SimulatorContext';
import { useInteractionTracker } from '../../contexts/InteractionTracker';
import './FeedbackDisplay.css';
import { getEmotionColor } from '../../utils/emotionUtils';

const FeedbackDisplay = () => {
  const { feedback, currentScenario } = useSimulator();
  const { getAllInteractions } = useInteractionTracker();
  const [parsedFeedback, setParsedFeedback] = useState({
    issues: [],
    strengths: [],
    score: 0,
    detailedFeedback: ''
  });
  const [interactions, setInteractions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (feedback) {
      setIsLoading(true);
      try {
        // Parse the feedback to extract issues, strengths, score, and detailed feedback
        const issuesMatch = feedback.rawResponse?.match(/Issues:?\s*([\s\S]*?)(?=Strengths:|Score:|$)/i);
        const strengthsMatch = feedback.rawResponse?.match(/Strengths:?\s*([\s\S]*?)(?=Score:|$)/i);
        const scoreMatch = feedback.rawResponse?.match(/Score:\s*(\d+)%/i);
        const feedbackMatch = feedback.rawResponse?.match(/Feedback:?\s*([\s\S]*?)$/i);
        
        const issues = issuesMatch ? issuesMatch[1].trim().split('\n').filter(line => line.trim()) : [];
        const strengths = strengthsMatch ? strengthsMatch[1].trim().split('\n').filter(line => line.trim()) : [];
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
        const detailedFeedback = feedbackMatch ? feedbackMatch[1].trim() : '';
        
        setParsedFeedback({
          issues,
          strengths,
          score,
          detailedFeedback
        });
        
        // Get tracked interactions
        setInteractions(getAllInteractions());
      } catch (error) {
        console.error('Error parsing feedback:', error);
        setParsedFeedback({
          issues: [],
          strengths: [],
          score: 0,
          detailedFeedback: 'Error parsing feedback data'
        });
      } finally {
        setIsLoading(false);
      }
    }
  }, [feedback, getAllInteractions]);

  if (!feedback || !currentScenario) {
    return (
      <div className="feedback-container">
        <div className="feedback-error">
          <h2>No Feedback Available</h2>
          <p>Please complete a simulation to view feedback.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="feedback-container">
        <div className="feedback-loading">
          <h2>Loading Feedback...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  const renderInteraction = (interaction) => {
    if (typeof interaction === 'string') {
      return interaction;
    }
    
    return (
      <div className="interaction-item">
        <p className="interaction-description">{interaction.description}</p>
        {interaction.effectiveness && (
          <p className="interaction-effectiveness">Effectiveness: {interaction.effectiveness}</p>
        )}
        {interaction.impact && (
          <p className="interaction-impact">Impact: {interaction.impact}</p>
        )}
        {interaction.context && (
          <p className="interaction-context">Context: {interaction.context}</p>
        )}
        {interaction.trigger && (
          <p className="interaction-trigger">Trigger: "{interaction.trigger}"</p>
        )}
      </div>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'orange';
    return 'red';
  };

  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'yellow';
      case 'positive':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <div className="feedback-container">
      <h2>Simulation Feedback</h2>
      
      <div className="feedback-score" style={{ color: getEmotionColor(parsedFeedback.score >= 70 ? 'happy' : parsedFeedback.score >= 50 ? 'neutral' : 'sad') }}>
        <h3>Overall Score: {parsedFeedback.score}%</h3>
      </div>

      {parsedFeedback.issues.length > 0 && (
        <div className="feedback-section">
          <h3>Areas for Improvement</h3>
          <ul>
            {parsedFeedback.issues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {parsedFeedback.strengths.length > 0 && (
        <div className="feedback-section">
          <h3>Strengths</h3>
          <ul>
            {parsedFeedback.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>
      )}

      {parsedFeedback.detailedFeedback && (
        <div className="feedback-section">
          <h3>Detailed Feedback</h3>
          <p>{parsedFeedback.detailedFeedback}</p>
        </div>
      )}

      {interactions && (
        <div className="feedback-section">
          <h3>Interaction Analysis</h3>
          
          {interactions.negativeInteractions.length > 0 && (
            <div className="interaction-group">
              <h4>Negative Interactions</h4>
              <ul>
                {interactions.negativeInteractions.map((interaction, index) => (
                  <li key={index}>{renderInteraction(interaction)}</li>
                ))}
              </ul>
            </div>
          )}

          {interactions.missedOpportunities.length > 0 && (
            <div className="interaction-group">
              <h4>Missed Opportunities</h4>
              <ul>
                {interactions.missedOpportunities.map((opportunity, index) => (
                  <li key={index}>{renderInteraction(opportunity)}</li>
                ))}
              </ul>
            </div>
          )}

          {interactions.rapportBuilding.length > 0 && (
            <div className="interaction-group">
              <h4>Rapport Building Moments</h4>
              <ul>
                {interactions.rapportBuilding.map((moment, index) => (
                  <li key={index}>{renderInteraction(moment)}</li>
                ))}
              </ul>
            </div>
          )}

          {interactions.closingAttempts.length > 0 && (
            <div className="interaction-group">
              <h4>Closing Attempts</h4>
              <ul>
                {interactions.closingAttempts.map((attempt, index) => (
                  <li key={index}>{renderInteraction(attempt)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {currentScenario.goldStandard && (
        <div className="feedback-section">
          <h3>Gold Standard Comparison</h3>
          <p>{currentScenario.goldStandard}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackDisplay; 