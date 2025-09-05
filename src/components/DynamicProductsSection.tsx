import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile'; 

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
  { 
    id: 'bond', 
    label: 'BOND', 
    color: '#F16022',
    logo: '/products/brand-logos/product-line-brands-white-bond.svg'
  },
  { 
    id: 'seal', 
    label: 'SEAL', 
    color: '#ffd600',
    logo: '/products/brand-logos/product-line-brands-white-seal.svg'
  },
  { 
    id: 'tape', 
    label: 'TAPE', 
    color: '#e53935',
    logo: '/products/brand-logos/product-line-brands-white-tape.svg'
  }
];

const DynamicProductsSection: React.FC<DynamicProductsSectionProps> = ({
  industry,
  products,
  className = ''
}) => {
  const [selectedProductType, setSelectedProductType] = useState<string>('all');
  const isMobile = useIsMobile();

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
  
  // Mobile View: A simple list
  if (isMobile) {
    return (
      <section className={`py-16 bg-gradient-to-b from-[#115B87] to-[#1B3764] ${className}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-white mb-4 font-kallisto">{industry.toUpperCase()} SOLUTIONS</h2>
            <p className="text-md text-gray-200 max-w-2xl mx-auto">Solutions for {industry.toLowerCase()} applications</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedProductType('all')}
              className={`px-4 py-2 text-xs rounded-full font-bold ${selectedProductType === 'all' ? 'bg-white text-[#1b3764]' : 'bg-white/10 text-white'}`}
            >
              ALL
            </button>
            {availableProductTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedProductType(type.id)}
                className={`px-4 py-2 text-xs rounded-full font-bold ${selectedProductType === type.id ? 'text-white' : 'bg-white/10 text-white'}`}
                style={{ backgroundColor: selectedProductType === type.id ? type.color : undefined }}
              >
                {type.label}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {filteredProducts.map((product, idx) => (
              <motion.a
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="block bg-white/5 p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-contain bg-white/10 rounded-md" />
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-md">{product.name}</h3>
                    <p className="text-white/70 text-sm">{product.description}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop View: Grid of cards
  return (
    <section className={`py-20 bg-gradient-to-b from-[#115B87] to-[#1B3764] ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <img 
              src="/favicon.svg" 
              alt="ForzaBuilt Logo" 
              className="w-16 h-16"
            />
          </div>
          
                                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white mb-4 font-kallisto">
              {industry.toUpperCase()} SOLUTIONS
            </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Comprehensive adhesive and bonding solutions designed specifically for {industry.toLowerCase()} applications
          </p>
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

        {/* Products Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              <a 
                href={product.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 h-full"
              >
                <div className="w-24 h-24 flex-shrink-0 bg-white/10 rounded-lg flex items-center justify-center p-2">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white mb-2 font-kallisto leading-tight uppercase">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-white/70">
                      {product.description}
                    </p>
                  )}
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