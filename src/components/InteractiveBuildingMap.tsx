import React from 'react';
import InteractiveSVG from './InteractiveBuildingMap/InteractiveSVG';
import ProductModal from './InteractiveBuildingMap/ProductModal';
import { useBuildingMapState } from '@/hooks/useBuildingMapState';

interface InteractiveBuildingMapProps {
  scrollProgress?: number; // Progress from X-Ray component (0-150+)
  onSelectionComplete?: () => void; // Callback when all selections are complete
}

const InteractiveBuildingMap: React.FC<InteractiveBuildingMapProps> = ({ 
  scrollProgress = 0, 
  onSelectionComplete 
}) => {
  const {
    selectedAreaId,
    selectedAreaData,
    stableModalPosition,
    mapAreas,
    handleAreaClick,
    handleAreaHover,
    handleAreaLeave,
    handleCloseModal,
  } = useBuildingMapState({ scrollProgress, onSelectionComplete });

  return (
    <div className="w-full h-full relative bg-white">
      {/* Main building image */}
      <img 
        src="https://images.ctfassets.net/hdznx4p7ef81/1kmvtrPRhchlnM3OMmLUZz/98dcbd7d34a19c38503536a8022e1e38/Boat-Pre-X-Ray2-transparent-2.png"
        alt="Building Space Interactive Map"
        className="w-full h-full object-cover"
      />

      {/* Interactive SVG overlay */}
      <InteractiveSVG
        areas={mapAreas}
        selectedAreaId={selectedAreaId}
        hoveredAreaId={null} // This will be handled by the hook
        onAreaClick={handleAreaClick}
        onAreaHover={handleAreaHover}
        onAreaLeave={handleAreaLeave}
      />

      {/* Product Modal */}
      {selectedAreaData && (
        <ProductModal
          area={selectedAreaData}
          position={stableModalPosition}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default InteractiveBuildingMap; 