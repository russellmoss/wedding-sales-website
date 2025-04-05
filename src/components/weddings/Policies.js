import React from 'react';
import ContentPage from '../shared/ContentPage';

function Policies() {
  const content = `
# Venue Policies

Please review our venue policies to ensure a smooth and successful event at Milea Estate Vineyard.

## Booking & Payment

### Deposit Requirements
- 25% of total package price required to secure date
- Deposit is non-refundable after 14 days
- Additional payments due according to payment schedule
- Final payment due 30 days before event

### Payment Schedule
- Classic & Intimate Packages:
  - 25% deposit to secure date
  - 25% due 6 months before event
  - 25% due 3 months before event
  - 25% due 30 days before event

- Premium Package:
  - 30% deposit to secure date
  - 30% due 6 months before event
  - 20% due 3 months before event
  - 20% due 30 days before event

### Cancellation Policy
- 90+ days before event: 50% refund of deposit
- 60-89 days before event: 25% refund of deposit
- Less than 60 days: No refund
- All cancellations must be in writing

## Venue Rules

### Access & Setup
- Setup time included in rental period
- Early access available for additional fee
- All vendors must be approved in advance
- Vendor load-in/out times must be coordinated

### Décor & Setup
- No nails, staples, or tape on walls
- No open flames (except approved candles)
- No confetti or rice
- All décor must be approved in advance
- No helium balloons
- No glitter or sparkles

### Alcohol & Catering
- All alcohol must be served by venue staff
- No outside alcohol permitted
- All food must be prepared by licensed caterers
- Kitchen access available for approved caterers
- Food handling permits required

### Photography & Videography
- Professional photographers must be licensed
- Drone photography requires special permit
- Photo sessions must be scheduled in advance
- Respect privacy of other events

## Safety & Security

### Emergency Procedures
- Emergency exits clearly marked
- First aid kit available
- AED on premises
- Emergency contact numbers provided
- Evacuation plan in place

### Insurance Requirements
- All vendors must provide proof of insurance
- Minimum coverage requirements:
  - General Liability: $1,000,000
  - Workers Compensation: Required
  - Liquor Liability: If serving alcohol

### Security
- Security personnel required for events over 150 guests
- Security provided by venue
- Cost included in Premium Package
- Additional security available for other packages

## Cleanup & Breakdown

### Cleanup Requirements
- All personal items removed
- Décor removed
- Trash disposed of properly
- Furniture returned to original positions
- Floors swept/vacuumed

### Breakdown Schedule
- Breakdown must begin by end time
- All items removed within 2 hours
- Venue must be vacated by specified time
- Overtime charges apply for late departure

## Weather Policy

### Outdoor Events
- Weather backup plan required
- Tent rental recommended
- Indoor alternatives available
- Weather decisions due 48 hours before event

### Rain Policy
- Clubhouse has indoor ceremony space
- Farmhouse has covered areas
- Tents available for rental
- No refunds for weather-related issues

## Additional Policies

### Smoking
- No smoking inside buildings
- Designated smoking areas outside
- Proper disposal required
- No vaping inside buildings

### Pets
- Service animals welcome
- No other pets allowed
- Documentation required for service animals
- Must be leashed at all times

### Noise
- Music must end by 10:00 PM
- Sound level restrictions apply
- Quiet hours for nearby properties
- Amplified music indoors only

## Next Steps

Ready to book your event?

1. Review all policies
2. Contact our sales team
3. Schedule a venue tour
4. Begin your booking process
  `;

  const previousPage = {
    path: '/weddings/availability',
    title: 'Availability Calendar'
  };
  const nextPage = {
    path: '/weddings/faq',
    title: 'FAQ'
  };
  const quizLink = '/quizzes/weddings/policies';

  return (
    <ContentPage
      title="Policies"
      content={content}
      previousPage={previousPage}
      nextPage={nextPage}
      quizLink={quizLink}
    />
  );
}

export default Policies; 