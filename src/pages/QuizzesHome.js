import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContentPage from '../components/layout/ContentPage';
import QuizProgress from '../components/quizzes/QuizProgress';
import { useCompletedQuizzes } from '../hooks/useCompletedQuizzes';

function QuizzesHome() {
  const location = useLocation();
  const { 
    completedQuizzes, 
    isLoading, 
    isQuizCompleted, 
    refreshCompletedQuizzes 
  } = useCompletedQuizzes();

  // Refresh completed quizzes when returning from a quiz completion
  useEffect(() => {
    if (location.state?.refreshQuizzes) {
      console.log('Refreshing completed quizzes due to navigation state');
      refreshCompletedQuizzes();
    }
  }, [location.state?.refreshQuizzes, refreshCompletedQuizzes]);

  const categories = [
    {
      id: 'weddings',
      title: 'Wedding Knowledge Quizzes',
      description: 'Test your understanding of Milea Estate Vineyard\'s wedding offerings, venues, and policies.',
      quizzes: [
        {
          id: 'venue-overview',
          title: 'Venue Overview Quiz',
          description: 'Test your knowledge about Milea Estate\'s venue features and amenities.',
          path: '/quizzes/weddings/venue-overview'
        },
        {
          id: 'clubhouse',
          title: 'The Clubhouse Quiz',
          description: 'Learn about the features and capacity of our Clubhouse venue.',
          path: '/quizzes/weddings/clubhouse'
        },
        {
          id: 'farmhouse',
          title: 'The Farmhouse Quiz',
          description: 'Test your knowledge about our charming Farmhouse venue.',
          path: '/quizzes/weddings/farmhouse'
        },
        {
          id: 'event-planning',
          title: 'Event Planning Quiz',
          description: 'Test your understanding of our event planning process and services.',
          path: '/quizzes/weddings/event-planning'
        },
        {
          id: 'food-and-wine',
          title: 'Food & Wine Quiz',
          description: 'Learn about our culinary offerings and wine selection.',
          path: '/quizzes/weddings/food-and-wine'
        },
        {
          id: 'drink-packages',
          title: 'Drink Packages Quiz',
          description: 'Test your knowledge of our beverage packages and options.',
          path: '/quizzes/weddings/drink-packages'
        },
        {
          id: 'accommodations',
          title: 'Accommodations Quiz',
          description: 'Learn about our lodging options and guest services.',
          path: '/quizzes/weddings/accommodations'
        },
        {
          id: 'associated-events',
          title: 'Associated Events Quiz',
          description: 'Test your knowledge of pre and post-wedding event options.',
          path: '/quizzes/weddings/associated-events'
        },
        {
          id: 'preferred-vendors',
          title: 'Preferred Vendors Quiz',
          description: 'Learn about our network of trusted vendor partners.',
          path: '/quizzes/weddings/preferred-vendors'
        },
        {
          id: 'faq',
          title: 'FAQ Quiz',
          description: 'Test your knowledge of frequently asked questions.',
          path: '/quizzes/weddings/faq'
        }
      ]
    },
    {
      id: 'sales',
      title: 'Sales Process Quizzes',
      description: 'Evaluate your mastery of our sales funnel, from inquiry response to closing and beyond.',
      quizzes: [
        {
          id: 'overview',
          title: 'Sales Overview Quiz',
          description: 'Test your understanding of our sales funnel and conversion strategies.',
          path: '/quizzes/sales/overview'
        },
        {
          id: 'inquiry-response',
          title: 'Inquiry Response Quiz',
          description: 'Learn how to effectively respond to wedding inquiries.',
          path: '/quizzes/sales/inquiry-response'
        },
        {
          id: 'qualification',
          title: 'Qualification Quiz',
          description: 'Test your ability to qualify potential clients.',
          path: '/quizzes/sales/qualification'
        },
        {
          id: 'venue-tour',
          title: 'Venue Tour Quiz',
          description: 'Learn how to conduct effective venue tours.',
          path: '/quizzes/sales/venue-tour'
        },
        {
          id: 'proposal',
          title: 'Proposal Quiz',
          description: 'Test your knowledge of creating compelling proposals.',
          path: '/quizzes/sales/proposal'
        },
        {
          id: 'follow-up',
          title: 'Follow Up Quiz',
          description: 'Learn effective follow-up strategies.',
          path: '/quizzes/sales/follow-up'
        },
        {
          id: 'closing',
          title: 'Closing Quiz',
          description: 'Test your closing techniques and strategies.',
          path: '/quizzes/sales/closing'
        },
        {
          id: 'post-booking',
          title: 'Post-Booking Quiz',
          description: 'Learn about post-booking best practices.',
          path: '/quizzes/sales/post-booking'
        },
        {
          id: 'crm-tips',
          title: 'CRM Tips Quiz',
          description: 'Test your knowledge of CRM best practices.',
          path: '/quizzes/sales/crm-tips'
        }
      ]
    }
  ];

  return (
    <ContentPage title="Knowledge Assessment Quizzes">
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            These quizzes will help you test your understanding of the material covered in the onboarding content.
            Each quiz corresponds to a specific section of the training materials.
          </p>
          <p className="text-gray-700">
            You can take these quizzes as many times as needed until you feel confident in your knowledge.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <QuizProgress />
            
            {categories.map(category => (
              <div key={category.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-gilda text-darkBrown mb-4">{category.title}</h2>
                <p className="text-gray-700 mb-6">{category.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {category.quizzes.map(quiz => {
                    const isCompleted = isQuizCompleted(category.id, quiz.id);
                    return (
                      <div key={quiz.id} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow relative">
                        {isCompleted && (
                          <div className="absolute top-2 right-2 text-green-500 text-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                        <h3 className="text-lg font-medium text-darkBrown mb-2">{quiz.title}</h3>
                        <p className="text-gray-600 mb-4">{quiz.description}</p>
                        <Link
                          to={quiz.path}
                          className={`inline-block px-4 py-2 rounded transition-colors ${
                            isCompleted 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-darkBrown text-white hover:bg-brown'
                          }`}
                        >
                          {isCompleted ? 'Review Quiz' : 'Take Quiz'}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </ContentPage>
  );
}

export default QuizzesHome; 