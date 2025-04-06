import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { QuizProvider } from './contexts/QuizContext';
import { SimulatorProvider } from './contexts/SimulatorContext';
import { EmotionProvider } from './contexts/EmotionContext';
import { InteractionTrackerProvider } from './contexts/InteractionTracker';
import { GoldStandardProvider } from './contexts/GoldStandardContext';

// Auth Components
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Welcome from './pages/Welcome';
import WeddingsHome from './pages/WeddingsHome';
import SalesHome from './pages/SalesHome';
import QuizzesHome from './pages/QuizzesHome';

// Quiz Components
import QuizEmbed from './components/quizzes/QuizEmbed';
import QuizResults from './components/quizzes/QuizResults';

// Wedding Content Pages
import VenueOverview from './components/weddings/VenueOverview';
import Clubhouse from './components/weddings/Clubhouse';
import Farmhouse from './components/weddings/Farmhouse';
import EventPlanning from './components/weddings/EventPlanning';
import FoodAndWine from './components/weddings/FoodAndWine';
import DrinkPackages from './components/weddings/DrinkPackages';
import Accommodations from './components/weddings/Accommodations';
import AssociatedEvents from './components/weddings/AssociatedEvents';
import PreferredVendors from './components/weddings/PreferredVendors';
import FAQ from './components/weddings/FAQ';

// Sales Content Pages
import Overview from './components/sales/Overview';
import InquiryResponse from './components/sales/InquiryResponse';
import Qualification from './components/sales/Qualification';
import VenueTour from './components/sales/VenueTour';
import Proposal from './components/sales/Proposal';
import FollowUp from './components/sales/FollowUp';
import Closing from './components/sales/Closing';
import PostBooking from './components/sales/PostBooking';
import CRMTips from './components/sales/CRMTips';

// Simulator Components
import SalesSimulator from './components/simulator/SalesSimulator';
import ApiDebugPanel from './components/simulator/ApiDebugPanel';

// Rubric Components
import RubricEvaluation from './components/rubrics/RubricEvaluation';

import './App.css';
import './styles/simulator.css';

function App() {
  return (
    <div className="App">
      <EmotionProvider>
        <InteractionTrackerProvider>
          <GoldStandardProvider>
            <SimulatorProvider>
              <Router>
                <AuthProvider>
                  <QuizProvider>
                    <Routes>
                      {/* Redirect root to login page */}
                      <Route path="/" element={<Navigate to="/login" replace />} />
                      
                      {/* Public routes */}
                      <Route path="/login" element={<Login />} />
                      
                      {/* Protected routes */}
                      <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
                        <Route path="/welcome" element={<Welcome />} />
                        
                        {/* Wedding routes */}
                        <Route path="/weddings">
                          <Route index element={<WeddingsHome />} />
                          <Route path="venue-overview" element={<VenueOverview />} />
                          <Route path="clubhouse" element={<Clubhouse />} />
                          <Route path="farmhouse" element={<Farmhouse />} />
                          <Route path="event-planning" element={<EventPlanning />} />
                          <Route path="food-and-wine" element={<FoodAndWine />} />
                          <Route path="drink-packages" element={<DrinkPackages />} />
                          <Route path="accommodations" element={<Accommodations />} />
                          <Route path="associated-events" element={<AssociatedEvents />} />
                          <Route path="preferred-vendors" element={<PreferredVendors />} />
                          <Route path="faq" element={<FAQ />} />
                        </Route>
                        
                        {/* Sales routes */}
                        <Route path="/sales">
                          <Route index element={<SalesHome />} />
                          <Route path="overview" element={<Overview />} />
                          <Route path="inquiry-response" element={<InquiryResponse />} />
                          <Route path="qualification" element={<Qualification />} />
                          <Route path="venue-tour" element={<VenueTour />} />
                          <Route path="proposal" element={<Proposal />} />
                          <Route path="followup" element={<FollowUp />} />
                          <Route path="closing" element={<Closing />} />
                          <Route path="post-booking" element={<PostBooking />} />
                          <Route path="crm-tips" element={<CRMTips />} />
                        </Route>
                        
                        {/* Quiz routes */}
                        <Route path="/quizzes">
                          <Route index element={<QuizzesHome />} />
                          <Route path=":category/:quizId" element={<QuizEmbed />} />
                          <Route path="results" element={<QuizResults />} />
                        </Route>

                        {/* Simulator routes */}
                        <Route path="/simulator/*" element={<SalesSimulator />} />
                        
                        {/* Rubric Evaluation routes */}
                        <Route path="/rubrics/:scenarioId" element={<RubricEvaluation />} />
                        
                        {/* Admin routes */}
                        <Route path="/admin">
                          <Route path="api-debug" element={<ApiDebugPanel />} />
                        </Route>
                      </Route>
                    </Routes>
                  </QuizProvider>
                </AuthProvider>
              </Router>
            </SimulatorProvider>
          </GoldStandardProvider>
        </InteractionTrackerProvider>
      </EmotionProvider>
    </div>
  );
}

export default App;
