import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulator } from '../../contexts/SimulatorContext';

const FeedbackDisplay = () => {
  const navigate = useNavigate();
  const { currentScenario, chatHistory, feedback, resetSimulation } = useSimulator();

  const handleStartNewSimulation = () => {
    resetSimulation();
    navigate('/simulator');
  };

  // If no scenario is available, redirect to simulator home
  if (!currentScenario) {
    navigate('/simulator');
    return null;
  }

  // Calculate a score based on the chat history (placeholder for now)
  const calculateScore = () => {
    // In a real application, this would evaluate the chat history
    // For now, return a placeholder score
    return Math.floor(Math.random() * 40) + 60; // Random score between 60-100
  };

  const score = calculateScore();

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Simulation Results</h2>
        
        <div className="flex items-center justify-center mb-6">
          <div className="text-center">
            <div className={`text-5xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}%
            </div>
            <p className="text-gray-600">Overall Performance</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Scenario: {currentScenario.title}</h3>
          <p className="text-gray-600">{currentScenario.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Evaluation Criteria</h3>
          <div className="space-y-3">
            {Object.entries(currentScenario.evaluationCriteria).map(([key, criteria]) => (
              <div key={key} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <p className="text-gray-700 font-medium">{criteria.description}</p>
                  <span className="text-sm text-gray-500">{criteria.weight} points</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Feedback</h3>
          {feedback ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{feedback}</p>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">Thank you for completing the simulation. Your performance has been evaluated based on the criteria above.</p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStartNewSimulation}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start New Simulation
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDisplay; 