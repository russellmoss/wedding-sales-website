import React from 'react';
import ContentPage from '../components/layout/ContentPage';
import ContentCard from '../components/shared/ContentCard';

function WeddingsHome() {
  const weddingTopics = [
    { 
      id: 'venue-overview',
      path: '/weddings/venue-overview', 
      title: 'Venue Overview', 
      description: 'Learn about our unique venue and its facilities.',
      category: 'venue',
      icon: '🏰'
    },
    { 
      id: 'clubhouse',
      path: '/weddings/clubhouse', 
      title: 'The Clubhouse', 
      description: 'Explore our 6,000 sq ft modern event space with panoramic views.',
      category: 'venue',
      icon: '🏢'
    },
    { 
      id: 'farmhouse',
      path: '/weddings/farmhouse', 
      title: 'The Farmhouse', 
      description: 'Discover our charming tasting room for intimate gatherings.',
      category: 'venue',
      icon: '🏠'
    },
    { 
      id: 'event-planning',
      path: '/weddings/event-planning', 
      title: 'Event Planning', 
      description: 'Learn about our event planning services and process.',
      category: 'services',
      icon: '📋'
    },
    { 
      id: 'food-and-wine',
      path: '/weddings/food-and-wine', 
      title: 'Food and Wine', 
      description: 'Explore our culinary offerings and wine selections.',
      category: 'catering',
      icon: '🍷'
    },
    { 
      id: 'drink-packages',
      path: '/weddings/drink-packages', 
      title: 'Drink Packages', 
      description: 'Discover our beverage packages and options.',
      category: 'catering',
      icon: '🍸'
    },
    { 
      id: 'accommodations',
      path: '/weddings/accommodations', 
      title: 'Accommodations', 
      description: 'Learn about lodging options for you and your guests.',
      category: 'services',
      icon: '🛏️'
    },
    { 
      id: 'associated-events',
      path: '/weddings/associated-events', 
      title: 'Associated Events', 
      description: 'Explore options for rehearsal dinners and other wedding events.',
      category: 'events',
      icon: '🎉'
    },
    { 
      id: 'preferred-vendors',
      path: '/weddings/preferred-vendors', 
      title: 'Preferred Vendors', 
      description: 'Get familiar with our network of trusted vendors.',
      category: 'vendors',
      icon: '🤝'
    },
    { 
      id: 'faq',
      path: '/weddings/faq', 
      title: 'FAQ', 
      description: 'Review frequently asked questions about weddings at Milea.',
      category: 'information',
      icon: '❓'
    }
  ];

  return (
    <ContentPage title="About Weddings at Milea">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <p className="mb-4">
          This section covers everything you need to know about weddings at Milea Estate Vineyard. 
          Familiarize yourself with our venues, policies, and offerings to effectively communicate 
          with potential clients and provide exceptional service.
        </p>
        
        <p className="mb-4">
          Each topic includes detailed information and will be followed by a quiz to test your knowledge.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {weddingTopics.map((topic) => (
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

export default WeddingsHome; 