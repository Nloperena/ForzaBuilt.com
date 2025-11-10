import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import CanisterSystemImage from '@/assets/images/Canister System.png';
import TapeHeroicImage from '@/assets/images/Tape Heroic Image.png';
import OS2CartridgeHeroImage from '@/assets/images/OS2 Cartridge Hero.png';
import RRHandSprayingImage from '@/assets/images/RR Hand Spraying.png';
import { Link } from 'react-router-dom';
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
    <section className={`pt-8 pb-12 md:pt-10 md:pb-14 ${
      mode === 'light' || mode === 'light2'
        ? 'bg-white'
        : mode === 'neutral' 
          ? 'bg-gradient-to-b from-[#1B3764] to-[#115B87]'
          : `bg-gradient-to-b ${getGradientClasses()}`
    } ${
      mode === 'light' || mode === 'light2'
        ? 'text-[#1B3764]'
        : getTextClasses()
    } relative overflow-hidden`}>
      {/* Edge triangles positioned at left and right viewport edges */}
      
      <div className="w-full px-4 mx-auto max-w-7xl">
        <div className="text-center relative z-10">
          <h2
            className={`font-black ${
              mode === 'light' || mode === 'light2'
                ? 'text-[#1B3764]'
                : getTextClasses()
            } mb-1 sm:mb-2 md:mb-4 font-kallisto leading-none break-words block`}
            style={{
              fontSize: 'clamp(32px, 3.2vw + 0.6rem, 64px)',
              lineHeight: 1.05
            }}
          >
            Our Products
          </h2>
        </div>
        
        {/* Desktop Row Layout - hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:flex 2xl:flex-row gap-4 md:gap-5 lg:gap-6 xl:gap-8 justify-center items-start relative z-10 max-w-6xl mx-auto lg:h-[40vh]">
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
                  className="group w-full aspect-square"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Card
                    className="shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 aspect-square group cursor-pointer w-full h-full text-white backdrop-blur-xl bg-gradient-to-b from-[#1B3764] to-[#115B87] relative z-10"
                    style={{
                      backgroundColor: isHovered ? 'transparent' : product.color,
                      boxShadow: 'rgba(0, 0, 0, 0.6) 0px 4px 8px',
                      backgroundImage: 'none'
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
                                  className={`w-full h-full object-cover${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-white font-kallisto text-center leading-tight" style={{ textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)' }}>
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
                                <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
                                  {product.fullTitle.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                </div>
                              </div>
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-cover${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
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
                                  className={`w-full h-full object-cover${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
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
                        className={`absolute inset-0 flex flex-col items-center justify-center p-3 md:p-4 text-center gap-2${isIndustrialCleaning ? ' scale-x-[-1]' : ''}`}
                        style={{
                          opacity: isHovered ? 1 : 0,
                          zIndex: 2,
                          transition: 'all 0.3s ease-in-out',
                          background: mode === 'light' || mode === 'light2' ? 'linear-gradient(135deg, #1B3764 0%, #115B87 100%)' : 'transparent',
                          backdropFilter: mode === 'light' || mode === 'light2' ? 'none' : 'blur(20px)',
                          border: mode === 'light' || mode === 'light2' ? '1px solid rgba(27, 55, 100, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: mode === 'light' || mode === 'light2' ? '0 8px 32px rgba(27, 55, 100, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
                          <Button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-3 sm:px-5 md:px-4 py-1.5 sm:py-2.5 md:py-2 text-xs sm:text-base md:text-sm border border-[#F2611D]">
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
                  className="group w-full aspect-square"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Card
                    className="shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 aspect-square group cursor-pointer w-full h-full text-white backdrop-blur-xl bg-gradient-to-b from-[#1B3764] to-[#115B87] relative z-10"
                    style={{
                      backgroundColor: isHovered ? 'transparent' : product.color,
                      boxShadow: 'rgba(0, 0, 0, 0.6) 0px 4px 8px',
                      backgroundImage: 'none'
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
                                  className={`w-full h-full object-cover${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-white font-kallisto text-center leading-tight" style={{ textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)' }}>
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
                                <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
                                  {product.fullTitle.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                </div>
                              </div>
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-cover${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
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
                                  className={`w-full h-full object-cover${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
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
                        className={`absolute inset-0 flex flex-col items-center justify-center p-3 md:p-4 text-center gap-2${isIndustrialCleaning ? ' scale-x-[-1]' : ''}`}
                        style={{
                          opacity: isHovered ? 1 : 0,
                          zIndex: 2,
                          transition: 'all 0.3s ease-in-out',
                          background: mode === 'light' || mode === 'light2' ? 'linear-gradient(135deg, #1B3764 0%, #115B87 100%)' : 'transparent',
                          backdropFilter: mode === 'light' || mode === 'light2' ? 'none' : 'blur(20px)',
                          border: mode === 'light' || mode === 'light2' ? '1px solid rgba(27, 55, 100, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: mode === 'light' || mode === 'light2' ? '0 8px 32px rgba(27, 55, 100, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
                          <Button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-3 sm:px-5 md:px-4 py-1.5 sm:py-2.5 md:py-2 text-xs sm:text-base md:text-sm border border-[#F2611D]">
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
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 px-2 sm:px-4 relative z-10">
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
                    className="shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 aspect-square md:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[1/1] group cursor-pointer w-full text-white backdrop-blur-xl bg-gradient-to-b from-[#1B3764] to-[#115B87] relative hover:bg-transparent z-10"
                    style={{
                      backgroundColor: isHovered ? 'transparent' : product.color,
                      boxShadow: 'rgba(0, 0, 0, 0.6) 0px 4px 8px',
                      backgroundImage: 'none'
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
                                  className={`w-full h-full object-cover${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-white font-kallisto text-center leading-tight" style={{ textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)' }}>
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
                                <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
                                  {product.fullTitle.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                </div>
                              </div>
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-cover${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
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
                                  className={`w-full h-full object-cover${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
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
                        className={`absolute inset-0 flex flex-col items-center justify-center p-3 md:p-4 text-center gap-2${isIndustrialCleaning ? ' scale-x-[-1]' : ''}`}
                        style={{
                          opacity: isHovered ? 1 : 0,
                          zIndex: 2,
                          transition: 'all 0.3s ease-in-out',
                          background: mode === 'light' || mode === 'light2' ? 'linear-gradient(135deg, #1B3764 0%, #115B87 100%)' : 'transparent',
                          backdropFilter: mode === 'light' || mode === 'light2' ? 'none' : 'blur(20px)',
                          border: mode === 'light' || mode === 'light2' ? '1px solid rgba(27, 55, 100, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: mode === 'light' || mode === 'light2' ? '0 8px 32px rgba(27, 55, 100, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
                          <Button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-3 sm:px-5 md:px-4 py-1.5 sm:py-2.5 md:py-2 text-xs sm:text-base md:text-sm border border-[#F2611D]">
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
                    className="shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 aspect-square md:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[1/1] group cursor-pointer w-full text-white backdrop-blur-xl bg-gradient-to-b from-[#1B3764] to-[#115B87] relative hover:bg-transparent z-10"
                    style={{
                      backgroundColor: isHovered ? 'transparent' : product.color,
                      boxShadow: 'rgba(0, 0, 0, 0.6) 0px 4px 8px',
                      backgroundImage: 'none'
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
                                  className={`w-full h-full object-cover${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-white font-kallisto text-center leading-tight" style={{ textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)' }}>
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
                                <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
                                  {product.fullTitle.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                  ))}
                                </div>
                              </div>
                              <div className="w-full h-full relative z-10 overflow-hidden rounded-[2rem]">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className={`w-full h-full object-cover${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
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
                                  className={`w-full h-full object-cover${index === 0 ? ' transform scale-[1.2] -translate-x-1/3' : ''}${index === 1 ? ' transform scale-[1.8] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 2 && index !== 0 ? ' transform scale-[1.2] -translate-x-2/3' : ''}${index === 3 ? ' scale-x-[-1]' : ''}`}
                                  style={{
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                    ...(index === 2 ? { transform: 'scaleX(-1.4) scaleY(1.4) translateX(-5.6667%)' } : {}),
                                    ...(index === 3 ? { transform: 'scaleX(1.2) scaleY(1.2) translateX(16.67%)' } : {})
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-white font-kallisto text-center leading-tight" style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.3))" }}>
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
                        className={`absolute inset-0 flex flex-col items-center justify-center p-3 md:p-4 text-center gap-2${isIndustrialCleaning ? ' scale-x-[-1]' : ''}`}
                        style={{
                          opacity: isHovered ? 1 : 0,
                          zIndex: 2,
                          transition: 'all 0.3s ease-in-out',
                          background: mode === 'light' || mode === 'light2' ? 'linear-gradient(135deg, #1B3764 0%, #115B87 100%)' : 'transparent',
                          backdropFilter: mode === 'light' || mode === 'light2' ? 'none' : 'blur(20px)',
                          border: mode === 'light' || mode === 'light2' ? '1px solid rgba(27, 55, 100, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: mode === 'light' || mode === 'light2' ? '0 8px 32px rgba(27, 55, 100, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
                          <Button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-3 sm:px-5 md:px-4 py-1.5 sm:py-2.5 md:py-2 text-xs sm:text-base md:text-sm border border-[#F2611D]">
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
      <div className="py-6 sm:py-8 md:py-10 lg:py-12" style={{ padding: '0 1rem' }}></div>
    </section>
  );
};

export default ProductsSectionRow;
