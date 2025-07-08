import React, { useState } from 'react';
import ModularXRayWipe from './ModularXRayWipe';
import { getSVGOverlayForIndustry } from './CustomSVGOverlays';
import InteractiveBuildingMap from './InteractiveBuildingMap';

// Example 1: Basic usage with industry-specific configuration
export const BasicIndustryXRay: React.FC = () => {
  const [xrayProgress, setXrayProgress] = useState(0);

  return (
    <ModularXRayWipe
      industry="Marine"
      onProgressChange={setXrayProgress}
    />
  );
};

// Example 2: Using custom SVG overlay
export const CustomSVGXRay: React.FC = () => {
  const [xrayProgress, setXrayProgress] = useState(0);

  return (
    <ModularXRayWipe
      industry="Construction"
      customSVG={React.createElement(getSVGOverlayForIndustry('Construction'))}
      onProgressChange={setXrayProgress}
    />
  );
};

// Example 3: Overriding configuration
export const OverrideConfigXRay: React.FC = () => {
  const [xrayProgress, setXrayProgress] = useState(0);

  return (
    <ModularXRayWipe
      industry="Automotive"
      overrideConfig={{
        height: 800,
        wipeDirection: 'rtl' as const,
        customLabels: {
          before: "Before Assembly",
          after: "With Forza Sealants",
          scrollInstruction: "Scroll to reveal sealants",
          completeText: "Assembly Complete!"
        }
      }}
      onProgressChange={setXrayProgress}
    />
  );
};

// Example 4: Using custom after content (like InteractiveBuildingMap)
export const CustomAfterContentXRay: React.FC = () => {
  const [xrayProgress, setXrayProgress] = useState(0);

  return (
    <ModularXRayWipe
      industry="Aerospace"
      customSVG={React.createElement(getSVGOverlayForIndustry('Aerospace'))}
      onProgressChange={setXrayProgress}
      fallbackAfterContent={
        <div className="w-full h-full">
          <InteractiveBuildingMap scrollProgress={xrayProgress} />
        </div>
      }
    />
  );
};

// Example 5: Minimal configuration with custom images
export const MinimalXRay: React.FC = () => {
  return (
    <ModularXRayWipe
      industry="Manufacturing"
      fallbackPreImage="https://example.com/custom-pre-image.jpg"
      fallbackPostImage="https://example.com/custom-post-image.jpg"
      overrideConfig={{
        showInteractiveElements: false
      }}
    />
  );
};

// Example 6: Multiple X-Ray sections for different industries
export const MultiIndustryXRay: React.FC = () => {
  const [marineProgress, setMarineProgress] = useState(0);
  const [constructionProgress, setConstructionProgress] = useState(0);
  const [automotiveProgress, setAutomotiveProgress] = useState(0);

  return (
    <div className="space-y-20">
      {/* Marine Industry */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Marine Industry</h2>
          <ModularXRayWipe
            industry="Marine"
            customSVG={React.createElement(getSVGOverlayForIndustry('Marine'))}
            onProgressChange={setMarineProgress}
          />
        </div>
      </section>

      {/* Construction Industry */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Construction Industry</h2>
          <ModularXRayWipe
            industry="Construction"
            customSVG={React.createElement(getSVGOverlayForIndustry('Construction'))}
            onProgressChange={setConstructionProgress}
          />
        </div>
      </section>

      {/* Automotive Industry */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Automotive Industry</h2>
          <ModularXRayWipe
            industry="Automotive"
            customSVG={React.createElement(getSVGOverlayForIndustry('Automotive'))}
            onProgressChange={setAutomotiveProgress}
          />
        </div>
      </section>
    </div>
  );
};

// Example 7: Custom SVG component for specific use case
const CustomIndustrySVG: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {/* Custom interactive elements */}
    <circle
      cx="50"
      cy="50"
      r="5"
      fill="rgba(255, 0, 0, 0.6)"
      className="animate-pulse"
    />
    <rect
      x="30"
      y="30"
      width="40"
      height="40"
      fill="none"
      stroke="rgba(255, 255, 255, 0.8)"
      strokeWidth="1"
      strokeDasharray="5,5"
    />
  </svg>
);

export const CustomSVGXRayExample: React.FC = () => {
  const [xrayProgress, setXrayProgress] = useState(0);

  return (
    <ModularXRayWipe
      industry="Electronics"
      customSVG={<CustomIndustrySVG />}
      onProgressChange={setXrayProgress}
      overrideConfig={{
        customLabels: {
          before: "Before Processing",
          after: "With Custom Solutions",
          scrollInstruction: "Scroll to reveal custom solutions",
          completeText: "Processing Complete!"
        }
      }}
    />
  );
};

// Example 8: Dynamic industry selection
export const DynamicIndustryXRay: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('Marine');
  const [xrayProgress, setXrayProgress] = useState(0);

  const industries = [
    'Marine',
    'Construction',
    'Automotive',
    'Aerospace',
    'Manufacturing',
    'Energy',
    'Electronics',
    'Medical',
    'Food & Beverage'
  ];

  return (
    <div className="space-y-8">
      {/* Industry Selector */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Select Industry</h2>
        <div className="flex flex-wrap gap-2">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-4 py-2 rounded-lg border ${
                selectedIndustry === industry
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {/* X-Ray Component */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">{selectedIndustry} Industry</h2>
          <ModularXRayWipe
            industry={selectedIndustry}
            customSVG={React.createElement(getSVGOverlayForIndustry(selectedIndustry))}
            onProgressChange={setXrayProgress}
          />
        </div>
      </section>
    </div>
  );
};

// Documentation component showing all available props
export const XRayDocumentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Modular X-Ray Component Documentation</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Props</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Required Props</h3>
          <ul className="space-y-2">
            <li><code className="bg-gray-200 px-2 py-1 rounded">industry: string</code> - The industry name to get configuration for</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-2 mt-4">Optional Props</h3>
          <ul className="space-y-2">
            <li><code className="bg-gray-200 px-2 py-1 rounded">customSVG?: React.ReactNode</code> - Custom SVG overlay component</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">onProgressChange?: (progress: number) => void</code> - Progress callback</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">className?: string</code> - Additional CSS classes</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">overrideConfig?: Partial&lt;XRayConfig&gt;</code> - Override default configuration</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">fallbackPreImage?: string</code> - Custom pre-X-ray image URL</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">fallbackPostImage?: string</code> - Custom post-X-ray image URL</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">fallbackAfterContent?: React.ReactNode</code> - Custom after content component</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Available Industries</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            'Marine',
            'Construction',
            'Architectural',
            'Manufacturing',
            'Automotive',
            'Aerospace',
            'Energy',
            'Electronics',
            'Medical',
            'Food & Beverage'
          ].map((industry) => (
            <div key={industry} className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold">{industry}</h3>
              <p className="text-sm text-gray-600">Custom configuration available</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Usage Examples</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Basic Usage</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<ModularXRayWipe industry="Marine" />`}
            </pre>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">With Custom SVG</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<ModularXRayWipe 
  industry="Construction"
  customSVG={<CustomSVGComponent />}
/>`}
            </pre>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">With Configuration Override</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<ModularXRayWipe 
  industry="Automotive"
  overrideConfig={{
    height: 800,
    wipeDirection: 'rtl',
    customLabels: {
      before: "Before Assembly",
      after: "With Forza Sealants"
    }
  }}
/>`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}; 