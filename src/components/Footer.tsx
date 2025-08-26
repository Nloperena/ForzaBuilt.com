import React from 'react';
import forzaLogo from '@/assets/images/forza-logo-full.png';

const Footer = () => {
  return (
    <footer className="bg-[#1B3764] text-white py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Left: Logo and HQ */}
          <div className="flex-1 min-w-[250px]">
            <img 
              src={forzaLogo}
              alt="Forza Logo"
              className="h-8 w-auto sm:h-[4.5rem] mb-2 -ml-2.5"
            />
            <div className="leading-tight">
              <div className="text-[#F16022] font-extrabold font-kallisto mb-1">HQ</div>
              <div className="font-extrabold font-kallisto">Forza</div>
              <div>3211 Nebraska Ave, Suite 300</div>
              <div>Council Bluffs, Iowa 51501</div>
            </div>
          </div>
          
          {/* Center: Contact and Socials */}
          <div className="flex-1 min-w-[250px] text-left md:text-center">
            <div className="mb-3 leading-tight">
              <div className="text-[#F16022] font-extrabold font-kallisto mb-1">CONTACT</div>
              <div>402.731.9300</div>
              <div><a href="mailto:info@forzabuilt.com" className="underline text-white">info@forzabuilt.com</a></div>
              <div>Mon - Fri | 8 AM - 4:30 PM</div>
            </div>
            <div className="leading-tight">
              <div className="text-[#F16022] font-extrabold font-kallisto mb-1">SOCIALS</div>
              <div className="flex justify-start md:justify-center items-center gap-3 mt-1">
                <a href="https://www.linkedin.com/company/forza-built/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-linkedin">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="32" height="32" focusable="false">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer-youtube">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="32" height="32" focusable="false">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Right: Optimization Inquiries and Made in USA */}
          <div className="flex-1 min-w-[250px] text-left">
            <div className="mb-3 leading-tight">
              <div className="text-[#F16022] font-extrabold font-kallisto mb-1">OPTIMIZATION INQUIRIES</div>
              <div>Interested in working with us?</div>
              <div><a href="mailto:sales@forzabuilt.com" className="font-bold underline text-white">sales@forzabuilt.com</a></div>
            </div>
            <div className="flex justify-start">
              <a href="https://www.forzabuilt.com/made-in-america/" target="_blank" rel="noopener noreferrer">
                <img
                  src="/Flag Icon with asterisk 1.png"
                  alt="Proudly Made in the USA"
                  className="w-auto h-16 sm:h-20 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-white/10">
        <p className="text-[10px] leading-snug text-white/70 font-poppins mb-3 text-left md:text-center">
          *Forza industrial adhesive and industrial sealants are proudly manufactured in the USA from domestic and limited foreign components.
        </p>
        <p className="text-[10px] text-white/60 text-left md:text-center font-poppins">
          © {new Date().getFullYear()} Forza Built. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 