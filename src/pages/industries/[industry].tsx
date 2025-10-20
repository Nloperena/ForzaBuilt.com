import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { industries } from '../../data/industries';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IdealChemistrySection from '../../components/IdealChemistrySection';
import HybridStackableCards from '../../components/HybridStackableCards';
 
import MarineProductsGrid from '../../components/MarineProductsGrid';
import ProductsExplorerClone from '@/components/ProductsExplorerClone';
import IndustryBrochureSection from '../../components/IndustryBrochureSection';
import ConstructionProductSelection from '../../components/ConstructionProductSelection';
import StaticXRayExplorer from '../../components/xray/StaticXRayExplorer';
import { MARINE_DATA } from '../../data/industries/marine';
import { CONSTRUCTION_DATA } from '../../data/industries/construction';
import { TRANSPORTATION_DATA } from '../../data/industries/transportation';
import { COMPOSITES_DATA } from '../../data/industries/composites';
import { INSULATION_DATA } from '../../data/industries/insulation';
import IdealChemistriesSection from '@/components/IdealChemistriesSection';
import ChemistryOverviewSectionV6 from '@/components/ChemistryOverviewSectionV6';
import { byProductLine } from '@/utils/products';
import { ExternalLink, X, Search, Filter, ArrowUpDown, ChevronDown, ChevronUp, FlaskConical } from 'lucide-react';
import { typography } from '@/styles/brandStandards';

import { motion, AnimatePresence } from 'framer-motion';
import ImageSkeleton from '../../components/common/ImageSkeleton';
import NewsletterSection from '@/components/NewsletterSection';

// Chemistry icon paths - using Rebranded Chemistry Icons
const CHEMISTRY_ICONS = {
  'Acrylic (incl. PSA)': '/Rebranded%20Chemistry%20Icons/Acrylic%20icon.svg',
  'Epoxy': '/Rebranded%20Chemistry%20Icons/Epoxy%20Icon.svg',
  'Modified Epoxy': '/Rebranded%20Chemistry%20Icons/Modified%20Epoxy%20icon.svg',
  'Silicone': '/Rebranded%20Chemistry%20Icons/Silicone%20icon.svg',
  'MS': '/Rebranded%20Chemistry%20Icons/MS%20icon.svg',
  'Water Base': '/Rebranded%20Chemistry%20Icons/Water%20Based%20icon.svg',
  'Hotmelt': '/Rebranded%20Chemistry%20Icons/Hotmelt%20icon.svg',
  'Solvent Base': '/Rebranded%20Chemistry%20Icons/Solvent%20Based%20icon.svg',
  'Polyurethane (PU)': '/Rebranded%20Chemistry%20Icons/Polyurethane%20icon.svg',
  'Cyanoacrylates': '/Rebranded%20Chemistry%20Icons/Cyanoacrylates%20Icon.svg',
  'Methacrylate/MMA': '/Rebranded%20Chemistry%20Icons/Methacrylate%20icon.svg',
  'Rubber Based': '/Rebranded%20Chemistry%20Icons/rubber%20based%20icon.svg'
};

// Helper to get industry logo from navbar data
const getIndustryLogo = (industry: string | string[]) => {
  // Handle both string and array inputs - use first industry if array
  const industryStr = Array.isArray(industry) ? industry[0] || '' : industry;
  const industryData = industries.find(ind => 
    ind.title.toLowerCase() === industryStr.toLowerCase()
  );
  return industryData?.logo || null;
};

