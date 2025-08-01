import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUpDown, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Anchor, Factory, Car, Building, Package, Layers, Snowflake } from 'lucide-react';
import { industrialDatasheet } from '@/data/industrialDatasheet';
import { industries as industriesData } from '@/data/industries';
import { products as productsData } from '@/data/products';
import { brandColors, productColors, industryColors, typography } from '@/styles/brandStandards';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Helper to get industry logo from navbar data
const getIndustryLogo = (industry: string) => {
  const industryData = industriesData.find(ind => 
    ind.title.toLowerCase() === industry.toLowerCase()
  );
  return industryData?.logo || null;
};

// Helper to get product category image from navbar data
const getProductCategoryImage = (category: string) => {
  const productData = productsData.find(prod => 
    prod.name.toLowerCase() === category.toLowerCase()
  );
  return productData?.hoverImage || null;
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

// Helper to get industry-specific benefits
const getIndustryBenefits = (industry: string) => {
  const industryLower = industry.toLowerCase();
  switch (industryLower) {
    case 'marine':
      return [
        { title: 'Salt Resistant', subtitle: 'Marine Grade' },
        { title: 'UV Protected', subtitle: 'Sun Resistant' },
        { title: 'Flexible', subtitle: 'Adaptable' }
      ];
    case 'industrial':
      return [
        { title: 'High Temp', subtitle: 'Heat Resistant' },
        { title: 'Chemical Resistant', subtitle: 'Industrial Grade' },
        { title: 'Durable', subtitle: 'Long-lasting' }
      ];
    case 'transportation':
      return [
        { title: 'Vibration Resistant', subtitle: 'Road Ready' },
        { title: 'Weatherproof', subtitle: 'All Conditions' },
        { title: 'Flexible', subtitle: 'Adaptable' }
      ];
    case 'construction':
      return [
        { title: 'Weatherproof', subtitle: 'All Conditions' },
        { title: 'High Strength', subtitle: 'Structural' },
        { title: 'Durable', subtitle: 'Long-lasting' }
      ];
    // case 'foam':
    //   return [
    //     { title: 'Lightweight', subtitle: 'Easy Install' },
    //     { title: 'Insulating', subtitle: 'Energy Efficient' },
    //     { title: 'Flexible', subtitle: 'Adaptable' }
    //   ];
    case 'composites':
      return [
        { title: 'High Strength', subtitle: 'Structural' },
        { title: 'Lightweight', subtitle: 'Easy Install' },
        { title: 'Corrosion Resistant', subtitle: 'Long-lasting' }
      ];
    case 'insulation':
      return [
        { title: 'Thermal Barrier', subtitle: 'Energy Efficient' },
        { title: 'Moisture Resistant', subtitle: 'Protection' },
        { title: 'Flexible', subtitle: 'Adaptable' }
      ];
    default:
      return [
        { title: 'Durable', subtitle: 'Long-lasting' },
        { title: 'Flexible', subtitle: 'Adaptable' },
        { title: 'Reliable', subtitle: 'Trusted' }
      ];
  }
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
    // case 'foam':
    //   return `from-[${brandBlue}] via-[${brandBlue}] to-[#7a6fb0]`; // Blue top, Foam purple bottom
    case 'composites':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#c7c8c9]`; // Blue top, Composites gray bottom
    case 'insulation':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#d0157d]`; // Blue top, Insulation pink bottom
    default:
      return `from-[${brandBlue}] to-[${brandBlue}]`; // Default blue
  }
};

