import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndustryData, XRayComponent, Hotspot } from '../../types/industry';
import ProductTooltip from './ProductTooltip';
import ProductTooltipCard from './ProductTooltipCard';
import { typography } from '../../styles/brandStandards';
import { useIsMobile } from '../../hooks/use-mobile';
import { Badge } from '../ui/badge';
import { byProductLine } from '../../utils/products';

interface StaticXRayExplorerProps {
  industry: IndustryData;
  xrayIndex?: number; // Which X-Ray component to display (0 or 1)
}

const StaticXRayExplorer: React.FC<StaticXRayExplorerProps> = ({ 
  industry, 
  xrayIndex = 0
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  
  const isMobile = useIsMobile();
  
  // Get the specific X-Ray component
  const xrayComponent = industry.xrays[xrayIndex];
  
  // If no X-Ray component exists at this index, don't render
  if (!xrayComponent) {
    return null;
  }

  // Load SVG content
  useEffect(() => {
    if (!xrayComponent.svgOverlay) return;
    
    fetch(xrayComponent.svgOverlay)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(setSvgContent)
      .catch(error => {
        console.error('Error loading SVG:', error);
        console.error('SVG path:', xrayComponent.svgOverlay);
      });
  }, [xrayComponent.svgOverlay]);

  const handleHotspotHover = (hotspot: Hotspot | null, event?: React.MouseEvent) => {
    // Disable hover behavior - using click/select instead
  };

  const handleHotspotClick = (hotspot: Hotspot) => {
    // Toggle selection - if clicking the same hotspot, deselect it
    if (selectedHotspot?.id === hotspot.id) {
      setSelectedHotspot(null);
    } else {
      setSelectedHotspot(hotspot);
    }
  };

  const handleCloseCard = () => {
    setSelectedHotspot(null);
  };


  // Helper to get industry logo from navbar data
  const getIndustryLogo = (industry: string) => {
    switch (industry.toLowerCase()) {
      case 'marine':
        return (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
          </svg>
        );
      case 'construction':
        return (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L2 12H5V20H19V12H22L12 3ZM12 7.69L17 12.19V18H15V13H9V18H7V12.19L12 7.69Z"/>
          </svg>
        );
      case 'transportation':
        return (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.28 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5S5.67 13 6.5 13 8 13.67 8 14.5 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5S16.67 13 17.5 13 19 13.67 19 14.5 18.33 16 17.5 16ZM5 11L6.5 6.5H17.5L19 11H5Z"/>
          </svg>
        );
      case 'composites':
        return (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z"/>
          </svg>
        );
      case 'insulation':
        return (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12"/>
          </svg>
        );
      default:
        return null;
    }
  };

  if (!svgContent || !xrayComponent.svgOverlay) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="font-normal text-[#1B3764] mb-8 font-poppins leading-tight" style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 56px)' }}>
              Product Application View
            </h2>
            <p className="text-gray-600 font-normal font-poppins">Loading Product Application View...</p>
          </div>
        </div>
      </section>
    );
  }

  // Parse SVG and enhance with interactivity
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
  const svgElement = svgDoc.documentElement;

  // Check if SVG parsed correctly
  if (svgElement.tagName !== 'svg') {
    console.error('SVG parsing failed. Got:', svgElement.tagName);
    return null;
  }

  // Get viewBox for scaling
  const viewBox = svgElement.getAttribute('viewBox') || '0 0 233.403 191.162';

  // Calculate tooltip position - 20px below the bottom of the SVG path
  const getTooltipPosition = (hotspot: Hotspot) => {
    if (!hotspot.points || hotspot.points.length === 0) {
      return { x: 50, y: 50 }; // Default center
    }

    // Calculate center X for horizontal centering
    const xPoints = hotspot.points.filter((_, i) => i % 2 === 0);
    const centerX = xPoints.reduce((sum, x) => sum + x, 0) / xPoints.length;
    
    // Find the bottom-most Y point
    const yPoints = hotspot.points.filter((_, i) => i % 2 === 1);
    const bottomY = Math.max(...yPoints);
    
    // Get SVG viewBox for percentage calculation
    const [, , viewBoxWidth, viewBoxHeight] = viewBox.split(' ').map(Number);
    
    const percentX = (centerX / viewBoxWidth) * 100;
    const percentY = (bottomY / viewBoxHeight) * 100;
    
    return { x: percentX, y: percentY };
  };

  return (
    <section className="pt-0 pb-16 bg-white overflow-visible">
      <div className="w-full px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 
            className="font-normal text-[#1B3764] mb-4 font-poppins leading-tight"
            style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 56px)' }}
          >
            Product Application View
          </h2>
          <p 
            className="text-lg text-[#1B3764] max-w-2xl mx-auto font-normal font-poppins"
          >
            Hover over the highlighted areas to explore our comprehensive range of solutions for {industry.id} applications.
          </p>
        </motion.div>

        {/* Main Content - Centered X-Ray Image */}
        <div className="flex justify-center relative">
          <motion.div
            className="relative max-w-7xl w-full x-ray-container"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full aspect-square bg-transparent rounded-2xl overflow-visible" onMouseLeave={() => handleHotspotHover(null)} style={{ position: 'relative' }}>
              {/* Post X-Ray Image */}
              <img
                src={xrayComponent.postSrc}
                alt={`${industry.id} X-Ray view`}
                className="w-full h-full object-contain"
              />
              
              {/* SVG Overlay with Hotspots */}
              <div className="absolute inset-0 pointer-events-auto">
                <svg
                  className="w-full h-full"
                  viewBox={viewBox}
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ pointerEvents: 'auto' }}
                >
                  {xrayComponent.hotspots.map((hotspot, index) => {
                    const isSelected = selectedHotspot?.id === hotspot.id;
                    const isHighlight = isSelected; // Only highlight on select, not hover
                    
                    // Find corresponding SVG element by ID
                    const svgPolygon = svgElement.querySelector(`#${hotspot.id}`);
                    
                    // If SVG element not found, log it and create a fallback circle
                    if (!svgPolygon) {
                      console.log('SVG element not found for hotspot:', hotspot.id);
                      // Create a fallback circular hotspot
                      const cx = hotspot.points?.[0] || 100 + index * 20;
                      const cy = hotspot.points?.[1] || 100;
                      
                      return (
                        <motion.g 
                          key={hotspot.id}
                          onMouseEnter={() => {}}
                          onMouseLeave={() => {}}
                          onClick={() => handleHotspotClick(hotspot)}
                          style={{ pointerEvents: 'auto' }}
                        >
                          <motion.circle
                            cx={cx}
                            cy={cy}
                            r={15}
                            fill={isHighlight ? "rgba(242,97,29,0.8)" : "rgba(27,55,100,0.9)"}
                            stroke="none"
                            className="cursor-pointer"
                            style={{
                              filter: isHighlight ? 
                                'drop-shadow(0 0 12px rgba(242,97,29,0.8)) brightness(1.2)' : 
                                'drop-shadow(0 0 4px rgba(27,55,100,0.3))',
                              pointerEvents: 'auto',
                            }}
                            initial={{ opacity: 0.6, scale: 1 }}
                            animate={{
                              opacity: isHighlight ? 0.9 : 0.6,
                              scale: isHighlight ? 1.05 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                            role="button"
                            tabIndex={0}
                            aria-label={`${hotspot.product?.name || 'hotspot'} area`}
                          />
                        </motion.g>
                      );
                    }

                    const points = svgPolygon.getAttribute('points') || svgPolygon.getAttribute('d') || '';
                    
                    const handleMouseEnter = () => {
                      // Hover disabled - using click/select instead
                    };

                    const handleMouseLeave = () => {
                      // Hover disabled - using click/select instead
                    };

                    return (
                      <motion.g 
                        key={hotspot.id}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleHotspotClick(hotspot)}
                        style={{ pointerEvents: 'auto' }}
                      >
                        {svgPolygon.tagName === 'polygon' ? (
                          <motion.polygon
                            points={points}
                            fill={isHighlight ? "rgba(242,97,29,0.8)" : "rgba(27,55,100,0.9)"}
                            stroke="none"
                            strokeWidth="0"
                            className="cursor-pointer"
                            style={{
                              filter: isHighlight ? 
                                'drop-shadow(0 0 12px rgba(242,97,29,0.8)) brightness(1.2)' : 
                                'drop-shadow(0 0 4px rgba(27,55,100,0.3))',
                              pointerEvents: 'auto',
                            }}
                            initial={{ opacity: 0.6, scale: 1 }}
                            animate={{
                              opacity: isHighlight ? 0.9 : 0.6,
                              scale: isHighlight ? 1.05 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                            role="button"
                            tabIndex={0}
                            aria-label={`${hotspot.product?.name || hotspot.experience?.title || 'hotspot'} area`}
                          />
                        ) : (
                          <motion.path
                            d={points}
                            fill={isHighlight ? "rgba(242,97,29,0.8)" : "rgba(27,55,100,0.9)"}
                            stroke="none"
                            strokeWidth="0"
                            className="cursor-pointer"
                            style={{
                              filter: isHighlight ? 
                                'drop-shadow(0 0 12px rgba(242,97,29,0.8)) brightness(1.2)' : 
                                'drop-shadow(0 0 4px rgba(27,55,100,0.3))',
                              pointerEvents: 'auto',
                            }}
                            initial={{ opacity: 0.6, scale: 1 }}
                            animate={{
                              opacity: isHighlight ? 0.9 : 0.6,
                              scale: isHighlight ? 1.05 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                            role="button"
                            tabIndex={0}
                            aria-label={`${hotspot.product?.name || hotspot.experience?.title || 'hotspot'} area`}
                          />
                        )}
                      </motion.g>
                    );
                  })}
                </svg>
              </div>

              {/* Product Tooltip - Positioned 20px below the SVG path */}
              {!isMobile && selectedHotspot && selectedHotspot.product && (() => {
                const position = getTooltipPosition(selectedHotspot);
                return (
                  <div 
                    className="absolute pointer-events-none z-20"
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: 'translate(-50%, 0)',
                      marginTop: '20px',
                      width: '320px',
                      maxWidth: '90%',
                    }}
                  >
                    <ProductTooltip 
                      hotspot={selectedHotspot}
                      isPinned={false}
                      industry={industry.id}
                      onClose={handleCloseCard}
                      disablePositioning={true}
                      onProductClick={() => {}} // Disable product link
                    />
                  </div>
                );
              })()}
            </div>

            {/* Mobile Selected Product Display */}
            {isMobile && selectedHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 bg-[#D1D5DB] rounded-xl p-4 shadow-xl"
              >
                {selectedHotspot.product ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <img
                        src={selectedHotspot.product.thumb}
                        alt={selectedHotspot.product.name}
                        className="w-64 h-64 object-contain rounded-lg p-2"
                      />
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <img 
                          src={`/logos/${industry.id.charAt(0).toUpperCase() + industry.id.slice(1)}-Icon.png`}
                          alt={`${industry.id} industry`}
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            // Fallback for transportation which has different naming
                            if (industry.id === 'transportation') {
                              e.currentTarget.src = '/logos/Transportation-Icon-2.png';
                            }
                          }}
                        />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-[#1B3764]">
                        {selectedHotspot.product.sku}
                      </h3>
                      <p className="text-sm text-[#1B3764] mb-3">
                        {selectedHotspot.product.name}
                      </p>
                      <p className="text-sm text-[#1B3764] mb-4">
                        {selectedHotspot.product.blurb}
                      </p>
                    </div>
                    <div className="w-full bg-[#1B3764] text-white rounded-full px-6 py-3 font-medium text-center">
                      Product Information
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {selectedHotspot.experience?.icon}
                      </span>
                      <h3 className="font-bold text-xl text-[#1B3764]">
                        {selectedHotspot.experience?.title}
                      </h3>
                    </div>
                    <p className="text-[#1B3764]">
                      {selectedHotspot.experience?.description}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default StaticXRayExplorer;
