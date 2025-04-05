import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulator } from '../../contexts/SimulatorContext';

function FeedbackDisplay() {
  const { currentScenario, chatHistory, feedback } = useSimulator();
  const navigate = useNavigate();

  const handleStartNew = () => {
    navigate('/simulator');
  };

  return (
    <div className="space-y-6">
      {/* Scenario Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Scenario Summary</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-700">Scenario</h4>
            <p className="text-gray-600">{currentScenario?.title}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Description</h4>
            <p className="text-gray-600">{currentScenario?.description}</p>
          </div>
        </div>
      </div>

      {/* Conversation Review */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Conversation Review</h3>
        <div className="space-y-4">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.type === 'user' ? 'bg-primary-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-700">
                  {message.type === 'user' ? 'You' : 'Client'}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-600">{message.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Performance Feedback</h3>
        <div className="space-y-4">
          {feedback ? (
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: feedback }} />
            </div>
          ) : (
            <p className="text-gray-600">No feedback available yet.</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleStartNew}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Start New Scenario
        </button>
      </div>
    </div>
  );
}

export default FeedbackDisplay; 