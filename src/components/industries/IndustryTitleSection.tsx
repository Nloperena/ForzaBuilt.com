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
    <section 
      className="relative z-[20] w-full pb-0" 
      style={{ 
        padding: 'clamp(0.5rem, 1vw, 1rem) clamp(1rem, 2vw, 2.5rem)', 
        paddingBottom: 0,
        margin: 0
      }}
    >
      <motion.div 
        className="w-full flex flex-col items-center justify-center"
        style={{ 
          paddingLeft: 'clamp(1rem, 2vw, 2.5rem)',
          paddingRight: 'clamp(1rem, 2vw, 2.5rem)',
          gap: 'clamp(1rem, 2vw, 2rem)'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        {/* Title and Icon Row */}
        <div className="flex items-center justify-center" style={{ gap: 'clamp(1rem, 2vw, 2rem)' }}>
          <h1
            className="font-black mb-0 leading-none font-kallisto"
            style={{ 
              color: color || '#ffffff',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.5)',
              fontSize: 'clamp(1.5rem, 4vw + 0.5rem, 6rem)'
            }}
          >
            {title.toUpperCase()}
          </h1>
          {logo ? (
            <div 
              className="relative flex items-center justify-center rounded-full"
              style={{ 
                width: 'clamp(5rem, 8vw, 14rem)', 
                height: 'clamp(5rem, 8vw, 14rem)',
                border: '3px solid #F2611D',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: 'clamp(0.5rem, 1vw, 1rem)'
              }}
            >
              {!iconLoaded && <ImageSkeleton className="rounded-full" />}
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
        </div>

        {/* High-Performance Subtitle - Regular Poppins */}
        <motion.h3
          className="font-normal text-center leading-relaxed font-poppins text-white"
          style={{ 
            fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.5rem)',
            maxWidth: '900px',
            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)',
            marginTop: 'clamp(0.75rem, 1.5vw, 1.5rem)',
            lineHeight: '1.6'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          Building High-Performing<br />
          {`${title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())} Adhesive, Tape`}
          <br />
          <span style={{ display: 'inline-block' }}>{'&'} Sealant Solutions.</span>
        </motion.h3>
      </motion.div>
    </section>
  );
};

export default IndustryTitleSection;

