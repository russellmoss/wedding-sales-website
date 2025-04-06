import React from 'react';

const InitialInquiryInstructions = ({ onDismiss }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Initial Inquiry Response</h2>
          <button
            onClick={onDismiss}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            You are a sales representative for Milea Estate Vineyard. Taylor and Jordan Smith have submitted a web form inquiry about their wedding. Your task is to respond to their inquiry via email.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-blue-800 mb-2">Your Role:</h3>
            <ul className="list-disc pl-5 text-blue-700 space-y-1">
              <li>Respond promptly and personally to Taylor and Jordan's inquiry via email</li>
              <li>Build rapport and show enthusiasm about their wedding plans</li>
              <li>Address their specific needs and concerns</li>
              <li>Gather any additional information you need</li>
              <li>Guide the conversation toward scheduling a venue tour</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Key Points to Remember:</h3>
            <ul className="list-disc pl-5 text-purple-700 space-y-1">
              <li>Personalize your response by referencing details from their inquiry</li>
              <li>Be warm and welcoming while maintaining professionalism</li>
              <li>Address their budget concerns ($25,000 - $30,000)</li>
              <li>Mention the beautiful scenery and intimate atmosphere they're looking for</li>
              <li>Include a clear call to action (scheduling a tour)</li>
              <li>Provide your contact information for follow-up</li>
              <li>Format your response as a proper email with greeting and signature</li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onDismiss}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitialInquiryInstructions; 