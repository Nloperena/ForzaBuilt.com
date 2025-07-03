import React, { useState, useEffect, useRef, useCallback } from 'react';

interface MapArea {
  id: string;
  title: string;
  description: string;
  productName: string;
  productImage: string;
  productLink: string;
  points: string;
}

interface InteractiveBuildingMapProps {
  scrollProgress?: number; // Progress from X-Ray component (0-150+)
  onSelectionComplete?: () => void; // Callback when all selections are complete
}

const InteractiveBuildingMap: React.FC<InteractiveBuildingMapProps> = ({ scrollProgress = 0, onSelectionComplete }) => {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [stableModalPosition, setStableModalPosition] = useState({ x: 0, y: 0 });

  // Calculate center point of SVG area and convert to percentage for positioning
  const calculateAreaCenter = (points: string) => {
    const coords = points.split(' ').map(coord => coord.split(',').map(Number));
    const xCoords = coords.map(coord => coord[0]);
    const yCoords = coords.map(coord => coord[1]);
    
    const centerX = xCoords.reduce((sum, x) => sum + x, 0) / xCoords.length;
    const centerY = yCoords.reduce((sum, y) => sum + y, 0) / yCoords.length;
    
    // Convert SVG coordinates (0-1871, 0-1053) to percentages
    const xPercent = (centerX / 1871) * 100;
    const yPercent = (centerY / 1053) * 100;
    
    return { x: xPercent, y: yPercent };
  };

  const mapAreas: MapArea[] = [
    {
      id: 'headliners-interior',
      title: 'Headliners & Interior Paneling',
      description: 'MC723 Web Spray CA Compliant Multi-Purpose Contact Adhesive',
      productName: 'MC723',
      productImage: 'https://forzabuilt.com/wp-content/uploads/2024/06/MC723-bundle-New.png',
      productLink: 'https://forzabuilt.com/product/mc723-web-spray-ca-compliant-multi-purpose-contact-adhesive/',
      points: '784,236 1140,226 1168,288 987,279 961,255 875,252 825,247 800,242'
    },
    {
      id: 'headliners-paneling',
      title: 'Headliners & Interior Paneling',
      description: 'MC722 Web Spray Non-Flammable / Non-Mrthylene Chloride Contact Adhesive',
      productName: 'MC722',
      productImage: 'https://forzabuilt.com/wp-content/uploads/2024/03/MC722-single.png',
      productLink: 'https://forzabuilt.com/product/mc722-web-spray-contact-adhesive-for-infusion-molding/',
      points: '1154,258 1167,288 1134,286 1135,305 1244,309 1229,272'
    },
    {
      id: 'seating-mattresses',
      title: 'Seating & Mattresses',
      description: 'MC723 Web Spray CA Compliant Multi-Purpose Contact Adhesive',
      productName: 'MC723',
      productImage: 'https://forzabuilt.com/wp-content/uploads/2024/06/MC723-bundle-New.png',
      productLink: 'https://forzabuilt.com/product/mc723-web-spray-ca-compliant-multi-purpose-contact-adhesive/',
      points: '713,411 758,410 758,424 796,424 796,410 839,409 838,443 795,443 700,443'
    },
    {
      id: 'carpeting-acoustic',
      title: 'Carpeting & Acoustic Materials',
      description: 'MC722 Web Spray Non-Flammable / Non-Mrthylene Chloride Contact Adhesive',
      productName: 'MC722',
      productImage: 'https://forzabuilt.com/wp-content/uploads/2024/03/MC722-single.png',
      productLink: 'https://forzabuilt.com/product/mc722-web-spray-contact-adhesive-for-infusion-molding/',
      points: '563,707 706,707 706,669 712,639 723,637 722,603 721,574 709,608 701,638 605,637'
    },
    {
      id: 'infusion-molding',
      title: 'Infusion Molding',
      description: 'TAC-739R Mist Spray Infusion Molding Adhesive',
      productName: 'TAC-739R',
      productImage: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-739R-NEW.png',
      productLink: 'https://forzabuilt.com/product/tac-739r-mist-spray-infusion-molding-adhesive/',
      points: '190,618 192,653 200,662 210,668 243,678 326,699 416,713 496,724 557,731 570,693'
    },
    {
      id: 'bonding-mounting-1',
      title: 'Bonding & Mounting',
      description: 'M-R478 Two- Part Methacrylate Adhesive',
      productName: 'M-R478',
      productImage: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-R478-NEW.png',
      productLink: 'https://forzabuilt.com/product/m-r478-two-part-methacrylate-adhesive/',
      points: '1508,459 1581,557 1602,554 1623,550 1644,589 1743,573 1747,562 1705,513 1660,475'
    },
    {
      id: 'bonding-mounting-2',
      title: 'Bonding & Mounting',
      description: 'M-R445 Two-Part Modified Epoxy Adhesive',
      productName: 'M-R445',
      productImage: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-R445-NEW.png',
      productLink: 'https://forzabuilt.com/product/m-r445-two-part-modified-epoxy-adhesive/',
      points: '1393,451 1423,492 1421,498 1412,501 1417,514 1437,572 1582,558 1509,460'
    },
    {
      id: 'external-sealing',
      title: 'External Sealing',
      description: 'M-OS789 Multi-Purpose Hybrid Polymer Sealant',
      productName: 'M-OS789',
      productImage: 'https://forzabuilt.com/wp-content/uploads/2024/06/sausagem-os789-NEW-USE.png',
      productLink: 'https://forzabuilt.com/product/m-os789-multi-purpose-hybrid-polymer-sealant/',
      points: '1364,409 1293,409 1331,487 1270,495 1335,495 1341,498 1424,498 1423,491'
    },
    {
      id: 'interior-cabinets',
      title: 'Interior Cabinets',
      description: 'MC723 Web Spray CA Compliant Multi-Purpose Contact Adhesive',
      productName: 'MC723',
      productImage: 'https://forzabuilt.com/wp-content/uploads/2024/06/MC723-bundle-New.png',
      productLink: 'https://forzabuilt.com/product/mc723-web-spray-ca-compliant-multi-purpose-contact-adhesive/',
      points: '946,540 944,555 942,616 1039,616 1038,555 1037,539'
    },
    {
      id: 'bonding-skirts',
      title: 'Bonding Skirts to Metal Railing',
      description: 'M-C285 Premium High-Temp Neoprene Contact Adhesive',
      productName: 'M-C285',
      productImage: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-C285-NEW.png',
      productLink: 'https://forzabuilt.com/product/m-c285-premium-high-temp-neoprene-contact-adhesive/',
      points: '957,392 1013,392 1012,434 1058,432 1060,393 1116,392 1114,457 982,457 985,435 979,433 973,437 963,442 956,447'
    },
    {
      id: 'general-mounting',
      title: 'General Mounting',
      description: 'M-T820 Double-Coated Ultra High Bond Acrylic Foam Tape',
      productName: 'M-T820',
      productImage: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-T820-NEW.png',
      productLink: 'https://forzabuilt.com/product/m-t820-double-coated-ultra-high-bond-acrylic-foam-tape/',
      points: '960,345 1006,344 1011,370 1051,369 1050,338 1105,338 1118,382 1118,393 1060,394 1060,423 1012,423 1013,394 961,394'
    },
    {
      id: 'plastic-laminate',
      title: 'Plastic Laminate Counters',
      description: 'MC722 Web Spray Non-Flammable / Non-Mrthylene Chloride Contact Adhesive',
      productName: 'MC722',
      productImage: 'https://forzabuilt.com/wp-content/uploads/2024/03/MC722-single.png',
      productLink: 'https://forzabuilt.com/product/mc722-web-spray-contact-adhesive-for-infusion-molding/',
      points: '961,330 962,391 957,394 958,426 881,425 884,359 888,333'
    }
  ];

  const handleAreaClick = (areaId: string, event: React.MouseEvent) => {
    console.log('Area clicked:', areaId);
    // Allow manual selection to override scroll-based selection
    setActiveArea(areaId);
    // Store the stable position for manual clicks too
    const areaData = mapAreas.find(area => area.id === areaId);
    if (areaData) {
      const position = calculateAreaCenter(areaData.points);
      setStableModalPosition(position);
    }
    event.stopPropagation(); // Prevent event bubbling
  };

  const handleAreaHover = (areaId: string) => {
    setHoveredArea(areaId);
  };

  const handleAreaLeave = () => {
    setHoveredArea(null);
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
    setActiveArea(null);
  };

  // Automatic area selection based on scroll progress from X-Ray component
  useEffect(() => {
    if (scrollProgress === 0) {
      setActiveArea(null);
      return;
    }

    // Only start selecting areas after X-Ray completes (after 100%)
    if (scrollProgress < 100) {
      setActiveArea(null);
      return;
    }

    // Calculate how much scroll range we need for all selections
    const totalAreas = mapAreas.length; // 12 areas
    const scrollRangePerArea = 30; // Each area gets 30% of scroll range for more time
    const totalSelectionRange = totalAreas * scrollRangePerArea; // 12 areas * 30% = 360%
    const selectionStart = 100; // Start after X-Ray completes
    const selectionEnd = selectionStart + totalSelectionRange; // 100% + 360% = 460%

    // Map scroll progress to area selection
    const selectionProgress = (scrollProgress - selectionStart) / totalSelectionRange; // 0-1 range for selection
    
    if (selectionProgress <= 0) {
      setActiveArea(null);
      return;
    }

    if (selectionProgress >= 1) {
      // All selections complete
      setActiveArea(mapAreas[totalAreas - 1].id);
      onSelectionComplete?.();
      return;
    }

    // Calculate which area should be active based on selection progress
    const areaIndex = Math.floor(selectionProgress * totalAreas);
    const clampedIndex = Math.min(areaIndex, totalAreas - 1);
    
    // Only activate if we have meaningful selection progress
    if (selectionProgress > 0.01) {
      const newActiveArea = mapAreas[clampedIndex].id;
      if (newActiveArea !== activeArea) {
        setActiveArea(newActiveArea);
        // Store the stable position when area changes
        const areaData = mapAreas[clampedIndex];
        const position = calculateAreaCenter(areaData.points);
        setStableModalPosition(position);
      }
    } else {
      setActiveArea(null);
    }
  }, [scrollProgress, mapAreas, onSelectionComplete, activeArea]);

  // Add click handler to close modal when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeArea && !(event.target as Element).closest('.modal-content')) {
        setActiveArea(null);
      }
    };

    if (activeArea) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeArea]);

  const activeAreaData = mapAreas.find(area => area.id === activeArea);
  console.log('Active area:', activeArea);
  console.log('Active area data:', activeAreaData);

  return (
    <div className="w-full h-full relative bg-white">
      {/* Main building image */}
      <img 
        src="https://images.ctfassets.net/hdznx4p7ef81/1kmvtrPRhchlnM3OMmLUZz/98dcbd7d34a19c38503536a8022e1e38/Boat-Pre-X-Ray2-transparent-2.png"
        alt="Building Space Interactive Map"
        className="w-full h-full object-cover"
      />

      {/* Interactive SVG overlay */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1871 1053"
        preserveAspectRatio="xMidYMid slice"
        style={{ backgroundSize: '1871px 1053px' }}
      >
        {mapAreas.map((area) => (
          <polygon
            key={area.id}
            points={area.points}
            className={`cursor-pointer transition-all duration-300 ${
              activeArea === area.id 
                ? 'fill-orange-500/80 stroke-white stroke-2' 
                : hoveredArea === area.id
                ? 'fill-orange-400/60 stroke-orange-500/80 stroke-1'
                : 'fill-blue-600/40 stroke-blue-600/60 stroke-1 hover:fill-orange-400/60'
            }`}
            onClick={(e) => handleAreaClick(area.id, e)}
            onMouseEnter={() => handleAreaHover(area.id)}
            onMouseLeave={handleAreaLeave}
          />
        ))}
      </svg>

      {/* Modal - positioned relative to selected area */}
      {activeAreaData && (
        <div 
          className="absolute z-50 bg-white border-4 border-blue-600 p-6 rounded-lg shadow-2xl max-w-md animate-[bounce_0.6s_ease-out] modal-content"
          style={{
            left: `${stableModalPosition.x}%`,
            top: `${stableModalPosition.y}%`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'auto'
          }}
        >
          {/* Close button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <img 
                src={activeAreaData.productImage} 
                alt={activeAreaData.productName}
                className="w-20 h-20 object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-blue-600 mb-2">
                {activeAreaData.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {activeAreaData.description}
              </p>
              <a 
                href={activeAreaData.productLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveBuildingMap; 