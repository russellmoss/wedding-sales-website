import React from 'react';
import ContentPage from '../shared/ContentPage';

function Packages() {
  const content = `
# Wedding Packages

## The Classic Package

Our most popular package, perfect for couples seeking a traditional wedding experience.

### Included:
- Exclusive use of the Clubhouse
- Up to 200 guests
- 10-hour venue rental
- Tables and chairs
- Basic lighting and sound system
- On-site venue coordinator
- Access to our preferred vendor list
- Basic linens and tableware
- Setup and breakdown

### Pricing:
- Peak Season (May-October): $15,000
- Off-Season (November-April): $12,000

## The Intimate Package

Ideal for smaller, more personal celebrations in our charming Farmhouse.

### Included:
- Exclusive use of the Farmhouse
- Up to 50 guests
- 8-hour venue rental
- Tables and chairs
- Basic lighting and sound system
- On-site venue coordinator
- Access to our preferred vendor list
- Basic linens and tableware
- Setup and breakdown

### Pricing:
- Peak Season (May-October): $8,000
- Off-Season (November-April): $6,000

## The Premium Package

Our most comprehensive package, offering luxury and convenience.

### Included:
- Exclusive use of both Clubhouse and Farmhouse
- Up to 250 guests
- 12-hour venue rental
- Premium tables and chairs
- Advanced lighting and sound system
- Dedicated wedding coordinator
- Access to our preferred vendor list
- Premium linens and tableware
- Setup and breakdown
- Bridal suite access
- Champagne toast for all guests
- Custom bar package
- Valet parking

### Pricing:
- Peak Season (May-October): $25,000
- Off-Season (November-April): $20,000

## Add-On Options

Enhance your package with these additional services:

### Bar Packages
- Basic Bar: $25 per person
- Premium Bar: $35 per person
- Ultra Premium Bar: $45 per person

### Catering Options
- Buffet Service: Starting at $45 per person
- Plated Service: Starting at $65 per person
- Food Stations: Starting at $55 per person

### Additional Services
- Extra Hour of Venue Rental: $1,000
- Valet Parking: $5 per car
- Additional Coordinator: $500
- Custom Lighting: Starting at $1,500
- Photo Booth: $1,000
- Late Night Snacks: Starting at $15 per person

## Payment Schedule

### Classic & Intimate Packages:
- 25% deposit to secure date
- 25% due 6 months before event
- 25% due 3 months before event
- 25% due 30 days before event

### Premium Package:
- 30% deposit to secure date
- 30% due 6 months before event
- 20% due 3 months before event
- 20% due 30 days before event

## Booking Process

1. Schedule a venue tour
2. Review available dates
3. Select your package
4. Sign contract and pay deposit
5. Schedule planning meetings
6. Finalize details
7. Celebrate your special day!

## Next Steps

Ready to start planning your wedding at Milea Estate Vineyard?

1. Schedule a venue tour
2. Review our availability calendar
3. Contact our sales team
4. Begin your wedding journey with us
  `;

  const previousPage = {
    path: '/weddings/faq',
    title: 'FAQ'
  };
  const nextPage = {
    path: '/weddings/vendors',
    title: 'Preferred Vendors'
  };
  const quizLink = '/quizzes/weddings/packages';

  return (
    <ContentPage
      title="Wedding Packages"
      content={content}
      previousPage={previousPage}
      nextPage={nextPage}
      quizLink={quizLink}
    />
  );
}

export default Packages; 