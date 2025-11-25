import React from 'react';
import TransportationXRaySelector from './TransportationXRaySelector';

interface IndustryXRaySectionsProps {
  industry: string;
}

const IndustryXRaySections: React.FC<IndustryXRaySectionsProps> = ({ industry }) => {
  return <TransportationXRaySelector />;
};

export default IndustryXRaySections;

