export interface Industry {
  title: string;
  videoUrl: string;
  description?: string;
  logo?: string;
  pageHeadline?: string;
  supportingImage?: string;
  supportingText?: string;
  heroImage?: string;
  products?: {
    name: string;
    type: string;
    color: string;
    description: string;
    image: string;
  }[];
  color?: string;
}

export const industries: Industry[] = [
  {
    title: "TRANSPORTATION",
    videoUrl: "https://forzabuilt.com/wp-content/uploads/2024/09/forzaTRuck2-Compressed.mp4",
    description: "Innovative adhesive solutions for the transportation industry",
    logo: "https://forzabuilt.com/wp-content/uploads/2024/09/Transportation-Icon-2.png",
    color: "#b83d35", // Transportation red color from brand standards
  },
  {
    title: "MARINE",
    videoUrl: "https://forzabuilt.com/wp-content/uploads/2024/09/ForzaBoatLoop-Compressed.mp4",
    description: "Specialized bonding solutions for marine applications",
    logo: "https://forzabuilt.com/wp-content/uploads/2024/09/Marine-Icon.png",
    color: "#147974", // Marine orange color
    pageHeadline: "Building High-Performance Marine Adhesive, Tape & Sealant Solutions",
    supportingImage: "https://forzabuilt.com/wp-content/uploads/2023/05/marine-yacht.png",
    supportingText: `Forza stands above the competition by offering unparalleled custom-formulated line of marine solutions that:

- Ensure boat and yacht structural integrity, watertight sealing, and surface bonding over the long haul
- Precisely match our marine customers' specific and demanding product requirements
- Provide cutting-edge chemistries and technologies that over-deliver for mission-critical manufacturing and design requirements
- Deliver a wide array of applications
- Achieve unparalleled levels of process efficiency and performance.`,
    heroImage: "https://forzabuilt.com/wp-content/uploads/2024/07/Forza-Marine-Yacht.png",
    products: [
      {
        name: "Forza BOND",
        type: "BOND",
        color: "#ff5c1a",
        description: "High-performance marine bonding solutions for structural integrity and long-lasting durability.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Bond-Product-Line.png"
      },
      {
        name: "Forza SEAL",
        type: "SEAL",
        color: "#ffd600",
        description: "Premium marine sealants for watertight protection and weather resistance.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Seal-Product-Line.png"
      },
      {
        name: "Forza TAPE",
        type: "TAPE",
        color: "#e53935",
        description: "Specialized marine tapes for secure bonding and sealing applications.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/05/tape-lineup-final-1.png"
      },
      {
        name: "RuggedRed",
        type: "RuggedRed",
        color: "#e53935",
        description: "A short description about our RuggedRed products.",
        image: "https://ruggedred.com/images/RRMascot+Type-smaller.png"
      },
      {
        name: "Hull Sealant",
        type: "SEALANT",
        color: "#147974",
        description: "Advanced hull sealing technology for maximum water resistance and durability.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Seal-Product-Line.png"
      },
      {
        name: "Deck Adhesive",
        type: "ADHESIVE",
        color: "#ff5c1a",
        description: "High-strength deck bonding solutions for marine applications.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Bond-Product-Line.png"
      },
      {
        name: "Cabin Sealant",
        type: "SEALANT",
        color: "#ffd600",
        description: "Premium cabin sealing for weatherproof protection.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Seal-Product-Line.png"
      },
      {
        name: "Fiberglass Tape",
        type: "TAPE",
        color: "#e53935",
        description: "Specialized fiberglass repair and reinforcement tape.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/05/tape-lineup-final-1.png"
      },
      {
        name: "Bilge Sealant",
        type: "SEALANT",
        color: "#147974",
        description: "Heavy-duty bilge sealing for engine compartment protection.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Seal-Product-Line.png"
      },
      {
        name: "Window Adhesive",
        type: "ADHESIVE",
        color: "#ff5c1a",
        description: "Crystal clear window bonding for marine applications.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Bond-Product-Line.png"
      },
      {
        name: "Rub Rail Sealant",
        type: "SEALANT",
        color: "#ffd600",
        description: "Flexible rub rail sealing for impact protection.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Seal-Product-Line.png"
      },
      {
        name: "Electrical Tape",
        type: "TAPE",
        color: "#e53935",
        description: "Marine-grade electrical insulation and protection tape.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/05/tape-lineup-final-1.png"
      },
      {
        name: "Transom Sealant",
        type: "SEALANT",
        color: "#147974",
        description: "High-performance transom sealing for engine mounting.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Seal-Product-Line.png"
      },
      {
        name: "Trim Adhesive",
        type: "ADHESIVE",
        color: "#ff5c1a",
        description: "Precision trim bonding for marine interior applications.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Bond-Product-Line.png"
      },
      {
        name: "Hatch Sealant",
        type: "SEALANT",
        color: "#ffd600",
        description: "Weatherproof hatch sealing for access points.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Seal-Product-Line.png"
      },
      {
        name: "Repair Tape",
        type: "TAPE",
        color: "#e53935",
        description: "Emergency repair tape for quick marine fixes.",
        image: "https://forzabuilt.com/wp-content/uploads/2023/05/tape-lineup-final-1.png"
      }
    ]
  },
  {
    title: "CONSTRUCTION", 
    videoUrl: "https://forzabuilt.com/wp-content/uploads/2025/02/Final-Construction-Page-Banner-Video-1.mp4",
    description: "High-performance adhesives for construction needs",
    logo: "https://forzabuilt.com/wp-content/uploads/2024/09/Construction-Icon.png",
    color: "#fec770", // Construction yellow color from brand standards
  },
  {
    title: "INDUSTRIAL",
    videoUrl: "https://forzabuilt.com/wp-content/uploads/2025/02/Final-Industrial-Page-Banner-Video.mp4",
    description: "Industrial-grade adhesive solutions for manufacturing",
    logo: "https://forzabuilt.com/wp-content/uploads/2024/09/Industrial-Icon.png",
    color: "#f16a26", // Industrial orange color from brand standards
  },
  // {
  //   title: "FOAM",
  //   videoUrl: "https://video-previews.elements.envatousercontent.com/461cf7cd-2cb8-419b-9558-707280ce813c/watermarked_preview/watermarked_preview.mp4",
  //   description: "Advanced bonding solutions for foam applications",
  //   logo: "https://forzabuilt.com/wp-content/uploads/2024/09/Foam-Icon.png",
  //   color: "#7a6fb0", // Foam purple color from brand standards
  // },
  {
    title: "COMPOSITES",
    videoUrl: "https://forzabuilt.com/wp-content/uploads/2024/09/ForzaTurbineLoop-Compressed.mp4#t=0,100",
    description: "Specialized adhesives for composite materials",
    logo: "https://forzabuilt.com/wp-content/uploads/2024/09/Composite-Icon.png",
    color: "#c7c8c9", // Composites grey color from brand standards
  },
  {
    title: "INSULATION",
    videoUrl: "https://forzabuilt.com/wp-content/uploads/2025/02/Final-Forza-Insulation-Header-Video.mp4#t=0,100",
    description: "High-performance bonding solutions for insulation materials",
    logo: "https://forzabuilt.com/wp-content/uploads/2024/09/Insulation-Icon.png",
    color: "#d0157d", // Insulation pink color from brand standards
  }
]; 