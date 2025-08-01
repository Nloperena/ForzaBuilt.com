import { GenericCardData } from '@/components/StackableCards/GenericCard';
import { getIndustryColors } from '@/styles/brandStandards';

// Marine Industry Cards
export const marineCards: GenericCardData[] = [
  {
    id: 'marine-yacht',
    title: 'Marine Yacht Solutions',
    subtitle: 'Premium adhesive solutions for luxury vessels',
    description: 'Forza stands above the competition by offering unparalleled custom-formulated line of marine solutions that ensure boat and yacht structural integrity, watertight sealing, and surface bonding over the long haul.',
    features: [
      'Ensure boat and yacht structural integrity, watertight sealing, and surface bonding over the long haul',
      'Precisely match our marine customers\' specific and demanding product requirements',
      'Provide cutting-edge chemistries and technologies that over-deliver for mission-critical manufacturing and design requirements',
      'Deliver a wide array of applications',
      'Achieve unparalleled levels of process efficiency and performance'
    ],
    buttonText: 'Learn More',
    buttonLink: '/marine/yacht-solutions',
    imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/05/marine-yacht.png',
    icon: '🚢',
    badge: 'Marine Solutions',
    theme: 'marine',
    layout: 'default'
  },
  {
    id: 'marine-pontoon',
    title: 'Marine Pontoon Solutions',
    subtitle: 'Rugged solutions for pontoon applications',
    description: 'With a full R&D formulations lab at our disposal, we\'re able to deliver tailor-made marine solutions that are rugged enough to meet the most demanding needs of the Marine industry while remaining simple and intuitive for today\'s manufacturing environment.',
    features: [
      'Full R&D formulations lab for custom solutions',
      'Rugged enough for the most demanding marine needs',
      'Simple and intuitive for today\'s manufacturing environment',
      'Committed to exceeding marine customers\' expectations',
      'Tailor-made solutions for pontoon applications'
    ],
    buttonText: 'Learn More',
    buttonLink: '/marine/pontoon-solutions',
    imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/05/marine-pontoon.png',
    icon: '🛥️',
    badge: 'Marine Solutions',
    theme: 'marine',
    layout: 'reversed'
  }
];

// Transportation Industry Cards
export const transportationCards: GenericCardData[] = [
  {
    id: 'transportation-vehicle-integrity',
    title: 'Vehicle Integrity & Performance',
    subtitle: 'Unparalleled custom-formulated transportation solutions',
    description: 'Forza stands above the competition by offering unparalleled custom-formulated solutions that ensure vehicle integrity and watertight sealing over the long haul.',
    features: [
      'Ensure vehicle integrity and watertight sealing over the long haul',
      'Precisely match our transportation customers\' specific and demanding product requirements',
      'Provide cutting-edge chemistries and technologies which achieve critical factors including delivery systems, green strengths, open times, and more',
      'Achieve unparalleled levels of process efficiency and performance'
    ],
    buttonText: 'Explore Solutions',
    buttonLink: '/transportation/vehicle-integrity',
    imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/05/Ford-side-angle-1.png',
    icon: '🚛',
    badge: 'Transportation Solutions',
    theme: 'transportation',
    layout: 'default'
  },
  {
    id: 'transportation-trailer-solutions',
    title: 'Trailer & Transportation Solutions',
    subtitle: 'Rugged solutions for demanding transportation needs',
    description: 'With a full R&D formulations lab at our disposal, we\'re able to deliver tailor-made solutions that are rugged enough to meet the most demanding needs of the trailer & transportation industry while remaining simple and intuitive for today\'s manufacturing environment.',
    features: [
      'Full R&D formulations lab for custom solutions',
      'Rugged solutions for demanding trailer & transportation needs',
      'Simple and intuitive for today\'s manufacturing environment',
      'Custom-formulated for specific transportation requirements',
      'Commitment to exceeding customer expectations'
    ],
    buttonText: 'Learn More',
    buttonLink: '/transportation/trailer-solutions',
    imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/05/trailer-horse.png',
    icon: '🚛',
    badge: 'Transportation Solutions',
    theme: 'transportation',
    layout: 'reversed'
  }
];

