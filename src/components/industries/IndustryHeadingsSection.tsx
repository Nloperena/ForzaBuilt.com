import React from 'react';
import { motion } from 'framer-motion';

interface IndustryHeadingsSectionProps {
  industryTitle: string;
}

const IndustryHeadingsSection: React.FC<IndustryHeadingsSectionProps> = ({ industryTitle }) => {
  return (
    <section className="bg-white text-[#1b3764] py-8 sm:py-12 md:py-16 relative z-[30]">
      <div className="w-full px-4 sm:px-6 max-w-[1600px] mx-auto">
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-regular text-center leading-none break-words font-poppins text-[#1b3764]"
          >
            {`Building High-Performance ${industryTitle.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())} Adhesive, Tape & Sealant Solutions`}
          </h3>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryHeadingsSection;

