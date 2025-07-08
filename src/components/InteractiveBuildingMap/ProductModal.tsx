import React from 'react';
import { MapArea } from '@/data/buildingMapData';

interface ProductModalProps {
  area: MapArea;
  position: { x: number; y: number };
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  area,
  position,
  onClose,
}) => {
  return (
    <div 
      className="absolute z-50 bg-white border-4 border-blue-600 p-6 rounded-lg shadow-2xl max-w-md animate-[bounce_0.6s_ease-out] modal-content"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'auto'
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
      >
        ×
      </button>
      
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img 
            src={area.productImage} 
            alt={area.productName}
            className="w-20 h-20 object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-xl text-blue-600 mb-2">
            {area.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {area.description}
          </p>
          <a 
            href={area.productLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 