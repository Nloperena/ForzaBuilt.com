import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { industries } from '../../data/industries';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductChemistriesSection from '../../components/ProductChemistriesSection';
import DynamicIndustryCards from '../../components/StackableCards/DynamicIndustryCards';
import DynamicProductsSection from '../../components/DynamicProductsSection';
import MarineProductsGrid from '../../components/MarineProductsGrid';
import IndustryBrochureSection from '../../components/IndustryBrochureSection';
import ConstructionProductSelection from '../../components/ConstructionProductSelection';
import XRayExplorer from '../../components/xray/XRayExplorer';
import { MARINE_DATA } from '../../data/industries/marine';
import { CONSTRUCTION_DATA } from '../../data/industries/construction';
import { TRANSPORTATION_DATA } from '../../data/industries/transportation';
import { COMPOSITES_DATA } from '../../data/industries/composites';
import { INSULATION_DATA } from '../../data/industries/insulation';

import { allProducts } from '../../data/productsData';
import { motion } from 'framer-motion';

import { INDUSTRIAL_PRODUCTS } from '../../data/industrialProducts';
import { byIndustry } from '@/utils/products';

const IndustryPage = () => {
  const { industry } = useParams();
  const industryData = industries.find(
    (ind) => ind.title.toLowerCase().replace(/\s+/g, '-') === industry
  );

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);



  // Helper function to convert datasheet products to component format
  const convertDatasheetToProducts = (industryName: string) => {
    const industryLower = industryName.toLowerCase();
    
    // Use dedicated industrial products for industrial industry
    if (industryLower === 'industrial') {
      return INDUSTRIAL_PRODUCTS.map(product => ({
        id: product.id,
        name: product.name,
        image: product.image,
        url: product.url,
        productType: product.category.toLowerCase() as 'bond' | 'seal' | 'tape',
        industries: Array.isArray(product.industry) ? product.industry : [product.industry],
        description: product.description
      }));
    }
    
    const datasheetProducts = byIndustry(industryLower);
    
    // If no datasheet products found, fall back to allProducts for that industry
    if (datasheetProducts.length === 0) {
      const fallbackProducts = allProducts.filter(product => 
        product.industries.includes(industryLower)
      );
      return fallbackProducts;
    }
    
    return datasheetProducts.map(product => ({
      id: product.id,
      name: product.name,
      image: product.mainImage || product.image,
      url: product.url,
      productType: product.category.toLowerCase() as 'bond' | 'seal' | 'tape',
      industries: Array.isArray(product.industry) ? product.industry : [product.industry],
      description: product.description
    }));
  };

  useEffect(() => {
    if (expandedIndex === null) return;
    const handleClick = (e: MouseEvent) => {
      const card = document.getElementById(`product-card-${expandedIndex}`);
      if (card && !card.contains(e.target as Node)) {
        setExpandedIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [expandedIndex]);



  if (!industryData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1b3764] text-white">
        <h1 className="text-4xl font-extrabold mb-4 font-kallisto">Industry Not Found</h1>
        <p className="text-lg">Sorry, we couldn't find the industry you're looking for.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#1b3764] min-h-screen flex flex-col">
      <Header />
      {/* Hero Banner */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden z-10">
        <video
          key={industryData.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center z-[50] rounded-xl"
        >
          <source src={industryData.videoUrl} type="video/mp4" />
        </video>
      </section>

      {/* Title Overlap Container */}
      <div className="relative z-40 flex justify-center -mt-20">
        <div className="w-full px-4 sm:px-6 md:px-10 py-4 bg-white text-center relative flex items-center justify-center">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black text-white mb-1 sm:mb-2 md:mb-4 leading-none break-words w-full font-kallisto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4" style={{ color: industryData.color || '#1b3764' }}>
                            <span className="leading-none">{industryData.title.toUpperCase()}</span>
            {industryData.logo && (
              <img
                src={industryData.logo}
                alt={industryData.title + ' logo'}
                className="inline-block align-middle h-16 sm:h-24 md:h-32 lg:h-48 xl:h-64 w-auto object-contain"
                loading="lazy"
              />
            )}
          </h1>
        </div>
      </div>

      {/* Dynamic Industry Headings Section */}
      {industryData.pageHeadline && (
        <section className="bg-white text-[#1b3764] py-8 sm:py-12 md:py-16">
          <div className="w-full px-4 sm:px-6 max-w-[1600px] mx-auto">
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Industry Icon */}
              {industryData.title.toLowerCase() === 'marine' && (
                <img 
                  src="/src/assets/SVG/Marine SVG 1.svg"
                  alt="Marine Industry Icon"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                />
              )}
              {industryData.title.toLowerCase() === 'construction' && (
                <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-[#1b3764]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              )}
              {industryData.title.toLowerCase() === 'transportation' && (
                <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-[#1b3764]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                  <path d="M16 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                  <path d="M7 16V4H5v12h2zm10 0V4h-2v12h2z"/>
                  <path d="M7 16V4H5v12h2zm10 0V4h-2v12h2z"/>
                </svg>
              )}
              {industryData.title.toLowerCase() === 'composites' && (
                <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-[#1b3764]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              )}
              {industryData.title.toLowerCase() === 'insulation' && (
                <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-[#1b3764]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              )}
              <h3 
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black text-center leading-none break-words font-kallisto text-[#1b3764]"
              >
                {industryData.pageHeadline}
              </h3>
            </motion.div>
            {industryData.supportingText && (
              <motion.div 
                className="max-w-4xl mx-auto text-base sm:text-lg md:text-xl text-gray-900 leading-relaxed px-4 sm:px-6 md:px-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <div className="whitespace-pre-line font-semibold text-center">
                  {industryData.supportingText}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* X-Ray Explorer Sections */}
      {industryData.title.toLowerCase() === 'marine' && (
        <>
          <section className="bg-white">
            <XRayExplorer industry={MARINE_DATA} xrayIndex={0} />
          </section>
          <section className="bg-white">
            <XRayExplorer industry={MARINE_DATA} xrayIndex={1} />
          </section>
        </>
      )}

      {industryData.title.toLowerCase() === 'construction' && (
        <>
          <section className="bg-white">
            <XRayExplorer industry={CONSTRUCTION_DATA} xrayIndex={0} />
          </section>
          <section className="bg-white">
            <XRayExplorer industry={CONSTRUCTION_DATA} xrayIndex={1} />
          </section>
        </>
      )}

      {industryData.title.toLowerCase() === 'transportation' && (
        <>
          <section className="bg-white">
            <XRayExplorer industry={TRANSPORTATION_DATA} xrayIndex={0} />
          </section>
          <section className="bg-white">
            <XRayExplorer industry={TRANSPORTATION_DATA} xrayIndex={1} />
          </section>
        </>
      )}

      {industryData.title.toLowerCase() === 'composites' && (
        <section className="bg-white">
          <XRayExplorer industry={COMPOSITES_DATA} xrayIndex={0} />
        </section>
      )}

      {industryData.title.toLowerCase() === 'insulation' && (
        <>
          <section className="bg-white">
            <XRayExplorer industry={INSULATION_DATA} xrayIndex={0} />
          </section>
          <section className="bg-white">
            <XRayExplorer industry={INSULATION_DATA} xrayIndex={1} />
          </section>
        </>
      )}

      {/* Stackable Cards Section */}
      <DynamicIndustryCards />



      {/* Scroll Stack Cards Section */}



      {/* Dynamic Products Section */}
      {convertDatasheetToProducts(industryData.title).length > 0 && (
        <DynamicProductsSection 
          industry={industryData.title}
          products={convertDatasheetToProducts(industryData.title)}
        />
      )}

      {/* Chemistries Section */}
      <ProductChemistriesSection />

      {/* Industry Brochure Section */}
      <IndustryBrochureSection industry={industryData.title} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default IndustryPage; 