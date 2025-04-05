import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ContentPage from '../layout/ContentPage';
import SimulatorHome from './SimulatorHome';
import SimulatorBrief from './SimulatorBrief';
import SimulatorChat from './SimulatorChat';
import FeedbackDisplay from './FeedbackDisplay';
import { useSimulator } from '../../contexts/SimulatorContext';

function SalesSimulator() {
  const { isSimulationActive } = useSimulator();
  const location = useLocation();
  
  console.log("SalesSimulator: Current location:", location.pathname);
  console.log("SalesSimulator: isSimulationActive:", isSimulationActive);

  return (
    <ContentPage title="Sales Simulator">
      <Routes>
        <Route index element={<SimulatorHome />} />
        <Route path="brief" element={<SimulatorBrief />} />
        <Route 
          path="chat" 
          element={
            isSimulationActive ? (
              <SimulatorChat />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">Please select a scenario to begin.</p>
                <button 
                  onClick={() => window.location.href = '/simulator'}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Return to Scenarios
                </button>
              </div>
            )
          } 
        />
        <Route path="feedback" element={<FeedbackDisplay />} />
      </Routes>
    </ContentPage>
  );
}

export default SalesSimulator; 