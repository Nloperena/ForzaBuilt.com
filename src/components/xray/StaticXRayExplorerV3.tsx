import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface StaticXRayExplorerV3Props {
  svgPath: string;
}

const StaticXRayExplorerV3: React.FC<StaticXRayExplorerV3Props> = ({ svgPath }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isCardVisible, setIsCardVisible] = useState<boolean>(false);
  const [isCardStuck, setIsCardStuck] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Product data mapping for different paths
  const productMap: Record<string, any> = {
    'Door_Lamination': {
      sku: 'TAC-OS74',
      name: 'TAC-OS74 Ultra High-Strength Hybrid Polymer Structural Adhesive',
      blurb: 'TAC-OS74 Trailer Door Lamination Solution',
      thumb: '/product-images/tac-os74.png',
      url: '/product/tac-os74/'
    },
    'Bonding_Side_Skins_to_Trailer': {
      sku: 'TAC-739R',
      name: 'TAC-739R Mist Spray Infusion Molding Adhesive',
      blurb: 'TAC-739R Trailer Side Skin Assembly System',
      thumb: '/product-images/tac-739r.png',
      url: '/product/tac-739r/'
    },
    'Replacing_Mechanical_Fasteners__x2F__Riveting__x2F__on_Side_Panels': {
      sku: 'TAC-735R',
      name: 'TAC-735R Mist Spray No Haps Infusion Molding Adhesive',
      blurb: 'TAC-735R Trailer Panel Fastener Replacement',
      thumb: '/product-images/tac-735r.png',
      url: '/product/tac-735r/'
    },
    'Roof_Sealing': {
      sku: 'TAC-738R',
      name: 'TAC-738R Web Spray Zero VOC Infusion Molding Adhesive',
      blurb: 'TAC-738R Trailer Roof Sealing',
      thumb: '/product-images/tac-738r.png',
      url: '/product/tac-738r/'
    },
    'Plastic_Laminate__x26__Metal_Laminate': {
      sku: 'TAC-734G',
      name: 'TAC-734G Web Spray High Tack Infusion Molding Adhesive',
      blurb: 'TAC-734G Trailer Laminate Bonding',
      thumb: '/product-images/tac-734g.png',
      url: '/product/tac-734g/'
    },
    'Carpeting_and_Vinyl_on_Walls': {
      sku: 'TAC-R777',
      name: 'TAC-R777 Two-Part Modified Epoxy Adhesive',
      blurb: 'TAC-R777 Trailer Wall Covering',
      thumb: '/product-images/tac-r777.png',
      url: '/product/tac-r777/'
    }
  };

  // Default product for unknown paths
  const defaultProduct = {
    sku: 'TAC-OS74',
    name: 'TAC-OS74 Ultra High-Strength Hybrid Polymer Structural Adhesive',
    blurb: 'TAC-OS74 Transportation Structural Bonding Solution',
    thumb: '/product-images/tac-os74.png',
    url: '/product/tac-os74/'
  };

  // Get current product based on hovered path
  const getCurrentProduct = () => {
    if (!hoveredPath) return defaultProduct;
    return productMap[hoveredPath] || defaultProduct;
  };

  // Handle path hover with animation
  const handlePathHover = (pathId: string) => {
    if (!isCardStuck) {
      setHoveredPath(pathId);
      setIsCardVisible(true);
    }
  };

  const handlePathLeave = () => {
    if (!isCardStuck) {
      setHoveredPath(null);
      setIsCardVisible(false);
    }
  };

  // Handle path click to stick/unstick card
  const handlePathClick = (pathId: string) => {
    if (isCardStuck && hoveredPath === pathId) {
      // Unstick the card
      setIsCardStuck(false);
      setHoveredPath(null);
      setIsCardVisible(false);
    } else {
      // Stick the card with current product
      setHoveredPath(pathId);
      setIsCardVisible(true);
      setIsCardStuck(true);
    }
  };

  // Handle manual card close
  const handleCloseCard = () => {
    setIsCardStuck(false);
    setHoveredPath(null);
    setIsCardVisible(false);
  };

  // Viewport detection for stuck card
  useEffect(() => {
    if (!isCardStuck || !svgRef.current) return;

    const handleScroll = () => {
      const svgRect = svgRef.current?.getBoundingClientRect();
      if (svgRect) {
        const isInViewport = svgRect.top < window.innerHeight && svgRect.bottom > 0;
        if (!isInViewport) {
          setIsCardStuck(false);
          setHoveredPath(null);
          setIsCardVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isCardStuck]);

  // Load SVG content
  useEffect(() => {
    fetch(svgPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(setSvgContent)
      .catch(error => {
        console.error('Error loading SVG:', error);
      });
  }, [svgPath]);

  if (!svgContent) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">Loading SVG...</p>
          </div>
        </div>
      </section>
    );
  }

  // Parse SVG and enhance with hover functionality
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
  const svgElement = svgDoc.documentElement;

  // Check if SVG parsed correctly
  if (svgElement.tagName !== 'svg') {
    console.error('SVG parsing failed. Got:', svgElement.tagName);
    return null;
  }

  // Get viewBox for scaling
  const viewBox = svgElement.getAttribute('viewBox') || '0 0 259.2 259.2';

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative w-full bg-transparent rounded-2xl overflow-visible">
          
          {/* Product Information Card - Fixed to Viewport with Animation */}
          <AnimatePresence>
            {isCardVisible && (
              <motion.div 
                className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-6"
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
              >
              <div className="flex flex-col space-y-4">
                {/* Stuck Indicator */}
                {isCardStuck && (
                  <div className="flex justify-center">
                    <div className="bg-[#F2611D] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
                      <span>Selected</span>
                      <button
                        onClick={handleCloseCard}
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Product Image */}
                <div className="flex justify-center">
                  <img
                    src={getCurrentProduct().thumb}
                    alt={getCurrentProduct().name}
                    className="w-32 h-32 object-contain rounded-lg bg-gray-50 p-2"
                  />
                </div>
                
                {/* Product Info */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-[#1B3764] mb-2">
                    {getCurrentProduct().sku}
                  </h3>
                  <p className="text-sm text-[#1B3764] mb-3">
                    {getCurrentProduct().name}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {getCurrentProduct().blurb}
                  </p>
                  
                  {/* Action Button */}
                  <a
                    href={getCurrentProduct().url}
                    className="inline-flex items-center justify-center gap-2 bg-[#F2611D] hover:bg-[#E55B1C] text-white rounded-full px-6 py-3 text-sm font-medium transition-colors"
                  >
                    View Product Details
                  </a>
                </div>
              </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Static background image - no hover functionality */}
          <img 
            src={svgPath} 
            alt="X-Ray View Background" 
            className="w-full h-auto object-contain"
          />
          
          {/* Interactive SVG overlay with hover functionality */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-auto"
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Render all SVG paths with hover functionality */}
            {Array.from(svgElement.querySelectorAll('path, polygon')).map((element, index) => {
              const elementId = element.getAttribute('id') || `path-${index}`;
              const isHovered = hoveredPath === elementId;
              const points = element.getAttribute('points') || element.getAttribute('d') || '';
              
              return (
                <g key={elementId}>
                  {element.tagName === 'polygon' ? (
                    <polygon
                      points={points}
                      fill={isHovered ? "rgba(242,97,29,0.9)" : "rgba(27,55,100,0.2)"}
                      stroke={isCardStuck && hoveredPath === elementId ? "#F2611D" : "none"}
                      strokeWidth={isCardStuck && hoveredPath === elementId ? "1" : "0"}
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => handlePathHover(elementId)}
                      onMouseLeave={handlePathLeave}
                      onClick={() => handlePathClick(elementId)}
                    />
                  ) : (
                    <path
                      d={points}
                      fill={isHovered ? "rgba(242,97,29,0.9)" : "rgba(27,55,100,0.2)"}
                      stroke={isCardStuck && hoveredPath === elementId ? "#F2611D" : "none"}
                      strokeWidth={isCardStuck && hoveredPath === elementId ? "1" : "0"}
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => handlePathHover(elementId)}
                      onMouseLeave={handlePathLeave}
                      onClick={() => handlePathClick(elementId)}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default StaticXRayExplorerV3;