// Construction Industry Cards
export const constructionCards: GenericCardData[] = [
  {
    id: 'construction-building-envelope',
    title: 'Building Envelope & Materials',
    subtitle: 'Comprehensive bonding and sealing solutions',
    description: 'Forza offers an ideal custom-formulated line of construction-related bonding, sealing, and adhering chemistries and applications to drive construction project success over the long haul.',
    features: [
      'Insulation installation for Building Envelope and HVAC/Pipe Wrapping',
      'Concrete applications including Tilt-Up, Precast, Crack Repair, Gap Fill & Seal',
      'Interior and Below Grade Exterior Waterproofing',
      'Structural Fixturing Applications where epoxy adhesives replace mechanical anchors',
      'Wide range of materials: fiberglass, foam, MDF, rubber, wood, plastic, metal, concrete'
    ],
    buttonText: 'Explore Solutions',
    buttonLink: '/construction/building-envelope',
    imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-House-Construction.jpg',
    icon: '🏗️',
    badge: 'Construction',
    theme: 'construction',
    layout: 'default'
  },
  {
    id: 'construction-custom-formulations',
    title: 'Custom Formulations & R&D',
    subtitle: 'Tailor-made solutions for demanding construction needs',
    description: 'With a full R&D formulations lab at our disposal, a global vendor network, and US-based manufacturing and packaging, we\'re able to deliver tailor-made solutions that are rugged enough to meet the most demanding and delicate needs of the construction industry.',
    features: [
      'Full R&D formulations lab for custom solutions',
      'Global vendor network for comprehensive material access',
      'US-based manufacturing and packaging capabilities',
      'Rugged solutions for demanding construction environments',
      'Intuitive and easy-to-implement in today\'s construction environment'
    ],
    buttonText: 'Learn More',
    buttonLink: '/construction/custom-formulations',
    imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-Construction-2-scaled.jpeg',
    icon: '🔬',
    badge: 'Construction',
    theme: 'construction',
    layout: 'reversed'
  }
];

// Industrial Industry Cards
export const industrialCards: GenericCardData[] = [
  {
    id: 'industrial-general-adhesives',
    title: 'General Adhesive Technologies',
    subtitle: 'Comprehensive solutions for general industries',
    description: 'Forza has a comprehensive line of General Adhesive technologies and chemistry solutions that are ideal for numerous general industries and applications. Our product solutions include canister systems, aerosols, spray adhesives, structural adhesives and sealants (including single-part adhesives and 2-part epoxies), and specialty adhesives & tapes.',
    features: [
      'Canister Systems, Aerosols, Spray Adhesives',
      'Structural Adhesives and Sealants (single-part, 2-Part epoxies)',
      'Specialty Adhesives & Tapes',
      'Deliver the highest performance possible',
      'Precisely match our general industry customers’ needs',
      'Cutting-edge chemistries and technologies (green strengths, open times, and more)'
    ],
    buttonText: 'Explore Solutions',
    buttonLink: '/industrial/general-adhesives',
    imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-General-Industries-2-2048x1365.jpeg',
    icon: '⚙️',
    badge: 'Industrial',
    theme: 'industrial',
    layout: 'default'
  },
  {
    id: 'industrial-applications',
    title: 'Industrial Applications',
    subtitle: 'Tailor-made solutions for unique industry needs',
    description: 'With a full R&D formulations lab at our disposal, a global vendor network, and US-based manufacturing and packaging, we’re able to deliver tailor-made solutions that are robust enough and specific enough to meet the most demanding and unique needs of our general industry customers, while remaining simple and intuitive for today’s various manufacturing environments. Our solutions are ideal for ductwork, acoustical ceiling panels, office partitions, moveable walls, SIPs, soundproof booths, flooring, office furniture, general furniture, commercial cabinetry, glass walls, glassboard, and windows.',
    features: [
      'Ductwork, Acoustical Ceiling Panels',
      'Office Partitions, Moveable Walls, SIPs, Soundproof booths, Flooring',
      'Office Furniture, General Furniture, Commercial Cabinetry',
      'Glass Walls, Glassboard, and Windows',
      'Tailor-made for unique industry needs',
      'Exceeding customer expectations with every solution'
    ],
    buttonText: 'Learn More',
    buttonLink: '/industrial/applications',
    imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-General-Industries-image-1-2048x1366.jpg',
    icon: '⚙️',
    badge: 'Industrial',
    theme: 'industrial',
    layout: 'reversed'
  }
];

