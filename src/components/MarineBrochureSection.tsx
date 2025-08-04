import React from 'react';
import Header from './Header';
import Footer from './Footer';

const BROCHURE_IMAGE = 'https://images.ctfassets.net/hdznx4p7ef81/4jxIKgkpgtrlvx5f2KjDF7/59fe168521bb160bf71c906caa33dbe4/Marine-PDF-Cover_sample.png'; // Updated to provided image URL
const BROCHURE_LINK = '/downloads/forza-marine-brochure.pdf'; // Replace with actual PDF link

const MarineBrochureSection: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="w-full bg-gradient-to-r from-[#1b3764] to-[#137875] py-20 px-4 flex-1">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Left: Brochure Image */}
          <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
            <img
              src={BROCHURE_IMAGE}
              alt="Forza Marine Brochure Cover"
              className="w-80 md:w-96 rounded-xl shadow-2xl border-4 border-white/10 bg-white/10"
              loading="lazy"
            />
          </div>
          {/* Right: Text and Button */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-kallisto drop-shadow-lg">
              Marine Brochure
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto md:mx-0">
              Download our Marine Digital Brochure that goes into depth with our solutions, products, and applications Marine Industry specific.
            </p>
            <a
              href={BROCHURE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#F2611D] hover:bg-[#d94e0c] text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg transition-colors duration-200"
            >
              Download
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MarineBrochureSection; 