import React from 'react';
import { useGradientMode } from '@/contexts/GradientModeContext';

const MadeInAmericaSection: React.FC = () => {
  const { mode } = useGradientMode();

  return (
    <section className={`py-16 ${
      mode === 'light2' ? 'bg-white' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Content Area - Text and Flag */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
          {/* Left side - Text content on grey background */}
          <div className="bg-gray-100 p-8 rounded-lg">
            <div className="space-y-6">
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-normal leading-tight ${
                mode === 'light2' ? 'text-[#293350]' : 'text-[#293350]'
              } font-poppins`}>
                Fully Integrated Factory in the U.S.
              </h2>
              
              <p className={`text-lg md:text-xl leading-relaxed ${
                mode === 'light2' ? 'text-gray-600' : 'text-gray-600'
              } font-poppins`}>
                Real people, making real products, making a real difference! We don't just resell & re-label someone else's products, we actually make them. We proudly manufacture our products in the U.S.A*, in America's heartland. From R&D to manufacturing, our vertical integration gives us full control over quality, consistency, and availability.
              </p>
            </div>
          </div>

          {/* Right side - American Flag */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-64 md:w-80 lg:w-96">
              <video
                src="/American Flag.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Bottom Content Area - Factory Video */}
      </div>
      
      {/* Factory Video - Full Width */}
      <div className="w-full">
        <video
          src="https://videos.ctfassets.net/hdznx4p7ef81/10s1OuRSDAglRlWOWuKlyY/44aa091229bd400168477bd2c4a0cf16/ManufacturedinAmericaStinger_1.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-auto"
          poster="https://images.ctfassets.net/hdznx4p7ef81/6uNXx70LW8jZoxCoOyfZ1K/e6b08291f567d425f146053925714b99/Manufacturing_2.jpg"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      
    </section>
  );
};

export default MadeInAmericaSection;
