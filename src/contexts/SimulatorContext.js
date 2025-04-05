import React, { createContext, useContext, useState, useEffect } from 'react';

const SimulatorContext = createContext();

export function useSimulator() {
  return useContext(SimulatorContext);
}

export function SimulatorProvider({ children }) {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isSimulationActive, setIsSimulationActive] = useState(false);

  // Debug log whenever currentScenario changes
  useEffect(() => {
    console.log("SimulatorContext: currentScenario updated:", currentScenario);
  }, [currentScenario]);

  const startSimulation = (scenario) => {
    console.log("SimulatorContext: Starting simulation with scenario:", scenario);
    if (!scenario) {
      console.error("SimulatorContext: No scenario data provided to startSimulation");
      return;
    }
    
    // Make a deep copy to ensure we're not dealing with reference issues
    const scenarioCopy = JSON.parse(JSON.stringify(scenario));
    console.log("SimulatorContext: Scenario copy:", scenarioCopy);
    
    setCurrentScenario(scenarioCopy);
    setChatHistory([]);
    setFeedback(null);
    setIsSimulationActive(true);
  };

  const endSimulation = () => {
    console.log("SimulatorContext: Ending simulation");
    setIsSimulationActive(false);
    // Don't clear scenario or chat history yet, as they're needed for feedback
  };

  const resetSimulation = () => {
    console.log("SimulatorContext: Resetting simulation");
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
    resetSimulation,
    addMessage,
    setFeedback
  };

  return (
    <SimulatorContext.Provider value={value}>
      {children}
    </SimulatorContext.Provider>
  );
} 