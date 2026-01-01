import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HeaderV2 from '../components/Header/HeaderV2';
import FooterV2 from '../components/FooterV2';
import blogPostsData from '../data/blogPosts.json';
import { generateSlugFromTitle } from '@/lib/utils';
import type { BlogPost, SortOrder } from '@/types/Blog';
import { motion, AnimatePresence } from 'framer-motion';
import ImageSkeleton from '@/components/common/ImageSkeleton';
import NewsletterSection from '@/components/NewsletterSection';
import { Search, Filter, X } from 'lucide-react';
import { useDrawer } from '@/contexts/DrawerContext';
import SlideInDrawer from '@/components/common/SlideInDrawer';
import { getFontSize } from '@/styles/typography';

const BlogOverlayCard = ({ post }: { post: BlogPost }) => (
  <Link 
    to={`/blog/${generateSlugFromTitle(post.title)}`}
    className="group relative w-full aspect-[3/4] md:aspect-[3/4] lg:aspect-[3/4] rounded-lg md:rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
  >
    {/* Background Image */}
    <div className="absolute inset-0 bg-gray-200">
      <img 
        src={post.image} 
        alt={post.title}
        className="w-full h-full object-cover md:object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.src = '/products/IC933-bundle-1024x1024.png';
        }}
      />
    </div>

    {/* Blue Gradient Overlay - spread more */}
    <div 
      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
      style={{
        background: 'linear-gradient(to top, rgba(27, 55, 100, 0.85) 0%, rgba(27, 55, 100, 0.7) 15%, rgba(27, 55, 100, 0.5) 30%, rgba(27, 55, 100, 0.3) 45%, rgba(27, 55, 100, 0.15) 60%, transparent 70%)'
      }}
    />

    {/* Content Overlay */}
    <div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-end text-white">
      <h3 className="text-xs md:text-lg lg:text-xl font-bold font-poppins mb-1 md:mb-2 leading-tight group-hover:text-[#F2611D] transition-colors line-clamp-2">
        {post.title}
      </h3>
      
      {/* Description and Arrow on same line */}
      <div className="flex items-center justify-between gap-2 md:gap-3 mt-1 md:mt-2">
        <p className="text-[9px] md:text-xs lg:text-sm text-white/80 font-poppins line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        <svg 
          className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#F2611D] transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </Link>
);

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visiblePosts, setVisiblePosts] = useState<number>(9);
  const [headerImageLoaded, setHeaderImageLoaded] = useState(false);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const { setIsDrawerOpen } = useDrawer();

  // Update drawer context when drawers open/close
  useEffect(() => {
    setIsDrawerOpen(isSearchDrawerOpen || isFilterDrawerOpen);
  }, [isSearchDrawerOpen, isFilterDrawerOpen, setIsDrawerOpen]);

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
    'Adhesives',
    'Manufacturing',
    'Innovation',
    'Marine',
    'Composites',
    'Building',
    'HSE',
    'Bond',
    'Tools',
    'Cleaning'
  ];

  const filteredPosts = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? blogPosts 
      : blogPosts.filter(post => post.category.toLowerCase().includes(selectedCategory.toLowerCase()));

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [blogPosts, selectedCategory, searchQuery]);

  const featuredPosts = blogPosts.slice(0, 3);
  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 9);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col relative overflow-x-hidden text-[#1B3764]">
      <HeaderV2 />
      
      {/* Hero Section - Header Image */}
      <section className="relative h-[60vh] md:h-screen overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] md:pt-12 2xl:pt-0 z-20">
        {!headerImageLoaded && (
          <ImageSkeleton className="w-full h-full" />
        )}
        
        <img
          src="/images/Blog Header Image.jpg"
          alt="Blog Header"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            headerImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setHeaderImageLoaded(true)}
          onError={() => setHeaderImageLoaded(true)}
          style={{ 
            zIndex: 1,
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#2c476e]/60 to-[#81899f]/60" style={{ zIndex: 2 }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none" style={{ zIndex: 20 }}>
          <motion.h3
            className="font-regular text-center leading-tight font-poppins text-white"
            style={{ 
              fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 4.5rem)',
              maxWidth: '1100px'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            Products, Tips, Tutorials<br/>and More
          </motion.h3>
        </div>
      </section>

      {/* Most Popular Section */}
      {!loading && featuredPosts.length > 0 && (
        <section className="pt-4 pb-12 md:pb-20 relative z-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="font-poppins font-normal text-[#1B3764] text-center mb-8 md:mb-16" style={getFontSize('pageHeading')}>
              Most Popular
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <BlogOverlayCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products, Tips, Tutorials Section */}
      <section className="pt-4 pb-12 md:pb-20 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="font-poppins font-normal text-[#1B3764] mb-6 md:mb-10 text-center" style={getFontSize('pageHeading')}>
              Products, Tips, Tutorials<br/>and More
            </h2>
            
            {/* Filter Buttons - Visible Tags */}
            <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap mb-6 md:mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-poppins font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-[#1B3764] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Posts' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid - 2 columns on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
            {displayedPosts.map((post) => (
              <BlogOverlayCard key={post.id} post={post} />
            ))}
          </div>

          {/* More Button */}
          {displayedPosts.length < filteredPosts.length && (
            <div className="flex justify-center">
              <button
                onClick={handleLoadMore}
                className="px-8 md:px-12 py-2 md:py-3 bg-white border border-gray-300 text-gray-500 rounded-full text-sm md:text-base font-medium font-poppins hover:bg-gray-50 transition-colors duration-200"
              >
                More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FooterV2 />

      {/* Search Drawer */}
      <SlideInDrawer
        isOpen={isSearchDrawerOpen}
        onClose={() => setIsSearchDrawerOpen(false)}
        title="Search"
        side="right"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-[#1B3764] px-10 py-3 rounded-lg text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent"
          />
        </div>
      </SlideInDrawer>

      {/* Filter Drawer */}
      <SlideInDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Filter & Settings"
        side="right"
      >
        <div>
          <h4 className="text-sm font-poppins font-semibold text-gray-700 mb-4">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsFilterDrawerOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-poppins transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#1B3764] text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>
      </SlideInDrawer>
    </div>
  );
};

export default Blog;