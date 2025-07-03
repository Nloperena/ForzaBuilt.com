import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const Compatibility = () => {
  const [product1, setProduct1] = useState('');
  const [product2, setProduct2] = useState('');
  const [compatibilityResult, setCompatibilityResult] = useState<{
    compatible: boolean;
    message: string;
    details: string;
    icon: React.ReactNode;
  } | null>(null);

  const products = [
    'ForzaFlex 1000',
    'ForzaSeal 2000',
    'ForzaBond 3000',
    'ForzaCoat 4000',
    'ForzaProtect 5000',
    'ForzaAdhesive 6000'
  ];

  const checkCompatibility = () => {
    if (!product1 || !product2) return;

    // This is a simplified compatibility check
    // In a real application, this would query a database of compatibility data
    const incompatiblePairs = [
      ['ForzaFlex 1000', 'ForzaBond 3000'],
      ['ForzaSeal 2000', 'ForzaCoat 4000'],
      ['ForzaProtect 5000', 'ForzaAdhesive 6000']
    ];

    const isIncompatible = incompatiblePairs.some(pair => 
      (pair[0] === product1 && pair[1] === product2) ||
      (pair[0] === product2 && pair[1] === product1)
    );

    if (isIncompatible) {
      setCompatibilityResult({
        compatible: false,
        message: 'Not Compatible',
        details: 'These products should not be used together as they may cause adverse reactions or reduced performance.',
        icon: <XCircle className="w-8 h-8 text-red-500" />
      });
    } else if (product1 === product2) {
      setCompatibilityResult({
        compatible: true,
        message: 'Same Product',
        details: 'You have selected the same product twice. This is always compatible.',
        icon: <CheckCircle className="w-8 h-8 text-green-500" />
      });
    } else {
      setCompatibilityResult({
        compatible: true,
        message: 'Compatible',
        details: 'These products are compatible and can be used together in your application.',
        icon: <CheckCircle className="w-8 h-8 text-green-500" />
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Compatibility Tool
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check compatibility between different Forza products and materials.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Product Selection</CardTitle>
              <CardDescription>
                Select two products to check their compatibility.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Product 1</label>
                  <Select value={product1} onValueChange={setProduct1}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select first product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product} value={product}>
                          {product}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Product 2</label>
                  <Select value={product2} onValueChange={setProduct2}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select second product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product} value={product}>
                          {product}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full bg-[#F2611D] hover:bg-[#F2611D]/80"
                  onClick={checkCompatibility}
                  disabled={!product1 || !product2}
                >
                  Check Compatibility
                </Button>
              </div>

              {compatibilityResult && (
                <Card className={`mt-6 ${
                  compatibilityResult.compatible 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        {compatibilityResult.icon}
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 ${
                        compatibilityResult.compatible ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {compatibilityResult.message}
                      </h3>
                      <p className={`text-sm ${
                        compatibilityResult.compatible ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {compatibilityResult.details}
                      </p>
                      <div className="mt-4 flex justify-center gap-2">
                        <Badge variant="outline">{product1}</Badge>
                        <span className="text-gray-500">vs</span>
                        <Badge variant="outline">{product2}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          <div className="text-center">
            <Link to="/tools">
              <Button variant="outline" className="mr-4">
                ← Back to Tools
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline">
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compatibility; 