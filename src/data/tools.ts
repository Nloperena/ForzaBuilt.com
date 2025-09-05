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
    color: '#115B87',
    videoUrl: '/videos/datasheet.mp4'
  }
]; 