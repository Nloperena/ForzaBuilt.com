import productsData from '@/data/productsMerged.json';

export type Product = typeof productsData[number];

// All products (excluding cleaners)
export const products: Product[] = productsData.filter(p => 
  p.productLine?.toLowerCase() !== 'cleaner'
);

// Filter by product line (Bond/Seal/Tape)
export const byProductLine = (line: 'bond' | 'seal' | 'tape') =>
  products.filter(p => p.productLine?.toLowerCase() === line.toLowerCase());

export const bondProducts = byProductLine('bond');
export const sealProducts = byProductLine('seal'); 
export const tapeProducts = byProductLine('tape');

// Filter by industry
export const byIndustry = (industry: string) =>
  products.filter(p => p.industry?.toLowerCase() === industry.toLowerCase());

// Filter by category (for category pages)
export const byCategory = (category: string) =>
  products.filter(p => p.category?.toLowerCase() === category.toLowerCase());

export const byChemistry = (chemistry: string) =>
  products.filter(p => p.chemistry?.toLowerCase() === chemistry.toLowerCase());

// Get single product by ID
export const getProduct = (id: string): Product | undefined =>
  products.find(p => p.id.toLowerCase() === id.toLowerCase());

// Get related products (same industry, excluding self)
export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const product = getProduct(productId);
  if (!product || !product.industry) return [];
  return products.filter(p => p.industry === product.industry && p.id !== product.id).slice(0, limit);
}; 