import React, { useState } from 'react';
import forzaLogo from '@/assets/images/forza-logo-full.png';
import { brandColors, typography } from '@/styles/brandStandards';
import { useGradientMode } from '@/contexts/GradientModeContext';

const Footer = () => {
  const [showNewsletterForm, setShowNewsletterForm] = useState(false);
  const { mode, getGradientClasses } = useGradientMode();
  
  // Use blue logo for light modes, regular logo for dark modes
  const logoSrc = mode === 'light' || mode === 'light2' 
    ? '/forza-logo-blue.svg' 
    : forzaLogo;

  const handleCloseModal = () => {
    setShowNewsletterForm(false);
  };

  return (
    <footer className={`relative py-5 px-6 overflow-hidden ${
      mode === 'light' || mode === 'light2'
        ? 'bg-white text-[#1B3764]' 
        : `text-white bg-gradient-to-b ${getGradientClasses()}`
    }`}>
      {/* Glassmorphic background - only for dark mode */}
      {mode !== 'light' && mode !== 'light2' && (
        <div className="absolute inset-0 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"></div>
      )}
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section: Company Information */}
          <div className="space-y-0">
            <img 
              src={logoSrc}
              alt="Forza Logo"
              className="h-30 w-auto -ml-5"
            />
            <div className="text-sm leading-relaxed" style={{ fontFamily: typography.body.fontFamily }}>
              {/* Flag and Social Media Icons on the same row */}
              <div className="flex items-center gap-10 mb-4">
                <img 
                  src="/Flag Icon with asterisk 1.png"
                  alt="PROUDLY MADE IN AMERICA"
                  className="w-32 h-auto"
                />
                {/* Social Media Icons */}
                <div className="flex items-center gap-10">
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={`transition-colors flex items-center ${
                    mode === 'light' || mode === 'light2'
                      ? 'text-[#1B3764] hover:text-[#115B87]'
                      : 'text-white/70 hover:text-white'
                  }`}>
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`transition-colors flex items-center ${
                    mode === 'light' || mode === 'light2'
                      ? 'text-[#1B3764] hover:text-[#115B87]'
                      : 'text-white/70 hover:text-white'
                  }`}>
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <p className={`text-[10px] ${
                mode === 'light' || mode === 'light2'
                  ? 'text-[#1B3764]/70'
                  : 'text-white/70'
              }`} style={{ fontFamily: typography.body.fontFamily, lineHeight: typography.body.lineHeight }}>
                *Forza industrial adhesive and industrial sealants are proudly manufactured in the USA from domestic and limited foreign components. © {new Date().getFullYear()} Forza Built. All rights reserved.
              </p>
            </div>
          </div>
          
          {/* Middle Section: Headquarters & Contact */}
                      <div className="space-y-6">
              <div className="space-y-3">
                <div className="text-lg font-bold" style={{ color: brandColors.primary.blazeOrange.hex, fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight, lineHeight: typography.headings.lineHeight }}>HQ</div>
                <div className={`space-y-0.5 ${
                  mode === 'light' || mode === 'light2'
                    ? 'text-[#1B3764]'
                    : 'text-white'
                }`} style={{ fontFamily: typography.body.fontFamily, lineHeight: typography.body.lineHeight }}>
                  <div className="font-semibold">Forza</div>
                  <div>3211 Nebraska Ave, Suite 300</div>
                  <div>Council Bluffs, Iowa 51501</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="text-lg font-bold" style={{ color: brandColors.primary.blazeOrange.hex, fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight, lineHeight: typography.headings.lineHeight }}>CONTACT</div>
                <div className={`space-y-0.5 ${
                  mode === 'light' || mode === 'light2'
                    ? 'text-[#1B3764]'
                    : 'text-white'
                }`} style={{ fontFamily: typography.body.fontFamily, lineHeight: typography.body.lineHeight }}>
                  <div>O. 402.731.9300</div>
                  <div><a href="mailto:support@forzabuilt.com" className="hover:underline">support@forzabuilt.com</a></div>
                  <div>Mon - Fri | 8:00 AM – 4:30 PM CST</div>
                </div>
              </div>
            </div>
          
          {/* Right Section: Optimization Inquiries & Newsletter */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="text-lg font-bold" style={{ color: brandColors.primary.blazeOrange.hex, fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight, lineHeight: typography.headings.lineHeight }}>OPTIMIZATION INQUIRIES</div>
              <div className={`${
                mode === 'light' || mode === 'light2'
                  ? 'text-[#1B3764]'
                  : 'text-white'
              }`} style={{ fontFamily: typography.body.fontFamily, lineHeight: typography.body.lineHeight }}>Interested in working with us?</div>
              <div><a href="mailto:sales@forzabuilt.com" className={`font-semibold hover:underline ${
                mode === 'light' || mode === 'light2'
                  ? 'text-[#1B3764]'
                  : 'text-white'
              }`} style={{ fontFamily: typography.body.fontFamily, lineHeight: typography.body.lineHeight }}>sales@forzabuilt.com</a></div>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => setShowNewsletterForm(true)}
                className="bg-[#F16022] hover:bg-[#F16022]/80 text-white rounded-full px-5 py-3 transition-all duration-200 text-lg font-bold shadow-lg hover:shadow-xl"
                style={{ backgroundColor: brandColors.primary.blazeOrange.hex, fontFamily: typography.body.fontFamily }}
              >
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Modal */}
      {showNewsletterForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`relative rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden bg-gradient-to-b ${getGradientClasses('industrial')} animate-in zoom-in-95 duration-300`}>
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 pointer-events-none animate-pulse"></div>
            
            {/* Header with Logo */}
            <div className="relative p-4 md:p-6 border-b border-white/20 text-center">
              <div className="flex justify-end mb-3">
                <button 
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              
              {/* Forza Lion Logo */}
              <div className="flex justify-center mb-4">
                <img
                  src="/Forza-lion-logo.png"
                  alt="Forza Built Lion Logo"
                  className="w-20 h-20 md:w-24 md:h-24 object-contain animate-in fade-in-50 duration-500 delay-200"
                />
              </div>
              
              <h2 className="text-xl md:text-2xl font-kallisto font-black text-white mb-2">Join Our Newsletter</h2>
              <p className="text-white/80 text-sm">Stay connected with the latest industry insights and innovations</p>
            </div>

            {/* Simple Form Content */}
            <div className="p-4 md:p-6 bg-white/10 backdrop-blur-sm">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white/90 mb-2">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F16022] focus:border-transparent transition-all duration-200"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-white/90 mb-2">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F16022] focus:border-transparent transition-all duration-200"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F16022] focus:border-transparent transition-all duration-200"
                    placeholder="Email Address"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white/90 mb-2">Company (Optional)</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F16022] focus:border-transparent transition-all duration-200"
                    placeholder="Company Name"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#F16022] hover:bg-[#F16022]/80 text-white rounded-xl px-6 py-4 transition-all duration-200 text-lg font-bold shadow-lg hover:shadow-xl mt-4"
                >
                  Subscribe Now
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-white/20 bg-white/10 backdrop-blur-sm text-center">
              <p className="text-white/60 text-sm">We'll never share your information. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer; 