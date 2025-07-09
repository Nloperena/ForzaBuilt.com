import { IndustryData } from '@/types/industry';

export const TRANSPORTATION_DATA: IndustryData = {
  id: 'transportation',
  xrays: [
    {
      id: 'transportation-xray-1',
      preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/2Qq29wDSvgCIxEfLDOGNpE/382dc6f45c6d7571913a6e1b08be26ab/Trailer.png',
      postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/KuTdeqIcViEeseg9MwgVi/e853019c056819f05f1abe3529556dff/Trailor_1_Clean-scaled.jpg',
      width: 4608,
      height: 2070,
      hotspots: [
        {
          id: '3-1',
          points: [922,414, 1383,407, 1422,549, 1203,542, 1164,496, 1021,499, 983,494, 922,489],
          product: {
            sku: 'TR1001',
            name: 'Bridge Cable Anchoring',
            blurb: 'TR1001 High-Tension Cable Anchoring System',
            url: '/product/tr1001-bridge-cable/',
            thumb: '/img/products/mc723-thumb.jpg',
          },
        },
        {
          id: '3-2',
          points: [1844,621, 2305,614, 2344,756, 2125,749, 2086,703, 1943,706, 1905,701, 1844,696],
          product: {
            sku: 'TR1002',
            name: 'Structural Joint Sealing',
            blurb: 'TR1002 Weather-Resistant Structural Joint Sealant',
            url: '/product/tr1002-structural-joint/',
            thumb: '/img/products/mc724-thumb.jpg',
          },
        },
        {
          id: '3-3',
          points: [2766,828, 3227,821, 3266,963, 3047,956, 3008,910, 2865,913, 2827,908, 2766,903],
          product: {
            sku: 'TR1003',
            name: 'Deck Surface Bonding',
            blurb: 'TR1003 High-Traffic Deck Surface Adhesive',
            url: '/product/tr1003-deck-surface/',
            thumb: '/img/products/mc725-thumb.jpg',
          },
        },
      ],
    },
    {
      id: 'transportation-xray-2',
      preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/7bgThbbTOQKbTenhDm8H0/9ab5684b6764c7ba9ef987ff903dea28/RV.png',
      postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/6KKk67EKZe9BIfUtQx3RF8/099c537d77fb1fd0f9e5d4e09c5c2e6f/Bus_1_Clean-scaled.jpg',
      width: 4608,
      height: 2070,
      hotspots: [
        {
          id: '3-1-dup',
          points: [922,414, 1383,407, 1422,549, 1203,542, 1164,496, 1021,499, 983,494, 922,489],
          product: {
            sku: 'TR1001',
            name: 'Bridge Cable Anchoring',
            blurb: 'TR1001 High-Tension Cable Anchoring System',
            url: '/product/tr1001-bridge-cable/',
            thumb: '/img/products/mc723-thumb.jpg',
          },
        },
        {
          id: '3-2-dup',
          points: [1844,621, 2305,614, 2344,756, 2125,749, 2086,703, 1943,706, 1905,701, 1844,696],
          product: {
            sku: 'TR1002',
            name: 'Structural Joint Sealing',
            blurb: 'TR1002 Weather-Resistant Structural Joint Sealant',
            url: '/product/tr1002-structural-joint/',
            thumb: '/img/products/mc724-thumb.jpg',
          },
        },
        {
          id: '3-3-dup',
          points: [2766,828, 3227,821, 3266,963, 3047,956, 3008,910, 2865,913, 2827,908, 2766,903],
          product: {
            sku: 'TR1003',
            name: 'Deck Surface Bonding',
            blurb: 'TR1003 High-Traffic Deck Surface Adhesive',
            url: '/product/tr1003-deck-surface/',
            thumb: '/img/products/mc725-thumb.jpg',
          },
        },
      ],
    },
  ],
};