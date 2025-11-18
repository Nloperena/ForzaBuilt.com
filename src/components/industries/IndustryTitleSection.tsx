import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageSkeleton from '../common/ImageSkeleton';

interface IndustryTitleSectionProps {
  title: string;
  logo?: string;
  color: string;
}

const IndustryTitleSection: React.FC<IndustryTitleSectionProps> = ({ title, logo, color }) => {
  const [iconLoaded, setIconLoaded] = useState(false);

  const handleIconLoad = () => {
    setIconLoaded(true);
  };

  const handleIconError = () => {
    setIconLoaded(true);
  };

  return (
    <section style={{ background: 'linear-gradient(#ffffff 50%, #ffffff 50%)' }} className="relative z-[20] pt-16 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-48">
      <motion.div 
        className="w-full px-4 sm:px-6 md:px-10 flex items-center justify-center gap-4 sm:gap-6 md:gap-8"
        style={{ marginTop: '-5rem' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <h1
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black mb-0 leading-none font-kallisto"
          style={{ 
            color: color || '#1B3764',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
          }}
        >
          {title.toUpperCase()}
        </h1>
        {logo ? (
          <div className="relative h-20 sm:h-28 md:h-40 lg:h-48 xl:h-56 w-20 sm:w-28 md:w-40 lg:w-48 xl:w-56">
            {!iconLoaded && <ImageSkeleton className="rounded-lg" />}
            <motion.img
              src={logo}
              alt={`${title} icon`}
              className={`h-20 sm:h-28 md:h-40 lg:h-48 xl:h-56 w-auto object-contain transition-opacity duration-500 ${iconLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))' }}
              loading="lazy"
              onLoad={handleIconLoad}
              onError={handleIconError}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: iconLoaded ? 1 : 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
            />
          </div>
        ) : null}
      </motion.div>
    </section>
  );
};

export default IndustryTitleSection;

