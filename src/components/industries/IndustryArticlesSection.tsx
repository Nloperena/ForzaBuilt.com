import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import blogPostsData from '@/data/blogPosts.json';
import type { BlogPost } from '@/types/Blog';
import { toTitleCase } from '../../utils/industryHelpers';

interface IndustryArticlesSectionProps {
  industryName: string;
}

const IndustryArticlesSection: React.FC<IndustryArticlesSectionProps> = ({ industryName }) => {
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
          style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 48px)' }}
        >
          {toTitleCase(industryName)} Articles
        </motion.h2>

        {/* Articles Grid - Centered with consistent spacing */}
        <div className="flex justify-center">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 md:mb-8 w-full px-2 sm:px-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {recentArticles.map((article: BlogPost) => (
              <motion.div key={article.id} variants={itemVariants}>
                <Link
                  to={`/blog/${article.id}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 block h-full"
                >
                  {/* Image Section */}
                  <div className="bg-gray-200 h-40 md:h-44 flex items-center justify-center overflow-hidden">
                    {article.image ? (
                      <motion.img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">image here</span>
                    )}
                  </div>

                  {/* Content Section - White background */}
                  <div className="p-3 md:p-4">
                    <h3 className="font-poppins font-bold text-[#2c476e] text-sm md:text-base mb-2 group-hover:text-[#F2611D] transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="font-poppins text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-2">
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
            className="bg-[#F2611D] hover:bg-[#E6540D] text-white font-poppins font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            View All
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryArticlesSection;