// Foam Industry Cards
// export const foamCards: GenericCardData[] = [
//   {
//     id: 'foam-manufacturing',
//     title: 'Foam Manufacturing Solutions',
//     subtitle: 'Complete line of foam-optimized adhesive solutions',
//     description: 'Forza has a complete line of foam-optimized adhesive solutions. Our range of chemistries and performance-enhancing technologies deliver superior adhesive, sealing, and bonding outcomes for foam-related applications.',
//     features: [
//       'Mattress Manufacturing',
//       'Seating & Upholstery',
//       'General Foam Manufacturing',
//       'Foam Packaging',
//       'Numerous other applications'
//     ],
//     buttonText: 'Explore Solutions',
//     buttonLink: '/foam/manufacturing',
//     imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-Foam-2-scaled.jpeg',
//     icon: '🧽',
//     badge: 'Foam Solutions',
//     theme: 'foam',
//     layout: 'default'
//   },
//   {
//     id: 'foam-bonding-technologies',
//     title: 'Advanced Bonding Technologies',
//     subtitle: 'Long-lasting foam bonding to many surfaces',
//     description: 'With a full R&D formulations lab at our disposal, a global vendor network, and US-based manufacturing and packaging, we\'re able to deliver tailor-made solutions that are rugged enough and specialized enough to meet the most demanding and specific needs of the numerous Foam manufacturing situations, while remaining simple and intuitive for today\'s manufacturing environments.',
//     features: [
//       'Foam to Foam bonding',
//       'Wood to Foam bonding',
//       'Fabric to Foam bonding',
//       'Plastic to Foam bonding',
//       'Metal to Foam bonding'
//     ],
//     buttonText: 'Learn More',
//     buttonLink: '/foam/bonding-technologies',
//     imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-Foam-Products-2-scaled.jpeg',
//     icon: '🧽',
//     badge: 'Foam Solutions',
//     theme: 'foam',
//     layout: 'reversed'
//   }
// ];

// Composites Industry Cards
export const compositesCards: GenericCardData[] = [
  {
    id: 'composites-structural-applications',
    title: 'Structural Applications & Performance',
    subtitle: 'Ultra-high-tech and ultra-high-strength solutions',
    description: 'Forza\'s growing portfolio of ultra-high-tech and ultra-high-strength structural adhesive and bonding solutions, helps deliver project success for the most demanding and delicate composite applications.',
    features: [
      'Ensure turbine, blade and teeth integrity and performance over the life of the unit',
      'Ensure structural rigidity for critical aviation applications',
      'Match high-tech composite customers\' unique, demanding and often delicate product requirements',
      'Provide cutting-edge chemistries and technologies for critical project factors',
      'Achieve high levels of process efficiency and product performance'
    ],
    buttonText: 'Explore Solutions',
    buttonLink: '/composites/structural-applications',
    imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Composite-1-scaled.jpg',
    icon: '✈️',
    badge: 'Composites',
    theme: 'composites',
    layout: 'default'
  },
  {
    id: 'composites-custom-formulations',
    title: 'Custom Formulations & R&D',
    subtitle: 'Tailor-made solutions for high-tech and aviation industries',
    description: 'With a full R&D formulations lab at our disposal, a global vendor network, and US-based manufacturing and packaging, we\'re able to deliver tailor-made solutions that are rugged enough to meet the most demanding and delicate needs of the high-tech and aviation composites industries.',
    features: [
      'Full R&D formulations lab for custom solutions',
      'Global vendor network for comprehensive material access',
      'US-based manufacturing and packaging capabilities',
      'Rugged solutions for demanding high-tech and aviation environments',
      'Intuitive implementation for today\'s demanding manufacturing and repair environment'
    ],
    buttonText: 'Learn More',
    buttonLink: '/composites/custom-formulations',
    imageUrl: 'https://forzabuilt.com/wp-content/uploads/elementor/thumbs/Forza-Built-Compsite-3-Cropped-que8zmnjfjma0xgvnoxmjmjxd8ng36vz9podec5mlc.png',
    icon: '🔬',
    badge: 'Composites',
    theme: 'composites',
    layout: 'reversed'
  }
];

