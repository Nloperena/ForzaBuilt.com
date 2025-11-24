import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getIndustryGradient, typography } from '../styles/brandStandards';
import TruckStackImage from '@/assets/images/Transporation-stickstackcard-images/Ford-side-angle-1-1.png';
import TrailerStackImage from '@/assets/images/Transporation-stickstackcard-images/trailer-horse.png';
import RvStackImage from '@/assets/images/Transporation-stickstackcard-images/White RV.png';

const cardStyleSheet = `
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState<number>(typeof window !== 'undefined' ? window.innerHeight : 900);
  const industryLowerCase = industry.toLowerCase();

  // Modal handlers
  const openProductModal = (card: Card) => {
    // Convert card to product format expected by modal
    const product = {
      id: card.id,
      name: card.title,
      description: card.description,
      imageUrl: card.image,
      category: industry,
      industry: industry,
      subheading: card.subheading,
      listItems: card.listItems
    };
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

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

  // Helper to get industry color hex value
  const getIndustryColorHex = (industry: string) => {
    switch (industry.toLowerCase()) {
      case 'marine':
        return '#137875'; // Marine teal
      case 'industrial':
        return '#f16a26'; // Industrial orange
      case 'transportation':
        return '#b83d35'; // Transportation red
      case 'construction':
        return '#fec770'; // Construction yellow
      case 'composites':
        return '#c7c8c9'; // Composites gray
      case 'insulation':
        return '#d0157d'; // Insulation pink
      case 'foam':
        return '#f16a26'; // Foam orange (same as industrial)
      default:
        return '#1b3764'; // Default brand blue
    }
  };

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
            subheading: "Premium adhesive solutions for luxury vessels",
            description: "Custom-formulated marine solutions that ensure boat and yacht structural integrity, watertight sealing, and surface bonding over the long haul.",
            listItems: [
              "Structural integrity & watertight sealing",
              "Custom-formulated for marine demands",
              "Cutting-edge marine chemistries",
              "Superior process efficiency"
            ],
            color: getCardGradient(0),
            image: "https://forzabuilt.com/wp-content/uploads/2023/05/marine-yacht.png"
          },
          {
            id: 'marine-pontoon',
            title: "Marine Pontoon Solutions",
            subheading: "Rugged solutions for pontoon applications",
            description: "Tailor-made marine solutions that are rugged enough to meet the most demanding needs while remaining simple and intuitive for today's manufacturing environment.",
            listItems: [
              "Full R&D formulations lab",
              "Rugged for demanding marine needs",
              "Simple & intuitive manufacturing",
              "Exceeds marine expectations"
            ],
            color: getCardGradient(1),
            image: "https://forzabuilt.com/wp-content/uploads/2023/05/marine-pontoon.png"
          }
        ];
        
      case 'transportation':
        return [
          {
            id: 'transportation-purpose-built',
            title: "Purpose-Built",
            subheading: "",
            description: "Every solution we make starts with your application—and is built with purpose from the ground up.",
            listItems: [
              "Engineered for the real world to deliver solutions that work the first time and every time",
              "Tailored, not templated: adhesives and sealants crafted for the specific demands your industry faces",
              "Practical innovation that pairs advanced chemistry with real-world application insight",
              "Custom, validated solutions delivered fast with no guesswork or wasted time"
            ],
            color: getCardGradient(0),
            image: TruckStackImage
          },
          {
            id: 'transportation-performance',
            title: "Performance",
            subheading: "",
            description: "Driven by experience and powered by science, our products perform where it matters most.",
            listItems: [
              "Decades of in-field expertise plus rigorous testing to ensure performance in the toughest environments",
              "Industry-specific formulas and test protocols for reliable results across transportation, construction, marine, and manufacturing sectors",
              "Comprehensive product portfolio so you get the exact high-performance solution you need—nothing more, nothing less"
            ],
            color: getCardGradient(1),
            image: TrailerStackImage
          },
          {
            id: 'transportation-guaranteed-strength',
            title: "Guaranteed Strength",
            subheading: "",
            description: "Our products are engineered to handle the demands of your toughest applications.",
            listItems: [
              "Strength you can trust—validated in-house and proven in the field",
              "Built for the long haul to withstand demanding conditions without compromise",
              "Made in the USA in our vertically integrated manufacturing and R&D center for consistent, reliable performance",
              "If it bonds, seals, or sticks, we make it strong—and help create the solution if it doesn’t yet exist"
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
            image: "https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-House-Construction.jpg"
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
            image: "https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-Construction-2-scaled.jpeg"
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
            image: "https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-General-Industries-2-2048x1365.jpeg"
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
            image: "https://forzabuilt.com/wp-content/uploads/2023/06/Industrial-Bonding-Adhesive.png"
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
            image: "https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Composite-1-scaled.jpg"
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
            image: "https://forzabuilt.com/wp-content/uploads/elementor/thumbs/Forza-Built-Compsite-3-Cropped-que8zmnjfjma0xgvnoxmjmjxd8ng36vz9podec5mlc.png"
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
            image: "https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-Insulation-1-2048x1365.jpeg"
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
            image: "https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-Insulation-2-2048x1152.jpeg"
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
            image: "https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-General-Industries-2-2048x1365.jpeg"
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
            image: "https://forzabuilt.com/wp-content/uploads/2023/06/Industrial-Bonding-Adhesive.png"
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
    // XL Displays - larger cards
    if (viewportHeight >= 1600) return 750;
    if (viewportHeight >= 1440) return 680;
    
    // Standard Desktop
    if (viewportHeight >= 1200) return 600;
    if (viewportHeight >= 1000) return 520;
    
    // Laptops/Tablets
    if (viewportHeight >= 800) return 450;
    if (viewportHeight >= 600) return 380;
    
    // Short displays (450px - 600px)
    if (viewportHeight >= 450) return 280;
    
    // Very short displays
    return 240;
  }, [viewportHeight]);

  const layerSpacing = 0; // Small offset for visibility during transition, but cards stack at same position
  const stackHeight = cardDisplayHeight + layerSpacing + (viewportHeight * 1.8); // Increased scroll distance for readability
  
  // ============================================
  // POSITIONING VARIABLES - Adjust these to control where title + cards sit
  // ============================================
  
  // Estimated height of the title section above the card (pt-12 pb-8 + text)
  const titleHeight = 100; // pixels - adjust if title is taller/shorter
  
  // Total height of the group (title + card)
  const groupHeight = titleHeight + cardDisplayHeight;
  
  // Where to position the CENTER of the group in the viewport (0.5 = middle, 0.4 = higher, 0.6 = lower)
  const groupCenterPosition = 0.0; // 0.5 = perfectly centered
  
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
      <style>{cardStyleSheet}</style>
      <div 
        ref={containerRef}
        className="relative w-full"
        style={{
          background: `linear-gradient(315deg, ${gradientColors})`,
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
              {/* Section Heading - only visible on first card */}
              {index === 0 && (
                <div className="w-full flex justify-center pt-12 pb-8 px-3 sm:px-4 relative z-50">
                  <div className="text-center max-w-5xl">
                    <h2 
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-normal font-poppins text-white leading-none"
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

              {/* Invisible spacer heading for cards 2+ to maintain alignment */}
              {index > 0 && (
                <div className="w-full flex justify-center pt-12 pb-8 px-3 sm:px-4 invisible" style={{ height: 'auto' }}>
                  <div className="text-center max-w-5xl">
                    <h2 
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-normal font-poppins text-white leading-none"
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
                    className={`rounded-xl sm:rounded-2xl lg:rounded-3xl mx-auto overflow-hidden shadow-2xl border border-white/20 transition-all duration-300 card-gradient-${industry.toLowerCase()}${index % 2 === 1 ? '-reverse' : ''} ${isTransportation ? '' : 'cursor-pointer hover:border-white/30 hover:shadow-3xl hover:scale-[1.02]'}`}
                    style={{ maxWidth: `${cardMaxWidth}px`, height: '100%', display: 'flex', flexDirection: 'column' }}
                    onClick={isTransportation ? undefined : () => openProductModal(card)}
                  >
                  <div className={`flex flex-col lg:flex-row h-full ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 h-[35%] sm:h-[40%] lg:h-full relative p-4 lg:p-6 flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center">
                        <img 
                          src={card.image} 
                          alt={card.title}
                          className="max-w-full max-h-full object-contain rounded-lg lg:rounded-xl"
                          style={{ width: 'auto', height: 'auto', maxHeight: '100%' }}
                        />
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 h-[65%] sm:h-[60%] lg:h-full p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-center">
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

      {/* Product Modal with Wipe Animation */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            
            {/* Modal Content with Wipe Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className={`relative rounded-lg md:rounded-2xl lg:rounded-3xl shadow-2xl w-full overflow-hidden bg-gradient-to-b ${getIndustryGradient(industry)}`}
              style={{
                maxWidth: 'clamp(90%, 75vw, 900px)',
                maxHeight: 'clamp(60vh, 85vh, 95vh)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Wipe Animation Overlay */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.1
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 pointer-events-none"
              />
              
              {/* Modal Header */}
              <div className="relative p-3 md:p-4 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: getIndustryColorHex(industry) }}></div>
                    <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                      {industry} Industry
                    </span>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-white/70 hover:text-white text-2xl font-light transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="relative overflow-y-auto" style={{ maxHeight: 'calc(100% - 3rem)' }}>
                <div className="p-2 sm:p-3 md:p-4 lg:p-5">
                  <div className="flex flex-col lg:flex-row gap-3 md:gap-4 lg:gap-5">
                    {/* Product Image */}
                    <div className="w-full lg:w-1/3">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 h-40 md:h-48 lg:h-56 flex items-center justify-center">
                        <img
                          src={selectedProduct.imageUrl}
                          alt={selectedProduct.name}
                          className="max-w-full max-h-full object-contain"
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="w-full lg:w-2/3 space-y-2 md:space-y-3 lg:space-y-4">
                      {/* Title */}
                      <h2 
                        className="font-normal font-poppins text-white leading-tight"
                        style={{ 
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                          fontSize: 'clamp(1.125rem, 2.2vw, 1.75rem)'
                        }}
                      >
                        {selectedProduct.name}
                      </h2>

                      {/* Subheading */}
                      {selectedProduct.subheading && (
                        <h3 
                          className="text-white/90 font-semibold"
                          style={{ 
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                            fontSize: 'clamp(0.9rem, 1.6vw, 1.25rem)'
                          }}
                        >
                          {selectedProduct.subheading}
                        </h3>
                      )}

                      {/* Description */}
                      <p 
                        className="text-white/80 leading-relaxed"
                        style={{ 
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                          fontSize: 'clamp(0.8rem, 1.3vw, 1rem)'
                        }}
                      >
                        {selectedProduct.description}
                      </p>

                      {/* List Items */}
                      {selectedProduct.listItems && selectedProduct.listItems.length > 0 && (
                        <ul className="space-y-1 md:space-y-1.5 lg:space-y-2">
                          {selectedProduct.listItems.map((item: string, itemIndex: number) => (
                            <li 
                              key={itemIndex} 
                              className="flex items-start text-white/90"
                              style={{ 
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                                fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)'
                              }}
                            >
                              <div className="rounded-full bg-white/80 mr-2 md:mr-2.5 flex-shrink-0 shadow-lg mt-1" style={{ width: 'clamp(0.35rem, 0.7vw, 0.5rem)', height: 'clamp(0.35rem, 0.7vw, 0.5rem)' }}></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 md:gap-2.5 pt-2 md:pt-3">
                        <Link
                          to={`/products/${selectedProduct.category?.toLowerCase() || 'bond'}/${selectedProduct.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-white bg-[#F2611D] border border-[#F2611D] shadow-[0_10px_25px_rgba(242,97,29,0.35)] hover:bg-[#F2611D]/85 hover:border-[#F2611D]/90 transition-colors duration-300"
                        >
                          <span>View Product Details</span>
                        </Link>
                        
                        <button
                          onClick={closeModal}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-all duration-300 border border-white/20 hover:border-white/30"
                        >
                          <span>Close</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default HybridStackableCards;
