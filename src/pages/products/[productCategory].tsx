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

// Helper to get product category image from navbar data
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
      return 'from-[#c7c8c9] via-[#1b3764] to-[#1b3764]'; // 70% Composites gray, 30% blue
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
      return '#c7c8c9'; // Composites gray
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

                {/* Product Grid Layout - Same for all categories including RuggedRed/Cleaners */}
                <div className="w-full bg-white relative z-30 pb-10">
                  <div className="max-w-screen-2xl mx-auto px-4 md:px-6 pt-6">
                  {/* Amazon-style Layout with Sidebar Filter and Product Grid */}
                  <div className="flex flex-col lg:flex-row gap-6 mt-6">
                    {/* Sidebar Filters - Hidden on Mobile, Visible on Desktop */}
                    <aside className="lg:w-64 xl:w-72 flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
                      {/* Search Bar */}
                      <div className="bg-gradient-to-r from-[#477197] to-[#2c476e] rounded-xl shadow-lg border border-gray-300 p-3 mb-4">
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 p-1.5 rounded-full">
                            <Search className="text-white h-4 w-4" />
                          </div>
                          <input
                            placeholder="Search products…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-white/10 text-white placeholder-white/60 pl-12 py-3 text-sm border border-white/30 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 rounded-xl"
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

                      {/* Filter Panel - Desktop Sidebar */}
                      <div className="hidden lg:block bg-gradient-to-r from-[#477197] to-[#2c476e] shadow-lg rounded-xl border border-gray-300 overflow-hidden">
                        <div className="p-4 border-b border-white/20">
                          <h3 className="font-poppins font-regular text-lg text-white" 
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
                              className={`w-full flex items-center justify-between p-2 rounded-lg transition-all overflow-hidden backdrop-blur-xl border border-white/20 ${
                                isSelected 
                                  ? 'bg-[#F2611D] text-white shadow-lg' 
                                  : 'bg-[#3f5275]/40 text-white/90 hover:bg-[#3f5275]/60 hover:shadow-md'
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
                            const count = dynamicCounts.byChemistry[chemistry] || 0;
                            
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
                                className={`w-full flex items-center justify-between p-2 rounded-lg transition-all overflow-hidden backdrop-blur-xl border border-white/20 ${
                                  isSelected 
                                    ? 'bg-[#F2611D] text-white shadow-lg' 
                                    : 'bg-[#3f5275]/40 text-white/90 hover:bg-[#3f5275]/60 hover:shadow-md'
                                } ${count === 0 && !isSelected ? 'opacity-50' : ''}`}
                              >
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                                    <FlaskConical className="w-4 h-4 text-white" />
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
                    
                    {/* Display Options */}
                    <div className="space-y-3 border-t border-white/10 pt-5">
                      <h4 className="text-sm font-semibold text-white/90">Display Options</h4>
                      
                      <label className="flex items-center justify-between p-3 rounded-lg bg-[#3f5275]/40 border border-white/20 cursor-pointer hover:bg-[#3f5275]/60 transition-all group">
                        <div className="flex items-center gap-2">
                          {hideProductsWithoutImages ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
                              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                              <line x1="2" x2="22" y1="2" y2="22"/>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                          )}
                          <span className="text-xs xl:text-sm font-medium text-white/90">
                            {hideProductsWithoutImages ? 'Hiding' : 'Showing'} products without images
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={hideProductsWithoutImages}
                          onChange={(e) => setHideProductsWithoutImages(e.target.checked)}
                          className="w-4 h-4 rounded border-white/30 bg-white/10 text-[#F2611D] focus:ring-[#F2611D] focus:ring-offset-0 cursor-pointer"
                        />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                      {/* Mobile Filter Button */}
                      <div className="lg:hidden sticky bottom-4 w-full flex justify-center z-30">
                        <button 
                          className="bg-[#F2611D] hover:bg-[#E55B1C] rounded-full px-6 py-3 shadow-xl transition-colors flex items-center justify-center gap-2 backdrop-blur-xl border border-white/20"
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
                  <div className="bg-gray-100 px-4 py-2 rounded-full border border-gray-300 shadow-sm">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">
                        {isLoading ? (
                          <span className="inline-flex items-center">
                            <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                        <span className="hidden sm:inline"> • <span className="font-semibold text-gray-900">{selectedIndustries.length}</span> {selectedIndustries.length === 1 ? 'industry' : 'industries'}</span>
                      )}
                      {productCategory !== 'tape' && selectedChemistries.length > 0 && (
                        <span className="hidden sm:inline"> • <span className="font-semibold text-gray-900">{selectedChemistries.length}</span> {selectedChemistries.length === 1 ? 'chemistry' : 'chemistries'}</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Product Grid - Responsive with Progressive Loading */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {productsLoading ? (
                    // Loading skeleton
                    Array.from({ length: 6 }).map((_, idx) => (
                      <div key={`loading-${idx}`} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
                    ))
                  ) : (
                    filteredProducts.slice(0, Math.min(filteredProducts.length, visibleProductCount)).map((product, idx) => (
                    <motion.div
                      key={`${product.id}-${idx}-${selectedIndustries.join(',')}-${search}`}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.3) }}
                      layout
                      className="group"
                    >
                      <div 
                        className="relative overflow-hidden transition-all duration-500 hover:scale-[1.02] h-32 md:h-[500px] rounded-2xl md:rounded-3xl bg-gradient-to-b from-[#477197] to-[#2c476e] border border-gray-200 hover:border-gray-300 shadow-lg cursor-pointer"
                        onClick={() => {
                          navigate(`/products/${productCategory}/${product.id}`);
                        }}
                      >
                        {/* Desktop: Badge above image */}
                        <div className="absolute top-3 left-3 z-30 hidden md:block">
                          <div 
                            className="px-3 py-1 rounded-full text-lg font-bold uppercase tracking-wide flex items-center gap-1.5 bg-transparent text-white"
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
                        <div className="absolute inset-0 hidden md:block" style={{ transform: 'translateY(-7.5%) scale(0.74)' }}>
                          {/* Image Skeleton Loading State */}
                          {!imageLoadedStates[product.id] && (
                            <ImageSkeleton />
                          )}
                          
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-105 ${
                              imageLoadedStates[product.id] ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => handleImageLoad(product.id)}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              // Try fallback to product-images folder only once
                              if (target.src.includes('vercel-storage') || target.src.includes('blob')) {
                                const filename = product.id.toLowerCase() + '.png';
                                target.src = `/product-images/${filename}`;
                              } else if (!target.src.includes('placeholder') && !target.src.includes('product-images')) {
                                // Final fallback failed - mark as error
                                handleImageError(product.id);
                                target.src = '/placeholder.svg';
                              } else if (target.src.includes('product-images')) {
                                // Local image also failed - mark as error
                                handleImageError(product.id);
                                target.src = '/placeholder.svg';
                              }
                            }}
                          />
                        </div>

                        {/* Desktop: Content Section with title and description */}
                        <div className="hidden md:block p-4 absolute bottom-0 left-0 right-0">
                          <div className="space-y-1">
                            <h3 className="text-2xl font-poppins font-bold leading-tight line-clamp-2 text-white">
                              {product.name.split('–')[0].trim()}
                            </h3>
                            <p className="text-sm text-white line-clamp-2 min-h-[2.5rem]">
                              {toTitleCase(product.name.split('–')[1]?.trim() || product.description)}
                            </p>
                            
                            {/* Button Row */}
                            <div className="flex gap-2">
                              
                              {/* Product Details Button */}
                              <Link
                                to={`/products/${productCategory}/${product.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#F2611D] hover:bg-[#d9551a] text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                              >
                                <span>Product Details</span>
                                <ExternalLink className="h-3 w-3" />
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Mobile: Centered content with image and basic info */}
                        <div className="flex md:hidden items-center justify-center gap-4 flex-1 p-4">
                          {/* Mobile: Product Image */}
                          <div className="w-[100px] h-[100px] rounded-xl overflow-hidden bg-transparent relative flex items-center justify-center">
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
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                // Try fallback to product-images folder only once
                                if (target.src.includes('vercel-storage') || target.src.includes('blob')) {
                                  const filename = product.id.toLowerCase() + '.png';
                                  target.src = `/product-images/${filename}`;
                                } else if (!target.src.includes('placeholder') && !target.src.includes('product-images')) {
                                  // Final fallback failed - mark as error
                                  handleImageError(product.id);
                                  target.src = '/placeholder.svg';
                                } else if (target.src.includes('product-images')) {
                                  // Local image also failed - mark as error
                                  handleImageError(product.id);
                                  target.src = '/placeholder.svg';
                                }
                              }}
                            />
                          </div>
                          
                          {/* Mobile: Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-kallisto font-bold mb-1 leading-tight line-clamp-1 text-white">
                              {product.name.split('–')[0].trim()}
                            </h3>
                            <p className="text-xs text-white line-clamp-2">
                              {toTitleCase(product.name.split('–')[1]?.trim() || product.description)}
                            </p>
                            {/* Mobile: Industry Badge */}
                            <div 
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-bold uppercase tracking-wide mt-2 bg-gray-100 text-gray-800"
                            >
                              {getIndustryLogo(product.industry?.[0] || '') ? (
                                <img 
                                  src={getIndustryLogo(product.industry?.[0] || '')} 
                                  alt={`${product.industry?.[0] || ''} icon`}
                                  className="h-5 w-5 object-contain"
                                />
                              ) : (
                                <span className="capitalize">{product.industry?.[0]?.charAt(0) || ''}</span>
                              )}
                              <span className="text-xs">{product.industry?.[0] || ''}</span>
                            </div>
                          </div>
                        </div>

                        {/* Mobile: Centered buttons - positioned at bottom */}
                        <div className="flex md:hidden items-center justify-center gap-2 p-2 pb-4">
                          
                          {/* Mobile: Product Details Button */}
                          <Link
                            to={`/products/${productCategory}/${product.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 border border-white/30"
                          >
                            <span>Details</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                    ))
                  )}
                </div>

                {!productsLoading && filteredProducts.length === 0 && (
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
                        className="relative rounded-2xl md:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden bg-gradient-to-b from-[#1B3764] to-[#115B87]"
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
                                <Badge className={`sr-only`}>
                                  {selectedProduct.category === 'BOND' ? 'ForzaBond' : 
                                   selectedProduct.category === 'SEAL' ? 'ForzaSeal' : 
                                   selectedProduct.category === 'TAPE' ? 'ForzaTape' : 
                                   selectedProduct.category}
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

                        {/* Modal Content - Simplified Quick View */}
                        <div className="p-4 md:p-6 bg-white/10 backdrop-blur-sm">
                          <div className="flex flex-col items-center text-center space-y-6">
                            {/* Product Image */}
                            <div className="relative w-full max-w-md h-[300px] md:h-[400px]">
                              {/* Modal Image Skeleton Loading State */}
                              {!modalImageLoaded && (
                                <ImageSkeleton className="w-full h-full rounded-xl md:rounded-2xl" />
                              )}
                              
                              <img 
                                src={selectedProduct.imageUrl || selectedProduct.image} 
                                alt={selectedProduct.name}
                                className={`w-full h-full object-contain rounded-xl md:rounded-2xl shadow-lg bg-white/10 transition-opacity duration-500 ${
                                  modalImageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                                onLoad={handleModalImageLoad}
                                onError={handleModalImageError}
                              />
                            </div>
                            
                            {/* Product Description */}
                            <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl" 
                               style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                              {selectedProduct.description}
                            </p>
                          </div>
                        </div>

                        {/* Modal Footer - Simplified */}
                        <div className="p-4 md:p-6 border-t border-white/20 bg-white/10 backdrop-blur-sm">
                          <div className="flex justify-center">
                            <Link
                              to={`/products/${selectedProduct.category.toLowerCase()}/${selectedProduct.id}`}
                              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full px-8 md:px-12 py-3 md:py-4 transition-all duration-300 text-base md:text-lg font-medium border border-white/30"
                            >
                              View Product
                            </Link>
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
              </div>

              {/* Mobile Filter Dialog */}
              {isFilterDialogOpen && (
                <div 
              className="fixed inset-0 bg-black/60 z-50 flex items-end lg:hidden"
              onClick={() => setIsFilterDialogOpen(false)}
            >
              <div 
                className="bg-gradient-to-b from-[#115B87] to-[#1B3764] w-full rounded-t-xl max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-gradient-to-r from-[#1B3764] to-[#115B87] pt-3 pb-2 px-4 flex justify-between items-center border-b border-white/10">
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
                  {chemistryTypes.length > 0 && (
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
                                  <FlaskConical className="w-3 h-3 text-white" />
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
                  
                  {/* Display Options - Mobile */}
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-bold text-sm uppercase mb-3">Display Options</h4>
                    
                    <label className="flex items-center justify-between p-3 rounded-lg bg-white/10 border border-white/20 cursor-pointer hover:bg-white/20 transition-all">
                      <div className="flex items-center gap-2">
                        {hideProductsWithoutImages ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                            <line x1="2" x2="22" y1="2" y2="22"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        )}
                        <span className="text-sm font-medium text-white">
                          {hideProductsWithoutImages ? 'Hiding' : 'Showing'} products without images
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={hideProductsWithoutImages}
                        onChange={(e) => setHideProductsWithoutImages(e.target.checked)}
                        className="w-5 h-5 rounded border-white/30 bg-white/10 text-[#F2611D] focus:ring-[#F2611D] focus:ring-offset-0 cursor-pointer"
                      />
                    </label>
                  </div>
                  
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