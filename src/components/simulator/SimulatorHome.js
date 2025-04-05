import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { salesSimulatorScenarios } from '../../data/salesSimulatorData';

const SimulatorHome = () => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedFunnel, setSelectedFunnel] = useState('all');

  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const funnelStages = ['all', 'top-funnel', 'middle-funnel', 'bottom-funnel'];

  const filteredScenarios = salesSimulatorScenarios.filter(scenario => {
    const matchesDifficulty = selectedDifficulty === 'all' || scenario.difficulty === selectedDifficulty;
    const matchesFunnel = selectedFunnel === 'all' || scenario.stageFunnel === selectedFunnel;
    return matchesDifficulty && matchesFunnel;
  });

  const handleScenarioSelect = (scenarioId) => {
    navigate(`/simulator/brief?scenario=${scenarioId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      case 'Expert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFunnelLabel = (funnel) => {
    switch (funnel) {
      case 'top-funnel':
        return 'Top Funnel';
      case 'middle-funnel':
        return 'Middle Funnel';
      case 'bottom-funnel':
        return 'Bottom Funnel';
      default:
        return funnel;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sales Simulator</h1>
          <p className="text-gray-600 mb-6">
            Practice your sales skills with interactive scenarios. Choose a scenario to begin,
            and you'll be guided through a realistic sales conversation with immediate feedback.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                id="difficulty"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Difficulties' : difficulty}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="funnel" className="block text-sm font-medium text-gray-700 mb-1">
                Sales Funnel Stage
              </label>
              <select
                id="funnel"
                value={selectedFunnel}
                onChange={(e) => setSelectedFunnel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {funnelStages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage === 'all' ? 'All Stages' : getFunnelLabel(stage)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredScenarios.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No scenarios match your selected filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredScenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleScenarioSelect(scenario.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-xl font-semibold text-gray-900">{scenario.title}</h2>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(scenario.difficulty)}`}>
                          {scenario.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{scenario.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-medium">Funnel Stage:</span>
                        <span>{getFunnelLabel(scenario.stageFunnel)}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Start Scenario
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Select a Scenario</h3>
                <p className="text-gray-600">Choose from various sales scenarios based on difficulty and funnel stage.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Review the Brief</h3>
                <p className="text-gray-600">Read the client information and scenario details to prepare your approach.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Complete the Simulation</h3>
                <p className="text-gray-600">Interact with the scenario by responding to prompts and making decisions.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Receive Feedback</h3>
                <p className="text-gray-600">Get detailed feedback on your performance with specific strengths and areas for improvement.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorHome; 