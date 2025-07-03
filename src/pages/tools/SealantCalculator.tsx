import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SealantCalculator = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [jointType, setJointType] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const jointTypes = [
    { value: 'butt', label: 'Butt Joint', factor: 1.0 },
    { value: 'lap', label: 'Lap Joint', factor: 1.2 },
    { value: 'corner', label: 'Corner Joint', factor: 1.5 },
    { value: 'edge', label: 'Edge Joint', factor: 1.1 }
  ];

  const calculateSealant = () => {
    if (!length || !width || !depth || !jointType) return;

    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);
    const joint = jointTypes.find(j => j.value === jointType);

    if (joint) {
      // Basic calculation: length * width * depth * joint factor
      // This is a simplified calculation - real sealant calculations are more complex
      const volume = l * w * d * joint.factor;
      const volumeInLiters = volume / 1000; // Convert to liters
      setResult(volumeInLiters);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sealant Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate the exact amount of sealant needed for your project.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Project Dimensions</CardTitle>
              <CardDescription>
                Enter your project dimensions to calculate sealant requirements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="length">Length (mm)</Label>
                  <Input
                    id="length"
                    type="number"
                    placeholder="Enter length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="width">Width (mm)</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="Enter width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="depth">Joint Depth (mm)</Label>
                  <Input
                    id="depth"
                    type="number"
                    placeholder="Enter depth"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="jointType">Joint Type</Label>
                  <Select value={jointType} onValueChange={setJointType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select joint type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jointTypes.map((joint) => (
                        <SelectItem key={joint.value} value={joint.value}>
                          {joint.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full bg-[#F2611D] hover:bg-[#F2611D]/80"
                  onClick={calculateSealant}
                  disabled={!length || !width || !depth || !jointType}
                >
                  Calculate Sealant Required
                </Button>
              </div>

              {result !== null && (
                <Card className="mt-6 bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-green-800 mb-2">
                        Sealant Required
                      </h3>
                      <p className="text-4xl font-bold text-green-600">
                        {result.toFixed(2)} L
                      </p>
                      <p className="text-sm text-green-700 mt-2">
                        This is an estimate. Consider adding 10-15% for waste and overlap.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
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

export default SealantCalculator; 