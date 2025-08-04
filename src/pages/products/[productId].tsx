import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowLeft, Download, Share2, BookOpen, Settings, Zap, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { industries as industriesData } from '@/data/industries';
import { brandColors, productColors, industryColors, typography } from '@/styles/brandStandards';
import { getProduct, getRelatedProducts } from '@/utils/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Helper to get industry logo from navbar data
const getIndustryLogo = (industry: string) => {
  const industryData = industriesData.find(ind => 
    ind.title.toLowerCase() === industry.toLowerCase()
  );
  return industryData?.logo || null;
};

// Industry colors using vertical gradients with more industry color at bottom
const industryColor = (industry: string) => {
  const industryLower = industry.toLowerCase();
  const brandBlue = '#1b3764'; // Forza brand blue
  
  // Use vertical gradients with more industry color at the bottom
  switch (industryLower) {
    case 'marine':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#137875]`; // Blue top, Marine teal bottom
    case 'industrial':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#f16a26]`; // Blue top, Industrial orange bottom
    case 'transportation':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#b83d35]`; // Blue top, Transportation red bottom
    case 'construction':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#fec770]`; // Blue top, Construction yellow bottom
    // case 'foam':
    //   return `from-[${brandBlue}] via-[${brandBlue}] to-[#7a6fb0]`; // Blue top, Foam purple bottom
    case 'composites':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#c7c8c9]`; // Blue top, Composites gray bottom
    case 'insulation':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#d0157d]`; // Blue top, Insulation pink bottom
    default:
      return `from-[${brandBlue}] to-[${brandBlue}]`; // Default blue
  }
};

