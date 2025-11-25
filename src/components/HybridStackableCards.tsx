import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getIndustryGradient, typography } from '../styles/brandStandards';

// Transportation Images
import TruckStackImage from '@/assets/images/Transportation-stickstackcard-images/Truck Reefer Image.jpg';
import TrailerStackImage from '@/assets/images/Transportation-stickstackcard-images/Trailer Image-3.jpg';
import RvStackImage from '@/assets/images/Transportation-stickstackcard-images/RV Bus-2.jpg';

// Marine Images
import MarineYachtImage from '@/assets/images/Marine-stickstackcard-images/Yacht Boat-2.jpg'; // Replaced marine-yacht.png
import MarinePontoonImage from '@/assets/images/Marine-stickstackcard-images/Pontoon Boat-2.jpg'; // Replaced marine-pontoon.png
import MarineSpeedboatImage from '@/assets/images/Marine-stickstackcard-images/Speedboat image-2.jpg'; // New third card image

// Construction Images
import ConstructionBuildingImage from '@/assets/images/Construction-stickstackcard-images/House Construction-2.jpg';
import ConstructionCustomImage from '@/assets/images/Construction-stickstackcard-images/Tilt-Up Image-2.jpg';
import ConstructionTiltUpImage from '@/assets/images/Construction-stickstackcard-images/Tilt-Up Image-2.jpg';

// Industrial Images
import IndustrialStructuralImage from '@/assets/images/Industrial-stickstackcard-images/general-industries.jpg';
// import IndustrialManufacturingImage from '@/assets/images/Industrial-stickstackcard-images/bonding-adhesive.png'; // Missing, using duplicate

// Composites Images
import CompositesStructuralImage from '@/assets/images/Composites-stickstackcard-images/composite-1.jpg';
import CompositesCustomImage from '@/assets/images/Composites-stickstackcard-images/wind turbines-2.jpg';
import CompositesBoatImage from '@/assets/images/Composites-stickstackcard-images/Boat.jpg';

// Insulation Images
import InsulationAdhesivesImage from '@/assets/images/Insulation-stickstackcard-images/Insulation Image-2.jpg';
import InsulationCustomImage from '@/assets/images/Insulation-stickstackcard-images/insulation-2.jpg';
import InsulationPipeImage from '@/assets/images/Insulation-stickstackcard-images/Pipe Insulation-2.jpg';

// Old color scheme (with darker blue rgb(28, 58, 92))
const cardStyleSheetOld = `
  .card-gradient-marine { background: linear-gradient(to right, rgb(28, 58, 92), rgb(19, 120, 117)); }
  .card-gradient-marine-reverse { background: linear-gradient(to left, rgb(28, 58, 92), rgb(19, 120, 117)); }
  .card-gradient-industrial { background: linear-gradient(to right, rgb(28, 58, 92), rgb(241, 106, 38)); }
  .card-gradient-industrial-reverse { background: linear-gradient(to left, rgb(28, 58, 92), rgb(241, 106, 38)); }
  .card-gradient-transportation { background: linear-gradient(to right, rgb(28, 58, 92), rgb(184, 61, 53)); }
  .card-gradient-transportation-reverse { background: linear-gradient(to left, rgb(28, 58, 92), rgb(184, 61, 53)); }
  .card-gradient-construction { background: linear-gradient(to right, rgb(28, 58, 92), rgb(254, 199, 112)); }
  .card-gradient-construction-reverse { background: linear-gradient(to left, rgb(28, 58, 92), rgb(254, 199, 112)); }
  .card-gradient-composites { background: linear-gradient(to right, rgb(28, 58, 92), rgb(199, 200, 201)); }
  .card-gradient-composites-reverse { background: linear-gradient(to left, rgb(28, 58, 92), rgb(199, 200, 201)); }
  .card-gradient-insulation { background: linear-gradient(to right, rgb(28, 58, 92), rgb(208, 21, 125)); }
  .card-gradient-insulation-reverse { background: linear-gradient(to left, rgb(28, 58, 92), rgb(208, 21, 125)); }
  .card-gradient-foam { background: linear-gradient(to right, rgb(28, 58, 92), rgb(241, 106, 38)); }
  .card-gradient-foam-reverse { background: linear-gradient(to left, rgb(28, 58, 92), rgb(241, 106, 38)); }
`;

