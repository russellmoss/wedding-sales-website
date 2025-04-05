import React, { createContext, useContext, useState } from 'react';

const SimulatorContext = createContext();

export function useSimulator() {
  return useContext(SimulatorContext);
}

export function SimulatorProvider({ children }) {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isSimulationActive, setIsSimulationActive] = useState(false);

  const startSimulation = (scenario) => {
    setCurrentScenario(scenario);
    setChatHistory([]);
    setFeedback(null);
    setIsSimulationActive(true);
  };

  const endSimulation = () => {
    setCurrentScenario(null);
    setChatHistory([]);
    setFeedback(null);
    setIsSimulationActive(false);
  };

  const addMessage = (message) => {
    setChatHistory(prev => [...prev, message]);
  };

  const value = {
    currentScenario,
    chatHistory,
    feedback,
    isSimulationActive,
    startSimulation,
    endSimulation,
    addMessage,
    setFeedback
  };

  return (
    <SimulatorContext.Provider value={value}>
      {children}
    </SimulatorContext.Provider>
  );
} 