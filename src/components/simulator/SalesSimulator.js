import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ContentPage from '../layout/ContentPage';
import SimulatorHome from './SimulatorHome';
import SimulationChat from './SimulationChat';
import FeedbackDisplay from './FeedbackDisplay';
import { useSimulator } from '../../contexts/SimulatorContext';

function SalesSimulator() {
  const { isSimulationActive } = useSimulator();

  return (
    <ContentPage title="Sales Simulator">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">
            Practice your sales skills with interactive scenarios. Choose a scenario to begin,
            and you'll be guided through a realistic sales conversation with immediate feedback.
          </p>
        </div>

        <Routes>
          <Route index element={<SimulatorHome />} />
          <Route 
            path="chat" 
            element={
              isSimulationActive ? (
                <SimulationChat />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">Please select a scenario to begin.</p>
                </div>
              )
            } 
          />
          <Route path="feedback" element={<FeedbackDisplay />} />
        </Routes>
      </div>
    </ContentPage>
  );
}

export default SalesSimulator; 