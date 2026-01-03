import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import blogPostsData from '@/data/blogPosts.json';
import type { BlogPost } from '@/types/Blog';
import { generateSlugFromTitle } from '@/lib/utils';
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
    <section className="relative bg-gradient-to-br from-[#2c476e] to-[#1a3a5a]" style={{ paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)', paddingBottom: 'clamp(2rem, 4vw, 3rem)', paddingLeft: 'clamp(0.5rem, 2vw, 1rem)', paddingRight: 'clamp(0.5rem, 2vw, 1rem)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-white font-poppins font-normal text-center leading-tight" 
          style={{ fontSize: 'clamp(22px, 2.5vw, 44px)', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}
        >
          {toTitleCase(industryName)} Articles
        </motion.h2>

        {/* Articles Grid - Centered with consistent spacing */}
        <div className="flex justify-center">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 w-full"
            style={{ gap: 'clamp(0.75rem, 2vw, 1.5rem)', marginBottom: 'clamp(1.5rem, 3vw, 2rem)', paddingLeft: 'clamp(0.5rem, 2vw, 0)', paddingRight: 'clamp(0.5rem, 2vw, 0)' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {recentArticles.map((article: BlogPost) => (
              <motion.div key={article.id} variants={itemVariants}>
                <Link
                  to={`/blog/${generateSlugFromTitle(article.title)}`}
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
            className="bg-[#F2611D] hover:bg-[#E6540D] text-white font-poppins font-bold px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            View All
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryArticlesSection;

