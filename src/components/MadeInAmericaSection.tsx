import React from 'react';
import { useGradientMode } from '@/contexts/GradientModeContext';

const MadeInAmericaSection: React.FC = () => {
  const { mode } = useGradientMode();

  return (
    <>
      <section className="bg-[rgb(243_245_247)]">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20">
          {/* Top Content Area - Text and Flag */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.3fr_1fr] gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-start">
            {/* Left side - Made in America Video - Takes up more space */}
            <div className="flex justify-center lg:justify-start h-full">
              <div className="w-full h-full aspect-video lg:aspect-auto overflow-hidden rounded-[3rem] shadow-lg">
                <video
                  src="videos\backgrounds\Manufactured in America.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right side - Text content - Scales down on smaller screens */}
            <div className="p-0 sm:p-2 lg:p-4 xl:p-6 flex flex-col h-full">
              <div className="flex flex-col h-full justify-between">
                {/* Title aligned with top of video */}
                <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                  <h2
                    className={`font-normal leading-tight max-w-none ${
                      mode === 'light2' ? 'text-[#2c476e]' : 'text-[#2c476e]'
                    } font-poppins`}
                    style={{ fontSize: 'clamp(32px, 3.2vw + 0.6rem, 84px)' }}
                  >
                    Proudly Manufactured<br />
                    in America
                  </h2>
                  {/* Paragraph text */}
                  <p className={`mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed ${
                    mode === 'light2' ? 'text-[#2c476e]/90' : 'text-[#2c476e]/90'
                  } font-poppins`}>
                    Real people, making real products, making a real difference! We don't just resell & re-label someone else's products, we actually make them. We proudly manufacture our products in the USA*, in America's heartland. From R&D to manufacturing, our vertical integration gives us full control over quality, consistency, and availability.
                  </p>
                </div>
                
                {/* American Flag Icon with Asterisk - Aligned with bottom of video */}
                <div className="flex justify-start mt-auto">
                  <img 
                    src="/images/misc/Flag Icon with asterisk 1.png" 
                    alt="Made in USA" 
                    className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-64 h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default MadeInAmericaSection;
