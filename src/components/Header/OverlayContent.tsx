import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products as productsData } from '@/data/products';
import { industries as industriesData } from '@/data/industries';
import { tools as toolsData } from '@/data/tools';
import { AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';

interface OverlayContentProps {
  activeContent: string | null;
  slideDirection: number;
  onVideoUrlChange: (url: string | null) => void;
}

const OverlayContent: React.FC<OverlayContentProps> = ({
  activeContent,
  slideDirection,
  onVideoUrlChange,
}) => {
  const renderIndustriesContent = () => (
    <div className="flex flex-row items-start justify-center space-x-12 text-center" onMouseLeave={() => onVideoUrlChange(null)}>
      {industriesData.map(industry => (
        <Link
          key={industry.title}
          to={`/industries/${industry.title.toLowerCase().replace(/ /g, '-')}`}
          className="flex flex-col items-center w-36 text-white hover:text-[#F2611D] transition-colors duration-300 group"
          onMouseEnter={() => onVideoUrlChange(industry.videoUrl)}
        >
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            <img src={industry.logo} alt={`${industry.title} Logo`} className="max-w-full max-h-full object-contain"/>
          </div>
          <h3 className="text-xl font-semibold font-kallisto">{industry.title}</h3>
        </Link>
      ))}
    </div>
  );

  const renderProductsContent = () => (
    <div className="flex flex-row items-center justify-center space-x-8 text-center" onMouseLeave={() => onVideoUrlChange(null)}>
      {productsData.map(product => {
        let heading = '';
        if (product.name === 'Bond') {
          heading = 'INDUSTRIAL ADHESIVES';
        } else if (product.name === 'Seal') {
          heading = 'INDUSTRIAL SEALANTS';
        } else if (product.name === 'Tape') {
          heading = 'INDUSTRIAL TAPES';
        } else if (product.name === 'RuggedRed') {
          heading = 'INDUSTRIAL CLEANING';
        }
        const words = heading.split(' ');
        return (
          <Link
            key={product.name}
            to={`/products/${product.name.toLowerCase()}`}
            className="flex flex-col items-center w-48 text-white hover:text-[#F2611D] transition-colors duration-300 group"
            onMouseEnter={() => onVideoUrlChange(product.videoUrl)}
          >
            <div className="w-40 h-24 flex items-center justify-center">
              <img src={product.hoverImage} alt={`${product.name} Logo`} className="max-w-full max-h-full object-contain"/>
            </div>
            <h3 className="text-xl font-semibold text-center font-kallisto">
              {words.map((word, index) => (
                <div key={index}>{word}</div>
              ))}
            </h3>
          </Link>
        );
      })}
    </div>
  );

  const renderToolsContent = () => (
    <div className="flex flex-row items-start justify-center space-x-12 text-center" onMouseLeave={() => onVideoUrlChange(null)}>
      {toolsData.map(tool => (
        <Link
          key={tool.name}
          to={tool.href}
          className="flex flex-col items-center w-36 text-white hover:text-[#F2611D] transition-colors duration-300 group"
          onMouseEnter={() => onVideoUrlChange(tool.videoUrl)}
        >
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: tool.color }}
            >
              <FileText className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-semibold font-kallisto">{tool.title}</h3>
        </Link>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeContent) {
      case 'industries':
        return renderIndustriesContent();
      case 'products':
        return renderProductsContent();
      case 'tools':
        return renderToolsContent();
      default:
        return null;
    }
  };

  return (
    <AnimatePresence initial={false} custom={slideDirection}>
      <motion.div
        key={activeContent}
        custom={slideDirection}
        initial="enter"
        animate="center"
        exit="exit"
        variants={{
          enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
          center: { x: 0, opacity: 1 },
          exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
        }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
        className="absolute"
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
};

export default OverlayContent; 