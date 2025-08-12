import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '@/types/Blog';
import { generateSlugFromTitle } from '@/lib/utils';

interface FeaturedPostsProps {
  posts: BlogPost[];
  calculateReadingTime: (text: string) => number;
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts, calculateReadingTime }) => {
  if (!posts?.length) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-[#1b3764]/80 via-[#1b3764]/60 to-[#1b3764]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white font-kallisto mb-4">Featured Articles</h2>
          <p className="text-white/80 font-poppins">Discover our most popular and important content</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.id} className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
              <div className="aspect-[16/9] bg-transparent overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/products/IC933-bundle-1024x1024.png';
                  }}
                />
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#F16022] uppercase tracking-wide bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#F16022] font-poppins">
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
                    className="inline-flex items-center text-[#F16022] font-bold text-sm hover:text-[#F16022]/80 transition-colors group-hover:translate-x-1 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-[#F16022] hover:bg-white/95 font-poppins"
                  >
                    Read Article
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

export default FeaturedPosts;


