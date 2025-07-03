import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MarineProduct {
  name: string;
  type: string;
  color: string;
  description: string;
  image: string;
}

interface MarineProductsGridProps {
  products: MarineProduct[];
}

const MarineProductsGrid: React.FC<MarineProductsGridProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 font-kallisto text-[#1b3764]">
            Marine Product Solutions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive range of marine-grade adhesives, sealants, and tapes designed for the harshest marine environments
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(selectedProduct === index ? null : index)}
            >
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{ backgroundColor: product.color }}
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-[#1b3764] font-kallisto">
                      {product.name}
                    </h3>
                    <span 
                      className="px-2 py-1 text-xs font-medium rounded-full text-white"
                      style={{ backgroundColor: product.color }}
                    >
                      {product.type}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <h4 className="text-lg font-bold mb-2">{product.name}</h4>
                    <p className="text-sm opacity-90">{product.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Categories Legend */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8 font-kallisto text-[#1b3764]">
            Product Categories
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ff5c1a' }}></div>
              <span className="text-sm font-medium">Adhesives</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ffd600' }}></div>
              <span className="text-sm font-medium">Sealants</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#e53935' }}></div>
              <span className="text-sm font-medium">Tapes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#147974' }}></div>
              <span className="text-sm font-medium">Specialty</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarineProductsGrid; 