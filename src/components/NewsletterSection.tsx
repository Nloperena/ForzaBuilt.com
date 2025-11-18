import React, { useState } from 'react';
import { useGradientMode } from '@/contexts/GradientModeContext';

interface NewsletterSectionProps {
  showHeading?: boolean;
}

const NewsletterSection: React.FC<NewsletterSectionProps> = ({ showHeading = true }) => {
  const [showNewsletterForm, setShowNewsletterForm] = useState(false);
  const [formData, setFormData] = useState({
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mode, getGradientClasses } = useGradientMode();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewsletterSubmitInline = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ email: '' });
      alert('Thank you for subscribing to our newsletter!');
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowNewsletterForm(false);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowNewsletterForm(false);
      setFormData({ email: '' });
      // Here you would typically send the data to your backend
      alert('Thank you for subscribing to our newsletter!');
    }, 1000);
  };

  return (
    <>
      <section className="relative py-4 sm:py-6 md:py-8 lg:py-10 bg-[#f3f5f7]">
        {/* Edge triangles positioned at left and right viewport edges */}

        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6">
          {showHeading && (
            <div className="text-center mb-4 md:mb-6 lg:mb-8 relative">
              <h2
                className="text-fluid-heading font-normal text-[#2c476e] font-poppins leading-tight break-words relative z-10 tracking-tight text-balance"
                style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 56px)' }}
              >
                Elevate Your Performance
              </h2>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-stretch max-w-[1000px] mx-auto">
            {/* Newsletter Signup - Primary Focus */}
            <div className="order-2 lg:order-1 h-full flex flex-col rounded-xl lg:rounded-xl shadow-xl overflow-hidden bg-gradient-to-br from-[#477197] to-[#2c476e] border border-white/10">
              <div className="p-4 md:p-5 lg:p-6 flex-1 flex flex-col items-center text-center">
                {/* Newsletter Icon */}
                <div className="mb-3 flex justify-start">
                  <img 
                    src="/images/Newspaper icon.svg" 
                    alt="Newsletter" 
                    className="w-10 h-10 md:w-12 md:h-12 text-white"
                  />
                </div>

                <div className="mb-4">
                  <h3 className="text-white font-poppins text-lg md:text-xl lg:text-xl font-bold">Join Our Newsletter</h3>
                </div>

                <div className="space-y-2.5 md:space-y-3 mb-5 flex-1 w-full">
                  <div className="flex items-start gap-2 justify-start">
                    <svg className="mt-0.5 size-4 md:size-4.5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-white/90 text-xs md:text-sm lg:text-sm font-medium text-left">Early access to new product launches and innovations</p>
                  </div>
                  <div className="flex items-start gap-2 justify-start">
                    <svg className="mt-0.5 size-4 md:size-4.5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-white/90 text-xs md:text-sm lg:text-sm font-medium text-left">Exclusive industry insights and technical solutions</p>
                  </div>
                  <div className="flex items-start gap-2 justify-start">
                    <svg className="mt-0.5 size-4 md:size-4.5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-white/90 text-xs md:text-sm lg:text-sm font-medium text-left">Expert tips and best practices for your applications</p>
                  </div>
                </div>

                <div className="mt-auto w-full flex justify-center">
                  <button
                    onClick={handleNewsletterSubmitInline}
                    disabled={isSubmitting}
                    className="rounded-full bg-[#F2611D] text-white px-3 lg:px-4 xl:px-6 py-1.5 lg:py-2 xl:py-3 text-xs lg:text-sm xl:text-base font-medium hover:bg-[#F2611D]/90 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
              </div>
            </div>

            {/* Follow Our LinkedIn Section - Secondary Focus */}
            <div className="order-1 lg:order-2 h-full flex flex-col rounded-xl lg:rounded-xl shadow-xl overflow-hidden bg-gradient-to-br from-[#477197] to-[#2c476e] border border-white/10 relative">
              {/* Decorative background elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F2611D] rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              </div>
              
              <div className="p-4 md:p-5 lg:p-6 flex-1 flex flex-col items-center text-center relative z-10">
                <div className="w-full">
                  {/* Large LinkedIn Icon */}
                  <div className="mb-3 flex justify-center">
                      <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                  </div>

                  <h3 className="text-white font-poppins text-lg md:text-xl lg:text-xl font-bold mb-4 text-center">Follow Our LinkedIn</h3>
                  
                  {/* Benefits List */}
                  <div className="mb-5 space-y-2.5 md:space-y-3 w-full">
                    <div className="flex items-start gap-2 justify-start">
                      <svg className="mt-0.5 size-4 md:size-4.5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-white/90 text-xs md:text-sm lg:text-sm font-medium text-left">Stay informed with the latest industry insights & trends</p>
                    </div>
                    <div className="flex items-start gap-2 justify-start">
                      <svg className="mt-0.5 size-4 md:size-4.5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-white/90 text-xs md:text-sm lg:text-sm font-medium text-left">Discover our latest product launches and innovations</p>
                    </div>
                    <div className="flex items-start gap-2 justify-start">
                      <svg className="mt-0.5 size-4 md:size-4.5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-white/90 text-xs md:text-sm lg:text-sm font-medium text-left">Get expert tips and best practices for your applications</p>
                    </div>
                  </div>
                  
                  {/* Large CTA Button */}
                  <div className="flex justify-center mt-auto">
                    <a
                      href="https://linkedin.com/company/forzabuilt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-[#F2611D] text-white px-3 lg:px-4 xl:px-6 py-1.5 lg:py-2 xl:py-3 text-xs lg:text-sm xl:text-base font-medium hover:bg-[#F2611D]/90 transition-all duration-300"
                      aria-label="Follow ForzaBuilt on LinkedIn"
                    >
                      Follow Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Modal - Simple & Clean */}
      {showNewsletterForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 ">
          <div className={`relative rounded-xl lg:rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden bg-gradient-to-b ${getGradientClasses()} animate-in zoom-in-95 duration-300`}>
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 pointer-events-none animate-pulse"></div>
            
            {/* Header with Logo */}
            <div className="relative p-4 md:p-6 border-b border-white/20 text-center">
              <div className="flex justify-end mb-3">
                <button 
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white/25 rounded-full transition-colors"
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
                  src="/logos/Forza-lion-logo.png"
                  alt="Forza Built Lion Logo"
                  className="w-20 h-20 md:w-24 md:h-24 object-contain animate-in fade-in-50 duration-500 delay-200"
                />
              </div>
              
              <h2 className="text-xl md:text-2xl font-kallisto font-black text-white mb-2">Join Our Newsletter</h2>
              <p className="text-white text-sm">Stay connected with the latest industry insights and innovations</p>
            </div>

            {/* Simple Form Content */}
            <div className="p-4 md:p-6 bg-white/15 ">
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div>
                  <label htmlFor="modalEmail" className="block text-sm font-medium text-white mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="modalEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F16022] focus:border-transparent transition-all duration-200"
                    placeholder="Email Address"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-xl px-6 py-4 transition-all duration-200 text-lg font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-4 border border-[#F2611D]"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-white/20 bg-white/15  text-center">
              <p className="text-white text-sm">We'll never share your information. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterSection;