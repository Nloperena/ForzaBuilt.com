/**
 * Product Service
 * 
 * This service handles product data management including loading, saving,
 * filtering, and export operations.
 */

import { fetchData } from "../lib/utils";
import { ImageMappingService } from './imageMappingService';
import { getBlobImageUrl } from '../utils/blobStorage';

// Types
export type Product = {
  id: string;
  name: string;
  shortName?: string;
  description?: string;
  category: "BOND" | "SEAL" | "TAPE";
  industry: string[];
  productType?: string;
  chemistry?: string;
  technicalData?: Record<string, string>;
  applications?: string;
  benefits?: string[];
  sizes?: string[];
  imageUrl?: string;
  pdfLinks?: string[];
  standardTdsLink?: string;
  hasTdsLink?: boolean;
  searchKeywords?: string[];
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
  version?: number;
};

export type ProductsData = {
  metadata: {
    consolidatedAt: string;
    totalProducts: number;
    source: string;
    version: string;
    schema: {
      requiredFields: string[];
      fieldTypes: Record<string, string>;
    };
    [key: string]: any;
  };
  products: Product[];
};

// Constants
// Use proxy in development to avoid CORS issues, direct URL in production
const PRODUCTS_DATA_URL = import.meta.env.DEV 
  ? '/api/products'  // Uses Vite proxy in development
  : 'https://forza-product-managementsystem-b7c3ff8d3d2d.herokuapp.com/api/products';  // Direct URL in production

