import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from '../weddings/ContentTemplate';
import Highlights from '../shared/Highlights';

function InquiryResponse() {
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
          The initial inquiry response is your first opportunity to make a lasting impression on potential clients. Your goal is to respond quickly and personally to secure interest and establish trust. This guide will help you master the art of effective inquiry response across all platforms.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Response Platforms</h3>
        <p className="mb-4">Inquiries come through multiple channels, each requiring a tailored approach:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Perfect Venue</li>
          <li>The Knot</li>
          <li>Wedding Wire</li>
          <li>Website contact form</li>
        </ul>
      </div>

      <Highlights title="Best Practices">
        <ul className="list-disc pl-5 space-y-2">
          <li>Respond within 1 hour during business hours; within 12 hours after-hours</li>
          <li>Use personalized emails addressing the couple by name</li>
          <li>Mirror the tone of the inquiry (formal/informal, excited/casual)</li>
          <li>Customize response templates based on inquiry source</li>
          <li>Place a follow-up call as soon as possible</li>
          <li>Leave a friendly, personalized voicemail if no answer</li>
          <li>Send a brief follow-up text message</li>
          <li>Follow up with a comprehensive email</li>
        </ul>
      </Highlights>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Multi-Channel Follow-Up Strategy</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">1. Phone Call</h4>
            <p className="mb-2">After receiving the inquiry, place a phone call as soon as possible. If the couple answers:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Warmly introduce yourself</li>
              <li>Congratulate them on their engagement</li>
              <li>Offer to answer any immediate questions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">2. Voicemail Script</h4>
            <p className="mb-2">If there's no answer, leave a brief, friendly voicemail:</p>
            <MessageCard 
              title="Voicemail Script"
              message="Hi [First Name], this is [Your Name] from Milea Estate Vineyard. I just received your wedding inquiry and wanted to personally congratulate you and connect about your big day. I'd love to chat and answer any questions you have. I'll also send you a quick text and email. Looking forward to speaking with you!"
              id="voicemail"
            />
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">3. Text Message</h4>
            <p className="mb-2">Send a short follow-up text message:</p>
            <MessageCard 
              title="Text Message"
              message="Hi [First Name], this is [Your Name] from Milea Estate Vineyard. I just left you a voicemail and would love to chat about your wedding inquiry. Feel free to call or text back when it's convenient!"
              id="text"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Email Templates</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">Standard Email Template</h4>
            <MessageCard 
              title="Standard Email"
              message={`Subject: Congratulations [First Name] – Let's Plan Your Perfect Wedding at Milea!

Hi [First Name],

Thank you so much for your interest in hosting your wedding at Milea Estate Vineyard. Congratulations on your engagement – such an exciting time!

I just tried giving you a quick call and left a voicemail to introduce myself – I also sent you a text in case that's easier for you.

Our Clubhouse can accommodate up to 120 guests and features panoramic views of the Hudson Valley, a world-class catering kitchen, and a dedicated event coordinator to help bring your dream wedding to life.

We'd love to schedule a tour and hear more about your vision. When are you available this week or next?

Warmest wishes,
[Your Name]
Event Coordinator, Milea Estate Vineyard
events@mileaestatevineyard.com
[Phone Number]`}
              id="standard-email"
            />
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">The Knot / Wedding Wire Template</h4>
            <MessageCard 
              title="The Knot / Wedding Wire Email"
              message={`Subject: Your Milea Estate Vineyard Wedding - [First Names]!

Hi [First Names],

Thank you for your inquiry through [The Knot/Wedding Wire]! We're honored you're considering Milea Estate Vineyard for your wedding celebration.

I noticed you're interested in a [season] wedding for [guest count] guests. Our vineyard is particularly beautiful that time of year with [seasonal feature].

I'd love to schedule a time to chat about your vision and answer any questions you might have. Are you available for a quick call this week?

Warmly,
[Your Name]`}
              id="knot-email"
            />
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Instagram/Social Media Template</h4>
            <MessageCard 
              title="Instagram/Social Media Email"
              message={`Subject: From Instagram to "I Do" at Milea Estate Vineyard!

Hi [First Names],

Thanks for reaching out through our Instagram! We're thrilled you connected with our content and are considering Milea for your celebration.

Our couples often tell us they were first drawn to our vineyard through our photos, but fell in love when they experienced the views and atmosphere in person.

When would be a good time to schedule a tour so you can see if we're the perfect match for your special day?

Cheers,
[Your Name]`}
              id="instagram-email"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Enhanced Connection Strategies</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">Ask About Their Story</h4>
            <p className="mb-2">In your second communication, ask about their engagement story to create an emotional connection:</p>
            <MessageCard 
              title="Engagement Story Question"
              message="I'd love to hear a bit about your engagement story if you're willing to share! How did you two meet and what makes your relationship special?"
              id="story-question"
            />
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Video Message Follow-Up</h4>
            <p className="mb-2">After the initial email exchange, send a brief (30-60 second) personalized video message:</p>
            <MessageCard 
              title="Video Message Email"
              message={`Subject: A quick hello from Milea Estate Vineyard!

Hi [Names],

I wanted to take a moment to personally welcome you to the Milea family. I've attached a quick video message introducing myself and our beautiful venue.

Looking forward to potentially hosting your special day!

[Video Attachment or Link]

Warmly,
[Your Name]`}
              id="video-email"
            />
          </div>
        </div>
      </div>

      <Highlights title="Response Metrics to Track">
        <ul className="list-disc pl-5 space-y-2">
          <li>Initial response time (goal: under 1 hour during business hours)</li>
          <li>Contact-to-response rate (percentage of inquiries that receive a response)</li>
          <li>Open rate of initial emails</li>
          <li>Reply rate to initial outreach</li>
          <li>Platform-specific conversion rates (which source yields highest tour bookings)</li>
        </ul>
      </Highlights>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/sales/inquiry-response"
          className="button button-primary"
        >
          Take the Inquiry Response Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="Inquiry Response" fallbackContent={fallbackContent} contentId="inquiry-response" contentType="sales" />;
}

export default InquiryResponse; 