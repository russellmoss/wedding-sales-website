import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/rubric.css';

/**
 * RubricButton - Component that displays an "Evaluate with Rubric" button
 * to be placed in scenario brief pages
 * 
 * @param {Object} props
 * @param {string} props.scenarioId - The ID of the scenario to evaluate
 * @param {string} props.className - Additional CSS classes for styling
 * @param {string} props.tooltip - Optional tooltip text to show on hover
 */
const RubricButton = ({ scenarioId, className = '', tooltip = 'Evaluate this scenario using a standardized rubric' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <Link
        to={`/rubrics/${scenarioId}`}
        className={`rubric-button flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors ${className}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Open rubric evaluation"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
          />
        </svg>
        Evaluate with Rubric
      </Link>
      
      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg whitespace-nowrap z-10"
          role="tooltip"
        >
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RubricButton; 