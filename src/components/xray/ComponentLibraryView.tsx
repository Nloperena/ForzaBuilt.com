import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { byIndustry } from '../../utils/products';
import { ExternalLink } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  sku?: string;
  applications?: string;
}

interface ComponentLibraryViewProps {
  industry?: string;
}

const ComponentLibraryView: React.FC<ComponentLibraryViewProps> = ({ industry = 'transportation' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const loadedProducts = await byIndustry(industry);
        const formattedProducts = loadedProducts.map(p => ({
          id: p.id,
          name: p.name,
          imageUrl: p.imageUrl,
          description: p.description || p.shortName || '',
          sku: p.id.toUpperCase().replace(/-/g, '-'),
          applications: 'Transportation industry bonding and sealing applications for RV and trailer construction.',
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [industry]);

  const categories = ['all', 'bond', 'seal', 'tape'];
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.id.toLowerCase().includes(selectedCategory));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B3764] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading component library...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1B3764] mb-2">Component Library</h1>
              <p className="text-gray-600">Browse transportation industry products and solutions</p>
            </div>
            <div className="text-sm text-gray-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'component' : 'components'}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#1B3764] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Component Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group"
            >
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                {/* Image Section */}
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 aspect-square overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-gray-400 text-4xl font-bold">
                        {product.sku?.charAt(0) || 'P'}
                      </div>
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-3">
                    <div className="text-xs font-semibold text-[#F2611D] uppercase tracking-wide mb-1">
                      {product.sku || product.id.toUpperCase()}
                    </div>
                    <h3 className="text-lg font-bold text-[#1B3764] mb-2 line-clamp-2 group-hover:text-[#F2611D] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {product.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                      {product.description}
                    </p>
                  )}

                  {product.applications && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Applications</div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {product.applications}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <a
                      href={`/product/${product.id}`}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#1B3764] hover:bg-[#2A4A7A] text-white rounded-lg text-sm font-medium transition-colors group/link"
                    >
                      View Details
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No components found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentLibraryView;

