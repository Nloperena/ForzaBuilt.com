import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productCategories } from '@/data/productCategories';
import { industries as industriesData } from '@/data/industries';

interface SearchResult {
  name: string;
  href: string;
  type: string;
}

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const productResults = productCategories
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(p => ({ 
          name: p.title, 
          href: `/products/${p.title.toLowerCase().replace(/ /g, '-')}`, 
          type: 'Product Category' 
        }));
      
      const industryResults = industriesData
        .filter(i => i.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(i => ({ 
          name: i.title, 
          href: `/industries/${i.title.toLowerCase().replace(/ /g, '-')}`, 
          type: 'Industry' 
        }));
      
      setSearchResults([...productResults, ...industryResults]);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchTerm]);

  const handleResultClick = (href: string) => {
    navigate(href);
    setSearchTerm('');
    setShowSearchResults(false);
    setIsSearchFocused(false);
  };

  const handleBlur = () => {
    if (!showSearchResults && searchTerm.length === 0) {
      setIsSearchFocused(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={isSearchFocused ? "Search for products and industries..." : "Search..."}
        className={`py-2 px-4 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#F2611D] transition-all duration-300 ease-in-out ${
          isSearchFocused ? 'w-64' : 'w-40'
        }`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={handleBlur}
      />
      
      {showSearchResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {searchResults.map((result, index) => (
            <button
              key={`${result.type}-${index}`}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
              onClick={() => handleResultClick(result.href)}
            >
              <div className="font-medium text-gray-900">{result.name}</div>
              <div className="text-sm text-gray-500">{result.type}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 