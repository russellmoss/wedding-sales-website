import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentCard from '../shared/ContentCard';
import { useSimulator } from '../../contexts/SimulatorContext';

function SimulatorHome() {
  const navigate = useNavigate();
  const { startSimulation } = useSimulator();

  const scenarios = [
    {
      id: 'initial-inquiry',
      title: 'Initial Inquiry Response',
      description: 'Practice responding to a new wedding inquiry with professionalism and warmth.',
      category: 'inquiry',
      icon: '✉️'
    },
    {
      id: 'venue-tour',
      title: 'Venue Tour Guide',
      description: 'Lead a virtual tour of our facilities while addressing common client concerns.',
      category: 'tour',
      icon: '🏰'
    },
    {
      id: 'budget-discussion',
      title: 'Budget Discussion',
      description: 'Navigate budget conversations while highlighting our value proposition.',
      category: 'sales',
      icon: '💰'
    },
    {
      id: 'objection-handling',
      title: 'Objection Handling',
      description: 'Address common objections and concerns with confidence and solutions.',
      category: 'sales',
      icon: '🛡️'
    }
  ];

  const handleScenarioSelect = (scenario) => {
    startSimulation(scenario);
    navigate('/simulator/chat');
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {scenarios.map((scenario) => (
        <div
          key={scenario.id}
          onClick={() => handleScenarioSelect(scenario)}
          className="cursor-pointer"
        >
          <ContentCard
            title={scenario.title}
            description={scenario.description}
            category={scenario.category}
            icon={scenario.icon}
          />
        </div>
      ))}
    </div>
  );
}

export default SimulatorHome; 