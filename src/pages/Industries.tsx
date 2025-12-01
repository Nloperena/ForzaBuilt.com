import React from 'react';
import HeaderV2 from '../components/Header/HeaderV2';
import IndustriesSectionAlt from '../components/IndustriesSectionAlt';
import FooterV2 from '../components/FooterV2';
import EdgeTrianglesBackground from '@/components/common/EdgeTrianglesBackground';
import { motion } from 'framer-motion';

const Industries = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-x-hidden">
      <HeaderV2 />

      {/* Hero Section - Gradient Background */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-4 text-center z-20 bg-gradient-to-bl from-[#477197] to-[#2c476e]">
        <motion.div 
          className="max-w-[1400px] mx-auto flex flex-col items-center justify-center gap-4 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="mb-0 font-poppins text-white text-2xl sm:text-4xl md:text-5xl lg:text-fluid-display leading-snug">
            INDUSTRIES
          </h1>
          <h3 className="font-regular text-center leading-tight font-poppins text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-4xl mt-4">
            Better Built Bonds For All Industries
          </h3>
          <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto text-white/90 mt-4 font-poppins">
            At Forza, we're your trusted experts and mentors - delivering innovative adhesive solutions that secure your success.
          </p>
        </motion.div>
      </section>

      {/* Industries Grid Section - White Background */}
      <section className="relative z-20 py-16 md:py-24 bg-white">
        <IndustriesSectionAlt />
      </section>
      
      {/* Gradient Break / CTA Section */}
      <section className="relative py-20 px-4 bg-[#f5f7fa] text-center z-20">
        <motion.div 
          className="max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-poppins text-[#1B3764] tracking-tight">
            Don't See Your Industry?
          </h2>
          <p className="text-lg md:text-xl font-poppins text-[#1B3764]/80 max-w-2xl mx-auto">
            We create custom formulations for unique applications across many other sectors. Let's discuss your specific needs.
          </p>
          
          <div className="pt-4">
            <a
              href="/contact"
              className="inline-flex items-center px-10 py-4 bg-[#F2611D] text-white text-lg font-bold rounded-full hover:bg-[#F2611D]/80 transition-colors font-poppins shadow-xl"
            >
              Contact An Engineer
            </a>
          </div>
        </motion.div>
      </section>
      
      <FooterV2 />
    </div>
  );
};

export default Industries;
