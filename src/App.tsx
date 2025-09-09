import React, { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import '@/styles/globalStyles.css';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { GradientModeProvider } from "@/contexts/GradientModeContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import ScrollToTop from "@/components/ScrollToTop";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Industries from './pages/Industries';
import Products from './pages/Products';
import Auth from './pages/Auth';
import Contact from './pages/Contact';
import About from './pages/About';
import Approach from './pages/Approach';
import Tools from './pages/Tools';
import ProductSelector from './pages/tools/ProductSelector';
import SealantCalculator from './pages/tools/SealantCalculator';
import Compatibility from './pages/tools/Compatibility';
import IndustryPage from './pages/industries/[industry]';
import ProductCategoryPage from './pages/products/[productCategory]';
import ProductDetailPage from './pages/products/[productId]';
import RuggedRed from './pages/products/RuggedRed';
import IndustrialDatasheetPage from './pages/IndustrialDatasheetPage';
import DatasheetDemo from './pages/DatasheetDemo';
import IndustryReview from './pages/IndustryReview';
import IndustrySummary from './pages/IndustrySummary';
import ProductDatasheetsPage from './pages/ProductDatasheetsPage';
import ProductIndex from './pages/ProductIndex';
import ChemistriesPage from './pages/chemistries';
import Blog from './pages/Blog';
import BlogPostPage from './pages/blog/[slug]';
import PdfViewer from './pages/PdfViewer';
import Dashboard from './pages/Dashboard';
import Stylesheet from './pages/Stylesheet';
import Triangles from './pages/Triangles';

import { initializeProducts } from "@/utils/products";
import PerformanceMonitor from "@/components/PerformanceMonitor";

const queryClient = new QueryClient();

const App = () => {
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Defer product loading to improve initial page render
    const timer = setTimeout(() => {
      const loadProducts = async () => {
        try {
          await initializeProducts();
          setProductsLoaded(true);
        } catch (error) {
          console.error("Failed to load products:", error);
          setError(error instanceof Error ? error.message : "Failed to load products");
        }
      };
      loadProducts();
    }, 100); // Small delay to let page render first

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[#115B87] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-white text-2xl font-bold mb-2">Error Loading Products</h1>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white px-6 py-3 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!productsLoaded) {
    return (
      <div className="min-h-screen bg-[#115B87] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F2611D] mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GradientModeProvider>
            <LoadingProvider>
              <TooltipProvider>
            <PerformanceMonitor />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/products" element={<Products />} />
              <Route path="/chemistries" element={<ChemistriesPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/approach" element={<Approach />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/product-selector" element={<ProductSelector />} />
              <Route path="/tools/product-datasheets" element={<ProductDatasheetsPage />} />
              <Route path="/tools/sealant-calculator" element={<SealantCalculator />} />
              <Route path="/tools/compatibility" element={<Compatibility />} />
              <Route path="/industries/:industry" element={<IndustryPage />} />
              <Route path="/products/ruggedred" element={<RuggedRed />} />
              <Route path="/products/:productCategory" element={<ProductCategoryPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/products/:productCategory/:productId" element={<ProductDetailPage />} />
              {/* Datasheet Routes */}
              <Route path="/datasheet-demo" element={<DatasheetDemo />} />
              {/* Review Routes */}
              <Route path="/industry-review" element={<IndustryReview />} />
              <Route path="/industry-summary" element={<IndustrySummary />} />
              <Route path="/product-datasheets" element={<ProductDatasheetsPage />} />
              <Route path="/products/all" element={<ProductIndex />} />
              <Route path="/pdf-viewer/:pdfPath" element={<PdfViewer />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/stylesheet" element={<Stylesheet />} />
              <Route path="/triangles" element={<Triangles />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
              </TooltipProvider>
            </LoadingProvider>
          </GradientModeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
