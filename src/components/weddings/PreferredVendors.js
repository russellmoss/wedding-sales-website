import React from 'react';
import { Link } from 'react-router-dom';
import ContentTemplate from './ContentTemplate';
import { FaCalendarAlt, FaBirthdayCake, FaLightbulb, FaChair, FaRing, FaCar, FaCamera } from 'react-icons/fa';

function PreferredVendors() {
  const fallbackContent = (
    <div className="space-y-8">
      <div className="text-gray-700">
        <p className="mb-4">
          At Milea Estate Vineyard, we've carefully curated a list of preferred vendors who consistently deliver exceptional service and quality for our wedding clients. These vendors are familiar with our venue and understand our standards for excellence.
        </p>
        <p className="mb-4">
          While you're free to work with any vendor of your choice, our preferred vendors have proven track records of success at Milea Estate and can help ensure your special day runs smoothly.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4 flex items-center">
          <FaCalendarAlt className="mr-2 text-amber-600" />
          Event Planners & Coordinators
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
        <div className="flex items-center gap-2 mb-4">
          <FaBirthdayCake className="text-amber-800 text-xl" />
          <h2 className="text-2xl font-serif text-amber-900">Cakes & Desserts</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4 flex items-center">
          <FaLightbulb className="mr-2 text-amber-600" />
          Lighting & Production
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Stortz Lighting */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Stortz Lighting</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.stortzlighting.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.stortzlighting.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:larry@stortzlighting.com" className="text-amber-600 hover:text-amber-800">larry@stortzlighting.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:7182375371" className="text-amber-600 hover:text-amber-800">(718) 237-5371</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4 flex items-center">
          <FaChair className="mr-2 text-amber-600" />
          Rental Companies
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Events Unlimited */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Events Unlimited</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.eventsunlimitedpartyrentals.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.eventsunlimitedpartyrentals.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8338887325" className="text-amber-600 hover:text-amber-800">(833) 888-7325</a></li>
            </ul>
          </div>
          
          {/* Durants Party Rentals */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Durants Party Rentals</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.durantsparty.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.durantsparty.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8452980011" className="text-amber-600 hover:text-amber-800">(845) 298-0011</a></li>
            </ul>
          </div>
          
          {/* North Country Vintage */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">North Country Vintage</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.northcountryvintage.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.northcountryvintage.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:hello@northcountryvintage.com" className="text-amber-600 hover:text-amber-800">hello@northcountryvintage.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8453097832" className="text-amber-600 hover:text-amber-800">(845) 309-7832</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4 flex items-center">
          <FaRing className="mr-2 text-amber-600" />
          Bridal Services
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Lambs Hill Bridal Boutique */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Lambs Hill Bridal Boutique</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.lambshillbridalboutique.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.lambshillbridalboutique.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8457652900" className="text-amber-600 hover:text-amber-800">(845) 765-2900</a></li>
            </ul>
          </div>
          
          {/* Wild Blooms Bridal */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Wild Blooms Bridal</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://wildbloomsbridal.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">wildbloomsbridal.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8452982370" className="text-amber-600 hover:text-amber-800">(845) 298-2370</a></li>
            </ul>
          </div>
          
          {/* Simply Elegant Bridal Beauty */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Simply Elegant Bridal Beauty</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.simplyelegantbridalbeauty.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.simplyelegantbridalbeauty.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:info@simplyelegantbridalbeauty.com" className="text-amber-600 hover:text-amber-800">info@simplyelegantbridalbeauty.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8454757251" className="text-amber-600 hover:text-amber-800">(845) 475-7251</a></li>
            </ul>
          </div>
          
          {/* Bridal by Alexandria */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Bridal by Alexandria</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.bridalbyalexandria.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.bridalbyalexandria.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:bridalbyalexandriainfo@gmail.com" className="text-amber-600 hover:text-amber-800">bridalbyalexandriainfo@gmail.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8455467899" className="text-amber-600 hover:text-amber-800">(845) 546-7899</a></li>
            </ul>
          </div>
          
          {/* Jennifer Victoria Beauty */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Jennifer Victoria Beauty</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.jennifervictoriabeauty.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.jennifervictoriabeauty.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:jennifervictoriabeauty@gmail.com" className="text-amber-600 hover:text-amber-800">jennifervictoriabeauty@gmail.com</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4 flex items-center">
          <FaCar className="mr-2 text-amber-600" />
          Transportation
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
        <h3 className="text-xl font-gilda text-darkBrown mb-4 flex items-center">
          <FaCamera className="mr-2 text-amber-600" />
          Photography & Videography
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Magic Flute Photo & Video */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Magic Flute Photo & Video</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.magicflutephotos.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.magicflutephotos.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:info@magicflutevideos.com" className="text-amber-600 hover:text-amber-800">info@magicflutevideos.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:3472690669" className="text-amber-600 hover:text-amber-800">(347) 269-0669</a></li>
            </ul>
          </div>
          
          {/* Monika Eisenhart */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Monika Eisenhart</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.monikaeisenbart.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.monikaeisenbart.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:monika@monikaeisenbart.com" className="text-amber-600 hover:text-amber-800">monika@monikaeisenbart.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8456419794" className="text-amber-600 hover:text-amber-800">(845) 641-9794</a></li>
            </ul>
          </div>
          
          {/* Edward Dye */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Edward Dye</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.eddyephotography.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.eddyephotography.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:edward@eddyephotography.com" className="text-amber-600 hover:text-amber-800">edward@eddyephotography.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:3472668911" className="text-amber-600 hover:text-amber-800">(347) 266-8911</a></li>
            </ul>
          </div>
          
          {/* Hyde Photography */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Hyde Photography</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.hydephotos.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.hydephotos.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:hello@hydephotos.com" className="text-amber-600 hover:text-amber-800">hello@hydephotos.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8455465059" className="text-amber-600 hover:text-amber-800">(845) 546-5059</a></li>
            </ul>
          </div>
          
          {/* Little But Fierce Photography */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Little But Fierce Photography</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.lbfphoto.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.lbfphoto.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:littlebutfiercephoto@gmail.com" className="text-amber-600 hover:text-amber-800">littlebutfiercephoto@gmail.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:8452142888" className="text-amber-600 hover:text-amber-800">(845) 214-2888</a></li>
            </ul>
          </div>
          
          {/* Anecdote Photography */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-sm">
            <h4 className="text-lg font-gilda text-darkBrown mb-3">Anecdote Photography</h4>
            <ul className="list-none space-y-2 text-darkBrown">
              <li><span className="font-semibold">Website:</span> <a href="http://www.anecdotephoto.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">www.anecdotephoto.com</a></li>
              <li><span className="font-semibold">Email:</span> <a href="mailto:hello@anecdotephoto.com" className="text-amber-600 hover:text-amber-800">hello@anecdotephoto.com</a></li>
              <li><span className="font-semibold">Phone:</span> <a href="tel:6463950033" className="text-amber-600 hover:text-amber-800">(646) 395-0033</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-gilda text-darkBrown mb-4">Additional Information</h3>
        <p className="mb-4">
          Our preferred vendors have been carefully selected based on their expertise, reliability, and ability to deliver exceptional service. They are familiar with our venue and can help ensure a seamless wedding experience.
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/quizzes/weddings/preferred-vendors"
          className="button button-primary"
        >
          Take the Preferred Vendors Quiz
        </Link>
      </div>
    </div>
  );

  return <ContentTemplate title="Preferred Vendors" fallbackContent={fallbackContent} contentId="preferred-vendors" />;
}

export default PreferredVendors; 