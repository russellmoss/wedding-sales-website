import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSimulator } from '../../contexts/SimulatorContext';
import { salesSimulatorScenarios } from '../../data/salesSimulatorData';
import RubricButton from '../rubrics/RubricButton';

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

  const renderScenarioInstructions = () => {
    if (!scenario) return null;

    switch (scenario.id) {
      case 'qualification-call':
        return (
          <div className="scenario-instructions">
            <h3>Call Simulation Instructions</h3>
            <p>This is a phone call simulation. To begin the call:</p>
            <ol>
              <li>Click the "Start Simulation" button below</li>
              <li>Once the chat opens, type <strong>CALL</strong> and press Enter to initiate the phone call</li>
              <li>Sarah will answer the phone, and you can begin the qualification call</li>
              <li>Remember to review the inquiry details above before starting</li>
            </ol>
            <p>This simulation will help you practice qualification call skills, building rapport, and gathering key information.</p>
          </div>
        );
      case 'venue-tour':
        return (
          <div className="scenario-instructions">
            <h3>Venue Tour Instructions</h3>
            <p>This is a venue tour simulation. To begin the tour:</p>
            <ol>
              <li>Click the "Start Simulation" button below</li>
              <li>Once the chat opens, type <strong>GREET</strong> and press Enter to initiate the tour with a greeting</li>
              <li>Morgan and Casey will greet you in the parking lot</li>
              <li>Remember to review the details from your Perfect Venue CRM before starting</li>
              <li>Review the Wedding Tour document to prepare for the tour</li>
            </ol>
            <div className="crm-details">
              <h4>CRM Details</h4>
              <div className="crm-box">
                <p>Review the CRM details to prepare for the tour</p>
                <button 
                  className="download-button"
                  onClick={() => window.open('/docs/downloads/morgan_case_lead.pdf', '_blank')}
                >
                  Download the lead sheet
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
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

          {scenario.id === 'qualification-call' && (
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Call Simulation Instructions</h3>
              <p className="text-blue-700 mb-2">
                This is a phone call simulation. To begin the call:
              </p>
              <ol className="list-decimal pl-5 text-blue-700 mb-3">
                <li>Click the "Start Simulation" button below</li>
                <li>Once the chat opens, type <strong>CALL</strong> and press Enter to initiate the phone call</li>
                <li>Sarah will answer the phone, and you can begin the qualification call</li>
                <li>Remember to review the inquiry details above before starting</li>
              </ol>
              <p className="text-blue-700 font-medium">
                This simulation will help you practice qualification call skills, building rapport, and gathering key information.
              </p>
            </div>
          )}

          {scenario.id === 'venue-tour' && (
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Venue Tour Instructions</h3>
              <p className="text-blue-700 mb-2">
                This is a venue tour simulation. To begin the tour:
              </p>
              <ol className="list-decimal pl-5 text-blue-700 mb-3">
                <li>Click the "Start Simulation" button below</li>
                <li>Once the chat opens, type <strong>GREET</strong> and press Enter to initiate the tour with a greeting</li>
                <li>Morgan and Casey will greet you in the parking lot</li>
                <li>Remember to review the details from your Perfect Venue CRM before starting</li>
                <li>Review the Wedding Tour document to prepare for the tour</li>
              </ol>
              <p className="text-blue-700 font-medium">
                This simulation will help you practice venue tour skills, building rapport, and showcasing the venue.
              </p>
            </div>
          )}

          {scenario.id === 'venue-tour' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">CRM Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-4">Review the CRM details to prepare for the tour.</p>
                <a 
                  href={process.env.PUBLIC_URL + "/docs/downloads/morgan_casey_lead.pdf"} 
                  download="morgan_casey_lead.pdf"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download the lead sheet
                </a>
              </div>
            </div>
          )}

          {scenario.id === 'qualification-call' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Initial inquiry details</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-4">Review the initial inquiry details to prepare for the qualification call.</p>
                <a 
                  href={process.env.PUBLIC_URL + "/docs/downloads/Inquiry-details.pdf"} 
                  download="Inquiry-details.pdf"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download the initial inquiry notes
                </a>
              </div>
            </div>
          )}

          {scenario.id === 'initial-inquiry' && (
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Initial Inquiry Simulation Instructions</h3>
              <p className="text-blue-700 mb-2">
                This is a simulation that will move from email to phone call:
              </p>
              <ol className="list-decimal pl-5 text-blue-700 mb-3">
                <li>Read the initial inquiry that is in the downloadable PDF below</li>
                <li>Respond to their inquiry by email first and ask if you may set up a phone call with them</li>
                <li>After the email, you may choose to send a text message to them to let them know you sent them the email and that this is your line should they want to call, text or email</li>
                <li>Your main goal at this stage in the funnel is to convert them from a lead to a tour</li>
              </ol>
              <p className="text-blue-700 font-medium">
                This simulation will help you practice responding to initial inquiries, building rapport, and moving leads toward a venue tour.
              </p>
            </div>
          )}

          {scenario.id === 'initial-inquiry' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Initial inquiry details</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-4">Review the initial inquiry details to prepare for the qualification call.</p>
                <a 
                  href={process.env.PUBLIC_URL + "/docs/downloads/Wedding_Inquiry_Smith.pdf"} 
                  download="Wedding_Inquiry_Smith.pdf"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download the initial inquiry notes
                </a>
              </div>
            </div>
          )}

          {scenario.id === 'venue-tour' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Wedding Tour</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-4">Review the details of the tour</p>
                <a 
                  href={process.env.PUBLIC_URL + "/docs/downloads/Milea_Estate_Wedding_Tour.pdf"} 
                  download="Milea_Estate_Wedding_Tour.pdf"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Vineyard Tour script
                </a>
              </div>
            </div>
          )}

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

        <div className="mt-8 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={handleStartSimulation}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Simulation
          </button>
          
          <RubricButton 
            scenarioId={scenario.id}
            tooltip="Evaluate this scenario using a standardized rubric"
          />
        </div>
      </div>
    </div>
  );
};

export default SimulatorBrief; 