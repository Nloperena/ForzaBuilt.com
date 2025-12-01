import ImageOverlay from './ImageOverlay';

interface TrailerOverlayProps {
  viewportHeight?: number;
  viewportWidth?: number;
  sidebarWidth?: string;
}

function TrailerOverlay({ viewportHeight, viewportWidth, sidebarWidth }: TrailerOverlayProps) {
  return (
    <ImageOverlay
      svgSrc="/img/transportation/Trailer Exploded Graphic2.svg"
      title="Trailer Applications"
      viewportHeight={viewportHeight}
      viewportWidth={viewportWidth}
      sidebarWidth={sidebarWidth}
    />
  );
}

export default TrailerOverlay;

