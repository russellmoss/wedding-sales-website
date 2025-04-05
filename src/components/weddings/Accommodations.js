import React from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from './ContentTemplate';
import Highlights from '../shared/Highlights';

function Accommodations() {
  const fallbackContent = (
    <div className="space-y-8">
      <div className="text-gray-700">
        <p className="mb-4">
          At Milea Estate Vineyard, we understand that comfortable accommodations are an essential part of your wedding experience. We offer a variety of lodging options to suit your needs and those of your guests.
        </p>
        <p className="mb-4">
          From our historic Staatsburg House to our partner hotels in the Hudson Valley, we've curated the perfect accommodations to complement your special day.
        </p>
      </div>

      <Highlights title="Accommodation Options">
        <ul className="list-disc pl-5 space-y-2">
          <li>Historic Staatsburg House included with wedding booking ($1,500 value)</li>
          <li>Partner hotels with preferential rates for Milea Estate guests</li>
          <li>Group accommodation arrangements for wedding parties</li>
          <li>Convenient transportation services between accommodations and venue</li>
          <li>Onsite parking for up to 120 vehicles</li>
          <li>Additional parking available at our farm across the street</li>
          <li>Perfect location for bridal party preparation</li>
          <li>Ideal retreat after the wedding celebration</li>
        </ul>
      </Highlights>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">The Staatsburg House</h3>
        <p className="mb-4">
          Originally built in 1799, this 3 bedroom, 3 bathroom turn of the century farmhouse has been recently restored to a state of modern luxury with rustic antique touches. It is the perfect respite located across the street from Milea Estate Vineyard.
        </p>
        <p className="mb-4">
          One night's stay <span className="font-semibold">($1,500 value)</span> is included at The Staatsburg House when you book any wedding with Milea Estate Vineyard. It provides a perfect location for a bridal suite as well as a convenient location to retire to immediately after your special day.
        </p>
        
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm mb-6">
          <h4 className="text-lg font-gilda text-darkBrown mb-3">Features</h4>
          <ul className="list-disc pl-5 space-y-2 text-darkBrown">
            <li>3 bedrooms</li>
            <li>3 bathrooms</li>
            <li>Modern luxury with rustic antique touches</li>
            <li>Convenient location across from Milea Estate Vineyard</li>
            <li>Perfect for wedding party preparation</li>
            <li>Ideal retreat after the wedding celebration</li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Lodging Partners</h3>
        <p className="mb-4">
          With a number of local lodging partners, we are sure to have the perfect accommodations for you and your guests at preferential rates for Milea Estate guests.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* The Inn at Bellefield */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">The Inn at Bellefield</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Phone:</span> <a href="tel:8454146750" className="text-amber-600 hover:text-amber-800">(845) 414-6750</a></li>
              <li><span className="font-semibold">Address:</span> 25 Old Vineyard Pl, Hyde Park, NY 12538</li>
              <li className="mt-2">This all-suite, eco-conscious hotel is perfect for visitors planning to stay a night, a weekend, or a few weeks. The spacious suites feature full kitchens, ergonomic workstations, and thoughtfully appointed living spaces. The Inn at Bellefield is designed with bright and nature-inspired spaces.</li>
            </ul>
          </div>
          
          {/* The Beekman Arms */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">The Beekman Arms</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Phone:</span> <a href="tel:8458767077" className="text-amber-600 hover:text-amber-800">(845) 876-7077</a></li>
              <li><span className="font-semibold">Address:</span> 6387 Mill St, Rhinebeck, NY 12572</li>
              <li className="mt-2">Since before the Revolutionary War, the Beekman Arms and Delamater Inn has welcomed guests to the beauty of the Hudson Valley. The property has operated continuously since 1766, retaining much of its colonial charm and character, while offering modern conveniences to guests seeking a historic vacation.</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Group Accommodations</h3>
        <p className="mb-4">
          For wedding parties and events, we can assist with:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-darkBrown mb-4">
          <li>Arranging room blocks at our partner hotels</li>
          <li>Coordinating transportation between accommodations and the venue</li>
          <li>Providing information about the area for out-of-town guests</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Transportation Options</h3>
        <p className="mb-4">
          We can recommend transportation services for guests traveling between accommodations and our venue:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Majestic Transportation Services */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Majestic Transportation Services</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.majesticcarandlimo.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.majesticcarandlimo.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:majestic@mtslimousine.com" className="text-amber-600 hover:text-amber-800">majestic@mtslimousine.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8778118400" className="text-amber-600 hover:text-amber-800">(877) 811-8400</a></li>
            </ul>
          </div>
          
          {/* All Trans */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">All Trans</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.alltrans.net" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.alltrans.net</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:info@alltrans.net" className="text-amber-600 hover:text-amber-800">info@alltrans.net</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8455652306" className="text-amber-600 hover:text-amber-800">(845) 565-2306</a></li>
            </ul>
          </div>
          
          {/* PMV Limousine */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">PMV Limousine</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://pmvlimo.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">pmvlimo.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:mario@pmvlimousine.com" className="text-amber-600 hover:text-amber-800">mario@pmvlimousine.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:9144024481" className="text-amber-600 hover:text-amber-800">(914) 402-4481</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Parking Information</h3>
        <p className="mb-4">
          For guests who prefer to drive:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-darkBrown mb-4">
          <li>Onsite parking - in the parking lot we can host up to 60 cars</li>
          <li>Guests are also welcome to park along our driveway which can host another 60 cars</li>
          <li>Additional parking available at our farm across the street from the vineyard</li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/weddings/accommodations"
          className="button button-primary"
        >
          Take the Accommodations Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="Accommodations" fallbackContent={fallbackContent} contentId="accommodations" />;
}

export default Accommodations; 