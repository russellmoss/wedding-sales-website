import React from 'react';

function QualificationQuiz() {
  const quizUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/viewform?embedded=true";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-gilda text-darkBrown mb-8 text-center">Qualification Quiz</h1>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={quizUrl}
          width="100%"
          height="800"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Qualification Quiz"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}

export default QualificationQuiz; 