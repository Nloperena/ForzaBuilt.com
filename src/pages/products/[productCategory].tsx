import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProductCategoryPage = () => {
  const { productCategory } = useParams();

  // Convert URL slug back to readable format
  const categoryName = productCategory?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Mock product data - in a real app, this would come from an API or database
  const products = [
    {
      name: 'ForzaFlex 1000',
      description: 'High-performance flexible sealant for demanding applications.',
      features: ['UV Resistant', 'Temperature Range: -40°C to +90°C', 'Cure Time: 24 hours'],
      applications: ['Construction', 'Automotive', 'Manufacturing']
    },
    {
      name: 'ForzaSeal 2000',
      description: 'Premium sealing solution for critical applications.',
      features: ['Chemical Resistant', 'Temperature Range: -50°C to +120°C', 'Cure Time: 12 hours'],
      applications: ['Aerospace', 'Marine', 'Electronics']
    },
    {
      name: 'ForzaBond 3000',
      description: 'Advanced bonding adhesive for structural applications.',
      features: ['High Strength', 'Temperature Range: -30°C to +150°C', 'Cure Time: 6 hours'],
      applications: ['Construction', 'Automotive', 'Aerospace']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {categoryName}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our range of {categoryName?.toLowerCase()} products designed for your specific needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {products.map((product) => (
            <Card key={product.name} className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-[#F2611D] rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Applications:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-[#F2611D] hover:bg-[#F2611D]/80">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/products">
            <Button variant="outline" className="mr-4">
              ← Back to Products
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
  );
};

export default ProductCategoryPage; 