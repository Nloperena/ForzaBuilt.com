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
import { byProductLine } from '@/utils/products';
import { ExternalLink, X, Search, Filter, ArrowUpDown, ChevronDown, ChevronUp, FlaskConical } from 'lucide-react';
import { typography } from '@/styles/brandStandards';

import { motion, AnimatePresence } from 'framer-motion';
import ImageSkeleton from '../../components/common/ImageSkeleton';

// Chemistry icon paths - using All White Chemistry Icons
const CHEMISTRY_ICONS = {
  'Acrylic (incl. PSA)': '/All%20White%20Chemistry%20Icons/Acrylic%20icon.svg',
  'Epoxy': '/All%20White%20Chemistry%20Icons/Epoxy%20icon.svg',
  'Modified Epoxy': '/All%20White%20Chemistry%20Icons/Modified%20Epoxy%20Icon.svg',
  'Silicone': '/All%20White%20Chemistry%20Icons/silicone%20icon.svg',
  'MS': '/All%20White%20Chemistry%20Icons/MS%20icon.svg',
  'Water Base': '/All%20White%20Chemistry%20Icons/Water%20based%20icon.svg',
  'Hotmelt': '/All%20White%20Chemistry%20Icons/Hotmelt%20icon.svg',
  'Solvent Base': '/All%20White%20Chemistry%20Icons/Solvent%20based%20icon.svg',
  'Polyurethane (PU)': '/All%20White%20Chemistry%20Icons/Pollyutherane%20icon.svg',
  'Cyanoacrylates': '/All%20White%20Chemistry%20Icons/Cyanoacrylates%20icon.svg',
  'Methacrylate/MMA': '/All%20White%20Chemistry%20Icons/Methacrylate%20icon.svg',
  'Rubber Based': '/All%20White%20Chemistry%20Icons/rubber%20based%20icon.svg'
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
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-center leading-none break-words font-kallisto text-[#1b3764]"
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
      {industryProducts.length > 0 && (
        <section className="bg-[#115B87] text-white py-8 sm:py-12 md:py-16 relative z-[30]">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8">
            <motion.div 
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black font-kallisto leading-none text-white break-words">
                {industryData.title} Products
              </h2>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-6 mt-2">
              {/* Filter Sidebar */}
              <aside className="lg:w-64 xl:w-72 flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
                {/* Search Bar */}
                <div className="bg-white/15 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-3 mb-4">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 p-1.5 rounded-full">
                      <Search className="text-white h-4 w-4" />
                    </div>
                    <input
                      placeholder="Search products…"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="w-full bg-white/10 text-white placeholder-white/50 pl-12 py-3 text-sm border border-white/20 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/10 rounded-xl"
                    />
                    {search && (
                      <button
                        onClick={() => setSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
                      >
                        <X className="text-white h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Panel */}
                <div className="hidden lg:block bg-white/10 backdrop-blur-md shadow-lg rounded-xl border border-white/20 overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="font-kallisto font-bold text-lg text-white" style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                      Filter & Sort
                    </h3>
                  </div>

                  <div className="p-4 space-y-6">
                    {/* Product Category (Bond/Seal/Tape) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-white/90">Product Category</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {(['bond','seal','tape'] as const).map(line => (
                          <button
                            key={line}
                            onClick={() => setSelectedLine(line)}
                            className={`w-full flex items-center justify-between p-2 rounded-lg transition-all overflow-hidden ${
                              selectedLine === line ? 'bg-[#F2611D] text-white' : 'bg-[#3f5275]/40 text-white/90 hover:bg-[#3f5275]/60'
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
                        <ArrowUpDown className="text-white/90 h-4 w-4 mr-2" />
                        <h4 className="text-sm font-semibold text-white/90">Sort By Name</h4>
                      </div>

                      <div className="flex rounded-lg overflow-hidden">
                        <button
                          onClick={() => setNameSort('asc')}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 transition-all ${nameSort === 'asc' ? 'bg-[#F2611D] text-white' : 'bg-[#3f5275]/70 text-white/80 hover:bg-[#3f5275]'}`}
                        >
                          <ChevronUp className={`h-3 w-3 ${nameSort === 'asc' ? 'text-white' : 'text-white/70'}`} />
                          <span className="text-xs font-medium">A-Z</span>
                        </button>

                        <button
                          onClick={() => setNameSort('desc')}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 transition-all ${nameSort === 'desc' ? 'bg-[#F2611D] text-white' : 'bg-[#3f5275]/70 text-white/80 hover:bg-[#3f5275]'}`}
                        >
                          <ChevronDown className={`h-3 w-3 ${nameSort === 'desc' ? 'text-white' : 'text-white/70'}`} />
                          <span className="text-xs font-medium">Z-A</span>
                        </button>
                      </div>
                    </div>

                    {/* Chemistry Filter */}
                    {chemistryTypes.length > 0 && (
                      <div className="space-y-3 border-t border-white/10 pt-5">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <FlaskConical className="text-white/90 h-4 w-4 mr-2" />
                            <h4 className="text-sm font-semibold text-white/90">Chemistry</h4>
                          </div>
                          {selectedChemistries.length > 0 && (
                            <button
                              onClick={() => setSelectedChemistries([])}
                              className="text-xs text-white/80 hover:text-white bg-[#3f5275]/70 hover:bg-[#3f5275] py-1 px-2 rounded-md"
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
                                className={`w-full flex items-center justify-between p-2 rounded-lg transition-all overflow-hidden backdrop-blur-xl border border-white/20 ${
                                  isSelected ? 'bg-[#F2611D] text-white shadow-lg' : 'bg-[#3f5275]/40 text-white/90 hover:bg-[#3f5275]/60 hover:shadow-md'
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
                  <div className="bg-[#3f5275]/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-sm">
                    <p className="text-sm text-white/90">
                      <span className="font-semibold text-white">{industryProducts.length}</span> products found
                      {selectedChemistries.length > 0 && (
                        <span className="hidden sm:inline"> • <span className="font-semibold text-white">{selectedChemistries.length}</span> {selectedChemistries.length === 1 ? 'chemistry' : 'chemistries'}</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {industryProducts.map((product, idx) => (
                <motion.div
                  key={`${product.id}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.3) }}
                  className="group"
                >
                  <div 
                    className="relative overflow-hidden transition-all duration-500 hover:scale-[1.02] h-32 md:h-[500px] rounded-2xl md:rounded-3xl backdrop-blur-xl border border-white/20 hover:border-white/30 shadow-2xl"
                    style={{
                      background: `linear-gradient(to top, ${getIndustryColorHex(product.industry?.[0] || '')} 0%, ${getIndustryColorHex(product.industry?.[0] || '')} 15%, rgba(255, 255, 255, 0.15) 100%)`,
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {/* Desktop: Badge above image */}
                    <div className="absolute top-3 left-3 z-30 hidden md:block">
                      <div 
                        className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1"
                        style={{
                          background: `rgba(255, 255, 255, 0.2)`,
                          color: '#ffffff',
                          textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
                        }}
                      >
                        {getIndustryLogo(product.industry?.[0] || '') ? (
                          <img 
                            src={getIndustryLogo(product.industry?.[0] || '')} 
                            alt={`${product.industry?.[0] || ''} icon`}
                            className="h-4 w-4 md:h-5 md:w-5 object-contain"
                          />
                        ) : (
                          <span className="capitalize">{product.industry?.[0]?.charAt(0) || ''}</span>
                        )}
                        <span className="capitalize">{product.industry?.[0] || ''}</span>
                      </div>
                    </div>

                    {/* Desktop: Product Image - Full height to show whole image */}
                    <div className="absolute inset-0 hidden md:block" style={{ transform: 'translateY(-7.5%)' }}>
                      {/* Image Skeleton Loading State */}
                      {!imageLoadedStates[product.id] && (
                        <ImageSkeleton />
                      )}
                      
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-110 ${
                          imageLoadedStates[product.id] ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(product.id)}
                        onError={() => handleImageError(product.id)}
                      />
                    </div>

                    {/* Desktop: Product Title between image and content */}
                    <div className="hidden md:block px-4 py-3 absolute bottom-24 left-0 right-0">
                      <h3 className="text-xl font-kallisto font-black leading-tight line-clamp-2 text-white" style={{ textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)' }}>
                        {product.name.split('–')[0].trim()}
                      </h3>
                    </div>

                    {/* Mobile: Left side with image and basic info */}
                    <div className="flex md:hidden items-center gap-4 flex-1 p-4">
                      {/* Mobile: Product Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/20 backdrop-blur-xl border border-white/30 hover:border-white/40 shadow-2xl relative flex items-center justify-center" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)' }}>
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
                        <h3 className="text-base font-kallisto font-black mb-1 leading-tight line-clamp-1 text-white" style={{ textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)' }}>
                          {product.name.split('–')[0].trim()}
                        </h3>
                        <p className="text-xs text-white/90 line-clamp-2">
                          {product.name.split('–')[1]?.trim() || product.description}
                        </p>
                        {/* Mobile: Industry Badge */}
                        <div 
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide mt-2"
                          style={{
                            background: `rgba(255, 255, 255, 0.2)`,
                            color: '#ffffff',
                            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
                          }}
                        >
                          {getIndustryLogo(product.industry?.[0] || '') ? (
                            <img 
                              src={getIndustryLogo(product.industry?.[0] || '')} 
                              alt={`${product.industry?.[0] || ''} icon`}
                              className="h-4 w-4 md:h-5 md:w-5 object-contain"
                            />
                          ) : (
                            <span className="capitalize">{product.industry?.[0]?.charAt(0) || ''}</span>
                          )}
                          <span className="text-xs">{product.industry?.[0] || ''}</span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Content Section */}
                    <div className="hidden md:block p-4 absolute bottom-0 left-0 right-0">
                      <div className="space-y-3">
                        <p className="text-sm text-white/90 line-clamp-3">
                          {product.name.split('–')[1]?.trim() || product.description}
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
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 border border-white/30"
                          >
                            <span>Quick View</span>
                          </button>
                          
                          {/* Product Details Button */}
                          <Link
                            to={`/products/${product.category?.toLowerCase() || 'bond'}/${product.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 border border-white/30"
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
                </div>
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
                  <div className="bg-[#115B87] w-full rounded-t-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="sticky top-0 bg-[#115B87] pt-3 pb-2 px-4 flex justify-between items-center border-b border-white/10">
                      <h3 className="text-white text-lg font-bold">Filter & Sort</h3>
                      <button onClick={() => setIsFilterDialogOpen(false)} className="p-2 rounded-full hover:bg-white/10">
                        <X className="text-white h-5 w-5" />
                      </button>
                    </div>

                    <div className="p-4 space-y-6">
                      {/* Search */}
                      <div className="bg-white/15 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-3">
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 p-1.5 rounded-full">
                            <Search className="text-white h-4 w-4" />
                          </div>
                          <input
                            placeholder="Search products…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-white/10 text-white placeholder-white/50 pl-12 py-3 text-sm border border-white/20 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/10 rounded-xl"
                          />
                          {search && (
                            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors">
                              <X className="text-white h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Sort */}
                      <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                        <h4 className="text-white font-bold text-sm uppercase mb-3">Sort By</h4>
                        <div className="flex gap-2">
                          <button onClick={() => setNameSort('asc')} className={`flex-1 py-2 px-3 rounded-lg text-center text-sm font-medium ${nameSort === 'asc' ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>A-Z</button>
                          <button onClick={() => setNameSort('desc')} className={`flex-1 py-2 px-3 rounded-lg text-center text-sm font-medium ${nameSort === 'desc' ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>Z-A</button>
                        </div>
                      </div>

                      {/* Product Category */}
                      <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                        <h4 className="text-white font-bold text-sm uppercase mb-3">Product Category</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {(['bond','seal','tape'] as const).map(line => (
                            <button
                              key={line}
                              onClick={() => setSelectedLine(line)}
                              className={`py-2 px-3 rounded-lg text-center text-sm font-medium ${selectedLine === line ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                            >
                              {line}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Chemistry Filter */}
                      {chemistryTypes.length > 0 && (
                        <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                          <h4 className="text-white font-bold text-sm uppercase mb-3">Chemistry</h4>
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
                                  className={`flex items-center justify-between p-2 rounded-lg overflow-hidden ${isSelected ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
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
      )}

      {/* Industry Brochure Section */}
      <div className="relative z-[30]">
        <IndustryBrochureSection industry={industryData.title} />
      </div>

      {/* Chemistries Section - match homepage version */}
      <div className="relative z-[30]">
        <IdealChemistriesSection />
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
              className="relative bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-kallisto font-black text-gray-900">
                    {selectedProduct.name.split('–')[0].trim()}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-full h-48 object-contain rounded-lg bg-gray-50"
                  />
                  
                  <p className="text-gray-600">
                    {selectedProduct.name.split('–')[1]?.trim() || selectedProduct.description}
                  </p>
                  
                  <div className="flex gap-2">
                    <Link
                      to={`/products/${selectedProduct.category?.toLowerCase() || 'bond'}/${selectedProduct.id}`}
                      className="flex-1 bg-[#F2611D] hover:bg-[#E55B1C] text-white rounded-full px-4 py-2 text-sm font-medium transition-colors text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer above footer */}
      <div className="py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 bg-[#1B3764]"></div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default IndustryPage; 