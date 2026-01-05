import React, { useState, useEffect, useRef } from 'react';
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
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

  // Refs for image elements to check if already loaded (cached)
  const imgRef = useRef<HTMLImageElement>(null);

  // Determine correct image URL on mount/resize
  useEffect(() => {
    const updateImage = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 768 && mobileImageUrl) {
        setCurrentImageUrl(mobileImageUrl);
      } else {
        setCurrentImageUrl(imageUrl);
      }
    };

    updateImage();
    window.addEventListener('resize', updateImage);
    return () => window.removeEventListener('resize', updateImage);
  }, [imageUrl, mobileImageUrl]);

  // Check if image is already cached
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setImageLoaded(true);
    }
  }, [currentImageUrl]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.warn('⚠️ Image failed to load, trying fallback');
    const target = e.currentTarget;
    if (target.src.includes('.webp')) {
      target.src = target.src.replace('.webp', '.jpg');
    } else {
      setImageLoaded(true);
    }
  };

  return (
    <>
      {/* Sticky Hero Image Background Section */}
      <section className="sticky top-0 h-[60vh] md:h-[88vh] overflow-hidden bg-black/5 md:pt-12 2xl:pt-0" style={{ zIndex: 1 }}>
        {/* Image Skeleton Loading State */}
        {!imageLoaded && (
          <ImageSkeleton className="w-full h-full" />
        )}
        
        <motion.img
          ref={imgRef}
          key={currentImageUrl}
          src={currentImageUrl}
          alt={`${productCategory} Category Hero`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="eager"
          fetchPriority="high"
          style={{ 
            zIndex: 1,
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            minWidth: '100%',
            minHeight: '100%'
          }}
        />

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

