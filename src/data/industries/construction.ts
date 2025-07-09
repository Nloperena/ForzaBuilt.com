import { IndustryData } from '@/types/industry';

export const CONSTRUCTION_DATA: IndustryData = {
  id: 'construction',
  xrays: [
    {
      id: 'construction-xray-1',
      preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/7y4moEu0QCcWQi5PME0m7q/12bc5121fce1f7dbb4fd79d12277db71/Construction_House_Exterior_Graphic_Web_1__1_.png',
      postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/5qOufFR5teb4KfSlSMY759/524f9e039b26850cab706f3f220af5b8/Construction-House-Exploded-Graphic-Web.png',
      width: 4320,
      height: 2432,
      hotspots: [
        {
          id: '2-1',
          points: [864,486, 1296,486, 1296,730, 864,730],
          product: {
            sku: 'CO1001',
            name: 'Structural Steel Bonding',
            blurb: 'CO1001 High-Strength Structural Steel Adhesive',
            url: '/product/co1001-structural-steel/',
            thumb: '/img/products/mc723-thumb.jpg',
          },
        },
        {
          id: '2-2',
          points: [1728,608, 2160,608, 2160,852, 1728,852],
          product: {
            sku: 'CO1002',
            name: 'Concrete Panel Adhesive',
            blurb: 'CO1002 Precast Concrete Panel Bonding Solution',
            url: '/product/co1002-concrete-panel/',
            thumb: '/img/products/mc724-thumb.jpg',
          },
        },
        {
          id: '2-3',
          points: [2592,730, 3024,730, 3024,974, 2592,974],
          product: {
            sku: 'CO1003',
            name: 'Window Frame Installation',
            blurb: 'CO1003 Weather-Resistant Window Frame Adhesive',
            url: '/product/co1003-window-frame/',
            thumb: '/img/products/mc725-thumb.jpg',
          },
        },
      ],
    },
    {
      id: 'construction-xray-2',
      preSrc: '/img/construction/office-room-normal.png',
      postSrc: '/img/construction/office-room-xray.png',
      width: 4320,
      height: 2432,
      hotspots: [
        {
          id: '2-1-dup',
          points: [864,486, 1296,486, 1296,730, 864,730],
          product: {
            sku: 'CO1001',
            name: 'Structural Steel Bonding',
            blurb: 'CO1001 High-Strength Structural Steel Adhesive',
            url: '/product/co1001-structural-steel/',
            thumb: '/img/products/mc723-thumb.jpg',
          },
        },
        {
          id: '2-2-dup',
          points: [1728,608, 2160,608, 2160,852, 1728,852],
          product: {
            sku: 'CO1002',
            name: 'Concrete Panel Adhesive',
            blurb: 'CO1002 Precast Concrete Panel Bonding Solution',
            url: '/product/co1002-concrete-panel/',
            thumb: '/img/products/mc724-thumb.jpg',
          },
        },
        {
          id: '2-3-dup',
          points: [2592,730, 3024,730, 3024,974, 2592,974],
          product: {
            sku: 'CO1003',
            name: 'Window Frame Installation',
            blurb: 'CO1003 Weather-Resistant Window Frame Adhesive',
            url: '/product/co1003-window-frame/',
            thumb: '/img/products/mc725-thumb.jpg',
          },
        },
      ],
    },
  ],
};