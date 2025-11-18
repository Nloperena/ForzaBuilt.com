import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndustryData, XRayComponent, Hotspot } from '../../types/industry';
import ProductTooltip from './ProductTooltip';
import ProductTooltipCard from './ProductTooltipCard';
import { typography } from '../../styles/brandStandards';
import { useIsMobile } from '../../hooks/use-mobile';
import { X } from 'lucide-react';
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
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
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
    if (!isMobile) {
      setHoveredHotspot(hotspot);
      if (hotspot) {
        console.log('Hovering over:', hotspot.id, 'Product:', hotspot.product?.sku);
      } else {
        console.log('Hover cleared');
      }
    }
  };

  const handleHotspotClick = (hotspot: Hotspot) => {
    if (isMobile) {
      setSelectedHotspot(selectedHotspot?.id === hotspot.id ? null : hotspot);
    } else {
      // On desktop, open product modal if there's a product
      if (hotspot.product) {
        setSelectedProduct(hotspot.product);
        setIsModalOpen(true);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
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
            <h2 className="text-2xl md:text-4xl font-normal text-[#1B3764] mb-8 font-poppins">
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

  return (
    <section className="py-16 bg-white overflow-visible">
      <div className="w-full px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 
            className="text-2xl md:text-4xl font-normal text-[#1B3764] mb-4 font-poppins"
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
            <div className="relative w-full aspect-square bg-transparent rounded-2xl overflow-visible" onMouseLeave={() => handleHotspotHover(null)}>
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
                    const isHovered = hoveredHotspot?.id === hotspot.id;
                    const isSelected = selectedHotspot?.id === hotspot.id;
                    const isHighlight = isHovered || isSelected;
                    
                    // Find corresponding SVG element by ID
                    const svgPolygon = svgElement.querySelector(`#${hotspot.id}`);
                    if (!svgPolygon) return null;

                    const points = svgPolygon.getAttribute('points') || svgPolygon.getAttribute('d') || '';
                    
                    const handleMouseEnter = () => {
                      handleHotspotHover(hotspot);
                    };

                    const handleMouseLeave = () => {
                      handleHotspotHover(null);
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
                    <button
                      onClick={() => {
                        setSelectedProduct(selectedHotspot.product);
                        setIsModalOpen(true);
                      }}
                      className="w-full bg-[#1B3764] hover:bg-[#2A4A7A] text-white rounded-full px-6 py-3 font-medium transition-colors"
                    >
                      View Product Details
                    </button>
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

      {/* Product Tooltip Card - Fixed Position on Right */}
      {!isMobile && (
        <ProductTooltipCard 
          product={hoveredHotspot?.product || null} 
          isVisible={!!hoveredHotspot?.product} 
        />
      )}

      {/* Product Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#1B3764]">
                    {selectedProduct.sku}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <img
                    src={selectedProduct.thumb}
                    alt={selectedProduct.name}
                    className="w-full h-48 object-contain rounded-lg bg-gray-50"
                  />
                  
                  <div>
                    <h4 className="font-semibold text-lg text-[#1B3764] mb-2">
                      {selectedProduct.name}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {selectedProduct.blurb}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <a
                      href={selectedProduct.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#F2611D] hover:bg-[#E55B1C] text-white rounded-full px-6 py-3 text-center font-medium transition-colors"
                    >
                      View Full Details
                    </a>
                    <button
                      onClick={closeModal}
                      className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
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

export default StaticXRayExplorer;
