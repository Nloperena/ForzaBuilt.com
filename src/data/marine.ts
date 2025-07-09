import { IndustryData } from '../types/xray';

export const MARINE_DATA: IndustryData = {
  id: 'marine',
  xrays: [
    {
      id: 'marine-xray-1',
      preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/1AmgiwUCYVKuHYBzr0zVfi/d5ccc0c8a64e211d9cd50d656c64dbee/Boat-Pre-X-Ray__2_.png',
      postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/1kmvtrPRhchlnM3OMmLUZz/98dcbd7d34a19c38503536a8022e1e38/Boat-Pre-X-Ray2-transparent-2.png',
      width: 3840,
      height: 2160,
      hotspots: [
        {
          id: '1-1',
          points: [768,432, 1152,432, 1152,648, 768,648],
          product: {
            sku: 'MA1001',
            name: 'Hull Reinforcement Adhesive',
            blurb: '',
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
            blurb: '',
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
            blurb: '',
            url: '/product/ma1003-cabin-sealing/',
            thumb: '/img/products/mc725-thumb.jpg',
          },
        },
      ],
    },
    {
      id: 'marine-xray-2',
      preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/7DHVVY1zO3K85ydN1XxDxD/7473912e21a0ee3aa0204d45f1737a5d/Pontoon_Boat.png',
        postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/7DHVVY1zO3K85ydN1XxDxD/5f0ef656b0edf182f43e0b6f91d685b6/Pontoon_Boat_Exploded_Graphic.jpg',
        width: 3840,
      height: 2160,
      hotspots: [
        {
          id: '1-1-dup',
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
          id: '1-2-dup', 
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
          id: '1-3-dup',
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