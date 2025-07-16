export interface ScrapedProduct {
  id: string;
  url: string;
  scrapedAt: string;
  title: string;
  description: string;
  content: {
    overview: string;
    specifications: string;
    features: string;
    applications: string;
    technicalData: string;
  };
  images: string[];
  mainImage: string;
  meta: {
    keywords: string;
    description: string;
  };
}

// Function to load scraped product data
export const loadScrapedProduct = async (productId: string): Promise<ScrapedProduct | null> => {
  try {
    // Try to load individual product file
    const response = await fetch(`/src/data/scrapedProducts/${productId}.json`);
    if (response.ok) {
      return await response.json();
    }
    
    // Fallback to combined file
    const combinedResponse = await fetch('/src/data/scrapedProducts/allProducts.json');
    if (combinedResponse.ok) {
      const allProducts: ScrapedProduct[] = await combinedResponse.json();
      return allProducts.find(p => p.id === productId) || null;
    }
    
    return null;
  } catch (error) {
    console.error(`Error loading scraped product ${productId}:`, error);
    return null;
  }
};

// Function to load all scraped products
export const loadAllScrapedProducts = async (): Promise<ScrapedProduct[]> => {
  try {
    const response = await fetch('/src/data/scrapedProducts/allProducts.json');
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Error loading all scraped products:', error);
    return [];
  }
};

// Mock data for development (when scraping hasn't been run yet)
export const getMockProductData = (productId: string): ScrapedProduct => {
  return {
    id: productId,
    url: `https://forzabuilt.com/product/${productId}/`,
    scrapedAt: new Date().toISOString(),
    title: `Product ${productId}`,
    description: 'This is a placeholder description for the product. The actual content will be loaded from the scraped data.',
    content: {
      overview: '<p>This is placeholder content for the product overview. The actual content will be loaded from the scraped data.</p>',
      specifications: 'Product specifications will be loaded from scraped data.',
      features: 'Product features will be loaded from scraped data.',
      applications: 'Product applications will be loaded from scraped data.',
      technicalData: 'Technical data will be loaded from scraped data.'
    },
    images: [],
    mainImage: '',
    meta: {
      keywords: '',
      description: ''
    }
  };
}; 