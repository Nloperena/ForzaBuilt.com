import React, { useState } from 'react';
import { brandColors, typography } from '@/styles/brandStandards';
import { useGradientMode } from '@/contexts/GradientModeContext';

const Footer = () => {
  const [showNewsletterForm, setShowNewsletterForm] = useState(false);
  const { mode, getGradientClasses } = useGradientMode();
  
  // Use white logo from public folder
  const logoSrc = '/Forza-Eagle-Logo-White.svg';

  const handleCloseModal = () => {
    setShowNewsletterForm(false);
  };

  return (
    <footer className="relative py-12 px-6 overflow-hidden bg-gradient-to-t from-[#477197] to-[#2c476e] text-white">
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="mb-12">
          <img 
            src={logoSrc}
            alt="Forza Logo"
            className="h-32 w-auto"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
              <p className="font-poppins">3211 Nebraska Ave,</p>
              <p className="font-poppins">Suite 300</p>
              <p className="font-poppins">Council Bluffs, Iowa</p>
              <p className="font-poppins">51501</p>
            </div>
          </div>
          
          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg font-poppins">Contact</h3>
            <div className="text-white space-y-1">
              <p className="font-poppins">O. 402.731.9300</p>
              <p className="font-poppins"><a href="mailto:support@forzabuilt.com" className="hover:underline">support@forzabuilt.com</a></p>
              <p className="font-poppins">Mon-Fri | 8 AM - 4:30 PM</p>
              <p className="font-poppins">CST</p>
            </div>
          </div>
        </div>

        {/* Bottom Section with Flag, Optimization Inquiries, and Social Media */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Made in USA Flag Column */}
          <div className="space-y-4">
            <div>
              <img 
                src="/Flag Icon with asterisk 1.png"
                alt="PROUDLY MADE IN AMERICA"
                className="w-48 h-auto object-cover"
              />
            </div>
          </div>

          {/* Optimization Inquiries Column */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg font-poppins">Optimization Inquiries</h3>
            <div className="text-white space-y-1">
              <p className="text-white/70 font-poppins">Interested in working with us?</p>
              <p className="font-poppins">sales@forzabuilt.com</p>
            </div>
          </div>

          {/* Social Media Column */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg font-poppins">Follow Us</h3>
            <div className="flex space-x-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded flex items-center justify-center hover:bg-white/30 transition-colors">
                <span className="text-white text-xs font-bold">in</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 rounded flex items-center justify-center hover:bg-white/30 transition-colors">
                <span className="text-white text-xs">▶</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Separator Line */}
        <div className="border-t border-gray-400 mb-6"></div>

        {/* Copyright Notice */}
        <div className="text-left">
          <p className="text-white/70 text-xs max-w-[400px]">
            *Forza industrial adhesive and industrial sealants are proudly manufactured in the USA from domestic and limited foreign components. © {new Date().getFullYear()} Forza Built. All rights reserved.
          </p>
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