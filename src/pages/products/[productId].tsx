import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowLeft, Download, Share2, BookOpen, Settings, Zap, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { industries as industriesData } from '@/data/industries';
import { brandColors, productColors, industryColors, typography } from '@/styles/brandStandards';
import { getProduct, getRelatedProducts } from '@/utils/products';
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

// Industry colors using gradients with 70% blue and 30% industry color
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

const ProductDetailPage: React.FC = () => {
  const { productId, productCategory } = useParams<{ productId: string; productCategory?: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const tabsListRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the active tab
  const scrollToActiveTab = useCallback(() => {
    if (tabsListRef.current) {
      // Find all tab elements
      const tabElements = tabsListRef.current.querySelectorAll('[role="tab"]');
      const tabValues = ['overview', 'applications', 'benefits', 'technical', 'sizing'];
      const currentIndex = tabValues.indexOf(activeTab);
      
      // Get the active tab element
      const activeTabElement = tabElements[currentIndex] as HTMLElement;
      
      if (activeTabElement) {
        // Calculate position to center the active tab
        const tabsListRect = tabsListRef.current.getBoundingClientRect();
        const activeTabRect = activeTabElement.getBoundingClientRect();
        
        const scrollLeft = activeTabElement.offsetLeft - 
                          (tabsListRect.width / 2) + 
                          (activeTabRect.width / 2);
        
        // Smooth scroll to the active tab
        tabsListRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab]);

  // Scroll to active tab when it changes
  useEffect(() => {
    scrollToActiveTab();
  }, [activeTab, scrollToActiveTab]);
  
  // Ensure the tabs are properly positioned on initial load
  useEffect(() => {
    // Wait for the DOM to be fully rendered
    const timer = setTimeout(() => {
      scrollToActiveTab();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [scrollToActiveTab]);
  
  // Add touch swipe interaction for mobile
  useEffect(() => {
    const tabsElement = tabsListRef.current;
    if (!tabsElement) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) < 50) return; // Minimum swipe distance
      
      const tabValues = ['overview', 'applications', 'benefits', 'technical', 'sizing'];
      const currentIndex = tabValues.indexOf(activeTab);
      
      if (swipeDistance > 0 && currentIndex > 0) {
        // Swipe right - go to previous tab
        setActiveTab(tabValues[currentIndex - 1]);
      } else if (swipeDistance < 0 && currentIndex < tabValues.length - 1) {
        // Swipe left - go to next tab
        setActiveTab(tabValues[currentIndex + 1]);
      }
    };
    
    tabsElement.addEventListener('touchstart', handleTouchStart);
    tabsElement.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      tabsElement.removeEventListener('touchstart', handleTouchStart);
      tabsElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeTab, setActiveTab]);

  // Find the product
  const product = useMemo(() => {
    return getProduct(productId);
  }, [productId]);

  // Get related products from the same industry
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getRelatedProducts(productId, 4);
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#1b3764] flex flex-col">
        <Header />
        <main className="flex-1 pt-20 pb-10">
          <div className="max-w-screen-2xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-kallisto font-black text-white mb-4">Product Not Found</h1>
            <p className="text-gray-300 mb-8">The product you're looking for doesn't exist.</p>
            <Link to="/products">
              <Button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-6 text-xl">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1b3764] flex flex-col">
      <DynamicMetaTags
        title={product.name}
        description={product.description}
        url={`/products/${productCategory || product.category.toLowerCase()}/${productId}`}
        type="product"
        productName={product.name}
        productCategory={product.category}
        productChemistry={product.chemistry}
        image={product.imageUrl || '/forza-logo-full.png'}
      />
      <Header />
      <main className="flex-1 pt-20 pb-10">
        <div className="max-w-screen-2xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Link to="/products" className="hover:text-white transition-colors">
                Products
              </Link>
              <span>/</span>
              <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-white transition-colors">
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-white">{product.name}</span>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Industry Color Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${industryColor(product.industry)} opacity-95`}></div>
              {/* Content */}
              <div className="relative p-8 md:p-12 text-white">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Product Info */}
                  <div>
                    {/* Badges */}
                    <div className="flex gap-3 mb-6">
                      <Badge className="bg-[#F2611D] text-white border-0 px-4 py-2">
                        {product.category}
                      </Badge>
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border border-white/30 flex items-center gap-1 px-4 py-2">
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
                      </Badge>
                    </div>

                    {/* Product ID */}
                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-kallisto font-black mb-4 leading-none text-white" 
                        style={{ fontFamily: typography.products.fontFamily, fontWeight: typography.products.fontWeight }}>
                      {product.id.toUpperCase()}
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl" 
                       style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                      {product.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        onClick={() => {
                          // Check if TDS files are available
                          const tdsLink = product.standardTdsLink || product.pdfLinks?.[0];
                          if (tdsLink && tdsLink.startsWith('/TDS/')) {
                            // TDS files are temporarily unavailable
                            alert("Technical Data Sheets are temporarily unavailable. Please contact us for product information.");
                          } else if (tdsLink) {
                            // External link or other PDF
                            window.location.href = `/pdf-viewer/${encodeURIComponent(tdsLink)}`;
                          } else {
                            alert("The datasheet for this product is not available yet.");
                          }
                        }}
                        className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-6 text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        View Datasheet
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white rounded-full px-8 py-6 text-xl transition-all duration-300"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Product
                      </Button>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="flex justify-center lg:justify-end">
                    <div className="relative">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
                        <img 
                          src={product.imageUrl || product.image} 
                          alt={product.name}
                          className="w-full max-w-md h-auto object-contain"
                        />
                      </div>
                      {/* Floating Product Name */}
                      <div className="absolute -bottom-4 -right-4 bg-[#F2611D] backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 max-w-xs shadow-lg">
                        <span className="text-white font-bold text-xs leading-tight">{product.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Product Details Tabs */}
          <section className="mb-12">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative">
              <div className="relative">
                {/* Scroll indicators */}
                <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#1B3764] to-transparent pointer-events-none z-10 md:hidden flex items-center justify-start pl-1.5">
                  <div className="animate-pulse bg-white/10 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
                      <path d="m15 18-6-6 6-6"></path>
                    </svg>
                  </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#1B3764] to-transparent pointer-events-none z-10 md:hidden flex items-center justify-end pr-1.5">
                  <div className="animate-pulse bg-white/10 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </div>
                </div>
                
                {/* Carousel dots for mobile */}
                <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-1 md:hidden">
                  <div className={`h-1.5 w-1.5 rounded-full ${activeTab === 'overview' ? 'bg-[#F16022]' : 'bg-white/30'}`}></div>
                  <div className={`h-1.5 w-1.5 rounded-full ${activeTab === 'applications' ? 'bg-[#F16022]' : 'bg-white/30'}`}></div>
                  <div className={`h-1.5 w-1.5 rounded-full ${activeTab === 'benefits' ? 'bg-[#F16022]' : 'bg-white/30'}`}></div>
                  <div className={`h-1.5 w-1.5 rounded-full ${activeTab === 'technical' ? 'bg-[#F16022]' : 'bg-white/30'}`}></div>
                  <div className={`h-1.5 w-1.5 rounded-full ${activeTab === 'sizing' ? 'bg-[#F16022]' : 'bg-white/30'}`}></div>
                </div>
                
                <div className="flex justify-center mb-8">
                  <TabsList className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-1 gap-1">
                    <TabsTrigger 
                      value="overview" 
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 data-[state=active]:bg-[#F16022] data-[state=active]:text-white data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/5"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>Overview</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="applications" 
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 data-[state=active]:bg-[#F16022] data-[state=active]:text-white data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/5"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>Applications</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="benefits" 
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 data-[state=active]:bg-[#F16022] data-[state=active]:text-white data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/5"
                    >
                      <Zap className="h-4 w-4" />
                      <span>Benefits</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="technical" 
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 data-[state=active]:bg-[#F16022] data-[state=active]:text-white data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/5"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Technical</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sizing" 
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 data-[state=active]:bg-[#F16022] data-[state=active]:text-white data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/5"
                    >
                      <Package className="h-4 w-4" />
                      <span>Sizing</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <div className="mt-8 md:mt-8">
                <TabsContent value="overview" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
                    <CardHeader className="px-4 md:px-6 py-3 md:py-4">
                      <CardTitle className="text-white text-xl md:text-2xl font-kallisto font-bold" 
                                 style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                        Product Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6 py-3 md:py-4">
                      <p className="text-white/90 text-lg leading-relaxed" 
                         style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                        {product.description}
                      </p>
                      
                      {/* Chemistry */}
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4" 
                            style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                          Chemistry
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex items-center">
                            <div className="mr-4">
                                              {product.chemistry === 'MS' && (
                  <img src="/chemistry-icons/MS icon.svg" alt="MS Chemistry" className="w-16 h-16 chemistry-icon" />
                )}
                {product.chemistry === 'Silicone' && (
                  <img src="/chemistry-icons/Silicone icon.svg" alt="Silicone Chemistry" className="w-16 h-16 chemistry-icon" />
                )}
                {product.chemistry === 'Epoxy' && (
                  <img src="/chemistry-icons/Epoxy icon.svg" alt="Epoxy Chemistry" className="w-16 h-16 chemistry-icon" />
                )}
                {product.chemistry === 'Water Base' && (
                  <img src="/chemistry-icons/Waterbase icon.svg" alt="Water Base Chemistry" className="w-16 h-16 chemistry-icon" />
                )}
                              {(!product.chemistry || !['MS', 'Silicone', 'Epoxy', 'Water Base'].includes(product.chemistry)) && (
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-2xl">{product.chemistry ? product.chemistry.charAt(0) : '?'}</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-white mb-1">
                                {product.chemistry || 'Chemistry Type'}
                              </div>
                              <div className="text-white/80">
                                {product.chemistryDetails?.technical || 'Specialized chemistry for optimal performance in various applications.'}
                              </div>
                            </div>
                          </div>
                          
                          {product.specifications && Object.entries(product.specifications).map(([key, value]) => {
                            if (typeof value === 'string' && key !== 'type' && key === 'viscosity') {
                              return (
                                <div key={key} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                  <div className="font-semibold text-white mb-1 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </div>
                                  <div className="text-white/80">{value}</div>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>

                      {/* Applications & Features */}
                      {product.specifications?.applications && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Applications
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {product.specifications.applications.map((app, index) => (
                              <Badge key={index} className="bg-white/20 backdrop-blur-sm text-white border border-white/30">
                                {app}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Features */}
                      {product.specifications?.features && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Features
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {product.specifications.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="border-white/30 text-white">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Substrates */}
                      {product.specifications?.substrates && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Compatible Substrates
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {product.specifications.substrates.map((substrate, index) => (
                              <Badge key={index} className="bg-white/10 backdrop-blur-sm text-white border border-white/20">
                                {substrate}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Certifications */}
                      {product.specifications?.certifications && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Certifications
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {product.specifications.certifications.map((cert, index) => (
                              <Badge key={index} className="bg-green-500/20 backdrop-blur-sm text-green-300 border border-green-300/30">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Packaging */}
                      {product.specifications?.packaging && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Available Packaging
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {product.specifications.packaging.map((pkg, index) => (
                              <Badge key={index} className="bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-300/30">
                                {pkg}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>



                <TabsContent value="applications" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
                    <CardHeader className="px-4 md:px-6 py-3 md:py-4">
                      <CardTitle className="text-white text-xl md:text-2xl font-kallisto font-bold" 
                                 style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                        Applications & Uses
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 md:px-6 py-3 md:py-4">
                                             <div className="grid md:grid-cols-2 gap-6">
                         <div>
                           <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3" 
                               style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                             Primary Applications
                           </h3>
                           {product.specifications?.applications ? (
                             <ul className="space-y-2 text-white/80">
                               {product.specifications.applications.map((app, index) => (
                                 <li key={index} className="flex items-start gap-2">
                                   <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                   <span>{app}</span>
                                 </li>
                               ))}
                             </ul>
                           ) : (
                             <ul className="space-y-2 text-white/80">
                               <li className="flex items-start gap-2">
                                 <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                 <span>Industrial bonding and assembly</span>
                               </li>
                               <li className="flex items-start gap-2">
                                 <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                 <span>Automotive manufacturing</span>
                               </li>
                               <li className="flex items-start gap-2">
                                 <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                 <span>Construction and building</span>
                               </li>
                               <li className="flex items-start gap-2">
                                 <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                 <span>Marine and aerospace</span>
                               </li>
                             </ul>
                           )}
                         </div>
                         <div>
                           <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3" 
                               style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                             Industry Focus
                           </h3>
                           <div className="flex items-center gap-2 mb-4">
                             {getIndustryLogo(product.industry) ? (
                                                             <img 
                                src={getIndustryLogo(product.industry)} 
                                alt={`${Array.isArray(product.industry) ? product.industry[0] || '' : product.industry} icon`}
                                className="h-8 w-8 md:h-10 md:w-10 object-contain"
                              />
                             ) : (
                                                              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">{Array.isArray(product.industry) ? product.industry[0]?.charAt(0).toUpperCase() || '' : product.industry.charAt(0).toUpperCase()}</span>
                              </div>
                            )}
                            <span className="text-white font-semibold capitalize">{Array.isArray(product.industry) ? product.industry[0] || '' : product.industry}</span>
                          </div>
                          <p className="text-white/80">
                            Specifically engineered for {Array.isArray(product.industry) ? product.industry[0]?.toLowerCase() || '' : product.industry.toLowerCase()} applications, 
                            this product delivers optimal performance in demanding environments.
                          </p>
                           
                           {/* Compatible Substrates */}
                           {product.specifications?.substrates && (
                             <div className="mt-4">
                               <h4 className="text-md font-semibold text-white mb-2">
                                 Compatible Substrates
                               </h4>
                               <div className="flex flex-wrap gap-1">
                                 {product.specifications.substrates.map((substrate, index) => (
                                   <Badge key={index} className="bg-white/10 backdrop-blur-sm text-white text-xs border border-white/20">
                                     {substrate}
                                   </Badge>
                                 ))}
                               </div>
                             </div>
                           )}
                         </div>
                       </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="benefits" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
                    <CardHeader className="px-4 md:px-6 py-3 md:py-4">
                      <CardTitle className="text-white text-xl md:text-2xl font-kallisto font-bold" 
                                 style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                        Benefits & Usage
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6 py-3 md:py-4">
                      {/* Benefits */}
                      {product.benefits && product.benefits.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Key Benefits
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {product.benefits.map((benefit, index) => (
                              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-white/90">{benefit}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* How to Use */}
                      {product.howToUse && product.howToUse.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            How to Use
                          </h3>
                          <div className="space-y-3">
                            {product.howToUse.map((instruction, index) => (
                              <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white font-bold text-sm">{index + 1}</span>
                                </div>
                                <span className="text-white/90">{instruction}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Colors */}
                      {product.colors && product.colors.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Available Colors
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {product.colors.map((color, index) => (
                              <Badge key={index} className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 py-2">
                                {color}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sizing */}
                      {product.sizing && product.sizing.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Available Sizes
                          </h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            {product.sizing.map((size, index) => (
                              <Badge key={index} className="bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-300/30 px-4 py-2">
                                {size}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Cleanup */}
                      {product.cleanup && product.cleanup.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Recommended Cleanup
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {product.cleanup.map((method, index) => (
                              <Badge key={index} className="bg-orange-500/20 backdrop-blur-sm text-orange-300 border border-orange-300/30 px-4 py-2">
                                {method}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="technical" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
                    <CardHeader className="px-4 md:px-6 py-3 md:py-4">
                      <CardTitle className="text-white text-xl md:text-2xl font-kallisto font-bold" 
                                 style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                        Technical Data
                      </CardTitle>
                    </CardHeader>
                                         <CardContent className="px-4 md:px-6 py-3 md:py-4">
                       {product.technicalData ? (
                         <div className="space-y-6">
                           {/* Physical Properties */}
                           <div>
                             <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/20 pb-2">
                               Physical Properties
                             </h4>
                             <div className="space-y-3">
                               {product.technicalData.density && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Density:</span>
                                   <span className="text-white/80">{product.technicalData.density}</span>
                                 </div>
                               )}
                               {product.technicalData.pH && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">pH:</span>
                                   <span className="text-white/80">{product.technicalData.pH}</span>
                                 </div>
                               )}
                               {product.technicalData.color && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Color:</span>
                                   <span className="text-white/80">{product.technicalData.color}</span>
                                 </div>
                               )}
                               {product.technicalData.odor && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Odor:</span>
                                   <span className="text-white/80">{product.technicalData.odor}</span>
                                 </div>
                               )}
                             </div>
                           </div>

                           {/* Storage & Handling */}
                           <div>
                             <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/20 pb-2">
                               Storage & Handling
                             </h4>
                             <div className="space-y-3">
                               {product.technicalData.shelfLife && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Shelf Life:</span>
                                   <span className="text-white/80">{product.technicalData.shelfLife}</span>
                                 </div>
                               )}
                               {product.technicalData.storageConditions && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Storage Conditions:</span>
                                   <span className="text-white/80">{product.technicalData.storageConditions}</span>
                                 </div>
                               )}
                             </div>
                           </div>

                           {/* Tape-specific technical data */}
                           {(product.technicalData.adhesiveType || product.technicalData.foamType || product.technicalData.peelStrength || product.technicalData.shearStrength) && (
                             <div>
                               <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/20 pb-2">
                                 Performance Data
                               </h4>
                               <div className="space-y-3">
                                 {product.technicalData.adhesiveType && (
                                   <div className="flex justify-between py-3 border-b border-white/10">
                                     <span className="font-semibold text-white">Adhesive Type:</span>
                                     <span className="text-white/80">{product.technicalData.adhesiveType}</span>
                                   </div>
                                 )}
                                 {product.technicalData.foamType && (
                                   <div className="flex justify-between py-3 border-b border-white/10">
                                     <span className="font-semibold text-white">Foam Type:</span>
                                     <span className="text-white/80">{product.technicalData.foamType}</span>
                                   </div>
                                 )}
                                 {product.technicalData.peelStrength && (
                                   <div className="flex justify-between py-3 border-b border-white/10">
                                     <span className="font-semibold text-white">Peel Strength:</span>
                                     <span className="text-white/80">{product.technicalData.peelStrength}</span>
                                   </div>
                                 )}
                                 {product.technicalData.shearStrength && (
                                   <div className="flex justify-between py-3 border-b border-white/10">
                                     <span className="font-semibold text-white">Shear Strength:</span>
                                     <span className="text-white/80">{product.technicalData.shearStrength}</span>
                                   </div>
                                 )}
                               </div>
                             </div>
                           )}
                         </div>
                       ) : (
                         <p className="text-white/70">No technical data available for this product.</p>
                       )}
                     </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="sizing" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
                    <CardHeader className="px-4 md:px-6 py-3 md:py-4">
                      <CardTitle className="text-white text-xl md:text-2xl font-kallisto font-bold" 
                                 style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                        Available Sizes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6 py-3 md:py-4">
                      {/* Sizes */}
                      {product.sizes && product.sizes.length > 0 ? (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Available Packaging Options
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {product.sizes.map((size, index) => (
                              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-center gap-3">
                                  <Package className="h-5 w-5 text-blue-300" />
                                  <span className="text-white/90 font-medium">{size}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Package className="h-16 w-16 text-white/30 mx-auto mb-4" />
                          <p className="text-white/70 text-lg">No sizing information available for this product.</p>
                          <p className="text-white/50 text-sm mt-2">Contact us for custom sizing options.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mb-12">
              <div className="mb-8">
                <h2 className="text-3xl font-kallisto font-bold text-white mb-2" 
                    style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                  Related Products
                </h2>
                <p className="text-gray-300">More {product.industry} solutions</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, idx) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="group"
                  >
                    <Link to={`/products/${relatedProduct.category.toLowerCase()}/${relatedProduct.id}`}>
                      <div className={`relative h-[300px] rounded-2xl overflow-hidden bg-gradient-to-b ${industryColor(relatedProduct.industry)} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]`}>
                        {/* Background Image */}
                        <div className="absolute inset-0">
                          <img 
                            src={relatedProduct.imageUrl || relatedProduct.image} 
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                          {/* Top Section */}
                          <div className="flex items-start justify-between">
                            <Badge className={`bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wide`}>
                              {relatedProduct.category}
                            </Badge>
                          </div>

                          {/* Bottom Section with Text Overlay */}
                          <div className="relative -mx-4 -mb-4">
                            {/* Text Background Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-b-2xl"></div>
                            
                            {/* Text Content */}
                            <div className="relative z-10 p-4">
                              <h3 className="text-lg font-kallisto font-bold mb-2 leading-tight" 
                                  style={{ fontFamily: typography.products.fontFamily, fontWeight: typography.products.fontWeight }}>
                                {relatedProduct.name.split('–')[0].trim()}
                              </h3>
                              <p className="text-sm text-gray-300 line-clamp-2" 
                                 style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                                {relatedProduct.name.split('–')[1]?.trim() || relatedProduct.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Call to Action */}
          <section className="text-center">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6 py-3 md:py-4">
                <h2 className="text-3xl font-kallisto font-bold text-white" 
                    style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto" 
                   style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                  Contact our technical team for expert guidance and support with your application.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    onClick={() => {
                      // Check if TDS files are available
                      const tdsLink = product.standardTdsLink || product.pdfLinks?.[0];
                      if (tdsLink && tdsLink.startsWith('/TDS/')) {
                        // TDS files are temporarily unavailable
                        alert("Technical Data Sheets are temporarily unavailable. Please contact us for product information.");
                      } else if (tdsLink) {
                        // External link or other PDF
                        window.location.href = `/pdf-viewer/${encodeURIComponent(tdsLink)}`;
                      } else {
                        alert("The datasheet for this product is not available yet.");
                      }
                    }}
                    className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-6 text-xl"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    View Full Datasheet
                  </Button>
                  <Link to="/contact">
                    <Button 
                      variant="outline"
                      className="border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white rounded-full px-8 py-6 text-xl transition-all duration-300"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage; 