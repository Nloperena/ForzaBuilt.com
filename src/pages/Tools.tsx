import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Tools = () => {
  const tools = [
    {
      name: 'Product Selector',
      description: 'Find the perfect product for your specific application and requirements.',
      href: '/tools/product-selector',
      icon: '🔍'
    },
    {
      name: 'Sealant Calculator',
      description: 'Calculate the exact amount of sealant needed for your project.',
      href: '/tools/sealant-calculator',
      icon: '🧮'
    },
    {
      name: 'Product Compatibility Tool',
      description: 'Check compatibility between different products and materials.',
      href: '/tools/compatibility',
      icon: '🔗'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Professional Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our suite of professional tools designed to help you make informed decisions 
            and optimize your projects with Forza products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <Card key={tool.name} className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <CardTitle className="text-2xl">{tool.name}</CardTitle>
                <CardDescription className="text-base">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to={tool.href}>
                  <Button className="w-full bg-[#F2611D] hover:bg-[#F2611D]/80">
                    Launch Tool
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/">
            <Button variant="outline" className="text-lg px-8 py-3">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tools; 