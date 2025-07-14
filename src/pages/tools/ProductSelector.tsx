import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProductDatasheetView from '@/components/ProductDatasheetView';

const ProductSelector = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Selector
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect Forza product for your specific application and requirements using our advanced filtering system.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Advanced Product Filtering</CardTitle>
            <CardDescription>
              Use the filters below to find products by category, industry, or search terms. Click on any product card to view detailed specifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductDatasheetView />
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
  );
};

export default ProductSelector; 