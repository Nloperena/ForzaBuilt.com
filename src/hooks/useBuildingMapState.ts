import { useState, useEffect, useCallback } from 'react';
import { mapAreas } from '@/data/buildingMapData';
import { calculateAreaCenter, calculateActiveAreaFromScroll } from '@/utils/mapUtils';

interface UseBuildingMapStateProps {
  scrollProgress?: number;
  onSelectionComplete?: () => void;
}

export const useBuildingMapState = ({ 
  scrollProgress = 0, 
  onSelectionComplete 
}: UseBuildingMapStateProps) => {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [stableModalPosition, setStableModalPosition] = useState({ x: 0, y: 0 });

  const handleAreaClick = useCallback((areaId: string, event: React.MouseEvent) => {
    console.log('Area clicked:', areaId);
    // Allow manual selection to override scroll-based selection
    setActiveArea(areaId);
    // Store the stable position for manual clicks too
    const areaData = mapAreas.find(area => area.id === areaId);
    if (areaData) {
      const position = calculateAreaCenter(areaData.points);
      setStableModalPosition(position);
    }
    event.stopPropagation(); // Prevent event bubbling
  }, []);

  const handleAreaHover = useCallback((areaId: string) => {
    setHoveredArea(areaId);
  }, []);

  const handleAreaLeave = useCallback(() => {
    setHoveredArea(null);
  }, []);

  const handleCloseModal = useCallback(() => {
    console.log('Closing modal');
    setActiveArea(null);
  }, []);

  // Automatic area selection based on scroll progress from X-Ray component
  useEffect(() => {
    const activeAreaIndex = calculateActiveAreaFromScroll(scrollProgress, mapAreas.length);
    
    if (activeAreaIndex === null) {
      setActiveArea(null);
      return;
    }

    if (activeAreaIndex === mapAreas.length - 1) {
      // All selections complete
      setActiveArea(mapAreas[mapAreas.length - 1].id);
      onSelectionComplete?.();
      return;
    }

    // Only activate if we have meaningful selection progress
    if (scrollProgress > 100.01) {
      const newActiveArea = mapAreas[activeAreaIndex].id;
      if (newActiveArea !== activeArea) {
        setActiveArea(newActiveArea);
        // Store the stable position when area changes
        const areaData = mapAreas[activeAreaIndex];
        const position = calculateAreaCenter(areaData.points);
        setStableModalPosition(position);
      }
    } else {
      setActiveArea(null);
    }
  }, [scrollProgress, activeArea, onSelectionComplete]);

  // Add click handler to close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeArea && !(event.target as Element).closest('.modal-content')) {
        setActiveArea(null);
      }
    };

    if (activeArea) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeArea]);

  // Calculate modal position for hovered or active area
  useEffect(() => {
    let areaData = null;
    if (hoveredArea) {
      areaData = mapAreas.find(area => area.id === hoveredArea);
    } else if (activeArea) {
      areaData = mapAreas.find(area => area.id === activeArea);
    }
    if (areaData) {
      const position = calculateAreaCenter(areaData.points);
      setStableModalPosition(position);
    }
  }, [hoveredArea, activeArea]);

  // Determine which area is currently selected (hover takes priority)
  const selectedAreaId = hoveredArea ?? activeArea;
  const selectedAreaData = mapAreas.find(area => area.id === selectedAreaId);

  return {
    // State
    activeArea,
    hoveredArea,
    selectedAreaId,
    selectedAreaData,
    stableModalPosition,
    mapAreas,
    
    // Handlers
    handleAreaClick,
    handleAreaHover,
    handleAreaLeave,
    handleCloseModal,
  };
}; 