import { getAllProducts, getProductById } from '@/services/productService';
import { Product } from '@/types/products';

// All products (excluding cleaners)
export const getProducts = async (): Promise<Product[]> => {
  const products = await getAllProducts();
  return products.filter(p => 
    p.productType?.toLowerCase() !== 'cleaner'
  );
};

// Filter by product line (Bond/Seal/Tape) - using category field
export const byProductLine = async (line: 'bond' | 'seal' | 'tape'): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter(p => p.category?.toLowerCase() === line.toLowerCase());
};

// Filter by industry - now industry is an array, so check if any industry matches
export const byIndustry = async (industry: string): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter(p => 
    p.industry && 
    Array.isArray(p.industry) && 
    p.industry.some(ind => ind.toLowerCase() === industry.toLowerCase())
  );
};

// Filter by category (for category pages)
export const byCategory = async (category: string): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
};

export const byChemistry = async (chemistry: string): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter(p => p.chemistry?.toLowerCase() === chemistry.toLowerCase());
};

// Get single product by ID
export const getProduct = async (id: string): Promise<Product | undefined> => {
  const products = await getProducts();
  return products.find(p => p.id.toLowerCase() === id.toLowerCase());
};

// Get related products (same industry, excluding self)
export const getRelatedProducts = async (productId: string, limit: number = 4): Promise<Product[]> => {
  const product = await getProduct(productId);
  if (!product || !product.industry) return [];
  
  const products = await getProducts();
  // Find products that share any industry with the current product
  return products.filter(p => 
    p.id !== product.id && 
    p.industry && 
    Array.isArray(p.industry) &&
    product.industry &&
    Array.isArray(product.industry) &&
    p.industry.some(ind => product.industry.includes(ind))
  ).slice(0, limit);
}; 