// Insulation Industry Cards
export const insulationCards: GenericCardData[] = [
  {
    id: 'insulation-adhesives',
    title: 'Insulation Adhesive Solutions',
    subtitle: 'Legendary adhesives for insulation applications',
    description: 'Forza’s line of insulation-related adhesives is legendary. With numerous technologies and application solutions, it’s no wonder our customers are happy and their building projects are successful. Our custom-formulated solutions include applications for adhering fabric liners to steel, low-temperature flexible transfer tapes for liner placement, high strength/low-temp tapes for wall insulation, sprayable/brushable non-flammable adhesives, high-tack quick-drying water-based adhesives for laminating insulation to facings, and low-temp PSA foam tapes for thermal blocking.',
    features: [
      'Adhering Fabric Liners to Steel',
      'Low-Temperature, Flexible Transfer Tapes for Liner placement',
      'High Strength, Low-Temperature Tapes for Top of Wall and Wall Insulation placement',
      'Sprayable, Brushable Non-Flammable Adhesives for Wall Insulation placement',
      'High-Tack, Quick-Drying Water-Based Adhesive for Laminating Insulation to Facings',
      'Low Temp PSA Foam Tapes for Thermal Blocking between Purlins and Frames',
      'Deliver the highest performance possible',
      'Precisely match our customers’ needs',
      'Cutting-edge chemistries and technologies (green strengths, open times, and more)'
    ],
    buttonText: 'Explore Solutions',
    buttonLink: '/insulation/adhesives',
    imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-Insulation-1-2048x1365.jpeg',
    icon: '🏡',
    badge: 'Insulation',
    theme: 'insulation',
    layout: 'default'
  },
  {
    id: 'insulation-custom',
    title: 'Custom Insulation Solutions',
    subtitle: 'Tailor-made for demanding insulation needs',
    description: 'With a full R&D formulations lab at our disposal, a global vendor network, and US-based manufacturing and packaging, we’re able to deliver tailor-made solutions that are rugged enough and specialized enough to meet the most demanding and specific needs of the numerous insulation installation situations, while remaining simple and intuitive enough for today’s various industrial environments. At Forza, we’re committed to exceeding our customers’ expectations with every solution we deliver.',
    features: [
      'Custom-formulated for unique insulation needs',
      'Rugged and specialized for demanding installations',
      'Simple and intuitive for modern industrial environments',
      'Exceeding customer expectations with every solution'
    ],
    buttonText: 'Learn More',
    buttonLink: '/insulation/custom',
    imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-Insulation-2-2048x1152.jpeg',
    icon: '🏡',
    badge: 'Insulation',
    theme: 'insulation',
    layout: 'reversed'
  }
];

// Helper function to get cards by industry
export const getCardsByIndustry = (industry: string): GenericCardData[] => {
  switch (industry.toLowerCase()) {
    case 'marine':
      return marineCards;
    case 'transportation':
      return transportationCards;
    case 'construction':
      return constructionCards;
    case 'industrial':
      return industrialCards;
    // case 'foam':
    //   return foamCards;
    case 'composites':
      return compositesCards;
    case 'insulation':
      return insulationCards;
    default:
      return marineCards; // Default fallback
  }
};

// Helper function to get background gradient by industry
export const getBackgroundGradientByIndustry = (industry: string): string => {
  const colors = getIndustryColors(industry);
  
  // Ensure we have valid colors and format them properly
  const primaryColor = colors.primary || '#09668D'; // Default to regal blue
  const secondaryColor = colors.secondary || '#1B3764'; // Default to blue velvet
  
  // Debug logging
  console.log(`Industry: ${industry}`);
  console.log(`Primary: ${primaryColor}`);
  console.log(`Secondary: ${secondaryColor}`);
  console.log(`Gradient: ${primaryColor}, ${secondaryColor}`);
  
  // Return the gradient colors for inline style use
  return `${primaryColor}, ${secondaryColor}`;
}; 