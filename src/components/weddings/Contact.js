import React from 'react';
import ContentPage from '../shared/ContentPage';

function Contact() {
  const content = `
# Contact Us

We're excited to help you plan your dream wedding at Milea Estate Vineyard. Here's how you can reach us:

## Contact Information

### Main Office
- Phone: (555) 123-4567
- Email: weddings@mileaestate.com
- Address: 123 Vineyard Road, New Paltz, NY 12561
- Office Hours: Monday-Friday, 9:00 AM - 5:00 PM

### Sales Team
- Sales Manager: Sarah Johnson
  - Phone: (555) 234-5678
  - Email: sarah@mileaestate.com

- Senior Sales Coordinator: Michael Chen
  - Phone: (555) 345-6789
  - Email: michael@mileaestate.com

- Sales Coordinator: Emily Rodriguez
  - Phone: (555) 456-7890
  - Email: emily@mileaestate.com

## Schedule a Tour

### Tour Times
- Monday-Friday: 10:00 AM, 2:00 PM, 4:00 PM
- Saturday: 11:00 AM, 1:00 PM, 3:00 PM
- Sunday: By appointment only

### Tour Process
1. Contact our sales team
2. Select your preferred tour time
3. Confirm your party size
4. Receive tour confirmation
5. Arrive 10 minutes before your scheduled time

## Request Information

### Information Packet
Our wedding information packet includes:
- Detailed venue information
- Wedding packages and pricing
- Available dates
- Preferred vendor list
- Photo gallery
- FAQ

### Request Process
1. Fill out our online form
2. Specify your wedding date range
3. Indicate your guest count
4. Share any specific questions
5. Receive information within 24 hours

## Location & Directions

### Getting Here
- From NYC: 2 hours via I-87
- From Albany: 1.5 hours via I-87
- From Boston: 3.5 hours via I-90

### Parking
- Free parking available
- Valet service for events
- Accessible parking spots
- Vendor parking area

## Social Media

Follow us on social media for wedding inspiration and updates:

- Instagram: @mileaestate
- Facebook: Milea Estate Vineyard
- Pinterest: Milea Estate Weddings
- Twitter: @mileaestate

## Emergency Contact

For urgent matters during events:
- Venue Manager: (555) 567-8901
- Security: (555) 678-9012
- Maintenance: (555) 789-0123

## Feedback

We value your feedback and are committed to providing the best possible experience. Please share your thoughts with us:

- Email: feedback@mileaestate.com
- Online Form: www.mileaestate.com/feedback
- Phone: (555) 890-1234

## Next Steps

Ready to start planning your wedding at Milea Estate Vineyard?

1. Contact our sales team
2. Schedule a venue tour
3. Request information packet
4. Begin your wedding journey with us
  `;

  const previousPage = {
    path: '/weddings/gallery',
    title: 'Photo Gallery'
  };
  const nextPage = {
    path: '/weddings/availability',
    title: 'Availability Calendar'
  };
  const quizLink = '/quizzes/weddings/contact';

  return (
    <ContentPage
      title="Contact Us"
      content={content}
      previousPage={previousPage}
      nextPage={nextPage}
      quizLink={quizLink}
    />
  );
}

export default Contact; 