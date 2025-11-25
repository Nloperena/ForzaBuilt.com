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
  viewportHeight?: number;
  viewportWidth?: number;
  sidebarWidth?: string; // New prop for sidebar width
  industry?: string; // Industry to fetch products for
  bgImage?: string; // Optional background image
}

function ImageOverlay({ svgSrc, title, viewportHeight = 800, viewportWidth = 1280, sidebarWidth = '320px', industry = 'transportation', bgImage }: ImageOverlayProps) {
  // Calculate responsive min-height based on viewport height - use full viewport height
  const xrayMinHeight = (() => {
    // Use full viewport height for all displays
    return `${viewportHeight}px`;
  })();
  
  // Calculate max-width for SVG container based on viewport width
  const svgMaxWidth = (() => {
    // Return width 100% to fit within the parent container (grid cell)
    return 'w-full'; 
  })();

  // Tooltip scale factor for short displays
  const tooltipScale = (() => {
    if (viewportHeight < 500) return 0.85;
    if (viewportHeight < 600) return 0.9;
    if (viewportHeight < 800) return 0.95;
    return 1;
  })();
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [pathProducts, setPathProducts] = useState<Map<string, Product>>(new Map());
  const [industryProducts, setIndustryProducts] = useState<Product[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{x: number, y: number, centerY: number, leftX: number, rightX: number} | null>(null);
  const [modalOpacity, setModalOpacity] = useState(1); // State for modal opacity animation
  const [isXRayInView, setIsXRayInView] = useState(false); // State to track if X-Ray is in viewport
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const selectedPathRef = useRef<SVGPathElement | SVGPolygonElement | null>(null); // New ref to track selected path
  const hoveredPathRef = useRef<SVGPathElement | SVGPolygonElement | null>(null); // Ref to track hovered path
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to track scroll timeout
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

  // Load industry products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await byIndustry(industry);
        // Convert to format we need
        const formattedProducts = products.map(p => ({
          id: p.id,
          name: p.name,
          imageUrl: p.imageUrl,
          description: p.description || p.shortName || '',
          sku: p.sku // Ensure sku is passed
        }));
        setIndustryProducts(formattedProducts);
      } catch (error) {
        console.error(`Failed to load ${industry} products:`, error);
      }
    };
    loadProducts();
  }, [industry]);

  useEffect(() => {
    // Load SVG content dynamically
    fetch(svgSrc)
      .then((response) => response.text())
      .then((text) => {
        // Inject hover styles into SVG
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, 'image/svg+xml');
        const svgElement = svgDoc.documentElement;

        // Ensure SVG has proper width/height for responsive sizing - make it larger
        svgElement.setAttribute('height', '100%');
        svgElement.setAttribute('width', 'auto');
        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svgElement.style.height = '100%';
        svgElement.style.width = 'auto';
        // Responsive min-height: smaller on mobile, larger on desktop
        svgElement.style.minHeight = '100vh';
        svgElement.style.display = 'block';
        svgElement.style.maxWidth = 'none'; // Allow full width
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
        if (industryProducts.length > 0) {
          const productMap = new Map<string, Product>();
          paths.forEach((path) => {
            const randomProduct = industryProducts[Math.floor(Math.random() * industryProducts.length)];
            productMap.set(path.id, randomProduct);
          });
          setPathProducts(productMap);
        }
      })
      .catch((error) => {
        console.error('Error loading SVG:', error);
      });
  }, [svgSrc, title, industryProducts]);

  const handleCloseCard = () => {
    if (selectedPathRef.current) {
      selectedPathRef.current.classList.remove('selected');
      selectedPathRef.current = null;
    }
    if (hoveredPathRef.current) {
      hoveredPathRef.current.classList.remove('hovered');
      hoveredPathRef.current = null;
    }
    setSelectedProduct(null);
    setHoveredProduct(null);
  };

  // Handle scroll to close hover modals after 3 seconds
  useEffect(() => {
    const handleScroll = () => {
      // Only close hover modals after 3 seconds, not selected ones
      if (hoveredProduct && !selectedProduct) {
        // Clear any existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // Set a 3-second timer to close the hover modal
        scrollTimeoutRef.current = setTimeout(() => {
          if (hoveredPathRef.current) {
            hoveredPathRef.current.classList.remove('hovered');
            hoveredPathRef.current = null;
          }
          setHoveredProduct(null);
          setTooltipPosition(null);
        }, 3000);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [hoveredProduct, selectedProduct]);

  // Clear scroll timeout when hover state changes or product is selected
  useEffect(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
    // Reset modal opacity when a new product is hovered or selected (only if X-Ray is in view)
    if ((hoveredProduct || selectedProduct) && isXRayInView) {
      setModalOpacity(1);
    }
  }, [hoveredProduct, selectedProduct, isXRayInView]);

  // Handle click outside to close modal (both hovered and selected products)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close modal if there's either a hovered or selected product
      if ((hoveredProduct || selectedProduct) && svgContainerRef.current) {
        const target = event.target as Node;
        // Check if click is outside the SVG container (the display area)
        // Allow clicks on the tooltip itself to keep it open
        if (!svgContainerRef.current.contains(target)) {
          // Also check if it's not the tooltip
          if (tooltipRef.current && !tooltipRef.current.contains(target)) {
            if (selectedPathRef.current) {
              selectedPathRef.current.classList.remove('selected');
              selectedPathRef.current = null;
            }
            if (hoveredPathRef.current) {
              hoveredPathRef.current.classList.remove('hovered');
              hoveredPathRef.current = null;
            }
            setSelectedProduct(null);
            setHoveredProduct(null);
            setTooltipPosition(null);
          }
        }
      }
    };

    if (hoveredProduct || selectedProduct) {
      // Use a longer delay for selected products to avoid closing immediately when clicking to select
      const delay = selectedProduct ? 200 : 0;
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
      }, delay);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside, true);
      };
    }
  }, [hoveredProduct, selectedProduct]);

  useEffect(() => {
    if (svgContainerRef.current) {
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (svgElement) {
        svgElement.style.minHeight = xrayMinHeight;
      }
    }
  }, [xrayMinHeight, svgContent]);

  // Intersection Observer to track when X-Ray is in view and control modal visibility
  useEffect(() => {
    if (!svgContainerRef.current) return;

    let fadeTimeout: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsXRayInView(entry.isIntersecting);
          // Control modal opacity based on whether X-Ray is in view
          if (entry.isIntersecting) {
            // Clear any pending fade out
            if (fadeTimeout) {
              clearTimeout(fadeTimeout);
              fadeTimeout = null;
            }
            setModalOpacity(1); // Fade in when X-Ray comes into view
          } else {
            // Add a small delay before fading out for smoother transition
            fadeTimeout = setTimeout(() => {
              setModalOpacity(0); // Fade out when X-Ray goes out of view
            }, 100);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the X-Ray is visible
        rootMargin: '-50px 0px' // Add buffer to start fading before completely out of view
      }
    );

    observer.observe(svgContainerRef.current);

    return () => {
      observer.disconnect();
      if (fadeTimeout) {
        clearTimeout(fadeTimeout);
      }
    };
  }, [svgContent]); // Re-run when SVG content changes

  // Set up hover and click handlers when SVG content is loaded
  useEffect(() => {
    if (svgContent && svgContainerRef.current) {
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (svgElement) {
        const paths = svgElement.querySelectorAll('path, polygon');

        // Apply 'selected' class to the initially selected product if it exists
        if (selectedProduct && selectedPathRef.current) {
          selectedPathRef.current.classList.add('selected');
        }
        
        const handleMouseEnter = (event: Event) => {
          if (isMobile) return;
          // Don't show hover tooltips or change hover state if a product is already selected (locked)
          if (selectedProduct) return;
          
          const target = event.currentTarget as SVGPathElement | SVGPolygonElement;
          
          // Remove 'hovered' class from previously hovered path
          if (hoveredPathRef.current && hoveredPathRef.current !== target) {
            hoveredPathRef.current.classList.remove('hovered');
          }
          
          // Add 'hovered' class to current path
          target.classList.add('hovered');
          hoveredPathRef.current = target;
          
          const product = pathProducts.get(target.id);
          if (product) {
            console.log('Hovering over path:', target.id, 'Product:', product.sku || product.name);
            // Calculate position based on bounding box
            try {
              const bbox = target.getBBox();
              const svg = target.ownerSVGElement;
              if (svg && svg.viewBox && svg.viewBox.baseVal) {
                const viewBox = svg.viewBox.baseVal;
                // Calculate coordinates relative to viewBox
                const x = ((bbox.x + bbox.width / 2) / viewBox.width) * 100;
                const y = ((bbox.y + bbox.height) / viewBox.height) * 100;
                const centerY = ((bbox.y + bbox.height / 2) / viewBox.height) * 100;
                const leftX = (bbox.x / viewBox.width) * 100;
                const rightX = ((bbox.x + bbox.width) / viewBox.width) * 100;
                setTooltipPosition({ x, y, centerY, leftX, rightX });
              }
            } catch (e) {
              console.error('Error calculating position:', e);
            }
            setHoveredProduct(product);
          }
        };

        const handleMouseLeave = () => {
          if (isMobile) return;
          // Don't clear hover state - keep the orange color and modal visible
          // Only clear if a product is selected (locked)
          if (selectedProduct) {
            // If product is selected, don't change anything
            return;
          }
          // Keep hovered state - don't clear hoveredProduct or tooltipPosition
          // The orange color will persist via the 'hovered' class
        };

        const handleClick = (event: Event) => {
          event.stopPropagation(); // Prevent event from bubbling to document
          const target = event.currentTarget as SVGPathElement | SVGPolygonElement;
          const product = pathProducts.get(target.id);
          if (product) {
            console.log('Clicked path:', target.id, 'Product:', product.sku || product.name);
            
            // Remove 'selected' class from previously selected path, if any
            if (selectedPathRef.current && selectedPathRef.current !== target) {
              selectedPathRef.current.classList.remove('selected');
            }

            // Remove 'hovered' class from previously hovered path, if any
            if (hoveredPathRef.current) {
              hoveredPathRef.current.classList.remove('hovered');
              hoveredPathRef.current = null;
            }

            // Add 'selected' class to the newly selected path (removes 'hovered' automatically via CSS)
            target.classList.remove('hovered');
            target.classList.add('selected');
            selectedPathRef.current = target; // Update the ref
            
            // Calculate position based on bounding box
            try {
              const bbox = target.getBBox();
              const svg = target.ownerSVGElement;
              if (svg && svg.viewBox && svg.viewBox.baseVal) {
                const viewBox = svg.viewBox.baseVal;
                // Calculate center x and bottom y relative to viewBox
                const x = ((bbox.x + bbox.width / 2) / viewBox.width) * 100;
                const y = ((bbox.y + bbox.height) / viewBox.height) * 100;
                const centerY = ((bbox.y + bbox.height / 2) / viewBox.height) * 100;
                const leftX = (bbox.x / viewBox.width) * 100;
                const rightX = ((bbox.x + bbox.width) / viewBox.width) * 100;
                setTooltipPosition({ x, y, centerY, leftX, rightX });
              }
            } catch (e) {
              console.error('Error calculating position:', e);
            }

            // Set selection - clicking locks the product in the modal
            setSelectedProduct(product);
            setHoveredProduct(null); // Clear hover when selecting
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
  }, [svgContent, pathProducts, isMobile, selectedProduct]);


  return (
    <>
      <div className="bg-white pt-4 sm:pt-6 md:pt-8 lg:pt-12 pb-2 sm:pb-3 md:pb-4 lg:pb-6">
        {/* {title && (
          <div className="text-center mb-4">
            <h2 className="font-normal text-[#1B3764] font-poppins"
              style={{ fontSize: 'clamp(14px, 1.3vw, 24px)' }}
            >
              {title}
            </h2>
          </div>
        )} */}
        
        <div className="relative overflow-visible flex justify-center px-2 sm:px-4 md:px-6">
          {/* SVG Container with Tooltip positioned relative to it */}
          {svgContent && (
            <div className="relative h-screen w-full flex justify-center">
              <div
                ref={svgContainerRef}
                className={`relative h-full`}
                style={{ aspectRatio: 'auto', minHeight: '100vh' }}
              >
                {/* Optional Background Image */}
                {bgImage && (
                  <img 
                    src={bgImage} 
                    alt="" 
                    className="absolute inset-0 h-full w-auto max-w-none mx-auto"
                    style={{ zIndex: 0 }}
                  />
                )}
                <div
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                  style={{ 
                    width: 'auto', 
                    height: '100%', 
                    minHeight: '100vh', 
                    position: 'relative', 
                    zIndex: 1 
                  }}
                />
              </div>
              
              {/* Product Tooltip - Positioned next to the hovered/selected SVG path */}
              {!isMobile && (selectedProduct || hoveredProduct) && tooltipPosition && isXRayInView && (() => {
                const tooltipWidth = 400 * tooltipScale;
                
                // Calculate sidebar width (matches TransportationXRaySelector sidebarWidth)
                const sidebarWidthPx = (() => {
                  if (viewportHeight < 600) return 200;
                  if (viewportHeight < 800) return 260;
                  return 320;
                })();
                
                // Calculate exact position to place modal directly to the right of the SVG edge
                const svgContainer = svgContainerRef.current;
                let leftPosition = 'auto';
                let rightPosition = 'auto';
                
                if (svgContainer) {
                  const svgContainerRect = svgContainer.getBoundingClientRect();
                  // Position exactly at the right edge of the SVG container + small gap
                  leftPosition = `${svgContainerRect.right + 12}px`; 
                } else {
                  // Fallback if container ref is missing (should rarely happen)
                  rightPosition = `${Math.max(20, sidebarWidthPx + 20)}px`;
                }
                
                const style: any = {
                  position: 'fixed', // Fixed to viewport
                  pointerEvents: 'none',
                  zIndex: 9999,
                  width: 'auto',
                  maxWidth: `${tooltipWidth}px`,
                  transformOrigin: 'center center',
                  left: leftPosition, // Use left positioning calculated from SVG's right edge
                  right: rightPosition,
                  top: '50%', // Center vertically in viewport
                  transform: `translateY(-50%) scale(${tooltipScale})`, // Center transform
                }

                return (
                  <div ref={tooltipRef} style={style}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ 
                      opacity: modalOpacity, 
                      scale: 1,
                      y: 0
                    }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.4, 0, 0.2, 1] // Smooth easing for fade in/out
                    }}
                    className="bg-[#D1D5DB] rounded-xl shadow-2xl pointer-events-auto relative"
                    style={{
                      padding: `${Math.max(8, 12 * tooltipScale)}px ${Math.max(10, 16 * tooltipScale)}px`,
                      width: `${224 * tooltipScale}px`,
                      maxWidth: `${320 * tooltipScale}px`
                    }}
                  >
                    {/* Close button when selected */}
                    {selectedProduct && (
                      <button
                        onClick={handleCloseCard}
                        className="absolute top-2 right-2 text-[#1B3764] hover:text-[#1B3764]/70 transition-colors z-10"
                        aria-label="Close"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    {(() => {
                      const displayProduct = selectedProduct || hoveredProduct;
                      return (
                        <div className="space-y-2 md:space-y-3">
                          {(displayProduct?.thumb || displayProduct?.imageUrl) && (
                            <div className="flex justify-center">
                              <img
                                src={displayProduct.thumb || displayProduct.imageUrl}
                                alt={displayProduct.name}
                                className="object-contain"
                                style={{
                                  width: `${112 * tooltipScale}px`,
                                  height: `${112 * tooltipScale}px`
                                }}
                              />
                            </div>
                          )}
                          <div style={{ gap: `${8 * tooltipScale}px` }} className="flex flex-col">
                            <div className="text-center">
                              {displayProduct?.sku && (
                                <h3 
                                  className="font-bold mb-1 text-[#1B3764]"
                                  style={{ fontSize: `${Math.max(12, 16 * tooltipScale)}px` }}
                                >
                                  {displayProduct.sku}
                                </h3>
                              )}
                              <p 
                                className="text-[#1B3764] mb-2 leading-relaxed"
                                style={{ fontSize: `${Math.max(10, 14 * tooltipScale)}px` }}
                              >
                                {displayProduct?.name}
                              </p>
                              {displayProduct?.description && (
                                <p 
                                  className="text-[#1B3764] leading-relaxed line-clamp-3"
                                  style={{ fontSize: `${Math.max(8, 12 * tooltipScale)}px` }}
                                >
                                  {displayProduct.description}
                                </p>
                              )}
                                {displayProduct?.id && (
                                  <div style={{ marginTop: `${12 * tooltipScale}px` }}>
                                <a
                                      href={`/product/${displayProduct.id}`}
                                      className="inline-flex items-center justify-center w-full font-semibold text-white rounded-full bg-[#F2611D] border border-[#F2611D] shadow-[0_10px_25px_rgba(242,97,29,0.35)] hover:bg-[#F2611D]/85 hover:border-[#F2611D]/90 transition-colors duration-300"
                                      style={{
                                        padding: `${Math.max(4, 6 * tooltipScale)}px ${Math.max(8, 12 * tooltipScale)}px`,
                                        fontSize: `${Math.max(8, 12 * tooltipScale)}px`
                                      }}
                                >
                                  View Product
                                </a>
                              </div>
                            )}
                              </div>
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>


    </>
  );
}

export default ImageOverlay;

