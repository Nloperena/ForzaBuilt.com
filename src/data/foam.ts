import { IndustryData } from '../types/xray';

export const FOAM_DATA: IndustryData = {
  id: 'foam',
  xrays: [
    {
      id: 'foam-xray-1',
      preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/foam-product-normal.png',
      postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/foam-product-xray.png',
      width: 3840,
      height: 2160,
      hotspots: [
        {
          id: 'foam-bonding',
          points: [768,432, 1152,432, 1152,648, 768,648],
          product: {
            sku: 'FO1001',
            name: 'Foam Bonding Adhesive',
            blurb: '',
            url: '/product/fo1001-foam-bonding/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Bond-Product-Line.png',
          },
        },
        {
          id: 'foam-sealing', 
          points: [1536,540, 1920,540, 1920,756, 1536,756],
          product: {
            sku: 'FO1002',
            name: 'Foam Sealing System',
            blurb: '',
            url: '/product/fo1002-foam-sealing/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Seal-Product-Line.png',
          },
        },
        {
          id: 'foam-tape',
          points: [2304,648, 2688,648, 2688,864, 2304,864],
          product: {
            sku: 'FO1003',
            name: 'Foam Tape System',
            blurb: '',
            url: '/product/fo1003-foam-tape/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2023/05/tape-lineup-final-1.png',
          },
        },
      ],
    },
  ],
}; 