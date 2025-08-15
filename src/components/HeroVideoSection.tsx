import React from 'react';

const HeroVideoSection = () => {
  return (
    <section className="relative h-[50vh] flex items-center justify-center overflow-hidden shadow-sm">
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      >
        <source src="https://forzabuilt.com/wp-content/uploads/2024/12/ForzaLionLoop-1-2.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default HeroVideoSection; 