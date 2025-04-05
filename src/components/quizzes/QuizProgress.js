import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

function QuizProgress() {
  const { currentUser } = useAuth();
  const [completedQuizzes, setCompletedQuizzes] = useState({});
  const [progress, setProgress] = useState({
    weddings: { completed: 0, total: 0 },
    sales: { completed: 0, total: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Quiz categories and their quizzes
  const quizCategories = {
    weddings: [
      { id: 'venue-overview', title: 'Venue Overview Quiz' },
      { id: 'clubhouse', title: 'The Clubhouse Quiz' },
      { id: 'farmhouse', title: 'The Farmhouse Quiz' },
      { id: 'event-planning', title: 'Event Planning Quiz' },
      { id: 'food-and-wine', title: 'Food & Wine Quiz' },
      { id: 'drink-packages', title: 'Drink Packages Quiz' },
      { id: 'accommodations', title: 'Accommodations Quiz' },
      { id: 'associated-events', title: 'Associated Events Quiz' },
      { id: 'preferred-vendors', title: 'Preferred Vendors Quiz' },
      { id: 'faq', title: 'FAQ Quiz' }
    ],
    sales: [
      { id: 'overview', title: 'Sales Overview Quiz' },
      { id: 'inquiry-response', title: 'Inquiry Response Quiz' },
      { id: 'qualification', title: 'Qualification Quiz' },
      { id: 'venue-tour', title: 'Venue Tour Quiz' },
      { id: 'proposal', title: 'Proposal Quiz' },
      { id: 'follow-up', title: 'Follow Up Quiz' },
      { id: 'closing', title: 'Closing Quiz' },
      { id: 'post-booking', title: 'Post-Booking Quiz' },
      { id: 'crm-tips', title: 'CRM Tips Quiz' }
    ]
  };

  // Load completed quizzes from localStorage and Firestore
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // First check localStorage for quick access
        const localCompletedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '{}');
        setCompletedQuizzes(localCompletedQuizzes);
        
        // Calculate initial progress from localStorage
        const newProgress = {
          weddings: { completed: 0, total: quizCategories.weddings.length },
          sales: { completed: 0, total: quizCategories.sales.length }
        };
        
        // Count completed quizzes in each category from localStorage
        Object.keys(localCompletedQuizzes).forEach(key => {
          const [category, quizId] = key.split('-');
          if (category === 'weddings') {
            newProgress.weddings.completed++;
          } else if (category === 'sales') {
            newProgress.sales.completed++;
          }
        });
        
        setProgress(newProgress);
        
        // If user is logged in, fetch from Firestore for cross-device sync
        if (currentUser) {
          const userRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists() && userDoc.data().quizProgress) {
            const firestoreProgress = userDoc.data().quizProgress;
            
            // Update completed quizzes from Firestore
            const updatedCompletedQuizzes = { ...localCompletedQuizzes };
            let updatedProgress = { ...newProgress };
            
            // Reset progress counters
            updatedProgress.weddings.completed = 0;
            updatedProgress.sales.completed = 0;
            
            // Process Firestore data
            Object.keys(firestoreProgress).forEach(key => {
              const [category, quizId] = key.split('-');
              const isCompleted = firestoreProgress[key]?.completed || false;
              
              if (isCompleted) {
                // Update localStorage with Firestore data
                updatedCompletedQuizzes[key] = {
                  completedAt: firestoreProgress[key]?.completedAt || new Date().toISOString(),
                  title: firestoreProgress[key]?.title || quizCategories[category]?.find(q => q.id === quizId)?.title || 'Quiz'
                };
                
                // Update progress counters
                if (category === 'weddings') {
                  updatedProgress.weddings.completed++;
                } else if (category === 'sales') {
                  updatedProgress.sales.completed++;
                }
              }
            });
            
            // Update state with Firestore data
            setCompletedQuizzes(updatedCompletedQuizzes);
            setProgress(updatedProgress);
            
            // Update localStorage with merged data
            localStorage.setItem('completedQuizzes', JSON.stringify(updatedCompletedQuizzes));
          }
        }
      } catch (error) {
        console.error('Error fetching quiz progress:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProgress();
  }, [currentUser]);

  // Calculate overall progress percentage
  const totalQuizzes = progress.weddings.total + progress.sales.total;
  const totalCompleted = progress.weddings.completed + progress.sales.completed;
  const overallProgress = totalQuizzes > 0 ? Math.round((totalCompleted / totalQuizzes) * 100) : 0;

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Your Quiz Progress</h2>
      
      {/* Overall progress bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Overall Progress</span>
          <span className="font-medium">{overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Category progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weddings category */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Weddings</h3>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">
              {progress.weddings.completed} of {progress.weddings.total} completed
            </span>
            <span className="text-sm font-medium">
              {Math.round((progress.weddings.completed / progress.weddings.total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-purple-600 h-2.5 rounded-full" 
              style={{ width: `${(progress.weddings.completed / progress.weddings.total) * 100}%` }}
            ></div>
          </div>
          
          <ul className="space-y-2">
            {quizCategories.weddings.map(quiz => {
              const isCompleted = completedQuizzes[`weddings-${quiz.id}`];
              return (
                <li key={quiz.id} className="flex items-center">
                  <span className={`mr-2 ${isCompleted ? 'text-green-500' : 'text-gray-400'}`}>
                    {isCompleted ? '✓' : '○'}
                  </span>
                  <Link 
                    to={`/quizzes/weddings/${quiz.id}`}
                    className={`text-sm ${isCompleted ? 'text-gray-600 line-through' : 'text-blue-600 hover:underline'}`}
                  >
                    {quiz.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        
        {/* Sales category */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Sales</h3>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">
              {progress.sales.completed} of {progress.sales.total} completed
            </span>
            <span className="text-sm font-medium">
              {Math.round((progress.sales.completed / progress.sales.total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${(progress.sales.completed / progress.sales.total) * 100}%` }}
            ></div>
          </div>
          
          <ul className="space-y-2">
            {quizCategories.sales.map(quiz => {
              const isCompleted = completedQuizzes[`sales-${quiz.id}`];
              return (
                <li key={quiz.id} className="flex items-center">
                  <span className={`mr-2 ${isCompleted ? 'text-green-500' : 'text-gray-400'}`}>
                    {isCompleted ? '✓' : '○'}
                  </span>
                  <Link 
                    to={`/quizzes/sales/${quiz.id}`}
                    className={`text-sm ${isCompleted ? 'text-gray-600 line-through' : 'text-blue-600 hover:underline'}`}
                  >
                    {quiz.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default QuizProgress; 