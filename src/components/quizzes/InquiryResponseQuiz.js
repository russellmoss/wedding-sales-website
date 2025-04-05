import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function InquiryResponseQuiz() {
  const { quizId } = useParams();

  // Map of quiz IDs to Google Form URLs
  const quizUrls = {
    'inquiry-response': 'https://docs.google.com/forms/d/e/1FAIpQLSdXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/viewform?embedded=true',
    // Add other quiz URLs as needed
  };

  useEffect(() => {
    // Start the quiz when the component mounts
    const iframe = document.getElementById('quiz-iframe');
    if (iframe) {
      iframe.src = quizUrls[quizId] || quizUrls['inquiry-response'];
    }
  }, [quizId]);

  const getQuizTitle = (id) => {
    const titles = {
      'inquiry-response': 'Inquiry Response Quiz',
      // Add other quiz titles as needed
    };
    return titles[id] || 'Inquiry Response Quiz';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-gilda mb-6 text-darkBrown">{getQuizTitle(quizId)}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <iframe
          id="quiz-iframe"
          className="w-full h-[800px] border-0"
          title="Inquiry Response Quiz"
        />
      </div>
    </div>
  );
}

export default InquiryResponseQuiz; 