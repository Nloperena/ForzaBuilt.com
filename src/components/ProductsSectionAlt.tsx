import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { useLandscapeValues } from '@/hooks/use-landscape';
import { useGradientMode } from '@/contexts/GradientModeContext';
import { getFontSize } from '@/styles/typography';

import ImageSkeleton from './common/ImageSkeleton';
import EdgeTrianglesBackground from './common/EdgeTrianglesBackground';

interface ProductCategory {
  title: string;
  slug: string;
  image: string;
  logo: string;
  description: string;
}

const productCategories: ProductCategory[] = [
  {
    title: "Industrial Adhesives",
    slug: "bond",
    image: "/images/homepage-heroes/Forza Bond Hero Shot.jpg",
    logo: "/products/brand-logos/product-line-brands-white-bond.svg",
    description: "A FORCE TO BE RECKONED WITH"
  },
  {
    title: "Industrial Sealants",
    slug: "seal",
    image: "/images/homepage-heroes/Forza Seal Hero Shot.jpg",
    logo: "/products/brand-logos/product-line-brands-white-seal.svg",
    description: "A FORCE TO BE RECKONED WITH"
  },
  {
    title: "Industrial Tapes",
    slug: "tape",
    image: "/images/homepage-heroes/Forza Tape Hero Shot.jpg",
    logo: "/products/brand-logos/product-line-brands-white-tape.svg",
    description: "A FORCE TO BE RECKONED WITH"
  },
  {
    title: "Industrial Cleaners",
    slug: "ruggedred",
    image: "/images/homepage-heroes/Forza-Cleaners-Hero-Shot1.jpg",
    logo: "/products/brand-logos/product-line-brands-white-ruggedred.svg",
    description: "A FORCE TO BE RECKONED WITH"
  }
];

function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const ProductsSectionAlt = () => {
  const { mode, getGradientClasses, getTextClasses, getTextSecondaryClasses } = useGradientMode();
  const [imageLoadedStates, setImageLoadedStates] = useState<boolean[]>(new Array(productCategories.length).fill(false));
  
  // Landscape optimization values
  const { isLandscape } = useLandscapeValues();

  const handleImageLoad = (index: number) => {
    setImageLoadedStates(prev => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };

  return (
    <section className={`pt-2 md:pt-3 lg:pt-4 ${
      mode === 'light2'
        ? 'bg-white'
        : mode === 'light'
          ? 'bg-[#e8e8e8]'
          : `bg-gradient-to-b from-[#2c476e] to-[#81899f]`
    } w-full relative z-20 overflow-x-hidden`}>

      {/* Edge triangles positioned at left and right viewport edges */}
      {/* Hide triangles for light2 mode */}
      {mode !== 'light2' && (
        <EdgeTrianglesBackground
          leftImage="/Gradients and Triangles/Small Science Triangles 2.png"
          rightImage="/Gradients and Triangles/Small Science Triangles.png"
          opacity={0.6}
          scale={1.1}
          leftRotation={265}
          rightRotation={295}
          leftFlipH={false}
          rightFlipV={false}
          blendMode="overlay"
        />
      )}
      
      {/* Products Header Section */}
      {mode === 'light2' ? (
        <div className="w-full bg-white pt-4 md:pt-6 px-4 mx-auto max-w-7xl relative z-10">
          <div className="text-center relative z-10">
            <h2
              className="font-regular text-[#2c476e] mb-6 sm:mb-8 leading-tight font-poppins"
              style={getFontSize('sectionHeading')}
            >
              Choose a Product Category
            </h2>
          </div>
        </div>
      ) : (
        <div className="w-full pt-4 md:pt-6 px-4 mx-auto max-w-7xl relative z-10">
          <div className="text-center relative z-10">
            <h2
              className={`font-black ${
                mode === 'light'
                  ? 'text-[#2c476e]'
                  : getTextClasses()
              } mb-1 sm:mb-2 md:mb-4 font-kallisto leading-snug break-words block`}
              style={getFontSize('sectionHeading')}
            >
              Choose a Product Category
            </h2>
          </div>
        </div>
      )}

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 max-w-full overflow-x-hidden">
        
        {/* Mobile & iPad: 2 column grid with desktop-style cards */}
        <div className="block md:hidden">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto">
            {productCategories.map((category: ProductCategory, index: number) => (
              <Link 
                key={category.slug}
                  to={`/products/${category.slug}`}
                className="block w-full h-full"
                >
                  <Card
                  className="aspect-[6/4] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 group cursor-pointer w-full backdrop-blur-xl bg-white border-0 shadow-lg text-white"
                    style={{
                    backgroundImage: 'none'
                    }}
                  >
                  <div className="relative w-full h-full overflow-hidden">
                      {/* Image Skeleton Loading State */}
                      {!imageLoadedStates[index] && (
                        <ImageSkeleton />
                      )}
                      
                      <img
                        src={category.image}
                        alt={category.title}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                          imageLoadedStates[index] ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(index)}
                        onError={(e) => {
                          console.error(`Failed to load image for ${category.title}:`, category.image);
                          // Don't mark as loaded on error - keep showing skeleton or fallback
                        }}
                      style={{
                        objectPosition: 'center center'
                      }}
                      />
                    </div>
                  </Card>
                </Link>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout with 2x2 grid */}
        <div className="sr-only md:not-sr-only md:flex w-full flex-col items-center">
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-10 w-full max-w-[1000px] lg:max-w-[1100px] xl:max-w-[1200px] mb-3 md:mb-4 mx-auto py-2 sm:py-3 md:py-3 lg:py-4">
            {productCategories.map((category: ProductCategory, index: number) => (
              <div
                key={category.slug}
                className="block"
              >
                <Link 
                  to={`/products/${category.slug}`}
                  className="block w-full h-full"
                >
                  <Card
                    className="aspect-[6/4] rounded-xl lg:rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 group cursor-pointer w-full backdrop-blur-xl bg-white border-0 shadow-lg text-white"
                    style={{
                      backgroundImage: 'none'
                    }}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      {/* Image Skeleton Loading State */}
                      {!imageLoadedStates[index] && (
                        <ImageSkeleton />
                      )}
                      
                      <img
                        src={category.image}
                        alt={category.title}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                          imageLoadedStates[index] ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(index)}
                        onError={(e) => {
                          console.error(`Failed to load image for ${category.title}:`, category.image);
                          // Don't mark as loaded on error - keep showing skeleton or fallback
                        }}
                        style={{
                          objectPosition: 'center center'
                        }}
                      />
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle afterthought text */}
        <div className="w-full text-center mt-4 md:mt-6 lg:mt-6 pb-8 md:pb-12 lg:pb-14">
          <p className="text-base sm:text-lg lg:text-xl font-poppins text-gray-600 font-normal md:hidden">
            Don't see your product?{' '}
            <a
              href="/contact"
              className="text-[#F2611D] hover:text-[#F2611D]/80 font-medium transition-colors hover:underline underline-offset-4"
            >
              Contact us
            </a>
            {''}
          </p>
          <p className="hidden md:block font-poppins text-gray-600 font-normal" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
            Don't see your product?{' '}
            <a
              href="/contact"
              className="text-[#F2611D] hover:text-[#F2611D]/80 font-medium transition-colors hover:underline underline-offset-4"
            >
              Contact us
            </a>
            {''}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsSectionAlt;

