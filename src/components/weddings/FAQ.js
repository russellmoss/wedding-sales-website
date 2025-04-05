import React from 'react';
import ContentTemplate from './ContentTemplate';
import { Link } from 'react-router-dom';

function FAQ() {
  const fallbackContent = (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-serif text-darkBrown mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-serif text-darkBrown mb-6">Venue & Amenities</h2>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-xl font-serif text-darkBrown mb-4">What is included in the site rental fee?</h3>
            <ul className="list-disc pl-6 space-y-2 text-darkBrown">
              <li>One night stay at Milea accommodation</li>
              <li>Over 6,000 sqft in the clubhouse</li>
              <li>Farmhouse style tables and chairs</li>
              <li>High top tables</li>
              <li>Mobile bar</li>
              <li>A full service bar with a white marble finish</li>
              <li>HVAC</li>
              <li>Restrooms</li>
              <li>WIFI</li>
              <li>1,245 sqft of open air and covered outdoor patio space</li>
              <li>872 sqft of outdoor grass patio</li>
              <li>Lawn games</li>
              <li>Extra tables for gifts, canapés, photos, table assignments</li>
              <li>829 sqft Catering Kitchen</li>
              <li>Sonos Sound System</li>
              <li>Seating for up to 150 guests</li>
              <li>Flatware, glassware, plates, napkins</li>
              <li>Lounge area with comfy couches and chairs</li>
              <li>Clean up and trash removal</li>
              <li>Dedicated events team of servers, bartenders, events coordinator, kitchen team</li>
              <li>On-site parking</li>
            </ul>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-xl font-serif text-darkBrown mb-4">Little Extras:</h3>
            <ul className="list-disc pl-6 space-y-2 text-darkBrown">
              <li>Use of gas fire pits on pergola</li>
              <li>Photo Booth</li>
              <li>TV rental</li>
              <li>Full property buyout for complete and total privacy on your big day</li>
            </ul>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif text-darkBrown mb-4">Is Milea wheelchair accessible?</h3>
            <p className="text-darkBrown">Yes.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-darkBrown mb-6">Events & Planning</h2>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-xl font-serif text-darkBrown mb-4">Can we have an afterparty?</h3>
            <p className="text-darkBrown mb-4">We offer after parties for an additional cost until 1am. Music must be kept at a reduced volume to be mindful of our neighbors.</p>
            <p className="text-darkBrown italic">The town of Clinton has a noise ordinance of 8pm for any outdoor music. But fear not, you are welcome to keep the party going until 11pm inside.</p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-xl font-serif text-darkBrown mb-4">What happens in case of inclement weather?</h3>
            <p className="text-darkBrown mb-4">We have you covered with an outdoor pergola that has roofing, screens, heaters, and fans. No matter the weather, the clubhouse can host your entire event inside. Your events team will have a rain plan ready for you if the ceremony or cocktail hour are outside.</p>
            <p className="text-darkBrown">Important to note, we do not have tenting or portable heaters. We are happy to provide you with companies who can accommodate these requests for you.</p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif text-darkBrown mb-4">Am I required to have my own event planner?</h3>
            <p className="text-darkBrown">Yes. The planner could be with you the entire time you are planning your event or just for the day on site. The planner or coordinator is required to be from a legitimate business and must be chosen at least 2 months prior to the day of the wedding.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-darkBrown mb-6">Food & Beverage</h2>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-xl font-serif text-darkBrown mb-4">Are there upgrades available to the menu options?</h3>
            <p className="text-darkBrown">Additional enhancements and packages are available for you to choose from. These include but are not limited to: additional entrées, sides, salads, canapés, cheese and charcuterie, desserts, and bar packages. Please contact our events coordinator for more details.</p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-xl font-serif text-darkBrown mb-4">If I want something that is off menu or to modify your menu, am I allowed to do so?</h3>
            <p className="text-darkBrown">Yes! Our talented culinary team is able to accommodate modifications and requests. If you want a menu inspired by cultural heritage or just your favorite foods, please speak with our events coordinator to see what we can do for you.</p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif text-darkBrown mb-4">Do you offer any menu or wine tastings before my event?</h3>
            <p className="text-darkBrown">Absolutely we do! We encourage you to come in and try our food and wine to help you select your favorites. Dinner menu and wine tastings are for an additional fee and are optional but encouraged.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-darkBrown mb-6">Logistics</h2>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-xl font-serif text-darkBrown mb-4">Where do my guests park?</h3>
            <p className="text-darkBrown">Onsite parking - in the parking lot we can host up to 60 cars. Guests are also welcome to park along our driveway which can host another 60 cars or at our farm across the street from the vineyard.</p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-xl font-serif text-darkBrown mb-4">Are my guests allowed to smoke on property?</h3>
            <p className="text-darkBrown">We are proud to be a smoke-free property. Smoking is not allowed indoors as per federal regulations. Smoking locations can be established on the property for your event. Excessive cigarette butts on the ground may incur an additional cleaning fee.</p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif text-darkBrown mb-4">Is Milea pet friendly?</h3>
            <p className="text-darkBrown">We do love our four-legged friends but we kindly ask that they remain leashed both inside and outside. Grapes are unsafe for dogs to consume and we want to make sure they are protected. We appreciate your understanding in this matter.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-darkBrown mb-6">Booking & Payment</h2>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-xl font-serif text-darkBrown mb-4">I am ready! How do I book?</h3>
            <p className="text-darkBrown">A signed contract and a deposit of 50% of the site fee are required to secure your date. The entire balance of your event is due in full 30 days from your event. Any changes made during the 30 days leading up to your event must be approved by the events coordinator and/or executive chef and must be paid for no later than 2 days after a change is made. No changes to the event are allowed within 7 days of the event.</p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-xl font-serif text-darkBrown mb-4">What forms of payment do you accept?</h3>
            <p className="text-darkBrown">We accept checks, bank transfers, and all major credit cards. Please note that credit card payments may incur a processing fee.</p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-xl font-serif text-darkBrown mb-4">Is the rental fee subject to change?</h3>
            <p className="text-darkBrown">Yes, the rental fee and policy are subject to change without notice. Please note that NYS Sales Tax will be added.</p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif text-darkBrown mb-4">Is there a discount for off-season or weekday events?</h3>
            <p className="text-darkBrown">Pricing may vary depending on the season, day of the week, and demand. Please inquire with our events coordinator for specific pricing for your desired date.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-darkBrown mb-6">Event Coordinator Guidelines</h2>
          
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-serif text-darkBrown mb-4">Before Initial Client Contact</h3>
            <ul className="list-disc pl-6 space-y-2 text-darkBrown">
              <li>Review venue availability calendar for the requested date</li>
              <li>Prepare a personalized information packet with appropriate pricing</li>
              <li>Be familiar with any seasonal considerations for the requested timeframe</li>
            </ul>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link 
            to="/quizzes/weddings/faq" 
            className="button button-primary"
          >
            Take the FAQ Quiz
          </Link>
        </div>
      </div>
    </div>
  );

  return <ContentTemplate contentId="faq" fallbackContent={fallbackContent} />;
}

export default FAQ; 