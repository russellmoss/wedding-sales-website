import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContentPage from '../components/layout/ContentPage';
import QuizProgress from '../components/quizzes/QuizProgress';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

function Quizzes() {
  const { currentUser } = useAuth();
  const [completedQuizzes, setCompletedQuizzes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Force refresh when navigating to this page
  useEffect(() => {
    // This will run when the component mounts or when the location changes
    fetchCompletedQuizzes();
  }, [location]);

  // Load completed quizzes from localStorage and Firestore
  const fetchCompletedQuizzes = async () => {
    try {
      setIsLoading(true);
      
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
    } finally {
      setIsLoading(false);
    }
  };

  // Add a useEffect to fetch completed quizzes when the component mounts
  useEffect(() => {
    // Force a refresh of the completed quizzes data when the component mounts
    fetchCompletedQuizzes();
    
    // Also set up an interval to refresh the data every 5 seconds
    // This ensures that if the user completes a quiz and returns to this page,
    // the completion status will be updated
    const intervalId = setInterval(() => {
      fetchCompletedQuizzes();
    }, 5000);
    
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [currentUser]);

  // Check if a quiz is completed
  const isQuizCompleted = (category, quizId) => {
    const key = `${category}-${quizId}`;
    
    // Check if the quiz is in the completedQuizzes object
    if (completedQuizzes[key]) {
      console.log(`Quiz ${key} is completed (from completedQuizzes):`, completedQuizzes[key]);
      return true;
    }
    
    // If not found in completedQuizzes, check if it's in localStorage
    try {
      const localCompletedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '{}');
      if (localCompletedQuizzes[key]) {
        console.log(`Quiz ${key} is completed (from localStorage):`, localCompletedQuizzes[key]);
        // Update the state with this information
        setCompletedQuizzes(prev => ({
          ...prev,
          [key]: localCompletedQuizzes[key]
        }));
        return true;
      }
    } catch (error) {
      console.error('Error checking localStorage:', error);
    }
    
    console.log(`Quiz ${key} is not completed`);
    return false;
  };

  // Add a new state for tracking completion status
  const [quizCompletionStatus, setQuizCompletionStatus] = useState({});

  // Update completion status when component mounts or when completedQuizzes changes
  useEffect(() => {
    const updateCompletionStatus = async () => {
      const status = {};
      for (const category of Object.keys(quizCategories)) {
        for (const quiz of quizCategories[category]) {
          const key = `${category}-${quiz.id}`;
          status[key] = await isQuizCompleted(category, quiz.id);
        }
      }
      setQuizCompletionStatus(status);
    };
    
    updateCompletionStatus();
  }, [completedQuizzes, currentUser]);

  // Update the quiz list rendering to use completedQuizzes directly
  const renderQuizList = (category) => {
    return quizCategories[category].map(quiz => {
      const key = `${category}-${quiz.id}`;
      const isCompleted = isQuizCompleted(category, quiz.id);
      
      return (
        <li key={quiz.id} className="flex items-center">
          <span className={`mr-2 ${isCompleted ? 'text-green-500' : 'text-gray-400'}`}>
            {isCompleted ? '✓' : '○'}
          </span>
          <Link
            to={`/quizzes/${category}/${quiz.id}`}
            className={`text-blue-600 hover:underline ${isCompleted ? 'line-through text-gray-600' : ''}`}
          >
            {quiz.title}
          </Link>
        </li>
      );
    });
  };

  if (isLoading) {
    return (
      <ContentPage title="Quizzes">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </ContentPage>
    );
  }

  return (
    <ContentPage title="Quizzes">
      <div className="space-y-8">
        {/* Quiz Progress Component */}
        <QuizProgress />
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Quiz Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weddings Category */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Weddings</h3>
              <p className="text-gray-700 mb-4">
                Test your knowledge about our wedding venues, services, and packages.
              </p>
              <ul className="space-y-2 mb-4">
                {renderQuizList('weddings')}
              </ul>
              <Link to="/quizzes/weddings/venue-overview" className="button button-primary">
                Start Weddings Quizzes
              </Link>
            </div>
            
            {/* Sales Category */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Sales</h3>
              <p className="text-gray-700 mb-4">
                Test your knowledge about our sales process, from inquiry to closing.
              </p>
              <ul className="space-y-2 mb-4">
                {renderQuizList('sales')}
              </ul>
              <Link to="/quizzes/sales/overview" className="button button-primary">
                Start Sales Quizzes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  );
}

export default Quizzes; 