import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-[#1b3764] text-white">
        {/* Meet Forza Video Section */}
        <section className="relative flex flex-col items-center justify-start overflow-hidden text-center py-16">
          <div className="relative w-full max-w-5xl aspect-video mt-12 bg-black bg-opacity-90 p-12 rounded-lg shadow-2xl border-2 border-gray-700">
            <iframe
              src="https://www.youtube.com/embed/DjI8bEcu6FI?autoplay=1&mute=1&loop=1&playlist=DjI8bEcu6FI&si=TmFaUGLTPbk8fClu"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full object-cover z-0 rounded-lg"
            ></iframe>
          </div>
        </section>

        {/* About Us Heading Section */}
        <section className="py-16 px-4 max-w-6xl mx-auto text-center">
          <h1 className="text-7xl font-extrabold font-kallisto text-white mb-8">About Us</h1>
          <p className="text-2xl mb-8 leading-relaxed">
            Forza is a family-owned adhesive, sealant & specialty tape manufacturer based in the USA. We supply the global industry with superior, high-performing, customized products.
          </p>
          <p className="text-2xl mb-8 leading-relaxed">
            Established in 1979, Forza possesses the size to provide best-in-class products tailored for specific applications, while maintaining a level of intimacy that allows us to support our customers throughout their journey.
          </p>
          <p className="text-2xl leading-relaxed">
            With our deep industry knowledge and our unique hybrid approach - vertically integrated manufacturing combined with a complete in-house R&D lab, we're uniquely capable of developing, producing, and shipping cost-effective solutions that perform better than all others.
          </p>
        </section>

        {/* Image Sections */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/src/assets/images/Manufacturing 2.jpg')" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 w-full h-full">
            
          </div>
        </section>

        {/* Forza / Made in America Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
            <div className="bg-white text-[#1b3764] rounded-lg shadow-lg p-12 flex flex-col items-center text-center aspect-square">
              <img src="https://forzabuilt.com/wp-content/uploads/2022/12/Forza-Corporate-Wordmark-Positive.png" alt="Forza Logo" className="w-full mb-4 object-contain" />
              <h3 className="text-4xl font-extrabold mb-2 font-kallisto">Forza</h3>
              <p className="text-lg font-bold mb-2">noun / italian for "force" / forza/</p>
              <p className="text-lg mb-4">Strength, Power, Force</p>
              <p className="text-lg">Strength or power exerted on an object</p>
            </div>
            <div className="bg-white text-[#1b3764] rounded-lg shadow-lg p-12 flex flex-col items-center text-center aspect-square">
              <video
                src="https://videos.ctfassets.net/hdznx4p7ef81/7FAYaB8msFZnVuKOMhuFse/30b2c632640ff0043ceea78211521787/Gen-4_Flag8.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full mb-4 object-contain"
              />
              <h3 className="text-4xl font-extrabold mb-2 font-kallisto">Made in America</h3>
              <p className="text-lg leading-relaxed">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut</p>
            </div>
          </div>
        </section>

        {/* Concluding Text Section */}
        <section className="py-16 px-4 max-w-6xl mx-auto text-center">
          <p className="text-2xl mb-8 leading-relaxed">
            Why Forza? Forza means force in Italian. It's also synonymous with Strength. And for us, strength is an all-encompassing commitment. Simply put, we do nothing for our customers half-hearted. Everything we do and every product solution we provide are full-strength, at all times.
          </p>
          <p className="text-2xl mb-8 leading-relaxed">
            At Forza, we do what other manufacturers won't.
            That means finding a better solution is just the beginning.
          </p>
          <p className="text-2xl mb-8 leading-relaxed">
            If you're looking to take your projects, your results, and your
            business to the next level, we're ready to over-deliver for you.
          </p>
          <p className="text-2xl font-bold leading-relaxed">
            Our Team. Our Science. Your Force.
          </p>
          <p className="text-2xl font-bold leading-relaxed mb-16">
            Forza.
          </p>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default About; 