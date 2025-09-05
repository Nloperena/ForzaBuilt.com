import React, { useMemo, useState } from 'react';
import blogPostsData from '@/data/blogPosts.json';
import { generateSlugFromTitle } from '@/lib/utils';
import EdgeTrianglesBackground from './common/EdgeTrianglesBackground';
import { useGradientMode } from '@/contexts/GradientModeContext';

const NewsletterSection = () => {
  const [showNewsletterForm, setShowNewsletterForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: ''
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
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: ''
      });
      // Here you would typically send the data to your backend
      alert('Thank you for subscribing to our newsletter!');
    }, 1000);
  };

  return (
    <>
      <section className={`relative py-16 md:py-24 ${
        mode === 'light' 
          ? 'bg-[#e8e8e8]' 
          : `bg-gradient-to-t ${getGradientClasses()}`
      } overflow-hidden`}>
        {/* Edge triangles positioned at left and right viewport edges */}
        <EdgeTrianglesBackground 
          leftImage="/Gradients and Triangles/Small Science Triangles 2.png"
          rightImage="/Gradients and Triangles/Small Science Triangles.png"
          opacity={0.6}
          scale={0.9}
          leftRotation={320}
          rightRotation={40}
          leftFlipH={true}
          rightFlipV={false}
          blendMode="overlay"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-14 relative">

            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black ${getTextClasses()} font-kallisto leading-none break-words relative z-10`}>Stay Ahead with Forza</h2>
            <p className={`mt-4 ${getTextSecondaryClasses()} text-base md:text-lg max-w-3xl mx-auto font-poppins relative z-10`}>Get exclusive access to industry insights, product innovations, and expert application tips delivered to your inbox.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Newsletter Signup - Primary Focus */}
            <div className="order-2 lg:order-1 h-full relative">
              
              <div className={`${
                mode === 'light' 
                  ? 'bg-white border-gray-200' 
                  : 'bg-white/10 border-white/20 backdrop-blur-md'
              } rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col relative z-10`}>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="mb-8">
                    <h3 className={`${getTextClasses()} font-kallisto text-2xl md:text-3xl font-black`}>Join Our Newsletter</h3>
                  </div>

                  <div className="space-y-6 mb-8 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#115B87] rounded-full mt-2 flex-shrink-0"></div>
                      <p className={`${getTextSecondaryClasses()} text-sm md:text-base`}>Early access to new product launches and innovations</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#115B87] rounded-full mt-2 flex-shrink-0"></div>
                      <p className={`${getTextSecondaryClasses()} text-sm md:text-base`}>Exclusive industry insights and technical solutions</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#115B87] rounded-full mt-2 flex-shrink-0"></div>
                      <p className={`${getTextSecondaryClasses()} text-sm md:text-base`}>Expert tips and best practices for your applications</p>
                    </div>
                  </div>

                  <div className="space-y-6 mt-auto">
                    <button
                      onClick={() => setShowNewsletterForm(true)}
                      className="w-full inline-flex items-center justify-center rounded-full px-6 py-5 font-bold text-white bg-[#F2611D] hover:bg-[#F2611D]/80 shadow-lg hover:shadow-xl transition-all duration-200 text-lg border border-[#F2611D]"
                    >
                      Subscribe to Newsletter
                    </button>
                    <p className={`${getTextSecondaryClasses()} text-xs text-center`}>No spam, unsubscribe at any time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Blog Section - Secondary Focus */}
            <div className="order-1 lg:order-2 h-full relative">

              <div className={`${
                mode === 'light' 
                  ? 'bg-white border-gray-200' 
                  : 'bg-white/10 border-white/20 backdrop-blur-md'
              } rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col relative z-10`}>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="mb-8">
                    <h3 className={`${getTextClasses()} font-kallisto text-2xl md:text-3xl font-black`}>Featured Articles</h3>
                  </div>

                  <div className="space-y-6 mb-8 flex-1">
                    {recentPosts.map((post, index) => {
                      const slug = generateSlugFromTitle(post.title);
                      return (
                        <a
                          key={post.id}
                          href={`/blog/${slug}`}
                          className={`group block rounded-xl overflow-hidden ${
                            mode === 'light' 
                              ? 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50' 
                              : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                          } transition-all`}
                        >
                          <div className="flex gap-4">
                            <div className={`w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-lg ${
                              mode === 'light' 
                                ? 'bg-gray-100' 
                                : 'bg-white/5'
                            }`}>
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
                              <div className="text-xs font-semibold uppercase tracking-wide text-[#115B87] mb-1">{post.category}</div>
                              <h4 className={`${getTextClasses()} font-bold leading-snug line-clamp-2 text-sm md:text-base group-hover:text-[#115B87] transition-colors`}>{post.title}</h4>
                              <div className={`mt-2 ${getTextSecondaryClasses()} text-xs line-clamp-2`}>{post.excerpt}</div>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  <div className="space-y-6 mt-auto">
                    <a
                      href="/blog"
                      className={`inline-flex items-center gap-2 ${getTextSecondaryClasses()} hover:${getTextClasses()} font-semibold text-sm transition-colors`}
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
        </div>
      </section>

      {/* Newsletter Signup Modal - Simple & Clean */}
      {showNewsletterForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`relative rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden bg-gradient-to-b ${getGradientClasses()} animate-in zoom-in-95 duration-300`}>
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
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white/90 mb-2">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#115B87] focus:border-transparent transition-all duration-200"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-white/90 mb-2">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#115B87] focus:border-transparent transition-all duration-200"
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
                    value={formData.email}
                    onChange={handleInputChange}
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
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F16022] focus:border-transparent transition-all duration-200"
                    placeholder="Company Name"
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
            <div className="p-4 md:p-6 border-t border-white/20 bg-white/10 backdrop-blur-sm text-center">
              <p className="text-white/60 text-sm">We'll never share your information. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterSection;