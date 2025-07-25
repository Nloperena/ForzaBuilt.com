import React, { useState, useEffect } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { XRayComponent, Hotspot } from '../../types/industry';
import HotspotTooltip from './ProductTooltip';
import { useIsMobile, useIsTablet, useReducedMotion } from '../../hooks/use-mobile';
import { useThrottledScroll } from '../../hooks/use-scroll-performance';
import { useHapticFeedback } from '../../hooks/use-haptic-feedback';

interface SvgHotspotOverlayProps {
  xray: XRayComponent;
  progress: MotionValue<number>;
}

const SvgHotspotOverlay: React.FC<SvgHotspotOverlayProps> = ({ xray, progress }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [pinnedHotspot, setPinnedHotspot] = useState<Hotspot | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number>(-1);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  
  // Device and accessibility detection
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const reducedMotion = useReducedMotion();
  const triggerHaptic = useHapticFeedback();

  // Calculate active hotspot index based on scroll progress with fluid transitions
  const activeIndex = useTransform(progress, (value) => {
    const totalHotspots = xray.hotspots.length;
    if (totalHotspots === 0) return -1;
    
    // Start showing hotspots after 60% scroll progress (kept in sync with XRayExplorer)
    const startProgress = 0.6;
    const endProgress = 0.9; // End before 100% to give buffer
    
    if (value < startProgress) return -1;
    if (value > endProgress) return totalHotspots - 1; // Show last hotspot in buffer zone
    
    const adjustedProgress = (value - startProgress) / (endProgress - startProgress);
    
    // Create smooth segments with buffer zones
    const segmentSize = 1 / totalHotspots;
    const bufferSize = segmentSize * 0.3; // 30% of each segment is buffer
    const activeSize = segmentSize * 0.7; // 70% of each segment is active
    
    // Calculate which segment we're in
    const currentSegment = Math.floor(adjustedProgress / segmentSize);
    const segmentProgress = (adjustedProgress % segmentSize) / segmentSize;
    
    // If we're in the buffer zone (first 30% of segment), show previous hotspot
    // If we're in active zone (last 70% of segment), show current hotspot
    if (segmentProgress < 0.3 && currentSegment > 0) {
      return currentSegment - 1;
    } else {
      return Math.min(currentSegment, totalHotspots - 1);
    }
  });

  // Transform for showing all SVG paths (different from active selection)
  const allPathsVisible = useTransform(progress, (value) => {
    return value >= 0.6; // Show all paths once we hit the hotspot phase
  });

  // Sync active hotspot index into React state so we can use it for tooltip display
  useEffect(() => {
    const unsubscribe = activeIndex.on("change", (idx) => {
      setActiveHotspotIndex(idx);
    });
    return unsubscribe;
  }, [activeIndex]);

  // Load SVG content
  useEffect(() => {
    if (!xray.svgOverlay) return;
    
    fetch(xray.svgOverlay)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(setSvgContent)
      .catch(error => {
        console.error('Error loading SVG:', error);
        console.error('SVG path:', xray.svgOverlay);
      });
  }, [xray.svgOverlay]);

  // Reset pinned hotspot when scroll changes significantly
  useEffect(() => {
    const unsubscribe = progress.on('change', (value) => {
      if (value < 0.6 && pinnedHotspot) {
        setPinnedHotspot(null);
      }
    });
    
    return unsubscribe;
  }, [progress, pinnedHotspot]);

  const handleHotspotClick = (hotspot: Hotspot) => {
    // Trigger haptic feedback on mobile devices
    if (isMobile || isTablet) {
      triggerHaptic('medium');
    }
    
    setPinnedHotspot(pinnedHotspot?.id === hotspot.id ? null : hotspot);
  };

  const handleHotspotHover = (hotspot: Hotspot | null) => {
    // Only handle hover on non-touch devices
    if (!isMobile && !isTablet) {
      setHoveredHotspot(hotspot);
    }
  };

  // Touch event handlers for better mobile interaction
  const handleTouchStart = (event: React.TouchEvent, hotspot: Hotspot) => {
    const touch = event.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (event: React.TouchEvent, hotspot: Hotspot) => {
    if (!touchStart) return;
    
    const touch = event.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - touchStart.x);
    const deltaY = Math.abs(touch.clientY - touchStart.y);
    
    // Only trigger click if touch didn't move much (not a scroll)
    if (deltaX < 10 && deltaY < 10) {
      handleHotspotClick(hotspot);
    }
    
    setTouchStart(null);
  };

  // Keyboard navigation handler
  const handleKeyDown = (event: React.KeyboardEvent, hotspot: Hotspot) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleHotspotClick(hotspot);
    }
  };

  if (!svgContent || !xray.svgOverlay) {
    // Fallback to regular polygon overlay
    return null;
  }

  // Parse SVG and enhance with interactivity
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
  const svgElement = svgDoc.documentElement;

  // Check if SVG parsed correctly
  if (svgElement.tagName !== 'svg') {
    console.error('SVG parsing failed. Got:', svgElement.tagName);
    console.error('SVG content preview:', svgContent.substring(0, 200));
    return null;
  }

  // Get viewBox for scaling
  const viewBox = svgElement.getAttribute('viewBox') || '0 0 233.403 191.162';
  const [, , viewBoxWidth, viewBoxHeight] = viewBox.split(' ').map(Number);

  // Debug: Log what we found
  console.log('SVG Content loaded:', !!svgContent);
  console.log('SVG Element:', svgElement);
  console.log('ViewBox:', viewBox);
  console.log('Hotspots to find:', xray.hotspots.map(h => h.id));
  
  // Debug: Check what elements exist in SVG
  const allElements = svgElement.querySelectorAll('*');
  console.log('All SVG elements:', Array.from(allElements).map(el => ({ tagName: el.tagName, id: el.id })));

  return (
    <div className="absolute inset-0 pointer-events-auto">
      <svg
        className="w-full h-full"
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          border: '2px solid rgba(255,255,255,0.8)',
          borderRadius: '4px'
        }}
      >

        {xray.hotspots.map((hotspot, index) => {
          const currentActiveIndex = activeIndex.get();
          const allVisible = allPathsVisible.get();
          const isCurrentlyActive = currentActiveIndex === index;
          const isHovered = hoveredHotspot?.id === hotspot.id;
          const isPinned = pinnedHotspot?.id === hotspot.id;
          const isHighlight = isHovered || isPinned || isCurrentlyActive;
          
          // Find corresponding SVG element by ID
          const svgPolygon = svgElement.querySelector(`#${hotspot.id}`);
          if (!svgPolygon) return null;

          const points = svgPolygon.getAttribute('points') || svgPolygon.getAttribute('d') || '';
          
          return (
            <motion.g key={hotspot.id}>
              {svgPolygon.tagName === 'polygon' ? (
                <motion.polygon
                  points={points}
                  fill="rgba(245,108,35,0.79)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  className="cursor-pointer"
                  style={{
                    filter: isHighlight ? 
                      'drop-shadow(0 0 8px rgba(8,96,143,0.8)) drop-shadow(0 0 12px rgba(8,96,143,0.6)) brightness(1.3)' : 
                      'none',
                    outline: 'none',
                    minWidth: isMobile || isTablet ? '44px' : 'auto',
                    minHeight: isMobile || isTablet ? '44px' : 'auto',
                    touchAction: 'manipulation'
                  }}
                  initial={{ opacity: 0, transform: 'scale(0.8)' }}
                  animate={{
                    opacity: allVisible ? (isHighlight ? 1.0 : (isMobile ? 0.6 : 0.4)) : 0,
                    transform: allVisible ? (isHighlight ? 'scale(1.1)' : 'scale(1)') : 'scale(0.8)',
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : (isHighlight ? 0.2 : 0.5),
                    ease: "easeOut"
                  }}
                  onClick={() => handleHotspotClick(hotspot)}
                  onMouseEnter={() => handleHotspotHover(hotspot)}
                  onMouseLeave={() => handleHotspotHover(null)}
                  onTouchStart={(e) => handleTouchStart(e, hotspot)}
                  onTouchEnd={(e) => handleTouchEnd(e, hotspot)}
                  onKeyDown={(e) => handleKeyDown(e, hotspot)}
                  tabIndex={allVisible ? 0 : -1}
                  role="button"
                  aria-label={`${hotspot.product?.name || hotspot.experience?.title || 'hotspot'} hotspot`}
                />
              ) : (
                <motion.path
                  d={points}
                  fill="rgba(245,108,35,0.79)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  className="cursor-pointer"
                  style={{
                    filter: isHighlight ? 
                      'drop-shadow(0 0 8px rgba(8,96,143,0.8)) drop-shadow(0 0 12px rgba(8,96,143,0.6)) brightness(1.3)' : 
                      'none',
                    outline: 'none',
                    minWidth: isMobile || isTablet ? '44px' : 'auto',
                    minHeight: isMobile || isTablet ? '44px' : 'auto',
                    touchAction: 'manipulation'
                  }}
                  initial={{ opacity: 0, transform: 'scale(0.8)' }}
                  animate={{
                    opacity: allVisible ? (isHighlight ? 1.0 : (isMobile ? 0.6 : 0.4)) : 0,
                    transform: allVisible ? (isHighlight ? 'scale(1.1)' : 'scale(1)') : 'scale(0.8)',
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : (isHighlight ? 0.2 : 0.5),
                    ease: "easeOut"
                  }}
                  onClick={() => handleHotspotClick(hotspot)}
                  onMouseEnter={() => handleHotspotHover(hotspot)}
                  onMouseLeave={() => handleHotspotHover(null)}
                  onTouchStart={(e) => handleTouchStart(e, hotspot)}
                  onTouchEnd={(e) => handleTouchEnd(e, hotspot)}
                  onKeyDown={(e) => handleKeyDown(e, hotspot)}
                  tabIndex={allVisible ? 0 : -1}
                  role="button"
                  aria-label={`${hotspot.product?.name || hotspot.experience?.title || 'hotspot'} hotspot`}
                />
              )}
              
              {/* Removed hotspot number label and circle elements */}
            </motion.g>
          );
        })}
      </svg>

      {/* Product Tooltip */}
      {(() => {
        // Determine which hotspot should drive the tooltip
        const tooltipHotspot = pinnedHotspot || hoveredHotspot || (activeHotspotIndex >= 0 ? xray.hotspots[activeHotspotIndex] : null);
        return tooltipHotspot ? (
          <HotspotTooltip
            hotspot={tooltipHotspot}
            isPinned={!!pinnedHotspot}
            onClose={() => {
              setPinnedHotspot(null);
              setHoveredHotspot(null);
            }}
          />
        ) : null;
      })()}
    </div>
  );
};

export default SvgHotspotOverlay;