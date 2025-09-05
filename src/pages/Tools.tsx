import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Tools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B3764]/10 to-[#F16022]/5">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#1B3764] to-[#F16022] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <img 
                src="/Forza-lion-logo.png" 
                alt="ForzaBuilt Lion Logo" 
                className="w-60 h-60 object-contain"
              />
            </div>
            
            <h1 className="text-5xl md:text-5xl font-kallisto font-black text-white mb-6 leading-none">
              Professional Tools
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-poppins leading-relaxed">
              Access our comprehensive product datasheet with detailed technical specifications 
              for all ForzaBuilt adhesive, sealant, and tape products.
            </p>
          </div>
        </div>
      </section>

      {/* Product Datasheet Tool Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <Card className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden bg-white/95 backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                  <div className="relative">
                    {/* Gradient Background for Icon */}
                    <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1B3764] to-[#F16022] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 relative overflow-hidden">
                      <img 
                        src="/Forza-lion-logo.png" 
                        alt="ForzaBuilt Lion Logo"
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                    
                    {/* Decorative Line */}
                    <div className="w-24 h-1 bg-gradient-to-r from-[#F16022] to-[#D35127] mx-auto mb-4"></div>
                  </div>
                  
                  <CardTitle className="text-4xl font-kallisto font-black text-[#1B3764] mb-4 leading-tight">
                    Products Datasheet
                  </CardTitle>
                  
                  <CardDescription className="text-xl text-gray-600 font-poppins leading-relaxed max-w-2xl mx-auto">
                    Comprehensive technical specifications for all ForzaBuilt industrial adhesive, 
                    sealant, and tape products. Find detailed information about performance, 
                    applications, and specifications.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center pt-0">
                  <Link to="/product-datasheets">
                    <Button className="w-full bg-[#F2611D] hover:bg-[#F2611D]/80 text-white font-bold text-xl py-8 px-12 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-[#F2611D]">
                      Launch Products Datasheet
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-[#1B3764] to-[#F16022]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-kallisto font-black text-white mb-6">
            Need Expert Guidance?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-poppins">
            Our technical team is ready to help you find the perfect solution for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-[#F2611D]">
                Contact Our Team
              </Button>
            </Link>
            <Link to="/">
              <Button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 border border-[#F2611D]">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tools; 