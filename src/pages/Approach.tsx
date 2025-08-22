import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MultiScienceTrianglesBackground from '@/components/common/MultiScienceTrianglesBackground';
import ScienceTrianglesBackground from '@/components/common/ScienceTrianglesBackground';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-16 relative">
      {/* Hero Section Background */}
      <MultiScienceTrianglesBackground 
        elements={[
          {
            variant: 'large',
            position: 'top-right',
            opacity: 0.61,
            scale: 1.2,
            delay: 0,
            blendMode: 'overlay'
          },
          {
            variant: 'small',
            position: 'bottom-left',
            opacity: 0.61,
            scale: 0.8,
            delay: 300,
            blendMode: 'overlay'
          },
          {
            variant: 'small2',
            position: 'center',
            opacity: 0.61,
            scale: 0.6,
            delay: 600,
            blendMode: 'overlay'
          }
        ]}
      />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Our Approach
        </h1>
          <div className="text-xl text-gray-600 max-w-3xl mx-auto space-y-4">
            <p className="font-semibold">
              Big‑Picture Expertise. Small‑Town Care
            </p>
            <p>
              We unleash the strength and spirit of America's Heartland to build high-performance adhesives and sealants—while delivering the kind of customer care that big companies forgot how to give.
            </p>
            <p className="font-semibold">
              Purpose‑Built Performance. Guaranteed Strength.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16 relative">
          {/* Approaches Grid Background */}
          <ScienceTrianglesBackground 
            variant="small2" 
            position="center" 
            opacity={0.61} 
            scale={1.0}
            blendMode="overlay"
          />
          
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

        <div className="text-center relative">
          {/* Bottom Section Background */}
          <ScienceTrianglesBackground 
            variant="small" 
            position="top-left" 
            opacity={0.61} 
            scale={0.9}
            blendMode="overlay"
          />
          
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