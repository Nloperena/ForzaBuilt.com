import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { industries } from '../../data/industries';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductChemistriesSection from '../../components/ProductChemistriesSection';
import ServiceCardStack from '../../components/ServiceCardStack';
import XRayWipe from '../../components/XRayWipe';
import InteractiveBuildingMap from '../../components/InteractiveBuildingMap';
import MarineProductsGrid from '../../components/MarineProductsGrid';
import MarineBrochureSection from '../../components/MarineBrochureSection';
import ApplicationsModal from '../../components/ApplicationsModal';
import { motion } from 'framer-motion';

const IndustryPage = () => {
  const { industry } = useParams();
  const industryData = industries.find(
    (ind) => ind.title.toLowerCase().replace(/\s+/g, '-') === industry
  );

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasReached100, setHasReached100] = useState(false);
  const [hasBeenManuallyClosed, setHasBeenManuallyClosed] = useState(false);
  const [modalOpacity, setModalOpacity] = useState(0);
  const [xrayProgress, setXrayProgress] = useState(0);

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

  // Handle X-Ray progress changes
  const handleXRayProgress = (progress: number) => {
    // Track X-Ray progress for InteractiveBuildingMap
    setXrayProgress(progress);
    
    // Track when we reach 100%
    if (progress >= 100) {
      setHasReached100(true);
    }
    
    // Reset manual close flag when we reach 100% and then go back below 75%
    if (hasReached100 && progress < 75) {
      setHasBeenManuallyClosed(false);
    }
    
    // Calculate modal opacity based on progress
    let opacity = 0;
    if (progress >= 70 && progress <= 110 && !hasBeenManuallyClosed) {
      // Extended fade in from 70% to 80%, stay at full opacity from 80% to 90%, extended fade out from 90% to 110%
      if (progress <= 80) {
        opacity = (progress - 70) / 10; // 0 to 1 from 70% to 80%
      } else if (progress <= 90) {
        opacity = 1; // Full opacity from 80% to 90%
      } else {
        opacity = 1 - ((progress - 90) / 20); // 1 to 0 from 90% to 110%
      }
    }
    
    setModalOpacity(opacity);
    setIsModalVisible(opacity > 0);
  };

  const industryProducts = [
    {
      name: 'TAC-734G – WEB SPRAY HIGH TACK INFUSION MOLDING ADHESIVE',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-734G-NEW.png',
      url: 'https://forzabuilt.com/product/tac-734g-web-spray-high-tack-infusion-molding-adhesive/'
    },
    {
      name: 'TAC-735R – MIST SPRAY NO HAPS INFUSION MOLDING ADHESIVE',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-735R-NEW-1024x1024.png',
      url: 'https://forzabuilt.com/product/tac-735r-mist-spray-no-haps-infusion-molding-adhesive/'
    },
    {
      name: 'TAC-738R – WEB SPRAY ZERO VOC INFUSION MOLDING ADHESIVE',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-738R-NEW.png',
      url: 'https://forzabuilt.com/product/tac-738r-web-spray-zero-voc-infusion-molding-adhesive/'
    },
    {
      name: 'TAC-739R – MIST SPRAY INFUSION MOLDING ADHESIVE',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-739R-NEW-1024x1024.png',
      url: 'https://forzabuilt.com/product/tac-739r-mist-spray-infusion-molding-adhesive/'
    },
    {
      name: 'MC722 – WEB SPRAY NON-FLAM/NON-METHYLENE CHLORIDE CONTACT ADHESIVE',
      image: 'https://forzabuilt.com/wp-content/uploads/2023/06/MC722-single-5-1024x1024.png',
      url: 'https://forzabuilt.com/product/mc722-web-spray-contact-adhesive-for-infusion-molding/'
    },
    {
      name: 'MC723 – WEB SPRAY CA COMPLIANT MULTI-PURPOSE CONTACT ADHESIVE',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/06/MC723-bundle-New-1024x1024.png',
      url: 'https://forzabuilt.com/product/mc723-web-spray-ca-compliant-multi-purpose-contact-adhesive/'
    },
    {
      name: 'MC724 – WEB SPRAY PRESSURE SENSITIVE ADHESIVE',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/10/MC724-bundle-1024x1024.png',
      url: 'https://forzabuilt.com/product/web-spray-pressure-sensitive-adhesive/'
    },
    {
      name: 'MC737 – WEB SPRAY STYRENE SAFE PRESSURE SENSITIVE ADHESIVE',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/06/A_FORZA_MC737_Canister22L-NEW1-1024x1024.png',
      url: 'https://forzabuilt.com/product/mc737-web-spray-styrene-safe-pressure-sensitive-adhesive/'
    },
    {
      name: 'MC741 – CA COMPLIANT MULTI-PURPOSE CONTACT ADHESIVE',
      image: 'https://forzabuilt.com/wp-content/uploads/2025/01/canister-mockup-MC741-1024x1024.png',
      url: 'https://forzabuilt.com/product/mc741-ca-compliant-multi-purpose-contact-adhesive/'
    },
    {
      name: 'M-OS764 – ULTRA HIGH-STRENGTH HYBRID POLYMER STRUCTURAL ADHESIVE',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/06/AP749_M-OS764_Sausage_NEW-1024x1024.png',
      url: 'https://forzabuilt.com/product/m-os764-non-hazardous-moisture-cure-structural-adhesive/'
    },
    {
      name: 'M-OA755 – HIGH-STRENGTH SINGLE-PART HYBRID POLYMER ADHESIVE/SEALANT',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-OA755-New.png',
      url: 'https://forzabuilt.com/product/m-oa755-high-strength-single-part-hybrid-performance-polymer/'
    },
    {
      name: 'M-R420 – EPOXY QUICK-SET TWO-PART ADHESIVE',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-R420-NEW.png',
      url: 'https://forzabuilt.com/product/m-r420-epoxy-quick-set-two-part-adhesive/'
    },
    {
      name: 'M-R445 – TWO-PART EPOXY ADHESIVE',
      image: 'https://forzabuilt.com/wp-content/uploads/2025/03/M-R445-.png',
      url: 'https://forzabuilt.com/product/m-r445-two-part-modified-epoxy-adhesive/'
    },
    {
      name: 'M-OSA783 – ADHESIVE PRIMER & PROMOTER',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-OSA783-NEW.png',
      url: 'https://forzabuilt.com/product/m-osa783-adhesive-primer-and-promoter/'
    },
    {
      name: 'M-S750 – TAPE PRIMER AND ADHESION PROMOTER',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/12/M-S750.png',
      url: 'https://forzabuilt.com/product/m-s750-tape-primer-and-adhesion-promoter/'
    },
    {
      name: 'M-C280 – NEOPRENE CONTACT ADHESIVE',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-C280-NEW.png',
      url: 'https://forzabuilt.com/product/m-c280-neoprene-contact-adhesive/'
    },
    {
      name: 'M-C285 – PREMIUM HIGH TEMP NEOPRENE CONTACT ADHESIVE',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-C285-NEW.png',
      url: 'https://forzabuilt.com/product/m-c285-premium-high-temp-neoprene-contact-adhesive/'
    }
  ];

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
            {(industryData.title.charAt(0) + industryData.title.slice(1).toLowerCase()).toUpperCase()}
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

      {/* About Section */}
      <section className="bg-white text-[#1b3764] flex-1 -mb-20">
        <div className="w-full px-4 max-w-[1600px] mx-auto">
          {industryData.pageHeadline && (
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-12 text-center leading-tight font-kallisto text-[#1b3764]">{industryData.pageHeadline}</h3>
          )}
        </div>
      </section>

      {/* Scroll Stack Cards Section */}
      {/* XRay Wipe Section - Before and After Comparison */}
      <section className="py-20-custom bg-white mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <XRayWipe
            beforeSrc="https://images.ctfassets.net/hdznx4p7ef81/1AmgiwUCYVKuHYBzr0zVfi/d5ccc0c8a64e211d9cd50d656c64dbee/Boat-Pre-X-Ray__2_.png"
            afterContent={
              <div className="w-full h-full">
                <InteractiveBuildingMap scrollProgress={xrayProgress} />
              </div>
            }
            altBefore="Construction site before completion"
            height={700}
            wipeDirection="btt"
            onProgressChange={handleXRayProgress}
          />
        </div>
      </section>

      {/* Applications Modal */}
      <ApplicationsModal 
        isVisible={isModalVisible} 
        onClose={() => {
          setIsModalVisible(false);
          setHasBeenManuallyClosed(true);
        }}
        opacity={modalOpacity}
      />

      <section className="bg-gradient-to-b from-slate-50 to-white">
        <ServiceCardStack />
      </section>

      {/* Marine Products Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-[#1b3764] mb-12 text-center font-kallisto">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {industryProducts.map((product, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center p-6 transition-transform duration-300 hover:scale-105 text-center">
                <a href={product.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full flex flex-col items-center justify-center">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-contain mb-4" />
                  <div className="text-lg font-bold text-[#1b3764] mb-2 text-center font-kallisto">{product.name}</div>
                  <button className="mt-2 bg-[#F2611D] hover:bg-[#F2611D]/90 text-white font-bold rounded-full px-6 py-2 text-base shadow transition-colors">More Info</button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chemistries Section */}
      <ProductChemistriesSection />

    

      {industryData.title === 'MARINE' && <MarineBrochureSection />}
    </div>
  );
};

export default IndustryPage; 