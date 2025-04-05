import React, { useState, useEffect } from 'react';
import { useSimulator } from '../../contexts/SimulatorContext';
import { useInteractionTracker } from '../../contexts/InteractionTracker';
import './FeedbackDisplay.css';
import EnhancedFeedbackDisplay from './EnhancedFeedbackDisplay';

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

  if (isLoading) {
    return (
      <div className="feedback-display">
        <div className="loading">Loading feedback...</div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="feedback-display">
        <div className="no-feedback">No feedback available yet.</div>
      </div>
    );
  }

  return (
    <EnhancedFeedbackDisplay
      feedback={{
        ...parsedFeedback,
        interactions
      }}
    />
  );
};

export default FeedbackDisplay; 