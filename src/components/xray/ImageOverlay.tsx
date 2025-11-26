import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { byIndustry } from '../../utils/products';
import { useIsMobile } from '../../hooks/use-mobile';
import { X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  sku?: string;
  thumb?: string;
  applications?: string;
}

interface ImageOverlayProps {
  svgSrc: string;
  title?: string;
  industry?: string;
  bgImage?: string;
}

function ImageOverlay({ svgSrc, title, industry = 'transportation', bgImage }: ImageOverlayProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [pathProducts, setPathProducts] = useState<Map<string, Product>>(new Map());
  const [industryProducts, setIndustryProducts] = useState<Product[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const selectedPathRef = useRef<SVGPathElement | SVGPolygonElement | null>(null);
  const hoveredPathRef = useRef<SVGPathElement | SVGPolygonElement | null>(null);
  const isMobile = useIsMobile();

  // Clear all states helper
  const clearAllStates = () => {
    if (hoveredPathRef.current) {
      hoveredPathRef.current.classList.remove('hovered');
      hoveredPathRef.current = null;
    }
    if (selectedPathRef.current) {
      selectedPathRef.current.classList.remove('selected');
      selectedPathRef.current = null;
    }
    setHoveredProduct(null);
    setSelectedProduct(null);
  };

  // Load industry products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await byIndustry(industry);
        const formattedProducts = products.map(p => ({
          id: p.id,
          name: p.name,
          imageUrl: p.imageUrl,
          description: p.description || p.shortName || '',
          sku: p.shortName
        }));
        setIndustryProducts(formattedProducts);
      } catch (error) {
        console.error(`Failed to load ${industry} products:`, error);
      }
    };
    loadProducts();
  }, [industry]);

  // Load and process SVG
  useEffect(() => {
    fetch(svgSrc)
      .then((response) => response.text())
      .then((text) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, 'image/svg+xml');
        const svgElement = svgDoc.documentElement;

        // Set SVG to full size
        svgElement.setAttribute('height', '100%');
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svgElement.style.display = 'block';
        svgElement.style.overflow = 'visible';

        // Process paths
        const paths = svgElement.querySelectorAll('path, polygon');
        paths.forEach((path, index) => {
          if (!path.id) {
            const titlePrefix = title ? title.replace(/\s+/g, '_') : 'path';
            path.id = `${titlePrefix}_path_${index}`;
          }
        });

        // Inject styles
        const style = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'style');
        style.textContent = `
          path:hover:not(.selected):not(.hovered), polygon:hover:not(.selected):not(.hovered) {
            fill: #ff6600 !important;
            stroke: #ff6600 !important;
            transition: fill 0.2s ease, stroke 0.2s ease;
            cursor: pointer;
          }
          path.hovered:not(.selected), polygon.hovered:not(.selected) {
            fill: #ff6600 !important;
            stroke: #ff6600 !important;
          }
          path.selected, polygon.selected {
            fill: #ff6600 !important;
            stroke: #ff6600 !important;
          }
          path, polygon {
            cursor: pointer;
            vector-effect: non-scaling-stroke;
          }
        `;
        
        if (svgElement.firstChild) {
          svgElement.insertBefore(style, svgElement.firstChild);
        } else {
          svgElement.appendChild(style);
        }

        const serializer = new XMLSerializer();
        setSvgContent(serializer.serializeToString(svgElement));

        // Map products
        if (industryProducts.length > 0) {
          const productMap = new Map<string, Product>();
          paths.forEach((path) => {
            const randomProduct = industryProducts[Math.floor(Math.random() * industryProducts.length)];
            productMap.set(path.id, randomProduct);
          });
          setPathProducts(productMap);
        }
      })
      .catch((error) => console.error('Error loading SVG:', error));
  }, [svgSrc, title, industryProducts]);

  // Handle scroll to close modals immediately
  useEffect(() => {
    const handleScroll = () => {
      // Close both hover and selected modals immediately on scroll
      if (hoveredProduct || selectedProduct) {
        clearAllStates();
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hoveredProduct, selectedProduct]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle interactions
  useEffect(() => {
    if (svgContent && svgContainerRef.current) {
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (!svgElement) return;

      const paths = svgElement.querySelectorAll('path, polygon');

      const handleMouseEnter = (event: Event) => {
        if (isMobile || selectedProduct) return;
        
        const target = event.currentTarget as SVGPathElement;
        
        if (hoveredPathRef.current && hoveredPathRef.current !== target) {
          hoveredPathRef.current.classList.remove('hovered');
        }
        
        target.classList.add('hovered');
        hoveredPathRef.current = target;
        
        const product = pathProducts.get(target.id);
        if (product) setHoveredProduct(product);
      };

      const handleMouseLeave = () => {
        // Don't clear hover state on mouse leave - keep the orange color and modal visible
        // until scroll or click elsewhere
      };

      const handleClick = (event: Event) => {
        event.stopPropagation();
        const target = event.currentTarget as SVGPathElement;
        const product = pathProducts.get(target.id);
        
        if (product) {
          if (selectedPathRef.current) selectedPathRef.current.classList.remove('selected');
          if (hoveredPathRef.current) hoveredPathRef.current.classList.remove('hovered');
          
          target.classList.add('selected');
          selectedPathRef.current = target;
          
          setSelectedProduct(product);
          setHoveredProduct(null);
        }
      };

      // Handle click outside
      const handleClickOutside = (event: MouseEvent) => {
        if (hoveredProduct || selectedProduct) {
          const target = event.target as Node;
          
          // Check if click is inside the modal
          const isInsideModal = modalRef.current && modalRef.current.contains(target);
          
          // If click is not inside the modal and not on a product link (since product links are inside the modal)
          // clear states. This means clicks on the SVG background, or anywhere else on the page outside the modal,
          // will close the modal. Clicks directly on an SVG path still trigger the handleClick for product selection.
          // However, we must allow clicks on SVG paths to work for selection, so we check if it's a path.
          // BUT user wants "click off the X-ray the modal should go away".
          // The user also said "If I click off the X-ray the modal should go away" which implies clicking on the background
          // should close it.
          // The previous implementation was: if !isPath && !isInsideModal && !isInsideSvgContainer -> close.
          // The request is "If I click off the X-ray the modal should go away".
          // "X-ray" likely refers to the SVG part.
          // If I click on the SVG (not a path), it should close? Or if I click outside the SVG container?
          // "click off the X-ray" usually means clicking outside the component.
          // BUT, the user also said "click anywhere off the modal should go away".
          // Let's stick to: click outside modal closes it, UNLESS it's a click on a path (which selects a new product).
          
          const isPath = target instanceof SVGPathElement || target instanceof SVGPolygonElement;

          if (!isInsideModal && !isPath) {
            clearAllStates();
          }
        }
      };

      // Use capture phase to catch clicks before they propagate
      document.addEventListener('mousedown', handleClickOutside, true);

      paths.forEach((path) => {
        path.addEventListener('mouseenter', handleMouseEnter);
        path.addEventListener('mouseleave', handleMouseLeave);
        path.addEventListener('click', handleClick);
      });

      return () => {
        document.removeEventListener('mousedown', handleClickOutside, true);
        paths.forEach((path) => {
          path.removeEventListener('mouseenter', handleMouseEnter);
          path.removeEventListener('mouseleave', handleMouseLeave);
          path.removeEventListener('click', handleClick);
        });
      };
    }
  }, [svgContent, pathProducts, isMobile, selectedProduct, hoveredProduct]);

  const handleCloseCard = () => {
    if (selectedPathRef.current) {
      selectedPathRef.current.classList.remove('selected');
      selectedPathRef.current = null;
    }
    setSelectedProduct(null);
  };

  const displayProduct = selectedProduct || hoveredProduct;

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden bg-gray-50/50">
      {/* SVG Container */}
      <div 
        ref={svgContainerRef}
        className="relative h-full w-full max-w-[1920px] mx-auto flex items-center justify-center p-4 sm:p-8 lg:p-12"
      >
        {bgImage && (
          <img 
            src={bgImage} 
            alt="" 
            className="absolute inset-0 h-full w-full object-contain opacity-50"
            style={{ zIndex: 0 }}
          />
        )}
        
        {svgContent && (
          <div
            dangerouslySetInnerHTML={{ __html: svgContent }}
            className="w-full h-full relative z-10"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />
        )}
      </div>

      {/* Product Details Card - Rendered absolutely relative to the container */}
      {/* Breakpoints: 768px (md), 1024px (lg), 1440px (2xl) */}
      <AnimatePresence>
        {displayProduct && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-4 md:right-6 lg:right-8 2xl:right-12 
                       top-1/2 -translate-y-1/2
                       w-44 md:w-52 lg:w-60 2xl:w-72
                       bg-[#dbe1e8]/95 backdrop-blur-md shadow-2xl rounded-lg border border-white/20 overflow-hidden"
            style={{ zIndex: 99999 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2.5 md:p-3 lg:p-4 2xl:p-5 relative text-center">
               {selectedProduct && (
                <button
                  onClick={handleCloseCard}
                  className="absolute top-1.5 right-1.5 md:top-2 md:right-2 lg:top-2.5 lg:right-2.5 p-0.5 md:p-1 text-[#1B3764]/50 hover:text-[#1B3764] rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                </button>
              )}

              <div className="flex flex-col items-center">
                {/* Image */}
                {(displayProduct.thumb || displayProduct.imageUrl) && (
                  <div className="w-full h-20 md:h-24 lg:h-28 2xl:h-36 mb-2 md:mb-2.5 lg:mb-3 flex items-center justify-center">
                    <img
                      src={displayProduct.thumb || displayProduct.imageUrl}
                      alt={displayProduct.name}
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="w-full space-y-0.5 mb-1.5 md:mb-2">
                  {displayProduct.sku && (
                    <h2 className="text-sm md:text-base lg:text-lg 2xl:text-xl font-bold text-[#1B3764] tracking-tight">
                      {displayProduct.sku}
                    </h2>
                  )}
                </div>
                
                <p className="text-[9px] md:text-[10px] lg:text-xs 2xl:text-sm text-[#1B3764]/80 leading-relaxed mb-1.5 md:mb-2 lg:mb-2.5 px-0.5 line-clamp-3">
                   {displayProduct.description}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-[#1B3764]/20 mb-1.5 md:mb-2 lg:mb-2.5"></div>

                {/* View Product Button */}
                <a
                  href={`/product/${displayProduct.id}`}
                  className="block w-full py-1.5 md:py-2 lg:py-2.5 text-center font-semibold text-white bg-[#F2611D] rounded hover:bg-[#F2611D]/90 transition-colors shadow-sm text-[10px] md:text-xs lg:text-sm"
                >
                  View Product Details
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ImageOverlay;
