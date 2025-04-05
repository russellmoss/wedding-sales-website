import React from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from './ContentTemplate';
import Highlights from '../shared/Highlights';

function DrinkPackages() {
  const fallbackContent = (
    <div className="space-y-8">
      <div className="text-gray-700">
        <p className="mb-4">
          Our drink packages feature the finest New York wines, spirits and beers, allowing you to celebrate your special day, the Empire way.
        </p>
        <p className="mb-4">
          All packages include Riedel glassware, ice, non-alcoholic beverages, garnishes, mixers, and professional bartenders to ensure your guests enjoy the perfect pour throughout your celebration.
        </p>
      </div>

      <Highlights title="Award-Winning NY Wines, Spirits, Beers and Non-Alcoholic Offerings">
        <ul className="list-disc pl-5 space-y-2">
          <li>Multiple wines with 90+ points from both Wine Enthusiast and Decanter Magazines</li>
          <li>Wines named "hidden gems" by Wine Enthusiast</li>
          <li>Milea Rosé named "Best Rosé in the Hudson Valley"</li>
          <li>Premium Riedel glassware for all beverages</li>
          <li>Professional bartenders to serve your guests</li>
          <li>Customizable drink packages to suit your preferences</li>
          <li>Non-alcoholic options included in all packages</li>
          <li>Full service bar with a white marble finish included with Clubhouse rental</li>
        </ul>
      </Highlights>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Package Options</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Option 1 - The Basics */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h5 className="font-semibold text-darkBrown text-lg mb-3">OPTION 1 - THE BASICS</h5>
            <p className="text-amber-600 font-semibold mb-3">$45/person</p>
            <ul className="list-disc pl-5 space-y-2 text-darkBrown">
              <li>3 Milea Estate Vineyard Farmhouse collection wines</li>
            </ul>
          </div>
          
          {/* Option 2 - The Trot */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h5 className="font-semibold text-darkBrown text-lg mb-3">OPTION 2 - THE TROT</h5>
            <p className="text-amber-600 font-semibold mb-3">$60/person</p>
            <ul className="list-disc pl-5 space-y-2 text-darkBrown">
              <li>4 Milea Estate Vineyard Farmhouse collection wines</li>
              <li>1 NY State beer</li>
            </ul>
          </div>
          
          {/* Option 3 - The Gallop */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h5 className="font-semibold text-darkBrown text-lg mb-3">OPTION 3 - THE GALLOP</h5>
            <p className="text-amber-600 font-semibold mb-3">$70/person</p>
            <ul className="list-disc pl-5 space-y-2 text-darkBrown">
              <li>5 Milea Estate Vineyard Farmhouse collection wines</li>
              <li>2 NY State beers</li>
              <li>Milea 10 Point Gin</li>
            </ul>
          </div>
          
          {/* Option 4 - The Victory Lap */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h5 className="font-semibold text-darkBrown text-lg mb-3">OPTION 4 - THE VICTORY LAP</h5>
            <p className="text-amber-600 font-semibold mb-3">$80/person</p>
            <ul className="list-disc pl-5 space-y-2 text-darkBrown">
              <li>5 Devotion and/or Farmhouse collection Milea Estate Vineyard wines</li>
              <li>2 NY State beers</li>
              <li>2 pre-batched cocktails</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 shadow-sm mb-6">
          <p className="italic text-darkBrown">*25% service fee applied + sales tax*</p>
          <p className="italic text-darkBrown">*Pricing is subject to change*</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Wine Selection</h3>
        <p className="mb-4">
          Milea Estate Vineyard offers award-winning wines that have received accolades from prestigious publications:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-darkBrown mb-4">
          <li>Multiple wines with 90+ points from both Wine Enthusiast and Decanter Magazines</li>
          <li>Wines named "hidden gems" by Wine Enthusiast</li>
          <li>Milea Rosé named "Best Rosé in the Hudson Valley"</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Additional Information</h3>
        
        <div className="mb-6">
          <h4 className="text-lg font-gilda text-darkBrown mb-2">Bar Setup</h4>
          <ul className="list-disc pl-5 space-y-2 text-darkBrown">
            <li>Full service bar with a white marble finish included with Clubhouse rental</li>
            <li>Mobile bar options available for different venue setups</li>
            <li>Professional bartenders to serve your guests</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-gilda text-darkBrown mb-2">After-Party Options</h4>
          <p className="mb-2">
            We offer after-parties for an additional cost until 1am. Music must be kept at a reduced volume to be mindful of our neighbors.
          </p>
          <p className="italic text-darkBrown">
            The town of Clinton has a noise ordinance of 8pm for any outdoor music. But fear not, you are welcome to keep the party going until 11pm inside.
          </p>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-gilda text-darkBrown mb-2">Non-Alcoholic Options</h4>
          <p>
            Our packages include a selection of non-alcoholic beverages to ensure all guests have enjoyable options.
          </p>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-gilda text-darkBrown mb-2">Customization</h4>
          <p>
            For custom drink options or special requests, please speak with our events coordinator who can discuss possibilities and any associated costs.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/weddings/drink-packages"
          className="button button-primary"
        >
          Take the Drink Packages Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="Drink Packages" fallbackContent={fallbackContent} contentId="drink-packages" />;
}

export default DrinkPackages; 