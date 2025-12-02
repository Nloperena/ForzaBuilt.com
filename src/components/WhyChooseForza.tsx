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
      className="relative pt-16 pb-0 px-4 bg-gradient-to-bl from-[#477197] to-[#2c476e] overflow-hidden text-white isolation-auto border-b-2 border-[#F2611D]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-14 md:mb-16">
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
        <div className="relative h-[350px] px-4 md:px-12 pb-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 h-full relative" style={{ transform: 'translateX(calc(-12.5% - 0.75rem))' }}>
            {stats.map((stat, index) => {
              const StatWrapper = stat.link ? Link : 'div';
              const wrapperProps = stat.link ? { to: stat.link, className: "relative h-full w-full group block" } : { className: "relative h-full w-full" };

              return (
                <StatWrapper key={index} {...wrapperProps}>
                  
                  {/* Line/Sceptre - Absolute positioned from bottom */}
                  <motion.div 
                    className="absolute bottom-0 left-1/2 w-1 bg-[#F2611D] origin-bottom"
                    style={{ height: `${stat.height * 100}%`, x: "-50%" }}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + (index * 1.2), ease: "circOut" }}
                  />

                  {/* Dot at top of line - Separated to prevent scaling distortion */}
                  <motion.div 
                    className="absolute left-1/2 w-4 h-4 bg-[#F2611D] rounded-full shadow-[0_0_15px_rgba(242,97,29,0.6)]"
                    style={{ bottom: `calc(${stat.height * 100}% - 8px)`, x: "-50%" }} 
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + (index * 1.2) + 0.8, type: "spring" }}
                  />
                  
                  {/* Stat Content - Right aligned to the dot */}
                  <motion.div 
                    className="absolute left-[calc(50%+1rem)] w-full max-w-[220px] flex justify-start z-10 text-left"
                    style={{ top: `calc(100% - ${stat.height * 100}% - 1.5rem)` }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 1.2) + 0.8 }}
                  >
                    <div className="w-full">
                      <p 
                        className="text-white font-normal font-poppins mb-2 text-[#F2611D]"
                        style={{ fontSize: 'clamp(2.625rem, 3.5vw + 0.7rem, 3.15rem)' }}
                      >
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
