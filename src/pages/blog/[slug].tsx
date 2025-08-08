import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Helmet } from 'react-helmet';

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
        const response = await fetch('/blogPosts.json');
        const data: BlogPost[] = await response.json();
        const post = data.find(post => post.id === slug);
        
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

  // Get recent posts (excluding current post)
  const recentPosts = blogPosts
    .filter(post => post.id !== blogPost?.id)
    .slice(0, 5);

  // Get related posts from same category
  const relatedPosts = blogPosts
    .filter(post => post.id !== blogPost?.id && post.category === blogPost?.category)
    .slice(0, 3);

  // Get posts for "More To Explore" carousel
  const moreToExplorePosts = blogPosts
    .filter(post => post.id !== blogPost?.id)
    .slice(0, 6);

  // Group posts by month for archive
  const postsByMonth = blogPosts.reduce((acc, post) => {
    const date = new Date(post.date);
    const monthYear = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(post);
    return acc;
  }, {} as Record<string, BlogPost[]>);

     if (loading) {
     return (
       <div className="bg-[#1b3764] min-h-screen">
         <Header />
         <div className="flex items-center justify-center min-h-screen">
           <div className="text-center">
             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F16022] mx-auto mb-4"></div>
             <p className="text-white/80 font-bold font-poppins">Loading blog post...</p>
           </div>
         </div>
         <Footer />
       </div>
     );
   }

     if (error || !blogPost) {
     return (
       <div className="bg-[#1b3764] min-h-screen">
         <Header />
         <div className="flex items-center justify-center min-h-screen">
           <div className="text-center">
             <h1 className="text-white text-2xl font-bold mb-4 font-kallisto">Blog Post Not Found</h1>
             <p className="text-white/80 mb-6 font-poppins">The blog post you're looking for doesn't exist.</p>
             <Link 
               to="/blog" 
               className="inline-flex items-center px-6 py-3 bg-[#F16022] text-white font-bold rounded-full hover:bg-[#F16022]/80 transition-colors font-poppins"
             >
               Back to Learning Center
             </Link>
           </div>
         </div>
         <Footer />
       </div>
     );
   }

  return (
    <div className="bg-[#1b3764] min-h-screen">
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
        <link rel="canonical" href={`https://forzabuilt.com/blog/${blogPost.id}`} />
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
              "@id": `https://forzabuilt.com/blog/${blogPost.id}`
            },
            "articleSection": blogPost.category,
            "keywords": `${blogPost.category}, adhesives, industrial, manufacturing, ${blogPost.title.toLowerCase()}`,
            "url": `https://forzabuilt.com/blog/${blogPost.id}`
          })}
        </script>
      </Helmet>

      <Header />
      
      {/* Breadcrumb */}
      <nav className="bg-white/10 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2">
          <div className="flex items-center space-x-2 text-sm text-white/70 font-poppins">
            <Link to="/" className="hover:text-[#F16022] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#F16022] transition-colors">Learning Center</Link>
            <span>/</span>
            <span className="text-white">{blogPost.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-48 bg-[#1b3764]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b3764]/80 via-[#1b3764]/60 to-[#1b3764]/80"></div>
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-white hover:text-[#F16022] transition-colors mb-4 font-poppins"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Learning Center
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[#F16022] text-xs font-bold rounded-full border border-[#F16022] font-poppins">
                  {blogPost.category}
                </span>
                <span className="text-white/80 text-sm font-poppins">
                  {new Date(blogPost.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
            <h1 className="font-black text-white font-kallisto text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-none break-words mb-6">
              {blogPost.title}
            </h1>
            <p className="text-white/80 text-lg sm:text-xl font-poppins">
              {blogPost.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-16 bg-gradient-to-b from-[#1b3764]/80 via-[#1b3764]/60 to-[#1b3764]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
                             <div className="mb-8 bg-white/20 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
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
                 className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
               >
                 {blogPost.fullContent ? (
                   <div 
                     className="prose prose-lg max-w-none prose-headings:text-white prose-headings:font-kallisto prose-headings:font-black prose-p:text-white/80 prose-p:font-poppins prose-strong:text-white prose-strong:font-bold prose-ul:text-white/80 prose-li:text-white/80 prose-a:text-[#F16022] prose-a:font-bold prose-blockquote:text-white/70 prose-blockquote:border-l-[#F16022] prose-code:text-white prose-code:bg-white/10 prose-pre:text-white prose-pre:bg-white/10 prose-hr:border-white/20"
                     dangerouslySetInnerHTML={{ __html: blogPost.fullContent }}
                   />
                 ) : (
                   <div className="prose prose-lg max-w-none prose-headings:text-white prose-headings:font-kallisto prose-headings:font-black prose-p:text-white/80 prose-p:font-poppins prose-strong:text-white prose-strong:font-bold prose-ul:text-white/80 prose-li:text-white/80 prose-a:text-[#F16022] prose-a:font-bold prose-blockquote:text-white/70 prose-blockquote:border-l-[#F16022] prose-code:text-white prose-code:bg-white/10 prose-pre:text-white prose-pre:bg-white/10 prose-hr:border-white/20">
                     <motion.div 
                       className="mb-8"
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5 }}
                     >
                       <h2 className="text-2xl font-bold text-white font-kallisto mb-4">Article Summary</h2>
                       <p className="text-white/80 leading-relaxed font-poppins">
                         {blogPost.excerpt}
                       </p>
                     </motion.div>

                     {blogPost.keyTakeaways && blogPost.keyTakeaways.length > 0 && (
                       <motion.div 
                         className="mb-8"
                         initial={{ opacity: 0, x: -20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.5, delay: 0.2 }}
                       >
                         <h2 className="text-2xl font-bold text-white font-kallisto mb-4">Key Takeaways</h2>
                         <ul className="space-y-3">
                           {blogPost.keyTakeaways.map((takeaway, index) => (
                             <motion.li 
                               key={index} 
                               className="flex items-start"
                               initial={{ opacity: 0, x: -20 }}
                               whileInView={{ opacity: 1, x: 0 }}
                               viewport={{ once: true }}
                               transition={{ duration: 0.4, delay: index * 0.1 }}
                             >
                               <span className="text-[#F16022] mr-3 mt-1">•</span>
                               <span className="text-white/80 font-poppins">{takeaway}</span>
                             </motion.li>
                           ))}
                         </ul>
                       </motion.div>
                     )}
                   </div>
                 )}
               </motion.div>

                             {/* Share This Post Section */}
               <motion.div 
                 className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-6 mt-8"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
               >
                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                   <motion.div 
                     className="mb-4 sm:mb-0"
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5 }}
                   >
                     <h3 className="text-lg font-bold text-white font-kallisto mb-2">Share This Post</h3>
                     <p className="text-white/80 text-sm font-poppins">Help others discover this valuable content</p>
                   </motion.div>
                   <motion.div 
                     className="flex space-x-3"
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5 }}
                   >
                     {[
                       {
                         href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blogPost.title)}&url=${encodeURIComponent(`https://forzabuilt.com/blog/${blogPost.id}`)}`,
                         title: "Share on Twitter",
                         icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                       },
                       {
                         href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://forzabuilt.com/blog/${blogPost.id}`)}`,
                         title: "Share on LinkedIn",
                         icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                       },
                       {
                         href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://forzabuilt.com/blog/${blogPost.id}`)}`,
                         title: "Share on Facebook",
                         icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                       },
                       {
                         href: `mailto:?subject=${encodeURIComponent(blogPost.title)}&body=${encodeURIComponent(`Check out this article: https://forzabuilt.com/blog/${blogPost.id}`)}`,
                         title: "Share via Email",
                         icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                       }
                     ].map((social, index) => (
                       <motion.a
                         key={social.title}
                         href={social.href}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="p-2 text-white/60 hover:text-[#F16022] transition-colors"
                         title={social.title}
                         initial={{ opacity: 0, scale: 0.8 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.3, delay: index * 0.1 }}
                         whileHover={{ scale: 1.1, rotate: 5 }}
                         whileTap={{ scale: 0.95 }}
                       >
                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                           <path d={social.icon}/>
                         </svg>
                       </motion.a>
                     ))}
                   </motion.div>
                 </div>
               </motion.div>

                             {/* Related Articles */}
               {relatedPosts.length > 0 && (
                 <motion.div 
                   className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-6 mt-8"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: 0.4 }}
                 >
                   <motion.h3 
                     className="text-2xl font-bold text-white font-kallisto mb-6"
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5 }}
                   >
                     Related Articles
                   </motion.h3>
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
                             scale: 1.02,
                             y: -5,
                             transition: { duration: 0.2 }
                           }}
                         >
                           <Link
                             to={`/blog/${post.id}`}
                             className="group block bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
                           >
                             <motion.div 
                               className="aspect-[16/9] bg-transparent overflow-hidden"
                               whileHover={{ scale: 1.05 }}
                               transition={{ duration: 0.3 }}
                             >
                               <img
                                 src={post.image}
                                 alt={post.title}
                                 className="w-full h-full object-contain"
                                 onError={(e) => {
                                   e.currentTarget.src = '/products/IC933-bundle-1024x1024.png';
                                 }}
                               />
                             </motion.div>
                             <div className="p-4 bg-white/10 backdrop-blur-sm">
                               <motion.span 
                                 className="inline-block px-2 py-1 bg-white/90 backdrop-blur-sm text-[#F16022] text-xs font-bold rounded-full border border-[#F16022] mb-2 font-poppins"
                                 whileHover={{ scale: 1.05 }}
                                 transition={{ duration: 0.2 }}
                               >
                                 {post.category}
                               </motion.span>
                               <h4 className="font-bold text-white group-hover:text-[#F16022] transition-colors line-clamp-2 font-kallisto">
                                 {post.title}
                               </h4>
                               <p className="text-white/80 text-sm mt-2 line-clamp-3 font-poppins">
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
             <div className="lg:col-span-1 space-y-6">
               {/* Recent Posts */}
               <motion.div 
                 className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6"
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
               >
                 <motion.h3 
                   className="text-lg font-bold text-white font-kallisto mb-4"
                   initial={{ opacity: 0, y: -10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5 }}
                 >
                   Recent Posts
                 </motion.h3>
                 <div className="space-y-4">
                   <AnimatePresence>
                     {recentPosts.map((post, index) => (
                       <motion.div
                         key={post.id}
                         initial={{ opacity: 0, x: 20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.4, delay: index * 0.1 }}
                         whileHover={{ x: 5 }}
                       >
                         <Link
                           to={`/blog/${post.id}`}
                           className="block group"
                         >
                           <div className="flex items-start space-x-3">
                             <motion.div 
                               className="w-16 h-16 bg-transparent overflow-hidden rounded-lg"
                               whileHover={{ scale: 1.05 }}
                               transition={{ duration: 0.2 }}
                             >
                               <img
                                 src={post.image}
                                 alt={post.title}
                                 className="w-full h-full object-contain"
                                 onError={(e) => {
                                   e.currentTarget.src = '/products/IC933-bundle-1024x1024.png';
                                 }}
                               />
                             </motion.div>
                             <div className="flex-1 min-w-0">
                               <h4 className="text-sm font-bold text-white group-hover:text-[#F16022] transition-colors line-clamp-2 font-kallisto">
                                 {post.title}
                               </h4>
                               <p className="text-xs text-white/70 mt-1 font-poppins">
                                 {new Date(post.date).toLocaleDateString('en-US', {
                                   year: 'numeric',
                                   month: 'short',
                                   day: 'numeric'
                                 })}
                               </p>
                             </div>
                           </div>
                         </Link>
                       </motion.div>
                     ))}
                   </AnimatePresence>
                 </div>
               </motion.div>

                             {/* BLOGS BY MONTH */}
               <motion.div 
                 className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6"
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
               >
                 <motion.h3 
                   className="text-lg font-bold text-white font-kallisto mb-4"
                   initial={{ opacity: 0, y: -10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5 }}
                 >
                   BLOGS BY MONTH
                 </motion.h3>
                 <div className="space-y-2">
                   <AnimatePresence>
                     {Object.entries(postsByMonth)
                       .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                       .slice(0, 12)
                       .map(([monthYear, posts], index) => (
                         <motion.div
                           key={monthYear}
                           initial={{ opacity: 0, x: 20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.4, delay: index * 0.05 }}
                           whileHover={{ x: 5 }}
                         >
                           <Link
                             to="/blog"
                             className="flex items-center justify-between text-sm text-white/80 hover:text-[#F16022] transition-colors font-poppins"
                           >
                             <span>{monthYear}</span>
                             <motion.span 
                               className="bg-[#F16022] text-white text-xs px-2 py-1 rounded-full font-bold"
                               whileHover={{ scale: 1.1 }}
                               transition={{ duration: 0.2 }}
                             >
                               {posts.length}
                             </motion.span>
                           </Link>
                         </motion.div>
                       ))}
                   </AnimatePresence>
                 </div>
               </motion.div>

               {/* Call to Action */}
               <motion.div 
                 className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6"
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.4 }}
               >
                 <motion.h3 
                   className="text-lg font-bold text-white font-kallisto mb-3"
                   initial={{ opacity: 0, y: -10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5 }}
                 >
                   Stay Updated
                 </motion.h3>
                 <motion.p 
                   className="text-sm mb-4 text-white/80 font-poppins"
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.1 }}
                 >
                   Get the latest insights, tips, and industry news delivered to your inbox.
                 </motion.p>
                 <motion.div 
                   className="space-y-3"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                 >
                   <motion.input
                     type="email"
                     placeholder="Enter your email"
                     className="w-full px-3 py-2 bg-white/90 backdrop-blur-sm border border-[#F16022] text-[#F16022] rounded-full focus:outline-none focus:ring-2 focus:ring-[#F16022]/50 font-poppins placeholder-[#F16022]/60"
                     whileFocus={{ scale: 1.02 }}
                     transition={{ duration: 0.2 }}
                   />
                   <motion.button 
                     className="w-full bg-[#F16022] text-white font-bold py-2 px-4 rounded-full hover:bg-[#F16022]/80 transition-colors font-poppins"
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     transition={{ duration: 0.2 }}
                   >
                     Subscribe
                   </motion.button>
                 </motion.div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

                           {/* More To Explore Carousel */}
        {moreToExplorePosts.length > 0 && (
          <section className="py-16 bg-gradient-to-b from-[#1b3764]/60 to-[#1b3764]/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-white font-kallisto mb-4">More To Explore</h2>
                <p className="text-white/80 font-poppins">Discover more insights and industry knowledge</p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {moreToExplorePosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <Link
                        to={`/blog/${post.id}`}
                        className="group block bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
                      >
                        <motion.div 
                          className="aspect-[16/9] bg-transparent overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = '/products/IC933-bundle-1024x1024.png';
                            }}
                          />
                        </motion.div>
                        <div className="p-6 bg-white/10 backdrop-blur-sm">
                          <motion.span 
                            className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[#F16022] text-xs font-bold rounded-full border border-[#F16022] mb-3 font-poppins"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            {post.category}
                          </motion.span>
                          <h3 className="text-xl font-bold text-white group-hover:text-[#F16022] transition-colors mb-3 line-clamp-2 font-kallisto">
                            {post.title}
                          </h3>
                          <p className="text-white/80 line-clamp-3 mb-4 font-poppins">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/70 font-poppins">
                              {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                            <motion.span 
                              className="text-[#F16022] font-bold text-sm group-hover:translate-x-1 transition-transform font-poppins"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              Read More →
                            </motion.span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </section>
        )}

                           {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-b from-[#1b3764]/80 to-[#1b3764]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
            <motion.div 
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-3xl font-bold text-white font-kallisto mb-6"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p 
                className="text-xl text-white/80 mb-8 font-poppins"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Discover how our adhesive solutions can transform your manufacturing processes.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/products"
                    className="inline-flex items-center px-8 py-3 bg-[#F16022] text-white font-bold rounded-full hover:bg-[#F16022]/80 transition-colors font-poppins"
                  >
                    Explore Products
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-8 py-3 bg-white/90 backdrop-blur-sm border border-[#F16022] text-[#F16022] font-bold rounded-full hover:bg-white/95 transition-colors font-poppins"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
