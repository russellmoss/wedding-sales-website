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
            { temperature: 0.3, max_tokens: 1500 }
          );
          
          // Extract feedback from Claude's response
          const feedbackContent = response.content[0].text;
          
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Simulation Feedback: {currentScenario.title}
          </h1>
          <p className="text-gray-600">{currentScenario.description}</p>
        </div>

        {/* Score Display */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Overall Performance</h2>
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Feedback Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Detailed Feedback</h2>
          <div className="prose max-w-none">
            {feedback ? (
              <div className="whitespace-pre-wrap">{feedback}</div>
            ) : (
              <p className="text-gray-600">No feedback available.</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleStartNewSimulation}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start New Simulation
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDisplay; 