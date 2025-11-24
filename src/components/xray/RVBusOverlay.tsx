import ImageOverlay from './ImageOverlay';

interface RVBusOverlayProps {
  viewportHeight?: number;
}

function RVBusOverlay({ viewportHeight }: RVBusOverlayProps) {
  return (
    <ImageOverlay
      svgSrc="/img/transportation/RV Bus Exploded-NEW.svg"
      title="RV / Motor Coach Applications"
      viewportHeight={viewportHeight}
    />
  );
}

export default RVBusOverlay;

