import { IndustryData } from '../../types/industry';

export const TRANSPORTATION_DATA: IndustryData = {
  id: 'transportation',
  xrays: [
    {
      id: 'transportation-rv-bus-xray',
      preSrc: '/img/transportation/RV Bus PreX-Ray.png',
      postSrc: '/img/transportation/RV Bus PostX-Ray.jpg',
      svgOverlay: '/img/transportation/RV Bus Exploded.svg',
      width: 259.2,
      height: 259.2,
      hotspots: [
        {
          id: 'Structural_Bonding_of_Floor_to_Frame',
          points: [129, 200], // Center point for numbering
          product: {
            sku: 'TAC-738R',
            name: 'TAC-738R Web Spray Zero VOC Infusion Molding Adhesive',
            blurb: 'TAC-738R RV Structural Bonding Solution',
            url: '/product/tac-738r/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/TAC-738R-bundle-New.png',
          },
        },
        {
          id: 'Window_Bonding',
          points: [129, 80], // Center point for numbering
          product: {
            sku: 'TAC-734G',
            name: 'TAC-734G Web Spray High Tack Infusion Molding Adhesive',
            blurb: 'TAC-734G RV Window Assembly System',
            url: '/product/tac-734g/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-734G-NEW.png',
          },
        },
        {
          id: 'Windshield_Bonding',
          points: [180, 120], // Center point for numbering
          product: {
            sku: 'TAC-735R',
            name: 'TAC-735R Mist Spray No Haps Infusion Molding Adhesive',
            blurb: 'TAC-735R RV Windshield Installation',
            url: '/product/tac-735r/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-735R-NEW.png',
          },
        },
        {
          id: 'Replacing_Mechanical_Fasteners_Riveting_on_Side_Panels',
          points: [200, 150], // Center point for numbering
          product: {
            sku: 'TAC-R777',
            name: 'TAC-R777 Two-Part Modified Epoxy Adhesive',
            blurb: 'TAC-R777 RV Structural Assembly',
            url: '/product/tac-r777/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2025/03/52-GAL-DRUM-TAC-R777.png',
          },
        },
        {
          id: 'Roof_Sealing',
          points: [160, 180], // Center point for numbering
          product: {
            sku: 'TAC-739R',
            name: 'TAC-739R Mist Spray Infusion Molding Adhesive',
            blurb: 'TAC-739R RV Sealing Solution',
            url: '/product/tac-739r/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-739R-NEW.png',
          },
        },
        {
          id: 'Roof_Sidewall_Bonding',
          points: [140, 160], // Center point for numbering
          product: {
            sku: 'TAC-OS74',
            name: 'TAC-OS74 Ultra High-Strength Hybrid Polymer Structural Adhesive',
            blurb: 'TAC-OS74 RV Component Bonding',
            url: '/product/tac-os74/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2025/03/sausage-TAC-OS74.png',
          },
        },
        {
          id: 'transportation_industry_info',
          points: [130, 130], // Center point for numbering
          experience: {
            title: 'Transportation Industry',
            description: 'Transportation vehicles require advanced bonding solutions that ensure structural integrity, durability, and safety for both commercial and recreational applications.',
            icon: '🚌',
          },
        },
      ],
    },
    {
      id: 'transportation-trailer-xray',
      preSrc: '/img/transportation/Trailer PreX-Ray.png',
      postSrc: '/img/transportation/Trailer PostX-Ray.jpg',
      svgOverlay: '/img/transportation/Trailer Exploded Graphic.svg',
      width: 800,
      height: 600,
      hotspots: [
        {
          id: 'Door_Lamination',
          points: [400, 200], // Center point for numbering
          product: {
            sku: 'TAC-738R',
            name: 'TAC-738R Web Spray Zero VOC Infusion Molding Adhesive',
            blurb: 'TAC-738R Trailer Door Lamination Solution',
            url: '/product/tac-738r/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/TAC-738R-bundle-New.png',
          },
        },
        {
          id: 'Bonding_Side_Skins_to_Trailer',
          points: [350, 250], // Center point for numbering
          product: {
            sku: 'TAC-734G',
            name: 'TAC-734G Web Spray High Tack Infusion Molding Adhesive',
            blurb: 'TAC-734G Trailer Side Skin Assembly System',
            url: '/product/tac-734g/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-734G-NEW.png',
          },
        },
        {
          id: 'Replacing_Mechanical_Fasteners_Riveting_on_Side_Panels',
          points: [450, 300], // Center point for numbering
          product: {
            sku: 'TAC-735R',
            name: 'TAC-735R Mist Spray No Haps Infusion Molding Adhesive',
            blurb: 'TAC-735R Trailer Panel Fastener Replacement',
            url: '/product/tac-735r/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-735R-NEW.png',
          },
        },
        {
          id: 'Roof_Sealing',
          points: [380, 180], // Center point for numbering
          product: {
            sku: 'TAC-R777',
            name: 'TAC-R777 Two-Part Modified Epoxy Adhesive',
            blurb: 'TAC-R777 Trailer Roof Sealing',
            url: '/product/tac-r777/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2025/03/52-GAL-DRUM-TAC-R777.png',
          },
        },
        {
          id: 'Plastic_Laminate_Metal_Laminate',
          points: [320, 220], // Center point for numbering
          product: {
            sku: 'TAC-739R',
            name: 'TAC-739R Mist Spray Infusion Molding Adhesive',
            blurb: 'TAC-739R Trailer Laminate Bonding',
            url: '/product/tac-739r/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-739R-NEW.png',
          },
        },
        {
          id: 'Carpeting_and_Vinyl_on_Walls',
          points: [420, 280], // Center point for numbering
          product: {
            sku: 'TAC-OS74',
            name: 'TAC-OS74 Ultra High-Strength Hybrid Polymer Structural Adhesive',
            blurb: 'TAC-OS74 Trailer Wall Covering',
            url: '/product/tac-os74/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2025/03/sausage-TAC-OS74.png',
          },
        },
      ],
    },
  ],
};