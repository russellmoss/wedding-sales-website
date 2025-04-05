import React from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from './ContentTemplate';
import Highlights from '../shared/Highlights';

function AssociatedEvents() {
  const fallbackContent = (
    <div className="space-y-8">
      <div className="text-gray-700">
        <p className="mb-4">
          At Milea Estate Vineyard, we offer a variety of associated events to complement your wedding celebration. From proposals to farewell brunches, we can help create a complete wedding weekend experience for you and your guests.
        </p>
        <p className="mb-4">
          <span className="font-semibold text-darkBrown">Special Offer:</span> Save an additional 10% on your wedding site fee when booking an associated event with us.
        </p>
      </div>

      <Highlights title="Associated Events">
        <ul className="list-disc pl-5 space-y-2">
          <li>Proposals in our picturesque setting</li>
          <li>Bridal showers in intimate spaces</li>
          <li>Bachelorette parties in our beautiful vineyard</li>
          <li>Welcome dinners before the big day</li>
          <li>Rehearsal dinners with delicious food</li>
          <li>Farewell brunches to send off your guests</li>
          <li>10% discount on wedding site fee when booking an associated event</li>
          <li>Cohesive planning across multiple events</li>
        </ul>
      </Highlights>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Event Types</h3>
        <p className="mb-4">
          Milea Estate can host a variety of events associated with your wedding including:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Pre-Wedding Events</h4>
            <ul className="list-disc pl-5 space-y-2 text-darkBrown">
              <li><span className="font-semibold">Proposals</span> - Create a memorable proposal experience in our picturesque setting</li>
              <li><span className="font-semibold">Bridal Showers</span> - Host an elegant bridal shower in one of our intimate spaces</li>
              <li><span className="font-semibold">Bachelorette Parties</span> - Celebrate with friends in our beautiful vineyard setting</li>
            </ul>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Wedding Weekend Events</h4>
            <ul className="list-disc pl-5 space-y-2 text-darkBrown">
              <li><span className="font-semibold">Welcome Dinners</span> - Greet your guests with a warm welcome dinner before the big day</li>
              <li><span className="font-semibold">Rehearsal Dinners</span> - Practice for the main event followed by a delicious dinner</li>
              <li><span className="font-semibold">Farewell Brunches</span> - Send off your guests with a delightful morning-after brunch</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Spaces Available</h3>
        <p className="mb-4">
          We offer a variety of spaces to accommodate different types of associated events:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Indoor Venues</h4>
            <ul className="list-disc pl-5 space-y-2 text-darkBrown">
              <li><span className="font-semibold">The Farmhouse</span> - Perfect for intimate gatherings of up to 50 guests indoors (plus 150 on patios)</li>
              <li><span className="font-semibold">The Clubhouse</span> - Ideal for larger events with capacity for 150 guests</li>
              <li><span className="font-semibold">Partial Buyouts</span> - Available for smaller gatherings in our porch room or side patio</li>
            </ul>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Outdoor Spaces</h4>
            <ul className="list-disc pl-5 space-y-2 text-darkBrown">
              <li><span className="font-semibold">Vineyard</span> - Beautiful setting for photos and events</li>
              <li><span className="font-semibold">Patios</span> - Multiple locations throughout our picturesque property</li>
              <li><span className="font-semibold">Gardens</span> - Serene spaces for intimate gatherings</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Planning Your Associated Events</h3>
        <p className="mb-4">
          Our events team can help you coordinate multiple events to create a cohesive wedding weekend experience. We can assist with:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-darkBrown mb-4">
          <li>Menu planning across multiple events</li>
          <li>Wine selections that complement each gathering</li>
          <li>Coordinating with vendors for all events</li>
          <li>Creating a cohesive theme or experience</li>
          <li>Scheduling to ensure a smooth flow of events</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Recommended Event Planners</h3>
        <p className="mb-4">
          We work with several experienced event planners who can help coordinate your associated events:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Christofora Events */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Christofora Events</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.christoforaevents.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.christoforaevents.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:angela@christoforaevents.com" className="text-amber-600 hover:text-amber-800">angela@christoforaevents.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8454306394" className="text-amber-600 hover:text-amber-800">(845) 430-6394</a></li>
            </ul>
          </div>
          
          {/* Merry by Mia */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Merry by Mia</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.merrybymia.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.merrybymia.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:merrybymia@gmail.com" className="text-amber-600 hover:text-amber-800">merrybymia@gmail.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:9145956526" className="text-amber-600 hover:text-amber-800">(914) 595-6526</a></li>
            </ul>
          </div>
          
          {/* Modern Kicks */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Modern Kicks</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.modern-kicks.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.modern-kicks.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:bethany@modern-kicks.com" className="text-amber-600 hover:text-amber-800">bethany@modern-kicks.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:6173088240" className="text-amber-600 hover:text-amber-800">(617) 308-8240</a></li>
            </ul>
          </div>
          
          {/* Rogan & Co Events */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Rogan & Co Events</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.roganandcoevents.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.roganandcoevents.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:stacey@roganandcoevents.com" className="text-amber-600 hover:text-amber-800">stacey@roganandcoevents.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8452641867" className="text-amber-600 hover:text-amber-800">(845) 264-1867</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Cake & Dessert Vendors</h3>
        <p className="mb-4">
          For special treats at your associated events, we recommend these local vendors:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Lulu Cakes */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Lulu Cakes</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.everythinglulu.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.everythinglulu.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:cake@everythinglulu.com" className="text-amber-600 hover:text-amber-800">cake@everythinglulu.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:9147228300" className="text-amber-600 hover:text-amber-800">(914) 722-8300</a></li>
            </ul>
          </div>
          
          {/* Custom Cakes by Anne Marie */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Custom Cakes by Anne Marie</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.customcakesbyannmarie.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.customcakesbyannmarie.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:sweets@customcakesbyannmarie.com" className="text-amber-600 hover:text-amber-800">sweets@customcakesbyannmarie.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8452338641" className="text-amber-600 hover:text-amber-800">(845) 233-8641</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Important Notes</h3>
        <ul className="list-disc pl-5 space-y-2 text-darkBrown mb-4">
          <li>Associated events are subject to availability</li>
          <li>The 10% discount applies to the wedding site fee only</li>
          <li>Minimum spend requirements may apply for certain events</li>
          <li>Food and beverage minimums vary by day of the week and season</li>
          <li>All events require a deposit to secure the date</li>
        </ul>
        
        <p className="mt-4">
          To book an associated event or to learn more about our special offer, please contact our events coordinator at{' '}
          <a href="mailto:events@mileaestatevineyard.com" className="text-amber-600 hover:text-amber-800">
            events@mileaestatevineyard.com
          </a>{' '}
          or call{' '}
          <a href="tel:8453922422" className="text-amber-600 hover:text-amber-800">
            (845) 392-2422
          </a>
          .
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/weddings/associated-events"
          className="button button-primary"
        >
          Take the Associated Events Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="Associated Events" fallbackContent={fallbackContent} contentId="associated-events" />;
}

export default AssociatedEvents; 