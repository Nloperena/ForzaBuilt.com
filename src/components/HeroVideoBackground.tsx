import React from 'react';

type HeroVideoBackgroundProps = {
  src: string;
  className?: string;
  onLoaded?: () => void;
  onError?: () => void;
  overlayClassName?: string;
};

/**
 * Full-bleed video background that fills its parent. Designed to sit under overlays.
 * Parent should be position: relative or a positioned element.
 */
const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({
  src,
  className,
  onLoaded,
  onError,
  overlayClassName
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className ?? ''}`} style={{ zIndex: 0 }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={onLoaded}
        onCanPlay={onLoaded}
        onError={onError}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ width: '100%', height: '100%' }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Optional overlay layer above video but below content */}
      {overlayClassName ? (
        <div className={`absolute inset-0 ${overlayClassName}`} style={{ zIndex: 1 }} />
      ) : null}
    </div>
  );
};

export default HeroVideoBackground;


