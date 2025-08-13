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

import React, { useRef } from 'react';
import CardStackItemCustom from './cards/CardStackItemCustom';
import ThreeColumnServiceCard from './cards/ThreeColumnServiceCard';
import StackSpacer from './cards/StackSpacer';
import { useScrollCalculator } from '../hooks/useScrollCalculator';
import { ColumnData } from './cards/ThreeColumnServiceCard';

const ServiceCardStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const cards: Array<{
    title: string;
    icon?: string;
    image?: string;
    columns: ColumnData[];
  }> = [
    // 1) VALUE
    {
      title: 'Purpose-Built',
      icon: '⭐',
      image: '/Forza-lion-logo.png',
      columns: [
        {
          title: 'Value Proposition',
          image: '/static-approach-page-images/value.png',
          items: [
            'Big‑Picture Expertise. Small‑Town Care',
            'We unleash the strength and spirit of America\'s Heartland to build high-performance adhesives and sealants—while delivering the kind of customer care that big companies forgot how to give.',
            'Purpose‑Built Performance. Guaranteed Strength.'
          ]
        },
        {
          title: 'Decades of Real-World Know-How',
          image: '/static-approach-page-images/decades30.png',
          items: [
            'We\'ve seen it all. With over 30 years in the field, we don\'t guess—we get it right.',
            'We understand how adhesives & sealants behave in real-world conditions, not just in lab tests.',
            'We know a thing or two, because we\'ve seen a thing or two.',
            'If you have a unique situation, we\'ve most likely seen it and have already come up with a specific solution for it.'
          ]
        },
        {
          title: 'PURPOSE-BUILT PRODUCT SOLUTIONS DESIGNED FOR YOUR PRECISE APPLICATIONS',
          image: '/static-approach-page-images/purpose-built.png',
          items: [
            'Our solutions are never one-size-fits-all.',
            'We engineer adhesives and sealants for the exact needs our customers face—so they perform exactly as needed, the first time.',
            'Our products deliver guaranteed performance.'
          ]
        }
      ]
    },
    // 2) DECADES OF REAL‑WORLD KNOW‑HOW
    {
      title: 'Peformance',
      icon: '⏳',
      image: '/img/transportation/Trailer PreX-Ray.png',
      columns: [
       
        {
          title: 'INTENSE INDUSTRY FOCUS, ENGINEERED FOR PERFORMANCE',
          image: '/static-approach-page-images/Industryfocus.png',
          items: [
            'Always Insightful. Never limited in expertise or offerings.',
            'We don\'t try to serve everyone. We serve the industries we know best—like transportation, industrial manufacturing, construction, marine, and insulation.',
            'That\'s why our formulas, testing, and compliance know-how are second to none.',
            'If it\'s important to you, it\'s important to us.'
          ]
        },
        {
          title: 'PRODUCT PORTFOLIO THAT GIVES YOU ALL YOU NEED & NOTHING YOU DON\'T',
          image: '/static-approach-page-images/productporfolio.png',
          items: [
            'Most complete and comprehensive portfolio available.',
            'Our product line covers everything from core adhesives and sealants to niche products and specialty tapes.',
            'We don\'t just cover one or two of your needs, we do them all.',
            'If it bonds, seals, or sticks—we probably make it. If we don\'t, we\'ll help you find what does.'
          ]
        }
      ]
    },
    // 3) PURPOSE‑BUILT PRODUCT SOLUTIONS
    {
      title: 'Guaranteed Strength',
      icon: '🏗️',
      image: '/img/construction/Construction House Exploded Graphic Web.svg',
      columns: [
        {
          title: 'INNOVATION FROM SCIENCE AND COMMON SENSE',
          image: '/static-approach-page-images/Innovation.png',
          items: [
            'We innovate with a purpose, blending cutting-edge science with in-field common sense.',
            'Our R&D teams are always improving what works—and tossing out what doesn\'t.',
            'We blend great science with great practicality to create products that aren\'t just great in theory but that are actually great in use.',
            'Less waste, better chemistries, faster applications, and safer ingredients. Always for the customer.'
          ]
        },
        {
          title: 'FULLY INTEGRATED FACTORY - PROUDLY MANUFACTURED IN THE USA',
          image: '/static-approach-page-images/integration.png',
          items: [
            'Real people, making real products, making a real difference!',
            'We don\'t just resell & re-label someone else\'s products, we actually make them.',
            'We proudly manufacture our products in the USA, in America\'s heartland.',
            'From R&D to manufacturing, our vertical integration gives us full control over quality, consistency, and availability.'
          ]
        },
        {
          title: 'ONSITE R&D TECHNICAL EXPERTISE DELIVERS RIGHT SOLUTION - RIGHT ON TIME',
          image: '/static-approach-page-images/onsiternd.png',
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
          image: '/static-approach-page-images/sustainability.png',
          items: [
            'We build stronger, safer products without sacrificing performance.',
            'We\'re pushing for a cleaner, more sustainable future—but never at the cost of quality.'
          ]
        },
        {
          title: 'CUSTOMER EXPERIENCE THAT\'S TRULY AN EXPERIENCE',
          image: '/static-approach-page-images/experience.png',
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

  // Use the scroll calculator hook for all scroll-related logic
  const { getCardProgress } = useScrollCalculator({
    cardCount: cards.length,
    containerRef
  });

  return (
    <div ref={containerRef} className="relative w-full px-4 py-16 bg-gradient-to-b from-[#1b3764] via-[#09668d] to-[#1B3764]">
      <div className="text-center mb-12">

      </div>
      
             <div className="relative space-y-16 lg:space-y-20 xl:space-y-24 max-w-[1600px] mx-auto">
         {/* All cards as stackable items */}
         {cards.map((card, index) => {
           const { progress, nextCardProgress, isVisible } = getCardProgress(index);
           
           return (
             <CardStackItemCustom
               key={`${card.title}-${index}`}
               index={index}
               progress={progress}
               nextCardProgress={nextCardProgress}
               isVisible={isVisible}
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
         <StackSpacer cardCount={cards.length} />
        </div>
    </div>
  );
};

export default ServiceCardStack;
