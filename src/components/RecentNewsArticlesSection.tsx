import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import blogPostsData from '@/data/blogPosts.json';
import type { BlogPost } from '@/types/Blog';

const RecentNewsArticlesSection = () => {
  // Get the 3 most recent blog posts, sorted by date (newest first)
  const recentArticles = useMemo(() => {
    return [...blogPostsData]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, []);
  return (
    <section className="relative bg-gradient-to-br from-[#2c476e] to-[#1a3a5a] py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-white font-poppins font-normal text-center mb-8 md:mb-12" style={{ fontSize: 'clamp(32px, 3vw, 56px)' }}>
          Recent News & Articles
        </h2>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {recentArticles.map((article: BlogPost) => (
            <Link
              key={article.id}
              to={`/blog/${article.id}`}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Section */}
              <div className="bg-gray-200 h-48 md:h-56 flex items-center justify-center overflow-hidden">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">image here</span>
                )}
              </div>

              {/* Content Section - White background */}
              <div className="p-4 md:p-6">
                <h3 className="font-poppins font-bold text-[#2c476e] text-lg md:text-xl mb-2 group-hover:text-[#F2611D] transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h3>
                <p className="font-poppins text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link
            to="/blog"
            className="bg-[#F2611D] hover:bg-[#E6540D] text-white font-poppins font-medium px-8 py-3 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentNewsArticlesSection;

