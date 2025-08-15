import React, { useState, useRef, useEffect } from 'react';

interface CoordinateDebuggerProps {
  imageSrc: string;
  width: number;
  height: number;
  onCoordinatesChange: (coordinates: Array<{ x: number; y: number; id: string }>) => void;
}

export const CoordinateDebugger: React.FC<CoordinateDebuggerProps> = ({
  imageSrc,
  width,
  height,
  onCoordinatesChange
}) => {
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [coordinates, setCoordinates] = useState<Array<{ x: number; y: number; id: string }>>([]);
  const [nextId, setNextId] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!isDebugMode || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newCoordinate = {
      x: Math.round(x),
      y: Math.round(y),
      id: `point_${nextId}`
    };

    setCoordinates(prev => [...prev, newCoordinate]);
    setNextId(prev => prev + 1);
  };

  const removeCoordinate = (id: string) => {
    setCoordinates(prev => prev.filter(coord => coord.id !== id));
  };

  const clearAllCoordinates = () => {
    setCoordinates([]);
    setNextId(1);
  };

  const generateHotspotData = () => {
    if (coordinates.length < 3) {
      alert('You need at least 3 points to create a hotspot polygon');
      return;
    }

    const points = coordinates.map(coord => `${coord.x}, ${coord.y}`).join(', ');
    const hotspotData = `{
  id: 'hotspot_${Date.now()}',
  points: [${coordinates.map(coord => coord.x).join(', ')}, ${coordinates.map(coord => coord.y).join(', ')}],
  product: {
    sku: 'MC7XX',
    name: 'Product Name',
    blurb: 'Product description',
    url: '/product-url'
  }
}`;

    navigator.clipboard.writeText(hotspotData);
    alert('Hotspot data copied to clipboard!');
  };

  useEffect(() => {
    onCoordinatesChange(coordinates);
  }, [coordinates, onCoordinatesChange]);

  return (
    <div className="coordinate-debugger">
      <div className="debug-controls mb-4 p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isDebugMode}
              onChange={(e) => setIsDebugMode(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="font-medium">Debug Mode</span>
          </label>
          
          {isDebugMode && (
            <div className="flex gap-2">
              <button
                onClick={clearAllCoordinates}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Clear All
              </button>
              <button
                onClick={generateHotspotData}
                disabled={coordinates.length < 3}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
              >
                Generate Hotspot Data
              </button>
            </div>
          )}
        </div>

        {isDebugMode && (
          <div className="text-sm text-gray-600">
            <p>Click on the image to add coordinate points. You need at least 3 points to create a hotspot polygon.</p>
            <p className="mt-1">Coordinates collected: {coordinates.length}</p>
          </div>
        )}
      </div>

      <div className="relative inline-block">
        <img
          ref={imageRef}
          src={imageSrc}
          alt="Coordinate Debug Image"
          width={width}
          height={height}
          className="max-w-full h-auto cursor-crosshair"
          onClick={handleImageClick}
          style={{ cursor: isDebugMode ? 'crosshair' : 'default' }}
        />
        
        {isDebugMode && coordinates.map((coord, index) => (
          <div
            key={coord.id}
            className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white transform -translate-x-2 -translate-y-2"
            style={{ left: coord.x, top: coord.y }}
          >
            <span className="absolute -top-6 -left-2 bg-[#1B3764] text-white text-xs px-1 py-0.5 rounded">
              {index + 1}
            </span>
            <button
              onClick={() => removeCoordinate(coord.id)}
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 text-white text-xs rounded-full hover:bg-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {isDebugMode && coordinates.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Collected Coordinates:</h3>
          <div className="text-sm font-mono bg-white p-2 rounded border">
            {coordinates.map((coord, index) => (
              <div key={coord.id} className="flex justify-between">
                <span>Point {index + 1}: ({coord.x}, {coord.y})</span>
                <button
                  onClick={() => removeCoordinate(coord.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 