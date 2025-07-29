import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { getIndustrySummary } from '../utils/industrySummary';
import { Link } from 'react-router-dom';

const OFFICIAL_INDUSTRIES = [
  'transportation',
  'marine', 
  'construction',
  'industrial',
  // 'foam',
  'composites',
  'insulation',
];

const IndustrySummary: React.FC = () => {
  const summary = getIndustrySummary();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Industry Assignment Summary</h1>
          <Link to="/industry-review">
            <Button>Start Review Process</Button>
          </Link>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{summary.totalProducts}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Single Industry</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{summary.productsWithSingleIndustry}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Multiple Industries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600">{summary.productsWithMultipleIndustries}</p>
            </CardContent>
          </Card>
        </div>

        {/* Official Industry Counts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Official Industry Counts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {OFFICIAL_INDUSTRIES.map(industry => {
                const count = summary.industryCounts[industry] || 0;
                return (
                  <div key={industry} className="text-center">
                    <h3 className="font-semibold capitalize">{industry}</h3>
                    <p className="text-2xl font-bold text-blue-600">{count}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Non-Official Industries */}
        {summary.nonOfficialIndustries.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Non-Official Industries Found</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {summary.nonOfficialIndustries.map(industry => {
                  const count = summary.industryCounts[industry];
                  return (
                    <Badge key={industry} variant="destructive">
                      {industry}: {count}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sample Multiple Industry Products */}
        <Card>
          <CardHeader>
            <CardTitle>Sample Products with Multiple Industries</CardTitle>
            <p className="text-sm text-gray-600">
              Showing first 10 of {summary.multipleIndustryExamples.length} products
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {summary.multipleIndustryExamples.slice(0, 10).map(product => (
                <div key={product.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{product.name}</h3>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">ID: {product.id}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.industries.map(industry => (
                      <Badge key={industry} variant="secondary">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IndustrySummary; 