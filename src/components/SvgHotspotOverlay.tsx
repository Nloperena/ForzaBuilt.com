import React, { useState, useEffect } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { XRayComponent, Hotspot } from '../types/xray';
import HotspotTooltip from './ProductTooltip';

interface SvgHotspotOverlayProps {
  xray: XRayComponent;
  progress: MotionValue<number>;
}

const SvgHotspotOverlay: React.FC<SvgHotspotOverlayProps> = ({ xray, progress }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [pinnedHotspot, setPinnedHotspot] = useState<Hotspot | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number>(-1);

  // Calculate active hotspot index based on scroll progress
  const activeIndex = useTransform(progress, (value) => {
    const totalHotspots = xray.hotspots.length;
    if (totalHotspots === 0) return -1;
    
    // Start showing hotspots after 60% scroll progress (kept in sync with XRayExplorer)
    const startProgress = 0.6;
    if (value < startProgress) return -1;
    
    const adjustedProgress = (value - startProgress) / (1 - startProgress);
    // Show all hotspots progressively - return how many should be visible
    return Math.floor(adjustedProgress * totalHotspots);
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
    setPinnedHotspot(pinnedHotspot?.id === hotspot.id ? null : hotspot);
  };

  const handleHotspotHover = (hotspot: Hotspot | null) => {
    setHoveredHotspot(hotspot);
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
          const isActive = currentActiveIndex >= index;
          const isCurrentlyActive = currentActiveIndex === index;
          const isHovered = hoveredHotspot?.id === hotspot.id;
          const isPinned = pinnedHotspot?.id === hotspot.id;
          const isHighlight = isHovered || isPinned || isCurrentlyActive;  // treat active as hovered for visuals
          
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
                    outline: 'none'
                  }}
                  initial={{ opacity: 0, transform: 'scale(0.8)' }}
                  animate={{
                    opacity: isActive ? (isHighlight ? 1.0 : 0.65) : 0,
                    transform: isActive ? (isHighlight ? 'scale(1.1)' : 'scale(1)') : 'scale(0.8)',
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  onClick={() => handleHotspotClick(hotspot)}
                  onMouseEnter={() => handleHotspotHover(hotspot)}
                  onMouseLeave={() => handleHotspotHover(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleHotspotClick(hotspot);
                    }
                  }}
                  tabIndex={isActive ? 0 : -1}
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
                    outline: 'none'
                  }}
                  initial={{ opacity: 0, transform: 'scale(0.8)' }}
                  animate={{
                    opacity: isActive ? (isHighlight ? 1.0 : 0.65) : 0,
                    transform: isActive ? (isHighlight ? 'scale(1.1)' : 'scale(1)') : 'scale(0.8)',
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  onClick={() => handleHotspotClick(hotspot)}
                  onMouseEnter={() => handleHotspotHover(hotspot)}
                  onMouseLeave={() => handleHotspotHover(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleHotspotClick(hotspot);
                    }
                  }}
                  tabIndex={isActive ? 0 : -1}
                  role="button"
                  aria-label={`${hotspot.product?.name || hotspot.experience?.title || 'hotspot'} hotspot`}
                />
              )}
              
              {/* Hotspot number label - only show for currently active hotspot */}
              {isCurrentlyActive && (
                <motion.circle
                  cx={hotspot.points[0]}
                  cy={hotspot.points[1]}
                  r="8"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--primary-foreground))"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                />
              )}
              {isCurrentlyActive && (
                <motion.text
                  x={hotspot.points[0]}
                  y={hotspot.points[1]}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-xs font-bold fill-primary-foreground pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {index + 1}
                </motion.text>
              )}
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