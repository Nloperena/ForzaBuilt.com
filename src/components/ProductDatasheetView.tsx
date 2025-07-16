import React, { useMemo, useState } from 'react';
import { industrialDatasheet } from '@/data/industrialDatasheet';
import { industries as industriesData } from '@/data/industries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Anchor, Factory, Car, Building, Package, Layers, Snowflake, Search, Info, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { brandColors, productColors, industryColors, typography } from '@/styles/brandStandards';

// Allowed constants for easy maintenance
const CATEGORIES = ['BOND', 'SEAL', 'TAPE'] as const;

// Helper to get industry logo from navbar data
const getIndustryLogo = (industry: string) => {
  const industryData = industriesData.find(ind => 
    ind.title.toLowerCase() === industry.toLowerCase()
  );
  return industryData?.logo || null;
};

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
const industryColor = (industry: string) => {
  const industryLower = industry.toLowerCase();
  const brandBlue = '#1b3764'; // Forza brand blue
  
  // Use vertical gradients with more industry color at the bottom
  switch (industryLower) {
    case 'marine':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#137875]`; // Blue top, Marine teal bottom
    case 'industrial':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#f16a26]`; // Blue top, Industrial orange bottom
    case 'transportation':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#b83d35]`; // Blue top, Transportation red bottom
    case 'construction':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#fec770]`; // Blue top, Construction yellow bottom
    case 'foam':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#7a6fb0]`; // Blue top, Foam purple bottom
    case 'composites':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#c7c8c9]`; // Blue top, Composites gray bottom
    case 'insulation':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#d0157d]`; // Blue top, Insulation pink bottom
    default:
      return `from-[${brandBlue}] to-[${brandBlue}]`; // Default blue
  }
};

