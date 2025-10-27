import { IndustryData } from '../../types/industry';

export const INDUSTRIAL_DATA: IndustryData = {
  id: 'industrial',
  title: 'Industrial Manufacturing Solutions',
  description: 'High-performance industrial adhesives, sealants, and bonding solutions for manufacturing, equipment assembly, and industrial applications',
  videoUrl: '/videos/backgrounds/Final-Industrial-Page-Banner-Video.mp4',
  logo: '/logos/Industrial-Icon.png',
  color: '#f16a26',
  xrays: [
    {
      id: 'industrial-manufacturing-xray',
      preSrc: '/img/industrial/Industrial-Manufacturing-Pre.png',
      postSrc: '/img/industrial/Industrial-Manufacturing-Post.png',
      svgOverlay: '/img/industrial/Industrial-Manufacturing-Overlay.svg',
      width: 2592,
      height: 2592,
      hotspots: [
        {
          id: 'structural_bonding',
          points: [1296, 800],
          product: {
            sku: 'I-BOND-100',
            name: 'I-BOND-100 – INDUSTRIAL STRUCTURAL ADHESIVE',
            blurb: 'High-strength structural bonding for industrial equipment',
            url: '/products/bond/i-bond-100',
            thumb: '/product-images/i-bond-100.png',
          },
        },
        {
          id: 'equipment_assembly',
          points: [800, 1200],
          product: {
            sku: 'I-BOND-200',
            name: 'I-BOND-200 – HEAVY DUTY INDUSTRIAL ADHESIVE',
            blurb: 'Heavy-duty bonding for manufacturing equipment',
            url: '/products/bond/i-bond-200',
            thumb: '/product-images/i-bond-200.png',
          },
        },
        {
          id: 'sealing_applications',
          points: [1800, 1000],
          product: {
            sku: 'I-SEAL-300',
            name: 'I-SEAL-300 – INDUSTRIAL GRADE SEALANT',
            blurb: 'Industrial sealing for harsh environments',
            url: '/products/seal/i-seal-300',
            thumb: '/product-images/i-seal-300.png',
          },
        },
        {
          id: 'maintenance_repair',
          points: [1000, 600],
          product: {
            sku: 'I-TAPE-400',
            name: 'I-TAPE-400 – INDUSTRIAL MAINTENANCE TAPE',
            blurb: 'High-performance tape for industrial maintenance',
            url: '/products/tape/i-tape-400',
            thumb: '/product-images/i-tape-400.png',
          },
        }
      ]
    }
  ],
  keyApplications: [
    'Manufacturing Equipment Assembly',
    'Industrial Machinery Bonding', 
    'Production Line Sealing',
    'Heavy Equipment Maintenance',
    'Factory Automation Systems',
    'Industrial Pipe Sealing',
    'Equipment Housing Assembly',
    'Conveyor System Bonding'
  ],
  industryBenefits: [
    'High-strength structural bonding for heavy-duty applications',
    'Chemical resistance for harsh industrial environments',
    'Temperature resistance from -40°F to +200°F',
    'Fast cure times to minimize production downtime',
    'VOC-compliant formulations for workplace safety',
    'Custom solutions for specific manufacturing needs'
  ],
  technicalSpecs: {
    temperatureRange: '-40°F to +200°F (-40°C to +93°C)',
    chemicalResistance: 'Excellent resistance to oils, solvents, and industrial chemicals',
    bondStrength: 'Up to 3,500 PSI tensile strength',
    cureTime: '15 minutes to 24 hours depending on application',
    viscosity: '50,000 to 200,000 cps for various application methods',
    shelfLife: '12-24 months when stored properly'
  }
};