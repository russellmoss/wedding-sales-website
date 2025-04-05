import React from 'react';
import ContentPage from '../shared/ContentPage';

function Availability() {
  const content = `
# Availability Calendar

View our available dates for weddings at Milea Estate Vineyard. We recommend booking 12-18 months in advance for peak season dates.

## Peak Season (May-October)

### May 2024
- Available: May 4, 11, 18, 25
- Booked: May 5, 12, 19, 26

### June 2024
- Available: June 1, 8, 15, 22, 29
- Booked: June 2, 9, 16, 23, 30

### July 2024
- Available: July 6, 13, 20, 27
- Booked: July 7, 14, 21, 28

### August 2024
- Available: August 3, 10, 17, 24, 31
- Booked: August 4, 11, 18, 25

### September 2024
- Available: September 7, 14, 21, 28
- Booked: September 8, 15, 22, 29

### October 2024
- Available: October 5, 12, 19, 26
- Booked: October 6, 13, 20, 27

## Off-Season (November-April)

### November 2024
- Available: November 2, 9, 16, 23, 30
- Booked: November 3, 10, 17, 24

### December 2024
- Available: December 7, 14, 21, 28
- Booked: December 8, 15, 22, 29

### January 2025
- Available: January 4, 11, 18, 25
- Booked: January 5, 12, 19, 26

### February 2025
- Available: February 1, 8, 15, 22
- Booked: February 2, 9, 16, 23

### March 2025
- Available: March 1, 8, 15, 22, 29
- Booked: March 2, 9, 16, 23, 30

### April 2025
- Available: April 5, 12, 19, 26
- Booked: April 6, 13, 20, 27

## Booking Policies

### Minimum Notice
- Peak Season: 12 months advance booking recommended
- Off-Season: 6 months advance booking recommended
- Last-minute bookings may be available

### Deposit Requirements
- 25% of total package price to secure date
- Non-refundable after 14 days
- Remaining balance due according to payment schedule

### Cancellation Policy
- 90+ days before event: 50% refund of deposit
- 60-89 days before event: 25% refund of deposit
- Less than 60 days: No refund

## Venue Capacity

### The Clubhouse
- Maximum Capacity: 200 guests
- Minimum Capacity: No minimum
- Available for all dates

### The Farmhouse
- Maximum Capacity: 50 guests
- Minimum Capacity: No minimum
- Available for all dates

## Seasonal Considerations

### Peak Season (May-October)
- Ideal weather conditions
- Beautiful vineyard views
- Outdoor ceremony options
- Higher demand and pricing

### Off-Season (November-April)
- Indoor ceremony options
- Cozy atmosphere
- Special pricing available
- More date flexibility

## Next Steps

Ready to check your preferred date?

1. Review available dates
2. Contact our sales team
3. Schedule a venue tour
4. Begin your booking process
  `;

  const previousPage = {
    path: '/weddings/contact',
    title: 'Contact Us'
  };
  const nextPage = {
    path: '/weddings/policies',
    title: 'Policies'
  };
  const quizLink = '/quizzes/weddings/availability';

  return (
    <ContentPage
      title="Availability Calendar"
      content={content}
      previousPage={previousPage}
      nextPage={nextPage}
      quizLink={quizLink}
    />
  );
}

export default Availability; 