import { useState, useEffect, useRef } from 'react';
import { byIndustry } from '../../utils/products';
import { useIsMobile } from '../../hooks/use-mobile';

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
  activeProductId?: string | null;
  onProductHover?: (product: Product | null) => void;
  onProductSelect?: (product: Product | null) => void;
}

function ImageOverlay({ 
  svgSrc, 
  title, 
  industry = 'transportation', 
  activeProductId,
  onProductHover,
  onProductSelect 
}: ImageOverlayProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [pathProducts, setPathProducts] = useState<Map<string, Product>>(new Map());
  const [industryProducts, setIndustryProducts] = useState<Product[]>([]);
  
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const selectedPathRef = useRef<SVGPathElement | SVGPolygonElement | null>(null);
  const hoveredPathRef = useRef<SVGPathElement | SVGPolygonElement | null>(null);
  const isMobile = useIsMobile();

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

  // Sync active selection state from parent
  useEffect(() => {
    // If no active product, clear selection
    if (!activeProductId) {
      if (selectedPathRef.current) {
        selectedPathRef.current.classList.remove('selected');
        selectedPathRef.current = null;
      }
      return;
    }
  }, [activeProductId]);

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

  // Handle interactions
  useEffect(() => {
    if (svgContent && svgContainerRef.current) {
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (!svgElement) return;

      const paths = svgElement.querySelectorAll('path, polygon');

      const handleMouseEnter = (event: Event) => {
        if (isMobile || activeProductId) return;
        
        const target = event.currentTarget as SVGPathElement;
        
        if (hoveredPathRef.current && hoveredPathRef.current !== target) {
          hoveredPathRef.current.classList.remove('hovered');
        }
        
        target.classList.add('hovered');
        hoveredPathRef.current = target;
        
        const product = pathProducts.get(target.id);
        if (product) onProductHover?.(product);
      };

      const handleMouseLeave = () => {
        // Keep hover state until mouse enters another path or selection happens
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
          
          onProductSelect?.(product);
          onProductHover?.(null);
        }
      };

      paths.forEach((path) => {
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
  }, [svgContent, pathProducts, isMobile, activeProductId, onProductHover, onProductSelect]);

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden bg-white">
      {/* SVG Container */}
      <div 
        ref={svgContainerRef}
        className="relative h-full w-full max-w-[1920px] mx-auto flex items-center justify-center p-4 sm:p-8 lg:p-12"
      >
        {svgContent && (
          <div
            dangerouslySetInnerHTML={{ __html: svgContent }}
            className="w-full h-full relative z-10"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />
        )}
      </div>
    </div>
  );
}

export default ImageOverlay;

