import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ChevronRight,
  FileText,
  ImageIcon,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { getProductById, saveProduct, deleteProduct } from "@/services/productService";
import { Product } from "@/types/products";
import ImageUpload from "./ImageUpload";

const INDUSTRIES = [
  "construction",
  "composites",
  "marine",
  "transportation",
  "insulation",
  "aerospace",
  "industrial"
];

const CHEMISTRIES = [
  "Solvent Base",
  "Water Base",
  "Hot Melt",
  "Acrylic",
  "Silicone",
  "Epoxy",
  "Polyurethane"
];

const TECHNICAL_DATA_FIELDS = [
  "appearance",
  "shelfLife",
  "solids",
  "solvent",
  "voc",
  "viscosity",
  "density",
  "pH",
  "color",
  "odor",
  "storageConditions",
  "temperatureRange",
  "adhesiveType",
  "foamType",
  "peelStrength",
  "shearStrength"
];

interface ProductDetailProps {
  productId: string | undefined;
  onProductDeleted: () => void;
  onProductSaved: () => void;
}

export default function ProductDetail({ productId, onProductDeleted, onProductSaved }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newBenefit, setNewBenefit] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        if (productId) {
          const productData = await getProductById(productId);
          if (productData) {
            setProduct(productData);
          } else {
            setProduct(null); // Product not found
          }
        } else {
          // Initialize for new product
          setProduct({
            id: `new-${Date.now()}`,
            name: "",
            shortName: "",
            description: "",
            category: "BOND", // Default category
            industry: [],
            chemistry: "",
            productType: "",
            technicalData: {},
            applications: "",
            benefits: [],
            sizes: [],
            imageUrl: "",
            pdfLinks: [],
            standardTdsLink: "",
            hasTdsLink: false,
            searchKeywords: [],
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: 1,
          });
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [productId]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!product?.name) newErrors.name = "Product Name is required.";
    if (!product?.category) newErrors.category = "Category is required.";
    if (!product?.id) newErrors.id = "Product ID is required.";
    // Add more validation rules as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }

    setSaving(true);
    
    try {
      if (product) {
        const savedProduct = await saveProduct(product);
        console.log("Product saved:", savedProduct);
        alert("Changes saved successfully!");
        onProductSaved();
      }
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof Product, value: any) => {
    if (!product) return;
    
    setProduct({
      ...product,
      [field]: value
    });
  };

  const handleTechnicalDataChange = (field: string, value: string) => {
    if (!product) return;
    
    setProduct({
      ...product,
      technicalData: {
        ...product.technicalData,
        [field]: value
      }
    });
  };

  const addBenefit = () => {
    if (!newBenefit.trim() || !product) return;
    
    setProduct({
      ...product,
      benefits: [...(product.benefits || []), newBenefit.trim()]
    });
    setNewBenefit("");
  };

  const removeBenefit = (index: number) => {
    if (!product) return;
    
    const newBenefits = [...product.benefits];
    newBenefits.splice(index, 1);
    
    setProduct({
      ...product,
      benefits: newBenefits
    });
  };

  const addSize = () => {
    if (!newSize.trim() || !product) return;
    
    setProduct({
      ...product,
      sizes: [...(product.sizes || []), newSize.trim()]
    });
    setNewSize("");
  };

  const removeSize = (index: number) => {
    if (!product) return;
    
    const newSizes = [...product.sizes];
    newSizes.splice(index, 1);
    
    setProduct({
      ...product,
      sizes: newSizes
    });
  };

  const addIndustry = () => {
    if (!newIndustry || !product) return;
    if (product.industry.includes(newIndustry)) return;
    
    setProduct({
      ...product,
      industry: [...(product.industry || []), newIndustry]
    });
    setNewIndustry("");
  };

  const removeIndustry = (industry: string) => {
    if (!product) return;
    
    setProduct({
      ...product,
      industry: product.industry.filter(i => i !== industry)
    });
  };

  const addPdfLink = (link: string) => {
    if (!link || !product) return;
    
    setProduct({
      ...product,
      pdfLinks: [...(product.pdfLinks || []), link],
      hasTdsLink: true
    });
  };

  const removePdfLink = (index: number) => {
    if (!product) return;
    
    const newLinks = [...product.pdfLinks];
    newLinks.splice(index, 1);
    
    setProduct({
      ...product,
      pdfLinks: newLinks,
      hasTdsLink: newLinks.length > 0
    });
  };

  const handleDeleteProduct = async () => {
    if (!product) return;

    try {
      const success = await deleteProduct(product.id);
      if (success) {
        alert("Product deleted successfully!");
        onProductDeleted(); // Callback to parent to update product list
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading product data...</div>;
  }

  if (!product) {
    return <div className="flex items-center justify-center h-64">Product not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{product.shortName || product.id}</h2>
          <p className="text-gray-500">{product.name}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="active-status">Active</Label>
            <Switch
              id="active-status"
              checked={product.isActive !== false}
              onCheckedChange={checked => handleInputChange('isActive', checked)}
            />
          </div>
          
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
            <Save className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="basic">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="technical">Technical Data</TabsTrigger>
          <TabsTrigger value="features">Features & Benefits</TabsTrigger>
          <TabsTrigger value="media">Images & Documents</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Identity</CardTitle>
                <CardDescription>Basic product information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="id">Product ID</Label>
                  <Input
                    id="id"
                    value={product.id}
                    onChange={e => handleInputChange('id', e.target.value)}
                    disabled={!!productId} // Disable if editing existing product
                    className={errors.id ? "border-red-500" : ""}
                  />
                  {errors.id && <p className="text-red-500 text-sm">{errors.id}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shortName">Short Name</Label>
                  <Input
                    id="shortName"
                    value={product.shortName || ''}
                    onChange={e => handleInputChange('shortName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Full Product Name</Label>
                  <Input
                    id="name"
                    value={product.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={product.description || ''}
                    onChange={e => handleInputChange('description', e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Classification</CardTitle>
                <CardDescription>Product categorization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={product.category}
                    onValueChange={value => handleInputChange('category', value)}
                  >
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BOND">BOND</SelectItem>
                      <SelectItem value="SEAL">SEAL</SelectItem>
                      <SelectItem value="TAPE">TAPE</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="productType">Product Type</Label>
                  <Input
                    id="productType"
                    value={product.productType || ''}
                    onChange={e => handleInputChange('productType', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="chemistry">Chemistry</Label>
                  <Select
                    value={product.chemistry || ''}
                    onValueChange={value => handleInputChange('chemistry', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select chemistry" />
                    </SelectTrigger>
                    <SelectContent>
                      {CHEMISTRIES.map(chemistry => (
                        <SelectItem key={chemistry} value={chemistry}>
                          {chemistry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Industries</Label>
                    <div className="flex items-center gap-2">
                      <Select
                        value={newIndustry}
                        onValueChange={setNewIndustry}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map(industry => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={addIndustry}
                        disabled={!newIndustry}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.industry && product.industry.map(industry => (
                      <Badge 
                        key={industry} 
                        className="capitalize flex items-center gap-1"
                      >
                        {industry}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeIndustry(industry)}
                        />
                      </Badge>
                    ))}
                    {(!product.industry || product.industry.length === 0) && (
                      <div className="text-sm text-muted-foreground">No industries selected</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="technical" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Technical Data</CardTitle>
              <CardDescription>Product specifications and properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {TECHNICAL_DATA_FIELDS.map(field => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={`tech-${field}`} className="capitalize">
                      {field.replace(/([A-Z])/g, ' $1')}
                    </Label>
                    <Input
                      id={`tech-${field}`}
                      value={product.technicalData?.[field] || ''}
                      onChange={e => handleTechnicalDataChange(field, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
                <CardDescription>Product key advantages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Input
                    placeholder="Add new benefit"
                    value={newBenefit}
                    onChange={e => setNewBenefit(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addBenefit()}
                  />
                  <Button 
                    variant="outline" 
                    onClick={addBenefit}
                    disabled={!newBenefit.trim()}
                  >
                    Add
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {product.benefits && product.benefits.length > 0 ? (
                    product.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 mt-0.5 text-muted-foreground" />
                          <span>{benefit}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBenefit(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-4">
                      No benefits added yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Available Sizes</CardTitle>
                <CardDescription>Size options for this product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Input
                    placeholder="Add new size (e.g. 55 Gallon Drum)"
                    value={newSize}
                    onChange={e => setNewSize(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addSize()}
                  />
                  <Button 
                    variant="outline" 
                    onClick={addSize}
                    disabled={!newSize.trim()}
                  >
                    Add
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {product.sizes && product.sizes.length > 0 ? (
                    product.sizes.map((size, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <span>{size}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSize(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-4">
                      No sizes added yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Applications</CardTitle>
                <CardDescription>Product usage information</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe how this product is used..."
                  value={product.applications || ''}
                  onChange={e => handleInputChange('applications', e.target.value)}
                  className="min-h-[150px]"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="media" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
                <CardDescription>Upload or select an image for this product</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  currentImageUrl={product.imageUrl}
                  onImageChange={(imageUrl) => handleInputChange('imageUrl', imageUrl)}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>PDF Documents</CardTitle>
                <CardDescription>Technical datasheets and documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Standard TDS Link</Label>
                    <Input
                      value={product.standardTdsLink || ''}
                      onChange={e => handleInputChange('standardTdsLink', e.target.value)}
                      placeholder="/TDS/Category/Product/TDS/filename.pdf"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>PDF Links</Label>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-1" /> Add PDF
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add PDF Document</DialogTitle>
                            <DialogDescription>
                              Enter the link to a PDF document for this product
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <Input placeholder="/TDS/path/to/document.pdf" />
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Browse Files</Button>
                            <Button>Add PDF</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <div className="space-y-2">
                      {product.pdfLinks && product.pdfLinks.length > 0 ? (
                        product.pdfLinks.map((link, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <FileText className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                              <span className="truncate max-w-[350px]">{link}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => removePdfLink(index)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-muted-foreground py-4">
                          No PDF documents added yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>System and developer options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">TDS Link Availability</div>
                  <div className="text-sm text-muted-foreground">
                    Marks whether this product has technical datasheets available
                  </div>
                </div>
                <Switch
                  checked={product.hasTdsLink}
                  onCheckedChange={checked => handleInputChange('hasTdsLink', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="searchKeywords">Search Keywords</Label>
                <Textarea
                  id="searchKeywords"
                  placeholder="Enter comma-separated keywords for improved searchability"
                  value={(product.searchKeywords || []).join(", ")}
                  onChange={e => handleInputChange('searchKeywords', e.target.value.split(",").map(k => k.trim()))}
                />
                <p className="text-sm text-muted-foreground">
                  Keywords help users find this product more easily
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="text-xs text-muted-foreground">
                Created: {new Date(product.createdAt).toLocaleString()}<br />
                Updated: {new Date(product.updatedAt).toLocaleString()}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    Delete Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete the product.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => { /* Close dialog */ }}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDeleteProduct}>Delete</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
