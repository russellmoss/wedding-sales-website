import React from 'react';
import { useEmotion } from '../contexts/EmotionContext';
import './EmotionAnalysisDisplay.css';

const EmotionAnalysisDisplay = () => {
  const { 
    emotionalState, 
    conversationAnalysis,
    currentScenario 
  } = useEmotion();

  if (!conversationAnalysis) {
    return (
      <div className="emotion-analysis-container">
        <h3>Emotion Analysis</h3>
        <div className="current-emotion">
          <h4>Current Emotion</h4>
          <div className="emotion-display">
            <span className="emotion-label">{emotionalState.currentEmotion}</span>
            <div className="intensity-bar">
              <div 
                className="intensity-fill"
                style={{ width: `${emotionalState.intensity * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { 
    emotionalJourney, 
    detailedAnalysis, 
    frustrationAnalysis,
    feedback 
  } = conversationAnalysis;

  return (
    <div className="emotion-analysis-container">
      <h3>Emotion Analysis</h3>
      
      {/* Current Emotion */}
      <div className="current-emotion">
        <h4>Current Emotion</h4>
        <div className="emotion-display">
          <span className="emotion-label">{emotionalState.currentEmotion}</span>
          <div className="intensity-bar">
            <div 
              className="intensity-fill"
              style={{ width: `${emotionalState.intensity * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Emotional Journey */}
      <div className="emotional-journey">
        <h4>Emotional Journey</h4>
        <div className="journey-timeline">
          {emotionalJourney.history.map((record, index) => (
            <div key={index} className="journey-point">
              <div className="point-time">
                {new Date(record.timestamp).toLocaleTimeString()}
              </div>
              <div className="point-emotion">
                <span className="emotion-label">{record.emotion}</span>
                <div className="intensity-bar small">
                  <div 
                    className="intensity-fill"
                    style={{ width: `${record.intensity * 100}%` }}
                  />
                </div>
              </div>
              {record.message && (
                <div className="point-message">{record.message}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Frustration Analysis */}
      {frustrationAnalysis.frustrationScore > 0 && (
        <div className="frustration-analysis">
          <h4>Frustration Analysis</h4>
          <div className="frustration-score">
            <span>Frustration Score: {Math.round(frustrationAnalysis.frustrationScore * 100)}%</span>
          </div>
          {frustrationAnalysis.patterns.length > 0 && (
            <div className="frustration-patterns">
              <h5>Detected Patterns:</h5>
              <ul>
                {frustrationAnalysis.patterns.map((pattern, index) => (
                  <li key={index}>{pattern}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Feedback */}
      <div className="feedback-section">
        <h4>Feedback</h4>
        
        {/* Rapport Assessment */}
        <div className="feedback-item">
          <h5>Rapport Building</h5>
          <p>{feedback.rapportAssessment}</p>
        </div>
        
        {/* Emotion Management */}
        <div className="feedback-item">
          <h5>Emotion Management</h5>
          <p>{feedback.emotionManagement}</p>
        </div>
        
        {/* Strengths */}
        {feedback.strengths.length > 0 && (
          <div className="feedback-item">
            <h5>Strengths</h5>
            <ul>
              {feedback.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Areas for Improvement */}
        {feedback.areasForImprovement.length > 0 && (
          <div className="feedback-item">
            <h5>Areas for Improvement</h5>
            <ul>
              {feedback.areasForImprovement.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Recommendations */}
        {feedback.recommendations.length > 0 && (
          <div className="feedback-item">
            <h5>Recommendations</h5>
            <ul>
              {feedback.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Scenario-Specific Improvements */}
        {feedback.specificImprovements.length > 0 && (
          <div className="feedback-item">
            <h5>Scenario-Specific Improvements</h5>
            <ul>
              {feedback.specificImprovements.map((improvement, index) => (
                <li key={index}>{improvement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Emotion Statistics */}
      <div className="emotion-stats">
        <h4>Emotion Statistics</h4>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Positive Emotions</span>
            <span className="stat-value">{emotionalJourney.stats.positiveCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Negative Emotions</span>
            <span className="stat-value">{emotionalJourney.stats.negativeCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Neutral Emotions</span>
            <span className="stat-value">{emotionalJourney.stats.neutralCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average Intensity</span>
            <span className="stat-value">{Math.round(emotionalJourney.stats.averageIntensity * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionAnalysisDisplay; 