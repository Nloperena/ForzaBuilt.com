import React, { useState, useEffect } from 'react';
import ImageSkeleton from '../common/ImageSkeleton';
import { motion } from 'framer-motion';

interface StickyProductHeroImageSectionProps {
  imageUrl: string;
  mobileImageUrl?: string;
  productCategory: string;
  children?: React.ReactNode;
}

const StickyProductHeroImageSection: React.FC<StickyProductHeroImageSectionProps> = ({ 
  imageUrl,
  mobileImageUrl,
  productCategory,
  children 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!imageLoaded) {
        console.warn('Product hero image took too long to load, showing fallback');
        setImageLoaded(true);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [imageLoaded]);

  const handleImageLoad = () => {
    console.log('Product hero image loaded successfully');
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.warn('Product hero image failed to load, showing fallback');
    setImageLoaded(true);
  };

  return (
    <>
      {/* Sticky Hero Image Background Section */}
      <section className="sticky top-0 h-[60vh] md:h-screen overflow-hidden bg-black/5 md:pt-12 2xl:pt-0" style={{ zIndex: 1 }}>
        {/* Image Skeleton Loading State */}
        {!imageLoaded && (
          <ImageSkeleton className="w-full h-full" />
        )}
        
        {/* Background Hero Image - Mobile */}
        {(mobileImageUrl || imageUrl) && (
          <motion.img
            src={mobileImageUrl || imageUrl}
            alt={`${productCategory} Category Hero`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 md:hidden ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ 
              zIndex: 1,
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%'
            }}
          />
        )}
        
        {/* Background Hero Image - Desktop */}
        {imageUrl && (
          <motion.img
            src={imageUrl}
            alt={`${productCategory} Category Hero`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 hidden md:block ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ 
              zIndex: 1,
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%'
            }}
          />
        )}

        {/* Fallback background - always visible */}
        <div className="absolute inset-0 bg-black/5" style={{ zIndex: 0 }} />

        {/* Hidden Text Content (for accessibility & animations) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 0, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          style={{ zIndex: 2 }}
        >
          <div className="text-white relative z-20 text-center">
            <h1 className="sr-only">
              {productCategory?.charAt(0).toUpperCase() + productCategory?.slice(1).toLowerCase()}
            </h1>
            <p className="sr-only">
              Discover our premium {productCategory?.toLowerCase()} solutions engineered for performance and reliability across all industries.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Content that will slide over the sticky hero image background */}
      <div className="relative pointer-events-auto" style={{ zIndex: 10 }}>
        {children}
      </div>
    </>
  );
};

export default StickyProductHeroImageSection;

