import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import blogPostsData from '../data/blogPosts.json';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import ControlsBar from '@/components/blog/ControlsBar';
import PostsGrid from '@/components/blog/PostsGrid';
import EdgeTrianglesBackground from '@/components/common/EdgeTrianglesBackground';
import { generateSlugFromTitle } from '@/lib/utils';
import type { BlogPost, ViewMode, SortOrder } from '@/types/Blog';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showNewsletter, setShowNewsletter] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);

  useEffect(() => {
    // Load blog data from the local data file
    const loadBlogData = async () => {
      try {
        setBlogPosts(blogPostsData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading blog data:', error);
        setLoading(false);
      }
    };

    loadBlogData();
  }, []);

  const categories = [
    'all',
    'Application Tips',
    'Technical Analysis',
    'Research & Development',
    'Project Ideas',
    'Industrial Applications',
    'Manufacturing',
    'Equipment & Systems',
    'Regulations & Compliance',
    'Technical Guides',
    'Product Spotlight'
  ];

  // Calculate reading time (average 200 words per minute)
  const calculateReadingTime = (text: string) => {
    const words = text.split(' ').length;
    return Math.ceil(words / 200);
  };

  // Filter posts by category and search query
  const filteredPosts = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? blogPosts 
      : blogPosts.filter(post => post.category === selectedCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        (post.keyTakeaways && post.keyTakeaways.some(takeaway => 
          takeaway.toLowerCase().includes(query)
        ))
      );
    }

    return filtered;
  }, [blogPosts, selectedCategory, searchQuery]);

  // Sort the filtered posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortBy) {
      case 'date':
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
        break;
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'category':
        aValue = a.category.toLowerCase();
        bValue = b.category.toLowerCase();
        break;
      default:
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
        }
  });

  // Pagination
  const postsPerPage = 9;
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = sortedPosts.slice(startIndex, endIndex);

  // Featured posts (first 3 posts)
  const featuredPosts = blogPosts.slice(0, 3);

  // Related categories
  const relatedCategories = useMemo(() => {
    const categoryCounts = blogPosts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categoryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([category]) => category);
  }, [blogPosts]);

  // Newsletter subscription
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubscribing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowNewsletter(false);
    setEmail('');
    setIsSubscribing(false);
  };

  return (
    <div className="bg-[#115B87] min-h-screen">
      <Header />
      
      {/* Edge triangles positioned at left and right viewport edges */}
      <EdgeTrianglesBackground 
        leftImage="/Gradients and Triangles/Small Science Triangles 2.png"
        rightImage="/Gradients and Triangles/Small Science Triangles.png"
        opacity={0.6}
        scale={1.1}
        leftRotation={280}
        rightRotation={280}
        leftFlipH={false}
        rightFlipV={false}
        blendMode="overlay"
      />
      
      {/* Orange to Blue Gradient Background */}
      <div className="absolute inset-0 pointer-events-none z-[10]">
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_top_right,rgba(242,97,29,0.8)_0%,rgba(242,97,29,0.7)_25%,rgba(242,97,29,0.5)_45%,rgba(242,97,29,0.3)_65%,rgba(242,97,29,0.15)_80%,rgba(242,97,29,0.05)_90%,transparent_100%)] md:bg-[radial-gradient(ellipse_1800px_1200px_at_top_right,rgba(242,97,29,0.8)_0%,rgba(242,97,29,0.7)_25%,rgba(242,97,29,0.5)_45%,rgba(242,97,29,0.3)_65%,rgba(242,97,29,0.15)_80%,rgba(242,97,29,0.05)_90%,transparent_100%)]"
          style={{ opacity: 1 }}
        />
      </div>
      
      {/* Hero Section */}
         <section className="relative pt-16 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-48 bg-[#115B87]">
                   <div className="absolute inset-0 bg-gradient-to-b from-[#115B87]/80 via-[#115B87]/60 to-[#115B87]/80"></div>
         <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-20">
           <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
             <div className="max-w-6xl mx-auto space-y-8">
               <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-1 sm:mb-2 md:mb-4 leading-none font-kallisto text-center">
                 ForzaBuilt Blog
               </h1>
               <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                 Products, Tips, Tutorials, and More!
               </p>
             </div>
           </div>
         </div>
               </section>

        {/* Featured Posts */}
        {!loading && featuredPosts.length > 0 && (
          <section className="py-12 bg-gradient-to-b from-[#1b3764]/80 via-[#1b3764]/60 to-[#1b3764]/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-white font-kallisto mb-4">Featured Articles</h2>
                <p className="text-white/80 font-poppins">Discover our most popular and important content</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <article key={post.id} className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
                    <div className="aspect-[16/9] bg-transparent overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          console.warn(`Failed to load image: ${post.image}`);
                          e.currentTarget.src = '/products/IC933-bundle-1024x1024.png';
                        }}
                      />
                    </div>
                    <div className="p-6 bg-white/10 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-white uppercase tracking-wide px-3 py-1 rounded-full font-poppins">
                          {post.category}
                        </span>
                        <span className="text-xs text-white/70 font-poppins">
                          {calculateReadingTime(post.excerpt)} min read
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-white mb-3 line-clamp-2 group-hover:text-[#F16022] transition-colors font-kallisto">
                        {post.title}
                      </h3>
                      <p className="text-white/80 text-sm mb-4 line-clamp-3 font-poppins">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/blog/${generateSlugFromTitle(post.title)}`}
                          className="inline-flex items-center text-white font-bold text-sm hover:text-white/90 transition-colors group-hover:translate-x-1 bg-[#F16022] px-4 py-2 rounded-full hover:bg-[#F16022]/80 font-poppins"
                        >
                          Read Article
                          <svg className="ml-2 w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <div className="flex space-x-2">
                          <button className="p-2 text-white/60 hover:text-[#F16022] transition-colors" title="Share on YouTube">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          </button>
                          <button className="p-2 text-white/60 hover:text-[#F16022] transition-colors" title="Share on LinkedIn">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search and Controls */}
        <section className="py-8 bg-white/20 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/90 backdrop-blur-sm border border-[#F16022] text-[#F16022] px-4 py-3 rounded-full text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#F16022]/50 font-poppins placeholder-[#F16022]/60"
                />
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F16022]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

                         {/* Category Filter */}
             <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6">
             {categories.map((category) => (
               <button
                 key={category}
                 onClick={() => setSelectedCategory(category)}
                                   className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 backdrop-blur-sm font-poppins ${
                    selectedCategory === category
                      ? 'bg-[#F16022]/90 text-white shadow-lg border border-[#F16022]/30'
                      : 'bg-white/20 text-white hover:bg-white/30 hover:shadow-md border border-white/20'
                  }`}
               >
                 {category === 'all' ? 'All Posts' : category}
               </button>
                            ))}
             </div>

             {/* View Toggle and Sort Controls */}
             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
               <div className="flex items-center gap-3">
                 <div className="flex items-center gap-2">
                   <span className="text-white/80 text-sm font-bold font-poppins">View:</span>
                   <div className="flex bg-white/20 rounded-full p-1">
                     <button
                       onClick={() => setViewMode('grid')}
                       className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                         viewMode === 'grid' 
                           ? 'bg-[#F16022] text-white' 
                           : 'text-white/70 hover:text-white'
                       } font-poppins`}
                     >
                       Grid
                     </button>
                     <button
                       onClick={() => setViewMode('list')}
                       className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                         viewMode === 'list' 
                           ? 'bg-[#F16022] text-white' 
                           : 'text-white/70 hover:text-white'
                       } font-poppins`}
                     >
                       List
                     </button>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                   <label className="text-white/80 text-sm font-bold font-poppins">Sort by:</label>
                   <select
                     value={sortBy}
                     onChange={(e) => setSortBy(e.target.value)}
                     className="bg-white/90 backdrop-blur-sm border border-[#F16022] text-[#F16022] px-3 py-1 rounded-full text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#F16022]/50 font-poppins"
                   >
                     <option value="date">Date</option>
                     <option value="title">Title</option>
                     <option value="category">Category</option>
                   </select>
                 </div>
                 <button
                   onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                   className="bg-white/90 backdrop-blur-sm border border-[#F16022] text-[#F16022] p-2 rounded-full hover:bg-white/95 transition-colors"
                   title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                 >
                   {sortOrder === 'asc' ? (
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                     </svg>
                   ) : (
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   )}
                 </button>
               </div>
               <div className="text-white/80 text-sm font-poppins">
                 Showing {currentPosts.length} of {sortedPosts.length} posts
               </div>
             </div>
           </div>
         </section>

        {/* Related Categories */}
        {relatedCategories.length > 0 && (
          <section className="py-6 bg-white/5 backdrop-blur-sm border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex items-center gap-4">
                <span className="text-white/80 text-sm font-bold font-poppins">Popular Categories:</span>
                <div className="flex flex-wrap gap-2">
                  {relatedCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="px-3 py-1 rounded-full text-xs font-bold text-white/70 hover:text-[#F16022] transition-colors font-poppins"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sort Controls */}
        <section className="py-4 bg-white/10 backdrop-blur-sm border-b border-white/5">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                           <div className="text-white/80 text-sm font-poppins">
                Showing {sortedPosts.length} of {blogPosts.length} posts
              </div>
             <div className="flex items-center gap-3">
               <div className="flex items-center gap-2">
                                   <label className="text-white/80 text-sm font-bold font-poppins">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white/90 backdrop-blur-sm border border-[#F16022] text-[#F16022] px-3 py-1 rounded-full text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#F16022]/50 font-poppins"
                  >
                   <option value="date">Date</option>
                   <option value="title">Title</option>
                   <option value="category">Category</option>
                 </select>
               </div>
               <button
                 onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                   className="bg-white/90 backdrop-blur-sm border border-[#F16022] text-[#F16022] p-2 rounded-full hover:bg-white/95 transition-colors"
                 title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
               >
                 {sortOrder === 'asc' ? (
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                   </svg>
                 ) : (
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                   </svg>
                 )}
               </button>
             </div>
           </div>
         </div>
       </section>

               {/* Blog Posts Grid */}
       <section className="py-12 bg-gradient-to-b from-[#1b3764]/80 via-[#1b3764]/60 to-[#1b3764]/80">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
           {loading ? (
             <div className="text-center py-20">
               <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F16022] mx-auto mb-4"></div>
               <p className="text-white/80 font-bold font-poppins">Loading blog posts...</p>
             </div>
           ) : currentPosts.length === 0 ? (
             <div className="text-center py-20">
               <div className="max-w-md mx-auto">
                 <svg className="w-16 h-16 text-white/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                 </svg>
                 <h3 className="text-xl font-black text-white font-kallisto mb-2">No articles found</h3>
                 <p className="text-white/80 font-poppins mb-6">
                   {searchQuery ? `No articles match "${searchQuery}"` : 'No articles in this category'}
                 </p>
                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
                   {searchQuery && (
                     <button
                       onClick={() => setSearchQuery('')}
                       className="px-4 py-2 bg-[#F16022] text-white rounded-full font-bold font-poppins hover:bg-[#F16022]/80 transition-colors"
                     >
                       Clear Search
                     </button>
                   )}
                   {selectedCategory !== 'all' && (
                     <button
                       onClick={() => setSelectedCategory('all')}
                       className="px-4 py-2 bg-white/20 text-white rounded-full font-bold font-poppins hover:bg-white/30 transition-colors"
                     >
                       View All Posts
                     </button>
                   )}
                 </div>
               </div>
             </div>
           ) : (
             <>
               <div className={viewMode === 'grid' 
                 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
                 : "space-y-6"
               }>
                                   {currentPosts.map((post) => (
                    <article key={post.id} className={`bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 group ${
                      viewMode === 'grid' ? 'flex flex-col h-full' : 'flex flex-row items-center'
                    }`}>
                      <div className={`bg-transparent overflow-hidden flex-shrink-0 ${
                        viewMode === 'grid' ? 'aspect-[16/9]' : 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center self-center'
                      }`}>
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className={`${viewMode === 'grid' ? 'w-full h-full' : 'max-w-full max-h-full'} object-contain object-center ${viewMode === 'grid' ? 'group-hover:scale-110 transition-transform duration-300' : ''}`}
                          onError={(e) => {
                            console.warn(`Failed to load image: ${post.image}`);
                            e.currentTarget.src = '/products/IC933-bundle-1024x1024.png';
                          }}
                        />
                      </div>
                      <div className={`bg-white/10 backdrop-blur-sm flex-1 flex flex-col ${
                        viewMode === 'grid' ? 'p-6' : 'p-4'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-white uppercase tracking-wide px-3 py-1 rounded-full font-poppins">
                            {post.category}
                        </span>
                          <div className="flex items-center gap-2 text-xs text-white/70 font-poppins">
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{calculateReadingTime(post.excerpt)} min read</span>
                          </div>
                        </div>
                        <h3 className={`font-black text-white mb-3 line-clamp-2 group-hover:text-[#F16022] transition-colors font-kallisto ${
                          viewMode === 'grid' ? 'text-xl' : 'text-lg'
                        }`}>
                          {post.title}
                        </h3>
                        <p className={`text-white/80 mb-4 line-clamp-3 flex-1 font-poppins ${
                          viewMode === 'grid' ? 'text-sm' : 'text-xs'
                        }`}>
                          {post.excerpt}
                        </p>
                        {post.keyTakeaways && post.keyTakeaways.length > 0 && viewMode === 'grid' && (
                          <div className="mb-4">
                            <h4 className="text-sm font-bold text-white mb-2 font-poppins">Key Takeaways:</h4>
                            <ul className="text-xs text-white/70 space-y-1 font-poppins">
                              {post.keyTakeaways.slice(0, 2).map((takeaway, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-[#F16022] mr-2">•</span>
                                  <span className="line-clamp-2">{takeaway}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-auto pt-4">
                          <Link
                            to={`/blog/${generateSlugFromTitle(post.title)}`}
                            className="inline-flex items-center text-white font-bold text-sm hover:text-white/90 transition-colors group-hover:translate-x-1 bg-[#F16022] px-4 py-2 rounded-full hover:bg-[#F16022]/80 font-poppins"
                          >
                            Read Full Article
                            <svg className="ml-2 w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                          <div className="flex space-x-2">
                            <button className="p-2 text-white/60 hover:text-[#F16022] transition-colors" title="Share on YouTube">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                              </svg>
                            </button>
                            <button className="p-2 text-white/60 hover:text-[#F16022] transition-colors" title="Share on LinkedIn">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/30 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-full text-sm font-bold font-poppins transition-colors ${
                            currentPage === page
                              ? 'bg-[#F16022] text-white'
                              : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/30 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gradient-to-b from-[#1b3764]/60 to-[#1b3764]/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
              <h2 className="text-3xl font-black text-white font-kallisto mb-4">Stay Updated</h2>
              <p className="text-white/80 font-poppins mb-6">
                Get the latest insights, tips, and industry news delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/90 backdrop-blur-sm border border-[#F16022] text-[#F16022] px-4 py-3 rounded-full text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#F16022]/50 font-poppins placeholder-[#F16022]/60"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-6 py-3 bg-[#F16022] text-white rounded-full font-bold font-poppins hover:bg-[#F16022]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </section>

      <Footer />
    </div>
  );
};

export default Blog;
