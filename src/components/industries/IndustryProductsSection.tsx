import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Filter, ArrowUpDown, ChevronDown, ChevronUp, FlaskConical } from 'lucide-react';
import { byProductLine } from '@/utils/products';
import { typography } from '@/styles/brandStandards';
import ImageSkeleton from '../common/ImageSkeleton';
import { CHEMISTRY_ICONS, getIndustryLogo, toTitleCase, formatProductName } from '../../utils/industryHelpers';
import { useDrawer } from '@/contexts/DrawerContext';
import SlideInDrawer from '../common/SlideInDrawer';

interface Industry {
  title: string;
  color?: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  industry?: string[];
  chemistry?: string;
}

interface IndustryProductsSectionProps {
  industryData: Industry;
  onProductSelect: (product: Product) => void;
}

const IndustryProductsSection: React.FC<IndustryProductsSectionProps> = ({ 
  industryData, 
  onProductSelect 
}) => {
  const navigate = useNavigate();
  // Filter states
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Empty array = show all
  const [nameSort, setNameSort] = useState<'asc' | 'desc'>('asc');
  const [selectedChemistries, setSelectedChemistries] = useState<string[]>([]);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const { setIsDrawerOpen } = useDrawer();
  const [imageLoadedStates, setImageLoadedStates] = useState<Record<string, boolean>>({});
  const [imageErrorStates, setImageErrorStates] = useState<Record<string, boolean>>({});

  // Update drawer context when drawers open/close
  useEffect(() => {
    setIsDrawerOpen(isSearchDrawerOpen || isFilterDrawerOpen);
  }, [isSearchDrawerOpen, isFilterDrawerOpen, setIsDrawerOpen]);

  // Product loading states - load ALL products by default
  const [allLineProducts, setAllLineProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Load ALL products on mount (not filtered by category)
  useEffect(() => {
    const loadProducts = async () => {
      setProductsLoading(true);
      try {
        // Load all products from all categories
        const [bondProducts, sealProducts, tapeProducts] = await Promise.all([
          byProductLine('bond'),
          byProductLine('seal'),
          byProductLine('tape')
        ]);
        // Combine all products
        setAllLineProducts([...bondProducts, ...sealProducts, ...tapeProducts]);
      } catch (error) {
        console.error('Failed to load products:', error);
        setAllLineProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    loadProducts();
  }, []); // Load once on mount

  // Filter and sort products
  const industryProducts = useMemo(() => {
    if (!industryData) return [];
    
    const industryKey = industryData.title.toLowerCase();
    
    // Filter by industry first
    let filtered = allLineProducts.filter(product => {
      if (!product.industry) return false;
      
      // Handle both array and string industry formats
      const industries = Array.isArray(product.industry) ? product.industry : [product.industry];
      return industries.some(ind => 
        ind.toLowerCase() === industryKey || 
        ind.toLowerCase().includes(industryKey) ||
        industryKey.includes(ind.toLowerCase())
      );
    });

    // Apply category filter - if selectedCategories is empty, show all; otherwise filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => {
        const productCategory = product.category?.toLowerCase();
        return selectedCategories.some(cat => {
          // Map category keys (bond, seal, tape) to product categories
          return productCategory === cat.toLowerCase();
        });
      });
    }

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
  }, [industryData, allLineProducts, selectedCategories, search, selectedChemistries, nameSort]);

  // Helper to get chemistry icon - maps chemistry names to icon paths, falls back to MS icon
  const getChemistryIcon = (chemistry: string): string => {
    // Try exact match first
    if (CHEMISTRY_ICONS[chemistry as keyof typeof CHEMISTRY_ICONS]) {
      return CHEMISTRY_ICONS[chemistry as keyof typeof CHEMISTRY_ICONS];
    }
    // Try case-insensitive match
    const normalized = chemistry.toLowerCase();
    for (const [key, icon] of Object.entries(CHEMISTRY_ICONS)) {
      if (key.toLowerCase() === normalized || key.toLowerCase().includes(normalized) || normalized.includes(key.toLowerCase())) {
        return icon;
      }
    }
    // Fallback to MS icon if no match found
    return CHEMISTRY_ICONS['MS'] || '/images/icons/chemistry/MS icon.svg';
  };

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
  const [categoryCounts, setCategoryCounts] = useState({ bond: 0, seal: 0, tape: 0 });

  useEffect(() => {
    const loadCategoryCounts = async () => {
      if (!industryData) {
        setCategoryCounts({ bond: 0, seal: 0, tape: 0 });
        return;
      }
      
      const industryKey = industryData.title.toLowerCase();
      const counts = { bond: 0, seal: 0, tape: 0 };
      
      // Count all products for each category in this industry
      for (const line of ['bond', 'seal', 'tape'] as const) {
        const products = await byProductLine(line);
        counts[line] = products.filter(product => {
          if (!product.industry) return false;
          const industries = Array.isArray(product.industry) ? product.industry : [product.industry];
          return industries.some(ind => 
            ind.toLowerCase() === industryKey || 
            ind.toLowerCase().includes(industryKey) ||
            industryKey.includes(ind.toLowerCase())
          );
        }).length;
      }
      
      setCategoryCounts(counts);
    };

    loadCategoryCounts();
  }, [industryData]);

  // Image loading handlers
  const handleImageLoad = (productId: string) => {
    setImageLoadedStates(prev => ({ ...prev, [productId]: true }));
    setImageErrorStates(prev => ({ ...prev, [productId]: false }));
  };

  const handleImageError = (productId: string) => {
    setImageLoadedStates(prev => ({ ...prev, [productId]: true }));
    setImageErrorStates(prev => ({ ...prev, [productId]: true }));
  };

  const formattedIndustryTitle = toTitleCase(industryData.title || '');

  return (
    <section className="bg-gray-100 text-gray-900 relative z-[30]" style={{ paddingTop: 'clamp(2rem, 4vw, 4rem)', paddingBottom: 'clamp(2rem, 4vw, 4rem)' }}>
      <div className="max-w-[1600px] mx-auto" style={{ paddingLeft: 'clamp(1rem, 2vw, 2rem)', paddingRight: 'clamp(1rem, 2vw, 2rem)' }}>
        <motion.div 
          className="text-center"
          style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h2 
              className="font-normal font-poppins leading-tight text-[#1b3764] break-words normal-case" 
              style={{ fontSize: 'clamp(22px, 2vw + 0.5rem, 44px)' }}
            >
            {formattedIndustryTitle} Products
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row" style={{ gap: 'clamp(1rem, 2vw, 1.5rem)', marginTop: '0.5rem' }}>
          {/* Filter Sidebar */}
          <aside className="hidden lg:block flex-shrink-0 lg:sticky lg:top-24 lg:self-start" style={{ width: 'clamp(12rem, 15vw, 14rem)' }}>
            {/* Search Bar */}
            <div className="bg-gradient-to-r from-[#477197] to-[#2c476e] rounded-lg shadow-lg border border-gray-300 p-2 mb-3">
              <div className="relative">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 p-1 rounded-full">
                  <Search className="text-white h-3 w-3" />
                </div>
                <input
                  placeholder="Search products…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-white/10 text-white placeholder-white/60 pl-8 py-2 text-xs border border-white/30 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 rounded-lg"
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
            <div className="hidden lg:block bg-gradient-to-r from-[#477197] to-[#2c476e] shadow-lg rounded-lg border border-gray-300 overflow-hidden">
              <div className="p-2.5 border-b border-white/20">
                <h3 className="font-poppins font-regular text-sm text-white" style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                  Filter & Sort
                </h3>
              </div>

              <div className="p-2.5 space-y-3">
                {/* Product Category (Adhesives/Sealants/Tapes) - Toggleable */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-white">Product Category</h4>
                    {selectedCategories.length > 0 && (
                      <button
                        onClick={() => setSelectedCategories([])}
                        className="text-xs text-white hover:text-white/80 bg-white/10 hover:bg-white/20 py-0.5 px-1.5 rounded-md"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {([
                      { key: 'bond', label: 'Adhesives' },
                      { key: 'seal', label: 'Sealants' },
                      { key: 'tape', label: 'Tapes' }
                    ] as const).map(({ key, label }) => {
                      const isSelected = selectedCategories.includes(key);
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            if (isSelected) {
                              // Remove from selection
                              setSelectedCategories(selectedCategories.filter(cat => cat !== key));
                            } else {
                              // Add to selection
                              setSelectedCategories([...selectedCategories, key]);
                            }
                          }}
                          className={`w-full flex items-center justify-between p-1.5 rounded-md transition-all overflow-hidden ${
                            isSelected ? 'bg-[#F2611D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span className="text-xs font-medium">{label}</span>
                          <span className="text-xs opacity-70">({categoryCounts[key] || 0})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name Sort */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <ArrowUpDown className="text-white h-3 w-3 mr-1.5" />
                    <h4 className="text-xs font-semibold text-white">Sort By Name</h4>
                  </div>

                  <div className="flex rounded-md overflow-hidden">
                    <button
                      onClick={() => setNameSort('asc')}
                      className={`flex-1 flex items-center justify-center gap-1 py-1.5 transition-all ${nameSort === 'asc' ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      <ChevronUp className="h-3 w-3" />
                      <span className="text-xs font-medium">A-Z</span>
                    </button>

                    <button
                      onClick={() => setNameSort('desc')}
                      className={`flex-1 flex items-center justify-center gap-1 py-1.5 transition-all ${nameSort === 'desc' ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      <ChevronDown className="h-3 w-3" />
                      <span className="text-xs font-medium">Z-A</span>
                    </button>
                  </div>
                </div>

                {/* Chemistry Filter */}
                {chemistryTypes.length > 0 && (
                  <div className="space-y-2 border-t border-white/20 pt-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FlaskConical className="text-white h-3 w-3 mr-1.5" />
                        <h4 className="text-xs font-semibold text-white">Chemistry</h4>
                      </div>
                      {selectedChemistries.length > 0 && (
                        <button
                          onClick={() => setSelectedChemistries([])}
                          className="text-xs text-white hover:text-white/80 bg-white/10 hover:bg-white/20 py-0.5 px-1.5 rounded-md"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
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
                            className={`w-full flex items-center justify-between p-2 rounded-md transition-all overflow-hidden border ${
                              isSelected ? 'bg-[#F2611D] text-white shadow-lg border-[#F2611D]' : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-md border-white/20'
                            } ${count === 0 && !isSelected ? 'opacity-50' : ''}`}
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1 text-left">
                              <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                                <img 
                                  src={getChemistryIcon(chemistry)} 
                                  alt={chemistry}
                                  className="w-6 h-6 object-contain chemistry-icon"
                                  onError={(e) => {
                                    // Fallback to MS icon if image fails to load
                                    e.currentTarget.src = CHEMISTRY_ICONS['MS'] || '/images/icons/chemistry/MS icon.svg';
                                  }}
                                />
                              </div>
                              <span className="text-xs font-medium break-words whitespace-normal leading-snug">
                                {chemistry.replace(/_/g, ' ')}
                              </span>
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

          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Results Info with Icons - Mobile Only */}
            <div className="flex items-center justify-center mb-6 relative lg:hidden">
              {/* Left: Search and Filter Icons - Paired closer together */}
              <div className="flex items-center gap-1 absolute left-0 z-10">
                <button
                  onClick={() => setIsSearchDrawerOpen(true)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-[#1B3764]" />
                </button>
                <button
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Filter"
                >
                  <Filter className="w-5 h-5 text-[#1B3764]" />
                </button>
              </div>

              {/* Center: Products Found Badge - Orange with white text, center-aligned */}
              <div className="bg-[#F2611D] px-4 py-1.5 rounded-full relative z-20">
                <p className="text-sm text-white font-poppins font-medium">
                  <span className="font-semibold">{industryProducts.length}</span> products found
                </p>
              </div>
            </div>

            {/* Results Info - Desktop Only */}
            <div className="hidden lg:flex justify-between items-center mb-6">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4" style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
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
                        className="relative overflow-hidden transition-all duration-500 hover:scale-[1.02] h-[280px] md:h-[340px] rounded-xl md:rounded-2xl bg-gradient-to-b from-[#477197] to-[#2c476e] border border-gray-200 hover:border-gray-300 shadow-lg flex flex-col"
                      >
                        {/* Product Image - Same layout for mobile and desktop */}
                        <div 
                          className="flex-1 relative pb-16 md:pb-24 cursor-pointer" 
                          style={{ transform: 'translateY(-3%) scale(0.85)' }}
                          onClick={() => navigate(`/products/${product.category?.toLowerCase() || 'bond'}/${product.id}`)}
                        >
                          {(!imageLoadedStates[product.id] || imageErrorStates[product.id]) && (
                            <ImageSkeleton />
                          )}
                          
                          {!imageErrorStates[product.id] && (
                            <img 
                              src={product.imageUrl} 
                              alt={product.name}
                              className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-105 ${
                                imageLoadedStates[product.id] ? 'opacity-100' : 'opacity-0'
                              }`}
                              onLoad={() => handleImageLoad(product.id)}
                              onError={() => handleImageError(product.id)}
                            />
                          )}
                        </div>

                        {/* Content Section with title and description - Same for mobile and desktop */}
                        <div className="p-2.5 absolute bottom-0 left-0 right-0">
                          <div className="space-y-0.5">
                            <h3 className="text-sm font-poppins font-bold leading-tight line-clamp-2 text-white">
                              {formatProductName(product.name || '')}
                            </h3>
                            
                            {/* Button Row */}
                            <div className="flex gap-1.5 mt-2 pt-2">
                              {/* Details Button */}
                              <Link
                                to={`/products/${product.category?.toLowerCase() || 'bond'}/${product.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 inline-flex items-center justify-center bg-[#F2611D] hover:bg-[#d9551a] text-white rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300"
                              >
                                Details
                              </Link>
                            </div>
                          </div>
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
                    setSelectedCategories([]);
                  }}
                  className="px-4 md:px-5 py-2 md:py-2.5 bg-[#F2611D] hover:bg-[#d9551a] text-white rounded-full text-xs sm:text-sm font-normal font-poppins transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Drawer */}
        <SlideInDrawer
          isOpen={isSearchDrawerOpen}
          onClose={() => setIsSearchDrawerOpen(false)}
          title="Search"
          side="right"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-[#1B3764] px-10 py-3 rounded-lg text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
        </SlideInDrawer>

        {/* Filter Drawer */}
        <SlideInDrawer
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          title="Filter & Settings"
          side="right"
        >
          <div className="space-y-4">
            {/* Sort */}
            <div>
              <h4 className="text-sm font-poppins font-semibold text-gray-700 mb-2">Sort By Name</h4>
              <div className="flex gap-2">
                <button 
                  onClick={() => setNameSort('asc')} 
                  className={`flex-1 py-1.5 px-2.5 rounded-lg text-center text-sm font-medium transition-all ${
                    nameSort === 'asc' ? 'bg-[#F2611D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  A-Z
                </button>
                <button 
                  onClick={() => setNameSort('desc')} 
                  className={`flex-1 py-1.5 px-2.5 rounded-lg text-center text-sm font-medium transition-all ${
                    nameSort === 'desc' ? 'bg-[#F2611D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Z-A
                </button>
              </div>
            </div>

            {/* Product Category */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-poppins font-semibold text-gray-700">Product Category</h4>
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="text-xs text-gray-600 hover:text-gray-800"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-1.5">
                {([
                  { key: 'bond', label: 'Adhesives' },
                  { key: 'seal', label: 'Sealants' },
                  { key: 'tape', label: 'Tapes' }
                ] as const).map(({ key, label }) => {
                  const isSelected = selectedCategories.includes(key);
                  const count = categoryCounts[key] || 0;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedCategories(selectedCategories.filter(cat => cat !== key));
                        } else {
                          setSelectedCategories([...selectedCategories, key]);
                        }
                      }}
                      className={`w-full flex items-center justify-between p-1.5 rounded-lg transition-all ${
                        isSelected ? 'bg-[#F2611D] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-xs font-medium">{label}</span>
                      <span className="text-xs opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chemistry Filter */}
            {chemistryTypes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-poppins font-semibold text-gray-700">Chemistry</h4>
                  {selectedChemistries.length > 0 && (
                    <button
                      onClick={() => setSelectedChemistries([])}
                      className="text-xs text-gray-600 hover:text-gray-800"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-1.5">
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
                        className={`w-full flex items-center justify-between p-1.5 rounded-lg transition-all ${
                          isSelected ? 'bg-[#F2611D] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        } ${count === 0 && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                            <img 
                              src={getChemistryIcon(chemistry)} 
                              alt={chemistry}
                              className="w-5 h-5 object-contain chemistry-icon"
                              onError={(e) => {
                                e.currentTarget.src = CHEMISTRY_ICONS['MS'] || '/images/icons/chemistry/MS icon.svg';
                              }}
                            />
                          </div>
                          <span className="text-xs font-medium truncate">{chemistry.replace(/_/g, ' ')}</span>
                        </div>
                        <span className="text-xs opacity-70 flex-shrink-0">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </SlideInDrawer>
      </div>
    </section>
  );
};

export default IndustryProductsSection;

