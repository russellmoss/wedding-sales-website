import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSimulator } from '../../contexts/SimulatorContext';
import { salesSimulatorScenarios } from '../../data/salesSimulatorData';

const SimulatorBrief = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startSimulation } = useSimulator();
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the scenario ID from the URL query parameter
    const queryParams = new URLSearchParams(location.search);
    const scenarioId = queryParams.get('scenario');
    
    if (scenarioId) {
      // Find the scenario in our data
      const foundScenario = salesSimulatorScenarios.find(s => s.id === scenarioId);
      if (foundScenario) {
        setScenario(foundScenario);
      } else {
        // If scenario not found, redirect to home
        navigate('/simulator');
      }
    } else {
      // If no scenario ID provided, redirect to home
      navigate('/simulator');
    }
    
    setLoading(false);
  }, [location, navigate]);

  const handleStartSimulation = () => {
    console.log("Starting simulation with scenario:", scenario);
    if (!scenario) {
      console.error("No scenario data available to start simulation");
      return;
    }
    
    // Pass the scenario ID instead of the entire object
    startSimulation(scenario.id);
    navigate('/simulator/chat');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!scenario) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Scenario Brief</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            scenario.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
            scenario.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
            scenario.difficulty === 'Advanced' ? 'bg-purple-100 text-purple-800' :
            'bg-red-100 text-red-800'
          }`}>
            {scenario.difficulty}
          </span>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Scenario Overview</h2>
            <p className="text-gray-600">{scenario.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Context</h2>
            <p className="text-gray-600">{scenario.context}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Client Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700 font-medium">Name:</p>
                  <p className="text-gray-600">{scenario.clientPersonality.name}</p>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Traits:</p>
                  <div className="flex flex-wrap gap-2">
                    {scenario.clientPersonality.traits.map((trait, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-700 font-medium">Concerns:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {scenario.clientPersonality.concerns.map((concern, index) => (
                      <li key={index}>{concern}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Objectives</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {scenario.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Evaluation Criteria</h2>
            <div className="space-y-3">
              {Object.entries(scenario.evaluationCriteria).map(([key, criteria]) => (
                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="text-gray-700 font-medium">{criteria.description}</p>
                    <span className="text-sm text-gray-500">{criteria.weight} points</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleStartSimulation}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Simulation
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimulatorBrief; 