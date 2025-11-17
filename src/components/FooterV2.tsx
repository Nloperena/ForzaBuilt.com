import React from 'react';

const FooterV2 = () => {
  return (
    <footer className="relative py-10 md:py-12 px-6 overflow-hidden bg-gradient-to-t from-[#477197] to-[#2c476e] text-white">
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex flex-col gap-4 mb-5">
          {/* Logo and Social Media */}
          <div className="flex items-center justify-between">
            <img 
              src="/logos/Forza-Eagle-Logo-White.svg"
              alt="Forza Logo"
              className="h-12 md:h-14 w-auto"
            />
            {/* Social Media Icons */}
            <div className="flex items-center gap-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white rounded flex items-center justify-center hover:bg-white/80 transition-colors">
                <span className="text-[#2c476e] text-sm font-bold">in</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white rounded flex items-center justify-center hover:bg-white/80 transition-colors">
                <span className="text-[#2c476e] text-base">▶</span>
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
        <div className="hidden lg:grid grid-cols-4 gap-8 mb-5">
          {/* Logo Column */}
          <div>
            <img 
              src="/logos/Forza-Eagle-Logo-White.svg"
              alt="Forza Logo"
              className="h-12 lg:h-12 xl:h-16 2xl:h-24 w-auto"
            />
          </div>

          {/* Company Column */}
          <div className="space-y-1.5">
            <h3 className="text-white font-bold text-base font-poppins">Company</h3>
            <ul className="space-y-1">
              <li><a href="/products" className="text-white hover:text-white/80 transition-colors font-poppins leading-tight">Products</a></li>
              <li><a href="/industries" className="text-white hover:text-white/80 transition-colors font-poppins leading-tight">Industries</a></li>
              <li><a href="/blog" className="text-white hover:text-white/80 transition-colors font-poppins leading-tight">Blogs</a></li>
              <li><a href="/about" className="text-white hover:text-white/80 transition-colors font-poppins leading-tight">About</a></li>
            </ul>
          </div>
          
          {/* HQ Column */}
          <div className="space-y-1.5">
            <h3 className="text-white font-bold text-base font-poppins">HQ</h3>
            <div className="text-white space-y-1">
              <p className="font-poppins leading-tight">Forza</p>
              <p className="font-poppins leading-tight">3211 Nebraska Ave</p>
              <p className="font-poppins leading-tight">Suite 300</p>
              <p className="font-poppins leading-tight">Council Bluffs,</p>
              <p className="font-poppins leading-tight">Iowa 51501</p>
            </div>
          </div>
          
          {/* Contact Column */}
          <div className="space-y-1.5">
            <h3 className="text-white font-bold text-base font-poppins">Contact</h3>
            <div className="text-white space-y-1">
              <p className="font-poppins leading-tight">O. 402.731.9300</p>
              <p className="font-poppins leading-tight"><a href="mailto:support@forzabuilt.com" className="hover:underline">support@forzabuilt.com</a></p>
              <p className="font-poppins leading-tight">Mon-Fri | 8 AM - 4:30 PM</p>
              <p className="font-poppins leading-tight">CST</p>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-white/30 mb-5"></div>

        {/* Bottom Section with Made in USA Badge, Copyright, and Follow Us */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Made in USA Badge - Standalone Image */}
          <img 
            src="/images/misc/Flag Icon with asterisk 1.png"
            alt="PROUDLY MADE IN AMERICA"
            className="h-16 w-auto object-contain"
          />

          {/* Copyright */}
          <p className="text-white/70 text-xs font-poppins leading-tight flex-1">
            *Forza industrial adhesive and industrial sealants are proudly
            <br />
            manufactured in the USA from domestic and limited foreign
            <br />
            components. © {new Date().getFullYear()} Forza Built. All rights reserved.
          </p>

          {/* Follow Us - Aligned with flag on the right */}
          <div className="ml-auto">
            <h3 className="text-white font-bold text-base font-poppins mb-1">Follow Us</h3>
            <div className="flex space-x-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white rounded flex items-center justify-center hover:bg-white/80 transition-colors">
                <span className="text-[#2c476e] text-sm font-bold">in</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white rounded flex items-center justify-center hover:bg-white/80 transition-colors">
                <span className="text-[#2c476e] text-base">▶</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterV2;

