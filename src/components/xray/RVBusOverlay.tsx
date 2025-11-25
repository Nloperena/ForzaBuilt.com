import ImageOverlay from './ImageOverlay';

interface RVBusOverlayProps {
  viewportHeight?: number;
  viewportWidth?: number;
}

function RVBusOverlay({ viewportHeight, viewportWidth }: RVBusOverlayProps) {
  return (
    <ImageOverlay
      svgSrc="/img/transportation/RV Bus Exploded-NEW.svg"
      title="RV / Motor Coach Applications"
      viewportHeight={viewportHeight}
      viewportWidth={viewportWidth}
    />
  );
}

export default RVBusOverlay;

