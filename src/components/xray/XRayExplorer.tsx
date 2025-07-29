import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { IndustryData, XRayComponent, Hotspot } from '../../types/industry';
import ProductTooltip from './ProductTooltip';
import SvgHotspotOverlay from './SvgHotspotOverlay';
import { CoordinateDebugger } from './CoordinateDebugger';
import { typography } from '../../styles/brandStandards';
import { useIsMobile } from '../../hooks/use-mobile';

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
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [debugCoordinates, setDebugCoordinates] = useState<Array<{ x: number; y: number; id: string }>>([]);
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
  const basePhases = 150; // vh for slide-in and wipe phases
  const hotspotPhaseHeight = Math.max(100, xrayComponent.hotspots.length * minDwellTimePerHotspot);
  const extendedHeight = basePhases + hotspotPhaseHeight;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Phase 1 (0-30%): Slide-in, scale-up of normal image
  const slideY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const slideScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const slideOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Phase 2 (30-60%): Wipe reveal to X-ray
  const normalOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  const xrayOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  // Dynamic phase 3 calculation based on hotspot count
  // Hotspot phase should take up 70% of scroll to ensure all hotspots are seen
  const hotspotStartProgress = 0.6;
  const hotspotEndProgress = 0.9; // Leave 10% buffer for smooth exit
  
  const hotspotProgress = useTransform(scrollYProgress, [hotspotStartProgress, hotspotEndProgress], [0, 1]);
  // Fade in overlay quickly (within 2% of scroll) so first hotspot isn't faded
  const hotspotsOpacity = useTransform(scrollYProgress, [hotspotStartProgress, hotspotStartProgress + 0.02], [0, 1]);
  
  // Sticky phase - keep image locked during entire hotspot cycling
  const stickyPhase = useTransform(scrollYProgress, [hotspotStartProgress, hotspotEndProgress], [1, 1]);

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
    // Calculate center point of polygon
    const centerX = hotspot.points.reduce((sum, point, i) => 
      i % 2 === 0 ? sum + point : sum, 0) / (hotspot.points.length / 2);
    const centerY = hotspot.points.reduce((sum, point, i) => 
      i % 2 === 1 ? sum + point : sum, 0) / (hotspot.points.length / 2);
    
    const percentX = (centerX / xrayComponent.width) * 100;
    const percentY = (centerY / xrayComponent.height) * 100;
    
    return { x: percentX, y: percentY };
  };

  return (
    <section 
      ref={containerRef}
      className="relative scroll-smooth-mobile"
      style={{ height: `${extendedHeight}vh` }}
      aria-labelledby={`${industry.id}-xray-explorer`}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 w-full dvh-100 flex items-end justify-center pb-20 overflow-hidden bg-background will-change-transform">
        <div className="relative w-full max-w-7xl mx-auto px-4">
          
          {/* Debug Mode Toggle */}
          <motion.div
            className="absolute top-4 right-4 z-50"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <label className="flex items-center gap-2 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-border shadow-lg">
              <input
                type="checkbox"
                checked={isDebugMode}
                onChange={(e) => setIsDebugMode(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-foreground">Debug Mode</span>
            </label>
          </motion.div>

          {/* Section Title - Moved to top */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              id={`${industry.id}-xray-explorer`}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ 
                fontFamily: typography.headings.fontFamily, 
                fontWeight: typography.headings.fontWeight,
                lineHeight: typography.headings.lineHeight
              }}
            >
              {industry.id.charAt(0).toUpperCase() + industry.id.slice(1)} X-Ray Explorer
              {industry.xrays.length > 1 && ` (${xrayIndex + 1}/${industry.xrays.length})`}
            </h2>
            <p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
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
          
          {/* Mobile Product Display Area - Above the X-Ray images */}
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
                  />
                </motion.div>
              )}
              
              {!activeHotspot && (
                <motion.div
                  className="text-center py-4 bg-muted/30 rounded-lg border border-border"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-muted-foreground text-sm">
                    Scroll to explore products and features
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
          
          {/* Debug Coordinate Finder */}
          {isDebugMode && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CoordinateDebugger
                imageSrc={xrayComponent.postSrc}
                width={xrayComponent.width}
                height={xrayComponent.height}
                onCoordinatesChange={setDebugCoordinates}
              />
            </motion.div>
          )}

          {/* Image Container */}
          <motion.div
            className="relative w-full mx-auto max-h-[70dvh] will-change-transform"
            style={{
              aspectRatio: `${xrayComponent.width}/${xrayComponent.height}`,
              y: slideY,
              scale: slideScale,
              opacity: slideOpacity
            }}
          >
            {/* Normal Image (Phase 1) */}
            <motion.img
              src={xrayComponent.preSrc}
              alt={`${xrayComponent.id} normal view`}
              className="absolute inset-0 w-full h-full object-contain will-change-opacity"
              style={{ opacity: normalOpacity }}
              loading="eager"
              width={xrayComponent.width}
              height={xrayComponent.height}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              decoding="async"
            />
            
            {/* X-ray Image (Phase 2) */}
            <motion.img
              src={xrayComponent.postSrc}
              alt={`${xrayComponent.id} X-ray view`}
              className="absolute inset-0 w-full h-full object-contain will-change-opacity"
              style={{ opacity: xrayOpacity }}
              loading="lazy"
              width={xrayComponent.width}
              height={xrayComponent.height}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              decoding="async"
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

                  {/* Product Tooltip - Positioned relative to active hotspot */}
                  {activeHotspot && (
                    <div 
                      className="absolute pointer-events-none z-20"
                      style={{
                        left: `${getTooltipPosition(activeHotspot).x}%`,
                        top: `${getTooltipPosition(activeHotspot).y}%`,
                        transform: 'translate(-50%, -100%) translateY(-20px)',
                      }}
                    >
                      <ProductTooltip 
                        hotspot={activeHotspot}
                        isPinned={false}
                      />
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Progress Indicator - Between Image and Title */}
          <motion.div 
            className="flex justify-center mt-6 mb-2"
            style={{ opacity: hotspotsOpacity }}
          >
            <div className="bg-background/95 backdrop-blur-sm rounded-lg px-6 py-3 border border-border shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span 
                    className="text-sm font-semibold text-foreground"
                    style={{ 
                      fontFamily: typography.subheads.fontFamily, 
                      fontWeight: typography.subheads.fontWeight,
                      lineHeight: typography.subheads.lineHeight
                    }}
                  >
                    Step {Math.max(1, activeHotspotIndex.get() + 1)} of {xrayComponent.hotspots.length}
                  </span>
                </div>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-sm"
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
                  className="text-xs text-muted-foreground"
                  style={{ 
                    fontFamily: typography.body.fontFamily, 
                    fontWeight: typography.body.fontWeight,
                    lineHeight: typography.body.lineHeight
                  }}
                >
                  Scroll to explore
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default XRayExplorer;
