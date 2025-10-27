import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { industrialDatasheet } from '../data/industrialDatasheet';
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
  Building,
  Layers
} from 'lucide-react';

interface IndustrialDatasheetProps {
  className?: string;
}

export const IndustrialDatasheet: React.FC<IndustrialDatasheetProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'BOND' | 'SEAL' | 'TAPE'>('ALL');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('ALL');

  // Get unique industries from data
  const industries = useMemo(() => {
    const uniqueIndustries = [...new Set(industrialDatasheet.map(product => product.industry))];
    return uniqueIndustries.sort();
  }, []);

  // Get product counts for each industry
  const industryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    industrialDatasheet.forEach(product => {
      counts[product.industry] = (counts[product.industry] || 0) + 1;
    });
    return counts;
  }, []);

  // Get product counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    industrialDatasheet.forEach(product => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter products based on current selections
  const filteredProducts = useMemo(() => {
    return industrialDatasheet.filter(product => {
      // Industry filter
      if (selectedIndustry !== 'ALL' && product.industry !== selectedIndustry) {
        return false;
      }
      
      // Category filter
      if (selectedCategory !== 'ALL' && product.category !== selectedCategory) {
        return false;
      }
      
      // Search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term);
        if (!matchesSearch) {
          return false;
        }
      }
      
      return true;
    });
  }, [searchTerm, selectedCategory, selectedIndustry]);

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
      case 'transportation':
        return <Car className="h-4 w-4" />;
      case 'construction':
        return <Building className="h-4 w-4" />;
      // case 'foam':
      //   return <Package className="h-4 w-4" />;
      case 'composites':
        return <Layers className="h-4 w-4" />;
      case 'insulation':
        return <Thermometer className="h-4 w-4" />;
      default:
        return <Factory className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'BOND':
        return 'bg-gradient-to-r from-[#F16022] to-[#D35127] text-white';
      case 'SEAL':
        return 'bg-gradient-to-r from-[#ffd600] to-[#f4c430] text-white';
      case 'TAPE':
        return 'bg-gradient-to-r from-[#00a651] to-[#008f45] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#1B3764] to-[#F16022] text-white py-16 mb-12 rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative z-10 px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <img 
                src="/logos/Forza-lion-logo.png" 
                alt="ForzaBuilt Lion Logo" 
                className="w-20 h-20 object-contain"
              />
            </div>
            
                            <h1 className="text-5xl md:text-5xl font-kallisto font-black mb-6 leading-none">
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
                  <span className="text-3xl font-kallisto font-black">{categoryCounts.BOND || 0}</span>
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
                  <span className="text-3xl font-kallisto font-black">{categoryCounts.SEAL || 0}</span>
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
                  <span className="text-3xl font-kallisto font-black">{categoryCounts.TAPE || 0}</span>
                </div>
                <p className="text-white/90 font-poppins">Tape Products</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
        {/* Search Bar */}
        <div className="mb-8">
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

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-xl font-kallisto font-bold text-[#1B3764] mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === 'ALL' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('ALL')}
              className={`px-6 py-3 rounded-full font-bold ${
                selectedCategory === 'ALL' 
                  ? 'bg-[#F2611D] hover:bg-[#F2611D]/80 text-white border-0' 
                  : 'border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white'
              }`}
            >
              All Categories ({industrialDatasheet.length})
            </Button>
            <Button
              variant={selectedCategory === 'BOND' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('BOND')}
              className={`px-6 py-3 rounded-full font-bold ${
                selectedCategory === 'BOND' 
                  ? 'bg-[#F2611D] hover:bg-[#F2611D]/80 text-white border-0' 
                  : 'border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white'
              }`}
            >
              Bond ({categoryCounts.BOND || 0})
            </Button>
            <Button
              variant={selectedCategory === 'SEAL' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('SEAL')}
              className={`px-6 py-3 rounded-full font-bold ${
                selectedCategory === 'SEAL' 
                  ? 'bg-[#F2611D] hover:bg-[#F2611D]/80 text-white border-0' 
                  : 'border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white'
              }`}
            >
              Seal ({categoryCounts.SEAL || 0})
            </Button>
            <Button
              variant={selectedCategory === 'TAPE' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('TAPE')}
              className={`px-6 py-3 rounded-full font-bold ${
                selectedCategory === 'TAPE' 
                  ? 'bg-[#F2611D] hover:bg-[#F2611D]/80 text-white border-0' 
                  : 'border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white'
              }`}
            >
              Tape ({categoryCounts.TAPE || 0})
            </Button>
          </div>
        </div>

        {/* Industry Filter */}
        <div className="mb-8">
          <h3 className="text-xl font-kallisto font-bold text-[#1B3764] mb-4">Filter by Industry</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedIndustry === 'ALL' ? 'default' : 'outline'}
              size="lg"
              onClick={() => setSelectedIndustry('ALL')}
              className={`px-6 py-3 rounded-full font-bold ${
                selectedIndustry === 'ALL' 
                  ? 'bg-[#F2611D] hover:bg-[#F2611D]/80 text-white border-0' 
                  : 'border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white'
              }`}
            >
              All Industries
            </Button>
            {industries.map((industry) => (
              <Button
                key={industry}
                variant={selectedIndustry === industry ? 'default' : 'outline'}
                size="lg"
                onClick={() => setSelectedIndustry(industry)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold ${
                  selectedIndustry === industry 
                    ? 'bg-[#F2611D] hover:bg-[#F2611D]/80 text-white border-0' 
                    : 'border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white'
                }`}
              >
                {getIndustryIcon(industry)}
                {industry.charAt(0).toUpperCase() + industry.slice(1)}
                <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                  {industryCounts[industry] || 0}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handlePrint}
            className="border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white rounded-full px-6 py-3 font-bold transition-all duration-300"
          >
            <Printer className="h-5 w-5 mr-2" />
            Print
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDownload}
            className="border-2 border-[#F2611D] text-[#F2611D] hover:bg-[#F2611D] hover:text-white rounded-full px-6 py-3 font-bold transition-all duration-300"
          >
            <Download className="h-5 w-5 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Results Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Results:</strong> Showing {filteredProducts.length} of {industrialDatasheet.length} products
          {selectedIndustry !== 'ALL' && ` in ${selectedIndustry}`}
          {selectedCategory !== 'ALL' && ` (${selectedCategory})`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
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
                      <Badge className={`font-bold px-3 py-1 rounded-lg ${getCategoryColor(product.category)}`}>
                        {product.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-[#115B87] text-[#115B87]">
                        {getIndustryIcon(product.industry)}
                        {product.industry}
                      </Badge>
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
                    <TabsTrigger value="specs" className="rounded-lg">Specifications</TabsTrigger>
                    <TabsTrigger value="technical" className="rounded-lg">Technical</TabsTrigger>
                    <TabsTrigger value="applications" className="rounded-lg">Applications</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="specs" className="mt-4">
                    <div className="space-y-3">
                      {product.specifications.type && (
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">Type:</span>
                          <span className="text-gray-600">{product.specifications.type}</span>
                        </div>
                      )}
                      {product.specifications.viscosity && (
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">Viscosity:</span>
                          <span className="text-gray-600">{product.specifications.viscosity}</span>
                        </div>
                      )}
                      {product.specifications.solids && (
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">Solids:</span>
                          <span className="text-gray-600">{product.specifications.solids}</span>
                        </div>
                      )}
                      {product.specifications.flashPoint && (
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">Flash Point:</span>
                          <span className="text-gray-600">{product.specifications.flashPoint}</span>
                        </div>
                      )}
                      {product.specifications.potLife && (
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">Pot Life:</span>
                          <span className="text-gray-600">{product.specifications.potLife}</span>
                        </div>
                      )}
                      {product.specifications.cureTime && (
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">Cure Time:</span>
                          <span className="text-gray-600">{product.specifications.cureTime}</span>
                        </div>
                      )}
                      {product.specifications.temperatureRange && (
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-700">Temp Range:</span>
                          <span className="text-gray-600">{product.specifications.temperatureRange}</span>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="technical" className="mt-4">
                    {/* 2-column, 3-row grid for technical data - organized in groups of 3 */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      {/* Column 1: First 3 items */}
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Density:</span>
                        <span className="text-gray-600">{product.technicalData?.density || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">pH:</span>
                        <span className="text-gray-600">{product.technicalData?.pH || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Color:</span>
                        <span className="text-gray-600">{product.technicalData?.color || 'N/A'}</span>
                      </div>
                      
                      {/* Column 2: Next 3 items */}
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Odor:</span>
                        <span className="text-gray-600">{product.technicalData?.odor || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Shelf Life:</span>
                        <span className="text-gray-600">{product.technicalData?.shelfLife || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Storage:</span>
                        <span className="text-gray-600">{product.technicalData?.storageConditions || 'N/A'}</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="applications" className="mt-4">
                    <div className="space-y-4">
                      {product.specifications.applications && product.specifications.applications.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Applications:</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.specifications.applications.map((app, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {app}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {product.specifications.substrates && product.specifications.substrates.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Substrates:</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.specifications.substrates.map((substrate, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {substrate}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {product.specifications.features && product.specifications.features.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Features:</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.specifications.features.map((feature, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-[#115B87] text-[#115B87] hover:bg-[#115B87] hover:text-white"
                    onClick={() => {
                      // Check if TDS files are available
                      const tdsLink = product.standardTdsLink || product.pdfLinks?.[0];
                      if (tdsLink && tdsLink.startsWith('/TDS/')) {
                        // TDS files are temporarily unavailable
                        alert("Technical Data Sheets are temporarily unavailable. Please contact us for product information.");
                      } else if (tdsLink) {
                        // External link or other PDF
                        window.location.href = `/pdf-viewer/${encodeURIComponent(tdsLink)}`;
                      } else {
                        alert("The datasheet for this product is not available yet.");
                      }
                    }}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    View Datasheet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}; 