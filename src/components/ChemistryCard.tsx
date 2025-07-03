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
        className="absolute w-full h-full flex flex-col items-center justify-center bg-white text-[#1b3764] rounded-2xl backface-hidden p-4 text-center"
        animate={{ opacity: isFlipped ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: 'none' }}
      >
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold font-montserrat uppercase">{title}</h3>
      </motion.div>

      {/* Back of the card */}
      <motion.div
        className="absolute w-full h-full flex flex-col items-center justify-center bg-[#1b3764] text-white rounded-2xl backface-hidden p-4 text-center"
        initial={{ rotateY: 180 }}
        animate={{ rotateY: isFlipped ? 0 : 180, opacity: isFlipped ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: 'none' }}
      >
        <div style={{ transform: 'scaleX(-1)' }}>
          <h3 className="text-2xl font-bold font-montserrat uppercase mb-2">{title}</h3>
          {description && (
            <p className="text-base font-light">{description}</p>
          )}
          {!description && (
            <p className="text-base font-light">More information about {title} will go here.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChemistryCard; 