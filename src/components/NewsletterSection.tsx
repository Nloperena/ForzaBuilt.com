import React, { useMemo, useState } from 'react';
import blogPostsData from '@/data/blogPosts.json';
import { generateSlugFromTitle } from '@/lib/utils';
import { useGradientMode } from '@/contexts/GradientModeContext';

const NewsletterSection = () => {
  const [showNewsletterForm, setShowNewsletterForm] = useState(false);
  const [formData, setFormData] = useState({
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mode, getGradientClasses, getTextClasses, getTextSecondaryClasses } = useGradientMode();

  const recentPosts = useMemo(() => {
    return blogPostsData.slice(0, 2);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewsletterSubmitInline = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <section className="relative py-16 md:py-20 bg-[#f3f5f7]">
        {/* Edge triangles positioned at left and right viewport edges */}

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 relative">

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#2c476e] font-poppins leading-tight break-words relative z-10 tracking-tight text-balance">Stay Ahead with Forza</h2>
            <p className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl mx-auto font-poppins relative z-10">Get exclusive access to industry insights, product innovations, and expert application tips delivered to your inbox.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch max-w-[1500px] mx-auto">
            {/* Newsletter Signup - Primary Focus */}
            <div className="order-2 lg:order-1 h-full flex flex-col rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-[#477197] to-[#2c476e] border border-white/10">
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-white font-poppins text-2xl md:text-3xl font-bold">Join Our Newsletter</h3>
                </div>

                <div className="space-y-6 mb-8 flex-1">
                  <div className="flex items-start gap-4">
                    <svg className="mt-1 size-7 md:size-8 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-white text-base md:text-lg font-medium">Early access to new product launches and innovations</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <svg className="mt-1 size-7 md:size-8 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-white text-base md:text-lg font-medium">Exclusive industry insights and technical solutions</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <svg className="mt-1 size-7 md:size-8 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-white text-base md:text-lg font-medium">Expert tips and best practices for your applications</p>
                  </div>
                </div>

                <div className="space-y-6 mt-auto">
                  <form onSubmit={handleNewsletterSubmitInline} className="mt-2 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="you@company.com"
                      className="h-11 px-4 rounded-lg bg-white text-[#2c476e] placeholder:text-slate-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 px-5 rounded-lg bg-[#F2611D] text-white font-bold hover:bg-[#F2611D]/90 shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </form>
                  <p className="text-white text-xs text-center">No spam, unsubscribe at any time</p>
                  <button
                    onClick={() => setShowNewsletterForm(true)}
                    className="text-white hover:text-white text-xs underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    Or use detailed form
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Blog Section - Secondary Focus */}
            <div className="order-1 lg:order-2 h-full flex flex-col rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-[#477197] to-[#2c476e] border border-white/10">
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-white font-poppins text-2xl md:text-3xl font-bold">Featured Articles</h3>
                </div>

                <ul role="list" className="space-y-4 mb-8 flex-1">
                  {recentPosts.map((post, index) => {
                    const slug = generateSlugFromTitle(post.title);
                    return (
                      <li key={post.id}>
                        <a
                          href={`/blog/${slug}`}
                          className="group rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/30 transition ring-0 hover:ring-1 hover:ring-white/40 backdrop-blur-sm block p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                          aria-label={`Read article: ${post.title}`}
                        >
                          <div className="flex gap-4">
                            <div className="aspect-square w-24 sm:w-28 overflow-hidden rounded-lg bg-white/20 flex-shrink-0">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = '/products/IC933-bundle-1024x1024.png';
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold uppercase tracking-wide text-white mb-1">{post.category}</div>
                              <h4 className="text-white group-hover:text-white font-bold leading-snug line-clamp-2 text-sm md:text-base transition-colors">{post.title}</h4>
                              <div className="mt-1.5 text-white text-xs md:text-sm line-clamp-3">{post.excerpt}</div>
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <div className="space-y-6 mt-auto">
                  <a
                    href="/blog"
                    className="inline-flex items-center gap-2 self-start text-white hover:text-white font-semibold text-sm px-3 py-2 rounded-lg hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    aria-label="Explore all blog articles"
                  >
                    Explore all articles
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Modal - Simple & Clean */}
      {showNewsletterForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 ">
          <div className={`relative rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden bg-gradient-to-b ${getGradientClasses()} animate-in zoom-in-95 duration-300`}>
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
                  src="/Forza-lion-logo.png"
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