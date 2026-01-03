import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import blogPostsData from '@/data/blogPosts.json';
import type { BlogPost } from '@/types/Blog';
import { getFontSize } from '@/styles/typography';
import { generateSlugFromTitle } from '@/lib/utils';

const RecentNewsArticlesSection = () => {
  // Get the 3 most recent blog posts, sorted by date (newest first)
  const recentArticles = useMemo(() => {
    return [...blogPostsData]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-br from-[#2c476e] to-[#1a3a5a] pb-8 md:pb-10 lg:pb-12 pt-6 md:pt-8 lg:pt-10 px-2 sm:px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-white font-poppins font-normal text-center mb-6 md:mb-8 lg:mb-10" 
          style={getFontSize('pageHeading')}
        >
          Recent News & Articles
        </motion.h2>

        {/* Articles Grid - 3 columns on mobile and desktop */}
        <div className="flex justify-center">
          <motion.div 
            className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-5 lg:gap-6 mb-6 md:mb-8 w-full max-w-full px-2 sm:px-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {recentArticles.map((article: BlogPost) => (
              <motion.div key={article.id} variants={itemVariants} className="w-full flex-shrink-0">
                <Link
                  to={`/blog/${generateSlugFromTitle(article.title)}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 block h-full w-full flex flex-col"
                >
                  {/* Image Section */}
                  <div className="bg-gray-200 aspect-square flex items-center justify-center overflow-hidden flex-shrink-0">
                    {article.image ? (
                      <motion.img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">image here</span>
                    )}
                  </div>

                  {/* Content Section - White background */}
                  <div className="p-2 sm:p-3 md:p-4 flex-grow flex flex-col">
                    <h3 className="font-poppins font-bold text-[#2c476e] text-[10px] sm:text-xs md:text-base mb-1 sm:mb-2 group-hover:text-[#F2611D] transition-colors duration-300 line-clamp-2 flex-shrink-0">
                      {article.title}
                    </h3>
                    <p className="font-poppins text-gray-600 text-[9px] sm:text-[10px] md:text-sm leading-relaxed line-clamp-2 flex-grow">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* View All Button */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <Link
            to="/blog"
            className="bg-[#F2611D] hover:bg-[#E6540D] text-white font-poppins font-normal px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            View All
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentNewsArticlesSection;

