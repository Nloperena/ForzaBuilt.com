import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SplitText from './SplitText';

// Import product images
import canisterSystem from '@/assets/images/Canister System.png';
import os2Cartridge from '@/assets/images/OS2 Cartridge Hero.png';
import rrHandSpraying from '@/assets/images/RR Hand Spraying.png';
import tapeHeroic from '@/assets/images/Tape Heroic Image.png';

const products = [
  {
    title: "ADHESIVES",
    fullTitle: "INDUSTRIAL ADHESIVES",
    image: canisterSystem,
    hoverImage: "https://forzabuilt.com/wp-content/uploads/2023/05/product-line-brands-white-bond.svg",
    color: "#f16022",
    slug: "adhesives"
  },
  {
    title: "SEALANTS",
    fullTitle: "INDUSTRIAL SEALANTS",
    image: os2Cartridge,
    hoverImage: "https://forzabuilt.com/wp-content/uploads/2023/05/product-line-brands-white-seal.svg",
    color: "#faaf40",
    slug: "sealants"
  },
  {
    title: "INDUSTRIAL CLEANING",
    fullTitle: "INDUSTRIAL CLEANING",
    image: rrHandSpraying,
    hoverImage: "https://ruggedred.com/images/RRMascot+Type-smaller.png",
    color: "#e53935",
    external: true,
    link: "https://ruggedred.com/"
  },
  {
    title: "TAPES",
    fullTitle: "INDUSTRIAL TAPES",
    image: tapeHeroic,
    hoverImage: "https://forzabuilt.com/wp-content/uploads/2023/05/product-line-brands-white-tape.svg",
    color: "#d1181f",
    slug: "tapes"
  }
];

const ProductsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [breatheValue, setBreatheValue] = useState(0);
  
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

  return (
    <section className="py-16 bg-[#1b3764] text-white">
      <div className="w-full px-4 max-w-[1200px] mx-auto">
        <div className="text-center">
          <SplitText
            text="Our Products"
            className="text-5xl md:text-8xl font-extrabold text-white mb-4 font-kallisto"
            splitType="words"
            delay={50}
          />
        </div>
        <div className="text-center">
          <SplitText
            text="We offer the best performing and widest range of adhesive, sealant, specialty tape, and industrial cleaning solutions, including customization and environmentally friendly technologies. If we don't have it, we'll make it custom for you!"
            className="text-lg mb-8 font-light max-w-4xl mx-auto"
            splitType="words"
            delay={10}
            duration={0.4}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {(() => {
            // Indices: 0 = ADHESIVES, 1 = SEALANTS, 2 = INDUSTRIAL CLEANING, 3 = TAPES
            // Desired order: 0, 1, 3, 2
            const renderOrder = [0, 1, 3, 2];
            return renderOrder.map((i) => {
              const product = products[i];
              const index = i;
              const isHovered = hoveredIndex === index;
              const isTapes = product.title === 'TAPES';
              const isTopRow = renderOrder.indexOf(i) < 2; // First two items are top row in the grid

              // Subtle, fast breathing effect
              const baseBlur = 20;
              const maxBlur = 30;
              const baseSpread = 15;
              const maxSpread = 20;
              const blur = isHovered ? baseBlur + breatheValue * (maxBlur - baseBlur) : 0;
              const spread = isHovered ? baseSpread + breatheValue * (maxSpread - baseSpread) : 0;

              return (
                product.external ? (
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
                      className="border-0 shadow-lg rounded-[2rem] overflow-hidden transition-all duration-100 hover:scale-[1.02] relative hover:bg-transparent"
                      style={{
                        backgroundColor: product.color,
                        transition: 'box-shadow 0.1s linear', // super snappy
                        boxShadow: isHovered
                          ? `0 0 ${blur}px ${spread}px ${product.color}`
                          : 'none',
                      }}
                    >
                      <div className={`relative aspect-square w-full${isTapes ? ' scale-x-[-1]' : ''}`}>
                        <motion.div
                          className={`absolute inset-0 ${isTopRow ? 'flex flex-row items-center' : 'flex flex-col justify-end items-center'}${isTapes ? ' scale-x-[-1]' : ''}`}
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
                                    className={`w-full h-full object-contain${index === 1 ? ' transform scale-[2.3] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 3 ? ' transform scale-[1.43] -translate-x-2/3' : ''}`}
                                    style={{
                                      pointerEvents: 'none',
                                      filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                      ...(index === 3 ? { transform: 'scaleX(-1.8) scaleY(1.8) translateX(-5.6667%)' } : {}),
                                      ...(index === 2 ? { transform: 'scaleX(1.43) scaleY(1.43) translateX(2.67%)' } : {})
                                    }}
                                  />
                                </div>
                                <div className={`absolute inset-0 z-10 flex items-center ${index === 2 || index === 3 ? 'justify-end pr-16' : 'justify-start pl-16'}`}>
                                  <SplitText
                                    text={product.fullTitle}
                                    className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-kallisto text-center drop-shadow-2xl"
                                    splitType="words"
                                    delay={50}
                                  />
                                </div>
                              </div>
                            </>
                          ) : (
                            // Bottom row: check for INDUSTRIAL CLEANING to swap image/text order
                            product.title === "INDUSTRIAL CLEANING" ? (
                              <div className="w-full h-full flex flex-row items-center justify-center">
                                <div className="absolute inset-0 z-10 flex items-center justify-start pl-16">
                                  <SplitText
                                    text={product.fullTitle}
                                    className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-kallisto text-center drop-shadow-2xl"
                                    splitType="words"
                                    delay={50}
                                  />
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
                                    className={`w-full h-full object-contain${index === 1 ? ' transform scale-[2.3] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 3 ? ' transform scale-[1.43] -translate-x-2/3' : ''}`}
                                    style={{
                                      pointerEvents: 'none',
                                      filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                      ...(index === 3 ? { transform: 'scaleX(-1.8) scaleY(1.8) translateX(-5.6667%)' } : {}),
                                      ...(index === 2 ? { transform: 'scaleX(1.43) scaleY(1.43) translateX(16.67%)' } : {})
                                    }}
                                  />
                                </div>
                                <div className={`absolute inset-0 z-10 flex items-center ${index === 2 || index === 3 ? 'justify-end pr-16' : 'justify-start pl-16'}`}>
                                  <SplitText
                                    text={product.fullTitle}
                                    className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-kallisto text-center drop-shadow-2xl"
                                    splitType="words"
                                    delay={50}
                                  />
                                </div>
                              </div>
                            )
                          )}
                        </motion.div>
                        <motion.div
                          className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center gap-2${isTapes ? ' scale-x-[-1]' : ''}`}
                          style={{
                            opacity: isHovered ? 1 : 0,
                            zIndex: 2,
                            transition: 'all 0.3s ease-in-out',
                            backgroundColor: '#1b3764' // Same as homepage background
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
                            <Button className="bg-white hover:bg-white/80 text-[#1b3764] rounded-full px-8 py-4 text-xl">
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
                      className="border-0 shadow-lg rounded-[2rem] overflow-hidden transition-all duration-100 hover:scale-[1.02] relative hover:bg-transparent"
                      style={{
                        backgroundColor: product.color,
                        transition: 'box-shadow 0.1s linear', // super snappy
                        boxShadow: isHovered
                          ? `0 0 ${blur}px ${spread}px ${product.color}`
                          : 'none',
                      }}
                    >
                      <div className={`relative aspect-square w-full${isTapes ? ' scale-x-[-1]' : ''}`}>
                        <motion.div
                          className={`absolute inset-0 ${isTopRow ? 'flex flex-row items-center' : 'flex flex-col justify-end items-center'}${isTapes ? ' scale-x-[-1]' : ''}`}
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
                                    className={`w-full h-full object-contain${index === 1 ? ' transform scale-[2.3] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 3 ? ' transform scale-[1.43] -translate-x-2/3' : ''}`}
                                    style={{
                                      pointerEvents: 'none',
                                      filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                      ...(index === 3 ? { transform: 'scaleX(-1.8) scaleY(1.8) translateX(-5.6667%)' } : {}),
                                      ...(index === 2 ? { transform: 'scaleX(1.43) scaleY(1.43) translateX(2.67%)' } : {})
                                    }}
                                  />
                                </div>
                                <div className={`absolute inset-0 z-10 flex items-center ${index === 2 || index === 3 ? 'justify-end pr-16' : 'justify-start pl-16'}`}>
                                  <SplitText
                                    text={product.fullTitle}
                                    className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-kallisto text-center drop-shadow-2xl"
                                    splitType="words"
                                    delay={50}
                                  />
                                </div>
                              </div>
                            </>
                          ) : (
                            // Bottom row: check for INDUSTRIAL CLEANING to swap image/text order
                            product.title === "INDUSTRIAL CLEANING" ? (
                              <div className="w-full h-full flex flex-row items-center justify-center">
                                <div className="absolute inset-0 z-10 flex items-center justify-start pl-16">
                                  <SplitText
                                    text={product.fullTitle}
                                    className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-kallisto text-center drop-shadow-2xl"
                                    splitType="words"
                                    delay={50}
                                  />
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
                                    className={`w-full h-full object-contain${index === 1 ? ' transform scale-[2.3] -translate-x-0 -translate-y-1/3' : ''}${index !== 1 && index !== 3 ? ' transform scale-[1.43] -translate-x-2/3' : ''}`}
                                    style={{
                                      pointerEvents: 'none',
                                      filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                                      ...(index === 3 ? { transform: 'scaleX(-1.8) scaleY(1.8) translateX(-5.6667%)' } : {}),
                                      ...(index === 2 ? { transform: 'scaleX(1.43) scaleY(1.43) translateX(16.67%)' } : {})
                                    }}
                                  />
                                </div>
                                <div className={`absolute inset-0 z-10 flex items-center ${index === 2 || index === 3 ? 'justify-end pr-16' : 'justify-start pl-16'}`}>
                                  <SplitText
                                    text={product.fullTitle}
                                    className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-kallisto text-center drop-shadow-2xl"
                                    splitType="words"
                                    delay={50}
                                  />
                                </div>
                              </div>
                            )
                          )}
                        </motion.div>
                        <motion.div
                          className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center gap-2${isTapes ? ' scale-x-[-1]' : ''}`}
                          style={{
                            opacity: isHovered ? 1 : 0,
                            zIndex: 2,
                            transition: 'all 0.3s ease-in-out',
                            backgroundColor: '#1b3764' // Same as homepage background
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
                            <Button className="bg-white hover:bg-white/80 text-[#1b3764] rounded-full px-8 py-4 text-xl">
                              LEARN MORE
                            </Button>
                          </motion.span>
                        </motion.div>
                      </div>
                    </Card>
                  </Link>
                )
              );
            });
          })()}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection; 