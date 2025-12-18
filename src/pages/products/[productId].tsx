import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowLeft, Phone, Mail, BookOpen, Settings, Zap, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { industries as industriesData } from '@/data/industries';
import { brandColors, productColors, industryColors, typography } from '@/styles/brandStandards';
import { getProduct, getRelatedProducts, getProducts } from '@/utils/products';
import HeaderV2 from '@/components/Header/HeaderV2';
import FooterV2 from '@/components/FooterV2';
import DynamicMetaTags from '@/components/DynamicMetaTags';
import ImageSkeleton from '@/components/common/ImageSkeleton';

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

// Helper to convert text to title case
const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
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
      return 'from-[#1b3764] via-[#1b3764] to-[#9a9b9c]'; // 70% blue, 30% Composites gray
    case 'insulation':
      return 'from-[#1b3764] via-[#1b3764] to-[#d0157d]'; // 70% blue, 30% Insulation pink
    default:
      return 'from-[#1b3764] to-[#1b3764]'; // Default blue
  }
};

// Helper to get mobile hero image based on category
const getMobileHeroImage = (category: string): string => {
  const cat = (category || '').toLowerCase();
  switch (cat) {
    case 'bond':
      return '/images/product-heroes/Forza Bond Mobile Header.jpg';
    case 'seal':
      return '/images/product-heroes/Forza Seal Mobile Header.jpg';
    case 'tape':
      return '/images/product-heroes/Forza Tape Mobile Header.jpg';
    case 'ruggedred':
    case 'cleaners':
      return '/images/product-heroes/RuggedRed Mobile Header.jpg';
    default:
      return '/images/product-heroes/Forza Bond Mobile Header.jpg'; // Default fallback
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
  
  // Image loading states
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [mobileHeroImageLoaded, setMobileHeroImageLoaded] = useState(false);
  const [industryLogoLoaded, setIndustryLogoLoaded] = useState(false);
  const [chemistryIconLoaded, setChemistryIconLoaded] = useState(false);
  const [relatedProductImagesLoaded, setRelatedProductImagesLoaded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      // Reset image loading states when product changes
      setMainImageLoaded(false);
      setMobileHeroImageLoaded(false);
      setIndustryLogoLoaded(false);
      setChemistryIconLoaded(false);
      setRelatedProductImagesLoaded({});
      
      try {
        const productData = await getProduct(productId);
        setProduct(productData);
        
        if (productData) {
          // Get all products and filter for ones with images
          const allProducts = await getProducts();
          
          // Filter for products with actual images (exclude current product)
          const productsWithImages = allProducts.filter(p => 
            p.id !== productData.id && 
            p.imageUrl && 
            p.imageUrl.trim() !== '' &&
            !p.imageUrl.includes('placeholder') &&
            !p.imageUrl.includes('logo')
          );
          
          // Try to get products from different categories first, then fall back to same industry
          let related: any[] = [];
          
          // Get products from different categories
          const differentCategory = productsWithImages.filter(p => 
            p.category?.toLowerCase() !== productData.category?.toLowerCase()
          );
          
          // Get products from same industry but different category
          const sameIndustryDifferentCategory = productsWithImages.filter(p => 
            p.category?.toLowerCase() !== productData.category?.toLowerCase() &&
            p.industry && 
            Array.isArray(p.industry) &&
            productData.industry &&
            Array.isArray(productData.industry) &&
            p.industry.some(ind => productData.industry.includes(ind))
          );
          
          // Combine: prefer different category, then same industry different category, then any with images
          if (differentCategory.length > 0) {
            related = differentCategory.slice(0, 4);
          } else if (sameIndustryDifferentCategory.length > 0) {
            related = sameIndustryDifferentCategory.slice(0, 4);
          } else {
            // Fall back to same industry with images
            const sameIndustry = productsWithImages.filter(p => 
              p.industry && 
              Array.isArray(p.industry) &&
              productData.industry &&
              Array.isArray(productData.industry) &&
              p.industry.some(ind => productData.industry.includes(ind))
            );
            related = sameIndustry.slice(0, 4);
          }
          
          // If still not enough, fill with any products with images
          if (related.length < 4) {
            const remaining = productsWithImages
              .filter(p => !related.some(r => r.id === p.id))
              .slice(0, 4 - related.length);
            related = [...related, ...remaining];
          }
          
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
      <div className="min-h-screen bg-gray-100 flex flex-col">
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
        <FooterV2 />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
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
        <FooterV2 />
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
        {/* Product Image, Title and Description */}
        <section className="bg-gradient-to-r from-[#477197] to-[#2c476e] pt-16 lg:pt-20 xl:pt-24">
          <div className="max-w-[1200px] mx-auto px-4 py-12 md:py-16 lg:py-12 xl:py-20">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Product Image */}
              <div className="flex justify-center lg:justify-start relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px]">
                {/* Mobile/Tablet Hero Image */}
                <div className="lg:hidden w-full h-full relative">
                  {!mobileHeroImageLoaded && (
                    <ImageSkeleton className="w-full h-full rounded-lg" />
                  )}
                <img 
                  src={getMobileHeroImage(product.category)}
                  alt={`${product.category} Hero`}
                    className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${
                      mobileHeroImageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setMobileHeroImageLoaded(true)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = product.imageUrl || product.image || '/placeholder.svg';
                      setMobileHeroImageLoaded(true);
                  }}
                />
                </div>
                {/* Desktop Product Image */}
                <div className="hidden lg:block relative w-[450px] h-[450px] xl:w-[500px] xl:h-[500px] 2xl:w-[600px] 2xl:h-[600px]">
                  {!mainImageLoaded && (
                    <ImageSkeleton className="w-full h-full" />
                  )}
                <img 
                  src={product.imageUrl || product.image} 
                  alt={product.name}
                    className={`w-full h-full object-contain transition-opacity duration-500 ${
                      mainImageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setMainImageLoaded(true)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('vercel-storage') || target.src.includes('blob')) {
                      const filename = product.id.toLowerCase() + '.png';
                      target.src = `/product-images/${filename}`;
                    } else if (!target.src.includes('placeholder')) {
                      target.src = '/placeholder.svg';
                    }
                      setMainImageLoaded(true);
                  }}
                />
                </div>
              </div>
              
              {/* Product Info */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-regular text-white mb-1 sm:mb-2 md:mb-4 leading-none font-poppins text-left">
                  {product.name.split('–')[0]?.trim() || product.name}
                </h1>
                <div className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed text-left">
                  {product.name.split('–')[1]?.trim() || product.description}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Section - Grey Background */}
        <section className="bg-gray-100 pb-12">
        <div className="max-w-[1200px] mx-auto px-4 pt-8">
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Tabs Selector - Above Content Container */}
              <div className="flex justify-center mb-6">
                <TabsList className="inline-flex bg-transparent rounded-full p-1 gap-3">
                    <TabsTrigger 
                      value="applications" 
                    className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 data-[state=active]:bg-[#477197] data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:bg-gray-300"
                    >
                    Applications
                    </TabsTrigger>
                    <TabsTrigger 
                      value="benefits" 
                    className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 data-[state=active]:bg-[#477197] data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:bg-gray-300"
                    >
                    Benefits
                    </TabsTrigger>
                    <TabsTrigger 
                      value="technical" 
                    className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 data-[state=active]:bg-[#477197] data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:bg-gray-300"
                    >
                    Technical
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sizing" 
                    className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 data-[state=active]:bg-[#477197] data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:bg-gray-300"
                    >
                    Sizing
                    </TabsTrigger>
                  </TabsList>
              </div>

              {/* Product Details Tabs Content Container */}
              <motion.section 
                className="mb-12 bg-gradient-to-b from-[#477197] to-[#2c476e] rounded-2xl p-6 md:p-8"
                layout
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
              <motion.div 
                className="mt-2 md:mt-2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >




                <TabsContent value="applications" className="space-y-6">
                  {loading ? (
                    <Card className="bg-transparent border-0 rounded-2xl">
                      <CardHeader className="px-4 md:px-6 pt-2 pb-3 md:pt-2 md:pb-4">
                        <Skeleton className="h-8 w-40 bg-white/20" />
                      </CardHeader>
                      <CardContent className="px-4 md:px-6 py-3 md:py-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Skeleton className="h-4 w-full bg-white/20" />
                            <Skeleton className="h-4 w-full bg-white/20" />
                            <Skeleton className="h-4 w-3/4 bg-white/20" />
                          </div>
                          <div className="space-y-3">
                            <Skeleton className="h-24 w-24 bg-white/20 rounded-full" />
                            <Skeleton className="h-4 w-full bg-white/20" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}
                    layout
                  >
                  <motion.div layout transition={{ duration: 0.5 }}>
                  <Card className="bg-transparent border-0 rounded-2xl">
                    <CardHeader className="px-4 md:px-6 pt-2 pb-3 md:pt-2 md:pb-4">
                      <CardTitle className="text-white font-poppins font-regular" 
                                 style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight, fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 2.5rem)' }}>
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
                              <div className="relative h-24 w-24 md:h-32 md:w-32">
                                {!industryLogoLoaded && (
                                  <ImageSkeleton className="w-full h-full rounded-full" />
                                )}
                              <img 
                                src={getIndustryLogo(product.industry)} 
                                alt={`${Array.isArray(product.industry) ? product.industry[0] || '' : product.industry} icon`}
                                  className={`h-24 w-24 md:h-32 md:w-32 object-contain transition-opacity duration-500 ${
                                    industryLogoLoaded ? 'opacity-100' : 'opacity-0'
                                  }`}
                                  onLoad={() => setIndustryLogoLoaded(true)}
                                  onError={() => setIndustryLogoLoaded(true)}
                              />
                              </div>
                            ) : (
                              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-3xl md:text-4xl">{Array.isArray(product.industry) ? product.industry[0]?.charAt(0).toUpperCase() || '' : product.industry.charAt(0).toUpperCase()}</span>
                              </div>
                            )}
                            <span className="text-white capitalize font-kallisto" style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight, fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 2.5rem)' }}>{Array.isArray(product.industry) ? product.industry[0] || '' : product.industry}</span>
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
                  )}
                </TabsContent>

                <TabsContent value="benefits" className="space-y-6">
                  {loading ? (
                    <Card className="bg-transparent border-0 rounded-2xl">
                      <CardHeader className="px-4 md:px-6 pt-2 pb-3 md:pt-2 md:pb-4">
                        <Skeleton className="h-8 w-32 bg-white/20" />
                      </CardHeader>
                      <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6 py-3 md:py-4">
                        <div className="space-y-3">
                          <Skeleton className="h-4 w-full bg-white/20" />
                          <Skeleton className="h-4 w-full bg-white/20" />
                          <Skeleton className="h-4 w-3/4 bg-white/20" />
                          <Skeleton className="h-4 w-full bg-white/20" />
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}
                    layout
                  >
                  <motion.div layout transition={{ duration: 0.5 }}>
                  <Card className="bg-transparent border-0 rounded-2xl">
                    <CardHeader className="px-4 md:px-6 pt-2 pb-3 md:pt-2 md:pb-4">
                      <CardTitle className="text-white font-poppins font-regular" 
                                 style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight, fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 2.5rem)' }}>
                        Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6 py-3 md:py-4">
                      {/* Benefits */}
                      {product.benefits && product.benefits.length > 0 && (
                        <ul className="space-y-2 text-white/80">
                            {product.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                              <span>{benefit}</span>
                            </li>
                            ))}
                        </ul>
                      )}

                      {/* Colors */}
                      {product.colors && product.colors.length > 0 && (
                        <ul className="space-y-2 text-white/80">
                            {product.colors.map((color, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                              <span>{color}</span>
                            </li>
                            ))}
                        </ul>
                      )}

                      {/* Sizing */}
                      {product.sizing && product.sizing.length > 0 && (
                        <ul className="space-y-2 text-white/80">
                            {product.sizing.map((size, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                              <span>{toTitleCase(size)}</span>
                            </li>
                            ))}
                        </ul>
                      )}

                      {/* Cleanup */}
                      {product.cleanup && product.cleanup.length > 0 && (
                        <ul className="space-y-2 text-white/80">
                            {product.cleanup.map((method, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                              <span>{method}</span>
                            </li>
                            ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                  </motion.div>
                  </motion.div>
                  )}
                </TabsContent>

                <TabsContent value="technical" className="space-y-6">
                  {loading ? (
                    <Card className="bg-transparent border-0 rounded-2xl">
                      <CardHeader className="px-4 md:px-6 pt-2 pb-3 md:pt-2 md:pb-4">
                        <Skeleton className="h-8 w-40 bg-white/20" />
                      </CardHeader>
                      <CardContent className="px-4 md:px-6 py-3 md:py-4">
                        <div className="mb-6">
                          <Skeleton className="h-6 w-32 bg-white/20 mb-3" />
                          <Skeleton className="h-24 w-full bg-white/20 rounded-xl" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Skeleton className="h-12 w-full bg-white/20" />
                          <Skeleton className="h-12 w-full bg-white/20" />
                          <Skeleton className="h-12 w-full bg-white/20" />
                          <Skeleton className="h-12 w-full bg-white/20" />
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}
                    layout
                  >
                  <motion.div layout transition={{ duration: 0.5 }}>
                  <Card className="bg-transparent border-0 rounded-2xl">
                    <CardHeader className="px-4 md:px-6 pt-2 pb-3 md:pt-2 md:pb-4">
                      <CardTitle className="text-white font-poppins font-regular" 
                                 style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight, fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 2.5rem)' }}>
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
                          <div className="mr-4 relative">
                            {(() => {
                              const chemIcon = getChemistryIcon(product.chemistry);
                              if (chemIcon) {
                                return (
                                  <>
                                    {!chemistryIconLoaded && (
                                      <ImageSkeleton className="w-24 h-24 md:w-28 md:h-28 rounded-full" />
                                    )}
                                    <img 
                                      src={chemIcon} 
                                      alt={`${product.chemistry} Chemistry`} 
                                      className={`w-24 h-24 md:w-28 md:h-28 chemistry-icon transition-opacity duration-500 ${
                                        chemistryIconLoaded ? 'opacity-100' : 'opacity-0'
                                      }`}
                                      onLoad={() => setChemistryIconLoaded(true)}
                                      onError={() => setChemistryIconLoaded(true)}
                                    />
                                  </>
                                );
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
                            <table className="w-full max-w-2xl text-sm" style={{ tableLayout: 'fixed' }}>
                              <colgroup>
                                <col style={{ width: '35%' }} />
                                <col style={{ width: '30%' }} />
                                <col style={{ width: '35%' }} />
                              </colgroup>
                              <thead>
                                <tr className="border-b border-white/20">
                                  <th className="text-left py-2.5 px-3 font-semibold text-white">Property</th>
                                  <th className="text-left py-2.5 px-3 font-semibold text-white">Value</th>
                                  <th className="text-left py-2.5 px-3 font-semibold text-white">Methods</th>
                                </tr>
                              </thead>
                              <tbody>
                                {product.technicalData.testData.map((test, index) => (
                                  <tr key={index} className="border-b border-white/10">
                                    <td className="py-2.5 px-3 text-white/90 font-medium break-words">{test.property}</td>
                                    <td className="py-2.5 px-3 text-white/80 break-words">{test.value || '-'}</td>
                                    <td className="py-2.5 px-3 text-white/70 text-xs break-words">{test.method}</td>
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
                  )}
                </TabsContent>

                <TabsContent value="sizing" className="space-y-6">
                  {loading ? (
                    <Card className="bg-transparent border-0 rounded-2xl">
                      <CardHeader className="px-4 md:px-6 pt-2 pb-3 md:pt-2 md:pb-4">
                        <Skeleton className="h-8 w-36 bg-white/20" />
                      </CardHeader>
                      <CardContent className="space-y-6 px-4 md:px-6 py-3 md:py-4">
                        <div className="space-y-3">
                          <Skeleton className="h-4 w-full bg-white/20" />
                          <Skeleton className="h-4 w-full bg-white/20" />
                          <Skeleton className="h-4 w-3/4 bg-white/20" />
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}
                    layout
                  >
                  <motion.div layout transition={{ duration: 0.5 }}>
                  <Card className="bg-transparent border-0 rounded-2xl">
                    <CardHeader className="px-4 md:px-6 pt-2 pb-3 md:pt-2 md:pb-4">
                      <CardTitle className="text-white font-poppins font-regular" 
                                 style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight, fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 2.5rem)' }}>
                        Available Sizes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 px-4 md:px-6 py-3 md:py-4">
                      {/* Sizes (includes packaging data under same label) */}
                      {sizesAndPackaging.length > 0 ? (
                        <ul className="space-y-2 text-white/80">
                            {sizesAndPackaging.map((size, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                              <span>{toTitleCase(size)}</span>
                            </li>
                            ))}
                        </ul>
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
                  )}
                </TabsContent>
              </motion.div>
          </motion.section>
          </Tabs>
          </div>
        </section>

        {/* Related Products Section - White Background */}
          {relatedProducts.length > 0 && (
          <section className="bg-white py-12">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="mb-8">
                <h2 className="font-poppins font-regular text-gray-900 mb-2" 
                    style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight, fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 2.5rem)' }}>
                  Related Products
                </h2>
                <p className="text-gray-600">More {product.industry} solutions</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                {relatedProducts.map((relatedProduct, idx) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.3) }}
                    layout
                    className="group"
                  >
                    <Link to={`/products/${relatedProduct.category?.toLowerCase() || 'bond'}/${relatedProduct.id}`}>
                      <div 
                        className="relative overflow-hidden transition-all duration-500 hover:scale-[1.02] h-32 md:h-[340px] rounded-xl md:rounded-2xl bg-gradient-to-b from-[#477197] to-[#2c476e] border border-gray-200 hover:border-gray-300 shadow-lg"
                      >
                        {/* Desktop: Product Image */}
                        <div 
                          className="absolute inset-0 hidden md:block pb-24 cursor-pointer relative" 
                          style={{ transform: 'translateY(-3%) scale(0.85)' }}
                        >
                          {!relatedProductImagesLoaded[relatedProduct.id] && (
                            <ImageSkeleton />
                          )}
                          <img 
                            src={relatedProduct.imageUrl || relatedProduct.image} 
                            alt={relatedProduct.name}
                            className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-105 ${
                              relatedProductImagesLoaded[relatedProduct.id] ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => setRelatedProductImagesLoaded(prev => ({ ...prev, [relatedProduct.id]: true }))}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (target.src.includes('vercel-storage') || target.src.includes('blob')) {
                                const filename = relatedProduct.id.toLowerCase() + '.png';
                                target.src = `/product-images/${filename}`;
                              } else if (!target.src.includes('placeholder')) {
                                target.src = '/placeholder.svg';
                              }
                              setRelatedProductImagesLoaded(prev => ({ ...prev, [relatedProduct.id]: true }));
                            }}
                          />
                        </div>

                        {/* Mobile: Left side with image and basic info */}
                        <div className="flex md:hidden items-center gap-4 flex-1 p-4">
                          {/* Mobile: Product Image */}
                          <div className="w-[100px] h-[100px] rounded-xl overflow-hidden bg-transparent relative flex items-center justify-center">
                            {!relatedProductImagesLoaded[relatedProduct.id] && (
                              <ImageSkeleton className="rounded-xl" />
                            )}
                            <img 
                              src={relatedProduct.imageUrl || relatedProduct.image} 
                              alt={relatedProduct.name}
                              className={`max-w-full max-h-full object-contain transition-opacity duration-500 ${
                                relatedProductImagesLoaded[relatedProduct.id] ? 'opacity-100' : 'opacity-0'
                              }`}
                              onLoad={() => setRelatedProductImagesLoaded(prev => ({ ...prev, [relatedProduct.id]: true }))}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (target.src.includes('vercel-storage') || target.src.includes('blob')) {
                                  const filename = relatedProduct.id.toLowerCase() + '.png';
                                  target.src = `/product-images/${filename}`;
                                } else if (!target.src.includes('placeholder')) {
                                  target.src = '/placeholder.svg';
                                }
                                setRelatedProductImagesLoaded(prev => ({ ...prev, [relatedProduct.id]: true }));
                              }}
                            />
                          </div>
                          
                          {/* Mobile: Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-kallisto font-bold mb-1 leading-tight line-clamp-1 text-white">
                              {relatedProduct.name.split('–')[0].trim()}
                            </h3>
                            <p className="text-xs text-white line-clamp-2">
                              {relatedProduct.name.split('–')[1]?.trim() || relatedProduct.description || ''}
                            </p>
                          </div>
                        </div>

                        {/* Desktop: Content Section with title and description */}
                        <div className="hidden md:block p-2.5 absolute bottom-0 left-0 right-0">
                          <div className="space-y-0.5">
                            <h3 className="text-sm font-poppins font-bold leading-tight line-clamp-2 text-white">
                              {relatedProduct.name.split('–')[0].trim()}
                            </h3>
                            <p className="text-xs text-white line-clamp-2">
                              {relatedProduct.name.split('–')[1]?.trim() || relatedProduct.description || ''}
                            </p>
                            
                            {/* Button Row */}
                            <div className="flex gap-1.5 mt-2 pt-2">
                              {/* Details Button */}
                              <Link
                                to={`/products/${relatedProduct.category?.toLowerCase() || 'bond'}/${relatedProduct.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 inline-flex items-center justify-center bg-[#F2611D] hover:bg-[#d9551a] text-white rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300"
                              >
                                Details
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Mobile: Right side with buttons */}
                        <div className="flex md:hidden items-center gap-2 p-4">
                          {/* Mobile: Product Details Button */}
                          <Link
                            to={`/products/${relatedProduct.category?.toLowerCase() || 'bond'}/${relatedProduct.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 border border-white/30"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              </div>
            </section>
          )}

          {/* Call to Action */}
        <section className="bg-white py-12">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center">
            <Card className="bg-gradient-to-r from-[#477197] to-[#2c476e] border border-gray-200 rounded-2xl p-8">
              <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6 py-3 md:py-4">
                <h2 className="font-poppins font-regular text-white" 
                    style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight, fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 2.5rem)' }}>
                  Ready to Get Started
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto" 
                   style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                  Contact our technical team for expert guidance and support with your application.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/contact">
                    <Button 
                      className="bg-[#F2611D] hover:bg-[#E6540D] text-white font-poppins font-normal rounded-full px-8 py-6 text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
        </div>
          </div>
        </section>
      </main>
      <FooterV2 />
      
      {/* Gradient Toggle Modal */}
    </div>
  );
};

export default ProductDetailPage; 