import { IndustryData } from '../types/xray';

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
          id: 'structural-steel',
          points: [864,486, 1296,486, 1296,730, 864,730],
          product: {
            sku: 'CO1001',
            name: 'Structural Steel Bonding',
            blurb: '',
            url: '/product/co1001-structural-steel/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/12/C-OS55-Sausage-n.png',
          },
        },
        {
          id: 'concrete-panel',
          points: [1728,608, 2160,608, 2160,852, 1728,852],
          product: {
            sku: 'CO1002',
            name: 'Concrete Panel Adhesive',
            blurb: '',
            url: '/product/co1002-concrete-panel/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2025/03/sausage-TAC-OS74.png',
          },
        },
        {
          id: 'window-frame',
          points: [2592,730, 3024,730, 3024,974, 2592,974],
          product: {
            sku: 'CO1003',
            name: 'Window Frame Installation',
            blurb: '',
            url: '/product/co1003-window-frame/',
            thumb: 'https://forzabuilt.com/wp-content/uploads/2024/12/C-T564-Tape-Mockup.png',
          },
        },
      ],
    },
  ],
}; 