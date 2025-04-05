import React, { createContext, useContext, useState } from 'react';

const InteractionTrackerContext = createContext();

export function useInteractionTracker() {
  return useContext(InteractionTrackerContext);
}

export function InteractionTrackerProvider({ children }) {
  const [interactions, setInteractions] = useState({
    negativeInteractions: [],
    missedOpportunities: [],
    rapportBuilding: [],
    closingAttempts: []
  });

  // Track a negative interaction
  const trackNegativeInteraction = (interaction) => {
    setInteractions(prev => ({
      ...prev,
      negativeInteractions: [...prev.negativeInteractions, {
        ...interaction,
        timestamp: new Date().toISOString(),
        id: `neg-${Date.now()}`
      }]
    }));
  };

  // Track a missed opportunity
  const trackMissedOpportunity = (opportunity) => {
    setInteractions(prev => ({
      ...prev,
      missedOpportunities: [...prev.missedOpportunities, {
        ...opportunity,
        timestamp: new Date().toISOString(),
        id: `miss-${Date.now()}`
      }]
    }));
  };

  // Track rapport building moments
  const trackRapportBuilding = (moment) => {
    setInteractions(prev => ({
      ...prev,
      rapportBuilding: [...prev.rapportBuilding, {
        ...moment,
        timestamp: new Date().toISOString(),
        id: `rapp-${Date.now()}`
      }]
    }));
  };

  // Track closing attempts
  const trackClosingAttempt = (attempt) => {
    setInteractions(prev => ({
      ...prev,
      closingAttempts: [...prev.closingAttempts, {
        ...attempt,
        timestamp: new Date().toISOString(),
        id: `close-${Date.now()}`
      }]
    }));
  };

  // Get all tracked interactions
  const getAllInteractions = () => {
    return interactions;
  };

  // Reset all tracked interactions
  const resetInteractions = () => {
    setInteractions({
      negativeInteractions: [],
      missedOpportunities: [],
      rapportBuilding: [],
      closingAttempts: []
    });
  };

  const value = {
    interactions,
    trackNegativeInteraction,
    trackMissedOpportunity,
    trackRapportBuilding,
    trackClosingAttempt,
    getAllInteractions,
    resetInteractions
  };

  return (
    <InteractionTrackerContext.Provider value={value}>
      {children}
    </InteractionTrackerContext.Provider>
  );
} 