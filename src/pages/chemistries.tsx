import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '@/utils/products';
import { chemistryDefinitions } from '@/data/chemistry-summary.json';

export default function ChemistriesPage() {
  const [selectedChemistry, setSelectedChemistry] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'confidence' | 'productType' | 'category'>('name');

  const products = getProducts();

  // Get unique chemistry types including "Tape"
  const chemistryTypes = Array.from(new Set(products.map(p => p.chemistry).filter(Boolean))).sort() as string[];

  // Get products by chemistry
  const getProductsByChemistry = (chemistry: string) => {
    // Make sure we only return products that have this as their primary chemistry
    // This prevents products with mixed chemistry signals from appearing in multiple categories
    return products.filter(p => {
      if (!p.chemistry) return false;
      return p.chemistry.toLowerCase() === chemistry.toLowerCase();
    });
  };

  // Get related chemistries (products that mention other chemistries)
  const getRelatedChemistries = (chemistry: string) => {
    const chemistryProducts = getProductsByChemistry(chemistry);
    const relatedChemistries = new Set<string>();
    
    chemistryProducts.forEach(product => {
      // Check if product mentions other chemistries in its description or details
      const productText = `${product.name} ${product.description || ''}`.toLowerCase();
      
      chemistryTypes.forEach(otherChemistry => {
        if (otherChemistry !== chemistry) {
          const chemistryKeywords = chemistryDefinitions[otherChemistry as keyof typeof chemistryDefinitions];
          if (chemistryKeywords) {
            // Check if product text mentions keywords from other chemistries
            const keywords = [
              otherChemistry.toLowerCase(),
              ...Object.values(chemistryKeywords).join(' ').toLowerCase().split(' ')
            ];
            
            if (keywords.some(keyword => productText.includes(keyword))) {
              relatedChemistries.add(otherChemistry);
            }
          }
        }
      });
    });
    
    return Array.from(relatedChemistries);
  };

  // Get chemistry relationships
  const getChemistryRelationships = () => {
    const relationships: Record<string, string[]> = {};
    
    chemistryTypes.forEach(chemistry => {
      relationships[chemistry] = getRelatedChemistries(chemistry);
    });
    
    return relationships;
  };

  // Sort products
  const sortProducts = (productList: typeof products) => {
    return [...productList].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'confidence':
          // Remove confidence sorting as it's not available in the Product type
          return 0;
        case 'productType':
          return (a.productType || '').localeCompare(b.productType || '');
        case 'category':
          // Sort by BOND, SEAL, TAPE category
          return (a.category || '').localeCompare(b.category || '');
        default:
          return 0;
      }
    });
  };

  const selectedProducts = selectedChemistry ? sortProducts(getProductsByChemistry(selectedChemistry)) : [];
  const relatedChemistries = selectedChemistry ? getRelatedChemistries(selectedChemistry) : [];
  const chemistryRelationships = getChemistryRelationships();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Chemistry Types
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of adhesive chemistries including specialized tapes. Each chemistry type offers unique properties 
              and performance characteristics for different applications and environments.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chemistry Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {chemistryTypes.map((chemistry) => {
            const chemistryProducts = getProductsByChemistry(chemistry);
            const definition = chemistryDefinitions[chemistry as keyof typeof chemistryDefinitions];
            const relatedCount = chemistryRelationships[chemistry]?.length || 0;
            
            return (
              <div
                key={chemistry}
                className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedChemistry === chemistry ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedChemistry(selectedChemistry === chemistry ? null : chemistry)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{chemistry}</h3>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">{chemistryProducts.length} products</span>
                    {relatedCount > 0 && (
                      <div className="text-xs text-blue-600 mt-1">
                        {relatedCount} related chemistries
                      </div>
                    )}
                  </div>
                </div>
                
                {definition && (
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Summary</h4>
                      <p className="text-sm text-gray-600">{definition.summary}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Best Used For</h4>
                      <p className="text-sm text-gray-600">{definition.bestUsedFor}</p>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Click to view products</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Chemistry Products */}
        {selectedChemistry && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedChemistry} Products
                </h2>
                <p className="text-gray-600">
                  {selectedProducts.length} products found
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="name">Name</option>
                  <option value="confidence">Confidence</option>
                  <option value="productType">Product Type</option>
                  <option value="category">Category (BOND/SEAL/TAPE)</option>
                </select>
              </div>
            </div>

            {/* Related Chemistries */}
            {relatedChemistries.length > 0 && (
              <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Chemistries</h3>
                <p className="text-sm text-gray-600 mb-3">
                  These chemistry types are mentioned or related to {selectedChemistry} products:
                </p>
                <div className="flex flex-wrap gap-2">
                  {relatedChemistries.map((relatedChemistry) => (
                    <button
                      key={relatedChemistry}
                      onClick={() => setSelectedChemistry(relatedChemistry)}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                    >
                      {relatedChemistry}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chemistry Details */}
            {chemistryDefinitions[selectedChemistry as keyof typeof chemistryDefinitions] && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Chemistry Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Technical Description</h4>
                    <p className="text-sm text-gray-600">
                      {chemistryDefinitions[selectedChemistry as keyof typeof chemistryDefinitions].technical}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Example Uses</h4>
                    <p className="text-sm text-gray-600">
                      {chemistryDefinitions[selectedChemistry as keyof typeof chemistryDefinitions].exampleUses}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid with Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  {/* Product Image */}
                  {product.imageUrl && (
                    <div className="mb-3 bg-blue-100 rounded-lg p-4 flex items-center justify-center">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="max-w-full max-h-32 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      'bg-gray-100 text-gray-800'
                    }`}>
                      Active
                    </span>
                  </div>
                  
                  {product.productType && (
                    <p className="text-xs text-gray-500 mb-2">
                      Type: {product.productType}
                    </p>
                  )}
                  
                  {product.industry && (
                    <p className="text-xs text-gray-500 mb-2">
                      Industry: {product.industry}
                    </p>
                  )}

                  {product.category && (
                    <p className="text-xs text-gray-500">
                      Category: {product.category}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Chemistry Relationships Matrix */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Chemistry Relationships</h2>
          <p className="text-gray-600 mb-4">
            This matrix shows how different chemistry types are related to each other through product descriptions and technical details.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium">Chemistry</th>
                  <th className="text-left py-2 px-4 font-medium">Related Chemistries</th>
                  <th className="text-left py-2 px-4 font-medium">Product Count</th>
                </tr>
              </thead>
              <tbody>
                {chemistryTypes.map((chemistry) => {
                  const related = chemistryRelationships[chemistry] || [];
                  const productCount = getProductsByChemistry(chemistry).length;
                  
                  return (
                    <tr key={chemistry} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4 font-medium">{chemistry}</td>
                      <td className="py-2 px-4">
                        {related.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {related.map((relatedChemistry) => (
                              <span
                                key={relatedChemistry}
                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                              >
                                {relatedChemistry}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400">No direct relationships</span>
                        )}
                      </td>
                      <td className="py-2 px-4 text-gray-600">{productCount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chemistry Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Chemistry Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chemistryTypes.map((chemistry) => {
              const chemistryProducts = getProductsByChemistry(chemistry);
              const relatedCount = chemistryRelationships[chemistry]?.length || 0;
              
              return (
                <div key={chemistry} className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{chemistry}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {chemistryProducts.length}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">products</p>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-600">Related chemistries:</span>
                      <span className="font-medium">{relatedCount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 