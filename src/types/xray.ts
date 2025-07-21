/** Point list from the old plugin (comma-sep pairs) → number[] */
export type PolygonPoints = number[];

/** One clickable hotspot inside an overlay */
export interface Hotspot {
  id: string;                // '2-1', '2-2', etc.
  points: PolygonPoints;     // absolute coords, same ratio as imageWidth/Height
  product: {
    sku: string;
    name: string;
    blurb: string;
    url: string;
    thumb: string;          // small square JPG/PNG
  };
}

/** Individual X-ray component data */
export interface XRayComponent {
  id: string;                // 'xray-1', 'xray-2', etc.
  preSrc: string;            // before image
  postSrc: string;           // after (X-ray) image — same W×H
  svgOverlay?: string;       // Optional SVG overlay
  width: number;             // original pixel width  (needed for normalising points)
  height: number;            // original pixel height
  hotspots: Hotspot[];       // parsed from the legacy SVG + hover code
}

/** All X-ray assets for an industry */
export interface IndustryData {
  id: string;                // 'marine'
  xrays: XRayComponent[];    // 0-2 X-ray components per industry
} 