import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { AspectRatio } from './ui/aspect-ratio';

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
}

const HotspotTooltip: React.FC<HotspotTooltipProps> = ({ 
  hotspot, 
  isPinned = false, 
  onClose 
}) => {
  // Check if this is a product or experience hotspot
  const isProduct = hotspot.product;
  const isExperience = hotspot.experience;

  return (
    <AnimatePresence>
      <motion.div
        className={`
          absolute z-50 pointer-events-auto
          ${isPinned 
            ? 'bottom-4 right-4 left-4 md:left-auto md:w-96' 
            : 'bottom-4 right-4 w-80 hidden md:block'
          }
        `}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: "spring", duration: 0.3 }}
      >
        <Card className="overflow-hidden shadow-xl border-2 bg-card/95 backdrop-blur-sm group">
          {isProduct && (
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
        </Card>
        
        {/* Mobile-specific tap instruction */}
        {!isPinned && (
          <motion.p
            className="md:hidden text-xs text-muted-foreground text-center mt-2 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Tap the highlighted area to pin this {isProduct ? 'product card' : 'information'}
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default HotspotTooltip;