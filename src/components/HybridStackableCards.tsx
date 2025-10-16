import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { getIndustryGradient, typography } from '../styles/brandStandards';

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
  maxCards = 2 
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [containerTop, setContainerTop] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
            id: 'transportation-vehicle',
            title: "Vehicle Integrity & Performance",
            subheading: "Custom-formulated transportation solutions",
            description: "Unparalleled solutions that ensure vehicle integrity and watertight sealing over the long haul with cutting-edge chemistries and technologies.",
            listItems: [
              "Vehicle integrity & watertight sealing",
              "Precisely match demanding requirements",
              "Cutting-edge delivery systems",
              "Unparalleled process efficiency"
            ],
            color: getCardGradient(0),
            image: "https://forzabuilt.com/wp-content/uploads/2023/05/Ford-side-angle-1.png"
          },
          {
            id: 'transportation-trailer',
            title: "Trailer & Transportation Solutions",
            subheading: "Rugged solutions for demanding transportation",
            description: "Tailor-made solutions rugged enough to meet the most demanding trailer & transportation needs while remaining simple and intuitive for manufacturing.",
            listItems: [
              "Full R&D formulations lab",
              "Rugged transportation solutions",
              "Simple manufacturing integration",
              "Custom-formulated requirements"
            ],
            color: getCardGradient(1),
            image: "https://forzabuilt.com/wp-content/uploads/2023/05/trailer-horse.png"
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

  const cardData = cards.length > 0 ? cards.slice(0, maxCards) : defaultCards.slice(0, maxCards);

  // Default titles based on industry
  const getDefaultTitle = () => {
    if (title) return title;
    
    const industryTitles: Record<string, string> = {
      marine: 'Marine Solutions in Action',
      transportation: 'Transportation Solutions in Action',
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
      transportation: 'Explore our heavy-duty solutions designed for the demanding requirements of commercial transportation and logistics.',
      construction: 'See how our comprehensive construction solutions ensure quality, safety, and efficiency in every project.',
      industrial: 'Learn about our advanced adhesive and bonding solutions designed specifically for industrial manufacturing applications.',
      composites: 'Understand our specialized adhesive and bonding solutions that meet the rigorous requirements of composite material manufacturing.',
      insulation: 'Discover our high-performance bonding solutions for insulation materials, ensuring energy efficiency and long-term performance.'
    };
    
    return industrySubtitles[industry.toLowerCase()] || 'Discover how our advanced adhesive, tape, and sealant solutions deliver exceptional performance across industries.';
  };

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

    const isDesktopOrTablet = window.innerWidth >= 768;
    const cardHeight = window.innerHeight * (isDesktopOrTablet ? 0.6 : 0.5); // Slightly longer for better transitions
    const cardStart = containerTop + (cardIndex * cardHeight);
    
    const progress = Math.max(0, Math.min(1, (scrollY - cardStart) / cardHeight));
    const nextCardProgress = Math.max(0, Math.min(1, (scrollY - cardStart - cardHeight) / cardHeight));
    const isVisible = scrollY >= cardStart - cardHeight * 0.5 && scrollY < cardStart + cardHeight * 2;
    
    return { progress, nextCardProgress, isVisible };
  };

  // Get industry gradient colors for background
  const gradientColors = getIndustryGradient(industry);

  return (
    <div 
      ref={containerRef}
      className="relative w-full pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24"
      style={{
        background: `linear-gradient(315deg, ${gradientColors})`
      }}
    >
      {/* Stacking Cards with Header Inside Sticky Container */}
      <div className="relative">
        {cardData.map((card, index) => {
          const { progress, nextCardProgress, isVisible } = getCardProgress(index);
          
          // Transform calculations (same as original)
          const currentScale = 1 - progress * 0.05;
          const currentTranslateY = progress * -50;
          const transformString = `translateY(${currentTranslateY}px) scale(${currentScale})`;
          const opacity = isVisible ? 1 - nextCardProgress * 0.7 : 0; // Slower fade out
          const blurAmount = Math.max(0, (1 - opacity) * 5); // Less blur
          
          return (
            <div
              key={card.id}
              className="sticky top-0 w-full h-screen flex flex-col px-2 sm:px-4"
              style={{
                zIndex: 40 + index,
              }}
            >
              {/* Header Section - Only show on first card, positioned higher */}
              {index === 0 ? (
                 <div className="text-center pt-0 mb-4 sm:mb-6 md:mb-6 lg:mb-8 px-3 sm:px-4 relative z-50">
                  <motion.h2 
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-normal font-poppins text-white mb-2 leading-none"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {getDefaultTitle()}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto font-light px-2 sm:px-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  >
                    {getDefaultSubtitle()}
                  </motion.p>
                </div>
              ) : (
                // Invisible spacer for subsequent cards to maintain alignment
                 <div className="pt-0 mb-4 sm:mb-6 md:mb-6 lg:mb-8 px-3 sm:px-4" style={{ height: '80px', minHeight: '80px' }}>
                  {/* Spacer to match header height */}
                </div>
              )}
              
              {/* Card container - flex-1 to take remaining space and center */}
              <div className="flex-1 flex items-center justify-center">

              <div 
                className="w-full max-w-none"
                style={{
                  transform: transformString,
                  opacity,
                  filter: `blur(${blurAmount}px)`,
                  transition: 'all 0.3s ease-out'
                }}
              >
                <div 
                  className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl mx-auto overflow-hidden shadow-2xl border border-white/20 cursor-pointer hover:border-white/40 hover:bg-white/15 transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]" 
                  style={{ maxWidth: '1600px' }}
                  onClick={() => openProductModal(card)}
                >
                  <div className={`flex flex-col lg:flex-row h-auto lg:h-[500px] xl:h-[600px] ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 h-48 sm:h-56 md:h-64 lg:h-full relative bg-white/20 backdrop-blur-sm p-3 sm:p-4 lg:p-6 flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center">
                        <img 
                          src={card.image} 
                          alt={card.title}
                          className="max-w-full max-h-full object-contain rounded-lg lg:rounded-xl"
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center bg-white/20 backdrop-blur-sm">
                      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                        {/* Heading */}
                        <h2 
                          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal font-poppins text-white leading-tight"
                          style={{ 
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          {card.title}
                        </h2>
                        
                        {/* Subheading */}
                        <h3 
                          className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white/90"
                          style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}
                        >
                          {card.subheading}
                        </h3>
                        
                        {/* Description Paragraph */}
                        <p 
                          className="text-white/80 leading-relaxed text-sm sm:text-base lg:text-lg"
                          style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}
                        >
                          {card.description}
                        </p>
                        
                        {/* List Items */}
                        <ul className="space-y-2 sm:space-y-2 lg:space-y-3">
                          {card.listItems.map((item, itemIndex) => (
                            <li 
                              key={itemIndex} 
                              className="flex items-start text-sm sm:text-base lg:text-lg text-white/90"
                              style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}
                            >
                              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/80 mr-3 sm:mr-4 flex-shrink-0 shadow-lg mt-1.5 sm:mt-1"></div>
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
        <div style={{ height: `${cardData.length * 60}vh` }} />
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
              className={`relative rounded-2xl md:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden bg-gradient-to-b ${getIndustryGradient(industry)}`}
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
              <div className="relative p-4 md:p-6 border-b border-white/20">
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
              <div className="relative overflow-y-auto max-h-[calc(95vh-8rem)] md:max-h-[calc(90vh-8rem)]">
                <div className="p-4 md:p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Product Image */}
                    <div className="w-full lg:w-1/2">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6 h-64 md:h-80 lg:h-96 flex items-center justify-center">
                        <img
                          src={selectedProduct.imageUrl}
                          alt={selectedProduct.name}
                          className="max-w-full max-h-full object-contain"
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="w-full lg:w-1/2 space-y-4 lg:space-y-6">
                      {/* Title */}
                      <h2 
                        className="text-2xl md:text-3xl lg:text-4xl font-normal font-poppins text-white leading-tight"
                        style={{ 
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        {selectedProduct.name}
                      </h2>

                      {/* Subheading */}
                      {selectedProduct.subheading && (
                        <h3 
                          className="text-lg md:text-xl lg:text-2xl text-white/90 font-semibold"
                          style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}
                        >
                          {selectedProduct.subheading}
                        </h3>
                      )}

                      {/* Description */}
                      <p 
                        className="text-white/80 leading-relaxed text-base md:text-lg"
                        style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}
                      >
                        {selectedProduct.description}
                      </p>

                      {/* List Items */}
                      {selectedProduct.listItems && selectedProduct.listItems.length > 0 && (
                        <ul className="space-y-3">
                          {selectedProduct.listItems.map((item: string, itemIndex: number) => (
                            <li 
                              key={itemIndex} 
                              className="flex items-start text-base md:text-lg text-white/90"
                              style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}
                            >
                              <div className="w-3 h-3 rounded-full bg-white/80 mr-4 flex-shrink-0 shadow-lg mt-1"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Link
                          to={`/products/${selectedProduct.category?.toLowerCase() || 'bond'}/${selectedProduct.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 border border-white/30 hover:border-white/40"
                        >
                          <span>View Product Details</span>
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        
                        <button
                          onClick={closeModal}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 border border-white/20 hover:border-white/30"
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
  );
};

export default HybridStackableCards;
