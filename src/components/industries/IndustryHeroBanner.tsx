import React, { useState } from 'react';
import ImageSkeleton from '../common/ImageSkeleton';

interface IndustryHeroBannerProps {
  videoUrl: string;
  industryTitle: string;
}

const IndustryHeroBanner: React.FC<IndustryHeroBannerProps> = ({ videoUrl, industryTitle }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoLoaded(true);
  };

  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden z-[5] hero-video-area">
      {!videoLoaded && <ImageSkeleton className="rounded-xl" />}
      <video
        key={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover object-center z-[5] rounded-xl transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </section>
  );
};

export default IndustryHeroBanner;

