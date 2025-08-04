import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ChemistryCardProps {
  title: string;
  icon: React.ReactNode;
  description?: string;
}

const ChemistryCard: React.FC<ChemistryCardProps> = ({
  title,
  icon,
  description,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsFlipped(false);
    }, 1000);
  };

  return (
    <motion.div
      className="relative w-full h-full rounded-2xl shadow-lg cursor-pointer preserve-3d overflow-hidden z-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 1.0, type: "spring", stiffness: 100, damping: 12 }}
      style={{ perspective: '1000px', width: '100%', height: '100%', pointerEvents: 'all' }}
    >
      {/* Front of the card */}
      <motion.div
        className="absolute w-full h-full flex flex-col items-center justify-center bg-white text-[#1b3764] rounded-2xl backface-hidden p-2 sm:p-3 md:p-4 text-center"
        animate={{ opacity: isFlipped ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: 'none' }}
      >
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl mb-2 sm:mb-3 md:mb-4 lg:mb-6">{icon}</div>
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black font-kallisto uppercase leading-tight">{title}</h3>
      </motion.div>

      {/* Back of the card */}
      <motion.div
        className="absolute w-full h-full flex flex-col items-center justify-center bg-[#1b3764] text-white rounded-2xl backface-hidden p-2 sm:p-3 md:p-4 text-center"
        initial={{ rotateY: 180 }}
        animate={{ rotateY: isFlipped ? 0 : 180, opacity: isFlipped ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: 'none' }}
      >
        <div style={{ transform: 'scaleX(-1)' }}>
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black font-kallisto uppercase mb-2 sm:mb-3 md:mb-4 leading-tight">{title}</h3>
          {description && (
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium font-kallisto leading-relaxed">{description}</p>
          )}
          {!description && (
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium font-kallisto leading-relaxed">More information about {title} will go here.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChemistryCard; 