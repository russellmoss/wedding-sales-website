import React from 'react';
import ContentTemplate from './ContentTemplate';
import { Link } from 'react-router-dom';
import Highlights from '../shared/Highlights';

function VenueOverview() {
  const fallbackContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-gilda text-darkBrown mb-4">About Milea Estate Vineyard</h2>
        <p className="text-gray-700 mb-4">
          Welcome to Milea Estate Vineyard, where your dream events come to life! Nestled in bucolic Staatsburg, NY, 
          our venue offers a unique and enchanting setting for a wide range of special occasions. Whether you're planning 
          a wedding, corporate gathering, or social celebration, our versatile spaces are designed to exceed your expectations.
        </p>
      </div>
      
      <Highlights title="Venue Highlights">
        <ul className="list-disc list-inside space-y-2">
          <li>Two unique event spaces: Clubhouse (up to 150 guests) and Farmhouse (50 indoor, 150 outdoor)</li>
          <li>Elegant chandeliers and customizable lighting</li>
          <li>Spacious dance floor for lively celebrations</li>
          <li>Award-winning wines, spirits, beers, and non-alcoholic offerings</li>
          <li>Dedicated event staff to assist with planning and execution</li>
          <li>Multiple accolades including "Best Winery in the Hudson Valley"</li>
          <li>Local Hudson Valley ingredients in culinary offerings</li>
          <li>Flexible booking options with 50% deposit to secure date</li>
        </ul>
      </Highlights>
      
      <div>
        <h2 className="text-2xl font-gilda text-darkBrown mb-4">Our Facilities</h2>
        <p className="text-gray-700 mb-4">
          We have two unique spaces that accommodate up to 150 guests in our Clubhouse and 50 indoor guests in our Farmhouse 
          with an additional 150 guests on our outdoor patios.
        </p>
        
        <h3 className="text-xl font-gilda text-darkBrown mb-2">Key Features:</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Elegant chandeliers and customizable lighting</li>
          <li>Spacious dance floor for lively celebrations</li>
          <li>Ideal for weddings, galas, and large-scale events</li>
          <li>Award-winning wines, spirits, beers, and non-alcoholic offerings</li>
          <li>Dedicated event staff to assist with planning and execution</li>
        </ul>
      </div>
      
      <div>
        <h2 className="text-2xl font-gilda text-darkBrown mb-4">Location</h2>
        <p className="text-gray-700 mb-2">Milea Estate Vineyard is located at:</p>
        <ul className="list-none text-gray-700 space-y-1 mb-4">
          <li>450 Hollow Rd, Staatsburg, NY 12580</li>
          <li>Phone: (845) 266-0384</li>
          <li>Email: events@mileaestatevineyard.com</li>
        </ul>
      </div>
      
      <div>
        <h2 className="text-2xl font-gilda text-darkBrown mb-4">Award-Winning Food & Wine</h2>
        <p className="text-gray-700 mb-4">
          Milea Estate has garnered a plethora of accolades since opening its doors in 2019. This includes:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>"Best Winery in the Hudson Valley" (twice)</li>
          <li>"Best Food at a Winery in the Hudson Valley"</li>
          <li>Wines named "hidden gems" by Wine Enthusiast</li>
          <li>Multiple 90+ points from both Wine Enthusiast and Decanter Magazines</li>
          <li>Milea Rosé named "Best Rosé in the Hudson Valley"</li>
        </ul>
      </div>
      
      <div>
        <h2 className="text-2xl font-gilda text-darkBrown mb-4">Our Commitment</h2>
        <p className="text-gray-700 mb-4">
          Our dedicated event staff can assist you in creating your special day. From recommending top vendors in the area 
          to liaising between them and our culinary team, we ensure the best possible menus crafted with local Hudson Valley 
          ingredients. Our team also assists with event setup, ensuring every detail is perfect for your unforgettable celebration.
        </p>
      </div>
      
      <div>
        <h2 className="text-2xl font-gilda text-darkBrown mb-4">Booking Information</h2>
        <p className="text-gray-700 mb-4">
          A signed contract and a deposit of 50% of the site fee are required to secure your date. The entire balance of your 
          event is due in full 30 days from your event. Any changes made during the 30 days leading up to your event must be 
          approved by the events coordinator and/or executive chef and must be paid for no later than 2 days after a change is 
          made. No changes to the event are allowed within 7 days of the event.
        </p>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg mt-8">
        <p className="text-gray-700 italic mb-4">
          Embark on a journey of seamless event planning and unforgettable moments. Reserve your date at Milea Estate Vineyard 
          today and let our versatile spaces and dedicated team turn your vision into reality.
        </p>
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/quizzes/weddings/venue-overview" className="button button-primary">
          Take the Venue Overview Quiz
        </Link>
      </div>
    </div>
  );
  
  return <ContentTemplate 
    title="Venue Overview" 
    fallbackContent={fallbackContent} 
    contentId="venue-overview"
  />;
}

export default VenueOverview; 