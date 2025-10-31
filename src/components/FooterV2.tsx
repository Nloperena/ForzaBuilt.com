import React from 'react';

const FooterV2 = () => {
  return (
    <footer className="relative py-12 px-6 overflow-hidden bg-gradient-to-t from-[#477197] to-[#2c476e] text-white">
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex flex-col gap-6 mb-8">
          {/* Logo and Social Media */}
          <div className="flex items-center justify-between">
            <img 
              src="/logos/Forza-Eagle-Logo-White.svg"
              alt="Forza Logo"
              className="h-12 w-auto"
            />
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded flex items-center justify-center hover:bg-white/80 transition-colors">
                <span className="text-[#2c476e] text-lg font-bold">in</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded flex items-center justify-center hover:bg-white/80 transition-colors">
                <span className="text-[#2c476e] text-xl">▶</span>
              </a>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="flex items-center gap-4 flex-wrap">
            <a href="/products" className="text-white hover:text-white/80 transition-colors font-poppins text-sm">Products</a>
            <span className="text-white/50">|</span>
            <a href="/industries" className="text-white hover:text-white/80 transition-colors font-poppins text-sm">Industries</a>
            <span className="text-white/50">|</span>
            <a href="/blog" className="text-white hover:text-white/80 transition-colors font-poppins text-sm">Blogs</a>
            <span className="text-white/50">|</span>
            <a href="/about" className="text-white hover:text-white/80 transition-colors font-poppins text-sm">About</a>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-5 gap-8 mb-8">
          {/* Logo Column - Spans more space on desktop */}
          <div className="col-span-2">
            <img 
              src="/logos/Forza-Eagle-Logo-White.svg"
              alt="Forza Logo"
              className="h-24 w-auto"
            />
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg font-poppins">Company</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="text-white hover:text-white/80 transition-colors font-poppins">Products</a></li>
              <li><a href="/industries" className="text-white hover:text-white/80 transition-colors font-poppins">Industries</a></li>
              <li><a href="/blog" className="text-white hover:text-white/80 transition-colors font-poppins">Blogs</a></li>
              <li><a href="/about" className="text-white hover:text-white/80 transition-colors font-poppins">About</a></li>
            </ul>
          </div>
          
          {/* HQ Column */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg font-poppins">HQ</h3>
            <div className="text-white space-y-1">
              <p className="font-poppins">Forza</p>
              <p className="font-poppins">3211 Nebraska Ave</p>
              <p className="font-poppins">Suite 300</p>
              <p className="font-poppins">Council Bluffs,</p>
              <p className="font-poppins">Iowa 51501</p>
            </div>
          </div>
          
          {/* Contact and Social Column */}
          <div className="space-y-4">
            {/* Contact */}
            <div className="mb-6">
              <h3 className="text-white font-bold text-lg font-poppins mb-4">Contact</h3>
              <div className="text-white space-y-1">
                <p className="font-poppins">O. 402.731.9300</p>
                <p className="font-poppins"><a href="mailto:support@forzabuilt.com" className="hover:underline">support@forzabuilt.com</a></p>
                <p className="font-poppins">Mon-Fri | 8 AM - 4:30 PM</p>
                <p className="font-poppins">CST</p>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-white font-bold text-lg font-poppins mb-4">Follow Us</h3>
              <div className="flex space-x-3">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded flex items-center justify-center hover:bg-white/80 transition-colors">
                  <span className="text-[#2c476e] text-lg font-bold">in</span>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded flex items-center justify-center hover:bg-white/80 transition-colors">
                  <span className="text-[#2c476e] text-xl">▶</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-white/30 mb-8"></div>

        {/* Bottom Section with Made in USA Badge and Copyright */}
        <div className="flex items-center gap-6 flex-wrap">
          {/* Made in USA Badge - Standalone Image */}
          <img 
            src="/images/misc/Flag Icon with asterisk 1.png"
            alt="PROUDLY MADE IN AMERICA"
            className="h-20 w-auto object-contain"
          />

          {/* Copyright */}
          <p className="text-white/70 text-xs font-poppins leading-relaxed flex-1">
            *Forza industrial adhesive and industrial sealants are proudly
            <br />
            manufactured in the USA from domestic and limited foreign
            <br />
            components. © {new Date().getFullYear()} Forza Built. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterV2;

