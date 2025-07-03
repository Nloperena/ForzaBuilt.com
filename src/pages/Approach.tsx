import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Approach = () => {
  const approaches = [
    {
      title: 'Innovation First',
      description: 'We leverage cutting-edge technology and research to develop solutions that meet the evolving needs of modern industries.',
      icon: '🚀'
    },
    {
      title: 'Quality Assurance',
      description: 'Every product undergoes rigorous testing and quality control to ensure it meets our high standards and your requirements.',
      icon: '✅'
    },
    {
      title: 'Customer Partnership',
      description: 'We work closely with our customers to understand their unique challenges and develop tailored solutions.',
      icon: '🤝'
    },
    {
      title: 'Sustainability',
      description: 'Our approach prioritizes environmental responsibility and sustainable manufacturing practices.',
      icon: '🌱'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Our Approach
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At Forza, we believe in delivering exceptional value through innovative solutions, 
            quality craftsmanship, and unwavering commitment to our customers' success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {approaches.map((approach) => (
            <Card key={approach.title} className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{approach.icon}</div>
                <CardTitle className="text-2xl">{approach.title}</CardTitle>
                <CardDescription className="text-base">
                  {approach.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center">
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

export default Approach; 