import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HeaderV2 from '../components/Header/HeaderV2';
import FooterV2 from '../components/FooterV2';
import blogPostsData from '../data/blogPosts.json';
import { generateSlugFromTitle } from '@/lib/utils';
import type { BlogPost, SortOrder } from '@/types/Blog';
import { motion } from 'framer-motion';
import ImageSkeleton from '@/components/common/ImageSkeleton';
import NewsletterSection from '@/components/NewsletterSection';

const BlogOverlayCard = ({ post }: { post: BlogPost }) => (
  <Link 
    to={`/blog/${generateSlugFromTitle(post.title)}`}
    className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
  >
    {/* Background Image */}
    <div className="absolute inset-0 bg-gray-200">
      <img 
        src={post.image} 
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.src = '/products/IC933-bundle-1024x1024.png';
        }}
      />
    </div>

    {/* Blue Gradient Overlay - matching IndustriesSectionAlt */}
    <div 
      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
      style={{
        background: 'linear-gradient(to top, rgba(27, 55, 100, 0.85) 0%, rgba(27, 55, 100, 0.7) 10%, rgba(27, 55, 100, 0.5) 20%, rgba(27, 55, 100, 0.3) 30%, rgba(27, 55, 100, 0.15) 40%, transparent 50%)'
      }}
    />

    {/* Content Overlay */}
    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
      <h3 className="text-xl md:text-2xl font-bold font-poppins mb-2 leading-tight group-hover:text-[#F2611D] transition-colors">
        {post.title}
      </h3>
      <p className="text-sm md:text-base text-white/80 font-poppins line-clamp-2 mb-4">
        {post.excerpt}
      </p>
      
      {/* Orange Arrow Icon - no circle background */}
      <div className="flex justify-end mt-2">
        <svg 
          className="w-6 h-6 text-[#F2611D] transform group-hover:translate-x-1 transition-transform duration-300" 
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
    'Industrial',
    'Transportation',
    'Construction',
    'Marine',
    'Composites',
    'Insulation',
    'Seals',
    'Bond',
    'Tapes',
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
      <section className="relative h-[60vh] md:h-[88vh] overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] z-20">
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
            Products Tips Tutorials<br/>and More
          </motion.h3>
        </div>
      </section>

      {/* Most Popular Section */}
      {!loading && featuredPosts.length > 0 && (
        <section className="pt-8 pb-20 relative z-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="font-poppins font-normal text-[#1B3764] text-center mb-16" style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 48px)' }}>
              Most Popular
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogOverlayCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products, Tips, Tutorials Section */}
      <section className="pt-8 pb-20 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-poppins font-normal text-[#1B3764] mb-10 text-center" style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 48px)' }}>
              Products Tips Tutorials<br/>and More
            </h2>
            
            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 font-poppins ${
                    selectedCategory === category
                      ? 'bg-[#1B3764] text-white shadow-md'
                      : 'bg-[#E5E7EB] text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Posts' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {displayedPosts.map((post) => (
              <BlogOverlayCard key={post.id} post={post} />
            ))}
          </div>

          {/* More Button */}
          {displayedPosts.length < filteredPosts.length && (
            <div className="flex justify-center">
              <button
                onClick={handleLoadMore}
                className="px-12 py-3 bg-white border border-gray-300 text-gray-500 rounded-full font-medium font-poppins hover:bg-gray-50 transition-colors duration-200"
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
    </div>
  );
};

export default Blog;