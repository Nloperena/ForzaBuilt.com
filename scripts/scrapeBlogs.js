const fs = require('fs');
const path = require('path');

// Blog data based on the scraped content from https://forzabuilt.com/blog
// Updated with correct image paths that exist in public/products directory
const blogData = [
  {
    id: 'mastering-application-contact-adhesives',
    title: 'Mastering Application: Best Practices for Using Contact Adhesives in Manufacturing',
    excerpt: 'Key Takeaways Surface Preparation: Cleaning and prepping surfaces is fundamental for a strong adhesive bond, removing contaminants that can weaken the bond. Even Application: Proper spray techniques ensure uniform coverage and optimal bonding performance. Curing Time: Understanding the difference between drying and curing is crucial for manufacturing efficiency.',
    image: '/products/C150-CA-COMPLIANT-HIGH-SOLIDS-CONTACT-ADHESIVE-1024x1024.png',
    category: 'Application Tips',
    date: '2024-01-15',
    url: 'https://forzabuilt.com/blog/mastering-application-contact-adhesives',
    keyTakeaways: [
      'Surface Preparation: Cleaning and prepping surfaces is fundamental for a strong adhesive bond',
      'Even Application: Proper spray techniques ensure uniform coverage',
      'Curing Time: Understanding the difference between drying and curing is crucial'
    ]
  },
  {
    id: 'strength-durability-contact-adhesives',
    title: 'Strength and Durability Unveiled: Analyzing Contact Adhesives in Industrial Applications',
    excerpt: 'Key Takeaways Chemical Composition: The blend of polymers, resins, and solvents in contact adhesives is key for performance. Durability Testing: Comprehensive testing methods ensure reliability in industrial environments. Industrial Standards: Meeting specific requirements for various manufacturing applications.',
    image: '/products/C331-Blue-55-Gallon.png',
    category: 'Technical Analysis',
    date: '2024-01-10',
    url: 'https://forzabuilt.com/blog/strength-durability-contact-adhesives',
    keyTakeaways: [
      'Chemical Composition: The blend of polymers, resins, and solvents in contact adhesives is key for performance',
      'Durability Testing: Comprehensive testing methods ensure reliability in industrial environments',
      'Industrial Standards: Meeting specific requirements for various manufacturing applications'
    ]
  },
  {
    id: 'weather-resistance-comparison',
    title: 'Comparative Analysis: How Contact Adhesives Stand Up Against Traditional Glues in Weather Resistance',
    excerpt: 'Key Takeaways Flexibility: Contact adhesives offer superior flexibility, important for weather resistance. Environmental Factors: Understanding how temperature and humidity affect adhesive performance. Comparative Testing: Systematic evaluation of different adhesive types in various conditions.',
    image: '/products/T350-Thermal-Break-Tape.png',
    category: 'Research & Development',
    date: '2024-01-05',
    url: 'https://forzabuilt.com/blog/weather-resistance-comparison',
    keyTakeaways: [
      'Flexibility: Contact adhesives offer superior flexibility, important for weather resistance',
      'Environmental Factors: Understanding how temperature and humidity affect adhesive performance',
      'Comparative Testing: Systematic evaluation of different adhesive types in various conditions'
    ]
  },
  {
    id: 'advanced-projects-contact-adhesives',
    title: 'Unveiling the Potential: Advanced Projects You Can Tackle with Contact Adhesives',
    excerpt: 'Key Takeaways Instant Bonding: Contact adhesives create a permanent bond instantly, ideal for a variety of materials. Advanced Applications: From automotive to aerospace, contact adhesives enable complex projects. Creative Solutions: Innovative uses in manufacturing and DIY applications.',
    image: '/products/FRP-Rollable-Adhesive-v2-1024x1024.png',
    category: 'Project Ideas',
    date: '2023-12-20',
    url: 'https://forzabuilt.com/blog/advanced-projects-contact-adhesives',
    keyTakeaways: [
      'Instant Bonding: Contact adhesives create a permanent bond instantly, ideal for a variety of materials',
      'Advanced Applications: From automotive to aerospace, contact adhesives enable complex projects',
      'Creative Solutions: Innovative uses in manufacturing and DIY applications'
    ]
  },
  {
    id: 'critical-role-industrial-success',
    title: 'The Critical Role of Contact Adhesives in Industrial Success',
    excerpt: 'Key Takeaways Instant Bonding: Contact adhesives enable immediate bonding, important for time-sensitive industrial processes. Chemical Resistance: Superior resistance to industrial chemicals and environmental factors. Cost Efficiency: Significant cost savings compared to traditional fastening methods.',
    image: '/products/C130-Clear-55-Gallon-1024x1024.png',
    category: 'Industrial Applications',
    date: '2023-12-15',
    url: 'https://forzabuilt.com/blog/critical-role-industrial-success',
    keyTakeaways: [
      'Instant Bonding: Contact adhesives enable immediate bonding, important for time-sensitive industrial processes',
      'Chemical Resistance: Superior resistance to industrial chemicals and environmental factors',
      'Cost Efficiency: Significant cost savings compared to traditional fastening methods'
    ]
  },
  {
    id: 'adhesives-impact-manufacturing',
    title: 'How Adhesives Impact Your Manufacturing – Productivity and Efficiency',
    excerpt: 'The Evolution of Fastening in Trailer Manufacturing Traditional fastening methods, such as bolts, nuts, rivets, and welding, have been the backbone of manufacturing for decades. However, the landscape is rapidly changing as industries recognize the limitations of these conventional approaches.',
    image: '/products/Bundle-TC453_Forza.png',
    category: 'Manufacturing',
    date: '2023-12-10',
    url: 'https://forzabuilt.com/blog/adhesives-impact-manufacturing',
    keyTakeaways: [
      'Evolution of Fastening: Traditional methods are being replaced by adhesive solutions',
      'Productivity Gains: Adhesives offer significant efficiency improvements',
      'Cost Reduction: Adhesive solutions reduce manufacturing costs'
    ]
  },
  {
    id: 'spray-adhesive-canisters-vs-bulk',
    title: 'Spray Adhesive Canisters vs. Bulk Centralized Adhesive Spray Systems',
    excerpt: 'Introduction The adhesive application method in industrial settings is crucial in determining operational efficiency, cost-effectiveness, and overall productivity. Two primary approaches dominate the market: spray adhesive canisters and bulk centralized adhesive spray systems.',
    image: '/products/A_FORZA_MC737_Canister22L-NEW1-1024x1024.png',
    category: 'Equipment & Systems',
    date: '2023-12-05',
    url: 'https://forzabuilt.com/blog/spray-adhesive-canisters-vs-bulk',
    keyTakeaways: [
      'Application Methods: Two primary approaches dominate the market',
      'Operational Efficiency: Method choice impacts productivity',
      'Cost-Effectiveness: Different systems offer varying cost benefits'
    ]
  },
  {
    id: 'epa-methylene-chloride-phaseout',
    title: 'EPA Is Phasing Out Methylene Chloride in Industrial Adhesives: What You Need to Know and Do',
    excerpt: 'Understanding the EPA\'s Methylene Chloride Phase-Out Methylene chloride, a powerful solvent commonly used in industrial adhesives and other applications, is being phased out by the Environmental Protection Agency (EPA) due to its significant health risks.',
    image: '/products/IC933-bundle-1024x1024.png',
    category: 'Regulations & Compliance',
    date: '2023-11-30',
    url: 'https://forzabuilt.com/blog/epa-methylene-chloride-phaseout',
    keyTakeaways: [
      'EPA Phase-Out: Methylene chloride is being phased out due to health risks',
      'Regulatory Compliance: Understanding new requirements is essential',
      'Alternative Solutions: Finding compliant adhesive options'
    ]
  },
  {
    id: 'expert-tips-seamless-application',
    title: 'Expert Tips for Seamless Application: Achieving Professional Results with Contact Adhesives',
    excerpt: 'Key Takeaways Surface Preparation: Clean, dry, and degrease surfaces thoroughly for optimal bonding. Even Application: Use proper spray techniques for uniform coverage. Troubleshooting: Address common issues like uneven bonding and premature failure.',
    image: '/products/IC934-bundle-1024x1024.png',
    category: 'Application Tips',
    date: '2023-11-25',
    url: 'https://forzabuilt.com/blog/expert-tips-seamless-application',
    keyTakeaways: [
      'Surface Preparation: Clean, dry, and degrease surfaces thoroughly for optimal bonding',
      'Even Application: Use proper spray techniques for uniform coverage',
      'Troubleshooting: Address common issues like uneven bonding and premature failure'
    ]
  },
  {
    id: 'ultimate-guide-adhesive-curing-times',
    title: 'The Ultimate Guide to Adhesive Curing Times: Maximizing Efficiency in Your Projects',
    excerpt: 'Key Takeaways Curing vs. Drying: Curing is a chemical process essential for the strength of adhesive bonds, distinct from simple drying. Environmental Factors: Temperature, humidity, and ventilation significantly impact curing times. Efficiency Optimization: Understanding curing times helps maximize project efficiency.',
    image: '/products/OS24-sausage-1024x1024.png',
    category: 'Technical Guides',
    date: '2023-11-20',
    url: 'https://forzabuilt.com/blog/ultimate-guide-adhesive-curing-times',
    keyTakeaways: [
      'Curing vs. Drying: Curing is a chemical process essential for the strength of adhesive bonds',
      'Environmental Factors: Temperature, humidity, and ventilation significantly impact curing times',
      'Efficiency Optimization: Understanding curing times helps maximize project efficiency'
    ]
  }
];

