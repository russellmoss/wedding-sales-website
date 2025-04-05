import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from '../weddings/ContentTemplate';
import Highlights from '../shared/Highlights';

function Qualification() {
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
          The qualification stage is your opportunity to determine if a couple is a good fit for Milea Estate Vineyard while gathering essential information to personalize their experience. This guide will help you master the art of effective qualification conversations.
        </p>
      </div>

      <Highlights title="Qualification Strategies">
        <ul className="list-disc pl-5 space-y-2">
          <li>Ask a few soft questions in the follow-up to guide the conversation</li>
          <li>Avoid overwhelming them with too many details initially</li>
          <li>Focus on building rapport while gathering key information</li>
          <li>Use a conversational approach rather than an interrogative one</li>
        </ul>
      </Highlights>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Essential Qualification Questions</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">Basic Planning Information</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>"How many guests are you planning for?"</li>
              <li>"What season or date are you envisioning for your celebration?"</li>
              <li>"Do you have a planner or are you working together directly?"</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Vision & Priority Mapping</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>"What are the three most important elements of your wedding day?"</li>
              <li>"When you picture your perfect wedding venue, what details stand out to you?"</li>
              <li>"Are there any specific features or spaces you're hoping to find in your venue?"</li>
              <li>"What kind of atmosphere or feeling are you hoping to create for your guests?"</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Budget Conversation Framework</h4>
            <p className="mb-2">Instead of asking directly about budget (which can feel uncomfortable), use this approach:</p>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-darkBrown mb-1">1. Provide Range Context</h5>
                <MessageCard 
                  title="Budget Range Question"
                  message="At Milea, our couples typically invest between $X-$Y for a Saturday wedding in peak season, which includes [venue fee, food & beverage minimums, etc.]. Does that generally align with what you had in mind?"
                  id="budget-range"
                />
              </div>
              
              <div>
                <h5 className="font-medium text-darkBrown mb-1">2. Budget Prioritization Question</h5>
                <MessageCard 
                  title="Budget Prioritization"
                  message="Many couples have specific elements of their wedding they prioritize in their budget—some focus on food and wine, others on décor or entertainment. What aspects are most important for you to invest in?"
                  id="budget-prioritization"
                />
              </div>
              
              <div>
                <h5 className="font-medium text-darkBrown mb-1">3. Flexible Options Discussion</h5>
                <MessageCard 
                  title="Flexible Options"
                  message="We have different options that can work with various budget ranges, including off-peak season dates and weekday celebrations that offer significant savings. Would you like me to share more about those possibilities?"
                  id="flexible-options"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Decision Timeline Questions</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>"When are you hoping to make a decision on your venue?"</li>
              <li>"Are you currently looking at other venues in the Hudson Valley area?"</li>
              <li>"What's your ideal timeline for planning—are you envisioning a longer engagement or hoping to plan within a specific timeframe?"</li>
              <li>"Is there anyone else involved in making the venue decision who should join us for a tour?"</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Qualification Call Structure</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">Opening (2-3 minutes)</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Express gratitude for their interest</li>
              <li>Congratulate them on their engagement</li>
              <li>Ask an ice-breaker question about how they met or got engaged</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Venue Overview (3-5 minutes)</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide a brief overview of Milea Estate Vineyard</li>
              <li>Highlight 2-3 unique selling points (award-winning wines, panoramic views, flexibility)</li>
              <li>Explain your role in their wedding journey</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Needs Assessment (8-10 minutes)</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ask qualification questions from the categories above</li>
              <li>Listen actively and take detailed notes</li>
              <li>Validate their vision and preferences</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Education & Alignment (5-7 minutes)</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Share relevant information based on their responses</li>
              <li>Address any potential misalignments gracefully</li>
              <li>Emphasize flexibility where possible</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">Next Steps (2-3 minutes)</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Recommend a tour if aligned</li>
              <li>Suggest alternative options if needed</li>
              <li>Schedule specific date/time for follow-up</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Qualification Response Guidelines</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-darkBrown mb-2">For Budget-Aligned Couples</h4>
            <MessageCard 
              title="Budget-Aligned Response"
              message="Based on what you've shared, I think Milea would be a beautiful fit for your vision. Our [specific venue space] would accommodate your guest count perfectly, and our [feature that matches their priority] aligns wonderfully with what you're envisioning."
              id="budget-aligned"
            />
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">For Couples Requiring Education</h4>
            <MessageCard 
              title="Education Response"
              message="Your vision sounds beautiful. While your guest count of [X] is a bit more than our maximum capacity of 150, we've had couples create stunning celebrations by [creative solution]. Would you be open to exploring that possibility?"
              id="education-needed"
            />
          </div>

          <div>
            <h4 className="font-medium text-darkBrown mb-2">For Misaligned Inquiries</h4>
            <MessageCard 
              title="Misaligned Response"
              message="Thank you for sharing your plans. It sounds like you're envisioning [their vision], which is beautiful. Based on your specific needs, particularly [specific requirement], I want to be transparent that Milea might not be the perfect match because [honest reason]. Would you like me to suggest some other venues in our area that might better accommodate your vision?"
              id="misaligned"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Qualification Documentation</h3>
        <p className="mb-4">Create detailed notes in your CRM immediately after each qualification conversation, including:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Key wedding details (date, guest count, vision)</li>
          <li>Budget range indication</li>
          <li>Decision-making timeline</li>
          <li>Specific personal details shared (engagement story, preferences)</li>
          <li>Next steps and follow-up timing</li>
          <li>Qualification score (Hot/Warm/Cool prospect)</li>
        </ul>
        <p className="mt-4">This documentation ensures personalized follow-up and helps track conversion metrics through your sales funnel.</p>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/sales/qualification"
          className="button button-primary"
        >
          Take the Qualification Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="Qualification" fallbackContent={fallbackContent} contentId="qualification" contentType="sales" />;
}

export default Qualification; 