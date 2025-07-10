import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, easeInOut } from 'framer-motion';
import { IndustryData, XRayComponent, Hotspot } from '../types/xray';
import ProductTooltip from './ProductTooltip';

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
  const minDwellTimePerHotspot = 120; // vh units per hotspot (increased for smoother scroll)
  const basePhases = 100; // Reduced from 150 to 100 vh for slide-in and wipe phases
  const hotspotPhaseHeight = Math.max(100, xrayComponent.hotspots.length * minDwellTimePerHotspot);
  const extendedHeight = (basePhases + hotspotPhaseHeight) * 1.5;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Phase 1 (0-10%): Dramatic scale-up from 0.25 to 1 with easeInOut, 3x faster
  const slideY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);
  const slideScale = useTransform(scrollYProgress, [0, 0.1], [0.25, 1], {
    ease: easeInOut
  });

  // Phase 2 (10-20%): Wipe reveal to X-ray, 3x faster
  const normalOpacity = useTransform(scrollYProgress, [0.1, 0.2], [1, 0]);
  const xrayOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  // Dynamic phase 3 calculation based on hotspot count
  // Hotspot phase should start immediately after fade completes
  const hotspotStartProgress = 0.2;
  const hotspotEndProgress = 0.97; // Extended to 97% for a longer, smoother phase
  
  const hotspotProgress = useTransform(scrollYProgress, [hotspotStartProgress, hotspotEndProgress], [0, 1]);
  const hotspotsOpacity = useTransform(scrollYProgress, [hotspotStartProgress, hotspotStartProgress + 0.08], [0, 1]);

  // Sticky phase - keep image locked during entire hotspot cycling
  const stickyPhase = useTransform(scrollYProgress, [hotspotStartProgress, hotspotEndProgress], [1, 1]);

  // Calculate active hotspot index with smooth transitions
  const activeHotspotIndex = useTransform(hotspotProgress, (value) => {
    if (xrayComponent.hotspots.length === 0) return -1;
    // Each hotspot gets half the scroll time (twice as fast)
    const totalSteps = xrayComponent.hotspots.length * 2;
    const segmentSize = 1 / totalSteps;
    const currentSegment = Math.floor(value / segmentSize);
    // Clamp to valid hotspot range
    return Math.min(Math.max(currentSegment, 0), xrayComponent.hotspots.length - 1);
  });

  // Update active hotspot when scroll changes
  React.useEffect(() => {
    const unsubscribe = activeHotspotIndex.onChange((index) => {
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
    
    // Bias towards lower positions - if hotspot is in upper half, move tooltip down
    let adjustedY = percentY;
    if (percentY < 50) {
      // If hotspot is in upper half, position tooltip below it
      adjustedY = percentY + 15; // Move down by 15%
    }
    
    return { x: percentX, y: adjustedY };
  };

  return (
    <section 
      ref={containerRef}
      className="relative"
      style={{ height: `${extendedHeight}vh` }}
      aria-labelledby={`${industry.id}-xray-explorer`}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center pb-32 overflow-hidden bg-white">
        <div className="relative w-full max-w-8xl mx-auto px-4"> {/* Increased max-width from 7xl to 8xl */}
          
          {/* Section Title - Moved above image */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              id={`${industry.id}-xray-explorer`}
              className="text-4xl md:text-5xl font-bold text-black mb-6" // Increased from text-3xl md:text-4xl and mb-4 to text-4xl md:text-5xl and mb-6
            >
              {industry.id.charAt(0).toUpperCase() + industry.id.slice(1)} X-Ray Explorer
              {industry.xrays.length > 1 && ` (${xrayIndex + 1}/${industry.xrays.length})`}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> {/* Increased from text-lg and max-w-2xl to text-xl and max-w-3xl */}
              Scroll to explore our comprehensive range of solutions. 
              Watch as we reveal the internal structure and highlight key application areas.
            </p>
          </motion.div>
          
          {/* Image Container */}
          <motion.div
            className="relative w-full mx-auto max-h-[60vh]" // Reduced from 75vh to 60vh to make room for title
            style={{
              aspectRatio: `${xrayComponent.width}/${xrayComponent.height}`,
              y: slideY,
              scale: slideScale,
              opacity: 1,
              marginBottom: '-5rem'
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

            {/* SVG Hotspot Overlay (Phase 3) */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: hotspotsOpacity }}
            >
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
                        ${isActive ? `hotspot-active ${industry.id} pointer-events-auto` : 'hotspot-default pointer-events-none'}
                      `}
                      initial={{ scale: 0.8 }}
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
                      aria-label={`${hotspot.product.name} - ${hotspot.product.blurb}`}
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
                    className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10" // Increased from w-8 h-8 to w-10 h-10
                    style={{
                      left: `${percentX}%`,
                      top: `${percentY}%`,
                    }}
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: -20 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 25,
                      delay: 0.1 
                    }}
                  >
                    <motion.div 
                      className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-base font-bold shadow-lg" // Increased from w-8 h-8 and text-sm to w-10 h-10 and text-base
                      initial={{ scale: 0.8, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 20,
                        delay: 0.2 
                      }}
                    >
                      {index + 1}
                    </motion.div>
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
                    transform: 'translate(-50%, -100%) translateY(-10px)',
                  }}
                >
                  <ProductTooltip 
                    product={activeHotspot.product}
                    isPinned={false}
                  />
                </div>
              )}

            </motion.div>
          </motion.div>

          {/* Progress Indicator - Between Image and Title */}
          <motion.div 
            className="flex justify-center mt-6 mb-6" // Increased margin from mt-4 mb-4 to mt-6 mb-6
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hotspotsOpacity.get(), y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div 
              className="bg-white/95 backdrop-blur-sm rounded-lg px-8 py-4 border border-gray-200 shadow-lg" // Increased padding from px-6 py-3 to px-8 py-4
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <div className="flex items-center gap-6"> {/* Increased gap from gap-4 to gap-6 */}
                <div className="flex items-center gap-3"> {/* Increased gap from gap-2 to gap-3 */}
                  <motion.div 
                    className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" // Increased from w-2 h-2 to w-3 h-3
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                  />
                  <motion.span 
                    className="text-base font-semibold text-black" // Increased from text-sm to text-base
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                  >
                    Step {Math.min(xrayComponent.hotspots.length, Math.max(1, Math.ceil(activeHotspotIndex.get() + 1)))} of {xrayComponent.hotspots.length}
                  </motion.span>
                </div>
                <div className="w-40 h-3 bg-gray-200 rounded-full overflow-hidden"> {/* Increased from w-32 h-2 to w-40 h-3 */}
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-sm"
                    style={{
                      scaleX: useTransform(
                        hotspotProgress,
                        [0, xrayComponent.hotspots.length / (xrayComponent.hotspots.length + 2)],
                        [0, 1]
                      ),
                      transformOrigin: "left"
                    }}
                  />
                </div>
                <motion.span 
                  className="text-sm text-gray-600" // Increased from text-xs to text-sm
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                >
                  Scroll to explore
                </motion.span>
              </div>
            </motion.div>
          </motion.div>


        </div>
      </div>

    </section>
  );
};

export default XRayExplorer; 