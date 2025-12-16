import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import { byProductLine, byCategory, getProduct } from '@/utils/products';
import { brandColors, productColors, industryColors, typography } from '@/styles/brandStandards';
import ImageSkeleton from '@/components/common/ImageSkeleton';
import ProductImageTicker from '@/components/ProductImageTicker';
import StickyProductHeroImageSection from '@/components/products/StickyProductHeroImageSection';
import ExperienceBetterBanner from '@/components/ExperienceBetterBanner';
import ProductCategoryProductsSection from '@/components/products/ProductCategoryProductsSection';

// Chemistry icon paths - using organized chemistry icons
const CHEMISTRY_ICONS = {
  'Acrylic (incl. PSA)': '/images/icons/chemistry/Acrylic icon.svg',
  'Epoxy': '/images/icons/chemistry/Epoxy Icon.svg',
  'Modified Epoxy': '/images/icons/chemistry/Modified Epoxy icon.svg',
  'Silicone': '/images/icons/chemistry/Silicone icon.svg',
  'MS': '/images/icons/chemistry/MS icon.svg',
  'Water Base': '/images/icons/chemistry/Water Based icon.svg',
  'Hotmelt': '/images/icons/chemistry/Hotmelt icon.svg',
  'Solvent Base': '/images/icons/chemistry/Solvent Based icon.svg',
  'Polyurethane (PU)': '/images/icons/chemistry/Polyurethane icon.svg',
  'Cyanoacrylates': '/images/icons/chemistry/Cyanoacrylates Icon.svg',
  'Methacrylate/MMA': '/images/icons/chemistry/Methacrylate icon.svg',
  'Rubber Based': '/images/icons/chemistry/rubber based icon.svg'
};
import HeaderV2 from '@/components/Header/HeaderV2';
import FooterV2 from '@/components/FooterV2';
import DynamicMetaTags from '@/components/DynamicMetaTags';

// Helper to convert text to title case
const toTitleCase = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
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

