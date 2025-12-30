import React from 'react';
import { Link } from 'react-router-dom';

const FooterV2 = () => {
  return (
    <footer className="relative py-4 md:py-10 lg:py-10 xl:py-12 px-3 md:px-6 lg:px-6 overflow-hidden bg-[#2c476e] lg:bg-gradient-to-t lg:from-[#477197] lg:to-[#2c476e] text-white">
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col gap-2">
          {/* Logo and Social Media */}
          <div className="flex items-start justify-between">
            <img 
              src="/logos/Forza-Eagle-Logo-White.svg"
              alt="Forza Logo"
              className="h-8 md:h-12 w-auto"
            />
            {/* Social Media Icons */}
            <div className="flex items-center gap-1.5">
              <a href="https://www.linkedin.com/company/forza-built/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:opacity-80 transition-opacity w-7 h-7 bg-white/10 rounded">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:opacity-80 transition-opacity w-7 h-7 bg-white/10 rounded">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="border-t border-white/30 my-1.5"></div>

          {/* Navigation Links - Centered */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <a href="/about" className="text-white hover:text-white/80 transition-colors font-poppins text-xs font-bold">Company</a>
            <span className="text-white text-xs">|</span>
            <a href="/contact" className="text-white hover:text-white/80 transition-colors font-poppins text-xs font-bold">Address</a>
            <span className="text-white text-xs">|</span>
            <a href="/contact" className="text-white hover:text-white/80 transition-colors font-poppins text-xs font-bold">Contact</a>
            <span className="text-white text-xs">|</span>
            <a href="#" className="text-white hover:text-white/80 transition-colors font-poppins text-xs font-bold">Follow Us</a>
          </div>

          {/* Horizontal Line */}
          <div className="border-t border-white/30 my-1.5"></div>

          {/* Bottom Section - Made in USA Badge and Copyright */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Made in USA Badge */}
            <img 
              src="/images/misc/Flag Icon with asterisk 1.png"
              alt="MADE IN THE USA"
              className="h-10 sm:h-12 w-auto object-contain flex-shrink-0"
            />
            {/* Copyright Text */}
            <p className="text-white/70 text-[9px] sm:text-xs font-poppins leading-relaxed flex-1">
              Forza industrial adhesive and industrial sealants are proudly manufactured in the USA from domestic and imported foreign components. © {new Date().getFullYear()} Forza Built. All rights reserved.
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-start gap-12 mb-5 max-w-4xl ml-auto mr-auto">
          <div className="flex-shrink-0">
            <img src="/logos/Forza-Eagle-Logo-White.svg" alt="Forza Logo" className="h-12 lg:h-12 xl:h-16 2xl:h-24 w-auto" />
          </div>
          <div className="space-y-1.5 flex-shrink-0">
            <h3 className="text-white font-bold text-base font-poppins">Company</h3>
            <div className="text-white space-y-1">
              <p className="font-poppins leading-tight">
                <Link to="/products" className="text-white hover:text-white/80 transition-colors">Products</Link>
              </p>
              <p className="font-poppins leading-tight">
                <Link to="/industries" className="text-white hover:text-white/80 transition-colors">Industries</Link>
              </p>
              <p className="font-poppins leading-tight">
                <Link to="/blog" className="text-white hover:text-white/80 transition-colors">Blogs</Link>
              </p>
              <p className="font-poppins leading-tight">
                <Link to="/about" className="text-white hover:text-white/80 transition-colors">About</Link>
              </p>
            </div>
          </div>
          <div className="space-y-1.5 flex-shrink-0">
            <h3 className="text-white font-bold text-base font-poppins">HQ</h3>
            <div className="text-white space-y-1">
              <p className="font-poppins leading-tight">Forza</p>
              <p className="font-poppins leading-tight">3211 Nebraska Ave</p>
              <p className="font-poppins leading-tight">Suite 300</p>
              <p className="font-poppins leading-tight">Council Bluffs,</p>
              <p className="font-poppins leading-tight">Iowa 51501</p>
            </div>
          </div>
          <div className="space-y-1.5 flex-shrink-0">
            <h3 className="text-white font-bold text-base font-poppins">Contact</h3>
            <div className="text-white space-y-1">
              <p className="font-poppins leading-tight">O. 402.731.9300</p>
              <p className="font-poppins leading-tight">
                <a href="mailto:support@forzabuilt.com" className="hover:underline">support@forzabuilt.com</a>
              </p>
              <p className="font-poppins leading-tight">Mon-Fri | 8 AM - 4:30 PM</p>
              <p className="font-poppins leading-tight">CST</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block border-t border-white/30 mb-5 max-w-[56rem] mx-auto"></div>
        <div className="hidden lg:block max-w-[56rem] mx-auto">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <img src="/images/misc/Flag Icon with asterisk 1.png" alt="PROUDLY MADE IN AMERICA" className="h-16 w-auto object-contain flex-shrink-0" />
              <p className="text-white/70 text-xs font-poppins leading-tight">
                *Forza industrial adhesive and industrial sealants are proudly<br />
                manufactured in the USA from domestic and limited foreign<br />
                components. © {new Date().getFullYear()} Forza Built. All rights reserved.
              </p>
            </div>
            <div className="flex items-center">
              <Link to="/canister-returns" className="bg-[#F2611D] text-white hover:bg-[#E6540D] transition-colors font-poppins font-normal px-6 py-2 rounded-full text-sm whitespace-nowrap">
                Empty Canister Returns
              </Link>
            </div>
            <div className="flex flex-col items-end">
              <h3 className="text-white font-normal text-base font-poppins mb-1">Follow Us</h3>
              <div className="flex items-center gap-3">
                <a href="https://www.linkedin.com/company/forza-built/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:opacity-80 transition-opacity w-6 h-6">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:opacity-80 transition-opacity w-6 h-6">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterV2;
