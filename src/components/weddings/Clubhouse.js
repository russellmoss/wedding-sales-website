import React from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from './ContentTemplate';
import Highlights from '../shared/Highlights';

function Clubhouse() {
  const fallbackContent = (
    <div className="space-y-8">
      <div className="text-gray-700">
        <p className="mb-4">
          Perched at the top of the hill, The Clubhouse offers unparalleled views from an easily accessible location. With a capacity to host up to 150 guests, our modern and versatile space provides the perfect backdrop for a variety of events.
        </p>
      </div>

      <Highlights title="Clubhouse Features">
        <ul className="list-disc pl-5 space-y-2">
          <li>6,000 sq ft of versatile event space</li>
          <li>Capacity for up to 150 guests</li>
          <li>Main Hall (1,845 sq ft) with stunning views</li>
          <li>Full-service bar with white marble finish</li>
          <li>Outdoor pergola (1,245 sq ft) with roofing, screens, heaters, and fans</li>
          <li>Grass patio (872 sq ft) for outdoor activities</li>
          <li>Farmhouse style tables & chairs included</li>
          <li>Sonos Sound System</li>
          <li>Dedicated events team of servers, bartenders, and coordinators</li>
          <li>One night stay at Milea accommodation included</li>
        </ul>
      </Highlights>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Specifications</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-amber-100">
                <th className="py-2 px-4 border-b text-left">Feature</th>
                <th className="py-2 px-4 border-b text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Area</td>
                <td className="py-2 px-4 border-b">6,000 sq ft</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Location</td>
                <td className="py-2 px-4 border-b">450 Hollow Rd, Staatsburg, NY 12580</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Capacity</td>
                <td className="py-2 px-4 border-b">150 guests</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Room Areas</h3>
        <p className="mb-2"><strong>Total Area: 6,275 sq ft</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Main Hall - 1,845 sq ft</li>
          <li>Bar - 524 sq ft</li>
          <li>Pergola - 1,245 sq ft</li>
          <li>Grass Patio - 872 sq ft</li>
          <li>Kitchen - 829 sq ft</li>
          <li>Restrooms - 190 sq ft</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Amenities Included</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>One night stay at Milea accommodation</li>
          <li>Farmhouse style tables & chairs</li>
          <li>High top tables</li>
          <li>Mobile bar</li>
          <li>HVAC</li>
          <li>Restrooms</li>
          <li>Outdoor Patio Space</li>
          <li>Catering Kitchen</li>
          <li>Sonos Sound System</li>
          <li>Full service bar with white marble finish</li>
          <li>WIFI</li>
          <li>Lawn games</li>
          <li>Extra tables for gifts, canapés, photos, table assignments</li>
          <li>Flatware, glassware, plates, napkins</li>
          <li>Lounge area with comfy couches and chairs</li>
          <li>Clean up and trash removal</li>
          <li>Dedicated events team of servers, bartenders, events coordinator, kitchen team</li>
          <li>On-site parking</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Additional Features</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use of gas fire pits on pergola</li>
          <li>Photo Booth</li>
          <li>TV rental</li>
          <li>Full property buyout available for complete privacy</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Weather Contingency</h3>
        <p className="mb-4">
          We have you covered with an outdoor pergola that has roofing, screens, heaters, and fans. No matter the weather, the clubhouse can host your entire event inside. Your events team will have a rain plan ready for you if the ceremony or cocktail hour are outside.
        </p>
        <p className="italic">
          Important to note: We do not have tenting or portable heaters. We are happy to provide you with companies who can accommodate these requests for you.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Important Notes</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Wedding ceremonies are permitted in numerous locations on the property in conjunction with a wedding reception only.</li>
          <li>Space rental fees do not include additional rentals, event design or florals.</li>
          <li>The tasting room will remain open for normal business hours.</li>
          <li>Additional fees may apply for an event that requires the tasting room to be closed.</li>
          <li>The rental fee and policy are subject to change without notice.</li>
          <li>NYS Sales Tax will be added.</li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/weddings/clubhouse"
          className="button button-primary"
        >
          Take the Clubhouse Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="The Clubhouse" fallbackContent={fallbackContent} contentId="clubhouse" />;
}

export default Clubhouse; 