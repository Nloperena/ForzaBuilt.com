import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HeaderV2 from '../components/Header/HeaderV2';
import FooterV2 from '../components/FooterV2';
import blogPostsData from '../data/blogPosts.json';
import EdgeTrianglesBackground from '@/components/common/EdgeTrianglesBackground';
import { generateSlugFromTitle } from '@/lib/utils';
import type { BlogPost, ViewMode, SortOrder } from '@/types/Blog';
import { motion } from 'framer-motion';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [email, setEmail] = useState<string>('');
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);

  useEffect(() => {
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

  const calculateReadingTime = (text: string) => {
    const words = text.split(' ').length;
    return Math.ceil(words / 200);
  };

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

  const postsPerPage = 9;
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = sortedPosts.slice(startIndex, endIndex);

  const featuredPosts = blogPosts.slice(0, 3);

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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubscribing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEmail('');
    setIsSubscribing(false);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col relative overflow-x-hidden text-[#1B3764]">
      <HeaderV2 />
      
      {/* Hero Section - Gradient Background */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-4 text-center z-20 bg-gradient-to-bl from-[#477197] to-[#2c476e]">
        <motion.div 
          className="max-w-[1400px] mx-auto flex flex-col items-center justify-center gap-4 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="mb-0 font-poppins text-white text-2xl sm:text-4xl md:text-5xl lg:text-fluid-display leading-snug">
            BLOG
          </h1>
          <h3 className="font-regular text-center leading-tight font-poppins text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-4xl mt-4">
            Products, Tips, Tutorials, and More!
          </h3>
        </motion.div>
      </section>

      {/* Featured Posts - White Background */}
      {!loading && featuredPosts.length > 0 && (
        <section className="py-16 relative z-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-poppins mb-4 text-[#1B3764] tracking-tight">Featured Articles</h2>
              <p className="font-poppins text-[#1B3764]/80 text-lg">Discover our most popular and important content</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col">
                  <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        console.warn(`Failed to load image: ${post.image}`);
                        e.currentTarget.src = '/products/IC933-bundle-1024x1024.png';
                      }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-[#1B3764] uppercase tracking-wide px-3 py-1 rounded-full font-poppins bg-[#1B3764]/10">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500 font-poppins">
                        {calculateReadingTime(post.excerpt)} min read
                      </span>
                    </div>
                    <h3 className="text-xl text-[#1B3764] mb-3 line-clamp-2 group-hover:text-[#F2611D] transition-colors font-poppins">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 font-poppins flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <Link
                        to={`/blog/${generateSlugFromTitle(post.title)}`}
                        className="inline-flex items-center text-[#1B3764] font-bold text-sm hover:text-[#F2611D] transition-colors font-poppins group/link"
                      >
                        Read Article
                        <svg className="ml-2 w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Controls - Light Grey Background (Alternating) */}
      <section className="py-16 bg-[#f5f7fa] border-y border-gray-200 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Search Bar */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-poppins mb-4 text-[#1B3764] tracking-tight">Browse All Articles</h2>
            <div className="relative max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Search topics, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-300 text-[#1B3764] px-6 py-4 rounded-full text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#F2611D]/50 focus:border-[#F2611D] font-poppins placeholder-gray-400 shadow-sm"
              />
              <svg className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 font-poppins ${
                  selectedCategory === category
                    ? 'bg-[#1B3764] text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-[#1B3764] border border-gray-200 shadow-sm'
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>

          {/* View Toggle and Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 font-poppins border-t border-gray-200 pt-6 mt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold">View:</span>
                <div className="flex bg-white rounded-lg p-1 border border-gray-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-[#1B3764] text-white shadow-sm' 
                        : 'text-gray-500 hover:text-[#1B3764]'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${
                      viewMode === 'list' 
                        ? 'bg-[#1B3764] text-white shadow-sm' 
                        : 'text-gray-500 hover:text-[#1B3764]'
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="font-bold">Sort by:</label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 text-[#1B3764] pl-4 pr-8 py-1.5 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#1B3764]/20 cursor-pointer"
                  >
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                    <option value="category">Category</option>
                  </select>
                  <svg className="w-4 h-4 text-gray-500 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="bg-white border border-gray-200 text-gray-600 p-2 rounded-lg hover:bg-gray-50 hover:text-[#1B3764] transition-colors"
                title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
              >
                {sortOrder === 'asc' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                )}
              </button>
            </div>
            <div className="font-medium">
              Showing <span className="text-[#1B3764] font-bold">{currentPosts.length}</span> of <span className="text-[#1B3764] font-bold">{sortedPosts.length}</span> posts
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid - White Background (Alternating) */}
      <section className="py-16 relative z-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F2611D] mx-auto mb-4"></div>
              <p className="text-gray-500 font-bold font-poppins">Loading blog posts...</p>
            </div>
          ) : currentPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl text-[#1B3764] font-poppins mb-2">No articles found</h3>
                <p className="text-gray-600 font-poppins mb-8">
                  {searchQuery ? `No articles match "${searchQuery}"` : 'No articles in this category'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-6 py-2.5 bg-[#F2611D] text-white rounded-full font-bold font-poppins hover:bg-[#F2611D]/80 transition-colors shadow-md"
                    >
                      Clear Search
                    </button>
                  )}
                  {selectedCategory !== 'all' && (
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="px-6 py-2.5 bg-white text-[#1B3764] border border-gray-200 rounded-full font-bold font-poppins hover:bg-gray-50 transition-colors shadow-sm"
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
                  <article key={post.id} className={`bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group ${
                    viewMode === 'grid' ? 'flex flex-col h-full' : 'flex flex-row items-center'
                  }`}>
                    <div className={`bg-gray-100 overflow-hidden flex-shrink-0 relative ${
                      viewMode === 'grid' ? 'aspect-[16/9]' : 'w-48 h-48'
                    }`}>
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className={`w-full h-full object-contain mix-blend-multiply p-4 transition-transform duration-500 ${viewMode === 'grid' ? 'group-hover:scale-105' : ''}`}
                        onError={(e) => {
                          console.warn(`Failed to load image: ${post.image}`);
                          e.currentTarget.src = '/products/IC933-bundle-1024x1024.png';
                        }}
                      />
                    </div>
                    <div className={`flex flex-col ${
                      viewMode === 'grid' ? 'p-6 flex-1' : 'p-6 flex-1'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#1B3764] uppercase tracking-wide px-2.5 py-1 rounded-full font-poppins bg-[#1B3764]/5">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-poppins">
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{calculateReadingTime(post.excerpt)} min read</span>
                        </div>
                      </div>
                      <h3 className={`text-[#1B3764] mb-3 line-clamp-2 group-hover:text-[#F2611D] transition-colors font-poppins ${
                        viewMode === 'grid' ? 'text-xl' : 'text-2xl'
                      }`}>
                        {post.title}
                      </h3>
                      <p className={`text-gray-600 mb-4 line-clamp-2 font-poppins ${
                        viewMode === 'grid' ? 'text-sm' : 'text-base'
                      }`}>
                        {post.excerpt}
                      </p>
                      
                      <div className="mt-auto pt-2">
                        <Link
                          to={`/blog/${generateSlugFromTitle(post.title)}`}
                          className="inline-flex items-center text-[#1B3764] font-bold text-sm hover:text-[#F2611D] transition-colors group-hover/link font-poppins"
                        >
                          Read Full Article
                          <svg className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-16">
                  <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="flex items-center px-2 gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-9 h-9 rounded-lg text-sm font-bold font-poppins transition-all ${
                            currentPage === page
                              ? 'bg-[#1B3764] text-white shadow-md'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
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

      {/* Newsletter Signup - Gradient Break */}
      <section className="py-20 relative z-20 bg-gradient-to-bl from-[#477197] to-[#2c476e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center text-white">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-poppins mb-4 tracking-tight">Stay Updated</h2>
            <p className="font-poppins mb-8 opacity-90 text-lg">
              Get the latest insights, tips, and industry news delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/90 backdrop-blur-sm border border-white/20 text-[#1B3764] px-6 py-3.5 rounded-full text-base font-bold focus:outline-none focus:ring-2 focus:ring-white/50 font-poppins placeholder-gray-500 shadow-inner"
                required
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="px-8 py-3.5 bg-[#F2611D] text-white rounded-full font-bold font-poppins hover:bg-[#F2611D]/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <FooterV2 />
    </div>
  );
};

export default Blog;
