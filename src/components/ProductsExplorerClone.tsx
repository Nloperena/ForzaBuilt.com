import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUpDown, X, ChevronDown, ChevronUp, FlaskConical, ExternalLink } from 'lucide-react';
import { typography } from '@/styles/brandStandards';
import { byProductLine, getProducts } from '@/utils/products';

type ProductLine = 'bond' | 'seal' | 'tape';

const getCategoryToColor = (category: ProductLine) => {
  switch (category) {
    case 'bond':
      return '#F16022';
    case 'seal':
      return '#f4c430';
    case 'tape':
      return '#d1181f';
    default:
      return '#1B3764';
  }
};

const getCategoryGradient = (category: ProductLine) => `from-[#1b3764] via-[#1b3764] to-[${getCategoryToColor(category)}]`;

const toTitleCase = (value: string): string =>
  value
    .replace(/[-_]+/g, ' ')
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

const ProductsExplorerClone: React.FC<{ industryName?: string }> = ({ industryName }) => {
  const [selectedLine, setSelectedLine] = useState<ProductLine>('bond');
  const [search, setSearch] = useState('');
  const [nameSort, setNameSort] = useState<'asc' | 'desc'>('asc');
  const [selectedChemistries, setSelectedChemistries] = useState<string[]>([]);
  const [visibleProductCount, setVisibleProductCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const all = useMemo(() => getProducts(), []);

  const industryKey = useMemo(() => industryName?.toLowerCase().replace(/\s+/g, '-') || industryName?.toLowerCase() || '', [industryName]);

  // Restrict products by selected line and current industry (if provided)
  const categoryProducts = useMemo(() => {
    const byLine = byProductLine(selectedLine);
    if (!industryKey) return byLine;
    return byLine.filter(p => p.industry && Array.isArray(p.industry) && p.industry.some(ind => ind.toLowerCase() === industryKey || ind.toLowerCase() === industryName?.toLowerCase()));
  }, [selectedLine, industryKey, industryName]);

  const categoryCounts = useMemo(() => {
    const counts: Record<ProductLine, number> = { bond: 0, seal: 0, tape: 0 } as Record<ProductLine, number>;
    (['bond', 'seal', 'tape'] as ProductLine[]).forEach(line => {
      const byLine = byProductLine(line);
      counts[line] = industryKey
        ? byLine.filter(p => p.industry && Array.isArray(p.industry) && p.industry.some(ind => ind.toLowerCase() === industryKey || ind.toLowerCase() === industryName?.toLowerCase())).length
        : byLine.length;
    });
    return counts;
  }, [all, industryKey, industryName]);

  const chemistryTypes = useMemo(() => {
    const unique = new Set<string>(
      categoryProducts
        .filter(p => p.chemistry)
        .filter(p => {
          if (selectedLine !== 'tape' && p.chemistry === 'Acrylic (incl. PSA)') {
            return false;
          }
          return true;
        })
        .map(p => p.chemistry!)
    );
    return Array.from(unique).sort();
  }, [categoryProducts, selectedLine]);

  const dynamicCounts = useMemo(() => {
    const byChem: Record<string, number> = {};
    categoryProducts.forEach(p => {
      const matchesSearch = !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase());
      if (matchesSearch && p.chemistry) {
        if (selectedLine === 'tape' || p.chemistry !== 'Acrylic (incl. PSA)') {
          byChem[p.chemistry] = (byChem[p.chemistry] || 0) + 1;
        }
      }
    });
    return { byChemistry: byChem };
  }, [categoryProducts, selectedChemistries, search, selectedLine]);

  useEffect(() => {
    setVisibleProductCount(3);
  }, [selectedLine, selectedChemistries, search, nameSort]);

  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts.filter(product => {
      const matchSearch = !search ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase());

      const matchChemistry = selectedLine === 'tape' ||
        selectedChemistries.length === 0 ||
        (product.chemistry && selectedChemistries.includes(product.chemistry));

      return matchSearch && matchChemistry;
    });

    filtered.sort((a, b) => nameSort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    return filtered;
  }, [categoryProducts, selectedChemistries, search, nameSort, selectedLine]);

  return (
    <section className="w-full bg-[#1b3764] text-white">
      <div className="max-w-[1600px] mx-auto px-3 md:px-4">
        {/* Section Heading - matches other headings pattern */}
        <div className="py-8 sm:py-10 md:py-12">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black font-kallisto text-center leading-none text-white">
            {industryName ? `${toTitleCase(industryName)} Products` : 'Industry Products'}
          </h2>
        </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-2">
        {/* Sidebar */}
        <aside className="lg:w-64 xl:w-72 flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
          {/* Search Bar */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-3 mb-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 p-1.5 rounded-full">
                <Search className="text-white h-4 w-4" />
              </div>
              <input
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-white/50 pl-12 py-3 text-sm border border-white/20 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/10 rounded-xl"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
                >
                  <X className="text-white h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          <div className="hidden lg:block bg-white/10 backdrop-blur-md shadow-lg rounded-xl border border-white/20 overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h3 className="font-kallisto font-bold text-lg text-white" style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                Filter & Sort
              </h3>
            </div>

            <div className="p-4 space-y-6">
              {/* Product Category (Bond/Seal/Tape) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white/90">Product Category</h4>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {(['bond','seal','tape'] as ProductLine[]).map(line => (
                    <button
                      key={line}
                      onClick={() => setSelectedLine(line)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-all overflow-hidden ${
                        selectedLine === line ? 'bg-[#F2611D] text-white' : 'bg-[#3f5275]/40 text-white/90 hover:bg-[#3f5275]/60'
                      }`}
                    >
                      <span className="text-xs xl:text-sm font-medium capitalize">{line}</span>
                      <span className="text-xs opacity-70">({categoryCounts[line] || 0})</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Name Sort */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <ArrowUpDown className="text-white/90 h-4 w-4 mr-2" />
                  <h4 className="text-sm font-semibold text-white/90">Sort By Name</h4>
                </div>

                <div className="flex rounded-lg overflow-hidden">
                  <button
                    onClick={() => setNameSort('asc')}
                    className={`flex-1 flex items-center justify-center gap-1 py-2 transition-all ${nameSort === 'asc' ? 'bg-[#F2611D] text-white' : 'bg-[#3f5275]/70 text-white/80 hover:bg-[#3f5275]'}`}
                  >
                    <ChevronUp className={`h-3 w-3 ${nameSort === 'asc' ? 'text-white' : 'text-white/70'}`} />
                    <span className="text-xs font-medium">A-Z</span>
                  </button>

                  <button
                    onClick={() => setNameSort('desc')}
                    className={`flex-1 flex items-center justify-center gap-1 py-2 transition-all ${nameSort === 'desc' ? 'bg-[#F2611D] text-white' : 'bg-[#3f5275]/70 text-white/80 hover:bg-[#3f5275]'}`}
                  >
                    <ChevronDown className={`h-3 w-3 ${nameSort === 'desc' ? 'text-white' : 'text-white/70'}`} />
                    <span className="text-xs font-medium">Z-A</span>
                  </button>
                </div>
              </div>

              {/* Chemistry Filter */}
              <div className="space-y-3 border-t border-white/10 pt-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FlaskConical className="text-white/90 h-4 w-4 mr-2" />
                    <h4 className="text-sm font-semibold text-white/90">Chemistry</h4>
                  </div>
                  {selectedChemistries.length > 0 && (
                    <button
                      onClick={() => setSelectedChemistries([])}
                      className="text-xs text-white/80 hover:text-white bg-[#3f5275]/70 hover:bg-[#3f5275] py-1 px-2 rounded-md"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                  {chemistryTypes.map(chemistry => {
                    const isSelected = selectedChemistries.includes(chemistry);
                    const count = dynamicCounts.byChemistry[chemistry] || 0;
                    return (
                      <button
                        key={chemistry}
                        onClick={() => {
                          if (isSelected) setSelectedChemistries(selectedChemistries.filter(c => c !== chemistry));
                          else setSelectedChemistries([...selectedChemistries, chemistry]);
                        }}
                        disabled={count === 0 && !isSelected}
                        className={`w-full flex items-center justify-between p-2 rounded-lg transition-all overflow-hidden ${
                          isSelected ? 'bg-[#F2611D] text-white' : 'bg-[#3f5275]/40 text-white/90 hover:bg-[#3f5275]/60'
                        } ${count === 0 && !isSelected ? 'opacity-50' : ''}`}
                      >
                        <span className="text-xs xl:text-sm font-medium truncate">{chemistry}</span>
                        <span className="text-xs opacity-70">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden sticky bottom-4 w-full flex justify-center z-30">
            <button
              className="bg-[#F2611D] hover:bg-[#E55B1C] rounded-full px-6 py-3 shadow-lg transition-colors flex items-center justify-center gap-2"
              aria-label="Filter"
              onClick={() => setIsFilterDialogOpen(true)}
            >
              <Filter className="text-white h-5 w-5" />
              <span className="text-white font-medium">Filter & Sort</span>
            </button>
          </div>
        </aside>

        {/* Main Area */}
        <div className="flex-1">
          {/* Results Info */}
          <div className="flex justify-between items-center mb-6">
            <div className="bg-[#3f5275]/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-sm">
              <p className="text-sm text-white/90">
                <span className="font-semibold text-white">{Math.min(visibleProductCount, filteredProducts.length)}</span> of {filteredProducts.length} found ({categoryProducts.length} total)
                {selectedLine !== 'tape' && selectedChemistries.length > 0 && (
                  <span className="hidden sm:inline"> • <span className="font-semibold text-white">{selectedChemistries.length}</span> {selectedChemistries.length === 1 ? 'chemistry' : 'chemistries'}</span>
                )}
              </p>
            </div>
            <button className="lg:hidden bg-[#3f5275]/50 backdrop-blur-md p-2 rounded-full border border-white/10">
              <ArrowUpDown className="text-white h-5 w-5" />
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredProducts.slice(0, Math.min(filteredProducts.length, visibleProductCount)).map((product, idx) => (
              <motion.div
                key={`${product.id}-${idx}-${selectedChemistries.join(',')}-${search}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.3) }}
                className="group"
              >
                <div
                  className={`relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] cursor-pointer h-32 md:h-[500px] rounded-2xl md:rounded-3xl bg-gradient-to-r md:bg-gradient-to-b ${getCategoryGradient(selectedLine)}`}
                >
                  {/* Background Image - Desktop */}
                  <div className="absolute inset-0 hidden md:block">
                    <img
                      src={product.imageUrl || product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex md:flex-col justify-between p-4 md:p-6 text-white">
                    {/* Mobile Row */}
                    <div className="flex md:hidden items-center gap-4 flex-1">
                      <div className="w-20 h-20 md:hidden rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30">
                        <img src={product.imageUrl || product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-kallisto font-black mb-1 leading-tight line-clamp-1 md:truncate" style={{ fontFamily: typography.products.fontFamily, fontWeight: typography.products.fontWeight }}>
                          {product.name.split('–')[0]?.trim() || product.name}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-300 line-clamp-2" style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                          {product.name.split('–')[1]?.trim() || product.description}
                        </p>
                      </div>
                    </div>

                    {/* Desktop Bottom Content */}
                    <div className="hidden md:flex flex-1 flex-col justify-end gap-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-kallisto font-black mb-2 leading-tight line-clamp-2" style={{ fontFamily: typography.products.fontFamily, fontWeight: typography.products.fontWeight }}>
                          {product.name.split('–')[0]?.trim() || product.name}
                        </h3>
                        <p className="text-sm md:text-base text-gray-200 line-clamp-3" style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                          {product.name.split('–')[1]?.trim() || product.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/products/${selectedLine}/${product.id}`}
                          className="flex items-center gap-2 bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-300"
                        >
                          <span>Details</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Mobile Buttons */}
                    <div className="flex md:hidden items-center gap-2">
                      <Link
                        to={`/products/${selectedLine}/${product.id}`}
                        className="flex items-center gap-1 bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300"
                      >
                        <span>Details</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {filteredProducts.length > visibleProductCount && (
            <div className="col-span-full flex justify-center mt-8">
              <button
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    const remaining = filteredProducts.length - visibleProductCount;
                    const increment = Math.min(remaining, 3);
                    setVisibleProductCount(visibleProductCount + increment);
                    setIsLoading(false);
                  }, 500);
                }}
                disabled={isLoading}
                className={`${isLoading ? 'bg-[#F2611D]/70' : 'bg-[#F2611D] hover:bg-[#F2611D]/80'} text-white rounded-full px-6 py-3 font-medium transition-all duration-300 flex items-center gap-2`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>Load More Products</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Dialog */}
      <AnimatePresence>
        {isFilterDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-end lg:hidden"
            onClick={() => setIsFilterDialogOpen(false)}
          >
            <div className="bg-[#1b3764] w-full rounded-t-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 bg-[#1b3764] pt-3 pb-2 px-4 flex justify-between items-center border-b border-white/10">
                <h3 className="text-white text-lg font-bold">Filter & Sort</h3>
                <button onClick={() => setIsFilterDialogOpen(false)} className="p-2 rounded-full hover:bg-white/10">
                  <X className="text-white h-5 w-5" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                {/* Search */}
                <div className="bg-white/15 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-3">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 p-1.5 rounded-full">
                      <Search className="text-white h-4 w-4" />
                    </div>
                    <input
                      placeholder="Search products…"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="w-full bg-white/10 text-white placeholder-white/50 pl-12 py-3 text-sm border border-white/20 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/10 rounded-xl"
                    />
                    {search && (
                      <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors">
                        <X className="text-white h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Sort */}
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <h4 className="text-white font-bold text-sm uppercase mb-3">Sort By</h4>
                  <div className="flex gap-2">
                    <button onClick={() => setNameSort('asc')} className={`flex-1 py-2 px-3 rounded-lg text-center text-sm font-medium ${nameSort === 'asc' ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>A-Z</button>
                    <button onClick={() => setNameSort('desc')} className={`flex-1 py-2 px-3 rounded-lg text-center text-sm font-medium ${nameSort === 'desc' ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>Z-A</button>
                  </div>
                </div>

                {/* Industry Filter */}
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <h4 className="text-white font-bold text-sm uppercase mb-3">Industry</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {industries.map(industry => {
                      const isSelected = selectedIndustries.includes(industry);
                      const count = dynamicCounts.byIndustry[industry] || 0;
                      return (
                        <button
                          key={industry}
                          onClick={() => {
                            if (isSelected) setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
                            else setSelectedIndustries([...selectedIndustries, industry]);
                          }}
                          className={`flex items-center justify-between p-2 rounded-lg overflow-hidden ${isSelected ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                          <span className="text-xs font-medium capitalize truncate">{industry}</span>
                          <span className="text-xs opacity-70 flex-shrink-0">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Chemistry Filter */}
                {selectedLine !== 'tape' && chemistryTypes.length > 0 && (
                  <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-bold text-sm uppercase mb-3">Chemistry</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {chemistryTypes.map(chemistry => {
                        const isSelected = selectedChemistries.includes(chemistry);
                        const count = dynamicCounts.byChemistry[chemistry] || 0;
                        return (
                          <button
                            key={chemistry}
                            onClick={() => {
                              if (isSelected) setSelectedChemistries(selectedChemistries.filter(c => c !== chemistry));
                              else setSelectedChemistries([...selectedChemistries, chemistry]);
                            }}
                            className={`flex items-center justify-between p-2 rounded-lg overflow-hidden ${isSelected ? 'bg-[#F2611D] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                          >
                            <span className="text-xs font-medium truncate">{chemistry}</span>
                            <span className="text-xs opacity-70 flex-shrink-0">({count})</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Apply Button */}
                <div className="pt-2 pb-6">
                  <button onClick={() => setIsFilterDialogOpen(false)} className="w-full py-3 bg-[#F2611D] hover:bg-[#E55B1C] text-white font-medium rounded-xl transition-colors">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductsExplorerClone;


