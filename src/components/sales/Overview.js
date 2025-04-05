import React from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from '../weddings/ContentTemplate';
import Highlights from '../shared/Highlights';

function Overview() {
  const fallbackContent = (
    <div className="space-y-8">
      <div className="text-gray-700">
        <p className="mb-4">
          Welcome to your role as an Event Sales Associate at Milea Estate Vineyard! This overview will introduce you to your responsibilities and our expectations. Your primary mission is to guide prospective couples through their wedding journey at our beautiful venue, from initial inquiry to post-wedding celebration.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Your Role at a Glance</h3>
        <p className="mb-4">As an Event Sales Associate, you are the face of Milea Estate Vineyard to potential clients. You will:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Respond promptly to all wedding inquiries across multiple platforms</li>
          <li>Qualify leads to ensure mutual fit between couples and our venue</li>
          <li>Conduct personalized venue tours that showcase our property's unique features</li>
          <li>Create customized proposals that address each couple's specific vision</li>
          <li>Follow up strategically to guide couples toward booking decisions</li>
          <li>Close sales by securing contracts and deposits</li>
          <li>Facilitate a smooth transition to the planning phase after booking</li>
          <li>Maintain detailed records in our CRM system</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">The Wedding Sales Funnel</h3>
        <p className="mb-4">Your work follows a strategic sales funnel designed to convert inquiries into bookings:</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-amber-100">
                <th className="py-2 px-4 border-b text-left">Stage</th>
                <th className="py-2 px-4 border-b text-left">Key Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Initial Inquiry Response</td>
                <td className="py-2 px-4 border-b">
                  <ul className="list-disc pl-5">
                    <li>Respond within 1 hour during business hours</li>
                    <li>Personalize all communications</li>
                    <li>Implement multi-channel follow-up</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Qualification</td>
                <td className="py-2 px-4 border-b">
                  <ul className="list-disc pl-5">
                    <li>Determine fit through targeted questions</li>
                    <li>Build rapport while gathering information</li>
                    <li>Document all details in the CRM</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Venue Tour</td>
                <td className="py-2 px-4 border-b">
                  <ul className="list-disc pl-5">
                    <li>Prepare personalized tour experiences</li>
                    <li>Help couples visualize their wedding</li>
                    <li>Create emotional connections to the space</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Proposal</td>
                <td className="py-2 px-4 border-b">
                  <ul className="list-disc pl-5">
                    <li>Deliver customized proposals within 24 hours</li>
                    <li>Offer tiered package options</li>
                    <li>Include personalized elements</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Follow-Up</td>
                <td className="py-2 px-4 border-b">
                  <ul className="list-disc pl-5">
                    <li>Implement strategic touchpoints</li>
                    <li>Address objections proactively</li>
                    <li>Create urgency when appropriate</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Closing</td>
                <td className="py-2 px-4 border-b">
                  <ul className="list-disc pl-5">
                    <li>Guide through contract process</li>
                    <li>Secure signed agreements and deposits</li>
                    <li>Create a celebratory booking experience</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Post-Booking</td>
                <td className="py-2 px-4 border-b">
                  <ul className="list-disc pl-5">
                    <li>Transition smoothly to planning team</li>
                    <li>Identify upsell opportunities</li>
                    <li>Build long-term relationships</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Highlights title="Key Performance Metrics">
        <ul className="list-disc pl-5 space-y-2">
          <li>Response time to inquiries (target: under 1 hour during business hours)</li>
          <li>Inquiry-to-tour conversion rate (target: 40%+)</li>
          <li>Tour-to-proposal conversion rate (target: 75%+)</li>
          <li>Proposal-to-contract conversion rate (target: 30%+)</li>
          <li>Total bookings secured per quarter</li>
          <li>Revenue per booking</li>
          <li>Upsell attachment rate (target: 60%+)</li>
          <li>Client satisfaction ratings</li>
          <li>Referral generation rate (target: 25%+)</li>
        </ul>
      </Highlights>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Essential Skills & Approaches</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Communicate Effectively:</strong> Craft clear, warm, and professional communications across all channels</li>
          <li><strong>Listen Actively:</strong> Understand each couple's unique vision and concerns</li>
          <li><strong>Build Relationships:</strong> Create genuine connections that extend beyond the transaction</li>
          <li><strong>Problem Solve:</strong> Find creative solutions to budget constraints and logistical challenges</li>
          <li><strong>Manage Time:</strong> Juggle multiple leads at different funnel stages simultaneously</li>
          <li><strong>Organize Details:</strong> Maintain meticulous records in our CRM system</li>
          <li><strong>Tell Stories:</strong> Share the Milea experience in compelling and personalized ways</li>
          <li><strong>Close Sales:</strong> Guide couples confidently toward booking decisions</li>
          <li><strong>Analyze Data:</strong> Use sales metrics to continuously improve your approach</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">The Milea Difference</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Panoramic Hudson Valley views and vineyard setting</li>
          <li>Award-winning wines, including exclusive selections</li>
          <li>Versatile spaces for ceremonies, cocktail hours, and receptions</li>
          <li>Modern facilities with historic charm</li>
          <li>Farm-to-table dining experiences</li>
          <li>Comprehensive wedding expertise</li>
          <li>Personalized planning support</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Your First Steps</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Familiarize yourself with our venue spaces, capacities, and features</li>
          <li>Learn our pricing structure and package options</li>
          <li>Master our CRM system and communication templates</li>
          <li>Shadow experienced team members on tours and calls</li>
          <li>Practice your personalized response techniques</li>
          <li>Develop your unique storytelling approach for Milea</li>
          <li>Set your personal sales goals aligned with our venue targets</li>
        </ol>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/sales/overview"
          className="button button-primary"
        >
          Take the Sales Overview Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="Sales Overview" fallbackContent={fallbackContent} contentId="sales-overview" contentType="sales" />;
}

export default Overview; 