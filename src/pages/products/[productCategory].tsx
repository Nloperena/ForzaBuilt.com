import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUpDown, ExternalLink, X, ChevronDown, ChevronUp, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Anchor, Factory, Car, Building, Package, Layers, Snowflake } from 'lucide-react';
import { industries as industriesData } from '@/data/industries';
import { byProductLine, getProduct } from '@/utils/products';
import { brandColors, productColors, industryColors, typography } from '@/styles/brandStandards';

// Chemistry icon paths
const CHEMISTRY_ICONS = {
  epoxy: '/chemistry-icons/Epoxy icon.svg',
  silicone: '/chemistry-icons/Silicone icon.svg',
  ms: '/chemistry-icons/MS icon.svg',
  waterbase: '/chemistry-icons/Waterbase icon.svg'
};
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DynamicMetaTags from '@/components/DynamicMetaTags';

// Helper to get industry logo from navbar data
const getIndustryLogo = (industry: string | string[]) => {
  // Handle both string and array inputs - use first industry if array
  const industryStr = Array.isArray(industry) ? industry[0] || '' : industry;
  const industryData = industriesData.find(ind => 
    ind.title.toLowerCase() === industryStr.toLowerCase()
  );
  return industryData?.logo || null;
};

// Helper to get product category image from navbar data
const getProductCategoryImage = (category: string) => {
  const categoryLower = category.toLowerCase();
  switch (categoryLower) {
    case 'bond':
      return '/src/assets/images/Canister System.png';
    case 'seal':
      return '/src/assets/images/OS2 Cartridge Hero.png';
    case 'tape':
      return '/src/assets/images/Tape Heroic Image.png';
    default:
      return null;
  }
};

// Helper to get category gradient colors
const getCategoryGradient = (category: string) => {
  const categoryLower = category.toLowerCase();
  switch (categoryLower) {
    case 'bond':
      return 'from-[#F16022] via-[#D35127] to-[#1B3764]';
    case 'seal':
      return 'from-[#faaf40] via-[#f4c430] to-[#1B3764]';
    case 'tape':
      return 'from-[#d1181f] via-[#b3141a] to-[#1B3764]';
    case 'ruggedred':
      return 'from-[#e53935] via-[#c62828] to-[#1B3764]';
    default:
      return 'from-[#1B3764] via-[#09668D] to-[#1B3764]';
  }
};

// Industry benefits removed as requested

// Brand colors for categories using official brand standards
const categoryColor = (cat: string) => {
  switch (cat) {
    case 'BOND':
      return `from-[${productColors.bond.primary}] to-[${brandColors.secondary.rustyNailOrange.hex}]`;
    case 'SEAL':
      return `from-[${productColors.seal.primary}] to-[#f4c430]`;
    case 'TAPE':
      return 'from-[#d1181f] to-[#b3141a]'; // More vibrant red gradient
    default:
      return `from-[${brandColors.secondary.slateGrey.hex}] to-[${brandColors.secondary.ironGrey.hex}]`;
  }
};

// Industry colors using vertical gradients with more industry color at bottom
const industryColor = (industry: string | string[]) => {
  // Handle both string and array inputs - use first industry if array
  const industryStr = Array.isArray(industry) ? industry[0] || '' : industry;
  const industryLower = industryStr.toLowerCase();
  const brandBlue = '#1b3764'; // Forza brand blue
  
  // Use gradients with 70% blue and 30% industry color
  switch (industryLower) {
    case 'marine':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#137875]`; // 70% blue, 30% Marine teal
    case 'industrial':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#f16a26]`; // 70% blue, 30% Industrial orange
    case 'transportation':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#b83d35]`; // 70% blue, 30% Transportation red
    case 'construction':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#fec770]`; // 70% blue, 30% Construction yellow
    // case 'foam':
    //   return `from-[${brandBlue}] via-[${brandBlue}] to-[#7a6fb0]`; // 70% blue, 30% Foam purple
    case 'composites':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#c7c8c9]`; // 70% blue, 30% Composites gray
    case 'insulation':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#d0157d]`; // 70% blue, 30% Insulation pink
    default:
      return `from-[${brandBlue}] to-[${brandBlue}]`; // Default blue
  }
};

