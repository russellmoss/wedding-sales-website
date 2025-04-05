import React from 'react';
import ContentTemplate from './ContentTemplate';

function EventPlanning() {
  const fallbackContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-gilda text-darkBrown mb-4">Event Planning Services</h2>
        <p className="text-gray-700 mb-4">
          At Milea Estate Vineyard, we offer comprehensive event planning services to ensure your wedding day 
          is everything you've dreamed of. Our experienced team will work with you every step of the way to 
          create a seamless and memorable experience.
        </p>
        <p className="text-gray-700 mb-4">
          From the initial consultation to the final details, we're here to guide you through the planning 
          process and help bring your vision to life.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-gilda text-darkBrown mb-2">Planning Services</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Initial consultation and venue tour</li>
            <li>Timeline development</li>
            <li>Vendor coordination</li>
            <li>Layout planning</li>
            <li>Day-of coordination</li>
            <li>Rehearsal dinner planning</li>
          </ul>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-gilda text-darkBrown mb-2">Planning Timeline</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>12-18 months: Initial booking and planning</li>
            <li>9-12 months: Vendor selection and contracts</li>
            <li>6-9 months: Menu tasting and design details</li>
            <li>3-6 months: Timeline and layout finalization</li>
            <li>1-3 months: Final details and coordination</li>
            <li>Week of: Final walkthrough and setup</li>
          </ul>
        </div>
      </div>
    </div>
  );
  
  return <ContentTemplate title="Event Planning" fallbackContent={fallbackContent} />;
}

export default EventPlanning; 