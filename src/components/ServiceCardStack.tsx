/**
 * ServiceCardStack Component
 * 
 * A reusable, data-driven component that creates a stack of service cards with scroll-based animations.
 * This component has been refactored to be more maintainable by delegating specific responsibilities
 * to focused hooks and components.
 * 
 * Key Features:
 * - Scroll-based stacking animation
 * - Dynamic card generation from data
 * - Self-contained scroll calculations
 * - Responsive to viewport changes
 * - CMS-ready data structure
 * 
 * Architecture:
 * - Uses useScrollCalculator hook for scroll logic
 * - Uses CardStackItem components for individual card rendering
 * - Uses StackSpacer component for scroll height management
 */

import React, { useMemo, useRef } from 'react';
import CardStackItemCustom from './cards/CardStackItemCustom';
import ThreeColumnServiceCard from './cards/ThreeColumnServiceCard';
import StackSpacer from './cards/StackSpacer';
import { useScrollCalculator } from '../hooks/useScrollCalculator';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { ColumnData } from './cards/ThreeColumnServiceCard';

const ServiceCardStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const cards: Array<{
    title: string;
    icon?: string;
    image?: string;
    columns: ColumnData[];
  }> = [
    // 1) DECADES OF REAL‑WORLD KNOW‑HOW
    {
      title: 'Purpose-Built',
      icon: '⭐',
      image: '/logos/Forza-lion-logo.png',
      columns: [
        {
          title: 'Decades of Real-World Know-How',
          image: '/images/approach-svgs/Decades of Real Work Know How icon.svg',
          items: [
            'We\'ve seen it all. With over 30 years in the field, we don\'t guess—we get it right.',
            'We understand how adhesives & sealants behave in real-world conditions, not just in lab tests.',
            'We know a thing or two, because we\'ve seen a thing or two.',
            'If you have a unique situation, we\'ve most likely seen it and have already come up with a specific solution for it.'
          ]
        },
        {
          title: 'PURPOSE-BUILT PRODUCT SOLUTIONS DESIGNED FOR YOUR PRECISE APPLICATIONS',
          image: '/images/approach-svgs/Purpose Built Product Solutions icon.svg',
          items: [
            'Our solutions are never one-size-fits-all.',
            'We engineer adhesives and sealants for the exact needs our customers face—so they perform exactly as needed, the first time.',
            'Our products deliver guaranteed performance.'
          ]
        }
      ]
    },
    // 2) PERFORMANCE
    {
      title: 'Peformance',
      icon: '⏳',
      image: '/img/transportation/Trailer PreX-Ray.png',
      columns: [
       
        {
          title: 'INTENSE INDUSTRY FOCUS, ENGINEERED FOR PERFORMANCE',
          image: '/images/approach-svgs/Intense Industry Focus Engineered Icon.svg',
          items: [
            'Always Insightful. Never limited in expertise or offerings.',
            'We don\'t try to serve everyone. We serve the industries we know best—like transportation, industrial manufacturing, construction, marine, and insulation.',
            'That\'s why our formulas, testing, and compliance know-how are second to none.',
            'If it\'s important to you, it\'s important to us.'
          ]
        },
        {
          title: 'PRODUCT PORTFOLIO THAT GIVES YOU ALL YOU NEED & NOTHING YOU DON\'T',
          image: '/images/approach-svgs/Product Portfolio icon.svg',
          items: [
            'Most complete and comprehensive portfolio available.',
            'Our product line covers everything from core adhesives and sealants to niche products and specialty tapes.',
            'We don\'t just cover one or two of your needs, we do them all.',
            'If it bonds, seals, or sticks—we probably make it. If we don\'t, we\'ll help you find what does.'
          ]
        }
      ]
    },
    // 3) GUARANTEED STRENGTH
    {
      title: 'Guaranteed Strength',
      icon: '🏗️',
      image: '/img/construction/Construction House Exploded Graphic Web.svg',
      columns: [
        {
          title: 'INNOVATION FROM SCIENCE AND COMMON SENSE',
          image: '/images/approach-svgs/Innovation From Science icon.svg',
          items: [
            'We innovate with a purpose, blending cutting-edge science with in-field common sense.',
            'Our R&D teams are always improving what works—and tossing out what doesn\'t.',
            'We blend great science with great practicality to create products that aren\'t just great in theory but that are actually great in use.',
            'Less waste, better chemistries, faster applications, and safer ingredients. Always for the customer.'
          ]
        },
        {
          title: 'FULLY INTEGRATED FACTORY - PROUDLY MANUFACTURED IN THE USA',
          image: '/images/approach-svgs/Proudly Manufactured in USA icon.svg',
          items: [
            'Real people, making real products, making a real difference!',
            'We don\'t just resell & re-label someone else\'s products, we actually make them.',
            'We proudly manufacture our products in the USA, in America\'s heartland.',
            'From R&D to manufacturing, our vertical integration gives us full control over quality, consistency, and availability.'
          ]
        },
        {
          title: 'ONSITE R&D TECHNICAL EXPERTISE DELIVERS RIGHT SOLUTION - RIGHT ON TIME',
          image: '/images/approach-svgs/Onsite R&D icon.svg',
          items: [
            'Guaranteed performance with our in-house lab.',
            'No wasted time. No off-the-shelf guesswork. Just the right product, right away—proven and validated.',
            'When a product doesn\'t exist to meet your need, our in-house chemists & testing teams can create & validate custom formulas tailored to your application—fast.'
          ]
        }
      ]
    },
    // 4) INTENSE INDUSTRY FOCUS
    {
      title: 'That\'s Forza',
      icon: '🎯',
      image: '/img/marine/Marine Pontoon2 SVG.svg',
      columns: [
        
        {
          title: 'SUSTAINABLE THINKING THAT WORKS',
          image: '/images/approach-svgs/Sustainable Thinking Icon.svg',
          items: [
            'We build stronger, safer products without sacrificing performance.',
            'We\'re pushing for a cleaner, more sustainable future—but never at the cost of quality.'
          ]
        },
        {
          title: 'CUSTOMER EXPERIENCE THAT\'S TRULY AN EXPERIENCE',
          image: '/images/approach-svgs/Customer Experience Icon.svg',
          items: [
            'We answer the phone. We know your name. We help you get the job done.',
            'Our owners and tech teams are hands-on and accessible—no call centers, no runaround, no delays.',
            'Real people. Real care. Real expertise.',
            'We provide the quality & performance of a Fortune 500 company with the service, know-how & personalized care of a family-owned, corner grocery store.'
          ]
        }
      ]
    }
  ];

  // Flatten to inner columns for mobile/tablet; otherwise keep as provided
  const flatCards = useMemo(() => {
    if (!(isMobile || isTablet)) return cards;
    const mapped: Array<{ title: string; icon?: string; image?: string; columns: ColumnData[] }> = [];
    cards.forEach((c) => {
      (c.columns || []).forEach((col) => {
        mapped.push({ title: col.title || c.title, icon: c.icon, image: col.image || c.image, columns: [col] });
      });
    });
    return mapped;
  }, [cards, isMobile, isTablet]);

  // Use the scroll calculator hook for all scroll-related logic
  const { getCardProgress } = useScrollCalculator({
    cardCount: flatCards.length,
    containerRef
  });

  return (
    <div ref={containerRef} className="relative w-full px-4 py-4 md:py-8 lg:py-10 bg-gradient-to-b from-[#1b3764] via-[#09668d] to-[#1B3764]">
      {/* Desktop heading - positioned at top */}
      <div className="hidden md:block text-center py-2 mt-2 px-4">
        <h2 className="text-fluid-display font-black text-white mb-2 font-kallisto leading-snug break-words">
          Our Approach
        </h2>
        <div className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto space-y-3">
          <p className="font-semibold">
            Big‑Picture Expertise. Small‑Town Care
          </p>
          <p>
            We unleash the strength and spirit of America's Heartland to build high-performance adhesives and sealants—while delivering the kind of customer care that big companies forgot how to give.
          </p>
          <p className="font-semibold">
            Purpose‑Built Performance. Guaranteed Strength.
          </p>
        </div>
      </div>
      
      <div className="relative space-y-2 lg:space-y-3 xl:space-y-4 max-w-[1600px] mx-auto">
        {/* Mobile heading - positioned above cards */}
        <div className="md:hidden text-center pt-4 pb-2 px-4">
          <h2 className="text-fluid-display font-black text-white mb-3 font-kallisto leading-snug break-words">
            Our Approach
          </h2>
          <div className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto space-y-3">
            <p className="font-semibold">
              Big‑Picture Expertise. Small‑Town Care
            </p>
            <p>
              We unleash the strength and spirit of America's Heartland to build high-performance adhesives and sealants—while delivering the kind of customer care that big companies forgot how to give.
            </p>
            <p className="font-semibold">
              Purpose‑Built Performance. Guaranteed Strength.
            </p>
          </div>
        </div>
        
        {/* All cards as stackable items (flattened on mobile/tablet) */}
        {flatCards.map((card, index) => {
          const { progress, nextCardProgress, isVisible } = getCardProgress(index);
          
          return (
            <CardStackItemCustom
              key={`${card.title}-${index}`}
              index={index}
              progress={progress}
              nextCardProgress={nextCardProgress}
              isVisible={isVisible}
              isLast={index === flatCards.length - 1}
              render={({ transform, opacity }) => (
                  <ThreeColumnServiceCard
                   title={card.title}
                   icon={card.icon}
                   image={card.image}
                   columns={card.columns}
                   transform={transform}
                   opacity={opacity}
                   index={index}
                 />
               )}
             />
           );
        })}
        
        {/* Spacer element for scroll height */}
        <StackSpacer cardCount={flatCards.length} />
      </div>
    </div>
  );
};

export default ServiceCardStack;
