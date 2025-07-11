import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  industrialDatasheet, 
  getBondProducts, 
  getSealProducts, 
  getTapeProducts, 
  searchProducts,
  getAllIndustries,
  getProductsByIndustry
} from '../data/industrialDatasheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  Filter, 
  Download, 
  Printer, 
  Info,
  Thermometer,
  Clock,
  Package,
  Shield,
  Zap,
  Anchor,
  Factory,
  Car,
  Building
} from 'lucide-react';

interface IndustrialDatasheetProps {
  className?: string;
}

export const IndustrialDatasheet: React.FC<IndustrialDatasheetProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'BOND' | 'SEAL' | 'TAPE'>('ALL');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('ALL');

  const allIndustries = getAllIndustries();

  const filteredProducts = useMemo(() => {
    let products = industrialDatasheet;
    
    // Filter by search term first
    if (searchTerm) {
      products = searchProducts(searchTerm);
    }
    
    // Filter by industry and category
    if (selectedIndustry !== 'ALL' || selectedCategory !== 'ALL') {
      products = products.filter(product => {
        const industryMatch = selectedIndustry === 'ALL' || product.industry.includes(selectedIndustry);
        const categoryMatch = selectedCategory === 'ALL' || product.category === selectedCategory;
        return industryMatch && categoryMatch;
      });
    }
    
    // Sort by industry first, then by category (BOND, SEAL, TAPE)
    const industryOrder = [
      'transportation',
      'marine',
      'construction',
      'industrial',
      'foam',
      'composites',
      'insulation',
    ];
    const categoryOrder = ['BOND', 'SEAL', 'TAPE'];
    
    return products.sort((a, b) => {
      // First sort by industry
      const aIndustryIndex = industryOrder.findIndex(industry => 
        a.industry.includes(industry)
      );
      const bIndustryIndex = industryOrder.findIndex(industry => 
        b.industry.includes(industry)
      );
      
      if (aIndustryIndex !== bIndustryIndex) {
        return aIndustryIndex - bIndustryIndex;
      }
      
      // Then sort by category
      const aCategoryIndex = categoryOrder.indexOf(a.category);
      const bCategoryIndex = categoryOrder.indexOf(b.category);
      
      return aCategoryIndex - bCategoryIndex;
    });
  }, [searchTerm, selectedCategory, selectedIndustry]);

  const bondProducts = getBondProducts();
  const sealProducts = getSealProducts();
  const tapeProducts = getTapeProducts();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(industrialDatasheet, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'forzabuilt-industrial-datasheet.json';
    link.click();
  };

  const getIndustryIcon = (industry: string) => {
    switch (industry.toLowerCase()) {
      case 'marine':
        return <Anchor className="h-4 w-4" />;
      case 'industrial':
        return <Factory className="h-4 w-4" />;
      case 'automotive':
        return <Car className="h-4 w-4" />;
      case 'construction':
        return <Building className="h-4 w-4" />;
      default:
        return <Factory className="h-4 w-4" />;
    }
  };

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      {/* Hero Header Section */}
      <section className="bg-gradient-to-br from-[#09668D] to-[#1B3764] text-white py-16 mb-12 rounded-3xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative z-10 px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <img 
                src="/src/assets/images/Forza-lion-logo.png" 
                alt="ForzaBuilt Lion Logo" 
                className="w-20 h-20 object-contain"
              />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-kallisto font-black mb-6 leading-tight">
              Products Datasheet
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-poppins leading-relaxed mb-8">
              Comprehensive technical specifications for all ForzaBuilt adhesive, sealant, and tape products.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center justify-center mb-3">
                  <Zap className="h-8 w-8 text-[#F16022] mr-3" />
                  <span className="text-3xl font-kallisto font-black">{bondProducts.length}</span>
                </div>
                <p className="text-white/90 font-poppins">Bond Products</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center justify-center mb-3">
                  <Shield className="h-8 w-8 text-[#ffd600] mr-3" />
                  <span className="text-3xl font-kallisto font-black">{sealProducts.length}</span>
                </div>
                <p className="text-white/90 font-poppins">Seal Products</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center justify-center mb-3">
                  <Package className="h-8 w-8 text-[#00a651] mr-3" />
                  <span className="text-3xl font-kallisto font-black">{tapeProducts.length}</span>
                </div>
                <p className="text-white/90 font-poppins">Tape Products</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search products by name, specifications, or applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 text-lg border-2 border-gray-200 focus:border-[#F16022] rounded-xl"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant={selectedCategory === 'ALL' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('ALL')}
              className={`px-6 py-3 rounded-xl font-bold ${
                selectedCategory === 'ALL' 
                  ? 'bg-gradient-to-r from-[#F16022] to-[#D35127] text-white border-0' 
                  : 'border-2 border-gray-300 hover:border-[#F16022]'
              }`}
            >
              All ({industrialDatasheet.length})
            </Button>
            <Button
              variant={selectedCategory === 'BOND' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('BOND')}
              className={`px-6 py-3 rounded-xl font-bold ${
                selectedCategory === 'BOND' 
                  ? 'bg-gradient-to-r from-[#F16022] to-[#D35127] text-white border-0' 
                  : 'border-2 border-gray-300 hover:border-[#F16022]'
              }`}
            >
              Bond ({bondProducts.length})
            </Button>
            <Button
              variant={selectedCategory === 'SEAL' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('SEAL')}
              className={`px-6 py-3 rounded-xl font-bold ${
                selectedCategory === 'SEAL' 
                  ? 'bg-gradient-to-r from-[#ffd600] to-[#f4c430] text-white border-0' 
                  : 'border-2 border-gray-300 hover:border-[#ffd600]'
              }`}
            >
              Seal ({sealProducts.length})
            </Button>
            <Button
              variant={selectedCategory === 'TAPE' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('TAPE')}
              className={`px-6 py-3 rounded-xl font-bold ${
                selectedCategory === 'TAPE' 
                  ? 'bg-gradient-to-r from-[#00a651] to-[#008f45] text-white border-0' 
                  : 'border-2 border-gray-300 hover:border-[#00a651]'
              }`}
            >
              Tape ({tapeProducts.length})
            </Button>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handlePrint}
              className="border-2 border-gray-300 hover:border-[#09668D] px-6 py-3 rounded-xl font-bold"
            >
              <Printer className="h-5 w-5 mr-2" />
              Print
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDownload}
              className="border-2 border-gray-300 hover:border-[#09668D] px-6 py-3 rounded-xl font-bold"
            >
              <Download className="h-5 w-5 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Industry Filter */}
        <div>
          <h3 className="text-xl font-kallisto font-bold text-[#1B3764] mb-4">Filter by Industry</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedIndustry === 'ALL' ? 'default' : 'outline'}
              size="lg"
              onClick={() => setSelectedIndustry('ALL')}
              className={`px-6 py-3 rounded-xl font-bold ${
                selectedIndustry === 'ALL' 
                  ? 'bg-gradient-to-r from-[#09668D] to-[#1B3764] text-white border-0' 
                  : 'border-2 border-gray-300 hover:border-[#09668D]'
              }`}
            >
              All Industries
            </Button>
            {allIndustries.map((industry) => (
              <Button
                key={industry}
                variant={selectedIndustry === industry ? 'default' : 'outline'}
                size="lg"
                onClick={() => setSelectedIndustry(industry)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold ${
                  selectedIndustry === industry 
                    ? 'bg-gradient-to-r from-[#09668D] to-[#1B3764] text-white border-0' 
                    : 'border-2 border-gray-300 hover:border-[#09668D]'
                }`}
              >
                {getIndustryIcon(industry)}
                {industry.charAt(0).toUpperCase() + industry.slice(1)}
                <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                  {getProductsByIndustry(industry).length}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden bg-white/95 backdrop-blur-sm rounded-2xl">
              <CardHeader className="pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-kallisto font-bold text-[#1B3764] mb-3">
                      {product.name}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge 
                        className={`font-bold px-3 py-1 rounded-lg ${
                          product.category === 'BOND' ? 'bg-gradient-to-r from-[#F16022] to-[#D35127] text-white' :
                          product.category === 'SEAL' ? 'bg-gradient-to-r from-[#ffd600] to-[#f4c430] text-white' :
                          'bg-gradient-to-r from-[#00a651] to-[#008f45] text-white'
                        }`}
                      >
                        {product.category}
                      </Badge>
                      {product.industry.map((industry) => (
                        <Badge key={industry} variant="outline" className="text-xs border-[#09668D] text-[#09668D]">
                          {getIndustryIcon(industry)}
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-xl ml-4 shadow-lg"
                  />
                </div>
                <CardDescription className="text-sm text-gray-600 font-poppins">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="specs" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1">
                    <TabsTrigger value="specs" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#1B3764] font-bold">Specifications</TabsTrigger>
                    <TabsTrigger value="tech" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#1B3764] font-bold">Technical</TabsTrigger>
                    <TabsTrigger value="apps" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#1B3764] font-bold">Applications</TabsTrigger>
                  </TabsList>

                  <TabsContent value="specs" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <span className="font-bold text-[#1B3764]">Type:</span>
                        <p className="text-gray-700 font-poppins">{product.specifications.type}</p>
                      </div>
                      {product.specifications.viscosity && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <span className="font-bold text-[#1B3764]">Viscosity:</span>
                          <p className="text-gray-700 font-poppins">{product.specifications.viscosity}</p>
                        </div>
                      )}
                      {product.specifications.solids && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <span className="font-bold text-[#1B3764]">Solids:</span>
                          <p className="text-gray-700 font-poppins">{product.specifications.solids}</p>
                        </div>
                      )}
                      {product.specifications.flashPoint && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <span className="font-bold text-[#1B3764]">Flash Point:</span>
                          <p className="text-gray-700 font-poppins">{product.specifications.flashPoint}</p>
                        </div>
                      )}
                      {product.specifications.potLife && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <span className="font-bold text-[#1B3764]">Pot Life:</span>
                          <p className="text-gray-700 font-poppins">{product.specifications.potLife}</p>
                        </div>
                      )}
                      {product.specifications.cureTime && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <span className="font-bold text-[#1B3764]">Cure Time:</span>
                          <p className="text-gray-700 font-poppins">{product.specifications.cureTime}</p>
                        </div>
                      )}
                      {product.specifications.temperatureRange && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <span className="font-bold text-[#1B3764]">Temp Range:</span>
                          <p className="text-gray-700 font-poppins">{product.specifications.temperatureRange}</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="tech" className="space-y-4 mt-4">
                    {product.technicalData && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {product.technicalData.density && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <span className="font-bold text-[#1B3764]">Density:</span>
                            <p className="text-gray-700 font-poppins">{product.technicalData.density}</p>
                          </div>
                        )}
                        {product.technicalData.pH && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <span className="font-bold text-[#1B3764]">pH:</span>
                            <p className="text-gray-700 font-poppins">{product.technicalData.pH}</p>
                          </div>
                        )}
                        {product.technicalData.color && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <span className="font-bold text-[#1B3764]">Color:</span>
                            <p className="text-gray-700 font-poppins">{product.technicalData.color}</p>
                          </div>
                        )}
                        {product.technicalData.odor && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <span className="font-bold text-[#1B3764]">Odor:</span>
                            <p className="text-gray-700 font-poppins">{product.technicalData.odor}</p>
                          </div>
                        )}
                        {product.technicalData.shelfLife && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <span className="font-bold text-[#1B3764]">Shelf Life:</span>
                            <p className="text-gray-700 font-poppins">{product.technicalData.shelfLife}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="apps" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div>
                        <span className="font-bold text-[#1B3764] text-sm">Substrates:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {product.specifications.substrates?.map((substrate, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-[#09668D] text-[#09668D] rounded-lg">
                              {substrate}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="font-bold text-[#1B3764] text-sm">Applications:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {product.specifications.applications?.map((app, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-[#F16022]/10 text-[#F16022] rounded-lg">
                              {app}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-[#1B3764] text-sm">Features:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {product.specifications.features?.map((feature, index) => (
                            <Badge key={index} variant="default" className="text-xs bg-gradient-to-r from-[#09668D] to-[#1B3764] text-white rounded-lg">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-[#1B3764] text-sm">Packaging:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {product.specifications.packaging?.map((pkg, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-[#00a651] text-[#00a651] rounded-lg">
                              {pkg}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-[#09668D] to-[#1B3764] text-white border-0 hover:from-[#1B3764] hover:to-[#09668D] font-bold rounded-xl py-3"
                    onClick={() => window.open(product.url, '_blank')}
                  >
                    <Info className="h-5 w-5 mr-2" />
                    More Information
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="bg-gray-50 rounded-3xl p-12 max-w-2xl mx-auto">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-kallisto font-bold text-[#1B3764] mb-4">
              No Products Found
            </h3>
            <p className="text-gray-600 font-poppins">
              Try adjusting your search terms or filters to find the products you're looking for.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}; 