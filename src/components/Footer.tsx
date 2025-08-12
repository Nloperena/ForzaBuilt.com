import React from 'react';
import NewsletterSignup from './NewsletterSignup';

const Footer = () => {
  return (
    <footer className="bg-[#1B3764] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Left: Logo and Info */}
        <div className="flex-1 flex flex-col gap-4 min-w-[250px]">
          <div className="flex items-center gap-4">
            <div className="footer-made-in-america-video mt-8 flex justify-center">
              
            </div>
            <div>
              <span className="text-4xl font-extrabold font-sans font-kallisto">Forza</span>
              <div className="text-[var(--forza-blaze-orange)] text-xs font-bold tracking-widest mt-1">OUR TEAM. OUR SCIENCE. YOUR FORCE.</div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://www.linkedin.com/company/forza-built/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-linkedin">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="24" height="24" focusable="false">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
              </svg>
            </a>
          </div>
        </div>
        {/* Center: Address and Contact */}
        <div className="flex-1 min-w-[250px]">
          <div className="mb-4">
            <span className="text-[var(--forza-blaze-orange)] font-extrabold font-kallisto">HQ</span><br />
            <span className="font-extrabold font-kallisto">Forza</span><br />
            3211 Nebraska Ave,<br />
            Suite 300<br />
            Council Bluffs, Iowa 51501
          </div>
          <div>
            <span className="text-[var(--forza-blaze-orange)] font-extrabold font-kallisto">CONTACT</span><br />
            O. 402.731.9300<br />
            <a href="mailto:support@forzabuilt.com" className="underline text-white">support@forzabuilt.com</a><br />
            <span>Mon – Fri | 8:00 AM – 4:30 PM CST</span>
          </div>
        </div>
        {/* Right: Optimization, Newsletter */}
        <div className="flex-1 min-w-[250px] flex flex-col gap-4">
          <div>
            <span className="text-[var(--forza-blaze-orange)] font-extrabold font-kallisto">OPTIMIZATION INQUIRIES</span><br />
            <span>Interested in working with us?</span><br />
            <a href="mailto:sales@forzabuilt.com" className="font-bold underline text-white">sales@forzabuilt.com</a>
          </div>
          <div className="footer-made-in-america-video mt-8 flex justify-center">
            <a href="https://www.forzabuilt.com/made-in-america/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://ruggedred.com/static/media/Flag%20Icon.b74a43083f2f1e917f1a.png"
                alt="Made in America Flag"
                className="w-auto h-24 object-contain"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-white/10">
        <p className="text-[10px] leading-snug text-white/70 font-poppins">
          Forza industrial adhesive and industrial sealants are proudly manufactured in the USA from domestic and limited foreign components.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 