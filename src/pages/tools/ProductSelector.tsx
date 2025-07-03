import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const ProductSelector = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedApplication, setSelectedApplication] = useState('');
  const [environmentalFactors, setEnvironmentalFactors] = useState<string[]>([]);

  const industries = [
    'Construction',
    'Manufacturing',
    'Automotive',
    'Aerospace',
    'Marine',
    'Electronics'
  ];

  const applications = [
    'Sealing',
    'Bonding',
    'Coating',
    'Adhesive',
    'Protection'
  ];

  const environmentalOptions = [
    'High Temperature',
    'Low Temperature',
    'UV Exposure',
    'Chemical Resistance',
    'Water Resistance',
    'Outdoor Use'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Selector
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect Forza product for your specific application and requirements.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Project Requirements</CardTitle>
              <CardDescription>
                Tell us about your project to get personalized product recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="application">Application Type</Label>
                  <Select value={selectedApplication} onValueChange={setSelectedApplication}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select application type" />
                    </SelectTrigger>
                    <SelectContent>
                      {applications.map((app) => (
                        <SelectItem key={app} value={app}>
                          {app}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Environmental Factors</Label>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  {environmentalOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={environmentalFactors.includes(option)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setEnvironmentalFactors([...environmentalFactors, option]);
                          } else {
                            setEnvironmentalFactors(environmentalFactors.filter(f => f !== option));
                          }
                        }}
                      />
                      <Label htmlFor={option} className="text-sm font-normal">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full bg-[#F2611D] hover:bg-[#F2611D]/80"
                  disabled={!selectedIndustry || !selectedApplication}
                >
                  Find Products
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link to="/tools">
              <Button variant="outline" className="mr-4">
                ← Back to Tools
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline">
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelector; 