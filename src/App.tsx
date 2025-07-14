import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
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
import IndustrialDatasheetPage from './pages/IndustrialDatasheetPage';
import DatasheetDemo from './pages/DatasheetDemo';
import IndustryReview from './pages/IndustryReview';
import IndustrySummary from './pages/IndustrySummary';
import ProductDatasheetsPage from './pages/ProductDatasheetsPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/products" element={<Products />} />
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
            <Route path="/products/:productCategory" element={<ProductCategoryPage />} />
            {/* Datasheet Routes */}
            <Route path="/datasheet-demo" element={<DatasheetDemo />} />
            {/* Review Routes */}
            <Route path="/industry-review" element={<IndustryReview />} />
            <Route path="/industry-summary" element={<IndustrySummary />} />
            <Route path="/product-datasheets" element={<ProductDatasheetsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