const ProductDatasheetView: React.FC = () => {
  /* -------------------- STATE -------------------- */
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState<string>('ALL');
  const [category, setCategory] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* -------------------- DERIVED LISTS -------------------- */
  const industries = useMemo(() => {
    const unique = new Set(industrialDatasheet.map(p => p.industry.toLowerCase()));
    return Array.from(unique).sort();
  }, []);

  const counts = useMemo(() => {
    const byIndustry: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    industrialDatasheet.forEach(p => {
      byIndustry[p.industry] = (byIndustry[p.industry] || 0) + 1;
      byCategory[p.category] = (byCategory[p.category] || 0) + 1;
    });
    return { byIndustry, byCategory };
  }, []);

  /* -------------------- FILTER -------------------- */
  const filtered = useMemo(() => {
    console.log('=== FILTER DEBUG START ===');
    console.log('Current state:', { industry, category, search });
    
    // Check for duplicate IDs in the data
    const duplicateIds = industrialDatasheet
      .map(p => p.id)
      .filter((id, index, arr) => arr.indexOf(id) !== index);
    
    if (duplicateIds.length > 0) {
      console.warn('Duplicate product IDs found:', duplicateIds);
    }
    
    // Debug: Count products by category
    const categoryCounts = industrialDatasheet.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    console.log('Products by category:', categoryCounts);
    
    const result = industrialDatasheet.filter(p => {
      const matchIndustry = industry === 'ALL' || p.industry.toLowerCase() === industry.toLowerCase();
      const matchCategory = category === 'ALL' || p.category.toUpperCase() === category.toUpperCase();
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      
      const shouldInclude = matchIndustry && matchCategory && matchSearch;
      
      // Debug individual product filtering
      if (p.category === 'TAPE') {
        console.log('Tape product filtering:', {
          name: p.name,
          category: p.category,
          industry: p.industry,
          matchIndustry,
          matchCategory,
          matchSearch,
          shouldInclude
        });
      }
      
      return shouldInclude;
    });
    
    console.log('=== FILTER DEBUG END ===');
    console.log('Filter Debug:', {
      industry,
      category,
      search,
      totalProducts: industrialDatasheet.length,
      filteredCount: result.length,
      sampleProducts: result.slice(0, 3).map(p => ({ name: p.name, category: p.category, industry: p.industry }))
    });
    
    return result;
  }, [industry, category, search]);

  /* Dynamic counts based on current filter context (for intuitive badges) */
  const dynamicCounts = useMemo(() => {
    const byIndustry: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    industrialDatasheet.forEach(p => {
      // Only count if product still matches *other* active filters
      const matchesCategory = category === 'ALL' || p.category.toUpperCase() === category.toUpperCase();
      const matchesIndustry = industry === 'ALL' || p.industry.toLowerCase() === industry.toLowerCase();
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      if (matchesCategory && matchesSearch) {
        byIndustry[p.industry] = (byIndustry[p.industry] || 0) + 1;
      }
      if (matchesIndustry && matchesSearch) {
        byCategory[p.category] = (byCategory[p.category] || 0) + 1;
      }
    });
    return { byIndustry, byCategory };
  }, [industry, category, search]);

  /* -------------------- MODAL HANDLERS -------------------- */
  const openProductModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  /* -------------------- RENDER -------------------- */
  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      {/* Filters */}
      <section className="bg-white shadow-lg rounded-3xl p-6 mb-10 border border-gray-100">
        {/* Search */}
        <div className="mb-6 relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-12 py-3 text-lg border-2 border-gray-200 focus:border-[#F16022] rounded-xl"
          />
        </div>

        {/* Category Buttons */}
        <div className="mb-8 text-center">
          <h3 className="font-kallisto font-bold text-lg mb-3" style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight, color: brandColors.secondary.blueVelvet.hex }}>Category</h3>
          <div className="inline-flex flex-wrap gap-3 justify-center">
            <Button
              variant={category === 'ALL' ? 'default' : 'outline'}
              onClick={() => setCategory('ALL')}
              className={`px-6 py-3 rounded-full font-bold ${
                category === 'ALL' 
                  ? 'bg-[#F2611D] hover:bg-[#F2611D]/80 text-white border-0' 
                  : 'border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white'
              }`}
            >
              All ({industrialDatasheet.length})
            </Button>
            <Button
              variant={category === 'BOND' ? 'default' : 'outline'}
              onClick={() => setCategory('BOND')}
              className={`px-6 py-3 rounded-full font-bold ${
                category === 'BOND' 
                  ? 'bg-[#F2611D] hover:bg-[#F2611D]/80 text-white border-0' 
                  : 'border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white'
              }`}
            >
              Bond ({dynamicCounts.byCategory.BOND || 0})
            </Button>
            <Button
              variant={category === 'SEAL' ? 'default' : 'outline'}
              onClick={() => setCategory('SEAL')}
              className={`px-6 py-3 rounded-full font-bold ${
                category === 'SEAL' 
                  ? 'bg-[#F2611D] hover:bg-[#F2611D]/80 text-white border-0' 
                  : 'border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white'
              }`}
            >
              Seal ({dynamicCounts.byCategory.SEAL || 0})
            </Button>
            <Button
              variant={category === 'TAPE' ? 'default' : 'outline'}
              onClick={() => setCategory('TAPE')}
              className={`px-6 py-3 rounded-full font-bold ${
                category === 'TAPE' 
                  ? 'bg-[#F2611D] hover:bg-[#F2611D]/80 text-white border-0' 
                  : 'border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white'
              }`}
            >
              Tape ({dynamicCounts.byCategory.TAPE || 0})
            </Button>
          </div>
        </div>

        {/* Industry Buttons */}
        <div className="text-center">
          <h3 className="font-kallisto font-bold text-lg mb-3" style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight, color: brandColors.secondary.blueVelvet.hex }}>Industry</h3>
          <div className="inline-flex flex-wrap gap-3 justify-center">
            <Button
              variant={industry === 'ALL' ? 'default' : 'outline'}
              onClick={() => setIndustry('ALL')}
              className={`px-6 py-3 rounded-full font-bold ${
                industry === 'ALL' 
                  ? 'bg-[#F2611D] hover:bg-[#F2611D]/80 text-white border-0' 
                  : 'border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white'
              }`}
            >
              All
            </Button>
            {industries.map(ind => (
              <Button
                key={ind}
                variant={industry === ind ? 'default' : 'outline'}
                onClick={() => setIndustry(ind)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold ${
                  industry === ind 
                    ? 'bg-[#F2611D] hover:bg-[#F2611D]/80 text-white border-0' 
                    : 'border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white'
                }`}
              >
                {getIndustryLogo(ind) ? (
                  <img 
                    src={getIndustryLogo(ind)} 
                    alt={`${ind} icon`}
                    className="h-4 w-4 object-contain"
                  />
                ) : (
                  <span className="font-bold">{ind.charAt(0).toUpperCase()}</span>
                )}
                {ind}
                <Badge variant="secondary" className="ml-1">
                  {dynamicCounts.byIndustry[ind] || 0}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Info */}
      <p className="text-sm text-center text-gray-700 mb-6">
        Showing {filtered.length} of {industrialDatasheet.length} products
      </p>

      {/* Apple-Style Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {filtered.map((prod, idx) => (
          <motion.div
            key={`${prod.id}-${idx}-${category}-${industry}-${search}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="group"
          >
            {/* Apple-Style Feature Card */}
            <div 
              className={`relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-b ${industryColor(prod.industry)} shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] cursor-pointer`}
              onClick={() => openProductModal(prod)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={prod.image} 
                  alt={prod.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  {/* Category and Industry Badges */}
                  <div className="flex gap-2">
                    {/* Category Badge */}
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${categoryColor(prod.category)} text-white text-xs font-bold uppercase tracking-wide`}>
                      {prod.category}
                    </div>
                    
                    {/* Industry Badge */}
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${industryColor(prod.industry)} text-white text-xs font-bold uppercase tracking-wide flex items-center gap-1`}>
                      {getIndustryLogo(prod.industry) ? (
                        <img 
                          src={getIndustryLogo(prod.industry)} 
                          alt={`${prod.industry} icon`}
                          className="h-4 w-4 object-contain"
                        />
                      ) : (
                        <span className="capitalize">{prod.industry.charAt(0)}</span>
                      )}
                      <span className="capitalize">{prod.industry}</span>
                    </div>
                  </div>
                  
                  {/* Industry Icon for Filtering */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIndustry(prod.industry.toLowerCase());
                    }}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
                    title={`Filter by ${prod.industry} industry`}
                  >
                    {getIndustryLogo(prod.industry) ? (
                      <img 
                        src={getIndustryLogo(prod.industry)} 
                        alt={`${prod.industry} icon`}
                        className="h-16 w-16 object-contain"
                      />
                    ) : (
                      <span className="text-white font-bold text-lg">{prod.industry.charAt(0).toUpperCase()}</span>
                    )}
                  </button>
                </div>

                {/* Middle Section */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* Product Name */}
                  <h3 className="text-2xl font-kallisto font-black mb-3 leading-tight" style={{ fontFamily: typography.products.fontFamily, fontWeight: typography.products.fontWeight }}>
                    {prod.name.split('–')[0].trim()}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-base text-gray-300 mb-4 line-clamp-2" style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                    {prod.name.split('–')[1]?.trim() || prod.description}
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-start">
                  {/* Learn More Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(prod.url, '_blank');
                    }}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-full px-4 py-2 text-sm font-medium"
                  >
                    <span>View Datasheet</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">No products match your criteria.</div>
      )}

      {/* Product Modal with Wipe Animation */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
                ease: [0.25, 0.46, 0.45, 0.94] // Custom bezier curve
              }}
              className={`relative rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden bg-gradient-to-b ${industryColor(selectedProduct.industry)}`}
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
              
              {/* Modal Header */}
              <div className="relative p-6 border-b border-white/20">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex gap-2 mb-3">
                      <Badge className={`bg-white/20 backdrop-blur-sm text-white border border-white/30`}>
                        {selectedProduct.category}
                      </Badge>
                      <Badge className={`bg-white/20 backdrop-blur-sm text-white border border-white/30 flex items-center gap-1`}>
                        {getIndustryLogo(selectedProduct.industry) ? (
                          <img 
                            src={getIndustryLogo(selectedProduct.industry)} 
                            alt={`${selectedProduct.industry} icon`}
                            className="h-4 w-4 object-contain"
                          />
                        ) : (
                          <span className="capitalize">{selectedProduct.industry.charAt(0)}</span>
                        )}
                        <span className="capitalize">{selectedProduct.industry}</span>
                      </Badge>
                    </div>
                    <h2 className="text-2xl font-kallisto font-black text-white" style={{ fontFamily: typography.products.fontFamily, fontWeight: typography.products.fontWeight }}>
                      {selectedProduct.name}
                    </h2>
                  </div>
                  <button
                    onClick={closeModal}
                    className="ml-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto bg-white/10 backdrop-blur-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="space-y-4">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-full h-[500px] object-contain rounded-2xl shadow-lg bg-white/10"
                    />
                    <p className="text-white/90" style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    {/* Specifications */}
                    {selectedProduct.specifications && (
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                          Specifications
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(selectedProduct.specifications).map(([key, value]) => {
                            if (typeof value === 'string' && key !== 'type') {
                              return (
                                <div key={key} className="flex justify-between py-2 border-b border-white/20">
                                  <span className="font-medium text-white/90 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                  <span className="text-white/80">{value}</span>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* Technical Data */}
                    {selectedProduct.technicalData && (
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                          Technical Data
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(selectedProduct.technicalData).map(([key, value]) => {
                            if (typeof value === 'string') {
                              return (
                                <div key={key} className="flex justify-between py-2 border-b border-white/20">
                                  <span className="font-medium text-white/90 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                  <span className="text-white/80">{value}</span>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/20 bg-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Industry Icon */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30">
                      {getIndustryLogo(selectedProduct.industry) ? (
                        <img 
                          src={getIndustryLogo(selectedProduct.industry)} 
                          alt={`${selectedProduct.industry} icon`}
                          className="h-6 w-6 object-contain"
                        />
                      ) : (
                        <span className="text-white font-bold text-sm">{selectedProduct.industry.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="text-sm text-white/70">
                      Product ID: {selectedProduct.id.toUpperCase()}
                    </div>
                  </div>
                  <Button
                    onClick={() => window.open(selectedProduct.url, '_blank')}
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Datasheet
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDatasheetView; 