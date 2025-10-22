import { IndustryData } from '../../types/industry';

export const MARINE_DATA: IndustryData = {
  id: 'marine',
  xrays: [
    {
      id: 'marine-xray-1',
      preSrc: '/img/marine/pre-Marine_Boat.png',
      postSrc: '/img/marine/post-Marine_Exploded_Boat_Graphic.png',
      svgOverlay: '/img/marine/overlay-marine-overlay.svg',
      width: 259.2,
      height: 259.2,
      hotspots: [
        {
          id: 'seating',
          points: [97, 117], // Center point for numbering
          product: {
            sku: 'MC722',
            name: 'MC722 – WEB SPRAY NON-FLAM/NON-METHYLENE CHLORIDE CONTACT ADHESIVE',
            blurb: 'MC722 Marine Seating Installation System',
            url: '/product/mc722/',
            thumb: '/product-images/mc722.png',
          },
        },
        {
          id: 'carpeting',
          points: [35, 155], // Center point for numbering
          product: {
            sku: 'M-OS764',
            name: 'M-OS764 – ULTRA HIGH-STRENGTH HYBRID POLYMER STRUCTURAL ADHESIVE',
            blurb: 'M-OS764 Marine Carpet Bonding System',
            url: '/product/m-os764/',
            thumb: '/product-images/m-os764.png',
          },
        },
        {
          id: 'lowerbow',
          points: [78, 155], // Center point for numbering
          product: {
            sku: 'M-OA755',
            name: 'M-OA755 – HIGH-STRENGTH SINGLE-PART HYBRID POLYMER ADHESIVE/SEALANT',
            blurb: 'M-OA755 Bow Assembly Structural Bonding',
            url: '/product/m-oa755/',
            thumb: '/product-images/m-oa755.png',
          },
        },
        {
          id: 'counters',
          points: [121, 110], // Center point for numbering
          product: {
            sku: 'MC723',
            name: 'MC723 – WEB SPRAY HIGH TACK INFUSION MOLDING ADHESIVE',
            blurb: 'MC723 Marine Counter Installation System',
            url: '/product/mc723/',
            thumb: '/product-images/mc723.png',
          },
        },
        {
          id: 'heeadliner',
          points: [127, 91], // Center point for numbering
          product: {
            sku: 'TAC-734G',
            name: 'TAC-734G – WEB SPRAY HIGH TACK INFUSION MOLDING ADHESIVE',
            blurb: 'TAC-734G Headliner Mounting System',
            url: '/product/tac-734g/',
            thumb: '/product-images/tac-734g.png',
          },
        },
        {
          id: 'headdliner2',
          points: [162, 96], // Center point for numbering
          product: {
            sku: 'TAC-735R',
            name: 'TAC-735R Mist Spray No Haps Infusion Molding Adhesive',
            blurb: 'TAC-735R Additional Ceiling Support System',
            url: '/product/tac-735r/',
            thumb: '/product-images/tac-735r.png',
          },
        },
        {
          id: 'bondingskirt',
          points: [134, 115], // Center point for numbering
          product: {
            sku: 'M-C285',
            name: 'M-C285 Premium High-Temp Neoprene Contact Adhesive',
            blurb: 'M-C285 Hull-to-Deck Bonding System',
            url: '/product/m-c285/',
            thumb: '/product-images/m-c285.png',
          },
        },
        {
          id: 'general_mounting',
          points: [135, 108], // Center point for numbering
          product: {
            sku: 'M-T820',
            name: 'M-T820 Double-Coated Ultra High Bond Acrylic Foam Tape',
            blurb: 'M-T820 Multi-Purpose Marine Mounting System',
            url: '/product/m-t820/',
            thumb: '/product-images/m-t820.png',
          },
        },
        {
          id: 'interior_cabinets',
          points: [131, 140], // Center point for numbering
          product: {
            sku: 'TAC-739R',
            name: 'TAC-739R Mist Spray Infusion Molding Adhesive',
            blurb: 'TAC-739R Marine Interior Cabinet Adhesive System',
            url: '/product/tac-739r/',
            thumb: '/product-images/tac-739r.png',
          },
        },
        {
          id: 'external_seating',
          points: [185, 125], // Center point for numbering
          product: {
            sku: 'M-OS789',
            name: 'M-OS789 Multi-Purpose Hybrid Polymer Sealant',
            blurb: 'M-OS789 Weather-Resistant External Seating Adhesive',
            url: '/product/m-os789/',
            thumb: '/product-images/m-os789.png',
          },
        },
        {
          id: 'bonding_and_mounut_1',
          points: [208, 130], // Center point for numbering
          product: {
            sku: 'M-R445',
            name: 'M-R445 Two-Part Modified Epoxy Adhesive',
            blurb: 'M-R445 Heavy-Duty Marine Bonding Solution',
            url: '/product/m-r445/',
            thumb: '/product-images/m-r445.png',
          },
        },
        {
          id: 'bonding_and_mount2',
          points: [235, 135], // Center point for numbering
          product: {
            sku: 'M-R478',
            name: 'M-R478 Two-Part Methacrylate Adhesive',
            blurb: 'M-R478 Reinforcement Bonding Solution',
            url: '/product/m-r478/',
            thumb: '/product-images/m-r478.png',
          },
        },
        {
          id: 'navigation_mount',
          points: [210, 90], // Navigation equipment area
          product: {
            sku: 'TAC-738R',
            name: 'TAC-738R Web Spray Zero VOC Infusion Molding Adhesive',
            blurb: 'TAC-738R Electronics Mounting Adhesive System',
            url: '/product/tac-738r/',
            thumb: '/product-images/tac-738r.png',
          },
        },
        {
          id: 'hull_construction_info',
          points: [95, 145], // Hull construction area
          experience: {
            title: 'Hull Construction',
            description: 'The hull is constructed using advanced composite materials bonded with marine-grade adhesives. This ensures maximum strength and durability in harsh marine environments.',
            icon: '🏗️',
          },
        },
        {
          id: 'safety_features_info',
          points: [175, 100], // Safety equipment area
          experience: {
            title: 'Safety Features',
            description: 'Critical safety components are secured using specialized mounting systems that withstand vibration, moisture, and extreme temperature variations.',
            icon: '🛡️',
          },
        },
      ],
    },
    {
      id: 'marine-xray-2',
      preSrc: '/img/marine/pre-Pontoon_Boat__1_.png',
      postSrc: '/img/marine/post-Pontoon_Boat_Exploded_Graphic__1_.jpg',
      svgOverlay: '/img/marine/overlay-Marine Pontoon2 SVG.svg',
      width: 233.403,
      height: 191.162,
      hotspots: [
        {
          id: 'Upholstery_Applications',
          points: [513, 250],
          product: {
            sku: 'MC722',
            name: 'MC722 – WEB SPRAY NON-FLAM/NON-METHYLENE CHLORIDE CONTACT ADHESIVE',
            blurb: 'MC722 Upholstery Adhesive',
            url: '/product/mc722/',
            thumb: '/product-images/mc722.png',
          },
        },
        {
          id: 'Upholstery_Applications-2',
          points: [281, 306],
          product: {
            sku: 'MC723',
            name: 'MC723 – WEB SPRAY HIGH TACK INFUSION MOLDING ADHESIVE',
            blurb: 'MC723 Upholstery Adhesive',
            url: '/product/mc723/',
            thumb: '/product-images/mc723.png',
          },
        },
        {
          id: 'Neoprene_Contact_Adhesive',
          points: [374, 419],
          product: {
            sku: 'M-C285',
            name: 'M-C285 Premium High-Temp Neoprene Contact Adhesive',
            blurb: 'M-C285 Neoprene Contact Adhesive',
            url: '/product/m-c285/',
            thumb: '/product-images/m-c285.png',
          },
        },
        {
          id: 'Bonding_Decking_to_Metal_Struts',
          points: [605, 702],
          product: {
            sku: 'TAC-734G',
            name: 'TAC-734G Web Spray High Tack Infusion Molding Adhesive',
            blurb: 'TAC-734G Deck Bonding System',
            url: '/product/tac-734g/',
            thumb: '/product-images/tac-734g.png',
          },
        },
        {
          id: 'Bonding_Decking_to_Metal_Struts-2',
          points: [559, 984],
          product: {
            sku: 'M-OS789',
            name: 'M-OS789 Multi-Purpose Hybrid Polymer Sealant',
            blurb: 'M-OS789 Deck Bonding System',
            url: '/product/m-os789/',
            thumb: '/product-images/m-os789.png',
          },
        },
        {
          id: 'Bonding_in_Stiffeners',
          points: [883, 645],
          product: {
            sku: 'M-OS764',
            name: 'M-OS764 Ultra High-Strength Hybrid Polymer Structural Adhesive',
            blurb: 'M-OS764 Ultra High-Strength Hybrid Polymer Structural Adhesive',
            url: '/product/m-os764-ultra-high-strength-hybrid-polymer-structural-adhesive/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/AP749_M-OS764_Sausage_NEW.png',
          },
        },
        {
          id: 'Bonding_in_Stiffeners-2',
          points: [655, 529],
          product: {
            sku: 'M-R478',
            name: 'M-R478 Two-Part Methacrylate Adhesive',
            blurb: 'M-R478 Two-Part Methacrylate Adhesive',
            url: '/product/m-r478-two-part-methacrylate-adhesive/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-R478-NEW.png',
          },
        },
        {
          id: 'Bonding_in_Stiffeners-3',
          points: [748, 712],
          product: {
            sku: 'M-R445',
            name: 'M-R445 Two-Part Modified Epoxy Adhesive',
            blurb: 'M-R445 Two-Part Modified Epoxy Adhesive',
            url: '/product/m-r445-two-part-modified-epoxy-adhesive/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-R445-NEW.png',
          },
        },
        {
          id: 'Binding_Vinyls_and_Carpets',
          points: [744, 871],
          product: {
            sku: 'MC723',
            name: 'MC723 Web Spray CA Compliant Multi-Purpose Contact Adhesive',
            blurb: 'MC723 Web Spray CA Compliant Multi-Purpose Contact Adhesive',
            url: '/product/mc723-web-spray-ca-compliant-multi-purpose-contact-adhesive/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/06/MC723-bundle-New.png',
          },
        },
        {
          id: 'Binding_Vinyls_and_Carpets-2',
          points: [975, 758],
          product: {
            sku: 'MC722',
            name: 'MC722 Web Spray Non-Flammable / Non-Mrthylene Chloride Contact Adhesive',
            blurb: 'MC722 Web Spray Non-Flammable / Non-Mrthylene Chloride Contact Adhesive',
            url: '/product/mc722-web-spray-contact-adhesive-for-infusion-molding/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/03/MC722-single.png',
          },
        },
        {
          id: 'pontoon_construction_info',
          points: [540, 540], // Center of pontoon structure
          experience: {
            title: 'Pontoon Construction',
            description: 'Pontoon boats feature a unique construction with multiple pontoons providing stability and buoyancy. Each component is carefully bonded using marine-grade adhesives.',
            icon: '🚤',
          },
        },
        {
          id: 'deck_assembly_info',
          points: [720, 720], // Deck assembly area
          experience: {
            title: 'Deck Assembly',
            description: 'The deck is assembled using specialized bonding techniques that ensure water resistance and structural integrity in marine environments.',
            icon: '🛥️',
          },
        },
      ],
    },
  ],
};