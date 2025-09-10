import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productCategories } from '@/data/productCategories';
import { industries as industriesData } from '@/data/industries';
import { useGradientMode } from '@/contexts/GradientModeContext';

interface SearchResult {
  name: string;
  href: string;
  type: string;
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

  // Use blue text for light modes, white text for dark modes
  const textColor = mode === 'light' || mode === 'light2' ? 'text-[#1B3764]' : 'text-white';
  const placeholderColor = mode === 'light' || mode === 'light2' ? 'placeholder-[#1B3764]/70' : 'placeholder-white/70';
  const bgColor = mode === 'light' || mode === 'light2' ? 'bg-white/80' : 'bg-white/20';
  const borderColor = mode === 'light' || mode === 'light2' ? 'border-[#1B3764]/30' : 'border-white/30';

  const baseClasses = mobile 
    ? `py-2 px-4 rounded-full ${bgColor} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-[#F2611D] text-sm transition-all duration-300 border ${borderColor}`
    : `py-3.5 px-8 rounded-full ${bgColor} ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-[#F2611D] transition-all duration-300 ease-in-out border ${borderColor}`;

  const widthClasses = mobile
    ? "w-full"
    : isSearchFocused ? 'w-64' : 'w-40';

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={mobile ? "Search..." : (isSearchFocused ? "Search for products and industries..." : "Search...")}
        className={`${baseClasses} ${widthClasses}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={handleBlur}
      />
      
      {showSearchResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto border border-gray-200">
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