import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ContentPage from '../layout/ContentPage';
import { useQuiz } from '../../contexts/QuizContext';

function Quiz() {
  const { quizId } = useParams();
  const { startQuiz } = useQuiz();
  
  // Map quiz IDs to their corresponding Google Form URLs
  const quizForms = {
    'venue-overview': 'https://docs.google.com/forms/d/e/1FAIpQLSd8FTQdYFiqHHKLS20HRmIUzjgcVIqlIFgs16r4KNtHlSazIA/viewform?embedded=true',
    'clubhouse': 'https://docs.google.com/forms/d/e/1FAIpQLSd8FTQdYFiqHHKLS20HRmIUzjgcVIqlIFgs16r4KNtHlSazIA/viewform?embedded=true',
    'farmhouse': 'https://docs.google.com/forms/d/e/1FAIpQLSd8FTQdYFiqHHKLS20HRmIUzjgcVIqlIFgs16r4KNtHlSazIA/viewform?embedded=true',
    'sales-process': 'https://docs.google.com/forms/d/e/1FAIpQLSd8FTQdYFiqHHKLS20HRmIUzjgcVIqlIFgs16r4KNtHlSazIA/viewform?embedded=true',
    'inquiry-response': 'https://docs.google.com/forms/d/e/1FAIpQLSd8FTQdYFiqHHKLS20HRmIUzjgcVIqlIFgs16r4KNtHlSazIA/viewform?embedded=true',
    'faq': 'https://docs.google.com/forms/d/e/1FAIpQLSd8FTQdYFiqHHKLS20HRmIUzjgcVIqlIFgs16r4KNtHlSazIA/viewform?embedded=true'
  };
  
  // Get the form URL for the current quiz
  const formUrl = quizForms[quizId] || quizForms['venue-overview'];
  
  // Get the quiz title based on the ID
  const getQuizTitle = (id) => {
    const titles = {
      'venue-overview': 'Venue Overview Quiz',
      'clubhouse': 'The Clubhouse Quiz',
      'farmhouse': 'The Farmhouse Quiz',
      'sales-process': 'Sales Process Quiz',
      'inquiry-response': 'Inquiry Response Quiz',
      'faq': 'FAQ Quiz'
    };
    return titles[id] || 'Quiz';
  };
  
  // Start the quiz when the component mounts
  useEffect(() => {
    startQuiz(quizId);
  }, [quizId, startQuiz]);
  
  return (
    <ContentPage title={getQuizTitle(quizId)}>
      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          This quiz will test your knowledge about {getQuizTitle(quizId).toLowerCase()}. 
          Please complete all questions to the best of your ability.
        </p>
        <p className="text-gray-700 mb-4">
          After submitting the quiz, you will receive immediate feedback on your answers.
        </p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="aspect-w-16 aspect-h-9">
          <iframe 
            src={formUrl} 
            width="100%" 
            height="600px" 
            frameBorder="0" 
            marginHeight="0" 
            marginWidth="0"
            title={`${getQuizTitle(quizId)} Form`}
            className="w-full h-[600px]"
          >
            Loading…
          </iframe>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Link to="/quizzes" className="button button-secondary">
          Back to Quizzes
        </Link>
      </div>
    </ContentPage>
  );
}

export default Quiz; 