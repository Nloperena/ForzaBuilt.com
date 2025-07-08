// Import product images
import canisterSystem from '@/assets/images/Canister System.png';
import os2Cartridge from '@/assets/images/OS2 Cartridge Hero.png';
import rrHandSpraying from '@/assets/images/RR Hand Spraying.png';
import tapeHeroic from '@/assets/images/Tape Heroic Image.png';

export interface Product {
  title: string;
  fullTitle: string;
  image: string;
  hoverImage: string;
  color: string;
  slug?: string;
  external?: boolean;
  link?: string;
}

export const products: Product[] = [
  {
    title: "ADHESIVES",
    fullTitle: "INDUSTRIAL ADHESIVES",
    image: canisterSystem,
    hoverImage: "https://forzabuilt.com/wp-content/uploads/2023/05/product-line-brands-white-bond.svg",
    color: "#f16022",
    slug: "adhesives"
  },
  {
    title: "SEALANTS",
    fullTitle: "INDUSTRIAL SEALANTS",
    image: os2Cartridge,
    hoverImage: "https://forzabuilt.com/wp-content/uploads/2023/05/product-line-brands-white-seal.svg",
    color: "#faaf40",
    slug: "sealants"
  },
  {
    title: "INDUSTRIAL CLEANING",
    fullTitle: "INDUSTRIAL CLEANING",
    image: rrHandSpraying,
    hoverImage: "https://ruggedred.com/images/RRMascot+Type-smaller.png",
    color: "#e53935",
    external: true,
    link: "https://ruggedred.com/"
  },
  {
    title: "TAPES",
    fullTitle: "INDUSTRIAL TAPES",
    image: tapeHeroic,
    hoverImage: "https://forzabuilt.com/wp-content/uploads/2023/05/product-line-brands-white-tape.svg",
    color: "#d1181f",
    slug: "tapes"
  }
]; 