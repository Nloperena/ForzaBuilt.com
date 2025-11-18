import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { byIndustry } from '../../utils/products';
import { useIsMobile } from '../../hooks/use-mobile';
import ProductTooltip from './ProductTooltip';
import { X } from 'lucide-react';

/**
 * SVG Viewer component with path selection functionality
 * @param svgSrc - Source path for the SVG image
 * @param title - Title for the overlay (optional)
 */
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
}

function ImageOverlay({ svgSrc, title }: ImageOverlayProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
  const [pathProducts, setPathProducts] = useState<Map<string, Product>>(new Map());
  const [transportationProducts, setTransportationProducts] = useState<Product[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Sample applications text for different path types
  const getApplicationText = (pathId: string): string => {
    const idLower = pathId.toLowerCase();
    if (idLower.includes('structural') || idLower.includes('floor') || idLower.includes('frame')) {
      return 'Structural bonding applications for floor-to-frame connections in RV and trailer construction, providing superior strength and durability.';
    }
    if (idLower.includes('window')) {
      return 'Window bonding and assembly applications for RV and commercial vehicle windows, ensuring weather-tight seals and structural integrity.';
    }
    if (idLower.includes('windshield')) {
      return 'Windshield installation and bonding applications for transportation vehicles, providing secure attachment and weather resistance.';
    }
    if (idLower.includes('roof') || idLower.includes('sealing')) {
      return 'Roof sealing and bonding applications for RV and trailer roofs, preventing water intrusion and maintaining structural integrity.';
    }
    if (idLower.includes('sidewall') || idLower.includes('panel')) {
      return 'Sidewall and panel bonding applications for replacing mechanical fasteners, providing cleaner aesthetics and improved structural performance.';
    }
    if (idLower.includes('door') || idLower.includes('lamination')) {
      return 'Door lamination and assembly applications for trailer doors, ensuring strong bonds between composite and metal components.';
    }
    if (idLower.includes('skin') || idLower.includes('side')) {
      return 'Side skin bonding applications for trailer construction, providing secure attachment of exterior panels to frame structures.';
    }
    if (idLower.includes('laminate') || idLower.includes('plastic') || idLower.includes('metal')) {
      return 'Plastic and metal laminate bonding applications for interior and exterior components, ensuring durable and reliable adhesion.';
    }
    if (idLower.includes('carpet') || idLower.includes('vinyl') || idLower.includes('wall')) {
      return 'Interior wall covering applications for carpet and vinyl installation in trailers and RVs, providing strong and lasting adhesion.';
    }
    // Default application text
    return 'Transportation industry bonding and sealing applications for RV and trailer construction, providing reliable performance in demanding environments.';
  };

  // Load transportation products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await byIndustry('transportation');
        // Convert to format we need
        const formattedProducts = products.map(p => ({
          id: p.id,
          name: p.name,
          imageUrl: p.imageUrl,
          description: p.description || p.shortName || '',
        }));
        setTransportationProducts(formattedProducts);
      } catch (error) {
        console.error('Failed to load transportation products:', error);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    // Load SVG content dynamically
    fetch(svgSrc)
      .then((response) => response.text())
      .then((text) => {
        // Inject hover styles into SVG
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, 'image/svg+xml');
        const svgElement = svgDoc.documentElement;

        // Ensure SVG has proper width/height for responsive sizing
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', 'auto');
        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svgElement.style.width = '100%';
        svgElement.style.height = 'auto';
        svgElement.style.display = 'block';
        svgElement.style.maxWidth = '100%';
        svgElement.style.overflow = 'visible';

        // Add unique IDs to paths/polygons if they don't have them
        const paths = svgElement.querySelectorAll('path, polygon');
        paths.forEach((path, index) => {
          if (!path.id) {
            const titlePrefix = title ? title.replace(/\s+/g, '_') : 'path';
            path.id = `${titlePrefix}_path_${index}`;
          }
        });

        // Add style element for hover and selected effects
        const style = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'style');
        style.textContent = `
          path:hover:not(.selected), polygon:hover:not(.selected) {
            fill: #ff6600 !important;
            stroke: #ff6600 !important;
            transition: fill 0.2s ease, stroke 0.2s ease;
            cursor: pointer;
          }
          path.selected, polygon.selected {
            fill: #ff6600 !important;
            stroke: #ff6600 !important;
          }
          path, polygon {
            cursor: pointer;
          }
        `;
        
        // Insert style at the beginning of the SVG
        if (svgElement.firstChild) {
          svgElement.insertBefore(style, svgElement.firstChild);
        } else {
          svgElement.appendChild(style);
        }

        // Convert back to string
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        setSvgContent(svgString);

        // Assign random transportation products to each path/polygon after SVG is loaded
        if (transportationProducts.length > 0) {
          const productMap = new Map<string, Product>();
          paths.forEach((path) => {
            const randomProduct = transportationProducts[Math.floor(Math.random() * transportationProducts.length)];
            productMap.set(path.id, randomProduct);
          });
          setPathProducts(productMap);
        }
      })
      .catch((error) => {
        console.error('Error loading SVG:', error);
      });
  }, [svgSrc, title, transportationProducts]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Hide navbar and prevent body scroll when modal is open
  useEffect(() => {
    const navbar = document.querySelector('header[data-component="header"]') as HTMLElement;
    
    if (isModalOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Slide navbar up with !important to override scroll behavior temporarily
      if (navbar) {
        navbar.style.setProperty('transform', 'translateY(-100%)', 'important');
        navbar.style.setProperty('transition', 'transform 0.3s ease-in-out', 'important');
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Remove the forced transform to allow scroll behavior to resume
      if (navbar) {
        navbar.style.removeProperty('transform');
        navbar.style.removeProperty('transition');
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      if (navbar) {
        navbar.style.removeProperty('transform');
        navbar.style.removeProperty('transition');
      }
    };
  }, [isModalOpen]);

  // Set up hover and click handlers when SVG content is loaded
  useEffect(() => {
    if (svgContent && svgContainerRef.current) {
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (svgElement) {
        const paths = svgElement.querySelectorAll('path, polygon');
        
        const handleMouseEnter = (event: Event) => {
          if (isMobile) return;
          const target = event.currentTarget as SVGPathElement | SVGPolygonElement;
          const product = pathProducts.get(target.id);
          if (product) {
            console.log('Hovering over path:', target.id, 'Product:', product.sku || product.name);
            setHoveredProduct(product);
          }
        };

        const handleMouseLeave = () => {
          if (isMobile) return;
          setHoveredProduct(null);
        };

        const handleClick = (event: Event) => {
          const target = event.currentTarget as SVGPathElement | SVGPolygonElement;
          const product = pathProducts.get(target.id);
          if (product) {
            console.log('Clicked path:', target.id, 'Product:', product.sku || product.name);
            setSelectedProduct(product);
            setIsModalOpen(true);
          }
        };

        paths.forEach((path) => {
          (path as SVGPathElement | SVGPolygonElement).style.cursor = 'pointer';
          path.addEventListener('mouseenter', handleMouseEnter);
          path.addEventListener('mouseleave', handleMouseLeave);
          path.addEventListener('click', handleClick);
        });

        return () => {
          paths.forEach((path) => {
            path.removeEventListener('mouseenter', handleMouseEnter);
            path.removeEventListener('mouseleave', handleMouseLeave);
            path.removeEventListener('click', handleClick);
          });
        };
      }
    }
  }, [svgContent, pathProducts, isMobile]);


  return (
    <>
      <div className="bg-white py-4 sm:py-6 md:py-8 lg:py-12">
        {title && (
          <div className="px-4 sm:px-6 md:px-8 mb-3 sm:mb-4 md:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">{title}</h2>
          </div>
        )}
        
        <div className="relative overflow-hidden flex justify-center px-2 sm:px-4 md:px-6">
          {/* SVG - rendered inline for interactivity */}
          {svgContent && (
            <div
              ref={svgContainerRef}
              className="w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          )}
        </div>
      </div>

      {/* Product Tooltip - Fixed Position on Right */}
      {!isMobile && hoveredProduct && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[9999]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-[#D1D5DB] rounded-xl p-3 md:p-4 shadow-2xl pointer-events-auto w-56 md:w-64 lg:max-w-xs"
          >
            <div className="space-y-2 md:space-y-3">
              {/* Product Image */}
              {(hoveredProduct.thumb || hoveredProduct.imageUrl) && (
                <div className="flex justify-center">
                  <img
                    src={hoveredProduct.thumb || hoveredProduct.imageUrl}
                    alt={hoveredProduct.name}
                    className="w-28 h-28 md:w-36 md:h-36 object-contain"
                  />
                </div>
              )}
              {/* Product Information */}
              <div className="space-y-2">
                <div className="text-center">
                  {hoveredProduct.sku && (
                    <h3 className="font-bold text-base md:text-lg mb-1 text-[#1B3764]">
                      {hoveredProduct.sku}
                    </h3>
                  )}
                  <p className="text-xs md:text-sm text-[#1B3764] mb-2 leading-relaxed">
                    {hoveredProduct.name}
                  </p>
                  {hoveredProduct.description && (
                    <p className="text-[10px] md:text-xs text-[#1B3764] leading-relaxed line-clamp-3">
                      {hoveredProduct.description}
                    </p>
                  )}
                </div>
                {/* Call to Action */}
                <div className="text-center pt-2 border-t border-[#1B3764]/20">
                  <div className="text-[10px] text-[#1B3764]/70">
                    Click highlighted area for details
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Product Details Modal - Center Aligned */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[10000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header with Close Button */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#1B3764]">
                    {selectedProduct.sku || selectedProduct.name}
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Product Content */}
                <div className="space-y-4">
                  {/* Product Image */}
                  {(selectedProduct.thumb || selectedProduct.imageUrl) && (
                    <img
                      src={selectedProduct.thumb || selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      className="w-full h-48 object-contain rounded-lg bg-gray-50"
                    />
                  )}

                  {/* Product Details */}
                  <div>
                    <h4 className="font-semibold text-lg text-[#1B3764] mb-2">
                      {selectedProduct.name}
                    </h4>
                    {selectedProduct.description && (
                      <p className="text-gray-600 mb-4">
                        {selectedProduct.description}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={`/products/${selectedProduct.id}`}
                      className="flex-1 bg-[#F2611D] hover:bg-[#E55B1C] text-white rounded-full px-6 py-3 text-center font-medium transition-colors"
                    >
                      View Product Details
                    </a>
                    <button
                      onClick={handleCloseModal}
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
    </>
  );
}

export default ImageOverlay;

