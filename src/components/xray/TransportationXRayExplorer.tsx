import React from 'react';
import { motion } from 'framer-motion';
import RVBusOverlay from './RVBusOverlay';
import TrailerOverlay from './TrailerOverlay';

interface TransportationXRayExplorerProps {
  variant: 'rv-bus' | 'trailer';
}

const TransportationXRayExplorer: React.FC<TransportationXRayExplorerProps> = ({ variant }) => {
  return (
    <section className="pb-16 bg-white overflow-visible">
      <div className="w-full px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 
            className="text-2xl md:text-4xl font-normal text-[#1B3764] mb-4 font-poppins"
          >
            Product Application View
          </h2>
          <p 
            className="text-lg text-[#1B3764] max-w-2xl mx-auto font-normal font-poppins mb-6"
          >
            Hover over the highlighted areas to explore our comprehensive range of solutions for transportation applications.
          </p>
        </motion.div>

        {/* X-Ray Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {variant === 'rv-bus' ? <RVBusOverlay /> : <TrailerOverlay />}
        </motion.div>
      </div>
    </section>
  );
};

export default TransportationXRayExplorer;
