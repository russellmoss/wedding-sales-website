import React from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from './ContentTemplate';
import Highlights from '../shared/Highlights';

function FoodAndWine() {
  const fallbackContent = (
    <div className="space-y-8">
      <div className="text-gray-700">
        <p className="mb-4">
          Milea Estate has garnered a plethora of accolades since opening its doors in 2019. This has included winning "Best Winery in the Hudson Valley" twice, as well as "Best Food at a Winery in the Hudson Valley". Milea's wines have been named "hidden gems" by Wine Enthusiast and received multiple 90+ points from both Wine Enthusiast and Decanter Magazines. The Milea Rosé has been named "Best Rosé in the Hudson Valley" and has quickly found its home at many bars, restaurants and retailers in the region.
        </p>
        <p className="mb-4">
          Milea is the perfect place to create a memorable Hudson Valley wine and food experience for your guests.
        </p>
      </div>

      <Highlights title="Award-Winning Culinary Experience">
        <ul className="list-disc pl-5 space-y-2">
          <li>Twice named "Best Winery in the Hudson Valley"</li>
          <li>Recognized for "Best Food at a Winery in the Hudson Valley"</li>
          <li>Wines named "hidden gems" by Wine Enthusiast</li>
          <li>Multiple 90+ points from Wine Enthusiast and Decanter Magazines</li>
          <li>Milea Rosé named "Best Rosé in the Hudson Valley"</li>
          <li>Customizable wedding catering packages</li>
          <li>Dedicated culinary team committed to excellence</li>
          <li>Local Hudson Valley ingredients in culinary offerings</li>
        </ul>
      </Highlights>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Our Culinary Philosophy</h3>
        <p className="mb-4">
          Our dedicated culinary team is committed to crafting an unforgettable dining experience that complements the magic of your special day.
        </p>
        <p className="mb-4">
          Immerse your guests in a symphony of flavors, from beautifully presented appetizers to decadent desserts. Our customizable wedding catering packages allow you to curate a menu that reflects your unique taste and style.
        </p>
        <p className="mb-4">
          Whether you envision a gourmet sit-down dinner, a trendy food station setup, or a delightful buffet, we bring culinary excellence to the heart of your celebration.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Dining Packages</h3>
        <p className="mb-4">
          Our dining packages, named after our wine clubs, are customized to your needs and pricing is based upon your unique selections.
        </p>
        <p className="mb-6 font-semibold">
          Typically, our catering options range from <span className="text-darkBrown">$185 - $250 per person</span>.
        </p>

        <div className="mb-8">
          <h4 className="text-lg font-gilda text-darkBrown mb-4">Package Options</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Option 1 - The Paddock */}
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
              <h5 className="font-semibold text-darkBrown text-lg mb-3">OPTION 1 - THE PADDOCK</h5>
              <ul className="list-disc pl-5 space-y-2 text-darkBrown">
                <li>1 Salad</li>
                <li>2 Entrées</li>
                <li>2 Sides</li>
                <li>Coffee and Tea</li>
              </ul>
            </div>
            
            {/* Option 2 - The Derby */}
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
              <h5 className="font-semibold text-darkBrown text-lg mb-3">OPTION 2 - THE DERBY</h5>
              <ul className="list-disc pl-5 space-y-2 text-darkBrown">
                <li>1 Salad</li>
                <li>2 Entrées</li>
                <li>2 Sides</li>
                <li>2 Desserts</li>
                <li>Coffee and Tea</li>
              </ul>
            </div>
            
            {/* Option 3 - The Steeplechase */}
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
              <h5 className="font-semibold text-darkBrown text-lg mb-3">OPTION 3 - THE STEEPLECHASE</h5>
              <ul className="list-disc pl-5 space-y-2 text-darkBrown">
                <li>3 Canapés</li>
                <li>1 Salad</li>
                <li>2 Entrées</li>
                <li>2 Sides</li>
                <li>2 Desserts</li>
                <li>Coffee and Tea</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
          <h4 className="text-lg font-gilda text-darkBrown mb-3">Additional Enhancements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="list-disc pl-5 space-y-2 text-darkBrown">
              <li>Plated style service</li>
              <li>Local Cheese & charcuterie station</li>
              <li>Additional Entrée</li>
            </ul>
            <ul className="list-disc pl-5 space-y-2 text-darkBrown">
              <li>Additional Side</li>
              <li>Additional Salad</li>
              <li>Vendor meals</li>
            </ul>
          </div>
          <p className="mt-4 italic text-darkBrown">*25% service fee applied + sales tax*</p>
          <p className="italic text-darkBrown">*Pricing is subject to change*</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Menu Options</h3>
        
        <div className="mb-8">
          <h4 className="text-lg font-gilda text-darkBrown mb-4">Canapé Station</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Seafood Canapés */}
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
              <h5 className="font-semibold text-darkBrown text-lg mb-3">SEAFOOD</h5>
              <ul className="list-disc pl-5 space-y-2 text-darkBrown">
                <li>Smoked Salmon & Cucumber</li>
                <li>Spicy Tuna Tartare <span className="text-amber-600">+$1</span></li>
                <li>Crab Cakes <span className="text-amber-600">+$1</span></li>
                <li>Salmon Rillette Tartlet</li>
                <li>Cod Fritters</li>
                <li>Mini Lobster Rolls <span className="text-amber-600">+$2</span></li>
                <li>Shrimp Cocktail</li>
                <li>Coconut Shrimp</li>
              </ul>
            </div>
            
            {/* Meat Canapés */}
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
              <h5 className="font-semibold text-darkBrown text-lg mb-3">MEAT</h5>
              <ul className="list-disc pl-5 space-y-2 text-darkBrown">
                <li>Chicken Satay</li>
                <li>Korean Fried Chicken</li>
                <li>Wagyu Sliders <span className="text-amber-600">+$2</span></li>
                <li>Pork & Chive Dumplings</li>
                <li>Korean BBQ Skewers</li>
                <li>Wagyu in a Blanket <span className="text-amber-600">+$1</span></li>
              </ul>
            </div>
            
            {/* Vegetarian Canapés */}
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
              <h5 className="font-semibold text-darkBrown text-lg mb-3">VEGETARIAN</h5>
              <ul className="list-disc pl-5 space-y-2 text-darkBrown">
                <li>Vegetable Tartlet</li>
                <li>Vegetable Samosas</li>
                <li>Mini Spring Rolls</li>
                <li>Honey Goat Cheese Tartlet</li>
                <li>Caprese Skewers</li>
                <li>Squash Blossom Tempura <span className="text-amber-600">+$2</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-lg font-gilda text-darkBrown mb-4">Entrées</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Seafood Entrées */}
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
              <h5 className="font-semibold text-darkBrown text-lg mb-3">SEAFOOD</h5>
              <ul className="list-disc pl-5 space-y-2 text-darkBrown">
                <li>Tuscan Garlic Salmon <span className="text-gray-500">(Tomatoes, Kale, Paprika)</span></li>
                <li>Branzino <span className="text-gray-500">(Fennel, Endive, Citrus)</span></li>
                <li>Diver Scallop <span className="text-gray-500">(Cauliflower, Lemon, Capers)</span></li>
                <li>Miso Glazed Cod <span className="text-gray-500">(Sesame, Spinach)</span></li>
                <li>Grilled Octopus <span className="text-gray-500">(Coco Beans, Romesco)</span> <span className="text-amber-600">+$1</span></li>
                <li>Shrimp Scampi <span className="text-gray-500">(Garlic, Herbs)</span></li>
              </ul>
            </div>
            
            {/* Meat Entrées */}
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
              <h5 className="font-semibold text-darkBrown text-lg mb-3">MEAT</h5>
              <ul className="list-disc pl-5 space-y-2 text-darkBrown">
                <li>Herb Roasted Chicken <span className="text-gray-500">(Broccolini, Chimichurri)</span></li>
                <li>Ribeye <span className="text-amber-600">+$3</span>/Strip Loin <span className="text-gray-500">(Whipped Potato)</span></li>
                <li>Korean Style Short Rib <span className="text-gray-500">(Soy Marinade, Onions)</span></li>
                <li>Hudson Valley Duck <span className="text-gray-500">(Bokchoy)</span> <span className="text-amber-600">+$5</span></li>
                <li>Lamb <span className="text-gray-500">(Israeli Couscous)</span> <span className="text-amber-600">+$10</span></li>
              </ul>
            </div>
            
            {/* Vegetarian Entrées */}
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
              <h5 className="font-semibold text-darkBrown text-lg mb-3">VEGETARIAN</h5>
              <ul className="list-disc pl-5 space-y-2 text-darkBrown">
                <li>Butternut Squash Ravioli <span className="text-gray-500">(Pumpkin Seeds, Brown Butter, Sage)</span></li>
                <li>Mushroom Rigatoni <span className="text-gray-500">(Kale, Garlic, Parmesan)</span></li>
                <li>Ratatouille <span className="text-gray-500">(Squash, Zucchini, Eggplant, Bell Peppers, Tomatoes)</span></li>
                <li>Lasagna <span className="text-gray-500">(Tomatoes, Mozzarella, Bechamel)</span></li>
                <li>Japchae (Korean Glass Noodle) <span className="text-gray-500">(Onions, Carrots, Mushrooms, Spinach)</span> <span className="text-amber-600">+$2</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-lg font-gilda text-darkBrown mb-4">Sides</h4>
          
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <ul className="list-disc pl-5 space-y-2 text-darkBrown">
              <li>Fingerling Potatoes <span className="text-gray-500">(Rosemary, Thyme)</span></li>
              <li>Brussels Sprouts <span className="text-gray-500">(Bacon, Honey Butter)</span></li>
              <li>Roasted Butternut Squash <span className="text-gray-500">(Maple, Pumpkin Seeds, Cinnamon)</span></li>
              <li>Roasted Carrots <span className="text-gray-500">(Gremolata, Pecan)</span></li>
              <li>Arancini <span className="text-gray-500">(Marinara, Parmesan)</span></li>
              <li>Grilled Vegetables <span className="text-gray-500">(Zucchini, Yellow Squash, Eggplant, Corn, Marinara)</span></li>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-lg font-gilda text-darkBrown mb-4">Desserts</h4>
          
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <ul className="list-disc pl-5 space-y-2 text-darkBrown">
              <li>Tartlet <span className="text-gray-500">(Chocolate Mousse, Cheesecake or Lemon)</span></li>
              <li>Cookies <span className="text-gray-500">(Chocolate Chip or Oatmeal Raisin)</span></li>
              <li>Fresh Fruits</li>
              <li>Cream Puffs <span className="text-gray-500">(Matcha, Tiramisu, Vanilla or Black Sesame)</span></li>
              <li>Assorted Macarons</li>
              <li>Cupcakes <span className="text-amber-600">+$2</span></li>
            </ul>
            <p className="mt-4 italic text-darkBrown">*Please note that all menu items and pricing are subject to change based on market availability*</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Menu Customization</h3>
        
        <div className="mb-4">
          <h4 className="text-lg font-gilda text-darkBrown mb-2">Can we modify menu options?</h4>
          <p>
            Yes! Our talented culinary team is able to accommodate modifications and requests. If you want a menu inspired by cultural heritage or just your favorite foods, please speak with our events coordinator to see what we can do for you.
          </p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-gilda text-darkBrown mb-2">Do you offer menu tastings?</h4>
          <p>
            Absolutely we do! We encourage you to come in and try our food and wine to help you select your favorites. Dinner menu and wine tastings are for an additional fee and are optional but encouraged.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Additional Information</h3>
        <p className="mb-4">
          Our culinary team works closely with you to create a menu that reflects your vision and dietary requirements. We offer a variety of service styles and can accommodate special requests.
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/weddings/food-and-wine"
          className="button button-primary"
        >
          Take the Food & Wine Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="Food & Wine" fallbackContent={fallbackContent} contentId="food-and-wine" />;
}

export default FoodAndWine; 