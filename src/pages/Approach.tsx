import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EdgeTrianglesBackground from '@/components/common/EdgeTrianglesBackground';

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
    <div className="min-h-screen bg-[#115B87] pt-24 pb-16 relative">
      {/* Orange to Blue Gradient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_top_right,rgba(242,97,29,0.8)_0%,rgba(242,97,29,0.7)_25%,rgba(242,97,29,0.5)_45%,rgba(242,97,29,0.3)_65%,rgba(242,97,29,0.15)_80%,rgba(242,97,29,0.05)_90%,transparent_100%)] md:bg-[radial-gradient(ellipse_1800px_1200px_at_top_right,rgba(242,97,29,0.8)_0%,rgba(242,97,29,0.7)_25%,rgba(242,97,29,0.5)_45%,rgba(242,97,29,0.3)_65%,rgba(242,97,29,0.15)_80%,rgba(242,97,29,0.05)_90%,transparent_100%)]"
          style={{ opacity: 1 }}
        />
      </div>
      
      {/* Edge triangles positioned at left and right viewport edges */}
      <EdgeTrianglesBackground 
        leftImage="/Gradients and Triangles/Small Science Triangles 2.png"
        rightImage="/Gradients and Triangles/Small Science Triangles.png"
        opacity={0.6}
        scale={1.1}
        leftRotation={280}
        rightRotation={280}
        leftFlipH={false}
        rightFlipV={false}
        blendMode="overlay"
      />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 relative z-10">
                  <h1 className="text-4xl font-bold text-white mb-6">
          Our Approach
        </h1>
          <div className="text-xl text-white/90 max-w-3xl mx-auto space-y-4">
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