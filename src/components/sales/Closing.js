import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from '../weddings/ContentTemplate';
import Highlights from '../shared/Highlights';

function Closing() {
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
          The closing stage is your opportunity to convert interest into a confirmed booking by securing a signed contract and deposit. This guide will help you implement effective closing strategies that build confidence and excitement for working with Milea Estate Vineyard.
        </p>
      </div>

      <Highlights title="Closing Best Practices">
        <ul className="list-disc pl-5 space-y-2">
          <li>Clearly outline how to move forward: digital contract + deposit</li>
          <li>Use a simple subject line: "Ready to Make It Official?"</li>
          <li>Provide support: offer to walk through the contract on a call</li>
          <li>Create a sense of celebration around the decision</li>
          <li>Make the signing process as simple and streamlined as possible</li>
        </ul>
      </Highlights>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Closing Call Strategy</h3>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-darkBrown mb-4">Closing Call Strategy</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-darkBrown">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phase</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Key Actions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Talking Points</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-darkBrown">Opening</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2-3 minutes</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc pl-4">
                      <li>Express excitement</li>
                      <li>Reinforce choice</li>
                      <li>Set agenda</li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc pl-4">
                      <li>"We're thrilled about your decision"</li>
                      <li>"Milea is perfect for your vision because..."</li>
                      <li>"Today we'll review contract details, answer questions, and discuss next steps"</li>
                    </ul>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-darkBrown">Contract Review</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5-7 minutes</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc pl-4">
                      <li>Walk through key points</li>
                      <li>Highlight important dates</li>
                      <li>Address common questions</li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc pl-4">
                      <li>Payment schedule and policies</li>
                      <li>Flexibility and customization options</li>
                      <li>Pre-empt common concerns</li>
                    </ul>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-darkBrown">Objection Handling</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">As needed</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc pl-4">
                      <li>Listen actively</li>
                      <li>Validate concerns</li>
                      <li>Provide solutions</li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc pl-4">
                      <li>"That's a great question..."</li>
                      <li>Clear, honest responses</li>
                      <li>Offer alternatives when possible</li>
                    </ul>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-darkBrown">Closing the Deal</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3-5 minutes</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc pl-4">
                      <li>Summarize next steps</li>
                      <li>Explain submission process</li>
                      <li>Set timeline expectations</li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc pl-4">
                      <li>"Here's how to submit your contract and deposit"</li>
                      <li>"Once we receive these, we'll..."</li>
                      <li>"We're excited to work with you"</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Competitive Positioning Elements</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">"Why Couples Choose Milea" Document</h4>
            <p className="mb-2 text-gray-700">Create a polished one-page document highlighting:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>Unique Environment:</strong> "Our panoramic Hudson Valley views and vineyard setting create a naturally stunning backdrop that requires minimal additional décor"</li>
              <li><strong>Award-Winning Wines:</strong> "Exclusive access to our award-winning wines, including selections not available to the general public"</li>
              <li><strong>Culinary Excellence:</strong> "Farm-to-table dining experiences featuring seasonal Hudson Valley ingredients prepared by our expert culinary team"</li>
              <li><strong>Versatile Spaces:</strong> "Multiple ceremony and reception locations allowing you to create a unique flow to your celebration"</li>
              <li><strong>Wedding Experience:</strong> "Our dedicated team has hosted over X successful weddings, bringing unparalleled expertise to your planning process"</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Competitive Analysis Points</h4>
            <p className="mb-2 text-gray-700">When appropriate, tastefully highlight Milea's advantages:</p>
            <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-md">
              <p className="italic text-gray-800">
                We understand you may be considering several beautiful Hudson Valley venues. Many couples tell us they ultimately choose Milea because:
              </p>
              <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-700">
                <li>Unlike many historic venues, our modern facilities offer both charm and comfort with advanced climate control and accessible amenities</li>
                <li>Our flexible spaces accommodate both your ceremony and reception, eliminating transportation logistics for you and your guests</li>
                <li>Our wine-country experience offers a destination feel without requiring extensive travel for NYC/tri-state area guests</li>
                <li>Our dedicated wedding coordination services are included in your package, unlike venues that require separate coordinator hiring</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Closing Email Template</h3>
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
              <span className="text-darkBrown">Ready to Make It Official? Your Milea Wedding Awaits</span>
            </div>
          </div>
          <MessageCard 
            title="Email Body"
            message={`Dear [Names],

We're thrilled that you've chosen Milea Estate Vineyard for your wedding celebration! 

Attached you'll find:
- Your customized wedding contract
- A detailed payment schedule
- Our planning timeline
- A "Welcome to Milea" guide to begin your planning journey

To secure your date ([specific date]), please:
1. Review and sign the attached contract
2. Submit your deposit of $[amount] via [payment methods]
3. Schedule your first planning meeting with our team

Once we receive your signed contract and deposit, I'll send immediate confirmation and introduce you to [Coordinator Name], who will be your dedicated planning contact throughout your journey with us.

If you have any questions about the contract or would like to review it together, I'm available for a call on [offer specific times]. Simply reply to this email or call me directly at [phone number].

We can't wait to start creating your perfect wedding day at Milea!

Warm regards,
[Your Name]
[Title]
[Contact Information]`}
            id="closing-email"
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Final Touch</h3>
        <p className="mb-2 text-gray-700">Send a branded thank-you gift or handwritten card upon booking. This cements emotional investment and begins the relationship on a high note.</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">Gift Ideas</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Bottle of signature Milea wine with custom "Thank You" label</li>
              <li>Small gift basket with local Hudson Valley products</li>
              <li>Personalized wedding planning journal or countdown calendar</li>
              <li>Gift certificate for a complimentary wine tasting for the couple and parents</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Handwritten Note Template</h4>
            <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-md">
              <MessageCard 
                title="Note Content"
                message={`Dear [Names],

We are honored that you've chosen Milea Estate Vineyard for your wedding celebration on [date]. 

Your trust means the world to us, and we promise to create an unforgettable day that perfectly reflects your love story and vision.

The entire Milea team looks forward to working with you to bring your dream wedding to life. Please enjoy this small token of our appreciation as we embark on this journey together.

With warm regards,
[Your Name]`}
                id="thank-you-note"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Contract Signing Facilitation</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">Digital Signing Process</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Use a streamlined electronic signature system</li>
              <li>Pre-fill as much information as possible</li>
              <li>Include clear instructions with screenshots if needed</li>
              <li>Test the link before sending to ensure it works properly</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">In-Person Signing Option</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Offer to meet at the venue or a convenient location</li>
              <li>Create a celebratory atmosphere with a glass of Milea wine</li>
              <li>Bring printed copies and digital options</li>
              <li>Be prepared to answer any final questions</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Post-Signing Immediate Actions</h3>
        <p className="mb-2 text-gray-700">Within 24 hours of receiving the signed contract and deposit:</p>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Send confirmation email with receipt of both contract and payment</li>
          <li>Add key wedding details to your venue management system</li>
          <li>Block the date in all calendars and booking platforms</li>
          <li>Introduce the couple to their planning coordinator via email</li>
          <li>Mail physical welcome package</li>
          <li>Schedule first planning meeting</li>
          <li>Update CRM with new status and notes</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Closing Success Metrics</h3>
        <p className="mb-2 text-gray-700">Track these key metrics to optimize your closing process:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Proposal-to-contract conversion rate</li>
          <li>Average time from proposal to signed contract</li>
          <li>Most common questions/concerns during closing</li>
          <li>Percentage of couples requesting contract revisions</li>
          <li>Effectiveness of different closing approaches</li>
          <li>Booking retention rate (cancellations/changes after signing)</li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/sales/closing"
          className="button button-primary"
        >
          Take the Closing Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="Closing" fallbackContent={fallbackContent} contentId="closing" contentType="sales" />;
}

export default Closing; 