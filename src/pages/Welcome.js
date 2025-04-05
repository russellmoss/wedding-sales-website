import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Welcome() {
  const { currentUser } = useAuth();
  const firstName = currentUser?.email.split('@')[0] || 'Team Member';

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-gilda mb-6 text-darkBrown">
        Welcome to the Milea Estate Vineyard Events Onboarding Site
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <p className="mb-4">
          Hello {firstName}, and welcome to our comprehensive guide to all things events at Milea Estate.
        </p>
        
        <p className="mb-4">
          This site is designed to help you understand everything about our venue, our wedding offerings, and our sales processes. 
          Please go through this site at your own pace and ensure that you understand everything. 
        </p>
        
        <p className="mb-4">
          If you have any questions, please do not hesitate to ask anyone. At Milea Estate, we are a small but fierce team 
          and we are here to assist you with anything you need.
        </p>
        
        <p className="mb-4 font-medium">
          This guide will act as an ongoing resource for you, rather than just a day one training tool. 
          So please bookmark this page in your phone and on your computer so that you can keep accessing it for future reference.
        </p>
      </div>
      
      <h2 className="text-2xl font-gilda mb-4 text-darkBrown">Getting Started</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-gilda mb-3 text-darkBrown">About Weddings</h3>
          <p className="mb-4">Learn about our wedding venues, packages, and policies.</p>
          <Link to="/weddings" className="button button-primary block text-center">
            Explore Weddings
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-gilda mb-3 text-darkBrown">Sales Process</h3>
          <p className="mb-4">Master our proven sales funnel and conversion strategies.</p>
          <Link to="/sales" className="button button-primary block text-center">
            Explore Sales
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-gilda mb-3 text-darkBrown">Knowledge Quizzes</h3>
          <p className="mb-4">Test your understanding with interactive quizzes.</p>
          <Link to="/quizzes" className="button button-primary block text-center">
            Take Quizzes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome; 