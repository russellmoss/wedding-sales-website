import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompletedQuizzes } from '../../hooks/useCompletedQuizzes';

function QuizCompletionButton({ category, quizId, quizTitle }) {
  const navigate = useNavigate();
  const { markQuizAsCompleted } = useCompletedQuizzes();
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleQuizComplete = async () => {
    try {
      setIsLoading(true);
      
      // Use the hook's function to mark the quiz as completed
      await markQuizAsCompleted(category, quizId, quizTitle);

      // Show completion message
      setShowMessage(true);
      setIsCompleted(true);

      // Use React Router's navigate function
      setTimeout(() => {
        // Navigate to quizzes page with a state parameter to trigger refresh
        navigate('/quizzes', { 
          state: { 
            refreshQuizzes: true,
            completedQuiz: `${category}-${quizId}`
          }
        });
      }, 2000);

    } catch (error) {
      console.error('Error marking quiz as complete:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {showMessage ? (
        <div className="text-green-600 font-medium">
          Quiz marked as complete! Redirecting...
        </div>
      ) : (
        <button
          onClick={handleQuizComplete}
          disabled={isLoading || isCompleted}
          className={`px-4 py-2 rounded transition-colors ${
            isCompleted
              ? 'bg-green-100 text-green-800 cursor-not-allowed'
              : 'bg-darkBrown text-white hover:bg-brown'
          }`}
        >
          {isLoading ? 'Marking as Complete...' : isCompleted ? 'Completed' : 'Mark as Complete'}
        </button>
      )}
    </div>
  );
}

export default QuizCompletionButton; 