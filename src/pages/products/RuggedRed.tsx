import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DynamicMetaTags from '@/components/DynamicMetaTags';
import EdgeTrianglesBackground from '@/components/common/EdgeTrianglesBackground';

const RuggedRed = () => {
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  // Handle page transition animation
  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300); // Match the animation duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#1b3764] flex flex-col">
      <DynamicMetaTags
        title="Rugged Red - Industrial Cleaning Solutions"
        description="Professional industrial cleaning solutions from Rugged Red. Discover our premium cleaning products designed for demanding industrial applications."
        url="/products/ruggedred"
        type="website"
      />
      <Header />
      
      {/* Edge triangles positioned at left and right viewport edges */}
      <EdgeTrianglesBackground 
        leftImage="/Gradients and Triangles/Small Science Triangles 2.png"
        rightImage="/Gradients and Triangles/Small Science Triangles.png"
        opacity={0.6}
        scale={1.1}
        leftRotation={280}
        rightRotation={280}
        leftFlipH={false}
        rightFlipV={false}
        blendMode="overlay"
      />
      

      
            <main className="flex-1 pt-16 md:pt-20 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key="rugged-red-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {/* Hero Section */}
            <section className="relative py-12 md:py-16 mb-12 bg-gradient-to-br from-[#1B3764] via-[#1B3764] to-[#e53935] overflow-hidden min-h-[300px] md:min-h-[400px] lg:min-h-[650px]">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Text Content */}
                  <motion.div 
                    className="text-white relative z-20"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  >
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm font-medium uppercase tracking-wider">
                        INDUSTRIAL CLEANING SOLUTIONS
                      </span>
                    </div>

                                         <h1 className="mb-6">
                       <img 
                         src="https://ruggedred.com/images/RRMascot+Type-smaller.png" 
                         alt="Rugged Red Logo"
                         className="h-80 sm:h-96 md:h-[112] lg:h-[128] xl:h-[144] 2xl:h-[160] w-auto object-contain"
                       />
                     </h1>

                    <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                      Professional industrial cleaning solutions engineered for performance and reliability across all industries.
                    </p>
                  </motion.div>

                  {/* Rugged Red Bottles Hero Image */}
                  <motion.div 
                    className="flex justify-center lg:justify-end relative z-10"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                  >
                    <img 
                      src="https://ruggedred.com/images/B2BRRBottlesHeroImage.png" 
                      alt="Rugged Red Industrial Cleaning Products"
                      className="w-full max-w-md lg:max-w-none lg:w-[760px] xl:w-[840px] object-contain drop-shadow-2xl lg:translate-x-32 xl:translate-x-40 2xl:translate-x-48"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Full Viewport Rugged Red Products Section */}
            <section className="relative w-screen h-screen z-20 flex justify-center">
              <div className="w-full max-w-[1600px] h-full bg-white rounded-3xl overflow-hidden shadow-2xl">
                {/* Full viewport iframe for immersive experience */}
                <iframe
                  src="https://ruggedred.com/industrial/products#industrial-products"
                  title="Rugged Red Industrial Products - Full Viewport Experience"
                  className="w-full h-full border-0 rounded-3xl"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#F2611D #1b3764'
                  }}
                />
              </div>
              

            </section>
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default RuggedRed;
