import React from 'react';

function VenueTourQuiz() {
  const quizUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/viewform?embedded=true";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-gilda text-darkBrown mb-8 text-center">Venue Tour Quiz</h1>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={quizUrl}
          width="100%"
          height="800"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Venue Tour Quiz"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}

export default VenueTourQuiz; 