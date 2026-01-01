import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFontSize } from '@/styles/typography';

const WhyChooseForza = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const stats = [
    { 
      value: '1979', 
      label: 'ESTABLISHED', 
      description: 'Decades of expertise',
      height: 0.35 // Starts low
    },
    { 
      value: '100%', 
      label: 'MADE IN USA*', 
      description: 'Quality guaranteed',
      height: 0.55 // Goes up
    },
    { 
      value: '24hr', 
      label: 'SUPPORT RESPONSE', 
      description: 'Always here to help', 
      link: '/contact',
      height: 0.75 // Goes up further
    },
    { 
      value: '500+', 
      label: 'FORMULATIONS', 
      description: 'Custom solutions',
      height: 0.95 // Highest point - like a checkmark/Verizon logo sweep
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative pt-16 pb-0 pl-0 pr-4 md:px-4 bg-gradient-to-bl from-[#477197] to-[#2c476e] overflow-hidden text-white isolation-auto border-b-2 border-[#F2611D] border-l-4 md:border-l-0 border-l-[#F2611D]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-6 md:mb-10">
          <motion.h2 
            className="font-normal font-poppins mb-4 tracking-tight"
            style={getFontSize('pageHeading')}
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

        {/* Stats Visualization - Vertical bars on mobile, horizontal on desktop */}
        <div className="relative pl-0 md:pl-12 pr-4 md:pr-12 pb-4 md:pb-0">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-3 md:gap-6 md:h-[350px] md:relative md:translate-x-[-12.5%] md:translate-x-[-0.75rem]">
            {stats.map((stat, index) => {
              const StatWrapper = stat.link ? Link : 'div';
              const wrapperProps = stat.link ? { to: stat.link, className: "relative w-full md:h-full group block" } : { className: "relative w-full md:h-full" };

              return (
                <StatWrapper key={index} {...wrapperProps}>
                  {/* Mobile: Horizontal bars extending from left border, text on top */}
                  <div className="flex md:hidden flex-col relative min-h-[70px] pl-6">
                    {/* Horizontal bar extending from left border - starts exactly at border with no gap */}
                    <motion.div 
                      className="absolute bottom-0 left-[-1.5rem] h-1 bg-[#F2611D] origin-left"
                      style={{ width: `calc(${stat.height * 100}% + 1.5rem)` }}
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 + (index * 0.3) + 0.3, ease: "circOut" }}
                    />
                    {/* Dot at the end of the underline - positioned at the omega (end) of the bar */}
                    <motion.div
                      className="absolute w-3 h-3 bg-[#F2611D] rounded-full shadow-[0_0_15px_rgba(242,97,29,0.6)]"
                      style={{ 
                        left: `${stat.height * 100}%`, 
                        bottom: '-4px',
                        transform: 'translateX(-50%)'
                      }}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + (index * 0.3) + 0.3 + 0.8, type: "spring" }}
                    />
                    
                    {/* Stat Content - sitting on top of horizontal bar */}
                    <div className="relative">
                      {/* Text content */}
                      <motion.div 
                        className="relative z-10 flex flex-col"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.2 + (index * 0.3) }}
                      >
                        <p 
                          className="text-white font-normal font-poppins mb-0.5 md:mb-1 text-[#F2611D]"
                          style={getFontSize('subsectionHeading')}
                        >
                          {stat.value}
                        </p>
                        <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-0.5 md:mb-1 font-poppins">
                          {stat.label}
                        </h4>
                        <p className="text-white/70 text-xs font-poppins font-light leading-relaxed mb-0.5 md:mb-1">
                          {stat.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Desktop: Original horizontal animated layout */}
                  <div className="hidden md:block relative h-full w-full">
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
                  </div>

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
