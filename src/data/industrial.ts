import { IndustryData } from '../types/xray';

export const INDUSTRIAL_DATA: IndustryData = {
  id: 'industrial',
  xrays: [
    {
      id: 'industrial-xray-1',
      preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/industrial-factory-normal.png',
      postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/industrial-factory-xray.png',
      width: 3840,
      height: 2160,
      hotspots: [
        {
          id: 'machinery-bonding',
          points: [768,432, 1152,432, 1152,648, 768,648],
          product: {
            sku: 'IN1001',
            name: 'Machinery Bonding Adhesive',
            blurb: '',
            url: '/product/in1001-machinery-bonding/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Bond-Product-Line.png',
          },
        },
        {
          id: 'equipment-sealing', 
          points: [1536,540, 1920,540, 1920,756, 1536,756],
          product: {
            sku: 'IN1002',
            name: 'Equipment Sealing System',
            blurb: '',
            url: '/product/in1002-equipment-sealing/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Seal-Product-Line.png',
          },
        },
        {
          id: 'structural-adhesive',
          points: [2304,648, 2688,648, 2688,864, 2304,864],
          product: {
            sku: 'IN1003',
            name: 'Structural Adhesive',
            blurb: '',
            url: '/product/in1003-structural-adhesive/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2023/05/tape-lineup-final-1.png',
          },
        },
      ],
    },
  ],
}; 