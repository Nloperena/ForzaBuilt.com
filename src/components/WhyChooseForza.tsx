import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const WhyChooseForza = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const stats = [
    { 
      value: '1979', 
      label: 'Established', 
      description: 'Decades of expertise',
      height: 0.35 // Starts low
    },
    { 
      value: '100%', 
      label: 'Made in USA', 
      description: 'Quality controlled',
      height: 0.55 // Goes up
    },
    { 
      value: '24hr', 
      label: 'Support Response', 
      description: 'Always here to help', 
      link: '/contact',
      height: 0.75 // Goes up further
    },
    { 
      value: '500+', 
      label: 'Formulations', 
      description: 'Custom solutions',
      height: 0.95 // Highest point - like a checkmark/Verizon logo sweep
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative pt-24 pb-0 px-4 bg-gradient-to-bl from-[#477197] to-[#2c476e] overflow-hidden text-white isolation-auto border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-20 md:mb-24">
          <motion.h2 
            className="text-fluid-heading font-normal font-poppins mb-4 tracking-tight"
            style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 56px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Forza?
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 font-poppins font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Performance proof that speaks for itself.
          </motion.p>
        </header>

        {/* Stats Visualization */}
        <div className="relative h-[500px] px-4 md:px-12 pb-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 h-full relative">
            {stats.map((stat, index) => {
              const StatWrapper = stat.link ? Link : 'div';
              const wrapperProps = stat.link ? { to: stat.link, className: "relative h-full w-full group block" } : { className: "relative h-full w-full" };

              return (
                <StatWrapper key={index} {...wrapperProps}>
                  
                  {/* Line/Sceptre - Absolute positioned from bottom */}
                  <motion.div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-t from-[#F2611D]/30 via-[#F2611D]/70 to-[#F2611D]"
                    style={{ height: `${stat.height * 100}%` }}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + (index * 0.15), ease: "circOut" }}
                  >
                     {/* Dot at top of line */}
                     <motion.div 
                        className="absolute -top-2 -left-2 w-4 h-4 bg-[#F2611D] rounded-full shadow-[0_0_15px_rgba(242,97,29,0.6)]"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + (index * 0.15) + 0.6, type: "spring" }}
                     />
                  </motion.div>
                  
                  {/* Stat Content - Absolute positioned above the line */}
                  <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 w-full max-w-[220px] flex justify-center z-10 text-center"
                    style={{ bottom: `${stat.height * 100}%`, paddingBottom: '2rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.15) }}
                  >
                    <div className="w-full">
                      <p className="text-white text-3xl md:text-4xl font-bold font-poppins mb-2 text-[#F2611D]">
                        {stat.value}
                      </p>
                      <h4 className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-wider mb-2 font-poppins">
                        {stat.label}
                      </h4>
                      <p className="text-white/70 text-xs md:text-sm font-poppins font-light leading-relaxed">
                        {stat.description}
                      </p>
                    </div>
                  </motion.div>

                </StatWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseForza;
