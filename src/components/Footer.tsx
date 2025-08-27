import React from 'react';
import forzaLogo from '@/assets/images/forza-logo-full.png';

const Footer = () => {
  return (
    <footer className="bg-[#1B3764] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Leftmost Section: Company Information */}
          <div className="space-y-4">
            <img 
              src={forzaLogo}
              alt="Forza Logo"
              className="h-12 w-auto mb-4"
            />
            <div className="text-sm leading-relaxed">
              <p className="text-white/90 mb-4">OUR TEAM. OUR SCIENCE. YOUR FORCE.</p>
              <div className="bg-white !bg-opacity-100 rounded-lg p-3 mb-4 inline-block" style={{ backgroundColor: '#ffffff' }}>
                <div className="text-black font-semibold text-sm">PROUDLY MADE IN THE USA</div>
              </div>
              <p className="text-xs text-white/70 mb-2">
                *Forza industrial adhesive and industrial sealants are proudly manufactured in the USA from domestic and limited foreign components.
              </p>
              <p className="text-xs text-white/60">
                © {new Date().getFullYear()} Forza Built. All rights reserved.
              </p>
            </div>
          </div>
          
          {/* Second Section: Headquarters */}
          <div className="space-y-3">
            <div className="text-[#F16022] font-bold text-lg">HQ</div>
            <div className="text-white space-y-1">
              <div className="font-semibold">Forza</div>
              <div>3211 Nebraska Ave,</div>
              <div>Suite 300</div>
              <div>Council Bluffs, Iowa 51501</div>
            </div>
          </div>
          
          {/* Third Section: Contact Information */}
          <div className="space-y-3">
            <div className="text-[#F16022] font-bold text-lg">CONTACT</div>
            <div className="text-white space-y-1">
              <div>402.731.9300</div>
              <div><a href="mailto:info@forzabuilt.com" className="hover:underline">info@forzabuilt.com</a></div>
              <div>Monday - Friday</div>
              <div>8 AM - 4:30 PM</div>
            </div>
          </div>
          
          {/* Rightmost Section: Optimization Inquiries & Stay Connected */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="text-[#F16022] font-bold text-lg">OPTIMIZATION INQUIRIES</div>
              <div className="text-white">Interested in working with us?</div>
              <div><a href="mailto:sales@forzabuilt.com" className="text-white hover:underline">sales@forzabuilt.com</a></div>
            </div>
            
            <div className="space-y-3">
              <div className="text-[#F16022] font-bold text-lg">STAY CONNECTED</div>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/company/forza-built/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-white p-2 rounded hover:bg-gray-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" width="24" height="24">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="bg-white p-2 rounded hover:bg-gray-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" width="24" height="24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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

export default Footer; 