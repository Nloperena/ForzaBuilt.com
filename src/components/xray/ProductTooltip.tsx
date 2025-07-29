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
}

const HotspotTooltip: React.FC<HotspotTooltipProps> = ({ 
  hotspot, 
  isPinned = false, 
  onClose,
  isMobileFixed = false
}) => {
  // Device and accessibility detection
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const reducedMotion = useReducedMotion();
  
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
          ${isMobileFixed ? 'shadow-lg border bg-card rounded-xl' : 'shadow-xl border-2 bg-card/95 backdrop-blur-sm'}
          ${isMobile && !isMobileFixed ? 'rounded-t-xl rounded-b-none' : 'rounded-xl'}
        `}>
          {/* Amazon-style mobile layout */}
          {isMobileFixed && isProduct ? (
            <div className="flex gap-4 p-4">
              {/* Product Image - Left side */}
              <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-lg overflow-hidden">
                <img 
                  src={hotspot.product!.thumb}
                  alt={hotspot.product!.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Product Details - Right side */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base leading-tight line-clamp-2 text-foreground mb-1">
                  {hotspot.product!.name}
                </h3>
                
                <p className="text-xs text-muted-foreground/80 mb-2">
                  SKU: {hotspot.product!.sku}
                </p>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {hotspot.product!.blurb}
                </p>
                
                <Button 
                  asChild 
                  size="sm" 
                  className="w-full text-sm"
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
            </div>
          ) : (
            <>
              {/* Desktop/tablet layout or non-mobile-fixed */}
              {isProduct && !isMobileFixed && (
                <div className="bg-blue-900">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={hotspot.product!.thumb}
                      alt={hotspot.product!.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </AspectRatio>
                </div>
              )}
              
              {/* Close Button for Pinned State */}
              {isPinned && onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="absolute top-2 right-2 h-6 w-6 p-0 bg-black/20 hover:bg-black/40 text-white border-white/20 backdrop-blur-sm z-10"
                  aria-label="Close details"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}

              {/* Content section */}
              <div className="p-4 bg-background">
                <div className="space-y-2">
                  {isProduct && (
                    <>
                      <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-foreground">
                        {hotspot.product!.name}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {hotspot.product!.blurb}
                      </p>
                      
                      <p className="text-xs text-muted-foreground/80">
                        SKU: {hotspot.product!.sku}
                      </p>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          asChild 
                          size="sm" 
                          className="flex-1"
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
                        
                        {!isPinned && (
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => {/* Add to favorites logic */}}
                            className="px-3"
                          >
                            Save
                          </Button>
                        )}
                      </div>
                    </>
                  )}

                  {isExperience && (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{hotspot.experience!.icon}</span>
                        <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-foreground">
                          {hotspot.experience!.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-3">
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