const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Product category logos to scrape from WordPress
const productCategoryLogos = [
  // Main product line logos
  {
    name: 'Forza-Bond-Product-Line.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Bond-Product-Line.png',
    category: 'product-lines'
  },
  {
    name: 'Forza-Seal-Product-Line.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Seal-Product-Line.png',
    category: 'product-lines'
  },
  {
    name: 'tape-lineup-final-1.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2023/05/tape-lineup-final-1.png',
    category: 'product-lines'
  },
  
  // Product line brand logos (white versions)
  {
    name: 'product-line-brands-white-bond.svg',
    url: 'https://forzabuilt.com/wp-content/uploads/2023/05/product-line-brands-white-bond.svg',
    category: 'brand-logos'
  },
  {
    name: 'product-line-brands-white-seal.svg',
    url: 'https://forzabuilt.com/wp-content/uploads/2023/05/product-line-brands-white-seal.svg',
    category: 'brand-logos'
  },
  {
    name: 'product-line-brands-white-tape.svg',
    url: 'https://forzabuilt.com/wp-content/uploads/2023/05/product-line-brands-white-tape.svg',
    category: 'brand-logos'
  },
  
  // RuggedRed logos
  {
    name: 'RRBottlesHeroImage.png',
    url: 'https://ruggedred.com/images/RRBottlesHeroImage.png',
    category: 'ruggedred'
  },
  {
    name: 'RRWordmark.png',
    url: 'https://images.ctfassets.net/hdznx4p7ef81/4F26OEeiZcouZkFSv1I18L/301ea66f2ae44e1b6129e1dc48dab175/RRWordmark.png',
    category: 'ruggedred'
  },
  
  // Product category specific images (fixed URLs)
  {
    name: 'T205.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/07/T205.png',
    category: 'acrylic-foam'
  },
  {
    name: 'T950.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/07/T950.png',
    category: 'fsk'
  },
  {
    name: 'T970.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/07/T970.png',
    category: 'foil'
  },
  {
    name: 'T700.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/07/T700.png',
    category: 'double-coated'
  },
  {
    name: 'T400.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/07/T400.png',
    category: 'transfer-tapes'
  },
  {
    name: 'T204.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/07/T204.png',
    category: 'transfer-tapes'
  },
  {
    name: 'T500.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/07/T500.png',
    category: 'butyl'
  },
  {
    name: 'T900.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/07/T900.png',
    category: 'butyl'
  },
  {
    name: 'T350.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/07/T350.png',
    category: 'thermal-tape'
  },
  {
    name: 'T450.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/07/T450.png',
    category: 'single-coated'
  },
  
  // Industrial product images (removed broken links)
  {
    name: 'vhb-tape-mockup-1024x1024.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2023/05/vhb-tape-mockup-1024x1024.png',
    category: 'industrial'
  },
  {
    name: 'T600-Foam-Bonding-Tape.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2023/06/T600-Foam-Bonding-Tape.png',
    category: 'industrial'
  },
  {
    name: 'T464-Transfer-Tape-1024x1024.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2023/06/T464-Transfer-Tape-1024x1024.png',
    category: 'industrial'
  },
  
  // Transportation product images
  {
    name: 'Master-bundle-TAC-734G-NEW.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-734G-NEW.png',
    category: 'transportation'
  },
  {
    name: 'Master-bundle-TAC-735R-NEW-1024x1024.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-735R-NEW-1024x1024.png',
    category: 'transportation'
  },
  {
    name: '52-GAL-DRUM-TAC-R777.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2025/03/52-GAL-DRUM-TAC-R777.png',
    category: 'transportation'
  },
  {
    name: 'Master-bundle-TAC-739R-NEW-1024x1024.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-739R-NEW-1024x1024.png',
    category: 'transportation'
  },
  {
    name: 'sausage-TAC-OS74.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2025/03/sausage-TAC-OS74.png',
    category: 'transportation'
  },
  
  // Marine product images
  {
    name: 'marine-yacht.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2023/05/marine-yacht.png',
    category: 'marine'
  },
  {
    name: 'Forza-Marine-Yacht.png',
    url: 'https://forzabuilt.com/wp-content/uploads/2024/07/Forza-Marine-Yacht.png',
    category: 'marine'
  }
];

// Create directory structure
const baseDir = path.join(__dirname, '..', 'public');
const categories = ['product-lines', 'brand-logos', 'ruggedred', 'acrylic-foam', 'fsk', 'foil', 'double-coated', 'transfer-tapes', 'butyl', 'thermal-tape', 'single-coated', 'industrial', 'transportation', 'marine'];

categories.forEach(category => {
  const categoryDir = path.join(baseDir, 'products', category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }
});

// Function to download a file with redirect handling
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const newUrl = response.headers.location;
        console.log(`🔄 Redirecting: ${url} -> ${newUrl}`);
        file.close();
        fs.unlink(filepath, () => {});
        downloadFile(newUrl, filepath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(filepath);
        if (stats.size === 0) {
          fs.unlink(filepath, () => {});
          reject(new Error(`Downloaded file is empty: ${url}`));
          return;
        }
        console.log(`✅ Downloaded: ${path.basename(filepath)} (${(stats.size / 1024).toFixed(2)} KB)`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Main function to download all logos
async function downloadAllLogos() {
  console.log('🚀 Starting to download product category logos...\n');
  
  const downloadPromises = productCategoryLogos.map(async (logo) => {
    const categoryDir = path.join(baseDir, 'products', logo.category);
    const filepath = path.join(categoryDir, logo.name);
    
    try {
      await downloadFile(logo.url, filepath);
    } catch (error) {
      console.error(`❌ Failed to download ${logo.name}:`, error.message);
    }
  });
  
  await Promise.all(downloadPromises);
  
  console.log('\n✨ Download complete!');
  console.log(`📁 Logos saved to: ${path.join(baseDir, 'products')}`);
  
  // List downloaded files by category
  console.log('\n📋 Downloaded files by category:');
  categories.forEach(category => {
    const categoryDir = path.join(baseDir, 'products', category);
    if (fs.existsSync(categoryDir)) {
      const files = fs.readdirSync(categoryDir);
      if (files.length > 0) {
        console.log(`\n  📁 ${category.toUpperCase()}:`);
        files.forEach(file => {
          const stats = fs.statSync(path.join(categoryDir, file));
          console.log(`    - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
        });
      }
    }
  });
}

// Run the script
downloadAllLogos().catch(console.error); 