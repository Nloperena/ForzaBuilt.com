import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutIdentityCards from '@/components/AboutIdentityCards';
import EdgeTrianglesBackground from '@/components/common/EdgeTrianglesBackground';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-[#1b3764] text-white relative">
        {/* Orange to Blue Gradient Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_top_right,rgba(242,97,29,0.8)_0%,rgba(242,97,29,0.7)_25%,rgba(242,97,29,0.5)_45%,rgba(242,97,29,0.3)_65%,rgba(242,97,29,0.15)_80%,rgba(242,97,29,0.05)_90%,transparent_100%)] md:bg-[radial-gradient(ellipse_1800px_1200px_at_top_right,rgba(242,97,29,0.8)_0%,rgba(242,97,29,0.7)_25%,rgba(242,97,29,0.5)_45%,rgba(242,97,29,0.3)_65%,rgba(242,97,29,0.15)_80%,rgba(242,97,29,0.05)_90%,transparent_100%)]"
            style={{ opacity: 1 }}
          />
        </div>
        
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
        
        {/* Meet Forza Video Section */}
        <section className="relative flex flex-col items-center justify-start overflow-hidden text-center py-32 z-20">
          <div className="relative w-full max-w-[72rem] aspect-video mt-28 bg-black bg-opacity-90 p-12 rounded-[2rem] shadow-2xl border-2 border-gray-700 z-20">
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
            <h1 className="font-black text-white font-kallisto text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-none break-words">
              About Us
            </h1>
            <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
              Forza is a family-owned adhesive, sealant & specialty tape manufacturer based in the USA. We supply the global industry with superior, high-performing, customized products.
            </p>
            <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
              Established in 1979, Forza possesses the size to provide best-in-class products tailored for specific applications, while maintaining a level of intimacy that allows us to support our customers throughout their journey.
            </p>
            <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
              With our deep industry knowledge and our unique hybrid approach - vertically integrated manufacturing combined with a complete in-house R&D lab, we're uniquely capable of developing, producing, and shipping cost-effective solutions that perform better than all others.
            </p>
          </div>
        </section>

        

        {/* Concluding Text Section */}
        <section className="relative py-8 md:py-16 px-4 max-w-[1400px] mx-auto text-center z-20">
          <p className="text-base md:text-2xl mb-6 md:mb-8 leading-relaxed">
            Why Forza? Forza means force in Italian. It's also synonymous with Strength. And for us, strength is an all-encompassing commitment. Simply put, we do nothing for our customers half-hearted. Everything we do and every product solution we provide are full-strength, at all times.
          </p>
          <p className="text-base md:text-2xl mb-6 md:mb-8 leading-relaxed">
            At Forza, we do what other manufacturers won't.
            That means finding a better solution is just the beginning.
          </p>
          <p className="text-base md:text-2xl mb-6 md:mb-8 leading-relaxed">
            If you're looking to take your projects, your results, and your
            business to the next level, we're ready to over-deliver for you.
          </p>
          <p className="text-base md:text-2xl font-bold leading-relaxed">
            Our Team. Our Science. Your Force.
          </p>
          <p className="text-base md:text-2xl font-bold leading-relaxed mb-8 md:mb-16">
            Forza.
          </p>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default About; 