import React from 'react';
import { useGradientMode } from '@/contexts/GradientModeContext';

const MadeInAmericaSection: React.FC = () => {
  const { mode } = useGradientMode();

  return (
    <>
      <section className={`${
        mode === 'light2' ? 'bg-white' : 'bg-white'
      }`}>
        <div className="max-w-[120rem] mx-auto px-4 lg:px-12 xl:px-16 2xl:px-20 py-24">
          {/* Top Content Area - Text and Flag */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center mb-12">
            {/* Left side - American Flag */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full h-full">
                <video
                  src="/American Flag.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover object-left rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Right side - Text content */}
            <div className="p-8">
              <div className="space-y-6">
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-normal leading-tight ${
                  mode === 'light2' ? 'text-[#293350]' : 'text-[#293350]'
                } font-poppins`}>
                  Proudly Manufactured<br>
                  </br> in America
                </h2>
                
                <p className={`text-lg md:text-xl leading-relaxed ${
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
