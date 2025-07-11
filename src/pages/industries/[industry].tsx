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
import { allProducts } from '../../data/productsData';
import { motion } from 'framer-motion';
import XRayExplorer from '../../components/XRayExplorer';
import { CONSTRUCTION_DATA } from '../../data/construction';
import { MARINE_DATA } from '../../data/marine';
import { TRANSPORTATION_DATA } from '../../data/transportation';
import { INDUSTRIAL_DATA } from '../../data/industrial';
import { FOAM_DATA } from '../../data/foam';
import { COMPOSITES_DATA } from '../../data/composites';
import { INSULATION_DATA } from '../../data/insulation';
import { industrialDatasheet, getProductsByIndustry } from '../../data/industrialDatasheet';
import { INDUSTRIAL_PRODUCTS } from '../../data/industrialProducts';

const IndustryPage = () => {
  const { industry } = useParams();
  const industryData = industries.find(
    (ind) => ind.title.toLowerCase().replace(/\s+/g, '-') === industry
  );

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Helper function to get X-Ray data for the current industry
  const getXRayDataForIndustry = (industryTitle: string) => {
    const industryLower = industryTitle.toLowerCase();
    switch (industryLower) {
      case 'construction':
        return CONSTRUCTION_DATA;
      case 'marine':
        return MARINE_DATA;
      case 'transportation':
        return TRANSPORTATION_DATA;
      case 'composites':
        return COMPOSITES_DATA;
      case 'insulation':
        return INSULATION_DATA;
      default:
        return null;
    }
  };

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
        industries: product.industry,
        description: product.description
      }));
    }
    
    const datasheetProducts = getProductsByIndustry(industryLower);
    
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
      image: product.image,
      url: product.url,
      productType: product.category.toLowerCase() as 'bond' | 'seal' | 'tape',
      industries: product.industry,
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
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden z-10">
        <video
          key={industryData.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center z-[50] rounded-xl"
        >
          <source src={industryData.videoUrl} type="video/mp4" />
        </video>
      </section>

      {/* Title Overlap Container */}
      <div className="relative z-40 flex justify-center -mt-20">
        <div className="w-full px-10 py-4 bg-white text-center relative flex items-center justify-center">
          <h1 className="text-9xl md:text-11xl font-extrabold font-kallisto flex items-center" style={{ color: industryData.color || '#1b3764', marginTop: '-5rem' }}>
            {industryData.title.toUpperCase()}
            {industryData.logo && (
              <img
                src={industryData.logo}
                alt={industryData.title + ' logo'}
                className="inline-block align-middle ml-2 h-64 w-auto object-contain"
                loading="lazy"
              />
            )}
          </h1>
        </div>
      </div>

      {/* Dynamic Industry Headings Section */}
      {industryData.pageHeadline && (
        <section className="bg-white text-[#1b3764] py-16">
          <div className="w-full px-4 max-w-[1600px] mx-auto">
            <motion.h3 
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-center leading-tight font-kallisto text-[#1b3764]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {industryData.pageHeadline}
            </motion.h3>
            {industryData.supportingText && (
              <motion.div 
                className="max-w-4xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <div className="whitespace-pre-line">
                  {industryData.supportingText}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* X-Ray Explorer Section - For All Industries */}
      {getXRayDataForIndustry(industryData.title) && 
        getXRayDataForIndustry(industryData.title)!.xrays.map((xray, index) => (
          <XRayExplorer 
            key={xray.id}
            industry={getXRayDataForIndustry(industryData.title)!} 
            xrayIndex={index} 
          />
        ))
      }



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