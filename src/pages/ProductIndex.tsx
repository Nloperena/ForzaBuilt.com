import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { industrialDatasheet } from '@/data/industrialDatasheet';
import { products as productsData } from '@/data/products';
import { brandColors, typography } from '@/styles/brandStandards';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Helper to get product category logo
const getProductCategoryLogo = (category: string) => {
  const productData = productsData.find(prod => 
    prod.name.toLowerCase() === category.toLowerCase()
  );
  return productData?.hoverImage || null;
};

// Product category data
const productCategories = [
  {
    id: 'bond',
    name: 'BOND',
    title: 'Industrial Adhesives',
    description: 'High-performance bonding solutions for demanding industrial applications.',
    gradient: 'from-[#F16022] via-[#D35127] to-[#1B3764]',
    color: '#f16022'
  },
  {
    id: 'seal',
    name: 'SEAL',
    title: 'Sealants & Gaskets',
    description: 'Advanced sealing solutions for leak prevention and environmental protection.',
    gradient: 'from-[#faaf40] via-[#f4c430] to-[#1B3764]',
    color: '#faaf40'
  },
  {
    id: 'tape',
    name: 'TAPE',
    title: 'Industrial Tapes',
    description: 'Specialized tapes for industrial applications and high-performance needs.',
    gradient: 'from-[#d1181f] via-[#b3141a] to-[#1B3764]',
    color: '#d1181f'
  },
  {
    id: 'ruggedred',
    name: 'RuggedRed',
    title: 'Extreme Performance',
    description: 'Built for extreme conditions with unmatched strength and resilience.',
    gradient: 'from-[#e53935] via-[#c62828] to-[#1B3764]',
    color: '#e53935'
  }
];

const ProductIndex: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1b3764] flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto w-full">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-kallisto font-black mb-6 text-white leading-tight" 
                style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
              Product Categories
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed" 
               style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
              Choose your product category to explore our complete range of industrial solutions
            </p>
          </motion.div>

          {/* Product Categories Grid - 2x2 Layout */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
            {productCategories.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group"
              >
                {category.id === 'ruggedred' ? (
                  <a href="https://ruggedred.com" target="_blank" rel="noopener noreferrer">
                    <Card className="h-60 md:h-80 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 overflow-hidden bg-white/10 backdrop-blur-sm relative">
                      {/* Background Logo */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-40">
                        {getProductCategoryLogo(category.id) && (
                          <img 
                            src={getProductCategoryLogo(category.id)} 
                            alt={`${category.name} logo`}
                            className="w-full h-full object-contain p-4 md:p-8"
                          />
                        )}
                      </div>

                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-70`}></div>

                      {/* Content */}
                      <CardContent className="relative z-10 h-full flex flex-col justify-between p-4 md:p-8 text-white">
                        {/* Header */}
                        <div>
                          <h3 className="text-xl md:text-3xl lg:text-4xl font-kallisto font-bold mb-2 md:mb-3" 
                              style={{ fontFamily: typography.products.fontFamily, fontWeight: typography.products.fontWeight }}>
                            {category.name}
                          </h3>
                          <p className="text-sm md:text-lg text-white/90 mb-1 md:mb-2">{category.title}</p>
                          <p className="text-xs md:text-base text-white/80 leading-relaxed">
                            {category.description}
                          </p>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between">
                          <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 rounded-full px-3 md:px-6 py-2 md:py-3 text-sm md:text-lg font-semibold transition-all duration-300">
                            <span className="hidden md:inline">Visit RuggedRed.com</span>
                            <span className="md:hidden">Visit</span>
                            <ArrowRight className="ml-1 md:ml-2 h-4 w-4 md:h-5 md:w-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ) : (
                  <Link to={`/products/${category.id}`}>
                    <Card className="h-60 md:h-80 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 overflow-hidden bg-white/10 backdrop-blur-sm relative">
                      {/* Background Logo */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-40">
                        {getProductCategoryLogo(category.id) && (
                          <img 
                            src={getProductCategoryLogo(category.id)} 
                            alt={`${category.name} logo`}
                            className="w-full h-full object-contain p-4 md:p-8"
                          />
                        )}
                      </div>

                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-70`}></div>

                      {/* Content */}
                      <CardContent className="relative z-10 h-full flex flex-col justify-between p-4 md:p-8 text-white">
                        {/* Header */}
                        <div>
                          <h3 className="text-xl md:text-3xl lg:text-4xl font-kallisto font-bold mb-2 md:mb-3" 
                              style={{ fontFamily: typography.products.fontFamily, fontWeight: typography.products.fontWeight }}>
                            {category.name}
                          </h3>
                          <p className="text-sm md:text-lg text-white/90 mb-1 md:mb-2">{category.title}</p>
                          <p className="text-xs md:text-base text-white/80 leading-relaxed">
                            {category.description}
                          </p>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between">
                          <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 rounded-full px-3 md:px-6 py-2 md:py-3 text-sm md:text-lg font-semibold transition-all duration-300">
                            <span className="hidden md:inline">Explore {category.name}</span>
                            <span className="md:hidden">Explore</span>
                            <ArrowRight className="ml-1 md:ml-2 h-4 w-4 md:h-5 md:w-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Browse by Industry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 max-w-4xl mx-auto">
              <h3 className="text-xl md:text-2xl font-kallisto font-bold text-white mb-4" 
                  style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                Browse by Industry
              </h3>
              <p className="text-sm md:text-base text-white/80 mb-6 md:mb-8" 
                 style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                Explore our products by industry to find solutions tailored to your specific needs
              </p>
              
              {/* Industry Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { id: 'marine', name: 'Marine', logo: 'https://forzabuilt.com/wp-content/uploads/2024/09/Marine-Icon.png' },
                  { id: 'industrial', name: 'Industrial', logo: 'https://forzabuilt.com/wp-content/uploads/2024/09/Industrial-Icon.png' },
                  { id: 'transportation', name: 'Transportation', logo: 'https://forzabuilt.com/wp-content/uploads/2024/09/Transportation-Icon.png' },
                  { id: 'construction', name: 'Construction', logo: 'https://forzabuilt.com/wp-content/uploads/2024/09/Construction-Icon.png' },
                  { id: 'foam', name: 'Foam', logo: 'https://forzabuilt.com/wp-content/uploads/2024/09/Foam-Icon.png' },
                  { id: 'composites', name: 'Composites', logo: 'https://forzabuilt.com/wp-content/uploads/2024/09/Composites-Icon.png' },
                  { id: 'insulation', name: 'Insulation', logo: 'https://forzabuilt.com/wp-content/uploads/2024/09/Insulation-Icon.png' }
                ].map((industry, idx) => (
                  <motion.div
                    key={industry.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
                    className="group"
                  >
                    <Link to={`/industries/${industry.id}`}>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group-hover:scale-105">
                        <div className="flex flex-col items-center text-center">
                          <img 
                            src={industry.logo} 
                            alt={`${industry.name} icon`}
                            className="h-8 w-8 md:h-12 md:w-12 object-contain mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300"
                          />
                          <span className="text-white font-semibold text-xs md:text-sm">{industry.name}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductIndex; 