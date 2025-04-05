import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContentPage from '../layout/ContentPage';

function QuizResults() {
  const location = useLocation();
  const { quizTitle, score, totalQuestions, correctAnswers, incorrectAnswers } = location.state || {
    quizTitle: 'Quiz',
    score: 0,
    totalQuestions: 0,
    correctAnswers: [],
    incorrectAnswers: []
  };
  
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const passed = percentage >= 80;
  
  return (
    <ContentPage title={`${quizTitle} Results`}>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-gilda text-darkBrown mb-2">Quiz Results</h2>
          <div className={`text-4xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
            {percentage}%
          </div>
          <p className="text-gray-600 mt-2">
            {score} out of {totalQuestions} questions correct
          </p>
          <div className={`mt-4 p-3 rounded-md ${passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {passed ? 'Congratulations! You passed the quiz.' : 'You did not pass the quiz. Please review the material and try again.'}
          </div>
        </div>
        
        {incorrectAnswers.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-gilda text-darkBrown mb-3">Questions to Review</h3>
            <div className="space-y-4">
              {incorrectAnswers.map((item, index) => (
                <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                  <p className="font-medium">{item.question}</p>
                  <p className="text-gray-600 mt-1">Your answer: {item.yourAnswer}</p>
                  <p className="text-green-600 mt-1">Correct answer: {item.correctAnswer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <Link to="/quizzes" className="button button-secondary">
          Back to Quizzes
        </Link>
        {!passed && (
          <Link to={`/quizzes/${location.state?.quizId || ''}`} className="button button-primary">
            Retake Quiz
          </Link>
        )}
      </div>
    </ContentPage>
  );
}

export default QuizResults; 