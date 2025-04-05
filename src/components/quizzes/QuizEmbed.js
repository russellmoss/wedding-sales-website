import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContentPage from '../layout/ContentPage';
import QuizCompletionButton from './QuizCompletionButton';
import { useCompletedQuizzes } from '../../hooks/useCompletedQuizzes';

function QuizEmbed() {
  const { category, quizId } = useParams();
  const navigate = useNavigate();
  const { isQuizCompleted } = useCompletedQuizzes();
  const [quizTitle, setQuizTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set the quiz title based on the category and quizId
    const getQuizTitle = () => {
      const titles = {
        'weddings': {
          'venue-overview': 'Venue Overview Quiz',
          'clubhouse': 'The Clubhouse Quiz',
          'farmhouse': 'The Farmhouse Quiz',
          'event-planning': 'Event Planning Quiz',
          'food-and-wine': 'Food & Wine Quiz',
          'drink-packages': 'Drink Packages Quiz',
          'accommodations': 'Accommodations Quiz',
          'associated-events': 'Associated Events Quiz',
          'preferred-vendors': 'Preferred Vendors Quiz',
          'faq': 'FAQ Quiz'
        },
        'sales': {
          'overview': 'Sales Overview Quiz',
          'inquiry-response': 'Inquiry Response Quiz',
          'qualification': 'Qualification Quiz',
          'venue-tour': 'Venue Tour Quiz',
          'proposal': 'Proposal Quiz',
          'follow-up': 'Follow Up Quiz',
          'closing': 'Closing Quiz',
          'post-booking': 'Post-Booking Quiz',
          'crm-tips': 'CRM Tips Quiz'
        }
      };

      return titles[category]?.[quizId] || 'Quiz';
    };

    setQuizTitle(getQuizTitle());
    setIsLoading(false);
  }, [category, quizId]);

  // Get the iframe source based on the category and quizId
  const getIframeSource = () => {
    const iframes = {
      'weddings': {
        'venue-overview': 'https://docs.google.com/forms/d/e/1FAIpQLSedB1Ru9Ri0BJEKlvd1QAVC0TQrI4i2db1_UAvOGpfWX8wfTw/viewform?embedded=true',
        'clubhouse': 'https://docs.google.com/forms/d/e/1FAIpQLSfW2ATVuT7YiVdwLz3lu2lC6sTYI8b9yz9rNjXhw_H7wM3qoA/viewform?embedded=true',
        'farmhouse': 'https://docs.google.com/forms/d/e/1FAIpQLSfWI2R53LdlKYwy81GXUah2bH-FoVNumUrudHygwwGdtiZ2dw/viewform?embedded=true',
        'event-planning': 'https://docs.google.com/forms/d/e/1FAIpQLSepu6YUkh_3_bj8it6RwgeqUY1N4FooRwP0iw8w21dvV4cdsA/viewform?embedded=true',
        'food-and-wine': 'https://docs.google.com/forms/d/e/1FAIpQLSd6EXIyFnEwwn-5HgkoZmsytJqNsFeZUg_Q0AKrJ--J7UBTfQ/viewform?embedded=true',
        'drink-packages': 'https://docs.google.com/forms/d/e/1FAIpQLSerHDqeUu2Y7zdzWbrOaPlZN1igvn6RP1ELQ6wj_Iq6sxi6NQ/viewform?embedded=true',
        'accommodations': 'https://docs.google.com/forms/d/e/1FAIpQLSdalSSvFOTH7GBwPX42IX6tQIFBNc8NuKm60a-K_O7caWuAuw/viewform?embedded=true',
        'associated-events': 'https://docs.google.com/forms/d/e/1FAIpQLSegD-VavyLQyht0pw3U_mToiLBzZn8sDMbi8yS9yK3aOlQRhA/viewform?embedded=true',
        'preferred-vendors': 'https://docs.google.com/forms/d/e/1FAIpQLSfB3IxiI1IE5aEt2EDdDthTYn7l--5DuuMC4xS9q1w0iwzpsQ/viewform?embedded=true',
        'faq': 'https://docs.google.com/forms/d/e/1FAIpQLSfcAxFRRd7qFwwzQhJKMOgU6YDHiHbrP28jQpmmhHwZU98qdw/viewform?embedded=true',
      },
      'sales': {
        'overview': 'https://docs.google.com/forms/d/e/1FAIpQLScfC0gSjqxKwiVyvWd4GmtBx051iGuiFZNbaHo8UmuA7MOFeA/viewform?embedded=true',
        'inquiry-response': 'https://docs.google.com/forms/d/e/1FAIpQLSdqHf29aM-V_oGHKYHWOcCCAahXNOaMR2Lj-TOq5WlKnAdadw/viewform?embedded=true',
        'qualification': 'https://docs.google.com/forms/d/e/1FAIpQLSc2lOV2L6RGeu4ZroY43MvoaxkdsLSjy3urEw2Xrs0vphYwGA/viewform?embedded=true',
        'venue-tour': 'https://docs.google.com/forms/d/e/1FAIpQLSe3x17zAGuxF2tjZwkRn9tEs2F8YHKAb4cK196WNgHHqsZW5A/viewform?embedded=true',
        'proposal': 'https://docs.google.com/forms/d/e/1FAIpQLSdu34VgsDl6AcG1xJFMSi9pLX7d72KOdnbcB9PoFhwsZeoP2A/viewform?embedded=true',
        'follow-up': 'https://docs.google.com/forms/d/e/1FAIpQLSfNDfVT303xxpJIgiSqPXKJC_H0ku8GiwrBHN-sBhQpxhK1eg/viewform?embedded=true',
        'closing': 'https://docs.google.com/forms/d/e/1FAIpQLScj38rzqWea66IpxRLmJV7eQzmFBH37yWUl5MrRHghsX2MchA/viewform?embedded=true',
        'post-booking': 'https://docs.google.com/forms/d/e/1FAIpQLSdKbLbvxFdmxZGc7LJzsqyI9NABpg1ott0EBMKVXoGRDffQVQ/viewform?embedded=true',
        'crm-tips': 'https://docs.google.com/forms/d/e/1FAIpQLSdOwL8EU_2NGYi4UZ-2Ayx_GHysJkO51q-IY4l_ujcIrGsNdA/viewform?embedded=true',
      }
    };
    
    return iframes[category]?.[quizId] || 'https://docs.google.com/forms/d/e/1FAIpQLSd8FTQdYFiqHHKLS20HRmIUzjgcVIqlIFgs16r4KNtHlSazIA/viewform?embedded=true';
  };

  // Get the iframe height based on the quiz
  const getIframeHeight = () => {
    const heights = {
      'weddings': {
        'venue-overview': '1563',
        'clubhouse': '1679',
        'farmhouse': '1806',
        'event-planning': '1679',
        'food-and-wine': '2056',
        'drink-packages': '2116',
        'accommodations': '1738',
        'associated-events': '1436',
        'preferred-vendors': '1965',
        'faq': '2172',
      },
      'sales': {
        'overview': '3602',
        'inquiry-response': '1857',
        'qualification': '2061',
        'venue-tour': '2124',
        'proposal': '1929',
        'follow-up': '1977',
        'closing': '2371',
        'post-booking': '2172',
        'crm-tips': '2748',
      }
    };
    
    return heights[category]?.[quizId] || '600';
  };

  if (isLoading) {
    return (
      <ContentPage title={quizTitle}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </ContentPage>
    );
  }

  return (
    <ContentPage title={quizTitle}>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            This quiz will test your knowledge about {quizTitle.toLowerCase()}. 
            Please complete all questions to the best of your ability.
          </p>
          <p className="text-gray-700 mb-4">
            After submitting the quiz, click the "Mark as Completed" button below to track your progress.
          </p>
          {isQuizCompleted(category, quizId) && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Completed!</strong>
              <span className="block sm:inline"> You have already completed this quiz.</span>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center">
            <iframe 
              src={getIframeSource()}
              width="100%" 
              height={getIframeHeight()} 
              frameBorder="0" 
              marginHeight="0" 
              marginWidth="0"
              title={quizTitle}
              className="max-w-3xl mx-auto"
              allowFullScreen
            >
              Loading…
            </iframe>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <p className="text-gray-700 mb-4 text-center">
              After submitting the Google Form above, click the button below to mark this quiz as completed.
            </p>
            <QuizCompletionButton 
              category={category} 
              quizId={quizId} 
              quizTitle={quizTitle} 
            />
          </div>
        </div>
        
        <div className="flex justify-between">
          <button 
            onClick={() => navigate('/quizzes')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    </ContentPage>
  );
}

export default QuizEmbed; 