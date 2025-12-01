import React, { useState } from 'react';
import VideoSkeleton from './common/VideoSkeleton';
import { motion } from 'framer-motion';

const AboutIdentityCards = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const cards = [
    {
      title: "Made in America",
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-full aspect-video relative mb-4 rounded-lg overflow-hidden bg-gray-200">
            {!isVideoLoaded && <VideoSkeleton className="rounded-lg" />}
            <video
              src="/American%20Flag.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={handleVideoLoad}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="American flag waving"
            />
          </div>
          <p className="text-white/90 text-sm font-poppins leading-relaxed">
            We proudly manufacture our high-performance products in the USA, ensuring quality you can trust, built right here at home.
          </p>
        </div>
      )
    },
    {
      title: "Performance. Elevated.",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-white/90 text-sm font-poppins leading-relaxed">
            Our formulations undergo rigorous testing to exceed industry standards. When you choose Forza, you choose reliability.
          </p>
        </div>
      )
    },
    {
      title: "Support & Engineering",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p className="text-white/90 text-sm font-poppins leading-relaxed">
            Direct access to our engineering team for application support, custom development, and technical guidance.
          </p>
        </div>
      )
    },
    {
      title: "Product Line",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <p className="text-white/90 text-sm font-poppins leading-relaxed">
            A comprehensive range of adhesives, sealants, and tapes designed for diverse industrial needs.
          </p>
        </div>
      )
    }
  ];

  return (
    <section className="py-10 md:py-14 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {cards.map((card, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-[#1B3764] rounded-2xl shadow-xl p-6 border border-[#1B3764]/10 aspect-square relative overflow-hidden group"
          >
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-white text-lg font-bold font-kallisto mb-4 text-center group-hover:text-[#F2611D] transition-colors duration-300">
                {card.title}
              </h3>
              <div className="flex-1">
                {card.content}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutIdentityCards;
