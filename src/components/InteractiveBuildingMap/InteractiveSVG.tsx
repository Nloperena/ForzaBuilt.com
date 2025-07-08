import React from 'react';
import { MapArea } from '@/data/buildingMapData';
import MapAreaComponent from './MapArea';

interface InteractiveSVGProps {
  areas: MapArea[];
  selectedAreaId: string | null;
  hoveredAreaId: string | null;
  onAreaClick: (areaId: string, event: React.MouseEvent) => void;
  onAreaHover: (areaId: string) => void;
  onAreaLeave: () => void;
}

const InteractiveSVG: React.FC<InteractiveSVGProps> = ({
  areas,
  selectedAreaId,
  hoveredAreaId,
  onAreaClick,
  onAreaHover,
  onAreaLeave,
}) => {
  return (
    <svg 
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1871 1053"
      preserveAspectRatio="xMidYMid slice"
      style={{ backgroundSize: '1871px 1053px' }}
    >
      {areas.map((area) => (
        <MapAreaComponent
          key={area.id}
          area={area}
          isSelected={selectedAreaId === area.id}
          isHovered={hoveredAreaId === area.id}
          onClick={onAreaClick}
          onMouseEnter={onAreaHover}
          onMouseLeave={onAreaLeave}
        />
      ))}
    </svg>
  );
};

export default InteractiveSVG; 