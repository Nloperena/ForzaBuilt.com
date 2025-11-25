import ImageOverlay from './ImageOverlay';

interface RVBusOverlayProps {
  viewportHeight?: number;
  viewportWidth?: number;
  sidebarWidth?: string;
}

function RVBusOverlay({ viewportHeight, viewportWidth, sidebarWidth }: RVBusOverlayProps) {
  return (
    <ImageOverlay
      svgSrc="/img/transportation/RV Bus Exploded-NEW.svg"
      title="RV / Motor Coach Applications"
      viewportHeight={viewportHeight}
      viewportWidth={viewportWidth}
      sidebarWidth={sidebarWidth}
    />
  );
}

export default RVBusOverlay;

