import React from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from './ContentTemplate';
import Highlights from '../shared/Highlights';

function Farmhouse() {
  const fallbackContent = (
    <div className="space-y-8">
      <div className="text-gray-700">
        <p className="mb-4">
          The Farmhouse, our charming Tasting Room, offers cozy indoor seating for up to 50 guests. The outdoor patios accommodate 150 more, perfect for larger gatherings. Inside, the Porch Room seats 25 guests, providing an intimate space within the Farmhouse. A small kitchen is also available, enhancing the venue's convenience and versatility.
        </p>
      </div>

      <Highlights title="Farmhouse Features">
        <ul className="list-disc pl-5 space-y-2">
          <li>1,200 sq ft of cozy indoor space</li>
          <li>Capacity for up to 200 guests total (50 indoor, 150 outdoor)</li>
          <li>Charming Tasting Room (667 sq ft) with rustic ambiance</li>
          <li>Intimate Porch Room (287 sq ft) seating 25 guests</li>
          <li>Spacious outdoor patios (6,300 sq ft) for larger gatherings</li>
          <li>Small kitchen for catering convenience</li>
          <li>Sonos Sound System</li>
          <li>One night stay at Milea accommodation included</li>
          <li>Perfect for intimate weddings and special events</li>
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
                <td className="py-2 px-4 border-b">1,200 sq ft</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Location</td>
                <td className="py-2 px-4 border-b">450 Hollow Rd, Staatsburg, NY 12580</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Capacity</td>
                <td className="py-2 px-4 border-b">200 guests total (50 indoor, 150 outdoor)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Room Areas</h3>
        <p className="mb-2"><strong>Total Area: 1,958 sq ft</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Tasting Room - 667 sq ft</li>
          <li>Porch Room - 287 sq ft</li>
          <li>Patios - 6,300 sq ft</li>
          <li>Shop - 260 sq ft</li>
          <li>Kitchen - 186 sq ft</li>
          <li>Other Rooms - 558 sq ft</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Amenities Included</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>One night stay at Milea accommodation</li>
          <li>Tables & chairs</li>
          <li>Catering Kitchen</li>
          <li>HVAC</li>
          <li>Restrooms</li>
          <li>Outdoor Patio Space</li>
          <li>Sonos Sound System</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Suitable Events</h3>
        <p className="mb-2">The Farmhouse is ideal for:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Intimate weddings</li>
          <li>Rehearsal dinners</li>
          <li>Bridal showers</li>
          <li>Corporate gatherings</li>
          <li>Private wine tastings</li>
          <li>Family celebrations</li>
          <li>Small social events</li>
        </ul>
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
          to="/quizzes/weddings/farmhouse"
          className="button button-primary"
        >
          Take the Farmhouse Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="The Farmhouse" fallbackContent={fallbackContent} contentId="farmhouse" />;
}

export default Farmhouse; 