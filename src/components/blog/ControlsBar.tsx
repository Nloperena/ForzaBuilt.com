import React from 'react';
import type { ViewMode } from '@/types/Blog';

interface ControlsBarProps {
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  categories: string[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (v: 'asc' | 'desc') => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
}

const ControlsBar: React.FC<ControlsBarProps> = ({
  selectedCategory,
  setSelectedCategory,
  categories,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  viewMode,
  setViewMode,
}) => {
  return (
    <section className="py-8 bg-white/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/90 backdrop-blur-sm border border-[#F16022] text-[#F16022] px-4 py-3 rounded-full text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#F16022]/50 font-poppins placeholder-[#F16022]/60"
            />
            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F16022]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 backdrop-blur-sm font-poppins ${
                selectedCategory === category
                  ? 'bg-[#F16022]/90 text-white shadow-lg border border-[#F16022]/30'
                  : 'bg-white/20 text-white hover:bg-white/30 hover:shadow-md border border-white/20'
              }`}
            >
              {category === 'all' ? 'All Posts' : category}
            </button>
          ))}
        </div>

        {/* View/Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-white/80 text-sm font-bold font-poppins">View:</span>
              <div className="flex bg-white/20 rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                    viewMode === 'grid' ? 'bg-[#F16022] text-white' : 'text-white/70 hover:text-white'
                  } font-poppins`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                    viewMode === 'list' ? 'bg-[#F16022] text-white' : 'text-white/70 hover:text-white'
                  } font-poppins`}
                >
                  List
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-white/80 text-sm font-bold font-poppins">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/90 backdrop-blur-sm border border-[#F16022] text-[#F16022] px-3 py-1 rounded-full text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#F16022]/50 font-poppins"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="category">Category</option>
              </select>
            </div>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="bg-white/90 backdrop-blur-sm border border-[#F16022] text-[#F16022] p-2 rounded-full hover:bg-white/95 transition-colors"
              title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
            >
              {sortOrder === 'asc' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ControlsBar;






