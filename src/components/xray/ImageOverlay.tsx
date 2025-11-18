import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { byIndustry } from '../../utils/products';
import ProductTooltipCard from './ProductTooltipCard';

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
  const [pathApplications, setPathApplications] = useState<Map<string, string>>(new Map());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transportationProducts, setTransportationProducts] = useState<Product[]>([]);
  const svgContainerRef = useRef<HTMLDivElement>(null);

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

        // Assign random transportation products and applications to each path/polygon after SVG is loaded
        if (transportationProducts.length > 0) {
          const productMap = new Map<string, Product>();
          const applicationMap = new Map<string, string>();
          paths.forEach((path) => {
            const randomProduct = transportationProducts[Math.floor(Math.random() * transportationProducts.length)];
            // Enhance product with sku, thumb, and applications
            const enhancedProduct: Product = {
              ...randomProduct,
              sku: randomProduct.id.toUpperCase().replace(/-/g, '-'),
              thumb: randomProduct.imageUrl || '/product-images/placeholder.png',
              applications: getApplicationText(path.id),
            };
            productMap.set(path.id, enhancedProduct);
            applicationMap.set(path.id, getApplicationText(path.id));
          });
          setPathProducts(productMap);
          setPathApplications(applicationMap);
        }
      })
      .catch((error) => {
        console.error('Error loading SVG:', error);
      });
  }, [svgSrc, title, transportationProducts]);

  // Set up click handlers when SVG content is loaded
  useEffect(() => {
    if (svgContent && svgContainerRef.current) {
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (svgElement) {
        const paths = svgElement.querySelectorAll('path, polygon');
        
        const handlePathHover = (e: Event) => {
          const path = e.target as SVGPathElement | SVGPolygonElement;
          if (path.tagName === 'path' || path.tagName === 'polygon') {
            const pathId = path.id;
            const product = pathProducts.get(pathId);
            if (product) {
              setHoveredProduct(product);
            }
          }
        };

        const handlePathLeave = () => {
          setHoveredProduct(null);
        };

        const handlePathClick = (e: Event) => {
          e.stopPropagation();
          const path = e.target as SVGPathElement | SVGPolygonElement;
          if (path.tagName === 'path' || path.tagName === 'polygon') {
            const pathId = path.id;
            const product = pathProducts.get(pathId);
            
            if (product) {
              setSelectedProduct(product);
              setIsModalOpen(true);
            }
            
            setSelectedPaths((prev) => {
              const newSet = new Set(prev);
              if (newSet.has(pathId)) {
                newSet.delete(pathId);
              } else {
                newSet.add(pathId);
              }
              return newSet;
            });
          }
        };

        paths.forEach((path) => {
          path.removeEventListener('mouseenter', handlePathHover);
          path.removeEventListener('mouseleave', handlePathLeave);
          path.removeEventListener('click', handlePathClick);
          path.addEventListener('mouseenter', handlePathHover);
          path.addEventListener('mouseleave', handlePathLeave);
          path.addEventListener('click', handlePathClick);
          (path as SVGPathElement | SVGPolygonElement).style.cursor = 'pointer';
        });

        return () => {
          paths.forEach((path) => {
            path.removeEventListener('mouseenter', handlePathHover);
            path.removeEventListener('mouseleave', handlePathLeave);
            path.removeEventListener('click', handlePathClick);
          });
        };
      }
    }
  }, [svgContent, pathProducts]);

  // Update selected state on DOM elements
  useEffect(() => {
    if (svgContent && svgContainerRef.current) {
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (svgElement) {
        const paths = svgElement.querySelectorAll('path, polygon');
        paths.forEach((path) => {
          if (selectedPaths.has(path.id)) {
            path.classList.add('selected');
          } else {
            path.classList.remove('selected');
          }
        });
      }
    }
  }, [selectedPaths, svgContent, pathProducts]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    // Remove body class to show header again
    document.body.classList.remove('modal-open');
  };

  // Hide header and prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      // Add class to body
      document.body.classList.add('modal-open');
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      // Hide header directly
      const header = document.querySelector('header[data-component="header"]') as HTMLElement;
      if (header) {
        header.style.display = 'none';
      }
      // Also hide any other headers
      const allHeaders = document.querySelectorAll('header');
      allHeaders.forEach(h => {
        if (h !== header) {
          h.style.display = 'none';
        }
      });
    } else {
      // Remove class from body
      document.body.classList.remove('modal-open');
      // Restore body scroll
      document.body.style.overflow = '';
      // Show header again
      const header = document.querySelector('header[data-component="header"]') as HTMLElement;
      if (header) {
        header.style.display = '';
      }
      // Show all other headers
      const allHeaders = document.querySelectorAll('header');
      allHeaders.forEach(h => {
        if (h !== header) {
          h.style.display = '';
        }
      });
    }
    
    return () => {
      // Cleanup on unmount
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      const header = document.querySelector('header[data-component="header"]') as HTMLElement;
      if (header) {
        header.style.display = '';
      }
      const allHeaders = document.querySelectorAll('header');
      allHeaders.forEach(h => {
        h.style.display = '';
      });
    };
  }, [isModalOpen]);

  return (
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

      {/* Product Tooltip Card - Shows on Hover, Absolutely Positioned to Right */}
      {hoveredProduct && (
        <ProductTooltipCard
          product={{
            sku: hoveredProduct.sku || hoveredProduct.id.toUpperCase(),
            name: hoveredProduct.name,
            blurb: hoveredProduct.applications || hoveredProduct.description || 'Transportation industry application',
            thumb: hoveredProduct.thumb || hoveredProduct.imageUrl || '/product-images/placeholder.png',
          }}
          isVisible={!!hoveredProduct}
        />
      )}

      {/* Grey Modal with Image at Top - Shows on Click - Rendered via Portal */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {(isModalOpen && selectedProduct) && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
              style={{ zIndex: 99999 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="bg-[#D1D5DB] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                style={{ zIndex: 100000 }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#1B3764]">
                    {selectedProduct.name}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Large Product Image at Top - 2x larger */}
                  {selectedProduct.imageUrl && (
                    <div className="flex justify-center">
                      <img
                        src={selectedProduct.imageUrl}
                        alt={selectedProduct.name}
                        className="w-[512px] h-[512px] object-contain rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-semibold text-lg text-[#1B3764] mb-2">
                      {selectedProduct.name}
                    </h4>
                    {selectedProduct.applications && (
                      <div className="mb-4">
                        <h5 className="font-semibold text-base text-[#1B3764] mb-2">Applications:</h5>
                        <p className="text-gray-700">
                          {selectedProduct.applications}
                        </p>
                      </div>
                    )}
                    {selectedProduct.description && (
                      <p className="text-gray-700 mb-4">
                        {selectedProduct.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <a
                      href={`/product/${selectedProduct.id}`}
                      className="flex-1 bg-[#1B3764] hover:bg-[#2A4A7A] text-white rounded-full px-6 py-3 text-center font-medium transition-colors"
                    >
                      View Full Details
                    </a>
                    <button
                      onClick={closeModal}
                      className="px-6 py-3 border border-gray-600 rounded-full hover:bg-gray-200 transition-colors text-[#1B3764]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

export default ImageOverlay;

