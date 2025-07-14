import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  analyzeIndustryAssignments, 
  getProductsWithMultipleIndustries,
  getProductsWithSingleIndustry 
} from '../utils/industryAnalysis';

const OFFICIAL_INDUSTRIES = [
  'transportation',
  'marine', 
  'construction',
  'industrial',
  'foam',
  'composites',
  'insulation',
];

interface ReviewProduct {
  id: string;
  name: string;
  category: string;
  currentIndustries: string[];
  suggestedPrimary: string;
  reasoning: string;
  selectedPrimary: string;
}

const IndustryReview: React.FC = () => {
  const [products, setProducts] = useState<ReviewProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMultipleOnly, setShowMultipleOnly] = useState(true);
  const [reviewedCount, setReviewedCount] = useState(0);

  useEffect(() => {
    const analysis = analyzeIndustryAssignments();
    const reviewProducts: ReviewProduct[] = analysis.map(item => ({
      id: item.productId,
      name: item.productName,
      category: item.category,
      currentIndustries: item.currentIndustries,
      suggestedPrimary: item.suggestedPrimary,
      reasoning: item.reasoning,
      selectedPrimary: item.suggestedPrimary
    }));
    
    if (showMultipleOnly) {
      const multipleIndustryProducts = getProductsWithMultipleIndustries();
      const multipleReviewProducts = reviewProducts.filter(product => 
        multipleIndustryProducts.some(p => p.id === product.id)
      );
      setProducts(multipleReviewProducts);
    } else {
      setProducts(reviewProducts);
    }
  }, [showMultipleOnly]);

  const handleIndustryChange = (productId: string, newIndustry: string) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, selectedPrimary: newIndustry }
        : product
    ));
  };

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setReviewedCount(reviewedCount + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setReviewedCount(Math.max(0, reviewedCount - 1));
    }
  };

  const currentProduct = products[currentIndex];

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Industry Assignment Review</h1>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Industry Assignment Review</h1>
          <div className="flex gap-4">
            <Button 
              variant={showMultipleOnly ? "default" : "outline"}
              onClick={() => setShowMultipleOnly(true)}
            >
              Multiple Industries Only
            </Button>
            <Button 
              variant={!showMultipleOnly ? "default" : "outline"}
              onClick={() => setShowMultipleOnly(false)}
            >
              All Products
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg mb-2">
            Progress: {currentIndex + 1} of {products.length} 
            {showMultipleOnly && ` (${getProductsWithMultipleIndustries().length} with multiple industries)`}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / products.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {currentProduct && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">{currentProduct.name}</CardTitle>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="outline">{currentProduct.category}</Badge>
                    <Badge variant="secondary">ID: {currentProduct.id}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Suggested: {currentProduct.suggestedPrimary}</p>
                  <p className="text-xs text-gray-500">{currentProduct.reasoning}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Current Industries:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.currentIndustries.map(industry => (
                    <Badge key={industry} variant="outline">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Select Primary Industry:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {OFFICIAL_INDUSTRIES.map(industry => (
                    <Button
                      key={industry}
                      variant={currentProduct.selectedPrimary === industry ? "default" : "outline"}
                      onClick={() => handleIndustryChange(currentProduct.id, industry)}
                      className="text-sm"
                    >
                      {industry}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button 
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Selected: <span className="font-semibold">{currentProduct.selectedPrimary}</span>
                  </p>
                </div>
                
                <Button 
                  onClick={handleNext}
                  disabled={currentIndex === products.length - 1}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {OFFICIAL_INDUSTRIES.map(industry => {
              const count = products.filter(p => p.selectedPrimary === industry).length;
              return (
                <Card key={industry}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold capitalize">{industry}</h3>
                    <p className="text-2xl font-bold text-blue-600">{count}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryReview; 