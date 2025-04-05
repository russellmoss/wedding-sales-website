import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from '../weddings/ContentTemplate';
import Highlights from '../shared/Highlights';

function PostBooking() {
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
          The post-booking stage is your opportunity to turn a booked couple into an enthusiastic ambassador while maximizing revenue opportunities through thoughtful upsells and additional services. This guide will help you implement effective post-booking strategies that build lasting relationships and increase revenue.
        </p>
      </div>

      <Highlights title="Post-Booking Best Practices">
        <ul className="list-disc pl-5 space-y-2">
          <li>Introduce the couple to their dedicated planner within 24 hours of booking</li>
          <li>Send a comprehensive welcome kit (digital and physical)</li>
          <li>Schedule a kickoff planning meeting within 2 weeks of signing</li>
          <li>Add them to the exclusive "Milea Couples" email list</li>
          <li>Establish a consistent communication schedule based on wedding date</li>
        </ul>
      </Highlights>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Initial Post-Booking Experience</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Items/Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Welcome Process</td>
                <td className="py-3 px-4">Initial steps to welcome and onboard new couples</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Introduce the couple to their dedicated planner or coordinator within 24 hours of booking</li>
                    <li>Send a comprehensive welcome kit (digital and physical)</li>
                    <li>Schedule a kickoff planning meeting within 2 weeks of signing</li>
                    <li>Add them to the exclusive "Milea Couples" email list for special events and announcements</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Welcome Kit Contents</td>
                <td className="py-3 px-4">Physical and digital materials provided to new couples</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Personalized welcome letter</li>
                    <li>Planning timeline tailored to their wedding date</li>
                    <li>Branded Milea wedding planning notebook</li>
                    <li>Sample floor plans and layouts</li>
                    <li>Preferred vendor list with exclusive Milea discounts</li>
                    <li>Bottle of Milea wine with custom label</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Planning Support & Touchpoints</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">Structured Timeline Communication</h4>
            <p className="mb-2 text-gray-700">Establish a consistent communication schedule based on wedding date:</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-darkBrown text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Timeline</th>
                    <th className="py-3 px-4 text-left">Communication Frequency</th>
                    <th className="py-3 px-4 text-left">Key Activities</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">12+ Months Out</td>
                    <td className="py-3 px-4">Quarterly check-ins</td>
                    <td className="py-3 px-4">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Seasonal planning newsletter</li>
                        <li>Invitation to relevant Milea events</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">6-12 Months Out</td>
                    <td className="py-3 px-4">Monthly check-ins</td>
                    <td className="py-3 px-4">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Targeted planning milestone reminders</li>
                        <li>Vendor coordination touchpoints</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">3-6 Months Out</td>
                    <td className="py-3 px-4">Bi-weekly communications</td>
                    <td className="py-3 px-4">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Menu and wine tasting scheduling</li>
                        <li>Floor plan and timeline development</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">1-3 Months Out</td>
                    <td className="py-3 px-4">Weekly check-ins</td>
                    <td className="py-3 px-4">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Final details meetings</li>
                        <li>Vendor coordination calls</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Relationship Building Events</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Event Category</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Available Events</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Exclusive Couple Events</td>
                <td className="py-3 px-4">Special experiences designed to build community and connection</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Seasonal "Meet & Mingle" events for Milea couples to connect with each other</li>
                    <li>Annual harvest participation experience</li>
                    <li>Complimentary wine club membership during planning period</li>
                    <li>Invitation to new wine release parties</li>
                    <li>Private tastings for couple and immediate family</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Planning Milestone Celebrations</td>
                <td className="py-3 px-4">Special moments to celebrate planning progress</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"6 Months To Go" champagne toast at the venue</li>
                    <li>Menu tasting experience with wine pairings</li>
                    <li>Final walkthrough celebration with small gift</li>
                    <li>Wedding week welcome moment</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Strategic Upsell Opportunities</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">Timing-Based Offerings</h4>
            <p className="mb-2 text-gray-700">Present carefully timed upgrade options based on the planning timeline:</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-darkBrown text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Timeline</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Available Upgrades</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">9-12 Months Out</td>
                    <td className="py-3 px-4">Venue Enhancements</td>
                    <td className="py-3 px-4">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Premium ceremony location options</li>
                        <li>Extended venue hours</li>
                        <li>Custom lighting packages</li>
                        <li>Upgraded rental collections</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">6-9 Months Out</td>
                    <td className="py-3 px-4">Culinary & Beverage</td>
                    <td className="py-3 px-4">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Enhanced beverage packages</li>
                        <li>Specialty station additions</li>
                        <li>Late night snack options</li>
                        <li>Custom wine label service</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">3-6 Months Out</td>
                    <td className="py-3 px-4">Guest Experience</td>
                    <td className="py-3 px-4">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Transportation services</li>
                        <li>Guest accommodation blocks</li>
                        <li>Wedding weekend activities</li>
                        <li>Rehearsal dinner packages</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">1-3 Months Out</td>
                    <td className="py-3 px-4">Day-of Additions</td>
                    <td className="py-3 px-4">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Day-of enhancements (champagne toast, signature cocktails)</li>
                        <li>Photography add-ons</li>
                        <li>Welcome bag service</li>
                        <li>Farewell brunch options</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Vendor Introduction Program</h4>
            <p className="mb-2 text-gray-700">Develop a structured introduction system to preferred vendors that:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Highlights vendor partners who align with the couple's vision and budget</li>
              <li>Provides exclusive Milea client discounts or added-value services</li>
              <li>Creates seamless planning experience with vendors familiar with the venue</li>
              <li>Includes feedback loop to continuously improve vendor partnerships</li>
              <li>Offers bundled services at advantageous pricing</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Associated Events Expansion</h4>
            <p className="mb-2 text-gray-700">Actively promote Milea as the ideal location for related wedding events:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Engagement parties</li>
              <li>Bridal showers</li>
              <li>Rehearsal dinners</li>
              <li>Welcome receptions</li>
              <li>Post-wedding brunches</li>
              <li>First anniversary celebrations</li>
            </ul>
            <p className="mt-2 text-gray-700">Create packaged pricing when multiple events are booked together, with increasing discounts for each additional event.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Proactive Issue Prevention</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Prevention Category</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Key Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Regular Planning Audits</td>
                <td className="py-3 px-4">Proactive planning reviews at key milestones</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>6-month comprehensive review of all details</li>
                    <li>3-month vendor coordination check</li>
                    <li>1-month final walkthrough and timeline analysis</li>
                    <li>2-week confirmation of all logistics</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Weather Contingency Planning</td>
                <td className="py-3 px-4">Comprehensive backup plans for weather-related issues</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Develop detailed Plan B options for each couple</li>
                    <li>Schedule specific planning meeting focused on weather alternatives</li>
                    <li>Create visual presentations of rain plan setups</li>
                    <li>Review weather planning in final month regardless of forecast</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Communication Clarity</td>
                <td className="py-3 px-4">Clear documentation and approval processes</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Document all decisions and changes in writing</li>
                    <li>Provide regular planning summaries</li>
                    <li>Create visual timeline for wedding day</li>
                    <li>Establish clear approval processes for changes</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Post-Wedding Relationship</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Program Category</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Key Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Immediate Follow-Up</td>
                <td className="py-3 px-4">Initial post-wedding engagement steps</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Day-after personal message from coordinator</li>
                    <li>One-week thank you gift delivery</li>
                    <li>Two-week check-in for honeymoon return</li>
                    <li>Request for feedback and reviews</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Anniversary Marketing Program</td>
                <td className="py-3 px-4">Structured anniversary follow-up program</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>1-month post-wedding thank you with professional photo</li>
                    <li>6-month "Remember when..." email with wedding highlight</li>
                    <li>First anniversary gift (wine from wedding vintage)</li>
                    <li>Annual anniversary discount for dinner at Milea</li>
                    <li>Special invitation to return for milestone anniversaries (5, 10 year)</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Referral Generation</td>
                <td className="py-3 px-4">Ambassador and referral program initiatives</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Create ambassador program for past couples</li>
                    <li>Offer incentives for successful referrals (wine club credits, anniversary perks)</li>
                    <li>Feature past couples' stories on social media and website</li>
                    <li>Host an annual "Return to Milea" event for past couples</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Team Handoff & Continuity</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Process Category</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Key Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Transition Process</td>
                <td className="py-3 px-4">Smooth handoff between team members</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Formal introduction to post-booking team members</li>
                    <li>Clear documentation of couple's preferences and history</li>
                    <li>Warm handoff meetings with both team members present</li>
                    <li>Continuity of primary contact whenever possible</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Knowledge Sharing System</td>
                <td className="py-3 px-4">Internal processes for team collaboration</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Centralized CRM notes accessible to all team members</li>
                    <li>Regular internal team meetings to discuss active couples</li>
                    <li>Detailed profiles of each couple with key details and preferences</li>
                    <li>Cross-training to ensure coverage during absences</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Measuring Success</h3>
        <p className="mb-2 text-gray-700">Track these key metrics to optimize your post-booking engagement:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Upsell conversion rate by offering type</li>
          <li>Associated event booking rate</li>
          <li>Vendor referral acceptance percentage</li>
          <li>Post-wedding review completion rate</li>
          <li>Ambassador program participation</li>
          <li>Anniversary event attendance</li>
          <li>Referral generation numbers</li>
          <li>Cancellation/postponement rate</li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/sales/post-booking"
          className="button button-primary"
        >
          Take the Post-Booking Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="Post-Booking" fallbackContent={fallbackContent} contentId="post-booking" contentType="sales" />;
}

export default PostBooking; 