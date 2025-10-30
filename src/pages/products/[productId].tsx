import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowLeft, Phone, Mail, BookOpen, Settings, Zap, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { industries as industriesData } from '@/data/industries';
import { brandColors, productColors, industryColors, typography } from '@/styles/brandStandards';
import { getProduct, getRelatedProducts } from '@/utils/products';
import HeaderV2 from '@/components/Header/HeaderV2';
import Footer from '@/components/Footer';
import DynamicMetaTags from '@/components/DynamicMetaTags';

// Chemistry icon paths - updated to use organized chemistry icons
const CHEMISTRY_ICONS = {
  acrylic: '/images/icons/chemistry/Acrylic icon.svg',
  epoxy: '/images/icons/chemistry/Epoxy Icon.svg',
  modifiedEpoxy: '/images/icons/chemistry/Modified Epoxy icon.svg',
  silicone: '/images/icons/chemistry/Silicone icon.svg',
  ms: '/images/icons/chemistry/MS icon.svg',
  waterbase: '/images/icons/chemistry/Water Based icon.svg',
  hotmelt: '/images/icons/chemistry/Hotmelt icon.svg',
  solventbase: '/images/icons/chemistry/Solvent Based icon.svg',
  polyurethane: '/images/icons/chemistry/Polyurethane icon.svg',
  cyanoacrylates: '/images/icons/chemistry/Cyanoacrylates Icon.svg',
  methacrylate: '/images/icons/chemistry/Methacrylate icon.svg',
  rubberbased: '/images/icons/chemistry/rubber based icon.svg'
};

// Helper to get chemistry icon
const getChemistryIcon = (chemistry: string) => {
  if (!chemistry) return null;
  
  const chemistryLower = chemistry.toLowerCase();
  
  // Map chemistry names to icon paths
  if (chemistryLower.includes('acrylic') || chemistryLower.includes('psa')) {
    return CHEMISTRY_ICONS.acrylic;
  } else if (chemistryLower.includes('epoxy') && !chemistryLower.includes('modified')) {
    return CHEMISTRY_ICONS.epoxy;
  } else if (chemistryLower.includes('modified') && chemistryLower.includes('epoxy')) {
    return CHEMISTRY_ICONS.modifiedEpoxy;
  } else if (chemistryLower.includes('silicone')) {
    return CHEMISTRY_ICONS.silicone;
  } else if (chemistryLower.includes('ms') || chemistryLower.includes('hybrid') || chemistryLower.includes('polymer')) {
    return CHEMISTRY_ICONS.ms;
  } else if (chemistryLower.includes('water') || chemistryLower.includes('waterbase')) {
    return CHEMISTRY_ICONS.waterbase;
  } else if (chemistryLower.includes('hot') && chemistryLower.includes('melt')) {
    return CHEMISTRY_ICONS.hotmelt;
  } else if (chemistryLower.includes('solvent')) {
    return CHEMISTRY_ICONS.solventbase;
  } else if (chemistryLower.includes('polyurethane') || chemistryLower.includes('urethane')) {
    return CHEMISTRY_ICONS.polyurethane;
  } else if (chemistryLower.includes('cyanoacrylate') || chemistryLower.includes('cyano')) {
    return CHEMISTRY_ICONS.cyanoacrylates;
  } else if (chemistryLower.includes('methacrylate')) {
    return CHEMISTRY_ICONS.methacrylate;
  } else if (chemistryLower.includes('rubber')) {
    return CHEMISTRY_ICONS.rubberbased;
  }
  
  return null;
};

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
  
  // Use gradients with 70% blue and 30% industry color
  switch (industryLower) {
    case 'marine':
      return 'from-[#1b3764] via-[#1b3764] to-[#137875]'; // 70% blue, 30% Marine teal
    case 'industrial':
      return 'from-[#1b3764] via-[#1b3764] to-[#F16A26]'; // 70% blue, 30% Industrial orange
    case 'transportation':
      return 'from-[#1b3764] via-[#1b3764] to-[#b83d35]'; // 70% blue, 30% Transportation red
    case 'construction':
      return 'from-[#1b3764] via-[#1b3764] to-[#fec770]'; // 70% blue, 30% Construction yellow
    // case 'foam':
    //   return 'from-[#1b3764] via-[#1b3764] to-[#7a6fb0]'; // 70% blue, 30% Foam purple
    case 'composites':
      return 'from-[#1b3764] via-[#1b3764] to-[#c7c8c9]'; // 70% blue, 30% Composites gray
    case 'insulation':
      return 'from-[#1b3764] via-[#1b3764] to-[#d0157d]'; // 70% blue, 30% Insulation pink
    default:
      return 'from-[#1b3764] to-[#1b3764]'; // Default blue
  }
};

