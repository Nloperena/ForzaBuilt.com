import { IndustryData } from '../types/xray';

export const MARINE_DATA: IndustryData = {
  id: 'marine',
  xrays: [
    {
      id: 'marine-xray-1',
      preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/6ouZLSgoHcLk2OWbaLla5o/5a0b49f23638ef42ae95237477fa2ad3/Marine_Boat.png',
      postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/5pUlDcvSsLIMeyC4HXQaK1/5acbb21568d484ffa5aa00506d499613/Marine_Exploded_Boat_Graphic.png',
      width: 3840,
      height: 2160,
      hotspots: [
        {
          id: 'hull-reinforcement',
          points: [1200,800, 1400,800, 1400,900, 1200,900],
          product: {
            sku: 'MA1001',
            name: 'Hull Reinforcement Adhesive',
            blurb: 'Marine-grade structural bonding for hull applications',
            url: '/product/ma1001-hull-reinforcement/',
            thumb: '/img/products/mc723-thumb.jpg',
          },
        },
        {
          id: 'deck-hardware', 
          points: [1600,600, 1800,600, 1800,700, 1600,700],
          product: {
            sku: 'MA1002',
            name: 'Deck Hardware Mounting',
            blurb: 'Weather-resistant deck hardware adhesive',
            url: '/product/ma1002-deck-hardware/',
            thumb: '/img/products/mc724-thumb.jpg',
          },
        },
        {
          id: 'cabin-sealing',
          points: [2000,400, 2200,400, 2200,500, 2000,500],
          product: {
            sku: 'MA1003',
            name: 'Cabin Window Sealing',
            blurb: 'Marine window and porthole sealant',
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