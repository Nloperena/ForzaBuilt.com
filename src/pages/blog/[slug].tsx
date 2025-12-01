import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderV2 from '../../components/Header/HeaderV2';
import FooterV2 from '../../components/FooterV2';
import { Helmet } from 'react-helmet';
import blogPostsData from '../../data/blogPosts.json';
import { generateSlugFromTitle } from '@/lib/utils';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  url: string;
  keyTakeaways?: string[];
  fullContent?: string;
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const data: BlogPost[] = blogPostsData;
        const post = data.find(post => generateSlugFromTitle(post.title) === slug);
        
        if (post) {
          setBlogPost(post);
          setBlogPosts(data);
        } else {
          setError('Blog post not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading blog data:', error);
        setError('Failed to load blog post');
        setLoading(false);
      }
    };

    if (slug) {
      loadBlogData();
    }
  }, [slug]);

  const sanitizedFullContent = useMemo(() => {
    const html = blogPost?.fullContent || '';
    if (!html) return '';
    try {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        const headings = temp.querySelectorAll('h1,h2,h3,h4,h5,h6');
        headings.forEach((h) => {
          const text = (h.textContent || '').trim().toLowerCase();
          if (text === 'share this post') {
            h.remove();
          }
        });
        return temp.innerHTML;
      }
    } catch (e) {
      // no-op
    }
    return html.replace(/<h[1-6][^>]*>\s*share\s+this\s+post\s*<\/h[1-6]>/gi, '');
  }, [blogPost?.fullContent]);

  const recentPosts = blogPosts
    .filter(post => post.id !== blogPost?.id)
    .slice(0, 3);

  const relatedPosts = blogPosts
    .filter(post => post.id !== blogPost?.id && post.category === blogPost?.category)
    .slice(0, 3);

  const moreToExplorePosts = blogPosts
    .filter(post => post.id !== blogPost?.id)
    .slice(0, 6);

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <HeaderV2 />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F2611D] mx-auto mb-4"></div>
            <p className="text-[#1B3764]/80 font-bold font-poppins">Loading blog post...</p>
          </div>
        </div>
        <FooterV2 />
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="bg-white min-h-screen">
        <HeaderV2 />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-[#1B3764] text-2xl font-bold mb-4 font-kallisto">Blog Post Not Found</h1>
            <p className="text-[#1B3764]/80 mb-6 font-poppins">The blog post you're looking for doesn't exist.</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center px-6 py-3 bg-[#F2611D] text-white font-bold rounded-full hover:bg-[#F2611D]/80 transition-colors font-poppins"
            >
              Back to Learning Center
            </Link>
          </div>
        </div>
        <FooterV2 />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col relative overflow-x-hidden text-[#1B3764]">
      <Helmet>
        <title>{blogPost.title} | ForzaBuilt Learning Center</title>
        <meta name="description" content={blogPost.excerpt} />
        <meta name="keywords" content={`${blogPost.category}, adhesives, industrial, manufacturing, ${blogPost.title.toLowerCase()}`} />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:image" content={blogPost.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={blogPost.date} />
        <meta property="article:section" content={blogPost.category} />
        <link rel="canonical" href={`https://forzabuilt.com/blog/${generateSlugFromTitle(blogPost.title)}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": blogPost.title,
            "description": blogPost.excerpt,
            "image": `https://forzabuilt.com${blogPost.image}`,
            "author": {
              "@type": "Organization",
              "name": "ForzaBuilt",
              "url": "https://forzabuilt.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "ForzaBuilt",
              "logo": {
                "@type": "ImageObject",
                "url": "https://forzabuilt.com/forza-logo-full.png"
              }
            },
            "datePublished": blogPost.date,
            "dateModified": blogPost.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://forzabuilt.com/blog/${generateSlugFromTitle(blogPost.title)}`
            },
            "articleSection": blogPost.category,
            "keywords": `${blogPost.category}, adhesives, industrial, manufacturing, ${blogPost.title.toLowerCase()}`,
            "url": `https://forzabuilt.com/blog/${generateSlugFromTitle(blogPost.title)}`
          })}
        </script>
      </Helmet>

      <HeaderV2 />
      
      {/* Breadcrumb - Light Grey Background */}
      <nav className="bg-gray-50 border-b border-gray-200 relative z-30 pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500 font-poppins">
            <Link to="/" className="hover:text-[#F2611D] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#F2611D] transition-colors">Learning Center</Link>
            <span>/</span>
            <span className="text-[#1B3764] font-medium truncate">{blogPost.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section - Gradient Background */}
      <section className="relative py-16 md:py-24 px-4 text-center z-20 bg-gradient-to-bl from-[#477197] to-[#2c476e]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link 
              to="/blog" 
              className="inline-flex items-center justify-center text-white/90 hover:text-white transition-colors font-poppins text-sm font-medium group"
            >
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Learning Center
            </Link>
          </div>
          <h1 className="font-black text-white font-kallisto text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight break-words mb-6">
            {blogPost.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/80 text-sm font-poppins">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(blogPost.date).toLocaleDateString()}
            </span>
            <span>•</span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white border border-white/20">{blogPost.category}</span>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar - White Background */}
      <section className="py-16 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <div className="mb-10 bg-gray-100 border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                <img 
                  src={blogPost.image} 
                  alt={blogPost.title}
                  className="w-full object-contain bg-transparent"
                  style={{ maxHeight: '600px' }}
                  onError={(e) => {
                    console.warn(`Failed to load image: ${blogPost.image}`);
                    e.currentTarget.src = '/products/IC933-bundle-1024x1024.png';
                  }}
                />
              </div>

              {/* Full Blog Content */}
              <motion.div 
                className="prose prose-lg max-w-none prose-headings:text-[#1B3764] prose-headings:font-kallisto prose-headings:font-black prose-p:text-gray-600 prose-p:font-poppins prose-strong:text-[#1B3764] prose-strong:font-bold prose-ul:text-gray-600 prose-ol:text-gray-600 prose-a:text-[#F2611D] prose-a:font-bold prose-blockquote:text-gray-500 prose-blockquote:border-l-[#F2611D] prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-code:text-[#1B3764] prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-pre:text-gray-200 prose-pre:bg-[#1B3764] prose-hr:border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {blogPost.fullContent ? (
                  <div dangerouslySetInnerHTML={{ __html: sanitizedFullContent }} />
                ) : (
                  <div>
                    <motion.div 
                      className="mb-10 p-8 bg-[#f5f7fa] rounded-2xl border border-gray-100"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-2xl font-bold text-[#1B3764] font-kallisto mb-4 mt-0">Article Summary</h2>
                      <p className="text-gray-700 leading-relaxed font-poppins mb-0">
                        {blogPost.excerpt}
                      </p>
                    </motion.div>

                    {blogPost.keyTakeaways && blogPost.keyTakeaways.length > 0 && (
                      <motion.div 
                        className="mb-10"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <h2 className="text-2xl font-bold text-[#1B3764] font-kallisto mb-6">Key Takeaways</h2>
                        <ul className="space-y-4 list-none pl-0">
                          {blogPost.keyTakeaways.map((takeaway, index) => (
                            <motion.li 
                              key={index} 
                              className="flex items-start p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                              <span className="text-[#F2611D] mr-4 mt-1 flex-shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span className="text-gray-700 font-poppins">{takeaway}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <motion.div 
                  className="mt-16 pt-16 border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-[#1B3764] font-kallisto">Related Articles</h3>
                    <Link to="/blog" className="text-[#F2611D] font-bold font-poppins hover:underline">View All</Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {relatedPosts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ 
                            y: -5,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <Link
                            to={`/blog/${generateSlugFromTitle(post.title)}`}
                            className="group block bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
                          >
                            <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                  e.currentTarget.src = '/products/IC933-bundle-1024x1024.png';
                                }}
                              />
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                              <span className="inline-block px-2.5 py-1 text-[#1B3764] text-xs font-bold rounded-full mb-3 font-poppins bg-[#1B3764]/5 self-start">
                                {post.category}
                              </span>
                              <h4 className="font-bold text-[#1B3764] group-hover:text-[#F2611D] transition-colors line-clamp-2 font-kallisto text-lg mb-2">
                                {post.title}
                              </h4>
                              <p className="text-gray-500 text-sm line-clamp-2 font-poppins">
                                {post.excerpt}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-32 lg:self-start">
              {/* Recent Posts */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-[#1B3764] font-kallisto mb-6 border-b border-gray-100 pb-4">
                  Recent Posts
                </h3>
                <div className="space-y-6">
                  {recentPosts.map((post, index) => (
                    <div key={post.id} className="group">
                      <Link to={`/blog/${generateSlugFromTitle(post.title)}`} className="flex gap-4 items-start">
                        <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.src = '/products/IC933-bundle-1024x1024.png';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-[#1B3764] group-hover:text-[#F2611D] transition-colors line-clamp-2 font-kallisto mb-1 leading-snug">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-400 font-poppins">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-br from-[#1B3764] to-[#2c476e] rounded-2xl shadow-lg p-8 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold font-kallisto mb-3">
                    Need Expert Advice?
                  </h3>
                  <p className="text-sm text-white/80 mb-6 font-poppins leading-relaxed">
                    Our engineering team is ready to help you find the perfect adhesive solution for your application.
                  </p>
                  <Link
                    to="/contact"
                    className="block w-full bg-[#F2611D] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#F2611D]/90 transition-all font-poppins shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Contact an Engineer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More To Explore Carousel - Light Grey Background */}
      {moreToExplorePosts.length > 0 && (
        <section className="py-20 bg-[#f5f7fa] border-t border-gray-200 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1B3764] font-kallisto mb-4">More To Explore</h2>
              <p className="text-gray-600 font-poppins max-w-2xl mx-auto">
                Continue your journey with these additional resources and insights from our experts.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {moreToExplorePosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${generateSlugFromTitle(post.title)}`}
                  className="group block bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
                >
                  <div className="aspect-[16/9] bg-gray-50 overflow-hidden relative border-b border-gray-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-contain p-6 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = '/products/IC933-bundle-1024x1024.png';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[#1B3764] text-xs font-bold rounded-full shadow-sm font-poppins border border-gray-100">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[#1B3764] group-hover:text-[#F2611D] transition-colors mb-3 line-clamp-2 font-kallisto">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-4 font-poppins flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                      <span className="text-xs text-gray-400 font-poppins">
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      <span className="text-[#F2611D] font-bold text-sm group-hover:translate-x-1 transition-transform font-poppins flex items-center">
                        Read More 
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section - Gradient Break */}
      <section className="py-20 bg-gradient-to-bl from-[#477197] to-[#2c476e] text-center relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-kallisto mb-6">
              Ready to Transform Your Manufacturing?
            </h2>
            <p className="text-xl text-white/90 mb-10 font-poppins max-w-2xl mx-auto">
              Discover how our high-performance adhesive solutions can improve your product quality and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-4 bg-white text-[#1B3764] font-bold rounded-full hover:bg-gray-100 transition-colors font-poppins shadow-lg text-lg"
              >
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-[#F2611D] text-white font-bold rounded-full hover:bg-[#F2611D]/90 transition-colors font-poppins shadow-lg text-lg"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterV2 />
    </div>
  );
};

export default BlogPostPage;
