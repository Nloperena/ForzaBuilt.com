import React from 'react';

const AboutIdentityCards = () => {
  return (
    <section className="py-10 md:py-14 px-4 bg-[#1b3764]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 justify-items-center">
        {/* Forza Definition Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 border border-white/60 w-fit mx-auto">
          <div className="flex flex-col items-center text-center">
            <img
              src="/Forza-lion-logo.png"
              alt="Forza lion logo"
              className="w-28 md:w-32 h-auto mb-4"
            />
            <h3 className="text-[#1b3764] text-3xl md:text-4xl font-extrabold font-kallisto mb-2">Forza</h3>
            <div className="text-sm md:text-base text-[#1b3764]/90 space-y-1 font-poppins">
              <p><span className="italic">noun</span> / italian for "force" / <span className="italic">forza</span></p>
              <p>Strength, Power, Force</p>
              <p>Strength or power exerted on an object</p>
            </div>
          </div>
        </div>

        {/* Made in America Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 border border-white/60 w-fit mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-full max-w-xs mb-4">
              <video
                src="/American%20Flag.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-auto object-contain rounded-lg"
                aria-label="American flag waving"
              />
            </div>
            <h3 className="text-[#1b3764] text-3xl md:text-4xl font-extrabold font-kallisto mb-2">Made in America</h3>
            <p className="text-sm md:text-base text-[#1b3764]/90 max-w-md font-poppins">
              We proudly manufacture our high-performance products in the USA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIdentityCards;


