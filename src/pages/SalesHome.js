import React from 'react';
import ContentPage from '../components/layout/ContentPage';
import ContentCard from '../components/shared/ContentCard';

function SalesHome() {
  const salesTopics = [
    { 
      id: 'overview',
      path: '/sales/overview', 
      title: 'Sales Overview', 
      description: 'Understand the Milea wedding sales funnel & response strategy.',
      category: 'process',
      icon: '📊'
    },
    { 
      id: 'inquiry-response',
      path: '/sales/inquiry-response', 
      title: 'Inquiry Response', 
      description: 'Learn how to respond quickly and personally to inquiries.',
      category: 'process',
      icon: '✉️'
    },
    { 
      id: 'qualification',
      path: '/sales/qualification', 
      title: 'Qualification', 
      description: 'Determine if a couple is a good fit for Milea.',
      category: 'process',
      icon: '✅'
    },
    { 
      id: 'venue-tour',
      path: '/sales/venue-tour', 
      title: 'Venue Tour', 
      description: 'Guide couples through an effective venue tour experience.',
      category: 'process',
      icon: '🏰'
    },
    { 
      id: 'proposal',
      path: '/sales/proposal', 
      title: 'Proposal', 
      description: 'Create and deliver compelling wedding proposals.',
      category: 'process',
      icon: '📝'
    },
    { 
      id: 'followup',
      path: '/sales/followup', 
      title: 'Follow-Up', 
      description: 'Implement strategic follow-up to move toward booking.',
      category: 'process',
      icon: '📞'
    },
    { 
      id: 'closing',
      path: '/sales/closing', 
      title: 'Closing', 
      description: 'Secure signed contracts and deposits effectively.',
      category: 'process',
      icon: '🤝'
    },
    { 
      id: 'post-booking',
      path: '/sales/post-booking', 
      title: 'Post-Booking', 
      description: 'Turn booked couples into enthusiastic ambassadors.',
      category: 'process',
      icon: '🎉'
    },
    { 
      id: 'crm-tips',
      path: '/sales/crm-tips', 
      title: 'CRM Tips', 
      description: 'Master our CRM system for effective client management.',
      category: 'tools',
      icon: '💻'
    }
  ];

  return (
    <ContentPage title="About Sales at Milea">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <p className="mb-4">
          This section covers our proven sales methodology for wedding events at Milea Estate Vineyard. 
          Master these techniques to effectively convert inquiries into bookings and provide exceptional 
          service throughout the client journey.
        </p>
        
        <p className="mb-4">
          Each topic includes detailed information and will be followed by a quiz to test your knowledge.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {salesTopics.map((topic) => (
          <ContentCard
            key={topic.id}
            title={topic.title}
            description={topic.description}
            path={topic.path}
            category={topic.category}
            icon={topic.icon}
          />
        ))}
      </div>
    </ContentPage>
  );
}

export default SalesHome; 