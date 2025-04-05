import React from 'react';

function ProposalQuiz() {
  const quizUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdXXXXXXXXXXXXXXX/viewform?embedded=true";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-gilda text-darkBrown mb-8 text-center">Proposal Quiz</h1>
      <iframe
        src={quizUrl}
        width="100%"
        height="800"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Proposal Quiz"
      >
        Loading…
      </iframe>
    </div>
  );
}

export default ProposalQuiz; 