import React from 'react';
import { MapArea } from '@/data/buildingMapData';

interface MapAreaProps {
  area: MapArea;
  isSelected: boolean;
  isHovered: boolean;
  onClick: (areaId: string, event: React.MouseEvent) => void;
  onMouseEnter: (areaId: string) => void;
  onMouseLeave: () => void;
}

const MapAreaComponent: React.FC<MapAreaProps> = ({
  area,
  isSelected,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const getPolygonClasses = () => {
    if (isSelected) {
      return 'fill-orange-500/80 stroke-white stroke-2';
    }
    if (isHovered) {
      return 'fill-orange-400/60 stroke-orange-500/80 stroke-1';
    }
    return 'fill-blue-600/40 stroke-blue-600/60 stroke-1 hover:fill-orange-400/60';
  };

  return (
    <polygon
      points={area.points}
      className={`cursor-pointer transition-all duration-300 ${getPolygonClasses()}`}
      onClick={(e) => onClick(area.id, e)}
      onMouseEnter={() => onMouseEnter(area.id)}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default MapAreaComponent; 