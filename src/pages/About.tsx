import React, { useState, useRef, useEffect } from 'react';
import HeaderV2 from '@/components/Header/HeaderV2';
import FooterV2 from '@/components/FooterV2';
import ApproachSectionUnified from '@/components/ApproachSectionUnified';
import ExperienceBetterBanner from '@/components/ExperienceBetterBanner';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import VideoSkeleton from '@/components/common/VideoSkeleton';
import WhyChooseForza from '@/components/WhyChooseForza';

// Utility function to prevent orphaned words (single words on last line)
// Processes each sentence separately to ensure no single-word orphans
// Uses non-breaking spaces to keep at least 2 words together on the last line
const preventOrphans = (text: string): string => {
  // Split by sentence endings (., !, ?) but preserve them
  const sentenceParts = text.split(/([.!?]\s+)/);
  
  return sentenceParts.map((part, index) => {
    // Skip punctuation-only fragments (they're part of the previous sentence)
    if (part.match(/^[.!?]\s*$/)) {
      return part;
    }
    
    // Process actual sentence content
    const trimmed = part.trim();
    if (!trimmed) return part;
    
    const words = trimmed.split(/\s+/);
    
    // If there are less than 3 words, return as is
    if (words.length < 3) {
      return part;
    }
    
    // For longer sentences, ensure the last 2-3 words stick together
    // This prevents orphans more effectively
    const wordsToKeepTogether = words.length >= 4 ? 3 : 2;
    const lastWords = words.slice(-wordsToKeepTogether).join('\u00A0'); // \u00A0 is non-breaking space
    const remainingWords = words.slice(0, -wordsToKeepTogether);
    
    // Reconstruct with non-breaking spaces
    const result = remainingWords.length > 0 
      ? [...remainingWords, lastWords].join(' ')
      : lastWords;
    
    // Preserve original whitespace at the end if it exists
    const trailingWhitespace = part.match(/\s+$/)?.[0] || '';
    
    return result + trailingWhitespace;
  }).join('');
};

// Why Choose Forza Stats - Circles at top with thin stems extending down
const RaisingBarsStats = () => {
  // This component has been replaced by WhyChooseForza.tsx and can be removed
  return null;
};

