// Calculate center point of SVG area and convert to percentage for positioning
export const calculateAreaCenter = (points: string) => {
  const coords = points.split(' ').map(coord => coord.split(',').map(Number));
  const xCoords = coords.map(coord => coord[0]);
  const yCoords = coords.map(coord => coord[1]);
  
  const centerX = xCoords.reduce((sum, x) => sum + x, 0) / xCoords.length;
  const centerY = yCoords.reduce((sum, y) => sum + y, 0) / yCoords.length;
  
  // Convert SVG coordinates (0-1871, 0-1053) to percentages
  const xPercent = (centerX / 1871) * 100;
  const yPercent = (centerY / 1053) * 100;
  
  return { x: xPercent, y: yPercent };
};

// Calculate which area should be active based on scroll progress
export const calculateActiveAreaFromScroll = (
  scrollProgress: number,
  totalAreas: number,
  selectionStart: number = 100,
  scrollRangePerArea: number = 30
) => {
  if (scrollProgress === 0 || scrollProgress < selectionStart) {
    return null;
  }

  const totalSelectionRange = totalAreas * scrollRangePerArea;
  const selectionProgress = (scrollProgress - selectionStart) / totalSelectionRange;
  
  if (selectionProgress <= 0) {
    return null;
  }

  if (selectionProgress >= 1) {
    return totalAreas - 1; // Return last area index
  }

  // Calculate which area should be active based on selection progress
  const areaIndex = Math.floor(selectionProgress * totalAreas);
  return Math.min(areaIndex, totalAreas - 1);
}; 