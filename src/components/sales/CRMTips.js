import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from '../weddings/ContentTemplate';
import Highlights from '../shared/Highlights';

function CRMTips() {
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
          Maximize the capabilities of your Perfect Venue CRM to create a more efficient, data-driven, and personalized sales process that increases conversions while enhancing the client experience from first inquiry through post-wedding relationship.
        </p>
      </div>

      <Highlights title="CRM Best Practices">
        <ul className="list-disc pl-5 space-y-2">
          <li>Use tags to categorize hot leads, tour completed, proposal sent, and booked</li>
          <li>Automate task reminders for follow-ups</li>
          <li>Track response time metrics and tour conversion rate</li>
          <li>Create consistent naming conventions for all leads and events</li>
          <li>Establish required fields to ensure complete data collection</li>
        </ul>
      </Highlights>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Advanced Tagging System</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Tags</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Inquiry Source</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Website_Contact</li>
                    <li>TheKnot</li>
                    <li>WeddingWire</li>
                    <li>Instagram</li>
                    <li>Referral_Vendor</li>
                    <li>Referral_Past_Client</li>
                    <li>Bridal_Show</li>
                    <li>Walk_In</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Lead Stage</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>New_Inquiry</li>
                    <li>Contacted_Awaiting_Response</li>
                    <li>Tour_Scheduled</li>
                    <li>Tour_Completed</li>
                    <li>Proposal_Sent</li>
                    <li>Contract_Sent</li>
                    <li>Deposit_Received</li>
                    <li>Fully_Booked</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Preference</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Guest_Count_Under_75</li>
                    <li>Guest_Count_75_120</li>
                    <li>Guest_Count_120_Plus</li>
                    <li>Peak_Season</li>
                    <li>Off_Season</li>
                    <li>Weekday_Wedding</li>
                    <li>Weekend_Wedding</li>
                    <li>Full_Property_Buyout</li>
                    <li>Budget_Sensitive</li>
                    <li>Luxury_Budget</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Planning Stage</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Initial_Planning</li>
                    <li>Vendor_Selection</li>
                    <li>Menu_Planning</li>
                    <li>Final_Details</li>
                    <li>Month_Of</li>
                    <li>Week_Of</li>
                    <li>Post_Wedding</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Lead Scoring System</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Rating</th>
                <th className="py-3 px-4 text-left">Criteria</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">5 Stars (Hot Lead)</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Responsive communication</li>
                    <li>Ideal date/guest count</li>
                    <li>Budget aligned with offerings</li>
                    <li>Decision-makers engaged</li>
                    <li>Timeline for decision &lt; 2 weeks</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">4 Stars (Warm Lead)</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Good communication</li>
                    <li>Workable date/guest count</li>
                    <li>Budget mostly aligned</li>
                    <li>Some decision-makers engaged</li>
                    <li>Timeline for decision 2-4 weeks</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">3 Stars (Moderate Lead)</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Inconsistent communication</li>
                    <li>Date/guest count requires flexibility</li>
                    <li>Budget slightly below target</li>
                    <li>Missing key decision-makers</li>
                    <li>Timeline for decision 1-2 months</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">2 Stars (Cool Lead)</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Minimal communication</li>
                    <li>Challenging date/guest count</li>
                    <li>Budget misaligned</li>
                    <li>Incomplete decision-maker engagement</li>
                    <li>No clear decision timeline</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">1 Star (Cold Lead)</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Non-responsive</li>
                    <li>Impossible date/guest count</li>
                    <li>Budget significantly misaligned</li>
                    <li>Unable to engage with decision-makers</li>
                    <li>Extended or indefinite timeline</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Automated Workflow Sequences</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Stage</th>
                <th className="py-3 px-4 text-left">Sequence</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Inquiry to Tour</td>
                <td className="py-3 px-4">
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Initial response email/call (Immediate)</li>
                    <li>Follow-up if no response (24 hours)</li>
                    <li>Second follow-up with value add (72 hours)</li>
                    <li>Final check-in (7 days)</li>
                    <li>Dormant sequence activation (14 days)</li>
                  </ol>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Tour to Proposal</td>
                <td className="py-3 px-4">
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Thank you email (Same day)</li>
                    <li>Proposal delivery (Within 24 hours)</li>
                    <li>Proposal follow-up call (4 hours after sending)</li>
                    <li>Value-add follow-up (3 days)</li>
                    <li>Urgency message (5 days)</li>
                    <li>Final opportunity (10 days)</li>
                  </ol>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Contract to Planning</td>
                <td className="py-3 px-4">
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Welcome sequence (Upon booking)</li>
                    <li>Coordinator introduction (Within 24 hours)</li>
                    <li>Planning portal setup (Within 48 hours)</li>
                    <li>First planning meeting scheduling (Within 1 week)</li>
                    <li>Vendor recommendations (Within 2 weeks)</li>
                  </ol>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Data Management Best Practices</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Required Information</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Contact Records</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Complete contact information for both partners</li>
                    <li>Communication preferences (email, call, text)</li>
                    <li>Best times to contact</li>
                    <li>Professional information (useful for building rapport)</li>
                    <li>How they heard about Milea</li>
                    <li>Previous interactions with the venue</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Wedding Details</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Proposed date(s)</li>
                    <li>Guest count range</li>
                    <li>Budget parameters</li>
                    <li>Vision notes</li>
                    <li>Special requirements</li>
                    <li>Key decision influencers</li>
                    <li>Competitive venues being considered</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Timeline Management</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Set up date-based triggers for important milestones</li>
                    <li>Create countdown trackers for key decision deadlines</li>
                    <li>Use calendar integration for all appointments</li>
                    <li>Set automatic reminders for critical follow-ups</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Team Collaboration Features</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Feature</th>
                <th className="py-3 px-4 text-left">Implementation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Activity Logging</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Document all interactions with timestamp and summary</li>
                    <li>Tag team members involved in each interaction</li>
                    <li>Note key takeaways and next steps</li>
                    <li>Link related documents and communications</li>
                    <li>Record personal details for relationship building</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Handoff Protocol</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Create a standardized handoff checklist</li>
                    <li>Ensure complete notes transfer between team members</li>
                    <li>Schedule joint calls for warm introductions</li>
                    <li>Document specific rapport-building information</li>
                    <li>Maintain consistent communication style</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Performance Dashboards</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Response time averages</li>
                    <li>Conversion rates by funnel stage</li>
                    <li>Revenue forecasting based on pipeline</li>
                    <li>Team member performance metrics</li>
                    <li>Source effectiveness comparison</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Perfect Venue-Specific Features</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Feature</th>
                <th className="py-3 px-4 text-left">Configuration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Custom Fields</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Partner 2 Contact Information</li>
                    <li>Parents' Contact Information</li>
                    <li>Wedding Vision Keywords</li>
                    <li>Favorite Milea Wines</li>
                    <li>Budget Range (Dropdown)</li>
                    <li>Preferred Contact Method</li>
                    <li>Planning Personality Type</li>
                    <li>Decision Timeline</li>
                    <li>Special Accommodations Needed</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Document Management</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Create templated folders for each client</li>
                    <li>Store all communications in searchable format</li>
                    <li>Maintain version control for proposals and contracts</li>
                    <li>Organize photos shared by the couple</li>
                    <li>Archive planning documents for future reference</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Integration Capabilities</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Connect Perfect Venue with your email marketing system</li>
                    <li>Integrate with electronic signature platform</li>
                    <li>Link to financial/accounting software</li>
                    <li>Connect with scheduling tools</li>
                    <li>Sync with website inquiry forms</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Data Analysis for Sales Improvement</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Metrics</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Reporting Schedule</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Daily: New lead review and response time check</li>
                    <li>Weekly: Pipeline movement and conversion updates</li>
                    <li>Monthly: Closing rate analysis and trend identification</li>
                    <li>Quarterly: Source effectiveness and ROI calculation</li>
                    <li>Annually: Comprehensive funnel optimization review</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Key Performance Indicators</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Inquiry-to-tour conversion rate (target: 40%+)</li>
                    <li>Tour-to-proposal conversion rate (target: 75%+)</li>
                    <li>Proposal-to-contract conversion rate (target: 30%+)</li>
                    <li>Average response time (target: under 60 minutes)</li>
                    <li>Revenue per booking (track by season/day of week)</li>
                    <li>Upsell attachment rate (target: 60%+)</li>
                    <li>Referral generation rate (target: 25%+)</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Pattern Recognition</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Most effective communication styles</li>
                    <li>Optimal timing for follow-ups</li>
                    <li>Most common objections by lead type</li>
                    <li>High-value lead indicators</li>
                    <li>Seasonal trends affecting closing rates</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Privacy and Security Considerations</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Implementation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Data Protection</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Implement role-based access controls</li>
                    <li>Regularly audit user activities</li>
                    <li>Establish data retention policies</li>
                    <li>Secure sensitive financial information</li>
                    <li>Maintain GDPR/CCPA compliance as applicable</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Client Permission Management</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Document marketing preferences</li>
                    <li>Honor opt-out requests promptly</li>
                    <li>Securely store contract documents</li>
                    <li>Implement secure sharing protocols</li>
                    <li>Obtain explicit permission for testimonial usage</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/sales/crm-tips"
          className="button button-primary"
        >
          Take the CRM Tips Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="CRM Tips" fallbackContent={fallbackContent} contentId="crm-tips" contentType="sales" />;
}

export default CRMTips; 