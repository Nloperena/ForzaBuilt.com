import { IndustryData } from '../types/xray';

export const COMPOSITES_DATA: IndustryData = {
  id: 'composites',
  xrays: [
    {
      id: 'composites-xray-1',
      preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/7BPBiiuZt5RR8KFcNrq0oT/12724f13a6bc07d79c660e71d50addc4/Composite_windturbine.png',
      postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/164UYQjKpg9jP5ld6hrta0/d9524563c5fa1258ab0e51beacf2d78b/Wind-Turbine-Exploded-Graphic-Web.png',
      width: 4368,
      height: 2912,
      hotspots: [
        {
          id: '6-1',
          points: [872,582, 1309,575, 1340,691, 1133,684, 1102,638, 959,635, 902,630, 872,625],
          product: {
            sku: 'CO1001',
            name: 'Carbon Fiber Lamination',
            blurb: '',
            url: '/product/co1001-carbon-fiber-lamination/',
            thumb: '/img/products/mc723-thumb.jpg',
          },
        },
        {
          id: '6-2', 
          points: [1744,873, 2181,866, 2212,982, 2005,975, 1974,929, 1831,926, 1774,921, 1744,916],
          product: {
            sku: 'CO1002',
            name: 'Fiberglass Reinforcement',
            blurb: '',
            url: '/product/co1002-fiberglass-reinforcement/',
            thumb: '/img/products/mc724-thumb.jpg',
          },
        },
        {
          id: '6-3',
          points: [2616,1164, 3053,1157, 3084,1273, 2877,1266, 2846,1220, 2703,1217, 2646,1212, 2616,1207],
          product: {
            sku: 'CO1003',
            name: 'Kevlar Composite Bonding',
            blurb: '',
            url: '/product/co1003-kevlar-composite/',
            thumb: '/img/products/mc725-thumb.jpg',
          },
        },
      ],
    },
  ],
}; 