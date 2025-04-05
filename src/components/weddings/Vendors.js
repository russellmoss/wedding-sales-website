import React from 'react';
import ContentPage from '../shared/ContentPage';

function Vendors() {
  const content = `
# Preferred Vendors

We've carefully selected these vendors based on their exceptional service, quality, and experience working at Milea Estate Vineyard.

## Catering

### Gourmet Delights
- Specializes in farm-to-table cuisine
- Custom menu creation
- Dietary restriction accommodations
- Contact: (555) 123-4567
- Website: www.gourmetdelights.com

### Elegant Eats
- Full-service catering
- Multiple service styles
- Bar service available
- Contact: (555) 234-5678
- Website: www.eleganteats.com

### Rustic Roots
- Local, seasonal ingredients
- Family-style service
- Vegetarian and vegan options
- Contact: (555) 345-6789
- Website: www.rusticroots.com

## Photography & Videography

### Captured Moments
- Documentary style photography
- Full day coverage
- Engagement sessions
- Contact: (555) 456-7890
- Website: www.capturedmoments.com

### Visual Storytellers
- Cinematic videography
- Drone footage available
- Highlight reels
- Contact: (555) 567-8901
- Website: www.visualstorytellers.com

### Timeless Images
- Traditional and contemporary styles
- Second photographer available
- Wedding albums
- Contact: (555) 678-9012
- Website: www.timelessimages.com

## Floral Design

### Bloom & Beauty
- Custom floral arrangements
- Seasonal selections
- Installation services
- Contact: (555) 789-0123
- Website: www.bloomandbeauty.com

### Garden Dreams
- Organic, garden-style arrangements
- Local flower sourcing
- Boutonnieres and corsages
- Contact: (555) 890-1234
- Website: www.gardendreams.com

### Floral Artistry
- Modern, artistic designs
- Unique installations
- Preservation services
- Contact: (555) 901-2345
- Website: www.floralartistry.com

## Music & Entertainment

### Harmony Events
- Live bands and DJs
- Ceremony musicians
- Sound system rental
- Contact: (555) 012-3456
- Website: www.harmonyevents.com

### Sound Waves
- Professional DJs
- Lighting services
- Photo booth rentals
- Contact: (555) 123-4567
- Website: www.soundwaves.com

### Classical Notes
- String quartets
- Solo musicians
- Custom arrangements
- Contact: (555) 234-5678
- Website: www.classicalnotes.com

## Transportation

### Luxury Rides
- Limousine service
- Party buses
- Vintage car rentals
- Contact: (555) 345-6789
- Website: www.luxuryrides.com

### Elegant Transport
- Shuttle services
- SUV fleet
- Group transportation
- Contact: (555) 456-7890
- Website: www.eleganttransport.com

## Hair & Makeup

### Beauty & Style
- On-site services
- Bridal party packages
- Trial sessions
- Contact: (555) 567-8901
- Website: www.beautyandstyle.com

### Glamour Studio
- Airbrush makeup
- Hair styling
- Group discounts
- Contact: (555) 678-9012
- Website: www.glamourstudio.com

## Additional Services

### Sweet Treats
- Custom cakes
- Dessert bars
- Wedding favors
- Contact: (555) 789-0123
- Website: www.sweettreats.com

### Invitation Design
- Custom stationery
- Save the dates
- Wedding programs
- Contact: (555) 890-1234
- Website: www.invitationdesign.com

### Event Rentals
- Furniture
- Décor items
- Table settings
- Contact: (555) 901-2345
- Website: www.eventrentals.com

## Vendor Policies

### Booking Process
1. Contact vendors directly
2. Schedule consultations
3. Review proposals
4. Sign contracts
5. Pay deposits
6. Schedule planning meetings

### Important Notes
- All vendors must be licensed and insured
- Vendor meals must be provided
- Setup and breakdown times must be coordinated
- Vendors must follow venue policies
- Final vendor list due 30 days before event

## Next Steps

Ready to start working with our preferred vendors?

1. Review vendor websites
2. Schedule consultations
3. Request proposals
4. Book your vendors
  `;

  const previousPage = {
    path: '/weddings/packages',
    title: 'Wedding Packages'
  };
  const nextPage = {
    path: '/weddings/gallery',
    title: 'Photo Gallery'
  };
  const quizLink = '/quizzes/weddings/vendors';

  return (
    <ContentPage
      title="Preferred Vendors"
      content={content}
      previousPage={previousPage}
      nextPage={nextPage}
      quizLink={quizLink}
    />
  );
}

export default Vendors; 