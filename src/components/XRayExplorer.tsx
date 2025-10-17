import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { IndustryData, XRayComponent, Hotspot } from '../types/xray';
import ProductTooltip from './ProductTooltip';
import SvgHotspotOverlay from './SvgHotspotOverlay';

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
    
    // Add +1 to create a delay step after final hotspot
    const totalSteps = xrayComponent.hotspots.length + 1;
    const segmentSize = 1 / totalSteps;
    const currentSegment = Math.floor(value / segmentSize);
    
    // Clamp to valid hotspot range (last step is delay, so show last hotspot)
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
      className="relative"
      style={{ height: `${extendedHeight}vh` }}
      aria-labelledby={`${industry.id}-xray-explorer`}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 w-full h-screen flex items-end justify-center pb-20 overflow-hidden bg-background">
        <div className="relative w-full max-w-7xl mx-auto px-4">
          
          {/* Image Container */}
          <motion.div
            className="relative w-full mx-auto max-h-[70vh]"
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
              className="absolute inset-0 w-full h-full object-contain"
              style={{ opacity: normalOpacity }}
              loading="eager"
              width={xrayComponent.width}
              height={xrayComponent.height}
            />
            
            {/* X-ray Image (Phase 2) */}
            <motion.img
              src={xrayComponent.postSrc}
              alt={`${xrayComponent.id} X-ray view`}
              className="absolute inset-0 w-full h-full object-contain"
              style={{ opacity: xrayOpacity }}
              loading="lazy"
              width={xrayComponent.width}
              height={xrayComponent.height}
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
                          aria-label={hotspot.product ? `${hotspot.product.name} - ${hotspot.product.blurb}` : `${hotspot.experience?.title || 'hotspot'} - ${hotspot.experience?.description || ''}`}
                        />
                      );
                    })}
                  </svg>

                  {/* Hotspot Number Labels */}
                  {xrayComponent.hotspots.map((hotspot, index) => {
                    const isActive = index === activeHotspotIndex.get();
                    if (!isActive) return null;

                    // Calculate center point of polygon for label placement
                    const centerX = hotspot.points.reduce((sum, point, i) => 
                      i % 2 === 0 ? sum + point : sum, 0) / (hotspot.points.length / 2);
                    const centerY = hotspot.points.reduce((sum, point, i) => 
                      i % 2 === 1 ? sum + point : sum, 0) / (hotspot.points.length / 2);
                    
                    const percentX = (centerX / xrayComponent.width) * 100;
                    const percentY = (centerY / xrayComponent.height) * 100;

                    return (
                      <motion.div
                        key={`label-${hotspot.id}`}
                        className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                        style={{
                          left: `${percentX}%`,
                          top: `${percentY}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                      >
                        <div 
                          className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                          style={{
                            color: 'hsl(var(--primary-foreground))',
                            textShadow: '0 1px 2px rgba(0,0,0,0.4)'
                          }}
                        >
                          {index + 1}
                        </div>
                      </motion.div>
                    );
                  })}

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
                  <span className="text-sm font-semibold text-foreground">
                    Step {Math.min(xrayComponent.hotspots.length, Math.max(1, Math.ceil(activeHotspotIndex.get() + 1)))} of {xrayComponent.hotspots.length}
                  </span>
                </div>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-sm"
                    style={{
                      scaleX: useTransform(
                        hotspotProgress,
                        [0, xrayComponent.hotspots.length / (xrayComponent.hotspots.length + 1)],
                        [0, 1]
                      ),
                      transformOrigin: "left"
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  Scroll to explore
                </span>
              </div>
            </div>
          </motion.div>

          {/* Section Title */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              id={`${industry.id}-xray-explorer`}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Product Application View
              {industry.xrays.length > 1 && ` (${xrayIndex + 1}/${industry.xrays.length})`}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Scroll to explore our comprehensive range of solutions. 
              Watch as we reveal the internal structure and highlight key application areas.
            </p>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default XRayExplorer; 
