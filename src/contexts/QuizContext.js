import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { db } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const QuizContext = createContext();

export function useQuiz() {
  return useContext(QuizContext);
}

export function QuizProvider({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  
  const startQuiz = (quizId) => {
    setCurrentQuiz(quizId);
    setQuizResults(null);
  };
  
  const submitQuiz = async (results) => {
    if (!currentUser || !currentQuiz) return;
    
    try {
      // Save results to Firestore
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      let quizProgress = {};
      if (userDoc.exists() && userDoc.data().quizProgress) {
        quizProgress = userDoc.data().quizProgress;
      }
      
      // Update progress for this quiz
      quizProgress[currentQuiz] = {
        completed: true,
        score: results.score,
        passed: results.passed,
        lastAttempt: new Date()
      };
      
      await setDoc(userRef, { quizProgress }, { merge: true });
      
      // Set results and navigate to results page
      setQuizResults(results);
      navigate('/quizzes/results', { 
        state: { 
          quizId: currentQuiz,
          quizTitle: results.quizTitle,
          score: results.score,
          totalQuestions: results.totalQuestions,
          correctAnswers: results.correctAnswers,
          incorrectAnswers: results.incorrectAnswers
        } 
      });
    } catch (error) {
      console.error('Error saving quiz results:', error);
    }
  };
  
  const value = {
    currentQuiz,
    quizResults,
    startQuiz,
    submitQuiz
  };
  
  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
} 