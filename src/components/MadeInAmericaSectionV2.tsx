import React from 'react';

const MadeInAmericaSectionV2: React.FC = () => {
  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {/* Background Video */}
      <video
        src="https://videos.ctfassets.net/hdznx4p7ef81/10s1OuRSDAglRlWOWuKlyY/44aa091229bd400168477bd2c4a0cf16/ManufacturedinAmericaStinger_1.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.ctfassets.net/hdznx4p7ef81/6uNXx70LW8jZoxCoOyfZ1K/e6b08291f567d425f146053925714b99/Manufacturing_2.jpg"
      >
        Your browser does not support the video tag.
      </video>

      {/* Optional Overlay for darkening/text readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Optional Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {/* Add content here if needed */}
      </div>
    </section>
  );
};

export default MadeInAmericaSectionV2;

