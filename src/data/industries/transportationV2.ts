import { IndustryData } from '../../types/industry';

export const TRANSPORTATION_V2_DATA: IndustryData = {
  id: 'transportation',
  xrays: [
    {
      id: 'transportation-rv-bus-xray-v2',
      preSrc: '', // Not used in V2
      postSrc: '', // Not used in V2
      svgOverlay: '/img/transportation/Trailer Exploded Graphic2.svg', // Single SVG with embedded image
      width: 800,
      height: 600,
      hotspots: [
        {
          id: 'Door_Lamination',
          points: [400, 200], // Center point for numbering
          product: {
            sku: 'TAC-OS74',
            name: 'TAC-OS74 Ultra High-Strength Hybrid Polymer Structural Adhesive',
            blurb: 'TAC-OS74 Trailer Door Lamination Solution',
            url: '/product/tac-os74/',
            thumb: '/product-images/tac-os74.png',
          },
        },
        {
          id: 'Bonding_Side_Skins_to_Trailer',
          points: [350, 250], // Center point for numbering
          product: {
            sku: 'TAC-739R',
            name: 'TAC-739R Mist Spray Infusion Molding Adhesive',
            blurb: 'TAC-739R Trailer Side Skin Assembly System',
            url: '/product/tac-739r/',
            thumb: '/product-images/tac-739r.png',
          },
        },
        {
          id: 'Replacing_Mechanical_Fasteners__x2F__Riveting__x2F__on_Side_Panels',
          points: [450, 300], // Center point for numbering
          product: {
            sku: 'TAC-735R',
            name: 'TAC-735R Mist Spray No Haps Infusion Molding Adhesive',
            blurb: 'TAC-735R Trailer Panel Fastener Replacement',
            url: '/product/tac-735r/',
            thumb: '/product-images/tac-735r.png',
          },
        },
        {
          id: 'Roof_Sealing',
          points: [380, 180], // Center point for numbering
          product: {
            sku: 'TAC-738R',
            name: 'TAC-738R Web Spray Zero VOC Infusion Molding Adhesive',
            blurb: 'TAC-738R Trailer Roof Sealing',
            url: '/product/tac-738r/',
            thumb: '/product-images/tac-738r.png',
          },
        },
        {
          id: 'Plastic_Laminate__x26__Metal_Laminate',
          points: [320, 220], // Center point for numbering
          product: {
            sku: 'TAC-734G',
            name: 'TAC-734G Web Spray High Tack Infusion Molding Adhesive',
            blurb: 'TAC-734G Trailer Laminate Bonding',
            url: '/product/tac-734g/',
            thumb: '/product-images/tac-734g.png',
          },
        },
        {
          id: 'Carpeting_and_Vinyl_on_Walls',
          points: [420, 280], // Center point for numbering
          product: {
            sku: 'TAC-R777',
            name: 'TAC-R777 Two-Part Modified Epoxy Adhesive',
            blurb: 'TAC-R777 Trailer Wall Covering',
            url: '/product/tac-r777/',
            thumb: '/product-images/tac-r777.png',
          },
        },
      ],
    },
  ],
};