// New color scheme (with lighter blue rgb(17, 91, 135))
const cardStyleSheetNew = `
  .card-gradient-marine { background: linear-gradient(to right, rgb(17, 91, 135), rgb(19, 120, 117)); }
  .card-gradient-marine-reverse { background: linear-gradient(to left, rgb(17, 91, 135), rgb(19, 120, 117)); }
  .card-gradient-industrial { background: linear-gradient(to right, rgb(17, 91, 135), rgb(241, 106, 38)); }
  .card-gradient-industrial-reverse { background: linear-gradient(to left, rgb(17, 91, 135), rgb(241, 106, 38)); }
  .card-gradient-transportation { background: linear-gradient(to right, rgb(17, 91, 135), rgb(184, 61, 53)); }
  .card-gradient-transportation-reverse { background: linear-gradient(to left, rgb(17, 91, 135), rgb(184, 61, 53)); }
  .card-gradient-construction { background: linear-gradient(to right, rgb(17, 91, 135), rgb(254, 199, 112)); }
  .card-gradient-construction-reverse { background: linear-gradient(to left, rgb(17, 91, 135), rgb(254, 199, 112)); }
  .card-gradient-composites { background: linear-gradient(to right, rgb(17, 91, 135), rgb(199, 200, 201)); }
  .card-gradient-composites-reverse { background: linear-gradient(to left, rgb(17, 91, 135), rgb(199, 200, 201)); }
  .card-gradient-insulation { background: linear-gradient(to right, rgb(17, 91, 135), rgb(208, 21, 125)); }
  .card-gradient-insulation-reverse { background: linear-gradient(to left, rgb(17, 91, 135), rgb(208, 21, 125)); }
  .card-gradient-foam { background: linear-gradient(to right, rgb(17, 91, 135), rgb(241, 106, 38)); }
  .card-gradient-foam-reverse { background: linear-gradient(to left, rgb(17, 91, 135), rgb(241, 106, 38)); }
`;

interface Card {
  id: string;
  title: string;
  subheading: string;
  description: string;
  listItems: string[];
  color: string;
  image: string;
}

interface HybridStackableCardsProps {
  cards?: Card[];
  industry?: string;
  title?: string;
  subtitle?: string;
  maxCards?: number;
}

