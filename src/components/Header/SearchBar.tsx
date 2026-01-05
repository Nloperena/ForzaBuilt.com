import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGradientMode } from '@/contexts/GradientModeContext';
import { getAllProducts, type Product } from '@/services/productService';
import blogPostsData from '@/data/blogPosts.json';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}

interface SearchResult {
  id: string;
  name: string;
  href: string;
  type: 'Product' | 'Blog';
  image: string;
  description: string;
  category?: string;
}

interface SearchBarProps {
  className?: string;
  mobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '', mobile = false }) => {
  const navigate = useNavigate();
  const { mode } = useGradientMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load products from API on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoadingProducts(true);
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to load products for search:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    
    loadProducts();
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1 && !isLoadingProducts) {
      const blogPosts = blogPostsData as BlogPost[];
      
      // Search products
      const productResults: SearchResult[] = products
        .filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.industry?.some(ind => ind.toLowerCase().includes(searchTerm.toLowerCase())) ||
          p.searchKeywords?.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .slice(0, 8) // Limit to 8 products
        .map(p => ({
          id: p.id,
          name: p.name, 
          href: `/products/${p.category.toLowerCase()}/${p.id}`, 
          type: 'Product' as const,
          image: p.imageUrl || '/placeholder.svg',
          description: p.description || '',
          category: p.category
        }));
      
      // Search blog posts
      const blogResults: SearchResult[] = blogPosts
        .filter(b => 
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5) // Limit to 5 blog posts
        .map(b => ({ 
          id: b.id,
          name: b.title, 
          href: `/blog/${b.id}`, 
          type: 'Blog' as const,
          image: b.image || '/placeholder.svg',
          description: b.excerpt,
          category: b.category
        }));
      
      setSearchResults([...productResults, ...blogResults]);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchTerm, products, isLoadingProducts]);

  const handleResultClick = (href: string) => {
    navigate(href);
    setSearchTerm('');
    setShowSearchResults(false);
    setIsSearchFocused(false);
  };

  const handleBlur = () => {
    // Don't close immediately to allow clicks on results
    setTimeout(() => {
      if (!showSearchResults && searchTerm.length === 0) {
        setIsSearchFocused(false);
      }
    }, 200);
  };

  // Use blue text for light modes, white text for dark modes
  const textColor = mode === 'light' || mode === 'light2' ? 'text-[#1B3764]' : 'text-white';
  const placeholderColor = mode === 'light' || mode === 'light2' ? 'placeholder-[#1B3764]/70' : 'placeholder-white/70';
  const bgColor = mode === 'light' || mode === 'light2' ? 'bg-white/80' : 'bg-white/20';
  const borderColor = mode === 'light' || mode === 'light2' ? 'border-[#1B3764]/30' : 'border-white/30';

  const baseClasses = mobile 
    ? `py-2 px-4 rounded-full ${bgColor} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-[#F2611D] text-sm transition-all duration-300 border ${borderColor}`
    : `py-1 lg:py-1.5 xl:py-2 2xl:py-2.5 px-2.5 lg:px-3 xl:px-5 2xl:px-6 rounded-full ${bgColor} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-[#F2611D] text-xs lg:text-xs xl:text-sm 2xl:text-base transition-all duration-300 ease-in-out border ${borderColor}`;

  const widthClasses = mobile
    ? "w-full"
    : isSearchFocused ? 'w-56 lg:w-60 xl:w-72 2xl:w-80' : 'w-32 lg:w-36 xl:w-44 2xl:w-48';

  // Group results by type
  const productResults = searchResults.filter(r => r.type === 'Product');
  const blogResults = searchResults.filter(r => r.type === 'Blog');

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <input
        type="text"
        placeholder={mobile ? "Search products and blogs..." : (isSearchFocused ? "Search products and blogs..." : "Search...")}
        className={`${baseClasses} ${widthClasses}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={handleBlur}
      />
      
      {showSearchResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl z-50 max-h-[500px] overflow-y-auto border border-gray-200 min-w-[400px]">
          {/* Products Section */}
          {productResults.length > 0 && (
            <div className="border-b border-gray-200">
              <div className="px-4 py-2 bg-gradient-to-r from-[#F2611D] to-orange-500 text-white font-bold text-sm">
                Products ({productResults.length})
              </div>
              {productResults.map((result) => (
                <button
                  key={`product-${result.id}`}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                  onClick={() => handleResultClick(result.href)}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={result.image} 
                      alt={result.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm line-clamp-1">{result.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {result.category}
                      </span>
                    </div>
                    {result.description && (
                      <div className="text-xs text-gray-600 mt-1 line-clamp-1">{result.description}</div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Blog Posts Section */}
          {blogResults.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gradient-to-r from-[#2c476e] to-[#477197] text-white font-bold text-sm">
                Blog Posts ({blogResults.length})
              </div>
              {blogResults.map((result) => (
                <button
                  key={`blog-${result.id}`}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                  onClick={() => handleResultClick(result.href)}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={result.image} 
                      alt={result.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm line-clamp-1">{result.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        {result.category}
                      </span>
                    </div>
                    {result.description && (
                      <div className="text-xs text-gray-600 mt-1 line-clamp-2">{result.description}</div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No results message */}
          {searchResults.length === 0 && searchTerm.length > 1 && (
            <div className="px-4 py-8 text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="font-medium">No results found</p>
              <p className="text-sm mt-1">Try searching with different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
