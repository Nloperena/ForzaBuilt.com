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
import ImageSkeleton from '@/components/common/ImageSkeleton';
import ProductImageTicker from '@/components/ProductImageTicker';
import ProductsSectionRow from '@/components/ProductsSectionRow';
import { useGradientMode } from '@/contexts/GradientModeContext';

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
import Footer from '@/components/Footer';
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
      return '/images/product-heroes/Forza Seal Hero Shot Header.jpg';
    case 'tape':
      return '/images/product-heroes/Forza Tape Hero Shot Header.jpg';
    case 'ruggedred':
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
      // Skip loading products for ruggedred as it uses an iframe
      if (productCategory?.toLowerCase() === 'ruggedred') {
        setCategoryProducts([]);
        setProductsLoading(false);
        return;
      }
      
      setProductsLoading(true);
      try {
        const products = await byProductLine(productCategory as 'bond' | 'seal' | 'tape');
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
            {/* Product Image Ticker - Same as Homepage */}
            <section className="relative -mt-40 md:-mt-56 lg:-mt-64 xl:-mt-68">
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
            </section>

        {/* Special handling for RuggedRed - show iframe instead of product grid */}
        {productCategory?.toLowerCase() === 'ruggedred' ? (
          <section className="relative w-screen h-screen z-20 flex justify-center mt-6">
            <div className="w-full max-w-[1600px] h-full bg-white rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src="https://ruggedred.com/industrial/products#industrial-products"
                title="Rugged Red Industrial Products - Full Viewport Experience"
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
          </section>
        ) : (
          <section className="relative">
            <ProductsSectionRow />
          </section>
        )}

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
            </motion.div>
          </AnimatePresence>
      </main>
      <Footer />
      
      {/* Gradient Toggle Modal */}
    </div>
  );
};

export default ProductCategoryPage;