const ProductDetailPage: React.FC = () => {
  const { productId, productCategory } = useParams<{ productId: string; productCategory?: string }>();
  const [activeTab, setActiveTab] = useState('applications');
  const tabsListRef = useRef<HTMLDivElement>(null);
  
  // Make navbar active immediately on this page
  useEffect(() => {
    // Trigger a scroll event to activate the navbar
    window.dispatchEvent(new Event('scroll'));
  }, []);

  // Function to scroll to the active tab
  const scrollToActiveTab = useCallback(() => {
    if (tabsListRef.current) {
      // Find all tab elements
      const tabElements = tabsListRef.current.querySelectorAll('[role="tab"]');
      const tabValues = ['applications', 'benefits', 'technical', 'sizing'];
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
      
      const tabValues = ['applications', 'benefits', 'technical', 'sizing'];
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
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const productData = await getProduct(productId);
        setProduct(productData);
        
        if (productData) {
          const related = await getRelatedProducts(productId, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Failed to load product:', error);
        setProduct(null);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  // Normalize sizing/packaging into a single list for Sizing tab
  const normalizeToList = useCallback((value: unknown): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value
        .filter((v): v is string => typeof v === 'string')
        .map(v => v.trim())
        .filter(v => v.length > 0);
    }
    if (typeof value === 'string') {
      // Split on bullets or newlines
      return value
        .split(/\n|•/g)
        .map(v => v.trim().replace(/^[-–·\u2022]\s*/, ''))
        .filter(v => v.length > 0);
    }
    return [];
  }, []);

  const sizesAndPackaging = useMemo(() => {
    if (!product) return [];
    const sizes = normalizeToList((product as any).sizes);
    const sizing = normalizeToList((product as any).sizing);
    const packaging = normalizeToList((product as any).specifications?.packaging);
    // Merge and dedupe
    const merged = [...sizes, ...sizing, ...packaging];
    return Array.from(new Set(merged));
  }, [product, normalizeToList]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <HeaderV2 />
        <main className="flex-1 pb-10">
          {/* Hero Skeleton */}
          <section className="mb-12 bg-gradient-to-r from-[#477197] to-[#2c476e] pt-5">
            <div className="max-w-[1200px] mx-auto px-4 py-16">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Side Skeleton */}
                <div>
                  <div className="flex gap-3 mb-6">
                    <div className="h-10 w-24 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="h-10 w-32 bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 w-full bg-white/20 rounded-lg animate-pulse"></div>
                    <div className="h-8 w-3/4 bg-white/20 rounded-lg animate-pulse"></div>
                  </div>
                </div>
                {/* Right Side Skeleton */}
                <div className="h-96 bg-white/10 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </section>

          {/* Tabs Skeleton */}
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="mb-12 bg-gradient-to-b from-[#477197] to-[#2c476e] rounded-2xl p-6 md:p-8">
              {/* Tab Buttons Skeleton */}
              <div className="flex gap-4 mb-8">
                <div className="h-10 w-32 bg-white/20 rounded-full animate-pulse"></div>
                <div className="h-10 w-32 bg-white/20 rounded-full animate-pulse"></div>
                <div className="h-10 w-32 bg-white/20 rounded-full animate-pulse"></div>
                <div className="h-10 w-32 bg-white/20 rounded-full animate-pulse"></div>
              </div>

              {/* Content Skeleton */}
              <div className="space-y-4">
                <div className="h-8 w-1/4 bg-white/20 rounded-lg animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-white/20 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-white/20 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-white/20 rounded animate-pulse"></div>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="h-4 w-full bg-white/20 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-white/20 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-white/20 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <HeaderV2 />
        <main className="flex-1 pt-20 pb-10">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h1 className="text-4xl font-kallisto font-black text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link to="/products">
              <Button className="bg-gradient-to-r from-[#477197] to-[#2c476e] hover:from-[#3a4a6a] hover:to-[#1a2340] text-white rounded-full px-8 py-6 text-xl">
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
    <div className="min-h-screen bg-white flex flex-col">
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
      <HeaderV2 />
      <main className="flex-1 pb-10">
        {/* Hero Section - Full width background */}
        <section className="mb-12 bg-gradient-to-r from-[#477197] to-[#2c476e]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden"
          >
            {/* Content Container - Centered with max-width */}
            <div className="max-w-[1200px] mx-auto px-4 py-16">
              
              {/* Content */}
              <div className="relative p-8 md:p-12 text-white">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Product Info */}
                  <div>
                    {/* Badges */}
                    <div className="flex gap-3 mb-6">
                      <Badge className="bg-white text-gray-900 border-0 px-4 py-2 font-bold">
                        {product.category}
                      </Badge>
                      <Badge className="bg-white/10 backdrop-blur-sm text-white border border-white/20 flex items-center gap-1 px-4 py-2">
                        {getIndustryLogo(product.industry) ? (
                          <img 
                            src={getIndustryLogo(product.industry)} 
                            alt={`${Array.isArray(product.industry) ? (product.industry[0] || '') : product.industry} icon`}
                            className="h-4 w-4 object-contain"
                          />
                        ) : (
                          <span className="capitalize">{(Array.isArray(product.industry) ? (product.industry[0] || '') : product.industry).charAt(0)}</span>
                        )}
                        <span className="capitalize">{Array.isArray(product.industry) ? (product.industry[0] || '') : product.industry}</span>
                      </Badge>
                    </div>

                    {/* Product ID */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-1 sm:mb-2 md:mb-4 leading-none font-kallisto text-left">
                      {product.id.toUpperCase()}
                    </h1>
                    <div className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed text-left">
                      {product.name.split('–')[1]?.trim() || product.description}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        onClick={() => {
                          window.location.href = '/contact';
                        }}
                        className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full px-8 py-6 text-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Us
                      </Button>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="flex justify-center lg:justify-end relative h-[400px] md:h-[500px] lg:h-[600px]">
                    {/* Large Background Product Image - Full Size */}
                    <div className="flex items-center justify-center opacity-100 h-full">
                      <img 
                        src={product.imageUrl || product.image} 
                        alt={product.name}
                        className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] object-contain drop-shadow-2xl"
                        style={{
                          filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.1)) brightness(1.2) contrast(1.1)'
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          // Try fallback to product-images folder
                          if (target.src.includes('vercel-storage') || target.src.includes('blob')) {
                            const filename = product.id.toLowerCase() + '.png';
                            target.src = `/product-images/${filename}`;
                          } else if (!target.src.includes('placeholder')) {
                            target.src = '/placeholder.svg';
                          }
                        }}
                      />
                    </div>
                    

                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="max-w-[1200px] mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Link to="/products" className="hover:text-gray-900 transition-colors">
                Products
              </Link>
              <span>/</span>
              <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-gray-900 transition-colors">
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-semibold">{product.name}</span>
            </div>
          </nav>

          {/* Product Details Tabs */}
          <motion.section 
            className="mb-12 bg-gradient-to-b from-[#477197] to-[#2c476e] rounded-2xl p-6 md:p-8"
            layout
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
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

                  <div className={`h-1.5 w-1.5 rounded-full ${activeTab === 'applications' ? 'bg-[#115B87]' : 'bg-white/30'}`}></div>
                  <div className={`h-1.5 w-1.5 rounded-full ${activeTab === 'benefits' ? 'bg-[#115B87]' : 'bg-white/30'}`}></div>
                  <div className={`h-1.5 w-1.5 rounded-full ${activeTab === 'technical' ? 'bg-[#115B87]' : 'bg-white/30'}`}></div>
                  <div className={`h-1.5 w-1.5 rounded-full ${activeTab === 'sizing' ? 'bg-[#115B87]' : 'bg-white/30'}`}></div>
                </div>
                
                <div className="flex justify-center mb-8">
                  <TabsList className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-1 gap-1 relative">
                    {/* Animated sliding pill background */}
                    <motion.div
                      className="absolute bg-white rounded-full"
                      animate={{
                        left: activeTab === 'applications' ? 4 : 
                               activeTab === 'benefits' ? 'calc(25% + 4px)' :
                               activeTab === 'technical' ? 'calc(50% + 4px)' :
                               'calc(75% + 4px)',
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      style={{
                        top: 4,
                        bottom: 4,
                        width: 'calc(25% - 3px)',
                      }}
                    />

                    <TabsTrigger 
                      value="applications" 
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative z-10 data-[state=active]:text-[#477197] data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>Applications</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="benefits" 
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative z-10 data-[state=active]:text-[#477197] data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white"
                    >
                      <Zap className="h-4 w-4" />
                      <span>Benefits</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="technical" 
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative z-10 data-[state=active]:text-[#477197] data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Technical</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sizing" 
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative z-10 data-[state=active]:text-[#477197] data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white"
                    >
                      <Package className="h-4 w-4" />
                      <span>Sizing</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <motion.div 
                className="mt-8 md:mt-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >




                <TabsContent value="applications" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}
                    layout
                  >
                  <motion.div layout transition={{ duration: 0.5 }}>
                  <Card className="bg-gradient-to-r from-[#477197] to-[#2c476e] border border-gray-200 rounded-2xl">
                    <CardHeader className="px-4 md:px-6 py-3 md:py-4">
                      <CardTitle className="text-white text-xl md:text-2xl font-kallisto font-bold" 
                                 style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                        Applications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 md:px-6 py-3 md:py-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          {product.applications && product.applications.length > 0 ? (
                            <ul className="space-y-2 text-white/80">
                              {product.applications.map((app, index) => (
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
                          <div className="flex items-center gap-6 mb-6">
                            {getIndustryLogo(product.industry) ? (
                              <img 
                                src={getIndustryLogo(product.industry)} 
                                alt={`${Array.isArray(product.industry) ? product.industry[0] || '' : product.industry} icon`}
                                className="h-24 w-24 md:h-32 md:w-32 object-contain"
                              />
                            ) : (
                              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-3xl md:text-4xl">{Array.isArray(product.industry) ? product.industry[0]?.charAt(0).toUpperCase() || '' : product.industry.charAt(0).toUpperCase()}</span>
                              </div>
                            )}
                            <span className="text-white font-semibold capitalize text-2xl md:text-3xl">{Array.isArray(product.industry) ? product.industry[0] || '' : product.industry}</span>
                          </div>
                          <p className="text-white/80 text-lg">
                            Specifically engineered for {Array.isArray(product.industry) ? product.industry[0]?.toLowerCase() || '' : product.industry.toLowerCase()} applications, 
                            this product delivers optimal performance in demanding environments.
                          </p>
                           
                          {/* Compatible Substrates */}
                          {product.specifications?.substrates && (
                            <div className="mt-4">
                              <h4 className="text-lg font-semibold text-white mb-2">
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
                  </motion.div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="benefits" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}
                    layout
                  >
                  <motion.div layout transition={{ duration: 0.5 }}>
                  <Card className="bg-gradient-to-r from-[#477197] to-[#2c476e] border border-gray-200 rounded-2xl">
                    <CardHeader className="px-4 md:px-6 py-3 md:py-4">
                      <CardTitle className="text-white text-xl md:text-2xl font-kallisto font-bold" 
                                 style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                        Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6 py-3 md:py-4">
                      {/* Benefits */}
                      {product.benefits && product.benefits.length > 0 && (
                        <div>
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
                              <Badge key={index} className="bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-300/30 px-4 py-2">
                                {method}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  </motion.div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="technical" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}
                    layout
                  >
                  <motion.div layout transition={{ duration: 0.5 }}>
                  <Card className="bg-gradient-to-r from-[#477197] to-[#2c476e] border border-gray-200 rounded-2xl">
                    <CardHeader className="px-4 md:px-6 py-3 md:py-4">
                      <CardTitle className="text-white text-xl md:text-2xl font-kallisto font-bold" 
                                 style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                        Technical Data
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 md:px-6 py-3 md:py-4">
                      {/* Chemistry Section - Above the table */}
                      <div className="mb-6">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4" 
                            style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                          Chemistry
                        </h3>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex items-center">
                          <div className="mr-4">
                            {(() => {
                              const chemIcon = getChemistryIcon(product.chemistry);
                              if (chemIcon) {
                                return <img src={chemIcon} alt={`${product.chemistry} Chemistry`} className="w-24 h-24 md:w-28 md:h-28 chemistry-icon" />;
                              } else {
                                return (
                                  <div className="w-24 h-24 md:w-28 md:h-28 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">
                                      {product.chemistry ? (typeof product.chemistry === 'string' ? product.chemistry.charAt(0) : '?') : '?'}
                                    </span>
                                  </div>
                                );
                              }
                            })()}
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
                      </div>

                      {/* Technical Data Table - Dynamic display of all properties */}
                      {product.technicalData && Object.keys(product.technicalData).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(product.technicalData).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-3 border-b border-white/10">
                              <span className="font-semibold text-white">{key}:</span>
                              <span className="text-white/80">{String(value) || 'N/A'}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-white/70">No technical data available for this product.</p>
                      )}

                      {/* Tape Test Data Table - Only for TAPE products */}
                      {product.category === 'TAPE' && product.technicalData?.testData && (
                        <div className="mt-6">
                          <h3 className="text-lg md:text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Test Data
                          </h3>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-white/20">
                                  <th className="text-left py-3 px-2 font-semibold text-white">Property</th>
                                  <th className="text-left py-3 px-2 font-semibold text-white">Value</th>
                                  <th className="text-left py-3 px-2 font-semibold text-white">Methods</th>
                                </tr>
                              </thead>
                              <tbody>
                                {product.technicalData.testData.map((test, index) => (
                                  <tr key={index} className="border-b border-white/10">
                                    <td className="py-3 px-2 text-white/90 font-medium">{test.property}</td>
                                    <td className="py-3 px-2 text-white/80">{test.value || '-'}</td>
                                    <td className="py-3 px-2 text-white/70 text-xs">{test.method}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                     </CardContent>
                  </Card>
                  </motion.div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="sizing" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}
                    layout
                  >
                  <motion.div layout transition={{ duration: 0.5 }}>
                  <Card className="bg-gradient-to-r from-[#477197] to-[#2c476e] border border-gray-200 rounded-2xl">
                    <CardHeader className="px-4 md:px-6 py-3 md:py-4">
                      <CardTitle className="text-white text-xl md:text-2xl font-kallisto font-bold" 
                                 style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                        Available Sizes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 px-4 md:px-6 py-3 md:py-4">
                      {/* Sizes (includes packaging data under same label) */}
                      {sizesAndPackaging.length > 0 ? (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4"
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Available Sizes
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {sizesAndPackaging.map((size, index) => (
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
                          <p className="text-white/50 text-sm mt-2">Contact us for options.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  </motion.div>
                  </motion.div>
                </TabsContent>
              </motion.div>
            </Tabs>
          </motion.section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mb-12 bg-gradient-to-b from-[#477197] to-[#2c476e] rounded-2xl p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-kallisto font-bold text-white mb-2" 
                    style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                  Related Products
                </h2>
                <p className="text-white/80">More {product.industry} solutions</p>
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
                      <div className="relative h-[300px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#477197] to-[#2c476e] shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                          <img 
                            src={relatedProduct.imageUrl || relatedProduct.image} 
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              // Try fallback to product-images folder
                              if (target.src.includes('vercel-storage') || target.src.includes('blob')) {
                                const filename = relatedProduct.id.toLowerCase() + '.png';
                                target.src = `/product-images/${filename}`;
                              } else if (!target.src.includes('placeholder') && !target.src.includes('product-images')) {
                                target.src = '/placeholder.svg';
                              }
                            }}
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
            <Card className="bg-gradient-to-r from-[#477197] to-[#2c476e] border border-gray-200 rounded-2xl p-8">
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
                  <Link to="/contact">
                    <Button 
                      className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full px-8 py-6 text-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
      
      {/* Gradient Toggle Modal */}
    </div>
  );
};

export default ProductDetailPage; 