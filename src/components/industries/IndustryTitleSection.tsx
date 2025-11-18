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
    <section className="relative z-[20]" style={{ background: 'linear-gradient(#ffffff 50%, #ffffff 50%)', paddingTop: 'clamp(4rem, 8vw, 12rem)' }}>
      <motion.div 
        className="w-full flex items-center justify-center"
        style={{ 
          marginTop: '-5rem',
          paddingLeft: 'clamp(1rem, 2vw, 2.5rem)',
          paddingRight: 'clamp(1rem, 2vw, 2.5rem)',
          gap: 'clamp(1rem, 2vw, 2rem)'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <h1
          className="font-black mb-0 leading-none font-kallisto"
          style={{ 
            color: color || '#1B3764',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            fontSize: 'clamp(1.5rem, 4vw + 0.5rem, 6rem)'
          }}
        >
          {title.toUpperCase()}
        </h1>
        {logo ? (
          <div className="relative" style={{ width: 'clamp(5rem, 8vw, 14rem)', height: 'clamp(5rem, 8vw, 14rem)' }}>
            {!iconLoaded && <ImageSkeleton className="rounded-lg" />}
            <motion.img
              src={logo}
              alt={`${title} icon`}
              className="w-auto h-full object-contain transition-opacity duration-500"
              style={{ 
                filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))',
                opacity: iconLoaded ? 1 : 0
              }}
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

