import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulator } from '../../contexts/SimulatorContext';
import { sendMessageToClaude, createEvaluationPrompt } from '../../services/claudeApiService';

const FeedbackDisplay = () => {
  const navigate = useNavigate();
  const { currentScenario, chatHistory, feedback, setFeedback, resetSimulation } = useSimulator();
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no scenario is available, redirect to simulator home
    if (!currentScenario) {
      navigate('/simulator');
      return;
    }

    // Generate feedback if not already available
    const generateFeedback = async () => {
      if (!feedback && chatHistory.length > 0) {
        setIsLoading(true);
        try {
          // Create evaluation prompt
          const evaluationPrompt = createEvaluationPrompt(currentScenario, chatHistory);
          
          // Send to Claude API for evaluation
          const response = await sendMessageToClaude(
            "You are an expert sales coach evaluating a sales conversation. Provide detailed, constructive feedback.",
            [{ role: "user", content: evaluationPrompt }],
            { 
              temperature: 0.3, 
              max_tokens: 1500,
              requestType: 'evaluation',
              model: process.env.REACT_APP_CLAUDE_MODEL || 'claude-3-opus-20240229' // Use the same model as other requests
            }
          );
          
          // Extract feedback from Claude's response
          let feedbackContent = '';
          
          // Handle different response structures
          if (response && response.content && Array.isArray(response.content) && response.content.length > 0) {
            if (response.content[0].text) {
              feedbackContent = response.content[0].text;
            } else if (response.content[0].type === 'text') {
              feedbackContent = response.content[0].text;
            }
          } else if (response && response.message && response.message.content) {
            feedbackContent = response.message.content;
          } else if (response && typeof response === 'string') {
            feedbackContent = response;
          } else if (response && response.choices && response.choices.length > 0) {
            feedbackContent = response.choices[0].message.content;
          } else {
            console.error("Unexpected feedback response structure:", response);
            feedbackContent = "I'm sorry, I couldn't generate detailed feedback at this time. Here's a basic assessment based on the conversation length and content.";
          }
          
          // Save the feedback
          setFeedback(feedbackContent);
          
          // Extract score - look for a percentage in the feedback
          const scoreMatch = feedbackContent.match(/(\d{1,3})%/);
          if (scoreMatch && scoreMatch[1]) {
            setScore(parseInt(scoreMatch[1]));
          } else {
            // Fallback to calculating a basic score
            setScore(calculateBasicScore(chatHistory));
          }
        } catch (err) {
          console.error("Error generating feedback:", err);
          setError(`Failed to generate feedback: ${err.message}`);
          
          // Provide a fallback feedback message
          const fallbackFeedback = `I'm sorry, I couldn't generate detailed feedback at this time. Here's a basic assessment based on the conversation length and content.

Score: ${calculateBasicScore(chatHistory)}%
Feedback: Based on the conversation, you demonstrated good communication skills. To improve, consider asking more specific questions about the couple's preferences and providing clearer next steps.`;
          
          setFeedback(fallbackFeedback);
          setScore(calculateBasicScore(chatHistory));
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    generateFeedback();
  }, [currentScenario, chatHistory, feedback, navigate, setFeedback]);

  // Calculate a basic score based on chat history as a fallback
  const calculateBasicScore = (chatHistory) => {
    // Basic calculation based on conversation length and user message length
    const userMessages = chatHistory.filter(msg => msg.type === 'user');
    const avgLength = userMessages.reduce((sum, msg) => sum + msg.content.length, 0) / (userMessages.length || 1);
    
    // Higher score for more detailed responses
    let baseScore = Math.min(70 + (avgLength / 20), 90);
    
    // Penalize very short conversations
    if (chatHistory.length < 4) baseScore = Math.max(baseScore - 20, 50);
    
    return Math.round(baseScore);
  };

  const handleStartNewSimulation = () => {
    resetSimulation();
    navigate('/simulator');
  };

  // If no scenario is available, redirect to simulator home
  if (!currentScenario) {
    navigate('/simulator');
    return null;
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Simulation Results</h2>
        
        {/* Scenario Info */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{currentScenario.title}</h3>
          <p className="text-gray-600">{currentScenario.description}</p>
        </div>

        {/* Score Display */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Performance Score</h3>
          <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Feedback Display */}
        {!isLoading && !error && feedback && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Feedback</h3>
            <div className="prose max-w-none">
              {feedback.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {/* Start New Simulation Button */}
        <button
          onClick={handleStartNewSimulation}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Start New Simulation
        </button>
      </div>
    </div>
  );
};

export default FeedbackDisplay; 