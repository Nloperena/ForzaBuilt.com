import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, ArrowUpDown, ChevronUp, ChevronDown, FlaskConical, ExternalLink } from 'lucide-react';

// Define types
interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category?: string;
  chemistry?: string;
  industry?: string[];
  productLine?: string;
  slug?: string;
}

interface IndustryData {
  title: string;
  logo?: string;
  color?: string;
}

interface IndustryProductsSectionProps {
  industryData: IndustryData;
  products: Product[];
  onProductSelect?: (product: Product) => void;
  getIndustryColorHex: (industry: string) => string;
  getIndustryLogo: (industry: string) => string;
  CHEMISTRY_ICONS: Record<string, string>;
  typography?: {
    headings: {
      fontFamily: string;
      fontWeight: string | number;
    };
  };
}

// Image skeleton component
const ImageSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 bg-white/10 animate-pulse ${className}`} />
);

export const IndustryProductsSection: React.FC<IndustryProductsSectionProps> = ({
  industryData,
  products,
  onProductSelect,
  getIndustryColorHex,
  getIndustryLogo,
  CHEMISTRY_ICONS,
  typography = {
    headings: {
      fontFamily: 'Kallisto, sans-serif',
      fontWeight: 900
    }
  }
}) => {
  // State management
  const [search, setSearch] = useState('');
  const [selectedLine, setSelectedLine] = useState<'bond' | 'seal' | 'tape'>('bond');
  const [nameSort, setNameSort] = useState<'asc' | 'desc'>('asc');
  const [selectedChemistries, setSelectedChemistries] = useState<string[]>([]);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imageLoadedStates, setImageLoadedStates] = useState<Record<string, boolean>>({});

  // Image loading handlers
  const handleImageLoad = (productId: string) => {
    setImageLoadedStates(prev => ({ ...prev, [productId]: true }));
  };

  const handleImageError = (productId: string) => {
    setImageLoadedStates(prev => ({ ...prev, [productId]: false }));
  };

  // Get unique chemistry types from products
  const chemistryTypes = useMemo(() => {
    const chemistries = new Set<string>();
    products.forEach(p => {
      if (p.chemistry) chemistries.add(p.chemistry);
    });
    return Array.from(chemistries).sort();
  }, [products]);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      bond: products.filter(p => p.category?.toLowerCase() === 'bond').length,
      seal: products.filter(p => p.category?.toLowerCase() === 'seal').length,
      tape: products.filter(p => p.category?.toLowerCase() === 'tape').length,
    };
  }, [products]);

  // Filter and sort products
  const industryProducts = useMemo(() => {
    let filtered = products;

    // Filter by search
    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by product line
    if (selectedLine) {
      filtered = filtered.filter(p => p.category?.toLowerCase() === selectedLine);
    }

    // Filter by chemistry
    if (selectedChemistries.length > 0) {
      filtered = filtered.filter(p => p.chemistry && selectedChemistries.includes(p.chemistry));
    }

    // Sort by name
    filtered = [...filtered].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameSort === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    return filtered;
  }, [products, search, selectedLine, selectedChemistries, nameSort]);

  if (products.length === 0) {
    return null;
  }

  return (
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

            {/* Filter Panel - Desktop */}
            <div className="hidden lg:block bg-white/10 backdrop-blur-md shadow-lg rounded-xl border border-white/20 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="font-kallisto font-bold text-lg text-white" style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                  Filter & Sort
                </h3>
              </div>

              <div className="p-4 space-y-6">
                {/* Product Category */}
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

                {/* Sort By Name */}
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
                              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                                <img 
                                  src={CHEMISTRY_ICONS[chemistry as keyof typeof CHEMISTRY_ICONS]} 
                                  alt={chemistry}
                                  className="w-8 h-8 object-contain chemistry-icon"
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
                        className="px-3 py-1 rounded-full text-lg font-bold uppercase tracking-wide flex items-center gap-1.5"
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
                            className="h-7 w-7 object-contain"
                          />
                        ) : (
                          <span className="capitalize">{product.industry?.[0]?.charAt(0) || ''}</span>
                        )}
                        <span className="capitalize">{product.industry?.[0] || ''}</span>
                      </div>
                    </div>

                    {/* Desktop: Product Image - Full height to show whole image */}
                    <div className="absolute inset-0 hidden md:block" style={{ transform: 'translateY(-7.5%)' }}>
                      {!imageLoadedStates[product.id] && <ImageSkeleton />}
                      
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
                      <h3 className="text-3xl font-kallisto font-black leading-tight line-clamp-2 text-white" style={{ textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)' }}>
                        {product.name.split('–')[0].trim()}
                      </h3>
                    </div>

                    {/* Mobile: Left side with image and basic info */}
                    <div className="flex md:hidden items-center gap-4 flex-1 p-4">
                      {/* Mobile: Product Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/20 backdrop-blur-xl border border-white/30 hover:border-white/40 shadow-2xl relative flex items-center justify-center" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)' }}>
                        {!imageLoadedStates[product.id] && <ImageSkeleton className="rounded-xl" />}
                        
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
                              onProductSelect?.(product);
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 border border-white/30"
                          >
                            <span>Quick View</span>
                          </button>
                          
                          {/* Product Details Button */}
                          <Link
                            to={`/products/${product.category?.toLowerCase() || 'bond'}/${product.slug || product.id}`}
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
                          onProductSelect?.(product);
                        }}
                        className="flex items-center gap-1 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 border border-white/30"
                      >
                        <span>Quick View</span>
                      </button>
                      
                      {/* Mobile: Product Details Button */}
                      <Link
                        to={`/products/${product.category?.toLowerCase() || 'bond'}/${product.slug || product.id}`}
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
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="bg-[#115B87] w-full rounded-t-xl max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
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
                          className={`py-2 px-3 rounded-lg text-center text-sm font-medium capitalize ${selectedLine === line ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default IndustryProductsSection;









