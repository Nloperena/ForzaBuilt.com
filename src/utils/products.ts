import { getAllProducts, getProductById } from '@/services/productService';
import { Product } from '@/types/products';

let products: Product[] = [];

export async function initializeProducts() {
  products = await getAllProducts();
}

// Call initializeProducts once during application startup, e.g., in App.tsx or main.tsx
// For now, we'll keep the synchronous access methods, assuming products are loaded upfront.
// In a real application, these would also be async or use a state management solution.

// All products (excluding cleaners)
export const getProducts = (): Product[] => {
  return products.filter(p => 
    p.productType?.toLowerCase() !== 'cleaner'
  );
};

// Filter by product line (Bond/Seal/Tape) - using category field
export const byProductLine = (line: 'bond' | 'seal' | 'tape'): Product[] =>
  getProducts().filter(p => p.category?.toLowerCase() === line.toLowerCase());

export const bondProducts = byProductLine('bond');
export const sealProducts = byProductLine('seal'); 
export const tapeProducts = byProductLine('tape');

// Filter by industry - now industry is an array, so check if any industry matches
export const byIndustry = (industry: string): Product[] =>
  getProducts().filter(p => 
    p.industry && 
    Array.isArray(p.industry) && 
    p.industry.some(ind => ind.toLowerCase() === industry.toLowerCase())
  );

// Filter by category (for category pages)
export const byCategory = (category: string): Product[] =>
  getProducts().filter(p => p.category?.toLowerCase() === category.toLowerCase());

export const byChemistry = (chemistry: string): Product[] =>
  getProducts().filter(p => p.chemistry?.toLowerCase() === chemistry.toLowerCase());

// Get single product by ID
export const getProduct = (id: string): Product | undefined =>
  getProducts().find(p => p.id.toLowerCase() === id.toLowerCase());

// Get related products (same industry, excluding self)
export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const product = getProduct(productId);
  if (!product || !product.industry) return [];
  
  // Find products that share any industry with the current product
  return getProducts().filter(p => 
    p.id !== product.id && 
    p.industry && 
    Array.isArray(p.industry) &&
    product.industry &&
    Array.isArray(product.industry) &&
    p.industry.some(ind => product.industry.includes(ind))
  ).slice(0, limit);
}; 