const ProductCategoryPage: React.FC = () => {
  const { productCategory } = useParams<{ productCategory: string }>();
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'name' | 'industry'>('name');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get products for this category
  const categoryProducts = useMemo(() => {
    return industrialDatasheet.filter(product => 
      product.category.toUpperCase() === productCategory?.toUpperCase()
    );
  }, [productCategory]);

  // Get unique industries for this category
  const industries = useMemo(() => {
    const unique = new Set(categoryProducts.map(p => p.industry.toLowerCase()));
    return Array.from(unique).sort();
  }, [categoryProducts]);

  // Dynamic counts based on current filter context
  const dynamicCounts = useMemo(() => {
    const byIndustry: Record<string, number> = {};
    categoryProducts.forEach(p => {
      const matchesIndustry = industry === 'ALL' || p.industry.toLowerCase() === industry.toLowerCase();
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      if (matchesIndustry && matchesSearch) {
        byIndustry[p.industry] = (byIndustry[p.industry] || 0) + 1;
      }
    });
    return { byIndustry };
  }, [categoryProducts, industry, search]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts.filter(product => {
      const matchIndustry = industry === 'ALL' || product.industry.toLowerCase() === industry.toLowerCase();
      const matchSearch = !search || product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase());
      return matchIndustry && matchSearch;
    });

    // Sort products
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.industry.localeCompare(b.industry);
      }
    });

    return filtered;
  }, [categoryProducts, industry, search, sortBy]);

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
      <Header />
      <main className="flex-1 pt-16 md:pt-20 pb-10">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
          {/* Dynamic Hero Banner - Mobile Optimized */}
          <section className="relative mb-8 md:mb-16 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
              {/* Dynamic gradient based on category with stronger ramp down */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(productCategory)} opacity-90`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Animated particles - Reduced for mobile */}
              <div className="absolute inset-0 opacity-20 md:opacity-30">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-1/4 left-1/4 w-16 md:w-32 h-16 md:h-32 bg-white/10 rounded-full blur-xl"
                />
                <motion.div
                  animate={{ 
                    rotate: -360,
                    scale: [1.1, 1, 1.1]
                  }}
                  transition={{ 
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-3/4 right-1/4 w-12 md:w-24 h-12 md:h-24 bg-white/10 rounded-full blur-xl"
                />
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    x: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute bottom-1/4 left-1/3 w-8 md:w-16 h-8 md:h-16 bg-white/10 rounded-full blur-lg"
                />
              </div>
              
              {/* Geometric patterns - Hidden on mobile */}
              <div className="absolute inset-0 opacity-20 hidden md:block">
                <div className="absolute top-0 left-0 w-64 h-64 border border-white/20 rounded-full transform -translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 border border-white/20 rounded-full transform translate-x-48 translate-y-48"></div>
              </div>
            </div>

            {/* Content Container - Mobile Optimized */}
            <div className="relative z-10 min-h-[400px] md:min-h-[600px] flex items-center">
              <div className="w-full px-2 md:px-4">
                <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center max-w-7xl mx-auto">
                  {/* Text Content - Mobile Optimized */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-white text-center lg:text-left"
                  >
                    {/* Category Badge - Mobile Optimized */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6 border border-white/30"
                    >
                      <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-white rounded-full"></div>
                      <span className="text-xs md:text-sm font-medium uppercase tracking-wider">
                        {productCategory.toUpperCase()} SOLUTIONS
                      </span>
                    </motion.div>

                    {/* Main Heading - Mobile Optimized */}
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-3xl md:text-5xl lg:text-7xl font-kallisto font-black mb-4 md:mb-6 leading-tight" 
                      style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}
                    >
                      {productCategory.charAt(0).toUpperCase() + productCategory.slice(1).toLowerCase()}
                    </motion.h1>

                    {/* Description - Mobile Optimized */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-base md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 leading-relaxed px-2 md:px-0" 
                      style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}
                    >
                      Discover our premium {productCategory.toLowerCase()} solutions engineered for performance and reliability across all industries.
                    </motion.p>

                    {/* Stats - Mobile Optimized */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="flex flex-wrap gap-3 md:gap-6 mb-6 md:mb-8 justify-center lg:justify-start"
                    >
                      {getIndustryBenefits(industries[0] || 'default').map((benefit, index) => (
                        <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 border border-white/30">
                          <div className="text-lg md:text-2xl font-bold">{benefit.title}</div>
                          <div className="text-xs md:text-sm text-white/80">{benefit.subtitle}</div>
                        </div>
                      ))}
                    </motion.div>

                    {/* CTA Button - Mobile Optimized */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex justify-center lg:justify-start"
                    >
                      <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 rounded-full px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold transition-all duration-300">
                        Explore Products
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Category Image - Mobile Optimized */}
                  {getProductCategoryImage(productCategory) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: 50 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                      className="flex justify-center lg:justify-end order-first lg:order-last"
                    >
                      <div className="relative w-full max-w-xs md:max-w-md">
                        <div className="relative aspect-square bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
                            <img 
                              src={getProductCategoryImage(productCategory)} 
                              alt={`${productCategory} Category`}
                              className="w-full h-full object-contain filter drop-shadow-2xl"
                            />
                          </div>
                          {/* Enhanced glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                        </div>
                        
                        {/* Floating elements - Hidden on mobile */}
                        <motion.div
                          animate={{ 
                            y: [0, -10, 0],
                            rotate: [0, 5, 0]
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm hidden md:block"
                        />
                        <motion.div
                          animate={{ 
                            y: [0, 10, 0],
                            rotate: [0, -5, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/20 rounded-full backdrop-blur-sm hidden md:block"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Filters - Mobile Optimized */}
          <section className="bg-white shadow-lg rounded-2xl md:rounded-3xl p-4 md:p-6 mb-8 md:mb-10 border border-gray-100">
            {/* Search - Mobile Optimized */}
            <div className="mb-6 relative max-w-xl mx-auto">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 md:h-5 w-4 md:w-5" />
              <Input
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 md:pl-12 py-2.5 md:py-3 text-base md:text-lg border-2 border-gray-200 focus:border-[#F16022] rounded-xl"
              />
            </div>

            {/* Industry Buttons - Mobile Optimized */}
            <div className="mb-6 md:mb-8">
              <h3 className="font-kallisto font-bold text-base md:text-lg mb-3 text-center" 
                  style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight, color: brandColors.secondary.blueVelvet.hex }}>
                Industry
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
                <Button
                  variant={industry === 'ALL' ? 'default' : 'outline'}
                  onClick={() => setIndustry('ALL')}
                  className={`px-3 md:px-6 py-2 md:py-3 rounded-full font-bold text-sm md:text-base ${
                    industry === 'ALL' 
                      ? 'bg-[#F2611D] hover:bg-[#F2611D]/80 text-white border-0' 
                      : 'border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white'
                  }`}
                >
                  All ({categoryProducts.length})
                </Button>
                {industries.map(ind => (
                  <Button
                    key={ind}
                    variant={industry === ind ? 'default' : 'outline'}
                    onClick={() => setIndustry(ind)}
                    className={`px-3 md:px-6 py-2 md:py-3 rounded-full font-bold text-sm md:text-base flex items-center gap-1 md:gap-2 ${
                      industry === ind 
                        ? 'bg-[#F2611D] hover:bg-[#F2611D]/80 text-white border-0' 
                        : 'border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white'
                    }`}
                  >
                    {getIndustryLogo(ind) ? (
                      <img 
                        src={getIndustryLogo(ind)} 
                        alt={`${ind} icon`}
                        className="h-3 md:h-4 w-3 md:w-4 object-contain"
                      />
                    ) : (
                      <span className="font-bold text-xs md:text-sm">{ind.charAt(0).toUpperCase()}</span>
                    )}
                    <span className="hidden sm:inline">{ind}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {dynamicCounts.byIndustry[ind] || 0}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort Options - Mobile Optimized */}
            <div className="text-center">
              <h3 className="font-kallisto font-bold text-base md:text-lg mb-3" 
                  style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight, color: brandColors.secondary.blueVelvet.hex }}>
                Sort By
              </h3>
              <div className="flex gap-2 md:gap-3 justify-center">
                <Button
                  variant={sortBy === 'name' ? 'default' : 'outline'}
                  onClick={() => setSortBy('name')}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-sm md:text-base ${
                    sortBy === 'name' 
                      ? 'bg-gradient-to-r from-[#09668D] to-[#1B3764] text-white border-0' 
                      : 'border-2 border-gray-300 hover:border-[#09668D]'
                  }`}
                >
                  Name
                </Button>
                <Button
                  variant={sortBy === 'industry' ? 'default' : 'outline'}
                  onClick={() => setSortBy('industry')}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-sm md:text-base ${
                    sortBy === 'industry' 
                      ? 'bg-gradient-to-r from-[#09668D] to-[#1B3764] text-white border-0' 
                      : 'border-2 border-gray-300 hover:border-[#09668D]'
                  }`}
                >
                  Industry
                </Button>
              </div>
            </div>
          </section>

          {/* Results Info */}
          <p className="text-sm text-center text-gray-300 mb-6">
            Showing {filteredProducts.length} of {categoryProducts.length} products
          </p>

          {/* Apple-Style Feature Cards Grid - Mobile Optimized */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={`${product.id}-${idx}-${industry}-${search}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group"
              >
                {/* Mobile Row Card / Desktop Card */}
                <div 
                  className={`relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] cursor-pointer ${
                    // Mobile: Row layout, Desktop: Card layout
                    'h-32 md:h-[500px] rounded-2xl md:rounded-3xl bg-gradient-to-r md:bg-gradient-to-b'
                  } ${industryColor(product.industry)}`}
                  onClick={() => openProductModal(product)}
                >
                  {/* Background Image - Desktop Only */}
                  <div className="absolute inset-0 hidden md:block">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content Overlay - Mobile Row Layout / Desktop Card Layout */}
                  <div className="absolute inset-0 flex md:flex-col justify-between p-4 md:p-6 text-white">
                    {/* Mobile: Left side with image and basic info */}
                    <div className="flex md:hidden items-center gap-4 flex-1">
                      {/* Mobile: Product Image */}
                      <div className="w-20 h-20 md:hidden rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Mobile: Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-kallisto font-black mb-1 leading-tight line-clamp-1 md:truncate" 
                            style={{ fontFamily: typography.products.fontFamily, fontWeight: typography.products.fontWeight }}>
                          {product.name.split('–')[0].trim()}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-300 line-clamp-2" 
                           style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                          {product.name.split('–')[1]?.trim() || product.description}
                        </p>
                        {/* Mobile: Industry Badge */}
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${industryColor(product.industry)} text-white text-xs font-bold uppercase tracking-wide mt-2`}>
                          {getIndustryLogo(product.industry) ? (
                            <img 
                              src={getIndustryLogo(product.industry)} 
                              alt={`${product.industry} icon`}
                              className="h-3 w-3 object-contain"
                            />
                          ) : (
                            <span className="capitalize">{product.industry.charAt(0)}</span>
                          )}
                          <span className="capitalize text-xs">{product.industry}</span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Top Section */}
                    <div className="hidden md:flex items-start justify-between">
                      {/* Industry Badge */}
                      <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${industryColor(product.industry)} text-white text-xs font-bold uppercase tracking-wide flex items-center gap-1`}>
                        {getIndustryLogo(product.industry) ? (
                          <img 
                            src={getIndustryLogo(product.industry)} 
                            alt={`${product.industry} icon`}
                            className="h-4 w-4 object-contain"
                          />
                        ) : (
                          <span className="capitalize">{product.industry.charAt(0)}</span>
                        )}
                        <span className="capitalize">{product.industry}</span>
                      </div>

                      {/* Industry Icon for Filtering */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIndustry(product.industry.toLowerCase());
                        }}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
                        title={`Filter by ${product.industry} industry`}
                      >
                        {getIndustryLogo(product.industry) ? (
                          <img 
                            src={getIndustryLogo(product.industry)} 
                            alt={`${product.industry} icon`}
                            className="h-16 w-16 object-contain"
                          />
                        ) : (
                          <span className="text-white font-bold text-lg">{product.industry.charAt(0).toUpperCase()}</span>
                        )}
                      </button>
                    </div>

                    {/* Desktop: Middle Section */}
                    <div className="hidden md:flex flex-1 flex-col justify-center">
                      {/* Product Name */}
                      <h3 className="text-xl md:text-2xl font-kallisto font-black mb-3 leading-tight line-clamp-2" 
                          style={{ fontFamily: typography.products.fontFamily, fontWeight: typography.products.fontWeight }}>
                        {product.name.split('–')[0].trim()}
                      </h3>
                      
                      {/* Subtitle */}
                      <p className="text-sm md:text-base text-gray-300 mb-4 line-clamp-3" 
                         style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                        {product.name.split('–')[1]?.trim() || product.description}
                      </p>
                    </div>

                    {/* Mobile: Right side with buttons */}
                    <div className="flex md:hidden items-center gap-2">
                      {/* Mobile: View Details Button */}
                      <Link
                        to={`/products/${productCategory}/${product.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300"
                      >
                        <span>View</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                      
                      {/* Mobile: Datasheet Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(product.url, '_blank');
                        }}
                        className="flex items-center gap-1 bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300"
                      >
                        <span>PDF</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </button>
                    </div>

                    {/* Desktop: Bottom Section */}
                    <div className="hidden md:flex items-center justify-between">
                      {/* View Details Button */}
                      <Link
                        to={`/products/${productCategory}/${product.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                      >
                        <span>View Details</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                      
                      {/* Datasheet Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(product.url, '_blank');
                        }}
                        className="flex items-center gap-2 bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                      >
                        <span>Datasheet</span>
                        <ExternalLink className="h-3 w-3" />
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
                          src={selectedProduct.image} 
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductCategoryPage; 