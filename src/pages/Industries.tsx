import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import IndustriesSectionAlt from '../components/IndustriesSectionAlt';
import Footer from '../components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import CanisterSystemImage from '@/assets/images/Canister System.png';
import TapeHeroicImage from '@/assets/images/Tape Heroic Image.png';
import OS2CartridgeHeroImage from '@/assets/images/OS2 Cartridge Hero.png';
import RRHandSprayingImage from '@/assets/images/RR Hand Spraying.png';

const IndustriesProductsRow: React.FC = () => {
  const products = [
    { title: 'ADHESIVES', fullTitle: 'INDUSTRIAL\nADHESIVES', image: CanisterSystemImage, hoverImage: 'https://forzabuilt.com/wp-content/uploads/2023/05/product-line-brands-white-bond.svg', color: '#f16022', slug: 'bond' },
    { title: 'SEALANTS', fullTitle: 'INDUSTRIAL\nSEALANTS', image: OS2CartridgeHeroImage, hoverImage: 'https://forzabuilt.com/wp-content/uploads/2023/05/product-line-brands-white-seal.svg', color: '#faaf40', slug: 'seal' },
    { title: 'INDUSTRIAL CLEANING', fullTitle: 'INDUSTRIAL\nCLEANING', image: RRHandSprayingImage, hoverImage: 'https://ruggedred.com/images/RRMascot+Type-smaller.png', color: '#e53935', external: true, link: 'https://ruggedred.com/' },
    { title: 'TAPES', fullTitle: 'INDUSTRIAL\nTAPES', image: TapeHeroicImage, hoverImage: 'https://forzabuilt.com/wp-content/uploads/2023/05/product-line-brands-white-tape.svg', color: '#d1181f', slug: 'tape' },
  ] as const;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [breatheValue, setBreatheValue] = useState(0);
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      const value = (Math.sin(Date.now() / 333) + 1) / 2;
      setBreatheValue(value);
      animationFrame = requestAnimationFrame(animate);
    };
    if (hoveredIndex !== null) animate();
    return () => { if (animationFrame) cancelAnimationFrame(animationFrame); };
  }, [hoveredIndex]);

  const blur = (isHovered: boolean) => (isHovered ? 25 + breatheValue * 10 : 0);
  const spread = (isHovered: boolean) => (isHovered ? 15 + breatheValue * 5 : 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
      {products.map((product, index) => {
        const isHovered = hoveredIndex === index;
        const isTapes = product.title === 'TAPES';
        const isTopRow = index < 2;

        const CardInner = (
          <Card
            className="border-0 shadow-lg rounded-[2rem] overflow-hidden transition-all duration-100 hover:scale-[1.02] relative hover:bg-transparent"
            style={{
              backgroundColor: product.color,
              transition: 'box-shadow 0.1s linear',
              boxShadow: isHovered ? `0 0 ${blur(isHovered)}px ${spread(isHovered)}px ${product.color}` : 'none',
            }}
          >
            <div className={`relative aspect-square w-full${isTapes ? ' scale-x-[-1]' : ''}`}>
              <motion.div
                className={`absolute inset-0 ${isTopRow ? 'flex flex-row items-center' : 'flex flex-col justify-end items-center'}${isTapes ? ' scale-x-[-1]' : ''}`}
                style={{ opacity: isHovered ? 0 : 1, zIndex: 1, transition: 'all 0.3s ease-in-out' }}
              >
                <div className="w-full h-full flex flex-row items-center justify-center">
                  <div className="w-2/3 h-2/3 relative z-10">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain"
                      style={{ pointerEvents: 'none', filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))' }}
                    />
                  </div>
                  <div className={`absolute inset-0 z-10 flex items-center ${index === 2 || index === 3 ? 'justify-start pl-4 sm:pl-16' : 'justify-end pr-4 sm:pr-16'}`}>
                    <div className="text-sm sm:text-2xl md:text-4xl lg:text-5xl font-black text-white font-kallisto text-center drop-shadow-2xl leading-tight">
                      {product.fullTitle.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center gap-2${isTapes ? ' scale-x-[-1]' : ''}`}
                style={{ opacity: isHovered ? 1 : 0, zIndex: 2, transition: 'all 0.3s ease-in-out', backgroundColor: '#1b3764' }}
              >
                <img src={product.hoverImage} alt={`${product.title} hover image`} className="w-full object-contain" />
                <motion.span style={{ opacity: isHovered ? 1 : 0, transform: isHovered ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.3s ease-in-out' }}>
                  <Button className="bg-white hover:bg-white/80 text-[#1b3764] rounded-full px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-xl">LEARN MORE</Button>
                </motion.span>
              </motion.div>
            </div>
          </Card>
        );

        return product.external ? (
          <a
            key={index}
            href={(product as any).link}
            className="group"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {CardInner}
          </a>
        ) : (
          <Link
            key={index}
            to={`/products/${(product as any).slug}`}
            className="group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {CardInner}
          </Link>
        );
      })}
    </div>
  );
};

const Industries = () => {
  return (
    <div className="bg-[#1b3764] min-h-screen">
      <Header />
      <IndustriesSectionAlt />
      {/* Explore by Product Category - Copy of homepage cards in a single row */}
      <section className="py-16 bg-[#1b3764] text-white">
        <div className="max-w-[1100px] w-full mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Explore by Product Category</h3>
          <IndustriesProductsRow />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Industries; 