import React from 'react';
import { Link } from 'react-router-dom';
import HeaderV2 from '@/components/Header/HeaderV2';
import FooterV2 from '@/components/FooterV2';
import NewsletterSection from '@/components/NewsletterSection';
import { motion } from 'framer-motion';
import canisterPalletImage from '@/assets/images/canister-pallet-return-image.jpg';

const CanisterReturns = () => {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/EmptyCanister-ReturnForm 1.pdf';
    link.download = 'EmptyCanister-ReturnForm.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col relative">
      <HeaderV2 />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-bl from-[#477197] to-[#2c476e] py-20 md:py-32 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-poppins font-normal text-white mb-8"
            style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 48px)' }}
          >
            Empty Canister Returns
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={handleDownload}
              className="bg-[#F2611D] hover:bg-[#F2611D]/90 text-white font-medium font-poppins px-8 py-3 rounded-full transition-all duration-300"
            >
              Download Form
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          
          {/* Top Section: Policy & Preparation - Full Width */}
          <div className="space-y-10 mb-12">
            {/* Policy Text */}
            <div>
              <h2 className="font-poppins font-bold text-[#1B3764] mb-4" style={{ fontSize: 'clamp(24px, 2vw + 0.5rem, 32px)' }}>
                Empty Canister Policy and Procedures
              </h2>
              <div className="font-poppins text-lg text-gray-700 leading-relaxed max-w-none">
                <p>
                  As a convenience to our customers and a green initiative, Forza will pay the shipping charges to return used and empty intermediate returnable canisters.
                </p>
              </div>
            </div>

            {/* Preparation Text */}
            <div>
              <h3 className="font-poppins font-bold text-[#1B3764] mb-4" style={{ fontSize: 'clamp(20px, 1.8vw + 0.5rem, 28px)' }}>
                Preparation
              </h3>
              <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-none">
                For shipping and handling economies, we request that the intermediates be aggregated into groups 9 per pallet, palletized and shrink wrapped or strapped in place.
              </p>
            </div>
          </div>

          {/* Bottom Section: Process & Example */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left Column - Process Text */}
            <div className="lg:col-span-2">
              <div>
                <h3 className="font-poppins font-bold text-[#1B3764] mb-6" style={{ fontSize: 'clamp(20px, 1.8vw + 0.5rem, 28px)' }}>
                  Process for Returning Empty Canisters
                </h3>
                <div className="space-y-4 font-poppins text-lg text-gray-700 leading-relaxed">
                  <p>Canisters must be returned and pallet must be filled.</p>
                  <p>Canisters must be securely fastened to pallet.</p>
                  <p>Form at link must be filled out completely and returned via email to: <a href="mailto:Support@forzabuilt.com" className="text-[#F2611D] hover:underline font-bold">Support@forzabuilt.com</a></p>
                  <p>Failure to meet full pallet requirement will result in shipping charges.</p>
                  <p>Failure to return empty canisters may result in a core fee being assessed.</p>
                  <p>After receiving an email from Forza containing the Bill of Lading and RMA documents, the Requester is responsible for attaching the RMA document securely to the pallet and handing over the BOL to the driver picking up the pallet.</p>
                  
                  <p className="pt-4">
                    Thank you for your help and cooperation.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Example Illustration */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100">
                <h4 className="font-poppins font-medium text-[#1B3764] text-2xl mb-4 pl-2">
                  Example:
                </h4>
                
                <div className="flex justify-center mb-0">
                   <img 
                    src={canisterPalletImage} 
                    alt="9 Intermediate/108L Canisters Per Pallet"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Page Banner - Form Download */}
      <section className="relative bg-gradient-to-bl from-[#477197] to-[#2c476e] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Form Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div 
                  className="transform rotate-3 origin-center shadow-2xl"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotate(3deg) translateZ(0)',
                    outline: '1px solid transparent'
                  }}
                >
                  <img 
                    src="/EmptyCanister-ReturnForm-mockupimage.png"
                    alt="Empty Canisters Return Form"
                    className="w-full h-auto shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Right: Text and Download Button */}
            <div className="text-white">
              <motion.h2
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-poppins font-normal mb-4"
                style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 48px)' }}
              >
                Empty Canister Returns
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl font-poppins mb-6 text-white/90"
              >
                Download our Empty Canister Return Form
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm font-poppins mb-8 text-white/80"
              >
                Note: Mobile users may need to select "Save to Files" option on the PDF form to fill out the fields digitally.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button
                  onClick={handleDownload}
                  className="bg-[#F2611D] hover:bg-[#F2611D]/90 text-white font-medium font-poppins px-8 py-3 rounded-full transition-all duration-300"
                >
                  Download
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FooterV2 />
    </div>
  );
};

export default CanisterReturns;
