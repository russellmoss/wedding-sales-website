import React from 'react';
import ContentPage from '../shared/ContentPage';

function Gallery() {
  const content = `
# Photo Gallery

Welcome to our photo gallery showcasing the beauty and elegance of Milea Estate Vineyard. Browse through our collection of real weddings and events to inspire your special day.

## The Clubhouse

### Ceremony Spaces
- Grand staircase ceremony setup
- Indoor ceremony with floor-to-ceiling windows
- Outdoor ceremony with mountain views
- Garden ceremony setup

### Reception Areas
- Main ballroom with dance floor
- Lounge areas with comfortable seating
- Bar area with craft cocktails
- Outdoor patio reception setup

### Bridal Suite
- Private bridal suite with makeup stations
- Full-length mirrors
- Natural lighting
- Private bathroom

## The Farmhouse

### Intimate Ceremonies
- Front porch ceremony setup
- Garden ceremony area
- Indoor ceremony space
- Rustic altar arrangements

### Reception Spaces
- Main gathering room
- Dining area setup
- Outdoor patio
- Cozy lounge areas

### Getting Ready
- Bridal suite
- Groom's room
- Makeup stations
- Private bathrooms

## Seasonal Highlights

### Spring
- Cherry blossom ceremonies
- Garden weddings
- Spring floral arrangements
- Outdoor receptions

### Summer
- Sunset ceremonies
- Outdoor dining
- Vineyard views
- Evening receptions

### Fall
- Autumn color ceremonies
- Harvest-themed weddings
- Cozy indoor receptions
- Fall floral arrangements

### Winter
- Holiday weddings
- Indoor ceremonies
- Cozy receptions
- Winter wonderland themes

## Wedding Styles

### Classic Elegance
- Traditional ceremonies
- Formal receptions
- Classic floral arrangements
- Timeless décor

### Rustic Charm
- Barn-style setups
- Natural elements
- Vintage décor
- Farm-to-table details

### Modern Minimalist
- Clean lines
- Contemporary décor
- Minimal floral arrangements
- Modern lighting

### Bohemian
- Natural elements
- Eclectic décor
- Wildflower arrangements
- Relaxed atmosphere

## Special Details

### Floral Arrangements
- Centerpieces
- Ceremony arches
- Bouquets
- Boutonnieres

### Tablescapes
- Place settings
- Centerpieces
- Linens
- Table numbers

### Lighting
- String lights
- Uplighting
- Candles
- Chandeliers

### Décor Elements
- Signage
- Welcome displays
- Guest book setups
- Photo displays

## Photo Credits

All photos featured in our gallery are from real weddings and events at Milea Estate Vineyard. Special thanks to our talented photographers:

- Captured Moments Photography
- Visual Storytellers
- Timeless Images Studio

## Next Steps

Inspired by our gallery? Let's start planning your dream wedding:

1. Schedule a venue tour
2. Review our wedding packages
3. Check date availability
4. Contact our sales team
  `;

  const previousPage = {
    path: '/weddings/vendors',
    title: 'Preferred Vendors'
  };
  const nextPage = {
    path: '/weddings/contact',
    title: 'Contact Us'
  };
  const quizLink = '/quizzes/weddings/gallery';

  return (
    <ContentPage
      title="Photo Gallery"
      content={content}
      previousPage={previousPage}
      nextPage={nextPage}
      quizLink={quizLink}
    />
  );
}

export default Gallery; 