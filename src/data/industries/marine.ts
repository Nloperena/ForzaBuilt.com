import { IndustryData } from '@/types/xray';

export const MARINE_DATA: IndustryData = {
  id: 'marine',
  xrays: [
    {
      id: 'marine-xray-1',
      preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/6ouZLSgoHcLk2OWbaLla5o/5a0b49f23638ef42ae95237477fa2ad3/Marine_Boat.png',
      postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/5pUlDcvSsLIMeyC4HXQaK1/5acbb21568d484ffa5aa00506d499613/Marine_Exploded_Boat_Graphic.png',
      svgOverlay: 'https://images.ctfassets.net/hdznx4p7ef81/3AnnMH4nZ6bapCk1KD7tJX/9471824ab4cf34934524887a1659a138/Marine_Pontoon_SVG.svg',
      width: 3840,
      height: 2160,
      hotspots: [
        {
          id: '1-1',
          points: [768,432, 1152,432, 1152,648, 768,648],
          product: {
            sku: 'MA1001',
            name: 'Hull Reinforcement Adhesive',
            blurb: 'MA1001 Marine-Grade Structural Bonding for Hull Applications',
            url: '/product/ma1001-hull-reinforcement/',
            thumb: '/img/products/mc723-thumb.jpg',
          },
        },
        {
          id: '1-2', 
          points: [1536,540, 1920,540, 1920,756, 1536,756],
          product: {
            sku: 'MA1002',
            name: 'Deck Hardware Mounting',
            blurb: 'MA1002 Weather-Resistant Deck Hardware Adhesive',
            url: '/product/ma1002-deck-hardware/',
            thumb: '/img/products/mc724-thumb.jpg',
          },
        },
        {
          id: '1-3',
          points: [2304,648, 2688,648, 2688,864, 2304,864],
          product: {
            sku: 'MA1003',
            name: 'Cabin Window Sealing',
            blurb: 'MA1003 Marine Window and Porthole Sealant',
            url: '/product/ma1003-cabin-sealing/',
            thumb: '/img/products/mc725-thumb.jpg',
          },
        },
      ],
    },
    {
      id: 'marine-xray-2',
      preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/6HWrpaU0ZzK2cBIqSHXXZS/1daedcc2cdfb0d366c5a8db29b592dcf/Pontoon_Boat__1_.png',
      postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/4pfvji0pqdNa39baRHeeDc/ecaa4157a51a62008a83f270467cbea1/Pontoon_Boat_Exploded_Graphic__1_.jpg',
      svgOverlay: 'https://images.ctfassets.net/hdznx4p7ef81/3AnnMH4nZ6bapCk1KD7tJX/9471824ab4cf34934524887a1659a138/Marine_Pontoon_SVG.svg',
      width: 3840,
      height: 2160,
      hotspots: [
        {
          id: 'pontoon-1-1',
          points: [768,432, 1152,432, 1152,648, 768,648],
          product: {
            sku: 'MA1001',
            name: 'Hull Reinforcement Adhesive',
            blurb: 'MA1001 Marine-Grade Structural Bonding for Hull Applications',
            url: '/product/ma1001-hull-reinforcement/',
            thumb: '/img/products/mc723-thumb.jpg',
          },
        },
        {
          id: 'pontoon-1-2', 
          points: [1536,540, 1920,540, 1920,756, 1536,756],
          product: {
            sku: 'MA1002',
            name: 'Deck Hardware Mounting',
            blurb: 'MA1002 Weather-Resistant Deck Hardware Adhesive',
            url: '/product/ma1002-deck-hardware/',
            thumb: '/img/products/mc724-thumb.jpg',
          },
        },
        {
          id: 'pontoon-1-3',
          points: [2304,648, 2688,648, 2688,864, 2304,864],
          product: {
            sku: 'MA1003',
            name: 'Cabin Window Sealing',
            blurb: 'MA1003 Marine Window and Porthole Sealant',
            url: '/product/ma1003-cabin-sealing/',
            thumb: '/img/products/mc725-thumb.jpg',
          },
        },
      ],
    },
  ],
};