const HybridStackableCards: React.FC<HybridStackableCardsProps> = ({ 
  cards = [], 
  industry = 'industrial',
  title,
  subtitle,
  maxCards = 3 
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [containerTop, setContainerTop] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState<number>(typeof window !== 'undefined' ? window.innerHeight : 900);
  const [useOldColorScheme, setUseOldColorScheme] = useState(false);
  const [showHeading, setShowHeading] = useState(false); // Default to heading hidden (new behavior)
  const industryLowerCase = industry.toLowerCase();


  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setViewportHeight(window.innerHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get industry-specific gradient colors for cards
  const getCardGradient = (cardIndex: number) => {
    const industryLower = industry.toLowerCase();
    
    if (cardIndex === 0) {
      return `from-orange-500 to-orange-700`; // First card - always orange for consistency
    } else {
      // Second card - use industry color
      switch (industryLower) {
        case 'marine':
          return `from-[#137875] to-[#137875]`;
        case 'industrial':
          return `from-[#f16a26] to-[#f16a26]`;
        case 'transportation':
          return `from-[#b83d35] to-[#b83d35]`;
        case 'construction':
          return `from-[#fec770] to-[#fec770]`;
        case 'composites':
          return `from-[#c7c8c9] to-[#c7c8c9]`;
        case 'insulation':
          return `from-[#d0157d] to-[#d0157d]`;
        case 'foam':
          return `from-[#f16a26] to-[#f16a26]`;
        default:
          return `from-blue-500 to-blue-700`;
      }
    }
  };

  // Industry-specific card data with real images and consolidated copy
  const getIndustryCards = (): Card[] => {
    const industryLower = industry.toLowerCase();
    
    switch (industryLower) {
      case 'marine':
        return [
          {
            id: 'marine-yacht',
            title: "Marine Yacht Solutions",
            subheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            listItems: [
              "Lorem ipsum dolor sit amet",
              "Consectetur adipiscing elit",
              "Sed do eiusmod tempor",
              "Incididunt ut labore et dolore magna aliqua"
            ],
            color: getCardGradient(0),
            image: MarineYachtImage
          },
          {
            id: 'marine-pontoon',
            title: "Marine Pontoon Solutions",
            subheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            listItems: [
              "Lorem ipsum dolor sit amet",
              "Consectetur adipiscing elit",
              "Sed do eiusmod tempor",
              "Incididunt ut labore et dolore magna aliqua"
            ],
            color: getCardGradient(1),
            image: MarinePontoonImage
          },
          {
            id: 'marine-speedboat',
            title: "Marine Speedboat Solutions",
            subheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            listItems: [
              "Lorem ipsum dolor sit amet",
              "Consectetur adipiscing elit",
              "Sed do eiusmod tempor",
              "Incididunt ut labore et dolore magna aliqua"
            ],
            color: getCardGradient(2),
            image: MarineSpeedboatImage
          }
        ];
        
      case 'transportation':
        return [
          {
            id: 'transportation-purpose-built',
            title: "Purpose-Built",
            subheading: "",
            description: "Every solution starts with your application—built with purpose from the ground up.",
            listItems: [
              "Engineered for real-world use, delivering results the first time and every time.",
              "Tailored to your industry—never one-size-fits-all.",
              "Innovation grounded in chemistry and real-world insight.",
              "Custom, validated solutions delivered fast—no guesswork, no waste."
            ],
            color: getCardGradient(0),
            image: TruckStackImage
          },
          {
            id: 'transportation-performance',
            title: "Performance",
            subheading: "",
            description: "Experience and science powering performance where it matters most.",
            listItems: [
              "Decades of in-field know-how backed by rigorous testing.",
              "Industry-specific formulas built for tough environments.",
              "A complete portfolio that gives you exactly what you need.",
              "Smarter chemistry for faster application and less waste."
            ],
            color: getCardGradient(1),
            image: TrailerStackImage
          },
          {
            id: 'transportation-guaranteed-strength',
            title: "Guaranteed Strength",
            subheading: "",
            description: "Engineered for your toughest applications—with strength you can trust.",
            listItems: [
              "Proven strength validated in-house and in the field.",
              "Built to withstand demanding conditions without compromise.",
              "Made in the USA for consistent, reliable performance.",
              "If it bonds, seals, or sticks, we make it strong—or help you create it."
            ],
            color: getCardGradient(0),
            image: RvStackImage
          }
        ];
        
      case 'construction':
        return [
          {
            id: 'construction-building',
            title: "Building Envelope & Materials",
            subheading: "Comprehensive bonding and sealing solutions",
            description: "Custom-formulated construction bonding, sealing, and adhering chemistries designed to drive construction project success over the long haul.",
            listItems: [
              "Insulation installation & HVAC wrapping",
              "Concrete applications & crack repair",
              "Interior & exterior waterproofing",
              "Wide range of material compatibility"
            ],
            color: getCardGradient(0),
            image: ConstructionBuildingImage
          },
          {
            id: 'construction-custom',
            title: "Custom Formulations & R&D",
            subheading: "Tailor-made construction solutions",
            description: "Full R&D lab capabilities delivering tailor-made solutions rugged enough to meet the most demanding construction needs with US-based manufacturing.",
            listItems: [
              "Full R&D formulations lab",
              "Global vendor network access",
              "US-based manufacturing & packaging",
              "Demanding construction environments"
            ],
            color: getCardGradient(1),
            image: ConstructionCustomImage
          },
          {
            id: 'construction-tiltup',
            title: "Lorem Ipsum Solutions",
            subheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            listItems: [
              "Lorem ipsum dolor sit amet",
              "Consectetur adipiscing elit",
              "Sed do eiusmod tempor",
              "Incididunt ut labore et dolore magna aliqua"
            ],
            color: getCardGradient(2),
            image: ConstructionTiltUpImage
          }
        ];
        
      case 'industrial':
        return [
          {
            id: 'industrial-structural',
            title: "Industrial Structural Adhesives",
            subheading: "High-strength bonding for manufacturing",
            description: "Premium structural adhesives engineered for demanding manufacturing environments with superior bonding strength for metal, plastic, and composite applications.",
            listItems: [
              "High-strength bonding up to 3,500 PSI",
              "Temperature resistance -40°F to +200°F",
              "Chemical resistance to industrial fluids",
              "VOC-compliant workplace safety"
            ],
            color: getCardGradient(0),
            image: IndustrialStructuralImage
          },
          {
            id: 'industrial-manufacturing',
            title: "Manufacturing Adhesive Solutions",
            subheading: "Comprehensive bonding systems",
            description: "Industrial adhesive solutions designed for manufacturing environments, providing reliable bonding for equipment assembly, production lines, and maintenance operations.",
            listItems: [
              "Equipment assembly & machinery bonding",
              "Production line sealing & gasketing",
              "Maintenance & repair applications",
              "Factory automation component bonding"
            ],
            color: getCardGradient(1),
            image: IndustrialStructuralImage // Using duplicate as requested for missing image
          },
          {
            id: 'industrial-placeholder',
            title: "Advanced Industrial Solutions",
            subheading: "Coming soon",
            description: "New industrial adhesive and bonding solutions are in development to meet the evolving needs of modern manufacturing.",
            listItems: [
              "Innovative bonding technologies",
              "Enhanced performance characteristics",
              "Expanded application capabilities",
              "Next-generation industrial solutions"
            ],
            color: getCardGradient(2),
            image: null // Skeleton placeholder will be used
          }
        ];
        
      case 'composites':
        return [
          {
            id: 'composites-structural',
            title: "Structural Applications & Performance",
            subheading: "Ultra-high-tech and ultra-high-strength solutions",
            description: "Growing portfolio of ultra-high-tech structural adhesive solutions that deliver project success for the most demanding composite applications.",
            listItems: [
              "Turbine, blade & teeth integrity",
              "Structural rigidity for aviation",
              "High-tech composite requirements",
              "Cutting-edge chemistries & technologies"
            ],
            color: getCardGradient(0),
            image: CompositesStructuralImage
          },
          {
            id: 'composites-custom',
            title: "Custom Formulations & R&D",
            subheading: "Tailor-made high-tech solutions",
            description: "Full R&D lab capabilities delivering tailor-made solutions rugged enough to meet the most demanding high-tech and aviation composite industry needs.",
            listItems: [
              "Full R&D formulations lab",
              "Global vendor network access",
              "US-based manufacturing capabilities",
              "High-tech & aviation environments"
            ],
            color: getCardGradient(1),
            image: CompositesCustomImage
          },
          {
            id: 'composites-boat',
            title: "Marine Composite Solutions",
            subheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            listItems: [
              "Lorem ipsum dolor sit amet",
              "Consectetur adipiscing elit",
              "Sed do eiusmod tempor",
              "Incididunt ut labore et dolore magna aliqua"
            ],
            color: getCardGradient(2),
            image: CompositesBoatImage
          }
        ];
        
      case 'insulation':
        return [
          {
            id: 'insulation-adhesives',
            title: "Insulation Adhesive Solutions",
            subheading: "Legendary adhesives for insulation applications",
            description: "Legendary line of insulation adhesives with numerous technologies and application solutions for adhering fabric liners, transfer tapes, and thermal blocking.",
            listItems: [
              "Fabric liners to steel bonding",
              "Low-temperature flexible transfer tapes",
              "High-strength wall insulation tapes",
              "Non-flammable sprayable adhesives"
            ],
            color: getCardGradient(0),
            image: InsulationAdhesivesImage
          },
          {
            id: 'insulation-custom',
            title: "Custom Insulation Solutions",
            subheading: "Tailor-made for demanding insulation needs",
            description: "Full R&D lab capabilities delivering specialized solutions rugged enough to meet demanding insulation installation situations while remaining simple and intuitive.",
            listItems: [
              "Custom-formulated unique needs",
              "Rugged specialized installations",
              "Simple modern industrial environments",
              "Exceeding customer expectations"
            ],
            color: getCardGradient(1),
            image: InsulationCustomImage
          },
          {
            id: 'insulation-pipe',
            title: "Lorem Ipsum Solutions",
            subheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            listItems: [
              "Lorem ipsum dolor sit amet",
              "Consectetur adipiscing elit",
              "Sed do eiusmod tempor",
              "Incididunt ut labore et dolore magna aliqua"
            ],
            color: getCardGradient(2),
            image: InsulationPipeImage
          }
        ];
        
      default:
        return [
          {
            id: 'default-1',
            title: "Advanced Adhesive Solutions",
            subheading: "High-Performance Industrial Bonding",
            description: "Our cutting-edge adhesive technologies deliver exceptional strength and durability for demanding industrial applications across multiple industries.",
            listItems: [
              "Superior bond strength",
              "Temperature resistance", 
              "Chemical compatibility",
              "Long-lasting performance"
            ],
            color: getCardGradient(0),
            image: IndustrialStructuralImage
          },
          {
            id: 'default-2',
            title: "Comprehensive Sealing Systems",
            subheading: "Reliable Protection & Performance",
            description: "Professional-grade sealants engineered to provide lasting protection against environmental factors while maintaining structural integrity.",
            listItems: [
              "Weather resistance",
              "Flexible application",
              "Environmental protection",
              "Professional results"
            ],
            color: getCardGradient(1),
            image: IndustrialStructuralImage // Fallback
          }
        ];
    }
  };

  const defaultCards = getIndustryCards();
  const isTransportation = industryLowerCase === 'transportation';

  const cardData = cards.length > 0 ? cards.slice(0, maxCards) : defaultCards.slice(0, maxCards);

  // Default titles based on industry
  const getDefaultTitle = () => {
    if (title) return title;
    
    const industryTitles: Record<string, string> = {
      marine: 'Marine Solutions in Action',
      transportation: 'Purpose-Built, Performance, Guaranteed Strength',
      construction: 'Construction Solutions in Action',
      industrial: 'Industrial Solutions in Action',
      composites: 'Composite Solutions in Action',
      insulation: 'Insulation Solutions in Action'
    };
    
    return industryTitles[industry.toLowerCase()] || 'Our Solutions in Action';
  };

  const getDefaultSubtitle = () => {
    if (subtitle) return subtitle;
    
    const industrySubtitles: Record<string, string> = {
      marine: 'Discover how our advanced marine adhesive, tape, and sealant solutions deliver exceptional performance in demanding maritime environments.',
      transportation: '',
      construction: 'See how our comprehensive construction solutions ensure quality, safety, and efficiency in every project.',
      industrial: 'Learn about our advanced adhesive and bonding solutions designed specifically for industrial manufacturing applications.',
      composites: 'Understand our specialized adhesive and bonding solutions that meet the rigorous requirements of composite material manufacturing.',
      insulation: 'Discover our high-performance bonding solutions for insulation materials, ensuring energy efficiency and long-term performance.'
    };
    
    return industrySubtitles[industry.toLowerCase()] || '';
  };

  const cardDisplayHeight = useMemo(() => {
    // XL Displays - larger cards (increased by ~25%)
    if (viewportHeight >= 1600) return 950;
    if (viewportHeight >= 1440) return 850;
    
    // Standard Desktop (increased by ~25%)
    if (viewportHeight >= 1200) return 750;
    if (viewportHeight >= 1000) return 650;
    
    // Laptops/Tablets (increased by ~25%)
    if (viewportHeight >= 800) return 560;
    if (viewportHeight >= 600) return 480;
    
    // Short displays (450px - 600px) (increased by ~25%)
    if (viewportHeight >= 450) return 350;
    
    // Very short displays (increased by ~25%)
    return 300;
  }, [viewportHeight]);

  const layerSpacing = 0; // Small offset for visibility during transition, but cards stack at same position
  const stackHeight = cardDisplayHeight + layerSpacing + (viewportHeight * 1.8); // Increased scroll distance for readability
  
  // ============================================
  // POSITIONING VARIABLES - Adjust these to control where title + cards sit
  // ============================================
  
  // Estimated height of the title section above the card (pt-12 pb-8 + text)
  const titleHeight = showHeading ? 140 : 0; // pixels - adjust if title is taller/shorter, 0 when hidden
  
  // Total height of the group (title + card)
  const groupHeight = titleHeight + cardDisplayHeight;
  
  // Where to position the CENTER of the group in the viewport (0.5 = middle, 0.4 = higher, 0.6 = lower)
  // When heading is hidden, center the card itself (0.5), otherwise use the original position (0.32)
  const groupCenterPosition = showHeading ? 0.32 : 0.5; // 0.5 = perfectly centered, 0.32 = with heading
  
  // Calculate where the top of the group should be to center the entire group
  const groupCenterY = viewportHeight * groupCenterPosition;
  const groupTopY = groupCenterY - (groupHeight / 2);
  
  // stickyTop is where the sticky container starts (which includes the title)
  const calculatedStickyTop = groupTopY;
  
  // Ensure it doesn't go too high (min 10px from top) or too low
  const stickyTop = Math.max(10, Math.min(viewportHeight - cardDisplayHeight - 20, calculatedStickyTop));
  
  // ============================================

  // Adjust card width/padding based on viewport height for "more negative space" on short displays
  const containerPadding = useMemo(() => {
    if (viewportHeight < 500) return 'px-16 sm:px-20 md:px-28'; // Most padding on very short screens
    if (viewportHeight < 600) return 'px-12 sm:px-16 md:px-24'; // More padding on short screens
    if (viewportHeight < 800) return 'px-8 sm:px-12';
    return 'px-4 sm:px-6 md:px-8'; // Standard padding
  }, [viewportHeight]);

  // Card max-width based on viewport height - wider on short displays
  const cardMaxWidth = useMemo(() => {
    if (viewportHeight < 600) return 1700; // Wider on short screens
    if (viewportHeight < 800) return 1750;
    return 1800; // Standard
  }, [viewportHeight]);

  // Content text scale factor based on viewport height (1 = normal, smaller = reduced)
  const contentScale = useMemo(() => {
    if (viewportHeight < 500) return 0.65;
    if (viewportHeight < 600) return 0.75;
    if (viewportHeight < 800) return 0.85;
    return 1;
  }, [viewportHeight]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Container position calculator
  useEffect(() => {
    const updateContainerPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerTop(rect.top + window.scrollY);
        setIsInitialized(true);
      }
    };

    updateContainerPosition();
    window.addEventListener('resize', updateContainerPosition);
    
    const timers = [
      setTimeout(updateContainerPosition, 100),
      setTimeout(updateContainerPosition, 500),
      setTimeout(updateContainerPosition, 1000)
    ];

    return () => {
      window.removeEventListener('resize', updateContainerPosition);
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Card progress calculator (same as original)
  const getCardProgress = (cardIndex: number) => {
    if (!isInitialized) {
      return { progress: 0, nextCardProgress: 0, isVisible: false };
    }

    const cardStart = containerTop + (cardIndex * stackHeight);
    
    const progress = Math.max(0, Math.min(1, (scrollY - cardStart) / stackHeight));
    const nextCardProgress = Math.max(0, Math.min(1, (scrollY - cardStart - stackHeight) / stackHeight));
    // Cards should stay visible once they've been shown - remove upper bound check
    const isVisible = scrollY >= cardStart - stackHeight * 0.5;
    
    return { progress, nextCardProgress, isVisible };
  };

  const gradientColors = getIndustryGradient(industry);
  const headerTitle = getDefaultTitle();
  const headerSubtitle = getDefaultSubtitle();
  
  // Format title to ensure "Guaranteed Strength" is on its own line
  const formattedTitle = useMemo(() => {
    if (industryLowerCase === 'transportation' && headerTitle.includes('Guaranteed Strength')) {
      return (
        <>
          Purpose-Built, Performance,<br />
          <span className="whitespace-nowrap">Guaranteed Strength</span>
        </>
      );
    }
    return headerTitle;
  }, [headerTitle, industryLowerCase]);

  return (
    <>
      <style>{useOldColorScheme ? cardStyleSheetOld : cardStyleSheetNew}</style>
      {/* Toggle Buttons - Fixed below navbar on right side */}
      <div className="fixed top-20 sm:top-24 right-4 sm:right-8 z-[100] flex flex-col gap-2">
        <button
          onClick={() => setUseOldColorScheme(!useOldColorScheme)}
          className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 shadow-lg ${
            useOldColorScheme ? 'bg-[#1c3a5c]' : 'bg-[#115B87]'
          }`}
          aria-label="Toggle color scheme"
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
              useOldColorScheme ? 'translate-x-9' : 'translate-x-1'
            }`}
          />
        </button>
        <button
          onClick={() => setShowHeading(!showHeading)}
          className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 shadow-lg ${
            showHeading ? 'bg-[#115B87]' : 'bg-gray-400'
          }`}
          aria-label="Toggle heading visibility"
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
              showHeading ? 'translate-x-9' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      <div 
        ref={containerRef}
        className={`relative w-full ${useOldColorScheme ? '' : 'bg-white'}`}
        style={useOldColorScheme ? {
          background: `linear-gradient(315deg, ${gradientColors})`,
          paddingTop: '2rem',
          paddingBottom: '2rem'
        } : {
          paddingTop: '2rem',
          paddingBottom: '2rem'
        }}
      >
      {/* Stacking Cards */}
      <div className="relative">
        {cardData.map((card, index) => {
          const { progress } = getCardProgress(index);
          
          // Ensure progress is clamped between 0-1 for smooth stacking
          const clampedProgress = Math.max(0, Math.min(1, progress));
          
          // Stage each subsequent card slightly lower so it's always visible,
          // then slide it perfectly into place over the first card.
          // All cards should stack at exactly the same position (translateY(0))
          const baseOffset = index * layerSpacing; // distance between card layers
          const currentTranslateY = index === 0 
            ? 0 
            : baseOffset * (1 - clampedProgress);
          
          // Ensure cards stack perfectly on top of each other when progress reaches 1
          const finalTranslateY = clampedProgress >= 1 ? 0 : currentTranslateY;
          
          const transformString = `translateY(${finalTranslateY}px)`;
          const blurAmount = 0; // No blur
          
          return (
            <div
              key={card.id}
              className={`sticky w-full flex flex-col ${containerPadding}`}
              style={{
                zIndex: 50 + index,
                opacity: 1,
                top: stickyTop,
                minHeight: `${Math.max(cardDisplayHeight + 60, viewportHeight * 0.5)}px`
              }}
            >
              {/* Section Heading - only visible on first card when showHeading is true */}
              {showHeading && index === 0 && (
                <div className="w-full flex justify-center pt-12 pb-8 sm:pb-10 md:pb-12 px-3 sm:px-4 relative z-50">
                  <div className="text-center max-w-5xl">
                    <h2 
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-normal font-poppins leading-none ${useOldColorScheme ? 'text-white' : ''}`}
                      style={useOldColorScheme ? {} : { color: '#1c3a5c' }}
                    >
                      {formattedTitle}
                    </h2>
                    {headerSubtitle && (
                      <p 
                        className={`text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-light mt-2 ${useOldColorScheme ? 'text-white/90' : 'text-gray-700'}`}
                      >
                        {headerSubtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Invisible spacer heading for cards 2+ to maintain alignment - only when showHeading is true */}
              {showHeading && index > 0 && (
                <div className="w-full flex justify-center pt-12 pb-8 sm:pb-10 md:pb-12 px-3 sm:px-4 invisible" style={{ height: 'auto' }}>
                  <div className="text-center max-w-5xl">
                    <h2 
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-normal font-poppins leading-none ${useOldColorScheme ? 'text-white' : ''}`}
                      style={useOldColorScheme ? {} : { color: '#1c3a5c' }}
                    >
                      {formattedTitle}
                    </h2>
                    {headerSubtitle && (
                      <p 
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto font-light mt-2"
                      >
                        {headerSubtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Card container - fixed position at top of sticky area */}
              <div className="w-full flex items-center justify-center" style={{ height: `${cardDisplayHeight}px`, minHeight: `${Math.min(cardDisplayHeight, viewportHeight * 0.6)}px` }}>
                <div 
                  className="w-full max-w-none h-full"
                  style={{
                    transform: transformString,
                    opacity: 1, // Always fully opaque when card container is visible
                    filter: `blur(${blurAmount}px)`,
                    transition: 'transform 0.3s ease-out' // Only transition transform, not opacity
                  }}
                >
                  <div 
                    className={`rounded-xl sm:rounded-2xl lg:rounded-3xl mx-auto overflow-hidden border border-white/20 transition-all duration-300 card-gradient-${industry.toLowerCase()}${index % 2 === 1 ? '-reverse' : ''}`}
                    style={{ maxWidth: `${cardMaxWidth}px`, height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                  <div className={`flex flex-col lg:flex-row h-full ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 h-[50%] sm:h-[55%] lg:h-full relative p-2 sm:p-3 lg:p-4 flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center">
                        {card.image ? (
                          <img 
                            src={card.image} 
                            alt={card.title}
                            className="max-w-full max-h-full object-contain rounded-lg lg:rounded-xl"
                            style={{ width: 'auto', height: 'auto', maxHeight: '100%', maxWidth: '100%' }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center rounded-lg lg:rounded-xl bg-gray-300/20 animate-pulse">
                            <div className="w-3/4 h-3/4 bg-gray-400/30 rounded-lg flex items-center justify-center">
                              <div className="text-gray-500/50 text-sm font-medium">Loading...</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 h-[50%] sm:h-[45%] lg:h-full p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-center">
                      <div className="flex flex-col justify-center h-full">
                        {/* Heading */}
                        <h2 
                          className="font-normal font-poppins text-white leading-tight mb-2 sm:mb-3 lg:mb-4"
                          style={{ 
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                            fontSize: `calc(clamp(1.75rem, 3vw, 3rem) * ${contentScale})`
                          }}
                        >
                          {card.title}
                        </h2>
                        
                        {/* Subheading */}
                        {card.subheading?.trim() && (
                        <h3 
                          className="font-normal text-white/90 mb-2"
                          style={{ 
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                            fontSize: `calc(clamp(0.9rem, 1.3vw, 1.25rem) * ${contentScale})`
                          }}
                        >
                          {card.subheading}
                        </h3>
                        )}
                        
                        {/* Description Paragraph */}
                        <p 
                          className="font-normal text-white/80 leading-relaxed mb-3 sm:mb-4"
                          style={{ 
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                            fontSize: `calc(clamp(1rem, 1.5vw, 1.35rem) * ${contentScale})`
                          }}
                        >
                          {card.description}
                        </p>
                        
                        {/* List Items */}
                        <ul className="space-y-1 sm:space-y-1.5 lg:space-y-2">
                          {card.listItems.map((item, itemIndex) => (
                            <li 
                              key={itemIndex} 
                              className="flex items-start text-white/90"
                              style={{ 
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                                fontSize: `calc(clamp(0.9rem, 1.3vw, 1.2rem) * ${contentScale})`
                              }}
                            >
                              <div className="rounded-full bg-white/80 mr-2 sm:mr-3 flex-shrink-0 shadow-lg mt-1.5" style={{ width: `calc(clamp(0.5rem, 1vw, 0.8rem) * ${contentScale})`, height: `calc(clamp(0.5rem, 1vw, 0.8rem) * ${contentScale})` }}></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          );
        })}
        
        {/* Spacer for scroll height */}
        <div style={{ height: `${cardData.length * 25}vh` }} />
      </div>
    </div>
    </>
  );
};

export default HybridStackableCards;
