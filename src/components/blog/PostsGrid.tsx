import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost, ViewMode } from '@/types/Blog';
import { generateSlugFromTitle } from '@/lib/utils';

interface PostsGridProps {
  posts: BlogPost[];
  viewMode: ViewMode;
  calculateReadingTime: (text: string) => number;
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts, viewMode, calculateReadingTime }) => {
  if (!posts.length) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-[#1b3764]/80 via-[#1b3764]/60 to-[#1b3764]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          : "space-y-6"
        }>
          {posts.map((post) => (
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
                    (e.currentTarget as HTMLImageElement).src = '/products/IC933-bundle-1024x1024.png';
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
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostsGrid;







