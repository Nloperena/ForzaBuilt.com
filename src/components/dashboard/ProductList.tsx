import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ExternalLink,
  Filter,
  X,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

import { getAllProducts } from "@/services/productService";
import { Product } from "@/types/products";

type SortField = "name" | "category" | "industry" | "chemistry";
type SortDirection = "asc" | "desc";

interface ProductListProps {
  category: "ALL" | "BOND" | "SEAL" | "TAPE";
  onSelectProduct: (productId: string) => void;
  searchTerm: string;
}

export default function ProductList({ category, onSelectProduct, searchTerm }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [selectedChemistries, setSelectedChemistries] = useState<string[]>([]);
  const [chemistries, setChemistries] = useState<string[]>([]);
  const [showActive, setShowActive] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);

        const uniqueIndustries = new Set<string>();
        const uniqueChemistries = new Set<string>();

        allProducts.forEach((product) => {
          if (product.industry && Array.isArray(product.industry)) {
            product.industry.forEach(ind => uniqueIndustries.add(ind));
          }
          if (product.chemistry) {
            uniqueChemistries.add(product.chemistry);
          }
        });

        setIndustries(Array.from(uniqueIndustries).sort());
        setChemistries(Array.from(uniqueChemistries).sort());
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };
    
    loadProducts();
  }, []);

  useEffect(() => {
    // Filter and sort products
    let filtered = [...products];
    
    // Filter by category
    if (category !== "ALL") {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by selected industries
    if (selectedIndustries.length > 0) {
      filtered = filtered.filter(product =>
        product.industry && product.industry.some(ind => selectedIndustries.includes(ind))
      );
    }
    
    // Filter by selected chemistries
    if (selectedChemistries.length > 0) {
      filtered = filtered.filter(product =>
        selectedChemistries.includes(product.chemistry)
      );
    }
    
    // Filter by active status
    filtered = filtered.filter(product => product.isActive === showActive);
    
    // Sort products
    filtered.sort((a, b) => {
      let aValue: string;
      let bValue: string;
      
      switch (sortField) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "category":
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case "industry":
          aValue = a.industry ? a.industry.join(", ").toLowerCase() : "";
          bValue = b.industry ? b.industry.join(", ").toLowerCase() : "";
          break;
        case "chemistry":
          aValue = a.chemistry.toLowerCase();
          bValue = b.chemistry.toLowerCase();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
    
    setFilteredProducts(filtered);
  }, [products, category, searchTerm, selectedIndustries, selectedChemistries, showActive, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  const toggleChemistry = (chemistry: string) => {
    setSelectedChemistries(prev =>
      prev.includes(chemistry)
        ? prev.filter(c => c !== chemistry)
        : [...prev, chemistry]
    );
  };

  const clearFilters = () => {
    setSelectedIndustries([]);
    setSelectedChemistries([]);
    setShowActive(true);
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1" />
    );
  };

  const renderImagePreview = (imageUrl: string, name: string) => {
    return (
      <Button
        variant="ghost"
        className="p-0 h-10 w-10 rounded-lg overflow-hidden border border-slate-200 hover:border-[#09668D] transition-all duration-200"
        onClick={() => onSelectProduct(name)}
      >
        <img
          src={imageUrl}
          alt={name}
          className="h-10 w-10 object-contain bg-white"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </Button>
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "BOND":
        return "bg-gradient-to-r from-[#F16022] to-[#D35127] text-white";
      case "SEAL":
        return "bg-gradient-to-r from-[#1B3764] to-[#09668D] text-white";
      case "TAPE":
        return "bg-gradient-to-r from-[#D35127] to-[#F16022] text-white";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-kallisto font-heavy text-[#09668D]">Filters</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-slate-600 hover:text-[#09668D] border-slate-200 hover:border-[#09668D]"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Industry Filter */}
          <div>
            <label className="text-sm font-poppins font-bold text-slate-700 mb-2 block">
              Industry
            </label>
            <ScrollArea className="h-32 border border-slate-200 rounded-md p-2">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center space-x-2 py-1">
                  <Checkbox
                    id={industry}
                    checked={selectedIndustries.includes(industry)}
                    onCheckedChange={() => toggleIndustry(industry)}
                    className="border-slate-300 data-[state=checked]:bg-[#09668D] data-[state=checked]:border-[#09668D]"
                  />
                  <label
                    htmlFor={industry}
                    className="text-sm font-poppins text-slate-700 cursor-pointer"
                  >
                    {industry}
                  </label>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Chemistry Filter */}
          <div>
            <label className="text-sm font-poppins font-bold text-slate-700 mb-2 block">
              Chemistry
            </label>
            <ScrollArea className="h-32 border border-slate-200 rounded-md p-2">
              {chemistries.map((chemistry) => (
                <div key={chemistry} className="flex items-center space-x-2 py-1">
                  <Checkbox
                    id={chemistry}
                    checked={selectedChemistries.includes(chemistry)}
                    onCheckedChange={() => toggleChemistry(chemistry)}
                    className="border-slate-300 data-[state=checked]:bg-[#09668D] data-[state=checked]:border-[#09668D]"
                  />
                  <label
                    htmlFor={chemistry}
                    className="text-sm font-poppins text-slate-700 cursor-pointer"
                  >
                    {chemistry}
                  </label>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-sm font-poppins font-bold text-slate-700 mb-2 block">
              Status
            </label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="active"
                  checked={showActive}
                  onCheckedChange={() => setShowActive(true)}
                  className="border-slate-300 data-[state=checked]:bg-[#09668D] data-[state=checked]:border-[#09668D]"
                />
                <label
                  htmlFor="active"
                  className="text-sm font-poppins text-slate-700 cursor-pointer"
                >
                  Active Products
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inactive"
                  checked={!showActive}
                  onCheckedChange={() => setShowActive(false)}
                  className="border-slate-300 data-[state=checked]:bg-[#09668D] data-[state=checked]:border-[#09668D]"
                />
                <label
                  htmlFor="inactive"
                  className="text-sm font-poppins text-slate-700 cursor-pointer"
                >
                  Inactive Products
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-poppins text-slate-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
        <Badge variant="secondary" className="bg-[#09668D] text-white font-poppins font-bold">
          {category === "ALL" ? "All Categories" : category}
        </Badge>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-gradient-to-r from-slate-50 to-blue-50">
            <TableRow className="border-slate-200">
              <TableHead className="font-poppins font-bold text-slate-700">Image</TableHead>
              <TableHead 
                className="font-poppins font-bold text-slate-700 cursor-pointer hover:text-[#09668D] transition-colors"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Product Name
                  {renderSortIcon("name")}
                </div>
              </TableHead>
              <TableHead 
                className="font-poppins font-bold text-slate-700 cursor-pointer hover:text-[#09668D] transition-colors"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Category
                  {renderSortIcon("category")}
                </div>
              </TableHead>
              <TableHead 
                className="font-poppins font-bold text-slate-700 cursor-pointer hover:text-[#09668D] transition-colors"
                onClick={() => handleSort("industry")}
              >
                <div className="flex items-center">
                  Industry
                  {renderSortIcon("industry")}
                </div>
              </TableHead>
              <TableHead 
                className="font-poppins font-bold text-slate-700 cursor-pointer hover:text-[#09668D] transition-colors"
                onClick={() => handleSort("chemistry")}
              >
                <div className="flex items-center">
                  Chemistry
                  {renderSortIcon("chemistry")}
                </div>
              </TableHead>
              <TableHead className="font-poppins font-bold text-slate-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-slate-50 transition-colors">
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  {renderImagePreview(product.imageUrl, product.name)}
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div>
                    <div className="font-poppins font-bold text-slate-900">{product.name}</div>
                    <div className="text-sm font-poppins text-slate-500">{product.shortName}</div>
                  </div>
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <Badge className={`${getCategoryColor(product.category)} font-poppins font-bold`}>
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div className="flex flex-wrap gap-1">
                    {product.industry?.slice(0, 2).map((ind, index) => (
                      <Badge key={index} variant="outline" className="text-xs font-poppins">
                        {ind}
                      </Badge>
                    ))}
                    {product.industry && product.industry.length > 2 && (
                      <Badge variant="outline" className="text-xs font-poppins">
                        +{product.industry.length - 2} more
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <span className="font-poppins text-slate-700">{product.chemistry}</span>
                </TableCell>
                <TableCell className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectProduct(product.id)}
                      className="text-[#09668D] hover:bg-[#09668D] hover:text-white transition-all duration-200"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-[#09668D]">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="font-poppins">
                        <DropdownMenuItem className="text-[#09668D] hover:bg-[#09668D] hover:text-white">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[#F16022] hover:bg-[#F16022] hover:text-white">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View PDFs
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
