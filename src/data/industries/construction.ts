import { IndustryData } from '../../types/industry';

export const CONSTRUCTION_DATA: IndustryData = {
  id: 'construction',
  xrays: [
    {
      id: 'construction-commercial-xray',
      preSrc: '/img/construction/Construction Commercial Exterior Graphic (1).png',
      postSrc: '/img/construction/Construction Commercial PostXray.png',
      svgOverlay: '/img/construction/Construction Commercial Exploded Graphic Web.svg',
      width: 2592,
      height: 2592,
      hotspots: [
        {
          id: 'Moisture_Cure_Adhesive',
          points: [241, 87], // Center point for numbering
          product: {
            sku: 'TAC-R777',
            name: 'TAC-R777 Two-Part Modified Epoxy Adhesive',
            blurb: 'TAC-R777 Foundation Bonding Solution',
            url: '/product/tac-r777/',
            thumb: '/product-images/tac-r777.png',
          },
        },
        {
          id: 'Adhesives',
          points: [176, 81], // Center point for numbering
          product: {
            sku: 'TAC-OS74',
            name: 'TAC-OS74 Ultra High-Strength Hybrid Polymer Structural Adhesive',
            blurb: 'TAC-OS74 Structural Bonding System',
            url: '/product/tac-os74/',
            thumb: '/product-images/tac-os74.png',
          },
        },
        {
          id: 'Moisture_Cure_Adhesive-2',
          points: [147, 85], // Center point for numbering
          product: {
            sku: 'TAC-738R',
            name: 'TAC-738R Web Spray Zero VOC Infusion Molding Adhesive',
            blurb: 'TAC-738R Roofing Installation System',
            url: '/product/tac-738r/',
            thumb: '/product-images/tac-738r.png',
          },
        },
        {
          id: 'Tapes',
          points: [62, 91], // Center point for numbering
          product: {
            sku: 'TAC-734G',
            name: 'TAC-734G Web Spray High Tack Infusion Molding Adhesive',
            blurb: 'TAC-734G Insulation Mounting System',
            url: '/product/tac-734g/',
            thumb: '/product-images/tac-734g.png',
          },
        },
        {
          id: 'Tapes-2',
          points: [80, 107], // Center point for numbering
          product: {
            sku: 'TAC-739R',
            name: 'TAC-739R Mist Spray Infusion Molding Adhesive',
            blurb: 'TAC-739R Window Sealing Solution',
            url: '/product/tac-739r/',
            thumb: '/product-images/tac-739r.png',
          },
        },
        {
          id: 'Sealants_Adhesives',
          points: [85, 120], // Center point for numbering
          product: {
            sku: 'TAC-735R',
            name: 'TAC-735R Mist Spray No Haps Infusion Molding Adhesive',
            blurb: 'TAC-735R Door Assembly Bonding',
            url: '/product/tac-735r/',
            thumb: '/product-images/tac-735r.png',
          },
        },
        {
          id: 'Contact_Adhesives',
          points: [143, 161], // Center point for numbering
          product: {
            sku: 'TAC-739R',
            name: 'TAC-739R Mist Spray Infusion Molding Adhesive',
            blurb: 'TAC-739R Commercial Construction Solutions',
            url: '/product/tac-739r/',
            thumb: '/product-images/tac-739r.png',
          },
        },
      ],
    },
    {
      id: 'construction-house-xray',
      preSrc: '/img/construction/Construction House Exterior Graphic Web.png',
      postSrc: '/img/construction/Construction House PostXray.png',
      svgOverlay: '/img/construction/Construction House Exploded Graphic Web.svg',
      width: 259.2,
      height: 259.2,
      hotspots: [
        {
          id: 'Moisture_Cure_Adhesive',
          points: [92, 44], // Center point for numbering
          product: {
            sku: 'TAC-OS74',
            name: 'TAC-OS74 Ultra High-Strength Hybrid Polymer Structural Adhesive',
            blurb: 'TAC-OS74 Foundation Bonding Solution',
            url: '/product/tac-os74/',
            thumb: '/product-images/tac-os74.png',
          },
        },
        {
          id: 'Fixture_Adhesive',
          points: [117, 99], // Center point for numbering
          product: {
            sku: 'TAC-734G',
            name: 'TAC-734G Web Spray High Tack Infusion Molding Adhesive',
            blurb: 'TAC-734G Roofing Installation System',
            url: '/product/tac-734g/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-734G-NEW.png',
          },
        },
        {
          id: 'Sealants_Adhesives',
          points: [106, 112], // Center point for numbering
          product: {
            sku: 'TAC-735R',
            name: 'TAC-735R Mist Spray No Haps Infusion Molding Adhesive',
            blurb: 'TAC-735R Window Sealing Solution',
            url: '/product/tac-735r/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-735R-NEW.png',
          },
        },
        {
          id: 'Structural_Adhesive',
          points: [212, 88], // Center point for numbering
          product: {
            sku: 'TAC-R777',
            name: 'TAC-R777 Two-Part Modified Epoxy Adhesive',
            blurb: 'TAC-R777 Siding Installation System',
            url: '/product/tac-r777/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2025/03/52-GAL-DRUM-TAC-R777.png',
          },
        },
        {
          id: 'Moisture_Cure_Adhesive-2',
          points: [63, 120], // Center point for numbering
          product: {
            sku: 'TAC-739R',
            name: 'TAC-739R Mist Spray Infusion Molding Adhesive',
            blurb: 'TAC-739R Door Assembly Bonding',
            url: '/product/tac-739r/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-739R-NEW.png',
          },
        },
        {
          id: 'Structural_Adhesive-2',
          points: [115, 165], // Center point for numbering
          product: {
            sku: 'TAC-OS74',
            name: 'TAC-OS74 Ultra High-Strength Hybrid Polymer Structural Adhesive',
            blurb: 'TAC-OS74 Utility Installation System',
            url: '/product/tac-os74/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2025/03/sausage-TAC-OS74.png',
          },
        },
      ],
    },
  ],
};