// Simple in-memory cache
let productsCache: Product[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Service functions
export async function getAllProducts(): Promise<Product[]> {
  // Return cached data if available and fresh
  if (productsCache && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    console.log('🟢 Returning products from cache');
    return productsCache;
  }

  try {
    console.log('🔵 Fetching products from Heroku API...');
    const response = await fetch(PRODUCTS_DATA_URL, {
      headers: {
        'Accept': 'application/json; charset=utf-8',
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const apiData = await response.json();
    console.log(`✅ Fetched ${apiData.length} products from API`);
    
    // Transform the API data to match your expected format
    const products = apiData.map((apiProduct: any, index: number) => {
      // Handle technical data - can be array or object
      let technicalData = {};
      if (apiProduct.technical) {
        if (Array.isArray(apiProduct.technical)) {
          // Technical is an array - convert to object
          technicalData = apiProduct.technical.reduce((acc: any, item: any) => {
            acc[item.property] = item.value;
            return acc;
          }, {});
        } else if (typeof apiProduct.technical === 'object') {
          // Technical is already an object - use as is
          technicalData = apiProduct.technical;
        }
      }

      // Handle sizing - can be array of strings or array of objects
      let sizes: string[] = [];
      if (apiProduct.sizing && Array.isArray(apiProduct.sizing)) {
        sizes = apiProduct.sizing.map((size: any) => 
          typeof size === 'string' ? size : size.size || ''
        );
      }

      const product = {
        id: apiProduct.product_id,
        name: apiProduct.full_name || apiProduct.name,
        shortName: apiProduct.name,
        description: apiProduct.description,
        category: apiProduct.brand === 'forza_bond' ? 'BOND' : 
                  apiProduct.brand === 'forza_seal' ? 'SEAL' : 
                  apiProduct.brand === 'forza_tape' ? 'TAPE' : 'BOND',
        industry: [apiProduct.industry?.replace('_industry', '').replace('_', ' ') || 'industrial'],
        productType: apiProduct.brand,
        chemistry: apiProduct.chemistry,
        technicalData: technicalData,
        applications: Array.isArray(apiProduct.applications) 
          ? apiProduct.applications 
          : apiProduct.applications ? [apiProduct.applications] : [],
        benefits: apiProduct.benefits || [],
        sizes: sizes,
        imageUrl: apiProduct.image ? (
          // If API returns a full URL, use it directly (but fix common typos)
          apiProduct.image.startsWith('http://') || apiProduct.image.startsWith('https://')
            ? apiProduct.image.replace('product-images-web-optmized', 'product-images-web-optimized') // Fix typo: optmized -> optimized
            : getBlobImageUrl(
                apiProduct.image,
                apiProduct.industry ? [apiProduct.industry.replace('_industry', '').replace('_', ' ')] : undefined
              )
        ) : undefined,
        pdfLinks: [], // Not in API response
        standardTdsLink: '', // Not in API response
        hasTdsLink: false, // Not in API response
        searchKeywords: [], // Not in API response
        isActive: apiProduct.published,
        createdAt: apiProduct.created_at,
        updatedAt: apiProduct.updated_at,
        version: 1
      };
      
      // Debug first few products with images
      if (index < 5) {
        console.log(`🖼️ Product ${product.id}:`);
        console.log(`   API image field: ${apiProduct.image}`);
        console.log(`   Final imageUrl: ${product.imageUrl}`);
        console.log(`   Industry: ${product.industry.join(', ')}`);
      }
      
      return product;
    });
    
    // Filter to only show published products
    const publishedProducts = products.filter(product => product.isActive === true);
    console.log(`✅ Returning ${publishedProducts.length} published products`);
    
    // Update cache
    productsCache = publishedProducts;
    cacheTimestamp = Date.now();
    
    return publishedProducts;
  } catch (error) {
    console.error('Failed to fetch products from Heroku API:', error);
    
    // Try fallback to local JSON file only as last resort
    try {
      const fallbackResponse = await fetch('/productsSimplified.json');
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        console.warn('⚠️ API failed, using fallback local JSON data');
        return fallbackData.products || [];
      }
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
    }
    
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(PRODUCTS_DATA_URL, {
      headers: {
        'Accept': 'application/json; charset=utf-8',
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const apiData = await response.json();
    const apiProduct = apiData.find((p: any) => p.product_id === id);
    
    if (!apiProduct) {
      return null;
    }
    
    // Handle technical data - can be array or object
    let technicalData = {};
    if (apiProduct.technical) {
      if (Array.isArray(apiProduct.technical)) {
        // Technical is an array - convert to object
        technicalData = apiProduct.technical.reduce((acc: any, item: any) => {
          acc[item.property] = item.value;
          return acc;
        }, {});
      } else if (typeof apiProduct.technical === 'object') {
        // Technical is already an object - use as is
        technicalData = apiProduct.technical;
      }
    }

    // Handle sizing - can be array of strings or array of objects
    let sizes: string[] = [];
    if (apiProduct.sizing && Array.isArray(apiProduct.sizing)) {
      sizes = apiProduct.sizing.map((size: any) => 
        typeof size === 'string' ? size : size.size || ''
      );
    }

    // Transform the API data to match your expected format
    const product = {
      id: apiProduct.product_id,
      name: apiProduct.full_name || apiProduct.name,
      shortName: apiProduct.name,
      description: apiProduct.description,
      category: apiProduct.brand === 'forza_bond' ? 'BOND' : 
                apiProduct.brand === 'forza_seal' ? 'SEAL' : 
                apiProduct.brand === 'forza_tape' ? 'TAPE' : 'BOND',
      industry: [apiProduct.industry?.replace('_industry', '').replace('_', ' ') || 'industrial'],
      productType: apiProduct.brand,
      chemistry: apiProduct.chemistry,
      technicalData: technicalData,
      applications: Array.isArray(apiProduct.applications) 
        ? apiProduct.applications 
        : apiProduct.applications ? [apiProduct.applications] : [],
      benefits: apiProduct.benefits || [],
      sizes: sizes,
      imageUrl: apiProduct.image ? (
        // If API returns a full URL, use it directly (but fix common typos)
        apiProduct.image.startsWith('http://') || apiProduct.image.startsWith('https://')
          ? apiProduct.image.replace('product-images-web-optmized', 'product-images-web-optimized') // Fix typo: optmized -> optimized
          : getBlobImageUrl(
              apiProduct.image,
              apiProduct.industry ? [apiProduct.industry.replace('_industry', '').replace('_', ' ')] : undefined
            )
      ) : undefined,
      pdfLinks: [], // Not in API response
      standardTdsLink: '', // Not in API response
      hasTdsLink: false, // Not in API response
      searchKeywords: [], // Not in API response
      isActive: apiProduct.published,
      createdAt: apiProduct.created_at,
      updatedAt: apiProduct.updated_at,
      version: 1
    };
    
    return product;
  } catch (error) {
    console.error('Failed to fetch product by ID from Heroku API:', error);
    return null;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const allProducts = await getAllProducts();
    return allProducts.filter(p => p.category === category);
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    return [];
  }
}

export async function getProductsByIndustry(industry: string): Promise<Product[]> {
  try {
    const allProducts = await getAllProducts();
    return allProducts.filter(p => p.industry && p.industry.includes(industry));
  } catch (error) {
    console.error('Failed to fetch products by industry:', error);
    return [];
  }
}

export async function getProductsByChemistry(chemistry: string): Promise<Product[]> {
  try {
    const allProducts = await getAllProducts();
    return allProducts.filter(p => p.chemistry === chemistry);
  } catch (error) {
    console.error('Failed to fetch products by chemistry:', error);
    return [];
  }
}

export async function searchProducts(term: string): Promise<Product[]> {
  try {
    const allProducts = await getAllProducts();
    const searchTerm = term.toLowerCase();
    
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.id.toLowerCase().includes(searchTerm) ||
      product.shortName?.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error('Failed to search products:', error);
    return [];
  }
}

export async function getProductsMetadata(): Promise<ProductsData['metadata']> {
  try {
    const allProducts = await getAllProducts();
    return {
      consolidatedAt: new Date().toISOString(),
      totalProducts: allProducts.length,
      source: 'heroku-api',
      version: '1.0',
      schema: {
        requiredFields: ['id', 'name', 'category', 'industry'],
        fieldTypes: {
          id: 'string',
          name: 'string',
          category: 'string',
          industry: 'array'
        }
      }
    };
  } catch (error) {
    console.error('Failed to get products metadata:', error);
    return {
      consolidatedAt: new Date().toISOString(),
      totalProducts: 0,
      source: 'heroku-api',
      version: '1.0',
      schema: {
        requiredFields: [],
        fieldTypes: {}
      }
    };
  }
}

// This would be a real API call in production
export async function saveProduct(product: Product): Promise<Product> {
  console.log('Saving product:', product);
  // Simulate an API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        ...product,
        updatedAt: new Date().toISOString(),
      });
    }, 500);
  });
}

