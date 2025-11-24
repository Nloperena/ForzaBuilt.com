import React from 'react';
import { motion } from 'framer-motion';

interface IndustryHeadingsSectionProps {
  industryTitle: string;
}

const IndustryHeadingsSection: React.FC<IndustryHeadingsSectionProps> = ({ industryTitle }) => {
  return (
    <>
      <section className="bg-white text-[#1b3764] relative z-[30]" style={{ paddingTop: 'clamp(2rem, 4vw, 4rem)', paddingBottom: 'clamp(2rem, 4vw, 4rem)' }}>
      <div className="w-full max-w-[1600px] mx-auto" style={{ paddingLeft: 'clamp(1rem, 2vw, 1.5rem)', paddingRight: 'clamp(1rem, 2vw, 1.5rem)' }}>
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center"
          style={{ gap: 'clamp(1rem, 2vw,0rem)', marginBottom: 'clamp(1rem, 1vw, 1rem)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 
            className="font-regular text-center leading-none break-words font-poppins text-[#1b3764]"
            style={{ fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 4.5rem)', maxWidth: '1100px' }}
          >
            Building High-Performance<br />
            {`${industryTitle.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())} Adhesive, Tape`}<br />
            {'&'} Sealant Solutions.
          </h3>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default IndustryHeadingsSection;

