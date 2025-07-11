export interface Tool {
  name: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
  videoUrl?: string;
}

export const tools: Tool[] = [
  {
    name: 'Products Datasheet',
    title: 'PRODUCTS DATASHEET',
    description: 'Comprehensive technical specifications for all ForzaBuilt products.',
    href: '/industrial-datasheet',
    icon: 'FileText',
    color: '#09668D',
    videoUrl: '/videos/datasheet.mp4'
  }
]; 