// This would be a real API call in production
export async function deleteProduct(id: string): Promise<boolean> {
  console.log('Deleting product:', id);
  // Simulate an API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
}

// Export products data from Heroku API
export async function exportProductsData(): Promise<void> {
  try {
    const products = await getAllProducts();
    const jsonStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products-export.json';
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  } catch (error) {
    console.error('Failed to export products data:', error);
  }
}

export async function generateProductStats() {
  try {
    const products = await getAllProducts();
    const bondCount = products.filter(p => p.category === "BOND").length;
    const sealCount = products.filter(p => p.category === "SEAL").length;
    const tapeCount = products.filter(p => p.category === "TAPE").length;
    
    const withImage = products.filter(p => !!p.imageUrl).length;
    const withPdf = products.filter(p => p.pdfLinks && p.pdfLinks.length > 0).length;
    
    const industriesMap: Record<string, number> = {};
    const chemistriesMap: Record<string, number> = {};
    
    products.forEach(product => {
      // Count industries
      if (product.industry) {
        product.industry.forEach(ind => {
          industriesMap[ind] = (industriesMap[ind] || 0) + 1;
        });
      }
      
      // Count chemistries
      if (product.chemistry) {
        chemistriesMap[product.chemistry] = (chemistriesMap[product.chemistry] || 0) + 1;
      }
    });
    
    return {
      total: products.length,
      bond: bondCount,
      seal: sealCount,
      tape: tapeCount,
      withImage,
      withPdf,
      industries: Object.entries(industriesMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      chemistries: Object.entries(chemistriesMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
    };
  } catch (error) {
    console.error('Failed to generate product stats:', error);
    return {
      total: 0,
      bond: 0,
      seal: 0,
      tape: 0,
      withImage: 0,
      withPdf: 0,
      industries: [],
      chemistries: [],
    };
  }
}
