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
