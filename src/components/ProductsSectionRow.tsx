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
import { useGradientMode } from '@/contexts/GradientModeContext';

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

const ProductsSectionRow = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { mode, getGradientClasses, getTextClasses, getTextSecondaryClasses } = useGradientMode();

  return (
    <section className={`pt-16 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-28 pb-16 bg-gradient-to-b ${
      mode === 'neutral' ? 'from-[#1B3764] to-[#115B87]' : getGradientClasses()
    } ${getTextClasses()} relative overflow-hidden`}>
      {/* Edge triangles positioned at left and right viewport edges */}
      <EdgeTrianglesBackground 
        leftImage="/Gradients and Triangles/Small Science Triangles.png"
        rightImage="/Gradients and Triangles/Small Science Triangles 2.png"
        opacity={0.6}
        scale={1.1}
        leftRotation={15}
        rightRotation={295}
        leftFlipH={false}
        rightFlipV={false}
        blendMode="overlay"
      />
      
      <div className="w-full px-4 mx-auto max-w-7xl">
        <div className="text-center relative z-10">
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black ${getTextClasses()} mb-1 sm:mb-2 md:mb-4 font-kallisto leading-none break-words block`}>
            Our Products
          </h2>
        </div>
        <div className="text-center relative z-10">
          <p className={`text-xs sm:text-base md:text-lg mb-6 sm:mb-8 font-light max-w-xl mx-auto ${getTextSecondaryClasses()}`}>
            We offer the best performing and widest range of adhesive, sealant, specialty tape, and industrial cleaning solutions, including customization and environmentally friendly technologies. If we don't have it, we'll make it custom for you!
          </p>
        </div>
        
        {/* Desktop Row Layout - hidden on mobile */}
        <div className="hidden md:flex flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 justify-center items-center relative z-10">
          {products.map((product, index) => {
            const isHovered = hoveredIndex === index;
            const isTapes = product.title === 'TAPES';
            const isIndustrialCleaning = product.title === 'INDUSTRIAL CLEANING';
            const isTopRow = index < 2; // First two items are top row



            return (
              product.external && product.link ? (
                <a
                  key={index}
                  href={product.link}
                  className="group flex-shrink-0"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Card
                    className="border-0 rounded-[2rem] overflow-hidden transition-all duration-300 hover:scale-[1.02] relative z-10 w-96 h-96 flex-shrink-0"
                    style={{
                      backgroundColor: isHovered ? 'transparent' : product.color,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <div className={`relative aspect-square w-full overflow-hidden rounded-[2rem]${isIndustrialCleaning ? ' scale-x-[-1]' : ''}`}>
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
                            <div className="w-full h-full flex flex-row items-center justify-center overflow-hidden rounded-[2rem]">
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-black text-white font-kallisto text-center leading-tight" style={{ textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)' }}>
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
                            <div className="w-full h-full flex flex-row items-center justify-center overflow-hidden rounded-[2rem]">
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
                                  {product.fullTitle.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                </div>
                              </div>
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full flex flex-row-reverse items-center justify-center overflow-hidden rounded-[2rem]">
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
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
                          background: mode === 'light' ? 'linear-gradient(135deg, #1B3764 0%, #115B87 100%)' : 'transparent',
                          backdropFilter: mode === 'light' ? 'none' : 'blur(20px)',
                          border: mode === 'light' ? '1px solid rgba(27, 55, 100, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: mode === 'light' ? '0 8px 32px rgba(27, 55, 100, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
                          <Button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg border border-[#F2611D]">
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
                  className="group flex-shrink-0"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Card
                    className="border-0 rounded-[2rem] overflow-hidden transition-all duration-300 hover:scale-[1.02] relative z-10 w-96 h-96 flex-shrink-0"
                    style={{
                      backgroundColor: isHovered ? 'transparent' : product.color,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <div className={`relative aspect-square w-full overflow-hidden rounded-[2rem]${isIndustrialCleaning ? ' scale-x-[-1]' : ''}`}>
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
                            <div className="w-full h-full flex flex-row items-center justify-center overflow-hidden rounded-[2rem]">
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-black text-white font-kallisto text-center leading-tight" style={{ textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)' }}>
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
                            <div className="w-full h-full flex flex-row items-center justify-center overflow-hidden rounded-[2rem]">
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
                                  {product.fullTitle.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                </div>
                              </div>
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full flex flex-row-reverse items-center justify-center overflow-hidden rounded-[2rem]">
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
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
                          background: mode === 'light' ? 'linear-gradient(135deg, #1B3764 0%, #115B87 100%)' : 'transparent',
                          backdropFilter: mode === 'light' ? 'none' : 'blur(20px)',
                          border: mode === 'light' ? '1px solid rgba(27, 55, 100, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: mode === 'light' ? '0 8px 32px rgba(27, 55, 100, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
                          <Button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg border border-[#F2611D]">
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

        {/* Mobile Grid Layout - hidden on desktop */}
        <div className="md:hidden grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 max-w-3xl mx-auto relative z-10">
          {products.map((product, index) => {
            const isHovered = hoveredIndex === index;
            const isTapes = product.title === 'TAPES';
            const isIndustrialCleaning = product.title === 'INDUSTRIAL CLEANING';
            const isTopRow = index < 2; // First two items are top row



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
                    className="border-0 shadow-lg rounded-[2rem] overflow-hidden transition-all duration-100 hover:scale-[1.02] relative hover:bg-transparent z-10"
                    style={{
                      backgroundColor: isHovered ? 'transparent' : product.color,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <div className={`relative aspect-square w-full overflow-hidden rounded-[2rem]${isIndustrialCleaning ? ' scale-x-[-1]' : ''}`}>
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
                            <div className="w-full h-full flex flex-row items-center justify-center overflow-hidden rounded-[2rem]">
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-black text-white font-kallisto text-center leading-tight" style={{ textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)' }}>
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
                            <div className="w-full h-full flex flex-row items-center justify-center overflow-hidden rounded-[2rem]">
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
                                  {product.fullTitle.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                </div>
                              </div>
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full flex flex-row-reverse items-center justify-center overflow-hidden rounded-[2rem]">
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
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
                          background: mode === 'light' ? 'linear-gradient(135deg, #1B3764 0%, #115B87 100%)' : 'transparent',
                          backdropFilter: mode === 'light' ? 'none' : 'blur(20px)',
                          border: mode === 'light' ? '1px solid rgba(27, 55, 100, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: mode === 'light' ? '0 8px 32px rgba(27, 55, 100, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
                          <Button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg border border-[#F2611D]">
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
                    className="border-0 shadow-lg rounded-[2rem] overflow-hidden transition-all duration-100 hover:scale-[1.02] relative hover:bg-transparent z-10"
                    style={{
                      backgroundColor: isHovered ? 'transparent' : product.color,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <div className={`relative aspect-square w-full overflow-hidden rounded-[2rem]${isIndustrialCleaning ? ' scale-x-[-1]' : ''}`}>
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
                            <div className="w-full h-full flex flex-row items-center justify-center overflow-hidden rounded-[2rem]">
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-black text-white font-kallisto text-center leading-tight" style={{ textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)' }}>
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
                            <div className="w-full h-full flex flex-row items-center justify-center overflow-hidden rounded-[2rem]">
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-3xl lg:text-4xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
                                  {product.fullTitle.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                </div>
                              </div>
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full flex flex-row-reverse items-center justify-center overflow-hidden rounded-[2rem]">
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-contain${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
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
                          background: mode === 'light' ? 'linear-gradient(135deg, #1B3764 0%, #115B87 100%)' : 'transparent',
                          backdropFilter: mode === 'light' ? 'none' : 'blur(20px)',
                          border: mode === 'light' ? '1px solid rgba(27, 55, 100, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: mode === 'light' ? '0 8px 32px rgba(27, 55, 100, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
                          <Button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg border border-[#F2611D]">
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

export default ProductsSectionRow;
