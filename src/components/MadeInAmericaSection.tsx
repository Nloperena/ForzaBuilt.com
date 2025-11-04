import React from 'react';
import { useGradientMode } from '@/contexts/GradientModeContext';

const MadeInAmericaSection: React.FC = () => {
  const { mode } = useGradientMode();

  return (
    <>
      <section className="bg-[rgb(243_245_247)]">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
          {/* Top Content Area - Text and Flag */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.3fr_1fr] gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Left side - Made in America Video - Takes up more space */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full aspect-video lg:aspect-auto overflow-hidden rounded-[3rem] shadow-lg">
                <video
                  src="videos\backgrounds\Made in America Video 1.mp4"
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
            <div className="p-0 sm:p-2 lg:p-4 xl:p-6">
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                {/* American Flag Icon with Asterisk - Smaller size */}
                <div className="flex justify-start -mb-1 sm:-mb-2">
                  <img 
                    src="/images/misc/Flag Icon with asterisk 1.png" 
                    alt="Made in USA" 
                    className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-64 h-auto object-contain"
                  />
                </div>
                
                <h2 className={`text-[clamp(22px,3vw,64px)] font-normal leading-tight max-w-none ${
                  mode === 'light2' ? 'text-[#2c476e]' : 'text-[#2c476e]'
                } font-poppins`}>
                  Proudly Manufactured<br />
                  in America
                </h2>
                
                <p className={`text-xs sm:text-sm md:text-base lg:text-base leading-relaxed ${
                  mode === 'light2' ? 'text-gray-600' : 'text-gray-600'
                } font-poppins`}>
                  Real people, making real products, making a real difference! We don't just resell & re-label someone else's products, we actually make them. <br/>
                  <br></br>
                  We proudly manufacture our products in the U.S.A*, in America's heartland. From R&D to manufacturing, our vertical integration gives us full control over quality, consistency, and availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default MadeInAmericaSection;
