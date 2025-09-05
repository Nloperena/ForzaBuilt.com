import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import CanisterSystemImage from '@/assets/images/Canister System.png';
import TapeHeroicImage from '@/assets/images/Tape Heroic Image.png';
import OS2CartridgeHeroImage from '@/assets/images/OS2 Cartridge Hero.png';
import RRHandSprayingImage from '@/assets/images/RR Hand Spraying.png';
import { Link } from 'react-router-dom';
import EdgeTrianglesBackground from './common/EdgeTrianglesBackground';
import ImageSkeleton from './common/ImageSkeleton';

interface Product {
  title: string;
  fullTitle: string;
  image: string;
  hoverImage: string;
  color: string;
  slug: string;
  external?: boolean;
  link?: string;
}

const products: Product[] = [
  {
    title: "ADHESIVES",
    fullTitle: "INDUSTRIAL\nADHESIVES",
    image: CanisterSystemImage,
    hoverImage: "/products/brand-logos/product-line-brands-white-bond.svg",
    color: "#f16022",
    slug: "bond"
  },
  {
    title: "SEALANTS",
    fullTitle: "INDUSTRIAL\nSEALANTS",
    image: OS2CartridgeHeroImage,
    hoverImage: "/products/brand-logos/product-line-brands-white-seal.svg",
    color: "#faaf40",
    slug: "seal"
  },
  {
    title: "TAPES",
    fullTitle: "INDUSTRIAL\nTAPES",
    image: TapeHeroicImage,
    hoverImage: "/products/brand-logos/product-line-brands-white-tape.svg",
    color: "#d1181f",
    slug: "tape"
  },
  {
    title: "INDUSTRIAL CLEANING",
    fullTitle: "INDUSTRIAL\nCLEANING",
    image: RRHandSprayingImage,
    hoverImage: "https://ruggedred.com/images/RRMascot+Type-smaller.png",
    color: "#d1181f",
    slug: "ruggedred"
  }
];

const ProductsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [breatheValue, setBreatheValue] = useState(0);
  const [imageLoadedStates, setImageLoadedStates] = useState<boolean[]>(new Array(products.length).fill(false));
  
  // Make the breathing animation half as fast
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      // Breathing is now half as fast
      const value = (Math.sin(Date.now() / 333) + 1) / 2;
      setBreatheValue(value);
      animationFrame = requestAnimationFrame(animate);
    };
    if (hoveredIndex !== null) {
      animate();
    }
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [hoveredIndex]);

  const handleImageLoad = (index: number) => {
    setImageLoadedStates(prev => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };

  const handleImageError = (index: number) => {
    // Mark as loaded even on error to hide skeleton
    handleImageLoad(index);
  };

  return (
          <section className="pt-4 pb-16 bg-gradient-to-b from-[#115B87] to-[#1B3764] text-white relative overflow-hidden">

      
      {/* Edge triangles positioned at left and right viewport edges */}
      <EdgeTrianglesBackground 
        leftImage="/Gradients and Triangles/Small Science Triangles.png"
        rightImage="/Gradients and Triangles/Small Science Triangles 2.png"
        opacity={0.6}
        scale={1.1}
        leftRotation={265}
        rightRotation={295}
        leftFlipH={false}
        rightFlipV={false}
        blendMode="overlay"
      />
      <div className="w-full px-4 max-w-[700px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-3 lg:gap-4 max-w-3xl mx-auto relative z-10">
          {products.map((product, index) => {
            const isHovered = hoveredIndex === index;
            const isTapes = product.title === 'TAPES';
            const isIndustrialCleaning = product.title === 'INDUSTRIAL CLEANING';
            const isTopRow = index < 2; // First two items are top row

            // Subtle, fast breathing effect
            const baseBlur = 20;
            const maxBlur = 30;
            const baseSpread = 15;
            const maxSpread = 20;
            const blur = isHovered ? baseBlur + breatheValue * (maxBlur - baseBlur) : 0;
            const spread = isHovered ? baseSpread + breatheValue * (maxSpread - baseSpread) : 0;

            return (
              product.external && product.link ? (
                <a
                  key={index}
                  href={product.link}
                  className="group"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Card
                    className="border-0 shadow-lg rounded-[2rem] overflow-hidden transition-all duration-100 hover:scale-[1.02] relative hover:bg-transparent z-10 backdrop-blur-xl bg-white/10 border border-white/20"
                    style={{
                      backgroundColor: `${product.color}CC`, // Add transparency
                      transition: 'box-shadow 0.1s linear, background-color 0.3s ease', // super snappy
                      boxShadow: isHovered
                        ? `0 0 ${blur}px ${spread}px ${product.color}, 0 25px 50px -12px rgba(0, 0, 0, 0.25)`
                        : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <div className={`relative aspect-square w-full${isIndustrialCleaning ? ' scale-x-[-1]' : ''}`}>
                      {/* Image Skeleton Loading State */}
                      {!imageLoadedStates[index] && (
                        <ImageSkeleton />
                      )}
                      
                      <motion.div
                        className={`absolute inset-0 ${isTopRow ? 'flex flex-row items-center' : 'flex flex-col justify-end items-center'}${isIndustrialCleaning ? ' scale-x-[-1]' : ''}`}
                        style={{
                          opacity: isHovered ? 0 : 1,
                          zIndex: 1,
                          transition: 'all 0.3s ease-in-out'
                        }}
                      >
                        {isTopRow || index === 2 || index === 3 ? (
                          <>
                            <div className="w-full h-full flex flex-row items-center justify-center">
                              <div className="w-2/3 h-2/3 relative z-10">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain transition-opacity duration-500 ${
                                    imageLoadedStates[index] ? 'opacity-100' : 'opacity-0'
                                  }${index === 1 ? ' transform scale-[2.3] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 ? ' transform scale-[1.43] -translate-x-2/3' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.8) scaleY(1.8) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.43) scaleY(1.43) translateX(2.67%)' } : {})
                                  }}
                                  onLoad={() => handleImageLoad(index)}
                                  onError={() => handleImageError(index)}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))' }}>
                                  {product.fullTitle.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          // Bottom row: check for INDUSTRIAL CLEANING to swap image/text order
                          product.title === "INDUSTRIAL CLEANING" ? (
                            <div className="w-full h-full flex flex-row items-center justify-center">
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
                                  {product.fullTitle.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                </div>
                              </div>
                              <div className="w-2/3 h-2/3 relative z-10">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="w-full h-full object-contain transform scale-[1.43] -translate-x-1/3 scale-x-[-1]"
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))'
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full flex flex-row items-center justify-center flex-row-reverse">
                              <div className="w-2/3 h-2/3 relative z-10">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain${index === 1 ? ' transform scale-[2.3] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 ? ' transform scale-[1.43] -translate-x-2/3' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.8) scaleY(1.8) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.43) scaleY(1.43) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
                                  {product.fullTitle.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </motion.div>
                      <motion.div
                        className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center gap-2${isIndustrialCleaning ? ' scale-x-[-1]' : ''}`}
                        style={{
                          opacity: isHovered ? 1 : 0,
                          zIndex: 2,
                          transition: 'all 0.3s ease-in-out',
                          backgroundColor: '#115B87' // Same as homepage background
                        }}
                      >
                        <img
                          src={product.hoverImage}
                          alt={`${product.title} hover image`}
                          className="w-full object-contain"
                        />
                        <motion.span
                          style={{
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.3s ease-in-out'
                          }}
                        >
                          <Button className="bg-white hover:bg-white/80 text-[#1b3764] rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg">
                            LEARN MORE
                          </Button>
                        </motion.span>
                      </motion.div>
                    </div>
                  </Card>
                </a>
              ) : (
                <Link
                  key={index}
                  to={`/products/${product.slug}`}
                  className="group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Card
                    className="border-0 shadow-lg rounded-[2rem] overflow-hidden transition-all duration-100 hover:scale-[1.02] relative hover:bg-transparent z-10 backdrop-blur-xl bg-white/10 border border-white/20"
                    style={{
                      backgroundColor: `${product.color}CC`, // Add transparency
                      transition: 'box-shadow 0.1s linear, background-color 0.3s ease', // super snappy
                      boxShadow: isHovered
                        ? `0 0 ${blur}px ${spread}px ${product.color}, 0 25px 50px -12px rgba(0, 0, 0, 0.25)`
                        : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <div className={`relative aspect-square w-full${isIndustrialCleaning ? ' scale-x-[-1]' : ''}`}>
                      {/* Image Skeleton Loading State */}
                      {!imageLoadedStates[index] && (
                        <ImageSkeleton />
                      )}
                      
                      <motion.div
                        className={`absolute inset-0 ${isTopRow ? 'flex flex-row items-center' : 'flex flex-col justify-end items-center'}${isIndustrialCleaning ? ' scale-x-[-1]' : ''}`}
                        style={{
                          opacity: isHovered ? 0 : 1,
                          zIndex: 1,
                          transition: 'all 0.3s ease-in-out'
                        }}
                      >
                        {isTopRow || index === 2 || index === 3 ? (
                          <>
                            <div className="w-full h-full flex flex-row items-center justify-center">
                              <div className="w-2/3 h-2/3 relative z-10">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain transition-opacity duration-500 ${
                                    imageLoadedStates[index] ? 'opacity-100' : 'opacity-0'
                                  }${index === 1 ? ' transform scale-[2.3] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 ? ' transform scale-[1.43] -translate-x-2/3' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.8) scaleY(1.8) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.43) scaleY(1.43) translateX(16.67%)' } : {})
                                  }}
                                  onLoad={() => handleImageLoad(index)}
                                  onError={() => handleImageError(index)}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))' }}>
                                  {product.fullTitle.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          // Bottom row: check for INDUSTRIAL CLEANING to swap image/text order
                          product.title === "INDUSTRIAL CLEANING" ? (
                            <div className="w-full h-full flex flex-row items-center justify-center">
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
                                  {product.fullTitle.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                </div>
                              </div>
                              <div className="w-2/3 h-2/3 relative z-10">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="w-full h-full object-contain transform scale-[1.43] -translate-x-1/3 scale-x-[-1]"
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))'
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full flex flex-row items-center justify-center flex-row-reverse">
                              <div className="w-2/3 h-2/3 relative z-10">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain${index === 1 ? ' transform scale-[2.3] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 ? ' transform scale-[1.43] -translate-x-2/3' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.8) scaleY(1.8) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.43) scaleY(1.43) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
                                  {product.fullTitle.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </motion.div>
                      <motion.div
                        className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center gap-2${isIndustrialCleaning ? ' scale-x-[-1]' : ''}`}
                        style={{
                          opacity: isHovered ? 1 : 0,
                          zIndex: 2,
                          transition: 'all 0.3s ease-in-out',
                          backgroundColor: '#115B87' // Same as homepage background
                        }}
                      >
                        <img
                          src={product.hoverImage}
                          alt={`${product.title} hover image`}
                          className="w-full object-contain"
                        />
                        <motion.span
                          style={{
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.3s ease-in-out'
                          }}
                        >
                          <Button className="bg-white hover:bg-white/80 text-[#1b3764] rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg">
                            LEARN MORE
                          </Button>
                        </motion.span>
                      </motion.div>
                    </div>
                  </Card>
                </Link>
              )
            );
          })}
        </div>
      </div>

      {/* Spacer above footer */}
      <div className="py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16"></div>
    </section>
  );
};

export default ProductsSection; 

