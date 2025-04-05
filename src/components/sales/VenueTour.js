import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from '../weddings/ContentTemplate';
import Highlights from '../shared/Highlights';

function VenueTour() {
  const [copiedMessage, setCopiedMessage] = useState(null);

  const copyToClipboard = (text, messageId) => {
    navigator.clipboard.writeText(text);
    setCopiedMessage(messageId);
    setTimeout(() => setCopiedMessage(null), 2000);
  };

  const MessageCard = ({ title, message, id }) => (
    <div className="bg-amber-100 p-4 rounded-lg border border-amber-300 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
      <button 
        onClick={() => copyToClipboard(message, id)}
        className="absolute top-2 right-2 bg-darkBrown text-white p-1 rounded-md hover:bg-brown transition-colors"
        aria-label="Copy message"
      >
        {copiedMessage === id ? (
          <span className="text-xs">Copied!</span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        )}
      </button>
      <h4 className="font-medium text-darkBrown mb-2">{title}</h4>
      <p className="italic text-gray-800">
        {message}
      </p>
    </div>
  );

  const fallbackContent = (
    <div className="space-y-8">
      <div className="text-gray-700">
        <p className="mb-4">
          The venue tour is a crucial opportunity to help couples experience Milea Estate Vineyard and envision their special day. This guide will help you create memorable and effective tours that showcase our property's unique features and align with each couple's vision.
        </p>
      </div>

      <Highlights title="Tour Best Practices">
        <ul className="list-disc pl-5 space-y-2">
          <li>Offer both in-person and virtual tour options</li>
          <li>Send a confirmation email with address, directions, and contact info</li>
          <li>Prepare by reviewing their inquiry and preferences beforehand</li>
          <li>Schedule tours during optimal lighting hours whenever possible</li>
          <li>Allow at least 60-90 minutes for a comprehensive tour experience</li>
        </ul>
      </Highlights>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Pre-Tour Preparation</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Review all previous communications and notes from qualification calls</li>
          <li>Prepare a customized tour route based on the couple's priorities and vision</li>
          <li>Set up the venue to showcase its potential (e.g., sample table settings, lighting)</li>
          <li>Have printed materials ready (floor plans, FAQ sheets, preferred vendor lists)</li>
          <li>Prepare seasonal wine samples or non-alcoholic beverages for welcome</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Onsite Tour Tips</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Greet them by name with a glass of wine</li>
          <li>Focus on personalization: "Imagine this as your ceremony backdrop..."</li>
          <li>Share past wedding stories/testimonials</li>
          <li>Introduce value-added services (e.g., wine pairings, dinners, rehearsal dinner options)</li>
          <li>Allow moments of silence for the couple to take in the views and spaces</li>
          <li>End in a comfortable seating area for questions and next steps discussion</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Tour Enhancement Strategies</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">Pre-Tour Excitement Building</h4>
            <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-md">
              <div className="border-b border-gray-300 pb-2 mb-3">
                <div className="flex items-center mb-1">
                  <span className="font-medium text-gray-700 mr-2">From:</span>
                  <span className="text-darkBrown">[Your Name] &lt;events@mileaestatevineyard.com&gt;</span>
                </div>
                <div className="flex items-center mb-1">
                  <span className="font-medium text-gray-700 mr-2">To:</span>
                  <span className="text-darkBrown">[First Names]</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Subject:</span>
                  <span className="text-darkBrown">Your Milea Estate Vineyard Tour: What to Expect</span>
                </div>
              </div>
              <MessageCard 
                title="Email Body"
                message={`Hi [First Names],

We're looking forward to welcoming you to Milea Estate Vineyard on [date/time]!

To help you make the most of your visit, I wanted to share:

Our vineyard is currently showcasing [seasonal highlight - e.g., "harvest activities" or "spring blossoms"]
I've arranged for you to sample our award-winning [wine variety] during your visit
We'll explore both The Clubhouse and The Farmhouse spaces, plus our ceremony locations
Please allow approximately 90 minutes for your tour
Feel free to bring your planner, parents, or other key decision-makers. And don't forget comfortable shoes – we'll be walking the property!

Can't wait to meet you and show you around our beautiful estate.

Warmly,
[Your Name]`}
                id="tour-preview-body"
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Visualization Tools</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Before/After Photos:</strong> "This is the space set for a ceremony, and here's how it transformed for [Couple's Name]'s wedding last June."</li>
              <li><strong>Augmented Reality (if available):</strong> Use an iPad to show different table layouts and decor options in each space.</li>
              <li><strong>Visual Markers:</strong> "Your guests would enter here, cocktail hour would flow to this area, and then dinner would be served in this space."</li>
              <li><strong>Time-of-Day Context:</strong> "At sunset, this western-facing window creates a golden glow across the entire room, perfect for your first dance."</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Sensory Experience Enhancement</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Taste:</strong> Offer a mini wine tasting experience with food pairing suggestions</li>
              <li><strong>Sound:</strong> Play soft background music in each space that matches wedding atmosphere</li>
              <li><strong>Smell:</strong> Light subtle seasonal candles or showcase fresh flowers</li>
              <li><strong>Touch:</strong> Provide fabric swatches of linens and sample place settings</li>
              <li><strong>Sight:</strong> Demonstrate lighting options if possible</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Digital Takeaway Package</h4>
            <p className="mb-2">At the conclusion of the tour, send an immediate follow-up email with:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Thank you note</li>
              <li>3-5 professional photos of the spaces they seemed most excited about</li>
              <li>Short video tour highlights or drone footage of the property</li>
              <li>Link to a private Pinterest board with real weddings at Milea</li>
              <li>Floor plans and measurements for key spaces</li>
              <li>FAQ document addressing common questions</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Virtual Tour Strategy</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use high-quality video conferencing with excellent mobile reception</li>
          <li>Have a second team member to manage the technology while you lead the tour</li>
          <li>Follow a predetermined route with stops for questions</li>
          <li>Use previously recorded footage for areas with poor connectivity</li>
          <li>Mail a "Virtual Tour Kit" beforehand containing wine samples, property map, and materials</li>
          <li>Conclude with a scheduled follow-up call to answer questions</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Tour-to-Proposal Transition</h3>
        <p className="mb-4">End every tour with these critical steps:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Feedback gathering:</strong> "What spaces could you envision for your ceremony, cocktail hour, and reception?"</li>
          <li><strong>Preference confirmation:</strong> "Is there anything specific you'd like me to include in the proposal I'll be preparing for you?"</li>
          <li><strong>Timeline setting:</strong> "I'll have a custom proposal to you by [specific day/time]. When would be a good time to review it together?"</li>
          <li><strong>Next steps clarity:</strong> "After you receive the proposal, I'll follow up with a call to answer any questions and discuss available dates."</li>
          <li><strong>Date discussion:</strong> "While I'm preparing your proposal, would you like me to temporarily hold any specific dates for you? We're currently booking [timeframe] weddings."</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Post-Tour Analysis</h3>
        <p className="mb-4">After each tour, document in your CRM:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Spaces that received the most positive reactions</li>
          <li>Specific questions or concerns raised</li>
          <li>Key decision-makers' comments and priorities</li>
          <li>Probability rating for booking (hot/warm/cool)</li>
          <li>Any specific proposal customizations requested</li>
          <li>Follow-up deadlines and responsibilities</li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/sales/venue-tour"
          className="button button-primary"
        >
          Take the Venue Tour Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="Venue Tour" fallbackContent={fallbackContent} contentId="venue-tour" contentType="sales" />;
}

export default VenueTour; 