import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StaticXRayExplorer from '../../components/xray/StaticXRayExplorer';
import { TRANSPORTATION_V2_DATA } from '../../data/industries/transportation-v2';

const TransportationV2Page: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Transportation Industry - V2 X-Ray Explorer | ForzaBuilt</title>
        <meta name="description" content="Explore transportation industry solutions with our interactive V2 X-Ray explorer featuring single SVG assets." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-[#477197] to-[#2c476e] text-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-poppins">
                Transportation Industry
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-poppins">
                V2 X-Ray Explorer - Single SVG Asset Demo
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mt-4 font-poppins">
                Experience our new streamlined X-Ray explorer using a single SVG file with embedded imagery.
              </p>
            </motion.div>
          </div>
        </section>

        {/* RV Bus X-Ray */}
        <section className="bg-gray-50 relative z-[30]">
          <StaticXRayExplorer industry={TRANSPORTATION_V2_DATA} xrayIndex={0} />
        </section>

        {/* Trailer X-Ray */}
        <section className="bg-white relative z-[30]">
          <StaticXRayExplorer industry={TRANSPORTATION_V2_DATA} xrayIndex={1} />
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B3764] mb-4 font-poppins">
                V2 Improvements
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-poppins">
                Our V2 X-Ray explorer offers enhanced performance and simplified asset management.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-[#1B3764] mb-4 font-poppins">
                  V1 (Original)
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Separate image + SVG overlay</li>
                  <li>• Layering complexity</li>
                  <li>• Multiple asset requests</li>
                  <li>• Potential alignment issues</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#F2611D]">
                <h3 className="text-xl font-bold text-[#1B3764] mb-4 font-poppins">
                  V2 (New)
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Single SVG with embedded image</li>
                  <li>• Simplified architecture</li>
                  <li>• Single asset request</li>
                  <li>• Perfect alignment guaranteed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B3764] mb-4 font-poppins">
                Technical Implementation
              </h2>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-[#1B3764] mb-4 font-poppins">
                Key Features:
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#1B3764] mb-2">Asset Management</h4>
                  <p className="text-gray-600 text-sm">
                    Single SVG file contains both the background image and interactive hotspots, 
                    eliminating the need for separate image files and complex layering.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1B3764] mb-2">Performance</h4>
                  <p className="text-gray-600 text-sm">
                    Reduced HTTP requests and simplified rendering pipeline result in faster 
                    load times and smoother interactions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1B3764] mb-2">Maintenance</h4>
                  <p className="text-gray-600 text-sm">
                    Easier to update and maintain with single source of truth for both 
                    visual and interactive elements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1B3764] mb-2">Scalability</h4>
                  <p className="text-gray-600 text-sm">
                    Simplified component architecture makes it easier to create variations 
                    and extend functionality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default TransportationV2Page;
