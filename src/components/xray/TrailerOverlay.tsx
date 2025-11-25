import ImageOverlay from './ImageOverlay';

interface TrailerOverlayProps {
  viewportHeight?: number;
  viewportWidth?: number;
}

function TrailerOverlay({ viewportHeight, viewportWidth }: TrailerOverlayProps) {
  return (
    <ImageOverlay
      svgSrc="/img/transportation/Trailer Exploded Graphic2.svg"
      title="Trailer Applications"
      viewportHeight={viewportHeight}
      viewportWidth={viewportWidth}
    />
  );
}

export default TrailerOverlay;

