import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutIdentityCards from '@/components/AboutIdentityCards';
import EdgeTrianglesBackground from '@/components/common/EdgeTrianglesBackground';
import SplitText from '@/components/SplitText';
import GradientToggleModal from '@/components/GradientToggleModal';
import { useGradientMode } from '@/contexts/GradientModeContext';

const About = () => {
  const { mode, getGradientClasses, getTextClasses } = useGradientMode();
  
  return (
    <div className={`bg-gradient-to-b ${getGradientClasses()} min-h-screen`}>
      <Header />
      
      <div className="flex-1 text-white relative">

        
        {/* Edge triangles positioned at left and right viewport edges */}
        <EdgeTrianglesBackground 
          leftImage="/Gradients and Triangles/Small Science Triangles 2.png"
          rightImage="/Gradients and Triangles/Small Science Triangles.png"
          opacity={0.6}
          scale={1.1}
          leftRotation={280}
          rightRotation={280}
          leftFlipH={false}
          rightFlipV={false}
          blendMode="overlay"
        />
        
        {/* Hero Section */}
        <section className="relative">
          <div className="bg-gradient-to-b from-[#1B3764] to-[#115B87] pt-16 sm:pt-20 relative">
            <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 lg:py-16 [&:has(>div)]:max-w-[2000px]">
              <div className="text-center mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-1 sm:mb-2 md:mb-4 leading-none font-kallisto">
                  <SplitText
                    text="About Us"
                    className="block"
                    splitType="words"
                    delay={50}
                    as="span"
                  />
                </h1>
                <p className="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium leading-relaxed max-w-[1200px] mx-auto">
                  Get Ready for Great
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Meet Forza Video Section */}
        <section className="relative flex flex-col items-center justify-start overflow-hidden text-center z-20 bg-gradient-to-t from-[#1B3764] to-[#115B87] py-16">
          <div className="relative w-full max-w-[72rem] aspect-video bg-black bg-opacity-90 p-12 rounded-[2rem] shadow-2xl border-2 border-gray-700 z-20">
            <iframe
              src="https://www.youtube.com/embed/DjI8bEcu6FI?autoplay=1&mute=1&loop=1&playlist=DjI8bEcu6FI&si=TmFaUGLTPbk8fClu"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full object-cover z-0 rounded-[2rem]"
            ></iframe>
          </div>
        </section>

        {/* Identity Cards Section (Forza + Made in America) */}
        <div className="relative z-20">
          <AboutIdentityCards />
        </div>

        {/* About Us Heading Section */}
        <section className="relative pt-8 md:pt-16 pb-6 md:pb-8 px-4 max-w-[1400px] mx-auto text-center z-20">
          <div className="max-w-[1400px] mx-auto space-y-8">
            <h1 className={`font-black font-kallisto text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-none break-words ${getTextClasses()}`}>
              Welcome to the Forza Family
            </h1>
            <p className={`${getTextClasses()} text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl`}>
              Forza is a family-owned adhesive, sealant & specialty tape manufacturer based in the USA. We supply the global industry with superior, high-performing, customized products.
            </p>
            <p className={`${getTextClasses()} text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl`}>
              Established in 1979, Forza possesses the size to provide best-in-class products tailored for specific applications, while maintaining a level of intimacy that allows us to support our customers throughout their journey.
            </p>
            <p className={`${getTextClasses()} text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl`}>
              With our deep industry knowledge and our unique hybrid approach - vertically integrated manufacturing combined with a complete in-house R&D lab, we're uniquely capable of developing, producing, and shipping cost-effective solutions that perform better than all others.
            </p>
          </div>
        </section>

        

        {/* Concluding Text Section */}
        <section className="relative py-8 md:py-16 px-4 max-w-[1400px] mx-auto text-center z-20">
          <p className={`${getTextClasses()} text-base md:text-2xl mb-6 md:mb-8 leading-relaxed`}>
            Why Forza? Forza means force in Italian. It's also synonymous with Strength. And for us, strength is an all-encompassing commitment. Simply put, we do nothing for our customers half-hearted. Everything we do and every product solution we provide are full-strength, at all times.
          </p>
          <p className={`${getTextClasses()} text-base md:text-2xl mb-6 md:mb-8 leading-relaxed`}>
            At Forza, we do what other manufacturers won't.
            That means finding a better solution is just the beginning.
          </p>
          <p className={`${getTextClasses()} text-base md:text-2xl mb-6 md:mb-8 leading-relaxed`}>
            If you're looking to take your projects, your results, and your
            business to the next level, we're ready to over-deliver for you.
          </p>
          <p className={`${getTextClasses()} text-base md:text-2xl font-bold leading-relaxed`}>
            Our Team. Our Science. Your Force.
          </p>
          <p className={`${getTextClasses()} text-base md:text-2xl font-bold leading-relaxed mb-8 md:mb-16`}>
            Forza.
          </p>
        </section>
      </div>
      
      <Footer />
      
      {/* Gradient Toggle Modal */}
      <GradientToggleModal />
    </div>
  );
};

export default About; 