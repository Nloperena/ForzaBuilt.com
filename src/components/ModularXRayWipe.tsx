import React from 'react';
import XRayWipe from './XRayWipe';
import { getXRayConfig, defaultXRayConfig, XRayConfig } from '../data/xrayConfigs';

interface ModularXRayWipeProps {
  industry: string;
  customSVG?: React.ReactNode;
  onProgressChange?: (progress: number) => void;
  className?: string;
  // Override options
  overrideConfig?: Partial<XRayConfig>;
  // Fallback options if no industry config is found
  fallbackPreImage?: string;
  fallbackPostImage?: string;
  fallbackAfterContent?: React.ReactNode;
}

const ModularXRayWipe: React.FC<ModularXRayWipeProps> = ({
  industry,
  customSVG,
  onProgressChange,
  className = '',
  overrideConfig = {},
  fallbackPreImage,
  fallbackPostImage,
  fallbackAfterContent
}) => {
  // Get industry-specific configuration
  const industryConfig = getXRayConfig(industry);
  
  // Use industry config, fallback to default, then apply overrides
  const config = {
    ...defaultXRayConfig,
    ...industryConfig,
    ...overrideConfig
  };

  // Determine which images to use
  const preImage = fallbackPreImage || config.preXrayImage;
  const postImage = fallbackPostImage || config.postXrayImage;

  return (
    <XRayWipe
      beforeSrc={preImage}
      afterContent={fallbackAfterContent || (
        postImage ? (
          <img
            src={postImage}
            alt={config.altPostXray || "Post-X-ray image"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : null
      )}
      altBefore={config.altPreXray}
      height={config.height}
      wipeDirection={config.wipeDirection}
      className={className}
      onProgressChange={onProgressChange}
      customSVG={customSVG}
      preXrayImage={preImage}
      postXrayImage={postImage}
      altPreXray={config.altPreXray}
      altPostXray={config.altPostXray}
      industry={industry}
      showInteractiveElements={config.showInteractiveElements}
      customLabels={config.customLabels}
    />
  );
};

export default ModularXRayWipe; 