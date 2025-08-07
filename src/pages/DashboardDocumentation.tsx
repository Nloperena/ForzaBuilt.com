import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function DashboardDocumentation() {
  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Product Dashboard Documentation</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 mb-4">
            The Product Management Dashboard allows you to efficiently manage your product database. 
            You can view, filter, sort, edit, and export product information through an intuitive interface.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Features</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Product Listing</CardTitle>
              <CardDescription>View and manage all products in the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <h4 className="font-medium">Available Actions:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Filter products by category (BOND, SEAL, TAPE)</li>
                <li>Filter by industry or chemistry</li>
                <li>Sort by name, category, industry, and more</li>
                <li>Search for specific products</li>
                <li>View product details including images and PDF documents</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Edit comprehensive product information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <h4 className="font-medium">Editable Fields:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Basic information (name, description, etc.)</li>
                <li>Technical specifications</li>
                <li>Features and benefits</li>
                <li>Industries and categories</li>
                <li>Images and documentation</li>
                <li>Active/inactive status</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Import and export product data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <h4 className="font-medium">Available Actions:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Export all product data as JSON</li>
                <li>Save changes to individual products</li>
                <li>Add or remove product fields like benefits, sizes, etc.</li>
              </ul>
            </CardContent>
          </Card>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Usage Instructions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Navigating the Dashboard</h3>
              <p className="text-gray-700">
                The dashboard is accessible at <code>/admin/dashboard</code>. The main view shows 
                statistics about your product database and a list of all products. Use the tabs at the 
                top to filter by product category.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">Filtering and Sorting</h3>
              <p className="text-gray-700">
                Use the filter button to filter products by industry or chemistry. Click on column headers 
                to sort products. The search box allows you to find products by name or ID.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">Editing Products</h3>
              <p className="text-gray-700">
                Click the "Edit" button on any product to open the detailed editor. The editor is organized 
                into tabs for easy navigation:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li><strong>Basic Info:</strong> Edit product identity and classification</li>
                <li><strong>Technical Data:</strong> Edit specifications and properties</li>
                <li><strong>Features & Benefits:</strong> Manage benefits, sizes, and applications</li>
                <li><strong>Images & Documents:</strong> Manage product images and PDF files</li>
                <li><strong>Advanced:</strong> Set system options and manage keywords</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">Saving Changes</h3>
              <p className="text-gray-700">
                Changes are saved when you click the "Save Changes" button at the top of the product 
                detail page. All fields are automatically validated before saving.
              </p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong>Consistent Naming:</strong> Keep product names consistent by using the format 
              "ID – DESCRIPTION" (e.g., "OS2 – STRUCTURAL SEALANT").
            </li>
            <li>
              <strong>Complete Information:</strong> Fill out as many fields as possible for each product to improve 
              searchability and user experience.
            </li>
            <li>
              <strong>Image Paths:</strong> Use consistent image paths like "/product-images/product-id.png" to ensure 
              images display correctly.
            </li>
            <li>
              <strong>PDF Organization:</strong> Keep PDF links organized by using the standard format for TDS documents.
            </li>
            <li>
              <strong>Regular Backups:</strong> Export the product data regularly as a backup before making major changes.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