const About = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const heroVideoUrlMobile = '/videos/backgrounds/Forza Building Video for Mobile.mp4';
  const heroVideoUrlDesktop = '/videos/backgrounds/Forza Building Video for Desktop.mp4';

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!videoLoaded) {
        console.warn('About page video took too long to load, showing fallback');
        setVideoLoaded(true);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [videoLoaded]);

  const handleVideoLoad = () => {
    console.log('About page video loaded successfully');
    setVideoLoaded(true);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = e.currentTarget;
    const error = videoElement.error;
    if (error) {
      console.error('Video error details:', {
        code: error.code,
        message: error.message,
        networkState: videoElement.networkState,
        readyState: videoElement.readyState,
        currentSrc: videoElement.currentSrc
      });
    }
    console.warn('About page video failed to load, showing fallback', e);
    setVideoError(true);
    setVideoLoaded(true);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col relative overflow-x-hidden">
      <HeaderV2 />
      
      <div className="flex-1 relative">
        {/* Hero Video Section - Above the fold */}
        <section className="relative h-[60vh] md:h-[88vh] overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] md:pt-12 2xl:pt-0">
          {!videoLoaded && <VideoSkeleton />}
          
          <video
            key={`${heroVideoUrlMobile}-${heroVideoUrlDesktop}`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoad}
            onCanPlay={handleVideoLoad}
            onError={handleVideoError}
            onLoadStart={() => console.log('About page video loading started')}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              videoLoaded && !videoError ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              zIndex: 1,
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%'
            }}
          >
            <source src={heroVideoUrlDesktop} type="video/mp4" media="(min-width: 768px)" />
            <source src={heroVideoUrlMobile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-[#2c476e] to-[#81899f]" style={{ zIndex: 0 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2c476e]/60 to-[#81899f]/60" style={{ zIndex: 2 }} />

          {/* Subtitle Overlay - Centered on video */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none" style={{ zIndex: 20 }}>
            <motion.h3
              className="font-regular text-center leading-tight font-poppins text-white"
              style={{ 
                fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 4.5rem)',
                maxWidth: '1100px'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              30 Years of Engineering Superior Adhesives Sealants and Tapes
            </motion.h3>
          </div>
        </section>

        {/* Meet Forza Section - Story text first, then bullets, then video */}
        <section className="relative z-20 pt-8 pb-16 md:pt-12 md:pb-24 px-4 bg-white">
          <div className="max-w-[1400px] mx-auto space-y-12">
            {/* Story Text Section */}
            <motion.div
              className="max-w-4xl mx-auto space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Why Forza Title */}
              <h2 
                className="font-poppins leading-none text-[#1B3764] mb-4 text-center" 
                style={{ fontSize: 'clamp(28px, 3vw, 56px)' }}
              >
                Why Forza
              </h2>
              
              {/* Story paragraphs */}
              <div className="space-y-6 text-lg md:text-xl font-poppins text-[#1B3764]/80 leading-relaxed">
                <p>
                  {preventOrphans("Forza means force in Italian. It's also synonymous with Strength. And for us, strength is an all-encompassing commitment. Simply put, we do nothing for our customers half-hearted. Everything we do and every product solution we provide are full-strength, at all times.")}
                </p>
                <p>
                  {preventOrphans("At Forza, we do what other manufacturers won't. That means finding a better solution is just the beginning.")}
                </p>
                <p>
                  {preventOrphans("If you're looking to take your projects, your results, and your business to the next level, we're ready to over-deliver for you.")}
                </p>
              </div>
            </motion.div>

            {/* Bullet Points Section */}
            <motion.div
              className="max-w-4xl mx-auto pb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ul className="space-y-4">
                {[
                  "Vertically Integrated USA Manufacturing",
                  "Custom Formulations & Quick Turnaround",
                  "Dedicated Engineering Support"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#F2611D] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[#1B3764] font-bold font-poppins text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative w-full aspect-video bg-gray-100 rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* TODO: Update video URL or handle logo change */}
                <iframe
                  src="https://www.youtube.com/embed/DjI8bEcu6FI?autoplay=1&mute=1&loop=1&playlist=DjI8bEcu6FI&cc_load_policy=1&rel=0&controls=1"
                  title="Meet Forza in 60 seconds"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-sm text-[#1B3764]/60 font-poppins">
                <details>
                  <summary className="cursor-pointer hover:text-[#F2611D] transition-colors font-medium">
                    Video Transcript / Summary
                  </summary>
                  <p className="mt-2 pl-4 border-l-2 border-[#F2611D]/20">
                    {preventOrphans("Forza is a US-based manufacturer of high-performance adhesives, sealants, and tapes. We combine vertically integrated manufacturing with in-house R&D to deliver custom solutions for industrial applications. From transportation to marine, our products are engineered for durability and performance.")}
                  </p>
                </details>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Manufacturing Section */}
        <section className="relative w-full py-20 z-20 bg-[#f5f7fa]">
          <div className="max-w-[1400px] xl:max-w-[1600px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Our Mission */}
            <motion.div 
              className="space-y-6 p-8 md:p-12 rounded-2xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h2 
                  className="font-poppins leading-none text-[#1B3764] mb-4" 
                  style={{ fontSize: 'clamp(28px, 3vw, 56px)' }}
                >
                  Our Mission
                </h2>
                {/* Orange line */}
                <div className="w-40 h-1 bg-[#F2611D] mb-6" />
              </div>
              <p className="text-lg md:text-xl font-poppins text-[#1B3764]/80 leading-relaxed">
                {preventOrphans("To empower manufacturers with adhesive solutions that improve efficiency, reduce costs, and enhance product durability. We don't just sell glue; we solve bonding challenges.")}
              </p>
              <p className="text-lg md:text-xl font-poppins text-[#1B3764]/80 leading-relaxed">
                {preventOrphans("With complete in-house R&D and manufacturing capabilities, we can develop, test, and produce custom formulations faster than anyone in the industry.")}
              </p>
            </motion.div>
            
            {/* What We Manufacture */}
            <motion.div
              className="relative bg-gradient-to-bl from-[#477197] to-[#2c476e] rounded-2xl p-12 text-white"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <h3 
                  className="font-poppins mb-4" 
                  style={{ fontSize: 'clamp(28px, 2.5vw + 0.3rem, 52px)' }}
                >
                  What We Manufacture
                </h3>
                {/* Orange line */}
                <div className="w-80 h-1 bg-[#F2611D] mb-6" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <Link to="/products/structural-adhesives" className="space-y-2 group cursor-pointer">
                  <h4 className="text-white font-poppins text-lg group-hover:text-[#F2611D] transition-colors flex items-center gap-2">
                    Structural Adhesives
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </h4>
                  <p className="text-sm text-slate-300 font-poppins group-hover:text-white">High-strength bonding for metals, composites & plastics.</p>
                </Link>
                <Link to="/products/sealants" className="space-y-2 group cursor-pointer">
                  <h4 className="text-white font-poppins text-lg group-hover:text-[#F2611D] transition-colors flex items-center gap-2">
                    Sealants
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </h4>
                  <p className="text-sm text-slate-300 font-poppins group-hover:text-white">Advanced MS Polymers, Silicones & Urethanes.</p>
                </Link>
                <Link to="/products/tapes" className="space-y-2 group cursor-pointer">
                  <h4 className="text-white font-poppins text-lg group-hover:text-[#F2611D] transition-colors flex items-center gap-2">
                    Industrial Tapes
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </h4>
                  <p className="text-sm text-slate-300 font-poppins group-hover:text-white">VHB replacements, masking, & surface protection.</p>
                </Link>
                <Link to="/products/cleaning-solutions" className="space-y-2 group cursor-pointer">
                  <h4 className="text-white font-poppins text-lg group-hover:text-[#F2611D] transition-colors flex items-center gap-2">
                    Cleaning Solutions
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </h4>
                  <p className="text-sm text-slate-300 font-poppins group-hover:text-white">Industrial-grade surface prep & removers.</p>
                </Link>
              </div>
              
              {/* See Products Button */}
              <div className="mt-8">
                <Link
                  to="/products"
                  className="inline-flex items-center px-8 py-3 bg-[#F2611D] text-white font-normal rounded-full hover:bg-[#F2611D]/80 transition-colors font-poppins shadow-lg"
                >
                  See Products
                </Link>
              </div>
            </motion.div>
          </div>
          </div>
        </section>

        {/* Why Choose Forza - Raising Bars Animation */}
        <WhyChooseForza />

        {/* Approach Section */}
        <div className="relative z-20">
          <ApproachSectionUnified />
        </div>

        {/* Performance. Elevated. Animation Section */}
        <section className="relative py-24 px-4 bg-[#f5f7fa] z-20">
          <ExperienceBetterBanner textColor="#1B3764" highlightColor="#F2611D" />
        </section>
      </div>
      
      <FooterV2 />
    </div>
  );
};

export default About;