// Helper to get just the industry color hex value
const getIndustryColorHex = (industry: string | string[]) => {
  // Handle both string and array inputs - use first industry if array
  const industryStr = Array.isArray(industry) ? industry[0] || '' : industry;
  const industryLower = industryStr.toLowerCase();
  
  switch (industryLower) {
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

// Helper to convert text to title case
const toTitleCase = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

const IndustryPage = () => {
  const { industry } = useParams();
  const industryData = industries.find(
    (ind) => ind.title.toLowerCase().replace(/\s+/g, '-') === industry
  );

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [iconLoaded, setIconLoaded] = useState(false);
  const [imageLoadedStates, setImageLoadedStates] = useState<Record<string, boolean>>({});
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter states
  const [search, setSearch] = useState('');
  const [selectedLine, setSelectedLine] = useState<'bond' | 'seal' | 'tape'>('bond');
  const [nameSort, setNameSort] = useState<'asc' | 'desc'>('asc');
  const [selectedChemistries, setSelectedChemistries] = useState<string[]>([]);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  // Handle page transition animation when industry changes
  useEffect(() => {
    setIsPageTransitioning(true);
    setVideoLoaded(false);
    setIconLoaded(false);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300); // Match the animation duration
    return () => clearTimeout(timer);
  }, [industry]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoLoaded(true);
  };

  const handleIconLoad = () => {
    setIconLoaded(true);
  };

  const handleIconError = () => {
    setIconLoaded(true);
  };

  // Image loading handlers
  const handleImageLoad = (productId: string) => {
    setImageLoadedStates(prev => ({ ...prev, [productId]: true }));
  };

  const handleImageError = (productId: string) => {
    setImageLoadedStates(prev => ({ ...prev, [productId]: true }));
  };

  // Get products for the current industry with filtering
  const industryProducts = useMemo(() => {
    if (!industryData) return [];
    
    const industryKey = industryData.title.toLowerCase();
    
    // Get products from the selected product line
    const allProducts = byProductLine(selectedLine);
    
    // Filter by industry first
    let filtered = allProducts.filter(product => {
      if (!product.industry) return false;
      
      // Handle both array and string industry formats
      const industries = Array.isArray(product.industry) ? product.industry : [product.industry];
      return industries.some(ind => 
        ind.toLowerCase() === industryKey || 
        ind.toLowerCase().includes(industryKey) ||
        industryKey.includes(ind.toLowerCase())
      );
    });

    // Apply search filter
    if (search) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply chemistry filter
    if (selectedChemistries.length > 0) {
      filtered = filtered.filter(product => 
        product.chemistry && selectedChemistries.includes(product.chemistry)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => 
      nameSort === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name)
    );

    return filtered;
  }, [industryData, selectedLine, search, selectedChemistries, nameSort]);

  // Get chemistry types for the current industry
  const chemistryTypes = useMemo(() => {
    const unique = new Set<string>(
      industryProducts
        .filter(p => p.chemistry)
        .map(p => p.chemistry!)
    );
    return Array.from(unique).sort();
  }, [industryProducts]);

  // Get category counts for all products in this industry
  const categoryCounts = useMemo(() => {
    if (!industryData) return { bond: 0, seal: 0, tape: 0 };
    
    const industryKey = industryData.title.toLowerCase();
    const counts = { bond: 0, seal: 0, tape: 0 };
    
    // Count all products for each category in this industry
    (['bond', 'seal', 'tape'] as const).forEach(line => {
      const products = byProductLine(line);
      counts[line] = products.filter(product => {
        if (!product.industry) return false;
        const industries = Array.isArray(product.industry) ? product.industry : [product.industry];
        return industries.some(ind => 
          ind.toLowerCase() === industryKey || 
          ind.toLowerCase().includes(industryKey) ||
          industryKey.includes(ind.toLowerCase())
        );
      }).length;
    });
    
    return counts;
  }, [industryData]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

 

  useEffect(() => {
    if (expandedIndex === null) return;
    const handleClick = (e: MouseEvent) => {
      const card = document.getElementById(`product-card-${expandedIndex}`);
      if (card && !card.contains(e.target as Node)) {
        setExpandedIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [expandedIndex]);



  if (!industryData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#115B87] text-white">
        <h1 className="text-4xl font-extrabold mb-4 font-kallisto">Industry Not Found</h1>
        <p className="text-lg">Sorry, we couldn't find the industry you're looking for.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#115B87] min-h-screen flex flex-col relative">
      <Header />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={industry}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full relative"
        >
          {/* Hero Banner */}
          <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden z-[5] hero-video-area">
            {!videoLoaded && <ImageSkeleton className="rounded-xl" />}
            <video
              key={industryData.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover object-center z-[5] rounded-xl transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
            >
              <source src={industryData.videoUrl} type="video/mp4" />
            </video>
          </section>

      {/* Title Section - First content after video */}
      <section style={{ background: 'linear-gradient(#ffffff 50%, #ffffff 50%)' }} className="relative z-[20] pt-16 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-48">
        <motion.div 
          className="w-full px-4 sm:px-6 md:px-10 flex items-center justify-center gap-4 sm:gap-6 md:gap-8"
          style={{ marginTop: '-5rem' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <h1
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black mb-0 leading-none font-kallisto"
            style={{ 
              color: industryData.color || '#1B3764',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}
          >
            {industryData.title.toUpperCase()}
          </h1>
          {industryData.logo ? (
            <div className="relative h-20 sm:h-28 md:h-40 lg:h-48 xl:h-56 w-20 sm:w-28 md:w-40 lg:w-48 xl:w-56">
              {!iconLoaded && <ImageSkeleton className="rounded-lg" />}
              <motion.img
                src={industryData.logo}
                alt={`${industryData.title} icon`}
                className={`h-20 sm:h-28 md:h-40 lg:h-48 xl:h-56 w-auto object-contain transition-opacity duration-500 ${iconLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))' }}
                loading="lazy"
                onLoad={handleIconLoad}
                onError={handleIconError}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: iconLoaded ? 1 : 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
              />
            </div>
          ) : null}
        </motion.div>
      </section>



      {/* Dynamic Industry Headings Section */}
      <section className="bg-white text-[#1b3764] py-8 sm:py-12 md:py-16 relative z-[30]">
          <div className="w-full px-4 sm:px-6 max-w-[1600px] mx-auto">
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Icons removed per brand standards; title only */}
              <h3 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-regular text-center leading-none break-words font-poppins text-[white]"
              >
                {`Building High-Performance ${industryData.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())} Adhesive, Tape & Sealant Solutions`}
              </h3>
            </motion.div>
          </div>
        </section>




      {/* New Static X-Ray Explorer Sections */}
      {industryData.title.toLowerCase() === 'marine' && (
        <>
          <section className="bg-gray-50 relative z-[30]">
            <StaticXRayExplorer industry={MARINE_DATA} xrayIndex={0} />
          </section>
          <section className="bg-white relative z-[30]">
            <StaticXRayExplorer industry={MARINE_DATA} xrayIndex={1} />
          </section>
        </>
      )}

      {industryData.title.toLowerCase() === 'construction' && (
        <>
          <section className="bg-gray-50 relative z-[30]">
            <StaticXRayExplorer industry={CONSTRUCTION_DATA} xrayIndex={0} />
          </section>
          <section className="bg-white relative z-[30]">
            <StaticXRayExplorer industry={CONSTRUCTION_DATA} xrayIndex={1} />
          </section>
        </>
      )}

      {industryData.title.toLowerCase() === 'transportation' && (
        <>
          <section className="bg-gray-50 relative z-[30]">
            <StaticXRayExplorer industry={TRANSPORTATION_DATA} xrayIndex={0} />
          </section>
          <section className="bg-white relative z-[30]">
            <StaticXRayExplorer industry={TRANSPORTATION_DATA} xrayIndex={1} />
          </section>
        </>
      )}

      {industryData.title.toLowerCase() === 'composites' && (
        <section className="bg-gray-50 relative z-[30]">
          <StaticXRayExplorer industry={COMPOSITES_DATA} xrayIndex={0} />
        </section>
      )}

      {industryData.title.toLowerCase() === 'insulation' && (
        <>
          <section className="bg-gray-50 relative z-[30]">
            <StaticXRayExplorer industry={INSULATION_DATA} xrayIndex={0} />
          </section>
          <section className="bg-white relative z-[30]">
            <StaticXRayExplorer industry={INSULATION_DATA} xrayIndex={1} />
          </section>
        </>
      )}

      {/* Stackable Cards Section - removed old version */}



      {/* Hybrid Stackable Cards Section - Combining best of both components */}
      {(() => {
        const industryKey = industryData.title.toLowerCase();
        // Map industry titles to valid industry keys
        const getIndustryKey = (title: string) => {
          const titleLower = title.toLowerCase();
          if (titleLower.includes('marine')) return 'marine';
          if (titleLower.includes('transportation')) return 'transportation';
          if (titleLower.includes('construction')) return 'construction';
          if (titleLower.includes('industrial')) return 'industrial';
          if (titleLower.includes('composite')) return 'composites';
          if (titleLower.includes('insulation')) return 'insulation';
          return 'industrial'; // default fallback
        };
        
        const validIndustryKey = getIndustryKey(industryData.title);
        
        return (
          <div className="relative z-[30]">
            <HybridStackableCards 
              industry={validIndustryKey}
              maxCards={2}
            />
          </div>
        );
      })()}

      {/* Product Cards Section - Uniform look with product pages */}
      <section className="bg-gray-100 text-gray-900 py-8 sm:py-12 md:py-16 relative z-[30]">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8">
            <motion.div 
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-regular font-poppins leading-none text-[#1b3764] break-words capitalize">
                {industryData.title.toLowerCase()} Products
              </h2>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-6 mt-2">
              {/* Filter Sidebar */}
              <aside className="lg:w-64 xl:w-72 flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
                {/* Search Bar */}
                <div className="bg-gradient-to-r from-[#4a5a7a] to-[#293350] rounded-xl shadow-lg border border-gray-300 p-3 mb-4">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 p-1.5 rounded-full">
                      <Search className="text-white h-4 w-4" />
                    </div>
                    <input
                      placeholder="Search products…"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="w-full bg-white/10 text-white placeholder-white/60 pl-12 py-3 text-sm border border-white/30 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 rounded-xl"
                    />
                    {search && (
                      <button
                        onClick={() => setSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-1.5 rounded-full transition-colors"
                      >
                        <X className="text-white h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Panel */}
                <div className="hidden lg:block bg-gradient-to-r from-[#4a5a7a] to-[#293350] shadow-lg rounded-xl border border-gray-300 overflow-hidden">
                  <div className="p-4 border-b border-white/20">
                    <h3 className="font-poppins font-regular text-lg text-white" style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                      Filter & Sort
                    </h3>
                  </div>

                  <div className="p-4 space-y-6">
                    {/* Product Category (Bond/Seal/Tape) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-white">Product Category</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {(['bond','seal','tape'] as const).map(line => (
                          <button
                            key={line}
                            onClick={() => {
                              setSelectedLine(line);
                              setSelectedChemistries([]);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-lg transition-all overflow-hidden ${
                              selectedLine === line ? 'bg-[#F2611D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <span className="text-xs xl:text-sm font-medium capitalize">{line}</span>
                            <span className="text-xs opacity-70">({categoryCounts[line] || 0})</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name Sort */}
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <ArrowUpDown className="text-white h-4 w-4 mr-2" />
                        <h4 className="text-sm font-semibold text-white">Sort By Name</h4>
                      </div>

                      <div className="flex rounded-lg overflow-hidden">
                        <button
                          onClick={() => setNameSort('asc')}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 transition-all ${nameSort === 'asc' ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                          <ChevronUp className="h-3 w-3" />
                          <span className="text-xs font-medium">A-Z</span>
                        </button>

                        <button
                          onClick={() => setNameSort('desc')}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 transition-all ${nameSort === 'desc' ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                          <ChevronDown className="h-3 w-3" />
                          <span className="text-xs font-medium">Z-A</span>
                        </button>
                      </div>
                    </div>

                    {/* Chemistry Filter */}
                    {chemistryTypes.length > 0 && (
                      <div className="space-y-3 border-t border-white/20 pt-5">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <FlaskConical className="text-white h-4 w-4 mr-2" />
                            <h4 className="text-sm font-semibold text-white">Chemistry</h4>
                          </div>
                          {selectedChemistries.length > 0 && (
                            <button
                              onClick={() => setSelectedChemistries([])}
                              className="text-xs text-white hover:text-white/80 bg-white/10 hover:bg-white/20 py-1 px-2 rounded-md"
                            >
                              Clear
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                          {chemistryTypes.map(chemistry => {
                            const isSelected = selectedChemistries.includes(chemistry);
                            const count = industryProducts.filter(p => p.chemistry === chemistry).length;
                            return (
                              <button
                                key={chemistry}
                                onClick={() => {
                                  if (isSelected) setSelectedChemistries(selectedChemistries.filter(c => c !== chemistry));
                                  else setSelectedChemistries([...selectedChemistries, chemistry]);
                                }}
                                disabled={count === 0 && !isSelected}
                                className={`w-full flex items-center justify-between p-2 rounded-lg transition-all overflow-hidden border ${
                                  isSelected ? 'bg-[#F2611D] text-white shadow-lg border-[#F2611D]' : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-md border-white/20'
                                } ${count === 0 && !isSelected ? 'opacity-50' : ''}`}
                              >
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                                    <img 
                                      src={CHEMISTRY_ICONS[chemistry as keyof typeof CHEMISTRY_ICONS]} 
                                      alt={chemistry}
                                      className="w-6 h-6 object-contain chemistry-icon"
                                    />
                                  </div>
                                  <span className="text-xs xl:text-sm font-medium truncate">{chemistry}</span>
                                </div>
                                <span className="text-xs opacity-70">({count})</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Filter Button */}
                <div className="lg:hidden sticky bottom-4 w-full flex justify-center z-30">
                  <button
                    className="bg-[#F2611D] hover:bg-[#E55B1C] rounded-full px-6 py-3 shadow-lg transition-colors flex items-center justify-center gap-2"
                    aria-label="Filter"
                    onClick={() => setIsFilterDialogOpen(true)}
                  >
                    <Filter className="text-white h-5 w-5" />
                    <span className="text-white font-medium">Filter & Sort</span>
                  </button>
                </div>
              </aside>

              {/* Main Content Area */}
              <div className="flex-1">
                {/* Results Info */}
                <div className="flex justify-between items-center mb-6">
                  <div className="bg-gray-100 px-4 py-2 rounded-full border border-gray-300 shadow-sm">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">{industryProducts.length}</span> products found
                      {selectedChemistries.length > 0 && (
                        <span className="hidden sm:inline"> • <span className="font-semibold text-gray-900">{selectedChemistries.length}</span> {selectedChemistries.length === 1 ? 'chemistry' : 'chemistries'}</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Product Grid or Empty State */}
                {industryProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    <AnimatePresence mode="popLayout">
                      {industryProducts.map((product, idx) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.3) }}
                          layout
                          className="group"
                        >
                  <div 
                    className="relative overflow-hidden transition-all duration-500 hover:scale-[1.02] h-32 md:h-[500px] rounded-2xl md:rounded-3xl bg-gradient-to-b from-[#4a5a7a] to-[#293350] border border-gray-200 hover:border-gray-300 shadow-lg"
                  >
                    {/* Desktop: Badge above image */}
                    <div className="absolute top-3 left-3 z-30 hidden md:block">
                      <div 
                        className="px-4 py-2 rounded-full text-2xl font-bold uppercase tracking-wide flex items-center gap-2 bg-transparent text-white"
                      >
                        {getIndustryLogo(product.industry?.[0] || '') ? (
                          <img 
                            src={getIndustryLogo(product.industry?.[0] || '')} 
                            alt={`${product.industry?.[0] || ''} icon`}
                            className="h-10 w-10 md:h-12 md:w-12 object-contain"
                          />
                        ) : (
                          <span className="capitalize">{product.industry?.[0]?.charAt(0) || ''}</span>
                        )}
                        <span className="capitalize">{product.industry?.[0] || ''}</span>
                      </div>
                    </div>

                    {/* Desktop: Product Image - Full height to show whole image */}
                    <div className="absolute inset-0 hidden md:block" style={{ transform: 'translateY(-7.5%) scale(0.74)' }}>
                      {/* Image Skeleton Loading State */}
                      {!imageLoadedStates[product.id] && (
                        <ImageSkeleton />
                      )}
                      
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-105 ${
                          imageLoadedStates[product.id] ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(product.id)}
                        onError={() => handleImageError(product.id)}
                      />
                    </div>

                    {/* Mobile: Left side with image and basic info */}
                    <div 
                      className="flex md:hidden items-center gap-4 flex-1 p-4 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      }}
                    >
                      {/* Mobile: Product Image */}
                      <div className="w-[100px] h-[100px] rounded-xl overflow-hidden bg-transparent relative flex items-center justify-center">
                        {/* Image Skeleton Loading State */}
                        {!imageLoadedStates[product.id] && (
                          <ImageSkeleton className="rounded-xl" />
                        )}
                        
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className={`max-w-full max-h-full object-contain transition-opacity duration-500 ${
                            imageLoadedStates[product.id] ? 'opacity-100' : 'opacity-0'
                          }`}
                          onLoad={() => handleImageLoad(product.id)}
                          onError={() => handleImageError(product.id)}
                        />
      </div>
                      
                      {/* Mobile: Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-kallisto font-bold mb-1 leading-tight line-clamp-1 text-white">
                          {product.name.split('–')[0].trim()}
                        </h3>
                        <p className="text-xs text-white line-clamp-2">
                          {toTitleCase(product.name.split('–')[1]?.trim() || product.description)}
                        </p>
                        {/* Mobile: Industry Badge */}
                        <div 
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-base font-bold uppercase tracking-wide mt-2 bg-gray-100 text-gray-800"
                        >
                          {getIndustryLogo(product.industry?.[0] || '') ? (
                            <img 
                              src={getIndustryLogo(product.industry?.[0] || '')} 
                              alt={`${product.industry?.[0] || ''} icon`}
                              className="h-8 w-8 object-contain"
                            />
                          ) : (
                            <span className="capitalize">{product.industry?.[0]?.charAt(0) || ''}</span>
                          )}
                          <span className="text-xs">{product.industry?.[0] || ''}</span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Content Section with title and description */}
                    <div className="hidden md:block p-4 absolute bottom-0 left-0 right-0">
                      <div className="space-y-1">
                        <h3 className="text-base font-poppins font-bold text-xl leading-tight line-clamp-4 text-white">
                          {product.name.split('–')[0].trim()}
                        </h3>
                        <p className="text-sm text-white line-clamp-3">
                          {toTitleCase(product.name.split('–')[1]?.trim() || product.description)}
                        </p>
                        
                        {/* Button Row */}
                        <div className="flex gap-2">
                          {/* Quick View Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
                              setIsModalOpen(true);
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-[white] hover:bg-[#4a5a7a] text-[white] hover:text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                          >
                            <span>Quick View</span>
                          </button>
                          
                          {/* Product Details Button */}
                          <Link
                            to={`/products/${product.category?.toLowerCase() || 'bond'}/${product.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#F2611D] hover:bg-[#d9551a] text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                          >
                            <span>Product Details</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Mobile: Right side with buttons */}
                    <div className="flex md:hidden items-center gap-2 p-4">
                      {/* Mobile: Quick View Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                          setIsModalOpen(true);
                        }}
                        className="flex items-center gap-1 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 border border-white/30"
                      >
                        <span>Quick View</span>
                      </button>
                      
                      {/* Mobile: Product Details Button */}
                      <Link
                        to={`/products/${product.category?.toLowerCase() || 'bond'}/${product.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 border border-white/30"
                      >
                        <span>Details</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
                      ))}
                    </AnimatePresence>
                </div>
                ) : (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4">
                      <Search className="h-16 w-16 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                    <button
                      onClick={() => {
                        setSearch('');
                        setSelectedChemistries([]);
                        setSelectedLine('bond');
                      }}
                      className="px-6 py-2 bg-[#F2611D] hover:bg-[#d9551a] text-white rounded-full text-sm font-medium transition-all duration-300"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Filter Dialog */}
            <AnimatePresence>
              {isFilterDialogOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 z-50 flex items-end lg:hidden"
                  onClick={() => setIsFilterDialogOpen(false)}
                >
                  <div className="bg-white w-full rounded-t-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="sticky top-0 bg-white pt-3 pb-2 px-4 flex justify-between items-center border-b border-gray-200">
                      <h3 className="text-gray-900 text-lg font-bold">Filter & Sort</h3>
                      <button onClick={() => setIsFilterDialogOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                        <X className="text-gray-600 h-5 w-5" />
                      </button>
                    </div>

                    <div className="p-4 space-y-6">
                      {/* Search */}
                      <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-3">
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-100 p-1.5 rounded-full">
                            <Search className="text-gray-600 h-4 w-4" />
                          </div>
                          <input
                            placeholder="Search products…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-white text-gray-900 placeholder-gray-400 pl-12 py-3 text-sm border border-gray-300 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded-xl"
                          />
                          {search && (
                            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-1.5 rounded-full transition-colors">
                              <X className="text-gray-600 h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Sort */}
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <h4 className="text-gray-900 font-bold text-sm uppercase mb-3">Sort By</h4>
                        <div className="flex gap-2">
                          <button onClick={() => setNameSort('asc')} className={`flex-1 py-2 px-3 rounded-lg text-center text-sm font-medium ${nameSort === 'asc' ? 'bg-[#F2611D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>A-Z</button>
                          <button onClick={() => setNameSort('desc')} className={`flex-1 py-2 px-3 rounded-lg text-center text-sm font-medium ${nameSort === 'desc' ? 'bg-[#F2611D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Z-A</button>
                        </div>
                      </div>

                      {/* Product Category */}
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <h4 className="text-gray-900 font-bold text-sm uppercase mb-3">Product Category</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {(['bond','seal','tape'] as const).map(line => (
                            <button
                              key={line}
                              onClick={() => {
                                setSelectedLine(line);
                                setSelectedChemistries([]);
                              }}
                              className={`py-2 px-3 rounded-lg text-center text-sm font-medium ${selectedLine === line ? 'bg-[#F2611D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                              {line}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Chemistry Filter */}
                      {chemistryTypes.length > 0 && (
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <h4 className="text-gray-900 font-bold text-sm uppercase mb-3">Chemistry</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {chemistryTypes.map(chemistry => {
                              const isSelected = selectedChemistries.includes(chemistry);
                              const count = industryProducts.filter(p => p.chemistry === chemistry).length;
                              return (
                                <button
                                  key={chemistry}
                                  onClick={() => {
                                    if (isSelected) setSelectedChemistries(selectedChemistries.filter(c => c !== chemistry));
                                    else setSelectedChemistries([...selectedChemistries, chemistry]);
                                  }}
                                  className={`flex items-center justify-between p-2 rounded-lg overflow-hidden ${isSelected ? 'bg-[#F2611D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                  <div className="flex items-center gap-2 min-w-0 flex-1">
                                    <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                                      <img 
                                        src={CHEMISTRY_ICONS[chemistry as keyof typeof CHEMISTRY_ICONS]} 
                                        alt={chemistry}
                                        className="w-5 h-5 object-contain chemistry-icon"
                                      />
                                    </div>
                                    <span className="text-xs font-medium truncate">{chemistry}</span>
                                  </div>
                                  <span className="text-xs opacity-70 flex-shrink-0">({count})</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Apply Button */}
                      <div className="pt-2 pb-6">
                        <button onClick={() => setIsFilterDialogOpen(false)} className="w-full py-3 bg-[#F2611D] hover:bg-[#E55B1C] text-white font-medium rounded-xl transition-colors">
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

      {/* Chemistries Section - match homepage version */}
      <div className="relative z-[30]">
        <ChemistryOverviewSectionV6 />
      </div>

      {/* Industry Brochure Section */}
      <div className="relative z-[30]">
        <IndustryBrochureSection industry={industryData.title} backgroundColor="white" />
      </div>

        </motion.div>
      </AnimatePresence>

      {/* Product Modal */}
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
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-gradient-to-r from-[#4a5a7a] to-[#293350] rounded-2xl md:rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Industry Badge */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-base font-bold uppercase tracking-wide bg-transparent text-white">
                    {getIndustryLogo(selectedProduct.industry?.[0] || '') ? (
                      <img 
                        src={getIndustryLogo(selectedProduct.industry?.[0] || '')} 
                        alt={`${selectedProduct.industry?.[0] || ''} icon`}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <span className="capitalize">{selectedProduct.industry?.[0]?.charAt(0) || ''}</span>
                    )}
                    <span className="capitalize">{selectedProduct.industry?.[0] || ''}</span>
                  </div>
                </div>
                
                {/* Product Image */}
                <div className="mb-4">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-contain"
                  />
                </div>
                
                {/* Product Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-poppins font-bold text-white">
                    {selectedProduct.name.split('–')[0].trim()}
                  </h3>
                  
                  <p className="text-sm text-white">
                    {toTitleCase(selectedProduct.name.split('–')[1]?.trim() || selectedProduct.description)}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Link
                      to={`/products/${selectedProduct.category?.toLowerCase() || 'bond'}/${selectedProduct.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#F2611D] hover:bg-[#d9551a] text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                    >
                      <span>Product Details</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

 
      <NewsletterSection /> 
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default IndustryPage; 