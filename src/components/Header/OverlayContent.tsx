import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProducts } from '@/utils/products';
import { industries as industriesData } from '@/data/industries';
import { tools as toolsData } from '@/data/tools';
import { AnimatePresence } from 'framer-motion';
import { useGradientMode } from '@/contexts/GradientModeContext';
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
  const productsData = getProducts();
  const { mode } = useGradientMode();
  const linkTextClass = mode === 'light' || mode === 'light2' ? 'text-[#1B3764]' : 'text-white';
  const linkTextStyle = { color: mode === 'light' || mode === 'light2' ? '#1B3764' : 'white' } as React.CSSProperties;
  
  const renderIndustriesContent = () => (
    <div className="group/menu flex flex-row items-start justify-center space-x-12 text-center" onMouseLeave={() => onVideoUrlChange(null)}>
      {industriesData.map(industry => (
        <Link
          key={industry.title}
          to={`/industries/${industry.title.toLowerCase().replace(/ /g, '-')}`}
          className={`group/item flex flex-col items-center w-36 ${linkTextClass} hover:text-[#F2611D] transform transition-all duration-300 group-hover/menu:scale-90 hover:!scale-100`}
          style={linkTextStyle}
          onMouseEnter={() => onVideoUrlChange(industry.videoUrl)}
        >
          <div className="relative w-24 h-24 flex items-center justify-center mb-4 will-change-transform">
            <img src={industry.logo} alt={`${industry.title} Logo`} className="max-w-full max-h-full object-contain transform transition-transform duration-300 group-hover/item:scale-110"/>
            <div className="pointer-events-none absolute inset-x-4 bottom-1 h-2 rounded-full bg-[#F2611D] opacity-0 blur-md transition-all duration-300 group-hover/item:opacity-70 group-hover/item:scale-110"></div>
          </div>
          <h3 className={`text-xl font-semibold font-kallisto transition-colors duration-300 ${
            mode === 'light' || mode === 'light2' ? 'group-hover/item:text-white' : ''
          }`}>{industry.title}</h3>
        </Link>
      ))}
    </div>
  );

  const renderProductsContent = () => (
    <div className="group/menu flex flex-row items-center justify-center space-x-8 text-center" onMouseLeave={() => onVideoUrlChange(null)}>
      {/* Show main product categories instead of individual products */}
      <Link
        to="/products/bond"
        className={`group/item flex flex-col items-center w-48 ${linkTextClass} hover:text-[#F2611D] transform transition-all duration-300 group-hover/menu:scale-90 hover:!scale-100`}
        style={linkTextStyle}
        onMouseEnter={() => onVideoUrlChange('https://forzabuilt.com/wp-content/uploads/2024/02/Automotive-v2.mp4')}
      >
        <div className="relative w-40 h-24 flex items-center justify-center will-change-transform">
          <img 
            src={mode === 'light' || mode === 'light2' ? '/forza-bond-mb-color.svg' : '/products/brand-logos/product-line-brands-white-bond.svg'} 
            alt="Industrial Adhesives Logo" 
            className="max-w-full max-h-full object-contain transform transition-transform duration-300 group-hover/item:scale-110"
          />
          <div className="pointer-events-none absolute inset-x-6 bottom-1 h-2 rounded-full bg-[#F2611D] opacity-0 blur-md transition-all duration-300 group-hover/item:opacity-70 group-hover/item:scale-110"></div>
        </div>
        <h3 className={`text-xl font-semibold text-center font-kallisto transition-colors duration-300 ${
          mode === 'light' || mode === 'light2' ? 'group-hover/item:text-white' : ''
        }`}>
          <div>INDUSTRIAL</div>
          <div>ADHESIVES</div>
        </h3>
      </Link>
      <Link
        to="/products/seal"
        className={`group/item flex flex-col items-center w-48 ${linkTextClass} hover:text-[#F2611D] transform transition-all duration-300 group-hover/menu:scale-90 hover:!scale-100`}
        style={linkTextStyle}
        onMouseEnter={() => onVideoUrlChange('https://forzabuilt.com/wp-content/uploads/2024/02/Manufacturing-v2.mp4')}
      >
        <div className="relative w-40 h-24 flex items-center justify-center will-change-transform">
          <img 
            src={mode === 'light' || mode === 'light2' ? '/forza-seal-mb-color.svg' : '/products/brand-logos/product-line-brands-white-seal.svg'} 
            alt="Industrial Sealants Logo" 
            className="max-w-full max-h-full object-contain transform transition-transform duration-300 group-hover/item:scale-110"
          />
          <div className="pointer-events-none absolute inset-x-6 bottom-1 h-2 rounded-full bg-[#F2611D] opacity-0 blur-md transition-all duration-300 group-hover/item:opacity-70 group-hover/item:scale-110"></div>
        </div>
        <h3 className={`text-xl font-semibold text-center font-kallisto transition-colors duration-300 ${
          mode === 'light' || mode === 'light2' ? 'group-hover/item:text-white' : ''
        }`}>
          <div>INDUSTRIAL</div>
          <div>SEALANTS</div>
        </h3>
      </Link>
      <Link
        to="/products/tape"
        className={`group/item flex flex-col items-center w-48 ${linkTextClass} hover:text-[#F2611D] transform transition-all duration-300 group-hover/menu:scale-90 hover:!scale-100`}
        style={linkTextStyle}
        onMouseEnter={() => onVideoUrlChange('https://forzabuilt.com/wp-content/uploads/2024/02/Construction-v2.mp4')}
      >
        <div className="relative w-40 h-24 flex items-center justify-center will-change-transform">
          <img 
            src={mode === 'light' || mode === 'light2' ? '/forza-tape-mb-color.svg' : '/products/brand-logos/product-line-brands-white-tape.svg'} 
            alt="Industrial Tapes Logo" 
            className="max-w-full max-h-full object-contain transform transition-transform duration-300 group-hover/item:scale-110"
          />
          <div className="pointer-events-none absolute inset-x-6 bottom-1 h-2 rounded-full bg-[#F2611D] opacity-0 blur-md transition-all duration-300 group-hover/item:opacity-70 group-hover/item:scale-110"></div>
        </div>
        <h3 className={`text-xl font-semibold text-center font-kallisto transition-colors duration-300 ${
          mode === 'light' || mode === 'light2' ? 'group-hover/item:text-white' : ''
        }`}>
          <div>INDUSTRIAL</div>
          <div>TAPES</div>
        </h3>
      </Link>
      <Link
        to="/products/ruggedred"
        className={`group/item flex flex-col items-center w-48 ${linkTextClass} hover:text-[#F2611D] transform transition-all duration-300 group-hover/menu:scale-90 hover:!scale-100`}
        style={linkTextStyle}
        onMouseEnter={() => onVideoUrlChange('https://forzabuilt.com/wp-content/uploads/2024/02/Manufacturing-v2.mp4')}
      >
        <div className="relative w-40 h-24 flex items-center justify-center will-change-transform">
          <img src="/products/brand-logos/product-line-brands-white-ruggedred.svg" alt="Rugged Red Logo" className="max-w-full max-h-full object-contain transform transition-transform duration-300 group-hover/item:scale-110"/>
          <div className="pointer-events-none absolute inset-x-6 bottom-1 h-2 rounded-full bg-[#F2611D] opacity-0 blur-md transition-all duration-300 group-hover/item:opacity-70 group-hover/item:scale-110"></div>
        </div>
        <h3 className={`text-xl font-semibold text-center font-kallisto transition-colors duration-300 ${
          mode === 'light' || mode === 'light2' ? 'group-hover/item:text-white' : ''
        }`}>
          <div>INDUSTRIAL</div>
          <div>CLEANING</div>
        </h3>
      </Link>
    </div>
  );

  const renderToolsContent = () => (
    <div className="flex flex-row items-start justify-center space-x-12 text-center" onMouseLeave={() => onVideoUrlChange(null)}>
      {toolsData.map(tool => (
        <Link
          key={tool.name}
          to={tool.href}
          className={`flex flex-col items-center w-36 ${linkTextClass} hover:text-[#F2611D] transition-colors duration-300 group`}
          style={linkTextStyle}
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
          <h3 className={`text-xl font-semibold font-kallisto transition-colors duration-300 ${
            mode === 'light' || mode === 'light2' ? 'group-hover:text-white' : ''
          }`}>{tool.title}</h3>
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