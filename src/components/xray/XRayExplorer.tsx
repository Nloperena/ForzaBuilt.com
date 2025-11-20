import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { IndustryData, XRayComponent, Hotspot } from '../../types/industry';
import ProductTooltip from './ProductTooltip';
import SvgHotspotOverlay from './SvgHotspotOverlay';
import { typography } from '../../styles/brandStandards';
import { useIsMobile } from '../../hooks/use-mobile';
import { X } from 'lucide-react';
import { Badge } from '../ui/badge';
import { byProductLine } from '../../utils/products';

interface XRayExplorerProps {
  industry: IndustryData;
  xrayIndex?: number; // Which X-Ray component to display (0 or 1)
  heightVh?: number;
}

const XRayExplorer: React.FC<XRayExplorerProps> = ({ 
  industry, 
  xrayIndex = 0,
  heightVh = 300 
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [showSkipPrompt, setShowSkipPrompt] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  const isMobile = useIsMobile();
  
  // Get the specific X-Ray component
  const xrayComponent = industry.xrays[xrayIndex];
  
  // If no X-Ray component exists at this index, don't render
  if (!xrayComponent) {
    return null;
  }
  
  // Dynamic height calculation based on hotspot count
  // Each hotspot needs enough scroll space to be properly highlighted
  const minDwellTimePerHotspot = 80; // vh units per hotspot
  const basePhases = 110; // reduced vh for pre-wipe phases to start sooner
  const hotspotPhaseHeight = Math.max(100, xrayComponent.hotspots.length * minDwellTimePerHotspot);
  const extendedHeight = basePhases + hotspotPhaseHeight;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Phase 1: No scale/slide. We'll rely solely on wipe for reveal.

  // Phase 2: Early wipe reveal to X-ray (no fade)
  const wipeStart = 0.12;
  const wipeEnd = 0.45;
  const wipeTop = useTransform(scrollYProgress, [wipeStart, wipeEnd], [100, 0]);
  const wipeClipPath = useMotionTemplate`inset(${wipeTop}% 0% 0% 0%)`;

  // Dynamic phase 3 calculation based on hotspot count
  // Hotspot phase should take up 70% of scroll to ensure all hotspots are seen
  const hotspotStartProgress = wipeEnd + 0.05; // start hotspots shortly after wipe completes
  const hotspotEndProgress = 0.9; // Leave 10% buffer for smooth exit
  
  const hotspotProgress = useTransform(scrollYProgress, [hotspotStartProgress, hotspotEndProgress], [0, 1]);
  // Fade in overlay quickly (within 2% of scroll) so first hotspot isn't faded
  const hotspotsOpacity = useTransform(scrollYProgress, [hotspotStartProgress, hotspotStartProgress + 0.02], [0, 1]);
  
  // Sticky phase - keep image locked during entire hotspot cycling
  const stickyPhase = useTransform(scrollYProgress, [hotspotStartProgress, hotspotEndProgress], [1, 1]);

  // Show a skip prompt shortly after section becomes visible
  React.useEffect(() => {
    const timer = setTimeout(() => setShowSkipPrompt(true), 1500);
    const unsubscribe = scrollYProgress.on("change", (v) => {
      // Hide prompt once user has meaningfully engaged
      if (v > 0.05) setShowSkipPrompt(false);
    });
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [scrollYProgress]);

  const handleSkipSection = () => {
    const el = containerRef.current as HTMLElement | null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const target = absoluteTop + el.offsetHeight + 1;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  // Modal handlers
  const openProductModal = (hotspotProduct: any) => {
    // Try to get the full product data from our product database
    const fullProduct = getFullProductBySku(hotspotProduct.sku);
    
    console.log('openProductModal debug:', {
      hotspotProduct,
      fullProduct,
      hotspotSku: hotspotProduct.sku
    });
    
    if (fullProduct) {
      // Merge hotspot data with full product data
      const mergedProduct = {
        ...fullProduct,
        // Use hotspot data for display, fallback to full product data
        name: hotspotProduct.name || fullProduct.name,
        blurb: hotspotProduct.blurb || fullProduct.description,
        thumb: hotspotProduct.thumb || fullProduct.imageUrl,
        url: hotspotProduct.url || `/products/${fullProduct.category.toLowerCase()}/${fullProduct.id}`,
        // Ensure SKU is available from full product data
        sku: (fullProduct as any).sku || fullProduct.id
      };
      
      console.log('Merged product:', mergedProduct);
      setSelectedProduct(mergedProduct);
    } else {
      // Fallback to hotspot data if no full product found
      console.log('No full product found, using hotspot data');
      setSelectedProduct(hotspotProduct);
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };



  // Calculate active hotspot index with smooth transitions
  const activeHotspotIndex = useTransform(hotspotProgress, (value) => {
    if (xrayComponent.hotspots.length === 0) return -1;
    
    // Create smooth segments based on actual hotspot count
    const segmentSize = 1 / xrayComponent.hotspots.length;
    const currentSegment = Math.floor(value / segmentSize);
    
    // Clamp to valid hotspot range
    return Math.min(Math.max(currentSegment, 0), xrayComponent.hotspots.length - 1);
  });

  // Update active hotspot when scroll changes
  React.useEffect(() => {
    const unsubscribe = activeHotspotIndex.on("change", (index) => {
      if (index >= 0 && index < xrayComponent.hotspots.length) {
        setActiveHotspot(xrayComponent.hotspots[index]);
      } else {
        setActiveHotspot(null);
      }
    });
    return unsubscribe;
  }, [activeHotspotIndex, xrayComponent.hotspots]);

  // Calculate tooltip position based on active hotspot
  const getTooltipPosition = (hotspot: Hotspot) => {
    // Calculate center X point of polygon for horizontal centering
    const centerX = hotspot.points.reduce((sum, point, i) => 
      i % 2 === 0 ? sum + point : sum, 0) / (hotspot.points.length / 2);
    
    // Find the bottom-most Y point of the polygon
    const yPoints = hotspot.points.filter((_, i) => i % 2 === 1);
    const bottomY = Math.max(...yPoints);
    
    const percentX = (centerX / xrayComponent.width) * 100;
    const percentY = (bottomY / xrayComponent.height) * 100;
    
    return { x: percentX, y: percentY };
  };

  // Get all products for matching
  const allProducts = useMemo(() => {
    const bondProducts = byProductLine('bond');
    const sealProducts = byProductLine('seal');
    const tapeProducts = byProductLine('tape');
    return [...bondProducts, ...sealProducts, ...tapeProducts];
  }, []);

  // Function to get full product data by SKU (from hotspot) or ID
  const getFullProductBySku = (sku: string) => {
    // First try to match by SKU (if products have it), then by ID
    return allProducts.find(product => 
      (product as any).sku === sku || product.id.toLowerCase() === sku.toLowerCase()
    ) || null;
  };

  // Helper functions for modal
  const getIndustryColor = (industry: string | string[]) => {
    const industryStr = Array.isArray(industry) ? industry[0] || '' : industry;
    const industryLower = industryStr.toLowerCase();
    
    switch (industryLower) {
      case 'marine':
        return 'from-[#137875] via-[#1b3764] to-[#1b3764]';
      case 'industrial':
        return 'from-[#f16a26] via-[#1b3764] to-[#1b3764]';
      case 'transportation':
        return 'from-[#b83d35] via-[#1b3764] to-[#1b3764]';
      case 'construction':
        return 'from-[#fec770] via-[#1b3764] to-[#1b3764]';
      case 'composites':
        return 'from-[#c7c8c9] via-[#1b3764] to-[#1b3764]';
      case 'insulation':
        return 'from-[#d0157d] via-[#1b3764] to-[#1b3764]';
      default:
        return 'from-[#1b3764] to-[#1b3764]';
    }
  };

  const getIndustryLogo = (industry: string | string[]) => {
    const industryStr = Array.isArray(industry) ? industry[0] || '' : industry;
    const industryLower = industryStr.toLowerCase();
    
    switch (industryLower) {
      case 'marine':
        return '/logos/Marine-Icon.png';
      case 'construction':
        return '/logos/Construction-Icon.png';
      case 'transportation':
        return '/logos/Transportation-Icon.png';
      case 'industrial':
        return '/logos/Industrial-Icon.png';
      case 'composites':
        return '/logos/Composite-Icon.png';
      case 'insulation':
        return '/logos/Insulation-Icon.png';
      case 'foam':
        return '/logos/Foam-Icon.png';
      default:
        return null;
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative scroll-smooth-mobile"
      style={{ height: `${extendedHeight}vh` }}
      aria-labelledby={`${industry.id}-xray-explorer`}
    >
      {/* Sticky Container */}
      <div className="sticky top-20 w-full dvh-100 flex items-end justify-center pb-20 overflow-hidden bg-white will-change-transform">
        <div className="relative w-full max-w-7xl mx-auto px-4">
          
          {/* Section Title - Moved to top */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              id={`${industry.id}-xray-explorer`}
              className="font-normal font-poppins text-[#1B3764] mb-4 leading-tight"
              style={{ 
                fontSize: 'clamp(28px, 2.5vw + 0.5rem, 56px)'
              }}
            >
              Product Application View
              {industry.xrays.length > 1 && ` (${xrayIndex + 1}/${industry.xrays.length})`}
            </h2>
            <p 
              className="text-xs md:text-lg text-[#1B3764] max-w-2xl mx-auto"
              style={{ 
                fontFamily: typography.body.fontFamily, 
                fontWeight: typography.body.fontWeight,
                lineHeight: typography.body.lineHeight
              }}
            >
              Scroll to explore our comprehensive range of solutions. 
              Watch as we reveal the internal structure and highlight key application areas.
            </p>
          </motion.div>

          {/* Image Container */}
          <motion.div
            className="relative w-full mx-auto max-h-[70dvh] will-change-transform"
            style={{
              aspectRatio: `${xrayComponent.width}/${xrayComponent.height}`,
              y: 0,
              scale: 1,
              opacity: 1
            }}
          >
            {/* Pre-Xray (normal) image - static; wipe reveals X-ray */}
            <motion.img
              src={xrayComponent.preSrc}
              alt={`${xrayComponent.id} normal view`}
              className="absolute inset-0 w-full h-full object-contain will-change-transform"
              loading="lazy"
              width={xrayComponent.width}
              height={xrayComponent.height}
              style={{}}
            />

            {/* X-ray Image wipes in from bottom to top without opacity fade */}
            <motion.img
              src={xrayComponent.postSrc}
              alt={`${xrayComponent.id} X-ray view`}
              className="absolute inset-0 w-full h-full object-contain will-change-opacity"
              loading="lazy"
              width={xrayComponent.width}
              height={xrayComponent.height}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              decoding="async"
              style={{ opacity: 1, clipPath: wipeClipPath, WebkitClipPath: wipeClipPath }}
            />

            {/* Conditional Hotspot Overlay (Phase 3) */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: hotspotsOpacity }}
            >
              {xrayComponent.svgOverlay ? (
                <SvgHotspotOverlay 
                  xray={xrayComponent} 
                  progress={scrollYProgress}
                />
              ) : (
                <>
                  <svg
                    viewBox={`0 0 ${xrayComponent.width} ${xrayComponent.height}`}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    role="img"
                    aria-label={`Interactive ${xrayComponent.id} hotspot map`}
                  >
                    {xrayComponent.hotspots.map((hotspot, index) => {
                      const isActive = index === activeHotspotIndex.get();
                      const isSinglePoint = hotspot.points.length === 2;
                      
                      if (isSinglePoint) {
                        // Render circle for single point hotspots
                        const [cx, cy] = hotspot.points;
                        return (
                          <motion.circle
                            key={hotspot.id}
                            cx={cx}
                            cy={cy}
                            r="15"
                            className={`
                              transition-all duration-500 cursor-pointer
                              ${isActive ? 'hotspot-active pointer-events-auto' : 'hotspot-default pointer-events-none'}
                            `}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: isActive ? 1 : 0.3,
                              scale: isActive ? 1 : 0.9,
                            }}
                            whileHover={isActive ? { 
                              scale: 1.05,
                              filter: "brightness(1.2)"
                            } : {}}
                            onClick={() => isActive && setActiveHotspot(hotspot)}
                            tabIndex={isActive ? 0 : -1}
                            role="button"
                            aria-label={`${hotspot.product?.name || hotspot.experience?.title || 'Hotspot'} - ${hotspot.product?.blurb || hotspot.experience?.description || ''}`}
                          />
                        );
                      } else {
                        // Render polygon for multi-point hotspots
                        return (
                          <motion.polygon
                            key={hotspot.id}
                            points={hotspot.points.join(',')}
                            className={`
                              transition-all duration-500 cursor-pointer
                              ${isActive ? 'hotspot-active pointer-events-auto' : 'hotspot-default pointer-events-none'}
                            `}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: isActive ? 1 : 0.3,
                              scale: isActive ? 1 : 0.9,
                            }}
                            whileHover={isActive ? { 
                              scale: 1.05,
                              filter: "brightness(1.2)"
                            } : {}}
                            onClick={() => isActive && setActiveHotspot(hotspot)}
                            tabIndex={isActive ? 0 : -1}
                            role="button"
                            aria-label={`${hotspot.product?.name || hotspot.experience?.title || 'Hotspot'} - ${hotspot.product?.blurb || hotspot.experience?.description || ''}`}
                          />
                        );
                      }
                    })}
                  </svg>

                  {/* Desktop Product Tooltip - Positioned on opposite side of hotspot, 20px below */}
                  {!isMobile && activeHotspot && (() => {
                    const position = getTooltipPosition(activeHotspot);
                    const isLeftSide = position.x < 50; // Hotspot is on left side if centerX < 50%
                    const bottomY = position.y;
                    
                    return (
                      <div 
                        className="absolute pointer-events-none z-20"
                        style={{
                          left: isLeftSide ? 'auto' : '2%',
                          right: isLeftSide ? '2%' : 'auto',
                          top: `${bottomY}%`,
                          transform: 'translateY(0)',
                          marginTop: '20px',
                          width: 'auto',
                          maxWidth: '400px',
                        }}
                      >
                        <ProductTooltip 
                          hotspot={activeHotspot}
                          isPinned={false}
                          disablePositioning={true}
                        />
                      </div>
                    );
                  })()}
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Progress Indicator - After image, before products */}
          <motion.div 
            className="flex justify-center mb-0 md:mb-1 relative"
            style={{ opacity: hotspotsOpacity }}
          >
            <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl rounded-lg px-6 py-3 border border-white/30 shadow-2xl">
              {/* Glass shine overlay */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-white/5 pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/50 via-white/30 to-white/50 opacity-80 pointer-events-none" />
              <div className="flex items-center gap-4">
                <div className="w-48 h-3 bg-white/40 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#1B3764] to-[#1B3764]/80 rounded-full shadow-sm"
                    style={{
                      scaleX: useTransform(
                        hotspotProgress,
                        [0, 1],
                        [0, 1]
                      ),
                      transformOrigin: "left"
                    }}
                  />
                </div>
                <span 
                  className="text-xs text-[#1B3764]"
                  style={{ 
                    fontFamily: typography.body.fontFamily, 
                    fontWeight: typography.body.fontWeight,
                    lineHeight: typography.body.lineHeight
                  }}
                >
                  Scroll to explore
                </span>
                <button
                  onClick={handleSkipSection}
                  className="text-xs bg-[#F16022] hover:bg-[#F16022]/85 text-white rounded-full px-3 py-1 transition-colors"
                >
                  Skip
                </button>
              </div>
            </div>
          </motion.div>

          {/* Mobile Product Display Area - Now below the X-Ray image */}
          {isMobile && (
            <motion.div 
              className="w-full mb-6"
              style={{ opacity: hotspotsOpacity }}
            >
              {activeHotspot && (
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductTooltip 
                    hotspot={activeHotspot}
                    isPinned={false}
                    isMobileFixed={true}
                    onProductClick={openProductModal}
                    industry={industry.id}
                  />
                </motion.div>
              )}
              
              {!activeHotspot && (
                <motion.div
                  className="text-center py-4 bg-white/70 rounded-lg border border-border"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-[#1B3764] text-sm">
                    Scroll to explore products and features
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Product Modal */}
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
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                duration: 0.6
              }}
              className={`relative rounded-2xl md:rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden bg-gradient-to-r md:bg-gradient-to-b ${getIndustryColor(selectedProduct.industry)}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative p-4 md:p-6 border-b border-white/20">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border border-white/30 text-xs">
                        {selectedProduct.category || 'Product'}
                      </Badge>
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border border-white/30 flex items-center gap-1 text-xs">
                        {getIndustryLogo(selectedProduct.industry) ? (
                          <img 
                            src={getIndustryLogo(selectedProduct.industry)} 
                            alt={`${selectedProduct.industry} icon`}
                            className="h-3 md:h-4 w-3 md:w-4 object-contain"
                          />
                        ) : (
                          <span className="capitalize">{Array.isArray(selectedProduct.industry) ? selectedProduct.industry[0]?.charAt(0) : selectedProduct.industry?.charAt(0)}</span>
                        )}
                        <span className="capitalize">
                          {Array.isArray(selectedProduct.industry) ? selectedProduct.industry[0] : selectedProduct.industry}
                        </span>
                      </Badge>
                    </div>
                    <h2 className="text-lg md:text-2xl font-bold text-white line-clamp-2">
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

              {/* Modal Content */}
              <div className="p-4 md:p-6 max-h-[70vh] md:max-h-[60vh] overflow-y-auto bg-white/10 backdrop-blur-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                  {/* Product Image */}
                  <div className="flex items-center justify-center">
                    <img 
                      src={selectedProduct.thumb || selectedProduct.imageUrl || selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-full h-[300px] md:h-[500px] object-contain rounded-xl md:rounded-2xl shadow-lg"
                    />
                  </div>
                  
                  {/* Product Description */}
                  <div className="flex flex-col justify-start">
                    <p className="text-white/90 text-sm md:text-base mb-6">
                      {selectedProduct.blurb || selectedProduct.description}
                    </p>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Product Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/80">SKU:</span>
                          <span className="text-white font-mono">{selectedProduct.sku}</span>
                        </div>
                        {selectedProduct.chemistry && (
                          <div className="flex justify-between">
                            <span className="text-white/80">Chemistry:</span>
                            <span className="text-white">{selectedProduct.chemistry}</span>
                          </div>
                        )}
                        {selectedProduct.industry && (
                          <div className="flex justify-between">
                            <span className="text-white/80">Industry:</span>
                            <span className="text-white capitalize">
                              {Array.isArray(selectedProduct.industry) ? selectedProduct.industry.join(', ') : selectedProduct.industry}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Benefits Section */}
                    {(selectedProduct.benefits || selectedProduct.howToUse || selectedProduct.colors || selectedProduct.sizing || selectedProduct.cleanup) && (
                      <div className="space-y-4 md:space-y-6">
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Benefits & Usage</h3>
                        
                        {/* Benefits */}
                        {selectedProduct.benefits && selectedProduct.benefits.length > 0 && (
                          <div>
                            <h4 className="text-base font-semibold text-white mb-3">Key Benefits</h4>
                            <div className="grid grid-cols-1 gap-3">
                              {selectedProduct.benefits.map((benefit: string, index: number) => (
                                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-white/90 text-sm">{benefit}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* How to Use */}
                        {selectedProduct.howToUse && selectedProduct.howToUse.length > 0 && (
                          <div>
                            <h4 className="text-base font-semibold text-white mb-3">How to Use</h4>
                            <div className="space-y-2">
                              {selectedProduct.howToUse.map((instruction: string, index: number) => (
                                <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-xs">{index + 1}</span>
                                  </div>
                                  <span className="text-white/90 text-sm">{instruction}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Colors */}
                        {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                          <div>
                            <h4 className="text-base font-semibold text-white mb-3">Available Colors</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedProduct.colors.map((color: string, index: number) => (
                                <span key={index} className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-3 py-1 rounded-full text-xs">
                                  {color}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Sizing */}
                        {selectedProduct.sizing && selectedProduct.sizing.length > 0 && (
                          <div>
                            <h4 className="text-base font-semibold text-white mb-3">Available Sizes</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {selectedProduct.sizing.map((size: string, index: number) => (
                                <span key={index} className="bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-300/30 px-3 py-1 rounded-full text-xs">
                                  {size}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Cleanup */}
                        {selectedProduct.cleanup && selectedProduct.cleanup.length > 0 && (
                          <div>
                            <h4 className="text-base font-semibold text-white mb-3">Recommended Cleanup</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedProduct.cleanup.map((method: string, index: number) => (
                                <span key={index} className="bg-orange-500/20 backdrop-blur-sm text-orange-300 border border-orange-300/30 px-3 py-1 rounded-full text-xs">
                                  {method}
                                </span>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                      <a 
                        href={selectedProduct.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#F16022] hover:bg-[#F16022]/85 text-white text-center py-3 px-6 rounded-xl font-semibold transition-colors"
                      >
                        View Full Product Details
                      </a>
                      <button
                        onClick={closeModal}
                        className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default XRayExplorer;
