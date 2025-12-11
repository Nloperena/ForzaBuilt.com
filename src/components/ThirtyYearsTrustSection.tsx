import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ThirtyYearsTrustSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const badgeScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const headingY = useTransform(scrollYProgress, [0, 1], [30, -20]);
  const chipsOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 1, 1]);

  return (
    <section ref={sectionRef} className="relative z-10 w-full min-h-[70vh] md:min-h-[80vh] bg-gradient-to-b from-[#115B87] to-[#1B3764] text-white overflow-hidden">
      {/* Full-bleed animated background that layers into adjacent sections */}
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="pointer-events-none absolute -inset-y-24 -inset-x-0"
      >
        {/* Brand orange glow accents */}
        <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-[#F2611D]/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[48rem] h-[48rem] rounded-full bg-[#F16022]/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[32rem] h-[32rem] rounded-full bg-white/10 blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="relative w-full px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-[1500px] mx-auto grid lg:[grid-template-columns:_auto_1fr] gap-4 md:gap-6 lg:gap-6 items-center justify-items-center lg:justify-items-start">
          {/* Badge - animated scale/rotate on scroll */}
          <div className="flex justify-center lg:justify-end lg:pr-4">
            <motion.div style={{ scale: badgeScale, rotate: badgeRotate }} className="relative">
              <div className="relative w-[14rem] sm:w-[18rem] md:w-[22rem] lg:w-[22rem]">
                <img src="/logos/30 Years Badge.svg" alt="30 Years of Experience" className="w-full h-auto drop-shadow-2xl" />
              </div>
            </motion.div>
          </div>

          {/* Copy */}
          <div className="text-center lg:text-left lg:pl-2">
            <motion.h2
              style={{ y: headingY }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-kallisto font-black leading-[1.05]"
            >
              30 Years of Proven Adhesive Sealant and Tape Expertise
            </motion.h2>
            <motion.p
              style={{ opacity: chipsOpacity }}
              className="mt-4 text-white/90 text-base md:text-lg max-w-3xl mx-auto lg:mx-0"
            >
              Engineering-driven solutions and application support trusted across transportation, marine, construction, and industrial manufacturing.
            </motion.p>

            {/* Trust chips */}
            <motion.div
              style={{ opacity: chipsOpacity }}
              className="mt-6 flex flex-wrap items-center gap-2 justify-center lg:justify-start"
            >
              <span className="px-3 py-1.5 rounded-full text-xs md:text-sm bg-white/10 backdrop-blur-md border border-white/10">
                Application Engineering
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs md:text-sm bg-white/10 backdrop-blur-md border border-white/10">
                Consistent Quality
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs md:text-sm bg-white/10 backdrop-blur-md border border-white/10">
                High‑Performance Chemistries
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirtyYearsTrustSection;


