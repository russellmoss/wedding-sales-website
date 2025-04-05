import React from 'react';

const EnhancedFeedbackDisplay = ({ feedback }) => {
  // Extract data from feedback object
  const {
    score = 65,
    issues = [],
    strengths = [],
    detailedFeedback = '',
    interactions = null
  } = feedback || {};

  // Convert string score to number if needed
  const scoreNum = typeof score === 'string' ? parseInt(score, 10) : score;

  // Get color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };
  
  // Utility function for getting emotion colors - included directly in component
  const getEmotionColor = (emotion) => {
    // Return a default color if emotion is undefined or null
    if (!emotion) {
      return '#9E9E9E'; // Default grey color
    }
    
    switch (emotion.toLowerCase()) {
      case 'happy':
      case 'excited':
        return '#4CAF50'; // Green
      case 'worried':
      case 'concerned':
        return '#FFC107'; // Yellow
      case 'frustrated':
      case 'angry':
        return '#F44336'; // Red
      case 'disappointed':
      case 'sad':
        return '#2196F3'; // Blue
      case 'neutral':
      default:
        return '#9E9E9E'; // Default grey color
    }
  };

  // Function to parse the detailed feedback into paragraphs
  const parseDetailedFeedback = (text) => {
    if (!text) return [];
    return text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0);
  };

  const detailedFeedbackParagraphs = parseDetailedFeedback(detailedFeedback);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Simulation Feedback</h2>
      
      {/* Score Section */}
      <div className="flex justify-center mb-8">
        <div className="text-center">
          <div className="relative inline-block">
            <svg className="w-36 h-36" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#e6e6e6" 
                strokeWidth="10"
              />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke={getScoreColor(scoreNum)} 
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 45 * scoreNum / 100} ${2 * Math.PI * 45 * (100 - scoreNum) / 100}`}
                strokeDashoffset={2 * Math.PI * 45 * 25 / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold" style={{ color: getScoreColor(scoreNum) }}>
                {scoreNum}%
              </span>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mt-2">Overall Score</h3>
        </div>
      </div>
      
      {/* Areas for Improvement & Strengths in side-by-side columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Areas for Improvement */}
        <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
          <h3 className="text-xl font-semibold text-red-700 mb-4">Areas for Improvement</h3>
          <ul className="space-y-3">
            {issues.map((issue, index) => (
              <li key={index} className="flex">
                <div className="flex-shrink-0 w-6 h-6 bg-red-200 text-red-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  {index + 1}
                </div>
                <div className="text-gray-700">{issue}</div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Strengths */}
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
          <h3 className="text-xl font-semibold text-green-700 mb-4">Strengths</h3>
          <ul className="space-y-3">
            {strengths.map((strength, index) => (
              <li key={index} className="flex">
                <div className="flex-shrink-0 w-6 h-6 bg-green-200 text-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  {index + 1}
                </div>
                <div className="text-gray-700">{strength}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Detailed Feedback */}
      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400 mb-8">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Detailed Feedback</h3>
        <div className="space-y-4">
          {detailedFeedbackParagraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700">{paragraph}</p>
          ))}
        </div>
      </div>
      
      {/* Interaction Analysis */}
      {interactions && (
        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">Interaction Analysis</h3>
          
          {/* Missed Opportunities */}
          {interactions.missedOpportunities && interactions.missedOpportunities.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-purple-800 mb-3">Missed Opportunities</h4>
              <div className="space-y-3">
                {interactions.missedOpportunities.map((opportunity, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
                    <div className="font-medium text-gray-800">{opportunity.description}</div>
                    <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-600">
                        <span className="font-medium">Impact:</span> 
                        <span className={`ml-1 ${opportunity.impact === 'high' ? 'text-red-600 font-medium' : 'text-yellow-600'}`}>
                          {opportunity.impact}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        <span className="font-medium">Context:</span> 
                        <span className="ml-1">{opportunity.context}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Rapport Building Moments */}
          {interactions.rapportBuilding && interactions.rapportBuilding.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-purple-800 mb-3">Rapport Building Moments</h4>
              <div className="space-y-3">
                {interactions.rapportBuilding.map((moment, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                    <div className="font-medium text-gray-800">{moment.description}</div>
                    <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-600">
                        <span className="font-medium">Impact:</span> 
                        <span className="ml-1 text-green-600">{moment.impact}</span>
                      </div>
                      <div className="text-gray-600">
                        <span className="font-medium">Context:</span> 
                        <span className="ml-1">{moment.context}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Action Items / Next Steps */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg border-t-2 border-gray-300">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400">
            <div className="font-medium text-gray-800">Focus Area 1</div>
            <p className="text-gray-600 mt-1">
              Ensure prompt acknowledgment of all inquiries, even if just to say a more detailed response is coming.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400">
            <div className="font-medium text-gray-800">Focus Area 2</div>
            <p className="text-gray-600 mt-1">
              Ask key qualifying questions early (date preferences, guest count, vision) to tailor responses better.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFeedbackDisplay; 