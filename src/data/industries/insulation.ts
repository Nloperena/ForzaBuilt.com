import { IndustryData } from '@/types/industry';

export const INSULATION_DATA: IndustryData = {
  id: 'insulation',
  xrays: [
    {
      id: 'insulation-xray-1',
      preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/7MivSGGEzZwkR3AH7M30T8/d86cf45098ee3038db49d09f4bb65a78/Insulation_House.png',
      postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/483HyVkHmVlFJ94AqjLsI3/73ecd1649f5efa9b5195ba7b3dd16e6f/House-Insulation-Model-3D.png',
      width: 4392,
      height: 6587,
      hotspots: [
        {
          id: '7-1',
          points: [878,1317, 1317,1304, 1356,1446, 1137,1433, 1098,1361, 955,1356, 917,1351, 878,1346],
          product: {
            sku: 'IS1101',
            name: 'Thermal Insulation Boards',
            blurb: 'IS1101 High-R-Value Insulation Panel Adhesive',
            url: '/product/is1101-thermal-insulation/',
            thumb: '/img/products/mc723-thumb.jpg',
          },
        },
        {
          id: '7-2',
          points: [1756,2634, 2195,2621, 2234,2763, 2015,2750, 1976,2678, 1833,2673, 1795,2668, 1756,2663],
          product: {
            sku: 'IS1102',
            name: 'Vapor Barrier Installation',
            blurb: 'IS1102 Moisture Control Barrier Adhesive',
            url: '/product/is1102-vapor-barrier/',
            thumb: '/img/products/mc724-thumb.jpg',
          },
        },
        {
          id: '7-3',
          points: [2634,3951, 3073,3938, 3112,4080, 2893,4067, 2854,3995, 2711,3990, 2673,3985, 2634,3980],
          product: {
            sku: 'IS1103',
            name: 'Reflective Insulation Systems',
            blurb: 'IS1103 Radiant Barrier Mounting Adhesive',
            url: '/product/is1103-reflective-insulation/',
            thumb: '/img/products/mc725-thumb.jpg',
          },
        },
      ],
    },
    {
      id: 'insulation-xray-2',
      preSrc: 'https://images.ctfassets.net/hdznx4p7ef81/6UHeuUoSW95YghwOPR5QPf/c8c8683cbd9b5b297fb04faacf08a8f8/Insulation_Pipe_Wrap.png',
      postSrc: 'https://images.ctfassets.net/hdznx4p7ef81/2hOdNdhiQZY2Pe10Wa8nyW/9ca7fb0e28c851e89d584c5028757f05/Pipe-Insulation.png',
      width: 4392,
      height: 6587,
      hotspots: [
        {
          id: '7-1-dup',
          points: [878,1317, 1317,1304, 1356,1446, 1137,1433, 1098,1361, 955,1356, 917,1351, 878,1346],
          product: {
            sku: 'IS1101',
            name: 'Thermal Insulation Boards',
            blurb: 'IS1101 High-R-Value Insulation Panel Adhesive',
            url: '/product/is1101-thermal-insulation/',
            thumb: '/img/products/mc723-thumb.jpg',
          },
        },
        {
          id: '7-2-dup',
          points: [1756,2634, 2195,2621, 2234,2763, 2015,2750, 1976,2678, 1833,2673, 1795,2668, 1756,2663],
          product: {
            sku: 'IS1102',
            name: 'Vapor Barrier Installation',
            blurb: 'IS1102 Moisture Control Barrier Adhesive',
            url: '/product/is1102-vapor-barrier/',
            thumb: '/img/products/mc724-thumb.jpg',
          },
        },
        {
          id: '7-3-dup',
          points: [2634,3951, 3073,3938, 3112,4080, 2893,4067, 2854,3995, 2711,3990, 2673,3985, 2634,3980],
          product: {
            sku: 'IS1103',
            name: 'Reflective Insulation Systems',
            blurb: 'IS1103 Radiant Barrier Mounting Adhesive',
            url: '/product/is1103-reflective-insulation/',
            thumb: '/img/products/mc725-thumb.jpg',
          },
        },
      ],
    },
  ],
};