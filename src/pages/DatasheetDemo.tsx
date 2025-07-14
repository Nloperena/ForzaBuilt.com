import React from 'react';
import { IndustrialDatasheet } from '../components/IndustrialDatasheet';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  ArrowRight, 
  FileText, 
  Search, 
  Filter,
  Download,
  Printer,
  Share2,
  Zap,
  Shield,
  Package
} from 'lucide-react';

const DatasheetDemo: React.FC = () => {
  const handleNavigateToDatasheet = () => {
    // In a real app, this would navigate to the datasheet page
            window.open('/product-datasheets', '_blank');
  };

  const handleDownloadDatasheet = () => {
    // This would trigger a download of the datasheet
    console.log('Downloading datasheet...');
  };

  const handlePrintDatasheet = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Industrial Products Datasheet
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive technical specifications for all ForzaBuilt industrial adhesive, 
              sealant, and tape products. Find detailed information about performance, 
              applications, and specifications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleNavigateToDatasheet}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <FileText className="h-5 w-5 mr-2" />
                View Full Datasheet
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleDownloadDatasheet}
              >
                <Download className="h-5 w-5 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Zap className="h-10 w-10 text-orange-500 mr-4" />
                  <div>
                    <p className="text-3xl font-bold text-gray-900">25+</p>
                    <p className="text-sm text-gray-600">Bond Products</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Shield className="h-10 w-10 text-yellow-500 mr-4" />
                  <div>
                    <p className="text-3xl font-bold text-gray-900">15+</p>
                    <p className="text-sm text-gray-600">Seal Products</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-10 w-10 text-red-500 mr-4" />
                  <div>
                    <p className="text-3xl font-bold text-gray-900">12+</p>
                    <p className="text-sm text-gray-600">Tape Products</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-10 w-10 text-blue-500 mr-4" />
                  <div>
                    <p className="text-3xl font-bold text-gray-900">50+</p>
                    <p className="text-sm text-gray-600">Total Products</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader>
                <Search className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Advanced Search</CardTitle>
                <CardDescription>
                  Find products quickly with our intelligent search and filtering system.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Filter className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Category Filtering</CardTitle>
                <CardDescription>
                  Filter by Bond, Seal, or Tape categories to find exactly what you need.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Download className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Export Options</CardTitle>
                <CardDescription>
                  Download datasheets in multiple formats for offline reference.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Product Information Preview
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each product includes detailed specifications, technical data, applications, 
              and packaging information. Click on any product card to view complete details.
            </p>
          </div>

          {/* Sample Product Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {/* Sample Bond Product */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-2">
                      IC933 – CA COMPLIANT MULTI-PURPOSE CONTACT ADHESIVE
                    </CardTitle>
                    <Badge variant="default" className="mb-2">
                      BOND
                    </Badge>
                  </div>
                  <img 
                    src="https://forzabuilt.com/wp-content/uploads/2024/03/IC933-bundle-1024x1024.png"
                    alt="IC933"
                    className="w-16 h-16 object-cover rounded-lg ml-4"
                  />
                </div>
                <CardDescription>
                  High-strength contact adhesive compliant with California regulations for industrial bonding applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div>
                    <span className="font-medium">Type:</span>
                    <p className="text-gray-600">Contact Adhesive</p>
                  </div>
                  <div>
                    <span className="font-medium">Viscosity:</span>
                    <p className="text-gray-600">800-1200 cps</p>
                  </div>
                  <div>
                    <span className="font-medium">Solids:</span>
                    <p className="text-gray-600">25-30%</p>
                  </div>
                  <div>
                    <span className="font-medium">Flash Point:</span>
                    <p className="text-gray-600">&gt;200°F</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Sample Seal Product */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-2">
                      OS2 – MULTI-PURPOSE HYBRID POLYMER SEALANT
                    </CardTitle>
                    <Badge variant="secondary" className="mb-2">
                      SEAL
                    </Badge>
                  </div>
                  <img 
                    src="https://forzabuilt.com/wp-content/uploads/2023/12/OS2-Cartridge-1-1-819x1024.png"
                    alt="OS2"
                    className="w-16 h-16 object-cover rounded-lg ml-4"
                  />
                </div>
                <CardDescription>
                  Multi-purpose hybrid polymer sealant for versatile sealing applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div>
                    <span className="font-medium">Type:</span>
                    <p className="text-gray-600">Hybrid Polymer Sealant</p>
                  </div>
                  <div>
                    <span className="font-medium">Consistency:</span>
                    <p className="text-gray-600">Paste</p>
                  </div>
                  <div>
                    <span className="font-medium">Cure Time:</span>
                    <p className="text-gray-600">24-48 hours</p>
                  </div>
                  <div>
                    <span className="font-medium">Temp Range:</span>
                    <p className="text-gray-600">-40°F to +200°F</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Sample Tape Product */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-2">
                      T215 – ULTRA HIGH-BOND ACRYLIC FOAM TAPE
                    </CardTitle>
                    <Badge variant="destructive" className="mb-2">
                      TAPE
                    </Badge>
                  </div>
                  <img 
                    src="https://forzabuilt.com/wp-content/uploads/2023/05/vhb-tape-mockup-1024x1024.png"
                    alt="T215"
                    className="w-16 h-16 object-cover rounded-lg ml-4"
                  />
                </div>
                <CardDescription>
                  Ultra high-bond acrylic foam tape for demanding industrial applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div>
                    <span className="font-medium">Type:</span>
                    <p className="text-gray-600">Acrylic Foam Tape</p>
                  </div>
                  <div>
                    <span className="font-medium">Thickness:</span>
                    <p className="text-gray-600">0.5mm</p>
                  </div>
                  <div>
                    <span className="font-medium">Bond Strength:</span>
                    <p className="text-gray-600">Ultra High</p>
                  </div>
                  <div>
                    <span className="font-medium">Temp Range:</span>
                    <p className="text-gray-600">-40°F to +200°F</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to explore all products?
            </h3>
            <p className="text-gray-600 mb-6">
              Access the complete industrial products datasheet with detailed specifications, 
              technical data, and application information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleNavigateToDatasheet}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <FileText className="h-5 w-5 mr-2" />
                View Complete Datasheet
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handlePrintDatasheet}
              >
                <Printer className="h-5 w-5 mr-2" />
                Print Datasheet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasheetDemo; 