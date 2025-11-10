import React from 'react';
import { useGradientMode } from '@/contexts/GradientModeContext';

const MadeInAmericaSection: React.FC = () => {
  const { mode } = useGradientMode();

  return (
    <>
      <section className="bg-[rgb(243_245_247)]">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6">
          {/* Top Content Area - Text and Flag */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.3fr_1fr] gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 items-start">
            {/* Left side - Made in America Video - Takes up more space */}
            <div className="flex justify-center lg:justify-start h-full">
              <div className="w-full h-full aspect-video lg:aspect-auto overflow-hidden rounded-xl lg:rounded-xl shadow-lg">
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
            <div className="p-0 sm:p-1 lg:p-2 xl:p-3 flex flex-col h-full">
              <div className="flex flex-col h-full justify-between">
                {/* Title aligned with top of video */}
                <div className="mb-2 sm:mb-2.5 md:mb-3 lg:mb-4">
                  <h2
                    className={`font-normal leading-tight max-w-none ${
                      mode === 'light2' ? 'text-[#2c476e]' : 'text-[#2c476e]'
                    } font-poppins`}
                    style={{ fontSize: 'clamp(24px, 2.5vw + 0.4rem, 56px)' }}
                  >
                    Proudly Manufactured<br />
                    in America
                  </h2>
                  {/* Paragraph text */}
                  <p className={`mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg lg:text-lg leading-relaxed ${
                    mode === 'light2' ? 'text-[#2c476e]/90' : 'text-[#2c476e]/90'
                  } font-poppins`}>
                    Real people, making real products, making a real difference! We don't just resell & re-label someone else's products, we actually make them.<br />We proudly manufacture our products in the USA*, in America's heartland. From R&D to manufacturing, our vertical integration gives us full control over quality, consistency, and availability.
                  </p>
                </div>
                
                {/* American Flag Icon with Asterisk - Aligned with bottom of video */}
                <div className="flex justify-start mt-auto">
                  <img 
                    src="/images/misc/Flag Icon with asterisk 1.png" 
                    alt="Made in USA" 
                    className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-32 h-auto object-contain"
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
