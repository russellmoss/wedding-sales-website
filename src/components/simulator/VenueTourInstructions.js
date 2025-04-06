import React from 'react';

const VenueTourInstructions = ({ onDismiss }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-green-800">Venue Tour Simulation</h3>
        <button 
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Dismiss instructions"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="text-gray-600 mb-4">
        <p className="mb-2">
          This is a venue tour simulation with Morgan and Casey, who are interested in booking Milea Estate Vineyard for their wedding.
        </p>
        <div className="bg-green-50 border-l-4 border-green-500 p-3 my-3">
          <p className="font-medium">To start the tour:</p>
          <p className="mt-1">Type <strong>GREET</strong> in the chat box below and press Enter.</p>
        </div>
        <p>
          Morgan and Casey will greet you in the parking lot, and you can begin your venue tour. Remember to:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Create a warm, welcoming atmosphere</li>
          <li>Showcase key features that match their needs</li>
          <li>Use storytelling to highlight venue features</li>
          <li>Address their specific concerns about space capacity and weather contingency plans</li>
          <li>End with a clear next step and timeline for follow-up</li>
        </ul>
      </div>
      
      <button
        onClick={onDismiss}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors"
      >
        Got it!
      </button>
    </div>
  );
};

export default VenueTourInstructions; 