import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from '../weddings/ContentTemplate';
import Highlights from '../shared/Highlights';

function Proposal() {
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
          The proposal stage is your opportunity to convert interest into commitment by delivering a customized, compelling offer that aligns with the couple's vision. This guide will help you create effective proposals that showcase Milea Estate Vineyard's unique value and encourage couples to take the next step.
        </p>
      </div>

      <Highlights title="Proposal Best Practices">
        <ul className="list-disc pl-5 space-y-2">
          <li>Send proposal within 24 hours of the tour</li>
          <li>Include itemized pricing, options, and clear next steps</li>
          <li>Emphasize scarcity and value: e.g., "We have just one Saturday left in October 2025"</li>
          <li>Offer to review the proposal together via phone or video call</li>
          <li>Make the proposal visually appealing and easy to navigate</li>
        </ul>
      </Highlights>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Proposal Structure</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">Cover Page</h4>
            <p className="mb-2">Create a personalized cover page that includes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The couple's names prominently displayed</li>
              <li>Their potential wedding date(s)</li>
              <li>A beautiful image of the part of the venue they connected with most</li>
              <li>Milea Estate Vineyard branding</li>
              <li>A personalized tagline (e.g., "Creating [Couple's Names]'s Perfect Day at Milea")</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Introduction Letter</h4>
            <MessageCard 
              title="Introduction Letter Template"
              message={`Dear [Names],

Thank you for visiting Milea Estate Vineyard on [date]. It was a pleasure showing you our property and learning more about your vision for your wedding day.

I was particularly excited to hear about your plans for [specific detail they mentioned], and I believe our [specific venue space] would be the perfect backdrop for bringing that vision to life.

Based on our conversation and your preferences, I've prepared the following customized proposal for your consideration. As mentioned, I've placed a courtesy hold on [date] for 5 business days to give you time to review these options.

I'm available to answer any questions you might have and am happy to adjust any aspects of this proposal to better suit your needs.

Warm regards,
[Your Name]`}
              id="intro-letter"
            />
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Tiered Package Options</h4>
            <p className="mb-4">Instead of a one-size-fits-all approach, offer 2-3 distinct package options:</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-darkBrown text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Package Type</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-left">Included Elements</th>
                    <th className="py-3 px-4 text-left">Investment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">Standard Package</td>
                    <td className="py-3 px-4">[Name tied to wine theme]</td>
                    <td className="py-3 px-4">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Venue rental for [hours]</li>
                        <li>Basic beverage package with X wines</li>
                        <li>[Other included elements]</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 font-medium">$X</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">Premium Package</td>
                    <td className="py-3 px-4">[Name tied to wine theme]</td>
                    <td className="py-3 px-4">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Extended venue rental time</li>
                        <li>Enhanced beverage selection</li>
                        <li>Additional perks (e.g., complimentary rehearsal dinner space)</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 font-medium">$X</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">Luxury Package</td>
                    <td className="py-3 px-4">[Name tied to wine theme]</td>
                    <td className="py-3 px-4">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Full day exclusive access</li>
                        <li>Premium wine and spirits selection</li>
                        <li>Added luxury elements (e.g., dedicated bridal suite, enhanced staffing)</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 font-medium">$X</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Visual Presentation</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-darkBrown text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-left">Implementation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">Photography</td>
                    <td className="py-3 px-4">High-quality visual elements</td>
                    <td className="py-3 px-4">Include high-quality photos throughout the proposal</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">Formatting</td>
                    <td className="py-3 px-4">Consistent design approach</td>
                    <td className="py-3 px-4">Use consistent, elegant formatting</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">Customization</td>
                    <td className="py-3 px-4">Tailored to couple's needs</td>
                    <td className="py-3 px-4">Create custom floor plans or layouts based on their guest count</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">Timeline</td>
                    <td className="py-3 px-4">Visual day planning</td>
                    <td className="py-3 px-4">Include a timeline visualization of their wedding day</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">Comparison</td>
                    <td className="py-3 px-4">Package differentiation</td>
                    <td className="py-3 px-4">Add infographics for package comparisons</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">"Why Milea" Section</h4>
            <p className="mb-4">Include a dedicated page highlighting:</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-darkBrown text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-left">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">Unique Selling Points</td>
                    <td className="py-3 px-4">What makes Milea special</td>
                    <td className="py-3 px-4">Award-winning wines, panoramic views, etc.</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">Recognition</td>
                    <td className="py-3 px-4">External validation</td>
                    <td className="py-3 px-4">Recent awards or recognition</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">Signature Experiences</td>
                    <td className="py-3 px-4">Exclusive offerings</td>
                    <td className="py-3 px-4">Signature experiences only available at Milea</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">Social Proof</td>
                    <td className="py-3 px-4">Third-party validation</td>
                    <td className="py-3 px-4">Testimonials or reviews from past couples</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">Competitive Advantage</td>
                    <td className="py-3 px-4">Market positioning</td>
                    <td className="py-3 px-4">Key advantages over competitor venues</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Social Proof Elements</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-darkBrown text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Element Type</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-left">Implementation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">Testimonials</td>
                    <td className="py-3 px-4">Couple feedback</td>
                    <td className="py-3 px-4">Incorporate 2-3 brief testimonials from couples with similar wedding styles</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">Wedding Photos</td>
                    <td className="py-3 px-4">Visual examples</td>
                    <td className="py-3 px-4">Include small, elegant photos of real weddings at Milea</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">Media Coverage</td>
                    <td className="py-3 px-4">External recognition</td>
                    <td className="py-3 px-4">Mention notable events or features that have received media attention</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">High-Profile Events</td>
                    <td className="py-3 px-4">Celebrity connections</td>
                    <td className="py-3 px-4">List any celebrity or high-profile events (if applicable and permitted)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Terms and Policies</h4>
            <p className="mb-4">Create a clear, concise section outlining:</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-darkBrown text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Policy Category</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-left">Key Points to Include</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">Financial Terms</td>
                    <td className="py-3 px-4">Payment requirements</td>
                    <td className="py-3 px-4">Deposit requirements and payment schedule</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">Cancellation</td>
                    <td className="py-3 px-4">Booking changes</td>
                    <td className="py-3 px-4">Cancellation policy</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">Weather</td>
                    <td className="py-3 px-4">Outdoor considerations</td>
                    <td className="py-3 px-4">Weather contingency plans</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">Vendors</td>
                    <td className="py-3 px-4">Third-party services</td>
                    <td className="py-3 px-4">Vendor requirements and restrictions</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">Timeline</td>
                    <td className="py-3 px-4">Decision process</td>
                    <td className="py-3 px-4">Timeline for decision-making</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Next Steps Guide</h4>
            <p className="mb-4">Provide a simple, clear path forward:</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-darkBrown text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Step</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-left">Action Items</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">1</td>
                    <td className="py-3 px-4">Review and Selection</td>
                    <td className="py-3 px-4">Review proposal and select preferred package</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">2</td>
                    <td className="py-3 px-4">Discussion</td>
                    <td className="py-3 px-4">Schedule a follow-up call to discuss any questions</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-medium text-darkBrown">3</td>
                    <td className="py-3 px-4">Commitment</td>
                    <td className="py-3 px-4">Secure date with signed contract and deposit</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-medium text-darkBrown">4</td>
                    <td className="py-3 px-4">Planning</td>
                    <td className="py-3 px-4">Begin planning process with venue coordinator</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Email Language</h3>
        <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-md">
          <div className="border-b border-gray-300 pb-2 mb-3">
            <div className="flex items-center mb-1">
              <span className="font-medium text-gray-700 mr-2">From:</span>
              <span className="text-darkBrown">[Your Name] &lt;events@mileaestatevineyard.com&gt;</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="font-medium text-gray-700 mr-2">To:</span>
              <span className="text-darkBrown">[Names]</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-700 mr-2">Subject:</span>
              <span className="text-darkBrown">Your Customized Milea Estate Vineyard Wedding Proposal</span>
            </div>
          </div>
          <MessageCard 
            title="Email Body"
            message={`Dear [Names],

Attached is your customized proposal based on everything we discussed during your recent visit to Milea Estate Vineyard. I've also held your preferred date of [date] for 5 business days.

I've included three package options that I believe would work beautifully for your vision, with our [recommended package] likely being the best fit based on what you shared about [specific element they mentioned].

I'd love to schedule a 15-minute call to review these options together and answer any questions you might have. Would [specific date/time] or [alternative date/time] work for your schedule?

Looking forward to the possibility of hosting your special day at Milea Estate Vineyard.

Warm regards,
[Your Name]
[Title]
[Contact information]`}
            id="proposal-email"
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Proposal Delivery Best Practices</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Best Practices</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Timing</td>
                <td className="py-3 px-4">When to send the proposal for maximum impact</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Send during business hours for immediate availability to answer questions</li>
                    <li>Follow up with a text message alerting them that the proposal has been sent</li>
                    <li>Schedule a specific time to review together rather than leaving it open-ended</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Format Options</td>
                <td className="py-3 px-4">How to present the proposal for optimal engagement</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Send as both PDF attachment and in-body preview images</li>
                    <li>Offer a digital presentation option for interactive viewing</li>
                    <li>Consider a printed copy for in-person meetings</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Personalization Touches</td>
                <td className="py-3 px-4">Elements that make the proposal feel tailored and special</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Reference specific details from their tour and conversations</li>
                    <li>Include images of the specific spaces they responded to most positively</li>
                    <li>Address any special requests or concerns they expressed</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Proposal Follow-Up Protocol</td>
                <td className="py-3 px-4">Steps to take after sending the proposal</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Call within 4 hours of sending to confirm receipt</li>
                    <li>Ask if they have any immediate questions</li>
                    <li>Schedule a specific time to review in detail</li>
                    <li>Send calendar invitation for the proposal review meeting</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Measuring Proposal Effectiveness</h3>
        <p className="mb-2">Track these metrics for continuous improvement:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Time from tour to proposal delivery</li>
          <li>Proposal-to-contract conversion rate</li>
          <li>Most commonly selected package option</li>
          <li>Average time to decision after proposal</li>
          <li>Most frequently asked questions after proposal review</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Follow-Up Success Metrics</h3>
        <p className="mb-4">Track these key metrics to optimize your follow-up strategy:</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Metric Category</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">What to Track</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Response Rate</td>
                <td className="py-3 px-4">Effectiveness of different follow-up methods</td>
                <td className="py-3 px-4">Response rate to each follow-up type</td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Follow-up Frequency</td>
                <td className="py-3 px-4">How many attempts are needed</td>
                <td className="py-3 px-4">Average number of follow-ups before decision</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Message Effectiveness</td>
                <td className="py-3 px-4">Which messages get responses</td>
                <td className="py-3 px-4">Most effective follow-up message types</td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Conversion Rate</td>
                <td className="py-3 px-4">Success of follow-up sequences</td>
                <td className="py-3 px-4">Conversion rate by follow-up sequence</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Objections</td>
                <td className="py-3 px-4">Common concerns to address</td>
                <td className="py-3 px-4">Common objections raised during follow-up</td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Decision Timeline</td>
                <td className="py-3 px-4">How long decisions take</td>
                <td className="py-3 px-4">Average decision timeline after proposal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">CRM Documentation</h3>
        <p className="mb-4">After each follow-up, update your CRM with:</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-darkBrown text-white">
              <tr>
                <th className="py-3 px-4 text-left">Documentation Category</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">What to Record</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Follow-up Details</td>
                <td className="py-3 px-4">Method and type of contact</td>
                <td className="py-3 px-4">Follow-up type and method (email/call/text)</td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Conversation Summary</td>
                <td className="py-3 px-4">Key points from the interaction</td>
                <td className="py-3 px-4">Summary of conversation and key points discussed</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Decision Process</td>
                <td className="py-3 px-4">Insights into their decision-making</td>
                <td className="py-3 px-4">Any new information learned about the couple's decision process</td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Probability Rating</td>
                <td className="py-3 px-4">Updated likelihood of booking</td>
                <td className="py-3 px-4">Updated probability rating and next steps</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-3 px-4 font-medium text-darkBrown">Next Follow-up</td>
                <td className="py-3 px-4">Scheduling future contact</td>
                <td className="py-3 px-4">Scheduled date for next follow-up</td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="py-3 px-4 font-medium text-darkBrown">Personalization Notes</td>
                <td className="py-3 px-4">Details for future communications</td>
                <td className="py-3 px-4">Any personalized details to include in future communications</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/sales/proposal"
          className="button button-primary"
        >
          Take the Proposal Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="Proposal" fallbackContent={fallbackContent} contentId="proposal" contentType="sales" />;
}

export default Proposal; 