// Helper to get chemistry icon
const getChemistryIcon = (chemistry: string) => {
  if (!chemistry) return null;
  
  const chemistryLower = chemistry.toLowerCase();
  if (chemistryLower.includes('epoxy')) {
    return CHEMISTRY_ICONS.epoxy;
  } else if (chemistryLower.includes('silicone')) {
    return CHEMISTRY_ICONS.silicone;
  } else if (chemistryLower.includes('ms') || chemistryLower.includes('hybrid')) {
    return CHEMISTRY_ICONS.ms;
  } else if (chemistryLower.includes('water')) {
    return CHEMISTRY_ICONS.waterbase;
  }
  return null;
};

const ProductCategoryPage: React.FC = () => {
  const { productCategory } = useParams<{ productCategory: string }>();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(['industrial']);
  const [nameSort, setNameSort] = useState<'asc' | 'desc'>('asc');
  const [selectedChemistries, setSelectedChemistries] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [visibleProductCount, setVisibleProductCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  // Get products for this category
  const categoryProducts = useMemo(() => {
    // Get products for this category - byProductLine already filters by category
    return byProductLine(productCategory as 'bond' | 'seal' | 'tape');
  }, [productCategory]);

  // Get unique industries for this category
  const industries = useMemo(() => {
    const unique = new Set<string>();
    categoryProducts.forEach(p => {
      if (p.industry && Array.isArray(p.industry)) {
        p.industry.forEach(ind => unique.add(ind.toLowerCase()));
      }
    });
    return Array.from(unique).sort();
  }, [categoryProducts]);
  
  // Get unique chemistry types for this category
  const chemistryTypes = useMemo(() => {
    const unique = new Set<string>(
      categoryProducts
        .filter(p => p.chemistry) // Filter out products without chemistry
        .filter(p => {
          // Exclude Acrylic (incl. PSA) from BOND and SEAL categories
          if (productCategory !== 'tape' && p.chemistry === 'Acrylic (incl. PSA)') {
            return false;
          }
          return true;
        })
        .map(p => p.chemistry!)
    );
    return Array.from(unique).sort();
  }, [categoryProducts, productCategory]);

  // Dynamic counts based on current filter context
  const dynamicCounts = useMemo(() => {
    const byIndustry: Record<string, number> = {};
    const byChemistry: Record<string, number> = {};
    
    categoryProducts.forEach(p => {
      const matchesSearch = !search || 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.description.toLowerCase().includes(search.toLowerCase());
        
      // For industry counts, apply chemistry filters but not industry filters
      const matchesChemistryFilter = selectedChemistries.length === 0 || 
        (p.chemistry && selectedChemistries.includes(p.chemistry));
      
      if (matchesSearch && matchesChemistryFilter) {
        if (p.industry && Array.isArray(p.industry)) {
          p.industry.forEach(ind => {
            const industry = ind.toLowerCase();
            byIndustry[industry] = (byIndustry[industry] || 0) + 1;
          });
        }
      }
      
      // For chemistry counts, apply industry filters but not chemistry filters
      const matchesIndustryFilter = selectedIndustries.length === 0 || 
        (p.industry && Array.isArray(p.industry) && 
         p.industry.some(ind => selectedIndustries.includes(ind.toLowerCase())));
      
      if (matchesSearch && matchesIndustryFilter && p.chemistry) {
        // Exclude Acrylic (incl. PSA) from chemistry counts on BOND and SEAL pages
        if (productCategory === 'tape' || p.chemistry !== 'Acrylic (incl. PSA)') {
          byChemistry[p.chemistry] = (byChemistry[p.chemistry] || 0) + 1;
        }
      }
    });
    
    return { byIndustry, byChemistry };
  }, [categoryProducts, selectedIndustries, selectedChemistries, search]);

  // Reset visible product count when filters change
  useEffect(() => {
    setVisibleProductCount(12);
  }, [selectedIndustries, selectedChemistries, search, nameSort]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    // Apply all filters
    let filtered = categoryProducts.filter(product => {
      // Industry filter - match if any selected industry matches or none selected
      const matchIndustry = selectedIndustries.length === 0 || 
        (product.industry && Array.isArray(product.industry) && 
         product.industry.some(ind => selectedIndustries.includes(ind.toLowerCase())));
      
      // Search filter
      const matchSearch = !search || 
        product.name.toLowerCase().includes(search.toLowerCase()) || 
        product.description.toLowerCase().includes(search.toLowerCase());
      
      // Chemistry filter - only apply for non-tape categories
      // For tapes, always return true for chemistry filter
      const matchChemistry = productCategory === 'tape' || 
        selectedChemistries.length === 0 || 
        (product.chemistry && selectedChemistries.includes(product.chemistry));
      
      // Product must match all active filters
      return matchIndustry && matchSearch && matchChemistry;
    });

    // Apply sorting (only by name, ascending or descending)
    filtered.sort((a, b) => {
      return nameSort === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    });

    return filtered;
  }, [categoryProducts, selectedIndustries, selectedChemistries, search, nameSort]);

  // Modal handlers
  const openProductModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (!productCategory) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#1b3764] flex flex-col">
      <DynamicMetaTags
        title={`${productCategory.charAt(0).toUpperCase() + productCategory.slice(1).toLowerCase()} Products`}
        description={`Discover our premium ${productCategory.toLowerCase()} solutions engineered for performance and reliability across all industries.`}
        url={`/products/${productCategory}`}
        type="website"
      />
      <Header />
      <main className="flex-1 pt-16 md:pt-20 pb-10">
        {/* Hero Section */}
        <section className={`relative py-20 mb-12 bg-gradient-to-br ${getCategoryGradient(productCategory)}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm font-medium uppercase tracking-wider">
                    {productCategory.toUpperCase()} SOLUTIONS
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-kallisto font-black mb-6 leading-tight">
                  {productCategory.charAt(0).toUpperCase() + productCategory.slice(1).toLowerCase()}
                </h1>

                <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                  Discover our premium {productCategory.toLowerCase()} solutions engineered for performance and reliability across all industries.
                </p>
              </div>

              {/* Category Image */}
              {getProductCategoryImage(productCategory) && (
                <div className="flex justify-center lg:justify-end">
                  <img 
                    src={getProductCategoryImage(productCategory)} 
                    alt={`${productCategory} Category`}
                    className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
          {/* Amazon-style Layout with Sidebar Filter and Product Grid */}
          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* Sidebar Filters - Hidden on Mobile, Visible on Desktop */}
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

              {/* Filter Panel - Desktop Sidebar */}
              <div className="hidden lg:block bg-white/10 backdrop-blur-md shadow-lg rounded-xl border border-white/20 overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h3 className="font-kallisto font-bold text-lg text-white" 
                      style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                    Filter & Sort
                  </h3>
                </div>
                
                <div className="p-4 space-y-6">
                  {/* Name Sort Section */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <ArrowUpDown className="text-white/90 h-4 w-4 mr-2" />
                      <h4 className="text-sm font-semibold text-white/90">Sort By Name</h4>
                    </div>
                    
                    <div className="flex rounded-lg overflow-hidden">
                      <button
                        onClick={() => setNameSort('asc')}
                        className={`flex-1 flex items-center justify-center gap-1 py-2 transition-all ${
                          nameSort === 'asc' 
                            ? 'bg-[#F2611D] text-white' 
                            : 'bg-[#3f5275]/70 text-white/80 hover:bg-[#3f5275]'
                        }`}
                      >
                        <ChevronUp className={`h-3 w-3 ${nameSort === 'asc' ? 'text-white' : 'text-white/70'}`} />
                        <span className="text-xs font-medium">A-Z</span>
                      </button>
                      
                      <button
                        onClick={() => setNameSort('desc')}
                        className={`flex-1 flex items-center justify-center gap-1 py-2 transition-all ${
                          nameSort === 'desc' 
                            ? 'bg-[#F2611D] text-white' 
                            : 'bg-[#3f5275]/70 text-white/80 hover:bg-[#3f5275]'
                        }`}
                      >
                        <ChevronDown className={`h-3 w-3 ${nameSort === 'desc' ? 'text-white' : 'text-white/70'}`} />
                        <span className="text-xs font-medium">Z-A</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Industry Filter */}
                  <div className="space-y-3 border-t border-white/10 pt-5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Building className="text-white/90 h-4 w-4 mr-2" />
                        <h4 className="text-sm font-semibold text-white/90">Industry</h4>
                      </div>
                      {selectedIndustries.length > 0 && (
                        <button 
                          onClick={() => setSelectedIndustries([])}
                          className="text-xs text-white/80 hover:text-white bg-[#3f5275]/70 hover:bg-[#3f5275] py-1 px-2 rounded-md"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                      {industries.map(ind => {
                        const isSelected = selectedIndustries.includes(ind);
                        const count = dynamicCounts.byIndustry[ind] || 0;
                        const industryLogo = getIndustryLogo(ind);
                        
                        return (
                          <button
                            key={ind}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedIndustries(selectedIndustries.filter(i => i !== ind));
                              } else {
                                setSelectedIndustries([...selectedIndustries, ind]);
                              }
                            }}
                            disabled={count === 0 && !isSelected}
                            className={`w-full flex items-center justify-between p-2 rounded-lg transition-all overflow-hidden ${
                              isSelected 
                                ? 'bg-[#F2611D] text-white' 
                                : 'bg-[#3f5275]/40 text-white/90 hover:bg-[#3f5275]/60'
                            } ${count === 0 && !isSelected ? 'opacity-50' : ''}`}
                          >
                                                      <div className="flex items-center gap-2 min-w-0 flex-1">
                                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                                  {industryLogo ? (
                                    <img src={industryLogo} alt={ind} className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                                  ) : (
                                    <Building className="w-4 h-4 text-white" />
                                  )}
                                </div>
                                <span className="text-xs xl:text-sm font-medium capitalize truncate">{ind}</span>
                              </div>
                            <span className="text-xs opacity-70">({count})</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Chemistry Filter - Only shown for non-tape categories */}
                  {productCategory !== 'tape' && (
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
                          const count = dynamicCounts.byChemistry[chemistry] || 0;
                          const chemIcon = getChemistryIcon(chemistry);
                          
                          return (
                            <button
                              key={chemistry}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedChemistries(selectedChemistries.filter(c => c !== chemistry));
                                } else {
                                  setSelectedChemistries([...selectedChemistries, chemistry]);
                                }
                              }}
                              disabled={count === 0 && !isSelected}
                              className={`w-full flex items-center justify-between p-2 rounded-lg transition-all overflow-hidden ${
                                isSelected 
                                  ? 'bg-[#F2611D] text-white' 
                                  : 'bg-[#3f5275]/40 text-white/90 hover:bg-[#3f5275]/60'
                              } ${count === 0 && !isSelected ? 'opacity-50' : ''}`}
                            >
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                                  {chemIcon ? (
                                    <img src={chemIcon} alt={chemistry} className="w-5 h-5 object-contain chemistry-icon" />
                                  ) : (
                                    <FlaskConical className="w-4 h-4 text-white" />
                                  )}
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
              {/* Results Info - Glassmorphic Badge */}
              <div className="flex justify-between items-center mb-6">
                <div className="bg-[#3f5275]/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-sm">
                  <p className="text-sm text-white/90">
                    <span className="font-semibold text-white">
                      {isLoading ? (
                        <span className="inline-flex items-center">
                          <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {Math.min(visibleProductCount, filteredProducts.length)}
                        </span>
                      ) : (
                        Math.min(visibleProductCount, filteredProducts.length)
                      )}
                    </span> of {filteredProducts.length} found ({categoryProducts.length} total)
                    {selectedIndustries.length > 0 && (
                      <span className="hidden sm:inline"> • <span className="font-semibold text-white">{selectedIndustries.length}</span> {selectedIndustries.length === 1 ? 'industry' : 'industries'}</span>
                    )}
                    {productCategory !== 'tape' && selectedChemistries.length > 0 && (
                      <span className="hidden sm:inline"> • <span className="font-semibold text-white">{selectedChemistries.length}</span> {selectedChemistries.length === 1 ? 'chemistry' : 'chemistries'}</span>
                    )}
                  </p>
                </div>
                
                {/* Mobile Sort Button */}
                <button className="lg:hidden bg-[#3f5275]/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                  <ArrowUpDown className="text-white h-5 w-5" />
                </button>
              </div>

              {/* Product Grid - Responsive with Progressive Loading */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.slice(0, Math.min(filteredProducts.length, visibleProductCount)).map((product, idx) => (
                  <motion.div
                    key={`${product.id}-${idx}-${selectedIndustries.join(',')}-${search}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.3) }}
                    className="group"
                  >
                    <div className="relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] cursor-pointer h-32 md:h-[500px] rounded-2xl md:rounded-3xl bg-gradient-to-r md:bg-gradient-to-b from-[#1b3764] via-[#1b3764] to-[#f16a26]">
                      {/* Background Image - Desktop Only */}
                      <div className="absolute inset-0 hidden md:block">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex md:flex-col justify-between p-4 md:p-6 text-white">
                        {/* Mobile: Left side with image and basic info */}
                        <div className="flex md:hidden items-center gap-4 flex-1">
                          {/* Mobile: Product Image */}
                          <div className="w-20 h-20 md:hidden rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Mobile: Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base md:text-lg font-kallisto font-black mb-1 leading-tight line-clamp-1 md:truncate">
                              {product.name.split('–')[0].trim()}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-300 line-clamp-2">
                              {product.name.split('–')[1]?.trim() || product.description}
                            </p>
                            {/* Mobile: Industry Badge */}
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-[#1b3764] via-[#1b3764] to-[#f16a26] text-white text-xs font-bold uppercase tracking-wide mt-2">
                              {getIndustryLogo(product.industry?.[0] || '') ? (
                                <img 
                                  src={getIndustryLogo(product.industry?.[0] || '')} 
                                  alt={`${product.industry?.[0] || ''} icon`}
                                  className="h-4 w-4 md:h-5 md:w-5 object-contain"
                                />
                              ) : (
                                <span className="capitalize">{product.industry?.[0]?.charAt(0) || ''}</span>
                              )}
                              <span className="capitalize text-xs">{product.industry?.[0] || ''}</span>
                            </div>
                          </div>
                        </div>

                        {/* Desktop: Top Section */}
                        <div className="hidden md:flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#1b3764] via-[#1b3764] to-[#f16a26] text-white text-xs font-bold uppercase tracking-wide flex items-center gap-1">
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
                        </div>

                        {/* Desktop: Middle Section */}
                        <div className="hidden md:flex flex-1 flex-col justify-end gap-4">
                          <div>
                            <h3 className="text-xl md:text-2xl font-kallisto font-black mb-2 leading-tight line-clamp-2">
                              {product.name.split('–')[0].trim()}
                            </h3>
                            <p className="text-sm md:text-base text-gray-200 line-clamp-3">
                              {product.name.split('–')[1]?.trim() || product.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            {/* View Details Button */}
                            <Link
                              to={`/products/${productCategory}/${product.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-2 bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                            >
                              <span>Details</span>
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                            
                            {/* Datasheet Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Check if TDS files are available
                                const tdsLink = product.standardTdsLink || product.pdfLinks?.[0];
                                if (tdsLink && tdsLink.startsWith('/TDS/')) {
                                  // TDS files are temporarily unavailable
                                  toast({
                                    title: "TDS Temporarily Unavailable",
                                    description: "Technical Data Sheets are temporarily unavailable. Please contact us for product information.",
                                    variant: "destructive",
                                  });
                                } else if (tdsLink) {
                                  // External link or other PDF
                                  window.location.href = `/pdf-viewer/${encodeURIComponent(tdsLink)}`;
                                } else {
                                  toast({
                                    title: "Datasheet not available",
                                    description: "The datasheet for this product is not available yet.",
                                    variant: "destructive",
                                  });
                                }
                              }}
                              className="flex items-center gap-2 bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                            >
                              <span>Datasheet</span>
                              <ExternalLink className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Mobile: Right side with buttons */}
                        <div className="flex md:hidden items-center gap-2">
                          {/* Mobile: View Details Button */}
                          <Link
                            to={`/products/${productCategory}/${product.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300"
                          >
                            <span>Details</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </Link>
                          
                          {/* Mobile: Datasheet Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Check if TDS files are available
                              const tdsLink = product.standardTdsLink || product.pdfLinks?.[0];
                              if (tdsLink && tdsLink.startsWith('/TDS/')) {
                                // TDS files are temporarily unavailable
                                toast({
                                  title: "TDS Temporarily Unavailable",
                                  description: "Technical Data Sheets are temporarily unavailable. Please contact us for product information.",
                                  variant: "destructive",
                                });
                              } else if (tdsLink) {
                                // External link or other PDF
                                window.location.href = `/pdf-viewer/${encodeURIComponent(tdsLink)}`;
                              } else {
                                toast({
                                  title: "Datasheet not available",
                                  description: "The datasheet for this product is not available yet.",
                                  variant: "destructive",
                                });
                              }
                            }}
                            className="flex items-center gap-1 bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300"
                          >
                            <span>PDF</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg mb-2">No products match your criteria.</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          )}

          {/* Product Modal with Wipe Animation - Mobile Optimized */}
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
                
                {/* Modal Content with Wipe Animation - Mobile Optimized */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 50 }}
                  transition={{ 
                    type: "spring", 
                    damping: 25, 
                    stiffness: 300,
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94] // Custom bezier curve
                  }}
                  className={`relative rounded-2xl md:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden bg-gradient-to-b ${industryColor(selectedProduct.industry)}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Wipe Animation Overlay */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.25, 0.46, 0.45, 0.94], // Custom bezier curve
                      delay: 0.1
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 pointer-events-none"
                  />
                  
                  {/* Modal Header - Mobile Optimized */}
                  <div className="relative p-4 md:p-6 border-b border-white/20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
                          <Badge className={`bg-white/20 backdrop-blur-sm text-white border border-white/30 text-xs`}>
                            {selectedProduct.category}
                          </Badge>
                          <Badge className={`bg-white/20 backdrop-blur-sm text-white border border-white/30 flex items-center gap-1 text-xs`}>
                            {getIndustryLogo(selectedProduct.industry) ? (
                              <img 
                                src={getIndustryLogo(selectedProduct.industry)} 
                                alt={`${selectedProduct.industry} icon`}
                                className="h-3 md:h-4 w-3 md:w-4 object-contain"
                              />
                            ) : (
                              <span className="capitalize">{selectedProduct.industry.charAt(0)}</span>
                            )}
                            <span className="capitalize">{selectedProduct.industry}</span>
                          </Badge>
                        </div>
                        <h2 className="text-lg md:text-2xl font-kallisto font-black text-white line-clamp-2" 
                            style={{ fontFamily: typography.products.fontFamily, fontWeight: typography.products.fontWeight }}>
                          {selectedProduct.name}
                        </h2>
                      </div>
                      <button
                        onClick={closeModal}
                        className="ml-2 md:ml-4 p-1.5 md:p-2 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <X className="h-5 md:h-6 w-5 md:w-6 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Content - Mobile Optimized */}
                  <div className="p-4 md:p-6 max-h-[70vh] md:max-h-[60vh] overflow-y-auto bg-white/10 backdrop-blur-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                      {/* Product Image - Mobile Optimized */}
                      <div className="space-y-3 md:space-y-4">
                        <img 
                          src={selectedProduct.imageUrl || selectedProduct.image} 
                          alt={selectedProduct.name}
                          className="w-full h-[300px] md:h-[500px] object-contain rounded-xl md:rounded-2xl shadow-lg bg-white/10"
                        />
                        <p className="text-white/90 text-sm md:text-base" 
                           style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                          {selectedProduct.description}
                        </p>
                      </div>

                      {/* Product Details - Mobile Optimized */}
                      <div className="space-y-4 md:space-y-6">
                        {/* Basic Specifications */}
                        {selectedProduct.specifications && (
                          <div>
                            <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3" 
                                style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                              Key Specifications
                            </h3>
                            <div className="space-y-1 md:space-y-2">
                              {selectedProduct.specifications.type && (
                                <div className="flex justify-between py-1.5 md:py-2 border-b border-white/20">
                                  <span className="font-medium text-white/90 text-sm">Type:</span>
                                  <span className="text-white/80 text-sm text-right">{selectedProduct.specifications.type}</span>
                                </div>
                              )}
                              {selectedProduct.specifications.viscosity && (
                                <div className="flex justify-between py-1.5 md:py-2 border-b border-white/20">
                                  <span className="font-medium text-white/90 text-sm">Viscosity:</span>
                                  <span className="text-white/80 text-sm text-right">{selectedProduct.specifications.viscosity}</span>
                                </div>
                              )}
                              {selectedProduct.specifications.potLife && (
                                <div className="flex justify-between py-1.5 md:py-2 border-b border-white/20">
                                  <span className="font-medium text-white/90 text-sm">Pot Life:</span>
                                  <span className="text-white/80 text-sm text-right">{selectedProduct.specifications.potLife}</span>
                                </div>
                              )}
                              {selectedProduct.specifications.cureTime && (
                                <div className="flex justify-between py-1.5 md:py-2 border-b border-white/20">
                                  <span className="font-medium text-white/90 text-sm">Cure Time:</span>
                                  <span className="text-white/80 text-sm text-right">{selectedProduct.specifications.cureTime}</span>
                                </div>
                              )}
                              {selectedProduct.specifications.temperatureRange && (
                                <div className="flex justify-between py-1.5 md:py-2 border-b border-white/20">
                                  <span className="font-medium text-white/90 text-sm">Temperature Range:</span>
                                  <span className="text-white/80 text-sm text-right">{selectedProduct.specifications.temperatureRange}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Applications */}
                        {selectedProduct.specifications?.applications && (
                          <div>
                            <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3" 
                                style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                              Applications
                            </h3>
                            <div className="flex flex-wrap gap-1 md:gap-2">
                              {selectedProduct.specifications.applications.slice(0, 4).map((app, index) => (
                                <Badge key={index} className="bg-white/20 backdrop-blur-sm text-white text-xs border border-white/30">
                                  {app}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Features */}
                        {selectedProduct.specifications?.features && (
                          <div>
                            <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3" 
                                style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                              Key Features
                            </h3>
                            <div className="flex flex-wrap gap-1 md:gap-2">
                              {selectedProduct.specifications.features.slice(0, 4).map((feature, index) => (
                                <Badge key={index} variant="outline" className="border-white/30 text-white text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Technical Data */}
                        {selectedProduct.technicalData && (
                          <div>
                            <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3" 
                                style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                              Technical Data
                            </h3>
                            <div className="space-y-1 md:space-y-2">
                              {selectedProduct.technicalData.density && (
                                <div className="flex justify-between py-1.5 md:py-2 border-b border-white/20">
                                  <span className="font-medium text-white/90 text-sm">Density:</span>
                                  <span className="text-white/80 text-sm text-right">{selectedProduct.technicalData.density}</span>
                                </div>
                              )}
                              {selectedProduct.technicalData.shelfLife && (
                                <div className="flex justify-between py-1.5 md:py-2 border-b border-white/20">
                                  <span className="font-medium text-white/90 text-sm">Shelf Life:</span>
                                  <span className="text-white/80 text-sm text-right">{selectedProduct.technicalData.shelfLife}</span>
                                </div>
                              )}
                              {selectedProduct.technicalData.storageConditions && (
                                <div className="flex justify-between py-1.5 md:py-2 border-b border-white/20">
                                  <span className="font-medium text-white/90 text-sm">Storage:</span>
                                  <span className="text-white/80 text-sm text-right">{selectedProduct.technicalData.storageConditions}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
            </div>
          </div>
        </div>

                  {/* Modal Footer - Mobile Optimized */}
                  <div className="p-4 md:p-6 border-t border-white/20 bg-white/10 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
                      <div className="flex items-center gap-2 md:gap-3">
                        {/* Industry Icon */}
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 md:p-2 border border-white/30">
                          {getIndustryLogo(selectedProduct.industry) ? (
                            <img 
                              src={getIndustryLogo(selectedProduct.industry)} 
                              alt={`${selectedProduct.industry} icon`}
                              className="h-4 md:h-6 w-4 md:w-6 object-contain"
                            />
                          ) : (
                            <span className="text-white font-bold text-xs md:text-sm">{selectedProduct.industry.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="text-xs md:text-sm text-white/70">
                          Product ID: {selectedProduct.id.toUpperCase()}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
                        <Link
                          to={`/products/${selectedProduct.category.toLowerCase()}/${selectedProduct.id}`}
                          className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-4 md:px-6 py-2 md:py-3 transition-colors text-sm md:text-base text-center"
                        >
                          View Full Details
                        </Link>
                        <Button
                          onClick={() => window.open(selectedProduct.url, '_blank')}
                          className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
                        >
                          <ExternalLink className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2" />
                          View Datasheet
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
                {/* Load More Button - Only show if there are more products to load */}
                {filteredProducts.length > visibleProductCount && (
                  <div className="col-span-full flex justify-center mt-8">
                    <button 
                      onClick={() => {
                        // Show loading state
                        setIsLoading(true);
                        
                        // Simulate network delay for loading more products
                        setTimeout(() => {
                          // Load 12 more products or all remaining products, whichever is smaller
                          const remainingCount = filteredProducts.length - visibleProductCount;
                          const increment = Math.min(remainingCount, 12);
                          setVisibleProductCount(visibleProductCount + increment);
                          setIsLoading(false);
                        }, 500); // Simulate a short loading delay
                      }}
                      disabled={isLoading}
                      className={`${isLoading ? 'bg-[#F2611D]/70' : 'bg-[#F2611D] hover:bg-[#F2611D]/80'} text-white rounded-full px-6 py-3 font-medium transition-all duration-300 flex items-center gap-2`}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </>
                      ) : (
                        <>
                          Load More Products
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3v18"></path>
                            <path d="M17 8l-5-5-5 5"></path>
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Mobile Filter Dialog */}
          {isFilterDialogOpen && (
            <div 
              className="fixed inset-0 bg-black/60 z-50 flex items-end lg:hidden"
              onClick={() => setIsFilterDialogOpen(false)}
            >
              <div 
                className="bg-[#1b3764] w-full rounded-t-xl max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-[#1b3764] pt-3 pb-2 px-4 flex justify-between items-center border-b border-white/10">
                  <h3 className="text-white text-lg font-bold">Filter & Sort</h3>
                  <button 
                    onClick={() => setIsFilterDialogOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10"
                  >
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
                        <button 
                          onClick={() => setSearch('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
                        >
                          <X className="text-white h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Sort Controls */}
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-bold text-sm uppercase mb-3">Sort By</h4>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setNameSort('asc')} 
                        className={`flex-1 py-2 px-3 rounded-lg text-center text-sm font-medium ${nameSort === 'asc' ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                      >
                        A-Z
                      </button>
                      <button 
                        onClick={() => setNameSort('desc')} 
                        className={`flex-1 py-2 px-3 rounded-lg text-center text-sm font-medium ${nameSort === 'desc' ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                      >
                        Z-A
                      </button>
                    </div>
                  </div>
                  
                  {/* Industry Filter - 2 per row */}
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-bold text-sm uppercase mb-3">Industry</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {industries.map(industry => {
                        const isSelected = selectedIndustries.includes(industry);
                        const count = dynamicCounts.byIndustry[industry] || 0;
                        
                        return (
                          <button
                            key={industry}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
                              } else {
                                setSelectedIndustries([...selectedIndustries, industry]);
                              }
                            }}
                            className={`flex items-center justify-between p-2 rounded-lg overflow-hidden ${isSelected ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                          >
                            <span className="text-xs font-medium capitalize truncate">{industry}</span>
                            <span className="text-xs opacity-70 flex-shrink-0">({count})</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Chemistry Filter - 2 per row */}
                  {productCategory !== 'tape' && chemistryTypes.length > 0 && (
                    <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                      <h4 className="text-white font-bold text-sm uppercase mb-3">Chemistry</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {chemistryTypes.map(chemistry => {
                          const isSelected = selectedChemistries.includes(chemistry);
                          const count = dynamicCounts.byChemistry[chemistry] || 0;
                          const chemIcon = getChemistryIcon(chemistry);
                          
                          return (
                            <button
                              key={chemistry}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedChemistries(selectedChemistries.filter(c => c !== chemistry));
                                } else {
                                  setSelectedChemistries([...selectedChemistries, chemistry]);
                                }
                              }}
                              className={`flex items-center justify-between p-2 rounded-lg overflow-hidden ${isSelected ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                            >
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                                  {chemIcon ? (
                                    <img src={chemIcon} alt={chemistry} className="w-4 h-4 object-contain filter brightness-0 invert" />
                                  ) : (
                                    <FlaskConical className="w-3 h-3 text-white" />
                                  )}
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
                  
                  {/* Apply Filters Button */}
                  <div className="pt-2 pb-6">
                    <button 
                      onClick={() => setIsFilterDialogOpen(false)}
                      className="w-full py-3 bg-[#F2611D] hover:bg-[#E55B1C] text-white font-medium rounded-xl transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductCategoryPage; 