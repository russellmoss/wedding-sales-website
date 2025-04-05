import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

/**
 * Custom hook for managing quiz completion status
 * @returns {Object} Object containing completed quizzes, loading state, and functions to manage completion status
 */
export function useCompletedQuizzes() {
  const { currentUser } = useAuth();
  const [completedQuizzes, setCompletedQuizzes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load completed quizzes from localStorage and Firestore
  useEffect(() => {
    const fetchCompletedQuizzes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // First check localStorage for quick access
        const localCompletedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '{}');
        console.log('Local completed quizzes:', localCompletedQuizzes);
        
        // Initialize state with localStorage data
        setCompletedQuizzes(localCompletedQuizzes);
        
        // If user is logged in, fetch from Firestore for cross-device sync
        if (currentUser) {
          const userRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            console.log('Firestore user data:', userDoc.data());
            const firestoreProgress = userDoc.data().quizProgress || {};
            console.log('Firestore quiz progress:', firestoreProgress);
            
            // Update completed quizzes from Firestore
            const updatedCompletedQuizzes = { ...localCompletedQuizzes };
            
            // Process Firestore data - handle nested structure
            Object.entries(firestoreProgress).forEach(([key, quizData]) => {
              if (quizData.completed) {
                console.log(`Processing completed quiz ${key}:`, quizData);
                updatedCompletedQuizzes[key] = {
                  completedAt: quizData.completedAt || new Date().toISOString(),
                  title: quizData.title || 'Quiz'
                };
              }
            });
            
            console.log('Final completed quizzes:', updatedCompletedQuizzes);
            
            // Update state with Firestore data
            setCompletedQuizzes(updatedCompletedQuizzes);
            
            // Update localStorage with merged data
            localStorage.setItem('completedQuizzes', JSON.stringify(updatedCompletedQuizzes));
          }
        }
      } catch (error) {
        console.error('Error fetching completed quizzes:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompletedQuizzes();
  }, [currentUser]);

  /**
   * Check if a quiz is completed
   * @param {string} category - The quiz category (e.g., 'weddings')
   * @param {string} quizId - The quiz ID (e.g., 'venue-overview')
   * @returns {boolean} Whether the quiz is completed
   */
  const isQuizCompleted = (category, quizId) => {
    const key = `${category}-${quizId}`;
    
    // Check if the quiz is in the completedQuizzes state
    if (completedQuizzes[key]) {
      console.log(`Quiz ${key} is completed (from state):`, completedQuizzes[key]);
      return true;
    }
    
    console.log(`Quiz ${key} is not completed`);
    return false;
  };

  /**
   * Mark a quiz as completed
   * @param {string} category - The quiz category (e.g., 'weddings')
   * @param {string} quizId - The quiz ID (e.g., 'venue-overview')
   * @param {string} quizTitle - The title of the quiz
   * @returns {Promise<void>}
   */
  const markQuizAsCompleted = async (category, quizId, quizTitle) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const key = `${category}-${quizId}`;
      const completedAt = new Date().toISOString();
      console.log(`Marking quiz ${key} as completed`);

      // Update localStorage
      const localCompletedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '{}');
      localCompletedQuizzes[key] = {
        completedAt,
        title: quizTitle
      };
      localStorage.setItem('completedQuizzes', JSON.stringify(localCompletedQuizzes));
      console.log('Updated localStorage:', localCompletedQuizzes);

      // Update state
      setCompletedQuizzes(localCompletedQuizzes);

      // If user is logged in, update Firestore
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const quizProgress = userData.quizProgress || {};
          
          // Update the specific quiz's progress
          quizProgress[key] = {
            ...quizProgress[key],
            completed: true,
            completedAt,
            title: quizTitle
          };
          
          // Update Firestore
          await updateDoc(userRef, {
            quizProgress
          });
          console.log('Successfully updated Firestore');
        }
      }
    } catch (error) {
      console.error('Error marking quiz as complete:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Refresh the completed quizzes data
   * @returns {Promise<void>}
   */
  const refreshCompletedQuizzes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Clear the current state
      setCompletedQuizzes({});
      
      // Reload from localStorage and Firestore
      const localCompletedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '{}');
      setCompletedQuizzes(localCompletedQuizzes);
      
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const firestoreProgress = userDoc.data().quizProgress || {};
          const updatedCompletedQuizzes = { ...localCompletedQuizzes };
          
          Object.entries(firestoreProgress).forEach(([key, quizData]) => {
            if (quizData.completed) {
              updatedCompletedQuizzes[key] = {
                completedAt: quizData.completedAt || new Date().toISOString(),
                title: quizData.title || 'Quiz'
              };
            }
          });
          
          setCompletedQuizzes(updatedCompletedQuizzes);
          localStorage.setItem('completedQuizzes', JSON.stringify(updatedCompletedQuizzes));
        }
      }
    } catch (error) {
      console.error('Error refreshing completed quizzes:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    completedQuizzes,
    isLoading,
    error,
    isQuizCompleted,
    markQuizAsCompleted,
    refreshCompletedQuizzes
  };
} 