// Helper to get product category image from navbar data (desktop)
const getProductCategoryImage = (category: string) => {
  const categoryLower = category.toLowerCase();
  switch (categoryLower) {
    case 'bond':
      return '/images/product-heroes/Forza Bond Hero Shot Header.jpg';
    case 'seal':
      return '/images/product-heroes/Forza Seal Hero Shot.jpg';
    case 'tape':
      return '/images/product-heroes/Forza Tape Hero Shot Header.jpg';
    case 'ruggedred':
    case 'cleaners':
      return '/images/product-heroes/Forza Cleaners Hero Shot Header.jpg';
    default:
      return null;
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

// Helper to get product category logo
const getProductCategoryLogo = (category: string) => {
  const categoryLower = category.toLowerCase();
  switch (categoryLower) {
    case 'bond':
      return '/products/brand-logos/product-line-brands-white-bond.svg';
    case 'seal':
      return '/products/brand-logos/product-line-brands-white-seal.svg';
    case 'tape':
      return '/products/brand-logos/product-line-brands-white-tape.svg';
    default:
      return null;
  }
};

// Hero image sizing/position per category (desktop)
const getHeroImageClasses = (category: string) => {
  const cat = (category || '').toLowerCase();
  switch (cat) {
    case 'seal':
      // Show full hero image without cropping
      return '';
    case 'bond':
      return '';
    case 'tape':
      return '';
    case 'ruggedred':
      return '';
    default:
      return '';
  }
};

// Helper to get category gradient colors
const getCategoryGradient = (category: string) => {
  const categoryLower = category.toLowerCase();
  switch (categoryLower) {
    case 'bond':
      return 'from-[#1B3764] via-[#1B3764] to-[#F16022]';
    case 'seal':
      return 'from-[#1B3764] via-[#1B3764] to-[#faaf40]';
    case 'tape':
      return 'from-[#1B3764] via-[#1B3764] to-[#d1181f]';
    case 'ruggedred':
      return 'from-[#1B3764] via-[#1B3764] to-[#e53935]';
    default:
      return 'from-[#1B3764] via-[#1B3764] to-[#115B87]';
  }
};

// Industry benefits removed as requested

// Brand colors for categories using official brand standards
const categoryColor = (cat: string) => {
  switch (cat) {
    case 'BOND':
      return 'from-[#F16022] to-[#D35127]'; // blazeOrange to rustyNail
    case 'SEAL':
      return 'from-[#ffd600] to-[#f4c430]'; // yellow gradient
    case 'TAPE':
      return 'from-[#d1181f] to-[#b3141a]'; // More vibrant red gradient
    default:
      return 'from-[#BFBFBF] to-[#F16022]'; // slateGrey to ironGrey (blazeOrange)
  }
};

// Industry colors using vertical gradients with more industry color at top
const industryColor = (industry: string | string[]) => {
  // Handle both string and array inputs - use first industry if array
  const industryStr = Array.isArray(industry) ? industry[0] || '' : industry;
  const industryLower = industryStr.toLowerCase();
  
  // Use gradients with 30% blue and 70% industry color
  switch (industryLower) {
    case 'marine':
      return 'from-[#137875] via-[#1b3764] to-[#1b3764]'; // 70% Marine teal, 30% blue
    case 'industrial':
      return 'from-[#f16a26] via-[#1b3764] to-[#1b3764]'; // 70% Industrial orange, 30% blue
    case 'transportation':
      return 'from-[#b83d35] via-[#1b3764] to-[#1b3764]'; // 70% Transportation red, 30% blue
    case 'construction':
      return 'from-[#fec770] via-[#1b3764] to-[#1b3764]'; // 70% Construction yellow, 30% blue
    // case 'foam':
    //   return 'from-[#7a6fb0] via-[#1b3764] to-[#1b3764]'; // 70% Foam purple, 30% blue
    case 'composites':
      return 'from-[#9a9b9c] via-[#1b3764] to-[#1b3764]'; // 70% Composites gray, 30% blue
    case 'insulation':
      return 'from-[#d0157d] via-[#1b3764] to-[#1b3764]'; // 70% Insulation pink, 30% blue
    default:
      return 'from-[#1b3764] to-[#1b3764]'; // Default blue
  }
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
    case 'foam':
      return '#7a6fb0'; // Foam purple
    case 'composites':
      return '#9a9b9c'; // Composites gray
    case 'insulation':
      return '#d0157d'; // Insulation pink
    default:
      return '#1b3764'; // Default blue
  }
};

// Helper to get chemistry icon
const getChemistryIcon = (chemistry: string) => {
  if (!chemistry) return null;
  
  const chemistryLower = chemistry.toLowerCase();
  
  // Map chemistry names to icon paths
  if (chemistryLower.includes('acrylic') || chemistryLower.includes('psa')) {
    return CHEMISTRY_ICONS['Acrylic (incl. PSA)'];
  } else if (chemistryLower.includes('epoxy') && !chemistryLower.includes('modified')) {
    return CHEMISTRY_ICONS['Epoxy'];
  } else if (chemistryLower.includes('modified') && chemistryLower.includes('epoxy')) {
    return CHEMISTRY_ICONS['Modified Epoxy'];
  } else if (chemistryLower.includes('silicone')) {
    return CHEMISTRY_ICONS['Silicone'];
  } else if (chemistryLower.includes('ms') || chemistryLower.includes('hybrid') || chemistryLower.includes('polymer')) {
    return CHEMISTRY_ICONS['MS'];
  } else if (chemistryLower.includes('water') || chemistryLower.includes('waterbase')) {
    return CHEMISTRY_ICONS['Water Base'];
  } else if (chemistryLower.includes('hot') && chemistryLower.includes('melt')) {
    return CHEMISTRY_ICONS['Hotmelt'];
  } else if (chemistryLower.includes('solvent')) {
    return CHEMISTRY_ICONS['Solvent Base'];
  } else if (chemistryLower.includes('polyurethane') || chemistryLower.includes('urethane')) {
    return CHEMISTRY_ICONS['Polyurethane (PU)'];
  } else if (chemistryLower.includes('cyanoacrylate') || chemistryLower.includes('cyano')) {
    return CHEMISTRY_ICONS['Cyanoacrylates'];
  } else if (chemistryLower.includes('methacrylate')) {
    return CHEMISTRY_ICONS['Methacrylate/MMA'];
  } else if (chemistryLower.includes('rubber')) {
    return CHEMISTRY_ICONS['Rubber Based'];
  }
  
  return null;
};

const ProductCategoryPage: React.FC = () => {
  const { productCategory } = useParams<{ productCategory: string }>();
  const navigate = useNavigate();
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
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [imageLoadedStates, setImageLoadedStates] = useState<{ [key: string]: boolean }>({});
  const [imageFailedStates, setImageFailedStates] = useState<{ [key: string]: boolean }>({});
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [hideProductsWithoutImages, setHideProductsWithoutImages] = useState(true);
  const [triangleAnimation, setTriangleAnimation] = useState({
    leftRotation: 300,
    rightRotation: 260,
    leftImage: "/Gradients and Triangles/Small Science Triangles.png",
    rightImage: "/Gradients and Triangles/Small Science Triangles 2.png",
    opacity: 0.3,
    scale: 0.8
  });

  const handleImageLoad = (productId: string) => {
    setImageLoadedStates(prev => ({
      ...prev,
      [productId]: true
    }));
    // Clear any error state when image loads successfully
    setImageFailedStates(prev => ({
      ...prev,
      [productId]: false
    }));
  };

  const handleImageError = (productId: string) => {
    // Mark as loaded to hide skeleton
    handleImageLoad(productId);
    // Track that this image failed to load
    setImageFailedStates(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  const handleModalImageLoad = () => {
    setModalImageLoaded(true);
  };

  const handleModalImageError = () => {
    setModalImageLoaded(true);
  };

  // Animate triangles based on product category
  useEffect(() => {
    const category = productCategory?.toLowerCase();
    let newConfig = {
      leftRotation: 300,
      rightRotation: 260,
      leftImage: "/Gradients and Triangles/Small Science Triangles.png",
      rightImage: "/Gradients and Triangles/Small Science Triangles 2.png",
      opacity: 0.3,
      scale: 0.8
    };

    switch (category) {
      case 'bond':
        newConfig = {
          leftRotation: 320,
          rightRotation: 240,
          leftImage: "/Gradients and Triangles/Small Science Triangles 2.png",
          rightImage: "/Gradients and Triangles/Small Science Triangles.png",
          opacity: 0.4,
          scale: 0.9
        };
        break;
      case 'seal':
        newConfig = {
          leftRotation: 280,
          rightRotation: 280,
          leftImage: "/Gradients and Triangles/Small Science Triangles.png",
          rightImage: "/Gradients and Triangles/Small Science Triangles 2.png",
          opacity: 0.35,
          scale: 0.85
        };
        break;
      case 'tape':
        newConfig = {
          leftRotation: 340,
          rightRotation: 220,
          leftImage: "/Gradients and Triangles/Small Science Triangles 2.png",
          rightImage: "/Gradients and Triangles/Small Science Triangles.png",
          opacity: 0.3,
          scale: 0.75
        };
        break;
      case 'ruggedred':
        newConfig = {
          leftRotation: 280,
          rightRotation: 280,
          leftImage: "/Gradients and Triangles/Small Science Triangles 2.png",
          rightImage: "/Gradients and Triangles/Small Science Triangles.png",
          opacity: 0.6,
          scale: 1.1
        };
        break;
    }

    setTriangleAnimation(newConfig);
  }, [productCategory]);

  // Get products for this category
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setProductsLoading(true);
      try {
        let products: any[] = [];
        
        if (productCategory?.toLowerCase() === 'ruggedred' || productCategory?.toLowerCase() === 'cleaners') {
          // For ruggedred/cleaners, use byCategory to get products with category 'cleaners' or 'ruggedred'
          // Since there are currently no products categorized as cleaners, this will return an empty array
          products = await byCategory(productCategory.toLowerCase());
        } else {
          // For bond, seal, tape use byProductLine
          products = await byProductLine(productCategory as 'bond' | 'seal' | 'tape');
        }
        
        setCategoryProducts(products);
      } catch (error) {
        console.error('Failed to load products:', error);
        setCategoryProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    if (productCategory) {
      loadProducts();
    }
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
    if (productCategory === 'tape') {
      // For tapes, show Acrylic and Rubber chemistries
      // Note: Currently all tapes are Acrylic, but we show both filters for future use
      return ['Acrylic (incl. PSA)', 'Rubber Based'].sort();
    } else if (productCategory?.toLowerCase() === 'ruggedred' || productCategory?.toLowerCase() === 'cleaners') {
      // For cleaners/ruggedred, get unique chemistries from products (if any)
      const unique = new Set<string>(
        categoryProducts
          .filter(p => p.chemistry)
          .map(p => p.chemistry!)
      );
      return Array.from(unique).sort();
    } else {
      // For bond and seal, exclude Acrylic (incl. PSA)
      const unique = new Set<string>(
        categoryProducts
          .filter(p => p.chemistry) // Filter out products without chemistry
          .filter(p => p.chemistry !== 'Acrylic (incl. PSA)') // Always exclude acrylic for bond/seal
          .map(p => p.chemistry!)
      );
      return Array.from(unique).sort();
    }
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
        if (productCategory === 'tape') {
          // For tapes, count Acrylic and Rubber chemistries
          if (p.chemistry === 'Acrylic (incl. PSA)' || p.chemistry === 'Rubber Based') {
            byChemistry[p.chemistry] = (byChemistry[p.chemistry] || 0) + 1;
          }
        } else {
          // For bond and seal, exclude Acrylic (incl. PSA)
          if (p.chemistry !== 'Acrylic (incl. PSA)') {
            byChemistry[p.chemistry] = (byChemistry[p.chemistry] || 0) + 1;
          }
        }
      }
    });
    
    return { byIndustry, byChemistry };
  }, [categoryProducts, selectedIndustries, selectedChemistries, search]);

  // Reset visible product count when filters change
  useEffect(() => {
    setVisibleProductCount(12);
  }, [selectedIndustries, selectedChemistries, search, nameSort, hideProductsWithoutImages]);

  // Handle page transition animation when productCategory changes
  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300); // Match the animation duration
    return () => clearTimeout(timer);
  }, [productCategory]);

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
      
      // Chemistry filter
      let matchChemistry = true;
      if (selectedChemistries.length > 0) {
        if (productCategory === 'tape') {
          // For tapes, only match if chemistry is Acrylic or Rubber
          matchChemistry = product.chemistry === 'Acrylic (incl. PSA)' || product.chemistry === 'Rubber Based';
        } else if (productCategory?.toLowerCase() === 'ruggedred' || productCategory?.toLowerCase() === 'cleaners') {
          // For cleaners/ruggedred, match selected chemistries (no special exclusions)
          matchChemistry = product.chemistry && selectedChemistries.includes(product.chemistry);
        } else {
          // For bond and seal, match selected chemistries but exclude Acrylic
          matchChemistry = product.chemistry && 
            selectedChemistries.includes(product.chemistry) && 
            product.chemistry !== 'Acrylic (incl. PSA)';
        }
      }
      
      // Image filter - hide products with failed images if enabled
      const imageDidNotFail = !imageFailedStates[product.id];
      const matchImage = !hideProductsWithoutImages || imageDidNotFail;
      
      // Product must match all active filters
      return matchIndustry && matchSearch && matchChemistry && matchImage;
    });

    // Apply sorting (only by name, ascending or descending)
    filtered.sort((a, b) => {
      return nameSort === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    });

    return filtered;
  }, [categoryProducts, selectedIndustries, selectedChemistries, search, nameSort, hideProductsWithoutImages, imageFailedStates]);

  // Modal handlers
  const openProductModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setModalImageLoaded(false); // Reset modal image loading state
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (!productCategory) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DynamicMetaTags
        title={`${productCategory.charAt(0).toUpperCase() + productCategory.slice(1).toLowerCase()} Products`}
        description={`Discover our premium ${productCategory.toLowerCase()} solutions engineered for performance and reliability across all industries.`}
        url={`/products/${productCategory}`}
        type="website"
      />
      <HeaderV2 />
      
      
      <main className="flex-1 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={productCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {/* Sticky Hero Image Section - image stays while content slides over */}
            <StickyProductHeroImageSection
              imageUrl={getProductCategoryImage(productCategory || '') || ''}
              mobileImageUrl={getMobileHeroImage(productCategory || '')}
              productCategory={productCategory || ''}
            >
                {/* All content that should slide over the hero image */}
                
                {/* Product Image Ticker - Same as Homepage */}
                {/* <section className="relative -mt-40 md:-mt-56 lg:-mt-64 xl:-mt-68 z-[25]">
                  <ProductImageTicker
                items={[
                  // Pattern: BOND, SEAL, BOND, SEAL, TAPE
                  // Cycle 1
                  { src: "/product-images/ic932.png", alt: "IC932" }, // BOND
                  { src: "/product-images/c-os9.png", alt: "OS9" }, // SEAL
                  { src: "/product-images/tac-735r.png", alt: "TAC-735R" }, // BOND
                  { src: "/product-images/os2.png", alt: "OS2" }, // SEAL
                  { src: "/product-images/t215.png", alt: "T215" }, // TAPE
                  // Cycle 2
                  { src: "/product-images/tac-738r.png", alt: "TAC-738R" }, // BOND
                  { src: "/product-images/os20.png", alt: "OS20" }, // SEAL
                  { src: "/product-images/tac-739r.png", alt: "TAC-739R" }, // BOND
                  { src: "/product-images/os31.png", alt: "OS31" }, // SEAL
                  { src: "/product-images/t220.png", alt: "T220" }, // TAPE
                  // Cycle 3
                  { src: "/product-images/mc722.png", alt: "MC722" }, // BOND
                  { src: "/product-images/os35.png", alt: "OS35" }, // SEAL
                  { src: "/product-images/mc723.png", alt: "MC723" }, // BOND
                  { src: "/product-images/os37.png", alt: "OS37" }, // SEAL
                  { src: "/product-images/t305.png", alt: "T305" }, // TAPE
                  // Cycle 4  
                  { src: "/product-images/mc724.png", alt: "MC724" }, // BOND
                  { src: "/product-images/os45.png", alt: "OS45" }, // SEAL
                  { src: "/product-images/mc737.png", alt: "MC737" }, // BOND
                  { src: "/product-images/os55.png", alt: "OS55" }, // SEAL
                  { src: "/product-images/t350.png", alt: "T350" }, // TAPE
                  // Cycle 5
                  { src: "/product-images/mc739.png", alt: "MC739" }, // BOND
                  { src: "/product-images/os24.png", alt: "OS24" }, // SEAL
                  { src: "/product-images/mc741.png", alt: "MC741" }, // BOND
                  { src: "/product-images/c-os9.png", alt: "OS9-2" }, // SEAL (repeat)
                  { src: "/product-images/t500.png", alt: "T500" }, // TAPE
                  // Cycle 6
                  { src: "/product-images/ic933.png", alt: "IC933" }, // BOND
                  { src: "/product-images/os2.png", alt: "OS2-2" }, // SEAL (repeat)
                  { src: "/product-images/ic946.png", alt: "IC946" }, // BOND
                  { src: "/product-images/os20.png", alt: "OS20-2" }, // SEAL (repeat)
                  { src: "/product-images/t600.png", alt: "T600" }, // TAPE
                  // Cycle 7
                  { src: "/product-images/c130.png", alt: "C130" }, // BOND
                  { src: "/product-images/os31.png", alt: "OS31-2" }, // SEAL (repeat)
                  { src: "/product-images/c150.png", alt: "C150" }, // BOND
                  { src: "/product-images/os35.png", alt: "OS35-2" }, // SEAL (repeat)
                  { src: "/product-images/t715.png", alt: "T715" }, // TAPE
                  // Cycle 8
                  { src: "/product-images/c331.png", alt: "C331" }, // BOND
                  { src: "/product-images/os37.png", alt: "OS37-2" }, // SEAL (repeat)
                  { src: "/product-images/r160.png", alt: "R160" }, // BOND
                  { src: "/product-images/os45.png", alt: "OS45-2" }, // SEAL (repeat)
                  { src: "/product-images/t900.png", alt: "T900" }, // TAPE
                  // Cycle 9
                  { src: "/product-images/r221.png", alt: "R221" }, // BOND
                  { src: "/product-images/os55.png", alt: "OS55-2" }, // SEAL (repeat)
                  { src: "/product-images/r519.png", alt: "R519" }, // BOND
                  { src: "/product-images/os24.png", alt: "OS24-2" }, // SEAL (repeat)
                  { src: "/product-images/t950.png", alt: "T950" }, // TAPE
                  // Cycle 10
                  { src: "/product-images/r529.png", alt: "R529" }, // BOND
                  { src: "/product-images/c-os9.png", alt: "OS9-3" }, // SEAL (repeat)
                  { src: "/product-images/fc-car.png", alt: "FC Car" }, // BOND
                  { src: "/product-images/os2.png", alt: "OS2-3" }, // SEAL (repeat)
                  { src: "/product-images/t970.png", alt: "T970" } // TAPE
                ]}
                speed={95}
                direction="left"
                    className="pt-0 pb-10 md:pt-0 md:pb-16"
                  />
                </section> */}

                {/* Products Section - Using ProductCategoryProductsSection component or RuggedRed iframe */}
                {productCategory?.toLowerCase() === 'ruggedred' ? (
                  <section className="relative w-full z-20 bg-gray-100 pt-4 md:pt-6">
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
                          style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 56px)' }}
                        >
                          Cleaning Products
                        </h2>
                      </motion.div>
                    </div>
                    <div className="relative w-full h-screen flex justify-center">
                      <div className="w-full max-w-[1600px] h-full bg-white rounded-3xl overflow-hidden shadow-2xl mx-4">
                        <iframe
                          src="https://ruggedred.com/industrial/products"
                          title="Rugged Red - Industrial Cleaning Solutions"
                          className="w-full h-full border-0 rounded-3xl"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#F2611D #1b3764'
                          }}
                        />
                      </div>
                    </div>
                  </section>
                ) : (
                  <ProductCategoryProductsSection 
                    productCategory={productCategory as 'bond' | 'seal' | 'tape'}
                  />
                )}
            </StickyProductHeroImageSection>
            </motion.div>
          </AnimatePresence>
      </main>
      
      {/* Performance Elevated Banner */}
      <ExperienceBetterBanner />
      
      <FooterV2 />
      
      {/* Gradient Toggle Modal */}
    </div>
  );
};

export default ProductCategoryPage;
