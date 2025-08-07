import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from "@/components/dashboard/ProductList";
import ProductDetail from "@/components/dashboard/ProductDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function Dashboard() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
  };
  
  const handleBackToList = () => {
    setSelectedProductId(null);
  };

  const handleExport = () => {
    // Export functionality
    console.log("Exporting data...");
  };

  const handleSave = () => {
    // Save functionality
    console.log("Saving changes...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with Forza branding */}
      <DashboardHeader onExport={handleExport} onSave={handleSave} />

      {/* Main Content */}
      <div className="container mx-auto p-6 max-w-7xl">
        {selectedProductId ? (
          <>
            <Button 
              variant="ghost" 
              onClick={handleBackToList} 
              className="mb-6 flex gap-2 text-[#09668D] hover:bg-[#09668D] hover:text-white transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-poppins font-bold">Back to Product List</span>
            </Button>
            <ProductDetail 
              productId={selectedProductId === "new" ? undefined : selectedProductId}
              onProductDeleted={handleBackToList} 
              onProductSaved={handleBackToList}
            />
          </>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid gap-6 mb-8 md:grid-cols-3">
              <DashboardStats />
            </div>
            
            {/* Main Dashboard Content */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <Tabs defaultValue="all" className="w-full">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                  <TabsList className="bg-white border border-slate-200 shadow-sm">
                    <TabsTrigger 
                      value="all" 
                      className="font-poppins font-bold data-[state=active]:bg-[#09668D] data-[state=active]:text-white"
                    >
                      All Products
                    </TabsTrigger>
                    <TabsTrigger 
                      value="bond" 
                      className="font-poppins font-bold data-[state=active]:bg-[#F16022] data-[state=active]:text-white"
                    >
                      Bond
                    </TabsTrigger>
                    <TabsTrigger 
                      value="seal" 
                      className="font-poppins font-bold data-[state=active]:bg-[#1B3764] data-[state=active]:text-white"
                    >
                      Seal
                    </TabsTrigger>
                    <TabsTrigger 
                      value="tape" 
                      className="font-poppins font-bold data-[state=active]:bg-[#D35127] data-[state=active]:text-white"
                    >
                      Tape
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                    <Button 
                      variant="default" 
                      className="bg-[#09668D] hover:bg-[#075b7a] text-white font-poppins font-bold"
                      onClick={() => setSelectedProductId("new")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Product
                    </Button>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input 
                        placeholder="Search products..."
                        className="pl-10 w-[300px] border-slate-200 focus:border-[#09668D] focus:ring-[#09668D] font-poppins"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <TabsContent value="all" className="mt-0">
                    <ProductList 
                      category="ALL"
                      onSelectProduct={handleProductSelect} 
                      searchTerm={searchTerm}
                    />
                  </TabsContent>
                  <TabsContent value="bond" className="mt-0">
                    <ProductList 
                      category="BOND"
                      onSelectProduct={handleProductSelect} 
                      searchTerm={searchTerm}
                    />
                  </TabsContent>
                  <TabsContent value="seal" className="mt-0">
                    <ProductList 
                      category="SEAL"
                      onSelectProduct={handleProductSelect} 
                      searchTerm={searchTerm}
                    />
                  </TabsContent>
                  <TabsContent value="tape" className="mt-0">
                    <ProductList 
                      category="TAPE"
                      onSelectProduct={handleProductSelect} 
                      searchTerm={searchTerm}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
