import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from '../weddings/ContentTemplate';
import Highlights from '../shared/Highlights';

function FollowUp() {
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
          The follow-up stage is your opportunity to stay top-of-mind with potential clients and guide them toward a booking decision through strategic, value-added touchpoints. This guide will help you implement effective follow-up strategies that maintain engagement and address common concerns.
        </p>
      </div>

      <Highlights title="Follow-Up Best Practices">
        <ul className="list-disc pl-5 space-y-2">
          <li>Follow a structured schedule with specific touchpoints at key intervals</li>
          <li>Position yourself as a helpful guide rather than a salesperson</li>
          <li>Add value with each communication through new information or offers</li>
          <li>Tailor your approach based on the couple's specific concerns or timeline</li>
          <li>Document all interactions in the CRM for consistent follow-up</li>
        </ul>
      </Highlights>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Follow-Up Schedule</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">Day 2: Friendly Check-In</h4>
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
                  <span className="text-darkBrown">Checking in on your Milea proposal</span>
                </div>
              </div>
              <MessageCard 
                title="Email Body"
                message={`Hi [Names],

Just wanted to make sure you received everything and see if you have any initial questions about the proposal I sent.

I'm here to clarify any aspects of the proposal or provide additional information that would help with your decision.

Looking forward to your thoughts!

Warm regards,
[Your Name]`}
                id="day2-email"
              />
            </div>
            <p className="text-gray-600 mb-4"><span className="inline-flex items-center text-blue-600 mr-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg></span>Also include a brief phone call to gauge initial reactions.</p>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Day 5: Scarcity-Based Message</h4>
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
                  <span className="text-darkBrown">Update on [Month] availability at Milea</span>
                </div>
              </div>
              <MessageCard 
                title="Email Body"
                message={`Hi [Names],

We're getting more [Month] inquiries and wanted to check in before the date is released.

I wanted to share that we've recently enhanced our [specific feature] which many couples have found adds a special touch to their celebration.

Your courtesy hold is still active until [date]. Would you like to schedule a time to discuss any questions you might have?

Best regards,
[Your Name]`}
                id="day5-email"
              />
            </div>
            <p className="text-gray-600 mb-4"><span className="inline-flex items-center text-blue-600 mr-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg></span>Also send a short text reminder about the courtesy hold expiration.</p>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Day 10: Added Value Offer</h4>
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
                  <span className="text-darkBrown">Special offer for your Milea wedding</span>
                </div>
              </div>
              <MessageCard 
                title="Email Body"
                message={`Hi [Names],

I wanted to extend a special offer: I'd be happy to include a complimentary wine tasting for you and your partner if you'd like to return to Milea before making your final decision.

This would give you a chance to experience our award-winning wines and discuss any remaining questions in a more relaxed setting.

I'm also available for a more detailed conversation to address any lingering concerns you might have about hosting your wedding at Milea.

Would either of these options be helpful?

Warm regards,
[Your Name]`}
                id="day10-email"
              />
            </div>
            <p className="text-gray-600 mb-4"><span className="inline-flex items-center text-blue-600 mr-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg></span>Include a phone call for a more detailed conversation addressing any lingering concerns.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Enhanced Follow-Up Strategies</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">Decision Facilitator Role</h4>
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
                  <span className="text-darkBrown">Making your decision easier - Questions about Milea?</span>
                </div>
              </div>
              <MessageCard 
                title="Email Body"
                message={`Hi [Names],

As you're considering venues for your special day, I wanted to reach out and see if there's any additional information I can provide that would make your decision process easier.

Many couples have questions about [common concern 1] and [common concern 2] at this stage. Would it be helpful if I shared more details about these aspects of hosting your wedding at Milea?

I'm here to help make this decision as smooth as possible for you both.

Warm regards,
[Your Name]`}
                id="decision-facilitator"
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Seasonal Urgency Framework</h4>
            <p className="mb-2">Tailor your follow-up based on the season they're interested in:</p>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-darkBrown mb-1">For Peak Season (May-October):</h5>
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
                      <span className="text-darkBrown">Update on [Month] 2025 availability at Milea</span>
                    </div>
                  </div>
                  <MessageCard 
                    title="Email Body"
                    message={`Hi [Names],

I wanted to give you a quick update that we've received two more inquiries for [month] 2025 since we last spoke. While I still have your date on courtesy hold until [specific date], I wanted to let you know that our calendar is filling quickly for that season.

If you're still considering Milea, I'd be happy to extend your courtesy hold for a few more days or discuss next steps if you're ready to move forward.

Best,
[Your Name]`}
                    id="peak-season"
                  />
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-darkBrown mb-1">For Off-Peak Season (November-April):</h5>
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
                      <span className="text-darkBrown">Special off-season enhancements for your Milea wedding</span>
                    </div>
                  </div>
                  <MessageCard 
                    title="Email Body"
                    message={`Hi [Names],

As you're considering your [month] wedding at Milea, I wanted to share some of the special enhancements we offer during our intimate season:

- Complimentary fire pits on our pergola for cozy gatherings
- Special winter/spring menu options featuring seasonal specialties
- Reduced minimum guest counts
- [Other seasonal benefit]

These elements create a uniquely magical experience that many of our couples find even more special than our peak season events.

I'd love to discuss how we might customize these offerings for your celebration.

Warm regards,
[Your Name]`}
                    id="off-peak-season"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Milestone Acknowledgment</h4>
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
                  <span className="text-darkBrown">Happy [X] Month Engagement Anniversary!</span>
                </div>
              </div>
              <MessageCard 
                title="Email Body"
                message={`Hi [Names],

I just realized it's been [X] months since your engagement, and I wanted to send a quick note to congratulate you on this milestone in your journey together!

How is your wedding planning coming along? Is there anything I can help with regarding your venue search or planning questions?

Whether or not you choose Milea for your special day, I'm happy to be a resource for you during this exciting time.

Warmly,
[Your Name]`}
                id="milestone"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Problem-Solving Follow-Ups</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">For Budget Concerns</h4>
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
                  <span className="text-darkBrown">Some flexible options for your Milea wedding</span>
                </div>
              </div>
              <MessageCard 
                title="Email Body"
                message={`Hi [Names],

After our conversation about your budget considerations, I've put together some creative options that might work better for your plans:

1. Thursday evening ceremony and reception with a 10% reduction in venue fee
2. Adjusted beverage package focusing on our award-winning wines rather than full bar
3. Seasonal menu alternative that maintains quality while reducing per-person costs

I'd love to discuss these options in more detail if you're interested. Would you be available for a quick call this week?

Best regards,
[Your Name]`}
                id="budget-concerns"
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">For Date Flexibility</h4>
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
                  <span className="text-darkBrown">Alternative dates with special incentives</span>
                </div>
              </div>
              <MessageCard 
                title="Email Body"
                message={`Hi [Names],

While your first-choice date of [date] is still on hold, I wanted to share that we have some beautiful alternative dates that come with special incentives:

- [Alternative date 1]: Includes complimentary rehearsal dinner space
- [Alternative date 2]: Features 10% reduction in minimum spend
- [Alternative date 3]: Offers upgraded wine package at no additional cost

These dates offer the same magical Milea experience with added benefits. Would any of these options interest you?

Warm regards,
[Your Name]`}
                id="date-flexibility"
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">For Decision-Maker Involvement</h4>
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
                  <span className="text-darkBrown">Private tour for [Parent/Important Decision-Maker]?</span>
                </div>
              </div>
              <MessageCard 
                title="Email Body"
                message={`Hi [Names],

I understand that [specific person] plays an important role in your wedding planning decisions. I'd be happy to arrange a private tour specifically for them to see our venue and address any questions or concerns they might have.

We could schedule this at their convenience, even outside our regular tour hours if needed.

Would this be helpful for your decision process?

Best,
[Your Name]`}
                id="decision-maker"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Re-Engagement Strategies</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">For Cooling Leads (14+ days without response)</h4>
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
                  <span className="text-darkBrown">Still thinking about Milea?</span>
                </div>
              </div>
              <MessageCard 
                title="Email Body"
                message={`Hi [Names],

I hope you're doing well with your wedding planning journey! I understand this is a big decision with many factors to consider.

As we approach the end of your courtesy hold period, I wanted to check if:
1. You need any additional information about Milea
2. You've decided to go in a different direction
3. You'd like to extend your courtesy hold

Either way, I'd appreciate a quick update so I can best assist you or release the date for other couples if needed.

Warm regards,
[Your Name]`}
                id="cooling-leads"
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">For "Lost" Leads (30+ days without response)</h4>
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
                  <span className="text-darkBrown">Checking in on your wedding plans</span>
                </div>
              </div>
              <MessageCard 
                title="Email Body"
                message={`Hi [Names],

It's been a little while since we connected about your wedding at Milea Estate Vineyard. I hope your planning is going well!

We're currently finalizing our calendar for your wedding season, and I wanted to reach out once more in case you're still considering Milea as your venue.

If you've chosen another direction, congratulations on finding your perfect venue! If you're still in the decision process, I'd be happy to answer any questions or arrange another visit.

Best wishes,
[Your Name]`}
                id="lost-leads"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Follow-Up Success Metrics</h3>
        <p className="mb-2">Track these key metrics to optimize your follow-up strategy:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Response rate to each follow-up type</li>
          <li>Average number of follow-ups before decision</li>
          <li>Most effective follow-up message types</li>
          <li>Conversion rate by follow-up sequence</li>
          <li>Common objections raised during follow-up</li>
          <li>Average decision timeline after proposal</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">CRM Documentation</h3>
        <p className="mb-2">After each follow-up, update your CRM with:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Follow-up type and method (email/call/text)</li>
          <li>Summary of conversation and key points discussed</li>
          <li>Any new information learned about the couple's decision process</li>
          <li>Updated probability rating and next steps</li>
          <li>Scheduled date for next follow-up</li>
          <li>Any personalized details to include in future communications</li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/sales/follow-up"
          className="button button-primary"
        >
          Take the Follow-Up Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="Follow Up" fallbackContent={fallbackContent} contentId="follow-up" contentType="sales" />;
}

export default FollowUp; 