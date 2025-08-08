import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  url: string;
  keyTakeaways?: string[];
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Load blog data from the scraped JSON file
    const loadBlogData = async () => {
      try {
        const response = await fetch('/src/data/blogPosts.json');
        const data = await response.json();
        setBlogPosts(data);
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

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="bg-[#1b3764] min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 md:py-32 lg:py-40 xl:py-48 bg-[#1b3764]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b3764]/80 via-[#1b3764]/60 to-[#1b3764]/80"></div>
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-20">
          <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
            <div className="max-w-6xl mx-auto space-y-8">
              <h1 className="font-black text-white font-kallisto text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-none break-words">
                LEARNING CENTER
              </h1>
              <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                Products, Tips, Tutorials, and More!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#F2611D] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F2611D] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blog posts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-[16/9] bg-gray-200 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/img/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-[#F2611D] uppercase tracking-wide">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Takeaways:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {post.keyTakeaways.slice(0, 2).map((takeaway, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-[#F2611D] mr-2">•</span>
                              <span className="line-clamp-2">{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#F2611D] font-medium text-sm hover:text-[#F2611D]/80 transition-colors"
                    >
                      Read More
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
