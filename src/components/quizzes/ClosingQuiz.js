import React from 'react';

function ClosingQuiz() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-gilda text-darkBrown mb-8 text-center">Closing Quiz</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <iframe
          src="https://docs.google.com/forms/d/e/PLACEHOLDER_GOOGLE_FORM_ID/viewform?embedded=true"
          width="100%"
          height="800px"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Closing Quiz"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}

export default ClosingQuiz; 