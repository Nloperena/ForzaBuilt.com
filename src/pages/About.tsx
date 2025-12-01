import React from 'react';
import HeaderV2 from '@/components/Header/HeaderV2';
import FooterV2 from '@/components/FooterV2';
import AboutIdentityCards from '@/components/AboutIdentityCards';
import ApproachSectionUnified from '@/components/ApproachSectionUnified';
import IndustriesSectionAlt from '@/components/IndustriesSectionAlt';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col relative overflow-x-hidden">
      <HeaderV2 />
      
      <div className="flex-1 relative">
        
        {/* Hero Section - Gradient Background */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-4 text-center z-20 bg-gradient-to-bl from-[#477197] to-[#2c476e]">
          <motion.div 
            className="max-w-[1400px] mx-auto flex flex-col items-center justify-center gap-4 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="font-black mb-0 leading-none font-kallisto text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              ABOUT US
            </h1>
            <h3 className="font-regular text-center leading-tight font-poppins text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-4xl mt-4">
              High-Performance Adhesive Solutions<br />
              Engineered & Manufactured in the USA.
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-3 bg-[#F2611D] text-white font-bold rounded-full hover:bg-[#F2611D]/80 transition-colors font-poppins shadow-lg"
              >
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-full hover:bg-white/30 transition-colors font-poppins shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Meet Forza Video Section with Value Props - White Background */}
        <section className="relative z-20 py-16 md:py-24 px-4 bg-white">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-2">
              <div className="relative w-full aspect-video bg-gray-100 rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/DjI8bEcu6FI?autoplay=0&rel=0"
                  title="Meet Forza in 60 seconds"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full object-cover"
                ></iframe>
              </div>
              <div className="mt-4 text-sm text-[#1B3764]/60 font-poppins">
                <details>
                  <summary className="cursor-pointer hover:text-[#F2611D] transition-colors font-medium">Video Transcript / Summary</summary>
                  <p className="mt-2 pl-4 border-l-2 border-[#F2611D]/20">
                    Forza is a US-based manufacturer of high-performance adhesives, sealants, and tapes. We combine vertically integrated manufacturing with in-house R&D to deliver custom solutions for industrial applications. From transportation to marine, our products are engineered for durability and performance.
                  </p>
                </details>
              </div>
            </div>
            
            <div className="lg:col-span-1 space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-bold font-kallisto mb-4 text-[#1B3764]">Meet Forza in 60 Seconds</h3>
                <p className="text-[#1B3764]/80 font-poppins mb-8 leading-relaxed text-lg">
                  We engineer superior adhesives, sealants, and tapes for the toughest industrial applications. From marine to transportation, we provide solutions that last.
                </p>
                <ul className="space-y-4 text-left mb-8">
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
                      <span className="text-[#1B3764] font-bold font-poppins">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-3 bg-[#F2611D] text-white font-bold rounded-full hover:bg-[#F2611D]/80 transition-colors font-poppins shadow-lg"
                >
                  Talk to an Engineer
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Identity Cards Section - Light Grey Background */}
        <div className="relative z-20 py-16 bg-[#f5f7fa]">
          <AboutIdentityCards />
        </div>

        {/* Mission & Manufacturing - White Background */}
        <section className="relative py-20 px-4 max-w-[1400px] mx-auto z-20 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-black font-kallisto text-4xl md:text-6xl leading-none text-[#1B3764]">
                Our Mission
              </h2>
              <p className="text-lg md:text-xl font-poppins text-[#1B3764]/80 leading-relaxed">
                To empower manufacturers with adhesive solutions that improve efficiency, reduce costs, and enhance product durability. We don't just sell glue; we solve bonding challenges.
              </p>
              <p className="text-lg md:text-xl font-poppins text-[#1B3764]/80 leading-relaxed">
                With complete in-house R&D and manufacturing capabilities, we can develop, test, and produce custom formulations faster than anyone in the industry.
              </p>
            </motion.div>
            <motion.div
              className="relative bg-gradient-to-bl from-[#477197] to-[#2c476e] rounded-2xl p-10 shadow-2xl text-white"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-white/20 pb-4 gap-4">
                <h3 className="text-2xl font-bold font-kallisto">What We Manufacture</h3>
                <Link 
                  to="/products"
                  className="text-sm font-bold font-poppins bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
                >
                  Explore Products
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Link to="/products/structural-adhesives" className="space-y-2 group cursor-pointer">
                  <h4 className="font-bold text-white font-poppins text-lg group-hover:text-[#F2611D] transition-colors flex items-center gap-2">
                    Structural Adhesives
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </h4>
                  <p className="text-sm text-white/80 font-poppins group-hover:text-white">High-strength bonding for metals, composites & plastics.</p>
                </Link>
                <Link to="/products/sealants" className="space-y-2 group cursor-pointer">
                  <h4 className="font-bold text-white font-poppins text-lg group-hover:text-[#F2611D] transition-colors flex items-center gap-2">
                    Sealants
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </h4>
                  <p className="text-sm text-white/80 font-poppins group-hover:text-white">Advanced MS Polymers, Silicones & Urethanes.</p>
                </Link>
                <Link to="/products/tapes" className="space-y-2 group cursor-pointer">
                  <h4 className="font-bold text-white font-poppins text-lg group-hover:text-[#F2611D] transition-colors flex items-center gap-2">
                    Industrial Tapes
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </h4>
                  <p className="text-sm text-white/80 font-poppins group-hover:text-white">VHB replacements, masking, & surface protection.</p>
                </Link>
                <Link to="/products/cleaning-solutions" className="space-y-2 group cursor-pointer">
                  <h4 className="font-bold text-white font-poppins text-lg group-hover:text-[#F2611D] transition-colors flex items-center gap-2">
                    Cleaning Solutions
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </h4>
                  <p className="text-sm text-white/80 font-poppins group-hover:text-white">Industrial-grade surface prep & removers.</p>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Forza / Stats Section - Gradient Break */}
        <section className="relative py-20 px-4 bg-gradient-to-bl from-[#477197] to-[#2c476e] z-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-black font-kallisto text-4xl md:text-5xl text-white mb-4">Why Choose Forza?</h2>
              <p className="text-xl text-white/90 font-poppins">Performance proof that speaks for itself.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-5xl md:text-6xl font-black text-white font-kallisto">1979</div>
                <p className="text-white/90 font-bold font-poppins text-lg">Established</p>
                <p className="text-sm text-white/70 font-poppins">Decades of expertise</p>
              </div>
              <div className="space-y-2">
                <div className="text-5xl md:text-6xl font-black text-white font-kallisto">100%</div>
                <p className="text-white/90 font-bold font-poppins text-lg">Made in USA</p>
                <p className="text-sm text-white/70 font-poppins">Quality controlled</p>
              </div>
              <div className="space-y-2">
                <Link to="/contact" className="block group">
                  <div className="text-5xl md:text-6xl font-black text-white font-kallisto group-hover:text-[#F2611D] transition-colors">24hr</div>
                  <p className="text-white/90 font-bold font-poppins text-lg flex items-center justify-center gap-1">
                    Support Response
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </p>
                  <p className="text-sm text-white/70 font-poppins">Always here to help</p>
                </Link>
              </div>
              <div className="space-y-2">
                <div className="text-5xl md:text-6xl font-black text-white font-kallisto">500+</div>
                <p className="text-white/90 font-bold font-poppins text-lg">Formulations</p>
                <p className="text-sm text-white/70 font-poppins">Custom solutions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <div className="relative z-20">
          <ApproachSectionUnified />
        </div>

        {/* Industries Links - White Background */}
        <section className="relative py-20 px-4 z-20 bg-white">
          <IndustriesSectionAlt />
        </section>

        {/* Final CTA - Light Grey */}
        <section className="relative py-24 px-4 bg-[#f5f7fa] text-center z-20">
          <motion.div 
            className="max-w-4xl mx-auto space-y-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-lg md:text-2xl font-poppins leading-relaxed text-[#1B3764]/80 space-y-8">
              <p>
                <span className="font-bold text-[#1B3764]">Why Forza?</span> Forza means force in Italian. It's also synonymous with Strength. And for us, strength is an all-encompassing commitment. Simply put, we do nothing for our customers half-hearted. Everything we do and every product solution we provide are full-strength, at all times.
              </p>
              <p>
                At Forza, we do what other manufacturers won't.
                That means finding a better solution is just the beginning.
              </p>
              <p>
                If you're looking to take your projects, your results, and your
                business to the next level, we're ready to over-deliver for you.
              </p>
            </div>

            <div className="pt-8">
              <p className="text-3xl md:text-5xl font-black font-kallisto text-[#1B3764] mb-8">
                Our Team. Our Science. Your Force.
              </p>
              
              <Link
                to="/contact"
                className="inline-flex items-center px-12 py-5 bg-[#F2611D] text-white text-xl font-bold rounded-full hover:bg-[#F2611D]/80 transition-colors font-poppins shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Talk to an Engineer
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
      
      <FooterV2 />
    </div>
  );
};

export default About;
