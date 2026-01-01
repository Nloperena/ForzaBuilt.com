import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeaderV2 from '@/components/Header/HeaderV2';
import Footer from '@/components/Footer';
import DynamicMetaTags from '@/components/DynamicMetaTags';
import { useScrollCalculator } from '@/hooks/useScrollCalculator';

interface MSCard {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  imagePosition: 'left' | 'right';
}

const MSCards: MSCard[] = [
  {
    id: 'what-are-ms-polymers',
    title: 'What are Modified Silane MS Polymers',
    description: 'Modified Silane (MS) Polymers are moisture-curing, silane-terminated blends that deliver advanced adhesion and durability.',
    features: [
      'Silane-terminated polyether hybrids',
      'Cure with ambient moisture',
      'Bond chemically to a wide range of surfaces'
    ],
    imageUrl: '/images/approach/Construction Visit.jpg',
    imagePosition: 'left'
  },
  {
    id: 'why-safer',
    title: 'Why are Forza MS Products Safer',
    description: 'Forza MS products are built with health and safety in mind, without compromising performance.',
    features: [
      'No isocyanates, harmful solvents, or hazardous air pollutants (HAPs)',
      'Ultra-low to no VOCs',
      'Compliant with evolving environmental and jobsite safety standards'
    ],
    imageUrl: '/images/approach/Products Portfolio.jpg',
    imagePosition: 'right'
  },
  {
    id: 'why-stronger',
    title: 'Why are Forza MS Products Stronger',
    description: 'Our products are engineered to outperform in both lab and field.',
    features: [
      'Exceeds ASTM strength and flexibility standards (D412, D1002, D794, G26)',
      'Long-lasting, even in extreme conditions',
      'Resists cracking, shrinking, and degradation due to weathering'
    ],
    imageUrl: '/images/approach/Legacy Image.jpg',
    imagePosition: 'left'
  },
  {
    id: 'why-preferred',
    title: 'Why are Forza MS Products Preferred',
    description: 'Our products are designed for professionals who need results and reliability.',
    features: [
      'Instant results: develop peak strength in 24 hours',
      'Adhere powerfully to concrete, brick, metal, glass, wood, plastics, and foam board - one tube for every job',
      'High UV resistance',
      'Provide all-weather reliability: weather resistant for lasting reliable results inside or out',
      'Easy/convenient application',
      'Immediately paintable'
    ],
    imageUrl: '/images/approach/Receptionist at desk.jpg',
    imagePosition: 'right'
  },
  {
    id: 'product-portfolio',
    title: "Forza's Leading MS Product Portfolio",
    description: 'Each Forza MS Formula is optimized with specialized performance for unique needs.',
    features: [
      'ForzaSEAL® OS2',
      'ForzaSEAL® OS61',
      'ForzaBOND® OA4',
      'ForzaBOND® OS24'
    ],
    imageUrl: '/images/approach/Products Portfolio.jpg',
    imagePosition: 'left'
  }
];

interface MSCardItemProps {
  card: MSCard;
  index: number;
  progress: number;
  nextCardProgress: number;
  isVisible: boolean;
}

const MSCardItem: React.FC<MSCardItemProps> = ({ card, index, progress, nextCardProgress, isVisible }) => {
  // Cards stay visible but move up slightly as next card comes in
  const translateY = progress * -20; // Subtle upward movement
  const scale = 1 - progress * 0.02; // Very slight scale down
  
  return (
    <div
      className="sticky top-0 w-full h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      style={{
        zIndex: 30 + index, // Each card layers on top
      }}
    >
      <div
        className="w-full max-w-7xl"
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity: 1, // Always visible
        }}
      >
        <div
          className="bg-[#2c476e] rounded-3xl overflow-hidden shadow-2xl"
          style={{
            borderRadius: '1.5rem',
          }}
        >
          <div className={`grid grid-cols-1 lg:grid-cols-2 h-full min-h-[600px] ${card.imagePosition === 'right' ? 'lg:flex-row-reverse' : ''}`}>
            {/* Image Section */}
            <div className={`relative ${card.imagePosition === 'left' ? 'lg:rounded-l-3xl' : 'lg:rounded-r-3xl lg:order-2'} overflow-hidden`}>
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center ${card.imagePosition === 'right' ? 'lg:order-1' : ''}`}>
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold font-poppins mb-4 md:mb-6 leading-tight">
                {card.title}
              </h3>
              
              <p className="text-white text-base md:text-lg lg:text-xl font-poppins font-normal mb-6 md:mb-8 leading-relaxed">
                {card.description}
              </p>

              <ul className="space-y-3 md:space-y-4">
                {card.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-white mr-3 mt-1 text-xl">•</span>
                    <span className="text-white text-sm md:text-base lg:text-lg font-poppins font-normal leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MSPageV2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getCardProgress } = useScrollCalculator({
    cardCount: MSCards.length,
    containerRef
  });

  return (
    <>
      <DynamicMetaTags
        title="Modified Silane Polymers (MS) | Forza Built"
        description="Forza is advancing the next generation of industrial adhesives and sealants. Our MS Polymer technology sets the new standard-stronger, safer, and smarter for modern construction and manufacturing."
      />
      <HeaderV2 />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/product-heroes/Forza Seal Hero Shot Header.jpg"
            alt="Industrial Manufacturing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c476e]/80 via-[#2c476e]/40 to-transparent" />
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal font-poppins text-[#2c476e] mb-6 md:mb-8 leading-tight"
          >
            Modified Silane Polymers (MS)
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-[#2c476e] font-poppins font-normal leading-relaxed max-w-4xl mx-auto mb-12 md:mb-16"
          >
            Forza is advancing the next generation of industrial adhesives and sealants. Our MS Polymer technology sets the new standard-stronger, safer, and smarter for modern construction and manufacturing.
          </motion.p>
        </div>
      </section>

      {/* Sticky Stacking Cards Section - Cards stay visible */}
      <section ref={containerRef} className="relative bg-white">
        <div className="relative">
          {MSCards.map((card, index) => {
            const { progress, nextCardProgress, isVisible } = getCardProgress(index);
            return (
              <MSCardItem
                key={card.id}
                card={card}
                index={index}
                progress={progress}
                nextCardProgress={nextCardProgress}
                isVisible={isVisible}
              />
            );
          })}
          {/* Spacer for scroll height */}
          <div style={{ height: `${MSCards.length * 100}vh` }} />
        </div>
      </section>

      {/* Scroll Indicator */}
      <section className="bg-white py-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-sm font-poppins">SCROLL</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default MSPageV2;
