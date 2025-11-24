import ImageOverlay from './ImageOverlay';

interface TrailerOverlayProps {
  viewportHeight?: number;
}

function TrailerOverlay({ viewportHeight }: TrailerOverlayProps) {
  return (
    <ImageOverlay
      svgSrc="/img/transportation/Trailer Exploded Graphic2.svg"
      title="Trailer Applications"
      viewportHeight={viewportHeight}
    />
  );
}

export default TrailerOverlay;

