import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  image: string;
  url: string;
  productType: 'bond' | 'seal' | 'tape';
  industries: string[];
  description?: string;
}

interface DynamicProductsSectionProps {
  industry: string;
  products: Product[];
  className?: string;
}

const productTypes = [
  { id: 'bond', label: 'BOND', color: '#F16022' },
  { id: 'seal', label: 'SEAL', color: '#ffd600' },
  { id: 'tape', label: 'TAPE', color: '#e53935' }
];

const DynamicProductsSection: React.FC<DynamicProductsSectionProps> = ({
  industry,
  products,
  className = ''
}) => {
  const [selectedProductType, setSelectedProductType] = useState<string>('all');

  // Filter products by industry and selected product type
  const filteredProducts = products.filter(product => {
    const matchesIndustry = product.industries.includes(industry.toLowerCase());
    const matchesProductType = selectedProductType === 'all' || product.productType === selectedProductType;
    
    return matchesIndustry && matchesProductType;
  });

  // Get available product types for this industry
  const availableProductTypes = productTypes.filter(type => 
    products.some(product => 
      product.industries.includes(industry.toLowerCase()) && 
      product.productType === type.id
    )
  );

  // Get banner and title based on selected product type
  const getBannerAndTitle = () => {
    switch (selectedProductType) {
      case 'bond':
        return {
          banner: 'https://forzabuilt.com/wp-content/uploads/2023/07/Forza-Bond-Product-Banner.png',
          title: 'ADHESIVE SOLUTIONS'
        };
      case 'seal':
        return {
          banner: 'https://forzabuilt.com/wp-content/uploads/2023/07/Forza-Seal-Product-Banner.png',
          title: 'SEALANT SOLUTIONS'
        };
      case 'tape':
        return {
          banner: 'https://forzabuilt.com/wp-content/uploads/2023/07/Forza-Tape-Product-Banner.png',
          title: 'TAPE SOLUTIONS'
        };
      default:
        return {
          banner: 'https://forzabuilt.com/wp-content/uploads/2023/07/Forza-Bond-Product-Banner.png',
          title: 'ADHESIVE SOLUTIONS'
        };
    }
  };

  const { banner, title } = getBannerAndTitle();

  return (
    <section className={`py-20 bg-[#1b3764] ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section with Banner */}
        <div className="text-center mb-16">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            
            
            <div className="flex-1">
              {/* Spacer for balance */}
            </div>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-extrabold text-white mb-4 font-kallisto">
            {industry.toUpperCase()} SOLUTIONS
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Comprehensive adhesive and bonding solutions designed specifically for {industry.toLowerCase()} applications
          </p>
        </div>

        <div className="flex-1">
              <img 
                src={banner}
                alt={`Forza ${selectedProductType === 'all' ? 'Bond' : selectedProductType.charAt(0).toUpperCase() + selectedProductType.slice(1)} Product Banner`}
                className="max-w-md mx-auto my-8"
              />
            </div>

        {/* Product Type Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedProductType('all')}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
              selectedProductType === 'all'
                ? 'bg-white text-[#1b3764] shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            ALL PRODUCTS
          </button>
          
          {availableProductTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedProductType(type.id)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                selectedProductType === type.id
                  ? 'text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
              style={{
                backgroundColor: selectedProductType === type.id ? type.color : undefined
              }}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center group"
            >
              <a 
                href={product.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block w-full h-full flex flex-col items-center justify-center"
              >
                <div className="relative w-full h-48 mb-4 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" 
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="mb-4">
                    <div className="text-lg font-bold text-[#1b3764] mb-2 text-center font-kallisto leading-tight">
                      {product.name}
                    </div>
                    {product.description && (
                      <p className="text-sm text-gray-600 text-center">
                        {product.description}
                      </p>
                    )}
                  </div>
                  
                  <button className="mt-auto bg-[#F2611D] hover:bg-[#F2611D]/90 text-white font-bold rounded-full px-6 py-2 text-sm shadow transition-colors">
                    MORE INFO
                  </button>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-200">
              No {selectedProductType === 'all' ? '' : selectedProductType} products available for {industry.toLowerCase()} applications.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicProductsSection; 