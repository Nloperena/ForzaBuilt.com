import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { AspectRatio } from '../ui/aspect-ratio';
import { useIsMobile, useIsTablet, useReducedMotion } from '../../hooks/use-mobile';

interface HotspotTooltipProps {
  hotspot: {
    product?: {
      sku: string;
      name: string;
      blurb: string;
      url: string;
      thumb: string;
    };
    experience?: {
      title: string;
      description: string;
      icon: string;
    };
  };
  isPinned?: boolean;
  onClose?: () => void;
  isMobileFixed?: boolean; // New prop for mobile fixed positioning below X-Ray
  onProductClick?: (product: any) => void; // New prop for opening product modal
  industry?: string; // Industry name for color theming
}

const HotspotTooltip: React.FC<HotspotTooltipProps> = ({ 
  hotspot, 
  isPinned = false, 
  onClose,
  isMobileFixed = false,
  onProductClick,
  industry
}) => {
  // Device and accessibility detection
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const reducedMotion = useReducedMotion();
  
  // Industry color mapping
  const getIndustryColor = (industryName?: string) => {
    if (!industryName) return 'from-[#1B3764] to-[#1B3764]';
    
    const industryLower = industryName.toLowerCase();
    
    switch (industryLower) {
      case 'marine':
        return 'from-[#137875] via-[#1b3764] to-[#1b3764]';
      case 'industrial':
        return 'from-[#f16a26] via-[#1b3764] to-[#1b3764]';
      case 'transportation':
        return 'from-[#b83d35] via-[#1b3764] to-[#1b3764]';
      case 'construction':
        return 'from-[#fec770] via-[#1b3764] to-[#1b3764]';
      case 'composites':
        return 'from-[#c7c8c9] via-[#1b3764] to-[#1b3764]';
      case 'insulation':
        return 'from-[#d0157d] via-[#1b3764] to-[#1b3764]';
      case 'foam':
        return 'from-[#f16a26] via-[#1b3764] to-[#1b3764]';
      default:
        return 'from-[#1b3764] to-[#1b3764]';
    }
  };
  
  // Check if this is a product or experience hotspot
  const isProduct = hotspot.product;
  const isExperience = hotspot.experience;

  // Calculate responsive positioning
  const getResponsiveClasses = () => {
    // Mobile fixed positioning (below X-Ray)
    if (isMobileFixed) {
      return 'w-full relative';
    }
    
    if (isPinned) {
      if (isMobile) {
        return 'fixed bottom-4 left-4 right-4 z-50';
      } else if (isTablet) {
        return 'fixed bottom-4 right-4 left-1/4 z-50';
      } else {
        return 'absolute bottom-4 right-4 w-96 z-50';
      }
    } else {
      if (isMobile) {
        return 'fixed bottom-4 left-4 right-4 z-50';
      } else {
        return 'absolute bottom-4 right-4 w-80 z-50';
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`pointer-events-auto ${getResponsiveClasses()}`}
        initial={{ 
          opacity: 0, 
          y: isMobileFixed ? 20 : (isMobile ? 40 : 20), 
          scale: reducedMotion ? 1 : (isMobileFixed ? 1 : 0.9)
        }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1 
        }}
        exit={{ 
          opacity: 0, 
          y: isMobileFixed ? 20 : (isMobile ? 40 : 20), 
          scale: reducedMotion ? 1 : (isMobileFixed ? 1 : 0.9)
        }}
        transition={{ 
          type: reducedMotion ? "tween" : "spring", 
          duration: reducedMotion ? 0.2 : 0.3 
        }}
      >
        <Card className={`
          overflow-hidden group
          ${isMobileFixed 
            ? `shadow-lg border border-gray-200 bg-gray-100 rounded-2xl` 
            : 'shadow-2xl border border-gray-200 bg-gray-100 rounded-2xl'}
          ${isMobile && !isMobileFixed ? 'rounded-t-2xl rounded-b-none' : 'rounded-2xl'}
        `}>
          {/* Amazon-style mobile layout */}
          {isMobileFixed && isProduct ? (
            <div 
              className="flex gap-3 p-1.5 cursor-pointer hover:bg-gray-200 transition-colors rounded-xl"
              onClick={() => onProductClick && onProductClick(hotspot.product)}
            >
              {/* Product Image - Left side - Height matches text content */}
              <div className="flex-shrink-0 w-24 h-auto bg-muted rounded-lg overflow-hidden">
                <img 
                  src={hotspot.product!.thumb}
                  alt={hotspot.product!.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Product Details - Right side - Made smaller text */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-[#1B3764] mb-0.5">
                  {hotspot.product!.name}
                </h3>
                
                <p className="text-xs text-[#1B3764]/80 mb-0.5">
                  SKU: {hotspot.product!.sku}
                </p>
                
                <p className="text-xs text-[#1B3764]/90 line-clamp-2">
                  {hotspot.product!.blurb}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop/tablet layout or non-mobile-fixed */}
              {isProduct && !isMobileFixed && (
                <div className="relative">
                  {/* Badge above image */}
                  <div className="absolute top-3 left-3 z-30">
                    <div className="bg-[#F16022] text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {hotspot.product!.sku}
                    </div>
                  </div>
                  
                  {/* Close Button for Pinned State */}
                  {isPinned && onClose && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="absolute top-2 right-2 h-6 w-6 p-0 bg-[#115B87]/20 hover:bg-[#115B87]/40 text-white border-white/20 backdrop-blur-sm z-30"
                      aria-label="Close details"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                  
                  {/* Product Image */}
                  <div className="h-40 md:h-48 overflow-hidden group">
                    <img 
                      src={hotspot.product!.thumb}
                      alt={hotspot.product!.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Product Title between image and content */}
                  <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-[#1B3764]">
                      {hotspot.product!.name}
                    </h3>
                  </div>
                </div>
              )}
              
              {/* Content section */}
              <div className="p-4 bg-gray-100">
                <div className="space-y-3">
                  {isProduct && (
                    <>
                      <p className="text-sm text-[#1B3764] line-clamp-2 font-medium">
                        {hotspot.product!.blurb}
                      </p>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          asChild 
                          size="sm" 
                          className="flex-1 bg-[#F16022] hover:bg-[#F16022]/85 text-white"
                        >
                          <a 
                            href={hotspot.product!.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            View Product
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </>
                  )}

                  {isExperience && (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl text-[#1B3764]">{hotspot.experience!.icon}</span>
                        <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-[#1B3764]">
                          {hotspot.experience!.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-[#1B3764] line-clamp-3 font-medium">
                        {hotspot.experience!.description}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </Card>
        
        {/* Mobile-specific swipe hint - only show for overlay tooltips, not fixed ones */}
        {(isMobile || isTablet) && !isPinned && !isMobileFixed && (
          <motion.div
            className="text-xs text-muted-foreground text-center mt-2 px-2 py-1 bg-background/80 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>Tap the highlighted area to pin this {isProduct ? 'product card' : 'information'}</p>
            {isMobile && (
              <p className="mt-1">Swipe up for more details</p>
            )}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default HotspotTooltip;