// Product spotlight posts with correct image paths
const productSpotlightPosts = [
  {
    id: 'forzabond-ic933-spotlight',
    title: 'Product Spotlight: ForzaBOND IC933 Canisters and 13oz Aerosol adhesive',
    excerpt: 'ForzaBOND ® IC933 is a revolutionary multi-purpose contact adhesive that not only sets new standards in bonding performance but also adheres to the most stringent California VOC requirements outlined in the South Coast Air Quality Management District (SCAQMD) Rule 1168.',
    image: '/products/IC933-bundle-1024x1024.png',
    category: 'Product Spotlight',
    date: '2024-01-20',
    url: 'https://forzabuilt.com/blog/forzabond-ic933-spotlight',
    keyTakeaways: [
      'Multi-purpose contact adhesive with revolutionary bonding performance',
      'Compliant with California VOC requirements',
      'Sets new standards in adhesive technology'
    ]
  },
  {
    id: 'ic932-sprayable-contact-adhesive',
    title: 'IC932 Sprayable Contact Adhesive: The Ultimate Solution for Unparalleled Efficiency',
    excerpt: 'Calling all mattress manufacturers! Are you tired of dealing with adhesive limitations and inefficiencies that slow down your production line? Look no further than IC932 Sprayable Contact Adhesive – the game-changing solution designed specifically for your industry.',
    image: '/products/A_FORZA_MC737_Canister22L-NEW1-1024x1024.png',
    category: 'Product Spotlight',
    date: '2024-01-18',
    url: 'https://forzabuilt.com/blog/ic932-sprayable-contact-adhesive',
    keyTakeaways: [
      'Designed specifically for mattress manufacturers',
      'Game-changing solution for production efficiency',
      'Addresses adhesive limitations in manufacturing'
    ]
  },
  {
    id: 'c805-vinyl-bonding',
    title: 'Achieve Unwavering Bonds with C805 Vinyl Bonding: A Professional\'s Choice',
    excerpt: 'When it comes to vinyl bonding, professionals know that only the strongest, most reliable adhesive will suffice. C805 Vinyl Bonding adhesive stands as the premier choice for demanding applications where failure is not an option.',
    image: '/products/C-OS55-Sausage-n.png',
    category: 'Product Spotlight',
    date: '2024-01-15',
    url: 'https://forzabuilt.com/blog/c805-vinyl-bonding',
    keyTakeaways: [
      'Premier choice for vinyl bonding applications',
      'Strongest and most reliable adhesive option',
      'Ideal for demanding applications where failure is not an option'
    ]
  },
  {
    id: 's228-adhesive-primer',
    title: 'Unlock the Power of Adhesion with S228 Adhesive Primer: A Journey into Enhanced Bonding Performance',
    excerpt: 'In the vast world of adhesives, achieving a reliable bond on certain materials can be a perplexing challenge. Enter S228 Adhesive Primer – a revolutionary solution designed to enhance bonding performance across a wide range of substrates.',
    image: '/products/S228-paintcan-mockup-1024x1024.png',
    category: 'Product Spotlight',
    date: '2024-01-12',
    url: 'https://forzabuilt.com/blog/s228-adhesive-primer',
    keyTakeaways: [
      'Revolutionary solution for enhanced bonding performance',
      'Designed for a wide range of substrates',
      'Addresses challenging bonding applications'
    ]
  },
  {
    id: 'oa12-fast-grab-adhesive',
    title: 'Introducing OA12: The Fast Grab Adhesive with High Green Strength',
    excerpt: 'Are you tired of waiting for your adhesive to dry and set? Look no further than OA12, the ultimate solution for your bonding needs. With its exceptional fast grab properties and high green strength, OA12 revolutionizes the way you approach adhesive applications.',
    image: '/products/OA4-Cartridge-.png',
    category: 'Product Spotlight',
    date: '2024-01-10',
    url: 'https://forzabuilt.com/blog/oa12-fast-grab-adhesive',
    keyTakeaways: [
      'Exceptional fast grab properties',
      'High green strength for immediate bonding',
      'Revolutionizes adhesive application approach'
    ]
  },
  {
    id: 'forzabond-ca-gel',
    title: 'Product Spotlight: Forzabond CA GEL',
    excerpt: 'Forzabond CA GEL is one of our specialty adhesives, a high viscosity, surface insensitive cyanoacrylate (AKA superglue, instant adhesive) in a thicker gel form. It is generally applied to porous surfaces where a thin liquid would be absorbed too quickly.',
    image: '/products/ForzaBond-MC739.png',
    category: 'Product Spotlight',
    date: '2024-01-08',
    url: 'https://forzabuilt.com/blog/forzabond-ca-gel',
    keyTakeaways: [
      'High viscosity, surface insensitive cyanoacrylate',
      'Thicker gel form for porous surfaces',
      'Specialty adhesive for specific applications'
    ]
  },
  {
    id: 'forzaseal-os2',
    title: 'Product Spotlight: ForzaSEAL™ OS2',
    excerpt: 'ForzaSEAL™ OS2 is one of our non-hazardous ms polymer moisture cure sealants. It seals/bonds many applications in the marine, trailer, transportation and other outdoor activity industries.',
    image: '/products/OS2-Cartridge-1-1.png',
    category: 'Product Spotlight',
    date: '2024-01-05',
    url: 'https://forzabuilt.com/blog/forzaseal-os2',
    keyTakeaways: [
      'Non-hazardous ms polymer moisture cure sealant',
      'Seals/bonds applications across multiple industries',
      'Ideal for marine, trailer, and transportation applications'
    ]
  },
  {
    id: 'forzabond-oa4',
    title: 'Product Spotlight: Forzabond OA4',
    excerpt: 'Forzabond OA4 is a high-strength single-part structural adhesive/sealant, used across a variety of industries, including the composites, signage, marine, trailer and transportation industries.',
    image: '/products/OA4-Cartridge-.png',
    category: 'Product Spotlight',
    date: '2024-01-02',
    url: 'https://forzabuilt.com/blog/forzabond-oa4',
    keyTakeaways: [
      'High-strength single-part structural adhesive/sealant',
      'Used across multiple industries',
      'Versatile solution for various applications'
    ]
  },
  {
    id: 'forzabond-h805',
    title: 'Product Spotlight: Forzabond H805',
    excerpt: 'Forzabond H805 is one of our hotmelt adhesives. It is an aggressive PSA (pressure-sensitive) hotmelt which is often used to replace PUR hotmelts. H805 can bond vinyls, polypropylene and other difficult-to-bond substrates.',
    image: '/products/T715-High-Performance-Double-Coated-Tape-mockup-1024x1024.png',
    category: 'Product Spotlight',
    date: '2023-12-30',
    url: 'https://forzabuilt.com/blog/forzabond-h805',
    keyTakeaways: [
      'Aggressive PSA hotmelt adhesive',
      'Often used to replace PUR hotmelts',
      'Can bond difficult-to-bond substrates'
    ]
  },
  {
    id: 'forzatape-t220',
    title: 'Product Spotlight: ForzaTAPE™ T220',
    excerpt: 'What is ForzaTAPE™ T220? T220 is one of our acrylic high bond double-sided tapes, used for a variety of applications in trailer, transportation, marine, signage, and home appliance manufacturing.',
    image: '/products/T464-Transfer-Tape-1024x1024.png',
    category: 'Product Spotlight',
    date: '2023-12-28',
    url: 'https://forzabuilt.com/blog/forzatape-t220',
    keyTakeaways: [
      'Acrylic high bond double-sided tape',
      'Used across multiple industries',
      'Versatile solution for various applications'
    ]
  }
];

// Combine all blog posts
const allBlogPosts = [...blogData, ...productSpotlightPosts];

// Save to JSON file
const outputPath = path.join(__dirname, '../src/data/blogPosts.json');
fs.writeFileSync(outputPath, JSON.stringify(allBlogPosts, null, 2));

console.log(`✅ Scraped ${allBlogPosts.length} blog posts from ForzaBuilt.com`);
console.log(`📁 Saved to: ${outputPath}`);

// Generate categories
const categories = [...new Set(allBlogPosts.map(post => post.category))];
console.log(`📂 Found ${categories.length} categories:`, categories);
