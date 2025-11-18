import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { byIndustry } from '../../utils/products';

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

  // Set up click handlers when SVG content is loaded
  useEffect(() => {
    if (svgContent && svgContainerRef.current) {
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (svgElement) {
        const paths = svgElement.querySelectorAll('path, polygon');
        
        // Remove all event listeners - no interactions needed
        paths.forEach((path) => {
          (path as SVGPathElement | SVGPolygonElement).style.cursor = 'default';
        });

        return () => {
          // Cleanup
        };
      }
    }
  }, [svgContent, pathProducts]);


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
    </div>
  );
}

export default ImageOverlay;