const ProductDetailPage: React.FC = () => {
  const { productId, productCategory } = useParams<{ productId: string; productCategory?: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  // Find the product
  const product = useMemo(() => {
    return getProduct(productId);
  }, [productId]);

  // Get related products from the same industry
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getRelatedProducts(productId, 4);
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#1b3764] flex flex-col">
        <Header />
        <main className="flex-1 pt-20 pb-10">
          <div className="max-w-screen-2xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-kallisto font-black text-white mb-4">Product Not Found</h1>
            <p className="text-gray-300 mb-8">The product you're looking for doesn't exist.</p>
            <Link to="/products">
              <Button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-6 text-xl">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1b3764] flex flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-10">
        <div className="max-w-screen-2xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Link to="/products" className="hover:text-white transition-colors">
                Products
              </Link>
              <span>/</span>
              <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-white transition-colors">
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-white">{product.name}</span>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover opacity-20"
                />
                {/* Industry Color Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${industryColor(product.industry)} opacity-90`}></div>
              </div>

              {/* Content */}
              <div className="relative p-8 md:p-12 text-white">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Product Info */}
                  <div>
                    {/* Badges */}
                    <div className="flex gap-3 mb-6">
                      <Badge className={`bg-white/20 backdrop-blur-sm text-white border border-white/30`}>
                        {product.category}
                      </Badge>
                      <Badge className={`bg-white/20 backdrop-blur-sm text-white border border-white/30 flex items-center gap-1`}>
                        {getIndustryLogo(product.industry) ? (
                          <img 
                            src={getIndustryLogo(product.industry)} 
                            alt={`${product.industry} icon`}
                            className="h-4 w-4 object-contain"
                          />
                        ) : (
                          <span className="capitalize">{product.industry.charAt(0)}</span>
                        )}
                        <span className="capitalize">{product.industry}</span>
                      </Badge>
                    </div>

                    {/* Product Name */}
                    <h1 className="text-4xl md:text-5xl font-kallisto font-black mb-4 leading-tight" 
                        style={{ fontFamily: typography.products.fontFamily, fontWeight: typography.products.fontWeight }}>
                      {product.name}
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed" 
                       style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                      {product.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        onClick={() => window.open(product.url, '_blank')}
                        className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-6 text-xl"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Datasheet
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white rounded-full px-8 py-6 text-xl transition-all duration-300"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Product
                      </Button>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="flex justify-center lg:justify-end">
                    <div className="relative">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full max-w-md h-auto object-contain"
                        />
                      </div>
                      {/* Floating Product ID */}
                      <div className="absolute -bottom-4 -right-4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                        <span className="text-white font-bold text-sm">ID: {product.id.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Product Details Tabs */}
          <section className="mb-12">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-1">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="specifications" 
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Specifications
                </TabsTrigger>
                <TabsTrigger 
                  value="applications" 
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Applications
                </TabsTrigger>
                <TabsTrigger 
                  value="benefits" 
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Benefits & Usage
                </TabsTrigger>
                <TabsTrigger 
                  value="technical" 
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Technical Data
                </TabsTrigger>
              </TabsList>

              <div className="mt-8">
                <TabsContent value="overview" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-white text-2xl font-kallisto font-bold" 
                                 style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                        Product Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-white/90 text-lg leading-relaxed" 
                         style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                        {product.description}
                      </p>
                      
                      {/* Key Features */}
                      {product.specifications && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Key Features
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {Object.entries(product.specifications).map(([key, value]) => {
                              if (typeof value === 'string' && key !== 'type') {
                                return (
                                  <div key={key} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                    <div className="font-semibold text-white mb-1 capitalize">
                                      {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </div>
                                    <div className="text-white/80">{value}</div>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      )}

                      {/* Applications & Features */}
                      {product.specifications?.applications && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Applications
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {product.specifications.applications.map((app, index) => (
                              <Badge key={index} className="bg-white/20 backdrop-blur-sm text-white border border-white/30">
                                {app}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Features */}
                      {product.specifications?.features && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Features
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {product.specifications.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="border-white/30 text-white">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Substrates */}
                      {product.specifications?.substrates && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Compatible Substrates
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {product.specifications.substrates.map((substrate, index) => (
                              <Badge key={index} className="bg-white/10 backdrop-blur-sm text-white border border-white/20">
                                {substrate}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Certifications */}
                      {product.specifications?.certifications && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Certifications
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {product.specifications.certifications.map((cert, index) => (
                              <Badge key={index} className="bg-green-500/20 backdrop-blur-sm text-green-300 border border-green-300/30">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Packaging */}
                      {product.specifications?.packaging && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Available Packaging
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {product.specifications.packaging.map((pkg, index) => (
                              <Badge key={index} className="bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-300/30">
                                {pkg}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="specifications" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-white text-2xl font-kallisto font-bold" 
                                 style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                        Product Specifications
                      </CardTitle>
                    </CardHeader>
                                         <CardContent>
                       {product.specifications ? (
                         <div className="space-y-6">
                           {/* Basic Specifications */}
                           <div>
                             <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/20 pb-2">
                               Basic Specifications
                             </h4>
                             <div className="space-y-3">
                               {product.specifications.type && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Type:</span>
                                   <span className="text-white/80">{product.specifications.type}</span>
                                 </div>
                               )}
                               {product.specifications.viscosity && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Viscosity:</span>
                                   <span className="text-white/80">{product.specifications.viscosity}</span>
                                 </div>
                               )}
                               {product.specifications.solids && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Solids:</span>
                                   <span className="text-white/80">{product.specifications.solids}</span>
                                 </div>
                               )}
                               {product.specifications.flashPoint && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Flash Point:</span>
                                   <span className="text-white/80">{product.specifications.flashPoint}</span>
                                 </div>
                               )}
                               {product.specifications.potLife && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Pot Life:</span>
                                   <span className="text-white/80">{product.specifications.potLife}</span>
                                 </div>
                               )}
                               {product.specifications.cureTime && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Cure Time:</span>
                                   <span className="text-white/80">{product.specifications.cureTime}</span>
                                 </div>
                               )}
                               {product.specifications.temperatureRange && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Temperature Range:</span>
                                   <span className="text-white/80">{product.specifications.temperatureRange}</span>
                                 </div>
                               )}
                             </div>
                           </div>

                           {/* Tape-specific specifications */}
                           {(product.specifications.thickness || product.specifications.width || product.specifications.length) && (
                             <div>
                               <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/20 pb-2">
                                 Physical Dimensions
                               </h4>
                               <div className="space-y-3">
                                 {product.specifications.thickness && (
                                   <div className="flex justify-between py-3 border-b border-white/10">
                                     <span className="font-semibold text-white">Thickness:</span>
                                     <span className="text-white/80">{product.specifications.thickness}</span>
                                   </div>
                                 )}
                                 {product.specifications.width && (
                                   <div className="flex justify-between py-3 border-b border-white/10">
                                     <span className="font-semibold text-white">Width:</span>
                                     <span className="text-white/80">{product.specifications.width}</span>
                                   </div>
                                 )}
                                 {product.specifications.length && (
                                   <div className="flex justify-between py-3 border-b border-white/10">
                                     <span className="font-semibold text-white">Length:</span>
                                     <span className="text-white/80">{product.specifications.length}</span>
                                   </div>
                                 )}
                               </div>
                             </div>
                           )}

                           {/* Substrates */}
                           {product.specifications.substrates && (
                             <div>
                               <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/20 pb-2">
                                 Compatible Substrates
                               </h4>
                               <div className="flex flex-wrap gap-2">
                                 {product.specifications.substrates.map((substrate, index) => (
                                   <Badge key={index} className="bg-white/10 backdrop-blur-sm text-white border border-white/20">
                                     {substrate}
                                   </Badge>
                                 ))}
                               </div>
                             </div>
                           )}

                           {/* Applications */}
                           {product.specifications.applications && (
                             <div>
                               <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/20 pb-2">
                                 Applications
                               </h4>
                               <div className="flex flex-wrap gap-2">
                                 {product.specifications.applications.map((app, index) => (
                                   <Badge key={index} className="bg-white/20 backdrop-blur-sm text-white border border-white/30">
                                     {app}
                                   </Badge>
                                 ))}
                               </div>
                             </div>
                           )}

                           {/* Features */}
                           {product.specifications.features && (
                             <div>
                               <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/20 pb-2">
                                 Features
                               </h4>
                               <div className="flex flex-wrap gap-2">
                                 {product.specifications.features.map((feature, index) => (
                                   <Badge key={index} variant="outline" className="border-white/30 text-white">
                                     {feature}
                                   </Badge>
                                 ))}
                               </div>
                             </div>
                           )}

                           {/* Certifications */}
                           {product.specifications.certifications && (
                             <div>
                               <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/20 pb-2">
                                 Certifications
                               </h4>
                               <div className="flex flex-wrap gap-2">
                                 {product.specifications.certifications.map((cert, index) => (
                                   <Badge key={index} className="bg-green-500/20 backdrop-blur-sm text-green-300 border border-green-300/30">
                                     {cert}
                                   </Badge>
                                 ))}
                               </div>
                             </div>
                           )}

                           {/* Packaging */}
                           {product.specifications.packaging && (
                             <div>
                               <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/20 pb-2">
                                 Available Packaging
                               </h4>
                               <div className="flex flex-wrap gap-2">
                                 {product.specifications.packaging.map((pkg, index) => (
                                   <Badge key={index} className="bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-300/30">
                                     {pkg}
                                   </Badge>
                                 ))}
                               </div>
                             </div>
                           )}
                         </div>
                       ) : (
                         <p className="text-white/70">No specifications available for this product.</p>
                       )}
                     </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="applications" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-white text-2xl font-kallisto font-bold" 
                                 style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                        Applications & Uses
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                                             <div className="grid md:grid-cols-2 gap-6">
                         <div>
                           <h3 className="text-lg font-semibold text-white mb-3" 
                               style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                             Primary Applications
                           </h3>
                           {product.specifications?.applications ? (
                             <ul className="space-y-2 text-white/80">
                               {product.specifications.applications.map((app, index) => (
                                 <li key={index} className="flex items-start gap-2">
                                   <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                   <span>{app}</span>
                                 </li>
                               ))}
                             </ul>
                           ) : (
                             <ul className="space-y-2 text-white/80">
                               <li className="flex items-start gap-2">
                                 <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                 <span>Industrial bonding and assembly</span>
                               </li>
                               <li className="flex items-start gap-2">
                                 <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                 <span>Automotive manufacturing</span>
                               </li>
                               <li className="flex items-start gap-2">
                                 <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                 <span>Construction and building</span>
                               </li>
                               <li className="flex items-start gap-2">
                                 <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                 <span>Marine and aerospace</span>
                               </li>
                             </ul>
                           )}
                         </div>
                         <div>
                           <h3 className="text-lg font-semibold text-white mb-3" 
                               style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                             Industry Focus
                           </h3>
                           <div className="flex items-center gap-2 mb-4">
                             {getIndustryLogo(product.industry) ? (
                               <img 
                                 src={getIndustryLogo(product.industry)} 
                                 alt={`${product.industry} icon`}
                                 className="h-8 w-8 object-contain"
                               />
                             ) : (
                               <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                 <span className="text-white font-bold">{product.industry.charAt(0).toUpperCase()}</span>
                               </div>
                             )}
                             <span className="text-white font-semibold capitalize">{product.industry}</span>
                           </div>
                           <p className="text-white/80">
                             Specifically engineered for {product.industry.toLowerCase()} applications, 
                             this product delivers optimal performance in demanding environments.
                           </p>
                           
                           {/* Compatible Substrates */}
                           {product.specifications?.substrates && (
                             <div className="mt-4">
                               <h4 className="text-md font-semibold text-white mb-2">
                                 Compatible Substrates
                               </h4>
                               <div className="flex flex-wrap gap-1">
                                 {product.specifications.substrates.map((substrate, index) => (
                                   <Badge key={index} className="bg-white/10 backdrop-blur-sm text-white text-xs border border-white/20">
                                     {substrate}
                                   </Badge>
                                 ))}
                               </div>
                             </div>
                           )}
                         </div>
                       </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="benefits" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-white text-2xl font-kallisto font-bold" 
                                 style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                        Benefits & Usage
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Benefits */}
                      {product.benefits && product.benefits.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Key Benefits
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {product.benefits.map((benefit, index) => (
                              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-white/90">{benefit}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* How to Use */}
                      {product.howToUse && product.howToUse.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            How to Use
                          </h3>
                          <div className="space-y-3">
                            {product.howToUse.map((instruction, index) => (
                              <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white font-bold text-sm">{index + 1}</span>
                                </div>
                                <span className="text-white/90">{instruction}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Colors */}
                      {product.colors && product.colors.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Available Colors
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {product.colors.map((color, index) => (
                              <Badge key={index} className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 py-2">
                                {color}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sizing */}
                      {product.sizing && product.sizing.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Available Sizes
                          </h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            {product.sizing.map((size, index) => (
                              <Badge key={index} className="bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-300/30 px-4 py-2">
                                {size}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Cleanup */}
                      {product.cleanup && product.cleanup.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4" 
                              style={{ fontFamily: typography.subheads.fontFamily, fontWeight: typography.subheads.fontWeight }}>
                            Recommended Cleanup
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {product.cleanup.map((method, index) => (
                              <Badge key={index} className="bg-orange-500/20 backdrop-blur-sm text-orange-300 border border-orange-300/30 px-4 py-2">
                                {method}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="technical" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-white text-2xl font-kallisto font-bold" 
                                 style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                        Technical Data
                      </CardTitle>
                    </CardHeader>
                                         <CardContent>
                       {product.technicalData ? (
                         <div className="space-y-6">
                           {/* Physical Properties */}
                           <div>
                             <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/20 pb-2">
                               Physical Properties
                             </h4>
                             <div className="space-y-3">
                               {product.technicalData.density && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Density:</span>
                                   <span className="text-white/80">{product.technicalData.density}</span>
                                 </div>
                               )}
                               {product.technicalData.pH && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">pH:</span>
                                   <span className="text-white/80">{product.technicalData.pH}</span>
                                 </div>
                               )}
                               {product.technicalData.color && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Color:</span>
                                   <span className="text-white/80">{product.technicalData.color}</span>
                                 </div>
                               )}
                               {product.technicalData.odor && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Odor:</span>
                                   <span className="text-white/80">{product.technicalData.odor}</span>
                                 </div>
                               )}
                             </div>
                           </div>

                           {/* Storage & Handling */}
                           <div>
                             <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/20 pb-2">
                               Storage & Handling
                             </h4>
                             <div className="space-y-3">
                               {product.technicalData.shelfLife && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Shelf Life:</span>
                                   <span className="text-white/80">{product.technicalData.shelfLife}</span>
                                 </div>
                               )}
                               {product.technicalData.storageConditions && (
                                 <div className="flex justify-between py-3 border-b border-white/10">
                                   <span className="font-semibold text-white">Storage Conditions:</span>
                                   <span className="text-white/80">{product.technicalData.storageConditions}</span>
                                 </div>
                               )}
                             </div>
                           </div>

                           {/* Tape-specific technical data */}
                           {(product.technicalData.adhesiveType || product.technicalData.foamType || product.technicalData.peelStrength || product.technicalData.shearStrength) && (
                             <div>
                               <h4 className="text-lg font-semibold text-white mb-4 border-b border-white/20 pb-2">
                                 Performance Data
                               </h4>
                               <div className="space-y-3">
                                 {product.technicalData.adhesiveType && (
                                   <div className="flex justify-between py-3 border-b border-white/10">
                                     <span className="font-semibold text-white">Adhesive Type:</span>
                                     <span className="text-white/80">{product.technicalData.adhesiveType}</span>
                                   </div>
                                 )}
                                 {product.technicalData.foamType && (
                                   <div className="flex justify-between py-3 border-b border-white/10">
                                     <span className="font-semibold text-white">Foam Type:</span>
                                     <span className="text-white/80">{product.technicalData.foamType}</span>
                                   </div>
                                 )}
                                 {product.technicalData.peelStrength && (
                                   <div className="flex justify-between py-3 border-b border-white/10">
                                     <span className="font-semibold text-white">Peel Strength:</span>
                                     <span className="text-white/80">{product.technicalData.peelStrength}</span>
                                   </div>
                                 )}
                                 {product.technicalData.shearStrength && (
                                   <div className="flex justify-between py-3 border-b border-white/10">
                                     <span className="font-semibold text-white">Shear Strength:</span>
                                     <span className="text-white/80">{product.technicalData.shearStrength}</span>
                                   </div>
                                 )}
                               </div>
                             </div>
                           )}
                         </div>
                       ) : (
                         <p className="text-white/70">No technical data available for this product.</p>
                       )}
                     </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mb-12">
              <div className="mb-8">
                <h2 className="text-3xl font-kallisto font-bold text-white mb-2" 
                    style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                  Related Products
                </h2>
                <p className="text-gray-300">More {product.industry} solutions</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, idx) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="group"
                  >
                    <Link to={`/products/${relatedProduct.category.toLowerCase()}/${relatedProduct.id}`}>
                      <div className={`relative h-[300px] rounded-2xl overflow-hidden bg-gradient-to-b ${industryColor(relatedProduct.industry)} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]`}>
                        {/* Background Image */}
                        <div className="absolute inset-0">
                          <img 
                            src={relatedProduct.image} 
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                          {/* Top Section */}
                          <div className="flex items-start justify-between">
                            <Badge className={`bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wide`}>
                              {relatedProduct.category}
                            </Badge>
                          </div>

                          {/* Bottom Section with Text Overlay */}
                          <div className="relative -mx-4 -mb-4">
                            {/* Text Background Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-b-2xl"></div>
                            
                            {/* Text Content */}
                            <div className="relative z-10 p-4">
                              <h3 className="text-lg font-kallisto font-bold mb-2 leading-tight" 
                                  style={{ fontFamily: typography.products.fontFamily, fontWeight: typography.products.fontWeight }}>
                                {relatedProduct.name.split('–')[0].trim()}
                              </h3>
                              <p className="text-sm text-gray-300 line-clamp-2" 
                                 style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                                {relatedProduct.name.split('–')[1]?.trim() || relatedProduct.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Call to Action */}
          <section className="text-center">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <CardContent className="space-y-6">
                <h2 className="text-3xl font-kallisto font-bold text-white" 
                    style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}>
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto" 
                   style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight }}>
                  Contact our technical team for expert guidance and support with your application.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    onClick={() => window.open(product.url, '_blank')}
                    className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-6 text-xl"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Full Datasheet
                  </Button>
                  <Link to="/contact">
                    <Button 
                      variant="outline"
                      className="border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white rounded-full px-8 py-6 text-xl transition-all duration-300"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage; 