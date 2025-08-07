/**
 * Product Service
 * 
 * This service handles product data management including loading, saving,
 * filtering, and export operations.
 */

import { fetchData } from "../lib/utils";
import { ImageMappingService } from './imageMappingService';

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
const PRODUCTS_DATA_URL = '/src/data/productsSimplified.json';

// Service functions
export async function getAllProducts(): Promise<Product[]> {
  const data = await fetchData<ProductsData>(PRODUCTS_DATA_URL);
  const products = data.products || [];
  
  // Fix image URLs for all products
  for (const product of products) {
    if (product.imageUrl) {
      const validImageUrl = await ImageMappingService.validateAndGetImage(product.imageUrl, product.id);
      if (validImageUrl !== product.imageUrl) {
        product.imageUrl = validImageUrl;
      }
    }
  }
  
  return products;
}

export async function getProductById(id: string): Promise<Product | null> {
  const data = await fetchData<ProductsData>(PRODUCTS_DATA_URL);
  const product = data.products.find(p => p.id === id) || null;
  
  if (product && product.imageUrl) {
    // Validate and fix the image URL if it doesn't exist
    const validImageUrl = await ImageMappingService.validateAndGetImage(product.imageUrl, product.id);
    if (validImageUrl !== product.imageUrl) {
      product.imageUrl = validImageUrl;
    }
  }
  
  return product;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const data = await fetchData<ProductsData>(PRODUCTS_DATA_URL);
  return data.products.filter(p => p.category === category);
}

export async function getProductsByIndustry(industry: string): Promise<Product[]> {
  const data = await fetchData<ProductsData>(PRODUCTS_DATA_URL);
  return data.products.filter(p => p.industry && p.industry.includes(industry));
}

export async function getProductsByChemistry(chemistry: string): Promise<Product[]> {
  const data = await fetchData<ProductsData>(PRODUCTS_DATA_URL);
  return data.products.filter(p => p.chemistry === chemistry);
}

export async function searchProducts(term: string): Promise<Product[]> {
  const data = await fetchData<ProductsData>(PRODUCTS_DATA_URL);
  const searchTerm = term.toLowerCase();
  
  return data.products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.id.toLowerCase().includes(searchTerm) ||
    product.shortName?.toLowerCase().includes(searchTerm) ||
    product.description?.toLowerCase().includes(searchTerm)
  );
}

export async function getProductsMetadata(): Promise<ProductsData['metadata']> {
  const data = await fetchData<ProductsData>(PRODUCTS_DATA_URL);
  return data.metadata;
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

// This would be a real API call in production
export function exportProductsData(): void {
  fetchData<ProductsData>(PRODUCTS_DATA_URL).then(data => {
    const jsonStr = JSON.stringify(data, null, 2);
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
  });
}

export function generateProductStats() {
  return fetchData<ProductsData>(PRODUCTS_DATA_URL).then(data => {
    const products = data.products;
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
  });
}
